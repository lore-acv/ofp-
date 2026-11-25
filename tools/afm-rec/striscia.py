#!/usr/bin/env python3
"""LA STRISCIA DI EMERGENZA, REGOLARE (sezione III)

Al posto delle barre misurate sulla scansione (strisce.py, che seguono la
stampa con le sue irregolarita': barre di larghezza e passo diversi, la
striscia a 2 px dal testo) si disegna una striscia regolare, con i numeri in
stile.json ("striscia"): barre a parallelogramma tutte uguali (lati verticali
lunghi "lato", larghe "larghezza", il lato esterno piu' alto di "salita"
come la "/" della stampa), "barre" barre a passo "passo" centrate sul "centro"
della pagina in verticale. In orizzontale la striscia sta a "distanza" px
dal testo piu' sporgente della sezione ("testo": il piu' a sinistra delle
pari, il piu' a destra delle dispari), uguale su tutte le pagine: sfogliando
non si sposta. Sulle pagine pari e' lo specchio di quella delle dispari.

Toglie le barre che c'erano (i "poli" fuori dalla colonna del testo) e scrive
le nuove; si puo' rifare.

    /usr/bin/python3 tools/afm-rec/striscia.py afm-ccaf 3-1 3-2 ...
"""
import json, os, sys
R = os.getcwd()
ID, PAGINE = sys.argv[1], sys.argv[2:]
S = json.load(open(f'{R}/tools/afm-rec/{ID}/stile.json'))['striscia']
L, h, s, P, N = S['larghezza'], S['lato'], S['salita'], S['passo'], S['barre']
alto = S['centro'] - ((N - 1) * P + h + s) / 2          # la cima della prima barra
for n in PAGINE:
    f = f'{R}/tools/afm-rec/{ID}/pagine/{n}.json'
    p = json.load(open(f))
    dispari = int(n.split('-')[1]) % 2 == 1
    c0, c1 = p['colonna']
    barre = []
    for k in range(N):
        y = alto + k * P
        if dispari:   # a destra: lato interno (sinistro) piu' basso di "salita", come una /
            xi = S['testo'][1] + S['distanza']; xe = xi + L
            q = [[xi, y + s], [xe, y], [xe, y + h], [xi, y + s + h]]
        else:         # a sinistra, lo specchio: il lato esterno (sinistro) e' il piu' alto, come una \
            xi = S['testo'][0] - S['distanza']; xe = xi - L
            q = [[xe, y], [xi, y + s], [xi, y + s + h], [xe, y + h]]
        barre.append(['poli', [[round(a, 1), round(b, 1)] for a, b in q]])
    fuori = lambda e: e[0] == 'poli' and (min(v[0] for v in e[1]) >= c1 - 12 or max(v[0] for v in e[1]) <= c0 + 12)
    el = [e for e in p['el'] if not fuori(e)] + barre
    for fg in p.get('figure', []):
        if fg['figura'].startswith('Striscia'):
            fg['metodo'] = ("ridisegnata regolare (striscia.py, scelta del 2026): barre uguali, parallele, a passo costante, "
                            "a %d px dal testo e speculari fra pari e dispari; non ricalca la scansione (la' le barre sono "
                            "irregolari e quasi toccano il testo), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo." % S['distanza'])
    t = open(f).read()
    testo = t[:t.index('  "figure"')] + '  "figure": ' + json.dumps(p['figure'], ensure_ascii=False) + ',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in el) + '\n  ]\n}\n'
    open(f, 'w').write(testo)
    print(n, 'dispari' if dispari else 'pari', len(barre), 'barre', 'x', barre[0][1][0][0], barre[0][1][1][0])
