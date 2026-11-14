/* v13.39 新紅綠燈（造景可新增／移動／設定秒數）＋行人小綠人＋麻雀、鴿子、蝴蝶 */
// ════════ 號誌資料 ════════
const TL={L:[],T:{},sel:null,drag:null,add:'car',gt:0};
const TLDEF=[13,9,2,2,0];// 橫向綠、直向綠、黃燈、全紅、時間差
const tlT=ix=>TL.T[ix]||TLDEF;
function tlIx(x,y){let b=-1,bd=130;IXS.forEach((q,i)=>{const d=Math.hypot(x-(q.x+q.w/2),y-(q.y+q.hh/2));if(d<bd){bd=d;b=i}});return b}
// 某個路口、某個方向現在的燈號
function tlState(ix,ax){const [gH,gV,yl,ar,off]=tlT(ix),C=gH+yl+ar+gV+yl+ar,t=((TL.gt+off)%C+C)%C;let s,left;
 if(t<gH){s=ax=='x'?'g':'r';left=ax=='x'?gH-t:gH+yl+ar-t}
 else if(t<gH+yl){s=ax=='x'?'y':'r';left=ax=='x'?gH+yl-t:gH+yl+ar-t}
 else if(t<gH+yl+ar){s='r';left=ax=='x'?C-t+ar*0:gH+yl+ar-t}
 else if(t<gH+yl+ar+gV){s=ax=='y'?'g':'r';left=ax=='y'?gH+yl+ar+gV-t:C-t}
 else if(t<gH+yl+ar+gV+yl){s=ax=='y'?'y':'r';left=ax=='y'?gH+yl+ar+gV+yl-t:C-t}
 else{s='r';left=ax=='y'?C-t+gH+yl+ar:C-t}
 return{s,left:Math.max(0,left)}}
// 行人號誌：車子那個方向是紅燈（而且不是全紅）的時候才是小綠人
function tlPed(ix,ax){const v=tlState(ix,ax),o=tlState(ix,ax=='x'?'y':'x');if(v.s=='r'&&o.s=='g')return{s:'walk',left:o.left,blink:o.left<4};return{s:'stop',left:0}}
// 車子：停止線看「那個路口、自己方向」有沒有燈
const TLHAS={};function tlRebuild(){for(const k in TLHAS)delete TLHAS[k];TL.L.forEach(l=>{if(l.k=='car'&&l.ix>=0)TLHAS[l.ix+l.ax]=1})}
stLt=function(L,st){if(st.ix==null){const cx=st.zone.x+st.zone.w/2,cy=st.zone.y+st.zone.h/2;st.ix=IXS.findIndex(q=>cx>=q.x-12&&cx<=q.x+q.w+12&&cy>=q.y-12&&cy<=q.y+q.hh+12)}
 if(st.ix<0||!TLHAS[st.ix+L.ax])return null;return tlState(st.ix,L.ax).s};
{const _t=trafficStep;trafficStep=function(dt){_t.apply(this,arguments);TL.gt+=dt}}
// ── 預設：每個路口 4 支車用號誌＋4 支行人號誌（換掉舊的） ──
function tlDefaults(){TL.L=[];TL.T={};IXS.forEach((q,i)=>{
 [['x',q.x-12,q.y+q.hh+24],['x',q.x+q.w+12,q.y-6],['y',q.x-12,q.y-6],['y',q.x+q.w+12,q.y+q.hh+24]].forEach(h=>TL.L.push({k:'car',ax:h[0],x:h[1],y:h[2],ix:i}));
 [['x',q.x-SWK+5,q.y-3],['x',q.x+q.w+SWK-5,q.y+q.hh+19],['y',q.x+q.w+3,q.y-SWK+4],['y',q.x-3,q.y+q.hh+SWK+2]].forEach(h=>TL.L.push({k:'ped',ax:h[0],x:h[1],y:h[2],ix:i}))});tlRebuild()}
tlDefaults();HEADS.length=0;

// ════════ 畫號誌 ════════
function tlLamp(c,x,y,r,on,col,dim){c.fillStyle='#0e0e12';c.beginPath();c.arc(x,y,r+.8,0,7);c.fill();c.fillStyle=on?col:dim;c.beginPath();c.arc(x,y,r,0,7);c.fill();
 if(on){c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.arc(x-r*.35,y-r*.35,r*.35,0,7);c.fill();c.save();c.globalCompositeOperation='lighter';const gr=c.createRadialGradient(x,y,0,x,y,r*3.2);gr.addColorStop(0,col.replace(')',',.55)').replace('rgb','rgba'));gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.beginPath();c.arc(x,y,r*3.2,0,7);c.fill();c.restore()}}
function tlDrawCar(c,l){const st=tlState(l.ix,l.ax),x=l.x,y=l.y,s=st.s;
 c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x+1,y,4,1.6,0,0,7);c.fill();
 // 燈桿
 c.fillStyle='#3c4048';c.fillRect(x-1.2,y-30,2.4,30);c.fillStyle='#5a606a';c.fillRect(x-1.2,y-30,.9,30);c.fillStyle='#2a2d33';c.fillRect(x-2.4,y-2,4.8,2);
 // 燈箱（黃色反光邊框，台灣常見）
 const bx=x-4.5,by=y-46;c.fillStyle='#f2c230';c.fillRect(bx-1.2,by-1.2,11.4,19.4);c.fillStyle='#1d1f24';c.fillRect(bx,by,9,17);c.fillStyle='#33363d';c.fillRect(bx,by,9,1.2);
 tlLamp(c,x,by+3.2,2.2,s=='r','rgb(255,60,48)','#4a1c1a');tlLamp(c,x,by+8.5,2.2,s=='y','rgb(255,200,30)','#4a3c16');tlLamp(c,x,by+13.8,2.2,s=='g','rgb(40,230,110)','#163f26');
 // 遮光罩
 c.fillStyle='#14161a';[3.2,8.5,13.8].forEach(o=>c.fillRect(bx+1.5,by+o-3.3,6,.9));
 // 倒數秒數
 const n=Math.ceil(st.left);if(n<100&&n>0){c.fillStyle='#0b0b0e';c.fillRect(x-5,by-9,10,7.5);c.strokeStyle='#555';c.lineWidth=.5;c.strokeRect(x-5,by-9,10,7.5);c.font='bold 6px monospace';c.textAlign='center';c.fillStyle=s=='r'?'#ff5a4a':s=='y'?'#ffd60a':'#4aff8a';c.fillText(String(n),x,by-3.2)}}
function tlMan(c,x,y,walk,ph,col){c.fillStyle=col;if(!walk){c.fillRect(x-1,y-6,2,2);c.fillRect(x-1.5,y-4,3,4);c.fillRect(x-1.5,y,1.2,3);c.fillRect(x+.3,y,1.2,3);c.fillRect(x-2.5,y-3.6,1,3);c.fillRect(x+1.5,y-3.6,1,3)}
 else{const f=Math.floor(ph*6)%2;c.fillRect(x-.6,y-6,2,2);c.fillRect(x-1.2,y-4,2.6,3.6);if(f){c.fillRect(x-2.6,y-.4,1.3,3.4);c.fillRect(x+1.2,y-.4,1.3,3.4);c.fillRect(x-2.6,y-3.4,1,2.4);c.fillRect(x+1.6,y-3.4,1,2.4)}else{c.fillRect(x-1,y-.4,1.3,3.4);c.fillRect(x+.2,y-.4,1.3,3.4);c.fillRect(x-.6,y-3.4,1,3);c.fillRect(x+.4,y-3.4,1,3)}}}
function tlDrawPed(c,l){const p2=tlPed(l.ix,l.ax),x=l.x,y=l.y,walk=p2.s=='walk',vis=!(walk&&p2.blink&&Math.floor(NOW/250)%2);
 c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x+.5,y,3,1.3,0,0,7);c.fill();c.fillStyle='#3c4048';c.fillRect(x-1,y-20,2,20);c.fillStyle='#5a606a';c.fillRect(x-1,y-20,.7,20);
 const bx=x-4,by=y-36;c.fillStyle='#262930';c.fillRect(bx-.8,by-.8,9.6,17.6);c.fillStyle='#101114';c.fillRect(bx,by,8,7.4);c.fillRect(bx,by+8.4,8,7.4);
 if(!walk)tlMan(c,x,by+5,false,0,'#ff4a3a');else{c.fillStyle='#3a1210';c.fillRect(bx+2.5,by+1.4,3,4.5)}
 if(walk&&vis)tlMan(c,x,by+13.4,true,NOW/1000,'#3dff7a');else{c.fillStyle='#10301c';c.fillRect(bx+2.5,by+9.8,3,4.5)}
 if(walk){const n=Math.ceil(p2.left);c.fillStyle='#3dff7a';c.font='bold 5px monospace';c.textAlign='center';c.fillText(String(n),x+7,by+14)}
 if(vis){c.save();c.globalCompositeOperation='lighter';c.fillStyle=walk?'rgba(60,255,120,.18)':'rgba(255,70,50,.18)';c.beginPath();c.arc(x,walk?by+12:by+3.7,6,0,7);c.fill();c.restore()}}
{const _sd=safetyDraw;safetyDraw=function(a){_sd.apply(this,arguments);if(scene)return;try{TL.L.forEach(l=>{if(l.x<CAM.x-30||l.x>CAM.x+W+30||l.y<CAM.y-10||l.y>CAM.y+H+60)return;a.push({y:l.y,f:()=>l.k=='car'?tlDrawCar(g,l):tlDrawPed(g,l)})})}catch(e){}}}

// ════════ 造景模式：🚦 號誌 ════════
{const bar=gzUI.querySelector('.gzTop'),ref=bar.querySelector('[data-t="pan"]'),bt=document.createElement('button');bt.dataset.t='tl';bt.title='新增、移動紅綠燈和行人號誌，設定秒數';bt.textContent='🚦 號誌';bar.insertBefore(bt,ref)}
const tlPick=(x,y)=>{let b=null,bd=12;TL.L.forEach(l=>{const top=l.k=='car'?48:38;if(x>l.x-7&&x<l.x+7&&y>l.y-top&&y<l.y+3){const d=Math.abs(x-l.x);if(d<bd){bd=d;b=l}}});return b};
const tlSnap=()=>JSON.stringify({L:TL.L,T:TL.T});
function tlLoad(j){const q=JSON.parse(j);TL.L=q.L;TL.T=q.T;TL.sel=null;tlRebuild()}
function tlPush(before){const after=tlSnap();if(before!=after)gzPush(()=>tlLoad(before))}
addEventListener('pointerdown',ev=>{if(!ED.on||ED.room||ED.tool!='tl'||!dlg.hidden||ev.target!==cv)return;ev.stopImmediatePropagation();ev.preventDefault();
 if(ev.button==1||ev.button==2){ED.drag={m:'pan',sx:ev.clientX,sy:ev.clientY,cx:ED.cx,cy:ED.cy};return}
 const [x,y]=gzW(ev),l=tlPick(x,y),before=tlSnap();
 if(l){TL.sel=l;TL.drag={l,ox:x-l.x,oy:y-l.y,before};gzRefresh();return}
 const n={k:TL.add,ax:'y',x:Math.round(x),y:Math.round(y)+(TL.add=='car'?40:30),ix:-1};n.ix=tlIx(n.x,n.y);TL.L.push(n);TL.sel=n;tlRebuild();tlPush(before);
 toast(n.ix>=0?'🚦 新增了'+(n.k=='car'?'紅綠燈':'行人號誌')+'（綁在附近的路口）':'這裡附近沒有十字路口，號誌只會當裝飾');gzRefresh()},true);
addEventListener('pointermove',ev=>{const d=TL.drag;if(!d||!ED.on)return;ev.stopImmediatePropagation();const [x,y]=gzW(ev);d.l.x=Math.round(x-d.ox);d.l.y=Math.round(y-d.oy)},true);
addEventListener('pointerup',ev=>{const d=TL.drag;if(!d)return;TL.drag=null;ev.stopImmediatePropagation();d.l.ix=tlIx(d.l.x,d.l.y);tlRebuild();tlPush(d.before);gzRefresh()},true);
addEventListener('keydown',ev=>{if(!ED.on||ED.tool!='tl'||!TL.sel||!dlg.hidden)return;const t=ev.target&&ev.target.tagName;if(t=='INPUT')return;const k=ev.key;
 if(k=='Delete'||k=='Backspace'){ev.preventDefault();ev.stopImmediatePropagation();tlDel()}
 else if(k.startsWith('Arrow')){ev.preventDefault();ev.stopImmediatePropagation();const b=tlSnap(),n=ev.shiftKey?8:1,l=TL.sel;if(k=='ArrowLeft')l.x-=n;if(k=='ArrowRight')l.x+=n;if(k=='ArrowUp')l.y-=n;if(k=='ArrowDown')l.y+=n;l.ix=tlIx(l.x,l.y);tlRebuild();tlPush(b)}},true);
function tlDel(){const l=TL.sel;if(!l)return;const b=tlSnap();arrDel(TL.L,l);TL.sel=null;tlRebuild();tlPush(b);toast('🚦 號誌刪掉了');gzRefresh()}
gzFrame=(f=>function(now){f(now);if(ED.room)return;try{const z=ED.z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);
 if(ED.tool=='tl'){IXS.forEach((q,i)=>{g.strokeStyle='rgba(120,200,255,.6)';g.lineWidth=1/z;g.setLineDash([3/z,3/z]);g.strokeRect(q.x,q.y,q.w,q.hh);g.setLineDash([]);g.fillStyle='rgba(120,200,255,.9)';g.font=`bold ${8/z}px sans-serif`;g.textAlign='center';g.fillText('路口 '+(i+1),q.x+q.w/2,q.y+q.hh/2)})}
 TL.L.forEach(l=>{if(l.k=='car')tlDrawCar(g,l);else tlDrawPed(g,l);if(ED.tool=='tl'){g.strokeStyle=l===TL.sel?'#ffd84a':(l.ix<0?'rgba(255,90,90,.9)':'rgba(255,255,255,.5)');g.lineWidth=(l===TL.sel?2:1)/z;const top=l.k=='car'?48:38;g.strokeRect(l.x-7,l.y-top,14,top+3);
   if(l===TL.sel&&l.ix>=0){const q=IXS[l.ix];g.strokeStyle='#ffd84a';g.beginPath();g.moveTo(l.x,l.y-top/2);g.lineTo(q.x+q.w/2,q.y+q.hh/2);g.stroke()}}});
 g.restore()}catch(e){}})(gzFrame);
gzSelUI=(f=>function(){if(ED.tool!='tl'||ED.room)return f.apply(this,arguments);const box=$e('gzSel'),l=TL.sel;if(!l){box.style.display='none';return}box.style.display='flex';const T=tlT(l.ix);
 const num=(i,nm)=>`<label style="display:flex;align-items:center;gap:2px">${nm}<input data-tt="${i}" type="number" min="${i==4?0:1}" max="90" value="${T[i]}" style="width:42px;font:inherit;padding:1px 3px;border-radius:4px;border:1px solid #c98a3a;background:#fff8e6;color:#3a2410">秒</label>`;
 box.innerHTML=`<b>${l.k=='car'?'🚦 紅綠燈':'🚶 行人號誌'}</b><span style="opacity:.8">${l.ix>=0?'路口 '+(l.ix+1):'⚠ 不在路口（只當裝飾）'}</span>
  <button data-tl="ax">${l.k=='car'?(l.ax=='x'?'管：↔ 橫向的車':'管：↕ 直向的車'):(l.ax=='x'?'過：橫向馬路':'過：直向馬路')}</button><button data-tl="del">🗑 刪除</button><button data-tl="x">✕</button>
  ${l.ix>=0?`<div style="flex-basis:100%;display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:3px;padding-top:4px;border-top:1px dashed rgba(255,255,255,.3)"><b style="color:#ffd84a">⏱ 這個路口的秒數</b>${num(0,'↔ 綠')}${num(1,'↕ 綠')}${num(2,'黃')}${num(3,'全紅')}${num(4,'時間差')}<button data-tl="rst">↺ 預設</button></div>`:''}`;
 box.querySelectorAll('[data-tt]').forEach(inp=>{['keydown','keyup'].forEach(e=>inp.addEventListener(e,ev=>ev.stopPropagation()));inp.onchange=()=>{const b=tlSnap(),T2=tlT(l.ix).slice();T2[+inp.dataset.tt]=Math.max(+inp.dataset.tt==4?0:1,Math.min(90,+inp.value||0));TL.T[l.ix]=T2;tlPush(b);toast('⏱ 路口 '+(l.ix+1)+' 的秒數改好了')}})})(gzSelUI);
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-tl]'),a=ev.target.closest('[data-tladd]');
 if(a){ev.stopImmediatePropagation();TL.add=a.dataset.tladd;gzRefresh();return}if(!b)return;ev.stopImmediatePropagation();const l=TL.sel,k=b.dataset.tl;
 if(k=='del')return tlDel();if(k=='x'){TL.sel=null;return gzRefresh()}
 const before=tlSnap();if(k=='ax'&&l){l.ax=l.ax=='x'?'y':'x';tlRebuild()}if(k=='rst'&&l){delete TL.T[l.ix]}tlPush(before);gzRefresh()},true);
{const _r=gzRefresh;gzRefresh=function(){_r.apply(this,arguments);try{if(ED.tool!='tl'){TL.sel=null;return}if(ED.room)return;
 $e('gzHint').textContent='點空白處＝新增號誌；拖曳移動、Delete 刪除；選取後可以切換管哪個方向、設定路口秒數。藍色虛線框＝路口';
 $e('gzTabs').innerHTML='<div style="font-size:13px;padding:4px">🚦 號誌</div>';
 $e('gzGrid').innerHTML=`<div style="grid-column:1/-1;font-size:12.5px;line-height:1.7;padding:6px">點地圖新增：<div style="display:flex;gap:6px;margin:6px 0"><button data-tladd="car" style="flex:1;font:inherit;padding:6px;border-radius:8px;border:2px solid ${TL.add=='car'?'#ffd84a':'#8a5a2e'};background:#3a2414;color:#fff6dc">🚦 紅綠燈</button><button data-tladd="ped" style="flex:1;font:inherit;padding:6px;border-radius:8px;border:2px solid ${TL.add=='ped'?'#ffd84a':'#8a5a2e'};background:#3a2414;color:#fff6dc">🚶 行人號誌</button></div>
  <span style="opacity:.85">・號誌會自動綁到最近的路口（藍色虛線框）。<br>・<b>車子只會在「有放紅綠燈」的方向停下來</b>；沒放燈的路口，車子直接通過。<br>・同一個路口的燈共用秒數，兩個方向會自動錯開。<br>・「時間差」可以讓下一個路口晚幾秒變綠，車子一路綠燈（綠波）。<br>・行人號誌：車子停下來那個方向的斑馬線就會是小綠人，最後 4 秒會閃。</span></div>`;$e('gzOpt').innerHTML=''}catch(e){}}}
// 存檔／讀檔
{const _s=gzSerialize;gzSerialize=function(){const m=_s.apply(this,arguments);try{m.tl={L:TL.L.map(l=>[l.k=='car'?0:1,l.ax=='x'?0:1,Math.round(l.x),Math.round(l.y)]),T:TL.T}}catch(e){}return m}}
{const _a=gzApply;gzApply=function(m){const r=_a.apply(this,arguments);try{if(m&&m.tl){TL.L=m.tl.L.map(q=>{const l={k:q[0]?'ped':'car',ax:q[1]?'y':'x',x:q[2],y:q[3]};l.ix=tlIx(l.x,l.y);return l});TL.T=m.tl.T||{};tlRebuild()}}catch(e){console.error(e)}return r}}
{const _r=gzReset;gzReset=function(){const r=_r.apply(this,arguments);try{tlDefaults()}catch(e){}return r}}
// 警察指揮也跟著第 1 個路口
copSync=function(){NP.forEach(n=>{if(n.pose=='dir')n.go=tlState(0,'x').s=='g'})};

// ════════ 🐦 麻雀、鴿子、🦋 蝴蝶 ════════
const BIRDS=[],BUTS=[];
function birdSpots(){const a=[];try{DEC.forEach(d=>{if(!d||!d.w)return;const k=String(d.k||'');if(/bench|椅|fount|噴水|statue|雕/.test(k))a.push({x:d.x+d.w/2,y:d.y+d.h})})}catch(e){}
 try{(typeof SPOTS!='undefined'?SPOTS:[]).forEach(s=>{if(/公園|廣場|花園|教會|車站/.test(s.n||''))a.push({x:s.x+s.w/2,y:s.y+s.h+20})})}catch(e){}
 IXS.forEach(q=>{a.push({x:q.x-SWK/2,y:q.y-SWK/2});a.push({x:q.x+q.w+SWK/2,y:q.y+q.hh+SWK/2})});return a}
let BSP=null;
function birdSpawn(){if(!BSP||!BSP.length)BSP=birdSpots();const c=BSP[(Math.random()*BSP.length)|0];if(!c)return;const pig=Math.random()<.4,n=pig?2+((Math.random()*3)|0):3+((Math.random()*4)|0);
 for(let i=0;i<n;i++)BIRDS.push({x:c.x+(Math.random()-.5)*50,y:c.y+(Math.random()-.5)*26,z:0,vx:0,vy:0,vz:0,st:'ground',t:Math.random()*3,pig,dir:Math.random()<.5?-1:1,ph:Math.random()*6,life:60+Math.random()*60,col:pig?['#8a8f9a','#a0a4ae','#6f747e'][i%3]:null})}
function gardenSpots(){const a=[];try{DEC.forEach(d=>{const k=String(d.k||'');if(/flower|花|bush|灌|garden/.test(k))a.push({x:d.x+d.w/2,y:d.y+d.h*.5})});trees.forEach(t=>{if(Math.random()<.15)a.push({x:t.x+14,y:t.y+30})})}catch(e){}return a}
let GSP=null;
function butSpawn(){if(!GSP)GSP=gardenSpots();if(!GSP.length)return;const c=GSP[(Math.random()*GSP.length)|0];BUTS.push({hx:c.x,hy:c.y,x:c.x,y:c.y-10,t:Math.random()*9,life:40+Math.random()*40,col:['#ffd84a','#ff8fb1','#8ad0ff','#ffffff','#ff9f43'][(Math.random()*5)|0],sp:.6+Math.random()*.6})}
function critStep(dt){if(scene||(typeof ED!='undefined'&&ED.on))return;const night=typeof nightMode=='function'&&nightMode(),rain=typeof wx=='function'&&wx()==2;
 const cx=CAM.x+W/2,cy=CAM.y+H/2;
 if(!night&&!rain&&BIRDS.length<16&&Math.random()<dt*.25)birdSpawn();
 if(!night&&!rain&&BUTS.length<8&&Math.random()<dt*.35)butSpawn();
 for(let i=BIRDS.length-1;i>=0;i--){const b=BIRDS[i];b.t-=dt;b.life-=dt;b.ph+=dt*(b.st=='fly'?18:4);
  const dP=Math.hypot(p.x+6-b.x,p.y+8-b.y);const scare=dP<26||TR.some(v=>v.hold<=0&&Math.abs(v.x+v.w/2-b.x)<24&&Math.abs(v.y+v.h/2-b.y)<18);
  if(b.st=='ground'){if(scare||b.life<0||night||rain){b.st='fly';const a=Math.atan2(b.y-(p.y+8),b.x-(p.x+6))+(Math.random()-.5);b.vx=Math.cos(a)*90;b.vy=Math.sin(a)*50-20;b.vz=60+Math.random()*30;b.dir=b.vx>0?1:-1}
   else if(b.t<=0){const r=Math.random();if(r<.45){b.hop=.25;b.hx=(Math.random()-.5)*14;b.hy=(Math.random()-.5)*8;if(b.hx)b.dir=b.hx>0?1:-1}b.peck=r>=.45&&r<.8?.5:0;b.t=.6+Math.random()*1.8}
   if(b.hop>0){b.hop-=dt;b.x+=b.hx*dt*4;b.y+=b.hy*dt*4;b.z=Math.sin(b.hop/.25*Math.PI)*3}else b.z=0;if(b.peck>0)b.peck-=dt}
  else{b.x+=b.vx*dt;b.y+=b.vy*dt;b.z+=b.vz*dt;b.vz=Math.max(10,b.vz-20*dt);if(b.z>140||Math.abs(b.x-cx)>W||Math.abs(b.y-cy)>H)BIRDS.splice(i,1)}}
 for(let i=BUTS.length-1;i>=0;i--){const u=BUTS[i];u.t+=dt*u.sp;u.life-=dt;u.x=u.hx+Math.sin(u.t*.9)*22+Math.sin(u.t*2.3)*6;u.y=u.hy-10+Math.sin(u.t*1.3)*10+Math.cos(u.t*3.1)*3;if(u.life<0||night||rain){u.hy-=dt*30;if(u.life<-3)BUTS.splice(i,1)}}}
{const _t=trafficStep;trafficStep=function(dt){_t.apply(this,arguments);try{critStep(dt)}catch(e){}}}
function birdDraw(c,b){const x=b.x,y=b.y-b.z,d=b.dir,fly=b.st=='fly';c.save();c.fillStyle='rgba(0,0,0,'+(fly?.12:.22)+')';c.beginPath();c.ellipse(b.x,b.y+1,b.pig?3:2.2,1,0,0,7);c.fill();c.translate(x,y);c.scale(d,1);
 if(b.pig){const bc=b.col;c.fillStyle=bc;c.beginPath();c.ellipse(0,-2.5,3.6,2.4,0,0,7);c.fill();c.fillStyle='#5a5f6a';c.fillRect(-4.5,-3,2,1.6);
  const hy=b.peck>0?-1.5:-4.6;c.fillStyle='#7a7f8a';c.beginPath();c.arc(2.8,hy,1.6,0,7);c.fill();c.fillStyle='#6aa88a';c.fillRect(1.8,hy+1,1.8,1);c.fillStyle='#e8a050';c.fillRect(4.2,hy-.2,1,.7);c.fillStyle='#000';c.fillRect(3.1,hy-.6,.6,.6);
  if(fly){const w=Math.sin(b.ph)*3;c.fillStyle='#b8bcc6';c.beginPath();c.moveTo(-1,-3);c.lineTo(-3,-3-w-2);c.lineTo(2,-3);c.fill()}else{c.fillStyle='#d0606a';c.fillRect(-.5,-.4,.7,1);c.fillRect(1,-.4,.7,1)}}
 else{c.fillStyle='#8a5a34';c.beginPath();c.ellipse(0,-2,2.6,1.8,0,0,7);c.fill();c.fillStyle='#d8c0a0';c.beginPath();c.ellipse(.6,-1.4,1.6,1,0,0,7);c.fill();c.fillStyle='#5a3a22';c.fillRect(-3.6,-2.6,1.6,1.2);
  const hy=b.peck>0?-1.4:-3.6;c.fillStyle='#7a4a2a';c.beginPath();c.arc(2,hy,1.3,0,7);c.fill();c.fillStyle='#2a1a10';c.fillRect(1.8,hy+.3,1,1);c.fillStyle='#e8c070';c.fillRect(3.1,hy,.8,.5);c.fillStyle='#000';c.fillRect(2.2,hy-.5,.5,.5);
  if(fly){const w=Math.sin(b.ph)*2.6;c.fillStyle='#6a4428';c.beginPath();c.moveTo(-1,-2.5);c.lineTo(-2.4,-2.5-w-1.6);c.lineTo(1.4,-2.5);c.fill()}}
 c.restore()}
function butDraw(c,u){const f=Math.abs(Math.sin(u.t*14)),x=u.x,y=u.y;c.save();c.translate(x,y);c.scale(1.4,1.4);c.translate(-x,-y);c.fillStyle='rgba(0,0,0,.1)';c.beginPath();c.ellipse(x,u.hy+6,1.6,.6,0,0,7);c.fill();c.fillStyle=u.col;const w=2.4*(.25+f*.75);
 c.beginPath();c.ellipse(x-w*.7,y-.6,w,1.8,0,0,7);c.ellipse(x+w*.7,y-.6,w,1.8,0,0,7);c.fill();c.beginPath();c.ellipse(x-w*.5,y+1,w*.7,1.2,0,0,7);c.ellipse(x+w*.5,y+1,w*.7,1.2,0,0,7);c.fill();c.fillStyle='#2a1a10';c.fillRect(x-.3,y-1.6,.6,3.2);c.restore()}
{const _sd=safetyDraw;safetyDraw=function(a){_sd.apply(this,arguments);if(scene)return;try{BIRDS.forEach(b=>{if(b.x<CAM.x-10||b.x>CAM.x+W+10||b.y<CAM.y-10||b.y>CAM.y+H+20)return;a.push({y:b.st=='fly'?b.y+200:b.y,f:()=>birdDraw(g,b)})});BUTS.forEach(u=>{if(u.x<CAM.x-10||u.x>CAM.x+W+10||u.y<CAM.y-10||u.y>CAM.y+H+20)return;a.push({y:u.hy+30,f:()=>butDraw(g,u)})})}catch(e){}}}
