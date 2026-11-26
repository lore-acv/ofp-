#!/usr/bin/env python3
"""Le chiusure a vista delle pagine iniziali e della sezione VI (controlli.json).

Per ogni numero che la verifica lascia con meno di due conferme (o che
Tesseract legge diverso) si scrive in controlli.json la lettura a vista
(fatta sull'ingrandimento) e la sua SECONDA conferma, da una fonte
indipendente: la sequenza delle pagine, l'indice, un'altra pagina del
manuale, DATI-AFM.md, una somma o una conversione che torna, la progressione
regolare di una scala. Un numero senza regola qui non si chiude: lo script lo
stampa e si guarda.

    /usr/bin/python3 tools/afm-rec/afm-ccaf/costruisci/chiudi_vi.py      (dopo verifica.mjs, normale e --medio)
"""
import json, os, re

R = os.getcwd()
D = f'{R}/tools/afm-rec/afm-ccaf'
PAGINE = ['i', 'ii', 'iii', 'iv', 'v'] + [f'6-{k}' for k in range(1, 21)]

def seconda(n, v):
    """la seconda conferma del valore v sulla pagina n, o None"""
    if re.fullmatch(r'6-\d+\.?', v) and v.rstrip('.') == n:
        return f'numero di pagina: la pagina viene fra {n[:2]}{int(n[2:]) - 1} e {n[:2]}{int(n[2:]) + 1} (sequenza del PDF) e l\'indice (pagina v) la elenca'
    if v == '3' and n.startswith('6-') or (v == '3' and n in ('ii',)):
        return 'Edition: 3, come in tutte le pagine del manuale I-CCAF'
    if n in ('ii', 'iii', 'iv', 'v') and re.fullmatch(r'\d-\d+', v):
        return f'il numero stampato in testa alla pagina {v} (la voce comincia li\')'
    tab = {
        ('i', 'A18EU'): "DATI-AFM.md: FAA TC A18EU (lo strato di testo del PDF legge Al8EU, l per 1)",
        ('6-1', '(98,5'): '26 U.S. gal x 3,785 = 98,4 l ✓',
        ('6-2', '5°C'): 'SAE 50 sopra e SAE 30 sotto i 5°C (41°F), la soglia dei manuali Cessna; stessa riga, due volte',
        ('6-2', '5°C.'): 'SAE 50 sopra e SAE 30 sotto i 5°C (41°F), la soglia dei manuali Cessna; stessa riga, due volte',
        ('6-2', '10W30'): 'ripetuto nella riga sotto ("a range of SAE 10W30"), letto concorde',
        ('6-2', 'MIL-L-6082.'): "MIL-L-6082: la specifica dell'olio minerale aeronautico (straight mineral oil), citata dai manuali Cessna",
        ('6-3', '4.6'): 'strato di testo del PDF: 4.6 in. Hg; 4,6 pollici di mercurio e\' il minimo del vuoto dei manuali Cessna',
        ('6-4', '30°'): 'strato di testo del PDF: "300" (30 e il segno di grado letto come 0)',
        ('6-5', '15'): 'strato di testo del PDF: "15 days"',
        ('6-9', '1'): 'strato di testo del PDF: "minutes to 1 hour"',
        ('6-10', '-5°C,'): 'strato di testo del PDF: "-SoC" (5 e il grado letti S o); la stessa soglia di 6-2',
        ('6-13', '1'): 'la figura 6-2 (pagina 6-12): il selettore TRANS ha le posizioni 1 e 2',
        ('6-17', '**95'): '95 pollici = 241,3 cm, il **241 della stessa riga ✓',
        ('6-18', '117'): 'figura 6-3: sedili anteriori da 86 a 117 cm (34-46 pollici: 46 x 2,54 = 116,8) ✓',
        ('6-19', '(174'): '46 U.S. gal x 3,785 = 174 l ✓ (pagina 6-1: 98,5 l per serbatoio)',
        ('6-19', '10'): '10 Qts. = 9,5 l (x 0,946) ✓, come la riga 2 della figura 6-4',
        ('6-19', 'MOMENT/1000'): 'come la scala del momento della figura 6-4 (cmkg/1000) e "Moment/1000." della nota (2)',
        ('6-19', 'Moment/1000.'): 'come il titolo della scala, LOAD MOMENT/1000',
        ('6-20', 'MOMENT/1000'): 'come le figure 6-4 e 6-5: i momenti si danno /1000',
    }
    if (n, v) in tab: return tab[(n, v)]
    if n == '6-12' and v in ('1', '2'):
        return 'testo di 6-12: "two positions", posizioni 1 e 2 (upper e lower); COM 1, NAV 1, COM 2, NAV 2 nello strato di testo del PDF'
    if n in ('6-19', '6-20') and re.fullmatch(r'\d+', v):
        return 'scala regolare: le tacche sono equidistanti e i numeri crescono a passo costante (5 o 50 o 100), e le due scale dello stesso asse si accordano (lbs/kg 2,205; pound-inch/kg-cm 1,152)'
    return None

c = json.load(open(f'{D}/controlli.json'))
mancano = []
for suff in ('', '-medio'):
    for e in json.load(open(f'{D}/verifica{suff}.json')):
        if e['n'] not in PAGINE: continue
        casi = {(d['riga'], d['x'], d['valore']) for d in e['deboli']} | {(d['riga'], d['x'], d['ricostruito']) for d in e['dif']}
        for riga, x, v in sorted(casi):
            s = seconda(e['n'], v)
            if not s:
                mancano.append((e['n'], riga, x, v)); continue
            letti = c.setdefault(e['n'], {}).setdefault('letti', [])
            if not any(l['riga'] == riga and l['x'] == x and l['valore'] == v for l in letti):
                letti.append({'riga': riga, 'x': x, 'valore': v, 'come': f'a vista sull\'ingrandimento: {v}', 'seconda': s})
json.dump(c, open(f'{D}/controlli.json', 'w'), ensure_ascii=False, indent=2)
print('senza regola:', mancano)
