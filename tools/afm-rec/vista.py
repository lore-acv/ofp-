#!/usr/bin/env python3
"""LE DIFFERENZE APERTE DA GUARDARE A VISTA

Per ogni numero che la verifica non ha confermato (verifica[-x].json, "dif"),
ritaglia dalla scansione la riga intorno alla parola, ingrandita, con il
valore ricostruito accanto. Chi guarda decide; quello che legge va in
controlli.json ("letti").

    /usr/bin/python3 tools/afm-rec/vista.py afm-ccaf <pagina> <uscita.png> [--medio]
"""
import json, os, re, sys
from PIL import Image, ImageDraw, ImageFont
ID, N, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
SUFF = '-medio' if '--medio' in sys.argv else '-pieno' if '--pieno' in sys.argv else ''
R = os.getcwd()
v = [e for e in json.load(open(f'{R}/tools/afm-rec/{ID}/verifica{SUFF}.json')) if e['n'] == N][0]
p = json.load(open(f'{R}/tools/afm-rec/{ID}/pagine/{N}.json'))
libro = open(f'{R}/data/afm/{ID}/libro.html', encoding='utf-8').read()
m = re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"' % p['pdf'], libro)
img = Image.open(f'{R}/{m.group(1)}').convert('RGB')
if p.get('rot') == -90:
    img = img.rotate(-90, expand=True)
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
pezzi = []
for d in v['dif']:
    x, y = int(d['x']), int(d['riga'])
    c = img.crop((max(0, x - 90), y - 36, min(img.width, x + 150), y + 16)).resize((240 * 3, 52 * 3), Image.LANCZOS)
    r = Image.new('RGB', (c.width + 20, c.height + 34), 'white'); r.paste(c, (10, 4))
    ImageDraw.Draw(r).text((10, c.height + 8), f'y {y} x {x}: ricostruito "{d["ricostruito"]}"  (OCR "{d["originale"]}")', fill='black', font=F)
    ImageDraw.Draw(r).line((10 + 90 * 3, 4, 10 + 90 * 3, c.height + 4), fill=(255, 0, 0))
    pezzi.append(r)
if pezzi:
    sh = Image.new('RGB', (max(q.width for q in pezzi), sum(q.height + 4 for q in pezzi)), (200, 200, 200)); y = 0
    for q in pezzi:
        sh.paste(q, (0, y)); y += q.height + 4
    sh.save(OUT)
print(N, len(pezzi), 'da guardare')
