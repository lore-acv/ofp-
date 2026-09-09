# OFP Generator — Cessna C172 FR (Reims Rocket FR172J)

Generatore di **Operational Flight Plan** per il Reims Cessna FR172J, adattato dal
generatore per Diamond DA40. Wizard in 7 step, anteprima HTML fedele al documento
e **PDF vettoriale A4 in Courier** (jsPDF), con estrazione automatica di
METAR / SPECI / TAF / NOTAM dal PDF del briefing meteo.

Tutti i dati aeromobile provengono dal Flight Manual Reims Rocket Edition 3:
la provenienza di ogni singolo numero è in **[DATI-AFM.md](DATI-AFM.md)**.

## File

| File | Cosa contiene |
|---|---|
| `index.html` | l'applicazione completa (markup, CSS, JS) |
| `Codice.gs` | lato server Apps Script: voli su UserProperties, PDF su Drive |
| `appsscript.json` | manifest del progetto Apps Script |
| `DATI-AFM.md` | da dove viene ogni dato aeromobile |

`index.html` funziona **sia da solo sia dentro Apps Script**: rileva a runtime la
presenza di `google.script.run` e, se manca, ripiega su `localStorage`. Non ci
sono due versioni da tenere allineate.

## Uso locale

Apri `index.html` in un browser. Serve connessione a Internet per jsPDF e pdf.js
(caricati da cdnjs). I voli salvati restano nel `localStorage` di quel browser.

## Deploy come web app Google Apps Script

1. [script.google.com](https://script.google.com) → **Nuovo progetto**.
2. Impostazioni progetto → spunta **"Mostra il file manifest appsscript.json"**.
3. Sostituisci il contenuto di `appsscript.json` con quello di questo repository.
4. Rinomina `Codice.gs` (o creane uno con quel nome) e incollaci `Codice.gs`.
5. **File → Nuovo → File HTML**, chiamalo **`index`** (Apps Script aggiunge da sé
   `.html`), e incollaci tutto `index.html`.
6. **Distribuisci → Nuova distribuzione → Applicazione web**:
   - *Esegui come*: **Utente che accede all'app**
   - *Chi ha accesso*: a tua scelta (es. chiunque abbia un account Google, oppure
     solo il tuo dominio)
7. Autorizza gli ambiti richiesti (`script.storage` per i voli, `drive.file` per
   archiviare gli OFP) e apri l'URL della web app.

Con `clasp` la stessa cosa in una riga: `clasp push` dalla cartella, dopo aver
rinominato `index.html` in `index.html` (Apps Script lo accetta così com'è).

### Cosa cambia sotto Apps Script

- **Voli salvati** nelle `UserProperties` dell'utente Google: persistono fra
  dispositivi e ogni pilota vede solo i propri. Viene comunque tenuta una copia in
  `localStorage`, così un volo non si perde se il server non risponde.
  Il JSON viene spezzato in blocchi perché una singola proprietà non può superare
  i 9 kB, e un volo con METAR, TAF e NOTAM li supera facilmente.
- **Pulsante "Salva su Drive"**: archivia l'OFP nella cartella *OFP C172 FR*.
- **"Scarica PDF"** apre il PDF in una scheda nuova invece di scaricarlo: la web
  app gira in un iframe sandboxed, dove il download diretto può essere bloccato
  senza alcun messaggio.

## Flusso di lavoro

1. **Volo & Aeromobile** — rotta, aeroporti, orari stimati. Il pulsante
   **Cerca aeroporti su OurAirports** recupera coordinate, elevazione e piste e
   compila distanza Trip, distanza e tempo dell'alternato, elevazioni, orientamenti
   pista e le distanze dichiarate di partenza.
2. **Rotta & Fuel** — **settaggio di potenza** (quota + RPM + MAP): i menu offrono
   solo le combinazioni pubblicate dal POH per quella quota e mostrano la
   percentuale di potenza; scegliendone una, **Ground Speed e Fuel Flow del Trip si
   compilano da soli**. L'alternato usa sempre il settaggio fisso **22 inHg / 2400
   RPM**. Trip, alternato, riserve (contingency = max 5% trip / 15', final reserve
   30' VFR o 45' IFR) e il campo **Fuel on board**, che serve solo a ricavare
   l'extra e il tempo extra e non compare nel documento finale.
   Tutto il carburante in **litri**, i consumi in **L/h**, le velocità in **MPH**.
3. **Mass & Balance** — foglio di carico e centraggio completo, con la stessa
   struttura e gli stessi bracci del *W. & B. Loading Form* dell'aeroclub
   (Pesi e Bilanciamento Rev. 14). Si sceglie l'aeromobile (**I-CCAF** o
   **I-CCAB**, con peso a vuoto e momento precaricati) e si inseriscono solo
   occupanti e bagaglio: il carburante arriva dallo Step 2. Calcola ZFW, Ramp,
   TOW e i due pesi di atterraggio con peso, braccio e momento, e verifica
   masse, bagaglio e **inviluppo di centraggio** al decollo e a entrambi gli
   atterraggi. Mostra anche la **VA alla massa effettiva**. Il PDF del foglio
   firmato può essere allegato come immagine.
4. **Performance** — V-speeds (in **MPH**, con selettore per i nodi), tabella POH
   completa della quota pianificata, e calcolo **TOLD** per **tutti e tre gli
   aeroporti**: decollo a DEP, atterraggio a DEST e ad ALTN. Ogni aeroporto usa il
   **proprio** METAR e la **propria** massa (decollo per DEP, atterraggio per DEST e
   ALTN): pressure e density altitude, componenti di vento, corsa al suolo e
   distanza per 15 m, confrontate con TORA, TODA e LDA.
5. **Dest Charts** — fino a 2 cartine, più le note operative.
6. **Briefing** — threat & error management per fase, stato aeromobile, remarks.
7. **NOTAM & Weather** — carica il PDF del briefing: data/ora di emissione,
   METAR / SPECI / TAF e NOTAM vengono estratti e smistati su DEP / ARR / ALTN;
   le pagine grafiche (SWC, venti, satellite) finiscono nell'OFP come cartine.

"Salva in Standby" mette il volo in attesa del meteo; dalla Dashboard lo si
finalizza caricando il PDF del briefing anche giorni dopo.

## Formati di briefing riconosciuti

- **Skybrief** (`SKYBRIEF gg/mm/aaaa hh:mm UTC (hh:mm LT)`) — viene preso l'orario
  UTC, mai quello locale.
- **Skybriefing / PIB** (`Printed at (UTC) 2026SEP08 1311`), incluso il layout a
  colonne in cui pdf.js separa le etichette dai valori.
- **AELO / MeteoSwiss** (`25. Jul. 2026 13:51`) e generici `gg/mm/aaaa hh:mm`.

L'estrazione è pensata per il testo che produce **pdf.js**, che unisce ogni pagina
con semplici spazi e non con veri a capo: il confine di un bollettino non viene
mai dedotto dalle righe, ma da marcatori strutturali (il terminatore `=`, l'inizio
di un altro bollettino, un titolo di sezione, un'intestazione di aeroporto). Serve
perché in Skybrief il `=` finale **manca**, e senza questo controllo un TAF si
porterebbe dietro l'intera sezione successiva del documento.

Per i NOTAM resta la **regola d'oro**: se il testo cita `REF AIP AD 2 <ICAO>`,
l'attribuzione segue quel codice anche contro l'intestazione di sezione sotto cui
il NOTAM si trova. Le intestazioni sono riconosciute come `ICAO - Nome`
(trattino, en dash o em dash), `ICAO Nome ... Airport`, `ICAO ... AD ELEV` e
`ICAO <numero NOTAM>` — quest'ultima anche senza a capo davanti.

Quello che il parser non riconosce resta comunque **correggibile a mano** in ogni
campo prima di generare il PDF.

## Dati aeroportuali — OurAirports

Coordinate, elevazione e piste vengono dal database aperto
[OurAirports](https://ourairports.com/data/) (dominio pubblico), letto dalla copia
versionata su GitHub Pages. Non esiste un'API REST: si scaricano i CSV e si tengono
solo gli aeroporti che servono. In browser il download avviene una volta per
sessione e ogni ICAO finisce in `localStorage`; sotto Apps Script lo fa il server
(`lookupAirports`), con cache condivisa nelle ScriptProperties.

L'**orientamento magnetico** della pista viene dal designatore (`17` → 170°), che
per definizione ICAO *è* la direzione magnetica arrotondata alla decina: il campo
`le_heading_degT` del CSV è invece vero e richiederebbe la declinazione, che
OurAirports non pubblica.

> **TORA / TODA / LDA:** OurAirports pubblica la **lunghezza fisica** della pista,
> non le distanze dichiarate, che stanno solo nell'AIP. I campi vengono
> precompilati con la lunghezza fisica come punto di partenza e vanno corretti
> dall'AIP: su piste con stopway, clearway o soglia spostata i valori non
> coincidono.

## Interfaccia

Barra superiore con il titolo e, sotto, le sette fasi in una riga; tutte le azioni
di salvataggio ed esportazione (dashboard, nuovo, standby, anteprima, stampa,
Drive, PDF) stanno in un **menu hamburger** in alto a destra. Nessuna emoji.

Il layout è in `rem` con base 16 px su desktop e **18 px da tablet in su**, e i
target di tocco hanno un'altezza minima di 2,75 rem (3 rem sui dispositivi
touch): su iPad campi e tabelle sono leggibili e centrabili col dito senza
ingrandire la pagina.

## Limiti noti

- Il **grafico di centraggio** è costruito sull'inviluppo momento/massa dell'AFM
  (fig. 6-6). Non è stato possibile replicare quello del file Excel citato nella
  richiesta perché quel file non è mai arrivato: inviarlo permette di allinearne
  stile e scale.
- L'integrazione OurAirports **non è stata provata contro il servizio reale**:
  l'ambiente di sviluppo non ha accesso a quel dominio. Parser, cache e
  autocompilazione sono verificati su dati di prova; al primo uso, se il servizio
  non risponde, l'applicazione lo dice e lascia tutti i campi compilabili a mano.
- I pesi a vuoto sono quelli del foglio Rev. 14. Dopo una nuova pesata vanno
  aggiornati (opzione **Altro** nel selettore, o `AIRCRAFT` in `index.html`).
- Le distanze pista sono campi liberi con i default AFM a livello del mare: le
  correzioni per quota, temperatura, vento ed erba vanno applicate dal pilota.
- Le V-speeds usano la fascia di peso AFM più vicina senza interpolare
  (arrotondamento conservativo), come nel generatore originale.

> Strumento di supporto alla pianificazione. Fa fede il Flight Manual
> dell'aeromobile; i dati vanno verificati dal pilota prima del volo.
