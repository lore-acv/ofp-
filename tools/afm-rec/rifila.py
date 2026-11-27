#!/usr/bin/env python3
"""I FILETTI DI UNA PAGINA RIMISURATI SULLA SCANSIONE, LUNGO TUTTA LA LUNGHEZZA

I filetti portati da un'altra scansione (gemella.py) sono spostati in blocco: su una scansione un poco
storta, o con la tabella di proporzioni un poco diverse, un filetto puo' risultare inclinato male,
spostato di qualche px o piu' lungo del vero. Per ogni "poli" sottile (un filetto: quattro punti,
molto piu' lungo che largo) e ogni "linea":
  - lungo il filetto, ogni 8 px, il tratto d'inchiostro sottile piu' vicino (entro RAGGIO px);
  - una retta sui centri (i campioni sulle scritte e sugli incroci, lontani dalla retta, si scartano)
    e lo spessore mediano;
  - i capi: dove l'inchiostro sulla retta finisce (buchi fino a 14 px ammessi), senza allungare il
    filetto di piu' di 6 px oltre i capi di prima.
Un filetto senza abbastanza inchiostro attorno resta com'era (e si segnala).

    /usr/bin/python3 -I tools/afm-rec/rifila.py afm-ccab 5-11 [--prova]
"""
import json, re, sys
import numpy as np
from PIL import Image
R = '/home/user/ofp-'; ID, N = sys.argv[1], sys.argv[2]; PROVA = '--prova' in sys.argv
RAGGIO = 10
f = f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'
p = json.load(open(f))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
ink = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
if p.get('rot') == -90: ink = np.rot90(ink, 3)
H, W = ink.shape

def gruppi(v):
    out = []; s = v[0]; q = v[0]
    for x in v[1:]:
        if x > q + 1: out.append((s, q)); s = x
        q = x
    out.append((s, q)); return out

def rifai(a0, a1, c0, c1, oriz):
    """filetto da a0 ad a1 lungo l'asse (x se orizzontale), centro c0 -> c1: (a0, a1, k, q, t) o None"""
    cs, ps, ts = [], [], []
    for a in np.arange(a0 + 4, a1 - 3, 8):
        c = c0 + (c1 - c0) * (a - a0) / max(1e-9, a1 - a0)
        if not (0 <= a < (W if oriz else H)): continue
        prof = ink[:, int(a)] if oriz else ink[int(a), :]
        lo = max(0, int(c) - RAGGIO); v = np.flatnonzero(prof[lo:int(c) + RAGGIO + 1]) + lo
        if not len(v): continue
        g = [r for r in gruppi(list(v)) if r[1] - r[0] <= 18]
        if not g: continue
        r = min(g, key=lambda r: abs((r[0] + r[1]) / 2 - c))
        cs.append(a); ps.append((r[0] + r[1] + 1) / 2); ts.append(r[1] - r[0] + 1)
    if len(cs) < max(4, (a1 - a0) / 8 * 0.4): print('    pochi campioni', len(cs), round((a1 - a0) / 8)); return None
    cs, ps, ts = map(np.array, (cs, ps, ts))
    k, q = np.polyfit(cs, ps, 1)
    for _ in range(2):
        res = np.abs(ps - (k * cs + q)); buoni = res <= max(1.2, np.median(res) * 2.5)
        if buoni.sum() < 4: print('    pochi buoni'); return None
        k, q = np.polyfit(cs[buoni], ps[buoni], 1)
    t = max(1.0, float(np.median(ts[buoni])) - 1)
    # i capi: l'inchiostro sulla retta, a partire dal mezzo, finche' i buchi restano sotto i 14 px
    def pieno(a):
        if not (0 <= a < (W if oriz else H)): return False
        c = k * a + q; lo, hi = int(c - t / 2 - 1), int(c + t / 2 + 2)
        z = ink[max(0, lo):hi, int(a)] if oriz else ink[int(a), max(0, lo):hi]
        return z.sum() >= max(1, min(len(z), t) * 0.5) if len(z) else False
    mid = (a0 + a1) / 2; ini, fin = a0, a1
    for verso in (-1, 1):
        a = mid; ultimo = mid; buco = 0
        while (a > a0 - 6 if verso < 0 else a < a1 + 6):
            a += verso
            if pieno(a): ultimo = a; buco = 0
            else:
                buco += 1
                if buco > 14: break
        if verso < 0: ini = max(a0 - 6, ultimo)
        else: fin = min(a1 + 6, ultimo + 1)
    if fin - ini < (a1 - a0) * 0.5: print('    troppo corto', ini, fin); return None
    return ini, fin, k, q, t

nuovi, tenuti, cambi = [], 0, []
for e in p['el']:
    if e[0] == 'poli' and len(e[1]) == 4:
        xs = [v[0] for v in e[1]]; ys = [v[1] for v in e[1]]
        w, h = max(xs) - min(xs), max(ys) - min(ys)
        if max(w, h) < 40 or min(w, h) > 20 or max(w, h) < 5 * min(w, h):
            nuovi.append(e); continue
        oriz = w > h
        if oriz:
            sx = sorted(e[1], key=lambda v: v[0]); a0, a1 = min(xs), max(xs)
            c0 = (sx[0][1] + sx[1][1]) / 2; c1 = (sx[2][1] + sx[3][1]) / 2
        else:
            sy = sorted(e[1], key=lambda v: v[1]); a0, a1 = min(ys), max(ys)
            c0 = (sy[0][0] + sy[1][0]) / 2; c1 = (sy[2][0] + sy[3][0]) / 2
        r = rifai(a0, a1, c0, c1, oriz)
        if r is None:
            print('  filetto tenuto com\'era:', e[1]); nuovi.append(e); tenuti += 1; continue
        ini, fin, k, q, t = r
        y = lambda a: k * a + q
        if oriz:
            pts = [[ini, y(ini) - t / 2], [fin, y(fin) - t / 2], [fin, y(fin) + t / 2], [ini, y(ini) + t / 2]]
        else:
            pts = [[y(ini) - t / 2, ini], [y(ini) + t / 2, ini], [y(fin) + t / 2, fin], [y(fin) - t / 2, fin]]
        pts = [[round(float(a), 1), round(float(b), 1)] for a, b in pts]
        d = max(min(abs(a[0] - b[0]) + abs(a[1] - b[1]) for b in e[1]) for a in pts)
        if d >= 2: cambi.append(round(d, 1))
        nuovi.append(['poli', pts])
    else:
        nuovi.append(e)
print(f'{N}: {len(cambi)} filetti rimisurati (spostamento massimo dei vertici: {max(cambi) if cambi else 0} px), {tenuti} tenuti')
if not PROVA:
    p['el'] = nuovi
    s = '{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in p['el']) + '\n  ]\n}\n'
    open(f, 'w').write(s)
