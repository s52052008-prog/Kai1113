/* v8.9 劇情結算照片：求婚、登記、受洗、教會市集、陀螺約會、電動派對、日月潭；回憶相簿 */
const fa=(id,n)=>{try{if(FR[id]&&FRS(id).met)frAdd(id,n,1)}catch(e){}};
const once=k=>{st.ph=st.ph||{};if(st.ph[k])return false;st.ph[k]=1;return true};
// ── 把照片接在既有劇情的最後 ──
{const _sp=storyPages;storyPages=function(title,pages,end,btn){let e2=end;
 if(title=='🕊️ 受洗見證')e2=()=>{end&&end();whenFree(()=>photoShow('bapt','受洗・新生的開始','和家宜一同受洗，感謝禹豪、媛媛一路陪伴見證'))};
 else if(title=='🎵《此生相依》')e2=()=>{end&&end();whenFree(()=>photoShow('propg','求婚成功！','💍 好朋友們全都衝出來了！',()=>photoShow('propc','我們訂婚了','只屬於你們兩個人的合照')))};
 else if(title=='💒 證婚婚禮')e2=()=>{end&&end();st.ph=st.ph||{};st.ph.wedW=wkN();whenFree(()=>photoShow('wed','STAGE CLEAR・新的人生','恭喜！你找到了生命中最重要的隊友！　💍 獲得道具：婚戒 ×1',()=>_sp('📜 區公所登記',[
   Q_('婚禮隔週，你和家宜一早來到區公所。<br>兩位證人也準時出現了：以倫牧師戴著毛帽，手裡居然拿著一個大大的「囍」字；禹豪抱著寶寶，媛媛幫你們拿著花束。'),
   Q_('戶政人員核對證件，請兩位證人簽名。以倫牧師簽完，故意大聲說：「我證明，這個新郎超帥的！」<br>媛媛笑著遞上牌子：「新郎超帥的！」<br><br>蓋下印章的那一刻，家宜轉頭看你：「劉家宜，已婚。」')
  ],()=>photoShow('reg1','我們結婚了！','以倫牧師當證人，舉著大大的囍字',()=>photoShow('reg2','結婚登記・證人合影','感謝以倫牧師、禹豪和媛媛為我們見證')),'🖊️ 簽名蓋章')))};
 return _sp.call(this,title,pages,e2,btn)}}
// ── 教會市集（每月一次，週六 10:00–16:00）──
function marketEvent(){const W=wkN();st.mkW=st.mkW||-9;if(W-st.mkW<4)return toast('市集一個月辦一次，下次是第 '+(st.mkW+4)+' 個週末');
 if(st.sta<30)return toast('⚡ 體力不夠，市集要站一整天喔');st.mkW=W;closeDlg();
 storyPages('🛍️ 教會市集',[Q_('一早就把桌子搬到教會門口。手作餅乾、二手衣、咖啡攤一字排開，主揚哥在旁邊彈琴招呼客人。'),
  Q_('你負責收銀和搬貨，家宜在咖啡攤忙得團團轉。人潮一波接一波，到下午東西幾乎賣光了。<br>收攤後大家擠在咖啡廳的吧台前，興奮地算今天的成果。')],()=>{
  advance(6);fxApply({s:-30,j:20,r:5});['yilun','zhuyang','yuhao','yijia','rita','huijing','fangci'].forEach(k=>fa(k,3));hud();
  if(once('market'))photoShow('market','市集活動・圓滿完成','⛪ 教會的朋友們好感 +3　⭐ 名聲 +5　😊 心情 +20');else toast('🛍️ 市集圓滿結束！大家好感 +3')},'🎉 慶功')}
{const R=IN['城光復興堂'];if(R&&R.spf){const c0=R.spf.counter;R.spf.counter=()=>{const d=dow(),h=T.hour,ok=d==5&&h>=10&&h<16;
 openDlg('⛪ 服務台','需要什麼服務？',[['🛍️ 參加教會市集',ok?'6 小時・⚡-30・😊+20 ⭐+5・教會朋友好感 +3':'每月一次・週六 10:00–16:00',marketEvent,!ok],['ℹ️ 一般服務','',()=>{closeDlg();c0&&c0()}],['離開','',closeDlg]])}}}
// ── 跟家宜約戰陀螺（遊藝場）──
{const _s=SP['遊藝場'];SP['遊藝場']=function(){const o=_s.apply(this,arguments),s=FRS('yijia');
 if(s.met&&s.pt>=40){const W=wkN(),done=st.beyW==W;o.splice(1,0,['🌀 約家宜一起打陀螺',done?'這個週末已經玩過了':'2 小時・💰300・💗 家宜 +4',()=>{if(st.money<300)return toast('錢不夠喔');st.money-=300;st.beyW=W;closeDlg();
  storyPages('🌀 陀螺約戰',[Q_('家宜戴著墨鏡、頭上頂著一棵小聖誕樹髮箍，拿著發射器對你挑釁：「今天輸的人請喝飲料！」'),Q_('三、二、一——Go Shoot！<br>兩顆陀螺在場上撞得火花四濺。家宜尖叫、拍桌、跳起來，最後抱著她的陀螺說：「無論輸贏，有你一起玩最開心！」')],()=>{
   advance(2);fxApply({j:15});fa('yijia',4);hud();if(once('bey'))photoShow('bey','戰鬥陀螺・活動結算','💗 家宜好感 +4　😊 心情 +15');else toast('🌀 跟家宜玩得好開心！家宜好感 +4')},'📸 合照')},done]);}
 return o}}
// ── 週末電動派對（在家看電視時）──
{const _ha=homeAct;homeAct=function(k){if(k!='tv')return _ha.apply(this,arguments);
 const d=dow(),h=T.hour,friends=Object.keys(FR).filter(id=>id!='yijia'&&FRS(id).met&&FRS(id).pt>=30).length,ok=(d==5||d==6)&&h>=17&&h<23&&friends>=3&&st.gameW!=wkN();
 openDlg('📺 電視','轉到一個正在重播的綜藝節目。',[['看電視（1 小時）','😊+7 ⚡+2',()=>{fxApply({j:7,s:2});advance(1);hud();closeDlg();toast('笑到肚子痛。')}],
  ['🎮 揪朋友來家裡打電動',ok?'4 小時・💰1500 零食飲料・朋友好感 +3':friends<3?`要有 3 位好感 30 以上的朋友（目前 ${friends}）`:st.gameW==wkN()?'這個週末已經玩過了':'週末 17:00–23:00',()=>{if(st.money<1500)return toast('錢不夠買零食喔');st.money-=1500;st.gameW=wkN();closeDlg();
   storyPages('🎮 週末電動派對',[Q_('門鈴一響，朋友們提著鹽酥雞、洋芋片和手搖飲擠進客廳。'),Q_('大家搶著拿手把，輸的人罰喝苦瓜汁。尖叫聲、笑聲吵到樓下都聽得到——這就是最幸福的週末。')],()=>{
    advance(4);fxApply({j:25,s:-10});Object.keys(FR).forEach(id=>{if(FRS(id).met&&FRS(id).pt>=30)fa(id,3)});hud();if(once('gaming'))photoShow('gaming','完美的週末！','👥 朋友們好感 +3　😊 心情 +25');else toast('🎮 又是笑翻的一晚！')},'📸 大合照')},!ok],['離開','',closeDlg]])}}
// ── 和家宜去日月潭（火車站）──
function smlTrip(){if(st.money<4000)return toast('旅費要 💰4000');st.money-=4000;closeDlg();
 storyPages('🌊 日月潭一日遊',[Q_('一大早搭車出發，車窗外的風景從城市變成綠油油的山。家宜靠在你肩上睡著了。'),
  Q_('你們租了腳踏車沿著湖騎，搭船到伊達邵吃阿嬤茶葉蛋。<br>路邊有人在賣向日葵，你買了一朵送她。家宜笑著說：「這是我看過最大的湖！」')],()=>{
  advance(10);fxApply({j:30,s:-20});fa('yijia',8);hud();if(once('sml'))photoShow('sml','日月潭之旅・美好的回憶','💗 家宜好感 +8　😊 心情 +30');else toast('🌊 又是美好的一天！家宜好感 +8')},'📸 合照')}
{const R=IN['火車站'];if(R&&R.spf){const t0=R.spf.ticket;R.spf.ticket=()=>{const s=FRS('yijia'),h=T.hour,ok=st.partner=='劉家宜'&&h>=6&&h<10;
 openDlg('🚉 售票窗口','要去哪裡？',[['🚆 台東知本（溫泉）','',()=>{closeDlg();t0()}],['🌊 和家宜去日月潭一日遊',st.partner!='劉家宜'?'要先和家宜交往':ok?'10 小時・💰4000・💗 家宜 +8・😊+30':'早上 06:00–10:00 出發',smlTrip,!ok],['離開','',closeDlg]])}}}
// ── 回憶相簿 ──
function albumMenu(){const A=(st.album||[]);if(!A.length)return openDlg('📷 回憶相簿','還沒有照片。完成劇情和活動後，合照會收進這裡。',[['返回','',closeDlg]]);
 openDlg('📷 回憶相簿',`共 ${A.length} 張`,A.map(q=>[`🖼️ ${q.t}`,`第 ${q.w} 個週末`,()=>{closeDlg();photoView(q)}]).concat([['返回','',closeDlg]]))}
function photoView(q){window.TITLE=true;const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(20,12,6,.94);display:flex;align-items:center;justify-content:center;cursor:pointer';
 const im=document.createElement('img');im.src=FAMIMG[q.img];im.style.cssText='max-width:94vw;max-height:92vh;object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,.6)';ov.appendChild(im);document.body.appendChild(ov);
 const end=()=>{removeEventListener('keydown',end,true);ov.remove();window.TITLE=false;albumMenu()};setTimeout(()=>{addEventListener('keydown',end,true);ov.addEventListener('pointerdown',end)},300)}
{const od0=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts))opts.splice(2,0,['📷 回憶相簿','完成劇情後的合照',()=>albumMenu()]);return od.call(this,t,d,opts,...r)};try{return od0.apply(this,arguments)}finally{openDlg=od}}}
// ── 8 月 18 日・冠宏生日：家宜送的電競筆電（婚後）──
function laptopGift(){if(!once('laptop'))return;
 storyPages('🎂 8 月 18 日・我的生日',[Q_('今天是你的生日。一進家門，客廳的燈是暗的。<br>「生日快樂！」家宜從沙發後面跳出來，手裡捧著一個好大的盒子。'),
  Q_('拆開包裝，你整個人愣住——是一台 <b>MSI Cyborg 17 電競筆電</b>！<br>家宜笑著揮手：「你不是一直說舊電腦好卡嗎？這是我偷偷存了好久的錢買的喔！」<br><br>你抱著筆電，眼眶都紅了：「謝謝老婆對我這麼好……嗚嗚嗚。」')],()=>{
  fxApply({j:40});fa('yijia',8);st.inv.laptop=(st.inv.laptop||0)+1;hud();photoShow('laptop','超棒驚喜！','🎁 獲得道具：電競筆電 ×1　💗 家宜好感 +8　😊 心情 +40<br><span style="font-size:12px;opacity:.85">之後在書房的書桌上可以用它線上接案、打電動。</span>')},'🎁 打開禮物')}
IT.laptop={n:'電競筆電',i:'💻',p:0,d:'家宜送的生日禮物 MSI Cyborg 17。放在書房，是你最珍惜的寶貝。',u:'keep'};
