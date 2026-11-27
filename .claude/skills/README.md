# Skill di progetto per Claude Code

Claude Code carica da solo le skill di questa cartella in ogni sessione sul
repository, anche nelle sessioni cloud. Non finiscono nel sito pubblicato:
`tools/sito.mjs` copia in `dist/` solo i file che elenca.

## Da emilkowalski/skills

Copiate da <https://github.com/emilkowalski/skills> (ora anche `emilkowalski/skill`,
stesso repository), commit `64eb3de`, licenza MIT (`LICENSE-emilkowalski`).
Tutte le 20 skill del repository. Riguardano design di interfaccia e animazioni
per il web, tranne le ultime tre:

| Skill | Cosa fa |
|---|---|
| `ask-emil` | Indica quale skill o percorso usare nella situazione data |
| `emil-design-eng` | Principi di design engineering: rifinitura dei componenti, scelte di animazione |
| `animate` | Costruisce un'animazione: se animare, proprieta', curva, durata, interruzione |
| `choreograph` | Coordina piu' elementi che si muovono insieme: cosa si muove, in che ordine, quanto si sovrappone |
| `gestures` | Trascinamenti, swipe e pannelli che seguono il dito 1:1 e restano interrompibili |
| `animation-performance` | Animazioni dentro il budget del fotogramma; trova perche' un'animazione scatta |
| `review-animations` | Revisione severa delle animazioni esistenti (solo su richiesta) |
| `improve-animations` | Audit delle animazioni del codice e piani di intervento, senza modificare nulla |
| `find-animation-opportunities` | Dove servirebbe movimento e dove no, senza modificare nulla |
| `remove-animations` | Toglie le animazioni che non servono (modifica il codice, ma solo togliendo) |
| `animation-vocabulary` | Il nome esatto di un effetto descritto a parole |
| `apple-design` | Principi di interfaccia e movimento di Apple, per il web |
| `mobile-native` | Le correzioni che fanno sembrare nativa una web app su telefono e iPad |
| `break-ui` | Prova un'interfaccia con dati estremi e riporta cosa si rompe |
| `learn-taste` | Trasforma le correzioni di design di una sessione in regole (DESIGN.md, una skill, un controllo) |
| `prototype` | Piu' varianti di un componente da confrontare (solo su richiesta) |
| `pick-ui-library` | Sceglie una libreria per un compito di frontend (solo su richiesta) |
| `write-swift` | Swift moderno (non riguarda questo sito) |
| `animate-expo` | Animazioni in React Native ed Expo (non riguarda questo sito) |
| `ask-sonner` | Sonner, libreria React per i toast (non riguarda questo sito) |

Per aggiornarle: ricopiare le cartelle `skills/*` dal repository originale e
aggiornare qui il commit.

## Da pbakaus/impeccable

Copiata da <https://github.com/pbakaus/impeccable>, commit `5e745ac` (skill 4.8.0),
licenza Apache 2.0 (`LICENSE-impeccable`, note di terze parti in
`NOTICE-impeccable.md`). E' una skill sola, `impeccable`, con sottocomandi:

| Gruppo | Comandi |
|---|---|
| Costruire | `shape` (progetta prima di scrivere codice), `init` (PRODUCT.md), `document` (DESIGN.md dal codice), `extract` (token e componenti) |
| Valutare | `critique` (revisione UX con punteggi euristici), `audit` (accessibilita', prestazioni, responsive) |
| Rifinire | `polish`, `bolder`, `quieter`, `distill`, `harden` (errori, casi limite), `onboard` (primo avvio, stati vuoti) |
| Arricchire | `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive` |
| Adattare | `adapt`, `clarify` (testi dell'interfaccia), `optimize` |

Si invoca con `/impeccable <comando> [target]`, per esempio
`/impeccable critique import.html`. Gli agenti di supporto stanno in
`../agents/impeccable-*.md`.

Il comando `scripts/impeccable` della skill scarica al primo uso un eseguibile
dalle release GitHub del progetto (verificato con `engine-checksums.txt`).
L'**hook** che il progetto propone (controllo automatico dopo ogni modifica a
un file di interfaccia) **non e' installato**: girerebbe da solo a ogni Edit e
a fine turno. Si aggiunge, se serve, con `npx impeccable install`.

Per aggiornarla: ricopiare `.claude/skills/impeccable` e `.claude/agents/`
dal repository originale e aggiornare qui il commit.

## Da Leonxlnx/taste-skill

Copiata da <https://github.com/Leonxlnx/taste-skill>, commit `12af471` (versione
2.1.5), licenza MIT (`LICENSE-taste-skill`), nella cartella
`design-taste-frontend` come indica il suo README.

| Skill | Cosa fa |
|---|---|
| `design-taste-frontend` | Direzione artistica contro l'aspetto "fatto dall'IA": per i siti pesca fra 20 direzioni studiate su 247 siti premiati, per le schermate di lavoro (dashboard, impostazioni) ha un percorso e regole proprie; controlla la pagina in un browser vero a tre larghezze e corregge sugli screenshot |

Gli script (`scripts/*.mjs`) vogliono Node 22 e Chrome o Chromium; i file di
lavoro finiscono in `.taste-skill/`, escluso da git. Una costruzione completa
richiede 30-45 minuti: si usa su richiesta, non per i ritocchi.

Per aggiornarla: ricopiare `skills/taste-skill` del repository originale in
`design-taste-frontend` e aggiornare qui il commit.
