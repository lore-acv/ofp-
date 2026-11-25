#!/usr/bin/env python3
"""I GRUPPI DI INCHIOSTRO DI UNA RIGA — per gli apici e le parole attaccate

Stampa, per un tratto di riga della scansione, i gruppi di colonne con
inchiostro (staccati da almeno <gap> px) con il loro alto e basso: serve a
decidere dove comincia un apice (gradi, m2, piu' o meno) e quanto sale.

    /usr/bin/python3 tools/afm-rec/segmenti.py afm-ccaf <pdf> <base> <x0> <x1> [gap]
"""
import re, sys, os
import numpy as np
from PIL import Image
ID, PDF, BASE, X0, X1 = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
GAP = int(sys.argv[6]) if len(sys.argv) > 6 else 2
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
ink = np.array(Image.open(m.group(1)).convert('L')) < 140
z = ink[BASE - 26:BASE + 6, X0:X1]
col = z.any(0); seg = []; vuoto = GAP
for i, v in enumerate(col):
    if v:
        if vuoto >= GAP: seg.append([i, i])
        seg[-1][1] = i; vuoto = 0
    else:
        vuoto += 1
for a, b in seg:
    r = np.flatnonzero(z[:, a:b + 1].any(1))
    print(f'x {X0 + a}-{X0 + b} (l {b - a + 1})  alto {BASE - 26 + r[0] - BASE:+d}  basso {BASE - 26 + r[-1] - BASE:+d}')
