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
Lo Step 3 segnala quando il TOW calcolato la rende disponibile.

## Carburante (fig. 1-4 e fig. 6-4)

- Utilizzabile totale: **46 US gal = 174 litri** (2 serbatoi da 23 USG).
- Sample Loading Problem: 174 litri = 125,2 kg → **0,72 kg/litro**, quindi
  **1 USG = 2,72 kg**. Le due conversioni richieste sono coerenti fra loro.
- Nel codice: `USABLE_FUEL_USG`, `KG_PER_LITRE`, `KG_PER_USG`, `L_PER_USG`.
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

## Cosa NON viene dall'AFM

- I default di rotta (LILN → LIMC), immatricolazione (I-CCAF), GS e fuel flow
  del form: sono solo valori di comodo per iniziare, da sostituire volo per volo.
- Lo ZFW di default (780 kg): peso a vuoto d'esempio dell'AFM (677,7 kg) + olio
  (8,5 kg) + un pilota. **Va sostituito con il valore del foglio M&B reale
  dell'aeromobile**, che dipende dall'esemplare.
