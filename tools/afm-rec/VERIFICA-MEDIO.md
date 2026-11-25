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

