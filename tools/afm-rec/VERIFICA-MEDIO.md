# VERIFICA — Flight Manual I-CCAF, anteprima ricostruita

> Generato da `tools/afm-rec/verifica.mjs afm-ccaf` il 2026-11-25. L'anteprima ricostruita **non fa fede**: fa fede il Flight Manual originale (data/afm/).

## Come si verifica una pagina

1. **Righe.** Per ogni riga (e ogni colonna di una riga) si misura dove comincia e dove finisce l'inchiostro, nell'originale e nella ricostruita, alla stessa scala. Coincide se entrambi gli estremi stanno entro 4 px della scansione retina (circa un terzo di millimetro sulla pagina stampata).
2. **Macchie.** Inchiostro che c'e' solo nell'originale o solo nella ricostruita, tolti gli aloni di un pixel dovuti al disegno diverso delle lettere: ogni macchia di almeno 25 px e' contenuto mancante o in piu'.
3. **Numeri.** Ogni parola con cifre si ritaglia dall'originale e la legge Tesseract da sola; la seconda lettura e' lo strato di testo del PDF (per I-CCAF l'OCR di Acrobat, indipendente). Dove le letture automatiche sbagliano decide il controllo a vista, annotato in `tools/afm-rec/afm-ccaf/controlli.json`. Nelle sezioni 2, 3, 5 e 6 (limitazioni, emergenze, prestazioni, centraggio) ogni numero deve avere **due conferme** indipendenti.
4. **Dati del progetto.** Dove il progetto ha gia' i valori verificati (DATI-AFM.md, tabelle di index.html) si confrontano con la pagina.

Una pagina e' **verificata** solo con zero differenze aperte (righe fuori posto + macchie + numeri non confermati).

"Inchiostro non coincidente" e' solo un'indicazione: misura anche la differenza di disegno fra il font libero e quello originale, e la scansione piu' scura della stampa.

## Pagine

| Pagina | Stato | Righe coincidenti | Macchie | Numeri (conferme) | Differenze aperte | Inchiostro non coincidente | Esito |
|---|---|---|---|---|---|---|---|
| 1-13 | campione | 36/36 | 0 | 4 (4 con 2+ conferme) | 0 | 9.8% | **verificata** |
| 2-1 | campione | 50/50 | 0 | 30 (30 con 2+ conferme) | 0 | 6.2% | **verificata** |
| 5-12 | campione | 26/26 | 0 | 17 (17 con 2+ conferme) | 0 | 7.3% | **verificata** |

## Figure: metodo

- **Grafica della sezione (barre e frecce)** (pagina 2-1): ridisegnata in SVG: rettangoli e triangoli misurati sulla scansione (coordinate dei bordi pixel per pixel).
- **Figura 2-1 (Stall speeds)** (pagina 2-1): tabella ricostruita: filetti SVG misurati (spessore compreso, doppi dove sono doppi) e testo vero nelle celle.
- **Figura 5-7 (Maximum glide)** (pagina 5-12): cornice e griglia: filetti SVG misurati; fascia di planata: 689 punti della retinatura ridisegnati uno per uno nella posizione misurata sulla scansione, piu' 117 punti ricavati dal reticolo locale solo dove si fondono con i filetti della griglia; aeroplano: disegno al tratto vettorializzato con potrace dalla scansione ingrandita 6 volte, dopo aver tolto i filetti e i punti che lo attraversano (tools/afm-rec/afm-ccaf/figure/fig-5-7.py); scritte: testo vero, misurato parola per parola.

## Differenze aperte

Nessuna.

## Numeri, uno per uno

Sezioni 2, 3, 5 e 6: due conferme indipendenti per ogni numero. ✓ = conferma.

### Pagina 1-13

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 246 | 1-13 | 1-13 ✓ | ✓ |  | 2 |
| 278 | 3 | 3 ✓ | ✓ |  | 2 |
| 894 | 0,5 | 0,5 ✓ | ✓ |  | 2 |
| 894 | 1,0 | 1,0 ✓ | ✓ |  | 2 |

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

