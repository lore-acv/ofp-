#!/usr/bin/env python3
"""Le tabelle di crociera (figura 5-1, fogli 1-5: pagine 5-2 ... 5-6): lettura dei numeri.

Sulla pagina girata diritta: le colonne sono fra i filetti verticali, le righe di dati sono
le fasce d'inchiostro nella colonna km/h fra i filetti dei gruppi di RPM. Ogni cella si fa
leggere a Tesseract da sola (una riga, solo cifre e virgola, ingrandita 4 volte); poi ogni riga
si controlla con l'aritmetica della tabella:
  km/h = kts * 1,852 = MPH * 1,609 (arrotondati: +-1)
  litri = galloni * 3,785 (+-0,1)
  autonomia = 46 / galloni orari (+-0,1)
  km = autonomia * km/h  ... ma l'autonomia stampata e' arrotondata: km = 46/gal * km/h (+-1,5%)
  NM = km / 1,852 (+-1)
  in Hg = mb / 33,86 (+-0,5)
Stampa le righe lette e quelle che non tornano.

    /usr/bin/python3 crociera_leggi.py <pdf> <colonne x separate da virgola> <y0> <y1> <filetti dei gruppi y,...>
"""
import csv, io, json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image
R = '/home/user/ofp-'
PDF = int(sys.argv[1]); COL = [int(v) for v in sys.argv[2].split(',')]
Y0, Y1 = int(sys.argv[3]), int(sys.argv[4]); SEP = [int(v) for v in sys.argv[5].split(',')] if len(sys.argv) > 5 else []
libro = open(f'{R}/data/afm/afm-ccaf/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
g = np.rot90((rgb @ [0.299, 0.587, 0.114]), 3)
ink = g < 150

def bande(x0, x1, y0, y1):
    p = ink[y0:y1, x0:x1].sum(1); out = []; s = None
    for i, v in enumerate(list(p) + [0]):
        if v > 0 and s is None: s = i
        if v == 0 and s is not None:
            if i - s >= 6: out.append((y0 + s, y0 + i))
            s = None
    return out

# le righe: fasce d'inchiostro nella colonna km/h (indice 4), fuori dai filetti
righe = [b for b in bande(COL[4] + 5, COL[5] - 4, Y0, Y1) if all(not (b[0] - 2 <= s <= b[1] + 2) for s in SEP)]

def ocr(x0, y0, x1, y1):
    K = 4
    crop = Image.fromarray(np.clip(g[y0 - 4:y1 + 4, x0:x1], 0, 255).astype(np.uint8)).resize(((x1 - x0) * K, (y1 - y0 + 8) * K), Image.LANCZOS)
    with tempfile.TemporaryDirectory() as t:
        f = os.path.join(t, 'c.png'); crop.save(f)
        out = subprocess.run(['tesseract', f, '-', '--psm', '7', '-c', 'tessedit_char_whitelist=0123456789,'], capture_output=True, text=True).stdout
    return out.strip().replace(' ', '')

# la seconda lettura: lo strato di testo del PDF (OCR di Acrobat), portato sulla pagina girata
import pymupdf
mappa = json.load(open(f'{R}/tools/afm/afm-ccaf.json'))
pg = pymupdf.open(f'{R}/{mappa["pdf"]}')[PDF - 1]
# la pagina del PDF e' gia' di traverso (orizzontale): il suo strato di testo e' nel riferimento
# della pagina girata diritta, basta la scala
Wg, Hg = g.shape[1], g.shape[0]
rr = pg.rect; sc = min(Wg / rr.width, Hg / rr.height); ox = (Wg - rr.width * sc) / 2; oy = (Hg - rr.height * sc) / 2
strato = [(w[0] * sc + ox, w[1] * sc + oy, w[2] * sc + ox, w[3] * sc + oy, w[4]) for w in pg.get_text('words')]
def pdf_cella(x0, y0, x1, y1):
    c = [q for q in strato if x0 - 3 <= (q[0] + q[2]) / 2 <= x1 + 3 and y0 - 3 <= (q[1] + q[3]) / 2 <= y1 + 3]
    return ''.join(q[4] for q in sorted(c)).replace('.', ',')

tab = []
for a, b in righe:
    celle = []
    for k in range(len(COL) - 1):
        x0, x1 = COL[k] + 6, COL[k + 1] - 5      # fuori dai filetti verticali (storti di 2-3 px)
        z = ink[a:b, x0:x1].copy(); xs = np.flatnonzero(z.any(0))
        if not len(xs): celle.append(None); continue
        # lo sporco ai lati (un puntino staccato dal numero di 6 px o piu') non e' la cella
        grp = []; s0 = xs[0]; p0 = xs[0]
        for v in list(xs[1:]) + [10 ** 6]:
            if v - p0 > 6: grp.append((s0, p0)); s0 = v
            p0 = v
        grp = [g_ for g_ in grp if not (g_[1] - g_[0] <= 3 and np.flatnonzero(z[:, g_[0]:g_[1] + 1].any(1)).size <= 5)]
        if not grp: celle.append(None); continue
        xs = np.arange(grp[0][0], grp[-1][1] + 1)
        X0c, X1c = x0 + xs[0], x0 + xs[-1] + 1
        celle.append((X0c, X1c, ocr(x0 + max(0, xs[0] - 6), a, x0 + xs[-1] + 7, b), pdf_cella(X0c, a, X1c, b)))
    tab.append((a, b, celle))
num = lambda s: float(s.replace(',', '.')) if s and re.fullmatch(r'\d+(,\d)?', s) else None
def errori(v):
    n = [num(x) for x in v]
    mb, hg, bhp, kmh, kts, mph, gal, lit, end, km, nm = n[1:12]
    err = []
    try:
        if abs(kts * 1.852 - kmh) > 1.6: err.append('kts')
        if abs(mph * 1.609 - kmh) > 1.6: err.append('MPH')
        if abs(gal * 3.785 - lit) > 0.15: err.append('litri')
        # i galloni stampati sono arrotondati a 0,1: l'autonomia e la distanza del manuale vengono dal
        # valore non arrotondato, percio' la tolleranza segue quell'arrotondamento
        if abs(46 / gal - end) > 46 * 0.05 / gal ** 2 + 0.051: err.append('autonomia')
        if abs(46 / gal * kmh - km) > km * (0.05 / gal + 0.5 / kmh) + 1.5: err.append('km')
        if abs(km / 1.852 - nm) > 1.0: err.append('NM')
        if abs(mb / 33.864 - hg) > 0.6: err.append('inHg')
    except TypeError:
        err.append('illeggibile')
    return err
import itertools
finale = []
for a, b, c in tab:
    # a parita' di aritmetica vince lo strato di testo del PDF (sulle cifre sbaglia meno di Tesseract);
    # una lettura che non ha la forma della colonna si scarta (RPM 2200-2600, BHP di due cifre, ...)
    FORMA = [r'2[2-6]00', r'\d{3}', r'\d{2}', r'\d{2}', r'\d{3}', r'\d{2,3}', r'\d{2,3}', r'\d{1,2},\d', r'\d{2},\d', r'\d,\d', r'\d{3,4}', r'\d{3}']
    opz = []
    for k, x in enumerate(c):
        if not x: opz.append(['']); continue
        cand = [x[3], x[2]] if x[3] and x[3] != x[2] else [x[2]]
        buone = [v for v in cand if re.fullmatch(FORMA[k], v or '')]
        opz.append(buone or cand)
    dubbie = [k for k, x in enumerate(c) if x and x[2] != x[3]]
    best = None
    for scelta in itertools.product(*opz):
        e = errori(list(scelta))
        if best is None or len(e) < len(best[1]): best = (list(scelta), e)
    v, err = best
    # celle decise dall'aritmetica (le due letture erano diverse): da guardare a vista
    nota = [f'{k}:{c[k][2]}|{c[k][3]}->{v[k]}' for k in dubbie]
    print(b, ' '.join(f'{x:>6}' for x in v), ('  <- ' + ','.join(err)) if err else '', ('   [' + ' '.join(nota) + ']') if nota else '')
    finale.append((a, b, [(x[0], x[1], vv, x[2], x[3]) if x else None for x, vv in zip(c, v)], err, dubbie))
tab = finale
json.dump(tab, open(os.path.join(tempfile.gettempdir(), 'afm-rec', f'crociera-{PDF}.json'), 'w'), default=int)
