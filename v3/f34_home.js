/* v8.6 主角的家：5F 公寓（照冠宏家的格局）＋ 6F 頂樓加蓋 */
const LFW=k=>{const m=typeof LFMETA!='undefined'&&LFMETA[k];return m?Math.round(m[2]*.3):24};
// 素材家具：[uaf, x, y(腳底區上緣), 寬, 深(碰撞), 素材, 阻擋, 選項]
const UF=(k,x,bot,w,d,solid=1,o)=>{w=w||LFW(k);d=d||Math.max(4,Math.min(14,(w*LFAR(k))*.4));return['uaf',x,bot-d,w,d,k,solid,Object.assign({hm:99},o||{})]};
const LFAR=k=>{const m=typeof LFMETA!='undefined'&&LFMETA[k];if(m)return m[3]/m[2];const im=UAI[k];return im&&im.naturalWidth?im.naturalHeight/im.naturalWidth:1};
const WH_=(x1,x2,y)=>['wallh',x1,y,x2-x1,7],WV_=(x,y1,y2)=>['wallv',x,y1,7,y2-y1];
FD.stairs=(c,x,y,w,h,f)=>{R(c,x,y,w,h,'#6a5038');const n=Math.max(4,Math.round(h/7));for(let i=0;i<n;i++){const yy=y+i*h/n,sh=.55+.45*(i/n);R(c,x+2,yy,w-4,h/n-1,`rgba(${Math.round(200*sh)},${Math.round(170*sh)},${Math.round(130*sh)},1)`);R(c,x+2,yy+h/n-2,w-4,1,'rgba(0,0,0,.25)')}
 R(c,x,y,2,h,'#3a2a1a');R(c,x+w-2,y,2,h,'#3a2a1a');txt(c,f[5]||'▲ 上樓',x+w/2,y+h+8,'rgba(255,255,255,.9)','bold 7px sans-serif')};
FD.doorm=(c,x,y,w,h,f)=>{RR(c,x,y,w,h,2,'#7a4a2a');R(c,x+2,y+2,w-4,h-4,'#a86a3a');txt(c,f[5]||'出入口',x+w/2,y+h-3,'#fff3d6','bold 6.5px sans-serif')};
FD.glassw=(c,x,y,w,h)=>{R(c,x,y,w,h,'rgba(190,225,240,.55)');R(c,x,y,w,1.2,'#e8f6ff');R(c,x,y+h-1.2,w,1.2,'#7a9aaa');for(let i=y+10;i<y+h;i+=24)R(c,x,i,w,1,'#7a9aaa')};
['doorm'].forEach(k=>FLAT.add(k));
const roomFloor=(c,list)=>list.forEach(q=>{if(!LTX(c,q[0],q[1],q[2],q[3],q[4],q[5]||24))R(c,q[1],q[2],q[3],q[4],q[6]||'#c9a06a')});
// ───────── 5F ─────────
const H5W=540,H5H=820;
def('家',{W:H5W,H:H5H,f:'#d9b98a',g:'#cfae7e',fl:'wood',w:'#c97a5a',title:'🏠 我的家・5F',noexit:1,v2:1,
 pre:(c,W,H)=>{roomFloor(c,[['lt_12',4,28,436,198],['lt_18',4,226,200,77],['lt_19',4,303,201,115],['lt_11',4,418,201,142],['lt_13',4,560,201,248],['lt_19',212,303,75,331],['lt_13',287,303,152,201],['lt_13',212,504,314,304],['lt_7',446,28,80,476],['lt_16',12,32,58,86]]);
  R(c,W/2-34,H-4,68,4,'#3a2210');
  [['樓梯',41,128],['餐廳',95,150],['客廳',300,150],['廚房',105,296],['冰箱・洗衣',105,410],['廁所',48,552],['浴室',150,552],['書房',105,800],['走廊',250,450],['客房',363,496],['主臥室',380,800],['陽台走廊',486,496]].forEach(q=>txt(c,q[0],q[1],q[2],'rgba(60,30,10,.25)','bold 9px sans-serif'))},
 fur:[
  // 牆
  WV_(439,28,92),WV_(439,150,504),WH_(4,60,303),WH_(104,213,303),WH_(287,446,303),
  WV_(205,303,320),WV_(205,356,470),WV_(205,505,590),WV_(205,628,808),WV_(287,310,318),WV_(287,356,640),
  WH_(4,20,418),WH_(56,205,418),WV_(94,418,560),WH_(4,205,560),
  WH_(212,226,634),WH_(272,294,634),WH_(287,526,504),WV_(526,28,808),
  // 樓梯・入口
  ['stairs',12,32,58,82,'▲ 6F 頂樓'],['doorm',458,30,56,14,'入口'],
  // 客廳
  UF('lf_162',316,60,78),UF('lf_163',300,58,12),UF('lf_163',396,58,12),UF('lf_128',236,26,14,4,0),UF('lf_131',392,27,16,4,0),UF('lf_138',180,58,46),UF('lf_280',408,58,24),
  UF('lf_171',268,212,140,4,0,{z:-1}),UF('lf_139',312,196,52),UF('lf_120',300,262,104),UF('lf_181',404,200,28),UF('lf_137',414,262,14),
  // 餐廳
  UF('lf_143',40,186,100),UF('lf_152',24,178,14),UF('lf_153',144,178,14),UF('lf_134',170,160,16),UF('lf_264',170,216,20),
  // 廚房
  UF('lf_209',12,298,58),UF('lf_210',74,298,60),UF('lf_211',138,298,52),UF('lf_183',150,262,26,2,0,{z:1}),UF('lf_189',112,262,16,2,0,{z:1}),UF('lf_180',30,262,14,2,0,{z:1}),
  // 冰箱・洗衣
  UF('lf_182',12,410,32),UF('lf_202',60,410,20),UF('lf_190',120,410,32),UF('lf_191',156,410,30),UF('lf_212',184,340,16),
  // 廁所・浴室
  UF('lf_192',60,470,26),['basin',14,520,34,26],UF('lf_194',106,552,64),UF('lf_196',170,470,32),['basin',110,430,30,24],UF('lf_222',176,548,26,4,0,{z:-1}),
  // 書房
  ['pcdesk',16,576,70,24,'#7a5a38'],UF('lf_161',40,652,24),UF('lf_124',92,608,50),UF('lf_146',150,800,46),UF('lf_148',14,760,78),UF('lf_176',40,778,22,4,0),UF('lf_160',100,740,16),UF('lf_156',100,690,70),UF('lf_266',186,700,16),
  // 走廊
  UF('lf_265',262,622,18),
  // 客房
  UF('lf_205',380,420,52),UF('lf_200',356,346,22),UF('lf_158',300,498,36),UF('lf_173',330,480,60,4,0,{z:-1}),UF('lf_203',412,494,18),
  // 主臥室
  UF('lf_204',380,612,110),UF('lf_200',354,550,24),UF('lf_200',494,550,24),UF('lf_207',300,722,78),UF('lf_145',226,700,56),UF('lf_217',296,560,20),UF('lf_239',500,622,18),UF('lf_172',390,722,90,4,0,{z:-1}),UF('lf_203',490,800,20),
  // 陽台走廊
  ['shoeshelf',476,58,46,16],UF('lf_278',500,124,8),UF('lf_279',512,124,8),UF('lf_264',500,180,22),UF('lf_272',498,260,24),UF('lf_283',498,340,22),UF('lf_288',490,420,30),UF('lf_273',498,495,24)],
 ppl:[],
 sp:[['door',456,44,60,10],['stair',12,114,58,12],['sleep',380,614,110,10],['mirror',300,724,78,10],['wardrobe',226,702,56,10],['study',16,602,70,10],['read',92,610,50,10],['cook',12,278,180,10],['fridge',12,410,34,8],['eat',40,190,100,10],['tv',316,62,78,10],['sofa',300,264,104,10],['toilet',60,472,26,10],['sink',14,548,34,10],['tub',106,552,64,8],['wash',120,410,66,8],['piano',14,780,78,10],['guest',380,422,52,10]],
 spl:{door:'出門',stair:'上樓（6F 頂樓加蓋）',sleep:'床・睡覺',mirror:'梳妝台',wardrobe:'衣櫃（裝備）',study:'書桌',read:'書櫃',cook:'廚房',fridge:'冰箱',eat:'餐桌',tv:'電視',sofa:'沙發小睡',toilet:'馬桶',sink:'洗手台',tub:'浴缸淋浴',wash:'洗衣機',piano:'彈鋼琴',guest:'客房的床'},
 spf:{door:()=>exitTown(),stair:()=>homeFloor(6),sleep:()=>openHome(),mirror:()=>homeAct('mirror'),wardrobe:()=>openEquip(),study:()=>homeAct('study'),read:()=>homeAct('read'),cook:()=>homeAct('cook'),fridge:()=>homeAct('fridge'),eat:()=>homeAct('eat'),tv:()=>homeAct('tv'),sofa:()=>homeAct('sofa'),toilet:()=>homeAct('toilet'),sink:()=>homeAct('sink'),tub:()=>homeAct('tub'),wash:()=>homeAct('wash'),
  piano:()=>openDlg('🎹 鋼琴','坐下來彈一首詩歌。',[['彈一首詩歌（30 分鐘）','😊+6 🧠+1',()=>{fxApply({j:6,w:1});advance(.5);hud();closeDlg();toast('🎹 指尖流出熟悉的旋律，心也安靜下來了。')}],['離開','',closeDlg]]),
  guest:()=>openDlg('🛏️ 客房','乾淨的客房，朋友來過夜時睡這裡。',[['躺一下（1 小時）','⚡+12',()=>{fxApply({s:12});advance(1);hud();closeDlg();toast('客房的床意外地好睡。')}],['離開','',closeDlg]])},
 onEnter:IN['家']&&IN['家'].onEnter});
// ───────── 6F 頂樓加蓋 ─────────
def('家6F',{W:500,H:650,f:'#d9b98a',g:'#cfae7e',fl:'wood',w:'#8a7a6a',title:'🏠 我的家・6F 頂樓加蓋',noexit:1,par:'家',ret:[30,124],
 pre:(c,W,H)=>{roomFloor(c,[['lt_16',4,28,65,237],['lt_21',69,28,189,237],['lt_19',4,265,482,40],['lt_11',4,305,134,80],['lt_18',138,305,117,80],['lt_7',441,28,45,357],['lt_27',4,385,492,261]]);
  FD.tatami(c,265,30,176,355);R(c,W/2-34,H-4,68,4,'#3a2210');
  const sky=c.createLinearGradient(0,385,0,H);sky.addColorStop(0,'rgba(255,255,255,.06)');sky.addColorStop(1,'rgba(255,230,160,.12)');c.fillStyle=sky;c.fillRect(4,385,492,261);
  [['樓梯',36,258],['健身房',160,258],['和室',350,378],['儲藏室',70,378],['廁所',196,378],['室外陽台',250,636]].forEach(q=>txt(c,q[0],q[1],q[2],'rgba(60,30,10,.28)','bold 9px sans-serif'))},
 fur:[
  WV_(69,28,232),WH_(69,100,265),WH_(190,258,265),['glassw',258,28,7,237],WV_(441,28,385),WH_(369,448,385),
  WH_(4,78,305),WH_(123,186,305),WH_(231,262,305),WV_(138,305,385),WV_(255,305,385),WH_(4,262,385),
  ['stairs',8,32,56,82,'▼ 5F'],
  // 健身房
  UF('lf_228',84,100,56),UF('lf_231',160,100,32),UF('lf_230',214,110,20),UF('lf_232',90,190,22,4,0,{z:-1}),UF('lf_233',120,190,8,3,0),UF('lf_234',140,190,30),UF('lf_247',190,180,40),UF('lf_229',226,230,10),UF('lf_154',236,80,18),UF('lf_203',236,250,16),
  // 和室
  ['lowt',310,170,80,40],['zabu',290,180,18,14],['zabu',394,180,18,14],['zabu',340,220,18,14],UF('lf_131',340,27,22,4,0),UF('lf_267',272,70,40),UF('lf_174',410,60,20),UF('lf_281',412,370,18),UF('lf_125',272,360,22),
  // 儲藏室・廁所
  UF('lf_144',10,360,30),UF('lf_175',40,380,36),UF('lf_201',96,380,30),UF('lf_213',128,360,8),UF('lf_192',220,360,24),['basin',150,322,28,22],
  // 陽台
  UF('lf_26',20,480,90),UF('lf_29',180,520,70),UF('lf_66',160,520,14),UF('lf_66',254,520,14),UF('lf_271',380,470,90),UF('lf_284',20,630,50),UF('lf_290',80,630,40),UF('lf_273',300,630,24),UF('lf_272',340,630,24),UF('lf_275',440,600,30),UF('lf_268',450,530,24),UF('lo_bench',240,630,36),UF('lf_283',130,630,20)],
 ppl:[],
 sp:[['stair',8,114,56,10],['work',84,100,150,10],['tea',300,212,100,10],['sun',150,560,180,12],['clothes',20,480,90,10],['toilet',216,360,30,10],['sink',150,344,28,10],['store',10,362,60,10],['plants',380,470,90,10]],
 spl:{stair:'下樓（5F）',work:'健身房',tea:'和室',sun:'陽台',clothes:'曬衣架',toilet:'馬桶',sink:'洗手台',store:'儲藏室',plants:'溫室花圃'},
 spf:{stair:()=>homeFloor(5),toilet:()=>homeAct('toilet'),sink:()=>homeAct('sink'),
  work:()=>openDlg('🏋️ 頂樓健身房','自己家的健身房，隨時都能練。',[['💪 重訓 1 小時','⚔️+2 ❤️+3 ⚡-15',()=>{fxApply({p:2,h:3,s:-15});advance(1);hud();closeDlg();toast('💪 汗流浹背，肌肉充血！')},st.sta<15],['🥊 打沙包 30 分鐘','⚔️+1 😊+3 ⚡-8',()=>{fxApply({p:1,j:3,s:-8});advance(.5);hud();closeDlg();toast('🥊 砰砰砰！壓力全打出去了。')},st.sta<8],['🧘 伸展瑜珈','❤️+2 😊+3 ⚡+4',()=>{fxApply({h:2,j:3,s:4});advance(.5);hud();closeDlg();toast('🧘 筋骨放鬆了。')}],['離開','',closeDlg]]),
  tea:()=>openDlg('🍵 和室','榻榻米的香味，很適合靜下心。',[['泡一壺茶（30 分鐘）','😊+5 ⚡+6',()=>{fxApply({j:5,s:6});advance(.5);hud();closeDlg();toast('🍵 熱茶下肚，整個人暖起來。')}],['🙏 安靜禱告','😊+6 🧠+2',()=>{fxApply({j:6,w:2});advance(.5);hud();closeDlg();toast('🙏 在安靜中把心交託給神。')}],['躺在榻榻米上午睡（1 小時）','⚡+15',()=>{fxApply({s:15});advance(1);hud();closeDlg();toast('涼涼的榻榻米，好好睡。')}],['離開','',closeDlg]]),
  sun:()=>openDlg('☀️ 室外陽台',T.hour>=18||T.hour<5?'夜風很舒服，遠處的城市燈火一閃一閃。':'陽光灑滿頂樓，天空好藍。',[['吹吹風、發個呆（30 分鐘）','😊+5',()=>{fxApply({j:5});advance(.5);hud();closeDlg();toast(T.hour>=18||T.hour<5?'🌃 看著夜景，心情放鬆了。':'☀️ 曬曬太陽，充飽電！')}],['離開','',closeDlg]]),
  clothes:()=>openDlg('👕 曬衣架','頂樓最適合曬衣服了。',[['收衣服、摺衣服（30 分鐘）','😊+2 ✨+1',()=>{fxApply({j:2,l:1});advance(.5);hud();closeDlg();toast('👕 衣服都是太陽的味道。')}],['離開','',closeDlg]]),
  store:()=>openDlg('📦 儲藏室','堆滿了紙箱和舊東西。',[['翻翻舊東西（30 分鐘）','😊+3',()=>{fxApply({j:3});advance(.5);hud();closeDlg();toast('📦 翻到一本舊相簿，回憶湧上心頭。')}],['離開','',closeDlg]]),
  plants:()=>openDlg('🪴 溫室花圃','種了不少花草。',[['澆花（20 分鐘）','😊+3',()=>{fxApply({j:3});advance(.33);hud();closeDlg();toast('🪴 花開得好漂亮！')}],['離開','',closeDlg]])}});
function homeFloor(f){const r=IN[f==6?'家6F':'家'];if(f==6){mtnShow('家6F',30,126,0);unstick();toast('🪜 走上頂樓加蓋')}else{mtnShow('家',32,128,0);unstick();toast('🪜 回到 5F')}}
// 進門位置：右上角入口
{const _eb=enterB;enterB=function(z){const r=_eb.apply(this,arguments);if(z&&z.n=='家'){p.x=452;p.y=46;p.dir=0}return r}}
// 家裡的人物位置調整（家宜、寵物、房東太太）
{const R=IN['家'],o0=R.onEnter;R.onEnter=rm=>{o0&&o0(rm);rm.ppl.forEach(n=>{if(n.hp){n.r=[230,90,190,140];n.x=Math.min(Math.max(n.x,240),400);n.y=200}if(n.ll){n.x=360;n.y=110}if(n.yjH){n.x=330;n.y=228}})}}
// 舊存檔的家具佈置（舊格局）不再套用
function homeV2Fix(){try{if(st.lay&&st.lay['家']&&!st.lay['家'].v2){delete st.lay['家'];const r=IN['家'];r.fur0=null;r.fixed=null}}catch(e){}}
{const _sl=svLoad;svLoad=function(){const r=_sl.apply(this,arguments);homeV2Fix();return r}}
homeV2Fix();
