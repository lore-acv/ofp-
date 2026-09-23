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
  console.error('Serve jsPDF per costruire la guida:  npm i jspdf');
  console.error("Il PDF già pronto sta in data/guida.pdf: se non lo stai cambiando, non serve rigenerarlo.");
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
  doc.text('Come si usa', M, 26);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(150, 170, 190);
  doc.text('OFP e NAV-FLIGHTPLAN — Cessna C172 FR', M, 36);
  doc.setFontSize(8.5);
  doc.text('Guida rapida', M, 44);
  y = 62;

  titolo('Che cosa fa questo programma');
  testo('Prende il NavLog che hai già preparato in ForeFlight e il briefing meteo che hai già scaricato, '
      + 'e ne ricava due documenti pronti da portare in volo: l\'OFP, cioè il foglio operativo con carburante, '
      + 'masse, centraggio, distanze di pista, meteo e NOTAM, e il NAV-FLIGHTPLAN in A5 da tenere in mano in cabina.');
  testo('Quello che non fa: non naviga, non decide e non sostituisce il tuo giudizio. Calcola con i dati del '
      + 'Flight Manual della Reims Rocket FR172J e con quello che gli dai, e ti mostra tutto quello che ha usato '
      + 'per arrivarci, così puoi controllarlo.');

  titolo('I due documenti da caricare', 13);
  testo('Servono questi due. Preparali prima, poi il resto è quasi tutto automatico.');
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
    doc.text('NavLog ForeFlight', M + wa / 2, y, { align: 'center' });
    doc.text('Briefing meteo (Skybrief)', M + COL - wb / 2, y, { align: 'center' });
    y += 4;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...GRIGIO);
    doc.text(doc.splitTextToSize('Da qui: aeroporti, waypoint, prue e distanze.', wa), M + wa / 2, y, { align: 'center' });
    doc.text(doc.splitTextToSize('Da qui: METAR, TAF, NOTAM, SIGMET e cartine.', wb), M + COL - wb / 2, y, { align: 'center' });
    doc.setTextColor(...SCURO);
  }

  /* ---------------- 1. import ---------------- */
  nuovaPagina();
  sezione(1, 'Carica i due file');
  testo('È la pagina che si apre per prima. Trascina o scegli i due PDF. Carica prima il NavLog, se puoi: '
      + 'da quello il programma impara i codici ICAO della rotta, e con quelli smista poi i bollettini meteo '
      + 'sull\'aeroporto giusto.');
  testo('Quando tutti e due sono stati letti il pulsante Continua si accende. Se un file manca o non si riesce '
      + 'a leggere si può proseguire lo stesso e compilare a mano.');
  await figura('01-import.jpg', 'Import riuscito: 11 punti, 94 nm, 51 minuti dal NavLog; quattro aeroporti dal briefing.');

  /* ---------------- 2. volo ---------------- */
  nuovaPagina();
  sezione(2, 'Volo e aeromobile');
  testo('Aeroporti e rotta arrivano già compilati. Qui si controllano e si mettono gli orari: basta il '
      + 'fuori blocchi e il decollo, gli altri due si propongono da soli — l\'atterraggio è il decollo più il '
      + 'tempo di volo calcolato, e il dentro blocchi è l\'atterraggio più lo stesso rullaggio fatto in partenza. '
      + 'L\'orario proposto resta modificabile: appena lo scegli a mano smette di aggiornarsi.');
  testo('Se la rotta passa da un aeroporto intermedio, il programma lo riconosce e propone il Touch & Go. '
      + 'Spuntandolo, quel campo ottiene le sue caselle di meteo e NOTAM e i suoi calcoli di pista — due, '
      + 'perché un T&G è un atterraggio seguito da un decollo.');
  await figura('02-volo.jpg', 'La scheda Volo con il Touch & Go riconosciuto su LILE, lungo la rotta.');

  /* ---------------- 3. rotta e fuel ---------------- */
  nuovaPagina();
  sezione(3, 'Rotta e Fuel');
  testo('Qui si sceglie la quota di crociera e il settaggio di potenza. Le combinazioni di MAP e RPM proposte '
      + 'sono solo quelle pubblicate dal POH a quella quota: scegliendone una, velocità e consumo del Trip si '
      + 'compilano da soli con i valori di quella riga.');
  testo('Il carburante è tutto in litri. Il Trip è diviso in due: i minuti di salita valgono il consumo della '
      + 'fig. 5-6 (avviamento e decollo compresi), il resto va al consumo di crociera. Riserve, alternato e taxi '
      + 'si calcolano da soli; il taxi è il tempo a terra col motore acceso che risulta dagli orari.');
  await figura('03-rotta.jpg', 'Il settaggio di potenza: solo le combinazioni che il POH pubblica a quella quota.');
  nota('Se le tendine di RPM e MAP sono spente, manca la quota di crociera: è da quella che dipendono.');

  /* ---------------- 4. M&B e prestazioni ---------------- */
  nuovaPagina();
  sezione(4, 'Mass & Balance e Performance');
  testo('Nel Mass & Balance si inseriscono solo occupanti e bagaglio: il carburante arriva dal passo prima. '
      + 'Il programma calcola masse, bracci e momenti e verifica l\'inviluppo di centraggio al decollo e a '
      + 'entrambi gli atterraggi.');
  testo('In Performance va scelta la pista, per ogni aeroporto: nessuna è preselezionata, perché la pista la '
      + 'decide il vento del giorno, non la lunghezza. Scelta quella, arrivano orientamento, TORA, TODA e LDA, '
      + 'e le distanze vengono confrontate con quelle dichiarate.');
  await figura('04-perf.jpg', 'Un aeroporto per riquadro: quota di pressione e densità, vento scomposto, e le due distanze con il margine.');
  nota('Vento, QNH e temperatura vengono dal METAR di quell\'aeroporto. Se un campo il METAR non ce l\'ha, il '
     + 'riquadro lo dice e propone la stazione attrezzata più vicina, entro trenta miglia.');

  /* ---------------- 5. navlog ---------------- */
  nuovaPagina();
  sezione(5, 'Navlog');
  testo('Le tratte arrivano dal NavLog di ForeFlight: checkpoint, prua magnetica e distanze. La quota di '
      + 'crociera si mette da sola su ogni punto e resta modificabile punto per punto. Le frequenze di aeroporti '
      + 'e radioassistenze si cercano da sole quando il checkpoint è riconosciuto.');
  testo('Tempi e consumi non vengono ricopiati da ForeFlight: si ricalcolano con la velocità e il settaggio di '
      + 'potenza scelti, così il navplan e il piano carburante non possono raccontare due storie diverse. '
      + 'Nominativi e note si scrivono qui e restano.');
  await figura('05-navlog.jpg', 'La tabella delle tratte. EET è il tempo della singola tratta, ETO i minuti dell\'ora stimata.');

  /* ---------------- 6. i documenti ---------------- */
  nuovaPagina();
  sezione(6, 'I due documenti');
  testo('Dal menu in alto a destra si scaricano. Sono due documenti distinti, con due pulsanti distinti: '
      + 'l\'OFP in A4 e il NAV-FLIGHTPLAN in A5. Il navlog non entra mai nell\'OFP.');
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
  testo('"Stampa OFP" manda alla stampante lo stesso PDF che si scarica: il documento che esce dalla stampante '
      + 'è identico a quello salvato.');

  /* ---------------- 7. avvertenze ---------------- */
  nuovaPagina();
  titolo('Da tenere a mente');
  testo('I dati del Flight Manual sono quelli della Reims Rocket FR172J e le masse sono quelle di I-CCAF. '
      + 'Su un altro aeroplano i numeri non sarebbero approssimati: sarebbero sbagliati.');
  testo('OurAirports pubblica la lunghezza fisica della pista, non le distanze dichiarate TORA, TODA e LDA, che '
      + 'stanno solo nell\'AIP. I campi vengono precompilati con la lunghezza fisica: su una pista con stopway, '
      + 'clearway o soglia spostata vanno corretti a mano.');
  testo('La tabella di atterraggio dell\'AFM è pubblicata solo a 1157 kg e viene usata a qualunque massa: a '
      + 'masse inferiori il risultato è conservativo, cioè le distanze reali sono più corte.');
  testo('I voli salvati restano nel browser di questo dispositivo: non si vedono dagli altri e si perdono '
      + 'svuotando i dati del sito.');
  y += 4;
  doc.setDrawColor(...BLU); doc.setLineWidth(0.6);
  doc.line(M, y, M + COL, y); y += 6;
  doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...SCURO);
  doc.text('Il documento aiuta a pianificare. La responsabilità del volo resta del comandante.', M, y, { maxWidth: COL });

  /* ---------------- pie' di pagina ---------------- */
  const tot = doc.getNumberOfPages();
  for (let i = 1; i <= tot; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7.6); doc.setTextColor(...GRIGIO);
    doc.text('OFP C172 FR — come si usa', M, H - 10);
    doc.text(`${i} / ${tot}`, W - M, H - 10, { align: 'right' });
  }

  const dir = path.join(RADICE, 'data');
  await mkdir(dir, { recursive: true });
  const out = path.join(dir, 'guida.pdf');
  await writeFile(out, Buffer.from(doc.output('arraybuffer')));
  console.log(`data/guida.pdf: ${tot} pagine, ${(Buffer.from(doc.output('arraybuffer')).length / 1024).toFixed(0)} kB`);
}

main().catch(e => { console.error('ERRORE:', e.message); process.exit(1); });
