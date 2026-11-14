/* v9.2 第三階段：每週生活新聞、意外事件、警察局報案、診所就醫 */
const evS=()=>st.ev||(st.ev={cases:[],news:null});
const LNEWS=[
 {k:'typh',w:4,ok:c=>c.s==1||c.s==2,t:()=>`🌀 颱風「${['山陀兒','凱米','海葵','杜蘇芮','小犬'][Math.floor(Math.random()*5)]}」逼近，氣象署發布陸上警報`},
 {k:'crime',w:2,t:()=>['🏘️ 里內機車連續失竊，警方加強巡邏','🏘️ 夜市發生扒竊案，警方呼籲民眾注意隨身財物','🏘️ 詐騙集團假冒銀行行員，已有多位里民受害'][Math.floor(Math.random()*3)]},
 {k:'concert',w:2,t:()=>'🎤 天團高雄巨蛋開唱，門票秒殺！'},
 {k:'cash',w:1,ok:()=>!st.got10k,t:()=>'💰 政府宣布普發現金，每人一萬元！'},
 {k:'infl',w:2,t:()=>'🧾 物價持續上漲，水電瓦斯費調漲一成'},
 {k:'oil',w:2,t:()=>'⛽ 國際油價飆升，油價連三漲'},
 {k:'ent',w:3,t:()=>['🎬 國片票房破億，電影院場場爆滿','📺 綜藝天王宣布復出主持','🏀 職籃季後賽打到搶七，全台瘋籃球','🍜 美食節目來小鎮夜市取景'][Math.floor(Math.random()*4)]},
 {k:'calm',w:3,t:()=>['☀️ 本週天氣晴朗，適合出遊','🌧️ 梅雨鋒面報到，記得帶傘','🎉 小鎮里民運動會圓滿落幕'][Math.floor(Math.random()*3)]}];
function lnewsWeek(){const c=cal(wkN()+1),L=LNEWS.filter(n=>!n.ok||n.ok(c)),tot=L.reduce((a,n)=>a+n.w,0);let r=Math.random()*tot,n=L[0];for(const q of L){r-=q.w;if(r<=0){n=q;break}}
 const E=evS(),W=wkN()+1,t=n.t();E.news={w:W,k:n.k,t};let extra='';
 if(n.k=='typh'){st.typh=W;if(Math.random()<.35){st.skipW=W;extra='<br>⚠️ <b>颱風逼近，國軍取消下週末休假，全員留營待命！</b>'}else extra='<br>下個週末風雨交加：山區和海邊封閉、火車停駛。'}
 if(n.k=='cash')st.cash10k=W+4;if(n.k=='infl')st.inflU=W+4;if(n.k=='oil')st.oilU=W+4;if(n.k=='concert')st.concW=W;
 return `<br><br><b>🗞️ 小鎮新聞</b>：${t}${extra}`}
if(typeof loanWeek=='function'){const _lw=loanWeek;loanWeek=function(){let t=_lw.apply(this,arguments)||'';try{t+=lnewsWeek()}catch(e){}return t}}
// 物價、油價影響帳單
{const _bc=billCalc;billCalc=function(){const L=_bc.apply(this,arguments),W=wkN();return L.map(q=>{let v=q[1];if(st.inflU>=W&&/電|水|瓦斯/.test(q[0]))v=Math.round(v*1.1);if(st.oilU>=W&&/油/.test(q[0]))v=Math.round(v*1.3);return[q[0],v]})}}
// 颱風：天氣、火車停駛
const typhNow=()=>st.typh==wkN();
{const _w=weatherFx;weatherFx=function(dt){_w.apply(this,arguments);if(!typhNow()||scene&&!(rm&&rm.out))return;g.save();g.setTransform(K,0,0,K,0,0);g.fillStyle='rgba(20,30,50,.28)';g.fillRect(0,0,W,H);
 g.strokeStyle='rgba(200,220,255,.55)';g.lineWidth=.8;g.beginPath();for(let i=0;i<140;i++){const x=(i*53+NOW*.9)%(W+60)-30,y=(i*97+NOW*1.6)%(H+20)-10;g.moveTo(x,y);g.lineTo(x-9,y+14)}g.stroke();g.restore()}}
{const _t=trainMenu;trainMenu=function(){if(typhNow())return openDlg('🚉 火車停駛','「颱風警報期間，所有列車停駛，造成不便敬請見諒。」',[['好吧','',closeDlg]]);return _t.apply(this,arguments)}}
// 颱風留營
{const _wa=wkArrive;wkArrive=function(){if(st.skipW==wkN()){st.skipW=0;return openDlg('🌀 颱風留營',`颱風${evS().news&&evS().news.k=='typh'?'':''}逼近，部隊取消休假，所有人留營待命。<br>你在營區幫忙堆沙包、巡查營舍，看著窗外的狂風暴雨……<br><br>這個週末不能回小鎮了。`,[['😮‍💨 只好下週再見','',()=>{closeDlg();WK.busy=1;wkReturn()}]])}
 const r=_wa.apply(this,arguments);setTimeout(()=>whenFree(evArrive),5500);return r}}
// ───────── 意外事件 ─────────
const CASE={wallet:['👛 錢包遺失','派出所','報案'],scam:['💸 投資詐騙','派出所','報案'],crash:['🚗 車禍','派出所','備案'],typhcar:['🌀 颱風壓車','派出所','報案'],
 fracture:['🦴 打球骨折','診所','就醫'],cold:['🤒 重感冒','診所','住院治療']};
function caseAdd(k,d){evS().cases.push(Object.assign({k,w:wkN(),st:0},d||{}));SVDIRTY=1}
const caseOpen=k=>evS().cases.filter(c=>c.st==0&&(!k||c.k==k));
function evArrive(){const E=evS(),W=wkN(),n=E.news&&E.news.w==W?E.news:null,veh=st.veh&&(st.veh.car||st.veh.moto),ch=[];
 // 新聞帶來的事件
 if(st.cash10k>=W&&!st.got10k)toast('💰 普發現金開放領取！到銀行領一萬元');
 if(n&&n.k=='concert'&&FRS('yijia').met&&FRS('yijia').pt>=40){return openDlg('🎤 家宜傳 LINE','「天團開唱耶！我搶到兩張票了，這個週末陪我去好不好？😍」',[['🎫 一起去（門票 💰4,000）','4 小時・😊+25・💗 家宜 +6',()=>{if(funds()<4000)return toast('錢不夠喔');payOut(4000);advance(4);fxApply({j:25});frAdd('yijia',6,1);hud();closeDlg();feedPost('天團演唱會','跟家宜一起大合唱，喉嚨都啞了！');toast('🎤 全場大合唱，家宜哭得好慘！')}],['😅 這次不行','',()=>{closeDlg();frDrop('yijia',2)}]])}
 if(n&&n.k=='typh'&&veh&&Math.random()<.4){const left=bankPay(20000);return evShow('🌀 颱風壓車',`一夜狂風暴雨，早上出門一看——超商的招牌被吹下來，正好砸在你的${st.veh.car?'車':'機車'}上！<br>送修花了 <b>20,000</b>。<br><br>📝 記得到 <b>派出所</b> 報案、拿證明，才能申請保險理賠。`,'typhcar')}
 const r=Math.random();
 if(r<.04){st.money+=1000;return evShow('🧾 中發票','你翻了翻錢包裡的發票……中了 <b>1,000 元</b>！今天運氣真好。',null)}
 if(r<.10&&st.money>500){const lost=Math.min(st.money,Math.round(3000+Math.random()*5000));st.money-=lost;return evShow('👛 錢包不見了',`你摸了摸口袋——錢包不見了！裡面有 <b>${NTD(lost)}</b> 元現金。<br><br>📝 趕快到 <b>派出所</b> 報案，也許有人撿到會送回來。`,'wallet',{amt:lost})}
 if(r<.15&&veh){const left=bankPay(20000);return evShow('🚗 休假途中出車禍',`回家的路上，一台車突然從巷口衝出來，你閃避不及擦撞了！還好人沒事。<br>修車花了 <b>20,000</b>。<br><br>📝 要到 <b>派出所</b> 備案，保險才能理賠。`,'crash')}
 if(r<.20&&(st.joy<35||st.lastFaint>=dayKey()-3)){return evShow('🤒 重感冒','壓力太大加上作息不正常，你發高燒、全身痠痛……<br><br>🏥 要到 <b>診所</b> 住院治療一天（約 10,000）。在那之前體力恢復變差。','cold')}
 if(r<.28&&st.acct&&st.bank>20000){return openDlg('📞 陌生來電','「您好，這裡是銀行客服。系統偵測到您的帳戶被盜用，請立刻依照指示到 ATM 操作，把存款轉到安全帳戶……」',[
  ['😰 照對方的指示做','',()=>{const lost=Math.round(st.bank*.8);st.bank-=lost;closeDlg();evShow('💸 你被詐騙了！',`轉完帳才發現不對勁——存款只剩下 20%，被騙走了 <b>${NTD(lost)}</b>！<br><br>📝 趕快到 <b>派出所</b> 報案。`,'scam',{amt:lost})}],
  ['☎️ 掛斷，打 165 反詐騙專線','🧠+3',()=>{fxApply({w:3});closeDlg();toast('☎️ 165：「這是詐騙，您做得很好！」')}]])}
 if(r<.34&&st.acct){const s=STOCKS[Math.floor(Math.random()*STOCKS.length)];st.tip={c:s[0],ok:Math.random()<.5,w:W};return openDlg('🤫 小道消息',`朋友神秘兮兮地傳 LINE：「聽說 <b>${s[1]}</b> 下週有大利多，趕快買！」<br><span style="font-size:12px;opacity:.8">（消息不一定是真的，要不要買自己判斷）</span>`,[['知道了','',closeDlg]])}}
function evShow(t,html,k,d){if(k)caseAdd(k,d);hud();openDlg(t,html,[['知道了','',closeDlg]])}
// 小道消息：下週股價
{const _s=stkWeek;stkWeek=function(){const r=_s.apply(this,arguments);try{const tp=st.tip;if(tp&&tp.w<wkN()+1){const S=stkS();S.p[tp.c]=Math.round(S.p[tp.c]*(tp.ok?1.15:.88)*100)/100;S.c[tp.c]=(S.c[tp.c]||0)+(tp.ok?.15:-.12);st.tip=null}}catch(e){}return r}}
// 打球骨折
{const _fx=fxApply;fxApply=function(fx){const r=_fx.apply(this,arguments);try{if(fx&&fx.p>=1&&(fx.s||0)<0&&scene=='高雄運動中心'&&st.fracW!=wkN()&&!caseOpen('fracture').length&&Math.random()<.1){st.fracW=wkN();st.injury=1;setTimeout(()=>evShow('🦴 打球受傷了！','落地時腳一拐——喀！痛到站不起來。<br>看起來像是骨折了，走路只剩一半速度。<br><br>🏥 要到 <b>診所</b> 治療（半天、約 5,000）。','fracture'),400)}}catch(e){}return r}}
{const _vs=vSpeed;vSpeed=function(){const v=_vs.apply(this,arguments);return(st.injury&&!p.ride)?v*.5:v}}
// ───────── 派出所、診所：到現場處理 ─────────
function caseMenu(place){const L=caseOpen().filter(c=>CASE[c.k][1]==place);return L.map(c=>{const q=CASE[c.k];return[`📝 ${q[2]}：${q[0].replace(/^\S+\s/,'')}`,`第 ${c.w} 個週末發生`,()=>caseDo(c)]})}
function caseDo(c){c.st=1;closeDlg();const W=wkN();
 if(c.k=='wallet'){advance(1);c.due=dayKey()+1;evS().wl=c;return openDlg('👮 報案完成','警員做好筆錄：「如果有人撿到送來，我們會通知你。」<br><span style="font-size:12px;opacity:.8">（一天後會收到通知）</span>',[['謝謝','',closeDlg]])}
 if(c.k=='scam'){advance(2);c.due=W+1;evS().sc=c;return openDlg('👮 詐騙報案','警員嘆了口氣：「最近這種案子很多。我們會盡力追查，有消息會通知你。」<br><span style="font-size:12px;opacity:.8">（下個週末會有結果）</span>',[['拜託了','',closeDlg]])}
 if(c.k=='crash'||c.k=='typhcar'){advance(1);openDlg('👮 備案完成','警員開了事故證明給你：「拿這個去申請保險理賠。」',[['好','',closeDlg]]);if(!insClaim('prop',20000,'🚗 車損理賠。'))setTimeout(()=>toast('（沒有多功能產險，只能自認倒楣了……）'),800);return}
 if(c.k=='fracture'){advance(5);payOut(5000);st.injury=0;hud();openDlg('🏥 骨科治療','醫生幫你上了石膏：「年輕人打球要先熱身！」<br>治療了半天，花了 <b>5,000</b>。走路恢復正常速度了。',[['謝謝醫生','',closeDlg]]);if(!insClaim('acc',5000,'🦴 骨折醫療費理賠。'))setTimeout(()=>toast('（沒有意外險，醫藥費自己出……）'),800);return}
 if(c.k=='cold'){SLEEP=1;try{advance(24)}finally{SLEEP=0}payOut(10000);st.sta=Math.round(staMax()*.8);st.exh=0;hud();openDlg('🏥 住院治療','你在診所打點滴、睡了一整天。燒退了，醫生交代：「要多休息，別再熬夜了！」<br><br>住院治療費 <b>10,000</b>。',[['知道了','',closeDlg]]);if(!insClaim('med',10000,'🤒 住院醫療費理賠。'))setTimeout(()=>toast('（沒有醫療險，醫藥費自己出……）'),800)}}
{const _p=SP['派出所'];SP['派出所']=function(){const o=_p?_p.apply(this,arguments):[];return caseMenu('派出所').concat(o)}}
{const _c=SP['診所'];SP['診所']=function(){const o=_c?_c.apply(this,arguments):[];return caseMenu('診所').concat(o)}}
// 錢包、詐騙的後續通知
setInterval(()=>{try{const E=evS();
 if(E.wl&&dayKey()>=E.wl.due&&dlg.hidden&&!window.TITLE){const c=E.wl;E.wl=null;if(Math.random()<.5){st.money+=c.amt;hud();openDlg('📞 派出所來電',`「先生您好，有熱心民眾撿到您的錢包送來了，裡面的 ${NTD(c.amt)} 元都還在！」`,[['太好了！','',closeDlg]])}else openDlg('📞 派出所來電','「很抱歉，目前還沒有找到您的錢包。」',[['唉……','',closeDlg]])}
 if(E.sc&&wkN()>=E.sc.due&&dlg.hidden&&!window.TITLE){const c=E.sc;E.sc=null;if(Math.random()<.5){const v=Math.round(c.amt*.5);st.bank+=v;hud();openDlg('📞 派出所來電',`「詐騙集團的人頭帳戶被凍結了，追回一部分款項：<b>${NTD(v)}</b> 已經退回您的帳戶。」`,[['謝天謝地','',closeDlg]])}else openDlg('📞 派出所來電','「很遺憾，錢已經被轉到海外，追不回來了。以後要小心！」',[['……','',closeDlg]])}
 if(st.cash10k>=wkN()&&!st.got10k&&scene=='銀行'&&!st._c10)st._c10=1}catch(e){}},1000);
// 普發一萬：銀行領取
{const _b=SP['銀行'];SP['銀行']=function(){const o=_b.apply(this,arguments);if(st.cash10k>=wkN()&&!st.got10k)o.splice(0,0,['💰 領取普發現金','每人 10,000 元',()=>{st.got10k=1;st.money+=10000;hud();closeDlg();toast('💰 領到普發現金 10,000！')}]);return o}}
// 重感冒：體力恢復變差
{const _fx=fxApply;fxApply=function(fx){if(fx&&fx.s>0&&caseOpen('cold').length){fx=Object.assign({},fx,{s:Math.round(fx.s*.5)})}return _fx.call(this,fx)}}
// 任務清單顯示待處理的案件
{const _t=todoView;todoView=function(){const od=openDlg;openDlg=function(t,d,o,...r){if(t=='📝 任務清單'){const L=caseOpen().map(c=>`${CASE[c.k][0]}：要到 ${CASE[c.k][1]} ${CASE[c.k][2]}`);const n=evS().news;if(n&&n.w==wkN())L.unshift('🗞️ '+n.t);if(L.length)d=L.join('<br>')+(d&&d!='目前沒有待辦事項'?'<br>'+d:'')}return od.call(this,t,d,o,...r)};try{return _t.apply(this,arguments)}finally{openDlg=od}}}
