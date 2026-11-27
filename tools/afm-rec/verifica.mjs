#!/usr/bin/env node
/* ============================================================================
   VERIFICA DELLE PAGINE RICOSTRUITE — originale contro ricostruita
   ============================================================================
   Per ogni pagina ricostruita di data/afm-rec/<id>/libro.html:

   1. CONTROLLO VISIVO. Chromium disegna la pagina alla misura della scansione
      retina (stessa scala, stesse coordinate) e la si confronta pixel per
      pixel con l'originale: inchiostro solo nell'originale (manca nella
      ricostruita), solo nella ricostruita (in piu'), in tutte e due. Con un
      pixel di tolleranza per il bordo sfumato della scansione. Sopra la soglia
      la pagina va nel rapporto. Scrive anche l'immagine della differenza
      (rosso: solo originale, blu: solo ricostruita).

   2. CONTROLLO DEI NUMERI. Ogni numero della pagina ricostruita si cerca
      nell'OCR dell'originale (Tesseract sulla scansione retina) alla stessa
      riga e nella stessa posizione; e ogni numero dell'OCR si cerca nella
      ricostruita. Ogni differenza va nel rapporto: pagina, riga, valore
      originale, valore ricostruito. L'OCR puo' sbagliare: una differenza
      aperta si chiude guardando la scansione, e si annota in
      tools/afm-rec/<id>/controlli.json come "letto a vista" con il valore
      giusto (che deve essere quello della ricostruita).

   Scrive tools/afm-rec/VERIFICA.md (VERIFICA-CCAB.md per I-CCAB) e le immagini in tools/afm-rec/<id>/verifica/.

     CHROME=/percorso/chrome node tools/afm-rec/verifica.mjs afm-ccaf
   Serve tesseract.
   ========================================================================== */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { pienaPagina, affineLibro, affinePiena } from './pagina.mjs';
import path from 'node:path';
import os from 'node:os';

const RADICE = process.cwd();
const ID = process.argv[2] || 'afm-ccaf';
/* --pieno: la prova "pagina piena" (rec.mjs --pieno). L'originale si trasforma
   come la ricostruita (stessa trasformazione affine), poi si confronta allo stesso modo. */
const VARIANTE = process.argv.includes('--pieno') ? 'pieno' : process.argv.includes('--medio') ? 'medio' : null;
const PIENO = !!VARIANTE;
const SUFF = VARIANTE ? '-' + VARIANTE : '';
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium';
const pup = createRequire(path.join(RADICE, 'x.js'))('puppeteer-core');
const SOGLIA = 0.02;        // inchiostro non coincidente oltre il 2% dell'inchiostro della pagina: va guardata
const DIR = path.join(RADICE, 'tools', 'afm-rec', ID);
const OUT_IMG = path.join(DIR, 'verifica' + SUFF);
await mkdir(OUT_IMG, { recursive: true });

const libro = await readFile(path.join(RADICE, 'data', 'afm-rec', ID + SUFF, 'libro.html'), 'utf8');
const stileCss = libro.match(/<style data-libro>([\s\S]*?)<\/style>/)[1].replace(/url\(data\//g, `url(file://${RADICE}/data/`);
const pagine = [...libro.matchAll(/<div class="pg-afm[^"]* rec" data-pdf="(\d+)"[^>]*data-n="([^"]*)"[^>]*>(?:<i[^>]*><\/i>)*(?:<img class="rec-ras"[^>]*><template class="rec-t">)?(<svg[\s\S]*?<\/svg>)(?:<\/template>)?<img class="rec-orig" [^>]*data-s2="([^"]+)"/g)]
  .map((m) => ({ pdf: +m[1], n: m[2], svg: m[3], orig: m[4] }));
const controlli = existsSync(path.join(DIR, 'controlli.json')) ? JSON.parse(await readFile(path.join(DIR, 'controlli.json'), 'utf8')) : {};

/* CONTROLLO DEI NUMERI, parola per parola: ogni parola della ricostruita
   che contiene cifre si ritaglia dall'originale nello stesso punto e si fa
   leggere a Tesseract da sola (una riga, solo cifre e segni); i numeri letti
   devono essere quelli scritti. */
async function controllaNumeri(p, origPath) {
  const stile = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));
  const parole = [];
  for (const e of p.el) if (e[0] === 'riga') {
    const r = stile.ruoli[e[1]], c = (e[4] && e[4].c) || r.c, fs = c / r.capRatio;
    const opz = e[4] || {}, rif = opz.libro ? 'libro' : 'pag';
    e[3].forEach(([x, t, wm], i) => {
      if (!/\d/.test(t)) return;
      const largo = [...t].length * fs * 0.62 * r.sx + 10;
      if (opz.ang === -90) {   // riga che sale: la parola va da x (in basso) a x - larghezza
        const l = wm || largo;
        parole.push({ x, y: e[2], t, rif, ang: -90, box: [Math.round(e[2] - c * 1.45), Math.round(x - l - 5), Math.round(e[2] + c * 0.5), Math.round(x + 5)] });
        return;
      }
      const dopo = e[3][i + 1] ? e[3][i + 1][0] - 2 : x + largo;
      const destra = wm ? x + wm + 4 : Math.min(dopo, x + largo);   // con la larghezza misurata (misura.py) il ritaglio e' esatto
      parole.push({ x, y: e[2], t, rif, ang: 0, box: [Math.round(x - 5), Math.round(e[2] - c * 1.4), Math.round(destra), Math.round(e[2] + c * 0.45)] });
    });
  }
  if (!parole.length) return [];
  const tmp = path.join(os.tmpdir(), 'afmrec-parole'); await rm(tmp, { recursive: true, force: true }); await mkdir(tmp, { recursive: true });
  execFileSync('/usr/bin/python3', ['-I', '-c', `
import json,sys
from PIL import Image
libro=Image.open(sys.argv[1]).convert('L')
pag=libro.rotate(-90, expand=True) if sys.argv[3]=='-90' else libro
for k,(b,rif,ang) in enumerate(json.loads(sys.argv[2])):
    c=(libro if rif=='libro' else pag).crop(tuple(b))
    if ang==-90: c=c.rotate(-90, expand=True)
    c=c.resize((c.width*3,c.height*3), Image.LANCZOS)
    w=Image.new('L',(c.width+40,c.height+40),255); w.paste(c,(20,20)); w.save(f'${tmp}/{k}.png')
`, origPath, JSON.stringify(parole.map((q) => [q.box, q.rif, q.ang])), String(p.rot)]);
  const dif = [];
  let pdfParole = [];
  [PAG_W, PAG_H] = p.rot === -90 ? [p.h, p.w] : [p.w, p.h];
  try { pdfParole = paroleDelPdf(p.pdf, p.rot); } catch { pdfParole = []; }
  const nelPdf = (q) => {
    const cifre = (q.t.match(/\d+/g) || []).join(' ');
    // il riquadro nel riferimento della pagina; le righe del libro (pagine girate) si riportano alla pagina diritta
    let [x0, y0, x1, y1] = q.box;
    if (q.rif === 'libro' && p.rot === -90) { [x0, y0, x1, y1] = [p.w - y1, x0, p.w - y0, x1]; }
    return pdfParole.some((w) => { const cx = (w[0] + w[2]) / 2, cy = (w[1] + w[3]) / 2; return cx >= x0 - 6 && cx <= x1 + 6 && cy >= y0 - 6 && cy <= y1 + 6 && ((w[4].replace(/[Il]/g, '1').replace(/[Oo]/g, '0').match(/\d+/g) || []).join(' ') === cifre); });
  };
  for (const [k, q] of parole.entries()) {
    let letto = '';
    try { letto = execFileSync('tesseract', [path.join(tmp, k + '.png'), '-', '--psm', '7', '-c', 'tessedit_char_whitelist=0123456789.,-/:()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { letto = ''; }
    const nr = (q.t.match(/\d+/g) || []).join(' '), no = (letto.match(/\d+/g) || []).join(' ');
    q.letto = letto; q.pdf = pdfParole.length ? nelPdf(q) : GEMELLO ? nelGemello(p.n, q.t) : null;
    if (nr !== no) dif.push({ riga: q.y, x: q.x, originale: letto || '(niente)', ricostruito: q.t });
  }
  return { parole, dif };
}

/* SECONDA LETTURA dei numeri: lo strato di testo del PDF (per I-CCAF l'OCR di
   Acrobat, fatto a suo tempo e indipendente da Tesseract), riportato alle
   coordinate della pagina. Un numero e' confermato se una parola del PDF con
   le stesse cifre cade nel suo riquadro. Se il PDF non ha testo (I-CCAB) la
   seconda lettura resta il controllo a vista. */
/* IL MANUALE GEMELLO: I-CCAB non ha lo strato di testo, ma la sua traduzione e' la stessa di
   I-CCAF, ricostruito e verificato (ogni numero con due conferme). Un numero di I-CCAB e' confermato
   se la stessa parola (le stesse cifre e gli stessi segni) c'e' nella pagina con lo stesso numero di
   I-CCAF o in quelle accanto della stessa sezione (dove le due edizioni vanno a capo pagina in punti
   diversi): e' una lettura indipendente, su un'altra scansione. tools/afm/<id>.json "gemello". */
const GEMELLO = JSON.parse(execFileSync('cat', [path.join(RADICE, 'tools', 'afm', ID + '.json')]).toString()).gemello || null;
const paroleGemello = {};
function nelGemello(n, t) {
  const m = /^(\d+)-(\d+)$/.exec(n); const vicine = m ? [-1, 0, 1].map((d) => `${m[1]}-${+m[2] + d}`) : [n];
  return vicine.some((v) => {
    if (!(v in paroleGemello)) {
      try { const pg = JSON.parse(execFileSync('cat', [path.join(RADICE, 'tools', 'afm-rec', GEMELLO, 'pagine', v + '.json')], { stdio: ['ignore', 'pipe', 'ignore'] }).toString());
        paroleGemello[v] = new Set(pg.el.filter((e) => e[0] === 'riga').flatMap((e) => e[3].map((w) => w[1]))); } catch { paroleGemello[v] = new Set(); }
    }
    return paroleGemello[v].has(t);
  });
}
// la misura della pagina del libro in px della retina: quella della pagina diritta del libro
let PAG_W = 1250, PAG_H = 1762;
function paroleDelPdf(pdf, rot) {
  const mappa = JSON.parse(execFileSync('cat', [path.join(RADICE, 'tools', 'afm', ID + '.json')]).toString());
  const out = execFileSync('/usr/bin/python3', ['-I', '-c', `
import json, sys, pymupdf
d = pymupdf.open(sys.argv[1]); p = d[int(sys.argv[2]) - 1]
W, H = (int(sys.argv[5]), int(sys.argv[4])) if sys.argv[3] == '-90' else (int(sys.argv[4]), int(sys.argv[5]))
r = p.rect; s = min(W / r.width, H / r.height); ox = (W - r.width * s) / 2; oy = (H - r.height * s) / 2
print(json.dumps([[w[0] * s + ox, w[1] * s + oy, w[2] * s + ox, w[3] * s + oy, w[4]] for w in p.get_text('words')]))
`, path.join(RADICE, mappa.pdf), String(pdf), String(rot), String(PAG_W), String(PAG_H)]).toString();
  return JSON.parse(out);
}
const SEZIONI_DUE_VOLTE = /^[2356]-/;     // limitazioni, emergenze, prestazioni, centraggio: ogni numero due volte

const browser = await pup.launch({ executablePath: CHROME, args: ['--no-sandbox', '--allow-file-access-from-files'] });
const vuota = path.join(DIR, '_vuota.html');
await writeFile(vuota, '<!doctype html><meta charset="utf-8">');
const pg = await browser.newPage();
await pg.goto('file://' + vuota);
const esiti = [];
try {
  for (const p of pagine) {
    const origPath = path.join(RADICE, p.orig);
    const r = await pg.evaluate(async (svg, css, origUrl) => {
      document.head.innerHTML = `<style>${css} html,body{margin:0;background:#fff} .rec-svg{display:block} .rec-svg line{stroke:#000} .rec-svg rect,.rec-svg polygon{fill:#000} .rec-svg text{fill:#000;white-space:pre}</style>`;
      const o = new Image(); o.src = origUrl; await o.decode();
      const W = o.naturalWidth, H = o.naturalHeight;
      document.body.innerHTML = svg;
      const s = document.querySelector('svg'); s.setAttribute('width', W); s.setAttribute('height', H);
      await document.fonts.ready;
      // le fotografie delle figure: caricate prima della fotografia della pagina
      await Promise.all([...s.querySelectorAll('image')].map((im) => { const i = new Image(); i.src = im.getAttribute('href'); return i.decode().catch(() => {}); }));
      await new Promise((r) => setTimeout(r, 200));
      // la ricostruita in una tela, come immagine
      const ser = new XMLSerializer().serializeToString(s).replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" `);
      const conCss = ser.replace(/(<svg[^>]*>)/, `$1<style>${css.replace(/url\(file:[^)]+\)/g, (u) => u)} line{stroke:#000} rect,polygon{fill:#000} text{fill:#000;white-space:pre}</style>`);
      const ri = new Image(); ri.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(conCss); await ri.decode().catch(() => {});
      return { W, H };
    }, p.svg.replace(/href="data\//g, `href="file://${RADICE}/data/`), stileCss, 'file://' + origPath);
    // la ricostruita si fotografa dalla pagina (i font caricati dal documento)
    await pg.setViewport({ width: r.W, height: r.H, deviceScaleFactor: 1 });
    const recPng = path.join(OUT_IMG, `${p.n}-ricostruita.png`);
    await pg.screenshot({ path: recPng, clip: { x: 0, y: 0, width: r.W, height: r.H } });
    const recB64 = (await readFile(recPng)).toString('base64');
    // le righe: dove comincia e dove finisce l'inchiostro, nell'originale e nella ricostruita
    const pjg0 = JSON.parse(await readFile(path.join(DIR, 'pagine', p.n + '.json'), 'utf8'));
    const stg0 = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));
    const pjg = PIENO ? pienaPagina(pjg0, stg0, VARIANTE) : pjg0;
    const affOrig = PIENO ? affineLibro(stg0, pjg0, VARIANTE) : { ax: 1, ay: 1, bx: 0, by: 0 };
    const stg = JSON.parse(await readFile(path.join(DIR, 'stile.json'), 'utf8'));
    // Ogni gruppo di parole e' una banda: "lungo" va nel verso della scrittura, "attraverso" dalla
    // cima delle maiuscole alle discendenti. ref: libro (pagina del libro) o pag (la pagina, che per
    // le pagine girate e' quella diritta); ang -90: riga che sale.
    /* le righe vicine (come in misura.py): la fascia di una riga non entra nelle discendenti
       della riga sopra ne' nelle maiuscole e negli apici di quella sotto, dove si sovrappongono in x */
    const normali = pjg.el.filter((e) => e[0] === 'riga' && !(e[4] && (e[4].ang || e[4].libro || e[4].fissa)))
      .map((e) => ({ b: e[2], a: Math.min(...e[3].map((w) => w[0])), z: Math.max(...e[3].map((w) => w[0] + (w[2] || 14 * w[1].length))), k: e[4] && e[4].sup ? 1.5 : 1.2, c: (e[4] && e[4].c) || stg.ruoli[e[1]].c }));
    const righeGeom = pjg.el.filter((e) => e[0] === 'riga').map((e) => {
      const r = stg.ruoli[e[1]], c = (e[4] && e[4].c) || r.c, opz = e[4] || {};
      const rif = opz.libro || pjg.rot !== -90 ? 'libro' : 'pag';
      const fs = c / r.capRatio, largo = (t) => [...t].length * fs * 0.62 * (opz.sx || r.sx) + 12;
      const attraverso = [Math.round(e[2] - c * 1.35), Math.round(e[2] + c * 0.4)];
      // come in misura.py: una riga tutta maiuscole e cifre non sale oltre le maiuscole e non scende
      // sotto la linea di base (un filetto subito sopra o sotto non e' la riga)
      if (e[3].every((w) => /^[A-Z0-9.:\-–&]+$/.test(w[1]))) { attraverso[0] = Math.round(e[2] - c * 1.2); attraverso[1] = Math.round(e[2] + Math.max(3, c * 0.12)); }
      const margine = opz.figura ? [3, 3] : [12, 6];    // le scritte nelle figure: le linee del disegno sono vicine
      if (!opz.ang && !opz.libro) {
        const a0 = Math.min(...e[3].map((w) => w[0])), z0 = Math.max(...e[3].map((w) => w[0] + (w[2] || 14 * w[1].length)));
        const vic = normali.filter((q) => q.a < z0 && q.z > a0);
        const sopra = vic.filter((q) => q.b < e[2] - 8), sotto = vic.filter((q) => q.b > e[2] + 8);
        if (sopra.length) attraverso[0] = Math.max(attraverso[0], Math.round(Math.max(...sopra.map((q) => q.b)) + c * 0.35));
        if (sotto.length) attraverso[1] = Math.min(attraverso[1], Math.round(Math.min(...sotto.map((q) => q.b - q.c * q.k))));
      }
      // i filetti orizzontali della pagina (tabelle): la fascia non li attraversa
      if (!opz.ang && !opz.libro) {
        const a0 = Math.min(...e[3].map((w) => w[0])), z0 = Math.max(...e[3].map((w) => w[0] + (w[2] || 14 * w[1].length)));
        for (const q of pjg.el) {
          let xa, xb, yc, mezzo;
          if (q[0] === 'linea') {
            if (Math.abs(q[4] - q[2]) > Math.abs(q[3] - q[1]) * 0.2) continue;
            xa = Math.min(q[1], q[3]); xb = Math.max(q[1], q[3]); yc = (q[2] + q[4]) / 2; mezzo = q[5] / 2 + 2;
          } else if (q[0] === 'poli' && q[1].length === 4) {
            const xs = q[1].map((v) => v[0]), ys = q[1].map((v) => v[1]);
            xa = Math.min(...xs); xb = Math.max(...xs);
            if (xb - xa < (Math.max(...ys) - Math.min(...ys)) * 5) continue;      // solo i filetti orizzontali
            yc = (Math.min(...ys) + Math.max(...ys)) / 2; mezzo = (Math.max(...ys) - Math.min(...ys)) / 2 + 2;   // +2: i filetti della scansione sono un poco curvi
          } else continue;
          if (xa > z0 || xb < a0) continue;
          if (yc < e[2] - c * 0.5 && yc + mezzo > attraverso[0]) attraverso[0] = Math.ceil(yc + mezzo);
          if (yc > e[2] + 1 && yc - mezzo < attraverso[1]) attraverso[1] = Math.floor(yc - mezzo);
        }
      }
      if (opz.ang === -90) {
        const p0 = e[3][0], pu = e[3][e[3].length - 1];
        return [{ rif, ang: -90, lungo: [-p0[0] - 12, -(pu[0] - (pu[2] || largo(pu[1]))) + 6], attraverso, base: e[2], c, testo: e[3].map((w) => w[1]).join(' ') }];
      }
      // le parole della riga in gruppi (colonne): un salto grande fra due parole separa i gruppi
      const gruppi = []; let g = [e[3][0]];
      const fineDi = (w) => w[0] + (w[2] || largo(w[1]));
      for (let i = 1; i < e[3].length; i++) { if (e[3][i][0] - fineDi(e[3][i - 1]) > c * 2.5) { gruppi.push(g); g = []; } g.push(e[3][i]); }
      gruppi.push(g);
      const puntini = pjg.el.filter((q) => q[0] === 'punti' && q[1] === e[2]).flatMap((q) => q[2]);
      return gruppi.map((gr, k) => {
        const ultima = gr[gr.length - 1];
        let dopo = gruppi[k + 1] ? gruppi[k + 1][0][0] - 8 : 1e9;
        for (const px of puntini) if (px > ultima[0] + 4) dopo = Math.min(dopo, px - 4);   // i puntini guida non fanno parte della riga
        const fineUltima = ultima[2] ? ultima[0] + ultima[2] + margine[1] : ultima[0] + largo(ultima[1]);
        let prima = k ? fineDi(gruppi[k - 1][gruppi[k - 1].length - 1]) + 4 : -1e9;   // la banda non tocca il gruppo prima
        for (const px of puntini) if (px < gr[0][0] - 2) prima = Math.max(prima, px + 7);   // ne' i puntini guida prima del gruppo
        // la colonna del testo della pagina, se c'e': la striscia di emergenza fuori non e' la riga
        if (pjg.colonna && rif === 'libro' && pjg.rot !== -90) { prima = Math.max(prima, pjg.colonna[0]); dopo = Math.min(dopo, pjg.colonna[1]); }
        return { rif, ang: 0, lungo: [Math.max(prima, gr[0][0] - margine[0]), Math.min(dopo, fineUltima)], attraverso, base: e[2], c, apici: !!(opz.sup && opz.sup.length), testo: gr.map((w) => w[1]).join(' ') };
      });
    }).flat().map((g) => ({ ...g, giro: g.rif === 'pag' ? pjg.rot : 0, Lw: pjg.w }));
    const conf = await pg.evaluate(async (origUrl, recB64, righe, T) => {
      const carica = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
      const o = await carica(origUrl), q = await carica('data:image/png;base64,' + recB64);
      const W = o.naturalWidth, H = o.naturalHeight;
      const px = (img, t) => { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); if (t) x.setTransform(t.ax, 0, 0, t.ay, t.bx, t.by); x.drawImage(img, 0, 0, W, H); return x.getImageData(0, 0, W, H).data; };
      const a = px(o, T), b = px(q);   // l'originale con la trasformazione della pagina piena (identita' nella prova normale)
      /* inchiostro: scuro e grigio. I segni a evidenziatore della scansione (viola, rosa: non si
         ricostruiscono, scelta del 2026) sono colorati: la stampa ha croma 0, l'evidenziatore oltre 60 */
      const ink = (d, i) => (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) < 140 && Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) < 40;
      const A = new Uint8Array(W * H), B = new Uint8Array(W * H), Bg = new Uint8Array(W * H);
      /* Bg: inchiostro o campitura grigia della ricostruita. I retini della scansione (puntini scuri)
         ricostruiti come campitura grigia sono coperti: i loro puntini non sono "solo originale".
         Campitura = grigio medio piatto (il pixel e i suoi 8 vicini fra 130 e 200): i bordi sfumati
         delle lettere non lo sono, cosi' il controllo del testo resta stretto */
      const L = new Float32Array(W * H);
      for (let k = 0; k < W * H; k++) { A[k] = ink(a, k * 4); B[k] = ink(b, k * 4); L[k] = 0.299 * b[k * 4] + 0.587 * b[k * 4 + 1] + 0.114 * b[k * 4 + 2]; }
      /* la colonna del testo, se la pagina la dichiara (sezione III): fuori c'e' solo la striscia di
         emergenza, ridisegnata regolare per scelta e non ricalcata, che non si confronta */
      if (T.colonna) {
        // fuori dalla colonna non si guarda; e nemmeno le barre stampate che entrano di qualche pixel
        // nella colonna (la striscia della scansione e' storta): l'inchiostro dell'originale attaccato
        // a quello fuori, fino a 6 px dentro il bordo, si ignora in tutte e due le pagine
        const [c0, c1] = T.colonna, M = new Uint8Array(W * H), coda = [];
        const bordo = (X) => X <= c0 + 6 || X >= c1 - 6;
        for (let k = 0; k < W * H; k++) { const X = k % W; if (X < c0 - 1 || X > c1 + 1) { M[k] = 1; if (A[k]) coda.push(k); } }
        while (coda.length) {
          const k = coda.pop(), X = k % W;
          for (const d of [-1, 1, -W, W, -W - 1, -W + 1, W - 1, W + 1]) {
            const j = k + d; if (j < 0 || j >= W * H || M[j] || !A[j]) continue;
            const Xj = j % W; if (Math.abs(Xj - X) > 1 || !bordo(Xj)) continue;
            M[j] = 1; coda.push(j);
          }
        }
        for (let k = 0; k < W * H; k++) if (M[k]) { A[k] = 0; B[k] = 0; }
      }
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        const k = y * W + x; if (B[k]) { Bg[k] = 1; continue; }
        let piatto = true;
        for (let dy = -1; dy <= 1 && piatto; dy++) for (let dx = -1; dx <= 1; dx++) { const l = L[k + dy * W + dx]; if (l < 130 || l > 200) { piatto = false; break; } }
        Bg[k] = piatto ? 1 : 0;
      }
      const vicino = (M, k) => { const x = k % W, y = (k / W) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H && M[Y * W + X]) return true; } return false; };
      let soloA = 0, soloB = 0, entrambi = 0, inkA = 0;
      const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); const id = x.createImageData(W, H);
      for (let k = 0; k < W * H; k++) {
        let col = [255, 255, 255];
        if (A[k]) { inkA++; if (vicino(Bg, k)) { entrambi++; col = [40, 40, 40]; } else { soloA++; col = [220, 30, 30]; } }
        else if (B[k]) { if (!vicino(A, k)) { soloB++; col = [30, 80, 230]; } else col = [150, 150, 150]; }
        id.data.set([...col, 255], k * 4);
      }
      x.putImageData(id, 0, 0);
      // dal punto della banda (lungo u, attraverso v) al pixel della pagina del libro
      const pixel = (g, u, v) => {
        let X = u, Y = v;
        if (g.ang === -90) { X = v; Y = -u; }
        if (g.giro === -90) { const xb = Y, yb = g.Lw - X; X = xb; Y = yb; }
        X = Math.round(X); Y = Math.round(Y);
        return X >= 0 && Y >= 0 && X < W && Y < H ? Y * W + X : -1;
      };
      const estremi = (M, g) => {
        let a = 1e9, b = -1e9;
        for (let u = Math.round(g.lungo[0]); u <= Math.round(g.lungo[1]); u++) for (let v = g.attraverso[0]; v <= g.attraverso[1]; v++) {
          const k = pixel(g, u, v); if (k >= 0 && M[k]) { if (u < a) a = u; if (u > b) b = u; }
        }
        return [a, b];
      };
      /* la linea di base dell'inchiostro nella banda: dove l'inchiostro cala di colpo (il fondo delle
         lettere; sotto restano solo discendenti e virgole), nella meta' bassa della banda */
      const baseInk = (M, g) => {
        const P = [];
        for (let v = g.attraverso[0]; v <= g.attraverso[1]; v++) { let n = 0; for (let u = Math.round(g.lungo[0]); u <= Math.round(g.lungo[1]); u++) { const k = pixel(g, u, v); if (k >= 0 && M[k]) n++; } P.push(n); }
        if (!Math.max(...P)) return null;
        const da = Math.round(g.c * 0.5);   // non nella cima delle lettere
        let mx = -1e9, b = da;
        for (let i = da; i < P.length - 1; i++) mx = Math.max(mx, P[i] - P[i + 1]);
        for (let i = da; i < P.length - 1; i++) if (P[i] - P[i + 1] >= mx * 0.5) b = i;   // il calo grande piu' in basso
        return g.attraverso[0] + b;
      };
      const geom = righe.map((g) => {
        const [oa, ob] = estremi(A, g), [ra, rb] = estremi(B, g), bo = baseInk(A, g), br = baseInk(B, g);
        return { ...g, inizio: ra - oa, fine: rb - ob, alto: bo == null || br == null ? 0 : br - bo };
      });
      /* Le macchie: inchiostro che c'e' solo da una parte. Gli aloni sottili del
         disegno diverso delle lettere si tolgono erodendo di un pixel; quello che
         resta in macchie di almeno 25 px e' contenuto in piu' o in meno. */
      const macchie = [];
      for (const [nome, M, N] of [['solo originale', A, Bg], ['solo ricostruita', B, A]]) {
        const S = new Uint8Array(W * H);
        for (let k = 0; k < W * H; k++) if (M[k] && !vicino(N, k)) S[k] = 1;
        const E = new Uint8Array(W * H);
        for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const k = y * W + x; if (S[k] && S[k - 1] && S[k + 1] && S[k - W] && S[k + W]) E[k] = 1; }
        const vis = new Uint8Array(W * H);
        for (let k = 0; k < W * H; k++) {
          if (!E[k] || vis[k]) continue;
          const st = [k]; vis[k] = 1; let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
          while (st.length) { const q = st.pop(); n++; const x = q % W, y = (q / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
            for (const d of [1, -1, W, -W]) { const r = q + d; if (r >= 0 && r < W * H && E[r] && !vis[r]) { vis[r] = 1; st.push(r); } } }
          if (n >= 25) macchie.push({ tipo: nome, px: n, box: [x0, y0, x1, y1] });
        }
      }
      return { inkA, soloA, soloB, entrambi, geom, macchie, diff: c.toDataURL('image/png').split(',')[1] };
    }, 'file://' + origPath, recB64, righeGeom, { ...affOrig, colonna: pjg.colonna || null });
    await writeFile(path.join(OUT_IMG, `${p.n}-differenza.png`), Buffer.from(conf.diff, 'base64'));
    // numeri
    const pj = JSON.parse(await readFile(path.join(DIR, 'pagine', p.n + '.json'), 'utf8'));
    const { parole: nr, dif: tutte } = await controllaNumeri(pj, origPath);
    const letti = (controlli[p.n] || {}).letti || [];
    const dif = tutte.filter((d) => !letti.some((l) => l.riga === d.riga && l.x === d.x && l.valore === d.ricostruito));
    const chiuse = tutte.length - dif.length;
    const fuori = (conf.soloA + conf.soloB) / Math.max(1, conf.inkA);
    // una riga coincide se comincia e finisce entro 4 px (un terzo di millimetro sulla pagina stampata)
    // e sta alla stessa altezza: linea di base entro 3 px
    // (le righe con apici no: il grado in apice fa da fondo quanto la cifra; sono misurate a mano)
    /* Righe e macchie chiuse a vista (controlli.json, "righe" e "macchie", in coordinate della
       pagina): dove la differenza e' della misura e non della pagina (una linea di richiamo che
       tocca il numero, un filetto che nella scansione sbiadisce), guardata sull'ingrandimento */
    const ctr = controlli[p.n] || {};
    const aPagina = (x, y) => [(x - affOrig.bx) / affOrig.ax, (y - affOrig.by) / affOrig.ay];
    // la base di una riga e' nel riferimento della pagina (girata diritta per le pagine di traverso), non del libro
    const affPag = PIENO ? affinePiena(stg0, pjg0, VARIANTE) : { ax: 1, ay: 1, bx: 0, by: 0 };
    const basePag = (g) => g.rif === 'pag' ? (g.base - affPag.by) / affPag.ay : aPagina(0, g.base)[1];
    const rigaVista = (g) => (ctr.righe || []).some((r) => r.testo === g.testo && Math.abs(basePag(g) - r.base) <= 3);
    const macchiaVista = (m) => (ctr.macchie || []).some((r) => { const [x0, y0] = aPagina(m.box[0], m.box[1]), [x1, y1] = aPagina(m.box[2], m.box[3]); return x0 >= r.riquadro[0] - 3 && y0 >= r.riquadro[1] - 3 && x1 <= r.riquadro[2] + 3 && y1 <= r.riquadro[3] + 3; });
    const righeTutte = conf.geom.filter((g) => Math.abs(g.inizio) > 4 || Math.abs(g.fine) > 4 || (!g.apici && Math.abs(g.alto) > 3));
    const righeFuori = righeTutte.filter((g) => !rigaVista(g));
    const macchieTutte = conf.macchie; conf.macchie = macchieTutte.filter((m) => !macchiaVista(m));
    const chiuseGeo = righeTutte.length - righeFuori.length + macchieTutte.length - conf.macchie.length;
    // le letture di ogni numero: Tesseract sul ritaglio, strato di testo del PDF, a vista
    const numeri = nr.map((q) => {
      const vista = letti.find((l) => l.riga === q.y && l.x === q.x && l.valore === q.t);
      const tess = (q.t.match(/\d+/g) || []).join(' ') === (q.letto.match(/\d+/g) || []).join(' ');
      const conferme = (tess ? 1 : 0) + (q.pdf ? 1 : 0) + (vista ? 1 : 0) + (vista && vista.seconda ? 1 : 0);
      return { riga: q.y, x: q.x, valore: q.t, tesseract: q.letto, pdf: q.pdf, vista: vista ? vista.come + (vista.seconda ? ' · seconda conferma: ' + vista.seconda : '') : null, conferme };
    });
    const dueVolte = SEZIONI_DUE_VOLTE.test(p.n);
    const deboli = numeri.filter((q) => q.conferme < (dueVolte ? 2 : 1));
    const pjv = JSON.parse(await readFile(path.join(DIR, 'pagine', p.n + '.json'), 'utf8'));
    /* PAROLE STROZZATE O SFILACCIATE: la spaziatura fra le lettere che porta una parola alla sua
       larghezza misurata, in em. Molto negativa vuol dire lettere sovrapposte (la misura ha preso solo
       un pezzo della parola), molto positiva lettere sparse (ha preso anche altro): in tutti e due i
       casi la parola si vede sbagliata anche se la riga comincia e finisce al posto giusto */
    const strane = [...p.svg.matchAll(/<text[^>]*style="letter-spacing:(-?[\d.]+)px;font-size:([\d.]+)px"[^>]*>([^<]*)<\/text>/g)]
      .map((m) => ({ em: +m[1] / +m[2], testo: m[3].trim() }))
      .filter((q) => [...q.testo].length > 1 && (q.em < -0.3 || q.em > 0.5));
    /* PAROLE SOVRAPPOSTE: due parole di righe diverse che occupano lo stesso posto (una riga messa
       sulla linea di base di un'altra): le caselle [x, base - c, x + w, base] si coprono per piu' di
       un terzo della piu' piccola */
    const caselle = [];
    pjv.el.forEach((e, k) => { if (e[0] === 'riga' && !(e[4] && (e[4].ang || e[4].libro))) { const c = (e[4] && e[4].c) || stg0.ruoli[e[1]].c; e[3].forEach((w) => { if (w[2]) caselle.push({ k, t: w[1], b: [w[0], e[2] - c, w[0] + w[2], e[2]] }); }); } });
    const sovrapposte = [];
    for (let i = 0; i < caselle.length; i++) for (let j = i + 1; j < caselle.length; j++) {
      const a = caselle[i], b = caselle[j]; if (a.k === b.k) continue;
      const ix = Math.min(a.b[2], b.b[2]) - Math.max(a.b[0], b.b[0]), iy = Math.min(a.b[3], b.b[3]) - Math.max(a.b[1], b.b[1]);
      if (ix <= 0 || iy <= 0) continue;
      const area = (q) => (q.b[2] - q.b[0]) * (q.b[3] - q.b[1]);
      if (ix * iy > Math.min(area(a), area(b)) / 3) sovrapposte.push({ testo: `${a.t} / ${b.t}`, base: a.b[3] });
    }
    const aperte = righeFuori.length + conf.macchie.length + dif.length + deboli.length + strane.length + sovrapposte.length;
    esiti.push({ n: p.n, pdf: p.pdf, stato: pjv.stato, figure: pjv.figure || [], ...conf, diff: undefined, righe: conf.geom.length, righeFuori, fuori, numeri, dueVolte, deboli, chiuse, dif, strane, sovrapposte, aperte, dati: (controlli[p.n] || {}).dati || [] });
    console.log(`${p.n}: macchie ${conf.macchie.length} · righe fuori posto ${righeFuori.length}/${conf.geom.length} · inchiostro non coincidente ${(fuori * 100).toFixed(1)}% · parole con numeri ${nr.length}, differenze aperte ${dif.length} (chiuse a vista ${chiuse})${strane.length ? ` · parole strozzate o sfilacciate ${strane.length}` : ''}${sovrapposte.length ? ` · parole sovrapposte ${sovrapposte.length}` : ''}${chiuseGeo ? ` · righe e macchie chiuse a vista ${chiuseGeo}` : ''}`);
  }
} finally {
  await browser.close();
  await rm(vuota, { force: true });
}
await writeFile(path.join(DIR, 'verifica' + SUFF + '.json'), JSON.stringify(esiti, null, 1) + '\n');

/* ------------------------------------------------------------ il rapporto */
const md = [];
const mappa = JSON.parse(await readFile(path.join(RADICE, 'tools', 'afm', ID + '.json'), 'utf8'));
md.push(`# VERIFICA — ${mappa.titolo}, anteprima ricostruita`, '',
  `> Generato da \`tools/afm-rec/verifica.mjs ${ID}\` il ${new Date().toISOString().slice(0, 10)}. L'anteprima ricostruita **non fa fede**: fa fede il Flight Manual originale (data/afm/).`, '',
  '## Come si verifica una pagina', '',
  '1. **Righe.** Per ogni riga (e ogni colonna di una riga) si misura dove comincia e dove finisce l\'inchiostro, nell\'originale e nella ricostruita, alla stessa scala. Coincide se entrambi gli estremi stanno entro 4 px della scansione retina (circa un terzo di millimetro sulla pagina stampata) e la sua linea di base (l\'ultima riga dove l\'inchiostro e\' almeno un quarto del massimo) entro 3 px.',
  '2. **Macchie.** Inchiostro che c\'e\' solo nell\'originale o solo nella ricostruita, tolti gli aloni di un pixel dovuti al disegno diverso delle lettere: ogni macchia di almeno 25 px e\' contenuto mancante o in piu\'.',
  '3. **Numeri.** Ogni parola con cifre si ritaglia dall\'originale e la legge Tesseract da sola; la seconda lettura e\' lo strato di testo del PDF (per I-CCAF l\'OCR di Acrobat, indipendente). Dove le letture automatiche sbagliano decide il controllo a vista, annotato in `tools/afm-rec/' + ID + '/controlli.json`. Nelle sezioni 2, 3, 5 e 6 (limitazioni, emergenze, prestazioni, centraggio) ogni numero deve avere **due conferme** indipendenti.',
  '4. **Dati del progetto.** Dove il progetto ha gia\' i valori verificati (DATI-AFM.md, tabelle di index.html) si confrontano con la pagina.', '',
  '3. **Parole.** La spaziatura che porta ogni parola alla larghezza misurata sta fra -0,3 e 0,5 em: fuori, le lettere si sovrappongono o si sparpagliano (la misura ha preso un pezzo della parola, o anche altro). E nessuna parola copre per piu\' di un terzo una parola di un\'altra riga.', '', 'Una pagina e\' **verificata** solo con zero differenze aperte (righe fuori posto + macchie + parole strozzate o sfilacciate + numeri non confermati).', '',
  '"Inchiostro non coincidente" e\' solo un\'indicazione: misura anche la differenza di disegno fra il font libero e quello originale, e la scansione piu\' scura della stampa.', '',
  '## Pagine', '',
  '| Pagina | Stato | Righe coincidenti | Macchie | Numeri (conferme) | Differenze aperte | Inchiostro non coincidente | Esito |',
  '|---|---|---|---|---|---|---|---|');
for (const e of esiti) {
  const conf2 = e.numeri.filter((q) => q.conferme >= 2).length;
  md.push(`| ${e.n} | ${e.stato} | ${e.righe - e.righeFuori.length}/${e.righe} | ${e.macchie.length} | ${e.numeri.length} (${conf2} con 2+ conferme) | ${e.aperte} | ${(e.fuori * 100).toFixed(1)}% | ${e.aperte ? '**da rivedere**' : '**verificata**'} |`);
}
md.push('', '## Figure: metodo', '');
for (const e of esiti) for (const f of e.figure) md.push(`- **${f.figura}** (pagina ${e.n}): ${f.metodo}`);
md.push('', '## Differenze aperte', '');
const aperteTutte = esiti.flatMap((e) => [
  ...e.righeFuori.map((g) => `| ${e.n} | ${g.base} | riga "${g.testo.slice(0, 40)}" | inizio ${g.inizio} px, fine ${g.fine} px, linea di base ${g.alto} px | |`),
  ...e.macchie.map((m) => `| ${e.n} | ${m.box[1]} | macchia ${m.tipo}, ${m.px} px | riquadro ${m.box.join(', ')} | |`),
  ...e.dif.map((d) => `| ${e.n} | ${d.riga} | numero | ${d.originale} | ${d.ricostruito} |`),
  ...e.sovrapposte.map((q) => `| ${e.n} | ${q.base} | parole sovrapposte | | ${q.testo} |`),
  ...e.strane.map((q) => `| ${e.n} | | parola ${q.em < 0 ? 'strozzata' : 'sfilacciata'} (spaziatura ${q.em.toFixed(2)} em) | | ${q.testo} |`),
  ...e.deboli.filter((q) => !e.dif.some((d) => d.riga === q.riga && d.x === q.x)).map((q) => `| ${e.n} | ${q.riga} | numero con una sola conferma | ${q.tesseract} | ${q.valore} |`)]);
if (aperteTutte.length) md.push('| Pagina | Riga (y) | Cosa | Valore originale | Valore ricostruito |', '|---|---|---|---|---|', ...aperteTutte);
else md.push('Nessuna.');
// le righe e le macchie chiuse a vista (controlli.json), con il perche'
const viste = esiti.flatMap((e) => [...((controlli[e.n] || {}).righe || []).map((r) => `| ${e.n} | riga "${r.testo}" (base ${r.base}) | ${r.come} |`),
  ...((controlli[e.n] || {}).macchie || []).map((r) => `| ${e.n} | macchia, riquadro ${r.riquadro.join(', ')} | ${r.come} |`)]);
if (viste.length) md.push('', '## Righe e macchie chiuse a vista', '', 'Differenze della misura, non della pagina: guardate sull\'ingrandimento (coordinate della pagina originale).', '', '| Pagina | Cosa | Perche\' |', '|---|---|---|', ...viste);
md.push('', '## Numeri, uno per uno', '', 'Sezioni 2, 3, 5 e 6: due conferme indipendenti per ogni numero. ✓ = conferma.', '');
for (const e of esiti) {
  md.push(`### Pagina ${e.n}${e.dueVolte ? ' (due conferme)' : ''}`, '', '| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |', '|---|---|---|---|---|---|');
  for (const q of e.numeri) md.push(`| ${q.riga} | ${q.valore} | ${q.tesseract || '–'} ${(q.valore.match(/\d+/g) || []).join(' ') === (q.tesseract.match(/\d+/g) || []).join(' ') ? '✓' : ''} | ${q.pdf === null ? 'n/d' : q.pdf ? '✓' : '–'} | ${q.vista ? '✓ ' + q.vista : ''} | ${q.conferme} |`);
  if (e.dati.length) { md.push('', 'Confronto con i dati del progetto:', ''); for (const d of e.dati) md.push(`- ${d}`); }
  md.push('');
}
// il rapporto: VERIFICA.md per I-CCAF (il primo), VERIFICA-<aereo>.md per gli altri (VERIFICA-CCAB.md)
const NOME = `VERIFICA${ID === 'afm-ccaf' ? '' : '-' + ID.replace(/^afm-/, '').toUpperCase()}${SUFF.toUpperCase()}.md`;
await writeFile(path.join(RADICE, 'tools', 'afm-rec', NOME), md.join('\n') + '\n');
console.log(`scritto tools/afm-rec/${NOME}`);
