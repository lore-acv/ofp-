// disegna.mjs <id> <pagina> <out.png>: disegna una pagina di pagine/<n>.json in Chromium come rec.mjs (stesse misure
// delle parole), alla misura della scansione retina; serve ad allinea.py e ai confronti con la scansione.
//   node tools/afm-rec/disegna.mjs afm-ccab 5-2 /tmp/r-5-2.png
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const R='/home/user/ofp-'; process.chdir(R);
const { svgPagina, cssRuoli, cssFont, risolvi, paroleDaMisurare, misuraNelBrowser } = await import(R+'/tools/afm-rec/pagina.mjs');
const [ID, N, OUT] = process.argv.slice(2);
const DIR=R+'/tools/afm-rec/'+ID;
const stile=JSON.parse(await readFile(DIR+'/stile.json','utf8'));
const p=await risolvi(JSON.parse(await readFile(DIR+'/pagine/'+N+'.json','utf8')),DIR);
const pup=createRequire(R+'/x.js')('puppeteer-core');
const b=await pup.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--allow-file-access-from-files']});
const pg=await b.newPage();
const W=p.rot===-90?p.h:p.w, H=p.rot===-90?p.w:p.h;
await pg.setViewport({width:W,height:H});
const { writeFile } = await import('node:fs/promises');
const { tmpdir } = await import('node:os');
const V=tmpdir()+'/afm-rec-disegna-'+process.pid+'.html';
await writeFile(V,'<!doctype html><meta charset="utf-8"><body>');
await pg.goto('file://'+V);
await pg.addStyleTag({content:cssFont(stile,'file://'+R+'/tools/afm-rec/font/')});
await pg.evaluate(async (fams) => { await Promise.all(fams.map((f) => document.fonts.load(f))); }, Object.entries(stile.ruoli).map(([, r]) => `${r.peso || stile.font[r.font].peso} 20px '${stile.font[r.font].famiglia}'`));
const misure = await pg.evaluate(misuraNelBrowser, paroleDaMisurare([p], stile));
const svg=svgPagina(p,stile,misure);
await pg.addStyleTag({content:`${cssRuoli(stile)} body{margin:0;background:#fff} .rec-svg{display:block;width:100%;height:100%} .rec-svg text{fill:#161616;white-space:pre} .rec-svg line{stroke:#161616} .rec-svg rect,.rec-svg polygon,.rec-svg path,.rec-svg circle{fill:#161616} .rec-svg g[style*="fill"] path{fill:inherit}`});
await pg.evaluate((svg,W,H)=>{document.body.style.cssText=`width:${W}px;height:${H}px;margin:0`;document.body.innerHTML=svg;},svg,W,H);
await pg.evaluate(()=>document.fonts.ready);
await pg.screenshot({path:OUT}); await b.close();
