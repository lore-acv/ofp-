#!/usr/bin/env python3
"""LE STRISCE DELLE PROCEDURE DI EMERGENZA — parallelogrammi misurati

Le pagine della sezione III hanno sul bordo esterno una fila di barre nere
oblique. Ogni barra (componente connessa dell'inchiostro nella fascia
[x0,x1]x[y0,y1]) diventa un quadrilatero: l'inviluppo convesso degli angoli dei
suoi pixel, ridotto a 4 vertici togliendo ogni volta il lato la cui
eliminazione (prolungando i due lati vicini fino a incontrarsi) aggiunge meno
area. Una barra tagliata dal bordo della pagina puo' restare un triangolo
(se il quarto vertice aggiungerebbe meno di AREA_MIN px quadrati).
Scrive gli elementi ["poli", ...] nella pagina, al posto di quelli che c'erano
nella fascia (si puo' rifare).

    /usr/bin/python3 tools/afm-rec/strisce.py afm-ccaf <pagina> <x0> <y0> <x1> <y1> [--togli x0,y0,x1,y1 ...]

--togli: riquadri da non contare (una lettera del testo che tocca una barra)
"""
import json, os, re, sys
import numpy as np
from PIL import Image
R = os.getcwd()
ID, N = sys.argv[1], sys.argv[2]
X0, Y0, X1, Y1 = map(int, sys.argv[3:7])
AREA_MIN = 6
f = f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'
p = json.load(open(f))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
g = np.array(Image.open(f'{R}/{m.group(1)}').convert('L')).astype(int)
ink = g[Y0:Y1, X0:X1] < 140
a = sys.argv[7:]
for i, v in enumerate(a):
    if v == '--togli':
        for r in a[i + 1:]:
            if r.startswith('--'): break
            q0, r0, q1, r1 = map(int, r.split(','))
            ink[max(0, r0 - Y0):max(0, r1 - Y0), max(0, q0 - X0):max(0, q1 - X0)] = False

# componenti connesse (8-vicini), visita in ampiezza: la fascia e' piccola
lab = np.zeros(ink.shape, int); n = 0
for y, x in zip(*np.nonzero(ink)):
    if lab[y, x]: continue
    n += 1; coda = [(y, x)]; lab[y, x] = n
    while coda:
        a, b = coda.pop()
        for da in (-1, 0, 1):
            for db in (-1, 0, 1):
                c, d = a + da, b + db
                if 0 <= c < ink.shape[0] and 0 <= d < ink.shape[1] and ink[c, d] and not lab[c, d]:
                    lab[c, d] = n; coda.append((c, d))

def inviluppo(P):
    P = sorted(set(P))
    def giro(Q):
        h = []
        for q in Q:
            while len(h) >= 2 and (h[-1][0] - h[-2][0]) * (q[1] - h[-2][1]) - (h[-1][1] - h[-2][1]) * (q[0] - h[-2][0]) <= 0:
                h.pop()
            h.append(q)
        return h
    a = giro(P); b = giro(P[::-1])
    return a[:-1] + b[:-1]

def incrocio(p1, p2, p3, p4):
    d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0])
    if abs(d) < 1e-9: return None
    t = ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) / d
    return (p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1]))

def area3(a, b, c):
    return abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2

def riduci(H, k):
    H = list(H)
    while len(H) > k:
        best = None
        for i in range(len(H)):
            a, b, c, d = H[i - 1], H[i], H[(i + 1) % len(H)], H[(i + 2) % len(H)]
            q = incrocio(a, b, c, d)    # lati a-b e c-d prolungati: b e c diventano q
            if q is None: continue
            # q deve stare dalla parte esterna del lato b-c
            if (c[0] - b[0]) * (q[1] - b[1]) - (c[1] - b[1]) * (q[0] - b[0]) > 0: continue
            agg = area3(b, q, c)
            if best is None or agg < best[0]: best = (agg, i, q)
        if best is None: break
        agg, i, q = best
        j = (i + 1) % len(H)
        H[i] = q; del H[j]
    return H

# l'inviluppo degli angoli dei pixel scuri sta un poco fuori dal bordo vero (basta un pixel
# sporgente perche' tutto il lato si sposti): ogni lato si rientra di RIENTRO px
RIENTRO = 0.5
def dentro_di(V, d):
    n_ = len(V)
    area2 = sum(V[i][0] * V[(i + 1) % n_][1] - V[(i + 1) % n_][0] * V[i][1] for i in range(n_))
    sg = 1 if area2 > 0 else -1
    linee = []
    for i in range(n_):
        (x1, y1), (x2, y2) = V[i], V[(i + 1) % n_]
        L = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5 or 1
        nx, ny = -(y2 - y1) / L * sg, (x2 - x1) / L * sg      # normale verso l'interno
        linee.append(((x1 + nx * d, y1 + ny * d), (x2 + nx * d, y2 + ny * d)))
    out = []
    for i in range(n_):
        q = incrocio(*linee[i - 1], *linee[i])
        out.append(q if q else linee[i][0])
    return out

nuovi = []
for k in range(1, n + 1):
    ys, xs = np.nonzero(lab == k)
    if len(ys) < 40: continue        # sporco
    P = []
    for y, x in zip(ys, xs):
        for dy in (0, 1):
            for dx in (0, 1):
                P.append((int(X0 + x + dx), int(Y0 + y + dy)))
    H = inviluppo(P)
    Q = riduci(H, 4)
    # triangolo? (barra tagliata) se togliere un altro lato costa poco
    T = riduci(Q, 3)
    def area(V): return abs(sum(V[i][0] * V[i - 1][1] - V[i - 1][0] * V[i][1] for i in range(len(V)))) / 2
    if len(T) == 3 and area(T) - area(Q) < AREA_MIN: Q = T
    Q = dentro_di(Q, RIENTRO)
    nuovi.append(['poli', [[round(a, 1), round(b, 1)] for a, b in Q]])
nuovi.sort(key=lambda e: min(v[1] for v in e[1]))
dentro = lambda e: e[0] == 'poli' and all(X0 - 2 <= v[0] <= X1 + 2 and Y0 - 2 <= v[1] <= Y1 + 2 for v in e[1])
el = [e for e in p['el'] if not dentro(e)] + nuovi
s = open(f).read()
testa = s[:s.index('"el": [')]
testo = testa + '"el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in el) + '\n  ]\n}\n'
open(f, 'w').write(testo)
print(N, len(nuovi), 'barre')
for e in nuovi: print('  ', e[1])
