/* ===== v3.3：健身房教練（收費・分部位）＋ 影城（售票・販賣機・影廳放映）===== */
st.endu=0;st.runSk=0;st.gymD={};st.tk=0;st.cnt.movie=0;
// ── 健身房 ──
const GYM=[
 {k:'chest',ic:'🏋️',n:'胸部：臥推',st:'力量',fx:{p:3,s:-22,j:3},add:{},cue:['背部貼平椅面，肩胛骨向內收緊。','槓鈴慢慢放到胸口，吸氣；','吐氣、用胸肌把它推起來，手肘不要鎖死。']},
 {k:'legs',ic:'🦵',n:'腿部：深蹲',st:'跑速',fx:{p:1,s:-24,j:3},add:{runSk:3},cue:['雙腳與肩同寬，腳尖微微朝外。','臀部往後坐，膝蓋與腳尖同方向；','蹲到大腿與地面平行，用腳跟把自己推起來。']},
 {k:'cardio',ic:'🫀',n:'心肺：間歇跑',st:'體力上限',fx:{h:3,s:-20,j:4},add:{endu:4},cue:['先熱身 5 分鐘，慢跑 6 km/h。','衝刺 30 秒（12 km/h），慢走 60 秒；','重複 8 組，用鼻吸口吐穩定呼吸。']},
 {k:'back',ic:'🔙',n:'背部：划船／引體',st:'力量',fx:{p:2,l:1,s:-20,j:3},add:{},cue:['挺胸、核心收緊，不要用甩的。','想像用手肘把重量往後拉；','在最高點停一秒，感受背肌夾緊。']},
 {k:'core',ic:'🧘',n:'核心：棒式',st:'體力上限',fx:{l:2,s:-14,j:3},add:{endu:2},cue:['手肘在肩膀正下方，身體成一直線。','肚臍往脊椎收，臀部不要翹也不要塌；','正常呼吸，撐一分鐘，休息，再來三組。']}];
function gymCoach(n){const dk=T.year*40+T.day,left=(st.gymD.d==dk?st.gymD.n:0),fee=800,o=[];
 GYM.forEach(p=>o.push([`${p.ic} ${p.n}（💰${fee}・1.5 小時）`,`提升${p.st}・⚡${p.fx.s}`,()=>{
  if(st.money<fee)return;st.money-=fee;const rep=st.gymD.d==dk&&st.gymD[p.k],half=rep?.5:1,fx={};for(const k in p.fx)fx[k]=k=='s'||k=='j'?p.fx[k]:Math.max(1,Math.round(p.fx[k]*half));
  fxApply(fx);if(p.add.endu)st.endu+=Math.round(p.add.endu*half*10)/10;if(p.add.runSk)st.runSk+=Math.round(p.add.runSk*half*10)/10;advance(1.5);if(st.gymD.d!=dk)st.gymD={d:dk,n:0};st.gymD[p.k]=1;st.gymD.n++;hud();
  openDlg('💬 教練 阿凱',`<b>${p.n}</b> 動作指導：<br>① ${p.cue[0]}<br>② ${p.cue[1]}<br>③ ${p.cue[2]}${rep?'<br><span class="opacity-70">（同一部位今天練第二次，效果減半）</span>':''}<br><br>📈 力量 ${st.pow}　體力上限 ${staMax()}　跑速 ${st.runSk.toFixed(1)}`,[['繼續練別的部位','',()=>gymCoach(n)],['結束','',closeDlg]])},st.money<fee||st.sta<22]));
 o.push(['📊 查看我的體能','',()=>openDlg('📊 體能紀錄',`力量 ${st.pow}（臥推・划船）<br>⚡ 體力上限 ${staMax()}（間歇跑・棒式：已經 +${Math.min(60,Math.round((st.endu||0)*.6))}，最多 +60）<br>跑速 ${st.runSk.toFixed(1)}（深蹲）：移動速度 ×${spdMul().toFixed(2)}`,[['返回','',cancel]],true)]);
 o.push(['離開','',closeDlg]);
 openDlg('💬 教練 阿凱',`「想練哪個部位？我是收費教練，一堂 💰${fee}，我會一個動作一個動作帶你練。」<br><span class="opacity-70 text-xs">今天已上課 ${left} 堂；體力至少 22 才能上課。</span>`,o)}
SP['健身房']=()=>[['🏋️ 請教練上課（💰800）','選部位，教練逐步指導',()=>gymCoach(rm&&rm.ppl.find(x=>x.tr)||{})]];
// ── 影城 ──
IT.cola={n:'可樂',i:'🥤',p:15,d:'冰涼的氣泡飲料。使用：⚡+6 😊+3',u:{s:6,j:3}};PR.cola=15;
FD.vend=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2.6,'rgba(0,0,0,.28)');bxx(c,x,y,w,h,'#c62828',4);R(c,x+3,y+3,w-6,h*.5,'#1a1a22');for(let i=0;i<3;i++)for(let j=0;j<2;j++){R(c,x+5+i*((w-10)/3),y+5+j*10,(w-10)/3-2,8,['#e8e8e8','#ffd84a','#8a1a1a'][(i+j)%3])}R(c,x+w-9,y+h*.62,5,9,'#333');R(c,x+4,y+h-12,w-8,6,'#222');txt(c,'COLA',x+w/2,y+h*.58,'#fff','bold 6px sans-serif')};
const FILMS=[{t:'星砂島的寶藏',g:'冒險',c:'#2f80ed'},{t:'雨後的咖啡香',g:'愛情',c:'#d9452f'},{t:'小小星球',g:'動畫',c:'#2a9d5c'}];
const filmOf=h=>FILMS[(weekNo()+h-1)%3];
const cV2=(x,y,h)=>['wallv',x,y,7,h],cH2=(x,y,w)=>['wallh',x,y,w,7];
def('電影院',{W:440,H:320,f:'#3a3f5c',g:'#33384f',fl:'carpet',w:'#2a2f4a',title:'🎬 星光影城',
 pre:(c,W,H)=>{R(c,4,28,212,150,'#241e34');R(c,223,28,213,150,'#2a2238');R(c,4,185,432,135,'#4a2f5e');for(let x=4;x<436;x+=24)R(c,x,185,12,135,'rgba(255,255,255,.04)');txt(c,'影廳 1',110,174,'rgba(255,255,255,.25)','bold 9px sans-serif');txt(c,'影廳 2',330,174,'rgba(255,255,255,.25)','bold 9px sans-serif');txt(c,'售票大廳',220,316,'rgba(255,255,255,.28)','bold 9px sans-serif')},
 fur:[cV2(216,28,150),cH2(4,178,66),cH2(130,178,170),cH2(360,178,80),
  ['screen',24,34,170,24],['screen',244,34,170,24],
  ['seat',24,80,74,14],['seat',116,80,74,14],['seat',24,106,74,14],['seat',116,106,74,14],['seat',24,132,74,14],['seat',116,132,74,14],
  ['seat',244,80,74,14],['seat',336,80,74,14],['seat',244,106,74,14],['seat',336,106,74,14],['seat',244,132,74,14],['seat',336,132,74,14],
  ['poster',12,192,24,32,FILMS[0].c,FILMS[0].g],['poster',44,192,24,32,FILMS[1].c,FILMS[1].g],['poster',76,192,24,32,FILMS[2].c,FILMS[2].g],
  ['counter',16,246,120,22,'#4a2a6a'],['popcorn',160,200,50,34],['vend',216,198,30,38],['vend',250,198,30,38],['counter',160,248,126,22,'#4a2a6a'],['sofa',330,236,86,26,'#7a4a9e'],['plant',402,196,16,26],['plant',8,284,16,26],['ctable',340,274,66,16],['clock',200,184,14,14]],
 ppl:[pp('售票員',46,220,'#d4a017','#222','歡迎光臨星光影城！|買票請告訴我要看哪一廳。',{ou:'v',dir:0,still:1}),pp('販賣部店員',204,224,'#d4a017','#222','爆米花現爆的，要加奶油嗎？|可樂冰的，要不要配一份？',{ou:'v',dir:0,still:1,fm:1}),pp('驗票員',98,190,'#2a2f4a','#222','影廳 1 往這邊，請對號入座。',{ou:'v',dir:0,still:1}),pp('驗票員',330,190,'#2a2f4a','#222','影廳 2 在這邊，請小聲一點。',{ou:'v',dir:0,still:1}),
  pp('觀眾',66,150,'#e0679a','#222','我先去占個位置！',{dir:1,still:1}),pp('觀眾',350,284,'#2f80ed','#222','等一下要去看《'+'小小星球'+'》。',{sit:1,dir:0,still:1})],
 sp:[['ticket',16,270,120,12],['snack',160,272,126,12],['vend',216,238,64,10],['door1',70,186,60,8],['door2',300,186,60,8],['seat1',24,152,176,10],['seat2',244,152,176,10]],
 spl:{ticket:'售票櫃檯',snack:'販賣部',vend:'飲料販賣機',door1:'影廳 1 入口',door2:'影廳 2 入口',seat1:'影廳 1・入座',seat2:'影廳 2・入座'},
 spf:{ticket:()=>ticketMenu(),snack:()=>snackMenu(),vend:()=>snackMenu(1),door1:()=>toast('🎞️ 影廳 1：《'+filmOf(1).t+'》（'+filmOf(1).g+'）'),door2:()=>toast('🎞️ 影廳 2：《'+filmOf(2).t+'》（'+filmOf(2).g+'）'),seat1:()=>sitFilm(1),seat2:()=>sitFilm(2)}});
function ticketMenu(){const o=[];[1,2].forEach(h=>{const f=filmOf(h);o.push([`🎟️ 影廳 ${h}《${f.t}》（${f.g}）💰280`,st.tk==h?'你已持有這一廳的票':'',()=>{if(st.money<280)return;st.money-=280;st.tk=h;hud();closeDlg();toast(`🎟️ 買了影廳 ${h} 的票，往上走進影廳入座吧！`)},st.money<280||st.tk==h])});
 [1,2].forEach(h=>{const f=filmOf(h);o.push([`🍿 套票：影廳 ${h}＋爆米花＋可樂 💰380`,'省 💰50',()=>{if(st.money<380)return;st.money-=380;st.tk=h;addItem('popcorn',1);addItem('cola',1);hud();closeDlg();toast('🍿 套票到手！爆米花和可樂在背包裡。')},st.money<380])});
 o.push(['🎫 幫忙驗票打工（2 小時）','💰+30 ⚡-8',()=>{fxApply({m:30,s:-8});advance(2);hud();closeDlg();toast('你領到了一點零用錢。')},st.sta<8]);o.push(['離開','',closeDlg]);
 openDlg('🎬 售票櫃檯','售票員：「今天有兩個廳：<br>影廳 1《'+filmOf(1).t+'》／影廳 2《'+filmOf(2).t+'》，每張 💰280。」',o)}
function snackMenu(v){const o=[['🍿 爆米花 💰90','⚡+ 😊+（可帶進影廳）',()=>{if(st.money<90)return;if(!addItem('popcorn',1))return;st.money-=90;hud();toast('🍿 買了爆米花');snackMenu(v)},st.money<90],['🥤 可樂 💰60','冰涼氣泡',()=>{if(st.money<60)return;if(!addItem('cola',1))return;st.money-=60;hud();toast('🥤 買了可樂');snackMenu(v)},st.money<60],['離開','',closeDlg]];openDlg(v?'🥤 飲料販賣機':'🍿 販賣部',v?'投幣式販賣機，亮著紅色的燈。':'店員：「爆米花現爆，可樂冰涼，要來點什麼？」',o)}
function sitFilm(h){const f=filmOf(h);if(st.tk!=h)return openDlg('🎬 驗票員','「不好意思，這裡是對號入座。<br>'+(st.tk?'您的票是影廳 '+st.tk+'。':'請先到櫃檯買票。')+'」',[['好','',closeDlg]]);
 openDlg('🎬 影廳 '+h,`《${f.t}》（${f.g}）即將開演，找個位置坐下吧。<br>${st.inv.popcorn>0?'🍿 你會邊看邊吃爆米花。':''}${st.inv.cola>0?'　🥤 也會喝可樂。':''}`,[['坐下來看電影（約 2 小時）','',()=>{st.tk=0;playGame('film',{back:()=>{},hall:h,film:f})}],['先不要','',closeDlg]])}
// ── 放映 ──
const rgb=(r,g2,b)=>`rgb(${r|0},${g2|0},${b|0})`;
GAMES.film=o=>{const f=o.film,DUR=44,pc=st.inv.popcorn>0,cl=st.inv.cola>0;if(pc)st.inv.popcorn--;if(cl)st.inv.cola--;
 const SX=70,SY=26,SW=340,SH=172,CAP={
  0:[[0,'少年阿海拿到祖父留下的藏寶圖。'],[11,'暴風雨中，船員們沒有放棄。'],[22,'星砂島——地圖上的紅叉就在這裡。'],[33,'寶箱裡是一封信：「真正的寶藏，是這趟旅程。」']],
  1:[[0,'下著雨的傍晚，兩把傘在街角相遇。'],[11,'「這間咖啡廳，我常來。」「我也是。」'],[22,'雨停了，天空出現一道彩虹。'],[33,'原來平凡的日子，也可以這麼溫柔。']],
  2:[[0,'小小星球上，住著一顆愛跳的小圓。'],[11,'它想看看，鄰居的星球是什麼樣子。'],[22,'跳啊跳，終於到了最大的那顆星。'],[33,'「原來，回家的星球最亮。」']]}[FILMS.indexOf(f)];
 const sc=(c,t,i)=>{const k=t%11/11;
  if(i==0){ // 冒險
   if(t<11){const g=c.createLinearGradient(0,SY,0,SY+SH);g.addColorStop(0,'#f49a4a');g.addColorStop(.55,'#f7d08a');g.addColorStop(.56,'#2a6a9a');g.addColorStop(1,'#123a5a');c.fillStyle=g;c.fillRect(SX,SY,SW,SH);c.fillStyle='#fff3c0';c.beginPath();c.arc(SX+250,SY+80,22,0,7);c.fill();
    for(let j=0;j<9;j++){c.fillStyle='rgba(255,255,255,.2)';c.fillRect(SX+((j*41+t*30)%SW),SY+104+j*7,26,2)}
    const x=SX+30+k*250,y=SY+98+Math.sin(t*2)*3;c.fillStyle='#5a3a1a';c.beginPath();c.moveTo(x,y);c.lineTo(x+60,y);c.lineTo(x+50,y+14);c.lineTo(x+8,y+14);c.fill();c.fillStyle='#f4efe0';c.beginPath();c.moveTo(x+30,y-44);c.lineTo(x+30,y);c.lineTo(x+56,y);c.fill();c.fillStyle='#d9302a';c.fillRect(x+29,y-48,2,50)}
   else if(t<22){const fl=(t*3|0)%7==0;c.fillStyle=fl?'#c8d8f0':'#1c2438';c.fillRect(SX,SY,SW,SH);c.fillStyle=fl?'#8aa0c0':'#0a1626';for(let j=0;j<6;j++){c.beginPath();c.moveTo(SX,SY+110+j*10);for(let x=0;x<=SW;x+=10)c.lineTo(SX+x,SY+110+j*10+Math.sin(x*.05+t*3+j)*8);c.lineTo(SX+SW,SY+SH);c.lineTo(SX,SY+SH);c.fill()}
    c.save();c.translate(SX+170,SY+112);c.rotate(Math.sin(t*2.4)*.2);c.fillStyle='#5a3a1a';c.beginPath();c.moveTo(-34,0);c.lineTo(34,0);c.lineTo(26,16);c.lineTo(-26,16);c.fill();c.fillStyle='#e8e0d0';c.beginPath();c.moveTo(0,-46);c.lineTo(0,0);c.lineTo(28,0);c.fill();c.restore();c.strokeStyle='rgba(200,220,255,.5)';for(let j=0;j<40;j++){const x=SX+(j*37+t*160)%SW,y=SY+(j*53+t*300)%SH;c.beginPath();c.moveTo(x,y);c.lineTo(x-4,y+10);c.stroke()}}
   else if(t<33){const g=c.createLinearGradient(0,SY,0,SY+SH);g.addColorStop(0,'#7ad0f0');g.addColorStop(1,'#cfeefa');c.fillStyle=g;c.fillRect(SX,SY,SW,SH);c.fillStyle='#2a8ac0';c.fillRect(SX,SY+120,SW,SH-120);c.fillStyle='#f0dca0';c.beginPath();c.ellipse(SX+190,SY+124,120,28,0,0,7);c.fill();c.fillStyle='#7a5a2a';c.fillRect(SX+130,SY+70,6,54);c.fillStyle='#2a9d3c';for(let j=0;j<5;j++){c.beginPath();c.ellipse(SX+133+(j-2)*14,SY+66+Math.abs(j-2)*5,16,5,(j-2)*.4,0,7);c.fill()}
    c.strokeStyle='#d9302a';c.setLineDash([4,4]);c.lineWidth=2;c.beginPath();c.moveTo(SX+30,SY+150);c.quadraticCurveTo(SX+120,SY+150,SX+230,SY+126);c.stroke();c.setLineDash([]);txt(c,'✕',SX+232,SY+130,'#d9302a','bold 22px sans-serif')}
   else{c.fillStyle='#1a1228';c.fillRect(SX,SY,SW,SH);const r=c.createRadialGradient(SX+170,SY+110,4,SX+170,SY+110,150);r.addColorStop(0,'rgba(255,230,120,'+Math.min(1,(t-33)/3)+')');r.addColorStop(1,'rgba(255,230,120,0)');c.fillStyle=r;c.fillRect(SX,SY,SW,SH);c.fillStyle='#8a5a2a';c.fillRect(SX+130,SY+112,80,40);c.fillStyle='#b8832f';c.fillRect(SX+130,SY+112-Math.min(24,(t-33)*6),80,14);c.fillStyle='#ffd84a';for(let j=0;j<14;j++){const a=j*.45+t,rr=20+((t-33)*14+j*9)%70;c.fillRect(SX+170+Math.cos(a)*rr,SY+112+Math.sin(a)*rr*.6-10,3,3)}}}
  else if(i==1){ // 愛情
   if(t<11){c.fillStyle='#2c3550';c.fillRect(SX,SY,SW,SH);c.fillStyle='#161b30';c.fillRect(SX,SY+130,SW,42);for(let j=0;j<4;j++){c.fillStyle='#ffd070';c.fillRect(SX+30+j*80,SY+40,26,36);c.fillStyle='#46567a';c.fillRect(SX+20+j*80,SY+20,46,110)}
    const mx=SX+30+k*120;[[mx,'#d9452f'],[SX+310-k*120,'#2f80ed']].forEach(([x,col])=>{c.fillStyle='#222';c.fillRect(x-4,SY+112,8,22);c.fillStyle=col;c.beginPath();c.arc(x,SY+108,18,Math.PI,0);c.fill();c.fillRect(x-.8,SY+108,1.6,10)});c.strokeStyle='rgba(180,200,255,.6)';for(let j=0;j<60;j++){const x=SX+(j*29+t*20)%SW,y=SY+(j*47+t*260)%SH;c.beginPath();c.moveTo(x,y);c.lineTo(x-2,y+9);c.stroke()}}
   else if(t<22){c.fillStyle='#6a4426';c.fillRect(SX,SY,SW,SH);c.fillStyle='#e8c88a';c.fillRect(SX+30,SY+20,SW-60,70);c.fillStyle='#8ac0f0';c.fillRect(SX+36,SY+26,SW-72,58);c.fillStyle='#4a2a14';c.fillRect(SX,SY+110,SW,62);[SX+120,SX+210].forEach(x=>{c.fillStyle='#f4efe0';c.fillRect(x,SY+96,34,22);c.fillStyle='#3a1a0a';c.fillRect(x+4,SY+100,26,6);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=2;for(let j=0;j<3;j++){c.beginPath();c.moveTo(x+10+j*8,SY+90);c.quadraticCurveTo(x+14+j*8+Math.sin(t*3+j)*4,SY+78,x+10+j*8,SY+66);c.stroke()}})}
   else if(t<33){const g=c.createLinearGradient(0,SY,0,SY+SH);g.addColorStop(0,'#9ad0f0');g.addColorStop(1,'#e8f4fa');c.fillStyle=g;c.fillRect(SX,SY,SW,SH);['#e03a3a','#f09a2a','#f0e03a','#3ac05a','#3a8ae0','#8a4ad0'].forEach((cc,j)=>{c.strokeStyle=cc;c.lineWidth=5;c.beginPath();c.arc(SX+170,SY+170,130-j*6,Math.PI,0);c.stroke()});c.fillStyle='#4aa05a';c.fillRect(SX,SY+150,SW,22)}
   else{c.fillStyle='#e8a8b8';c.fillRect(SX,SY,SW,SH);const g=c.createRadialGradient(SX+170,SY+90,10,SX+170,SY+90,180);g.addColorStop(0,'#ffe8c0');g.addColorStop(1,'rgba(255,200,200,0)');c.fillStyle=g;c.fillRect(SX,SY,SW,SH);for(let j=0;j<8;j++){const y=SY+SH-((t*25+j*40)%(SH+20));txt(c,'❤',SX+40+j*42+Math.sin(t+j)*10,y,'#e0405a','bold 16px sans-serif')}[SX+140,SX+190].forEach(x=>{c.fillStyle='#222';c.fillRect(x,SY+110,10,30);c.fillStyle='#f6d3b0';c.beginPath();c.arc(x+5,SY+104,7,0,7);c.fill()})}}
  else{ // 動畫
   c.fillStyle='#10142e';c.fillRect(SX,SY,SW,SH);for(let j=0;j<40;j++){c.fillStyle=`rgba(255,255,255,${.4+.4*Math.sin(t*2+j)})`;c.fillRect(SX+(j*53)%SW,SY+(j*31)%SH,2,2)}
   const pl=[[SX+60,SY+130,34,'#e8704a'],[SX+170,SY+110,40,'#4ab0a0'],[SX+280,SY+120,52,'#e8c04a']];pl.forEach(p=>{c.fillStyle=p[3];c.beginPath();c.arc(p[0],p[1],p[2],0,7);c.fill();c.fillStyle='rgba(0,0,0,.15)';c.beginPath();c.arc(p[0]+8,p[1]+6,p[2]*.6,0,7);c.fill()});
   const u=(t/DUR*2.99),seg=Math.min(2,u|0),ph=u-seg,a=pl[seg],b=pl[Math.min(2,seg+1)],bx=a[0]+(b[0]-a[0])*ph,by=a[1]+(b[1]-a[1])*ph-Math.sin(ph*Math.PI)*60-a[2]*(1-ph)-b[2]*ph;
   c.fillStyle='#fff';c.beginPath();c.arc(bx,by,12,0,7);c.fill();c.fillStyle='#222';c.fillRect(bx-5,by-3,3,5);c.fillRect(bx+2,by-3,3,5);c.fillStyle='#f06a8a';c.fillRect(bx-3,by+4,6,2)}
 };
 const G={name:'🎬 影廳 '+o.hall+'《'+f.t+'》',t0:0,
  up(dt){if(G.t>DUR&&!G.done){G.done=1;fxApply({j:16+(pc?4:0)+(cl?3:0),w:2,s:pc||cl?4:0});st.cnt.movie++;advance(2);hud();setTimeout(()=>{MG=null;openDlg('🎬 散場',`《${f.t}》播完了，燈光亮起。<br>${pc?'🍿 爆米花吃光光了。':''}${cl?'🥤 可樂也喝完了。':''}<br>😊+${16+(pc?4:0)+(cl?3:0)}　🧠+2`,[['離開影廳','',closeDlg]])},1200)}},
  press(){},
  dr(c){const T0=Math.min(G.t,DUR-.01);c.fillStyle='#0a0810';c.fillRect(0,0,W,H);c.fillStyle='#16101e';c.fillRect(SX-10,SY-10,SW+20,SH+20);c.save();c.beginPath();c.rect(SX,SY,SW,SH);c.clip();sc(c,T0,FILMS.indexOf(f));c.restore();
   const g=c.createRadialGradient(W/2,SY+SH/2,20,W/2,SY+SH/2,260);g.addColorStop(0,'rgba(255,255,255,.05)');g.addColorStop(1,'rgba(0,0,0,.4)');c.fillStyle=g;c.fillRect(0,0,W,H);
   const cp=CAP.filter(x=>x[0]<=T0).pop();if(cp&&T0<DUR-1){R(c,SX+20,SY+SH-24,SW-40,16,'rgba(0,0,0,.6)');txt(c,cp[1],W/2,SY+SH-12,'#fff','bold 9px sans-serif')}
   c.fillStyle='#1a1428';for(let r=0;r<2;r++)for(let i=0;i<9;i++){const x=40+i*48+(r%2)*22,y=232+r*32;c.beginPath();c.arc(x,y,13,0,7);c.fill();c.fillRect(x-17,y+8,34,26)}
   if(pc){c.fillStyle='#d62828';c.fillRect(W-80,252,26,28);c.fillStyle='#fff3b0';c.beginPath();c.arc(W-67,252,13,Math.PI,0);c.fill()}
   if(cl){c.fillStyle='#c62828';c.fillRect(W-44,256,14,24)}
   if(T0>DUR-2){c.fillStyle=`rgba(255,255,255,${(T0-DUR+2)*.2})`;c.fillRect(0,0,W,H)}
   txt(c,'C：中途離場',W/2,H-6,'#ffffff88','8px sans-serif')}};return G};
