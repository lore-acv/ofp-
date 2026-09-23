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
import { createHash } from 'node:crypto';
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
  ['data/aeroporti.json', 'data/aeroporti.json'],
  ['data/guida.pdf',      'data/guida.pdf'],
  ['tools/_headers',      '_headers']
];

/* IL NOME PORTA L'IMPRONTA DEL CONTENUTO

   Le pagine non si mettono in cache, il foglio di stile e il core si': senza
   accorgimenti, dopo un aggiornamento il browser si ritrova l'HTML nuovo e il
   CSS vecchio, e disegna un markup di cui non conosce le regole. Su iPad e'
   successo davvero — il pulsante del tema e' comparso come un quadratino
   bianco, perche' Safari aveva in cache un ofp.css che .tema-btn non lo
   conosceva ancora.

   Qui il nome pubblicato porta dentro l'impronta del contenuto:
   ofp.9d3f1a02.css. Cambia il file, cambia il nome, e il browser non ha
   nessuna copia vecchia da riesumare: il problema non si pone piu', e in
   cambio i due file si possono mettere in cache per sempre.

   Nel repo i nomi restano quelli di sempre, perche' Apps Script li cerca cosi'
   e li sostituisce a mano: l'impronta vive solo in dist/. */
const CON_IMPRONTA = [
  ['ofp-core.js', 'src="ofp-core.js"',              (n) => `src="${n}"`],
  ['ofp.css',     'href="ofp.css"',                 (n) => `href="${n}"`]
];

const impronta = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 8);

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
  /* Gli asset con impronta: si pubblicano col nome nuovo e si tiene da parte
     la sostituzione da fare nelle pagine. */
  const riferimenti = [];
  for (const [da, cerca, rendi] of CON_IMPRONTA) {
    const sorgente = path.join(RADICE, da);
    if (!await esiste(sorgente)) throw new Error(`manca ${da}`);
    const contenuto = await readFile(sorgente);
    const est = path.extname(da);
    const nome = `${da.slice(0, -est.length)}.${impronta(contenuto)}${est}`;
    await writeFile(path.join(DIST, nome), contenuto);
    riferimenti.push([cerca, rendi(nome)]);
    console.log(`  ${nome}  (da ${da})`);
  }

  for (const [da, a, cerca, metti] of PAGINE) {
    let html = await readFile(path.join(RADICE, da), 'utf8');
    if (!html.includes(cerca)) throw new Error(`${da}: non trovo ${cerca} — i link fra le pagine sono cambiati`);
    html = html.split(cerca).join(metti);
    /* Se un riferimento non c'e' piu', il sito uscirebbe senza stile o senza
       codice e nessuno se ne accorgerebbe fino al deploy: meglio fermarsi. */
    for (const [rif, sostituto] of riferimenti) {
      if (!html.includes(rif)) throw new Error(`${da}: non trovo ${rif} — l'asset non verrebbe caricato`);
      html = html.split(rif).join(sostituto);
    }
    const dest = path.join(DIST, a);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, html);
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
