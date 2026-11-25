#!/usr/bin/env python3
"""Pagina 5-11, figura 5-6 (Maximum rate-of-climb data). Pagina di traverso. Tabella a griglia (griglia.py)."""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, oriz, vert, base_vera, intestazione, pagina, cella
PDF, N = 67, '5-11'
ink, ink_libro = carica(PDF)
O = [(301, 307), (397, 399), (471, 473), (563, 568), (662, 663), (754, 755), (850, 851), (957, 963)]
V = [(175, 179), (281, 283), (383, 384), (490, 491), (567, 569), (672, 674), (779, 780), (859, 861), (962, 964), (1070, 1071), (1154, 1155), (1256, 1258), (1362, 1363), (1442, 1447)]
y = [(a + b) / 2 for a, b in O]; x = [(a + b) / 2 for a, b in V]
el = [oriz(ink, y[0], x[0] - 2, x[-1] + 2), oriz(ink, y[-1], x[0] - 2, x[-1] + 2), vert(ink, x[0], y[0], y[-1]), vert(ink, x[-1], y[0], y[-1])]
el += [oriz(ink, y[k], x[0], x[-1]) for k in (1, 3, 4, 5, 6)] + [oriz(ink, y[2], x[1], x[-1])]
el += [vert(ink, x[i], y[1], y[6]) for i in (1, 4, 7, 10)] + [vert(ink, x[i], y[2], y[6]) for i in (2, 3, 5, 6, 8, 9, 11, 12)]
C = 11.5
SX = 0.95     # il carattere di questa tabella e' piu' stretto di quello delle tabelle di crociera
R = intestazione(ink_libro, N)
R += cella(ink, x[0], x[-1], y[0], y[1], ['MAXIMUM RATE OF CLIMB DATA'], C, margine=10, sx=SX)
R += cella(ink, x[0], x[1], y[1], y[3], ['GROSS', 'WEIGHT', 'kg'], C, sx=SX)
for k, (q, t) in enumerate([('AT SEA LEVEL', 'AND +15°C'), ('AT 5000 FEET', 'AND +5°C'), ('AT 10000 FEET', 'AND -5°C'), ('AT 15000 FEET', 'AND -15°C')]):
    i = 1 + 3 * k
    R += cella(ink, x[i], x[i + 3], y[1], y[2], [q, t], C, sx=SX)
    R += cella(ink, x[i], x[i + 1], y[2], y[3], ['VI'], C, sx=SX)
    R += cella(ink, x[i + 1], x[i + 2], y[2], y[3], ['RATE OF', 'CLIMB', 'F/MIN'], C, margine=4, sx=SX)
    R += cella(ink, x[i + 2], x[i + 3], y[2], y[3], ['FUEL', 'USED', 'Litres'], C, margine=4, sx=SX)
D = [('1157', [((137, 74, 85), 880, '4,9'), ((135, 73, 84), 650, '11,7'), ((134, 72, 83), 420, '20,1'), ((132, 71, 82), 190, '33,3')]),
     ('1000', [((132, 71, 82), 1120, '4,9'), ((130, 70, 81), 860, '10,2'), ((129, 70, 80), 595, '16,3'), ((127, 69, 79), 340, '24,2')]),
     ('850', [((129, 70, 80), 1420, '4,9'), ((126, 68, 78), 1115, '8,7'), ((124, 67, 77), 815, '13,2'), ((122, 66, 76), 515, '19,3')])]
for g, (peso, quote) in enumerate(D):
    ya, yb = y[3 + g], y[4 + g]
    R += cella(ink, x[0], x[1], ya, yb, [peso], C, sx=SX)
    for k, ((kmh, kts, mph), roc, fuel) in enumerate(quote):
        assert abs(kts * 1.852 - kmh) <= 1.5 and abs(mph * 1.609 - kmh) <= 1.5, (kmh, kts, mph)
        i = 1 + 3 * k
        R += cella(ink, x[i], x[i + 1], ya, yb, [f'{kmh} km/h', f'{kts} kts', f'{mph} MPH'], C, margine=5, sx=SX)
        R += cella(ink, x[i + 1], x[i + 2], ya, yb, [str(roc)], C, sx=SX) + cella(ink, x[i + 2], x[i + 3], ya, yb, [fuel], C, sx=SX)
R += cella(ink, x[0], x[-1], y[6], y[7], ['NOTES: 1. Flaps up, full throttle, 2800 RPM, mixture at recommended leaning schedule.',
      ('2. Fuel used includes warm-up and take-off allowance.', 1005), '3. For hot weather, decrease rate of climb 20 ft/min. for each 5°C',
      'above standard day temperature for particular altitude.'], 10.5, margine=12, sx=SX, gap=5)
yf = base_vera(ink, 600, 1100, y[-1] + 40, 14)
R.append(f'{yf} testo 600-1100 c=15 sx=1.1 fissa | Figure 5-6.')
pagina(PDF, N, R, el, [{'figura': 'Figura 5-6 (Maximum rate-of-climb data)', 'metodo': "tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, ogni terna km/h, kts, MPH controllata; agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-11.py)."}])
print(N, len(R), 'righe', len(el), 'filetti')
