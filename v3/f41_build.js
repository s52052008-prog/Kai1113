/* v9.2 上帝模式：移動建築；室內造景：調整房間大小 */
// ───────── 移動建築 ─────────
const BALL=()=>[...B,...BD];
function bRect(b){if(b.ua){const u=b.ua,cx=b.x+b.w/2,bot=b.bot+u.oy;return{x:cx-u.w/2-4,y:bot-u.h-2,w:u.w+8,h:u.h+14}}return{x:b.x-10,y:b.y-48,w:b.w+20,h:b.bot-b.y+60}}
function bErase(b){const r=bRect(b),x=S.getContext('2d');x.save();x.setTransform(KS,0,0,KS,0,NY*KS);if(!LTX(x,'lt_7',r.x,r.y,r.w,r.h,24)){x.fillStyle='#c9c6bd';x.fillRect(r.x,r.y,r.w,r.h)}x.restore()}
// v9.3：建築改成「狀態」記錄：位置 d、縮放 s、換圖 k、碰撞 c=[寬,深,中心偏移]
const BS0=()=>({d:[0,0],s:1,k:null,c:null});
function bSol(b){if(b._sol!==undefined)return b._sol;b._sol=solids.find(o=>Math.abs(o.x-b.x)<3&&Math.abs(o.w-b.w)<3&&Math.abs(o.y+o.h-b.bot)<3)||null;return b._sol}
function bOrig(b){if(b._o)return;const so=bSol(b),cx=b.x+b.w/2;b._o={x:b.x,y:b.y,w:b.w,h:b.h,bot:b.bot,st:b.st,ua:b.ua?{...b.ua}:null,sol:so?{cx:so.x+so.w/2-cx,w:so.w,h:so.h,by:so.y+so.h-b.bot}:null};b._s=BS0()}
const winIn=r=>{for(let i=WIN.length-1;i>=0;i--){const w=WIN[i];if(w[0]>=r.x-2&&w[0]<=r.x+r.w+2&&w[1]>=r.y-2&&w[1]<=r.y+r.h+2)WIN.splice(i,1)}};
function bPaint(b){const x=S.getContext('2d');x.save();x.setTransform(KS,0,0,KS,0,NY*KS);x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
 if(b.ua&&uaOK(b.ua.k)){const u=b.ua,cx=b.x+b.w/2,bot=b.bot+u.oy;x.fillStyle='rgba(30,18,5,.28)';x.beginPath();x.ellipse(cx+3,bot-2,u.w*.5,4,0,0,7);x.fill();if(u.mx){x.translate(cx*2,0);x.scale(-1,1)}x.drawImage(UAI[u.k],cx-u.w/2,bot-u.h,u.w,u.h)}
 else{winIn(bRect(b));const L=[SIGNS.length,DEC.length,solids.length,LAMPS.length];try{drawB(b)}catch(e){}SIGNS.length=L[0];DEC.length=L[1];solids.length=L[2];LAMPS.length=L[3]}
 x.restore()}
function bApply(b,S2){bOrig(b);const o=b._o,r0=bRect(b);
 BALL().forEach(q=>{if(q!==b&&hitR(bRect(q),r0))q._rp=1});bErase(b);winIn(r0);
 const ocx=b.x+b.w/2,obot=b.bot,s=S2.s||1;
 b.st=o.st;b.ua=o.ua?{...o.ua}:undefined;
 if(S2.k&&uaOK(S2.k)){const im=UAI[S2.k],w0=o.ua?o.ua.w:o.w*1.04;b.ua={k:S2.k,w:w0,h:w0*im.naturalHeight/im.naturalWidth,oy:4};b.st='ua'}
 if(b.ua){b.ua.w*=s*(S2.sx||1);b.ua.h*=s*(S2.sy||1);if(S2.mx)b.ua.mx=1}
 const ncx=o.x+o.w/2+S2.d[0],nbot=o.bot+S2.d[1];b.w=o.w*s*(S2.sx||1);b.h=o.h*s*(S2.sy||1);b.bot=nbot;b.y=nbot-b.h;b.x=ncx-b.w/2;
 const dx=ncx-ocx,dy=nbot-obot;Z.forEach(z=>{if(z.b===b){z.x+=dx;z.y+=dy}});
 b._s=JSON.parse(JSON.stringify(S2));bFixSol(b);
 const r1=bRect(b);BALL().forEach(q=>{if(q._rp||q===b||hitR(bRect(q),r1)){bPaint(q);q._rp=0}});
 try{buildBOV()}catch(e){}ED.dirty=1}
function bFixSol(b){const so=bSol(b),o=b._o;if(!so||!o||!o.sol)return;const c=b._s.c,s=b._s.s||1,cx=b.x+b.w/2;so.w=c?c[0]:o.sol.w*s;so.h=c?c[1]:Math.min(o.sol.h,30);so.x=cx+(c?c[2]:o.sol.cx*s)-so.w/2;so.y=b.bot+o.sol.by-so.h}
{const _bb=buildBOV;buildBOV=function(){_bb.apply(this,arguments);BALL().forEach(b=>{if(!b.ua||!b.ua.mx)return;BOV.forEach(o=>{if(o.by==b.bot&&Math.abs(o.w-b.ua.w)<1&&!o._mx){o._mx=1;const f=c0=>{const c=document.createElement('canvas');c.width=c0.width;c.height=c0.height;const q=c.getContext('2d');q.translate(c.width,0);q.scale(-1,1);q.drawImage(c0,0,0);return c};o.cv=f(o.cv);if(o.cvn)o.cvn=f(o.cvn)}})});BALL().forEach(b=>{if(b._s&&b._s.c)bFixSol(b)})}}
const bDef=S2=>!S2||(!S2.d[0]&&!S2.d[1]&&(S2.s||1)==1&&!S2.k&&!S2.c&&!S2.mx&&!S2.sx&&!S2.sy&&!S2.door&&!S2.nosol);
function bEdit(b,fn){bOrig(b);const prev=JSON.parse(JSON.stringify(b._s)),n=JSON.parse(JSON.stringify(b._s));fn(n);if(JSON.stringify(n)==JSON.stringify(prev))return;bApply(b,n);gzPush(()=>bApply(b,prev));gzRefresh()}
function bMove(b,dx,dy){if(!dx&&!dy)return;bEdit(b,n=>{n.d=[Math.round(n.d[0]+dx),Math.round(n.d[1]+dy)]})}
const hitR=(a,c)=>a.x<c.x+c.w&&a.x+a.w>c.x&&a.y<c.y+c.h&&a.y+a.h>c.y;
function bPick(x,y){let best=null,bb=-1e9;BALL().forEach(b=>{const r=bRect(b);if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h&&b.bot>bb){bb=b.bot;best=b}});return best}
// 存檔
{const _s=gzSerialize;gzSerialize=function(){const m=_s();const o={};BALL().forEach(b=>{if(b._s&&!bDef(b._s))o[b.n]=b._s});if(Object.keys(o).length)m.bld=JSON.parse(JSON.stringify(o));return m}}
{const _r=gzReset;gzReset=function(){_r.apply(this,arguments);BALL().forEach(b=>{if(b._s&&!bDef(b._s))bApply(b,BS0())})}}
{const _a=gzApply;gzApply=function(m){_a(m);if(m&&m.bld)for(const n in m.bld){const b=BALL().find(q=>q.n==n);if(!b)continue;let q=m.bld[n];if(Array.isArray(q))q={d:q,s:1,k:null,c:null};bApply(b,Object.assign(BS0(),q))}}}
// 工具列：加入「🏢 建築」
{const bar=gzUI.querySelector('.gzTop'),ref=bar.querySelector('[data-t="pan"]');const bt=document.createElement('button');bt.dataset.t='bld';bt.title='選建築：拖曳移動、縮放、換圖、調整碰撞';bt.textContent='🏢 建築';bar.insertBefore(bt,ref);
 const rs=document.createElement('button');rs.dataset.a='rsize';rs.textContent='📐 房間・牆壁';rs.style.display='none';bar.insertBefore(rs,bar.querySelector('[data-a="undo"]'))}
{const _r=gzRefresh;gzRefresh=function(){_r.apply(this,arguments);const b=gzUI.querySelector('[data-t="bld"]'),rs=gzUI.querySelector('[data-a="rsize"]');if(b)b.style.display=ED.room?'none':'';if(rs)rs.style.display=ED.room?'':'none';
 if(ED.tool!='bld'){ED.bsel=null;ED.bpick=0}
 if(ED.tool=='bld'){$e('gzHint').textContent=ED.bpick?'🖼️ 從右邊素材面板點一張圖，建築就會換成那張（上方可以搜尋，例如「店」「燒肉」「b_」）。':'點一下建築選取，拖曳換位置。上方面板可以縮放、換圖、調整碰撞範圍（紅框＝擋路的地方）。　｜　Ctrl+Z 復原';bldPanel()}}}
function bldPanel(){const box=$e('gzSel'),b=ED.bsel;if(!b){box.style.display='none';return}box.style.display='flex';const S2=b._s||BS0(),so=bSol(b);
 box.innerHTML=`<b>🏢 ${b.n}</b><span style="opacity:.8">大小 ${Math.round((S2.s||1)*100)}%</span><button data-b="sm">－ 縮小</button><button data-b="lg">＋ 放大</button>`+
 `<button data-b="pick" class="${ED.bpick?'on':''}" style="${ED.bpick?'background:#e8b04a;color:#2a1608':''}">🖼️ 換圖</button>${S2.k?'<button data-b="orig">↩ 原本的圖</button>':''}${b.ua?'<button data-b="mx">↔ 鏡像</button>':''}`+
 (so?`<span style="opacity:.8;margin-left:6px">碰撞 ${Math.round(so.w)}×${Math.round(so.h)}</span><button data-b="cw-">寬－</button><button data-b="cw+">寬＋</button><button data-b="ch-">深－</button><button data-b="ch+">深＋</button><button data-b="cl">◀</button><button data-b="cr">▶</button>`:'')+
 `<span style="opacity:.8;margin-left:6px">外觀 寬${Math.round((S2.sx||1)*100)}% 高${Math.round((S2.sy||1)*100)}%</span><button data-b="bw-">↔－</button><button data-b="bw+">↔＋</button><button data-b="bh-">↕－</button><button data-b="bh+">↕＋</button>`+(S2.sx||S2.sy?'<button data-b="bwh0">⟲ 原比例</button>':'')+`<button data-b="rst">♻ 重設這棟</button>`}
function bAct(a){const b=ED.bsel;if(!b)return;const so=bSol(b);
 const C=n=>{if(!n.c)n.c=[so.w,so.h,so.x+so.w/2-(b.x+b.w/2)];return n.c};
 if(a=='pick'){ED.bpick=!ED.bpick;gzRefresh();return}
 bEdit(b,n=>{if(a=='sm')n.s=Math.max(.3,Math.round(((n.s||1)-.05)*100)/100);else if(a=='lg')n.s=Math.min(3,Math.round(((n.s||1)+.05)*100)/100);
  else if(/^b[wh][+-]$/.test(a)){const f=a[2]=='+'?1.08:1/1.08,key=a[1]=='w'?'sx':'sy';let v=Math.round((n[key]||1)*f*100)/100;v=Math.max(.3,Math.min(4,v));if(Math.abs(v-1)<.02)delete n[key];else n[key]=v}else if(a=='bwh0'){delete n.sx;delete n.sy}
  else if(a=='orig'){n.k=null;n.mx=0}else if(a=='mx')n.mx=n.mx?0:1;else if(a=='rst'){const d=n.d;Object.assign(n,BS0());n.d=d}
  else if(so){const c=C(n);if(a=='cw-')c[0]=Math.max(8,c[0]-6);if(a=='cw+')c[0]+=6;if(a=='ch-')c[1]=Math.max(4,c[1]-4);if(a=='ch+')c[1]+=4;if(a=='cl')c[2]-=4;if(a=='cr')c[2]+=4}})}
gzUI.addEventListener('click',ev=>{const t=ev.target.closest('[data-b]');if(t&&ED.tool=='bld'){ev.stopImmediatePropagation();bAct(t.dataset.b);return}
 const it=ev.target.closest('.gzIt');if(it&&it.dataset.k&&ED.tool=='bld'&&ED.bsel&&ED.bpick){ev.stopImmediatePropagation();const k=it.dataset.k;if(GZWALL[k])return toast('這個不能當建築外觀');ED.bpick=0;bEdit(ED.bsel,n=>{n.k=k;n.mx=0});toast('🖼️ '+ED.bsel.n+' 換好外觀了，可以再用 ＋－ 調整大小');gzRefresh()}},true);
window.bldDown=ev=>{if(!dlg.hidden)return;const [x,y]=gzW(ev);const b=bPick(x,y);
 if(!b){ED.drag={m:'pan',sx:ev.clientX,sy:ev.clientY,cx:ED.cx,cy:ED.cy};return}if(ED.bsel!==b){ED.bsel=b;ED.bpick=0;gzRefresh()}ED.drag={m:'bld',b,sx:x,sy:y,dx:0,dy:0}};
addEventListener('pointermove',ev=>{const d=ED.on&&ED.drag;if(!d||d.m!='bld')return;const [x,y]=gzW(ev);d.dx=Math.round(x-d.sx);d.dy=Math.round(y-d.sy)},true);
addEventListener('pointerup',ev=>{const d=ED.on&&ED.drag;if(!d||d.m!='bld')return;ED.drag=null;ev.stopImmediatePropagation();const b=d.b,dx=d.dx,dy=d.dy;if(Math.abs(dx)+Math.abs(dy)>2){bMove(b,dx,dy);toast('🏢 '+b.n+' 移好了')}},true);
// 建築外框、選取框、碰撞範圍
{const _f=gzFrame;gzFrame=function(now){_f.apply(this,arguments);if(ED.room||ED.tool!='bld')return;const z=ED.z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);
 BALL().forEach(b=>{const r=bRect(b);g.strokeStyle='rgba(255,216,74,.35)';g.lineWidth=1/z;g.strokeRect(r.x,r.y,r.w,r.h)});
 const sb=ED.bsel;if(sb){const r=bRect(sb);g.strokeStyle='#ffd84a';g.lineWidth=2/z;g.strokeRect(r.x,r.y,r.w,r.h);const so=bSol(sb);if(so){g.fillStyle='rgba(255,40,40,.32)';g.fillRect(so.x,so.y,so.w,so.h);g.strokeStyle='#ff3030';g.lineWidth=1.5/z;g.strokeRect(so.x,so.y,so.w,so.h)}
  Z.filter(q=>q.b===sb).forEach(q=>{g.fillStyle='rgba(60,200,255,.35)';g.fillRect(q.x,q.y,q.w,q.h)})}
 const d=ED.drag;if(d&&d.m=='bld'){const r=bRect(d.b);g.setLineDash([4/z,3/z]);g.strokeStyle='#ffd84a';g.lineWidth=2/z;g.strokeRect(r.x+d.dx,r.y+d.dy,r.w,r.h);g.setLineDash([]);g.fillStyle='rgba(255,216,74,.15)';g.fillRect(r.x+d.dx,r.y+d.dy,r.w,r.h);
  g.fillStyle='#ffd84a';g.font=`bold ${10/z}px sans-serif`;g.textAlign='center';g.fillText(d.b.n,r.x+d.dx+r.w/2,r.y+d.dy-4/z)}
 else if(ED.inCv){const h=bPick(ED.mx,ED.my);if(h&&h!==sb){const r=bRect(h);g.strokeStyle='#fff';g.lineWidth=1.5/z;g.strokeRect(r.x,r.y,r.w,r.h);g.fillStyle='#fff';g.font=`bold ${10/z}px sans-serif`;g.textAlign='center';g.fillText(h.n,r.x+r.w/2,r.y-4/z)}}
 g.restore()}}
// ───────── 室內：調整房間大小 ─────────
function rmResize(n,dw,dh){const r=IN[n];gzRoomKeep(n);const before=gzRSnap(),oW=r.W,oH=r.H;const nW=Math.max(200,Math.min(1200,r.W+dw)),nH=Math.max(160,Math.min(1000,r.H+dh));if(nW==oW&&nH==oH)return;
 if(r._efl){const ow=Math.ceil(oW/8),nw=Math.ceil(nW/8),F={};for(const ci in r._efl){const cx=ci%ow,cy=Math.floor(ci/ow);if(cx<nw&&cy*8<nH)F[cy*nw+cx]=r._efl[ci]}r._efl=F}
 r.W=nW;r.H=nH;ROOMED.add(n);gzRoomRefresh(n);gzClampCam();const oW2=oW,oH2=oH;gzPush(()=>{rmResize(n,oW2-r.W,oH2-r.H)});
 if(p.x>r.W-20)p.x=r.W-30;if(p.y>r.H-14)p.y=r.H-30}
function rsizeMenu(){const n=ED.room,r=IN[n],wh=r._wh||28;openDlg('📐 房間・牆壁',`${n}：寬 <b>${r.W}</b> × 高 <b>${r.H}</b>　牆壁高度 <b>${wh}</b><br><span style="font-size:12px;opacity:.8">牆壁、地板和出口會自動跟著調整。家具不會移動，記得自己挪到新的空間。<br>想刷牆：用「🎨 刷地板」直接塗在牆上就可以，素材選「地板牆面」那一類最適合。</span>`,
 [['🧱 牆壁加高 +8','人不能走進牆壁',()=>{rmWall(n,8);rsizeMenu()}],['🧱 牆壁降低 −8','',()=>{rmWall(n,-8);rsizeMenu()}],['➡️ 加寬 +32','',()=>{rmResize(n,32,0);rsizeMenu()}],['⬅️ 縮窄 −32','',()=>{rmResize(n,-32,0);rsizeMenu()}],['⬇️ 加高 +32','',()=>{rmResize(n,0,32);rsizeMenu()}],['⬆️ 縮矮 −32','',()=>{rmResize(n,0,-32);rsizeMenu()}],['完成','',closeDlg]])}
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-a="rsize"]');if(b&&ED.room)rsizeMenu()});
{const _s=gzSerialize;gzSerialize=function(){const m=_s();if(m.rooms)for(const n in m.rooms){const r=IN[n];if(r){m.rooms[n].W=r.W;m.rooms[n].H=r.H;if(r._wh)m.rooms[n].wh=r._wh}}return m}}
{const _a=gzApply;gzApply=function(m){if(m&&m.rooms)for(const n in m.rooms){const r=IN[n],q=m.rooms[n];if(r&&q.W){gzRoomKeep(n);if(r._oW==null){r._oW=r.W;r._oH=r.H}r.W=q.W;r.H=q.H}if(r)r._wh=q.wh||undefined}_a(m)}}
{const _k=gzRoomKeep;gzRoomKeep=function(n){const r=IN[n];if(r&&r._oW==null){r._oW=r.W;r._oH=r.H}return _k(n)}}
{const _r=gzReset;gzReset=function(){ROOMED.forEach(n=>{const r=IN[n];if(r){r._wh=undefined}if(r&&r._oW!=null){r.W=r._oW;r.H=r._oH}});_r.apply(this,arguments)}}
// 建築外觀素材分類（換圖時好找）
EDCAT.splice(EDCAT.length-1,0,['🏢 建築外觀',Object.keys(UA).filter(k=>/^(b_|ns_)/.test(k)).sort().concat(['pk32_6']),'🏢 建築']);
try{for(const n in UAB)if(!EDNM[UAB[n][0]])EDNM[UAB[n][0]]=n+'（外觀）';Object.assign(EDNM,Object.fromEntries(Object.entries({b_apt:'公寓大樓',b_tan:'碳佐麻里（外觀）',b_cafe2:'咖啡店（外觀2）',b_onsen:'溫泉旅館（外觀）',b_parking:'停車場'}).filter(e=>!EDNM[e[0]])))}catch(e){}

// ───────── 室內牆壁高度 ─────────
function rmWall(n,d){const r=IN[n];gzRoomKeep(n);const o=r._wh||28,v=Math.max(12,Math.min(140,o+d));if(v==o)return;r._wh=v==28?undefined:v;ROOMED.add(n);gzRoomRefresh(n);gzPush(()=>{r._wh=o==28?undefined:o;gzRoomRefresh(n)});ED.dirty=1}
function wallSol(r){if(!r||!r.sol)return;for(let i=r.sol.length-1;i>=0;i--)if(r.sol[i]._wall)r.sol.splice(i,1);if(r._wh>28)r.sol.push({x:0,y:0,w:r.W||320,h:r._wh+2,_wall:1})}
{const _rr=renderRm;renderRm=function(d,n){const wh=d._wh;if(!wh||wh==28||d.out)return _rr(d,n);const p0=d.pre;
 d.pre=(c,W2,H2)=>{if(wh>28){R(c,0,20,W2,wh-20,d.w||'#c97a5a');GR(c,0,20,W2,wh-20,shade(d.w||'#c97a5a',10),shade(d.w||'#c97a5a',-22));
   try{if(AT.ok){const wm=AT.M[nearA('wl',8,d.w||'#c97a5a')];c.save();c.beginPath();c.rect(0,20,W2,wh-20);c.clip();for(let py=0;py<wh;py+=28)for(let px=0;px<W2;px+=45)c.drawImage(AT.img,wm[0],wm[1],46,28,px,py,46,28);c.restore()}}catch(e){}
   for(let i=0;i<W2;i+=8)R(c,i,20,1,wh-22,'rgba(0,0,0,.06)')}
  else{R(c,0,wh,W2,30-wh,d.f||'#c9a06a');R(c,0,wh,W2,30-wh,'rgba(0,0,0,.06)')}
  R(c,0,wh-6,W2,5,'rgba(0,0,0,.18)');R(c,0,wh-2,W2,3,'rgba(0,0,0,.42)');R(c,0,wh-6,W2,1,'rgba(255,255,255,.2)');
  p0&&p0(c,W2,H2)};
 try{const cv=_rr(d,n);wallSol(d);return cv}finally{d.pre=p0}}}
setInterval(()=>{try{if(scene&&rm&&rm._wh>28&&rm.sol&&!rm.sol.some(o=>o._wall))wallSol(rm)}catch(e){}},400);
