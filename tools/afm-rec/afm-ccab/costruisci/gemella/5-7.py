# 5-7: la taratura dell'anemometro (VC) di I-CCAB è diversa da quella di I-CCAF. Valori letti sulla scansione
# I-CCAB, confermati da Tesseract e dalla conversione km/h -> MPH (/1,609) riga per riga
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sostituisci import sostituisci
C=['790-879','893-980','994-1082','1096-1185','1199-1288','1302-1389','1403-1492','1506-1594','1608-1696','1711-1799','1813-1900']
def riga(basi, vecchi, nuovi):
    return [(b,c,v,n) for b,c,v,n in zip(basi,C,vecchi,nuovi) if v!=n]
L=[]
# flaps up
L+=riga([509,509,509,507,509,507,507,509,509,509,509],'95 105 116 129 143 159 175 192 206 222 238'.split(),'92 98 109 124 138 154 171 187 204 222 241'.split())
L+=riga([583,584,583,584,583,583,583,583,584,584,584],'59 65 72 80 89 99 109 119 128 138 148'.split(),'57 61 68 77 86 96 106 116 127 138 150'.split())
# flaps 20°
L+=riga([823,821,821,821,823,821],'95 103 116 130 145 161'.split(),'85 95 109 124 138 154'.split())
L+=riga([895,895,895,895,895,894],'59 64 72 81 90 100'.split(),'53 59 68 77 86 96'.split())
# flaps 40°
L+=riga([1136,1134,1134,1136,1136,1134],'95 103 116 132 146 163'.split(),'89 101 116 132 148 164'.split())
L+=riga([1209,1209,1208,1209,1208,1208],'59 64 72 82 91 101'.split(),'55 63 72 82 92 102'.split())
sostituisci('5-7', L)
