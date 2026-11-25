#!/usr/bin/env python3
"""LE SCRITTE DI UNA FIGURA, DALLA LISTA LETTA A VISTA ALLE RIGHE DELLA PAGINA

Modulo comune agli script delle figure (costruisci/1-6.py, ...): da una lista di
righe [ruolo, base stimata, [[x, testo, larghezza OCR], ...]] (testo corretto a
vista) ricava dall'inchiostro della scansione la linea di base vera e l'altezza
delle maiuscole di ogni riga (la fascia di righe con inchiostro sotto le parole
piu' vicina alla base stimata) e scrive gli elementi "riga" con l'opzione
figura (misura.py cerca l'inchiostro solo dentro la casella della parola).
"""
import json, os, re
import numpy as np
from PIL import Image

R = '/home/user/ofp-'

def inchiostro(pdf, ID='afm-ccaf'):
    libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
    m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % pdf, libro)
    rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
    return ((rgb @ [0.299, 0.587, 0.114]) < 140) & ((rgb.max(2) - rgb.min(2)) < 40)

def fascia(ink, x0, x1, yg, cg):
    """la fascia di righe con inchiostro, fra x0 e x1, il cui fondo e' piu' vicino a yg"""
    y0 = int(yg - cg * 1.6); y1 = int(yg + 6)
    prof = ink[y0:y1, int(x0):int(x1)].sum(1) > 0
    bande = []; s = None
    for i, v in enumerate(prof):
        if v and s is None: s = i
        if not v and s is not None: bande.append((s + y0, i - 1 + y0)); s = None
    if s is not None: bande.append((s + y0, len(prof) - 1 + y0))
    bande = [b for b in bande if b[1] - b[0] >= cg * 0.5]
    if not bande: return None
    return min(bande, key=lambda b: abs(b[1] + 1 - yg))

def righe(ink, lista, c_ruolo):
    out = []
    for ruolo, yg, parole, *resto in lista:
        opz = dict(resto[0]) if resto else {}
        cg = opz.get('c', c_ruolo[ruolo])
        basi, alt = [], []
        for x, t, w in parole:
            if re.search(r'[a-z,;()"“”]', t):    # minuscole e segni: non danno la linea di base pulita
                continue
            f = fascia(ink, x, x + w, yg, cg)
            if f: basi.append(f[1] + 1); alt.append(f[1] - f[0] + 1)
        base = int(np.median(basi)) if basi else yg
        if alt and 'c' not in opz:
            opz['c'] = float(np.median(alt))
        opz['figura'] = True
        out.append(['riga', ruolo, base, [[x, t, w] for x, t, w in parole], opz])
    return out

def scrivi(n, p):
    f = f'{R}/tools/afm-rec/afm-ccaf/pagine/{n}.json'
    p = {k: p[k] for k in ['pdf', 'n', 'w', 'h', 'rot', 'stato', 'figure', 'el']}
    r = ['    ' + json.dumps(e, ensure_ascii=False) for e in p['el']]
    open(f, 'w').write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join(r) + '\n  ]\n}\n')
