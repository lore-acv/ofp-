/* Il cancello del sito: passa da qui ogni richiesta, pagine, dati, manuale e
   PDF compresi. Senza una sessione valida si raggiungono solo la pagina di
   accesso, quella di primo avvio e il loro stile. Le API stanno tutte in
   server/conto.js. */
import { configura, preparaSchema, utenteDi, api, json, API_PUBBLICHE, API_PRIMO_ACCESSO } from '../server/conto.js';

const PAGINE_PUBBLICHE = new Set(['/login', '/setup']);
const ASSET_PUBBLICO = /^\/(conto|rotta-av)(\.[0-9a-f]{8})?\.(css|js)$/;   // rotta-av: la mappa della pagina di accesso

/* /ofp.html, /ofp e /ofp/ sono la stessa pagina per Cloudflare Pages */
const pagina = (p) => (p.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1')) || '/';

/* Solo percorsi interni: un ?next= che porta fuori dal sito non si segue. */
const interno = (n) => (typeof n === 'string' && n.startsWith('/') && !n.startsWith('//') && !n.startsWith('/\\')) ? n : '/';
const vai = (dove) => new Response(null, { status: 302, headers: { Location: dove, 'Cache-Control': 'no-store' } });

function vuoleHtml(request, p) {
  const a = request.headers.get('Accept') || '';
  return request.headers.get('Sec-Fetch-Mode') === 'navigate' || a.includes('text/html') || !/\.[a-z0-9]+$/i.test(p) || p.endsWith('.html');
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url), p = url.pathname;

  if (!env.DB) {
    return new Response('The D1 database is not connected to this project (binding "DB").', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  configura(env);
  await preparaSchema(env.DB);

  // Le scritture arrivano solo dalle pagine di questo sito.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (request.headers.get('Origin') !== url.origin) return json({ errore: 'Request refused (origin).' }, 403);
  }

  const utente = await utenteDi(request, env.DB);

  if (p.startsWith('/api/')) {
    if (!utente && !API_PUBBLICHE.has(p)) return json({ errore: 'Sign in required.' }, 401);
    if (utente && utente.deve_cambiare && !API_PRIMO_ACCESSO.has(p) && !API_PUBBLICHE.has(p)) {
      return json({ errore: 'Change your temporary password first.' }, 403);
    }
    return api(request, env, utente);
  }

  const pg = pagina(p);
  if (PAGINE_PUBBLICHE.has(pg) || ASSET_PUBBLICO.test(p)) {
    if (utente && pg === '/login') return vai(interno(url.searchParams.get('next')));
    return next();
  }

  if (!utente) {
    if (vuoleHtml(request, p)) return vai('/login?next=' + encodeURIComponent(p + url.search));
    return new Response('Sign in required.', { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  if (utente.deve_cambiare && pg !== '/password') {
    if (vuoleHtml(request, p)) return vai('/password?next=' + encodeURIComponent(p + url.search));
    return new Response('Change your temporary password first.', { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }
  if (pg === '/admin' && utente.ruolo !== 'admin') return vai('/');
  // il foglio di volo stava qui prima che la Dashboard diventasse la prima pagina
  if (pg === '/ofp') return vai('/');

  return next();
}
