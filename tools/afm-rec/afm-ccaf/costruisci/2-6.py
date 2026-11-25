#!/usr/bin/env python3
"""Pagina 2-6, cartelli (1) e (2).

Il cartello (1) e' in un carattere senza grazie condensato: ruolo "cartello"
(titoli in neretto: "cartellot"). Scritte lette a vista sull'ingrandimento,
x e larghezza dall'OCR dell'ingrandimento (etichette.py, K=6), corrette dove
l'OCR attacca i puntini alla parola. Il bordo arrotondato, i filetti di
MAXIMUMS, le sottolineature, il filetto verticale e i puntini guida del
cartello sono disegno: tratto.py (potrace). Il cartello (2) e' nel carattere
del testo. Poi: misura.py, ribasa.py, tratto.py."""
import json, sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R

p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/2-6.json'))
ink = inchiostro(28)
K, T = 'cartello', 'cartellot'
G = lambda ruolo, b, *ws, **o: [ruolo, b, [list(w) for w in ws]] + ([o] if o else [])
lista = [
    G(K, 659, (279, 'This', 35), (318, 'airplane', 65), (389, 'must-be', 63), (456, 'operated', 72), (534, 'in', 14), (554, 'compliance', 92), (651, 'with', 36), (693, 'the', 26), (723, 'operating', 77), (806, 'limitations', 86)),
    G(K, 690, (279, 'as', 16), (300, 'stated', 47), (354, 'in', 14), (373, 'the', 27), (405, 'form', 40), (450, 'of', 17), (473, 'placards,', 70), (549, 'markings,', 77), (631, 'and', 30), (666, 'manuals.', 71)),
    ['MAXIMUMS'],
    G(K, 759, (589, 'Normal', 60), (654, 'Category', 73)), G(K, 759, (756, 'Utility', 52), (813, 'Category', 73)),
    G(K, 791, (278, 'MANEUVERING', 142), (425, 'SPEED', 59), (491, '(CAS)', 45)), G(K, 791, (558, '118', 29), (593, 'mph', 36), (635, '(104', 38), (678, 'knots)', 50)),
    G(K, 791, (742, '118', 28), (776, 'mph', 36), (819, '(104', 37), (861, 'knots)', 51)),
    G(K, 822, (278, 'GROSS', 60), (344, 'WEIGHT', 75)), G(K, 822, (592, '2550', 40), (639, 'lbs.', 25)), G(K, 822, (761, '2200', 40), (808, 'lbs.', 25)),
    G(K, 853, (278, 'FLIGHT', 70), (354, 'LOAD', 52), (413, 'FACTOR', 75)), G(K, 853, (507, 'Flaps', 42), (555, 'Up', 22), (589, '+3.8,', 40), (636, '-1.52', 44)),
    G(K, 853, (753, '+4.4,', 42), (801, '-1.76', 43)),
    G(K, 883, (481, 'Flaps', 41), (529, 'Down', 46), (588, '+3.0', 36)), G(K, 883, (754, '+3.0', 36)),
    G(K, 916, (276, 'CROSSWI', 78), (360, 'ND', 29), unite=[0]), G(K, 916, (736, '20', 19), (761, 'knots', 44), (811, 'at', 15), (832, '90', 20), (853, 'o', 9), sup=[4], unite=[3], supK=0.7, supY=0.42),
    G(K, 945, (277, 'Normal', 59), (342, 'Category', 73), (421, '-', 7), (434, 'No', 23), (462, 'acrobatic', 75), (543, 'maneuvers', 85), (633, 'including', 74), (713, 'spins', 40), (757, 'approved.', 79)),
    G(K, 976, (277, 'Utility', 53), (334, 'Category', 73), (421, '-', 7), (434, 'Baggage', 63), (503, 'compartment', 109), (616, 'and', 30), (652, 'rear', 31), (689, 'seat', 31), (725, 'must', 39), (770, 'not', 27), (802, 'be', 19), (826, 'occupied.', 77)),
    G(T, 1022, (279, 'NO', 23), (309, 'ACROBATIC', 93), (413, 'MANEUVERS', 106), (528, 'APPROVED', 90), (628, 'EXCEPT', 62), (700, 'THOSE', 49), (759, 'LISTED', 60), (828, 'BELOW', 59)),
    G(K, 1056, (296, 'Maneuver', 77)), G(K, 1056, (425, 'Recm.', 50), (483, 'Entry', 46), (535, 'Speed', 49)), G(K, 1056, (638, 'Maneuver', 78)), G(K, 1056, (743, 'Recm.', 49), (801, 'Entry', 46), (853, 'Speed', 49)),
    G(K, 1086, (275, 'Chandelles', 86)), G(K, 1086, (415, '125', 30), (451, 'mph', 35), (493, '(109', 37), (535, 'knots)', 50)), G(K, 1086, (627, 'Spins', 44)), G(K, 1086, (751, 'Slow', 41), (797, 'Deceleration', 102)),
    G(K, 1116, (276, 'Lazy', 37), (320, 'Eights', 49)), G(K, 1116, (415, '125', 30), (450, 'mph', 36), (492, '(109', 37), (535, 'knots)', 50)), G(K, 1116, (626, 'Stalls', 45), (677, '(except', 58)), G(K, 1116, (752, 'Slow', 38), (797, 'Deceleration', 102)),
    G(K, 1147, (274, 'Steep', 45), (323, 'Turns', 48)), G(K, 1147, (416, '118', 28), (450, 'mph', 36), (492, '(104', 38), (535, 'knots)', 50)), G(K, 1147, (648, 'whip', 40), (693, 'stalls)', 45)),
    G(K, 1178, (274, 'Altitude', 68), (347, 'loss', 30), (382, 'in', 14), (402, 'stall', 32), (440, 'recovery', 69), (514, '-', 7), (526, '-', 7), (540, '160', 31), (575, 'ft.', 18)),
    G(K, 1209, (274, 'Abrupt', 58), (338, 'use', 26), (368, 'of', 18), (391, 'the', 26), (422, 'controls', 67), (493, 'prohibited', 84), (583, 'above', 47), (637, '118', 29), (671, 'mph', 36)),
    G(K, 1240, (273, 'Spin', 37), (316, 'Recovery:', 80), (408, 'opposite', 70), (483, 'rudder', 53), (542, '-', 6), (553, 'forward', 64), (622, 'elevator', 65), (693, '-', 6), (705, 'neutralize', 79), (789, 'controls.', 71), (871, 'In-', 24)),
    G(K, 1269, (273, 'tentional', 72), (351, 'spins', 41), (396, 'with', 36), (437, 'flaps', 39), (481, 'extended', 74), (560, 'are', 25), (590, 'prohibited.', 89), (691, 'Flight', 47), (744, 'into', 32), (781, 'known', 56), (843, 'icing', 38)),
    G(K, 1300, (274, 'conditions', 84), (363, 'prohibited.', 89), (463, 'This', 35), (503, 'airplane', 65), (573, 'is', 12), (590, 'certified', 67), (662, 'for', 25), (692, 'the', 26), (723, 'following', 76), (804, 'flight', 44), (853, 'oper-', 43)),
    G(K, 1330, (273, 'ations', 49), (332, 'as', 17), (353, 'of', 17), (375, 'date', 36), (415, 'of', 18), (438, 'original', 60), (504, 'airworthiness', 108), (617, 'certificate:', 86)),
    G(K, 1367, (489, 'DAY–NIGHT–VFR–IFR', 213)),
    # cartello (2), nel carattere del testo
    G('testo', 1607, (413, 'Left', 34), (452, '23', 20), (478, 'gal.', 28)),
    G('testo', 1639, (412, 'Right', 44), (464, '23', 20), (490, 'gal.', 28)),
    G('testo', 1619, (642, 'Both', 40), (686, '46', 21), (712, 'gal.', 28)),
]
lista = [x for x in lista if x != ['MAXIMUMS']]
scritte = righe(ink, lista, {K: 19, T: 24, 'testo': 18.5})
# MAXIMUMS: fra i due filetti che toccano la M e la S; lettere misurate una per una sulla scansione
scritte.insert(2, ['riga', T, 729, [[536, 'MAXIMUMS', 108, [[0, 11], [16, 9], [29, 9], [43, 4], [52, 11], [69, 9], [83, 12], [99, 9]]]], {'c': 22, 'fissa': True}])
for e in scritte:
    if e[1] == K: e[4]['c'] = 19
    if e[1] == 'testo': e[4]['c'] = 18.5
testa = [e for e in p['el'] if e[0] == 'riga' and e[2] < 330 and e[2] != 315]
testa.append(['riga', 'testo', 315, [[239, 'Edition:'], [322, '3'], [765, 'Reims,'], [828, 'Marne'], [886, 'France']]])
for e in testa:
    for w in e[3]:
        if w[1] == '2-6' or True: pass
corpo = [e for e in p['el'] if e[0] == 'riga' and 330 < e[2] < 640] + [e for e in p['el'] if e[0] == 'riga' and 1480 < e[2] < 1500]
for e in corpo:
    for w in e[3]:
        if w[1] == 'placards,': w[1] = 'placards.'
p['el'] = testa + corpo + [["svgfile", "figure/cartelli-2-6.svg"]] + scritte
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Cartelli (1) e (2) di pagina 2-6", "metodo": "bordi, filetti, sottolineature e puntini guida dei cartelli: tratto vettorializzato con potrace (tratto.py); scritte: testo vero, carattere senza grazie condensato per il cartello (1) come nell'originale, lette a vista sull'ingrandimento (costruisci/2-6.py)."}]
scrivi('2-6', p)
for e in scritte:
    print(e[2], e[1], e[4].get('c'), ' '.join(w[1] for w in e[3]))
