#!/usr/bin/env python3
"""Pagine 5-2 ... 5-6: figura 5-1 (Cruise performance), fogli 1-5. Pagine di traverso.

I cinque fogli hanno la stessa tabella (11 filetti orizzontali, 13 verticali), spostata e un
poco scalata da pagina a pagina. Le scritte fisse sono descritte una volta, nelle coordinate del
foglio 1 (pagina girata diritta), e si portano sugli altri fogli con la trasformazione ricavata
dai filetti esterni della tabella; la loro linea di base si cerca poi nell'inchiostro e
testo.py le aggancia. I numeri vengono da crociera_leggi.py (due letture, Tesseract e strato di
testo del PDF, e l'aritmetica della riga a decidere fra le due): una riga per riga di dati, ogni
numero con la x e la larghezza del suo inchiostro. I filetti: dalla struttura della tabella, misurati ai due capi.

    /usr/bin/python3 crociera.py <pdf> <pagina> <foglio> <quota "2500 FEET">
"""
import json, re, subprocess, sys
import numpy as np
from PIL import Image
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import R, scrivi
PDF, N, FOGLIO, QUOTA = int(sys.argv[1]), sys.argv[2], int(sys.argv[3]), sys.argv[4]
import tempfile as _t, os as _o
S = _o.path.join(_t.gettempdir(), 'afm-rec'); _o.makedirs(S, exist_ok=True)      # i file intermedi
libro = open(f'{R}/data/afm/afm-ccaf/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
ink_libro = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
ink = np.rot90(ink_libro, 3)

def gruppi(v):
    out = []; s = v[0]; p = v[0]
    for x in v[1:]:
        if x > p + 1: out.append((s, p)); s = x
        p = x
    out.append((s, p)); return out
# i filetti orizzontali lunghi (piu' di meta' riga) e i verticali (nella fascia dei dati)
oriz = gruppi(np.flatnonzero(ink.mean(1) > 0.45))
assert len(oriz) == 11, oriz
ya, yb = oriz[3][0], oriz[-2][0]
vert = gruppi(np.flatnonzero(ink[ya:yb].mean(0) > 0.8))
if len(vert) == 12:      # il filetto RPM|mb comincia piu' in basso: non sempre passa la soglia
    xg = int(66.5 + (160 - 66.5) * ((vert[-1][0] - vert[0][0]) / (1341.5 - 66.5)) + vert[0][0] - 66.5)
    vert = sorted(vert + [(xg, xg)])
assert len(vert) == 13, vert
# la trasformazione dal foglio 1: x dai filetti esterni sinistro e destro, y dal primo e dall'ultimo
F1 = dict(x0=66.5, x1=1341.5, y0=254.5, y1=905.0)      # foglio 1 (pagina 58)
X0, X1 = (vert[0][0] + vert[0][1]) / 2, (vert[-1][0] + vert[-1][1]) / 2
Y0, Y1 = (oriz[0][0] + oriz[0][1]) / 2, (oriz[-1][0] + oriz[-1][1]) / 2
ax = (X1 - X0) / (F1['x1'] - F1['x0']); ay = (Y1 - Y0) / (F1['y1'] - F1['y0'])
TX = lambda x: X0 + (x - F1['x0']) * ax
TY = lambda y: Y0 + (y - F1['y0']) * ay

# le scritte fisse: (testo, colonna da, colonna a, base stimata nel foglio 1, c); le colonne sono i
# filetti verticali (0 cornice sinistra, 1 RPM|mb, 2 mb|in Hg, 3 in Hg|BHP, 4 BHP|km/h, 5 km/h|kts,
# 6 kts|MPH, 7 MPH|gal, 8 gal|litri, 9 litri|ore, 10 ore|km, 11 km|NM, 12 cornice destra)
FISSE = [
    ('CRUISE PERFORMANCE', 0, 12, 279, 11),
    ('NORMAL LEAN MIXTURE', 0, 12, 310, 11),
    ('GROSS WEIGHT 1157 kg • STANDARD CONDITIONS • ZERO WIND', 0, 12, 338, 11),
    (QUOTA, 0, 12, 365, 11),
    ('RPM', 0, 1, 426, 10), ('MP', 1, 3, 405, 10), ('%', 3, 4, 416, 10), ('BHP', 3, 4, 433, 10),
    ('TRUE AIRSPEED', 4, 7, 406, 10),
    ('mb', 1, 2, 447, 10), ('in Hg', 2, 3, 447, 10),
    ('km/h', 4, 5, 447, 10), ('kts', 5, 6, 447, 10), ('MPH', 6, 7, 447, 10),
    ('FUEL CONSUMPTION', 7, 9, 396, 10), ('PER HOUR', 7, 9, 412, 10),
    ('46 GAL (174 LITRES)', 9, 12, 396, 10), ('NO RESERVE', 9, 12, 412, 10),
    ('U.S.', 7, 8, 436, 10), ('GAL.', 7, 8, 456, 10), ('LITRES', 8, 9, 446, 10),
    ('ENDURANCE', 9, 10, 438, 10), ('HOURS', 9, 10, 456, 10),
    ('RANGE', 10, 12, 436, 10), ('km', 10, 11, 458, 10), ('N.M.', 11, 12, 458, 10),
    ('NOTE: Speed performance is shown for an airplane equipped with optional speed fairings, which increases speed by 1 knot.', 0, 12, 891, 10),
]
def base_vera(x0, x1, yg, c, soglia=0.35):
    """la fascia d'inchiostro, fra x0 e x1, il cui fondo e' piu' vicino alla base stimata"""
    y0, y1 = int(yg - c * 2.2), int(yg + c * 0.9)
    prof = ink[y0:y1, int(x0):int(x1)].sum(1) > 0
    b = []; s = None
    for i, v in enumerate(list(prof) + [False]):
        if v and s is None: s = i
        if not v and s is not None:
            if i - s >= c * 0.6: b.append((y0 + s, y0 + i))
            s = None
    if not b: return int(yg), c
    a, z = min(b, key=lambda q: abs(q[1] - yg))
    # la linea di base: l'ultima riga della fascia ancora piena (sotto restano solo le discendenti)
    pr = ink[a:z, int(x0):int(x1)].sum(1)
    piene = np.flatnonzero(pr >= pr.max() * soglia)
    zb = a + piene[-1] + 1
    return zb, zb - a
righe = []
xvc = [(a_ + b_) / 2 for a_, b_ in vert]
for t, ca, cb, yg, c in FISSE:
    xa, xb = int(xvc[ca] + 7), int(xvc[cb] - 7); base, h = base_vera(xa, xb, TY(yg), c, 0.6 if re.search(r'[gjpqy(),]', t) else 0.35)
    # il corpo: quello della scritta (le minuscole come "km" darebbero l'occhio, non le maiuscole)
    righe.append(f'{base} cella {xa}-{xb} c={round(c * ay, 1)} gap=6 fissa | {t}')
# l'intestazione della pagina (riferimento del libro) e la didascalia
fig = f'Figure 5-1 (Sheet {FOGLIO} of 5).'
yf = int(TY(957)); bf, hf = base_vera(int(TX(530)), int(TX(845)), yf, 14)
righe.append(f'{bf} testo {int(TX(530))}-{int(TX(845))} c=15 sx=1.1 fissa | {fig}')
# l'intestazione, nel riferimento del libro: le quattro fasce d'inchiostro in alto; sulle pagine
# pari "Page" a sinistra e "Reims Aviation" a destra, sulle dispari il contrario
def fasce_libro():
    prof = ink_libro[80:420, 200:1100].sum(1) > 0; b = []; s0 = None
    for i, v in enumerate(list(prof) + [False]):
        if v and s0 is None: s0 = i
        if not v and s0 is not None:
            if i - s0 >= 10:
                pr = ink_libro[80 + s0:80 + i, 200:1100].sum(1)
                b.append(80 + s0 + np.flatnonzero(pr >= pr.max() * 0.35)[-1] + 1)
            s0 = None
    return b
fl = fasce_libro()
num = int(N.split('-')[1])
if num % 2 == 0:
    t3, t4 = f'Page: {N} Reims Aviation', 'Edition: 3 Reims, Marne France'
else:
    t3, t4 = f'Reims Aviation Page: {N}', 'Reims, Marne France Edition: 3'
assert len(fl) >= 4, fl
# le due meta' delle righe 3 e 4 (a sinistra e a destra) hanno ognuna la sua linea di base
def base_libro(x0, x1, yg):
    y0, y1 = yg - 24, yg + 8
    pr = ink_libro[y0:y1, x0:x1].sum(1); r = np.flatnonzero(pr > 0)
    if not len(r): return yg
    return y0 + np.flatnonzero(pr >= pr.max() * 0.45)[-1] + 1
def due(t, yg):
    sx, dx = (t.split(' Reims')[0], 'Reims' + t.split(' Reims', 1)[1]) if not t.startswith('Reims') else (t.rsplit(' Page', 1)[0] if 'Page' in t else t.rsplit(' Edition', 1)[0], t[len(t.rsplit(' Page', 1)[0] if 'Page' in t else t.rsplit(' Edition', 1)[0]) + 1:])
    return [f'{base_libro(200, 650, yg)} libro 200-650 | {sx}', f'{base_libro(650, 1100, yg)} libro 650-1100 | {dx}']
testa = [f'{fl[0]} libro 400-850 | Flight Manual', f'{fl[1]} libro 400-850 | Reims Rocket'] + due(t3, fl[2]) + due(t4, fl[3])
open(f'{R}/tools/afm-rec/afm-ccaf/testi/{N}.txt', 'w').write('\n'.join(testa + righe) + '\n')

# i filetti, dalla struttura della tabella (uguale nei cinque fogli): da quale filetto a quale va
# ognuno; posizione e spessore misurati ai due capi sulla scansione (la scansione e' un poco storta)
yo = [(a + b) / 2 for a, b in oriz]                # 0 cornice alta ... 10 cornice bassa
xv = [(a + b) / 2 for a, b in vert]                # 0 cornice sinistra ... 12 cornice destra
y441 = TY(442.5)                                   # sotto RANGE
ORIZ = [(0, 0, 12), (1, 0, 12), (2, 0, 12), (3, 1, 3), (3, 4, 12), ('r', 10, 12), (4, 0, 12),
        (5, 0, 12), (6, 0, 12), (7, 0, 12), (8, 0, 12), (9, 0, 12), (10, 0, 12)]
VERT = [(0, 0, 10), (1, 2, 9), (2, 3, 9), (3, 2, 9), (4, 2, 9), (5, 3, 9), (6, 3, 9), (7, 2, 9), (8, 3, 9),
        (9, 2, 9), (10, 3, 9), (11, 'r', 9), (12, 0, 10)]
def bordo(prof, centro, raggio=7):
    """il tratto d'inchiostro piu' vicino al centro: primo e ultimo pixel"""
    c = int(round(centro)); lo = max(0, c - raggio)
    v = np.flatnonzero(prof[lo:c + raggio + 1]) + lo
    if not len(v): return centro - 1, centro + 1
    grp = gruppi(v); g = min(grp, key=lambda q: abs((q[0] + q[1]) / 2 - centro))
    return g[0], g[1] + 1
filetti = []
for k, i, j in ORIZ:
    y = y441 if k == 'r' else yo[k]
    xa, xb = xv[i], xv[j]
    capi = []
    for xx in (xa + 8, xb - 8):
        t, bt = bordo(ink[:, int(xx)], y); capi.append((t, bt))
    (t0, b0), (t1, b1) = capi
    # mezzo pixel dentro per lato: il bordo dell'inchiostro (soglia 150) comprende la sfumatura
    filetti.append(['poli', [[float(xa - 1), t0 + 0.5], [float(xb + 1), t1 + 0.5], [float(xb + 1), b1 - 0.5], [float(xa - 1), b0 - 0.5]]])
for k, i, j in VERT:
    x = xv[k]
    ya_ = y441 if i == 'r' else yo[i]; yb_ = yo[j]
    capi = []
    for yy in (ya_ + 8, yb_ - 8):
        l, r = bordo(ink[int(yy), :], x); capi.append((l, r))
    (l0, r0), (l1, r1) = capi
    filetti.append(['poli', [[l0 + 0.5, float(ya_)], [r0 - 0.5, float(ya_)], [r1 - 0.5, float(yb_)], [l1 + 0.5, float(yb_)]]])

# i numeri
import os
subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/afm-ccaf/costruisci/crociera_leggi.py', str(PDF),
                ','.join(str(int((a + b) / 2)) for a, b in vert),
                str(oriz[4][1] + 2), str(oriz[-2][0] - 2), ','.join(str(int((a + b) / 2)) for a, b in oriz[5:9])],
               cwd=R, check=True, stdout=open(f'{S}/crociera-{PDF}.txt', 'w'))
tab = json.load(open(f'{S}/crociera-{PDF}.json'))
CORREZIONI = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/costruisci/crociera.letti.json')).get(N, {})
dati = []
for a, b, celle, err, dubbie in tab:
    parole = []
    for k, cella in enumerate(celle):
        if not cella or not cella[2]: continue
        x0, x1, v = cella[0], cella[1], cella[2]
        v = CORREZIONI.get(f'{b}:{k}', v)
        parole.append([int(x0), v, int(x1 - x0)])
    km = celle[4]
    dati.append(['riga', 'cella', int(b), parole, {'fissa': True, 'c': round(b - a - 0.0, 1)}])
json.dump({'filetti': filetti, 'dati': dati}, open(f'{S}/crociera-{N}-el.json', 'w'))
print(N, len(filetti), 'filetti', len(dati), 'righe di dati', 'trasformazione', round(ax, 4), round(ay, 4))

# la pagina: intestazione e scritte fisse da testo.py, poi filetti e numeri
f = f'{R}/tools/afm-rec/afm-ccaf/pagine/{N}.json'
p = {'pdf': PDF, 'n': N, 'w': 1762, 'h': 1250, 'rot': -90, 'stato': 'ricostruita', 'figure': [], 'el': []}
scrivi(N, p)
subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/testo.py', 'afm-ccaf', N, f'{R}/tools/afm-rec/afm-ccaf/testi/{N}.txt', '60', '1700'], cwd=R, check=True)
p = json.load(open(f))
p['figure'] = [{'figura': f'Figura 5-1 (Cruise performance), foglio {FOGLIO} di 5', 'metodo': 'tabella ricostruita: filetti SVG misurati e testo vero; i numeri letti due volte (Tesseract cella per cella e strato di testo del PDF) e scelti con l\'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia = 46 galloni / consumo; autonomia e distanza; km e miglia nautiche); quelli su cui le letture non erano d\'accordo guardati a vista (costruisci/crociera.py).'}]
p['el'] = [e for e in p['el'] if e[0] == 'riga'] + filetti + dati
scrivi(N, p)
for c in (['misura.py', 'afm-ccaf', N], ['ribasa.py', 'afm-ccaf', N], ['misura.py', 'afm-ccaf', N]):
    subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/' + c[0], *c[1:]], cwd=R, check=True, stdout=subprocess.DEVNULL)
