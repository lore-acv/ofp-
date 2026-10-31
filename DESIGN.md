---
name: OFP C172 FR
description: Operational Flight Plan dell'Aeroclub di Varese per i Reims Rocket FR172J e FR172H
colors:
  notte-ground: "#171719"
  notte-surface: "#111013"
  notte-raised: "#212023"
  notte-border: "#252427"
  notte-rule: "#1d1c20"
  notte-control: "#3a3a3e"
  notte-text: "#ffffff"
  notte-muted: "#a3a5ab"
  notte-faint: "#8a8c92"
  notte-accent: "#4a8ad6"
  notte-primary: "#ffffff"
  notte-on-primary: "#000000"
  notte-positive: "#5fc39c"
  notte-positive-bg: "#1b2828"
  notte-warning: "#d9a441"
  notte-warning-bg: "#2a2416"
  notte-negative: "#e5566f"
  notte-negative-bg: "#2c1a20"
  giorno-ground: "#e5e5e2"
  giorno-surface: "#f2f2ef"
  giorno-raised: "#eaeae6"
  giorno-border: "#d7d7d2"
  giorno-rule: "#e3e3de"
  giorno-control: "#bdbdb7"
  giorno-text: "#1a1a18"
  giorno-muted: "#575752"
  giorno-faint: "#62625c"
  giorno-accent: "#2a6cbf"
  giorno-primary: "#1a1a18"
  giorno-on-primary: "#f2f2ef"
  giorno-positive: "#0b5b33"
  giorno-positive-bg: "#dcf5e6"
  giorno-warning: "#8a4a06"
  giorno-warning-bg: "#fdf1d8"
  giorno-negative: "#a3202a"
  giorno-negative-bg: "#ffedea"
  club-red-notte: "#e2453f"
  club-red-giorno: "#b3241f"
  paper-white: "#ffffff"
  paper-ink: "#000000"
typography:
  title:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  section:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "26px"
  card-title:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "22px"
  body:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  small:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  figure:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    fontFeature: "tnum"
  figure-lead:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "24px"
  document:
    fontFamily: "Courier, 'Courier New', monospace"
    fontSize: "9pt"
    fontWeight: 400
rounded:
  pill: "4px"
  card: "6px"
  input: "6px"
  control: "999px"
spacing:
  gap: "24px"
  pad: "32px"
  card-x: "20px"
  row: "32px"
  control: "34px"
  tap: "44px"
  rail: "56px"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.notte-text}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.control}"
  button-primary:
    backgroundColor: "{colors.notte-primary}"
    textColor: "{colors.notte-on-primary}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.control}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.notte-text}"
    typography: "{typography.figure}"
    rounded: "{rounded.input}"
    padding: "0 10px"
    height: "36px"
  card:
    backgroundColor: "{colors.notte-surface}"
    rounded: "{rounded.card}"
    padding: "14px 20px"
  status-pill:
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "22px"
  step-tab:
    textColor: "{colors.notte-faint}"
    padding: "10px 0"
  step-tab-active:
    textColor: "{colors.notte-text}"
---

# Design System: OFP C172 FR

## Overview

**Creative North Star: "L'EFB di notte"**

Il sito e' lo strumento con cui l'Aeroclub di Varese prepara i voli dei suoi
due Reims Rocket. Deve leggersi come una electronic flight bag: superfici
neutre, numeri che si impilano in colonna, nessun colore che non dica
qualcosa. Il carattere viene dal lavoro del pilota (strisce di volo, profilo
verticale, totalizzatore del carburante), non da effetti.

La direzione e' lo stile *Data terminal* della Taste Skill (percorso app
screens, seed 82212707), scelto dall'utente tra tre bozzetti il 29 ottobre
2026 e completato con un tema chiaro. Sostituisce il vecchio sistema "Glass
Cockpit / Carta VFR" (griglia di sfondo, aloni ciano e magenta, ombre
pesanti, etichette maiuscole spaziate), che l'analisi aveva indicato come la
fonte della sensazione di "sito generato".

Due mondi restano distinti. L'**interfaccia** ha due temi con la stessa
struttura: *Notte* (scuro neutro, di serie quando il sistema e' scuro) e
*Giorno* (grigio pietra chiaro, mai bianco pieno). I **documenti** (OFP, NAV-FLIGHTPLAN, Navigation
Log) sono carta: nero su bianco in Courier in entrambi i temi.

**Key Characteristics:**
- Grigi neutri, mai blu notte, mai crema: il colore sta sui dati e sugli stati
- Ogni selezione e' la stessa riga d'accento di 1px, larga quanto la sua etichetta
- Ogni numero, codice ICAO, orario e frequenza in JetBrains Mono a cifre tabellari
- Il segno nel testo (+17.88, -3) prima del colore
- Superfici piatte: nel tema Notte le schede sono piu' scure del fondo, nel
  tema Giorno un gradino piu' chiare del fondo, con un filetto
- Documenti stampati in stile carta, separati dall'interfaccia

## Colors

Due tavolozze con gli stessi ruoli (`notte-*` e `giorno-*`). La quota di
pixel colorati di una schermata resta sotto il 3%.

### Accento
- **Blu selezione** (notte-accent / giorno-accent): solo due usi. (1) La riga
  di 1px sotto o accanto a cio' che e' selezionato: lo step in corso, la voce
  della barra laterale, il segmento scelto, il focus dei campi. (2) La serie
  principale di un grafico: la linea del profilo verticale, la quota di
  carburante richiesta. Mai come fondo di un pulsante o di una scheda.

### Primario
- **Inchiostro invertito** (notte-primary bianco con testo nero,
  giorno-primary quasi nero con testo pietra): il solo pulsante principale della schermata. Non e' un
  colore di marca.

### Marchio
- **Rosso aeroclub** (club-red-notte / club-red-giorno): solo il segno nella
  barra. Non e' un colore di allarme.

### Neutri
- **Ground, surface, raised**: fondo pagina, schede, riquadri annidati e
  campi in sola lettura. Nel tema Notte le schede sono un gradino piu' scure
  del fondo; nel tema Giorno sono grigio pietra chiaro (#f2f2ef) su un
  fondo pietra (#e5e5e2): appena caldi, senza diventare crema.
- **Border, rule, control**: filetto delle schede, righe di tabella e
  separatori interni, bordo dei controlli (un gradino piu' forte).
- **Text, muted, faint**: testo, didascalie ed etichette, meta e unita'.
  Tutti a 4.5:1 almeno sulla superficie dove stanno.

### Stato
Coppie tenui: testo del colore su un fondo dello stesso colore.
- **Positive** (verde): OFP pronto, entro i limiti, step completato.
- **Warning** (ambra): in attesa (briefing da caricare), dato stimato,
  vicino al limite.
- **Negative** (rosso): fuori limite, dato mancante che falsa un calcolo.

### Named Rules
**The One Line Rule.** Una selezione si segna con una sola riga d'accento di
1px sul bordo piu' vicino, larga quanto l'etichetta. Niente pastiglie piene,
niente segmenti colorati, niente barre laterali spesse.

**The Never Alone Rule.** Il colore non porta mai il significato da solo:
ogni stato ha una parola ("Waiting for the briefing", "Within limits") e ogni
differenza ha il suo segno nel testo.

**The Neutral Ground Rule.** Fondi e schede sono grigi neutri, al massimo
appena caldi (pietra). Niente navy, niente ardesia, niente crema o carta
gialla nell'interfaccia; il bianco pieno non si usa nel tema Giorno, e bianco
e nero puri restano al pulsante primario del tema Notte e ai documenti
stampati.

## Typography

**Testo:** Public Sans (400, 500, 600), fallback system-ui.
**Cifre e codici:** JetBrains Mono (400, 500, 600) con cifre tabellari.
**Documenti:** Courier.

I due caratteri sono serviti dal sito (woff2 in `fonts/`, licenza OFL), non
da Google Fonts: il sito deve funzionare anche in hangar con rete scarsa.

**Character:** Public Sans e' il carattere dei moduli e dei servizi pubblici,
chiaro e senza vezzi; JetBrains Mono rende i numeri come su un display di
bordo, con lo zero distinto dalla O.

### Hierarchy
- **Title** (600, 26px/32px, -0.01em): il titolo della schermata, un solo h1.
- **Section** (400, 20px/26px, colore muted): titoli delle aree grandi
  (Profile, ACV standard routes).
- **Card title** (600, 16px/22px): titolo di una scheda.
- **Body** (400, 14px/20px): testo, etichette di riga, note. Sui dispositivi
  touch 15px.
- **Small** (400, 12px/16px): etichette sopra i campi, meta, unita'. Niente
  sotto gli 11px.
- **Figure** (JetBrains Mono, 14px, tnum): valori nelle righe chiave-valore,
  nei campi e nelle tabelle.
- **Figure lead** (JetBrains Mono, 500, 18px): i valori del totalizzatore
  carburante e delle strisce.
- I campi di testo restano a 16px su iPad e telefono, per evitare lo zoom.

### Named Rules
**The Figure Rule.** Ogni numero, codice ICAO, marca, orario, frequenza e
prua va in JetBrains Mono a cifre tabellari. Le frasi no: un risultato di
calcolo si scrive come righe etichetta (Public Sans) e valore (Mono), mai come
una frase intera in monospazio.

**The Sentence Case Rule.** Etichette, titoli, pulsanti e intestazioni di
tabella in maiuscolo solo all'inizio della frase. Nessuna etichetta maiuscola
spaziata. Le sigle aeronautiche (ICAO, METAR, TAF, NOTAM, TOC, MAP, RPM)
restano maiuscole perche' sono sigle.

## Layout

- **Guscio:** una rail di icone di 56px a sinistra (Flights, New flight,
  Manual; tema e account in basso) sullo stesso fondo della pagina, con un
  filetto. Ogni icona ha il suo nome come tooltip e nome accessibile. Sul
  telefono la rail diventa una barra in alto con le stesse icone.
- **Area di lavoro:** padding 32px (16px sul telefono), tutta la larghezza
  disponibile; i blocchi in una riga condividono bordi sinistro e destro.
- **Wizard:** gli 8 step come schede di testo in una riga sopra il titolo,
  con la riga d'accento sotto quello in corso; sul telefono la riga scorre di
  lato dentro se stessa, mai la pagina. Indietro e Avanti in fondo.
- **Griglie:** spazio unico di 24px in orizzontale e in verticale. Le schede
  sorelle (Cruise power, Trip, Alternate) stanno in tre colonne uguali; due
  colonne sotto i 1100px; una sul telefono.
- **Telefono:** il blocco che risponde alla domanda della schermata sale in
  cima (il totalizzatore carburante nello step 2); le strisce dei voli
  diventano schede a due righe con l'azione a tutta larghezza.

## Elevation & Depth

Superfici piatte. La profondita' e' un gradino di luminosita'.
- **Notte:** schede piu' scure del fondo (#111013 su #171719) con un'ombra
  larga e tenue `0 12px 28px rgba(0,0,0,.2)`, senza filetto.
- **Giorno:** schede pietra chiaro con filetto di 1px (#d7d7d2), senza ombra.
- **Galleggiano** solo menu, pop-over, tooltip e finestre di dialogo.
- **Focus:** la riga d'accento sul bordo del campo; da tastiera un anello di
  2px nel colore d'accento.

## Shapes

Angoli stretti: 6px per schede e campi, 4px per le pastiglie di stato, pillola
intera solo per i pulsanti. Bordi di 1px. Tratteggio solo nelle griglie dei
grafici e nelle zone di caricamento file.

## Components

### Buttons
- **Shape:** pillola, 34px con il mouse, almeno 44px al tocco.
- **Default:** trasparente con bordo control, testo 500.
- **Primary:** inchiostro invertito (bianco in Notte, quasi nero in Giorno).
  Uno solo per schermata.
- **Press / Focus:** scala 0.97 alla pressione (140 ms, curva ease-out
  forte); hover solo con mouse.

### Status pills
Altezza 22px, angoli 4px, testo 12px 500 nel colore dello stato su fondo
tenue dello stesso colore. Solo dentro le righe o accanto a un valore, mai
sopra un titolo.

### Cards
Superficie, angoli 6px, titolo card-title con padding 14px 20px. Le righe
interne sono righe chiave-valore alte 32px separate da un filetto rule:
etichetta a sinistra in muted, valore a destra in Figure. La nota sulle fonti
(POH fig. 5-1, AFM fig. 5-6) chiude la scheda in Small faint.

### Inputs / Fields
Etichetta Small sopra il campo; campo 36px (44px al tocco), bordo control,
valore in Figure, unita' in Small faint allineata a destra dentro il campo.
Calcolati e in sola lettura: fondo raised, bordo border, testo muted.

### Navigation
- **Rail:** icone outline 18px in faint; quella attiva in text con la riga
  d'accento di 1px sul bordo della rail.
- **Step tabs:** numero in Mono e nome; completati in muted, futuri in faint,
  quello in corso in text con la riga d'accento sotto, larga quanto
  l'etichetta.

### Flight strips (signature, Dashboard)
Una striscia per volo, come le strisce di progresso volo dei controllori:
caselle separate da filetti per marca e modello, rotta (DEP → ARR, alternato,
waypoint in Mono), distanza, waypoint, stato con data, e l'azione del momento
("Load briefing", "Download OFP"). Sul telefono: stato e data in alto, rotta,
due caselle di dati, azione a tutta larghezza.

### Vertical profile (signature, Route & fuel)
Il profilo del volo in scala sulla distanza: salita dal campo al TOC
(AFM fig. 5-6), crociera alla quota scelta, tacche ai waypoint con i nomi
che non si sovrappongono, il touch & go evidenziato. La linea e' la serie
principale, nel colore d'accento.

### Fuel totalizer
Il piano carburante come lo stampa l'OFP, in una fila di caselle: Taxi, Trip,
Contingency, Alternate, Final reserve, Minimum required (fondo raised), Extra
(con il segno +), Block. Litri in Figure lead, minuti sotto. I totali si
calcolano dalle voci mostrate.

### Documenti stampati
OFP, NAV-FLIGHTPLAN e Navigation Log: nero su bianco, Courier, tabelle a
riquadri, righe "...." da compilare a mano. Non seguono il tema
dell'interfaccia.

### Manuale sfogliabile (manuale.html)
Un libro su un tavolo (modalita' Read di Impeccable): la cornice segue i token
dell'interfaccia, la carta resta carta in entrambi i temi.
- **Cornice:** barra con indice, posizione in lettura (sezione e paragrafo),
  pagina, PDF, tema; sotto, la barra a sezioni: una tacca per sezione lunga
  quanto le sue pagine, quella in lettura appena piu' chiara, e la posizione
  come un segno verticale sottile nel colore del testo che segue il dito 1:1,
  con la bolla di pagina e titolo. Niente riempimento colorato.
- **Indice laterale:** voci con numero e pagina in Figure; la voce in lettura
  segnata dalla riga d'accento, non da un fondo colorato.
- **Carta:** Inter per il testo, blu inchiostro (#1f3a5f) per titoli e
  struttura, ruggine (#c2410c) per numeri di passo e richiami. Apertura di
  sezione con il numero nel blocco blu; la stessa forma torna nei segnalibri:
  linguette che escono dal taglio del libro, una per sezione alla stessa
  altezza in tutto il libro, angoli esterni arrotondati, solo il nome breve in
  maiuscolo piccolo. Quella della sezione in lettura e' ruggine; a destra le
  sezioni che vengono, a sinistra quelle passate, blu. Avvisi WARNING /
  CAUTION / NOTE in riquadri interi con filetto sottile e segno disegnato.
- **Movimento:** la girata e' fisica (molle, vedi `sfoglia.js`): il foglio si
  prende in qualsiasi punto e il punto resta sotto il dito. Tastiera senza
  animazione; "riduci movimento" solo dissolvenze.

### Rotta AV
La rotta dell'aeroclub resta solo nella pagina di accesso, disegnata una
volta con un tratto di 1.5px nel colore d'accento, senza alone; assente con
"riduci movimento".

### Passaggi fra schermate e tema
- **Fra pagine** (accesso, Dashboard, import, foglio): View Transitions fra
  documenti; la rail resta ferma, il contenuto sfuma e sale di 6 px (220 ms).
- **Fra step**, a mano: il foglio esce verso il lato da cui si arriva (100 ms)
  e il nuovo entra dall'altro (230 ms, ease-out); la riga d'accento sotto gli
  step scivola fino al nuovo (260 ms, ease-in-out). Da tastiera nessun
  movimento.
- **Fra Dashboard e foglio**: dissolvenza con il nuovo che sale.
- **Tema**: il pulsante apre la scelta (Night, Day, Match system); il nuovo
  tema si allarga come un cerchio dal pulsante (450 ms). Senza View
  Transitions lo stesso cerchio lo disegna un velo del colore nuovo.
- Con "riduci movimento" restano solo le dissolvenze.

## Do's and Don'ts

### Do:
- **Do** segnare ogni selezione con la sola riga d'accento di 1px (The One Line Rule).
- **Do** scrivere numeri, codici ICAO, marche, orari e frequenze in JetBrains Mono a cifre tabellari (The Figure Rule).
- **Do** mettere a ogni stato una parola e a ogni differenza il suo segno (The Never Alone Rule).
- **Do** mostrare in ambra o rosso, nel sito e nel documento, ogni dato stimato, fuori tabella, mancante o in conflitto.
- **Do** dare a ogni controllo almeno 44px al tocco e una risposta alla pressione (scala 0.97).
- **Do** animare solo con uno scopo, sotto 300 ms, con le curve --ease-out, --ease-in-out o --ease-drawer.
- **Do** controllare ogni modifica in Notte, in Giorno e su telefono, e passarla con `inspect.mjs --app` della Taste Skill.

### Don't:
- **Don't** usare gradienti, aloni, neon, vetro o `backdrop-filter`, griglie di sfondo.
- **Don't** usare fondi navy, ardesia, crema o carta calda nell'interfaccia (The Neutral Ground Rule).
- **Don't** usare etichette maiuscole spaziate o testo sotto gli 11px.
- **Don't** scrivere frasi intere in monospazio.
- **Don't** mettere ombre sulle schede del tema Giorno, ne' bordo e ombra insieme.
- **Don't** usare il rosso dell'aeroclub come colore di allarme o decorazione.
- **Don't** usare saluti, schede di benvenuto illustrate o pastiglie piene per lo step attivo.
- **Don't** applicare il tema scuro o chiaro ai documenti stampati.
- **Don't** usare hover sui dispositivi touch, ease-in o `transition: all`.
