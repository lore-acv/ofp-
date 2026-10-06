/* ============================================================================
   ACCOUNT, SESSIONI E VOLI — lato server (Cloudflare Pages Functions + D1)
   ============================================================================
   Il sito e' chiuso: senza una sessione valida si vede solo la pagina di
   accesso. Gli account li crea l'amministratore, con una password temporanea
   che l'utente deve cambiare al primo ingresso; non c'e' registrazione libera.

   Il database e' il D1 collegato al progetto con il nome DB (pannello
   Cloudflare -> Settings -> Bindings). Le tabelle si creano da sole alla prima
   richiesta. Il primo amministratore si crea da /setup con la chiave segreta
   SETUP_TOKEN, e solo finche' il database non ha utenti.

   Quello che qui conta per la sicurezza:
   - le password non si salvano mai: si salva PBKDF2-SHA256 con sale casuale;
   - il cookie di sessione e' HttpOnly, Secure, SameSite=Lax; nel database ne
     sta solo l'impronta SHA-256, quindi chi leggesse le tabelle non potrebbe
     usarle per entrare;
   - le scritture accettano solo richieste dalla stessa origine (Origin);
   - dopo 5 password sbagliate l'account si ferma 15 minuti, e un indirizzo IP
     che sbaglia troppo viene rallentato allo stesso modo;
   - il proprietario di un volo lo decide la sessione, mai la richiesta: un
     utente non puo' leggere ne' toccare i voli di un altro.
   ========================================================================== */

export const COOKIE = '__Host-ofp_sess';
const GIORNO = 86400e3;
const DURATA_SESSIONE = 30 * GIORNO;     // si rinnova usando il sito
/* Iterazioni di PBKDF2. Una verifica a 100.000 costa ~50 ms di CPU, e il piano
   gratuito di Workers ne concede 10 per richiesta: il login fallirebbe. Si parte
   quindi da 10.000 (~6 ms) e si alza con la variabile PBKDF2_ITER sul piano a
   pagamento (massimo 100.000, il limite di Workers). Ogni hash porta scritto il
   proprio numero: al primo login dopo un cambio la password si ricifra da sola. */
let PBKDF2_ITER = 10000;
export function configura(env) {
  const n = parseInt(env && env.PBKDF2_ITER, 10);
  PBKDF2_ITER = Number.isFinite(n) ? Math.min(100000, Math.max(5000, n)) : 10000;
}
const MAX_TENTATIVI = 5, BLOCCO = 15 * 60e3;
const MAX_TENTATIVI_IP = 30;             // per finestra di BLOCCO
const MIN_PASSWORD = 10;
const MAX_VOLO = 256 * 1024, MAX_VOLI = 1000;

/* ---------------------------------------------------------------- schema */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS utenti (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     email TEXT NOT NULL UNIQUE,
     nome TEXT NOT NULL,
     ruolo TEXT NOT NULL DEFAULT 'pilota',
     stato TEXT NOT NULL DEFAULT 'attivo',
     password TEXT NOT NULL,
     deve_cambiare INTEGER NOT NULL DEFAULT 1,
     tentativi INTEGER NOT NULL DEFAULT 0,
     bloccato_fino INTEGER NOT NULL DEFAULT 0,
     creato INTEGER NOT NULL,
     ultimo_accesso INTEGER)`,
  `CREATE TABLE IF NOT EXISTS sessioni (
     impronta TEXT PRIMARY KEY,
     utente INTEGER NOT NULL REFERENCES utenti(id) ON DELETE CASCADE,
     creata INTEGER NOT NULL,
     scade INTEGER NOT NULL,
     usata INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS sessioni_utente ON sessioni(utente)`,
  `CREATE TABLE IF NOT EXISTS voli (
     utente INTEGER NOT NULL REFERENCES utenti(id) ON DELETE CASCADE,
     id TEXT NOT NULL,
     dati TEXT NOT NULL,
     aggiornato TEXT NOT NULL,
     PRIMARY KEY (utente, id))`,
  `CREATE TABLE IF NOT EXISTS tentativi_ip (
     ip TEXT PRIMARY KEY,
     n INTEGER NOT NULL,
     dal INTEGER NOT NULL)`
];
let schemaPronto = null;
export function preparaSchema(db) {
  if (!schemaPronto) schemaPronto = db.batch(SCHEMA.map(s => db.prepare(s))).catch(e => { schemaPronto = null; throw e; });
  return schemaPronto;
}

/* ---------------------------------------------------------------- utilita' */
const enc = new TextEncoder();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const daB64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
const casuale = (n) => crypto.getRandomValues(new Uint8Array(n));
async function sha256(testo) { return b64u(await crypto.subtle.digest('SHA-256', enc.encode(testo))); }

/* Confronto a tempo costante: si confrontano le impronte, che hanno sempre la
   stessa lunghezza, cosi' nemmeno la lunghezza dell'originale trapela. */
async function uguali(a, b) {
  const [x, y] = [enc.encode(await sha256(String(a))), enc.encode(await sha256(String(b)))];
  let d = x.length ^ y.length;
  for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i];
  return d === 0;
}

async function pbkdf2(password, sale, iter) {
  const chiave = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return b64u(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: sale, iterations: iter }, chiave, 256));
}
export async function cifraPassword(password) {
  const sale = casuale(16);
  return `pbkdf2$${PBKDF2_ITER}$${b64u(sale)}$${await pbkdf2(password, sale, PBKDF2_ITER)}`;
}
async function verificaPassword(password, salvata) {
  const [tipo, iter, sale, hash] = String(salvata || '').split('$');
  if (tipo !== 'pbkdf2') return false;
  return uguali(await pbkdf2(password, daB64u(sale), +iter), hash);
}
/* Per un'email che non esiste si fa lo stesso lavoro di una che esiste: il
   tempo di risposta non deve dire quali indirizzi hanno un account. */
const finta = () => `pbkdf2$${PBKDF2_ITER}$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
const daRicifrare = (salvata) => String(salvata).split('$')[1] !== String(PBKDF2_ITER);

/* Password temporanea leggibile al telefono: niente 0/O, 1/l/I. */
const ALFABETO = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function passwordTemporanea() {
  const out = [];
  while (out.length < 12) {
    for (const b of casuale(24)) {
      if (b >= 256 - (256 % ALFABETO.length)) continue;   // niente sbilanciamenti
      out.push(ALFABETO[b % ALFABETO.length]);
      if (out.length === 12) break;
    }
  }
  return `${out.slice(0, 4).join('')}-${out.slice(4, 8).join('')}-${out.slice(8).join('')}`;
}

const normEmail = (e) => String(e || '').trim().toLowerCase();
const emailValida = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 200;
function controllaPassword(p, email) {
  if (typeof p !== 'string' || p.length < MIN_PASSWORD) return `The password must be at least ${MIN_PASSWORD} characters long.`;
  if (p.length > 200) return 'The password is too long.';
  if (normEmail(p) === normEmail(email)) return 'The password cannot be your e-mail address.';
  return null;
}

export function json(dati, stato = 200, extra = {}) {
  return new Response(JSON.stringify(dati), {
    status: stato,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra }
  });
}
const errore = (stato, msg, extra) => json({ errore: msg }, stato, extra);

function cookieSessione(token, maxAge) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}
export function leggiCookie(request, nome) {
  const c = request.headers.get('Cookie') || '';
  for (const parte of c.split(';')) {
    const i = parte.indexOf('=');
    if (i > 0 && parte.slice(0, i).trim() === nome) return parte.slice(i + 1).trim();
  }
  return null;
}
const ipDi = (request) => request.headers.get('CF-Connecting-IP') || 'locale';

/* ---------------------------------------------------------------- sessioni */
async function apriSessione(db, utente) {
  const token = b64u(casuale(32)), ora = Date.now();
  await db.batch([
    db.prepare('INSERT INTO sessioni (impronta, utente, creata, scade, usata) VALUES (?, ?, ?, ?, ?)')
      .bind(await sha256(token), utente.id, ora, ora + DURATA_SESSIONE, ora),
    db.prepare('UPDATE utenti SET ultimo_accesso = ?, tentativi = 0, bloccato_fino = 0 WHERE id = ?').bind(ora, utente.id),
    db.prepare('DELETE FROM sessioni WHERE scade < ?').bind(ora)            // pulizia
  ]);
  return cookieSessione(token, DURATA_SESSIONE / 1000);
}

/** L'utente della richiesta, o null. Rinnova la sessione al piu' una volta l'ora. */
export async function utenteDi(request, db) {
  const token = leggiCookie(request, COOKIE);
  if (!token || token.length > 100) return null;
  const imp = await sha256(token), ora = Date.now();
  const r = await db.prepare(
    `SELECT u.id, u.email, u.nome, u.ruolo, u.stato, u.deve_cambiare, s.usata, s.scade
       FROM sessioni s JOIN utenti u ON u.id = s.utente WHERE s.impronta = ?`).bind(imp).first();
  if (!r || r.scade < ora || r.stato !== 'attivo') return null;
  if (ora - r.usata > 3600e3) {
    await db.prepare('UPDATE sessioni SET usata = ?, scade = ? WHERE impronta = ?').bind(ora, ora + DURATA_SESSIONE, imp).run();
  }
  return { id: r.id, email: r.email, nome: r.nome, ruolo: r.ruolo, deve_cambiare: !!r.deve_cambiare, impronta: imp };
}

/* --------------------------------------------------------------- tentativi */
async function ipBloccato(db, ip) {
  const r = await db.prepare('SELECT n, dal FROM tentativi_ip WHERE ip = ?').bind(ip).first();
  return !!r && Date.now() - r.dal < BLOCCO && r.n >= MAX_TENTATIVI_IP;
}
async function segnaErroreIp(db, ip) {
  const ora = Date.now();
  await db.prepare(
    `INSERT INTO tentativi_ip (ip, n, dal) VALUES (?1, 1, ?2)
       ON CONFLICT(ip) DO UPDATE SET
         n = CASE WHEN ?2 - dal > ?3 THEN 1 ELSE n + 1 END,
         dal = CASE WHEN ?2 - dal > ?3 THEN ?2 ELSE dal END`).bind(ip, ora, BLOCCO).run();
}

/* ============================================================ API: accesso */
async function login(request, db) {
  const b = await corpo(request);
  const email = normEmail(b.email), password = String(b.password || '');
  const ip = ipDi(request);
  const NO = 'E-mail or password not valid.';
  if (await ipBloccato(db, ip)) return errore(429, 'Too many failed attempts. Try again in 15 minutes.');
  const u = await db.prepare('SELECT * FROM utenti WHERE email = ?').bind(email).first();
  const giusta = await verificaPassword(password, u ? u.password : finta());
  if (!u) { await segnaErroreIp(db, ip); return errore(401, NO); }
  if (u.bloccato_fino > Date.now()) return errore(429, 'Account temporarily locked after too many failed attempts. Try again in 15 minutes.');
  if (!giusta) {
    await segnaErroreIp(db, ip);
    const n = u.tentativi + 1;
    if (n >= MAX_TENTATIVI) {
      await db.prepare('UPDATE utenti SET tentativi = 0, bloccato_fino = ? WHERE id = ?').bind(Date.now() + BLOCCO, u.id).run();
      return errore(429, 'Account temporarily locked after too many failed attempts. Try again in 15 minutes.');
    }
    await db.prepare('UPDATE utenti SET tentativi = ? WHERE id = ?').bind(n, u.id).run();
    return errore(401, NO);
  }
  if (u.stato !== 'attivo') return errore(403, 'This account is suspended. Contact the administrator.');
  if (daRicifrare(u.password)) {
    await db.prepare('UPDATE utenti SET password = ? WHERE id = ?').bind(await cifraPassword(password), u.id).run();
  }
  const cookie = await apriSessione(db, u);
  return json({ ok: true, deve_cambiare: !!u.deve_cambiare }, 200, { 'Set-Cookie': cookie });
}

async function logout(request, db, utente) {
  if (utente) await db.prepare('DELETE FROM sessioni WHERE impronta = ?').bind(utente.impronta).run();
  return json({ ok: true }, 200, { 'Set-Cookie': cookieSessione('', 0) });
}

async function cambiaPassword(request, db, utente) {
  const b = await corpo(request);
  const u = await db.prepare('SELECT * FROM utenti WHERE id = ?').bind(utente.id).first();
  if (!await verificaPassword(String(b.attuale || ''), u.password)) return errore(400, 'The current password is not correct.');
  const nuova = String(b.nuova || '');
  const msg = controllaPassword(nuova, u.email);
  if (msg) return errore(400, msg);
  if (nuova === b.attuale) return errore(400, 'The new password must be different from the current one.');
  // le altre sessioni si chiudono: chi conosceva la vecchia password resta fuori
  await db.batch([
    db.prepare('UPDATE utenti SET password = ?, deve_cambiare = 0 WHERE id = ?').bind(await cifraPassword(nuova), u.id),
    db.prepare('DELETE FROM sessioni WHERE utente = ? AND impronta != ?').bind(u.id, utente.impronta)
  ]);
  return json({ ok: true });
}

async function setup(request, db, env) {
  const b = await corpo(request);
  const chiave = env.SETUP_TOKEN || '';
  const n = await db.prepare('SELECT COUNT(*) AS n FROM utenti').first();
  if (n.n > 0) return errore(410, 'Setup has already been completed. Sign in from the login page.');
  if (chiave.length < 20) return errore(503, 'SETUP_TOKEN is missing or too short in the Cloudflare settings.');
  if (!await uguali(String(b.token || ''), chiave)) { await segnaErroreIp(db, ipDi(request)); return errore(403, 'Setup key not valid.'); }
  const email = normEmail(b.email), nome = String(b.nome || '').trim().slice(0, 80);
  if (!emailValida(email)) return errore(400, 'E-mail address not valid.');
  if (!nome) return errore(400, 'Enter your name.');
  const msg = controllaPassword(String(b.password || ''), email);
  if (msg) return errore(400, msg);
  await db.prepare(`INSERT INTO utenti (email, nome, ruolo, stato, password, deve_cambiare, creato)
                    VALUES (?, ?, 'admin', 'attivo', ?, 0, ?)`)
    .bind(email, nome, await cifraPassword(String(b.password)), Date.now()).run();
  const u = await db.prepare('SELECT * FROM utenti WHERE email = ?').bind(email).first();
  return json({ ok: true }, 200, { 'Set-Cookie': await apriSessione(db, u) });
}

/* ============================================================== API: admin */
async function elencoUtenti(db) {
  const { results } = await db.prepare(
    `SELECT u.id, u.email, u.nome, u.ruolo, u.stato, u.deve_cambiare, u.creato, u.ultimo_accesso, u.bloccato_fino,
            (SELECT COUNT(*) FROM voli v WHERE v.utente = u.id) AS voli
       FROM utenti u ORDER BY u.nome COLLATE NOCASE`).all();
  return json({ utenti: results.map(u => ({ ...u, deve_cambiare: !!u.deve_cambiare, bloccato: u.bloccato_fino > Date.now() })) });
}

async function creaUtente(request, db) {
  const b = await corpo(request);
  const email = normEmail(b.email), nome = String(b.nome || '').trim().slice(0, 80);
  const ruolo = b.ruolo === 'admin' ? 'admin' : 'pilota';
  if (!emailValida(email)) return errore(400, 'E-mail address not valid.');
  if (!nome) return errore(400, 'Enter the name.');
  if (await db.prepare('SELECT 1 FROM utenti WHERE email = ?').bind(email).first()) return errore(409, 'An account with this e-mail already exists.');
  const temp = passwordTemporanea();
  await db.prepare(`INSERT INTO utenti (email, nome, ruolo, stato, password, deve_cambiare, creato)
                    VALUES (?, ?, ?, 'attivo', ?, 1, ?)`).bind(email, nome, ruolo, await cifraPassword(temp), Date.now()).run();
  return json({ ok: true, email, password: temp });
}

async function adminsAttivi(db) {
  return (await db.prepare(`SELECT COUNT(*) AS n FROM utenti WHERE ruolo = 'admin' AND stato = 'attivo'`).first()).n;
}

async function azioneUtente(request, db, io, id, azione) {
  const u = await db.prepare('SELECT * FROM utenti WHERE id = ?').bind(id).first();
  if (!u) return errore(404, 'Account not found.');
  const seStesso = u.id === io.id;
  const ultimoAdmin = u.ruolo === 'admin' && u.stato === 'attivo' && await adminsAttivi(db) <= 1;
  if (azione === 'reset') {
    if (seStesso) return errore(400, 'Change your own password from "Change password".');
    const temp = passwordTemporanea();
    await db.batch([
      db.prepare('UPDATE utenti SET password = ?, deve_cambiare = 1, tentativi = 0, bloccato_fino = 0 WHERE id = ?').bind(await cifraPassword(temp), id),
      db.prepare('DELETE FROM sessioni WHERE utente = ?').bind(id)
    ]);
    return json({ ok: true, email: u.email, password: temp });
  }
  if (azione === 'sospendi' || azione === 'riattiva') {
    if (seStesso) return errore(400, 'You cannot suspend your own account.');
    if (azione === 'sospendi' && ultimoAdmin) return errore(400, 'This is the last active administrator.');
    const ops = [db.prepare('UPDATE utenti SET stato = ? WHERE id = ?').bind(azione === 'sospendi' ? 'sospeso' : 'attivo', id)];
    if (azione === 'sospendi') ops.push(db.prepare('DELETE FROM sessioni WHERE utente = ?').bind(id));
    else ops.push(db.prepare('UPDATE utenti SET tentativi = 0, bloccato_fino = 0 WHERE id = ?').bind(id));
    await db.batch(ops);
    return json({ ok: true });
  }
  if (azione === 'elimina') {
    if (seStesso) return errore(400, 'You cannot delete your own account.');
    if (ultimoAdmin) return errore(400, 'This is the last active administrator.');
    // D1 non garantisce le chiavi esterne attive: si cancella tutto esplicitamente
    await db.batch([
      db.prepare('DELETE FROM voli WHERE utente = ?').bind(id),
      db.prepare('DELETE FROM sessioni WHERE utente = ?').bind(id),
      db.prepare('DELETE FROM utenti WHERE id = ?').bind(id)
    ]);
    return json({ ok: true });
  }
  return errore(404, 'Unknown action.');
}

/* =============================================================== API: voli
   Il volo e' l'oggetto che il wizard gia' usa (id, status, updated_at,
   flight_data, weather_data), salvato cosi' com'e'. Il proprietario e' sempre
   l'utente della sessione. */
const idValido = (id) => /^[A-Za-z0-9_.-]{1,80}$/.test(id);

async function elencoVoli(db, io) {
  const { results } = await db.prepare('SELECT dati FROM voli WHERE utente = ? ORDER BY aggiornato DESC').bind(io.id).all();
  return json({ voli: results.map(r => JSON.parse(r.dati)) });
}

function validaVolo(v, id) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return 'Flight data not valid.';
  if (id && v.id !== id) return 'Flight id does not match.';
  if (!idValido(String(v.id || ''))) return 'Flight id not valid.';
  if (JSON.stringify(v).length > MAX_VOLO) return 'Flight too large.';
  return null;
}

async function salvaVolo(request, db, io, id) {
  if (!idValido(id)) return errore(400, 'Flight id not valid.');
  const v = await corpo(request);
  const msg = validaVolo(v, id); if (msg) return errore(400, msg);
  const agg = String(v.updated_at || new Date().toISOString());
  const c = await db.prepare('SELECT aggiornato, dati FROM voli WHERE utente = ? AND id = ?').bind(io.id, id).first();
  // Un dispositivo rimasto indietro non sovrascrive una versione piu' recente:
  // gli si rimanda quella, e il wizard la prende al posto della sua.
  if (c && c.aggiornato > agg) return json({ conflitto: true, volo: JSON.parse(c.dati) }, 409);
  if (!c) {
    const n = (await db.prepare('SELECT COUNT(*) AS n FROM voli WHERE utente = ?').bind(io.id).first()).n;
    if (n >= MAX_VOLI) return errore(400, `Limit of ${MAX_VOLI} saved flights reached. Delete some old flights.`);
  }
  await db.prepare(`INSERT INTO voli (utente, id, dati, aggiornato) VALUES (?, ?, ?, ?)
                    ON CONFLICT(utente, id) DO UPDATE SET dati = excluded.dati, aggiornato = excluded.aggiornato`)
    .bind(io.id, id, JSON.stringify(v), agg).run();
  return json({ ok: true });
}

async function eliminaVolo(db, io, id) {
  if (!idValido(id)) return errore(400, 'Flight id not valid.');
  await db.prepare('DELETE FROM voli WHERE utente = ? AND id = ?').bind(io.id, id).run();
  return json({ ok: true });
}

/* I voli rimasti nel browser da prima del login: si aggiungono all'account,
   senza toccare quelli che ci sono gia' con lo stesso id. */
async function importaVoli(request, db, io) {
  const b = await corpo(request);
  const lista = Array.isArray(b.voli) ? b.voli.slice(0, MAX_VOLI) : [];
  const buoni = lista.filter(v => !validaVolo(v));
  const n = (await db.prepare('SELECT COUNT(*) AS n FROM voli WHERE utente = ?').bind(io.id).first()).n;
  const posto = Math.max(0, MAX_VOLI - n);
  const ops = buoni.slice(0, posto).map(v => db.prepare(
    'INSERT OR IGNORE INTO voli (utente, id, dati, aggiornato) VALUES (?, ?, ?, ?)')
    .bind(io.id, v.id, JSON.stringify(v), String(v.updated_at || new Date().toISOString())));
  const esiti = ops.length ? await db.batch(ops) : [];
  const importati = esiti.reduce((n, e) => n + ((e.meta && e.meta.changes) || 0), 0);
  return json({ ok: true, importati, scartati: lista.length - importati });
}

/* ================================================================ smistamento */
async function corpo(request) {
  try { const b = await request.json(); return b && typeof b === 'object' ? b : {}; } catch { return {}; }
}

/** Le API pubbliche: le uniche raggiungibili senza sessione. */
export const API_PUBBLICHE = new Set(['/api/auth/login', '/api/auth/setup']);
/** Quelle concesse a chi deve ancora cambiare la password temporanea. */
export const API_PRIMO_ACCESSO = new Set(['/api/auth/io', '/api/auth/password', '/api/auth/logout']);

export async function api(request, env, utente) {
  const db = env.DB, url = new URL(request.url), p = url.pathname, m = request.method;
  if (p === '/api/auth/login' && m === 'POST') return login(request, db);
  if (p === '/api/auth/setup' && m === 'POST') return setup(request, db, env);
  if (!utente) return errore(401, 'Sign in required.');
  if (p === '/api/auth/io' && m === 'GET') return json({ id: utente.id, email: utente.email, nome: utente.nome, ruolo: utente.ruolo, deve_cambiare: utente.deve_cambiare });
  if (p === '/api/auth/logout' && m === 'POST') return logout(request, db, utente);
  if (p === '/api/auth/password' && m === 'POST') return cambiaPassword(request, db, utente);
  if (utente.deve_cambiare) return errore(403, 'Change your temporary password first.');

  if (p === '/api/voli' && m === 'GET') return elencoVoli(db, utente);
  if (p === '/api/voli/importa' && m === 'POST') return importaVoli(request, db, utente);
  let r = /^\/api\/voli\/([^/]+)$/.exec(p);
  if (r) {
    const id = decodeURIComponent(r[1]);
    if (m === 'PUT') return salvaVolo(request, db, utente, id);
    if (m === 'DELETE') return eliminaVolo(db, utente, id);
  }

  if (p.startsWith('/api/admin/')) {
    if (utente.ruolo !== 'admin') return errore(403, 'Administrators only.');
    if (p === '/api/admin/utenti' && m === 'GET') return elencoUtenti(db);
    if (p === '/api/admin/utenti' && m === 'POST') return creaUtente(request, db);
    r = /^\/api\/admin\/utenti\/(\d+)\/(reset|sospendi|riattiva|elimina)$/.exec(p);
    if (r && m === 'POST') return azioneUtente(request, db, utente, +r[1], r[2]);
  }
  return errore(404, 'Not found.');
}
