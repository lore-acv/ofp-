#!/usr/bin/env python3
"""LE SCRITTE PICCOLE DI UNA FIGURA — posizioni da Tesseract sull'ingrandimento

Ritaglia un riquadro della scansione, lo ingrandisce K volte e lo fa leggere a
Tesseract come testo sparso (psm 11): per ogni parola stampa x, linea di base
(il fondo delle lettere senza discendenti, stimato) e altezza nelle coordinate
della pagina, raggruppate per riga. Il testo letto e' solo un aiuto: si
corregge a vista prima di metterlo nella pagina.

    /usr/bin/python3 tools/afm-rec/etichette.py afm-ccaf <pdf> <x0> <y0> <x1> <y1> [K]
"""
import re, sys, os, subprocess, tempfile, csv, io, json
import numpy as np
from PIL import Image
ID, PDF = sys.argv[1], int(sys.argv[2]); X0, Y0, X1, Y1 = map(int, sys.argv[3:7])
K = int(sys.argv[7]) if len(sys.argv) > 7 and sys.argv[7].isdigit() else 4
libro = open(f'{os.getcwd()}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(m.group(1)).convert('RGB')).astype(int)
g = (rgb @ [0.299, 0.587, 0.114]); g[(rgb.max(2) - rgb.min(2)) >= 40] = 255     # via l'evidenziatore
ink = g < 140
reg = Image.fromarray(g[Y0:Y1, X0:X1].astype(np.uint8)).resize(((X1 - X0) * K, (Y1 - Y0) * K), Image.LANCZOS)
with tempfile.TemporaryDirectory() as t:
    f = os.path.join(t, 'a.png'); reg.save(f)
    tsv = subprocess.run(['tesseract', f, '-', '--psm', '11', 'tsv'], capture_output=True, text=True).stdout
parole = []
for r in csv.DictReader(io.StringIO(tsv), delimiter='\t', quoting=csv.QUOTE_NONE):
    if r['level'] != '5' or not r['text'].strip(): continue
    x, y, w, h = (int(r[k]) / K for k in ('left', 'top', 'width', 'height'))
    x0, y0, x1, y1 = int(X0 + x), int(Y0 + y), int(X0 + x + w + 1), int(Y0 + y + h + 1)
    # la linea di base: la riga sotto la quale le colonne della parola hanno meno inchiostro
    prof = ink[y0:y1 + 1, x0:x1].sum(1)
    base = y1
    for yy in range(len(prof) - 1, 0, -1):
        if prof[yy - 1] > 0.35 * prof.max(): base = y0 + yy; break
    if not re.search(r'[a-z,;()gjpqy]', r['text']):
        base = y1                      # maiuscole e cifre: il fondo della casella e' la linea di base
    parole.append((base, x0, r['text'], y1 - y0, x1 - x0, int(float(r['conf']))))
parole.sort()
righe = []
for p in parole:
    if righe and abs(righe[-1][0][0] - p[0]) <= 3: righe[-1].append(p)
    else: righe.append([p])
JSON = '--json' in sys.argv
for rg in righe:
    rg.sort(key=lambda q: q[1])
    if JSON:
        # [base, [[x, testo, larghezza], ...], altezza, confidenza minima]: da correggere a vista
        print(json.dumps([rg[0][0], [[q[1], q[2], q[4]] for q in rg], max(q[3] for q in rg), min(q[5] for q in rg)], ensure_ascii=False) + ',')
    else:
        print(f'{rg[0][0]:5d}  ' + '  '.join(f'{q[1]}:{q[2]}(h{q[3]},w{q[4]},c{q[5]})' for q in rg))
