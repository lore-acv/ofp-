# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Allievi e soci dell'Aeroclub di Varese (LILN) che preparano voli VFR sui due
Reims Rocket del club, I-CCAF (FR172J) e I-CCAB (FR172H). Oggi pochi utenti;
l'obiettivo entro un anno e' di circa 50 persone, ciascuna con il proprio
account abilitato dall'amministratore.

Il lavoro che fanno: preparare il volo, cioe' rotta, carburante, masse e
centraggio, prestazioni di decollo e atterraggio, meteo, NOTAM e briefing, e
portarsi in cabina i documenti stampati.

## Product Purpose

Trasforma il NavLog di ForeFlight (o una rotta standard del club) e il
briefing meteo SkyBrief in un Operational Flight Plan completo, calcolato con i
dati del Flight Manual dell'aeroplano e del foglio Pesi e Bilanciamento del
club. Produce tre documenti PDF: l'OFP (A4), il NAV-FLIGHTPLAN (A5) e il
Navigation Log dell'Aeroclub di Varese (fronte e retro A4).

Successo significa: un pilota prepara il volo in modo completo e ripetibile, e
ogni numero che porta in cabina e' giusto oppure segnalato come dubbio.

## Positioning

Non e' un'app generica di pianificazione: usa le tabelle dei due manuali
Reims Rocket (FR172J Edition 3, FR172H Edition 2), il foglio Pesi e
Bilanciamento Rev. 17 dei due aeroplani, le rotte standard e il modulo
Navigation Log del club. Ogni valore stampato rimanda alla figura del manuale o
al documento del club da cui viene.

## Operating Context

- Il volo si prepara il pomeriggio o la sera prima; la mattina stessa, spesso
  in aeroporto, si aggiorna il meteo caricando il briefing del giorno sul volo
  salvato.
- Dispositivi: soprattutto iPad e computer; il telefono e' possibile.
- Sempre al chiuso, con luce moderata (casa, sala briefing, ufficio
  dell'aeroclub). Non in cabina durante l'uso del sito: in cabina vanno i PDF
  stampati.
- Fonti esterne: NavLog ForeFlight (PDF o testo), briefing SkyBrief (PDF, link
  nella pagina Import), OurAirports per piste, elevazioni e frequenze.

## Capabilities and Constraints

- Piano carburante: salita AFM fig. 5-6, crociera fig. 5-1, 5 minuti per
  aeroporto, contingency 5% (minimo 15 min), riserva finale 30 min VFR / 45 IFR,
  rullaggio 7,5 L/h; utilizzabile 174 L.
- Masse e centraggio dal foglio Rev. 17; inviluppi Normal e Utility.
- Distanze pista AFM fig. 5-4 e 5-5 con le correzioni delle note del manuale;
  vento, raffiche, VRB e limiti al traverso.
- Effemeridi (alba, tramonto, crepuscolo civile secondo SERA) per ogni
  aeroporto del volo.
- Rotte standard ACV (6 al momento) generate dai NavLog ForeFlight del club.
- Unita': velocita' in MPH IAS come nel manuale (kt su richiesta), carburante in
  litri, masse in kg, orari UTC.
- Interfaccia e documenti in inglese; documentazione interna del progetto in
  italiano.
- Sito statico su Cloudflare Pages con accesso riservato; `main` e' la
  produzione.

## Brand Commitments

- Nome e marchio dell'Aeroclub di Varese; il rosso del club solo per il
  marchio.
- Tono istituzionale e professionale: deve sembrare uno strumento di una
  compagnia aerea, non un'app per hobby.
- La rotta animata con il logo AV all'accesso e in Dashboard.

## Evidence on Hand

- `DATI-AFM.md`: provenienza di ogni numero dei due manuali e del foglio pesi.
- Manuale d'uso Rev. 2 (`data/manuale.pdf`, e-book in `manuale.html`).
- NavLog delle rotte standard in `data/rotte-acv/`.
- Non esistono testimonianze, statistiche d'uso o certificazioni: non vanno
  inventate.

## Product Principles

1. **Nessun dato dubbio passa in silenzio.** Molti piloti faranno affidamento
   cieco sui numeri: ogni valore calcolato fuori dal campo delle tabelle,
   stimato, mancante o in conflitto si segnala in modo visibile, nel sito e nel
   documento. Meglio un avviso in piu' che un numero sbagliato.
2. **Ogni numero ha la sua fonte.** Si usano solo valori pubblicati dal
   manuale o dai documenti del club; dove manca un dato (vento in coda, pista
   bagnata) lo si dice, non lo si inventa.
3. **Lo stesso volo, gli stessi numeri.** OFP, NAV-FLIGHTPLAN e Navigation Log
   devono coincidere tra loro e con quello che si vede a schermo.
4. **Strumento di compagnia aerea.** Precisione, sobrieta' e terminologia
   operativa prima dell'effetto grafico.
5. **Il pilota resta responsabile.** Lo strumento aiuta e verifica, non
   sostituisce AFM, SOP e AIP, e lo dice.

## Accessibility & Inclusion

- Contrasto verificato WCAG in entrambi i temi (testo principale oltre 15:1
  nello scuro, colori di stato oltre 4,5:1).
- Il colore non porta mai il significato da solo: c'e' sempre anche una
  parola, una forma o un simbolo.
- Aree di tocco di almeno 44 px, nessuno zoom sui campi su iPad, rispetto di
  "riduci movimento".
