/* v10.5 運動小遊戲：游泳 50 公尺計時賽、三分球大賽（對手柏凱）、拳擊月賽即時對打 */
const mgBtn=(M,list)=>{M.bt.innerHTML='';list.forEach(q=>{const b=document.createElement('button');b.textContent=q[0];b.style.cssText='font:inherit;font-size:15px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:8px 14px;cursor:pointer;min-width:64px;touch-action:manipulation;user-select:none';
 b.addEventListener('pointerdown',e=>{e.preventDefault();q[1]()});if(q[2])b.addEventListener('pointerup',e=>{e.preventDefault();q[2]()});M.bt.appendChild(b)})};
const mgTxt=(g,t,x,y,f,c,al)=>{g.font=f;g.fillStyle=c||'#fff6dc';g.textAlign=al||'center';g.fillText(t,x,y)};
// ───────── 🏊 游泳 50 公尺 ─────────
function swimRace(){const M=mgBox('🏊 50 公尺自由式計時'),g=M.g,W2=720,H2=520;
 const S={t:-3,x:0,v:0,last:'',str:0,air:100,br:0,done:false,msg:'',mt:0},RV=[{n:'晨泳阿伯',v:1.28+Math.random()*.1,x:0},{n:'游泳隊學生',v:1.55+Math.random()*.12,x:0}];
 if(FRS('yuhao').met&&Math.random()<.5)RV[0]={n:'禹豪',v:1.45+Math.random()*.1,x:0};
 const stroke=k=>{if(S.done||S.t<0)return;if(S.br>0){S.msg='換氣中…';S.mt=.3;return}if(k==S.last){S.v=Math.max(0,S.v-.35);S.msg='手划亂了！';S.mt=.5;return}
  S.last=k;S.str++;S.v=Math.min(2.4,S.v+.42*(S.air>25?1:.45));S.air=Math.max(0,S.air-7)};
 const breath=()=>{if(S.done||S.t<0||S.br>0)return;S.br=.45;S.air=100;S.v*=.8;S.msg='🫁 換氣';S.mt=.4};
 const kd=e=>{const k=e.key.toLowerCase();if(['arrowleft','a','j'].includes(k)){e.preventDefault();stroke('L')}else if(['arrowright','d','l'].includes(k)){e.preventDefault();stroke('R')}else if(k==' '||k=='arrowup'||k=='w'){e.preventDefault();breath()}else if(k=='escape')fin(true)};OVK.add(kd);
 mgBtn(M,[['⬅ 左手',()=>stroke('L')],['🫁 換氣',breath],['右手 ➡',()=>stroke('R')]]);
 M.tip.textContent='左右手輪流划（← → 或 A D），氧氣快沒時按空白鍵換氣！';
 const fin=quit=>{if(S.done)return;S.done=true;OVK.delete(kd);const tm=S.t,SW=st.swim||(st.swim={best:0,n:0});SW.n++;
  const rank=1+RV.filter(r=>r.ft&&r.ft<tm).length,pb=!quit&&(!SW.best||tm<SW.best);if(pb&&!quit)SW.best=+tm.toFixed(2);
  fxApply({s:-15,h:8,j:quit?2:6+(rank==1?6:0),p:1});advance(1);hud();SVDIRTY=1;
  g.fillStyle='rgba(230,246,255,.95)';g.fillRect(0,0,W2,H2);
  if(quit){mgTxt(g,'中途上岸了',W2/2,220,'bold 34px sans-serif','#123')}else{
   mgTxt(g,`⏱️ ${tm.toFixed(2)} 秒`,W2/2,180,'bold 46px sans-serif','#123');mgTxt(g,`第 ${rank} 名`+(pb?'　🎉 個人最佳！':`　（最佳 ${SW.best} 秒）`),W2/2,240,'26px sans-serif','#123');
   mgTxt(g,tm<35?'救生員吹了聲口哨：「你是游泳隊的嗎？」':tm<45?'游得很順！肩膀有點痠。':'喘到不行……但很暢快！',W2/2,300,'20px sans-serif','#345')}
  if(!quit&&tm<35&&!SW.medal){SW.medal=1;fxApply({r:5});setTimeout(()=>toast('🏅 50 公尺 35 秒內！⭐+5'),500)}
  mgButtons(M,[['再游一次（💰110）',()=>{if(st.money<110||st.sta<15)return toast('錢或體力不夠了');st.money-=110;hud();M.end();swimRace()}],['上岸',()=>M.end()]])};
 let last=performance.now();
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;
  if(S.t>0){if(S.br>0)S.br-=dt;S.v=Math.max(0,S.v-dt*.9);S.x+=S.v*dt;if(S.air<=0){S.v*=.97;if(S.mt<=0){S.msg='⚠️ 快喘不過氣了，換氣！';S.mt=.6}}
   RV.forEach(r=>{if(r.ft)return;r.x+=r.v*dt*(.92+Math.sin(S.t*3+r.v*9)*.1);if(r.x>=50){r.x=50;r.ft=S.t}});if(S.x>=50){S.x=50;return fin(false)}}
  // 泳池
  g.fillStyle='#2b7fb8';g.fillRect(0,0,W2,H2);g.fillStyle='#e8f4fb';g.fillRect(0,0,W2,60);g.fillRect(0,H2-40,W2,40);
  for(let i=0;i<4;i++){const y=60+i*105;g.fillStyle='#d23';for(let x=0;x<W2;x+=24){g.fillStyle=(x/24)%2?'#d23':'#fff';g.fillRect(x,y-3,12,6)}}
  g.fillStyle='#1a5f8e';for(let i=0;i<3;i++)g.fillRect(60,112+i*105,W2-120,4);g.fillStyle='#fff';g.fillRect(56,60,6,H2-100);g.fillRect(W2-62,60,6,H2-100);
  const X=m=>62+m/50*(W2-130);
  const lanes=[[RV[0],0],[{n:'你',x:S.x},1],[RV[1],2]];
  lanes.forEach(([r,i])=>{const x=X(r.x),y=112+i*105,me=i==1,sw=Math.sin((S.t*8)+(me?S.str:0));g.fillStyle=me?'#ffd84a':'#f2c7a5';g.beginPath();g.arc(x,y,13,0,7);g.fill();
   g.fillStyle=me?'#e04030':'#333';g.beginPath();g.arc(x,y-4,13,Math.PI,0);g.fill();g.strokeStyle='#f2c7a5';g.lineWidth=6;g.beginPath();g.moveTo(x-6,y);g.lineTo(x-30,y+sw*14);g.stroke();
   g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;for(let k=1;k<4;k++){g.beginPath();g.arc(x-26-k*12,y,6+k*2,-1,1);g.stroke()}
   mgTxt(g,r.n+(r.ft?` ${r.ft.toFixed(1)}s`:''),x,y-24,'bold 15px sans-serif',me?'#ffd84a':'#fff')});
  mgTxt(g,S.t<0?'各就位……':'',W2/2,40,'bold 24px sans-serif','#123');
  if(S.t<0)mgTxt(g,String(Math.ceil(-S.t)),W2/2,300,'bold 90px sans-serif','#fff');else if(S.t<.6)mgTxt(g,'嗶！',W2/2,300,'bold 80px sans-serif','#ffd84a');
  mgTxt(g,`⏱️ ${Math.max(0,S.t).toFixed(1)}s　${S.x.toFixed(1)} / 50 m`,20,40,'bold 22px sans-serif','#123','left');
  g.fillStyle='#123';g.fillRect(W2-230,22,200,22);g.fillStyle=S.air>40?'#5ad1ff':S.air>20?'#ffb84a':'#ff4a4a';g.fillRect(W2-228,24,196*S.air/100,18);mgTxt(g,'🫁 氧氣',W2-240,40,'16px sans-serif','#123','right');
  g.fillStyle='#123';g.fillRect(20,H2-30,200,16);g.fillStyle='#7dff9a';g.fillRect(22,H2-28,196*S.v/2.4,12);mgTxt(g,'速度',230,H2-17,'14px sans-serif','#123','left');
  if(S.mt>0)mgTxt(g,S.msg,W2/2,H2-15,'bold 22px sans-serif','#c23');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
{const R=IN['運動中心B1游泳池'];if(R&&R.spf){const _sw=R.spf.swim;R.spf.swim=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='🏊 游泳池'&&Array.isArray(opts)){const SW=st.swim||{};opts.splice(1,0,['🏁 50 公尺計時賽（💰110）',(SW.best?`個人最佳 ${SW.best} 秒・`:'')+'⚡-15・跟隔壁水道的人比一比',()=>{st.money-=110;hud();closeDlg();swimRace()},st.money<110||st.sta<15]);d+=SW.best?`<br>🏅 你的 50 公尺最佳：<b>${SW.best} 秒</b>`:''}return od.call(this,t,d,opts,...r)};try{return _sw.apply(this,arguments)}finally{openDlg=od}}}}
// ───────── 🏀 三分球大賽 ─────────
function threeGame(){const M=mgBox('🏀 三分球大賽'),g=M.g,W2=720,H2=520,bk=st.bk&&st.bk.met;
 const S={rack:0,ball:0,sc:0,p:0,dir:1,shot:null,done:false,msg:'',mt:0,res:[]},SPOT=['左底角','左翼','弧頂','右翼','右底角'],sweet=[.47,.5,.53,.5,.47];
 const rival=bk?{n:'柏凱',sc:Math.round(15+Math.random()*9)}:{n:'球場紀錄',sc:(st.three&&st.three.best)||12};
 const spd=()=>1.25+S.rack*.18;
 const shoot=()=>{if(S.done||S.shot)return;const d=Math.abs(S.p-sweet[S.rack]),win=.05-S.rack*.004,mb=S.ball==4,ok=d<win||(d<win*2&&Math.random()<.35);
  S.shot={t:0,ok,off:(S.p-sweet[S.rack])};if(ok){S.sc+=mb?2:1;S.msg=mb?'💰 彩球進了！+2':'唰！';S.res.push(mb?2:1)}else{S.msg=S.p<sweet[S.rack]?'太短了…':'太大力了…';S.res.push(0)}S.mt=.7};
 const kd=e=>{if(e.key==' '||e.key=='Enter'||e.key=='j'){e.preventDefault();shoot()}else if(e.key=='Escape')fin()};OVK.add(kd);
 mgBtn(M,[['🏀 出手！',shoot]]);M.tip.textContent='力道條跑到綠色區按空白鍵出手。每個點 5 球，最後一顆彩球算 2 分！';
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);const T3=st.three||(st.three={best:0,n:0,winBk:0});T3.n++;const pb=S.sc>T3.best;if(pb)T3.best=S.sc;const win=S.sc>rival.sc;
  if(win&&bk){T3.winBk++;try{frAdd('bokai',3,1)}catch(e){}}fxApply({s:-12,p:1,j:win?12:6});advance(1);hud();SVDIRTY=1;
  g.fillStyle='rgba(255,244,226,.96)';g.fillRect(0,0,W2,H2);mgTxt(g,`你 ${S.sc} 分　vs　${rival.n} ${rival.sc} 分`,W2/2,180,'bold 38px sans-serif','#3a2210');
  mgTxt(g,win?(bk?'柏凱：「好球！下次我不會讓你了。」':'🎉 破了球場紀錄！'):S.sc==rival.sc?'平手！':(bk?'柏凱：「手腕再放鬆一點，跟著腿的力量出手。」':'差一點點！'),W2/2,240,'22px sans-serif','#3a2210');
  if(pb)mgTxt(g,'🏅 個人最佳 '+S.sc+' 分',W2/2,290,'bold 22px sans-serif','#b5651d');
  if(win&&bk&&T3.winBk==1){st.money+=500;hud();mgTxt(g,'柏凱願賭服輸，請你喝了一杯珍奶（💰+500 等值）',W2/2,330,'18px sans-serif','#3a2210')}
  mgButtons(M,[['再比一場',()=>{if(st.sta<12)return toast('體力不夠了');M.end();threeGame()}],['離開',()=>M.end()]])};
 let last=performance.now();
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.mt-=dt;
  if(!S.shot){S.p+=S.dir*spd()*dt;if(S.p>1){S.p=1;S.dir=-1}if(S.p<0){S.p=0;S.dir=1}}else{S.shot.t+=dt;if(S.shot.t>.9){S.shot=null;S.ball++;S.p=0;S.dir=1;if(S.ball>=5){S.ball=0;S.rack++;if(S.rack>=5)return fin()}}}
  // 球場
  g.fillStyle='#c98a4b';g.fillRect(0,0,W2,H2);g.fillStyle='#b97a3d';for(let y=0;y<H2;y+=26)g.fillRect(0,y,W2,2);
  g.strokeStyle='#fff';g.lineWidth=4;g.beginPath();g.arc(W2/2,40,330,0.15,Math.PI-.15);g.stroke();g.strokeRect(W2/2-90,0,180,230);
  g.fillStyle='#fff';g.fillRect(W2/2-45,20,90,6);g.strokeStyle='#e04030';g.lineWidth=4;g.beginPath();g.ellipse(W2/2,44,22,7,0,0,7);g.stroke();
  const SP=[[90,90],[160,280],[W2/2,380],[W2-160,280],[W2-90,90]];SP.forEach(([x,y],i)=>{g.fillStyle=i==S.rack?'#ffd84a':'rgba(255,255,255,.4)';g.beginPath();g.arc(x,y,10,0,7);g.fill()});
  const [px,py]=SP[Math.min(4,S.rack)];g.fillStyle='#2a3a6a';g.fillRect(px-10,py+12,20,34);g.fillStyle='#f2c7a5';g.beginPath();g.arc(px,py+4,11,0,7);g.fill();
  // 球
  if(S.shot){const t=Math.min(1,S.shot.t/.8),tx=W2/2+(S.shot.ok?0:S.shot.off*160),ty=44,x=px+(tx-px)*t,y=py+(ty-py)*t-Math.sin(t*Math.PI)*140;g.fillStyle='#e8762c';g.beginPath();g.arc(x,y,11,0,7);g.fill();g.strokeStyle='#5a2a10';g.lineWidth=2;g.stroke()}
  // 球架
  for(let i=0;i<5;i++){const r=S.res[S.rack*5+i];g.fillStyle=i==4?'#e0b030':'#e8762c';g.globalAlpha=i<S.ball?.25:1;g.beginPath();g.arc(px-48+i*24,py+70,9,0,7);g.fill();g.globalAlpha=1}
  // 力道條
  const bx=W2-60,by=150,bh=300;g.fillStyle='#222';g.fillRect(bx,by,30,bh);const sw=sweet[S.rack],ww=(.05-S.rack*.004)*bh;g.fillStyle='#3cd070';g.fillRect(bx,by+bh*(1-sw)-ww,30,ww*2);
  g.fillStyle='#ffd84a';g.fillRect(bx-6,by+bh*(1-S.p)-3,42,6);mgTxt(g,'力道',bx+15,by-10,'bold 16px sans-serif','#fff');
  mgTxt(g,`${SPOT[Math.min(4,S.rack)]}　第 ${Math.min(5,S.ball+1)} 球${S.ball==4?'（彩球）':''}`,20,H2-20,'bold 20px sans-serif','#fff','left');
  mgTxt(g,`你 ${S.sc}　${rival.n} ${rival.sc}`,W2-20,H2-20,'bold 22px sans-serif','#fff','right');
  if(S.mt>0)mgTxt(g,S.msg,W2/2,200,'bold 32px sans-serif','#fff');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
{const _sb=scBall;scBall=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='🏀 1F 籃球場'&&Array.isArray(opts)){const fr=IN['高雄運動中心']._bb||[],bk=fr.some(n=>n.fr=='bokai'),T3=st.three||{};
   opts.splice(opts.length-1,0,['🏆 三分球大賽'+(bk?'（挑戰柏凱）':''),(T3.best?`最佳 ${T3.best} 分・`:'')+'1 小時・⚡-12・25 球，滿分 30',()=>{closeDlg();threeGame()},st.sta<12])}return od.call(this,t,d,opts,...r)};try{return _sb.apply(this,arguments)}finally{openDlg=od}}}
// ───────── 🥊 拳擊月賽：即時對打 ─────────
function boxEnd(win){const b=st.box;b.done=1;
 if(win){st.money+=30000;st.earned=(st.earned||0)+30000;fxApply({r:20,j:30,h:-20,s:-40});addItem('belt',1);hud();openDlg('🏆 冠軍！','裁判舉起你的手，全場歡呼！<br>💰 冠軍獎金 +30000　⭐ 聲望 +20　🏆 獲得冠軍腰帶<br>❤️ 雖然贏了，身上也掛了不少彩。',[['🏆','',closeDlg]])}
 else{fxApply({h:-50,s:-60,j:-15,r:2});st.money-=1500;b.inj=wkN()+1;hud();openDlg('💥 落敗','你輸了這場比賽。在診所縫了三針、照了 X 光。<br>❤️ 健康 -50　💸 醫藥費 -1500<br>下個週末身體還在恢復，體力會比較差。<br><span class="text-[12px] opacity-80">教練：「你很勇敢。輸了不丟臉，下個月再來。」</span>',[['……','',closeDlg]])}}
function boxRT(){const cond=boxCond(),op=pick0(['「重砲」陳大山','「鐵頭」林志強','「獵豹」吳俊傑','「颱風」黃建宏'],wkN());advance(3);closeDlg();
 const M=mgBox('🥊 拳擊月賽 vs '+op),g=M.g,W2=720,H2=520;
 // 備賽狀態越好：血量、體力恢復、對手越慢
 const S={rd:1,rt:45,P:{hp:100+cond*.6,mx:100+cond*.6,en:100,act:'',at:0,stun:0},E:{hp:220+(100-cond)*1.2,mx:220+(100-cond)*1.2,act:'idle',at:1.4,ph:'',hit:0},msg:'回合開始！',mt:1,done:false,pts:[0,0],gap:0,slow:.8+cond/100*.4,shake:0,pause:1.2};window.__mg=S;
 const ok=()=>!S.done&&S.pause<=0&&S.P.stun<=0&&!S.P.act;
 const punch=k=>{if(!ok())return;const c=k=='j'?12:22;if(S.P.en<c){S.msg='沒力了……先護頭喘口氣';S.mt=.6;return}S.P.en-=c;S.P.act=k;S.P.at=k=='j'?.22:.45};
 const guard=on=>{if(S.done)return;if(on&&ok()){S.P.act='g';S.P.at=99}else if(!on&&S.P.act=='g'){S.P.act='';S.P.at=0}};
 const dodge=()=>{if(!ok())return;if(S.P.en<10)return;S.P.en-=10;S.P.act='d';S.P.at=.38};
 const kd=e=>{const k=e.key.toLowerCase();if(k=='j'||k=='z'){e.preventDefault();punch('j')}else if(k=='k'||k=='x'){e.preventDefault();punch('k')}else if(k=='s'||k=='arrowdown'||k==' '){e.preventDefault();guard(1)}else if(k=='a'||k=='d'||k=='arrowleft'||k=='arrowright'){e.preventDefault();dodge()}};
 const ku=e=>{const k=e.key.toLowerCase();if(k=='s'||k=='arrowdown'||k==' ')guard(0)};OVK.add(kd);OVKU.add(ku);
 mgBtn(M,[['👊 刺拳',()=>punch('j')],['💥 勾拳',()=>punch('k')],['🛡️ 護頭',()=>guard(1),()=>guard(0)],['↔ 閃躲',dodge]]);
 M.tip.innerHTML='J 刺拳・K 勾拳・按住 S/空白 護頭・A/D 閃躲<br>對手頭上出現 <b>❗</b> 就是要出拳了——閃掉之後馬上反擊，傷害加倍！';
 const fin=win=>{if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);
  g.fillStyle='rgba(20,10,5,.82)';g.fillRect(0,0,W2,H2);mgTxt(g,win?'🏆 你贏了！':'💥 你輸了……',W2/2,220,'bold 52px sans-serif',win?'#ffd84a':'#ff8a7a');
  mgTxt(g,S.E.hp<=0?'K.O.！':S.P.hp<=0?'被擊倒了':'裁判判定',W2/2,280,'24px sans-serif','#fff');
  mgButtons(M,[['繼續',()=>{M.end();boxEnd(win)}]])};
 const hitE=(d,cnt)=>{const dmg=d*(cnt?1.6:1)*(.85+Math.random()*.3);S.E.hp=Math.max(0,S.E.hp-dmg);S.E.hit=.25;S.pts[0]+=dmg;S.msg=cnt?'💥 反擊命中！':d>15?'勾拳命中！':'';S.mt=cnt?.7:.4;if(S.E.hp<=0)setTimeout(()=>fin(true),500)};
 let last=performance.now();
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.mt-=dt;S.shake=Math.max(0,S.shake-dt);
  if(S.pause>0){S.pause-=dt}else{S.rt-=dt;S.gap=Math.max(0,S.gap-dt);if(S.P.stun>0)S.P.stun-=dt;
   S.P.en=Math.min(100,S.P.en+dt*(S.P.act=='g'?22:13)*(.8+cond/250));
   // 玩家動作
   if(S.P.act&&S.P.act!='g'){S.P.at-=dt;if(S.P.at<=0){const a=S.P.act;S.P.act='';if(a=='j'||a=='k'){const d=a=='j'?7:16,E=S.E;
     if(E.act=='idle'&&!S.gap&&Math.random()<.35){E.act='guard';E.at=.7}
     if(E.act=='guard'&&!S.gap){S.msg='被擋住了';S.mt=.4;E.hp-=1}else if(E.act=='wind'&&a=='j'){hitE(d,0);E.act='idle';E.at=.8*S.slow}else hitE(d,S.gap>0)}}}
   // 對手 AI
   const E=S.E;E.hit=Math.max(0,E.hit-dt);E.at-=dt;
   if(E.at<=0){if(E.act=='idle'||E.act=='guard'){const r=Math.random();if(r<.62){E.act='wind';E.ph=Math.random()<.3?'big':'jab';E.fk=Math.random()<.18;E.at=(E.ph=='big'?.75:.55)*S.slow}else{E.act='guard';E.at=.9+Math.random()*.8}}
    else if(E.act=='wind'&&E.fk){E.fk=0;E.act='idle';E.at=.4;S.msg='假動作！';S.mt=.5}
    else if(E.act=='wind'){E.act='strike';E.at=.2;const P=S.P,dmg=E.ph=='big'?30:15;
     if(P.act=='d'){S.gap=.7;S.msg='閃過了！快反擊！';S.mt=.8}
     else if(P.act=='g'){const d2=dmg*.25;P.hp-=d2;P.en=Math.max(0,P.en-(E.ph=='big'?25:10));S.pts[1]+=d2;S.msg='擋住了';S.mt=.4;if(E.ph=='big'&&P.en<=0){P.act='';P.stun=.8;S.msg='護頭被打開了！'}}
     else{P.hp-=dmg;S.pts[1]+=dmg;S.shake=.25;P.act='';P.stun=E.ph=='big'?.6:.25;S.msg=E.ph=='big'?'被重拳打中！':'';S.mt=.5}
     if(P.hp<=0){P.hp=0;setTimeout(()=>fin(false),500)}}
    else{E.act='idle';E.at=(.5+Math.random()*.9)*S.slow}}
   if(S.rt<=0){if(S.rd>=3){fin(S.pts[0]+S.P.hp*.3>S.pts[1]+S.E.hp*.3*.6)}else{S.rd++;S.rt=45;S.pause=2;S.P.en=100;S.P.hp=Math.min(S.P.mx,S.P.hp+12);S.E.hp=Math.min(S.E.mx,S.E.hp+8);S.msg='第 '+S.rd+' 回合！';S.mt=1.8;S.E.act='idle';S.E.at=1.2}}}
  // 繪圖
  const sx=S.shake>0?(Math.random()-.5)*14:0;g.save();g.translate(sx,0);
  g.fillStyle='#1a1428';g.fillRect(-20,0,W2+40,H2);g.fillStyle='#3a2a50';g.fillRect(-20,330,W2+40,H2-330);for(let i=0;i<3;i++){g.fillStyle=['#e04030','#fff','#2f6ad0'][i];g.fillRect(-20,250+i*24,W2+40,5)}
  // 對手
  const E=S.E,ex=W2/2+(E.act=='strike'?0:Math.sin(performance.now()/300)*18),ey=200+(E.act=='strike'?30:0),sc=E.act=='strike'?1.15:1;
  g.fillStyle=E.hit>0?'#fff':'#b8432f';g.fillRect(ex-55*sc,ey,110*sc,140);g.fillStyle=E.hit>0?'#fff':'#d79a72';g.beginPath();g.arc(ex,ey-28,40*sc,0,7);g.fill();
  g.fillStyle='#222';g.fillRect(ex-55*sc,ey+100,110*sc,40);
  const gl=(x,y,r)=>{g.fillStyle='#c81e1e';g.beginPath();g.arc(x,y,r,0,7);g.fill()};
  if(E.act=='guard'){gl(ex-22,ey-26,24);gl(ex+22,ey-26,24)}else if(E.act=='wind'){gl(ex-70,ey-10,24);gl(ex+50,ey+20,24);mgTxt(g,'❗',ex,ey-80,'bold 48px sans-serif','#ffd84a')}
  else if(E.act=='strike'){gl(ex,ey+90,46)}else{gl(ex-60,ey+10,24);gl(ex+60,ey+10,24)}
  mgTxt(g,op,ex,ey-80-(E.act=='wind'?40:0),'bold 16px sans-serif','#fff');
  // 玩家拳套（第一人稱）
  const P=S.P,ly=P.act=='j'?300:P.act=='k'?280:P.act=='g'?320:420,rx=P.act=='k'?W2/2+60:W2/2+150,dx=P.act=='d'?-160:0;
  g.globalAlpha=P.stun>0?.5:1;gl(W2/2-150+dx+(P.act=='j'?100:0),P.act=='g'?330:P.act=='j'?260:440,P.act=='j'?52:44);gl(rx+dx,P.act=='k'?250:P.act=='g'?330:440,P.act=='k'?56:44);g.globalAlpha=1;
  g.restore();
  // HUD
  const bar=(x,v,mx,c,lb,al)=>{g.fillStyle='#000';g.fillRect(x,16,280,20);g.fillStyle=c;const w=276*Math.max(0,v)/mx;g.fillRect(al?x+2+276-w:x+2,18,w,16);mgTxt(g,lb,al?x+280:x,54,'bold 15px sans-serif','#fff',al?'right':'left')};
  bar(20,P.hp,P.mx,'#4ad06a','你 ❤️'+Math.ceil(P.hp));bar(W2-300,E.hp,E.mx,'#ff5a4a',op,1);
  g.fillStyle='#000';g.fillRect(20,62,160,10);g.fillStyle='#ffd84a';g.fillRect(21,63,158*P.en/100,8);mgTxt(g,'體力',190,72,'12px sans-serif','#ffd84a','left');
  mgTxt(g,`第 ${S.rd} 回合　${Math.max(0,Math.ceil(S.rt))}`,W2/2,32,'bold 22px sans-serif','#fff');
  if(S.gap>0)mgTxt(g,'⚡ 反擊時機！',W2/2,120,'bold 30px sans-serif','#7dff9a');
  if(S.mt>0&&S.msg)mgTxt(g,S.msg,W2/2,H2-30,'bold 26px sans-serif','#fff');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
{const _bf=boxFight;boxFight=function(){const p=Math.round(boxP()*100),c=boxCond();
 openDlg('🥊 拳擊月賽','走進場館，觀眾的呼喊聲震耳欲聾。<br>備賽狀態：<b>'+c+'%</b>（狀態越好，血量越多、對手越慢）<br><br>要親自上場打，還是交給直覺？',[['🥊 親自上場（即時對打）','J 刺拳・K 勾拳・S 護頭・A/D 閃躲（手機有按鈕）',boxRT],['📜 讓比賽自己進行','依備賽狀態自動判定（勝率約 '+p+'%）',()=>{closeDlg();_bf()}]])}}
