/**
 * OFP GENERATOR — CESSNA C172 FR (Reims Rocket FR172J)
 * Lato server della web app Google Apps Script.
 *
 * L'interfaccia sta tutta in index.html, che è scritto per funzionare sia servito
 * da qui sia aperto direttamente in un browser: rileva da solo la presenza di
 * google.script.run e, se manca, ripiega su localStorage. Questo file aggiunge
 * quello che il browser da solo non può dare:
 *
 *   - i voli salvati nelle UserProperties dell'utente Google, quindi persistenti
 *     fra dispositivi e privati per ciascun pilota;
 *   - l'archiviazione dell'OFP su Google Drive.
 *
 * Deploy: vedi README.md.
 */

/** Cartella di Drive in cui finiscono gli OFP generati (creata al primo uso). */
var DRIVE_FOLDER_NAME = 'OFP C172 FR';

/** Chiave delle UserProperties. */
var FLIGHTS_KEY = 'saved_flights';

/**
 * UserProperties ha un limite di 9 kB per singola proprietà, che una lista di voli
 * con METAR, TAF e NOTAM supera facilmente. Il JSON viene quindi spezzato in blocchi
 * numerati (saved_flights_0, _1, ...) e ricomposto in lettura.
 */
var CHUNK_SIZE = 8000;

/**
 * L'applicazione ha due pagine: import.html (apertura) e index.html (foglio di
 * volo). Sotto Apps Script sono lo stesso web app distinto da un parametro:
 *   <url>            -> pagina di import
 *   <url>?page=ofp   -> foglio di volo
 *
 * Apps Script non serve file .js e .css: i tag <script src="ofp-core.js"> e
 * <link href="ofp.css"> vengono sostituiti al volo con il contenuto dei file
 * `core` e `styles` del progetto. Cosi' le pagine restano identiche a quelle che
 * funzionano aperte direttamente in un browser, senza doppioni da mantenere.
 */
function doGet(e) {
  var page = (e && e.parameter && e.parameter.page === 'ofp') ? 'index' : 'import';
  var html = HtmlService.createHtmlOutputFromFile(page).getContent();

  html = inject_(html, '<script src="ofp-core.js"></script>', wrapped_('core', 'script'));
  html = inject_(html, '<link rel="stylesheet" href="ofp.css">',  wrapped_('styles', 'style'));

  return HtmlService.createHtmlOutput(html)
    .setTitle(page === 'index' ? 'OFP \u2014 Cessna C172 FR' : 'OFP \u2014 Import dati di volo')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Sostituisce `needle` con `replacement` senza che i `$` del testo iniettato
 * vengano interpretati.
 *
 * String.replace tratta $&, $`, $', $1... nella stringa di sostituzione come
 * riferimenti al testo trovato: il codice iniettato contiene un `'\\$&'`
 * (escape di metacaratteri regex) e quello faceva reinserire il tag cercato,
 * `</script>` compreso, in mezzo al JavaScript. Risultato: script chiuso a
 * meta', HTML sbilanciato, "Contenuti HTML non corretti".
 *
 * Passando una funzione come secondo argomento il valore di ritorno viene
 * usato alla lettera, quindi il problema non si pone.
 */
function inject_(html, needle, replacement) {
  if (html.indexOf(needle) === -1) {
    throw new Error('Segnaposto non trovato nella pagina: ' + needle);
  }
  return html.replace(needle, function () { return replacement; });
}

/**
 * Contenuto grezzo di un file del progetto.
 *
 * NON si usa createHtmlOutputFromFile(): quella convalida il contenuto come
 * HTML, e il nucleo e' JavaScript puro. Basta un `<` seguito da una lettera —
 * `i+1<starts.length` — perche' il validatore ci legga l'inizio di un tag
 * <starts.length ...> mai chiuso e rifiuti il file con "Contenuti HTML non
 * corretti". getRawContent() restituisce il file com'e', senza convalida.
 *
 * Il fallback serve solo se quella via non fosse disponibile: in quel caso il
 * file deve essere avvolto nei suoi tag (vedi wrapped_ e il README).
 */
function fileContent_(name) {
  try {
    return HtmlService.createTemplateFromFile(name).getRawContent();
  } catch (e) {
    return HtmlService.createHtmlOutputFromFile(name).getContent();
  }
}

/**
 * Il contenuto di un file gia' avvolto nel suo tag. Se i tag ci sono gia' —
 * perche' sono stati incollati a mano nel file di Apps Script — non si
 * raddoppiano: un <script> dentro un altro <script> spezzerebbe la pagina.
 */
function wrapped_(name, tag) {
  var content = fileContent_(name);
  var already = new RegExp('^\\s*<' + tag + '\\b', 'i');
  return already.test(content) ? content : '<' + tag + '>' + content + '</' + tag + '>';
}

/** URL del web app: serve alle pagine per costruire i link fra loro. */
function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

/**
 * Restituisce i voli dell'utente come stringa JSON (stringa, non oggetto: così il
 * client la parsa una volta sola e non paga la serializzazione automatica di
 * strutture annidate profonde).
 * @return {string} JSON di un array di voli; '[]' se non ce ne sono.
 */
function loadFlights() {
  var props = PropertiesService.getUserProperties();
  var count = parseInt(props.getProperty(FLIGHTS_KEY + '_chunks'), 10);
  if (!count || isNaN(count)) {
    // formato non spezzato (versioni precedenti o payload piccolo)
    return props.getProperty(FLIGHTS_KEY) || '[]';
  }
  var parts = [];
  for (var i = 0; i < count; i++) {
    parts.push(props.getProperty(FLIGHTS_KEY + '_' + i) || '');
  }
  return parts.join('') || '[]';
}

/**
 * Salva i voli dell'utente.
 * @param {string} json JSON di un array di voli, già serializzato dal client.
 * @return {number} numero di voli salvati.
 */
function saveFlights(json) {
  if (typeof json !== 'string') {
    throw new Error('saveFlights vuole una stringa JSON.');
  }
  var list;
  try {
    list = JSON.parse(json);
  } catch (e) {
    throw new Error('JSON non valido: ' + e.message);
  }
  if (!Array.isArray(list)) {
    throw new Error('Il payload deve essere un array di voli.');
  }

  var props = PropertiesService.getUserProperties();
  clearFlightChunks_(props);

  var chunks = [];
  for (var i = 0; i < json.length; i += CHUNK_SIZE) {
    chunks.push(json.substring(i, i + CHUNK_SIZE));
  }
  var toWrite = { };
  toWrite[FLIGHTS_KEY + '_chunks'] = String(chunks.length);
  for (var c = 0; c < chunks.length; c++) {
    toWrite[FLIGHTS_KEY + '_' + c] = chunks[c];
  }
  props.setProperties(toWrite);
  return list.length;
}

/** Rimuove i blocchi di un salvataggio precedente, così non restano code orfane. */
function clearFlightChunks_(props) {
  var prev = parseInt(props.getProperty(FLIGHTS_KEY + '_chunks'), 10);
  if (prev && !isNaN(prev)) {
    for (var i = 0; i < prev; i++) {
      props.deleteProperty(FLIGHTS_KEY + '_' + i);
    }
  }
  props.deleteProperty(FLIGHTS_KEY);       // eventuale valore in formato vecchio
  props.deleteProperty(FLIGHTS_KEY + '_chunks');
}

/**
 * Archivia su Drive il PDF generato dal client.
 * @param {string} base64 Contenuto del PDF codificato in base64 (senza il prefisso data:).
 * @param {string} filename Nome del file, es. "OFP_LILN-LIMC_08092026.pdf".
 * @return {string} URL del file su Drive.
 */
function saveOfpToDrive(base64, filename) {
  if (!base64) throw new Error('PDF mancante.');
  var name = (filename || 'OFP.pdf').replace(/[\/\\:*?"<>|]/g, '_');
  var blob = Utilities.newBlob(Utilities.base64Decode(base64), 'application/pdf', name);
  var file = getOfpFolder_().createFile(blob);
  return file.getUrl();
}

/** Cartella di destinazione, creata la prima volta e riusata poi. */
function getOfpFolder_() {
  var it = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

/* ===================== OURAIRPORTS =====================
 * Il client puo' scaricare i CSV da solo, ma farlo dal server e' meglio: la cache
 * e' condivisa fra tutti i piloti invece che per browser, non si consuma la rete
 * del telefono e non ci si affida agli header CORS di un servizio di terzi.
 *
 * airports.csv pesa una decina di MB: si scarica al massimo una volta ogni sei ore
 * (CacheService), e il record dei singoli aeroporti resta poi nelle ScriptProperties
 * a tempo indefinito, perche' coordinate ed elevazioni non cambiano.
 */
var OA_BASE = 'https://davidmegginson.github.io/ourairports-data/';
var OA_PROP_PREFIX = 'oa_';

/**
 * @param {string} codesCsv Codici ICAO separati da virgola, es. "LILN,LIMC".
 * @return {string} JSON {ICAO: record}. I codici non trovati semplicemente mancano.
 */
function lookupAirports(codesCsv) {
  var codes = String(codesCsv || '').toUpperCase().split(',')
      .map(function (c) { return c.trim(); })
      .filter(function (c) { return /^[A-Z]{4}$/.test(c); });
  if (!codes.length) return '{}';

  var props = PropertiesService.getScriptProperties();
  var out = {}, missing = [];
  codes.forEach(function (c) {
    var v = props.getProperty(OA_PROP_PREFIX + c);
    if (v) { try { out[c] = JSON.parse(v); } catch (e) { missing.push(c); } }
    else missing.push(c);
  });
  if (!missing.length) return JSON.stringify(out);

  var airports = oaFetch_('airports.csv');
  var runways  = oaFetch_('runways.csv');
  var recs = oaBuild_(airports, runways, missing);

  var toStore = {};
  Object.keys(recs).forEach(function (k) {
    out[k] = recs[k];
    toStore[OA_PROP_PREFIX + k] = JSON.stringify(recs[k]);
  });
  if (Object.keys(toStore).length) props.setProperties(toStore);
  return JSON.stringify(out);
}

/* ---------------------------------------------------------------------------
 * FREQUENZE — aeroporti (airport-frequencies.csv) e radioassistenze (navaids.csv)
 *
 * Servono al navplan: accanto al checkpoint ci va il numero da mettere in radio.
 * Stessa strategia degli aeroporti — CSV scaricati dal server, record del singolo
 * identificativo nelle ScriptProperties. Si memorizza anche il "non trovato",
 * altrimenti ogni checkpoint senza radio farebbe riscaricare due CSV.
 */
var OAQ_PROP_PREFIX = 'oaq_';

/* Ordine di utilita' per un VFR che passa sopra un campo: prima chi da' il
 * traffico, poi chi da' informazioni, per ultimi i servizi che non si chiamano. */
var OAQ_ORDER = ['TWR','AFIS','A/D','INFO','UNIC','UNICOM','CTAF','RDO','MULTICOM',
                 'APP','ARR','DEP','ATIS','GND','CLD','OPS'];

/**
 * @param {string} identsCsv Identificativi separati da virgola, es. "LILN,SRN".
 * @return {string} JSON {IDENT: {freq, type, desc}}. Chi non ha frequenza vale null.
 */
function lookupFrequencies(identsCsv) {
  var ids = String(identsCsv || '').toUpperCase().split(',')
      .map(function (c) { return c.trim(); })
      .filter(function (c) { return /^[A-Z0-9]{2,5}$/.test(c); });
  if (!ids.length) return '{}';

  var props = PropertiesService.getScriptProperties();
  var out = {}, missing = [];
  ids.forEach(function (c) {
    var v = props.getProperty(OAQ_PROP_PREFIX + c);
    if (v === null) { missing.push(c); return; }
    try { out[c] = JSON.parse(v); } catch (e) { missing.push(c); }
  });
  if (!missing.length) return JSON.stringify(out);

  var recs = oaqBuild_(oaFetch_('airport-frequencies.csv'), oaFetch_('navaids.csv'), missing);
  var toStore = {};
  missing.forEach(function (c) {
    var rec = recs[c] || null;
    out[c] = rec;
    toStore[OAQ_PROP_PREFIX + c] = JSON.stringify(rec);
  });
  props.setProperties(toStore);
  return JSON.stringify(out);
}

/* Una VHF si scrive con due decimali, tre se e' una canalizzazione 8.33:
 * 122.60, 113.70, 126.425. "122.6" e' corretto in matematica e sbagliato in radio. */
function oaqVhf_(mhz) {
  return Number(mhz).toFixed(3).replace(/(\.\d\d)0$/, '$1');
}

/* kHz del CSV -> il numero che si scrive sul navplan: sopra i 30 MHz e' una VHF
 * e si scrive in megahertz, sotto e' un NDB e resta in kHz (380). */
function oaqFromKhz_(khz) {
  var k = parseFloat(khz);
  if (!isFinite(k) || k <= 0) return '';
  return k >= 30000 ? oaqVhf_(k / 1000) : String(+k.toFixed(1));
}

function oaqBuild_(freqCsv, navCsv, want) {
  var freqs = oaIndex_(oaParseCsv_(freqCsv));
  var navs  = oaIndex_(oaParseCsv_(navCsv));
  var wantSet = {};
  want.forEach(function (c) { wantSet[c] = true; });

  var out = {}, fi = freqs.idx;
  freqs.rows.forEach(function (r) {
    var ap = String(r[fi.airport_ident] || '').toUpperCase();
    if (!wantSet[ap]) return;
    var mhz = parseFloat(r[fi.frequency_mhz]);
    if (!isFinite(mhz) || mhz <= 0) return;
    var type = String(r[fi.type] || '').toUpperCase();
    var rank = OAQ_ORDER.indexOf(type);
    if (rank < 0) rank = 99;
    if (!out[ap] || rank < out[ap].rank) {
      out[ap] = {freq: oaqVhf_(mhz), type: type, desc: r[fi.description] || '', rank: rank};
    }
  });

  var ni = navs.idx;
  navs.rows.forEach(function (r) {
    var id = String(r[ni.ident] || '').toUpperCase();
    if (!wantSet[id] || out[id]) return;        // un aeroporto ha la precedenza
    var f = oaqFromKhz_(r[ni.frequency_khz]);
    if (!f) return;
    out[id] = {freq: f, type: String(r[ni.type] || '').toUpperCase(), desc: r[ni.name] || '', rank: 0};
  });
  return out;
}

/** Scarica un CSV, tenendolo in cache sei ore. */
function oaFetch_(name) {
  var cache = CacheService.getScriptCache();
  var key = 'oa_csv_' + name;
  // CacheService si ferma a 100 kB per voce: i CSV sono molto piu' grandi, quindi
  // la cache tiene solo un marcatore e il vero risparmio e' nelle ScriptProperties
  // per singolo aeroporto. Qui si scarica e basta.
  var res = UrlFetchApp.fetch(OA_BASE + name, {muteHttpExceptions: true});
  if (res.getResponseCode() !== 200) {
    throw new Error('OurAirports ' + name + ': HTTP ' + res.getResponseCode());
  }
  cache.put(key, '1', 21600);
  return res.getContentText();
}

/** Parser CSV che rispetta i campi fra virgolette. */
function oaParseCsv_(text) {
  var rows = [], row = [], field = '', q = false;
  for (var i = 0; i < text.length; i++) {
    var c = text.charAt(i);
    if (q) {
      if (c === '"') { if (text.charAt(i + 1) === '"') { field += '"'; i++; } else q = false; }
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

function oaIndex_(rows) {
  var idx = {}, head = rows[0];
  head.forEach(function (h, i) { idx[String(h).trim()] = i; });
  return idx;
}

/** L'orientamento magnetico si ricava dal designatore, che per definizione ICAO
 *  e' la direzione magnetica arrotondata alla decina. */
function oaHeading_(ident) {
  var m = /^(\d{1,2})/.exec(String(ident).trim());
  if (!m) return null;
  var n = parseInt(m[1], 10);
  return (n >= 1 && n <= 36) ? n * 10 : null;
}

function oaBuild_(airportsCsv, runwaysCsv, want) {
  var arows = oaParseCsv_(airportsCsv), ai = oaIndex_(arows);
  var wantSet = {};
  want.forEach(function (c) { wantSet[c] = true; });

  var out = {};
  for (var i = 1; i < arows.length; i++) {
    var r = arows[i];
    var ident = String(r[ai.ident] || '').toUpperCase();
    if (!wantSet[ident]) continue;
    out[ident] = {
      icao: ident,
      name: r[ai.name] || '',
      municipality: r[ai.municipality] || '',
      lat: parseFloat(r[ai.latitude_deg]),
      lon: parseFloat(r[ai.longitude_deg]),
      elevFt: r[ai.elevation_ft] === '' ? null : parseFloat(r[ai.elevation_ft]),
      runways: []
    };
  }

  var rrows = oaParseCsv_(runwaysCsv), ri = oaIndex_(rrows);
  for (var j = 1; j < rrows.length; j++) {
    var q = rrows[j];
    var ap = String(q[ri.airport_ident] || '').toUpperCase();
    if (!out[ap]) continue;
    if (q[ri.closed] === '1') continue;
    var lenFt = parseFloat(q[ri.length_ft]);
    var lenM = isFinite(lenFt) ? Math.round(lenFt * 0.3048) : null;
    ['le', 'he'].forEach(function (side) {
      var id = q[ri[side + '_ident']];
      if (!id) return;
      out[ap].runways.push({
        ident: id,
        lenM: lenM,
        surface: q[ri.surface] || '',
        hdgMag: oaHeading_(id),
        hdgTrue: q[ri[side + '_heading_degT']] === '' ? null : parseFloat(q[ri[side + '_heading_degT']])
      });
    });
  }
  Object.keys(out).forEach(function (k) {
    out[k].runways.sort(function (a, b) { return (b.lenM || 0) - (a.lenM || 0); });
  });
  return out;
}

/** Svuota la cache degli aeroporti e delle frequenze, per forzare un aggiornamento. */
function resetAirportCache() {
  var props = PropertiesService.getScriptProperties();
  var all = props.getProperties();
  Object.keys(all).forEach(function (k) {
    if (k.indexOf(OA_PROP_PREFIX) === 0 || k.indexOf(OAQ_PROP_PREFIX) === 0) props.deleteProperty(k);
  });
}

/** Utile in fase di test dall'editor Apps Script: svuota i voli dell'utente corrente. */
function resetFlights() {
  clearFlightChunks_(PropertiesService.getUserProperties());
}
