#!/usr/bin/env python3
"""CORREZIONI A MANO DI UNA PAGINA (dopo averle guardate sulla scansione)

    /usr/bin/python3 tools/afm-rec/correggi.py afm-ccaf 1-8 'riga:vecchia=nuova' ... [--x riga:parola=x] [--via-figure]

riga:vecchia=nuova  cambia il testo di una parola sulla riga con quella base
riga:vecchia=x:nuova cambia anche la x (la parola si rimisura)
--pulisci           toglie i filetti e i puntini della bozza (bozza.py li trova anche nella sporcizia)
--stato S           imposta lo stato (ricostruita)
"""
import json, os, sys
ID, N = sys.argv[1], sys.argv[2]
f = f'{os.getcwd()}/tools/afm-rec/{ID}/pagine/{N}.json'
p = json.load(open(f))
args = sys.argv[3:]
i = 0
while i < len(args):
    a = args[i]
    if a == '--pulisci':
        p['el'] = [e for e in p['el'] if e[0] not in ('linea', 'punti')]
    elif a == '--stato':
        i += 1; p['stato'] = args[i]
    else:
        riga, resto = a.split(':', 1)
        vecchia, nuova = resto.split('=', 1)
        x = None
        if ':' in nuova and nuova.split(':', 1)[0].isdigit():
            x, nuova = nuova.split(':', 1); x = int(x)
        fatto = False
        for e in p['el']:
            if e[0] == 'riga' and str(e[2]) == riga:
                for w in e[3]:
                    if w[1] == vecchia and not fatto:
                        w[:] = [x if x is not None else w[0], nuova]; fatto = True
        if not fatto:
            sys.exit(f'non trovata: {a}')
    i += 1
p.setdefault('figure', [])
p = {k: p[k] for k in ['pdf', 'n', 'w', 'h', 'rot', 'stato', 'figure', 'el'] if k in p}
righe = ['    ' + json.dumps(e, ensure_ascii=False) for e in p['el']]
open(f, 'w').write('{\n' + ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in p.items() if k != 'el') + ',\n  "el": [\n' + ',\n'.join(righe) + '\n  ]\n}\n')
print(f, 'ok')
