#!/usr/bin/env python3
"""LA PAGINA GEMELLA DI UN ALTRO MANUALE, PORTATA PER GEOMETRIA

Per le pagine dove il trasporto riga per riga di trasporta.py non regge (pagine di
traverso, figure piene di scritte corte che Tesseract legge male): lo stesso foglio
stampato nei due manuali, cambia solo la scansione. La trasformazione dalla pagina
sorgente a questa (x e y separate: scala e spostamento) si ricava dai profili
dell'inchiostro delle due scansioni (somme per colonna e per riga, la scala che li fa
combaciare meglio); poi:

  - le righe del testo sorgente (testi/<n>.txt) si riscrivono con base, finestra e
    opzioni (corpo, larghezza, spazi) nella misura di questa scansione; numero di pagina
    ed edizione corretti; testo.py, misura.py e ribasa.py le riagganciano all'inchiostro;
  - filetti, poligoni, barre e cerchi (svg ellipse) si portano con la stessa
    trasformazione, poi ognuno si sposta di qualche px dove copre di piu' l'inchiostro;
  - le righe scritte direttamente nella pagina (non in testi/, come le scritte
    verticali con "ang") si portano anche loro;
  - il disegno vettorializzato (svgfile) no: si rifa' da questa scansione con tratto.py
    (le finestre portate si stampano).

Le pagine di traverso lavorano sulla pagina girata diritta, come gli altri strumenti;
l'intestazione (opzione "libro") nel riferimento del libro, con la sua trasformazione.

    /usr/bin/python3 -I tools/afm-rec/gemella.py afm-ccaf afm-ccab 6-19 --edizione 2 [--finestra a,b,c,d ...]

--finestra x0,y0,x1,y1: una finestra della sorgente (per esempio quella di tratto.py) da
stampare nella misura di questa scansione.
"""
import json, os, re, sys
import numpy as np
from PIL import Image, ImageDraw

R = os.getcwd()
SRC, DST, N = sys.argv[1], sys.argv[2], sys.argv[3]
ED = sys.argv[sys.argv.index('--edizione') + 1] if '--edizione' in sys.argv else None
FIN = [tuple(map(int, sys.argv[i + 1].split(','))) for i, a in enumerate(sys.argv) if a == '--finestra']

def numero_pdf(id_, n):
    mappa = json.load(open(f'{R}/tools/afm/{id_}.json'))
    for b in mappa['numeri']:
        for k, p in enumerate(range(b['da'], b['a'] + 1)):
            if (b['num'][k] if isinstance(b['num'], list) else b['num'].replace('{n}', str(k + 1))) == n:
                return p, p in mappa.get('traverso', [])
    raise SystemExit(f'{id_}: pagina {n} non trovata')

def inchiostro(id_, pdf):
    libro = open(f'{R}/data/afm/{id_}/libro.html', encoding='utf-8').read()
    m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % pdf, libro)
    return np.array(Image.open(f'{R}/{m.group(1)}').convert('L')) < 140

def adatta(a, b, scale):
    """scala k e spostamento t perche' il profilo a (sorgente) portato con x' = k x + t
    combaci meglio con b: per ogni k, la correlazione su tutti gli spostamenti"""
    a = a.astype(float) - a.mean(); b = b.astype(float) - b.mean()
    meglio = (-1e18, 1, 0)
    for k in scale:
        n = int(len(a) * k) + 1
        ar = np.interp(np.arange(n) / k, np.arange(len(a)), a)        # a portato sulla griglia di b
        L = len(ar) + len(b)
        c = np.fft.irfft(np.fft.rfft(b, L) * np.conj(np.fft.rfft(ar, L)), L)
        t = int(np.argmax(c)); v = c[t] / (np.linalg.norm(ar) * np.linalg.norm(b) + 1e-9)
        if t > L // 2: t -= L
        if v > meglio[0]: meglio = (v, k, t)
    return meglio

def trasformazione(ink_s, ink_d, nome):
    ps0, pd0 = ink_s.sum(0), ink_d.sum(0)       # per colonna: la x
    ps1, pd1 = ink_s.sum(1), ink_d.sum(1)       # per riga: la y
    rozze = np.arange(1.0, 1.8, 0.005)
    vx, kx, tx = adatta(ps0, pd0, rozze); vx, kx, tx = adatta(ps0, pd0, np.arange(kx - 0.006, kx + 0.006, 0.0005))
    vy, ky, ty = adatta(ps1, pd1, rozze); vy, ky, ty = adatta(ps1, pd1, np.arange(ky - 0.006, ky + 0.006, 0.0005))
    print(f'  {nome}: x = {kx:.4f} x + {tx} (corr {vx:.2f}), y = {ky:.4f} y + {ty} (corr {vy:.2f})')
    return kx, tx, ky, ty

pdf_s, gir_s = numero_pdf(SRC, N); pdf_d, gir_d = numero_pdf(DST, N)
lib_s, lib_d = inchiostro(SRC, pdf_s), inchiostro(DST, pdf_d)
dir_s = np.rot90(lib_s, 3) if gir_s else lib_s
dir_d = np.rot90(lib_d, 3) if gir_d else lib_d
# il riferimento della pagina (girata diritta) e quello del libro (l'intestazione), ognuno con la sua
T_pag = trasformazione(dir_s, dir_d, 'pagina')
# l'intestazione: solo la sua fascia (le quattro righe in alto, sopra il disegno girato), in proporzione
# all'altezza delle due pagine
T_lib = trasformazione(lib_s[:int(lib_s.shape[0] * 0.24)], lib_d[:int(lib_d.shape[0] * 0.24)], 'intestazione') if gir_s else T_pag

def porta(T):
    kx, tx, ky, ty = T
    return (lambda x: kx * x + tx), (lambda y: ky * y + ty), kx, ky

def fasce_testa(lib):
    """il fondo delle fasce di testo dell'intestazione (le quattro righe in alto della pagina del libro)"""
    h, w = lib.shape
    prof = lib[int(h * 0.1):int(h * 0.26), int(w * 0.15):int(w * 0.88)].sum(1) > 0
    out = []; s = None
    for i, v in enumerate(list(prof) + [False]):
        if v and s is None: s = i
        if not v and s is not None:
            if i - s >= 10: out.append(int(h * 0.1) + i)
            s = None
    return out
# sulle pagine di traverso la retta dell'intestazione puo' sbagliare (poco inchiostro): la base di ognuna
# delle quattro righe si aggancia alla fascia corrispondente di questa scansione, nell'ordine
AGGANCIO = {}
if gir_s:
    basi_s = sorted({int(r.split()[0]) for r in open(f'{R}/tools/afm-rec/{SRC}/testi/{N}.txt', encoding='utf-8')
                     if r.strip() and not r.startswith('#') and ' libro ' in r.split(' | ')[0] + ' '})
    gruppi_s = []
    for b in basi_s:
        if gruppi_s and b - gruppi_s[-1][-1] <= 9: gruppi_s[-1].append(b)
        else: gruppi_s.append([b])
    fd = fasce_testa(lib_d)
    if len(fd) >= len(gruppi_s) == 4:
        for g, b in zip(gruppi_s, fd[:4]):
            for x in g: AGGANCIO[x] = b + (x - max(g))
    else:
        print(f'  intestazione: {len(fd)} fasce per {len(gruppi_s)} righe, resta la retta')

# 1. il testo
righe = open(f'{R}/tools/afm-rec/{SRC}/testi/{N}.txt', encoding='utf-8').read().split('\n')
out = []
for r in righe:
    if not r.strip() or r.startswith('#'):
        continue
    testa, testo = r.split(' | ', 1)
    p = testa.split()
    libro = 'libro' in p
    X, Y, kx, ky = porta(T_lib if libro else T_pag)
    nuovo = [str(AGGANCIO[int(p[0])] if libro and int(p[0]) in AGGANCIO else round(Y(int(p[0]))))]
    for q in p[1:]:
        m = re.fullmatch(r'(\d+)-(\d+)', q)
        if m: nuovo.append(f'{round(X(int(m.group(1))))}-{round(X(int(m.group(2))))}'); continue
        m = re.fullmatch(r'c=([\d.]+)', q)
        if m: nuovo.append(f'c={round(float(m.group(1)) * ky, 1)}'); continue
        # gap: colonne vuote fra le parole (in orizzontale); sotto e sopra: in verticale
        m = re.fullmatch(r'(gap|sotto|sopra)=([\d.]+)', q)
        if m: nuovo.append(f'{m.group(1)}={round(float(m.group(2)) * (kx if m.group(1) == "gap" else ky))}'); continue
        m = re.fullmatch(r'sx=([\d.]+)', q)
        if m:
            # la larghezza relativa al ruolo: i ruoli di stile.json di qui sono gia' nella misura di questa
            # scansione (rapporto medio); si corregge solo la differenza di questa pagina
            st_s = json.load(open(f'{R}/tools/afm-rec/{SRC}/stile.json'))['ruoli']['testo']
            st_d = json.load(open(f'{R}/tools/afm-rec/{DST}/stile.json'))['ruoli']['testo']
            medio = (st_d['sx'] * st_d['c']) / (st_s['sx'] * st_s['c'])
            nuovo.append(f'sx={round(float(m.group(1)) * kx / medio, 3)}'); continue
        m = re.fullmatch(r'fine=(\d+)', q)
        if m: nuovo.append(f'fine={round(X(int(m.group(1))))}'); continue
        nuovo.append(q)
    if ED: testo = re.sub(r'\bEdition: \d+\b', f'Edition: {ED}', testo)
    out.append(' '.join(nuovo) + ' | ' + testo)
open(f'{R}/tools/afm-rec/{DST}/testi/{N}.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n')

# 2. gli altri elementi della pagina
ps = json.load(open(f'{R}/tools/afm-rec/{SRC}/pagine/{N}.json'))
X, Y, kx, ky = porta(T_pag)
ink = dir_d
def maschera(e, dx, dy):
    q = Image.new('1', (ink.shape[1], ink.shape[0]), 0); d = ImageDraw.Draw(q)
    if e[0] == 'poli': d.polygon([(x + dx, y + dy) for x, y in e[1]], fill=1)
    elif e[0] == 'rett': d.rectangle((e[1] + dx, e[2] + dy, e[1] + e[3] + dx, e[2] + e[4] + dy), fill=1)
    elif e[0] == 'linea': d.line((e[1] + dx, e[2] + dy, e[3] + dx, e[4] + dy), fill=1, width=max(1, round(e[5])))
    return np.array(q)
def sposta(e, dx, dy):
    if e[0] == 'poli': return ['poli', [[round(x + dx, 1), round(y + dy, 1)] for x, y in e[1]]]
    if e[0] == 'rett': return ['rett', round(e[1] + dx, 1), round(e[2] + dy, 1), round(e[3], 1), round(e[4], 1)]
    if e[0] == 'linea': return ['linea', round(e[1] + dx, 1), round(e[2] + dy, 1), round(e[3] + dx, 1), round(e[4] + dy, 1), e[5]]
nuove, figure_svg = [], []
for e in ps['el']:
    if e[0] == 'svgfile':
        figure_svg.append(e); continue
    if e[0] == 'riga':
        opz = dict(e[4]) if len(e) > 4 else {}
        if opz.get('ang') == -90:
            # scritta verticale: la base e' una x, le parole stanno lungo la y
            opz['c'] = round(opz.get('c', 14) * kx, 1)
            nuove.append(['riga', e[1], round(X(e[2])), [[round(Y(w[0])), w[1]] + ([round(w[2] * ky)] if len(w) > 2 else []) for w in e[3]], opz])
        # le altre righe vengono da testi/ (testo.py le rifa')
        continue
    if e[0] == 'svg':
        m = re.search(r'cx="([\d.]+)" cy="([\d.]+)" rx="([\d.]+)" ry="([\d.]+)"', e[1])
        if m:
            cx, cy, rx, ry = map(float, m.groups())
            s = re.sub(r'cx="[\d.]+" cy="[\d.]+" rx="[\d.]+" ry="[\d.]+"', f'cx="{X(cx):.1f}" cy="{Y(cy):.1f}" rx="{rx * kx:.1f}" ry="{ry * ky:.1f}"', e[1])
            s = re.sub(r'stroke-width="([\d.]+)"', lambda m: f'stroke-width="{float(m.group(1)) * (kx + ky) / 2:.1f}"', s)
            nuove.append(['svg', s])
        else:
            print('  svg non portato:', e[1][:80])
        continue
    if e[0] == 'poli': t = ['poli', [[X(x), Y(y)] for x, y in e[1]]]
    elif e[0] == 'rett': t = ['rett', X(e[1]), Y(e[2]), e[3] * kx, e[4] * ky]
    elif e[0] == 'linea':
        oriz = abs(e[4] - e[2]) < abs(e[3] - e[1])
        t = ['linea', X(e[1]), Y(e[2]), X(e[3]), Y(e[4]), round(e[5] * (ky if oriz else kx), 1)]
    elif e[0] == 'punti':
        nuove.append(['punti', round(Y(e[1])), [round(X(x), 1) for x in e[2]]] + e[3:]); continue
    else:
        print('  elemento non portato:', e[0]); continue
    xs = [p[0] for p in t[1]] if t[0] == 'poli' else [t[1], t[1] + (t[3] if t[0] == 'rett' else 0), t[3] if t[0] == 'linea' else t[1]]
    ys = [p[1] for p in t[1]] if t[0] == 'poli' else [t[2], t[2] + (t[4] if t[0] == 'rett' else 0), t[4] if t[0] == 'linea' else t[2]]
    x0, x1, y0, y1 = int(min(xs)) - 12, int(max(xs)) + 12, int(min(ys)) - 12, int(max(ys)) + 12
    zona = ink[max(0, y0):y1, max(0, x0):x1]
    meglio = (-1, 0, 0)
    for dy in range(-8, 9):
        for dx in range(-8, 9):
            mk = maschera(t, dx, dy)[max(0, y0):y1, max(0, x0):x1]
            n = mk.sum()
            if not n: continue
            sc = (mk & zona).sum() / (n + (zona & ~mk).sum() * 0.3)
            if sc > meglio[0]: meglio = (sc, dx, dy)
    nuove.append(sposta(t, meglio[1], meglio[2]))
    if meglio[0] < 0.5: print(f'  grafica poco coincidente ({meglio[0]:.2f}): {nuove[-1][:3]}')

H, W = dir_d.shape
p = {'pdf': pdf_d, 'n': N, 'w': W, 'h': H, 'rot': -90 if gir_d else 0, 'stato': 'bozza',
     'figure': ps.get('figure', []), 'el': nuove + figure_svg}
f = f'{R}/tools/afm-rec/{DST}/pagine/{N}.json'
open(f, 'w', encoding='utf-8').write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el')
                                     + ',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in p['el']) + '\n  ]\n}\n')
print(f'{N}: {len(out)} righe, {len(nuove)} elementi portati, {len(figure_svg)} disegni da rifare')
for x0, y0, x1, y1 in FIN:
    print(f'  finestra {x0},{y0},{x1},{y1} -> {round(X(x0))} {round(Y(y0))} {round(X(x1))} {round(Y(y1))}')
