#!/usr/bin/env python3
"""Pagina 6-19 (di traverso), figura 6-5 (Loading graph).

Coordinate della pagina girata diritta. Griglia, rette di carico, scale con
le tacche, riquadro del titolo e asterischi: tratto vettorializzato con
potrace (tratto.py). Le scritte lungo le rette (PILOT & FRONT PASSENGER, WING
FUEL, REAR PASSENGERS, BAGGAGE, AUX. FUEL OR PASSENGERS ON CHILD'S SEAT) sono
inclinate come le rette: restano disegno, nel tratto. Testo vero: numeri delle
scale (ruolo figtitolo), LOAD WEIGHT (verticale, ang -90), titolo, note (ruolo
testo). Seconde conferme dei numeri: le scale sono progressioni regolari con
le tacche equidistanti, e si accordano fra loro (400 lbs / 200 kg = 378 / 416
px = 0,909 = 400 / 441; 30 pound-inch = 34,6 kg-cm, sotto il 35); le note:
46 U.S. gal = 174 l, 17 gal = 64 l, 6 lb/gal = 0,72 kg/l, 10 qts = 9,5 l,
19 lb = 8,5 kg (come la riga 2 del problema di carico, figura 6-4).

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/6-19.py
    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccaf 6-19 fig-6-5 176 290 1470 942
"""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, intestazione, pagina

ink, il = carica(87)
import numpy as np
def bv(x0, x1, yg):
    """la linea di base vera di un'etichetta: il fondo della fascia d'inchiostro piu' vicina a yg
    (dentro la finestra le tacche delle scale non toccano i numeri)"""
    z = ink[yg - 22:yg + 12, x0:x1].any(1); fasce = []; s0 = None
    for i, v in enumerate(list(z) + [False]):
        if v and s0 is None: s0 = i
        if not v and s0 is not None:
            if i - s0 >= 6: fasce.append(yg - 22 + i)
            s0 = None
    return min(fasce, key=lambda y: abs(y - yg)) if fasce else yg
N = 'figtitolo c=14 fissa'
T = 'testo c=12 sx=0.86'
scala_lbs = [(y, v) for y, v in zip((348, 395, 442, 489, 536, 583, 630, 677, 724), (400, 350, 300, 250, 200, 150, 100, 50, 0))]
righe = intestazione(il, '6-19') + [
    f'{bv(360, 395, 310)} {N} 360-395 | KG',
    f'{bv(400, 444, 310)} {N} 400-444 | 200',
    f'{bv(400, 444, 414)} {N} 400-444 | 150',
    f'{bv(400, 444, 518)} {N} 400-444 | 100',
    f'{bv(400, 444, 626)} {N} 400-444 | 50',
    f'{bv(415, 444, 726)} {N} 415-444 | 0',
    f'{bv(476, 520, 310)} {N} 476-520 | LBS',
] + [f'{bv(476, 522, y)} {N} 476-522 | {v}' for y, v in scala_lbs] + [
    f'{bv(515, 540, 738)} {N} 515-540 | 0',
    f'{bv(648, 670, 738)} {N} 648-670 | 5',
    f'{bv(776, 810, 738)} {N} 776-810 | 10',
    f'{bv(910, 944, 738)} {N} 910-944 | 15',
    f'{bv(1043, 1080, 738)} {N} 1043-1080 | 20',
    f'{bv(1178, 1212, 738)} {N} 1178-1212 | 25',
    f'{bv(1311, 1347, 738)} {N} 1311-1347 | 30',
    f'{bv(1388, 1470, 738)} {N} 1388-1470 | POUND-',
    f'{bv(1395, 1450, 752)} {N} 1395-1450 sopra=13 | INCH',
    f'{bv(515, 535, 785)} {N} 515-535 | 0',
    f'{bv(630, 650, 785)} {N} 630-650 | 5',
    f'{bv(743, 770, 785)} {N} 743-770 | 10',
    f'{bv(860, 888, 785)} {N} 860-888 | 15',
    f'{bv(971, 1002, 785)} {N} 971-1002 | 20',
    f'{bv(1088, 1118, 785)} {N} 1088-1118 | 25',
    f'{bv(1203, 1234, 785)} {N} 1203-1234 | 30',
    f'{bv(1321, 1350, 785)} {N} 1321-1350 | 35',
    f'{bv(1392, 1470, 785)} {N} 1392-1470 | KG- CM',
    f'{bv(878, 1092, 811)} {N} 878-1092 | LOAD MOMENT/1000',
    f'{bv(1200, 1390, 680)} {N} 1200-1390 | LOADING GRAPH',
    f'842 {T} 312-870 | MAXIMUM USABLE FUEL @ 6 LBS/GAL (0,72 KG/LITRE):',
    # due pezzi: fra Standard e Tanks ci sono 6 colonne vuote, fra le cifre di (174 anche
    f'860 {T} 424-761 gap=6 fissa | Standard Tanks in Wings: 46 U.S. Gal',
    f'860 {T} 762-895 gap=7 fissa | (174 Litres)',
    f'878 {T} 424-1008 | Optional Auxiliary Tank in Baggage Area: 17 U.S. Gal (64 Litres)',
    f'899 {T} 310-421 gap=7 fissa basefissa | NOTES: (1)',
    f'902 {T} 424-1405 | Line representing adjustable seats shows the pilot or front passenger center of gravity on adjustable seats positioned',
    f'919 {T} 420-1420 | for an average occupant. Refer to the loading arrangements diagram for forward and aft limits of occupant c.g. range.',
    f'935 {T} 390-1090 gap=5 fissa | (2) Engine oil: 10 Qts. (9,5 litres) = 19 Lbs. (8,5 kg) at -0,5 Moment/1000.',
    '995 650-900 | Figure 6-5.',
]
el = [
    # LOAD WEIGHT, verticale (si legge dal basso): base = la x della linea di base, x delle parole = la y dove cominciano
    ["riga", "figtitolo", 362, [[559, "LOAD", 38], [513, "WEIGHT", 57]], {"ang": -90, "c": 14, "fissa": True}],
    ["linea", 162, 947.25, 1464, 948.5, 6.5],
    ["linea", 168.5, 292, 168.0, 951, 9.5],
    ["svgfile", "figure/fig-6-5.svg"],
]
figure = [{"figura": "Figura 6-5 (Loading graph)", "metodo": "cornice: filetti misurati; griglia, rette di carico con le loro scritte inclinate, scale e riquadro del titolo: tratto vettorializzato con potrace (tratto.py); numeri delle scale, titoli e note: testo vero (costruisci/6-19.py)."}]
pagina(87, '6-19', righe, el, figure)
