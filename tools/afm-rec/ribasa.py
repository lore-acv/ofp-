#!/usr/bin/env python3
"""LA LINEA DI BASE DI OGNI GRUPPO DI PAROLE, DALL'INCHIOSTRO

Una riga della bozza puo' mettere insieme parole che sulla pagina stanno su
linee di base diverse (le due meta' dell'intestazione, "Page: 1-3" a sinistra e
"Reims Aviation" a destra, incollate a mano a qualche pixel di distanza). Per
ogni gruppo di parole di una riga (un salto grande separa i gruppi) si misura
la linea di base sulla scansione: l'riga di pixel dove l'inchiostro cala di colpo
(il fondo delle lettere: la mediana dei fondi delle lettere, componenti
dell'inchiostro alte almeno 6 decimi del corpo). Se e' a 2 px o piu' da quella scritta, il gruppo diventa una
riga sua con la base giusta. Le righe fissa, girate, con apici o con basefissa (base misurata a
mano: le punte delle V, i gradi in apice ingannano il calcolo) non si toccano.

    /usr/bin/python3 tools/afm-rec/ribasa.py afm-ccaf 1-3 [--prova]
"""
import json, os, re, sys
import numpy as np
from PIL import Image
R = os.getcwd(); ID, N = sys.argv[1], sys.argv[2]; PROVA = '--prova' in sys.argv
f = f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'
p = json.load(open(f)); stile = json.load(open(f'{R}/tools/afm-rec/{ID}/stile.json'))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
# "colori" (la copertina): conta anche l'inchiostro colorato (l'avviso rosso), che li' e' stampa
ink = ((rgb @ [0.299, 0.587, 0.114]) < 140) & (((rgb.max(2) - rgb.min(2)) < 40) | bool(p.get('colori')))
if p.get('rot') == -90:
    ink = np.rot90(ink, 3)
normali = [e for e in p['el'] if e[0] == 'riga' and not (len(e) > 4 and (e[4].get('ang') or e[4].get('libro') or e[4].get('fissa') or e[4].get('sup') or e[4].get('basefissa')))]

def base_ink(x0, x1, base, c, e, maiuscole=False):
    y0, y1 = int(base - c * 1.35), int(base + c * (0.15 if maiuscole else 0.4))   # maiuscole: un filetto sotto non e' la riga
    for q in normali:                           # non dentro le righe vicine che si sovrappongono in x
        if q is e: continue
        a = min(w[0] for w in q[3]); z = max(w[0] + (w[2] if len(w) > 2 else 14) for w in q[3])
        if a < x1 and z > x0:
            if q[2] < base - 8: y0 = max(y0, int(q[2] + c * 0.35))
            if q[2] > base + 8: y1 = min(y1, int(q[2] - c * 1.1))
    # le lettere sono componenti dell'inchiostro: la linea di base e' la mediana dei fondi di
    # quelle alte almeno 6 decimi del corpo (via il "+", le virgole, i puntini; le discendenti
    # sono poche e la mediana non le sente). Il calo dell'inchiostro, nel "4", cade sulla barra.
    z = ink[y0:y1 + 1, int(x0):int(x1)]
    H, W = z.shape; lab = np.zeros((H, W), int); fondi = []; n = 0
    for yy in range(H):
        for xx in range(W):
            if z[yy, xx] and not lab[yy, xx]:
                n += 1; st = [(yy, xx)]; lab[yy, xx] = n; lo = hi = yy
                while st:
                    a_, b_ = st.pop(); lo = min(lo, a_); hi = max(hi, a_)
                    for da in (-1, 0, 1):
                        for db in (-1, 0, 1):
                            c_, d_ = a_ + da, b_ + db
                            if 0 <= c_ < H and 0 <= d_ < W and z[c_, d_] and not lab[c_, d_]:
                                lab[c_, d_] = n; st.append((c_, d_))
                if hi - lo + 1 >= c * 0.6 and hi - lo + 1 <= c * 1.6:
                    fondi.append(hi)
    if not fondi: return None
    return y0 + int(np.median(fondi)) + 1


nuove = []; cambi = 0
for e in p['el']:
    if not (e[0] == 'riga' and any(e is q for q in normali)):
        nuove.append(e); continue
    r = stile['ruoli'][e[1]]; c = (e[4].get('c') if len(e) > 4 else None) or r['c']
    gruppi = [[e[3][0]]]
    for a, b in zip(e[3], e[3][1:]):
        fa = a[0] + (a[2] if len(a) > 2 else 14 * len(a[1]))
        if b[0] - fa > c * 2.5: gruppi.append([])
        gruppi[-1].append(b)
    basi = []
    for g in gruppi:
        maiu = all(re.fullmatch(r'[A-Z0-9.:\-–&"]+', w[1]) for w in g)
        # due giri: la finestra e' centrata sulla base scritta; se era lontana, la seconda misura
        # (centrata sulla prima) non taglia piu' le lettere
        b = e[2]
        for _ in range(3):
            b2 = base_ink(g[0][0], g[-1][0] + (g[-1][2] if len(g[-1]) > 2 else 14), b, c, e, maiu)
            if b2 is None or b2 == b: break
            b = b2
        b = None if b == e[2] and b2 is None else b
        basi.append(b if b is not None and abs(b - e[2]) >= 2 else e[2])
    if len(set(basi)) == 1:
        if basi[0] != e[2]:
            print(f'  {N} riga {e[2]} -> {basi[0]}: {" ".join(w[1] for w in e[3])}'); cambi += 1
        nuove.append([e[0], e[1], basi[0], e[3]] + e[4:])
    else:
        for g, b in zip(gruppi, basi):
            print(f'  {N} riga {e[2]} gruppo -> {b}: {" ".join(w[1] for w in g)}'); cambi += 1
            o = [dict(e[4])] if len(e) > 4 else []
            if o and 'caselle' in o[0]:      # le caselle seguono le loro parole
                k0 = e[3].index(g[0]); o[0]['caselle'] = o[0]['caselle'][k0:k0 + len(g)]
            nuove.append([e[0], e[1], b, g] + o)
print(f'{N}: {cambi} cambi')
if not PROVA and cambi:
    p['el'] = nuove
    righe = ['    ' + json.dumps(q, ensure_ascii=False) for q in p['el']]
    open(f, 'w').write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join(righe) + '\n  ]\n}\n')
