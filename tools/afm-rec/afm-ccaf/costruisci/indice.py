#!/usr/bin/env python3
"""LE PAGINE DELL'INDICE (ii-v): voce, puntini guida, numero di pagina

Il testo letto a vista sta in testi/<n>.indice.txt, nel formato di testo.py,
con il numero di pagina dopo "||":

    442 | NOTIFICATION || 1-1
    789 dopo=690 | SECTION I || GENERAL     (pagina ii: a destra il titolo, da x 690)

Per ogni riga con il numero, sulla scansione si cercano da destra: il numero
(i gruppi d'inchiostro piu' a destra, fino al primo puntino), i puntini guida
(gruppi piccoli, larghi al piu' 6 px, tutti sulla linea di base) e la fine
della voce (il primo gruppo che non e' un puntino). Si scrive testi/<n>.txt
per testo.py con due righe sulla stessa base, la voce fino a prima dei puntini
e il numero, cosi' testo.py e misura.py non prendono i puntini per lettere; e
dopo testo.py (--punti) si aggiungono alla pagina gli elementi "punti" con il
centro di ogni puntino misurato.

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/indice.py <n>            (scrive testi/<n>.txt)
    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/indice.py <n> --punti    (dopo testo.py e misura.py)
"""
import json, os, re, sys
import numpy as np
from PIL import Image

R = os.getcwd(); ID = 'afm-ccaf'
N = sys.argv[1]; PUNTI = '--punti' in sys.argv
D = f'{R}/tools/afm-rec/{ID}'
p = json.load(open(f'{D}/pagine/{N}.json'))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
ink = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
C = 18.5
X_FINE = 1040            # oltre, niente (il margine)

def gruppi(base, xa, xb):
    """i gruppi d'inchiostro della riga (basta una colonna vuota: il primo puntino sta spesso a 2 px
    dall'ultima lettera): (x0, x1, y0, y1)"""
    ya, yb = int(base - C * 1.15), int(base + 6)
    z = ink[ya:yb, xa:xb]; col = z.any(0); out = []; x = 0
    while x < len(col):
        if col[x]:
            a = x
            while x < len(col) and col[x]: x += 1
            ys = np.where(z[:, a:x].any(1))[0]
            out.append((xa + a, xa + x, ya + ys.min(), ya + ys.max() + 1))
        else:
            x += 1
    return out

def puntino(g, base):
    x0, x1, y0, y1 = g
    return x1 - x0 <= 6 and y1 - y0 <= 6 and y1 >= base - 3 and y0 >= base - 8

def dividi(base, xa, dopo=None):
    """(fine della voce, inizio del numero, [centri dei puntini]) o None se la riga non ha puntini.
    dopo: la colonna di destra comincia da li' (pagina ii: dopo i puntini c'e' il titolo della sezione)"""
    gs = gruppi(base, xa, X_FINE)
    if dopo:
        i = min(k for k, g in enumerate(gs) if g[0] >= dopo)
        num0 = gs[i][0]; i -= 1
        punti = []
        while i >= 0 and puntino(gs[i], base):
            punti.append((gs[i][0] + gs[i][1]) / 2); i -= 1
        return gs[i][1], num0, sorted(punti)
    # il numero: i gruppi piu' a destra, vicini fra loro (il trattino di "3-1" e' basso e piccolo
    # come un puntino, ma sta a pochi px dalle cifre; i puntini a 17-20)
    i = len(gs) - 1
    # (un puntino attaccato al numero, come in ". 6-18", tocca la linea di base; il trattino no)
    while i > 0 and gs[i][0] - gs[i - 1][1] <= 9 and not (puntino(gs[i - 1], base) and gs[i - 1][3] >= base - 1): i -= 1
    num0 = gs[i][0]; i -= 1
    if i < 0: return None
    punti = []
    while i >= 0 and puntino(gs[i], base):
        punti.append((gs[i][0] + gs[i][1]) / 2); i -= 1
    if i < 0 or len(punti) < 2: return None
    return gs[i][1], num0, sorted(punti)

def righe_indice():
    for l in open(f'{D}/testi/{N}.indice.txt', encoding='utf-8'):
        if not l.strip(): continue
        testa, testo = l.rstrip('\n').split('|', 1)
        yield testa.split(), testo

if not PUNTI:
    out = []
    for testa, testo in righe_indice():
        base = int(testa[0])
        if '||' not in testo:
            out.append(f"{' '.join(testa)} |{testo}"); continue
        voce, num = (s.strip() for s in testo.split('||'))
        xr = [t for t in testa[1:] if re.fullmatch(r'\d+-\d+', t)]
        xa = int(xr[0].split('-')[0]) if xr else 220
        dopo = next((int(t[5:]) for t in testa if t.startswith('dopo=')), None)
        d = dividi(base, xa, dopo)
        if d is None: sys.exit(f'{N} {base}: puntini non trovati')
        fine, num0, punti = d
        altri = [t for t in testa[1:] if t not in xr and not t.startswith('dopo=')]
        # fine=: misura.py non allarga l'ultima parola fino al primo puntino
        out.append(' '.join([str(base)] + altri + [f'{xa}-{fine + 1}', f'fine={fine + 1}']) + f' | {voce}')
        # il numero e' un gruppo solo ("1-1": il trattino e il primo 1 non sono sporco)
        out.append(' '.join([str(base)] + altri + [f'{num0 - 3}-{X_FINE}'] + ([] if dopo else ['gap=8'])) + f' | {num}')
    open(f'{D}/testi/{N}.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    print(N, len(out), 'righe in testi/%s.txt' % N)
else:
    el = [e for e in p['el'] if e[0] != 'punti']
    nuovi = []
    for testa, testo in righe_indice():
        if '||' not in testo: continue
        base = int(testa[0])
        xr = [t for t in testa[1:] if re.fullmatch(r'\d+-\d+', t)]
        xa = int(xr[0].split('-')[0]) if xr else 220
        # la base vera e' quella della riga dopo ribasa.py: la riga di testo piu' vicina
        b = min((e[2] for e in el if e[0] == 'riga'), key=lambda y: abs(y - base))
        dopo = next((int(t[5:]) for t in testa if t.startswith('dopo=')), None)
        fine, num0, punti = dividi(b, xa, dopo)
        nuovi.append(['punti', b, [round(x, 1) for x in punti]])
    p['el'] = el + nuovi
    s = '{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in p['el']) + '\n  ]\n}\n'
    open(f'{D}/pagine/{N}.json', 'w').write(s)
    print(N, len(nuovi), 'righe di puntini')
