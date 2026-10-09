/* ROTTA AV — la mappa che si vola da sola, sulla pagina di accesso e sulla
   scheda "New flight" della Dashboard.

   La rotta disegna l'AV del logo dell'Aeroclub di Varese: decollo da DEP,
   passaggio sul reporting point LNN1, atterraggio a DEST. Due soli livelli
   orizzontali (y 110 e 199, gradino a 179) e diagonali tutte a 45 gradi,
   quindi le gambe parallele sono parallele davvero; raccordi di 6 nelle virate.

   Come sul GPS: magenta la rotta gia' volata, puntini chiari quella da fare.
   L'aereo traccia la linea dietro di se': il muso segue la direzione del moto,
   nelle virate le ali si stringono come se inclinasse, l'ombra si stacca al
   decollo e si riavvicina all'atterraggio, ogni punto compare quando l'aereo
   ci arriva. Linea e aereo leggono la stessa posizione a ogni fotogramma
   (getPointAtLength), quindi non si separano mai.

   E' il momento raro del sito (una volta per visita): puo' durare ~4,8 s, e
   non blocca niente. Con "riduci movimento" la mappa compare gia' completa.
   I colori vengono dai token del tema della pagina (--attivo, --accent-2,
   --txt, --txt-dim, --panel-bg), quindi seguono scuro, chiaro e notte. */
(function(){
  const ROTTA='M70 270L156.76 183.24Q161 179 155 179L121 179Q115 179 110.76 183.24L99.24 194.76Q95 199 89 199L30 199Q24 199 28.24 194.76L108.76 114.24Q113 110 119 110L191 110Q197 110 201.24 114.24L281.76 194.76Q286 199 292 199L360 199Q366 199 370.24 194.76L450.76 114.24Q455 110 449 110L389 110Q383 110 378.76 114.24L333.24 159.76Q329 164 324.76 159.76L297.24 132.24Q293 128 297.24 123.76L381 40';
  const AEREO='M0 -7 L1.6 -2 L7.5 1 L7.5 2.6 L1.6 1.2 L1.2 5 L3.2 6.4 L3.2 7.4 L0 6.6 L-3.2 7.4 L-3.2 6.4 L-1.2 5 L-1.6 1.2 L-7.5 2.6 L-7.5 1 L-1.6 -2 Z';
  const STILE=`
.rotta-av svg{display:block;width:100%;height:100%;overflow:visible}
.rotta-av .anello{fill:none;stroke:color-mix(in srgb,var(--accent-2) 18%,transparent);stroke-width:1}
.rotta-av .tacche{fill:none;stroke:color-mix(in srgb,var(--accent-2) 38%,transparent);stroke-width:7;stroke-dasharray:.6 4.4}
.rotta-av .tacche-30{fill:none;stroke:color-mix(in srgb,var(--accent-2) 72%,transparent);stroke-width:12;stroke-dasharray:1 29;stroke-dashoffset:.5}
.rotta-av .nord{font:700 13px ui-monospace,"SF Mono",Menlo,monospace;fill:var(--accent-2)}
.rotta-av .bussola{transform-box:view-box;transform-origin:240px 155px}
.rotta-av .previsto{fill:none;stroke:color-mix(in srgb,var(--txt) 28%,transparent);stroke-width:1.6;stroke-dasharray:2 6;stroke-linecap:round}
.rotta-av .tratta{fill:none;stroke:var(--attivo);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;
  filter:drop-shadow(0 0 7px color-mix(in srgb,var(--attivo) 55%,transparent))}
.rotta-av .apt{fill:var(--attivo)}
.rotta-av .apt-pista{stroke:var(--panel-bg);stroke-width:2;stroke-linecap:round}
.rotta-av .rp{fill:none;stroke:var(--txt);stroke-width:2.2;stroke-linejoin:round}
.rotta-av .etichetta{font:600 11px ui-monospace,"SF Mono",Menlo,monospace;letter-spacing:.12em;fill:var(--txt-dim)}
.rotta-av .etichetta.forte{fill:var(--txt)}
.rotta-av .aereo{fill:var(--txt)}
.rotta-av .ombra{fill:rgba(0,0,0,.55);filter:blur(1.2px)}
html[data-tema="chiaro"] .rotta-av .ombra{fill:rgba(60,40,20,.35)}
.rotta-av .pop{transform-box:fill-box;transform-origin:center}
.rotta-av.in-volo .anello{animation:rav-dissolvi 700ms ease both}
.rotta-av.in-volo .bussola{animation:rav-bussola 1100ms cubic-bezier(0.23,1,0.32,1) 80ms both}
.rotta-av.in-volo .previsto{animation:rav-dissolvi 600ms ease 250ms both}
@keyframes rav-dissolvi{from{opacity:0}}
@keyframes rav-bussola{from{opacity:0;transform:rotate(-24deg) scale(.96)}to{opacity:1;transform:none}}`;

  function stile(){
    if(document.getElementById('rotta-av-stile')) return;
    const s=document.createElement('style'); s.id='rotta-av-stile'; s.textContent=STILE;
    document.head.appendChild(s);
  }

  /* Disegna la mappa completa (aereo atterrato a DEST) dentro el. */
  function monta(el, allinea){
    if(!el) return null;
    stile();
    el.classList.add('rotta-av');
    el.setAttribute('aria-hidden','true');
    el.innerHTML=`<svg viewBox="0 0 480 310" preserveAspectRatio="${allinea||'xMidYMid meet'}">
  <circle class="anello" cx="240" cy="155" r="56"/><circle class="anello" cx="240" cy="155" r="136"/>
  <g class="bussola"><circle class="anello" cx="240" cy="155" r="108"/>
    <circle class="tacche" cx="240" cy="155" r="108" pathLength="360"/><circle class="tacche-30" cx="240" cy="155" r="108" pathLength="360"/>
    <text class="nord" x="240" y="33" text-anchor="middle">N</text></g>
  <path class="previsto" d="${ROTTA}"/>
  <path class="tratta" d="${ROTTA}"/>
  <g class="punto" data-s="0"><circle class="apt pop" cx="70" cy="270" r="7"/><line class="apt-pista" x1="66.5" y1="273.5" x2="73.5" y2="266.5"/>
    <text class="etichetta" x="82" y="286">DEP</text></g>
  <g class="punto" data-x="155" data-y="110"><path class="rp pop" d="M155 139 L162 151 L148 151 Z"/>
    <text class="etichetta forte" x="155" y="130" text-anchor="middle">LNN1</text></g>
  <g class="punto" data-x="381" data-y="40"><circle class="apt pop" cx="381" cy="40" r="7"/><line class="apt-pista" x1="377.5" y1="43.5" x2="384.5" y2="36.5"/>
    <text class="etichetta forte" x="393" y="32">DEST</text></g>
  <g class="ombra" opacity="0"><path d="${AEREO}"/></g>
  <g class="velivolo" transform="translate(381 40) rotate(45) scale(1.45)"><path class="aereo" d="${AEREO}"/></g>
</svg>`;
    return el;
  }

  /* Fa volare la rotta. L'elemento deve essere visibile (si misura la linea). */
  function vola(el){
    const svg=el && el.querySelector('svg');
    if(!svg || !svg.animate || !window.requestAnimationFrame) return;
    if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tratta=svg.querySelector('.tratta'), aereo=svg.querySelector('.velivolo'), ombra=svg.querySelector('.ombra');
    const L=tratta.getTotalLength();
    if(!L) return;
    el.classList.remove('in-volo'); void el.offsetWidth; el.classList.add('in-volo');
    /* punti: la distanza lungo la rotta del passaggio piu' vicino */
    const sulla=(x,y)=>{ let best=0,bd=1e9; for(let s=0;s<=L;s+=1){ const q=tratta.getPointAtLength(s), d=Math.hypot(q.x-x,q.y-y); if(d<bd){bd=d;best=s;} } return best; };
    const punti=[...svg.querySelectorAll('.punto')].map(g=>({g, pop:g.querySelector('.pop'),
      s: g.dataset.s!=null ? +g.dataset.s : sulla(+g.dataset.x,+g.dataset.y)}));
    /* rullaggio che accelera, crociera costante, arrivo morbido: cubic-bezier(.5,0,.3,1) */
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
    posa(0,0,0);
    /* 300 ms: compare DEP con l'aereo in testata pista */
    const dep=punti[0]; dep.visto=true;
    dep.g.animate([{opacity:0},{opacity:1}],{duration:300,delay:300,easing:'ease',fill:'forwards'});
    dep.pop.animate([{transform:'scale(.5)'},{transform:'none'}],{duration:380,delay:300,easing:easeOut,fill:'backwards'});
    aereo.animate([{opacity:0},{opacity:1}],{duration:260,delay:420,easing:'ease',fill:'backwards'});
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
      else {
        posa(L,0,0); ombra.setAttribute('opacity',0); tratta.style.strokeDashoffset=0;
        punti.forEach(p=>{ p.g.style.opacity=''; p.g.getAnimations().forEach(a=>a.cancel()); });
        el.classList.remove('in-volo');
      }
    };
    requestAnimationFrame(frame);
  }

  window.RottaAV={ monta, vola };
})();
