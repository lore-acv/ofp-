#!/usr/bin/env python3
"""MISURA DELLE PAROLE SULL'ORIGINALE

Per ogni parola di una pagina ricostruita (tools/afm-rec/<id>/pagine/<n>.json)
misura sulla scansione dove comincia e dove finisce il suo inchiostro, sulla
sua riga, e lo scrive nella parola: [x, "testo", larghezza]. rec.mjs disegna
poi ogni parola esattamente larga cosi' (SVG textLength, regolando solo la
spaziatura fra le lettere): le righe coincidono con l'originale anche dove il
font libero ha lettere un poco piu' larghe o piu' strette.

Una parola finisce dove comincia la successiva o, per l'ultima, dove
l'inchiostro si interrompe per piu' di mezzo corpo. I puntini guida non sono
parole: si escludono.

    /usr/bin/python3 tools/afm-rec/misura.py afm-ccaf 2-1
"""
import json, os, re, sys
import numpy as np
from PIL import Image

RADICE = os.getcwd()
ID, N = sys.argv[1], sys.argv[2]
f = f'{RADICE}/tools/afm-rec/{ID}/pagine/{N}.json'
testo = open(f).read()
p = json.loads(testo)
stile = json.load(open(f'{RADICE}/tools/afm-rec/{ID}/stile.json'))
libro = open(f'{RADICE}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
img_libro = Image.open(f'{RADICE}/{m.group(1)}').convert('L')
img = img_libro.rotate(-90, expand=True) if p.get('rot') == -90 else img_libro
ink_pag = np.array(img) < 140
ink_libro = np.array(img_libro) < 140

punti = {}
for e in p['el']:
    if e[0] == 'punti':
        punti.setdefault(e[1], []).extend(e[2])

for e in p['el']:
    if e[0] != 'riga':
        continue
    opz = e[4] if len(e) > 4 else {}
    # la riga si misura sull'immagine nel suo riferimento: la pagina (diritta per le
    # pagine girate) o il libro; le righe verticali (ang -90, salgono) si girano
    # cosi' da leggersi in orizzontale: la y diventa la x
    ink = ink_libro if opz.get('libro') else ink_pag
    if opz.get('ang') == -90:
        Hh = ink.shape[0]
        ink = np.rot90(ink, 3)          # ora la riga corre verso destra; la vecchia y diventa Hh-1-x'
        e_orig = e
        e = ['riga', e[1], None, [[Hh - 1 - w[0]] + w[1:] for w in e[3]], dict(opz)]
        Xb = e_orig[2]
        e[2] = Xb + 0                    # base: la colonna della linea di base, ora una riga
    H, W = ink.shape
    r = stile['ruoli'][e[1]]
    c = (e[4].get('c') if len(e) > 4 else None) or r['c']
    base = e[2]
    y0, y1 = int(base - c * 1.35), int(base + c * 0.4)
    sup = set((e[4].get('sup') if len(e) > 4 else None) or [])
    parole = e[3]
    for i, w in enumerate(parole):
        x = w[0]
        if i in sup:
            yy0, yy1 = int(base - c * 1.6), int(base - c * 0.3)
        else:
            yy0, yy1 = y0, y1
        unite = set((e[4].get('unite') if len(e) > 4 else None) or [])
        fine = parole[i + 1][0] - (1 if i in unite else 3) if i + 1 < len(parole) else W
        for px in punti.get(base, []):            # i puntini guida della stessa riga non sono la parola
            if px > x + 4:
                fine = min(fine, px - 4)
        a = max(0, x - (1 if i in sup else 6))
        col = ink[yy0:yy1, a:max(a + 1, int(fine))].any(0)
        xs = np.flatnonzero(col)
        if not len(xs):
            continue
        # l'ultima parola finisce dove l'inchiostro si ferma per piu' di mezzo corpo
        gap = int(c * 0.55)
        fine_ink = xs[0]
        for k in range(1, len(xs)):
            if xs[k] - xs[k - 1] > gap:
                break
            fine_ink = xs[k]
        sinistra, destra = a + int(xs[0]), a + int(fine_ink) + 1
        w[:] = [sinistra, w[1], destra - sinistra]
        # i titoli spaziati a mano: dove comincia ogni lettera, se le lettere sono staccate
        if r.get('lettere') and i not in sup:
            col2 = ink[yy0:yy1, sinistra:destra].any(0)
            seg = []; dentro = False
            for k2, v in enumerate(col2):
                if v and not dentro: seg.append([k2, 1]); dentro = True
                elif v: seg[-1][1] += 1
                else: dentro = False
            car = [ch for ch in w[1]]
            if len(seg) == len(car):
                w.append(seg)
    if opz.get('ang') == -90:
        # di nuovo nel riferimento della pagina: la parola comincia in basso (y grande)
        for w0, w1 in zip(e_orig[3], e[3]):
            w0[:] = [Hh - 1 - w1[0]] + w1[1:]

# riscrive il file con un elemento per riga, come prima
righe = ['    ' + json.dumps(e, ensure_ascii=False) for e in p['el']]
fuori = '{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join(righe) + '\n  ]\n}\n'
open(f, 'w').write(fuori)
print(f, 'misurate', sum(len(e[3]) for e in p['el'] if e[0] == 'riga'), 'parole')
