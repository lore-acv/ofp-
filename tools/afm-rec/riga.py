#!/usr/bin/env python3
"""UNA RIGA DAL SUO TESTO: LE PAROLE SULL'INCHIOSTRO, NELL'ORDINE

Si da' il testo di una riga (letto a vista) e il tratto dove sta; le parole
sono i gruppi di inchiostro separati da almeno GAP px (lo spazio fra parole del
carattere a macchina e' 8-12 px, fra lettere 1-4), i puntini guida (piccoli,
sulla linea di base) si mettono da parte. Se i gruppi sono tanti quante le
parole, si accoppiano in ordine e si stampano gli elementi "riga" (e "punti")
pronti per la pagina; se no si stampano i gruppi, e la riga si fa a mano.

    /usr/bin/python3 tools/afm-rec/riga.py afm-ccaf <pdf> <base> <x0> <x1> "parola parola ..." [gap] [ruolo] [c]
"""
import re, sys, os, json
import numpy as np
from PIL import Image
ID, PDF, BASE, X0, X1, TESTO = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), sys.argv[6]
GAP = int(sys.argv[7]) if len(sys.argv) > 7 else 6
RUOLO = sys.argv[8] if len(sys.argv) > 8 else 'testo'
C = float(sys.argv[9]) if len(sys.argv) > 9 else 18.5
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
ink = (((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40))
y0, y1 = int(BASE - C * 1.3), int(BASE + C * 0.35)
z = ink[y0:y1, X0:X1]
col = z.any(0)
gruppi = []; s = None; vuoto = 0
for i, v in enumerate(list(col) + [False] * (GAP + 1)):
    if v:
        if s is None: s = i
        e = i; vuoto = 0
    elif s is not None:
        vuoto += 1
        if vuoto >= GAP:
            gruppi.append((s, e)); s = None
punti, parole = [], []
for a, b in gruppi:
    rows = np.flatnonzero(z[:, a:b + 1].any(1))
    if b - a <= 5 and rows[-1] - rows[0] <= 5 and y0 + rows[-1] >= BASE - 4:
        punti.append(X0 + (a + b) / 2)
    else:
        parole.append((X0 + a, X0 + b))
tok = TESTO.split()
if len(tok) != len(parole):
    print(f'NO: {len(tok)} parole, {len(parole)} gruppi:', parole, file=sys.stderr)
    sys.exit(1)
print(json.dumps(['riga', RUOLO, BASE, [[a, t] for (a, b), t in zip(parole, tok)]], ensure_ascii=False) + ',')
if punti:
    print(json.dumps(['punti', BASE, [round(x, 1) for x in punti]]) + ',')
