#!/usr/bin/env python3
"""Pagina 4-8, figura 4-2 (Taxiing diagram).

Scritte: righe e posizioni dall'OCR dell'ingrandimento (etichette.py, K=6),
testo letto a vista. Le scritte dei quattro riquadri e la nota sono in un
serif a grazie spesse (ruolo "nota"), CODE e WIND DIRECTION in tondo
(testo), il titolo in bastoni nero (titolo). Restano disegno, vettorializzati
con tratto.py --retino: l'aeroplano, le frecce del vento, i quattro settori a
retino (campitura grigia piena) e le scritte minute sul cruscotto
dell'aeroplano (non leggibili). Poi: misura.py, ribasa.py, tratto.py.
Si esegue dopo testo.py (intestazione e didascalia), che rifa' tutte le righe."""
import json, sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R

p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/4-8.json'))
ink = inchiostro(48)
G = lambda ruolo, b, *ws: [ruolo, b, [list(w) for w in ws]]
lista = [
    G('nota', 797, (357, 'USE', 37), (397, 'UP', 26), (427, 'AILERON', 82)),
    G('nota', 825, (357, 'ON', 25), (391, 'LH', 21), (418, 'WING', 47), (473, 'AND', 36)),
    G('nota', 848, (358, 'NEUTRAL', 87), (450, 'ELEVATOR', 97)),
    G('nota', 797, (655, 'USE', 35), (695, 'UP', 25), (725, 'AILERON', 80)),
    G('nota', 822, (656, 'ON', 22), (687, 'RH', 23), (716, 'WING', 47), (770, 'AND', 35)),
    G('nota', 844, (656, 'NEUTRAL', 86), (748, 'ELEVATOR', 96)),
    G('nota', 1089, (359, 'USE', 34), (398, 'DOWN', 54), (456, 'AILERON', 81)),
    G('nota', 1116, (358, 'ON', 23), (390, 'LH', 21), (419, 'WING', 47), (474, 'AND', 36)),
    G('nota', 1138, (359, 'DOWN', 53), (417, 'ELEVATOR', 98)),
    G('nota', 1089, (658, 'USE', 34), (697, 'DOWN', 53), (755, 'AILERON', 81)),
    G('nota', 1114, (657, 'ON', 24), (690, 'RH', 22), (718, 'WING', 47), (773, 'AND', 35)),
    G('nota', 1138, (658, 'DOWN', 53), (716, 'ELEVATOR', 97)),
    G('testo', 1480, (726, 'NOTE', 59)),
    G('testo', 1490, (340, 'CODE', 60)),
    G('testo', 1546, (275, 'WIND', 57), (339, 'DIRECTION', 119)),
    G('nota', 1527, (573, 'Strong', 54), (632, 'quartering', 88), (726, 'tail', 28), (760, 'winds', 47), (813, 'require', 62), (881, 'caution.', 65)),
    G('nota', 1552, (573, 'Avoid', 47), (626, 'sudden', 56), (688, 'bursts', 54), (747, 'of', 17), (769, 'the', 25), (800, 'throttle', 62), (869, 'and', 28), (903, 'sharp', 48)),
    G('nota', 1577, (573, 'braking', 63), (641, 'when', 42), (689, 'the', 24), (719, 'airplane', 69), (794, 'is', 16), (816, 'in', 17), (838, 'this', 32), (874, 'attitude.', 69)),
    G('nota', 1602, (573, 'Use', 31), (611, 'the', 25), (642, 'steerable', 78), (725, 'nose', 38), (769, 'wheel', 48), (822, 'and', 29), (857, 'rudder', 56), (919, 'to', 15)),
    G('nota', 1628, (574, 'maintain', 72), (652, 'direction.', 80)),
]
scritte = righe(ink, lista, {'nota': 15, 'testo': 18.5})
for e in scritte:
    e[4].setdefault('c', 17.0)     # la nota (minuscole): la base la rifa' ribasa.py
titolo = righe(ink, [G('titolo', 488, (435, 'TAXIING', 144), (598, 'DIAGRAM', 166))], {'titolo': 25})
cornice = [
    ["poli", [[250, 422.7], [960, 417.0], [960, 428.4], [250, 434.6]]],
    ["poli", [[250, 1643.0], [961, 1637.9], [961, 1647.5], [250, 1653.5]]],
    ["poli", [[249.4, 423], [252.9, 423], [254.1, 1654], [249.9, 1654]]],
    ["poli", [[956.5, 416], [960.0, 416], [961.0, 1647], [956.9, 1647]]],
]
testa = [e for e in p['el'] if e[0] == 'riga' and (e[2] < 400 or e[2] > 1660)]
p['el'] = testa + cornice + [["svgfile", "figure/fig-4-2.svg"]] + titolo + scritte
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Figura 4-2 (Taxiing diagram)", "metodo": "cornice: poligoni misurati; aeroplano, frecce e settori: tratto vettorializzato con potrace dalla scansione ingrandita, i settori a retino come campitura grigia piena (tratto.py --retino); scritte: testo vero (posizioni dall'OCR dell'ingrandimento, testo letto a vista, linea di base dall'inchiostro). Le scritte minute sul cruscotto dell'aeroplano restano disegno (costruisci/4-8.py)."}]
scrivi('4-8', p)
for e in titolo + scritte:
    print(e[2], e[4].get('c'), ' '.join(w[1] for w in e[3]))
