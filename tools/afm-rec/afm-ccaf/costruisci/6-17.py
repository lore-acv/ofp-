#!/usr/bin/env python3
"""Pagina 6-17 (di traverso), figura 6-3 (Loading arrangements).

Coordinate della pagina girata diritta (1762 x 1250). Scritte: testo vero nel
ruolo figtitolo (senza grazie, come le etichette della figura 6-2) a corpo 15,
x e linea di base lette a vista sull'ingrandimento e agganciate all'inchiostro
da testo.py, poi misura.py e ribasa.py (griglia.pagina). Cornice e riquadro
del titolo: filetti misurati (filetti.py --girata); sedili, linee delle
stazioni e sottolineature: tratto vettorializzato con potrace (tratto.py).

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/6-17.py
    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccaf 6-17 fig-6-3 158 300 1446 942
"""
import sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from griglia import carica, intestazione, pagina

ink, il = carica(85)
F = 'figtitolo c=15 fissa'
righe = intestazione(il, '6-17') + [
    f'364 figtitolo 380-1225 c=16 fissa | LOADING ARRANGEMENTS',
    f'430 {F} 330-630 | STATION (C. G. ARM)',
    f'430 {F} 930-1235 | STATION (C. G. ARM)',
    f'471 {F} 250-360 | INCHES',
    f'471 {F} 570-765 | CENTIMETERS',
    f'471 {F} 855-965 | INCHES',
    f'471 {F} 1172-1370 | CENTIMETERS',
    f'516 {F} 392-552 | PILOT PASS.',
    f'516 {F} 992-1159 | PILOT PASS.',
    f'534 {F} 279-329 | *37',
    f'534 {F} 622-680 | *94',
    f'534 {F} 884-930 | *37',
    f'534 {F} 1229-1282 | *94',
    f'557 {F} 240-372 | (34 TO 46)',
    f'557 {F} 572-728 | (86 TO 117)',
    f'557 {F} 838-976 | (34 TO 41)',
    f'557 {F} 1180-1335 | (86 TO 104)',
    f'607 {F} 395-552 | REAR PASS.',
    f'607 {F} 997-1155 | REAR PASS.',
    f'622 {F} 292-329 | 73',
    f'622 {F} 631-680 | 185',
    f'622 {F} 896-930 | 73',
    f'622 {F} 1239-1290 | 185',
    f'663 {F} 1028-1120 | CHILD',
    f'680 {F} 1040-1112 sopra=15 | SEAT',
    f'688 {F} 266-329 | **95',
    f'688 {F} 604-680 | **241',
    f'696 {F} 893-930 | 96',
    f'696 {F} 1239-1290 | 244',
    f'710 {F} 425-515 | BAGG.',
    f'733 {F} 280-329 | 108',
    f'733 {F} 632-680 | 274',
    f'733 {F} 886-930 | 108',
    f'733 {F} 1239-1290 | 274',
    f'760 {F} 394-548 | STANDARD',
    f'782 {F} 408-530 | SEATING',
    f'760 {F} 1006-1148 | OPTIONAL',
    f'782 {F} 1018-1142 | SEATING',
    f'820 figtitolo 245-1360 c=14 | *Pilot or passenger center of gravity on adjustable seats positioned for average occupant. Numbers',
    f'842 figtitolo 258-1180 c=14 | in parentheses indicate forward and aft limits of occupant center of gravity range.',
    f'873 figtitolo 232-805 c=14 | **Arms measured to the center of the area shown.',
    f'910 figtitolo 170-1420 c=14 | NOTE: The aft baggage wall (approximate station 108) can be used as a convenient interior reference point',
    f'932 figtitolo 262-985 c=14 | for determining the location of baggage area fuselage stations.',
    '1000 730-870 | Figure 6-3.',
]
el = [
    ["linea", 149, 295.5, 1452, 295.5, 7.0],
    ["linea", 149, 945.75, 1452, 946.0, 6.5],
    ["linea", 153.5, 292, 152.0, 949, 4.0],
    ["linea", 1449.0, 292, 1451.0, 950, 3.5],
    ["linea", 368, 321.75, 1234, 322.25, 3.0],
    ["linea", 368, 386.0, 1234, 386.5, 3.5],
    ["linea", 370.5, 320, 370.5, 388, 5.0],
    ["linea", 1231.5, 320, 1231.5, 388, 5.0],
    ["svgfile", "figure/fig-6-3.svg"],
]
figure = [{"figura": "Figura 6-3 (Loading arrangements)", "metodo": "cornice e riquadro del titolo: filetti misurati (filetti.py --girata); sedili, linee delle stazioni e sottolineature: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte (tratto.py); scritte: testo vero, ruolo figtitolo (costruisci/6-17.py)."}]
pagina(85, '6-17', righe, el, figure)
