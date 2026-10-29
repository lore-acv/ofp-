/* SFOGLIA — il motore del manuale sfogliabile.

   Un foglio vero, non un'immagine che ruota. Il foglio che si gira e' una
   lamina divisa in strisce verticali (parallele alla costola); ogni striscia e'
   un piano 3D, e insieme seguono una curva continua: il foglio si incurva.
   Ogni striscia porta due facce: davanti la pagina che si gira, dietro la
   pagina che compare dall'altra parte. Le facce sono copie della pagina vera,
   ritagliate alla larghezza della striscia; a riposo si vede solo la pagina
   vera (testo nitido, link e lente che funzionano).

   La fisica (apple-design, emil-design-eng):
   - il bordo del foglio segue il dito 1:1, rispettando il punto in cui e'
     stato preso; la parte verso la costola lo insegue con una molla, quindi
     il foglio si piega da solo quando si muove e si distende quando si ferma;
   - al rilascio la velocita' del dito passa alla molla senza scalini, e la
     proiezione del moto decide se la girata si completa o torna indietro;
   - in volo libero la costola precede e il bordo resta indietro, come la carta
     nell'aria; all'atterraggio il foglio tocca la pagina e rimbalza appena;
   - tutto si puo' riprendere a meta': il foglio in volo si afferra dal punto
     in cui si trova, e un comando nel verso opposto lo riporta indietro;
   - in fondo al libro il foglio si solleva con una resistenza crescente e
     torna giu' (rubber band), invece di fermarsi di colpo;
   - le copertine sono rigide: non si piegano e girano piu' lente.

   Le ombre: ogni striscia e' illuminata secondo la sua inclinazione (una luce
   dall'alto a sinistra, davanti al lettore); il foglio sollevato getta
   un'ombra sulle pagine sotto, piu' larga e piu' chiara quanto piu' e' alto;
   la piega della costola si scurisce quando il foglio e' in piedi.

   Solo transform e opacity cambiano a ogni fotogramma, piu' il gradiente di
   luce delle strisce. Con "riduci movimento" niente girata: la pagina cambia
   con una breve dissolvenza. */
(function(){
"use strict";

const FIS={
  giro:     {risposta:.62, smorz:.84},  // girata che si completa: un filo di slancio, poi l'atterraggio
  ritorno:  {risposta:.34, smorz:1},    // girata annullata: torna giu' senza oscillare
  rigida:   {risposta:.74, smorz:.92},  // copertina: piu' pesante
  cerniera: {risposta:.15, smorz:.72},  // la parte verso la costola insegue il bordo
  tenuta:.38,     // quanto si incurva il foglio tenuto per il bordo (radianti al centro della girata)
  volo:.28,       // quanto la costola precede il bordo in volo libero
  esp:1.5,        // la curvatura si concentra verso il bordo
  rimbalzo:.12,   // energia che resta all'atterraggio
  spinta:2.4,     // rad/s: la girata da comando parte subito, non da ferma
  proietta:.2,    // s: dove andrebbe il dito lasciato, per decidere il verso
  sbirciata:.2,   // rad: l'angolo sollevato sotto il mouse sul bordo
  elastico:.55    // rad: il massimo che si solleva l'ultima pagina
};
const LUCE=(()=>{ const x=-.22, z=.97, n=Math.hypot(x,z); return {x:x/n, z:z/n}; })();
const PI=Math.PI;
const molla=(p)=>({k:(2*PI/p.risposta)**2, c:4*PI*p.smorz/p.risposta});
const clamp=(v,a,b)=>v<a?a:v>b?b:v;

function Sfoglia(radice, opz){
  this.r=radice; this.o=opz;
  this.pagine=opz.pagine;            // elementi .pg alla misura logica
  this.N=this.pagine.length;
  this.W=opz.w; this.H=opz.h;
  this.rigide=new Set(opz.rigide||[]);
  this.moto=opz.moto!==false;
  this.fogli=[];                     // fogli in volo, nell'ordine in cui sono partiti
  this.verso=0;                      // verso della catena in volo (+1 avanti, -1 indietro)
  this.cache=new Map();
  this.raf=0; this.t0=0;
  this.costruisci();
  this.misura(opz.pw, opz.ph, opz.doppia, true);
  this.cur=this.spreadDi(clamp(opz.inizio||0,0,this.N-1));
  this.assegnaFermi();
  this.eventi();
  this.preparaVicini();
}

const P=Sfoglia.prototype;

/* ------------------------------------------------------------ struttura */
P.costruisci=function(){
  const r=this.r; r.innerHTML=''; r.classList.add('lb');
  const el=(cls,dentro)=>{ const d=document.createElement('div'); d.className=cls; (dentro||r).appendChild(d); return d; };
  this.ombraSx=el('lb-ombra sx'); this.ombraDx=el('lb-ombra dx');
  this.taglioSx=el('lb-taglio sx'); this.taglioDx=el('lb-taglio dx');
  this.fermoSx=el('lb-fermo sx'); this.fermoDx=el('lb-fermo dx');
  const vSx=el('lb-velo sx'), vDx=el('lb-velo dx');
  this.castSx=el('lb-cast', vSx); this.castDx=el('lb-cast', vDx);
  this.gola=el('lb-gola');
  this.scena=el('lb-scena'); this.aria=el('lb-aria', this.scena);
  this.aria.style.width=2*this.W+'px'; this.aria.style.height=this.H+'px';
  this.strisce=Math.max(10, Math.round(this.W/28));
};

/* pw, ph: misura vera di una pagina in px; doppia: due pagine affiancate */
P.misura=function(pw, ph, doppia, primo){
  const cambiaModo = !primo && doppia!==this.doppia;
  if(cambiaModo){
    this.chiudiVoli();
    // tornando a una pagina sola si riprende quella che si leggeva prima, se e' ancora in vista
    const [a,b]=this.visibili();
    const i = !doppia && this.singola!=null && this.singola>=a && this.singola<=b ? this.singola : a;
    if(doppia) this.singola=a;
    this.doppia=doppia; this.cache.forEach(f=>f.el.remove()); this.cache.clear();
    this.cur=this.spreadDi(i);
  }
  this.doppia=doppia; this.pw=pw; this.ph=ph; this.k=pw/this.W;
  const r=this.r;
  r.classList.toggle('doppia', doppia); r.classList.toggle('singola', !doppia);
  r.style.setProperty('--k', this.k);
  r.style.width=(doppia?2*pw:pw)+'px'; r.style.height=ph+'px';
  this.aria.style.transform=`scale(${this.k})`;
  // prospettiva: abbastanza lontana da non deformare, abbastanza vicina da far
  // sentire il foglio che si alza verso chi legge
  this.scena.style.perspective=Math.round((doppia?2:1)*pw*4.2)+'px';
  this.scena.style.perspectiveOrigin=`${doppia?pw:0}px 50%`;
  this.spost=undefined;                         // nuova misura: lo spostamento si rifa' senza scivolare
  if(cambiaModo){ this.assegnaFermi(); this.preparaVicini(); }
  else if(!primo){ this.taglio(); this.sposta(); }
};

/* ------------------------------------------------------------ libro */
P.spreadDi=function(i){ return this.doppia ? (i<=0?0:Math.floor((i+1)/2)) : i; };
P.ultimoSpread=function(){ return this.spreadDi(this.N-1); };
P.paginaDi=function(s){                       // {sx, dx}: indici o null
  if(!this.doppia) return {sx:null, dx:(s>=0&&s<this.N)?s:null};
  if(s<=0) return {sx:null, dx:0};
  const a=2*s-1, b=2*s;
  return {sx:a<this.N?a:null, dx:b<this.N?b:null};
};
P.visibili=function(){
  const p=this.paginaDi(this.cur);
  const a=p.sx!=null?p.sx:p.dx, b=p.dx!=null?p.dx:p.sx;
  return [a,b];
};
P.primaVisibile=function(){ return this.visibili()[0]; };

/* le pagine vere nelle due sedi fisse, secondo i fogli in volo */
P.assegnaFermi=function(){
  let sx, dx;
  const f=this.fogli;
  if(!f.length){ const p=this.paginaDi(this.cur); sx=p.sx; dx=p.dx; }
  else{
    const primo=f[0], ultimo=f[f.length-1];
    if(this.doppia){
      if(this.verso>0){ sx=this.paginaDi(primo.da).sx; dx=this.paginaDi(ultimo.a).dx; }
      else{ sx=this.paginaDi(ultimo.a).sx; dx=this.paginaDi(primo.da).dx; }
    }else{ sx=null; dx = this.verso>0 ? ultimo.a : primo.da; }
  }
  this.metti(this.fermoSx, sx); this.metti(this.fermoDx, dx);
  this.ombraSx.hidden = sx==null; this.ombraDx.hidden = dx==null;
  this.taglio();
  this.sposta();
};

/* Il libro chiuso (solo la copertina, o solo il retro) sta al centro; quando
   si apre scivola di mezza pagina insieme alla girata, come un libro vero
   sul tavolo. Conta dove si arrivera', non dove si e'. */
P.sposta=function(){
  let s=this.cur;
  const u=this.fogli[this.fogli.length-1];
  if(u) s = u.meta===u.f1 && !u.sbircia && !u.elastico ? u.a : u.da;
  const p=this.paginaDi(s);
  const x = !this.doppia ? 0 : p.sx==null ? -this.pw/2 : p.dx==null ? this.pw/2 : 0;
  if(this.spost!==x){
    this.r.classList.toggle('fermo-subito', !this.moto || this.spost===undefined);
    this.spost=x; this.r.style.translate=`${x}px 0`;
  }
};
P.metti=function(sede, i){
  const el = i==null ? null : this.pagine[i];
  if(sede.firstChild===el && (!el || sede.childNodes.length===1)) return;
  sede.textContent='';
  if(el) sede.appendChild(el);
};

/* il taglio del libro: lo spessore delle pagine gia' lette a sinistra e di
   quelle ancora da leggere a destra, con le linguette delle sezioni */
P.taglio=function(){
  const [a,b]=this.visibili(), N=this.N;
  const sp=(n)=> n<=0 ? 0 : Math.min(this.doppia?7:4, 1.2+n*.11);
  const sinistra = this.doppia ? Math.max(0,a) : 0;
  const destra = N-1-b;
  this.taglioSx.style.width=sp(sinistra)+'px'; this.taglioSx.hidden=!sinistra || !this.doppia || this.paginaDi(this.cur).sx==null;
  this.taglioDx.style.width=sp(destra)+'px'; this.taglioDx.hidden=!destra;
  if(this.o.onTaglio) this.o.onTaglio(this.taglioSx, this.taglioDx, a, b, this.ph, this.k);
};

/* ------------------------------------------------------------ i fogli */
/* Il foglio che serve per andare dallo spread s allo spread t */
P.spec=function(s, t){
  if(t===s || t<0 || t>this.ultimoSpread()) return null;
  const da=this.paginaDi(s), a=this.paginaDi(t);
  let fronte, retro, dir, f0, f1;
  if(this.doppia){
    if(t>s){ fronte=da.dx; retro=a.sx; dir=1; }
    else   { fronte=da.sx; retro=a.dx; dir=-1; }
    if(fronte==null) return null;
    f0=0; f1=PI;
  }else{
    dir=1; retro='carta';
    if(t>s){ fronte=s; f0=0; f1=PI; }
    else   { fronte=t; f0=PI; f1=0; }
  }
  const rigido=this.rigide.has(fronte) || this.rigide.has(retro);
  return {da:s, a:t, fronte, retro, dir, f0, f1, rigido};
};

P.copia=function(i){
  let c;
  if(i==='carta' || i==null){ c=document.createElement('div'); c.className='pg carta'; }
  else{
    c=this.pagine[i].cloneNode(true);
    c.removeAttribute('id'); c.removeAttribute('role'); c.removeAttribute('aria-label');
    c.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
  }
  c.style.width=this.W+'px'; c.style.height=this.H+'px';
  return c;
};

/* costruisce (o riprende dalla cache) il DOM di un foglio */
P.foglioDom=function(sp){
  const chiave=`${sp.fronte}|${sp.retro}|${sp.dir}`;
  let f=this.cache.get(chiave);
  if(f){ this.cache.delete(chiave); this.cache.set(chiave,f); return f; }   // in fondo: usato di recente
  const n=this.strisce, W=this.W, w=W/n, b=w+1, dir=sp.dir;
  const root=document.createElement('div'); root.className='lb-foglio'; root.setAttribute('aria-hidden','true');
  root.style.left=(this.doppia?W:0)+'px';
  const str=[];
  for(let i=0;i<n;i++){
    const s=document.createElement('div'); s.className='lb-str';
    s.style.width=b+'px'; s.style.left=(dir>0?0:-b)+'px';
    s.style.transformOrigin = dir>0 ? '0 50%' : '100% 50%';
    const facce=[['fr', dir>0 ? -(i*w) : -(W-i*w-b), sp.fronte], ['re', dir>0 ? -(W-i*w-b) : -(i*w), sp.retro]];
    const luci=[];
    for(const [cls, off, idx] of facce){
      const fa=document.createElement('div'); fa.className='lb-fac '+cls;
      const c=this.copia(idx); c.style.left=off+'px'; fa.appendChild(c);
      const l=document.createElement('div'); l.className='lb-luce'; l.style.transform=`scaleY(${this.H})`; fa.appendChild(l);
      s.appendChild(fa); luci.push(l);
    }
    root.appendChild(s); str.push({el:s, luceFr:luci[0], luceRe:luci[1]});
  }
  root.style.visibility='hidden';
  this.aria.appendChild(root);
  f={el:root, str, chiave, dir};
  this.cache.set(chiave,f);
  // la cache tiene pochi fogli: i piu' vecchi non in volo si buttano
  while(this.cache.size>6){
    const vecchio=[...this.cache.values()].find(x=>!this.fogli.some(v=>v.dom===x));
    if(!vecchio) break;
    vecchio.el.remove(); this.cache.delete(vecchio.chiave);
  }
  return f;
};

/* i fogli per la pagina dopo e per quella prima, pronti prima del tocco */
P.preparaVicini=function(){
  if(!this.moto) return;
  clearTimeout(this.tPrep);
  const fai=()=>{
    if(this.fogli.length) return;
    const vicini=[1,-1].map(v=>this.spec(this.cur, this.cur+v)).filter(Boolean).map(sp=>this.foglioDom(sp));
    this.scalda(vicini);
  };
  this.tPrep=setTimeout(()=>{ (window.requestIdleCallback||((f)=>setTimeout(f,1)))(fai,{timeout:600}); }, 60);
};

/* I fogli vicini si disegnano prima del tocco: restano visibili, distesi sul
   loro lato, ma sotto le pagine vere (la scena sta sotto finche' niente vola).
   Cosi' al primo fotogramma della girata cambiano solo le trasformazioni: il
   disegno delle strisce, la parte che costa, e' gia' fatto. Gli altri fogli
   della cache restano nascosti. */
P.scalda=function(vicini){
  this.cache.forEach(f=>{
    const caldo=vicini.includes(f);
    f.el.style.visibility = caldo ? 'visible' : 'hidden';
    if(caldo) this.disegna({dom:f, dir:f.dir, fe:0, fh:0});
  });
};

P.nuovoFoglio=function(sp){
  const dom=this.foglioDom(sp);
  const f={...sp, dom, fe:sp.f0, ve:0, fh:sp.f0, vh:0, preso:false, tenuta:0, meta:sp.f1, storia:[], sbircia:false, elastico:false};
  dom.el.style.visibility='visible';
  this.r.classList.add('vola');         // la scena sale sopra le pagine vere
  if(!this.fogli.length) this.verso = this.doppia ? Math.sign(sp.a-sp.da) : Math.sign(sp.a-sp.da);
  this.fogli.push(f);
  this.assegnaFermi();
  this.disegna(f);
  this.avvia();
  return f;
};

/* foglio "elastico": l'ultima pagina si alza un poco e ricade */
P.foglioElastico=function(){
  if(this.doppia) return null;
  const s=this.cur;
  const sp={da:s, a:s, fronte:s, retro:'carta', dir:1, f0:0, f1:0, rigido:this.rigide.has(s)};
  const f=this.nuovoFoglio(sp); f.elastico=true;
  this.verso=1; return f;
};

/* ------------------------------------------------------------ geometria */
/* l'angolo del foglio a una frazione u (0 costola, 1 bordo) */
const angolo=(f,u)=>f.fh+(f.fe-f.fh)*Math.pow(u,FIS.esp);
/* posizione lungo il piano del libro del punto u, per un bordo fe dato */
P.xLocale=function(f, fe, u){
  const n=24, du=u/n; let x=0;
  for(let j=0;j<n;j++){ const uu=(j+.5)*du; x+=Math.cos(f.fh+(fe-f.fh)*Math.pow(uu,FIS.esp))*du; }
  return x*this.W;
};
/* l'angolo del bordo che porta il punto preso sotto il dito */
P.risolvi=function(f, xf){
  let lo=0, hi=PI;
  const x0=this.xLocale(f,lo,f.presaU), x1=this.xLocale(f,hi,f.presaU);
  if(xf>=x0) return lo; if(xf<=x1) return hi;
  for(let i=0;i<22;i++){ const m=(lo+hi)/2; if(this.xLocale(f,m,f.presaU)>xf) lo=m; else hi=m; }
  return (lo+hi)/2;
};

/* l'ombra di una striscia: piu' scura quando gira la faccia alla luce,
   un poco piu' chiara quando la guarda */
const ombreggia=(nx,nz)=>{
  const d=nx*LUCE.x+nz*LUCE.z, d0=LUCE.z;
  return d<d0 ? -Math.min(.5,(d0-d)/d0*.44) : Math.min(.14,(d-d0)*.8);
};
const colore=(v)=> v<0 ? `rgba(26,20,14,${(-v).toFixed(3)})` : `rgba(255,253,248,${v.toFixed(3)})`;

P.disegna=function(f){
  const n=this.strisce, W=this.W, w=W/n, dir=f.dir, str=f.dom.str;
  let x=0, z=0;
  const fi=new Array(n);
  for(let i=0;i<n;i++) fi[i]=angolo(f,(i+.5)/n);
  // gli spigoli tra le strisce prendono la media: la luce scorre senza gradini
  const vert=(j)=> j<=0 ? fi[0] : j>=n ? fi[n-1] : (fi[j-1]+fi[j])/2;
  let eR=0,zR=0,eL=0,zL=0;
  for(let i=0;i<n;i++){
    const a=fi[i];
    str[i].el.style.transform=`translate3d(${(dir*x).toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${(-dir*a).toFixed(4)}rad)`;
    const a0=vert(i), a1=vert(i+1);
    const s0=ombreggia(-dir*Math.sin(a0), Math.cos(a0)), s1=ombreggia(-dir*Math.sin(a1), Math.cos(a1));
    const r0=ombreggia(dir*Math.sin(a0), -Math.cos(a0)), r1=ombreggia(dir*Math.sin(a1), -Math.cos(a1));
    const verso = dir>0 ? 'to right' : 'to left', versoRe = dir>0 ? 'to left' : 'to right';
    str[i].luceFr.style.background=`linear-gradient(${verso},${colore(s0)},${colore(s1)})`;
    str[i].luceRe.style.background=`linear-gradient(${versoRe},${colore(r0)},${colore(r1)})`;
    x+=w*Math.cos(a); z+=w*Math.sin(a);
    const X=dir*x;
    if(X>eR){ eR=X; zR=z; } if(-X>eL){ eL=-X; zL=z; }
  }
  f.estR=eR; f.altR=zR; f.estL=eL; f.altL=zL;
};

/* ombre sulle pagine sotto e nella piega, dal foglio piu' alto */
P.ombre=function(){
  const k=this.k, W=this.W, cerniera=this.doppia?this.pw:0;
  let dx={o:0}, sx={o:0}, gola=0;
  for(const f of this.fogli){
    const oR=clamp(f.altR/(W*.42),0,1)*.5*(1-Math.pow(f.estR/W,6));
    if(oR>dx.o) dx={o:oR, x:f.estR, z:f.altR};
    const oL=clamp(f.altL/(W*.42),0,1)*.5*(1-Math.pow(f.estL/W,6));
    if(oL>sx.o) sx={o:oL, x:f.estL, z:f.altL};
    gola=Math.max(gola, Math.sin(clamp(f.fh,0,PI))*.9);
  }
  const larga=(z)=> (W*.06 + z*.75)/100;      // il gradiente e' largo 100px logici
  if(dx.o>.004){ this.castDx.style.opacity=dx.o.toFixed(3);
    this.castDx.style.transform=`translateX(${(dx.x*k).toFixed(1)}px) scaleX(${(larga(dx.z)*k).toFixed(3)})`; }
  else this.castDx.style.opacity=0;
  if(this.doppia && sx.o>.004){ this.castSx.style.opacity=sx.o.toFixed(3);
    this.castSx.style.transform=`translateX(${(this.pw-sx.x*k).toFixed(1)}px) scaleX(${(-larga(sx.z)*k).toFixed(3)})`; }
  else this.castSx.style.opacity=0;
  this.gola.style.opacity = this.doppia ? gola.toFixed(3) : 0;
  void cerniera;
};

/* ------------------------------------------------------------ fisica */
P.avvia=function(){ if(!this.raf){ this.t0=performance.now(); this.raf=requestAnimationFrame(t=>this.passo(t)); } };

P.passo=function(t){
  this.raf=0;
  let dt=Math.min(.05,(t-this.t0)/1000); this.t0=t;
  const sub=Math.max(1,Math.ceil(dt/.004)), h=dt/sub;
  for(const f of this.fogli){
    for(let s=0;s<sub;s++) this.integra(f,h);
    this.disegna(f);
  }
  this.ombre();
  // un comando ripetuto parte quando il foglio prima e' a buon punto
  if(this.coda && this.fogli.length<3){
    const u=this.fogli[this.fogli.length-1];
    if(!u || (!u.preso && u.meta===u.f1 && Math.abs(u.fe-u.f0)/PI>.28)){ const v=Math.sign(this.coda); this.coda-=v; this.gira(v); }
  }
  // atterraggi
  for(const f of [...this.fogli]){
    if(f.preso || (f.sbircia && f.meta!==f.f0)) continue;
    const fermo = Math.abs(f.fe-f.meta)<.0015 && Math.abs(f.ve)<.03 && Math.abs(f.fh-f.meta)<.0015 && Math.abs(f.vh)<.03;
    if(fermo) this.atterra(f);
  }
  if(this.fogli.length) this.raf=requestAnimationFrame(t2=>this.passo(t2));
  else this.ombre();
};

P.integra=function(f,h){
  // il bordo
  if(!f.preso){
    const m=molla(f.rigido ? FIS.rigida : (f.meta===f.f1 && !f.elastico && !f.sbircia ? FIS.giro : FIS.ritorno));
    const a=-m.k*(f.fe-f.meta)-m.c*f.ve;
    f.ve+=a*h; f.fe+=f.ve*h;
    if(f.fe>PI){ f.fe=PI; if(f.ve>0) f.ve=-f.ve*FIS.rimbalzo; }
    if(f.fe<0){ f.fe=0; if(f.ve<0) f.ve=-f.ve*FIS.rimbalzo; }
    f.tenuta=Math.max(0,f.tenuta-h/.22);
  }
  // la costola
  if(f.rigido){ f.fh=f.fe; f.vh=f.ve; return; }
  const verso = f.preso ? f.versoDito : Math.sign(f.meta-f.fe)||Math.sign(f.f1-f.f0)||1;
  const g = f.preso ? 1 : f.tenuta;
  const curva=Math.sin(clamp(f.fe,0,PI));
  const meta = f.fe - FIS.tenuta*curva*verso*g + FIS.volo*curva*verso*(1-g);
  const m=molla(FIS.cerniera);
  const a=-m.k*(f.fh-meta)-m.c*f.vh;
  f.vh+=a*h; f.fh+=f.vh*h;
  if(f.fh>PI){ f.fh=PI; if(f.vh>0) f.vh=-f.vh*FIS.rimbalzo; }
  if(f.fh<0){ f.fh=0; if(f.vh<0) f.vh=-f.vh*FIS.rimbalzo; }
};

P.atterra=function(f){
  const i=this.fogli.indexOf(f); if(i<0) return;
  this.fogli.splice(i,1);
  f.dom.el.style.visibility='hidden';
  const fatto = !f.elastico && !f.sbircia && f.meta===f.f1;
  if(fatto) this.cur=f.a;
  if(!this.fogli.length){ this.verso=0; this.r.classList.remove('vola'); }
  this.assegnaFermi();
  this.ombre();
  if(fatto && this.o.onCambio) this.o.onCambio(this.visibili());
  if(!this.fogli.length){
    if(this.coda){ const v=Math.sign(this.coda); this.coda-=v; this.gira(v); }
    else this.preparaVicini();
  }
};

/* chiude subito tutti i fogli in volo, ciascuno dove stava andando */
P.chiudiVoli=function(){
  this.coda=0;
  for(const f of [...this.fogli]){ f.preso=false; f.fe=f.fh=f.meta; f.ve=f.vh=0; this.atterra(f); }
};

/* ------------------------------------------------------------ comandi */
P.gira=function(v, veloce){
  if(!this.moto || veloce){ return this.salta(this.cur+v); }
  // un comando nel verso opposto riporta indietro l'ultimo foglio in volo
  const ultimo=this.fogli[this.fogli.length-1];
  if(ultimo && !ultimo.preso){
    if(ultimo.sbircia){ ultimo.sbircia=false; if(v===this.verso){ this.lancia(ultimo); return; } }
    const versoUltimo = ultimo.meta===ultimo.f1 ? this.verso : -this.verso;
    if(v!==versoUltimo){
      const inv=[...this.fogli].reverse().find(x=>x.meta===x.f1 && !x.preso);
      if(inv){ inv.meta=inv.f0; inv.tenuta=0; this.sposta(); this.avvia(); }
      return;
    }
    // stesso verso: un altro foglio, se il precedente e' gia' a buon punto
    const avanz=Math.abs(ultimo.fe-ultimo.f0)/PI;
    if(this.fogli.length>=3 || avanz<.28){ this.coda=(this.coda||0)+v; return; }
  }
  const da = this.fogli.length ? this.fogli[this.fogli.length-1].a : this.cur;
  const sp=this.spec(da, da+v);
  if(!sp){ if(v>0 && !this.fogli.length) this.rimbalzaFine(); return; }
  this.lancia(this.nuovoFoglio(sp));
};
P.lancia=function(f){
  f.meta=f.f1; f.tenuta=1; f.ve=FIS.spinta*Math.sign(f.f1-f.f0)*(f.rigido?.7:1); this.avvia();
};
P.rimbalzaFine=function(){
  if(this.doppia) return;
  const f=this.foglioElastico(); if(!f) return;
  f.meta=0; f.ve=1.6; f.tenuta=1; this.avvia();
};

/* salta a una pagina: con un foglio solo, o subito se senza movimento */
P.vai=function(i, anima){
  const t=this.spreadDi(clamp(i,0,this.N-1));
  if(t===this.cur && !this.fogli.length) return;
  if(!this.moto || !anima){ return this.salta(t); }
  this.chiudiVoli();
  const sp=this.spec(this.cur, t); if(!sp) return this.salta(t);
  this.lancia(this.nuovoFoglio(sp));
};
P.salta=function(t){
  t=clamp(t,0,this.ultimoSpread());
  this.chiudiVoli();
  if(t===this.cur) return;
  this.cur=t; this.assegnaFermi();
  if(this.o.onCambio) this.o.onCambio(this.visibili());
  this.preparaVicini();
  // senza movimento: una dissolvenza breve, perche' il cambio non sia uno scatto
  if(!this.moto && this.r.animate) this.r.animate([{opacity:.4},{opacity:1}],{duration:180,easing:'ease-out'});
};

/* ------------------------------------------------------------ tocco */
P.logico=function(e){
  const rc=this.rc||this.r.getBoundingClientRect();
  return {x:(e.clientX-rc.left)/this.k, y:(e.clientY-rc.top)/this.k};
};
P.cerniera=function(){ return this.doppia ? this.W : 0; };

P.eventi=function(){
  const r=this.r;
  let g=null;                                   // il gesto in corso
  const SOGLIA=7;
  const interattivo=(t)=>t.closest && t.closest('a,button,input,select,textarea,.fig-zoom');

  r.addEventListener('pointerdown',e=>{
    if(g || (e.pointerType==='mouse' && e.button!==0)) return;   // un dito solo
    this.rc=r.getBoundingClientRect();
    const p=this.logico(e);
    g={id:e.pointerId, x0:e.clientX, y0:e.clientY, t0:performance.now(), p0:p, tipo:e.pointerType, att:false, f:null, tgt:e.target};
  });

  const muovi=(e)=>{
    if(!g || e.pointerId!==g.id){ if(!g && e.pointerType==='mouse' && !e.buttons) this.sbircia(e); return; }
    const dx=e.clientX-g.x0, dy=e.clientY-g.y0;
    if(!g.att){
      if(Math.abs(dy)>SOGLIA*1.4 && Math.abs(dy)>Math.abs(dx)*1.2){ g=null; return; }   // gesto verticale: non e' una girata
      if(Math.abs(dx)<SOGLIA || Math.abs(dx)<Math.abs(dy)) return;
      if(!this.moto){ g.att=true; g.swipe=true; return; }
      g.att=true; this.prendi(g, dx);
      if(!g.f){ g.swipe=true; return; }
      try{ r.setPointerCapture(g.id); }catch(_){}
    }
    if(g.f) this.trascina(g, e);
  };
  r.addEventListener('pointermove', muovi);

  const fine=(e, annulla)=>{
    if(!g || e.pointerId!==g.id) return;
    const gg=g; g=null;
    try{ r.releasePointerCapture(gg.id); }catch(_){}
    if(gg.att){
      this.zittisciClic();
      if(gg.f) return this.lascia(gg, annulla);
      if(gg.swipe && !this.moto && !annulla){ const dx=e.clientX-gg.x0; if(Math.abs(dx)>30) this.gira(dx<0?1:-1); }
      return;
    }
    // un tocco breve sul margine esterno gira la pagina
    if(annulla || performance.now()-gg.t0>450 || interattivo(gg.tgt)) return;
    const x=gg.p0.x, W=this.W;
    if(this.doppia){
      if(x>2*W-W*.2) this.gira(1); else if(x<W*.2) this.gira(-1);
    }else{
      if(x>W*.78) this.gira(1); else if(x<W*.22) this.gira(-1);
    }
  };
  // un'immagine o un link trascinati col mouse partirebbero da soli (drag and
  // drop del browser) e il gesto verrebbe annullato
  r.addEventListener('dragstart', e=>e.preventDefault());
  r.addEventListener('pointerup', e=>fine(e,false));
  r.addEventListener('pointercancel', e=>fine(e,true));
  r.addEventListener('pointerleave', e=>{ if(!g && e.pointerType==='mouse') this.sbircia(null); });
  // solo la perdita della nostra cattura: al tocco il browser cattura da solo
  // l'elemento sotto il dito, e passando la cattura al libro quella vecchia si
  // chiude con lo stesso evento, che risale fin qui
  r.addEventListener('lostpointercapture', e=>{ if(g && g.att && e.pointerId===g.id && e.target===r) fine(e,true); });

  // la rotella e i due dita del trackpad: una girata per gesto
  let acc=0, bloccata=0;
  r.addEventListener('wheel', e=>{
    if(e.ctrlKey) return;                       // pizzico: zoom del browser
    const d=Math.abs(e.deltaX)>Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    e.preventDefault();
    const ora=performance.now();
    if(ora<bloccata){ return; }
    acc+=d;
    if(Math.abs(acc)>48){ this.gira(acc>0?1:-1); acc=0; bloccata=ora+380; }
  }, {passive:false});
};

/* il clic che segue un trascinamento non deve aprire link o lente */
P.zittisciClic=function(){
  const stop=(e)=>{ window.removeEventListener('click', stop, {capture:true}); if(this.r.contains(e.target)){ e.stopPropagation(); e.preventDefault(); } };
  window.addEventListener('click', stop, {capture:true});
  setTimeout(()=>window.removeEventListener('click', stop, {capture:true}), 300);
};

/* il gesto ha preso direzione: quale foglio prende in mano */
P.prendi=function(g, dx){
  const p=g.p0, W=this.W;
  const ultimo=this.fogli[this.fogli.length-1];
  // un foglio in volo sotto il dito si afferra dove si trova
  if(ultimo){
    const hx=this.cerniera(), X=p.x-hx;
    const dentro = X>0 ? X<=ultimo.estR+W*.12 && ultimo.estR>W*.02 : -X<=ultimo.estL+W*.12 && ultimo.estL>W*.02;
    if(dentro || ultimo.sbircia){ return this.afferra(g, ultimo); }
  }
  // il verso lo dice il gesto: verso sinistra la pagina dopo, verso destra la
  // pagina prima, ovunque cominci (preso dall'altra pagina, il foglio si
  // prende per il bordo e segue lo spostamento del dito)
  const v = dx<0 ? 1 : -1;
  const da = this.fogli.length ? ultimo.a : this.cur;
  const sp=this.spec(da, da+v);
  if(!sp){
    if(v>0 && !this.doppia && !this.fogli.length){ const f=this.foglioElastico(); if(f) this.afferra(g,f); }
    return;
  }
  this.afferra(g, this.nuovoFoglio(sp));
};

P.afferra=function(g, f){
  f.sbircia=false;
  const hx=this.cerniera(), xf=f.dir*(g.p0.x-hx);
  // il punto del foglio sotto il dito: per un foglio fermo e' quello toccato;
  // vicino alla costola si sposta un poco verso il bordo, che li' basta un
  // millimetro per girare tutto
  const xEdge=this.xLocale(f, f.fe, 1);
  // un foglio che arriva da sinistra (o in piedi) si prende per il bordo
  let u = f.fe<.05 ? (xf>0 ? xf/this.W : 1) : (xEdge*xf>0 && Math.abs(xEdge)>1 ? clamp(xf/xEdge,0,1) : 1);
  u=clamp(u,.38,1);
  f.presaU=u;
  f.presaOff = xf - this.xLocale(f, f.fe, u);
  f.preso=true; f.tenuta=1; f.storia=[{t:performance.now(), fe:f.fe, xf:xf-f.presaOff}];
  f.versoDito = Math.sign(f.f1-f.f0) || 1; f.ultimoXf = xf - f.presaOff;
  g.f=f;
  this.avvia();
};

P.trascina=function(g, e){
  const f=g.f, p=this.logico(e), hx=this.cerniera();
  const xf=f.dir*(p.x-hx) - f.presaOff;
  // il verso in cui il dito porta il foglio: la costola resta indietro in quel
  // verso. Si legge dal dito e non dall'angolo, che dipende dalla curva stessa
  // (leggerlo dall'angolo fa un anello che si autoalimenta)
  const dxf=xf-f.ultimoXf;
  if(Math.abs(dxf)>.5){ f.versoDito += (-Math.sign(dxf) - f.versoDito)*.35; f.ultimoXf=xf; }
  let fe=this.risolvi(f, xf);
  if(f.elastico){ const D=FIS.elastico; fe=(fe*D*.55)/(D+.55*fe); }
  const ora=performance.now();
  f.fe=fe;
  f.storia.push({t:ora, fe, xf});
  while(f.storia.length>2 && ora-f.storia[0].t>90) f.storia.shift();
  this.avvia();
};

/* Al rilascio decide il dito, non l'angolo: dove andrebbe il dito lanciato
   (proiezione del moto, apple-design) e' il foglio che si vuole. La velocita'
   con cui il foglio riparte e' quella che lo porta li': nessuno scalino tra
   la mano e la molla. */
P.lascia=function(g, annulla){
  const f=g.f; f.preso=false;
  const s=f.storia, a=s[0], b=s[s.length-1];
  const dt=(b.t-a.t)/1000;
  let vx = dt>.012 ? (b.xf-a.xf)/dt : 0;           // px logici al secondo
  if(performance.now()-b.t>90) vx=0;                // dito fermo prima di alzarsi
  if(f.elastico){ f.meta=0; f.ve=0; this.avvia(); return; }
  const feP=this.risolvi(f, b.xf + vx*FIS.proietta);
  const completa = !annulla && Math.abs(feP-f.f1) < Math.abs(feP-f.f0);
  f.meta = completa ? f.f1 : f.f0;
  f.ve = clamp((feP-f.fe)/FIS.proietta, -12, 12);
  f.tenuta = completa ? .6 : 0;
  this.sposta();
  this.avvia();
};

/* il mouse sul bordo esterno: l'angolo della pagina si solleva un poco */
P.sbircia=function(e){
  if(!this.moto || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let v=0;
  if(e){
    this.rc=this.r.getBoundingClientRect();
    const p=this.logico(e), W=this.W, fascia=W*.07;
    if(p.y>0 && p.y<this.H){
      if(this.doppia){ if(p.x>2*W-fascia && p.x<=2*W) v=1; else if(p.x>=0 && p.x<fascia) v=-1; }
      else if(p.x>W-fascia && p.x<=W) v=1;
    }
  }
  const s=this.fogli.find(f=>f.sbircia);
  if(s){
    if(v && Math.sign(s.a-s.da)===v){ return; }
    s.meta=s.f0; this.avvia();
    if(!v) return;
  }
  if(!v || this.fogli.length) return;
  const sp=this.spec(this.cur, this.cur+v); if(!sp) return;
  const f=this.nuovoFoglio(sp); f.sbircia=true;
  f.meta = sp.f0 + Math.sign(sp.f1-sp.f0)*FIS.sbirciata;
  this.avvia();
};

P.distruggi=function(){
  cancelAnimationFrame(this.raf); clearTimeout(this.tPrep);
  this.pagine.forEach(p=>p.remove());
  this.r.innerHTML='';
};

window.Sfoglia=Sfoglia;
})();
