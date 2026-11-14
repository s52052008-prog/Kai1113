/* v13.0 體力成長線：力竭／昏倒 → 主臥改造＋早睡挑戰（睡醒「充飽電」）、體能等級（心肺訓練讓體力上限變高）、
   廚房沒有瓦斯爐和抽油煙機 → 家樂福買 → 師傅安裝 → 開伙、自己的菜下廚、週末備餐 */
const grS=()=>st.gr||(st.gr={bed:0,bedSt:0,kit:0,endT:0});
const ENDR=()=>0;
// ───────── 體力消耗：充飽電先扣 ─────────
{const _fx=fxApply;fxApply=function(fx){if(fx&&typeof fx=='object'&&fx.s<0){let d=fx.s*(1-ENDR());const c=st.chg||0;
 if(c>0){const a=Math.min(c,-d);st.chg=c-a;d+=a}fx=Object.assign({},fx,{s:Math.round(d*10)/10});if(fx.s===0)delete fx.s}return _fx.call(this,fx)}}
// ───────── 家樂福：家電・寢具 ─────────
const GRIT=[['g_stove','🔥','雙口瓦斯爐',8900,'開伙必備。買回家後請師傅安裝。'],['g_hood','💨','抽油煙機',12900,'沒有它，煮一餐整間屋子都是油煙。買回家後請師傅安裝。'],
 ['g_bed','🛏️','獨立筒床墊（雙人）',16800,'睡得好，體力才回得來。家樂福免費送貨到府。'],['g_curt','🪟','遮光窗簾',2400,'一早不會被太陽曬醒，睡眠品質更好。']];
GRIT.forEach(q=>IT[q[0]]={n:q[2],i:q[1],p:Math.round(q[3]*.3),d:q[4],u:'keep'});
function grOwned(k){const G=grS();return k=='g_stove'||k=='g_hood'?G.kit>=3||(k=='g_stove'?G.st1:G.hd1):G.bed>=2||(k=='g_bed'?G.bd1:G.ct1)}
function grShop(){const o=GRIT.map(q=>{const has=(st.inv[q[0]]||0)>0||grOwned(q[0]);return[`${q[1]} ${q[2]}　💰${q[3].toLocaleString('en-US')}`,has?'已經有了':q[4],()=>{if(!addItem(q[0],1))return;st.money-=q[3];hud();toast('🛒 買了'+q[2]+'！');grShop()},has||st.money<q[3]]});
 openDlg('🏠 家樂福・家電寢具'+`（💰${st.money.toLocaleString('en-US')}）`,'老房子缺的東西，這裡都買得到。',o.concat([['返回','',()=>mainMenu('家樂福')]]))}
wrapSP('家樂福',o=>o.splice(1,0,['🏠 家電・寢具','瓦斯爐、抽油煙機、床墊、遮光窗簾',grShop]));

// ═════════ ① 主臥改造：力竭或昏倒後觸發 ═════════
function grBedStory(){const G=grS();if(G.bed)return;G.bed=1;SVDIRTY=1;const w=gwWed();
 openDlg('🛏️ 身體在抗議',(w?'家宜把熱毛巾蓋在你額頭上，眼眶紅紅的：<br>「你最近是不是都沒睡好？每天早上起來都在揉腰……」<br>「我們那張床是搬家時從二手店買的，彈簧早就塌了啦！」':'你倒在床上，腰一陣一陣地痠。<br>這張床是搬家時從二手店買的，彈簧早就塌了，一躺下去就陷一個洞。<br>早上六點，太陽直直曬進來，根本睡不飽。')+
  `<br><br><b>🏠 主臥改造計畫</b><br>① 到家樂福「🏠 家電・寢具」買 <b>🛏️ 獨立筒床墊</b>（💰16,800）<br>② 再買一副 <b>🪟 遮光窗簾</b>（💰2,400）<br>③ 回家在床邊換上，然後<b>連續 5 晚在 12 點前睡覺</b>，把作息調回來`,
  [[w?'「好，聽老婆的！」':'好，來改造主臥！','',closeDlg]])}
{const _o=fxApply;fxApply=function(){const e0=st.exh;const r=_o.apply(this,arguments);try{if(!e0&&st.exh&&!grS().bed)setTimeout(()=>whenFree(grBedStory),1200)}catch(e){}return r}}
{const _f=faint;faint=function(){const r=_f.apply(this,arguments);try{if(!grS().bed)setTimeout(()=>whenFree(grBedStory),800)}catch(e){}return r}}
function grBedMenu(){const G=grS(),hb=(st.inv.g_bed||0)>0,hc=(st.inv.g_curt||0)>0;
 if(G.bed<=1){const ok=hb&&hc;return openDlg('🛏️ 主臥改造',`${hb?'✅':'⬜'} 🛏️ 獨立筒床墊${hb?'（已經買了）':'：家樂福「🏠 家電・寢具」'}<br>${hc?'✅':'⬜'} 🪟 遮光窗簾${hc?'（已經買了）':'：家樂福「🏠 家電・寢具」'}<br>⬜ 連續 5 晚 12 點前睡覺`,
  [['🔧 換上新床墊、掛上窗簾（1 小時）',ok?'自己動手，舊床墊請清潔隊載走':'東西還沒買齊',()=>{st.inv.g_bed--;st.inv.g_curt--;G.bed=2;G.bedSt=0;advance(1);fxApply({j:10});hud();SVDIRTY=1;closeDlg();
   openDlg('🛏️ 換好了！',(gwWed()?'家宜第一個撲上去：「哇——好軟！你快躺躺看！」<br>':'')+'新床墊躺下去，整個人被穩穩托住；窗簾一拉，房間暗得剛剛好。<br><br>🌙 <b>早睡挑戰開始</b>：連續 5 晚在 12 點前上床。<br><span style="font-size:12px;opacity:.8">（超過 12 點才睡或昏倒，會重新計算）</span>',[['今晚就早點睡！','',closeDlg]])},!ok],['返回','',openHome]])}
 if(G.bed==2)return openDlg('🛏️ 主臥改造','✅ 🛏️ 獨立筒床墊<br>✅ 🪟 遮光窗簾<br>'+`🌙 早睡挑戰：<b>${G.bedSt}/5</b> 晚（12 點前上床）`,[['返回','',openHome]]);
 openDlg('🛏️ 主臥','新床墊＋遮光窗簾，作息也調回來了。<br>☀️ 每天早上睡醒都會「充飽電」：多一段 <b>體力上限 20%</b> 的額外體力（先用掉）。',[['返回','',openHome]])}
{const _oh=openHome;openHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(Array.isArray(opts)&&/床/.test(t)){const G=grS();
  if(G.bed>=1)opts.splice(1,0,[G.bed>=3?'🛏️ 主臥（已改造）':'🛏️ 主臥改造'+(G.bed==2?`（早睡 ${G.bedSt}/5）`:''),G.bed>=3?'睡醒充飽電 +20%':G.bed==2?'連續 5 晚 12 點前睡覺':'床墊、窗簾、早睡挑戰',grBedMenu]);
  const i=opts.findIndex(q=>q&&typeof q[0]=='string'&&q[0].includes('下廚'));if(i>=0&&G.kit<3)opts[i]=['🍳 下廚（還不能開伙）','廚房沒有瓦斯爐和抽油煙機',()=>{closeDlg();kitMenu()}]}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _oh.apply(this,arguments)}finally{openDlg=od}}}
// 早睡挑戰＆充飽電：睡覺都會經過 wakeTo6
{const _w=wakeTo6;wakeTo6=function(){const G=grS(),h=T.hour,faint0=!!st._fainting;const r=_w.apply(this,arguments);
 try{if(G.bed==2){if(!faint0&&h>=18&&h<24){G.bedSt++;if(G.bedSt>=5){G.bed=3;setTimeout(()=>whenFree(()=>growCard('一覺到天亮',(gwWed()?'家宜伸了個大懶腰：「好久沒看你早上這麼有精神了！」<br>':'')+'連續五天早睡，配上新床墊和遮光窗簾——早上六點自然醒，整個人像充飽電一樣。','睡醒只回到體力上限，晚睡還常常昏倒','睡醒「充飽電」：額外 +20% 體力（先用掉）<br>12 點前睡，隔天狀態更好')),1500)}
   else setTimeout(()=>toast(`🌙 早睡挑戰 ${G.bedSt}/5`),2600)}else if(G.bedSt>0){G.bedSt=0;setTimeout(()=>toast('🌙 太晚睡了……早睡挑戰重新計算（0/5）'),2600)}}
  if(G.bed>=3&&!faint0)setTimeout(()=>{if(!st._fainting){st.chg=Math.round(staMax()*.2);hud()}},50);else st.chg=0}catch(e){}return r}}

// ═════════ ② 體能等級：耐力讓所有活動更省體力 ═════════
const ENDT=[[12,'體能 Lv1','今天練完間歇跑，下樓梯的時候腳步居然很輕。'],[30,'體能 Lv2','以前忙一整天就累癱，現在晚上還有力氣陪家人散步。'],[60,'體能 Lv3','跑完五公里，呼吸很快就平穩下來。身體記得每一次的訓練。'],[100,'體能 MAX','你的心肺像換了一顆引擎。這就是健身教練的身體。']];
setInterval(()=>{try{if(window.TITLE||!dlg.hidden||MG)return;const G=grS(),e=st.endu||0;if(G.endT>=ENDT.length||e<ENDT[G.endT][0])return;const q=ENDT[G.endT],pb=G.endT?Math.min(60,Math.round(ENDT[G.endT-1][0]*.6)):0;G.endT++;SVDIRTY=1;
 growCard('體能升級：'+q[1],q[2]+'<br><span style="font-size:12px;opacity:.8">（健身房「間歇跑」「棒式」會讓體力上限變高）</span>',`健身訓練讓體力上限 +${pb}`,`體力上限<b>再 +${Math.min(60,Math.round(q[0]*.6))-pb}</b>（訓練加成 +${Math.min(60,Math.round(q[0]*.6))}）<br>目前上限 ${staMax()}`)}catch(e){}},2500);
// 已經練很多的存檔：直接跳到對應等級，不連續彈出
setTimeout(()=>{try{const G=grS();if(G.endT==0){let i=0;while(i<ENDT.length&&(st.endu||0)>=ENDT[i][0]*2)i++;G.endT=i}}catch(e){}},1600);

// ═════════ ③ 廚房：瓦斯爐＋抽油煙機 → 開伙、自家菜、週末備餐 ═════════
IT.homebox={n:'自己做的便當',i:'🍱',p:40,d:'週末備餐做的便當，用料實在。⚡+35 😊+5 ❤️+2',u:{s:35,j:5,h:2}};
const vegN=()=>typeof vegCount=='function'?vegCount():Object.keys(st.inv).filter(k=>k.startsWith('veg_')).reduce((a,k)=>a+(st.inv[k]||0),0);
const vegUse=n=>{if(typeof useVeg=='function')return useVeg(n);Object.keys(st.inv).filter(k=>k.startsWith('veg_')).forEach(k=>{const t=Math.min(n,st.inv[k]||0);st.inv[k]-=t;n-=t})};
function kitMenu(){const G=grS(),w=gwWed();
 if(!G.kit){G.kit=1;SVDIRTY=1;return openDlg('🍳 廚房','老公寓的廚房只有一個水槽、一台微波爐和電鍋。<br><b>沒有瓦斯爐，也沒有抽油煙機</b>——根本沒辦法開伙。<br><br>'+(w?'家宜看著流理台嘆氣：「每天吃外面又貴又油……我們自己煮好不好？」':'每天吃外面，又貴又油。如果能自己煮就好了……')+'<br><br><b>🍳 廚房改造計畫</b><br>① 到家樂福「🏠 家電・寢具」買 <b>🔥 瓦斯爐</b>（💰8,900）<br>② 再買 <b>💨 抽油煙機</b>（💰12,900）<br>③ 回家請<b>師傅來安裝</b>（💰2,000）',[['好，開始存錢！','',closeDlg]])}
 const hs=(st.inv.g_stove||0)>0,hh=(st.inv.g_hood||0)>0,ok=hs&&hh,o=[];
 if((st.inv.lunch||0)+(st.inv.homebox||0)>0)o.push(['📦 用微波爐熱便當','',()=>{const k=(st.inv.homebox||0)>0?'homebox':'lunch';closeDlg();useItem(k);closeDlg()}]);
 o.push(['📞 請師傅來安裝（💰2,000・2 小時）',ok?'瓦斯爐、抽油煙機都買好了':'東西還沒買齊',()=>{st.money-=2000;st.inv.g_stove--;st.inv.g_hood--;G.kit=3;advance(2);hud();SVDIRTY=1;closeDlg();
  growCard('我們家可以開伙了！','師傅拉好瓦斯管、鑽孔裝上抽油煙機，試點火——「啪」一聲，藍色的火焰穩穩地燒起來。'+(w?'<br>家宜在旁邊拍手：「今天晚上我來煮番茄炒蛋！」':''),'沒有瓦斯爐，只能吃外食或微波便當','可以下廚：自己種的菜、家常菜<br>週末<b>備餐</b>：一次做 5 個便當，平日帶著走')},!ok||st.money<2000]);
 o.push(['離開','',closeDlg]);
 openDlg('🍳 廚房（還不能開伙）',`${hs?'✅':'⬜'} 🔥 瓦斯爐${hs?'':'：家樂福「🏠 家電・寢具」'}<br>${hh?'✅':'⬜'} 💨 抽油煙機${hh?'':'：家樂福「🏠 家電・寢具」'}<br>⬜ 請師傅安裝（💰2,000）`,o)}
{const _ha=homeAct;homeAct=function(k){if(k!='cook')return _ha.apply(this,arguments);const G=grS();if(G.kit<3)return kitMenu();
 const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)){const W=wkN(),done=G.prep==W,vn=vegN(),cl=opts.pop();
   opts.push(['🥬 用自己種的菜煮一桌（2 份菜・1 小時）','⚡+45 😊+8 ❤️+4・頂樓菜園的菜最香',()=>{vegUse(2);fxApply({s:45,j:8,h:4});st.full=Math.min(100,(st.full||0)+35);advance(1);hud();closeDlg();toast(gwWed()?'🥬 家宜炒了一盤自己種的青菜：「我們家的菜就是甜！」':'🥬 自己種的菜，清炒就很甜。')},vn<2]);
   opts.push(['🍱 備餐：一次做 5 個便當（2 小時）',done?'這週已經備過餐了':`💰${vn>=2?150:400}${vn>=2?'＋2 份自己種的菜':''}・做好放進背包，平日按 E 就能吃（⚡+35）`,()=>{const c=vn>=2?150:400;if(!addItem('homebox',5))return;if(vn>=2)vegUse(2);st.money-=c;G.prep=W;advance(2);hud();SVDIRTY=1;closeDlg();
     if(!G.prep1){G.prep1=1;growCard('備餐達人','五個便當盒整整齊齊排在流理台上，雞胸、糙米、青菜，營養均衡。','肚子餓了就得出門找東西吃，花錢又花時間','背包裡隨時有自己做的便當<br>快捷欄選便當按 E，走到哪吃到哪（⚡+35）')}else toast('🍱 5 個便當做好了，放進背包！')},done||st.money<(vn>=2?150:400)]);
   opts.push(cl);d=(gwWed()?'瓦斯爐、抽油煙機都裝好了，家宜的圍裙掛在牆上。':'瓦斯爐、抽油煙機都裝好了，隨時可以開伙。')}return od.call(this,t,d,opts,...r)};try{return _ha.apply(this,arguments)}finally{openDlg=od}}}
// 成長紀錄放進手機選單
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i<0?opts.length:i,0,['🌟 成長紀錄','以前 vs 現在',growLog,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
