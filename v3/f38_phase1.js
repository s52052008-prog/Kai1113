/* v9.0 第一階段：季節年曆、作息與昏倒、時間暫停、體力上限與力竭、飽足感、健身打卡、收貨箱、每日總結、介面換膚 */
// ───────── 季節年曆（遊戲只算週末：一季 16 個週末，一年 64 個週末）─────────
const SEA=[['春','🌸',3],['夏','☀️',6],['秋','🍁',9],['冬','⛄',12]];
function cal(n){n=n||wkN();const i=(n-1)%64,s=Math.floor(i/16),w=i%16+1,mo=(SEA[s][2]+Math.floor((w-1)*3/16)-1)%12+1;return{yr:Math.floor((n-1)/64)+1,s,w,mo,name:SEA[s][0],ic:SEA[s][1]}}
const HOLI={'0-1':['🧧','春節'],'1-1':['🏖️','夏天開始'],'1-14':['🎂','冠宏生日'],'2-11':['🎃','萬聖節'],'3-5':['🎄','聖誕節']};
const holi=c=>{const h=HOLI[c.s+'-'+c.w];if(h&&h[1]=='春節'&&c.yr<2)return null;return h};
tm=function(){const hh=T.hour|0,mm=(T.hour%1*60/10|0)*10,c=cal(),h=holi(c),k=wkN()+'-'+T.day+'-'+hh+mm;if(k==tk)return;tk=k;
 tmEl.innerHTML=`<b>${c.ic} ${c.name}・第 ${c.w} 週末${h?'　'+h[0]+h[1]:''}</b><br>${c.mo} 月 ${WD[dow()]}　<span class="clk">${hh<6||hh>=19?'🌙':hh<9?'🌅':hh<17?'☀️':'🌇'} ${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}</span>　${['☀️','⛅','🌧️','💨'][wx()]}`};
// 節日：回家時觸發一次
function holiArrive(){const c=cal(),h=holi(c),key=wkN();if(!h)return;st.holi=st.holi||{};if(st.holi[key])return;st.holi[key]=1;
 if(h[1]=='春節'){st.money+=3600;addItem('cf_mullet',1);fxApply({j:15});hud();openDlg('🧧 新年快樂','春節到了！爸爸阿福提著一盒<b>烏魚子</b>來家裡，又塞給你一個紅包：「在部隊辛苦了，過年好好休息。」<br><br>💰 紅包 +3,600　🐟 烏魚子禮盒 ×1　😊 心情 +15',[['恭喜發財！','',closeDlg]])}
 else if(h[1]=='夏天開始')openDlg('🏖️ 夏天到了','天氣越來越熱，蟬聲大作。<br>聽說南部的海灘開始熱鬧起來了（海灘地圖之後的版本開放）。',[['好熱！','',closeDlg]]);
 else if(h[1]=='萬聖節'){fxApply({j:8});hud();openDlg('🎃 萬聖節','夜市掛滿南瓜燈，鄰居小朋友扮成小鬼來按門鈴：「不給糖就搗蛋！」<br>你把家裡的零食都分給他們了。<br><br>😊 心情 +8',[['🍬 Happy Halloween','',closeDlg]])}
 else if(h[1]=='聖誕節'){fxApply({j:20});['yilun','yuhao','yijia','rita','zhuyang'].forEach(k=>{try{if(FR[k]&&FRS(k).met)frAdd(k,2,1)}catch(e){}});hud();openDlg('🎄 聖誕快樂','教會的聖誕晚會好熱鬧：詩班獻詩、交換禮物，以倫牧師扮成聖誕老公公。<br>大家一起唱〈平安夜〉，你覺得心裡暖暖的。<br><br>😊 心情 +20　⛪ 教會朋友好感 +2',[['🎄 平安夜','',closeDlg]])}}
// ───────── 體力上限與力竭 ─────────
const staMax=()=>100+Math.min(60,Math.round((st.endu||0)*.6))+Math.min(100,(st.gym&&st.gym.bonus)||0)+Math.min(60,(st.caps||0)*20)+Math.min(40,(st.mush||0)*20)+(st.wf&&st.wf.ac?20:0);
{const _fx=fxApply;fxApply=function(fx){if(!fx||typeof fx!='object')return _fx.apply(this,arguments);const d=fx.s;let f=fx;if(d){f=Object.assign({},fx);delete f.s}
 _fx.call(this,f);if(d){st.sta=Math.max(-50,Math.min(staMax(),st.sta+d));if(st.sta<=0&&!st.exh){st.exh=1;setTimeout(()=>toast('😵 體力透支了！走路變慢，今天要好好休息'),300)}}
 try{if(fx.p>=1&&(fx.s||0)<=-10&&GYMSC.has(scene))gymTick()}catch(e){}}}
{const _vs=vSpeed;vSpeed=function(){const v=_vs.apply(this,arguments);return st.sta<=0&&!p.ride?v*.5:v}}
// ───────── 健身房長期訓練 ─────────
const GYMSC=new Set(['健身房','運動中心2F健身房','家6F']);
function gymS(){return st.gym||(st.gym={w:0,cnt:0,streak:0,last:0,bonus:0})}
function gymTick(){const g=gymS(),W=wkN();if(g.w!=W){g.w=W;g.cnt=0}g.cnt++;setTimeout(()=>toast(g.cnt>=2?'🏋️ 本週健身打卡完成！（連續 '+(g.streak+1)+' 週）':'🏋️ 本週健身 1/2，再練一次就打卡了'),400)}
function gymWeekEnd(){const g=gymS(),W=wkN();let msg='';
 if(g.w==W&&g.cnt>=2){g.streak++;g.last=W;msg=`🏋️ 健身打卡：連續 ${g.streak} 週`;if(g.streak%4==0&&g.bonus<100){g.bonus+=10;msg+=`<br>💪 <b>連續練滿一個月，體力上限 +10！</b>（目前上限 ${staMax()}）`}}
 else if(g.streak&&W-(g.last||0)>=2){g.streak=0;msg='🏋️ 已經兩週沒去健身，連續週數歸零了。'}
 return msg}
// ───────── 力量膠囊、神秘蘑菇、人參雞湯 ─────────
Object.assign(IT,{capsule:{n:'瑪卡基酸膠囊咖啡',i:'☕',d:'充滿瑪卡與基酸的膠囊咖啡。喝了體力上限永久 +20。',u:'cap'},
 mush:{n:'神秘蘑菇',i:'🍄',d:'發出微微光芒的蘑菇……吃了會怎樣呢？',u:'mush'},
 soup:{n:'人參雞湯',i:'🍲',d:'家宜燉的人參雞湯。喝了立刻解除力竭，明天體力完全恢復。',u:'soup'}});
{const _ui=useItem;useItem=function(k){const it=IT[k];if(!it||!st.inv[k])return _ui.apply(this,arguments);
 if(k=='capsule'){st.inv[k]--;st.caps=(st.caps||0)+1;hud();closeDlg();return openDlg('☕ 瑪卡基酸膠囊咖啡','一口喝下去，一股熱流從胸口擴散到四肢……<br><br>💪 <b>體力上限 +20</b>（目前上限 '+staMax()+'）',[['好猛！','',closeDlg]])}
 if(k=='mush'){st.inv[k]--;closeDlg();
  if(!st.mush&&!st.mushPend){st.mushPend=wkN()+1;payOut(15000);st.sta=Math.round(staMax()*.3);SLEEP=1;try{advance(T.hour<6?6-T.hour+24:30-T.hour+24)}finally{SLEEP=0}hud();
   return openDlg('🍄 神秘蘑菇','才吞下去沒多久，你就天旋地轉、冒冷汗，被救護車送到診所……<br>醫生說身體需要時間適應，你在病床上躺了一整天。<br><br>💸 醫藥費 -15,000<br><span style="font-size:12px;opacity:.8">（也許……過一陣子身體會有變化？）</span>',[['好難受……','',closeDlg]])}
  st.mush=(st.mush||0)+1;hud();return openDlg('🍄 神秘蘑菇','身體已經有抗體了。這次吃下去，只覺得一股力量湧上來！<br><br>💪 <b>體力上限 +20</b>（目前上限 '+staMax()+'）',[['力量！','',closeDlg]])}
 if(k=='soup'){st.inv[k]--;st.exh=0;st.sta=Math.max(st.sta,Math.round(staMax()*.5));st.full=Math.min(100,(st.full||0)+25);hud();closeDlg();return toast('🍲 熱騰騰的雞湯下肚，力竭解除了！（明天體力完全恢復）')}
 const u=it.u;if(u&&typeof u=='object'&&u.s>0){const f=fullOf(u.s);if((st.full||0)+f>100)return toast('🍚 吃太飽了，等一下再吃吧（飽足 '+Math.round(st.full)+'/100）');const r=_ui.apply(this,arguments);st.full=Math.min(100,(st.full||0)+f);hud();return r}
 return _ui.apply(this,arguments)}}
// ───────── 飽足感 ─────────
const fullOf=s=>Math.max(5,Math.min(60,Math.round(s*.8)));
const FOODSC=new Set(['餐廳','路邊攤','碳佐麻里','咖啡店','全家','山莊食堂','夜市','家樂福']);
const FOODT=/[🍜🍱🍔🍳🥤🍗🍢🍛🍲🥩☕🍰🧋🍞🍙🥟🍖🍚🍽🧊🥛🍦🍧🥘🦀🍣🥗🍤🍎🍫🍪]|吃|喝|飲料|餐|攤/;
{const od=openDlg;openDlg=function(t,d,opts,...r){try{const food=FOODSC.has(scene)||FOODT.test(t||'');
  if(food&&Array.isArray(opts))opts=opts.map(o=>{if(!o||typeof o[2]!='function'||typeof o[0]!='string')return o;const lab=o[0]+' '+(o[1]||'');
   if(/睡|休息|躺|泡|午覺|小睡|兼差|離開|返回|聊|購買物品|插曲|訂位|打工/.test(lab))return o;const m=lab.match(/⚡\s*\+(\d+)/),looks=m||/內用|吃|喝|套餐|便當|飲|點一|來一|\$\d/.test(lab);if(!looks)return o;
   const est=m?fullOf(+m[1]):10,fn=o[2],n=o.slice();
   if((st.full||0)+est>100){n[1]=(o[1]||'')+'　🍚 吃不下了';n[3]=true;return n}
   if(m)n[1]=(o[1]||'')+`　🍚+${est}`;
   n[2]=function(){const b=st.sta;const r2=fn.apply(this,arguments);const rise=st.sta-b;if(rise>0||m)st.full=Math.min(100,(st.full||0)+(rise>0?fullOf(rise):est));try{hud()}catch(e){}return r2};return n})}catch(e){}
 return od.call(this,t,d,opts,...r)}}
// ───────── 作息：睡覺、昏倒、每日總結 ─────────
let SLEEP=0;
const dayKey=()=>T.year*100+T.day;
{const _adv=advance;advance=function(h){const a0=(T.year*30+T.day)*24+T.hour;_adv(h);const a1=(T.year*30+T.day)*24+T.hour;
 st.full=Math.max(0,(st.full||0)-10*h);
 try{if(!SLEEP&&h<4&&!window.TITLE&&!(typeof MG!='undefined'&&MG)&&!(typeof WK!='undefined'&&WK.busy)&&wkIn()){const k=Math.floor((a0-2)/24)+1;if(k*24+2>a0&&k*24+2<=a1)setTimeout(faint,0)}}catch(e){}}}
function dayLogReset(){st.dl={inc:0,exp:0,m:st.money,b:st.bank,k:dayKey()}}
setInterval(()=>{try{if(!st.dl)dayLogReset();const L=st.dl;if(L.pm==null){L.pm=st.money;L.pb=st.bank;return}
 const dm=st.money-L.pm,db=st.bank-L.pb;L.pm=st.money;L.pb=st.bank;if(dm+db==0)return;if(dm+db>0)L.inc+=dm+db;else L.exp-=dm+db;
 if(st.sta<=0&&FRS('yijia').pt>=100&&st.soupW!=wkN()){st.soupW=wkN();sendMail('家宜','soup',1,'聽說你累壞了，這是我燉的人參雞湯，記得趁熱喝！')}}catch(e){}},300);
function daySummary(title){const L=st.dl||{inc:0,exp:0,m:st.money,b:st.bank},n=x=>x.toLocaleString('en-US'),net=L.inc-L.exp;
 return `<div style="display:grid;grid-template-columns:auto 1fr;gap:2px 12px;font-variant-numeric:tabular-nums">
 <span>💰 今日收入</span><b style="text-align:right;color:#2f7a3a">+${n(L.inc)}</b><span>💸 今日支出</span><b style="text-align:right;color:#b5532f">-${n(L.exp)}</b>
 <span>📊 淨額</span><b style="text-align:right">${net>=0?'+':''}${n(net)}</b><span>👛 現金</span><span style="text-align:right">${n(st.money)}</span><span>🏦 存款</span><span style="text-align:right">${n(st.bank)}</span>
 <span>⚡ 體力</span><span style="text-align:right">${Math.round(st.sta)} / ${staMax()}</span><span>😊 心情</span><span style="text-align:right">${st.joy}</span></div>`}
function wakeTo6(){const h=T.hour<6?6-T.hour:30-T.hour;SLEEP=1;try{advance(h)}finally{SLEEP=0}}
function goSleep(){if(st.rent&&st.rent.owed>=RENT*2){closeDlg();return rentTalk(null)}const tired=st.exh;
 openDlg('🌙 今天的總結',daySummary()+(tired?'<br><span style="color:#b5532f">😵 今天體力透支，明天只會恢復一半。</span>':''),[['😴 睡覺（明早 6:00 起床）','',()=>{closeDlg();
  const f=(st.exh?.5:1);wakeTo6();st.sta=Math.round(staMax()*f);st.exh=0;fxApply({h:10,j:3*(st.deco||0)+(typeof edBonus=='function'?edBonus():0)});dayLogReset();hud();toast(f<1?'🥱 昨天太累了，體力只恢復一半……':'☀️ 早安！新的一天開始了')}],['再等一下','',closeDlg]])}
function faint(){if(st._fainting)return;st._fainting=1;try{closeDlg()}catch(e){}
 const k0=dayKey(),sick=st.lastFaint==k0-1;st.lastFaint=k0;let pay,src;
 if(st.money>0){pay=Math.floor(st.money/10);st.money-=pay;src='現金'}else{pay=Math.floor(st.bank/10);st.bank-=pay;src='存款'}
 const sum=daySummary();
 try{if(scene){if(rm&&rm.mtn&&typeof mtnReset=='function')mtnReset();scene=null}const z=Z.find(z=>z.n=='家');enterB(z);closeDlg()}catch(e){}
 wakeTo6();let f=.6*(st.exh?.5:1),extra='';
 if(sick){const bill=5000;payOut(bill);fxApply({h:-20});f*=.5;extra=`<br><br>🤒 <b>連續兩天昏倒，你生病了！</b>被送到診所打點滴，醫藥費 -5,000，健康 -20。<br>身體越來越差了，一定要早點睡！`}
 st.sta=Math.round(staMax()*f);st.exh=0;dayLogReset();hud();st._fainting=0;
 openDlg('😵 你昏倒了','凌晨兩點還沒上床，你眼前一黑，倒在路邊……<br>好心的路人叫了計程車把你送回家。<br><br>'+`💸 被扣了 ${src} 的 1/10：<b>-${pay.toLocaleString('en-US')}</b>（車資和醫藥費）<br>⚡ 今天體力只有 ${Math.round(f*100)}%`+extra+'<br><br><b>昨天的總結</b>'+sum,[['……以後要早點睡','',closeDlg]])}
// 床：換成新的睡覺流程
{const _oh=openHome;openHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&opts[0]&&/^😴/.test(opts[0][0]))opts[0]=['😴 好好睡一覺','先看今天的總結，明早 6:00 起床',goSleep];return od.call(this,t,d,opts,...r)};try{return _oh.apply(this,arguments)}finally{openDlg=od}}}
// 溫泉泡 1 小時解除力竭
{const R=IN['岩之湯'];if(R&&R.spf)['pool','pool2','cedar'].forEach(k=>{const f0=R.spf[k];if(!f0)return;R.spf[k]=()=>{if(!st.exh)return f0();openDlg('♨️ 泡湯消除疲勞','你累壞了，泡個湯吧。',[['♨️ 泡 1 小時，解除力竭（💰500）','⚡ 恢復到一半・明天體力完全恢復',()=>{if(st.money<500)return toast('錢不夠喔');st.money-=500;advance(1);st.exh=0;st.sta=Math.max(st.sta,Math.round(staMax()*.5));fxApply({j:8});hud();closeDlg();toast('♨️ 熱水泡到肩膀，疲勞全消了！')},st.money<500],['一般泡湯','',f0],['離開','',closeDlg]])}})}
// ───────── 收貨箱 ─────────
function sendMail(from,k,n,msg){(st.mail=st.mail||[]).push({from,k,n,msg,w:wkN()});setTimeout(()=>toast('📦 '+from+' 寄了東西到你家的收貨箱'),200)}
function mailMenu(){const M=st.mail||[];if(!M.length)return openDlg('📦 收貨箱','箱子裡空空的。',[['離開','',closeDlg]]);
 openDlg('📦 收貨箱',`有 ${M.length} 個包裹`,M.map((m,i)=>[`📦 ${m.from} 寄來的${IT[m.k]?IT[m.k].n:''}`,m.msg,()=>{if(!addItem(m.k,m.n))return toast('背包滿了');M.splice(i,1);hud();toast('收下了：'+IT[m.k].n);mailMenu()}]).concat([['離開','',closeDlg]]))}
{const R=IN['家'];if(R){R.fur.push(['uaf',488,96,26,8,'lf_175',1,{hm:99}]);R.sp.push(['mail',470,106,52,10]);R.spl.mail='收貨箱';R.spf.mail=mailMenu}}
// ───────── 回家／收假 ─────────
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);dayLogReset();
 whenFree(()=>{holiArrive();
  if(st.mushPend&&wkN()>=st.mushPend){st.mushPend=0;st.mush=(st.mush||0)+1;whenFree(()=>openDlg('🍄 身體的變化','早上起床，你發現自己精神特別好，爬樓梯也不喘了。<br>好像是上週那顆神秘蘑菇……身體適應了！<br><br>💪 <b>體力上限 +20</b>（目前上限 '+staMax()+'）',[['原來如此！','',closeDlg]]))}
  try{const c=cal();if(c.s==1&&c.w==14){st.bdY=st.bdY||{};if(!st.bdY[c.yr]){if(yjS().wed&&!(st.ph&&st.ph.laptop)&&typeof laptopGift=='function'){st.bdY[c.yr]=1;whenFree(laptopGift)}else if(st.ph&&st.ph.laptop){st.bdY[c.yr]=1;whenFree(bdCoin)}}}}catch(e){}});return r}}
{const _wr=wkReturn;wkReturn=function(){const gm=gymWeekEnd();const r=_wr.apply(this,arguments);setTimeout(()=>{st.sta=Math.max(st.sta,Math.round(staMax()*.7));hud();if(gm)whenFree(()=>openDlg('🏋️ 健身紀錄',gm,[['繼續加油','',closeDlg]]))},12000);return r}}
// ───────── 時間暫停提示 ─────────
setInterval(()=>{const paused=!dlg.hidden||window.TITLE||(typeof MG!='undefined'&&MG)||(typeof ED!='undefined'&&ED.on);tmEl.classList.toggle('paused',!!paused)},200);
// ───────── 介面換膚（使用冠宏的 UI 素材）─────────
(function(){const css=`
#hud,#tm,#qp{background:linear-gradient(#fffaf0,#f7ead0)!important;border:2px solid #6b4423!important;border-image:none!important;border-radius:10px!important;box-shadow:inset 0 0 0 2px #fff6e0,inset 0 0 0 3px #e2c48e,0 4px 12px rgba(40,20,5,.35)!important;color:#3a2210!important;padding:8px 10px!important}
#tm{white-space:nowrap}#qp{top:66px!important}@media (min-width:640px){#qp{top:72px!important}}
#hud .text-amber-200,#qp .text-amber-200{color:#8a4a12!important}
#tm .paused,#tm.paused .clk{color:#999!important;animation:tmBlink 1s steps(2) infinite}
@keyframes tmBlink{50%{opacity:.35}}
#hud img,#tm img,#qp img{display:inline-block}
.hhead{display:flex;gap:8px;align-items:center;margin-bottom:6px}.hhead .nm{min-width:0;line-height:1.25}.hhead .nm b{font-size:13px}.hhead .job{color:#8a4a12;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sb{display:flex;align-items:center;gap:5px;margin:3px 0}.sb img{width:15px;height:15px;object-fit:contain;flex:none}
.sb .tr{flex:1;height:9px;background:#4a2e18;border-radius:5px;position:relative;min-width:40px;overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.7)}
.sb .tr i{position:absolute;left:0;top:0;bottom:0;max-width:100%;border-radius:5px;box-shadow:inset 0 2px 0 rgba(255,255,255,.35)}
.sb b{font-size:10px;min-width:46px;text-align:right;font-variant-numeric:tabular-nums;color:#5a3417}
.money{display:flex;gap:6px;align-items:center;margin-top:6px;padding-top:6px;border-top:1px dashed #d8b984;font-weight:700;font-variant-numeric:tabular-nums;font-size:13px}
.money span{display:inline-flex;align-items:center;gap:4px;white-space:nowrap;background:#fff3d6;border:1px solid #e2c48e;border-radius:12px;padding:1px 8px 1px 4px}.money img{width:15px;height:15px;object-fit:contain}
.money small{font-size:10px;font-weight:400;color:#8a6a4a}
.hstat{display:grid;grid-template-columns:1fr 1fr;gap:1px 8px;margin-top:5px;font-size:11.5px}.hstat .w{grid-column:span 2}
.rpg{border:3px solid #5a3417!important;border-image:none!important;border-radius:12px!important;background:linear-gradient(#fffaf0,#f3e2bc)!important;box-shadow:inset 0 0 0 2px #fff6e0,inset 0 0 0 4px #d9b67a,0 12px 34px rgba(0,0,0,.55)!important;color:#3a2210!important;padding:14px 14px 12px!important}
.rpg::before,.rpg::after{display:none}
.rdesc{border:1px solid #d9b67a!important;border-image:none!important;border-radius:8px!important;background:#fffaf0!important;box-shadow:inset 0 1px 3px rgba(120,80,30,.15)!important;padding:10px 12px!important}
.rttl{color:#5a2e0e!important;text-shadow:none!important}.rttl::after{background:linear-gradient(90deg,#b07a3a,transparent)!important}
`;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s)})();
const SB=(ic,v,mx,col,lab)=>`<div class="sb" title="${lab}"><img src="ui/${ic}.png" alt="${lab}"><div class="tr"><i style="width:${Math.max(0,Math.min(1,v/mx))*100}%;background:${col}"></i></div><b>${Math.round(v)}/${mx}</b></div>`;
{const _h=hud;hud=function(){_h.apply(this,arguments);try{const job=st.cp<0?'職業軍人・週末休假':jobName();const mx=staMax();
 hudEl.innerHTML=`<div class="hhead"><canvas id="av" width="80" height="80" style="width:40px;height:40px;flex:none;cursor:pointer;border:2px solid #8a5a2e;border-radius:50%;background:#e8d3a6" title="點頭像開背包（B）"></canvas><div class="nm"><b>${st.name}</b> <span style="font-size:11px">${age()}歲</span><div class="job">💼 ${job}</div></div></div>
 ${SB('i_heart',st.hp,100,'linear-gradient(#ff7a7a,#d42a2a)','健康')}${SB('i_drop',Math.max(0,st.sta),mx,st.sta<=0?'linear-gradient(#999,#666)':'linear-gradient(#6ab8ff,#1f6fd0)',st.sta<=0?'體力（力竭！）':'體力')}${SB('i_food',st.full||0,100,'linear-gradient(#a8e86a,#4a9a2a)','飽足')}${SB('i_joy',st.joy,100,'linear-gradient(#ffe06a,#e89a10)','心情')}
 <div class="money"><span title="現金"><img src="ui/i_coin.png" alt="現金">${st.money.toLocaleString('en-US')}</span><span title="銀行存款"><img src="ui/i_house.png" alt="存款">${st.bank.toLocaleString('en-US')}</span></div>
 ${st.sta<=0?'<div style="color:#b5532f;font-weight:700;font-size:11px;margin-top:3px">😵 力竭：走路變慢</div>':''}
 <div class="hstat" style="${hudOpen?'':'display:none'}"><span>🧠 智慧 ${st.wis}</span><span>⭐ 名聲 ${st.rep}</span><span>✨ 魅力 ${st.look}</span><span>⚔️ 力量 ${st.pow}</span><span>🐾 ${st.pet||'無寵物'}</span><span>🎒 ${bagCount()}/${st.cap}</span><span class="w">💍 ${st.partner||'單身'}・🏋️ 連續 ${(st.gym&&st.gym.streak)||0} 週</span></div>`;
 const a=document.getElementById('av').getContext('2d');a.drawImage(portrait('me',{n:'me'}),0,0,80,80)}catch(e){}}}

// 生日（筆電之後的每一年）：生日金幣，可到銀行兌換
IT.bcoin={n:'生日金幣',i:'🪙',d:'刻著 8/18 的小金幣。可以到銀行兌換 💰5,000。',u:'keep'};
IT.tcoin={n:'寶藏金幣',i:'🏅',d:'古老的寶藏金幣，閃閃發亮。可以到銀行兌換 💰20,000。',u:'keep'};
function bdCoin(){addItem('bcoin',1);fxApply({j:15});try{if(FRS('yijia').met)frAdd('yijia',2,1)}catch(e){}hud();openDlg('🎂 生日快樂','今天是 8 月 18 日，你的生日。'+(yjS().wed?'家宜做了一桌菜，還偷偷在你的碗底藏了一枚小金幣：「生日快樂，老公！」':'爸爸阿福傳來祝福訊息，郵差也送來一個小包裹，裡面是一枚小金幣。')+'<br><br>🪙 獲得 生日金幣 ×1（可到銀行兌換 💰5,000）　😊 心情 +15',[['謝謝！','',closeDlg]])}
{const _b=SP['銀行'];SP['銀行']=function(){const o=_b.apply(this,arguments),n1=st.inv.bcoin||0,n2=st.inv.tcoin||0;
 if(n1||n2)o.splice(1,0,['🪙 兌換金幣',`生日金幣 ×${n1}（每枚 5,000）・寶藏金幣 ×${n2}（每枚 20,000）`,()=>{const v=n1*5000+n2*20000;st.inv.bcoin=0;st.inv.tcoin=0;st.money+=v;hud();closeDlg();toast('🪙 金幣兌換完成：💰+'+v.toLocaleString('en-US'))}]);return o}}
