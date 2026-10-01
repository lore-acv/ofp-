#!/usr/bin/env node
/* ============================================================================
   MANUALE SOP — costruisce data/manuale.pdf e data/manuale/libro.html
   ============================================================================
   Il manuale d'uso, scritto una volta sola qui sotto in stile SOP: verbi di
   procedura, campi classificati M / A / O, figure numerate con i callout
   disegnati sulle schermate vere dell'app (data/manuale/fig).

   Da questo testo escono due cose:
   - data/manuale.pdf, la versione stampabile A4, impaginata da Chromium in
     due passaggi: il primo legge su che pagina e' finito ogni titolo, il
     secondo scrive quei numeri nell'indice;
   - data/manuale/libro.html, lo stesso testo per l'e-book di manuale.html,
     che lo impagina da se' in pagine fatte per lo schermo e numera l'indice
     dopo aver impaginato.

   Serve Chromium e due pacchetti che il sito non usa — il deploy non
   costruisce il manuale, trova il PDF gia' pronto nel repo:

     npm i --no-save puppeteer-core pdfjs-dist@3.11.174
     CHROME=/percorso/chrome node tools/manuale.mjs

   ========================================================================== */
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const RADICE = process.cwd();
const DIR = path.join(RADICE, 'tools', 'manuale');
const DATI = path.join(RADICE, 'data', 'manuale');          // figure, font, libro.html
const OUT_PDF = path.join(RADICE, 'data', 'manuale.pdf');
const OUT_LIBRO = path.join(DATI, 'libro.html');
const TMP_HTML = path.join(DIR, '_manuale.html');

/* Larghezza e altezza di un JPEG, lette dall'intestazione: scritte sull'<img>
   permettono al libro di impaginare prima ancora che l'immagine arrivi. */
function misuraJpeg(file) {
  const d = readFileSync(file);
  for (let i = 2; i < d.length;) {
    const m = d[i + 1], l = d.readUInt16BE(i + 2);
    if (m >= 0xC0 && m <= 0xC3) return { h: d.readUInt16BE(i + 5), w: d.readUInt16BE(i + 7) };
    i += 2 + l;
  }
  throw new Error('JPEG senza dimensioni: ' + file);
}

const DOC = { title: 'OFP C172 FR – SOP User Manual', revision: 'Rev. 1 DRAFT', date: '01 OCT 2026' };

/* ------------------------------------------------------------------ helpers */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Markup minimo: **grassetto**, `campo`, [A] = marcatore di callout. Le entita'
   scritte nel testo (&ndash; &minus; …) passano intatte. */
function md(s) {
  return esc(s)
    .replace(/&amp;(#?\w+);/g, '&$1;')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[([A-I])\]/g, '<span class="mk">$1</span>');
}

const steps = (items, start = 1) =>
  `<ol class="steps">${items.map(([verb, text], i) =>
    `<li data-n="${start + i}."><span class="verb">${verb}</span> ${md(text)}</li>`).join('')}</ol>`;

const legend = (rows) =>
  `<table class="legend">${rows.map(([k, el, act]) =>
    `<tr><td class="lk"><span class="mk">${k}</span></td><td class="le">${md(el)}</td><td class="la">${md(act)}</td></tr>`).join('')}</table>`;

const FIG = {};
function figure(sec, src, title, caption, rows, cls = '') {
  FIG[sec] = (FIG[sec] || 0) + 1;
  return `<figure class="fig ${cls}">
  <div class="fig-id">Figure ${sec}.${FIG[sec]} &ndash; ${esc(title)}</div>
  <div class="fig-frame"><img src="@@FIG@@${src}" width="${misuraJpeg(path.join(DATI, 'fig', src)).w}" height="${misuraJpeg(path.join(DATI, 'fig', src)).h}" alt="${esc(title)}"></div>
  <figcaption>${md(caption)}</figcaption>
  ${rows && rows.length ? legend(rows) : ''}
</figure>`;
}

const split = (left, fig, ratio = '58') =>
  `<div class="split r${ratio}"><div class="col-text">${left}</div><div class="col-fig">${fig}</div></div>`;

function dtable(rows, title = 'Data entry') {
  return `<table class="dt"><caption>${esc(title)}</caption><thead><tr><th>Field</th><th>Class</th><th>Source</th><th>Pilot action</th></tr></thead><tbody>${
    rows.map(([f, c, src, act]) =>
      `<tr><td class="fn">${md(f)}</td><td><span class="cls c${c}">${c}</span></td><td>${md(src)}</td><td>${md(act)}</td></tr>`).join('')
  }</tbody></table>`;
}

const box = (kind, title, text) =>
  `<div class="box ${kind}"><div class="box-h">${esc(title)}</div><div class="box-b">${md(text)}</div></div>`;
const p = (t) => `<p>${md(t)}</p>`;
const ul = (items) => `<ul class="bul">${items.map((i) => `<li>${md(i)}</li>`).join('')}</ul>`;

/* Ogni titolo si registra nell'indice mentre lo si scrive: l'indice non si
   compila a mano e non puo' dimenticare una voce. */
const TOC = [];
function h1(n, t) {
  const id = `s${n}`;
  TOC.push({ level: 1, num: `Section ${n}`, title: t, id });
  return `<h1 class="sec" id="${id}"><span class="sn">SECTION ${n}</span><span class="st">${esc(t)}</span></h1>`;
}
function h1x(label, t, id) {
  TOC.push({ level: 1, num: label, title: t, id });
  return `<h1 class="sec" id="${id}"><span class="sn">${esc(label.toUpperCase())}</span><span class="st">${esc(t)}</span></h1>`;
}
function h1plain(t, id) {
  TOC.push({ level: 1, num: '', title: t, id });
  return `<h1 class="plain" id="${id}">${esc(t)}</h1>`;
}
/* opts.nuovaPagina: nell'e-book il paragrafo comincia su una pagina nuova */
function h2(n, t, opts = {}) {
  const id = `s${n.replace('.', '-')}`;
  TOC.push({ level: 2, num: n, title: t, id });
  const np = opts.nuovaPagina ? ' data-nuova-pagina' : '';
  return `<h2 id="${id}"${np}><span class="n">${n}</span>${esc(t)}</h2>`;
}

/* ================================================================== CONTENUTO */
const parts = [];
const A = (s) => parts.push(s);

/* ---------------------------------------------------------------- copertina */
A(`<section class="cover">
  <div class="cv-top">
    <div class="cv-kicker">STANDARD OPERATING PROCEDURES</div>
    <div class="cv-title">OFP C172 FR</div>
    <div class="cv-sub">Flight Planning Application<br>User Manual</div>
  </div>
  <table class="cv-ctl">
    <tr><th>Document</th><td>OFP-SOP &ndash; Application User Manual</td></tr>
    <tr><th>Revision</th><td>Rev. 1 &ndash; DRAFT for review</td></tr>
    <tr><th>Date</th><td>${DOC.date}</td></tr>
    <tr><th>Aircraft</th><td>Reims Cessna FR172J &ldquo;Reims Rocket&rdquo; &ndash; I-CCAF, I-CCAB</td></tr>
    <tr><th>Operations</th><td>VFR flight planning</td></tr>
    <tr><th>Outputs</th><td>Operational Flight Plan (OFP, A4) &middot; NAV-FLIGHTPLAN (A5)</td></tr>
  </table>
  <div class="cv-note">This manual describes how to operate the application. It does not replace the Aircraft
  Flight Manual, the Operations Manual or the flight school SOPs. The documents produced are an aid to
  planning: responsibility for the flight remains with the Pilot in Command.</div>
</section>`);

/* L'indice va qui, ma si conosce solo alla fine: segnaposto. */
A('@@TOC@@');

/* ---------------------------------------------------------------- convenzioni */
A('<section class="front">');
A(h1plain('Conventions', 'conv'));
A('<h3>Procedure verbs</h3>');
A(`<table class="conv">
<tr><td class="verb">LOAD</td><td>Upload a file (drag and drop or tap the drop zone).</td></tr>
<tr><td class="verb">INPUT</td><td>Type a value.</td></tr>
<tr><td class="verb">SELECT</td><td>Choose from a list, tab, tick box or menu.</td></tr>
<tr><td class="verb">VERIFY</td><td>Check that a value filled in by the application is present and plausible.</td></tr>
<tr><td class="verb">CROSS-CHECK</td><td>Compare a value with an independent source (AIP, AFM, briefing, ForeFlight).</td></tr>
<tr><td class="verb">CORRECT</td><td>Overwrite a value filled in by the application.</td></tr>
<tr><td class="verb">REVIEW</td><td>Read every message shown and act on each one.</td></tr>
</table>`);
A('<h3>Field classification</h3>');
A(`<table class="conv">
<tr><td><span class="cls cM">M</span> MANDATORY</td><td>Pilot input required. Without it the related output is missing or wrong.</td></tr>
<tr><td><span class="cls cA">A</span> AUTO</td><td>Imported or computed by the application. Editable unless shown greyed out. Must be VERIFIED.</td></tr>
<tr><td><span class="cls cO">O</span> OPTIONAL</td><td>Not required for a valid output.</td></tr>
</table>`);
A('<p class="small">The application does not block progress on empty fields. The classification above is the operating standard of this manual, not a software lock.</p>');
A('<h3>Figures and callouts</h3>');
A('<p>Figures are taken from the application in the light theme, with a real flight (LILN &ndash; T&amp;G LILE &ndash; LILN, alternate LIMF). Lettered markers <span class="mk">A</span> <span class="mk">B</span> &hellip; identify the elements described in the legend under each figure and in the procedure that cites it. The figure button &#10530; enlarges a figure on screen.</p>');
A('<h3>Notes, cautions and warnings</h3>');
A(box('warning', 'WARNING', 'Could affect the safety of the flight if ignored.'));
A(box('caution', 'CAUTION', 'Could produce a wrong or incomplete document.'));
A(box('note', 'NOTE', 'Additional information.'));
A('<h3 id="abbr">Abbreviations</h3>');
TOC.push({ level: 1, num: '', title: 'Abbreviations', id: 'abbr' });
const ABBR = [['AFM', 'Aircraft Flight Manual'], ['AIP', 'Aeronautical Information Publication'], ['ALTN', 'Alternate aerodrome'],
  ['ARR / DEST', 'Arrival / destination aerodrome'], ['ATO', 'Actual time over'], ['BEW', 'Basic empty weight'], ['CG', 'Centre of gravity'],
  ['C/S', 'Callsign'], ['DA / PA', 'Density / pressure altitude'], ['DEP', 'Departure aerodrome'], ['ECT', 'End of evening civil twilight'],
  ['EET', 'Estimated elapsed time (leg)'], ['ETO', 'Estimated time over'], ['FF', 'Fuel flow'], ['FOB', 'Fuel on board'], ['GS', 'Ground speed'],
  ['LDA', 'Landing distance available'], ['MAP', 'Manifold pressure'], ['MLAW / MTOW', 'Maximum landing / take-off weight'], ['OFP', 'Operational flight plan'],
  ['PIC', 'Pilot in command'], ['POB', 'Persons on board'], ['POH', "Pilot's Operating Handbook"], ['SR / SS', 'Sunrise / sunset'],
  ['T&G', 'Touch and go'], ['TAS', 'True airspeed'], ['TEM', 'Threat and error management'], ['TOC', 'Top of climb'],
  ['TODA / TORA', 'Take-off distance / run available'], ['TOW', 'Take-off weight'], ['UTC', 'Coordinated universal time'], ['ZFW', 'Zero fuel weight']];
A(`<table class="abbr">${ABBR.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table>`);
A('</section>');

/* ---------------------------------------------------------------- sezione 1 */
A('<section>');
A(h1(1, 'General'));
A(h2('1.1', 'Purpose'));
A(p('The application converts the route prepared in ForeFlight and the weather briefing into the two documents carried in flight: the **Operational Flight Plan (OFP)** and the **NAV-FLIGHTPLAN**. All performance, fuel and mass figures are computed from the Reims FR172J AFM; every intermediate result is shown so that it can be checked.'));
A(h2('1.2', 'Scope and applicability'));
A(ul(['Aircraft: Reims Cessna FR172J &ldquo;Reims Rocket&rdquo;, Continental IO-360-D, registrations **I-CCAF** and **I-CCAB**.',
  'Operations: VFR flight planning. Final reserve is selectable for VFR (30 min) or IFR (45 min).',
  'Units: fuel in **litres**, fuel flow in **L/h**, speeds in **MPH** (as in the AFM), distances in **NM**, times in **UTC**.']));
A(h2('1.3', 'System overview'));
A(`<div class="flow">
  <div class="fl-col"><div class="fl-h">INPUTS</div>
    <div class="fl-b">ForeFlight NavLog<small>PDF or text</small></div>
    <div class="fl-b">Weather &amp; NOTAM briefing<small>PDF &ndash; Skybrief, Skybriefing/PIB, AELO/MeteoSwiss</small></div></div>
  <div class="fl-arr">&#9654;</div>
  <div class="fl-col"><div class="fl-h">IMPORT PAGE</div><div class="fl-b">Section 2<small>file reading and status</small></div></div>
  <div class="fl-arr">&#9654;</div>
  <div class="fl-col"><div class="fl-h">WIZARD</div><div class="fl-b fl-steps">1 Flight<br>2 Route &amp; Fuel<br>3 M&amp;B<br>4 Performance<br>5 Navlog<br>6 Charts<br>7 Briefing<br>8 NOTAM &amp; Wx<small>Section 3</small></div></div>
  <div class="fl-arr">&#9654;</div>
  <div class="fl-col"><div class="fl-h">OUTPUTS</div>
    <div class="fl-b">OFP &ndash; A4<small>Section 4.2</small></div>
    <div class="fl-b">NAV-FLIGHTPLAN &ndash; A5<small>Section 4.3</small></div></div>
</div>`);
A(h2('1.4', 'Data sources'));
A(`<table class="std"><thead><tr><th>Data</th><th>Source</th></tr></thead><tbody>
<tr><td>Cruise power, TAS, fuel flow</td><td>AFM fig. 5-1, interpolated between 2500 / 5000 / 7500 / 10000 / 15000 ft</td></tr>
<tr><td>Climb time, fuel (incl. start-up and take-off)</td><td>AFM fig. 5-6, 1157 kg; climb distance derived from the same data</td></tr>
<tr><td>Take-off / landing distances</td><td>AFM fig. 5-4 / 5-5</td></tr>
<tr><td>Basic empty weight, moments, arms</td><td>Flying club W. &amp; B. Loading Form (Rev. 14)</td></tr>
<tr><td>Aerodrome position, elevation, runways, frequencies</td><td>OurAirports database (physical runway length only)</td></tr>
<tr><td>Route, checkpoints, tracks, distances</td><td>ForeFlight NavLog</td></tr>
<tr><td>METAR, SPECI, TAF, NOTAM, SIGMET/AIRMET, charts</td><td>Weather briefing PDF</td></tr>
</tbody></table>`);
A(h2('1.5', 'Responsibilities'));
A(p('The PIC is responsible for the correctness of every input, for every cross-check required by this manual, and for the decision to fly. The application does not navigate, does not decide and does not replace the AFM or the AIP.'));
A(h2('1.6', 'Data storage'));
A(p('Flights are stored only when the pilot uses **Save to Standby** (Section 4.4). Storage is local to the browser of the device in use: flights are not visible from other devices and are lost if the site data is cleared.'));
A('</section>');

/* ---------------------------------------------------------------- sezione 2 */
A('<section>');
A(h1(2, 'Data Ingestion – Import Page'));
A(h2('2.1', 'Pre-requisites'));
A(steps([['PREPARE', 'the route in ForeFlight and export the **NavLog** (PDF or text).'],
  ['DOWNLOAD', 'the **weather and NOTAM briefing** PDF covering departure, destination, alternate and route.']]));
A(h2('2.2', 'Procedure'));
A(split(steps([
  ['LOAD', 'the ForeFlight NavLog in the NavLog drop zone [A]. Load it first: its ICAO codes are used to sort the briefing.'],
  ['VERIFY', 'the NavLog summary [B]: number of waypoints, total distance and the waypoint table. For a return flight the application states that DEP and ARR are the same aerodrome.'],
]) + box('note', 'NOTE', 'Only airports, route and distance are taken from the NavLog. ForeFlight speeds and fuel figures are not used: the AFM figures take precedence.'),
figure(2, 'f2-1.jpg', 'NavLog Ingestion', 'NavLog read: 11 waypoints, 94 NM, return flight to the departure aerodrome.',
  [['A', 'NavLog drop zone', 'LOAD the ForeFlight NavLog'], ['B', 'NavLog summary and waypoint table', 'VERIFY waypoints and distance']])));
A(split(steps([
  ['LOAD', 'the briefing PDF in the briefing drop zone [A].'],
  ['VERIFY', 'the briefing summary [B]: issue date and time (UTC) and, for each aerodrome, the availability of METAR, TAF and the number of NOTAMs. `N/A` means not contained in the briefing.'],
], 3), figure(2, 'f2-2.jpg', 'Weather Briefing Ingestion', 'Four aerodromes found in the briefing, two of them with TAF.',
  [['A', 'Briefing drop zone', 'LOAD the briefing PDF'], ['B', 'Briefing summary and aerodrome table', 'VERIFY issue time and coverage']])));
A(split(steps([
  ['CONFIRM', 'both STATUS items are green [A].'],
  ['SELECT', '**Continue** [B] to open the wizard.'],
], 5) + box('caution', 'CAUTION', '**Skip and enter manually** [C] opens the wizard without imported data. Route, distances and all weather and NOTAM fields must then be entered by hand.'),
figure(2, 'f2-3.jpg', 'Import Status', 'Both files read: the wizard can be opened.',
  [['A', 'Status', 'CONFIRM both items green'], ['B', 'Continue', 'SELECT to proceed'], ['C', 'Skip and enter manually', 'Manual entry only']])));
A('</section>');

/* ---------------------------------------------------------------- sezione 3 */
A('<section>');
A(h1(3, 'Pre-flight Data Entry – Wizard'));
A(h2('3.0', 'Wizard navigation'));
A(split(steps([
  ['SELECT', 'a step pill [A] to go to any step, or use **Back** / **Next** at the bottom of the page.'],
  ['SELECT', 'the theme button [B] to switch between light and dark display. It does not affect the documents.'],
  ['SELECT', 'the menu [C] for documents and saved flights (Section 4.1).'],
]) + box('caution', 'CAUTION', 'A tick on a step pill only means that the step is behind the current one. It does **not** mean that the step is complete or correct.'),
figure(3, 'f3-1.jpg', 'Wizard Header', 'Step pills, theme button and menu.',
  [['A', 'Step pills 1–8', 'Navigate between steps'], ['B', 'Theme button', 'Light / dark display'], ['C', 'Menu', 'Documents and flights']])));

/* ---- step 1 */
A(h2('3.1', 'Step 1 – Flight & Aircraft'));
A(dtable([
  ['DEP / ARR', 'A', 'NavLog', 'VERIFY'],
  ['Aerodrome data (name, position, elevation, runways)', 'A', 'OurAirports', 'VERIFY'],
  ['ALTN', 'M', 'Pilot', 'INPUT'],
  ['Touch & Go + ICAO', 'O', 'Proposed from route', 'SELECT if landing en route'],
  ['Reg', 'A', 'Follows aircraft selected in Step 3', 'VERIFY'],
  ['Flight Mission', 'O', 'Pilot', 'INPUT'],
  ['Route', 'A', 'NavLog', 'VERIFY'],
  ['OFF, TO (UTC)', 'M', 'Pilot', 'SELECT'],
  ['LDG, BLOCK, FLT', 'A', 'Computed', 'VERIFY'],
  ['ON', 'A', 'Proposed, editable', 'VERIFY / CORRECT'],
]));
A(split(steps([
  ['VERIFY', 'DEP and ARR [A] as imported from the NavLog.'],
  ['VERIFY', 'the aerodrome data line next to each code [B]: name, coordinates, elevation and runways. The line appears automatically when the four-letter code is complete. No line = code not found: CROSS-CHECK the ICAO code.'],
  ['INPUT', 'the alternate ICAO code [C]. Its weather, NOTAMs, distance and runway data are filled in automatically.'],
  ['SELECT', '**Touch & Go** [D] only if a landing en route is planned. The application proposes the aerodromes found along the route [E].'],
  ['INPUT', 'the flight mission [F] (optional).'],
]), figure(3, 'f3-2.jpg', 'Aerodromes and Mission', 'Aerodrome codes with the data looked up automatically.',
  [['A', 'DEP / ARR', 'VERIFY'], ['B', 'Aerodrome data line', 'VERIFY elevation and runways'], ['C', 'ALTN', 'INPUT'],
    ['D', 'Touch & Go', 'SELECT if applicable'], ['E', 'Aerodromes along the route', 'Information'], ['F', 'Flight Mission', 'INPUT (optional)']])));
A(split(steps([
  ['SELECT', 'the off-blocks time OFF [A] and the take-off time TO [B], in UTC, 5-minute steps.'],
  ['VERIFY', 'LDG [C] = TO + Flight Time computed in Step 2.'],
  ['VERIFY', 'ON [D] = LDG + the departure taxi time. CORRECT it if required: once set by hand it no longer updates; set it back to `--:--` to restore automatic mode.'],
  ['VERIFY', 'BLOCK = ON &minus; OFF and FLT = LDG &minus; TO [E].'],
  ['REVIEW', 'the DAYLIGHT check [F]. It requires the flight date (Step 8).'],
], 6) + box('warning', 'WARNING', 'Times are **UTC**. Times entered in local time make the daylight check wrong by the UTC offset.'),
figure(3, 'f3-3.jpg', 'Estimated Times and Daylight Check',
  'Take-off, landing at destination and landing at the alternate, each checked against its own aerodrome.',
  [['A', 'OFF', 'SELECT (UTC)'], ['B', 'TO', 'SELECT (UTC)'], ['C', 'LDG', 'VERIFY'], ['D', 'ON', 'VERIFY / CORRECT'],
    ['E', 'BLOCK / FLT', 'VERIFY'], ['F', 'DAYLIGHT check', 'REVIEW']])));
A(`<table class="std keep"><caption>Daylight check &ndash; status</caption><thead><tr><th>Indication</th><th>Meaning</th><th>Action</th></tr></thead><tbody>
<tr><td><code>SS -h:mm</code></td><td>Daylight; margin to sunset</td><td>VERIFY margin</td></tr>
<tr><td><code>AFTER SUNSET (+h:mm)</code> / <code>BEFORE SUNRISE</code></td><td>Within civil twilight (amber)</td><td>REVIEW plan</td></tr>
<tr><td><code>NIGHT</code></td><td>After end / before start of civil twilight (red)</td><td>REVIEW plan</td></tr>
<tr><td><code>not computed</code></td><td>Date, TO time, Trip time or coordinates missing</td><td>INPUT missing data</td></tr>
</tbody></table>`);

/* ---- step 2 */
A(h2('3.2', 'Step 2 – Route & Fuel', { nuovaPagina: true }));
A(dtable([
  ['Cruise Altitude', 'M', 'Pilot', 'INPUT'],
  ['RPM, MAP', 'M', 'AFM fig. 5-1 combinations only', 'SELECT'],
  ['Trip distance', 'A', 'NavLog', 'VERIFY'],
  ['Cruise GS', 'A', 'TAS of the selected setting (still air)', 'CORRECT for wind'],
  ['Trip fuel flow', 'A', 'AFM fig. 5-1', 'VERIFY'],
  ['Alternate distance', 'A', 'Great circle ARR–ALTN', 'VERIFY / CORRECT'],
  ['Alternate altitude', 'M', 'Pilot', 'INPUT'],
  ['Alternate GS, FF, Flight Time', 'A', '22 inHg / 2400 RPM, locked', 'VERIFY'],
  ['Flight Rules', 'M', 'VFR default', 'SELECT'],
  ['Taxi time and fuel', 'A', 'Step 1 times, 7.5 L/h', 'VERIFY'],
  ['Fuel On Board', 'O', 'Pilot (actual uplift)', 'INPUT'],
  ['Extra (L)', 'O', 'Pilot, if FOB empty', 'INPUT'],
]));
A(split(steps([
  ['INPUT', 'the cruise altitude [A]. RPM and MAP stay greyed out until it is entered.'],
  ['SELECT', 'RPM and MAP [B]. Only the combinations published by the AFM at that altitude are offered.'],
  ['VERIFY', 'the power line [C]: % power, TAS and fuel flow.'],
  ['VERIFY', 'the climb line [D]: from DEP elevation to cruise altitude, time, distance and fuel (start-up and take-off included).'],
]), figure(3, 'f3-4.jpg', 'Cruise Power Setting', 'Selecting the setting fills in Trip GS and fuel flow.',
  [['A', 'Cruise Altitude', 'INPUT'], ['B', 'RPM / MAP', 'SELECT'], ['C', 'Power line', 'VERIFY'], ['D', 'Climb line', 'VERIFY']])));
A(split(steps([
  ['VERIFY', 'the Trip distance [A] from the NavLog.'],
  ['CORRECT', 'the cruise GS [B] for the forecast wind. The proposed value is the TAS of the setting.'],
  ['VERIFY', 'the fuel flow [C].'],
  ['VERIFY', 'the Trip line [D]: climb + cruise = Trip time and fuel, and the TOC position.'],
], 5) + box('warning', 'WARNING', 'An uncorrected GS assumes still air. With a headwind, Trip time and fuel are underestimated.')
  + box('caution', 'CAUTION', 'If the climb is longer than the trip, the line reads **Cruise altitude not reached**. REVIEW altitude or distance.'),
figure(3, 'f3-5.jpg', 'Trip', 'Trip = climb (AFM fig. 5-6) + cruise from the top of climb.',
  [['A', 'Distance', 'VERIFY'], ['B', 'Cruise GS', 'CORRECT for wind'], ['C', 'Fuel flow', 'VERIFY'], ['D', 'Trip line and TOC', 'VERIFY']])));
A(split(steps([
  ['VERIFY', 'the alternate distance [A] (great circle ARR&ndash;ALTN). CORRECT it for the planned routing.'],
  ['INPUT', 'the alternate altitude [B].'],
  ['VERIFY', 'GS and fuel flow [C], fixed at 22 inHg / 2400 RPM, and the computed Flight Time [D].'],
  ['VERIFY', 'the alternate line [E]: setting, time and fuel.'],
], 9), figure(3, 'f3-6.jpg', 'Alternate', 'The alternate always uses 22 inHg / 2400 RPM.',
  [['A', 'Distance', 'VERIFY / CORRECT'], ['B', 'Altitude', 'INPUT'], ['C', 'GS / fuel flow (locked)', 'VERIFY'],
    ['D', 'Flight Time (calculated)', 'VERIFY'], ['E', 'Alternate line', 'VERIFY']])));
A(split(steps([
  ['SELECT', 'the flight rules [A]: VFR = 30 min final reserve, IFR = 45 min.'],
  ['VERIFY', 'the reserves line [B]: Contingency = max(5% of Trip, 15 min); Final Reserve at cruise fuel flow.'],
  ['VERIFY', 'the Plan Block against the 174 L usable [C].'],
  ['VERIFY', 'the taxi time and fuel [D], derived from OFF&ndash;TO and LDG&ndash;ON at 7.5 L/h.'],
], 13) + box('caution', 'CAUTION', '**ABOVE the 174 L usable** on the Plan Block line: the plan exceeds tank capacity.'),
figure(3, 'f3-7.jpg', 'Reserves & Margins', 'Reserves, tank capacity and taxi are computed, not entered.',
  [['A', 'Flight Rules', 'SELECT'], ['B', 'Contingency / Final Reserve', 'VERIFY'], ['C', 'Plan Block vs usable fuel', 'VERIFY'], ['D', 'Taxi', 'VERIFY']])));
A(split(steps([
  ['INPUT', 'the fuel on board after uplift [A] (optional). It is used only to compute the extra fuel and is not printed.'],
  ['INPUT', 'the extra fuel [B] by hand if FOB is left empty.'],
  ['VERIFY', 'the line [C]: minimum required, extra litres and minutes.'],
], 17) + box('warning', 'WARNING', '**FOB … INSUFFICIENT** in red: the fuel on board is below the minimum required.'),
figure(3, 'f3-8.jpg', 'Fuel On Board & Extra', 'With FOB entered, the extra is FOB minus the minimum required.',
  [['A', 'Fuel On Board', 'INPUT (optional)'], ['B', 'Extra (L)', 'INPUT if FOB empty'], ['C', 'Minimum / extra line', 'VERIFY']])));

/* ---- step 3 */
A(h2('3.3', 'Step 3 – Mass & Balance'));
A(dtable([
  ['Registration', 'M', 'I-CCAF default', 'SELECT'],
  ['Basic Empty Weight, Moment', 'A', 'Club W&B form; editable only with Other', 'VERIFY'],
  ['Pilot + front pax', 'M', 'Pilot', 'INPUT'],
  ['Rear pax', 'O', 'Pilot', 'INPUT if carried'],
  ['Baggage (max 91 kg)', 'O', 'Pilot', 'INPUT if carried'],
  ['EPOB / POB', 'M', 'Pilot', 'INPUT'],
  ['Fuel masses', 'A', 'Step 2 (1 L = 0.72 kg)', 'VERIFY'],
  ['MZFW, MTOW, MLAW', 'A', 'AFM limits', 'VERIFY'],
  ['Remarks (M&B)', 'O', 'Pilot', 'INPUT'],
]));
A(split(steps([
  ['SELECT', 'the registration [A]. Empty weight and moment [B] are filled in and locked. Select **Other** only to enter new values after a re-weighing.'],
]), figure(3, 'f3-9.jpg', 'Aircraft Selection', 'Empty weight and moment from the flying club form.',
  [['A', 'Registration', 'SELECT'], ['B', 'BEW / moment (locked)', 'VERIFY']])));
A(split(steps([
  ['INPUT', 'pilot and front passenger mass [A].'],
  ['INPUT', 'rear passengers [B] and baggage [C] if carried. Baggage limit 91 kg.'],
  ['INPUT', 'persons on board [D].'],
  ['VERIFY', 'the ZFW line [E].'],
], 2), figure(3, 'f3-10.jpg', 'Loading', 'Fuel is not entered here: it comes from Step 2.',
  [['A', 'Pilot + front pax', 'INPUT'], ['B', 'Rear pax', 'INPUT if carried'], ['C', 'Baggage', 'INPUT if carried'], ['D', 'EPOB / POB', 'INPUT'], ['E', 'ZFW line', 'VERIFY']])));
A(split(steps([
  ['VERIFY', 'the mass check [A]: **masses within limits**.'],
  ['VERIFY', 'the CG check [B]: CG at take-off within the envelope and the category available (UTILITY / NORMAL).'],
  ['VERIFY', 'the CG envelope chart: take-off, destination landing and alternate landing points inside the envelope.'],
], 6) + box('warning', 'WARNING', 'Any mass or CG message other than **within limits** must be resolved before flight.'),
figure(3, 'f3-11.jpg', 'Mass & Balance Result', 'Loading sheet with the arms of the club form and the AFM limits.',
  [['A', 'Mass check', 'VERIFY'], ['B', 'CG and category', 'VERIFY']])));

/* ---- step 4 */
A(h2('3.4', 'Step 4 – Performance'));
A(dtable([
  ['Display Unit', 'O', 'MPH default', 'SELECT (display only)'],
  ['Runway Surface', 'M', 'Asphalt, dry default', 'SELECT'],
  ['Runway (each aerodrome)', 'M', 'None pre-selected', 'SELECT'],
  ['Elevation, RWY heading', 'A', 'OurAirports', 'VERIFY'],
  ['TORA / TODA / LDA', 'A', 'OurAirports physical length', 'CROSS-CHECK with AIP'],
  ['QNH, Temp, Wind', 'A', 'Own METAR (or nearest station)', 'VERIFY'],
  ['Runway (OFP)', 'A', 'Runway selected', 'VERIFY'],
]));
A(split(steps([
  ['SELECT', 'the display unit [A] (MPH or knots). Calculations do not change.'],
  ['SELECT', 'the runway surface [B]: asphalt dry, grass dry, or wet / contaminated.'],
]) + box('caution', 'CAUTION', 'Wet / contaminated: the AFM publishes no data and no increment is applied. A red warning is shown.'),
figure(3, 'f3-12.jpg', 'Speeds and Surface', '', [['A', 'Display Unit', 'SELECT'], ['B', 'Runway Surface', 'SELECT']])));
A(p('Each phase has its own tab [A]: **DEP** (take-off), **ARR** (landing), **ALT** (alternate landing) and **ENR** (touch and go, shown only when selected in Step 1). A dot on a tab indicates a warning for that phase.'));
A(steps([
  ['SELECT', 'each tab [A] in turn and carry out items 4 to 8.'],
  ['SELECT', 'the runway [B]. No runway is pre-selected: select it from the wind of the day.'],
  ['VERIFY', 'the elevation [C] and the runway heading.'],
  ['CROSS-CHECK', 'TORA and TODA (LDA for landing) [D] with the AIP. They are pre-filled with the physical runway length.'],
  ['VERIFY', 'QNH, temperature and wind [E], and their source [F].'],
  ['VERIFY', 'the result card [G]: pressure and density altitude, head/crosswind against the limit, distances required and margin.'],
], 3));
A(figure(3, 'f3-13.jpg', 'Take-off and Landing Data – DEP Tab',
  'Inputs on the left, result card on the right. Wind, QNH and temperature come from the LILN METAR.',
  [['A', 'Phase tabs DEP / ARR / ALT / ENR', 'SELECT each'], ['B', 'Runway', 'SELECT'], ['C', 'Elevation', 'VERIFY'],
    ['D', 'TORA / TODA', 'CROSS-CHECK with AIP'], ['E', 'QNH / Temp / Wind', 'VERIFY'], ['F', 'Weather source', 'VERIFY'],
    ['G', 'Result card', 'VERIFY margins']], 'wide'));
A(split(steps([
  ['REVIEW', 'every message in **Checks & Warnings** [A]. Red = the result does not cover the condition (e.g. tailwind, wet runway, standard weather used).'],
], 9) + box('note', 'NOTE', 'An aerodrome without METAR uses standard values (1013 hPa, 15 °C, calm) and is marked in red. If a station with METAR exists within 30 NM, a button offers its values.')
  + box('note', 'NOTE', 'Touch and go: landing and take-off are both computed with the take-off mass (conservative).'),
figure(3, 'f3-14.jpg', 'Checks & Warnings', 'Example: tailwind on the T&G runway and weather taken from a nearby station.',
  [['A', 'Checks & Warnings', 'REVIEW every item']])));

/* ---- step 5 */
A(h2('3.5', 'Step 5 – Navlog'));
A(dtable([
  ['GS / fuel flow navplan', 'O', 'Step 2 values if empty', 'INPUT only to override'],
  ['Freq.', 'A', 'OurAirports (number only)', 'VERIFY'],
  ['C/S', 'O', 'Pilot', 'INPUT'],
  ['Checkpoint, MT, Dist.', 'A', 'NavLog', 'VERIFY'],
  ['Alt.', 'A', 'Cruise altitude', 'VERIFY / CORRECT per waypoint'],
  ['EET, ETO, Fuel', 'A', 'Computed', 'VERIFY'],
  ['Remarks', 'O', 'Pilot', 'INPUT'],
]));
A(split(steps([
  ['VERIFY', 'GS and fuel flow [A] [B]. Leave empty to use the Step 2 values.'],
]), figure(3, 'f3-15.jpg', 'Navlog Speed & Fuel Flow', '',
  [['A', 'GS navplan', 'Leave empty or INPUT'], ['B', 'Fuel flow navplan', 'Leave empty or INPUT']])));
A(steps([
  ['SELECT', '**+ Row** [A] to add a checkpoint, &times; to delete one.'],
  ['SELECT', '**Fill Frequencies** [B] to repeat the frequency look-up. VERIFY frequencies [C].'],
  ['INPUT', 'callsigns [D] (not in any database).'],
  ['VERIFY', 'checkpoints, magnetic tracks and distances [E].'],
  ['VERIFY', 'the altitude of each waypoint [F]; CORRECT where different from cruise.'],
  ['VERIFY', 'EET per leg, ETO (minutes after TO) and fuel [G].'],
  ['INPUT', 'remarks [H] (optional).'],
  ['CROSS-CHECK', 'the totals line [I] with the Trip of Step 2: time and fuel must be the same.'],
], 2));
A(figure(3, 'f3-16.jpg', 'Navlog Legs',
  'Times and fuel are recomputed from the selected power setting, not copied from ForeFlight; the climb is split over the legs by distance.',
  [['A', '+ Row', 'Add checkpoint'], ['B', 'Fill Frequencies', 'Repeat look-up'], ['C', 'Freq.', 'VERIFY'], ['D', 'C/S', 'INPUT'],
    ['E', 'Checkpoint / MT / Dist.', 'VERIFY'], ['F', 'Alt.', 'VERIFY / CORRECT'], ['G', 'EET / ETO / Fuel', 'VERIFY'],
    ['H', 'Remarks', 'INPUT (optional)'], ['I', 'Totals line', 'CROSS-CHECK with Trip']], 'wide'));
A(box('note', 'NOTE', 'A leg longer than 10 minutes shows an advisory message (turning points ideally every 6–8 minutes). It does not block the wizard and does not change the navlog.'));

/* ---- step 6 / 7 */
A(h2('3.6', 'Step 6 – Destination Charts'));
A(steps([
  ['LOAD', 'up to 2 images or PDFs (aerodrome or approach charts) (optional).'],
  ['INPUT', 'the operational notes as required: Track, Runway, Altitudes, Clearance, Timing, On ground, Radios, Specials (optional).'],
]));
A(p('Charts and notes are printed on the DEST CHARTS page of the OFP. Graphic pages of the briefing (e.g. significant weather, wind charts) are added to the OFP automatically, one per page.'));
A(h2('3.7', 'Step 7 – Briefing'));
A(steps([
  ['INPUT', 'for Departure, Enroute and Destination: procedure, possible threats and mitigation.'],
  ['INPUT', 'the aircraft status and any remarks.'],
]));
A(p('These fields are not enforced by the application. Complete them in accordance with the applicable briefing requirements. They are printed on the BRIEFING page of the OFP.'));

/* ---- step 8 */
A(h2('3.8', 'Step 8 – NOTAM & Weather'));
A(dtable([
  ['Briefing PDF', 'A', 'Loaded at import; can be reloaded', 'LOAD only to update'],
  ['Date (DD.MM.YYYY)', 'M', 'Briefing', 'VERIFY / INPUT'],
  ['Time (UTC), Validity', 'A', 'Briefing', 'VERIFY'],
  ['METAR, SPECI, TAF, NOTAM per aerodrome', 'A', 'Briefing', 'VERIFY'],
  ['Enroute NOTAMs, SIGMET / AIRMET', 'A', 'Briefing', 'VERIFY'],
  ['PIC name', 'M', 'Pilot', 'INPUT'],
]));
A(split(steps([
  ['LOAD', 'a newer briefing [A] only to update the weather.'],
  ['VERIFY', 'the status line [B]: aerodromes found and those not on the route.'],
  ['VERIFY', 'the date [C]. It is printed on the OFP and used by the daylight check. INPUT it if no briefing was loaded.'],
  ['VERIFY', 'issue time [D] and validity [E].'],
]) + box('note', 'NOTE', 'If the briefing was issued on the day before the flight, the date shown is the issue date.'),
figure(3, 'f3-18.jpg', 'Briefing Data', '',
  [['A', 'Briefing drop zone', 'LOAD to update'], ['B', 'Status line', 'VERIFY'], ['C', 'Date', 'VERIFY / INPUT'], ['D', 'Time (UTC)', 'VERIFY'], ['E', 'Validity', 'VERIFY']])));
A(split(steps([
  ['VERIFY', 'for each aerodrome (DEP, ARR, T&G, ALTN) METAR [A], SPECI [B], TAF [C] and NOTAM [D]: correct aerodrome, current issue.'],
  ['VERIFY', 'the Enroute NOTAM and SIGMET / AIRMET boxes. An absence must be stated (e.g. &ldquo;no active SIGMET&rdquo;): an empty box is not information.'],
  ['INPUT', 'the PIC name. It is printed on every page of the OFP and on the NAV-FLIGHTPLAN.'],
], 5) + box('note', 'NOTE', '`N/A – not available in the briefing` is an explicit statement that the report is not contained in the briefing.'),
figure(3, 'f3-19.jpg', 'Aerodrome Weather & NOTAM', 'One block per aerodrome. Text edited by hand is not overwritten by a later import.',
  [['A', 'METAR', 'VERIFY'], ['B', 'SPECI', 'VERIFY'], ['C', 'TAF', 'VERIFY'], ['D', 'NOTAM', 'VERIFY']])));
A('</section>');

/* ---------------------------------------------------------------- sezione 4 */
A('<section>');
A(h1(4, 'System Outputs & Dispatch'));
A(h2('4.1', 'Menu'));
A(split(`<table class="std"><thead><tr><th></th><th>Item</th><th>Function</th></tr></thead><tbody>
<tr><td><span class="mk">A</span></td><td>Dashboard</td><td>Saved flights (Section 4.4)</td></tr>
<tr><td><span class="mk">B</span></td><td>New Flight Plan</td><td>Returns to the import page. Unsaved data is lost.</td></tr>
<tr><td><span class="mk">C</span></td><td>Save to Standby</td><td>Saves the flight on this device</td></tr>
<tr><td><span class="mk">D</span></td><td>Document Preview</td><td>Shows the OFP on screen</td></tr>
<tr><td><span class="mk">E</span></td><td>Print OFP</td><td>Prints the same PDF that is downloaded. On iPhone / iPad it opens in a new tab.</td></tr>
<tr><td><span class="mk">F</span></td><td>Download OFP PDF</td><td>A4 OFP</td></tr>
<tr><td><span class="mk">G</span></td><td>Download Navlog PDF</td><td>A5 NAV-FLIGHTPLAN (separate document)</td></tr>
<tr><td><span class="mk">H</span></td><td>User Manual</td><td>This manual, in a new tab</td></tr>
</tbody></table>`, figure(4, 'f4-1.jpg', 'Main Menu', 'Menu at the top right of the wizard.', [], 'menu'), '48'));
A(h2('4.2', 'Operational Flight Plan (A4)'));
A(`<table class="std keep"><caption>OFP page structure (number of pages varies with NOTAMs and charts)</caption><thead><tr><th>Page</th><th>Content</th></tr></thead><tbody>
<tr><td>OFP</td><td>Flight data, estimated / actual times, route, cruise altitude, fuel plan, alternate summary, daylight check</td></tr>
<tr><td>MASS AND BALANCE</td><td>Loading sheet, limits, CG envelope chart, remarks, PIC signature</td></tr>
<tr><td>PERFORMANCE</td><td>Masses, V-speeds, take-off and landing distances and margins, cruise power setting, TOC, AFM cruise table</td></tr>
<tr><td>DEST CHARTS</td><td>Charts and operational notes (Step 6)</td></tr>
<tr><td>BRIEFING</td><td>TEM briefing, aircraft status, remarks (Step 7)</td></tr>
<tr><td>WEATHER</td><td>METAR / SPECI / TAF by aerodrome, SIGMET / AIRMET</td></tr>
<tr><td>NOTAM</td><td>NOTAM by aerodrome and enroute</td></tr>
<tr><td>Charts</td><td>Graphic pages of the briefing, if any</td></tr>
</tbody></table>`);
A(figure(4, 'f4-2.jpg', 'OFP – Page 1', 'The ACTUAL column and the BLOCK / ACT USD lines are completed by hand.',
  [['A', 'Flight data', 'DEP / T&G / ARR / ALTN'], ['B', 'Estimated / actual times', 'Record ACTUAL in flight (UTC)'],
    ['C', 'Route and cruise altitude', 'VERIFY'], ['D', 'Fuel plan', 'CROSS-CHECK with Step 2'],
    ['E', 'BLOCK / ACT USD', 'Complete by hand'], ['F', 'Plan block mass, usable fuel', 'VERIFY'],
    ['G', 'Alternate summary', 'VERIFY'], ['H', 'Daylight check', 'REVIEW']], 'wide doc'));
A(figure(4, 'f4-3.jpg', 'OFP – Mass and Balance', 'Followed on the same page by the CG envelope chart, remarks and PIC signature.',
  [['A', 'Weight calculation', 'VERIFY'], ['B', 'Fuel calculation', 'VERIFY'], ['C', 'Result', 'VERIFY'], ['D', 'Limits and CG', 'VERIFY within limits']], 'wide doc'));
A(figure(4, 'f4-5.jpg', 'OFP – Performance', '',
  [['A', 'Masses (TOW / LAW / ALTN)', 'VERIFY'], ['B', 'V-speeds by aerodrome', 'VERIFY'], ['C', 'Take-off and landing distances', 'VERIFY'],
    ['D', 'Distances available / required / margin', 'CROSS-CHECK'], ['E', 'Cruise power setting', 'VERIFY'], ['F', 'TOC position', 'VERIFY'], ['G', 'AFM cruise table', 'Reference']], 'wide doc'));
A(h2('4.3', 'NAV-FLIGHTPLAN (A5)'));
A(steps([
  ['SELECT', '**Download Navlog PDF** from the menu. It is a separate document and never part of the OFP.'],
  ['VERIFY', 'the header [A]: aircraft, pilot, date, GS, QNH and runway.'],
  ['RECORD', 'off-blocks and on-blocks times [B] by hand.'],
  ['VERIFY', 'the legs [C].'],
  ['RECORD', 'ATO [D] in flight at each checkpoint.'],
  ['VERIFY', 'the alternate row [E] and the fuel calculation box [F].'],
]));
A(figure(4, 'f4-6.jpg', 'NAV-FLIGHTPLAN', 'A5 document for the cockpit.',
  [['A', 'Header', 'VERIFY'], ['B', 'Off Bl. / Bl. on', 'Record by hand'], ['C', 'Legs', 'VERIFY'], ['D', 'ATO', 'Record in flight'],
    ['E', 'Alternate row', 'VERIFY'], ['F', 'Fuel calculation', 'VERIFY']], 'wide doc a5'));
A(h2('4.4', 'Saved flights – Dashboard'));
A(split(steps([
  ['SELECT', '**Save to Standby** to store the flight, for example while waiting for the weather. The Dashboard opens.'],
  ['LOAD', 'the briefing PDF on the standby card [B] to finalise the flight: it moves to READY TO FLY [D].'],
  ['SELECT', '**Edit data** [C] to reopen a standby flight in the wizard.'],
  ['LOAD', 'a newer briefing on a completed card [E] to update its weather.'],
  ['SELECT', '**View OFP** [F] to reopen a completed flight in the wizard.'],
]) + box('caution', 'CAUTION', 'Saved flights are stored in this browser only. Graphic weather charts are not stored with the flight.'),
figure(4, 'f4-4.jpg', 'Dashboard', '',
  [['A', 'Standby badge', 'Awaiting weather'], ['B', 'Load briefing', 'Finalise'], ['C', 'Edit data', 'Reopen'],
    ['D', 'Ready to fly badge', 'Weather loaded'], ['E', 'Update WX', 'LOAD newer briefing'], ['F', 'View OFP', 'Reopen']])));
A('</section>');

/* ---------------------------------------------------------------- sezione 5 */
A('<section>');
A(h1(5, 'Operational Notes – Safety & Performance Limits'));
A(h2('5.1', 'Aircraft applicability'));
A(box('warning', 'WARNING', 'AFM data are those of the Reims FR172J; empty masses and moments are those of I-CCAF and I-CCAB. Used for any other aircraft the results are not approximate: they are wrong.'));
A(h2('5.2', 'Performance limits'));
A(`<table class="std lim"><thead><tr><th>Item</th><th>Limitation</th><th>Effect</th></tr></thead><tbody>
<tr><td>Declared distances</td><td>TORA / TODA / LDA pre-filled with the physical runway length (OurAirports)</td><td><b>Must</b> be corrected from the AIP where stopway, clearway or displaced threshold exist, or NOTAM changes apply</td></tr>
<tr><td>Tailwind</td><td>The AFM publishes no tailwind data</td><td>Distances are for zero wind and <b>shorter than actual</b> (red warning)</td></tr>
<tr><td>Wet / contaminated runway</td><td>No AFM data</td><td>No increment applied (red warning)</td></tr>
<tr><td>Grass runway</td><td>AFM grass increment</td><td>Applied when &ldquo;Grass, dry&rdquo; is selected</td></tr>
<tr><td>Landing mass</td><td>Landing table published at 1157 kg only</td><td>Conservative at lower masses</td></tr>
<tr><td>Touch and go</td><td>Computed with the take-off mass</td><td>Conservative</td></tr>
<tr><td>Headwind credit</td><td>Limited to the range of the AFM table / note</td><td>Grey advisory when limited</td></tr>
<tr><td>V-speeds</td><td>AFM table, no interpolation, conservative rounding</td><td>&mdash;</td></tr>
<tr><td>Weather for performance</td><td>Own METAR; nearest station within 30 NM on request; otherwise ISA standard values</td><td>Standard values flagged in red</td></tr>
</tbody></table>`);
A(h2('5.3', 'Fuel planning as implemented'));
A(`<table class="std lim"><thead><tr><th>Item</th><th>Method</th></tr></thead><tbody>
<tr><td>Trip</td><td>Climb from DEP elevation to cruise altitude (AFM fig. 5-6, 1157 kg, start-up and take-off included) + cruise over the remaining distance at the selected GS and fuel flow. Descent is not modelled separately (included in cruise).</td></tr>
<tr><td>Contingency</td><td>max(5% of Trip, 15 min at cruise fuel flow)</td></tr>
<tr><td>Alternate</td><td>Cruise only, 22 inHg / 2400 RPM at the alternate altitude, over the alternate distance. No climb or approach allowance.</td></tr>
<tr><td>Final reserve</td><td>30 min (VFR) or 45 min (IFR) at cruise fuel flow</td></tr>
<tr><td>Taxi</td><td>(TO &minus; OFF) + (ON &minus; LDG) at 7.5 L/h</td></tr>
<tr><td>Units</td><td>1 L = 0.72 kg; 174 L (46 USG) usable</td></tr>
</tbody></table>`);
A(h2('5.4', 'Navigation data'));
A(ul(['Cruise GS is TAS (still air) until corrected for wind by the pilot.',
  'The alternate distance is a great-circle distance.',
  'Frequencies are the number only, from OurAirports: CROSS-CHECK with current charts / AIP.',
  'Navlog times and fuel are recomputed by the application; their totals equal the Trip.']));
A(h2('5.5', 'Daylight check'));
A(ul(['Sunrise / sunset: upper limb at &minus;0.833°; civil twilight: centre at &minus;6° (night as defined in Regulation (EU) 923/2012).',
  'Rounded conservatively: sunset and end of twilight to the minute before, sunrise to the minute after.',
  'Uses the flight date of Step 8 and the UTC times of Step 1. No elevation correction (as in published tables).']));
A(h2('5.6', 'Documents and storage'));
A(ul(['**Print OFP** prints the same PDF that is downloaded.',
  'Saved flights stay in the browser of the device in use and are lost if the site data is cleared.',
  'The A5 NAV-FLIGHTPLAN is a separate document and must be downloaded separately.']));
A('<div class="final">The documents produced are an aid to planning. Responsibility for the flight remains with the Pilot in Command.</div>');
A('</section>');

/* ---------------------------------------------------------------- appendice */
A('<section>');
A(h1x('Appendix A', 'Pre-Departure Cross-Check', 'appA'));
A(p('Carry out before printing the documents. Each item refers to the section where the check is described.'));
const CHK = [
  ['Times', 'OFF / TO in UTC; LDG, ON, BLOCK, FLT plausible', '3.1'],
  ['Daylight', 'TO, LDG and ALTN landing reviewed; no unaccepted AFTER SUNSET / NIGHT', '3.1'],
  ['Cruise', 'Altitude, RPM, MAP selected; GS corrected for wind', '3.2'],
  ['Climb', 'Cruise altitude reached; TOC position plausible', '3.2'],
  ['Alternate', 'ALTN entered; distance and altitude verified', '3.2'],
  ['Fuel', 'Plan Block within 174 L usable; FOB not INSUFFICIENT', '3.2'],
  ['Mass & balance', 'Masses within limits; CG within envelope at take-off and both landings', '3.3'],
  ['Runways', 'Runway selected on every tab; TORA / TODA / LDA cross-checked with AIP and NOTAM', '3.4'],
  ['Performance', 'All margins positive; every Checks & Warnings item reviewed', '3.4'],
  ['Navlog', 'Totals equal Trip time and fuel; frequencies verified', '3.5'],
  ['Weather & NOTAM', 'Correct aerodrome and current issue in every box; SIGMET / AIRMET box not empty', '3.8'],
  ['Date / PIC', 'Flight date and PIC name entered', '3.8'],
  ['Documents', 'OFP and NAV-FLIGHTPLAN downloaded / printed; OFP signed', '4.2 / 4.3'],
];
A(`<table class="chk"><thead><tr><th>Item</th><th>Check</th><th>Ref.</th><th>&#10003;</th></tr></thead><tbody>${
  CHK.map(([a, b, c]) => `<tr><td class="ci">${esc(a)}</td><td>${esc(b)}</td><td class="cr"><a href="#s${c.split(' ')[0].replace('.', '-')}">${esc(c)}</a></td><td class="cb"></td></tr>`).join('')
}</tbody></table>`);
A('</section>');

/* ================================================================== INDICE */
/* Ogni voce e' un link interno: nel PDF Chromium lo trasforma in un
   collegamento alla pagina, e il libro sfogliabile lo rende cliccabile. */
function tocHTML(pages) {
  return `<section class="front toc-page"><h1 class="plain">Contents</h1><nav class="toc">${
    TOC.map((t) => `<a class="t${t.level}" href="#${t.id}"><span class="tn">${esc(t.num)}</span><span class="tt">${esc(t.title)}</span><span class="tl"></span><span class="tp">${pages ? pages[t.id] ?? '' : '00'}</span></a>`).join('')
  }</nav></section>`;
}

async function pagina(pages) {
  const css = (await readFile(path.join(DIR, 'manuale.css'), 'utf8')).split('@@FONT@@').join('../../data/manuale/fonts/');
  const body = parts.join('\n').replace('@@TOC@@', tocHTML(pages)).split('@@FIG@@').join('../../data/manuale/fig/');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(DOC.title)}</title><style>${css}</style></head><body>${body}</body></html>`;
}

/* ================================================================== BUILD */
/* Lo stesso testo, per il libro sfogliabile: manuale.html lo impagina da se'
   in pagine fatte per lo schermo. L'indice qui non ha numeri — dipendono da
   come il libro impagina su quel dispositivo — ma porta le voci, che il libro
   numera dopo aver impaginato. */
async function scriviLibro() {
  await mkdir(DATI, { recursive: true });
  const voci = esc(JSON.stringify(TOC.map(({ level, num, title, id }) => ({ level, num, title, id }))));
  const corpo = parts.join('\n')
    .replace('@@TOC@@', `<section class="toc-slot" id="toc" data-voci="${voci}"></section>`)
    .split('@@FIG@@').join('data/manuale/fig/');
  await writeFile(OUT_LIBRO, `<!-- Generato da tools/manuale.mjs: non modificare a mano. ${DOC.revision} · ${DOC.date} -->\n${corpo}\n`);
}

async function carica(nome) {
  try { return await import(nome); }
  catch {
    try { return createRequire(path.join(RADICE, 'x.js'))(nome); }
    catch {
      console.error(`Missing package "${nome}":  npm i --no-save puppeteer-core pdfjs-dist@3.11.174`);
      process.exit(1);
    }
  }
}

const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium';

async function stampa(browser, html) {
  await writeFile(TMP_HTML, html);
  const pg = await browser.newPage();
  await pg.goto('file://' + TMP_HTML, { waitUntil: 'networkidle0' });
  await pg.evaluateHandle('document.fonts.ready');
  const buf = await pg.pdf({ preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
  await pg.close();
  return Buffer.from(buf);
}

/* Su che pagina e' finito ogni titolo: lo dicono i collegamenti dell'indice
   stesso, che Chromium scrive come destinazioni nominate col nome dell'id. */
async function pagineDeiTitoli(pdfjs, buf) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), verbosity: 0 }).promise;
  const out = {};
  for (let n = 1; n <= doc.numPages; n++) {
    const pg = await doc.getPage(n);
    for (const a of await pg.getAnnotations()) {
      if (a.subtype !== 'Link' || !a.dest) continue;
      const dest = typeof a.dest === 'string' ? await doc.getDestination(a.dest) : a.dest;
      if (!dest) continue;
      const nome = typeof a.dest === 'string' ? a.dest : null;
      const idx = await doc.getPageIndex(dest[0]);
      if (nome) out[nome] = idx + 1;
    }
  }
  return { pages: out, numPages: doc.numPages };
}

async function main() {
  const pm = await carica('puppeteer-core'), puppeteer = pm.default || pm;
  const jm = await carica('pdfjs-dist/legacy/build/pdf.js'), pdfjs = jm.default || jm;
  const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  try {
    const prova = await stampa(browser, await pagina(null));
    const { pages } = await pagineDeiTitoli(pdfjs, prova);
    const mancano = TOC.filter((t) => !pages[t.id]).map((t) => t.id);
    if (mancano.length) throw new Error('No page found for: ' + mancano.join(', '));

    const pdf = await stampa(browser, await pagina(pages));
    const verifica = await pagineDeiTitoli(pdfjs, pdf);
    const spostati = TOC.filter((t) => verifica.pages[t.id] !== pages[t.id]).map((t) => t.id);
    if (spostati.length) throw new Error('Page numbers moved between passes: ' + spostati.join(', '));

    await writeFile(OUT_PDF, pdf);
    await scriviLibro();
    console.log(`data/manuale.pdf: ${verifica.numPages} pages, ${(pdf.length / 1024).toFixed(0)} kB · ${TOC.length} index entries`);
    console.log('data/manuale/libro.html: e-book content');
  } finally {
    await browser.close();
    await rm(TMP_HTML, { force: true });
  }
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
