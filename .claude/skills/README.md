# Skill di progetto per Claude Code

Claude Code carica da solo le skill di questa cartella in ogni sessione sul
repository, anche nelle sessioni cloud. Non finiscono nel sito pubblicato:
`tools/sito.mjs` copia in `dist/` solo i file che elenca.

## Da emilkowalski/skills

Copiate da <https://github.com/emilkowalski/skills>, commit `e8a175d`, licenza
MIT (`LICENSE-emilkowalski`). Sono design di interfaccia e animazioni per il
web:

| Skill | Cosa fa |
|---|---|
| `emil-design-eng` | Principi di design engineering: rifinitura dei componenti, scelte di animazione |
| `animate` | Costruisce un'animazione: se animare, proprieta', curva, durata, interruzione |
| `review-animations` | Revisione severa delle animazioni esistenti (solo su richiesta) |
| `improve-animations` | Audit delle animazioni del codice e piani di intervento, senza modificare nulla |
| `find-animation-opportunities` | Dove servirebbe movimento e dove no, senza modificare nulla |
| `animation-vocabulary` | Il nome esatto di un effetto descritto a parole |
| `apple-design` | Principi di interfaccia e movimento di Apple, per il web |
| `mobile-native` | Le correzioni che fanno sembrare nativa una web app su telefono e iPad |
| `break-ui` | Prova un'interfaccia con dati estremi e riporta cosa si rompe |
| `prototype` | Piu' varianti di un componente da confrontare (solo su richiesta) |
| `pick-ui-library` | Sceglie una libreria per un compito di frontend (solo su richiesta) |

Lasciate fuori perche' non riguardano questo sito: `write-swift` (Swift),
`animate-expo` (React Native) e `ask-sonner` (libreria React).

Per aggiornarle: ricopiare le cartelle dal repository originale e aggiornare
qui il commit.

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
