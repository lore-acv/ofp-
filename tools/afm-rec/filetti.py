#!/usr/bin/env python3
"""I FILETTI DI UNA TABELLA O DI UNA CORNICE, MISURATI SULLA SCANSIONE

Trova i filetti orizzontali e verticali (tratti di inchiostro lunghi almeno
<min> px) dentro un riquadro e li stampa come elementi "linea" pronti per la
pagina: centro, estremi e spessore misurati pixel per pixel. Un filetto
leggermente storto (la scansione non e' mai dritta) si misura alle due
estremita'.

    /usr/bin/python3 tools/afm-rec/filetti.py afm-ccaf <pdf> <x0> <y0> <x1> <y1> [min]
"""
import re, sys, os, json
import numpy as np
from PIL import Image
ID, PDF = sys.argv[1], int(sys.argv[2])
X0, Y0, X1, Y1 = map(int, sys.argv[3:7])
MIN = int(sys.argv[7]) if len(sys.argv) > 7 else 60
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
ink = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
Z = ink[Y0:Y1, X0:X1]

def tratti(riga):
    """i tratti di inchiostro lunghi almeno MIN in una riga (con buchi di 2 px)"""
    out = []; s = None; buco = 0
    for i, v in enumerate(riga):
        if v:
            if s is None: s = i
            buco = 0; e = i
        elif s is not None:
            buco += 1
            if buco > 2:
                if e - s + 1 >= MIN: out.append((s, e))
                s = None
    if s is not None and e - s + 1 >= MIN: out.append((s, e))
    return out

def filetti(M, orient):
    """righe (o colonne) consecutive con un tratto lungo sovrapposto: un filetto"""
    aperti = []; chiusi = []
    for y in range(M.shape[0]):
        nuovi = []
        for s, e in tratti(M[y]):
            for f in aperti:
                if f['y1'] == y - 1 and s < f['e'] and e > f['s']:
                    f['y1'] = y; f['righe'].append((y, s, e)); nuovi.append(f); break
            else:
                nuovi.append({'y0': y, 'y1': y, 's': s, 'e': e, 'righe': [(y, s, e)]})
        for f in aperti:
            if f not in nuovi: chiusi.append(f)
        aperti = nuovi
    chiusi += aperti
    out = []
    for f in chiusi:
        r = f['righe']; s = min(q[1] for q in r); e = max(q[2] for q in r)
        # lo spessore e il centro alle due estremita' (prime e ultime 30 colonne)
        def centro(a, b):
            ys = [q[0] for q in r for c in (a, b) if q[1] <= c <= q[2]]
            return (min(ys) + max(ys) + 1) / 2, max(ys) - min(ys) + 1
        c0, t0 = centro(s + 3, s + 3); c1, t1 = centro(e - 3, e - 3)
        out.append((s, c0, e + 1, c1, round((t0 + t1) / 2, 1)))
    return out

for s, c0, e, c1, t in filetti(Z, 'o'):
    print(json.dumps(['linea', X0 + s, Y0 + c0, X0 + e, Y0 + c1, t]))
for s, c0, e, c1, t in filetti(Z.T, 'v'):
    print(json.dumps(['linea', X0 + c0, Y0 + s, X0 + c1, Y0 + e, t]))
