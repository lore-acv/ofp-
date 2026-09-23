#!/usr/bin/env node
/* ============================================================================
   GUIDA ALL'USO — costruisce data/guida.pdf
   ============================================================================
   La guida che si apre dal pulsante "Come si usa" nella pagina di apertura.
   Non si scarica e non apre una scheda: resta sopra la pagina, disegnata su
   tela da pdf.js, perche' su iPad un PDF dentro un iframe Safari non lo mostra.

   Le schermate in tools/guida/ vengono dall'applicazione vera, con il volo
   vero di un NavLog ForeFlight e di uno Skybrief: una guida con schermate
   finte invecchia il giorno dopo e si vede.

   Per rigenerarla serve jsPDF, che non e' fra le dipendenze del sito (il
   deploy non costruisce questo file, lo trova gia' pronto nel repo):

     npm i jspdf && node tools/guida.mjs

   ========================================================================== */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const RADICE = process.cwd();
const IMG = path.join(RADICE, 'tools', 'guida');

let jsPDF;
try {
  ({ jsPDF } = await import('jspdf'));
} catch {
  console.error('jsPDF is required to build the guide:  npm i jspdf');
  console.error("The ready-made PDF is in data/guida.pdf: if you are not changing it, there is no need to rebuild.");
  process.exit(1);
}

/* A4, margini larghi: si legge su un telefono tenuto in mano. */
const W = 210, H = 297, M = 18;
const COL = W - 2 * M;
const BLU = [47, 109, 246], SCURO = [17, 24, 33], GRIGIO = [110, 125, 140];

const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
let y = M;
let pagina = 1;

const nuovaPagina = () => { doc.addPage(); pagina++; y = M; };
const spazio = (h) => { if (y + h > H - M - 8) nuovaPagina(); };

function titolo(t, size = 15) {
  spazio(size / 2 + 8);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(size);
  doc.setTextColor(...SCURO);
  doc.text(t, M, y + size / 3);
  y += size / 2 + 4;
}
function sezione(n, t) {
  spazio(14);
  doc.setFillColor(...BLU);
  doc.circle(M + 2.6, y + 1.4, 2.6, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(255, 255, 255);
  doc.text(String(n), M + 2.6, y + 2.5, { align: 'center' });
  doc.setFontSize(12.5); doc.setTextColor(...SCURO);
  doc.text(t, M + 8, y + 2.8);
  y += 9;
}
function testo(t, size = 9.6) {
  doc.setFont('helvetica', 'normal'); doc.setFontSize(size); doc.setTextColor(...SCURO);
  const righe = doc.splitTextToSize(t, COL);
  righe.forEach(r => { spazio(5); doc.text(r, M, y + 3.2); y += size * 0.52; });
  y += 2.4;
}
function nota(t) {
  doc.setFont('helvetica', 'italic'); doc.setFontSize(8.6); doc.setTextColor(...GRIGIO);
  doc.splitTextToSize(t, COL).forEach(r => { spazio(4.5); doc.text(r, M, y + 3); y += 4.3; });
  y += 2;
  doc.setTextColor(...SCURO);
}

/* L'immagine entra nella colonna e, se e' alta, in quello che resta di pagina:
   una schermata tagliata a meta' non spiega niente. */
async function figura(file, didascalia, largMax = COL) {
  const dati = await readFile(path.join(IMG, file));
  const b64 = 'data:image/jpeg;base64,' + dati.toString('base64');
  const p = doc.getImageProperties(b64);
  let w = largMax, h = w * p.height / p.width;
  const disponibile = H - M - 12 - y;
  if (h > disponibile) {
    if (disponibile < 60) { nuovaPagina(); }
    const max = H - M - 12 - y;
    if (h > max) { h = max; w = h * p.width / p.height; }
  }
  const x = M + (COL - w) / 2;
  doc.setDrawColor(210, 216, 222); doc.setLineWidth(0.2);
  doc.addImage(b64, 'JPEG', x, y, w, h);
  doc.rect(x, y, w, h);
  y += h + 2.6;
  if (didascalia) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...GRIGIO);
    doc.splitTextToSize(didascalia, COL).forEach(r => { doc.text(r, M + COL / 2, y, { align: 'center' }); y += 3.6; });
    doc.setTextColor(...SCURO);
  }
  y += 4;
}

async function main() {
  /* ---------------- copertina ---------------- */
  doc.setFillColor(15, 23, 32); doc.rect(0, 0, W, 52, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(23); doc.setTextColor(255, 255, 255);
  doc.text('How To Use', M, 26);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(150, 170, 190);
  doc.text('OFP and NAV-FLIGHTPLAN — Cessna C172 FR', M, 36);
  doc.setFontSize(8.5);
  doc.text('Quick guide', M, 44);
  y = 62;

  titolo('What this programme does');
  testo('It takes the NavLog you have already prepared in ForeFlight and the weather briefing you have already '
      + 'downloaded, and produces two documents ready to take flying: the OFP, i.e. the operational flight plan '
      + 'with fuel, masses, balance, runway distances, weather and NOTAMs, and the A5 NAV-FLIGHTPLAN to hold in '
      + 'the cockpit.');
  testo('What it does not do: it does not navigate, it does not decide, and it does not replace your judgement. '
      + 'It computes from the Reims Rocket FR172J Flight Manual data and from what you give it, and shows you '
      + 'everything it used to get there, so you can check it.');

  titolo('The two documents to load', 13);
  testo('These two are what you need. Prepare them first, then almost everything else is automatic.');
  const met = 0.48 * COL;
  {
    const a = await readFile(path.join(IMG, 'in-navlog.jpg'));
    const b = await readFile(path.join(IMG, 'in-skybrief.jpg'));
    const b64a = 'data:image/jpeg;base64,' + a.toString('base64');
    const b64b = 'data:image/jpeg;base64,' + b.toString('base64');
    const pa = doc.getImageProperties(b64a), pb = doc.getImageProperties(b64b);
    const ha = met * pa.height / pa.width, hb = met * pb.height / pb.width;
    const hmax = Math.min(Math.max(ha, hb), H - M - 24 - y);
    const wa = hmax * pa.width / pa.height, wb = hmax * pb.width / pb.height;
    doc.setDrawColor(210, 216, 222); doc.setLineWidth(0.2);
    doc.addImage(b64a, 'JPEG', M, y, wa, hmax); doc.rect(M, y, wa, hmax);
    doc.addImage(b64b, 'JPEG', M + COL - wb, y, wb, hmax); doc.rect(M + COL - wb, y, wb, hmax);
    y += hmax + 3.4;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.6); doc.setTextColor(...SCURO);
    doc.text('ForeFlight NavLog', M + wa / 2, y, { align: 'center' });
    doc.text('Weather briefing (Skybrief)', M + COL - wb / 2, y, { align: 'center' });
    y += 4;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...GRIGIO);
    doc.text(doc.splitTextToSize('From here: airports, waypoints, headings and distances.', wa), M + wa / 2, y, { align: 'center' });
    doc.text(doc.splitTextToSize('From here: METAR, TAF, NOTAM, SIGMET and charts.', wb), M + COL - wb / 2, y, { align: 'center' });
    doc.setTextColor(...SCURO);
  }

  /* ---------------- 1. import ---------------- */
  nuovaPagina();
  sezione(1, 'Load the two files');
  testo('This is the page that opens first. Drag or select the two PDFs. Load the NavLog first if you can: '
      + 'from it the programme learns the ICAO codes of the route, and with those it then sorts the weather '
      + 'reports onto the right airport.');
  testo('Once both have been read, the Continue button lights up. If a file is missing or cannot be read, you '
      + 'can proceed anyway and enter the data by hand.');
  await figura('01-import.jpg', 'Import completed: 11 waypoints, 94 nm, 51 minutes from the NavLog; four airports from the briefing.');

  /* ---------------- 2. volo ---------------- */
  nuovaPagina();
  sezione(2, 'Flight and aircraft');
  testo('Airports and route arrive already filled in. Here you check them and enter the times: off-blocks and '
      + 'takeoff are enough, the other two are proposed automatically — landing is takeoff plus the computed '
      + 'flight time, and on-blocks is landing plus the same taxi time used at departure. '
      + 'The proposed time stays editable: as soon as you set it by hand it stops updating.');
  testo('If the route passes an intermediate airport, the programme recognises it and offers the Touch & Go. '
      + 'Ticking it gives that aerodrome its own weather and NOTAM boxes and its own runway calculations — two '
      + 'of them, because a T&G is a landing followed by a takeoff.');
  await figura('02-volo.jpg', 'The Flight step with the Touch & Go recognised at LILE, along the route.');

  /* ---------------- 3. rotta e fuel ---------------- */
  nuovaPagina();
  sezione(3, 'Route and Fuel');
  testo('Here you choose the cruise altitude and the power setting. The MAP and RPM combinations offered are '
      + 'only those published by the POH at that altitude: select one and the Trip speed and fuel flow are '
      + 'filled in automatically with the values of that row.');
  testo('All fuel is in litres. The Trip is split in two: the climb minutes carry the fuel flow of fig. 5-6 '
      + '(start-up and takeoff included), the rest goes to the cruise fuel flow. Reserves, alternate and taxi '
      + 'are computed automatically; taxi is the engine-running ground time derived from the times.');
  await figura('03-rotta.jpg', 'The power setting: only the combinations the POH publishes at that altitude.');
  nota('If the RPM and MAP drop-downs are greyed out, the cruise altitude is missing: they depend on it.');

  /* ---------------- 4. M&B e prestazioni ---------------- */
  nuovaPagina();
  sezione(4, 'Mass & Balance and Performance');
  testo('In Mass & Balance you enter only occupants and baggage: fuel comes from the previous step. '
      + 'The programme computes masses, arms and moments and checks the CG envelope at takeoff and at '
      + 'both landings.');
  testo('In Performance the runway must be selected, for each airport: none is pre-selected, because the runway '
      + 'is decided by the wind of the day, not by its length. Once chosen, heading, TORA, TODA and LDA follow, '
      + 'and the distances are compared with the declared ones.');
  await figura('04-perf.jpg', 'One airport per card: pressure and density altitude, wind components, and the two distances with their margin.');
  nota('Wind, QNH and temperature come from that airport\'s METAR. If an aerodrome has none, the card says so '
     + 'and offers the nearest station with one, within thirty miles.');

  /* ---------------- 5. navlog ---------------- */
  nuovaPagina();
  sezione(5, 'Navlog');
  testo('The legs come from the ForeFlight NavLog: checkpoints, magnetic track and distances. The cruise '
      + 'altitude is applied to every waypoint automatically and stays editable waypoint by waypoint. '
      + 'Frequencies for airports and navaids are looked up automatically when the checkpoint is recognised.');
  testo('Times and fuel figures are not copied from ForeFlight: they are recomputed with the selected speed and '
      + 'power setting, so the navplan and the fuel plan cannot tell two different stories. '
      + 'Callsigns and remarks are typed here and stay.');
  await figura('05-navlog.jpg', 'The legs table. EET is the time for the single leg, ETO the minutes of the estimated time over.');

  /* ---------------- 6. i documenti ---------------- */
  nuovaPagina();
  sezione(6, 'The two documents');
  testo('They are downloaded from the menu at the top right. They are two separate documents, with two separate '
      + 'buttons: the A4 OFP and the A5 NAV-FLIGHTPLAN. The navlog never forms part of the OFP.');
  {
    const a = await readFile(path.join(IMG, '06-ofp.jpg'));
    const b = await readFile(path.join(IMG, '07-navlog.jpg'));
    const b64a = 'data:image/jpeg;base64,' + a.toString('base64');
    const b64b = 'data:image/jpeg;base64,' + b.toString('base64');
    const pa = doc.getImageProperties(b64a), pb = doc.getImageProperties(b64b);
    const h = Math.min(H - M - 34 - y, 150);
    const wa = h * pa.width / pa.height, wb = h * pb.width / pb.height;
    doc.setDrawColor(210, 216, 222); doc.setLineWidth(0.2);
    doc.addImage(b64a, 'JPEG', M, y, wa, h); doc.rect(M, y, wa, h);
    doc.addImage(b64b, 'JPEG', M + COL - wb, y, wb, h); doc.rect(M + COL - wb, y, wb, h);
    y += h + 3.4;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.6);
    doc.text('OFP — A4', M + wa / 2, y, { align: 'center' });
    doc.text('NAV-FLIGHTPLAN — A5', M + COL - wb / 2, y, { align: 'center' });
    y += 6;
  }
  testo('"Print OFP" sends to the printer the same PDF that is downloaded: the document that comes out of the '
      + 'printer is identical to the one saved.');

  /* ---------------- 7. avvertenze ---------------- */
  nuovaPagina();
  titolo('Points to bear in mind');
  testo('The Flight Manual data are those of the Reims Rocket FR172J and the masses are those of I-CCAF. '
      + 'On any other aeroplane the figures would not be approximate: they would be wrong.');
  testo('OurAirports publishes the physical length of the runway, not the declared distances TORA, TODA and LDA, '
      + 'which are only in the AIP. The fields are pre-filled with the physical length: on a runway with a '
      + 'stopway, clearway or displaced threshold they must be corrected by hand.');
  testo('The AFM landing table is published at 1157 kg only and is used whatever the mass: at lower masses the '
      + 'result is conservative, i.e. the actual distances are shorter.');
  testo('Saved flights stay in the browser of this device: they are not visible from others and are lost if the '
      + 'site data is cleared.');
  y += 4;
  doc.setDrawColor(...BLU); doc.setLineWidth(0.6);
  doc.line(M, y, M + COL, y); y += 6;
  doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...SCURO);
  doc.text('The document is an aid to planning. Responsibility for the flight remains with the pilot in command.', M, y, { maxWidth: COL });

  /* ---------------- pie' di pagina ---------------- */
  const tot = doc.getNumberOfPages();
  for (let i = 1; i <= tot; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7.6); doc.setTextColor(...GRIGIO);
    doc.text('OFP C172 FR — how to use', M, H - 10);
    doc.text(`${i} / ${tot}`, W - M, H - 10, { align: 'right' });
  }

  const dir = path.join(RADICE, 'data');
  await mkdir(dir, { recursive: true });
  const out = path.join(dir, 'guida.pdf');
  await writeFile(out, Buffer.from(doc.output('arraybuffer')));
  console.log(`data/guida.pdf: ${tot} pages, ${(Buffer.from(doc.output('arraybuffer')).length / 1024).toFixed(0)} kB`);
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
