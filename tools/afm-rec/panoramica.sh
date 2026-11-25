#!/bin/sh
# panoramica.sh <id> <pagina>: le righe della bozza e le parole dubbie, per correggere a vista
cd "$(dirname "$0")/../.."
/usr/bin/python3 -I -c "
import json; p=json.load(open('tools/afm-rec/$1/pagine/$2.json'))
for e in p['el']:
    if e[0]=='riga': print(e[2], e[1], ' | '.join('%d:%s'%(w[0],w[1]) for w in e[3]))
print(sum(1 for e in p['el'] if e[0]!='riga'), 'altri elementi')"
/usr/bin/python3 -I tools/afm-rec/dubbi.py "$1" "$2" /tmp/dubbi-$2.png | tail -n +2
