# OFP Generator — Cessna C172 FR (Reims Rocket FR172J)

Generatore di **Operational Flight Plan** per il Reims Cessna FR172J, adattato dal
generatore per Diamond DA40. Due pagine: una di **import** e il **foglio di volo** in 7 passaggi, anteprima HTML fedele al documento
e **PDF vettoriale A4 in Courier** (jsPDF), con estrazione automatica di
METAR / SPECI / TAF / NOTAM dal PDF del briefing meteo.

Tutti i dati aeromobile provengono dal Flight Manual Reims Rocket Edition 3:
la provenienza di ogni singolo numero è in **[DATI-AFM.md](DATI-AFM.md)**.

## File

| File | Cosa contiene |
|---|---|
| `import.html` | **pagina di apertura**: carica NavLog e briefing, poi passa al foglio di volo |
| `index.html` | il foglio di volo (wizard in 7 passaggi, anteprima, PDF) |
| `ofp-core.js` | nucleo condiviso: lettura NavLog, briefing, METAR |
| `ofp.css` | foglio di stile condiviso dalle due pagine |
| `Codice.gs` | lato server Apps Script: routing, voli su UserProperties, PDF su Drive |
| `appsscript.json` | manifest del progetto Apps Script |
| `DATI-AFM.md` | da dove viene ogni dato aeromobile |

### Come si passano i dati fra le due pagine

`import.html` legge i file, mostra cosa ha estratto e lo deposita in
**`sessionStorage`** sotto la chiave `ofp_handoff`; il pulsante *Continua* porta a
`index.html`, che al caricamento la rilegge e riversa tutto nei campi.

Non un parametro nell'URL: i dati estratti sono decine di kilobyte — bollettini
interi, tabelle di tratte, e le cartine meteo come immagini — e in un URL non
entrerebbero. `sessionStorage` vive quanto la scheda, che è esattamente la durata
di una compilazione. Se le cartine non ci stanno vengono omesse e il resto passa
comunque, invece di perdere l'intero import per colpa di un allegato.

Aprendo `index.html` senza essere passati dall'import, la pagina lo dice e offre
il link per tornare indietro: è un pannello con un link e non una redirezione da
script, perché sotto Apps Script le pagine stanno in un iframe e la navigazione
programmatica verrebbe bloccata dal sandbox.

I parser stanno una volta sola in `ofp-core.js`, caricato da entrambe le pagine:
niente due copie che col tempo divergerebbero.

## Uso locale

Apri `index.html` in un browser. Serve connessione a Internet per jsPDF e pdf.js
(caricati da cdnjs). I voli salvati restano nel `localStorage` di quel browser.

## Deploy come web app Google Apps Script

1. [script.google.com](https://script.google.com) → **Nuovo progetto**.
2. Impostazioni progetto → spunta **"Mostra il file manifest appsscript.json"**.
3. Sostituisci il contenuto di `appsscript.json` con quello di questo repository.
4. Rinomina `Codice.gs` (o creane uno con quel nome) e incollaci `Codice.gs`.
5. **File → Nuovo → File HTML** per ciascuna di queste quattro pagine (Apps Script
   aggiunge da sé `.html`):
   - **`import`** ← contenuto di `import.html`, integrale
   - **`index`** ← contenuto di `index.html`, integrale
   - **`core`** ← contenuto di `ofp-core.js`, **avvolto in `<script>` … `</script>`**
   - **`styles`** ← contenuto di `ofp.css` (il CSS da solo va bene; anche avvolto
     in `<style>` … `</style>` funziona)

   Apps Script non serve file `.js` e `.css`: `doGet` sostituisce al volo i tag
   `<script src="ofp-core.js">` e `<link href="ofp.css">` con il contenuto di
   `core` e `styles`. Le pagine restano così identiche a quelle che funzionano
   aperte direttamente in un browser. L'indirizzo del web app apre l'import;
   `?page=ofp` apre il foglio di volo.

   **Perché i tag intorno al nucleo.** Apps Script conserva questi file come HTML
   e, a seconda di come vengono letti, ne convalida il contenuto. Il nucleo è
   JavaScript puro, e lì dentro un `<` seguito da una lettera capita di continuo:
   in `i+1<starts.length` il validatore legge l'inizio di un tag
   `<starts.length …>` che non viene mai chiuso, e rifiuta il file con
   *«Contenuti HTML non corretti»*. Dentro `<script>` quel problema non esiste,
   perché il contenuto di uno script non viene letto come marcatura. `doGet` non
   raddoppia i tag se ci sono già, quindi entrambe le forme sono accettate.
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

**Pagina 1 — Import.** NavLog ForeFlight e briefing meteo. Ogni caricamento mostra
cosa è stato letto — la tabella delle tratte, i METAR smistati — e aggiorna un
riepilogo di stato. Quando ci sono entrambi il pulsante *Continua* si attiva.
Se un file manca o non si lascia leggere c'è la via d'uscita esplicita
*"Prosegui e compila a mano"*: un parser che fallisce non deve rendere
inutilizzabile l'applicazione proprio quando serve.

L'ordine di caricamento non conta: il briefing viene letto **per aeroporto**, non
per slot di rotta, quindi caricarlo prima del NavLog non perde nulla. Appena la
rotta è nota gli aeroporti già estratti vengono riabbinati a DEP e ARR, e se il
briefing non copre uno dei due l'import lo dice subito.

**Pagina 2 — Foglio di volo**, in sette passaggi:

1. **Volo & Aeromobile** — aeroporti, rotta e orari, già compilati dal NavLog.
   Appena i codici ICAO sono completi, coordinate, elevazione e piste arrivano da
   OurAirports e completano distanza e tempo dell'alternato, elevazioni,
   orientamenti pista e le distanze di partenza.
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
   occupanti e bagaglio: il carburante arriva dallo step precedente. Calcola ZFW,
   Ramp, TOW e i due pesi di atterraggio con peso, braccio e momento, e verifica
   masse, bagaglio e **inviluppo di centraggio** al decollo e a entrambi gli
   atterraggi. Mostra anche la **VA alla massa effettiva**.
4. **Performance** — V-speeds (in **MPH**, con selettore per i nodi), tabella POH
   completa della quota pianificata, e **Takeoff & Landing Data** per **tutti e tre gli
   aeroporti**: decollo a DEP, atterraggio a DEST e ad ALTN. Ogni aeroporto usa il
   **proprio** METAR e la **propria** massa (decollo per DEP, atterraggio per DEST e
   ALTN): pressure e density altitude, componenti di vento, corsa al suolo e
   distanza per 15 m, confrontate con TORA, TODA e LDA. Vento, QNH e temperatura
   non si importano a mano: arrivano dallo stesso import del briefing.
5. **Navlog** — il NAV-FLIGHTPLAN riga per riga: checkpoint, rotta magnetica e
   distanze dal NavLog di ForeFlight, **quota di crociera** portata da sola su ogni
   punto e modificabile punto per punto, **frequenze** di aeroporti e radioassistenze
   cercate su OurAirports (solo il numero: il nominativo lo scrive il pilota).
   È un documento **a sé**, con il suo pulsante di download, e non entra mai
   nell'OFP stampato.
6. **Dest Charts** — fino a 2 cartine, più le note operative.
7. **Briefing** — threat & error management per fase, stato aeromobile, remarks.
8. **NOTAM & Weather** — METAR / SPECI / TAF e NOTAM smistati su DEP / ARR / ALTN;
   le pagine grafiche del briefing (SWC, venti, satellite) finiscono nell'OFP come
   cartine, una per pagina intera.

"Salva in standby" mette il volo in attesa del meteo; dalla Dashboard lo si
finalizza caricando il PDF del briefing anche giorni dopo.

## Import NavLog ForeFlight

Verificato contro un export reale di ForeFlight Mobile.

Un NavLog è una **tabella**, e le tabelle in PDF non si leggono a righe di testo:
pdf.js restituisce i frammenti in ordine sparso e unendoli con spazi le colonne si
mescolano. Le righe si ricostruiscono quindi dalle **coordinate** dei frammenti.
Per interpretarle il parser prova due strategie, in quest'ordine:

**1. Semantica** — è quella che serve al NavLog vero. ForeFlight stampa solo
quattro intestazioni (`WAYPOINT`, `HDG`, `LEG`, `TOTALS`), ma `LEG` e `TOTALS`
contengono **tre valori ciascuna**: distanza, carburante e tempo. Assegnare i
valori alla colonna più vicina li accorperebbe. I valori però portano con sé la
propria unità — `3 nm`, `2,1 l`, `2m49s` — quindi si riconoscono per quello che
sono: il primo valore di ogni tipo è della tratta, il secondo è il progressivo.

**2. A colonne** — per export in cui i valori sono nudi e l'intestazione nomina
ogni colonna (WPT, MC, MH, TAS, GS, ETE, FUEL…): si ricostruiscono le colonne
dalle coordinate dell'intestazione.

Dettagli del formato reale già gestiti:

- **virgola decimale** (`2,1 l`) e unità di carburante in litri o galloni;
- **tempi** `2m49s`, `6m05s`, `0h30m`, oltre ai classici `1:23`;
- **nessuna riga TOTALS**: i totali sono i progressivi dell'ultima riga, che è
  anche più esatto che sommare tratte arrotondate una per una;
- **nomi su due righe**: ForeFlight manda a capo i nomi lunghi e allinea i numeri
  alla *prima* riga, quindi la coda (`(LILN)`) appartiene alla tratta
  **precedente** — attribuirla alla successiva sposterebbe di un punto tutti i
  nomi della rotta;
- **etichette di intestazione** che cadono sulla stessa ordinata del primo
  waypoint e gli si incollerebbero al nome: vengono tolte come parole isolate;
- **voli di rientro** (DEP e ARR coincidono), segnalati esplicitamente.

**Prima di scrivere qualsiasi campo la tabella letta viene mostrata**, con accanto
un confronto fra i totali di ForeFlight e quelli calcolati dall'OFP.

### Cosa compila, e cosa no

Il NavLog compila solo ciò che **non dipende dal POH**: aeroporti, rotta, distanza
Trip, e la quota di crociera quando l'export la contiene. L'alternato non viene
toccato, lo sceglie il pilota.

**GS e Fuel Flow restano quelli del POH**, che ha la precedenza. I totali di
ForeFlight si vedono solo come riscontro: vengono dal suo profilo aeromobile e il
suo carburante include rullaggio e avviamento (nel file di prova la prima tratta
consuma 2,1 l ma il progressivo parte da 9,7 l). Il Trip Time dell'OFP comprende
inoltre i 20 minuti fissi di procedura, quindi è per costruzione maggiore
dell'ETE. Se le due colonne divergono molto, è il settaggio di potenza da
controllare.

## Campi precompilati

Nessun dato di volo è precompilato: aeroporti, nome del PIC, rotta, distanze, pesi
e persone a bordo partono vuoti, con un placeholder che spiega cosa va scritto
(`ICAO DEP`, `ICAO ARR`, `ICAO ALT`, `Nome e Cognome PIC`). Restano precompilati
solo i dati **di aeromobile** (peso a vuoto e momento del velivolo scelto) e le
**impostazioni di calcolo** (settaggio di potenza di partenza, taxi, regola di
volo, limiti di massa), che non cambiano da un volo all'altro.

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

### Skybrief: si ritagliano prima le sezioni

Un briefing Skybrief è costruito per aeroporto: ogni blocco si apre con
`ICAO  Nome — Città  AD ELEV  nnn ft` e prosegue con METAR, TAF, le minime e
`NOTAM — n TOTALI, m ATTIVI OGGI` seguito dai bollettini puntati.

Il documento viene quindi **prima diviso in sezioni** — l'ancora è `AD ELEV`, che
compare una volta per aeroporto e mai dentro un NOTAM — e solo dopo si legge
dentro ciascuna. Il vantaggio non è di eleganza: cercando i bollettini con
espressioni regolari su tutto il testo, un gruppo di quattro maiuscole dentro un
NOTAM (`...LANDING AIDS', COLUMN 7`) si spacciava per aeroporto e si portava via
i NOTAM di quello vero. Con le sezioni il conteggio torna: su un briefing di
prova LIMC/LIML/LIRF il parser trova **16, 13 e 30** bollettini, esattamente i
numeri che il documento dichiara come attivi.

Ne esce un indice per ICAO di *tutti* gli aeroporti del briefing, indipendente
dalla rotta. L'abbinamento a DEP / DEST / ALTN è un passaggio separato
(`mapBriefing`), e questo è ciò che permette di scegliere l'alternato **dopo**
aver caricato il briefing: cambiando il codice, i suoi METAR, TAF e NOTAM
compaiono senza ricaricare il PDF. Se il nuovo codice non è nel briefing i campi
vengono svuotati — il meteo dell'aeroporto precedente sotto il nome di quello
nuovo sarebbe peggio di un campo vuoto.

Quando il briefing dichiara esplicitamente che un bollettino non c'è
(`METAR N/D`, «METAR e TAF di questo aeroporto non disponibili») il campo riporta
*N/D — non disponibile nel briefing*, che non è la stessa cosa di un riquadro
lasciato vuoto.

**SIGMET e AIRMET** vengono letti dalla coda del documento e finiscono nell'OFP
anche quando non ce n'è nessuno: «nessun SIGMET attivo» è un'informazione, un
riquadro vuoto no.

Per i briefing di altro formato resta il parser generico, con la **regola d'oro**
per i NOTAM: se il testo cita `REF AIP AD 2 <ICAO>`, l'attribuzione segue quel
codice anche contro l'intestazione di sezione sotto cui il NOTAM si trova. Le
intestazioni sono riconosciute come `ICAO - Nome` (trattino, en dash o em dash),
`ICAO Nome ... Airport`, `ICAO ... AD ELEV` e `ICAO <numero NOTAM>` —
quest'ultima anche senza a capo davanti.

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

## Pubblicare come sito statico

L'app e' gia' un sito statico: parsing del briefing, calcoli AFM, jsPDF e
pdf.js girano tutti nel browser, e i link fra le due pagine sono relativi.
Apps Script e' l'adattatore, non il contrario — sotto Apps Script il client
chiama il server per aeroporti, frequenze e archivio voli; fuori, fa tutto da
solo. Le due strade convivono: lo stesso codice gira in tutti e due i posti.

Pubblicarlo su un dominio proprio toglie di mezzo l'iframe sandbox (i download
partono, la stampa non prende l'intestazione di Safari), l'URL
`script.google.com/macros/s/AKfycb...` e i deployment versionati.

### Il pacchetto dati

OurAirports pubblica quattro CSV che insieme fanno una ventina di megabyte.
Farli scaricare a chi apre l'app, in aeroclub, con la rete che c'e', e' la
differenza fra una ricerca istantanea e mezzo minuto di attesa.

`tools/dati-aeroporti.mjs` li scarica una volta sola, al momento del deploy,
tiene l'Europa e i soli campi che servono, e scrive `data/aeroporti.json`:

```
node tools/dati-aeroporti.mjs
```

3100 aeroporti con piste e frequenze, 1500 radioassistenze, **189 kB
compressi** invece di venti megabyte. Il JSON sta nel repo di proposito, cosi'
il deploy copia un file che c'e' gia' senza dipendere dalla rete. Lo rinfresca
da solo, il primo di ogni mese, l'azione `.github/workflows/dati-aeroporti.yml`
— o a mano dalla scheda Actions.

Il client lo cerca accanto a se' e, se lo trova, non scarica piu' niente. Se
non c'e', ripiega sui CSV: lento, ma funziona. Sotto Apps Script non lo cerca
nemmeno, perche' HtmlService non serve file statici.

I paesi si scelgono con una variabile:

```
PAESI=IT,CH,FR,AT node tools/dati-aeroporti.mjs     # solo i confinanti: 82 kB
```

### La build

```
node tools/sito.mjs
```

Raccoglie in `dist/` solo quello che va pubblicato: le due pagine, il core, il
foglio di stile, il pacchetto dati e gli header di Cloudflare. Restano fuori
`Codice.gs`, `appsscript.json`, i tools e la documentazione. `dist/` non si
committa.

### Cloudflare Pages

Dalla dashboard di Cloudflare, **Workers & Pages -> Create -> Pages -> Connect
to Git**, si sceglie questo repo e si imposta:

| campo | valore |
|---|---|
| Framework preset | None |
| Build command | `node tools/sito.mjs` |
| Build output directory | `dist` |

Da li' in poi ogni push su `main` ripubblica il sito. Il dominio si aggiunge in
**Custom domains**. Netlify funziona uguale, con gli stessi due valori.

La radice del sito apre il foglio di volo, che se non trova un import gia'
fatto mostra il pannello "Prima serve l'import" con il link alla pagina di
apertura.

### La guida all'uso

`tools/guida.mjs` costruisce `data/guida.pdf`, la guida che si apre dal pulsante
**Come si usa** nella pagina di apertura. Le schermate stanno in `tools/guida/` e
vengono dall'applicazione vera, con il volo vero di un NavLog ForeFlight e di uno
Skybrief: una guida con schermate finte invecchia il giorno dopo e si vede.

Il PDF non si scarica e non apre una scheda: resta sopra la pagina, disegnato su
`<canvas>` con pdf.js. Un `<iframe src="guida.pdf">` sarebbe stato piu' corto da
scrivere, ma su iPad Safari un PDF dentro un iframe lo mostra a meta' o non lo
mostra affatto, ed e' da li' che questa guida si legge.

Per rigenerarla serve jsPDF, che non e' fra le dipendenze del sito — il deploy
trova il PDF gia' pronto nel repo:

```
npm i jspdf && node tools/guida.mjs
```

### Cosa resta fuori

jsPDF e pdf.js arrivano ancora da cdnjs. Vanno spostati in casa quando si fara'
la PWA — servono comunque a farla funzionare senza rete — ma finche' non c'e'
il service worker non cambierebbe niente.

L'archivio dei voli, sul sito statico, e' il `localStorage` del browser: resta
su quel dispositivo e non si vede dagli altri. Per avere account veri serve il
passo successivo (Supabase o simili), che non e' in questo repo.

## Interfaccia

Barra superiore con il titolo e, sotto, le otto fasi in una riga; tutte le azioni
di salvataggio ed esportazione (dashboard, nuovo, standby, anteprima, stampa,
Drive, PDF) stanno in un **menu hamburger** in alto a destra. Nessuna emoji.

**Stampa e PDF sono lo stesso documento.** Il documento lo impagina `buildPDF()`,
in A4, riga per riga: "Scarica PDF" lo salva e "Stampa OFP" manda quello alla
stampante. L'anteprima HTML serve a guardare, non a stampare — quando la stampava
il browser il risultato lo decideva lui, e Safari su iPad ci metteva del suo
(margini propri, indirizzo e data in testa, pagine spezzate dove capitava e cinque
fogli bianchi in piu').

Il layout è in `rem` con base 16 px su desktop e **18 px da tablet in su**, e i
target di tocco hanno un'altezza minima di 2,75 rem (3 rem sui dispositivi
touch): su iPad campi e tabelle sono leggibili e centrabili col dito senza
ingrandire la pagina.

### Tema chiaro e scuro

Il pulsante con sole/luna in barra, su entrambe le pagine, commuta la tavolozza.
L'attributo `data-tema` su `<html>` vale `scuro` o `chiaro`; la scelta si ricorda
in `localStorage` sotto `ofp_tema` e finché non la si tocca si segue quella del
sistema operativo (`prefers-color-scheme`). Uno script inline nell'`<head>`
di ogni pagina applica il tema **prima del primo disegno**, così non si vede il
lampo della tavolozza sbagliata; il resto (pulsante e memoria) sta in
`ofp-core.js`, condiviso fra le due pagine.

I colori sono tutti variabili CSS su `:root`, ridefinite in
`html[data-tema="chiaro"]`: le tinte semantiche — `--sem-ok`, `--sem-caution`,
`--sem-fail` — hanno valori più scuri nel tema chiaro, perché il verde e l'ambra
che si leggono bene sul nero non si leggono sul bianco.

**Cambia solo l'interfaccia.** L'anteprima del documento (`.page`, tabelle,
riquadri meteo) resta nera su bianco in entrambi i temi, e il PDF non cambia di
una virgola: è carta, e la carta non ha un tema. Il pulsante non si stampa.

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
