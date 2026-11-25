#!/usr/bin/env python3
"""Pagina 5-10, figura 5-5 (Landing distance). Pagina di traverso. Tabella a griglia (griglia.py)."""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, oriz, vert, base_vera, intestazione, pagina, cella
PDF, N = 66, '5-10'
ink, ink_libro = carica(PDF)
O = [(250, 257), (366, 369), (458, 460), (602, 604), (772, 776), (907, 914)]
V = [(49, 53), (183, 186), (350, 353), (471, 474), (592, 595), (714, 717), (838, 841), (962, 964), (1084, 1087), (1208, 1211), (1329, 1334)]
y = [(a + b) / 2 for a, b in O]; x = [(a + b) / 2 for a, b in V]
el = [oriz(ink, y[0], x[0] - 2, x[-1] + 2), oriz(ink, y[-1], x[0] - 2, x[-1] + 2), vert(ink, x[0], y[0], y[-1]), vert(ink, x[-1], y[0], y[-1])]
el += [oriz(ink, y[k], x[0], x[-1]) for k in (1, 3, 4)] + [oriz(ink, y[2], x[2], x[-1])]
el += [vert(ink, x[i], y[1], y[4]) for i in (1, 2, 4, 6, 8)] + [vert(ink, x[i], y[2], y[4]) for i in (3, 5, 7, 9)]
C = 13.5
R = intestazione(ink_libro, N)
R += cella(ink, x[0], 860, y[0], y[1], ['LANDING DISTANCE'], C, margine=10)
R += cella(ink, 860, x[-1], y[0], y[1], ['FLAPS LOWERED TO 40°', 'POWER OFF - ZERO WIND', 'HARD SURFACE RUNWAY'], C, margine=10)
R += cella(ink, x[0], x[1], y[1], y[3], ['GROSS', 'WEIGHT', 'kg'], C)
R += cella(ink, x[1], x[2], y[1], y[3], ['APPROACH', 'SPEED', 'VI'], C)
for k, (q, t) in enumerate([('AT SEA LEVEL', 'AND +15°C'), ('AT 2500 FEET', 'AND +10°C'), ('AT 5000 FEET', 'AND +5°C'), ('AT 7500 FEET', 'AND 0°C')]):
    i = 2 + 2 * k
    R += cella(ink, x[i], x[i + 2], y[1], y[2], [q, t], C)
    R += cella(ink, x[i], x[i + 1], y[2], y[3], ['Ground', 'Roll', 'm'], C)
    R += cella(ink, x[i + 1], x[i + 2], y[2], y[3], ['Total', 'to Clear', '15 m', 'obs', 'm'], C)
R += cella(ink, x[0], x[1], y[3], y[4], ['1157'], C) + cella(ink, x[1], x[2], y[3], y[4], ['117 km/h', '63 kts', '73 MPH.'], C)
for k, v in enumerate(['189', '387', '201', '411', '212', '434', '224', '460']):
    R += cella(ink, x[2 + k], x[3 + k], y[3], y[4], [v], C)
R += cella(ink, x[0], x[-1], y[4], y[5], ['NOTES: 1. Reduce landing distance 10% for each 5 knots headwind.',
      '2. For operation on a dry grass runway, increase distance (both "ground roll" and "total to clear',
      'obstacle") by 20% of the "total to clear 15m obstacle"figure.'], C, margine=12)
yf = base_vera(ink, 500, 1000, y[-1] + 40, 14)
R.append(f'{yf} testo 500-1000 c=15 sx=1.1 fissa | Figure 5-5.')
pagina(PDF, N, R, el, [{'figura': 'Figura 5-5 (Landing distance)', 'metodo': "tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-10.py)."}])
print(N, len(R), 'righe', len(el), 'filetti')
