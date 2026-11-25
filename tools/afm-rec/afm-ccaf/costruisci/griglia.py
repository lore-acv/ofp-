#!/usr/bin/env python3
"""Modulo comune alle tabelle a griglia delle pagine di traverso (5-7, 5-9, 5-10, 5-11).

Lavora sulla pagina girata diritta (come misura.py): l'inchiostro, i filetti misurati ai due
capi (poligoni), le righe di testo per testo.py (una per cella, con "fissa": x e larghezza di
ogni parola dall'inchiostro) e l'intestazione della pagina nel riferimento del libro.
"""
import json, re, subprocess
import numpy as np
from PIL import Image
R = '/home/user/ofp-'

def carica(pdf):
    libro = open(f'{R}/data/afm/afm-ccaf/libro.html', encoding='utf-8').read()
    m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % pdf, libro)
    rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
    ink_libro = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
    return np.rot90(ink_libro, 3), ink_libro

def gruppi(v):
    if not len(v): return []
    out = []; s = v[0]; p = v[0]
    for x in v[1:]:
        if x > p + 1: out.append((int(s), int(p))); s = x
        p = x
    out.append((int(s), int(p))); return out

def bordo(prof, centro, raggio=7):
    c = int(round(centro)); lo = max(0, c - raggio)
    v = np.flatnonzero(prof[lo:c + raggio + 1]) + lo
    if not len(v): return centro - 1, centro + 1
    g = min(gruppi(v), key=lambda q: abs((q[0] + q[1]) / 2 - centro))
    return g[0], g[1] + 1

def oriz(ink, y, xa, xb):
    """filetto orizzontale attorno a y da xa a xb: bordo alto e basso misurati ai due capi"""
    (t0, b0), (t1, b1) = [bordo(ink[:, int(x)], y) for x in (xa + 8, xb - 8)]
    return ['poli', [[float(xa), t0 + 0.5], [float(xb), t1 + 0.5], [float(xb), b1 - 0.5], [float(xa), b0 - 0.5]]]

def vert(ink, x, ya, yb):
    (l0, r0), (l1, r1) = [bordo(ink[int(y), :], x) for y in (ya + 8, yb - 8)]
    return ['poli', [[l0 + 0.5, float(ya)], [r0 - 0.5, float(ya)], [r1 - 0.5, float(yb)], [l1 + 0.5, float(yb)]]]

def base_vera(ink, x0, x1, yg, c, soglia=0.35):
    """la fascia d'inchiostro fra x0 e x1 piu' vicina alla base stimata; la base e' l'ultima riga
    ancora piena (sotto restano solo le discendenti)"""
    y0, y1 = int(yg - c * 2.2), int(yg + c * 0.9)
    prof = ink[y0:y1, int(x0):int(x1)].sum(1) > 0
    b = []; s = None
    for i, v in enumerate(list(prof) + [False]):
        if v and s is None: s = i
        if not v and s is not None:
            if i - s >= c * 0.6: b.append((y0 + s, y0 + i))
            s = None
    if not b: return int(yg)
    a, z = min(b, key=lambda q: abs(q[1] - yg))
    pr = ink[a:z, int(x0):int(x1)].sum(1)
    return int(a + np.flatnonzero(pr >= pr.max() * soglia)[-1] + 1)

def intestazione(ink_libro, n):
    """le quattro righe in alto della pagina del libro; le meta' sinistra e destra delle righe 3 e 4
    con la loro linea di base"""
    prof = ink_libro[80:420, 200:1100].sum(1) > 0; fl = []; s0 = None
    for i, v in enumerate(list(prof) + [False]):
        if v and s0 is None: s0 = i
        if not v and s0 is not None:
            if i - s0 >= 10:
                pr = ink_libro[80 + s0:80 + i, 200:1100].sum(1)
                fl.append(80 + s0 + int(np.flatnonzero(pr >= pr.max() * 0.35)[-1]) + 1)
            s0 = None
    assert len(fl) >= 4, fl
    def bl(x0, x1, yg):
        pr = ink_libro[yg - 24:yg + 8, x0:x1].sum(1)
        if not pr.max(): return yg
        return yg - 24 + int(np.flatnonzero(pr >= pr.max() * 0.45)[-1]) + 1
    pari = int(n.split('-')[1]) % 2 == 0
    s3, d3 = (f'Page: {n}', 'Reims Aviation') if pari else ('Reims Aviation', f'Page: {n}')
    s4, d4 = ('Edition: 3', 'Reims, Marne France') if pari else ('Reims, Marne France', 'Edition: 3')
    return [f'{fl[0]} libro 400-850 | Flight Manual', f'{fl[1]} libro 400-850 | Reims Rocket',
            f'{bl(200, 650, fl[2])} libro 200-650 | {s3}', f'{bl(650, 1100, fl[2])} libro 650-1100 | {d3}',
            f'{bl(200, 650, fl[3])} libro 200-650 | {s4}', f'{bl(650, 1100, fl[3])} libro 650-1100 | {d4}']

def pagina(pdf, n, righe, el, figure):
    """scrive il testo, fa agganciare le righe da testo.py, aggiunge gli altri elementi e misura"""
    import sys
    sys.path.insert(0, f'{R}/tools/afm-rec/afm-ccaf/costruisci')
    from scritte import scrivi
    open(f'{R}/tools/afm-rec/afm-ccaf/testi/{n}.txt', 'w').write('\n'.join(righe) + '\n')
    scrivi(n, {'pdf': pdf, 'n': n, 'w': 1762, 'h': 1250, 'rot': -90, 'stato': 'ricostruita', 'figure': figure, 'el': []})
    subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/testo.py', 'afm-ccaf', n, f'{R}/tools/afm-rec/afm-ccaf/testi/{n}.txt', '60', '1700'], cwd=R, check=True)
    p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/{n}.json'))
    p['el'] = [e for e in p['el'] if e[0] == 'riga'] + el
    scrivi(n, p)
    for c in ('misura.py', 'ribasa.py', 'misura.py'):
        subprocess.run(['/usr/bin/python3', '-I', f'{R}/tools/afm-rec/{c}', 'afm-ccaf', n], cwd=R, check=True, stdout=subprocess.DEVNULL)

def bande(ink, x0, x1, y0, y1, minimo=5):
    """le fasce d'inchiostro (righe di testo) fra x0 e x1, y0 e y1, senza le righe dei filetti"""
    z = ink[int(y0):int(y1), int(x0):int(x1)]
    pr = z.sum(1).astype(float)
    pr[z.mean(1) > 0.5] = 0
    out = []; s = None
    for i, v in enumerate(list(pr) + [0]):
        if v > 0 and s is None: s = i
        if v == 0 and s is not None:
            out.append([int(y0) + s, int(y0) + i]); s = None
    # fasce separate da un pixel o due (il taglio di una barra, un accento) sono la stessa riga
    unite = []
    for f in out:
        if unite and f[0] - unite[-1][1] <= 2: unite[-1][1] = f[1]
        else: unite.append(f)
    return [tuple(f) for f in unite if f[1] - f[0] >= minimo]

def cella(ink, x0, x1, y0, y1, testi, c, ruolo='cella', gap=6, margine=6, sx=None):
    """le righe di una cella: le fasce d'inchiostro dentro, nell'ordine, una per testo; la base di
    ognuna e' l'ultima riga piena della fascia (le discendenti restano sotto)"""
    b = bande(ink, x0 + margine, x1 - margine, y0 + 3, y1 - 2)
    # due righe attaccate (un segno che scende o sale fino all'altra): si taglia la fascia piu' alta
    # nel minimo dell'inchiostro della sua parte centrale
    while len(b) < len(testi):
        k = max(range(len(b)), key=lambda i: b[i][1] - b[i][0]); a, z = b[k]
        if z - a < c * 2: break
        pr = ink[a:z, int(x0 + margine):int(x1 - margine)].sum(1)
        lo = int(c * 0.8); m_ = lo + int(np.argmin(pr[lo:len(pr) - lo]))
        b[k:k + 1] = [(a, a + m_), (a + m_ + 1, z)]
    if len(b) != len(testi):
        raise SystemExit(f'cella {x0}-{x1} x {y0}-{y1}: {len(b)} fasce per {len(testi)} righe {testi} {b}')
    out = []
    for (a, z), t in zip(b, testi):
        xa, xb = int(x0 + margine), int(x1 - margine)
        if isinstance(t, tuple): t, xb = t      # (testo, fine della riga): uno sporco a destra resta fuori
        pr = ink[a:z, xa:xb].sum(1)
        soglia = 0.6 if any(ch in t for ch in 'gjpqy') else 0.35
        base = a + int(np.flatnonzero(pr >= pr.max() * soglia)[-1]) + 1
        out.append(f'{base} {ruolo} {xa}-{xb} c={c} gap={gap}' + (f' sx={float(sx)}' if sx else '') + f' fissa | {t}')
    return out
