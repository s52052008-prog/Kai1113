/* v9.1 第二階段：銀行開戶、股票、保險、每月帳單、手機（約定、任務、脆G、股票、保險、帳單）、朋友約定要到現場 */
const NTD=n=>Math.round(n).toLocaleString('en-US');
const bankPay=n=>{const a=Math.min(n,Math.max(0,st.bank));st.bank-=a;n-=a;const b=Math.min(n,Math.max(0,st.money));st.money-=b;return n-b};// 回傳不足額
// ───────── 股票 ─────────
const STOCKS=[['2330','台雞店',1000,.004,.04,'ai'],['2317','紅海',200,.002,.05,'ai'],['2382','廣大',300,.003,.08,'ai'],['2454','連發科',1200,.002,.05,'ai'],['2002','忠剛',25,0,.015,'steel'],
 ['2603','常贏',200,0,.09,'ship'],['2882','國太緊',60,.001,.025,'fin',.015],['0050','台灣五蚌',180,.002,.025,'etf'],['0056','高顧息',38,.001,.02,'etf',.02],['00878','永續高顧息',22,.001,.018,'etf',.018]];
const NEWS=[['🤖 AI 伺服器訂單爆量，科技股大漲',{ai:.06,etf:.02}],['🛢️ 國際油價上漲，航運成本大增',{ship:-.07,all:-.01}],['🚢 航運旺季報價飆升',{ship:.09}],['🏦 央行升息半碼',{fin:.03,all:-.015}],
 ['📉 美股重挫，台股跟跌',{all:-.04}],['💹 外資大買台股',{all:.03}],['🏗️ 基礎建設需求增加，鋼價回升',{steel:.05}],['⚔️ 國際局勢緊張，市場避險',{all:-.03,ship:.04}],['📱 新手機熱賣，IC 設計受惠',{ai:.04}],['😴 市場清淡，股價小幅整理',{}]];
function stkS(){if(!st.sk){st.sk={p:{},h:{},c:{},news:null,hist:[]};STOCKS.forEach(s=>{st.sk.p[s[0]]=s[2];st.sk.c[s[0]]=0})}return st.sk}
const gauss=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
function stkWeek(){const S=stkS(),nw=NEWS[Math.floor(Math.random()*NEWS.length)],W=wkN();S.news=nw[0];let out='';
 STOCKS.forEach(s=>{const e=nw[1],r=s[3]+s[4]*gauss()+(e[s[5]]||0)+(e.all||0);const p0=S.p[s[0]],p1=Math.max(1,Math.round(p0*(1+r)*100)/100);S.p[s[0]]=p1;S.c[s[0]]=(p1-p0)/p0});
 S.hist.unshift({w:W,t:nw[0]});S.hist=S.hist.slice(0,10);
 if(W%16==0){let d=0;STOCKS.forEach(s=>{if(s[6]&&S.h[s[0]])d+=S.h[s[0]]*S.p[s[0]]*s[6]});if(d>=1){d=Math.round(d);st.bank+=d;out+=`<br>💰 季配息入帳 +${NTD(d)}`}}
 const v=stkVal();return `<br><br><b>📰 本週財經</b>：${nw[0]}`+(v?`<br>📈 持股市值 ${NTD(v)}`:'')+out}
const stkVal=()=>{const S=stkS();return STOCKS.reduce((a,s)=>a+(S.h[s[0]]||0)*S.p[s[0]],0)};
function stkMenu(back){if(!st.acct)return openDlg('📈 股票','要先到 <b>銀行</b> 開立證券戶（存款 10,000 以上）才能交易。',[['返回','',back||phoneHome]]);
 const S=stkS();openDlg('📈 股票・證券戶',`交割帳戶（存款）：🏦 ${NTD(st.bank)}　持股市值：${NTD(stkVal())}<br><span style="font-size:12px;opacity:.8">${S.news?'📰 '+S.news:'每週收假時股價變動'}</span>`,
  STOCKS.map(s=>{const p=S.p[s[0]],c=S.c[s[0]],h=S.h[s[0]]||0;return[`${c>0?'🔺':c<0?'🔻':'▪️'} ${s[1]}（${s[0]}）　${p.toLocaleString('en-US')}`,`本週 ${c>=0?'+':''}${(c*100).toFixed(1)}%${h?`・持有 ${NTD(h)} 股・市值 ${NTD(h*p)}`:''}${s[6]?'・有配息':''}`,()=>stkTrade(s,back)]}).concat([['返回','',back||phoneHome]]))}
function stkTrade(s,back){const S=stkS(),p=S.p[s[0]],h=S.h[s[0]]||0,fee=v=>Math.max(20,Math.round(v*.001425));
 const buy=n=>{const v=n*p,t=v+fee(v);if(st.bank<t)return toast('存款不夠喔（需要 '+NTD(t)+'）');st.bank-=t;S.h[s[0]]=h+n;hud();toast(`📈 買進 ${s[1]} ${NTD(n)} 股，花費 ${NTD(t)}`);stkTrade(s,back)};
 const sell=n=>{n=Math.min(n,S.h[s[0]]||0);if(!n)return;const v=n*p,t=v-fee(v)-Math.round(v*.003);S.h[s[0]]-=n;st.bank+=t;hud();toast(`📉 賣出 ${s[1]} ${NTD(n)} 股，入帳 ${NTD(t)}`);stkTrade(s,back)};
 const o=[1000,100,10].map(n=>[`🛒 買 ${n==1000?'1 張（1,000 股）':n+' 股'}`,`約 ${NTD(n*p+fee(n*p))}`,()=>buy(n),st.bank<n*p]);
 if(h)o.push(...[100,1000].filter(n=>n<h).map(n=>[`💵 賣 ${n} 股`,`約入帳 ${NTD(n*p*.9957)}`,()=>sell(n)]),[`💵 全部賣出（${NTD(h)} 股）`,`約入帳 ${NTD(h*p*.9957)}`,()=>sell(h)]);
 o.push(['返回','',()=>stkMenu(back)]);openDlg(`📈 ${s[1]}（${s[0]}）`,`股價 <b>${p.toLocaleString('en-US')}</b>　持有 ${NTD(h)} 股<br><span style="font-size:12px;opacity:.8">手續費 0.1425%（最低 20 元），賣出另收證交稅 0.3%。錢從存款扣、賣出回到存款。</span>`,o)}
{const _b=SP['銀行'];SP['銀行']=function(){const o=_b.apply(this,arguments);
 if(!st.acct)o.splice(1,0,['📈 開立證券戶','存款 10,000 以上才能開戶，開戶後可以用手機看股票、下單',()=>{if(st.bank<10000)return toast('存款要 10,000 以上才能開戶喔');st.acct=1;stkS();closeDlg();openDlg('📈 開戶完成','行員遞給你一本存摺和一張卡：「恭喜開戶成功！之後可以用手機 App 看盤、下單。」',[['📈 現在就看股票','',()=>stkMenu(()=>mainMenu('銀行'))],['好','',closeDlg]])},st.bank<10000]);
 else o.splice(1,0,['📈 股票交易',`持股市值 ${NTD(stkVal())}`,()=>stkMenu(()=>mainMenu('銀行'))]);return o}}
// ───────── 保險（向禹豪購買，年繳＝64 個週末）─────────
const INS={med:['🏥 醫療險',4800,'生病、住院'],acc:['🩹 意外險',3600,'受傷：打球骨折、被車撞'],prop:['🚗 多功能產險',6000,'車子與財物損失：車禍修車、颱風壓車']};
const insS=()=>st.ins||(st.ins={});
const insOn=k=>{const I=insS();return I[k]&&I[k]>=wkN()};
function insClaim(k,cost,why){if(!insOn(k))return 0;const v=Math.round(cost*1.4);st.bank+=v;setTimeout(()=>openDlg('🛡️ 保險理賠',`${why||''}<br>禹豪幫你跑完理賠流程：「兄弟，保險就是這時候用的！」<br><br>${INS[k][0]} 理賠入帳 <b>+${NTD(v)}</b>（實際花費 ${NTD(cost)}）`,[['謝謝禹豪！','',closeDlg]]),600);return v}
function insMenu(){const I=insS(),W=wkN(),o=[];
 Object.keys(INS).forEach(k=>{const q=INS[k],on=insOn(k);o.push([`${q[0]}　年繳 💰${NTD(q[1])}`,on?`✅ 保障中（到第 ${I[k]} 個週末）・${q[2]}`:q[2],()=>{if(on)return toast('已經有保了');const left=bankPay(q[1]);if(left>0){st.bank+=q[1]-left;return toast('錢不夠喔')}I[k]=W+64;hud();toast(`🛡️ 投保成功：${q[0]}，保障一年`);insMenu()},on]);});
 const sv=I.sav;o.push(['🐷 儲蓄險（一年期）　月繳 💰5,000',sv?`已繳 ${sv.cnt} 期・到期日：第 ${sv.end} 個週末，到期可領回`:'每 4 個週末自動扣 5,000，滿一年到期可領回',()=>{if(sv)return;I.sav={start:W,end:W+64,cnt:0,paid:0,miss:0};toast('🐷 儲蓄險生效，每月自動扣款');insMenu()},!!sv]);
 o.push(['返回','',closeDlg]);openDlg('🛡️ 禹豪的保險規劃','「兄弟，人生難免有意外，保險就是給家人的一份安心！」<br><span style="font-size:12px;opacity:.8">保費從存款扣（不夠再扣現金）。發生事故時要到現場處理，理賠由禹豪幫你辦。</span>',o)}
// 跟禹豪當面聊天時可以買保險
{const od=openDlg;openDlg=function(t,d,opts,...r){try{if(/^💬 /.test(t)&&/黃禹豪|小石頭/.test(t)&&Array.isArray(opts)&&!opts.some(o=>o&&/買保險/.test(o[0])))opts.splice(Math.max(0,opts.length-1),0,['🛡️ 跟禹豪聊保險','醫療險、意外險、多功能產險、儲蓄險',insMenu])}catch(e){}return od.call(this,t,d,opts,...r)}}
// ───────── 每月帳單（每 4 個週末，收假時自動扣款）─────────
function billCalc(){const c=cal(),m=(yjS().home||yjS().wed)?1.8:1,veh=st.veh&&(st.veh.moto||st.veh.car);
 const L=[['⚡ 電費',c.s==1?1600:900],['💧 水費',300],['🔥 瓦斯',400],['📶 手機＋網路',1100]];if(veh)L.push(['⛽ 油錢',1500]);return L.map(q=>[q[0],Math.round(q[1]*m)])}
function billWeek(){const W=wkN();let out='';
 if(W%4==0){const L=billCalc(),tot=L.reduce((a,q)=>a+q[1],0)+(st.billOwe||0),owe0=st.billOwe||0;st.billOwe=0;const left=bankPay(tot);
  out+=`<br><br><b>🧾 本月帳單</b>：${L.map(q=>q[0].replace(/^\S+\s/,'')+' '+NTD(q[1])).join('、')}${owe0?`、上月欠費 ${NTD(owe0)}`:''}<br>合計 ${NTD(tot)}`+(left>0?`　⚠️ <span style="color:#c33">餘額不足，欠費 ${NTD(left)}（下月加收 10% 滯納金）</span>`:'　✅ 已自動扣款');
  if(left>0)st.billOwe=Math.round(left*1.1);
  const sv=insS().sav;if(sv&&W<sv.end){const l2=bankPay(5000);if(l2>0){st.bank+=5000-l2;sv.miss++;out+='<br>🐷 儲蓄險：餘額不足，本期沒有扣到'}else{sv.cnt++;sv.paid+=5000;out+=`<br>🐷 儲蓄險：第 ${sv.cnt} 期扣款 5,000`}}}
 const sv=insS().sav;if(sv&&W>=sv.end){const v=Math.round(sv.paid*1.5);st.bank+=v;delete insS().sav;out+=`<br><br>🎉 <b>儲蓄險到期！</b>領回 ${NTD(v)}（繳了 ${NTD(sv.paid)}）……比想像中多耶！`}
 return out}
if(typeof loanWeek=='function'){const _lw=loanWeek;loanWeek=function(){let t='';try{t=_lw.apply(this,arguments)||''}catch(e){}try{t+=billWeek()}catch(e){}try{t+=stkWeek()}catch(e){}return t}}
// 醫療險：昏倒生病、神秘蘑菇送醫
{const _f=faint;faint=function(){const w=st.lastFaint==dayKey()-1;const r=_f.apply(this,arguments);if(w)insClaim('med',5000,'🤒 連續昏倒送醫。');return r}}
{const _u=useItem;useItem=function(k){const first=k=='mush'&&!st.mush&&!st.mushPend&&st.inv.mush>0;const r=_u.apply(this,arguments);if(first)insClaim('med',15000,'🍄 吃了神秘蘑菇送醫。');return r}}
// ───────── 朋友約定（要本人到現場）─────────
const AP={
 yijia:[['bbq','一起吃燒肉',5,18,21,'碳佐麻里',{j:12,s:20},'炭火上的牛舌滋滋作響，家宜一直幫你夾肉：「多吃一點，你太瘦了！」'],['cafe','喝咖啡、看書',4,14,17,'咖啡店',{j:8,w:1},'你們各自看書，偶爾抬頭對看一眼、相視而笑。']],
 yuhao:[['ball','打籃球',5,14,17,'高雄運動中心',{p:2,s:-15,j:8},'小石頭一個背後運球過人，回頭對你挑眉：「老了嗎兄弟？」'],['ins','聊保險',6,14,17,'咖啡店',{j:3},'禹豪攤開資料夾：「兄弟，我幫你算過了，這樣保最划算！」',1],['park','陪禹豪一家帶頌言去公園',5,9,12,'公園',{j:10},'頌言在溜滑梯上咯咯笑，媛媛在旁邊拍照，禹豪推著鞦韆：「再高一點！」']],
 yilun:[['bible','一起讀經禱告',6,14,17,'城光復興堂',{w:3,j:6},'學長翻開聖經：「老哥，我們今天讀〈詩篇〉二十三篇。」你們一起安靜禱告。'],['night','吃宵夜聊心事',5,20,23,'夜市',{j:10,s:10},'一碗鹽酥雞、兩杯珍奶，學長聽你說完最近的煩惱：「老哥，交給神吧。」']],
 rita:[['serve','去教會幫忙服侍',6,9,12,'城光復興堂',{r:3,j:6,s:-8},'你幫 RITA 排椅子、發週報、招待新朋友。她比了個讚：「你超好用！」']],
 huijing:[['kids','兒童主日學帶小朋友做運動',6,9,12,'城光復興堂',{p:1,j:8,s:-12},'一群小朋友跟著你做開合跳、跑接力，惠菁在旁邊笑到不行。']],
 fangci:[['yoga','一起上瑜伽課',5,9,12,'運動中心3F瑜伽教室',{h:5,j:6,s:-6},'舫慈示範下犬式，你在旁邊抖得像果凍。她忍住笑：「呼吸、呼吸～」']],
 zhuyang:[['carry','教會市集幫忙搬重物',5,9,12,'城光復興堂',{p:2,r:2,s:-15},'你和主揚哥一箱一箱把物資搬到門口，他拍拍你的肩：「年輕人就是不一樣！」']],
 bokai:[['three','投三分球特訓',5,14,17,'高雄運動中心',{p:2,s:-12,j:6},'柏凱教練站在旁邊：「手肘收進來、出手要高！」你連進了三顆。'],['steak','吃牛排火鍋',6,18,21,'夜市',{j:10,s:25},'柏凱點了三份牛排加一鍋麻辣鍋：「練完球就是要吃肉！」']]};
const DN={4:'週五',5:'週六',6:'週日'};
const apS=()=>st.ap||(st.ap=[]);
const nowAbs=()=>dow()*24+T.hour;
function apAhead(a){return nowAbs()<a[2]*24+a[4]}
function apMake(id,a,W){apS().push({id,k:a[0],w:W,d:a[2],h0:a[3],h1:a[4],loc:a[5],st:0});SVDIRTY=1}
function apHas(id){return apS().some(x=>x.id==id&&x.st==0)}
function apFind(x){return (AP[x.id]||[]).find(a=>a[0]==x.k)}
function apMenu(id,back){const F=FR[id],L=AP[id];if(!L)return;const W=wkN();
 if(apHas(id))return openDlg('📅 約定',`你已經跟${F.n}有約了。`,[['返回','',back||phoneHome]]);
 openDlg(`📅 約${F.n}`,'選一個約定。<br><span style="font-size:12px;opacity:.8">到時候要自己走到現場、跟對方說話才算完成。遲到一小時內還可以，沒出現會扣好感。</span>',
  L.map(a=>{const ahead=apAhead(a),wk=ahead?'這個週末':'下個週末';return[`📅 ${a[1]}`,`${wk}${DN[a[2]]} ${a[3]}:00–${a[4]}:00・${a[5]=='高雄運動中心'?'運動中心 1F':a[5]=='運動中心3F瑜伽教室'?'運動中心 3F':a[5]=='咖啡店'?'願你平安咖啡廳':a[5]}`,()=>{apMake(id,a,ahead?W:W+1);closeDlg();toast(`📅 約好了！${wk}${DN[a[2]]} ${a[3]}:00 在${a[5]}見`)}]}).concat([['返回','',back||phoneHome]]))}
// 電話：拿掉瞬間完成的「邀約」，換成真的約定
{const od=openDlg;openDlg=function(t,d,opts,...r){try{if(/^📞 通話中：/.test(t)&&Array.isArray(opts)){const id=Object.keys(FR).find(k=>t.includes(FR[k].n));opts=opts.filter(o=>!(o&&/^📅 邀約：/.test(o[0])));if(id&&AP[id])opts.splice(Math.max(0,opts.length-1),0,['📅 約時間見面','約好之後要本人到現場',()=>apMenu(id,()=>phoneCall(id))])}}catch(e){}return od.call(this,t,d,opts,...r)}}
// 現場：出現朋友（室內放進房間，戶外放在公園／夜市）
const APOUT={};
function apSpot(){const R=rm;for(let r=0;r<160;r+=6)for(let a=0;a<12;a++){const x=R.W/2+Math.cos(a*.52)*r,y=R.H-70+Math.sin(a*.52)*r*.6;if(x<10||y<34||x>R.W-22||y>R.H-14)continue;const b={x,y,w:12,h:8};if(!R.sol.some(o=>hit(b,o))&&!R.ppl.some(o=>hit(b,o)))return[x,y]}return[R.W/2,R.H-60]}
function apOutPos(loc){const A=loc=='公園'?PARK:MARKET;for(let r=0;r<200;r+=8)for(let a=0;a<16;a++){const x=A.x+A.w/2+Math.cos(a*.39)*r,y=A.y+A.h/2+Math.sin(a*.39)*r,b={x,y,w:12,h:8};if(!solids.some(o=>hit(b,o)))return[x,y]}return[A.x+A.w/2,A.y+A.h/2]}
function apTick(){const W=wkN(),now=nowAbs();
 apS().forEach(x=>{if(x.st!=0)return;const F=FR[x.id];if(!F)return;const t0=x.d*24+x.h0,t1=x.d*24+x.h1+1,live=x.w==W&&now>=t0&&now<t1;
  if(x.w<W||(x.w==W&&now>=t1&&wkIn())){x.st=-1;frDrop(x.id,5);const ap=apFind(x);setTimeout(()=>toast(`📲 ${F.n}：「我等了好久，你怎麼沒來……」（好感 -5）`),200);return}
  const out=x.loc=='公園'||x.loc=='夜市';
  if(out){let n=APOUT[x.id+x.k];if(!n&&live){const q=apOutPos(x.loc);n=APOUT[x.id+x.k]=mkNP({n:F.n,fr:x.id,ap:x,x:q[0],y:q[1],still:1,dir:0,L:['你終於來了！']})}if(n)n.hid=!live}
  else if(scene==x.loc&&rm&&rm.ppl){const has=rm.ppl.find(n=>n.ap===x);if(live&&!has){rm.ppl=rm.ppl.filter(n=>n.fr!=x.id);const q=apSpot();rm.ppl.push(pp(F.n,q[0],q[1],'#9cc4e4','#222','',{fr:x.id,ap:x,dir:0,still:1}))}
   else if(!live&&has)rm.ppl=rm.ppl.filter(n=>n!==has)}})}
setInterval(()=>{try{apTick()}catch(e){}},700);
{const _ft=frTalk;frTalk=function(n){const x=n.ap;if(!x||x.st!=0)return _ft.apply(this,arguments);const a=apFind(x),F=FR[x.id],late=nowAbs()>=x.d*24+x.h1;
 x.st=1;frAdd(x.id,late?1:4,1);fxApply(a[6]||{});advance(late?1.5:2);
 if(n.hid!==undefined&&NP.includes(n)){n.hid=true;delete APOUT[x.id+x.k]}else if(rm&&rm.ppl)rm.ppl=rm.ppl.filter(q=>q!==n);
 hud();feedPost(`和${F.n}${a[1].replace(/^一起/,'一起')}`,a[7]);
 openDlg(`📅 ${F.n}・${a[1]}`,(late?`<i>（你遲到了，${F.n}念了你兩句：「下次要準時喔！」）</i><br><br>`:'')+a[7]+`<br><br>💞 ${F.n}好感 +${late?1:4}`,[[a[8]?'🛡️ 看看保險方案':'😊 開心','',()=>{closeDlg();if(a[8])insMenu()}]])}}
// 朋友主動打來約
function apInvite(){const W=wkN(),c=Object.keys(AP).filter(id=>FR[id]&&FRS(id).met&&FRS(id).pt>=15&&!apHas(id));if(!c.length||Math.random()<.4)return;
 const id=c[Math.floor(Math.random()*c.length)],L=AP[id].filter(apAhead);if(!L.length)return;const a=L[Math.floor(Math.random()*L.length)],F=FR[id];
 openDlg(`📞 ${F.n} 打電話來`,`「喂～這個${DN[a[2]]} ${a[3]}:00 要不要一起${a[1].replace(/^一起/,'')}？在${a[5]}喔！」`,[['👍 好啊，到時見！','要本人到現場才算',()=>{apMake(id,a,W);closeDlg();toast(`📅 約好了！${DN[a[2]]} ${a[3]}:00 在${a[5]}`)}],['🙏 這次不方便','',()=>{closeDlg();toast(`${F.n}：「好喔，下次再約！」`)}]])}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);setTimeout(()=>whenFree(apInvite),3000);return r}}
// ───────── 脆G ─────────
function feedPost(t,txt,img){(st.feed=st.feed||[]).unshift({w:wkN(),t,txt,img,lk:5+Math.floor(Math.random()*40)});st.feed=st.feed.slice(0,60)}
{const _ps=photoShow;photoShow=function(img,title,html,cb){try{if(!(st.album||[]).some(q=>q.img==img))feedPost(title,(html||'').replace(/<[^>]+>/g,' ').slice(0,80),img)}catch(e){}return _ps.apply(this,arguments)}}
function feedView(){window.TITLE=true;const F=(st.feed||[]).slice();(st.album||[]).forEach(q=>{if(!F.some(p=>p.img==q.img))F.push({w:q.w,t:q.t,img:q.img,txt:'',lk:20})});
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(20,12,6,.9);display:flex;justify-content:center;overflow:auto;padding:16px 8px';
 const ph=document.createElement('div');ph.style.cssText='width:min(420px,96vw);background:#fffaf0;border-radius:22px;border:8px solid #2a1a0e;box-shadow:0 10px 40px rgba(0,0,0,.6);height:max-content;color:#2a1a0e;font-size:14px';
 const esc=s=>String(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
 ph.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #e3d5bb"><b style="font-size:20px;font-family:serif">脆G</b><span style="font-size:12px;opacity:.7">@allen.weekend・${F.length} 則</span><button id="fgx" style="font-size:18px;background:none;border:0;cursor:pointer">✕</button></div>`+
  (F.length?F.map(p=>`<div style="border-bottom:1px solid #eadfc8;padding:10px 12px"><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px"><div style="width:28px;height:28px;border-radius:50%;background:#e8b04a;display:flex;align-items:center;justify-content:center">😎</div><b>allen.weekend</b><span style="opacity:.6;font-size:12px;margin-left:auto">第 ${p.w} 個週末</span></div>${p.img?`<img src="${FAMIMG[p.img]}" alt="" style="width:100%;border-radius:8px;display:block">`:''}<div style="margin-top:6px">❤️ ${p.lk}　💬 ${Math.floor(p.lk/5)}</div><div><b>${esc(p.t)}</b>${p.txt?'　'+esc(p.txt):''}</div></div>`).join(''):'<div style="padding:30px;text-align:center;opacity:.7">還沒有貼文。完成劇情或和朋友赴約後，會自動發文。</div>');
 ov.appendChild(ph);document.body.appendChild(ov);const end=()=>{removeEventListener('keydown',kd,true);ov.remove();window.TITLE=false;phoneHome()};const kd=e=>{if(e.key=='Escape'||e.key=='c'||e.key=='C'){e.preventDefault();end()}};
 addEventListener('keydown',kd,true);ph.querySelector('#fgx').onclick=end;ov.addEventListener('pointerdown',e=>{if(e.target===ov)end()})}
// ───────── 任務清單、帳單、手機首頁 ─────────
function todoView(){const W=wkN(),L=[];
 apS().filter(x=>x.st==0).sort((a,b)=>(a.w*200+a.d*24+a.h0)-(b.w*200+b.d*24+b.h0)).forEach(x=>{const a=apFind(x);L.push(`📅 ${x.w==W?'這週':'下週'}${DN[x.d]} ${x.h0}:00　${FR[x.id].n}・${a?a[1]:''}（${x.loc}）`)});
 try{const h=YJHINT();if(h)L.push('💗 '+h)}catch(e){}
 const g=st.gym||{};L.push(`🏋️ 健身打卡：本週 ${g.w==W?g.cnt:0}/2・連續 ${g.streak||0} 週`);
 if(W%4!=0)L.push(`🧾 下次帳單：第 ${Math.ceil(W/4)*4} 個週末收假時`);if(st.billOwe)L.push(`⚠️ 欠繳帳單 ${NTD(st.billOwe)}`);
 Object.keys(INS).forEach(k=>{if(insOn(k)&&st.ins[k]-W<=4)L.push(`🛡️ ${INS[k][0]} 快到期了（第 ${st.ins[k]} 個週末）`)});
 const c=cal(),h=holi(c);if(h)L.push(`${h[0]} 這個週末是${h[1]}`);
 openDlg('📝 任務清單',L.length?L.join('<br>'):'目前沒有待辦事項',[['返回','',phoneHome]])}
function billView(){const L=billCalc(),tot=L.reduce((a,q)=>a+q[1],0),sv=insS().sav;
 openDlg('🧾 帳單',`每 4 個週末收假時從存款自動扣款（不夠再扣現金）${(yjS().home||yjS().wed)?'<br>💍 結婚後兩人生活，費用 ×1.8':''}<br><br>${L.map(q=>`${q[0]}　${NTD(q[1])}`).join('<br>')}<br><b>合計 ${NTD(tot)}</b>${st.billOwe?`<br>⚠️ 欠費 ${NTD(st.billOwe)}`:''}${sv?`<br>🐷 儲蓄險 5,000／月（已繳 ${sv.cnt} 期）`:''}`,[['返回','',phoneHome]])}
const _contacts=phoneMenu;
function phoneHome(){const n=apS().filter(x=>x.st==0).length;
 openDlg('📱 手機',`${cal().ic} ${cal().name}・第 ${cal().w} 週末　${String(T.hour|0).padStart(2,'0')}:${String((T.hour%1*60)|0).padStart(2,'0')}`,[
  ['📞 通訊錄','打電話、約時間',()=>_contacts(),0,1],['📅 約定','約朋友見面'+(n?`（${n}）`:''),()=>apPick(),0,1],['📝 任務','待辦清單',todoView,0,1],['📸 脆G','回憶貼文',()=>{closeDlg();feedView()},0,1],
  ['📈 股票','看盤、下單',()=>stkMenu(phoneHome),0,1],['🛡️ 保險','我的保單',insView,0,1],['🧾 帳單','每月費用',billView,0,1],['📷 相簿','劇情合照',()=>albumMenu(),0,1],['關閉','',closeDlg]],0,'grid')}
function apPick(){const ids=Object.keys(AP).filter(id=>FR[id]&&FRS(id).met);
 openDlg('📅 約朋友',ids.length?'要約誰？':'還沒有認識可以約的朋友。',ids.map(id=>[`${FR[id].ic} ${FR[id].n}`,apHas(id)?'已經有約了':(AP[id].map(a=>a[1]).join('・')),()=>apMenu(id,apPick),apHas(id)]).concat([['返回','',phoneHome]]))}
function insView(){const I=insS(),W=wkN();openDlg('🛡️ 我的保單',Object.keys(INS).map(k=>`${INS[k][0]}：${insOn(k)?`✅ 保障中（到第 ${I[k]} 個週末）`:'未投保'}`).join('<br>')+`<br>🐷 儲蓄險：${I.sav?`已繳 ${I.sav.cnt} 期，到期日第 ${I.sav.end} 個週末`:'未投保'}<br><br><span style="font-size:12px;opacity:.8">想投保請找禹豪（當面聊天或約他「聊保險」）。理賠金額為實際花費的 1.4 倍。</span>`,[['返回','',phoneHome]])}
phoneMenu=phoneHome;
