#!/usr/bin/env python3
"""Chiusure ricorrenti delle tabelle della sezione V: le temperature standard delle quote, il numero
di pagina, l'edizione, i gradi dei flap. Aggiunge a controlli.json le voci dei numeri aperti
(rapporto della prova normale) che riconosce; stampa gli altri.

    /usr/bin/python3 chiudi_quota.py <pagina> <pdf> <pagina prima> <pagina dopo>
"""
import json, re, sys
R = '/home/user/ofp-'
N, PDF, PRIMA, DOPO = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
p = json.load(open(f'{R}/tools/afm-rec/afm-ccaf/pagine/{N}.json'))
md = open(f'{R}/tools/afm-rec/VERIFICA.md').read()
aperti = re.findall(r'^\| %s \| ([0-9.]+) \| numero[^|]*\| ([^|]*) \| ([^|]*) \|' % re.escape(N), md, re.M)
ISA = "atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C, 15000 ft -15°C"
SEC = {'+15°C': ISA, '+10°C': ISA, '+5°C': ISA, '0°C': ISA, '-5°C': ISA, '-15°C': ISA,
       N: f"posizione nel PDF: pagina {PDF}, fra {PRIMA} e {DOPO} (mappa tools/afm/afm-ccaf.json)",
       '3': "tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate)",
       '40°': "DATI-AFM.md: posizioni dei flap UP / 20° / 40°; il segno in apice e' il grado",
       '10°': "le procedure di decollo (4-4, 4-10) usano i flap a 10° per il decollo corto; il segno in apice e' il grado"}
f = f'{R}/tools/afm-rec/afm-ccaf/controlli.json'; c = json.load(open(f)); d = c.setdefault(N, {}); L = d.setdefault('letti', [])
fatti = set()
for b, letto, val in aperti:
    val = val.strip(); b = float(b)
    if val not in SEC: print('da chiudere a mano:', b, val, '(OCR', letto.strip() + ')'); continue
    for e in p['el']:
        if e[0] == 'riga' and abs(e[2] - b) < 1.5:
            for w in e[3]:
                if w[1] == val and (e[2], w[0]) not in fatti:
                    fatti.add((e[2], w[0]))
                    L.append({'riga': e[2], 'x': w[0], 'valore': val, 'come': f'OCR legge {letto.strip()}; a vista: {val}', 'seconda': SEC[val]})
open(f, 'w').write(json.dumps(c, ensure_ascii=False, indent=2) + '\n')
print(N, len(fatti), 'chiusi')
