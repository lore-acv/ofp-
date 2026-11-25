#!/usr/bin/env python3
"""UN FILETTO MISURATO ALLE DUE ESTREMITA' — poligono pronto per la pagina

Dato un filetto approssimato (orizzontale: o x0 x1 y; verticale: v y0 y1 x),
misura sulla scansione, a ogni estremita' e nel mezzo, il bordo alto e basso
(o sinistro e destro) dell'inchiostro piu' vicino e stampa un elemento
"poli" con i quattro angoli: segue la leggera pendenza della scansione e lo
spessore vero. Le estremita' si trovano dove l'inchiostro finisce.

    /usr/bin/python3 tools/afm-rec/filetto.py afm-ccaf <pdf> o <x0> <x1> <y> [o ...] [v <y0> <y1> <x> ...]
"""
import re, sys, os, json
import numpy as np
from PIL import Image
ID, PDF = sys.argv[1], int(sys.argv[2])
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
INK = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)

def bordi(prof, c):
    """la corsa di inchiostro che contiene c (o la piu' vicina) in un profilo: [inizio, fine+1]"""
    idx = np.flatnonzero(prof)
    if not len(idx): return None
    k = idx[np.argmin(abs(idx - c))]
    a = k
    while a > 0 and prof[a - 1]: a -= 1
    b = k
    while b + 1 < len(prof) and prof[b + 1]: b += 1
    return a, b + 1

def misura(ink, x0, x1, y):
    # dove finisce davvero: si cammina lungo il filetto finche' c'e' inchiostro vicino a y
    def presente(x): return ink[y - 3:y + 4, x].any()
    while x0 > 0 and presente(x0 - 1): x0 -= 1
    while presente(x0) is False and x0 < x1: x0 += 1
    while x1 < ink.shape[1] - 1 and presente(x1): x1 += 1
    while not presente(x1 - 1) and x1 > x0: x1 -= 1
    # bordi alto e basso lungo tutto il filetto, una colonna ogni 3: dove un altro filetto
    # lo incrocia la corsa e' troppo lunga e si scarta; poi una retta per bordo (minimi quadrati)
    xs, ts, bs = [], [], []
    for x in range(x0 + 2, x1 - 2, 3):
        t = bordi(ink[y - 8:y + 9, x], 8)
        if t: xs.append(x); ts.append(t[0] + y - 8); bs.append(t[1] + y - 8)
    xs, ts, bs = map(np.array, (xs, ts, bs))
    sp = bs - ts; med = np.median(sp)
    ok = (sp <= med + 1.5) & (sp >= med - 1.5)
    ft = np.polyfit(xs[ok], ts[ok], 1); fb = np.polyfit(xs[ok], bs[ok], 1)
    r1 = lambda v: round(float(v), 1)
    t0, t1, b0, b1 = r1(np.polyval(ft, x0)), r1(np.polyval(ft, x1)), r1(np.polyval(fb, x0)), r1(np.polyval(fb, x1))
    return x0, x1, t0, b0, t1, b1

args = sys.argv[3:]; i = 0
while i < len(args):
    k = args[i]; a, b, c = int(args[i + 1]), int(args[i + 2]), int(args[i + 3]); i += 4
    if k == 'o':
        x0, x1, t0, b0, t1, b1 = misura(INK, a, b, c)
        print(json.dumps(['poli', [[x0, t0], [x1, t1], [x1, b1], [x0, b0]]]) + ',')
    else:
        y0, y1, l0, r0, l1, r1 = misura(INK.T, a, b, c)
        print(json.dumps(['poli', [[l0, y0], [r0, y0], [r1, y1], [l1, y1]]]) + ',')
