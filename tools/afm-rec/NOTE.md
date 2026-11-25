# NOTE — ricostruzione dei Flight Manual (anteprima)

Quello che nella ricostruzione **non** si corregge, ma si annota qui. La
pagina ricostruita riporta l'originale com'e': testo, unita', simboli,
abbreviazioni, eventuali errori. Le decisioni prese su quello che nella
scansione non e' stampa stanno in fondo.

## I-CCAF (FR172J, Edition 3)

### Pagina 1-1
- "the instructions for use": dopo "for" c'e' un segno sulla scansione (sembra
  una virgola); e' sporco, non stampa: "for use".

### Pagina 1-2 (figura 1-1)
- La quota dell'apertura alare e' "10.92 m" con il punto, mentre a pagina 1-3
  e nelle altre quote e' con la virgola (10,92): resta con il punto.
- L'angolo sotto la vista laterale e' **5°**. Sulla scansione di I-CCAF la cifra
  e' piccola e confusa (a occhio sembrava un 6); la barra superiore piatta e il
  tratto sinistro solo in alto sono di un 5, Tesseract sull'ingrandimento legge
  5°, e nel manuale di I-CCAB (altra scansione, piu' nitida) e' 5° senza dubbi.

### Pagina 1-3
- "Area: 1.97 m²" dei flap e' con il punto, le altre aree con la virgola: resta.
- Le tolleranze sono impilate ("+0°" sopra "-2°", "-0°" sotto "+1°"): si
  ricostruiscono impilate, ognuna sulla sua linea di base.

### Pagina 1-4
- "17°44'±1°": il piu' o meno sta 3-4 px sopra la linea di base, come stampato.
- "Perpendicular to Hinge Line." e' rialzata rispetto alla riga "Right:": resta
  rialzata.

### Pagina 1-7
- "can be allevi-": la "e" di "be" e' stampata male (manca il tratto sinistro,
  sembra "b3"): e' "be".

### Pagina 1-9
- "the “OFF’ position" e "switch ‘OFF” will": virgolette spaiate
  nell'originale (doppia aperta e singola chiusa, e viceversa): restano.

### Pagina 1-5 (figura 1-2)
- La fotografia del cruscotto resta fotografia (scansione pulita e ingrandita):
  non e' un disegno da ridisegnare. Numeri di richiamo e legenda sono testo.

### Pagina 1-10 (figura 1-5)
- Restano disegno (vettorializzati, non testo): le lettere dei morsetti di
  regolatore e alternatore (4-5 px), i numeri degli amperaggi negli
  interruttori (5-6 px: non si leggono con certezza, e un amperaggio sbagliato
  sarebbe peggio di uno disegnato), L e R dei magneti, le scritte bianche sulle
  barre nere dei bus.

### Pagina 1-13
- Riga "“CABIN HT” knob is pushed full in.": la virgoletta di chiusura dopo HT e'
  stampata male (sembra ’.’). Si ricostruisce come virgoletta di chiusura
  normale (”); il testo non cambia.
- Le misure usano la virgola decimale ("0,5 cm to 1,0 cm"): restano cosi'.

### Pagina 2-1
- "AIRSPEED LIMITATIONS (VC)." e "Vp (Maneuvering Speed)": la sigla e' Vp
  (non VA) e il titolo porta (VC): sono quelle dell'originale, restano.
- "The Reims Rocket is certificated as": "certificated" e' dell'originale.
- I gradi dei flap sono stampati come una "o" in apice ("FLAPS 20º"): si
  ricostruiscono come una "o" in apice, non come il simbolo °.

### Pagina 2-2
- "Flaps Up . . . +3,8   -1,52": i fattori di carico con la virgola decimale;
  nel cartello di pagina 2-6 gli stessi valori sono con il punto (+3.8, -1.52).
  Restano come sono, ognuno nella sua pagina.

### Pagina 2-4
- "CYLINDER HEAD TEMPERATURE GAGE (OPT)." e le altre voci: "GAGE" (grafia
  americana dell'epoca), resta.
- I gradi sono una "o" in apice ("300° - 460°F"), come a pagina 2-1.

### Pagina 2-5
- "8000 Feet": sulla scansione si legge "Fcet" (alla "e" manca il tratto
  orizzontale, come alla "e" di "be" a pagina 1-7). E' un difetto di stampa
  della lettera, non un refuso: il manuale di I-CCAB, stesso testo, ha
  "8000 Feet". Si ricostruisce "Feet".

### Pagina 2-6 (cartello 1)
- Il cartello e' in un carattere senza grazie condensato, diverso dal testo:
  si ricostruisce con Archivo stretto (ruolo "cartello"), i titoli in neretto.
- "This airplane must-be operated": il trattino fra "must" e "be" e' stampato
  (nel cartello e nella scansione di I-CCAF); resta.
- "CROSSWI ND": nel cartello c'e' uno spazio fra I e N (composizione a mano):
  la ricostruzione lo rispetta (le parole sono unite: il testo copiato e'
  "CROSSWIND").
- "Altitude loss in stall recovery - - 160 ft.": due trattini, restano.
- Il bordo arrotondato, i filetti, le sottolineature e i puntini guida del
  cartello sono disegno (potrace).

### Pagina 2-7 e 2-8 (cartelli 3-8)
- La numerazione dei cartelli di I-CCAF (FR172J, Edition 3) e' diversa da
  quella di I-CCAB (Edition 2, che ha anche il cartello "Both tanks on for
  takeoff & landing" e "Do not turn off alternator..."): ognuno ha la sua.
- "Control lock -- Remove before starting engine.": due trattini, restano.

### Pagina 5-12
- La pagina 5-12 porta la "Figure 5-7.": e' la numerazione dell'originale
  (le figure non seguono il numero di pagina).
- "SPEED VI:": la sigla e' VI (velocita' indicata), come nell'originale.

### Sezione III (pagine 3-1 … 3-9)
- **Striscia delle procedure di emergenza** (scelta del 2026, su richiesta):
  nella stampa e' una fila di barre nere oblique sul bordo esterno della
  pagina (a destra sulle dispari, a sinistra sulle pari), larghe 20-25 px,
  irregolari, quasi attaccate al testo. Nella ricostruzione si ridisegna
  (`striscia.py`, numeri in `stile.json` → `striscia`): 21 barre sottili
  (8 px) tutte uguali e parallele, orientate come nella stampa (una /), a
  passo 72, centrate in verticale; **sempre a sinistra del testo**, sulle
  pari e sulle dispari, con il bordo sinistro a 212 px dal bordo della
  pagina, uguale su tutte (la distanza dal testo cambia un poco perche' il
  testo delle dispari comincia piu' a destra). Non ricalca la scansione: la
  verifica confronta l'inchiostro solo dentro la colonna del testo e ignora
  le barre stampate. Le barre misurate sulla stampa (`strisce.py`) restano
  come riferimento delle misure.
- "Throttle - - Idle.", "Mixture - - Rich." ecc.: nella stampa il segno fra
  la voce e l'azione sono due trattini corti separati, e cosi' restano (non
  diventano una lineetta). Dove ce n'e' uno solo, lungo ("Switch – “OFF”",
  "Handle – “BOTH”"), e' una lineetta.
- 3-3, "(1) Master Switch - - ”OFF”.": l'apertura e' la virgoletta di
  chiusura (”), errore di stampa; resta. Nello stesso elenco di "WING FIRE."
  la virgoletta e' giusta (“OFF”).
- 3-2, 3-4, 3-6, 3-8: nell'intestazione "Page:" ed "Edition:" sono molto
  distanti (piu' di cento pixel): e' l'impaginazione dell'originale, si segue.
- "20°", "40°": nella stampa il grado e' una o piccola in apice; si scrive
  col segno di grado.
- 3-5, "approach." in fondo alla riga 666: il punto cade sotto la barra della
  striscia (nero su nero, non si vede); si scrive.
- 3-2 e 3-4, 3-6, 3-8: segni a evidenziatore sopra "Page:" e "Reims
  Aviation"; non si ricostruiscono (vedi sotto).

## Decisioni su cio' che nella scansione non e' stampa
- **Sottolineature colorate** (giallo, azzurro) sulla scansione di I-CCAF:
  sono segni a evidenziatore sulla copia scansionata, non stampa del manuale.
  Non si ricostruiscono. Restano visibili nella scansione originale (modalita'
  confronto).
- **Macchie e puntini sparsi** della scansione (polvere, fotocopia) non si
  ricostruiscono.
- **Retini** (campiture a puntini, per esempio il "fuel supply" della figura
  1-3): diventano una campitura grigia piena (grigio 163, quello medio del
  retino), non migliaia di puntini.
- **Filetti sbiaditi nella scansione** (il lato destro della cornice della
  figura 1-2, in alto): si disegnano continui come gli altri.
- **Deformazione della scansione**: la scansione di I-CCAF e' piu' stretta in
  orizzontale dell'originale stampato (circa il 72%: si vede confrontandola con
  quella di I-CCAB, a 600 dpi e non deformata). La ricostruzione di I-CCAF segue
  la scansione di I-CCAF (stesse righe, stessi a capo, stesse posizioni):
  per questo le lettere sono disegnate un po' piu' strette del font originale.
