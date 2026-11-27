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
   per il testo copiato: [indice, ...]), fissa (x e larghezze misurate a mano:
   misura.py non la tocca; per le righe impilate, come le tolleranze +0/-2), fine (x dove
   finisce la riga per la misura: l'ultima parola non va oltre, se dopo c'e' altro vicino), figura
   (scritta dentro una figura: misura.py cerca l'inchiostro solo dentro la casella della parola,
   letta da etichette.py e salvata alla prima misura in caselle: [larghezza, ...]).

     node tools/afm-rec/rec.mjs afm-ccaf            (data/afm-rec/afm-ccaf/)
     node tools/afm-rec/rec.mjs afm-ccaf --pieno    (prova "pagina piena": data/afm-rec/afm-ccaf-pieno/)
     node tools/afm-rec/rec.mjs afm-ccaf --medio    (prova "via di mezzo": data/afm-rec/afm-ccaf-medio/)

   PAGINA PIENA (prova): la gabbia del testo, comune a tutto il manuale
   (stile.json, "pieno"), riempie la pagina con margini fissi; stesse parole
   nelle stesse posizioni relative, corpo e spaziatura ricalcolati (pagina.mjs,
   pienaPagina). Le scansioni (pagine non ancora ricostruite e originale del
   confronto) si trasformano allo stesso modo, cosi' il confronto resta valido.
   ========================================================================== */
import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { svgPagina, cssRuoli, cssFont, risolvi, paroleDaMisurare, misuraNelBrowser, pienaPagina, affineLibro } from './pagina.mjs';
import { createRequire } from 'node:module';

const RADICE = process.cwd();
const ID = process.argv[2] || 'afm-ccaf';
const VARIANTE = process.argv.includes('--pieno') ? 'pieno' : process.argv.includes('--medio') ? 'medio' : null;   // prove di impaginazione (stile.json)
const PIENO = !!VARIANTE;
const DIR = path.join(RADICE, 'tools', 'afm-rec', ID);
const OUT = path.join(RADICE, 'data', 'afm-rec', ID + (VARIANTE ? '-' + VARIANTE : ''));
const FONT_OUT = path.join(RADICE, 'data', 'afm-rec', 'fonts');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stile = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));
const pagine = {};
const foto = new Set();
for (const f of (await readdir(path.join(DIR, 'pagine'))).filter((f) => f.endsWith('.json') && !f.includes('.bozza'))) {
  const p = await risolvi(JSON.parse(await readFile(path.join(DIR, 'pagine', f), 'utf8')), DIR);
  if (p.stato === 'bozza') continue;   // la bozza grezza (bozza.py) non si pubblica finche' non e' corretta
  /* le fotografie delle figure (figure/*.webp) stanno in file a parte, comuni alle prove:
     data/afm-rec/foto/<id>-<nome>; l'SVG le chiama con un percorso relativo a manuale.html */
  for (const e of p.el) if (e[0] === 'svg') e[1] = e[1].replace(/href="figure\/([^"]+)"/g, (t, nome) => { foto.add(nome); return `href="data/afm-rec/foto/${ID}-${nome}"`; });
  // "intera" (la copertina e il suo retro): la pagina e' disegnata tutta, non ha gabbia del testo
  // e nelle prove di impaginazione resta com'e', come la sua scansione (trasformaScansione)
  pagine[p.pdf] = PIENO && !p.intera ? pienaPagina(p, stile, VARIANTE) : p;
}

// la misura delle parole, con i font veri, in Chromium
const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');
const browser = await pup.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
let misure = {};
const vuota = path.join(DIR, '_vuota.html');
await writeFile(vuota, '<!doctype html><meta charset="utf-8">');
const pg = await browser.newPage(); await pg.goto('file://' + vuota);
await pg.addStyleTag({ content: cssFont(stile, `file://${RADICE}/tools/afm-rec/font/`) });
await pg.evaluate(async (fams) => { await Promise.all(fams.map((f) => document.fonts.load(f))); }, Object.entries(stile.ruoli).map(([, r]) => `${r.peso || stile.font[r.font].peso} 20px '${stile.font[r.font].famiglia}'`));
misure = await pg.evaluate(misuraNelBrowser, paroleDaMisurare(Object.values(pagine), stile));

// il libro: le pagine ufficiali, con le ricostruite al posto delle immagini
const ufficiale = await readFile(path.join(RADICE, 'data', 'afm', ID, 'libro.html'), 'utf8');
let fatte = 0;
const daFotografare = [];
const mappa = JSON.parse(await readFile(path.join(RADICE, 'tools', 'afm', ID + '.json'), 'utf8'));
/* pagina piena: la scansione si trasforma come la ricostruita (coordinate della pagina del libro),
   solo per le pagine numerate (la copertina e il retro restano come sono) */
const pct = (x) => Math.round(x * 10000) / 10000;
// la misura della pagina del libro in px della retina (1250 x 1762 per I-CCAF, 1600 x 2473 per I-CCAB)
const PW = mappa.retina;
const PH = (() => { const v = Object.values(pagine).find((p) => p.rot !== -90 && !p.intera) || Object.values(pagine)[0]; return v ? Math.round(PW * (v.rot === -90 ? v.w / v.h : v.h / v.w)) : Math.round(PW * 1.4096); })();
const trasformaScansione = (pdf, attr) => {
  if (!PIENO || !/data-n="/.test(attr)) return '';
  // le pagine di traverso (stampate girate: I-CCAF le ha ruotate nel PDF, I-CCAB sulla pagina)
  const rot = (mappa.traverso || []).includes(+pdf) ? -90 : 0;
  const finta = rot === -90 ? { rot, w: PH, h: PW } : { rot, w: PW, h: PH };
  const L = affineLibro(stile, finta, VARIANTE);
  return ` style="transform-origin:0 0;transform:translate(${pct(L.bx / PW * 100)}%,${pct(L.by / PH * 100)}%) scale(${pct(L.ax)},${pct(L.ay)})"`;
};
let libro = ufficiale.replace(/<div class="pg-afm([^"]*)" data-pdf="(\d+)"([^>]*)>((?:<i id="[^"]*"><\/i>)*)<img ([^>]*)><\/div>/g, (tutto, cls, pdf, attr, ancore, img) => {
  const p = pagine[+pdf];
  const orig = `<img class="rec-orig"${trasformaScansione(pdf, attr)} ${img}>`;
  if (!p) return `<div class="pg-afm${cls} rec-no" data-pdf="${pdf}"${attr}>${ancore}${orig}</div>`;
  fatte++;
  const svg = svgPagina(p, stile, misure), dim = img.match(/width="(\d+)" height="(\d+)"/);
  daFotografare.push({ pdf: +pdf, n: p.n, svg, w1: +dim[1], h1: +dim[2] });
  /* LA PAGINA NEL LIBRO: la sua fotografia (come la scansione, due risoluzioni, la
     carica il visore) e l'SVG vera in un <template>, inerte: il visore la monta solo
     sulle pagine in vista a libro fermo. Sfogliare costa cosi' quanto le scansioni. */
  return `<div class="pg-afm${cls} rec" data-pdf="${pdf}"${attr} data-stato="${esc(p.stato || '')}">${ancore}<img class="rec-ras" alt="" width="${dim[1]}" height="${dim[2]}" data-s1="@RAS1-${pdf}@" data-s2="@RAS2-${pdf}@"><template class="rec-t">${svg}</template>${orig}</div>`;
});
const meta = JSON.parse(libro.match(/data-meta="([^"]*)"/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
meta.rec = true; meta.testo = null;
meta.titolo += ' · reconstructed preview' + ({ pieno: ' (full page test)', medio: ' (middle layout)' }[VARIANTE] || '');
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
await mkdir(path.join(RADICE, 'data', 'afm-rec', 'foto'), { recursive: true });
for (const nome of foto) await copyFile(path.join(DIR, 'figure', nome), path.join(RADICE, 'data', 'afm-rec', 'foto', `${ID}-${nome}`));
/* LE FOTOGRAFIE DELLE PAGINE RICOSTRUITE: Chromium disegna ogni SVG con i font
   veri alle due misure delle scansioni (s1 alla misura dell'immagine nel libro,
   s2 la retina, 1250 px di larghezza) e la salva in webp col nome che porta
   l'impronta del contenuto (si tiene in cache per sempre, come le scansioni). */
const { createHash } = await import('node:crypto');
const { rm } = await import('node:fs/promises');
const DIRP = path.join(OUT, 'p');
await rm(DIRP, { recursive: true, force: true }); await mkdir(DIRP, { recursive: true });
await pg.addStyleTag({ content: classi + ' body{margin:0;background:#fff} .rec-svg{display:block} .rec-svg text{fill:#161616;white-space:pre} .rec-svg line{stroke:#161616} .rec-svg rect,.rec-svg polygon,.rec-svg path,.rec-svg circle{fill:#161616} .rec-svg g[style*="fill"] path{fill:inherit}' });
const RETINA = mappa.retina;
for (const f of daFotografare) {
  for (const [liv, w] of [[1, f.w1], [2, RETINA]]) {
    const h = Math.round(w * f.h1 / f.w1);
    await pg.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await pg.evaluate(async (svg, w, h) => {
      document.body.innerHTML = svg;
      const s = document.querySelector('svg'); s.setAttribute('width', w); s.setAttribute('height', h);
      await document.fonts.ready;
      await Promise.all([...s.querySelectorAll('image')].map((im) => { const i = new Image(); i.src = im.getAttribute('href'); return i.decode().catch(() => {}); }));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, f.svg.replace(/href="data\//g, `href="file://${RADICE}/data/`), w, h);
    const buf = await pg.screenshot({ type: 'webp', quality: 88, clip: { x: 0, y: 0, width: w, height: h } });
    const nome = `${String(f.pdf).padStart(3, '0')}-${liv}.${createHash('sha1').update(buf).digest('hex').slice(0, 8)}.webp`;
    await writeFile(path.join(DIRP, nome), buf);
    libro = libro.replace(`@RAS${liv}-${f.pdf}@`, path.relative(RADICE, path.join(DIRP, nome)));
  }
}
await rm(vuota, { force: true });
await browser.close();
await writeFile(path.join(OUT, 'libro.html'), intestazione + libro.replace(/^<!--[^\n]*-->\n/, ''));
console.log(`${path.relative(RADICE, OUT)}/libro.html: ${fatte} reconstructed pages of ${Object.keys(pagine).length} sources`);
