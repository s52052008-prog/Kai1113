/* ===== v4：素材美術（Pixel Crawler 樹木、Modern Interiors 角色）===== */
// ── 樹：用素材圖，未載入時退回程式繪製 ──
const TREEMAP={0:'treeG',1:'treeP',2:'treeG',3:'pine',4:'treeG',5:'treeG',6:'treeO',7:'treeY'};
function treeSprite(k,v){
 if(!AT.ok)return treeSpriteProc(k,v);
 const key='S'+k+'_'+v;if(TSP[key])return TSP[key];
 const cv2=document.createElement('canvas');cv2.width=Math.ceil(48*SK);cv2.height=Math.ceil(66*SK);const c=cv2.getContext('2d');c.scale(SK,SK);c.imageSmoothingEnabled=false;
 let n=TREEMAP[k]||'treeG';if(n=='pine')n=(v|0)%2?'pineT':'pineA';
 const m=AT.M[n];c.fillStyle='rgba(30,40,10,.30)';c.beginPath();c.ellipse(24,61,Math.min(13,m[2]*.42),3.6,0,0,7);c.fill();
 let sc=n=='pineA'?1.0:1.0;const dw=m[2]*sc,dh=m[3]*sc;c.drawImage(AT.img,m[0],m[1],m[2],m[3],Math.round(24-dw/2),Math.round(62-dh),dw,dh);
 return TSP[key]=cv2}
// ── 角色：Modern Interiors 16×32 行走圖，依外觀換色 ──
const CHNM=['Adam','Alex','Amelia','Bob'],CHV={},CHR={};
let CHD=null;
function chInit(){if(CHD||!AT.ok)return;const cv=document.createElement('canvas');cv.width=384;cv.height=384;const x=cv.getContext('2d');
 const im=new Image();im.onload=()=>{x.drawImage(im,0,0);CHD=x.getImageData(0,0,384,384);Object.keys(CHV).forEach(k=>delete CHV[k]);if(typeof portraitReset=='function')portraitReset()};im.src=ASSET.chars}
AT.cb.push(chInit);
const hexRGB=h=>{h=String(h||'#888').replace('#','');if(h.length==3)h=h.split('').map(c=>c+c).join('');return[parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0]};
const lum=(r,g,b)=>.3*r+.59*g+.11*b;
function chBase(L){const h=hsh((L.hr||'')+(L.tp||'')+(L.hs||'')+(L.sk||'')),hs=L.hs||'';
 if(L.fm)return(hs=='l'||hs=='b'||hs=='k')?2:(h%3==0?1:2);
 if(L.bd==3)return h%2?0:1;
 return[0,1,3,3,1][h%5]}
function chVar(L){
 const b=chBase(L),key=b+'|'+L.sk+'|'+L.hr+'|'+L.tp+'|'+L.bt;if(CHV[key])return CHV[key];
 const nm=CHNM[b],cls=ASSET.cls[nm],ref=ASSET.ref[nm];
 if(!CHR[nm]){const m={};for(const k in cls)cls[k].forEach(hex=>m[hex]=k);CHR[nm]=m}
 const map=CHR[nm],tg={h:hexRGB(L.hr),s:hexRGB(L.sk),t:hexRGB(L.tp),p:hexRGB(L.bt)};
 const rl={};for(const k in ref){const c=hexRGB(ref[k]);rl[k]=lum(c[0],c[1],c[2])||1}
 const cv=document.createElement('canvas');cv.width=384;cv.height=96;const x=cv.getContext('2d'),out=x.createImageData(384,96),D=CHD.data,O=out.data;
 for(let y=0;y<96;y++)for(let xx=0;xx<384;xx++){const si=((b*96+y)*384+xx)*4,di=(y*384+xx)*4,a=D[si+3];if(!a)continue;
  const r=D[si],g=D[si+1],bl=D[si+2],hex=((1<<24)|(r<<16)|(g<<8)|bl).toString(16).slice(1);let k=map[hex];const fy=y%32;
  if(k=='h'&&fy>=24&&nm=='Adam')k='p';
  if(!k||!tg[k]||!rl[k]){O[di]=r;O[di+1]=g;O[di+2]=bl;O[di+3]=a;continue}
  const q=Math.max(.35,Math.min(1.45,lum(r,g,bl)/rl[k])),t=tg[k];
  O[di]=Math.min(255,t[0]*q);O[di+1]=Math.min(255,t[1]*q);O[di+2]=Math.min(255,t[2]*q);O[di+3]=a}
 x.putImageData(out,0,0);return CHV[key]=cv}
const CHDIR=[3,1,2,0,2,0,1,1];
function drawChar(c,o){
 const L=o.lk;
 if(!AT.ok||!CHD||!L||o.pose=='punch'||(o.sit&&false))return drawCharProc(c,o);
 const dr=(o.dir|0)%8,dm=CHDIR[dr],ph=o.ph||0,cv=chVar(L),mv=o.mv,sit=o.sit,ps=o.pose||'';
 const SS=1.3*((L.sc||(L.bd==3?.6:.78))/.78);
 c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8));
 c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(0,0,sit?6:7.6,sit?2:2.8,0,0,7);c.fill();
 c.imageSmoothingEnabled=false;
 let by=0;if(ps=='squat')by=Math.abs(Math.sin(ph*3))*3;else if(ps=='rope')by=-Math.abs(Math.sin(ph*7))*4;else if(ps=='pull')by=-4-Math.abs(Math.sin(ph*2.4))*4;else if(ps=='lift')by=-Math.abs(Math.sin(ph*2))*1.5;else if(ps=='dribble')by=Math.abs(Math.sin(ph*5))*.8;else if(sit)by=2;
 c.translate(0,by);c.scale(SS,SS);
 let row=1,fr=0;
 if(sit&&(dm==0||dm==2)){row=2;fr=0}
 else if(mv){row=0;fr=((Math.floor(ph*11))%6+6)%6}
 else{row=1;fr=((Math.floor(ph*3.4))%6+6)%6}
 if(row==2){if(dm==2){c.scale(-1,1)}c.drawImage(cv,0,64,16,32,-8,-32,16,32)}
 else c.drawImage(cv,(dm*6+fr)*16,row*32,16,32,-8,-32,16,32);
 // 配件
 const front=dm==3,back=dm==1,side=dm==0||dm==2,fl=dm==2?-1:1,ac=L.ac||'';
 if(L.bp&&!front){c.fillStyle=L.bp;c.strokeStyle='#2a1a10';c.lineWidth=.5;if(back){c.fillRect(-5,-18,10,8);c.strokeRect(-5,-18,10,8)}else{c.fillRect(-7.2*fl-(fl>0?0:0),-18,2.6,8)}}
 if(/g/.test(ac)&&!back){c.fillStyle='#2a1a10';if(front){c.fillRect(-5,-15.6,4,1);c.fillRect(1,-15.6,4,1)}else{c.fillRect(2*fl+(fl<0?-3:0),-15.6,3,1)}}
 const hat=L.ht;
 if(hat){const hc=L.hc||'#8a5a2e',tc=L.tp;c.strokeStyle='#2a1a10';c.lineWidth=.6;
  if(hat=='p'){c.fillStyle='#1c2f5a';c.fillRect(-6,-26,12,4);c.strokeRect(-6,-26,12,4);c.fillStyle='#111';c.fillRect(-7,-22.4,14,1.6);c.fillStyle='#e8c040';if(!back)c.fillRect(-1,-25,2,2)}
  else if(hat=='c'){c.fillStyle='#fff';c.fillRect(-5,-34,10,8);c.strokeRect(-5,-34,10,8);c.fillRect(-6,-27,12,2);c.strokeRect(-6,-27,12,2)}
  else if(hat=='n'){c.fillStyle='#fff';c.fillRect(-4,-25.6,8,3);c.fillStyle='#e0443a';c.fillRect(-1,-25,2,2)}
  else if(hat=='a'||hat=='f'){c.fillStyle=hc;c.fillRect(-5,-26,10,3);c.strokeRect(-5,-26,10,3);c.fillRect(-9,-23.4,18,1.8);c.strokeRect(-9,-23.4,18,1.8)}
  else{c.fillStyle=hc;c.fillRect(-6,-26.4,12,4);c.strokeRect(-6,-26.4,12,4);if(!back){c.fillRect(-7,-22.8,14,1.4)}}}
 if(o.um){c.fillStyle='#e0443a';c.strokeStyle='#2a1a10';c.lineWidth=.8;const ux=7*(side?fl:1)+(front?4:0);c.beginPath();c.moveTo(ux-13,-30);c.quadraticCurveTo(ux,-42,ux+13,-30);c.quadraticCurveTo(ux,-33,ux-13,-30);c.fill();c.stroke();c.beginPath();c.moveTo(ux,-33);c.lineTo(ux,-13);c.stroke()}
 c.restore()}
