#!/usr/bin/env python3
"""CHIUDE A VISTA le differenze aperte di una pagina, DOPO averle guardate
(vista.py): scrive in controlli.json ogni numero non confermato con il valore
della ricostruita e la nota di chi ha guardato. Da usare solo quando il
ritaglio mostra lo stesso valore della ricostruita, per tutti.

    /usr/bin/python3 tools/afm-rec/chiudi.py afm-ccaf <pagina> "<nota>" [--medio]
"""
import json, os, sys
ID, N, NOTA = sys.argv[1], sys.argv[2], sys.argv[3]
SUFF = '-medio' if '--medio' in sys.argv else '-pieno' if '--pieno' in sys.argv else ''
R = os.getcwd()
v = [e for e in json.load(open(f'{R}/tools/afm-rec/{ID}/verifica{SUFF}.json')) if e['n'] == N][0]
f = f'{R}/tools/afm-rec/{ID}/controlli.json'; c = json.load(open(f))
letti = c.setdefault(N, {}).setdefault('letti', [])
for d in v['dif']:
    if not any(l['riga'] == d['riga'] and l['x'] == d['x'] and l['valore'] == d['ricostruito'] for l in letti):
        letti.append({'riga': d['riga'], 'x': d['x'], 'valore': d['ricostruito'], 'come': f'OCR legge {d["originale"]!r}; a vista: {d["ricostruito"]} ({NOTA})'})
json.dump(c, open(f, 'w'), ensure_ascii=False, indent=2)
print(N, len(v['dif']), 'chiuse a vista')
