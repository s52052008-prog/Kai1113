/* ===== v6.2 交友節奏、家宜人生路線、冷淡事件、拳擊月賽、派出所志工 ===== */
const wkN=()=>wkState().n;
const yjS=()=>st.yj||(st.yj={t1:0,t2:0,faith:0,church:0,calls:0,bapt:0,coun:0,photo:0,prop:0,wed:0,home:0});
function whenFree(fn,need){const t=setInterval(()=>{if(window.TITLE||!dlg.hidden||(typeof FG!='undefined'&&FG)||(typeof MG!='undefined'&&MG))return;if(need&&!need())return;clearInterval(t);try{fn()}catch(e){console.error(e)}},500)}
const f80=()=>Object.keys(FR).filter(k=>k!='yijia'&&st.fr&&st.fr[k]&&st.fr[k].pt>=80).length;

// ── 好感等級名稱（家宜 0–200） ──
const YJL=[[0,'初識'],[8,'認識'],[25,'朋友'],[50,'好友'],[80,'曖昧'],[100,'交往中'],[140,'論及婚嫁'],[160,'未婚夫妻'],[180,'夫妻'],[200,'一家人']];
function frLab(id,pt){if(id!='yijia')return FRL[frLv(pt)][1];const y=yjS();let l='初識';
 YJL.forEach(x=>{if(pt>=x[0])l=x[1]});if(pt>=100&&st.partner!='劉家宜')l='曖昧';if(pt>=160&&!y.prop)l='論及婚嫁';if(pt>=180&&!y.wed)l='未婚夫妻';if(pt>=200&&!y.home)l='夫妻';return l}
function yjCap(){const y=yjS();if(!y.t1)return 59;if(!y.t2)return 79;if(st.partner!='劉家宜')return 99;if(!y.bapt)return 139;if(!y.prop)return 159;if(!y.wed)return 179;return 200}
const YJHINT=()=>{const y=yjS();return !y.t1?'家宜最近好像很忙，社福中心似乎需要人手……':!y.t2?'也許可以邀家宜一起參加教會的活動。':st.partner!='劉家宜'?'準備一束玫瑰花束，約她去花園廣場散步吧。':!y.bapt?'和家宜一起上真道問答、常常通電話、一起去教會。':!y.prop?'婚姻輔導、西子灣婚紗、身邊的好朋友們……都準備好了嗎？':!y.wed?'是時候請以倫牧師證婚了。':''};

// ── 好感增加：每週末有上限（一般朋友 15、家宜 11）；事件獎勵不受限 ──
function frAdd(id,n,ev){const f=FRS(id),W=wkState(),before=f.pt,lb=frLab(id,before);
 if(n>0&&!ev){if(!f.wb||f.wb.w!=W.n)f.wb={w:W.n,g:0};const room=(id=='yijia'?(window.PROYJCAP?PROYJCAP():11):15)-f.wb.g;
  if(room<=0){if(!f.wb.msg){f.wb.msg=1;setTimeout(()=>toast(`（這個週末和${FR[id].n}已經相處很多了，感情需要時間慢慢累積）`),900)}n=0}else{n=Math.min(n,room);f.wb.g+=n}}
 if(n>0)f.lastW=W.n;
 const cap=id=='yijia'?yjCap():100;
 if(n>0){f.pt=Math.max(f.pt,Math.min(cap,f.pt+n));if(id=='yijia'&&before+n>cap&&f.capW!=W.n){f.capW=W.n;const h=YJHINT();if(h)setTimeout(()=>toast('💭 '+h),1500)}}
 else f.pt=Math.max(0,f.pt+n);
 const la=frLab(id,f.pt);if(la!=lb&&f.pt>before)toast(`💞 你和${FR[id].n}的關係提升了：${la}`);
 if(id=='yijia')yjCheck()}
function frFloor(id){const pt=FRS(id).pt,L=id=='yijia'?YJL:FRL;let fl=0;L.forEach(x=>{if(pt>=x[0])fl=x[0]});return fl}
function frDrop(id,n){const f=FRS(id);f.pt=Math.max(frFloor(id),f.pt-n)}

// ── 人際關係畫面 ──
function friendsMenu(){const o=Object.keys(FR).map(id=>{const F=FR[id],s=FRS(id);return s.met?[`${F.ic} ${F.n}${st.partner==F.n?' 💍':''}　${frLab(id,s.pt)}${frHearts(id)}`,F.who+'・好感 '+s.pt+'/'+(id=='yijia'?200:100),()=>friendInfo(id)]:['❔ ？？？',(id=='yijia'?'📍 平日 7:00–8:00 在全家、白天上班；週六 10:00–16:00 在咖啡廳；週末 16:30–19:30 在公園。':'尚未認識。留意教會、公園與咖啡廳。'),()=>{},true]});
 o.push(['關閉','',closeDlg]);openDlg('👥 人際關係',(st.partner?`伴侶：<b>${st.partner}</b>（${frLab('yijia',FRS('yijia').pt)}）`:'尚未有伴侶（心裡惦記的人：劉家宜）')+`<br><span class="text-[11px] opacity-80">好感 80 以上的好朋友：${f80()} 位</span>`,o)}
function friendInfo(id){const F=FR[id],s=FRS(id),lv=frLv(s.pt);let ex='';
 if(id=='yijia'){const y=yjS(),ck=b=>b?'✅':'⬜';ex=`<br><br><b>💗 我們的故事</b><br>${ck(y.t1)} 社福中心志工<br>${ck(y.t2)} 一起參加教會活動<br>${ck(st.partner=='劉家宜')} 花園廣場告白<br>${ck(y.bapt)} 一起受洗（真道 ${y.faith}/4・教會 ${Math.min(3,y.church)}/3・電話 ${Math.min(4,y.calls)}/4）<br>${ck(y.prop)} 求婚（婚輔 ${y.coun}/3・婚紗 ${y.photo?'✓':'✗'}・好友 ${Math.min(4,f80())}/4）<br>${ck(y.wed)} 證婚婚禮（好友 ${Math.min(6,f80())}/6・💰30000）<br>${ck(y.home)} 一起生活`+(YJHINT()?`<br><span class="text-[11px]">💭 ${YJHINT()}</span>`:'')}
 openDlg(`${F.ic} ${F.n}`,`<b>${F.who}</b>・${frLab(id,s.pt)}（好感 ${s.pt}/${id=='yijia'?200:100}）<br><br>`+F.bio.filter(b=>lv>=b[0]).map(b=>'・'+(b[1]=='目前單身'&&st.partner==F.n?(yjS().wed?'已婚（和 Allen）':'和 Allen 交往中 💗'):b[1])).join('<br>')+(lv>=1?'<br><br>📍 '+F.where:'')+(lv>=2?'<br>💡 '+F.hint:'')+ex,[['返回','',friendsMenu]])}

// ── LINE ──
const YJLINE=['「今天個案好多，終於下班了😮‍💨」','「剛剛路過一攤榴槤，差點就買了🍈」','「你在營區還好嗎？記得多喝水喔」','「這週末要不要一起吃飯？」','「我媽剛剛視訊說澳門好熱🥵」','「晚安～明天也要加油💪」'];
function lineChat(id){const F=FR[id],s=FRS(id),dk=dKey(),first=s.td!=dk;s.td=dk;if(first){frAdd(id,1);fxApply({j:2});advance(.2);hud()}
 const msg=id=='yijia'?pick0(YJLINE,dk*3+s.pt):pick0(F.lines[frLv(s.pt)<2?0:frLv(s.pt)<3?1:2],dk*5+s.pt);
 openDlg('📲 LINE・'+F.n,`<b>${F.n}</b>：${msg}<br><b>你</b>：${pick0(['哈哈，辛苦了！','好啊～','收到👍','我也是！','改天見面聊！'],dk+s.pt)}`+(first?'':'<br><span class="opacity-60 text-xs">（今天已經聊過了）</span>'),[['返回','',()=>phoneCall(id)]])}
{const _pc=phoneCall;phoneCall=function(id){if(id=='yijia'&&st.partner=='劉家宜'&&T.hour>=7&&T.hour<23){const y=yjS(),dk=dKey();if(y.callD!=dk){y.callD=dk;y.calls++}}return _pc.apply(this,arguments)}}

// ── 家宜路線 ──
function yjCheck(){const y=yjS(),s=FRS('yijia');
 if(s.pt>=50&&!y.t1&&!y.t1Ask){y.t1Ask=1;whenFree(()=>openDlg('📲 家宜傳來 LINE','「冠宏……可以拜託你一件事嗎？這週末機構要辦物資發放，人手真的不夠，需要有人幫忙搬米、搬箱子。沒有薪水喔😅」<br><span class="text-[12px] opacity-80">（找家宜聊天，就能接下這個任務）</span>',[['「沒問題，交給我！」','',closeDlg]]))}
 if(s.pt>=200&&y.wed&&!y.home&&!y.homeAsk){y.homeAsk=1;whenFree(yjMoveIn)}}
function yjOpts(o,n,s,dk){const y=yjS(),pt=s.pt,W=wkN(),day=dow(),h=T.hour,wkend=day==5||day==6;
 if(pt>=50&&!y.t1)o.push(['🙋 任務：去社福中心當志工','沒有薪水・4 小時・出勞力・⚡-25',yjTask1,st.sta<25]);
 if(y.t1&&!y.t2&&pt>=60)o.push(['⛪ 任務：邀家宜參加教會活動','週六 18:00–21:00 青年晚會，或週日 9:00–12:00 主日',yjTask2,!((day==5&&h>=18&&h<21)||(day==6&&h>=9&&h<12))]);
 if(pt>=80&&st.partner!='劉家宜')o.push(['🌷 約家宜去花園廣場散步','15:00–20:00・1 小時・每週末一次'+(st.inv.bouquet?'・💐 你帶著花束':''),yjGarden,y.gW==W||h<15||h>=20]);
 if(st.partner=='劉家宜'){
  o.push(['💞 甜蜜約會','2 小時・每天一次',()=>{s.ad.love=dk;frAdd('yijia',3);fxApply({j:14});advance(2);hud();closeDlg();toast('💞 你們度過了甜蜜的時光。')},s.ad.love==dk]);
  o.push(['⛪ 約家宜一起去教會','週日 9:00–12:00・每週一次・一起去教會 '+Math.min(3,y.church)+'/3',()=>{y.chW=W;y.church++;frAdd('yijia',3);frAdd('yilun',1);fxApply({j:10});advance(2.5);hud();closeDlg();toast('⛪ 你們並肩坐在會堂裡，詩歌唱到一半，她偷偷看了你一眼。')},y.chW==W||!(day==6&&h>=9&&h<12)]);
  if(y.bapt&&!y.photo&&s.pt>=140)o.push(['📸 去高雄西子灣拍婚紗','💰20000・一整天（8 小時）',yjPhoto,st.money<20000||h>12]);
  if(y.bapt&&!y.prop)o.push(['💍 向家宜求婚',`好感≥150 ${s.pt}・婚姻輔導 ${y.coun}/3・婚紗 ${y.photo?'✓':'✗'}・80 好感的好朋友 ${f80()}/4`,yjPropose,!(s.pt>=150&&y.coun>=3&&y.photo&&f80()>=4)]);
 }}
function yjTask1(){openDlg('🙋 社福中心・物資發放日','家宜綁著馬尾、戴著工作手套，看到你出現，眼睛一亮：<br>「你真的來了！那些米和紙箱就拜託你了～」',[['捲起袖子開始搬！','4 小時・⚡-25',()=>{const y=yjS();y.t1=1;advance(4);fxApply({s:-25,r:3,j:8});addItem('lunch',1);frAdd('yijia',5,1);hud();closeDlg();
  openDlg('🙋 任務完成','你搬了四十包米、上百箱物資，汗水濕透了衣服。<br>發放結束後，家宜遞給你一個便當：<br>「機構沒辦法給薪水……這個便當是我的心意。今天真的謝謝你。」<br><br>💗 家宜好感 +5　⭐ 聲望 +3　🍱 獲得便當',[['「小事一件，下次還找我！」','',closeDlg]])}],['下次吧','',closeDlg]])}
function yjTask2(){openDlg('⛪ 教會活動','「欸……這算是約會嗎？」家宜低頭笑了一下，「好啊，我想看看你常說的那間教會。」',[['一起去！','3 小時',()=>{const y=yjS();y.t2=1;advance(3);fxApply({j:16,r:2});frAdd('yijia',8,1);frAdd('yilun',2,1);frAdd('rita',2,1);hud();closeDlg();
  openDlg('⛪ 一起參加教會活動','以倫牧師熱情地招呼她，RITA 拉著她認識大家。敬拜時你彈著吉他，她在台下跟著輕輕唱。<br>散會後，她說：「這裡的人好溫暖……謝謝你帶我來。」<br><br>💗 家宜好感 +8',[['💞','',closeDlg]])}],['改天吧','',closeDlg]])}
function yjGarden(){const y=yjS();y.gW=wkN();advance(1);fxApply({j:8});
 const base='夕陽灑在花園廣場的花圃上，你們沿著小徑慢慢走。她說起澳門的海、媽媽的拿手菜，還有剛來台灣時一個人的日子。';
 if(st.inv.bouquet>0&&FRS('yijia').pt>=80)return openDlg('🌷 花園廣場',base+'<br><br>走到噴水池旁，你停下腳步——背包裡的花束好像在發燙。',[['💐 拿出花束，向她告白','',yjConfess],['……再等等吧','',()=>{frAdd('yijia',3);hud();closeDlg()}]]);
 frAdd('yijia',3);hud();openDlg('🌷 花園廣場',base+'<br><span class="text-[12px] opacity-80">（如果下次帶著一束玫瑰花束……）</span>',[['好','',closeDlg]])}
function yjConfess(){st.inv.bouquet--;openDlg('💗 告白','你把花束遞到她面前：「家宜，我喜歡你。不是朋友的那種喜歡……可以讓我陪在你身邊嗎？」<br><br>她愣了一下，接過花束，眼眶慢慢紅了。<br>「……你知道我等這句話等多久了嗎？」',[['💞','',()=>{st.partner='劉家宜';fxApply({j:30,r:10});frAdd('yijia',10,1);try{checkQ()}catch(e){}hud();closeDlg();toast('🎉 你和家宜開始交往了！')}]])}
function yjPhoto(){const y=yjS();st.money-=20000;y.photo=1;advance(8);fxApply({j:25,s:-20});frAdd('yijia',6,1);hud();closeDlg();
 openDlg('📸 西子灣婚紗','一早搭車到高雄，從英國領事館拍到西子灣的海堤。攝影師喊：「新娘看新郎～再靠近一點！」<br>夕陽落進海裡的那一刻，家宜穿著白紗回頭對你笑。你覺得這一幕，你會記一輩子。<br><br>💗 家宜好感 +6',[['💞','',closeDlg]])}
function yjPropose(){openDlg('💍 求婚','你約家宜上家裡的頂樓。燈串一盞一盞亮起來，桌上擺滿她愛吃的點心和柿子，好朋友們偷偷躲在花架和盆栽後面。<br>你單膝跪下，打開戒指盒：<br>「劉家宜，你願意嫁給我嗎？」',[['💍','',()=>{const y=yjS();y.prop=1;y.propW=wkN();fxApply({j:35,r:10});frAdd('yijia',10,1);hud();closeDlg();
  openDlg('💍 她說：「我願意！」','她摀著嘴哭著點頭，好朋友們衝出來拉炮、尖叫、拍照。<br>以倫牧師拍拍你的肩：「接下來，就讓我為你們證婚吧！」<br><br>💗 家宜好感 +10',[['💞','',closeDlg]])}],['還沒準備好','',closeDlg]])}
function ylOpts(o){const y=yjS(),s=FRS('yijia'),W=wkN();if(st.partner!='劉家宜')return;
 if(!y.bapt){const L=['神的愛','耶穌是誰','十字架與恩典','受洗與新生命'];
  if(y.faith<4)o.push([`📖 和家宜一起上真道問答（${y.faith+1}/4：${L[y.faith]}）`,'1.5 小時・每週末一堂',()=>{y.fW=W;const k=y.faith++;advance(1.5);fxApply({w:3,j:6});frAdd('yijia',2,1);frAdd('yilun',2,1);hud();closeDlg();openDlg('📖 真道問答・'+L[k],['以倫翻開聖經：「神愛世人，甚至將祂的獨生子賜給他們。」家宜聽得很專心，在筆記本上寫個不停。','「耶穌不只是歷史人物——祂是道成肉身，住在我們中間。」家宜問了好多問題，以倫一一耐心回答。','講到十字架，家宜沉默了很久，小聲說：「原來被愛，不需要先變得夠好。」','「受洗，是向世界宣告：我屬於基督。」以倫看著你們：「你們準備好了嗎？」'][k],[['🙏','',closeDlg]])},y.fW==W]);
  else o.push(['🕊️ 和家宜一起受洗',`真道 4/4・一起去教會 ${Math.min(3,y.church)}/3・打電話 ${Math.min(4,y.calls)}/4・家宜好感 ${s.pt}/130`,yjBaptism,!(y.church>=3&&y.calls>=4&&s.pt>=130)])}
 else if(!y.wed){
  if(y.coun<3)o.push([`💑 和家宜一起上婚姻輔導（${y.coun+1}/3）`,'1.5 小時・每週末一堂・家宜好感≥140',()=>{y.cW=W;const k=y.coun++;advance(1.5);fxApply({w:2,j:6});frAdd('yijia',2,1);frAdd('yilun',2,1);hud();closeDlg();openDlg('💑 婚姻輔導',['以倫：「婚姻不是找到對的人，而是成為對的人。」你們各自寫下對未來的期待，交換看的時候都笑了。','以倫：「吵架的時候，記得你們是同一隊的。」家宜偷偷捏了一下你的手。','以倫：「把神放在你們中間，三股合成的繩子，不容易折斷。」'][k],[['🙏','',closeDlg]])},y.cW==W||s.pt<140]);
  if(y.prop)o.push(['💒 請以倫牧師證婚，在教會舉行婚禮',`💰30000・婚輔 ${y.coun}/3・婚紗 ${y.photo?'✓':'✗'}・80 好感的好朋友 ${f80()}/6`,yjWedding,!(y.coun>=3&&y.photo&&f80()>=6&&st.money>=30000&&y.propW<W)])}}
function yjBaptism(){const y=yjS();y.bapt=1;advance(3);fxApply({j:30,r:8,h:10});frAdd('yijia',10,1);frAdd('yilun',5,1);hud();closeDlg();
 openDlg('🕊️ 受洗典禮','主日的陽光從窗外灑進來。以倫牧師為你們按手禱告，你們一前一後從水中起來。<br>會眾齊聲唱著詩歌，禹豪在台下哭得比你們還慘——當初就是他帶你走進教會的。<br>家宜握著你的手：「從今以後，我們一起走信仰的路。」<br><br>💗 家宜好感 +10',[['🙏 哈利路亞','',closeDlg]])}
function yjWedding(){st.money-=30000;const y=yjS();y.wed=1;advance(6);fxApply({j:50,r:20,h:10});frAdd('yijia',10,1);Object.keys(FR).forEach(k=>{if(k!='yijia')frAdd(k,3,1)});hud();closeDlg();
 const fr=Object.keys(FR).filter(k=>k!='yijia'&&FRS(k).met).map(k=>FR[k].n).join('、');
 openDlg('💒 證婚婚禮','城光復興堂擠滿了人。主揚哥彈著琴，大門打開，家宜挽著媽媽的手走進來。<br>以倫牧師說：「你願意愛她、珍惜她，不論順境逆境，直到生命的盡頭嗎？」<br>「我願意。」<br><br>到場祝福：'+fr+'<br><br>💗 家宜好感 +10　🎉 你們結婚了！',[['💞 從今以後','',closeDlg]])}
function yjMoveIn(){yjS().home=1;openDlg('🏡 一起生活','家宜拖著兩個行李箱站在門口，笑著說：「老公，我回家了。」<br>小窩多了她的牙刷、她的小盆栽、她最愛的榴槤抱枕。<br>從今以後，每個週末回家，都有人等你。<br><br>（現在可以在家裡找到家宜）',[['💞 歡迎回家','',closeDlg]])}
// 家裡的家宜、寶寶
{const R=IN['家'],o0=R&&R.onEnter;if(R)R.onEnter=rm=>{o0&&o0(rm);rm.ppl=rm.ppl.filter(n=>!n.yjH);if(st.yj&&st.yj.home){const n=pp('劉家宜',300,250,'#9cc4e4','#222','',{fr:'yijia',dir:0});n.yjH=1;rm.ppl.push(n)}}}
{const _oh=openHome;openHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{const y=st.yj;if(y&&y.home&&Array.isArray(opts)){const add=[];
   if(!y.babyW)add.push(['👶 和家宜聊聊生寶寶的事','',()=>{y.babyW=wkN();closeDlg();openDlg('👶 我們的未來','家宜靠在你肩上：「我想要一個像你一樣愛笑的孩子。」<br>你們紅著臉，對未來充滿期待。',[['💞','',closeDlg]])}]);
   if(st.baby)add.push([`👶 抱抱${st.baby}`,'😊+15',()=>{fxApply({j:15});advance(.3);hud();closeDlg();toast(`👶 ${st.baby}抓著你的手指咯咯笑。`)}]);
   opts.splice(Math.max(0,opts.length-1),0,...add)}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _oh.apply(this,arguments)}finally{openDlg=od}}}

// ── 物品：玫瑰花束、備賽營養餐盒、冠軍腰帶 ──
IT.bouquet={n:'玫瑰花束',i:'💐',p:300,d:'一大束紅玫瑰。帶著它約家宜去花園廣場散步……',u:'keep'};PR.bouquet=1000;
IT.mealprep={n:'備賽營養餐盒',i:'🥗',p:200,d:'雞胸、糙米、花椰菜。⚡+20（備賽期間每個週末要吃一份）',u:{s:20}};PR.mealprep=600;
IT.belt={n:'冠軍腰帶',i:'🏆',p:5000,d:'拳擊月賽的冠軍腰帶，閃閃發亮。',u:'keep'};
['禮品屋','家樂福'].forEach(k=>SHOP[k]&&!SHOP[k].includes('bouquet')&&SHOP[k].push('bouquet'));['健身房','家樂福'].forEach(k=>SHOP[k]&&!SHOP[k].includes('mealprep')&&SHOP[k].push('mealprep'));

// ── 拳擊月賽 ──
const boxM=n=>Math.floor((n-1)/4);
const boxPrep=()=>{const b=st.box;return b&&!b.done&&wkN()<b.match};
const boxBusy=()=>{const b=st.box;return b&&!b.done&&wkN()<=b.match};
function boxCond(){const b=st.box;if(!b)return 0;let sc=0;for(let w=b.sign;w<b.match;w++){const t=Math.min(3,b.tr[w]||0);sc+=t/3*.75+(b.food[w]?.25:0)}return clamp(Math.round(sc/(b.match-b.sign)*100)-b.junk*10,0,100)}
const boxP=()=>.10+boxCond()/100*(1/3-.10);
const JUNK=['popcorn','cake'];
{const _ui=useItem;useItem=function(k){const b=st.box;if(boxPrep()&&st.inv[k]){if(k=='mealprep'){b.food[wkN()]=1;setTimeout(()=>toast('🥗 本週末的備賽餐吃了，狀態穩定！'),300)}else if(JUNK.includes(k)){b.junk++;setTimeout(()=>toast('⚠️ 備賽期間吃了垃圾食物……比賽狀態下降！'),300)}}return _ui.apply(this,arguments)}}
{const _fx=fxApply;fxApply=function(fx){try{if(boxPrep()&&fx&&fx.h<0&&typeof curDlg!='undefined'&&curDlg&&/（持有 \$/.test(curDlg[0]||'')){st.box.junk++;setTimeout(()=>toast('⚠️ 備賽期間吃了油炸小吃……比賽狀態下降！'),300)}}catch(e){}return _fx.apply(this,arguments)}}
function fightMenu(){const b=st.box,W=wkN(),o=[];let d='';
 if(!b||b.done){const used=st.boxMo===boxM(W);
  d='🥊 每月一次的拳擊月賽。<br>報名後有 <b>2 個週末備賽</b>，第 3 個週末的週六 18:00–22:00 上場。<br><span class="text-[12px]">⚠️ 很難贏（完整備賽約 1/3 勝率），輸了會受傷。冠軍獎金 💰30000。</span>'+(used?'<br><b>這個月已經報名過了。</b>':'');
  o.push(['📝 報名本月月賽（報名費 💰500）','備賽期間：每週末訓練 3 次（各 3 小時）、吃營養餐盒、不能吃垃圾食物、沒時間和朋友相約',boxSign,used||st.money<500])}
 else{const tr=b.tr[W]||0;d=`🥊 月賽備賽中　比賽在第 <b>${b.match}</b> 個週末（現在第 ${W} 個）<br>目前狀態 <b>${boxCond()}</b>/100・預估勝率 <b>${Math.round(boxP()*100)}%</b><br>本週末訓練 ${tr}/3・營養餐盒 ${b.food[W]?'✅':'⬜'}・吃垃圾食物 ${b.junk} 次`;
  if(W<b.match)o.push(['🏋️ 備賽訓練（3 小時）',`⚡-20・本週末 ${tr}/3`,()=>{b.tr[W]=tr+1;advance(3);fxApply({s:-20,p:2});hud();closeDlg();toast(`🏋️ 跳繩、空擊、對打……全身濕透。本週末訓練 ${tr+1}/3`)},st.sta<20||tr>=3]);
  else{const ok=dow()==5&&T.hour>=18&&T.hour<22;o.push(['🥊 上場比賽！',ok?`預估勝率 ${Math.round(boxP()*100)}%`:'比賽時間：本週六 18:00–22:00',boxFight,!ok])}
  o.push(['🏳️ 退賽','報名費不退・聲望 -3',()=>{b.done=1;fxApply({r:-3});hud();closeDlg();toast('你退出了這次月賽。')}])}
 o.push(['🥊 打沙包練習','⚔️+2　⚡-10　時間+1小時',()=>{fxApply({p:2,s:-10});advance(1);hud();closeDlg();toast('沙包被你打得砰砰作響。')},st.sta<10]);
 o.push(['離開','',closeDlg]);openDlg('🥊 擂台・拳擊月賽',d,o)}
function boxSign(){openDlg('📝 確定報名？','接下來兩個週末，你的時間幾乎都要給訓練：<br>・每個週末訓練 3 次，每次 3 小時<br>・每個週末吃一份營養餐盒（💰600）<br>・不能吃炸物、甜食等垃圾食物<br>・<b>不能和朋友、家宜相約</b><br><br>就算全力備賽，勝率也只有大約 1/3。',[['🔥 我要挑戰！','💰500',()=>{const W=wkN();st.money-=500;st.boxMo=boxM(W);st.box={sign:W,match:W+2,tr:{},food:{},junk:0,done:0};hud();closeDlg();toast('📝 報名成功！第 '+(W+2)+' 個週末週六晚上比賽。')}],['再想想','',cancel]],true)}
function boxFight(){const b=st.box,p=boxP(),win=Math.random()<p;b.done=1;const op=pick0(['「重砲」陳大山','「鐵頭」林志強','「獵豹」吳俊傑','「颱風」黃建宏'],wkN());
 const R=win?['第一回合：'+op+'壓著你打，你護住頭部撐了下來。','第二回合：你抓到他出拳後的空檔，一記右直拳命中！他踉蹌了一下。','第三回合：你把兩個週末的汗水全部打出去——左勾拳！他倒在擂台上，裁判數到十！']:['第一回合：'+op+'的刺拳又快又重，你的眼角馬上腫了起來。','第二回合：你想反擊，卻被一記勾拳打中肋骨，痛到喘不過氣。','第三回合：重拳迎面而來，眼前一黑……醒來時，你已經躺在擂台上。'];
 advance(3);let i=0;const next=()=>{if(i<3){const t=R[i++];return openDlg(`🥊 拳擊月賽 第 ${i} 回合`,t,[['▶','',next]])}
  if(win){st.money+=30000;st.earned=(st.earned||0)+30000;fxApply({r:20,j:30,h:-20,s:-40});addItem('belt',1);hud();openDlg('🏆 冠軍！','裁判舉起你的手，全場歡呼！<br>💰 冠軍獎金 +30000　⭐ 聲望 +20　🏆 獲得冠軍腰帶<br>❤️ 雖然贏了，身上也掛了不少彩。',[['🏆','',closeDlg]])}
  else{fxApply({h:-50,s:-60,j:-15,r:2});st.money-=1500;b.inj=wkN()+1;hud();openDlg('💥 落敗','你被擊倒了。在診所縫了三針、照了 X 光。<br>❤️ 健康 -50　💸 醫藥費 -1500<br>下個週末身體還在恢復，體力會比較差。<br><span class="text-[12px] opacity-80">教練：「你很勇敢。輸了不丟臉，下個月再來。」</span>',[['……','',closeDlg]])}};next()}
// 備賽期間：沒時間和朋友相約
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){try{if(boxBusy()&&Array.isArray(opts)){const T0=new Set();for(const id in FR)(FR[id].acts||[]).forEach(a=>T0.add(a.t));opts.forEach(o=>{if(o&&typeof o[0]=='string'&&(T0.has(o[0])||/^📅 邀約|^💞 甜蜜約會|^🌷 約家宜|^📸 去高雄/.test(o[0]))){o[3]=true;o[1]=(o[1]||'')+'（🥊 備賽中，沒時間）'}})}}catch(e){}return _od.call(this,t,d,opts,sub,mode)}}

// ── 派出所：只能當協勤志工 ──
function policeMenu(n,line){const o=policeOpts(),W=wkN();
 o.push(['🚓 協勤志工（4 小時・無薪）','交通指揮、社區巡守・⭐+3・附便當・每週末一次',()=>{st.polW=W;advance(4);fxApply({r:3,s:-15,j:5});addItem('lunch',1);hud();closeDlg();toast('🚓 協勤結束，所長塞給你一個便當：「辛苦了，年輕人！」⭐+3')},st.polW==W||st.sta<15]);
 o.push(['💬 閒聊','',()=>{openDlg('💬 '+n.n,say(n),[['返回','',cancel]],true)}]);o.push(['離開','',closeDlg]);
 openDlg('🚓 '+n.n,line+'<br><span class="opacity-70">（可以問路、通報飆車，或當協勤志工）</span>',o)}

// ── 週末開始：冷淡事件、懷孕／寶寶、受傷 ──
function lifeEvents(){const W=wkN(),y=yjS(),q=[];
 if(st.box&&st.box.inj==W){st.sta=Math.min(st.sta,35);q.push(()=>openDlg('🩹 傷還沒好','上次比賽的傷還在痛，這個週末體力比較差。',[['好','',closeDlg]]))}
 if(y.babyW&&!y.preg&&W>=y.babyW+2){y.preg=W;q.push(()=>openDlg('🍼 好消息','家宜拿著驗孕棒，手在發抖：「冠宏……我們要當爸爸媽媽了！」',[['😭 抱住她','',()=>{fxApply({j:40});frAdd('yijia',5,1);hud();closeDlg()}]]))}
 if(y.preg&&!st.baby&&W>=y.preg+6){q.push(()=>{let nm='';try{nm=(prompt('寶寶出生了！要取什麼名字？','小寶貝')||'').trim().slice(0,6)}catch(e){}st.baby=nm||'小寶貝';fxApply({j:50});hud();openDlg('👶 寶寶出生了','產房外，你聽見第一聲哭聲。家宜虛弱地笑著：「你看，他的眼睛好像你。」<br>歡迎你來到這個家，<b>'+st.baby+'</b>。',[['💞','',closeDlg]])})}
 // 冷淡事件：一位很久沒聯絡的朋友（每週末最多一次）
 const cand=Object.keys(FR).filter(k=>{const s=st.fr&&st.fr[k];return s&&s.met&&s.pt>=8&&(s.lastW||0)<=W-3&&s.coldW!=W&&!(k=='yijia'&&y.home)});
 if(cand.length){const id=pick0(cand,W*7),F=FR[id],s=FRS(id);s.coldW=W;
  const M=id=='yijia'?'「最近好像很少看到你……你很忙嗎？」':pick0(['「欸，最近都沒看到你，還活著嗎？哈哈」','「好久沒聯絡了，最近還好嗎？」','「上次說要約，結果都沒下文耶～」'],W);
  q.push(()=>openDlg('📲 '+F.n+' 傳來 LINE',M,[['「抱歉抱歉！這週末約個時間見面吧！」','答應了就要做到喔',()=>{s.promW=W;closeDlg();toast('📅 記得這個週末去見 '+F.n+'！')}],['傳個貼圖敷衍一下','',()=>{closeDlg()}],['已讀不回','好感 -2',()=>{frDrop(id,2);closeDlg()}]]))}
 const run=()=>{const f=q.shift();if(!f)return;f();if(q.length)whenFree(run)};run()}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const W=wkState(),n0=W.n;whenFree(lifeEvents,()=>W.plan.length>0||wkState().n!=n0)}catch(e){}return r}}
{const _wr=wkReturn;wkReturn=function(){try{const W=wkN();for(const id in FR){const s=st.fr&&st.fr[id];if(!s||s.promW!=W)continue;s.promW=0;
   if(s.lastW==W){frAdd(id,3,1);toast(`🤝 你遵守了和${FR[id].n}的約定（好感 +3）`)}else{frDrop(id,4);toast(`😞 答應了${FR[id].n}卻沒見面……（好感 -4）`)}}
  const b=st.box;if(b&&!b.done&&W>=b.match){b.done=1;fxApply({r:-3});toast('🥊 你錯過了月賽，被視為棄權（聲望 -3）')}}catch(e){console.error(e)}return _wr.apply(this,arguments)}}
