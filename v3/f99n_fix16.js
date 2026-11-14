/* v13.16 互動點跟著建築走、腳踏車停車位可在造景模式移動、騎腳踏車會踩踏板、農場隱形圍欄、動物互動小農場 */

// ── 1. 互動點（建築門口、店家點餐處）跟著建築移動、縮放 ──
function bAttach(b){if(b._att)return;bOrig(b);const o=b._o,cx=o.x+o.w/2,L=[];
 Z.forEach(z=>{if(z.b===b)L.push({r:z,ox:z.x+z.w/2-cx,oy:z.y-o.bot})});
 SPOTS.forEach(s=>{const sx=s.x+s.w/2;if(sx>=o.x-10&&sx<=o.x+o.w+10&&s.y>=o.bot-50&&s.y<=o.bot+30)L.push({r:s,ox:sx-cx,oy:s.y-o.bot})});b._att=L}
{const _ba=bApply;bApply=function(b,S2){bAttach(b);_ba.apply(this,arguments);try{const cx=b.x+b.w/2,k=b.w/b._o.w;b._att.forEach(a=>{a.r.x=cx+a.ox*k-a.r.w/2;a.r.y=b.bot+a.oy})}catch(e){}}}

// ── 2. 腳踏車、電動滑板車的停車位：造景模式裡可以拖、可以複製當裝飾 ──
const RACKK={bike:null,scoot:null};
function rackMk(){if(RACKK.bike)return;try{const z=Z.find(z=>z.n=='家');if(!z)return;const by=z.b.bot+9+6;
 [['bike',z.x-8],['scoot',z.x+z.w+30]].forEach(([t,x0])=>{const P=VI[t=='bike'?'pbike0':'pmoto0'],key=P&&P.s&&P.s[0];if(!key||!uaOK(key))return;const sp=vuImg(key,t=='bike'?22:20);
  const d={spr:sp.img,x:x0-sp.w/2,y:by-sp.h,w:sp.w,h:sp.h,by,__edonly:1,__uk:key,__rack:t};DEC.push(d);RACKK[t]=d})}catch(e){}}
{const _b=buildBOV;buildBOV=function(){const r=_b.apply(this,arguments);rackMk();return r}}
rackSpot=(f=>function(i){const d=RACKK[i?'scoot':'bike'];if(d)return[d.x+d.w/2,(d.by??d.y+d.h)-6];return f(i)})(rackSpot);
// 主畫面不畫停車位標記（只有造景模式看得到），造景模式顯示說明
{const s=document.createElement('style');document.head.appendChild(s)}
function rackRepark(){try{if(!st.veh)return;['bike','scoot'].forEach(t=>{const o=st.veh[t];if(o&&p.ride!=t&&!o.away)rackPark(t)})}catch(e){}}
setTimeout(rackRepark,2500);
{const _x=gzExit;gzExit=function(){const r=_x.apply(this,arguments);rackRepark();return r}}
{const _a=wkArrive;wkArrive=function(){const r=_a.apply(this,arguments);rackRepark();return r}}
gzSelUI=(f=>function(){f.apply(this,arguments);try{const d=ED.sel&&ED.sel.o;if(d&&d.__rack&&!ED.room){const b=$e('gzSel').querySelector('b');if(b)b.textContent=d.__rack=='bike'?'🚲 腳踏車停車位':'🛴 滑板車停車位'}}catch(e){}})(gzSelUI);
// 複製停車位 → 變成一般的裝飾腳踏車（真的畫在地圖上）
gzSelAct=(f=>function(a){const e=ED.sel;if(a=='del'&&e&&e.o&&e.o.__rack)return toast('停車位不能刪除，可以拖到你要的位置');return f.apply(this,arguments)})(gzSelAct);

// ── 3. 騎腳踏車：兩腳交替踩踏 ──
{const _dp=drawPlayer;drawPlayer=function(c){if(p.ride!='bike')return _dp(c);
  const od=drawChar;drawChar=function(cc,o){if(o&&o.sit&&o.lk===ALLEN){const v=vPlayerObj(),X=v.ax=='x',mv=Math.hypot(p.vx||0,p.vy||0)>4||!!p.mv;o=Object.assign({},o,{sit:0,mv,ph:(NOW/1000)*.7,x:v.x+v.w/2-6-(X?v.dir*1.5:0),y:v.y+v.h*(X?.80:.72)-8})}return od.call(this,cc,o)};
  try{_dp(c)}finally{drawChar=od}}}

// ── 4. 農場：被地板蓋掉的圍欄不要再擋路；雞鴨園、羊圈的圍欄拿掉，動物放出來 ──
function fenceFix(){try{const pen=[COOP,SHEEP],inPen=f=>pen.some(P=>f.x>=P.x-14&&f.x<=P.x+P.w+14&&f.y>=P.y-14&&f.y<=P.y+P.h+14);
 FNS.forEach(f=>{const s=solids.find(o=>Math.abs(o.x-f.x)<.5&&Math.abs(o.y-f.y)<.5&&o.w==f.w&&o.h==f.h);let cov=0,tot=0;
  for(let y=f.y;y<f.y+f.h;y+=EDC)for(let x=f.x;x<f.x+f.w;x+=EDC){tot++;const ci=Math.floor(y/EDC)*ECW+Math.floor(x/EDC);if(EFL[ci])cov++}
  const gone=inPen(f)||(tot&&cov/tot>.4);if(gone&&s){arrDel(solids,s);f._sol=s}else if(!gone&&!s&&f._sol){solids.push(f._sol);f._sol=null}})}catch(e){}}
setTimeout(fenceFix,2600);
addEventListener('pointerup',()=>{if(ED.on&&(ED.tool=='floor'||ED.tool=='erase'))setTimeout(fenceFix,50)});
{const _x=gzExit;gzExit=function(){const r=_x.apply(this,arguments);fenceFix();return r}}

// ── 5. 動物互動小農場 ──
ANSET.goat=['20',20,21,-21,20,16];
const FARMZ=()=>{const x0=Math.min(COOP.x,SHEEP.x),y0=Math.min(COOP.y,SHEEP.y),x1=Math.max(COOP.x+COOP.w,SHEEP.x+SHEEP.w),y1=Math.max(COOP.y+COOP.h,SHEEP.y+SHEEP.h);return[x0,y0,x1-x0,y1-y0]};
const FARMA=[['雞','chicken','#f4efe0'],['雞','chicken','#f4efe0'],['棕色母雞','chicken','#d9a050'],['鴨','duck','#f4efe0'],['鴨','duck','#f4efe0'],['小白（柯爾鴨）','callduck','#fffdf4'],['羊咩咩','sheep','#f4f2ea'],['羊咩咩','sheep','#f4f2ea'],['羊咩咩','sheep','#f4f2ea'],['山羊阿咩','goat','#f4f2ea'],['兔兔','rabbit','#f4f2ea'],['兔兔','rabbit','#f4f2ea']];
function farmAnimals(){try{const R=FARMZ(),have=NP.filter(n=>n.t&&n.r&&(n.t=='chicken'||n.t=='duck'||n.t=='sheep')&&Math.abs(n.r[0]-R[0])<300);
 have.forEach(n=>{n.r=R.slice();n.farm=1});
 const cnt={};have.forEach(n=>cnt[n.t+n.c]=(cnt[n.t+n.c]||0)+1);
 FARMA.forEach(a=>{const k=a[1]+a[2];if(cnt[k]>0){cnt[k]--;return}const n=mkNP({n:a[0],t:a[1],c:a[2],x:R[0]+10+Math.random()*(R[2]-30),y:R[1]+10+Math.random()*(R[3]-24),r:R.slice(),mode:'a',sp:a[1]=='rabbit'?22:a[1]=='goat'?12:10,L:['……']});if(n)n.farm=1});
 NP.forEach(n=>{if(n.farm){n.w=n.w||12;n.h=n.h||8}})}catch(e){console.warn('farmAnimals',e)}}
setTimeout(farmAnimals,2700);
const FAV={chicken:['咕咕咕～','（歪頭看你）','（啄啄你的鞋帶）'],duck:['呱！呱呱！','（搖搖擺擺地走過來）','（拍拍翅膀）'],callduck:['嘎～嘎～','（小小聲地叫）','（貼在你腳邊）'],sheep:['咩～','（用頭蹭你的手）','（一直嚼草）'],goat:['咩咩咩！','（想咬你的衣角）','（跳到石頭上看你）'],rabbit:['（鼻子動個不停）','（蹦蹦跳跳）','（耳朵豎起來）']};
const FANM={chicken:'🐔',duck:'🦆',callduck:'🦆',sheep:'🐑',goat:'🐐',rabbit:'🐰'};
function farmTalk(n){const ic=FANM[n.t]||'🐾',L=FAV[n.t]||['……'],line=L[Math.floor(Math.random()*L.length)],key='fa_'+n.t,day=gt()/24|0;st.fa=st.fa||{};const rec=st.fa[key]=st.fa[key]||{d:-1,n:0,love:0};
 const vk=Object.keys(CROPS||{}).filter(k=>(st.inv['veg_'+k]||0)>0),food=(st.inv.food||0)>0;
 const o=[['🤲 摸摸牠',rec.d==day&&rec.n>=3?'牠今天被摸夠了':'😊+3',()=>{if(rec.d!=day){rec.d=day;rec.n=0}if(rec.n>=3){closeDlg();return toast(ic+' '+n.n+'：（打了個哈欠走開了）')}rec.n++;rec.love++;fxApply({j:3});hud();closeDlg();n.mv=false;toast(`${ic} 摸摸${n.n}……${['牠很享受地瞇起眼睛','牠蹭了蹭你的手','牠開心地繞著你轉圈'][Math.floor(Math.random()*3)]} 😊+3`)}],
  [vk.length?'🥬 餵牠吃菜':food?'🥫 餵牠飼料':'🥬 餵牠吃東西',vk.length?'用 1 份蔬菜・😊+6':food?'用 1 包寵物飼料・😊+6':'身上沒有蔬菜或飼料（農夫伯那裡買得到菜）',()=>{if(vk.length)st.inv['veg_'+vk[0]]--;else st.inv.food--;rec.love+=2;fxApply({j:6});hud();closeDlg();
   const fol=NP.filter(m=>m.farm&&Math.hypot(m.x-n.x,m.y-n.y)<120).slice(0,4);fol.forEach(m=>{m.tx=p.x;m.ty=p.y});toast(`${ic} ${n.n}吃得好開心！${fol.length>1?'旁邊的動物也都跑過來了 😆':''} 😊+6`)},!(vk.length||food)],
  ['離開','',closeDlg]];
 openDlg(`${ic} ${n.n}${rec.love>=10?' 💕':''}`,`「${line}」${rec.love>=10?'<br><span style="opacity:.75;font-size:12px">牠好像已經認得你了。</span>':''}`,o)}
{const _pt=petTalk;petTalk=function(n){if(n&&n.farm)return farmTalk(n);return _pt.apply(this,arguments)}}
// ── 建築模式：藍色的入口互動點可以直接拖到正門口 ──
{const _ba=bApply;bApply=function(b,S2){_ba.apply(this,arguments);try{const D=b._s&&b._s.door;if(D){const cx=b.x+b.w/2,k=b.w/b._o.w;Z.filter(z=>z.b===b).forEach(z=>{z.x=cx+D[0]*k-z.w/2;z.y=b.bot+D[1]})}}catch(e){}}}
let gzDoor=null;
addEventListener('pointerdown',ev=>{if(!ED.on||ED.room||ED.tool!='bld'||!ED.bsel||!dlg.hidden)return;const r=cv.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)return;if(ev.target!==cv)return;
 const [x,y]=gzW(ev),b=ED.bsel,z=Z.find(z=>z.b===b&&x>=z.x-4&&x<=z.x+z.w+4&&y>=z.y-6&&y<=z.y+z.h+6);if(!z)return;ev.stopImmediatePropagation();ev.preventDefault();gzDoor={b,z,ox:x-z.x,oy:y-z.y,prev:JSON.parse(JSON.stringify(b._s||BS0()))}},true);
addEventListener('pointermove',ev=>{if(!gzDoor)return;ev.stopImmediatePropagation();const [x,y]=gzW(ev);gzDoor.z.x=Math.round(x-gzDoor.ox);gzDoor.z.y=Math.round(y-gzDoor.oy)},true);
addEventListener('pointerup',ev=>{if(!gzDoor)return;ev.stopImmediatePropagation();const {b,z,prev}=gzDoor;gzDoor=null;const cx=b.x+b.w/2,k=b.w/b._o.w;const n=JSON.parse(JSON.stringify(b._s||BS0()));n.door=[Math.round((z.x+z.w/2-cx)/k),Math.round(z.y-b.bot)];
 bApply(b,n);gzPush(()=>bApply(b,prev));ED.dirty=1;gzRefresh();toast('🚪 '+b.n+' 的入口移好了')},true);
{const _r=gzRefresh;gzRefresh=function(){_r.apply(this,arguments);try{if(ED.tool=='bld'&&ED.bsel&&!ED.bpick)$e('gzHint').textContent='拖曳建築換位置；藍色方塊是「入口互動點」，拖到正門口就好。　｜　Ctrl+Z 復原'}catch(e){}}}
