# VERIFICA — Flight Manual I-CCAF, anteprima ricostruita

> Generato da `tools/afm-rec/verifica.mjs afm-ccaf` il 2026-11-25. L'anteprima ricostruita **non fa fede**: fa fede il Flight Manual originale (data/afm/).

## Come si verifica una pagina

1. **Righe.** Per ogni riga (e ogni colonna di una riga) si misura dove comincia e dove finisce l'inchiostro, nell'originale e nella ricostruita, alla stessa scala. Coincide se entrambi gli estremi stanno entro 4 px della scansione retina (circa un terzo di millimetro sulla pagina stampata) e la sua linea di base (l'ultima riga dove l'inchiostro e' almeno un quarto del massimo) entro 3 px.
2. **Macchie.** Inchiostro che c'e' solo nell'originale o solo nella ricostruita, tolti gli aloni di un pixel dovuti al disegno diverso delle lettere: ogni macchia di almeno 25 px e' contenuto mancante o in piu'.
3. **Numeri.** Ogni parola con cifre si ritaglia dall'originale e la legge Tesseract da sola; la seconda lettura e' lo strato di testo del PDF (per I-CCAF l'OCR di Acrobat, indipendente). Dove le letture automatiche sbagliano decide il controllo a vista, annotato in `tools/afm-rec/afm-ccaf/controlli.json`. Nelle sezioni 2, 3, 5 e 6 (limitazioni, emergenze, prestazioni, centraggio) ogni numero deve avere **due conferme** indipendenti.
4. **Dati del progetto.** Dove il progetto ha gia' i valori verificati (DATI-AFM.md, tabelle di index.html) si confrontano con la pagina.

3. **Parole.** La spaziatura che porta ogni parola alla larghezza misurata sta fra -0,3 e 0,5 em: fuori, le lettere si sovrappongono o si sparpagliano (la misura ha preso un pezzo della parola, o anche altro). E nessuna parola copre per piu' di un terzo una parola di un'altra riga.

Una pagina e' **verificata** solo con zero differenze aperte (righe fuori posto + macchie + parole strozzate o sfilacciate + numeri non confermati).

"Inchiostro non coincidente" e' solo un'indicazione: misura anche la differenza di disegno fra il font libero e quello originale, e la scansione piu' scura della stampa.

## Pagine

| Pagina | Stato | Righe coincidenti | Macchie | Numeri (conferme) | Differenze aperte | Inchiostro non coincidente | Esito |
|---|---|---|---|---|---|---|---|
| 1-1 | ricostruita | 27/27 | 0 | 8 (8 con 2+ conferme) | 0 | 5.6% | **verificata** |
| 1-2 | ricostruita | 22/22 | 0 | 10 (4 con 2+ conferme) | 0 | 2.5% | **verificata** |
| 1-3 | ricostruita | 40/40 | 0 | 45 (23 con 2+ conferme) | 0 | 12.3% | **verificata** |
| 1-4 | ricostruita | 44/44 | 0 | 36 (26 con 2+ conferme) | 0 | 9.0% | **verificata** |
| 1-5 | ricostruita | 84/84 | 0 | 71 (47 con 2+ conferme) | 0 | 3.0% | **verificata** |
| 1-6 | ricostruita | 69/69 | 0 | 3 (3 con 2+ conferme) | 0 | 4.8% | **verificata** |
| 1-7 | ricostruita | 43/43 | 0 | 14 (12 con 2+ conferme) | 0 | 6.3% | **verificata** |
| 1-8 | ricostruita | 40/40 | 0 | 7 (6 con 2+ conferme) | 0 | 9.5% | **verificata** |
| 1-9 | ricostruita | 37/37 | 0 | 8 (4 con 2+ conferme) | 0 | 9.0% | **verificata** |
| 1-10 | ricostruita | 116/116 | 0 | 7 (3 con 2+ conferme) | 0 | 2.5% | **verificata** |
| 1-11 | ricostruita | 38/38 | 0 | 2 (1 con 2+ conferme) | 0 | 8.1% | **verificata** |
| 1-12 | ricostruita | 38/38 | 0 | 2 (2 con 2+ conferme) | 0 | 10.9% | **verificata** |
| 1-13 | campione | 36/36 | 0 | 4 (4 con 2+ conferme) | 0 | 8.6% | **verificata** |
| 1-14 | ricostruita | 34/34 | 0 | 2 (2 con 2+ conferme) | 0 | 6.7% | **verificata** |
| 2-1 | campione | 50/50 | 0 | 30 (30 con 2+ conferme) | 0 | 6.2% | **verificata** |
| 2-2 | ricostruita | 47/47 | 0 | 52 (52 con 2+ conferme) | 0 | 9.4% | **verificata** |
| 2-3 | ricostruita | 43/43 | 0 | 28 (28 con 2+ conferme) | 0 | 10.9% | **verificata** |
| 2-4 | ricostruita | 44/44 | 0 | 29 (29 con 2+ conferme) | 0 | 10.4% | **verificata** |
| 2-5 | ricostruita | 29/29 | 0 | 22 (22 con 2+ conferme) | 0 | 9.1% | **verificata** |
| 2-6 | ricostruita | 57/57 | 0 | 29 (29 con 2+ conferme) | 0 | 12.0% | **verificata** |
| 2-7 | ricostruita | 20/20 | 0 | 10 (10 con 2+ conferme) | 0 | 4.1% | **verificata** |
| 2-8 | ricostruita | 17/17 | 0 | 11 (11 con 2+ conferme) | 0 | 4.2% | **verificata** |
| 3-1 | ricostruita | 33/33 | 0 | 22 (22 con 2+ conferme) | 0 | 6.2% | **verificata** |
| 3-2 | ricostruita | 39/39 | 0 | 19 (19 con 2+ conferme) | 0 | 7.6% | **verificata** |
| 3-3 | ricostruita | 34/34 | 0 | 17 (17 con 2+ conferme) | 0 | 7.9% | **verificata** |
| 3-4 | ricostruita | 36/36 | 0 | 14 (14 con 2+ conferme) | 0 | 7.2% | **verificata** |
| 3-5 | ricostruita | 39/39 | 0 | 42 (42 con 2+ conferme) | 0 | 8.3% | **verificata** |
| 3-6 | ricostruita | 39/39 | 0 | 23 (23 con 2+ conferme) | 0 | 8.6% | **verificata** |
| 3-7 | ricostruita | 39/39 | 0 | 26 (26 con 2+ conferme) | 0 | 13.1% | **verificata** |
| 3-8 | ricostruita | 39/39 | 0 | 3 (3 con 2+ conferme) | 0 | 6.7% | **verificata** |
| 3-9 | ricostruita | 27/27 | 0 | 2 (2 con 2+ conferme) | 0 | 6.6% | **verificata** |
| 4-1 | ricostruita | 33/33 | 0 | 23 (23 con 2+ conferme) | 0 | 5.3% | **verificata** |
| 4-2 | ricostruita | 25/25 | 0 | 3 (3 con 2+ conferme) | 0 | 3.1% | **verificata** |
| 4-3 | ricostruita | 48/48 | 0 | 12 (7 con 2+ conferme) | 0 | 6.2% | **verificata** |
| 4-4 | ricostruita | 37/37 | 0 | 47 (46 con 2+ conferme) | 0 | 8.7% | **verificata** |
| 4-5 | ricostruita | 33/33 | 0 | 47 (45 con 2+ conferme) | 0 | 7.2% | **verificata** |
| 4-6 | ricostruita | 28/28 | 0 | 36 (36 con 2+ conferme) | 0 | 7.1% | **verificata** |
| 4-7 | ricostruita | 38/38 | 0 | 10 (10 con 2+ conferme) | 0 | 6.1% | **verificata** |
| 4-8 | ricostruita | 28/28 | 0 | 3 (3 con 2+ conferme) | 0 | 9.0% | **verificata** |
| 4-9 | ricostruita | 37/37 | 0 | 8 (8 con 2+ conferme) | 0 | 6.6% | **verificata** |
| 4-10 | ricostruita | 39/39 | 0 | 16 (12 con 2+ conferme) | 0 | 7.4% | **verificata** |
| 4-11 | ricostruita | 33/33 | 0 | 31 (31 con 2+ conferme) | 0 | 6.1% | **verificata** |
| 4-12 | ricostruita | 55/55 | 0 | 31 (31 con 2+ conferme) | 0 | 7.0% | **verificata** |
| 4-13 | ricostruita | 36/36 | 0 | 12 (10 con 2+ conferme) | 0 | 7.7% | **verificata** |
| 4-14 | ricostruita | 34/34 | 0 | 6 (4 con 2+ conferme) | 0 | 10.3% | **verificata** |
| 4-15 | ricostruita | 39/39 | 0 | 19 (17 con 2+ conferme) | 0 | 8.4% | **verificata** |
| 4-16 | ricostruita | 12/12 | 0 | 2 (2 con 2+ conferme) | 0 | 7.8% | **verificata** |
| 5-1 | ricostruita | 17/17 | 0 | 2 (2 con 2+ conferme) | 0 | 6.9% | **verificata** |
| 5-2 | ricostruita | 303/303 | 0 | 279 (279 con 2+ conferme) | 0 | 5.1% | **verificata** |
| 5-3 | ricostruita | 292/292 | 0 | 268 (268 con 2+ conferme) | 0 | 4.5% | **verificata** |
| 5-4 | ricostruita | 270/270 | 0 | 246 (246 con 2+ conferme) | 0 | 7.7% | **verificata** |
| 5-5 | ricostruita | 259/259 | 0 | 235 (235 con 2+ conferme) | 0 | 5.5% | **verificata** |
| 5-6 | ricostruita | 160/160 | 0 | 136 (136 con 2+ conferme) | 0 | 4.4% | **verificata** |
| 5-7 | ricostruita | 129/129 | 0 | 97 (97 con 2+ conferme) | 0 | 5.1% | **verificata** |
| 5-8 | ricostruita | 57/57 | 0 | 46 (46 con 2+ conferme) | 0 | 7.1% | **verificata** |
| 5-9 | ricostruita | 164/164 | 0 | 124 (124 con 2+ conferme) | 0 | 5.6% | **verificata** |
| 5-10 | ricostruita | 72/72 | 0 | 33 (33 con 2+ conferme) | 0 | 5.7% | **verificata** |
| 5-11 | ricostruita | 115/115 | 0 | 79 (79 con 2+ conferme) | 0 | 4.3% | **verificata** |
| 5-12 | campione | 26/26 | 0 | 17 (17 con 2+ conferme) | 0 | 7.1% | **verificata** |

## Figure: metodo

- **Grafica della sezione (barre e frecce)** (pagina 1-1): ridisegnata in SVG: rettangoli e triangoli misurati sulla scansione (coordinate dei bordi pixel per pixel).
- **Figura 1-1 (Principal dimensions)** (pagina 1-2): cornice, filetti e blocco del titolo: poligoni misurati sulla scansione (tools/afm-rec/filetto.py); disegno delle tre viste con le linee di quota: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, dopo aver tolto le scritte e le forme gia' ricostruite (tools/afm-rec/tratto.py); scritte, quote e nota: testo vero, misurato parola per parola.
- **Figura 1-2 (Instrument panel)** (pagina 1-5): fotografia: la scansione pulita (bianco della carta riportato al bianco, numeri di richiamo tolti perche' sono testo vero) e ingrandita due volte (Lanczos, lieve maschera di contrasto), figure/fig-1-2.webp; le linee di richiamo restano nella foto. Numeri di richiamo, titolo e legenda: testo vero (numeri: posizioni dalle componenti dell'inchiostro; legenda letta a vista). Cornice e riquadro del titolo: poligoni misurati (filetto.py).
- **Figura 1-3 (Fuel system schematic)** (pagina 1-6): cornice: poligoni misurati (tools/afm-rec/filetto.py); schema: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, tolte le scritte (tools/afm-rec/tratto.py); campiture a retino (fuel supply): campitura grigia piena vettorializzata dalla maschera del retino, al posto dei puntini; scritte: testo vero, lette a vista sull'ingrandimento, linea di base e altezza delle maiuscole dall'inchiostro (costruisci/1-6.py).
- **Figura 1-4 (Fuel quantity data)** (pagina 1-7): tabella ricostruita: filetti misurati con tools/afm-rec/filetto.py (bordi alto e basso lungo tutto il filetto, retta ai minimi quadrati: spessore e pendenza della scansione), doppi dove sono doppi; testo vero nelle celle, ognuna sulla sua linea di base.
- **Figura 1-5 (Electrical system schematic)** (pagina 1-10): cornice: poligoni misurati; schema: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, tolte le scritte (tratto.py); scritte: testo vero (righe e posizioni dall'OCR dell'ingrandimento, testo corretto a vista, linea di base dall'inchiostro). Restano disegno vettorializzato, perche' troppo piccoli per leggerli con certezza o non testo tipografico: le lettere dei morsetti di regolatore e alternatore, i numeri negli interruttori (amperaggi), L e R dei magneti, le scritte bianche sulle barre nere dei bus (costruisci/1-10.py).
- **Grafica della sezione (barre e frecce)** (pagina 2-1): ridisegnata in SVG: rettangoli e triangoli misurati sulla scansione (coordinate dei bordi pixel per pixel).
- **Figura 2-1 (Stall speeds)** (pagina 2-1): tabella ricostruita: filetti SVG misurati (spessore compreso, doppi dove sono doppi) e testo vero nelle celle.
- **Cartelli (1) e (2) di pagina 2-6** (pagina 2-6): bordi, filetti, sottolineature e puntini guida dei cartelli: tratto vettorializzato con potrace (tratto.py); scritte: testo vero, carattere senza grazie condensato per il cartello (1) come nell'originale, lette a vista sull'ingrandimento (costruisci/2-6.py).
- **Cartelli (3)-(7) di pagina 2-7** (pagina 2-7): riquadri: tratto vettorializzato con potrace (tratto.py); scritte: testo vero.
- **Cartello (8) di pagina 2-8** (pagina 2-8): riquadro e sottolineatura: tratto vettorializzato con potrace (tratto.py); puntini guida dell'ultima riga, irregolari nell'originale (un puntino in alto e due ravvicinati): disegno; scritte: testo vero.
- **Grafica della sezione (barre e frecce)** (pagina 3-1): ridisegnata in SVG: rettangolo e poligoni misurati sulla scansione (le barre sono un poco inclinate come stampate).
- **Striscia delle procedure di emergenza** (pagina 3-1): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-2): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-3): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-4): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-5): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-6): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-7): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-8): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Striscia delle procedure di emergenza** (pagina 3-9): ridisegnata (striscia.py, scelta del 2026): barre sottili uguali e parallele, orientate come nella stampa, a passo costante, sempre a sinistra del testo a 212 px dal bordo della pagina; non ricalca la scansione (la' le barre sono larghe, irregolari e sul bordo esterno), percio' la verifica confronta l'inchiostro solo dentro la colonna del testo.
- **Grafica della sezione (barre e frecce)** (pagina 4-1): ridisegnata in SVG: rettangolo e poligoni misurati sulla scansione (le barre sono un poco inclinate come stampate).
- **Figura 4-1 (Exterior inspection), prima meta'** (pagina 4-2): cornice: poligoni misurati; aeroplano, percorso dell'ispezione e numeri delle stazioni: tratto vettorializzato con potrace dalla scansione ingrandita, ali e coda a retino come campitura grigia (tratto.py --retino); titoli, nota ed elenco: testo vero; il numero cerchiato dell'elenco: ellisse SVG misurata con la cifra come testo vero.
- **Figura 4-1 (Exterior inspection), seconda meta'** (pagina 4-3): filetti spessi misurati (poligoni), numeri cerchiati: ellissi SVG misurate (la scansione e' compressa in orizzontale) con la cifra come testo vero. Il lato destro della cornice (filetto verticale) nella scansione e' sbiadito in alto: si disegna continuo.
- **Figura 4-2 (Taxiing diagram)** (pagina 4-8): cornice: poligoni misurati; aeroplano, frecce e settori: tratto vettorializzato con potrace dalla scansione ingrandita, i settori a retino come campitura grigia piena (tratto.py --retino); scritte: testo vero (posizioni dall'OCR dell'ingrandimento, testo letto a vista, linea di base dall'inchiostro). Le scritte minute sul cruscotto dell'aeroplano restano disegno (costruisci/4-8.py).
- **Figura 4-3 (Maximum cruise speed performance)** (pagina 4-12): tabella ricostruita: filetti SVG misurati (spessore compreso, doppi dove sono doppi) e testo vero nelle celle.
- **Grafica della sezione (barre e frecce)** (pagina 5-1): ridisegnata in SVG: rettangolo e poligoni misurati sulla scansione (le barre sono un poco inclinate come stampate).
- **Figura 5-1 (Cruise performance), foglio 1 di 5** (pagina 5-2): tabella ricostruita: filetti SVG misurati e testo vero; i numeri letti due volte (Tesseract cella per cella e strato di testo del PDF) e scelti con l'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia = 46 galloni / consumo; autonomia e distanza; km e miglia nautiche); quelli su cui le letture non erano d'accordo guardati a vista (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 2 di 5** (pagina 5-3): tabella ricostruita: filetti SVG misurati e testo vero; i numeri letti due volte (Tesseract cella per cella e strato di testo del PDF) e scelti con l'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia = 46 galloni / consumo; autonomia e distanza; km e miglia nautiche); quelli su cui le letture non erano d'accordo guardati a vista (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 3 di 5** (pagina 5-4): tabella ricostruita: filetti SVG misurati e testo vero; i numeri letti due volte (Tesseract cella per cella e strato di testo del PDF) e scelti con l'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia = 46 galloni / consumo; autonomia e distanza; km e miglia nautiche); quelli su cui le letture non erano d'accordo guardati a vista (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 4 di 5** (pagina 5-5): tabella ricostruita: filetti SVG misurati e testo vero; i numeri letti due volte (Tesseract cella per cella e strato di testo del PDF) e scelti con l'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia = 46 galloni / consumo; autonomia e distanza; km e miglia nautiche); quelli su cui le letture non erano d'accordo guardati a vista (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 5 di 5** (pagina 5-6): tabella ricostruita: filetti SVG misurati e testo vero; i numeri letti due volte (Tesseract cella per cella e strato di testo del PDF) e scelti con l'aritmetica della riga (km/h, kts e MPH; galloni e litri; autonomia = 46 galloni / consumo; autonomia e distanza; km e miglia nautiche); quelli su cui le letture non erano d'accordo guardati a vista (costruisci/crociera.py).
- **Figura 5-2 (Airspeed correction table)** (pagina 5-7): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista; ogni coppia km/h e MPH controllata: km/h = MPH x 1,609), agganciato all'inchiostro cella per cella (costruisci/5-7.py).
- **Figura 5-3 (Stall speeds)** (pagina 5-8): tabella ricostruita: filetti SVG misurati (spessore compreso, doppi dove sono doppi) e testo vero nelle celle, misurato cella per cella.
- **Figura 5-4 (Take-off distance)** (pagina 5-9): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-9.py).
- **Figura 5-5 (Landing distance)** (pagina 5-10): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-10.py).
- **Figura 5-6 (Maximum rate-of-climb data)** (pagina 5-11): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, ogni terna km/h, kts, MPH controllata; agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-11.py).
- **Figura 5-7 (Maximum glide)** (pagina 5-12): cornice e griglia: filetti SVG misurati; fascia di planata: 689 punti della retinatura ridisegnati uno per uno nella posizione misurata sulla scansione, piu' 117 punti ricavati dal reticolo locale solo dove si fondono con i filetti della griglia; aeroplano: disegno al tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, dopo aver tolto i filetti e i punti che lo attraversano (tools/afm-rec/afm-ccaf/figure/fig-5-7.py); scritte: testo vero, misurato parola per parola.

## Differenze aperte

Nessuna.

## Righe e macchie chiuse a vista

Differenze della misura, non della pagina: guardate sull'ingrandimento (coordinate della pagina originale).

| Pagina | Cosa | Perche' |
|---|---|---|
| 1-5 | riga "1" (base 514) | il numero 1 e' nel posto giusto (componente dell'inchiostro, 357-360 x 491-513); la sua linea di richiamo parte dal piede della cifra e la misura della linea di base la prende per la cifra |
| 1-5 | riga "4" (base 514) | il numero 4 e' nel posto giusto (componente dell'inchiostro, 478-486 x 491-513); come per l'1, la sua linea di richiamo parte dal piede della cifra e la misura della linea di base la prende per la cifra |
| 1-5 | macchia, riquadro 1003, 338, 1013, 425 | il filetto destro della cornice: nella scansione in alto sbiadisce sotto la soglia dell'inchiostro (grigio, interrotto), sulla pagina e' continuo come gli altri tre lati; la ricostruita lo disegna continuo |
| 1-10 | riga "OVER-VOLTAGE WARNING LIGHT" (base 541) | la riga e' al suo posto (ingrandimento); la fascia di controllo comincia 12 px prima e prende la D di ALT FIELD, etichetta vicina 6 px piu' in alto, che nel carattere della ricostruita finisce un poco piu' a destra |
| 1-10 | riga "RADIO 4" (base 823) | la riga e' al suo posto (ingrandimento); la fascia di controllo comincia 12 px prima e prende il cerchietto dell'interruttore sopra l'etichetta |
| 3-4 | riga "power exclusively." (base 1502) | la riga e' al suo posto (ingrandimento della differenza: inizio e fine coincidono); la fascia di controllo, per una riga corta, prende in alto la coda della g di "change" della riga sopra, che nella ricostruita scende un pixel piu' in basso: e' quella a dare la fine 5 px piu' in la' |
| 3-6 | riga "swells and light wind, land parallel to swells." (base 639) | la riga e' al suo posto (ingrandimento della differenza: inizio e fine coincidono); la fascia prende in alto la coda di una lettera della riga sopra (la g di "high"), che nella ricostruita scende un pixel piu' in basso: e' quella a dare la fine 7 px piu' in la' |
| 3-6 | riga "FLIGHT IN ICING CONDITIONS." (base 1165) | la riga e' al suo posto (ingrandimento); nella scansione la F tocca una barra della striscia stampata, e la verifica, che ignora la striscia (ridisegnata regolare), toglie con la barra anche l'asta della F dell'originale: per questo l'originale sembra cominciare 6 px dopo |
| 4-2 | riga "1" (base 1437) | la cifra e' al suo posto (ingrandimento); la fascia di controllo prende anche l'anello del cerchio, che nella ricostruita e' un'ellisse misurata un poco diversa |
| 4-2 | riga "Figure" (base 1678) | la parola e' al suo posto (ingrandimento: base a 1678, fine e inizio coincidono); la fascia di controllo comincia 12 px prima e prende la punta del filetto spesso della cornice (finisce a x 916, alto 12 px), che sposta la misura della linea di base |
| 4-3 | riga "4-1." (base 1633) | la riga e' al suo posto (ingrandimento); la fascia di controllo, larga 6 px oltre la parola, prende in alto il fondo del cerchio dell'8 (riga 1602), che nella ricostruita e' un'ellisse un poco diversa |
| 4-3 | riga "Edition: 3" (base 273) | la scansione taglia il bordo destro: del 3 resta un pezzetto; la ricostruita lo scrive intero, percio' finisce piu' in la' |
| 4-3 | riga "4" (base 579) | la cifra cerchiata e' al suo posto (ingrandimento: coincide); il 4 ha la traversa a meta' altezza, e la misura della linea di base dell'inchiostro, che cerca il calo piu' basso, nella banda stretta della cifra prende quella invece del piede |
| 4-3 | macchia, riquadro 996, 325, 1018, 632 | il lato destro della cornice della figura 4-1: nella scansione la parte alta e' sbiadita fino a sparire, nella ricostruita il filetto e' continuo (come i filetti sbiaditi della figura 1-2) |
| 4-7 | riga "To avoid flooding, be sure you are ready to crank the engine as soon as a steady" (base 724) | la riga e' al suo posto (ingrandimento della differenza: inizio e fine coincidono); la fascia di controllo prende in alto la coda di una g della riga sopra, che nella ricostruita scende un pixel piu' in basso: e' quella a dare la fine 5 px piu' in la' |
| 4-12 | riga "144" (base 638) | la cifra e' al suo posto (ingrandimento: base a 638 in tutte e due); "144" ha due 4 con la traversa larga a meta' altezza, e la misura della linea di base dell'inchiostro, che cerca il calo piu' basso, nella banda di una cella sola prende quella invece del piede |
| 4-13 | riga "and maintain full pro-spin elevator and rudder deflections. The application of ailerons" (base 376) | la riga e' al suo posto; l'ultima parola, "ailerons", nella scansione e' tagliata dal bordo destro della pagina scansionata (resta l'attacco della s): la ricostruita la scrive intera, percio' finisce 5 px piu' in la' |
| 4-14 | riga "energy." (base 1149) | la riga e' al suo posto (ingrandimento); e' una parola sola con g e y: la misura della linea di base dell'inchiostro, che cerca il calo piu' basso, la prende sulle discendenti, diversamente nelle due pagine |
| 4-14 | macchia, riquadro 238, 200, 322, 310 | segni a evidenziatore sopra "Page: 4-14" (le strisce colorate della scansione, qui abbastanza scure e poco colorate da passare per inchiostro): non sono stampa, non si ricostruiscono |
| 4-14 | macchia, riquadro 770, 200, 850, 310 | segni a evidenziatore sopra "Reims Aviation": non sono stampa, non si ricostruiscono |
| 4-15 | riga "Page: 4-15" (base 232) | la scansione taglia il bordo destro della pagina: del numero resta "4-1" e l'attacco del 5; la ricostruita lo scrive intero (la pagina viene fra 4-14 e 4-16), percio' finisce piu' in la' |
| 4-15 | riga "Edition: 3" (base 264) | la scansione taglia il bordo destro: del 3 resta un pezzetto; la ricostruita lo scrive intero, percio' finisce piu' in la' |
| 4-16 | riga "Page: 4-16" (base 361) | la scansione taglia il bordo sinistro della pagina: della P di "Page:" resta poco; la ricostruita la scrive intera, al margine delle altre righe ("Engine", intera, comincia a x 229), percio' comincia prima |
| 5-1 | macchia, riquadro 940, 300, 1000, 362 | la V di "SECTION V": nella scansione il titolo e' stampato un poco storto (sale verso destra) e la V e' piu' sottile in cima ai bracci e in punta; la ricostruita, dritta, sporge di qualche pixel |
| 5-3 | riga "2600" (base 512) | la riga e' al suo posto (ingrandimento); nella scansione accanto al numero c'e' un segno di sporco (un puntino), che la verifica conta come inchiostro della riga (a sinistra del 2600) |
| 5-3 | riga "711" (base 612) | la riga e' al suo posto (ingrandimento); nella scansione accanto al numero c'e' un segno di sporco (un puntino), che la verifica conta come inchiostro della riga (a destra del 711) |
| 5-3 | riga "677" (base 629) | la riga e' al suo posto (ingrandimento); nella scansione accanto al numero c'e' un segno di sporco (un puntino), che la verifica conta come inchiostro della riga (a destra del 677) |
| 5-3 | riga "779" (base 579) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-3 | riga "9,7" (base 716) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-3 | riga "998" (base 545) | il numero e' al suo posto (ingrandimento); nella scansione c'e' un puntino di sporco 10 px prima del 998 (lo strato di testo del PDF lo legge come •998), che non si ricostruisce e che la fascia di controllo conta come inchiostro della riga |
| 5-4 | riga "4,7" (base 487) | la riga e' al suo posto (ingrandimento della pagina girata: coincide); e' accanto a un filetto della tabella, la fascia di controllo resta stretta e la misura della linea di base, che cerca il calo piu' basso, la prende sulla virgola |
| 5-4 | riga "6,5" (base 725) | la riga e' al suo posto (ingrandimento della pagina girata: coincide); e' accanto a un filetto della tabella, la fascia di controllo resta stretta e la misura della linea di base, che cerca il calo piu' basso, la prende sulla virgola |
| 5-4 | riga "630" (base 725) | la riga e' al suo posto (ingrandimento); e' l'ultima del gruppo, sopra il filetto: la fascia di controllo resta stretta e la misura della linea di base ne risente |
| 5-4 | riga "610" (base 725) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-4 | riga "18" (base 725) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-4 | riga "112" (base 725) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-4 | riga "7,1" (base 725) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-4 | riga "26,9" (base 725) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-4 | riga "1167" (base 725) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-5 | riga "7,1" (base 637) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-6 | riga "440" (base 570) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-6 | riga "7,7" (base 570) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-6 | riga "14" (base 690) | nella via di mezzo la pagina e' scalata: il numero sta a un pixel o due dal filetto del gruppo, la fascia di controllo resta strettissima e la misura della linea di base prende la cima delle cifre; nella prova normale la stessa riga coincide (zero differenze), e l'ingrandimento della via di mezzo mostra le cifre sovrapposte |
| 5-9 | riga "GROSS" (base 399) | la parola e' al suo posto (ingrandimento: coincide); la fascia di controllo comincia 12 px prima e prende il filetto sinistro della cornice, che nella scansione e' un poco storto |
| 5-9 | riga "m" (base 514) | la m e' al suo posto (ingrandimento); e' una lettera sola, minuscola, e la misura della linea di base nella sua banda stretta prende la fascia sbagliata |
| 5-11 | riga "FUEL" (base 506) | la colonna FUEL USED / Litres e' al suo posto (ingrandimento: coincide); la fascia di controllo comincia 12 px prima, attraversa il filetto e prende la F di "RATE OF" della cella accanto, che nella scansione tocca il filetto |
| 5-11 | riga "USED" (base 524) | la colonna FUEL USED / Litres e' al suo posto (ingrandimento: coincide); la fascia di controllo comincia 12 px prima, attraversa il filetto e prende la F di "RATE OF" della cella accanto, che nella scansione tocca il filetto |
| 5-11 | riga "Litres" (base 542) | la colonna FUEL USED / Litres e' al suo posto (ingrandimento: coincide); la fascia di controllo comincia 12 px prima, attraversa il filetto e prende la F di "RATE OF" della cella accanto, che nella scansione tocca il filetto |

## Numeri, uno per uno

Sezioni 2, 3, 5 e 6: due conferme indipendenti per ogni numero. ✓ = conferma.

### Pagina 1-1

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 243 | 1-1 | l-  | ✓ | ✓ OCR legge 'l-'; a vista: 1-1 (gia' guardato a vista prima della correzione della linea di base (stesso valore)) | 2 |
| 275 | 3 | 3 ✓ | ✓ |  | 2 |
| 895 | (1) | (I)  | ✓ | ✓ OCR legge (I); a vista: (1), primo di un elenco (1)…(6) | 2 |
| 926 | (2) | (2) ✓ | ✓ |  | 2 |
| 957 | (3) | (3) ✓ | ✓ |  | 2 |
| 989 | (4) | (4) ✓ | ✓ |  | 2 |
| 1020 | (5) | (5) ✓ | ✓ |  | 2 |
| 1049 | (6) | (6) ✓ | ✓ |  | 2 |

### Pagina 1-2

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 199 | 1-2 | 1-2 ✓ | ✓ |  | 2 |
| 321 | 3 | 3 ✓ | ✓ |  | 2 |
| 468 | 2,68 | 2,68 ✓ | – |  | 1 |
| 639 | 5 | s  | – | ✓ OCR del ritaglio legge s; Tesseract sull'ingrandimento della figura legge 5° (confidenza 90); a vista: barra superiore piatta, tratto sinistro solo in alto: 5 (la prima lettura a occhio, 6, era sbagliata) · seconda conferma: manuale I-CCAB (altra scansione, 1600 px), stessa quota della figura 1-1: 5° senza dubbi | 2 |
| 665 | 8,17 | 6171  | – | ✓ OCR legge 6171; a vista: 8,17 m (e 8,17 m nella tabella delle dimensioni a pagina 1-3) | 1 |
| 710 | 3,45 | 34  | – | ✓ OCR legge 34; a vista: 3,45 m | 1 |
| 1324 | 10.92 | 10.92 ✓ | – |  | 1 |
| 1507 | 1,93 | 1,93 ✓ | – |  | 1 |
| 1574 | 2,53 | 2,53 ✓ | – |  | 1 |
| 1677 | 1-1. | -1.  | ✓ | ✓ OCR legge -1.; a vista: Figure 1-1. | 2 |

### Pagina 1-3

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 244 | 1-3 | 1-3 ✓ | ✓ |  | 2 |
| 275 | 3 | 3 ✓ | ✓ |  | 2 |
| 469 | 10,92 | 10,92 ✓ | ✓ |  | 2 |
| 500 | 8,17 | 8,17 ✓ | ✓ |  | 2 |
| 531 | 2,68 | 2,68 ✓ | ✓ |  | 2 |
| 655 | 2412 | 2412 ✓ | ✓ |  | 2 |
| 685 | 16, | 16, ✓ | – |  | 1 |
| 685 | 3 | 3 ✓ | – |  | 1 |
| 685 | 2 | 2 ✓ | ✓ |  | 2 |
| 718 | 1 | 1 ✓ | – |  | 1 |
| 718 | 37’ | 37 ✓ | – |  | 1 |
| 750 | +0 | 4()  | – | ✓ OCR legge '4()'; a vista: +0 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 750 | 47’ | 47 ✓ | – |  | 1 |
| 780 | -2 | -7  | – | ✓ OCR legge '-7'; a vista: -2 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 780 | 50’ | 50 ✓ | – |  | 1 |
| 904 | 1,70 | 1,70 ✓ | ✓ |  | 2 |
| 904 | 2 | 2 ✓ | ✓ |  | 2 |
| 934 | 20 | 20 ✓ | – |  | 1 |
| 934 | 1 | BA  | – | ✓ OCR legge 'BA'; a vista: 1 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 934 | 15 | 15 ✓ | – |  | 1 |
| 934 | 1 | –  | – | ✓ OCR legge '(niente)'; a vista: 1 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1086 | 1.97 | 1,97 ✓ | ✓ |  | 2 |
| 1086 | 2 | 2 ✓ | ✓ |  | 2 |
| 1115 | 0 | Q  | ✓ | ✓ OCR legge 'Q'; a vista: 0 (ritaglio ingrandito: Control Travel: 0° to 40°) | 2 |
| 1115 | 40 | Ag  | ✓ | ✓ OCR legge 'Ag'; a vista: 40 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 2 |
| 1105 | +0 | 4Q)  | – | ✓ OCR legge '4Q)'; a vista: +0 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1125 | -2 | i  | – | ✓ OCR legge 'i'; a vista: -2 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1242 | 1,87 | 1,87 ✓ | ✓ |  | 2 |
| 1242 | 2 | 2 ✓ | ✓ |  | 2 |
| 1274 | -3 | 3 ✓ | ✓ |  | 2 |
| 1274 | 30’ | 30 ✓ | ✓ |  | 2 |
| 1304 | 1,50 | 1,50 ✓ | ✓ |  | 2 |
| 1304 | 2 | 2 ✓ | ✓ |  | 2 |
| 1334 | 28 | 28 ✓ | – |  | 1 |
| 1334 | +1 | 104j  | – | ✓ OCR legge '104j'; a vista: +1 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1365 | -0 | -()  | ✓ | ✓ OCR legge '-()'; a vista: -0 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 2 |
| 1395 | 23 | 23 ✓ | – |  | 1 |
| 1395 | +1 | –  | – | ✓ OCR legge '(niente)'; a vista: +1 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1424 | -0 | -()  | ✓ | ✓ OCR legge '-()'; a vista: -0 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 2 |
| 1550 | 28 | 28 ✓ | – |  | 1 |
| 1550 | +1 | –  | – | ✓ OCR legge '(niente)'; a vista: +1 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1581 | -0 | -()  | ✓ | ✓ OCR legge '-()'; a vista: -0 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 2 |
| 1612 | 13 | 13 ✓ | – |  | 1 |
| 1612 | +1 | 4)  | – | ✓ OCR legge '4)'; a vista: +1 (ritaglio ingrandito: gradi in apice e tolleranze impilate, l'OCR non legge i pezzi staccati) | 1 |
| 1642 | -0 | 0) ✓ | ✓ |  | 2 |

### Pagina 1-4

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 195 | 1-4 | 1-4 ✓ | ✓ |  | 2 |
| 328 | 3 | 3 ✓ | ✓ |  | 2 |
| 453 | 1,26 | 1,26 ✓ | ✓ |  | 2 |
| 453 | 2 | (4  | ✓ | ✓ OCR legge '(4'; a vista: 2 (ritaglio ingrandito) | 2 |
| 485 | 0,67 | 0,67 ✓ | ✓ |  | 2 |
| 485 | 2 | 2 ✓ | ✓ |  | 2 |
| 516 | 17 | 17 ✓ | – |  | 1 |
| 516 | 44’ | ar  | – | ✓ OCR legge 'ar'; a vista: 44’ (ritaglio ingrandito) | 1 |
| 516 | 1 | N  | – | ✓ OCR legge 'N'; a vista: 1 (ritaglio ingrandito) | 1 |
| 547 | 17 | 17 ✓ | – |  | 1 |
| 547 | 44’ | 44 ✓ | – |  | 1 |
| 547 | 1 | l  | – | ✓ OCR legge 'l'; a vista: 1 (ritaglio ingrandito) | 1 |
| 767 | 2,53 | 2,93  | ✓ | ✓ OCR legge '2,93'; a vista: 2,53 (ritaglio ingrandito) | 2 |
| 798 | 1,64 | 1,64 ✓ | ✓ |  | 2 |
| 829 | 5.00 | 5.00 ✓ | ✓ |  | 2 |
| 829 | 5,6-Ply | 5,6-Ply ✓ | – |  | 1 |
| 829 | 45 | 45 ✓ | ✓ |  | 2 |
| 861 | 6.00 | 6.00 ✓ | ✓ |  | 2 |
| 861 | 6,6-Ply | 6,6-Ply ✓ | – |  | 1 |
| 861 | 38 | 38 ✓ | ✓ |  | 2 |
| 892 | 45 | 45 ✓ | ✓ |  | 2 |
| 1013 | IO-360-H | J0-360-H  | – | ✓ OCR legge 'J0-360-H'; a vista: IO-360-H (ritaglio ingrandito) | 1 |
| 1013 | 210 | 210 ✓ | ✓ |  | 2 |
| 1013 | (157 | (157 ✓ | ✓ |  | 2 |
| 1046 | 100/130 | 100/130 ✓ | ✓ |  | 2 |
| 1076 | 50 | 50 ✓ | ✓ |  | 2 |
| 1076 | 5 | 5 ✓ | ✓ |  | 2 |
| 1107 | 10W30 | 10W30 ✓ | ✓ |  | 2 |
| 1107 | 30 | 30 ✓ | ✓ |  | 2 |
| 1107 | 5 | 5 ✓ | – |  | 1 |
| 1231 | 2A34C209/78CCA-2 | 2A34C209/78CCA-2 ✓ | ✓ |  | 2 |
| 1261 | 2 | 2 ✓ | ✓ |  | 2 |
| 1291 | 1,93 | 1,93 ✓ | ✓ |  | 2 |
| 1413 | 4 | 4 ✓ | ✓ |  | 2 |
| 1444 | 2 | 2 ✓ | ✓ |  | 2 |
| 1475 | 91 | 91 ✓ | ✓ |  | 2 |

### Pagina 1-5

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 252 | 1-5 | 1-5 ✓ | ✓ |  | 2 |
| 283 | 3 | 3 ✓ | ✓ |  | 2 |
| 514 | 1 | –  | – | ✓ OCR legge '(niente)'; a vista: 1 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 514 | 2 | d  | – | ✓ OCR legge 'd'; a vista: 2 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 514 | 3 | 3 ✓ | – |  | 1 |
| 514 | 4 | –  | – | ✓ OCR legge '(niente)'; a vista: 4 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 514 | 5 | ,  | – | ✓ OCR legge ','; a vista: 5 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 512 | 6 | 6 ✓ | – |  | 1 |
| 511 | 7 | z  | – | ✓ OCR legge 'z'; a vista: 7 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 511 | 8 | )  | – | ✓ OCR legge ')'; a vista: 8 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 511 | 9 | q  | – | ✓ OCR legge 'q'; a vista: 9 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 511 | 10 | I  | – | ✓ OCR legge 'I'; a vista: 10 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 511 | 11 | i  | – | ✓ OCR legge 'i'; a vista: 11 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 511 | 12 | 2  | – | ✓ OCR legge '2'; a vista: 12 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 34 | i  | – | ✓ OCR legge 'i'; a vista: 34 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 33 | i  | – | ✓ OCR legge 'i'; a vista: 33 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 32 | 1  | – | ✓ OCR legge '1'; a vista: 32 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 31 | i  | – | ✓ OCR legge 'i'; a vista: 31 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 30 | 0  | – | ✓ OCR legge '0'; a vista: 30 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 29 | 9  | – | ✓ OCR legge '9'; a vista: 29 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 28 | 08  | – | ✓ OCR legge '08'; a vista: 28 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 27 | 21  | – | ✓ OCR legge '21'; a vista: 27 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1075 | 26 | 26 ✓ | – |  | 1 |
| 1075 | 25 | 5  | – | ✓ OCR legge '5'; a vista: 25 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 1 |
| 1073 | 20 | Hl  | ✓ | ✓ OCR legge 'Hl'; a vista: 20 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1075 | 19 | i9  | ✓ | ✓ OCR legge 'i9'; a vista: 19 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1075 | 18 | i8  | ✓ | ✓ OCR legge 'i8'; a vista: 18 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1073 | 17 | 17 ✓ | ✓ |  | 2 |
| 1075 | 16 | i6  | ✓ | ✓ OCR legge 'i6'; a vista: 16 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1075 | 15 | 5  | ✓ | ✓ OCR legge '5'; a vista: 15 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1075 | 14 | 14 ✓ | ✓ |  | 2 |
| 1073 | 13 | 13 ✓ | ✓ |  | 2 |
| 1110 | 24 | 24 ✓ | – |  | 1 |
| 1108 | 21 | v  | ✓ | ✓ OCR legge 'v'; a vista: 21 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1145 | 23 | 23 ✓ | – |  | 1 |
| 1145 | 22 | 2  | ✓ | ✓ OCR legge '2'; a vista: 22 (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1235 | 1. | 1. ✓ | ✓ |  | 2 |
| 1235 | 12. | 12, ✓ | ✓ |  | 2 |
| 1236 | 23. | 23. ✓ | ✓ |  | 2 |
| 1258 | 2. | 2. ✓ | ✓ |  | 2 |
| 1259 | 24. | 24, ✓ | ✓ |  | 2 |
| 1282 | 3. | 3. ✓ | ✓ |  | 2 |
| 1281 | 13. | 13. ✓ | ✓ |  | 2 |
| 1282 | 25. | 25, ✓ | ✓ |  | 2 |
| 1305 | 26. | 26, ✓ | ✓ |  | 2 |
| 1328 | 4. | 4, ✓ | ✓ |  | 2 |
| 1328 | 14. | 14. ✓ | ✓ |  | 2 |
| 1328 | 27. | 27. ✓ | ✓ |  | 2 |
| 1349 | 15. | 15. ✓ | ✓ |  | 2 |
| 1349 | 28. | 28, ✓ | ✓ |  | 2 |
| 1373 | 5. | 5, ✓ | ✓ |  | 2 |
| 1372 | 16. | 16. ✓ | ✓ |  | 2 |
| 1372 | 29. | 29, ✓ | ✓ |  | 2 |
| 1395 | 6. | –  | ✓ | ✓ OCR legge '(niente)'; a vista: 6. (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1395 | 17. | 17, ✓ | ✓ |  | 2 |
| 1395 | 30. | 30, ✓ | ✓ |  | 2 |
| 1418 | 7. | 7. ✓ | ✓ |  | 2 |
| 1418 | 18. | 18. ✓ | ✓ |  | 2 |
| 1418 | 31. | 31. ✓ | ✓ |  | 2 |
| 1440 | 8. | –  | ✓ | ✓ OCR legge '(niente)'; a vista: 8. (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1441 | 19. | 19, ✓ | ✓ |  | 2 |
| 1465 | 9. | 9. ✓ | ✓ |  | 2 |
| 1464 | 20. | 20. ✓ | ✓ |  | 2 |
| 1464 | 32. | 32. ✓ | ✓ |  | 2 |
| 1488 | 10. | 10, ✓ | ✓ |  | 2 |
| 1511 | 11. | 1,  | ✓ | ✓ OCR legge '1,'; a vista: 11. (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |
| 1511 | 21. | 21. ✓ | ✓ |  | 2 |
| 1509 | 33. | 33, ✓ | ✓ |  | 2 |
| 1536 | 22. | 22, ✓ | ✓ |  | 2 |
| 1537 | 34. | 34, ✓ | ✓ |  | 2 |
| 1642 | 1-2. | 12,  | ✓ | ✓ OCR legge '12,'; a vista: 1-2. (ingrandimento: numeri di richiamo 1-34 in sequenza, ognuno con la sua voce in legenda; l'OCR non legge le cifre nere strette toccate dalle linee di richiamo) | 2 |

### Pagina 1-6

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 196 | 1-6 | 1-6 ✓ | ✓ |  | 2 |
| 323 | 3 | 3 ✓ | ✓ |  | 2 |
| 1670 | 1-3. | 1-3, ✓ | ✓ |  | 2 |

### Pagina 1-7

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 242 | 1-7 | l-7  | ✓ | ✓ OCR legge 'l-7'; a vista: 1-7 (ritaglio ingrandito; la tabella torna: 46 usabili + 6 non usabili = 52 U.S. gallons, 174 + 23 = 197 litri) | 2 |
| 274 | 3 | 3 ✓ | ✓ |  | 2 |
| 459 | 46 | 46 ✓ | ✓ |  | 2 |
| 459 | (174 | (174 ✓ | ✓ |  | 2 |
| 1462 | 2 | 2 ✓ | – |  | 1 |
| 1524 | 26 | 26 ✓ | ✓ |  | 2 |
| 1554 | 98,5 | 98,5 ✓ | ✓ |  | 2 |
| 1523 | 46 | 46 ✓ | ✓ |  | 2 |
| 1553 | 174 | 174 ✓ | ✓ |  | 2 |
| 1521 | 6 | –  | – | ✓ OCR legge '(niente)'; a vista: 6 (ritaglio ingrandito; la tabella torna: 46 usabili + 6 non usabili = 52 U.S. gallons, 174 + 23 = 197 litri) | 1 |
| 1552 | 23 | 23 ✓ | ✓ |  | 2 |
| 1520 | 52 | 92  | ✓ | ✓ OCR legge '92'; a vista: 52 (ritaglio ingrandito; la tabella torna: 46 usabili + 6 non usabili = 52 U.S. gallons, 174 + 23 = 197 litri) | 2 |
| 1552 | 197 | 197 ✓ | ✓ |  | 2 |
| 1636 | 1-4. | 1-4. ✓ | ✓ |  | 2 |

### Pagina 1-8

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 203 | 1-8 | 1-8 ✓ | ✓ |  | 2 |
| 324 | 3 | 3 ✓ | ✓ |  | 2 |
| 565 | 1-3) | 1-3) ✓ | ✓ |  | 2 |
| 751 | 1-4 | 14  | ✓ | ✓ OCR legge '14'; a vista: 1-4 (ritaglio ingrandito) | 2 |
| 1566 | (3 | (3 ✓ | ✓ |  | 2 |
| 1566 | 5 | 5 ✓ | – |  | 1 |
| 1566 | 1/2 | 1/2 ✓ | ✓ |  | 2 |

### Pagina 1-9

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 254 | 1-9 | 1-9 ✓ | ✓ |  | 2 |
| 285 | 3 | 3 ✓ | ✓ |  | 2 |
| 405 | 1/2 | 1/2 ✓ | ✓ |  | 2 |
| 405 | 1 | l  | – | ✓ OCR legge 'l'; a vista: 1 (gia' guardato a vista prima della correzione della linea di base (stesso valore)) | 1 |
| 405 | 2 | 2 ✓ | ✓ |  | 2 |
| 715 | 14-volt, | 14-volt, ✓ | – |  | 1 |
| 746 | 1-5). | 1-5), ✓ | – |  | 1 |
| 746 | 12-volt | 2-volt  | – | ✓ OCR legge '2-volt'; a vista: 12-volt (ritaglio ingrandito) | 1 |

### Pagina 1-10

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 184 | 1-10 | 1-10 ✓ | ✓ |  | 2 |
| 324 | 3 | 3 ✓ | ✓ |  | 2 |
| 684 | 1 | –  | – | ✓ OCR legge '(niente)'; a vista: 1 (ingrandimento: RADIO 1 ... RADIO 4 in ordine sotto i quattro interruttori del bus elettronico) | 1 |
| 730 | 2 | 2 ✓ | – |  | 1 |
| 776 | 3 | K  | – | ✓ OCR legge 'K'; a vista: 3 (ingrandimento: RADIO 1 ... RADIO 4 in ordine sotto i quattro interruttori del bus elettronico) | 1 |
| 822 | 4 | 4 ✓ | – |  | 1 |
| 1674 | 1-5. | 1-5. ✓ | ✓ |  | 2 |

### Pagina 1-11

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 251 | 1-11 | I-I  | – | ✓ OCR legge 'I-I'; a vista: 1-11 (gia' guardato a vista prima della correzione della linea di base (stesso valore)) | 1 |
| 285 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 1-12

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 182 | 1-12 | 1-12 ✓ | ✓ |  | 2 |
| 321 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 1-13

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 243 | 1-13 | 1-13 ✓ | ✓ |  | 2 |
| 275 | 3 | 3 ✓ | ✓ |  | 2 |
| 894 | 0,5 | 0,5 ✓ | ✓ |  | 2 |
| 894 | 1,0 | 1,0 ✓ | ✓ |  | 2 |

### Pagina 1-14

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 207 | 1-14 | 1-14 ✓ | ✓ |  | 2 |
| 327 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 2-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 247 | 2-1 | 2-  | ✓ | ✓ ritaglio OCR troppo stretto; a vista: 2-1 | 2 |
| 278 | 3 | 3 ✓ | ✓ |  | 2 |
| 716 | FR172J | FRI72J  | ✓ | ✓ OCR legge FRI72); a vista: FR172J | 2 |
| 748 | 43 | 43 ✓ | ✓ |  | 2 |
| 748 | A18EU. | AI8EU.  | ✓ | ✓ OCR legge AI8EU.; a vista: A18EU. (e cosi' nel manuale FR172H a 600 dpi) | 2 |
| 997 | 298 | 298 ✓ | ✓ |  | 2 |
| 997 | 161 | 161 ✓ | ✓ |  | 2 |
| 997 | 185 | 185 ✓ | ✓ |  | 2 |
| 1029 | 235 | 235 ✓ | ✓ |  | 2 |
| 1029 | 127 | 127 ✓ | ✓ |  | 2 |
| 1029 | 146 | 146 ✓ | ✓ |  | 2 |
| 1060 | 161 | 161 ✓ | ✓ |  | 2 |
| 1060 | 87 | 87 ✓ | ✓ |  | 2 |
| 1060 | 100 | 100 ✓ | ✓ |  | 2 |
| 1090 | 190 | 190 ✓ | ✓ |  | 2 |
| 1090 | 104 | 104 ✓ | ✓ |  | 2 |
| 1090 | 118 | 118 ✓ | ✓ |  | 2 |
| 1342 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 1438 | 98 | 98 ✓ | ✓ |  | 2 |
| 1438 | 53 | 53 ✓ | ✓ |  | 2 |
| 1438 | 61 | 61 ✓ | ✓ |  | 2 |
| 1497 | 20 | 20 ✓ | – | ✓ OCR legge 90 (il 2 tocca il filetto); a vista: FLAPS 20° · seconda conferma: DATI-AFM.md: stallo flap UP / 20° / 40° | 3 |
| 1497 | 89 | 89 ✓ | ✓ |  | 2 |
| 1497 | 48 | 48 ✓ | ✓ |  | 2 |
| 1497 | 55 | 55 ✓ | ✓ |  | 2 |
| 1562 | 40 | 40 ✓ | – | ✓ a vista: FLAPS 40° · seconda conferma: DATI-AFM.md: stallo flap UP / 20° / 40° | 3 |
| 1562 | 85 | 85 ✓ | ✓ |  | 2 |
| 1562 | 46 | 46 ✓ | ✓ |  | 2 |
| 1562 | 53 | 53 ✓ | ✓ |  | 2 |
| 1650 | 2-1. | 2-1, ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Vne 298 km/h · 161 kts · 185 MPH, Vno 235 · 127 · 146, Vfe 161 · 87 · 100: nessuna tabella del progetto da confrontare (il progetto usa le velocita' di prestazione, non queste).
- Vp 190 km/h · 104 kts · 118 MPH = DATI-AFM.md, 'VA' FR172J: 190 km/h, 104 kt, 118 MPH ✓
- Stallo a 1157 kg, flap UP / 20° / 40°: 61 / 55 / 53 MPH = DATI-AFM.md (tabella delle differenze FR172J/FR172H) ✓; 98/89/85 km/h e 53/48/46 kts coerenti con le MPH (1 MPH = 1,609 km/h = 0,869 kt) ✓
- GROSS WEIGHT 1157 kg = massa massima del progetto (DATI-AFM.md) ✓

### Pagina 2-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 196 | 2-2 | 2-2 ✓ | – | ✓ a vista: Page: 2-2 · seconda conferma: posizione nel PDF: pagina 24, fra 2-1 e 2-3 (mappa tools/afm/afm-ccaf.json) | 3 |
| 322 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 477 | 298 | 298 ✓ | ✓ |  | 2 |
| 477 | 161 | 16)  | ✓ | ✓ OCR legge 16); a vista: Red Line 298 km/h - 161 kts - 185 MPH · seconda conferma: DATI-AFM.md: VNE 161 kt; e la terna torna: 298 km/h = 160,9 kt = 185,2 MPH | 3 |
| 477 | 185 | 185 ✓ | ✓ |  | 2 |
| 509 | 235 | 235 ✓ | ✓ |  | 2 |
| 509 | 298 | 298 ✓ | ✓ |  | 2 |
| 509 | 127 | 127 ✓ | ✓ |  | 2 |
| 509 | 161 | 161 ✓ | ✓ |  | 2 |
| 509 | 146 | 146 ✓ | ✓ |  | 2 |
| 509 | 185 | 185 ✓ | ✓ |  | 2 |
| 571 | 103 | 103 ✓ | ✓ |  | 2 |
| 571 | 235 | 235 ✓ | ✓ |  | 2 |
| 571 | 56 | 56 ✓ | ✓ |  | 2 |
| 571 | 127 | 127 ✓ | ✓ |  | 2 |
| 571 | 64 | 64 ✓ | ✓ |  | 2 |
| 571 | 146 | 146 ✓ | ✓ |  | 2 |
| 635 | 89 | 89 ✓ | ✓ |  | 2 |
| 635 | 161 | 161 ✓ | ✓ |  | 2 |
| 635 | 48 | 48 ✓ | ✓ |  | 2 |
| 635 | 87 | 87 ✓ | ✓ |  | 2 |
| 635 | 55 | 55 ✓ | ✓ |  | 2 |
| 635 | 100 | 100 ✓ | ✓ |  | 2 |
| 726 | 8 | –  | – | ✓ OCR non legge; a vista: Adjustment: 8 to 16 km/h · seconda conferma: la terna torna: 8 km/h = 4,3 kt = 5,0 MPH (4 kts, 5 MPH sulla stessa riga) | 2 |
| 726 | 16 | 16 ✓ | ✓ |  | 2 |
| 726 | 4 | 4 ✓ | ✓ |  | 2 |
| 726 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 726 | 5 | 5 ✓ | – | ✓ a vista: 5 to 10 MPH · seconda conferma: 8 km/h = 5,0 MPH e 16 km/h = 9,9 MPH: 5 to 10 MPH torna | 3 |
| 726 | 10 | 10 ✓ | ✓ |  | 2 |
| 883 | 2550 | 2550 ✓ | ✓ |  | 2 |
| 883 | (1157 | (1157 ✓ | ✓ |  | 2 |
| 912 | +3,8 | 43,8  | ✓ | ✓ OCR legge 43,8 (il + attaccato); a vista: Flaps Up +3,8 · seconda conferma: DATI-AFM.md: fattore di carico 3,8 della categoria normale (formula della VA); e -1,52 = 0,4 x 3,8, la regola dei limiti negativi | 3 |
| 912 | -1,52 | 1,52 ✓ | ✓ |  | 2 |
| 943 | +3,0 | 3,0 ✓ | ✓ |  | 2 |
| 976 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 976 | 998 | 998 ✓ | ✓ |  | 2 |
| 1004 | +4,4 | 4,4 ✓ | ✓ |  | 2 |
| 1004 | -1,76 | -1,76 ✓ | ✓ |  | 2 |
| 1035 | +3,0 | 3,0 ✓ | ✓ |  | 2 |
| 1214 | 2550 | 2550 ✓ | ✓ |  | 2 |
| 1214 | (1157 | (1157 ✓ | ✓ |  | 2 |
| 1275 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1275 | 998 | 998 ✓ | ✓ |  | 2 |
| 1641 | +1,04 | 1,04 ✓ | ✓ |  | 2 |
| 1641 | 2550 | 2550 ✓ | ✓ |  | 2 |
| 1641 | (1157 | (1157 ✓ | ✓ |  | 2 |
| 1641 | +1,20 | 1,20 ✓ | ✓ |  | 2 |
| 1641 | 2550 | 2550 ✓ | ✓ |  | 2 |
| 1641 | (1157 | (1157 ✓ | ✓ |  | 2 |
| 1672 | +0,89 | 40,89  | ✓ | ✓ OCR legge 40,89; a vista: +0,89 m at 1950 lbs · seconda conferma: DATI-AFM.md, inviluppo di centraggio: +0,89 m fino a 885 kg (1950 lbs) | 3 |
| 1672 | 1950 | 1950 ✓ | ✓ |  | 2 |
| 1672 | 885 | 885 ✓ | ✓ |  | 2 |

### Pagina 2-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 247 | 2-3 | 2-3 ✓ | ✓ |  | 2 |
| 280 | 3 | 3 ✓ | ✓ |  | 2 |
| 471 | +0,95 | 0,95 ✓ | ✓ |  | 2 |
| 471 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 471 | (998 | (998 ✓ | ✓ |  | 2 |
| 468 | +1,03 | 1,03 ✓ | ✓ |  | 2 |
| 468 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 468 | (998 | (998 ✓ | ✓ |  | 2 |
| 502 | +0,89 | 0,89 ✓ | ✓ |  | 2 |
| 502 | 1950 | 1950 ✓ | ✓ |  | 2 |
| 502 | (885 | (885 ✓ | ✓ |  | 2 |
| 688 | 2 | 2 ✓ | ✓ |  | 2 |
| 718 | 2 | 2 ✓ | ✓ |  | 2 |
| 751 | 120 | 120 ✓ | ✓ |  | 2 |
| 751 | (54 | (54 ✓ | ✓ |  | 2 |
| 783 | 1 | l  | ✓ | ✓ OCR legge l; a vista: Minimum Crew: 1 · seconda conferma: manuale I-CCAB, pagina 2-3 (altra scansione): Minimum Crew: 1 | 3 |
| 814 | 200 | 200 ✓ | ✓ |  | 2 |
| 814 | (91 | (91 ✓ | ✓ |  | 2 |
| 1308 | 201 | 201 ✓ | ✓ |  | 2 |
| 1308 | 109 | 109 ✓ | ✓ |  | 2 |
| 1308 | 125 | 125 ✓ | ✓ |  | 2 |
| 1339 | 201 | 201 ✓ | ✓ |  | 2 |
| 1339 | 109 | 109 ✓ | ✓ |  | 2 |
| 1339 | 125 | 125 ✓ | ✓ |  | 2 |
| 1369 | 190 | 190 ✓ | ✓ |  | 2 |
| 1369 | 104 | 104 ✓ | ✓ |  | 2 |
| 1369 | 118 | 118 ✓ | ✓ |  | 2 |
| 1493 | 118 | 118 ✓ | ✓ |  | 2 |

### Pagina 2-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 203 | 2-4 | 14  | ✓ | ✓ OCR legge 14 (ritaglio); a vista: Page: 2-4 · seconda conferma: posizione nel PDF: pagina 26, fra 2-3 e 2-5 (mappa tools/afm/afm-ccaf.json) | 3 |
| 324 | 3 | 3 ✓ | ✓ |  | 2 |
| 645 | 210 | 210 ✓ | ✓ |  | 2 |
| 645 | (157 | (157 ✓ | ✓ |  | 2 |
| 645 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 819 | 37 | 37 ✓ | ✓ |  | 2 |
| 819 | 20 | 20 ✓ | ✓ |  | 2 |
| 849 | 28 | 28 ✓ | ✓ |  | 2 |
| 849 | 15 | 1S  | ✓ | ✓ OCR legge 1S; a vista: 28 km/h - 15 kts · seconda conferma: la coppia torna: 28 km/h = 15,1 kt | 3 |
| 1059 | 300 | 300 ✓ | ✓ |  | 2 |
| 1059 | 460 | 460 ✓ | ✓ |  | 2 |
| 1059 | (149 | (149 ✓ | ✓ |  | 2 |
| 1059 | 238 | 238 ✓ | ✓ |  | 2 |
| 1090 | 460 | 460 ✓ | ✓ |  | 2 |
| 1090 | (238 | (238 ✓ | ✓ |  | 2 |
| 1212 | 240 | 240 ✓ | ✓ |  | 2 |
| 1212 | (116 | (116 ✓ | ✓ |  | 2 |
| 1297 | 10 | 10 ✓ | ✓ |  | 2 |
| 1297 | (0,689 | (0,689 ✓ | ✓ |  | 2 |
| 1328 | 30-60 | 30-60 ✓ | ✓ |  | 2 |
| 1328 | (2,067-4,134 | (2,067-4,134 ✓ | ✓ |  | 2 |
| 1357 | 100 | 100 ✓ | ✓ |  | 2 |
| 1357 | (6,890 | (6,890 ✓ | ✓ |  | 2 |
| 1448 | (11,5 | (11,5 ✓ | ✓ |  | 2 |
| 1541 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1541 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 1571 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1661 | 15-25,0 | 15-25,0 ✓ | ✓ |  | 2 |
| 1661 | (508-847 | (508-847 ✓ | ✓ |  | 2 |

### Pagina 2-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 255 | 2-5 | 2-5 ✓ | ✓ |  | 2 |
| 288 | 3 | 3 ✓ | ✓ |  | 2 |
| 405 | 4,5-11,5 | 45-11,5  | ✓ | ✓ OCR legge 45-11,5 (la virgola persa); a vista: 4,5-11,5 gal/hr · seconda conferma: la coppia torna: 4,5 gal = 17,0 litri, 11,5 gal = 43,5 litri (1 U.S. gal = 3,785 litri), come fra parentesi | 3 |
| 405 | (17,0-43,5 | (17,0-43,5 ✓ | ✓ |  | 2 |
| 436 | 3,0 | 3,0 ✓ | ✓ |  | 2 |
| 436 | 18,5 | 18,5 ✓ | ✓ |  | 2 |
| 436 | (0,21 | (0,21 ✓ | ✓ |  | 2 |
| 436 | 1,28 | 1,28 ✓ | ✓ |  | 2 |
| 467 | (18,0 | (18,0 ✓ | ✓ |  | 2 |
| 467 | 68,1 | 68,1 ✓ | – | ✓ Tesseract legge 68,1; lo strato di testo del PDF non ha la parola · seconda conferma: la coppia torna: 18,0 gal = 68,1 litri (1 U.S. gal = 3,785 litri) | 3 |
| 622 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 746 | 17 | 17 ✓ | ✓ |  | 2 |
| 746 | (64,4 | (64,4 ✓ | – | ✓ Tesseract legge (64,4; lo strato di testo del PDF non ha la parola · seconda conferma: la coppia torna: 17 gal = 64,3 litri (1 U.S. gal = 3,785 litri), arrotondato 64,4 come nell'originale | 3 |
| 777 | 4000 | 4000 ✓ | ✓ |  | 2 |
| 777 | 15 | i)  | ✓ | ✓ OCR legge i); a vista: 15 gal/hr · seconda conferma: la coppia torna: 15 gal = 56,8 litri (1 U.S. gal = 3,785 litri) | 3 |
| 777 | (56,8 | (56,8 ✓ | ✓ |  | 2 |
| 808 | 8000 | 8000 ✓ | ✓ |  | 2 |
| 808 | 13 | 13 ✓ | ✓ |  | 2 |
| 808 | (49,2 | (49,2 ✓ | ✓ |  | 2 |
| 839 | 12000 | 12000 ✓ | ✓ |  | 2 |
| 839 | 11 | II  | ✓ | ✓ OCR legge II; a vista: 11 gal/hr · seconda conferma: la coppia torna: 11 gal = 41,6 litri (1 U.S. gal = 3,785 litri) | 3 |
| 839 | (41,6 | (41,6 ✓ | – | ✓ Tesseract legge (41,6; lo strato del PDF legge (41 · seconda conferma: la coppia torna: 11 gal = 41,6 litri (1 U.S. gal = 3,785 litri) | 3 |

### Pagina 2-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 172 | 2-6 | 2-6 ✓ | ✓ |  | 2 |
| 315 | 3 | j  | – | ✓ OCR legge j (evidenziatore sopra); a vista: Edition: 3 · seconda conferma: tutte le pagine di I-CCAF sono Edition 3 | 2 |
| 564 | (1) | (1) ✓ | ✓ |  | 2 |
| 1493 | (2) | (2) ✓ | ✓ |  | 2 |
| 791 | 118 | 118 ✓ | ✓ |  | 2 |
| 791 | (104 | (104 ✓ | ✓ |  | 2 |
| 790 | 118 | 118 ✓ | ✓ |  | 2 |
| 790 | (104 | (104 ✓ | ✓ |  | 2 |
| 821 | 2550 | 2950  | ✓ | ✓ OCR legge 2950; a vista: GROSS WEIGHT 2550 lbs. · seconda conferma: pagina 2-2: Normal Category 2550 lbs (1157 kg); DATI-AFM.md: MTOW 1157 kg | 3 |
| 821 | 2200 | 2200 ✓ | – | ✓ Tesseract legge 2200; lo strato del PDF no · seconda conferma: pagina 2-2: Utility Category 2200 lbs (998 kg) | 3 |
| 852 | +3.8, | 3.8, ✓ | ✓ |  | 2 |
| 852 | -1.52 | -1.52. ✓ | ✓ |  | 2 |
| 852 | +4.4, | 4144,  | ✓ | ✓ OCR legge 4144,; a vista: +4.4, -1.76 · seconda conferma: pagina 2-2: Utility Category Flaps Up +4,4 -1,76 | 3 |
| 852 | -1.76 | -1.76 ✓ | ✓ |  | 2 |
| 882 | +3.0 | 3.0 ✓ | ✓ |  | 2 |
| 882 | +3.0 | 3.0 ✓ | ✓ |  | 2 |
| 914 | 20 | 20 ✓ | ✓ |  | 2 |
| 914 | 90 | 5  | – | ✓ OCR legge 5; a vista: 20 knots at 90° · seconda conferma: pagina 2-4: Take-off direct crosswind limitation 20 kts (componente a 90 gradi) | 2 |
| 1087 | 125 | 125 ✓ | ✓ |  | 2 |
| 1087 | (109 | (109 ✓ | – | ✓ Tesseract legge (109; lo strato del PDF no · seconda conferma: pagina 2-3: Chandelles 201 km/h - 109 kts - 125 MPH | 3 |
| 1117 | 125 | 125 ✓ | ✓ |  | 2 |
| 1117 | (109 | (109 ✓ | – | ✓ Tesseract legge (109; lo strato del PDF no · seconda conferma: pagina 2-3: Lazy Eights 201 km/h - 109 kts - 125 MPH | 3 |
| 1148 | 118 | 118 ✓ | ✓ |  | 2 |
| 1148 | (104 | (104 ✓ | ✓ |  | 2 |
| 1178 | 160 | 160 ✓ | ✓ |  | 2 |
| 1209 | 118 | 118 ✓ | ✓ |  | 2 |
| 1607 | 23 | 23 ✓ | ✓ |  | 2 |
| 1639 | 23 | 23 ✓ | ✓ |  | 2 |
| 1620 | 46 | 46 ✓ | ✓ |  | 2 |

### Pagina 2-7 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 263 | 2-7 | 2-7 ✓ | ✓ |  | 2 |
| 295 | 3 | 3 ✓ | ✓ |  | 2 |
| 389 | (3) | (3) ✓ | ✓ |  | 2 |
| 632 | (4) | (4) ✓ | ✓ |  | 2 |
| 717 | 200 | 200 ✓ | ✓ |  | 2 |
| 717 | 120 | 120 ✓ | ✓ |  | 2 |
| 898 | (5) | (9)  | ✓ | ✓ OCR legge (9); a vista: (5) On left hand instrument panel cover · seconda conferma: sequenza dei cartelli: (3) e (4) sopra, (6) e (7) sotto | 3 |
| 1259 | (6) | (6) ✓ | ✓ |  | 2 |
| 1372 | 20 | 20 ✓ | – | ✓ Tesseract legge 20 (il grado in apice a parte); a vista: above 20°F · seconda conferma: manuale I-CCAB (Edition 2), pagina 2-8, cartello (8): when outside air temp. is above 20°F | 3 |
| 1521 | (7) | (7) ✓ | ✓ |  | 2 |

### Pagina 2-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 193 | 2-8 | 28  | ✓ | ✓ OCR legge 28; a vista: Page: 2-8 · seconda conferma: posizione nel PDF: pagina 30, ultima della sezione II (mappa tools/afm/afm-ccaf.json) | 3 |
| 327 | 3 | 3 ✓ | ✓ |  | 2 |
| 420 | (8) | (8) ✓ | ✓ |  | 2 |
| 628 | 2800 | 2300  | ✓ | ✓ OCR legge 2300; a vista: FULL THROTTLE AND 2800 RPM · seconda conferma: pagina 2-5, nota: full throttle and 2800 RPM; pagina 2-4: 2800 RPM regime massimo | 3 |
| 691 | 17 | 17 ✓ | ✓ |  | 2 |
| 722 | 4000 | 4000 ✓ | ✓ |  | 2 |
| 722 | 15 | 1)  | – | ✓ OCR legge 1); a vista: 4000 FT 15 GPH · seconda conferma: pagina 2-5: 4000 Feet 15 gal/hr | 2 |
| 753 | 8000 | 8000 ✓ | ✓ |  | 2 |
| 753 | 13 | 13 ✓ | – | ✓ Tesseract legge 13; lo strato del PDF no · seconda conferma: pagina 2-5: 8000 Feet 13 gal/hr | 3 |
| 784 | 12000 | 12000 ✓ | ✓ |  | 2 |
| 784 | 11 | l  | ✓ | ✓ OCR legge l; a vista: 12000 FT 11 GPH · seconda conferma: pagina 2-5: 12000 Feet 11 gal/hr | 3 |

### Pagina 3-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 234 | 3-1 | 3-  | ✓ | ✓ OCR legge 3- (ritaglio stretto); a vista: Page: 3-1 · seconda conferma: posizione nel PDF: pagina 31, prima pagina della sezione III dopo 2-8 (mappa tools/afm/afm-ccaf.json) | 3 |
| 265 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 763 | (1) | (1) ✓ | ✓ |  | 2 |
| 794 | (2) | (2) ✓ | ✓ |  | 2 |
| 825 | (3) | (3) ✓ | ✓ |  | 2 |
| 886 | (4) | (4) ✓ | ✓ |  | 2 |
| 917 | (5) | (5) ✓ | ✓ |  | 2 |
| 1041 | (1) | (1) ✓ | ✓ |  | 2 |
| 1041 | 129 | 129 ✓ | ✓ |  | 2 |
| 1041 | 70 | 70 ✓ | ✓ |  | 2 |
| 1041 | 80 | 80 ✓ | ✓ |  | 2 |
| 1072 | (2) | (2) ✓ | ✓ |  | 2 |
| 1102 | (3) | (3) ✓ | ✓ |  | 2 |
| 1134 | (4) | (4) ✓ | ✓ |  | 2 |
| 1165 | (5) | (5) ✓ | ✓ |  | 2 |
| 1504 | (1) | (1) ✓ | ✓ |  | 2 |
| 1504 | 137 | 137 ✓ | ✓ |  | 2 |
| 1504 | 74 | 74 ✓ | ✓ |  | 2 |
| 1504 | 85 | 85 ✓ | ✓ |  | 2 |
| 1569 | (2) | (2) ✓ | ✓ |  | 2 |
| 1599 | (3) | (3) ✓ | ✓ |  | 2 |
| 1630 | (4) | (4) ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Planata dopo il decollo 129 km/h - 70 kts - 80 MPH: la terna torna (129 km/h = 69,7 kt = 80,2 MPH) ✓
- Planata in volo 137 km/h - 74 kts - 85 MPH: DATI-AFM.md, V best glide 85 MPH (fig. 5-7) ✓; la terna torna (137 km/h = 74,0 kt = 85,1 MPH) ✓

### Pagina 3-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 190 | 3-2 | 3-2 ✓ | ✓ |  | 2 |
| 334 | 3 | 3 ✓ | ✓ |  | 2 |
| 424 | (5) | (3)  | ✓ | ✓ OCR legge altro; a vista: (5) · seconda conferma: la numerazione dei punti: (5) viene fra (4) di 3-1 (in fondo) e (6) nello stesso elenco | 3 |
| 424 | 3-5 | 3-5 ✓ | ✓ |  | 2 |
| 453 | 1/2 | 1/2 ✓ | ✓ |  | 2 |
| 484 | (6) | (6) ✓ | ✓ |  | 2 |
| 484 | (2,5 | (2,5 ✓ | ✓ |  | 2 |
| 514 | (7) | (7) ✓ | ✓ |  | 2 |
| 698 | (1) | (1) ✓ | ✓ |  | 2 |
| 729 | (2) | (2) ✓ | ✓ |  | 2 |
| 760 | (3) | (3) ✓ | ✓ |  | 2 |
| 791 | (4) | (4) ✓ | ✓ |  | 2 |
| 822 | (5) | (5) ✓ | ✓ |  | 2 |
| 1343 | (1) | (1) ✓ | ✓ |  | 2 |
| 1373 | (2) | (2) ✓ | ✓ |  | 2 |
| 1403 | (3) | (3) ✓ | ✓ |  | 2 |
| 1433 | (4) | (4) ✓ | ✓ |  | 2 |
| 1463 | (5) | (5) ✓ | ✓ |  | 2 |
| 1644 | (6) | (6) ✓ | ✓ |  | 2 |

### Pagina 3-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 238 | 3-3 | 3-3 ✓ | ✓ |  | 2 |
| 271 | 3 | 3 ✓ | ✓ |  | 2 |
| 517 | (1) | (1) ✓ | ✓ |  | 2 |
| 545 | (2) | (2) ✓ | ✓ |  | 2 |
| 576 | (3) | (3) ✓ | ✓ |  | 2 |
| 607 | (4) | (4) ✓ | ✓ |  | 2 |
| 607 | 193 | 193 ✓ | ✓ |  | 2 |
| 607 | 104 | 104 ✓ | ✓ |  | 2 |
| 607 | 120 | 120 ✓ | ✓ |  | 2 |
| 638 | (5) | (5) ✓ | ✓ |  | 2 |
| 669 | (6) | (6) ✓ | ✓ |  | 2 |
| 700 | (7) | (7) ✓ | ✓ |  | 2 |
| 762 | (8) | (8) ✓ | ✓ |  | 2 |
| 948 | (1) | (1) ✓ | ✓ |  | 2 |
| 979 | (2) | (2) ✓ | ✓ |  | 2 |
| 1435 | (1) | (1) ✓ | ✓ |  | 2 |
| 1466 | (2) | (2) ✓ | ✓ |  | 2 |

### Pagina 3-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 187 | 3-4 | 34  | – | ✓ a vista: Page: 3-4 · seconda conferma: posizione nel PDF: pagina 34, fra 3-3 e 3-5 (mappa tools/afm/afm-ccaf.json) | 2 |
| 325 | 3 | 3 ✓ | ✓ |  | 2 |
| 704 | (1) | (1) ✓ | ✓ |  | 2 |
| 732 | (2) | (2) ✓ | ✓ |  | 2 |
| 764 | (3) | (3) ✓ | ✓ |  | 2 |
| 828 | (4) | (4) ✓ | ✓ |  | 2 |
| 858 | (5) | (3)  | – | ✓ OCR legge altro; a vista: (5) · seconda conferma: la numerazione dei punti: (5) viene fra (4) e (6) nello stesso elenco | 2 |
| 921 | (6) | (6) ✓ | ✓ |  | 2 |
| 1168 | (1) | (1) ✓ | ✓ |  | 2 |
| 1199 | (2) | (2) ✓ | ✓ |  | 2 |
| 1410 | 121 | 121 ✓ | ✓ |  | 2 |
| 1410 | 65 | 65 ✓ | – | ✓ a vista: 121 km/h - 65 kts · seconda conferma: la terna torna: 121 km/h = 65,3 kt = 75,2 MPH; e la stessa terna 121 km/h - 65 kts - 75 MPH sta su 3-5 (righe 635 e 791) | 3 |
| 1441 | 75 | 15  | – | ✓ OCR legge 15; a vista: 75 MPH · seconda conferma: la terna torna: 121 km/h = 65,3 kt = 75,2 MPH; e la stessa terna 121 km/h - 65 kts - 75 MPH sta su 3-5 (righe 635 e 791) | 2 |
| 1441 | 20°) | 209)  | – | ✓ OCR legge 209); a vista: 20 con la o in apice · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 2 |

### Pagina 3-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 228 | 3-5 | 3-5 ✓ | ✓ |  | 2 |
| 259 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 605 | (1) | (1) ✓ | ✓ |  | 2 |
| 635 | (2) | (2) ✓ | ✓ |  | 2 |
| 635 | 20° | 20 ✓ | – | ✓ a vista: 20 con la o in apice · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 3 |
| 635 | 121 | 121 ✓ | ✓ |  | 2 |
| 635 | 65 | 65 ✓ | ✓ |  | 2 |
| 635 | 75 | 75 ✓ | ✓ |  | 2 |
| 728 | (3) | (3) ✓ | ✓ |  | 2 |
| 791 | (4) | (4) ✓ | ✓ |  | 2 |
| 791 | 40° | 40 ✓ | – | ✓ a vista: 40 con la o in apice · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 3 |
| 791 | 121 | 121 ✓ | ✓ |  | 2 |
| 791 | 65 | 65 ✓ | ✓ |  | 2 |
| 791 | 75 | 75 ✓ | ✓ |  | 2 |
| 822 | (5) | (5) ✓ | ✓ |  | 2 |
| 853 | (6) | (6) ✓ | ✓ |  | 2 |
| 885 | (7) | (7) ✓ | ✓ |  | 2 |
| 1068 | 137 | 137 ✓ | ✓ |  | 2 |
| 1068 | 74 | 14  | ✓ | ✓ OCR legge 14; a vista: 137 km/h - 74 kts - 85 MPH · seconda conferma: la terna torna: 137 km/h = 74,0 kt = 85,1 MPH; DATI-AFM.md V best glide 85 MPH; uguale su 3-1 | 3 |
| 1100 | 85 | 85 ✓ | ✓ |  | 2 |
| 1315 | (1) | (1) ✓ | ✓ |  | 2 |
| 1344 | (2) | (2) ✓ | ✓ |  | 2 |
| 1374 | (3) | (3) ✓ | ✓ |  | 2 |
| 1405 | (4) | (4) ✓ | ✓ |  | 2 |
| 1405 | 121 | 121 ✓ | ✓ |  | 2 |
| 1405 | 137 | 137 ✓ | ✓ |  | 2 |
| 1405 | 65 | 65 ✓ | ✓ |  | 2 |
| 1405 | 74 | 14  | ✓ | ✓ OCR legge 14; a vista: 65 to 74 kts · seconda conferma: la terna torna: 137 km/h = 74,0 kt = 85,1 MPH (85 MPH sulla stessa riga) | 3 |
| 1405 | 75 | 15  | ✓ | ✓ OCR legge 15; a vista: 75 to 85 MPH · seconda conferma: la terna torna: 121 km/h = 65,3 kt = 75,2 MPH (121 e 65 sulla stessa riga) | 3 |
| 1405 | 85 | 85 ✓ | ✓ |  | 2 |
| 1435 | (5) | (5) ✓ | ✓ |  | 2 |
| 1466 | (6) | (6) ✓ | ✓ |  | 2 |
| 1466 | 113 | 13  | ✓ | ✓ OCR legge 13; a vista: 113 to 129 km/h · seconda conferma: la terna torna: 113 km/h = 61,0 kt = 70,2 MPH; e 113 km/h - 61 kts - 70 MPH sta anche su 3-6 (riga 701) | 3 |
| 1466 | 129 | 129 ✓ | ✓ |  | 2 |
| 1466 | 61 | 6)  | ✓ | ✓ OCR legge 6); a vista: 61 to 70 kts · seconda conferma: 113 km/h = 61,0 kt; la stessa terna su 3-6 (riga 701) | 3 |
| 1466 | 70 | 70 ✓ | ✓ |  | 2 |
| 1466 | 70 | 70 ✓ | ✓ |  | 2 |
| 1466 | 80 | 80 ✓ | ✓ |  | 2 |
| 1530 | (7) | (7) ✓ | ✓ |  | 2 |
| 1561 | (8) | (8) ✓ | ✓ |  | 2 |
| 1591 | (9) | (9) ✓ | ✓ |  | 2 |
| 1623 | (10) | (10) ✓ | – | ✓ OCR legge altro; a vista: (10) · seconda conferma: la numerazione dei punti: (10) viene fra (9) e la fine dell'elenco nello stesso elenco | 3 |

Confronto con i dati del progetto:

- Velocita' della sezione III, tutte terne km/h - kts - MPH che tornano fra loro (1 kt = 1,852 km/h, 1 MPH = 1,609 km/h): 113-61-70, 121-65-75, 129-70-80, 137-74-85 (V best glide 85 MPH in DATI-AFM.md), 145-78-90, 193-104-120 ✓

### Pagina 3-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 179 | 3-6 | 3-6 ✓ | ✓ |  | 2 |
| 326 | 3 | 3 ✓ | ✓ |  | 2 |
| 546 | 121.5 | 121.5 ✓ | ✓ |  | 2 |
| 608 | (1) | (1) ✓ | ✓ |  | 2 |
| 670 | (2) | (2) ✓ | ✓ |  | 2 |
| 670 | 40° | 409  | – | ✓ OCR legge 409; a vista: 40 con la o in apice · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 2 |
| 670 | 300 | 300 ✓ | ✓ |  | 2 |
| 701 | 113 | 113 ✓ | ✓ |  | 2 |
| 701 | 61 | 61 ✓ | ✓ |  | 2 |
| 701 | 70 | 70 ✓ | ✓ |  | 2 |
| 732 | (3) | (3) ✓ | ✓ |  | 2 |
| 763 | (4) | (4) ✓ | ✓ |  | 2 |
| 856 | (5) | (5) ✓ | ✓ |  | 2 |
| 886 | (6) | (6) ✓ | ✓ |  | 2 |
| 950 | (7) | (7) ✓ | ✓ |  | 2 |
| 1315 | (1) | (1) ✓ | ✓ |  | 2 |
| 1346 | (2) | (2) ✓ | ✓ |  | 2 |
| 1407 | (3) | (3) ✓ | ✓ |  | 2 |
| 1468 | (4) | (4) ✓ | ✓ |  | 2 |
| 1499 | (5) | (5) ✓ | ✓ |  | 2 |
| 1559 | (6) | (6) ✓ | ✓ |  | 2 |
| 1559 | 0,5 | 0,5 ✓ | ✓ |  | 2 |
| 1619 | (7) | (7) ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- 121.5 MHz: la frequenza d'emergenza aeronautica ✓; 0,5 cm di ghiaccio, 300 ft./min.: nessuna fonte del progetto da confrontare (due letture concordi)

### Pagina 3-7 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 232 | 3-7 | 3-7 ✓ | ✓ |  | 2 |
| 262 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 362 | (8) | (8) ✓ | ✓ |  | 2 |
| 421 | (9) | (9) ✓ | ✓ |  | 2 |
| 484 | (10) | (10) ✓ | ✓ |  | 2 |
| 484 | 129 | 129 ✓ | ✓ |  | 2 |
| 484 | 145 | 145 ✓ | ✓ |  | 2 |
| 484 | 70 | 70 ✓ | ✓ |  | 2 |
| 484 | 78 | 78 ✓ | ✓ |  | 2 |
| 484 | 80 | 80 ✓ | ✓ |  | 2 |
| 484 | 90 | 90 ✓ | ✓ |  | 2 |
| 547 | (11) | (11) ✓ | ✓ |  | 2 |
| 577 | (12) | (12) ✓ | ✓ |  | 2 |
| 828 | (1) | (1) ✓ | ✓ |  | 2 |
| 857 | (2) | (2) ✓ | ✓ |  | 2 |
| 920 | (3) | 3) ✓ | ✓ |  | 2 |
| 953 | 145 | 145 ✓ | ✓ |  | 2 |
| 953 | 78 | 78 ✓ | ✓ |  | 2 |
| 953 | 90 | 90 ✓ | ✓ |  | 2 |
| 982 | (4) | (4) ✓ | ✓ |  | 2 |
| 982 | 145 | 145 ✓ | ✓ |  | 2 |
| 982 | 78 | 78 ✓ | ✓ |  | 2 |
| 982 | 90 | 90 ✓ | ✓ |  | 2 |
| 1045 | (5) | (5) ✓ | ✓ |  | 2 |
| 1107 | (6) | (6) ✓ | ✓ |  | 2 |
| 1169 | (7) | (7) ✓ | ✓ |  | 2 |

### Pagina 3-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 236 | 3-8 | if  | – | ✓ a vista: Page: 3-8 · seconda conferma: posizione nel PDF: pagina 38, fra 3-7 e 3-9 (mappa tools/afm/afm-ccaf.json) | 2 |
| 336 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 806 | 16 | 16 ✓ | ✓ |  | 2 |

### Pagina 3-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 237 | 3-9 | 3-9 ✓ | ✓ |  | 2 |
| 270 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 4-1

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 237 | 4-1 | 4-  | ✓ | ✓ a vista: Page: 4-1 · seconda conferma: posizione nel PDF: pagina 41, fra 3-9 (pagina 40 bianca) e 4-2 (mappa tools/afm/afm-ccaf.json) | 3 |
| 268 | 3 | 3 ✓ | ✓ |  | 2 |
| 708 | (1) | (1) ✓ | ✓ |  | 2 |
| 708 | 4-1. | 4-1, ✓ | ✓ |  | 2 |
| 864 | (1) | (1) ✓ | ✓ |  | 2 |
| 896 | (2) | (2) ✓ | ✓ |  | 2 |
| 927 | (3) | (3) ✓ | ✓ |  | 2 |
| 959 | (4) | (4) ✓ | ✓ |  | 2 |
| 991 | (5) | (5) ✓ | ✓ |  | 2 |
| 1146 | (1) | (1) ✓ | ✓ |  | 2 |
| 1178 | (2) | (2) ✓ | ✓ |  | 2 |
| 1208 | (3) | (3) ✓ | ✓ |  | 2 |
| 1208 | 1 | l  | – | ✓ OCR legge l; a vista: Opened 1 inch (2,5 cm) · seconda conferma: 1 inch = 2,54 cm, e la parentesi dice 2,5 cm; su 3-2 la stessa voce: "Opened one inch (2,5 cm)" | 2 |
| 1208 | (2,5 | (2,5 ✓ | ✓ |  | 2 |
| 1239 | (4) | (4) ✓ | ✓ |  | 2 |
| 1270 | (5) | (5) ✓ | ✓ |  | 2 |
| 1301 | (6) | (6) ✓ | ✓ |  | 2 |
| 1301 | 2 | 2 ✓ | ✓ |  | 2 |
| 1301 | 4 | 4 ✓ | ✓ |  | 2 |
| 1301 | (7,8 | (7,8 ✓ | ✓ |  | 2 |
| 1301 | 15,5 | 15,5 ✓ | ✓ |  | 2 |
| 1363 | 30 | 30 ✓ | ✓ |  | 2 |
| 1393 | (7) | (7) ✓ | ✓ |  | 2 |

### Pagina 4-2

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 1437 | 1 | 0  | – | ✓ cifra cerchiata; a vista: 1 · seconda conferma: la numerazione delle stazioni dell'ispezione esterna: la 1 apre l'elenco (a. ... f.), poi 2 ... 8 su 4-3; e la stazione 1 e' segnata nel disegno sopra | 2 |
| 161 | 4-2 | )  | ✓ | ✓ a vista: Page: 4-2 · seconda conferma: posizione nel PDF: pagina 42, fra 4-1 e 4-3 (mappa tools/afm/afm-ccaf.json) | 3 |
| 327 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 4-3

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 241 | 4-3 | 4.3 ✓ | ✓ |  | 2 |
| 273 | 3 | :  | – | ✓ a vista: Edition: e un pezzo del 3, tagliato dal bordo della scansione · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 2 |
| 399 | 2 | 2 ✓ | – |  | 1 |
| 518 | 3 | 3 ✓ | – |  | 1 |
| 579 | 4 | 4 ✓ | – |  | 1 |
| 802 | 5 | 5 ✓ | – |  | 1 |
| 916 | (6,6 | (6,6 ✓ | ✓ |  | 2 |
| 947 | (9,5 | (9,5 ✓ | ✓ |  | 2 |
| 1236 | 6 | G  | – | ✓ cifra cerchiata; a vista: 6 · seconda conferma: la numerazione delle stazioni dell'ispezione esterna: 6 viene fra 5 e 7 nella stessa pagina | 2 |
| 1418 | 7 | z  | – | ✓ cifra cerchiata; a vista: 7 · seconda conferma: la numerazione delle stazioni: 7 viene fra 6 e 8 | 2 |
| 1600 | 8 | 8 ✓ | – |  | 1 |
| 1633 | 4-1. | 4-  | ✓ | ✓ a vista: 4-1. (seguito della didascalia "Figure" di 4-2) · seconda conferma: mappa tools/afm/afm-ccaf.json: la figura 4-1 (Exterior Inspection) e' a pagina 4-2; 4-1 e' citata anche su 4-1 ("in accordance with figure 4-1") | 3 |

### Pagina 4-4

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 181 | 4-4 | 4.4 ✓ | ✓ |  | 2 |
| 318 | 3 | j  | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 2 |
| 408 | 15 | 15 ✓ | ✓ |  | 2 |
| 533 | (8) | (8) ✓ | ✓ |  | 2 |
| 533 | 30 | 30 ✓ | ✓ |  | 2 |
| 704 | (1) | (1) ✓ | ✓ |  | 2 |
| 736 | (2) | (2) ✓ | ✓ |  | 2 |
| 768 | (3) | (3) ✓ | ✓ |  | 2 |
| 801 | (4) | (4) ✓ | ✓ |  | 2 |
| 832 | (5) | (5) ✓ | ✓ |  | 2 |
| 832 | 1800 | 1800 ✓ | ✓ |  | 2 |
| 864 | (6) | (6) ✓ | ✓ |  | 2 |
| 895 | (7) | (7) ✓ | ✓ |  | 2 |
| 895 | (4, | (4, ✓ | ✓ |  | 2 |
| 895 | 6 | 6 ✓ | – |  | 1 |
| 895 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 925 | (8) | (8) ✓ | ✓ |  | 2 |
| 925 | 150 | 150 ✓ | ✓ |  | 2 |
| 955 | 50 | 50 ✓ | ✓ |  | 2 |
| 982 | (9) | (9) ✓ | ✓ |  | 2 |
| 1013 | (10) | (10) ✓ | ✓ |  | 2 |
| 1045 | (11) | (11) ✓ | ✓ |  | 2 |
| 1076 | (12) | (12) ✓ | ✓ |  | 2 |
| 1306 | (1) | (1) ✓ | ✓ |  | 2 |
| 1306 | 0° | 0 ✓ | ✓ |  | 2 |
| 1306 | 10°. | 10, ✓ | ✓ |  | 2 |
| 1337 | (2) | (2) ✓ | ✓ |  | 2 |
| 1337 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1367 | (3) | (3) ✓ | ✓ |  | 2 |
| 1397 | (4) | (4) ✓ | ✓ |  | 2 |
| 1397 | 97 | 97 ✓ | ✓ |  | 2 |
| 1397 | 52 | 52 ✓ | ✓ |  | 2 |
| 1397 | 60 | 60 ✓ | ✓ |  | 2 |
| 1427 | (5) | (5) ✓ | ✓ |  | 2 |
| 1427 | 137 | 137 ✓ | ✓ |  | 2 |
| 1427 | 153 | 153 ✓ | ✓ |  | 2 |
| 1427 | 74 | 74 ✓ | ✓ |  | 2 |
| 1427 | 83 | 83 ✓ | ✓ |  | 2 |
| 1427 | 85 | 85 ✓ | ✓ |  | 2 |
| 1427 | 95 | 95 ✓ | ✓ |  | 2 |
| 1458 | (7) | (7) ✓ | ✓ |  | 2 |
| 1578 | (1) | (1) ✓ | ✓ |  | 2 |
| 1578 | 10°. | 10. ✓ | ✓ |  | 2 |
| 1608 | (2) | (2) ✓ | ✓ |  | 2 |
| 1640 | (3) | (3) ✓ | ✓ |  | 2 |
| 1640 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1671 | (4) | (4) ✓ | ✓ |  | 2 |

### Pagina 4-5

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 248 | 4-5 | 4-5 ✓ | – |  | 1 |
| 281 | 3 | 3 ✓ | ✓ |  | 2 |
| 376 | (5) | (3)  | ✓ | ✓ OCR legge altro; a vista: (5) · seconda conferma: la numerazione: (5) viene fra (4) in fondo a 4-4 e (6) | 3 |
| 406 | (6) | (6) ✓ | ✓ |  | 2 |
| 440 | (7) | (7) ✓ | ✓ |  | 2 |
| 440 | 109 | 109 ✓ | ✓ |  | 2 |
| 440 | 59 | 59 ✓ | ✓ |  | 2 |
| 440 | 68 | 68 ✓ | ✓ |  | 2 |
| 530 | (8) | (8) ✓ | ✓ |  | 2 |
| 746 | (1) | (1) ✓ | ✓ |  | 2 |
| 746 | 161 | 61  | ✓ | ✓ OCR legge 61; a vista: 161 to 177 km/h · seconda conferma: la terna torna: 161 km/h = 86,9 kt = 100,0 MPH (87 kts e 100 MPH sulla stessa riga); la stessa frase su 4-11 | 3 |
| 746 | 177 | 177 ✓ | ✓ |  | 2 |
| 746 | 87 | 87 ✓ | ✓ |  | 2 |
| 746 | 96 | 96 ✓ | ✓ |  | 2 |
| 746 | 100 | 100 ✓ | ✓ |  | 2 |
| 746 | 110 | 110 ✓ | ✓ |  | 2 |
| 776 | (2) | (2) ✓ | ✓ |  | 2 |
| 776 | 25 | 25 ✓ | ✓ |  | 2 |
| 776 | (847 | (847 ✓ | ✓ |  | 2 |
| 776 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 806 | (3) | (3) ✓ | ✓ |  | 2 |
| 806 | 13 | 13 ✓ | ✓ |  | 2 |
| 806 | (49,2 | (49,2 ✓ | ✓ |  | 2 |
| 929 | (1) | (1) ✓ | ✓ |  | 2 |
| 929 | 137 | 137 ✓ | ✓ |  | 2 |
| 929 | 74 | 74 ✓ | ✓ |  | 2 |
| 929 | 85 | 85 ✓ | ✓ |  | 2 |
| 929 | 134 | 134 ✓ | ✓ |  | 2 |
| 929 | 72 | 72 ✓ | ✓ |  | 2 |
| 960 | 83 | 83 ✓ | ✓ |  | 2 |
| 960 | 10,000 | 10,000 ✓ | ✓ |  | 2 |
| 989 | (2) | (2) ✓ | ✓ |  | 2 |
| 989 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1020 | (3) | (3) ✓ | ✓ |  | 2 |
| 1174 | (1) | (1) ✓ | ✓ |  | 2 |
| 1174 | 15 | 15 ✓ | – |  | 1 |
| 1174 | 25 | 25 ✓ | ✓ |  | 2 |
| 1174 | (508 | (508 ✓ | ✓ |  | 2 |
| 1174 | 847 | 847 ✓ | ✓ |  | 2 |
| 1174 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1205 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 1205 | 75% | 1SK  | ✓ | ✓ OCR legge 1SK; a vista: 75% power · seconda conferma: su 4-11: "Normal cruising is done between 65% and 75% power" | 3 |
| 1236 | (2) | (2) ✓ | ✓ |  | 2 |
| 1267 | (3) | (3) ✓ | ✓ |  | 2 |
| 1450 | (1) | (1) ✓ | ✓ |  | 2 |
| 1481 | (2) | (2) ✓ | ✓ |  | 2 |
| 1634 | (1) | (1) ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Velocita' della sezione IV: terne km/h - kts - MPH che tornano fra loro (1 kt = 1,852 km/h, 1 MPH = 1,609 km/h): 97-52-60, 109-59-68, 113-61-70, 117-63-73, 121-65-75, 129-70-80, 134-72-83, 137-74-85, 153-83-95, 161-87-100, 177-96-110 ✓

### Pagina 4-6

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 189 | 4-6 | 4.6 ✓ | ✓ |  | 2 |
| 321 | 3 | 3 ✓ | ✓ |  | 2 |
| 418 | (2) | (2) ✓ | ✓ |  | 2 |
| 450 | (3) | (3) ✓ | ✓ |  | 2 |
| 481 | (4) | (4) ✓ | ✓ |  | 2 |
| 481 | 121 | 121 ✓ | ✓ |  | 2 |
| 481 | 137 | 137 ✓ | ✓ |  | 2 |
| 481 | 65 | 65 ✓ | ✓ |  | 2 |
| 481 | 74 | 74 ✓ | ✓ |  | 2 |
| 481 | 75 | 15  | ✓ | ✓ OCR legge 15; a vista: 75 to 85 MPH · seconda conferma: la terna torna: 121 km/h = 75,2 MPH (121 sulla stessa riga); uguale su 3-5 | 3 |
| 481 | 85 | 85 ✓ | ✓ |  | 2 |
| 512 | (5) | (5) ✓ | ✓ |  | 2 |
| 544 | (6) | (6) ✓ | ✓ |  | 2 |
| 544 | 113 | 113 ✓ | ✓ |  | 2 |
| 544 | 129 | 129 ✓ | ✓ |  | 2 |
| 544 | 61 | 61 ✓ | ✓ |  | 2 |
| 544 | 70 | 70 ✓ | ✓ |  | 2 |
| 544 | 70 | 70 ✓ | ✓ |  | 2 |
| 544 | 80 | 80 ✓ | ✓ |  | 2 |
| 699 | (1) | (I)  | ✓ | ✓ OCR legge altro; a vista: (1) · seconda conferma: la numerazione: (1) viene fra il titolo BALKED LANDING e (2) | 3 |
| 699 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 730 | (2) | (2) ✓ | ✓ |  | 2 |
| 730 | 20°. | 209,  | – | ✓ OCR legge 209,; a vista: Retract to 20 con la o in apice · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado; su 4-14 la stessa manovra: "reduced to 20°" | 2 |
| 762 | (3) | (3) ✓ | ✓ |  | 2 |
| 762 | 121 | 121 ✓ | ✓ |  | 2 |
| 762 | 65 | 65 ✓ | ✓ |  | 2 |
| 762 | 75 | 75 ✓ | ✓ |  | 2 |
| 950 | (1) | (1) ✓ | ✓ |  | 2 |
| 981 | (2) | (2) ✓ | ✓ |  | 2 |
| 1012 | (3) | (3) ✓ | ✓ |  | 2 |
| 1167 | (1) | (1) ✓ | ✓ |  | 2 |
| 1319 | (1) | (1) ✓ | ✓ |  | 2 |
| 1350 | (2) | (2) ✓ | ✓ |  | 2 |
| 1381 | (3) | (3) ✓ | ✓ |  | 2 |
| 1411 | (4) | (4) ✓ | ✓ |  | 2 |
| 1442 | (5) | (5) ✓ | ✓ |  | 2 |

### Pagina 4-7

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 229 | 4-7 | 4-7 ✓ | ✓ |  | 2 |
| 261 | 3 | 3 ✓ | ✓ |  | 2 |
| 755 | 2 | 2 ✓ | ✓ |  | 2 |
| 755 | 4 | 4 ✓ | ✓ |  | 2 |
| 755 | (7,8 | (7,8 ✓ | ✓ |  | 2 |
| 755 | 15,5 | 15,5 ✓ | ✓ |  | 2 |
| 911 | 1/2 | 1/2 ✓ | ✓ |  | 2 |
| 1068 | 3 | 3 ✓ | ✓ |  | 2 |
| 1068 | 5 | 3  | – | ✓ OCR legge 3; a vista: 3 to 5 revolutions · seconda conferma: lo strato di testo del PDF (lettura indipendente) legge 5 ("5revolutions") | 2 |
| 1466 | 4-2) | 4-2) ✓ | ✓ |  | 2 |

### Pagina 4-8

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 334 | 4-8 | 4-8 ✓ | ✓ |  | 2 |
| 365 | 3 | 3 ✓ | ✓ |  | 2 |
| 1710 | 4-2. | 4-2, ✓ | ✓ |  | 2 |

### Pagina 4-9

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 225 | 4-9 | 4.9 ✓ | ✓ |  | 2 |
| 256 | 3 | 3 ✓ | ✓ |  | 2 |
| 657 | 1800 | 1800 ✓ | ✓ |  | 2 |
| 750 | 150 | 150 ✓ | ✓ |  | 2 |
| 813 | 50 | 50 ✓ | ✓ |  | 2 |
| 1178 | 3 | 3 ✓ | ✓ |  | 2 |
| 1178 | 5 | 5 ✓ | ✓ |  | 2 |
| 1240 | (1800 | (1800 ✓ | ✓ |  | 2 |

### Pagina 4-10

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 319 | 4-10 | 416  | – | ✓ a vista: Page: 4-10 · seconda conferma: posizione nel PDF: pagina 50, fra 4-9 e 4-11 (mappa tools/afm/afm-ccaf.json) | 2 |
| 351 | 3 | 3 ✓ | ✓ |  | 2 |
| 656 | 3000 | 3000 ✓ | ✓ |  | 2 |
| 687 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 812 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 843 | 25 | 25 ✓ | ✓ |  | 2 |
| 843 | (847 | (847 ✓ | ✓ |  | 2 |
| 843 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 936 | 10° | 10 ✓ | – |  | 1 |
| 967 | 5 | 5 ✓ | – |  | 1 |
| 967 | 15° | 159  | – | ✓ OCR legge 159; a vista: 15 con la o in apice · seconda conferma: lo strato di testo del PDF legge 150 (15 e il grado); e piu' sotto nella stessa pagina "greater than 15°" | 2 |
| 1244 | 10°, | 10, ✓ | – |  | 1 |
| 1305 | (137 | (137 ✓ | ✓ |  | 2 |
| 1305 | 74 | 74 ✓ | ✓ |  | 2 |
| 1305 | 85 | 85 ✓ | ✓ |  | 2 |
| 1336 | 15° | 15 ✓ | – |  | 1 |

### Pagina 4-11

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 229 | 4-11 | 4-1  | ✓ | ✓ a vista: Page: 4-11 · seconda conferma: posizione nel PDF: pagina 51, fra 4-10 e 4-12 (mappa tools/afm/afm-ccaf.json) | 3 |
| 262 | 3 | 3 ✓ | ✓ |  | 2 |
| 726 | 161 | 161 ✓ | ✓ |  | 2 |
| 726 | 177 | 177 ✓ | ✓ |  | 2 |
| 726 | 87 | 87 ✓ | ✓ |  | 2 |
| 726 | 96 | 96 ✓ | ✓ |  | 2 |
| 726 | 100 | 100 ✓ | ✓ |  | 2 |
| 726 | 110 | 110 ✓ | ✓ |  | 2 |
| 758 | 25 | 25 ✓ | ✓ |  | 2 |
| 758 | (847 | (847 ✓ | ✓ |  | 2 |
| 758 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 788 | 13 | 13 ✓ | ✓ |  | 2 |
| 788 | (49,2 | (49,2 ✓ | ✓ |  | 2 |
| 853 | 137 | 137 ✓ | ✓ |  | 2 |
| 853 | 74 | 74 ✓ | ✓ |  | 2 |
| 853 | 85 | 85 ✓ | ✓ |  | 2 |
| 882 | 134 | 134 ✓ | ✓ |  | 2 |
| 882 | 72 | 72 ✓ | ✓ |  | 2 |
| 882 | 83 | 83 ✓ | ✓ |  | 2 |
| 882 | 10,000 | 10,000 ✓ | ✓ |  | 2 |
| 882 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1008 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1008 | 109 | 109 ✓ | ✓ |  | 2 |
| 1008 | 59 | 59 ✓ | ✓ |  | 2 |
| 1008 | 68 | 68 ✓ | ✓ |  | 2 |
| 1039 | 121 | 121 ✓ | ✓ |  | 2 |
| 1039 | 65 | 65 ✓ | ✓ |  | 2 |
| 1039 | 75 | 75 ✓ | ✓ |  | 2 |
| 1039 | 10,000 | 10,000 ✓ | ✓ |  | 2 |
| 1403 | 65% | 65 ✓ | ✓ |  | 2 |
| 1403 | 75% | 15h  | ✓ | ✓ OCR legge 15h; a vista: 65% and 75% power · seconda conferma: su 4-5: "no more than 75% power" | 3 |

### Pagina 4-12

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 333 | 4-12 | AI)  | – | ✓ a vista: Page: 4-12 (sotto i segni a evidenziatore) · seconda conferma: posizione nel PDF: pagina 52, fra 4-11 e 4-13 (mappa tools/afm/afm-ccaf.json) | 2 |
| 363 | 3 | 3 ✓ | ✓ |  | 2 |
| 640 | 5500 | 5500 ✓ | ✓ |  | 2 |
| 640 | 75 | 75 ✓ | ✓ |  | 2 |
| 639 | 232 | 232 ✓ | ✓ |  | 2 |
| 639 | 125 | 125 ✓ | ✓ |  | 2 |
| 638 | 144 | 144 ✓ | ✓ |  | 2 |
| 638 | 933 | 933 ✓ | ✓ |  | 2 |
| 639 | 504 | 504 ✓ | ✓ |  | 2 |
| 701 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 700 | 70 | 70 ✓ | ✓ |  | 2 |
| 699 | 229 | 229 ✓ | ✓ |  | 2 |
| 700 | 123 | 123 ✓ | ✓ |  | 2 |
| 699 | 142 | 142 ✓ | ✓ |  | 2 |
| 699 | 982 | 982 ✓ | ✓ |  | 2 |
| 700 | 530 | 530 ✓ | ✓ |  | 2 |
| 761 | 9000 | 9000 ✓ | ✓ |  | 2 |
| 760 | 65 | 65 ✓ | ✓ |  | 2 |
| 760 | 224 | 224 ✓ | ✓ |  | 2 |
| 760 | 121 | 121 ✓ | ✓ |  | 2 |
| 759 | 139 | 139 ✓ | ✓ |  | 2 |
| 760 | 1038 | 1038 ✓ | ✓ |  | 2 |
| 760 | 560 | 560 ✓ | ✓ |  | 2 |
| 849 | 4-3. | 4-3, ✓ | ✓ |  | 2 |
| 1241 | 8 | –  | ✓ | ✓ a vista: between 8 and 16 km/h · seconda conferma: la terna torna: 8 km/h = 4,3 kt = 5,0 MPH (4 kts e 5 MPH sulla stessa riga) | 3 |
| 1241 | 16 | 16 ✓ | ✓ |  | 2 |
| 1241 | 4 | 4 ✓ | ✓ |  | 2 |
| 1241 | 8,5 | 8.5 ✓ | ✓ |  | 2 |
| 1241 | 5 | 5 ✓ | ✓ |  | 2 |
| 1241 | 10 | 10 ✓ | ✓ |  | 2 |
| 1361 | 5-3 | 5-3 ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 4-3: velocita' vere 232 km/h = 125,3 kt = 144,2 MPH, 229 = 123,6 = 142,3, 224 = 121,0 = 139,2 ✓; autonomie 933 km = 503,8 NM, 982 = 530,2, 1038 = 560,5 ✓ (1 NM = 1,852 km); potenze 75 / 70 / 65 % coerenti con "between 65% and 75% power" di 4-11 ✓
- Avviso di stallo 8 e 16 km/h - 4 e 8,5 kts - 5 e 10 MPH: le terne tornano (16 km/h = 8,6 kt = 9,9 MPH) ✓

### Pagina 4-13

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 223 | 4-13 | 4-13 ✓ | ✓ |  | 2 |
| 255 | 3 | 3 ✓ | ✓ |  | 2 |
| 688 | (1) | (1) ✓ | ✓ |  | 2 |
| 718 | (2) | (2) ✓ | ✓ |  | 2 |
| 749 | (3) | (3) ✓ | ✓ |  | 2 |
| 812 | (4) | (4) ✓ | ✓ |  | 2 |
| 1121 | 20° | 20 ✓ | – |  | 1 |
| 1305 | 117 | 117 ✓ | ✓ |  | 2 |
| 1334 | 63 | 63 ✓ | ✓ |  | 2 |
| 1334 | 73 | 73 ✓ | ✓ |  | 2 |
| 1334 | 40°, | 409,  | – | ✓ OCR legge 409,; a vista: 40 con la o in apice · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado; lo strato di testo del PDF legge 400, | 2 |
| 1610 | 20° | 20 ✓ | – |  | 1 |

### Pagina 4-14

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 319 | 4-14 | 44  | – | ✓ a vista: Page: 4-14 · seconda conferma: posizione nel PDF: pagina 54, fra 4-13 e 4-15 (mappa tools/afm/afm-ccaf.json) | 2 |
| 351 | 3 | 3 ✓ | ✓ |  | 2 |
| 717 | 20° | 20 ✓ | – |  | 1 |
| 748 | 2 | 2 ✓ | ✓ |  | 2 |
| 1391 | (-20°C | (-20C ✓ | – |  | 1 |
| 1697 | (1) | (1) ✓ | ✓ |  | 2 |

### Pagina 4-15

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 232 | 4-15 | 4-1.  | – | ✓ a vista: Page: 4-1 e l'attacco del 5, tagliato dal bordo della scansione · seconda conferma: posizione nel PDF: pagina 55, fra 4-14 e 4-16 (mappa tools/afm/afm-ccaf.json) | 2 |
| 264 | 3 | :  | – | ✓ a vista: Edition: e un pezzo del 3, tagliato dal bordo della scansione · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 2 |
| 416 | (1) | (1) ✓ | ✓ |  | 2 |
| 479 | (2) | (2) ✓ | ✓ |  | 2 |
| 510 | (3) | (3) ✓ | ✓ |  | 2 |
| 541 | (4) | (4) ✓ | ✓ |  | 2 |
| 572 | (5) | (5) ✓ | ✓ |  | 2 |
| 572 | (2,5 | (2,5 ✓ | ✓ |  | 2 |
| 602 | (6) | (6) ✓ | ✓ |  | 2 |
| 602 | -5°C | 5C ✓ | – |  | 1 |
| 634 | -20°C | -20C ✓ | – |  | 1 |
| 820 | (7) | (7) ✓ | ✓ |  | 2 |
| 851 | (8) | (8) ✓ | ✓ |  | 2 |
| 882 | (9) | (9) ✓ | ✓ |  | 2 |
| 945 | (10) | (10) ✓ | ✓ |  | 2 |
| 976 | (11) | (11) ✓ | ✓ |  | 2 |
| 1620 | (2 | (2 ✓ | ✓ |  | 2 |
| 1620 | 5 | –  | ✓ | ✓ OCR non legge; a vista: (2 to 5 minutes at 1000 RPM) · seconda conferma: lo strato di testo del PDF legge 5 | 3 |
| 1620 | 1000 | 1000 ✓ | ✓ |  | 2 |

### Pagina 4-16

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 361 | 4-16 | 4-16 ✓ | ✓ |  | 2 |
| 393 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 5-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 223 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 252 | 3 | 3 ✓ | ✓ |  | 2 |

### Pagina 5-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 336 | 5-2 | 5-2 ✓ | – | ✓ a vista: Page: 5-2 · seconda conferma: posizione nel PDF: pagina 58, fra 5-1 (pagina 57) e 5-3 (mappa tools/afm/afm-ccaf.json) | 3 |
| 365 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 339 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 367 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 397 | 46 | 46 ✓ | ✓ |  | 2 |
| 397 | (174 | (174 ✓ | ✓ |  | 2 |
| 893 | 1 | 1 ✓ | ✓ |  | 2 |
| 959 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 959 | 1 | 1 ✓ | ✓ |  | 2 |
| 959 | 5). | 2).  | ✓ | ✓ a vista: (Sheet ... of 5). · seconda conferma: la figura 5-1 (Cruise Performance) ha cinque fogli, uno per quota (2500, 5000, 7500, 10000, 15000 piedi), alle pagine 5-2 ... 5-6: questo e' il foglio 1 | 3 |
| 480 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 480 | 813 | B13  | ✓ | ✓ OCR legge B13; a vista: 813 · seconda conferma: la colonna torna: 24,0 in Hg x 33,86 = 813 mb; e lo strato di testo del PDF legge 813 | 3 |
| 480 | 24 | 24 ✓ | ✓ |  | 2 |
| 480 | 77 | 77 ✓ | ✓ |  | 2 |
| 480 | 229 | 229 ✓ | ✓ |  | 2 |
| 480 | 123 | 123 ✓ | ✓ |  | 2 |
| 480 | 142 | 142 ✓ | ✓ |  | 2 |
| 480 | 11,7 | 11,7 ✓ | ✓ |  | 2 |
| 480 | 44,3 | 44,3 ✓ | ✓ |  | 2 |
| 480 | 3,9 | 3,9 ✓ | ✓ |  | 2 |
| 480 | 901 | 901 ✓ | ✓ |  | 2 |
| 480 | 487 | 487 ✓ | ✓ |  | 2 |
| 496 | 779 | 779 ✓ | ✓ |  | 2 |
| 496 | 23 | 23 ✓ | ✓ |  | 2 |
| 496 | 72 | 72 ✓ | ✓ |  | 2 |
| 496 | 222 | 222 ✓ | ✓ |  | 2 |
| 496 | 120 | 120 ✓ | ✓ |  | 2 |
| 496 | 138 | 138 ✓ | ✓ |  | 2 |
| 496 | 11,0 | 11,0 ✓ | ✓ |  | 2 |
| 496 | 41,6 | 41,6 ✓ | ✓ |  | 2 |
| 496 | 4,2 | 4,2 ✓ | ✓ |  | 2 |
| 496 | 933 | 933 ✓ | ✓ |  | 2 |
| 496 | 504 | 504 ✓ | ✓ |  | 2 |
| 512 | 745 | 745 ✓ | ✓ |  | 2 |
| 512 | 22 | 22 ✓ | ✓ |  | 2 |
| 512 | 67 | 67 ✓ | ✓ |  | 2 |
| 512 | 216 | 216 ✓ | ✓ |  | 2 |
| 512 | 116 | 118  | ✓ | ✓ OCR legge 118; a vista: 116 · seconda conferma: la riga torna: 216,0 km/h / 1,852 = 116,6 kts; e lo strato di testo del PDF legge 116 | 3 |
| 512 | 134 | 134 ✓ | ✓ |  | 2 |
| 512 | 10,2 | 10,2 ✓ | ✓ |  | 2 |
| 512 | 38,6 | 38,6 ✓ | ✓ |  | 2 |
| 512 | 4,5 | 4,5 ✓ | ✓ |  | 2 |
| 512 | 974 | 974 ✓ | ✓ |  | 2 |
| 512 | 526 | 526 ✓ | ✓ |  | 2 |
| 528 | 711 | 711 ✓ | ✓ |  | 2 |
| 528 | 21 | 2  | ✓ | ✓ OCR legge 2; a vista: 21 · seconda conferma: la colonna torna: 711,0 mb / 33,86 = 21.0 in Hg; e lo strato di testo del PDF legge 21 | 3 |
| 528 | 62 | 82  | ✓ | ✓ OCR legge 82; a vista: 62 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 62 | 3 |
| 528 | 209 | 208  | ✓ | ✓ OCR legge 208; a vista: 209 · seconda conferma: la riga torna: 113,0 kts x 1,852 = 209,3 km/h, 130,0 MPH x 1,609 = 209,2 km/h; e lo strato di testo del PDF legge 209 | 3 |
| 528 | 113 | 113 ✓ | ✓ |  | 2 |
| 528 | 130 | 130 ✓ | ✓ |  | 2 |
| 528 | 9,5 | 9,5 ✓ | ✓ |  | 2 |
| 528 | 36,0 | 36,0 ✓ | ✓ |  | 2 |
| 528 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 528 | 1006 | 1006 ✓ | ✓ |  | 2 |
| 528 | 543 | 543 ✓ | ✓ |  | 2 |
| 548 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 548 | 847 | B47  | ✓ | ✓ OCR legge B47; a vista: 847 · seconda conferma: la colonna torna: 25,0 in Hg x 33,86 = 847 mb; e lo strato di testo del PDF legge 847 | 3 |
| 548 | 25 | 26  | ✓ | ✓ OCR legge 26; a vista: 25 · seconda conferma: la colonna torna: 847,0 mb / 33,86 = 25.0 in Hg; e lo strato di testo del PDF legge 25 | 3 |
| 548 | 78 | 78 ✓ | ✓ |  | 2 |
| 548 | 229 | 229 ✓ | ✓ |  | 2 |
| 548 | 123 | 123 ✓ | ✓ |  | 2 |
| 548 | 142 | 142 ✓ | ✓ |  | 2 |
| 548 | 11,8 | 11,8 ✓ | ✓ |  | 2 |
| 548 | 44,7 | 44,7 ✓ | ✓ |  | 2 |
| 548 | 3,9 | 3,9 ✓ | ✓ |  | 2 |
| 548 | 893 | 893 ✓ | ✓ |  | 2 |
| 548 | 482 | 482 ✓ | ✓ |  | 2 |
| 564 | 813 | 813 ✓ | ✓ |  | 2 |
| 564 | 24 | 24 ✓ | ✓ |  | 2 |
| 564 | 73 | 73 ✓ | ✓ |  | 2 |
| 564 | 224 | 224 ✓ | ✓ |  | 2 |
| 564 | 121 | 1271  | ✓ | ✓ OCR legge 1271; a vista: 121 · seconda conferma: la riga torna: 224,0 km/h / 1,852 = 121,0 kts; e lo strato di testo del PDF legge 121 | 3 |
| 564 | 139 | 139 ✓ | ✓ |  | 2 |
| 564 | 11,1 | 11,1 ✓ | ✓ |  | 2 |
| 564 | 42,0 | 42,0 ✓ | ✓ |  | 2 |
| 564 | 4,1 | 4,1 ✓ | ✓ |  | 2 |
| 564 | 925 | 925 ✓ | ✓ |  | 2 |
| 564 | 500 | 500 ✓ | ✓ |  | 2 |
| 580 | 779 | 779 ✓ | ✓ |  | 2 |
| 580 | 23 | 23 ✓ | ✓ |  | 2 |
| 580 | 69 | 69 ✓ | ✓ |  | 2 |
| 580 | 219 | 219 ✓ | ✓ |  | 2 |
| 580 | 118 | 118 ✓ | ✓ |  | 2 |
| 580 | 136 | 136 ✓ | ✓ |  | 2 |
| 580 | 10,5 | 10,5 ✓ | ✓ |  | 2 |
| 580 | 39,7 | 39,7 ✓ | ✓ |  | 2 |
| 580 | 4,4 | 4,4 ✓ | ✓ |  | 2 |
| 580 | 958 | 958 ✓ | ✓ |  | 2 |
| 580 | 517 | 517 ✓ | ✓ |  | 2 |
| 596 | 745 | 745 ✓ | ✓ |  | 2 |
| 596 | 22 | 22 ✓ | ✓ |  | 2 |
| 596 | 64 | SA  | ✓ | ✓ OCR legge SA; a vista: 64 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 64 | 3 |
| 596 | 211 | 211 ✓ | – | ✓ OCR legge 211; a vista: 211 · seconda conferma: la riga torna: 114,0 kts x 1,852 = 211,1 km/h, 131,0 MPH x 1,609 = 210,8 km/h | 3 |
| 596 | 114 | 114 ✓ | ✓ |  | 2 |
| 596 | 131 | 131 ✓ | ✓ |  | 2 |
| 596 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 596 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 596 | 4,7 | 4,7 ✓ | ✓ |  | 2 |
| 596 | 990 | 990 ✓ | ✓ |  | 2 |
| 596 | 534 | 534 ✓ | ✓ |  | 2 |
| 615 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 615 | 847 | 847 ✓ | ✓ |  | 2 |
| 615 | 25 | 25 ✓ | ✓ |  | 2 |
| 615 | 73 | 73 ✓ | ✓ |  | 2 |
| 615 | 224 | 224 ✓ | ✓ |  | 2 |
| 615 | 121 | 121 ✓ | ✓ |  | 2 |
| 615 | 139 | 139 ✓ | ✓ |  | 2 |
| 615 | 11,1 | 11,1 ✓ | ✓ |  | 2 |
| 615 | 42,0 | 42,0 ✓ | ✓ |  | 2 |
| 615 | 4,1 | 4,1 ✓ | ✓ |  | 2 |
| 615 | 925 | 925 ✓ | ✓ |  | 2 |
| 615 | 500 | 500 ✓ | ✓ |  | 2 |
| 632 | 813 | 813 ✓ | ✓ |  | 2 |
| 632 | 24 | 24 ✓ | ✓ |  | 2 |
| 632 | 69 | 69 ✓ | ✓ |  | 2 |
| 632 | 219 | 219 ✓ | ✓ |  | 2 |
| 632 | 118 | 118 ✓ | ✓ |  | 2 |
| 632 | 136 | 136 ✓ | ✓ |  | 2 |
| 632 | 10,5 | 10,5 ✓ | ✓ |  | 2 |
| 632 | 39,7 | 39,7 ✓ | ✓ |  | 2 |
| 632 | 4,4 | 4,4 ✓ | ✓ |  | 2 |
| 632 | 958 | 958 ✓ | ✓ |  | 2 |
| 632 | 517 | 517 ✓ | ✓ |  | 2 |
| 648 | 779 | 779 ✓ | ✓ |  | 2 |
| 648 | 23 | 23 ✓ | ✓ |  | 2 |
| 648 | 65 | 65 ✓ | ✓ |  | 2 |
| 648 | 212 | 212 ✓ | ✓ |  | 2 |
| 648 | 115 | 115 ✓ | ✓ |  | 2 |
| 648 | 132 | 132 ✓ | ✓ |  | 2 |
| 648 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 648 | 37,1 | 37,1 ✓ | – | ✓ OCR legge 37,1; a vista: 37,1 · seconda conferma: la riga torna: 9,8 galloni x 3,785 = 37.09 litri | 3 |
| 648 | 4,7 | 4,7 ✓ | ✓ |  | 2 |
| 648 | 990 | 390  | ✓ | ✓ OCR legge 390; a vista: 990 · seconda conferma: la riga torna: 46 / 9,8 galloni all'ora x 212,0 km/h = 995 km; 534,0 NM x 1,852 = 989 km; e lo strato di testo del PDF legge 990 | 3 |
| 648 | 534 | 534 ✓ | ✓ |  | 2 |
| 664 | 745 | 745 ✓ | ✓ |  | 2 |
| 664 | 22 | 22 ✓ | ✓ |  | 2 |
| 664 | 60 | ss  | ✓ | ✓ OCR legge ss; a vista: 60 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 60 | 3 |
| 664 | 206 | 206 ✓ | ✓ |  | 2 |
| 664 | 111 | 117  | ✓ | ✓ OCR legge 117; a vista: 111 · seconda conferma: la riga torna: 206,0 km/h / 1,852 = 111,2 kts; e lo strato di testo del PDF legge 111 | 3 |
| 664 | 128 | 128 ✓ | ✓ |  | 2 |
| 664 | 9,2 | 9,2 ✓ | ✓ |  | 2 |
| 664 | 34,8 | 34,8 ✓ | ✓ |  | 2 |
| 664 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 664 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 664 | 552 | 552 ✓ | ✓ |  | 2 |
| 684 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 684 | 847 | 847 ✓ | ✓ |  | 2 |
| 684 | 25 | 25 ✓ | ✓ |  | 2 |
| 684 | 68 | 68 ✓ | ✓ |  | 2 |
| 684 | 217 | 217 ✓ | – | ✓ OCR legge 217; a vista: 217 · seconda conferma: la riga torna: 117,0 kts x 1,852 = 216,7 km/h, 135,0 MPH x 1,609 = 217,2 km/h | 3 |
| 684 | 117 | 117 ✓ | ✓ |  | 2 |
| 684 | 135 | 135 ✓ | – | ✓ OCR legge 135; a vista: 135 · seconda conferma: la riga torna: 217,0 km/h / 1,609 = 134,9 MPH | 3 |
| 684 | 10,4 | 10,4 ✓ | ✓ |  | 2 |
| 684 | 39,4 | 39,4 ✓ | ✓ |  | 2 |
| 684 | 4,4 | 4,4 ✓ | ✓ |  | 2 |
| 684 | 966 | S66  | ✓ | ✓ OCR legge S66; a vista: 966 · seconda conferma: la riga torna: 46 / 10,4 galloni all'ora x 217,0 km/h = 960 km; 521,0 NM x 1,852 = 965 km; e lo strato di testo del PDF legge 966 | 3 |
| 684 | 521 | 521 ✓ | ✓ |  | 2 |
| 700 | 813 | 813 ✓ | ✓ |  | 2 |
| 700 | 24 | 24 ✓ | ✓ |  | 2 |
| 700 | 64 | 64 ✓ | ✓ |  | 2 |
| 700 | 211 | 211 ✓ | ✓ |  | 2 |
| 700 | 114 | 114 ✓ | ✓ |  | 2 |
| 700 | 131 | 131 ✓ | ✓ |  | 2 |
| 700 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 700 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 700 | 4,7 | 4,7 ✓ | ✓ |  | 2 |
| 700 | 990 | 390  | ✓ | ✓ OCR legge 390; a vista: 990 · seconda conferma: la riga torna: 46 / 9,8 galloni all'ora x 211,0 km/h = 990 km; 534,0 NM x 1,852 = 989 km; e lo strato di testo del PDF legge 990 | 3 |
| 700 | 534 | 534 ✓ | ✓ |  | 2 |
| 716 | 779 | 7793  | ✓ | ✓ OCR legge 7793; a vista: 779 · seconda conferma: la colonna torna: 23,0 in Hg x 33,86 = 779 mb; e lo strato di testo del PDF legge 779 | 3 |
| 716 | 23 | 23 ✓ | ✓ |  | 2 |
| 716 | 60 | 50  | ✓ | ✓ OCR legge 50; a vista: 60 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 60 | 3 |
| 716 | 206 | 206 ✓ | ✓ |  | 2 |
| 716 | 111 | 117  | ✓ | ✓ OCR legge 117; a vista: 111 · seconda conferma: la riga torna: 206,0 km/h / 1,852 = 111,2 kts; e lo strato di testo del PDF legge 111 | 3 |
| 716 | 128 | 128 ✓ | ✓ |  | 2 |
| 716 | 9,2 | 9,2 ✓ | ✓ |  | 2 |
| 716 | 34,8 | 34,8 ✓ | ✓ |  | 2 |
| 716 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 716 | 1030 | 1030 ✓ | ✓ |  | 2 |
| 716 | 556 | 556 ✓ | ✓ |  | 2 |
| 732 | 745 | 745 ✓ | ✓ |  | 2 |
| 732 | 22 | 22 ✓ | ✓ |  | 2 |
| 732 | 56 | 56 ✓ | ✓ |  | 2 |
| 732 | 198 | 198 ✓ | ✓ |  | 2 |
| 732 | 107 | 107 ✓ | ✓ |  | 2 |
| 732 | 123 | 123 ✓ | ✓ |  | 2 |
| 732 | 8,6 | 8,6 ✓ | ✓ |  | 2 |
| 732 | 32,6 | 32,6 ✓ | ✓ |  | 2 |
| 732 | 5,3 | 5.3 ✓ | ✓ |  | 2 |
| 732 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 732 | 574 | 574 ✓ | ✓ |  | 2 |
| 752 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 752 | 847 | 847 ✓ | ✓ |  | 2 |
| 752 | 25 | 25 ✓ | ✓ |  | 2 |
| 752 | 63 | 63 ✓ | ✓ |  | 2 |
| 752 | 211 | 211 ✓ | ✓ |  | 2 |
| 752 | 114 | 114 ✓ | ✓ |  | 2 |
| 752 | 131 | 131 ✓ | ✓ |  | 2 |
| 752 | 9,7 | S,7  | ✓ | ✓ OCR legge S,7; a vista: 9,7 · seconda conferma: la riga torna: 36,7 litri / 3,785 = 9.70 galloni; 46 galloni / 9,7 = 4.74 ore (4,8 stampate); e lo strato di testo del PDF legge 9,7 | 3 |
| 752 | 36,7 | 36,7 ✓ | ✓ |  | 2 |
| 752 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 752 | 998 | 938  | ✓ | ✓ OCR legge 938; a vista: 998 · seconda conferma: la riga torna: 46 / 9,7 galloni all'ora x 211,0 km/h = 1001 km; 539,0 NM x 1,852 = 998 km; e lo strato di testo del PDF legge 998 | 3 |
| 752 | 539 | 539 ✓ | ✓ |  | 2 |
| 768 | 813 | 813 ✓ | ✓ |  | 2 |
| 768 | 24 | 24 ✓ | ✓ |  | 2 |
| 768 | 60 | 60 ✓ | ✓ |  | 2 |
| 768 | 204 | 204 ✓ | ✓ |  | 2 |
| 768 | 110 | 110 ✓ | ✓ |  | 2 |
| 768 | 127 | 127 ✓ | ✓ |  | 2 |
| 768 | 9,1 | 9,1 ✓ | ✓ |  | 2 |
| 768 | 34,4 | 34,4 ✓ | ✓ |  | 2 |
| 768 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 768 | 1030 | 1030 ✓ | ✓ |  | 2 |
| 768 | 556 | 556 ✓ | ✓ |  | 2 |
| 784 | 779 | 773  | ✓ | ✓ OCR legge 773; a vista: 779 · seconda conferma: la colonna torna: 23,0 in Hg x 33,86 = 779 mb; e lo strato di testo del PDF legge 779 | 3 |
| 784 | 23 | 23 ✓ | ✓ |  | 2 |
| 784 | 56 | 56 ✓ | ✓ |  | 2 |
| 784 | 198 | 198 ✓ | ✓ |  | 2 |
| 784 | 107 | 107 ✓ | ✓ |  | 2 |
| 784 | 123 | 123 ✓ | ✓ |  | 2 |
| 784 | 8,6 | 8,6 ✓ | ✓ |  | 2 |
| 784 | 32,6 | 32,6 ✓ | ✓ |  | 2 |
| 784 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 784 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 784 | 574 | 574 ✓ | ✓ |  | 2 |
| 800 | 745 | 745 ✓ | ✓ |  | 2 |
| 800 | 22 | 22 ✓ | ✓ |  | 2 |
| 800 | 52 | 52 ✓ | ✓ |  | 2 |
| 800 | 192 | 192 ✓ | ✓ |  | 2 |
| 800 | 103 | 103 ✓ | ✓ |  | 2 |
| 800 | 119 | 119 ✓ | ✓ |  | 2 |
| 800 | 8,0 | 8,0 ✓ | ✓ |  | 2 |
| 800 | 30,3 | 30,3 ✓ | ✓ |  | 2 |
| 800 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 800 | 1094 | 1034  | ✓ | ✓ OCR legge 1034; a vista: 1094 · seconda conferma: la riga torna: 46 / 8,0 galloni all'ora x 192,0 km/h = 1104 km; 591,0 NM x 1,852 = 1095 km; e lo strato di testo del PDF legge 1094 | 3 |
| 800 | 591 | 591 ✓ | ✓ |  | 2 |
| 816 | 711 | 711 ✓ | ✓ |  | 2 |
| 816 | 21 | 21 ✓ | ✓ |  | 2 |
| 816 | 48 | 48 ✓ | ✓ |  | 2 |
| 816 | 183 | 183 ✓ | ✓ |  | 2 |
| 816 | 99 | 99 ✓ | ✓ |  | 2 |
| 816 | 114 | 114 ✓ | ✓ |  | 2 |
| 816 | 7,5 | 7,5 ✓ | ✓ |  | 2 |
| 816 | 28,4 | 28,4 ✓ | ✓ |  | 2 |
| 816 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 816 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 816 | 604 | 604 ✓ | ✓ |  | 2 |
| 832 | 677 | 677 ✓ | ✓ |  | 2 |
| 832 | 20 | 20 ✓ | ✓ |  | 2 |
| 832 | 44 | 44 ✓ | ✓ |  | 2 |
| 832 | 174 | 174 ✓ | ✓ |  | 2 |
| 832 | 94 | 94 ✓ | ✓ |  | 2 |
| 832 | 108 | 108 ✓ | ✓ |  | 2 |
| 832 | 7,0 | 7,0 ✓ | ✓ |  | 2 |
| 832 | 26,5 | 26,5 ✓ | ✓ |  | 2 |
| 832 | 6,6 | 6,6 ✓ | ✓ |  | 2 |
| 832 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 832 | 617 | 617 ✓ | ✓ |  | 2 |
| 849 | 643 | 643 ✓ | ✓ |  | 2 |
| 849 | 19 | 19 ✓ | ✓ |  | 2 |
| 849 | 41 | 41 ✓ | ✓ |  | 2 |
| 849 | 164 | 164 ✓ | ✓ |  | 2 |
| 849 | 89 | 89 ✓ | ✓ |  | 2 |
| 849 | 102 | 102 ✓ | ✓ |  | 2 |
| 849 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 849 | 24,6 | 24,6 ✓ | ✓ |  | 2 |
| 849 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 849 | 1159 | 1159s ✓ | ✓ |  | 2 |
| 849 | 626 | 626 ✓ | ✓ |  | 2 |
| 865 | 610 | 610 ✓ | ✓ |  | 2 |
| 865 | 18 | 18 ✓ | ✓ |  | 2 |
| 865 | 37 | 37 ✓ | ✓ |  | 2 |
| 865 | 151 | 151 ✓ | ✓ |  | 2 |
| 865 | 82 | 82 ✓ | ✓ |  | 2 |
| 865 | 94 | BA  | ✓ | ✓ OCR legge BA; a vista: 94 · seconda conferma: la riga torna: 151,0 km/h / 1,609 = 93,8 MPH; e lo strato di testo del PDF legge 94 | 3 |
| 865 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 865 | 22,7 | 22,7 ✓ | ✓ |  | 2 |
| 865 | 7,7 | 7,7 ✓ | ✓ |  | 2 |
| 865 | 1159 | 1153  | ✓ | ✓ OCR legge 1153; a vista: 1159 · seconda conferma: la riga torna: 46 / 6,0 galloni all'ora x 151,0 km/h = 1158 km; 626,0 NM x 1,852 = 1159 km; e lo strato di testo del PDF legge 1159 | 3 |
| 865 | 626 | 626 ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-1: ogni riga controllata con l'aritmetica della tabella (km/h = kts x 1,852 = MPH x 1,609; litri = galloni x 3,785; autonomia = 46 galloni / consumo; km = autonomia x km/h; NM = km / 1,852; in Hg = mb / 33,86): tutte tornano entro gli arrotondamenti ✓ (crociera_leggi.py). Le distanze sono quelle del manuale: in qualche riga km e autonomia differiscono di meno dell'1%, ma km e NM tornano sempre fra loro

### Pagina 5-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 217 | 5-3 | 5-3 ✓ | – | ✓ a vista: Page: 5-3 · seconda conferma: posizione nel PDF: pagina 59, fra 5-2 e 5-4 (mappa tools/afm/afm-ccaf.json) | 3 |
| 250 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 371 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 399 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 429 | 46 | 46 ✓ | ✓ |  | 2 |
| 429 | (174 | (174 ✓ | ✓ |  | 2 |
| 927 | 1 | 1 ✓ | ✓ |  | 2 |
| 994 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 994 | 2 | Pa  | ✓ | ✓ a vista: Figure 5-1 (Sheet 2 of 5). · seconda conferma: i cinque fogli della figura 5-1 sono alle pagine 5-2 ... 5-6: 5-3 e' il secondo (le didascalie di 5-2 e 5-4 dicono Sheet 1 e Sheet 3) | 3 |
| 994 | 5). | S).  | ✓ | ✓ a vista: (Sheet ... of 5). · seconda conferma: la figura 5-1 (Cruise Performance) ha cinque fogli, uno per quota (2500, 5000, 7500, 10000, 15000 piedi), alle pagine 5-2 ... 5-6: questo e' il foglio 2 | 3 |
| 512 | 2600 | 2600 ✓ | – | ✓ a vista: 2600 (con un puntino di sporco a sinistra) · seconda conferma: i gruppi di RPM di ogni foglio sono 2600, 2500, 2400, 2300, 2200; 2600 apre la tabella come negli altri quattro fogli | 3 |
| 512 | 779 | 773  | ✓ | ✓ OCR legge 773; a vista: 779 · seconda conferma: la colonna torna: 23,0 in Hg x 33,86 = 779 mb; e lo strato di testo del PDF legge 779 | 3 |
| 512 | 23 | 23 ✓ | ✓ |  | 2 |
| 512 | 75 | 75 ✓ | ✓ |  | 2 |
| 512 | 232 | 232 ✓ | ✓ |  | 2 |
| 512 | 125 | 125 ✓ | ✓ |  | 2 |
| 512 | 144 | 144 ✓ | ✓ |  | 2 |
| 512 | 11,4 | 11,4 ✓ | ✓ |  | 2 |
| 512 | 43,2 | 43,2 ✓ | ✓ |  | 2 |
| 512 | 4,0 | 4,0 ✓ | ✓ |  | 2 |
| 512 | 933 | 933 ✓ | ✓ |  | 2 |
| 512 | 504 | 504 ✓ | – | ✓ OCR legge 504; a vista: 504 · seconda conferma: la riga torna: 933,0 km / 1,852 = 503.8 NM | 3 |
| 528 | 745 | 745 ✓ | ✓ |  | 2 |
| 528 | 22 | 22 ✓ | ✓ |  | 2 |
| 528 | 71 | 71 ✓ | ✓ |  | 2 |
| 528 | 225 | 225 ✓ | ✓ |  | 2 |
| 528 | 122 | 122 ✓ | ✓ |  | 2 |
| 528 | 140 | 140 ✓ | ✓ |  | 2 |
| 528 | 10,7 | 10,7 ✓ | ✓ |  | 2 |
| 528 | 40,5 | 40,5 ✓ | ✓ |  | 2 |
| 528 | 4,3 | 4,3 ✓ | ✓ |  | 2 |
| 528 | 966 | 966 ✓ | ✓ |  | 2 |
| 528 | 521 | 521 ✓ | ✓ |  | 2 |
| 545 | 711 | 711 ✓ | ✓ |  | 2 |
| 545 | 21 | 21 ✓ | ✓ |  | 2 |
| 545 | 66 | 66 ✓ | ✓ |  | 2 |
| 545 | 219 | 219 ✓ | ✓ |  | 2 |
| 545 | 118 | 118 ✓ | ✓ |  | 2 |
| 545 | 136 | 136 ✓ | – | ✓ OCR legge 136; a vista: 136 · seconda conferma: la riga torna: 219,0 km/h / 1,609 = 136,1 MPH | 3 |
| 545 | 10,0 | 10,0 ✓ | ✓ |  | 2 |
| 545 | 37,9 | 37,9 ✓ | ✓ |  | 2 |
| 545 | 4,6 | 4,6 ✓ | ✓ |  | 2 |
| 545 | 998 | 998 ✓ | ✓ |  | 2 |
| 545 | 539 | 539 ✓ | ✓ |  | 2 |
| 561 | 677 | 677 ✓ | ✓ |  | 2 |
| 561 | 20 | 20 ✓ | ✓ |  | 2 |
| 561 | 61 | 61 ✓ | ✓ |  | 2 |
| 561 | 211 | 211 ✓ | ✓ |  | 2 |
| 561 | 114 | 114 ✓ | ✓ |  | 2 |
| 561 | 131 | 131 ✓ | ✓ |  | 2 |
| 561 | 9,3 | 9,3 ✓ | ✓ |  | 2 |
| 561 | 35,2 | 35,2 ✓ | ✓ |  | 2 |
| 561 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 561 | 1038 | 1038 ✓ | ✓ |  | 2 |
| 561 | 560 | 560. ✓ | ✓ |  | 2 |
| 579 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 579 | 779 | 779. ✓ | ✓ |  | 2 |
| 579 | 23 | 23 ✓ | ✓ |  | 2 |
| 579 | 72 | 72 ✓ | ✓ |  | 2 |
| 579 | 227 | 227 ✓ | ✓ |  | 2 |
| 579 | 123 | 123 ✓ | ✓ |  | 2 |
| 579 | 141 | 141 ✓ | ✓ |  | 2 |
| 579 | 11,0 | 11,0 ✓ | ✓ |  | 2 |
| 579 | 41,6 | 41,6 ✓ | ✓ |  | 2 |
| 579 | 4,2 | 4,2 ✓ | ✓ |  | 2 |
| 579 | 958 | 958 ✓ | ✓ |  | 2 |
| 579 | 517 | 517 ✓ | ✓ |  | 2 |
| 596 | 745 | 745 ✓ | ✓ |  | 2 |
| 596 | 22 | 22 ✓ | ✓ |  | 2 |
| 596 | 68 | 68 ✓ | ✓ |  | 2 |
| 596 | 220 | 220 ✓ | ✓ |  | 2 |
| 596 | 119 | 119 ✓ | ✓ |  | 2 |
| 596 | 137 | 437  | ✓ | ✓ OCR legge 437; a vista: 137 · seconda conferma: la riga torna: 220,0 km/h / 1,609 = 136,7 MPH; e lo strato di testo del PDF legge 137 | 3 |
| 596 | 10,3 | 10,3 ✓ | ✓ |  | 2 |
| 596 | 39,0 | 39,0 ✓ | ✓ |  | 2 |
| 596 | 4,5 | 4,5 ✓ | ✓ |  | 2 |
| 596 | 990 | 9930  | ✓ | ✓ OCR legge 9930; a vista: 990 · seconda conferma: la riga torna: 46 / 10,3 galloni all'ora x 220,0 km/h = 983 km; 534,0 NM x 1,852 = 989 km; e lo strato di testo del PDF legge 990 | 3 |
| 596 | 534 | 534 ✓ | ✓ |  | 2 |
| 612 | 711 | 711 ✓ | ✓ |  | 2 |
| 612 | 21 | 21 ✓ | ✓ |  | 2 |
| 612 | 63 | 63 ✓ | ✓ |  | 2 |
| 612 | 214 | 214 ✓ | ✓ |  | 2 |
| 612 | 116 | 116 ✓ | ✓ |  | 2 |
| 612 | 133 | 133 ✓ | ✓ |  | 2 |
| 612 | 9,6 | 3,6  | ✓ | ✓ OCR legge 3,6; a vista: 9,6 · seconda conferma: la riga torna: 36,3 litri / 3,785 = 9.59 galloni; 46 galloni / 9,6 = 4.79 ore (4,8 stampate); e lo strato di testo del PDF legge 9,6 | 3 |
| 612 | 36,3 | 36,3 ✓ | ✓ |  | 2 |
| 612 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 612 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 612 | 552 | 552 ✓ | ✓ |  | 2 |
| 629 | 677 | 677 ✓ | ✓ |  | 2 |
| 629 | 20 | 20 ✓ | ✓ |  | 2 |
| 629 | 58 | 58 ✓ | ✓ |  | 2 |
| 629 | 206 | 206 ✓ | ✓ |  | 2 |
| 629 | 111 | 111 ✓ | ✓ |  | 2 |
| 629 | 128 | 128 ✓ | ✓ |  | 2 |
| 629 | 8,9 | 8.9 ✓ | ✓ |  | 2 |
| 629 | 33,7 | 33,7 ✓ | ✓ |  | 2 |
| 629 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 629 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 629 | 574 | 574 ✓ | ✓ |  | 2 |
| 648 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 648 | 779 | 772  | ✓ | ✓ OCR legge 772; a vista: 779 · seconda conferma: la colonna torna: 23,0 in Hg x 33,86 = 779 mb; e lo strato di testo del PDF legge 779 | 3 |
| 648 | 23 | 23 ✓ | ✓ |  | 2 |
| 648 | 68 | 68 ✓ | ✓ |  | 2 |
| 648 | 220 | 220 ✓ | ✓ |  | 2 |
| 648 | 119 | 119 ✓ | ✓ |  | 2 |
| 648 | 137 | 137 ✓ | ✓ |  | 2 |
| 648 | 10,3 | 10,3 ✓ | ✓ |  | 2 |
| 648 | 39,0 | 39,0 ✓ | ✓ |  | 2 |
| 648 | 4,5 | 4,5 ✓ | ✓ |  | 2 |
| 648 | 990 | 990 ✓ | ✓ |  | 2 |
| 648 | 534 | 534 ✓ | ✓ |  | 2 |
| 664 | 745 | 745 ✓ | ✓ |  | 2 |
| 664 | 22 | 22 ✓ | ✓ |  | 2 |
| 664 | 63 | 63 ✓ | ✓ |  | 2 |
| 664 | 214 | 214 ✓ | ✓ |  | 2 |
| 664 | 116 | 116 ✓ | ✓ |  | 2 |
| 664 | 133 | 133 ✓ | ✓ |  | 2 |
| 664 | 9,7 | 9,7 ✓ | ✓ |  | 2 |
| 664 | 36,7 | 36,7 ✓ | ✓ |  | 2 |
| 664 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 664 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 664 | 552 | 552 ✓ | ✓ |  | 2 |
| 681 | 711 | 711 ✓ | ✓ |  | 2 |
| 681 | 21 | 21 ✓ | ✓ |  | 2 |
| 681 | 59 | 9  | ✓ | ✓ OCR legge 9; a vista: 59 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 59 | 3 |
| 681 | 208 | 208 ✓ | ✓ |  | 2 |
| 681 | 112 | 112 ✓ | ✓ |  | 2 |
| 681 | 129 | 129 ✓ | ✓ |  | 2 |
| 681 | 9,0 | 9,0 ✓ | ✓ |  | 2 |
| 681 | 34,1 | 34,1 ✓ | ✓ |  | 2 |
| 681 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 681 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 681 | 569 | 569 ✓ | ✓ |  | 2 |
| 696 | 677 | 677 ✓ | ✓ |  | 2 |
| 696 | 20 | 20 ✓ | ✓ |  | 2 |
| 696 | 55 | 65  | ✓ | ✓ OCR legge 65; a vista: 55 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 55 | 3 |
| 696 | 200 | 200 ✓ | ✓ |  | 2 |
| 696 | 108 | 108 ✓ | ✓ |  | 2 |
| 696 | 124 | 124 ✓ | ✓ |  | 2 |
| 696 | 8,4 | 8,4 ✓ | ✓ |  | 2 |
| 696 | 31,8 | 31.8 ✓ | ✓ |  | 2 |
| 696 | 5,5 | 5,5 ✓ | ✓ |  | 2 |
| 696 | 1094 | 1094, ✓ | ✓ |  | 2 |
| 696 | 591 | 591 ✓ | ✓ |  | 2 |
| 716 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 716 | 779 | 779 ✓ | ✓ |  | 2 |
| 716 | 23 | 23 ✓ | ✓ |  | 2 |
| 716 | 63, | 63, ✓ | ✓ |  | 2 |
| 716 | 214 | 214 ✓ | ✓ |  | 2 |
| 716 | 116 | 116 ✓ | ✓ |  | 2 |
| 716 | 133 | 133 ✓ | ✓ |  | 2 |
| 716 | 9,7 | 9,7 ✓ | – | ✓ OCR legge 9,7; a vista: 9,7 · seconda conferma: la riga torna: 36,7 litri / 3,785 = 9.70 galloni; 46 galloni / 9,7 = 4.74 ore (4,8 stampate) | 3 |
| 716 | 36,7 | 36,7 ✓ | ✓ |  | 2 |
| 716 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 716 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 716 | 552 | 552 ✓ | ✓ |  | 2 |
| 733 | 745 | 745 ✓ | ✓ |  | 2 |
| 733 | 22 | 22 ✓ | ✓ |  | 2 |
| 733 | 59 | –  | ✓ | ✓ OCR legge (niente); a vista: 59 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 59 | 3 |
| 733 | 208 | 208 ✓ | ✓ |  | 2 |
| 733 | 112 | 112 ✓ | ✓ |  | 2 |
| 733 | 129 | 129 ✓ | ✓ |  | 2 |
| 733 | 9,0 | 93,0  | ✓ | ✓ OCR legge 93,0; a vista: 9,0 · seconda conferma: la riga torna: 34,1 litri / 3,785 = 9.01 galloni; 46 galloni / 9,0 = 5.11 ore (5,1 stampate); e lo strato di testo del PDF legge 9,0 | 3 |
| 733 | 34,1 | 34,1 ✓ | ✓ |  | 2 |
| 733 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 733 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 733 | 569 | 569 ✓ | ✓ |  | 2 |
| 749 | 711 | 711 ✓ | ✓ |  | 2 |
| 749 | 21 | 21 ✓ | ✓ |  | 2 |
| 749 | 55 | 55 ✓ | ✓ |  | 2 |
| 749 | 200 | 200 ✓ | ✓ |  | 2 |
| 749 | 108 | 108 ✓ | ✓ |  | 2 |
| 749 | 124 | 124 ✓ | ✓ |  | 2 |
| 749 | 8,4 | 8,4 ✓ | ✓ |  | 2 |
| 749 | 31,8 | 31,8 ✓ | – | ✓ OCR legge 31,8; a vista: 31,8 · seconda conferma: la riga torna: 8,4 galloni x 3,785 = 31.79 litri | 3 |
| 749 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 749 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 749 | 587 | 587 ✓ | ✓ |  | 2 |
| 765 | 677 | 677 ✓ | ✓ |  | 2 |
| 765 | 20 | cJ  | ✓ | ✓ OCR legge cJ; a vista: 20 · seconda conferma: la colonna torna: 677,0 mb / 33,86 = 20.0 in Hg; e lo strato di testo del PDF legge 20 | 3 |
| 765 | 51 | 51 ✓ | ✓ |  | 2 |
| 765 | 192 | 192 ✓ | ✓ |  | 2 |
| 765 | 103 | 103 ✓ | ✓ |  | 2 |
| 765 | 119 | 119 ✓ | ✓ |  | 2 |
| 765 | 7,9 | 7,2  | ✓ | ✓ OCR legge 7,2; a vista: 7,9 · seconda conferma: la riga torna: 29,9 litri / 3,785 = 7.90 galloni; 46 galloni / 7,9 = 5.82 ore (5,8 stampate); e lo strato di testo del PDF legge 7,9 | 3 |
| 765 | 29,9 | 29,9 ✓ | ✓ |  | 2 |
| 765 | 5,8 | 5,8 ✓ | ✓ |  | 2 |
| 765 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 765 | 604 | 604 ✓ | ✓ |  | 2 |
| 786 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 786 | 779 | 773  | ✓ | ✓ OCR legge 773; a vista: 779 · seconda conferma: la colonna torna: 23,0 in Hg x 33,86 = 779 mb; e lo strato di testo del PDF legge 779 | 3 |
| 786 | 23 | 23 ✓ | ✓ |  | 2 |
| 786 | 59 | 59 ✓ | ✓ |  | 2 |
| 786 | 208 | 208 ✓ | ✓ |  | 2 |
| 786 | 112 | 112 ✓ | ✓ |  | 2 |
| 786 | 129 | 128  | ✓ | ✓ OCR legge 128; a vista: 129 · seconda conferma: la riga torna: 208,0 km/h / 1,609 = 129,3 MPH; e lo strato di testo del PDF legge 129 | 3 |
| 786 | 9,0 | 9,0 ✓ | ✓ |  | 2 |
| 786 | 34,1 | 34,1 ✓ | ✓ |  | 2 |
| 786 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 786 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 786 | 574 | 574 ✓ | ✓ |  | 2 |
| 802 | 745 | 745 ✓ | ✓ |  | 2 |
| 802 | 22 | 22 ✓ | ✓ |  | 2 |
| 802 | 55 | 55 ✓ | ✓ |  | 2 |
| 802 | 200 | 200 ✓ | ✓ |  | 2 |
| 802 | 108 | 108 ✓ | ✓ |  | 2 |
| 802 | 124 | 124 ✓ | ✓ |  | 2 |
| 802 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 802 | 32,2 | 32,2 ✓ | ✓ |  | 2 |
| 802 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 802 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 802 | 587 | 587 ✓ | ✓ |  | 2 |
| 818 | 711 | 711 ✓ | ✓ |  | 2 |
| 818 | 21 | 21 ✓ | ✓ |  | 2 |
| 818 | 51 | 51 ✓ | ✓ |  | 2 |
| 818 | 193 | 193 ✓ | ✓ |  | 2 |
| 818 | 104 | 104 ✓ | ✓ |  | 2 |
| 818 | 120 | 120 ✓ | ✓ |  | 2 |
| 818 | 7,9 | 7.9 ✓ | ✓ |  | 2 |
| 818 | 29,9 | 29,9 ✓ | ✓ |  | 2 |
| 818 | 5,8 | 5,8 ✓ | ✓ |  | 2 |
| 818 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 818 | 604 | 604 ✓ | ✓ |  | 2 |
| 835 | 677 | 677 ✓ | ✓ |  | 2 |
| 835 | 20 | 20 ✓ | ✓ |  | 2 |
| 835 | 47 | 47 ✓ | ✓ |  | 2 |
| 835 | 183 | 183 ✓ | ✓ |  | 2 |
| 835 | 99 | 99 ✓ | ✓ |  | 2 |
| 835 | 114 | 114 ✓ | ✓ |  | 2 |
| 835 | 7,4 | 7,4 ✓ | ✓ |  | 2 |
| 835 | 28,0 | 28,0 ✓ | ✓ |  | 2 |
| 835 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 835 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 835 | 617 | 617 ✓ | ✓ |  | 2 |
| 851 | 643 | 643 ✓ | ✓ |  | 2 |
| 851 | 19 | 19 ✓ | ✓ |  | 2 |
| 851 | 43 | 43 ✓ | ✓ |  | 2 |
| 851 | 174 | 174 ✓ | ✓ |  | 2 |
| 851 | 94 | 94 ✓ | ✓ |  | 2 |
| 851 | 108 | 108 ✓ | ✓ |  | 2 |
| 851 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 851 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 851 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 851 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 851 | 626 | 626 ✓ | ✓ |  | 2 |
| 867 | 610 | 610 ✓ | ✓ |  | 2 |
| 867 | 18 | 18 ✓ | ✓ |  | 2 |
| 867 | 40 | 40 ✓ | ✓ |  | 2 |
| 867 | 161 | 161 ✓ | ✓ |  | 2 |
| 867 | 87 | 87 ✓ | ✓ |  | 2 |
| 867 | 100 | 100 ✓ | ✓ |  | 2 |
| 867 | 6,4 | 6,4 ✓ | ✓ |  | 2 |
| 867 | 24,2 | 24,2 ✓ | ✓ |  | 2 |
| 867 | 7,2 | 7,2 ✓ | ✓ |  | 2 |
| 867 | 1175 | 1175 ✓ | ✓ |  | 2 |
| 867 | 634 | 634 ✓ | ✓ |  | 2 |
| 884 | 576 | 576 ✓ | ✓ |  | 2 |
| 884 | 17 | 17 ✓ | ✓ |  | 2 |
| 884 | 36 | 36 ✓ | ✓ |  | 2 |
| 884 | 150 | 150 ✓ | ✓ |  | 2 |
| 884 | 81 | 81 ✓ | ✓ |  | 2 |
| 884 | 93 | 93 ✓ | ✓ |  | 2 |
| 884 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 884 | 22,3 | 22,3 ✓ | ✓ |  | 2 |
| 884 | 7,8 | 7.8 ✓ | ✓ |  | 2 |
| 884 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 884 | 630 | 630 ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-1: ogni riga controllata con l'aritmetica della tabella (km/h = kts x 1,852 = MPH x 1,609; litri = galloni x 3,785; autonomia = 46 galloni / consumo; km = autonomia x km/h; NM = km / 1,852; in Hg = mb / 33,86): tutte tornano entro gli arrotondamenti ✓ (crociera_leggi.py). Le distanze sono quelle del manuale: in qualche riga km e autonomia differiscono di meno dell'1%, ma km e NM tornano sempre fra loro

### Pagina 5-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 331 | 5-4 | 54  | – | ✓ a vista: Page: 5-4 · seconda conferma: posizione nel PDF: pagina 60, fra 5-3 e 5-5 (mappa tools/afm/afm-ccaf.json) | 2 |
| 363 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 330 | 1157 | 1167  | ✓ | ✓ OCR legge 1167; a vista: 1157 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 1157 | 3 |
| 358 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 388 | 46 | 46 ✓ | ✓ |  | 2 |
| 388 | (174 | (174 ✓ | ✓ |  | 2 |
| 883 | 1 | 1 ✓ | ✓ |  | 2 |
| 951 | 5-1 | S-1  | ✓ | ✓ OCR legge S-1; a vista: 5-1 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 5-1 | 3 |
| 951 | 3 | 2  | ✓ | ✓ OCR legge 2; a vista: 3 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 3 | 3 |
| 951 | 5). | 5). ✓ | ✓ |  | 2 |
| 471 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 471 | 711 | Fe  | ✓ | ✓ OCR legge Fe; a vista: 711 · seconda conferma: la colonna torna: 21,0 in Hg x 33,86 = 711 mb; e lo strato di testo del PDF legge 711 | 3 |
| 471 | 21 | 21 ✓ | ✓ |  | 2 |
| 471 | 69 | 69 ✓ | ✓ |  | 2 |
| 471 | 229 | 229 ✓ | ✓ |  | 2 |
| 471 | 123 | 123 ✓ | ✓ |  | 2 |
| 471 | 142 | 142 ✓ | ✓ |  | 2 |
| 471 | 10,5 | 10,5 ✓ | ✓ |  | 2 |
| 471 | 39,7 | 39,7 ✓ | ✓ |  | 2 |
| 471 | 4,4 | 4,4 ✓ | ✓ |  | 2 |
| 471 | 998 | 998 ✓ | ✓ |  | 2 |
| 471 | 539 | 539 ✓ | ✓ |  | 2 |
| 487 | 677 | 677 ✓ | ✓ |  | 2 |
| 487 | 20 | 20 ✓ | ✓ |  | 2 |
| 487 | 64 | 64 ✓ | ✓ |  | 2 |
| 487 | 220 | 220 ✓ | ✓ |  | 2 |
| 487 | 119 | 119 ✓ | ✓ |  | 2 |
| 487 | 137 | 137 ✓ | ✓ |  | 2 |
| 487 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 487 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 487 | 4,7 | 4,7 ✓ | ✓ |  | 2 |
| 487 | 1030 | 1030 ✓ | ✓ |  | 2 |
| 487 | 556 | 556 ✓ | ✓ |  | 2 |
| 503 | 643 | 643 ✓ | ✓ |  | 2 |
| 503 | 19 | 19 ✓ | ✓ |  | 2 |
| 503 | 60 | 60 ✓ | ✓ |  | 2 |
| 503 | 212 | 212 ✓ | ✓ |  | 2 |
| 503 | 115 | 115 ✓ | ✓ |  | 2 |
| 503 | 132 | 132 ✓ | ✓ |  | 2 |
| 503 | 9,1 | 9,1 ✓ | ✓ |  | 2 |
| 503 | 34,4 | 34,4 ✓ | ✓ |  | 2 |
| 503 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 503 | 1070 | 1070 ✓ | ✓ |  | 2 |
| 503 | 578 | 578 ✓ | ✓ |  | 2 |
| 519 | 610 | 610 ✓ | ✓ |  | 2 |
| 519 | 18 | 18 ✓ | ✓ |  | 2 |
| 519 | 55 | 55 ✓ | ✓ |  | 2 |
| 519 | 203 | 203 ✓ | ✓ |  | 2 |
| 519 | 109 | 109 ✓ | ✓ |  | 2 |
| 519 | 126 | 126 ✓ | ✓ |  | 2 |
| 519 | 8,4 | 8,4 ✓ | ✓ |  | 2 |
| 519 | 31,8 | 31,8 ✓ | ✓ |  | 2 |
| 519 | 5,5 | 5,5 ✓ | ✓ |  | 2 |
| 519 | 1110 | 1110 ✓ | ✓ |  | 2 |
| 519 | 600 | 600 ✓ | ✓ |  | 2 |
| 539 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 539 | 711 | 717  | ✓ | ✓ OCR legge 717; a vista: 711 · seconda conferma: la colonna torna: 21,0 in Hg x 33,86 = 711 mb; e lo strato di testo del PDF legge 711 | 3 |
| 539 | 21 | 21 ✓ | ✓ |  | 2 |
| 539 | 66 | 66 ✓ | ✓ |  | 2 |
| 539 | 224 | 224 ✓ | ✓ |  | 2 |
| 539 | 121 | 121 ✓ | ✓ |  | 2 |
| 539 | 139 | 139 ✓ | ✓ |  | 2 |
| 539 | 10,1 | 10,1 ✓ | ✓ |  | 2 |
| 539 | 38,2 | 38,2 ✓ | ✓ |  | 2 |
| 539 | 4,6 | 4,6 ✓ | ✓ |  | 2 |
| 539 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 539 | 552 | 552 ✓ | ✓ |  | 2 |
| 555 | 677 | 677 ✓ | ✓ |  | 2 |
| 555 | 20 | 20 ✓ | ✓ |  | 2 |
| 555 | 62 | 62 ✓ | ✓ |  | 2 |
| 555 | 216 | 216 ✓ | ✓ |  | 2 |
| 555 | 116 | 116 ✓ | ✓ |  | 2 |
| 555 | 134 | 134 ✓ | ✓ |  | 2 |
| 555 | 9,4 | 9,4 ✓ | ✓ |  | 2 |
| 555 | 35,6 | 35,6 ✓ | ✓ |  | 2 |
| 555 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 555 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 555 | 569 | 569 ✓ | ✓ |  | 2 |
| 571 | 643 | 643 ✓ | ✓ |  | 2 |
| 571 | 19 | 19 ✓ | ✓ |  | 2 |
| 571 | 57 | 57 ✓ | ✓ |  | 2 |
| 571 | 208 | 208 ✓ | ✓ |  | 2 |
| 571 | 112 | 112 ✓ | ✓ |  | 2 |
| 571 | 129 | 129 ✓ | ✓ |  | 2 |
| 571 | 8,7 | 8,7 ✓ | ✓ |  | 2 |
| 571 | 32,9 | 32,9 ✓ | ✓ |  | 2 |
| 571 | 5,3 | 5,3 ✓ | ✓ |  | 2 |
| 571 | 1094 | 1094 ✓ | ✓ |  | 2 |
| 571 | 591 | 591 ✓ | ✓ |  | 2 |
| 587 | 610 | 610 ✓ | ✓ |  | 2 |
| 587 | 18 | 18 ✓ | ✓ |  | 2 |
| 587 | 52 | 52 ✓ | ✓ |  | 2 |
| 587 | 198 | 198 ✓ | ✓ |  | 2 |
| 587 | 107 | 107 ✓ | ✓ |  | 2 |
| 587 | 123 | 123 ✓ | ✓ |  | 2 |
| 587 | 8,0 | 8,0 ✓ | ✓ |  | 2 |
| 587 | 30,3 | 30,3 ✓ | ✓ |  | 2 |
| 587 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 587 | 1127 | 1127 ✓ | ✓ |  | 2 |
| 587 | 608 | 608 ✓ | ✓ |  | 2 |
| 606 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 606 | 711 | 711 ✓ | ✓ |  | 2 |
| 606 | 21 | 27  | ✓ | ✓ OCR legge 27; a vista: 21 · seconda conferma: la colonna torna: 711,0 mb / 33,86 = 21.0 in Hg; e lo strato di testo del PDF legge 21 | 3 |
| 606 | 62 | 62 ✓ | ✓ |  | 2 |
| 606 | 217 | 217 ✓ | ✓ |  | 2 |
| 606 | 117 | 117 ✓ | ✓ |  | 2 |
| 606 | 135 | 135 ✓ | ✓ |  | 2 |
| 606 | 9,5 | 9,5 ✓ | ✓ |  | 2 |
| 606 | 36,0 | 36,0 ✓ | ✓ |  | 2 |
| 606 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 606 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 606 | 569 | 569 ✓ | ✓ |  | 2 |
| 622 | 677 | 677 ✓ | ✓ |  | 2 |
| 622 | 20 | 20 ✓ | ✓ |  | 2 |
| 622 | 58 | 58 ✓ | ✓ |  | 2 |
| 622 | 209 | 209 ✓ | ✓ |  | 2 |
| 622 | 113 | 113 ✓ | ✓ |  | 2 |
| 622 | 130 | 130 ✓ | ✓ |  | 2 |
| 622 | 8,8 | 8,8 ✓ | ✓ |  | 2 |
| 622 | 33,3 | 33,3 ✓ | ✓ |  | 2 |
| 622 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 622 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 622 | 587 | 587 ✓ | ✓ |  | 2 |
| 640 | 643 | 643 ✓ | ✓ |  | 2 |
| 640 | 19 | 19 ✓ | ✓ |  | 2 |
| 640 | 53 | 53 ✓ | ✓ |  | 2 |
| 640 | 201 | 201 ✓ | ✓ |  | 2 |
| 640 | 109 | 109 ✓ | ✓ |  | 2 |
| 640 | 125 | 125 ✓ | ✓ |  | 2 |
| 640 | 8,2 | 8,2 ✓ | ✓ |  | 2 |
| 640 | 31,0 | 31,0 ✓ | ✓ |  | 2 |
| 640 | 5,6 | 5,6 ✓ | ✓ |  | 2 |
| 640 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 640 | 604 | 604 ✓ | ✓ |  | 2 |
| 656 | 610 | 610 ✓ | ✓ |  | 2 |
| 656 | 18 | 18 ✓ | ✓ |  | 2 |
| 656 | 49 | se  | ✓ | ✓ OCR legge se; a vista: 49 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 49 | 3 |
| 656 | 190 | 190 ✓ | ✓ |  | 2 |
| 656 | 103 | 103 ✓ | ✓ |  | 2 |
| 656 | 118 | 118 ✓ | ✓ |  | 2 |
| 656 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 656 | 28,8 | 28,8 ✓ | ✓ |  | 2 |
| 656 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 656 | 1151 | 1151 ✓ | ✓ |  | 2 |
| 656 | 621 | 621 ✓ | ✓ |  | 2 |
| 676 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 676 | 711 | aut  | ✓ | ✓ OCR legge aut; a vista: 711 · seconda conferma: la colonna torna: 21,0 in Hg x 33,86 = 711 mb; e lo strato di testo del PDF legge 711 | 3 |
| 676 | 21 | 2  | ✓ | ✓ OCR legge 2; a vista: 21 · seconda conferma: la colonna torna: 711,0 mb / 33,86 = 21.0 in Hg; e lo strato di testo del PDF legge 21 | 3 |
| 676 | 58 | 68  | ✓ | ✓ OCR legge 68; a vista: 58 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 58 | 3 |
| 676 | 209 | 209 ✓ | ✓ |  | 2 |
| 676 | 113 | 113 ✓ | ✓ |  | 2 |
| 676 | 130 | 130 ✓ | ✓ |  | 2 |
| 676 | 8,9 | 8,9 ✓ | ✓ |  | 2 |
| 676 | 33,7 | 33,7 ✓ | ✓ |  | 2 |
| 676 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 676 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 676 | 587 | 587 ✓ | ✓ |  | 2 |
| 692 | 677 | 677 ✓ | ✓ |  | 2 |
| 692 | 20 | 20 ✓ | ✓ |  | 2 |
| 692 | 54 | 54 ✓ | ✓ |  | 2 |
| 692 | 201 | 201 ✓ | ✓ |  | 2 |
| 692 | 109 | 109 ✓ | ✓ |  | 2 |
| 692 | 125 | 125 ✓ | ✓ |  | 2 |
| 692 | 8,3 | 8,3 ✓ | ✓ |  | 2 |
| 692 | 31,4 | 31,4 ✓ | ✓ |  | 2 |
| 692 | 5,6 | 5,6 ✓ | ✓ |  | 2 |
| 692 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 692 | 604 | 604 ✓ | ✓ |  | 2 |
| 708 | 643 | 643 ✓ | ✓ |  | 2 |
| 708 | 19 | 19 ✓ | ✓ |  | 2 |
| 708 | 50 | 50 ✓ | ✓ |  | 2 |
| 708 | 192 | 192 ✓ | ✓ |  | 2 |
| 708 | 103 | 103 ✓ | ✓ |  | 2 |
| 708 | 119 | 119 ✓ | ✓ |  | 2 |
| 708 | 7,7 | Vat  | ✓ | ✓ OCR legge Vat; a vista: 7,7 · seconda conferma: la riga torna: 29,1 litri / 3,785 = 7.69 galloni; 46 galloni / 7,7 = 5.97 ore (6,0 stampate); e lo strato di testo del PDF legge 7,7 | 3 |
| 708 | 29,1 | 29,1 ✓ | ✓ |  | 2 |
| 708 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 708 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 708 | 617 | 617 ✓ | ✓ |  | 2 |
| 725 | 610 | 610 ✓ | ✓ |  | 2 |
| 725 | 18 | 18 ✓ | ✓ |  | 2 |
| 725 | 45 | Bo  | ✓ | ✓ OCR legge Bo; a vista: 45 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 45 | 3 |
| 725 | 180 | 180 ✓ | ✓ |  | 2 |
| 725 | 97 | 97 ✓ | ✓ |  | 2 |
| 725 | 112 | 112 ✓ | ✓ |  | 2 |
| 725 | 7,1 | 71  | ✓ | ✓ OCR legge 71; a vista: 7,1 · seconda conferma: la riga torna: 26,9 litri / 3,785 = 7.11 galloni; 46 galloni / 7,1 = 6.48 ore (6,5 stampate); e lo strato di testo del PDF legge 7,1 | 3 |
| 725 | 26,9 | 26,9 ✓ | ✓ |  | 2 |
| 725 | 6,5 | 6.5 ✓ | ✓ |  | 2 |
| 725 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 725 | 630 | 630 ✓ | ✓ |  | 2 |
| 743 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 743 | 711 | 717  | ✓ | ✓ OCR legge 717; a vista: 711 · seconda conferma: la colonna torna: 21,0 in Hg x 33,86 = 711 mb; e lo strato di testo del PDF legge 711 | 3 |
| 743 | 21 | at  | ✓ | ✓ OCR legge at; a vista: 21 · seconda conferma: la colonna torna: 711,0 mb / 33,86 = 21.0 in Hg; e lo strato di testo del PDF legge 21 | 3 |
| 743 | 54 | 54 ✓ | ✓ |  | 2 |
| 743 | 201 | 201 ✓ | ✓ |  | 2 |
| 743 | 109 | 109 ✓ | ✓ |  | 2 |
| 743 | 125 | 125 ✓ | ✓ |  | 2 |
| 743 | 8,3 | 8,3 ✓ | ✓ |  | 2 |
| 743 | 31,4 | 31,4 ✓ | ✓ |  | 2 |
| 743 | 5,5 | 5,5 ✓ | ✓ |  | 2 |
| 743 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 743 | 604 | 604 ✓ | ✓ |  | 2 |
| 759 | 677 | 677 ✓ | ✓ |  | 2 |
| 759 | 20 | 20 ✓ | ✓ |  | 2 |
| 759 | 50 | 50 ✓ | ✓ |  | 2 |
| 759 | 193 | 193 ✓ | ✓ |  | 2 |
| 759 | 104 | 104 ✓ | ✓ |  | 2 |
| 759 | 120 | 120 ✓ | ✓ |  | 2 |
| 759 | 7,8 | 738  | ✓ | ✓ OCR legge 738; a vista: 7,8 · seconda conferma: la riga torna: 29,5 litri / 3,785 = 7.79 galloni; 46 galloni / 7,8 = 5.90 ore (5,9 stampate); e lo strato di testo del PDF legge 7,8 | 3 |
| 759 | 29,5 | 29,5 ✓ | ✓ |  | 2 |
| 759 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 759 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 759 | 617 | 617 ✓ | ✓ |  | 2 |
| 776 | 643 | as  | ✓ | ✓ OCR legge as; a vista: 643 · seconda conferma: la colonna torna: 19,0 in Hg x 33,86 = 643 mb; e lo strato di testo del PDF legge 643 | 3 |
| 776 | 19 | Ls  | ✓ | ✓ OCR legge Ls; a vista: 19 · seconda conferma: la colonna torna: 643,0 mb / 33,86 = 19.0 in Hg; e lo strato di testo del PDF legge 19 | 3 |
| 776 | 46 | 46 ✓ | ✓ |  | 2 |
| 776 | 183 | 183 ✓ | ✓ |  | 2 |
| 776 | 99 | 99 ✓ | ✓ |  | 2 |
| 776 | 114 | 114 ✓ | ✓ |  | 2 |
| 776 | 7,2 | 7a  | ✓ | ✓ OCR legge 7a; a vista: 7,2 · seconda conferma: la riga torna: 27,3 litri / 3,785 = 7.21 galloni; 46 galloni / 7,2 = 6.39 ore (6,4 stampate); e lo strato di testo del PDF legge 7,2 | 3 |
| 776 | 27,3 | 27,3 ✓ | ✓ |  | 2 |
| 776 | 6,4 | 6,4 ✓ | ✓ |  | 2 |
| 776 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 776 | 626 | 626 ✓ | ✓ |  | 2 |
| 791 | 610 | 610 ✓ | ✓ |  | 2 |
| 791 | 18 | 18 ✓ | ✓ |  | 2 |
| 791 | 42 | 42 ✓ | ✓ |  | 2 |
| 791 | 172 | 172 ✓ | ✓ |  | 2 |
| 791 | 93 | 93 ✓ | ✓ |  | 2 |
| 791 | 107 | 107 ✓ | ✓ |  | 2 |
| 791 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 791 | 25,4 | 25,4 ✓ | ✓ |  | 2 |
| 791 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 791 | 1175 | 1175 ✓ | ✓ |  | 2 |
| 791 | 634 | 634 ✓ | ✓ |  | 2 |
| 807 | 576 | 576 ✓ | ✓ |  | 2 |
| 807 | 17 | 17 ✓ | ✓ |  | 2 |
| 807 | 38 | 38 ✓ | ✓ |  | 2 |
| 807 | 159 | 159 ✓ | ✓ |  | 2 |
| 807 | 86 | 86 ✓ | ✓ |  | 2 |
| 807 | 99 | 99 ✓ | ✓ |  | 2 |
| 807 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 807 | 23,5 | 23,5 ✓ | ✓ |  | 2 |
| 807 | 7,4 | 7.4 ✓ | ✓ |  | 2 |
| 807 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 807 | 639 | 639 ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-1: ogni riga controllata con l'aritmetica della tabella (km/h = kts x 1,852 = MPH x 1,609; litri = galloni x 3,785; autonomia = 46 galloni / consumo; km = autonomia x km/h; NM = km / 1,852; in Hg = mb / 33,86): tutte tornano entro gli arrotondamenti ✓ (crociera_leggi.py). Le distanze sono quelle del manuale: in qualche riga km e autonomia differiscono di meno dell'1%, ma km e NM tornano sempre fra loro

### Pagina 5-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 228 | 5-5 | 5-5 ✓ | – | ✓ a vista: Page: 5-5 · seconda conferma: posizione nel PDF: pagina 61, fra 5-4 e 5-6 (mappa tools/afm/afm-ccaf.json) | 3 |
| 259 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 379 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 408 | 10000 | 10000 ✓ | ✓ |  | 2 |
| 438 | 46 | 46 ✓ | ✓ |  | 2 |
| 438 | (174 | (174 ✓ | ✓ |  | 2 |
| 934 | 1 | 1 ✓ | ✓ |  | 2 |
| 1000 | 5-1 | S-1  | ✓ | ✓ OCR legge S-1; a vista: 5-1 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 5-1 | 3 |
| 1000 | 4 | 4 ✓ | ✓ |  | 2 |
| 1000 | 5). | 5). ✓ | ✓ |  | 2 |
| 520 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 520 | 643 | 643 ✓ | ✓ |  | 2 |
| 520 | 19 | cr)  | ✓ | ✓ OCR legge cr); a vista: 19 · seconda conferma: la colonna torna: 643,0 mb / 33,86 = 19.0 in Hg; e lo strato di testo del PDF legge 19 | 3 |
| 520 | 63 | 63 ✓ | ✓ |  | 2 |
| 520 | 222 | 222 ✓ | ✓ |  | 2 |
| 520 | 120 | 120 ✓ | ✓ |  | 2 |
| 520 | 138 | 138 ✓ | ✓ |  | 2 |
| 520 | 9,6 | 9,6 ✓ | ✓ |  | 2 |
| 520 | 36,3 | 36,3 ✓ | ✓ |  | 2 |
| 520 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 520 | 1070 | 1070 ✓ | ✓ |  | 2 |
| 520 | 578 | 578 ✓ | ✓ |  | 2 |
| 536 | 610 | 610 ✓ | ✓ |  | 2 |
| 536 | 18 | 18 ✓ | ✓ |  | 2 |
| 536 | 58 | 58 ✓ | ✓ |  | 2 |
| 536 | 214 | 214 ✓ | ✓ |  | 2 |
| 536 | 116 | 116 ✓ | ✓ |  | 2 |
| 536 | 133 | 133 ✓ | ✓ |  | 2 |
| 536 | 8,9 | 8,9 ✓ | ✓ |  | 2 |
| 536 | 33,7 | 33,7 ✓ | ✓ |  | 2 |
| 536 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 536 | 1102 | 1102 ✓ | ✓ |  | 2 |
| 536 | 595 | 595 ✓ | ✓ |  | 2 |
| 553 | 576 | 576 ✓ | ✓ |  | 2 |
| 553 | 17 | 17 ✓ | ✓ |  | 2 |
| 553 | 53 | 53 ✓ | ✓ |  | 2 |
| 553 | 203 | 203 ✓ | ✓ |  | 2 |
| 553 | 109 | 109 ✓ | ✓ |  | 2 |
| 553 | 126 | 126 ✓ | ✓ |  | 2 |
| 553 | 8,2 | 8,2 ✓ | ✓ |  | 2 |
| 553 | 31,0 | 31,0 ✓ | ✓ |  | 2 |
| 553 | 5,6 | 5,6 ✓ | ✓ |  | 2 |
| 553 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 553 | 617 | 617 ✓ | ✓ |  | 2 |
| 569 | 542 | 542 ✓ | ✓ |  | 2 |
| 569 | 16 | 16 ✓ | ✓ |  | 2 |
| 569 | 48 | 38  | ✓ | ✓ OCR legge 38; a vista: 48 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 48 | 3 |
| 569 | 190 | 190 ✓ | ✓ |  | 2 |
| 569 | 103 | 103 ✓ | ✓ |  | 2 |
| 569 | 118 | 118 ✓ | ✓ |  | 2 |
| 569 | 7,5 | 7,5 ✓ | ✓ |  | 2 |
| 569 | 28,4 | 28,4 ✓ | ✓ |  | 2 |
| 569 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 569 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 569 | 630 | 630 ✓ | ✓ |  | 2 |
| 588 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 588 | 643 | 643 ✓ | ✓ |  | 2 |
| 588 | 19 | 419  | ✓ | ✓ OCR legge 419; a vista: 19 · seconda conferma: la colonna torna: 643,0 mb / 33,86 = 19.0 in Hg; e lo strato di testo del PDF legge 19 | 3 |
| 588 | 60 | 60 ✓ | ✓ |  | 2 |
| 588 | 217 | 217 ✓ | ✓ |  | 2 |
| 588 | 117 | 117 ✓ | ✓ |  | 2 |
| 588 | 135 | 135 ✓ | ✓ |  | 2 |
| 588 | 9,2 | 9,2 ✓ | ✓ |  | 2 |
| 588 | 34,8 | 34,8 ✓ | ✓ |  | 2 |
| 588 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 588 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 588 | 587 | 587 ✓ | ✓ |  | 2 |
| 604 | 610 | 610 ✓ | ✓ |  | 2 |
| 604 | 18 | 18 ✓ | ✓ |  | 2 |
| 604 | 55 | 55 ✓ | ✓ |  | 2 |
| 604 | 208 | 208 ✓ | ✓ |  | 2 |
| 604 | 112 | 112 ✓ | ✓ |  | 2 |
| 604 | 129 | 129 ✓ | ✓ |  | 2 |
| 604 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 604 | 32,2 | 32,2 ✓ | ✓ |  | 2 |
| 604 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 604 | 1127 | 1127 ✓ | ✓ |  | 2 |
| 604 | 608 | 608 ✓ | ✓ |  | 2 |
| 620 | 576 | 576 ✓ | ✓ |  | 2 |
| 620 | 17 | 17 ✓ | ✓ |  | 2 |
| 620 | 50 | 50 ✓ | ✓ |  | 2 |
| 620 | 196 | 196 ✓ | ✓ |  | 2 |
| 620 | 106 | 106 ✓ | ✓ |  | 2 |
| 620 | 122 | 122 ✓ | ✓ |  | 2 |
| 620 | 7,8 | 7,8 ✓ | ✓ |  | 2 |
| 620 | 29,5 | 29,5 ✓ | ✓ |  | 2 |
| 620 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 620 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 620 | 626 | 626 ✓ | ✓ |  | 2 |
| 637 | 542 | 542 ✓ | ✓ |  | 2 |
| 637 | 16 | 16 ✓ | ✓ |  | 2 |
| 637 | 46 | AGS  | ✓ | ✓ OCR legge AGS; a vista: 46 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 46 | 3 |
| 637 | 183 | 183 ✓ | ✓ |  | 2 |
| 637 | 99 | 92  | ✓ | ✓ OCR legge 92; a vista: 99 · seconda conferma: la riga torna: 183,0 km/h / 1,852 = 98,8 kts; e lo strato di testo del PDF legge 99 | 3 |
| 637 | 114 | TTR  | ✓ | ✓ OCR legge TTR; a vista: 114 · seconda conferma: la riga torna: 183,0 km/h / 1,609 = 113,7 MPH; e lo strato di testo del PDF legge 114 | 3 |
| 637 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 637 | 26,9 | 26,9 ✓ | ✓ |  | 2 |
| 637 | 6,4 | 6.4 ✓ | ✓ |  | 2 |
| 637 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 637 | 639 | 639 ✓ | ✓ |  | 2 |
| 657 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 657 | 643 | 643 ✓ | ✓ |  | 2 |
| 657 | 19 | 19 ✓ | ✓ |  | 2 |
| 657 | 56 | 56 ✓ | ✓ |  | 2 |
| 657 | 209 | 209 ✓ | ✓ |  | 2 |
| 657 | 113 | 113 ✓ | ✓ |  | 2 |
| 657 | 130 | 130 ✓ | ✓ |  | 2 |
| 657 | 8,6 | 8,6 ✓ | ✓ |  | 2 |
| 657 | 32,6 | 32,6 ✓ | ✓ |  | 2 |
| 657 | 5,3 | 5,3 ✓ | ✓ |  | 2 |
| 657 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 657 | 604 | 604 ✓ | ✓ |  | 2 |
| 673 | 610 | 610 ✓ | ✓ |  | 2 |
| 673 | 18 | 18 ✓ | ✓ |  | 2 |
| 673 | 52 | 52 ✓ | ✓ |  | 2 |
| 673 | 200 | 200 ✓ | ✓ |  | 2 |
| 673 | 108 | 10B  | ✓ | ✓ OCR legge 10B; a vista: 108 · seconda conferma: la riga torna: 200,0 km/h / 1,852 = 108,0 kts; e lo strato di testo del PDF legge 108 | 3 |
| 673 | 124 | 124 ✓ | ✓ |  | 2 |
| 673 | 8,0 | 8,0 ✓ | ✓ |  | 2 |
| 673 | 30,3 | 30,3 ✓ | ✓ |  | 2 |
| 673 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 673 | 1151 | 1161  | ✓ | ✓ OCR legge 1161; a vista: 1151 · seconda conferma: la riga torna: 46 / 8,0 galloni all'ora x 200,0 km/h = 1150 km; 621,0 NM x 1,852 = 1150 km; e lo strato di testo del PDF legge 1151 | 3 |
| 673 | 621 | 621 ✓ | ✓ |  | 2 |
| 689 | 576 | 576 ✓ | ✓ |  | 2 |
| 689 | 17 | 17 ✓ | ✓ |  | 2 |
| 689 | 47 | 47 ✓ | – | ✓ OCR legge 47; a vista: 47 · seconda conferma: il consumo segue la potenza: nella riga 7,4 gal/h al 47% (0,157 gal/h per punto), nello stesso gruppo 8,0 al 52% e 8,6 al 56% (0,154); lo strato di testo del PDF legge 4/ (il 7 non riconosciuto) | 3 |
| 689 | 188 | 188 ✓ | ✓ |  | 2 |
| 689 | 102 | 102 ✓ | ✓ |  | 2 |
| 689 | 117 | 117 ✓ | ✓ |  | 2 |
| 689 | 7,4 | 7,4 ✓ | ✓ |  | 2 |
| 689 | 28,0 | 28,0 ✓ | ✓ |  | 2 |
| 689 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 689 | 1175 | 1175 ✓ | ✓ |  | 2 |
| 689 | 634 | 634 ✓ | ✓ |  | 2 |
| 705 | 542 | 542 ✓ | ✓ |  | 2 |
| 705 | 16 | 16 ✓ | ✓ |  | 2 |
| 705 | 43 | oJ  | ✓ | ✓ OCR legge oJ; a vista: 43 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 43 | 3 |
| 705 | 175 | 175 ✓ | ✓ |  | 2 |
| 705 | 95 | 95 ✓ | ✓ |  | 2 |
| 705 | 109 | 109 ✓ | ✓ |  | 2 |
| 705 | 6,8 | 6,8 ✓ | ✓ |  | 2 |
| 705 | 25,7 | 25,7 ✓ | ✓ |  | 2 |
| 705 | 6,8 | 6,8 ✓ | ✓ |  | 2 |
| 705 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 705 | 643 | 643 ✓ | ✓ |  | 2 |
| 725 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 725 | 643 | 643 ✓ | ✓ |  | 2 |
| 725 | 19 | 19 ✓ | ✓ |  | 2 |
| 725 | 52 | 62  | ✓ | ✓ OCR legge 62; a vista: 52 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 52 | 3 |
| 725 | 201 | 201 ✓ | ✓ |  | 2 |
| 725 | 109 | 109 ✓ | ✓ |  | 2 |
| 725 | 125 | 125 ✓ | ✓ |  | 2 |
| 725 | 8,1 | 8,1 ✓ | ✓ |  | 2 |
| 725 | 30,7 | 30,7 ✓ | ✓ |  | 2 |
| 725 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 725 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 725 | 617 | 617 ✓ | ✓ |  | 2 |
| 742 | 610 | 610 ✓ | ✓ |  | 2 |
| 742 | 18 | 18 ✓ | ✓ |  | 2 |
| 742 | 48 | 48 ✓ | ✓ |  | 2 |
| 742 | 190 | 190 ✓ | ✓ |  | 2 |
| 742 | 103 | 103 ✓ | ✓ |  | 2 |
| 742 | 118 | 118 ✓ | ✓ |  | 2 |
| 742 | 7,5 | 7,5 ✓ | ✓ |  | 2 |
| 742 | 28,4 | 28,4 ✓ | ✓ |  | 2 |
| 742 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 742 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 742 | 630 | 630 ✓ | ✓ |  | 2 |
| 758 | 576 | 576 ✓ | ✓ |  | 2 |
| 758 | 17 | 17 ✓ | ✓ |  | 2 |
| 758 | 44 | 44 ✓ | ✓ |  | 2 |
| 758 | 179 | 1793  | ✓ | ✓ OCR legge 1793; a vista: 179 · seconda conferma: la riga torna: 96,0 kts x 1,852 = 177,8 km/h, 111,0 MPH x 1,609 = 178,6 km/h; e lo strato di testo del PDF legge 179 | 3 |
| 758 | 96 | 96 ✓ | ✓ |  | 2 |
| 758 | 111 | 111 ✓ | ✓ |  | 2 |
| 758 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 758 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 758 | 6,6 | 6,6 ✓ | ✓ |  | 2 |
| 758 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 758 | 639 | 639 ✓ | ✓ |  | 2 |
| 774 | 542 | 542 ✓ | ✓ |  | 2 |
| 774 | 16 | 16 ✓ | ✓ |  | 2 |
| 774 | 40 | hs  | ✓ | ✓ OCR legge hs; a vista: 40 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 40 | 3 |
| 774 | 164 | AGe  | ✓ | ✓ OCR legge AGe; a vista: 164 · seconda conferma: la riga torna: 89,0 kts x 1,852 = 164,8 km/h, 102,0 MPH x 1,609 = 164,1 km/h; e lo strato di testo del PDF legge 164 | 3 |
| 774 | 89 | 89 ✓ | ✓ |  | 2 |
| 774 | 102 | 102 ✓ | ✓ |  | 2 |
| 774 | 6,4 | 6,4 ✓ | ✓ |  | 2 |
| 774 | 24,2 | 24,2 ✓ | ✓ |  | 2 |
| 774 | 7,2 | 7,2 ✓ | ✓ |  | 2 |
| 774 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 774 | 643 | GAS  | ✓ | ✓ OCR legge GAS; a vista: 643 · seconda conferma: la riga torna: 1191,0 km / 1,852 = 643.1 NM; e lo strato di testo del PDF legge 643 | 3 |
| 794 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 794 | 643 | 643 ✓ | ✓ |  | 2 |
| 794 | 19 | 419  | ✓ | ✓ OCR legge 419; a vista: 19 · seconda conferma: la colonna torna: 643,0 mb / 33,86 = 19.0 in Hg; e lo strato di testo del PDF legge 19 | 3 |
| 794 | 49 | 49 ✓ | ✓ |  | 2 |
| 794 | 193 | 193 ✓ | ✓ |  | 2 |
| 794 | 104 | 104 ✓ | ✓ |  | 2 |
| 794 | 120 | 120 ✓ | ✓ |  | 2 |
| 794 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 794 | 28,8 | 28,8 ✓ | ✓ |  | 2 |
| 794 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 794 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 794 | 630 | 630 ✓ | ✓ |  | 2 |
| 810 | 610 | 610 ✓ | ✓ |  | 2 |
| 810 | 18 | 18 ✓ | ✓ |  | 2 |
| 810 | 45 | 45 ✓ | ✓ |  | 2 |
| 810 | 182 | 182 ✓ | ✓ |  | 2 |
| 810 | 98 | 98 ✓ | ✓ |  | 2 |
| 810 | 113 | 113 ✓ | ✓ |  | 2 |
| 810 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 810 | 26,9 | 26,9 ✓ | ✓ |  | 2 |
| 810 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 810 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 810 | 639 | 639 ✓ | ✓ |  | 2 |
| 826 | 576 | 576 ✓ | ✓ |  | 2 |
| 826 | 17 | 17 ✓ | ✓ |  | 2 |
| 826 | 41 | 41 ✓ | ✓ |  | 2 |
| 826 | 169 | 169 ✓ | ✓ |  | 2 |
| 826 | 91 | 91 ✓ | ✓ |  | 2 |
| 826 | 105 | 105 ✓ | ✓ |  | 2 |
| 826 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 826 | 24,6 | 24,6 ✓ | ✓ |  | 2 |
| 826 | 7,0 | 7,0 ✓ | ✓ |  | 2 |
| 826 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 826 | 643 | 643 ✓ | ✓ |  | 2 |
| 842 | 542 | 542 ✓ | ✓ |  | 2 |
| 842 | 16 | 16 ✓ | ✓ |  | 2 |
| 842 | 37 | 37 ✓ | ✓ |  | 2 |
| 842 | 156 | 156 ✓ | ✓ |  | 2 |
| 842 | 84 | 84 ✓ | ✓ |  | 2 |
| 842 | 97 | 97 ✓ | ✓ |  | 2 |
| 842 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 842 | 22,7 | 22,7 ✓ | ✓ |  | 2 |
| 842 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 842 | 1191 | 1191 ✓ | – | ✓ OCR legge 1191; a vista: 1191 · seconda conferma: la riga torna: 46 / 6,0 galloni all'ora x 156,0 km/h = 1196 km; 643,0 NM x 1,852 = 1191 km | 3 |
| 842 | 643 | 643 ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-1: ogni riga controllata con l'aritmetica della tabella (km/h = kts x 1,852 = MPH x 1,609; litri = galloni x 3,785; autonomia = 46 galloni / consumo; km = autonomia x km/h; NM = km / 1,852; in Hg = mb / 33,86): tutte tornano entro gli arrotondamenti ✓ (crociera_leggi.py). Le distanze sono quelle del manuale: in qualche riga km e autonomia differiscono di meno dell'1%, ma km e NM tornano sempre fra loro

### Pagina 5-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 329 | 5-6 | 5-6 ✓ | – | ✓ a vista: Page: 5-6 · seconda conferma: posizione nel PDF: pagina 62, fra 5-5 e 5-7 (mappa tools/afm/afm-ccaf.json) | 3 |
| 359 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 327 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 355 | 15000 | 15000 ✓ | ✓ |  | 2 |
| 385 | 46 | 46 ✓ | ✓ |  | 2 |
| 385 | (174 | (174 ✓ | ✓ |  | 2 |
| 883 | 1 | 1 ✓ | ✓ |  | 2 |
| 950 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 950 | 5 | 5 ✓ | ✓ |  | 2 |
| 950 | 5). | S).  | ✓ | ✓ a vista: (Sheet ... of 5). · seconda conferma: la figura 5-1 (Cruise Performance) ha cinque fogli, uno per quota (2500, 5000, 7500, 10000, 15000 piedi), alle pagine 5-2 ... 5-6: questo e' il foglio 5 | 3 |
| 469 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 469 | 508 | 508 ✓ | ✓ |  | 2 |
| 469 | 15 | 15 ✓ | ✓ |  | 2 |
| 469 | 49 | 49 ✓ | ✓ |  | 2 |
| 469 | 198 | 198 ✓ | ✓ |  | 2 |
| 469 | 107 | 107 ✓ | ✓ |  | 2 |
| 469 | 123 | 123 ✓ | ✓ |  | 2 |
| 469 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 469 | 28,8 | 28,8 ✓ | ✓ |  | 2 |
| 469 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 469 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 469 | 643 | 643 ✓ | ✓ |  | 2 |
| 485 | 474 | 474 ✓ | ✓ |  | 2 |
| 485 | 14 | 14 ✓ | ✓ |  | 2 |
| 485 | 44 | ag  | ✓ | ✓ OCR legge ag; a vista: 44 · seconda conferma: lo strato di testo del PDF (OCR di Acrobat, lettura indipendente) legge 44 | 3 |
| 485 | 180 | 180 ✓ | ✓ |  | 2 |
| 485 | 97 | 97 ✓ | ✓ |  | 2 |
| 485 | 112 | 112 ✓ | ✓ |  | 2 |
| 485 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 485 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 485 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 485 | 1207 | 1207 ✓ | ✓ |  | 2 |
| 485 | 652 | 652 ✓ | ✓ |  | 2 |
| 502 | 440 | 440 ✓ | ✓ |  | 2 |
| 502 | 13 | 13 ✓ | ✓ |  | 2 |
| 502 | 38 | 38 ✓ | ✓ |  | 2 |
| 502 | 163 | 163 ✓ | ✓ |  | 2 |
| 502 | 88 | 88 ✓ | ✓ |  | 2 |
| 502 | 101 | 101 ✓ | ✓ |  | 2 |
| 502 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 502 | 23,1 | 23,1 ✓ | ✓ |  | 2 |
| 502 | 7,5 | 7,5 ✓ | ✓ |  | 2 |
| 502 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 502 | 656 | 656 ✓ | ✓ |  | 2 |
| 537 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 537 | 508 | 508 ✓ | ✓ |  | 2 |
| 537 | 15 | 15 ✓ | ✓ |  | 2 |
| 537 | 47 | 47 ✓ | ✓ |  | 2 |
| 537 | 190 | 190 ✓ | ✓ |  | 2 |
| 537 | 103 | 103 ✓ | ✓ |  | 2 |
| 537 | 118 | 118 ✓ | ✓ |  | 2 |
| 537 | 7,3 | 7,3 ✓ | ✓ |  | 2 |
| 537 | 27,6 | 27.6 ✓ | ✓ |  | 2 |
| 537 | 6,3 | 6.3 ✓ | ✓ |  | 2 |
| 537 | 1199 | 1199 ✓ | ✓ |  | 2 |
| 537 | 647 | 647 ✓ | ✓ |  | 2 |
| 553 | 474 | 474 ✓ | ✓ |  | 2 |
| 553 | 14 | 14 ✓ | ✓ |  | 2 |
| 553 | 41 | 41 ✓ | ✓ |  | 2 |
| 553 | 174 | 174 ✓ | ✓ |  | 2 |
| 553 | 94 | 94 ✓ | ✓ |  | 2 |
| 553 | 108 | 108 ✓ | ✓ |  | 2 |
| 553 | 6,6 | 6,6 ✓ | ✓ |  | 2 |
| 553 | 25,0 | 25,0 ✓ | ✓ |  | 2 |
| 553 | 7,0 | 7,0 ✓ | ✓ |  | 2 |
| 553 | 1207 | 1207 ✓ | ✓ |  | 2 |
| 553 | 652 | 652 ✓ | ✓ |  | 2 |
| 570 | 440 | 440 ✓ | ✓ |  | 2 |
| 570 | 13 | 13 ✓ | ✓ |  | 2 |
| 570 | 36 | 36 ✓ | ✓ |  | 2 |
| 570 | 158 | 158 ✓ | ✓ |  | 2 |
| 570 | 85 | 85 ✓ | ✓ |  | 2 |
| 570 | 98 | 98 ✓ | ✓ |  | 2 |
| 570 | 5,9 | 5,2  | ✓ | ✓ OCR legge 5,2; a vista: 5,9 · seconda conferma: la riga torna: 22,3 litri / 3,785 = 5.89 galloni; 46 galloni / 5,9 = 7.80 ore (7,7 stampate); e lo strato di testo del PDF legge 5,9 | 3 |
| 570 | 22,3 | 22,3 ✓ | ✓ |  | 2 |
| 570 | 7,7 | 7,7 ✓ | ✓ |  | 2 |
| 570 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 570 | 656 | 656 ✓ | ✓ |  | 2 |
| 605 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 605 | 508 | 508 ✓ | ✓ |  | 2 |
| 605 | 15 | 15 ✓ | ✓ |  | 2 |
| 605 | 44 | 44 ✓ | ✓ |  | 2 |
| 605 | 180 | 180 ✓ | ✓ |  | 2 |
| 605 | 97 | 97 ✓ | ✓ |  | 2 |
| 605 | 112 | 112 ✓ | ✓ |  | 2 |
| 605 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 605 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 605 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 605 | 1207 | 1207 ✓ | ✓ |  | 2 |
| 605 | 652 | 652 ✓ | ✓ |  | 2 |
| 621 | 474 | 474 ✓ | ✓ |  | 2 |
| 621 | 14 | 14 ✓ | ✓ |  | 2 |
| 621 | 39 | 39 ✓ | ✓ |  | 2 |
| 621 | 166 | 166 ✓ | ✓ |  | 2 |
| 621 | 90 | 90 ✓ | ✓ |  | 2 |
| 621 | 103 | 103 ✓ | ✓ |  | 2 |
| 621 | 6,3 | 6,3 ✓ | ✓ |  | 2 |
| 621 | 23,8 | 23,8 ✓ | ✓ |  | 2 |
| 621 | 7,4 | 7,4 ✓ | ✓ |  | 2 |
| 621 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 621 | 656 | 656 ✓ | ✓ |  | 2 |
| 673 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 673 | 508 | 508 ✓ | ✓ |  | 2 |
| 673 | 15 | 15 ✓ | ✓ |  | 2 |
| 673 | 40 | 40 ✓ | ✓ |  | 2 |
| 673 | 171 | 171 ✓ | ✓ |  | 2 |
| 673 | 92 | 92 ✓ | ✓ |  | 2 |
| 673 | 106 | 106 ✓ | ✓ |  | 2 |
| 673 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 673 | 24,6 | 24,6 ✓ | ✓ |  | 2 |
| 673 | 7,1 | oF  | ✓ | ✓ OCR legge oF; a vista: 7,1 · seconda conferma: la riga torna: 46 galloni / 6,5 galloni all'ora = 7.08 ore; e lo strato di testo del PDF legge 7,1 | 3 |
| 673 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 673 | 656 | 656 ✓ | ✓ |  | 2 |
| 690 | 474 | 474 ✓ | ✓ |  | 2 |
| 690 | 14 | 14 ✓ | ✓ |  | 2 |
| 690 | 36 | 36 ✓ | ✓ |  | 2 |
| 690 | 156 | 156 ✓ | ✓ |  | 2 |
| 690 | 84 | 84 ✓ | ✓ |  | 2 |
| 690 | 97 | 97 ✓ | ✓ |  | 2 |
| 690 | 5,9 | 5,3  | ✓ | ✓ OCR legge 5,3; a vista: 5,9 · seconda conferma: la riga torna: 22,3 litri / 3,785 = 5.89 galloni; 46 galloni / 5,9 = 7.80 ore (7,8 stampate); e lo strato di testo del PDF legge 5,9 | 3 |
| 690 | 22,3 | 22,3 ✓ | ✓ |  | 2 |
| 690 | 7,8 | 7.8 ✓ | ✓ |  | 2 |
| 690 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 690 | 656 | 656 ✓ | ✓ |  | 2 |
| 742 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 742 | 508 | 608  | ✓ | ✓ OCR legge 608; a vista: 508 · seconda conferma: la colonna torna: 15,0 in Hg x 33,86 = 508 mb; e lo strato di testo del PDF legge 508 | 3 |
| 742 | 15 | 15 ✓ | ✓ |  | 2 |
| 742 | 38 | 38 ✓ | ✓ |  | 2 |
| 742 | 163 | 163 ✓ | ✓ |  | 2 |
| 742 | 88 | 88 ✓ | ✓ |  | 2 |
| 742 | 101 | 101 ✓ | ✓ |  | 2 |
| 742 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 742 | 23,1 | 23,1 ✓ | ✓ |  | 2 |
| 742 | 7,5 | 75  | ✓ | ✓ OCR legge 75; a vista: 7,5 · seconda conferma: la riga torna: 46 galloni / 6,1 galloni all'ora = 7.54 ore; e lo strato di testo del PDF legge 7,5 | 3 |
| 742 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 742 | 656 | 656 ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-1: ogni riga controllata con l'aritmetica della tabella (km/h = kts x 1,852 = MPH x 1,609; litri = galloni x 3,785; autonomia = 46 galloni / consumo; km = autonomia x km/h; NM = km / 1,852; in Hg = mb / 33,86): tutte tornano entro gli arrotondamenti ✓ (crociera_leggi.py). Le distanze sono quelle del manuale: in qualche riga km e autonomia differiscono di meno dell'1%, ma km e NM tornano sempre fra loro

### Pagina 5-7 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 224 | 5-7 | 5-7 ✓ | – | ✓ OCR legge 5-7; a vista: 5-7 · seconda conferma: posizione nel PDF: pagina 63, fra 5-6 e 5-8 (mappa tools/afm/afm-ccaf.json) | 3 |
| 255 | 3 | 3 ✓ | – | ✓ OCR legge 3; a vista: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 411 | 80 | 80 ✓ | ✓ |  | 2 |
| 409 | 97 | 97 ✓ | ✓ |  | 2 |
| 410 | 113 | 113 ✓ | ✓ |  | 2 |
| 409 | 129 | 129 ✓ | ✓ |  | 2 |
| 409 | 145 | 145 ✓ | ✓ |  | 2 |
| 410 | 161 | 161 ✓ | ✓ |  | 2 |
| 408 | 177 | 177 ✓ | ✓ |  | 2 |
| 410 | 193 | 193 ✓ | ✓ |  | 2 |
| 411 | 209 | 209 ✓ | ✓ |  | 2 |
| 411 | 225 | 225 ✓ | ✓ |  | 2 |
| 411 | 241 | 241 ✓ | ✓ |  | 2 |
| 458 | 50 | 50 ✓ | ✓ |  | 2 |
| 457 | 60 | 60 ✓ | ✓ |  | 2 |
| 457 | 70 | 7O  | ✓ | ✓ OCR legge 7O; a vista: 70 · seconda conferma: la tabella torna: VI 70 MPH = 112,6 km/h: e' la colonna di VI 113 km/h (riga sopra) | 3 |
| 457 | 80 | 80 ✓ | ✓ |  | 2 |
| 457 | 90 | 90 ✓ | ✓ |  | 2 |
| 457 | 100 | 100 ✓ | ✓ |  | 2 |
| 457 | 110 | 110 ✓ | ✓ |  | 2 |
| 457 | 120 | 120 ✓ | ✓ |  | 2 |
| 457 | 130 | 130 ✓ | ✓ |  | 2 |
| 457 | 140 | 140 ✓ | ✓ |  | 2 |
| 458 | 150 | 150 ✓ | ✓ |  | 2 |
| 504 | 95 | 95 ✓ | ✓ |  | 2 |
| 504 | 105 | 105 ✓ | ✓ |  | 2 |
| 504 | 116 | 116 ✓ | ✓ |  | 2 |
| 503 | 129 | 129 ✓ | ✓ |  | 2 |
| 504 | 143 | 143 ✓ | ✓ |  | 2 |
| 503 | 159 | 159 ✓ | ✓ |  | 2 |
| 503 | 175 | 175 ✓ | ✓ |  | 2 |
| 504 | 192 | 192 ✓ | ✓ |  | 2 |
| 504 | 206 | 206 ✓ | ✓ |  | 2 |
| 504 | 222 | 222 ✓ | ✓ |  | 2 |
| 504 | 238 | 238 ✓ | ✓ |  | 2 |
| 550 | 59 | 59 ✓ | ✓ |  | 2 |
| 551 | 65 | 65 ✓ | ✓ |  | 2 |
| 550 | 72 | 72 ✓ | ✓ |  | 2 |
| 551 | 80 | 80 ✓ | ✓ |  | 2 |
| 550 | 89 | 89 ✓ | ✓ |  | 2 |
| 550 | 99 | 99 ✓ | ✓ |  | 2 |
| 550 | 109 | 109 ✓ | ✓ |  | 2 |
| 550 | 119 | 119 ✓ | ✓ |  | 2 |
| 551 | 128 | 128 ✓ | ✓ |  | 2 |
| 551 | 138 | 138 ✓ | ✓ |  | 2 |
| 551 | 148 | 148 ✓ | ✓ |  | 2 |
| 606 | 80 | 80 ✓ | ✓ |  | 2 |
| 605 | 97 | 97 ✓ | ✓ |  | 2 |
| 605 | 113 | 113 ✓ | ✓ |  | 2 |
| 605 | 129 | 129 ✓ | ✓ |  | 2 |
| 605 | 145 | 145 ✓ | ✓ |  | 2 |
| 605 | 161 | 161 ✓ | ✓ |  | 2 |
| 653 | 50 | 50 ✓ | ✓ |  | 2 |
| 653 | 60 | 60 ✓ | ✓ |  | 2 |
| 653 | 70 | 7O  | ✓ | ✓ OCR legge 7O; a vista: 70 · seconda conferma: la tabella torna: VI 70 MPH = 112,6 km/h: la colonna di VI 113 km/h (riga sopra) | 3 |
| 653 | 80 | 80 ✓ | ✓ |  | 2 |
| 653 | 90 | 90 ✓ | ✓ |  | 2 |
| 653 | 100 | 100 ✓ | ✓ |  | 2 |
| 700 | 95 | 95 ✓ | ✓ |  | 2 |
| 699 | 103 | 103 ✓ | ✓ |  | 2 |
| 699 | 116 | 116 ✓ | ✓ |  | 2 |
| 699 | 130 | 130 ✓ | ✓ |  | 2 |
| 700 | 145 | 145 ✓ | ✓ |  | 2 |
| 699 | 161 | 161 ✓ | ✓ |  | 2 |
| 745 | 59 | 59 ✓ | ✓ |  | 2 |
| 745 | 64 | 64 ✓ | ✓ |  | 2 |
| 745 | 72 | Pgs  | ✓ | ✓ OCR legge Pgs; a vista: 72 · seconda conferma: la tabella torna: VC 72 MPH = 115,8 km/h: la colonna di VC 116 km/h (riga sopra) | 3 |
| 745 | 81 | 81 ✓ | ✓ |  | 2 |
| 745 | 90 | 90 ✓ | ✓ |  | 2 |
| 744 | 100 | 100 ✓ | ✓ |  | 2 |
| 686 | 20° | 202P  | ✓ | ✓ OCR legge 202P; a vista: 20° · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40°; il segno in apice e' il grado | 3 |
| 802 | 80 | BO  | ✓ | ✓ OCR legge BO; a vista: 80 · seconda conferma: la tabella torna: VI 80 MPH = 128,7 km/h: la colonna di VI 129 km/h (riga sopra) | 3 |
| 802 | 97 | 97 ✓ | ✓ |  | 2 |
| 801 | 113 | 113 ✓ | ✓ |  | 2 |
| 802 | 129 | 129 ✓ | ✓ |  | 2 |
| 802 | 145 | 145 ✓ | ✓ |  | 2 |
| 802 | 161 | 161 ✓ | ✓ |  | 2 |
| 849 | 50 | 50 ✓ | ✓ |  | 2 |
| 849 | 60 | 60 ✓ | ✓ |  | 2 |
| 848 | 70 | 70 ✓ | ✓ |  | 2 |
| 848 | 80 | 80 ✓ | ✓ |  | 2 |
| 849 | 90 | 90 ✓ | ✓ |  | 2 |
| 848 | 100 | 100 ✓ | ✓ |  | 2 |
| 895 | 95 | 95 ✓ | ✓ |  | 2 |
| 894 | 103 | 103 ✓ | ✓ |  | 2 |
| 894 | 116 | 116 ✓ | ✓ |  | 2 |
| 895 | 132 | 132 ✓ | ✓ |  | 2 |
| 895 | 146 | 146 ✓ | ✓ |  | 2 |
| 894 | 163 | 163 ✓ | ✓ |  | 2 |
| 941 | 59 | 59 ✓ | ✓ |  | 2 |
| 941 | 64 | 64 ✓ | ✓ |  | 2 |
| 940 | 72 | 72 ✓ | ✓ |  | 2 |
| 941 | 82 | 82 ✓ | ✓ |  | 2 |
| 940 | 91 | 91 ✓ | ✓ |  | 2 |
| 940 | 101 | 101 ✓ | ✓ |  | 2 |
| 884 | 40° | 40 ✓ | ✓ |  | 2 |
| 993 | 5-2. | 5-2. ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-2: in ogni gruppo le righe km/h e MPH sono la stessa velocita' (km/h = MPH x 1,609, arrotondati): tutte le 66 coppie tornano ✓ (controllo in costruisci/5-7.py); VI 50…150 MPH = 80…241 km/h ✓

### Pagina 5-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 333 | 5-8 | 5-8 ✓ | ✓ |  | 2 |
| 366 | 3 | 3 ✓ | ✓ |  | 2 |
| 643 | 0° | 0 ✓ | ✓ |  | 2 |
| 643 | 20° | 20 ✓ | ✓ |  | 2 |
| 643 | 40° | 49  | ✓ | ✓ OCR legge altro; a vista: 40° · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 3 |
| 643 | 60° | 60 ✓ | ✓ |  | 2 |
| 711 | 98 | 98 ✓ | ✓ |  | 2 |
| 741 | 53 | 03  | ✓ | ✓ OCR legge altro; a vista: 53 · seconda conferma: DATI-AFM.md: stallo flap UP 98 km/h, 53 kts, 61 MPH (anche su 2-1); la terna torna (98 km/h = 52,9 kt) | 3 |
| 772 | 61 | 61 ✓ | ✓ |  | 2 |
| 711 | 101 | 101 ✓ | ✓ |  | 2 |
| 741 | 55 | 55 ✓ | ✓ |  | 2 |
| 772 | 63 | 63 ✓ | ✓ |  | 2 |
| 711 | 113 | 113 ✓ | ✓ |  | 2 |
| 741 | 61 | 61 ✓ | ✓ |  | 2 |
| 772 | 70 | 70 ✓ | ✓ |  | 2 |
| 711 | 138 | 138 ✓ | ✓ |  | 2 |
| 741 | 75 | 75 ✓ | ✓ |  | 2 |
| 772 | 86 | 86 ✓ | ✓ |  | 2 |
| 840 | 20° | 909  | ✓ | ✓ OCR legge altro; a vista: 20° · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 3 |
| 841 | 89 | 89 ✓ | ✓ |  | 2 |
| 871 | 48 | 48 ✓ | ✓ |  | 2 |
| 903 | 55 | 65  | ✓ | ✓ OCR legge altro; a vista: 55 · seconda conferma: la terna della cella torna: 89 km/h = 55,3 MPH (89 km/h e 48 kts sopra); DATI-AFM.md: stallo flap 20° 55 MPH | 3 |
| 841 | 92 | 92 ✓ | ✓ |  | 2 |
| 871 | 50 | 50 ✓ | ✓ |  | 2 |
| 903 | 57 | 5/7  | ✓ | ✓ OCR legge altro; a vista: 57 · seconda conferma: la terna della cella torna: 92 km/h = 49,7 kt = 57,2 MPH (92 km/h e 50 kts sopra) | 3 |
| 841 | 103 | 103 ✓ | ✓ |  | 2 |
| 871 | 56 | –  | ✓ | ✓ OCR legge altro; a vista: 56 · seconda conferma: la terna della cella torna: 103 km/h = 55,6 kt (103 km/h e 64 MPH nella stessa cella) | 3 |
| 903 | 64 | 64 ✓ | ✓ |  | 2 |
| 841 | 127 | 127 ✓ | ✓ |  | 2 |
| 871 | 69 | 69 ✓ | ✓ |  | 2 |
| 903 | 79 | 79 ✓ | ✓ |  | 2 |
| 971 | 40° | 409  | ✓ | ✓ OCR legge altro; a vista: 40° · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40° (tabella di stallo); il segno in apice e' il grado | 3 |
| 971 | 85 | 85 ✓ | ✓ |  | 2 |
| 1002 | 46 | 46 ✓ | ✓ |  | 2 |
| 1032 | 53 | 53 ✓ | ✓ |  | 2 |
| 971 | 89 | 89 ✓ | ✓ |  | 2 |
| 1002 | 48 | 48 ✓ | ✓ |  | 2 |
| 1032 | 55 | 55 ✓ | ✓ |  | 2 |
| 971 | 97 | 97 ✓ | ✓ |  | 2 |
| 1002 | 52 | 52 ✓ | ✓ |  | 2 |
| 1032 | 60 | 60 ✓ | ✓ |  | 2 |
| 971 | 121 | 121 ✓ | ✓ |  | 2 |
| 1002 | 65 | 65 ✓ | ✓ |  | 2 |
| 1032 | 75 | 75 ✓ | ✓ |  | 2 |
| 900 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 1199 | 5-3. | 3-3.  | ✓ | ✓ OCR legge altro; a vista: 5-3. · seconda conferma: mappa tools/afm/afm-ccaf.json: la figura 5-3 (Stall Speeds Data) e' a pagina 5-8 | 3 |

Confronto con i dati del progetto:

- Figura 5-3, stallo a 1157 kg: con inclinazione 0° 98/89/85 km/h - 53/48/46 kts - 61/55/53 MPH = DATI-AFM.md e pagina 2-1 ✓; ogni cella e' una terna che torna (1 kt = 1,852 km/h, 1 MPH = 1,609 km/h) ✓; con l'inclinazione la velocita' cresce come 1/√cos φ (flap UP: 61 → 63 → 70 → 86 MPH a 20°, 40°, 60°) ✓

### Pagina 5-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 222 | 5-9 | 5-9 ✓ | – | ✓ a vista: Page: 5-9 · seconda conferma: posizione nel PDF: pagina 65, fra 5-8 e 5-10 (pagina 64 e 66; mappa tools/afm/afm-ccaf.json) | 3 |
| 252 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 330 | 10° | 10 ✓ | ✓ |  | 2 |
| 421 | 15m | 15m ✓ | ✓ |  | 2 |
| 421 | +15°C | 4159C  | – | ✓ a vista: AND +15°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C | 2 |
| 515 | 15 | 15 ✓ | ✓ |  | 2 |
| 399 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 421 | +10°C | 10C ✓ | – | ✓ a vista: AND +10°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C | 3 |
| 516 | 15 | 15 ✓ | ✓ |  | 2 |
| 399 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 421 | +5°C | 59C  | – | ✓ a vista: AND +5°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C | 2 |
| 515 | 15 | 15 ✓ | ✓ |  | 2 |
| 399 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 421 | 0°C | oPc  | – | ✓ a vista: AND 0°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C | 2 |
| 514 | 15 | 15 ✓ | ✓ |  | 2 |
| 629 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 606 | 109 | 109 ✓ | ✓ |  | 2 |
| 629 | 59 | 59 ✓ | ✓ |  | 2 |
| 652 | 68 | 68 ✓ | ✓ |  | 2 |
| 607 | 0 | a  | ✓ | ✓ OCR legge altro; a vista: 0 · seconda conferma: vento in prua nullo: 0 km/h = 0 kts, la prima riga di ogni gruppo (poi 19 km/h = 10 kts, 37 km/h = 20 kts) | 3 |
| 629 | 19 | 19 ✓ | ✓ |  | 2 |
| 652 | 37 | 37 ✓ | ✓ |  | 2 |
| 606 | 0 | 0 ✓ | ✓ | ✓ OCR legge altro; a vista: 0 · seconda conferma: vento in prua nullo: 0 km/h = 0 kts, la prima riga di ogni gruppo (poi 19 km/h = 10 kts, 37 km/h = 20 kts) | 4 |
| 629 | 10 | 10 ✓ | ✓ |  | 2 |
| 651 | 20 | 20 ✓ | ✓ |  | 2 |
| 606 | 226 | 226 ✓ | ✓ |  | 2 |
| 629 | 158 | 158 ✓ | ✓ |  | 2 |
| 651 | 102 | 102 ✓ | ✓ |  | 2 |
| 606 | 375 | 375 ✓ | ✓ |  | 2 |
| 629 | 282 | 282 ✓ | ✓ |  | 2 |
| 652 | 201 | 201 ✓ | ✓ |  | 2 |
| 606 | 268 | 268 ✓ | ✓ |  | 2 |
| 629 | 192 | 192 ✓ | ✓ |  | 2 |
| 651 | 126 | 126 ✓ | ✓ |  | 2 |
| 606 | 439 | 439 ✓ | ✓ |  | 2 |
| 629 | 335 | 335 ✓ | ✓ |  | 2 |
| 652 | 242 | 242 ✓ | ✓ |  | 2 |
| 606 | 325 | 325 ✓ | ✓ |  | 2 |
| 629 | 235 | 235 ✓ | ✓ |  | 2 |
| 651 | 158 | 158 ✓ | ✓ |  | 2 |
| 606 | 526 | 526 ✓ | ✓ |  | 2 |
| 629 | 405 | 405 ✓ | ✓ |  | 2 |
| 651 | 297 | 297 ✓ | ✓ |  | 2 |
| 606 | 393 | 393 ✓ | ✓ |  | 2 |
| 628 | 288 | 288 ✓ | ✓ |  | 2 |
| 651 | 200 | 200 ✓ | ✓ |  | 2 |
| 606 | 639 | 639 ✓ | ✓ |  | 2 |
| 628 | 497 | 497 ✓ | ✓ |  | 2 |
| 651 | 370 | 370 ✓ | ✓ |  | 2 |
| 721 | 1000 | 1000 ✓ | ✓ |  | 2 |
| 700 | 101 | 101 ✓ | ✓ |  | 2 |
| 722 | 55 | 55 ✓ | ✓ |  | 2 |
| 745 | 63 | 63 ✓ | ✓ |  | 2 |
| 700 | 0 | a  | ✓ | ✓ OCR legge altro; a vista: 0 · seconda conferma: vento in prua nullo: 0 km/h = 0 kts, la prima riga di ogni gruppo (poi 19 km/h = 10 kts, 37 km/h = 20 kts) | 3 |
| 722 | 19 | 19 ✓ | ✓ |  | 2 |
| 745 | 37 | 37 ✓ | ✓ |  | 2 |
| 700 | 0 | –  | ✓ | ✓ OCR legge altro; a vista: 0 · seconda conferma: vento in prua nullo: 0 km/h = 0 kts, la prima riga di ogni gruppo (poi 19 km/h = 10 kts, 37 km/h = 20 kts) | 3 |
| 722 | 10 | 10 ✓ | ✓ |  | 2 |
| 745 | 20 | 20 ✓ | ✓ |  | 2 |
| 700 | 162 | 162 ✓ | ✓ |  | 2 |
| 722 | 110 | 110 ✓ | ✓ |  | 2 |
| 745 | 69 | 69 ✓ | ✓ |  | 2 |
| 700 | 282 | 282 ✓ | ✓ |  | 2 |
| 722 | 209 | 209 ✓ | ✓ |  | 2 |
| 744 | 145 | 145 ✓ | ✓ |  | 2 |
| 700 | 192 | 192 ✓ | ✓ |  | 2 |
| 722 | 134 | 134 ✓ | ✓ |  | 2 |
| 744 | 85 | 85 ✓ | ✓ |  | 2 |
| 700 | 326 | 326 ✓ | ✓ |  | 2 |
| 722 | 245 | 245 ✓ | ✓ |  | 2 |
| 745 | 172 | Tt  | ✓ | ✓ OCR legge Tt; a vista: 172 · seconda conferma: lo strato di testo del PDF legge 172 | 3 |
| 700 | 232 | 232 ✓ | ✓ |  | 2 |
| 722 | 163 | 163 ✓ | ✓ |  | 2 |
| 744 | 105 | 105 ✓ | ✓ |  | 2 |
| 700 | 386 | 386 ✓ | ✓ |  | 2 |
| 721 | 291 | 291 ✓ | ✓ |  | 2 |
| 744 | 207 | 207 ✓ | ✓ |  | 2 |
| 699 | 279 | 279 ✓ | ✓ |  | 2 |
| 722 | 200 | 200 ✓ | ✓ |  | 2 |
| 744 | 133 | 133 ✓ | ✓ |  | 2 |
| 699 | 459 | 459 ✓ | ✓ |  | 2 |
| 721 | 349 | 349 ✓ | ✓ |  | 2 |
| 743 | 253 | 253 ✓ | ✓ |  | 2 |
| 812 | 850 | 850 ✓ | ✓ |  | 2 |
| 790 | 93 | 93 ✓ | ✓ |  | 2 |
| 813 | 50 | 50 ✓ | ✓ |  | 2 |
| 836 | 58 | 58 ✓ | ✓ |  | 2 |
| 790 | 0 | –  | ✓ | ✓ OCR legge altro; a vista: 0 · seconda conferma: vento in prua nullo: 0 km/h = 0 kts, la prima riga di ogni gruppo (poi 19 km/h = 10 kts, 37 km/h = 20 kts) | 3 |
| 813 | 19 | 19 ✓ | ✓ |  | 2 |
| 836 | 37 | 37 ✓ | ✓ |  | 2 |
| 790 | 0 | –  | ✓ | ✓ OCR legge altro; a vista: 0 · seconda conferma: vento in prua nullo: 0 km/h = 0 kts, la prima riga di ogni gruppo (poi 19 km/h = 10 kts, 37 km/h = 20 kts) | 3 |
| 813 | 10 | 10 ✓ | ✓ |  | 2 |
| 835 | 20 | 20 ✓ | ✓ |  | 2 |
| 790 | 113 | 113 ✓ | ✓ |  | 2 |
| 812 | 75 | 75 ✓ | ✓ |  | 2 |
| 836 | 43 | 43 ✓ | ✓ |  | 2 |
| 791 | 210 | 210 ✓ | ✓ |  | 2 |
| 813 | 154 | 154 ✓ | ✓ |  | 2 |
| 836 | 104 | 104 ✓ | ✓ |  | 2 |
| 791 | 133 | 133 ✓ | ✓ |  | 2 |
| 813 | 90 | 90 ✓ | ✓ |  | 2 |
| 836 | 53 | 53 ✓ | ✓ |  | 2 |
| 791 | 241 | 241 ✓ | ✓ |  | 2 |
| 813 | 177 | 177 ✓ | ✓ |  | 2 |
| 836 | 120 | 120 ✓ | ✓ |  | 2 |
| 791 | 160 | 160 ✓ | ✓ |  | 2 |
| 813 | 108 | 108 ✓ | ✓ |  | 2 |
| 836 | 67 | 67 ✓ | ✓ |  | 2 |
| 791 | 280 | 280 ✓ | ✓ |  | 2 |
| 813 | 207 | 207 ✓ | ✓ |  | 2 |
| 836 | 143 | 143 ✓ | ✓ |  | 2 |
| 790 | 192 | 192 ✓ | ✓ |  | 2 |
| 813 | 133 | 133 ✓ | ✓ |  | 2 |
| 835 | 84 | 84 ✓ | ✓ |  | 2 |
| 790 | 328 | 328 ✓ | ✓ |  | 2 |
| 813 | 245 | 245 ✓ | ✓ |  | 2 |
| 835 | 172 | 172 ✓ | ✓ |  | 2 |
| 880 | 1. | 1. ✓ | ✓ |  | 2 |
| 880 | 10% | 10 ✓ | ✓ |  | 2 |
| 880 | 14°C | 14aC ✓ | – | ✓ a vista: for each 14°C above standard · seconda conferma: 14°C = 25°F, la regola dei manuali Cessna (10% ogni 25°F sopra lo standard); lo strato di testo del PDF legge 14°C | 3 |
| 902 | 2. | 2. ✓ | ✓ |  | 2 |
| 925 | 7% | 7 ✓ | ✓ |  | 2 |
| 925 | 15 | 15 ✓ | ✓ |  | 2 |
| 1001 | 5-4. | 5-4. ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-4: VI a 15 m 109 / 101 / 93 km/h = 59 / 55 / 50 kts = 68 / 63 / 58 MPH ✓ (terne che tornano) = DATI-AFM.md, VR / velocita' a 15 m 68 / 63 / 58 MPH a 1157 / 1000 / 850 kg ✓; vento 19 km/h = 10 kts, 37 km/h = 20 kts ✓
- Distanze: crescono con la quota e calano col vento e col peso in ogni colonna (nessuna inversione) ✓; i numeri hanno due letture concordi (Tesseract e strato di testo del PDF) salvo quelli chiusi a vista qui sopra

### Pagina 5-10 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 338 | 5-10 | 5-10 ✓ | – | ✓ OCR legge 5-10; a vista: 5-10 · seconda conferma: posizione nel PDF: pagina 66, fra 5-9 e 5-11 (mappa tools/afm/afm-ccaf.json) | 3 |
| 369 | 3 | 3 ✓ | – | ✓ OCR legge 3; a vista: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 3 |
| 298 | 40° | 40 ✓ | – | ✓ OCR legge 40; a vista: 40° · seconda conferma: DATI-AFM.md: posizioni dei flap UP / 20° / 40°; il segno in apice e' il grado | 3 |
| 432 | +15°C | 415PC  | – | ✓ OCR legge 415PC; a vista: +15°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C | 2 |
| 538 | 15 | 15 ✓ | ✓ |  | 2 |
| 409 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 431 | +10°C | 4109C  | – | ✓ OCR legge 4109C; a vista: +10°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C | 2 |
| 538 | 15 | 15 ✓ | ✓ |  | 2 |
| 409 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 431 | +5°C | 452C  | – | ✓ OCR legge 452C; a vista: +5°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C | 2 |
| 538 | 15 | 15 ✓ | ✓ |  | 2 |
| 409 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 432 | 0°C | oPc  | – | ✓ OCR legge oPc; a vista: 0°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C | 2 |
| 538 | 15 | 15 ✓ | ✓ |  | 2 |
| 697 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 652 | 117 | 117 ✓ | ✓ |  | 2 |
| 697 | 63 | 63 ✓ | ✓ |  | 2 |
| 742 | 73 | 73 ✓ | ✓ |  | 2 |
| 697 | 189 | 189 ✓ | ✓ |  | 2 |
| 696 | 387 | 387 ✓ | ✓ |  | 2 |
| 696 | 201 | 201 ✓ | ✓ |  | 2 |
| 695 | 411 | 411 ✓ | ✓ |  | 2 |
| 696 | 212 | 212 ✓ | ✓ |  | 2 |
| 695 | 434 | 434 ✓ | ✓ |  | 2 |
| 696 | 224 | 224 ✓ | ✓ |  | 2 |
| 696 | 460 | 460 ✓ | ✓ |  | 2 |
| 811 | 1. | 1. ✓ | ✓ |  | 2 |
| 811 | 10% | 10 ✓ | ✓ |  | 2 |
| 811 | 5 | 5 ✓ | ✓ |  | 2 |
| 833 | 2. | 2. ✓ | ✓ |  | 2 |
| 855 | 20% | 20 ✓ | ✓ |  | 2 |
| 855 | 15m | 15m ✓ | ✓ |  | 2 |
| 962 | 5-5. | 5-5. ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-5: velocita' di avvicinamento 117 km/h = 63,2 kts = 72,7 MPH ✓ = DATI-AFM.md, avvicinamento flap 40° 73 MPH a 1157 kg ✓; le distanze crescono con la quota in tutte e due le colonne ✓; i numeri hanno due letture concordi (Tesseract e strato di testo del PDF)

### Pagina 5-11 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 223 | 5-11 | 5-1)  | – | ✓ OCR legge 5-1); a vista: 5-11 · seconda conferma: posizione nel PDF: pagina 67, fra 5-10 e 5-12 (mappa tools/afm/afm-ccaf.json) | 2 |
| 254 | 3 | :  | – | ✓ OCR legge :; a vista: 3 · seconda conferma: tutte le pagine del manuale I-CCAF sono Edition 3 (copertina e intestazioni gia' verificate) | 2 |
| 449 | +15°C | 15PC ✓ | – | ✓ OCR legge 15PC; a vista: +15°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C, 15000 ft -15°C | 3 |
| 430 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 448 | +5°C | 459C  | – | ✓ OCR legge 459C; a vista: +5°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C, 15000 ft -15°C | 2 |
| 430 | 10000 | 10000 ✓ | ✓ |  | 2 |
| 449 | -5°C | -59C  | ✓ | ✓ OCR legge -59C; a vista: -5°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C, 15000 ft -15°C | 3 |
| 430 | 15000 | 15000 ✓ | ✓ |  | 2 |
| 449 | -15°C | -159C  | ✓ | ✓ OCR legge -159C; a vista: -15°C · seconda conferma: atmosfera standard (ISA): +15°C al livello del mare, -2°C ogni 1000 piedi: 2500 ft +10°C, 5000 ft +5°C, 7500 ft 0°C, 10000 ft -5°C, 15000 ft -15°C | 3 |
| 621 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 602 | 137 | 137 ✓ | ✓ |  | 2 |
| 621 | 74 | 74 ✓ | ✓ |  | 2 |
| 639 | 85 | 85 ✓ | ✓ |  | 2 |
| 621 | 880 | 880 ✓ | ✓ |  | 2 |
| 621 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 603 | 135 | 135 ✓ | ✓ |  | 2 |
| 621 | 73 | 73 ✓ | ✓ |  | 2 |
| 639 | 84 | B4  | ✓ | ✓ OCR legge altro; a vista: 84 · seconda conferma: DATI-AFM.md: VY a 1157 kg 85 / 84 / 83 / 82 MPH a SL / 5000 / 10000 / 15000 ft; e la terna 135 km/h = 72,9 kts = 83,9 MPH torna | 3 |
| 621 | 650 | 650 ✓ | ✓ |  | 2 |
| 621 | 11,7 | Tikes  | ✓ | ✓ OCR legge altro; a vista: 11,7 · seconda conferma: DATI-AFM.md: carburante di salita a 1157 kg 4,9 L al livello del mare, 11,7 L a 5000 ft, 20,1 L a 10000 ft | 3 |
| 603 | 134 | 134 ✓ | ✓ |  | 2 |
| 621 | 72 | 72 ✓ | ✓ |  | 2 |
| 640 | 83 | 83 ✓ | ✓ |  | 2 |
| 621 | 420 | 420 ✓ | ✓ |  | 2 |
| 622 | 20,1 | 20,1 ✓ | ✓ |  | 2 |
| 604 | 132 | 132 ✓ | ✓ |  | 2 |
| 621 | 71 | 71 ✓ | ✓ |  | 2 |
| 640 | 82 | 82 ✓ | ✓ |  | 2 |
| 621 | 190 | 190 ✓ | ✓ |  | 2 |
| 621 | 33,3 | 33,3 ✓ | ✓ |  | 2 |
| 714 | 1000 | 1000 ✓ | ✓ |  | 2 |
| 696 | 132 | 132 ✓ | ✓ |  | 2 |
| 714 | 71 | 71 ✓ | ✓ |  | 2 |
| 732 | 82 | 82 ✓ | ✓ |  | 2 |
| 714 | 1120 | 1120 ✓ | ✓ |  | 2 |
| 714 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 697 | 130 | 130 ✓ | ✓ |  | 2 |
| 715 | 70 | 70 ✓ | ✓ |  | 2 |
| 733 | 81 | 81 ✓ | ✓ |  | 2 |
| 715 | 860 | 860 ✓ | ✓ |  | 2 |
| 715 | 10,2 | 10,2 ✓ | ✓ |  | 2 |
| 697 | 129 | 129 ✓ | ✓ |  | 2 |
| 715 | 70 | 70 ✓ | ✓ |  | 2 |
| 733 | 80 | 80 ✓ | – | ✓ OCR legge altro; a vista: 80 · seconda conferma: la terna torna: 129 km/h = 69,7 kts = 80,2 MPH; DATI-AFM.md: VY a 1000 kg 82 / 81 / 80 / 79 MPH (a 10000 ft 80) | 3 |
| 715 | 595 | 595 ✓ | ✓ |  | 2 |
| 716 | 16,3 | 16,3 ✓ | ✓ |  | 2 |
| 697 | 127 | 127 ✓ | ✓ |  | 2 |
| 716 | 69 | 69 ✓ | ✓ |  | 2 |
| 733 | 79 | 79 ✓ | ✓ |  | 2 |
| 716 | 340 | 340 ✓ | ✓ |  | 2 |
| 716 | 24,2 | 24,2 ✓ | ✓ |  | 2 |
| 807 | 850 | 850 ✓ | ✓ |  | 2 |
| 790 | 129 | 129 ✓ | ✓ |  | 2 |
| 808 | 70 | 7O  | ✓ | ✓ OCR legge altro; a vista: 70 · seconda conferma: la terna torna: 129 km/h = 69,7 kts = 80,2 MPH (129 km/h e 80 MPH nella stessa cella); DATI-AFM.md: VY a 850 kg 80 MPH al livello del mare | 3 |
| 826 | 80 | 80 ✓ | ✓ |  | 2 |
| 807 | 1420 | 1420 ✓ | ✓ |  | 2 |
| 808 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 790 | 126 | 126 ✓ | ✓ |  | 2 |
| 809 | 68 | 68 ✓ | ✓ |  | 2 |
| 826 | 78 | 78 ✓ | ✓ |  | 2 |
| 808 | 1115 | 1115 ✓ | ✓ |  | 2 |
| 808 | 8,7 | 8,7 ✓ | ✓ |  | 2 |
| 791 | 124 | 124 ✓ | ✓ |  | 2 |
| 809 | 67 | 67 ✓ | ✓ |  | 2 |
| 827 | 77 | 77 ✓ | ✓ |  | 2 |
| 809 | 815 | 815 ✓ | ✓ |  | 2 |
| 809 | 13,2 | 13,2 ✓ | ✓ |  | 2 |
| 791 | 122 | 122 ✓ | ✓ |  | 2 |
| 810 | 66 | 66 ✓ | ✓ |  | 2 |
| 828 | 76 | 76 ✓ | ✓ |  | 2 |
| 809 | 515 | 515 ✓ | ✓ |  | 2 |
| 809 | 19,3 | 19,3 ✓ | ✓ |  | 2 |
| 882 | 1. | 1. ✓ | ✓ |  | 2 |
| 882 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 900 | 2. | 2, ✓ | ✓ |  | 2 |
| 919 | 3. | 3. ✓ | ✓ |  | 2 |
| 919 | 20 | 20 ✓ | ✓ |  | 2 |
| 919 | 5°C | 5PC ✓ | ✓ |  | 2 |
| 1009 | 5-6. | 5-6. ✓ | ✓ |  | 2 |

Confronto con i dati del progetto:

- Figura 5-6: VY a 1157 / 1000 / 850 kg = 85-84-83-82 / 82-81-80-79 / 80-78-77-76 MPH a SL, 5000, 10000, 15000 ft = DATI-AFM.md ✓; ratei al livello del mare 880 / 1120 / 1420 ft/min = DATI-AFM.md ✓; carburante a 1157 kg 4,9 / 11,7 / 20,1 L = DATI-AFM.md ✓; ogni terna km/h - kts - MPH torna (controllo in costruisci/5-11.py) ✓; temperature: atmosfera standard ✓

### Pagina 5-12 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 328 | 5-12 | 5-1)  | – | ✓ ritaglio OCR corto; a vista: Page: 5-12 · seconda conferma: numerazione della mappa (tools/afm/afm-ccaf.json: pagina 68 del PDF = 5-12) | 2 |
| 359 | 3 | 3 ✓ | – | ✓ a vista: Edition: 3 | 2 |
| 281 | 137 | 137 ✓ | ✓ |  | 2 |
| 281 | 74 | 74 ✓ | ✓ |  | 2 |
| 281 | 85 | 85 ✓ | ✓ |  | 2 |
| 378 | 12000 | 712000  | – | ✓ OCR legge 712000 (prende il filetto); a vista: 12000 · seconda conferma: sequenza dell'asse: 2000-10000 lette da Tesseract a passo 2000, 12000 sulla linea piu' alta | 2 |
| 451 | 10000 | 10000 ✓ | – | ✓ a vista: asse delle quote, 10000 | 2 |
| 524 | 8000 | 8000 ✓ | ✓ |  | 2 |
| 600 | 6000 | 6000 ✓ | ✓ |  | 2 |
| 674 | 4000 | 4000 ✓ | – | ✓ a vista: asse delle quote, 4000 | 2 |
| 751 | 2000 | 2000 ✓ | – | ✓ a vista: asse delle quote, 2000 | 2 |
| 840 | 0 | O  | ✓ | ✓ OCR legge O; a vista: 0 · seconda conferma: sequenza dell'asse: 10-20-30-40 lette da Tesseract a passo 10 | 3 |
| 840 | 10 | 10 ✓ | ✓ |  | 2 |
| 840 | 20 | 20 ✓ | ✓ |  | 2 |
| 840 | 30 | 30 ✓ | ✓ |  | 2 |
| 840 | 40 | 40 ✓ | ✓ |  | 2 |
| 944 | 5-7. | 3-7.  | ✓ | ✓ OCR legge 3-7.; a vista: Figure 5-7. · seconda conferma: indice della mappa (figure: 5-7 a pagina 5-12) e DATI-AFM.md (fig. 5-7, V best glide) | 3 |

Confronto con i dati del progetto:

- SPEED VI 137 km/h - 74 kts - 85 MPH: V best glide 85 MPH = DATI-AFM.md e index.html (AFM_SPEEDS.glide, fig. 5-7) ✓; 85 MPH = 136,8 km/h = 73,9 kt ✓
- La fascia di planata (distanza per quota) non ha valori nel progetto: non c'e' un dato indipendente con cui controllare la curva; e' ricalcata punto per punto sulla scansione (vedi metodo della figura).

