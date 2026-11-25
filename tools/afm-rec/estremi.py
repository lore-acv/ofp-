#!/usr/bin/env python3
"""DOVE COMINCIA E FINISCE L'INCHIOSTRO DI UNA PAROLA, IN UN INTERVALLO DATO

Per le scritte dentro le figure, dove la misura automatica (misura.py)
prenderebbe anche le linee del disegno: si dice dove cercare (letto
sull'ingrandimento) e si ottiene [x, larghezza] esatti. Una parola per
argomento: base:x0-x1[:c] (c = altezza delle maiuscole, 11 di default).
Si cerca fra base-1,3c e base+0,35c, solo dentro x0-x1 (+-2 px).

    /usr/bin/python3 tools/afm-rec/estremi.py afm-ccaf <pdf> 469:844-864 469:869-878 ...
"""
import re, sys, os
import numpy as np
from PIL import Image
ID, PDF = sys.argv[1], int(sys.argv[2])
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
ink = ((rgb @ [0.299, 0.587, 0.114]) < 140) & ((rgb.max(2) - rgb.min(2)) < 40)
for a in sys.argv[3:]:
    parti = a.split(':'); base = int(parti[0]); x0, x1 = map(int, parti[1].split('-'))
    c = float(parti[2]) if len(parti) > 2 else 11
    z = ink[int(base - 1.3 * c):int(base + 0.35 * c) + 1, x0 - 2:x1 + 3]
    xs = np.flatnonzero(z.any(0)); ys = np.flatnonzero(z.any(1))
    if not len(xs): print(a, 'niente'); continue
    print(f'{a} -> [{x0 - 2 + xs[0]}, w {xs[-1] - xs[0] + 1}]  righe {int(base - 1.3 * c) + ys[0] - base:+d}..{int(base - 1.3 * c) + ys[-1] - base:+d}')
