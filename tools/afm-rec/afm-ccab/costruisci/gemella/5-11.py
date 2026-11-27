# 5-11: VY (VI di salita) di I-CCAB, diverse da I-CCAF; lette sulla scansione, confermate da Tesseract e dalle conversioni
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sostituisci import sostituisci
C=['549-655','884-996','1227-1336','1572-1681']
B=[[(669,699,727),(670,699,727),(670,699,729),(672,699,729)],
   [(817,846,874),(819,848,876),(819,848,876),(819,849,876)],
   [(966,995,1023),(966,996,1023),(968,996,1025),(968,998,1027)]]
VEC=[[(137,74,85),(135,73,84),(134,72,83),(132,71,82)],[(132,71,82),(130,70,81),(129,70,80),(127,69,79)],[(129,70,80),(126,68,78),(124,67,77),(122,66,76)]]
NUO=[[(153,83,95),(146,79,91),(140,76,87),(134,72,83)],[(148,80,92),(142,76,88),(137,74,85),(130,70,81)],[(142,76,88),(137,74,85),(132,71,82),(127,69,79)]]
L=[]
for r in range(3):
    for c in range(4):
        for k,u in enumerate(('km/h','kts','MPH')):
            v,n=f'{VEC[r][c][k]} {u}',f'{NUO[r][c][k]} {u}'
            if v!=n: L.append((B[r][c][k],C[c],v,n))
sostituisci('5-11', L)
