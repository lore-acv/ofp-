#!/usr/bin/env python3
"""BOZZA DI UNA PAGINA RICOSTRUITA — dal disegno della scansione a un JSON da correggere

Legge la pagina del libro (l'immagine retina di data/afm/<id>/p/) e scrive
tools/afm-rec/<id>/pagine/<n>.json con:
- le righe di testo (Tesseract): linea di base misurata sull'inchiostro e,
  per ogni parola, la x del suo inizio; il ruolo (testo, titolo, tabella)
  e' solo un'ipotesi;
- i filetti orizzontali e verticali (corse lunghe di inchiostro);
- i puntini guida (macchie piccole e tonde allineate su una riga).

La bozza NON e' la pagina: il testo si corregge a mano parola per parola
guardando la scansione, i ruoli si sistemano, le figure si aggiungono. Le
coordinate sono quelle dell'immagine retina della pagina del libro (per le
pagine di traverso: l'immagine diritta, e "rot" dice come girarla).

    /usr/bin/python3 tools/afm-rec/bozza.py afm-ccaf 23        (pagina 23 del PDF)

Serve: tesseract, PyMuPDF, Pillow, numpy.
"""
import csv, glob, json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image

RADICE = os.getcwd()
ID, PDF = sys.argv[1], int(sys.argv[2])
mappa = json.load(open(f'{RADICE}/tools/afm/{ID}.json'))
libro = open(f'{RADICE}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
img = Image.open(f'{RADICE}/{m.group(1)}').convert('L')
trav = PDF in mappa.get('traverso', [])
rot = 0
if trav:
    img = img.rotate(-90, expand=True)     # la pagina del libro, girata diritta: si lavora sul testo orizzontale
    rot = -90
W, H = img.size
ink = np.array(img) < 150

with tempfile.TemporaryDirectory() as d:
    p = os.path.join(d, 'p.png'); img.save(p)
    subprocess.run(['tesseract', p, os.path.join(d, 'o'), '--psm', '4', 'tsv'], check=True, capture_output=True)
    righe = {}
    for r in csv.DictReader(open(os.path.join(d, 'o.tsv')), delimiter='\t', quoting=csv.QUOTE_NONE):
        if r['level'] != '5' or not r['text'].strip():
            continue
        righe.setdefault((int(r['block_num']), int(r['par_num']), int(r['line_num'])), []).append(r)

el = []
for k in sorted(righe, key=lambda k: min(int(w['top']) for w in righe[k])):
    ws = righe[k]
    L = min(int(w['left']) for w in ws); R = max(int(w['left']) + int(w['width']) for w in ws)
    T = min(int(w['top']) for w in ws); B = max(int(w['top']) + int(w['height']) for w in ws)
    band = ink[max(0, T - 2):B + 3, L:R]; prof = band.sum(1)
    if prof.max() == 0:
        continue
    rows = np.where(prof > prof.max() * 0.25)[0]
    base = int(max(0, T - 2) + rows[-1] + 1)
    alto = int(max(0, T - 2) + rows[0])
    testo = ' '.join(w['text'] for w in ws)
    maiuscole = re.sub(r'[^A-Za-z]', '', testo)
    ruolo = 'titolo' if maiuscole and maiuscole.isupper() and base - alto > 20 else 'testo'
    el.append(['riga', ruolo, base, [[int(w['left']), w['text']] for w in ws]])

# filetti: righe e colonne con corse d'inchiostro lunghe almeno un decimo della pagina
def corse(a, minimo):
    out = []
    for i, riga in enumerate(a):
        x = np.flatnonzero(np.diff(np.concatenate(([0], riga.astype(np.int8), [0]))))
        for s, e in zip(x[::2], x[1::2]):
            if e - s >= minimo:
                out.append((i, int(s), int(e)))
    return out
filetti = []
for i, s, e in corse(ink, W // 10):
    if filetti and filetti[-1][0] == 'o' and filetti[-1][2] == s and abs(filetti[-1][3] - e) < 3 and filetti[-1][1] + filetti[-1][5] == i:
        filetti[-1][5] += 1
    else:
        filetti.append(['o', i, s, e, 0, 1])
for i, s, e in corse(ink.T, H // 12):
    if filetti and filetti[-1][0] == 'v' and filetti[-1][2] == s and abs(filetti[-1][3] - e) < 3 and filetti[-1][1] + filetti[-1][5] == i:
        filetti[-1][5] += 1
    else:
        filetti.append(['v', i, s, e, 0, 1])
for f in filetti:
    if f[0] == 'o':
        el.append(['linea', f[2], f[1] + f[5] / 2, f[3], f[1] + f[5] / 2, f[5]])
    else:
        el.append(['linea', f[1] + f[5] / 2, f[2], f[1] + f[5] / 2, f[3], f[5]])

# puntini guida: componenti piccole e quasi quadrate, su righe dove ce ne sono almeno 4
from collections import defaultdict
lab = np.zeros(ink.shape, np.int32); n = 0; punti = []
visti = np.zeros(ink.shape, bool)
ys, xs = np.nonzero(ink)
for y, x in zip(ys, xs):
    if visti[y, x]:
        continue
    pila = [(y, x)]; visti[y, x] = True; pix = []
    while pila and len(pix) < 80:
        a, b = pila.pop(); pix.append((a, b))
        for da in (-1, 0, 1):
            for db in (-1, 0, 1):
                c, d2 = a + da, b + db
                if 0 <= c < H and 0 <= d2 < W and ink[c, d2] and not visti[c, d2]:
                    visti[c, d2] = True; pila.append((c, d2))
    if 3 <= len(pix) <= 30:
        a = [p[0] for p in pix]; b = [p[1] for p in pix]
        if max(a) - min(a) <= 6 and max(b) - min(b) <= 6:
            punti.append(((min(a) + max(a)) / 2, (min(b) + max(b)) / 2))
per_riga = defaultdict(list)
for y, x in punti:
    per_riga[round(y / 4)].append((y, x))
for k, ps in sorted(per_riga.items()):
    if len(ps) >= 4:
        ys2 = [p[0] for p in ps]
        el.append(['punti', round(max(ys2) + 2), sorted(round(p[1]) for p in ps)])

uscita = {'pdf': PDF, 'n': '', 'w': W, 'h': H, 'rot': rot, 'stato': 'bozza', 'el': el}
num = re.search(r'data-pdf="%d" data-n="([^"]*)"' % PDF, libro)
if num:
    uscita['n'] = num.group(1)
os.makedirs(f'{RADICE}/tools/afm-rec/{ID}/pagine', exist_ok=True)
dest = f'{RADICE}/tools/afm-rec/{ID}/pagine/{uscita["n"] or PDF}.json'
if os.path.exists(dest) and '--sovrascrivi' not in sys.argv:
    dest = dest.replace('.json', '.bozza.json')
with open(dest, 'w') as f:
    f.write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in uscita.items() if k != 'el'))
    f.write(',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in el) + '\n  ]\n}\n')
print(dest, len(el), 'elementi')
