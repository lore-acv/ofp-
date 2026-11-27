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
| 1-1 | ricostruita | 26/26 | 1 | 7 (0 con 2+ conferme) | 1 | 11.0% | **da rivedere** |
| 3-1 | ricostruita | 33/33 | 3 | 22 (0 con 2+ conferme) | 28 | 12.5% | **da rivedere** |
| 3-2 | ricostruita | 39/39 | 0 | 19 (0 con 2+ conferme) | 21 | 16.3% | **da rivedere** |
| 3-3 | ricostruita | 34/34 | 1 | 17 (0 con 2+ conferme) | 20 | 14.5% | **da rivedere** |
| 3-4 | ricostruita | 36/36 | 0 | 14 (0 con 2+ conferme) | 15 | 10.7% | **da rivedere** |
| 3-5 | ricostruita | 39/39 | 0 | 42 (0 con 2+ conferme) | 42 | 13.1% | **da rivedere** |
| 3-6 | ricostruita | 39/39 | 0 | 23 (0 con 2+ conferme) | 27 | 12.1% | **da rivedere** |
| 3-8 | ricostruita | 39/39 | 0 | 3 (0 con 2+ conferme) | 3 | 11.0% | **da rivedere** |
| 3-9 | ricostruita | 27/27 | 0 | 2 (0 con 2+ conferme) | 3 | 14.3% | **da rivedere** |
| 4-6 | ricostruita | 28/28 | 0 | 36 (0 con 2+ conferme) | 8 | 13.3% | **da rivedere** |
| 4-7 | ricostruita | 38/38 | 0 | 10 (0 con 2+ conferme) | 6 | 12.8% | **da rivedere** |
| 6-2 | ricostruita | 40/40 | 10 | 18 (0 con 2+ conferme) | 33 | 15.0% | **da rivedere** |
| 6-3 | ricostruita | 33/33 | 0 | 9 (0 con 2+ conferme) | 9 | 13.3% | **da rivedere** |
| 6-4 | ricostruita | 34/34 | 6 | 8 (0 con 2+ conferme) | 15 | 16.5% | **da rivedere** |
| 6-5 | ricostruita | 39/40 | 11 | 5 (0 con 2+ conferme) | 20 | 14.9% | **da rivedere** |
| 6-9 | ricostruita | 21/21 | 0 | 7 (0 con 2+ conferme) | 8 | 14.9% | **da rivedere** |
| 6-10 | ricostruita | 36/36 | 17 | 3 (0 con 2+ conferme) | 21 | 23.6% | **da rivedere** |
| 6-13 | ricostruita | 31/31 | 2 | 4 (0 con 2+ conferme) | 7 | 13.1% | **da rivedere** |
| 6-14 | ricostruita | 31/31 | 6 | 10 (0 con 2+ conferme) | 17 | 25.1% | **da rivedere** |
| 6-15 | ricostruita | 25/25 | 0 | 5 (0 con 2+ conferme) | 6 | 14.3% | **da rivedere** |
| 6-16 | ricostruita | 9/9 | 8 | 2 (0 con 2+ conferme) | 11 | 30.4% | **da rivedere** |

## Figure: metodo


## Differenze aperte

| Pagina | Riga (y) | Cosa | Valore originale | Valore ricostruito |
|---|---|---|---|---|
| 1-1 | 568 | macchia solo ricostruita, 26 px | riquadro 1186, 568, 1193, 572 | |
| 3-1 | 678 | macchia solo originale, 34 px | riquadro 1221, 678, 1231, 681 | |
| 3-1 | 1328 | macchia solo originale, 30 px | riquadro 478, 1328, 479, 1342 | |
| 3-1 | 1934 | macchia solo ricostruita, 40 px | riquadro 354, 1934, 357, 1954 | |
| 3-1 | 500 | numero | 2 | 3 |
| 3-1 | 1563 | numero | (3) | (5) |
| 3-1 | 1956 | numero | 37 | 137 |
| 3-1 | 466 | numero con una sola conferma | 3-1 | 3-1 |
| 3-1 | 1089 | numero con una sola conferma | (1) | (1) |
| 3-1 | 1125 | numero con una sola conferma | (2) | (2) |
| 3-1 | 1161 | numero con una sola conferma | (3) | (3) |
| 3-1 | 1234 | numero con una sola conferma | (4) | (4) |
| 3-1 | 1267 | numero con una sola conferma | (5) | (5) |
| 3-1 | 1418 | numero con una sola conferma | (1) | (1) |
| 3-1 | 1418 | numero con una sola conferma | 129 | 129 |
| 3-1 | 1418 | numero con una sola conferma | 70 | 70 |
| 3-1 | 1418 | numero con una sola conferma | 80 | 80 |
| 3-1 | 1454 | numero con una sola conferma | (2) | (2) |
| 3-1 | 1490 | numero con una sola conferma | (3) | (3) |
| 3-1 | 1527 | numero con una sola conferma | (4) | (4) |
| 3-1 | 1956 | numero con una sola conferma | (1 | (1) |
| 3-1 | 1956 | numero con una sola conferma | 74 | 74 |
| 3-1 | 1956 | numero con una sola conferma | 85 | 85 |
| 3-1 | 2027 | numero con una sola conferma | (2) | (2) |
| 3-1 | 2063 | numero con una sola conferma | (3) | (3) |
| 3-1 | 2097 | numero con una sola conferma | (4) | (4) |
| 3-2 | 622 | numero | (3) | (5) |
| 3-2 | 1092 | numero | (3) | (5) |
| 3-2 | 478 | numero con una sola conferma | 3-2 | 3-2 |
| 3-2 | 515 | numero con una sola conferma | 2 | 2 |
| 3-2 | 622 | numero con una sola conferma | 3-5 | 3-5 |
| 3-2 | 658 | numero con una sola conferma | 1/2 | 1/2 |
| 3-2 | 693 | numero con una sola conferma | (6) | (6) |
| 3-2 | 693 | numero con una sola conferma | (2,5 | (2,5 |
| 3-2 | 731 | numero con una sola conferma | (7) | (7) |
| 3-2 | 945 | numero con una sola conferma | (1) | (1) |
| 3-2 | 981 | numero con una sola conferma | (2) | (2) |
| 3-2 | 1018 | numero con una sola conferma | (3) | (3) |
| 3-2 | 1055 | numero con una sola conferma | (4) | (4) |
| 3-2 | 1711 | numero con una sola conferma | (1) | (1) |
| 3-2 | 1746 | numero con una sola conferma | (2) | (2) |
| 3-2 | 1783 | numero con una sola conferma | (3) | (3) |
| 3-2 | 1819 | numero con una sola conferma | (4) | (4) |
| 3-2 | 1853 | numero con una sola conferma | (5) | (5) |
| 3-2 | 2063 | numero con una sola conferma | (6) | (6) |
| 3-3 | 833 | macchia solo originale, 31 px | riquadro 712, 833, 714, 847 | |
| 3-3 | 490 | numero | z | 3 |
| 3-3 | 1070 | numero | (3) | (8) |
| 3-3 | 453 | numero con una sola conferma | 3-3 | 3-3 |
| 3-3 | 780 | numero con una sola conferma | (1) | (1) |
| 3-3 | 813 | numero con una sola conferma | (2) | (2) |
| 3-3 | 851 | numero con una sola conferma | (3) | (3) |
| 3-3 | 887 | numero con una sola conferma | (4) | (4) |
| 3-3 | 887 | numero con una sola conferma | 193 | 193 |
| 3-3 | 887 | numero con una sola conferma | 104 | 104 |
| 3-3 | 887 | numero con una sola conferma | 120 | 120 |
| 3-3 | 923 | numero con una sola conferma | (5) | (5) |
| 3-3 | 960 | numero con una sola conferma | (6) | (6) |
| 3-3 | 996 | numero con una sola conferma | (7) | (7) |
| 3-3 | 1286 | numero con una sola conferma | (1) | (1) |
| 3-3 | 1326 | numero con una sola conferma | (2) | (2) |
| 3-3 | 1862 | numero con una sola conferma | (1) | (1) |
| 3-3 | 1898 | numero con una sola conferma | (2) | (2) |
| 3-4 | 1783 | numero | Al | 121 |
| 3-4 | 481 | numero con una sola conferma | 3-4 | 3-4 |
| 3-4 | 519 | numero con una sola conferma | 2 | 2 |
| 3-4 | 956 | numero con una sola conferma | (1) | (1) |
| 3-4 | 990 | numero con una sola conferma | (2) | (2) |
| 3-4 | 1027 | numero con una sola conferma | (3) | (3) |
| 3-4 | 1102 | numero con una sola conferma | (4) | (4) |
| 3-4 | 1140 | numero con una sola conferma | (5) | (5) |
| 3-4 | 1218 | numero con una sola conferma | (6) | (6) |
| 3-4 | 1502 | numero con una sola conferma | (1) | (1) |
| 3-4 | 1538 | numero con una sola conferma | (2) | (2) |
| 3-4 | 1783 | numero con una sola conferma | 65 | 65 |
| 3-4 | 1819 | numero con una sola conferma | 75 | 75 |
| 3-4 | 1819 | numero con una sola conferma | 20) | 20°) |
| 3-5 | 452 | numero con una sola conferma | 3-5 | 3-5 |
| 3-5 | 493 | numero con una sola conferma | 2 | 2 |
| 3-5 | 891 | numero con una sola conferma | (1) | (1) |
| 3-5 | 927 | numero con una sola conferma | (2) | (2) |
| 3-5 | 927 | numero con una sola conferma | 20 | 20° |
| 3-5 | 927 | numero con una sola conferma | 121 | 121 |
| 3-5 | 927 | numero con una sola conferma | 65 | 65 |
| 3-5 | 927 | numero con una sola conferma | 75 | 75 |
| 3-5 | 1037 | numero con una sola conferma | (3) | (3) |
| 3-5 | 1109 | numero con una sola conferma | (4) | (4) |
| 3-5 | 1109 | numero con una sola conferma | 40 | 40° |
| 3-5 | 1109 | numero con una sola conferma | 121 | 121 |
| 3-5 | 1109 | numero con una sola conferma | 65 | 65 |
| 3-5 | 1109 | numero con una sola conferma | 75 | 75 |
| 3-5 | 1146 | numero con una sola conferma | (5) | (5) |
| 3-5 | 1182 | numero con una sola conferma | (6) | (6) |
| 3-5 | 1219 | numero con una sola conferma | (7) | (7) |
| 3-5 | 1435 | numero con una sola conferma | 137 | 137 |
| 3-5 | 1435 | numero con una sola conferma | 74 | 74 |
| 3-5 | 1471 | numero con una sola conferma | 85 | 85 |
| 3-5 | 1724 | numero con una sola conferma | (1) | (1) |
| 3-5 | 1757 | numero con una sola conferma | (2) | (2) |
| 3-5 | 1793 | numero con una sola conferma | (3) | (3) |
| 3-5 | 1828 | numero con una sola conferma | (4) | (4) |
| 3-5 | 1828 | numero con una sola conferma | 121 | 121 |
| 3-5 | 1828 | numero con una sola conferma | 137 | 137 |
| 3-5 | 1828 | numero con una sola conferma | 65 | 65 |
| 3-5 | 1828 | numero con una sola conferma | 74 | 74 |
| 3-5 | 1828 | numero con una sola conferma | 75 | 75 |
| 3-5 | 1828 | numero con una sola conferma | 85 | 85 |
| 3-5 | 1865 | numero con una sola conferma | (5) | (5) |
| 3-5 | 1899 | numero con una sola conferma | (6) | (6) |
| 3-5 | 1899 | numero con una sola conferma | 113 | 113 |
| 3-5 | 1899 | numero con una sola conferma | 129 | 129 |
| 3-5 | 1899 | numero con una sola conferma | 61 | 61 |
| 3-5 | 1899 | numero con una sola conferma | 70 | 70 |
| 3-5 | 1899 | numero con una sola conferma | 70 | 70 |
| 3-5 | 1899 | numero con una sola conferma | 80 | 80 |
| 3-5 | 1968 | numero con una sola conferma | (7) | (7) |
| 3-5 | 2003 | numero con una sola conferma | (8) | (8) |
| 3-5 | 2039 | numero con una sola conferma | (9) | (9) |
| 3-5 | 2074 | numero con una sola conferma | (10) | (10) |
| 3-6 | 516 | numero | 2 | 3 |
| 3-6 | 918 | numero | 409 | 40° |
| 3-6 | 955 | numero | Lis | 113 |
| 3-6 | 1138 | numero | (3) | (5) |
| 3-6 | 481 | numero con una sola conferma | 3-6 | 3-6 |
| 3-6 | 772 | numero con una sola conferma | 121.5 | 121.5 |
| 3-6 | 845 | numero con una sola conferma | (1) | (1) |
| 3-6 | 918 | numero con una sola conferma | (2) | (2) |
| 3-6 | 918 | numero con una sola conferma | 300 | 300 |
| 3-6 | 955 | numero con una sola conferma | 61 | 61 |
| 3-6 | 955 | numero con una sola conferma | 70 | 70 |
| 3-6 | 990 | numero con una sola conferma | (3) | (3) |
| 3-6 | 1027 | numero con una sola conferma | (4) | (4) |
| 3-6 | 1174 | numero con una sola conferma | (6) | (6) |
| 3-6 | 1247 | numero con una sola conferma | (7) | (7) |
| 3-6 | 1677 | numero con una sola conferma | (1) | (1) |
| 3-6 | 1713 | numero con una sola conferma | (2) | (2) |
| 3-6 | 1783 | numero con una sola conferma | (3) | (3) |
| 3-6 | 1853 | numero con una sola conferma | (4) | (4) |
| 3-6 | 1888 | numero con una sola conferma | (5) | (5) |
| 3-6 | 1958 | numero con una sola conferma | (6) | (6) |
| 3-6 | 1958 | numero con una sola conferma | 0,5 | 0,5 |
| 3-6 | 2029 | numero con una sola conferma | (7) | (7) |
| 3-8 | 481 | numero con una sola conferma | 3-8 | 3-8 |
| 3-8 | 518 | numero con una sola conferma | 2 | 2 |
| 3-8 | 1065 | numero con una sola conferma | 16 | 16 |
| 3-9 | 496 | numero | 2 | 3 |
| 3-9 | 462 | numero con una sola conferma | 3-9 | 3-9 |
| 4-6 | 758 | numero | i29 | 129 |
| 4-6 | 758 | numero | 30 | 80 |
| 4-6 | 976 | numero | 202. | 20°. |
| 4-6 | 1810 | numero | (3) | (5) |
| 4-7 | 494 | numero | 2 | 3 |
| 4-7 | 1070 | numero | Z | 2 |
| 4-7 | 1070 | numero | 13.0 | 15,5 |
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
| 6-2 | 517 | numero | 2 | 3 |
| 6-2 | 842 | numero | 590 | 5°C |
| 6-2 | 842 | numero | 1OW30 | 10W30 |
| 6-2 | 842 | numero | SC. | 5°C. |
| 6-2 | 1858 | numero | Cha: | 25 |
| 6-2 | 481 | numero con una sola conferma | 6-2 | 6-2 |
| 6-2 | 842 | numero con una sola conferma | 50 | 50 |
| 6-2 | 842 | numero con una sola conferma | 30 | 30 |
| 6-2 | 878 | numero con una sola conferma | 10W30 | 10W30 |
| 6-2 | 951 | numero con una sola conferma | MHS-24A, | MHS-24A, |
| 6-2 | 1174 | numero con una sola conferma | 25 | 25 |
| 6-2 | 1214 | numero con una sola conferma | MIL-L-6082. | MIL-L-6082. |
| 6-2 | 1409 | numero con una sola conferma | 25 | 25 |
| 6-2 | 1464 | numero con una sola conferma | 25 | 25 |
| 6-2 | 1575 | numero con una sola conferma | 50 | 50 |
| 6-2 | 1665 | numero con una sola conferma | 50 | 50 |
| 6-2 | 1715 | numero con una sola conferma | 30 | 30 |
| 6-2 | 1893 | numero con una sola conferma | 50 | 50 |
| 6-3 | 459 | numero con una sola conferma | 6-3 | 6-3 |
| 6-3 | 497 | numero con una sola conferma | 2 | 2 |
| 6-3 | 680 | numero con una sola conferma | 100 | 100 |
| 6-3 | 1148 | numero con una sola conferma | 500 | 500 |
| 6-3 | 1258 | numero con una sola conferma | 4.6 | 4.6 |
| 6-3 | 1295 | numero con una sola conferma | 100 | 100 |
| 6-3 | 1295 | numero con una sola conferma | 500 | 500 |
| 6-3 | 1333 | numero con una sola conferma | 100 | 100 |
| 6-3 | 1550 | numero con una sola conferma | 45 | 45 |
| 6-4 | 609 | macchia solo originale, 360 px | riquadro 793, 609, 1029, 611 | |
| 6-4 | 610 | macchia solo originale, 46 px | riquadro 691, 610, 732, 612 | |
| 6-4 | 610 | macchia solo originale, 69 px | riquadro 736, 610, 780, 611 | |
| 6-4 | 611 | macchia solo originale, 40 px | riquadro 659, 611, 689, 612 | |
| 6-4 | 2055 | macchia solo originale, 203 px | riquadro 406, 2055, 532, 2057 | |
| 6-4 | 633 | macchia solo ricostruita, 754 px | riquadro 647, 633, 1023, 634 | |
| 6-4 | 507 | numero | 2 | 3 |
| 6-4 | 469 | numero con una sola conferma | 6-4 | 6-4 |
| 6-4 | 903 | numero con una sola conferma | 30 | 30° |
| 6-4 | 1375 | numero con una sola conferma | (1) | (1) |
| 6-4 | 1412 | numero con una sola conferma | (2) | (2) |
| 6-4 | 1412 | numero con una sola conferma | (300 | (300 |
| 6-4 | 1484 | numero con una sola conferma | (3) | (3) |
| 6-4 | 1521 | numero con una sola conferma | (4) | (4) |
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
| 6-5 | 465 | numero con una sola conferma | 6-5 | 6-5 |
| 6-5 | 1944 | numero con una sola conferma | 50-50 | 50-50 |
| 6-9 | 715 | numero | I | 1 |
| 6-9 | 456 | numero con una sola conferma | 6-9 | 6-9 |
| 6-9 | 494 | numero con una sola conferma | 2 | 2 |
| 6-9 | 679 | numero con una sola conferma | 45 | 45 |
| 6-9 | 786 | numero con una sola conferma | (4) | (4) |
| 6-9 | 1149 | numero con una sola conferma | 3 | 3 |
| 6-9 | 1149 | numero con una sola conferma | 5 | 5 |
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
| 6-10 | 508 | numero | 2 | 3 |
| 6-10 | 467 | numero con una sola conferma | 6-10 | 6-10 |
| 6-10 | 827 | numero con una sola conferma | 5C | -5°C, |
| 6-13 | 1756 | macchia solo originale, 436 px | riquadro 1153, 1756, 1161, 1865 | |
| 6-13 | 1763 | macchia solo ricostruita, 480 px | riquadro 1141, 1763, 1145, 1858 | |
| 6-13 | 677 | numero | l | 1 |
| 6-13 | 457 | numero con una sola conferma | 6-13 | 6-13 |
| 6-13 | 494 | numero con una sola conferma | 2 | 2 |
| 6-13 | 677 | numero con una sola conferma | 2, | 2, |
| 6-14 | 574 | macchia solo originale, 2715 px | riquadro 515, 574, 1258, 589 | |
| 6-14 | 576 | macchia solo originale, 478 px | riquadro 389, 576, 513, 589 | |
| 6-14 | 679 | macchia solo originale, 3187 px | riquadro 395, 679, 1249, 684 | |
| 6-14 | 595 | macchia solo ricostruita, 2853 px | riquadro 396, 595, 1251, 598 | |
| 6-14 | 686 | macchia solo ricostruita, 2928 px | riquadro 384, 686, 1249, 700 | |
| 6-14 | 686 | macchia solo ricostruita, 54 px | riquadro 1253, 686, 1256, 699 | |
| 6-14 | 510 | numero | 2 | 3 |
| 6-14 | 474 | numero con una sola conferma | 6-14 | 6-14 |
| 6-14 | 1447 | numero con una sola conferma | (1) | (1) |
| 6-14 | 1628 | numero con una sola conferma | (1) | (1) |
| 6-14 | 1665 | numero con una sola conferma | (2) | (2) |
| 6-14 | 1700 | numero con una sola conferma | (3) | (3) |
| 6-14 | 1878 | numero con una sola conferma | (1) | (1) |
| 6-14 | 1915 | numero con una sola conferma | (2) | (2) |
| 6-14 | 2055 | numero con una sola conferma | (1) | (1) |
| 6-14 | 2091 | numero con una sola conferma | (2) | (2) |
| 6-15 | 504 | numero | Z | 2 |
| 6-15 | 468 | numero con una sola conferma | 6-15 | 6-15 |
| 6-15 | 686 | numero con una sola conferma | (1) | (1) |
| 6-15 | 1302 | numero con una sola conferma | (1) | (1) |
| 6-15 | 1411 | numero con una sola conferma | (2) | (2) |
| 6-16 | 1272 | macchia solo originale, 25 px | riquadro 673, 1272, 697, 1272 | |
| 6-16 | 1272 | macchia solo originale, 27 px | riquadro 737, 1272, 763, 1272 | |
| 6-16 | 1272 | macchia solo originale, 63 px | riquadro 765, 1272, 827, 1272 | |
| 6-16 | 1337 | macchia solo originale, 343 px | riquadro 643, 1337, 818, 1340 | |
| 6-16 | 1338 | macchia solo originale, 195 px | riquadro 826, 1338, 925, 1341 | |
| 6-16 | 1338 | macchia solo originale, 57 px | riquadro 975, 1338, 1019, 1340 | |
| 6-16 | 1339 | macchia solo originale, 35 px | riquadro 926, 1339, 945, 1341 | |
| 6-16 | 1316 | macchia solo ricostruita, 38 px | riquadro 800, 1316, 837, 1316 | |
| 6-16 | 506 | numero | 2 | 3 |
| 6-16 | 469 | numero con una sola conferma | 6-16 | 6-16 |

## Numeri, uno per uno

Sezioni 2, 3, 5 e 6: due conferme indipendenti per ogni numero. ✓ = conferma.

### Pagina 1-1

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 1-1 | 1-1 ✓ | n/d |  | 1 |
| 487 | 2 | 2 ✓ | n/d |  | 1 |
| 1217 | (1) | (1) ✓ | n/d |  | 1 |
| 1252 | (2) | (2) ✓ | n/d |  | 1 |
| 1290 | (3) | (3) ✓ | n/d |  | 1 |
| 1329 | (4) | (4) ✓ | n/d |  | 1 |
| 1366 | (5) | (5) ✓ | n/d |  | 1 |

### Pagina 3-1 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 466 | 3-1 | 3-1 ✓ | n/d |  | 1 |
| 500 | 3 | 2  | n/d |  | 0 |
| 1089 | (1) | (1) ✓ | n/d |  | 1 |
| 1125 | (2) | (2) ✓ | n/d |  | 1 |
| 1161 | (3) | (3) ✓ | n/d |  | 1 |
| 1234 | (4) | (4) ✓ | n/d |  | 1 |
| 1267 | (5) | (5) ✓ | n/d |  | 1 |
| 1418 | (1) | (1) ✓ | n/d |  | 1 |
| 1418 | 129 | 129 ✓ | n/d |  | 1 |
| 1418 | 70 | 70 ✓ | n/d |  | 1 |
| 1418 | 80 | 80 ✓ | n/d |  | 1 |
| 1454 | (2) | (2) ✓ | n/d |  | 1 |
| 1490 | (3) | (3) ✓ | n/d |  | 1 |
| 1527 | (4) | (4) ✓ | n/d |  | 1 |
| 1563 | (5) | (3)  | n/d |  | 0 |
| 1956 | (1) | (1 ✓ | n/d |  | 1 |
| 1956 | 137 | 37  | n/d |  | 0 |
| 1956 | 74 | 74 ✓ | n/d |  | 1 |
| 1956 | 85 | 85 ✓ | n/d |  | 1 |
| 2027 | (2) | (2) ✓ | n/d |  | 1 |
| 2063 | (3) | (3) ✓ | n/d |  | 1 |
| 2097 | (4) | (4) ✓ | n/d |  | 1 |

### Pagina 3-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 478 | 3-2 | 3-2 ✓ | n/d |  | 1 |
| 515 | 2 | 2 ✓ | n/d |  | 1 |
| 622 | (5) | (3)  | n/d |  | 0 |
| 622 | 3-5 | 3-5 ✓ | n/d |  | 1 |
| 658 | 1/2 | 1/2 ✓ | n/d |  | 1 |
| 693 | (6) | (6) ✓ | n/d |  | 1 |
| 693 | (2,5 | (2,5 ✓ | n/d |  | 1 |
| 731 | (7) | (7) ✓ | n/d |  | 1 |
| 945 | (1) | (1) ✓ | n/d |  | 1 |
| 981 | (2) | (2) ✓ | n/d |  | 1 |
| 1018 | (3) | (3) ✓ | n/d |  | 1 |
| 1055 | (4) | (4) ✓ | n/d |  | 1 |
| 1092 | (5) | (3)  | n/d |  | 0 |
| 1711 | (1) | (1) ✓ | n/d |  | 1 |
| 1746 | (2) | (2) ✓ | n/d |  | 1 |
| 1783 | (3) | (3) ✓ | n/d |  | 1 |
| 1819 | (4) | (4) ✓ | n/d |  | 1 |
| 1853 | (5) | (5) ✓ | n/d |  | 1 |
| 2063 | (6) | (6) ✓ | n/d |  | 1 |

### Pagina 3-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 453 | 3-3 | 3-3 ✓ | n/d |  | 1 |
| 490 | 3 | z  | n/d |  | 0 |
| 780 | (1) | (1) ✓ | n/d |  | 1 |
| 813 | (2) | (2) ✓ | n/d |  | 1 |
| 851 | (3) | (3) ✓ | n/d |  | 1 |
| 887 | (4) | (4) ✓ | n/d |  | 1 |
| 887 | 193 | 193 ✓ | n/d |  | 1 |
| 887 | 104 | 104 ✓ | n/d |  | 1 |
| 887 | 120 | 120 ✓ | n/d |  | 1 |
| 923 | (5) | (5) ✓ | n/d |  | 1 |
| 960 | (6) | (6) ✓ | n/d |  | 1 |
| 996 | (7) | (7) ✓ | n/d |  | 1 |
| 1070 | (8) | (3)  | n/d |  | 0 |
| 1286 | (1) | (1) ✓ | n/d |  | 1 |
| 1326 | (2) | (2) ✓ | n/d |  | 1 |
| 1862 | (1) | (1) ✓ | n/d |  | 1 |
| 1898 | (2) | (2) ✓ | n/d |  | 1 |

### Pagina 3-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 3-4 | 3-4 ✓ | n/d |  | 1 |
| 519 | 2 | 2 ✓ | n/d |  | 1 |
| 956 | (1) | (1) ✓ | n/d |  | 1 |
| 990 | (2) | (2) ✓ | n/d |  | 1 |
| 1027 | (3) | (3) ✓ | n/d |  | 1 |
| 1102 | (4) | (4) ✓ | n/d |  | 1 |
| 1140 | (5) | (5) ✓ | n/d |  | 1 |
| 1218 | (6) | (6) ✓ | n/d |  | 1 |
| 1502 | (1) | (1) ✓ | n/d |  | 1 |
| 1538 | (2) | (2) ✓ | n/d |  | 1 |
| 1783 | 121 | Al  | n/d |  | 0 |
| 1783 | 65 | 65 ✓ | n/d |  | 1 |
| 1819 | 75 | 75 ✓ | n/d |  | 1 |
| 1819 | 20°) | 20) ✓ | n/d |  | 1 |

### Pagina 3-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 452 | 3-5 | 3-5 ✓ | n/d |  | 1 |
| 493 | 2 | 2 ✓ | n/d |  | 1 |
| 891 | (1) | (1) ✓ | n/d |  | 1 |
| 927 | (2) | (2) ✓ | n/d |  | 1 |
| 927 | 20° | 20 ✓ | n/d |  | 1 |
| 927 | 121 | 121 ✓ | n/d |  | 1 |
| 927 | 65 | 65 ✓ | n/d |  | 1 |
| 927 | 75 | 75 ✓ | n/d |  | 1 |
| 1037 | (3) | (3) ✓ | n/d |  | 1 |
| 1109 | (4) | (4) ✓ | n/d |  | 1 |
| 1109 | 40° | 40 ✓ | n/d |  | 1 |
| 1109 | 121 | 121 ✓ | n/d |  | 1 |
| 1109 | 65 | 65 ✓ | n/d |  | 1 |
| 1109 | 75 | 75 ✓ | n/d |  | 1 |
| 1146 | (5) | (5) ✓ | n/d |  | 1 |
| 1182 | (6) | (6) ✓ | n/d |  | 1 |
| 1219 | (7) | (7) ✓ | n/d |  | 1 |
| 1435 | 137 | 137 ✓ | n/d |  | 1 |
| 1435 | 74 | 74 ✓ | n/d |  | 1 |
| 1471 | 85 | 85 ✓ | n/d |  | 1 |
| 1724 | (1) | (1) ✓ | n/d |  | 1 |
| 1757 | (2) | (2) ✓ | n/d |  | 1 |
| 1793 | (3) | (3) ✓ | n/d |  | 1 |
| 1828 | (4) | (4) ✓ | n/d |  | 1 |
| 1828 | 121 | 121 ✓ | n/d |  | 1 |
| 1828 | 137 | 137 ✓ | n/d |  | 1 |
| 1828 | 65 | 65 ✓ | n/d |  | 1 |
| 1828 | 74 | 74 ✓ | n/d |  | 1 |
| 1828 | 75 | 75 ✓ | n/d |  | 1 |
| 1828 | 85 | 85 ✓ | n/d |  | 1 |
| 1865 | (5) | (5) ✓ | n/d |  | 1 |
| 1899 | (6) | (6) ✓ | n/d |  | 1 |
| 1899 | 113 | 113 ✓ | n/d |  | 1 |
| 1899 | 129 | 129 ✓ | n/d |  | 1 |
| 1899 | 61 | 61 ✓ | n/d |  | 1 |
| 1899 | 70 | 70 ✓ | n/d |  | 1 |
| 1899 | 70 | 70 ✓ | n/d |  | 1 |
| 1899 | 80 | 80 ✓ | n/d |  | 1 |
| 1968 | (7) | (7) ✓ | n/d |  | 1 |
| 2003 | (8) | (8) ✓ | n/d |  | 1 |
| 2039 | (9) | (9) ✓ | n/d |  | 1 |
| 2074 | (10) | (10) ✓ | n/d |  | 1 |

### Pagina 3-6 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 3-6 | 3-6 ✓ | n/d |  | 1 |
| 516 | 3 | 2  | n/d |  | 0 |
| 772 | 121.5 | 121.5 ✓ | n/d |  | 1 |
| 845 | (1) | (1) ✓ | n/d |  | 1 |
| 918 | (2) | (2) ✓ | n/d |  | 1 |
| 918 | 40° | 409  | n/d |  | 0 |
| 918 | 300 | 300 ✓ | n/d |  | 1 |
| 955 | 113 | Lis  | n/d |  | 0 |
| 955 | 61 | 61 ✓ | n/d |  | 1 |
| 955 | 70 | 70 ✓ | n/d |  | 1 |
| 990 | (3) | (3) ✓ | n/d |  | 1 |
| 1027 | (4) | (4) ✓ | n/d |  | 1 |
| 1138 | (5) | (3)  | n/d |  | 0 |
| 1174 | (6) | (6) ✓ | n/d |  | 1 |
| 1247 | (7) | (7) ✓ | n/d |  | 1 |
| 1677 | (1) | (1) ✓ | n/d |  | 1 |
| 1713 | (2) | (2) ✓ | n/d |  | 1 |
| 1783 | (3) | (3) ✓ | n/d |  | 1 |
| 1853 | (4) | (4) ✓ | n/d |  | 1 |
| 1888 | (5) | (5) ✓ | n/d |  | 1 |
| 1958 | (6) | (6) ✓ | n/d |  | 1 |
| 1958 | 0,5 | 0,5 ✓ | n/d |  | 1 |
| 2029 | (7) | (7) ✓ | n/d |  | 1 |

### Pagina 3-8 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 3-8 | 3-8 ✓ | n/d |  | 1 |
| 518 | 2 | 2 ✓ | n/d |  | 1 |
| 1065 | 16 | 16 ✓ | n/d |  | 1 |

### Pagina 3-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 462 | 3-9 | 3-9 ✓ | n/d |  | 1 |
| 496 | 3 | 2  | n/d |  | 0 |

### Pagina 4-6

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 463 | 4-6 | 4-6 ✓ | n/d |  | 1 |
| 502 | 2 | 2 ✓ | n/d |  | 1 |
| 612 | (2) | (2) ✓ | n/d |  | 1 |
| 649 | (3) | (3) ✓ | n/d |  | 1 |
| 685 | (4) | (4) ✓ | n/d |  | 1 |
| 685 | 121 | 121 ✓ | n/d |  | 1 |
| 685 | 137 | 137 ✓ | n/d |  | 1 |
| 685 | 65 | 65 ✓ | n/d |  | 1 |
| 685 | 74 | 74 ✓ | n/d |  | 1 |
| 685 | 75 | 75 ✓ | n/d |  | 1 |
| 685 | 85 | 85 ✓ | n/d |  | 1 |
| 721 | (5) | (5) ✓ | n/d |  | 1 |
| 758 | (6) | (6) ✓ | n/d |  | 1 |
| 758 | 113 | 113 ✓ | n/d |  | 1 |
| 758 | 129 | i29  | n/d |  | 0 |
| 758 | 61 | 61 ✓ | n/d |  | 1 |
| 758 | 70 | 70 ✓ | n/d |  | 1 |
| 758 | 70 | 70 ✓ | n/d |  | 1 |
| 758 | 80 | 30  | n/d |  | 0 |
| 939 | (1) | (1) ✓ | n/d |  | 1 |
| 939 | 2800 | 2800 ✓ | n/d |  | 1 |
| 976 | (2) | (2) ✓ | n/d |  | 1 |
| 976 | 20°. | 202.  | n/d |  | 0 |
| 1012 | (3) | (3) ✓ | n/d |  | 1 |
| 1012 | 121 | 121 ✓ | n/d |  | 1 |
| 1012 | 65 | 65 ✓ | n/d |  | 1 |
| 1012 | 75 | 75 ✓ | n/d |  | 1 |
| 1236 | (1) | (1) ✓ | n/d |  | 1 |
| 1272 | (2) | (2) ✓ | n/d |  | 1 |
| 1308 | (3) | (3) ✓ | n/d |  | 1 |
| 1491 | (1) | (1) ✓ | n/d |  | 1 |
| 1668 | (1) | (1) ✓ | n/d |  | 1 |
| 1703 | (2) | (2) ✓ | n/d |  | 1 |
| 1739 | (3) | (3) ✓ | n/d |  | 1 |
| 1775 | (4) | (4) ✓ | n/d |  | 1 |
| 1810 | (5) | (3)  | n/d |  | 0 |

### Pagina 4-7

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 455 | 4-7 | 4-7 ✓ | n/d |  | 1 |
| 494 | 3 | 2  | n/d |  | 0 |
| 1070 | 2 | Z  | n/d |  | 0 |
| 1070 | 4 | 4 ✓ | n/d |  | 1 |
| 1070 | (7,8 | (7,8 ✓ | n/d |  | 1 |
| 1070 | 15,5 | 13.0  | n/d |  | 0 |
| 1252 | 1/2 | 1/2 ✓ | n/d |  | 1 |
| 1439 | 3 | 3 ✓ | n/d |  | 1 |
| 1439 | 5 | 5 ✓ | n/d |  | 1 |
| 1904 | 4-2) | 4-2) ✓ | n/d |  | 1 |

### Pagina 6-2 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 481 | 6-2 | 6-2 ✓ | n/d |  | 1 |
| 517 | 3 | 2  | n/d |  | 0 |
| 842 | 50 | 50 ✓ | n/d |  | 1 |
| 842 | 5°C | 590  | n/d |  | 0 |
| 842 | 10W30 | 1OW30  | n/d |  | 0 |
| 842 | 30 | 30 ✓ | n/d |  | 1 |
| 842 | 5°C. | SC.  | n/d |  | 0 |
| 878 | 10W30 | 10W30 ✓ | n/d |  | 1 |
| 951 | MHS-24A, | MHS-24A, ✓ | n/d |  | 1 |
| 1174 | 25 | 25 ✓ | n/d |  | 1 |
| 1214 | MIL-L-6082. | MIL-L-6082. ✓ | n/d |  | 1 |
| 1409 | 25 | 25 ✓ | n/d |  | 1 |
| 1464 | 25 | 25 ✓ | n/d |  | 1 |
| 1575 | 50 | 50 ✓ | n/d |  | 1 |
| 1665 | 50 | 50 ✓ | n/d |  | 1 |
| 1715 | 30 | 30 ✓ | n/d |  | 1 |
| 1858 | 25 | Cha:  | n/d |  | 0 |
| 1893 | 50 | 50 ✓ | n/d |  | 1 |

### Pagina 6-3 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 459 | 6-3 | 6-3 ✓ | n/d |  | 1 |
| 497 | 2 | 2 ✓ | n/d |  | 1 |
| 680 | 100 | 100 ✓ | n/d |  | 1 |
| 1148 | 500 | 500 ✓ | n/d |  | 1 |
| 1258 | 4.6 | 4.6 ✓ | n/d |  | 1 |
| 1295 | 100 | 100 ✓ | n/d |  | 1 |
| 1295 | 500 | 500 ✓ | n/d |  | 1 |
| 1333 | 100 | 100 ✓ | n/d |  | 1 |
| 1550 | 45 | 45 ✓ | n/d |  | 1 |

### Pagina 6-4 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 469 | 6-4 | 6-4 ✓ | n/d |  | 1 |
| 507 | 3 | 2  | n/d |  | 0 |
| 903 | 30° | 30 ✓ | n/d |  | 1 |
| 1375 | (1) | (1) ✓ | n/d |  | 1 |
| 1412 | (2) | (2) ✓ | n/d |  | 1 |
| 1412 | (300 | (300 ✓ | n/d |  | 1 |
| 1484 | (3) | (3) ✓ | n/d |  | 1 |
| 1521 | (4) | (4) ✓ | n/d |  | 1 |

### Pagina 6-5 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 465 | 6-5 | 6-5 ✓ | n/d |  | 1 |
| 500 | 2 | rs  | n/d |  | 0 |
| 1256 | 15 | IS  | n/d |  | 0 |
| 1944 | 50-50 | 50-50 ✓ | n/d |  | 1 |
| 2013 | 50% | SO  | n/d |  | 0 |

### Pagina 6-9 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 456 | 6-9 | 6-9 ✓ | n/d |  | 1 |
| 494 | 2 | 2 ✓ | n/d |  | 1 |
| 679 | 45 | 45 ✓ | n/d |  | 1 |
| 715 | 1 | I  | n/d |  | 0 |
| 786 | (4) | (4) ✓ | n/d |  | 1 |
| 1149 | 3 | 3 ✓ | n/d |  | 1 |
| 1149 | 5 | 5 ✓ | n/d |  | 1 |

### Pagina 6-10 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 467 | 6-10 | 6-10 ✓ | n/d |  | 1 |
| 508 | 3 | 2  | n/d |  | 0 |
| 827 | -5°C, | 5C ✓ | n/d |  | 1 |

### Pagina 6-13 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 457 | 6-13 | 6-13 ✓ | n/d |  | 1 |
| 494 | 2 | 2 ✓ | n/d |  | 1 |
| 677 | 1 | l  | n/d |  | 0 |
| 677 | 2, | 2, ✓ | n/d |  | 1 |

### Pagina 6-14 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 474 | 6-14 | 6-14 ✓ | n/d |  | 1 |
| 510 | 3 | 2  | n/d |  | 0 |
| 1447 | (1) | (1) ✓ | n/d |  | 1 |
| 1628 | (1) | (1) ✓ | n/d |  | 1 |
| 1665 | (2) | (2) ✓ | n/d |  | 1 |
| 1700 | (3) | (3) ✓ | n/d |  | 1 |
| 1878 | (1) | (1) ✓ | n/d |  | 1 |
| 1915 | (2) | (2) ✓ | n/d |  | 1 |
| 2055 | (1) | (1) ✓ | n/d |  | 1 |
| 2091 | (2) | (2) ✓ | n/d |  | 1 |

### Pagina 6-15 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 468 | 6-15 | 6-15 ✓ | n/d |  | 1 |
| 504 | 2 | Z  | n/d |  | 0 |
| 686 | (1) | (1) ✓ | n/d |  | 1 |
| 1302 | (1) | (1) ✓ | n/d |  | 1 |
| 1411 | (2) | (2) ✓ | n/d |  | 1 |

### Pagina 6-16 (due conferme)

| Riga (y) | Valore ricostruito | Tesseract | Testo del PDF | A vista | Conferme |
|---|---|---|---|---|---|
| 469 | 6-16 | 6-16 ✓ | n/d |  | 1 |
| 506 | 3 | 2  | n/d |  | 0 |

