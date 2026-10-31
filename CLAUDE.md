# Istruzioni per Claude Code

## Grafica e animazioni: sempre secondo le skill di Emil Kowalski

Ogni modifica che aggiunge o cambia elementi grafici (componenti, riquadri,
pulsanti, icone, tabelle a schermo, transizioni, animazioni) deve rispettare
le skill in `.claude/skills/` copiate da <https://github.com/emilkowalski/skills>
(vedi `.claude/skills/README.md`). Prima di scrivere il codice si leggono
almeno:

- `emil-design-eng`: se animare (frequenza d'uso), curve forti
  (`--ease-out`, `--ease-in-out`, `--ease-drawer` in `ofp.css`), durate sotto i
  300 ms, `:active` con `scale` sui controlli, hover solo sotto
  `(hover:hover) and (pointer:fine)`, nessuna animazione sulle azioni da
  tastiera, `prefers-reduced-motion` rispettato;
- `mobile-native`: area di tocco di almeno `var(--tap)`, niente selezione del
  testo né callout sui controlli (`user-select:none`, `-webkit-touch-callout:none`,
  `touch-action:manipulation`), aree sicure, campi a 16 px;
- `animate` quando si aggiunge movimento; `review-animations` solo su richiesta.

Si usano i token di `ofp.css` (colori, raggi, ombre, durate), che seguono
`DESIGN.md`, e il risultato si controlla in tema Notte, tema Giorno e su
telefono prima di pubblicarlo.

### Impeccable

In `.claude/skills/impeccable` c'e' anche la skill Impeccable (Paul Bakaus),
per revisioni e rifiniture di interfaccia: `/impeccable critique`, `audit`,
`polish`, `harden`, `clarify` e gli altri comandi elencati in
`.claude/skills/README.md`. Si usa insieme alle skill di Kowalski. Dove le due
danno indicazioni diverse su animazioni, curve, durate e comportamento al
tocco, valgono le regole di Kowalski scritte sopra; per il resto (gerarchia,
tipografia, colore, testi, accessibilita') Impeccable e' il riferimento. Il
sito resta un'interfaccia di lavoro (modalita' "Operate"): precisione e
sobrieta', niente effetti da landing page.

### Taste Skill

C'e' anche `design-taste-frontend` (Taste Skill di Leonxlnx). Per questo sito
vale il suo percorso per le schermate di lavoro (app screens,
`references/app-screens.md`), non quello delle landing page. Il sistema
attuale viene da li': lo stile *Data terminal* (seed 82212707), scelto
dall'utente il 29 ottobre 2026 e completato con un tema chiaro. Le sue regole
per le schermate di lavoro (righe e allineamenti nelle tabelle, cifre
tabellari, stati onesti, telefono) valgono per ogni nuova schermata. Ogni
schermata cambiata si controlla con

    CHROME_PATH=<wrapper con --no-sandbox> node .claude/skills/design-taste-frontend/scripts/inspect.mjs <url> --app

e non si pubblica con errori (FAIL) che non si sappiano giustificare. Non si
pescano nuove direzioni visive senza una richiesta esplicita di redesign.

### PRODUCT.md e DESIGN.md

Nella radice del repository: `PRODUCT.md` dice per chi e' il sito, in che
situazione si usa e i principi di prodotto (primo fra tutti: nessun dato
dubbio passa in silenzio); `DESIGN.md` descrive il sistema grafico (direzione
"L'EFB di notte": temi Notte e Giorno, Public Sans e JetBrains Mono serviti
dal sito, una sola riga d'accento per le selezioni) e i suoi token, che
`ofp.css` deve riportare. Si leggono prima di ogni lavoro sull'interfaccia e si
aggiornano quando il sistema cambia.

### Ordine di precedenza

Prima le parole dell'utente, poi le regole di questo file (animazioni e tocco
secondo Kowalski), poi `DESIGN.md`, poi Impeccable e infine la Taste Skill.
Il vecchio sistema "Glass Cockpit / Carta VFR" (griglia, aloni ciano e
magenta, etichette maiuscole spaziate) e' superato: dove `ofp.css` lo
contiene ancora, vale `DESIGN.md`.

## Pubblicazione

`main` va in produzione su Cloudflare Pages: ci si pubblica solo su richiesta
dell'utente. Le anteprime vanno sul branch di lavoro.

## Standard Routes ACV

Le rotte standard dell'aeroclub sono i NavLog ForeFlight in `data/rotte-acv/`,
elencati in `data/rotte-acv/elenco.json` (pdf, id, nome, eventuale `tng`).
Per aggiungerne una: copiare il PDF in quella cartella, aggiungere la riga
all'elenco e rigenerare `rotte-acv.js` con

    CHROME=/opt/pw-browsers/chromium node tools/rotte-acv.mjs

che legge i PDF con lo stesso parser della pagina di import. `rotte-acv.js`
non si modifica a mano.
