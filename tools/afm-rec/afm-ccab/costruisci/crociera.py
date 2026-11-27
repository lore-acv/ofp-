#!/usr/bin/env python3
"""Pagine 5-2 ... 5-6 di I-CCAB: figura 5-1 (Cruise performance), fogli 1-5. Pagine di traverso.

Come afm-ccaf/costruisci/crociera.py, ma sulla scansione di I-CCAB, che e' un poco storta (circa
mezzo grado) e ha la parte destra della tabella montata qualche px piu' in basso: percio' niente
si porta in blocco da I-CCAF, tutto si misura qui.

- filetti: gli 11 orizzontali si trovano in una fascia stretta (colonne km/h e kts, dove ci sono
  tutti), i 13 verticali nel primo gruppo di dati; l'inclinazione si misura sulla cornice alta.
  Ogni filetto si misura poi ai due capi (posizione e spessore), come in I-CCAF.
- scritte fisse: quelle di I-CCAF (stesse parole), nella loro colonna, con la linea di base cercata
  nell'inchiostro (base_vera); intestazione e didascalia: le righe di testi/ fatte da gemella.py.
- numeri: i valori della tabella di I-CCAF (gli stessi: controllati con Tesseract sulla scansione
  di I-CCAB) e di nuovo con l'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia;
  km e miglia), che deve tornare; la x e la larghezza dall'inchiostro della cella, e ogni cella ha
  la sua linea di base (la colonna N.M. e' piu' bassa delle altre).

    /usr/bin/python3 -I tools/afm-rec/afm-ccab/costruisci/crociera.py <pagina> (5-2 ... 5-6)
"""
import json, re, subprocess, sys
import numpy as np
from PIL import Image
sys.path.insert(0, '/home/user/ofp-/tools/afm-rec/afm-ccaf/costruisci')
from scritte import R, scrivi
N = sys.argv[1]
ID = 'afm-ccab'
p0 = json.load(open(f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'))
PDF = p0['pdf']
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
ink = np.rot90(((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40), 3)
H, W = ink.shape

def gruppi(v):
    out = []; s = v[0]; p = v[0]
    for x in v[1:]:
        if x > p + 1: out.append((s, p)); s = x
        p = x
    out.append((s, p)); return out
# i filetti orizzontali: nella fascia delle colonne km/h e kts ci sono tutti e 11
XS0, XS1 = 820, 940
oriz = gruppi(np.flatnonzero(ink[:, XS0:XS1].mean(1) > 0.8))
assert len(oriz) == 11, oriz
YSTR = (XS0 + XS1) / 2
# i verticali: nel primo gruppo di dati
ya, yb = oriz[4][1] + 3, oriz[5][0] - 3
vert = gruppi(np.flatnonzero(ink[ya:yb].mean(0) > 0.8))
assert len(vert) == 13, vert
XSTR = (ya + yb) / 2
# l'inclinazione: il centro della cornice alta, colonna per colonna, e una retta
cx, cy = [], []
for x in range(vert[0][1] + 10, vert[-1][0] - 10, 20):
    v = np.flatnonzero(ink[oriz[0][0] - 12:oriz[0][1] + 13, x]) + oriz[0][0] - 12
    if len(v) >= 4: cx.append(x); cy.append(v.mean())
PEND = np.polyfit(cx, cy, 1)[0]
yo_ = [(a + b) / 2 for a, b in oriz]
xv_ = [(a + b) / 2 for a, b in vert]
Yr = lambda k, x: yo_[k] + PEND * (x - YSTR)          # il filetto orizzontale k alla x
Xr = lambda k, y: xv_[k] - PEND * (y - XSTR)          # il verticale k alla y

# la trasformazione dal foglio 1 di I-CCAF (le basi stimate delle scritte fisse sono in quelle coordinate)
F1 = dict(x0=66.5, x1=1341.5, y0=254.5, y1=905.0)
X0, X1, Y0, Y1 = xv_[0], xv_[-1], yo_[0], yo_[-1]
ax = (X1 - X0) / (F1['x1'] - F1['x0']); ay = (Y1 - Y0) / (F1['y1'] - F1['y0'])
TY = lambda y, x: Y0 + (y - F1['y0']) * ay + PEND * (x - YSTR)

testi_vecchi = open(f'{R}/tools/afm-rec/{ID}/testi/{N}.txt', encoding='utf-8').read().split('\n')
QUOTA = next(re.search(r'\| (\d+ FEET)$', r).group(1) for r in testi_vecchi if re.search(r'\| \d+ FEET$', r))
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
    z = ink[y0:y1, int(x0):int(x1)]
    prof = (z.sum(1) > 0) & (z.mean(1) < 0.6)          # i filetti non sono scritte
    b = []; s = None
    for i, v in enumerate(list(prof) + [False]):
        if v and s is None: s = i
        if not v and s is not None:
            if i - s >= c * 0.6: b.append((y0 + s, y0 + i))
            s = None
    if not b: return int(round(yg)), c
    a, z_ = min(b, key=lambda q: abs(q[1] - yg))
    pr = ink[a:z_, int(x0):int(x1)].sum(1)
    piene = np.flatnonzero(pr >= pr.max() * soglia)
    zb = a + piene[-1] + 1
    return zb, zb - a
righe = []
for t, ca, cb, yg, c in FISSE:
    ym = TY(yg, (xv_[ca] + xv_[cb]) / 2)
    xa, xb = int(Xr(ca, ym) + 9), int(Xr(cb, ym) - 9)
    if cb - ca == 12 and not t.startswith('NOTE'):
        xc = (xa + xb) / 2; xa, xb = int(xc - (xb - xa) * 0.36), int(xc + (xb - xa) * 0.36)
    if t.startswith('NOTE'):
        # la nota, lunga e su una scansione storta: la base a meta' riga
        xa, xb = int(Xr(ca, ym) + 12), int(Xr(cb, ym) - 12)
    if t.startswith('NOTE'):
        # lunga 1500 px su una scansione storta: a pezzi di quattro parole, ognuno con la sua finestra
        # (le x delle parole nel foglio 1 di I-CCAF, portate qui) e la sua base
        nota = next(e[3] for e in json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/5-2.json'))['el'] if e[0] == 'riga' and e[3][0][1] == 'NOTE:')
        assert ' '.join(w[1] for w in nota) == t
        TX = lambda x: X0 + (x - F1['x0']) * ax
        pezzi = [nota[i:i + 4] for i in range(0, len(nota), 4)]
        def spazio(xp):
            # il bianco fra due parole piu' largo vicino alla x stimata (la stima sbaglia di qualche px)
            yb = TY(yg, xp); z = ink[int(yb - c * ay * 1.3):int(yb + c * ay * 0.4), int(xp) - 25:int(xp) + 26]
            vuote = np.flatnonzero(~z.any(0))
            if not len(vuote): return int(xp)
            g = max(gruppi(list(vuote)), key=lambda q: q[1] - q[0])
            return int(xp) - 25 + (g[0] + g[1]) // 2
        for i, pz in enumerate(pezzi):
            pa = xa if i == 0 else spazio(TX((pezzi[i - 1][-1][0] + pezzi[i - 1][-1][2] + pz[0][0]) / 2))
            pb = xb if i == len(pezzi) - 1 else spazio(TX((pz[-1][0] + pz[-1][2] + pezzi[i + 1][0][0]) / 2))
            base, h = base_vera(pa, pb, TY(yg, (pa + pb) / 2), c * ay, 0.35)
            righe.append(f"{base} cella {pa}-{pb} c={round(c * ay, 1)} gap=7 fissa | {' '.join(w[1] for w in pz)}")
        continue
    base, h = base_vera(xa, xb, TY(yg, (xa + xb) / 2), c * ay, 0.6 if re.search(r'[gjpqy(),]', t) else 0.35)
    righe.append(f'{base} cella {xa}-{xb} c={round(c * ay, 1)} gap=7 fissa | {t}')
# l'intestazione (riferimento del libro) e la didascalia: quelle di gemella.py
testa = [r for r in testi_vecchi if ' libro ' in r.split(' | ')[0] + ' ' or re.search(r'\| Figure 5-1 ', r)]
assert len(testa) == 7, testa
open(f'{R}/tools/afm-rec/{ID}/testi/{N}.txt', 'w', encoding='utf-8').write('\n'.join(testa + righe) + '\n')

# i filetti: la struttura della tabella di I-CCAF, misurata qui ai due capi
ORIZ = [(0, 0, 12), (1, 0, 12), (2, 0, 12), (3, 1, 3), (3, 4, 12), ('r', 10, 12), (4, 0, 12),
        (5, 0, 12), (6, 0, 12), (7, 0, 12), (8, 0, 12), (9, 0, 12), (10, 0, 12)]
VERT = [(0, 0, 10), (1, 2, 9), (2, 3, 9), (3, 2, 9), (4, 2, 9), (5, 3, 9), (6, 3, 9), (7, 2, 9), (8, 3, 9),
        (9, 2, 9), (10, 3, 9), (11, 'r', 9), (12, 0, 10)]
# il filetto sotto RANGE (solo fra i verticali 10 e 12): il tratto orizzontale fra il 3 e il 4
def sotto_range(x):
    a, b = int(Yr(3, x) + 6), int(Yr(4, x) - 6)
    v = np.flatnonzero(ink[a:b, int(x)]) + a
    g = [q for q in gruppi(v) if q[1] - q[0] <= 6] if len(v) else []
    gg = [q for q in g if all(ink[q[0]:q[1] + 1, int(x) + d].any() for d in (-15, 15))]
    assert gg, ('sotto RANGE', x)
    return (gg[0][0] + gg[0][1]) / 2
xr = (Xr(10, yo_[3]) + Xr(12, yo_[3])) / 2
yr0 = sotto_range(xr)
Yrr = lambda x: yr0 + PEND * (x - xr)
def ya_(k, x): return Yrr(x) if k == 'r' else Yr(k, x)
def retta(campioni, stima, verticale):
    """centro e spessore del filetto lungo tutta la sua lunghezza: per ogni campione il tratto
    d'inchiostro sottile piu' vicino alla stima, poi una retta sui centri (i capi da soli
    sbagliano di qualche px: la carta e la stampa non sono dritte)"""
    cs, ps, ts = [], [], []
    for q in campioni:
        c0 = stima(q)
        prof = ink[int(q), :] if verticale else ink[:, int(q)]
        lo = max(0, int(c0) - 12); v = np.flatnonzero(prof[lo:int(c0) + 13]) + lo
        if not len(v): continue
        g = [r for r in gruppi(list(v)) if r[1] - r[0] <= 9]
        if not g: continue
        r = min(g, key=lambda r: abs((r[0] + r[1]) / 2 - c0))
        if abs((r[0] + r[1]) / 2 - c0) > 8: continue
        cs.append(q); ps.append((r[0] + r[1] + 1) / 2); ts.append(r[1] - r[0] + 1)
    assert len(cs) >= 4, ('filetto', stima(campioni[0]))
    k, q0 = np.polyfit(cs, ps, 1)
    res = np.abs(np.array(ps) - (k * np.array(cs) + q0))
    buoni = res <= max(1.5, np.median(res) * 3)          # i campioni sulle scritte o sugli incroci fuori
    k, q0 = np.polyfit(np.array(cs)[buoni], np.array(ps)[buoni], 1)
    t = float(np.median(np.array(ts)[buoni])) - 1      # mezzo pixel di sfumatura per lato
    return k, q0, max(1.0, t)
filetti = []
for k, i, j in ORIZ:
    xa = Xr(i, ya_(k, xv_[i])); xb = Xr(j, ya_(k, xv_[j]))
    kk, q0, t = retta(np.arange(xa + 12, xb - 12, 9), lambda x: ya_(k, x), False)
    y = lambda x: kk * x + q0
    filetti.append(['poli', [[round(float(xa - 1), 1), round(y(xa) - t / 2, 1)], [round(float(xb + 1), 1), round(y(xb) - t / 2, 1)],
                             [round(float(xb + 1), 1), round(y(xb) + t / 2, 1)], [round(float(xa - 1), 1), round(y(xa) + t / 2, 1)]]])
for k, i, j in VERT:
    yA = ya_(i, xv_[k]); yB = ya_(j, xv_[k])
    kk, q0, t = retta(np.arange(yA + 12, yB - 12, 9), lambda y: Xr(k, y), True)
    x = lambda y: kk * y + q0
    filetti.append(['poli', [[round(x(yA) - t / 2, 1), round(float(yA), 1)], [round(x(yA) + t / 2, 1), round(float(yA), 1)],
                             [round(x(yB) + t / 2, 1), round(float(yB), 1)], [round(x(yB) - t / 2, 1), round(float(yB), 1)]]])

# i numeri: i valori di I-CCAF, riga per riga
pf = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/{N}.json'))
VAL = [[w[1] for w in sorted(e[3])] for e in pf['el'] if e[0] == 'riga' and e[1] == 'cella' and len(e[3]) >= 11 and all(re.fullmatch(r'[\d,]+', w[1]) for w in e[3])]
# in I-CCAF la prima cella (RPM) sta solo sulla prima riga di ogni gruppo
num = lambda s: float(s.replace(',', '.'))
def errori(v):
    mb, hg, bhp, kmh, kts, mph, gal, lit, end, km, nm = map(num, v[-11:])
    err = []
    if abs(kts * 1.852 - kmh) > 1.6: err.append('kts')
    if abs(mph * 1.609 - kmh) > 1.6: err.append('MPH')
    if abs(gal * 3.785 - lit) > 0.15: err.append('litri')
    if abs(46 / gal - end) > 46 * 0.05 / gal ** 2 + 0.051: err.append('autonomia')
    if abs(46 / gal * kmh - km) > km * (0.05 / gal + 0.5 / kmh) + 1.5: err.append('km')
    if abs(km / 1.852 - nm) > 1.0: err.append('NM')
    if abs(mb / 33.864 - hg) > 0.6: err.append('inHg')
    return err
for v in VAL:
    e = errori(v)
    if e: print('  la riga non torna:', ' '.join(v), e)
# le righe di dati sulla scansione: le fasce d'inchiostro della colonna km/h fra i filetti dei gruppi
def bande(x0, x1, y0, y1):
    p = ink[y0:y1, x0:x1].sum(1); out = []; s = None
    for i, v in enumerate(list(p) + [0]):
        if v > 0 and s is None: s = i
        if v == 0 and s is not None:
            if i - s >= 6: out.append((y0 + s, y0 + i))
            s = None
    return out
xk = (xv_[4] + xv_[5]) / 2
fasce = []
for g in range(4, 9):
    a, b = int(Yr(g, xk) + 4), int(Yr(g + 1, xk) - 3)
    fasce += bande(int(Xr(4, a) + 6), int(Xr(5, a) - 5), a, b)
# lo sporco (fasce basse) non e' una riga di dati
hm = np.median([b - a for a, b in fasce]); fasce = [q for q in fasce if q[1] - q[0] >= hm * 0.6]
if len(fasce) != len(VAL): print("fasce", fasce); sys.exit(1)
dati = []; cc = []
for (a, b), v in zip(fasce, VAL):
    vals = v if len(v) == 12 else [None] + v
    for k, t in enumerate(vals):
        if t is None: continue
        # la fascia di questa riga alla x della colonna (la scansione e' storta)
        xm = (xv_[k] + xv_[k + 1]) / 2
        d = PEND * (xm - xk)
        x0, x1 = int(Xr(k, b + d) + 6), int(Xr(k + 1, b + d) - 5)
        bb, h = base_vera(x0, x1, b + d, b - a)
        if not (0.8 * (b - a) <= h <= 1.25 * (b - a)) or abs(bb - (b + d)) > 5:
            # la fascia trovata non e' la cifra (tocca un filetto, o prende la riga accanto): quella della riga
            bb, h = int(round(b + d)), b - a
        z = ink[bb - h:bb + 1, x0:x1]; xs = np.flatnonzero(z.any(0))
        assert len(xs), (N, t, k)
        grp = gruppi(list(xs)) if len(xs) > 1 else [(xs[0], xs[0])]
        # lo sporco staccato ai lati non e' la cella
        grp = [q for q in grp if q[1] - q[0] > 3 or z[:, q[0]:q[1] + 1].sum() > 6]
        xi, xf = x0 + grp[0][0], x0 + grp[-1][1] + 1
        dati.append(['riga', 'cella', int(bb), [[int(xi), t, int(xf - xi)]], {'fissa': True, 'c': float(h)}])
        cc.append(h)
print(N, len(filetti), 'filetti', len(VAL), 'righe di dati', len(dati), 'celle', 'pendenza', round(PEND, 5), 'corpo mediano', np.median(cc))

f = f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'
p = {'pdf': PDF, 'n': N, 'w': p0['w'], 'h': p0['h'], 'rot': -90, 'stato': 'ricostruita', 'figure': [], 'el': []}
scrivi(N, p, ID)
subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/testo.py', ID, N, f'{R}/tools/afm-rec/{ID}/testi/{N}.txt', '60', '2400'], cwd=R, check=True, stdout=subprocess.DEVNULL)
p = json.load(open(f))
foglio = re.search(r'Sheet (\d) of 5', open(f'{R}/tools/afm-rec/{ID}/testi/{N}.txt').read()).group(1)
p['figure'] = [{'figura': f'Figura 5-1 (Cruise performance), foglio {foglio} di 5', 'metodo': "tabella ricostruita sulla scansione di I-CCAB: filetti SVG misurati ai due capi (la scansione e' storta di circa mezzo grado); scritte e numeri in testo vero, ogni cella sulla sua linea di base; i numeri sono quelli di I-CCAF (controllati con Tesseract su questa scansione e con l'aritmetica della riga: km/h, kts e MPH; galloni e litri; autonomia; km e miglia nautiche) (costruisci/crociera.py)."}]
# le righe lunghe seguono l'inclinazione della scansione (come i filetti): una riga per parola, con la
# base spostata dalla pendenza rispetto al centro della riga (dove base_vera l'ha misurata)
scritte = []
for e in p['el']:
    if e[0] != 'riga': continue
    o = e[4] if len(e) > 4 else {}
    if o.get('libro') or e[3][-1][0] + e[3][-1][2] - e[3][0][0] < 300:
        scritte.append(e); continue
    xm = (e[3][0][0] + e[3][-1][0] + e[3][-1][2]) / 2
    for w in e[3]:
        scritte.append(['riga', e[1], int(round(e[2] + PEND * (w[0] + w[2] / 2 - xm))), [w], o])
p['el'] = scritte + filetti + dati
scrivi(N, p, ID)
for c in (['misura.py', ID, N], ['ribasa.py', ID, N], ['misura.py', ID, N]):
    subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/' + c[0], *c[1:]], cwd=R, check=True, stdout=subprocess.DEVNULL)
# correzioni a vista: larghezze dell'intestazione prese male da misura.py (inchiostro misurato a mano)
LARGHEZZE = {'5-5': {'5-5': 35}}
if N in LARGHEZZE:
    p = json.load(open(f))
    for e in p['el']:
        if e[0] == 'riga' and len(e) > 4 and e[4].get('libro'):
            for w in e[3]:
                if w[1] in LARGHEZZE[N]: w[2] = LARGHEZZE[N][w[1]]
    scrivi(N, p, ID)
print("poi: node tools/afm-rec/disegna.mjs afm-ccab", N, "<png>; allinea.py afm-ccab", N, "<png> (due volte)")
