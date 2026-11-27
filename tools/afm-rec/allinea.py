#!/usr/bin/env python3
"""LE RIGHE "FISSA" SULLA LORO BASE VERA, DAL CONFRONTO CON LA SCANSIONE

Le righe fissa (celle delle tabelle, scritte messe da uno script) e quelle dell'intestazione delle pagine
girate (libro) non passano da ribasa.py. Quando
la loro base viene da un'altra scansione (gemella.py) o da una stima, puo' sbagliare di qualche px.
Per ogni parola si cerca lo spostamento verticale (e un poco orizzontale) che fa combaciare il suo
inchiostro nella pagina disegnata (disegna.mjs) con quello della scansione; la riga si sposta della
mediana se le sue parole sono d'accordo (entro 2 px) e lo spostamento e' di 2 px o piu'.

    node tools/afm-rec/disegna.mjs afm-ccab 5-7 /tmp/r.png
    /usr/bin/python3 -I tools/afm-rec/allinea.py afm-ccab 5-7 /tmp/r.png
"""
import numpy as np, json, re, sys
from PIL import Image
R='/home/user/ofp-'; ID, n, rp = sys.argv[1], sys.argv[2], sys.argv[3]
f=f'{R}/tools/afm-rec/{ID}/pagine/{n}.json'
l=open(f'{R}/data/afm/{ID}/libro.html').read()
st=json.load(open(f'{R}/tools/afm-rec/{ID}/stile.json'))['ruoli']
p=json.load(open(f))
m=re.search(r'data-pdf="%d"[^>]*>(?:<i[^>]*></i>)*<img[^>]*data-s2="([^"]+)"'%p['pdf'],l)
a=Image.open(f'{R}/{m.group(1)}').convert('L'); b=Image.open(rp).convert('L')
# l'intestazione delle pagine girate (righe "libro") sta nel riferimento del libro: la scansione com'e'
a0=np.array(a)<140; b0=np.array(b.resize(a.size) if b.size[0]<b.size[1] else b.rotate(90,expand=True).resize(a.size))<140
if p.get('rot')==-90: a=a.rotate(-90,expand=True)
if b.size!=a.size: b=b.rotate(-90,expand=True)
a=np.array(a)<140; b=np.array(b.resize(a.shape[::-1]))<140
mossi=0
for e in p['el']:
    if e[0]!='riga' or len(e)<5 or not (e[4].get('fissa') or e[4].get('libro')) or e[4].get('ang'): continue
    sa, sb = (a0, b0) if e[4].get('libro') else (a, b)
    c=e[4].get('c') or st[e[1]]['c']; dd=[]
    for w in e[3]:
        if len(w)<3 or w[2]<4: continue
        x0,x1,y0,y1=int(w[0])-1,int(w[0]+w[2])+1,int(e[2]-c*1.15),int(e[2])+int(c*0.3)
        B=sb[y0:y1,x0:x1]
        if B.sum()<8: continue
        best=(-1,0)
        for dy in range(-12,13):
            for dx in range(-3,4):
                A=sa[y0+dy:y1+dy,x0+dx:x1+dx]; s=(A&B).sum()/max(1,(A|B).sum())
                if s>best[0]+1e-9 or (abs(s-best[0])<1e-9 and abs(dy)<abs(best[1])): best=(s,dy)
        if best[0]>0.25: dd.append(best[1])
    if not dd: continue
    md=int(np.median(dd))
    if abs(md)>=2 and max(dd)-min(dd)<=2:
        e[2]=round(e[2]+md); mossi+=1
s='{\n'+',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k,v in p.items() if k!='el')+',\n  "el": [\n'+',\n'.join('    '+json.dumps(e,ensure_ascii=False) for e in p['el'])+'\n  ]\n}\n'
open(f,'w').write(s); print(f'{n}: {mossi} righe riallineate')
