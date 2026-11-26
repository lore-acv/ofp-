#!/usr/bin/env python3
"""Pagina 6-8, figura 6-1 (Fuel system schematic with optional auxiliary fuel
system): come la 1-6 (figura 1-3). Scritte lette a vista sull'ingrandimento
(etichette.py come aiuto per le posizioni), linea di base e corpo
dall'inchiostro (scritte.py); cornice e riquadro del codice: filetti misurati
(filetti.py); schema: tratto.py --retino. Poi: misura.py, e

    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccaf 6-8 fig-6-1 262 428 956 1622 \
        --retino=80,215,150,0.85,5,5 --senzaretino 540,645,622,740 --senzaretino 548,1455,655,1565

(i tubi a retino sono stretti: finestra del retino di 5 px; i quadranti della
valvola selettrice e del flussometro, fitti, non sono retino).

La nota nel riquadro in alto a sinistra e' quella della figura 1-3; sulla
scansione, piccolissima e impastata, "EITHER", "LEFT" e "RIGHT" sembrano
"BITHER", "LEPT" e "HIGHT": e' la stampa che non risolve le lettere, non un
refuso (vedi NOTE.md)."""
import json, sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R

p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/6-8.json'))
testa = [e for e in p['el'] if e[0] == 'riga' and e[2] < 380]
ink = inchiostro(76)
S, T = 'testo', 'titolo'
lista = [
    [T, 477, [[391, 'FUEL', 101], [504, 'SYSTEM', 155]], {'c': 34}],
    [T, 473, [[706, 'SCHEMATIC', 124]], {'c': 24}],
    [T, 518, [[412, 'WITH', 46], [469, 'OPTIONAL', 97], [575, 'AUXILIARY', 100], [686, 'FUEL', 40], [736, 'SYSTEM', 69]]],
    [S, 558, [[348, 'LEFT', 38], [392, 'FUEL', 38], [434, 'TANK', 39]]],
    [S, 558, [[705, 'RIGHT', 43], [754, 'FUEL', 38], [795, 'TANK', 40]]],
    [S, 631, [[555, 'SELECTOR', 74]]],
    [S, 652, [[567, 'VALVE', 47]]],
    [S, 666, [[295, 'VENT', 39]]],
    # la nota nel riquadro
    [S, 728, [[295, 'TO', 14], [312, 'ENSURE', 37], [352, 'MAXIMUM', 49], [404, 'FUEL', 27], [434, 'CAPACITY', 49]]],
    [S, 742, [[294, 'WHEN', 30], [327, 'REFUELING,', 56], [391, 'PLACE', 33], [426, 'THE', 21], [450, 'FUEL', 26]]],
    [S, 756, [[295, 'SELECTOR', 52], [349, 'VALVE', 34], [385, 'IN', 12], [399, 'EITHER', 36], [438, '"LEFT"', 37]]],
    [S, 770, [[294, 'OR', 15], [312, '"RIGHT"', 40], [356, 'POSITION', 45], [403, 'TO', 13], [421, 'PREVENT', 45]]],
    [S, 784, [[294, 'CROSS-FEEDING.', 84]]],
    [S, 746, [[749, 'CHECK', 49]]],
    [S, 769, [[749, 'VALVE', 48]]],
    [S, 792, [[844, 'TRANSFER', 74]]],
    [S, 814, [[860, 'PUMP', 41]]],
    [S, 833, [[852, 'SWITCH', 54]]],
    [S, 827, [[453, 'FUEL', 38], [494, 'RESERVOIR', 80]]],
    [S, 845, [[492, 'TANK', 40]]],
    [S, 880, [[449, 'FUEL', 39], [492, 'SHUTOFF', 64]]],
    [S, 900, [[458, 'VALVE', 48], [511, 'KNOB', 39]]],
    [S, 880, [[642, 'FUEL', 38]]],
    [S, 900, [[629, 'SHUTOFF', 65]]],
    [S, 920, [[636, 'VALVE', 48]]],
    [S, 909, [[859, 'TRANSFER', 76]]],
    [S, 930, [[877, 'PUMP', 41]]],
    [S, 945, [[690, 'CHECK', 49]]],
    [S, 965, [[689, 'VALVE', 49]]],
    [S, 992, [[349, 'TO', 21]]],
    [S, 1013, [[332, 'ENGINE', 55]]],
    [S, 992, [[634, 'FUEL', 39]]],
    [S, 1013, [[619, 'STRAINER', 70]]],
    [S, 1039, [[385, 'ENGINE', 53], [446, 'PRIMER', 56]]],
    [S, 1095, [[290, 'AUXILIARY', 79]]],
    [S, 1115, [[289, 'FUEL', 39], [332, 'PUMP', 41]]],
    [S, 1135, [[302, 'SWITCH', 54]]],
    [S, 1095, [[643, 'AUXILIARY', 78]]],
    [S, 1115, [[640, 'FUEL', 38], [681, 'PUMP', 42]]],
    [T, 1076, [[400, 'HIGH', 33]]],
    [T, 1095, [[407, 'OFF', 26]]],
    [T, 1120, [[401, 'LOW', 32]]],
    [T, 1128, [[442, 'FUEL', 30]]],
    [T, 1145, [[442, 'PUMP', 34]]],
    [S, 1152, [[781, 'AUXILIARY', 78]]],
    [S, 1174, [[780, 'FUEL', 38], [822, 'TANK', 40]]],
    [S, 1200, [[434, 'ENGINE-DRIVEN', 114]]],
    [S, 1220, [[450, 'FUEL', 38], [492, 'PUMP', 42]]],
    [S, 1239, [[475, 'AND', 29]]],
    [S, 1260, [[439, 'MIXTURE', 65], [509, 'UNIT', 33]]],
    [S, 1239, [[771, 'MIXTURE', 65]]],
    [S, 1260, [[769, 'CONTROL', 68]]],
    [S, 1276, [[784, 'KNOB', 38]]],
    [S, 1316, [[441, 'FUEL', 38], [484, 'AND', 26], [514, 'AIR', 27]]],
    [S, 1336, [[433, 'THROTTLE', 77], [514, 'UNIT', 34]]],
    [S, 1328, [[765, 'THROTTLE', 76]]],
    [S, 1402, [[425, 'FUEL', 38], [468, 'MANIFOLD', 77]]],
    [T, 1399, [[786, 'CODE', 39]]],
    [S, 1435, [[776, 'FUEL', 38], [819, 'SUPPLY', 56]]],
    [S, 1460, [[775, 'EXCESS', 53], [833, 'FUEL', 38], [874, 'AND', 30]]],
    [S, 1477, [[775, 'VAPOR', 50], [829, 'RETURN', 60]]],
    [S, 1505, [[775, 'VENT', 39]]],
    [S, 1531, [[775, 'MECHANICAL', 94]]],
    [S, 1552, [[790, 'LINKAGE', 61]]],
    [S, 1579, [[776, 'ELECTRICAL', 91]]],
    [S, 1598, [[775, 'CONNECTION', 93]]],
    [S, 1491, [[362, 'FUEL', 39]]],
    [S, 1511, [[344, 'INJECTION', 76]]],
    [S, 1531, [[352, 'NOZZLE', 58]]],
    [S, 1558, [[478, 'FUEL', 38], [522, 'FLOW', 39]]],
    [S, 1579, [[479, 'INDICATOR', 77]]],
    [S, 1598, [[476, '(Right', 39], [520, 'Half', 27], [551, 'of', 13], [567, 'Dual', 30], [601, 'Instrument)', 75]], {'c': 14}],
]
scritte = righe(ink, lista, {'testo': 14, 'titolo': 15})
# come nella 1-6: un solo corpo per le etichette, la nota nel riquadro piu' piccola
for e in scritte:
    if e[1] == 'testo':
        e[4]['c'] = 9.5 if 715 < e[2] < 790 and e[3][0][0] < 500 else 13.5
    elif e[4]['c'] < 16:
        e[4]['c'] = 13 if e[3][0][1] != 'CODE' else 14
# SELECTOR: la fascia piu' vicina alla base stimata e' quella del quadrante della valvola sotto; la base vera
# (fondo delle lettere, ingrandimento) e' 631
for e in scritte:
    if e[3][0][1] == 'SELECTOR' and 600 < e[2] < 650: e[2] = 631
cornice = [
    ["linea", 255, 421.75, 961, 421.75, 10.5],
    # il filetto in basso e' piu' spesso a sinistra (stampa storta): un poligono misurato ai due capi
    ["poli", [[255, 1623.5], [961, 1623.0], [961, 1630.5], [255, 1634.0]]],
    ["linea", 259.5, 417, 259.5, 1629, 3.0],
    ["linea", 958.0, 417, 958.5, 1629, 3.0],
    # il riquadro del codice (il lato in alto e' tratteggiato col titolo CODE: e' nel tratto)
    ["linea", 709, 1612.25, 920, 1612.0, 6.5],
    ["linea", 710.5, 1391, 710.5, 1615, 3.0],
    ["linea", 917.0, 1390, 917.5, 1615, 2.0],
]
p['el'] = testa + cornice + [["svgfile", "figure/fig-6-1.svg"]] + scritte + [['riga', 'testo', 1692, [[553, 'Figure'], [614, '6-1.']]]]
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Figura 6-1 (Fuel system schematic with optional auxiliary fuel system)", "metodo": "cornice e riquadro del codice: filetti misurati (tools/afm-rec/filetti.py); schema: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, tolte le scritte, con le campiture a retino come campitura grigia piena (tools/afm-rec/tratto.py --retino); scritte: testo vero, lette a vista sull'ingrandimento, linea di base e altezza delle maiuscole dall'inchiostro (costruisci/6-8.py)."}]
scrivi('6-8', p)
for e in scritte:
    print(e[2], e[1], e[4].get('c'), ' '.join(w[1] for w in e[3]))
