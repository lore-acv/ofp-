#!/usr/bin/env python3
"""Pagina 6-18 (di traverso), figura 6-4 (Sample loading problem).

Coordinate della pagina girata diritta. Testo vero nel ruolo figtitolo (senza
grazie) a corpo 13,5; le righe della voce finiscono prima dei puntini guida,
che con i filetti sottili restano nel tratto (tratto.py). Filetti della
tabella: misurati (filetti.py --girata). I numeri hanno la seconda conferma
nella somma: 677,7 + 8,5 + 125,2 + 154,2 + 154,2 + 36,9 = 1156,7 kg e
64,1 - 0,5 + 15,3 + 14,5 + 28,5 + 8,9 = 130,8 cmkg/1000 (riga 7 e riga 8).

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/6-18.py
    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccaf 6-18 fig-6-4 74 258 1340 892
"""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, intestazione, pagina

ink, il = carica(86)
F = 'figtitolo c=13.5'
N = 'figtitolo c=13.5 fissa'
righe = intestazione(il, '6-18') + [
    f'285 {N} 815-1065 | SAMPLE AIRPLANE',
    f'285 {N} 1088-1338 | YOUR AIRPLANE',
    f'316 {F} 140-790 | SAMPLE LOADING PROBLEM',
    f'323 {N} 815-935 | Weight',
    f'323 {N} 945-1065 | Moment',
    f'323 {N} 1088-1210 | Weight',
    f'323 {N} 1220-1338 | Moment',
    f'343 {N} 815-935 | kg',
    f'346 {N} 942-1066 | cmkg/1000',
    f'343 {N} 1088-1210 | kg',
    f'346 {N} 1217-1338 | cmkg/1000',
    f'399 {F} 80-140 | 1.',
    f'399 {F} 140-580 | Licensed Empty Weight (Sample Airplane)',
    f'439 {F} 80-140 | 2.',
    f'439 {F} 140-790 | Oil: 10 Qts. (9,5 Litres) The weight of full oil may be used',
    f'461 {F} 140-335 | for all calculations',
    f'500 {F} 80-140 | 3.',
    f'500 {F} 140-790 | Fuel: Standard Wing Tanks - 46 U.S. Gal. at 6 pounds/gallon',
    f'520 {F} 215-728 | Standard Wing Tanks - 174 Litres at 0,72 Kg/Litre',
    f'560 {F} 140-790 | Fuel: Auxiliary Tank in Baggage Area - 17 U.S. Gal. at',
    f'580 {F} 215-662 | 6 pounds/gallon (64 Litres at 0,72 Kg/Litre)',
    f'620 {F} 80-140 | 4.',
    f'620 {F} 140-647 gap=9 fissa | Pilot and Front Passenger: Station 86 to 117 cm',
    f'661 {F} 80-140 | 5.',
    f'661 {F} 140-310 | Rear Passengers',
    f'701 {F} 80-140 | 6.',
    f'701 {F} 140-790 | Baggage Area: 200 Lbs. (91 kg) Max.',
    f'721 {F} 140-790 | Station 208 to 274 cm',
    f'741 {F} 140-682 | or Passenger on Child’s Seat: 120 Lbs (54 Kg) Max.',
    f'793 {F} 80-140 | 7.',
    f'793 {F} 140-498 | TOTAL WEIGHT AND MOMENT',
    f'851 {F} 80-140 | 8.',
    f'851 {F} 140-1000 | Locate this point (1156,7 at 130,8) on the center of gravity moment envelope,',
    f'871 {F} 140-1000 | and since this point falls within the envelope, the loading is acceptable.',
    f'399 {N} 815-935 | 677,7',
    f'399 {N} 945-1065 | 64,1',
    f'458 {N} 815-935 | 8,5',
    f'458 {N} 945-1065 | -0,5',
    f'458 {N} 1088-1210 | 8,5',
    f'458 {N} 1220-1338 | -0,5',
    f'518 {N} 815-935 | 125,2',
    f'518 {N} 945-1065 | 15,3',
    f'623 {N} 815-935 | 154,2',
    f'623 {N} 945-1065 | 14,5',
    f'665 {N} 815-935 | 154,2',
    f'665 {N} 945-1065 | 28,5',
    f'740 {N} 815-935 | 36,9',
    f'740 {N} 945-1065 | 8,9',
    f'796 {N} 815-935 | 1156,7',
    f'796 {N} 945-1065 | 130,8',
    '954 600-800 | Figure 6-4.',
]
el = [
    ["linea", 68, 254.5, 1345, 254.5, 8.0],
    ["linea", 805, 297.75, 1344, 297.75, 3.0],
    ["linea", 69, 362.75, 1343, 362.75, 3.0],
    ["linea", 68, 369.75, 1343, 369.75, 2.5],
] + [["linea", 805, y, 1344, y, 2.75] for y in (419.25, 477.5, 536.25, 595.25, 638.25, 680.75)] + [
    ["linea", 70, 759.25, 1344, 759.25, 2.5],
    ["linea", 70, 816.0, 1345, 816.0, 2.5],
    ["linea", 70, 822.5, 1345, 822.5, 2.5],
    ["linea", 70, 896.5, 1346, 896.5, 8.0],
    ["linea", 71.0, 250, 72.5, 900, 3.0],
    ["linea", 807.0, 250, 807.5, 818, 3.0],
    ["linea", 938.0, 296, 938.5, 818, 3.5],
    ["linea", 1070.5, 250, 1071.0, 818, 2.5],
    ["linea", 1081.0, 250, 1081.5, 818, 3.5],
    ["linea", 1213.0, 296, 1213.0, 818, 3.5],
    ["linea", 1342.0, 250, 1342.5, 900, 3.0],
    ["svgfile", "figure/fig-6-4.svg"],
]
figure = [{"figura": "Figura 6-4 (Sample loading problem)", "metodo": "filetti della tabella misurati (filetti.py --girata); puntini guida: tratto con potrace (tratto.py); testo vero, ruolo figtitolo; numeri confermati dalla somma (peso e momento totali) (costruisci/6-18.py)."}]
pagina(86, '6-18', righe, el, figure)
