/* v8.1 比照現實的車價、週薪 15000、銀行信用評分與貸款 */
const NT=n=>Math.round(n).toLocaleString('en-US');
// ── 現實車價（新台幣）──
VMDL.bike=[['淑女車',4000,1.5],['折疊車',12000,1.5],['登山車',18000,1.6],['電動輔助車',35000,1.8],['公路車',45000,1.85]];
VMDL.moto=[['電動機車',60000,2.2],['90CC',55000,2.2],['125CC',75000,2.3],['150CC',95000,2.4],['輕型重機',250000,2.6],['大型重機',650000,2.75]];
{const P={hatch:1850000,car:2450000,pickup:2100000,suv:2890000,sport:7880000,hummer:4500000};CARM.forEach(m=>{if(P[m[0]])m[2]=P[m[0]]})}
VRC.bike.pr=4000;VRC.moto.pr=55000;
const CARNM={hatch:'A-Class 掀背',car:'C-Class 房車',pickup:'X-Class 皮卡',suv:'GLC 休旅',sport:'AMG GT 跑車',hummer:'HUMMER 悍馬'};
// ── 信用評分（仿聯徵 200~800）──
const WPAY=15000;
function crS(){if(!st.cr)st.cr={sc:600,loans:[],on:0,late:0,nid:1,log:[]};return st.cr}
function crG(s){s=s??crS().sc;return s>=700?{g:'優良',e:'🟢',r:.025,lim:400000}:s>=600?{g:'良好',e:'🔵',r:.035,lim:250000}:s>=500?{g:'普通',e:'🟡',r:.06,lim:100000}:{g:'不良',e:'🔴',r:0,lim:0}}
function crAdd(n,why){const c=crS();c.sc=Math.max(200,Math.min(800,c.sc+n));c.log.unshift(`${n>0?'+':''}${n}　${why}`);c.log=c.log.slice(0,8)}
const crWeekly=()=>crS().loans.reduce((a,l)=>a+l.pay,0);
function amort(P,r,n){const i=r/52;return i?Math.ceil(P*i/(1-Math.pow(1+i,-n))):Math.ceil(P/n)}
const funds=()=>st.money+st.bank;
function payOut(n){const a=Math.min(n,st.money);st.money-=a;n-=a;if(n>0){st.bank-=n}}
// ── 週薪 & 每週自動扣款（收假時呼叫）──
function loanWeek(){const c=crS();if(!c.loans.length)return '';const L=[];
 c.loans.slice().forEach(l=>{const due=Math.min(l.pay,l.left);
  if(funds()>=due){payOut(due);l.left-=due;l.n++;l.miss=0;c.on++;crAdd(2,`${l.nm} 準時繳款`);L.push(`✅ ${l.nm}：扣款 💰${NT(due)}（剩 ${NT(l.left)}）`);
   if(l.left<=0){c.loans.splice(c.loans.indexOf(l),1);crAdd(15,`${l.nm} 全部還清`);L.push(`🎉 ${l.nm} 已全部還清！信用 +15`)}}
  else{l.miss++;c.late++;l.left+=500;crAdd(-35,`${l.nm} 逾期未繳`);L.push(`⚠️ ${l.nm}：餘額不足，逾期！罰款 500、信用 -35（連續 ${l.miss} 期）`);
   if(l.miss>=3){c.loans.splice(c.loans.indexOf(l),1);
    if(l.veh&&st.veh[l.veh]){if(p.ride==l.veh){p.ride=null;p.w=12;p.h=8}delete st.veh[l.veh];crAdd(-80,`${l.nm} 遭銀行收回`);L.push(`🚨 連續三期未繳，銀行把你的${l.vn||'車'}拖走了……信用 -80`)}
    else{crAdd(-80,`${l.nm} 轉入催收`);st.rep=Math.max(0,st.rep-5);L.push(`🚨 ${l.nm} 轉入催收，信用 -80、⭐-5`)}}}});
 return `<br><br><b>🏦 貸款扣款</b>（信用 ${crG().e} ${c.sc} ${crG().g}）<br>`+L.join('<br>')}
// ── 申請貸款 ──
// o:{nm, vn, veh, price, down(最低頭期比例), terms:[週數], rate加碼, onOK(principal)}
function loanApply(o){const g=crG(),c=crS();
 if(!g.r)return openDlg('🏦 貸款審核',`行員看了看你的聯徵報告，抱歉地搖頭：<br>「您的信用評分 <b>${c.sc}</b>（${g.e}${g.g}），目前無法核貸。」<br><span class="opacity-70 text-xs">準時繳完現有貸款、不要逾期，信用就會慢慢回升。</span>`,[['返回','',cancel,0]],true);
 const downs=[0,.1,.2,.3,.5].filter(d=>d>=o.down);
 openDlg('🏦 選擇頭期款',`${o.nm}　總價 💰${NT(o.price)}<br>可用資金（現金＋存款）💰${NT(funds())}<br>${o.down?`<span class="opacity-70 text-xs">車貸最低頭期 ${o.down*100}%。</span>`:''}`,
  downs.map(d=>{const dp=Math.ceil(o.price*d);return[`頭期 ${d*100}%　💰${NT(dp)}`,`貸款 💰${NT(o.price-dp)}`,()=>pickTerm(dp),funds()<dp]}).concat([['返回','',cancel,0]]),true);
 function pickTerm(dp){const P=o.price-dp,r=g.r+(o.add||0),cur=crWeekly(),cap=Math.floor(WPAY*.6);
  openDlg('🏦 選擇期數',`貸款金額 💰${NT(P)}　年利率 <b>${(r*100).toFixed(1)}%</b>（信用 ${g.e}${g.g}）<br>每週收假自動從薪水扣款。目前每週已繳 💰${NT(cur)}，上限為週薪的 60%（💰${NT(cap)}）。`,
   o.terms.map(n=>{const w=amort(P,r,n),tot=w*n,ok=cur+w<=cap;return[`${n>=52&&n%52==0?(n/52)+' 年':n+' 週'}（${n} 期）　每週 💰${NT(w)}`,ok?`總繳 💰${NT(tot)}・利息 💰${NT(tot-P)}`:'❌ 超過負擔上限，銀行不核准',()=>confirmL(dp,P,r,n,w),!ok]}).concat([['返回','',cancel,0]]),true)}
 function confirmL(dp,P,r,n,w){openDlg('🏦 簽約確認',`📄 <b>${o.nm}</b><br>頭期款 💰${NT(dp)}　貸款 💰${NT(P)}<br>年利率 ${(r*100).toFixed(1)}%　${n} 期　每週扣 💰${NT(w)}<br><br><span class="opacity-80 text-xs">⚠️ 逾期一次罰 500、信用 -35；連續三期未繳，${o.veh?'車子會被銀行收回':'會轉入催收'}。準時繳款每期信用 +2，還清再 +15。</span>`,
  [['✍️ 簽約','',()=>{if(funds()<dp)return toast('資金不足！');payOut(dp);c.loans.push({id:c.nid++,nm:o.nm,vn:o.vn,veh:o.veh||null,P,left:w*n,pay:w,n:0,N:n,r,miss:0});crAdd(0,`核貸 ${o.nm}`);hud();SVDIRTY=1;o.onOK()}],['再想想','',cancel,0]],true)}}
// ── 購車：付清或貸款 ──
function buyPay(t,k,m,price){const nm=t=='car'?(CARNM[k]||CARM.find(q=>q[0]==k)[1]):VMDL[t][m][0];
 openDlg('💳 付款方式',`${nm}　💰${NT(price)}<br>現金 💰${NT(st.money)}　存款 🏦${NT(st.bank)}<br><span class="opacity-70 text-xs">現金不夠的部分會從存款扣。</span>`,[
  ['💵 一次付清',funds()<price?`還差 💰${NT(price-funds())}`:'',()=>{if(funds()<price)return toast('錢不夠喔！');payOut(price);st.money+=price;vBuyDo(t,k,m,price)},funds()<price],
  ['🏦 申請'+(t=='car'?'車貸':'分期'),crG().r?`信用 ${crG().e}${crS().sc} ${crG().g}・年利率約 ${((crG().r+(t=='car'?0:.01))*100).toFixed(1)}%`:`信用 ${crG().e}${crS().sc} 不良・可能無法核貸`,()=>loanApply({nm:(t=='car'?'車貸・':'分期・')+nm,vn:nm,veh:t,price,down:t=='car'?.2:0,terms:t=='car'?[52,104,156,260]:t=='moto'?[12,26,52,104]:[6,12,26],add:t=='car'?0:.01,onOK:()=>{st.money+=price;vBuyDo(t,k,m,price);toast(`🎉 貸款核准！${nm}停在你家門口`)}})],
  ['返回','',cancel,0]],true)}
vBuyColor=function(t,k,price){const V=VRC[t];
 if(st.veh&&st.veh[t])return toast('你已經有一台了！');
 if(t!='car'){const L=VMDL[t];return openDlg(`${V.i} 選擇車款`,`每一款騎起來的速度都不太一樣・可分期付款<br>現金 💰${NT(st.money)}　存款 🏦${NT(st.bank)}`,L.map((m,i)=>[`${m[0]}　💰${NT(m[1])}`,`速度 ×${m[2]}`,()=>buyPay(t,null,i,m[1]),0]).concat([['返回','',cancel,0]]),true)}
 const i=CARIDX[k]??1;buyPay('car',k,i,price)};
SP['賓士展示中心']=()=>{const o=[];
 if(st.veh&&st.veh.car)o.push(['🚗 你已經有一台車了','停在你家附近',()=>{},1]);
 else CARM.forEach(m=>o.push([`🚘 ${CARNM[m[0]]||m[1]}　💰${NT(m[2])}`,`速度 ×3・可申請車貸（頭期 20% 起）`,()=>vBuyColor('car',m[0],m[2]),0]));
 o.push(['☕ 在貴賓室喝杯咖啡','免費・😊+4',()=>{fxApply({j:4});advance(.3);hud();closeDlg();toast('業務端來一杯手沖咖啡：「慢慢看，不急～車貸我們也能幫您跑。」')}]);return o};
{const _g=SP['捷安特'];SP['捷安特']=()=>{const o=_g();o[0]=[`🚲 購買腳踏車　💰${NT(VMDL.bike[0][1])} 起`,st.veh&&st.veh.bike?'已擁有（停在你家附近）':'五種車款・可分期',()=>vBuyColor('bike',null,0),!!(st.veh&&st.veh.bike)];return o}}
vShop=function(){const o=[];o.push([`🛵 機車　💰${NT(55000)} 起`,st.veh.moto?'已擁有（停在你家附近）':'六種車款・可分期',()=>vBuyColor('moto',null,0),!!st.veh.moto]);
 o.push(['🚘 想買汽車？','請到賓士展示中心（旅館東邊）',()=>{},1]);o.push(['🚲 想買腳踏車？','請到捷安特（旅館東邊）',()=>{},1]);return o};
// ── 銀行：信用與貸款 ──
function creditMenu(){const c=crS(),g=crG();
 const ls=c.loans.length?c.loans.map(l=>`・${l.nm}：剩 💰${NT(l.left)}，每週 💰${NT(l.pay)}（${l.n}/${l.N} 期${l.miss?`，⚠️逾期 ${l.miss}`:''}）`).join('<br>'):'・目前沒有貸款';
 const o=[['💼 申請信用貸款',g.r?`額度最高 💰${NT(g.lim)}・年利率 ${((g.r+.04)*100).toFixed(1)}%`:'信用不良，無法申請',()=>personalLoan(),!g.r]];
 c.loans.forEach(l=>o.push([`💸 提前還清：${l.nm}`,`需 💰${NT(l.left)}（免違約金）`,()=>{if(funds()<l.left)return;payOut(l.left);c.loans.splice(c.loans.indexOf(l),1);crAdd(15,`${l.nm} 提前還清`);hud();SVDIRTY=1;toast(`🎉 ${l.nm} 還清了！信用 +15`);creditMenu()},funds()<l.left]));
 o.push(['📜 信用紀錄','',()=>openDlg('📜 信用紀錄',(c.log.length?c.log.join('<br>'):'還沒有紀錄')+`<br><br>準時繳款 ${c.on} 期　逾期 ${c.late} 次`,[['返回','',creditMenu,0]],true)],['返回','',()=>mainMenu('銀行'),0]);
 openDlg('💳 信用與貸款',`聯徵信用評分：<b>${g.e} ${c.sc}</b>（${g.g}）<br><span class="opacity-70 text-xs">700↑ 優良（車貸 2.5%）・600↑ 良好（3.5%）・500↑ 普通（6%）・500↓ 不良（無法貸款）</span><br><br><b>目前貸款</b>　每週共扣 💰${NT(crWeekly())}<br>${ls}`,o)}
function personalLoan(){const g=crG();const am=[50000,100000,200000,300000,400000].filter(a=>a<=g.lim);
 openDlg('💼 信用貸款','要借多少？錢會直接撥進你的戶頭。',am.map(a=>[`💰${NT(a)}`,'',()=>loanApply({nm:`信貸 ${NT(a)}`,price:a,down:0,terms:[26,52,104],add:.04,onOK:()=>{st.bank+=a;toast(`🏦 信貸 💰${NT(a)} 已撥款到存款`);creditMenu()}}),0]).concat([['返回','',creditMenu,0]]),true)}
{const _b=SP['銀行'];SP['銀行']=function(){const o=[[`💳 信用與貸款`,`信用 ${crG().e}${crS().sc}・貸款 ${crS().loans.length} 筆`,()=>creditMenu()],
  ...[1000,5000].map(n=>[`💰 存款 ${NT(n)}`,'活存年利率 1.6%',()=>{depo(n);mainMenu('銀行')},st.money<n]),[`💰 存入全部（💰${NT(st.money)}）`,'',()=>{depo(st.money);mainMenu('銀行')},st.money<1],
  ...[1000,5000].map(n=>[`📤 提款 ${NT(n)}`,'',()=>{wdr(n);mainMenu('銀行')},st.bank<n]),[`📤 提領全部（🏦${NT(st.bank)}）`,'',()=>{wdr(st.bank);mainMenu('銀行')},st.bank<1]];return o}}
