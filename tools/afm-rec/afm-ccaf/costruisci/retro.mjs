#!/usr/bin/env node
/* IL RETRO DELLA COPERTINA (pagina 2 del PDF, bianca): l'avviso della traduzione
   (spostato dalla copertina) e l'avvertenza "anteprima, non fa fede", scritti come
   una pagina del manuale. Prima stava in un
   cartellino HTML sopra la copertina; qui e' testo della pagina, con i ruoli
   del manuale (titolo e testo di stile.json) e l'impaginazione delle sue pagine
   di testo: il titolo a sinistra a filo della colonna, il paragrafo con il
   rientro della prima riga, giustificato fra 278 e 1003 (la colonna del testo,
   misurata sulle pagine come la 5-1), le righe ogni 31 px. Le parole si
   misurano in Chromium con i font veri e si distribuiscono sulla riga.

   La pagina non e' "intera": nelle prove di impaginazione (--medio, --pieno)
   si trasforma come le pagine di testo, e l'avvertenza resta nella colonna
   del testo del libro.

     node tools/afm-rec/afm-ccaf/costruisci/retro.mjs
*/
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { corpo, cssFont } from '../../pagina.mjs';

const RADICE = process.cwd();
const DIR = path.join(RADICE, 'tools', 'afm-rec', 'afm-ccaf');
const stile = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));

/* due avvertenze: quella della traduzione (nell'originale e' un riquadro rosso incollato sulla
   copertina: la copertina restaurata non lo porta, il testo e' questo, parola per parola, compreso
   "SGAC.This" senza spazio) e quella dell'anteprima ricostruita */
const BLOCCHI = [
  ['ENGLISH TRANSLATION - FOR COURTESY ONLY.',
    'This is an unofficial English courtesy translation of the FR172J French Flight Manual approved by SGAC.This '
    + 'manual is not formally approved by ENAC (Italian Civil Aviation Authority). Therefore, please consider that only '
    + 'the original version in French language has a legal value.'],
  ['RECONSTRUCTED PREVIEW — NOT AUTHORITATIVE.',
    'This copy of the Flight Manual is a digital reconstruction, made for preview only. '
    + 'It is not authoritative and does not replace the original: refer to the original Flight Manual. '
    + 'The pages not yet reconstructed show the scan of the original.'],
];
// come le pagine di testo: titolo, 58 px fino alla prima riga, righe ogni 31, 90 px fra i blocchi
const X0 = 278, X1 = 1003, RIENTRO = 42, Y_INIZIO = 598, DOPO_TITOLO = 58, PASSO = 31, FRA_BLOCCHI = 90;

const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');
const browser = await pup.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] });
const vuota = path.join(os.tmpdir(), 'afm-rec-retro.html');
await writeFile(vuota, '<!doctype html><meta charset="utf-8">');
const pg = await browser.newPage(); await pg.goto('file://' + vuota);
await pg.addStyleTag({ content: cssFont(stile, `file://${RADICE}/tools/afm-rec/font/`) });
// la larghezza di una parola come la disegna svgPagina: il font del ruolo al suo corpo, la
// spaziatura del ruolo, il tutto stretto in orizzontale di sx
const larghezze = async (ruolo, parole) => {
  const r = stile.ruoli[ruolo], f = stile.font[r.font];
  const font = `${r.peso || f.peso} ${corpo(stile, ruolo)}px '${f.famiglia}'`;
  await pg.evaluate((font) => document.fonts.load(font), font);
  return pg.evaluate((font, parole, spazio, sx) => {
    const c = document.createElement('canvas').getContext('2d'); c.font = font;
    const fs = parseFloat(font.split(' ')[1]);
    return parole.map((w) => (c.measureText(w).width + spazio * fs * w.length) * sx);
  }, font, parole, r.spazio || 0, r.sx);
};
const spazioDi = async (ruolo) => (await larghezze(ruolo, ['a b', 'ab']).then(([a, b]) => a - b));

const el = [];
let y = Y_INIZIO;
for (const [TITOLO, TESTO] of BLOCCHI) {
  // il titolo: le parole al loro posto naturale
  {
    const parole = TITOLO.split(' '), w = await larghezze('titolo', parole), sp = await spazioDi('titolo');
    let x = X0; const riga = [];
    parole.forEach((t, i) => { riga.push([Math.round(x * 10) / 10, t]); x += w[i] + sp; });
    el.push(['riga', 'titolo', y, riga]);
  }
  // il paragrafo: righe piene giustificate, l'ultima a bandiera
  const parole = TESTO.split(' '), w = await larghezze('testo', parole), sp = await spazioDi('testo');
  const righe = []; let cur = [], largo = 0, x0 = X0 + RIENTRO;
  parole.forEach((t, i) => {
    const serve = cur.length ? largo + sp + w[i] : w[i];
    if (cur.length && x0 + serve > X1) { righe.push({ x0, cur, largo }); cur = []; largo = 0; x0 = X0; }
    largo = cur.length ? largo + sp + w[i] : w[i]; cur.push(i);
  });
  righe.push({ x0, cur, largo, ultima: true });
  righe.forEach(({ x0, cur, largo, ultima }, k) => {
    const extra = ultima || cur.length < 2 ? 0 : (X1 - x0 - largo) / (cur.length - 1);
    let x = x0; const riga = [];
    cur.forEach((i) => { riga.push([Math.round(x * 10) / 10, parole[i]]); x += w[i] + sp + extra; });
    el.push(['riga', 'testo', y + DOPO_TITOLO + k * PASSO, riga]);
  });
  y += DOPO_TITOLO + (righe.length - 1) * PASSO + FRA_BLOCCHI;
}
await browser.close();

const p = { pdf: 2, n: 'inside cover', w: 1250, h: 1762, rot: 0, stato: 'ricostruita',
  figure: [{ figura: "Avvertenze", metodo: "pagina bianca nell'originale: vi si scrivono l'avviso della traduzione (che nell'originale e' un riquadro incollato sulla copertina) e l'avvertenza dell'anteprima, nei ruoli titolo e testo del manuale, giustificate nella colonna del testo (tools/afm-rec/afm-ccaf/costruisci/retro.mjs)." }] };
const s = '{\n' + Object.entries(p).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n')
  + ',\n  "el": [\n' + el.map((e) => '    ' + JSON.stringify(e)).join(',\n') + '\n  ]\n}\n';
await writeFile(path.join(DIR, 'pagine', 'retro.json'), s);
console.log('retro:', el.length, 'righe');
