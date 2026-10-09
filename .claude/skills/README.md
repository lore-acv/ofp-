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
