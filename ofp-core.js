/* ============================================================================
   OFP C172 FR — NUCLEO CONDIVISO
   ============================================================================
   Questo file e' caricato SIA dalla pagina di import (import.html) SIA dal
   foglio di volo (index.html). Contiene tutto e solo cio' che serve a entrambe:
   la lettura del NavLog di ForeFlight, quella del briefing meteo, il METAR e
   quattro funzioni di comodo.

   Non contiene nulla che dipenda dal modulo del wizard: niente riferimenti a
   campi specifici, niente calcoli POH. Cosi' le due pagine condividono un'unica
   implementazione dei parser invece di tenerne due copie che col tempo
   divergerebbero.

   Sotto Google Apps Script non puo' essere servito come file .js: Codice.gs lo
   inserisce nella pagina al posto del suo tag <script src>. Vedi README.
   ========================================================================== */

/* ============================ helpers ============================ */
function $(id){ return document.getElementById(id); }
function num(id){ const v=parseFloat($(id).value); return isNaN(v)?0:v; }
function txt(id){ const el=$(id); return el ? (el.value||"") : ""; }
function fmt(n){ if(!isFinite(n)) return "0"; const r=Math.round(n*100)/100; return Number.isInteger(r)? String(r) : r.toFixed(2); }
function pad(s,len){ s=String(s); return s+" ".repeat(Math.max(0,len-s.length)); }
function padL(s,len){ s=String(s); return " ".repeat(Math.max(0,len-s.length))+s; }
function esc(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
function hhmmToMin(s){ s=String(s||'0000').replace(/\D/g,'').padStart(4,'0'); const hh=parseInt(s.slice(0,2))||0, mm=parseInt(s.slice(2,4))||0; return hh*60+mm; }
function minToHHMM(min){ min=((min%1440)+1440)%1440; const hh=Math.floor(min/60), mm=min%60; return String(hh).padStart(2,'0')+String(mm).padStart(2,'0'); }

/* ===================== IMPORT NAVLOG FOREFLIGHT =====================
   Un NavLog e' una TABELLA, e le tabelle in PDF non si leggono a righe di testo:
   pdf.js restituisce i frammenti in ordine sparso e unendoli con spazi le colonne
   si mescolano. Qui si usano invece le COORDINATE di ogni frammento: si
   raggruppano per ordinata (le righe), si legge la riga di intestazione per capire
   dove cade ogni colonna, e si assegna ogni valore alla colonna piu' vicina.

   Cosi' il parser non dipende da un ordine di colonne fisso: si adatta a quelle
   che il NavLog dichiara davvero nella sua intestazione.

   Sinonimi riconosciuti nell'intestazione: ForeFlight cambia le diciture fra
   versioni e fra impostazioni di unita', quindi ogni colonna ha piu' nomi possibili. */
const NAVLOG_COLS = [
  {key:'wpt',     names:['WPT','WAYPOINT','IDENT','FIX','NAME','POINT','ROUTE']},
  {key:'airway',  names:['AIRWAY','AWY','VIA']},
  {key:'alt',     names:['ALT','ALTITUDE','FL']},
  {key:'mc',      names:['MC','MAGCRS','COURSE','CRS','TC']},
  {key:'mh',      names:['MH','HDG','HEADING','MAGHDG','TH']},
  {key:'wind',    names:['WIND','WND']},
  {key:'oat',     names:['OAT','TEMP']},
  {key:'tas',     names:['TAS','CAS','IAS']},
  {key:'gs',      names:['GS','GNDSPD','GROUNDSPEED']},
  {key:'legDist', names:['LEG','DIST','DISTANCE','NM','LEGDIST']},
  {key:'remDist', names:['REMDIST','REMAINING','REM']},
  {key:'ete',     names:['ETE','TIME','LEGTIME']},
  {key:'eta',     names:['ETA','ATA']},
  {key:'legFuel', names:['FUEL','BURN','LEGFUEL','USED']},
  {key:'remFuel', names:['REMFUEL','FUELREM','ONBOARD']}
];
function navlogNormHead(t){ return String(t||'').toUpperCase().replace(/[^A-Z]/g,''); }
function navlogColFor(headText){
  const h=navlogNormHead(headText);
  if(!h) return null;
  // match esatto prima, poi per prefisso: "DIST(NM)" -> DIST
  for(const c of NAVLOG_COLS) if(c.names.indexOf(h)>=0) return c.key;
  for(const c of NAVLOG_COLS) for(const n of c.names) if(h.startsWith(n)&&n.length>=3) return c.key;
  return null;
}

/* Raggruppa i frammenti di una pagina in righe, per ordinata. */
function navlogLines(items){
  const frags=items.map(it=>({
    x: it.transform[4], y: it.transform[5],
    w: it.width||0, s: (it.str||'').trim()
  })).filter(f=>f.s.length);
  frags.sort((a,b)=> (b.y-a.y) || (a.x-b.x));
  const lines=[]; let cur=null;
  frags.forEach(f=>{
    if(!cur || Math.abs(cur.y-f.y)>2.6){ cur={y:f.y, items:[f]}; lines.push(cur); }
    else cur.items.push(f);
  });
  lines.forEach(l=>l.items.sort((a,b)=>a.x-b.x));
  return lines;
}

/* Trova la riga di intestazione: quella con il maggior numero di colonne note. */
function navlogHeader(lines){
  let best=null, bestN=0;
  lines.forEach((l,idx)=>{
    const cols=l.items.map(it=>({key:navlogColFor(it.s), x:it.x+(it.w||0)/2, raw:it.s}))
                      .filter(c=>c.key);
    const uniq=new Set(cols.map(c=>c.key));
    if(uniq.size>bestN){ bestN=uniq.size; best={idx, cols, line:l}; }
  });
  return bestN>=3 ? best : null;
}

/* Legge un NavLog da un documento pdf.js gia' aperto.

   Due strategie, provate in quest'ordine:
   1. SEMANTICA — ogni valore porta la sua unita' ("3 nm", "2,1 l", "2m49s"), quindi
      si riconosce da se'. E' il formato del NavLog vero di ForeFlight, dove LEG e
      TOTALS raggruppano tre valori ciascuna sotto un'unica intestazione.
   2. A COLONNE — per gli export in cui i valori sono nudi e l'intestazione nomina
      ogni colonna: si ricostruiscono le colonne dalle coordinate.

   In entrambi i casi le righe si ricostruiscono dalle ordinate dei frammenti,
   perche' unendo il testo con spazi le colonne si mescolerebbero. */
async function parseNavlogPdf(pdf){
  const out={legs:[], totals:null, raw:'', cols:[], mode:null, fuelUnit:null};
  const allText=[];
  const pageLines=[];
  for(let p=1;p<=pdf.numPages;p++){
    const page=await pdf.getPage(p);
    const content=await page.getTextContent();
    allText.push(content.items.map(i=>i.str).join(' '));
    pageLines.push({items:content.items, lines:navlogLines(content.items)});
  }
  out.raw=allText.join('\n');

  // ---- 1. semantica ----
  for(const pg of pageLines){
    const rows=[];
    let pending=[], depSeen=false;
    pg.lines.forEach(l=>{
      let text=l.items.map(i=>i.s).join(' ');
      // Le etichette di intestazione cadono sulla stessa ordinata del primo
      // waypoint e gli si incollerebbero al nome ("LILN HDG LEG TOTALS"): si
      // tolgono come parole isolate, invece di scartare l'intera riga.
      text=text.replace(/\b(WAYPOINT|HDG|LEG|TOTALS?|ForeFlight Mobile - NavLog)\b/gi,' ')
               .replace(/\s+/g,' ').trim();
      if(!text) return;
      if(/^\d{4}-\d{2}-\d{2}/.test(text)) return;              // piede con data di export
      const r=navParseLine(text);
      if(!r) return;
      if(r.textOnly){
        // ForeFlight manda a capo i nomi lunghi e allinea i numeri alla PRIMA
        // riga del nome: "MALNATE (LNN1)" sta con i suoi valori e "(LILN)" finisce
        // sulla riga sotto. Quella coda appartiene quindi alla tratta PRECEDENTE,
        // non alla successiva — attribuirla alla successiva sposterebbe di un
        // punto tutti i nomi della rotta.
        const cont = /^\(/.test(r.textOnly);
        const prev = rows.length ? rows[rows.length-1] : null;
        if(cont && prev) prev.name=[prev.name, r.textOnly].filter(Boolean).join(' ').trim();
        else if(!depSeen && !rows.length){ rows.push({name:r.textOnly}); depSeen=true; }
        else pending.push(r.textOnly);
        return;
      }
      r.name=[...pending, r.name].filter(Boolean).join(' ').trim();
      pending=[];
      rows.push(r);
    });
    if(rows.filter(r=>r.hdg!=null).length>=2){
      out.mode='semantic';
      out.legs=rows;
      const last=rows[rows.length-1];
      if(last && (last.totDist!=null || last.totTime!=null)){
        // ForeFlight non stampa una riga TOTALS: i totali sono i progressivi
        // dell'ultima riga. Usarli e' anche piu' esatto che sommare le tratte,
        // che sono arrotondate singolarmente.
        out.totals={dist:last.totDist, fuel:last.totFuel, time:last.totTime};
      }
      out.fuelUnit=(rows.find(r=>r.fuelUnit)||{}).fuelUnit||null;
      return out;
    }
  }

  // ---- 2. a colonne ----
  for(const pg of pageLines){
    const head=navlogHeader(pg.lines);
    if(!head) continue;
    out.cols=head.cols.map(c=>c.key);
    const centers=head.cols;
    const legs=[];
    for(let i=head.idx+1;i<pg.lines.length;i++){
      const row={};
      pg.lines[i].items.forEach(it=>{
        const cx=it.x+(it.w||0)/2;
        let bestKey=null, bestD=Infinity;
        centers.forEach(c=>{ const d=Math.abs(c.x-cx); if(d<bestD){ bestD=d; bestKey=c.key; } });
        if(bestKey==null) return;
        row[bestKey]=(row[bestKey]? row[bestKey]+' ' : '')+it.s;
      });
      const first=(row.wpt||'').trim();
      if(/^tot/i.test(first)){ out.totalsRow=row; continue; }
      const hasNum=Object.keys(row).some(k=>k!=='wpt' && /\d/.test(row[k]||''));
      if(first && hasNum) legs.push(row);
      else if(first && !legs.length) legs.push({wpt:first});
    }
    if(legs.length){ out.mode='columns'; out.legs=legs; break; }
  }
  return out;
}

/* ---- estrazione dei numeri dai campi testuali di una riga ---- */
function navNum(v){
  const m=/-?\d+(?:[.,]\d+)?/.exec(String(v||'').replace(/\s/g,''));
  return m? parseFloat(m[0].replace(',','.')) : null;
}
/* Tempi. ForeFlight scrive "2m49s" per le tratte corte e "0h12m" appena si supera
   l'ora di riferimento, quindi servono entrambi; restano supportati i formati
   classici "1:23" e i minuti secchi. */
function navMinutes(v){
  const t=String(v||'').trim();
  let m=/(\d+)\s*h\s*(\d+)\s*m/i.exec(t);                 // 0h12m
  if(m) return parseInt(m[1],10)*60+parseInt(m[2],10);
  m=/(\d+)\s*m\s*(\d+)\s*s/i.exec(t);                     // 2m49s
  if(m) return Math.round(parseInt(m[1],10)+parseInt(m[2],10)/60);
  m=/(\d{1,3})\s*[:+]\s*(\d{2})/.exec(t);                  // 1:23
  if(m) return parseInt(m[1],10)*60+parseInt(m[2],10);
  m=/^(\d+)\s*m$/i.exec(t);                                 // 47m
  if(m) return parseInt(m[1],10);
  m=/^(\d{1,4})$/.exec(t.replace(/\s/g,''));
  if(m) return parseInt(m[1],10);
  return null;
}

/* ---- lettura "semantica" di una riga di NavLog ----
   Nel NavLog reale di ForeFlight l'intestazione ha due soli gruppi numerici, LEG e
   TOTALS, e ognuno contiene TRE valori (distanza, carburante, tempo). Assegnare i
   valori alla colonna piu' vicina li accorperebbe tutti insieme.

   I valori pero' portano con se' la propria unita' — "3 nm", "2,1 l", "2m49s" —
   quindi si riconoscono per quello che sono, non per dove stanno. Il primo valore
   di ogni tipo e' della tratta, il secondo e' il progressivo. E' anche piu' robusto
   di qualunque ipotesi sulle coordinate. */
const NAV_RE = {
  hdg  : /(\d{1,3})\s*°\s*M?/i,
  dist : /(\d+(?:[.,]\d+)?)\s*(?:nm|nmi|mn)\b/gi,
  fuel : /(\d+(?:[.,]\d+)?)\s*(l|lt|ltr|litri|gal|usg|us gal|kg|lbs?)\b/gi,
  time : /(\d+\s*h\s*\d+\s*m|\d+\s*m\s*\d+\s*s|\d{1,3}:\d{2}|\d+\s*m(?![a-z]))/gi
};
const NAV_FUEL_TO_L = {l:1, lt:1, ltr:1, litri:1, gal:3.785, usg:3.785, 'us gal':3.785};

function navParseLine(text){
  const t=String(text||'').replace(/\s+/g,' ').trim();
  if(!t) return null;
  const h=NAV_RE.hdg.exec(t);
  if(!h) return {textOnly:t};
  const name=t.slice(0,h.index).trim();
  const rest=t.slice(h.index+h[0].length);
  const grab=(re)=>{ re.lastIndex=0; const out=[]; let m; while((m=re.exec(rest))!==null) out.push(m); return out; };
  const dists=grab(NAV_RE.dist), fuels=grab(NAV_RE.fuel), times=grab(NAV_RE.time);
  const n=(m)=>m?parseFloat(m[1].replace(',','.')):null;
  const fu=fuels.length?String(fuels[0][2]||'').toLowerCase():null;
  return {
    name, hdg:parseInt(h[1],10),
    legDist:n(dists[0]),  totDist:n(dists[1]),
    legFuel:n(fuels[0]),  totFuel:n(fuels[1]),
    legTime:times[0]?navMinutes(times[0][0]):null,
    totTime:times[1]?navMinutes(times[1][0]):null,
    fuelUnit:fu
  };
}
function navIsIcao(v){ return /^[A-Z]{3,4}$/.test(String(v||'').trim().toUpperCase()); }

/* Durata leggibile: minToHHMM() darebbe "0030" per mezz'ora, che su una tabella
   di tratte si legge male. */
function navDur(min){
  if(min==null) return '—';
  const h=Math.floor(min/60), m=Math.round(min%60);
  return h ? h+'h'+String(m).padStart(2,'0') : m+"'";
}

/* Riduce il NavLog grezzo a quello che serve all'OFP. */
function navCleanName(raw){
  // "MALNATE (LNN1) (LILN)" -> nome leggibile; "LILN (DEP)" -> LILN
  let t=String(raw||'').replace(/\s+/g,' ').trim();
  t=t.replace(/\((?:DEP|ARR|DEST|DESTINATION|ALTN?)\)/ig,'').trim();
  return t;
}
function navShortName(raw){
  const t=navCleanName(raw);
  const head=t.split('(')[0].trim();       // il nome, senza il riferimento fra parentesi
  return (head||t).toUpperCase();
}
function navlogSummary(nav){
  const isSem = nav.mode==='semantic';
  const legs=(nav.legs||[]).map(r=>isSem ? {
      wpt: navShortName(r.name), full: navCleanName(r.name),
      mh: r.hdg!=null?r.hdg:null,
      dist: r.legDist!=null?r.legDist:null,
      ete: r.legTime!=null?r.legTime:null,
      fuel: r.legFuel!=null?r.legFuel:null,
      alt:null, gs:null
    } : {
      wpt: navShortName((r.wpt||'').split(/\s+/)[0]), full:navCleanName(r.wpt),
      mh: navNum(r.mh!=null?r.mh:r.mc),
      dist: navNum(r.legDist), ete: navMinutes(r.ete), fuel: navNum(r.legFuel),
      alt: navNum(r.alt), gs: navNum(r.gs)
    }).filter(l=>l.wpt);

  const sum=(k)=>legs.reduce((a,l)=>a+(l[k]||0),0);
  let totals;
  if(nav.totals){
    totals={dist:nav.totals.dist, ete:nav.totals.time, fuel:nav.totals.fuel, fromTotals:true};
  }else{
    const t=nav.totalsRow||{};
    totals={
      dist: navNum(t.legDist) || Math.round(sum('dist')*10)/10,
      ete:  navMinutes(t.ete) || sum('ete') || null,
      fuel: navNum(t.legFuel) || Math.round(sum('fuel')*10)/10,
      fromTotals: !!nav.totalsRow
    };
  }
  const idents=legs.map(l=>l.wpt);
  const dep = navIsIcao(idents[0]) ? idents[0] : null;
  const arr = navIsIcao(idents[idents.length-1]) ? idents[idents.length-1] : null;
  const mid = idents.slice(dep?1:0, arr?idents.length-1:idents.length);
  const gsVals=legs.map(l=>l.gs).filter(v=>v>0);
  const alts=legs.map(l=>l.alt).filter(v=>v>0);

  // il carburante del NavLog e' nelle unita' di ForeFlight: si porta in litri solo
  // per poterlo confrontare con il piano dell'OFP, che e' in litri
  const k=NAV_FUEL_TO_L[nav.fuelUnit]||null;
  const fuelLitres = (k && totals.fuel!=null) ? Math.round(totals.fuel*k*10)/10 : null;

  return {
    legs, totals, dep, arr,
    route: mid.join(' '),
    avgGs: gsVals.length ? Math.round(gsVals.reduce((a,b)=>a+b,0)/gsVals.length) : null,
    cruiseAlt: alts.length ? Math.max.apply(null,alts) : null,
    fuelUnit: nav.fuelUnit, fuelLitres,
    roundTrip: !!(dep && arr && dep===arr)
  };
}

/* Estrae temperatura, QNH e vento da un METAR. */
function parseMetar(metar){
  const m=String(metar||'').toUpperCase();
  const out={};
  let x=/\b(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT\b/.exec(m);
  if(x){
    out.windDir = x[1]==='VRB' ? null : parseInt(x[1],10);
    out.windKt  = parseInt(x[2],10);
    if(x[3]) out.gustKt=parseInt(x[3],10);
    out.windVrb = x[1]==='VRB';
  }
  x=/\bQ(\d{4})\b/.exec(m);
  if(x) out.qnh=parseInt(x[1],10);
  else { x=/\bA(\d{4})\b/.exec(m); if(x) out.qnh=Math.round(parseInt(x[1],10)/100*33.8639); }
  x=/(?:^|\s)(M?\d{2})\/(M?\d{2})(?:\s|=|$)/.exec(m);
  if(x) out.oat = parseInt(x[1].replace('M','-'),10);
  return out;
}

/* Estrae data, ora di emissione e validità dal PDF del Weather Briefing.

   Formati riconosciuti, in ordine di priorità:
   0. SKYBRIEF (formato del bollettino allegato): l'intestazione della prima pagina
      è "SKYBRIEF 08/09/2026  13:11 UTC  (15:11 LT) ETA  13:11Z". Qui l'orario NON è
      preceduto da nessuna delle diciture classiche ("Printed at", "Issued"...):
      l'ancora è la parola SKYBRIEF stessa, e conta l'ora marcata UTC — mai quella
      fra parentesi, che è ora locale. Va gestito per primo, altrimenti le regole
      generiche più sotto rischiano di agganciare la prima data qualsiasi del PDF.
   1. Skybriefing/PIB: "Printed at (UTC) 2026SEP08 1311"
   2. AELO/MeteoSwiss: "Issued 25. Jul. 2026 13:51" o "24 Jul 2026 07:15"
   3. generico con ancora: "Calculated on 24/07/2026 07:53"
   4. Skybriefing a colonne (l'ancora e il suo valore finiscono separati da pdf.js)
   5. fallback Skybrief-like: una data gg/mm/aaaa seguita da hh:mm UTC nelle prime
      righe del documento, anche senza la parola SKYBRIEF.

   Restituisce { date:"GG.MM.AAAA", time:"HH:MM", valid:"..."|null } o null.
   `valid` è il periodo di validità quando il documento lo dichiara. */
function extractValidity(text){
  text = text||'';
  // Un intervallo di date va preso SOLO se è dichiarato come validità del briefing:
  // in un PDF meteo ce ne sono molti altri (periodi di AIRMET, SIGMET, TAF...) e
  // stampare quello sbagliato sull'OFP è peggio che lasciare il campo vuoto.
  let m = /\b(?:valid(?:ity|o|ità)?|period|periodo)\b[^0-9]{0,25}(\d{1,2}\s+[A-Za-z]{3}\s+\d{2}:?\d{2}\s*Z?)\s*(?:→|->|-|to)\s*(\d{1,2}\s+[A-Za-z]{3}\s+\d{2}:?\d{2}\s*Z?)/i.exec(text);
  if(m) return `${m[1].trim()} → ${m[2].trim()}`;
  m = /\bvalid(?:ity)?\s*[:\s]\s*(\d{4}\/\d{4})\b/i.exec(text);
  if(m) return m[1];
  m = /\bPeriod\s*\(UTC\)\s*:?[^0-9]{0,20}(\d{4}[A-Z]{3}\d{2}\s+\d{4})[^0-9]{0,20}(\d{4}[A-Z]{3}\d{2}\s+\d{4})/i.exec(text);
  if(m) return `${m[1]} → ${m[2]}`;
  return null;
}
function extractPrintedAt(text){
  text = text||'';
  const months={JAN:'01',FEB:'02',MAR:'03',APR:'04',MAY:'05',JUN:'06',JUL:'07',AUG:'08',SEP:'09',OCT:'10',NOV:'11',DEC:'12'};
  const anchor = '(?:printed at\\s*\\(?utc\\)?|calculated on|issued(?:\\s+(?:on|at))?|valid(?:\\s+(?:at|from))?)';
  const valid = extractValidity(text);
  const withValid = (o)=> o ? Object.assign(o,{valid}) : null;

  // 0) SKYBRIEF gg/mm/aaaa hh:mm UTC   — il formato del briefing allegato.
  //    L'ora locale fra parentesi viene deliberatamente ignorata: sull'OFP va l'UTC.
  let m = /\bSKYBRIEF\b[^0-9]{0,20}([0-9]{1,2})[\/.\-]([0-9]{1,2})[\/.\-]([0-9]{4})\s+([0-9]{1,2})[:.]([0-9]{2})\s*(?:UTC|Z)/i.exec(text);
  if(m) return withValid({ date:`${m[1].padStart(2,'0')}.${m[2].padStart(2,'0')}.${m[3]}`, time:`${m[4].padStart(2,'0')}:${m[5]}` });

  // 1) YYYYMonDD HHMM  (es. "2026SEP08 1311")
  m = new RegExp(anchor+'[:\\s]*([0-9]{4})([A-Z]{3})([0-9]{2})\\s+([0-9]{2}):?([0-9]{2})','i').exec(text);
  if(m){ const mon=months[m[2].toUpperCase()]; if(mon) return withValid({ date:`${m[3]}.${mon}.${m[1]}`, time:`${m[4]}:${m[5]}` }); }

  // 2) DD. Mon. YYYY HH:MM  (es. "25. Jul. 2026 13:51" o "24 Jul 2026 07:15")
  m = new RegExp(anchor+'[:\\s]*([0-9]{1,2})\\.?\\s*([A-Za-z]{3})\\.?\\s*([0-9]{4})\\s+([0-9]{2}):([0-9]{2})','i').exec(text);
  if(m){ const mon=months[m[2].toUpperCase()]; if(mon) return withValid({ date:`${m[1].padStart(2,'0')}.${mon}.${m[3]}`, time:`${m[4]}:${m[5]}` }); }

  // 3) DD/MM/YYYY o DD.MM.YYYY o DD-MM-YYYY, poi HH:MM  (es. "24/07/2026 07:53")
  m = new RegExp(anchor+'[:\\s]*([0-9]{2})[\\/.\\-]([0-9]{2})[\\/.\\-]([0-9]{4})\\s+([0-9]{2}):?([0-9]{2})','i').exec(text);
  if(m) return withValid({ date:`${m[1]}.${m[2]}.${m[3]}`, time:`${m[4]}:${m[5]}` });

  // 4) LAYOUT A COLONNE (Skybriefing reale): pdf.js emette le etichette tutte insieme
  //    ("Period (UTC): Printed at (UTC): Datasource:") e poi i valori a blocco
  //    ("to: 2026JUL24 1334  2026JUL24 2359  2026JUL24 1334  MeteoSwiss"), quindi
  //    l'ancora NON è seguita dal suo valore. In questo caso raccogliamo tutte le
  //    date-ora in formato "YYYYMonDD HHMM" presenti nell'intestazione: la riga
  //    "Printed at" ripete l'ora di inizio del Period, quindi l'orario di stampa
  //    coincide con la PRIMA data-ora dell'header. Prendiamo quella.
  if(/printed at/i.test(text)){
    const head = text.slice(0, 1200); // solo l'intestazione, non tutto il documento
    const re = /\b([0-9]{4})([A-Z]{3})([0-9]{2})\s+([0-9]{2})([0-9]{2})\b/gi;
    const found=[]; let mm;
    while((mm=re.exec(head))!==null){
      const mon=months[mm[2].toUpperCase()];
      if(mon) found.push({ date:`${mm[3]}.${mon}.${mm[1]}`, time:`${mm[4]}:${mm[5]}` });
    }
    // L'ordine delle colonne dell'intestazione è: Period-from, Period-to, Printed at.
    // Quando ci sono tutte e tre, l'orario di stampa è la TERZA data-ora — non la
    // prima. Nei briefing in cui la stampa coincide con l'inizio del periodo le due
    // sono uguali e la scelta è indifferente; quando NON coincidono (briefing tirato
    // giù a metà del periodo di validità, il caso normale) prendere la prima darebbe
    // sull'OFP un orario di emissione sbagliato di ore.
    if(found.length>=3){
      const period = `${found[0].date} ${found[0].time}Z → ${found[1].date} ${found[1].time}Z`;
      return Object.assign({}, found[2], {valid: valid || period});
    }
    if(found.length) return withValid(found[0]);
  }

  // 5) Fallback per briefing in stile Skybrief senza la parola chiave: una data
  //    gg/mm/aaaa seguita da un orario marcato UTC/Z nell'intestazione del documento.
  m = /\b([0-9]{1,2})[\/.\-]([0-9]{1,2})[\/.\-]([0-9]{4})\s+([0-9]{1,2})[:.]([0-9]{2})\s*(?:UTC|Z)\b/.exec(text.slice(0,600));
  if(m) return withValid({ date:`${m[1].padStart(2,'0')}.${m[2].padStart(2,'0')}.${m[3]}`, time:`${m[4].padStart(2,'0')}:${m[5]}` });

  return valid ? {date:'', time:'', valid} : null;
}

/* Estrae le pagine "cartina" (GAFOR/SIGMET/SWC/Wind/QNH ecc.) dal PDF sorgente:
   sono pagine con pochissimo testo selezionabile (sono per lo più immagini/grafica),
   a differenza delle pagine METAR/TAF, dei paragrafi di prognosi testuale e dei NOTAM
   che hanno molto testo. Si escludono sempre la prima pagina (METAR/TAF) e le ultime
   2 (NOTAM, già gestite a parte). Ogni pagina candidata viene renderizzata su canvas
   e restituita come immagine, per poi essere impaginata nell'OFP finale. */
async function extractWeatherCharts(pdf){
  const charts=[];
  const CHART_TEXT_THRESHOLD=300; // caratteri: sotto questa soglia = pagina "grafica"
  const n=pdf.numPages;
  for(let p=2;p<=n-2;p++){
    const page=await pdf.getPage(p);
    const content=await page.getTextContent();
    const textLen=content.items.map(it=>it.str).join('').length;
    if(textLen>CHART_TEXT_THRESHOLD) continue; // troppo testo: è prognosi/narrativa, non una cartina
    try{
      const viewport=page.getViewport({scale:1.5});
      const canvas=document.createElement('canvas');
      canvas.width=viewport.width; canvas.height=viewport.height;
      await page.render({canvasContext:canvas.getContext('2d'), viewport}).promise;
      charts.push({dataUrl:canvas.toDataURL('image/jpeg',0.85), w:viewport.width, h:viewport.height});
    }catch(e){ /* pagina non renderizzabile: la saltiamo */ }
  }
  return charts;
}

/* Legge un PDF di briefing e restituisce SOLO dati: niente scritture nel DOM,
   perche' le due pagine che usano questo file hanno campi diversi. L'aggancio
   all'interfaccia lo fa ciascuna per conto suo.

   @param {ArrayBuffer} buf  il PDF
   @param {{dep:string,dest:string,altn:string}} codes  i codici di rotta
   @return {{printedAt, charts, result, text}} */
async function readBriefingPdf(buf, codes){
  const pdf=await pdfjsLib.getDocument({data:buf}).promise;
  const pageTexts=[];
  for(let p=1;p<=pdf.numPages;p++){
    const page=await pdf.getPage(p);
    const content=await page.getTextContent();
    pageTexts.push(content.items.map(it=>it.str).join(' '));
  }
  const weatherText=pageTexts.join('\n');
  // I NOTAM vengono cercati in TUTTO il documento (non solo le ultime pagine): un
  // NOTAM dell'aeroporto di partenza puo' comparire ovunque, anche vicino a
  // METAR/TAF nella prima pagina — non va mai ignorato solo per la sua posizione.
  const notamText=weatherText;
  // data/ora: prima in pagina 1, poi (se manca) in tutto il documento
  const printedAt = extractPrintedAt(pageTexts[0]||'') || extractPrintedAt(weatherText);
  const charts = await extractWeatherCharts(pdf);
  const result = parseBriefingText(weatherText, notamText, codes);
  return {printedAt, charts, result, text:weatherText};
}

// Parole/abbreviazioni aeronautiche di 4 lettere maiuscole che NON sono mai codici
// ICAO aeroportuali: vanno escluse da qualunque riconoscimento automatico di aeroporto.
const ICAO_EXCLUDE = new Set([
  'AUTO','AMSL','AVBL','SECT','TECR','YOUR','HEMS','PERM','FEW','CAVOK','VRB','EST','DIST','RMK',
  'SCT','BKN','OVC','NSC','NCD','TEMP','TEMPO','BECMG','NOSIG','PROB','INFO','DATA','NOTE','ZULU',
  'FROM','UNTL','WARN','FREQ','WIND','GUST','VIS','CLD','RVR','QNH','QFE','ATIS','FLNC','MISG',
  'MTOW','ZFW','ELEV','SFC','AGL','ARR','DEP','ETA','ETD','UTC','GMT','TWR','RWY','TWY','APRN',
  'COOR','FUEL','WHEN','POLE','BASE','APCH','ONLY','MAKE','FLOW','SURE','WITH',
  // ricorrenti nel formato Skybrief (intestazioni, minime, tabelle vento/pista):
  'CEIL','MINI','FONT','DECO','MASS','TAIL','HEAD','XWND','RWYC','ASPH','GRAS','SNOW','SWLL',
  'NIGH','SIGM','AIRM','WIND','SUNR','SUNS','ALTN','DEST','TORA','TODA','ASDA','LDA',
  'AMDT','SUPP','TRIG','AIRA','ACFT','OPER','SVCS','MAINT','LGTD','UNSE','ABDN','CLSD',
  // ricorrenti nei NOTAM in chiaro:
  'REF','AIP','PART','ITEM','TEXT','DATE','TIME','LOWR','UPPR','AREA','ZONE','LINE','SEE'
]);
/* Lettere iniziali effettivamente assegnate dall'ICAO alle regioni del mondo.
   I, J, Q, X non sono prefissi di nessuna regione: escluderle elimina da sola
   una buona parte dei falsi positivi (ITEM, JOIN, QNHS...). */
const ICAO_FIRST=/^[ABCDEFGHKLMNOPRSTUVWYZ]/;
function isValidIcao(code, codes){
  if(!code || code.length!==4) return false;
  if(!/^[A-Z]{4}$/.test(code)) return false;
  // i codici della rotta pianificata sono sempre validi: li ha scritti il pilota
  if(codes && (code===codes.dep || code===codes.dest || code===codes.altn)) return true;
  if(ICAO_EXCLUDE.has(code)) return false;
  if(!ICAO_FIRST.test(code)) return false;
  return true;
}

function parseBriefingText(weatherText, notamText, codes){
  const norm = weatherText.replace(/[ \t]+/g,' ');
  const normNotam = notamText.replace(/[ \t]+/g,' ');
  const result = {
    dep:{metar:null,speci:null,taf:null,notam:[]},
    dest:{metar:null,speci:null,taf:null,notam:[]},
    altn:{metar:null,speci:null,taf:null,notam:[]},
    other:{}, // { ICAO: {metar,speci,taf,notam:[]} } per aeroporti citati ma non DEP/DEST/ALTN
    enroute:[]
  };
  function otherBucket(code){
    if(!result.other[code]) result.other[code]={metar:null,speci:null,taf:null,notam:[]};
    return result.other[code];
  }
  function keyForCode(code){
    if(code===codes.dep) return 'dep';
    if(code===codes.dest) return 'dest';
    if(code===codes.altn) return 'altn';
    return null;
  }
  /* ---- CONFINE DI UN BOLLETTINO ------------------------------------------------
     I bollettini grezzi finiscono con "=", ma NON sempre: nel formato Skybrief il
     terminatore manca del tutto (il TAF di LIMC si chiude senza "="), e pdf.js
     unisce tutta la pagina con degli spazi, senza a capo. Senza un confine solido
     un TAF si porterebbe dietro l'intera sezione successiva ("DEST ALTN ACV-OM
     § 3.2.16 VIS ≥ 10 km CEIL...").

     Il vecchio taglio "primo codice di 4 lettere maiuscole" era troppo fragile:
     parole come CEIL o SWLL lo facevano scattare nel punto sbagliato. Qui il taglio
     avviene solo su marcatori STRUTTURALI, che in un bollettino aeronautico non
     possono comparire:
       - l'inizio di un altro bollettino  ("LIMC 081250Z", "METAR ...", "TAF ...")
       - un titolo di sezione del briefing (Skybrief e Skybriefing/PIB)
       - un'intestazione di aeroporto ("LIMC Malpensa...", "LSZL - Locarno")
     È lo stesso criterio sia che il testo abbia veri a capo sia che sia una riga sola. */
  const SECTION_WORDS = [
    'METAR','SPECI','TAF','NOTAM','NOTAMS','SIGMET','AIRMET','GAMET','ATIS','PIB',
    'DEST ALTN','INSTRUCTOR MINIMA','STUDENT MINIMA','AD ELEV','VENTO E PISTA',
    'DECOLLO','AVVICINAMENTO','Fonte:','Venti in quota','Immagini Satellitari',
    'CARTA DEI FRONTI','Nessun SIGMET','Aerodrome Forecast','Aerodrome Report'
  ];
  const sectionBoundaryRe = new RegExp('(?:'+SECTION_WORDS.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/ /g,'\\s+')).join('|')+')','g');
  // inizio di un altro bollettino: <ICAO> <DDHHMMZ>, con o senza etichetta davanti
  const bulletinStartRe = /\b[A-Z]{4}\s+\d{6}Z\b/g;
  // intestazione aeroporto: "LIMC Malpensa International Airport" / "LSZL - Locarno"
  const airportHeaderRe = /\b[A-Z]{4}\s*(?:[-–—]\s*[A-Za-z]|[A-Z][a-z]{2})/g;

  function firstIndexAfter(re, text, from){
    re.lastIndex = from;
    const m = re.exec(text);
    return m ? m.index : -1;
  }
  /* Taglia `block` al primo confine strutturale trovato DOPO l'inizio del bollettino
     stesso (si salta il proprio codice ICAO e il proprio gruppo data/ora). */
  function cleanWxBlock(block, ownCode){
    // "=" resta il confine migliore quando c'è: tutto ciò che segue è di un altro bollettino
    const eq = block.indexOf('=');
    if(eq>=0) block = block.slice(0, eq+1);
    // si parte a cercare dopo l'intestazione del bollettino (etichetta + ICAO + DDHHMMZ)
    const own = new RegExp('\\b'+ownCode+'\\b').exec(block);
    let from = own ? own.index+4 : 0;
    const dt = /\d{6}Z/.exec(block.slice(from));
    if(dt) from += dt.index+dt[0].length;
    let cut = block.length;
    [sectionBoundaryRe, bulletinStartRe, airportHeaderRe].forEach(re=>{
      const i = firstIndexAfter(re, block, from);
      if(i>=0 && i<cut) cut=i;
    });
    return block.slice(0, cut).trim();
  }
  // Toglie un'etichetta di bollettino rimasta incollata in coda al blocco (es. "...
  // Q1017= Speci" quando nel testo originale il confine con il prossimo bollettino
  // non era netto) — METAR/SPECI/TAF, case-insensitive, isolata a fine stringa.
  function stripTrailingLabel(block){
    return (block||'').replace(/[\s=]*\b(?:METAR|SPECI|TAF)\b\s*$/i, '').trim();
  }
  function assignWx(code, field, block){
    if(!isValidIcao(code, codes)) return;
    block = stripTrailingLabel(cleanWxBlock(block, code));
    // un blocco che dopo la pulizia resta vuoto non è un bollettino: ignoralo,
    // altrimenti popola la sezione "altri aeroporti" con voci senza contenuto
    if(!block || block.length<8) return;
    const key = keyForCode(code);
    if(key) result[key][field] = result[key][field] || block;
    else otherBucket(code)[field] = otherBucket(code)[field] || block;
  }

  // ---- METAR / SPECI / TAF: trova OGNI blocco nel testo, sia con l'etichetta esplicita
  //      ("METAR <ICAO>...") sia nel formato implicito senza etichetta ("<ICAO> DDHHMMZ..."
  //      per METAR, "<ICAO> [AMD] DDHHMMZ DDHH/DDHH..." per TAF, riconoscibile dal periodo
  //      di validità). Il confine del blocco è il vero terminatore "=" con cui i bollettini
  //      grezzi finiscono SEMPRE (anche multi-riga, es. un TAF con TEMPO su una riga a
  //      parte) — molto più affidabile che indovinare "dove inizia il prossimo bollettino",
  //      perché un TAF può essere seguito da pagine e pagine di testo non aeronautico
  //      (prognosi, grafici) prima del prossimo bollettino o della parola "NOTAM".
  //      Poi smista: DEP/DEST/ALTN nel rispettivo riquadro, altrimenti OTHER AIRPORTS. ----
  function grabAllWxBlocks(kind){
    // Niente più "[^=]": in Skybrief il terminatore "=" può mancare del tutto.
    // Si prende una finestra generosa e ci pensa cleanWxBlock() a tagliarla nel punto giusto.
    //
    // L'etichetta è tollerante alle maiuscole (METAR / Metar / metar), MA il codice
    // ICAO deve essere maiuscolo per forza: con un flag /i globale la frase italiana
    // "METAR/TAF dell'aeroporto non disponibili" veniva letta come il bollettino di
    // un aeroporto chiamato "DELL".
    const label = kind.split('').map(ch=>'['+ch.toUpperCase()+ch.toLowerCase()+']').join('');
    const re = new RegExp(label+'\\s+([A-Z]{4})\\b([\\s\\S]{0,600})','g');
    const out=[]; let m;
    while((m=re.exec(norm))!==null){
      out.push({code:m[1].toUpperCase(), block:(kind+' '+m[1]+m[2]).replace(/\s+/g,' ').trim()});
      // La finestra catturata è volutamente lunga (fino a 600 caratteri) perché il
      // confine vero lo decide cleanWxBlock(). Ma lasciare che lastIndex arrivi in
      // fondo alla finestra farebbe SALTARE i bollettini che stanno lì dentro: la
      // ricerca riparte quindi subito dopo l'intestazione di QUESTO bollettino.
      re.lastIndex = m.index + (m[0].length - m[2].length);
    }
    return out;
  }
  // SPECI: nel formato reale la sezione "Speci" elenca un blocco per aeroporto, spesso
  // "LSZL no data available" quando non c'è un vero bollettino. IMPORTANTE: pdf.js unisce
  // il testo di una pagina con semplici SPAZI, mai veri "a capo" — quindi non si può
  // affidarsi a righe separate da newline. Isoliamo il testo tra "Speci" e la prossima
  // parola chiave di sezione (Taf/Metar/NOTAM), poi troviamo ogni codice ICAO valido al
  // suo interno e assegnamo il testo fino al codice successivo — funziona identico sia
  // che il testo abbia newline puliti sia che sia tutto su una riga sola.
  function grabSpeciSection(){
    const hm = /\bSpeci\b/i.exec(norm);
    if(!hm) return;
    const afterIdx = hm.index+hm[0].length;
    const endM = /\b(?:Taf|Metar|NOTAM)\b/i.exec(norm.slice(afterIdx));
    const sectionEnd = endM ? afterIdx+endM.index : Math.min(norm.length, afterIdx+2000);
    const section = norm.slice(afterIdx, sectionEnd);
    const codeRe = /\b[A-Z]{4}\b/g;
    const positions = []; let cm;
    while((cm=codeRe.exec(section))!==null){
      if(isValidIcao(cm[0], codes)) positions.push({code:cm[0], idx:cm.index});
    }
    positions.forEach((p,i)=>{
      const end = i+1<positions.length ? positions[i+1].idx : section.length;
      const text = section.slice(p.idx, end).replace(/\s+/g,' ').trim();
      if(text) assignWx(p.code, 'speci', text);
    });
  }
  grabSpeciSection();
  // SPECI con etichetta esplicita ("SPECI LIMC 081312Z ..."): stesso trattamento di METAR/TAF.
  ['METAR','SPECI','TAF'].forEach(kind=>{
    grabAllWxBlocks(kind).forEach(({code,block})=> assignWx(code, kind.toLowerCase(), block));
  });
  // TAF implicito: "[AMD] <ICAO> [AMD] DDHHMMZ DDHH/DDHH ..." — il periodo di validità
  // DDHH/DDHH è la firma inequivocabile di un TAF, anche senza l'etichetta "TAF" davanti.
  // AMD può comparire sia prima che dopo il codice. Confine = primo "=" (vedi sopra).
  const tafImplicitRe = /(?:AMD\s+)?\b([A-Z]{4})\b\s+(?:AMD\s+)?(\d{6}Z\s+\d{4}\/\d{4}[\s\S]{0,600})/g;
  let tim;
  while((tim=tafImplicitRe.exec(norm))!==null){
    const code=tim[1].toUpperCase();
    assignWx(code, 'taf', ('TAF '+code+' '+tim[2]).replace(/\s+/g,' ').trim());
    tafImplicitRe.lastIndex = tim.index + (tim[0].length - tim[2].length); // vedi nota in grabAllWxBlocks
  }
  // METAR implicito: "<ICAO> DDHHMMZ ..." SENZA periodo di validità subito dopo
  // (altrimenti sarebbe un TAF, già gestito sopra). Confine = primo "=".
  const metarImplicitRe = /\b([A-Z]{4})\s+(\d{6}Z)\b(?!\s*\d{4}\/\d{4})([\s\S]{0,400})/g;
  let mim;
  while((mim=metarImplicitRe.exec(norm))!==null){
    const code=mim[1].toUpperCase();
    assignWx(code, 'metar', ('METAR '+code+' '+mim[2]+mim[3]).replace(/\s+/g,' ').trim());
    metarImplicitRe.lastIndex = mim.index + (mim[0].length - mim[3].length); // vedi nota in grabAllWxBlocks
  }

  // ---- NOTAM: cercati in TUTTO il documento (normNotam contiene ogni pagina).
  //      Un'intestazione di aeroporto viene riconosciuta SOLO in due forme sicure,
  //      mai dentro il testo E) libero di un NOTAM (altrimenti parole qualsiasi
  //      come "LONG"/"OBST" verrebbero scambiate per nuovi aeroporti):
  //      1) "<ICAO> ... NOTAM/NOTAMS" — titolo di sezione, anche lontano dal numero
  //      2) "<ICAO>" a inizio riga, subito prima del numero NOTAM (prefisso inline)
  //      Ogni NOTAM eredita l'ultima intestazione confermata, così una lista con
  //      l'intestazione scritta una sola volta in cima viene assegnata per intero
  //      allo stesso aeroporto. ----
  const notamNumRe = /\b[A-Z]\d{3,5}\/\d{2}\b/g;
  const notamStarts=[]; let nmIdx;
  while((nmIdx=notamNumRe.exec(normNotam))!==null) notamStarts.push(nmIdx.index);

  const headers=[];
  const sectionTitleRe = /\b([A-Z]{4})\s+NOTAMS?\b/g;
  let shm;
  while((shm=sectionTitleRe.exec(normNotam))!==null){
    // rischioso da usare come confine di troncamento: frasi normali come "SEE LSZL
    // NOTAM FOR DETAILS" combaciano con questo pattern pur non essendo un titolo di
    // sezione — va bene per il CONTESTO, mai per tagliare il testo di un NOTAM.
    if(isValidIcao(shm[1], codes)) headers.push({code:shm[1], idx:shm.index, safeTrim:false});
  }
  // formato reale Skybriefing/PIB: "LSZL - Locarno", "LIMZ - Cuneo/Levaldigi" ecc.
  // (codice ICAO, trattino, nome città) — molto più comune di "ICAO NOTAMS" nei
  // briefing veri, e ogni singolo NOTAM lì sotto è prefissato solo con un codice
  // FIR/nazionale di 2 lettere (es. "LS", "LI"), non con l'ICAO per intero.
  // Trattino ASCII, en dash e em dash: Skybrief usa "—", i PIB classici "-".
  const sectionDashRe = /\b([A-Z]{4})\b\s*[-–—]\s*(?=[A-Za-z])/g;
  while((shm=sectionDashRe.exec(normNotam))!==null){
    if(isValidIcao(shm[1], codes)) headers.push({code:shm[1], idx:shm.index, safeTrim:true});
  }
  // Formato Skybrief: "LIMC Malpensa International Airport — Milan", seguito da
  // "AD ELEV ...". Sono due firme indipendenti, entrambe sicure: il codice ICAO
  // seguito da un nome proprio che termina in Airport/Airfield/Aerodrome, oppure
  // dal blocco "AD ELEV" che nel formato compare sempre subito sotto l'intestazione.
  const namedHeaderRe = /\b([A-Z]{4})\s+(?=[A-Z][a-z][^\n]{0,60}?\b(?:Airport|Airfield|Aerodrome|Airbase|Intl|International)\b)/g;
  while((shm=namedHeaderRe.exec(normNotam))!==null){
    if(isValidIcao(shm[1], codes)) headers.push({code:shm[1], idx:shm.index, safeTrim:true});
  }
  const adElevHeaderRe = /\b([A-Z]{4})\b(?=[^\n]{0,80}?\bAD\s+ELEV\b)/g;
  while((shm=adElevHeaderRe.exec(normNotam))!==null){
    if(isValidIcao(shm[1], codes)) headers.push({code:shm[1], idx:shm.index, safeTrim:true});
  }
  // Prefisso inline: "<ICAO> A1234/26". Prima richiedeva un vero a capo davanti
  // ((?:^|\n)), quindi con pdf.js — che unisce la pagina con soli spazi — non
  // scattava MAI. Il numero NOTAM subito dopo è già una firma inequivocabile:
  // basta un confine di parola.
  const inlinePrefixRe = /\b([A-Z]{4})\s+(?=[A-Z]\d{3,5}\/\d{2}\b)/g;
  while((shm=inlinePrefixRe.exec(normNotam))!==null){
    if(isValidIcao(shm[1], codes)) headers.push({code:shm[1], idx:shm.index, safeTrim:true});
  }
  // se lo stesso codice compare più volte nella stessa posizione (due regole che
  // hanno agganciato la stessa intestazione) ne resta una sola
  const seenHdr=new Set();
  headers.sort((a,b)=>a.idx-b.idx);
  const uniqHeaders = headers.filter(h=>{ const k=h.code+'@'+h.idx; if(seenHdr.has(k)) return false; seenHdr.add(k); return true; });
  headers.length=0; uniqHeaders.forEach(h=>headers.push(h));

  function headerBefore(idx){
    let found=null;
    for(const h of headers){ if(h.idx<=idx) found=h; else break; }
    return found;
  }
  function nextHeaderAfter(idx){
    for(const h of headers){ if(h.idx>idx && h.safeTrim) return h; }
    return null;
  }

  notamStarts.forEach((idx,i)=>{
    const h = headerBefore(idx);
    const headerCode = h ? h.code : null;
    const nextStart = notamStarts[i+1];
    const nh = nextHeaderAfter(idx);
    // il blocco si ferma alla prossima intestazione (se ce n'è una prima del prossimo
    // NOTAM) o all'inizio del prossimo NOTAM, cosi' non si tronca mai il testo E)
    let blockEnd = nextStart!=null ? nextStart : normNotam.length;
    if(nh && (nextStart==null || nh.idx<nextStart)) blockEnd = nh.idx;
    const block = normNotam.slice(idx, blockEnd).replace(/\s+/g,' ').trim();

    // REGOLA D'ORO — priorità assoluta: se il testo del NOTAM cita esplicitamente
    // "REF AIP AD 2 <ICAO>", l'attribuzione usa QUEL codice, anche se diverso
    // dall'intestazione di sezione sotto cui il NOTAM si trova nel documento.
    const aipRef = /REF\s+AIP\s+AD\s*2\s+([A-Z]{4})\b/i.exec(block);
    const aipCode = (aipRef && isValidIcao(aipRef[1].toUpperCase(), codes)) ? aipRef[1].toUpperCase() : null;
    const currentCode = aipCode || headerCode;

    if(currentCode===codes.dep) result.dep.notam.push(block);
    else if(currentCode===codes.dest) result.dest.notam.push(block);
    else if(currentCode===codes.altn) result.altn.notam.push(block);
    else if(currentCode) otherBucket(currentCode).notam.push(block);
    else result.enroute.push(block);
  });

  // Se ALTERNATE coincide col DEPARTURE, l'alternato eredita gli stessi dati/NOTAM
  // del departure invece di restare vuoto — non ha senso duplicare la ricerca nel
  // testo, i dati sono letteralmente gli stessi aeroporto.
  if(codes.altn && codes.dep && codes.altn===codes.dep){
    result.altn.metar = result.altn.metar || result.dep.metar;
    result.altn.speci = result.altn.speci || result.dep.speci;
    result.altn.taf = result.altn.taf || result.dep.taf;
    if(!result.altn.notam.length) result.altn.notam = result.dep.notam.slice();
  }
  return result;
}

