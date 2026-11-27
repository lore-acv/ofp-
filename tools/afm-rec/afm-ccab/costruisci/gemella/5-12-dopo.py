# 5-12 dopo gem.sh: l'intestazione di destra è stampata 3-4 px più in alto di quella di sinistra (righe della pagina)
f='/home/user/ofp-/tools/afm-rec/afm-ccab/pagine/5-12.json'; s=open(f,encoding='utf-8').read()
for a,b in [('["riga", "testo", 484, [[1115, "Reims"','["riga", "testo", 480, [[1115, "Reims"'),
            ('["riga", "testo", 518, [[1116, "Reims,"','["riga", "testo", 516, [[1116, "Reims,"')]:
    assert s.count(a)==1,a; s=s.replace(a,b)
open(f,'w',encoding='utf-8').write(s)
import json
p=json.load(open(f,encoding='utf-8'))
p['figure']=[{"figura": "Figura 5-7 (Maximum glide)", "metodo": "cornice, griglia, fascia di planata a punti e aeroplano: disegno al tratto vettorializzato con potrace dalla scansione di I-CCAB (tratto.py, finestra 368 250 1899 1345); scritte: testo vero, le righe della 5-12 di I-CCAF portate sulla scansione di I-CCAB e riagganciate all'inchiostro (gemella.py, testo.py)."}]
s='{\n'+',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k,v in p.items() if k!='el')+',\n  "el": [\n'+',\n'.join('    '+json.dumps(e,ensure_ascii=False) for e in p['el'])+'\n  ]\n}\n'
open(f,'w',encoding='utf-8').write(s)
