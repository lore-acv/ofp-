#!/usr/bin/env node
/* ============================================================================
   PROPOSTA DEI FONT — la stessa pagina ricostruita con caratteri diversi
   ============================================================================
   Disegna una pagina campione con piu' combinazioni di font liberi (stessa
   impaginazione: ogni parola resta misurata sull'originale, cambia solo il
   disegno delle lettere), le mette accanto alla scansione e misura per
   ognuna l'inchiostro che non coincide con l'originale. Serve a scegliere i
   font prima di applicarli a tutto il manuale.

     CHROME=... node tools/afm-rec/font-confronto.mjs afm-ccaf 2-1 <cartella font candidati> <uscita.png>

   I candidati (woff2) si scaricano da npm (pacchetti @fontsource), vedi
   README; i file dei font scelti stanno in tools/afm-rec/font/.
   ========================================================================== */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { svgPagina, cssRuoli, cssFont, risolvi, paroleDaMisurare, misuraNelBrowser } from './pagina.mjs';

const RADICE = process.cwd();
const [, , ID, N, FONT_DIR, OUT] = process.argv;
const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');
const DIR = path.join(RADICE, 'tools', 'afm-rec', ID);
const base = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));
const pagina = await risolvi(JSON.parse(await readFile(path.join(DIR, 'pagine', N + '.json'), 'utf8')), DIR);
const libro = await readFile(path.join(RADICE, 'data', 'afm', ID, 'libro.html'), 'utf8');
const orig = path.join(RADICE, libro.match(new RegExp(`data-pdf="${pagina.pdf}"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"`))[1]);

/* le combinazioni: per ogni ruolo famiglia, file, peso e altezza delle maiuscole per em */
const F = (famiglia, file, peso = 400) => ({ famiglia, file, peso });
const SET = [
  { nome: 'A · STIX Two Text + Archivo', font: { serif: F('STIX Two Text', 'stix-two-text-latin-400-normal.woff2'), sans: { ...F('Archivo', 'archivo-latin-standard-normal.woff2', '100 900'), larghezza: '62% 125%' } },
    cap: { testo: 0.672, titolo: 0.6875, tabella: 0.6875, grafico: 0.6875 }, map: { testo: 'serif', titolo: 'sans', tabella: 'sans', grafico: 'sans' } },
  { nome: 'B · Tinos + Arimo (Times / Helvetica metrics)', font: { serif: F('Tinos', 'tinos-latin-400-normal.woff2'), sansB: F('Arimo', 'arimo-latin-700-normal.woff2', 700), sans: F('Arimo', 'arimo-latin-400-normal.woff2', 400) },
    cap: { testo: 0.656, titolo: 0.703, tabella: 0.703, grafico: 0.703 }, map: { testo: 'serif', titolo: 'sansB', tabella: 'sans', grafico: 'sans' } },
  { nome: 'C · Source Serif 4 + Montserrat + Public Sans', font: { serif: F('Source Serif 4', 'source-serif-4-latin-400-normal.woff2'), sansB: F('Montserrat', 'montserrat-latin-700-normal.woff2', 700), sans: F('Public Sans', 'public-sans-latin-400-normal.woff2', 400) },
    cap: { testo: 0.672, titolo: 0.703, tabella: 0.734, grafico: 0.734 }, map: { testo: 'serif', titolo: 'sansB', tabella: 'sans', grafico: 'sans' } }
];
const stileDi = (set) => {
  const s = JSON.parse(JSON.stringify(base));
  s.font = set.font;
  for (const [k, r] of Object.entries(s.ruoli)) { r.font = set.map[k]; r.capRatio = set.cap[k]; if (set.font[r.font].peso !== '100 900') r.peso = set.font[r.font].peso; }
  return s;
};

const browser = await pup.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
const vuota = path.join(DIR, '_vuota.html');
await writeFile(vuota, '<!doctype html><meta charset="utf-8">');
const risultati = [];
try {
  for (const set of SET) {
    const pg = await browser.newPage(); await pg.goto('file://' + vuota);
    const st = stileDi(set);
    await pg.addStyleTag({ content: cssFont(st, `file://${path.resolve(FONT_DIR)}/`) + `\n${cssRuoli(st)}\n html,body{margin:0;background:#fff} .rec-svg{display:block} .rec-svg line{stroke:#000} .rec-svg rect,.rec-svg polygon,.rec-svg path,.rec-svg circle{fill:#000} .rec-svg text{fill:#000;white-space:pre}` });
    await pg.evaluate(async (fams) => { await Promise.all(fams.map((f) => document.fonts.load(f))); }, Object.values(st.ruoli).map((r) => `${r.peso || st.font[r.font].peso} 20px '${st.font[r.font].famiglia}'`));
    const [W, H] = pagina.rot === -90 ? [pagina.h, pagina.w] : [pagina.w, pagina.h];
    await pg.setViewport({ width: W, height: H });
    const disegna = async () => {
      const misure = await pg.evaluate(misuraNelBrowser, paroleDaMisurare([pagina], st));
      await pg.evaluate((svg, css, W, H) => {
        let el = document.getElementById('ruoli'); if (!el) { el = document.createElement('style'); el.id = 'ruoli'; document.head.appendChild(el); }
        el.textContent = css; document.body.innerHTML = svg; const s = document.querySelector('svg'); s.setAttribute('width', W); s.setAttribute('height', H);
      }, svgPagina(pagina, st, misure), cssRuoli(st), W, H);
      await pg.evaluate(() => document.fonts.ready);
      return pg.screenshot({ encoding: 'base64' });
    };
    const misuraScarto = async () => pg.evaluate(async (png, origUrl) => {
      const ld = async (s) => { const i = new Image(); i.src = s; await i.decode(); return i; };
      const o = await ld(origUrl), r = await ld('data:image/png;base64,' + png), W = o.naturalWidth, H = o.naturalHeight;
      const px = (i) => { const c = new OffscreenCanvas(W, H), x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(i, 0, 0); return x.getImageData(0, 0, W, H).data; };
      const a = px(o), b = px(r), A = new Uint8Array(W * H), B = new Uint8Array(W * H);
      for (let k = 0; k < W * H; k++) { A[k] = (0.299 * a[k * 4] + 0.587 * a[k * 4 + 1] + 0.114 * a[k * 4 + 2]) < 140; B[k] = b[k * 4] < 140; }
      const vic = (M, k) => { const X = k % W, Y = (k / W) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const x = X + dx, y = Y + dy; if (x >= 0 && y >= 0 && x < W && y < H && M[y * W + x]) return 1; } return 0; };
      let fuori = 0, ink = 0; for (let k = 0; k < W * H; k++) { if (A[k]) { ink++; if (!vic(B, k)) fuori++; } else if (B[k] && !vic(A, k)) fuori++; }
      return fuori / ink;
    }, await disegna(), 'file://' + orig);
    /* ogni combinazione con la sua taratura: larghezza del disegno (sx) e corpo (c) di ogni ruolo,
       un parametro alla volta, finche' lo scarto scende (le parole restano misurate sull'originale) */
    let scarto = await misuraScarto();
    for (const passo of [0.04, 0.02]) for (const k of Object.keys(st.ruoli)) for (const [campo, d] of [['sx', passo], ['c', passo * 25]]) for (const v of [1, -1]) {
      for (;;) { const prima = st.ruoli[k][campo]; st.ruoli[k][campo] = Math.round((prima + v * d) * 1000) / 1000; const x = await misuraScarto(); if (x < scarto - 1e-4) scarto = x; else { st.ruoli[k][campo] = prima; break; } }
    }
    const png = await disegna();
    risultati.push({ nome: set.nome, png, scarto, taratura: Object.fromEntries(Object.entries(st.ruoli).map(([k, r]) => [k, { c: r.c, sx: r.sx }])) });
    console.log('   taratura', JSON.stringify(risultati[risultati.length - 1].taratura));
    console.log(`${set.nome}: inchiostro non coincidente ${(scarto * 100).toFixed(1)}%`);
    await pg.close();
  }
  // il confronto affiancato: un ritaglio della pagina, originale e le tre proposte
  const pg = await browser.newPage();
  const [rx, ry, rw, rh] = (process.env.RITAGLIO || '250,120,780,720').split(',').map(Number);
  const ritaglio = { x: rx, y: ry, w: rw, h: rh };
  const cella = (src, titolo) => `<figure><figcaption>${titolo}</figcaption><div class="r"><img src="${src}" style="left:-${ritaglio.x}px;top:-${ritaglio.y}px"></div></figure>`;
  const origB64 = (await readFile(orig)).toString('base64');
  await pg.setViewport({ width: 4 * (ritaglio.w + 24) + 40, height: ritaglio.h + 140 });
  await pg.setContent(`<!doctype html><meta charset="utf-8"><style>body{margin:16px;font:14px system-ui;color:#222;background:#f4f4f2;display:flex;gap:24px}
    figure{margin:0} figcaption{font-weight:600;margin:0 0 8px;font-size:15px} .r{position:relative;width:${ritaglio.w}px;height:${ritaglio.h}px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2)}
    .r img{position:absolute} small{display:block;font-weight:500;color:#666;font-size:13px;margin-top:2px}</style>
    ${cella('data:image/webp;base64,' + origB64, `Original scan<small>I-CCAF page ${pagina.n}</small>`)}
    ${risultati.map((r) => cella('data:image/png;base64,' + r.png, `${r.nome}<small>ink not matching: ${(r.scarto * 100).toFixed(1)}%</small>`)).join('')}`, { waitUntil: 'load' });
  await pg.screenshot({ path: OUT, fullPage: true });
} finally {
  await browser.close();
  await rm(vuota, { force: true });
}
