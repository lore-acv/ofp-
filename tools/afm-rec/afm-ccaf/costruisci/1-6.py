#!/usr/bin/env python3
"""Pagina 1-6, figura 1-3 (Fuel system schematic): scritte lette a vista
sull'ingrandimento (etichette.py come aiuto), cornice misurata, schema con
potrace (tratto.py --retino). Poi: misura.py, tratto.py."""
import json, sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R

p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/1-6.json'))
testa = [e for e in p['el'] if e[0] == 'riga' and e[2] < 340]
ink = inchiostro(14)
S, T = 'testo', 'titolo'
lista = [
    [T, 458, [[366, 'FUEL', 101], [480, 'SYSTEM', 156]], {'c': 34}],
    [T, 451, [[686, 'SCHEMATIC', 123]], {'c': 24}],
    [S, 512, [[322, 'LEFT', 39], [367, 'FUEL', 38], [409, 'TANK', 40]]],
    [S, 512, [[683, 'RIGHT', 44], [732, 'FUEL', 39], [775, 'TANK', 40]]],
    [S, 621, [[266, 'VENT', 44]]],
    [S, 586, [[531, 'SELECTOR', 76]]],
    [S, 606, [[542, 'VALVE', 49]]],
    # la nota nel riquadro
    [S, 684, [[268, 'TO', 15], [288, 'ENSURE', 36], [329, 'MAXIMUM', 44], [378, 'FUEL', 26], [408, 'CAPACITY', 50]]],
    [S, 698, [[267, 'WHEN', 30], [302, 'REFUELING,', 58], [365, 'PLACE', 34], [403, 'THE', 18], [426, 'FUEL', 26]]],
    [S, 712, [[268, 'SELECTOR', 50], [323, 'VALVE', 31], [359, 'IN', 11], [375, 'EITHER', 35], [414, '"LEFT"', 36]]],
    [S, 726, [[267, 'OR', 15], [285, '"RIGHT"', 41], [329, 'POSITION', 45], [376, 'TO', 14], [393, 'PREVENT', 47]]],
    [S, 740, [[269, 'CROSS-FEEDING.', 81]]],
    [S, 782, [[427, 'FUEL', 39], [470, 'RESERVOIR', 80]]],
    [S, 801, [[467, 'TANK', 40]]],
    [S, 836, [[423, 'FUEL', 39], [466, 'SHUTOFF', 66]]],
    [S, 856, [[432, 'VALVE', 50], [486, 'KNOB', 40]]],
    [S, 836, [[618, 'FUEL', 39]]],
    [S, 856, [[605, 'SHUTOFF', 66]]],
    [S, 875, [[612, 'VALVE', 49]]],
    [S, 901, [[667, 'CHECK', 49]]],
    [S, 922, [[666, 'VALVE', 50]]],
    [S, 950, [[321, 'TO', 22]]],
    [S, 971, [[306, 'ENGINE', 53]]],
    [S, 950, [[610, 'FUEL', 40]]],
    [S, 971, [[595, 'STRAINER', 71]]],
    [S, 997, [[358, 'ENGINE', 54], [420, 'PRIMER', 56]]],
    [S, 1054, [[262, 'AUXILIARY', 80]]],
    [S, 1074, [[260, 'FUEL', 40], [304, 'PUMP', 42]]],
    [S, 1094, [[274, 'SWITCH', 55]]],
    [S, 1054, [[618, 'AUXILIARY', 80]]],
    [S, 1074, [[614, 'FUEL', 40], [658, 'PUMP', 42]]],
    [T, 1034, [[374, 'HIGH', 32]]],
    [T, 1054, [[380, 'OFF', 27]]],
    [T, 1078, [[375, 'LOW', 31]]],
    [T, 1087, [[416, 'FUEL', 29]]],
    [T, 1104, [[415, 'PUMP', 34]]],
    [S, 1159, [[407, 'ENGINE-DRIVEN', 115]]],
    [S, 1178, [[422, 'FUEL', 40], [466, 'PUMP', 41]]],
    [S, 1198, [[448, 'AND', 31]]],
    [S, 1219, [[412, 'MIXTURE', 66], [482, 'UNIT', 35]]],
    [S, 1198, [[748, 'MIXTURE', 66]]],
    [S, 1216, [[745, 'CONTROL', 70]]],
    [S, 1235, [[760, 'KNOB', 40]]],
    [S, 1275, [[413, 'FUEL', 39], [456, 'AND', 30], [490, 'AIR', 25]]],
    [S, 1295, [[405, 'THROTTLE', 79], [488, 'UNIT', 35]]],
    [S, 1285, [[742, 'THROTTLE', 78]]],
    [S, 1367, [[396, 'FUEL', 39], [438, 'MANIFOLD', 77]]],
    [S, 1453, [[334, 'FUEL', 38]]],
    [S, 1473, [[316, 'INJECTION', 75]]],
    [S, 1493, [[323, 'NOZZLE', 58]]],
    [S, 1521, [[451, 'FUEL', 38], [495, 'FLOW', 40]]],
    [S, 1542, [[452, 'INDICATOR', 78]]],
    [S, 1563, [[448, '(Right', 39], [492, 'Half', 27], [523, 'of', 13], [539, 'Dual', 30], [573, 'Instrument)', 75]], {'c': 14}],
    [T, 1358, [[763, 'CODE', 39]]],
    [S, 1390, [[752, 'FUEL', 40], [795, 'SUPPLY', 57]]],
    [S, 1423, [[751, 'EXCESS', 54], [810, 'FUEL', 39], [852, 'AND', 30]]],
    [S, 1441, [[750, 'VAPOR', 50], [803, 'RETURN', 60]]],
    [S, 1466, [[748, 'VENT', 43]]],
    [S, 1493, [[750, 'MECHANICAL', 97]]],
    [S, 1516, [[766, 'LINKAGE', 63]]],
    [S, 1541, [[751, 'ELECTRICAL', 93]]],
    [S, 1563, [[751, 'CONNECTION', 93]]],
]
scritte = righe(ink, lista, {'testo': 14, 'titolo': 15})
# un solo carattere per le etichette: un solo corpo (la misura riga per riga oscilla di un pixel
# dove le lettere toccano le linee); la nota nel riquadro e' piu' piccola
for e in scritte:
    if e[1] == 'testo':
        e[4]['c'] = 9.5 if 676 < e[2] < 745 and e[3][0][0] < 470 else 13.5
    elif e[4]['c'] < 16:
        e[4]['c'] = 13 if e[3][0][1] != 'CODE' else 14
cornice = [
    ["poli", [[234, 380.2], [946, 375.1], [946, 386.8], [234, 391.6]]],
    ["poli", [[233, 1602.6], [944, 1597.3], [944, 1607.6], [233, 1612.6]]],
    ["poli", [[234.1, 380], [237.8, 380], [236.8, 1613], [232.9, 1613]]],
    ["poli", [[942.1, 374], [945.7, 374], [944.0, 1607], [940.0, 1607]]],
]
p['el'] = testa + cornice + [["svgfile", "figure/fig-1-3.svg"]] + scritte + [['riga', 'testo', 1670, [[542, 'Figure'], [603, '1-3.']]]]
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Figura 1-3 (Fuel system schematic)", "metodo": "cornice: poligoni misurati (tools/afm-rec/filetto.py); schema: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, tolte le scritte (tools/afm-rec/tratto.py); campiture a retino (fuel supply): campitura grigia piena vettorializzata dalla maschera del retino, al posto dei puntini; scritte: testo vero, lette a vista sull'ingrandimento, linea di base e altezza delle maiuscole dall'inchiostro (costruisci/1-6.py)."}]
scrivi('1-6', p)
for e in scritte:
    print(e[2], e[1], e[4].get('c'), ' '.join(w[1] for w in e[3]))
