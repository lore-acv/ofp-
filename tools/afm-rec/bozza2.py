#!/usr/bin/env python3
"""BOZZA DI UNA PAGINA, RIGA PER RIGA

Come bozza.py, ma piu' robusta dove la pagina ha grafica ai bordi (le strisce
delle procedure di emergenza): si guarda solo la colonna del testo [x0, x1];
le righe si trovano dall'inchiostro (bande di righe di pixel), ognuna si fa
leggere a Tesseract da sola (una riga, psm 7, ingrandita 3 volte) con le
caselle delle parole; la linea di base e' la mediana dei fondi delle lettere.
Scrive pagine/<n>.json (stato "bozza", tutte le righe col ruolo testo): titoli,
correzioni e grafica si fanno poi a mano.

    /usr/bin/python3 tools/afm-rec/bozza2.py afm-ccaf <pdf> <n> <x0> <x1> [y0 y1]
"""
import csv, io, json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image
R = os.getcwd()
ID, PDF, N, X0, X1 = sys.argv[1], int(sys.argv[2]), sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
Y0, Y1 = (int(sys.argv[6]), int(sys.argv[7])) if len(sys.argv) > 7 else (60, 1720)
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
g = rgb @ [0.299, 0.587, 0.114]; g[(rgb.max(2) - rgb.min(2)) >= 40] = 255
ink = g < 140
z = ink[Y0:Y1, X0:X1]
prof = z.sum(1)
# le bande: righe di pixel con inchiostro (piu' di 2 px), buchi di 2 righe ammessi
bande = []; s = None; vuoto = 0
for i, v in enumerate(list(prof) + [0, 0, 0]):
    if v > 2:
        if s is None: s = i
        e = i; vuoto = 0
    elif s is not None:
        vuoto += 1
        if vuoto > 2:
            if e - s >= 6: bande.append((s + Y0, e + Y0))
            s = None
righe = []
for a, b in bande:
    if b - a > 60:      # due righe attaccate: si taglia nel minimo dell'inchiostro
        mezzo = a + 20 + int(np.argmin(prof[a - Y0 + 20:b - Y0 - 20]))
        parti = [(a, mezzo), (mezzo + 1, b)]
    else:
        parti = [(a, b)]
    for a2, b2 in parti:
        cols = np.flatnonzero(ink[a2:b2 + 1, X0:X1].any(0))
        if not len(cols): continue
        c0, c1 = X0 + cols[0] - 6, X0 + cols[-1] + 7
        K = 3
        crop = Image.fromarray(np.clip(g[a2 - 6:b2 + 7, c0:c1], 0, 255).astype(np.uint8)).resize(((c1 - c0) * K, (b2 - a2 + 13) * K), Image.LANCZOS)
        with tempfile.TemporaryDirectory() as t:
            f = os.path.join(t, 'r.png'); crop.save(f)
            tsv = subprocess.run(['tesseract', f, '-', '--psm', '7', 'tsv'], capture_output=True, text=True).stdout
        parole = []
        for r in csv.DictReader(io.StringIO(tsv), delimiter='\t', quoting=csv.QUOTE_NONE):
            if r['level'] == '5' and r['text'].strip():
                parole.append([int(c0 + int(r['left']) / K), r['text'].strip()])
        if not parole: continue
        # linea di base: mediana dei fondi delle colonne-lettera alte (non le discendenti, non i trattini)
        zz = ink[a2:b2 + 1, c0:c1]; fondi = []
        col = zz.any(0); st = None
        for i, v in enumerate(list(col) + [False]):
            if v and st is None: st = i
            if not v and st is not None:
                rr = np.flatnonzero(zz[:, st:i].any(1))
                if rr[-1] - rr[0] >= 9: fondi.append(rr[-1])
                st = None
        base = a2 + (int(np.median(fondi)) + 1 if fondi else b2 - a2 + 1)
        righe.append(['riga', 'testo', base, parole])
p = {'pdf': PDF, 'n': N, 'w': 1250, 'h': 1762, 'rot': 0, 'stato': 'bozza', 'figure': [], 'el': righe}
f = f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'
r = ['    ' + json.dumps(e, ensure_ascii=False) for e in p['el']]
open(f, 'w').write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join(r) + '\n  ]\n}\n')
print(f, len(righe), 'righe')
