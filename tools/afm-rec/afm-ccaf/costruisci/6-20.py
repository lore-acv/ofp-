#!/usr/bin/env python3
"""Pagina 6-20 (di traverso), figura 6-6 (Center of gravity moment envelope).

Come la 6-19: griglia, inviluppi (normale e utility, tratteggiato), scale con
le tacche, riquadro del titolo e la scritta inclinata UTILITY CATEGORY:
tratto (tratto.py). Testo vero: numeri delle scale, intestazioni, titoli,
LOADED AIRCRAFT WEIGHT (verticale). Le x dei numeri vengono dai gruppi
d'inchiostro della loro fascia, le basi dall'inchiostro (bv). Seconde conferme:
le scale sono progressioni regolari a passo costante (lbs: 2500...1500 ogni
46,8 px; kg: 1100...700 ogni 103,5 px = 220 lbs, cioe' 100 kg; pound-inch
50...120 ogni 65,4 px; kg-cm 60...140 ogni 56,3 px = 65,4 / 1,152, il
rapporto fra kg-cm e pound-inch).

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/6-20.py
    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccaf 6-20 fig-6-6 74 252 1341 896
"""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, pagina
import numpy as np

ink, il = carica(88)
def bv(x0, x1, yg):
    """la linea di base vera: il fondo della fascia d'inchiostro piu' vicina a yg"""
    z = ink[yg - 22:yg + 12, x0:x1].any(1); fasce = []; s0 = None
    for i, v in enumerate(list(z) + [False]):
        if v and s0 is None: s0 = i
        if not v and s0 is not None:
            if i - s0 >= 6: fasce.append(yg - 22 + i)
            s0 = None
    return min(fasce, key=lambda y: abs(y - yg)) if fasce else yg

N = 'figtitolo c=13 fissa'
# le x dei numeri delle due scale in basso: i gruppi d'inchiostro della loro fascia
PI = [(290, 312), (350, 376), (413, 440), (478, 504), (548, 568), (607, 635), (673, 700), (738, 765), (804, 830),
      (868, 896), (932, 963), (1000, 1029), (1066, 1095), (1132, 1161), (1196, 1228)]
KC = [(317, 336), (373, 391), (424, 447), (484, 502), (539, 559), (595, 615), (653, 673), (710, 729), (763, 793),
      (821, 849), (875, 904), (933, 962), (990, 1020), (1046, 1075), (1101, 1130), (1162, 1188), (1218, 1247)]
def et(x0, x1, yg, t):
    return f'{bv(x0, x1, yg)} {N} {x0}-{x1} | {t}'

# l'intestazione a mano: un segno a evidenziatore sul numero di pagina confonde intestazione()
righe = ['168 libro 400-850 | Flight Manual', '194 libro 400-850 | Reims Rocket',
         '325 libro 200-650 | Page: 6-20', '325 libro 650-1100 | Reims Aviation',
         '355 libro 200-650 | Edition: 3', '356 libro 650-1100 | Reims, Marne France'] + [
    et(150, 190, 274, 'KG'),
    et(140, 192, 356, '1100'),
    et(140, 192, 461, '1000'),
    et(150, 192, 564, '900'),
    et(150, 192, 665, '800'),
    et(150, 192, 769, '700'),
    et(232, 284, 274, 'LBS.'),
] + [et(232, 284, y, v) for y, v in zip((321, 369, 415, 462, 508, 556, 603, 651, 697, 744, 789), range(2500, 1400, -100))] + [
    et(x0 - 3, x1 + 3, 815, str(50 + 5 * i)) for i, (x0, x1) in enumerate(PI)
] + [
] + [et(x0 - 3, x1 + 3, 841, str(60 + 5 * i)) for i, (x0, x1) in enumerate(KC)] + [
    et(1255, 1325, 841, 'KG-CM'),
    f'{bv(612, 958, 871)} figtitolo c=13 612-958 | LOADED AIRCRAFT MOMENT/1000',
    f'{bv(460, 700, 324)} figtitolo c=13 460-700 | CENTER OF GRAVITY',
    f'{bv(460, 700, 341)} figtitolo c=13 460-700 | MOMENT ENVELOPE',
    f'379 figtitolo c=13 935-1040 sotto=0 | NORMAL',
    f'396 figtitolo c=13 912-1040 sopra=12 | CATEGORY',
    '943 600-830 | Figure 6-6.',
]
el = [
    # POUND-: la parola col trattino sta in 1258-1338 (a destra c'e' il bordo della griglia)
    ["riga", "figtitolo", 799, [[1258, "POUND-", 80]], {"c": 13, "fissa": True}],
    ["riga", "figtitolo", 816, [[1259, "INCH", 47]], {"c": 13, "fissa": True}],
    # LOADED AIRCRAFT WEIGHT, verticale (si legge dal basso)
    ["riga", "figtitolo", 130, [[629, "LOADED", 58], [563, "AIRCRAFT", 74], [482, "WEIGHT", 55]], {"ang": -90, "c": 13, "fissa": True}],
    ["linea", 66, 248.0, 1347, 247.5, 5.5],
    ["linea", 66, 900.5, 1347, 899.5, 6.0],
    ["linea", 68.5, 245, 70.5, 903, 3.0],
    ["linea", 1345.0, 245, 1344.5, 903, 3.0],
    ["svgfile", "figure/fig-6-6.svg"],
]
figure = [{"figura": "Figura 6-6 (Center of gravity moment envelope)", "metodo": "cornice: filetti misurati; griglia, inviluppi, scale e riquadro del titolo, con la scritta inclinata UTILITY CATEGORY: tratto vettorializzato con potrace (tratto.py); numeri delle scale e titoli: testo vero (costruisci/6-20.py)."}]
pagina(88, '6-20', righe, el, figure)
