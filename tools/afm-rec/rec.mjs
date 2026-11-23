#!/usr/bin/env node
/* ============================================================================
   FLIGHT MANUAL RICOSTRUITO — ANTEPRIMA (non fa fede)
   ============================================================================
   Costruisce data/afm-rec/<id>/libro.html, il libro che manuale.html apre con
   ?libro=<id>-rec. Le pagine ricostruite sono disegnate qui da
   tools/afm-rec/<id>/pagine/<n>.json; le altre restano l'immagine della
   scansione con la scritta "not yet reconstructed". Gli e-book ufficiali
   (data/afm/, tools/afm.mjs) non si toccano: da li' si leggono solo le
   immagini originali, che il visore sovrappone nella modalita' confronto.

   PAGINA PER PAGINA, NON A FLUSSO. Una pagina e' un SVG a misura fissa con le
   coordinate dell'immagine retina della scansione (1250 px di larghezza per
   I-CCAF): ogni parola sta dove sta nell'originale, sulla sua linea di base,
   con il font del suo ruolo (stile.json: famiglia, peso, corpo dato
   dall'altezza delle maiuscole, larghezza del disegno). Niente va a capo da
   solo e niente scivola sulla pagina dopo. Il testo e' testo vero:
   selezionabile, ricercabile, nitido a ogni ingrandimento.

   Elementi di una pagina (pagine/<n>.json, "el"):
     ["riga", ruolo, base, [[x, "parola"], ...], {opzioni}]   testo
     ["punti", base, [x, ...], ruolo]                          puntini guida
     ["linea", x1, y1, x2, y2, spessore]                      filetto
     ["rett", x, y, w, h]                                      rettangolo pieno
     ["poli", [[x, y], ...]]                                   poligono pieno
     ["svg", "<g>...</g>"]                                     disegno libero
     ["svgfile", "figure/fig-5-7.svg"]                         figura in un file (fatta dal suo script)
   opzioni di una riga: c (altezza delle maiuscole, se diversa dal ruolo),
   sup (parole in apice: [indice, ...], con supK il loro corpo e supY
   l'altezza, in frazioni del corpo della riga), ang (-90: riga verticale
   che sale; base e' allora la x della linea di base, e la x di ogni parola
   e' la y dove comincia), libro (coordinate della pagina del libro diritta,
   per l'intestazione delle pagine girate), unite (parole senza spazio dopo,
   per il testo copiato: [indice, ...]).

     node tools/afm-rec/rec.mjs afm-ccaf
   ========================================================================== */
import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { svgPagina, cssRuoli, cssFont, risolvi, paroleDaMisurare, misuraNelBrowser } from './pagina.mjs';
import { createRequire } from 'node:module';

const RADICE = process.cwd();
const ID = process.argv[2] || 'afm-ccaf';
const DIR = path.join(RADICE, 'tools', 'afm-rec', ID);
const OUT = path.join(RADICE, 'data', 'afm-rec', ID);
const FONT_OUT = path.join(RADICE, 'data', 'afm-rec', 'fonts');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stile = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));
const pagine = {};
for (const f of (await readdir(path.join(DIR, 'pagine'))).filter((f) => f.endsWith('.json') && !f.includes('.bozza'))) {
  const p = await risolvi(JSON.parse(await readFile(path.join(DIR, 'pagine', f), 'utf8')), DIR);
  pagine[p.pdf] = p;
}

// la misura delle parole, con i font veri, in Chromium
const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');
const browser = await pup.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
let misure = {};
try {
  const vuota = path.join(DIR, '_vuota.html');
  await writeFile(vuota, '<!doctype html><meta charset="utf-8">');
  const pg = await browser.newPage(); await pg.goto('file://' + vuota);
  await pg.addStyleTag({ content: cssFont(stile, `file://${RADICE}/tools/afm-rec/font/`) });
  await pg.evaluate(async (fams) => { await Promise.all(fams.map((f) => document.fonts.load(f))); }, Object.entries(stile.ruoli).map(([, r]) => `${r.peso || stile.font[r.font].peso} 20px '${stile.font[r.font].famiglia}'`));
  misure = await pg.evaluate(misuraNelBrowser, paroleDaMisurare(Object.values(pagine), stile));
  await (await import('node:fs/promises')).rm(vuota, { force: true });
} finally { await browser.close(); }

// il libro: le pagine ufficiali, con le ricostruite al posto delle immagini
const ufficiale = await readFile(path.join(RADICE, 'data', 'afm', ID, 'libro.html'), 'utf8');
let fatte = 0;
let libro = ufficiale.replace(/<div class="pg-afm([^"]*)" data-pdf="(\d+)"([^>]*)>((?:<i id="[^"]*"><\/i>)*)<img ([^>]*)><\/div>/g, (tutto, cls, pdf, attr, ancore, img) => {
  const p = pagine[+pdf];
  const orig = `<img class="rec-orig" ${img}>`;
  if (!p) return `<div class="pg-afm${cls} rec-no" data-pdf="${pdf}"${attr}>${ancore}${orig}<div class="rec-nota">Not yet reconstructed · original scan</div></div>`;
  fatte++;
  return `<div class="pg-afm${cls} rec" data-pdf="${pdf}"${attr} data-stato="${esc(p.stato || '')}">${ancore}${svgPagina(p, stile, misure)}${orig}</div>`;
});
const meta = JSON.parse(libro.match(/data-meta="([^"]*)"/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
meta.rec = true; meta.testo = null;
meta.titolo += ' · reconstructed preview';
libro = libro.replace(/data-meta="[^"]*"/, `data-meta="${esc(JSON.stringify(meta))}"`)
  .replace('<div class="libro-afm"', '<div class="libro-afm libro-rec"');

const fontCss = cssFont(stile, 'data/afm-rec/fonts/');
const classi = cssRuoli(stile);
const intestazione = `<!-- Generato da tools/afm-rec/rec.mjs da tools/afm-rec/${ID}/: non modificare a mano. ANTEPRIMA RICOSTRUITA, NON FA FEDE. -->
<style data-libro>
${fontCss}
${classi}
</style>
`;
await mkdir(OUT, { recursive: true });
await mkdir(FONT_OUT, { recursive: true });
for (const f of Object.values(stile.font)) await copyFile(path.join(RADICE, 'tools', 'afm-rec', 'font', f.file), path.join(FONT_OUT, f.file));
await writeFile(path.join(OUT, 'libro.html'), intestazione + libro.replace(/^<!--[^\n]*-->\n/, ''));
console.log(`data/afm-rec/${ID}/libro.html: ${fatte} reconstructed pages of ${Object.keys(pagine).length} sources`);
