# Dati aeromobile — da dove viene ogni numero

I due aeroplani dell'aeroclub sono due modelli diversi della stessa serie
Reims Rocket (French TC 43, FAA TC A18EU), ciascuno con il proprio manuale:

| Aeromobile | Modello | Manuale |
|---|---|---|
| **I-CCAF** | FR172J | Flight Manual Reims Rocket, Edition 3 |
| **I-CCAB** | FR172H | Flight Manual Reims Rocket, Edition 2 (settembre 1971; traduzione inglese di cortesia) |

I due manuali sono stati confrontati tabella per tabella. **Coincidono al
numero**: limiti di velocità (VNE, VNO, VFE), masse, inviluppo di centraggio,
carburante, bracci, tutte le 99 righe di crociera (fig. 5-1, fogli 1-5),
ratei e carburante di salita (fig. 5-6), distanze di decollo (fig. 5-4) e di
atterraggio (fig. 5-5), velocità di avvicinamento e di planata. **Cambiano
solo quattro velocità**, che nel codice stanno in `AFM_MODELLI`:

| | FR172J (I-CCAF) | FR172H (I-CCAB) | Fonte |
|---|---|---|---|
| VR / velocità a 15 m, 850 / 1000 / 1157 kg | 58 / 63 / 68 MPH | **61 / 66 / 71 MPH** | fig. 5-4 |
| VY a 1157 kg, SL / 5000 / 10000 / 15000 ft | 85 / 84 / 83 / 82 MPH | **95 / 91 / 87 / 83 MPH** | fig. 5-6 |
| VY a 1000 kg | 82 / 81 / 80 / 79 | **92 / 88 / 85 / 81** | fig. 5-6 |
| VY a 850 kg | 80 / 78 / 77 / 76 | **88 / 85 / 82 / 79** | fig. 5-6 |
| Stallo UP / 20° / 40° a 1157 kg | 61 / 55 / 53 MPH | **64 / 58 / 53 MPH** | fig. 5-3, 2-1 |
| VA a 1157 kg | 118 MPH (104 kt) | **125 MPH (109 kt)** | pag. 2-1 |

L'app usa le velocità dell'aeroplano scelto allo Step 1. Con "Other" usa
quelle del FR172J. La VY entra anche nella **distanza** di salita (la TAS della
salita): con I-CCAB il top of climb cade un po' più lontano, mentre tempo e
carburante di salita, che dipendono da ratei e consumi identici, non cambiano.

Il resto di questo documento descrive i dati comuni ai due modelli, con le
pagine del manuale FR172J; nel manuale FR172H hanno lo stesso numero di
pagina e di figura.

Il FR172J/H **non è un 172 standard**: monta un **Continental IO-360-D da 210 HP a
2800 RPM con elica a giri costanti**. Per questo le tabelle di crociera hanno la
Manifold Pressure, che su un 172 a elica fissa non esisterebbe. I flap hanno i
detent **0 / 10 / 20 / 40 gradi**: "FULL" è 40°, non 30°.

---

## Masse e limiti (Sez. II — Limitations, pag. 2-2 / 2-4)

| Voce | Valore | Nel codice |
|---|---|---|
| MTOW / MLW, categoria Normale | **1157 kg** (2550 lb) | `AC_LIMITS.mtowNormal`, default `mtow`/`mldw` |
| MTOW, categoria Utility | **998 kg** (2200 lb) | `AC_LIMITS.mtowUtility` |
| MZFW | **non pubblicato dall'AFM** | `AC_LIMITS.mzfw` = MTOW, vedi nota |
| Bagaglio max | 91 kg (200 lb) | `AC_LIMITS.maxBaggage` |
| VNE / VNO / VFE | 161 / 127 / 87 kt | `AC_LIMITS.vne…vfe` |
| VA a 1157 kg | 118 MPH (J) / 125 MPH (H) | `AFM_MODELLI[...].vaMph` |
| Vento al traverso T/O — LDG | 20 kt — 15 kt | `AC_LIMITS.xwindTO/LDG` |
| Motore | 210 HP a 2800 RPM | — |
| Arco verde MP / RPM | 15–25 inHg / 2200–2600 | rispettato da tutta `CRUISE_TABLE` |

**Sul MZFW**: l'AFM del FR172J non prevede una massa massima a carburante zero.
Il vincolo reale è la massa massima al decollo più l'inviluppo di centraggio
(fig. 6-5 / 6-6). Il campo MZFW resta nel form perché il template OFP lo prevede,
precompilato al MTOW: è un limite non attivo, non un dato inventato.

**Categoria Utility**: consentita solo con bagagliaio e sedili posteriori vuoti.
Lo Step 3 segnala quando massa e centraggio al decollo la rendono disponibile.

## Inviluppo di centraggio (Sez. II, pag. 2-2 / 2-3)

| Categoria | Limite anteriore | Limite posteriore |
|---|---|---|
| Normale | +0,89 m fino a 885 kg, poi lineare fino a **+1,04 m a 1157 kg** | **+1,20 m** |
| Utility | +0,89 m fino a 885 kg, poi lineare fino a **+0,95 m a 998 kg** | **+1,03 m** |

Nel codice: `CG_ENVELOPE`, `cgLimits()`, `cgCheck()`. Il centraggio viene
verificato al decollo **e** ai due atterraggi: consumando carburante (braccio
1,23 m, dietro al CG a vuoto) il baricentro si sposta in avanti, quindi un
decollo dentro l'inviluppo non garantisce da solo un atterraggio dentro
l'inviluppo.

## Velocità di manovra alla massa effettiva

Il manuale stampa la VA in tre unità (pag. 2-1): FR172J **190 km/h, 104 kt,
118 MPH**; FR172H **201 km/h, 109 kt, 125 MPH**. Si usa la colonna in MPH,
l'unità di tutte le velocità dell'app (104 kt darebbero 120 MPH, non i 118
stampati). VA scala con la radice del rapporto delle masse:
`VA(W) = VA₁₁₅₇ × √(W/1157)`. È lo stesso conto del foglio dell'aeroclub, che
parte dallo stallo: `61 × √(W/1157) × √3,8` = 118,9 MPH per I-CCAF e
`64 × √(W/1157) × √3,8` = 124,8 MPH per I-CCAB. Nel codice: `vaFor()`.

## Carburante (fig. 1-4 e fig. 6-4)

- Utilizzabile totale: **46 US gal = 174 litri** (2 serbatoi da 23 USG).
- Sample Loading Problem: 174 litri = 125,2 kg → **0,72 kg/litro**.
- La massa si ricava **passando dai litri**, come fa il foglio dell'aeroclub:
  `USG × 3,785 × 0,72` = **2,7252 kg/USG**. È lo stesso 2,72 kg/USG con una cifra
  in più; usare il valore arrotondato scosterebbe i pesi di circa 0,2 kg su un
  pieno e i numeri non coinciderebbero più con quelli del foglio firmato.
- Nel codice: `USABLE_FUEL_USG`, `KG_PER_LITRE`, `L_PER_USG`, `KG_PER_USG`
  (derivato dai primi due).
- Lo Step 2 avvisa se il Plan Block supera i 46 USG imbarcabili.

## Velocità — `AFM_SPEEDS`

**Solo valori stampati dal manuale.** Dove l'AFM pubblica più masse o più quote si
interpola **linearmente**; dove ne pubblica uno solo, resta quello. L'unità nativa
è il **MPH**, che è come il manuale scrive le velocità operative di questo
aeroplano; un selettore permette di vederle in nodi.

### Pubblicate per più masse (interpolabili)

| | 850 kg | 1000 kg | 1157 kg | Fonte |
|---|---|---|---|---|
| VR / velocità a 15 m | 58 | 63 | 68 MPH | fig. 5-4 |
| VY al livello del mare | 80 | 82 | 85 MPH | fig. 5-6 |
| Rateo di salita SL | 1420 | 1120 | 880 ft/min | fig. 5-6 |

VY e rateo sono tabulati anche per quota (0 / 5000 / 10000 / 15000 ft), quindi
l'interpolazione è bilineare massa × quota:

| MPH | SL | 5000 | 10000 | 15000 |
|---|---|---|---|---|
| 1157 kg | 85 | 84 | 83 | 82 |
| 1000 kg | 82 | 81 | 80 | 79 |
| 850 kg | 80 | 78 | 77 | 76 |

### Pubblicate per una sola condizione

| | Valore | Fonte |
|---|---|---|
| V best glide | **85 MPH** — l'AFM non lo differenzia per massa | fig. 5-7 |
| Avvicinamento flap 40 | **73 MPH** — pubblicato solo a 1157 kg | fig. 5-5 |
| Stallo UP / 20° / 40° | **61 / 55 / 53 MPH** a 1157 kg, ali livellate | fig. 5-3 |
| Avvicinamento flap su / giù | 75–85 / 70–80 MPH (intervalli) | sez. IV |

### Correzione rispetto alla versione precedente

La prima versione conteneva valori **ricavati, non pubblicati**: V best glide e
Vref alle masse di 850 e 1000 kg erano scalati con √(W/1157), e la riga "Vref
flap 10°" era interpolata fra gli stalli a flap UP e a flap 20°. Nessuno dei due
è un dato del manuale, ed entrambi sono stati rimossi. Al loro posto ci sono i
valori pubblicati, dichiarati come tali quando valgono per una sola condizione.

Fuori dal campo tabulato **non si estrapola**: si resta sull'ultimo valore noto e
lo si segnala.

## Crociera — `CRUISE_TABLE`## Crociera — `CRUISE_TABLE`

Da **fig. 5-1, fogli 1-5** — "CRUISE PERFORMANCE, NORMAL LEAN MIXTURE", 1157 kg,
condizioni standard, vento nullo. Le quote sono quelle tabulate dall'AFM:
**2500 / 5000 / 7500 / 10000 / 15000 ft**.

Ogni cella `[MP, RPM, TAS, USG/h]` è **una riga reale del manuale**. Per ogni
colonna di potenza nominale (45/55/65/75%) è stata scelta la riga con %BHP più
vicino, a parità preferendo MP più alta e RPM più bassa — pratica corretta su un
motore a giri costanti. La %BHP effettiva è annotata a fine riga nel codice.

Una cella è `null` dove l'AFM non arriva a quella potenza: **75% non è ottenibile
oltre i ~6000 ft** e sopra i 10000 ft il motore aspirato non supera circa il 50%.
L'anteprima e il PDF stampano `--`, e `cruiseInterp()` restituisce `null`
segnalandolo invece di inventare un numero.

### `CRUISE_ECO` / `CRUISE_PWR`

Il FR172J è tabulato con **una sola miscela** ("normal lean mixture"): non
esistono le due colonne Best Economy / Best Power di altri POH. Le due costanti
sono state quindi ridefinite come **consumo minimo e massimo** della fascia di
potenza (quota alta / quota bassa) ed etichettate `FF min` / `FF max` in ogni
output, proprio per non spacciarle per due miscele diverse.

| | 45% | 55% | 65% | 75% |
|---|---|---|---|---|
| FF min (USG/h) | 6.9 | 8.3 | 9.6 | 11.1 |
| FF max (USG/h) | 7.4 | 8.6 | 10.1 | 11.4 |

## Salita — `CLIMB_FUEL_L` e `climbTimeMin()`

**Carburante** — fig. 5-6, a 1157 kg e piena potenza, **incluso avviamento e
decollo**: 4,9 L al livello del mare, 11,7 L a 5000 ft, 20,1 L a 10000 ft,
33,3 L a 15000 ft.

**Tempo** — la colonna dei tempi della fig. 5-6 **non è trascritta**: il tempo
viene calcolato dal *rateo* pubblicato nella stessa figura (880 / 650 / 420 /
190 ft/min a 0 / 5000 / 10000 / 15000 ft, 1157 kg). Con un rateo che varia
linearmente con la quota il tempo per salire da h1 a h2 è

    t = (h2 - h1) / (R1 - R2) · ln(R1 / R2)

cioè l'integrale di dh/R(h), non una stima. Ne escono 6,6 min a 5000 ft,
16,1 a 10000 e 33,3 a 15000.

Il risultato si può verificare contro la colonna del carburante, che invece è
tabulata: dividendo i litri di ciascun tratto per questi minuti si ottengono
**62, 53 e 46 L/h** salendo rispettivamente a 5000, 10000 e 15000 ft. Sono i
consumi a piena potenza di un IO-360 da 210 HP, e calano con la quota come deve
fare un motore aspirato a tutto gas. Le due colonne concordano.

> Se l'AFM in tuo possesso riporta la colonna dei tempi, sostituiscila a questo
> calcolo: sono valori pubblicati e vincono sempre su un valore derivato.

**Distanza** — la fig. 5-6 **non pubblica la distanza** percorsa in salita, e
`climbDistNm()` la ricava integrando la velocità sul tempo di salita:

    d = ∫ TAS(h) / ROC(h) dh

con rateo e Vy interpolati linearmente fra le quote tabulate a 1157 kg (Vy
85 / 84 / 83 / 82 MPH, rateo come sopra). La Vy dell'AFM è una velocità
**indicata**, e si porta a velocità vera col rapporto di densità
dell'atmosfera standard:

    TAS = IAS / √σ        σ = (1 − 6,8756·10⁻⁶ · h)^4,2559

cioè ×1,077 a 5000 ft e ×1,164 a 10000. Tre scelte, e perché:

- **Non** la regola del 2% ogni 1000 ft, che dà ×1,10 e ×1,20: sopravvaluta la
  velocità, allunga la distanza di salita e accorcia quella di crociera — sposta
  il conto dalla parte ottimista, cioè proprio quella da correggere.
- Atmosfera **standard**, non la temperatura del giorno: anche il rateo
  pubblicato è standard, e correggere solo la velocità sbilancerebbe il conto
  nello stesso verso.
- IAS presa uguale a CAS; alla Vy di questo aeroplano la differenza, come la
  comprimibilità, è trascurabile. In salita la GS si considera uguale alla TAS.

L'integrale si fa a passi di 50 ft. Sulla stessa griglia il tempo coincide al
secondo con la formula esatta qui sopra, e a passi di 10 ft la distanza si sposta
di meno di un centesimo di miglio. Dal livello del mare ne escono:

| quota | tempo | distanza |
|---|---|---|
| 2500 ft | 3,0 min | 3,8 nm |
| 4500 ft | 5,8 min | 7,4 nm |
| 5000 ft | 6,6 min | 8,4 nm |
| 5500 ft | 7,4 min | 9,4 nm |
| 7500 ft | 10,8 min | 14,0 nm |
| 10000 ft | 16,1 min | 21,3 nm |

**Dal campo di partenza, non dal livello del mare** — le tre colonne partono dal
livello del mare, e da un campo in quota la salita è la differenza fra due
letture (`climbProfile()`):

- tempo e distanza sono integrali da zero, quindi `T(A) − T(E)` e `D(A) − D(E)`
  sono esattamente la salita dall'elevazione E alla quota A;
- il carburante ha dentro, a quota zero, la quota fissa di avviamento e decollo
  (4,9 L), che si paga da qualunque campo si parta: `F(A) − F(E) + F(0)`, con le
  letture prese senza arrotondare e il risultato arrotondato una volta sola.

L'elevazione è quella della scheda DEP di Performance, riempita da OurAirports e
correggibile a mano; se manca vale zero. Da LILN (1100 ft) a 4500 ft la salita
fa 5,8 nm, 4,5 min e 9,5 L invece di 7,4 nm, 5,8 min e 11,0 L dal livello del
mare. Controprova: un'integrazione indipendente fatta direttamente da E ad A dà
la stessa distanza alla quarta cifra decimale.

**Come entra nel Trip** — salita e crociera si **sommano**: il Trip è il tempo
di salita più la crociera dal top of climb alla destinazione, sulla distanza
che la salita lascia, alla GS del settaggio scelto. Il carburante di salita resta
quello tabulato (avviamento e decollo compresi), quello di crociera è il fuel
flow sul tempo di crociera. La discesa non si modella: volata a consumo di
crociera lascia carburante in più, non in meno.

Se la distanza di salita supera quella del Trip, la quota di crociera non si
raggiunge: si segnala, e si contano salita intera e crociera nulla.

Il NAV-FLIGHTPLAN divide le tratte sul TOC **per distanza**, con velocità e
consumo medi di salita, così che sommando le tratte si riottengano esattamente
Trip Time e Trip Fuel dell'OFP. La pagina Performance dell'OFP riporta dove cade
il TOC lungo la rotta, per esempio «TOC 4 NM after MALNATE».

## Distanze pista (default dello Step 4)

- Decollo, flap 10°, 1157 kg, livello del mare, +15 °C, vento nullo, pista
  asfaltata (fig. 5-4): **226 m** di corsa, **375 m** per superare 15 m.
- Atterraggio, flap 40°, stesse condizioni (fig. 5-5): **189 m** di corsa,
  **387 m** da 15 m.

Sono valori di partenza, da correggere secondo le note dell'AFM: +10% ogni 14 °C
sopra la temperatura standard, +7% (decollo) o +20% (atterraggio) del totale su
erba asciutta, −10% ogni 5 kt di vento frontale in atterraggio.

---

---

# Pesi e bilanciamento — dal foglio dell'aeroclub

Struttura, bracci e catena dei pesi vengono dal **W. & B. Loading Form**
dell'aeroclub (*Pesi e Bilanciamento Rev. 17*, 2025), fogli `I-CCAF` e `I-CCAB`.
Il file contiene tutta la flotta; i due C172FR sono questi.

## Peso a vuoto (`AIRCRAFT`)

| Aeromobile | Basic Empty Weight | Momento a vuoto | Braccio ricavato |
|---|---|---|---|
| **I-CCAF** | 734,0 kg | 679,0 kg·m | **0,92507 m** |
| **I-CCAB** | 724,0 kg | 683,0 kg·m | **0,94337 m** |

Con la Rev. 17 è cambiato solo I-CCAF (Rev. 14: 716,1 kg, 693,9009 kg·m,
braccio 0,969 m). I-CCAB è invariato.

Si memorizza il **momento**, non il braccio. Su entrambi i fogli il braccio
scritto in cella non torna con il momento: I-CCAF 0,92 m, ma 734,0 × 0,92 =
675,3 ≠ 679,0; I-CCAB 0,94 m, ma 724,0 × 0,94 = 680,6 ≠ 683,0. È il **momento**
quello che il foglio propaga davvero nei calcoli (lo ZFW del foglio riporta
infatti braccio 0,92507 e 0,94337). Ricavare il braccio da momento ÷ peso
riproduce esattamente i numeri dell'aeroclub; moltiplicare per il braccio
scritto no.

I voli salvati si riaprono sempre con il peso a vuoto del foglio in vigore:
per gli aeromobili in elenco i due campi non vengono dal volo ma da `AIRCRAFT`.

Con l'opzione **Altro** i due campi si sbloccano, per quando arriva una nuova
pesata e il foglio qui dentro non è ancora aggiornato.

## Bracci delle stazioni (`ARM`)

Identici sui due esemplari, perché sono di cellula:

| Stazione | Braccio |
|---|---|
| Pilota + passeggero anteriore | **0,94 m** |
| Passeggeri posteriori | **1,86 m** |
| Bagaglio (max 91 kg) | **2,41 m** |
| Carburante | **1,23 m** |

## Catena dei pesi

Identica al foglio dell'aeroclub:

```
ZFW           = BEW + pilota/anteriore + posteriori + bagaglio
RAMP WEIGHT   = ZFW + carburante a bordo (Plan Block dello Step 2)
TAKE OFF WT   = RAMP − taxi
DEST. LDG WT  = TOW  − trip
ALTN. LDG WT  = DEST. LDG − alternato − riserva finale
```

L'ultima riga segue la definizione del foglio, *"ALTN. LANDING WEIGHT (No
Holding / Reserve Fuel)"*: è il peso all'alternato avendo bruciato anche la
riserva, cioè il caso più leggero. Contingency ed extra restano a bordo, perché
non sono carburante che si pianifica di consumare.

Il foglio dell'aeroclub prevede solo taxi / trip / alternato / holding-riserva;
la contingency dell'OFP confluisce nel Fuel On Board e resta a bordo in tutte le
fasi, il che è il comportamento corretto.

## Verifica

I calcoli riproducono il foglio cifra per cifra. Con la Rev. 17 le formule del
file Excel (lette dal file stesso) sono state rifatte a parte e confrontate con
l'app su sei carichi diversi, tre per aeromobile, dal solo pilota al pieno con
bagaglio massimo: ZFW, Ramp, TOW e i due pesi di atterraggio, con peso, braccio
e momento, coincidono in tutti i 30 casi (scarto massimo 2·10⁻¹³). Con I-CCAF
vuoto e 2 USG di taxi si ottiene ZFW 734,0 kg / braccio 0,92507 / momento 679,0
e taxi 5,4504 kg / momento 6,703992, come nelle celle del foglio.

---

## Cosa NON viene da AFM o foglio aeroclub

- I default di rotta (LILN → LIMC), GS e fuel flow del form: valori di comodo
  per iniziare, da sostituire volo per volo.
- Il peso di default di pilota e passeggeri (85 kg): va inserito quello reale.
- Il file dell'aeroclub **non contiene l'inviluppo di centraggio**: i limiti CG
  vengono dall'AFM (tabella qui sopra). Le colonne del foglio che sembrano un
  inviluppo sono in realtà il calcolo di VA in funzione del peso.
- La VA del foglio parte dallo stallo di ciascun modello: 61 MPH per I-CCAF
  (FR172J) e 64 MPH per I-CCAB (FR172H), come nei rispettivi manuali. L'app usa
  la VA stampata dal manuale (118 e 125 MPH), che coincide entro un MPH.
