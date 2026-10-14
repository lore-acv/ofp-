#!/usr/bin/env node
/* ============================================================================
   STANDARD ROUTES ACV — da NavLog ForeFlight a rotte-acv.js
   ============================================================================
   Le rotte standard dell'aeroclub sono NavLog di ForeFlight (PDF) in
   data/rotte-acv/, elencate in data/rotte-acv/elenco.json con nome, id e
   l'eventuale aeroporto di Touch & Go. Questo script le legge con lo STESSO
   parser della pagina di import (parseNavlogPdf + navlogSummary di
   ofp-core.js, dentro Chromium) e scrive rotte-acv.js: scegliere una rotta
   standard e' quindi identico a caricare quel PDF.

   Uso:  CHROME=/percorso/chromium node tools/rotte-acv.mjs
   ========================================================================== */
import http from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const RADICE = process.cwd();
const require = createRequire(path.join(RADICE, 'package.json'));
const puppeteer = require('puppeteer-core');
const DIR = path.join(RADICE, 'data/rotte-acv');
const NM = path.join(RADICE, 'node_modules');
const TIPI = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.pdf':'application/pdf' };

// un server statico minimo sulla radice del repo, come il sito vero
const server = http.createServer(async (req, res) => {
  try {
    const p = path.join(RADICE, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(RADICE)) throw new Error('fuori');
    const corpo = await readFile(p);      // prima si legge: un file mancante e' un 404
    res.writeHead(200, { 'Content-Type': TIPI[path.extname(p)] || 'application/octet-stream' });
    res.end(corpo);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// pdf.js arriva da cdnjs nella pagina: qui si serve quello di node_modules
const CDN = { 'pdf.min.js': 'pdfjs-dist/build/pdf.min.js', 'pdf.worker.min.js': 'pdfjs-dist/build/pdf.worker.min.js' };

const elenco = JSON.parse(await readFile(path.join(DIR, 'elenco.json'), 'utf8'));
const browser = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const out = [];
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', async r => {
    const u = r.url();
    if (u.startsWith(base)) return r.continue();
    const k = Object.keys(CDN).find(k => u.endsWith('/' + k));
    if (k) return r.respond({ status: 200, contentType: 'application/javascript', body: await readFile(path.join(NM, CDN[k])) });
    r.respond({ status: 404, body: '' });
  });
  for (const r of elenco) {
    await page.goto(`${base}/import.html`, { waitUntil: 'load' });
    await (await page.$('#navFile')).uploadFile(path.join(DIR, r.pdf));
    await page.waitForFunction(() => typeof State !== 'undefined' && (State.nav || /err/.test(document.getElementById('navStatus').className)), { timeout: 30000 });
    const nav = await page.evaluate(() => State.nav);
    if (!nav) throw new Error(`${r.pdf}: NavLog non riconosciuto`);
    out.push({ id: r.id, nome: r.nome, tng: r.tng || '', fonte: r.fonte || '', nav });
    console.log(`${r.id}: ${nav.legs.length} waypoint, ${nav.totals.dist} nm`);
  }
} finally { await browser.close(); server.close(); }

const testa = `/* STANDARD ROUTES ACV — le rotte standard dell'Aeroclub Varese.

   Generato da tools/rotte-acv.mjs a partire dai NavLog ForeFlight in
   data/rotte-acv/: non si modifica a mano. Ogni rotta e' il NavLog letto dallo
   stesso parser della pagina di import, quindi sceglierla e' come caricare quel
   file. Tempi e carburante di ForeFlight restano solo come riferimento
   nell'anteprima: il foglio di volo li ricalcola con il settaggio di potenza.

   tng: l'aeroporto dove la rotta prevede un Touch & Go, che il foglio di volo
   trova gia' spuntato. */
`;
const json = JSON.stringify(out, null, 1).replace(/\n\s+(?=[\]}"0-9n-])/g, ' ');
await writeFile(path.join(RADICE, 'rotte-acv.js'), testa + 'window.ROTTE_ACV = ' + json + ';\n');
console.log(`rotte-acv.js: ${out.length} rotte`);
