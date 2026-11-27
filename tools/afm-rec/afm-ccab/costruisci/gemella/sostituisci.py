# sostituisci(n, [(base, finestra, vecchio, nuovo), ...]): cambia il testo delle righe di testi/<n>.txt
# individuate da base e finestra (la riga deve esserci una volta sola)
import re
def sostituisci(n, lista):
    f=f'/home/user/ofp-/tools/afm-rec/afm-ccab/testi/{n}.txt'; righe=open(f,encoding='utf-8').read().split('\n')
    for b,fin,v,nu in lista:
        k=[i for i,r in enumerate(righe) if ' | ' in r and r.split()[0]==str(b) and fin in r.split(' | ')[0].split() and r.split(' | ',1)[1]==v]
        assert len(k)==1,(n,b,fin,v,k)
        righe[k[0]]=righe[k[0]][:-len(v)]+nu
    open(f,'w',encoding='utf-8').write('\n'.join(righe))
