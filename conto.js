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
  if(m) m.setAttribute('content', document.documentElement.getAttribute('data-tema')==='chiaro' ? '#eee7d9' : '#151d28');
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

  tema(){
    const b=Conto.$('btnTema'); if(!b) return;
    b.addEventListener('click',(e)=>{
      const t=document.documentElement.getAttribute('data-tema')==='chiaro'?'scuro':'chiaro';
      const applica=()=>{
        document.documentElement.setAttribute('data-tema',t);
        coloreBarra();
        try{ localStorage.setItem('ofp_tema',t); }catch(e){}
      };
      /* come nel sito: il nuovo tema si allarga come un cerchio dal pulsante */
      const ridotto=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(e.detail===0 || !document.startViewTransition){ applica(); return; }
      if(ridotto){ document.startViewTransition(applica); return; }
      const r=b.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2;
      const R=Math.hypot(Math.max(x,innerWidth-x), Math.max(y,innerHeight-y));
      document.startViewTransition(applica).ready.then(()=>{
        document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${R}px at ${x}px ${y}px)`]},
          {duration:400, easing:'cubic-bezier(0.77,0,0.175,1)', pseudoElement:'::view-transition-new(root)'});
      }).catch(()=>{});
    });
  },

  /* La copertina dell'accesso: l'aereo vola la rotta disegnata nella pagina e
     la traccia in magenta dietro di se'. Il muso segue la direzione del moto,
     nelle virate le ali si stringono come se inclinasse, l'ombra si stacca al
     decollo e si riavvicina all'atterraggio; ogni punto compare quando l'aereo
     ci arriva. E' il momento raro del sito (una volta per visita), quindi puo'
     durare: ~4,8 s in tutto, senza bloccare niente.
     Con "riduci movimento" la mappa resta com'e' nella pagina, gia' completa.
     La posizione la calcola lo script a ogni fotogramma (getPointAtLength):
     la linea e l'aereo leggono lo stesso numero, quindi non si separano mai. */
  copertina(id){
    const svg=document.getElementById(id);
    if(!svg || !svg.animate) return;
    if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tratta=svg.querySelector('.tratta'), aereo=document.getElementById('eroeAereo'), ombra=document.getElementById('eroeOmbra');
    const L=tratta.getTotalLength();
    /* punti: la distanza lungo la rotta del passaggio piu' vicino */
    const sulla=(x,y)=>{ let best=0,bd=1e9; for(let s=0;s<=L;s+=1){ const q=tratta.getPointAtLength(s), d=Math.hypot(q.x-x,q.y-y); if(d<bd){bd=d;best=s;} } return best; };
    const punti=[...svg.querySelectorAll('.punto')].map(g=>({g, pop:g.querySelector('.pop'),
      s: g.dataset.s!=null ? +g.dataset.s : sulla(+g.dataset.x,+g.dataset.y)}));
    /* rullaggio che accelera, crociera costante, arrivo morbido */
    const B=(t,a,b)=>3*(1-t)*(1-t)*t*a+3*(1-t)*t*t*b+t*t*t;
    const volo=x=>{ if(x<=0) return 0; if(x>=1) return 1; let lo=0,hi=1; for(let i=0;i<32;i++){ const m=(lo+hi)/2; if(B(m,.5,.3)<x) lo=m; else hi=m; } return B((lo+hi)/2,0,1); };
    const posa=(s,quota,incl)=>{
      const a=tratta.getPointAtLength(Math.max(0,s-1.5)), b=tratta.getPointAtLength(Math.min(L,s+1.5)), q=tratta.getPointAtLength(s);
      const h=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+90, sc=1.45*(1+quota*.12), ali=1-incl*.38;
      aereo.setAttribute('transform',`translate(${q.x.toFixed(2)} ${q.y.toFixed(2)}) rotate(${h.toFixed(2)}) scale(${(sc*ali).toFixed(3)} ${sc.toFixed(3)})`);
      ombra.setAttribute('transform',`translate(${(q.x+quota*7).toFixed(2)} ${(q.y+quota*9).toFixed(2)}) rotate(${h.toFixed(2)}) scale(${(1.45*ali).toFixed(3)} 1.45)`);
      return h;
    };
    const easeOut='cubic-bezier(0.23,1,0.32,1)';
    tratta.style.strokeDasharray=`${L} ${L}`; tratta.style.strokeDashoffset=L;
    punti.forEach(p=>{ p.g.style.opacity=0; p.visto=false; });
    posa(0,0,0); aereo.style.opacity=0;
    /* 300 ms: compare DEP con l'aereo in testata pista */
    const dep=punti[0]; dep.visto=true;
    dep.g.animate([{opacity:0},{opacity:1}],{duration:300,delay:300,easing:'ease',fill:'forwards'});
    dep.pop.animate([{transform:'scale(.5)'},{transform:'none'}],{duration:380,delay:300,easing:easeOut,fill:'backwards'});
    aereo.animate([{opacity:0},{opacity:1}],{duration:260,delay:420,easing:'ease',fill:'backwards'}); aereo.style.opacity='';
    const T0=performance.now()+560, DUR=4200;
    let hPrima=null, sPrima=0, incl=0;
    const frame=now=>{
      const u=Math.min(1,Math.max(0,(now-T0)/DUR)), s=volo(u)*L;
      /* stacco dopo 14 di corsa, salita in 60; discesa sugli ultimi 80, contatto a 14 dalla fine */
      let quota=Math.min(1,Math.max(0,(s-14)/60),Math.max(0,(L-14-s)/66));
      quota=quota*quota*(3-2*quota);
      tratta.style.strokeDashoffset=L-s;
      const h=posa(s,quota,incl);
      if(hPrima!==null && s>sPrima+.01){
        const dh=((h-hPrima+540)%360)-180;
        incl+=(Math.min(1,Math.abs(dh)/(s-sPrima)/5)*quota-incl)*.22;   // gradi per unita' di rotta -> inclinazione
      } else incl*=.8;
      hPrima=h; sPrima=s;
      ombra.setAttribute('opacity',quota>.02?1:0);
      for(const p of punti) if(!p.visto && s>=p.s-26){
        p.visto=true;
        p.g.animate([{opacity:0},{opacity:1}],{duration:260,easing:'ease',fill:'forwards'});
        p.pop.animate([{transform:'scale(.5)'},{transform:'none'}],{duration:380,easing:easeOut});
      }
      if(u<1) requestAnimationFrame(frame);
      else { posa(L,0,0); ombra.setAttribute('opacity',0); tratta.style.strokeDashoffset=0;
             punti.forEach(p=>{ p.g.style.opacity=''; p.g.getAnimations().forEach(a=>a.cancel()); }); }
    };
    requestAnimationFrame(frame);
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
