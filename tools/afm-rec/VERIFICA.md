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
| 1-1 | ricostruita | 27/27 | 0 | 8 (8 con 2+ conferme) | 0 | 3.5% | **verificata** |
| 1-2 | ricostruita | 22/22 | 0 | 10 (4 con 2+ conferme) | 0 | 1.6% | **verificata** |
| 1-3 | ricostruita | 40/40 | 0 | 45 (23 con 2+ conferme) | 0 | 8.7% | **verificata** |
| 1-4 | ricostruita | 42/42 | 0 | 36 (26 con 2+ conferme) | 0 | 5.7% | **verificata** |
| 1-5 | ricostruita | 84/84 | 0 | 71 (47 con 2+ conferme) | 0 | 2.4% | **verificata** |
| 1-6 | ricostruita | 69/69 | 0 | 3 (3 con 2+ conferme) | 0 | 4.1% | **verificata** |
| 1-7 | ricostruita | 43/43 | 0 | 14 (12 con 2+ conferme) | 0 | 4.1% | **verificata** |
| 1-8 | ricostruita | 40/40 | 0 | 7 (6 con 2+ conferme) | 0 | 6.1% | **verificata** |
| 1-9 | ricostruita | 37/37 | 0 | 8 (4 con 2+ conferme) | 0 | 5.8% | **verificata** |
| 1-10 | ricostruita | 116/116 | 0 | 7 (3 con 2+ conferme) | 0 | 1.5% | **verificata** |
| 1-11 | ricostruita | 38/38 | 0 | 2 (1 con 2+ conferme) | 0 | 5.6% | **verificata** |
| 1-12 | ricostruita | 38/38 | 0 | 2 (2 con 2+ conferme) | 0 | 7.7% | **verificata** |
| 1-13 | campione | 36/36 | 0 | 4 (4 con 2+ conferme) | 0 | 6.2% | **verificata** |
| 1-14 | ricostruita | 34/34 | 0 | 2 (2 con 2+ conferme) | 0 | 4.4% | **verificata** |
| 2-1 | campione | 49/49 | 0 | 30 (30 con 2+ conferme) | 0 | 4.6% | **verificata** |
| 2-2 | ricostruita | 47/47 | 0 | 52 (52 con 2+ conferme) | 0 | 7.1% | **verificata** |
| 2-3 | ricostruita | 43/43 | 0 | 28 (28 con 2+ conferme) | 0 | 7.9% | **verificata** |
| 2-4 | ricostruita | 44/44 | 0 | 29 (29 con 2+ conferme) | 0 | 7.3% | **verificata** |
| 2-5 | ricostruita | 29/29 | 0 | 22 (22 con 2+ conferme) | 0 | 6.3% | **verificata** |
| 2-6 | ricostruita | 57/57 | 0 | 29 (29 con 2+ conferme) | 0 | 9.1% | **verificata** |
| 2-7 | ricostruita | 20/20 | 0 | 10 (10 con 2+ conferme) | 0 | 2.8% | **verificata** |
| 2-8 | ricostruita | 17/17 | 0 | 11 (11 con 2+ conferme) | 0 | 2.5% | **verificata** |
| 3-1 | ricostruita | 33/33 | 0 | 22 (22 con 2+ conferme) | 0 | 4.2% | **verificata** |
| 3-2 | ricostruita | 39/39 | 0 | 19 (19 con 2+ conferme) | 0 | 5.0% | **verificata** |
| 3-3 | ricostruita | 34/34 | 0 | 17 (17 con 2+ conferme) | 0 | 5.2% | **verificata** |
| 3-4 | ricostruita | 36/36 | 0 | 14 (14 con 2+ conferme) | 0 | 5.1% | **verificata** |
| 3-5 | ricostruita | 39/39 | 0 | 42 (42 con 2+ conferme) | 0 | 5.6% | **verificata** |
| 3-6 | ricostruita | 39/39 | 0 | 23 (23 con 2+ conferme) | 0 | 5.8% | **verificata** |
| 3-7 | ricostruita | 39/39 | 0 | 26 (26 con 2+ conferme) | 0 | 10.8% | **verificata** |
| 3-8 | ricostruita | 39/39 | 0 | 3 (3 con 2+ conferme) | 0 | 4.6% | **verificata** |
| 3-9 | ricostruita | 27/27 | 0 | 2 (2 con 2+ conferme) | 0 | 4.5% | **verificata** |
| 4-1 | ricostruita | 33/33 | 0 | 23 (23 con 2+ conferme) | 0 | 3.4% | **verificata** |
| 4-2 | ricostruita | 25/25 | 0 | 3 (3 con 2+ conferme) | 0 | 2.7% | **verificata** |
| 4-3 | ricostruita | 48/48 | 0 | 12 (7 con 2+ conferme) | 0 | 4.2% | **verificata** |
| 4-4 | ricostruita | 37/37 | 0 | 47 (46 con 2+ conferme) | 0 | 5.4% | **verificata** |
| 4-5 | ricostruita | 33/33 | 0 | 47 (45 con 2+ conferme) | 0 | 4.4% | **verificata** |
| 4-6 | ricostruita | 28/28 | 0 | 36 (36 con 2+ conferme) | 0 | 4.8% | **verificata** |
| 4-7 | ricostruita | 38/38 | 0 | 10 (10 con 2+ conferme) | 0 | 3.7% | **verificata** |
| 4-8 | ricostruita | 28/28 | 0 | 3 (3 con 2+ conferme) | 0 | 7.9% | **verificata** |
| 4-9 | ricostruita | 37/37 | 0 | 8 (8 con 2+ conferme) | 0 | 4.4% | **verificata** |
| 4-10 | ricostruita | 39/39 | 0 | 16 (12 con 2+ conferme) | 0 | 4.7% | **verificata** |
| 4-11 | ricostruita | 33/33 | 0 | 31 (31 con 2+ conferme) | 0 | 3.9% | **verificata** |
| 4-12 | ricostruita | 55/55 | 0 | 31 (31 con 2+ conferme) | 0 | 5.0% | **verificata** |
| 4-13 | ricostruita | 36/36 | 0 | 12 (10 con 2+ conferme) | 0 | 4.9% | **verificata** |
| 4-14 | ricostruita | 34/34 | 0 | 6 (4 con 2+ conferme) | 0 | 7.0% | **verificata** |
| 4-15 | ricostruita | 39/39 | 0 | 19 (17 con 2+ conferme) | 0 | 5.1% | **verificata** |
| 4-16 | ricostruita | 12/12 | 0 | 2 (2 con 2+ conferme) | 0 | 5.7% | **verificata** |
| 5-12 | campione | 26/26 | 0 | 17 (17 con 2+ conferme) | 0 | 6.4% | **verificata** |

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

