/* v8.6 室內造景模式：在建築裡面也能用上帝視角擺家具、畫隔間牆、刷地板、移動互動點 */
const ROOMED=new Set();
// 牆壁・隔間（特殊素材）
const GZWALL={'#wh':['wallh','橫牆',60,7],'#wv':['wallv','直牆',7,60],'#glass':['glassw','玻璃隔間',7,60],'#tatami':['tatami','榻榻米',60,60],'#rug':['rug','地毯',60,40],'#door':['doorm','門墊',40,12]};
EDCAT.push(['🧱 隔間・牆',Object.keys(GZWALL),'🧱 室內隔間']);
// ── 房間原始狀態 ──
function gzRoomKeep(n){const r=IN[n];if(!r)return;if(!r._ofur){r._ofur=JSON.parse(JSON.stringify(r.fur));r._osp=JSON.parse(JSON.stringify(r.sp||[]))}}
function gzRoomRefresh(n){const r=IN[n];if(!r)return;r.fur0=null;r.fixed=null;try{if(st.lay&&st.lay[n])delete st.lay[n]}catch(e){}
 if(r.built){r.sol=mkSol(r.fur);r.cv=renderRm(r,n)}}
// 地板格（8px）
{const _rr=renderRm;renderRm=function(d,n){const F=d._efl;if(!F||!Object.keys(F).length||d.out)return _rr(d,n);const p0=d.pre,cw=Math.ceil((d.W||320)/8);
 d.pre=(c,W2,H2)=>{p0&&p0(c,W2,H2);for(const ci in F){const x=(ci%cw)*8,y=Math.floor(ci/cw)*8;if(!LTX(c,F[ci],x,y,8,8,ETS[F[ci]]||24))R(c,x,y,8,8,'#c9a06a')}};
 try{return _rr(d,n)}finally{d.pre=p0}}}
// uax 也支援鏡像等選項
{const _s=furnSolid;furnSolid=f=>f[0]=='uax'?!!f[6]:_s(f)}
// ── 物件外框 ──
function gzRBox(f){const k=f[0];
 if(k=='uaf'||k=='uax'){const key=Array.isArray(f[5])?f[5][0]:f[5],im=UAI[key];if(!im||!im.naturalWidth)return{x:f[1],y:f[2],w:f[3],h:f[4]};
  const o=f[0]=='uax'?{s:1,hm:99}:(f[7]||{}),ar=im.naturalHeight/im.naturalWidth;let w=f[3]*(o.s||1),h=w*ar;const mh=(o.hm||2.8)*Math.max(f[4],12);if(h>mh){h=mh;w=h/ar}w*=o.sx||1;h*=o.sy||1;
  const bot=f[0]=='uax'?f[2]+8:f[2]+f[4],cx=f[1]+f[3]/2;return{x:cx-w/2,y:bot-h,w,h}}
 if(['wallh','wallv','glassw','tatami','rug','mat','doorm','stairs'].includes(k)||FLAT.has(k))return{x:f[1],y:f[2],w:Math.max(4,f[3]),h:Math.max(4,f[4])};
 const up=Math.min(34,Math.max(10,f[4]*1.2));return{x:f[1],y:f[2]-up,w:Math.max(4,f[3]),h:f[4]+up}}
const gzRFlat=f=>FLAT.has(f[0])||['wallh','wallv','glassw'].includes(f[0])||(f[7]&&f[7].z<0);
function gzRPick(x,y){const r=rm;
 const sp=(r.sp||[]).find(s=>x>=s[1]&&x<=s[1]+s[3]&&y>=s[2]-2&&y<=s[2]+s[4]+2);if(sp&&ED.showSp!==false)return{sp};
 let best=null,bb=-1e9;r.fur.forEach(f=>{const b=gzRBox(f);if(x<b.x||x>b.x+b.w||y<b.y||y>b.y+b.h)return;const sc=(gzRFlat(f)?-1e6:0)+b.y+b.h-(b.w*b.h)/1e5;if(sc>bb){bb=sc;best=f}});return best?{f:best}:null}
// ── 復原 ──
function gzRSnap(){return JSON.stringify({fur:rm.fur,sp:rm.sp||[],fl:rm._efl||{}})}
function gzRPush(before){const n=ED.room;gzPush(()=>{const s=JSON.parse(before),r=IN[n];r.fur=s.fur;r.sp=s.sp;r._efl=s.fl;ED.sel=null;gzRoomRefresh(n)})}
function gzRDone(before){if(before!=gzRSnap()){ROOMED.add(ED.room);gzRPush(before)}gzRoomRefresh(ED.room);gzRefresh()}
// ── 滑鼠 ──
let gzRT=0;
function gzRDown(x,y,pan){const r=rm;gzRoomKeep(ED.room);
 if(ED.tool=='sel'){const h=gzRPick(x,y);ED.sel=h;gzRefresh();if(!h)return pan();const ref=h.sp||h.f;ED.drag={m:'rmove',ref,sp:!!h.sp,ox:x-ref[1],oy:y-ref[2],before:gzRSnap()};return}
 if(ED.tool=='obj'){if(!ED.pal)return toast('先從右邊挑一個素材');const before=gzRSnap();r.fur.push(gzRNew(ED.pal,Math.round(x),Math.round(y)));gzRDone(before);return}
 if(ED.tool=='floor'||ED.tool=='erase'){ED.drag={m:'rpaint',before:gzRSnap()};gzRBrush(x,y)}}
function gzRMove(d,x,y){if(d.m=='rmove'){d.ref[1]=Math.round(x-d.ox);d.ref[2]=Math.round(y-d.oy);if(!d.sp)rm._dirty=1}else if(d.m=='rpaint')gzRBrush(x,y)}
function gzRUp(d){if(d.m=='rmove'||d.m=='rpaint')gzRDone(d.before)}
function gzRNew(k,x,y){if(GZWALL[k]){const q=GZWALL[k];return[q[0],x-q[2]/2,y-q[3]/2,q[2],q[3]]}
 let w=ED.pw||gzNomW(k);if(k.startsWith('lf_')&&!ED.pw)w=LFW(k);const im=UAI[k],ar=im&&im.naturalWidth?im.naturalHeight/im.naturalWidth:1,d=Math.max(4,Math.min(14,w*ar*.4));
 const flat=EFLATK.has(k)||/地毯|墊/.test(gzName(k));return['uaf',x-w/2,y-d,w,d,k,flat?0:1,{hm:99,mx:ED.pmx?1:0,z:flat?-1:0}]}
function gzRBrush(x,y){const r=rm,cw=Math.ceil(r.W/8),n=ED.bs,c0=Math.floor(x/8-n/2+.5),r0=Math.floor(y/8-n/2+.5);r._efl=r._efl||{};let ch=0;
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const cx=c0+i,cy=r0+j;if(cx<0||cy<0||cx>=cw||cy*8>=r.H)continue;const ci=cy*cw+cx;if(ED.tool=='floor'){if(r._efl[ci]!=ED.tile){r._efl[ci]=ED.tile;ch=1}}else if(r._efl[ci]){delete r._efl[ci];ch=1}}
 if(ch)r._dirty=1}
// ── 選取工具列 ──
function gzRSelUI(){const box=$e('gzSel'),h=ED.sel;if(!h||ED.tool!='sel'){box.style.display='none';return}box.style.display='flex';
 if(h.sp){box.innerHTML=`<b>📍 互動點：${(rm.spl&&rm.spl[h.sp[0]])||h.sp[0]}</b><span style="opacity:.75">拖曳移動（站在這裡按空白鍵）</span><button data-s="wl">⬅ 變窄</button><button data-s="wg">➡ 變寬</button><button data-s="x">✕</button>`;return}
 const f=h.f,k=f[0],img=k=='uaf'||k=='uax',wall=['wallh','wallv','glassw'].includes(k);
 const nm=img?gzName(Array.isArray(f[5])?f[5][0]:f[5]):(Object.values(GZWALL).find(q=>q[0]==k)||[0,k])[1];
 box.innerHTML=`<b>${nm}</b><button data-s="del">🗑 刪除</button><button data-s="dup">⧉ 複製</button>`+
  (wall?`<button data-s="ls">－ 縮短</button><button data-s="ll">＋ 加長</button><button data-s="rot">↻ 轉向</button>`:`<button data-s="mx">↔ 鏡像</button><button data-s="sm">－ 縮小</button><button data-s="lg">＋ 放大</button>`)+
  (img?`<button data-s="sd">${f[6]?'🧱 會擋路':'🚶 可穿越'}</button><span style="opacity:.6;margin:0 2px">｜圖層 ${(f[7]&&f[7].z)||0}</span><button data-s="zd" title="往下一層">⬇</button><button data-s="zu" title="往上一層">⬆</button><span style="opacity:.6;margin:0 2px">｜寬</span><button data-s="w-">－</button><button data-s="w+">＋</button><span style="opacity:.6;margin:0 2px">高</span><button data-s="h-">－</button><button data-s="h+">＋</button>${f[7]&&(f[7].sx||f[7].sy)?'<button data-s="wh0">⟲ 原比例</button>':''}`:'')+`<button data-s="x">✕</button>`}
function gzRSelAct(a){const h=ED.sel;if(!h)return;const before=gzRSnap();
 if(a=='x'){ED.sel=null;return gzRefresh()}
 if(h.sp){const s=h.sp;if(a=='wl')s[3]=Math.max(10,s[3]-8);if(a=='wg')s[3]+=8;return gzRDone(before)}
 const f=h.f,k=f[0],img=k=='uaf'||k=='uax';
 if(a=='del'){rm.fur.splice(rm.fur.indexOf(f),1);ED.sel=null}
 else if(a=='dup'){const n=JSON.parse(JSON.stringify(f));n[1]+=Math.round(f[3]*.6)+4;n[2]+=4;rm.fur.push(n);ED.sel={f:n}}
 else if(a=='mx'){if(!img)return toast('這個家具是程式畫的，不能鏡像');if(k=='uax'){f[0]='uaf';f[2]=f[2]+8-f[4];f[7]={hm:99}}f[7]=f[7]||{};f[7].mx=f[7].mx?0:1}
 else if(a=='sm'||a=='lg'){const m=a=='lg'?1.1:1/1.1,cx=f[1]+f[3]/2,b=f[2]+f[4];f[3]=Math.max(3,f[3]*m);if(!img)f[4]=Math.max(3,f[4]*m);f[1]=cx-f[3]/2;f[2]=b-f[4]}
 else if(a=='ls'||a=='ll'){const d=a=='ll'?8:-8;if(k=='wallh')f[3]=Math.max(8,f[3]+d);else f[4]=Math.max(8,f[4]+d)}
 else if(a=='rot'){const cx=f[1]+f[3]/2,cy=f[2]+f[4]/2;[f[3],f[4]]=[f[4],f[3]];if(k=='wallh')f[0]='wallv';else if(k=='wallv')f[0]='wallh';f[1]=cx-f[3]/2;f[2]=cy-f[4]/2}
 else if(a=='sd'){if(img)f[6]=f[6]?0:1}
 else if(a=='up'){if(img){f[7]=f[7]||{hm:99};f[7].z=f[7].z>0?-1:f[7].z<0?0:1}}
 else if(a=='zu'||a=='zd'){if(img){if(f[0]=='uax'){f[0]='uaf';f[2]=f[2]+8-f[4];f[7]={hm:99}}f[7]=f[7]||{hm:99};f[7].z=Math.max(-9,Math.min(9,(f[7].z||0)+(a=='zu'?1:-1)))}}
 else if(/^[wh][+-]$/.test(a)||a=='wh0'){if(!img)return toast('這個家具是程式畫的，請用放大縮小');if(f[0]=='uax'){f[0]='uaf';f[2]=f[2]+8-f[4];f[7]={hm:99}}f[7]=f[7]||{hm:99};if(a=='wh0'){delete f[7].sx;delete f[7].sy}else{const kk=a[0]=='w'?'sx':'sy';let v=Math.round((f[7][kk]||1)*(a[1]=='+'?1.1:1/1.1)*100)/100;v=Math.max(.2,Math.min(6,v));if(Math.abs(v-1)<.02)delete f[7][kk];else f[7][kk]=v}}
 gzRDone(before)}
function gzRNudge(dx,dy){const h=ED.sel;if(!h)return;const before=gzRSnap(),q=h.sp||h.f;q[1]+=dx;q[2]+=dy;gzRDone(before)}
// ── 繪製 ──
function gzRFrame(now){NOW=now;const dt=Math.min(.05,Math.max(0,(now-(gzLast||now))/1000));gzLast=now;const r=rm;
 const kx=(ED.keys.right?1:0)-(ED.keys.left?1:0),ky=(ED.keys.down?1:0)-(ED.keys.up?1:0);if(kx||ky){ED.cx+=kx*300*dt/ED.z;ED.cy+=ky*300*dt/ED.z;gzClampCam()}
 if(r._dirty&&now-gzRT>110){gzRT=now;r._dirty=0;try{r.cv=renderRm(r,ED.room)}catch(e){}}
 const z=ED.z,vw=W/z,vh=H/z;g.setTransform(K,0,0,K,0,0);g.fillStyle='#1a120a';g.fillRect(0,0,W,H);
 g.setTransform(K*z,0,0,K*z,0,0);g.imageSmoothingEnabled=true;g.drawImage(r.cv,-ED.cx,-ED.cy,r.W,r.H);
 g.save();g.translate(-ED.cx,-ED.cy);const lw=1/z;
 if(ED.tool=='floor'||ED.tool=='erase'){if(z>=.75){g.strokeStyle='rgba(255,255,255,.1)';g.lineWidth=lw;g.beginPath();for(let x=0;x<=r.W;x+=8){g.moveTo(x,32);g.lineTo(x,r.H)}for(let y=32;y<=r.H;y+=8){g.moveTo(0,y);g.lineTo(r.W,y)}g.stroke()}
  if(ED.inCv){const n=ED.bs,c0=Math.floor(ED.mx/8-n/2+.5),r0=Math.floor(ED.my/8-n/2+.5);g.strokeStyle=ED.tool=='floor'?'#ffd84a':'#7ad0ff';g.lineWidth=2*lw;g.strokeRect(c0*8,r0*8,n*8,n*8)}}
 if(ED.tool=='sel'&&ED.showSp!==false)(r.sp||[]).forEach(s=>{g.fillStyle='rgba(255,216,74,.22)';g.fillRect(s[1],s[2],s[3],s[4]);g.strokeStyle='rgba(255,216,74,.8)';g.lineWidth=lw;g.strokeRect(s[1],s[2],s[3],s[4]);
  g.fillStyle='#ffd84a';g.font=`bold ${7}px sans-serif`;g.textAlign='left';g.fillText('📍'+((r.spl&&r.spl[s[0]])||s[0]),s[1]+1,s[2]+s[4]-2)});
 if(ED.tool=='sel'&&ED.inCv&&!ED.drag){const h=gzRPick(ED.mx,ED.my);if(h&&h.f&&(!ED.sel||ED.sel.f!==h.f)){const b=gzRBox(h.f);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=lw;g.strokeRect(b.x,b.y,b.w,b.h)}}
 if(ED.sel){const q=ED.sel.f;const b=q?gzRBox(q):{x:ED.sel.sp[1],y:ED.sel.sp[2],w:ED.sel.sp[3],h:ED.sel.sp[4]};g.setLineDash([4*lw,3*lw]);g.strokeStyle='#ffd84a';g.lineWidth=2*lw;g.strokeRect(b.x-1,b.y-1,b.w+2,b.h+2);g.setLineDash([]);
  if(q&&furnSolid(q)){const b=window.sbRect?sbRect(q):{x:q[1],y:q[2],w:q[3],h:q[4]};g.fillStyle='rgba(255,60,60,.32)';g.fillRect(b.x,b.y,b.w,b.h);g.strokeStyle='#ff3a3a';g.lineWidth=lw;g.strokeRect(b.x,b.y,b.w,b.h)}}
 if(ED.tool=='sol'&&r.sol)r.sol.forEach(o=>{g.fillStyle=o._wall?'rgba(255,150,40,.22)':'rgba(255,40,40,.3)';g.fillRect(o.x,o.y,o.w,o.h);g.strokeStyle=o._wall?'rgba(255,170,60,.9)':'rgba(255,60,60,.95)';g.lineWidth=lw;g.strokeRect(o.x,o.y,o.w,o.h)})
 if(ED.tool=='obj'&&ED.pal&&ED.inCv){const x=Math.round(ED.mx),y=Math.round(ED.my);g.globalAlpha=.65;
  if(GZWALL[ED.pal]){const q=GZWALL[ED.pal];g.fillStyle='#efe4cc';g.fillRect(x-q[2]/2,y-q[3]/2,q[2],q[3])}
  else if(uaOK(ED.pal)){const im=UAI[ED.pal];let w=ED.pw||gzNomW(ED.pal);if(ED.pal.startsWith('lf_')&&!ED.pw)w=LFW(ED.pal);const h=w*im.naturalHeight/im.naturalWidth;if(ED.pmx){g.save();g.translate(x,0);g.scale(-1,1);g.drawImage(im,-w/2,y-h,w,h);g.restore()}else g.drawImage(im,x-w/2,y-h,w,h)}
  g.globalAlpha=1}
 g.restore();g.setTransform(K,0,0,K,0,0);g.fillStyle='rgba(0,0,0,.45)';g.fillRect(0,H-12,170,12);g.fillStyle='#fff6dc';g.font='7px sans-serif';g.textAlign='left';g.fillText(`🛠️ 室內造景：${ED.room}　x ${Math.round(ED.mx)}  y ${Math.round(ED.my)}`,4,H-3.5)}
// uaf 鏡像繪製
{const _rr=renderRm;renderRm=function(d,n){const mx=d.fur.filter(f=>f[0]=='uaf'&&f[7]&&f[7].mx);if(!mx.length)return _rr(d,n);
 const keep=mx.map(f=>f[5]);mx.forEach(f=>{const k=Array.isArray(f[5])?f[5][0]:f[5];const key=k+'__mx';if(!UAI[key]&&UAI[k]&&UAI[k].naturalWidth){const im=UAI[k],c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.translate(c.width,0);x.scale(-1,1);x.drawImage(im,0,0);
  UAI[key]=c;c.naturalWidth=c.width;c.naturalHeight=c.height;c.complete=true}f[5]=key});
 try{return _rr(d,n)}finally{mx.forEach((f,i)=>f[5]=keep[i])}}}
// ── 接上原本的造景模式 ──
{const _ce=gzClampCam;gzClampCam=function(){if(!ED.room)return _ce();const vw=W/ED.z,vh=H/ED.z,RW=rm.W,RH=rm.H;ED.cx=vw>=RW?(RW-vw)/2:Math.max(0,Math.min(RW-vw,ED.cx));ED.cy=vh>=RH?(RH-vh)/2:Math.max(0,Math.min(RH-vh,ED.cy))}}
{const _e=gzEnter;gzEnter=function(){if(!scene){ED.room=null;return _e()}
 if(!rm||rm.out)return toast('這裡不能用室內造景');const n=scene;ED.room=n;gzRoomKeep(n);closeDlg();
 ED.on=1;ED.z=1;ED.sel=null;ED.keys={};for(const k in keys)keys[k]=0;ED.cx=p.x-W/2;ED.cy=p.y-H/2;
 document.body.classList.add('ed-on');document.querySelectorAll('body > *').forEach(el=>{if(el.id!='wrap'&&el.id!='gzUI'&&el.id!='dlg'&&el.tagName!='SCRIPT'&&el.tagName!='STYLE'&&getComputedStyle(el).position=='fixed'&&!el.classList.contains('ed-hide')){el.classList.add('ed-hide');el.dataset.edh=1}});
 gzClampCam();gzRefresh();toast('🛠️ 室內造景：'+n+'　可以畫隔間牆、擺家具、刷地板、移動互動點')}}
{const _x=gzExit;gzExit=function(force){const was=ED.room;const r=_x(force);if(was&&!ED.on){ED.room=null;if(rm&&scene&&iBlocked()){const ox=p.x,oy=p.y;let ok=0;for(let rr=8;rr<300&&!ok;rr+=8)for(let a=0;a<16&&!ok;a++){p.x=ox+Math.cos(a*.39)*rr;p.y=oy+Math.sin(a*.39)*rr;if(p.x>4&&p.y>30&&p.x<rm.W-16&&p.y<rm.H-12&&!iBlocked())ok=1}if(!ok){p.x=ox;p.y=oy}}}return r}}
{const _f=gzFrame;gzFrame=function(now){if(ED.room)return gzRFrame(now);return _f(now)}}
{const _u=gzSelUI;gzSelUI=function(){if(ED.room)return gzRSelUI();return _u()}}
{const _a=gzSelAct;gzSelAct=function(a){if(ED.room)return gzRSelAct(a);return _a(a)}}
{const _n=gzNudge;gzNudge=function(dx,dy){if(ED.room)return gzRNudge(dx,dy);return _n(dx,dy)}}
// 存檔：加上房間
{const _s=gzSerialize;gzSerialize=function(){const m=_s();const R={};ROOMED.forEach(n=>{const r=IN[n];if(!r)return;R[n]={fur:r.fur,sp:r.sp||[],fl:r._efl||{}}});if(Object.keys(R).length)m.rooms=JSON.parse(JSON.stringify(R));return m}}
{const _a=gzApply;gzApply=function(m){_a(m);if(!m||!m.rooms)return;for(const n in m.rooms){const r=IN[n];if(!r)continue;gzRoomKeep(n);const q=m.rooms[n];r.fur=JSON.parse(JSON.stringify(q.fur));r.sp=JSON.parse(JSON.stringify(q.sp||[]));r._efl=Object.assign({},q.fl||{});ROOMED.add(n);gzRoomRefresh(n)}}}
{const _r=gzReset;gzReset=function(){_r();ROOMED.forEach(n=>{const r=IN[n];if(!r||!r._ofur)return;r.fur=JSON.parse(JSON.stringify(r._ofur));r.sp=JSON.parse(JSON.stringify(r._osp));r._efl={};gzRoomRefresh(n)});ROOMED.clear()}}
// 讀存檔後：造景過的房間以造景為主
{const _sl=svLoad;svLoad=function(){const r=_sl.apply(this,arguments);try{ROOMED.forEach(n=>{if(st.lay&&st.lay[n])delete st.lay[n];const R0=IN[n];if(R0){R0.fur0=null;R0.fixed=null}})}catch(e){}return r}}

try{OPN.classList.add('gz-dm');BAR.classList.add('gz-dm');const st2=document.createElement('style');st2.textContent='body.ed-on .gz-dm{display:none!important}';document.head.appendChild(st2)}catch(e){}
