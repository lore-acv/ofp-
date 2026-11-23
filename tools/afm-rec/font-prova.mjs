#!/usr/bin/env node
/* ============================================================================
   FONT PER LA RICOSTRUZIONE — confronto oggettivo con la scansione
   ============================================================================
   Per ogni ruolo tipografico del Flight Manual (testo, titoli, tabelle) prova
   i font liberi candidati sulle stesse parole della scansione: ogni parola si
   disegna con corpo e larghezza che fanno coincidere il suo ingombro con
   quello dell'originale, poi si misura quanto l'inchiostro coincide
   (IoU: intersezione / unione dei pixel neri, con 1 px di tolleranza).
   Scrive tools/afm-rec/font-prova.json (corpo, larghezza, punteggio per
   parola) e un'immagine di confronto affiancato.

     CHROME=/percorso/chrome node tools/afm-rec/font-prova.mjs <cartella font> <immagine.png>

   I campioni (pagina, riquadro della parola sulla scansione retina di
   data/afm/afm-ccaf, testo) sono in CAMPIONI qui sotto.
   ========================================================================== */
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const RADICE = process.cwd();
const [,, FONT_DIR, OUT_PNG] = process.argv;
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium';
const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');

const CANDIDATI = {
  testo:   [['Tinos', 'tinos-latin-400-normal.woff2', 400], ['STIX Two Text', 'stix-two-text-latin-400-normal.woff2', 400], ['Source Serif 4', 'source-serif-4-latin-400-normal.woff2', 400]],
  titoli:  [['Archivo Expanded', 'archivo-latin-standard-normal.woff2', 700, '125%'], ['Encode Sans Expanded', 'encode-sans-expanded-latin-700-normal.woff2', 700], ['Montserrat', 'montserrat-latin-700-normal.woff2', 700],
            ['Archivo Expanded 600', 'archivo-latin-standard-normal.woff2', 600, '125%'], ['Encode Sans Expanded 600', 'encode-sans-expanded-latin-600-normal.woff2', 600], ['Montserrat 600', 'montserrat-latin-600-normal.woff2', 600]],
  tabelle: [['Arimo', 'arimo-latin-400-normal.woff2', 400], ['Public Sans', 'public-sans-latin-400-normal.woff2', 400], ['Archivo', 'archivo-latin-standard-normal.woff2', 400, '100%']]
};

/* parole della scansione: [ruolo, pagina (indice del libro), sinistra, alto, destra, basso, testo] nella retina 1250 px */
const CAMPIONI = JSON.parse(await readFile(path.join(RADICE, process.env.CAMPIONI || 'tools/afm-rec/font-campioni.json'), 'utf8'));

const browser = await pup.launch({ executablePath: CHROME, args: ['--no-sandbox', '--allow-file-access-from-files'] });
const pg = await browser.newPage();
// una pagina file:// vuota: da li' i font e le scansioni si leggono come file locali
const VUOTA = path.join(RADICE, 'tools/afm-rec/_vuota.html');
await writeFile(VUOTA, '<!doctype html><meta charset="utf-8">');
await pg.goto('file://' + VUOTA);
const risultato = await pg.evaluate(async (CAND, CAMP, FONT_DIR, RADICE) => {
  const fonts = {};
  for (const ruolo of Object.keys(CAND)) for (const [nome, file, peso, larg] of CAND[ruolo]) {
    const fam = 'C_' + nome.replace(/\W/g, '');
    const f = new FontFace(fam, `url(file://${FONT_DIR}/${file})`, { weight: String(peso), stretch: larg || '100%' });
    await f.load(); document.fonts.add(f); fonts[nome] = { fam, peso, larg: larg || '100%' };
  }
  const immagini = {};
  const carica = (src) => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });
  const maschera = (ctx, w, h) => { const d = ctx.getImageData(0, 0, w, h).data, m = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) m[i] = d[i * 4] < 150 ? 1 : 0; return m; };
  const ingombro = (m, w, h) => { let x0 = w, y0 = h, x1 = -1, y1 = -1; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (m[y * w + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } return { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 }; };
  const dilata = (m, w, h) => { const o = new Uint8Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { if (!m[y * w + x]) continue; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < w && Y < h) o[Y * w + X] = 1; } } return o; };
  const iou = (a, b, w, h, tol) => { if (!tol) { let i = 0, u = 0; for (let k = 0; k < w * h; k++) { if (a[k] && b[k]) i++; if (a[k] || b[k]) u++; } return u ? i / u : 0; } const A = dilata(a, w, h), B = dilata(b, w, h); let i = 0, u = 0; for (let k = 0; k < w * h; k++) { const p = (a[k] && B[k]) || (b[k] && A[k]); if (a[k] || b[k]) u++; if (p) i++; } return u ? i / u : 0; };
  const out = [];
  for (const [ruolo, pagina, L, T, R, B, testo] of CAMP) {
    const src = `file://${RADICE}/${pagina}`;
    if (!immagini[src]) immagini[src] = await carica(src);
    const M = 6, w = R - L + 2 * M, h = B - T + 2 * M;
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(immagini[src], L - M, T - M, w, h, 0, 0, w, h);
    const mo = maschera(x, w, h), bo = ingombro(mo, w, h);
    const riga = { ruolo, testo, orig: c.toDataURL(), prove: [] };
    for (const [nome] of CAND[ruolo]) {
      const f = fonts[nome];
      /* Corpo dall'altezza dell'inchiostro; poi larghezza del disegno (sx) e
         spaziatura fra le lettere (ls) insieme: per ogni sx la spaziatura che
         riporta la parola alla sua larghezza, e si tiene la coppia che fa
         coincidere di piu' l'inchiostro. */
      const z0 = document.createElement('canvas').getContext('2d');
      const s0 = 100, stretch = f.larg === '100%' ? 'normal' : 'expanded';
      z0.font = `${f.peso} ${s0}px ${f.fam}`; z0.fontStretch = stretch;
      const m0 = z0.measureText(testo);
      const inkH = m0.actualBoundingBoxAscent + m0.actualBoundingBoxDescent;
      const corpo = s0 * bo.h / inkH, n = [...testo].length;
      const disegna = (sx, ls) => {
        const r = document.createElement('canvas'); r.width = w; r.height = h; const z = r.getContext('2d');
        z.fillStyle = '#fff'; z.fillRect(0, 0, w, h); z.fillStyle = '#000';
        z.font = `${f.peso} ${corpo}px ${f.fam}`; z.fontStretch = stretch; z.letterSpacing = ls + 'px';
        const m = z.measureText(testo);
        z.save(); z.translate(bo.x0 + m.actualBoundingBoxLeft * sx, bo.y0 + m.actualBoundingBoxAscent); z.scale(sx, 1); z.fillText(testo, 0, 0); z.restore();
        return r;
      };
      const zc = document.createElement('canvas').getContext('2d'); zc.font = `${f.peso} ${corpo}px ${f.fam}`; zc.fontStretch = stretch;
      const mc = zc.measureText(testo), ink0 = mc.actualBoundingBoxLeft + mc.actualBoundingBoxRight;
      let best = null;
      for (let sx = 0.45; sx <= 1.25; sx += 0.01) {
        const ls = n > 1 ? (bo.w / sx - ink0) / (n - 1) : 0;
        if (ls < -corpo * 0.06 || ls > corpo * 0.5) continue;
        const r = disegna(sx, ls), mr = maschera(r.getContext('2d'), w, h);
        const v = iou(mo, mr, w, h, 0);
        if (!best || v > best.v) best = { v, sx, ls, r, mr };
      }
      // il disegno sovrapposto: rosso solo originale, blu solo candidato, nero entrambi
      const sov = document.createElement('canvas'); sov.width = w; sov.height = h; const so = sov.getContext('2d');
      const id = so.createImageData(w, h);
      for (let k = 0; k < w * h; k++) { const a = mo[k], b = best.mr[k]; const c = a && b ? [20, 20, 20] : a ? [225, 40, 40] : b ? [40, 90, 230] : [255, 255, 255]; id.data.set([...c, 255], k * 4); }
      so.putImageData(id, 0, 0);
      riga.prove.push({ nome, corpo: +corpo.toFixed(2), sx: +best.sx.toFixed(2), ls: +(best.ls / corpo).toFixed(3), iou: +best.v.toFixed(3), iou1: +iou(mo, best.mr, w, h, 1).toFixed(3), img: best.r.toDataURL(), sov: sov.toDataURL() });
    }
    out.push(riga);
  }
  return out;
}, CANDIDATI, CAMPIONI, path.resolve(FONT_DIR), RADICE);

// riepilogo per ruolo e font
const sintesi = {};
for (const r of risultato) for (const p of r.prove) {
  const k = r.ruolo + '|' + p.nome; (sintesi[k] = sintesi[k] || { ruolo: r.ruolo, font: p.nome, iou: [], iou1: [], sx: [], ls: [], corpo: [] });
  for (const c of ['iou', 'iou1', 'sx', 'ls', 'corpo']) sintesi[k][c].push(p[c]);
}
const media = (a) => a.reduce((s, x) => s + x, 0) / a.length;
const tab = Object.values(sintesi).map((s) => ({ ruolo: s.ruolo, font: s.font, iou: +media(s.iou).toFixed(3), iou1: +media(s.iou1).toFixed(3), sx: +media(s.sx).toFixed(3), ls: +media(s.ls).toFixed(3), corpo: +media(s.corpo).toFixed(2) }))
  .sort((a, b) => a.ruolo.localeCompare(b.ruolo) || b.iou - a.iou);
console.table(tab);
await writeFile(path.join(RADICE, (process.env.CAMPIONI || 'tools/afm-rec/font-campioni.json').replace('campioni', 'prova')), JSON.stringify({ sintesi: tab, parole: risultato.map((r) => ({ ruolo: r.ruolo, testo: r.testo, prove: r.prove.map(({ img, sov, ...p }) => p) })) }, null, 1) + '\n');

// l'immagine di confronto: per ogni parola l'originale e i candidati, sovrapposti (rosso originale, blu candidato)
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:16px;font:13px system-ui;background:#fff;color:#222}
table{border-collapse:collapse}td,th{padding:5px 9px;border-bottom:1px solid #ddd;vertical-align:top;text-align:left}
th{font-size:11px;color:#666;font-weight:600}img{display:block;height:34px;image-rendering:auto}.s{font:600 11px ui-monospace,monospace;color:#444}</style>
<h3 style="margin:0 0 4px">Font candidates vs the scan (I-CCAF, pages 1-13 and 2-1)</h3>
<p style="margin:0 0 8px;color:#555">Each word: the candidate drawn on top of the original at the size, width and letter spacing that fit best. Black = ink in both, red = only in the original, blue = only in the candidate. IoU 1.000 = identical ink.</p>
${['testo', 'titoli', 'tabelle'].map((ruolo) => `<h4 style="margin:12px 0 4px">${{ testo: 'Body text', titoli: 'Headings', tabelle: 'Tables' }[ruolo]}</h4><table><tr><th>original</th>${CANDIDATI[ruolo].map(([n]) => `<th>${n}</th>`).join('')}</tr>
${risultato.filter((r) => r.ruolo === ruolo).map((r) => `<tr><td><img src="${r.orig}"></td>${r.prove.map((p) => `<td><img src="${p.sov}"><span class="s">IoU ${p.iou.toFixed(3)}</span></td>`).join('')}</tr>`).join('')}
<tr><td class="s">average</td>${CANDIDATI[ruolo].map(([n]) => { const t = tab.find((x) => x.ruolo === ruolo && x.font === n); return `<td class="s">IoU ${t.iou.toFixed(3)}<br>width ${t.sx} · spacing ${t.ls}em</td>`; }).join('')}</tr></table>`).join('')}`;
await pg.setViewport({ width: 1900, height: 900, deviceScaleFactor: 1 });
await pg.setContent(html, { waitUntil: 'load' });
await pg.screenshot({ path: OUT_PNG, fullPage: true });
await browser.close();
await (await import('node:fs/promises')).rm(VUOTA, { force: true });
