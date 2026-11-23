#!/usr/bin/env node
/* ============================================================================
   FLIGHT MANUAL — costruisce l'e-book dei manuali di volo degli aeroplani
   ============================================================================
   Il manuale di volo fa fede: niente riscrittura, niente OCR impaginato. Ogni
   pagina del libro e' una pagina dell'AFM, rasterizzata dal PDF con pdf.js
   dentro Chromium e salvata in WebP a due risoluzioni (schermo e retina).
   Nessuna ripaginazione: pagina dell'AFM = pagina dell'e-book, con la sua
   numerazione originale (5-3) accanto all'indice di pagina.

   Per ogni aeromobile si legge:
   - il PDF, in data/afm/<id>.pdf (lo stesso file che il sito fa scaricare);
   - la mappa scritta a mano in tools/afm/<id>.json: sezioni (numero, titolo,
     nome della linguetta, prima pagina, voci dell'indice dell'AFM), pagine
     preliminari, pagine da saltare, pagine da ruotare o stampate di
     traverso, numerazione originale, retro della copertina, figure.

   e si scrive data/afm/<id>/:
   - libro.html, le pagine e l'indice per manuale.html?libro=<id> (lo stesso
     visore del manuale d'uso, vedi LIBRI in manuale.html);
   - p/NNN-1.<impronta>.webp e p/NNN-2.<impronta>.webp, le immagini delle
     pagine (larghe 800 px e "retina"); l'impronta del contenuto nel nome le
     rende cacheabili per sempre (tools/_headers);
   - testo.json, il testo di ogni pagina per la ricerca, solo se il PDF ne ha
     uno (I-CCAF: OCR di Acrobat gia' nel PDF; I-CCAB e' una scansione senza
     testo e non si fa OCR).

   Serve Chromium e due pacchetti che il sito non usa — il deploy non
   costruisce nulla, trova tutto gia' pronto nel repo:

     npm i --no-save puppeteer-core pdfjs-dist@3.11.174
     CHROME=/percorso/chrome node tools/afm.mjs            (tutti e due)
     CHROME=/percorso/chrome node tools/afm.mjs afm-ccaf   (uno solo)

   ========================================================================== */
import { readFile, writeFile, rm, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';

const RADICE = process.cwd();
const MAPPE = path.join(RADICE, 'tools', 'afm');
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium';
const SCHERMO = 800;          // px: la pagina sullo schermo di un computer
const QUALITA = 0.74;         // WebP: il testo della scansione resta pulito, il fondo non pesa

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function carica(nome) {
  try { return await import(nome); }
  catch {
    try { return createRequire(path.join(RADICE, 'x.js'))(nome); }
    catch {
      console.error(`Missing package "${nome}":  npm i --no-save puppeteer-core pdfjs-dist@3.11.174`);
      process.exit(1);
    }
  }
}
const modulo = (rel) => createRequire(path.join(RADICE, 'x.js')).resolve(rel);

/* ------------------------------------------------------------ la mappa */
/* Il numero originale di ogni pagina del PDF ("5-3", "iv"), o '' */
function numeriOriginali(m, n) {
  const out = Array(n + 1).fill('');
  for (const r of m.numeri) {
    for (let p = r.da, k = 0; p <= r.a; p++, k++) {
      out[p] = Array.isArray(r.num) ? (r.num[k] || '') : r.num.replace('{n}', k + 1);
    }
  }
  return out;
}

function controllaMappa(m, n) {
  const err = [];
  const num = numeriOriginali(m, n);
  const pagDi = new Map(); num.forEach((x, p) => { if (x && !pagDi.has(x)) pagDi.set(x, p); });
  const dentro = (p) => Number.isInteger(p) && p >= 1 && p <= n && !m.salta.includes(p);
  for (const v of m.preliminari) if (!dentro(v.pagina)) err.push(`preliminari: ${v.titolo} p. ${v.pagina}`);
  for (const s of m.sezioni) {
    if (!dentro(s.pagina)) err.push(`sezione ${s.num}: p. ${s.pagina}`);
    for (const [t, x] of s.voci) if (!pagDi.has(x)) err.push(`sezione ${s.num}: "${t}" ${x} non e' nella numerazione`);
  }
  for (const [f, x] of Object.entries(m.figure || {})) if (!pagDi.has(x)) err.push(`figura ${f}: pagina ${x} assente`);
  if (m.retro != null && !(m.retro >= 1 && m.retro <= n)) err.push('retro fuori dal PDF');
  if (err.length) throw new Error(`${m.id}: mappa non valida\n  ` + err.join('\n  '));
  return { num, pagDi };
}

/* ------------------------------------------------------------ Chromium */
/* La pagina di lavoro: pdf.js (il build "legacy", che si carica con un
   <script>) e una funzione che disegna una pagina del PDF in una tela della
   misura del libro, ruotata se serve, e la restituisce in WebP. Si disegna al
   doppio e si riduce con il filtro buono del browser: le scansioni a 600 dpi
   in bianco e nero, ridotte in un passo solo, si sgranano. */
const LAVORO = (pdfjsUrl, workerUrl) => `<!doctype html><meta charset="utf-8"><body>
<script src="${pdfjsUrl}"></script>
<script>
pdfjsLib.GlobalWorkerOptions.workerSrc=${JSON.stringify(workerUrl)};
let doc=null;
async function apri(url){ doc=await pdfjsLib.getDocument({url, verbosity:0}).promise; return doc.numPages; }
async function misura(n){ const p=await doc.getPage(n); const v=p.getViewport({scale:1}); return {w:v.width,h:v.height,rot:p.rotate}; }
async function disegna(n, extra, W, H, q){
  const p=await doc.getPage(n);
  const v0=p.getViewport({scale:1, rotation:(p.rotate+extra+360)%360});
  const s=Math.min(2*W/v0.width, 2*H/v0.height);
  const v=p.getViewport({scale:s, rotation:(p.rotate+extra+360)%360});
  const c=document.createElement('canvas'); c.width=Math.ceil(v.width); c.height=Math.ceil(v.height);
  const x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height);
  await p.render({canvasContext:x, viewport:v, intent:'print'}).promise;
  const o=document.createElement('canvas'); o.width=W; o.height=H;
  const y=o.getContext('2d'); y.fillStyle='#fff'; y.fillRect(0,0,W,H);
  y.imageSmoothingEnabled=true; y.imageSmoothingQuality='high';
  const w=c.width/2, h=c.height/2;
  y.drawImage(c, Math.round((W-w)/2), Math.round((H-h)/2), Math.round(w), Math.round(h));
  const b=await new Promise(r=>o.toBlob(r,'image/webp',q));
  const buf=new Uint8Array(await b.arrayBuffer());
  let bin=''; for(let i=0;i<buf.length;i+=0x8000) bin+=String.fromCharCode.apply(null, buf.subarray(i,i+0x8000));
  return btoa(bin);
}
async function testo(n){
  const p=await doc.getPage(n); const t=await p.getTextContent();
  return t.items.map(i=>i.str).join(' ').replace(/\\s+/g,' ').trim();
}
</script>`;

/* ------------------------------------------------------------ un libro */
async function costruisci(browser, id) {
  const m = JSON.parse(await readFile(path.join(MAPPE, id + '.json'), 'utf8'));
  const pdfFile = path.join(RADICE, m.pdf);
  const fuori = path.join(RADICE, 'data', 'afm', id);
  const pg = await browser.newPage();
  const lavoro = path.join(MAPPE, '_lavoro.html');
  await writeFile(lavoro, LAVORO('file://' + modulo('pdfjs-dist/legacy/build/pdf.js'), 'file://' + modulo('pdfjs-dist/legacy/build/pdf.worker.js')));
  try {
    await pg.goto('file://' + lavoro);
    const n = await pg.evaluate((u) => apri(u), 'file://' + pdfFile);
    const { num, pagDi } = controllaMappa(m, n);
    const ruota = (p) => +(m.ruota || {})[p] || 0;

    /* La misura della pagina del libro: quella delle pagine verticali del PDF
       (la mediana: le scansioni variano di qualche punto). */
    const rapporti = [];
    for (let p = 1; p <= n; p++) {
      if (m.salta.includes(p)) continue;
      const d = await pg.evaluate((k) => misura(k), p);
      const r = ruota(p) % 180 ? d.h / d.w : d.w / d.h;
      if (r < 1) rapporti.push(r);
    }
    rapporti.sort((a, b) => a - b);
    const rapp = rapporti[Math.floor(rapporti.length / 2)];
    const misure = [[1, SCHERMO], [2, m.retina]].map(([k, W]) => ({ k, W, H: Math.round(W / rapp) }));

    // le pagine del libro, nell'ordine: quelle del PDF meno le saltate, poi il retro
    const ordine = [];
    for (let p = 1; p <= n; p++) if (!m.salta.includes(p) && p !== m.retro) ordine.push({ pdf: p });
    // il retro chiude il libro su una pagina sinistra (indice dispari), come nel manuale d'uso
    if (ordine.length % 2 === 0) ordine.push({ bianca: true });
    ordine.push(m.retro != null ? { pdf: m.retro, retro: true } : { retro: true, generato: true });

    await rm(path.join(fuori, 'p'), { recursive: true, force: true });
    await mkdir(path.join(fuori, 'p'), { recursive: true });
    const pesi = { 1: 0, 2: 0 };
    const testi = [];
    for (const [i, o] of ordine.entries()) {
      if (!o.pdf) continue;
      o.file = {};
      for (const { k, W, H } of misure) {
        const b64 = await pg.evaluate((p, r, w, h, q) => disegna(p, r, w, h, q), o.pdf, ruota(o.pdf), W, H, QUALITA);
        const buf = Buffer.from(b64, 'base64');
        const nome = `p/${String(i).padStart(3, '0')}-${k}.${createHash('sha1').update(buf).digest('hex').slice(0, 8)}.webp`;
        await writeFile(path.join(fuori, nome), buf);
        o.file[k] = nome; pesi[k] += buf.length;
      }
      testi.push({ i, t: await pg.evaluate((p) => testo(p), o.pdf) });
      process.stdout.write(`\r${id}: page ${i + 1}/${ordine.length}`);
    }
    process.stdout.write('\n');

    /* --------------------------------------------------- l'indice */
    const voci = [], ancore = {};      // ancore: indice di pagina del libro -> [id]
    const indiceDi = new Map(ordine.map((o, i) => [o.pdf, i]).filter(([p]) => p));
    const aggiungi = (v, pPdf) => { voci.push(v); const i = indiceDi.get(pPdf); (ancore[i] = ancore[i] || []).push(v.id); };
    const ids = { 'Cover': 'cover', 'Title Page': 'title', 'Table of Contents': 'contents', 'List of Revised Pages': 'revised' };
    for (const v of m.preliminari) aggiungi({ level: 1, num: '', title: v.titolo, id: ids[v.titolo] || v.titolo.toLowerCase().replace(/\W+/g, '-') }, v.pagina);
    m.sezioni.forEach((s, k) => {
      aggiungi({ level: 1, num: 'Section ' + s.num, title: s.titolo, id: 's' + (k + 1), tab: s.tab }, s.pagina);
      s.voci.forEach(([t, x], j) => aggiungi({ level: 2, num: '', title: t, id: `s${k + 1}-${j + 1}`, gruppo: (m.gruppi || []).includes(t) || undefined }, pagDi.get(x)));
    });
    // il retro e' sempre l'ultima pagina del libro (quello generato non ha pagina nel PDF)
    voci.push({ level: 1, num: '', title: 'Back Cover', id: 'back' });
    (ancore[ordine.length - 1] = ancore[ordine.length - 1] || []).push('back');

    /* --------------------------------------------------- libro.html */
    const righe = ordine.map((o, i) => {
      const a = (ancore[i] || []).map((x) => `<i id="${x}"></i>`).join('');
      if (o.bianca) return `<div class="pg-afm bianca">${a}</div>`;
      if (o.generato) return `<div class="pg-afm retro generato">${a}<div class="retro-t"><b>${esc(m.titolo)}</b>${esc(m.modello)}<br>${esc(m.edizione)}</div></div>`;
      const n0 = num[o.pdf];
      const trav = (m.traverso || []).includes(o.pdf);
      const alt = o.retro ? 'Back cover' : i === 0 ? 'Cover' : n0 ? `Page ${n0}` : 'Unnumbered page';
      return `<div class="pg-afm${o.retro ? ' retro' : ''}${trav ? ' traverso' : ''}" data-pdf="${o.pdf}"${n0 ? ` data-n="${esc(n0)}"` : ''}>${a}`
        + `<img alt="${esc(alt)}" width="${misure[0].W}" height="${misure[0].H}" data-s1="data/afm/${id}/${o.file[1]}" data-s2="data/afm/${id}/${o.file[2]}"></div>`;
    });
    const figure = m.figure || {};
    const haTesto = testi.reduce((s, x) => s + x.t.length, 0) > 2000;
    const meta = { id, aereo: m.aereo, titolo: m.titolo, modello: m.modello, edizione: m.edizione,
      w: misure[0].W, h: misure[0].H, retina: m.retina, testo: haTesto ? `data/afm/${id}/testo.json` : null, figure };
    const html = `<!-- Generato da tools/afm.mjs da ${esc(m.pdf)} e tools/afm/${id}.json: non modificare a mano. -->
<div class="libro-afm" data-meta="${esc(JSON.stringify(meta))}">
<section class="toc-slot" data-voci="${esc(JSON.stringify(voci))}"></section>
${righe.join('\n')}
</div>
`;
    await writeFile(path.join(fuori, 'libro.html'), html);
    if (haTesto) {
      const t = testi.filter((x) => x.t).map(({ i, t }) => ({ i, n: num[ordine[i].pdf] || '', t }));
      await writeFile(path.join(fuori, 'testo.json'), JSON.stringify(t));
    } else await rm(path.join(fuori, 'testo.json'), { force: true });

    const kb = (b) => (b / 1048576).toFixed(1) + ' MB';
    const pdfPeso = (await readFile(pdfFile)).length;
    console.log(`${id}: ${ordine.length} book pages (${misure[0].W}x${misure[0].H} / ${misure[1].W}x${misure[1].H}) · screen ${kb(pesi[1])} · retina ${kb(pesi[2])} · PDF ${kb(pdfPeso)}`
      + ` · text ${haTesto ? 'yes' : 'none (scan without text layer)'}`);
  } finally {
    await pg.close();
    await rm(lavoro, { force: true });
  }
}

async function main() {
  const pm = await carica('puppeteer-core'), puppeteer = pm.default || pm;
  modulo('pdfjs-dist/legacy/build/pdf.js');
  const tutti = (await readdir(MAPPE)).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
  const scelti = process.argv.slice(2).length ? process.argv.slice(2) : tutti;
  const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  try { for (const id of scelti) await costruisci(browser, id); }
  finally { await browser.close(); }
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
