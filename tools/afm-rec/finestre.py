#!/usr/bin/env python3
"""LE FINESTRE DI testi/<n>.txt STRETTE FUORI DAI FILETTI VERTICALI

Una finestra (x0-x1 di una riga) portata da un'altra scansione puo' cominciare o finire sopra il
filetto di una cella: testo.py prende allora il filetto per una lettera ("1 1 5 7", parole
spaziate). Ai due bordi della finestra (16 px verso l'interno, 6 verso l'esterno) si cercano le
colonne d'inchiostro pieno per tutta l'altezza della riga (da base - 1,3 c a base + 0,3 c): sono
filetti, e la finestra si stringe fino a 3 px oltre. Solo le righe con una finestra; quelle
dell'intestazione (libro) no.

    /usr/bin/python3 -I tools/afm-rec/finestre.py afm-ccab 5-11
"""
import json, re, sys
import numpy as np
from PIL import Image
R = '/home/user/ofp-'; ID, N = sys.argv[1], sys.argv[2]
p = json.load(open(f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'))
st = json.load(open(f'{R}/tools/afm-rec/{ID}/stile.json'))['ruoli']
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
ink = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
if p.get('rot') == -90: ink = np.rot90(ink, 3)
f = f'{R}/tools/afm-rec/{ID}/testi/{N}.txt'
righe = open(f, encoding='utf-8').read().split('\n')
cambi = 0
for i, r in enumerate(righe):
    if ' | ' not in r or r.startswith('#'): continue
    testa, testo = r.split(' | ', 1)
    q = testa.split()
    if 'libro' in q: continue
    k = next((j for j, v in enumerate(q) if re.fullmatch(r'\d+-\d+', v)), None)
    if k is None: continue
    x0, x1 = map(int, q[k].split('-'))
    ruolo = q[1] if len(q) > 1 and re.fullmatch(r'[a-z]+', q[1]) else 'testo'
    c = next((float(v[2:]) for v in q if v.startswith('c=')), st.get(ruolo, st['testo'])['c'])
    b = int(q[0]); y0, y1 = int(b - c * 1.3), int(b + c * 0.3)
    piena = ink[y0:y1].mean(0) > 0.95          # colonne piene per tutta l'altezza della riga
    n0, n1 = x0, x1
    sx = np.flatnonzero(piena[max(0, x0 - 6):x0 + 16]) + max(0, x0 - 6)
    if len(sx): n0 = int(sx.max()) + 3
    dx = np.flatnonzero(piena[x1 - 16:x1 + 6]) + x1 - 16
    if len(dx): n1 = int(dx.min()) - 3
    if (n0, n1) != (x0, x1) and n1 - n0 > 10:
        q[k] = f'{n0}-{n1}'; righe[i] = ' '.join(q) + ' | ' + testo; cambi += 1
open(f, 'w', encoding='utf-8').write('\n'.join(righe))
print(f'{N}: {cambi} finestre strette fuori dai filetti')
