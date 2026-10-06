/* Script comune alle pagine dell'account. Si carica nell'<head>: applica il
   tema prima che la pagina si disegni, come fanno le altre pagine del sito. */
"use strict";
(function(){
  try{
    var t=localStorage.getItem('ofp_tema');
    if(!t) t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'chiaro':'scuro';
    document.documentElement.setAttribute('data-tema', t);
  }catch(e){ document.documentElement.setAttribute('data-tema','scuro'); }
})();

const Conto = {
  $: (id)=>document.getElementById(id),

  /* Chiamata alle API: JSON in andata e ritorno, errore leggibile se va male. */
  async chiama(metodo, url, dati){
    const r=await fetch(url,{ method:metodo, credentials:'same-origin',
      headers: dati!==undefined ? {'Content-Type':'application/json'} : {},
      body: dati!==undefined ? JSON.stringify(dati) : undefined });
    let j={}; try{ j=await r.json(); }catch(e){}
    if(!r.ok){ const err=new Error(j.errore || ('Error '+r.status)); err.stato=r.status; throw err; }
    return j;
  },

  /* Dove andare dopo l'accesso: solo percorsi interni. */
  prossima(){
    const n=new URLSearchParams(location.search).get('next');
    return (n && n.startsWith('/') && !n.startsWith('//') && !n.startsWith('/\\')) ? n : '/';
  },

  messaggio(id, testo, tipo){
    const el=Conto.$(id); if(!el) return;
    el.textContent=testo||''; el.className='msg '+(tipo||'err'); el.hidden=!testo;
  },

  /* Un modulo che si invia una volta sola, con il pulsante bloccato mentre aspetta. */
  modulo(id, invia){
    const f=Conto.$(id), b=f.querySelector('button[type=submit]');
    f.addEventListener('submit', async (e)=>{
      e.preventDefault();
      if(b.disabled) return;
      b.disabled=true;
      try{ await invia(new FormData(f)); }
      finally{ b.disabled=false; }
    });
  },

  tema(){
    const b=Conto.$('btnTema'); if(!b) return;
    b.addEventListener('click',()=>{
      const t=document.documentElement.getAttribute('data-tema')==='chiaro'?'scuro':'chiaro';
      document.documentElement.setAttribute('data-tema',t);
      try{ localStorage.setItem('ofp_tema',t); }catch(e){}
    });
  },

  /* Uscendo si cancella da questo browser la copia locale dei voli, cosi' su un
     dispositivo condiviso chi entra dopo non la trova. Se c'e' qualcosa non
     ancora arrivato al server, prima si chiede. */
  async esci(){
    let pendenti=0;
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i);
        if(k && k.startsWith('ofp_pending:')){ const v=JSON.parse(localStorage.getItem(k)||'{}'); pendenti+=Object.keys(v).length; }
      }
    }catch(e){}
    if(pendenti && !confirm(pendenti+' change(s) to your flights have not reached the server yet and will be lost. Sign out anyway?')) return;
    try{ await Conto.chiama('POST','/api/auth/logout'); }catch(e){}
    try{
      const via=[];
      for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k && (k.startsWith('saved_flights:') || k.startsWith('ofp_pending:') || k==='ofp_utente')) via.push(k); }
      via.forEach(k=>localStorage.removeItem(k));
      sessionStorage.clear();
    }catch(e){}
    location.href='/login';
  }
};
document.addEventListener('DOMContentLoaded', ()=>Conto.tema());
