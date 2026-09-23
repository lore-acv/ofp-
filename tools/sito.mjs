#!/usr/bin/env node
/* ============================================================================
   BUILD DEL SITO STATICO
   ============================================================================
   L'app e' gia' un sito statico: tutto il lavoro — parsing del briefing,
   calcoli AFM, jsPDF, pdf.js — gira nel browser, e i link fra le due pagine
   sono relativi. Apps Script e' l'adattatore, non il contrario.

   Qui si raccoglie in dist/ solo quello che va pubblicato: le due pagine, il
   core, il foglio di stile, il pacchetto dati e le intestazioni di Cloudflare.
   Restano fuori Codice.gs, appsscript.json, i tools e la documentazione.

   Uso:  node tools/sito.mjs
   ========================================================================== */
import { mkdir, copyFile, rm, stat, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const RADICE = process.cwd();
const DIST = path.join(RADICE, 'dist');

/* Le due pagine si scambiano di posto nel sito pubblicato.

   Il volo comincia dall'import: e' li' che si caricano NavLog e briefing, e da
   li' si arriva al foglio gia' compilato. Aprire la radice sul foglio vuoto
   vuol dire far cominciare tutti da un cartello che dice "prima serve
   l'import".

   Nel repo i nomi restano quelli che vuole Apps Script — HtmlService cerca i
   file per nome, 'index' e 'import' — e lo scambio si fa solo qui, insieme ai
   due link che le pagine si scambiano. */
const DA_PUBBLICARE = [
  ['ofp-core.js',         'ofp-core.js'],
  ['ofp.css',             'ofp.css'],
  ['data/aeroporti.json', 'data/aeroporti.json'],
  ['data/guida.pdf',      'data/guida.pdf'],
  ['tools/_headers',      '_headers']
];

/* [sorgente, destinazione, [da, a] del link da riscrivere] */
const PAGINE = [
  ['import.html', 'index.html', 'href="index.html"',  'href="ofp.html"'],
  ['index.html',  'ofp.html',   'href="import.html"', 'href="./"']
];

/* Il pacchetto dati non si committa a mano: lo costruisce tools/dati-aeroporti.mjs
   e lo rinfresca l'azione GitHub. Se manca, il sito funziona lo stesso — il
   client ripiega sui CSV — ma e' bene dirlo, perche' e' una differenza di
   venti megabyte per chi apre l'app. */
const FACOLTATIVI = new Set(['data/aeroporti.json', 'data/guida.pdf']);

async function esiste(p) { try { await stat(p); return true; } catch { return false; } }

async function peso(dir) {
  let tot = 0;
  for (const v of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, v.name);
    tot += v.isDirectory() ? await peso(p) : (await stat(p)).size;
  }
  return tot;
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  const mancanti = [];
  for (const [da, a] of DA_PUBBLICARE) {
    const sorgente = path.join(RADICE, da);
    if (!await esiste(sorgente)) {
      if (FACOLTATIVI.has(da)) { mancanti.push(da); continue; }
      throw new Error(`manca ${da}`);
    }
    const dest = path.join(DIST, a);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(sorgente, dest);
    console.log('  ' + a);
  }
  for (const [da, a, cerca, metti] of PAGINE) {
    const html = await readFile(path.join(RADICE, da), 'utf8');
    if (!html.includes(cerca)) throw new Error(`${da}: non trovo ${cerca} — i link fra le pagine sono cambiati`);
    const dest = path.join(DIST, a);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, html.split(cerca).join(metti));
    console.log(`  ${a}  (da ${da})`);
  }

  console.log(`\ndist/ pronta — ${(await peso(DIST) / 1024).toFixed(0)} kB`);
  if (mancanti.length) {
    console.log(`\nATTENZIONE: manca ${mancanti.join(', ')}.`);
    console.log('Il sito funziona lo stesso, ma ogni visitatore si scarichera\' i CSV');
    console.log('di OurAirports (una ventina di megabyte). Genera il pacchetto con:');
    console.log('  node tools/dati-aeroporti.mjs');
  }
}

main().catch(e => { console.error('ERRORE:', e.message); process.exit(1); });
