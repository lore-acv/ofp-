#!/usr/bin/env python3
"""DISEGNO AL TRATTO DI UNA FIGURA — vettorializzato con potrace

Per le figure disegnate a tratto (viste dell'aeroplano, schemi): dal riquadro
della scansione si tolgono tutto cio' che la pagina ricostruisce gia' per conto
suo (le scritte, che sono testo vero, e le forme misurate: cornici, filetti,
barre) e i segni a evidenziatore; quello che resta, il disegno, si ingrandisce
INGR volte con il suo grigio (bordi morbidi) e si fa vettorializzare a potrace.
Scrive tools/afm-rec/<id>/figure/<nome>.svg, che la pagina usa con
["svgfile", "figure/<nome>.svg"].

    /usr/bin/python3 tools/afm-rec/tratto.py afm-ccaf <pagina> <nome> <x0> <y0> <x1> <y1> [--togli x0,y0,x1,y1 ...] [--tieni x0,y0,x1,y1 ...]

--togli: altri riquadri da togliere (macchie, sporco fuori dal disegno)
--tieni: riquadri da non toccare anche se c'e' una scritta sopra (dove una
         parola tocca il disegno e il disegno deve restare)
--retino: le campiture a retino (grigio a puntini, come "fuel supply") diventano
         una campitura grigia piena, vettorializzata a parte (potrace sulla
         maschera del retino), sotto il tratto; i puntini non vanno nel tratto.
         Il retino si riconosce perche' sfocato e' grigio medio e uniforme in
         tutte e due le direzioni; il tratteggio (righe nere fitte) no.
Va eseguito dopo misura.py (le parole devono avere la larghezza misurata).
"""
import json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

R = os.getcwd()
ID, N, NOME = sys.argv[1], sys.argv[2], sys.argv[3]
X0, Y0, X1, Y1 = map(int, sys.argv[4:8])
togli, tieni = [], []
a = sys.argv[8:]
RETINO = any(x == '--retino' or x.startswith('--retino=') for x in a)
# --retino=min,max,grigio,pieno: il retino e' dove la sfocatura e' fra min e max (di solito 130-195);
# si riempie col grigio dato (di solito 163); "pieno" e' la frazione di inchiostro scuro oltre la quale
# un tratto dentro il retino resta (linee, bordi: di solito 0,55). Per un retino fitto e scuro come i
# settori della figura 4-2: --retino=95,200,135,0.85,9 (il quinto: la fascia, in px, attorno al
# retino dove i puntini sparsi del bordo si tolgono dal tratto; di solito 3)
R_MIN, R_MAX, R_GRIGIO, R_PIENO, R_BORDO, R_FIN, R_STD = 130, 195, 163, 0.55, 3, 9, 28
for x in a:
    if x.startswith('--retino='):
        v = x.split('=', 1)[1].split(',')
        R_MIN, R_MAX, R_GRIGIO, R_PIENO = float(v[0]), float(v[1]), int(v[2]), float(v[3])
        if len(v) > 4: R_BORDO = int(v[4])     # quanto si allarga il retino per togliere i suoi puntini dal tratto (dispari)
        if len(v) > 5: R_FIN = int(v[5])       # la finestra della sfocatura (dispari, di solito 9): piu' stretta per i tubi sottili a retino (figura 6-1)
        if len(v) > 6: R_STD = float(v[6])    # quanto puo' variare la sfocatura dentro il retino (di solito 28): di piu' per un retino rado (I-CCAB)
a = [x for x in a if not (x == '--retino' or x.startswith('--retino='))]
senza = []      # --senzaretino x0,y0,x1,y1: li' non c'e' retino (un quadrante fitto sembra retino: figura 6-1)
for i in range(0, len(a), 2):
    {'--togli': togli, '--tieni': tieni, '--senzaretino': senza}[a[i]].append(tuple(map(int, a[i + 1].split(','))))
INGR = 6
p = json.load(open(f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'))
stile = json.load(open(f'{R}/tools/afm-rec/{ID}/stile.json'))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
im = Image.open(f'{R}/{m.group(1)}').convert('RGB')
if p.get('rot') == -90:
    im = im.rotate(-90, expand=True)
rgb = np.array(im).astype(int)
g = rgb @ [0.299, 0.587, 0.114]
g[(rgb.max(2) - rgb.min(2)) >= 40] = 255          # l'evidenziatore non e' stampa

# cio' che la pagina disegna gia': maschera da imbiancare
via = Image.new('L', (g.shape[1], g.shape[0]), 0); d = ImageDraw.Draw(via)
for e in p['el']:
    if e[0] == 'riga':
        opz = e[4] if len(e) > 4 else {}
        if opz.get('ang') or opz.get('libro'):
            continue
        r = stile['ruoli'][e[1]]; c = opz.get('c') or r['c']; sup = set(opz.get('sup') or [])
        for i, w in enumerate(e[3]):
            if len(w) < 3:
                sys.exit(f'parola non misurata: {w} (prima misura.py)')
            # il riquadro stretto della parola: fino alle maiuscole (alle ascendenti, agli apici)
            # e sotto la linea di base solo se ci sono discendenti: le linee del disegno che
            # passano vicino a una scritta restano
            alto = c * (1.4 if i in sup else 1.12)
            basso = c * 0.35 if re.search(r'[gjpqyQ,;()]', w[1]) else 1.5
            d.rectangle((w[0] - 1.5, e[2] - alto, w[0] + w[2] + 1.5, e[2] + basso), fill=255)
    elif e[0] == 'poli':
        d.polygon([tuple(q) for q in e[1]], fill=255, outline=255, width=5)
    elif e[0] == 'rett':
        d.rectangle((e[1] - 2, e[2] - 2, e[1] + e[3] + 2, e[2] + e[4] + 2), fill=255)
    elif e[0] == 'linea':
        d.line((e[1], e[2], e[3], e[4]), fill=255, width=int(e[5] + 5))
for b in togli:
    d.rectangle(b, fill=255)
via = np.array(via) > 0
for x0, y0, x1, y1 in tieni:
    via[y0:y1, x0:x1] = False
g[via] = 255

reg = np.clip(g[Y0:Y1, X0:X1], 0, 255).astype(np.uint8)
h, w = reg.shape

def potrace(bw, scala, classe, colore=None, turd=None):
    """una maschera (vero = inchiostro) in tracciati SVG nelle coordinate della pagina"""
    with tempfile.TemporaryDirectory() as t:
        pbm = os.path.join(t, 'a.pbm')
        Image.fromarray((~bw * 255).astype(np.uint8)).convert('1').save(pbm)
        svg = subprocess.run(['potrace', pbm, '-s', '-o', '-', '--turdsize', str(turd or scala * scala * 4), '--alphamax', '1.0', '--opttolerance', '0.3', '-u', '1'],
                             capture_output=True, text=True, check=True).stdout
    gg = re.search(r'<g transform="([^"]+)"[^>]*>(.*?)</g>', svg, re.S)
    tr, paths = gg.group(1).replace('translate(0.000000,', 'translate(0,'), gg.group(2)
    stile = f' style="fill:{colore}"' if colore else ''
    return (f'<g class="{classe}"{stile}><g transform="translate({X0},{Y0}) scale({1 / scala:.6f})"><g transform="{tr}">'
            + re.sub(r'\s+', ' ', paths).replace('fill="#000000"', '') + '</g></g></g>'), paths.count('<path')

strati = []
if RETINO:
    from PIL import ImageFilter as F
    # sfocature in una direzione sola: il tratteggio verticale resta a strisce nella sfocatura
    # verticale ma non in quella orizzontale, quello orizzontale al contrario; il retino in nessuna
    def sfoca(img, kx, ky):
        a = np.array(img).astype(float)
        if kx > 1: a = np.stack([np.roll(a, d, 1) for d in range(-(kx // 2), kx // 2 + 1)]).mean(0)
        if ky > 1: a = np.stack([np.roll(a, d, 0) for d in range(-(ky // 2), ky // 2 + 1)]).mean(0)
        return a
    A = reg.astype(float)
    k = R_FIN
    Vv = sfoca(A, 1, k); Hh = sfoca(A, k, 1)
    std_v = np.sqrt(np.maximum(sfoca(Vv ** 2, k, 1) - sfoca(Vv, k, 1) ** 2, 0))   # quanto cambia, da colonna a colonna, la sfocatura verticale
    std_h = np.sqrt(np.maximum(sfoca(Hh ** 2, 1, k) - sfoca(Hh, 1, k) ** 2, 0))
    media = sfoca(A, k, k)
    ret = (media > R_MIN) & (media < R_MAX) & (std_v < R_STD) & (std_h < R_STD)
    for x0, y0, x1, y1 in senza:
        ret[max(0, y0 - Y0):max(0, y1 - Y0), max(0, x0 - X0):max(0, x1 - X0)] = False
    # pulizia: via i punti isolati, chiusi i buchi piccoli (maschera sfocata e risoglia)
    rm = np.array(Image.fromarray((ret * 255).astype(np.uint8)).filter(F.GaussianBlur(2))) > 140
    big = np.array(Image.fromarray((rm * 255).astype(np.uint8)).resize((w * INGR, h * INGR), Image.BILINEAR).filter(F.GaussianBlur(INGR * 0.6))) > 128
    svg_r, n_r = potrace(big, INGR, 'retino', '#%02x%02x%02x' % (R_GRIGIO, R_GRIGIO, R_GRIGIO), turd=INGR * INGR * 30)
    strati.append(svg_r)
    # nel tratto i puntini del retino non ci sono: dove c'e' retino, solo l'inchiostro molto scuro e
    # in tratti lunghi (bordi, frecce) resta; i puntini (scuri ma isolati) vanno via
    scuro = reg < 110
    dil = np.array(Image.fromarray((rm * 255).astype(np.uint8)).filter(F.MaxFilter(R_BORDO))) > 0
    pieno = sfoca(scuro.astype(float), 5, 5) > R_PIENO          # inchiostro fitto: linee, non puntini
    reg = np.where(dil & ~pieno, 255, reg).astype(np.uint8)
    print(f'retino: {n_r} tracciati, {int(rm.sum())} px')
big = Image.fromarray(reg).resize((w * INGR, h * INGR), Image.BICUBIC).filter(ImageFilter.GaussianBlur(INGR * 0.35))
bw = np.array(big) < 150
svg_t, n_t = potrace(bw, INGR, 'tratto')
strati.append(svg_t)
out = f'<g class="{NOME}">' + ''.join(strati) + '</g>\n'
os.makedirs(f'{R}/tools/afm-rec/{ID}/figure', exist_ok=True)
open(f'{R}/tools/afm-rec/{ID}/figure/{NOME}.svg', 'w').write(out)
# anteprima di cio' che e' andato a potrace (per controllare a vista che non manchi niente)
Image.fromarray(reg).save(f'{R}/tools/afm-rec/{ID}/figure/{NOME}.ingresso.png')
print(f'{NOME}: {n_t} tracciati del tratto, {len(out) // 1024} KB')
