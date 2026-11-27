# VERIFICA — Flight Manual I-CCAB, anteprima ricostruita

> Generato da `tools/afm-rec/verifica.mjs afm-ccab` il 2026-11-27. L'anteprima ricostruita **non fa fede**: fa fede il Flight Manual originale (data/afm/).

## Come si verifica una pagina

1. **Righe.** Per ogni riga (e ogni colonna di una riga) si misura dove comincia e dove finisce l'inchiostro, nell'originale e nella ricostruita, alla stessa scala. Coincide se entrambi gli estremi stanno entro 4 px della scansione retina (circa un terzo di millimetro sulla pagina stampata) e la sua linea di base (l'ultima riga dove l'inchiostro e' almeno un quarto del massimo) entro 3 px.
2. **Macchie.** Inchiostro che c'e' solo nell'originale o solo nella ricostruita, tolti gli aloni di un pixel dovuti al disegno diverso delle lettere: ogni macchia di almeno 25 px e' contenuto mancante o in piu'.
3. **Numeri.** Ogni parola con cifre si ritaglia dall'originale e la legge Tesseract da sola; la seconda lettura e' lo strato di testo del PDF (per I-CCAF l'OCR di Acrobat, indipendente). Dove le letture automatiche sbagliano decide il controllo a vista, annotato in `tools/afm-rec/afm-ccab/controlli.json`. Nelle sezioni 2, 3, 5 e 6 (limitazioni, emergenze, prestazioni, centraggio) ogni numero deve avere **due conferme** indipendenti.
4. **Dati del progetto.** Dove il progetto ha gia' i valori verificati (DATI-AFM.md, tabelle di index.html) si confrontano con la pagina.

3. **Parole.** La spaziatura che porta ogni parola alla larghezza misurata sta fra -0,3 e 0,5 em: fuori, le lettere si sovrappongono o si sparpagliano (la misura ha preso un pezzo della parola, o anche altro). E nessuna parola copre per piu' di un terzo una parola di un'altra riga.

Una pagina e' **verificata** solo con zero differenze aperte (righe fuori posto + macchie + parole strozzate o sfilacciate + numeri non confermati).

"Inchiostro non coincidente" e' solo un'indicazione: misura anche la differenza di disegno fra il font libero e quello originale, e la scansione piu' scura della stampa.

## Pagine

| Pagina | Stato | Righe coincidenti | Macchie | Numeri (conferme) | Differenze aperte | Inchiostro non coincidente | Esito |
|---|---|---|---|---|---|---|---|
| 1-1 | ricostruita | 26/26 | 1 | 7 (6 con 2+ conferme) | 1 | 11.0% | **da rivedere** |
| 3-1 | ricostruita | 33/33 | 3 | 22 (19 con 2+ conferme) | 8 | 12.5% | **da rivedere** |
| 3-2 | ricostruita | 39/39 | 0 | 19 (16 con 2+ conferme) | 5 | 16.3% | **da rivedere** |
| 3-3 | ricostruita | 34/34 | 1 | 17 (15 con 2+ conferme) | 5 | 14.5% | **da rivedere** |
| 3-4 | ricostruita | 36/36 | 0 | 14 (12 con 2+ conferme) | 3 | 10.7% | **da rivedere** |
| 3-5 | ricostruita | 39/39 | 0 | 42 (41 con 2+ conferme) | 1 | 13.1% | **da rivedere** |
| 3-6 | ricostruita | 39/39 | 0 | 23 (19 con 2+ conferme) | 7 | 11.8% | **da rivedere** |
| 3-7 | ricostruita | 39/40 | 1 | 26 (23 con 2+ conferme) | 7 | 15.1% | **da rivedere** |
| 3-8 | ricostruita | 39/39 | 0 | 3 (2 con 2+ conferme) | 1 | 11.0% | **da rivedere** |
| 3-9 | ricostruita | 27/27 | 0 | 2 (1 con 2+ conferme) | 1 | 14.3% | **da rivedere** |
| 4-1 | ricostruita | 33/33 | 0 | 23 (17 con 2+ conferme) | 6 | 10.9% | **da rivedere** |
| 4-2 | ricostruita | 25/25 | 2 | 3 (2 con 2+ conferme) | 3 | 11.0% | **da rivedere** |
| 4-3 | ricostruita | 44/48 | 3 | 12 (9 con 2+ conferme) | 10 | 10.9% | **da rivedere** |
| 4-4 | ricostruita | 37/37 | 3 | 46 (37 con 2+ conferme) | 11 | 14.0% | **da rivedere** |
| 4-5 | ricostruita | 33/33 | 0 | 47 (39 con 2+ conferme) | 7 | 12.9% | **da rivedere** |
| 4-6 | ricostruita | 28/28 | 0 | 36 (32 con 2+ conferme) | 4 | 13.3% | **da rivedere** |
| 4-7 | ricostruita | 38/38 | 0 | 10 (8 con 2+ conferme) | 2 | 12.7% | **da rivedere** |
| 4-8 | ricostruita | 26/28 | 10 | 3 (3 con 2+ conferme) | 12 | 11.1% | **da rivedere** |
| 4-9 | ricostruita | 35/36 | 0 | 7 (5 con 2+ conferme) | 2 | 20.0% | **da rivedere** |
| 4-10 | ricostruita | 39/39 | 0 | 16 (9 con 2+ conferme) | 6 | 12.4% | **da rivedere** |
| 4-11 | ricostruita | 34/34 | 0 | 27 (18 con 2+ conferme) | 4 | 12.0% | **da rivedere** |
| 4-12 | ricostruita | 52/57 | 3 | 35 (32 con 2+ conferme) | 15 | 11.9% | **da rivedere** |
| 4-13 | ricostruita | 34/34 | 0 | 9 (6 con 2+ conferme) | 2 | 20.5% | **da rivedere** |
| 4-14 | ricostruita | 38/38 | 0 | 18 (15 con 2+ conferme) | 3 | 14.5% | **da rivedere** |
| 4-15 | ricostruita | 23/25 | 8 | 5 (5 con 2+ conferme) | 10 | 20.1% | **da rivedere** |
| 5-1 | ricostruita | 17/17 | 5 | 2 (0 con 2+ conferme) | 8 | 15.5% | **da rivedere** |
| 5-2 | ricostruita | 316/321 | 0 | 279 (249 con 2+ conferme) | 65 | 7.7% | **da rivedere** |
| 5-3 | ricostruita | 309/310 | 0 | 268 (252 con 2+ conferme) | 33 | 6.5% | **da rivedere** |
| 5-4 | ricostruita | 283/288 | 0 | 246 (223 con 2+ conferme) | 51 | 6.7% | **da rivedere** |
| 5-5 | ricostruita | 270/277 | 4 | 235 (210 con 2+ conferme) | 60 | 8.8% | **da rivedere** |
| 5-6 | ricostruita | 174/178 | 0 | 136 (124 con 2+ conferme) | 27 | 7.1% | **da rivedere** |
| 5-7 | ricostruita | 128/129 | 1 | 97 (78 con 2+ conferme) | 26 | 6.8% | **da rivedere** |
| 5-8 | ricostruita | 56/57 | 16 | 46 (35 con 2+ conferme) | 32 | 17.1% | **da rivedere** |
| 5-9 | ricostruita | 163/164 | 2 | 124 (109 con 2+ conferme) | 27 | 9.5% | **da rivedere** |
| 5-10 | ricostruita | 71/72 | 2 | 33 (29 con 2+ conferme) | 10 | 9.4% | **da rivedere** |
| 5-11 | ricostruita | 112/115 | 0 | 79 (58 con 2+ conferme) | 33 | 9.3% | **da rivedere** |
| 5-12 | ricostruita | 24/26 | 1 | 17 (13 con 2+ conferme) | 10 | 6.5% | **da rivedere** |
| 6-1 | ricostruita | 33/33 | 3 | 14 (12 con 2+ conferme) | 7 | 13.5% | **da rivedere** |
| 6-2 | ricostruita | 40/40 | 10 | 18 (14 con 2+ conferme) | 18 | 15.0% | **da rivedere** |
| 6-3 | ricostruita | 33/33 | 0 | 9 (8 con 2+ conferme) | 1 | 13.3% | **da rivedere** |
| 6-4 | ricostruita | 34/34 | 6 | 8 (7 con 2+ conferme) | 7 | 16.5% | **da rivedere** |
| 6-5 | ricostruita | 39/40 | 11 | 5 (2 con 2+ conferme) | 18 | 14.9% | **da rivedere** |
| 6-6 | ricostruita | 38/38 | 0 | 2 (1 con 2+ conferme) | 2 | 11.8% | **da rivedere** |
| 6-7 | ricostruita | 36/36 | 0 | 14 (13 con 2+ conferme) | 2 | 9.3% | **da rivedere** |
| 6-8 | ricostruita | 77/79 | 0 | 3 (1 con 2+ conferme) | 5 | 9.5% | **da rivedere** |
| 6-9 | ricostruita | 21/21 | 0 | 7 (5 con 2+ conferme) | 3 | 14.9% | **da rivedere** |
| 6-10 | ricostruita | 36/36 | 17 | 3 (2 con 2+ conferme) | 18 | 23.6% | **da rivedere** |
| 6-11 | ricostruita | 22/22 | 0 | 4 (1 con 2+ conferme) | 6 | 13.8% | **da rivedere** |
| 6-12 | ricostruita | 45/45 | 24 | 11 (8 con 2+ conferme) | 30 | 23.8% | **da rivedere** |
| 6-13 | ricostruita | 31/31 | 2 | 4 (3 con 2+ conferme) | 4 | 13.1% | **da rivedere** |
| 6-14 | ricostruita | 31/31 | 6 | 10 (9 con 2+ conferme) | 7 | 25.1% | **da rivedere** |
| 6-15 | ricostruita | 25/25 | 0 | 5 (4 con 2+ conferme) | 2 | 14.3% | **da rivedere** |
| 6-16 | ricostruita | 9/9 | 8 | 2 (1 con 2+ conferme) | 9 | 30.4% | **da rivedere** |
| 6-17 | ricostruita | 42/50 | 0 | 28 (25 con 2+ conferme) | 15 | 13.2% | **da rivedere** |
| 6-18 | ricostruita | 50/57 | 17 | 49 (45 con 2+ conferme) | 31 | 29.3% | **da rivedere** |
| 6-19 | ricostruita | 0/1 | 11 | 0 (0 con 2+ conferme) | 12 | 19.3% | **da rivedere** |
| 6-20 | ricostruita | 48/64 | 5 | 52 (44 con 2+ conferme) | 36 | 6.6% | **da rivedere** |

## Figure: metodo

- **Grafica della sezione (barre e frecce)** (pagina 5-1): ridisegnata in SVG: rettangolo e poligoni misurati sulla scansione (le barre sono un poco inclinate come stampate).
- **Figura 5-1 (Cruise performance), foglio 1 di 5** (pagina 5-2): tabella ricostruita sulla scansione di I-CCAB: filetti SVG misurati ai due capi (la scansione e' storta di circa mezzo grado); scritte e numeri in testo vero, ogni cella sulla sua linea di base; i numeri sono quelli di I-CCAF (controllati con Tesseract su questa scansione e con l'aritmetica della riga: km/h, kts e MPH; galloni e litri; autonomia; km e miglia nautiche) (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 2 di 5** (pagina 5-3): tabella ricostruita sulla scansione di I-CCAB: filetti SVG misurati ai due capi (la scansione e' storta di circa mezzo grado); scritte e numeri in testo vero, ogni cella sulla sua linea di base; i numeri sono quelli di I-CCAF (controllati con Tesseract su questa scansione e con l'aritmetica della riga: km/h, kts e MPH; galloni e litri; autonomia; km e miglia nautiche) (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 3 di 5** (pagina 5-4): tabella ricostruita sulla scansione di I-CCAB: filetti SVG misurati ai due capi (la scansione e' storta di circa mezzo grado); scritte e numeri in testo vero, ogni cella sulla sua linea di base; i numeri sono quelli di I-CCAF (controllati con Tesseract su questa scansione e con l'aritmetica della riga: km/h, kts e MPH; galloni e litri; autonomia; km e miglia nautiche) (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 4 di 5** (pagina 5-5): tabella ricostruita sulla scansione di I-CCAB: filetti SVG misurati ai due capi (la scansione e' storta di circa mezzo grado); scritte e numeri in testo vero, ogni cella sulla sua linea di base; i numeri sono quelli di I-CCAF (controllati con Tesseract su questa scansione e con l'aritmetica della riga: km/h, kts e MPH; galloni e litri; autonomia; km e miglia nautiche) (costruisci/crociera.py).
- **Figura 5-1 (Cruise performance), foglio 5 di 5** (pagina 5-6): tabella ricostruita sulla scansione di I-CCAB: filetti SVG misurati ai due capi (la scansione e' storta di circa mezzo grado); scritte e numeri in testo vero, ogni cella sulla sua linea di base; i numeri sono quelli di I-CCAF (controllati con Tesseract su questa scansione e con l'aritmetica della riga: km/h, kts e MPH; galloni e litri; autonomia; km e miglia nautiche) (costruisci/crociera.py).
- **Figura 5-2 (Airspeed correction table)** (pagina 5-7): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista; ogni coppia km/h e MPH controllata: km/h = MPH x 1,609), agganciato all'inchiostro cella per cella (costruisci/5-7.py).
- **Figura 5-3 (Stall speeds)** (pagina 5-8): tabella ricostruita: filetti SVG misurati (spessore compreso, doppi dove sono doppi) e testo vero nelle celle, misurato cella per cella.
- **Figura 5-4 (Take-off distance)** (pagina 5-9): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-9.py).
- **Figura 5-5 (Landing distance)** (pagina 5-10): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-10.py).
- **Figura 5-6 (Maximum rate-of-climb data)** (pagina 5-11): tabella a griglia ricostruita: filetti misurati ai due capi, testo vero nelle celle (letto a vista, ogni terna km/h, kts, MPH controllata; agganciato all'inchiostro riga per riga dentro ogni cella; costruisci/5-11.py).
- **Figura 5-7 (Maximum glide)** (pagina 5-12): cornice, griglia, fascia di planata a punti e aeroplano: disegno al tratto vettorializzato con potrace dalla scansione di I-CCAB (tratto.py, finestra 368 250 1899 1345); scritte: testo vero, le righe della 5-12 di I-CCAF portate sulla scansione di I-CCAB e riagganciate all'inchiostro (gemella.py, testo.py).
- **Figura 6-1 (Fuel system schematic with optional auxiliary fuel system)** (pagina 6-8): lo stesso disegno della 6-8 di I-CCAF: cornice e riquadro del codice, filetti misurati sulla scansione di I-CCAB; schema: tratto vettorializzato con potrace, con le campiture a retino come campitura grigia piena (tratto.py --retino); scritte: testo vero, quelle lette a vista per I-CCAF portate sulla scansione di I-CCAB, linea di base e corpo dall'inchiostro (afm-ccab/costruisci/6-8.py).
- **Figura 6-3 (Loading arrangements)** (pagina 6-17): cornice e riquadro del titolo: filetti misurati (filetti.py --girata); sedili, linee delle stazioni e sottolineature: tratto vettorializzato con potrace dalla scansione ingrandita 6 volte (tratto.py); scritte: testo vero, ruolo figtitolo (costruisci/6-17.py).
- **Figura 6-4 (Sample loading problem)** (pagina 6-18): filetti della tabella misurati (filetti.py --girata); puntini guida: tratto con potrace (tratto.py); testo vero, ruolo figtitolo; numeri confermati dalla somma (peso e momento totali) (costruisci/6-18.py).
- **Figura 6-5 (Loading graph)** (pagina 6-19): cornice: filetti misurati; griglia, rette di carico con le loro scritte inclinate, scale e riquadro del titolo: tratto vettorializzato con potrace (tratto.py); numeri delle scale, titoli e note: testo vero (costruisci/6-19.py).
- **Figura 6-6 (Center of gravity moment envelope)** (pagina 6-20): cornice: filetti misurati; griglia, inviluppi, scale e riquadro del titolo, con la scritta inclinata UTILITY CATEGORY: tratto vettorializzato con potrace (tratto.py); numeri delle scale e titoli: testo vero (costruisci/6-20.py).

## Differenze aperte

| Pagina | Riga (y) | Cosa | Valore originale | Valore ricostruito |
|---|---|---|---|---|
| 1-1 | 568 | macchia solo ricostruita, 26 px | riquadro 1186, 568, 1193, 572 | |
| 3-1 | 678 | macchia solo originale, 34 px | riquadro 1221, 678, 1231, 681 | |
| 3-1 | 1328 | macchia solo originale, 30 px | riquadro 478, 1328, 479, 1342 | |
| 3-1 | 1934 | macchia solo ricostruita, 40 px | riquadro 354, 1934, 357, 1954 | |
| 3-1 | 1563 | numero | (3) | (5) |
| 3-1 | 1956 | numero | 37 | 137 |
| 3-1 | 500 | numero con una sola conferma | 2 | 2 |
| 3-2 | 622 | numero | (3) | (5) |
| 3-2 | 1092 | numero | (3) | (5) |
| 3-2 | 515 | numero con una sola conferma | 2 | 2 |
| 3-3 | 833 | macchia solo originale, 31 px | riquadro 712, 833, 714, 847 | |
| 3-3 | 490 | numero | z | 2 |
| 3-3 | 1070 | numero | (3) | (8) |
| 3-4 | 1783 | numero | Al | 121 |
| 3-4 | 519 | numero con una sola conferma | 2 | 2 |
| 3-5 | 493 | numero con una sola conferma | 2 | 2 |
| 3-6 | 918 | numero | 409 | 40° |
| 3-6 | 955 | numero | Lis | 113 |
| 3-6 | 1138 | numero | (3) | (5) |
| 3-6 | 516 | numero con una sola conferma | 2 | 2 |
| 3-7 | 1606 | riga "flight." | inizio 10 px, fine 0 px, linea di base 3 px | |
| 3-7 | 1584 | macchia solo originale, 45 px | riquadro 315, 1584, 320, 1601 | |
| 3-7 | 910 | numero | (E2) | (12) |
| 3-7 | 1423 | numero | (3) | (5) |
| 3-7 | 512 | numero con una sola conferma | 2 | 2 |
| 3-8 | 518 | numero con una sola conferma | 2 | 2 |
| 3-9 | 496 | numero con una sola conferma | 2 | 2 |
| 4-1 | 465 | numero | 4- | 4-1 |
| 4-1 | 1011 | numero | 4-, | 4-1. |
| 4-1 | 1341 | numero | (3) | (5) |
| 4-1 | 1595 | numero | l | 1 |
| 4-1 | 1595 | numero | (2,9 | (2,5 |
| 4-1 | 1667 | numero | (3) | (5) |
| 4-2 | 1089 | macchia solo originale, 26 px | riquadro 516, 1089, 516, 1114 | |
| 4-2 | 1091 | macchia solo originale, 27 px | riquadro 497, 1091, 500, 1100 | |
| 4-2 | 1817 | numero | L | 1 |
| 4-3 | 493 | riga "Edition: 2" | inizio 0 px, fine 0 px, linea di base 4 px | |
| 4-3 | 1184 | riga "5" | inizio 12 px, fine 0 px, linea di base -1 px | |
| 4-3 | 1831 | riga "7" | inizio 0 px, fine 0 px, linea di base 16 px | |
| 4-3 | 2079 | riga "4-1." | inizio 10 px, fine 0 px, linea di base 0 px | |
| 4-3 | 1162 | macchia solo originale, 49 px | riquadro 306, 1162, 312, 1171 | |
| 4-3 | 2018 | macchia solo originale, 111 px | riquadro 301, 2018, 309, 2040 | |
| 4-3 | 2059 | macchia solo originale, 28 px | riquadro 256, 2059, 260, 2067 | |
| 4-3 | 493 | numero | . | 2 |
| 4-3 | 2043 | numero | B | 8 |
| 4-3 | 2079 | numero | 1-1. | 4-1. |
| 4-4 | 1796 | macchia solo ricostruita, 35 px | riquadro 545, 1796, 551, 1806 | |
| 4-4 | 1796 | macchia solo ricostruita, 28 px | riquadro 643, 1796, 647, 1809 | |
| 4-4 | 1797 | macchia solo ricostruita, 25 px | riquadro 662, 1797, 665, 1806 | |
| 4-4 | 510 | numero | ps | 2 |
| 4-4 | 616 | numero | he: | 15 |
| 4-4 | 1126 | numero | (3) | (5) |
| 4-4 | 1672 | numero | ee | 0° |
| 4-4 | 1777 | numero | G7 | 97 |
| 4-4 | 1811 | numero | J | 137 |
| 4-4 | 1811 | numero | to | 153 |
| 4-4 | 1989 | numero | () | (1) |
| 4-5 | 491 | numero | Zz | 2 |
| 4-5 | 676 | numero | 13 | 113 |
| 4-5 | 785 | numero | (3) | (8) |
| 4-5 | 1039 | numero | LiT | 177 |
| 4-5 | 1075 | numero | Zo | 25 |
| 4-5 | 1587 | numero | 754 | 75% |
| 4-6 | 758 | numero | i29 | 129 |
| 4-6 | 758 | numero | 30 | 80 |
| 4-6 | 976 | numero | 202. | 20°. |
| 4-6 | 1810 | numero | (3) | (5) |
| 4-7 | 1070 | numero | Z | 2 |
| 4-7 | 1070 | numero | 13.0 | 15,5 |
| 4-8 | 479 | riga "Page: 4-8" | inizio 0 px, fine 0 px, linea di base -4 px | |
| 4-8 | 663 | riga "TAXIING DIAGRAM" | inizio 12 px, fine -2 px, linea di base 1 px | |
| 4-8 | 627 | macchia solo originale, 35 px | riquadro 571, 627, 580, 631 | |
| 4-8 | 635 | macchia solo originale, 93 px | riquadro 584, 635, 588, 660 | |
| 4-8 | 641 | macchia solo originale, 37 px | riquadro 607, 641, 616, 660 | |
| 4-8 | 586 | macchia solo ricostruita, 46 px | riquadro 268, 586, 268, 631 | |
| 4-8 | 627 | macchia solo ricostruita, 43 px | riquadro 605, 627, 613, 631 | |
| 4-8 | 627 | macchia solo ricostruita, 124 px | riquadro 631, 627, 645, 661 | |
| 4-8 | 632 | macchia solo ricostruita, 34 px | riquadro 694, 632, 695, 661 | |
| 4-8 | 632 | macchia solo ricostruita, 30 px | riquadro 711, 632, 711, 661 | |
| 4-8 | 634 | macchia solo ricostruita, 168 px | riquadro 596, 634, 601, 661 | |
| 4-8 | 654 | macchia solo ricostruita, 38 px | riquadro 616, 654, 629, 661 | |
| 4-9 | 1076 | riga "RPM, and return to “BOTH.” The differenc" | inizio 0 px, fine 0 px, linea di base -4 px | |
| 4-9 | 1548 | numero | 3 | 5 |
| 4-10 | 519 | numero | i | 2 |
| 4-10 | 1095 | numero | Zn | 25 |
| 4-10 | 1498 | numero | 109, | 10°, |
| 4-10 | 1571 | numero | 23 | 95 |
| 4-11 | 1263 | numero | 21 | 121 |
| 4-11 | 1263 | numero | 78 | 75 |
| 4-11 | 1734 | numero | 654 | 65% |
| 4-11 | 1734 | numero | 7594 | 75% |
| 4-12 | 769 | riga "km/h" | inizio 0 px, fine -8 px, linea di base 1 px | |
| 4-12 | 769 | riga "MPH" | inizio 6 px, fine 0 px, linea di base 2 px | |
| 4-12 | 769 | riga "km" | inizio 0 px, fine -7 px, linea di base 2 px | |
| 4-12 | 841 | riga "144" | inizio 0 px, fine -1 px, linea di base 6 px | |
| 4-12 | 913 | riga "142" | inizio 9 px, fine -1 px, linea di base 2 px | |
| 4-12 | 747 | macchia solo originale, 41 px | riquadro 1090, 747, 1103, 766 | |
| 4-12 | 892 | macchia solo originale, 27 px | riquadro 1040, 892, 1044, 909 | |
| 4-12 | 696 | macchia solo ricostruita, 29 px | riquadro 989, 696, 992, 716 | |
| 4-12 | 515 | numero | Z | 2 |
| 4-12 | 913 | numero | 42 | 142 |
| 4-12 | 1556 | numero | 9-3 | 5-3 |
| 4-12 | | parola strozzata (spaziatura -0.83 em) | | MPH |
| 4-12 | | parola strozzata (spaziatura -0.56 em) | | km |
| 4-12 | | parola strozzata (spaziatura -0.40 em) | | 142 |
| 4-13 | 919 | numero | 409, | 40°, |
| 4-13 | 1245 | numero | 207 | 20° |
| 4-14 | 834 | numero | (-200C | (-20°C |
| 4-14 | 1568 | numero | 59C | -5°C |
| 4-14 | 1605 | numero | -200C | -20°C |
| 4-15 | 464 | riga "Page: 4-15" | inizio 1 px, fine 0 px, linea di base 5 px | |
| 4-15 | 501 | riga "Edition: 2" | inizio 0 px, fine -1 px, linea di base 6 px | |
| 4-15 | 1384 | macchia solo originale, 27 px | riquadro 648, 1384, 661, 1394 | |
| 4-15 | 1394 | macchia solo originale, 35 px | riquadro 380, 1394, 382, 1408 | |
| 4-15 | 1389 | macchia solo ricostruita, 43 px | riquadro 390, 1389, 392, 1409 | |
| 4-15 | 1389 | macchia solo ricostruita, 75 px | riquadro 415, 1389, 419, 1409 | |
| 4-15 | 1389 | macchia solo ricostruita, 40 px | riquadro 438, 1389, 439, 1409 | |
| 4-15 | 1389 | macchia solo ricostruita, 76 px | riquadro 580, 1389, 588, 1409 | |
| 4-15 | 1389 | macchia solo ricostruita, 43 px | riquadro 641, 1389, 643, 1409 | |
| 4-15 | 1392 | macchia solo ricostruita, 36 px | riquadro 374, 1392, 375, 1409 | |
| 5-1 | 556 | macchia solo originale, 36 px | riquadro 1280, 556, 1287, 561 | |
| 5-1 | 556 | macchia solo originale, 29 px | riquadro 1307, 556, 1313, 561 | |
| 5-1 | 577 | macchia solo ricostruita, 98 px | riquadro 1189, 577, 1215, 604 | |
| 5-1 | 584 | macchia solo ricostruita, 121 px | riquadro 1287, 584, 1303, 604 | |
| 5-1 | 601 | macchia solo ricostruita, 41 px | riquadro 1141, 601, 1166, 605 | |
| 5-1 | 450 | numero | 5- | 5-1 |
| 5-1 | 485 | numero con una sola conferma | 2 | 2 |
| 5-2 | 577 | riga "in Hg" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-2 | 715 | riga "4,8" | inizio 0 px, fine -1 px, linea di base -4 px | |
| 5-2 | 818 | riga "131" | inizio 0 px, fine -1 px, linea di base -4 px | |
| 5-2 | 907 | riga "4,7" | inizio 0 px, fine 0 px, linea di base 5 px | |
| 5-2 | 1227 | riga "7,1" | inizio 0 px, fine -1 px, linea di base -4 px | |
| 5-2 | 472 | numero | 3-2 | 5-2 |
| 5-2 | 1401 | numero | 5- | 5-1 |
| 5-2 | 1401 | numero | j | 1 |
| 5-2 | 407 | numero | 115) | 1157 |
| 5-2 | 628 | numero | (niente) | 24 |
| 5-2 | 631 | numero | 71 | 77 |
| 5-2 | 632 | numero | 423 | 123 |
| 5-2 | 635 | numero | 443 | 44,3 |
| 5-2 | 664 | numero | 42 | 4,2 |
| 5-2 | 715 | numero | (niente) | 21 |
| 5-2 | 710 | numero | LUE: | 113 |
| 5-2 | 711 | numero | 95 | 9,5 |
| 5-2 | 715 | numero | 48 | 4,8 |
| 5-2 | 771 | numero | 41 | 4,1 |
| 5-2 | 797 | numero | 44 | 4,4 |
| 5-2 | 821 | numero | 98 | 9,8 |
| 5-2 | 824 | numero | 47 | 4,7 |
| 5-2 | 854 | numero | 41 | 4,1 |
| 5-2 | 900 | numero | ZAZ | 212 |
| 5-2 | 901 | numero | TTS | 115 |
| 5-2 | 924 | numero | 2 | 22 |
| 5-2 | 926 | numero | 141 | 111 |
| 5-2 | 929 | numero | 92 | 9,2 |
| 5-2 | 964 | numero | 4A | 4,4 |
| 5-2 | 968 | numero | 527 | 521 |
| 5-2 | 990 | numero | 4,/ | 4,7 |
| 5-2 | 1039 | numero | 86 | 8,6 |
| 5-2 | 1042 | numero | (niente) | 5,3 |
| 5-2 | 1125 | numero | 54 | 5,4 |
| 5-2 | 1248 | numero | B2 | 82 |
| 5-3 | 542 | riga "144" | inizio 0 px, fine 0 px, linea di base 6 px | |
| 5-3 | 447 | numero | S-3 | 5-3 |
| 5-3 | 619 | numero | 93 | 9,3 |
| 5-3 | 619 | numero | 49 | 4,9 |
| 5-3 | 649 | numero | 416 | 41,6 |
| 5-3 | 649 | numero | 42 | 4,2 |
| 5-3 | 701 | numero | ZN | 21 |
| 5-3 | 702 | numero | 48 | 4,8 |
| 5-3 | 727 | numero | 38 | 58 |
| 5-3 | 736 | numero | (niente) | 111 |
| 5-3 | 757 | numero | ref | 23 |
| 5-3 | 784 | numero | 48 | 4,8 |
| 5-3 | 836 | numero | 55 | 5,5 |
| 5-3 | 867 | numero | 48 | 4,8 |
| 5-3 | 944 | numero | 79 | 7,9 |
| 5-3 | 976 | numero | (niente) | 23 |
| 5-3 | 1107 | numero | 42 | 7,2 |
| 5-4 | 595 | riga "in Hg" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-4 | 716 | riga "31,8" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 5-4 | 934 | riga "28,8" | inizio 0 px, fine -1 px, linea di base 6 px | |
| 5-4 | 1046 | riga "112" | inizio 0 px, fine 0 px, linea di base 4 px | |
| 5-4 | 1043 | riga "26,9" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-4 | 480 | numero | 54 | 5-4 |
| 5-4 | 504 | numero | AG | 46 |
| 5-4 | 1296 | numero | J | 1 |
| 5-4 | 637 | numero | 4A | 4,4 |
| 5-4 | 694 | numero | 175 | 115 |
| 5-4 | 688 | numero | a | 5,1 |
| 5-4 | 722 | numero | 95 | 55 |
| 5-4 | 860 | numero | (niente) | 62 |
| 5-4 | 860 | numero | 27 | 217 |
| 5-4 | 858 | numero | 17 | 117 |
| 5-4 | 854 | numero | (niente) | 4,9 |
| 5-4 | 880 | numero | Be | 5,2 |
| 5-4 | 1018 | numero | 77 | 7,7 |
| 5-4 | 1041 | numero | 65 | 6,5 |
| 5-4 | 1080 | numero | 71 | 711 |
| 5-4 | 1079 | numero | Fs | 21 |
| 5-4 | 1074 | numero | 83 | 8,3 |
| 5-4 | 1099 | numero | ay | 5,9 |
| 5-4 | 1128 | numero | 39 | 99 |
| 5-4 | 1126 | numero | 4 | 7,2 |
| 5-4 | 1126 | numero | 273 | 27,3 |
| 5-4 | 1182 | numero | 7 | 17 |
| 5-4 | 1175 | numero | 7A | 7,4 |
| 5-5 | 506 | riga "Reims, Marne France" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-5 | 345 | riga "kg" | inizio 0 px, fine 0 px, linea di base 9 px | |
| 5-5 | 1229 | riga "shown for an airplane" | inizio 0 px, fine 0 px, linea di base -8 px | |
| 5-5 | 773 | riga "1118" | inizio -13 px, fine 1 px, linea di base 0 px | |
| 5-5 | 832 | riga "7,4" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-5 | 882 | riga "617" | inizio -1 px, fine 10 px, linea di base 0 px | |
| 5-5 | 964 | riga "7,2" | inizio 0 px, fine 0 px, linea di base 9 px | |
| 5-5 | 570 | macchia solo originale, 223 px | riquadro 493, 570, 496, 695 | |
| 5-5 | 703 | macchia solo originale, 98 px | riquadro 495, 703, 497, 765 | |
| 5-5 | 767 | macchia solo originale, 34 px | riquadro 496, 767, 497, 793 | |
| 5-5 | 814 | macchia solo originale, 61 px | riquadro 497, 814, 499, 848 | |
| 5-5 | 454 | numero | 3-5 | 5-5 |
| 5-5 | 564 | numero | 96 | 9,6 |
| 5-5 | 559 | numero | 48 | 4,8 |
| 5-5 | 556 | numero | 4070 | 1070 |
| 5-5 | 650 | numero | AL | 542 |
| 5-5 | 641 | numero | 15 | 7,5 |
| 5-5 | 637 | numero | G2 | 6,2 |
| 5-5 | 724 | numero | 78 | 7,8 |
| 5-5 | 759 | numero | 342 | 542 |
| 5-5 | 756 | numero | AG | 46 |
| 5-5 | 751 | numero | 4 | 114 |
| 5-5 | 750 | numero | 7A | 7,1 |
| 5-5 | 746 | numero | 6A | 6,4 |
| 5-5 | 778 | numero | 326 | 32,6 |
| 5-5 | 776 | numero | 53 | 5,3 |
| 5-5 | 836 | numero | 4/ | 47 |
| 5-5 | 832 | numero | 7A | 7,4 |
| 5-5 | 854 | numero | 68 | 6,8 |
| 5-5 | 886 | numero | 5,2 | 5,7 |
| 5-5 | 915 | numero | 75 | 7,5 |
| 5-5 | 968 | numero | 64 | 6,4 |
| 5-5 | 964 | numero | 12 | 7,2 |
| 5-5 | 1046 | numero | 70 | 7,0 |
| 5-5 | 1072 | numero | 78 | 7,6 |
| 5-5 | 490 | numero con una sola conferma | 2 | 2 |
| 5-6 | 1403 | riga "5)." | inizio 13 px, fine -1 px, linea di base 0 px | |
| 5-6 | 660 | riga "14" | inizio 0 px, fine 0 px, linea di base 4 px | |
| 5-6 | 795 | riga "440" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 5-6 | 880 | riga "7,4" | inizio -1 px, fine 0 px, linea di base 4 px | |
| 5-6 | 1403 | numero | 5-) | 5-1 |
| 5-6 | 505 | numero | AG | 46 |
| 5-6 | 634 | numero | (niente) | 49 |
| 5-6 | 660 | numero | A74 | 474 |
| 5-6 | 740 | numero | 4/ | 47 |
| 5-6 | 745 | numero | 13 | 7,3 |
| 5-6 | 795 | numero | B5 | 85 |
| 5-6 | 853 | numero | S,9 | 6,9 |
| 5-6 | 879 | numero | b2 | 6,3 |
| 5-6 | 958 | numero | (niente) | 2300 |
| 5-6 | 1073 | numero | 75 | 7,5 |
| 5-6 | 507 | numero con una sola conferma | 2 | 2 |
| 5-7 | 1308 | riga "Figure 5-2." | inizio 0 px, fine -7 px, linea di base 0 px | |
| 5-7 | 1518 | macchia solo ricostruita, 26 px | riquadro 233, 1518, 252, 1520 | |
| 5-7 | 459 | numero | S-7 | 5-7 |
| 5-7 | 498 | numero | Ze | 2 |
| 5-7 | 748 | numero | 90 | 50 |
| 5-7 | 750 | numero | 79 | 70 |
| 5-7 | 1062 | numero | (niente) | 50 |
| 5-7 | 507 | numero con una sola conferma | 124 | 124 |
| 5-7 | 509 | numero con una sola conferma | 154 | 154 |
| 5-7 | 511 | numero con una sola conferma | 187 | 187 |
| 5-7 | 511 | numero con una sola conferma | 204 | 204 |
| 5-7 | 583 | numero con una sola conferma | 68 | 68 |
| 5-7 | 584 | numero con una sola conferma | 77 | 77 |
| 5-7 | 583 | numero con una sola conferma | 96 | 96 |
| 5-7 | 821 | numero con una sola conferma | 124 | 124 |
| 5-7 | 825 | numero con una sola conferma | 154 | 154 |
| 5-7 | 895 | numero con una sola conferma | 68 | 68 |
| 5-7 | 897 | numero con una sola conferma | 77 | 77 |
| 5-7 | 896 | numero con una sola conferma | 96 | 96 |
| 5-7 | 1137 | numero con una sola conferma | 164 | 164 |
| 5-7 | 1210 | numero con una sola conferma | 102 | 102 |
| 5-8 | 831 | riga "40°" | inizio 1 px, fine 0 px, linea di base 4 px | |
| 5-8 | 697 | macchia solo originale, 155 px | riquadro 298, 697, 393, 699 | |
| 5-8 | 697 | macchia solo originale, 141 px | riquadro 395, 697, 495, 699 | |
| 5-8 | 697 | macchia solo originale, 27 px | riquadro 504, 697, 524, 698 | |
| 5-8 | 697 | macchia solo originale, 121 px | riquadro 526, 697, 622, 699 | |
| 5-8 | 697 | macchia solo originale, 137 px | riquadro 624, 697, 725, 699 | |
| 5-8 | 697 | macchia solo originale, 60 px | riquadro 741, 697, 785, 699 | |
| 5-8 | 697 | macchia solo originale, 139 px | riquadro 787, 697, 894, 699 | |
| 5-8 | 697 | macchia solo originale, 64 px | riquadro 896, 697, 950, 699 | |
| 5-8 | 697 | macchia solo originale, 160 px | riquadro 959, 697, 1072, 699 | |
| 5-8 | 697 | macchia solo originale, 199 px | riquadro 1317, 697, 1409, 700 | |
| 5-8 | 698 | macchia solo originale, 26 px | riquadro 1074, 698, 1088, 699 | |
| 5-8 | 698 | macchia solo originale, 25 px | riquadro 1089, 698, 1107, 699 | |
| 5-8 | 698 | macchia solo originale, 85 px | riquadro 1131, 698, 1180, 699 | |
| 5-8 | 698 | macchia solo originale, 27 px | riquadro 1182, 698, 1198, 699 | |
| 5-8 | 698 | macchia solo originale, 191 px | riquadro 1220, 698, 1315, 700 | |
| 5-8 | 886 | macchia solo ricostruita, 29 px | riquadro 662, 886, 665, 907 | |
| 5-8 | 831 | numero | 92 | 0° |
| 5-8 | 945 | numero | of | 57 |
| 5-8 | 1062 | numero | 209 | 20° |
| 5-8 | 1100 | numero | f2 | 72 |
| 5-8 | 507 | numero con una sola conferma | 2 | 2 |
| 5-8 | 909 | numero con una sola conferma | 106 | 106 |
| 5-8 | 980 | numero con una sola conferma | 66 | 66 |
| 5-8 | 908 | numero con una sola conferma | 117 | 117 |
| 5-8 | 980 | numero con una sola conferma | 73 | 73 |
| 5-8 | 944 | numero con una sola conferma | 78 | 78 |
| 5-8 | 1138 | numero con una sola conferma | 83 | 83 |
| 5-9 | 459 | riga "Ground" | inizio 13 px, fine 0 px, linea di base 1 px | |
| 5-9 | 889 | macchia solo originale, 28 px | riquadro 249, 889, 265, 890 | |
| 5-9 | 1290 | macchia solo originale, 31 px | riquadro 325, 1290, 341, 1297 | |
| 5-9 | 234 | numero | 109 | 10° |
| 5-9 | 379 | numero | 4159C | +15°C |
| 5-9 | 379 | numero | 4109C | +10°C |
| 5-9 | 379 | numero | 459C | +5°C |
| 5-9 | 673 | numero | (niente) | 0 |
| 5-9 | 858 | numero | 5/ | 57 |
| 5-9 | 823 | numero | (niente) | 0 |
| 5-9 | 1039 | numero | D3 | 53 |
| 5-9 | 1110 | numero | 149C | 14°C |
| 5-9 | 496 | numero con una sola conferma | 2 | 2 |
| 5-9 | 673 | numero con una sola conferma | 114 | 114 |
| 5-9 | 710 | numero con una sola conferma | 62 | 62 |
| 5-9 | 745 | numero con una sola conferma | 71 | 71 |
| 5-9 | 823 | numero con una sola conferma | 106 | 106 |
| 5-9 | 895 | numero con una sola conferma | 66 | 66 |
| 5-10 | 663 | riga "kg" | inizio 0 px, fine -1 px, linea di base 7 px | |
| 5-10 | 1219 | macchia solo originale, 27 px | riquadro 964, 1219, 978, 1220 | |
| 5-10 | 1363 | macchia solo originale, 33 px | riquadro 964, 1363, 980, 1364 | |
| 5-10 | 566 | numero | 4159C | +15°C |
| 5-10 | 565 | numero | 109C | +10°C |
| 5-10 | 565 | numero | 459C | +5°C |
| 5-10 | 512 | numero con una sola conferma | 2 | 2 |
| 5-11 | 502 | riga "Reims, Marne France" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-11 | 1112 | riga "NOTES:" | inizio 0 px, fine 0 px, linea di base -5 px | |
| 5-11 | 1325 | riga "Figure 5-6." | inizio 0 px, fine -7 px, linea di base 1 px | |
| 5-11 | 429 | numero | 4159C | +15°C |
| 5-11 | 427 | numero | 459C | +5°C |
| 5-11 | 426 | numero | -59C | -5°C |
| 5-11 | 422 | numero | -159C | -15°C |
| 5-11 | 699 | numero | 1,7 | 11,7 |
| 5-11 | 997 | numero | 49 | 4,9 |
| 5-11 | 995 | numero | ITS | 1115 |
| 5-11 | 1141 | numero | Zz. | 2. |
| 5-11 | | parola sfilacciata (spaziatura 0.53 em) | | of |
| 5-11 | 489 | numero con una sola conferma | 2 | 2 |
| 5-11 | 675 | numero con una sola conferma | 153 | 153 |
| 5-11 | 732 | numero con una sola conferma | 95 | 95 |
| 5-11 | 672 | numero con una sola conferma | 146 | 146 |
| 5-11 | 729 | numero con una sola conferma | 91 | 91 |
| 5-11 | 670 | numero con una sola conferma | 140 | 140 |
| 5-11 | 729 | numero con una sola conferma | 87 | 87 |
| 5-11 | 823 | numero con una sola conferma | 148 | 148 |
| 5-11 | 880 | numero con una sola conferma | 92 | 92 |
| 5-11 | 821 | numero con una sola conferma | 142 | 142 |
| 5-11 | 878 | numero con una sola conferma | 88 | 88 |
| 5-11 | 972 | numero con una sola conferma | 142 | 142 |
| 5-11 | 1029 | numero con una sola conferma | 88 | 88 |
| 5-12 | 409 | riga "Flight Manual" | inizio 0 px, fine 0 px, linea di base 5 px | |
| 5-12 | 484 | riga "Page: 5-12" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 5-12 | 1178 | macchia solo originale, 26 px | riquadro 430, 1178, 443, 1180 | |
| 5-12 | 484 | numero | 9-12 | 5-12 |
| 5-12 | 334 | numero | ele) | 85 |
| 5-12 | 1397 | numero | S-7. | 5-7. |
| 5-12 | 518 | numero con una sola conferma | 2 | 2 |
| 6-1 | 665 | macchia solo originale, 36 px | riquadro 1149, 665, 1161, 667 | |
| 6-1 | 557 | macchia solo ricostruita, 37 px | riquadro 980, 557, 1008, 558 | |
| 6-1 | 670 | macchia solo ricostruita, 25 px | riquadro 1213, 670, 1237, 670 | |
| 6-1 | 490 | numero | ,) | 2 |
| 6-1 | 2005 | numero | 2 | 3 |
| 6-2 | 633 | macchia solo originale, 172 px | riquadro 419, 633, 535, 635 | |
| 6-2 | 633 | macchia solo originale, 63 px | riquadro 538, 633, 585, 635 | |
| 6-2 | 633 | macchia solo originale, 117 px | riquadro 594, 633, 681, 635 | |
| 6-2 | 634 | macchia solo originale, 392 px | riquadro 696, 634, 934, 636 | |
| 6-2 | 634 | macchia solo originale, 408 px | riquadro 937, 634, 1183, 638 | |
| 6-2 | 634 | macchia solo originale, 147 px | riquadro 1184, 634, 1261, 636 | |
| 6-2 | 674 | macchia solo ricostruita, 33 px | riquadro 766, 674, 798, 674 | |
| 6-2 | 674 | macchia solo ricostruita, 67 px | riquadro 831, 674, 894, 675 | |
| 6-2 | 674 | macchia solo ricostruita, 86 px | riquadro 904, 674, 989, 674 | |
| 6-2 | 674 | macchia solo ricostruita, 31 px | riquadro 1009, 674, 1039, 674 | |
| 6-2 | 842 | numero | 590 | 5°C |
| 6-2 | 842 | numero | 1OW30 | 10W30 |
| 6-2 | 842 | numero | SC. | 5°C. |
| 6-2 | 1858 | numero | Cha: | 25 |
| 6-3 | 497 | numero con una sola conferma | 2 | 2 |
| 6-4 | 609 | macchia solo originale, 360 px | riquadro 793, 609, 1029, 611 | |
| 6-4 | 610 | macchia solo originale, 46 px | riquadro 691, 610, 732, 612 | |
| 6-4 | 610 | macchia solo originale, 69 px | riquadro 736, 610, 780, 611 | |
| 6-4 | 611 | macchia solo originale, 40 px | riquadro 659, 611, 689, 612 | |
| 6-4 | 2055 | macchia solo originale, 203 px | riquadro 406, 2055, 532, 2057 | |
| 6-4 | 633 | macchia solo ricostruita, 754 px | riquadro 647, 633, 1023, 634 | |
| 6-4 | 507 | numero con una sola conferma | 2 | 2 |
| 6-5 | 969 | riga "Do not use a canvas cover on the windshi" | inizio 7 px, fine 0 px, linea di base 0 px | |
| 6-5 | 949 | macchia solo originale, 60 px | riquadro 246, 949, 250, 967 | |
| 6-5 | 949 | macchia solo originale, 73 px | riquadro 257, 949, 270, 966 | |
| 6-5 | 950 | macchia solo originale, 33 px | riquadro 329, 950, 332, 966 | |
| 6-5 | 955 | macchia solo originale, 30 px | riquadro 295, 955, 299, 966 | |
| 6-5 | 955 | macchia solo originale, 31 px | riquadro 303, 955, 306, 966 | |
| 6-5 | 955 | macchia solo originale, 27 px | riquadro 351, 955, 354, 967 | |
| 6-5 | 955 | macchia solo originale, 35 px | riquadro 357, 955, 363, 967 | |
| 6-5 | 956 | macchia solo originale, 30 px | riquadro 366, 956, 375, 967 | |
| 6-5 | 956 | macchia solo originale, 26 px | riquadro 448, 956, 451, 967 | |
| 6-5 | 1460 | macchia solo originale, 25 px | riquadro 348, 1460, 350, 1476 | |
| 6-5 | 735 | macchia solo ricostruita, 107 px | riquadro 655, 735, 665, 749 | |
| 6-5 | 500 | numero | rs | 2 |
| 6-5 | 1256 | numero | IS | 15 |
| 6-5 | 2013 | numero | SO | 50% |
| 6-6 | 510 | numero | Z | 2 |
| 6-7 | 490 | numero | ps | 2 |
| 6-8 | 464 | riga "Page: 6-8" | inizio 0 px, fine 0 px, linea di base 4 px | |
| 6-8 | 2061 | riga "Figure 6-1." | inizio 0 px, fine -5 px, linea di base -6 px | |
| 6-8 | 2061 | numero | K | 6-1. |
| 6-8 | 501 | numero con una sola conferma | 2 | 2 |
| 6-9 | 715 | numero | I | 1 |
| 6-9 | 494 | numero con una sola conferma | 2 | 2 |
| 6-10 | 575 | macchia solo originale, 919 px | riquadro 400, 575, 666, 591 | |
| 6-10 | 575 | macchia solo originale, 2141 px | riquadro 668, 575, 1268, 591 | |
| 6-10 | 684 | macchia solo originale, 3335 px | riquadro 408, 684, 1260, 688 | |
| 6-10 | 611 | macchia solo ricostruita, 251 px | riquadro 407, 611, 492, 613 | |
| 6-10 | 611 | macchia solo ricostruita, 64 px | riquadro 504, 611, 529, 613 | |
| 6-10 | 611 | macchia solo ricostruita, 54 px | riquadro 539, 611, 560, 613 | |
| 6-10 | 611 | macchia solo ricostruita, 50 px | riquadro 565, 611, 583, 613 | |
| 6-10 | 611 | macchia solo ricostruita, 244 px | riquadro 599, 611, 699, 613 | |
| 6-10 | 611 | macchia solo ricostruita, 55 px | riquadro 714, 611, 736, 613 | |
| 6-10 | 611 | macchia solo ricostruita, 50 px | riquadro 742, 611, 761, 613 | |
| 6-10 | 612 | macchia solo ricostruita, 86 px | riquadro 865, 612, 908, 613 | |
| 6-10 | 612 | macchia solo ricostruita, 36 px | riquadro 928, 612, 947, 613 | |
| 6-10 | 612 | macchia solo ricostruita, 35 px | riquadro 960, 612, 978, 613 | |
| 6-10 | 612 | macchia solo ricostruita, 41 px | riquadro 1045, 612, 1064, 615 | |
| 6-10 | 612 | macchia solo ricostruita, 26 px | riquadro 1094, 612, 1103, 618 | |
| 6-10 | 612 | macchia solo ricostruita, 192 px | riquadro 1188, 612, 1261, 614 | |
| 6-10 | 690 | macchia solo ricostruita, 2731 px | riquadro 395, 690, 1268, 704 | |
| 6-10 | 508 | numero con una sola conferma | 2 | 2 |
| 6-11 | 493 | numero | Z | 2 |
| 6-11 | 1290 | numero | . | 5 |
| 6-11 | 1290 | numero | an | 25 |
| 6-12 | 565 | macchia solo originale, 6696 px | riquadro 392, 565, 1258, 676 | |
| 6-12 | 1306 | macchia solo originale, 46 px | riquadro 279, 1306, 317, 1307 | |
| 6-12 | 1306 | macchia solo originale, 27 px | riquadro 335, 1306, 361, 1306 | |
| 6-12 | 1291 | macchia solo ricostruita, 323 px | riquadro 264, 1291, 457, 1293 | |
| 6-12 | 1359 | macchia solo ricostruita, 32 px | riquadro 609, 1359, 618, 1376 | |
| 6-12 | 1359 | macchia solo ricostruita, 37 px | riquadro 861, 1359, 862, 1379 | |
| 6-12 | 1359 | macchia solo ricostruita, 36 px | riquadro 954, 1359, 962, 1379 | |
| 6-12 | 1365 | macchia solo ricostruita, 31 px | riquadro 832, 1365, 837, 1378 | |
| 6-12 | 1587 | macchia solo ricostruita, 27 px | riquadro 835, 1587, 838, 1601 | |
| 6-12 | 1707 | macchia solo ricostruita, 29 px | riquadro 995, 1707, 998, 1720 | |
| 6-12 | 1707 | macchia solo ricostruita, 35 px | riquadro 1215, 1707, 1220, 1721 | |
| 6-12 | 1728 | macchia solo ricostruita, 31 px | riquadro 422, 1728, 427, 1739 | |
| 6-12 | 1845 | macchia solo ricostruita, 25 px | riquadro 913, 1845, 915, 1859 | |
| 6-12 | 1845 | macchia solo ricostruita, 28 px | riquadro 991, 1845, 996, 1859 | |
| 6-12 | 1845 | macchia solo ricostruita, 31 px | riquadro 1026, 1845, 1033, 1859 | |
| 6-12 | 1846 | macchia solo ricostruita, 27 px | riquadro 453, 1846, 455, 1860 | |
| 6-12 | 1846 | macchia solo ricostruita, 29 px | riquadro 822, 1846, 827, 1859 | |
| 6-12 | 1848 | macchia solo ricostruita, 25 px | riquadro 475, 1848, 476, 1860 | |
| 6-12 | 1874 | macchia solo ricostruita, 26 px | riquadro 1106, 1874, 1110, 1885 | |
| 6-12 | 1881 | macchia solo ricostruita, 25 px | riquadro 518, 1881, 522, 1891 | |
| 6-12 | 1901 | macchia solo ricostruita, 26 px | riquadro 940, 1901, 943, 1915 | |
| 6-12 | 1928 | macchia solo ricostruita, 30 px | riquadro 1162, 1928, 1166, 1939 | |
| 6-12 | 1955 | macchia solo ricostruita, 31 px | riquadro 844, 1955, 849, 1968 | |
| 6-12 | 1955 | macchia solo ricostruita, 32 px | riquadro 1011, 1955, 1013, 1969 | |
| 6-12 | 500 | numero | Z | 2 |
| 6-12 | 1623 | numero | (niente) | 1 |
| 6-12 | 1726 | numero | (niente) | 1 |
| 6-13 | 1756 | macchia solo originale, 436 px | riquadro 1153, 1756, 1161, 1865 | |
| 6-13 | 1763 | macchia solo ricostruita, 480 px | riquadro 1141, 1763, 1145, 1858 | |
| 6-13 | 677 | numero | l | 1 |
| 6-14 | 574 | macchia solo originale, 2715 px | riquadro 515, 574, 1258, 589 | |
| 6-14 | 576 | macchia solo originale, 478 px | riquadro 389, 576, 513, 589 | |
| 6-14 | 679 | macchia solo originale, 3187 px | riquadro 395, 679, 1249, 684 | |
| 6-14 | 595 | macchia solo ricostruita, 2853 px | riquadro 396, 595, 1251, 598 | |
| 6-14 | 686 | macchia solo ricostruita, 2928 px | riquadro 384, 686, 1249, 700 | |
| 6-14 | 686 | macchia solo ricostruita, 54 px | riquadro 1253, 686, 1256, 699 | |
| 6-14 | 510 | numero con una sola conferma | 2 | 2 |
| 6-15 | 504 | numero | Z | 2 |
| 6-16 | 1272 | macchia solo originale, 25 px | riquadro 673, 1272, 697, 1272 | |
| 6-16 | 1272 | macchia solo originale, 27 px | riquadro 737, 1272, 763, 1272 | |
| 6-16 | 1272 | macchia solo originale, 63 px | riquadro 765, 1272, 827, 1272 | |
| 6-16 | 1337 | macchia solo originale, 343 px | riquadro 643, 1337, 818, 1340 | |
| 6-16 | 1338 | macchia solo originale, 195 px | riquadro 826, 1338, 925, 1341 | |
| 6-16 | 1338 | macchia solo originale, 57 px | riquadro 975, 1338, 1019, 1340 | |
| 6-16 | 1339 | macchia solo originale, 35 px | riquadro 926, 1339, 945, 1341 | |
| 6-16 | 1316 | macchia solo ricostruita, 38 px | riquadro 800, 1316, 837, 1316 | |
| 6-16 | 506 | numero con una sola conferma | 2 | 2 |
| 6-17 | 400 | riga "Flight Manual" | inizio 0 px, fine 0 px, linea di base 6 px | |
| 6-17 | 471 | riga "Page: 6-17" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-17 | 512 | riga "Reims, Marne France" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-17 | 510 | riga "Edition: 2" | inizio 0 px, fine -1 px, linea di base 10 px | |
| 6-17 | 307 | riga "LOADING ARRANGEMENTS" | inizio 0 px, fine 0 px, linea di base 5 px | |
| 6-17 | 412 | riga "STATION (C. G. ARM)" | inizio 0 px, fine 0 px, linea di base 4 px | |
| 6-17 | 412 | riga "STATION (C. G. ARM)" | inizio 0 px, fine 1 px, linea di base 4 px | |
| 6-17 | 478 | riga "CENTIMETERS" | inizio 0 px, fine 0 px, linea di base 4 px | |
| 6-17 | 578 | numero | 3i | *37 |
| 6-17 | 718 | numero | 13 | 73 |
| 6-17 | | parola sfilacciata (spaziatura 0.61 em) | | 73 |
| 6-17 | | parola sfilacciata (spaziatura 0.52 em) | | 73 |
| 6-17 | 510 | numero con una sola conferma | 2 | 2 |
| 6-18 | 404 | riga "Flight Manual" | inizio 0 px, fine 0 px, linea di base 5 px | |
| 6-18 | 479 | riga "Page: 6-18" | inizio 0 px, fine 0 px, linea di base 7 px | |
| 6-18 | 518 | riga "Edition: 2" | inizio 0 px, fine -1 px, linea di base 10 px | |
| 6-18 | 422 | riga "cmkg/1000" | inizio -2 px, fine 0 px, linea di base 4 px | |
| 6-18 | 417 | riga "kg" | inizio 0 px, fine 2 px, linea di base 5 px | |
| 6-18 | 422 | riga "cmkg/1000" | inizio -1 px, fine 6 px, linea di base 2 px | |
| 6-18 | 857 | riga "4." | inizio 0 px, fine -1 px, linea di base 6 px | |
| 6-18 | 576 | macchia solo originale, 263 px | riquadro 283, 576, 440, 579 | |
| 6-18 | 577 | macchia solo ricostruita, 101 px | riquadro 269, 577, 269, 677 | |
| 6-18 | 583 | macchia solo ricostruita, 58 px | riquadro 288, 583, 344, 584 | |
| 6-18 | 583 | macchia solo ricostruita, 161 px | riquadro 353, 583, 447, 648 | |
| 6-18 | 583 | macchia solo ricostruita, 313 px | riquadro 454, 583, 458, 777 | |
| 6-18 | 583 | macchia solo ricostruita, 34 px | riquadro 467, 583, 500, 583 | |
| 6-18 | 583 | macchia solo ricostruita, 30 px | riquadro 504, 583, 533, 583 | |
| 6-18 | 585 | macchia solo ricostruita, 60 px | riquadro 630, 585, 630, 644 | |
| 6-18 | 585 | macchia solo ricostruita, 44 px | riquadro 819, 585, 819, 628 | |
| 6-18 | 587 | macchia solo ricostruita, 285 px | riquadro 1169, 587, 1170, 729 | |
| 6-18 | 587 | macchia solo ricostruita, 48 px | riquadro 1181, 587, 1182, 627 | |
| 6-18 | 588 | macchia solo ricostruita, 86 px | riquadro 1295, 588, 1295, 673 | |
| 6-18 | 603 | macchia solo ricostruita, 27 px | riquadro 538, 603, 538, 629 | |
| 6-18 | 632 | macchia solo ricostruita, 25 px | riquadro 819, 632, 819, 656 | |
| 6-18 | 674 | macchia solo ricostruita, 79 px | riquadro 1181, 674, 1181, 752 | |
| 6-18 | 738 | macchia solo ricostruita, 296 px | riquadro 1169, 738, 1170, 885 | |
| 6-18 | 907 | macchia solo ricostruita, 100 px | riquadro 1169, 907, 1170, 1001 | |
| 6-18 | 504 | numero | uF | 1. |
| 6-18 | 762 | numero | 7 | 17 |
| 6-18 | 1131 | numero | Z. | 7. |
| 6-18 | 518 | numero con una sola conferma | 2 | 2 |
| 6-19 | 624 | riga "LOAD WEIGHT" | inizio 0 px, fine 3 px, linea di base 5 px | |
| 6-19 | 378 | macchia solo originale, 31 px | riquadro 663, 378, 665, 394 | |
| 6-19 | 1394 | macchia solo originale, 39 px | riquadro 1308, 1394, 1326, 1397 | |
| 6-19 | 1663 | macchia solo originale, 27 px | riquadro 261, 1663, 278, 1665 | |
| 6-19 | 1663 | macchia solo originale, 33 px | riquadro 334, 1663, 356, 1665 | |
| 6-19 | 1663 | macchia solo originale, 29 px | riquadro 412, 1663, 434, 1665 | |
| 6-19 | 1663 | macchia solo originale, 37 px | riquadro 488, 1663, 510, 1665 | |
| 6-19 | 1663 | macchia solo originale, 41 px | riquadro 563, 1663, 585, 1665 | |
| 6-19 | 1663 | macchia solo originale, 40 px | riquadro 638, 1663, 660, 1665 | |
| 6-19 | 1663 | macchia solo originale, 28 px | riquadro 716, 1663, 738, 1665 | |
| 6-19 | 1663 | macchia solo originale, 29 px | riquadro 791, 1663, 813, 1664 | |
| 6-19 | 2068 | macchia solo ricostruita, 36 px | riquadro 196, 2068, 199, 2076 | |
| 6-20 | 409 | riga "Flight Manual" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-20 | 475 | riga "Page: 6-20" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-20 | 475 | riga "Reims Aviation" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 512 | riga "Edition: 2" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-20 | 513 | riga "Reims, Marne France" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-20 | 451 | riga "1100" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 620 | riga "1000" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 318 | riga "LBS." | inizio 0 px, fine 0 px, linea di base 4 px | |
| 6-20 | 394 | riga "2500" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 472 | riga "2400" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-20 | 850 | riga "1900" | inizio 0 px, fine -1 px, linea di base 5 px | |
| 6-20 | 928 | riga "1800" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 1002 | riga "1700" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 1151 | riga "1500" | inizio 0 px, fine -1 px, linea di base 4 px | |
| 6-20 | 1237 | riga "KG-CM" | inizio 13 px, fine 0 px, linea di base 2 px | |
| 6-20 | 488 | riga "NORMAL" | inizio 11 px, fine -3 px, linea di base -1 px | |
| 6-20 | 658 | macchia solo originale, 49 px | riquadro 505, 658, 526, 661 | |
| 6-20 | 813 | macchia solo originale, 34 px | riquadro 505, 813, 526, 816 | |
| 6-20 | 877 | macchia solo originale, 116 px | riquadro 505, 877, 526, 902 | |
| 6-20 | 571 | macchia solo ricostruita, 25 px | riquadro 271, 571, 277, 574 | |
| 6-20 | 2090 | macchia solo ricostruita, 93 px | riquadro 1325, 2090, 1332, 2101 | |
| 6-20 | 1186 | numero | (niente) | 50 |
| 6-20 | 1185 | numero | oO | 60 |
| 6-20 | 1185 | numero | 2 70 | 70 |
| 6-20 | 1185 | numero | 108 | 105 |
| 6-20 | 1185 | numero | 410 | 110 |
| 6-20 | 1237 | numero | (niente) | 95 |
| 6-20 | 1237 | numero | 136 | 135 |
| 6-20 | 512 | numero con una sola conferma | 2 | 2 |

## Numeri, uno per uno

Sezioni 2, 3, 5 e 6: due conferme indipendenti per ogni numero. ✓ = conferma.

### Pagina 1-1

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 1-1 | 1-1 ✓ | ✓ |  | 2 |
| 487 | 2 | 2 ✓ | – |  | 1 |
| 1217 | (1) | (1) ✓ | ✓ |  | 2 |
| 1252 | (2) | (2) ✓ | ✓ |  | 2 |
| 1290 | (3) | (3) ✓ | ✓ |  | 2 |
| 1329 | (4) | (4) ✓ | ✓ |  | 2 |
| 1366 | (5) | (5) ✓ | ✓ |  | 2 |

### Pagina 3-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 466 | 3-1 | 3-1 ✓ | ✓ |  | 2 |
| 500 | 2 | 2 ✓ | – |  | 1 |
| 1089 | (1) | (1) ✓ | ✓ |  | 2 |
| 1125 | (2) | (2) ✓ | ✓ |  | 2 |
| 1161 | (3) | (3) ✓ | ✓ |  | 2 |
| 1234 | (4) | (4) ✓ | ✓ |  | 2 |
| 1267 | (5) | (5) ✓ | ✓ |  | 2 |
| 1418 | (1) | (1) ✓ | ✓ |  | 2 |
| 1418 | 129 | 129 ✓ | ✓ |  | 2 |
| 1418 | 70 | 70 ✓ | ✓ |  | 2 |
| 1418 | 80 | 80 ✓ | ✓ |  | 2 |
| 1454 | (2) | (2) ✓ | ✓ |  | 2 |
| 1490 | (3) | (3) ✓ | ✓ |  | 2 |
| 1527 | (4) | (4) ✓ | ✓ |  | 2 |
| 1563 | (5) | (3)  | ✓ |  | 1 |
| 1956 | (1) | (1 ✓ | ✓ |  | 2 |
| 1956 | 137 | 37  | ✓ |  | 1 |
| 1956 | 74 | 74 ✓ | ✓ |  | 2 |
| 1956 | 85 | 85 ✓ | ✓ |  | 2 |
| 2027 | (2) | (2) ✓ | ✓ |  | 2 |
| 2063 | (3) | (3) ✓ | ✓ |  | 2 |
| 2097 | (4) | (4) ✓ | ✓ |  | 2 |

### Pagina 3-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 478 | 3-2 | 3-2 ✓ | ✓ |  | 2 |
| 515 | 2 | 2 ✓ | – |  | 1 |
| 622 | (5) | (3)  | ✓ |  | 1 |
| 622 | 3-5 | 3-5 ✓ | ✓ |  | 2 |
| 658 | 1/2 | 1/2 ✓ | ✓ |  | 2 |
| 693 | (6) | (6) ✓ | ✓ |  | 2 |
| 693 | (2,5 | (2,5 ✓ | ✓ |  | 2 |
| 731 | (7) | (7) ✓ | ✓ |  | 2 |
| 945 | (1) | (1) ✓ | ✓ |  | 2 |
| 981 | (2) | (2) ✓ | ✓ |  | 2 |
| 1018 | (3) | (3) ✓ | ✓ |  | 2 |
| 1055 | (4) | (4) ✓ | ✓ |  | 2 |
| 1092 | (5) | (3)  | ✓ |  | 1 |
| 1711 | (1) | (1) ✓ | ✓ |  | 2 |
| 1746 | (2) | (2) ✓ | ✓ |  | 2 |
| 1783 | (3) | (3) ✓ | ✓ |  | 2 |
| 1819 | (4) | (4) ✓ | ✓ |  | 2 |
| 1853 | (5) | (5) ✓ | ✓ |  | 2 |
| 2063 | (6) | (6) ✓ | ✓ |  | 2 |

### Pagina 3-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 3-3 | 3-3 ✓ | ✓ |  | 2 |
| 490 | 2 | z  | – |  | 0 |
| 780 | (1) | (1) ✓ | ✓ |  | 2 |
| 813 | (2) | (2) ✓ | ✓ |  | 2 |
| 851 | (3) | (3) ✓ | ✓ |  | 2 |
| 887 | (4) | (4) ✓ | ✓ |  | 2 |
| 887 | 193 | 193 ✓ | ✓ |  | 2 |
| 887 | 104 | 104 ✓ | ✓ |  | 2 |
| 887 | 120 | 120 ✓ | ✓ |  | 2 |
| 923 | (5) | (5) ✓ | ✓ |  | 2 |
| 960 | (6) | (6) ✓ | ✓ |  | 2 |
| 996 | (7) | (7) ✓ | ✓ |  | 2 |
| 1070 | (8) | (3)  | ✓ |  | 1 |
| 1286 | (1) | (1) ✓ | ✓ |  | 2 |
| 1326 | (2) | (2) ✓ | ✓ |  | 2 |
| 1862 | (1) | (1) ✓ | ✓ |  | 2 |
| 1898 | (2) | (2) ✓ | ✓ |  | 2 |

### Pagina 3-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 3-4 | 3-4 ✓ | ✓ |  | 2 |
| 519 | 2 | 2 ✓ | – |  | 1 |
| 956 | (1) | (1) ✓ | ✓ |  | 2 |
| 990 | (2) | (2) ✓ | ✓ |  | 2 |
| 1027 | (3) | (3) ✓ | ✓ |  | 2 |
| 1102 | (4) | (4) ✓ | ✓ |  | 2 |
| 1140 | (5) | (5) ✓ | ✓ |  | 2 |
| 1218 | (6) | (6) ✓ | ✓ |  | 2 |
| 1502 | (1) | (1) ✓ | ✓ |  | 2 |
| 1538 | (2) | (2) ✓ | ✓ |  | 2 |
| 1783 | 121 | Al  | ✓ |  | 1 |
| 1783 | 65 | 65 ✓ | ✓ |  | 2 |
| 1819 | 75 | 75 ✓ | ✓ |  | 2 |
| 1819 | 20°) | 20) ✓ | ✓ |  | 2 |

### Pagina 3-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 452 | 3-5 | 3-5 ✓ | ✓ |  | 2 |
| 493 | 2 | 2 ✓ | – |  | 1 |
| 891 | (1) | (1) ✓ | ✓ |  | 2 |
| 927 | (2) | (2) ✓ | ✓ |  | 2 |
| 927 | 20° | 20 ✓ | ✓ |  | 2 |
| 927 | 121 | 121 ✓ | ✓ |  | 2 |
| 927 | 65 | 65 ✓ | ✓ |  | 2 |
| 927 | 75 | 75 ✓ | ✓ |  | 2 |
| 1037 | (3) | (3) ✓ | ✓ |  | 2 |
| 1109 | (4) | (4) ✓ | ✓ |  | 2 |
| 1109 | 40° | 40 ✓ | ✓ |  | 2 |
| 1109 | 121 | 121 ✓ | ✓ |  | 2 |
| 1109 | 65 | 65 ✓ | ✓ |  | 2 |
| 1109 | 75 | 75 ✓ | ✓ |  | 2 |
| 1146 | (5) | (5) ✓ | ✓ |  | 2 |
| 1182 | (6) | (6) ✓ | ✓ |  | 2 |
| 1219 | (7) | (7) ✓ | ✓ |  | 2 |
| 1435 | 137 | 137 ✓ | ✓ |  | 2 |
| 1435 | 74 | 74 ✓ | ✓ |  | 2 |
| 1471 | 85 | 85 ✓ | ✓ |  | 2 |
| 1724 | (1) | (1) ✓ | ✓ |  | 2 |
| 1757 | (2) | (2) ✓ | ✓ |  | 2 |
| 1793 | (3) | (3) ✓ | ✓ |  | 2 |
| 1828 | (4) | (4) ✓ | ✓ |  | 2 |
| 1828 | 121 | 121 ✓ | ✓ |  | 2 |
| 1828 | 137 | 137 ✓ | ✓ |  | 2 |
| 1828 | 65 | 65 ✓ | ✓ |  | 2 |
| 1828 | 74 | 74 ✓ | ✓ |  | 2 |
| 1828 | 75 | 75 ✓ | ✓ |  | 2 |
| 1828 | 85 | 85 ✓ | ✓ |  | 2 |
| 1865 | (5) | (5) ✓ | ✓ |  | 2 |
| 1899 | (6) | (6) ✓ | ✓ |  | 2 |
| 1899 | 113 | 113 ✓ | ✓ |  | 2 |
| 1899 | 129 | 129 ✓ | ✓ |  | 2 |
| 1899 | 61 | 61 ✓ | ✓ |  | 2 |
| 1899 | 70 | 70 ✓ | ✓ |  | 2 |
| 1899 | 70 | 70 ✓ | ✓ |  | 2 |
| 1899 | 80 | 80 ✓ | ✓ |  | 2 |
| 1968 | (7) | (7) ✓ | ✓ |  | 2 |
| 2003 | (8) | (8) ✓ | ✓ |  | 2 |
| 2039 | (9) | (9) ✓ | ✓ |  | 2 |
| 2074 | (10) | (10) ✓ | ✓ |  | 2 |

### Pagina 3-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 3-6 | 3-6 ✓ | ✓ |  | 2 |
| 516 | 2 | 2 ✓ | – |  | 1 |
| 772 | 121.5 | 121.5 ✓ | ✓ |  | 2 |
| 845 | (1) | (1) ✓ | ✓ |  | 2 |
| 918 | (2) | (2) ✓ | ✓ |  | 2 |
| 918 | 40° | 409  | ✓ |  | 1 |
| 918 | 300 | 300 ✓ | ✓ |  | 2 |
| 955 | 113 | Lis  | ✓ |  | 1 |
| 955 | 61 | 61 ✓ | ✓ |  | 2 |
| 955 | 70 | 70 ✓ | ✓ |  | 2 |
| 990 | (3) | (3) ✓ | ✓ |  | 2 |
| 1027 | (4) | (4) ✓ | ✓ |  | 2 |
| 1138 | (5) | (3)  | ✓ |  | 1 |
| 1174 | (6) | (6) ✓ | ✓ |  | 2 |
| 1247 | (7) | (7) ✓ | ✓ |  | 2 |
| 1677 | (1) | (1) ✓ | ✓ |  | 2 |
| 1713 | (2) | (2) ✓ | ✓ |  | 2 |
| 1783 | (3) | (3) ✓ | ✓ |  | 2 |
| 1853 | (4) | (4) ✓ | ✓ |  | 2 |
| 1888 | (5) | (5) ✓ | ✓ |  | 2 |
| 1958 | (6) | (6) ✓ | ✓ |  | 2 |
| 1958 | 0,5 | 0,5 ✓ | ✓ |  | 2 |
| 2029 | (7) | (7) ✓ | ✓ |  | 2 |

### Pagina 3-7 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 475 | 3-7 | 3-7 ✓ | ✓ |  | 2 |
| 512 | 2 | 2 ✓ | – |  | 1 |
| 621 | (8) | (8) ✓ | ✓ |  | 2 |
| 729 | (9) | (9) ✓ | ✓ |  | 2 |
| 800 | (10) | (10) ✓ | ✓ |  | 2 |
| 800 | 129 | 129 ✓ | ✓ |  | 2 |
| 800 | 145 | 145 ✓ | ✓ |  | 2 |
| 800 | 70 | 70 ✓ | ✓ |  | 2 |
| 800 | 78 | 78 ✓ | ✓ |  | 2 |
| 800 | 80 | 80 ✓ | ✓ |  | 2 |
| 800 | 90 | 90 ✓ | ✓ |  | 2 |
| 873 | (11) | (11) ✓ | ✓ |  | 2 |
| 910 | (12) | (E2)  | ✓ |  | 1 |
| 1165 | (1) | (1) ✓ | ✓ |  | 2 |
| 1201 | (2) | (2) ✓ | ✓ |  | 2 |
| 1272 | (3) | G3) ✓ | ✓ |  | 2 |
| 1313 | 145 | 145 ✓ | ✓ |  | 2 |
| 1313 | 78 | 78 ✓ | ✓ |  | 2 |
| 1313 | 90 | 90 ✓ | ✓ |  | 2 |
| 1349 | (4) | (4) ✓ | ✓ |  | 2 |
| 1349 | 145 | 145 ✓ | ✓ |  | 2 |
| 1349 | 78 | 78 ✓ | ✓ |  | 2 |
| 1349 | 90 | 90 ✓ | ✓ |  | 2 |
| 1423 | (5) | (3)  | ✓ |  | 1 |
| 1494 | (6) | (6) ✓ | ✓ |  | 2 |
| 1565 | (7) | (7) ✓ | ✓ |  | 2 |

### Pagina 3-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 3-8 | 3-8 ✓ | ✓ |  | 2 |
| 518 | 2 | 2 ✓ | – |  | 1 |
| 1065 | 16 | 16 ✓ | ✓ |  | 2 |

### Pagina 3-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 462 | 3-9 | 3-9 ✓ | ✓ |  | 2 |
| 496 | 2 | 2 ✓ | – |  | 1 |

### Pagina 4-1

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 465 | 4-1 | 4-  | ✓ |  | 1 |
| 503 | 2 | 2 ✓ | ✓ |  | 2 |
| 1011 | (1) | (1) ✓ | ✓ |  | 2 |
| 1011 | 4-1. | 4-,  | ✓ |  | 1 |
| 1194 | (1) | (1) ✓ | ✓ |  | 2 |
| 1230 | (2) | (2) ✓ | ✓ |  | 2 |
| 1265 | (3) | (3) ✓ | ✓ |  | 2 |
| 1304 | (4) | (4) ✓ | ✓ |  | 2 |
| 1341 | (5) | (3)  | ✓ |  | 1 |
| 1524 | (1) | (1) ✓ | ✓ |  | 2 |
| 1559 | (2) | (2) ✓ | ✓ |  | 2 |
| 1595 | (3) | (3) ✓ | ✓ |  | 2 |
| 1595 | 1 | l  | ✓ |  | 1 |
| 1595 | (2,5 | (2,9  | ✓ |  | 1 |
| 1632 | (4) | (4) ✓ | ✓ |  | 2 |
| 1667 | (5) | (3)  | ✓ |  | 1 |
| 1704 | (6) | (6) ✓ | ✓ |  | 2 |
| 1704 | 2 | 2 ✓ | ✓ |  | 2 |
| 1704 | 4 | 4 ✓ | ✓ |  | 2 |
| 1704 | (7,8 | (7,8 ✓ | ✓ |  | 2 |
| 1704 | 15,5 | 15,5 ✓ | ✓ |  | 2 |
| 1774 | 30 | 30 ✓ | ✓ |  | 2 |
| 1808 | (7) | (7) ✓ | ✓ |  | 2 |

### Pagina 4-2

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 478 | 4-2 | 4-2 ✓ | ✓ |  | 2 |
| 515 | 2 | 2 ✓ | ✓ |  | 2 |
| 1817 | 1 | L  | ✓ |  | 1 |

### Pagina 4-3

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 4-3 | 4.3 ✓ | ✓ |  | 2 |
| 493 | 2 | .  | ✓ |  | 1 |
| 635 | 2 | 2 ✓ | ✓ |  | 2 |
| 856 | 3 | 3 ✓ | ✓ |  | 2 |
| 928 | 4 | 4 ✓ | ✓ |  | 2 |
| 1184 | 5 | 5 ✓ | ✓ |  | 2 |
| 1334 | (6,6 | (6,6 ✓ | ✓ |  | 2 |
| 1371 | (9,5 | (9,5 ✓ | ✓ |  | 2 |
| 1620 | 6 | 6 ✓ | ✓ |  | 2 |
| 1831 | 7 | 7 ✓ | ✓ |  | 2 |
| 2043 | 8 | B  | ✓ |  | 1 |
| 2079 | 4-1. | 1-1.  | ✓ |  | 1 |

### Pagina 4-4

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 473 | 4-4 | 4-4 ✓ | ✓ |  | 2 |
| 510 | 2 | ps  | ✓ |  | 1 |
| 616 | 15 | he:  | ✓ |  | 1 |
| 763 | (8) | (8) ✓ | ✓ |  | 2 |
| 763 | 30 | 30 ✓ | ✓ |  | 2 |
| 976 | (1) | (1) ✓ | ✓ |  | 2 |
| 1013 | (2) | (2) ✓ | ✓ |  | 2 |
| 1051 | (3) | (3) ✓ | ✓ |  | 2 |
| 1088 | (4) | (4) ✓ | ✓ |  | 2 |
| 1126 | (5) | (3)  | ✓ |  | 1 |
| 1126 | 1800 | 1800 ✓ | ✓ |  | 2 |
| 1162 | (6) | (6) ✓ | ✓ |  | 2 |
| 1204 | (7) | (7) ✓ | ✓ |  | 2 |
| 1204 | (4, | (4, ✓ | ✓ |  | 2 |
| 1204 | 6 | 6 ✓ | ✓ |  | 2 |
| 1204 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 1239 | (8) | (8) ✓ | ✓ |  | 2 |
| 1239 | (50 | (S50 ✓ | – |  | 1 |
| 1275 | (9) | (9) ✓ | ✓ |  | 2 |
| 1313 | (10) | (10) ✓ | ✓ |  | 2 |
| 1349 | (11) | (11) ✓ | ✓ |  | 2 |
| 1386 | (12) | (12) ✓ | ✓ |  | 2 |
| 1672 | (1) | (1) ✓ | ✓ |  | 2 |
| 1672 | 0° | ee  | ✓ |  | 1 |
| 1672 | 10°. | 10. ✓ | ✓ |  | 2 |
| 1707 | (2) | (2) ✓ | ✓ |  | 2 |
| 1707 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1742 | (3) | (3) ✓ | ✓ |  | 2 |
| 1777 | (4) | (4) ✓ | ✓ |  | 2 |
| 1777 | 97 | G7  | ✓ |  | 1 |
| 1777 | 52 | 52 ✓ | ✓ |  | 2 |
| 1777 | 60 | 60 ✓ | ✓ |  | 2 |
| 1811 | (5) | (5) ✓ | ✓ |  | 2 |
| 1811 | 137 | J  | ✓ |  | 1 |
| 1811 | 153 | to  | ✓ |  | 1 |
| 1811 | 74 | 74 ✓ | ✓ |  | 2 |
| 1811 | 83 | 83 ✓ | ✓ |  | 2 |
| 1811 | 85 | 85 ✓ | ✓ |  | 2 |
| 1811 | 95 | 95 ✓ | ✓ |  | 2 |
| 1847 | (7) | (7) ✓ | ✓ |  | 2 |
| 1989 | (1) | ()  | ✓ |  | 1 |
| 1989 | 10°. | 10, ✓ | ✓ |  | 2 |
| 2023 | (2) | (2) ✓ | ✓ |  | 2 |
| 2058 | (3) | (3) ✓ | ✓ |  | 2 |
| 2058 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 2094 | (4) | (4) ✓ | ✓ |  | 2 |

### Pagina 4-5

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 454 | 4-5 | 4-5 ✓ | ✓ |  | 2 |
| 491 | 2 | Zz  | – |  | 0 |
| 604 | (5) | (5) ✓ | ✓ |  | 2 |
| 640 | (6) | (6) ✓ | ✓ |  | 2 |
| 676 | (7) | (7) ✓ | ✓ |  | 2 |
| 676 | 113 | 13  | ✓ |  | 1 |
| 676 | 61 | 61 ✓ | ✓ |  | 2 |
| 676 | 70 | 70 ✓ | ✓ |  | 2 |
| 785 | (8) | (3)  | ✓ |  | 1 |
| 1039 | (1) | (1) ✓ | ✓ |  | 2 |
| 1039 | 161 | 161 ✓ | ✓ |  | 2 |
| 1039 | 177 | LiT  | ✓ |  | 1 |
| 1039 | 87 | 87 ✓ | ✓ |  | 2 |
| 1039 | 96 | 96 ✓ | ✓ |  | 2 |
| 1039 | 100 | 100 ✓ | ✓ |  | 2 |
| 1039 | 110 | 110 ✓ | ✓ |  | 2 |
| 1075 | (2) | (2) ✓ | ✓ |  | 2 |
| 1075 | 25 | Zo  | ✓ |  | 1 |
| 1075 | (847 | (847 ✓ | ✓ |  | 2 |
| 1075 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 1111 | (3) | (3) ✓ | ✓ |  | 2 |
| 1111 | 13 | 13 ✓ | ✓ |  | 2 |
| 1111 | (49,2 | (49,2 ✓ | ✓ |  | 2 |
| 1251 | (1) | (1) ✓ | ✓ |  | 2 |
| 1251 | 153 | 153 ✓ | ✓ |  | 2 |
| 1251 | 83 | 83 ✓ | ✓ |  | 2 |
| 1251 | 95 | 95 ✓ | ✓ |  | 2 |
| 1251 | 140 | 140 ✓ | – |  | 1 |
| 1251 | 76 | 76 ✓ | – |  | 1 |
| 1288 | 87 | 87 ✓ | ✓ |  | 2 |
| 1288 | 10,000 | 10,000 ✓ | ✓ |  | 2 |
| 1327 | (2) | (2) ✓ | ✓ |  | 2 |
| 1327 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1364 | (3) | (3) ✓ | ✓ |  | 2 |
| 1549 | (1) | (1) ✓ | ✓ |  | 2 |
| 1549 | 15 | 15 ✓ | ✓ |  | 2 |
| 1549 | 25 | 25 ✓ | ✓ |  | 2 |
| 1549 | (508 | (508 ✓ | ✓ |  | 2 |
| 1549 | 847 | 847 ✓ | ✓ |  | 2 |
| 1549 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1587 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 1587 | 75% | 754  | ✓ |  | 1 |
| 1622 | (2) | (2) ✓ | ✓ |  | 2 |
| 1658 | (3) | (3) ✓ | ✓ |  | 2 |
| 1873 | (1) | (1) ✓ | ✓ |  | 2 |
| 1908 | (2) | (2) ✓ | ✓ |  | 2 |
| 2084 | (1) | (1) ✓ | ✓ |  | 2 |

### Pagina 4-6

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 463 | 4-6 | 4-6 ✓ | ✓ |  | 2 |
| 502 | 2 | 2 ✓ | ✓ |  | 2 |
| 612 | (2) | (2) ✓ | ✓ |  | 2 |
| 649 | (3) | (3) ✓ | ✓ |  | 2 |
| 685 | (4) | (4) ✓ | ✓ |  | 2 |
| 685 | 121 | 121 ✓ | ✓ |  | 2 |
| 685 | 137 | 137 ✓ | ✓ |  | 2 |
| 685 | 65 | 65 ✓ | ✓ |  | 2 |
| 685 | 74 | 74 ✓ | ✓ |  | 2 |
| 685 | 75 | 75 ✓ | ✓ |  | 2 |
| 685 | 85 | 85 ✓ | ✓ |  | 2 |
| 721 | (5) | (5) ✓ | ✓ |  | 2 |
| 758 | (6) | (6) ✓ | ✓ |  | 2 |
| 758 | 113 | 113 ✓ | ✓ |  | 2 |
| 758 | 129 | i29  | ✓ |  | 1 |
| 758 | 61 | 61 ✓ | ✓ |  | 2 |
| 758 | 70 | 70 ✓ | ✓ |  | 2 |
| 758 | 70 | 70 ✓ | ✓ |  | 2 |
| 758 | 80 | 30  | ✓ |  | 1 |
| 939 | (1) | (1) ✓ | ✓ |  | 2 |
| 939 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 976 | (2) | (2) ✓ | ✓ |  | 2 |
| 976 | 20°. | 202.  | ✓ |  | 1 |
| 1012 | (3) | (3) ✓ | ✓ |  | 2 |
| 1012 | 121 | 121 ✓ | ✓ |  | 2 |
| 1012 | 65 | 65 ✓ | ✓ |  | 2 |
| 1012 | 75 | 75 ✓ | ✓ |  | 2 |
| 1236 | (1) | (1) ✓ | ✓ |  | 2 |
| 1272 | (2) | (2) ✓ | ✓ |  | 2 |
| 1308 | (3) | (3) ✓ | ✓ |  | 2 |
| 1491 | (1) | (1) ✓ | ✓ |  | 2 |
| 1668 | (1) | (1) ✓ | ✓ |  | 2 |
| 1703 | (2) | (2) ✓ | ✓ |  | 2 |
| 1739 | (3) | (3) ✓ | ✓ |  | 2 |
| 1775 | (4) | (4) ✓ | ✓ |  | 2 |
| 1810 | (5) | (3)  | ✓ |  | 1 |

### Pagina 4-7

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 455 | 4-7 | 4-7 ✓ | ✓ |  | 2 |
| 494 | 2 | 2 ✓ | ✓ |  | 2 |
| 1070 | 2 | Z  | ✓ |  | 1 |
| 1070 | 4 | 4 ✓ | ✓ |  | 2 |
| 1070 | (7,8 | (7,8 ✓ | ✓ |  | 2 |
| 1070 | 15,5 | 13.0  | ✓ |  | 1 |
| 1252 | 1/2 | 1/2 ✓ | ✓ |  | 2 |
| 1439 | 3 | 3 ✓ | ✓ |  | 2 |
| 1439 | 5 | 5 ✓ | ✓ |  | 2 |
| 1904 | 4-2) | 4-2) ✓ | ✓ |  | 2 |

### Pagina 4-8

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 479 | 4-8 | 4-8 ✓ | ✓ |  | 2 |
| 516 | 2 | 2 ✓ | ✓ |  | 2 |
| 2098 | 4-2. | 4-2. ✓ | ✓ |  | 2 |

### Pagina 4-9

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 457 | 4-9 | 4-9 ✓ | ✓ |  | 2 |
| 492 | 2 | 2 ✓ | – |  | 1 |
| 967 | 1800 | 1800 ✓ | ✓ |  | 2 |
| 1113 | 50 | 50 ✓ | ✓ |  | 2 |
| 1548 | 3 | 3 ✓ | ✓ |  | 2 |
| 1548 | 5 | 3  | ✓ |  | 1 |
| 1621 | (1800 | (1800 ✓ | ✓ |  | 2 |

### Pagina 4-10

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 482 | 4-10 | 4-10 ✓ | ✓ |  | 2 |
| 519 | 2 | i  | – |  | 0 |
| 876 | 3000 | 3000 ✓ | ✓ |  | 2 |
| 912 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 1058 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1095 | 25 | Zn  | ✓ |  | 1 |
| 1095 | (847 | (847 ✓ | ✓ |  | 2 |
| 1095 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 1209 | 10° | 10 ✓ | ✓ |  | 2 |
| 1244 | 5 | 5 ✓ | ✓ |  | 2 |
| 1244 | 20° | 20 ✓ | – |  | 1 |
| 1498 | 10°, | 109,  | ✓ |  | 1 |
| 1571 | (153 | (153 ✓ | – |  | 1 |
| 1571 | 83 | 83 ✓ | ✓ |  | 2 |
| 1571 | 95 | 23  | – |  | 0 |
| 1610 | 20° | 20 ✓ | – |  | 1 |

### Pagina 4-11

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 462 | 4-11 | 4-11 ✓ | ✓ |  | 2 |
| 500 | 2 | 2 ✓ | – |  | 1 |
| 937 | 161 | 161 ✓ | ✓ |  | 2 |
| 937 | 177 | 177 ✓ | ✓ |  | 2 |
| 937 | 87 | 87 ✓ | ✓ |  | 2 |
| 937 | 96 | 96 ✓ | ✓ |  | 2 |
| 937 | 100 | 100 ✓ | ✓ |  | 2 |
| 937 | 110 | 110 ✓ | ✓ |  | 2 |
| 975 | 25 | 25 ✓ | ✓ |  | 2 |
| 975 | (847 | (847 ✓ | ✓ |  | 2 |
| 975 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 1012 | 13 | 13 ✓ | ✓ |  | 2 |
| 1012 | (49,2 | (49,2 ✓ | ✓ |  | 2 |
| 1084 | 153 | 153 ✓ | – |  | 1 |
| 1084 | 83 | 83 ✓ | ✓ |  | 2 |
| 1084 | 95 | 95 ✓ | – |  | 1 |
| 1119 | 140 | 140 ✓ | – |  | 1 |
| 1119 | 76 | 76 ✓ | – |  | 1 |
| 1119 | 87 | 87 ✓ | ✓ |  | 2 |
| 1119 | 10,000 | 10,000 ✓ | ✓ |  | 2 |
| 1119 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1263 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1263 | 121 | 21  | ✓ |  | 1 |
| 1263 | 65 | 65 ✓ | ✓ |  | 2 |
| 1263 | 75 | 78  | ✓ |  | 1 |
| 1734 | 65% | 654  | ✓ |  | 1 |
| 1734 | 75% | 7594  | ✓ |  | 1 |

### Pagina 4-12

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 479 | 4-12 | 4-12 ✓ | ✓ |  | 2 |
| 515 | 2 | Z  | – |  | 0 |
| 841 | 5500 | 5500 ✓ | ✓ |  | 2 |
| 841 | 75 | 75 ✓ | ✓ |  | 2 |
| 841 | 232 | 232 ✓ | ✓ |  | 2 |
| 841 | 125 | 125 ✓ | ✓ |  | 2 |
| 841 | 144 | 144 ✓ | ✓ |  | 2 |
| 841 | 933 | 933 ✓ | ✓ |  | 2 |
| 841 | 504 | 504 ✓ | ✓ |  | 2 |
| 913 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 913 | 70 | 70 ✓ | ✓ |  | 2 |
| 913 | 229 | 229 ✓ | ✓ |  | 2 |
| 913 | 123 | 123 ✓ | ✓ |  | 2 |
| 913 | 142 | 42  | ✓ |  | 1 |
| 913 | 982 | 982 ✓ | ✓ |  | 2 |
| 913 | 530 | 530 ✓ | ✓ |  | 2 |
| 984 | 9000 | 9000 ✓ | ✓ |  | 2 |
| 984 | 65 | 65 ✓ | ✓ |  | 2 |
| 984 | 224 | 224 ✓ | ✓ |  | 2 |
| 984 | 121 | 121 ✓ | ✓ |  | 2 |
| 984 | 139 | 139 ✓ | ✓ |  | 2 |
| 984 | 1038 | 1038 ✓ | ✓ |  | 2 |
| 984 | 560 | 560 ✓ | ✓ |  | 2 |
| 1094 | 4-3. | 4-3. ✓ | ✓ |  | 2 |
| 1408 | 8 | 8 ✓ | ✓ |  | 2 |
| 1408 | 16 | 16 ✓ | ✓ |  | 2 |
| 1408 | 4 | 4 ✓ | ✓ |  | 2 |
| 1408 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 1408 | 5 | 5 ✓ | ✓ |  | 2 |
| 1408 | 10 | 10 ✓ | ✓ |  | 2 |
| 1556 | 5-3 | 9-3  | ✓ |  | 1 |
| 1852 | (1) | (1) ✓ | ✓ |  | 2 |
| 1886 | (2) | (2) ✓ | ✓ |  | 2 |
| 1921 | (3) | (3) ✓ | ✓ |  | 2 |
| 1992 | (4) | (4) ✓ | ✓ |  | 2 |

### Pagina 4-13

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 448 | 4-13 | 4-13 ✓ | ✓ |  | 2 |
| 484 | 2 | 2 ✓ | ✓ |  | 2 |
| 700 | 30° | 30 ✓ | – |  | 1 |
| 883 | 117 | 117 ✓ | ✓ |  | 2 |
| 919 | 63 | 63 ✓ | ✓ |  | 2 |
| 919 | 73 | 73 ✓ | ✓ |  | 2 |
| 919 | 40°, | 409,  | ✓ |  | 1 |
| 1245 | 20° | 207  | ✓ |  | 1 |
| 1611 | 20° | 20 ✓ | ✓ |  | 2 |

### Pagina 4-14

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 474 | 4-14 | 4-14 ✓ | ✓ |  | 2 |
| 511 | 2 | 2 ✓ | ✓ |  | 2 |
| 834 | (-20°C | (-200C  | ✓ |  | 1 |
| 1206 | (1) | (1) ✓ | ✓ |  | 2 |
| 1348 | (1) | (1) ✓ | ✓ |  | 2 |
| 1420 | (2) | (2) ✓ | ✓ |  | 2 |
| 1458 | (3) | (3) ✓ | ✓ |  | 2 |
| 1494 | (4) | (4) ✓ | ✓ |  | 2 |
| 1531 | (5) | (5) ✓ | ✓ |  | 2 |
| 1531 | (2,5 | (2,5 ✓ | ✓ |  | 2 |
| 1568 | (6) | (6) ✓ | ✓ |  | 2 |
| 1568 | -5°C | 59C  | ✓ |  | 1 |
| 1605 | -20°C | -200C  | ✓ |  | 1 |
| 1781 | (7) | (7) ✓ | ✓ |  | 2 |
| 1816 | (8) | (8) ✓ | ✓ |  | 2 |
| 1851 | (9) | (9) ✓ | ✓ |  | 2 |
| 1922 | (10) | (10) ✓ | ✓ |  | 2 |
| 1957 | (11) | (11) ✓ | ✓ |  | 2 |

### Pagina 4-15

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 464 | 4-15 | 4-15 ✓ | ✓ |  | 2 |
| 501 | 2 | 2 ✓ | ✓ |  | 2 |
| 1155 | (2 | (2 ✓ | ✓ |  | 2 |
| 1155 | 5 | 5 ✓ | ✓ |  | 2 |
| 1155 | 1000 | 1000 ✓ | ✓ |  | 2 |

### Pagina 5-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 450 | 5-1 | 5-  | ✓ |  | 1 |
| 485 | 2 | 2 ✓ | – |  | 1 |

### Pagina 5-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 472 | 5-2 | 3-2  | ✓ |  | 1 |
| 510 | 2 | 2 ✓ | ✓ |  | 2 |
| 1401 | 5-1 | 5-  | ✓ |  | 1 |
| 1401 | 1 | j  | ✓ |  | 1 |
| 1402 | 5). | 5). ✓ | ✓ |  | 2 |
| 407 | 1157 | 115)  | ✓ |  | 1 |
| 454 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 507 | 46 | 46 ✓ | ✓ |  | 2 |
| 507 | (174 | (174 ✓ | ✓ |  | 2 |
| 1299 | 1 | 1 ✓ | ✓ |  | 2 |
| 626 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 627 | 813 | 813. ✓ | ✓ |  | 2 |
| 628 | 24 | –  | ✓ |  | 1 |
| 631 | 77 | 71  | ✓ |  | 1 |
| 631 | 229 | 229 ✓ | ✓ |  | 2 |
| 632 | 123 | 423  | ✓ |  | 1 |
| 633 | 142 | 142 ✓ | ✓ |  | 2 |
| 633 | 11,7 | 11,7 ✓ | ✓ |  | 2 |
| 635 | 44,3 | 443  | ✓ |  | 1 |
| 637 | 3,9 | 3,9 ✓ | ✓ |  | 2 |
| 639 | 901 | 901 ✓ | ✓ |  | 2 |
| 641 | 487 | 487 ✓ | ✓ |  | 2 |
| 652 | 779 | 779 ✓ | ✓ |  | 2 |
| 654 | 23 | 23 ✓ | ✓ |  | 2 |
| 655 | 72 | 72 ✓ | ✓ |  | 2 |
| 656 | 222 | 222 ✓ | ✓ |  | 2 |
| 658 | 120 | 120 ✓ | ✓ |  | 2 |
| 659 | 138 | 138 ✓ | ✓ |  | 2 |
| 659 | 11,0 | 11,0 ✓ | ✓ |  | 2 |
| 661 | 41,6 | 41,6 ✓ | ✓ |  | 2 |
| 664 | 4,2 | 42  | ✓ |  | 1 |
| 666 | 933 | 933 ✓ | ✓ |  | 2 |
| 667 | 504 | 504 ✓ | ✓ |  | 2 |
| 679 | 745 | 745 ✓ | ✓ |  | 2 |
| 680 | 22 | 22 ✓ | ✓ |  | 2 |
| 681 | 67 | 67 ✓ | ✓ |  | 2 |
| 682 | 216 | 216 ✓ | ✓ |  | 2 |
| 684 | 116 | 116 ✓ | ✓ |  | 2 |
| 684 | 134 | 134 ✓ | ✓ |  | 2 |
| 686 | 10,2 | 10,2 ✓ | ✓ |  | 2 |
| 688 | 38,6 | 38,6 ✓ | ✓ |  | 2 |
| 689 | 4,5 | 4,5 ✓ | ✓ |  | 2 |
| 691 | 974 | 974 ✓ | ✓ |  | 2 |
| 693 | 526 | 526 ✓ | ✓ |  | 2 |
| 704 | 711 | 711 ✓ | ✓ |  | 2 |
| 715 | 21 | –  | ✓ |  | 1 |
| 708 | 62 | 62 ✓ | ✓ |  | 2 |
| 708 | 209 | 209 ✓ | ✓ |  | 2 |
| 710 | 113 | LUE:  | ✓ |  | 1 |
| 711 | 130 | 130 ✓ | ✓ |  | 2 |
| 711 | 9,5 | 95  | ✓ |  | 1 |
| 713 | 36,0 | 36,0 ✓ | ✓ |  | 2 |
| 715 | 4,8 | 48  | ✓ |  | 1 |
| 717 | 1006 | 1006 ✓ | ✓ |  | 2 |
| 719 | 543 | 543 ✓ | ✓ |  | 2 |
| 735 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 736 | 847 | 847 ✓ | ✓ |  | 2 |
| 737 | 25 | 25 ✓ | ✓ |  | 2 |
| 738 | 78 | 78 ✓ | ✓ |  | 2 |
| 739 | 229 | 229 ✓ | ✓ |  | 2 |
| 739 | 123 | 123 ✓ | ✓ |  | 2 |
| 741 | 142 | 142 ✓ | ✓ |  | 2 |
| 743 | 11,8 | 11,8 ✓ | ✓ |  | 2 |
| 743 | 44,7 | 44,7 ✓ | ✓ |  | 2 |
| 746 | 3,9 | 3,9 ✓ | ✓ |  | 2 |
| 748 | 893 | 893 ✓ | ✓ |  | 2 |
| 750 | 482 | 482 ✓ | ✓ |  | 2 |
| 762 | 813 | 813 ✓ | ✓ |  | 2 |
| 763 | 24 | 24 ✓ | ✓ |  | 2 |
| 764 | 73 | 73 ✓ | ✓ |  | 2 |
| 765 | 224 | 224 ✓ | ✓ |  | 2 |
| 766 | 121 | 121 ✓ | ✓ |  | 2 |
| 767 | 139 | 139 ✓ | ✓ |  | 2 |
| 768 | 11,1 | 11,1 ✓ | ✓ |  | 2 |
| 770 | 42,0 | 42,0 ✓ | ✓ |  | 2 |
| 771 | 4,1 | 41  | ✓ |  | 1 |
| 774 | 925 | 925 ✓ | ✓ |  | 2 |
| 776 | 500 | 500 ✓ | ✓ |  | 2 |
| 787 | 779 | 779 ✓ | ✓ |  | 2 |
| 789 | 23 | 23 ✓ | ✓ |  | 2 |
| 789 | 69 | 69 ✓ | ✓ |  | 2 |
| 791 | 219 | 219 ✓ | ✓ |  | 2 |
| 792 | 118 | 118 ✓ | ✓ |  | 2 |
| 793 | 136 | 136 ✓ | ✓ |  | 2 |
| 794 | 10,5 | 10,5 ✓ | ✓ |  | 2 |
| 796 | 39,7 | 39,7 ✓ | ✓ |  | 2 |
| 797 | 4,4 | 44  | ✓ |  | 1 |
| 800 | 958 | 958 ✓ | ✓ |  | 2 |
| 802 | 517 | 517 ✓ | ✓ |  | 2 |
| 814 | 745 | 745 ✓ | ✓ |  | 2 |
| 815 | 22 | 22 ✓ | ✓ |  | 2 |
| 816 | 64 | 64 ✓ | ✓ |  | 2 |
| 816 | 211 | 211 ✓ | ✓ |  | 2 |
| 818 | 114 | 114 ✓ | ✓ |  | 2 |
| 818 | 131 | 131 ✓ | ✓ |  | 2 |
| 821 | 9,8 | 98  | ✓ |  | 1 |
| 821 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 824 | 4,7 | 47  | ✓ |  | 1 |
| 826 | 990 | 990 ✓ | ✓ |  | 2 |
| 828 | 534 | 534 ✓ | ✓ |  | 2 |
| 843 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 844 | 847 | 847 ✓ | ✓ |  | 2 |
| 846 | 25 | 25 ✓ | ✓ |  | 2 |
| 846 | 73 | 73 ✓ | ✓ |  | 2 |
| 847 | 224 | 224 ✓ | ✓ |  | 2 |
| 849 | 121 | 121 ✓ | ✓ |  | 2 |
| 850 | 139 | 139 ✓ | ✓ |  | 2 |
| 850 | 11,1 | 11,1 ✓ | ✓ |  | 2 |
| 852 | 42,0 | 42,0 ✓ | ✓ |  | 2 |
| 854 | 4,1 | 41  | ✓ |  | 1 |
| 857 | 925 | 925 ✓ | ✓ |  | 2 |
| 858 | 500 | 500 ✓ | ✓ |  | 2 |
| 870 | 813 | 813 ✓ | ✓ |  | 2 |
| 872 | 24 | 24 ✓ | ✓ |  | 2 |
| 873 | 69 | 69 ✓ | ✓ |  | 2 |
| 874 | 219 | 219 ✓ | ✓ |  | 2 |
| 875 | 118 | 118 ✓ | ✓ |  | 2 |
| 876 | 136 | 136 ✓ | ✓ |  | 2 |
| 877 | 10,5 | 10,5 ✓ | ✓ |  | 2 |
| 878 | 39,7 | 39,7 ✓ | ✓ |  | 2 |
| 880 | 4,4 | 4,4 ✓ | ✓ |  | 2 |
| 883 | 958 | 958 ✓ | ✓ |  | 2 |
| 884 | 517 | 517 ✓ | ✓ |  | 2 |
| 896 | 779 | 779 ✓ | ✓ |  | 2 |
| 898 | 23 | 23 ✓ | ✓ |  | 2 |
| 898 | 65 | 65 ✓ | ✓ |  | 2 |
| 900 | 212 | ZAZ  | ✓ |  | 1 |
| 901 | 115 | TTS  | ✓ |  | 1 |
| 902 | 132 | 132 ✓ | ✓ |  | 2 |
| 903 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 904 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 907 | 4,7 | 4,7 ✓ | ✓ |  | 2 |
| 909 | 990 | 990 ✓ | ✓ |  | 2 |
| 911 | 534 | 534 ✓ | ✓ |  | 2 |
| 923 | 745 | 745 ✓ | ✓ |  | 2 |
| 924 | 22 | 2  | ✓ |  | 1 |
| 925 | 60 | 60 ✓ | ✓ |  | 2 |
| 925 | 206 | 206 ✓ | ✓ |  | 2 |
| 926 | 111 | 141  | ✓ |  | 1 |
| 928 | 128 | 128 ✓ | ✓ |  | 2 |
| 929 | 9,2 | 92  | ✓ |  | 1 |
| 931 | 34,8 | 34.8 ✓ | ✓ |  | 2 |
| 933 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 935 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 937 | 552 | 552 ✓ | ✓ |  | 2 |
| 953 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 954 | 847 | 847 ✓ | ✓ |  | 2 |
| 956 | 25 | 25 ✓ | ✓ |  | 2 |
| 957 | 68 | 68 ✓ | ✓ |  | 2 |
| 956 | 217 | 217 ✓ | ✓ |  | 2 |
| 958 | 117 | 117 ✓ | ✓ |  | 2 |
| 960 | 135 | 135 ✓ | ✓ |  | 2 |
| 961 | 10,4 | 10,4 ✓ | ✓ |  | 2 |
| 963 | 39,4 | 39,4 ✓ | ✓ |  | 2 |
| 964 | 4,4 | 4A  | ✓ |  | 1 |
| 966 | 966 | 966 ✓ | ✓ |  | 2 |
| 968 | 521 | 527  | ✓ |  | 1 |
| 980 | 813 | 813 ✓ | ✓ |  | 2 |
| 982 | 24 | 24 ✓ | ✓ |  | 2 |
| 982 | 64 | 64 ✓ | ✓ |  | 2 |
| 983 | 211 | 211 ✓ | ✓ |  | 2 |
| 984 | 114 | 114 ✓ | ✓ |  | 2 |
| 985 | 131 | 131 ✓ | ✓ |  | 2 |
| 987 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 989 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 990 | 4,7 | 4,/  | ✓ |  | 1 |
| 993 | 990 | 990 ✓ | ✓ |  | 2 |
| 994 | 534 | 534 ✓ | ✓ |  | 2 |
| 1006 | 779 | 779 ✓ | ✓ |  | 2 |
| 1007 | 23 | 23 ✓ | ✓ |  | 2 |
| 1008 | 60 | 60 ✓ | ✓ |  | 2 |
| 1009 | 206 | 206 ✓ | ✓ |  | 2 |
| 1011 | 111 | 111 ✓ | ✓ |  | 2 |
| 1011 | 128 | 128 ✓ | ✓ |  | 2 |
| 1013 | 9,2 | 9,2 ✓ | ✓ |  | 2 |
| 1015 | 34,8 | 34,8 ✓ | ✓ |  | 2 |
| 1017 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 1018 | 1030 | 1030 ✓ | ✓ |  | 2 |
| 1020 | 556 | 556 ✓ | ✓ |  | 2 |
| 1032 | 745 | 745 ✓ | ✓ |  | 2 |
| 1034 | 22 | 22 ✓ | ✓ |  | 2 |
| 1034 | 56 | 56 ✓ | ✓ |  | 2 |
| 1035 | 198 | 198 ✓ | ✓ |  | 2 |
| 1036 | 107 | 107 ✓ | ✓ |  | 2 |
| 1038 | 123 | 123 ✓ | ✓ |  | 2 |
| 1039 | 8,6 | 86  | ✓ |  | 1 |
| 1040 | 32,6 | 32,6 ✓ | ✓ |  | 2 |
| 1042 | 5,3 | –  | ✓ |  | 1 |
| 1044 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 1045 | 574 | 574 ✓ | ✓ |  | 2 |
| 1063 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1063 | 847 | 847 ✓ | ✓ |  | 2 |
| 1065 | 25 | 25 ✓ | ✓ |  | 2 |
| 1066 | 63 | 63 ✓ | ✓ |  | 2 |
| 1066 | 211 | 211 ✓ | ✓ |  | 2 |
| 1067 | 114 | 114 ✓ | ✓ |  | 2 |
| 1069 | 131 | 131 ✓ | ✓ |  | 2 |
| 1070 | 9,7 | 9,7 ✓ | ✓ |  | 2 |
| 1072 | 36,7 | 36,7 ✓ | ✓ |  | 2 |
| 1074 | 4,8 | 4,8 ✓ | ✓ |  | 2 |
| 1075 | 998 | 998 ✓ | ✓ |  | 2 |
| 1077 | 539 | 539 ✓ | ✓ |  | 2 |
| 1089 | 813 | 813 ✓ | ✓ |  | 2 |
| 1091 | 24 | 24 ✓ | ✓ |  | 2 |
| 1092 | 60 | 60 ✓ | ✓ |  | 2 |
| 1092 | 204 | 204 ✓ | ✓ |  | 2 |
| 1093 | 110 | 110 ✓ | ✓ |  | 2 |
| 1095 | 127 | 127 ✓ | ✓ |  | 2 |
| 1096 | 9,1 | 9,1 ✓ | ✓ |  | 2 |
| 1097 | 34,4 | 34,4 ✓ | ✓ |  | 2 |
| 1099 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 1101 | 1030 | 1030 ✓ | ✓ |  | 2 |
| 1103 | 556 | 556 ✓ | ✓ |  | 2 |
| 1114 | 779 | 779 ✓ | ✓ |  | 2 |
| 1116 | 23 | 23 ✓ | ✓ |  | 2 |
| 1117 | 56 | 56 ✓ | ✓ |  | 2 |
| 1118 | 198 | 198 ✓ | ✓ |  | 2 |
| 1119 | 107 | 107 ✓ | ✓ |  | 2 |
| 1120 | 123 | 123 ✓ | ✓ |  | 2 |
| 1121 | 8,6 | 8,6 ✓ | ✓ |  | 2 |
| 1123 | 32,6 | 32,6 ✓ | ✓ |  | 2 |
| 1125 | 5,4 | 54  | ✓ |  | 1 |
| 1127 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 1128 | 574 | 574 ✓ | ✓ |  | 2 |
| 1141 | 745 | 745 ✓ | ✓ |  | 2 |
| 1142 | 22 | 22 ✓ | ✓ |  | 2 |
| 1143 | 52 | 52 ✓ | ✓ |  | 2 |
| 1143 | 192 | 192 ✓ | ✓ |  | 2 |
| 1145 | 103 | 103 ✓ | ✓ |  | 2 |
| 1145 | 119 | 119 ✓ | ✓ |  | 2 |
| 1146 | 8,0 | 8,0 ✓ | ✓ |  | 2 |
| 1149 | 30,3 | 30,3 ✓ | ✓ |  | 2 |
| 1151 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 1152 | 1094 | 1094 ✓ | ✓ |  | 2 |
| 1154 | 591 | 591 ✓ | ✓ |  | 2 |
| 1166 | 711 | 711 ✓ | ✓ |  | 2 |
| 1168 | 21 | 21 ✓ | ✓ |  | 2 |
| 1169 | 48 | 48 ✓ | ✓ |  | 2 |
| 1169 | 183 | 183 ✓ | ✓ |  | 2 |
| 1171 | 99 | 99 ✓ | ✓ |  | 2 |
| 1170 | 114 | 114 ✓ | ✓ |  | 2 |
| 1172 | 7,5 | 7,5 ✓ | ✓ |  | 2 |
| 1174 | 28,4 | 28,4 ✓ | ✓ |  | 2 |
| 1177 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 1178 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 1180 | 604 | 604 ✓ | ✓ |  | 2 |
| 1192 | 677 | 677 ✓ | ✓ |  | 2 |
| 1194 | 20 | 20 ✓ | ✓ |  | 2 |
| 1195 | 44 | 44 ✓ | ✓ |  | 2 |
| 1195 | 174 | 174 ✓ | ✓ |  | 2 |
| 1196 | 94 | 94 ✓ | ✓ |  | 2 |
| 1197 | 108 | 108 ✓ | ✓ |  | 2 |
| 1198 | 7,0 | 7,0 ✓ | ✓ |  | 2 |
| 1200 | 26,5 | 26,5 ✓ | ✓ |  | 2 |
| 1202 | 6,6 | 6,6 ✓ | ✓ |  | 2 |
| 1204 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 1205 | 617 | 617 ✓ | ✓ |  | 2 |
| 1218 | 643 | 643 ✓ | ✓ |  | 2 |
| 1219 | 19 | 19 ✓ | ✓ |  | 2 |
| 1220 | 41 | 41 ✓ | ✓ |  | 2 |
| 1221 | 164 | 164 ✓ | ✓ |  | 2 |
| 1222 | 89 | 89 ✓ | ✓ |  | 2 |
| 1222 | 102 | 102 ✓ | ✓ |  | 2 |
| 1224 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 1226 | 24,6 | 24,6 ✓ | ✓ |  | 2 |
| 1227 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 1229 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 1231 | 626 | 626 ✓ | ✓ |  | 2 |
| 1244 | 610 | 610 ✓ | ✓ |  | 2 |
| 1245 | 18 | 18 ✓ | ✓ |  | 2 |
| 1245 | 37 | 37 ✓ | ✓ |  | 2 |
| 1247 | 151 | 151 ✓ | ✓ |  | 2 |
| 1248 | 82 | B2  | ✓ |  | 1 |
| 1248 | 94 | 94 ✓ | ✓ |  | 2 |
| 1250 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 1251 | 22,7 | 22,7 ✓ | ✓ |  | 2 |
| 1252 | 7,7 | 7,7 ✓ | ✓ |  | 2 |
| 1255 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 1257 | 626 | 626 ✓ | ✓ |  | 2 |

### Pagina 5-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 447 | 5-3 | S-3  | ✓ |  | 1 |
| 484 | 2 | 2 ✓ | ✓ |  | 2 |
| 1309 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 1309 | 2 | 2 ✓ | ✓ |  | 2 |
| 1309 | 5). | 5). ✓ | ✓ |  | 2 |
| 319 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 360 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 410 | 46 | 46 ✓ | ✓ |  | 2 |
| 410 | (174 | (174 ✓ | ✓ |  | 2 |
| 1202 | 1 | 1 ✓ | ✓ |  | 2 |
| 541 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 541 | 779 | 779 ✓ | ✓ |  | 2 |
| 541 | 23 | 23 ✓ | ✓ |  | 2 |
| 541 | 75 | 75 ✓ | ✓ |  | 2 |
| 541 | 232 | 232 ✓ | ✓ |  | 2 |
| 541 | 125 | 125 ✓ | ✓ |  | 2 |
| 542 | 144 | 144 ✓ | ✓ |  | 2 |
| 541 | 11,4 | 11,4 ✓ | ✓ |  | 2 |
| 541 | 43,2 | 43,2 ✓ | ✓ |  | 2 |
| 541 | 4,0 | 4.0 ✓ | ✓ |  | 2 |
| 541 | 933 | 933 ✓ | ✓ |  | 2 |
| 541 | 504 | 504 ✓ | ✓ |  | 2 |
| 567 | 745 | 745 ✓ | ✓ |  | 2 |
| 567 | 22 | 22 ✓ | ✓ |  | 2 |
| 567 | 71 | 71 ✓ | ✓ |  | 2 |
| 568 | 225 | 225 ✓ | ✓ |  | 2 |
| 567 | 122 | 122 ✓ | ✓ |  | 2 |
| 567 | 140 | 140 ✓ | ✓ |  | 2 |
| 566 | 10,7 | 10,7 ✓ | ✓ |  | 2 |
| 567 | 40,5 | 40,5 ✓ | ✓ |  | 2 |
| 567 | 4,3 | 4,3 ✓ | ✓ |  | 2 |
| 567 | 966 | 966 ✓ | ✓ |  | 2 |
| 567 | 521 | 521 ✓ | ✓ |  | 2 |
| 592 | 711 | 711 ✓ | ✓ |  | 2 |
| 593 | 21 | 21 ✓ | ✓ |  | 2 |
| 593 | 66 | 66 ✓ | ✓ |  | 2 |
| 593 | 219 | 219 ✓ | ✓ |  | 2 |
| 593 | 118 | 118 ✓ | ✓ |  | 2 |
| 592 | 136 | 136 ✓ | ✓ |  | 2 |
| 592 | 10,0 | 10,0 ✓ | ✓ |  | 2 |
| 593 | 37,9 | 37,9 ✓ | ✓ |  | 2 |
| 593 | 4,6 | 4.6 ✓ | ✓ |  | 2 |
| 593 | 998 | 998 ✓ | ✓ |  | 2 |
| 593 | 539 | 539 ✓ | ✓ |  | 2 |
| 618 | 677 | 677 ✓ | ✓ |  | 2 |
| 619 | 20 | 20 ✓ | ✓ |  | 2 |
| 619 | 61 | 61 ✓ | ✓ |  | 2 |
| 620 | 211 | 211 ✓ | ✓ |  | 2 |
| 619 | 114 | 114 ✓ | ✓ |  | 2 |
| 618 | 131 | 131 ✓ | ✓ |  | 2 |
| 619 | 9,3 | 93  | ✓ |  | 1 |
| 618 | 35,2 | 35,2 ✓ | ✓ |  | 2 |
| 619 | 4,9 | 49  | ✓ |  | 1 |
| 619 | 1038 | 1038 ✓ | ✓ |  | 2 |
| 619 | 560 | 560 ✓ | ✓ |  | 2 |
| 649 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 648 | 779 | 779 ✓ | ✓ |  | 2 |
| 648 | 23 | 23 ✓ | ✓ |  | 2 |
| 649 | 72 | 72 ✓ | ✓ |  | 2 |
| 648 | 227 | 227 ✓ | ✓ |  | 2 |
| 649 | 123 | 123 ✓ | ✓ |  | 2 |
| 649 | 141 | 141 ✓ | ✓ |  | 2 |
| 649 | 11,0 | 11,0 ✓ | ✓ |  | 2 |
| 649 | 41,6 | 416  | ✓ |  | 1 |
| 649 | 4,2 | 42  | ✓ |  | 1 |
| 649 | 958 | 958 ✓ | ✓ |  | 2 |
| 649 | 517 | 517 ✓ | ✓ |  | 2 |
| 674 | 745 | 745 ✓ | ✓ |  | 2 |
| 675 | 22 | 22 ✓ | ✓ |  | 2 |
| 675 | 68 | 68 ✓ | ✓ |  | 2 |
| 675 | 220 | 220 ✓ | ✓ |  | 2 |
| 675 | 119 | 119 ✓ | ✓ |  | 2 |
| 675 | 137 | 137 ✓ | ✓ |  | 2 |
| 675 | 10,3 | 10,3 ✓ | ✓ |  | 2 |
| 675 | 39,0 | 39,0 ✓ | ✓ |  | 2 |
| 675 | 4,5 | 4,5 ✓ | ✓ |  | 2 |
| 675 | 990 | 990 ✓ | ✓ |  | 2 |
| 675 | 534 | 534 ✓ | ✓ |  | 2 |
| 700 | 711 | 711 ✓ | ✓ |  | 2 |
| 701 | 21 | ZN  | ✓ |  | 1 |
| 701 | 63 | 63 ✓ | ✓ |  | 2 |
| 701 | 214 | 214 ✓ | ✓ |  | 2 |
| 701 | 116 | 116 ✓ | ✓ |  | 2 |
| 701 | 133 | 133 ✓ | ✓ |  | 2 |
| 701 | 9,6 | 9,6 ✓ | ✓ |  | 2 |
| 701 | 36,3 | 36,3 ✓ | ✓ |  | 2 |
| 702 | 4,8 | 48  | ✓ |  | 1 |
| 702 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 702 | 552 | 552 ✓ | ✓ |  | 2 |
| 726 | 677 | 677 ✓ | ✓ |  | 2 |
| 727 | 20 | 20 ✓ | ✓ |  | 2 |
| 727 | 58 | 38  | ✓ |  | 1 |
| 727 | 206 | 206 ✓ | ✓ |  | 2 |
| 736 | 111 | –  | ✓ |  | 1 |
| 727 | 128 | 128 ✓ | ✓ |  | 2 |
| 727 | 8,9 | 8,9 ✓ | ✓ |  | 2 |
| 727 | 33,7 | 33,7 ✓ | ✓ |  | 2 |
| 727 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 728 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 728 | 574 | 574 ✓ | ✓ |  | 2 |
| 758 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 756 | 779 | 779 ✓ | ✓ |  | 2 |
| 757 | 23 | ref  | ✓ |  | 1 |
| 757 | 68 | 68 ✓ | ✓ |  | 2 |
| 758 | 220 | 220 ✓ | ✓ |  | 2 |
| 757 | 119 | 119 ✓ | ✓ |  | 2 |
| 757 | 137 | 137 ✓ | ✓ |  | 2 |
| 758 | 10,3 | 10,3 ✓ | ✓ |  | 2 |
| 758 | 39,0 | 39,0 ✓ | ✓ |  | 2 |
| 759 | 4,5 | 4,5 ✓ | ✓ |  | 2 |
| 759 | 990 | 990 ✓ | ✓ |  | 2 |
| 759 | 534 | 534 ✓ | ✓ |  | 2 |
| 783 | 745 | 745 ✓ | ✓ |  | 2 |
| 783 | 22 | 22 ✓ | ✓ |  | 2 |
| 783 | 63 | 63 ✓ | ✓ |  | 2 |
| 783 | 214 | 214 ✓ | ✓ |  | 2 |
| 783 | 116 | 116 ✓ | ✓ |  | 2 |
| 784 | 133 | 133 ✓ | ✓ |  | 2 |
| 783 | 9,7 | 9,7 ✓ | ✓ |  | 2 |
| 784 | 36,7 | 36,7 ✓ | ✓ |  | 2 |
| 784 | 4,8 | 48  | ✓ |  | 1 |
| 785 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 785 | 552 | 552 ✓ | ✓ |  | 2 |
| 809 | 711 | 711 ✓ | ✓ |  | 2 |
| 810 | 21 | 21 ✓ | ✓ |  | 2 |
| 808 | 59 | 59 ✓ | ✓ |  | 2 |
| 810 | 208 | 208 ✓ | ✓ |  | 2 |
| 809 | 112 | 112 ✓ | ✓ |  | 2 |
| 810 | 129 | 129 ✓ | ✓ |  | 2 |
| 809 | 9,0 | 9,0 ✓ | ✓ |  | 2 |
| 810 | 34,1 | 34,1 ✓ | ✓ |  | 2 |
| 810 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 810 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 810 | 569 | 569 ✓ | ✓ |  | 2 |
| 834 | 677 | 677 ✓ | ✓ |  | 2 |
| 835 | 20 | 20 ✓ | ✓ |  | 2 |
| 834 | 55 | 55 ✓ | ✓ |  | 2 |
| 835 | 200 | 200 ✓ | ✓ |  | 2 |
| 835 | 108 | 108 ✓ | ✓ |  | 2 |
| 836 | 124 | 124 ✓ | ✓ |  | 2 |
| 835 | 8,4 | 8.4 ✓ | ✓ |  | 2 |
| 836 | 31,8 | 31,8 ✓ | ✓ |  | 2 |
| 836 | 5,5 | 55  | ✓ |  | 1 |
| 836 | 1094 | 1094 ✓ | ✓ |  | 2 |
| 837 | 591 | 591 ✓ | ✓ |  | 2 |
| 867 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 866 | 779 | 779 ✓ | ✓ |  | 2 |
| 867 | 23 | 23 ✓ | ✓ |  | 2 |
| 866 | 63, | 63 ✓ | ✓ |  | 2 |
| 868 | 214 | 214 ✓ | ✓ |  | 2 |
| 866 | 116 | 116 ✓ | ✓ |  | 2 |
| 867 | 133 | 133 ✓ | ✓ |  | 2 |
| 867 | 9,7 | 9,7 ✓ | ✓ |  | 2 |
| 867 | 36,7 | 36,7 ✓ | ✓ |  | 2 |
| 867 | 4,8 | 48  | ✓ |  | 1 |
| 867 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 868 | 552 | 552 ✓ | ✓ |  | 2 |
| 891 | 745 | 745 ✓ | ✓ |  | 2 |
| 892 | 22 | 22 ✓ | ✓ |  | 2 |
| 891 | 59 | 59 ✓ | ✓ |  | 2 |
| 893 | 208 | 208 ✓ | ✓ |  | 2 |
| 891 | 112 | 112 ✓ | ✓ |  | 2 |
| 893 | 129 | 129 ✓ | ✓ |  | 2 |
| 892 | 9,0 | 9,0 ✓ | ✓ |  | 2 |
| 893 | 34,1 | 34,1 ✓ | ✓ |  | 2 |
| 893 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 893 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 894 | 569 | 569 ✓ | ✓ |  | 2 |
| 917 | 711 | 711 ✓ | ✓ |  | 2 |
| 918 | 21 | 21 ✓ | ✓ |  | 2 |
| 917 | 55 | 55 ✓ | ✓ |  | 2 |
| 919 | 200 | 200 ✓ | ✓ |  | 2 |
| 917 | 108 | 108 ✓ | ✓ |  | 2 |
| 918 | 124 | 124 ✓ | ✓ |  | 2 |
| 918 | 8,4 | 8,4 ✓ | ✓ |  | 2 |
| 918 | 31,8 | 31,8 ✓ | ✓ |  | 2 |
| 918 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 919 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 919 | 587 | 587 ✓ | ✓ |  | 2 |
| 943 | 677 | 677 ✓ | ✓ |  | 2 |
| 944 | 20 | 20 ✓ | ✓ |  | 2 |
| 942 | 51 | 51 ✓ | ✓ |  | 2 |
| 944 | 192 | 192 ✓ | ✓ |  | 2 |
| 943 | 103 | 103 ✓ | ✓ |  | 2 |
| 944 | 119 | 119 ✓ | ✓ |  | 2 |
| 944 | 7,9 | 79  | ✓ |  | 1 |
| 944 | 29,9 | 29,9 ✓ | ✓ |  | 2 |
| 944 | 5,8 | 5,8 ✓ | ✓ |  | 2 |
| 944 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 945 | 604 | 604 ✓ | ✓ |  | 2 |
| 976 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 975 | 779 | 779 ✓ | ✓ |  | 2 |
| 976 | 23 | –  | ✓ |  | 1 |
| 976 | 59 | 59 ✓ | ✓ |  | 2 |
| 977 | 208 | 208 ✓ | ✓ |  | 2 |
| 976 | 112 | 112 ✓ | ✓ |  | 2 |
| 976 | 129 | 129 ✓ | ✓ |  | 2 |
| 976 | 9,0 | 9,0 ✓ | ✓ |  | 2 |
| 977 | 34,1 | 34,1 ✓ | ✓ |  | 2 |
| 977 | 5,1 | 5,1 ✓ | ✓ |  | 2 |
| 977 | 1062 | 1062 ✓ | ✓ |  | 2 |
| 978 | 574 | 574 ✓ | ✓ |  | 2 |
| 1001 | 745 | 745 ✓ | ✓ |  | 2 |
| 1002 | 22 | 22 ✓ | ✓ |  | 2 |
| 1002 | 55 | 55 ✓ | ✓ |  | 2 |
| 1003 | 200 | 200 ✓ | ✓ |  | 2 |
| 1003 | 108 | 108 ✓ | ✓ |  | 2 |
| 1002 | 124 | 124 ✓ | ✓ |  | 2 |
| 1002 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 1003 | 32,2 | 32,2 ✓ | ✓ |  | 2 |
| 1003 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 1003 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 1003 | 587 | 587 ✓ | ✓ |  | 2 |
| 1027 | 711 | 711 ✓ | ✓ |  | 2 |
| 1028 | 21 | 21 ✓ | ✓ |  | 2 |
| 1027 | 51 | 51 ✓ | ✓ |  | 2 |
| 1028 | 193 | 193 ✓ | ✓ |  | 2 |
| 1028 | 104 | 104 ✓ | ✓ |  | 2 |
| 1028 | 120 | 120 ✓ | ✓ |  | 2 |
| 1028 | 7,9 | 7,9 ✓ | ✓ |  | 2 |
| 1028 | 29,9 | 29,9 ✓ | ✓ |  | 2 |
| 1029 | 5,8 | 5,8 ✓ | ✓ |  | 2 |
| 1028 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 1029 | 604 | 604 ✓ | ✓ |  | 2 |
| 1052 | 677 | 677 ✓ | ✓ |  | 2 |
| 1054 | 20 | 20 ✓ | ✓ |  | 2 |
| 1053 | 47 | 47 ✓ | ✓ |  | 2 |
| 1054 | 183 | 183 ✓ | ✓ |  | 2 |
| 1054 | 99 | 99 ✓ | ✓ |  | 2 |
| 1053 | 114 | 114 ✓ | ✓ |  | 2 |
| 1053 | 7,4 | 7,4 ✓ | ✓ |  | 2 |
| 1054 | 28,0 | 28,0 ✓ | ✓ |  | 2 |
| 1055 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 1054 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 1055 | 617 | 617 ✓ | ✓ |  | 2 |
| 1079 | 643 | 643 ✓ | ✓ |  | 2 |
| 1079 | 19 | 19 ✓ | ✓ |  | 2 |
| 1079 | 43 | 43 ✓ | ✓ |  | 2 |
| 1080 | 174 | 174 ✓ | ✓ |  | 2 |
| 1080 | 94 | 94 ✓ | ✓ |  | 2 |
| 1079 | 108 | 108 ✓ | ✓ |  | 2 |
| 1079 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 1080 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 1081 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 1080 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 1081 | 626 | 626 ✓ | ✓ |  | 2 |
| 1105 | 610 | 610 ✓ | ✓ |  | 2 |
| 1105 | 18 | 18 ✓ | ✓ |  | 2 |
| 1105 | 40 | 40 ✓ | ✓ |  | 2 |
| 1106 | 161 | 161 ✓ | ✓ |  | 2 |
| 1106 | 87 | 87 ✓ | ✓ |  | 2 |
| 1105 | 100 | 100 ✓ | ✓ |  | 2 |
| 1105 | 6,4 | 6,4 ✓ | ✓ |  | 2 |
| 1106 | 24,2 | 24,2 ✓ | ✓ |  | 2 |
| 1107 | 7,2 | 42  | ✓ |  | 1 |
| 1106 | 1175 | 1175 ✓ | ✓ |  | 2 |
| 1106 | 634 | 634 ✓ | ✓ |  | 2 |
| 1130 | 576 | 576 ✓ | ✓ |  | 2 |
| 1131 | 17 | 17 ✓ | ✓ |  | 2 |
| 1131 | 36 | 36 ✓ | ✓ |  | 2 |
| 1132 | 150 | 150 ✓ | ✓ |  | 2 |
| 1132 | 81 | 81 ✓ | ✓ |  | 2 |
| 1131 | 93 | 93 ✓ | ✓ |  | 2 |
| 1131 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 1132 | 22,3 | 22,3 ✓ | ✓ |  | 2 |
| 1132 | 7,8 | 7,8 ✓ | ✓ |  | 2 |
| 1131 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 1133 | 630 | 630 ✓ | ✓ |  | 2 |

### Pagina 5-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 480 | 5-4 | 54  | ✓ |  | 1 |
| 516 | 2 | 2 ✓ | ✓ |  | 2 |
| 1410 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 1408 | 3 | 3 ✓ | ✓ |  | 2 |
| 1407 | 5). | 5). ✓ | ✓ |  | 2 |
| 420 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 461 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 504 | 46 | AG  | ✓ |  | 1 |
| 504 | (174 | (174 ✓ | ✓ |  | 2 |
| 1296 | 1 | J  | ✓ |  | 1 |
| 647 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 646 | 711 | 711 ✓ | ✓ |  | 2 |
| 646 | 21 | 21 ✓ | ✓ |  | 2 |
| 645 | 69 | 69 ✓ | ✓ |  | 2 |
| 643 | 229 | 229 ✓ | ✓ |  | 2 |
| 643 | 123 | 123 ✓ | ✓ |  | 2 |
| 642 | 142 | 142 ✓ | ✓ |  | 2 |
| 640 | 10,5 | 10,5 ✓ | ✓ |  | 2 |
| 638 | 39,7 | 39,7 ✓ | ✓ |  | 2 |
| 637 | 4,4 | 4A  | ✓ |  | 1 |
| 635 | 998 | 998 ✓ | ✓ |  | 2 |
| 633 | 539 | 539 ✓ | ✓ |  | 2 |
| 672 | 677 | 677 ✓ | ✓ |  | 2 |
| 672 | 20 | 20 ✓ | ✓ |  | 2 |
| 670 | 64 | 64 ✓ | ✓ |  | 2 |
| 669 | 220 | 220 ✓ | ✓ |  | 2 |
| 668 | 119 | 119 ✓ | ✓ |  | 2 |
| 667 | 137 | 137 ✓ | ✓ |  | 2 |
| 666 | 9,8 | 9,8 ✓ | ✓ |  | 2 |
| 664 | 37,1 | 37,1 ✓ | ✓ |  | 2 |
| 662 | 4,7 | 4,7 ✓ | ✓ |  | 2 |
| 661 | 1030 | 1030 ✓ | ✓ |  | 2 |
| 659 | 556 | 556 ✓ | ✓ |  | 2 |
| 698 | 643 | 643 ✓ | ✓ |  | 2 |
| 697 | 19 | 19 ✓ | ✓ |  | 2 |
| 697 | 60 | 60 ✓ | ✓ |  | 2 |
| 695 | 212 | 212 ✓ | ✓ |  | 2 |
| 694 | 115 | 175  | ✓ |  | 1 |
| 694 | 132 | 132 ✓ | ✓ |  | 2 |
| 691 | 9,1 | 9,1 ✓ | ✓ |  | 2 |
| 690 | 34,4 | 34,4 ✓ | ✓ |  | 2 |
| 688 | 5,1 | a  | ✓ |  | 1 |
| 687 | 1070 | 1070 ✓ | ✓ |  | 2 |
| 684 | 578 | 578 ✓ | ✓ |  | 2 |
| 724 | 610 | 610 ✓ | ✓ |  | 2 |
| 723 | 18 | 18 ✓ | ✓ |  | 2 |
| 722 | 55 | 95  | ✓ |  | 1 |
| 721 | 203 | 203 ✓ | ✓ |  | 2 |
| 720 | 109 | 109 ✓ | ✓ |  | 2 |
| 720 | 126 | 126 ✓ | ✓ |  | 2 |
| 718 | 8,4 | 8,4 ✓ | ✓ |  | 2 |
| 716 | 31,8 | 31,8 ✓ | ✓ |  | 2 |
| 714 | 5,5 | 5,5 ✓ | ✓ |  | 2 |
| 713 | 1110 | 1110 ✓ | ✓ |  | 2 |
| 711 | 600 | 600 ✓ | ✓ |  | 2 |
| 756 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 754 | 711 | 711 ✓ | ✓ |  | 2 |
| 754 | 21 | 21 ✓ | ✓ |  | 2 |
| 753 | 66 | 66 ✓ | ✓ |  | 2 |
| 752 | 224 | 224 ✓ | ✓ |  | 2 |
| 751 | 121 | 121 ✓ | ✓ |  | 2 |
| 749 | 139 | 139 ✓ | ✓ |  | 2 |
| 749 | 10,1 | 10,1 ✓ | ✓ |  | 2 |
| 748 | 38,2 | 38,2 ✓ | ✓ |  | 2 |
| 746 | 4,6 | 4,6 ✓ | ✓ |  | 2 |
| 744 | 1022 | 1022 ✓ | ✓ |  | 2 |
| 742 | 552 | 552 ✓ | ✓ |  | 2 |
| 780 | 677 | 677 ✓ | ✓ |  | 2 |
| 780 | 20 | 20 ✓ | ✓ |  | 2 |
| 778 | 62 | 62 ✓ | ✓ |  | 2 |
| 778 | 216 | 216 ✓ | ✓ |  | 2 |
| 776 | 116 | 116 ✓ | ✓ |  | 2 |
| 775 | 134 | 134 ✓ | ✓ |  | 2 |
| 774 | 9,4 | 9,4 ✓ | ✓ |  | 2 |
| 774 | 35,6 | 35,6 ✓ | ✓ |  | 2 |
| 772 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 770 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 768 | 569 | 569 ✓ | ✓ |  | 2 |
| 807 | 643 | 643 ✓ | ✓ |  | 2 |
| 805 | 19 | 19 ✓ | ✓ |  | 2 |
| 804 | 57 | 57 ✓ | ✓ |  | 2 |
| 804 | 208 | 208 ✓ | ✓ |  | 2 |
| 803 | 112 | 112 ✓ | ✓ |  | 2 |
| 802 | 129 | 129 ✓ | ✓ |  | 2 |
| 801 | 8,7 | 8,7 ✓ | ✓ |  | 2 |
| 800 | 32,9 | 32,9 ✓ | ✓ |  | 2 |
| 798 | 5,3 | 5,3 ✓ | ✓ |  | 2 |
| 796 | 1094 | 1094 ✓ | ✓ |  | 2 |
| 794 | 591 | 591 ✓ | ✓ |  | 2 |
| 832 | 610 | 610 ✓ | ✓ |  | 2 |
| 832 | 18 | 18 ✓ | ✓ |  | 2 |
| 830 | 52 | 52 ✓ | ✓ |  | 2 |
| 829 | 198 | 198 ✓ | ✓ |  | 2 |
| 828 | 107 | 107 ✓ | ✓ |  | 2 |
| 827 | 123 | 123 ✓ | ✓ |  | 2 |
| 826 | 8,0 | 8,0 ✓ | ✓ |  | 2 |
| 826 | 30,3 | 30,3 ✓ | ✓ |  | 2 |
| 824 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 822 | 1127 | 1127 ✓ | ✓ |  | 2 |
| 820 | 608 | 608 ✓ | ✓ |  | 2 |
| 863 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 862 | 711 | 711 ✓ | ✓ |  | 2 |
| 862 | 21 | 21 ✓ | ✓ |  | 2 |
| 860 | 62 | –  | ✓ |  | 1 |
| 860 | 217 | 27  | ✓ |  | 1 |
| 858 | 117 | 17  | ✓ |  | 1 |
| 857 | 135 | 135 ✓ | ✓ |  | 2 |
| 857 | 9,5 | 9,5 ✓ | ✓ |  | 2 |
| 856 | 36,0 | 36,0 ✓ | ✓ |  | 2 |
| 854 | 4,9 | –  | ✓ |  | 1 |
| 852 | 1054 | 1054 ✓ | ✓ |  | 2 |
| 851 | 569 | 569 ✓ | ✓ |  | 2 |
| 888 | 677 | 677 ✓ | ✓ |  | 2 |
| 888 | 20 | 20 ✓ | ✓ |  | 2 |
| 886 | 58 | 58 ✓ | ✓ |  | 2 |
| 886 | 209 | 209 ✓ | ✓ |  | 2 |
| 884 | 113 | 113 ✓ | ✓ |  | 2 |
| 884 | 130 | 130 ✓ | ✓ |  | 2 |
| 883 | 8,8 | 8,8 ✓ | ✓ |  | 2 |
| 882 | 33,3 | 33,3 ✓ | ✓ |  | 2 |
| 880 | 5,2 | Be  | ✓ |  | 1 |
| 879 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 877 | 587 | 587 ✓ | ✓ |  | 2 |
| 914 | 643 | 643 ✓ | ✓ |  | 2 |
| 913 | 19 | 19 ✓ | ✓ |  | 2 |
| 912 | 53 | 53 ✓ | ✓ |  | 2 |
| 911 | 201 | 201 ✓ | ✓ |  | 2 |
| 910 | 109 | 109 ✓ | ✓ |  | 2 |
| 910 | 125 | 125 ✓ | ✓ |  | 2 |
| 909 | 8,2 | 8,2 ✓ | ✓ |  | 2 |
| 908 | 31,0 | 31,0 ✓ | ✓ |  | 2 |
| 906 | 5,6 | 5,6 ✓ | ✓ |  | 2 |
| 904 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 903 | 604 | 604 ✓ | ✓ |  | 2 |
| 941 | 610 | 610 ✓ | ✓ |  | 2 |
| 940 | 18 | 18 ✓ | ✓ |  | 2 |
| 938 | 49 | 49 ✓ | ✓ |  | 2 |
| 938 | 190 | 190 ✓ | ✓ |  | 2 |
| 937 | 103 | 103 ✓ | ✓ |  | 2 |
| 936 | 118 | 118 ✓ | ✓ |  | 2 |
| 935 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 934 | 28,8 | 28,8 ✓ | ✓ |  | 2 |
| 932 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 930 | 1151 | 1151 ✓ | ✓ |  | 2 |
| 929 | 621 | 621 ✓ | ✓ |  | 2 |
| 972 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 971 | 711 | 711 ✓ | ✓ |  | 2 |
| 971 | 21 | 21 ✓ | ✓ |  | 2 |
| 970 | 58 | 58 ✓ | ✓ |  | 2 |
| 970 | 209 | 209 ✓ | ✓ |  | 2 |
| 968 | 113 | 113 ✓ | ✓ |  | 2 |
| 968 | 130 | 130 ✓ | ✓ |  | 2 |
| 967 | 8,9 | 8,9 ✓ | ✓ |  | 2 |
| 965 | 33,7 | 33,7 ✓ | ✓ |  | 2 |
| 964 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 962 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 960 | 587 | 587 ✓ | ✓ |  | 2 |
| 997 | 677 | 677 ✓ | ✓ |  | 2 |
| 997 | 20 | 20 ✓ | ✓ |  | 2 |
| 996 | 54 | 54 ✓ | ✓ |  | 2 |
| 995 | 201 | 201 ✓ | ✓ |  | 2 |
| 995 | 109 | 109 ✓ | ✓ |  | 2 |
| 994 | 125 | 125 ✓ | ✓ |  | 2 |
| 993 | 8,3 | 8,3 ✓ | ✓ |  | 2 |
| 991 | 31,4 | 31,4 ✓ | ✓ |  | 2 |
| 990 | 5,6 | 5,6 ✓ | ✓ |  | 2 |
| 988 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 987 | 604 | 604 ✓ | ✓ |  | 2 |
| 1024 | 643 | 643 ✓ | ✓ |  | 2 |
| 1023 | 19 | 19 ✓ | ✓ |  | 2 |
| 1022 | 50 | 50 ✓ | ✓ |  | 2 |
| 1022 | 192 | 192 ✓ | ✓ |  | 2 |
| 1020 | 103 | 103 ✓ | ✓ |  | 2 |
| 1019 | 119 | 119 ✓ | ✓ |  | 2 |
| 1018 | 7,7 | 77  | ✓ |  | 1 |
| 1017 | 29,1 | 29,1 ✓ | ✓ |  | 2 |
| 1016 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 1014 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 1013 | 617 | 617 ✓ | ✓ |  | 2 |
| 1050 | 610 | 610 ✓ | ✓ |  | 2 |
| 1050 | 18 | 18 ✓ | ✓ |  | 2 |
| 1048 | 45 | 45 ✓ | ✓ |  | 2 |
| 1048 | 180 | 180 ✓ | ✓ |  | 2 |
| 1046 | 97 | 97 ✓ | ✓ |  | 2 |
| 1046 | 112 | 112 ✓ | ✓ |  | 2 |
| 1043 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 1043 | 26,9 | 26,9 ✓ | ✓ |  | 2 |
| 1041 | 6,5 | 65  | ✓ |  | 1 |
| 1040 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 1039 | 630 | 630 ✓ | ✓ |  | 2 |
| 1081 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1080 | 711 | 71  | ✓ |  | 1 |
| 1079 | 21 | Fs  | ✓ |  | 1 |
| 1078 | 54 | 54 ✓ | ✓ |  | 2 |
| 1077 | 201 | 201 ✓ | ✓ |  | 2 |
| 1077 | 109 | 109 ✓ | ✓ |  | 2 |
| 1076 | 125 | 125 ✓ | ✓ |  | 2 |
| 1074 | 8,3 | 83  | ✓ |  | 1 |
| 1074 | 31,4 | 31,4 ✓ | ✓ |  | 2 |
| 1073 | 5,5 | 5.5 ✓ | ✓ |  | 2 |
| 1071 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 1070 | 604 | 604 ✓ | ✓ |  | 2 |
| 1106 | 677 | 677 ✓ | ✓ |  | 2 |
| 1105 | 20 | 20 ✓ | ✓ |  | 2 |
| 1104 | 50 | 50 ✓ | ✓ |  | 2 |
| 1103 | 193 | 193 ✓ | ✓ |  | 2 |
| 1102 | 104 | 104 ✓ | ✓ |  | 2 |
| 1102 | 120 | 120 ✓ | ✓ |  | 2 |
| 1101 | 7,8 | 7,8 ✓ | ✓ |  | 2 |
| 1100 | 29,5 | 29,5 ✓ | ✓ |  | 2 |
| 1099 | 5,9 | ay  | ✓ |  | 1 |
| 1097 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 1095 | 617 | 617 ✓ | ✓ |  | 2 |
| 1132 | 643 | 643 ✓ | ✓ |  | 2 |
| 1130 | 19 | 19 ✓ | ✓ |  | 2 |
| 1130 | 46 | 46 ✓ | ✓ |  | 2 |
| 1129 | 183 | 183 ✓ | ✓ |  | 2 |
| 1128 | 99 | 39  | ✓ |  | 1 |
| 1127 | 114 | 114 ✓ | ✓ |  | 2 |
| 1126 | 7,2 | 4  | ✓ |  | 1 |
| 1126 | 27,3 | 273  | ✓ |  | 1 |
| 1124 | 6,4 | 6,4 ✓ | ✓ |  | 2 |
| 1122 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 1121 | 626 | 626 ✓ | ✓ |  | 2 |
| 1157 | 610 | 610 ✓ | ✓ |  | 2 |
| 1156 | 18 | 18 ✓ | ✓ |  | 2 |
| 1155 | 42 | 42 ✓ | ✓ |  | 2 |
| 1154 | 172 | 172 ✓ | ✓ |  | 2 |
| 1153 | 93 | 93 ✓ | ✓ |  | 2 |
| 1153 | 107 | 107 ✓ | ✓ |  | 2 |
| 1152 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 1151 | 25,4 | 25,4 ✓ | ✓ |  | 2 |
| 1150 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 1148 | 1175 | 1175 ✓ | ✓ |  | 2 |
| 1147 | 634 | 634 ✓ | ✓ |  | 2 |
| 1183 | 576 | 576 ✓ | ✓ |  | 2 |
| 1182 | 17 | 7  | ✓ |  | 1 |
| 1181 | 38 | 38 ✓ | ✓ |  | 2 |
| 1180 | 159 | 159 ✓ | ✓ |  | 2 |
| 1180 | 86 | 86 ✓ | ✓ |  | 2 |
| 1179 | 99 | 99 ✓ | ✓ |  | 2 |
| 1178 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 1177 | 23,5 | 23,5 ✓ | ✓ |  | 2 |
| 1175 | 7,4 | 7A  | ✓ |  | 1 |
| 1174 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 1173 | 639 | 639 ✓ | ✓ |  | 2 |

### Pagina 5-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 454 | 5-5 | 3-5  | ✓ |  | 1 |
| 490 | 2 | 2 ✓ | – |  | 1 |
| 1330 | 5-1 | 5-1 ✓ | ✓ |  | 2 |
| 1328 | 4 | 4 ✓ | ✓ |  | 2 |
| 1327 | 5). | 5). ✓ | ✓ |  | 2 |
| 345 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 385 | 10000 | 10000 ✓ | ✓ |  | 2 |
| 425 | 46 | 46 ✓ | ✓ |  | 2 |
| 425 | (174 | (174 ✓ | ✓ |  | 2 |
| 1218 | 1 | 1 ✓ | ✓ |  | 2 |
| 574 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 571 | 643 | 643 ✓ | ✓ |  | 2 |
| 571 | 19 | 19 ✓ | ✓ |  | 2 |
| 569 | 63 | 63 ✓ | ✓ |  | 2 |
| 568 | 222 | 222 ✓ | ✓ |  | 2 |
| 566 | 120 | 120 ✓ | ✓ |  | 2 |
| 565 | 138 | 138 ✓ | ✓ |  | 2 |
| 564 | 9,6 | 96  | ✓ |  | 1 |
| 561 | 36,3 | 36,3 ✓ | ✓ |  | 2 |
| 559 | 4,8 | 48  | ✓ |  | 1 |
| 556 | 1070 | 4070  | ✓ |  | 1 |
| 554 | 578 | 578 ✓ | ✓ |  | 2 |
| 597 | 610 | 610 ✓ | ✓ |  | 2 |
| 596 | 18 | 18 ✓ | ✓ |  | 2 |
| 595 | 58 | 58 ✓ | ✓ |  | 2 |
| 594 | 214 | 214 ✓ | ✓ |  | 2 |
| 592 | 116 | 116 ✓ | ✓ |  | 2 |
| 591 | 133 | 133 ✓ | ✓ |  | 2 |
| 589 | 8,9 | 8,9 ✓ | ✓ |  | 2 |
| 587 | 33,7 | 33,7 ✓ | ✓ |  | 2 |
| 584 | 5,2 | 5,2 ✓ | ✓ |  | 2 |
| 582 | 1102 | 1102 ✓ | ✓ |  | 2 |
| 580 | 595 | 595 ✓ | ✓ |  | 2 |
| 624 | 576 | 576 ✓ | ✓ |  | 2 |
| 622 | 17 | 17 ✓ | ✓ |  | 2 |
| 621 | 53 | 53 ✓ | ✓ |  | 2 |
| 619 | 203 | 203 ✓ | ✓ |  | 2 |
| 618 | 109 | 109 ✓ | ✓ |  | 2 |
| 617 | 126 | 126 ✓ | ✓ |  | 2 |
| 615 | 8,2 | 8,2 ✓ | ✓ |  | 2 |
| 613 | 31,0 | 31,0 ✓ | ✓ |  | 2 |
| 611 | 5,6 | 5,6 ✓ | ✓ |  | 2 |
| 608 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 606 | 617 | 617 ✓ | ✓ |  | 2 |
| 650 | 542 | AL  | ✓ |  | 1 |
| 649 | 16 | 16 ✓ | ✓ |  | 2 |
| 647 | 48 | 48 ✓ | ✓ |  | 2 |
| 645 | 190 | 190 ✓ | ✓ |  | 2 |
| 644 | 103 | 103 ✓ | ✓ |  | 2 |
| 643 | 118 | 118 ✓ | ✓ |  | 2 |
| 641 | 7,5 | 15  | ✓ |  | 1 |
| 639 | 28,4 | 28.4 ✓ | ✓ |  | 2 |
| 637 | 6,2 | G2  | ✓ |  | 1 |
| 634 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 632 | 630 | 630 ✓ | ✓ |  | 2 |
| 682 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 680 | 643 | 643 ✓ | ✓ |  | 2 |
| 679 | 19 | 19 ✓ | ✓ |  | 2 |
| 678 | 60 | 60 ✓ | ✓ |  | 2 |
| 676 | 217 | 217 ✓ | ✓ |  | 2 |
| 675 | 117 | 117 ✓ | ✓ |  | 2 |
| 674 | 135 | 135 ✓ | ✓ |  | 2 |
| 673 | 9,2 | 9,2 ✓ | ✓ |  | 2 |
| 670 | 34,8 | 34,8 ✓ | ✓ |  | 2 |
| 669 | 5,0 | 5,0 ✓ | ✓ |  | 2 |
| 665 | 1086 | 1086 ✓ | ✓ |  | 2 |
| 663 | 587 | 587 ✓ | ✓ |  | 2 |
| 706 | 610 | 610 ✓ | ✓ |  | 2 |
| 705 | 18 | 18 ✓ | ✓ |  | 2 |
| 704 | 55 | 55 ✓ | ✓ |  | 2 |
| 702 | 208 | 208 ✓ | ✓ |  | 2 |
| 700 | 112 | 112 ✓ | ✓ |  | 2 |
| 699 | 129 | 129 ✓ | ✓ |  | 2 |
| 698 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 696 | 32,2 | 32,2 ✓ | ✓ |  | 2 |
| 694 | 5,4 | 5,4 ✓ | ✓ |  | 2 |
| 691 | 1127 | 1127 ✓ | ✓ |  | 2 |
| 690 | 608 | 608 ✓ | ✓ |  | 2 |
| 733 | 576 | 576 ✓ | ✓ |  | 2 |
| 730 | 17 | 17 ✓ | ✓ |  | 2 |
| 730 | 50 | 50 ✓ | ✓ |  | 2 |
| 728 | 196 | 196 ✓ | ✓ |  | 2 |
| 727 | 106 | 106 ✓ | ✓ |  | 2 |
| 726 | 122 | 122 ✓ | ✓ |  | 2 |
| 724 | 7,8 | 78  | ✓ |  | 1 |
| 723 | 29,5 | 29,5 ✓ | ✓ |  | 2 |
| 720 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 717 | 1159 | 1159 ✓ | ✓ |  | 2 |
| 715 | 626 | 626 ✓ | ✓ |  | 2 |
| 759 | 542 | 342  | ✓ |  | 1 |
| 757 | 16 | 16 ✓ | ✓ |  | 2 |
| 756 | 46 | AG  | ✓ |  | 1 |
| 754 | 183 | 183 ✓ | ✓ |  | 2 |
| 752 | 99 | 99 ✓ | ✓ |  | 2 |
| 751 | 114 | 4  | ✓ |  | 1 |
| 750 | 7,1 | 7A  | ✓ |  | 1 |
| 748 | 26,9 | 26,9 ✓ | ✓ |  | 2 |
| 746 | 6,4 | 6A  | ✓ |  | 1 |
| 743 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 741 | 639 | 639 ✓ | ✓ |  | 2 |
| 790 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 788 | 643 | 643 ✓ | ✓ |  | 2 |
| 787 | 19 | 19 ✓ | ✓ |  | 2 |
| 785 | 56 | 56 ✓ | ✓ |  | 2 |
| 784 | 209 | 209 ✓ | ✓ |  | 2 |
| 783 | 113 | 113 ✓ | ✓ |  | 2 |
| 781 | 130 | 130 ✓ | ✓ |  | 2 |
| 780 | 8,6 | 8.6 ✓ | ✓ |  | 2 |
| 778 | 32,6 | 326  | ✓ |  | 1 |
| 776 | 5,3 | 53  | ✓ |  | 1 |
| 773 | 1118 | 1118 ✓ | ✓ |  | 2 |
| 772 | 604 | 604 ✓ | ✓ |  | 2 |
| 814 | 610 | 610 ✓ | ✓ |  | 2 |
| 813 | 18 | 18 ✓ | ✓ |  | 2 |
| 810 | 52 | 52 ✓ | ✓ |  | 2 |
| 810 | 200 | 200 ✓ | ✓ |  | 2 |
| 809 | 108 | 108 ✓ | ✓ |  | 2 |
| 807 | 124 | 124 ✓ | ✓ |  | 2 |
| 807 | 8,0 | 8,0 ✓ | ✓ |  | 2 |
| 804 | 30,3 | 30,3 ✓ | ✓ |  | 2 |
| 801 | 5,7 | 5,7 ✓ | ✓ |  | 2 |
| 799 | 1151 | 1151 ✓ | ✓ |  | 2 |
| 798 | 621 | 621 ✓ | ✓ |  | 2 |
| 840 | 576 | 576 ✓ | ✓ |  | 2 |
| 838 | 17 | 17 ✓ | ✓ |  | 2 |
| 836 | 47 | 4/  | ✓ |  | 1 |
| 836 | 188 | 188 ✓ | ✓ |  | 2 |
| 835 | 102 | 102 ✓ | ✓ |  | 2 |
| 832 | 117 | 117 ✓ | ✓ |  | 2 |
| 832 | 7,4 | 7A  | ✓ |  | 1 |
| 830 | 28,0 | 28,0 ✓ | ✓ |  | 2 |
| 828 | 6,2 | 6,2 ✓ | ✓ |  | 2 |
| 825 | 1175 | 1175 ✓ | ✓ |  | 2 |
| 824 | 634 | 634 ✓ | ✓ |  | 2 |
| 866 | 542 | 542 ✓ | ✓ |  | 2 |
| 865 | 16 | 16 ✓ | ✓ |  | 2 |
| 863 | 43 | 43 ✓ | ✓ |  | 2 |
| 861 | 175 | 175 ✓ | ✓ |  | 2 |
| 860 | 95 | 95 ✓ | ✓ |  | 2 |
| 859 | 109 | 109 ✓ | ✓ |  | 2 |
| 858 | 6,8 | 6,8 ✓ | ✓ |  | 2 |
| 856 | 25,7 | 25,7 ✓ | ✓ |  | 2 |
| 854 | 6,8 | 68  | ✓ |  | 1 |
| 851 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 850 | 643 | 643 ✓ | ✓ |  | 2 |
| 900 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 898 | 643 | 643 ✓ | ✓ |  | 2 |
| 897 | 19 | 19 ✓ | ✓ |  | 2 |
| 895 | 52 | 52 ✓ | ✓ |  | 2 |
| 894 | 201 | 201 ✓ | ✓ |  | 2 |
| 892 | 109 | 109 ✓ | ✓ |  | 2 |
| 891 | 125 | 125 ✓ | ✓ |  | 2 |
| 890 | 8,1 | 8,1 ✓ | ✓ |  | 2 |
| 888 | 30,7 | 30,7 ✓ | ✓ |  | 2 |
| 886 | 5,7 | 5,2  | ✓ |  | 1 |
| 882 | 1143 | 1143 ✓ | ✓ |  | 2 |
| 882 | 617 | 617 ✓ | ✓ |  | 2 |
| 924 | 610 | 610 ✓ | ✓ |  | 2 |
| 923 | 18 | 18 ✓ | ✓ |  | 2 |
| 921 | 48 | 48 ✓ | ✓ |  | 2 |
| 920 | 190 | 190 ✓ | ✓ |  | 2 |
| 918 | 103 | 103 ✓ | ✓ |  | 2 |
| 917 | 118 | 118 ✓ | ✓ |  | 2 |
| 915 | 7,5 | 75  | ✓ |  | 1 |
| 914 | 28,4 | 28,4 ✓ | ✓ |  | 2 |
| 912 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 909 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 908 | 630 | 630 ✓ | ✓ |  | 2 |
| 950 | 576 | 576 ✓ | ✓ |  | 2 |
| 948 | 17 | 17 ✓ | ✓ |  | 2 |
| 948 | 44 | 44 ✓ | ✓ |  | 2 |
| 945 | 179 | 179 ✓ | ✓ |  | 2 |
| 945 | 96 | 96 ✓ | ✓ |  | 2 |
| 943 | 111 | 111 ✓ | ✓ |  | 2 |
| 942 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 940 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 938 | 6,6 | 6,6 ✓ | ✓ |  | 2 |
| 935 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 934 | 639 | 639 ✓ | ✓ |  | 2 |
| 976 | 542 | 542 ✓ | ✓ |  | 2 |
| 975 | 16 | 16 ✓ | ✓ |  | 2 |
| 973 | 40 | 40 ✓ | ✓ |  | 2 |
| 972 | 164 | 164 ✓ | ✓ |  | 2 |
| 970 | 89 | 89 ✓ | ✓ |  | 2 |
| 969 | 102 | 102 ✓ | ✓ |  | 2 |
| 968 | 6,4 | 64  | ✓ |  | 1 |
| 966 | 24,2 | 24,2 ✓ | ✓ |  | 2 |
| 964 | 7,2 | 12  | ✓ |  | 1 |
| 961 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 960 | 643 | 643 ✓ | ✓ |  | 2 |
| 1008 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1007 | 643 | 643 ✓ | ✓ |  | 2 |
| 1006 | 19 | 19 ✓ | ✓ |  | 2 |
| 1003 | 49 | 49 ✓ | ✓ |  | 2 |
| 1003 | 193 | 193 ✓ | ✓ |  | 2 |
| 1001 | 104 | 104 ✓ | ✓ |  | 2 |
| 1000 | 120 | 120 ✓ | ✓ |  | 2 |
| 998 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 997 | 28,8 | 28,8 ✓ | ✓ |  | 2 |
| 995 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 993 | 1167 | 1167 ✓ | ✓ |  | 2 |
| 991 | 630 | 630 ✓ | ✓ |  | 2 |
| 1033 | 610 | 610 ✓ | ✓ |  | 2 |
| 1032 | 18 | 18 ✓ | ✓ |  | 2 |
| 1029 | 45 | 45 ✓ | ✓ |  | 2 |
| 1029 | 182 | 182 ✓ | ✓ |  | 2 |
| 1026 | 98 | 98 ✓ | ✓ |  | 2 |
| 1026 | 113 | 113 ✓ | ✓ |  | 2 |
| 1024 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 1023 | 26,9 | 26,9 ✓ | ✓ |  | 2 |
| 1021 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 1018 | 1183 | 1183 ✓ | ✓ |  | 2 |
| 1016 | 639 | 639 ✓ | ✓ |  | 2 |
| 1058 | 576 | 576 ✓ | ✓ |  | 2 |
| 1057 | 17 | 17 ✓ | ✓ |  | 2 |
| 1054 | 41 | 41 ✓ | ✓ |  | 2 |
| 1054 | 169 | 169 ✓ | ✓ |  | 2 |
| 1052 | 91 | 91 ✓ | ✓ |  | 2 |
| 1051 | 105 | 105 ✓ | ✓ |  | 2 |
| 1050 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 1049 | 24,6 | 24,6 ✓ | ✓ |  | 2 |
| 1046 | 7,0 | 70  | ✓ |  | 1 |
| 1044 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 1042 | 643 | 643 ✓ | ✓ |  | 2 |
| 1084 | 542 | 542 ✓ | ✓ |  | 2 |
| 1083 | 16 | 16 ✓ | ✓ |  | 2 |
| 1080 | 37 | 37 ✓ | ✓ |  | 2 |
| 1080 | 156 | 156 ✓ | ✓ |  | 2 |
| 1078 | 84 | 84 ✓ | ✓ |  | 2 |
| 1077 | 97 | 97 ✓ | ✓ |  | 2 |
| 1075 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 1074 | 22,7 | 22,7 ✓ | ✓ |  | 2 |
| 1072 | 7,6 | 78  | ✓ |  | 1 |
| 1069 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 1068 | 643 | 643 ✓ | ✓ |  | 2 |

### Pagina 5-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 468 | 5-6 | 5-6 ✓ | ✓ |  | 2 |
| 507 | 2 | 2 ✓ | – |  | 1 |
| 1403 | 5-1 | 5-)  | ✓ |  | 1 |
| 1403 | 5 | 5 ✓ | ✓ |  | 2 |
| 1403 | 5). | 5). ✓ | ✓ |  | 2 |
| 412 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 455 | 15000 | 15000 ✓ | ✓ |  | 2 |
| 505 | 46 | AG  | ✓ |  | 1 |
| 505 | (174 | (174 ✓ | ✓ |  | 2 |
| 1298 | 1 | 1 ✓ | ✓ |  | 2 |
| 632 | 2600 | 2600 ✓ | ✓ |  | 2 |
| 633 | 508 | 508 ✓ | ✓ |  | 2 |
| 633 | 15 | 15 ✓ | ✓ |  | 2 |
| 634 | 49 | –  | ✓ |  | 1 |
| 634 | 198 | 198 ✓ | ✓ |  | 2 |
| 635 | 107 | 107 ✓ | ✓ |  | 2 |
| 635 | 123 | 123 ✓ | ✓ |  | 2 |
| 637 | 7,6 | 7,6 ✓ | ✓ |  | 2 |
| 638 | 28,8 | 28,8 ✓ | ✓ |  | 2 |
| 638 | 6,0 | 6,0 ✓ | ✓ |  | 2 |
| 638 | 1191 | 1191 ✓ | ✓ |  | 2 |
| 640 | 643 | 643 ✓ | ✓ |  | 2 |
| 660 | 474 | A74  | ✓ |  | 1 |
| 660 | 14 | 14 ✓ | ✓ |  | 2 |
| 661 | 44 | 44 ✓ | ✓ |  | 2 |
| 660 | 180 | 180 ✓ | ✓ |  | 2 |
| 660 | 97 | 97 ✓ | ✓ |  | 2 |
| 661 | 112 | 112 ✓ | ✓ |  | 2 |
| 662 | 6,9 | 6,9 ✓ | ✓ |  | 2 |
| 664 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 664 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 665 | 1207 | 1207 ✓ | ✓ |  | 2 |
| 666 | 652 | 652 ✓ | ✓ |  | 2 |
| 684 | 440 | 440 ✓ | ✓ |  | 2 |
| 685 | 13 | 13 ✓ | ✓ |  | 2 |
| 685 | 38 | 38 ✓ | ✓ |  | 2 |
| 686 | 163 | 163 ✓ | ✓ |  | 2 |
| 686 | 88 | 88 ✓ | ✓ |  | 2 |
| 687 | 101 | 101 ✓ | ✓ |  | 2 |
| 688 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 690 | 23,1 | 23,1 ✓ | ✓ |  | 2 |
| 690 | 7,5 | 7,5 ✓ | ✓ |  | 2 |
| 690 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 692 | 656 | 656 ✓ | ✓ |  | 2 |
| 741 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 742 | 508 | 508 ✓ | ✓ |  | 2 |
| 742 | 15 | 15 ✓ | ✓ |  | 2 |
| 740 | 47 | 4/  | ✓ |  | 1 |
| 743 | 190 | 190 ✓ | ✓ |  | 2 |
| 744 | 103 | 103 ✓ | ✓ |  | 2 |
| 744 | 118 | 118 ✓ | ✓ |  | 2 |
| 745 | 7,3 | 13  | ✓ |  | 1 |
| 746 | 27,6 | 27,6 ✓ | ✓ |  | 2 |
| 746 | 6,3 | 6,3 ✓ | ✓ |  | 2 |
| 746 | 1199 | 1199 ✓ | ✓ |  | 2 |
| 747 | 647 | 647 ✓ | ✓ |  | 2 |
| 768 | 474 | 474 ✓ | ✓ |  | 2 |
| 767 | 14 | 14 ✓ | ✓ |  | 2 |
| 766 | 41 | 41 ✓ | ✓ |  | 2 |
| 768 | 174 | 174 ✓ | ✓ |  | 2 |
| 769 | 94 | 94 ✓ | ✓ |  | 2 |
| 770 | 108 | 108 ✓ | ✓ |  | 2 |
| 771 | 6,6 | 6,6 ✓ | ✓ |  | 2 |
| 772 | 25,0 | 25,0 ✓ | ✓ |  | 2 |
| 773 | 7,0 | 7,0 ✓ | ✓ |  | 2 |
| 773 | 1207 | 1207 ✓ | ✓ |  | 2 |
| 774 | 652 | 652 ✓ | ✓ |  | 2 |
| 795 | 440 | 440 ✓ | ✓ |  | 2 |
| 794 | 13 | 13 ✓ | ✓ |  | 2 |
| 795 | 36 | 36 ✓ | ✓ |  | 2 |
| 795 | 158 | 158 ✓ | ✓ |  | 2 |
| 795 | 85 | B5  | ✓ |  | 1 |
| 796 | 98 | 98 ✓ | ✓ |  | 2 |
| 797 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 798 | 22,3 | 22,3 ✓ | ✓ |  | 2 |
| 798 | 7,7 | 7,7 ✓ | ✓ |  | 2 |
| 798 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 800 | 656 | 656 ✓ | ✓ |  | 2 |
| 849 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 850 | 508 | 508 ✓ | ✓ |  | 2 |
| 850 | 15 | 15 ✓ | ✓ |  | 2 |
| 850 | 44 | 44 ✓ | ✓ |  | 2 |
| 851 | 180 | 180 ✓ | ✓ |  | 2 |
| 851 | 97 | 97 ✓ | ✓ |  | 2 |
| 852 | 112 | 112 ✓ | ✓ |  | 2 |
| 853 | 6,9 | S,9  | ✓ |  | 1 |
| 854 | 26,1 | 26,1 ✓ | ✓ |  | 2 |
| 854 | 6,7 | 6,7 ✓ | ✓ |  | 2 |
| 855 | 1207 | 1207 ✓ | ✓ |  | 2 |
| 857 | 652 | 652 ✓ | ✓ |  | 2 |
| 875 | 474 | 474 ✓ | ✓ |  | 2 |
| 876 | 14 | 14 ✓ | ✓ |  | 2 |
| 877 | 39 | 39 ✓ | ✓ |  | 2 |
| 877 | 166 | 166 ✓ | ✓ |  | 2 |
| 878 | 90 | 90 ✓ | ✓ |  | 2 |
| 878 | 103 | 103 ✓ | ✓ |  | 2 |
| 879 | 6,3 | b2  | ✓ |  | 1 |
| 880 | 23,8 | 23,8 ✓ | ✓ |  | 2 |
| 880 | 7,4 | 7,4 ✓ | ✓ |  | 2 |
| 881 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 882 | 656 | 656 ✓ | ✓ |  | 2 |
| 958 | 2300 | –  | ✓ |  | 1 |
| 959 | 508 | 508 ✓ | ✓ |  | 2 |
| 959 | 15 | 15 ✓ | ✓ |  | 2 |
| 959 | 40 | 40 ✓ | ✓ |  | 2 |
| 960 | 171 | 171 ✓ | ✓ |  | 2 |
| 961 | 92 | 92 ✓ | ✓ |  | 2 |
| 962 | 106 | 106 ✓ | ✓ |  | 2 |
| 962 | 6,5 | 6,5 ✓ | ✓ |  | 2 |
| 963 | 24,6 | 24,6 ✓ | ✓ |  | 2 |
| 963 | 7,1 | 7,1 ✓ | ✓ |  | 2 |
| 964 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 966 | 656 | 656 ✓ | ✓ |  | 2 |
| 983 | 474 | 474 ✓ | ✓ |  | 2 |
| 986 | 14 | 14 ✓ | ✓ |  | 2 |
| 986 | 36 | 36 ✓ | ✓ |  | 2 |
| 986 | 156 | 156 ✓ | ✓ |  | 2 |
| 987 | 84 | 84 ✓ | ✓ |  | 2 |
| 987 | 97 | 97 ✓ | ✓ |  | 2 |
| 988 | 5,9 | 5,9 ✓ | ✓ |  | 2 |
| 989 | 22,3 | 22,3 ✓ | ✓ |  | 2 |
| 990 | 7,8 | 7,8 ✓ | ✓ |  | 2 |
| 991 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 992 | 656 | 656 ✓ | ✓ |  | 2 |
| 1067 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 1069 | 508 | 508 ✓ | ✓ |  | 2 |
| 1069 | 15 | 15 ✓ | ✓ |  | 2 |
| 1070 | 38 | 38 ✓ | ✓ |  | 2 |
| 1070 | 163 | 163 ✓ | ✓ |  | 2 |
| 1071 | 88 | 88 ✓ | ✓ |  | 2 |
| 1070 | 101 | 101 ✓ | ✓ |  | 2 |
| 1071 | 6,1 | 6,1 ✓ | ✓ |  | 2 |
| 1072 | 23,1 | 23,1 ✓ | ✓ |  | 2 |
| 1073 | 7,5 | 75  | ✓ |  | 1 |
| 1074 | 1215 | 1215 ✓ | ✓ |  | 2 |
| 1075 | 656 | 656 ✓ | ✓ |  | 2 |

### Pagina 5-7 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 459 | 5-7 | S-7  | ✓ |  | 1 |
| 498 | 2 | Ze  | – |  | 0 |
| 360 | 80 | 80 ✓ | ✓ |  | 2 |
| 359 | 97 | 97 ✓ | ✓ |  | 2 |
| 358 | 113 | 113 ✓ | ✓ |  | 2 |
| 357 | 129 | 129 ✓ | ✓ |  | 2 |
| 357 | 145 | 145 ✓ | ✓ |  | 2 |
| 358 | 161 | 161 ✓ | ✓ |  | 2 |
| 362 | 177 | 177 ✓ | ✓ |  | 2 |
| 361 | 193 | 193 ✓ | ✓ |  | 2 |
| 360 | 209 | 209 ✓ | ✓ |  | 2 |
| 363 | 225 | 225 ✓ | ✓ |  | 2 |
| 362 | 241 | 241 ✓ | ✓ |  | 2 |
| 435 | 50 | 50 ✓ | ✓ |  | 2 |
| 434 | 60 | 60 ✓ | ✓ |  | 2 |
| 434 | 70 | 70 ✓ | ✓ |  | 2 |
| 434 | 80 | 80 ✓ | ✓ |  | 2 |
| 434 | 90 | 90 ✓ | ✓ |  | 2 |
| 434 | 100 | 100 ✓ | ✓ |  | 2 |
| 436 | 110 | 110 ✓ | ✓ |  | 2 |
| 436 | 120 | 120 ✓ | ✓ |  | 2 |
| 436 | 130 | 130 ✓ | ✓ |  | 2 |
| 437 | 140 | 140 ✓ | ✓ |  | 2 |
| 437 | 150 | 150 ✓ | ✓ |  | 2 |
| 509 | 92 | 92 ✓ | ✓ |  | 2 |
| 509 | 98 | 98 ✓ | ✓ |  | 2 |
| 507 | 109 | 109 ✓ | ✓ |  | 2 |
| 507 | 124 | 124 ✓ | – |  | 1 |
| 509 | 138 | 138 ✓ | ✓ |  | 2 |
| 509 | 154 | 154 ✓ | – |  | 1 |
| 507 | 171 | 171 ✓ | ✓ |  | 2 |
| 511 | 187 | 187 ✓ | – |  | 1 |
| 511 | 204 | 204 ✓ | – |  | 1 |
| 511 | 222 | 222 ✓ | ✓ |  | 2 |
| 509 | 241 | 241 ✓ | ✓ |  | 2 |
| 585 | 57 | 57 ✓ | ✓ |  | 2 |
| 584 | 61 | 61 ✓ | ✓ |  | 2 |
| 583 | 68 | 68 ✓ | – |  | 1 |
| 584 | 77 | 77 ✓ | – |  | 1 |
| 583 | 86 | 86 ✓ | ✓ |  | 2 |
| 583 | 96 | 96 ✓ | – |  | 1 |
| 585 | 106 | 106 ✓ | ✓ |  | 2 |
| 585 | 116 | 116 ✓ | ✓ |  | 2 |
| 586 | 127 | 127 ✓ | ✓ |  | 2 |
| 586 | 138 | 138 ✓ | ✓ |  | 2 |
| 587 | 150 | 150 ✓ | ✓ |  | 2 |
| 672 | 80 | 80 ✓ | ✓ |  | 2 |
| 673 | 97 | 97 ✓ | ✓ |  | 2 |
| 671 | 113 | 113 ✓ | ✓ |  | 2 |
| 671 | 129 | 129 ✓ | ✓ |  | 2 |
| 671 | 145 | 145 ✓ | ✓ |  | 2 |
| 671 | 161 | 161 ✓ | ✓ |  | 2 |
| 748 | 50 | 90  | ✓ |  | 1 |
| 748 | 60 | 60 ✓ | ✓ |  | 2 |
| 750 | 70 | 79  | ✓ |  | 1 |
| 748 | 80 | 80 ✓ | ✓ |  | 2 |
| 748 | 90 | 90 ✓ | ✓ |  | 2 |
| 751 | 100 | 100 ✓ | ✓ |  | 2 |
| 823 | 85 | 85 ✓ | ✓ |  | 2 |
| 823 | 95 | 95 ✓ | ✓ |  | 2 |
| 821 | 109 | 109 ✓ | ✓ |  | 2 |
| 821 | 124 | 124 ✓ | – |  | 1 |
| 823 | 138 | 138 ✓ | ✓ |  | 2 |
| 825 | 154 | 154 ✓ | – |  | 1 |
| 895 | 53 | 53 ✓ | ✓ |  | 2 |
| 895 | 59 | 59 ✓ | ✓ |  | 2 |
| 895 | 68 | 68 ✓ | – |  | 1 |
| 897 | 77 | 77 ✓ | – |  | 1 |
| 895 | 86 | 86 ✓ | ✓ |  | 2 |
| 896 | 96 | 96 ✓ | – |  | 1 |
| 799 | 20° | 20 ✓ | ✓ |  | 2 |
| 987 | 80 | 80 ✓ | ✓ |  | 2 |
| 987 | 97 | 97 ✓ | ✓ |  | 2 |
| 987 | 113 | 113 ✓ | ✓ |  | 2 |
| 987 | 129 | 129 ✓ | ✓ |  | 2 |
| 987 | 145 | 145 ✓ | ✓ |  | 2 |
| 987 | 161 | 161 ✓ | ✓ |  | 2 |
| 1062 | 50 | –  | ✓ |  | 1 |
| 1062 | 60 | 60 ✓ | ✓ |  | 2 |
| 1062 | 70 | 70 ✓ | ✓ |  | 2 |
| 1060 | 80 | 80 ✓ | ✓ |  | 2 |
| 1062 | 90 | 90 ✓ | ✓ |  | 2 |
| 1062 | 100 | 100 ✓ | ✓ |  | 2 |
| 1136 | 89 | 89 ✓ | ✓ |  | 2 |
| 1136 | 101 | 101 ✓ | ✓ |  | 2 |
| 1136 | 116 | 116 ✓ | ✓ |  | 2 |
| 1136 | 132 | 132 ✓ | ✓ |  | 2 |
| 1136 | 148 | 148 ✓ | ✓ |  | 2 |
| 1137 | 164 | 164 ✓ | – |  | 1 |
| 1209 | 55 | 55 ✓ | ✓ |  | 2 |
| 1209 | 63 | 63 ✓ | ✓ |  | 2 |
| 1210 | 72 | 72 ✓ | ✓ |  | 2 |
| 1209 | 82 | 82 ✓ | ✓ |  | 2 |
| 1210 | 92 | 92 ✓ | ✓ |  | 2 |
| 1210 | 102 | 102 ✓ | – |  | 1 |
| 1118 | 40° | 40 ✓ | ✓ |  | 2 |
| 1308 | 5-2. | 5-2 ✓ | ✓ |  | 2 |

### Pagina 5-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 467 | 5-8 | 5-8 ✓ | ✓ |  | 2 |
| 507 | 2 | 2 ✓ | – |  | 1 |
| 831 | 0° | 92  | ✓ |  | 1 |
| 831 | 20° | 20 ✓ | ✓ |  | 2 |
| 831 | 40° | 40 ✓ | ✓ |  | 2 |
| 831 | 60° | 60 ✓ | ✓ |  | 2 |
| 908 | 103 | 103 ✓ | ✓ |  | 2 |
| 944 | 56 | 56 ✓ | ✓ |  | 2 |
| 980 | 64 | 64 ✓ | ✓ |  | 2 |
| 909 | 106 | 106 ✓ | – |  | 1 |
| 945 | 57 | of  | ✓ |  | 1 |
| 980 | 66 | 66 ✓ | – |  | 1 |
| 908 | 117 | 117 ✓ | – |  | 1 |
| 944 | 63 | 63 ✓ | ✓ |  | 2 |
| 980 | 73 | 73 ✓ | – |  | 1 |
| 908 | 145 | 145 ✓ | ✓ |  | 2 |
| 944 | 78 | 78 ✓ | – |  | 1 |
| 981 | 90 | 90 ✓ | ✓ |  | 2 |
| 1062 | 20° | 209  | ✓ |  | 1 |
| 1063 | 93 | 93 ✓ | ✓ |  | 2 |
| 1099 | 50 | 50 ✓ | ✓ |  | 2 |
| 1137 | 58 | 58 ✓ | ✓ |  | 2 |
| 1064 | 97 | 97 ✓ | ✓ |  | 2 |
| 1101 | 52 | 52 ✓ | ✓ |  | 2 |
| 1139 | 60 | 60 ✓ | ✓ |  | 2 |
| 1063 | 108 | 108 ✓ | ✓ |  | 2 |
| 1100 | 58 | 58 ✓ | ✓ |  | 2 |
| 1138 | 67 | 67 ✓ | ✓ |  | 2 |
| 1063 | 134 | 134 ✓ | ✓ |  | 2 |
| 1100 | 72 | f2  | ✓ |  | 1 |
| 1138 | 83 | 83 ✓ | – |  | 1 |
| 1222 | 40° | 40 ✓ | ✓ |  | 2 |
| 1222 | 85 | 85 ✓ | ✓ |  | 2 |
| 1259 | 46 | 46 ✓ | ✓ |  | 2 |
| 1295 | 53 | 53 ✓ | ✓ |  | 2 |
| 1222 | 89 | 89 ✓ | ✓ |  | 2 |
| 1259 | 48 | 48 ✓ | ✓ |  | 2 |
| 1295 | 55 | 55 ✓ | ✓ |  | 2 |
| 1222 | 97 | 97 ✓ | ✓ |  | 2 |
| 1259 | 52 | 52 ✓ | ✓ |  | 2 |
| 1295 | 60 | 60 ✓ | ✓ |  | 2 |
| 1222 | 121 | 121 ✓ | ✓ |  | 2 |
| 1259 | 65 | 65 ✓ | ✓ |  | 2 |
| 1295 | 75 | 75 ✓ | ✓ |  | 2 |
| 1134 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 1494 | 5-3. | 5-3. ✓ | ✓ |  | 2 |

### Pagina 5-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 461 | 5-9 | 5-9 ✓ | ✓ |  | 2 |
| 496 | 2 | 2 ✓ | – |  | 1 |
| 234 | 10° | 109  | ✓ |  | 1 |
| 377 | 15m | 15m ✓ | ✓ |  | 2 |
| 379 | +15°C | 4159C  | ✓ |  | 1 |
| 529 | 15 | 15 ✓ | ✓ |  | 2 |
| 344 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 379 | +10°C | 4109C  | ✓ |  | 1 |
| 530 | 15 | 15 ✓ | ✓ |  | 2 |
| 344 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 379 | +5°C | 459C  | ✓ |  | 1 |
| 529 | 15 | 15 ✓ | ✓ |  | 2 |
| 344 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 379 | 0°C | 0C ✓ | ✓ |  | 2 |
| 527 | 15 | 15 ✓ | ✓ |  | 2 |
| 710 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 673 | 114 | 114 ✓ | – |  | 1 |
| 710 | 62 | 62 ✓ | – |  | 1 |
| 745 | 71 | 71 ✓ | – |  | 1 |
| 673 | 0 | –  | ✓ |  | 1 |
| 710 | 19 | 19 ✓ | ✓ |  | 2 |
| 745 | 37 | 37 ✓ | ✓ |  | 2 |
| 673 | 0 | 0 ✓ | ✓ |  | 2 |
| 710 | 10 | 10 ✓ | ✓ |  | 2 |
| 745 | 20 | 20 ✓ | ✓ |  | 2 |
| 673 | 226 | 226 ✓ | ✓ |  | 2 |
| 710 | 158 | 158 ✓ | ✓ |  | 2 |
| 745 | 102 | 102 ✓ | ✓ |  | 2 |
| 673 | 375 | 375 ✓ | ✓ |  | 2 |
| 710 | 282 | 282 ✓ | ✓ |  | 2 |
| 747 | 201 | 201 ✓ | ✓ |  | 2 |
| 675 | 268 | 268 ✓ | ✓ |  | 2 |
| 710 | 192 | 192 ✓ | ✓ |  | 2 |
| 745 | 126 | 126 ✓ | ✓ |  | 2 |
| 675 | 439 | 439 ✓ | ✓ |  | 2 |
| 710 | 335 | 335 ✓ | ✓ |  | 2 |
| 747 | 242 | 242 ✓ | ✓ |  | 2 |
| 673 | 325 | 325 ✓ | ✓ |  | 2 |
| 710 | 235 | 235 ✓ | ✓ |  | 2 |
| 745 | 158 | 158 ✓ | ✓ |  | 2 |
| 673 | 526 | 526 ✓ | ✓ |  | 2 |
| 710 | 405 | 405 ✓ | ✓ |  | 2 |
| 745 | 297 | 297 ✓ | ✓ |  | 2 |
| 673 | 393 | 393 ✓ | ✓ |  | 2 |
| 710 | 288 | 288 ✓ | ✓ |  | 2 |
| 745 | 200 | 200 ✓ | ✓ |  | 2 |
| 673 | 639 | 639 ✓ | ✓ |  | 2 |
| 710 | 497 | 497 ✓ | ✓ |  | 2 |
| 745 | 370 | 370 ✓ | ✓ |  | 2 |
| 856 | 1000 | 1000 ✓ | ✓ |  | 2 |
| 823 | 106 | 106 ✓ | – |  | 1 |
| 858 | 57 | 5/  | ✓ |  | 1 |
| 895 | 66 | 66 ✓ | – |  | 1 |
| 823 | 0 | 0 ✓ | ✓ |  | 2 |
| 858 | 19 | 19 ✓ | ✓ |  | 2 |
| 895 | 37 | 37 ✓ | ✓ |  | 2 |
| 823 | 0 | –  | ✓ |  | 1 |
| 858 | 10 | 10 ✓ | ✓ |  | 2 |
| 895 | 20 | 20 ✓ | ✓ |  | 2 |
| 823 | 162 | 162 ✓ | ✓ |  | 2 |
| 858 | 110 | 110 ✓ | ✓ |  | 2 |
| 895 | 69 | 69 ✓ | ✓ |  | 2 |
| 823 | 282 | 282 ✓ | ✓ |  | 2 |
| 858 | 209 | 209 ✓ | ✓ |  | 2 |
| 893 | 145 | 145 ✓ | ✓ |  | 2 |
| 823 | 192 | 192 ✓ | ✓ |  | 2 |
| 858 | 134 | 134 ✓ | ✓ |  | 2 |
| 893 | 85 | 85 ✓ | ✓ |  | 2 |
| 823 | 326 | 326 ✓ | ✓ |  | 2 |
| 858 | 245 | 245 ✓ | ✓ |  | 2 |
| 895 | 172 | 172 ✓ | ✓ |  | 2 |
| 823 | 232 | 232 ✓ | ✓ |  | 2 |
| 858 | 163 | 163 ✓ | ✓ |  | 2 |
| 895 | 105 | 105 ✓ | ✓ |  | 2 |
| 823 | 386 | 386 ✓ | ✓ |  | 2 |
| 858 | 291 | 291 ✓ | ✓ |  | 2 |
| 893 | 207 | 207 ✓ | ✓ |  | 2 |
| 821 | 279 | 279 ✓ | ✓ |  | 2 |
| 858 | 200 | 200 ✓ | ✓ |  | 2 |
| 893 | 133 | 133 ✓ | ✓ |  | 2 |
| 821 | 459 | 459 ✓ | ✓ |  | 2 |
| 856 | 349 | 349 ✓ | ✓ |  | 2 |
| 893 | 253 | 253 ✓ | ✓ |  | 2 |
| 1001 | 850 | 850 ✓ | ✓ |  | 2 |
| 966 | 98 | 98 ✓ | ✓ |  | 2 |
| 1003 | 53 | 53 ✓ | ✓ |  | 2 |
| 1039 | 61 | 61 ✓ | ✓ |  | 2 |
| 966 | 0 | 0 ✓ | ✓ |  | 2 |
| 1003 | 19 | 19 ✓ | ✓ |  | 2 |
| 1039 | 37 | 37 ✓ | ✓ |  | 2 |
| 966 | 0 | 0 ✓ | ✓ |  | 2 |
| 1003 | 10 | 10 ✓ | ✓ |  | 2 |
| 1038 | 20 | 20 ✓ | ✓ |  | 2 |
| 966 | 113 | 113 ✓ | ✓ |  | 2 |
| 1001 | 75 | 75 ✓ | ✓ |  | 2 |
| 1039 | 43 | 43 ✓ | ✓ |  | 2 |
| 968 | 210 | 210 ✓ | ✓ |  | 2 |
| 1003 | 154 | 154 ✓ | ✓ |  | 2 |
| 1039 | 104 | 104 ✓ | ✓ |  | 2 |
| 968 | 133 | 133 ✓ | ✓ |  | 2 |
| 1003 | 90 | 90 ✓ | ✓ |  | 2 |
| 1039 | 53 | D3  | ✓ |  | 1 |
| 968 | 241 | 241 ✓ | ✓ |  | 2 |
| 1003 | 177 | 177 ✓ | ✓ |  | 2 |
| 1039 | 120 | 120 ✓ | ✓ |  | 2 |
| 968 | 160 | 160 ✓ | ✓ |  | 2 |
| 1003 | 108 | 108 ✓ | ✓ |  | 2 |
| 1039 | 67 | 67 ✓ | ✓ |  | 2 |
| 968 | 280 | 280 ✓ | ✓ |  | 2 |
| 1003 | 207 | 207 ✓ | ✓ |  | 2 |
| 1039 | 143 | 143 ✓ | ✓ |  | 2 |
| 966 | 192 | 192 ✓ | ✓ |  | 2 |
| 1003 | 133 | 133 ✓ | ✓ |  | 2 |
| 1038 | 84 | 84 ✓ | ✓ |  | 2 |
| 968 | 328 | 328 ✓ | ✓ |  | 2 |
| 1003 | 245 | 245 ✓ | ✓ |  | 2 |
| 1040 | 172 | 172 ✓ | ✓ |  | 2 |
| 1110 | 1. | 1. ✓ | ✓ |  | 2 |
| 1110 | 10% | 10 ✓ | ✓ |  | 2 |
| 1110 | 14°C | 149C  | ✓ |  | 1 |
| 1145 | 2. | 2. ✓ | ✓ |  | 2 |
| 1181 | 7% | 7 ✓ | ✓ |  | 2 |
| 1181 | 15 | 15 ✓ | ✓ |  | 2 |
| 1309 | 5-4. | 5-4. ✓ | ✓ |  | 2 |

### Pagina 5-10 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 475 | 5-10 | 5-10 ✓ | ✓ |  | 2 |
| 512 | 2 | 2 ✓ | – |  | 1 |
| 354 | 40° | 40 ✓ | ✓ |  | 2 |
| 566 | +15°C | 4159C  | ✓ |  | 1 |
| 735 | 15 | 15 ✓ | ✓ |  | 2 |
| 530 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 565 | +10°C | 109C  | ✓ |  | 1 |
| 735 | 15 | 15 ✓ | ✓ |  | 2 |
| 530 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 565 | +5°C | 459C  | ✓ |  | 1 |
| 737 | 15 | 15 ✓ | ✓ |  | 2 |
| 530 | 7500 | 7500 ✓ | ✓ |  | 2 |
| 566 | 0°C | 0C ✓ | ✓ |  | 2 |
| 737 | 15 | 15 ✓ | ✓ |  | 2 |
| 985 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 914 | 117 | 117 ✓ | ✓ |  | 2 |
| 986 | 63 | 63 ✓ | ✓ |  | 2 |
| 1057 | 73 | 73 ✓ | ✓ |  | 2 |
| 985 | 189 | 189 ✓ | ✓ |  | 2 |
| 984 | 387 | 387 ✓ | ✓ |  | 2 |
| 986 | 201 | 201 ✓ | ✓ |  | 2 |
| 984 | 411 | 411 ✓ | ✓ |  | 2 |
| 986 | 212 | 212 ✓ | ✓ |  | 2 |
| 984 | 434 | 434 ✓ | ✓ |  | 2 |
| 986 | 224 | 224 ✓ | ✓ |  | 2 |
| 986 | 460 | 460 ✓ | ✓ |  | 2 |
| 1169 | 1. | 1. ✓ | ✓ |  | 2 |
| 1169 | 10% | 10 ✓ | ✓ |  | 2 |
| 1169 | 5 | 5 ✓ | ✓ |  | 2 |
| 1204 | 2. | 2. ✓ | ✓ |  | 2 |
| 1239 | 20% | 20 ✓ | ✓ |  | 2 |
| 1239 | 15m | 15m ✓ | ✓ |  | 2 |
| 1409 | 5-5. | 5-5. ✓ | ✓ |  | 2 |

### Pagina 5-11 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 5-11 | 5-11 ✓ | ✓ |  | 2 |
| 489 | 2 | 2 ✓ | – |  | 1 |
| 429 | +15°C | 4159C  | ✓ |  | 1 |
| 396 | 5000 | 5000 ✓ | ✓ |  | 2 |
| 427 | +5°C | 459C  | ✓ |  | 1 |
| 396 | 10000 | 10000 ✓ | ✓ |  | 2 |
| 426 | -5°C | -59C  | ✓ |  | 1 |
| 392 | 15000 | 15000 ✓ | ✓ |  | 2 |
| 422 | -15°C | -159C  | ✓ |  | 1 |
| 706 | 1157 | 1157 ✓ | ✓ |  | 2 |
| 675 | 153 | 153 ✓ | – |  | 1 |
| 704 | 83 | 83 ✓ | ✓ |  | 2 |
| 732 | 95 | 95 ✓ | – |  | 1 |
| 703 | 880 | 880 ✓ | ✓ |  | 2 |
| 702 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 672 | 146 | 146 ✓ | – |  | 1 |
| 702 | 79 | 79 ✓ | ✓ |  | 2 |
| 729 | 91 | 91 ✓ | – |  | 1 |
| 699 | 650 | 650 ✓ | ✓ |  | 2 |
| 699 | 11,7 | 1,7  | ✓ |  | 1 |
| 670 | 140 | 140 ✓ | – |  | 1 |
| 699 | 76 | 76 ✓ | ✓ |  | 2 |
| 729 | 87 | 87 ✓ | – |  | 1 |
| 699 | 420 | 420 ✓ | ✓ |  | 2 |
| 697 | 20,1 | 20,1 ✓ | ✓ |  | 2 |
| 667 | 134 | 134 ✓ | ✓ |  | 2 |
| 696 | 72 | 72 ✓ | ✓ |  | 2 |
| 724 | 83 | 83 ✓ | ✓ |  | 2 |
| 695 | 190 | 190 ✓ | ✓ |  | 2 |
| 694 | 33,3 | 33,3 ✓ | ✓ |  | 2 |
| 853 | 1000 | 1000 ✓ | ✓ |  | 2 |
| 823 | 148 | 148 ✓ | – |  | 1 |
| 852 | 80 | 80 ✓ | ✓ |  | 2 |
| 880 | 92 | 92 ✓ | – |  | 1 |
| 850 | 1120 | 1120 ✓ | ✓ |  | 2 |
| 850 | 4,9 | 4,9 ✓ | ✓ |  | 2 |
| 821 | 142 | 142 ✓ | – |  | 1 |
| 848 | 76 | 76 ✓ | ✓ |  | 2 |
| 878 | 88 | 88 ✓ | – |  | 1 |
| 848 | 860 | 860 ✓ | ✓ |  | 2 |
| 848 | 10,2 | 10,2 ✓ | ✓ |  | 2 |
| 819 | 137 | 137 ✓ | ✓ |  | 2 |
| 848 | 74 | 74 ✓ | ✓ |  | 2 |
| 876 | 85 | 85 ✓ | ✓ |  | 2 |
| 846 | 595 | 595 ✓ | ✓ |  | 2 |
| 846 | 16,3 | 16,3 ✓ | ✓ |  | 2 |
| 816 | 130 | 130 ✓ | ✓ |  | 2 |
| 845 | 70 | 70 ✓ | ✓ |  | 2 |
| 874 | 81 | 81 ✓ | ✓ |  | 2 |
| 845 | 340 | 340 ✓ | ✓ |  | 2 |
| 844 | 24,2 | 24,2 ✓ | ✓ |  | 2 |
| 1000 | 850 | 850 ✓ | ✓ |  | 2 |
| 972 | 142 | 142 ✓ | – |  | 1 |
| 1000 | 76 | 76 ✓ | ✓ |  | 2 |
| 1029 | 88 | 88 ✓ | – |  | 1 |
| 998 | 1420 | 1420 ✓ | ✓ |  | 2 |
| 997 | 4,9 | 49  | ✓ |  | 1 |
| 969 | 137 | 137 ✓ | ✓ |  | 2 |
| 998 | 74 | 74 ✓ | ✓ |  | 2 |
| 1025 | 85 | 85 ✓ | ✓ |  | 2 |
| 995 | 1115 | ITS  | ✓ |  | 1 |
| 995 | 8,7 | 8,7 ✓ | ✓ |  | 2 |
| 968 | 132 | 132 ✓ | ✓ |  | 2 |
| 996 | 71 | 71 ✓ | ✓ |  | 2 |
| 1025 | 82 | 82 ✓ | ✓ |  | 2 |
| 994 | 815 | 815 ✓ | ✓ |  | 2 |
| 993 | 13,2 | 13,2 ✓ | ✓ |  | 2 |
| 965 | 127 | 127 ✓ | ✓ |  | 2 |
| 993 | 69 | 69 ✓ | ✓ |  | 2 |
| 1021 | 79 | 79 ✓ | ✓ |  | 2 |
| 991 | 515 | 515 ✓ | ✓ |  | 2 |
| 990 | 19,3 | 19,3 ✓ | ✓ |  | 2 |
| 1112 | 1. | 1. ✓ | ✓ |  | 2 |
| 1112 | 2800 | 2800 ✓ | ✓ |  | 2 |
| 1141 | 2. | Zz.  | ✓ |  | 1 |
| 1171 | 3. | 3. ✓ | ✓ |  | 2 |
| 1171 | 20 | 20 ✓ | ✓ |  | 2 |
| 1171 | 5°C | 5eC ✓ | ✓ |  | 2 |
| 1325 | 5-6. | 5-6 ✓ | ✓ |  | 2 |

### Pagina 5-12 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 484 | 5-12 | 9-12  | ✓ |  | 1 |
| 518 | 2 | 2 ✓ | – |  | 1 |
| 334 | 137 | 137 ✓ | ✓ |  | 2 |
| 334 | 74 | 74 ✓ | ✓ |  | 2 |
| 334 | 85 | ele)  | ✓ |  | 1 |
| 489 | 12000 | 12000f ✓ | ✓ |  | 2 |
| 606 | 10000 | 10000 ✓ | ✓ |  | 2 |
| 723 | 8000 | 8000 ✓ | ✓ |  | 2 |
| 845 | 6000 | 6000 ✓ | ✓ |  | 2 |
| 964 | 4000 | 4000 ✓ | ✓ |  | 2 |
| 1087 | 2000 | 2000 ✓ | ✓ |  | 2 |
| 1230 | 0 | 0 ✓ | ✓ |  | 2 |
| 1230 | 10 | 10 ✓ | ✓ |  | 2 |
| 1230 | 20 | 20 ✓ | ✓ |  | 2 |
| 1230 | 30 | 30 ✓ | ✓ |  | 2 |
| 1230 | 40 | 40 ✓ | ✓ |  | 2 |
| 1397 | 5-7. | S-7.  | ✓ |  | 1 |

### Pagina 6-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 451 | 6-1 | 6-1 ✓ | ✓ |  | 2 |
| 490 | 2 | ,)  | ✓ |  | 1 |
| 1070 | 100/130 | 100/130 ✓ | ✓ |  | 2 |
| 1107 | 26 | 26 ✓ | ✓ |  | 2 |
| 1107 | (98,5 | (98,5 ✓ | ✓ |  | 2 |
| 1251 | 17 | 17 ✓ | ✓ |  | 2 |
| 1288 | (64 | (64 ✓ | ✓ |  | 2 |
| 1935 | 7 | 7 ✓ | ✓ |  | 2 |
| 1935 | (6,6 | (6,6 ✓ | ✓ |  | 2 |
| 1970 | 8 | 8 ✓ | ✓ |  | 2 |
| 1970 | (7,6 | (7,6 ✓ | ✓ |  | 2 |
| 2005 | 3 | 2  | ✓ |  | 1 |
| 2005 | 10 | 10 ✓ | ✓ |  | 2 |
| 2039 | (9,5 | (9,5 ✓ | ✓ |  | 2 |

### Pagina 6-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 6-2 | 6-2 ✓ | ✓ |  | 2 |
| 517 | 2 | 2 ✓ | ✓ |  | 2 |
| 842 | 50 | 50 ✓ | ✓ |  | 2 |
| 842 | 5°C | 590  | ✓ |  | 1 |
| 842 | 10W30 | 1OW30  | ✓ |  | 1 |
| 842 | 30 | 30 ✓ | ✓ |  | 2 |
| 842 | 5°C. | SC.  | ✓ |  | 1 |
| 878 | 10W30 | 10W30 ✓ | ✓ |  | 2 |
| 951 | MHS-24A, | MHS-24A, ✓ | ✓ |  | 2 |
| 1174 | 25 | 25 ✓ | ✓ |  | 2 |
| 1214 | MIL-L-6082. | MIL-L-6082. ✓ | ✓ |  | 2 |
| 1409 | 25 | 25 ✓ | ✓ |  | 2 |
| 1464 | 25 | 25 ✓ | ✓ |  | 2 |
| 1575 | 50 | 50 ✓ | ✓ |  | 2 |
| 1665 | 50 | 50 ✓ | ✓ |  | 2 |
| 1715 | 30 | 30 ✓ | ✓ |  | 2 |
| 1858 | 25 | Cha:  | ✓ |  | 1 |
| 1893 | 50 | 50 ✓ | ✓ |  | 2 |

### Pagina 6-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 459 | 6-3 | 6-3 ✓ | ✓ |  | 2 |
| 497 | 2 | 2 ✓ | – |  | 1 |
| 680 | 100 | 100 ✓ | ✓ |  | 2 |
| 1148 | 500 | 500 ✓ | ✓ |  | 2 |
| 1258 | 4.6 | 4.6 ✓ | ✓ |  | 2 |
| 1295 | 100 | 100 ✓ | ✓ |  | 2 |
| 1295 | 500 | 500 ✓ | ✓ |  | 2 |
| 1333 | 100 | 100 ✓ | ✓ |  | 2 |
| 1550 | 45 | 45 ✓ | ✓ |  | 2 |

### Pagina 6-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 469 | 6-4 | 6-4 ✓ | ✓ |  | 2 |
| 507 | 2 | 2 ✓ | – |  | 1 |
| 903 | 30° | 30 ✓ | ✓ |  | 2 |
| 1375 | (1) | (1) ✓ | ✓ |  | 2 |
| 1412 | (2) | (2) ✓ | ✓ |  | 2 |
| 1412 | (300 | (300 ✓ | ✓ |  | 2 |
| 1484 | (3) | (3) ✓ | ✓ |  | 2 |
| 1521 | (4) | (4) ✓ | ✓ |  | 2 |

### Pagina 6-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 465 | 6-5 | 6-5 ✓ | ✓ |  | 2 |
| 500 | 2 | rs  | – |  | 0 |
| 1256 | 15 | IS  | ✓ |  | 1 |
| 1944 | 50-50 | 50-50 ✓ | ✓ |  | 2 |
| 2013 | 50% | SO  | ✓ |  | 1 |

### Pagina 6-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 474 | 6-6 | 6-6 ✓ | ✓ |  | 2 |
| 510 | 2 | Z  | – |  | 0 |

### Pagina 6-7 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 6-7 | 6-7 ✓ | ✓ |  | 2 |
| 490 | 2 | ps  | – |  | 0 |
| 819 | 6-1) | 6-1) ✓ | ✓ |  | 2 |
| 854 | 17 | 17 ✓ | ✓ |  | 2 |
| 854 | (64 | (64 ✓ | ✓ |  | 2 |
| 890 | (17 | (17 ✓ | ✓ |  | 2 |
| 890 | -64 | -64 ✓ | ✓ |  | 2 |
| 1477 | (1) | (1) ✓ | ✓ |  | 2 |
| 1549 | (2) | (2) ✓ | ✓ |  | 2 |
| 1619 | (3) | (3) ✓ | ✓ |  | 2 |
| 1691 | (4) | (4) ✓ | ✓ |  | 2 |
| 1867 | (1) | (1) ✓ | ✓ |  | 2 |
| 1936 | (2) | (2) ✓ | ✓ |  | 2 |
| 2007 | (3) | (3) ✓ | ✓ |  | 2 |

### Pagina 6-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 464 | 6-8 | 6-8 ✓ | ✓ |  | 2 |
| 501 | 2 | 2 ✓ | – |  | 1 |
| 2061 | 6-1. | K  | ✓ |  | 1 |

### Pagina 6-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 456 | 6-9 | 6-9 ✓ | ✓ |  | 2 |
| 494 | 2 | 2 ✓ | – |  | 1 |
| 679 | 45 | 45 ✓ | ✓ |  | 2 |
| 715 | 1 | I  | ✓ |  | 1 |
| 786 | (4) | (4) ✓ | ✓ |  | 2 |
| 1149 | 3 | 3 ✓ | ✓ |  | 2 |
| 1149 | 5 | 5 ✓ | ✓ |  | 2 |

### Pagina 6-10 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 467 | 6-10 | 6-10 ✓ | ✓ |  | 2 |
| 508 | 2 | 2 ✓ | – |  | 1 |
| 827 | -5°C, | 5C ✓ | ✓ |  | 2 |

### Pagina 6-11 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 456 | 6-11 | 6-11 ✓ | ✓ |  | 2 |
| 493 | 2 | Z  | ✓ |  | 1 |
| 1290 | 5 | .  | – |  | 0 |
| 1290 | 25 | an  | – |  | 0 |

### Pagina 6-12 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 460 | 6-12 | 6-12 ✓ | ✓ |  | 2 |
| 500 | 2 | Z  | ✓ |  | 1 |
| 1620 | 1 | 1 ✓ | ✓ |  | 2 |
| 1623 | 1 | –  | ✓ |  | 1 |
| 1714 | 2 | 2 ✓ | ✓ |  | 2 |
| 1717 | 2 | 2 ✓ | ✓ |  | 2 |
| 1724 | 1 | 1 ✓ | ✓ |  | 2 |
| 1724 | 2 | 2 ✓ | ✓ |  | 2 |
| 1724 | 2 | 2 ✓ | ✓ |  | 2 |
| 1726 | 1 | –  | ✓ |  | 1 |
| 2076 | 6-2. | 6-2. ✓ | ✓ |  | 2 |

### Pagina 6-13 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 457 | 6-13 | 6-13 ✓ | ✓ |  | 2 |
| 494 | 2 | 2 ✓ | ✓ |  | 2 |
| 677 | 1 | l  | ✓ |  | 1 |
| 677 | 2, | 2, ✓ | ✓ |  | 2 |

### Pagina 6-14 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 474 | 6-14 | 6-14 ✓ | ✓ |  | 2 |
| 510 | 2 | 2 ✓ | – |  | 1 |
| 1447 | (1) | (1) ✓ | ✓ |  | 2 |
| 1628 | (1) | (1) ✓ | ✓ |  | 2 |
| 1665 | (2) | (2) ✓ | ✓ |  | 2 |
| 1700 | (3) | (3) ✓ | ✓ |  | 2 |
| 1878 | (1) | (1) ✓ | ✓ |  | 2 |
| 1915 | (2) | (2) ✓ | ✓ |  | 2 |
| 2055 | (1) | (1) ✓ | ✓ |  | 2 |
| 2091 | (2) | (2) ✓ | ✓ |  | 2 |

### Pagina 6-15 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 468 | 6-15 | 6-15 ✓ | ✓ |  | 2 |
| 504 | 2 | Z  | – |  | 0 |
| 686 | (1) | (1) ✓ | ✓ |  | 2 |
| 1302 | (1) | (1) ✓ | ✓ |  | 2 |
| 1411 | (2) | (2) ✓ | ✓ |  | 2 |

### Pagina 6-16 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 469 | 6-16 | 6-16 ✓ | ✓ |  | 2 |
| 506 | 2 | 2 ✓ | – |  | 1 |

### Pagina 6-17 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 471 | 6-17 | 6-17 ✓ | ✓ |  | 2 |
| 510 | 2 | 2 ✓ | – |  | 1 |
| 578 | *37 | 3i  | ✓ |  | 1 |
| 578 | *94 | 94 ✓ | ✓ |  | 2 |
| 578 | *37 | 37s ✓ | ✓ |  | 2 |
| 578 | *94 | 94 ✓ | ✓ |  | 2 |
| 615 | (34 | (34 ✓ | ✓ |  | 2 |
| 615 | 46) | 46) ✓ | ✓ |  | 2 |
| 615 | (86 | (86 ✓ | ✓ |  | 2 |
| 615 | 117) | 117) ✓ | ✓ |  | 2 |
| 615 | (34 | (34 ✓ | ✓ |  | 2 |
| 615 | 41) | 41) ✓ | ✓ |  | 2 |
| 615 | (86 | (86 ✓ | ✓ |  | 2 |
| 615 | 104) | 104) ✓ | ✓ |  | 2 |
| 718 | 73 | 73- ✓ | ✓ |  | 2 |
| 718 | 185 | 185 ✓ | ✓ |  | 2 |
| 718 | 73 | 13  | ✓ |  | 1 |
| 718 | 185 | 185 ✓ | ✓ |  | 2 |
| 824 | **95 | 95- ✓ | ✓ |  | 2 |
| 824 | **241 | 241 ✓ | ✓ |  | 2 |
| 836 | 96 | 96 ✓ | ✓ |  | 2 |
| 836 | 244 | 244 ✓ | ✓ |  | 2 |
| 895 | 108 | 108- ✓ | ✓ |  | 2 |
| 895 | 274 | 274 ✓ | ✓ |  | 2 |
| 895 | 108 | 108: ✓ | ✓ |  | 2 |
| 895 | 274 | -274 ✓ | ✓ |  | 2 |
| 1178 | 108) | 108) ✓ | ✓ |  | 2 |
| 1321 | 6-3. | 6-3. ✓ | ✓ |  | 2 |

### Pagina 6-18 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 479 | 6-18 | 6-18 ✓ | ✓ |  | 2 |
| 518 | 2 | 2 ✓ | – |  | 1 |
| 422 | cmkg/1000 | cmkg/1000 ✓ | ✓ |  | 2 |
| 422 | cmkg/1000 | cmkg/1000 ✓ | ✓ |  | 2 |
| 504 | 1. | uF  | ✓ |  | 1 |
| 569 | 2. | 2. ✓ | ✓ |  | 2 |
| 568 | 10 | 10 ✓ | ✓ |  | 2 |
| 568 | (9,5 | (9,5 ✓ | ✓ |  | 2 |
| 666 | 3. | 3. ✓ | ✓ |  | 2 |
| 665 | 46 | 46 ✓ | ✓ |  | 2 |
| 665 | 6 | 6 ✓ | ✓ |  | 2 |
| 697 | 174 | 174 ✓ | ✓ |  | 2 |
| 697 | 0,72 | 0,72 ✓ | ✓ |  | 2 |
| 762 | 17 | 7  | ✓ |  | 1 |
| 794 | 6 | 6 ✓ | ✓ |  | 2 |
| 794 | (64 | (64 ✓ | ✓ |  | 2 |
| 794 | 0,72 | 0,72 ✓ | ✓ |  | 2 |
| 857 | 4. | 4. ✓ | ✓ |  | 2 |
| 860 | 86 | 86 ✓ | ✓ |  | 2 |
| 860 | 117 | 117 ✓ | ✓ |  | 2 |
| 921 | 5. | 5. ✓ | ✓ |  | 2 |
| 985 | 6. | 6. ✓ | ✓ |  | 2 |
| 985 | 200 | 200 ✓ | ✓ |  | 2 |
| 985 | (91 | (91 ✓ | ✓ |  | 2 |
| 1017 | 208 | 208 ✓ | ✓ |  | 2 |
| 1017 | 274 | 274 ✓ | ✓ |  | 2 |
| 1050 | 120 | 120 ✓ | ✓ |  | 2 |
| 1050 | (54 | (54 ✓ | ✓ |  | 2 |
| 1131 | 7. | Z.  | ✓ |  | 1 |
| 1226 | 8. | 8. ✓ | ✓ |  | 2 |
| 1226 | (1156,7 | (1156,7 ✓ | ✓ |  | 2 |
| 1226 | 130,8) | 130,8) ✓ | ✓ |  | 2 |
| 507 | 677,7 | 677,7 ✓ | ✓ |  | 2 |
| 507 | 64,1 | 64,1 ✓ | ✓ |  | 2 |
| 601 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 601 | -0,5 | -0,5 ✓ | ✓ |  | 2 |
| 601 | 8,5 | 8,5 ✓ | ✓ |  | 2 |
| 601 | -0,5 | -0,5 ✓ | ✓ |  | 2 |
| 697 | 125,2 | 125,2 ✓ | ✓ |  | 2 |
| 697 | 15,3 | 15,3 ✓ | ✓ |  | 2 |
| 864 | 154,2 | 154,2 ✓ | ✓ |  | 2 |
| 864 | 14,5 | 14,5 ✓ | ✓ |  | 2 |
| 931 | 154,2 | 154,2 ✓ | ✓ |  | 2 |
| 931 | 28,5 | 28,5 ✓ | ✓ |  | 2 |
| 1051 | 36,9 | 36,9 ✓ | ✓ |  | 2 |
| 1051 | 8,9 | 8,9 ✓ | ✓ |  | 2 |
| 1140 | 1156,7 | 1156,7 ✓ | ✓ |  | 2 |
| 1140 | 130,8 | 130,8 ✓ | ✓ |  | 2 |
| 1400 | 6-4. | 6-4. ✓ | ✓ |  | 2 |

### Pagina 6-19 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|

### Pagina 6-20 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 475 | 6-20 | 6-20 ✓ | ✓ |  | 2 |
| 512 | 2 | 2 ✓ | – |  | 1 |
| 451 | 1100 | 1100 ✓ | ✓ |  | 2 |
| 620 | 1000 | 1000 ✓ | ✓ |  | 2 |
| 787 | 900 | 900 ✓ | ✓ |  | 2 |
| 950 | 800 | 800 ✓ | ✓ |  | 2 |
| 1118 | 700 | 700 ✓ | ✓ |  | 2 |
| 394 | 2500 | 2500 ✓ | ✓ |  | 2 |
| 472 | 2400 | 2400 ✓ | ✓ |  | 2 |
| 546 | 2300 | 2300 ✓ | ✓ |  | 2 |
| 622 | 2200 | 2200 ✓ | ✓ |  | 2 |
| 696 | 2100 | 2100 ✓ | ✓ |  | 2 |
| 774 | 2000 | 2000 ✓ | ✓ |  | 2 |
| 850 | 1900 | 1900 ✓ | ✓ |  | 2 |
| 928 | 1800 | 1800 ✓ | ✓ |  | 2 |
| 1002 | 1700 | 1700 ✓ | ✓ |  | 2 |
| 1078 | 1600 | 1600 ✓ | ✓ |  | 2 |
| 1151 | 1500 | 1500 ✓ | ✓ |  | 2 |
| 1186 | 50 | –  | ✓ |  | 1 |
| 1186 | 55 | t 55 ✓ | ✓ |  | 2 |
| 1185 | 60 | oO  | ✓ |  | 1 |
| 1185 | 65 | c 65 . ✓ | ✓ |  | 2 |
| 1185 | 70 | 2 70  | ✓ |  | 1 |
| 1185 | 75 | : 75 ✓ | ✓ |  | 2 |
| 1185 | 80 | 80 ✓ | ✓ |  | 2 |
| 1185 | 85 | 85 ✓ | ✓ |  | 2 |
| 1185 | 90 | 90 ✓ | ✓ |  | 2 |
| 1185 | 95 | - 95 ✓ | ✓ |  | 2 |
| 1185 | 100 | 100 ✓ | ✓ |  | 2 |
| 1185 | 105 | 108  | ✓ |  | 1 |
| 1185 | 110 | 410  | ✓ |  | 1 |
| 1185 | 115 | 115 ✓ | ✓ |  | 2 |
| 1185 | 120 | 120 ✓ | ✓ |  | 2 |
| 1237 | 60 | 60 ✓ | ✓ |  | 2 |
| 1237 | 65 | 65 ✓ | ✓ |  | 2 |
| 1237 | 70 | 70 ✓ | ✓ |  | 2 |
| 1237 | 75 | 75 ✓ | ✓ |  | 2 |
| 1237 | 80 | 80 ✓ | ✓ |  | 2 |
| 1238 | 85 | 85 ✓ | ✓ |  | 2 |
| 1237 | 90 | 90 ✓ | ✓ |  | 2 |
| 1237 | 95 | –  | ✓ |  | 1 |
| 1237 | 100 | 100 ✓ | ✓ |  | 2 |
| 1237 | 105 | 105 ✓ | ✓ |  | 2 |
| 1237 | 110 | 110 ✓ | ✓ |  | 2 |
| 1237 | 115 | 115 ✓ | ✓ |  | 2 |
| 1237 | 120 | 120 ✓ | ✓ |  | 2 |
| 1237 | 125 | 125 ✓ | ✓ |  | 2 |
| 1237 | 130 | 130 ✓ | ✓ |  | 2 |
| 1237 | 135 | 136  | ✓ |  | 1 |
| 1237 | 140 | 140 ✓ | ✓ |  | 2 |
| 1285 | MOMENT/1000 | MOMENT/1000 ✓ | ✓ |  | 2 |
| 1400 | 6-6. | 6-6. ✓ | ✓ |  | 2 |

