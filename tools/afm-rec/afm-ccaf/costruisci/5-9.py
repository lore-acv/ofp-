#!/usr/bin/env python3
"""Pagina 5-9, figura 5-4 (Take-off distance). Pagina di traverso.

Tabella a griglia: filetti misurati ai due capi; il contenuto delle celle letto a vista (riga per
riga, nell'ordine delle fasce d'inchiostro della cella) e agganciato all'inchiostro."""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, oriz, vert, base_vera, intestazione, pagina, cella
PDF, N = 65, '5-9'
ink, ink_libro = carica(PDF)
O = [(295, 303), (365, 367), (439, 441), (576, 578), (668, 670), (760, 761), (851, 852), (948, 956)]
V = [(153, 157), (266, 269), (406, 409), (487, 489), (570, 573), (679, 682), (785, 788), (894, 897), (1003, 1006), (1111, 1114), (1220, 1222), (1327, 1330), (1436, 1441)]
y = [(a + b) / 2 for a, b in O]; x = [(a + b) / 2 for a, b in V]
el = [oriz(ink, y[0], x[0] - 2, x[-1] + 2), oriz(ink, y[-1], x[0] - 2, x[-1] + 2), vert(ink, x[0], y[0], y[-1]), vert(ink, x[-1], y[0], y[-1])]
el += [oriz(ink, y[k], x[0], x[-1]) for k in (1, 3, 4, 5, 6)] + [oriz(ink, y[2], x[2], x[-1])]
el += [vert(ink, x[i], y[1], y[6]) for i in (1, 2, 4, 6, 8, 10)] + [vert(ink, x[i], y[2], y[6]) for i in (3, 5, 7, 9, 11)]
C = 13.5
R = intestazione(ink_libro, N)
R += cella(ink, x[0], x[6], y[0], y[1], ['TAKE-OFF DISTANCE'], C, margine=10)
R += cella(ink, x[6], x[-1], y[0], y[1], ['FLAPS 10°', 'HARD SURFACE RUNWAY'], C, margine=10)
R += cella(ink, x[0], x[1], y[1], y[3], ['GROSS', 'WT', 'kg'], C)
R += cella(ink, x[1], x[2], y[1], y[3], ['VI', '15m'], C)
R += cella(ink, x[2], x[4], y[1], y[2], ['HEAD', 'WIND'], C)
R += cella(ink, x[2], x[3], y[2], y[3], ['km/h'], C) + cella(ink, x[3], x[4], y[2], y[3], ['kts'], C)
for k, (q, t) in enumerate([('AT SEA LEVEL', 'AND +15°C'), ('AT 2500 FEET', 'AND +10°C'), ('AT 5000 FEET', 'AND +5°C'), ('AT 7500 FEET', 'AND 0°C')]):
    i = 4 + 2 * k
    R += cella(ink, x[i], x[i + 2], y[1], y[2], [q, t], C)
    R += cella(ink, x[i], x[i + 1], y[2], y[3], ['Ground', 'Run', 'm'], C)
    R += cella(ink, x[i + 1], x[i + 2], y[2], y[3], ['Total', 'to Clear', '15 m', 'obs', 'm'], C)
D = [('1157', ['109 km/h', '59 kts', '68 MPH'], [[226, 158, 102], [375, 282, 201], [268, 192, 126], [439, 335, 242], [325, 235, 158], [526, 405, 297], [393, 288, 200], [639, 497, 370]]),
     ('1000', ['101 km/h', '55 kts', '63 MPH'], [[162, 110, 69], [282, 209, 145], [192, 134, 85], [326, 245, 172], [232, 163, 105], [386, 291, 207], [279, 200, 133], [459, 349, 253]]),
     ('850', ['93 km/h', '50 kts', '58 MPH'], [[113, 75, 43], [210, 154, 104], [133, 90, 53], [241, 177, 120], [160, 108, 67], [280, 207, 143], [192, 133, 84], [328, 245, 172]])]
for g, (peso, vi, col) in enumerate(D):
    ya, yb = y[3 + g], y[4 + g]
    R += cella(ink, x[0], x[1], ya, yb, [peso], C) + cella(ink, x[1], x[2], ya, yb, vi, C)
    R += cella(ink, x[2], x[3], ya, yb, ['0', '19', '37'], C) + cella(ink, x[3], x[4], ya, yb, ['0', '10', '20'], C)
    for k, v in enumerate(col):
        R += cella(ink, x[4 + k], x[5 + k], ya, yb, [str(n) for n in v], C)
R += cella(ink, x[0], x[-1], y[6], y[7], ['NOTES: 1. Increase distance 10% for each 14°C above standard temperature for particular altitude.',
      '2. For operation on a dry, grass runway, increase distances (both "ground run" and "total',
      'to clear obstacle") by 7% of the "total to clear 15 m obstacle" figure.'], C, margine=12)
yf = base_vera(ink, 600, 1000, y[-1] + 40, 14)
R.append(f'{yf} testo 600-1000 c=15 sx=1.1 fissa | Figure 5-4.')
pagina(PDF, N, R, el, [{'figura': 'Figura 5-4 (Take-off distance)', 'metodo': "tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-9.py)."}])
print(N, len(R), 'righe', len(el), 'filetti')
