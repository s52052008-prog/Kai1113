/* ===== v5.0：山區溫泉鄉・場景、室內、店家與活動 ===== */
Object.assign(I,{'火車站':'🚉','溫泉鄉':'♨️','溫泉鄉站':'🚉','湯之里旅館':'♨️','岩之湯':'♨️','山莊食堂':'🍱','茶行':'🍵'});
FLAT.add('bridge');FLAT.add('deck');FLAT.add('torii');FLAT.add('zabu');
IT.manju={n:'溫泉饅頭',i:'🍡',p:12,d:'黑糖內餡，熱呼呼的。⚡+14 😊+5',u:{s:14,j:5}};PR.manju=25;
IT.onsenegg={n:'溫泉蛋',i:'🥚',p:14,d:'蛋白如牛奶、蛋黃如布丁。⚡+14 😊+6',u:{s:14,j:6}};PR.onsenegg=28;
IT.ekiben={n:'鐵路便當',i:'🍱',p:18,d:'排骨飯配滷蛋。⚡+30 😊+4',u:{s:30,j:4}};PR.ekiben=45;
IT.mtea={n:'高山茶',i:'🍵',p:30,d:'清香回甘。⚡+8 🧠+2 😊+4',u:{s:8,w:2,j:4}};PR.mtea=60;
IT.carving={n:'木雕小物',i:'🪵',p:35,d:'山裡師傅手作。使用：😊+12',u:{j:12}};PR.carving=70;
IT.maple={n:'楓葉書籤',i:'🍁',p:15,d:'夾進書裡的秋天。使用：😊+6',u:{j:6}};PR.maple=30;
IT.mushroom={n:'山菇',i:'🍄',p:28,d:'山裡採的香菇。食用：⚡+16 ❤️+4',u:{s:16,h:4}};PR.mushroom=56;
SHOP['茶行']=['mtea','manju','carving','maple'];
const OW=1100,OH=720;
// ── 旅行：換圖轉場 ──
var TRIP=0;
window.addEventListener('keydown',e=>{if(TRIP){e.stopImmediatePropagation();e.preventDefault()}},true);
function tFade(txt,mid,done){let e=document.getElementById('tfade');if(!e){e=document.createElement('div');e.id='tfade';e.style.cssText='position:fixed;inset:0;background:#07070c;color:#fff;display:flex;align-items:center;justify-content:center;font:bold 20px sans-serif;letter-spacing:2px;opacity:0;pointer-events:none;transition:opacity .55s;z-index:9999;text-align:center;line-height:1.7';document.body.appendChild(e)}
 e.innerHTML=txt;e.style.pointerEvents='auto';e.style.opacity=1;TRIP=1;Object.keys(keys).forEach(k=>keys[k]=0);
 setTimeout(()=>{try{mid()}catch(err){console.error(err)}setTimeout(()=>{e.style.opacity=0;e.style.pointerEvents='none';TRIP=0;if(done)done()},900)},700)}
function mtnShow(name,x,y,dir){const old=rm;scene=name;rmBuild(name);p.x=x;p.y=y;p.vx=p.vy=0;p.dir=dir==null?0:dir;PET.in=0;Object.keys(keys).forEach(k=>keys[k]=0);SVDIRTY=1}
function mtnGo(name){const r=IN[name];toast(I[name]+' 進入'+name);mtnShow(name,r.W/2-6,r.H-22,1)}
function mtnBack(){const r=rm,par=IN[r.par];mtnShow(r.par,r.ret[0],r.ret[1],0)}
function mtnReset(){scene=null;PET.in=0}
function mtnRestore(sc,x,y){outPos={z:Z.find(z=>z.n=='火車站')};mtnShow(sc,x,y,0)}
const trainOpen=()=>T.hour>=5.5&&T.hour<22;
function trainMenu(side){const town=side=='town',o=[],t=st.tkt||0,okT=town?(t=='s'||t=='r'):(t=='s'||t=='b'),open=trainOpen();
 if(!t){o.push(['🎫 買單程票（💰480）',town?'知本單程':'回小鎮單程',()=>{st.money-=480;st.tkt='s';hud();toast('🎫 買了一張單程票');trainMenu(side)},st.money<480]);
  if(town)o.push(['🎫 買來回票（💰900）','比兩張單程票便宜 💰60',()=>{st.money-=900;st.tkt='r';hud();toast('🎫 買了一張來回票');trainMenu(side)},st.money<900])}
 else o.push(['🎫 你的車票：'+(t=='s'?'單程票':t=='r'?'來回票（去程＋回程）':'回程票'),'',()=>{trainMenu(side)}]);
 o.push([town?'🚃 搭乘列車前往台東知本（約 5 小時）':'🚃 搭乘列車回小鎮（約 5 小時）',!open?'目前不是營運時間（05:30–22:00）':okT?'車票有效，上車囉':'需要先買票',()=>trainGo(town),!open||!okT]);
 o.push(['🍱 鐵路便當（💰100）','⚡+30 😊+4，也可帶上車慢慢吃',()=>{if(!addItem('ekiben',1))return;st.money-=100;hud();toast('買了一個鐵路便當');trainMenu(side)},st.money<100||bagCount()>=st.cap]);
 o.push(['🕒 時刻表','',()=>openDlg('🕒 時刻表','每日 05:30–22:00，約每 30 分鐘一班。<br>小鎮 ⇄ 台東知本　車程約 5 小時。<br>單程 💰480／來回 💰900（來回票限小鎮購買）。<br>末班車為 22:00，別錯過了。',[['返回','',cancel]],true)]);
 o.push(['離開','',closeDlg]);openDlg(town?'🚉 小鎮火車站・月台':'🚉 知本站・月台',town?'開往「台東知本」的列車，沿著南迴線一路看海，車程約 5 小時。':'開往「小鎮」的列車，又是 5 小時的車程。',o)}
function trainGo(town){closeDlg();const t=st.tkt;st.tkt=town?(t=='r'?'b':0):0;
 tFade(town?'🚃 列車出發<br><span style="font-size:14px;opacity:.8">窗外的樓房漸漸變成山林……</span>':'🚃 列車出發<br><span style="font-size:14px;opacity:.8">山色慢慢退成遠方的剪影……</span>',()=>{
  advance(5);hud();
  if(town){st.onsenN=(st.onsenN||0)+1;mtnShow('溫泉鄉站',IN['溫泉鄉站'].W/2-6,IN['溫泉鄉站'].H-60,1)}
  else{scene=null;exitTown()}
  SVDIRTY=1},()=>{toast(town?(st.onsenN==1?'♨️ 第一次來到台東知本！空氣裡有淡淡的硫磺味。':'♨️ 抵達台東知本。'):'🏙️ 回到小鎮了。')})}
// ── 小鎮火車站（室內） ──
const stationPre=(c,W,H)=>{R(c,0,134,W,3,'#f0c030');for(let i=0;i<W;i+=10)R(c,i,134,5,3,'#2a2a2a');R(c,0,137,W,2,'rgba(0,0,0,.2)')};
const stationFur=()=>[['tkwin',22,34,60,32],['tkwin',88,34,60,32],['ttable',168,34,100,40],['eki',300,40,48,30],['train',150,92,190,34],['wait',24,150,70,16],['wait',24,182,70,16],['plant',330,176,16,24]];
def('火車站',{W:380,H:226,f:'#c9b48a',g:'#bba478',fl:'tile',w:'#2f5f8a',title:'🚉 火車站',pre:stationPre,fur:stationFur(),
 ppl:[pp('站務員',120,74,'#2f5f8a','#222','歡迎搭乘！開往台東知本的列車即將進站。|知本靠山，晚上涼，記得多帶一件外套。',{ou:'v',dir:0}),pp('旅客',44,134,'#ff9a3a','#222','我要去泡湯，已經期待好幾天了。',{sit:1,dir:0,lk:GL('tourist',131)}),pp('登山客',300,150,'#2a8a5a','#222','聽說山上的楓葉紅了。',{dir:0,lk:GL('tourist',132),wk:[230,330]})],
 sp:[['ticket',20,68,130,14],['train',150,138,190,16]],spl:{ticket:'售票窗口',train:'月台（搭車）'},spf:{ticket:()=>trainMenu('town'),train:()=>trainMenu('town')}});
// ── 溫泉鄉：車站（室內） ──
def('溫泉鄉站',{W:360,H:222,f:'#c9a878',g:'#bb9868',fl:'wood',w:'#8a5a3a',title:'🚉 知本車站',pre:stationPre,fur:[['tkwin',22,34,60,32],['tkwin',88,34,60,32],['ttable',168,34,100,40],['eki',300,40,48,30],['train',150,92,190,34],['wait',24,150,70,16],['wait',24,182,70,16],['plant',318,176,16,24],['lantern',280,30,14,18]],
 ppl:[pp('站務員',120,74,'#8a5a3a','#222','歡迎來到知本！|下山的末班車是晚上十點，泡太久會趕不上喔。',{ou:'v',dir:0}),pp('旅客',44,134,'#2fb8d8','#222','泡完湯整個人都軟了。',{sit:1,dir:0,lk:GL('tourist',133)})],
 mtn:1,par:'溫泉鄉',ret:[184,616],sp:[['ticket',20,68,130,14],['train',150,138,190,16]],spl:{ticket:'售票窗口',train:'月台（回小鎮）'},spf:{ticket:()=>trainMenu('onsen'),train:()=>trainMenu('onsen')}});
// ── 湯之里旅館 ──
const innMenu=()=>{const o=[];
 o.push(['🛏️ 住宿一晚（💰3200）','睡到隔天早上 7 點：⚡+80 ❤️+20 😊+12 ✨+3',()=>{st.money-=3200;fxApply({s:80,h:20,j:12,l:3});advance(T.hour<7?7-T.hour:31-T.hour);hud();closeDlg();toast('泡完湯、鋪好榻榻米，一覺到天亮。')},st.money<3200]);
 o.push(['🍱 懷石料理（💰1200）','⚡+35 😊+14 ❤️+5・1 小時',()=>{st.money-=1200;fxApply({s:35,j:14,h:5});advance(1);hud();closeDlg();toast('每一道都像藝術品，捨不得吃完。')},st.money<1200]);
 o.push(['💆 按摩（💰800）','⚡+25 ❤️+12 😊+6・1 小時',()=>{st.money-=800;fxApply({s:25,h:12,j:6});advance(1);hud();closeDlg();toast('師傅的手法剛剛好，痠痛都散了。')},st.money<800]);
 o.push(['🧹 旅館打工（4 小時）','💰+130 ⚡-20 ⭐+1',()=>{fxApply({m:130,s:-20,r:1});advance(4);hud();closeDlg();toast('鋪床、送茶、提行李，忙了一個下午。')},st.sta<20]);
 o.push(['離開','',closeDlg]);openDlg('♨️ 湯之里旅館・櫃檯','女將微微欠身：「歡迎光臨湯之里，今天想怎麼放鬆呢？」',o)};
def('湯之里旅館',{W:440,H:250,f:'#d8c88a',g:'#cdbd7e',fl:'wood',w:'#6a4a2a',title:'♨️ 湯之里旅館',
 pre:(c,W,H)=>{FD.tatami(c,4,28,W-8,168);R(c,4,196,W-8,H-196,'#a8794a');for(let j=198;j<H;j+=6)R(c,4,j,W-8,.8,'rgba(60,30,10,.3)');R(c,4,194,W-8,3,'#6a4222');R(c,4,193,W-8,1,'rgba(255,255,255,.3)')},
 fur:[['frontdesk',30,40,120,24],['byobu',170,36,76,34],['zshelf',262,32,52,42],['vase',326,40,16,26],['lowt',50,112,76,34],['zabu',36,150,20,14],['zabu',120,150,20,14],['zrug',170,106,90,58,'#8a3a3a'],['futonf',310,96,100,50,'#4a6a9a'],['futonf',310,150,100,36,'#8a4a6a'],['lantern',410,32,14,18],['plant',16,200,16,26]],
 ppl:[pp('女將 松子',70,70,'#8a3a5a','#222','歡迎光臨湯之里。|旅途辛苦了，先泡個澡再說。',{ou:'v',dir:0,lk:{...GL('office',111),fm:1,hs:'b',ou:'d',tp:'#8a3a5a'}}),pp('旅客',124,126,'#2a8a8a','#222','這裡的晚餐太精緻了。',{sit:1,dir:2,lk:GL('tourist',112)}),pp('服務生 阿德',200,176,'#3a2a1a','#222','需要幫忙搬行李嗎？|晚餐時間是六點到八點。',{wk:[140,300],ou:'v',lk:GL('worker',113)})],
 mtn:1,par:'溫泉鄉',ret:[284,364],sp:[['desk',30,66,120,14],['sleep',310,186,100,14]],spl:{desk:'櫃檯',sleep:'客房（休息）'},spf:{desk:innMenu,sleep:innMenu}});
// ── 岩之湯（公共浴場） ──
function bathDo(n,cost,fx,hrs,msg){return()=>{st.money-=cost;fxApply(fx);advance(hrs);hud();closeDlg();toast(msg)}}
const bathMenu=k=>{const L={pool:['🛁 大眾池','💰350','⚡+30 ❤️+8 😊+10・1 小時',350,{s:30,h:8,j:10},1,'溫度剛好，整個人都融化了。'],
  cedar:['🌲 檜木露天風呂','💰800','⚡+45 ❤️+12 😊+16 ✨+3・1.5 小時',800,{s:45,h:12,j:16,l:3},1.5,'檜木香混著蒸氣，幾乎要睡著了。'],
  sauna:['🔥 蒸氣室','💰200','⚡+15 ❤️+6 😊+5・0.7 小時',200,{s:15,h:6,j:5},.7,'汗水直流，出來後神清氣爽。']}[k];
 openDlg(L[0],'入浴費 '+L[1]+'。'+L[2],[['入浴',L[2],bathDo(0,L[3],L[4],L[5],L[6]),st.money<L[3]],['離開','',closeDlg]])};
def('岩之湯',{W:460,H:270,f:'#9ec8d0',g:'#8ab8c2',fl:'tile',w:'#5a4a3a',title:'♨️ 岩之湯',
 fur:[['opool',30,50,150,72,'#7cc8dc'],['opool',204,50,96,72,'#6ab8d0'],['cedar',330,52,94,58],['sauna',350,140,64,62],['washb',24,152,26,16],['washb',58,152,26,16],['washb',92,152,26,16],['stoolb',28,172,14,10],['stoolb',62,172,14,10],['bucket',100,176,12,12],['wait',150,162,60,16],['fridge',236,152,26,42],['plant',420,214,16,26]],
 ppl:[pp('阿公',160,150,'#6a8a6a','#ddd','（舒服地嘆氣）這個池子，我泡了四十年。|泡完來瓶冰牛奶，才是正統。',{sit:1,dir:0,lk:GL('elder',121)}),pp('老闆娘',286,170,'#c0392b','#222','入浴規矩：先洗身體再入池喔。|冰牛奶一瓶 20 元，很多人都愛。',{ou:'v',dir:0,lk:GL('worker',122)}),pp('旅客',64,186,'#2fb8d8','#222','這裡的水質真的很滑。',{dir:0,lk:GL('tourist',123),wk:[120,200]})],
 mtn:1,par:'溫泉鄉',ret:[858,364],sp:[['pool',30,124,150,14],['pool2',204,124,96,14],['cedar',330,112,94,14],['sauna',350,204,64,14],['milk',226,196,48,14]],spl:{pool:'大眾池',pool2:'大眾池',cedar:'檜木露天風呂',sauna:'蒸氣室',milk:'冰牛奶'},
 spf:{pool:()=>bathMenu('pool'),pool2:()=>bathMenu('pool'),cedar:()=>bathMenu('cedar'),sauna:()=>bathMenu('sauna'),milk:()=>openDlg('🥛 冰牛奶','玻璃瓶裝的冰牛奶，泡完湯的靈魂飲料。',[['買一瓶（💰45）','⚡+6 😊+5',()=>{st.money-=45;fxApply({s:6,j:5});hud();closeDlg();toast('咕嚕咕嚕……一飲而盡，爽！')},st.money<45],['離開','',closeDlg]])}});
// ── 山莊食堂 ──
const eatMenu=()=>{const o=[];
 [['🍱 山菜定食（💰280）','⚡+32 ❤️+3 😊+5・0.7 小時',280,{s:32,h:3,j:5},.7,'山菜清脆、味噌湯鮮甜。'],['🍜 溫泉蛋拉麵（💰220）','⚡+38 😊+8・0.7 小時',220,{s:38,j:8},.7,'湯頭濃厚，溫泉蛋一戳就流心。'],['🍙 烤飯糰（💰60）','⚡+15 😊+2・0.3 小時',60,{s:15,j:2},.3,'外酥內軟，醬油香撲鼻。'],['🍧 紅豆抹茶冰（💰90）','😊+10 ⚡+6・0.4 小時',90,{s:6,j:10},.4,'清涼又甜蜜。']].forEach(m=>o.push([m[0],m[1],()=>{st.money-=m[2];fxApply(m[3]);advance(m[4]);hud();closeDlg();toast(m[5])},st.money<m[2]]));
 o.push(['🧽 洗碗打工（3 小時）','💰+90 ⚡-16',()=>{fxApply({m:90,s:-16});advance(3);hud();closeDlg();toast('洗了一座碗山，手都皺了。')},st.sta<16]);
 o.push(['離開','',closeDlg]);openDlg('🍱 山莊食堂・櫃檯','「今天的山菜是早上剛採的喔。」',o)};
def('山莊食堂',{W:380,H:230,f:'#c9a06a',g:'#bb915a',fl:'wood',w:'#7a4a2a',title:'🍱 山莊食堂',
 fur:[['counter',20,62,150,22,'#7a4a2a'],['pot',34,28,40,26],['pot',82,28,40,26],['menu',200,30,60,22],['rtable',210,100,50,34],['rtable',290,100,50,34],['rtable',210,160,50,34],['rtable',290,160,50,34],['rtable',46,150,50,34],['lantern',150,30,14,18],['plant',352,196,16,24]],
 ppl:[pp('食堂阿桑',90,50,'#e8e8e8','#222','今天的山菜是早上剛採的。|吃不夠再加飯，免費！',{ou:'c',ht:'c',dir:0,lk:GL('worker',141)}),pp('客人',218,98,'#2a8a8a','#222','這碗拉麵的湯頭，下山還會想。',{sit:1,dir:0,lk:GL('tourist',142),pose:'chat'}),pp('客人',298,98,'#ff6a8a','#222','溫泉蛋一定要點。',{sit:1,dir:0,lk:GL('tourist',143)}),pp('登山客',218,158,'#6a8a3a','#222','爬了一上午，餓扁了。',{sit:1,dir:0,lk:GL('jogger',144)})],
 mtn:1,par:'溫泉鄉',ret:[704,618],sp:[['main',20,86,150,14]],spl:{main:'櫃檯點餐'},spf:{main:eatMenu}});
// ── 茶行・伴手禮 ──
const teaMenu=()=>{const o=[['🛒 選購伴手禮','茶葉、饅頭、木雕、楓葉書籤',()=>shopDlg('🍵 茶行・伴手禮',SHOP['茶行'])],
 ['🍵 坐下品茶（💰150）','🧠+1 😊+6・0.5 小時',()=>{st.money-=150;fxApply({w:1,j:6});advance(.5);hud();closeDlg();toast('熱茶入喉，回甘久久不散。')},st.money<150],['離開','',closeDlg]];
 openDlg('🍵 茶行・櫃檯','「喝杯茶再走吧，山上的茶都是自家種的。」',o)};
def('茶行',{W:340,H:210,f:'#d8c08a',g:'#cdb47e',fl:'wood',w:'#3e6a52',title:'🍵 茶行・伴手禮',
 fur:[['zshelf',20,30,80,42],['zshelf',110,30,80,42],['shelf',200,30,100,32],['counter',210,118,100,22,'#6a4222'],['lowt',40,108,70,32],['zabu',30,144,16,12],['zabu',104,144,16,12],['maneki',312,36,22,26],['plant',16,168,16,24]],
 ppl:[pp('茶行老闆娘',262,98,'#2a6a4a','#222','這是今年的春茶，香氣特別足。|伴手禮要不要包起來？',{ou:'v',dir:0,lk:{...GL('office',151),fm:1,hs:'b'}}),pp('遊客',150,150,'#ff9a3a','#222','我要買一堆饅頭帶回去。',{dir:0,lk:GL('tourist',152)})],
 mtn:1,par:'溫泉鄉',ret:[660,364],sp:[['main',210,142,100,14],['tea',30,146,100,22]],spl:{main:'櫃檯',tea:'品茶'},spf:{main:teaMenu,tea:teaMenu}});
// ── 溫泉鄉：戶外大地圖 ──
const onsenFur=()=>{const f=[],T_=(k,x,y,e)=>f.push([k,x,y,8,6,e]),B_=(k,x,y,w,h)=>f.push([k,x,y,w,h]);
 // 北側山壁（不可進入）與神社區
 f.push(['blk',0,0,930,205],['blk',930,0,170,48],['blk',960,200,25,148],['blk',1035,200,65,148],['blk',0,205,26,140],['blk',0,400,26,320]);
 // 河
 f.push(['blk',326,400,50,198],['blk',326,652,50,68],['bridge',326,602,50,46]);
 // 建築
 B_('oinn',180,205,220,135);B_('otea',600,252,130,88);B_('obath',770,220,190,120);B_('osta',110,510,160,90);B_('oeat',640,510,150,90);B_('oshrine',940,50,140,100);
 f.push(['torii',985,192,50,40]);
 // 庭園：錦鯉池
 f.push(['pond',450,274,112,52]);
 // 廣場設施
 f.push(['foot',566,414,84,40],['obench',566,466,84,12],['eggst',456,408,44,22],['mapb',446,456,26,26]);
 f.push(['vent',770,430,180,90]);
 // 觀景台
 f.push(['deck',36,352,96,36],['scope',96,350,14,22]);
 f.push(['trail',1040,444,40,30]);
 [[150,326],[412,326],[590,326],[740,326],[972,326],[1046,326]].forEach(q=>f.push(['slant',q[0],q[1],12,24]));
 // 樹木
 const r=orn(515);const pk=(x,y)=>T_('pine',x,y);
 for(let i=0;i<30;i++){const x=40+i*34+r()*10,y=205+r()*8;if((x>170&&x<410)||(x>590&&x<740)||(x>760&&x<970))continue;pk(x,y)}
 [[430,244],[478,236],[526,240],[566,236],[596,248],[188,204],[246,206],[320,206]].forEach(q=>q[1]<250&&pk(q[0],q[1]));
 for(let i=0;i<9;i++)pk(40+r()*105,230+r()*100);
 T_('maple',418,328,'r');T_('maple',576,330,'r');T_('maple',744,322,'y');
 // 南側與兩側森林
 for(let i=0;i<30;i++){const x=24+i*36+r()*14;if(x>300&&x<400)continue;pk(x,690+r()*14)}
 for(let i=0;i<16;i++){pk(1050+r()*40,380+i*20+r()*8)}
 for(let i=0;i<12;i++){pk(40+r()*40,430+i*24+r()*8)}
 [[200,662,'cherry'],[260,690,'cherry']].forEach(q=>T_(q[2],q[0],q[1]));
 [[820,560,'maple','y'],[900,540,'maple','r'],[980,664,'maple','r'],[1000,660,'maple','y'],[560,650,'maple','r'],[420,540,'maple','y']].forEach(q=>T_(q[2],q[0],q[1],q[3]));
 for(let i=0;i<8;i++)f.push(['rockb',760+r()*220,560+r()*110,16+r()*10,10+r()*6]);
 return f};
const onsenAnim=(g,t)=>{
 const n=typeof nf=='function'?nf():0;
 const steam=(sx,sy,s0)=>{for(let i=0;i<6;i++){const ph=(t*.28+i/6+sx*.013)%1;const yy=sy-ph*40*s0,xx=sx+Math.sin(t*1.3+i*2+sx)*4*ph+(i-3)*2*s0;g.fillStyle=`rgba(255,255,255,${.45*(1-ph)})`;g.beginPath();g.ellipse(xx,yy,3*s0+ph*8*s0,2.4*s0+ph*5*s0,0,0,7);g.fill()}};
 steam(810,452,1.2);steam(880,470,1.3);steam(920,486,1);steam(606,420,.8);steam(626,430,.7);steam(902,206,.6);
 g.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<16;i++){const yy=404+((t*26+i*53)%300),xx=336+((i*11)%30);if(yy>650&&yy<720)continue;if(yy>596&&yy<652)continue;g.fillRect(xx,yy,4,1)}
 for(let i=0;i<12;i++){const x=((i*131+t*16+Math.sin(t+i)*14)%OW+OW)%OW,y=190+((i*67+t*22)%480);g.fillStyle=i%3?'#d9452f':'#e8a030';g.fillRect(x,y,2.4,1.6)}
 if(n>.05){g.save();g.globalCompositeOperation='lighter';
  [[156,352],[418,352],[596,352],[746,352],[978,352],[1052,352],[272,300],[330,300],[646,332],[705,332],[865,338],[706,590],[190,590],[250,402]].forEach(q=>{g.globalAlpha=.85*n;g.drawImage(GLOW,q[0]-14,q[1]-14,28,28)});
  [[205,262],[240,262],[345,262],[868,290]].forEach(q=>{g.globalAlpha=.55*n;g.drawImage(GLOW,q[0]-12,q[1]-10,24,20)});
  g.restore()}};
def('溫泉鄉',{out:1,mtn:1,noexit:1,W:OW,H:OH,pre:onsenTerrain,title:'♨️ 台東・知本溫泉',animf:onsenAnim,fur:onsenFur(),
 ppl:[pp('遊客 小美',210,372,'#ff6a8a','#222','這裡的溫泉水好滑，皮膚都變好了。|旅館的晚餐超豐盛！',{wk:[180,420],lk:GL('tourist',101)}),
  pp('遊客 阿明',640,376,'#2fb8d8','#222','溫泉蛋一定要配一瓶冰牛奶。|聽說山頂神社的籤很靈。',{wk:[560,900],lk:GL('tourist',102)}),
  pp('阿嬤',592,458,'#8a6a4a','#ddd','年輕人，泡完湯要記得喝水。|我年輕的時候，這裡只有一間澡堂。',{sit:1,dir:0,lk:GL('elder',103)}),
  pp('蛋攤老闆 阿德',478,434,'#c0392b','#222','溫泉蛋剛煮好，熱呼呼的！|蛋白像牛奶、蛋黃像布丁，一試就上癮。',{ou:'a',dir:0,lk:GL('worker',104)}),
  pp('巫女 小桃',992,170,'#f4f4f4','#222','歡迎參拜。|山上的神明很喜歡安靜的人。',{dir:0,lk:{...GL('student',105),fm:1,hs:'p',ou:'d',tp:'#f4f4f4'}}),
  pp('登山客 老周',1052,452,'#2a8a5a','#222','這條山徑走完約要一個半小時。|秋天的時候，整座山都是紅的。',{dir:2,lk:GL('jogger',106)}),
  pp('小朋友',520,420,'#ffd84a','#222','哈哈，追不到我！',{wk:[450,540],lk:GL('kid',107)}),pp('小朋友',470,390,'#ff8aa0','#222','我要吃溫泉蛋！',{wk:[460,640],lk:GL('kid',108)}),
  pp('旅館女將',296,358,'#8a3a5a','#222','歡迎來到知本溫泉。|旅館的樓上，景色最美。',{dir:0,lk:{...GL('office',109),fm:1,hs:'b',ou:'d',tp:'#8a3a5a'}})],
 sp:[['inn',262,338,56,14],['tea',637,338,56,14],['bath',838,338,56,14],['eat',687,598,56,14],['sta',162,598,56,14],['shrine',960,152,100,18],['foot',560,456,96,24],['egg',446,430,64,20],['vent',760,518,200,18],['scope',60,356,92,36],['trail',1030,476,70,28],['koi',446,326,126,22]],
 spl:{inn:'湯之里旅館（進入）',tea:'茶行（進入）',bath:'岩之湯（進入）',eat:'山莊食堂（進入）',sta:'知本車站（進入）',shrine:'山頂神社',foot:'足湯',egg:'溫泉蛋攤',vent:'噴氣口',scope:'觀景台',trail:'登山步道',koi:'錦鯉池'},
 spf:{inn:()=>mtnGo('湯之里旅館'),tea:()=>mtnGo('茶行'),bath:()=>mtnGo('岩之湯'),eat:()=>mtnGo('山莊食堂'),sta:()=>mtnGo('溫泉鄉站'),
  shrine:()=>shrineMenu(),foot:()=>footMenu(),egg:()=>shopDlg('🥚 溫泉蛋攤',['onsenegg','manju','milk']),vent:()=>ventMenu(),scope:()=>scopeLook(),trail:()=>trailMenu(),koi:()=>koiMenu()}});
// ── 戶外活動 ──
function shrineMenu(){const o=[['🎋 抽籤（免費）','抽一支籤，運勢隨機',()=>{const f=fortunes[Math.random()*5|0];fxApply(f[2]);advance(.3);hud();openDlg('🎋 '+f[0],f[1],[['返回','',shrineMenu]])}],
 ['🙏 參拜奉納（💰100）','⭐+2 😊+8',()=>{st.money-=100;fxApply({r:2,j:8});advance(.3);hud();toast('合掌、鞠躬，心裡安靜了下來。');shrineMenu()},st.money<100],
 ['🧧 求御守','平安符',()=>shopDlg('⛩️ 神社・授與所',['amulet'])],['離開','',closeDlg]];
 openDlg('⛩️ 山頂神社','石階盡頭的小神社，風鈴聲清脆，山下的屋頂與蒸氣一覽無遺。',o)}
function footMenu(){openDlg('♨️ 足湯','免費的足湯，旁邊的長椅上還有人在聊天。',[['🦶 泡腳（0.7 小時）','⚡+10 ❤️+3 😊+8',()=>{fxApply({s:10,h:3,j:8});advance(.7);hud();closeDlg();toast('腳底暖烘烘，一整天的疲勞都散了。')}],['離開','',closeDlg]])}
function ventMenu(){const n=st.inv.egg||0;openDlg('♨️ 噴氣口','地底冒出滾燙的蒸氣，空氣裡滿是硫磺味。旁邊的牌子寫著：「禁止入內，會燙傷！」',[[`🥚 煮溫泉蛋（土雞蛋×${n}）`,'把一顆土雞蛋變成溫泉蛋・0.3 小時',()=>{st.inv.egg--;addItem('onsenegg',1);advance(.3);hud();toast('🥚 煮好了一顆溫泉蛋！');ventMenu()},n<1],['👃 聞聞硫磺味','😊+1',()=>{fxApply({j:1});toast('……有點臭，但莫名安心。')}],['離開','',closeDlg]])}
function scopeLook(){const h=T.hour,w=wx();let t=h<5||h>=20?'夜空滿是星星，銀河像一條發光的河。':h<8?'晨霧在山谷間流動，遠處的中央山脈被染成粉紅。':w==2?'雨絲把山色洗成淡淡的水墨。':w==1?'雲層壓得很低，山頭若隱若現。':h>=17?'夕陽把山稜線鍍上一層金邊。':'山色清晰，整座溫泉鄉像模型一樣躺在腳下。';
 openDlg('🔭 觀景台','望遠鏡對準遠方……<br>'+t,[['再看一會兒（0.2 小時）','😊+4',()=>{fxApply({j:4});advance(.2);hud();toast('深呼吸，山裡的空氣真好。');closeDlg()}],['離開','',closeDlg]])}
function trailMenu(){const dark=T.hour<6||T.hour>=18;openDlg('🥾 登山步道','森林裡鳥鳴不斷，落葉鋪滿石階。'+(dark?'<br><span style="color:#b33">天色太暗，山路不安全，明天再來吧。</span>':''),[['🥾 健行一圈（約 1.5 小時）','⚡-15 😊+6 ❤️+3，運氣好會撿到山貨',()=>{fxApply({s:-15,j:6,h:3});advance(1.5);const r=Math.random();closeDlg();
  if(r<.35){addItem('mushroom',1)&&toast('🍄 在樹根旁採到一朵山菇！')}else if(r<.55){addItem('maple',1)&&toast('🍁 撿到一片完美的楓葉。')}else if(r<.7){fxApply({m:40});toast('💰 在石縫裡發現一些零錢（+40）。')}else toast('走了一圈，風景很美，什麼也沒撿到。');hud()},dark||st.sta<15],['離開','',closeDlg]])}
function koiMenu(){openDlg('🐟 錦鯉池','橘白相間的錦鯉成群游過來，等著吃飼料。',[['🍞 撒飼料（💰20）','😊+3',()=>{st.money-=20;fxApply({j:3});hud();toast('錦鯉搶成一團，水花四濺。');koiMenu()},st.money<20],['離開','',closeDlg]])}

['溫泉鄉','湯之里旅館','岩之湯','山莊食堂','茶行','溫泉鄉站','火車站'].forEach(k=>IN[k].ppl.forEach(n=>{n.own=1}));
