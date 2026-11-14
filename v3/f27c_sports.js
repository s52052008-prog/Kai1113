/* ===== v7.5 高雄運動中心：B1 游泳池、1F 籃球場、2F 平價健身房、3F 瑜伽教室 ===== */
const SC_FLOORS=[['B1','🏊 B1 游泳池','運動中心B1游泳池'],['1F','🏀 1F 籃球場','高雄運動中心'],['2F','🏋️ 2F 健身房','運動中心2F健身房'],['3F','🧘 3F 瑜伽教室','運動中心3F瑜伽教室']];
function scElev(){const cur=scene;openDlg('🛗 電梯','要去幾樓？',SC_FLOORS.map(f=>[f[1],f[2]==cur?'（目前樓層）':'',()=>{closeDlg();if(f[2]==cur)return;const r=IN[f[2]];
  if(f[2]=='高雄運動中心'){scene=f[2];rmBuild(f[2]);p.x=r.elev[0];p.y=r.elev[1];p.vx=p.vy=0;p.dir=0;toast('🛗 1F 籃球場')}
  else{mtnShow(f[2],r.elev[0],r.elev[1],0);toast('🛗 '+f[1])}},f[2]==cur]).concat([['取消','',closeDlg]]))}
const scCourt=(x,W,H)=>{R(x,0,0,W,H,'#c99a62');for(let i=0;i<W;i+=10)R(x,i,0,1,H,'rgba(80,40,0,.08)');
 const cx=40,cy=40,cw=W-80,ch=150;R(x,cx,cy,cw,ch,'#d8a86a');x.strokeStyle='#fff';x.lineWidth=1.4;x.strokeRect(cx,cy,cw,ch);x.beginPath();x.moveTo(cx+cw/2,cy);x.lineTo(cx+cw/2,cy+ch);x.stroke();
 x.beginPath();x.arc(cx+cw/2,cy+ch/2,18,0,7);x.stroke();R(x,cx,cy+ch/2-24,44,48,'#c8402e');R(x,cx+cw-44,cy+ch/2-24,44,48,'#c8402e');x.strokeRect(cx,cy+ch/2-24,44,48);x.strokeRect(cx+cw-44,cy+ch/2-24,44,48);
 x.beginPath();x.arc(cx,cy+ch/2,62,-Math.PI/2.4,Math.PI/2.4);x.stroke();x.beginPath();x.arc(cx+cw,cy+ch/2,62,Math.PI-Math.PI/2.4,Math.PI+Math.PI/2.4);x.stroke();
 [[cx+4,cy+ch/2],[cx+cw-4,cy+ch/2]].forEach(([hx,hy],i)=>{R(x,hx-(i?0:3),hy-10,3,20,'#eee');x.strokeStyle='#e8742a';x.lineWidth=1.6;x.beginPath();x.arc(hx+(i?-6:6),hy,4,0,7);x.stroke();x.strokeStyle='#fff'});
 txt(x,'KAOHSIUNG SPORTS CENTER',W/2,cy+ch+16,'rgba(255,255,255,.5)','bold 7px sans-serif')};
def('高雄運動中心',{W:480,H:300,f:'#c99a62',g:'#bf9058',fl:'wood',w:'#1f6fb8',title:'🏀 高雄運動中心・1F 籃球場',pre:scCourt,elev:[420,262],
 fur:[['counter',20,250,70,18,'#1f6fb8'],['bench',110,214,40,10],['bench',330,214,40,10],['water',400,206,14,22],['vend',440,200,22,30],['elev',410,226,40,30]],
 ppl:[pp('櫃台人員',40,236,'#1f6fb8','#222','歡迎光臨！B1 游泳池、2F 健身房、3F 瑜伽教室都可以搭電梯喔。|單次健身 50 元，很划算！',{dir:0})],
 sp:[['court',150,110,180,40],['elev',408,252,46,16],['desk',20,268,70,10]],spl:{court:'🏀 球場',elev:'🛗 電梯',desk:'櫃台'},
 spf:{court:()=>scBall(),elev:scElev,desk:()=>openDlg('🏟️ 高雄運動中心','<b>收費（單次）</b><br>🏊 B1 游泳池　💰110<br>🏀 1F 籃球場　免費（自由打球）<br>🏋️ 2F 健身房　💰50／小時（無教練）<br>🧘 3F 瑜伽課　💰150／堂<br><br>營業時間 06:00–22:00',[['好','',closeDlg]])}});
function scBall(){const b=IN['高雄運動中心'],fr=(b._bb||[]);const o=[];
 if(fr.length)o.push([`🏀 加入${fr.map(n=>n.n).join('、')}一起鬥牛`,'1.5 小時・⚡-25・⚔️+2',()=>{advance(1.5);fxApply({s:-25,p:2,j:14});fr.forEach(n=>{const id=n.fr;if(id)frAdd(id,4)});hud();closeDlg();
  openDlg('🏀 鬥牛','你們打了一場三對三，'+(fr.some(n=>n.fr=='bokai')?'柏凱教練一個爆發力切入、再一記三分，對面直接放棄。':'')+(fr.some(n=>n.fr=='yuhao')?'禹豪喘著說：「兄弟，下禮拜再來！」':''),[['好','',closeDlg]])},st.sta<25]);
 o.push(['🏀 自己投投籃','1 小時・⚡-12・⚔️+1',()=>{advance(1);fxApply({s:-12,p:1,j:6});hud();closeDlg();toast('🏀 唰！唰！今天手感不錯。')},st.sta<12]);
 o.push(['離開','',closeDlg]);openDlg('🏀 1F 籃球場',fr.length?'場上有熟面孔在打球！':'球場上有幾個學生在投籃。',o)}
{const R0=IN['高雄運動中心'];R0.onEnter=rm=>{rm.ppl=rm.ppl.filter(n=>!n._sc);rm._bb=[];const d=dow(),h=T.hour,W0=wkN();
 const add=(n,x,y,o)=>{const q=pp(n,x,y,o.c||'#2f80ed','#222',o.L||'',o);q._sc=1;rm.ppl.push(q);return q};
 ['打球的學生','打球的學生','打球的大學生'].forEach((n,i)=>add(n,190+i*40,90+(i%2)*40,{c:['#e0443a','#2a9d5c','#f0b030'][i],L:'再一球！|你也要一起打嗎？',pose:'run',dir:i%4,lk:GL('student',300+i)}));
 if(d==5&&h>=14&&h<18&&W0%2==0){if(!(typeof yhAway=='function'&&yhAway())&&FRS('yuhao').met)rm._bb.push(add('黃禹豪',230,120,{fr:'yuhao',c:'#2f6a4a',dir:2}));
  if(st.bk&&st.bk.met&&st.bk.night!=W0)rm._bb.push(add('廖柏凱',270,120,{fr:'bokai',c:'#1d4f91',dir:3}))}}}
// B1 游泳池
def('運動中心B1游泳池',{W:420,H:260,f:'#d8e4ea',g:'#ccd8de',fl:'tile',w:'#1f6fb8',title:'🏊 高雄運動中心・B1 游泳池',par:'高雄運動中心',ret:[420,262],elev:[360,224],
 pre:(x,W,H)=>{R(x,30,40,300,150,'#1f8ac0');for(let i=0;i<6;i++){R(x,30,40+i*25+12,300,1.2,'rgba(255,255,255,.5)')}for(let i=0;i<40;i++)R(x,32+((i*53)%296),42+((i*37)%146),8,1,'rgba(255,255,255,.35)');x.strokeStyle='#e8f4fa';x.lineWidth=3;x.strokeRect(30,40,300,150);txt(x,'25m',180,36,'#1f6fb8','bold 7px sans-serif')},
 fur:[['blk',30,40,300,150],['locker',350,40,50,24],['bench',350,110,40,10],['elev',350,196,40,30],['plant',10,200,16,26]],
 ppl:[pp('救生員',340,150,'#e0443a','#222','游泳前記得先熱身喔！|泳帽要戴好。',{dir:2})],
 sp:[['swim',120,192,120,16],['elev',350,226,46,16]],spl:{swim:'🏊 下水',elev:'🛗 電梯'},
 spf:{swim:()=>openDlg('🏊 游泳池','單次 💰110・游 1 小時',[['🏊 游 1 小時','⚡-15 ❤️+8 😊+6',()=>{st.money-=110;advance(1);fxApply({s:-15,h:8,j:6});hud();closeDlg();toast('🏊 游了 40 趟，全身舒暢！')},st.money<110||st.sta<15],['算了','',closeDlg]]),elev:scElev}});
// 2F 平價健身房
def('運動中心2F健身房',{W:430,H:262,f:'#8a8f9c',g:'#7d8290',fl:'rubber',w:'#1f6fb8',title:'🏋️ 高雄運動中心・2F 健身房',par:'高雄運動中心',ret:[420,262],elev:[372,224],
 fur:[['mirror',92,32,190,20],['treadmill',20,36,22,32],['treadmill',48,36,22,32],['treadmill',76,36,22,32],['dbrack',150,62,56,20],['bpress',232,70,34,24],['squat',336,62,34,34],['cable',378,38,30,32],['spin',22,110,16,24],['spin',46,110,16,24],['water',14,200,14,22],['locker',34,200,48,24],['counter',104,206,64,20,'#1f6fb8'],['elev',360,196,40,30]],
 ppl:[pp('健身的學生',24,72,'#2f80ed','#222','運動中心便宜，學生最愛！',{pose:'run',dir:1,lk:GL('student',41),sx:1}),pp('晨練阿伯',52,72,'#7a7a7a','#ccc','我七十歲了，每天走五公里！',{pose:'run',dir:1,lk:GL('elder',42),sx:1}),
  pp('健身的阿姨',24,140,'#e0679a','#555','下班來騎腳踏車，消消氣。',{pose:'run',dir:1,lk:GL('casual',43),sx:1,sit:1}),pp('上班族',240,110,'#2a9d5c','#222','五十塊練一小時，比私人健身房便宜太多了。',{dir:2,lk:GL('office',44)}),pp('大學生',300,150,'#f0b030','#222','臥推再加五公斤！',{dir:3,lk:GL('student',45)})],
 sp:[['pay',104,226,64,14],['elev',360,226,46,16]],spl:{pay:'💳 單次 50 元',elev:'🛗 電梯'},
 spf:{pay:()=>openDlg('🏋️ 2F 健身房','單次計費 💰50，可以訓練 1 小時（沒有教練服務，自己練）',[['💪 練 1 小時','💰50・⚔️+2 ❤️+3 ⚡-15',()=>{st.money-=50;advance(1);fxApply({p:2,h:3,s:-15});if(st.box&&typeof boxPrep=='function'&&boxPrep()){const W0=wkN();st.box.tr[W0]=Math.min(3,(st.box.tr[W0]||0)+1);toast('🏋️ 算進備賽訓練一次！')}hud();closeDlg();toast('💪 練完了，全身痠痛但很爽。')},st.money<50||st.sta<15],['算了','',closeDlg]]),elev:scElev}});
if(typeof UAR!='undefined'&&UAR['健身房'])UAR['運動中心2F健身房']=UAR['健身房'];
// 3F 瑜伽教室
def('運動中心3F瑜伽教室',{W:400,H:240,f:'#e8dcc8',g:'#dccfb8',fl:'wood',w:'#8a5aa8',title:'🧘 高雄運動中心・3F 瑜伽教室',par:'高雄運動中心',ret:[420,262],elev:[340,204],
 fur:[['mirror',40,30,240,18],['yoga',40,80,36,14,'#8a5aa8'],['yoga',90,80,36,14,'#2a9d5c'],['yoga',140,80,36,14,'#e0679a'],['yoga',190,80,36,14,'#2f80ed'],['yoga',240,80,36,14,'#f0b030'],['yoga',40,120,36,14,'#8a5aa8'],['yoga',90,120,36,14,'#2a9d5c'],['yoga',140,120,36,14,'#e0679a'],['yoga',190,120,36,14,'#2f80ed'],['plant',10,40,16,26],['plant',290,40,16,26],['elev',330,176,40,30],['ball',300,120,14,14]],
 ppl:[pp('瑜伽老師',150,56,'#8a5aa8','#222','吸氣——吐氣——身體放鬆。',{dir:0,lk:GL('casual',51)})],
 sp:[['class',100,150,140,16],['elev',330,206,46,16]],spl:{class:'🧘 上瑜伽課',elev:'🛗 電梯'},
 spf:{class:()=>{const fc=(rm.ppl||[]).some(n=>n.fr=='fangci');openDlg('🧘 瑜伽課','一堂 💰150・1 小時'+(fc?'<br>舫慈也在！她朝你揮手：「一起來啊～」':''),[['🧘 上一堂課','😊+8 ❤️+5 ⚡-6 ✨+1',()=>{st.money-=150;advance(1);fxApply({j:8,h:5,s:-6,l:1});if(fc){frAdd('fangci',4);toast('🧘 舫慈笑你動作很僵硬，但說你很有誠意！')}else toast('🧘 全身都伸展開了。');hud();closeDlg()},st.money<150],['算了','',closeDlg]])},elev:scElev}});
{const R0=IN['運動中心3F瑜伽教室'];R0.onEnter=rm=>{rm.ppl=rm.ppl.filter(n=>!n._sc);const d=dow(),h=T.hour;
 const add=(n,x,y,o)=>{const q=pp(n,x,y,o.c||'#e0679a','#222',o.L||'',o);q._sc=1;rm.ppl.push(q)};
 add('學員',96,72,{c:'#2a9d5c',L:'這個動作好難……',pose:'pray',dir:0,lk:GL('casual',52)});add('學員',196,112,{c:'#f0b030',L:'下課要去喝 50燃！',dir:0,lk:GL('casual',53)});
 if(d==5&&h>=9&&h<17)add('許舫慈',246,72,{fr:'fangci',c:'#e0679a',dir:0})}}
// 1F 室內出口：從電梯旁的大門出去
IN['高雄運動中心'].elev=[420,262];
// 原本在戶外籃球場的禹豪、柏凱改到運動中心
{const rm0=n=>{const i=NP.findIndex(q=>q.n==n&&Array.isArray(q.r)&&q.r[0]>300&&q.r[0]<420&&q.r[1]<120);if(i>=0)NP.splice(i,1)};rm0('黃禹豪');rm0('廖柏凱')}
