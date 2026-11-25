#!/usr/bin/env python3
"""Pagina 5-7, figura 5-2 (Airspeed correction table). Pagina di traverso.

Tabella a griglia: filetti misurati ai due capi; il contenuto delle celle letto a vista e
controllato con l'aritmetica (le righe km/h e MPH sono la stessa velocita': x 1,609); ogni
scritta si aggancia al suo inchiostro dentro la sua cella (testo.py, "fissa")."""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, gruppi, oriz, vert, base_vera, intestazione, pagina
import numpy as np
PDF, N = 63, '5-7'
ink, ink_libro = carica(PDF)
O = [(295, 304), (370, 372), (378, 380), (426, 428), (473, 475), (520, 522), (565, 567), (573, 575), (623, 624), (669, 670), (716, 717), (760, 762), (769, 771), (817, 819), (864, 865), (910, 912), (955, 964)]
V = [(150, 153), (363, 366), (478, 481), (566, 569), (653, 656), (739, 743), (827, 831), (916, 919), (1002, 1006), (1090, 1094), (1177, 1181), (1266, 1269), (1354, 1357), (1439, 1443)]
yo = [(a + b) / 2 for a, b in O]; xv = [(a + b) / 2 for a, b in V]
el = [oriz(ink, yo[0], xv[0] - 2, xv[-1] + 2), oriz(ink, yo[-1], xv[0] - 2, xv[-1] + 2),
      vert(ink, xv[0], yo[0], yo[-1]), vert(ink, xv[-1], yo[0], yo[-1])]
for k in (1, 2, 6, 7, 11, 12): el.append(oriz(ink, yo[k], xv[0], xv[-1]))            # i doppi filetti
for k in (3, 4, 5, 8, 9, 10, 13, 14, 15): el.append(oriz(ink, yo[k], xv[1], xv[-1]))  # fra le righe di un gruppo
for i in range(1, 13): el.append(vert(ink, xv[i], yo[2], yo[-1]))
# le righe di dati: (fascia fra i filetti, etichetta in due righe, valori)
G = [('UP', [3, 4, 5, 6]), ('20°', [8, 9, 10, 11]), ('40°', [13, 14, 15, 16])]
VAL = {
 'UP':  [['80', '97', '113', '129', '145', '161', '177', '193', '209', '225', '241'], ['50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150'],
         ['95', '105', '116', '129', '143', '159', '175', '192', '206', '222', '238'], ['59', '65', '72', '80', '89', '99', '109', '119', '128', '138', '148']],
 '20°': [['80', '97', '113', '129', '145', '161'] + ['•'] * 5, ['50', '60', '70', '80', '90', '100'] + ['•'] * 5,
         ['95', '103', '116', '130', '145', '161'] + ['•'] * 5, ['59', '64', '72', '81', '90', '100'] + ['•'] * 5],
 '40°': [['80', '97', '113', '129', '145', '161'] + ['•'] * 5, ['50', '60', '70', '80', '90', '100'] + ['•'] * 5,
         ['95', '103', '116', '132', '146', '163'] + ['•'] * 5, ['59', '64', '72', '82', '91', '101'] + ['•'] * 5]}
ETI = [('VI', 'km/h'), ('VI', 'MPH'), ('VC', 'km/h'), ('VC', 'MPH')]
righe = intestazione(ink_libro, N)
yt = (yo[0] + yo[1]) / 2 + 7
righe.append(f'{base_vera(ink, xv[0] + 8, xv[-1] - 8, yt, 11)} cella {int(xv[0]) + 8}-{int(xv[-1]) - 8} c=14 gap=6 fissa | AIRSPEED CORRECTION TABLE')
# controllo: km/h = MPH x 1,609 (+-1)
for g, rr in G:
    for a, b in ((0, 1), (2, 3)):
        for k, m in zip(VAL[g][a], VAL[g][b]):
            if k != '•': assert abs(int(m) * 1.609 - int(k)) <= 1, (g, k, m)
for g, rr in G:
    for r, k in enumerate(rr):
        ya, yb = yo[k - 1], yo[k]
        # l'etichetta: due righe nella cella
        y1 = base_vera(ink, xv[1] + 8, xv[2] - 8, ya + (yb - ya) * 0.42, 10); y2 = base_vera(ink, xv[1] + 8, xv[2] - 8, yb - 4, 10)
        righe.append(f'{y1} cella {int(xv[1]) + 6}-{int(xv[2]) - 6} c=14.5 gap=6 fissa | {ETI[r][0]}')
        righe.append(f'{y2} cella {int(xv[1]) + 6}-{int(xv[2]) - 6} c=14.5 gap=6 fissa | {ETI[r][1]}')
        for c, v in enumerate(VAL[g][r]):
            x0, x1 = int(xv[2 + c]) + 6, int(xv[3 + c]) - 6
            if v == '•':     # il pallino delle celle vuote: un cerchio misurato
                z = ink[int(ya) + 6:int(yb) - 5, x0:x1].copy()
                z[z.mean(1) > 0.5] = False                       # i pezzi dei filetti
                ys, xs = np.nonzero(z)
                cy0 = np.median(ys); keep = np.abs(ys - cy0) < 8; ys, xs = ys[keep], xs[keep]
                cx, cy = x0 + xs.mean() + 0.5, int(ya) + 6 + ys.mean() + 0.5
                rr_ = (np.sqrt(len(xs) / np.pi))
                el.append(['svg', f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{rr_:.1f}"/>'])
                continue
            yb_ = base_vera(ink, x0, x1, (ya + yb) / 2 + 6, 15)
            righe.append(f'{yb_} cella {x0}-{x1} c=15 gap=6 fissa | {v}')
    # l'etichetta del gruppo, al centro del gruppo
    yc = (yo[rr[0] - 1] + yo[rr[-1]]) / 2
    if g == 'UP':
        righe.append(f'{base_vera(ink, xv[0] + 8, xv[1] - 8, yc + 6, 11)} cella {int(xv[0]) + 8}-{int(xv[1]) - 8} c=14 gap=6 fissa | FLAPS UP')
    else:
        righe.append(f'{base_vera(ink, xv[0] + 8, xv[1] - 8, yc - 2, 11)} cella {int(xv[0]) + 8}-{int(xv[1]) - 8} c=14 gap=6 fissa | FLAPS')
        righe.append(f'{base_vera(ink, xv[0] + 8, xv[1] - 8, yc + 18, 11)} cella {int(xv[0]) + 8}-{int(xv[1]) - 8} c=14 gap=6 fissa | {g}')
yf = base_vera(ink, 500, 1000, yo[-1] + 40, 14)
righe.append(f'{yf} testo 500-1000 c=15 sx=1.1 fissa | Figure 5-2.')
pagina(PDF, N, righe, el, [{'figura': 'Figura 5-2 (Airspeed correction table)', 'metodo': "tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista; ogni coppia km/h e MPH controllata: km/h = MPH x 1,609), agganciato all'inchiostro cella per cella (costruisci/5-7.py)."}])
print(N, len(righe), 'righe', len(el), 'filetti')
