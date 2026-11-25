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

   Scrive tools/afm-rec/VERIFICA.md e le immagini in tools/afm-rec/<id>/verifica/.

     CHROME=/percorso/chrome node tools/afm-rec/verifica.mjs afm-ccaf
   Serve tesseract.
   ========================================================================== */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { pienaPagina, affineLibro } from './pagina.mjs';
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
const pagine = [...libro.matchAll(/<div class="pg-afm[^"]* rec" data-pdf="(\d+)"[^>]*data-n="([^"]*)"[^>]*>(?:<i[^>]*><\/i>)*(<svg[\s\S]*?<\/svg>)<img class="rec-orig" [^>]*data-s2="([^"]+)"/g)]
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
    q.letto = letto; q.pdf = pdfParole.length ? nelPdf(q) : null;
    if (nr !== no) dif.push({ riga: q.y, x: q.x, originale: letto || '(niente)', ricostruito: q.t });
  }
  return { parole, dif };
}

/* SECONDA LETTURA dei numeri: lo strato di testo del PDF (per I-CCAF l'OCR di
   Acrobat, fatto a suo tempo e indipendente da Tesseract), riportato alle
   coordinate della pagina. Un numero e' confermato se una parola del PDF con
   le stesse cifre cade nel suo riquadro. Se il PDF non ha testo (I-CCAB) la
   seconda lettura resta il controllo a vista. */
function paroleDelPdf(pdf, rot) {
  const mappa = JSON.parse(execFileSync('cat', [path.join(RADICE, 'tools', 'afm', ID + '.json')]).toString());
  const out = execFileSync('/usr/bin/python3', ['-I', '-c', `
import json, sys, pymupdf
d = pymupdf.open(sys.argv[1]); p = d[int(sys.argv[2]) - 1]
W, H = (1762, 1250) if sys.argv[3] == '-90' else (1250, 1762)
r = p.rect; s = min(W / r.width, H / r.height); ox = (W - r.width * s) / 2; oy = (H - r.height * s) / 2
print(json.dumps([[w[0] * s + ox, w[1] * s + oy, w[2] * s + ox, w[3] * s + oy, w[4]] for w in p.get_text('words')]))
`, path.join(RADICE, mappa.pdf), String(pdf), String(rot)]).toString();
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
      // la ricostruita in una tela, come immagine
      const ser = new XMLSerializer().serializeToString(s).replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" `);
      const conCss = ser.replace(/(<svg[^>]*>)/, `$1<style>${css.replace(/url\(file:[^)]+\)/g, (u) => u)} line{stroke:#000} rect,polygon{fill:#000} text{fill:#000;white-space:pre}</style>`);
      const ri = new Image(); ri.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(conCss); await ri.decode().catch(() => {});
      return { W, H };
    }, p.svg, stileCss, 'file://' + origPath);
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
    const righeGeom = pjg.el.filter((e) => e[0] === 'riga').map((e) => {
      const r = stg.ruoli[e[1]], c = (e[4] && e[4].c) || r.c, opz = e[4] || {};
      const rif = opz.libro || pjg.rot !== -90 ? 'libro' : 'pag';
      const fs = c / r.capRatio, largo = (t) => [...t].length * fs * 0.62 * (opz.sx || r.sx) + 12;
      const attraverso = [Math.round(e[2] - c * 1.35), Math.round(e[2] + c * 0.4)];
      if (opz.ang === -90) {
        const p0 = e[3][0], pu = e[3][e[3].length - 1];
        return [{ rif, ang: -90, lungo: [-p0[0] - 12, -(pu[0] - (pu[2] || largo(pu[1]))) + 6], attraverso, base: e[2], testo: e[3].map((w) => w[1]).join(' ') }];
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
        const fineUltima = ultima[2] ? ultima[0] + ultima[2] + 6 : ultima[0] + largo(ultima[1]);
        const prima = k ? fineDi(gruppi[k - 1][gruppi[k - 1].length - 1]) + 4 : -1e9;   // la banda non tocca il gruppo prima
        return { rif, ang: 0, lungo: [Math.max(prima, gr[0][0] - 12), Math.min(dopo, fineUltima)], attraverso, base: e[2], testo: gr.map((w) => w[1]).join(' ') };
      });
    }).flat().map((g) => ({ ...g, giro: g.rif === 'pag' ? pjg.rot : 0, Lw: pjg.w }));
    const conf = await pg.evaluate(async (origUrl, recB64, righe, T) => {
      const carica = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
      const o = await carica(origUrl), q = await carica('data:image/png;base64,' + recB64);
      const W = o.naturalWidth, H = o.naturalHeight;
      const px = (img, t) => { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); if (t) x.setTransform(t.ax, 0, 0, t.ay, t.bx, t.by); x.drawImage(img, 0, 0, W, H); return x.getImageData(0, 0, W, H).data; };
      const a = px(o, T), b = px(q);   // l'originale con la trasformazione della pagina piena (identita' nella prova normale)
      // inchiostro: scuro (le sottolineature colorate della scansione non sono stampa: si guarda la luminanza)
      const ink = (d, i) => (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) < 140;
      const A = new Uint8Array(W * H), B = new Uint8Array(W * H);
      for (let k = 0; k < W * H; k++) { A[k] = ink(a, k * 4); B[k] = ink(b, k * 4); }
      const vicino = (M, k) => { const x = k % W, y = (k / W) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H && M[Y * W + X]) return true; } return false; };
      let soloA = 0, soloB = 0, entrambi = 0, inkA = 0;
      const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); const id = x.createImageData(W, H);
      for (let k = 0; k < W * H; k++) {
        let col = [255, 255, 255];
        if (A[k]) { inkA++; if (vicino(B, k)) { entrambi++; col = [40, 40, 40]; } else { soloA++; col = [220, 30, 30]; } }
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
      const geom = righe.map((g) => { const [oa, ob] = estremi(A, g), [ra, rb] = estremi(B, g); return { ...g, inizio: ra - oa, fine: rb - ob }; });
      /* Le macchie: inchiostro che c'e' solo da una parte. Gli aloni sottili del
         disegno diverso delle lettere si tolgono erodendo di un pixel; quello che
         resta in macchie di almeno 25 px e' contenuto in piu' o in meno. */
      const macchie = [];
      for (const [nome, M, N] of [['solo originale', A, B], ['solo ricostruita', B, A]]) {
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
    }, 'file://' + origPath, recB64, righeGeom, affOrig);
    await writeFile(path.join(OUT_IMG, `${p.n}-differenza.png`), Buffer.from(conf.diff, 'base64'));
    // numeri
    const pj = JSON.parse(await readFile(path.join(DIR, 'pagine', p.n + '.json'), 'utf8'));
    const { parole: nr, dif: tutte } = await controllaNumeri(pj, origPath);
    const letti = (controlli[p.n] || {}).letti || [];
    const dif = tutte.filter((d) => !letti.some((l) => l.riga === d.riga && l.x === d.x && l.valore === d.ricostruito));
    const chiuse = tutte.length - dif.length;
    const fuori = (conf.soloA + conf.soloB) / Math.max(1, conf.inkA);
    // una riga coincide se comincia e finisce entro 4 px (un terzo di millimetro sulla pagina stampata)
    const righeFuori = conf.geom.filter((g) => Math.abs(g.inizio) > 4 || Math.abs(g.fine) > 4);
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
    const aperte = righeFuori.length + conf.macchie.length + dif.length + deboli.length;
    esiti.push({ n: p.n, pdf: p.pdf, stato: pjv.stato, figure: pjv.figure || [], ...conf, diff: undefined, righe: conf.geom.length, righeFuori, fuori, numeri, dueVolte, deboli, chiuse, dif, aperte, dati: (controlli[p.n] || {}).dati || [] });
    console.log(`${p.n}: macchie ${conf.macchie.length} · righe fuori posto ${righeFuori.length}/${conf.geom.length} · inchiostro non coincidente ${(fuori * 100).toFixed(1)}% · parole con numeri ${nr.length}, differenze aperte ${dif.length} (chiuse a vista ${chiuse})`);
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
  '1. **Righe.** Per ogni riga (e ogni colonna di una riga) si misura dove comincia e dove finisce l\'inchiostro, nell\'originale e nella ricostruita, alla stessa scala. Coincide se entrambi gli estremi stanno entro 4 px della scansione retina (circa un terzo di millimetro sulla pagina stampata).',
  '2. **Macchie.** Inchiostro che c\'e\' solo nell\'originale o solo nella ricostruita, tolti gli aloni di un pixel dovuti al disegno diverso delle lettere: ogni macchia di almeno 25 px e\' contenuto mancante o in piu\'.',
  '3. **Numeri.** Ogni parola con cifre si ritaglia dall\'originale e la legge Tesseract da sola; la seconda lettura e\' lo strato di testo del PDF (per I-CCAF l\'OCR di Acrobat, indipendente). Dove le letture automatiche sbagliano decide il controllo a vista, annotato in `tools/afm-rec/' + ID + '/controlli.json`. Nelle sezioni 2, 3, 5 e 6 (limitazioni, emergenze, prestazioni, centraggio) ogni numero deve avere **due conferme** indipendenti.',
  '4. **Dati del progetto.** Dove il progetto ha gia\' i valori verificati (DATI-AFM.md, tabelle di index.html) si confrontano con la pagina.', '',
  'Una pagina e\' **verificata** solo con zero differenze aperte (righe fuori posto + macchie + numeri non confermati).', '',
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
  ...e.righeFuori.map((g) => `| ${e.n} | ${g.base} | riga "${g.testo.slice(0, 40)}" | inizio ${g.inizio} px, fine ${g.fine} px | |`),
  ...e.macchie.map((m) => `| ${e.n} | ${m.box[1]} | macchia ${m.tipo}, ${m.px} px | riquadro ${m.box.join(', ')} | |`),
  ...e.dif.map((d) => `| ${e.n} | ${d.riga} | numero | ${d.originale} | ${d.ricostruito} |`),
  ...e.deboli.filter((q) => !e.dif.some((d) => d.riga === q.riga && d.x === q.x)).map((q) => `| ${e.n} | ${q.riga} | numero con una sola conferma | ${q.tesseract} | ${q.valore} |`)]);
if (aperteTutte.length) md.push('| Pagina | Riga (y) | Cosa | Valore originale | Valore ricostruito |', '|---|---|---|---|---|', ...aperteTutte);
else md.push('Nessuna.');
md.push('', '## Numeri, uno per uno', '', 'Sezioni 2, 3, 5 e 6: due conferme indipendenti per ogni numero. ✓ = conferma.', '');
for (const e of esiti) {
  md.push(`### Pagina ${e.n}${e.dueVolte ? ' (due conferme)' : ''}`, '', '| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |', '|---|---|---|---|---|---|');
  for (const q of e.numeri) md.push(`| ${q.riga} | ${q.valore} | ${q.tesseract || '–'} ${(q.valore.match(/\d+/g) || []).join(' ') === (q.tesseract.match(/\d+/g) || []).join(' ') ? '✓' : ''} | ${q.pdf === null ? 'n/d' : q.pdf ? '✓' : '–'} | ${q.vista ? '✓ ' + q.vista : ''} | ${q.conferme} |`);
  if (e.dati.length) { md.push('', 'Confronto con i dati del progetto:', ''); for (const d of e.dati) md.push(`- ${d}`); }
  md.push('');
}
await writeFile(path.join(RADICE, 'tools', 'afm-rec', `VERIFICA${SUFF.toUpperCase()}.md`), md.join('\n') + '\n');
console.log(`scritto tools/afm-rec/VERIFICA${SUFF.toUpperCase()}.md`);
