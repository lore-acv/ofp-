#!/usr/bin/env python3
"""Pagina 6-8 di I-CCAB, figura 6-1 (Fuel system schematic with optional
auxiliary fuel system): lo stesso disegno della 6-8 di I-CCAF. Le scritte
lette a vista per I-CCAF (lista di afm-ccaf/costruisci/6-8.py) si portano
sulla scansione di I-CCAB con la trasformazione misurata sulla cornice
(x e y separati: la scansione di I-CCAF e' compressa in orizzontale), poi
linea di base e corpo si riprendono dall'inchiostro di I-CCAB
(scritte.righe). Cornice e riquadro del codice: filetti misurati sulla
scansione di I-CCAB. Si esegue dopo testo.py (intestazione e didascalia);
poi misura.py e

    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccab 6-8 fig-6-1 274 576 1398 1990 \
        --retino=80,215,150,0.85,5,7,40 --senzaretino 690,830,800,950 --senzaretino 700,1830,830,1970
"""
import ast, json, sys
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import inchiostro, righe, scrivi, R

# la lista di I-CCAF, letta dal suo script (solo il letterale, niente esecuzione)
src = open(f'{R}/tools/afm-rec/afm-ccaf/costruisci/6-8.py', encoding='utf-8').read()
nodo = next(n for n in ast.parse(src).body if isinstance(n, ast.Assign) and getattr(n.targets[0], 'id', '') == 'lista')
seg = ast.get_source_segment(src, nodo.value)
lista_f = eval(seg, {'S': 'testo', 'T': 'titolo'})
# cornice interna: I-CCAF x 259.5-958, y 421.75-1627; I-CCAB x 270-1403, y 567.5-1998
KX = (1403 - 270) / (958 - 259.5); KY = (1998 - 567.5) / (1627 - 421.75)
X = lambda x: 270 + (x - 259.5) * KX
Y = lambda y: 567.5 + (y - 421.75) * KY
lista = []
for ruolo, yg, parole, *resto in lista_f:
    opz = dict(resto[0]) if resto else {}
    if 'c' in opz: opz['c'] = round(opz['c'] * KY, 1)
    lista.append([ruolo, round(Y(yg)), [[round(X(x)), t, round(w * KX)] for x, t, w in parole], opz])

p = json.load(open(f'{R}/tools/afm-rec/afm-ccab/pagine/6-8.json'))
testa = [e for e in p['el'] if e[0] == 'riga' and (e[2] < 560 or e[2] > 2020)]
ink = inchiostro(76, 'afm-ccab')
scritte = righe(ink, lista, {'testo': round(14 * KY, 1), 'titolo': round(15 * KY, 1)})
# come in I-CCAF: un solo corpo per le etichette, la nota nel riquadro piu' piccola
for e in scritte:
    if e[1] == 'testo':
        e[4]['c'] = round((9.5 if Y(715) < e[2] < Y(790) and e[3][0][0] < X(500) else 13.5) * KY, 1)
    elif e[4]['c'] < 16 * KY:
        e[4]['c'] = round((13 if e[3][0][1] != 'CODE' else 14) * KY, 1)
cornice = [
    ["poli", [[269, 561.5], [1407, 561.5], [1407, 573.5], [269, 573.5]]],
    ["poli", [[267, 1992.5], [1404, 1992.5], [1404, 2003.5], [267, 2003.5]]],
    ["linea", 270, 562, 270, 2000, 3.0],
    ["linea", 1402.5, 562, 1402.5, 2000, 3.0],
    # il riquadro del codice (il lato in alto, tratteggiato col titolo CODE, e' nel tratto)
    ["linea", 996, 1978, 1337, 1978, 7.0],
    ["linea", 998, 1719, 998, 1981, 2.5],
    ["linea", 1332.5, 1719, 1332.5, 1981, 2.5],
]
p['el'] = testa + cornice + [["svgfile", "figure/fig-6-1.svg"]] + scritte
p['stato'] = 'ricostruita'
p['figure'] = [{"figura": "Figura 6-1 (Fuel system schematic with optional auxiliary fuel system)", "metodo": "lo stesso disegno della 6-8 di I-CCAF: cornice e riquadro del codice, filetti misurati sulla scansione di I-CCAB; schema: tratto vettorializzato con potrace, con le campiture a retino come campitura grigia piena (tratto.py --retino); scritte: testo vero, quelle lette a vista per I-CCAF portate sulla scansione di I-CCAB, linea di base e corpo dall'inchiostro (afm-ccab/costruisci/6-8.py)."}]
scrivi('6-8', p, 'afm-ccab')
for e in scritte:
    print(e[2], e[1], e[4].get('c'), ' '.join(w[1] for w in e[3]))
