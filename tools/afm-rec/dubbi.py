#!/usr/bin/env python3
"""LE PAROLE DUBBIE DI UNA BOZZA — da guardare a vista

Confronta le parole della bozza (Tesseract, pagine/<n>.json) con lo strato di
testo del PDF (per I-CCAF l'OCR di Acrobat, una lettura indipendente) e
scrive un'immagine con il ritaglio della scansione di ogni parola su cui le due
letture non sono d'accordo, ingrandito, con le due letture accanto e il suo
numero. Le correzioni si fanno poi a mano nel JSON, guardando il ritaglio.

    /usr/bin/python3 tools/afm-rec/dubbi.py afm-ccaf 1-1 <uscita.png>
"""
import json, os, re, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import pymupdf

RADICE = os.getcwd()
ID, N, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
p = json.load(open(f'{RADICE}/tools/afm-rec/{ID}/pagine/{N}.json'))
mappa = json.load(open(f'{RADICE}/tools/afm/{ID}.json'))
libro = open(f'{RADICE}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
img = Image.open(f'{RADICE}/{m.group(1)}').convert('L')
if p.get('rot') == -90:
    img = img.rotate(-90, expand=True)
W, H = img.size
d = pymupdf.open(f'{RADICE}/{mappa["pdf"]}'); pg = d[p['pdf'] - 1]
r = pg.rect; s = min(W / r.width, H / r.height); ox = (W - r.width * s) / 2; oy = (H - r.height * s) / 2
pdfw = [(w[0] * s + ox, w[1] * s + oy, w[2] * s + ox, w[3] * s + oy, w[4]) for w in pg.get_text('words')]
norm = lambda t: t.replace('“', '"').replace('”', '"').replace('’', "'").replace('‘', "'")

dubbi = []
for k, e in enumerate(p['el']):
    if e[0] != 'riga' or (len(e) > 4 and (e[4].get('libro') or e[4].get('ang'))):
        continue
    base = e[2]
    for i, w in enumerate(e[3]):
        x, t = w[0], w[1]
        x1 = e[3][i + 1][0] - 3 if i + 1 < len(e[3]) else x + max(30, len(t) * 14)
        # le caselle dello strato di testo sono alte e si sovrappongono fra righe: conta il
        # loro fondo (circa la linea di base) e il loro centro orizzontale
        cand = [q for q in pdfw if abs(q[3] - base) < 10 and x - 4 <= (q[0] + q[2]) / 2 <= x1]
        letto = ' '.join(q[4] for q in sorted(cand, key=lambda q: q[0]))
        if norm(letto) != norm(t):
            dubbi.append((k, i, x, base, t, letto, x1))

try:
    F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
except Exception:
    F = None
righe = []
for n, (k, i, x, base, t, letto, x1) in enumerate(dubbi):
    c = img.crop((max(0, x - 12), base - 30, min(W, int(x1) + 12), base + 12))
    c = c.resize((c.width * 3, c.height * 3), Image.LANCZOS)
    r_ = Image.new('L', (max(c.width, 420) + 20, c.height + 56), 255)
    r_.paste(c, (10, 4))
    dr = ImageDraw.Draw(r_)
    dr.text((10, c.height + 8), f'#{n} el {k} parola {i}   bozza: {t}', fill=0, font=F)
    dr.text((10, c.height + 30), f'          PDF:   {letto or "(niente)"}', fill=90, font=F)
    righe.append(r_)
if righe:
    Wt = max(x.width for x in righe); Ht = sum(x.height + 4 for x in righe)
    sh = Image.new('L', (Wt, Ht), 200); y = 0
    for x in righe:
        sh.paste(x, (0, y)); y += x.height + 4
    sh.save(OUT)
print(f'{N}: {len(dubbi)} parole dubbie' + (f' -> {OUT}' if dubbi else ''))
for n, (k, i, x, base, t, letto, x1) in enumerate(dubbi):
    print(f'  #{n} el {k} p {i} y {base}: bozza "{t}"  PDF "{letto}"')

# LA PUNTEGGIATURA IN FONDO ALLE PAROLE (dopo misura.py): Tesseract scambia spesso il
# punto con la virgola, e la macchia di differenza e' troppo piccola per vederlo. Si guarda
# l'ultimo segno della parola sulla scansione: la virgola e il punto e virgola scendono sotto
# la linea di base, i due punti e il punto e virgola hanno un punto in alto.
ink = np.array(img) < 140
atteso = {'.': (False, False), ',': (True, False), ':': (False, True), ';': (True, True)}
sbagli = 0
KS = json.load(open(f'{os.getcwd()}/tools/afm-rec/{ID}/stile.json'))['ruoli']['testo']['c'] / 18.5   # la scala della scansione (I-CCAF = 1)
for k, e in enumerate(p['el']):
    if e[0] != 'riga' or (len(e) > 4 and (e[4].get('libro') or e[4].get('ang') or e[4].get('sup'))):
        continue
    base = int(e[2])
    for w in e[3]:
        if len(w) < 3 or not w[1] or w[1][-1] not in atteso:
            continue
        x0, x1 = w[0], w[0] + w[2]
        z = ink[base - int(26 * KS):base + int(10 * KS), x0:x1]
        col = z.any(0)
        # i segni della parola (gruppi di colonne) con il loro fondo: la linea di base vera e'
        # il fondo piu' comune; l'ultimo segno e' la punteggiatura
        seg = []; dentro = False
        for c, v in enumerate(col):
            if v and not dentro: seg.append([c, c]); dentro = True
            elif v: seg[-1][1] = c
            else: dentro = False
        if len(seg) < 2:
            continue
        fondi = [np.flatnonzero(z[:, a:b + 1].any(1))[-1] for a, b in seg[:-1]]
        rif = int(np.median(fondi))
        righe = np.flatnonzero(z[:, seg[-1][0]:seg[-1][1] + 1].any(1))
        basso = righe[-1] >= rif + round(2 * KS)
        alto = righe[0] <= rif - round(8 * KS)
        if (basso, alto) != atteso[w[1][-1]]:
            letto = {v: c for c, v in atteso.items()}[(basso, alto)]
            print(f'  punteggiatura: el {k} y {base} "{w[1]}" sulla scansione sembra "{letto}"')
            sbagli += 1
print(f'{N}: {sbagli} segni in fondo da guardare')
