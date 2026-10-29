---
name: OFP C172 FR
description: Operational Flight Plan dell'Aeroclub di Varese per i Reims Rocket FR172J e FR172H
colors:
  glass-bg: "#070c15"
  glass-stage: "#0b1119"
  glass-panel: "#0f1620"
  glass-panel-2: "#151d28"
  glass-line: "#27303c"
  glass-line-hover: "#3c4f62"
  glass-field: "#0a1019"
  glass-text: "#ecf1f5"
  glass-text-dim: "#9fabb7"
  glass-action: "#42d2f0"
  glass-action-hi: "#71e3fe"
  glass-on-action: "#05121a"
  glass-active: "#ea58e2"
  glass-ok: "#5dd786"
  glass-warn: "#fcba43"
  glass-err: "#f85452"
  carta-bg: "#e8decd"
  carta-stage: "#dfd5c2"
  carta-panel: "#f6f1e6"
  carta-panel-2: "#eee7d9"
  carta-line: "#cec2af"
  carta-line-hover: "#a18f77"
  carta-field: "#fdfaf4"
  carta-text: "#221811"
  carta-text-dim: "#5c5045"
  carta-action: "#015ba6"
  carta-action-hi: "#136dbf"
  carta-on-action: "#ffffff"
  carta-active: "#a90e88"
  carta-ok: "#146d34"
  carta-warn: "#7f4d00"
  carta-err: "#b3241f"
  club-red: "#f1383e"
  club-red-carta: "#b3241f"
  paper-white: "#ffffff"
  paper-ink: "#000000"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.022em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  subtitle:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.09em"
  field-label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
  data:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, 'Courier New', monospace"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  document:
    fontFamily: "Courier, 'Courier New', monospace"
    fontSize: "9pt"
    fontWeight: 400
rounded:
  sm: "0.5rem"
  md: "0.7rem"
  lg: "1rem"
  pill: "999px"
spacing:
  tap: "2.75rem"
  row-gap: "0.7rem"
  card-x: "1.15rem"
  card-y: "1rem"
  column: "52rem"
components:
  button:
    backgroundColor: "{colors.glass-panel-2}"
    textColor: "{colors.glass-text}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1.1rem"
    height: "{spacing.tap}"
  button-primary:
    backgroundColor: "{colors.glass-action}"
    textColor: "{colors.glass-on-action}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1.1rem"
    height: "{spacing.tap}"
  input:
    backgroundColor: "{colors.glass-field}"
    textColor: "{colors.glass-text}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 0.7rem"
    height: "{spacing.tap}"
  card:
    backgroundColor: "{colors.glass-panel}"
    rounded: "{rounded.lg}"
    padding: "1rem 1.15rem 1.1rem"
  step-pill:
    textColor: "{colors.glass-text-dim}"
    rounded: "{rounded.pill}"
    padding: "0.32rem 0.8rem 0.32rem 0.35rem"
    height: "2.1rem"
  step-pill-active:
    textColor: "{colors.glass-text}"
    rounded: "{rounded.pill}"
  chip:
    backgroundColor: "{colors.glass-field}"
    textColor: "{colors.glass-text-dim}"
    rounded: "{rounded.pill}"
    padding: "0.16rem 0.58rem"
  segmented-tab:
    textColor: "{colors.glass-text-dim}"
    typography: "{typography.data}"
    rounded: "{rounded.md}"
    padding: "0.45rem 1.15rem"
---

# Design System: OFP C172 FR

## Overview

**Creative North Star: "L'ufficio operazioni volo"**

Il sito e' lo strumento con cui l'Aeroclub di Varese prepara i voli dei suoi
due Reims Rocket, e deve comportarsi come il dispatch di una compagnia aerea:
preciso, sobrio, leggibile, con la terminologia e le unita' dell'aviazione.
L'interfaccia prende i ruoli di colore dei glass cockpit (AC 25-11B):
magenta per dove sei, ciano per cio' che comandi, verde, ambra e rosso per lo
stato. L'espressione sta nei dettagli esatti, non negli effetti.

Ci sono due mondi distinti. L'**interfaccia** ha due temi: *Glass Cockpit*
(scuro, blu notte, mai nero puro) e *Carta VFR* (chiaro, carta calda e
inchiostro bruno, mai bianco pieno). I **documenti** (OFP, NAV-FLIGHTPLAN,
Navigation Log) sono carta: nero su bianco in Courier in entrambi i temi,
perche' la carta non ha un tema.

La densita' e' quella di uno strumento di lavoro: una colonna di lettura
centrata, gruppi di campi come schede, numeri allineati in colonna. Il
movimento e' raro e funzionale; l'unico momento espressivo e' la rotta del
logo AV che si disegna all'accesso e in Dashboard.

**Key Characteristics:**
- Ruoli di colore da glass cockpit, mai decorativi
- Numeri sempre in cifre tabellari, dati operativi in monospazio
- Ogni stato detto a parole oltre che con il colore
- Schede con bordo sottile e ombra morbida su sfondo a griglia leggera
- Documenti stampati in stile carta, separati dall'interfaccia

## Colors

Due tavolozze con gli stessi ruoli; in ogni tema una sola tinta per ruolo.

### Primary
- **Ciano strumento** (glass-action / carta-action): tutto cio' che si preme o si seleziona, il focus dei campi, i valori compilati nei titoli. Nel chiaro diventa il blu delle carte aeronautiche.

### Secondary
- **Magenta rotta attiva** (glass-active / carta-active): solo la fase in corso (la pastiglia dello step attivo) e la rotta disegnata, come la tratta attiva sul GPS.

### Tertiary
- **Rosso aeroclub** (club-red / club-red-carta): solo il marchio nella barra in alto. Non e' un colore di allarme dell'interfaccia.

### Neutral
- **Notte strumento** (glass-bg, glass-panel, glass-panel-2): sfondo, schede, barre. Sempre un blu molto scuro.
- **Carta di volo** (carta-bg, carta-panel, carta-panel-2): sfondo e schede del tema chiaro.
- **Testo e testo secondario** (glass-text, glass-text-dim, carta-text, carta-text-dim): testo principale e didascalie, etichette, note.
- **Filetti** (glass-line, carta-line; -hover per il passaggio del mouse): bordi di schede, campi e separatori.

### Stato
- **Verde normale** (glass-ok / carta-ok): completato, entro i limiti.
- **Ambra cautela** (glass-warn / carta-warn): da verificare, dato stimato o al limite.
- **Rosso allarme** (glass-err / carta-err): fuori limite, dato mancante che falsa un calcolo.

### Named Rules
**The Glass Cockpit Rule.** Magenta solo per la fase attiva, ciano solo per cio' che si comanda, verde, ambra e rosso solo per lo stato. Un colore usato fuori dal suo ruolo e' un errore.

**The Never Alone Rule.** Il colore non porta mai il significato da solo: ogni stato ha anche una parola, un'icona o una forma (spunta, punto, etichetta "Within limits").

**The No Pure Extremes Rule.** Nell'interfaccia niente nero puro e niente bianco pieno; nero e bianco puri appartengono solo ai documenti stampati.

## Typography

**Display Font:** font di sistema (-apple-system, Segoe UI, Roboto)
**Body Font:** font di sistema
**Label/Mono Font:** ui-monospace (SF Mono, Menlo); Courier nei PDF

**Character:** il carattere di sistema rende il sito nativo su iPad e computer; il monospazio porta i dati operativi (ICAO, orari, frequenze, prue, valori calcolati) come su un display di bordo o un OFP di linea.

### Hierarchy
- **Display** (700, 1.75rem, 1.15): titolo dello step.
- **Subtitle** (400, 0.95rem, 1.55): frase sotto il titolo, al massimo 68 caratteri per riga.
- **Body** (400, 1rem, 1.45): testo corrente e valori nei campi. Base 16 px su telefono e desktop, 18 px da 768 px in su.
- **Label** (700, 0.72rem, 0.09em, maiuscolo): titoli delle schede.
- **Field label** (600, 0.8rem): etichette dei campi.
- **Data** (monospazio, 0.8–0.84rem, cifre tabellari): riepiloghi di calcolo, informazioni aeroporto, celle del navlog.

### Named Rules
**The Tabular Rule.** Ogni numero che si confronta con altri numeri usa cifre tabellari, cosi' le colonne restano allineate.

## Layout

Una colonna di lettura centrata larga 52rem (80rem nello step Navlog, che ha
una tabella di dieci colonne), con l'anteprima del documento a destra sugli
schermi oltre 1100 px. Sfondo con una griglia leggera di 2rem e un'atmosfera
radiale appena accennata. I campi stanno in righe flessibili con spazio di
0.7rem che vanno a capo da sole; ogni controllo e' alto almeno 2.75rem. In
basso una barra di navigazione fissa con sfocatura, che rispetta le aree
sicure di iPad e telefono.

## Elevation & Depth

Profondita' leggera e funzionale. Le schede hanno un filetto di luce in alto,
un'ombra di contatto e un'ombra diffusa ampia; i pop-over un'ombra piu'
marcata; il pulsante principale un alone ciano che lo identifica come azione.
Nel tema chiaro le ombre sono brune e piu' deboli.

### Shadow Vocabulary
- **Scheda** (`inset 0 1px 0 rgba(255,255,255,.045), 0 1px 2px rgba(0,0,0,.4), 0 12px 32px -18px rgba(0,0,0,.7)`): gruppi di campi.
- **Pop-over** (`inset 0 1px 0 rgba(255,255,255,.06), 0 18px 48px -12px rgba(0,0,0,.7), 0 2px 8px rgba(0,0,0,.4)`): menu e pannelli sovrapposti.
- **Alone azione** (`0 0 0 1px rgba(66,210,240,.5), 0 8px 24px -10px rgba(66,210,240,.55)`): solo il pulsante primario.
- **Anello di focus** (`0 0 0 3px rgba(66,210,240,.35)`): focus da tastiera su ogni controllo.

## Shapes

Angoli morbidi su tre misure: 0.5rem per i campi, 0.7rem per pulsanti e
riquadri interni, 1rem per le schede. Pastiglie e chip completamente
arrotondati. Bordi di 1px; tratteggiati solo per i campi calcolati in sola
lettura e per le zone di caricamento file.

## Components

### Buttons
- **Shape:** angoli medi (0.7rem), altezza minima 2.75rem.
- **Default:** fondo panel-2, filetto, testo principale, peso 600.
- **Primary:** fondo ciano, testo scuro, alone ciano. Uno solo per schermata.
- **Ghost:** fondo trasparente con filetto.
- **Press / Focus:** scala 0.97 alla pressione (140 ms, curva ease-out forte); anello di focus ciano da tastiera; hover solo con mouse.

### Chips
- **Style:** pastiglia piccola (0.68rem, 600) con filetto.
- **State:** ok, caution, fail colorano testo e bordo con il colore di stato; fail aggiunge un fondo rosso tenue.

### Cards / Containers
- **Corner Style:** 1rem.
- **Background:** panel, con filetto line.
- **Shadow Strategy:** ombra Scheda.
- **Internal Padding:** 1rem sopra, 1.15rem ai lati.
- **Title:** etichetta maiuscola piccola in testo secondario.

### Inputs / Fields
- **Style:** fondo field, filetto, angoli 0.5rem, testo 1rem (niente zoom su iPad).
- **Focus:** bordo ciano piu' anello di focus.
- **Read-only / calcolati:** fondo trasparente e bordo tratteggiato.

### Navigation
- **Step pills:** pastiglie con numero tondo; la fase attiva ha bordo e numero magenta, le fasi completate il numero su fondo verde.
- **Segmented tabs (Performance):** etichette in monospazio maiuscolo (DEP, ARR, ALT, ENR) in un contenitore unico; un punto rosso segnala un avviso per quella fase.

### Status lines
Righe di riepilogo in monospazio sotto i calcoli (BLOCK, FLT, carburante): verde quando il dato e' normale, ambra o rosso quando va controllato.

### Rotta AV (signature)
La rotta dell'aeroclub che l'aereo disegna in magenta all'accesso e in Dashboard: l'unico momento animato lungo del sito, una volta per visita, assente con "riduci movimento".

### Documenti stampati
OFP, NAV-FLIGHTPLAN e Navigation Log: nero su bianco, Courier, tabelle a riquadri, righe "...." da compilare a mano. Non seguono il tema dell'interfaccia.

### Manuale sfogliabile (manuale.html)
Un libro su un tavolo (modalita' Read di Impeccable): la cornice e' l'interfaccia del sito, la carta resta carta in entrambi i temi.
- **Cornice:** barra con indice, posizione in lettura (sezione e paragrafo), pagina, PDF, tema; sotto, la barra a sezioni: una parte per sezione lunga quanto le sue pagine, magenta la parte in lettura (dove si e'), pomello ciano (cio' che si comanda) che segue il dito 1:1, bolla con pagina e titolo.
- **Indice laterale:** sezioni numerate nel blocco blu, voci con numero e pagina in cifre tabellari; la voce in lettura ha fondo magenta tenue e un punto magenta, non un filetto colorato.
- **Carta:** Inter per il testo, blu inchiostro (#1f3a5f) per titoli e struttura, ruggine (#c2410c) per numeri di passo e richiami. Apertura di sezione con il numero nel blocco blu; la stessa forma torna nella linguetta sul taglio esterno di ogni pagina e nei segni sul bordo del libro (signature del manuale). Avvisi WARNING / CAUTION / NOTE in riquadri interi con filetto sottile e segno disegnato, mai con il bordo sinistro spesso.
- **Movimento:** la girata e' fisica (molle, vedi `sfoglia.js`), non una curva a tempo; il libro chiuso sta al centro e scivola di mezza pagina quando si apre; la lente si allarga dalla figura. Tastiera senza animazione; "riduci movimento" solo dissolvenze.

## Do's and Don'ts

### Do:
- **Do** usare magenta solo per la fase attiva e ciano solo per cio' che si comanda (The Glass Cockpit Rule).
- **Do** accompagnare ogni colore di stato con una parola o un simbolo (The Never Alone Rule).
- **Do** scrivere in monospazio con cifre tabellari ICAO, orari, frequenze, prue e valori calcolati.
- **Do** mostrare in ambra o rosso, nel sito e nel documento, ogni dato stimato, fuori tabella, mancante o in conflitto.
- **Do** dare a ogni controllo almeno 2.75rem di altezza e una risposta alla pressione (scala 0.97).
- **Do** animare solo con uno scopo, sotto 300 ms, con le curve --ease-out, --ease-in-out o --ease-drawer.

### Don't:
- **Don't** usare il rosso dell'aeroclub come colore di allarme o decorazione: e' solo il marchio.
- **Don't** usare nero puro o bianco pieno nell'interfaccia.
- **Don't** applicare il tema scuro o chiaro ai documenti stampati.
- **Don't** usare hover sui dispositivi touch, ease-in o `transition: all`.
- **Don't** introdurre effetti da landing page (gradienti vistosi, grandi hero, animazioni di ingresso) nelle schermate di lavoro.
