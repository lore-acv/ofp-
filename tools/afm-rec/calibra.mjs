#!/usr/bin/env node
/* ============================================================================
   TARATURA DEI FONT — corpo, larghezza e spaziatura finche' le righe coincidono
   ============================================================================
   Per ogni ruolo tipografico (testo, titolo, tabella) cerca i valori di
   stile.json che fanno coincidere di piu' l'inchiostro della pagina
   ricostruita con quello della scansione, sulle pagine indicate:
   - c, l'altezza delle maiuscole (il corpo);
   - sx, la larghezza del disegno (la scansione puo' essere deformata);
   - spazio, la spaziatura fra le lettere.
   Misura: pixel d'inchiostro che non coincidono (con 1 px di tolleranza)
   nelle righe di quel ruolo. Ricerca per coordinate: un parametro alla volta,
   piu' giri, passo che si stringe. Scrive i valori in stile.json.

     CHROME=/percorso/chrome node tools/afm-rec/calibra.mjs afm-ccaf 1-13 2-1
   ========================================================================== */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { svgPagina, cssRuoli, cssFont, risolvi } from './pagina.mjs';

const RADICE = process.cwd();
const [, , ID, ...NUMERI] = process.argv;
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium';
const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');
const DIR = path.join(RADICE, 'tools', 'afm-rec', ID);
const stileFile = path.join(DIR, 'stile.json');
const stile = JSON.parse(await readFile(stileFile, 'utf8'));
const libro = await readFile(path.join(RADICE, 'data', 'afm', ID, 'libro.html'), 'utf8');

const pagine = [];
for (const n of NUMERI) {
  const p = await risolvi(JSON.parse(await readFile(path.join(DIR, 'pagine', n + '.json'), 'utf8')), DIR);
  const m = libro.match(new RegExp(`data-pdf="${p.pdf}"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"`));
  pagine.push({ p, orig: 'file://' + path.join(RADICE, m[1]) });
}

const browser = await pup.launch({ executablePath: CHROME, args: ['--no-sandbox', '--allow-file-access-from-files'] });
const vuota = path.join(DIR, '_vuota.html');
await writeFile(vuota, '<!doctype html><meta charset="utf-8">');
const pg = await browser.newPage();
await pg.goto('file://' + vuota);
await pg.addStyleTag({ content: cssFont(stile, `file://${RADICE}/tools/afm-rec/font/`) + ' html,body{margin:0;background:#fff} .rec-svg{display:block} .rec-svg line{stroke:#000} .rec-svg rect,.rec-svg polygon{fill:#000} .rec-svg text{fill:#000;white-space:pre}' });
// le maschere d'inchiostro degli originali restano nella pagina
await pg.evaluate(async (orig) => {
  window.ORIG = [];
  for (const u of orig) {
    const i = new Image(); i.src = u; await i.decode();
    const W = i.naturalWidth, H = i.naturalHeight, c = new OffscreenCanvas(W, H), x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(i, 0, 0); const d = x.getImageData(0, 0, W, H).data;
    const M = new Uint8Array(W * H); for (let k = 0; k < W * H; k++) M[k] = (0.299 * d[k * 4] + 0.587 * d[k * 4 + 1] + 0.114 * d[k * 4 + 2]) < 140;
    window.ORIG.push({ W, H, M });
  }
}, pagine.map((x) => x.orig));

/* lo scarto di un ruolo: inchiostro non coincidente nelle bande delle sue righe */
async function scarto(ruolo) {
  let tot = 0;
  for (const [k, { p }] of pagine.entries()) {
    const bande = p.el.filter((e) => e[0] === 'riga' && e[1] === ruolo && !(e[4] && (e[4].ang || e[4].libro))).map((e) => { const c = (e[4] && e[4].c) || stile.ruoli[ruolo].c; return [e[2] - c * 1.45, e[2] + c * 0.45, e[3][0][0] - 10]; });
    if (!bande.length) continue;
    const svg = svgPagina(p, stile);
    const [W, H] = p.rot === -90 ? [p.h, p.w] : [p.w, p.h];
    await pg.setViewport({ width: W, height: H });
    await pg.evaluate((svg, css, W, H) => {
      let st = document.getElementById('ruoli'); if (!st) { st = document.createElement('style'); st.id = 'ruoli'; document.head.appendChild(st); }
      st.textContent = css; document.body.innerHTML = svg;
      const s = document.querySelector('svg'); s.setAttribute('width', W); s.setAttribute('height', H);
    }, svg, cssRuoli(stile), W, H);
    await pg.evaluate(() => document.fonts.ready);
    const png = (await pg.screenshot({ encoding: 'base64' }));
    tot += await pg.evaluate(async (png, k, bande, rot) => {
      const { W, H, M } = window.ORIG[k];
      const i = new Image(); i.src = 'data:image/png;base64,' + png; await i.decode();
      const c = new OffscreenCanvas(W, H), x = c.getContext('2d'); x.drawImage(i, 0, 0); const d = x.getImageData(0, 0, W, H).data;
      const R = new Uint8Array(W * H); for (let q = 0; q < W * H; q++) R[q] = d[q * 4] < 140;
      const vic = (A, q) => { const X = q % W, Y = (q / W) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const a = X + dx, b = Y + dy; if (a >= 0 && b >= 0 && a < W && b < H && A[b * W + a]) return 1; } return 0; };
      let s = 0;
      for (const [y0, y1] of bande) {
        // le bande sono in coordinate della pagina diritta; per le pagine girate si contano sulla pagina del libro
        if (rot === -90) continue;
        for (let y = Math.max(0, Math.floor(y0)); y < Math.min(H, Math.ceil(y1)); y++) for (let X = 0; X < W; X++) {
          const q = y * W + X; if (M[q] && !vic(R, q)) s++; else if (R[q] && !vic(M, q)) s++;
        }
      }
      return s;
    }, png, k, bande, p.rot);
  }
  return tot;
}

try {
  for (const ruolo of Object.keys(stile.ruoli)) {
    const r = stile.ruoli[ruolo];
    let best = await scarto(ruolo);
    if (!best) { console.log(ruolo, 'nessuna riga'); continue; }
    console.log(ruolo, 'partenza', best);
    for (const passo of [1, 0.5, 0.25]) {
      for (let giro = 0; giro < 3; giro++) {
        let migliorato = false;
        for (const [campo, d] of [['c', 0.5 * passo], ['sx', 0.02 * passo], ['spazio', 0.01 * passo]]) {
          for (const verso of [1, -1]) {
            for (;;) {
              const prima = r[campo] || 0;
              r[campo] = Math.round((prima + verso * d) * 10000) / 10000;
              const v = await scarto(ruolo);
              if (v < best) { best = v; migliorato = true; } else { r[campo] = prima; break; }
            }
          }
        }
        if (!migliorato) break;
      }
    }
    console.log(ruolo, '→ c', r.c, 'sx', r.sx, 'spazio', r.spazio, 'scarto', best);
  }
} finally {
  await browser.close();
  await rm(vuota, { force: true });
}
await writeFile(stileFile, JSON.stringify(stile, null, 2) + '\n');
console.log('scritto', path.relative(RADICE, stileFile));
