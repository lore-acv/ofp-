#!/usr/bin/env python3
"""IL TESTO DI UNA PAGINA DA UN ALTRO MANUALE (I-CCAF -> I-CCAB)

I due Flight Manual sono la stessa traduzione (FR172J Edition 3 e FR172H
Edition 2): molte pagine hanno lo stesso testo, riga per riga. Questo script
prende le righe gia' ricostruite e verificate di una pagina dell'altro
manuale (pagine/<n>.json della sorgente) e le cerca sulla scansione di questo:

- Tesseract legge la pagina (righe con il loro riquadro, psm 4);
- le righe della sorgente (quelle sulla stessa linea di base, come
  "Reims Aviation" e "Page: 1-1", si leggono insieme) si allineano alle
  righe lette con la programmazione dinamica sulla somiglianza del testo;
- ogni riga allineata prende la linea di base e il tratto x0-x1 dalla
  scansione, il testo, il ruolo e le opzioni dalla sorgente;
- il numero di pagina e l'edizione si prendono da questo manuale.

Scrive testi/<n>.txt nel formato di testo.py. Le righe con somiglianza bassa
(testo diverso fra le due edizioni, o riga che c'e' solo in una) si scrivono
col testo di Tesseract e un commento "# DA LEGGERE" sopra: si correggono a
vista prima di testo.py. Le righe con somiglianza alta ma non uguale si
scrivono col testo della sorgente e "# CONTROLLA". La grafica (filetti,
figure, strisce) non si trasporta: si rimisura.

    /usr/bin/python3 tools/afm-rec/trasporta.py <sorgente> <destinazione> <pagina> [--edizione N] [--da 1-7,1-8]
    es.  /usr/bin/python3 tools/afm-rec/trasporta.py afm-ccaf afm-ccab 1-1 --edizione 2

--da: le pagine della sorgente da cui prendere le righe (di solito la stessa
pagina; dove le due edizioni vanno a capo pagina in punti diversi, come nella
sezione I, le pagine vicine: l'allineamento salta le righe che qui non ci sono).
"""
import csv, difflib, io, json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image

R = os.getcwd()
SRC, DST, N = sys.argv[1], sys.argv[2], sys.argv[3]
ED = sys.argv[sys.argv.index('--edizione') + 1] if '--edizione' in sys.argv else None
DA = sys.argv[sys.argv.index('--da') + 1].split(',') if '--da' in sys.argv else [N]
fonti = [json.load(open(f'{R}/tools/afm-rec/{SRC}/pagine/{n}.json')) for n in DA]
ps = dict(fonti[0]); ps['el'] = []
TESTA = re.compile(r'^(Flight Manual|Reims Rocket|Reims Aviation|Reims, Marne France|Page: \S+|Edition: \d+)$')
KT = DA.index(N) if N in DA else 0          # l'intestazione si prende da una pagina sola
for k, q in enumerate(fonti):
    # le righe di piu' pagine in fila: la base si sposta di pagina in pagina (l'ordine conta, non la y)
    ps['el'] += [[e[0], e[1], e[2] + 10000 * k] + e[3:] if e[0] == 'riga' else e for e in q['el']
                 if not (e[0] == 'riga' and k != KT and TESTA.match(' '.join(w[1] for w in e[3])))]
mappa = json.load(open(f'{R}/tools/afm/{DST}.json'))
num = {}
for b in mappa['numeri']:
    for k, p in enumerate(range(b['da'], b['a'] + 1)):
        num[b['num'][k] if isinstance(b['num'], list) else b['num'].replace('{n}', str(k + 1))] = p
PDF = num[N]
GIRATA = PDF in mappa.get('traverso', [])
libro = open(f'{R}/data/afm/{DST}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
im = Image.open(f'{R}/{m.group(1)}').convert('L')
W, H = im.size

def leggi(img):
    """righe di Tesseract: [(x0, y0, x1, y1, base, testo)] (base: il fondo delle lettere senza discendenti)"""
    with tempfile.TemporaryDirectory() as t:
        f = os.path.join(t, 'p.png'); img.save(f)
        tsv = subprocess.run(['tesseract', f, '-', '--psm', '4', 'tsv'], capture_output=True, text=True).stdout
    righe = {}
    for r in csv.DictReader(io.StringIO(tsv), delimiter='\t', quoting=csv.QUOTE_NONE):
        if r['level'] != '5' or not r['text'].strip(): continue
        k = (r['block_num'], r['par_num'], r['line_num'])
        x, y, w, h = int(r['left']), int(r['top']), int(r['width']), int(r['height'])
        righe.setdefault(k, []).append((x, y, x + w, y + h, r['text']))
    out = []
    for ws in righe.values():
        ws.sort()
        fondi = sorted(w[3] for w in ws if not re.search(r'[gjpqy,;()\[\]]', w[4]))
        base = fondi[len(fondi) // 2] if fondi else max(w[3] for w in ws)
        out.append((min(w[0] for w in ws), min(w[1] for w in ws), max(w[2] for w in ws), max(w[3] for w in ws), base, ' '.join(w[4] for w in ws)))
    return sorted(out, key=lambda r: (r[4], r[0]))

# pagina di traverso: si legge la pagina girata diritta (come np.rot90(ink, 3) negli altri strumenti)
pag = im.rotate(90, expand=True) if GIRATA else im
lette = leggi(pag)
# l'intestazione delle pagine di traverso sta nel riferimento del libro
lette_libro = leggi(im) if GIRATA else []

def norm(t):
    return re.sub(r'[^a-z0-9]', '', t.lower().replace('’', "'"))

def gruppi_sorgente(libro_rif):
    """le righe della sorgente, raggruppate per linea di base (entro 6 px), nell'ordine della pagina"""
    rr = [e for e in ps['el'] if e[0] == 'riga' and bool((e[4] if len(e) > 4 else {}).get('libro')) == libro_rif
          and not (e[4] if len(e) > 4 else {}).get('ang')]
    rr.sort(key=lambda e: (e[2], e[3][0][0]))
    out = []
    for e in rr:
        if out and abs(out[-1][0][2] - e[2]) <= 9: out[-1].append(e)
        else: out.append([e])
    return out

def testo_riga(e):
    return ' '.join(w[1] for w in e[3])

def allinea(gs, lette):
    """DP: ogni gruppo della sorgente con una riga letta, o saltato; ogni riga letta usata una volta"""
    A = [norm(' '.join(testo_riga(e) for e in sorted(g, key=lambda e: e[3][0][0]))) for g in gs]
    B = [norm(r[5]) for r in lette]
    n, k = len(A), len(B)
    sim = [[difflib.SequenceMatcher(None, a, b).ratio() if a and b else 0 for b in B] for a in A]
    D = np.zeros((n + 1, k + 1)); P = {}
    for i in range(n + 1):
        for j in range(k + 1):
            if i == 0 and j == 0: continue
            c = []
            if i: c.append((D[i - 1][j], 'sa'))
            if j: c.append((D[i][j - 1], 'sb'))
            if i and j and sim[i - 1][j - 1] > 0.35: c.append((D[i - 1][j - 1] + sim[i - 1][j - 1], 'm'))
            D[i][j], P[i, j] = max(c)
    i, j, cop = n, k, {}
    while i or j:
        mv = P[i, j]
        if mv == 'm': cop[i - 1] = (j - 1, sim[i - 1][j - 1]); i -= 1; j -= 1
        elif mv == 'sa': i -= 1
        else: j -= 1
    usate = {j for j, s in cop.values()}
    return cop, [r for j, r in enumerate(lette) if j not in usate]

st_s = json.load(open(f'{R}/tools/afm-rec/{SRC}/stile.json')); st_d = json.load(open(f'{R}/tools/afm-rec/{DST}/stile.json'))
KY = st_d['ruoli']['testo']['c'] / st_s['ruoli']['testo']['c']                  # il rapporto delle due scansioni in altezza
KX = KY * st_d['ruoli']['testo']['sx'] / st_s['ruoli']['testo']['sx']             # e in larghezza
def testa(e, base, x0, x1, extra=''):
    ruolo, opz = e[1], dict(e[4]) if len(e) > 4 else {}
    parti = [str(base)]
    if ruolo != 'testo': parti.append(ruolo)
    parti.append(f'{x0}-{x1}')
    for k in ('libro', 'basefissa', 'fissa'):
        if opz.get(k): parti.append(k)
    # corpo e larghezza nella misura di questa scansione (i ruoli di stile.json sono gia' riportati)
    if 'c' in opz: parti.append(f'c={round(opz["c"] * KY, 1)}')
    if 'sx' in opz: parti.append(f'sx={round(opz["sx"] * KX / KY, 3)}')
    for k in ('gap', 'sotto', 'sopra'):
        if k in opz: parti.append(f'{k}={round(opz[k] * KY)}')
    if 'fine' in opz: parti.append(f'fine={int(kx * opz["fine"] + bx)}')
    return ' '.join(parti) + extra

def correggi(t):
    """numero di pagina ed edizione di questo manuale"""
    if ED: t = re.sub(r'\bEdition: \d+\b', f'Edition: {ED}', t)
    t = re.sub(r'\bPage: \S+', f'Page: {N}', t)
    return t

out = []
nonusate = []
coppie_y = []
for libro_rif, lette_r in ((True, lette_libro), (False, lette)):
    gs = gruppi_sorgente(libro_rif)
    if not gs: continue
    if libro_rif or not GIRATA:
        cop, resto = allinea(gs, lette_r if libro_rif else lette)
    else:
        cop, resto = allinea(gs, lette)
    nonusate += resto
    # la x della sorgente portata su questa scansione: retta dai bordi delle righe allineate
    xs = [(min(e[3][0][0] for e in gs[i]), r[0]) for i, (j, s) in cop.items() if s > 0.8 for r in [(lette_r if libro_rif else lette)[j]]]
    if len(xs) >= 2:
        a = np.array(xs, float); kx, bx = np.polyfit(a[:, 0], a[:, 1], 1)
    else:
        kx, bx = (W / ps['w'], 0) if not GIRATA else (H / ps['h'], 0)
    for i, g in enumerate(gs):
        g = sorted(g, key=lambda e: e[3][0][0])
        if i not in cop:
            # le righe della sorgente prima della prima e dopo l'ultima trovata sono di altre pagine
            if not cop or i < min(cop) or i > max(cop): continue
            out.append((None, f'# DA LEGGERE: riga della sorgente non trovata: {" | ".join(testo_riga(e) for e in g)}'))
            continue
        j, s = cop[i]; r = (lette_r if libro_rif else lette)[j]
        base = r[4]
        if s > 0.8 and not libro_rif and g[0][2] // 10000 == KT: coppie_y.append((g[0][2] % 10000, base))
        for q, e in enumerate(g):
            # il tratto di ogni riga del gruppo: dalla sua x nella sorgente; l'ultima fino al bordo della riga letta
            xa = int(kx * e[3][0][0] + bx) - 14 if q else r[0] - 8
            xb = int(kx * g[q + 1][3][0][0] + bx) - 16 if q + 1 < len(g) else r[2] + 10
            t = correggi(testo_riga(e))
            # uguale vuol dire uguale: lettere e cifre identiche e la stessa punteggiatura (virgola o due punti,
            # a capo con o senza trattino); se no si guarda
            punt = lambda x: re.sub(r'[^,.:;!?-]', '', x.replace('- -', '').replace('--', ''))
            tutto = correggi(' '.join(testo_riga(z) for z in g))
            # (la punteggiatura che Tesseract legge diversa si controlla poi sull'inchiostro: dubbi.py)
            uguale = norm(tutto) == norm(r[5])
            nota = '' if uguale else ('# CONTROLLA' if s > 0.75 else '# DA LEGGERE')
            if nota == '# DA LEGGERE':
                out.append((base, f'{nota}: Tesseract legge «{r[5]}»'))
            elif nota:
                out.append((base, f'{nota} ({s:.2f}): Tesseract legge «{r[5]}»'))
            out.append((base, f'{testa(e, base, max(0, xa), xb)} | {t}'))
for r in nonusate:
    if len(norm(r[5])) >= 2:
        out.append((r[4], f'# DA LEGGERE: riga in piu\' su questa scansione, Tesseract legge «{r[5]}»\n# {r[4]} {r[0] - 8}-{r[2] + 10} | {r[5]}'))
open(f'{R}/tools/afm-rec/{DST}/testi/{N}.txt', 'w', encoding='utf-8').write('\n'.join(t for b, t in out) + '\n')
# la pagina (vuota: testo.py la riempie)
f = f'{R}/tools/afm-rec/{DST}/pagine/{N}.json'
if not os.path.exists(f):
    p = {'pdf': PDF, 'n': N, 'w': H if GIRATA else W, 'h': W if GIRATA else H, 'rot': -90 if GIRATA else 0, 'stato': 'bozza', 'figure': [], 'el': []}
    for k in ('colonna',):
        if k in ps: p[k] = ps[k]
    json.dump(p, open(f, 'w'), ensure_ascii=False)
# LA GRAFICA della pagina sorgente (filetti, barre, poligoni, puntini): portata con la retta delle basi
# (y) e quella dei bordi delle righe (x), poi ogni forma si sposta di qualche px dove copre di piu'
# l'inchiostro di questa scansione. Le strisce fuori dalla colonna del testo (sezione III) no: le
# ridisegna striscia.py; le figure (svgfile) no: si rifanno da questa scansione.
if '--grafica' in sys.argv and len(coppie_y) >= 2:
    from PIL import ImageDraw
    a = np.array(coppie_y, float); ky, by = np.polyfit(a[:, 0], a[:, 1], 1)
    g = np.array(pag).astype(int); ink = g < 140
    sorg = fonti[KT]; col = sorg.get('colonna')
    def fx(x): return kx * x + bx
    def fy(y): return ky * y + by
    def maschera(e, dx, dy):
        q = Image.new('1', pag.size, 0); d = ImageDraw.Draw(q)
        if e[0] == 'poli': d.polygon([(x + dx, y + dy) for x, y in e[1]], fill=1)
        elif e[0] == 'rett': d.rectangle((e[1] + dx, e[2] + dy, e[1] + e[3] + dx, e[2] + e[4] + dy), fill=1)
        elif e[0] == 'linea': d.line((e[1] + dx, e[2] + dy, e[3] + dx, e[4] + dy), fill=1, width=max(1, round(e[5])))
        return np.array(q)
    def sposta(e, dx, dy):
        if e[0] == 'poli': return ['poli', [[round(x + dx, 1), round(y + dy, 1)] for x, y in e[1]]]
        if e[0] == 'rett': return ['rett', round(e[1] + dx, 1), round(e[2] + dy, 1), e[3], e[4]]
        if e[0] == 'linea': return ['linea', round(e[1] + dx, 1), round(e[2] + dy, 1), round(e[3] + dx, 1), round(e[4] + dy, 1), e[5]]
    nuove = []
    for e in sorg['el']:
        if e[0] == 'poli':
            if col and all(x < col[0] or x > col[1] for x, y in e[1]): continue
            t = ['poli', [[fx(x), fy(y)] for x, y in e[1]]]
        elif e[0] == 'rett': t = ['rett', fx(e[1]), fy(e[2]), e[3] * kx, e[4] * ky]
        elif e[0] == 'linea':
            oriz = abs(e[4] - e[2]) < abs(e[3] - e[1])
            t = ['linea', fx(e[1]), fy(e[2]), fx(e[3]), fy(e[4]), round(e[5] * (ky if oriz else kx), 1)]
        elif e[0] == 'punti':
            nuove.append(['punti', round(fy(e[1])), [round(fx(x), 1) for x in e[2]]] + e[3:]); continue
        else: continue
        # la posizione migliore entro 8 px
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
        e2 = sposta(t, meglio[1], meglio[2])
        if e2[0] == 'rett' and e2[4] < 9 and e2[3] > 50:
            # barra sottile: la lunghezza da questa scansione (l'inchiostro della sua fascia, da sinistra)
            yy0, yy1 = int(e2[2]) + 1, int(e2[2] + e2[4])
            col_ = ink[yy0:max(yy0 + 1, yy1), :].mean(0) > 0.6
            xa = int(e2[1]) + 2; xb = xa
            while xb + 1 < len(col_) and (col_[xb + 1] or col_[xb + 2:xb + 4].any()): xb += 1
            if xb - xa > 30: e2[3] = round(xb + 1 - e2[1], 1)
        nuove.append(e2)
        if meglio[0] < 0.5: print(f'  grafica poco coincidente ({meglio[0]:.2f}): {nuove[-1][:3]}')
    f = f'{R}/tools/afm-rec/{DST}/pagine/{N}.json'
    p = json.load(open(f)); p['el'] = [e for e in p['el'] if e[0] == 'riga'] + nuove
    if col: p['colonna'] = [round(fx(col[0])), round(fx(col[1]))]
    json.dump(p, open(f, 'w'), ensure_ascii=False)
    print(f'  grafica: {len(nuove)} elementi (y = {ky:.3f} y + {by:.1f}, x = {kx:.3f} x + {bx:.1f})')
n_l = sum(1 for b, t in out if t.startswith('# DA LEGGERE')); n_c = sum(1 for b, t in out if t.startswith('# CONTROLLA'))
print(f'{N}: {sum(1 for b, t in out if not t.startswith("#"))} righe, da leggere {n_l}, da controllare {n_c}')
