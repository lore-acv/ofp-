#!/usr/bin/env node
/* IL RETRO DELLA COPERTINA (pagina 2 del PDF, bianca): l'avvertenza "anteprima,
   non fa fede", scritta come una pagina del manuale. Prima stava in un
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

const TITOLO = 'RECONSTRUCTED PREVIEW — NOT AUTHORITATIVE.';
const TESTO = 'This copy of the Flight Manual is a digital reconstruction, made for preview only. '
  + 'It is not authoritative and does not replace the original: refer to the original Flight Manual. '
  + 'The pages not yet reconstructed show the scan of the original.';
const X0 = 278, X1 = 1003, RIENTRO = 42, Y_TITOLO = 598, Y_TESTO = 656, PASSO = 31;

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
// il titolo: le parole al loro posto naturale
{
  const parole = TITOLO.split(' '), w = await larghezze('titolo', parole), sp = await spazioDi('titolo');
  let x = X0; const riga = [];
  parole.forEach((t, i) => { riga.push([Math.round(x * 10) / 10, t]); x += w[i] + sp; });
  el.push(['riga', 'titolo', Y_TITOLO, riga]);
}
// il paragrafo: righe piene giustificate, l'ultima a bandiera
{
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
    el.push(['riga', 'testo', Y_TESTO + k * PASSO, riga]);
  });
}
await browser.close();

const p = { pdf: 2, n: 'inside cover', w: 1250, h: 1762, rot: 0, stato: 'ricostruita',
  figure: [{ figura: "Avvertenza dell'anteprima", metodo: "pagina bianca nell'originale: vi si scrive l'avvertenza dell'anteprima, nei ruoli titolo e testo del manuale, giustificata nella colonna del testo (tools/afm-rec/afm-ccaf/costruisci/retro.mjs)." }] };
const s = '{\n' + Object.entries(p).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n')
  + ',\n  "el": [\n' + el.map((e) => '    ' + JSON.stringify(e)).join(',\n') + '\n  ]\n}\n';
await writeFile(path.join(DIR, 'pagine', 'retro.json'), s);
console.log('retro:', el.length, 'righe');
