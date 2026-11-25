#!/usr/bin/env python3
"""Pagina 1-10, figura 1-5 (Electrical system schematic).

Scritte: righe e posizioni dall'OCR dell'ingrandimento (etichette.py, K=6,
salvato in costruisci/1-10.etichette.json), testo corretto a vista (tabella
CORREGGI: ogni voce guardata sull'ingrandimento), le parole che l'OCR non
trova aggiunte a mano (AGGIUNTE). Restano disegno, vettorializzati con il
resto dello schema: le lettere dei morsetti di regolatore e alternatore
(I, F, S, A, G, B: 4-5 px), i numeri negli interruttori (amperaggi: 5-6 px,
non leggibili con certezza), L e R dei magneti e le scritte bianche sulle
barre nere (ALT BUS, ELECTRONIC BUS, PRIMARY BUS). Poi: misura.py, ribasa.py,
tratto.py."""
import json, sys, re
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R

p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/1-10.json'))
ink = inchiostro(18)

# le scritte, riga per riga e gruppo per gruppo (un'etichetta = un gruppo), lette a vista
# sull'ingrandimento; x e larghezza dall'OCR (etichette.py, salvato in 1-10.etichette.json) o,
# dove l'OCR non le trova, dall'ingrandimento
G = lambda b, *ws: ['legenda', b, [list(w) for w in ws]]
lista = [
    G(470, (378, 'REGULATOR', 49)), G(470, (590, 'TO', 11)), G(483, (575, 'PRIMARY', 37)), G(498, (588, 'BUS', 15)),
    G(498, (761, 'TO', 11), (774, 'MASTER', 33), (809, 'SWITCH', 30)),
    G(505, (290, 'OVER-', 26)), G(520, (289, 'VOLTAGE', 38)), G(535, (291, 'WARNING', 38)), G(550, (291, 'LIGHT', 25)),
    G(528, (761, 'TO', 11), (774, 'OVER-VOLTAGE', 62), (838, 'SENSOR', 31), (871, 'AND', 18)),
    G(541, (760, 'OVER-VOLTAGE', 62), (825, 'WARNING', 38), (865, 'LIGHT', 24)),
    G(535, (710, 'ALT', 16), (728, 'FIELD', 24)),
    G(538, (529, 'ALTERNATOR', 54)),
    G(573, (478, 'TO', 11), (491, 'ALT', 16), (510, 'FIELD', 23)), G(591, (470, 'CIRCUIT', 32), (505, 'BREAKER', 38)),
    G(573, (761, 'TO', 11), (775, 'FUEL', 21), (798, 'PUMP', 22), (821, 'SWITCH', 30)),
    G(577, (617, 'ALT', 15)),
    G(596, (720, 'FUEL', 21)), G(608, (720, 'PUMP', 21)),
    G(639, (557, 'CIGAR', 25), (585, 'LIGHTER', 35)), G(655, (556, '(WITH', 27), (585, 'CIRCUIT', 33)), G(668, (569, 'BREAKER)', 41)),
    G(643, (464, 'OVER-', 25)), G(655, (458, 'VOLTAGE', 38)), G(668, (464, 'SENSOR', 34)),
    G(655, (325, 'MASTER', 31)), G(668, (326, 'SWITCH', 31)),
    G(663, (761, 'TO', 11), (775, 'RADIO', 26), (803, '(OPT)', 21)),
    G(672, (518, 'TO', 11)), G(685, (501, 'ALT', 15), (521, 'FIELD', 24)), G(698, (506, 'CIRCUIT', 32)), G(711, (505, 'BREAKER', 38)),
    G(685, (714, 'RADIO', 26), (742, '1', 5)),
    G(709, (762, 'TO', 11), (775, 'RADIO', 27), (804, '(OPT)', 21)),
    G(728, (713, 'RADIO', 26), (740, '2', 6)),
    G(752, (562, 'AMMETER', 39)), G(752, (761, 'TO', 12), (775, 'RADIO', 26), (804, '(OPT)', 21)),
    G(771, (322, 'STARTER', 38)), G(785, (315, 'CONTACTOR', 49)),
    G(771, (408, 'REVERSE', 37), (446, 'POLARITY', 42)), G(783, (420, 'CONTACTOR', 49)),
    G(777, (713, 'RADIO', 26), (741, '3', 6)),
    G(776, (556, 'GROUND', 33), (593, 'SERVICE', 34)), G(789, (555, 'PLUG', 21), (580, 'RECEPTACLE', 51)), G(802, (581, '(OPT)', 21)),
    G(801, (760, 'TO', 12), (774, 'RADIO', 26), (802, '(OPT)', 22)),
    G(823, (714, 'RADIO', 26), (741, '4', 6)),
    G(847, (761, 'TO', 11), (774, 'AUDIO', 26), (803, 'AMPLIFIER', 42), (848, '(OPT)', 21)),
    G(872, (711, 'AUD', 16), (732, 'AMP', 17)),
    G(893, (761, 'TO', 11), (773, 'AUTOMATIC', 48), (823, 'PILOT', 24), (849, '(OPT)', 21)),
    G(915, (718, 'AUTO', 22)), G(927, (717, 'PILOT', 23)),
    G(943, (761, 'FROM', 23), (787, 'ALTERNATOR', 54), (843, 'BUS', 16)),
    G(970, (761, 'TO', 11), (774, 'LANDING', 37), (813, 'AND', 18), (833, 'TAXI', 19)),
    G(983, (761, 'LIGHTS', 29), (792, '(OPT)', 21)),
    G(978, (609, 'SPLIT', 21), (632, 'BUS', 16)), G(991, (603, 'CONTACTOR', 48)), G(1005, (587, '(NORMALLY', 47), (636, 'CLOSED)', 34)),
    G(991, (713, 'LAND', 22), (737, 'LT', 11)),
    G(1013, (761, 'TO', 11), (774, 'NAVIGATION', 51), (828, 'LIGHTS', 29), (858, 'AND', 18)),
    G(1025, (761, 'OPTIONAL', 40), (803, 'CONTROL', 39), (843, 'WHEEL', 28)),
    G(1038, (761, 'MAP', 17), (780, 'LIGHT', 24)),
    G(1047, (478, 'CLOCK', 29), (510, '(OPT)', 21)),
    G(1074, (296, 'STARTER', 38)),
    G(1074, (759, 'TO', 12), (773, 'TRANSMITTER', 56), (832, 'RELAY', 27), (861, '(OPT)', 21)),
    G(1077, (720, 'NAV', 17)), G(1089, (723, 'LT', 10)),
    G(1100, (760, 'TO', 11), (774, 'IGNITION-STARTER', 74), (849, 'SWITCH', 30)),
    G(1128, (322, 'BATTERY', 37)), G(1141, (316, 'CONTACTOR', 49)),
    G(1139, (761, 'TO', 11), (774, 'FLASHING', 40), (816, 'BEACON', 32), (851, '(OPT)', 21)),
    G(1150, (616, 'TO', 11)), G(1164, (595, 'NAVIGATION', 50)), G(1177, (591, 'LIGHT', 24), (617, 'CIRCUIT', 32)), G(1190, (601, 'BREAKER', 37)),
    G(1162, (714, 'BCN', 15), (733, 'LT', 10)),
    G(1185, (759, 'TO', 11), (773, 'DOOR', 23), (798, 'POST', 20), (820, 'MAP', 17), (839, 'LIGHT', 24), (866, '(OPT)', 21)),
    G(1221, (760, 'TO', 11), (774, 'DOME', 22), (799, 'AND', 16), (819, 'OPTIONAL', 40)),
    G(1233, (760, 'COURTESY', 43), (805, 'LIGHTS', 29)),
    G(1242, (713, 'INT', 14), (730, 'LT', 10)),
    G(1255, (761, 'TO', 11), (773, 'COMPASS', 37), (812, 'AND', 18), (832, 'INSTRUMENT', 51)),
    G(1268, (761, 'LIGHTS', 29)),
    G(1291, (577, 'IGNITION-', 38)), G(1305, (565, 'STARTER', 37), (604, 'SWITCH', 29)),
    G(1315, (759, 'TO', 12), (773, 'FUEL', 21), (796, 'QUANTITY', 42), (841, 'INDICATORS', 48)),
    G(1342, (760, 'TO', 11), (773, 'WING', 21), (797, 'FLAP', 21), (819, 'POSITION', 37)),
    G(1354, (761, 'INDICATOR', 43)), G(1349, (721, 'INST', 17)),
    G(1354, (337, 'BATTERY', 37)),
    G(1403, (760, 'TO', 11), (773, 'WING', 22), (797, 'FLAP', 21), (819, 'SYSTEM', 31)),
    G(1425, (720, 'FLAP', 21)),
    G(1430, (533, 'MAGNETOS', 44)),
    G(1453, (761, 'TO', 11), (774, 'STROBE', 31), (808, 'LIGHTS', 29), (839, '(OPT)', 21)),
    G(1474, (709, 'STROBE', 31), (743, 'LT', 10)),
    G(1488, (368, 'CODE', 35)),
    G(1501, (761, 'TO', 11), (774, 'PITOT', 23), (800, 'HEAT', 22), (823, 'SYSTEM', 32), (857, '(OPT)', 21)),
    G(1522, (711, 'PITOT', 23), (737, 'HT', 11)),
    G(1517, (310, 'CIRCUIT', 33), (346, 'BREAKER', 37), (386, '(PUSH-TO-RESET)', 66)),
    G(1541, (310, 'FUSE', 22)), G(1541, (372, 'DIODE', 26)), G(1541, (440, 'RESISTOR', 38)),
    G(1564, (313, 'CAPACITOR', 45), (364, '(NOISE', 26), (392, 'FILTER)', 32)),
    G(1550, (761, 'TO', 11), (775, 'TURN', 22), (798, 'COORDINATOR', 59), (860, 'OR', 12)),
    G(1564, (760, 'OPTIONAL', 41), (804, 'TURN', 22), (828, 'AND', 18), (848, 'BANK', 23)),
    G(1574, (761, 'INDICATOR', 44)), G(1574, (720, 'TURN', 22)), G(1586, (717, 'COORD', 29)),
]
scritte = righe(ink, lista, {'legenda': 8})
titoli = [['riga', 'titolo', 443, [[406, 'ELECTRICAL', 162], [579, 'SYSTEM', 103]], {'c': 22}],
          ['riga', 'titolo', 440, [[702, 'SCHEMATIC', 98]], {'c': 16}]]
for e in scritte:
    e[4]['c'] = 8
    e[4]['sx'] = 0.82          # il carattere dello schema e' piu' stretto del legenda della 1-5 (spaziatura media -0,11 em a 1,0)
    if e[3][0][1] == 'CODE': e[4]['c'] = 10
cornice = [
    ["poli", [[234, 384.5], [945, 378.6], [945, 390.5], [234, 395.6]]],
    ["poli", [[234, 1606.4], [945, 1602.5], [945, 1613.0], [234, 1614.4]]],
    ["poli", [[234.1, 384], [238.0, 384], [237.7, 1614], [233.8, 1614]]],
    ["poli", [[941.0, 380], [944.8, 380], [944.2, 1613], [940.8, 1613]]],
]
testa = [e for e in p['el'] if e[0] == 'riga' and e[2] < 340]
coda = [e for e in p['el'] if e[0] == 'riga' and e[2] > 1630]
p['el'] = testa + cornice + [["svgfile", "figure/fig-1-5.svg"]] + titoli + scritte + coda
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Figura 1-5 (Electrical system schematic)", "metodo": "cornice: poligoni misurati; schema: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, tolte le scritte (tratto.py); scritte: testo vero (righe e posizioni dall'OCR dell'ingrandimento, testo corretto a vista, linea di base dall'inchiostro). Restano disegno vettorializzato, perche' troppo piccoli per leggerli con certezza o non testo tipografico: le lettere dei morsetti di regolatore e alternatore, i numeri negli interruttori (amperaggi), L e R dei magneti, le scritte bianche sulle barre nere dei bus (costruisci/1-10.py)."}]
scrivi('1-10', p)
for e in scritte:
    print(e[2], ' '.join(w[1] for w in e[3]))
