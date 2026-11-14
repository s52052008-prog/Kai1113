/* ===== v9：夜間燈光、輸入、主迴圈 ===== */
function drawTree(c,t){if(window.uaTree&&uaTree(c,t))return;const w=wx(),sw=Math.sin(NOW/(w==3?260:1400)+t.x*.05)*(w==3?.16:.02)+(w==3?Math.sin(NOW/900)*.06:0);c.save();c.translate(t.x+14,t.y+37);c.transform(1,0,sw,1,0,0);c.scale(t.sc||1,t.sc||1);c.drawImage(treeSprite(t.k,t.v),-24,-60,48,66);c.restore()}
const p={x:84,y:664,w:12,h:8,dir:0,fr:0,t:0,mv:false,vx:0,vy:0};
function drawPlayer(c){drawChar(c,{x:p.x,y:p.y,dir:p.dir,mv:p.mv,fr:p.fr,lk:ALLEN,ph:NOW/1000,um:wx()==2&&!scene})}
const CAM={x:0,y:0};
const staticBlk=()=>p.x<0||p.y<-NY||p.x+p.w>WW||p.y+p.h>WH||solids.some(o=>hit(p,o))||NP.some(o=>!o.vh&&!o.hid&&!o.walk&&o.b!='loop'&&!o.t&&hit(p,o));
const vehBlk=()=>TR.some(o=>!o.hold&&hit(p,o));
const blocked=()=>scene?iBlocked():staticBlk()||vehBlk()||(typeof fireBlk=='function'&&fireBlk());
function step(dx,dy){const ox=p.x,oy=p.y;const was=scene?false:vehBlk();p.x+=dx;p.y+=dy;
 const bad=()=>scene?iBlocked():(staticBlk()||(!was&&vehBlk()));
 if(!bad())return;
 // 邊角滑行：前方被轉角擋住時，朝可通過的一側微推（最多探 6px）
 const ax=dx!=0;
 for(let o=1;o<=6;o++)for(const sg of [1,-1]){
  if(ax){p.x=ox+dx;p.y=oy+sg*o}else{p.x=ox+sg*o;p.y=oy+dy}
  if(!bad()){const k=sg*Math.min(1.5,o);if(ax){p.x=ox;p.y=oy+k}else{p.x=ox+k;p.y=oy}if(!bad())return}}
 p.x=ox;p.y=oy}
const keys={},MAP={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',KeyA:'left',KeyD:'right',KeyW:'up',KeyS:'down'};
function act(){if(document.activeElement&&document.activeElement.tagName=='BUTTON')document.activeElement.blur();
 if(MG){MG.press&&MG.press();return}
 if(!dlg.hidden){const b=dbox.querySelectorAll('button')[dlgSel];if(b&&!b.disabled&&dlgFns[dlgSel])dlgFns[dlgSel]();return}
 if(scene)return inAct();
 if(safetyAct())return;
 const n=NP.filter(n=>!n.vh&&!n.hid&&Math.hypot(n.x-p.x,n.y-p.y)<48).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];
 const pq=PL.map(q=>({q,d:Math.hypot(q.x+q.w/2-(p.x+6),q.y+q.h/2-(p.y+4))})).filter(o=>o.d<28).sort((a,b)=>a.d-b.d)[0],nd=n?Math.hypot(n.x-p.x,n.y-p.y):99;
 if(pq&&pq.d<=nd)return farmMenu(pq.q);if(n)return talk(n);
 if(st.comp&&PET.on&&Math.hypot(PET.x-p.x,PET.y-p.y)<34)return petTalk(PET);
 const sp=nearSpot();if(sp)return sp.fn();
 const z=Z.find(z=>hit({x:p.x-6,y:p.y-8,w:p.w+12,h:p.h+16},z));if(z)return askEnter(z);
 toast('附近沒有可互動的對象（走到建築南側門口可進入）')}
addEventListener('keydown',e=>{
  if(e.target&&e.target.tagName=='TEXTAREA')return;
  if(e.target&&e.target.tagName=='INPUT'){if(e.key=='Enter'){e.preventDefault();const b=document.getElementById('aiSend');b&&b.click()}return}
  if(e.key==' '||e.key=='Enter'){e.preventDefault();if(!e.repeat)act();return}
  if(e.key=='c'||e.key=='C'||e.key=='Escape'||e.key=='Backspace'){if(!e.repeat)cancel();return}
  if((e.key=='b'||e.key=='B')&&!e.repeat){if(dlg.hidden)openBag();return}
  if((e.key=='m'||e.key=='M')&&!e.repeat){if(dlg.hidden&&!scene)cityMap();return}
  if(!dlg.hidden){const m=MAP[e.key]||MAP[e.code];if(m=='up'||m=='down'){e.preventDefault();const n=dbox.querySelectorAll('button').length;dlgSel=(dlgSel+(m=='down'?1:n-1))%n;selUpdate();return}
   const i=+e.key-1,b=dbox.querySelectorAll('button')[i];if(b&&!b.disabled&&dlgFns[i])dlgFns[i]();return}
  const k=MAP[e.key]||MAP[e.code];if(k){keys[k]=1;e.preventDefault()}});
addEventListener('keyup',e=>{if(e.key==' '||e.key=='Enter')e.preventDefault();const k=MAP[e.key]||MAP[e.code];if(k)keys[k]=0});addEventListener('blur',()=>{for(const k in keys)keys[k]=0});
document.querySelectorAll('#pad button[data-k]').forEach(b=>{const k=b.dataset.k;
  b.addEventListener('pointerdown',e=>{e.preventDefault();keys[k]=1});
  ['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>keys[k]=0))});
document.querySelectorAll('#pad [data-a]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();const a=b.dataset.a;a=='act'?act():a=='cancel'?cancel():a=='bag'?(dlg.hidden&&openBag()):a=='map'?(dlg.hidden&&!scene&&cityMap()):(dlg.hidden&&openMenu())}));
cv.addEventListener('pointerdown',e=>{if(!dlg.hidden||scene)return;
 const r=cv.getBoundingClientRect(),wx2=CAM.x+(e.clientX-r.left)*W/r.width,wy2=CAM.y+(e.clientY-r.top)*H/r.height;
 const qq=PL.find(q=>wx2>=q.x&&wx2<=q.x+q.w&&wy2>=q.y-10&&wy2<=q.y+q.h);if(qq){if(Math.hypot(qq.x+qq.w/2-(p.x+6),qq.y+qq.h/2-(p.y+4))>44)return toast('走近一點再點菜圃');return farmMenu(qq)}
 const n=NP.find(n=>!n.vh&&!n.hid&&wx2>=n.x-8&&wx2<=n.x+n.w+8&&wy2>=n.y-(n.t?14:36)&&wy2<=n.y+n.h+6);
 if(!n)return;if(Math.hypot(n.x-p.x,n.y-p.y)>80)return toast('走近一點，再點擊 '+n.n);talk(n)});
/* ── 夜間燈光 ── */
const nf=()=>{const h=T.hour;return h>=19.5||h<5?1:h>=17.5?(h-17.5)/2:h<7?(7-h)/2:0};
const GLOW=mkSpr(40,40,c=>{const r=c.createRadialGradient(20,20,0,20,20,20);r.addColorStop(0,'rgba(255,225,150,.9)');r.addColorStop(.4,'rgba(255,200,110,.35)');r.addColorStop(1,'rgba(255,200,110,0)');c.fillStyle=r;c.fillRect(0,0,40,40)});
const BEAM=mkSpr(44,22,c=>{const r=c.createLinearGradient(0,0,44,0);r.addColorStop(0,'rgba(255,248,200,.6)');r.addColorStop(1,'rgba(255,248,200,0)');c.fillStyle=r;c.beginPath();c.moveTo(0,8);c.lineTo(44,0);c.lineTo(44,22);c.lineTo(0,14);c.fill()});
const BN={};B.forEach(b=>BN[b.n]=b);
function lights(){const n=nf(),L=Math.min(1,n+(wx()==2?.25*(1-n):0)),vx=CAM.x-40,vy=CAM.y-40,vw=W+80,vh=H+80,vis=(x,y,w,h)=>x+w>vx&&x<vx+vw&&y+h>vy&&y<vy+vh;
 g.save();g.translate(-CAM.x,-CAM.y);g.globalCompositeOperation='lighter';
 HEADS.forEach(h=>{if(!vis(h.x,h.y,8,14))return;const t=ls(h.ax);g.fillStyle=t=='r'?'rgba(255,50,40,.9)':t=='y'?'rgba(255,210,10,.9)':'rgba(40,230,100,.9)';g.beginPath();g.arc(h.x+3,h.y+(t=='r'?2.5:t=='y'?6.5:10.5),3,0,7);g.fill()});
 TR.forEach(v=>{if(v.hold>0||v.k!='police'||!v.siren||!vis(v.x-20,v.y-20,v.w+40,v.h+40))return;const ph=Math.floor(NOW/130)%2;g.globalAlpha=.55;g.drawImage(GLOW,v.x+v.w/2-ph*0-26,v.y+v.h-30,52,52);g.globalAlpha=1});
 if(L>.02){
  WIN.forEach(w=>{if(!vis(w[0],w[1],w[2],w[3]))return;const bb=BN[w[4]];if(bb&&bb.hr&&!bHour(bb)&&T.hour>=bb.hr[1]%24&&!w[6]&&0)return;const k=(w[0]*7+w[1]*13)&7;if(!w[6]&&k>5)return;if(w[6]&&bb&&bb.hr&&!bHour(bb))return;g.fillStyle=`rgba(${k<3?'255,214,120':k<5?'255,236,190':'150,200,255'},${.7*L})`;g.fillRect(w[0]+1,w[1]+1,w[2]-2,w[3]-2);g.globalAlpha=.28*L;g.drawImage(GLOW,w[0]-10,w[1]-10,w[2]+20,w[3]+20);g.globalAlpha=1});
  SIGNS.forEach(q=>{if(!vis(q[0],q[1],q[2],q[3]))return;g.globalAlpha=.5*L;g.fillStyle=q[4];g.fillRect(q[0],q[1],q[2],q[3]);g.globalAlpha=.4*L;g.drawImage(GLOW,q[0]-14,q[1]-6,q[2]+28,q[3]+12);g.globalAlpha=1});
  LAMPS.forEach(l=>{if(!vis(l[0]-40,l[1]-10,80,70))return;g.globalAlpha=.8*L;g.drawImage(GLOW,l[0]-24,l[1]-22,48,48);g.globalAlpha=.3*L;g.drawImage(GLOW,l[0]-30,l[1]+26,60,22);g.globalAlpha=1});
  BULBS.forEach(l=>{if(!vis(l[0]-8,l[1]-8,16,16))return;g.globalAlpha=.7*L;g.drawImage(GLOW,l[0]-7,l[1]-7,14,14);g.globalAlpha=1});
  TR.forEach(v=>{if(v.hold>0||!vis(v.x-50,v.y-50,v.w+100,v.h+100))return;const X=v.ax=='x',d=v.dir,fx=X?(d>0?v.x+v.w-2:v.x+2):v.x+v.w/2,fy=X?v.y+v.h-(v.k=='moto'||v.k=='rmoto'?8:7):(d>0?v.y+v.h-2:v.y+2),a=X?(d>0?0:Math.PI):(d>0?Math.PI/2:-Math.PI/2);
   g.save();g.translate(fx,fy);g.rotate(a);g.globalAlpha=.9*L;g.drawImage(BEAM,0,-11,44,22);g.restore();g.globalAlpha=1})}
 g.restore()}
function drawWires(){g.save();g.translate(-CAM.x,-CAM.y);g.strokeStyle='rgba(30,25,25,.75)';g.lineWidth=.55;g.beginPath();
 WS.forEach(w=>{if(Math.max(w[0],w[2])<CAM.x-10||Math.min(w[0],w[2])>CAM.x+W+10)return;for(let k=0;k<4;k++){const o=k*2.2;g.moveTo(w[0],w[1]+o);g.quadraticCurveTo((w[0]+w[2])/2,(w[1]+w[3])/2+7+k*1.5,w[2],w[3]+o)}});g.stroke();g.restore()}
/* ── 主迴圈 ── */
let last=performance.now(),qT=0,qN=0,qW=0;
function qa(raw){if(raw>250||K<=2||++qW<40)return;qT+=raw;if(++qN>=90){const av=qT/qN;qT=qN=0;if(av>34){K=K>4?4:K>3?3:2;cv.width=Math.round(W*K);cv.height=Math.round(H*K);qW=0}}}
function frame(now){try{frame0(now)}catch(err){console.error(err)}requestAnimationFrame(frame)}
function frame0(now){NOW=now;
  const dt=Math.max(0,Math.min(.05,(now-last)/1000));qa(now-last);last=now;
  if(MG){mgFrame(dt);return}
  if(dlg.hidden&&!window.TITLE){
    advance(dt/(window.TSPD||80));
    let dx=(keys.right?1:0)-(keys.left?1:0),dy=(keys.down?1:0)-(keys.up?1:0);if(dx&&dy){dx*=.707;dy*=.707}const ac=Math.min(1,dt*14);const SPD=105*spdMul()*(typeof vSpeed=='function'?vSpeed():1);p.vx+=(dx*SPD-p.vx)*ac;p.vy+=(dy*SPD-p.vy)*ac;p.mv=Math.hypot(p.vx,p.vy)>8;scene?updateIn(dt):(updateWorld(dt),safetyTick(dt),rentTick());
    if(p.mv){
      if(dx||dy)p.dir=!dx?(dy>0?0:1):!dy?(dx<0?2:3):dy>0?(dx<0?4:5):(dx<0?6:7);
      step(p.vx*dt,0);step(0,p.vy*dt);p.t+=dt;if(p.t>.15){p.t=0;p.fr=typeof p.fr=='string'?p.fr:p.fr^1}if(!scene)checkZone()}
  }else p.mv=false;
  if(scene){drawIn();return}
  copSync();
  const cx=Math.round(clamp(p.x-W/2,0,WW-W)),cy=Math.round(clamp(p.y-H/2,-NY,WH-H));CAM.x=cx;CAM.y=cy;
  g.setTransform(K,0,0,K,0,0);g.imageSmoothingEnabled=false;g.drawImage(S0,cx*KS,(cy+NY)*KS,W*KS,H*KS,0,0,W,H);g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(S,cx*KS,(cy+NY)*KS,W*KS,H*KS,0,0,W,H);
  g.save();g.translate(-cx,-cy);
  const a=[],X0=cx-70,X1=cx+W+70,Y0=cy-90,Y1=cy+H+90,iv=(x,y)=>x>X0&&x<X1&&y>Y0&&y<Y1;
  trees.forEach(t=>{if(iv(t.x,t.y))a.push({y:t.y+36,f:()=>drawTree(g,t)})});
  TR.forEach(v=>{if(v.hold>0||!iv(v.x,v.y))return;a.push({y:v.y+v.h,f:()=>drawVeh(g,v)})});
  NP.forEach(n=>{if(n.vh||n.hid||!iv(n.x,n.y))return;a.push({y:n.y+n.h,f:()=>{(n.t?drawA:drawH)(g,n);label(n)}})});
  safetyDraw(a);
  DEC.forEach(d=>{if(d.__edonly)return;if(d.x+d.w>X0&&d.x<X1&&d.y+d.h>Y0&&d.y<Y1)a.push({y:d.y+d.h+(d.z||0),f:()=>{g.fillStyle='rgba(30,18,0,.15)';g.beginPath();g.ellipse(d.x+d.w/2+1,(d.by==null?d.y+d.h:d.by)-1.5,d.w*.4,Math.max(1.8,d.h*.07),0,0,7);g.fill();g.drawImage(d.spr,d.x,d.y,d.w,d.h)}})});
  PL.forEach(q=>{if(iv(q.x,q.y))a.push({y:q.y+q.h-10,f:()=>drawPlot(g,q)})});
  if(typeof BOV!='undefined')BOV.forEach(o=>{if(o.x+o.w>X0&&o.x<X1&&o.y+o.h>Y0&&o.y<Y1)a.push({y:o.by,f:()=>bovDraw(g,o)})});
  HEADS.forEach(h=>{if(iv(h.x,h.y))a.push({y:h.y+22,f:()=>drawLt(g,h.x,h.y,h.ax)})});
  if(st.comp&&PET.on)a.push({y:PET.y+PET.h,f:()=>drawA(g,PET)});
  a.push({y:p.y+p.h,f:()=>drawPlayer(g)});
  a.sort((u,v)=>u.y-v.y).forEach(i=>i.f());
  const sp=nearSpot();if(sp)txt(g,'▼ '+sp.n+'（空白鍵）',sp.x+sp.w/2,sp.y-4,'#ffd84a','bold 8px sans-serif');
  const zz=zone&&hit({x:p.x-6,y:p.y-8,w:p.w+12,h:p.h+16},zone)?zone:null;if(zz)txt(g,'▲ '+(zz.b.sg||zz.n)+'（空白鍵：進入）',zz.x+zz.w/2,zz.y+24,'#ffd84a','bold 8px sans-serif');
  g.restore();drawWires();clouds();tint();lights();weatherFx(dt);vig();safetyHud();
}
/* ── 手機雙搖桿：左右手都能移動；A/B/背包/選單可左右互換 ── */
const STK={l:{x:0,y:0,id:null},r:{x:0,y:0,id:null}};
function applySticks(){if(!document.getElementById('pad'))return;const dx=STK.l.x+STK.r.x,dy=STK.l.y+STK.r.y,T0=.28;
 if(STK.l.id==null&&STK.r.id==null&&!dx&&!dy)return;
 keys.left=dx<-T0?1:0;keys.right=dx>T0?1:0;keys.up=dy<-T0?1:0;keys.down=dy>T0?1:0}
['l','r'].forEach(s=>{const z=document.getElementById('z'+s);if(!z)return;const base=z.querySelector('.base'),knob=z.querySelector('.knob'),R0=40,S=STK[s];
 const set=(e)=>{const r=base.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy)||1,m=Math.min(d,R0);dx=dx/d*m;dy=dy/d*m;knob.style.transform=`translate(${dx}px,${dy}px)`;S.x=dx/R0;S.y=dy/R0;applySticks()};
 z.addEventListener('pointerdown',e=>{if(S.id!=null)return;e.preventDefault();S.id=e.pointerId;try{z.setPointerCapture(e.pointerId)}catch(_){}
  const zr=z.getBoundingClientRect(),bw=base.offsetWidth,x=Math.max(8,Math.min(zr.width-bw-8,e.clientX-zr.left-bw/2)),y=Math.max(8,Math.min(zr.height-bw-8,zr.bottom-e.clientY-bw/2));
  base.style.left=x+'px';base.style.right='auto';base.style.bottom=y+'px';base.style.background='rgba(255,246,220,.26)';set(e)});
 z.addEventListener('pointermove',e=>{if(e.pointerId===S.id){e.preventDefault();set(e)}});
 const up=e=>{if(e.pointerId!==S.id)return;S.id=null;S.x=S.y=0;knob.style.transform='';base.style.cssText='';applySticks();keys.left=keys.right=keys.up=keys.down=0};
 ['pointerup','pointercancel','lostpointercapture'].forEach(v=>z.addEventListener(v,up))});
setInterval(applySticks,90);
(()=>{const pd=document.getElementById('pad'),m=document.getElementById('mir');if(!pd||!m)return;try{if(localStorage.getItem('padMir')=='1')pd.classList.add('mir')}catch(_){}
 m.addEventListener('pointerdown',e=>{e.preventDefault();pd.classList.toggle('mir');try{localStorage.setItem('padMir',pd.classList.contains('mir')?'1':'0')}catch(_){}})})();
