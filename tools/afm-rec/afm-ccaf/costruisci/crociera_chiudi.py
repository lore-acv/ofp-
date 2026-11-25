#!/usr/bin/env python3
"""I numeri delle tabelle di crociera che la verifica non conferma due volte: ritagli da guardare
e la seconda conferma proposta.

Per ogni numero aperto (rapporto della verifica, prova normale) ritaglia la cella dalla
scansione girata, ingrandita, col valore della ricostruita accanto, e propone la seconda
conferma: la relazione aritmetica della riga che lo ricava dalle altre celle (km/h, kts e
MPH; galloni e litri; autonomia = 46 / galloni; km = autonomia * km/h; NM = km / 1,852;
in Hg = mb / 33,86), o la lettura dello strato di testo del PDF. Le voci si scrivono in
controlli.json solo dopo aver guardato i ritagli (opzione --scrivi), con i valori eventualmente
corretti a mano (--valore riga:x=valore).

    /usr/bin/python3 crociera_chiudi.py <pagina> <uscita.png> [--scrivi] [--valore 716:365=60 ...]
"""
import json, re, sys
from PIL import Image, ImageDraw
R = '/home/user/ofp-'
N, OUT = sys.argv[1], sys.argv[2]
SCRIVI = '--scrivi' in sys.argv
VAL = {}
a = sys.argv[3:]
for i, v in enumerate(a):
    if v == '--valore':
        for q in a[i + 1:]:
            if q.startswith('--'): break
            k, val = q.split('='); VAL[k] = val
p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/{N}.json'))
libro = open(f'{R}/data/afm/afm-ccaf/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
img = Image.open(f'{R}/{m.group(1)}').convert('L').rotate(-90, expand=True)
md = open(f'{R}/tools/afm-rec/VERIFICA.md').read()
aperti = re.findall(r'^\| %s \| ([0-9.]+) \| numero[^|]*\| ([^|]*) \| ([^|]*) \|' % re.escape(N), md, re.M)
num = lambda s: float(s.replace(',', '.').rstrip('.')) if re.fullmatch(r'\d+(,\d)?\.?', s or '') else None
dati = [e for e in p['el'] if e[0] == 'riga' and e[1] == 'cella' and len(e[3]) >= 10]
# la colonna di ogni cella: dall'ordine delle x nelle righe complete (11 o 12 celle)
COL = ['RPM', 'mb', 'inHg', 'BHP', 'kmh', 'kts', 'MPH', 'gal', 'litri', 'ore', 'km', 'NM']
def colonne(e):
    w = e[3]
    return dict(zip(COL if len(w) == 12 else COL[1:], w))
def seconda(e, nome):
    c = {k: num(w[1]) for k, w in colonne(e).items()}
    f = lambda v: f'{v:.1f}'.replace('.', ',')
    try:
        if nome == 'kmh': return f"la riga torna: {f(c['kts'])} kts x 1,852 = {f(c['kts'] * 1.852)} km/h, {f(c['MPH'])} MPH x 1,609 = {f(c['MPH'] * 1.609)} km/h"
        if nome == 'kts': return f"la riga torna: {f(c['kmh'])} km/h / 1,852 = {f(c['kmh'] / 1.852)} kts"
        if nome == 'MPH': return f"la riga torna: {f(c['kmh'])} km/h / 1,609 = {f(c['kmh'] / 1.609)} MPH"
        if nome == 'gal': return f"la riga torna: {f(c['litri'])} litri / 3,785 = {c['litri'] / 3.785:.2f} galloni; 46 galloni / {f(c['gal'])} = {46 / c['gal']:.2f} ore ({f(c['ore'])} stampate)"
        if nome == 'litri': return f"la riga torna: {f(c['gal'])} galloni x 3,785 = {c['gal'] * 3.785:.2f} litri"
        if nome == 'ore': return f"la riga torna: 46 galloni / {f(c['gal'])} galloni all'ora = {46 / c['gal']:.2f} ore"
        if nome == 'km': return f"la riga torna: 46 / {f(c['gal'])} galloni all'ora x {f(c['kmh'])} km/h = {46 / c['gal'] * c['kmh']:.0f} km; {f(c['NM'])} NM x 1,852 = {c['NM'] * 1.852:.0f} km"
        if nome == 'NM': return f"la riga torna: {f(c['km'])} km / 1,852 = {c['km'] / 1.852:.1f} NM"
        if nome == 'mb': return f"la colonna torna: {f(c['inHg'])} in Hg x 33,86 = {c['inHg'] * 33.864:.0f} mb"
        if nome == 'inHg': return f"la colonna torna: {f(c['mb'])} mb / 33,86 = {c['mb'] / 33.864:.1f} in Hg"
    except (TypeError, KeyError, ZeroDivisionError):
        return None
    return None
# lo strato di testo del PDF (la pagina del PDF e' gia' di traverso)
import pymupdf
mappa = json.load(open(f'{R}/tools/afm/afm-ccaf.json'))
pg = pymupdf.open(f'{R}/{mappa["pdf"]}')[p['pdf'] - 1]
rr = pg.rect; sc = min(img.width / rr.width, img.height / rr.height)
strato = [(w[0] * sc, w[1] * sc, w[2] * sc, w[3] * sc, w[4]) for w in pg.get_text('words')]
def pdf(x0, y0, x1, y1):
    c = [q for q in strato if x0 - 3 <= (q[0] + q[2]) / 2 <= x1 + 3 and y0 - 3 <= (q[1] + q[3]) / 2 <= y1 + 3]
    return ''.join(q[4] for q in sorted(c)).replace('.', ',')
voci, tiles = [], []
for base, letto, val in aperti:
    base = float(base); val = val.strip()
    e, w = None, None
    for q in p['el']:
        if q[0] == 'riga' and abs(q[2] - base) < 1.5:
            for ww in q[3]:
                if ww[1] == val: e, w = q, ww
    if not w: print('non trovato', base, val); continue
    k = f'{int(base)}:{w[0]}'
    nome = next((n for n, ww in colonne(e).items() if ww is w), None) if e in dati else None
    sec = seconda(e, nome) if nome else None
    lp = pdf(w[0], base - 12, w[0] + w[2], base + 2)
    if lp == val and not sec: sec = f"lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge {lp}"
    elif lp == val: sec += f"; e lo strato di testo del PDF legge {lp}"
    valore = VAL.get(k, val)
    voci.append({'riga': int(base) if base == int(base) else base, 'x': w[0], 'valore': valore, 'come': f"OCR legge {letto.strip()}; a vista: {valore}", 'seconda': sec or ''})
    t = img.crop((w[0] - 10, int(base) - 16, w[0] + w[2] + 10, int(base) + 5)); t = t.resize((t.width * 4, t.height * 4))
    T = Image.new('L', (max(t.width, 200), t.height + 16), 255); T.paste(t, (0, 0))
    ImageDraw.Draw(T).text((2, t.height + 2), f'{k} {val}  {nome or ""}  {"OK" if sec else "--"}', fill=0)
    tiles.append(T)
    print(k, val, nome, '|', sec)
W_ = 6; H_ = (len(tiles) + W_ - 1) // W_; tw = max(t.width for t in tiles); th = max(t.height for t in tiles)
S_ = Image.new('L', (W_ * (tw + 4), H_ * (th + 4)), 180)
for i, t in enumerate(tiles): S_.paste(t, ((i % W_) * (tw + 4), (i // W_) * (th + 4)))
S_.save(OUT)
if SCRIVI:
    f = f'{R}/tools/afm-rec/afm-ccaf/controlli.json'; c = json.load(open(f))
    d = c.setdefault(N, {}); d['letti'] = [v for v in d.get('letti', []) if not any(v['riga'] == q['riga'] and v['x'] == q['x'] for q in voci)] + voci
    open(f, 'w').write(json.dumps(c, ensure_ascii=False, indent=2) + '\n')
    print('scritte', len(voci), 'voci')
