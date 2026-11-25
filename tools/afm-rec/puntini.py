#!/usr/bin/env python3
"""I PUNTINI GUIDA DI UNA RIGA, DALL'INCHIOSTRO

Fra la fine della voce e il valore ("Flaps Up . . . . . +3,8"): i puntini sono
componenti piccole (2-6 px) che stanno sulla linea di base. Stampa l'elemento
["punti", base, [x, ...]] con il centro di ognuno, e il passo medio (i puntini
battuti a macchina hanno un passo regolare: un buco nel passo e' un puntino
perso, o una macchia presa per puntino).

    /usr/bin/python3 tools/afm-rec/puntini.py afm-ccaf <pdf> <base> <x0> <x1>
"""
import re, sys, os, json
import numpy as np
from PIL import Image
ID, PDF, BASE, X0, X1 = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
ink = (((rgb @ [0.299, 0.587, 0.114]) < 160) & ((rgb.max(2) - rgb.min(2)) < 40))
z = ink[BASE - 9:BASE + 3, X0:X1]
col = z.any(0); pts = []; s = None
for i, v in enumerate(list(col) + [False]):
    if v and s is None: s = i
    if not v and s is not None:
        rows = np.flatnonzero(z[:, s:i].any(1))
        if i - s <= 6 and rows[-1] - rows[0] <= 5 and rows[-1] >= 5:      # piccolo e in basso: un puntino
            pts.append(X0 + (s + i - 1) / 2)
        s = None
passo = np.diff(pts) if len(pts) > 1 else []
print(json.dumps(['punti', BASE, [round(x, 1) for x in pts]]))
if len(passo):
    print(f'{len(pts)} puntini, passo medio {np.mean(passo):.1f} (min {min(passo):.1f}, max {max(passo):.1f})')
