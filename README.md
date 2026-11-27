# OFP Generator — Cessna C172 FR (Reims Rocket FR172J / FR172H)

Generatore di **Operational Flight Plan** per i Reims Cessna FR172J (I-CCAF) e
FR172H (I-CCAB) dell'aeroclub, adattato dal
generatore per Diamond DA40. Due pagine: la **Dashboard** con il **foglio di volo** in 8 passaggi e la pagina di **import**; anteprima HTML fedele al documento
e **PDF vettoriale A4 in Courier** (jsPDF), con estrazione automatica di
METAR / SPECI / TAF / NOTAM dal PDF del briefing meteo.

I dati aeromobile provengono dai Flight Manual Reims Rocket dei due modelli
(FR172J Edition 3, FR172H Edition 2), che differiscono solo in VR, VY, stallo e VA:
la provenienza di ogni singolo numero è in **[DATI-AFM.md](DATI-AFM.md)**.

## File

| File | Cosa contiene |
|---|---|
| `index.html` | **prima pagina**: la Dashboard (volo nuovo o voli salvati) e il foglio di volo (wizard in 8 passaggi, anteprima, PDF) |
| `import.html` | carica NavLog e briefing per un volo nuovo, poi passa al foglio di volo |
| `manuale.html` | il visore e-book: il manuale d'uso (`data/manuale/`, PDF stampabile in `data/manuale.pdf`) e, con `?libro=afm-ccaf` / `?libro=afm-ccab`, i Flight Manual dei due aeroplani |
| `sfoglia.js` | il motore della girata delle pagine, uno solo per tutti i libri |
| `data/afm/` | i Flight Manual: i PDF originali (`afm-ccaf.pdf`, `afm-ccab.pdf`, quelli che si scaricano) e per ogni aeroplano `libro.html`, le pagine in WebP (`p/`) e, se il PDF ha testo, `testo.json` |
| `tools/afm.mjs` | costruisce `data/afm/<id>/` dal PDF e dalla mappa: rasterizza ogni pagina con pdf.js in Chromium |
| `tools/afm/<id>.json` | la mappa scritta a mano di ogni Flight Manual: sezioni, voci dell'indice, numerazione originale, pagine saltate o di traverso, retro, figure |
| `tools/manuale.mjs` | scrive il manuale d'uso e produce `data/manuale.pdf` e `data/manuale/libro.html` |
| `ofp-core.js` | nucleo condiviso: lettura NavLog, briefing, METAR |
| `ofp.css` | foglio di stile condiviso dalle due pagine |
| `login.html`, `setup.html`, `password.html`, `admin.html` | accesso, primo avvio, cambio password, gestione utenti (solo sito Cloudflare) |
| `conto.css`, `conto.js` | stile e script delle pagine dell'account |
| `functions/_middleware.js` | il cancello del sito su Cloudflare Pages: senza sessione si vede solo l'accesso |
| `server/conto.js` | API di account, sessioni e voli per utente sul database D1 |
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

`index.html` apre sempre sulla **Dashboard**: *New Flight* porta all'import, e
i voli salvati si riaprono dalle loro schede. Il foglio di volo si mostra
direttamente solo arrivando dall'import con *Continua*, che lo segna in
`sessionStorage` (`ofp_apri_volo`). *New Flight* è un link e non una
navigazione da script, perché sotto Apps Script le pagine stanno in un iframe e
la navigazione programmatica verrebbe bloccata dal sandbox.

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
   aperte direttamente in un browser. L'indirizzo del web app apre la
   Dashboard; `?page=import` apre l'import.

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
- **"Save to Drive"** (nella pagina Documents, riga dell'OFP): archivia l'OFP nella cartella *OFP C172 FR*.
- **"Download"** apre il PDF in una scheda nuova invece di scaricarlo: la web
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
   Gli orari stimati sono **UTC**. Con la data del volo (campo *Date* dello step 8,
   compilato dal briefing) il decollo e i due atterraggi — a destinazione (TO +
   Flight Time) e all'alternato (più il tempo dell'alternato) — vengono confrontati
   con **alba (SR), tramonto (SS) e fine del crepuscolo civile (ECT)** del proprio
   aeroporto: dopo il tramonto è un avviso, dopo l'ECT è notte (Reg. UE 923/2012).
   Algoritmo solare NOAA, verificato con PyEphem su un anno fra 38° e 60° N (scarto
   massimo 0,14 minuti), arrotondato dalla parte della prudenza. Lo stesso blocco
   *DAYLIGHT* chiude la pagina OFP; se manca la data o l'orario di decollo il
   documento scrive *not computed* invece di tacere.
2. **Rotta & Fuel** — **settaggio di potenza** (quota + RPM + MAP): i menu offrono
   solo le combinazioni pubblicate dal POH per quella quota e mostrano la
   percentuale di potenza; scegliendone una, **Ground Speed e Fuel Flow del Trip si
   compilano da soli**. L'alternato usa sempre il settaggio fisso **22 inHg / 2400
   RPM**. Trip, alternato, riserve (contingency = max 5% trip / 15', final reserve
   30' VFR o 45' IFR) e il campo **Fuel on board**, che serve solo a ricavare
   l'extra e il tempo extra e non compare nel documento finale.
   Ogni tratta che parte da un aeroporto o vi arriva vale **5 minuti in piu'**
   (prima e ultima tratta; le due attorno a un aeroporto in rotta solo se e' in
   Touch & Go; la tratta verso l'alternato): entrano in Trip e alternato, tempo e
   carburante al consumo di crociera, e il navlog le scrive `7/+5`.
   Tutto il carburante in **litri**, i consumi in **L/h**, le velocità in **MPH**.
3. **Mass & Balance** — foglio di carico e centraggio completo, con la stessa
   struttura e gli stessi bracci del *W. & B. Loading Form* dell'aeroclub
   (Pesi e Bilanciamento Rev. 17). L'aeromobile (**I-CCAF** o
   **I-CCAB**, con peso a vuoto e momento precaricati) si sceglie allo Step 1;
   qui si inseriscono solo
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
   È un documento **a sé**, con il suo download nella pagina Documents, e non entra
   mai nell'OFP stampato. Una tratta oltre i **10 minuti** fa comparire un avviso
   (l'ideale è un punto di virata ogni 6-8 minuti): non blocca nulla e non cambia
   il navlog.
6. **Dest Charts** — fino a 2 cartine, più le note operative.
7. **Briefing** — threat & error management per fase, stato aeromobile, remarks.
8. **NOTAM & Weather** — METAR / SPECI / TAF e NOTAM smistati su DEP / ARR / ALTN;
   le pagine grafiche del briefing (SWC, venti, satellite) finiscono nell'OFP come
   cartine, una per pagina intera.

"Salva in standby" mette il volo in attesa del meteo; dalla Dashboard lo si
finalizza caricando il PDF del briefing anche giorni dopo.

**Documents.** All'ultimo step "Proceed" salva il volo (pronto se il briefing
c'e') e apre la pagina Documents con i tre PDF: OFP (`OFP_DEP-ARR_data.pdf`),
NAV-FLIGHTPLAN (`NAVLOG_…`) e navlog dell'Aeroclub Varese (`CLUB-NAVLOG_…`),
ciascuno col suo Download, piu' "Download all". La stessa pagina si apre da
"Documents" nel menu e dalla striscia di ogni volo pronto in Dashboard; ha un
indirizzo per volo, `#/flights/<id>/documents`, che regge il ricaricamento e il
passaggio dal login. E' l'unico punto da cui si scaricano i documenti.

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

Raccoglie in `dist/` solo quello che va pubblicato: le due pagine, il manuale
sfogliabile col suo PDF e il suo indice, il core, il foglio di stile, il
pacchetto dati e gli header di Cloudflare. Restano fuori
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

La radice del sito apre la Dashboard (`index.html`); l'import e' `import.html`.
Il vecchio indirizzo del foglio di volo, `/ofp.html`, rimanda alla radice.

### Accesso e account

Sul sito Cloudflare l'app e' riservata: senza una sessione si vede solo la
pagina di accesso, e tutto il resto — pagine, dati, manuale, PDF — risponde
con il rinvio al login. Non c'e' registrazione: gli account li crea
l'amministratore, e ogni pilota trova sul proprio account solo i propri voli.

**Configurazione (una volta, dal pannello Cloudflare)**

1. *Storage & Databases -> D1* -> **Create**, nome `ofp-utenti`,
   giurisdizione **EU**. Le tabelle le crea il sito alla prima richiesta.
2. Progetto Pages -> *Settings -> Bindings* -> **D1 database**, nome `DB`,
   database `ofp-utenti`, per Production e Preview.
3. *Settings -> Variables and Secrets* -> **Secret** `SETUP_TOKEN`: una
   stringa casuale di almeno 32 caratteri, per Production e Preview.
4. Aprire `/setup`, inserire la chiave e creare l'amministratore. Funziona
   solo finche' il database non ha utenti: dopo, il server la rifiuta sempre.

Non si committa un `wrangler.toml`: se ci fosse, Cloudflare prenderebbe la
configurazione da li' e ignorerebbe i binding impostati nel pannello.

**Uso quotidiano (pagina Users, `/admin`)**

- *Create account*: nome ed email; il sito genera una password temporanea,
  mostrata una volta sola, da consegnare all'utente con un canale diverso
  dall'email. Al primo accesso l'utente deve sostituirla: fino ad allora il
  server non apre nient'altro.
- *Rename*: cambia il nome mostrato di un utente (anche il proprio) direttamente nella sua riga; l'e-mail con cui si accede resta la stessa.
- *Reset password*: nuova password temporanea, sessioni chiuse.
- *Suspend / Reactivate*: l'utente sospeso non entra piu', i voli restano.
  *Reactivate* sblocca anche un account fermo per troppi tentativi.
- *Delete*: elimina l'utente e i suoi voli.

L'amministratore vede quanti voli ha ciascuno, non il loro contenuto.

**Come funziona**

- Password: PBKDF2-SHA256 con sale casuale, mai in chiaro. Le iterazioni sono
  10.000, perche' il piano gratuito di Workers concede 10 ms di CPU per
  richiesta e 100.000 ne costerebbero circa 50. Sul piano a pagamento si
  alzano con la variabile `PBKDF2_ITER` (fino a 100.000): ogni password si
  ricifra da sola al login successivo.
- Sessione: cookie `__Host-ofp_sess`, HttpOnly, Secure, SameSite=Lax, 30
  giorni rinnovati dall'uso; nel database c'e' solo la sua impronta SHA-256.
- Dopo 5 password sbagliate l'account si ferma 15 minuti; un IP che sbaglia
  troppe volte viene fermato allo stesso modo. Un'email inesistente riceve
  la stessa risposta, negli stessi tempi, di una password sbagliata.
- Le scritture accettano solo richieste con `Origin` del sito.
- Voli: tabella `voli (utente, id, dati, aggiornato)`. Il proprietario lo
  decide la sessione, mai la richiesta. Una versione piu' vecchia non
  sovrascrive una piu' recente salvata da un altro dispositivo.
- Il wizard tiene una copia dei voli per utente nel browser e una coda delle
  modifiche: senza rete si continua a lavorare e la coda parte al ritorno
  della rete. I voli salvati nel browser prima dell'accesso passano
  all'account al primo login. Uscendo, la copia locale si cancella.
- Sotto Apps Script o aprendo i file dal disco non cambia niente: i voli
  restano dove stavano.

**Provarlo in locale**

```
node tools/sito.mjs
npx wrangler pages dev dist --d1 DB=ofp-test --binding SETUP_TOKEN=una-chiave-lunga-di-prova-123456
```

### Il manuale d'uso

Il manuale e' un SOP in inglese che si legge come un e-book da `manuale.html`
e si scarica stampabile da `data/manuale.pdf`. Si apre dalla voce **Manuals**
della rail (Dashboard, foglio di volo e import), che offre il manuale d'uso e i
due Flight Manual: ognuno si apre in un riquadro sopra la pagina (il volo e
NavLog e briefing gia' caricati restano li'), e riaperto torna dove lo si era
lasciato (`Manuali` in `ofp-core.js`). `manuale.html#p=12` apre una pagina,
`manuale.html#s3-2` una sezione.

**L'e-book non e' il PDF rimpicciolito.** Il testo (`data/manuale/libro.html`)
viene impaginato nel browser in pagine fatte per lo schermo: corpo in Inter a
15 px, intestazione con sezione e paragrafo correnti, piede con riferimento del
documento e numero di pagina, margine di piega piu' largo verso il centro del
libro. Due formati logici fissi — *book* (600x848, doppia pagina quando ci sta)
e *phone* (380x676, una pagina alla volta) — che si scalano interi: cambiare
finestra cambia la scala, non l'impaginazione. L'impaginatore tiene ogni figura
accanto alla procedura che la cita (la riduce un po' se serve, altrimenti la
porta a pagina nuova insieme alla procedura), spezza liste e tabelle per righe
ripetendo l'intestazione, non lascia titoli soli in fondo alla pagina. Ogni
figura ha la sua lente per vederla a schermo pieno.

La girata e' del motore di `sfoglia.js`, scritto per questo manuale. Il
foglio si prende in qualsiasi punto e si trascina in qualsiasi direzione: il
punto preso resta sotto il dito. Il foglio si arrotola attorno a un cilindro
con l'asse perpendicolare al movimento del dito, quindi tirando un angolo in
diagonale si arrotola in diagonale; oltre il cilindro il lembo rovesciato
mostra la pagina dopo. Il foglio e' rilegato: gli estremi della costola non si
muovono e il punto preso non si allontana da loro (la carta non si allunga).
Lasciato, il punto e' portato da due molle (x e y) verso il rovescio esatto o
verso dove era, con la velocita' del dito; decide un colpo deciso o, se no,
dove andrebbe il dito lanciato. Si puo' riprendere a meta', l'ultima pagina
resiste e torna giu', le copertine sono rigide. Le fasce del cilindro sono
illuminate secondo la loro inclinazione, il cilindro fa ombra sulla pagina che
si scopre e il lembo lungo i suoi bordi. Le pagine vere sotto il foglio
cambiano solo quando il foglio e' gia' disegnato, e all'atterraggio il foglio
resta due fotogrammi sopra le pagine gia' giuste: nessun fotogramma mostra la
pagina sbagliata. Da tastiera la pagina cambia subito; con "riduci movimento"
niente girata, solo una dissolvenza breve. I parametri della fisica sono in
cima al file (e in `Sfoglia.FIS`, per provarli dalla console).

Intorno al libro: la barra a sezioni in basso (una parte per sezione, piu'
chiara quella in lettura, con la bolla di pagina e titolo mentre si trascina), le
linguette delle sezioni sul taglio delle pagine come nei manuali stampati, con
il numero della sezione e sotto il nome breve (solo il numero quando i nomi non
entrano interi; cliccabili anche sul bordo del libro), il libro chiuso al centro che scivola
quando si apre. L'indice laterale su schermo largo spinge il libro, che passa
da doppia a pagina singola con una dissolvenza.

`tools/manuale.mjs` scrive il testo una volta sola e produce:

- `data/manuale.pdf` — impaginato da Chromium in A4, con segnalibri e indice a
  due livelli i cui numeri vengono dal PDF stesso (due passaggi; il build si
  ferma se fra i due qualcosa si sposta);
- `data/manuale/libro.html` — lo stesso testo per l'e-book, con le voci
  dell'indice: i numeri li mette il libro dopo aver impaginato.

Figure (schermate vere in tema chiaro con i callout disegnati sopra) e font
(Inter, IBM Plex Mono — SIL OFL) stanno in `data/manuale/`. Per rigenerare
servono Chromium e due pacchetti che il sito non usa — il deploy trova tutto
gia' pronto nel repo:

```
npm i --no-save puppeteer-core pdfjs-dist@3.11.174
CHROME=/percorso/chrome node tools/manuale.mjs
```

### I Flight Manual degli aeroplani

`manuale.html?libro=afm-ccaf` (Reims Rocket FR172J, Edition 3) e
`manuale.html?libro=afm-ccab` (FR172H, Edition 2) aprono i manuali di volo
nello stesso visore e con lo stesso motore del manuale d'uso: copertina,
indice, linguette delle sezioni, barra a sezioni, doppia o singola pagina,
`#p=N`, `#sN`, `?embed=1`, download del PDF. Le differenze per libro (titolo,
file, PDF, chiave dell'indice, messaggi) sono nella tabella `LIBRI` in testa a
`manuale.html`.

**Il manuale di volo fa fede.** Niente e' riscritto o ripaginato: ogni pagina
del libro e' una pagina dell'AFM, l'immagine della scansione, con la
numerazione originale accanto all'indice di pagina (`58 · 5-2`); la casella
della pagina accetta anche `5-3` e `manuale.html?libro=afm-ccab#n=5-3` apre
quella pagina. Le bianche interne restano, cosi' le pagine dispari stanno a
destra come sulla carta; si saltano solo le bianche in coda. Le tabelle e i
grafici sono di traverso come nel manuale stampato (in I-CCAF erano ruotati
nel PDF e si rimettono cosi'); la lente (pulsante nella barra o doppio tocco
sulla pagina) mostra la pagina intera in alta risoluzione, diritta, e passa
alle pagine accanto con le frecce. I-CCAB ha come retro quello originale
Cessna; I-CCAF, che non ce l'ha, un cartoncino con il solo nome del manuale.

Le immagini (WebP, 800 px e "retina": 1250 px per I-CCAF, la risoluzione
della scansione, 1600 px per I-CCAB) portano width e height nel markup, cosi'
il libro si costruisce prima che arrivino, e si caricano solo per le pagine in
vista e le due prima e dopo, alla risoluzione che serve allo schermo. Il nome
porta l'impronta del contenuto: si tengono in cache per sempre
(`tools/_headers`). Passano dal cancello come ogni altro dato.

| | pagine | schermo | retina | PDF | testo |
|---|---|---|---|---|---|
| I-CCAF | 90 | 3,8 MB | 7,1 MB | 7,4 MB | si' (OCR di Acrobat gia' nel PDF): ricerca nell'indice |
| I-CCAB | 90 | 4,6 MB | 13,4 MB | 9,5 MB | no: scansione senza testo, niente ricerca (non si fa OCR) |

Chi legge scarica solo le pagine che sfoglia, circa 50–200 kB l'una.

Per ogni aeroplano la mappa `tools/afm/<id>.json` dice sezioni (numero,
titolo, nome della linguetta, prima pagina e voci dell'indice dell'AFM con la
loro pagina originale), pagine preliminari, pagine da saltare, da ruotare o
stampate di traverso, numerazione originale per intervalli, retro, larghezza
retina e dove sta ogni figura (`"5-6": "5-11"`, per i collegamenti futuri dal
foglio di volo). I due PDF non hanno segnalibri: la mappa viene dalle
intestazioni stampate e dall'indice delle pagine ii–v. Per rigenerare:

```
npm i --no-save puppeteer-core pdfjs-dist@3.11.174
CHROME=/percorso/chrome node tools/afm.mjs            # tutti e due
CHROME=/percorso/chrome node tools/afm.mjs afm-ccab   # uno solo
```

Il build controlla la mappa (pagine dentro il PDF, voci con un numero che
esiste) e si ferma se qualcosa non torna; il deploy non costruisce nulla.

### Flight Manual ricostruiti — ANTEPRIMA, non fanno fede

In parallelo agli e-book ufficiali (che restano le immagini delle pagine
originali e non si toccano), `manuale.html?libro=afm-ccaf-rec` mostra il
manuale **ricomposto in digitale**: stesso testo, stessa impaginazione, stessi
numeri di pagina e di figura, testo vero (selezionabile, ricercabile, nitido a
ogni ingrandimento) e figure vettoriali. Nessun link dall'app: ci si arriva solo
con l'indirizzo. La copertina e' restaurata come nuova; l'avvertenza
"Reconstructed preview — not authoritative" e l'avviso della traduzione (che
nell'originale e' un riquadro incollato sulla copertina) stanno sul retro della
copertina (bianco nell'originale), scritti come le pagine di testo del manuale
(una volta sola, non su ogni pagina). Le pagine non ancora ricostruite mostrano la scansione.

**Prova "pagina piena"** (`manuale.html?libro=afm-ccaf-rec-pieno`, `rec.mjs
--pieno`): la gabbia del testo, comune a tutto il manuale e misurata su tutte le
pagine della scansione (`stile.json`, "pieno"), riempie la pagina con margini
fissi (8,6% ai lati, 6% sopra e sotto). Stesse parole, stesse righe, stesse
posizioni relative; corpo e spaziatura ricalcolati. Allargando il testo per
riempire la pagina si toglie anche la compressione orizzontale della scansione
di I-CCAF (rapporto 1,39 contro 0,72 misurato). Anche le scansioni (pagine non
ancora ricostruite e originale del confronto) si trasformano allo stesso modo.
Si verifica con `verifica.mjs afm-ccaf --pieno` (rapporto in
`tools/afm-rec/VERIFICA-PIENO.md`).

**"Via di mezzo"** (`?libro=afm-ccaf-rec-medio`, `rec.mjs --medio`,
`verifica.mjs --medio`): la stessa gabbia con margini a meta' strada fra la
scansione e la pagina piena (15% ai lati, 7,5% sopra e sotto); la compressione
della scansione si corregge a meta'. **E' l'impaginazione scelta per tutto il
manuale**: ogni pagina si verifica qui fino a zero differenze aperte (e anche
nella normale, `?libro=afm-ccaf-rec`). La pagina piena resta come prova: si
costruisce ancora, ma non si insegue a zero (le differenze che restano li' sono
effetti della scala sulle fasce di controllo).

**Pagina per pagina, non a flusso.** Ogni pagina e' un SVG a misura fissa nelle
coordinate della scansione retina: ogni parola sta sulla sua linea di base, dove
sta nell'originale, larga quanto la parola misurata sulla scansione (la
spaziatura fra le lettere e l'origine si calcolano in Chromium con il font
vero; nei titoli spaziati a mano ogni lettera e' posizionata da sola). Niente
va a capo da solo.

**Sfogliare senza scatti.** Il motore del libro disegna il foglio che gira
con una ventina di copie della pagina e le ridisegna a ogni fotogramma: con le
pagine SVG (centinaia di parole, figure vettoriali) il libro si bloccava. Per
questo `rec.mjs` fa anche una **fotografia** di ogni pagina ricostruita
(Chromium con i font veri, webp alle due misure delle scansioni, il nome porta
l'impronta del contenuto, `data/afm-rec/<id>/p/`), e nel libro la pagina e' la
sua fotografia, caricata come una scansione, con l'SVG vera in un
`<template>` inerte. Il visore monta l'SVG solo sulle pagine in vista, quando
il libro e' fermo da 0,6 s, una pagina per fotogramma, e la smonta appena un
foglio si alza: sfogliare, anche di fila, costa quanto con le scansioni, e a
libro fermo il testo e' vero (selezionabile, nitido a ogni ingrandimento). La
lente mostra la fotografia retina della ricostruita.

**Il caricamento.** Finche' il libro e le immagini delle pagine in vista non
sono pronti, al posto del libro c'e' una barra che scorre (senza percentuale:
non si sa quanto manca) e, se il caricamento passa i 0,7 s, una frase alla
volta per passare il tempo ("Weighing the Cessnas…", "Kicking the tires…"…),
in ordine sparso, ogni 2,6 s. Le frasi partono da uno script subito dopo la
barra, prima che il resto della pagina sia scaricato. Con il movimento
ridotto la barra pulsa invece di scorrere.

**Modalita' confronto** (pulsante nella barra o tasto O): la scansione
originale sopra la ricostruita, con un cursore di trasparenza o in
differenza (dove coincidono resta nero); O passa dall'una all'altra.

| File | Cosa contiene |
|---|---|
| `tools/afm-rec/<id>/pagine/<n>.json` | una pagina: righe (ruolo, linea di base, parole con x e larghezza misurate), filetti, poligoni, figure |
| `tools/afm-rec/<id>/stile.json` | i font dei ruoli (testo, titolo, tabella, grafico): famiglia, corpo (altezza delle maiuscole), larghezza del disegno |
| `tools/afm-rec/<id>/figure/` | gli SVG delle figure (retinature punto per punto, disegni al tratto con potrace) e le fotografie pulite (`.webp`, pubblicate in `data/afm-rec/foto/`) |
| `tools/afm-rec/<id>/costruisci/` | gli script delle pagine con figura: le scritte lette a vista, cornici, foto (`scritte.py` e' il modulo comune) |
| `tools/afm-rec/<id>/controlli.json` | i numeri controllati a vista dove l'OCR sbaglia, con la seconda conferma; le righe e le macchie chiuse a vista (differenze della misura, non della pagina), con il perche'; i confronti con DATI-AFM.md |
| `tools/afm-rec/font/` | i font liberi scelti (woff2, licenza OFL): STIX Two Text e Archivo per il testo, Crimson Pro (logo Cessna) e Old Standard TT (FLIGHT MANUAL) per la copertina |
| `tools/afm-rec/bozza.py` | prima bozza di una pagina dalla scansione (Tesseract, filetti, puntini guida), da correggere a mano |
| `tools/afm-rec/misura.py` | misura sulla scansione dove comincia e finisce ogni parola (e ogni lettera dei titoli); ripetibile: rimisurare non sposta niente |
| `tools/afm-rec/dubbi.py` | le parole su cui la bozza e lo strato di testo del PDF non sono d'accordo, ritagliate da guardare; la punteggiatura in fondo alle parole (punto o virgola) |
| `tools/afm-rec/correggi.py` | le correzioni a mano di una pagina (testo di una parola, via i filetti e i puntini della bozza, stato) |
| `tools/afm-rec/ribasa.py` | la linea di base di ogni gruppo di parole dall'inchiostro (divide le righe della bozza che uniscono pezzi a basi diverse) |
| `tools/afm-rec/riga.py`, `puntini.py` | una riga dal suo testo letto a vista (le parole sui gruppi di inchiostro, in ordine) e i puntini guida di una riga |
| `tools/afm-rec/segmenti.py`, `estremi.py`, `parole.py`, `etichette.py` | dove sta l'inchiostro di una riga, di una parola in un intervallo, delle parole piccole di una figura; le scritte delle figure lette da Tesseract sull'ingrandimento |
| `tools/afm-rec/filetti.py`, `filetto.py` | i filetti di tabelle e cornici, e un filetto misurato lungo tutta la sua lunghezza (spessore e pendenza) come poligono |
| `tools/afm-rec/tratto.py` | un disegno al tratto con potrace, tolte le scritte e le forme gia' ricostruite; con `--retino` le campiture a puntini diventano grigio pieno (`--retino=min,max,grigio,pieno,bordo` per un retino piu' scuro o piu' chiaro del solito, come nelle figure 4-1 e 4-2) |
| `tools/afm-rec/vista.py`, `chiudi.py` | i ritagli dei numeri non confermati, e la loro chiusura a vista in controlli.json dopo averli guardati |
| `tools/afm-rec/bozza2.py` | bozza riga per riga solo dentro la colonna del testo (per le pagine con grafica ai bordi, come la striscia della sezione III) |
| `tools/afm-rec/testo.py` | le righe di una pagina dal testo letto a vista (`testi/<pagina>.txt`): ogni parola si aggancia al suo inchiostro con la programmazione dinamica |
| `tools/afm-rec/strisce.py` | la striscia delle procedure di emergenza: ogni barra obliqua diventa un quadrilatero misurato |
| `tools/afm-rec/striscia.py` | la striscia delle procedure di emergenza ridisegnata (barre sottili uguali e parallele, sempre a sinistra del testo, alla stessa distanza dal bordo su tutte le pagine; numeri in `stile.json`): e' quella usata |
| `tools/afm-rec/afm-ccaf/costruisci/griglia.py` | le tabelle a griglia delle pagine di traverso: filetti misurati ai due capi, una riga di testo per riga d'inchiostro di ogni cella, intestazione nel riferimento del libro (5-7, 5-9, 5-10, 5-11) |
| `tools/afm-rec/afm-ccaf/costruisci/copertina.py` | la copertina a strati di colore: forme misurate, disegni vettorializzati nelle tinte restaurate, il resto testo vero |
| `tools/afm-rec/afm-ccaf/costruisci/retro.mjs` | il retro della copertina con l'avvertenza dell'anteprima, impaginata come le pagine di testo |
| `tools/afm-rec/afm-ccaf/costruisci/indice.py` | le pagine dell'indice: voce, puntini guida misurati uno per uno, numero di pagina |
| `tools/afm-rec/afm-ccaf/costruisci/crociera.py`, `crociera_leggi.py`, `crociera_chiudi.py` | i cinque fogli della figura 5-1: struttura comune, numeri letti due volte e decisi dall'aritmetica della riga, ritagli dei numeri da guardare e loro seconda conferma |
| `tools/afm-rec/rec.mjs` | costruisce `data/afm-rec/<id>/libro.html` |
| `tools/afm-rec/verifica.mjs` | il controllo: righe (inizio, fine, linea di base), macchie, parole strozzate o sovrapposte, numeri (due letture), e scrive `tools/afm-rec/VERIFICA.md` |
| `tools/afm-rec/calibra.mjs`, `font-prova.mjs`, `font-confronto.mjs` | taratura dei font e proposta dei font a confronto |
| `tools/afm-rec/NOTE.md` | cio' che nell'originale non si corregge, e le decisioni su cio' che non e' stampa |

Per rifare una pagina (servono tesseract, potrace, PyMuPDF, Pillow, numpy e i
due pacchetti npm del manuale):

```
/usr/bin/python3 tools/afm-rec/bozza.py afm-ccaf 23        # bozza della pagina 23 del PDF, da correggere
/usr/bin/python3 tools/afm-rec/misura.py afm-ccaf 2-1      # misure delle parole sulla scansione
CHROME=/percorso/chrome node tools/afm-rec/rec.mjs afm-ccaf
CHROME=/percorso/chrome node tools/afm-rec/verifica.mjs afm-ccaf
```

Stato: I-CCAF ricostruito tutto (copertina restaurata, retro con
l'avvertenza dell'anteprima, pagine i-vi, sezioni I…VI: 1-1…1-14, 2-1…2-8,
3-1…3-9, 4-1…4-16, 5-1…5-12, 6-1…6-20: testo, tabelle, cartelli, figure
1-1…1-5, 4-1…4-3, 5-1…5-7, 6-1…6-6): tutte verificate, zero differenze
aperte, nella via di mezzo e nella normale. Ogni numero ha due conferme
indipendenti (Tesseract, strato di testo del PDF, lettura a vista con una
seconda fonte: un'altra pagina del manuale, il manuale di I-CCAB,
DATI-AFM.md, una somma o una conversione di unita' che torna). Prossimo:
I-CCAB.

Come si rifa' una pagina di testo: `bozza.py` → `dubbi.py` (e i ritagli) →
`correggi.py` → `misura.py` → `ribasa.py` → `misura.py` → `rec.mjs --medio` →
`verifica.mjs --medio` → `vista.py`/`chiudi.py` per i numeri che l'OCR non
legge. Nella sezione III si e' fatto piu' in fretta: `bozza2.py` → testo letto a vista
in `testi/<pagina>.txt` → `testo.py` → `striscia.py` → `misura.py` →
`ribasa.py`; la pagina dichiara la sua `colonna` del testo, che misura e
verifica rispettano (la striscia fuori non e' testo). Una pagina con figura ha il suo script in `costruisci/`, poi
`misura.py`, `ribasa.py` e `tratto.py`.

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

Il sistema grafico è descritto in `DESIGN.md` ("L'EFB di notte"): a sinistra una
colonna di icone (Flights, New flight, manuale; tema e menu in fondo), che sul
telefono diventa una barra in alto; testo in Public Sans e ogni cifra in
JetBrains Mono, serviti dal sito (`fonts/`, licenza OFL); una sola riga d'accento
di 1 px per segnare cosa è selezionato. Il testo è a 14 px (15 px sui
dispositivi touch), i controlli sono alti almeno 44 px al tocco e i campi
restano a 16 px su iPad e telefono, così iOS non ingrandisce la pagina.

### Tema chiaro e scuro

Il pulsante con sole/luna, in fondo alla colonna di icone, commuta fra i temi
Notte e Giorno.
L'attributo `data-tema` su `<html>` vale `scuro` o `chiaro`; la scelta si ricorda
in `localStorage` sotto `ofp_tema` e finché non la si tocca si segue quella del
sistema operativo (`prefers-color-scheme`). Uno script inline nell'`<head>`
di ogni pagina applica il tema **prima del primo disegno**, così non si vede il
lampo della tavolozza sbagliata; il resto (pulsante e memoria) sta in
`ofp-core.js`, condiviso fra le due pagine.

I colori sono tutti variabili CSS su `:root`, ridefinite in
`html[data-tema="chiaro"]`: le tinte semantiche — `--sem-ok`, `--sem-caution`,
`--sem-fail` — hanno valori più scuri nel tema chiaro, perché il verde e l'ambra
che si leggono bene sul nero non si leggono su una tinta chiara.

**Il tema Giorno è grigio pietra, non bianco.** Un foglio bianco a schermo pieno
acceca, e in cabina di giorno lo si guarda per ore: fondo `#e5e5e2`, schede
`#f2f2ef`, appena caldi ma non crema. Il tema Notte è un grigio neutro
(`#171719`, schede `#111013`), mai blu notte. Ogni testo sta sopra 4,5:1 sulla
sua superficie.

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
- I pesi a vuoto sono quelli del foglio Rev. 17. Dopo una nuova pesata vanno
  aggiornati (opzione **Other** nel selettore dello Step 1, o `AIRCRAFT` in `index.html`).
- Le distanze pista sono campi liberi con i default AFM a livello del mare: le
  correzioni per quota, temperatura, vento ed erba vanno applicate dal pilota.
- Le V-speeds usano la fascia di peso AFM più vicina senza interpolare
  (arrotondamento conservativo), come nel generatore originale.

> Strumento di supporto alla pianificazione. Fa fede il Flight Manual
> dell'aeromobile; i dati vanno verificati dal pilota prima del volo.
