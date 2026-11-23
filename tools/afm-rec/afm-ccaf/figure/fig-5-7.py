#!/usr/bin/env python3
"""FIGURA 5-7 (MAXIMUM GLIDE, pagina 5-12 di I-CCAF) — dalla scansione all'SVG

Coordinate: la pagina 5-12 diritta (orizzontale, 1762 x 1250), come la
disegna tools/afm-rec/afm-ccaf/pagine/5-12.json. Scrive fig-5-7.svg (un <g>).

Metodo, elemento per elemento:
- cornice e griglia: filetti misurati sulla scansione (righe e colonne con
  corse lunghe d'inchiostro), spessore compreso;
- fascia di planata: e' una retinatura a punti. Si trova il centro di ogni
  punto sulla scansione e lo si ridisegna li', tondo, del raggio medio. Solo
  lungo i filetti della griglia, dove i punti si fondono con la linea, si
  aggiungono quelli del reticolo locale (un passo dal punto visto piu'
  vicino), dentro i bordi della fascia misurati sui punti visti. Sotto
  l'aeroplano non si aggiunge niente: l'aeroplano li copre;
- aeroplano: disegno pieno al tratto, vettorializzato con potrace dalla
  scansione ingrandita, dopo aver tolto i filetti della griglia e i punti
  della retinatura che lo attraversano (solo i pixel che non sono aeroplano).

    /usr/bin/python3 tools/afm-rec/afm-ccaf/figure/fig-5-7.py
"""
import glob, os, re, subprocess, tempfile
import numpy as np
from PIL import Image, ImageFilter

QUI = os.path.dirname(os.path.abspath(__file__))
RADICE = os.path.abspath(os.path.join(QUI, '..', '..', '..', '..'))
img = Image.open(glob.glob(f'{RADICE}/data/afm/afm-ccaf/p/067-2.*.webp')[0]).convert('L').rotate(-90, expand=True)
a = np.array(img)
ink = a < 140
H, W = ink.shape
out = []

# ---------------------------------------------------------------- cornice e griglia
# cornice: filetti spessi (misure in px della pagina diritta)
out.append('<rect x="61" y="238" width="1280" height="10"/>')          # sopra: righe 238-247
out.append('<rect x="61" y="893" width="1280" height="10"/>')          # sotto: righe 893-902
out.append('<rect x="61" y="238" width="5" height="665"/>')            # sinistra: colonne 61-65
out.append('<rect x="1337" y="238" width="5" height="665"/>')          # destra: colonne 1337-1341
GY = [370, 445, 519, 593, 668.5, 742.5, 816]                           # 12000 ... 0 ft
GX = [281.5, 532, 790.5, 1047, 1304.5]                                 # 0 ... 40 km
for y in GY:
    out.append(f'<line x1="{GX[0]}" y1="{y}" x2="{GX[-1]}" y2="{y}" stroke-width="2.6"/>')
for x in GX:
    out.append(f'<line x1="{x}" y1="{GY[0]}" x2="{x}" y2="{GY[-1]}" stroke-width="3"/>')

# ---------------------------------------------------------------- aeroplano: dove sta
AX0, AY0, AX1, AY1 = 668, 455, 1035, 612

# ---------------------------------------------------------------- aeroplano: la sua sagoma (serve anche alla fascia)
INGR = 6          # ingrandimento per potrace
reg = a[AY0:AY1, AX0:AX1].astype(float)
m_ink = reg < 140
# via i filetti della griglia dove non c'e' aeroplano sopra o sotto
for g in GY:
    gy = int(round(g)) - AY0
    if 0 <= gy < reg.shape[0]:
        for x in range(reg.shape[1]):
            sopra = m_ink[max(0, gy - 6):gy - 2, x].any(); sotto = m_ink[gy + 3:gy + 7, x].any()
            if not (sopra and sotto):
                m_ink[max(0, gy - 2):gy + 3, x] = False
for g in GX:
    gx = int(round(g)) - AX0
    if 0 <= gx < reg.shape[1]:
        for y in range(reg.shape[0]):
            sx_ = m_ink[y, max(0, gx - 7):gx - 2].any(); dx_ = m_ink[y, gx + 3:gx + 8].any()
            if not (sx_ and dx_):
                m_ink[y, max(0, gx - 2):gx + 3] = False
# via i punti della retinatura: componenti piccole
lab = np.zeros(m_ink.shape, int); h, w = m_ink.shape; nlab = 0; sizes = {}
for y in range(h):
    for x in range(w):
        if m_ink[y, x] and not lab[y, x]:
            nlab += 1; st = [(y, x)]; lab[y, x] = nlab; cnt = 0
            while st:
                cy, cx = st.pop(); cnt += 1
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w and m_ink[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = nlab; st.append((ny, nx))
            sizes[nlab] = cnt
grandi = {l for l, s in sizes.items() if s > 60}
m_plane = np.isin(lab, list(grandi))
# la sagoma sulla pagina, allargata di 3 px: i punti della fascia che la toccano non si contano
sagoma = np.zeros_like(ink)
sagoma[AY0:AY1, AX0:AX1] = m_plane
from PIL import ImageFilter as _F
sagoma = np.array(Image.fromarray((sagoma * 255).astype(np.uint8)).filter(_F.MaxFilter(7))) > 0

# ---------------------------------------------------------------- fascia di planata
def componenti(mask, x0, y0, x1, y1, max_pix=45):
    sub = mask[y0:y1, x0:x1].copy(); h, w = sub.shape
    vis = np.zeros_like(sub); pts = []
    for y in range(h):
        for x in range(w):
            if not sub[y, x] or vis[y, x]:
                continue
            st = [(y, x)]; vis[y, x] = True; px = []
            while st:
                cy, cx = st.pop(); px.append((cy, cx))
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w and sub[ny, nx] and not vis[ny, nx]:
                            vis[ny, nx] = True; st.append((ny, nx))
            if 3 <= len(px) <= max_pix:
                ys = [p[0] for p in px]; xs = [p[1] for p in px]
                if max(ys) - min(ys) <= 7 and max(xs) - min(xs) <= 7:
                    pts.append((x0 + np.mean(xs), y0 + np.mean(ys), len(px)))
    return pts

dark = a < 175
pts = componenti(dark, 284, 360, 1180, 814)
# fuori dall'aeroplano e lontano dai filetti
def libero(x, y):
    if sagoma[int(round(y)), int(round(x))]:
        return False
    return all(abs(y - g) > 4 for g in GY) and all(abs(x - g) > 4 for g in GX)
pts = [p for p in pts if libero(p[0], p[1])]
P = np.array([(p[0], p[1]) for p in pts]); area = np.array([p[2] for p in pts])
# direzione della fascia: retta per i punti (minimi quadrati)
m, q = np.polyfit(P[:, 0], P[:, 1], 1)
n = np.array([-m, 1.0]) / np.hypot(m, 1.0)            # normale alla fascia
d = P @ n                                             # distanza (con segno) dalla retta per l'origine
lo, hi = np.percentile(d, 0.5), np.percentile(d, 99.5)
# reticolo: i due vettori piu' corti fra vicini
from collections import Counter
cand = Counter()
for i in range(len(P)):
    dd = P - P[i]; r = np.hypot(dd[:, 0], dd[:, 1]); j = np.argsort(r)[1:5]
    for k in j:
        v = dd[k]
        if v[0] < 0 or (v[0] == 0 and v[1] < 0):
            v = -v
        cand[(round(v[0]), round(v[1]))] += 1
b1 = np.array(cand.most_common(1)[0][0], float)
b2 = next(np.array(k, float) for k, _ in cand.most_common(12) if abs(b1[0] * k[1] - b1[1] * k[0]) > 8)
# affina i vettori: media dei vicini che li approssimano
def affina(b):
    vs = []
    for i in range(len(P)):
        dd = P - P[i] - b; r = np.hypot(dd[:, 0], dd[:, 1]); j = np.argmin(r)
        if r[j] < 1.6:
            vs.append(P[j] - P[i])
    return np.mean(vs, axis=0)
b1, b2 = affina(b1), affina(b2)
# origine del reticolo: media dei residui di tutti i punti
B = np.array([b1, b2]).T; Binv = np.linalg.inv(B)
c = (Binv @ (P - P[0]).T).T; frac = c - np.round(c)
o = P[0] + B @ np.mean(frac, axis=0)
# I punti visti restano dove sono. Lungo i filetti della griglia, dove i punti
# si confondono con la linea, si aggiungono quelli del reticolo locale: dal
# punto visto piu' vicino, uno o due passi del reticolo, solo dentro la
# fascia e solo dove non c'e' gia' un punto.
R = float(np.sqrt(np.median(area) / np.pi)) * 1.05
cerchi = [tuple(p) for p in P]
passi = [b1, b2, b1 + b2, b1 - b2, 2 * b1, 2 * b2]
nascosto = lambda x, y: any(abs(y - g) <= 5 for g in GY) or any(abs(x - g) <= 5 for g in GX)
aggiunti = 0
for _ in range(3):
    nuovi = []
    for (px, py) in cerchi:
        for v in passi:
            for sgn in (1, -1):
                x, y = px + sgn * v[0], py + sgn * v[1]
                if not nascosto(x, y):
                    continue
                if not (GX[0] + 1.5 <= x <= GX[-1] - 1.5 and GY[0] + 1 <= y <= GY[-1] - 1):
                    continue
                if not (lo <= np.array([x, y]) @ n <= hi):
                    continue
                if sagoma[int(round(y)), int(round(x))]:
                    continue
                if any(np.hypot(x - qx, y - qy) < 3.2 for (qx, qy) in cerchi + nuovi):
                    continue
                nuovi.append((x, y))
    cerchi += nuovi; aggiunti += len(nuovi)
    if not nuovi:
        break
print(f'fascia: {len(P)} punti visti, {aggiunti} ricavati dal reticolo lungo i filetti, raggio {R:.2f}')
out.append('<g class="retino">' + ''.join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{R:.2f}"/>' for x, y in cerchi) + '</g>')

# ---------------------------------------------------------------- aeroplano: potrace
# la scansione pulita, ingrandita INGR volte con il suo grigio (bordi morbidi), solo dove c'e' aeroplano
grigio = np.where(m_plane, reg, 255).astype(np.uint8)

big = Image.fromarray(grigio).resize((w * INGR, h * INGR), Image.BICUBIC).filter(ImageFilter.GaussianBlur(INGR * 0.35))
bw = (np.array(big) < 150)
with tempfile.TemporaryDirectory() as t:
    pbm = os.path.join(t, 'a.pbm')
    Image.fromarray((~bw * 255).astype(np.uint8)).convert('1').save(pbm)
    svg = subprocess.run(['potrace', pbm, '-s', '-o', '-', '--turdsize', '20', '--alphamax', '1.0', '--opttolerance', '0.3', '-u', '1'],
                         capture_output=True, text=True, check=True).stdout
g = re.search(r'<g transform="([^"]+)"[^>]*>(.*?)</g>', svg, re.S)
tr, paths = g.group(1), g.group(2)
# potrace: translate(0,H) scale(0.1,-0.1) in px dell'immagine ingrandita; si riporta alla pagina
tr = tr.replace('translate(0.000000,', 'translate(0,')
out.append(f'<g transform="translate({AX0},{AY0}) scale({1 / INGR})"><g transform="{tr}">' + re.sub(r'\s+', ' ', paths).replace('fill="#000000"', '') + '</g></g>')
print(f'aeroplano: {paths.count("<path")} tracciati da potrace')

# i pallini davanti alle note
for (x, y) in [(711, 274), (712, 309), (712, 345)]:
    out.append(f'<circle cx="{x}" cy="{y}" r="5.6"/>')

open(os.path.join(QUI, 'fig-5-7.svg'), 'w').write('<g class="fig-5-7">' + '\n'.join(out) + '</g>\n')
print('scritto', os.path.join(QUI, 'fig-5-7.svg'))
