/* v12.1 幻境 Online：第三章「灼熱火山」（火蜥蜴・雷鳥・蒸汽岩魔・頭目熔岩巨魔）、新陷阱、異次元背包、素材工坊、樹狀技能樹、每日任務領獎、隊友藥箱 */
// ───────── 第三章 ─────────
VCH.push({n:'灼熱火山',f0:11,f1:15,mobs:['lizard','tbird','golem'],boss:'demon',th:'volcano',lv:'Lv.20～30'});
Object.assign(VMAT,{scale:['火蜥鱗',28],feather:['雷鳥羽毛',25],magma:['熔岩核心',27]});
Object.assign(VMOB,{
 lizard:{n:'火蜥蜴',hits:5,atk:1.15,r:16,spd:120,exp:1.5,drop:[['scale',.35]],col:'#ff6a2a',fo:12,el:'fire',d:'貼地狂奔，張嘴就會吐火球。跳起來就躲得掉。（屬性：🔥火，怕水）'},
 tbird:{n:'雷鳥',hits:3.5,atk:1.1,r:15,spd:95,exp:1.4,drop:[['feather',.4]],col:'#ffd84a',fly:1,fo:11,el:'elec',d:'在空中盤旋，頭頂冒出「!」時，你腳下會落雷。（屬性：⚡電，怕毒）'},
 golem:{n:'蒸汽岩魔',hits:8.5,atk:1.35,r:19,spd:34,exp:1.9,drop:[['magma',.25]],col:'#5a5a6a',fo:19,el:'water',d:'很硬很慢。舉起雙拳就是要砸地，周圍會出現衝擊波，快跳開。（屬性：💧水，怕電）'},
 demon:{n:'熔岩巨魔',hits:170,atk:1.9,r:56,spd:46,exp:14,drop:[['magma',1],['scale',1],['feather',1]],col:'#c03a1a',boss:1,fo:28,el:'fire',d:'火山的主人。噴火、叫隕石、腳下冒岩漿柱，還會整隻跳起來砸地。（屬性：🔥火，怕水）'}});
// ───────── 新怪精靈圖 ─────────
function vaLizard(st,fl){const k='lz'+st+fl;if(VA[k])return VA[k];const C=fl?['#fff','#fff','#ddd','#999']:['#ff6a2a','#ffd04a','#c03a10','#3a0e04'];
 return VA[k]=vaPix(42,24,x=>{const run=st.startsWith('run')?+st.slice(3):-1,sp=st=='spit';
  x.fillStyle=C[0];x.beginPath();x.moveTo(12,14);x.quadraticCurveTo(3,12,1,6);x.lineTo(4,7);x.quadraticCurveTo(7,12,14,12);x.fill();x.fillStyle='#ffe04a';x.fillRect(0,3,3,3);x.fillStyle='#ff3a1a';x.fillRect(1,1,2,3);
  [[13,0],[17,1],[25,0],[29,1]].forEach(([lx,b],i)=>{const o=run>=0?((run+i)%2?2:-2):0;x.fillStyle=b?C[2]:C[0];x.fillRect(lx+o,17,3,5);x.fillRect(lx+o-1,21,5,1)});
  x.fillStyle=C[0];x.beginPath();x.ellipse(21,14,10,5,0,0,7);x.fill();x.fillStyle=C[1];x.beginPath();x.ellipse(21,17,7,2,0,0,7);x.fill();x.fillStyle=C[2];[15,19,23,27].forEach(a=>x.fillRect(a,9,2,2));x.fillStyle='#ffb03a';[16,24].forEach(a=>{x.fillRect(a,7,1,2)});
  x.fillStyle=C[0];x.beginPath();x.ellipse(33,12,6,4.5,0,0,7);x.fill();x.beginPath();x.ellipse(37,13,4,3,0,0,7);x.fill();x.fillStyle='#fff';x.fillRect(33,9,3,3);x.fillStyle='#1a0a04';x.fillRect(34,10,2,2);x.fillStyle='#ff8aa8';x.fillRect(35,14,2,1);
  if(sp){x.fillStyle='#5a0a04';x.fillRect(37,14,5,2);x.fillStyle='#ffd04a';x.fillRect(40,13,2,2)}},C[3])}
function vaTbird(fr,fl){const k='tb'+fr+fl;if(VA[k])return VA[k];const C=fl?['#fff','#eee','#fff','#999']:['#ffd84a','#4a8aff','#fff6b0','#2a2a5a'];
 return VA[k]=vaPix(38,28,x=>{const up=!fr;[-1,1].forEach(s=>{x.fillStyle=C[1];x.beginPath();x.moveTo(19+s*3,14);x.lineTo(19+s*17,up?3:22);x.lineTo(19+s*12,up?9:16);x.lineTo(19+s*15,up?8:19);x.lineTo(19+s*8,up?12:15);x.closePath();x.fill()});
  x.fillStyle=C[0];x.beginPath();x.ellipse(19,15,7,6,0,0,7);x.fill();x.fillStyle=C[2];x.beginPath();x.ellipse(19,18,4,3,0,0,7);x.fill();x.fillStyle=C[0];x.beginPath();x.moveTo(15,10);x.lineTo(13,2);x.lineTo(17,6);x.lineTo(19,0);x.lineTo(21,6);x.lineTo(25,2);x.lineTo(23,10);x.fill();
  x.fillStyle='#fff';x.fillRect(20,12,3,3);x.fillStyle='#1a1a3a';x.fillRect(21,13,2,2);x.fillStyle='#ff9a3a';x.beginPath();x.moveTo(25,14);x.lineTo(29,15);x.lineTo(25,17);x.fill();x.fillStyle='#ff8aa8';x.fillRect(16,16,2,1);
  x.fillStyle=C[1];x.fillRect(16,21,2,3);x.fillRect(21,21,2,3)},C[3])}
function vaGolem(st,fl){const k='gl'+st+fl;if(VA[k])return VA[k];const C=fl?['#fff','#eee','#ddd','#999','#fff']:['#6a6a7a','#8a8a9a','#4a4a58','#1e1e2a','#6ae0ff'];
 return VA[k]=vaPix(40,42,x=>{const sl=st=='slam',w2=st.startsWith('walk')?+st.slice(4):-1;x.fillStyle=C[2];x.fillRect(12+(w2==0?-1:w2==1?1:0),33,6,8);x.fillRect(22+(w2==0?1:w2==1?-1:0),33,6,8);
  x.fillStyle=C[0];x.beginPath();x.roundRect(9,12,22,23,5);x.fill();x.fillStyle=C[1];x.fillRect(11,14,8,3);x.fillStyle=C[2];x.fillRect(24,22,5,9);
  x.fillStyle=C[4];x.fillRect(16,24,1,6);x.fillRect(17,29,4,1);x.fillRect(25,16,1,5);x.fillRect(12,28,3,1);
  const ay=sl?2:20;x.fillStyle=C[0];x.beginPath();x.roundRect(1,ay,9,12,3);x.fill();x.beginPath();x.roundRect(30,ay,9,12,3);x.fill();x.fillStyle=C[1];x.fillRect(2,ay+1,4,2);x.fillRect(31,ay+1,4,2);
  x.fillStyle=C[0];x.beginPath();x.roundRect(12,3,16,12,4);x.fill();x.fillStyle=C[4];x.fillRect(15,7,3,3);x.fillRect(22,7,3,3);x.fillStyle='#fff';x.fillRect(15,7,1,1);x.fillRect(22,7,1,1);x.fillStyle=C[2];x.fillRect(17,12,6,1);
  x.fillStyle='rgba(220,230,255,1)';if(!fl){x.fillRect(13,1,2,2);x.fillRect(25,0,2,2)}},C[3])}
function vaDemon(st,fl,angry){const k='dm'+st+fl+angry;if(VA[k])return VA[k];const S=2.5,w=Math.round(40*S),h=Math.round(46*S);const C=fl?['#fff','#eee','#ddd','#999','#fff']:['#a8301a','#d84a2a','#6a1a0a','#2a0602','#ffb03a'];
 return VA[k]=vaPix(w,h,x=>{x.save();x.scale(S,S);const br=st=='breath',up=st=='cast';
  x.fillStyle=C[2];x.fillRect(12,36,6,9);x.fillRect(23,36,6,9);x.fillStyle='#1a0602';x.fillRect(11,44,8,2);x.fillRect(22,44,8,2);
  x.fillStyle=C[0];x.beginPath();x.roundRect(9,16,23,22,6);x.fill();x.fillStyle=C[4];x.fillRect(14,22,1,8);x.fillRect(15,29,5,1);x.fillRect(25,19,1,6);x.fillRect(22,31,6,1);
  x.fillStyle=C[1];x.beginPath();x.roundRect(up?2:1,up?6:20,8,12,3);x.fill();x.beginPath();x.roundRect(up?31:32,up?6:20,8,12,3);x.fill();x.fillStyle='#1a0602';[[up?3:2,up?16:30],[up?33:34,up?16:30]].forEach(([a,b])=>{x.fillRect(a,b,2,2);x.fillRect(a+3,b,2,2)});
  x.fillStyle='#ffd04a';[[10,6],[16,2],[20,0],[24,2],[30,6]].forEach(([a,b])=>{x.beginPath();x.moveTo(a-3,b+8);x.lineTo(a,b);x.lineTo(a+3,b+8);x.fill()});x.fillStyle='#ff6a1a';[[13,5],[20,3],[27,5]].forEach(([a,b])=>{x.beginPath();x.moveTo(a-2,b+6);x.lineTo(a,b+1);x.lineTo(a+2,b+6);x.fill()});
  x.fillStyle=C[0];x.beginPath();x.roundRect(11,6,19,14,5);x.fill();x.fillStyle='#e8d8c0';x.beginPath();x.moveTo(11,9);x.lineTo(5,2);x.lineTo(13,7);x.fill();x.beginPath();x.moveTo(30,9);x.lineTo(36,2);x.lineTo(28,7);x.fill();
  x.fillStyle=angry?'#ffffff':'#ffd84a';x.fillRect(15,11,4,3);x.fillRect(23,11,4,3);x.fillStyle=angry?'#ff2a2a':'#1a0602';x.fillRect(17,12,2,2);x.fillRect(25,12,2,2);x.fillStyle=C[3];x.fillRect(14,9,5,1);x.fillRect(23,9,5,1);
  x.fillStyle='#1a0602';x.fillRect(17,16,8,br?3:1);if(br){x.fillStyle='#ffd04a';x.fillRect(19,17,4,1)}x.fillStyle='#fff';x.fillRect(18,16,1,1);x.fillRect(23,16,1,1);x.restore()},C[3])}
// ───────── 火山背景 ─────────
{const _s=vaSky;vaSky=function(g,VW,VH,t,th){if(th!='volcano')return _s(g,VW,VH,t,th);const gr=g.createLinearGradient(0,0,0,VH);gr.addColorStop(0,'#2a0a12');gr.addColorStop(.55,'#7a2418');gr.addColorStop(1,'#ff8a3a');g.fillStyle=gr;g.fillRect(0,0,VW,VH);g.fillStyle='rgba(255,120,40,.18)';g.beginPath();g.arc(VW*.7,VH*.85,260,0,7);g.fill()}}
{const _l=vaLayers;vaLayers=function(VW,VH,AW,seed,th){if(th!='volcano')return _l(VW,VH,AW,seed,th);const r=vaRnd(seed),mk=(f,h,fn)=>{const w=Math.ceil((VW+(AW-VW)*f)/2)+20;return{f,cv:vaGrain(vaPix(w,h,x=>fn(x,w,h),null),12,seed+f*100)}};
 return[mk(.08,80,(x,w,h)=>{for(let i=0;i<w/18;i++){x.fillStyle=['#ffb04a','#ff6a2a'][i%2];x.fillRect(r()*w,r()*h,1,1)}}),
  mk(.18,170,(x,w,h)=>{for(let i=0;i<w/120+1;i++){const cx=r()*w,hh=90+r()*60,bw=70+r()*50;x.fillStyle='#4a1a18';x.beginPath();x.moveTo(cx-bw,h);x.lineTo(cx-12,h-hh);x.lineTo(cx+12,h-hh);x.lineTo(cx+bw,h);x.fill();x.fillStyle='#ff6a2a';x.fillRect(cx-10,h-hh,20,3);x.fillStyle='#ffb04a';x.fillRect(cx-2,h-hh,3,30+r()*30)}x.fillStyle='#3a1414';x.fillRect(0,h-16,w,16)}),
  mk(.38,150,(x,w,h)=>{for(let i=0;i<w/14;i++){const sx=r()*w,sh=30+r()*70,sw=6+r()*10;x.fillStyle=['#3a1a16','#321412'][i%2];x.beginPath();x.moveTo(sx-sw,h);x.lineTo(sx,h-sh);x.lineTo(sx+sw,h);x.fill()}for(let i=0;i<w/60;i++){const lx=r()*w;x.fillStyle='#ff7a2a';x.fillRect(lx,h-50+r()*20,2,50)}x.fillStyle='#2e1210';x.fillRect(0,h-22,w,22)}),
  mk(.62,110,(x,w,h)=>{for(let i=0;i<w/8;i++){x.fillStyle=['#24100e','#2e1412'][i%2];x.beginPath();x.ellipse(r()*w,h-10,10+r()*12,14+r()*16,0,Math.PI,0);x.fill()}x.fillStyle='#24100e';x.fillRect(0,h-14,w,14);x.fillStyle='#ff6a2a';for(let i=0;i<w/30;i++)x.fillRect(r()*w,h-14+r()*12,2,1)})]}}
{const _g=vaGround;vaGround=function(AW,AH,GY,seed,th){if(th!='volcano')return _g(AW,AH,GY,seed,th);const r=vaRnd(seed),w=AW/2,h=AH/2,gy=GY/2;return vaGrain(vaPix(w,h,x=>{x.fillStyle='#3a2622';x.fillRect(0,gy+3,w,h);x.fillStyle='#2a1a18';x.fillRect(0,gy+18,w,h);x.fillStyle='#1e1210';x.fillRect(0,gy+40,w,h);
  for(let i=0;i<w/8;i++){let cx=r()*w,cy=gy+6+r()*(h-gy-10);x.fillStyle=r()<.5?'#ff6a2a':'#ffb04a';for(let j=0;j<5;j++){x.fillRect(cx,cy,2,1);cx+=1+r()*2;cy+=(r()-.5)*3}}
  x.fillStyle='#5a3a32';x.fillRect(0,gy-2,w,6);x.fillStyle='#7a5246';x.fillRect(0,gy-2,w,2);for(let i=0;i<w;i+=2+Math.floor(r()*4)){x.fillStyle='#4a2e28';x.fillRect(i,gy-3,2,2)}},null),12,seed)}}
{const _p=vaPlat;vaPlat=function(p,th){if(th!='volcano')return _p(p,th);if(p._cv)return p._cv;const r=vaRnd(Math.round(p.x*7+p.y)),w=Math.ceil(p.w/2)+4,h=30;
 return p._cv=vaGrain(vaPix(w,h,x=>{const top=4;x.fillStyle='#3a2622';x.beginPath();x.moveTo(1,top+2);x.lineTo(w-1,top+2);for(let i=0;i<=8;i++){const t=i/8;x.lineTo(w-1-t*(w-2),top+6+Math.sin(t*Math.PI)*(14+r()*6))}x.closePath();x.fill();
  x.fillStyle='#ff6a2a';for(let i=0;i<w/10;i++){let cx=4+r()*(w-8),cy=top+5+r()*8;for(let j=0;j<4;j++){x.fillRect(cx,cy,1,1);cx+=1;cy+=r()<.5?1:0}}x.fillStyle='#6a4238';x.fillRect(0,top,w,4);x.fillStyle='#8a5a4a';x.fillRect(0,top,w,1)},'#140806'),12,p.x|0)}}
// ───────── 每日任務：完成後點一下領獎 ─────────
function vrQuest(k,m,n){const D=vrDaily();D.q.forEach(q=>{if(q.done||q.k!=k||(q.m&&q.m!=m))return;q.n=k=='floor'?Math.max(q.n,n):q.n+(n||1);if(q.n>=q.g){q.done=1;q.claim=1;toast('📜 每日任務完成：'+q.t+'（回大廳領獎）')}})}
function vrDailyView(){const V=vrS(),D=vrDaily();openDlg('📜 每日任務','每天三個任務，完成後點一下領獎（💠150＋獸骨×2）。',D.q.map(q=>[(q.claim?'🎁 ':q.done?'✅ ':'⬜ ')+q.t,q.claim?'點我領獎！':q.done?'已領取':`${Math.min(q.n,q.g)}/${q.g}`,()=>{if(!q.claim)return;q.claim=0;V.gold+=150;V.mat.bone=(V.mat.bone||0)+2;SVDIRTY=1;toast('🎁 領到 💠150・獸骨×2');vrDailyView()},!q.claim]).concat([['返回','',vrLobby]]))}
// ───────── 異次元背包 ─────────
const vrStash=()=>{const V=vrS();return V.stash||(V.stash=[])};
const VPRICE=it=>[8,25,60,150,400][it.r]+it.lv*2;
function vrStashView(pg){pg=pg||0;const V=vrS(),S=vrStash().slice().sort((a,b)=>b.r-a.r||b.lv-a.lv),per=12,L=S.slice(pg*per,pg*per+per);
 openDlg('🌀 異次元背包',`收了 <b>${S.length}</b> 件（上限 300）・隨身背包 ${V.bag.length}/30<br><span style="font-size:12px">打到的裝備背包裝不下，會自動傳送到這裡。合成工坊也會用到這裡的裝備。</span>`,
  L.map(it=>[vrItHTML(it),vrItDesc(it),()=>vrStashItem(it,pg)]).concat([
   pg>0?['⬅ 上一頁','',()=>vrStashView(pg-1)]:null,(pg+1)*per<S.length?['下一頁 ➡','',()=>vrStashView(pg+1)]:null,
   ['📦 隨身背包的「普通」全部收進來','',()=>{const mv=V.bag.filter(i=>i.r==0&&!vrUsedBy(i.id));V.bag=V.bag.filter(i=>!mv.includes(i));vrStash().push(...mv);SVDIRTY=1;toast('📦 收進 '+mv.length+' 件');vrStashView(pg)}],
   ['💰 賣掉這裡全部「普通」','',()=>{const s=vrStash().filter(i=>i.r==0);let g=0;s.forEach(i=>g+=VPRICE(i));V.stash=vrStash().filter(i=>i.r!=0);V.gold+=g;SVDIRTY=1;toast('💠 +'+g);vrStashView(0)}],['返回','',vrLobby]].filter(Boolean)))}
function vrStashItem(it,pg){const V=vrS();openDlg(vrItName(it),vrItHTML(it)+'<br>'+vrItDesc(it),[['🎒 拿到隨身背包',V.bag.length>=30?'背包滿了':'',()=>{V.stash=vrStash().filter(i=>i!==it);V.bag.push(it);SVDIRTY=1;vrStashView(pg)},V.bag.length>=30],['💰 賣掉（💠'+VPRICE(it)+'）','',()=>{V.stash=vrStash().filter(i=>i!==it);V.gold+=VPRICE(it);SVDIRTY=1;vrStashView(pg)}],['返回','',()=>vrStashView(pg)]])}
// 合成工坊也能用異次元背包裡的裝備
function vrCraft(){const V=vrS(),pool=()=>[...V.bag,...vrStash()],free=r=>pool().filter(i=>i.r==r&&!vrUsedBy(i.id));
 openDlg('⚒️ 合成工坊',`💠 ${V.gold}<br>三件同品質＋幻境幣 → 一件<b>高一階</b>的裝備。<span style="font-size:12px">（會用到隨身背包和異次元背包裡的；穿在身上的不會被拿走）</span>`,
  [0,1,2,3].map(r=>{const L=free(r),c=VCRAFT[r];return[`<span style="color:${VRAR[r][1]}">${VRAR[r][0]}</span> ×3 → <span style="color:${VRAR[r+1][1]}">${VRAR[r+1][0]}</span>`,`有 ${L.length} 件・💠${c}`,()=>vrCraftGo(r),L.length<3||V.gold<c]}).concat([['🔨 素材工坊','用打到的素材打造特殊裝備',vrForge],['返回','',vrLobby]]))}
function vrCraftGo(r){const V=vrS(),L=[...V.bag,...vrStash()].filter(i=>i.r==r&&!vrUsedBy(i.id)).sort((a,b)=>a.lv-b.lv).slice(0,3),C=vrCls(),lv=Math.max(...L.map(i=>i.lv))+1,go=t=>{if(V.gold<VCRAFT[r])return;V.gold-=VCRAFT[r];V.bag=V.bag.filter(i=>!L.includes(i));V.stash=vrStash().filter(i=>!L.includes(i));
  const it=vrMkItem(t,r+1,Math.min(V.cap||10,lv),t=='w'?C.wp[Math.floor(Math.random()*C.wp.length)]:undefined);(V.bag.length<30?V.bag:vrStash()).push(it);SVDIRTY=1;openDlg('✨ 合成成功！',`爐火一閃——<br><br>${vrItHTML(it)}<br><span style="font-size:13px">${vrItDesc(it)}</span>`,[['👕 直接穿上','',()=>{if(!V.bag.includes(it)){V.stash=vrStash().filter(i=>i!==it);V.bag.push(it)}if(t=='w'){V.eq.w=it.id;V.cur=it.b}else V.eq.a=it.id;SVDIRTY=1;vrCraft()}],['繼續合成','',vrCraft]])};
 openDlg('⚒️ 要合成什麼？',`會用掉：<br>${L.map(i=>vrItHTML(i)+'（Lv.'+i.lv+'）').join('<br>')}<br>＋ 💠${VCRAFT[r]}`,[[`🗡️ 武器（${C.n}能用的隨機一種）`,'',()=>go('w')],['🛡️ 防具','',()=>go('a')],['返回','',vrCraft]])}
// ───────── 素材工坊 ─────────
const VFORGE=[
 {nm:'狼牙劍',t:'w',b:'sword',r:2,m:{claw:8,hide:6},g:150,af:{atk:8,crit:6}},{nm:'凝膠護甲',t:'a',r:2,m:{gel:15},g:120,af:{hp:12,mp:20}},{nm:'獸骨長弓',t:'w',b:'bow',r:2,m:{bone:8,claw:4},g:150,af:{crit:6,spd:6}},
 {nm:'蝙蝠斗篷',t:'a',r:3,m:{wing:10,hide:6},g:400,af:{spd:10,hp:10,crit:5}},{nm:'哥布林炸彈斧',t:'w',b:'axe',r:3,m:{fang:10,bark:6},g:400,af:{atk:10,ls:3,crit:5}},
 {nm:'樹王權杖',t:'w',b:'staff',r:3,m:{bark:15,wing:5},g:500,af:{mp:30,cdr:12,atk:8}},{nm:'雷鳴魯特琴',t:'w',b:'lute',r:3,m:{feather:8,wing:6},g:500,af:{atk:9,cdr:10,mp:20}},{nm:'樹皮騎士鎧',t:'a',r:3,m:{bark:12,fang:6},g:450,af:{hp:15,atk:6,crit:4}},
 {nm:'炎鱗雙刀',t:'w',b:'dual',r:4,m:{scale:12,magma:4},g:1200,af:{atk:10,crit:8,ls:4,spd:8}},{nm:'雷鳥神弓',t:'w',b:'bow',r:4,m:{feather:12,magma:4},g:1200,af:{crit:8,atk:10,cdr:12,spd:8}},
 {nm:'熔岩法杖',t:'w',b:'staff',r:4,m:{magma:10,feather:6},g:1300,af:{atk:10,mp:30,cdr:14,crit:6}},{nm:'炎魔大劍',t:'w',b:'great',r:4,m:{magma:12,scale:6,feather:6},g:1500,af:{atk:10,crit:8,ls:5,hp:12}},{nm:'熔岩巨魔鎧',t:'a',r:4,m:{magma:10,scale:8},g:1200,af:{hp:15,atk:8,cdr:10,mp:25}}];
function vrForge(){const V=vrS(),has=f=>Object.entries(f.m).every(([k,n])=>(V.mat[k]||0)>=n)&&V.gold>=f.g;
 openDlg('🔨 素材工坊',`💠 ${V.gold}　素材：${Object.entries(V.mat).filter(q=>q[1]).map(([k,n])=>VMAT[k][0]+'×'+n).join('、')||'沒有'}<br><span style="font-size:12px">打到的素材別急著賣！可以打造有名字、詞綴固定的好裝備。傳說級只有這裡做得出來。</span>`,
  VFORGE.map(f=>[`<span style="color:${VRAR[f.r][1]};font-weight:bold">[${VRAR[f.r][0]}] ${f.t=='w'?VWP[f.b].ic:'🛡️'} ${f.nm}</span>`,Object.entries(f.m).map(([k,n])=>`${VMAT[k][0]} ${V.mat[k]||0}/${n}`).join('・')+`・💠${f.g}<br>`+Object.entries(f.af).map(([k,v])=>AFX[k][0]+' +'+v+AFX[k][3]).join('、'),()=>{
   if(!has(f))return;for(const k in f.m)V.mat[k]-=f.m[k];V.gold-=f.g;const it=vrMkItem(f.t,f.r,Math.max(1,V.lv),f.b);it.af=Object.assign({},f.af);it.nm=f.nm;if(f.t=='a')it.n=f.nm;(V.bag.length<30?V.bag:vrStash()).push(it);SVDIRTY=1;
   openDlg('🔨 打造完成！',`鐵鎚叮叮噹噹——<br><br>${vrItHTML(it)}<br>${vrItDesc(it)}`,[['繼續打造','',vrForge],['返回大廳','',vrLobby]])},!has(f)]).concat([['返回','',vrCraft]]))}
// ───────── 隊友藥箱（跟你的分開） ─────────
{const _a=vrAlly;vrAlly=function(k){_a(k);try{const V=vrS(),A=vrAeq(),q=A[k]||(A[k]={});const o=curDlg[2];o.splice(o.length-1,0,[`🧪 幫他買藥水 ×5（💠100）`,`他的藥箱：${q.pot||0} 瓶（每趟另外自帶 2 瓶）`,()=>{if(V.gold<100)return toast('幻境幣不夠');V.gold-=100;q.pot=(q.pot||0)+5;SVDIRTY=1;vrAlly(k)},V.gold<100]);openDlg(curDlg[0],curDlg[1],o)}catch(e){console.warn(e)}}}
// ───────── 大廳：異次元背包、等級上限 30 ─────────
{const _l=vrLobby;vrLobby=function(){const V=vrS();_l.apply(this,arguments);try{if(!V.cls||!curDlg||!String(curDlg[0]).includes('幻境'))return;const o=curDlg[2],i=o.findIndex(q=>String(q[0]).includes('背包'));o.splice(i+1,0,['🌀 異次元',vrStash().length+' 件',()=>vrStashView(0),0,1]);
 const d=o.find(q=>String(q[0]).startsWith('📜'));if(d&&vrDaily().q.some(q=>q.claim))d[0]='📜 每日 🔴';openDlg(curDlg[0],curDlg[1],o,0,'grid')}catch(e){console.warn(e)}}}
function vrStart(){const V=vrS();if((V.best||0)<5){closeDlg();return vrGame(1)}
 openDlg('⚔️ 選擇地區','',VCH.map((c,i)=>[`${['🌿','🌲','🌋'][i]} 第${'一二三'[i]}章・${c.n}`,`第 ${c.f0}～${c.f1} 層・建議 ${c.lv}`,()=>{closeDlg();vrGame(c.f0)},(V.best||0)<c.f0-1]).concat([['返回','',vrLobby]]))}
// ───────── 樹狀技能樹 ─────────
const VTICON={atk:'⚔️',elb:'🔮',heal:'💚',mpr:'💧',critM:'🎯',crit:'💥',psn:'☠️',spd:'👟',low:'🩸',aspd:'⚡',hp:'❤️',block:'🛡️',team:'🤝',dodge:'💨',ls:'🧛',def:'🪨'};
let VTSEL='sk';
function vrTreeView(){const V=vrS(),T=vrTree();if(!T.p)return vrTreePick();const p=vrPath(),C=vrCls(),pts=vrTPts(),R=k=>T.r[k]||0;
 const N={root:{x:50,y:5,ic:p.ic,n:p.n,mx:0},sk:{x:50,y:21,ic:p.ic,n:'［F］'+p.sk.n,mx:5,d:p.sk.d+'・每級傷害／效果 +30%'}};
 p.nodes.forEach((n,i)=>{const st=Object.keys(n[4])[0];N[n[0]]={x:[25,75,50][i],y:[39,39,56][i],ic:VTICON[st]||'✨',n:n[1],mx:n[2],lv:n[5],d:`現在：${n[3](R(n[0]))}<br>滿級：${n[3](n[2])}`}});
 N.cap={x:50,y:72,ic:'👑',n:p.cap[0],mx:1,lv:9,d:p.cap[1]};p.ults.forEach((u,i)=>N[i?'ub':'ua']={x:i?75:25,y:90,ic:u.ic,n:'［'+vrKeyLbl('g')+'］'+u.n,mx:1,lv:15,d:elTag(u.el)+' '+u.d+'<br><b>二選一</b>：選了就不能點另一個（洗點可以重選）',blk:!!T.r[i?'ua':'ub']});
 const E=[['root','sk'],['sk','p1'],['sk','p2'],['p1','p3'],['p2','p3'],['p3','cap'],['cap','ua'],['cap','ub']];
 const can=k=>{const n=N[k];return pts>0&&R(k)<n.mx&&V.lv>=(n.lv||0)&&!n.blk};
 const lines=E.map(([a,b])=>`<line x1="${N[a].x}" y1="${N[a].y+3}" x2="${N[b].x}" y2="${N[b].y-3}" stroke="${R(b)>0?'#ffc83a':'#8a7050'}" stroke-width="${R(b)>0?1.6:.9}" ${R(b)>0?'':'stroke-dasharray="1.6 1.2"'} vector-effect="non-scaling-stroke" style="stroke-width:${R(b)>0?4:2}px"/>`).join('');
 const nodes=Object.entries(N).map(([k,n])=>{const r=k=='root'?1:R(k),full=k=='root'||r>=n.mx,lock=k!='root'&&(V.lv<(n.lv||0)||n.blk),sel=VTSEL==k,c=can(k);
  return`<button data-tn="${k}" style="position:absolute;left:calc(${n.x}% - 27px);top:calc(${n.y}% - 27px);width:54px;height:54px;border-radius:50%;padding:0;cursor:pointer;font-size:24px;line-height:1;
   border:3px solid ${sel?'#fff':full?'#ffc83a':r>0?'#7ad0ff':'#8a7050'};background:${lock?'radial-gradient(#5a5048,#3a322c)':full?'radial-gradient(#ffe68a,#c8902a)':r>0?'radial-gradient(#9ae0ff,#3a7ab0)':'radial-gradient(#e8d8b8,#a8906a)'};
   box-shadow:${sel?'0 0 0 3px #ffc83a,':''}${c?'0 0 14px #fff6a0,':''}0 3px 0 #3a2a1a;filter:${lock?'grayscale(.8)':'none'};${c?'animation:tpulse 1.2s infinite;':''}">${n.ic}
   ${n.mx?`<span style="position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);font-size:10px;background:#2a1a0e;color:${full?'#ffc83a':'#fff'};border-radius:8px;padding:0 5px;white-space:nowrap">${r}/${n.mx}</span>`:''}</button>`}).join('');
 const s=N[VTSEL]||N.sk,sr=R(VTSEL),sc=can(VTSEL);
 const html=`<style>@keyframes tpulse{50%{transform:scale(1.08)}}</style><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:13px">屬性 ${elTag(p.el)}　技能點 <b style="color:#c0392b;font-size:16px">${pts}</b>　<span style="opacity:.75">Lv.5 起每級 +1（Lv.30 共 26 點）</span></div>
  <div style="position:relative;height:330px;margin:6px auto 2px;max-width:340px;background:radial-gradient(ellipse at 50% 40%,rgba(255,240,200,.35),rgba(0,0,0,0) 70%)"><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%">${lines}</svg>${nodes}</div>
  <div style="background:rgba(60,40,20,.12);border:2px solid #c8a070;border-radius:10px;padding:8px 10px;margin-top:6px"><b style="font-size:15px">${s.ic} ${s.n}</b>${s.mx?`　<span style="font-size:12px">等級 ${sr}/${s.mx}${s.lv&&V.lv<s.lv?`　🔒 Lv.${s.lv} 解鎖`:''}</span>`:''}<div style="font-size:13px;margin-top:3px">${s.d||p.d}</div>
  ${s.mx?`<button data-tadd="1" style="margin-top:6px;padding:6px 16px;border-radius:8px;border:2px solid ${sc?'#3a8a3a':'#888'};background:${sc?'#5ac85a':'#bbb'};color:#fff;font-weight:bold;cursor:${sc?'pointer':'default'}">${sr>=s.mx?'⭐ 已點滿':sc?'＋ 加 1 點':pts<=0?'沒有技能點':'還不能點'}</button>`:''}</div>`;
 openDlg('🌳 '+p.ic+p.n+'（'+C.n+'・'+p.role+'）',html,[['🔄 洗點（💠150）','',()=>{V.gold-=150;T.r={sk:1};SVDIRTY=1;vrTreeView()},V.gold<150],['🔀 換路線（💠400）','',()=>{V.gold-=400;T.p=null;T.r={};SVDIRTY=1;vrTreeView()},V.gold<400],['返回','',vrLobby]]);
 dbox.querySelectorAll('[data-tn]').forEach(b=>b.onclick=e=>{e.stopPropagation();VTSEL=b.dataset.tn=='root'?'sk':b.dataset.tn;vrTreeView()});
 const ab=dbox.querySelector('[data-tadd]');if(ab)ab.onclick=e=>{e.stopPropagation();if(!can(VTSEL))return;T.r[VTSEL]=R(VTSEL)+1;SVDIRTY=1;vrTreeView()}}
function vrTreePick(){const V=vrS(),C=vrCls(),T=vrTree(),PS=VTREE[V.cls];openDlg('🌳 '+C.ic+C.n+'・選擇進化方向',(V.lv<5?`<b>Lv.5</b> 才能選（現在 Lv.${V.lv}）。先看看兩條路：`:'選一條路！之後每升一級拿 1 點技能點。'),
  PS.map(p=>[`${p.ic} ${p.n}（${p.role}・${elTag(p.el)}）`,p.d+`<br>［F］<b>${p.sk.n}</b>・Lv.15 奧義：${p.ults.map(u=>u.ic+u.n).join(' / ')}`,()=>{T.p=p.k;T.r={sk:1};VTSEL='sk';SVDIRTY=1;toast(p.ic+' 走上「'+p.n+'」之路！');vrTreeView()},V.lv<5]).concat([['返回','',vrLobby]]))}
