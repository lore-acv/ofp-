#!/bin/sh
# gemella.sh <pagina>: una pagina di I-CCAB dalla gemella di I-CCAF (pagine senza disegno al tratto)
#   gemella.py (trasporto) -> <pagina>.py qui (correzioni: valori diversi in I-CCAB, testi dell'edizione 2)
#   -> finestre.py -> testo.py -> misura/ribasa/misura -> rifila.py (filetti) -> disegna + allinea (due volte)
# Le tabelle di crociera (5-2 ... 5-6) non passano di qui: costruisci/crociera.py.
#   sh tools/afm-rec/afm-ccab/costruisci/gemella/gemella.sh 5-9
cd /home/user/ofp-
P="/usr/bin/python3 -I"; n=$1; Q=tools/afm-rec/afm-ccab/costruisci/gemella; T=${TMPDIR:-/tmp}/afm-rec-$n.png
$P tools/afm-rec/gemella.py afm-ccaf afm-ccab $n --edizione 2 | grep -v "^  pagina\|^  intestazione\|poco coincidente"
[ -f $Q/$n.py ] && $P $Q/$n.py
$P tools/afm-rec/finestre.py afm-ccab $n
$P tools/afm-rec/testo.py afm-ccab $n tools/afm-rec/afm-ccab/testi/$n.txt 60 2400 2>&1 | grep -v "^  dubbio" || exit 1
$P tools/afm-rec/misura.py afm-ccab $n >/dev/null; $P tools/afm-rec/ribasa.py afm-ccab $n | grep -v gruppo | tail -1; $P tools/afm-rec/misura.py afm-ccab $n | tail -1
$P -c "
import json;f='tools/afm-rec/afm-ccab/pagine/$n.json';p=json.load(open(f));p['stato']='ricostruita'
s='{\n'+',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k,v in p.items() if k!='el')+',\n  \"el\": [\n'+',\n'.join('    '+json.dumps(e,ensure_ascii=False) for e in p['el'])+'\n  ]\n}\n';open(f,'w').write(s)"
$P tools/afm-rec/rifila.py afm-ccab $n | grep -v "^    "
for i in 1 2; do node tools/afm-rec/disegna.mjs afm-ccab $n $T && $P tools/afm-rec/allinea.py afm-ccab $n $T; done
rm -f $T
