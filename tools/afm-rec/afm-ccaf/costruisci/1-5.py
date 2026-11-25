#!/usr/bin/env python3
"""Pagina 1-5, figura 1-2 (Instrument panel).

La fotografia del cruscotto resta una fotografia: la scansione pulita (bianco
riportato al bianco, i numeri di richiamo tolti perche' sono testo vero) e
ingrandita due volte (Lanczos), in figure/fig-1-2.webp; le linee di richiamo
sono nella foto. Numeri di richiamo, titolo, legenda: testo vero. Cornice e
riquadro del titolo: poligoni misurati. Poi: misura.py, ribasa.py."""
import json, sys
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R
import re

p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/1-5.json'))
ink = inchiostro(13)
# ------------------------------------------------ i numeri di richiamo (posizioni dalle componenti)
alto = [(357, '1', 4), (402, '2', 7), (442, '3', 8), (478, '4', 9), (524, '5', 7), (565, '6', 8),
        (766, '7', 7), (803, '8', 8), (838, '9', 6), (867, '10', 15), (899, '11', 13), (933, '12', 15)]
basso = [(310, '34', 16), (337, '33', 16), (365, '32', 15), (393, '31', 14), (417, '30', 16), (443, '29', 16),
         (470, '28', 16), (499, '27', 16), (530, '26', 16), (562, '25', 17), (738, '20', 16), (774, '19', 16),
         (805, '18', 16), (837, '17', 15), (869, '16', 15), (899, '15', 16), (932, '14', 15), (964, '13', 15)]
numeri = [(514, alto), (1075, basso), (1110, [(562, '24', 16), (740, '21', 14)]), (1145, [(562, '23', 16), (740, '22', 16)])]
num_el = []
for base, lista in numeri:
    for x, t, w in lista:
        num_el.append(['riga', 'richiamo', base, [[x, t, w]], {'c': 23, 'figura': True}])
# ------------------------------------------------ la legenda (letta a vista, colonne separate)
L = 'legenda'
col = lambda b, ws: [L, b, [[x, t, w] for x, t, w in ws]]
leg = [
    col(1235, [(332, '1.', 11), (350, 'Flight', 36), (390, 'Instrument', 67), (461, 'Group', 39)]),
    col(1235, [(555, '12.', 19), (579, 'Cylinder', 53), (636, 'Head', 31), (670, 'Temperature', 78)]),
    col(1235, [(780, '23.', 19), (805, 'Microphone', 74), (883, '(Opt.)', 36)]),
    col(1259, [(331, '2.', 11), (348, 'Suction', 48), (400, 'Gage', 30), (434, '(Opt.)', 36)]),
    col(1259, [(580, 'Gage', 30), (614, '(Opt.)', 36)]),
    col(1259, [(780, '24.', 19), (806, 'Elevator', 50), (859, 'Trim', 31), (893, 'Control', 47), (944, 'Wheel', 37)]),
    col(1283, [(330, '3.', 12), (349, 'Marker', 43), (396, 'Beacon', 44), (444, 'Indicator', 56)]),
    col(1283, [(555, '13.', 18), (580, 'Optional', 52), (637, 'Instrument', 67), (707, 'and', 23)]),
    col(1283, [(779, '25.', 19), (806, 'Electrical', 56), (865, 'Switches', 56)]),
    col(1305, [(350, 'Lights', 37), (390, 'and', 23), (416, 'Switches', 54), (474, '(Opt.)', 37)]),
    col(1305, [(580, 'Radio', 37), (619, 'Space', 36)]),
    col(1305, [(779, '26.', 20), (805, 'Circuit', 42), (851, 'Breakers', 52)]),
    col(1327, [(330, '4.', 12), (349, 'Manifold', 55), (408, 'Pressure/Fuel', 81), (494, 'Flow', 31)]),
    col(1327, [(555, '14.', 18), (580, 'Map', 26), (609, 'Compartment', 85)]),
    col(1327, [(779, '27.', 20), (805, 'Map', 26), (836, 'Light', 32), (872, 'Rheostat', 54)]),
    col(1349, [(349, 'Indicator', 56)]),
    col(1349, [(555, '15.', 18), (579, 'Cigar', 33), (616, 'Lighter', 43)]),
    col(1349, [(780, '28.', 18), (805, 'Parking', 46), (855, 'Brake', 35), (894, 'Handle', 43)]),
    col(1374, [(330, '5.', 12), (349, 'Tachometer', 74)]),
    col(1374, [(555, '16.', 18), (580, 'Cabin', 35), (619, 'Heat', 28), (651, 'Control', 46), (702, 'Knob', 34)]),
    col(1374, [(779, '29.', 20), (806, 'Ignition/Starter', 94), (903, 'Switch', 42)]),
    col(1396, [(331, '6.', 11), (350, 'Magnetic', 54), (413, 'Compass', 49)]),
    col(1396, [(555, '17.', 18), (579, 'Wing', 31), (614, 'Flap', 27), (644, 'Switch', 42)]),
    col(1396, [(779, '30.', 19), (805, 'Master', 41), (848, 'Switch', 43)]),
    col(1419, [(331, '7.', 12), (350, 'Rear', 28), (381, 'View', 33), (416, 'Mirror', 40)]),
    col(1419, [(555, '18.', 18), (580, 'Cabin', 35), (619, 'Air', 19), (642, 'Control', 47), (693, 'Knob', 34)]),
    col(1419, [(779, '31.', 19), (806, 'Instrument', 67), (876, 'and', 23), (903, 'Radio', 36), (943, 'Dial', 24)]),
    col(1441, [(330, '8.', 13), (350, 'Radio', 36), (389, 'Selector', 51), (442, 'Switches', 55), (500, '(Opt.)', 36)]),
    col(1441, [(555, '19.', 18), (580, 'Mixture', 48), (631, 'Control', 47), (683, 'Knob', 33)]),
    col(1441, [(806, 'Light', 32), (842, 'Rheostats', 60)]),
    col(1466, [(330, '9.', 12), (349, 'Radios', 42), (395, '(Opt.)', 36)]),
    col(1466, [(554, '20.', 19), (580, 'Alternate', 57), (640, 'Static', 36), (679, 'Source', 43), (724, 'Valve', 36)]),
    col(1466, [(779, '32.', 20), (805, 'Fuel', 27), (836, 'Shutoff', 48), (887, 'Valve', 35)]),
    col(1488, [(323, '10.', 19), (348, 'Ammeter', 59), (409, 'and', 23), (437, 'Fuel', 26), (466, 'Gages', 37)]),
    col(1488, [(580, 'Control', 46), (631, 'Knob', 33), (669, '(Opt.)', 36)]),
    col(1488, [(805, 'Control', 47), (856, 'Knob.', 37)]),
    col(1511, [(324, '11.', 18), (349, 'Oil', 18), (371, 'Pressure', 50), (424, 'and', 22), (450, 'Oil', 18)]),
    col(1511, [(554, '21.', 19), (581, 'Propeller', 54), (638, 'Control', 47), (690, 'Knob', 33)]),
    col(1511, [(780, '33.', 19), (805, 'Primer', 41)]),
    col(1536, [(348, 'Temperature', 79), (430, 'Gages', 37)]),
    col(1536, [(554, '22.', 19), (580, 'Throttle', 51)]),
    col(1536, [(779, '34.', 20), (805, 'Phone', 38), (846, 'Jack', 28)]),
]
leg_el = righe(ink, leg, {'legenda': 11})
for e in leg_el:
    e[4]['c'] = 11
# ------------------------------------------------ la fotografia
X0, Y0, X1, Y1 = 303, 446, 1005, 1160          # dentro la cornice, fra il titolo e la legenda
libro = open(f'{R}/data/afm/afm-ccaf/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="13"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"', libro)
g = np.array(Image.open(f'{R}/{m.group(1)}').convert('L')).astype(float)[Y0:Y1, X0:X1]
# via i numeri di richiamo (sono testo vero): il loro riquadro diventa bianco
for e in num_el:
    x, t, w = e[3][0]; b = e[2]
    g[max(0, b - 25 - Y0):b + 1 - Y0, max(0, x - 1 - X0):x + w + 1 - X0] = 255
# livelli: il bianco della carta (>= 232) torna bianco; il nero resta nero; in mezzo lineare
g = np.clip((g - 12) / (232 - 12) * 255, 0, 255)
foto = Image.fromarray(g.astype(np.uint8)).resize(((X1 - X0) * 2, (Y1 - Y0) * 2), Image.LANCZOS)
foto = foto.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=2))
foto.save(f'{R}/tools/afm-rec/afm-ccaf/figure/fig-1-2.webp', quality=82, method=6)
open(f'{R}/tools/afm-rec/afm-ccaf/figure/fig-1-2.svg', 'w').write(
    f'<g class="fig-1-2"><image x="{X0}" y="{Y0}" width="{X1 - X0}" height="{Y1 - Y0}" preserveAspectRatio="none" href="figure/fig-1-2.webp"/></g>\n')
# ------------------------------------------------ la pagina
testa = [e for e in p['el'] if e[0] == 'riga' and e[2] < 340]
for e in testa:
    for w in e[3]:
        if w[1] == 'Edition;': w[1] = 'Edition:'
        if w[1] == '2' and e[2] == 283: w[1] = '3'
cornice = [
    ["poli", [[298, 345.3], [1007, 340.9], [1007, 351.3], [298, 355.6]]],
    ["poli", [[298, 1569.7], [1010, 1570.2], [1010, 1581.8], [298, 1580.9]]],
    ["poli", [[298.0, 345], [301.7, 345], [300.8, 1581], [297.9, 1581]]],
    ["poli", [[1006.8, 341], [1009.0, 341], [1010.3, 1582], [1006.4, 1582]]],
    ["poli", [[367, 384.5], [946, 383.2], [946, 386.4], [367, 387.7]]],
    ["poli", [[366, 438.5], [945, 436.8], [945, 440.5], [366, 441.7]]],
    ["poli", [[367.0, 385], [368.9, 385], [369.2, 443], [365.8, 443]]],
    ["poli", [[943.0, 384], [945.6, 384], [944.8, 442], [943.0, 442]]],
]
titolo = [['riga', 'titolo', 427, [[461, 'INSTRUMENT'], [723, 'PANEL']], {'c': 32}]]
p['el'] = testa + cornice + [["svgfile", "figure/fig-1-2.svg"]] + titolo + num_el + leg_el + [['riga', 'testo', 1642, [[604, 'Figure'], [665, '1-2.']]]]
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Figura 1-2 (Instrument panel)", "metodo": "fotografia: la scansione pulita (bianco della carta riportato al bianco, numeri di richiamo tolti perche' sono testo vero) e ingrandita due volte (Lanczos, lieve maschera di contrasto), figure/fig-1-2.webp; le linee di richiamo restano nella foto. Numeri di richiamo, titolo e legenda: testo vero (numeri: posizioni dalle componenti dell'inchiostro; legenda letta a vista). Cornice e riquadro del titolo: poligoni misurati (filetto.py)."}]
scrivi('1-5', p)
print(len(num_el), 'numeri,', len(leg_el), 'righe di legenda;', foto.size)
