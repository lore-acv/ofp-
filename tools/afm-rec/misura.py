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
# inchiostro: scuro e grigio (i segni a evidenziatore sono colorati e non si ricostruiscono)
rgb = np.array(Image.open(f'{RADICE}/{m.group(1)}').convert('RGB')).astype(int)
ink_libro = ((rgb @ [0.299, 0.587, 0.114]) < 140) & ((rgb.max(2) - rgb.min(2)) < 40)
ink_pag = np.rot90(ink_libro, 3) if p.get('rot') == -90 else ink_libro

punti = {}
for e in p['el']:
    if e[0] == 'punti':
        punti.setdefault(e[1], []).extend(e[2])

# le linee di base delle righe normali (non le girate, non le impilate a mano), per non
# misurare dentro la riga sopra o sotto
# (con la loro estensione orizzontale: conta solo la riga che sta sopra o sotto la parola)
# e quanto sale (in corpi: 1,1 le lettere alte, 1,42 gli apici)
basi = [(e[2], min(w[0] for w in e[3]), max(w[0] + (w[2] if len(w) > 2 else 14 * len(w[1])) for w in e[3]),
         1.42 if len(e) > 4 and e[4].get('sup') else 1.1)
        for e in p['el'] if e[0] == 'riga' and not (len(e) > 4 and (e[4].get('ang') or e[4].get('libro') or e[4].get('fissa')))]
vicine = lambda base, x0, x1, verso: [(b, k) for b, a, z, k in basi if a < x1 and z > x0 and (b > base + 8 if verso > 0 else b < base - 8)]
# si ripete fino a che niente si muove: dove due parole si toccano la fine di una
# dipende dall'inizio dell'altra, e viceversa
# le caselle lette da etichette.py per le scritte nelle figure: il limite resta quello di partenza
# (non la larghezza appena misurata, che a ogni giro potrebbe allargarsi su una linea vicina)
# (salvate nella riga, opzione "caselle", alla prima misura: restano quelle lette, a ogni esecuzione)
for e in p['el']:
    if e[0] == 'riga' and len(e) > 4 and e[4].get('figura') and 'caselle' not in e[4]:
        e[4]['caselle'] = [[w[0], w[2]] if len(w) > 2 else None for w in e[3]]
casella = {(id(e), i): c for e in p['el'] if e[0] == 'riga' and len(e) > 4 and e[4].get('figura') for i, c in enumerate(e[4]['caselle']) if c}
for giro in range(6):
    prima = json.dumps(p['el'])
    for e in p['el']:
        if e[0] != 'riga':
            continue
        opz = e[4] if len(e) > 4 else {}
        if opz.get('fissa'):
            continue                         # misurata a mano (righe sovrapposte, tolleranze impilate)
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
            unite = set((e[4].get('unite') if len(e) > 4 else None) or [])
            # una parola attaccata alla dopo (unite) finisce dove quella comincia; le altre 3 px prima
            fine = parole[i + 1][0] - (0 if i in unite else 3) if i + 1 < len(parole) else opz.get('fine', W)
            normale = not opz.get('ang') and not opz.get('libro')
            stima = min(fine, x + (w[2] if len(w) > 2 else c * 0.9 * len(w[1])))   # dove finisce, circa (per le righe vicine)
            if i in sup:
                yy0, yy1 = int(base - c * 1.6), int(base - c * 0.3)
                # l'apice sale verso la riga sopra: non oltre la sua linea di base (piu' virgole e code)
                sopra = vicine(base, x, stima, -1) if normale else []
                if sopra:
                    yy0 = max(yy0, int(max(b for b, k in sopra)) + 5)
            else:
                yy0, yy1 = y0, y1
                # una parola senza discendenti (maiuscole, cifre) non scende sotto la linea di base:
                # la finestra si ferma li' (un filetto subito sotto, come sotto PRINCIPAL, non e' la parola)
                if not re.search(r'[gjpqyQ,;()\[\]/_]', w[1]):
                    yy1 = min(yy1, int(base + 3))
                # tutta maiuscole e cifre: non sale oltre le maiuscole (un filetto subito sopra,
                # come sopra DIMENSIONS, non e' la parola)
                if re.fullmatch(r'[A-Z0-9.,:;\-–&]+', w[1]):
                    yy0 = max(yy0, int(base - c * 1.15))
                # non dentro le discendenti della riga sopra (le g di "gallons" sopra "litres")
                sopra = vicine(base, x, stima, -1) if normale else []
                if sopra:
                    yy0 = max(yy0, int(max(b for b, k in sopra) + c * 0.35))
                # non oltre la cima della riga sotto (i suoi apici salgono fino a 1,4 corpi)
                sotto = vicine(base, x, stima, 1) if normale else []
                if sotto:
                    yy1 = min(yy1, int(min(b - c * k for b, k in sotto)))
            if opz.get('figura') and (id(e), i) in casella:
                # scritte dentro una figura: l'inchiostro si cerca solo dentro la casella della parola
                # (letta da etichette.py), non nelle linee del disegno che la toccano
                fine = min(fine, casella[(id(e), i)][0] + casella[(id(e), i)][1] + 1)
            for px in punti.get(base, []):            # i puntini guida della stessa riga non sono la parola
                if px > x + 4:
                    fine = min(fine, px - 4)
            # una parola gia' misurata comincia esattamente in x: si cerca appena prima
            # (cosi' rimisurare non sposta niente); una nuova (dalla bozza) un poco piu' in la'
            a = max(0, x - (1 if i in sup or len(w) > 2 else 6))
            if opz.get('figura'):
                a = max(0, (casella[(id(e), i)][0] if (id(e), i) in casella else x) - 1)
            # non oltre la fine della parola prima: l'inchiostro di una lettera finale
            # vicina (la s di "Pilot's" a un passo da "Check", un grado in apice) non e' l'inizio di questa
            if i > 0 and len(parole[i - 1]) > 2:
                a = max(a, parole[i - 1][0] + parole[i - 1][2])
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
            if opz.get('figura') and (id(e), i) in casella:
                fine_ink = xs[-1]          # nella figura la casella delimita gia' la parola: tutto il suo inchiostro
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
    if json.dumps(p['el']) == prima:
        break

# riscrive il file con un elemento per riga, come prima
righe = ['    ' + json.dumps(e, ensure_ascii=False) for e in p['el']]
fuori = '{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join(righe) + '\n  ]\n}\n'
open(f, 'w').write(fuori)
print(f, 'misurate', sum(len(e[3]) for e in p['el'] if e[0] == 'riga'), 'parole')
