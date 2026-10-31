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
/* colore della barra di stato del telefono, per tema */
function coloreBarra(){
  const m=document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute('content', document.documentElement.getAttribute('data-tema')==='chiaro' ? '#e5e5e2' : '#171719');
}
document.addEventListener('DOMContentLoaded', coloreBarra);

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

  /* La scelta del tema, come nel sito (ofp-core.js, "TEMA CHIARO / SCURO"):
     un piccolo menu sotto il pulsante con Notte, Giorno e Come il sistema; il
     nuovo tema si allarga come un cerchio dal pulsante (View Transitions), o
     con un velo dello stesso colore dove non ci sono. */
  tema(){
    const b=Conto.$('btnTema'); if(!b) return;
    const html=document.documentElement, K='ofp_tema', FONDO={scuro:'#171719',chiaro:'#e5e5e2'};
    const sis=window.matchMedia?window.matchMedia('(prefers-color-scheme: light)'):null;
    const scelto=()=>{ try{ const v=localStorage.getItem(K); return v==='chiaro'||v==='scuro'?v:'auto'; }catch(e){ return 'auto'; } };
    const diSistema=()=>sis&&sis.matches?'chiaro':'scuro';
    const applica=(v)=>{ const t=v==='auto'?diSistema():v; html.setAttribute('data-tema',t); coloreBarra();
      try{ if(v==='auto') localStorage.removeItem(K); else localStorage.setItem(K,t); }catch(e){} };
    const anima=(fn,dopo,tastiera)=>{
      const rid=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(tastiera){ fn(); return; }
      const r=b.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2;
      const R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
      const c=[`circle(0px at ${x}px ${y}px)`,`circle(${R}px at ${x}px ${y}px)`];
      if(document.startViewTransition){
        html.classList.add('vt-tema');
        const vt=document.startViewTransition(fn);
        vt.ready.then(()=>html.animate(rid?{opacity:[0,1]}:{clipPath:c},{duration:rid?200:450,easing:rid?'ease':'cubic-bezier(0.77,0,0.175,1)',pseudoElement:'::view-transition-new(root)'})).catch(()=>{});
        vt.finished.finally(()=>html.classList.remove('vt-tema'));
        return;
      }
      if(rid||!html.animate){ fn(); return; }
      const v=document.createElement('div');
      v.style.cssText=`position:fixed;inset:0;z-index:2147483646;pointer-events:none;background:${FONDO[dopo]};clip-path:${c[0]}`;
      document.body.appendChild(v);
      v.animate({clipPath:c},{duration:420,easing:'cubic-bezier(0.77,0,0.175,1)',fill:'forwards'}).finished
        .then(()=>{ fn(); return v.animate({opacity:[1,0]},{duration:200,easing:'ease',fill:'forwards'}).finished; })
        .catch(()=>fn()).finally(()=>v.remove());
    };
    const ICO={auto:'<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none"/>',
      scuro:'<path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"/>',
      chiaro:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2M12 19.6v2M2.4 12h2M19.6 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>'};
    const pop=document.createElement('div'); pop.className='tema-pop'; pop.setAttribute('role','menu'); pop.setAttribute('aria-label','Theme');
    pop.innerHTML='<p class="tema-pop-t">Theme</p>'+[['scuro','Night'],['chiaro','Day'],['auto','Match system']].map(([v,l])=>
      `<button type="button" role="menuitemradio" data-scelta="${v}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICO[v]}</svg><span>${l}</span><svg class="spunta" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button>`).join('');
    document.body.appendChild(pop);
    const chiudi=(f)=>{ if(!pop.classList.contains('open')) return; pop.classList.remove('open'); b.setAttribute('aria-expanded','false'); if(f) b.focus(); };
    b.setAttribute('aria-haspopup','menu'); b.setAttribute('aria-expanded','false'); b.removeAttribute('title');
    b.addEventListener('click',(e)=>{
      e.stopPropagation();
      if(pop.classList.contains('open')){ chiudi(e.detail===0); return; }
      pop.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x.dataset.scelta===scelto()?'true':'false'));
      const r=b.getBoundingClientRect(), W=pop.offsetWidth||200;
      pop.style.left=Math.max(8,Math.min(r.right-W,innerWidth-W-8))+'px'; pop.style.top=(r.bottom+8)+'px'; pop.style.transformOrigin='right top';
      pop.classList.add('open'); b.setAttribute('aria-expanded','true');
      if(e.detail===0) (pop.querySelector('[aria-checked="true"]')||pop.querySelector('button')).focus();
    });
    pop.addEventListener('click',(e)=>{
      const x=e.target.closest('button'); if(!x) return;
      const v=x.dataset.scelta, dopo=v==='auto'?diSistema():v;
      pop.style.transition='none'; chiudi(e.detail===0); void pop.offsetWidth; pop.style.transition='';
      if(dopo===html.getAttribute('data-tema')){ applica(v); return; }
      anima(()=>applica(v), dopo, e.detail===0);
    });
    document.addEventListener('pointerdown',(e)=>{ if(!pop.contains(e.target)&&!b.contains(e.target)) chiudi(false); },true);
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') chiudi(true); });
    window.addEventListener('resize',()=>chiudi(false));
    if(sis&&sis.addEventListener) sis.addEventListener('change',()=>{ if(scelto()==='auto'){ const d=diSistema(); if(d!==html.getAttribute('data-tema')) anima(()=>applica('auto'), d, false); } });
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
