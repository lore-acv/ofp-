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

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('OFP Generator — Cessna C172 FR')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
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

/** Utile in fase di test dall'editor Apps Script: svuota i voli dell'utente corrente. */
function resetFlights() {
  clearFlightChunks_(PropertiesService.getUserProperties());
}
