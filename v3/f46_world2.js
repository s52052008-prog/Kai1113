/* v9.5 力量膠囊（瑪卡基酸膠囊咖啡）與神秘蘑菇的取得劇情＋新地圖：白沙灣海灘、小琉球、外島、觀音山 */
FLAT.add('pkd');
FD.pkd=(c,x,y,w,h,f)=>{const im=UAI[f[5]];if(!im||!(im.width||im.naturalWidth))return;const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,hh=w*ih/iw;c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(f[6]){c.translate(x*2,0);c.scale(-1,1)}c.drawImage(im,x-w/2,y+h-hh,w,hh);c.restore()};
const PD=(k,cx,by,w,mx)=>['pkd',cx,by-4,w,4,k,mx?1:0];
const BK=(x,y,w,h)=>['blk',x,y,w,h];
const capS=()=>st.capS||(st.capS={});
function capGive(src,title,story){const C=capS();if(C[src])return false;C[src]=1;addItem('capsule',1);SVDIRTY=1;hud();
 whenFree(()=>openDlg('☕ '+title,story+`<br><br><div style="display:flex;align-items:center;gap:10px;justify-content:center;margin:6px 0">${capArt(64)}<b>獲得 瑪卡基酸膠囊咖啡 ×1</b></div><span style="font-size:12px;opacity:.8">打開背包喝下去，體力上限永久 +20。（力量膠囊 ${Object.keys(C).length}/3）</span>`,[['收下了！','',closeDlg]]));return true}
// 膠囊、蘑菇的小圖（等冠宏畫正式版之前先用程式畫）
function capArt(sz){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');
 x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(16,27,11,3,0,0,7);x.fill();x.save();x.translate(16,15);x.rotate(-.6);
 x.fillStyle='#3a2210';x.beginPath();x.roundRect(-12,-6,24,12,6);x.fill();x.fillStyle='#c0392b';x.beginPath();x.roundRect(-11,-5,11,10,[5,0,0,5]);x.fill();x.fillStyle='#f4e2b8';x.beginPath();x.roundRect(0,-5,11,10,[0,5,5,0]);x.fill();
 x.fillStyle='rgba(255,255,255,.55)';x.fillRect(-8,-4,14,2);x.restore();return `<img src="${c.toDataURL()}" alt="膠囊" style="width:${sz}px;height:${sz}px;image-rendering:pixelated">`}
function mushArt(sz){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');
 const g=x.createRadialGradient(16,16,2,16,16,15);g.addColorStop(0,'rgba(180,255,220,.7)');g.addColorStop(1,'rgba(180,255,220,0)');x.fillStyle=g;x.fillRect(0,0,32,32);
 x.fillStyle='#f4ead0';x.fillRect(13,15,6,11);x.fillStyle='#3a2210';x.fillRect(12,15,1,11);x.fillRect(19,15,1,11);x.fillRect(13,26,6,1);
 x.fillStyle='#3a2210';x.beginPath();x.ellipse(16,15,11,8,0,Math.PI,0);x.fill();x.fillStyle='#5ac8a8';x.beginPath();x.ellipse(16,15,10,7,0,Math.PI,0);x.fill();x.fillStyle='#d8fff0';[[11,11],[17,9],[21,13]].forEach(q=>x.fillRect(q[0],q[1],2,2));
 return `<img src="${c.toDataURL()}" alt="蘑菇" style="width:${sz}px;height:${sz}px;image-rendering:pixelated">`}
// ───────── 地形小工具 ─────────
function tSea(c,x,y,w,h,t0){GR(c,x,y,w,h,'#2a6fb0','#47a6d4');const r=orn(t0||7);for(let i=0;i<w*h/900;i++){const px=x+r()*w,py=y+r()*h;R(c,px,py,6+r()*10,1,'rgba(255,255,255,.22)')}}
function tSand(c,x,y,w,h,seed){R(c,x,y,w,h,'#ecd6a2');const r=orn(seed||11);for(let i=0;i<w*h/60;i++)R(c,x+r()*w,y+r()*h,1.2,1.2,r()<.5?'rgba(160,120,60,.25)':'rgba(255,255,255,.35)')}
function tGrass(c,x,y,w,h,seed){R(c,x,y,w,h,'#79b24e');const r=orn(seed||13);for(let i=0;i<w*h/50;i++){const px=x+r()*w,py=y+r()*h;R(c,px,py,1,3,['#5e9a46','#8ac25a','#4f8a3c'][i%3])}}
function tFoamH(c,x0,x1,y){c.fillStyle='rgba(255,255,255,.75)';for(let x=x0;x<x1;x+=6){const yy=y+Math.sin(x*.08)*2;c.fillRect(x,yy,5,2)}}
function tPlanks(c,x,y,w,h,v){R(c,x,y,w,h,'#a8794a');if(v)for(let i=0;i<h;i+=6)R(c,x,y+i,w,.8,'rgba(60,30,10,.35)');else for(let i=0;i<w;i+=6)R(c,x+i,y,.8,h,'rgba(60,30,10,.35)');R(c,x,y,2,h,'#6a4222');R(c,x+w-2,y,2,h,'#6a4222')}
function tIsland(c,cx,cy,rx,ry,W,H,seed){c.save();c.beginPath();c.ellipse(cx,cy,rx+10,ry+10,0,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,7);c.clip();tSand(c,0,0,W,H,seed);c.restore();
 c.save();c.beginPath();c.ellipse(cx,cy+ry*.05,rx*.78,ry*.68,0,0,7);c.clip();tGrass(c,0,0,W,H,seed+1);c.restore()}
function islandBlk(cx,cy,rx,ry,W,H,open){const L=[];for(let y=0;y<H;y+=8){const dy=(y+4-cy)/ry;if(Math.abs(dy)>=1){L.push(BK(0,y,W,8));continue}const dx=rx*Math.sqrt(1-dy*dy)-6;L.push(BK(0,y,Math.max(0,cx-dx),8),BK(cx+dx,y,W-(cx+dx),8))}
 let out=L;(open||[]).forEach(o=>{const N=[];out.forEach(b=>{const ov=b[1]<o[0]+o[2]&&b[1]+b[3]>o[0]&&b[2]<o[1]+o[3]&&b[2]+b[4]>o[1];if(!ov)return N.push(b);if(b[1]<o[0])N.push(BK(b[1],b[2],o[0]-b[1],b[4]));if(b[1]+b[3]>o[0]+o[2])N.push(BK(o[0]+o[2],b[2],b[1]+b[3]-o[0]-o[2],b[4]))});out=N});return out}
const waveAnim=(g,t,W,H)=>{g.save();g.globalAlpha=.25;g.fillStyle='#fff';for(let i=0;i<26;i++){const x=((i*173+t*14)%(W+60))-30,y=(i*97)%H;g.fillRect(x,y,10+(i%3)*4,1)}g.restore()};
// ───────── 白沙灣・大鵬灣海灘 ─────────
const DGW=1100,DGH=700;
def('白沙灣',{out:1,mtn:1,noexit:1,raw:1,W:DGW,H:DGH,title:'🏖️ 墾J・白沙灣',
 pre:(c,W,H)=>{tSea(c,0,0,W,250,3);tSand(c,0,248,W,195,5);tFoamH(c,0,W,248);tPlanks(c,0,440,W,34);for(let i=0;i<W;i+=16)R(c,i,440,.8,34,'rgba(60,30,10,.3)');
  R(c,0,474,W,H-474,'#cfc8bb');for(let y=474;y<H;y+=16)R(c,0,y,W,.6,'rgba(0,0,0,.08)');for(let x=0;x<W;x+=24)R(c,x,474,.6,H-474,'rgba(0,0,0,.06)');
  tPlanks(c,790,40,60,212,1);R(c,786,40,4,212,'#5a3418');R(c,850,40,4,212,'#5a3418');for(let y=50;y<250;y+=40){R(c,782,y,6,6,'#4a2a12');R(c,852,y,6,6,'#4a2a12')}},
 animf:(g,t)=>waveAnim(g,t,DGW,240),
 fur:[BK(0,0,790,244),BK(854,0,DGW-854,244),BK(790,0,64,40),
  PD('pk25_11',940,190,120),PD('pk25_8',300,150,60),PD('pk25_9',560,120,90),PD('pk26_45',120,200,70),
  PD('pk26_4',220,340,56),PD('pk26_20',220,372,60),PD('pk26_5',380,320,56),PD('pk26_9',390,350,80),PD('pk26_14',650,330,56),PD('pk26_29',660,380,56),PD('pk26_3',520,300,70),PD('pk26_30',300,400,22),PD('pk26_25',980,350,80),PD('pk26_37',120,410,20),PD('pk26_33',470,420,16),
  PD('pk26_1',40,440,64),PD('pk25_41',740,440,58),PD('pk26_6',1060,440,70),PD('pk25_10',150,470,20),PD('pk25_10',560,470,20),PD('pk25_10',960,470,20),PD('pk25_13',700,470,36),
  PD('b_station',140,610,210),PD('pk26_2',420,610,170),PD('pk25_2',650,610,150),PD('pk25_1',870,610,140),PD('pk25_31',1030,690,90),PD('pk26_10',290,610,60),PD('pk26_10',1000,612,50),
  BK(40,520,200,90),BK(340,520,160,90),BK(580,520,140,90),BK(805,520,130,90),BK(995,660,70,30)],
 ppl:[pp('救生員 阿凱',540,330,'#d42a2a','#222','今天浪不大，可以下水，但不要游超過浮球。|小琉球的海龜超多！',{dir:0,lk:GL('jogger',301)}),pp('釣客 老林',830,70,'#4a6a8a','#ddd','碼頭這邊海水深，大魚多。|聽說有人在這裡釣到黑鮪魚！',{dir:0,lk:GL('elder',302)}),
  pp('遊客',300,380,'#ff8a5a','#222','白沙灣的沙子好白好細！',{wk:[260,460],lk:GL('tourist',303)}),pp('遊客',700,600,'#5ac8a8','#222','等一下要坐船去小琉球浮潛～',{wk:[600,760],lk:GL('tourist',304)}),pp('海產店老闆娘',420,630,'#c0392b','#222','新鮮的喔！今天的漁船剛靠岸，黑鮪魚、龍蝦都超新鮮！',{dir:0,lk:{...GL('office',305),fm:1,hs:'b'}})],
 sp:[['sta',90,612,100,16],['sea',360,612,120,16],['rent',590,612,120,16],['ferry',810,612,120,16],['pier',790,40,64,40],['ice',995,692,70,8]],
 spl:{sta:'白沙灣客運站',sea:'白沙灣海產店',rent:'海灘租借',ferry:'渡輪售票口（小琉球）',pier:'碼頭釣點',ice:'冰淇淋車'},
 spf:{sta:()=>dgStation(),sea:()=>dgSeafood(),rent:()=>dgRent(),ferry:()=>ferryMenu('白沙灣'),pier:()=>fishSpot(true),ice:()=>{closeDlg();foodMenu('🍦 冰淇淋車','「天氣熱，來一支冰的吧！」',[['🍦 冰品',[...fdRange('37',21,23),...fdRange('37',37,39)]]])}}});
function dgStation(){openDlg('🚉 白沙灣客運站','開往小鎮的國光客運，車程約 2 小時。',[['🚌 搭客運回小鎮（💰420・約 2 小時）',trainOpen()?'':'末班車已經開走了（05:30–22:00）',()=>{st.money-=420;hud();closeDlg();tFade('🚌 客運北上<br><span style="font-size:14px;opacity:.8">海風漸漸遠去……</span>',()=>{advance(2);scene=null;outPos={z:Z.find(z=>z.n=='火車站')};exitTown();hud();SVDIRTY=1},()=>toast('🏙️ 回到小鎮了。'))},st.money<420||!trainOpen()],['離開','',closeDlg]])}
function dgSeafood(){openDlg('🦐 白沙灣海產店','活跳跳的海鮮，現點現煮。也收新鮮漁獲喔！',[['🦞 點海鮮（看圖點餐）','帝王蟹、龍蝦、生魚片……',()=>{closeDlg();foodMenu('🦐 白沙灣海產店','老闆娘：「今天的紅蟳很肥喔！」',[['🦐 海鮮',fdRange('36',11,27)]])}],['🐟 魚貨收購','海產店收魚，價格跟家樂福一樣',()=>sellMenu('f',dgSeafood)],['離開','',closeDlg]])}
function dgRent(){openDlg('🏄 海灘租借','衝浪板、浮潛裝備、遮陽傘都有。',[['⛱️ 租遮陽傘躺一下（💰200・1 小時）','⚡+20 😊+10',()=>{st.money-=200;fxApply({s:20,j:10});advance(1);hud();closeDlg();toast('⛱️ 海風、浪聲、冰涼的飲料……太舒服了。')},st.money<200],
 ['🏄 衝浪體驗（💰800・2 小時）','⚡-25 😊+20 💪+2',()=>{st.money-=800;fxApply({s:-25,j:20,p:2});advance(2);hud();closeDlg();toast('🏄 摔了十幾次，最後終於站起來了！')},st.money<800||st.sta<25],['離開','',closeDlg]])}
// ───────── 渡輪 ─────────
function ferryMenu(from){const to=from=='白沙灣'?'小琉球':'白沙灣';openDlg('⛴️ 渡輪售票口',`往${to}的渡輪，每 30 分鐘一班，船程約 30 分鐘。`,[[`⛴️ 搭船去${to}（💰230）`,T.hour>=7&&T.hour<18?'':'今天的船班結束了（07:00–18:00）',()=>{st.money-=230;hud();closeDlg();tFade('⛴️ 渡輪出港<br><span style="font-size:14px;opacity:.8">海浪拍打著船身……</span>',()=>{advance(.5);if(to=='小琉球'){st.lqN=(st.lqN||0)+1;mtnShow('小琉球',500,640,1)}else mtnShow('白沙灣',820,90,0);SVDIRTY=1},()=>toast(to=='小琉球'?'🏝️ 抵達小琉球白沙港！':'🏖️ 回到白沙灣了'))},st.money<230||T.hour<7||T.hour>=18],['離開','',closeDlg]])}
// ───────── 小琉球 ─────────
const LQW=1000,LQH=720,LQI=[500,370,420,270];
def('小琉球',{out:1,mtn:1,noexit:1,raw:1,W:LQW,H:LQH,title:'🏝️ 小琉球',
 pre:(c,W,H)=>{tSea(c,0,0,W,H,21);tIsland(c,LQI[0],LQI[1],LQI[2],LQI[3],W,H,31);c.fillStyle='rgba(200,170,110,.6)';c.beginPath();c.moveTo(500,630);c.quadraticCurveTo(470,480,520,360);c.quadraticCurveTo(560,260,420,200);c.lineTo(440,196);c.quadraticCurveTo(590,260,540,360);c.quadraticCurveTo(495,480,520,630);c.fill();tPlanks(c,478,624,44,96,1)},
 animf:(g,t)=>{waveAnim(g,t,LQW,LQH);if(!(capS().isle))return},
 fur:[...islandBlk(LQI[0],LQI[1],LQI[2],LQI[3],LQW,LQH,[[478,600,44,120]]),
  PD('pk26_45',150,160,110),PD('pk26_34',880,170,130),PD('pk26_46',70,600,90),PD('pk25_11',600,712,120),
  PD('pk26_0',260,230,90),PD('pk26_1',330,200,60),PD('pk25_45',700,220,70),PD('pk25_38',800,330,70),PD('pk26_40',180,470,70),PD('pk25_41',760,520,64),PD('pk26_6',340,560,70),PD('pk25_35',600,480,60),PD('pk26_12',420,300,50),PD('pk26_18',650,330,40),
  PD('pk25_0',620,410,150),PD('pk25_13',560,600,36),PD('pk26_24',260,360,80),PD('pk25_12',880,420,70),PD('pk25_2',830,400,120),PD('pk26_31',150,380,26),PD('pk25_37',920,560,100),
  BK(550,350,140,60),BK(780,350,100,50),BK(240,190,110,40)],
 ppl:[pp('浮潛教練 阿海',170,390,'#2a8ab8','#222','跟著我游，一定看得到海龜！|記得不要摸海龜喔。',{dir:0,lk:GL('jogger',311)}),pp('麻花捲阿姨',620,430,'#d4a017','#222','小琉球麻花捲，現炸的！',{dir:0,lk:{...GL('office',312),fm:1,hs:'b'}}),pp('水上摩托車老闆',860,440,'#1a1a1a','#222','外海有一座無人小島，騎過去二十分鐘。|小島上好像有人埋過東西……',{dir:0,lk:GL('worker',313)}),pp('遊客',400,450,'#ff6a8a','#222','海水好藍好清澈！',{wk:[340,560],lk:GL('tourist',314)})],
 sp:[['port',470,640,60,40],['snork',120,400,100,20],['snack',560,432,120,14],['jet',790,440,140,16],['view',840,170,90,20]],
 spl:{port:'白沙港（渡輪）',snork:'浮潛點',snack:'麻花捲小舖',jet:'水上摩托車出租',view:'燈塔遠眺'},
 spf:{port:()=>ferryMenu('小琉球'),snork:()=>snorkMenu(),snack:()=>openDlg('🥨 麻花捲小舖','「剛炸好的麻花捲，又香又脆！」',[['🥨 買一包麻花捲（💰120）','⚡+12 😊+8',()=>{st.money-=120;fxApply({s:12,j:8});advance(.2);hud();closeDlg();toast('🥨 咬下去喀滋喀滋，好香！')},st.money<120],['離開','',closeDlg]]),
  jet:()=>jetMenu('小琉球'),view:()=>{fxApply({j:6});advance(.3);hud();toast('🌊 遠方的燈塔和整片湛藍的海，好美。')}}});
function snorkMenu(){openDlg('🤿 浮潛點','清澈的海水下，珊瑚和熱帶魚清楚可見。',[['🤿 跟教練浮潛（💰600・1.5 小時）','⚡-20 😊+18，有機會看到海龜',()=>{st.money-=600;fxApply({s:-20,j:18});advance(1.5);hud();closeDlg();
  const turtle=Math.random()<.65;if(turtle){st.turtle=(st.turtle||0)+1;try{feedPost('🐢 小琉球浮潛','跟海龜一起游泳！'+(st.turtle>1?'這是第 '+st.turtle+' 次看到牠們了。':'第一次看到這麼近的海龜！'),null)}catch(e){}}
  openDlg('🤿 浮潛',turtle?'🐢 一隻大海龜慢慢地從你身邊游過，悠哉地啃著海草。你屏住呼吸，牠好像也看了你一眼。<br><br>😊 心情 +18（已發到脆G）':'熱帶魚成群游過，珊瑚五顏六色。這次沒遇到海龜，下次再來！',[['好棒！','',closeDlg]])},st.money<600||st.sta<20],['離開','',closeDlg]])}
function jetMenu(from){const to=from=='小琉球'?'外島':'小琉球';openDlg('🚤 水上摩托車',from=='小琉球'?'老闆：「外海那座無人小島，騎過去二十分鐘。風浪大的時候不出海喔！」':'回小琉球吧。',[[`🚤 騎去${to}（${from=='小琉球'?'💰1,500・':''}約 20 分鐘）`,from=='小琉球'?'含來回，還車前都能用':'',()=>{if(from=='小琉球'){st.money-=1500;hud()}closeDlg();tFade('🚤 水上摩托車衝出浪花<br><span style="font-size:14px;opacity:.8">海風呼呼地吹過耳邊……</span>',()=>{advance(.35);if(to=='外島')mtnShow('外島',120,250,2);else mtnShow('小琉球',870,470,0);SVDIRTY=1},()=>toast(to=='外島'?'🏝️ 登上了無人小島':'🏝️ 回到小琉球'))},from=='小琉球'&&st.money<1500],['離開','',closeDlg]])}
// ───────── 外島（無人小島） ─────────
const WDW=720,WDH=480,WDI=[360,250,270,160];
def('外島',{out:1,mtn:1,noexit:1,raw:1,W:WDW,H:WDH,title:'🏝️ 無人小島',
 pre:(c,W,H)=>{tSea(c,0,0,W,H,41);tIsland(c,WDI[0],WDI[1],WDI[2],WDI[3],W,H,51);if(!(st.tre))txt(c,'✕',250,312,'rgba(150,40,30,.7)','bold 16px sans-serif')},
 animf:(g,t)=>{waveAnim(g,t,WDW,WDH);if(!(st.mushF&&st.mushF.isle)){const a=.35+.3*Math.sin(t*2.4);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;try{g.drawImage(GLOW,566-10,160-10,20,20)}catch(e){}g.restore()}},
 fur:[...islandBlk(WDI[0],WDI[1],WDI[2],WDI[3],WDW,WDH,[]),PD('pk26_0',520,200,110),PD('pk26_1',590,190,70),PD('pk25_41',470,170,60),PD('pk26_40',180,180,64),PD('pk26_23',380,330,70),PD('pk26_13',300,160,50),PD('pk26_36',640,420,90),PD('pk25_12',90,280,60),PD('pk26_37',420,380,18),PD('pk26_33',230,360,14),
  BK(470,170,150,34)],
 ppl:[],sp:[['jet',60,250,70,40],['palm',540,140,60,30],['x',236,296,30,22]],spl:{jet:'水上摩托車',palm:'椰子樹後面',x:'沙灘上的 ✕ 記號'},
 spf:{jet:()=>jetMenu('外島'),palm:()=>mushIsle(),x:()=>treasure()}});
function treasure(){if(st.tre)return toast('坑已經挖過了，只剩一個沙洞。');openDlg('✕ 沙灘上的記號','沙子上被人用石頭排了一個大大的 ✕。',[['🖐️ 用手挖挖看（約 30 分鐘・⚡-10）','',()=>{st.tre=1;fxApply({s:-10,j:20});advance(.5);addItem('tcoin',1);hud();closeDlg();
  openDlg('💰 寶藏！','挖了半個鐘頭，指甲縫都是沙……「喀」——碰到一個生鏽的鐵盒！<br>打開一看，裡面躺著一枚閃閃發亮的古老金幣。<div style="display:flex;justify-content:center;gap:10px;margin:6px 0">'+pkSpr('43',6,72)+pkSpr('43',5,60)+'</div>🏅 獲得 <b>寶藏金幣</b> ×1（可到銀行兌換 💰20,000）',[['發財了！','',closeDlg]]);try{feedPost('🏝️ 無人島尋寶','在小琉球外海的無人島挖到古老的寶藏金幣！',null)}catch(e){}},st.sta<10],['算了','',closeDlg]])}
// ───────── 神秘蘑菇 ─────────
const mushF=()=>st.mushF||(st.mushF={});
function mushIsle(){const M=mushF();if(M.isle)return toast('椰子樹後面只剩一圈被壓過的草。');M.isle=1;addItem('mush',1);hud();SVDIRTY=1;
 openDlg('🍄 椰子樹後面','繞到最大棵的椰子樹後面，樹根旁的陰影裡，有一點微弱的藍綠色光芒……<br>撥開落葉——又是一顆會發光的蘑菇！<br><div style="display:flex;justify-content:center;margin:6px 0">'+mushArt(64)+'</div>🍄 獲得 <b>神秘蘑菇</b> ×1'+(M.onsen?'<br><span style="font-size:12px;opacity:.8">（跟知本山丘那顆長得一模一樣。）</span>':''),[['收好','',closeDlg]])}
{const R=IN['溫泉鄉'];if(R){R.sp.push(['glow',30,620,60,40]);R.spl.glow='奇怪的草叢';R.spf.glow=()=>{const M=mushF();if(M.onsen)return toast('草叢裡什麼都沒有了。');const night=T.hour>=18||T.hour<5;
  openDlg('🌿 奇怪的草叢',night?'夜色裡，小山丘下的草叢透出一點點藍綠色的光……':'小山丘下有一叢特別茂密的草。好像有什麼東西？（晚上來看看會比較清楚）',[['🖐️ 撥開草叢','',()=>{M.onsen=1;addItem('mush',1);hud();SVDIRTY=1;closeDlg();openDlg('🍄 神秘蘑菇','撥開草叢，一朵小小的蘑菇正微微發著光，傘面像是撒了星星。<br>聞起來有淡淡的硫磺味和青草香……<br><div style="display:flex;justify-content:center;margin:6px 0">'+mushArt(64)+'</div>🍄 獲得 <b>神秘蘑菇</b> ×1<br><span style="font-size:12px;opacity:.8">（要吃嗎？看起來不太像能吃的東西……）</span>',[['收好','',closeDlg]])}],['離開','',closeDlg]])};
 const an=R.animf;R.animf=(g,t)=>{an&&an(g,t);if(mushF().onsen)return;const night=T.hour>=18||T.hour<5,a=(night?.55:.18)+.2*Math.sin(t*2);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;try{g.drawImage(GLOW,52,628,16,16)}catch(e){}g.restore()}}}
// ───────── 觀音山（山頂）與白髮老人 ─────────
const YTW=820,YTH=520;
def('觀音山',{out:1,mtn:1,noexit:1,W:YTW,H:YTH,title:'⛰️ 觀音山・山頂',
 pre:(c,W,H)=>{GR(c,0,0,W,170,'#9ccbe8','#eaf2ee');const pk=(bx,top,base,w,col)=>oPoly(c,[[bx-w,base],[bx,top],[bx+w,base]],col);
  [[120,40,170,180,'#8fa6c2'],[400,20,170,220,'#8aa0be'],[700,50,170,200,'#93aac4']].forEach(q=>pk(...q));c.fillStyle='rgba(255,255,255,.85)';[[60,70,60],[300,100,80],[620,60,70]].forEach(q=>{c.beginPath();c.ellipse(q[0],q[1],q[2],12,0,0,7);c.fill()});
  R(c,0,160,W,H-160,'#7ea85a');const r=orn(901);for(let i=0;i<2600;i++)R(c,r()*W,160+r()*(H-160),1,3,['#6a9648','#8ab866','#5a8a3c'][i%3]);
  for(let i=0;i<60;i++)R(c,r()*W,170+r()*(H-170),3+r()*4,2,'rgba(120,110,95,.5)');
  c.fillStyle='#b8a888';c.beginPath();c.moveTo(380,H);c.quadraticCurveTo(400,380,420,300);c.quadraticCurveTo(430,240,400,200);c.lineTo(440,200);c.quadraticCurveTo(470,250,450,310);c.quadraticCurveTo(430,390,450,H);c.fill();
  R(c,580,230,110,70,'#8a5a2e');R(c,584,234,102,62,'#a8794a');oPoly(c,[[570,232],[635,190],[700,232]],'#5a3418');R(c,624,262,22,38,'#4a2a12');R(c,592,248,20,14,'#d8eef6');R(c,656,248,20,14,'#d8eef6');txt(c,'蓬萊居',635,224,'#fff3d6','bold 7px sans-serif');
  R(c,396,176,4,30,'#6a4222');R(c,376,170,44,14,'#8a5a2e');txt(c,'觀音山 616 m',398,180,'#fff3d6','bold 6px sans-serif')},
 animf:(g,t)=>{const fx=560,fy=320;for(let i=0;i<6;i++){const ph=(t*1.4+i/6)%1;g.fillStyle=`rgba(${i%2?'255,170,60':'255,220,90'},${.8*(1-ph)})`;g.beginPath();g.ellipse(fx+Math.sin(t*5+i)*3,fy-ph*14,3*(1-ph)+1,4*(1-ph)+1,0,0,7);g.fill()}
  g.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<4;i++){const ph=(t*.3+i/4)%1;g.beginPath();g.ellipse(fx+ph*16,fy-16-ph*30,3+ph*6,2+ph*4,0,0,7);g.fill()}},
 fur:[BK(0,0,YTW,168),BK(570,226,130,76),
  ...[[40,200],[90,240],[60,320],[140,420],[30,460],[760,200],[790,280],[720,420],[780,470],[250,210],[520,190],[200,470],[640,470]].map(q=>['pine',q[0],q[1],8,6]),
  ...[[300,300,22,12],[480,420,18,10],[120,360,20,12],[700,330,24,12],[560,330,14,8]].map(q=>['rockb',...q])],
 ppl:[pp('白髮老長官',530,318,'#e8e8e8','#f4f4f4','……',{sit:1,dir:0,lk:GL('elder',777)})],
 sp:[['down',380,490,80,30],['view',360,190,80,20],['hermit',500,300,60,40]],spl:{down:'下山步道（回知本）',view:'山頂觀景',hermit:'白髮老長官'},
 spf:{down:()=>openDlg('🥾 下山步道','沿著石階下山，大約 1.5 小時回到知本溫泉。',[['🥾 下山（約 1.5 小時・⚡-10）','',()=>{closeDlg();fxApply({s:-10});tFade('🥾 下山中……',()=>{advance(1.5);mtnShow('溫泉鄉',1050,500,3);hud()})},st.sta<10],['再待一下','',closeDlg]]),
  view:()=>{fxApply({j:10,h:3});advance(.3);hud();try{feedPost('⛰️ 登上觀音山','海拔 616 公尺，整座城市和海港都在腳下！',null)}catch(e){}openDlg('⛰️ 山頂觀景','城市、河口和遠方的海港一覽無遺，風吹過芒草沙沙作響。<br>你大口呼吸著冰涼的空氣，覺得一切煩惱都變小了。<br><br>😊 +10　❤️ +3（已發到脆G）',[['好美……','',closeDlg]])},
  hermit:()=>hermitTalk()}});
// 把山頂老人的對話換成劇情
{const R=IN['觀音山'];R.ppl[0].L=['……'];}
function hermitTalk(){const C=capS(),H2=st.hmt||(st.hmt={m:0});
 if(C.hermit)return openDlg('💬 白髮老長官','「老弟，又上來啦？身體練得怎麼樣？」<br>老人摸著鬍子笑：「力氣要用在對的地方——照顧好你身邊的人。」',[['謝謝阿伯！','',closeDlg]]);
 if(!H2.m){H2.m=1;SVDIRTY=1;return openDlg('💬 白髮老長官','火堆旁坐著一位滿頭白髮的老人，腰桿挺得筆直，眼睛亮得像年輕人。<br>「老弟，一路爬上來臉不紅氣不喘……你是陸戰隊的吧？哪一營的？」<br>「哈！我是你們的老學長，當年在陸戰隊帶過兵，退伍後就住在這座山上。」<br><br>老長官摸摸肚子：「山上什麼都有，就是沒有<b>溫泉蛋</b>。下次上來，幫我帶<b>十顆</b>知本的溫泉蛋，我分給山上的老朋友吃。」',[['好，下次幫您帶！','',closeDlg]])}
 if((st.inv.onsenegg||0)>=10)return openDlg('💬 白髮老長官','你從背包拿出十顆溫泉蛋。老長官眼睛一亮：「哈！還記得！整整十顆！」',[['🥚 把十顆溫泉蛋送給他','',()=>{st.inv.onsenegg-=10;hud();closeDlg();
   capGive('hermit','老長官的仙藥','老長官小心地剝開一顆蛋殼，一口吃下，滿足地瞇起眼。<br>「好久沒吃到了……來，這個給你。」<br>他從懷裡掏出一個小鐵盒，裡面是一顆紅白相間的膠囊。<br>「當年部隊裡流傳的<b>仙藥</b>——其實就是瑪卡基酸膠囊咖啡啦，哈哈！喝了力氣會變大。」')}],['等等再給','',closeDlg]]);
 openDlg('💬 白髮老長官',`「十顆溫泉蛋呢？知本的溫泉蛋攤就在廣場旁邊。」<br>老長官笑呵呵地烤著火。<br><span style="font-size:12px;opacity:.8">（你身上有 ${st.inv.onsenegg||0} 顆溫泉蛋）</span>`,[['下次一定帶！','',closeDlg]])}
// 知本登山步道：多一個攻頂選項
{const _tm=trailMenu;trailMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&t.includes('登山步道')){const dark=T.hour<6||T.hour>=16;opts.splice(1,0,['⛰️ 挑戰攻頂：觀音山（約 3 小時・⚡-35）',dark?'下午四點以後不能出發攻頂，太危險了':'小百岳 #5，山頂住著一位神秘的白髮老長官',()=>{closeDlg();fxApply({s:-35});tFade('⛰️ 一步一步往上爬……<br><span style="font-size:14px;opacity:.8">樹林變矮，雲就在腳邊</span>',()=>{advance(3);st.ytN=(st.ytN||0)+1;mtnShow('觀音山',410,470,1);hud();SVDIRTY=1},()=>toast(st.ytN==1?'⛰️ 第一次登上觀音山！':'⛰️ 抵達山頂'))},dark||st.sta<35])}return od.call(this,t,d,opts,...r)};try{return _tm.apply(this,arguments)}finally{openDlg=od}}}
// 火車站：南下白沙灣
{const _tr=trainMenu;trainMenu=function(side){const od=openDlg;openDlg=function(t,d,opts,...r){if(side=='town'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]&&o[0].includes('時刻表'));opts.splice(i<0?opts.length-1:i,0,['🚌 搭客運南下：墾J白沙灣（💰420・約 2 小時）',trainOpen()?'海灘、海產、渡輪去小琉球':'目前不是營運時間（05:30–22:00）',()=>{st.money-=420;hud();closeDlg();tFade('🚌 客運南下<br><span style="font-size:14px;opacity:.8">窗外的田野慢慢變成海岸線……</span>',()=>{advance(2);st.dgN=(st.dgN||0)+1;mtnShow('白沙灣',140,640,1);SVDIRTY=1},()=>toast(st.dgN==1?'🏖️ 第一次來到墾J白沙灣！海風鹹鹹的。':'🏖️ 抵達白沙灣'))},st.money<420||!trainOpen()])}return od.call(this,t,d,opts,...r)};try{return _tr.apply(this,arguments)}finally{openDlg=od}}}
// ───────── 力量膠囊：陸戰隊季測、拳擊月賽冠軍 ─────────
function fitTest(){const c=cal(),mx=staMax(),gs=(st.gym&&st.gym.streak)||0;const sc=Math.round(Math.min(100,42+(st.pow||0)*.25+gs*3+(mx-100)*.12+(st.hp||0)*.05+(Math.random()*14-7)));
 const pu=Math.round(40+sc*.6),su=Math.round(45+sc*.55),run=Math.max(600,Math.round(1080-sc*4.2)),rank=sc>=80?1:sc>=70?Math.ceil(2+(80-sc)/3):Math.ceil(6+(70-sc)/2);
 const C=capS();let txt2=`${c.name}季末，陸戰隊照例舉辦<b>全營體能測驗</b>。<br><br>💪 引體向上 2 分鐘：<b>${pu}</b> 下<br>🔥 仰臥起坐 2 分鐘：<b>${su}</b> 下<br>🏃 3000 公尺：<b>${Math.floor(run/60)}:${String(run%60).padStart(2,'0')}</b><br><br>總分 <b>${sc}</b>　全營排名 <b>第 ${rank} 名</b>`;
 if(rank==1){fxApply({r:10,j:15});txt2+='<br><br>🏆 營長親自頒獎：「全營第一！幹得好！」';if(!C.test){openDlg('🎖️ 陸戰隊體能測驗',txt2,[['報告長官，謝謝長官！','',()=>{closeDlg();capGive('test','營長的獎品','頒獎完，營長把你叫到一旁，塞給你一個小紙盒：「這是我私藏的<b>瑪卡基酸膠囊咖啡</b>，全營第一才有。別跟別人說！」')}]]);return}}
 else txt2+=`<br><br><span style="font-size:12px;opacity:.8">${C.test?'':'聽說全營第一名，營長會私下送一份神秘獎品……多去健身房、練力量吧！（總分 80 以上有機會拿第一）'}</span>`;
 openDlg('🎖️ 陸戰隊體能測驗',txt2,[['繼續努力','',closeDlg]])}
{const _wr=wkReturn;wkReturn=function(){const c=cal();const r=_wr.apply(this,arguments);try{if(c.w==16)whenFree(fitTest)}catch(e){}return r}}
{const _od=openDlg;openDlg=function(t,d,opts,...r){const res=_od.call(this,t,d,opts,...r);try{if(t=='🏆 冠軍！'&&!capS().box){const C=capS();setTimeout(()=>capGive('box','教練的祝福','走下擂台，教練用力拍了拍你的肩：「第一次奪冠，這個給你。」<br>他從運動包裡拿出一個小罐子——<b>瑪卡基酸膠囊咖啡</b>。<br>「我當年第一次拿冠軍，我的教練也送了我一顆。以後輪到你傳下去。」'),400)}}catch(e){}return res}}
// 背包裡的膠囊、蘑菇顯示圖
{const _ob=openBag;openBag=function(){const r=_ob.apply(this,arguments);try{dbox.querySelectorAll('button .ic').forEach(e=>{const t=e.parentElement.textContent;if(t.includes('膠囊咖啡'))e.innerHTML=capArt(28);else if(t.includes('神秘蘑菇'))e.innerHTML=mushArt(28)})}catch(e){}return r}}
// 手機任務清單：力量來源提示
{const _tv=todoView;todoView=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(typeof d=='string'){const C=capS(),M=mushF();const h=[];if(!C.test)h.push('陸戰隊季末體能測驗拿全營第一');if(!C.box)h.push('拳擊月賽第一次奪冠');if(!C.hermit)h.push((st.hmt&&st.hmt.m)?'帶十顆溫泉蛋給觀音山的白髮老長官':'知本登山步道攻頂觀音山');
  if(h.length)d+=`<br>☕ 力量膠囊 ${3-h.length}/3：${h.join('、')}`;const m2=(M.onsen?1:0)+(M.isle?1:0);if(m2<2)d+=`<br>🍄 神秘蘑菇 ${m2}/2：${!M.onsen?'知本溫泉某個會發光的草叢':''}${!M.onsen&&!M.isle?'、':''}${!M.isle?'小琉球外海的無人島':''}`}return od.call(this,t,d,opts,...r)};try{return _tv.apply(this,arguments)}finally{openDlg=od}}}
