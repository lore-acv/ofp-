/* SFOGLIA — il motore del manuale sfogliabile.

   IL GESTO. Si prende il foglio in qualsiasi punto e lo si trascina in
   qualsiasi direzione: il punto preso resta sotto il dito. Tirando un angolo
   in diagonale il foglio si arrotola in diagonale, tirando il bordo in
   orizzontale si arrotola dritto, come la carta.

   LA PIEGA. Il foglio si arrotola attorno a un cilindro. L'asse del cilindro
   e' la piega: e' perpendicolare alla direzione in cui il dito ha portato il
   punto preso, e sta dove serve perche' quel punto, girato attorno al
   cilindro, finisca proprio sotto il dito. Di qua dall'asse il foglio resta
   disteso dov'era; sul cilindro si incurva verso chi legge; oltre il cilindro
   torna disteso, rovesciato, e mostra il retro (la pagina dopo). Il raggio
   cresce a meta' girata e torna a zero quando il foglio si posa. Il foglio e'
   rilegato: gli estremi della costola non si muovono, e il punto preso non si
   allontana da loro piu' di quanto ne disti (la carta non si allunga).

   COME SI DISEGNA. Tre parti, ognuna una copia della pagina ritagliata da un
   contenitore orientato come la piega: la parte distesa, le fasce del
   cilindro (davanti e retro), la parte rovesciata. Da un fotogramma all'altro
   cambiano solo trasformazioni, piu' le sfumature di luce delle fasce, alte un
   pixel.

   LA FISICA (apple-design, emil-design-eng). Il dito comanda il punto preso;
   lasciato, il punto e' portato da due molle (x e y separate) verso il suo
   rovescio esatto (girata) o verso dove era (annullata), partendo con la
   velocita' del dito. Decide dove andrebbe il dito lanciato (proiezione del
   moto). Un foglio in volo si riprende dove si trova; un comando nel verso
   opposto lo riporta indietro; l'ultima pagina si solleva appena e ricade.
   Le copertine sono rigide e ruotano sulla costola senza piegarsi.

   LE OMBRE. Le fasce del cilindro sono illuminate secondo la loro
   inclinazione; il cilindro getta un'ombra sulla pagina che si scopre; il
   lembo rovesciato getta un'ombra lungo il suo bordo sulla carta sotto.

   NIENTE SFARFALLII. Le pagine vere sotto il foglio cambiano solo quando il
   foglio e' sullo schermo da due fotogrammi; all'atterraggio le pagine vere
   si sistemano sotto il foglio, che resta visibile ancora due fotogrammi.
   Il foglio e le pagine vere usano la stessa scala e cadono sugli stessi
   pixel interi: a riposo coincidono esattamente. */
(function(){
"use strict";

const FIS={
  giro:     {risposta:.58, smorz:.86},  // girata che si completa: un filo di slancio, poi si posa
  ritorno:  {risposta:.34, smorz:1},    // girata annullata: torna giu' senza oscillare
  rigida:   {risposta:.62, smorz:.92},  // copertina: piu' pesante
  raggio:.13,     // raggio massimo della piega, in larghezze di pagina
  fasce:10,       // fasce del cilindro
  proietta:.18,   // s: dove andrebbe il dito lasciato, per decidere il verso
  colpo:.35,      // larghezze di pagina al secondo: un colpo piu' rapido decide da solo (emil-design-eng)
  soglia:6,       // px: movimento prima che il gesto diventi una presa
  sbirciata:[.075,.055], // l'angolo sollevato sotto il mouse (frazioni di pagina)
  elastico:.3,    // quanto si solleva l'ultima pagina (larghezze di pagina, al massimo)
  arco:.16        // quanto si alza l'angolo a meta' di una girata da comando (altezze di pagina)
};
const LUCE=(()=>{ const v=[-.24,-.3,.92], n=Math.hypot(...v); return v.map(x=>x/n); })();
const PI=Math.PI, WF=64;              // WF: larghezza logica di una fascia, scalata alla sua misura vera
const molla=(p)=>({k:(2*PI/p.risposta)**2, c:4*PI*p.smorz/p.risposta});
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const ombreggia=(d)=>{ const d0=LUCE[2]; return d<d0 ? -Math.min(.5,(d0-d)/d0*.48) : Math.min(.12,(d-d0)*.8); };
const colore=(v)=> v<0 ? `rgba(26,20,14,${(-v).toFixed(3)})` : `rgba(255,253,248,${v.toFixed(3)})`;
const r4=(x)=>Math.round(x*1e4)/1e4;
const m3=(X,Y,Z,T)=>`matrix3d(${r4(X[0])},${r4(X[1])},${r4(X[2])},0,${r4(Y[0])},${r4(Y[1])},${r4(Y[2])},0,${r4(Z[0])},${r4(Z[1])},${r4(Z[2])},0,${r4(T[0])},${r4(T[1])},${r4(T[2])},1)`;
const m2=(a,b,c,d,e,f)=>`matrix(${r4(a)},${r4(b)},${r4(c)},${r4(d)},${r4(e)},${r4(f)})`;
/* trasformazioni affini 2D [a b c d e f], come matrix() */
const aff2=(A)=>m2(...A);
const inv2=([a,b,c,d,e,f])=>{ const k=1/(a*d-b*c); return [d*k,-b*k,-c*k,a*k,(c*f-d*e)*k,(b*e-a*f)*k]; };
const mul2=([a,b,c,d,e,f],[A,B,C,D,E,F])=>[a*A+c*B, b*A+d*B, a*C+c*D, b*C+d*D, a*E+c*F+e, b*E+d*F+f];

function Sfoglia(radice, opz){
  this.r=radice; this.o=opz;
  this.pagine=opz.pagine;            // elementi .pg alla misura logica
  this.N=this.pagine.length;
  this.W=opz.w; this.H=opz.h;
  this.D=Math.ceil(Math.hypot(this.W,this.H))+4;   // mezza lunghezza dei contenitori lungo la piega
  this.rigide=new Set(opz.rigide||[]);
  this.moto=opz.moto!==false;
  this.fogli=[];                     // fogli in volo, nell'ordine in cui sono partiti
  this.posati=[];                    // fogli appena atterrati, ancora visibili per due fotogrammi
  this.verso=0;                      // verso della catena in volo (+1 avanti, -1 indietro)
  this.coda=0;
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
  this.cast={sx:el('lb-cast', vSx), dx:el('lb-cast', vDx)};
  this.gola=el('lb-gola');
  this.scena=el('lb-scena'); this.aria=el('lb-aria', this.scena);
  this.aria.style.width=2*this.W+'px'; this.aria.style.height=this.H+'px';
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
  // pixel interi: la costola, le sedi delle pagine e il foglio cadono sugli
  // stessi pixel, e la scala e' una sola per tutti
  this.doppia=doppia; this.pw=Math.floor(pw); this.ph=ph; this.k=this.pw/this.W;
  const r=this.r;
  r.classList.toggle('doppia', doppia); r.classList.toggle('singola', !doppia);
  r.style.setProperty('--k', this.k);
  r.style.width=(doppia?2*this.pw:this.pw)+'px'; r.style.height=ph+'px';
  this.aria.style.transform=`scale(${this.k})`;
  this.scena.style.perspective=Math.round((doppia?2:1)*this.pw*4.2)+'px';
  this.scena.style.perspectiveOrigin=`${doppia?this.pw:0}px 50%`;
  const lungo=Math.ceil(2*this.D*this.k);
  this.cast.sx.style.height=this.cast.dx.style.height=lungo+'px';
  this.spost=undefined;
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
P.cerniera=function(){ return this.doppia ? this.W : 0; };

/* Le pagine vere nelle due sedi fisse. Contano solo i fogli gia' sullo
   schermo (svelati): finche' un foglio non e' disegnato, sotto resta la
   pagina di prima, identica alla sua faccia. */
P.assegnaFermi=function(){
  let sx, dx;
  const f=this.fogli.filter(x=>x.svelato);
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
P.metti=function(sede, i){
  const el = i==null ? null : this.pagine[i];
  if(sede.firstChild===el && (!el || sede.childNodes.length===1)) return;
  if(el) sede.replaceChildren(el); else sede.replaceChildren();
};

/* il taglio del libro: lo spessore delle pagine gia' lette a sinistra e di
   quelle ancora da leggere a destra, con i segni delle sezioni */
P.taglio=function(){
  const [a,b]=this.visibili(), N=this.N;
  const sp=(n)=> n<=0 ? 0 : Math.min(this.doppia?7:4, 1.2+n*.11);
  const sinistra = this.doppia ? Math.max(0,a) : 0;
  const destra = N-1-b;
  this.taglioSx.style.width=sp(sinistra)+'px'; this.taglioSx.hidden=!sinistra || !this.doppia || this.paginaDi(this.cur).sx==null;
  this.taglioDx.style.width=sp(destra)+'px'; this.taglioDx.hidden=!destra;
  if(this.o.onTaglio) this.o.onTaglio(this.taglioSx, this.taglioDx, a, b, this.ph, this.k);
};

/* Il libro chiuso (solo la copertina, o solo il retro) sta al centro; quando
   si apre scivola di mezza pagina insieme alla girata. Conta dove si
   arrivera', non dove si e'. */
P.sposta=function(){
  let s=this.cur;
  const u=this.fogli[this.fogli.length-1];
  if(u) s = u.versoMeta>0 && !u.sbircia && !u.elastico ? u.a : u.da;
  const p=this.paginaDi(s);
  const x = !this.doppia ? 0 : p.sx==null ? -Math.round(this.pw/2) : p.dx==null ? Math.round(this.pw/2) : 0;
  if(this.spost!==x){
    this.r.classList.toggle('fermo-subito', !this.moto || this.spost===undefined);
    this.spost=x; this.r.style.translate=`${x}px 0`;
  }
};

/* ------------------------------------------------------------ i fogli */
/* Il foglio che serve per andare dallo spread s allo spread t. dir: da che
   parte della costola sta il foglio a riposo (+1 a destra). gira: +1 se a
   riposo e' disteso e girando si rovescia, -1 se parte rovesciato e si
   distende (la pagina prima, a pagina singola). */
P.spec=function(s, t){
  if(t===s || t<0 || t>this.ultimoSpread()) return null;
  const da=this.paginaDi(s), a=this.paginaDi(t);
  let fronte, retro, dir, gira;
  if(this.doppia){
    if(t>s){ fronte=da.dx; retro=a.sx; dir=1; }
    else   { fronte=da.sx; retro=a.dx; dir=-1; }
    if(fronte==null) return null;
    gira=1;
  }else{
    dir=1; retro='carta';
    if(t>s){ fronte=s; gira=1; } else { fronte=t; gira=-1; }
  }
  const rigido=this.rigide.has(fronte) || this.rigide.has(retro);
  return {da:s, a:t, fronte, retro, dir, gira, rigido};
};

P.copia=function(i){
  let c;
  if(i==='carta' || i==null){ c=document.createElement('div'); c.className='pg carta'; }
  else{
    c=this.pagine[i].cloneNode(true);
    c.removeAttribute('id'); c.removeAttribute('role'); c.removeAttribute('aria-label');
    c.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
  }
  c.classList.add('lb-copia');
  c.style.width=this.W+'px'; c.style.height=this.H+'px';
  return c;
};

/* costruisce (o riprende dalla cache) il DOM di un foglio */
P.foglioDom=function(sp){
  const chiave=`${sp.fronte}|${sp.retro}|${sp.dir}|${sp.rigido?'r':'c'}`;
  let f=this.cache.get(chiave);
  if(f){ this.cache.delete(chiave); this.cache.set(chiave,f); return f; }   // in fondo: usato di recente
  const root=document.createElement('div'); root.className='lb-foglio'; root.setAttribute('aria-hidden','true');
  root.style.left=this.cerniera()+'px';
  root.style.visibility='hidden';
  const D=this.D, W=this.W, dir=sp.dir;
  const div=(cls,dentro)=>{ const d=document.createElement('div'); d.className=cls; dentro.appendChild(d); return d; };
  f={el:root, chiave, dir, rigido:sp.rigido};
  if(sp.rigido){
    // copertina: una lamina sola che ruota sulla costola
    const s=div('lb-rigida', root);
    s.style.width=W+'px'; s.style.height=this.H+'px';
    s.style.left=(dir>0?0:-W)+'px'; s.style.transformOrigin=dir>0?'0 50%':'100% 50%';
    const fr=div('lb-fac fr', s), re=div('lb-fac re', s);
    fr.appendChild(this.copia(sp.fronte)); re.appendChild(this.copia(sp.retro));
    f.lucFr=div('lb-luce piena', fr); f.lucRe=div('lb-luce piena', re);
    f.rig=s;
  }else{
    // la parte distesa, con l'ombra del lembo che le sta sopra
    const vic=div('lb-cont', root); vic.style.width=D+'px'; vic.style.height=2*D+'px';
    const cv=this.copia(sp.fronte); vic.appendChild(cv);
    // l'ombra del lembo rovesciato, un pezzo per ogni suo bordo; dentro la copia, quindi non esce dal foglio
    const ombraLembo=[0,1,2,3].map(()=>div('lb-ombra-lembo', cv));
    // le fasce del cilindro
    const fasce=[];
    for(let j=0;j<FIS.fasce;j++){
      const b=div('lb-banda', root); b.style.width=WF+'px'; b.style.height=2*D+'px';
      const fr=div('lb-fac fr', b), re=div('lb-fac re', b);
      const cf=this.copia(sp.fronte), cr=this.copia(sp.retro);
      fr.appendChild(cf); re.appendChild(cr);
      // la luce dentro la copia: la pagina la ritaglia, fuori dal foglio non c'e'
      const lf=div('lb-luce', cf), lr=div('lb-luce', cr);
      lf.style.width=lr.style.width=WF+'px';
      fasce.push({el:b, cf, cr, lf, lr});
    }
    // la parte rovesciata
    const lon=div('lb-cont', root); lon.style.width=D+'px'; lon.style.height=2*D+'px';
    const cl=this.copia(sp.retro); lon.appendChild(cl);
    Object.assign(f,{vic, cv, ombraLembo, fasce, lon, cl, fasceVisibili:true});
  }
  this.aria.appendChild(root);
  this.cache.set(chiave,f);
  // la cache tiene pochi fogli: i piu' vecchi non in uso si buttano
  while(this.cache.size>6){
    const vecchio=[...this.cache.values()].find(x=>!this.fogli.some(v=>v.dom===x) && !this.posati.some(v=>v.dom===x));
    if(!vecchio) break;
    vecchio.el.remove(); this.cache.delete(vecchio.chiave);
  }
  return f;
};

/* i fogli per la pagina dopo e per quella prima, gia' costruiti prima del tocco */
P.preparaVicini=function(){
  if(!this.moto) return;
  clearTimeout(this.tPrep);
  const fai=()=>{ if(this.fogli.length) return; [1,-1].forEach(v=>{ const sp=this.spec(this.cur, this.cur+v); if(sp) this.foglioDom(sp); }); };
  this.tPrep=setTimeout(()=>{ (window.requestIdleCallback||((f)=>setTimeout(f,1)))(fai,{timeout:600}); }, 60);
};

/* Un foglio in volo. G: il punto preso, in coordinate del foglio (x dalla
   costola verso il bordo libero, y dall'alto); F: dove sta ora quel punto,
   sul piano del libro, nelle stesse coordinate. F=G: disteso; F=(-G.x,G.y):
   rovesciato sull'altra pagina. */
P.nuovoFoglio=function(sp, G){
  const dom=this.foglioDom(sp);
  this.posati=this.posati.filter(p=>p.dom!==dom);
  const riposo = sp.gira>0 ? {x:G.x,y:G.y} : {x:-G.x,y:G.y};
  const f={...sp, dom, G:{x:G.x,y:G.y}, F:riposo, V:{x:0,y:0}, preso:false, versoMeta:-1,
    sbircia:false, ritira:false, elastico:false, svelato:false, quadri:0, storia:[]};
  this.aria.appendChild(dom.el);        // in cima allo stack 3D
  if(!this.fogli.length) this.verso = Math.sign(sp.a-sp.da) || 1;
  this.fogli.push(f);
  this.disegna(f);
  dom.el.style.visibility='visible';
  this.avvia();
  return f;
};
/* la meta del punto preso: il suo rovescio (girata fatta) o la sua posizione
   di partenza (annullata), secondo il verso del foglio */
P.meta=function(f){
  const rovescio = f.gira>0 ? f.versoMeta>0 : f.versoMeta<=0;
  return rovescio ? {x:-f.G.x, y:f.G.y} : {x:f.G.x, y:f.G.y};
};
P.progresso=function(f, F){ F=F||f.F; return clamp((f.G.x-F.x)/(2*f.G.x),0,1); };

/* il punto non si allontana dagli estremi della costola piu' di quanto ne
   disti il punto preso: la carta e' rilegata e non si allunga */
P.vincola=function(f, F){
  const G=f.G, S=[[0,0],[0,this.H]];
  let x=F.x, y=F.y;
  for(let i=0;i<4;i++) for(const [sx,sy] of S){
    const r=Math.hypot(G.x-sx,G.y-sy), dx=x-sx, dy=y-sy, d=Math.hypot(dx,dy);
    if(d>r){ x=sx+dx*r/d; y=sy+dy*r/d; }
  }
  return {x,y};
};

/* ------------------------------------------------------------ geometria */
P.disegna=function(f){
  if(f.dom.rigido) return this.disegnaRigido(f);
  const W=this.W, H=this.H, D=this.D, dir=f.dir, G=f.G, F=f.F, dom=f.dom;
  const p=this.progresso(f);
  // coordinate dello schermo, origine nella costola: x = dir * x del foglio
  const Gs=[dir*G.x, G.y], Fs=[dir*F.x, F.y];
  let nx=Gs[0]-Fs[0], ny=Gs[1]-Fs[1]; const L=Math.hypot(nx,ny);
  // il raggio cresce a meta' girata e torna a zero quando il foglio si posa
  const R=W*FIS.raggio*Math.pow(Math.sin(PI*p),.6);
  const zz=(f.ordine||0)*.25;                         // fogli in catena: mai complanari
  let c;
  if(L<.05){ nx=dir; ny=0; c=3*W+D; }               // disteso: tutto da questa parte della piega
  else{
    nx/=L; ny/=L;
    let dG;
    if(L>=PI*R) dG=(L+PI*R)/2;
    else{ let lo=0, hi=PI*R; for(let i=0;i<30;i++){ const m=(lo+hi)/2; if(m-R*Math.sin(m/R)<L) lo=m; else hi=m; } dG=(lo+hi)/2; }
    c=nx*Gs[0]+ny*Gs[1]-dG;
    c=Math.max(c, 0, ny*H);                           // gli estremi della costola restano dove sono
  }
  const tx=-ny, ty=nx;
  const P0f=dir>0?0:-W, P0b=dir>0?-W:0;               // dove sta la pagina davanti e quella dietro (x)
  const nP0f=nx*P0f, tP0f=tx*P0f;
  // la parte distesa: d <= 0
  dom.vic.style.transform=m3([nx,ny,0],[tx,ty,0],[0,0,1],[(c-D)*nx-D*tx,(c-D)*ny-D*ty,zz]);
  f.Mcv=[nx,tx,ny,ty,nP0f-c+D,tP0f+D];
  dom.cv.style.transform=aff2(f.Mcv);
  // la parte rovesciata: d >= pi R, distesa sopra, girata di mezzo giro sulla piega
  dom.lon.style.transform=m3([-nx,-ny,0],[tx,ty,0],[0,0,-1],[c*nx-D*tx,c*ny-D*ty,2*R+zz]);
  dom.cl.style.transform=m2(-nx,-tx,ny,ty,-nx*P0b-c-PI*R,-tx*P0b+D);
  // le fasce del cilindro (sotto un raggio minimo il cilindro non c'e')
  const conFasce=R>=.3;
  if(conFasce!==dom.fasceVisibili){ dom.fasceVisibili=conFasce; dom.fasce.forEach(b=>b.el.style.visibility=conFasce?'':'hidden'); }
  if(conFasce){
    const M=FIS.fasce, Dd=PI*R/M, s=WF/Dd;
    const pos=(d)=>{ const a=d/R; return [c+R*Math.sin(a), R*(1-Math.cos(a))]; };
    const luce=(d, segno)=>{ const a=d/R, sn=Math.sin(a)*segno, cs=Math.cos(a)*segno;
      return colore(ombreggia(-sn*nx*LUCE[0]-sn*ny*LUCE[1]+cs*LUCE[2])); };
    for(let j=0;j<M;j++){
      const b=dom.fasce[j], d0=j*Dd, d1=(j+1)*Dd;
      const [r0,z0]=pos(d0), [r1,z1]=pos(d1);
      // ogni fascia arriva un filo oltre l'inizio della successiva: niente giunture chiare
      const ch=Math.hypot(r1-r0,z1-z0)||1, ol=(ch+.9)/ch/WF;
      const X=[(r1-r0)*nx*ol, (r1-r0)*ny*ol, (z1-z0)*ol], Y=[tx,ty,0];
      let Z=[X[1]*Y[2]-X[2]*Y[1], X[2]*Y[0]-X[0]*Y[2], X[0]*Y[1]-X[1]*Y[0]]; const zn=Math.hypot(...Z)||1; Z=Z.map(v=>v/zn);
      b.el.style.transform=m3(X,Y,Z,[r0*nx-D*tx, r0*ny-D*ty, z0+zz]);
      const Mf=[s*nx,tx,s*ny,ty,s*(nP0f-c-d0),tP0f+D], Mr=[s*nx,-tx,-s*ny,ty,WF+s*(nx*P0b+c+d0),-tx*P0b+D];
      b.cf.style.transform=aff2(Mf); b.cr.style.transform=aff2(Mr);
      // la luce torna negli assi della fascia (inversa della copia), alta un pixel e allungata
      b.lf.style.transform=aff2(mul2(inv2(Mf),[1,0,0,2*D,0,0]));
      b.lr.style.transform=aff2(mul2(inv2(Mr),[1,0,0,2*D,0,0]));
      b.lf.style.background=`linear-gradient(to right,${luce(d0,1)},${luce(d1,1)})`;
      b.lr.style.background=`linear-gradient(to right,${luce(d1,-1)},${luce(d0,-1)})`;
    }
  }
  f.geo={nx,ny,tx,ty,c,R,p,L};
  this.ombraLembo(f);
};

/* Il lembo rovesciato, sul piano del libro: la parte del foglio oltre il
   cilindro (d >= pi R), riflessa attorno alla linea n·q = c + pi R/2. Si
   ritaglia il rettangolo della pagina con quel semipiano e si riflettono i
   vertici; i lati che vengono dai bordi della pagina (non quello sulla piega)
   gettano ombra verso l'esterno del lembo. */
P.lembo=function(f){
  const {nx,ny,c,R}=f.geo, W=this.W, H=this.H, dir=f.dir, lim=PI*R;
  const d=(q)=>nx*q[0]+ny*q[1]-c;
  const rett=[[0,0],[dir*W,0],[dir*W,H],[0,H]];
  const poly=[];
  for(let i=0;i<4;i++){
    const A=rett[i], B=rett[(i+1)%4], dA=d(A)-lim, dB=d(B)-lim;
    if(dA>=0) poly.push({q:A, bordo:true});
    if((dA>=0)!==(dB>=0)){ const t=dA/(dA-dB); poly.push({q:[A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t], bordo:false}); }
  }
  if(poly.length<3) return null;
  const rif=(q)=>{ const k=2*(c+lim/2-(nx*q[0]+ny*q[1])); return [q[0]+k*nx, q[1]+k*ny]; };
  const pts=poly.map(v=>({q:rif(v.q), bordo:v.bordo}));
  const cx=pts.reduce((s,v)=>s+v.q[0],0)/pts.length, cy=pts.reduce((s,v)=>s+v.q[1],0)/pts.length;
  const lati=[];
  for(let i=0;i<pts.length;i++){
    const A=pts[i], B=pts[(i+1)%pts.length];
    if(!A.bordo && !B.bordo) continue;                // il lato sulla piega
    const len=Math.hypot(B.q[0]-A.q[0], B.q[1]-A.q[1]); if(len<1) continue;
    let px=-(B.q[1]-A.q[1])/len, py=(B.q[0]-A.q[0])/len;
    const mx=(A.q[0]+B.q[0])/2, my=(A.q[1]+B.q[1])/2;
    if(px*(mx-cx)+py*(my-cy)<0){ px=-px; py=-py; }     // verso fuori dal lembo
    lati.push({a:A.q, b:B.q, len, px, py});
  }
  return lati;
};
P.ombraLembo=function(f){
  const g=f.geo, D=this.D, els=f.dom.ombraLembo;
  const lati = g.L>.05 && g.R>=.3 ? (this.lembo(f)||[]) : [];
  const larga=this.W*.02+g.R*.38, o=clamp(g.R/(this.W*.07),0,1)*.34;
  // nelle coordinate del contenitore disteso: u = n·q - c + D, v = t·q + D
  const toC=(q)=>[g.nx*q[0]+g.ny*q[1]-g.c+D, g.tx*q[0]+g.ty*q[1]+D];
  const toCv=(v)=>[g.nx*v[0]+g.ny*v[1], g.tx*v[0]+g.ty*v[1]];
  const inv=inv2(f.Mcv);
  els.forEach((el,i)=>{
    const l=lati[i];
    if(!l){ el.style.opacity=0; return; }
    const A=toC(l.a), u=toCv([(l.b[0]-l.a[0])/l.len,(l.b[1]-l.a[1])/l.len]), pp=toCv([l.px,l.py]);
    el.style.width=l.len+'px'; el.style.height=larga+'px';
    // e' dentro la copia distesa: dagli assi del contenitore a quelli della copia
    el.style.transform=aff2(mul2(inv,[u[0],u[1],pp[0],pp[1],A[0],A[1]]));
    el.style.opacity=o.toFixed(3);
  });
  f.lembo = lati.length ? {lati, larga, o} : null;
};

/* copertina: ruota sulla costola; l'angolo viene dal punto preso */
P.disegnaRigido=function(f){
  const dom=f.dom, dir=f.dir;
  const a=Math.acos(clamp(f.F.x/f.G.x,-1,1));
  dom.rig.style.transform=`translateZ(${(f.ordine||0)*.25}px) rotateY(${(-dir*a).toFixed(4)}rad)`;
  const sn=Math.sin(a), cs=Math.cos(a);
  const dl=(s)=>(-dir*sn*LUCE[0]+cs*LUCE[2])*s;
  dom.lucFr.style.background=colore(ombreggia(dl(1)));
  dom.lucRe.style.background=colore(ombreggia(dl(-1)));
  f.geo={rigido:true, a, p:this.progresso(f)};
};

/* ombre sulle pagine vere: la pagina che si scopre riceve l'ombra del
   cilindro; quella dall'altra parte della costola, l'ombra del lembo */
P.ombre=function(){
  const k=this.k, W=this.W, H=this.H, usa={sx:false, dx:false};
  let gola=0;
  // P: punto (coordinate dello schermo con origine nella costola); u: verso in cui l'ombra si allunga
  const metti=(lato, Pt, ux, uy, larga, o)=>{
    if(o<.004) return;
    const el=this.cast[lato]; usa[lato]=true;
    const base = lato==='dx' ? 0 : this.pw;
    const X=base+Pt[0]*k, Y=Pt[1]*k, h=2*this.D*k, w=larga*k/100;
    const tx=-uy, ty=ux;
    el.style.transform=m2(ux*w,uy*w,tx,ty,X-tx*h/2,Y-ty*h/2);
    el.style.opacity=o.toFixed(3);
  };
  for(const f of this.fogli.concat(this.posati)){
    const g=f.geo; if(!g) continue;
    if(g.rigido){
      const x=f.dir*W*Math.cos(g.a), lato=x>=0?'dx':'sx';
      if(this.doppia || lato==='dx') metti(lato, [x,0], x>=0?1:-1, 0, W*.06+W*Math.sin(g.a)*.5, Math.sin(g.a)*.32);
      gola=Math.max(gola, Math.sin(g.a)*.8);
      continue;
    }
    if(g.L<.05) continue;
    // l'ombra del cilindro sulla pagina che si scopre, oltre il suo colmo
    let dmax=-1e9;
    for(const [x,y] of [[0,0],[W,0],[0,H],[W,H]]) dmax=Math.max(dmax, g.nx*f.dir*x+g.ny*y-g.c);
    if(dmax>0 && g.R>=.3){
      const colmo=g.c+(dmax>=PI*g.R/2 ? g.R : g.R*Math.sin(dmax/g.R));
      const lato = f.dir>0 ? 'dx' : 'sx';
      if(this.doppia || lato==='dx') metti(lato, [g.nx*colmo, g.ny*colmo], g.nx, g.ny, W*.05+g.R*1.1, clamp(g.R/(W*.06),0,1)*.42);
    }
    // l'ombra del lembo sulla pagina dall'altra parte della costola
    if(this.doppia && f.lembo){
      const lato = f.dir>0 ? 'sx' : 'dx';
      const di_la=f.lembo.lati.filter(l=>{ const mx=(l.a[0]+l.b[0])/2; return lato==='sx' ? mx<0 : mx>0; });
      const l=di_la.sort((x,y)=>y.len-x.len)[0];
      if(l) metti(lato, [(l.a[0]+l.b[0])/2,(l.a[1]+l.b[1])/2], l.px, l.py, f.lembo.larga*1.4, f.lembo.o*.9);
    }
    gola=Math.max(gola, Math.sin(PI*g.p)*.5);
  }
  for(const lato of ['sx','dx']) if(!usa[lato]) this.cast[lato].style.opacity=0;
  this.gola.style.opacity = this.doppia ? gola.toFixed(3) : 0;
};

/* ------------------------------------------------------------ fisica */
P.avvia=function(){ if(!this.raf){ this.t0=performance.now(); this.raf=requestAnimationFrame(t=>this.passo(t)); } };

P.passo=function(t){
  this.raf=0;
  const dt=Math.min(.05,Math.max(0,(t-this.t0)/1000)); this.t0=t;
  const sub=Math.max(1,Math.ceil(dt/.004)), h=dt/sub;
  this.fogli.forEach((f,i)=>{ f.ordine=this.fogli.length-i; });
  let riassegna=false;
  for(const f of this.fogli){
    if(!f.preso) for(let s=0;s<sub;s++) this.integra(f,h);
    this.disegna(f);
    f.quadri++;
    // dopo due fotogrammi sullo schermo il foglio e' disegnato: sotto si puo'
    // mettere la pagina che scopre
    if(!f.svelato && f.quadri>=2){ f.svelato=true; riassegna=true; }
  }
  if(riassegna) this.assegnaFermi();
  // un comando ripetuto parte quando il foglio prima e' a buon punto
  if(this.coda && this.fogli.length<3){
    const u=this.fogli[this.fogli.length-1];
    const avanz = u ? (u.gira>0 ? this.progresso(u) : 1-this.progresso(u)) : 1;
    if(!u || (!u.preso && u.versoMeta>0 && avanz>.28)){ const v=Math.sign(this.coda); this.coda-=v; this.gira(v); }
  }
  // atterraggi
  for(const f of [...this.fogli]){
    if(f.preso || (f.sbircia && !f.ritira)) continue;
    const T=this.meta(f);
    if(Math.hypot(f.F.x-T.x, f.F.y-T.y)<.6 && Math.hypot(f.V.x,f.V.y)<30){ f.F={...T}; this.disegna(f); this.atterra(f); }
  }
  // i fogli posati restano due fotogrammi sopra le pagine vere, gia' giuste
  for(const p of [...this.posati]){
    if(p.attesa--<=0){
      this.posati.splice(this.posati.indexOf(p),1);
      if(!this.fogli.some(f=>f.dom===p.dom)) p.dom.el.style.visibility='hidden';
    }
  }
  this.ombre();
  if(this.fogli.length || this.posati.length) this.raf=requestAnimationFrame(t2=>this.passo(t2));
};

P.integra=function(f,h){
  let T = f.sbircia && !f.ritira ? f.punta : this.meta(f);
  // la mano che gira la pagina alza l'angolo a meta' strada e lo riposa
  // (l'arco si chiude un po' prima dell'arrivo, cosi' l'angolo si posa insieme al foglio)
  if(f.arco) T={x:T.x, y:T.y-f.arco*Math.sin(PI*Math.min(1,this.progresso(f)*1.2))};
  const tipo = f.dom.rigido ? FIS.rigida : (f.versoMeta>0 && !f.elastico && !f.sbircia ? FIS.giro : FIS.ritorno);
  const m=molla(tipo);
  for(const ax of ['x','y']){
    const a=-m.k*(f.F[ax]-T[ax])-m.c*f.V[ax];
    f.V[ax]+=a*h; f.F[ax]+=f.V[ax]*h;
  }
  const v=this.vincola(f, f.F);
  if(Math.abs(v.x-f.F.x)+Math.abs(v.y-f.F.y)>1e-3){ f.F=v; f.V.x*=.92; f.V.y*=.92; }
};

P.atterra=function(f){
  const i=this.fogli.indexOf(f); if(i<0) return;
  this.fogli.splice(i,1);
  const fatto = !f.elastico && !f.sbircia && f.versoMeta>0;
  if(fatto) this.cur=f.a;
  if(!this.fogli.length) this.verso=0;
  // le pagine vere si sistemano adesso, sotto il foglio che resta visibile
  this.assegnaFermi();
  this.posati.push({dom:f.dom, geo:f.geo, dir:f.dir, lembo:f.lembo, attesa:2});
  if(fatto && this.o.onCambio) this.o.onCambio(this.visibili());
  if(!this.fogli.length){
    if(this.coda){ const v=Math.sign(this.coda); this.coda-=v; this.gira(v); }
    else this.preparaVicini();
  }
  this.avvia();
};

/* chiude subito tutti i fogli in volo, ciascuno dove stava andando */
P.chiudiVoli=function(){
  this.coda=0;
  for(const f of [...this.fogli]){ f.preso=false; f.sbircia=false; f.F={...this.meta(f)}; f.V={x:0,y:0}; this.disegna(f); this.atterra(f); }
  for(const p of this.posati) p.dom.el.style.visibility='hidden';
  this.posati=[];
};

/* ------------------------------------------------------------ comandi */
/* dove si prende un foglio che gira da solo: l'angolo in basso, come la mano */
P.presaComando=function(sp){ return sp.rigido ? {x:this.W, y:this.H*.9} : {x:this.W*.97, y:this.H*.9}; };

P.gira=function(v, veloce){
  if(!this.moto || veloce){ return this.salta(this.cur+v); }
  const ultimo=this.fogli[this.fogli.length-1];
  if(ultimo && !ultimo.preso){
    if(ultimo.sbircia){
      ultimo.sbircia=false; ultimo.ritira=false;
      if(Math.sign(ultimo.a-ultimo.da)===v){ this.lancia(ultimo); return; }
      ultimo.versoMeta=-1; this.avvia(); return;
    }
    // un comando nel verso opposto riporta indietro l'ultimo foglio in volo
    const versoUltimo = ultimo.versoMeta>0 ? this.verso : -this.verso;
    if(v!==versoUltimo){
      const inv=[...this.fogli].reverse().find(x=>x.versoMeta>0 && !x.preso);
      if(inv){ inv.versoMeta=-1; this.sposta(); this.avvia(); }
      return;
    }
    const avanz = ultimo.gira>0 ? this.progresso(ultimo) : 1-this.progresso(ultimo);
    if(this.fogli.length>=3 || avanz<.28){ this.coda+=v; return; }
  }
  const da = this.fogli.length ? this.fogli[this.fogli.length-1].a : this.cur;
  const sp=this.spec(da, da+v);
  if(!sp){ if(v>0 && !this.fogli.length) this.rimbalzaFine(); return; }
  this.lancia(this.nuovoFoglio(sp, this.presaComando(sp)));
};
/* parte da solo: l'angolo si alza e va, con una spinta iniziale (la mano che
   lo lancia) e un piccolo arco verso l'alto */
P.lancia=function(f){
  f.versoMeta=1;
  const W=this.W, H=this.H, s=f.gira>0?-1:1, rig=f.dom.rigido;
  f.V={x:f.V.x+s*W*(rig?1.3:1.5), y:f.V.y};
  if(!rig) f.arco=H*FIS.arco;
  this.sposta(); this.avvia();
};
P.rimbalzaFine=function(){
  if(this.doppia) return;
  const sp={da:this.cur, a:this.cur, fronte:this.cur, retro:'carta', dir:1, gira:1, rigido:false};
  const f=this.nuovoFoglio(sp, this.presaComando(sp)); f.elastico=true;
  f.versoMeta=-1; f.V={x:-this.W*1.1, y:-this.H*.3}; this.avvia();
};

/* salta a una pagina: con un foglio solo, o subito se senza movimento */
P.vai=function(i, anima){
  const t=this.spreadDi(clamp(i,0,this.N-1));
  if(t===this.cur && !this.fogli.length) return;
  if(!this.moto || !anima) return this.salta(t);
  this.chiudiVoli();
  const sp=this.spec(this.cur, t); if(!sp) return this.salta(t);
  this.lancia(this.nuovoFoglio(sp, this.presaComando(sp)));
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
/* dal punto sul libro (coordinate logiche) alle coordinate di un foglio */
P.locale=function(f, p){ return {x:f.dir*(p.x-this.cerniera()), y:p.y}; };

P.eventi=function(){
  const r=this.r;
  let g=null;                                   // il gesto in corso
  const interattivo=(t)=>t.closest && t.closest('a,button,input,select,textarea,.fig-zoom');

  r.addEventListener('pointerdown',e=>{
    if(g || (e.pointerType==='mouse' && e.button!==0)) return;   // un dito solo
    this.rc=r.getBoundingClientRect();
    g={id:e.pointerId, x0:e.clientX, y0:e.clientY, t0:performance.now(), p0:this.logico(e), att:false, f:null, tgt:e.target};
  });

  const muovi=(e)=>{
    if(!g || e.pointerId!==g.id){ if(!g && e.pointerType==='mouse' && !e.buttons) this.sbircia(e); return; }
    const dx=e.clientX-g.x0, dy=e.clientY-g.y0;
    if(!g.att){
      if(Math.hypot(dx,dy)<FIS.soglia) return;
      g.att=true;
      if(!this.moto){ g.swipe=true; return; }
      this.prendi(g, dx, dy, this.logico(e));
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
    if(this.doppia){ if(x>2*W-W*.2) this.gira(1); else if(x<W*.2) this.gira(-1); }
    else{ if(x>W*.78) this.gira(1); else if(x<W*.22) this.gira(-1); }
  };
  r.addEventListener('pointerup', e=>fine(e,false));
  r.addEventListener('pointercancel', e=>fine(e,true));
  // un'immagine o un link trascinati col mouse partirebbero da soli (drag and
  // drop del browser) e il gesto verrebbe annullato
  r.addEventListener('dragstart', e=>e.preventDefault());
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
    if(ora<bloccata) return;
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

/* Il gesto ha preso direzione: quale foglio prende in mano.
   - Un foglio gia' in volo si riprende dove si trova.
   - Sulla pagina: il foglio di quella pagina, preso nel punto toccato, che da
     li' resta sotto il dito in ogni direzione.
   - Un gesto deciso verso l'esterno (a destra sulla pagina destra, o a
     pagina singola) prende la pagina prima per il bordo, che segue il dito. */
P.prendi=function(g, dx, dy, ora){
  const u=this.fogli[this.fogli.length-1];
  if(u){ this.afferra(g, u, ora, u.presa && u.presa.lontano); return; }
  const p=g.p0, W=this.W, H=this.H, hx=this.cerniera();
  const fuori = Math.abs(dx)>Math.abs(dy)*1.1;           // gesto soprattutto orizzontale
  let v, diretto;
  if(this.doppia){
    if(p.x>=hx){ v = fuori && dx>0 ? -1 : 1; diretto = v===1; }
    else       { v = fuori && dx<0 ? 1 : -1; diretto = v===-1; }
  }else{ v = fuori && dx>0 ? -1 : 1; diretto = v===1; }
  const sp=this.spec(this.cur, this.cur+v);
  if(!sp){
    if(v>0 && !this.doppia){                              // ultima pagina: si solleva appena
      const spe={da:this.cur, a:this.cur, fronte:this.cur, retro:'carta', dir:1, gira:1, rigido:false};
      const f=this.nuovoFoglio(spe, this.presaDiretta(p,1)); f.elastico=true;
      this.afferra(g, f, p);
    }
    return;
  }
  const G = diretto ? this.presaDiretta(p, sp.dir) : {x:W, y:clamp(p.y,0,H)};   // da fuori: per il bordo, all'altezza del dito
  const f=this.nuovoFoglio(sp, G);
  f.versoMeta=1;
  this.afferra(g, f, p, !diretto);
};
/* il punto toccato, nelle coordinate del foglio; troppo vicino alla costola
   la carta non si lascia girare, e lo si sposta di poco verso il bordo */
P.presaDiretta=function(p, dir){
  return {x:clamp(dir*(p.x-this.cerniera()),this.W*.12,this.W), y:clamp(p.y,0,this.H)};
};

/* prende il foglio: da qui il punto preso segue lo spostamento del dito.
   "lontano": il dito non e' sul foglio (lo si tira per il bordo da fuori) e
   il bordo si sposta il doppio, cosi' la piega resta sotto il dito */
P.afferra=function(g, f, p, lontano){
  f.sbircia=false; f.ritira=false; f.arco=0;
  f.preso=true; g.f=f;
  f.presa={q0:this.locale(f, p), F0:{...f.F}, lontano:!!lontano};
  f.V={x:0,y:0};
  f.storia=[{t:performance.now(), x:f.F.x, y:f.F.y}];
  this.avvia();
};

P.trascina=function(g, e){
  const f=g.f, q=this.locale(f, this.logico(e)), pr=f.presa, m=pr.lontano?2:1;
  let F={x:pr.F0.x+(q.x-pr.q0.x)*m, y:pr.F0.y+(q.y-pr.q0.y)*m};
  if(f.elastico){
    // l'ultima pagina: piu' si tira, meno viene (rubber band)
    const dx=F.x-f.G.x, dy=F.y-f.G.y, d=Math.hypot(dx,dy), Dm=this.W*FIS.elastico;
    if(d>0){ const r=(d*Dm*.55)/(Dm+.55*d); F={x:f.G.x+dx*r/d, y:f.G.y+dy*r/d}; }
  }
  f.F=this.vincola(f, F);
  const ora=performance.now();
  f.storia.push({t:ora, x:f.F.x, y:f.F.y});
  while(f.storia.length>2 && ora-f.storia[0].t>90) f.storia.shift();
  this.avvia();
};

/* Al rilascio decide il dito: dove andrebbe il punto lanciato (proiezione
   del moto, apple-design) e' il foglio che si vuole. Le molle partono con la
   velocita' del dito: nessuno scalino tra la mano e il foglio. */
P.lascia=function(g, annulla){
  const f=g.f; f.preso=false;
  const s=f.storia, a=s[0], b=s[s.length-1];
  const dt=(b.t-a.t)/1000;
  let V = dt>.012 ? {x:(b.x-a.x)/dt, y:(b.y-a.y)/dt} : {x:0,y:0};
  if(performance.now()-b.t>90) V={x:0,y:0};              // dito fermo prima di alzarsi
  const lim=this.W*14; V.x=clamp(V.x,-lim,lim); V.y=clamp(V.y,-lim,lim);
  f.V=V;
  if(f.elastico){ f.versoMeta=-1; this.avvia(); return; }
  const Fp=this.vincola(f,{x:f.F.x+V.x*FIS.proietta, y:f.F.y+V.y*FIS.proietta});
  // un colpo deciso conta piu' della strada fatta: verso la costola rovescia,
  // all'indietro distende; altrimenti decide dove andrebbe il dito lanciato
  const colpo=-V.x/this.W;
  const rovescio = colpo>FIS.colpo ? true : colpo<-FIS.colpo ? false : this.progresso(f, Fp)>.5;
  const completa = !annulla && (f.gira>0 ? rovescio : !rovescio);
  f.versoMeta = completa ? 1 : -1;
  this.sposta();
  this.avvia();
};

/* il mouse su un angolo esterno: l'angolo si solleva un poco */
P.sbircia=function(e){
  if(!this.moto || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let v=0, alto=false;
  if(e){
    this.rc=this.r.getBoundingClientRect();
    const p=this.logico(e), W=this.W, H=this.H, fx=W*.09, fy=H*.12;
    alto = p.y<fy; const basso = p.y>H-fy && p.y<=H;
    if((alto && p.y>=0) || basso){
      if(this.doppia){ if(p.x>2*W-fx && p.x<=2*W) v=1; else if(p.x>=0 && p.x<fx) v=-1; }
      else if(p.x>W-fx && p.x<=W) v=1;
    }
  }
  const s=this.fogli.find(f=>f.sbircia);
  if(s){
    if(v && Math.sign(s.a-s.da)===v && s.alto===alto) return;
    s.ritira=true; this.avvia();
    if(!v) return;
  }
  if(!v || this.fogli.length) return;
  const sp=this.spec(this.cur, this.cur+v); if(!sp || sp.rigido || sp.gira<0) return;
  const G={x:this.W, y:alto?0:this.H};
  const f=this.nuovoFoglio(sp, G); f.sbircia=true; f.alto=alto;
  f.punta={x:G.x-this.W*FIS.sbirciata[0], y:alto ? this.H*FIS.sbirciata[1] : this.H*(1-FIS.sbirciata[1])};
  this.avvia();
};

P.distruggi=function(){
  cancelAnimationFrame(this.raf); clearTimeout(this.tPrep);
  this.pagine.forEach(p=>p.remove());
  this.r.innerHTML='';
};

Sfoglia.FIS=FIS;                      // i parametri della fisica, per regolarli dalla console
window.Sfoglia=Sfoglia;
})();
