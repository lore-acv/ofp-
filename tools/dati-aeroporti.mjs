#!/usr/bin/env node
/* ============================================================================
   PACCHETTO DATI AEROPORTI — da OurAirports ai JSON che serve l'app
   ============================================================================
   OurAirports pubblica quattro CSV che insieme fanno una ventina di megabyte.
   Farli scaricare al browser di chi apre l'app, in aeroclub, con la rete che
   c'e', e' la differenza fra una ricerca istantanea e mezzo minuto di attesa.

   Qui si scaricano una volta sola, al momento del deploy: si tengono l'Italia e
   i paesi confinanti, i soli campi che l'app usa davvero, e ne esce un JSON da
   qualche centinaio di kilobyte che il sito serve come file statico. Nessun
   server, nessuna CORS, e con il service worker funziona anche senza rete.

   Uso:
     node tools/dati-aeroporti.mjs                  scarica e costruisce
     node tools/dati-aeroporti.mjs --csv <cartella> usa CSV gia' scaricati
     PAESI=IT,CH,FR node tools/dati-aeroporti.mjs   cambia i paesi tenuti

   I dati sono di pubblico dominio (https://ourairports.com/data/).
   ========================================================================== */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

/* raw.githubusercontent serve lo stesso contenuto della copia su GitHub Pages
   ed e' raggiungibile anche dai runner di GitHub Actions. */
const BASE = 'https://raw.githubusercontent.com/davidmegginson/ourairports-data/main/';
const CSV  = ['airports.csv', 'runways.csv', 'airport-frequencies.csv', 'navaids.csv'];

/* L'Europa. Tenere solo Italia e confinanti farebbe un pacchetto da 82 kB
   invece di 189, ma poi un codice fuori lista costringerebbe il browser a
   scaricare i CSV interi — venti megabyte — per un aeroporto solo. A questo
   prezzo conviene averceli tutti dentro e non pensarci piu'.
   Si restringe o si allarga con la variabile PAESI. */
const PAESI = (process.env.PAESI ||
  'IT,CH,FR,AT,SI,DE,HR,SM,MC,VA,ES,PT,BE,NL,LU,GB,IE,CZ,SK,HU,PL,DK,GR,NO,SE,FI,' +
  'RS,BA,ME,MK,AL,BG,RO,LI,AD,MT,CY').split(',').map(s => s.trim());

/* Ordine di utilita' per un VFR che passa sopra un campo: prima chi da' il
   traffico, poi chi da' informazioni, per ultimi i servizi che non si chiamano
   in volo. Deve restare allineato a OA.FREQ_ORDER in index.html. */
const ORDINE_FREQ = ['TWR','AFIS','A/D','INFO','UNIC','UNICOM','CTAF','RDO','MULTICOM',
                     'APP','ARR','DEP','ATIS','GND','CLD','OPS'];

const FT_TO_M = 0.3048;

/* Parser CSV che rispetta i campi fra virgolette: i nomi degli aeroporti
   contengono virgole ("Milan, Malpensa") e uno split(',') secco disallineerebbe
   tutte le colonne successive. */
function parseCSV(text) {
  const rows = []; let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); field = ''; rows.push(row); row = []; }
      else if (c !== '\r') field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
function indicizza(rows) {
  const idx = {}; (rows[0] || []).forEach((h, i) => { idx[String(h).trim()] = i; });
  if (!rows.length) throw new Error('CSV vuoto: nessuna riga di intestazione');
  return { idx, righe: rows.slice(1) };
}

/* L'orientamento MAGNETICO viene dal designatore della pista, che per
   definizione ICAO e' la direzione magnetica arrotondata alla decina: e' il
   dato giusto per il vento, mentre le_heading_degT del CSV e' vero e
   richiederebbe la declinazione, che OurAirports non ha. */
function prua(ident) {
  const m = /^(\d{1,2})/.exec(String(ident).trim());
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return (n >= 1 && n <= 36) ? n * 10 : null;
}

/* Una VHF si scrive con due decimali, tre se e' una canalizzazione 8.33:
   122.60, 113.70, 126.425. "122.6" e' corretto in matematica e sbagliato in radio. */
const vhf = (mhz) => Number(mhz).toFixed(3).replace(/(\.\d\d)0$/, '$1');

async function prendi(nome, cartella) {
  if (cartella) return readFile(path.join(cartella, nome), 'utf8');
  const r = await fetch(BASE + nome);
  if (!r.ok) throw new Error(`${nome}: HTTP ${r.status}`);
  return r.text();
}

async function main() {
  const i = process.argv.indexOf('--csv');
  const cartella = i > -1 ? process.argv[i + 1] : null;
  console.log(cartella ? `CSV letti da ${cartella}` : `CSV scaricati da ${BASE}`);
  console.log('paesi tenuti:', PAESI.join(' '));

  const [aCsv, rCsv, fCsv, nCsv] = await Promise.all(CSV.map(n => prendi(n, cartella)));

  /* --- aeroporti ------------------------------------------------------- */
  const A = indicizza(parseCSV(aCsv));
  const tieni = new Set(PAESI);
  const aeroporti = {};
  let scartatiChiusi = 0;
  for (const r of A.righe) {
    const ident = (r[A.idx.ident] || '').toUpperCase();
    if (!/^[A-Z]{4}$/.test(ident)) continue;              // senza codice ICAO non si cerca
    if (!tieni.has(r[A.idx.iso_country])) continue;
    if (r[A.idx.type] === 'closed') { scartatiChiusi++; continue; }
    const elev = r[A.idx.elevation_ft];
    aeroporti[ident] = {
      icao: ident,
      name: r[A.idx.name] || '',
      municipality: r[A.idx.municipality] || '',
      lat: +parseFloat(r[A.idx.latitude_deg]).toFixed(5),
      lon: +parseFloat(r[A.idx.longitude_deg]).toFixed(5),
      elevFt: elev === '' ? null : parseFloat(elev),
      runways: []
    };
  }

  /* --- piste ------------------------------------------------------------ */
  const R = indicizza(parseCSV(rCsv));
  for (const r of R.righe) {
    const ap = (r[R.idx.airport_ident] || '').toUpperCase();
    const rec = aeroporti[ap];
    if (!rec || r[R.idx.closed] === '1') continue;
    const lenFt = parseFloat(r[R.idx.length_ft]);
    const lenM = isFinite(lenFt) ? Math.round(lenFt * FT_TO_M) : null;
    for (const lato of ['le', 'he']) {
      const ident = r[R.idx[lato + '_ident']];
      if (!ident) continue;
      const hT = r[R.idx[lato + '_heading_degT']];
      rec.runways.push({
        ident, lenM,
        surface: r[R.idx.surface] || '',
        hdgMag: prua(ident),
        hdgTrue: hT === '' ? null : parseFloat(hT)
      });
    }
  }
  for (const rec of Object.values(aeroporti)) {
    rec.runways.sort((a, b) => (b.lenM || 0) - (a.lenM || 0) || a.ident.localeCompare(b.ident));
  }

  /* --- frequenze: una sola per aeroporto, la piu' utile ----------------- */
  const F = indicizza(parseCSV(fCsv));
  const freq = {};
  const rango = {};
  for (const r of F.righe) {
    const ap = (r[F.idx.airport_ident] || '').toUpperCase();
    if (!aeroporti[ap]) continue;
    const mhz = parseFloat(r[F.idx.frequency_mhz]);
    if (!isFinite(mhz) || mhz <= 0) continue;
    const tipo = (r[F.idx.type] || '').toUpperCase();
    let k = ORDINE_FREQ.indexOf(tipo); if (k < 0) k = 99;
    if (freq[ap] === undefined || k < rango[ap]) {
      freq[ap] = { freq: vhf(mhz), type: tipo, desc: r[F.idx.description] || '' };
      rango[ap] = k;
    }
  }

  /* --- radioassistenze -------------------------------------------------- */
  const N = indicizza(parseCSV(nCsv));
  const navaids = {};
  for (const r of N.righe) {
    if (!tieni.has(r[N.idx.iso_country])) continue;
    const id = (r[N.idx.ident] || '').toUpperCase();
    if (!/^[A-Z0-9]{2,5}$/.test(id) || navaids[id]) continue;
    const khz = parseFloat(r[N.idx.frequency_khz]);
    if (!isFinite(khz) || khz <= 0) continue;
    navaids[id] = {
      freq: khz >= 30000 ? vhf(khz / 1000) : String(+khz.toFixed(1)),
      type: (r[N.idx.type] || '').toUpperCase(),
      desc: r[N.idx.name] || ''
    };
  }

  const pacchetto = {
    generato: new Date().toISOString().slice(0, 10),
    fonte: 'OurAirports — https://ourairports.com/data/ — pubblico dominio',
    paesi: PAESI,
    aeroporti, freq, navaids
  };

  const dir = path.join(process.cwd(), 'data');
  await mkdir(dir, { recursive: true });
  const json = JSON.stringify(pacchetto);
  await writeFile(path.join(dir, 'aeroporti.json'), json);

  const kb = (n) => (n / 1024).toFixed(0) + ' kB';
  console.log(`aeroporti: ${Object.keys(aeroporti).length}  (scartati ${scartatiChiusi} chiusi)`);
  console.log(`frequenze: ${Object.keys(freq).length}   radioassistenze: ${Object.keys(navaids).length}`);
  console.log(`data/aeroporti.json: ${kb(json.length)}  (${kb(gzipSync(json).length)} compresso, che e' quello che viaggia)`);
}

main().catch(e => { console.error('ERRORE:', e.message); process.exit(1); });
