/* ===== v3：遊藝場小遊戲（彈珠台・戰鬥陀螺・歡樂卡丁車 GP；皆為原創設計）===== */
let MG=null;
const GCOST={pachi:0,bey:0,kart:3,film:0};
function playGame(k,o){o=o||{};closeDlg();if(!o.free){if(st.coin<GCOST[k])return toast('遊戲幣不足');st.coin-=GCOST[k];hud()}
 MG=GAMES[k](o);MG.k=k;MG.o=o;MG.t=0;MG.done=0;MG.fl=0}
function quitGame(){if(!MG)return;const o=MG.o;MG=null;toast('離開遊戲');if(o.back)return o.back();if(o.bm)return o.free?churchMenu('sat2'):beyHub();o.free?churchMenu('sat2'):arcadeMenu()}
function gameOver(tix,title,msg){const g0=MG;g0.done=1;if(!g0.o.free){st.tix+=tix;st.cnt.arcade=(st.cnt.arcade||0)+1}fxApply({j:g0.o.free?8:6});hud();const k=g0.k,o=g0.o;
 setTimeout(()=>{MG=null;const can=o.free||st.coin>=GCOST[k];openDlg(title,msg+(o.free?'':`<br><br>🎟️ 獲得彩票 <b>+${tix}</b>　（合計 ${st.tix}）`),[[o.free?'再來一場':'再玩一次 '+(GCOST[k]?'（🪙'+GCOST[k]+'）':''),'',()=>playGame(k,o),!can],['返回','',()=>o.free?churchMenu('sat2'):arcadeMenu()]])},900)}
function mgFrame(dt){const g0=MG;g0.t+=dt;if(!g0.done)g0.up(dt);g.setTransform(K,0,0,K,0,0);g0.dr(g);
 g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,0,W,13);txt(g,g0.name+'　　C：離開',W/2,10,'#fff','bold 8px sans-serif')}
const GAMES={};
/* ─ 彈珠台 v3.2：投幣→倍率轉盤→得分洞跳動→公平彩票 ─
   得分 = 得分洞數字 × 倍率。彩票公式（公平機制）：每枚遊戲幣 ≈ round(√得分 ÷ 4)（上限 40），
   乘以投幣數；單日彈珠台彩票超過 240 張後減半；連續 2 局低於保底，下一局至少 3 張/枚。 */
const PMULT=[[1,28],[2,24],[3,18],[5,13],[8,8],[10,5],[20,2.5],[40,1.2],[100,.3]],
 PVAL=[[0,3],[5,5],[10,5],[20,4],[30,3],[50,2],[100,.8]];
function wpick(a){let t=0;a.forEach(x=>t+=x[1]);let r=Math.random()*t;for(const x of a){if((r-=x[1])<0)return x[0]}return a[0][0]}
function pachiTix(score,bet){const dk=T.year*40+T.day;if(st.pdk!=dk){st.pdk=dk;st.pdt=0}
 let per=Math.min(40,Math.round(Math.sqrt(score)/4)),pity=0;if((st.pmiss||0)>=2&&per<3){per=3;pity=1}if(per<1)per=1;
 let tix=per*bet,cap=0;if(st.pdt>=240){tix=Math.max(1,Math.floor(tix/2));cap=1}
 st.pmiss=per<=2?(st.pmiss||0)+1:0;st.pdt+=tix;return{tix,per,pity,cap}}
GAMES.pachi=o=>{const BX=150,BW=180,BY=18,BH=272,pegs=[],bump=[[BX+50,118],[BX+130,118],[BX+90,160]],R0=3.4,pw=BW/7;
 const pv=[0,0,0,0,0,0,0].map(()=>wpick(PVAL)),pt=pv.map(()=>Math.random()*.6);
 for(let r=0;r<10;r++){const y=BY+50+r*15+(r>5?20:0);for(let i=0;i<(r%2?9:10);i++){const x=BX+(r%2?18:9)+i*18;if(bump.some(b=>Math.hypot(b[0]-x,b[1]-y)<20))continue;pegs.push([x,y])}}
 const G={name:'🎰 彈珠台・幸運七洞',ph:'bet',bet:0,bt:0,mult:1,mshow:1,mt2:0,mlock:0,balls:[],left:5,score:0,aim:BX+BW/2,mt:0,pop:[],hit:bump.map(()=>0),
 lockMult(){G.mult=wpick(PMULT);G.mshow=G.mult;G.mlock=1;G.mt2=0;G.fl=1},
 up(dt){G.mt+=dt;
  if(G.ph=='bet'){if(G.bet>0){G.bt+=dt;if(G.bt>1.7){st.coin-=G.bet;hud();G.ph='mult';G.mt2=0;G.mlock=0}}return}
  if(G.ph=='mult'){G.mt2+=dt;if(!G.mlock){G.mshow=PMULT[Math.floor(G.mt*14)%PMULT.length][0];if(G.mt2>3)G.lockMult()}else if(G.mt2>1.2){G.ph='play'}return}
  pv.forEach((v,i)=>{pt[i]-=dt;if(pt[i]<=0){pv[i]=wpick(PVAL);pt[i]=.45+Math.random()*.6}});
  if(keys.left)G.aim-=110*dt;if(keys.right)G.aim+=110*dt;G.aim=Math.max(BX+10,Math.min(BX+BW-10,G.aim));
  G.balls.forEach(b=>{b.vy+=330*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.vx*=.999;
   if(b.x<BX+R0){b.x=BX+R0;b.vx=Math.abs(b.vx)*.6}if(b.x>BX+BW-R0){b.x=BX+BW-R0;b.vx=-Math.abs(b.vx)*.6}
   pegs.forEach(p=>{const dx=b.x-p[0],dy=b.y-p[1],d=Math.hypot(dx,dy);if(d<R0+2&&d>.01){const nx=dx/d,ny=dy/d,vn=b.vx*nx+b.vy*ny;if(vn<0){b.vx-=1.55*vn*nx;b.vy-=1.55*vn*ny;b.vx+=(Math.random()-.5)*14;b.x=p[0]+nx*(R0+2.05);b.y=p[1]+ny*(R0+2.05)}}});
   bump.forEach((p,i)=>{const dx=b.x-p[0],dy=b.y-p[1],d=Math.hypot(dx,dy);if(d<R0+8&&d>.01){const nx=dx/d,ny=dy/d;b.vx=nx*190;b.vy=ny*190;b.x=p[0]+nx*(R0+8.1);b.y=p[1]+ny*(R0+8.1);G.hit[i]=.25}});
   if(b.y>BY+BH-26){const i=Math.max(0,Math.min(6,Math.floor((b.x-BX)/pw))),v=pv[i],sc=v*G.mult;b.dead=1;G.score+=sc;G.pop.push({x:BX+i*pw+pw/2,y:BY+BH-34,s:v+'×'+G.mult+'='+sc,t:0,big:sc>=1000});if(sc>=500)G.fl=1}});
  G.balls=G.balls.filter(b=>!b.dead);G.hit=G.hit.map(h=>Math.max(0,h-dt));G.pop.forEach(p=>p.t+=dt);G.pop=G.pop.filter(p=>p.t<1.2);
  if(!G.left&&!G.balls.length&&!G.done){const r=pachiTix(G.score,G.bet);
   gameOver(r.tix,'🎰 結算',`投幣 <b>${G.bet}</b>　倍率 <b>×${G.mult}</b><br>本局得分 <b>${G.score}</b><br><span style="opacity:.8">每枚幣 ${r.per} 張 × ${G.bet} 枚${r.pity?'（保底補助）':''}${r.cap?'（今日已超過 240 張，減半）':''}</span>`)}},
 press(){if(G.done)return;
  if(G.ph=='bet'){if(G.bet<10&&st.coin>G.bet){G.bet++;G.bt=0}else if(st.coin<=G.bet&&G.bet<10)toast('遊戲幣不足');return}
  if(G.ph=='mult'){if(!G.mlock&&G.mt2>.4)G.lockMult();return}
  if(G.ph=='play'&&G.left>0&&G.balls.length<2){G.left--;G.balls.push({x:G.aim,y:BY+8,vx:Math.sin(G.mt*3.1)*55,vy:20})}},
 dr(c){const gr=c.createLinearGradient(0,0,0,300);gr.addColorStop(0,'#2a1050');gr.addColorStop(1,'#10082a');c.fillStyle=gr;c.fillRect(0,0,W,H);
  for(let i=0;i<24;i++){c.fillStyle=`hsla(${i*40+G.t*50},90%,60%,.35)`;c.fillRect(8+(i%2)*430,20+Math.floor(i/2)*22,32,6)}
  c.fillStyle='#f6ecc8';RR(c,BX-5,BY-4,BW+10,BH+8,6);c.fill();c.fillStyle='#143a66';c.fillRect(BX,BY,BW,BH);
  txt(c,'LUCKY 7',BX+BW/2,BY+34,`hsl(${G.t*120%360},90%,70%)`,'bold 16px sans-serif');
  c.fillStyle='#e8e8f0';pegs.forEach(p=>{c.beginPath();c.arc(p[0],p[1],1.8,0,7);c.fill()});
  bump.forEach((p,i)=>{c.fillStyle=G.hit[i]>0?'#fff':'#ff4aa0';c.beginPath();c.arc(p[0],p[1],8,0,7);c.fill();c.strokeStyle='#ffd84a';c.lineWidth=1.5;c.stroke()});
  for(let i=0;i<7;i++){const x=BX+i*pw,v=pv[i],hot=v>=50;c.fillStyle=hot?'#ffd84a':v==0?'#5a2a3a':['#3a6ab8','#2a8a6a'][i%2];c.fillRect(x+1,BY+BH-24,pw-2,22);txt(c,v,x+pw/2,BY+BH-9,hot?'#7a2a00':'#fff','bold 10px sans-serif');c.fillStyle='#e8e8f0';c.fillRect(x-1,BY+BH-30,2,8)}
  if(G.ph=='play'){c.fillStyle='#ffd84a';c.beginPath();c.moveTo(G.aim-6,BY-3);c.lineTo(G.aim+6,BY-3);c.lineTo(G.aim,BY+6);c.fill()}
  G.balls.forEach(b=>{const r=c.createRadialGradient(b.x-1,b.y-1,.5,b.x,b.y,R0);r.addColorStop(0,'#fff');r.addColorStop(1,'#9aa6b8');c.fillStyle=r;c.beginPath();c.arc(b.x,b.y,R0,0,7);c.fill()});
  G.pop.forEach(p=>txt(c,p.s,p.x,p.y-p.t*26,`rgba(255,240,120,${Math.max(0,1.2-p.t)})`,(p.big?'bold 14px':'bold 9px')+' sans-serif'));
  // 左：倍率轉盤
  c.fillStyle='rgba(0,0,0,.5)';c.fillRect(8,40,126,86);txt(c,'倍率',71,55,'#ffd84a','bold 9px sans-serif');
  const hue=G.mlock?50:G.t*600%360;c.fillStyle=G.ph=='bet'?'#333':`hsl(${hue},80%,${G.mlock?55:40}%)`;c.fillRect(18,62,106,44);
  txt(c,G.ph=='bet'?'？':'×'+G.mshow,71,95,'#fff','bold 30px sans-serif');
  txt(c,G.ph=='mult'&&!G.mlock?'按 A 停下！':G.mlock?'鎖定！':'',71,119,'#ffd84a','bold 9px sans-serif');
  // 左下：得分
  c.fillStyle='rgba(0,0,0,.4)';c.fillRect(8,230,126,60);txt(c,'得分',71,246,'#ffd84a','bold 9px sans-serif');txt(c,G.score,71,268,'#fff','bold 20px sans-serif');
  c.fillStyle='rgba(0,0,0,.4)';c.fillRect(346,230,126,60);txt(c,'剩餘鋼珠',409,246,'#ffd84a','bold 9px sans-serif');for(let i=0;i<G.left;i++){c.fillStyle='#cfd6e2';c.beginPath();c.arc(375+i*14,268,5,0,7);c.fill()}
  c.fillStyle='rgba(0,0,0,.4)';c.fillRect(346,40,126,60);txt(c,'投入遊戲幣',409,55,'#ffd84a','bold 9px sans-serif');txt(c,'🪙 '+G.bet,409,80,'#fff','bold 18px sans-serif');
  c.fillStyle='rgba(0,0,0,.4)';c.fillRect(346,106,126,50);txt(c,'目前持有',409,121,'#ffd84a','bold 9px sans-serif');txt(c,'🪙 '+(st.coin-(G.ph=='bet'?0:0)),409,142,'#fff','bold 14px sans-serif');
  if(G.ph=='bet'){c.fillStyle='rgba(0,0,0,.7)';c.fillRect(150,120,180,70);txt(c,'投幣階段',240,138,'#ffd84a','bold 11px sans-serif');
   txt(c,G.bet?'再按 A 追加（最多10枚）':'按 A 投入遊戲幣',240,155,'#fff','9px sans-serif');
   if(G.bet){c.fillStyle='#333';c.fillRect(170,168,140,6);c.fillStyle='#4ac86a';c.fillRect(170,168,140*Math.min(1,G.bt/1.7),6);txt(c,'停手後自動確定',240,184,'#ffffffaa','8px sans-serif')}}
  if(G.ph=='mult'&&G.mlock){c.fillStyle=`rgba(255,255,255,${.4*Math.max(0,1.2-G.mt2)})`;c.fillRect(0,0,W,H)}
  txt(c,G.ph=='play'?'←→ 移動投珠點　A：投珠':'A：投幣／停止倍率',W/2,296,'#ffffffcc','8px sans-serif')}};return G};
/* ─ 戰鬥陀螺 X（參考 BEYBLADE X 世代規則的原創版本）─
   ★★ 遊戲精髓：正規賽需登錄「3 顆」陀螺，每顆陀螺一場比賽只能出戰一次！
   每顆陀螺 = 刀鋒 + 棘輪 + 軸心（三件零件），實體零件不能共用，所以要買齊 3 套、並依對手搭配出場順序。
   得分：轉停(Spin)=1　爆裂(Burst)=2　場外兩側洞(Over)=2　極限(Xtreme，上下窄縫)=3；先取 4 分獲勝。 */
const BLD={b1:{n:'均衡刃',atk:1,sta:1,def:1,p:30,c:'#ffd84a',d:'攻守耐力均衡'},b2:{n:'炎龍刃',atk:1.35,sta:.85,def:.8,p:60,c:'#ff5a3a',d:'攻擊型：撞擊強，但耐力低、易爆裂'},b3:{n:'鋼盾刃',atk:.8,sta:1,def:1.4,p:60,c:'#8aa0c0',d:'防禦型：不易爆裂'},b4:{n:'長旋刃',atk:.8,sta:1.4,def:1,p:70,c:'#5ad08a',d:'耐力型：轉很久'}},
 RAT={r1:{n:'3-60',br:1,spd:1.05,p:25,d:'輕巧，加速快'},r2:{n:'4-70',br:1.25,spd:.95,p:40,d:'爆裂抗性＋25%'},r3:{n:'5-80',br:1.5,spd:.88,p:55,d:'爆裂抗性＋50%，較笨重'}},
 BIT={bF:{n:'平底F',spd:1.25,sta:.85,def:1,p:25,d:'衝得快、掉轉快'},bN:{n:'針尖N',spd:.9,sta:1.3,def:1,p:30,d:'耐久，轉很久'},bB:{n:'球形B',spd:1.05,sta:1.05,def:1.1,p:30,d:'穩定防禦'}};
const PCAT={b:['刀鋒',BLD],r:['棘輪',RAT],t:['軸心',BIT]};
function partOf(id){return BLD[id]||RAT[id]||BIT[id]}
function BS(){if(!st.parts){st.parts={b1:1,r1:1,bF:1};st.deck=[['b1','r1','bF'],null,null]}return st}
function mkTop(a){const bl=BLD[a[0]],ra=RAT[a[1]],bi=BIT[a[2]];return{ids:a,nm:bl.n+'・'+ra.n+bi.n.slice(-1),bl,ra,bi,sp:Math.round(100*bl.sta*bi.sta),atk:bl.atk,acc:520*ra.spd*bi.spd,bmx:Math.round(75*ra.br*bl.def*bi.def),c:bl.c}}
function topInfo(t){return `攻${'★'.repeat(Math.round(t.atk*3))} 耐${t.sp} 爆裂抗性${t.bmx} 速${Math.round(t.acc/52)}`}
function deckTops(){BS();return st.deck.map(d=>d&&d.every(x=>x)?mkTop(d):null)}
function partsLeft(id,exclSlot,exclCat){let n=st.parts[id]||0;st.deck.forEach((d,s)=>{if(!d)return;d.forEach((x,ci)=>{if(x==id&&!(s==exclSlot&&ci==exclCat))n--})});return n}
const BM={};
function beyRules(){openDlg('📖 戰鬥陀螺 X 規則書',`<b>得分</b><br>・轉停（對手停止旋轉）＝ <b>1 分</b><br>・爆裂（對手爆裂量表歸零）＝ <b>2 分</b><br>・場外（打進擂台左右兩側的洞）＝ <b>2 分</b><br>・極限（打進擂台上下窄縫）＝ <b>3 分</b>　※窄縫很窄，要瞄準<br><br><b>正規賽</b>：先取 <b>4 分</b>獲勝。<br>⚠️ 要先<b>登錄 3 顆陀螺</b>，每顆陀螺<b>整場只能出戰一次</b>——三顆打完還沒人 4 分，就比總分。<br>陀螺＝刀鋒＋棘輪＋軸心，零件是實體，不能一件拿去裝兩顆。到「陀螺零件專賣」買齊 3 套，再到「組裝登錄」配好。<br><br><b>練習賽</b>：用 1 顆陀螺，先取 2 分，可重複出戰，獎勵少。<br><br>💡 戰術：攻擊型先出、耐力型壓軸，看對手出什麼再決定。`,[['返回','',beyHub]])}
function beyHub(){BS();const tp=deckTops(),ok=tp.every(x=>x),one=tp.find(x=>x),deckTxt=tp.map((t,i)=>`${i+1}. ${t?t.nm:'（空）'}`).join('<br>');
 openDlg('🌀 戰鬥陀螺 X 專區',`已登錄陀螺：<br>${deckTxt}<br><br>${ok?'✅ 可參加正規賽':'⚠️ 正規賽需登錄 3 顆陀螺（目前 '+tp.filter(x=>x).length+' 顆）'}`,[
  ['⚔️ 正規賽（🪙3）','3 顆陀螺・先取 4 分・彩票獎勵豐富',()=>beyStart('off'),!ok||st.coin<3],
  ['🎯 練習賽（🪙1）','1 顆陀螺・先取 2 分',()=>beyStart('pra'),!one||st.coin<1],
  ['🔧 組裝・登錄陀螺','選刀鋒／棘輪／軸心',beyDeck],
  ['🛒 陀螺零件專賣','用現金購買零件',partShop],
  ['📖 比賽規則書','得分方式與 3 顆陀螺規定',beyRules],
  ['返回','',arcadeMenu]])}
function partShop(){BS();const o=[];for(const c in PCAT)for(const id in PCAT[c][1]){const p=PCAT[c][1][id];o.push([`${PCAT[c][0]}｜${p.n}　💰${p.p}（持有 ${st.parts[id]||0}）`,p.d,()=>{if(st.money<p.p)return;st.money-=p.p;st.parts[id]=(st.parts[id]||0)+1;hud();toast('🛒 購買：'+p.n);partShop()},st.money<p.p])}
 o.push(['返回','',beyHub]);openDlg('🛒 陀螺零件專賣',`💰 ${st.money}　（3 顆陀螺需要 3 刀鋒＋3 棘輪＋3 軸心）`,o)}
function beyDeck(){BS();const o=st.deck.map((d,i)=>{const t=d&&d.every(x=>x)?mkTop(d):null;return[`第 ${i+1} 顆：${t?t.nm:(d?'（未完成）':'（空）')}`,t?topInfo(t):'點選以組裝',()=>beySlot(i)]});o.push(['返回','',beyHub]);openDlg('🔧 組裝・登錄陀螺','登錄 3 顆，正規賽每顆只能出戰一次',o)}
function beySlot(s){const d=st.deck[s]||[null,null,null],o=[];['b','r','t'].forEach((c,ci)=>{const cur=d[ci];o.push([`${PCAT[c][0]}：${cur?partOf(cur).n:'（未選）'}`,'更換',()=>bePart(s,ci)])});
 o.push(['🗑️ 清空這顆','',()=>{st.deck[s]=null;beyDeck()}]);o.push(['返回','',beyDeck]);const t=d.every(x=>x)?mkTop(d):null;openDlg(`第 ${s+1} 顆陀螺`,t?`${t.nm}<br>${topInfo(t)}`:'請依序選好三種零件',o)}
function bePart(s,ci){const c='brt'[ci],o=[];for(const id in PCAT[c][1]){const p=PCAT[c][1][id],left=partsLeft(id,s,ci);o.push([`${p.n}（可用 ${left}）`,p.d,()=>{const d=st.deck[s]||[null,null,null];d[ci]=id;st.deck[s]=d;beySlot(s)},left<=0])}
 o.push(['返回','',()=>beySlot(s)]);openDlg(PCAT[c][0]+'選擇','沒有可用數量時請去專賣店買',o)}
function enemyTop(){const b=Object.keys(BLD),r=Object.keys(RAT),t=Object.keys(BIT),p=a=>a[Math.floor(Math.random()*a.length)];return mkTop([p(b),p(r),p(t)])}
function beyStart(mode){BS();BM.mode=mode;BM.pts=[0,0];BM.rd=0;BM.tgt=mode=='off'?4:2;BM.eu=[0,0,0];BM.pu=[0,0,0];
 if(mode=='off'){if(st.coin<3)return;st.coin-=3;hud();BM.deck=deckTops()}
 else if(mode=='pra'){if(st.coin<1)return;st.coin-=1;hud();BM.deck=[deckTops().find(x=>x)]}
 else BM.deck=[mkTop(['b1','r1','bF']),mkTop(['b1','r1','bF']),mkTop(['b1','r1','bF'])];
 BM.ed=[enemyTop(),enemyTop(),enemyTop()];beyPick()}
function beyPick(){const B=BM,o=[];B.deck.forEach((t,i)=>{const used=B.mode!='pra'&&B.pu[i];o.push([`${t.nm}${used?'（已出戰）':''}`,topInfo(t),()=>beyRound(i),used])});
 if(B.mode=='pra'||B.deck.length==1)return beyRound(0);
 o.push(['離開比賽','',()=>B.mode=='free'?churchMenu('sat2'):beyHub()]);
 openDlg(`第 ${B.rd+1} 局：選擇出戰陀螺`,`比分　你 <b>${B.pts[0]}</b> : <b>${B.pts[1]}</b> 對手（先取 ${B.tgt} 分）<br>對手尚有 ${3-B.eu.reduce((a,b)=>a+b,0)} 顆陀螺`,o)}
function beyRound(i){const B=BM;closeDlg();if(B.mode!='pra')B.pu[i]=1;const un=[0,1,2].filter(k=>!B.eu[k]),ei=un[Math.floor(Math.random()*un.length)];if(B.mode!='pra')B.eu[ei]=1;
 MG=GAMES.bey({free:B.mode=='free',bm:1,pt:B.deck[i],et:B.ed[ei]});MG.k='bey';MG.o={free:B.mode=='free',bm:1};MG.t=0;MG.done=0;MG.fl=0}
const HOWN={spin:'轉停',burst:'爆裂',over:'場外（側洞）',xtreme:'極限（窄縫）'};
function beyEnd(r){const g0=MG;if(g0.done)return;g0.done=1;fxApply({j:3});
 setTimeout(()=>{MG=null;const B=BM;B.rd++;if(r.w=='p')B.pts[0]+=r.pts;else if(r.w=='e')B.pts[1]+=r.pts;
  const sc=`比分　你 <b>${B.pts[0]}</b> : <b>${B.pts[1]}</b> 對手`;
  const left=B.mode=='pra'?1:B.pu.filter(x=>!x).length,over=B.pts[0]>=B.tgt||B.pts[1]>=B.tgt||(B.mode!='pra'&&left==0);
  const head=!r.w?'🤝 這局平手（無得分）':r.w=='p'?`🏆 ${HOWN[r.how]}勝利！＋${r.pts} 分`:`💥 對手以${HOWN[r.how]}得 ${r.pts} 分`;
  if(!over)return openDlg(head,sc+(left?`<br>你還有 ${left} 顆陀螺可出戰`:''),[['下一局','',beyPick]]);
  const w=B.pts[0]>B.pts[1]?'win':B.pts[0]<B.pts[1]?'lose':'draw',mg=Math.abs(B.pts[0]-B.pts[1]);let tx=0;
  if(B.mode=='off')tx=w=='win'?40+mg*8:w=='draw'?15:6;else if(B.mode=='pra')tx=w=='win'?12:w=='draw'?5:2;
  if(B.mode!='free'){st.tix+=tx;st.cnt.arcade=(st.cnt.arcade||0)+1;if(w=='win')st.cnt.win=(st.cnt.win||0)+1}hud();
  openDlg(w=='win'?'🏆 比賽獲勝！':w=='draw'?'🤝 比賽平手':'😢 比賽落敗',`${head}<br>${sc}${B.mode=='free'?'':`<br><br>🎟️ 獲得彩票 <b>+${tx}</b>（合計 ${st.tix}）`}`,[B.mode=='free'?['再來一場','',()=>beyStart('free')]:['再比一場','',()=>beyHub()],['返回','',()=>B.mode=='free'?churchMenu('sat2'):beyHub()]])},900)}
GAMES.bey=o=>{const CX=240,CY=158,RD=118,bonus=(st.inv.topx||0)>0&&!o.free,pt=o.pt,et=o.et,
 mk=(x,y,t,c1,c2,b)=>({x,y,vx:0,vy:0,sp:t.sp*(b?1.1:1),mx:t.sp*(b?1.1:1),bst:t.bmx,bmx:t.bmx,atk:t.atk*(b?1.15:1),acc:t.acc,c1,c2,a:0,cd:0,nm:t.nm}),
 P=mk(CX-60,CY+30,pt,pt.c,'#fff',bonus),E=mk(CX+62,CY-26,et,et.c,'#3a2a5a',0),sp=[],ang=t=>Math.atan2(t.y-CY,t.x-CX);
 window.__bd={P,E};const isSide=(dx,d)=>Math.abs(dx/d)>.866,isX=(dy,d)=>Math.abs(dy/d)>.975;
 const G={name:'🌀 戰鬥陀螺 X・颶風擂台'+(o.free?'（友誼賽）':''),cd:3,
 up(dt){if(G.cd>0){G.cd-=dt;return}
  let ax=(keys.right?1:0)-(keys.left?1:0),ay=(keys.down?1:0)-(keys.up?1:0);if(ax&&ay){ax*=.707;ay*=.707}
  P.vx+=ax*P.acc*dt;P.vy+=ay*P.acc*dt;
  const dx=P.x-E.x,dy=P.y-E.y,dd=Math.hypot(dx,dy)||1,tw=Math.sin(G.t*1.3)*40,ea=E.acc/520;
  E.vx+=(dx/dd*300*ea+(-dy/dd)*tw)*dt;E.vy+=(dy/dd*300*ea+(dx/dd)*tw)*dt;E.cd-=dt;if(E.cd<=0&&dd<95){E.cd=1.6+Math.random()*1.2;E.vx+=dx/dd*230;E.vy+=dy/dd*230}
  P.cd-=dt;
  [P,E].forEach(t=>{const cx=CX-t.x,cy=CY-t.y,dc=Math.hypot(cx,cy);t.vx+=cx*1.1*dt*(dc/RD+.3);t.vy+=cy*1.1*dt*(dc/RD+.3);t.vx*=Math.pow(.14,dt);t.vy*=Math.pow(.14,dt);t.x+=t.vx*dt;t.y+=t.vy*dt;t.sp-=(3.2+Math.hypot(t.vx,t.vy)*.012)*dt;t.a+=(t.sp/100*30+4)*dt;
   const ox=t.x-CX,oy=t.y-CY,d=Math.hypot(ox,oy);t.out=0;
   if(d>RD-10){if(isSide(ox,d)){if(d>RD+6)t.out='over'}else if(isX(oy,d)){if(d>RD+6)t.out='xtreme'}else{const nx=ox/d,ny=oy/d,vn=t.vx*nx+t.vy*ny;t.x=CX+nx*(RD-10);t.y=CY+ny*(RD-10);if(vn>0){t.vx-=1.7*vn*nx;t.vy-=1.7*vn*ny;t.sp-=1.2}}}});
  const ex=E.x-P.x,ey=E.y-P.y,ed=Math.hypot(ex,ey);G.hc=(G.hc||0)-dt;let bp=0,be=0;
  if(ed<22&&ed>.1&&G.hc<=0){G.hc=.45;const nx=ex/ed,ny=ey/ed,rv=(P.vx-E.vx)*nx+(P.vy-E.vy)*ny;if(rv>-30){const f=Math.min(110,34+Math.abs(rv)*.3);P.vx=P.vx*.3-nx*f*E.atk;P.vy=P.vy*.3-ny*f*E.atk;E.vx=E.vx*.3+nx*f*P.atk;E.vy=E.vy*.3+ny*f*P.atk;
    const q=Math.min(13,4+Math.abs(rv)*.04),qb=6+Math.min(8,Math.abs(rv)*.05);P.sp-=q*E.atk*(.8+Math.random()*.4);E.sp-=q*P.atk*(.8+Math.random()*.4);const ps=Math.hypot(P.vx,P.vy)+25,es=Math.hypot(E.vx,E.vy)+25;P.bst-=qb*E.atk*2*es/(ps+es)*(.8+Math.random()*.4);E.bst-=qb*P.atk*2*ps/(ps+es)*(.8+Math.random()*.4);
    G.fl=.6;for(let i=0;i<10;i++)sp.push({x:(P.x+E.x)/2,y:(P.y+E.y)/2,vx:(Math.random()-.5)*180,vy:(Math.random()-.5)*180,t:0})}}
  else if(ed<22&&ed>.1){const m=(22-ed)/2;P.x-=ex/ed*m;P.y-=ey/ed*m;E.x+=ex/ed*m;E.y+=ey/ed*m}
  sp.forEach(s=>{s.x+=s.vx*dt;s.y+=s.vy*dt;s.t+=dt});while(sp.length&&sp[0].t>.4)sp.shift();
  let r=null;const PTS={spin:1,burst:2,over:2,xtreme:3};
  if(P.out&&E.out)r={w:null};else if(E.out)r={w:'p',how:E.out};else if(P.out)r={w:'e',how:P.out};
  else if(P.bst<=0&&E.bst<=0)r={w:P.bst<E.bst?'e':'p',how:'burst'};else if(E.bst<=0)r={w:'p',how:'burst'};else if(P.bst<=0)r={w:'e',how:'burst'};
  else if(E.sp<=0&&P.sp<=0)r={w:null};else if(E.sp<=0)r={w:'p',how:'spin'};else if(P.sp<=0)r={w:'e',how:'spin'};
  else if(G.t>55)r={w:P.sp>=E.sp?'p':'e',how:'spin'};
  if(r&&!G.done){r.pts=r.w?PTS[r.how]:0;G.res=r;beyEnd(r)}},
 press(){if(G.cd>0||P.cd>0)return;P.cd=1.1;const ax=(keys.right?1:0)-(keys.left?1:0),ay=(keys.down?1:0)-(keys.up?1:0),m=Math.hypot(ax,ay);let nx,ny;if(m){nx=ax/m;ny=ay/m}else{const dx=E.x-P.x,dy=E.y-P.y,d=Math.hypot(dx,dy)||1;nx=dx/d;ny=dy/d}P.vx+=nx*310;P.vy+=ny*310},
 dr(c){c.fillStyle='#1c1430';c.fillRect(0,0,W,H);const bg=c.createRadialGradient(CX,CY,10,CX,CY,200);bg.addColorStop(0,'#3a2a6a');bg.addColorStop(1,'#120c24');c.fillStyle=bg;c.fillRect(0,13,W,H);
  c.fillStyle='#2a2f3c';c.beginPath();c.ellipse(CX,CY+12,RD+14,RD*.98+10,0,0,7);c.fill();
  const dg=c.createRadialGradient(CX-20,CY-24,10,CX,CY,RD+6);dg.addColorStop(0,'#cfd8e8');dg.addColorStop(.6,'#8a96ae');dg.addColorStop(1,'#4a5670');c.fillStyle=dg;c.beginPath();c.arc(CX,CY,RD+6,0,7);c.fill();
  c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1;for(let r=30;r<RD-10;r+=30){c.beginPath();c.arc(CX,CY,r,0,7);c.stroke()}
  const D=Math.PI/180,wall=(a,b)=>{c.beginPath();c.arc(CX,CY,RD,a*D,b*D);c.stroke()};c.lineWidth=9;c.strokeStyle='#e8ecf4';[[30,77.2],[102.8,150],[210,257.2],[282.8,330]].forEach(x=>wall(x[0],x[1]));
  c.lineWidth=2;c.strokeStyle='#8a94aa';[[30,77.2],[102.8,150],[210,257.2],[282.8,330]].forEach(x=>{c.beginPath();c.arc(CX,CY,RD+4,x[0]*D,x[1]*D);c.stroke()});
  c.fillStyle='#0a0614';[[-30,30],[150,210]].forEach(x=>{c.beginPath();c.arc(CX,CY,RD+7,x[0]*D,x[1]*D);c.arc(CX,CY,RD-9,x[1]*D,x[0]*D,true);c.fill()});
  c.fillStyle='#ffd84a';[[77.2,102.8],[257.2,282.8]].forEach(x=>{c.beginPath();c.arc(CX,CY,RD+7,x[0]*D,x[1]*D);c.arc(CX,CY,RD-9,x[1]*D,x[0]*D,true);c.fill()});
  txt(c,'OVER 2',CX-RD-22,CY+3,'#ff8a8a','bold 8px sans-serif');txt(c,'OVER 2',CX+RD+22,CY+3,'#ff8a8a','bold 8px sans-serif');txt(c,'XTREME 3',CX,CY-RD-9,'#ffd84a','bold 8px sans-serif');txt(c,'XTREME 3',CX,CY+RD+16,'#ffd84a','bold 8px sans-serif');
  const dt2=(t)=>{const r=11,x=t.x,y=t.y;c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+2,y+r*.7,r+1,r*.55,0,0,7);c.fill();
   beyX(c,x,y,r,t.c1,t.c2,t.a)};
  dt2(E);dt2(P);sp.forEach(s=>{c.fillStyle=`rgba(255,${200-s.t*300|0},60,${1-s.t*2.5})`;c.fillRect(s.x,s.y,2,2)});
  const bar=(x,t,lb,col)=>{c.fillStyle='rgba(0,0,0,.55)';c.fillRect(x,18,150,34);txt(c,lb,x+75,28,'#fff','bold 8px sans-serif');c.fillStyle='#333';c.fillRect(x+8,32,134,5);c.fillStyle=col;c.fillRect(x+8,32,134*Math.max(0,t.sp)/t.mx,5);c.fillStyle='#333';c.fillRect(x+8,41,134,5);c.fillStyle='#ff9a2a';c.fillRect(x+8,41,134*Math.max(0,t.bst)/t.bmx,5)};
  bar(4,P,P.nm+(bonus?'★':''),'#5ae07a');bar(326,E,'對手 '+E.nm,'#4a9aff');
  const B=BM;if(o.bm)txt(c,`你 ${B.pts[0]} : ${B.pts[1]} 對手　（先取 ${B.tgt} 分）`,CX,H-14,'#ffd84a','bold 9px sans-serif');
  txt(c,'綠＝旋轉　橘＝爆裂量表',CX,60,'#ffffff88','7px sans-serif');
  if(G.cd>0){txt(c,Math.ceil(G.cd)>0?Math.ceil(G.cd)+'':'',CX,CY+10,'#fff','bold 54px sans-serif');txt(c,'3、2、1…Let it rip！',CX,CY+36,'#ffd84a','bold 12px sans-serif')}
  if(G.fl>0){c.fillStyle=`rgba(255,255,255,${G.fl*.5})`;c.fillRect(0,0,W,H);G.fl-=.05}
  if(G.res){const r=G.res;txt(c,r.w?(HOWN[r.how]+'！ +'+r.pts):'平手',CX,CY+8,r.w=='p'?'#ffd84a':'#ff8a8a','bold 22px sans-serif')}
  txt(c,'方向鍵：移動　A：衝刺撞擊',W/2,H-3,'#ffffffcc','8px sans-serif')}};return G};
/* ─ 歡樂卡丁車 GP（偽 3D 賽道）─ */
GAMES.kart=o=>{const HZ=104,SEG=[[200,0],[120,.8],[100,0],[140,-.9],[80,0],[160,.6],[90,-.6],[120,0],[200,.9],[100,0],[150,-.8],[140,0]],LAP=SEG.reduce((a,s)=>a+s[0],0),LAPS=3,MAXV=62;
 const cur=z=>{z=((z%LAP)+LAP)%LAP;let a=0;for(const s of SEG){if(z<a+s[0])return s[1]*Math.min(1,Math.min(z-a,a+s[0]-z)/25+.0);a+=s[0]}return 0};
 const pads=[300,780,1250],AIC=[['#e04040','#ffd0d0'],['#3a8ae8','#d0e4ff'],['#2ea860','#d0f4dc'],['#e8b020','#fff0c0'],['#a050d0','#ecd8ff']],
 ai=AIC.map((c,i)=>({z:-(i+1)*22,x:(i%2?.45:-.45)*(1+(i%3)*.3),v:0,top:50+i*1.3+Math.random()*2,c,fin:0,lane:(i%2?.5:-.5)}));
 const G={name:'🏎️ 歡樂卡丁車 GP',z:0,px:0,v:0,cd:3.2,boost:0,nit:2,lap:0,fin:0,shake:0,place:6,tm:0,off:0,
 up(dt){const racing=G.cd<=0;G.cd-=dt;
  if(racing&&!G.fin){G.tm+=dt;const st2=(keys.right?1:0)-(keys.left?1:0);G.px+=st2*dt*(.5+G.v/MAXV*1.5);G.px-=cur(G.z)*Math.pow(G.v/MAXV,2)*dt*1.5;
   const mx=MAXV*(G.boost>0?1.35:1)*(Math.abs(G.px)>1.05?.5:1);G.v+=(keys.down?-60:(G.v<mx?32:-40))*dt;if(G.v>mx)G.v-=70*dt;G.v=Math.max(0,G.v);G.boost=Math.max(0,G.boost-dt);
   pads.forEach(pz=>{const d=((G.z-pz)%LAP+LAP)%LAP;if(d<G.v*dt+2&&Math.abs(G.px)<.7){G.boost=1.2}});
   G.px=Math.max(-1.6,Math.min(1.6,G.px));
   const zn=G.z+G.v*dt;if(Math.floor(zn/LAP)>Math.floor(G.z/LAP)){G.lap++;if(G.lap>=LAPS){G.fin=1;const r=1+ai.filter(a=>a.fin).length;G.place=r;
     const tx=[0,45,32,22,14,8,4][r];gameOver(o.free?0:tx,r==1?'🏆 冠軍！':'🏁 完賽',`第 <b>${r}</b> 名　時間 ${G.tm.toFixed(1)} 秒`)}}G.z=zn}
  ai.forEach((a,i)=>{if(a.fin)return;if(racing){const rb=(G.z-a.z)*.012,tv=a.top+Math.max(-4,Math.min(5,rb))-(Math.abs(cur(a.z))*5);a.v+=(tv-a.v)*Math.min(1,dt*1.2);a.z+=a.v*dt;a.x+=((a.lane+Math.sin(G.t*.7+i*2)*.25)-a.x)*dt*1.5;
   const dz=((a.z-G.z+LAP/2)%LAP+LAP)%LAP-LAP/2;if(Math.abs(dz)<3&&Math.abs(a.x-G.px)<.28&&!G.fin){G.v*=.97;G.shake=.2;a.v*=.98}
   if(a.z>=LAPS*LAP){a.fin=G.t}}});
  G.shake=Math.max(0,G.shake-dt);
  const prog=[G.z,...ai.map(a=>a.z)];G.place=G.fin?G.place:1+ai.filter(a=>a.z>G.z).length;G.off+=dt},
 press(){if(G.cd>0||G.fin)return;if(G.nit>0){G.nit--;G.boost=1.6}},
 dr(c){const sk=c.createLinearGradient(0,0,0,HZ);sk.addColorStop(0,'#3a7ae0');sk.addColorStop(1,'#bfe4ff');c.fillStyle=sk;c.fillRect(0,0,W,HZ);
  c.fillStyle='#ffe88a';c.beginPath();c.arc(380,52,16,0,7);c.fill();
  const cv0=cur(G.z+160),sh=-cv0*40-G.px*18;c.fillStyle='#6a8ab8';for(let i=-1;i<7;i++){const x=sh+i*90;c.beginPath();c.moveTo(x-60,HZ);c.lineTo(x,HZ-34-((i*37)%5)*6);c.lineTo(x+70,HZ);c.fill()}
  c.fillStyle='#3a9a58';for(let i=-1;i<9;i++){const x=sh*1.6+i*64;c.beginPath();c.arc(x,HZ+6,26,Math.PI,0);c.fill()}
  const cen=[],rw=[];let off=0;const cd=G.cd>0?0:1;
  for(let y=H-1;y>HZ;y--){const s=1/(y-HZ),zw=G.z+s*2200;off+=cur(zw)*.55;cen[y]=W/2+off*(1)-G.px*(y-HZ)*1.15+(G.shake>0?(Math.random()-.5)*4:0);rw[y]=(y-HZ)*1.15}
  for(let y=HZ+1;y<H;y++){const s=1/(y-HZ),zw=G.z+s*2200,band=Math.floor(zw/7)%2,fog=Math.min(1,(y-HZ)/60);
   c.fillStyle=band?'#4aa84c':'#3e9a40';c.fillRect(0,y,W,1);
   const cx=cen[y],w=rw[y];c.fillStyle=band?'#d8d8d8':'#d03030';c.fillRect(cx-w*1.12,y,w*2.24,1);
   c.fillStyle=band?'#5a5e68':'#52565f';c.fillRect(cx-w,y,w*2,1);
   const zi=((zw%LAP)+LAP)%LAP;if(pads.some(p=>Math.abs(zi-p)<3)){c.fillStyle=(Math.floor(G.t*10)%2)?'#ffd84a':'#ff8a00';c.fillRect(cx-w*.3,y,w*.6,1)}
   if(zi<4||zi>LAP-3){c.fillStyle=(Math.floor(cx/6+y/3)%2)?'#fff':'#111';c.fillRect(cx-w,y,w*2,1)}
   if(!band){c.fillStyle='#e8e8e8';c.fillRect(cx-1*(w/60+.5),y,Math.max(1,w/60),1)}
   if(fog<1){c.fillStyle=`rgba(190,228,255,${(1-fog)*.6})`;c.fillRect(0,y,W,1)}}
  const sprs=ai.map((a,i)=>({a,dz:((a.z-G.z+LAP/2)%LAP+LAP)%LAP-LAP/2,i})).filter(q=>q.dz>13&&q.dz<500).sort((u,v)=>v.dz-u.dz);
  sprs.forEach(q=>{const yy=Math.min(H-1,Math.round(HZ+2200/q.dz));if(yy<=HZ||!cen[yy])return;const sc=(yy-HZ)/190*1.1,x=cen[yy]+q.a.x*rw[yy];drawKartSpr(c,x,yy,sc,q.a.c[0],q.a.c[1],0)});
  const kx=W/2+(keys.right?4:keys.left?-4:0)*(G.v>5?1:0),ky=H-22+(G.shake>0?2:0);drawKartSpr(c,kx,ky,1.15,'#ff3a3a','#ffe0e0',G.boost>0?1:0,keys.left?-1:keys.right?1:0);
  c.fillStyle='rgba(0,0,0,.45)';c.fillRect(6,18,96,44);txt(c,'第 '+G.place+' 名',54,36,'#ffd84a','bold 14px sans-serif');txt(c,'圈數 '+Math.min(LAPS,G.lap+1)+'/'+LAPS,54,54,'#fff','bold 10px sans-serif');
  c.fillStyle='rgba(0,0,0,.45)';c.fillRect(W-106,18,100,44);txt(c,Math.round(G.v*3.2)+' km/h',W-56,36,'#fff','bold 12px sans-serif');txt(c,'🚀 氮氣 ×'+G.nit,W-56,54,'#8af','bold 10px sans-serif');
  c.fillStyle='#222';c.fillRect(6,66,96,5);c.fillStyle=G.boost>0?'#ffb02a':'#4ac0ff';c.fillRect(6,66,96*Math.min(1,G.v/(MAXV*1.35)),5);
  if(G.cd>0){const n=Math.ceil(G.cd-.2);txt(c,n>0?n+'':'GO!',W/2,150,n>0?'#ffd84a':'#6aff6a','bold 64px sans-serif')}else if(G.t-3.2<1.1&&G.tm<1)txt(c,'GO!',W/2,150,'#6aff6a','bold 56px sans-serif');
  if(G.boost>0){c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=1;for(let i=0;i<14;i++){const a=i*.45+G.t*3;c.beginPath();c.moveTo(W/2+Math.cos(a)*150,HZ+60+Math.sin(a)*80);c.lineTo(W/2+Math.cos(a)*230,HZ+60+Math.sin(a)*130);c.stroke()}}
  txt(c,'←→ 轉向　↓ 煞車　空白鍵：氮氣加速（共 2 次）',W/2,H-3,'#fff','8px sans-serif')}};return G};
function drawKartSpr(c,x,y,sc,col,hl,boost,steer){c.save();c.translate(x,y);c.scale(sc,sc);
 c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(0,2,24,6,0,0,7);c.fill();
 if(boost){c.fillStyle='#ffb02a';c.beginPath();c.moveTo(-10,-3);c.lineTo(-6,10+Math.random()*6);c.lineTo(-2,-3);c.fill();c.beginPath();c.moveTo(2,-3);c.lineTo(6,10+Math.random()*6);c.lineTo(10,-3);c.fill()}
 c.fillStyle='#1a1a22';RR(c,-24,-12,10,14,3);c.fill();RR(c,14,-12,10,14,3);c.fill();
 c.fillStyle='#2a2a34';RR(c,-22,-24,8,12,2);c.fill();RR(c,14,-24,8,12,2);c.fill();
 c.fillStyle=col;RR(c,-18,-22,36,20,6);c.fill();c.fillStyle=hl;RR(c,-14,-20,28,5,2);c.fill();c.fillStyle='#222';RR(c,-8,-9,16,5,2);c.fill();
 c.fillStyle=col;c.fillRect(-20,-30,40,4);c.fillStyle='#111';c.fillRect(-18,-26,3,5);c.fillRect(15,-26,3,5);
 c.fillStyle='#f2c8a0';c.beginPath();c.arc(0,-30+(steer||0)*0,7,0,7);c.fill();c.fillStyle=col;c.beginPath();c.arc(0,-32,8,Math.PI,0);c.fill();c.fillStyle='#fff';c.fillRect(-6,-32,12,2);
 c.fillStyle=col;c.beginPath();c.arc(0,-33,3,0,7);c.fill();c.restore()}
