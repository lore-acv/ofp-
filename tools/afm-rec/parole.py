#!/usr/bin/env python3
"""LE PAROLE PICCOLE DI UNA FIGURA, TROVATE DALL'INCHIOSTRO

Per le scritte troppo piccole perche' l'OCR ne dia la posizione esatta (schema
elettrico): le lettere sono componenti dell'inchiostro piccole (alte da HMIN
a HMAX px, strette); in una riga (stesso fondo) le lettere a meno di GAP px
sono la stessa parola. Stampa righe [base, [[x, larghezza], ...]] con l'OCR
dell'ingrandimento accanto come aiuto: il testo si assegna a vista.

    /usr/bin/python3 tools/afm-rec/parole.py afm-ccaf <pdf> <x0> <y0> <x1> <y1> [hmin hmax gap]
"""
import re, sys, os, json
import numpy as np
from PIL import Image
ID, PDF = sys.argv[1], int(sys.argv[2]); X0, Y0, X1, Y1 = map(int, sys.argv[3:7])
HMIN, HMAX, GAP = (int(v) for v in (sys.argv[7:10] if len(sys.argv) > 9 else (5, 12, 3)))
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
ink = (((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40))[Y0:Y1, X0:X1]
H, W = ink.shape
lab = np.zeros((H, W), int); n = 0; comp = []
for y in range(H):
    for x in range(W):
        if ink[y, x] and not lab[y, x]:
            n += 1; st = [(y, x)]; lab[y, x] = n; ys = []; xs = []
            while st:
                a, b = st.pop(); ys.append(a); xs.append(b)
                for da in (-1, 0, 1):
                    for db in (-1, 0, 1):
                        c, d = a + da, b + db
                        if 0 <= c < H and 0 <= d < W and ink[c, d] and not lab[c, d]:
                            lab[c, d] = n; st.append((c, d))
            comp.append((min(xs), min(ys), max(xs), max(ys), len(xs)))
lettere = [c for c in comp if HMIN <= c[3] - c[1] + 1 <= HMAX and c[2] - c[0] + 1 <= HMAX + 3 and c[4] >= 6]
# righe: fondo comune (+-2); i segni bassi (virgole, trattini) si aggregano alla riga che toccano
lettere.sort(key=lambda c: (c[3], c[0]))
righe = []
for c in lettere:
    for r in righe:
        if abs(r['fondo'] - c[3]) <= 2 and c[0] < r['x1'] + 40 and c[2] > r['x0'] - 40:
            r['l'].append(c); r['x0'] = min(r['x0'], c[0]); r['x1'] = max(r['x1'], c[2]); break
    else:
        righe.append({'fondo': c[3], 'x0': c[0], 'x1': c[2], 'l': [c]})
out = []
for r in righe:
    l = sorted(r['l'])
    parole = [[l[0][0], l[0][2]]]
    for c in l[1:]:
        if c[0] - parole[-1][1] <= GAP: parole[-1][1] = max(parole[-1][1], c[2])
        else: parole.append([c[0], c[2]])
    base = int(np.median([c[3] for c in l])) + 1
    alt = int(np.median([c[3] - c[1] + 1 for c in l]))
    out.append([Y0 + base, [[X0 + a, b - a + 1] for a, b in parole], alt])
for b, ws, h in sorted(out):
    print(json.dumps([b, ws, h]))
