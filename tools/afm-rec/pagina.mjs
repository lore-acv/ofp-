/* Disegno di una pagina ricostruita: dal JSON della pagina (pagine/<n>.json)
   e dallo stile del libro (stile.json) all'SVG. Lo usano rec.mjs (il libro),
   calibra.mjs (la taratura dei font) e verifica.mjs. */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const n2 = (x) => Math.round(x * 100) / 100;

/* il corpo che da' all'altezza delle maiuscole del ruolo la misura voluta */
export const corpo = (stile, ruolo, c) => { const r = stile.ruoli[ruolo]; return (c || r.c) / r.capRatio; };

/* le figure in file a parte (["svgfile", "figure/x.svg"]) entrano nella pagina come ["svg", ...] */
export async function risolvi(p, dir) {
  const { readFile } = await import('node:fs/promises');
  const path = (await import('node:path')).default;
  for (const e of p.el) if (e[0] === 'svgfile') { e[1] = await readFile(path.join(dir, e[1]), 'utf8'); e[0] = 'svg'; }
  return p;
}

/* LA MISURA DI OGNI PAROLA. Per far coincidere una parola con l'originale non
   basta la sua larghezza d'avanzamento: conta l'inchiostro, che dipende dalla
   prima e dall'ultima lettera. In un browser (canvas, con il font vero) si
   misura l'inchiostro di ogni parola e si calcolano la spaziatura fra le
   lettere (ls) e lo spostamento dell'origine (dx) che portano l'inchiostro
   esattamente da x a x + larghezza misurata (misura.py). Si esegue in una
   pagina di Chromium con i font gia' caricati (vedi preparaMisure). */
export function paroleDaMisurare(pagine, stile) {
  const out = [];
  for (const p of pagine) p.el.forEach((e, k) => {
    if (e[0] !== 'riga') return;
    const [, ruolo, , parole, opz = {}] = e; const r = stile.ruoli[ruolo], f = stile.font[r.font];
    const fs = corpo(stile, ruolo, opz.c), sup = new Set(opz.sup || []);
    parole.forEach(([x, t, w, lettere], i) => {
      if (!w) return;
      const fsw = sup.has(i) ? fs * (opz.supK || 0.62) : fs;
      out.push({ chiave: `${p.n}|${k}|${i}`, t, w, lettere, sx: opz.sx || r.sx, font: `${r.peso || f.peso} ${n2(fsw)}px '${f.famiglia}'`, stretch: r.larghezza || '100%' });
    });
  });
  return out;
}
/* da eseguire nel browser (page.evaluate): restituisce { chiave: [ls, dx] } */
export const misuraNelBrowser = (parole) => {
  const c = document.createElement('canvas').getContext('2d'), out = {};
  for (const q of parole) {
    c.font = q.font; c.fontStretch = q.stretch === '100%' ? 'normal' : q.stretch; c.letterSpacing = '0px';
    const m0 = c.measureText(q.t), n = [...q.t].length;
    const ink0 = m0.actualBoundingBoxLeft + m0.actualBoundingBoxRight;
    const ls = n > 1 ? (q.w / q.sx - ink0) / (n - 1) : 0;
    c.letterSpacing = ls + 'px';
    const m = c.measureText(q.t);
    // lettere misurate una per una (titoli spaziati a mano): l'origine di ogni lettera
    // perche' il suo inchiostro cominci dove comincia sulla scansione
    if (q.lettere && q.lettere.length === n) {
      c.letterSpacing = '0px';
      // ogni lettera: origine e larghezza d'avanzamento che portano il suo inchiostro da s a s + w
      out[q.chiave] = [0, 0, 1, [...q.t].map((ch, j) => {
        const m = c.measureText(ch), ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight, [s0, w0] = q.lettere[j];
        const k = ink > 0 ? (w0 / q.sx) / ink : 1;   // quanto va allargata o stretta la lettera
        return [Math.round((s0 / q.sx + m.actualBoundingBoxLeft * k) * 100) / 100, Math.round(m.width * k * 100) / 100];
      })];
      continue;
    }
    // una lettera sola non ha spazi da regolare: si regola la sua larghezza
    const k = n > 1 ? 1 : (q.w / q.sx) / ink0;
    out[q.chiave] = [Math.round(ls * 1000) / 1000, Math.round(m.actualBoundingBoxLeft * k * 1000) / 1000, Math.round(k * 1000) / 1000];
  }
  return out;
};


/* PAGINA PIENA (prova). La gabbia del testo della scansione si porta a
   riempire la pagina con margini fissi: una trasformazione affine per tutto il
   manuale (x' = ax x + bx, y' = ay y + by), diversa in orizzontale e in
   verticale perche' la scansione e' deformata. Le parole restano le stesse,
   nello stesso ordine, sulle stesse righe e nelle stesse posizioni relative:
   cambiano solo le coordinate; corpo (altezza delle maiuscole) e larghezza del
   disegno seguono la trasformazione, e la spaziatura di ogni parola si ricalcola
   (misuraNelBrowser) perche' la parola occupi esattamente il suo posto. */
export function affinePiena(stile, p, variante = 'pieno') {
  const g = stile[variante][p.rot === -90 ? 'orizzontale' : 'verticale'];
  const [x0, y0, x1, y1] = g.gabbia, [mx, my] = g.margini, W = p.w, H = p.h;
  const ax = (W * (1 - 2 * mx)) / (x1 - x0), ay = (H * (1 - 2 * my)) / (y1 - y0);
  return { ax, ay, bx: W * mx - x0 * ax, by: H * my - y0 * ay };
}
/* la stessa trasformazione nelle coordinate della pagina del libro (diritta):
   per le pagine girate x_libro = Y, y_libro = W - X */
export function affineLibro(stile, p, variante = 'pieno') {
  const t = affinePiena(stile, p, variante);
  if (p.rot !== -90) return t;
  return { ax: t.ay, ay: t.ax, bx: t.by, by: p.w - p.w * t.ax - t.bx };
}
export function pienaPagina(p, stile, variante = 'pieno') {
  const T = affinePiena(stile, p, variante), L = affineLibro(stile, p, variante);
  const q = JSON.parse(JSON.stringify(p));
  const n3 = (x) => Math.round(x * 100) / 100;
  q.el = q.el.map((e) => {
    const [tipo] = e;
    if (tipo === 'riga') {
      const [, ruolo, base, parole, opz0 = {}] = e; const r = stile.ruoli[ruolo];
      const opz = { ...opz0 }, t = opz.libro ? L : T;
      if (opz.ang === -90) {      // riga verticale: la linea di base e' una x, le parole corrono lungo y
        opz.c = n3((opz.c || r.c) * t.ax); opz.sx = Math.round((opz.sx || r.sx) * t.ay / t.ax * 1000) / 1000;
        return ['riga', ruolo, n3(t.ax * base + t.bx), parole.map(([x, w, l, ...resto]) => [n3(t.ay * x + t.by), w, l == null ? l : n3(l * t.ay), ...resto]), opz];
      }
      opz.c = n3((opz.c || r.c) * t.ay); opz.sx = Math.round((opz.sx || r.sx) * t.ax / t.ay * 1000) / 1000;
      return ['riga', ruolo, n3(t.ay * base + t.by), parole.map(([x, w, l, lettere]) => {
        const o = [n3(t.ax * x + t.bx), w];
        if (l != null) o.push(n3(l * t.ax));
        if (lettere) o.push(lettere.map(([s0, w0]) => [s0 * t.ax, w0 * t.ax]));
        return o;
      }), opz];
    }
    if (tipo === 'punti') return ['punti', n3(T.ay * e[1] + T.by), e[2].map((x) => n3(T.ax * x + T.bx)), e[3]];
    if (tipo === 'linea') {
      const [, x1, y1, x2, y2, sp] = e, oriz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
      return ['linea', n3(T.ax * x1 + T.bx), n3(T.ay * y1 + T.by), n3(T.ax * x2 + T.bx), n3(T.ay * y2 + T.by), n3(sp * (oriz ? T.ay : T.ax))];
    }
    if (tipo === 'rett') { const [, x, y, w, h] = e; return ['rett', n3(T.ax * x + T.bx), n3(T.ay * y + T.by), n3(w * T.ax), n3(h * T.ay)]; }
    if (tipo === 'poli') return ['poli', e[1].map(([x, y]) => [n3(T.ax * x + T.bx), n3(T.ay * y + T.by)])];
    if (tipo === 'svg') return ['svg', `<g transform="matrix(${T.ax},0,0,${T.ay},${T.bx},${T.by})">${e[1]}</g>`];
    return e;
  });
  q.pieno = { libro: L };
  return q;
}

export function svgPagina(p, stile, misure = {}) {
  const out = [], libro = [];
  for (const e of p.el) {
    const [tipo] = e;
    if (tipo === 'riga') {
      const [, ruolo, base, parole, opz = {}] = e;
      const dest = opz.libro ? libro : out;     // libro: coordinate della pagina del libro (diritta), fuori dalla rotazione
      const r = stile.ruoli[ruolo]; if (!r) throw new Error(`pagina ${p.n}: ruolo sconosciuto ${ruolo}`);
      const fs = corpo(stile, ruolo, opz.c), sx = opz.sx || r.sx;
      const sup = new Set(opz.sup || []), unite = new Set(opz.unite || []);
      const fsStyle = opz.c && opz.c !== r.c ? ` style="font-size:${n2(fs)}px"` : '';
      const k = p.el.indexOf(e);
      parole.forEach(([x0, t, w], i) => {
        const ultima = unite.has(i);     // anche l'ultima parola della riga ha il suo spazio: il testo copiato non incolla le righe
        const f = sup.has(i) ? fs * (opz.supK || 0.62) : fs, y = sup.has(i) ? n2(base - fs * (opz.supY || 0.36)) : base;
        const st = sup.has(i) ? ` style="font-size:${n2(f)}px"` : fsStyle;
        // larga quanto la parola misurata sull'originale (misura.py): si regola
        // solo la spaziatura fra le lettere, il disegno resta quello del font
        // spaziatura e origine della parola misurate (misuraNelBrowser): l'inchiostro va da x a x + w
        const mw = w && misure[`${p.n}|${k}|${i}`];
        const sxw = mw && mw[2] ? n2(sx * mw[2] * 1000) / 1000 : sx;
        const ls = mw ? mw[0] : null, x = mw ? n2(x0 + mw[1] * sx * (opz.ang === -90 ? -1 : 1)) : x0;
        const stile2 = ls != null ? (st ? st.replace('style="', `style="letter-spacing:${ls}px;`) : ` style="letter-spacing:${ls}px"`) : st;
        const parola = mw && mw[3] ? [...t].map((ch, j) => `<tspan x="${mw[3][j][0]}" textLength="${mw[3][j][1]}" lengthAdjust="spacingAndGlyphs">${esc(ch)}</tspan>`).join('') : esc(t);
        // ang -90: la riga sale (si legge dal basso in alto), base e' la x della linea di base e x la y dove comincia la parola
        const m = opz.ang === -90 ? `0,${-sxw},1,0,${base},${x}` : opz.ang === 90 ? `0,${sxw},-1,0,${base},${x}` : `${sxw},0,0,1,${x},${y}`;
        dest.push(`<text class="${r.classe}"${stile2} transform="matrix(${m})">${parola}${ultima ? '' : ' '}</text>`);
      });
    } else if (tipo === 'punti') {
      const [, base, xs, ruolo = 'testo'] = e; const r = stile.ruoli[ruolo];
      for (const x of xs) out.push(`<text class="${r.classe} rp" transform="matrix(${r.sx},0,0,1,${x},${base})">.</text>`);
    } else if (tipo === 'linea') {
      const [, x1, y1, x2, y2, sp] = e;
      out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${sp}"/>`);
    } else if (tipo === 'rett') {
      const [, x, y, w, h] = e; out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`);
    } else if (tipo === 'poli') {
      out.push(`<polygon points="${e[1].map((q) => q.join(',')).join(' ')}"/>`);
    } else if (tipo === 'svg') out.push(e[1]);
    else throw new Error(`pagina ${p.n}: elemento sconosciuto ${tipo}`);
  }
  // pagine di traverso: si disegnano diritte (landscape) e si girano come nel libro
  const dentro = (p.rot === -90 ? `<g transform="matrix(0,-1,1,0,0,${p.w})">${out.join('')}</g>` : out.join('')) + libro.join('');
  const [W, H] = p.rot === -90 ? [p.h, p.w] : [p.w, p.h];
  return `<svg class="rec-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Page ${esc(p.n)}"><g class="rec-ink">${dentro}</g></svg>`;
}


/* le regole CSS dei ruoli: famiglia, peso, corpo, spaziatura */
export function cssRuoli(stile) {
  return Object.entries(stile.ruoli).map(([k, r]) => {
    const f = stile.font[r.font];
    return `.rec-svg .${r.classe}{font-family:'${f.famiglia}';font-weight:${r.peso || f.peso};font-stretch:${r.larghezza || '100%'};font-size:${n2(corpo(stile, k))}px${r.spazio ? `;letter-spacing:${r.spazio}em` : ''}}`;
  }).join('\n');
}
export const cssFont = (stile, base) => Object.values(stile.font).map((f) =>
  `@font-face{font-family:'${f.famiglia}';src:url(${base}${f.file}) format('woff2');font-weight:${f.peso};font-stretch:${f.larghezza || '100%'};font-display:block}`).join('\n');
