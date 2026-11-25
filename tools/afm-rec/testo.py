#!/usr/bin/env python3
"""LE RIGHE DI UNA PAGINA DAL TESTO LETTO A VISTA

Si scrive il testo della pagina, una riga per riga di stampa:

    <base> [ruolo] [x0-x1] [c=N] | parola parola ...

(ruolo testo se manca; x0-x1 il tratto dove cercare l'inchiostro, se manca
tutta la colonna del testo; "libro" per l'intestazione delle pagine di
traverso, che sta nel riferimento del libro e non della pagina girata;
"fissa": anche la larghezza di ogni parola dai gruppi d'inchiostro, e
misura.py non la tocca; "gap=N": le colonne vuote fra due parole). Per ogni riga l'inchiostro si divide in gruppi
fini (bastano 3 colonne vuote); le parole si accoppiano ai gruppi in ordine con
la programmazione dinamica: ogni parola prende uno o piu' gruppi consecutivi, e
si sceglie l'accoppiamento in cui la larghezza di ogni parola e' piu' vicina a
quella attesa dalle sue lettere (scala ricavata dalla riga stessa); unire
gruppi separati da uno spazio vero (8 px e piu') costa molto. Cosi' "(1)"
spezzato in tre pezzi torna una parola, e due parole attaccate non succedono
(si divide sempre al gruppo fine). Le righe della pagina si sostituiscono
tutte; gli altri elementi (grafica, strisce) restano.

    /usr/bin/python3 tools/afm-rec/testo.py afm-ccaf <pagina> <testo.txt> <x0> <x1>
"""
import json, os, re, sys
import numpy as np
from PIL import Image
R = os.getcwd()
ID, N, TXT, CX0, CX1 = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
f = f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'
p = json.load(open(f))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
ink = ((rgb @ [0.299, 0.587, 0.114]) < 150) & ((rgb.max(2) - rgb.min(2)) < 40)
# pagine di traverso (rot -90): le righe sono nel riferimento della pagina girata diritta, come in
# misura.py; le righe dell'intestazione ("libro" nel testo) restano nel riferimento del libro
ink_libro = ink
if p.get('rot') == -90:
    ink = np.rot90(ink_libro, 3)

STRETTE = set("ijlft.,:;()-'\"“”’‘|![]1")
LARGHE = set('mwMW')
def peso(t):
    s = 0
    for ch in t:
        if ch in STRETTE: s += .35
        elif ch in LARGHE: s += .95
        elif ch.isupper() or ch.isdigit(): s += .68 if ch.isupper() else .55
        else: s += .52
    return s

def gruppi(base, x0, x1, c, basso=None, M=None, gap=3):
    # una riga senza discendenti si ferma poco sotto la linea di base (una sottolineatura non e' la riga)
    M = ink if M is None else M
    # la finestra si cerca con 3 righe in piu' sopra e sotto: un filetto appena fuori la chiude lo
    # stesso (le sue sbavature di un pixel non sono la riga)
    ya_, yb_ = int(base - c * 1.22) - 3, int(basso if basso else base + c * 0.35) + 3
    z = M[ya_:yb_, x0:x1]
    # un filetto (riga quasi tutta piena) dentro la finestra non e' la riga: la finestra si ferma li'
    if z.shape[0] and z.shape[1] > 20:
        def corsa(r):        # la corsa d'inchiostro piu' lunga della riga
            m_ = 0; k_ = 0
            for v in r:
                k_ = k_ + 1 if v else 0; m_ = max(m_, k_)
            return m_
        piene = np.array([i for i in range(z.shape[0]) if corsa(z[i]) > max(14, z.shape[1] * 0.25)], int)
        mezzo = z.shape[0] - int(c * 0.6)
        sopra = [r for r in piene if r < mezzo]; sotto = [r for r in piene if r >= mezzo]
        z = z[(max(sopra) + 3 if sopra else 3):(min(sotto) - 2 if sotto else z.shape[0] - 3)]
    else:
        z = z[3:-3]
    col = z.any(0); g = []; s = None; vuoto = 0
    for i, v in enumerate(list(col) + [False] * (gap + 1)):
        if v:
            if s is None: s = i
            e = i; vuoto = 0
        elif s is not None:
            vuoto += 1
            if vuoto >= gap:
                # l'altezza del gruppo: per distinguere lo sporco (piccolo in tutte e due le
                # direzioni) da una lettera stretta come l'1
                rr_ = np.flatnonzero(z[:, s:e + 1].any(1))
                altezza[(x0 + s, x0 + e)] = rr_[-1] - rr_[0] + 1 if len(rr_) else 0
                g.append((x0 + s, x0 + e)); s = None
    return g
altezza = {}

def accoppia(tok, g):
    T, G = len(tok), len(g)
    if G < T: return None
    if not g: return None
    pesi = [peso(t) for t in tok]
    # scala: inchiostro dei gruppi veri (non lo sporco) sul peso delle lettere; gli spazi non contano
    scala = sum(b - a + 1 for a, b in g if b - a > 5 or len(g) <= T) / sum(pesi)
    INF = float('inf')
    D = [[INF] * (G + 1) for _ in range(T + 1)]; B = [[0] * (G + 1) for _ in range(T + 1)]
    D[0][0] = 0
    # un gruppo che non e' di nessuna parola (sporco): stretto e basso
    salta = lambda q: 1.0 if g[q][1] - g[q][0] <= 5 and altezza.get(g[q], 99) < SPORCO_H else 8.0
    for i in range(0, T + 1):
        att = pesi[i - 1] * scala if i else 0
        for k in range(i, G + 1):
            if k > 0 and D[i][k - 1] + salta(k - 1) < D[i][k]:
                D[i][k] = D[i][k - 1] + salta(k - 1); B[i][k] = -1
            if i == 0: continue
            for j in range(i - 1, k):
                if D[i - 1][j] == INF: continue
                w = g[k - 1][1] - g[j][0] + 1
                mg = max([g[q + 1][0] - g[q][1] - 1 for q in range(j, k - 1)] or [0])
                costo = ((w - att) / max(att, 6)) ** 2 + (6 if mg >= max(8, GAP_RIGA + 3) else 0)
                if D[i - 1][j] + costo < D[i][k]:
                    D[i][k] = D[i - 1][j] + costo; B[i][k] = j
    if D[T][G] == INF: return None
    out = []; k = G
    i = T
    while i > 0:
        j = B[i][k]
        if j == -1: k -= 1; continue
        out.append((g[j][0], g[k - 1][1] + 1)); k = j; i -= 1
    return out[::-1], D[T][G]

righe = []
for ln in open(TXT, encoding='utf-8'):
    ln = ln.rstrip('\n')
    if not ln.strip() or ln.lstrip().startswith('#'): continue
    testa, testo = ln.split('|', 1)
    parti = testa.split()
    base = int(parti[0]); ruolo = 'testo'; x0, x1 = CX0, CX1; opz = {}
    for q in parti[1:]:
        if re.fullmatch(r'\d+-\d+', q): x0, x1 = map(int, q.split('-'))
        elif q in ('libro', 'basefissa', 'fissa'): opz[q] = True
        elif '=' in q:
            k, v = q.split('='); opz[k] = float(v) if '.' in v else int(v)
        else: ruolo = q
    c = opz.get('c', 25 if ruolo == 'titolo' else 18.5)
    SPORCO_H = c * 0.6
    gap = opz.pop('gap', 3); GAP_RIGA = gap      # colonne vuote che separano due parole (2 per i caratteri piccoli e fitti)
    tok = testo.split()
    g = gruppi(base, x0, x1, c, None if re.search(r'[gjpqyQ,;()\[\]/_]', testo) else base + 3, ink_libro if opz.get('libro') else None, gap)
    r = accoppia(tok, g)
    if r is None:
        print(f'NO {base}: {len(tok)} parole, {len(g)} gruppi {g}', file=sys.stderr); sys.exit(1)
    xe, costo = r
    xs = [a for a, z in xe]
    if costo > 1.5: print(f'  dubbio {base} (costo {costo:.1f}):', ' '.join(f'{x}:{t}' for x, t in zip(xs, tok)))
    if opz.get('fissa'):      # le larghezze dai gruppi d'inchiostro (misura.py non tocca la riga)
        e = ['riga', ruolo, base, [[a, t, z - a] for (a, z), t in zip(xe, tok)]]
    else:
        e = ['riga', ruolo, base, [[x, t] for x, t in zip(xs, tok)]]
    if opz: e.append(opz)
    righe.append(e)
el = righe + [e for e in p['el'] if e[0] != 'riga']
s = open(f).read()
testo = s[:s.index('"el": [')] + '"el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in el) + '\n  ]\n}\n'
open(f, 'w').write(testo)
print(N, len(righe), 'righe')
