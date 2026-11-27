#!/usr/bin/env python3
"""LA COPERTINA DI I-CCAF (pagina 1 del PDF) — a strati di colore, restaurata

La copertina e' a colori e consumata: rossi sbiaditi verso il rosa, blu
slavato, la cornice rossa a tratti chiara, puntini bianchi dentro le lettere.
Si ricostruisce com'era stampata:

- le forme geometriche (la cornice rossa, la barra blu, il riquadro MODEL
  FR172J, il riquadro dell'avviso) sono poligoni misurati sulla scansione:
  ogni lato e' la retta che passa per i bordi dell'inchiostro, misurati riga
  per riga o colonna per colonna (la stampa e' appena storta: si tiene);
- i disegni e le scritte a disegno (logo dell'aeroclub, logo Cessna, motti,
  REIMS ROCKET, MODEL FR172J, bandierine, FLIGHT MANUAL, D967-13) si
  separano per colore (rosso, blu, grigio, nero) e ogni strato si
  vettorializza con potrace dalla scansione ingrandita INGR volte, nella sua
  tinta piena: i colori sono quelli della scansione riportati alla stampa
  (piu' saturi e piu' scuri, la tinta resta), i puntini bianchi dentro le
  lettere e le macchie piccole si chiudono (turdsize);
- I-CCAF (da testi/copertina.txt con testo.py), i due motti rossi (MORE
  PEOPLE BUY AND..., WORLD'S LARGEST PRO-...), FLIGHT MANUAL, MODEL FR172J e
  D967-13 sono testo vero (ruoli "sigla", "motto", "titcop", "modello" e
  "codice" in stile.json, con il loro colore).
- COME NUOVA: la copertina non si copia com'e', si restaura. L'avviso rosso
  ENGLISH TRANSLATION, incollato sopra la stampa, va sul retro
  (costruisci/retro.mjs) e la cornice e la barra blu sotto di lui si
  completano; gli strati a disegno si chiudono (lettere interrotte e buchi
  bianchi dell'usura) e si aprono (sbavature), con contorni lisci; le
  bandierine sono triangoli misurati. I
  motti sono lettere di 18 px sbiadite fino al rosa: vettorializzate, gli
  occhielli si chiudono (la scansione non li risolve), da cui il testo.

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/copertina.py
"""
import json, os, re, subprocess, tempfile
import numpy as np
from PIL import Image, ImageFilter

R = os.getcwd()
ID, PDF = 'afm-ccaf', 1
INGR = 6
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % PDF, libro)
rgb = np.array(Image.open(f'{R}/{m.group(1)}').convert('RGB')).astype(int)
H, W = rgb.shape[:2]
r_, g_, b_ = rgb[..., 0], rgb[..., 1], rgb[..., 2]
forza = 255 - rgb.min(2)                       # quanto inchiostro, di qualunque colore
lum = rgb @ [0.299, 0.587, 0.114]
ROSSO_M = (r_ - np.maximum(g_, b_)) > 30
BLU_M = (b_ - r_) > 12
NEUTRO_M = ~ROSSO_M & ~BLU_M
# i motti rossi sono sbiaditi fino al rosa chiaro: si misurano col rosso (r meno la media di g e b)
ROSSEZZA = np.clip((r_ - (g_ + b_) / 2) * 1.6, 0, 255)
ROSA_M = (r_ - (g_ + b_) / 2) > 12

# le tinte restaurate (fra parentesi la scansione)
ROSSO = '#c8193c'      # cornice, Cessna, motti, riquadro del modello, bandierine (196,84,110) / (206,25,65)
BLU = '#373c73'        # barra, REIMS ROCKET, bandierina (77,79,125) / (85,91,132)
ARDESIA = '#3c3e58'    # la freccia del logo Cessna (83,82,103)
GRIGIO = '#464656'     # MODEL FR172J, FLIGHT MANUAL (97,93,113) / (90,89,98)
CODICE = '#5a5a5a'     # D967-13 (140,141,137)
# il logo dell'aeroclub e' gia' digitale: le sue tinte come sono
AV_BLU, AV_ROSSO, AV_GRIGIO, AV_NERO = '#110971', '#d70102', '#b4b4b4', '#000000'
AVVISO = '#e52225'     # il riquadro dell'avviso (digitale anche lui)

# ------------------------------------------------------------------ misure delle forme
def retta(punti):
    """x = a*t + b (o y = a*t + b) dai bordi misurati, scartando i punti lontani (macchie, buchi)"""
    a = np.array(punti, float)
    p = np.polyfit(a[:, 0], a[:, 1], 1)
    for _ in range(2):
        res = np.abs(a[:, 1] - np.polyval(p, a[:, 0]))
        a = a[res <= max(1.0, np.percentile(res, 85))]
        p = np.polyfit(a[:, 0], a[:, 1], 1)
    return p

def lato_v(mask, xa, xb, ys):
    """lato verticale fra le colonne xa..xb: le rette del bordo sinistro e destro dell'inchiostro"""
    L, Rr = [], []
    for y in ys:
        xs = np.where(mask[y, xa:xb])[0]
        if len(xs) >= 2:
            L.append((y, xa + xs.min())); Rr.append((y, xa + xs.max() + 1))
    return retta(L), retta(Rr)

def lato_o(mask, ya, yb, xs):
    T, B = [], []
    for x in xs:
        ys = np.where(mask[ya:yb, x])[0]
        if len(ys) >= 2:
            T.append((x, ya + ys.min())); B.append((x, ya + ys.max() + 1))
    return retta(T), retta(B)

def incrocio(v, o):
    """il punto dove la retta verticale x = v(y) incontra l'orizzontale y = o(x)"""
    y = o[1]
    for _ in range(5):
        x = np.polyval(v, y); y = np.polyval(o, x)
    return [round(float(np.polyval(v, y)), 2), round(float(y), 2)]

def cornice(mask, sx, dx, alto, basso, salta=()):
    """una cornice rettangolare: (esterno, interno) come quadrilateri; sx/dx/alto/basso le fasce di ricerca"""
    fuori = lambda t: any(a <= t <= b for a, b in salta)
    ys = [y for y in range(alto[1] + 6, basso[0] - 6, 2) if not fuori(y)]
    xs = list(range(sx[1] + 6, dx[0] - 6, 2))
    sxe, sxi = lato_v(mask, *sx, ys); dxi, dxe = lato_v(mask, *dx, ys)
    ae, ai = lato_o(mask, *alto, xs); bi, be = lato_o(mask, *basso, xs)
    est = [incrocio(sxe, ae), incrocio(dxe, ae), incrocio(dxe, be), incrocio(sxe, be)]
    inn = [incrocio(sxi, ai), incrocio(dxi, ai), incrocio(dxi, bi), incrocio(sxi, bi)]
    return est, inn, (sxe, sxi, dxi, dxe, ae, ai, bi, be)

pt = lambda q: ' '.join(f'{x:.2f},{y:.2f}' for x, y in q)
def d_quad(q):
    return 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in q) + ' Z'

# la cornice rossa: il riquadro dell'avviso (bianco, digitale, sopra la stampa) la copre fra y 921 e 1122
AVV = (211, 921, 1007, 1123)          # x0, y0, x1, y1 del riquadro dell'avviso (bordo compreso)
rosso_forte = ROSSO_M & (forza > 70)
est, inn, (sxe, sxi, dxi, dxe, ae, ai, bi, be) = cornice(rosso_forte, (250, 280), (535, 562), (112, 140), (1485, 1512), [(AVV[1] - 25, AVV[3] + 25)])

def taglia(q_alto, q_basso, v1, v2, y0, y1):
    """un lato verticale (fra le rette v1 e v2) da y0 a y1"""
    return [[np.polyval(v1, y0), y0], [np.polyval(v2, y0), y0], [np.polyval(v2, y1), y1], [np.polyval(v1, y1), y1]]

# la cornice: un anello intero (sotto il riquadro dell'avviso, che sulla copertina restaurata non
# c'e' piu', continua con le stesse rette: la copertina stampata non aveva l'avviso)

# la barra blu: due lati misurati, le teste dritte
blu_forte = BLU_M & (forza > 70)
ys_b = [y for y in range(80, 1555, 2) if not (AVV[1] - 10 <= y <= AVV[3] + 10)]
bs, bd = lato_v(blu_forte, 550, 592, ys_b)
TB, BB = 66.5, 1566.0
barra = [taglia(None, None, bs, bd, TB, BB)]

# il riquadro MODEL FR172J
mest, minn, _ = cornice(rosso_forte, (655, 672), (866, 882), (710, 728), (815, 833))


# ------------------------------------------------------------------ gli strati vettorializzati
def potrace(bw, x0, y0, colore, turd):
    with tempfile.TemporaryDirectory() as t:
        pbm = os.path.join(t, 'a.pbm')
        Image.fromarray((~bw * 255).astype(np.uint8)).convert('1').save(pbm)
        svg = subprocess.run(['potrace', pbm, '-s', '-o', '-', '--turdsize', str(turd), '--alphamax', '1.15', '--opttolerance', '0.4', '-u', '1'],
                             capture_output=True, text=True, check=True).stdout
    gg = re.search(r'<g transform="([^"]+)"[^>]*>(.*?)</g>', svg, re.S)
    tr, paths = gg.group(1).replace('translate(0.000000,', 'translate(0,'), gg.group(2)
    paths = re.sub(r'\s+', ' ', paths).replace('fill="#000000"', '')
    return (f'<g style="fill:{colore}"><g transform="translate({x0},{y0}) scale({1 / INGR:.6f})"><g transform="{tr}">{paths}</g></g></g>',
            paths.count('<path'))

def strato(box, classe, colore, soglia=70, turd=10, sfoca=0.7, campo=None, locale=None, restauro=None):
    """lo strato di un colore dentro un riquadro: l'inchiostro di quella classe, ingrandito e sfocato
    (i bordi morbidi della scansione diventano contorni lisci), alla soglia data. campo: la misura
    dell'inchiostro, se non e' la forza (per i rossi sbiaditi, quanto il pixel e' rosso).
    locale=(finestra, frazione): la soglia e' una frazione dell'inchiostro piu' forte li' attorno
    (a meta' altezza del bordo): una lettera sbiadita tiene il suo spessore, gli occhielli restano
    aperti; "soglia" e' allora il minimo (sotto, e' carta)"""
    x0, y0, x1, y1 = box
    campo = forza if campo is None else campo
    f = np.where(classe[y0:y1, x0:x1], campo[y0:y1, x0:x1], 0).clip(0, 255).astype(np.uint8)
    dim = ((x1 - x0) * INGR, (y1 - y0) * INGR)
    big = np.array(Image.fromarray(f).resize(dim, Image.LANCZOS if locale else Image.BILINEAR).filter(ImageFilter.GaussianBlur(INGR * sfoca))).astype(float)
    if locale:
        k, fr = locale
        mx = np.array(Image.fromarray(f).filter(ImageFilter.MaxFilter(k)).resize(dim, Image.BILINEAR)).astype(float)
        bw = big > np.maximum(mx * fr, soglia)
    else:
        bw = big > soglia
    if restauro:
        # come nuova: la chiusura (dilata e restringe) salda le lettere interrotte e chiude i buchi
        # bianchi dell'usura; l'apertura (restringe e dilata) toglie le sbavature e i grumi sul bordo
        im = Image.fromarray((bw * 255).astype(np.uint8))
        kc, ko = restauro[:2]
        if kc: im = im.filter(ImageFilter.MaxFilter(kc)).filter(ImageFilter.MinFilter(kc))
        if ko: im = im.filter(ImageFilter.MinFilter(ko)).filter(ImageFilter.MaxFilter(ko))
        bw = np.array(im) > 127
        if len(restauro) > 2 and restauro[2]:
            # chiusura solo verticale (una fascia d'usura orizzontale, come ai piedi di MANUAL):
            # salda dall'alto in basso senza attaccare le lettere fra loro
            kv = restauro[2] // 2
            def scorri(a, op):
                out = a.copy()
                for d in range(1, kv + 1):
                    out = op(out, np.roll(a, d, 0)); out = op(out, np.roll(a, -d, 0))
                return out
            bw = scorri(scorri(bw, np.logical_or), np.logical_and)
    svg, n = potrace(bw, x0, y0, colore, turd * INGR * INGR)
    return svg, n

strati = []
def aggiungi(nome, *a, **k):
    svg, n = strato(*a, **k); strati.append(svg); print(f'{nome}: {n} tracciati')

# logo dell'aeroclub: blu, rosso, la rotta grigia chiara, la scritta nera
LOGO = (0, 10, 395, 105)
aggiungi('logo grigio', LOGO, NEUTRO_M & (lum >= 120) & (lum < 225), AV_GRIGIO, soglia=40, turd=3, sfoca=0.5)
aggiungi('logo blu', LOGO, BLU_M, AV_BLU, turd=3, sfoca=0.5)
aggiungi('logo rosso', LOGO, ROSSO_M, AV_ROSSO, turd=3, sfoca=0.5)
aggiungi('logo nero', LOGO, NEUTRO_M & (lum < 120), AV_NERO, soglia=90, turd=2, sfoca=0.5)
# logo Cessna: la parola rossa e la freccia ardesia
# restauro=(chiusura, apertura) in px dell'ingrandimento (INGR = 6 px per px della scansione)
aggiungi('Cessna', (295, 250, 525, 410), ROSSO_M, ROSSO, soglia=55, turd=6, sfoca=0.9, restauro=(19, 7))
aggiungi('freccia', (360, 250, 485, 350), ~ROSSO_M, ARDESIA, soglia=65, turd=8, sfoca=0.9, restauro=(13, 5))
aggiungi('REIMS ROCKET', (605, 415, 930, 660), np.ones_like(BLU_M), BLU, soglia=75, turd=14, sfoca=1.0, restauro=(19, 13))

# le bandierine: triangoli misurati sulla scansione (vertice sinistro alto, punta, vertice sinistro basso)
BANDIERE = [(ROSSO, [[736, 1159.5], [815, 1187.5], [736, 1185.0]]),
            (BLU, [[820, 1165.5], [897, 1190.0], [820, 1187.0]]),
            (ROSSO, [[821, 1187.5], [898, 1215.5], [821, 1213.0]])]
forme = (f'<g style="fill:{ROSSO}"><path style="fill-rule:evenodd" d="{d_quad(est)} {d_quad(inn[::-1])}"/>'
         + f'<path style="fill-rule:evenodd" d="{d_quad(mest)} {d_quad(minn[::-1])}"/></g>'
         + f'<g style="fill:{BLU}">' + ''.join(f'<path d="{d_quad(q)}"/>' for q in barra) + '</g>'
         + ''.join(f'<g style="fill:{c}"><path d="{d_quad(q)}"/></g>' for c, q in BANDIERE))

print('cornice esterna', est, '\ninterna', inn)
print('barra', [np.polyval(bs, y) for y in (TB, BB)], [np.polyval(bd, y) for y in (TB, BB)])
print('modello', mest, minn)

f = f'{R}/tools/afm-rec/{ID}/pagine/copertina.json'
p = json.load(open(f)) if os.path.exists(f) else {}
# i motti: parole dai gruppi del rosso (anche il rosa sbiadito), larghezze fisse; le altre righe
# (I-CCAF, l'avviso) le scrive testo.py da testi/copertina.txt, prima di questo script
MOTTI = [(506, 272, 536, 'MORE PEOPLE BUY AND'), (540, 272, 536, 'FLY CESSNA AIRPLANES'), (575, 272, 536, 'THAN ANY OTHER MAKE'),
         (1331, 268, 532, "WORLD'S LARGEST PRO-"), (1365, 268, 532, 'DUCER OF GENERAL'), (1399, 268, 532, 'AVIATION AIRCRAFT'),
         (1435, 268, 532, 'SINCE 1956')]
def parole_rosse(base, x0, x1, gap=11):
    v = ((r_ - (g_ + b_) / 2) > 25)[base - 19:base + 1, x0:x1].any(0); xs = np.where(v)[0]
    gr = [[xs[0], xs[0]]]
    for x in xs[1:]:
        if x - gr[-1][1] > gap: gr.append([x, x])
        else: gr[-1][1] = x
    return [(x0 + int(a), int(b) + 1 - int(a)) for a, b in gr]
motti = []
for base, x0, x1, t in MOTTI:
    g = parole_rosse(base, x0, x1); tok = t.split()
    assert len(g) == len(tok), (t, g)
    # la riga intera come una sola stringa, larga quanto nella scansione: la spaziatura delle lettere
    # e' la stessa per tutta la riga (parola per parola le parole venivano stirate diversamente)
    motti.append(['riga', 'motto', base, [[g[0][0], t, g[-1][0] + g[-1][1] - g[0][0]]], {'fissa': True}])
righe = [e for e in p.get('el', []) if e[0] == 'riga' and e[1] not in ('motto', 'avviso', 'codice', 'titcop', 'modello')] + motti
# FLIGHT MANUAL e MODEL FR172J: testo vero (il disegno della scansione ha le lettere consumate, con
# intacchi e piedi spezzati), ogni riga larga quanto nella scansione
righe += [['riga', 'titcop', 1309, [[628, 'FLIGHT', 276]], {'fissa': True}],
          ['riga', 'titcop', 1390, [[626, 'MANUAL', 277]], {'fissa': True}],
          ['riga', 'modello', 788, [[681, 'MODEL FR172J', 172]], {'fissa': True}]]
# il codice del documento sotto la cornice: testo vero (nella scansione e' consumato a meta')
righe.append(['riga', 'codice', 1531, [[377, 'D967-13', 53]], {'fissa': True}])
meta = {'pdf': PDF, 'n': 'cover', 'w': W, 'h': H, 'rot': 0, 'stato': 'ricostruita', 'intera': True, 'colori': True,
        'figure': [{'figura': 'Copertina', 'metodo': "cornice, barra e riquadri: poligoni misurati sulla scansione; loghi, motti e titoli a disegno: strati di colore separati e vettorializzati con potrace dalla scansione ingrandita 6 volte, nelle tinte restaurate (tools/afm-rec/afm-ccaf/costruisci/copertina.py); I-CCAF, i motti e l'avviso ENGLISH TRANSLATION: testo vero."}]}
el = righe + [['svg', forme + ''.join(strati)]]
s = '{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in meta.items()) + ',\n  "el": [\n' + ',\n'.join('    ' + json.dumps(e, ensure_ascii=False) for e in el) + '\n  ]\n}\n'
open(f, 'w').write(s)
print('scritta', f)
