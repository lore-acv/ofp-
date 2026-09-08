# Dati aeromobile — da dove viene ogni numero

Tutti i valori del generatore vengono dal **Flight Manual Reims Rocket, Model FR172J,
Edition 3** (Reims Aviation, Reims/Marne — French TC 43, FAA TC A18EU), cioè il
manuale del "Cessna C172 FR" allegato alla richiesta.

Il FR172J **non è un 172 standard**: monta un **Continental IO-360-D da 210 HP a
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
| VNE / VNO / VFE / VA | 161 / 127 / 87 / 104 kt | `AC_LIMITS.vne…va` |
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

L'AFM pubblica **VA = 104 kt a 1157 kg** (pag. 2-1). VA scala con la radice del
rapporto delle masse: `VA(W) = 104 × √(W/1157)`. È lo stesso conto che fa il
foglio dell'aeroclub, che però lo esprime in MPH partendo dai 61 MPH di stallo
(`61 × √(W/1157) × √3,8` = 118,9 MPH a 1157 kg, cioè i 118 MPH del cartellino).
Nel codice: `vaFor()`.

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

## V-speeds — `POH_WEIGHTS` / `POH_TABLE`

Le fasce di peso sono **le tre per cui l'AFM tabula davvero le prestazioni**:
**850 / 1000 / 1157 kg** (fig. 5-4 decollo, fig. 5-6 salita). Non sono stati
aggiunti pesi intermedi inventati.

| Riga | Origine | 850 | 1000 | 1157 |
|---|---|---|---|---|
| V best glide | fig. 5-7: 74 kt a 1157 kg, elica in autorotazione, flap UP; scalata √(W/1157) | 63 | 69 | **74** |
| VR rotate | fig. 5-4, colonna "VI 15 m" — valori AFM diretti | **50** | **55** | **59** |
| VY best rate | fig. 5-6 al livello del mare — valori AFM diretti | **70** | **71** | **74** |
| Vref flaps UP | 1,3 × Vs flap UP (Vs = 53 kt, fig. 5-3), scalata | 59 | 64 | 69 |
| Vref flaps 10 T/O | 1,3 × Vs a 10°, **interpolata** fra flap UP (53) e flap 20° (48) | 56 | 61 | 66 |
| Vref flaps 40 FULL | fig. 5-5, "APPROACH SPEED" = 63 kt a 1157 kg, scalata | 54 | 59 | **63** |

In grassetto i valori letti tali e quali dal manuale; gli altri sono ricavati con
√(W/1157) (scalatura standard per le velocità legate alla portanza) o con il
rapporto 1,3 × Vs.

**L'unica riga interpolata è Vref flaps 10°**: l'AFM tabula lo stallo solo a flap
UP e flap 20°, e la richiesta chiedeva esplicitamente il valore a 10° (assetto di
decollo del FR172J). La derivazione è annotata sia nel codice sia in nota a piè di
tabella nell'anteprima e nel PDF.

Vref flaps 40° usa i 63 kt dell'AFM invece di 1,3 × Vs40 (che darebbe 60 kt):
si è tenuto il valore pubblicato, più conservativo.

## Crociera — `CRUISE_TABLE`

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

## Salita — `CLIMB_FUEL_L`

fig. 5-6, a 1157 kg e piena potenza, **incluso avviamento e decollo**:
4,9 L al livello del mare, 11,7 L a 5000 ft, 20,1 L a 10000 ft, 33,3 L a 15000 ft.

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
dell'aeroclub (*Pesi e Bilanciamento Rev. 14*), fogli `I-CCAF` e `I-CCAB`.
Il file contiene tutta la flotta; i due C172FR sono questi.

## Peso a vuoto (`AIRCRAFT`)

| Aeromobile | Basic Empty Weight | Momento a vuoto | Braccio ricavato |
|---|---|---|---|
| **I-CCAF** | 716,1 kg | 693,9009 kg·m | 0,969 m |
| **I-CCAB** | 724,0 kg | 683,0 kg·m | **0,94337 m** |

Si memorizza il **momento**, non il braccio. Sul foglio di I-CCAB il braccio
scritto in cella è 0,94 m, ma 724,0 × 0,94 = 680,6 ≠ 683,0: è il **momento**
quello che il foglio propaga davvero nei calcoli (lo ZFW del foglio riporta
infatti braccio 0,94337). Ricavare il braccio da momento ÷ peso riproduce
esattamente i numeri dell'aeroclub; moltiplicare per il braccio scritto no.

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

I calcoli riproducono il foglio cifra per cifra: con I-CCAF vuoto e 2 USG di
taxi si ottiene ZFW 716,1 kg / braccio 0,969 / momento 693,9009 e taxi 5,4504 kg
/ momento 6,703992 — gli stessi valori delle celle del file Numbers.

---

## Cosa NON viene da AFM o foglio aeroclub

- I default di rotta (LILN → LIMC), GS e fuel flow del form: valori di comodo
  per iniziare, da sostituire volo per volo.
- Il peso di default di pilota e passeggeri (85 kg): va inserito quello reale.
- Il file dell'aeroclub **non contiene l'inviluppo di centraggio**: i limiti CG
  vengono dall'AFM (tabella qui sopra). Le colonne del foglio che sembrano un
  inviluppo sono in realtà il calcolo di VA in funzione del peso.
