/* v10.9 龜有光中醫（新建築）、派出所／銀行／消防局換新素材、拳擊第一人稱拳套、打沙包連擊小遊戲、戰鬥陀螺殘影與撞擊特效 */
const UW=(sid,i,x,bot,w,solid,o)=>{const k='pk'+sid+'_'+i;if(!PKIDX[sid]||!PKIDX[sid].r[i])return null;return UF(k,x,bot,w,0,solid==null?1:solid,o)};
// ───────── 🌿 龜有光中醫 ─────────
I['龜有光中醫']='🌿';
IT.tcm={n:'中藥調理包',i:'🍵',p:350,d:'光醫師開的藥。使用：❤️+15 ⚡+10',u:{h:15,s:10}};
IT.tcm2={n:'轉骨方',i:'🫖',p:680,d:'光醫師的獨門轉骨方，聽說喝了比較有力。使用：⚔️+1 ❤️+8',u:{p:1,h:8}};
{const _wl=worldLayout;worldLayout=function(){const r=_wl.apply(this,arguments);try{if(!B.find(b=>b.n=='龜有光中醫')){
 const b=bl('龜有光中醫',2224,1268,128,100,'conv',{c:'#f2e6cc',r:'#7a3a1a',sg:'龜有光中醫',hr:[9,21],dw:28});
 Z.push({n:b.n,b,x:b.x+b.dx-b.dw/2-6,y:b.bot,w:b.dw+12,h:10});sol(b.x,b.y+40,b.w,b.h-40);if(typeof BN!='undefined')BN[b.n]=b;
 uaBld('龜有光中醫','pk02_0',1.12)}}catch(e){console.error(e)}return r}}
try{EDNM.pk02_0='龜有光中醫（外觀）'}catch(e){}
def('龜有光中醫',{W:360,H:230,f:'#e8d8b8',g:'#dccaa6',fl:'wood',w:'#7a3a1a',title:'🌿 龜有光中醫',
 fur:okF([UW('02',1,10,62,18,0),UW('02',2,32,62,20,0),UW('02',3,58,80,56),UW('02',16,122,40,50,0),UW('02',5,232,64,26,0),UW('02',6,262,62,24,0),UW('02',4,330,78,20),
  UW('02',8,150,108,80),UW('02',18,12,116,42),UW('02',17,10,160,52),UW('02',12,250,140,70),UW('02',13,290,160,14),UW('02',9,332,132,22),UW('02',7,214,176,34),
  UW('02',15,10,218,84),UW('02',36,110,218,40),UW('02',10,290,212,24),UW('02',34,250,220,40),UW('02',27,330,220,26)]),
 ppl:[pp('光醫師',190,86,'#f4f4ee','#555','把手伸出來，我幫你把個脈。|年輕人火氣大，少喝冰的。|運動完拉傷，推拿一下就好。',{ou:'u',ac:'g',dir:0,lk:GL('elder',881)}),
  pp('護理師 阿香',40,140,'#7a3a1a','#222','煎藥要小火慢慢熬喔。',{dir:1}),pp('阿嬤',40,200,'#c0392b','#ddd','我來針灸膝蓋，光醫師很厲害喔！',{sit:1,dir:0,lk:GL('elder',882)})],
 sp:[['main',150,110,80,12],['tuina',250,142,70,12]],spl:{main:'看診櫃台',tuina:'推拿床'},
 spf:{main:()=>mainMenu('龜有光中醫'),tuina:()=>tcmTuina()}});
function tcmTuina(){const inj=st.box&&st.box.inj==wkN();openDlg('💆 推拿整復','光醫師搓了搓手：「哪裡痠？躺上去。」'+(inj?'<br>🩹 你身上還有拳擊比賽的傷。':''),[['💆 推拿整復（💰800・1 小時）','⚡+30 ❤️+10'+(inj?'・治好比賽的傷':''),()=>{payOut(800);advance(1);fxApply({s:30,h:10,j:6});if(inj){st.box.inj=0;st.sta=Math.max(st.sta,60)}hud();closeDlg();toast(inj?'💆 喀啦一聲，筋骨都歸位了！比賽的傷好了':'💆 痠痛全部推開了，整個人輕飄飄')},funds()<800],['🪡 針灸（💰600・30 分鐘）','❤️+12 😊+4（有點怕針……）',()=>{payOut(600);advance(.5);fxApply({h:12,j:4});hud();closeDlg();toast('🪡 一點都不痛！只是看到針有點腿軟')},funds()<600],['離開','',closeDlg]])}
SP['龜有光中醫']=()=>[['🩺 把脈看診（💰400）','❤️+15 😊+3・光醫師幫你調體質',()=>{payOut(400);advance(.5);fxApply({h:15,j:3});hud();closeDlg();
  const L=['「脈象有力，但睡太少。晚上早點睡！」','「濕氣有點重，少吃冰、多喝溫水。」','「軍人喔？難怪肩頸這麼硬，要多伸展。」','「氣色不錯！看來老婆把你照顧得很好。」'];openDlg('🩺 光醫師','光醫師把了很久的脈，點點頭：<br>'+L[Math.floor(Math.random()*L.length)]+'<br><br>❤️ +15　😊 +3',[['謝謝醫師','',closeDlg]])},funds()<400],
 ['💆 推拿・針灸','運動傷害、拳擊比賽的傷都能處理',tcmTuina],
 ['🍵 抓中藥','',()=>buyList('🍵 龜有光中醫・藥櫃','阿香：「要抓什麼藥？我幫你包好。」',[['tcm','🍵','中藥調理包',350],['tcm2','🫖','轉骨方',680]],q=>q[3],()=>mainMenu('龜有光中醫'))]];
// buyList 不支援時的退路
if(typeof buyList!='function')SP['龜有光中醫']=()=>[['🍵 中藥調理包（💰350）','',()=>{if(st.money<350)return toast('錢不夠');st.money-=350;addItem('tcm',1);hud();toast('🍵 買了中藥調理包')}]];
// ───────── 派出所、銀行、消防局：換新素材 ─────────
{const R=IN['派出所'];if(R){R.fur=okF([UW('30',8,12,74,50),UW('30',1,300,40,16,0),UW('30',3,236,74,22),UW('30',4,100,84,120),UW('30',5,262,110,80),UW('30',7,12,140,76),UW('30',13,236,124,16),
  UW('30',33,100,172,100),UW('30',6,262,200,80),UW('30',37,12,210,30),UW('30',20,176,210,14),UW('30',21,196,212,40)]);
 R.ppl.forEach(n=>{const P={櫃檯員警:[165,46],民眾:[44,190]};if(n.n&&P[n.n]){n.x=P[n.n][0];n.y=P[n.n][1]}});
 const cs=R.ppl.filter(n=>n.n=='員警');if(cs[0]){cs[0].x=48;cs[0].y=114}if(cs[1]){cs[1].x=150;cs[1].y=184}
 R.sp=[['main',110,86,110,12]];R.built=0}}
{const R=IN['銀行'];if(R){R.fur=okF([UW('09',2,250,36,40,0),UW('09',7,330,22,14,0),UW('09',3,226,92,20),UW('09',16,290,80,44),UW('09',23,40,84,90),UW('09',23,140,84,90),UW('09',4,14,108,26),
  UW('09',14,40,134,90),UW('09',6,170,188,110),UW('09',8,320,200,20),UW('09',5,14,212,80),UW('09',10,120,212,16),UW('09',30,290,206,24)]);
 R.ppl.forEach(n=>{const P={櫃員:[80,52],理專:[180,52]};if(n.n&&P[n.n]){n.x=P[n.n][0];n.y=P[n.n][1]}});const cu=R.ppl.filter(n=>n.n=='客戶');if(cu[0]){cu[0].x=110;cu[0].y=112}if(cu[1]){cu[1].x=222;cu[1].y=176}
 R.sp=[['main',40,88,190,12]];R.title='🏦 國泰銀行';R.built=0}}
{const R=IN['消防局'];if(R){R.fur=okF([UW('07',1,200,30,18,0),UW('07',2,10,96,124),UW('07',3,140,96,118),UW('07',4,262,94,96),UW('07',6,362,96,50),
  UW('07',48,10,164,96),UW('07',47,110,154,104),UW('07',51,228,140,56),UW('07',9,388,140,12),UW('07',10,402,140,12),['counter',270,150,100,22,'#6a1a1a'],
  UW('07',55,10,240,84),UW('07',54,110,236,30),UW('07',56,300,240,60),UW('07',57,384,240,26),['plant',156,224,16,26]]);
 R.ppl.forEach(n=>{if(n.n=='值班員 小周'){n.x=150;n.y=162}if(n.n=='消防員'&&n.y==150){n.x=246;n.y=160}});R.built=0}}
// ───────── 🥊 第一人稱拳套 ─────────
const GLV={idleL:13,idleR:19,jabL:6,jabR:11,hookL:9,hookR:16,upL:33,upR:37,guard:18,windL:5,windR:12,spL:28,spR:22};
function glDraw(g,k,cx,by,sc,flip){const im=UAI['pk63_'+GLV[k]];if(!im||!im.naturalWidth)return false;const w=im.naturalWidth*sc,h=im.naturalHeight*sc;g.save();g.translate(cx,by);if(flip)g.scale(-1,1);g.drawImage(im,-w/2,-h,w,h);g.restore();return true}
// ───────── 🥊 打沙包連擊練習 ─────────
const SBM={j:['左刺拳','J','jabL',6,.5],k:['右直拳','K','jabR',10,.8],h:['勾拳','L','hookR',14,1.25],u:['上勾拳','I','upL',16,.4]};
function sandbagGame(o){o=o||{};const M=mgBox('🥊 打沙包・連擊練習'),g=M.g,W2=720,H2=520,DUR=o.short?20:30;
 const S={t:-1.5,ang:0,av:0,bounce:0,en:100,sc:0,combo:0,best:0,hits:0,miss:0,act:null,at:0,side:0,fx:[],msg:'',mt:0,seq:[],si:0,done:false,shake:0,coach:''};
 const newSeq=()=>{const ks=Object.keys(SBM),n=3+Math.min(3,Math.floor(S.best/3));S.seq=[];for(let i=0;i<n;i++)S.seq.push(ks[Math.floor(Math.random()*(i==0?2:4))]);S.si=0};newSeq();
 const punch=k=>{if(S.done||S.t<0||S.act)return;const P=SBM[k];if(S.en<P[3]*1.2){S.msg='喘一下……';S.mt=.5;return}S.en-=P[3]*1.2;S.act=k;S.at=0;S.side=k=='j'||k=='u'?0:1;if(k=='h')S.side=S.hs=(S.hs?0:1)};
 const land=k=>{const P=SBM[k],near=Math.abs(S.ang)<.42;if(!near){S.miss++;S.combo=0;S.msg='揮空了！等沙包盪回來';S.mt=.6;return}
  const right=k==S.seq[S.si];let dmg=P[3]*(right?1.5:1)*(1+S.combo*.08);S.sc+=Math.round(dmg);S.hits++;S.shake=k=='h'||k=='u'?8:4;
  S.av+=(k=='h'?(S.side?-1:1):(k=='k'?.55:k=='j'?.35:.2))*P[4]*(S.ang>=0?1:1)*2.2;if(k=='u')S.bounce=1;
  S.fx.push({x:W2/2+S.ang*230+(S.side?20:-20),y:k=='u'?300:250,t:0,v:Math.round(dmg),big:dmg>15});
  if(right){S.si++;S.combo++;if(S.si>=S.seq.length){const bonus=20*S.seq.length;S.sc+=bonus;S.best++;S.msg='🔥 連擊完成！+'+bonus;S.mt=1;S.coach=['「漂亮！就是這個節奏！」','「再快一點！手不要垂下來！」','「好！呼吸跟上！」','「這組打得很乾淨！」'][Math.floor(Math.random()*4)];newSeq()}}
  else{S.combo=0;S.msg='順序不對，重新開始這組';S.mt=.7;S.si=0}};
 const KM={j:'j',z:'j',k:'k',x:'k',l:'h',c:'h',i:'u',v:'u'};
 const kd=e=>{const k=KM[e.key.toLowerCase()];if(k){e.preventDefault();punch(k)}else if(e.key=='Escape')fin()};OVK.add(kd);
 mgBtn(M,[['👊 刺拳 J',()=>punch('j')],['💥 直拳 K',()=>punch('k')],['🌀 勾拳 L',()=>punch('h')],['⬆️ 上勾 I',()=>punch('u')]]);
 M.tip.innerHTML='照上面的順序出拳，沙包盪到正前方時打下去！<br>J 左刺拳・K 右直拳・L 勾拳（左右輪流）・I 上勾拳';
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);const p=S.sc>=600?3:S.sc>=300?2:1;fxApply({p,s:-12,j:5+p*2});advance(o.short?.5:1);
  let extra='';if(typeof boxPrep=='function'&&boxPrep()&&S.sc>=400){const W0=wkN();st.box.tr[W0]=Math.min(3,(st.box.tr[W0]||0)+1);extra='<br>🏋️ 教練：「這組可以算一次備賽訓練！」'}hud();SVDIRTY=1;
  g.fillStyle='rgba(20,10,5,.85)';g.fillRect(0,0,W2,H2);mgTxt(g,`總傷害 ${S.sc}`,W2/2,190,'bold 44px sans-serif','#ffd84a');mgTxt(g,`命中 ${S.hits}・揮空 ${S.miss}・完成連擊 ${S.best} 組`,W2/2,240,'22px sans-serif','#fff');mgTxt(g,'⚔️ 力量 +'+p,W2/2,280,'bold 22px sans-serif','#8affb0');
  M.tip.innerHTML='練完了！全身是汗。'+extra;mgButtons(M,[['再打一組',()=>{if(st.sta<12)return toast('體力不夠了');M.end();sandbagGame(o)}],['休息',()=>M.end()]])};
 let last=performance.now();
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;S.shake=Math.max(0,S.shake-dt*30);
  if(S.t>=DUR)return fin();
  S.av+=-S.ang*9*dt;S.av*=Math.exp(-1.1*dt);S.ang+=S.av*dt;S.bounce=Math.max(0,S.bounce-dt*3);S.en=Math.min(100,S.en+22*dt);
  if(S.act){S.at+=dt;const dur=S.act=='j'?.2:S.act=='k'?.26:.32;if(!S.landed&&S.at>dur*.5){S.landed=1;land(S.act)}if(S.at>dur){S.act=null;S.landed=0}}
  S.fx.forEach(f=>f.t+=dt);S.fx=S.fx.filter(f=>f.t<.8);
  const sx=S.shake?(Math.random()-.5)*S.shake:0;g.save();g.translate(sx,0);
  // 健身房背景
  g.fillStyle='#3a2a20';g.fillRect(-10,0,W2+20,H2);g.fillStyle='#4a3628';for(let i=0;i<12;i++)g.fillRect(i*64,0,2,330);g.fillStyle='#2a1e16';g.fillRect(-10,330,W2+20,H2-330);
  for(let i=0;i<3;i++){g.fillStyle=['#c0392b','#eee','#2f6ad0'][i];g.fillRect(-10,270+i*20,W2+20,4)}
  mgTxt(g,'BOXING GYM',W2/2,60,'bold 30px sans-serif','rgba(255,216,74,.25)');
  // 沙包
  g.save();g.translate(W2/2,10);g.rotate(S.ang);g.strokeStyle='#999';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(0,90);g.stroke();
  const sq=1+S.bounce*.12;g.translate(0,90-S.bounce*14);g.scale(1/sq,sq);g.fillStyle='#8a2a1a';g.beginPath();g.roundRect(-58,0,116,260,40);g.fill();g.fillStyle='#a83a24';g.beginPath();g.roundRect(-50,8,40,240,30);g.fill();
  g.fillStyle='#222';g.fillRect(-58,40,116,10);g.fillRect(-58,210,116,10);mgTxt(g,'EVERLAST',0,140,'bold 16px sans-serif','#f4e2b8');g.restore();
  // 受擊特效
  S.fx.forEach(f=>{const a=1-f.t/.8;g.globalAlpha=a;g.strokeStyle='#fff';g.lineWidth=3;for(let i=0;i<8;i++){const an=i*Math.PI/4+f.t;g.beginPath();g.moveTo(f.x+Math.cos(an)*(10+f.t*60),f.y+Math.sin(an)*(10+f.t*60));g.lineTo(f.x+Math.cos(an)*(26+f.t*90),f.y+Math.sin(an)*(26+f.t*90));g.stroke()}
   mgTxt(g,'-'+f.v,f.x,f.y-30-f.t*60,(f.big?'bold 34px':'bold 24px')+' sans-serif',f.big?'#ffd84a':'#fff');g.globalAlpha=1});
  // 拳套
  const a=S.act,ph=a?Math.min(1,S.at/(a=='j'?.2:a=='k'?.26:.32)):0,out=ph<.5?ph*2:2-ph*2;
  const L=a&&(a=='j'||a=='u'||(a=='h'&&!S.side)),Rr=a&&(a=='k'||(a=='h'&&S.side));
  if(L){const k=a=='j'?'jabL':a=='u'?'upL':'hookL';glDraw(g,out>.3?k:'windL',W2/2-150+out*120,H2-out*90+20,2.4-out*.6)}else glDraw(g,'idleL',150,H2+30,2.3);
  if(Rr){const k=a=='k'?'jabR':'hookR';glDraw(g,out>.3?k:'windR',W2/2+150-out*120,H2-out*90+20,2.4-out*.6)}else glDraw(g,'idleR',W2-150,H2+30,2.3);
  g.restore();
  // 指令列
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(140,80,440,56);S.seq.forEach((k,i)=>{const x=W2/2-(S.seq.length-1)*40+i*80,cur=i==S.si;g.fillStyle=i<S.si?'#3a8a4a':cur?'#ffd84a':'#555';g.beginPath();g.roundRect(x-34,88,68,40,8);g.fill();mgTxt(g,SBM[k][1],x,113,'bold 22px sans-serif',cur?'#3a2210':'#fff');mgTxt(g,SBM[k][0],x,150,'bold 12px sans-serif','#fff')});
  g.fillStyle='#000';g.fillRect(20,20,200,14);g.fillStyle='#ffd84a';g.fillRect(22,22,196*S.en/100,10);mgTxt(g,'體力',230,33,'14px sans-serif','#ffd84a','left');
  mgTxt(g,`⏱️ ${Math.max(0,Math.ceil(DUR-Math.max(0,S.t)))}`,W2-30,36,'bold 24px sans-serif','#fff','right');mgTxt(g,`傷害 ${S.sc}`,W2-30,66,'bold 20px sans-serif','#ffd84a','right');
  if(S.combo>1)mgTxt(g,S.combo+' COMBO',110,200,'bold 28px sans-serif','#ff8a4a');
  if(S.t<0)mgTxt(g,'準備……',W2/2,320,'bold 50px sans-serif','#fff');
  if(S.mt>0)mgTxt(g,S.msg,W2/2,200,'bold 26px sans-serif','#fff');if(S.coach&&S.mt>0)mgTxt(g,'教練：'+S.coach,W2/2,236,'18px sans-serif','#8affb0');
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// 擂台、家裡健身房的「打沙包」改成小遊戲
{const _fm=fightMenu;fightMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts))opts.forEach(q=>{if(typeof q[0]=='string'&&q[0].includes('打沙包')){q[0]='🥊 打沙包連擊練習（小遊戲）';q[1]='⚔️ 力量 +1～3　⚡-12　時間+1小時';q[2]=()=>{closeDlg();sandbagGame()};q[3]=st.sta<12}});return od.call(this,t,d,opts,...r)};try{return _fm.apply(this,arguments)}finally{openDlg=od}}}
{const R=IN['家6F'];if(R&&R.spf&&R.spf.work){const w0=R.spf.work;R.spf.work=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts))opts.forEach(q=>{if(typeof q[0]=='string'&&q[0].startsWith('🥊 打沙包')){q[0]='🥊 打沙包連擊練習（20 秒）';q[2]=()=>{closeDlg();sandbagGame({short:1})}}});return od.call(this,t,d,opts,...r)};try{return w0.apply(this,arguments)}finally{openDlg=od}}}}
