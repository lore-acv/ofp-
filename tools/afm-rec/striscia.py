#!/usr/bin/env python3
"""LA STRISCIA DI EMERGENZA, RIDISEGNATA (sezione III)

Al posto delle barre misurate sulla scansione (strisce.py: nella stampa sono
larghe, irregolari, sul bordo esterno e quasi toccano il testo) si disegna una
striscia di barre sottili, con i numeri in stile.json ("striscia"): barre a
parallelogramma tutte uguali (lati verticali lunghi "lato", larghe
"larghezza", il lato destro piu' alto di "salita": una /, come nella stampa),
"barre" barre a passo "passo" centrate sul "centro" della pagina in verticale.
La striscia sta sempre a sinistra del testo, sulle pari e sulle dispari, col
bordo sinistro a "x" px dal bordo della pagina: la stessa distanza dal
margine su tutte le pagine.

Toglie le barre che c'erano (i "poli" fuori dalla colonna del testo, a destra
o a sinistra) e scrive le nuove; si puo' rifare.

    /usr/bin/python3 tools/afm-rec/striscia.py afm-ccaf 3-1 3-2 ...
"""
import json, os, sys
R = os.getcwd()
ID, PAGINE = sys.argv[1], sys.argv[2:]
S = json.load(open(f'{R}/tools/afm-rec/{ID}/stile.json'))['striscia']
X, L, h, s, P, N = S['x'], S['larghezza'], S['lato'], S['salita'], S['passo'], S['barre']
alto = S['centro'] - ((N - 1) * P + h + s) / 2          # la cima della prima barra
for n in PAGINE:
    f = f'{R}/tools/afm-rec/{ID}/pagine/{n}.json'
    p = json.load(open(f))
    c0, c1 = p['colonna']
    if X + L >= c0:
        sys.exit(f'{n}: la striscia ({X}-{X + L}) tocca la colonna del testo ({c0})')
    barre = []
    for k in range(N):
        y = alto + k * P
        q = [[X, y + s], [X + L, y], [X + L, y + h], [X, y + s + h]]
        barre.append(['poli', [[round(a, 1), round(b, 1)] for a, b in q]])
    fuori = lambda e: e[0] == 'poli' and (min(v[0] for v in e[1]) >= c1 - 12 or max(v[0] for v in e[1]) <= c0 + 12)
    el = [e for e in p['el'] if not fuori(e)] + barre
    for fg in p.get('figure', []):
        if fg['figura'].startswith('Striscia'):
            fg['metodo'] = ("ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, "
                            "a passo costante, sempre a sinistra del testo a %d px dal bordo della pagina; non ricalca la scansione "
                            "(la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro "
                            "solo dentro la colonna del testo." % X)
    t = open(f).read()
    testo = t[:t.index('  "figure"')] + '  "figure": ' + json.dumps(p['figure'], ensure_ascii=False) + ',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in el) + '\n  ]\n}\n'
    open(f, 'w').write(testo)
    print(n, len(barre), 'barre', 'x', X, X + L, 'distanza dal testo', c0 - X - L)
