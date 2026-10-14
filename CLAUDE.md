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

Si usano i token di `ofp.css` (colori, raggi, ombre, durate), e il risultato
si controlla in tema scuro, tema chiaro e su telefono prima di pubblicarlo.

## Pubblicazione

`main` va in produzione su Cloudflare Pages: ci si pubblica solo su richiesta
dell'utente. Le anteprime vanno sul branch di lavoro.
