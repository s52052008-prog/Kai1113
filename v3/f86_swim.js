/* v12.9 運動中心 B1 游泳池：自由式／蛙式小遊戲（A/D 划手、空白鍵踢腿、W 換氣） */
const SWIM_ST={free:{n:'自由式',ic:'🏊',tip:'A、D 左右手輪流划水（同一邊連按會亂掉）・連按空白鍵踢腿・每划幾下要按 W 抬頭換氣'},
 breast:{n:'蛙式',ic:'🐸',tip:'A＋D 一起按＝雙手划水，接著按空白鍵蹬腿（划→蹬→滑行）・划手時順便按 W 換氣最省力'}};
function swimRace(){const M=mgBox('🏊 運動中心游泳池'),g=M.g,W2=720,H2=520;const SW=st.swim||(st.swim={best:0,n:0});SW.pb=SW.pb||{};
 g.fillStyle='#1f6fa8';g.fillRect(0,0,W2,H2);mgTxt(g,'今天要游哪一種？',W2/2,150,'bold 34px sans-serif','#fff');
 mgTxt(g,'🏊 自由式：A／D 交替划手・空白鍵踢腿・W 換氣',W2/2,220,'19px sans-serif','#e8f6ff');mgTxt(g,'🐸 蛙式：A＋D 一起划・接著空白鍵蹬腿・W 換氣',W2/2,256,'19px sans-serif','#e8f6ff');
 const pb=k=>SW.pb[k]?`（最佳 ${SW.pb[k]} 秒）`:'';mgTxt(g,`自由式 25m${pb('free25')}　50m${pb('free50')}`,W2/2,320,'16px sans-serif','#cfe8ff');mgTxt(g,`蛙式 25m${pb('breast25')}　50m${pb('breast50')}`,W2/2,348,'16px sans-serif','#cfe8ff');
 M.tip.textContent='選好泳式和距離就下水！';
 mgButtons(M,[['🏊 自由式 25m',()=>swimGo(M,'free',25)],['🏊 自由式 50m',()=>swimGo(M,'free',50)],['🐸 蛙式 25m',()=>swimGo(M,'breast',25)],['🐸 蛙式 50m',()=>swimGo(M,'breast',50)],['上岸',()=>M.end()]])}
function swimGo(M,sty,L){const g=M.g,W2=720,H2=520,F=sty=='free',SW=st.swim;
 const S={t:-3,x:0,v:0,last:'',str:0,air:100,br:0,brk:0,kick:100,ph:0,arm:0,armS:'',leg:0,pull:0,glide:0,done:false,msg:'',mt:0,cho:0,combo:0,lastT:-9,wall:0,turns:0,bub:[]};
 const base=F?1:.78,RV=[{n:'晨泳阿伯',v:(F?1.05:.85)+Math.random()*.08},{n:'游泳隊學生',v:(F?1.42:1.12)+Math.random()*.1},{n:'健身房教練',v:(F?1.25:1)+Math.random()*.08}];
 if(FRS('yuhao').met&&Math.random()<.5)RV[0]={n:'禹豪',v:(F?1.22:.95)+Math.random()*.1};if(FRS('zheliang')&&FRS('zheliang').met&&Math.random()<.4)RV[2]={n:'小朱',v:(F?1.3:1.02)+Math.random()*.1};
 RV.forEach(r=>{r.x=0;r.ft=0;r.ph=Math.random()*6});
 const say=(m,t)=>{S.msg=m;S.mt=t||.6};let dA=-9,dD=-9;
 const air=n=>{S.air=Math.max(0,S.air-n)};
 const stroke=k=>{if(S.done||S.t<0||S.cho>0)return;if(S.br>0){say('換氣中…',.25);return}
  if(F){if(k==S.last){S.v=Math.max(0,S.v-.3);S.combo=0;say('💦 手划亂了！',.5);S.bub.push(...Array.from({length:6},()=>({x:0,y:0,vx:(Math.random()-.5)*60,vy:-40-Math.random()*60,t:0})));return}
   const gap=S.t-S.lastT,good=gap>.28&&gap<.62;S.lastT=S.t;S.last=k;S.str++;S.armS=k;S.arm=1;S.combo=good?S.combo+1:0;
   S.v=Math.min(2.6,S.v+(good?.5:.36)*(S.air>25?1:.5)+(S.combo>=4?.06:0));air(9);if(good&&S.combo>=4&&S.combo%4==0)say('✨ 節奏很順！',.5)}
  else{if(k=='L')dA=S.t;else dD=S.t;if(Math.abs(dA-dD)<.2&&S.pull<=0){S.pull=.45;S.str++;S.arm=1;const bonus=S.glide>0&&S.glide<.45?1:0;S.v=Math.min(2.2,S.v+.42*(S.air>25?1:.5)+bonus*.08);S.need=1;air(8);dA=dD=-9;if(bonus)say('✨ 時機剛好！',.4)}}};
 const kick=()=>{if(S.done||S.t<0||S.cho>0)return;
  if(F){if(S.kick<6){say('🦵 腿沒力了',.4);return}S.kick-=6;S.leg=1;S.v=Math.min(2.6,S.v+.08)}
  else{if(!S.need){S.v=Math.max(0,S.v-.08);say('先划手再蹬腿！',.4);return}S.need=0;S.leg=1;const good=S.pull>0;S.v=Math.min(2.2,S.v+(good?.62:.3));S.glide=.9;if(good)say('🐸 漂亮的蹬腿！',.35)}};
 const breath=()=>{if(S.done||S.t<0||S.br>0||S.cho>0)return;const tm=F?Math.abs(S.arm-.6)<.4:S.pull>0;S.br=F?(tm?.25:.42):(tm?.15:.4);S.air=100;S.v*=tm?.96:.82;say(tm?'🫁 順暢換氣':'🫁 換氣（有點慢）',.4)};
 const kd=e=>{const k=e.key.toLowerCase(),c=e.code;if(e.repeat&&k!=' ')return;
  if(k=='a'||k=='arrowleft'||c=='KeyA'){e.preventDefault();stroke('L')}else if(k=='d'||k=='arrowright'||c=='KeyD'){e.preventDefault();stroke('R')}
  else if(k==' '||c=='Space'){e.preventDefault();kick()}else if(k=='w'||k=='arrowup'||c=='KeyW'){e.preventDefault();breath()}else if(k=='escape')fin(true)};OVK.add(kd);
 mgBtn(M,F?[['⬅ 左手 A',()=>stroke('L')],['🫁 換氣 W',breath],['🦵 踢腿',kick],['右手 D ➡',()=>stroke('R')]]:[['🙌 雙手划水',()=>{stroke('L');stroke('R')}],['🫁 換氣 W',breath],['🐸 蹬腿',kick]]);
 M.tip.textContent=SWIM_ST[sty].tip;
 const fin=quit=>{if(S.done)return;S.done=true;OVK.delete(kd);const tm=S.t,key=sty+L;SW.n++;const rank=1+RV.filter(r=>r.ft&&r.ft<tm).length,pb=!quit&&(!SW.pb[key]||tm<SW.pb[key]);if(pb)SW.pb[key]=+tm.toFixed(2);if(sty=='free'&&L==50&&!quit&&(!SW.best||tm<SW.best))SW.best=+tm.toFixed(2);
  st.skill=st.skill||{};st.skill.swim=Math.min(100,(st.skill.swim||0)+(quit?0:2+(rank==1?2:0)));
  fxApply({s:-15,h:8+(L==50?3:0),j:quit?2:6+(rank==1?6:0),p:1});advance(1);hud();SVDIRTY=1;
  g.fillStyle='rgba(230,246,255,.96)';g.fillRect(0,0,W2,H2);
  if(quit)mgTxt(g,'中途上岸了',W2/2,220,'bold 34px sans-serif','#123');else{
   mgTxt(g,`${SWIM_ST[sty].ic} ${SWIM_ST[sty].n} ${L} 公尺`,W2/2,120,'bold 26px sans-serif','#1f6fb8');mgTxt(g,`⏱️ ${tm.toFixed(2)} 秒`,W2/2,190,'bold 46px sans-serif','#123');
   mgTxt(g,`第 ${rank} 名`+(pb?'　🎉 個人最佳！':`　（最佳 ${SW.pb[key]} 秒）`),W2/2,245,'26px sans-serif','#123');
   mgTxt(g,`划手 ${S.str} 次・換氣 ${S.brk} 次${S.choked?'・嗆水 '+S.choked+' 次':''}`,W2/2,285,'18px sans-serif','#345');
   mgTxt(g,rank==1?'救生員吹了聲口哨：「你是游泳隊的嗎？」':S.choked?'咳咳……下次記得換氣。':'游得很順！肩膀有點痠。',W2/2,325,'20px sans-serif','#345');
   mgTxt(g,`🏊 游泳技能 ${st.skill.swim}/100`,W2/2,365,'16px sans-serif','#567')}
  mgButtons(M,[['再游一次（💰110）',()=>{if(st.money<110||st.sta<15)return toast('錢或體力不夠了');st.money-=110;hud();M.end();swimRace()}],['上岸',()=>M.end()]])};
 let last=performance.now();const PX=W2-120;
 const swimmer=(x,y,me,sty2,ph,arm,armS,leg,br,cap)=>{g.save();g.translate(x,y);const F2=sty2=='free';
  // 腿
  g.strokeStyle='#e8b088';g.lineWidth=7;g.lineCap='round';if(F2){const k=Math.sin(ph*14)*(leg>0?10:5);g.beginPath();g.moveTo(-26,2);g.lineTo(-52,2+k);g.stroke();g.beginPath();g.moveTo(-26,6);g.lineTo(-52,6-k);g.stroke()}
  else{const s=leg>0?Math.sin(leg*Math.PI):.2;g.beginPath();g.moveTo(-26,2);g.lineTo(-40,-8-12*s);g.lineTo(-56,-2-6*s);g.stroke();g.beginPath();g.moveTo(-26,6);g.lineTo(-40,16+12*s);g.lineTo(-56,10+6*s);g.stroke()}
  // 身體＋泳衣
  g.fillStyle='#f0c09a';g.beginPath();g.ellipse(-4,3,26,9,0,0,7);g.fill();g.fillStyle=me?'#1f3a8a':'#333';g.fillRect(-28,-3,14,12);
  // 手
  g.strokeStyle='#f0c09a';g.lineWidth=7;if(F2){const a1=arm>0?(armS=='L'?(1-arm)*6.28:0):0,a2=arm>0?(armS=='R'?(1-arm)*6.28:0):0;[[a1,-1],[a2,1]].forEach(([a,s],i)=>{const an=a?Math.PI-a:(i?.2:-.15)+Math.sin(ph*3+i)*.1;g.beginPath();g.moveTo(14,1);g.lineTo(14+Math.cos(an)*-24*(a?1:-1),1+Math.sin(an)*24*(a?1:.4));g.stroke()})}
  else{const p=arm>0?arm:0,sw=Math.sin(p*Math.PI);g.beginPath();g.moveTo(14,0);g.lineTo(38-sw*18,-6-sw*14);g.stroke();g.beginPath();g.moveTo(14,6);g.lineTo(38-sw*18,12+sw*14);g.stroke()}
  // 頭（泳帽、蛙鏡）
  const hy=br>0?-8:0;g.fillStyle='#f0c09a';g.beginPath();g.arc(24,hy,9,0,7);g.fill();g.fillStyle=cap;g.beginPath();g.arc(24,hy-2,9.5,Math.PI*.95,Math.PI*2.05);g.fill();g.fillStyle='#2a2a3a';g.fillRect(27,hy-2,6,3);g.fillStyle='#9ae8ff';g.fillRect(28,hy-1.5,4,2);
  if(br>0){g.fillStyle='#c0303a';g.beginPath();g.arc(31,hy+4,2.5,0,7);g.fill()}g.restore()};
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;S.ph+=dt;
  if(S.t>0){if(S.br>0){S.br-=dt;if(S.br<=0)S.brk++}S.arm=Math.max(0,S.arm-dt*(F?2.6:2.2));S.leg=Math.max(0,S.leg-dt*(F?4:2.5));S.pull=Math.max(0,S.pull-dt);S.glide=Math.max(0,S.glide-dt);
   if(F)S.kick=Math.min(100,S.kick+dt*14);S.air=Math.max(0,S.air-dt*(F?6:5));
   if(S.cho>0){S.cho-=dt;S.v*=.9}else if(S.air<=0){S.cho=1.3;S.air=55;S.v=0;S.choked=(S.choked||0)+1;say('😵 嗆水了！咳咳咳……',1.2)}
   S.v=Math.max(0,S.v-dt*(F?.85:S.glide>0?.35:1.15));const dir=S.turns%2?-1:1;S.x+=S.v*dt*base*1.0;
   if(L==50&&!S.wall&&S.x>=25){S.wall=1;S.turns=1;say('↩ 轉身蹬牆！',.6);S.v+=.4}
   if(S.x>=L){S.x=L;return fin(false)}
   RV.forEach(r=>{if(r.ft)return;r.ph+=dt;r.x+=r.v*dt*(.9+Math.sin(S.t*2.4+r.ph)*.12);if(r.x>=L){r.x=L;r.ft=S.t}});
   if(S.air<30&&S.mt<=0&&!S.cho)say('⚠️ 快沒氣了，按 W 換氣！',.6)}
  // ── 畫面：上方小地圖（四個水道），下方是你的水下側面視角 ──
  g.fillStyle='#e8f4fb';g.fillRect(0,0,W2,H2);
  const mx=30,mw=W2-170,my=40,lh=17,lanes=[[RV[0],0],[{n:'你',x:S.x,me:1},1],[RV[1],2],[RV[2],3]];g.fillStyle='#2b8fd0';g.fillRect(mx,my,mw,lh*4);
  for(let i=1;i<4;i++){for(let x=mx;x<mx+mw;x+=14){g.fillStyle=((x-mx)/14)%2?'#d23':'#fff';g.fillRect(x,my+i*lh-1.5,7,3)}}
  if(L==50){g.fillStyle='rgba(255,255,255,.35)';g.fillRect(mx+mw/2-1,my,2,lh*4);mgTxt(g,'25m 轉身',mx+mw/2,my-4,'11px sans-serif','#1f6fb8')}
  lanes.forEach(([r,i])=>{const p=r.x/L,px=L==50?(p<=.5?mx+p*2*mw:mx+(1-(p-.5)*2)*mw):mx+p*mw,py=my+i*lh+lh/2;g.fillStyle=r.me?'#ffd84a':'#fff';g.beginPath();g.arc(px,py,7,0,7);g.fill();g.fillStyle=r.me?'#c03030':'#555';g.beginPath();g.arc(px,py-2,7,Math.PI,0);g.fill();
   g.font='bold 11px sans-serif';g.textAlign='left';g.fillStyle=r.me?'#c03030':'#123';g.fillText(r.n+(r.ft?' '+r.ft.toFixed(1)+'s':''),mx+mw+8,py+4)});
  mgTxt(g,`${SWIM_ST[sty].ic} ${SWIM_ST[sty].n} ${L}m　⏱️ ${Math.max(0,S.t).toFixed(1)}s　${S.x.toFixed(1)} / ${L} m`,20,26,'bold 18px sans-serif','#123','left');
  // 水下側面
  const top=158,wy=top+70;g.fillStyle='#bfe6f6';g.fillRect(0,top,W2,70);const gr=g.createLinearGradient(0,wy,0,H2-50);gr.addColorStop(0,'#2b9fd8');gr.addColorStop(1,'#145a8a');g.fillStyle=gr;g.fillRect(0,wy,W2,H2-50-wy);
  const cam=(S.x%25)*40;for(let i=-1;i<20;i++){const x=i*80-(cam%80);g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x,H2-80,78,28);g.fillStyle='#1a3a6a';g.fillRect(x+38,H2-74,4,16)}
  g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=3;g.beginPath();for(let x=0;x<=W2;x+=12)g.lineTo(x,wy+Math.sin(x*.05+S.ph*3)*3);g.stroke();
  for(let i=0;i<14;i++){const x=(i*97-cam*.6)%W2;g.fillStyle='rgba(255,255,255,.1)';g.fillRect((x+W2)%W2,wy+20+((i*37)%180),40,2)}
  const dist=Math.floor(S.x);for(let m=Math.max(0,dist-6);m<=dist+12;m++){const x=W2*.42+(m-S.x)*40;if(x<-20||x>W2+20)continue;if(m%5==0){g.fillStyle='#fff';g.font='bold 14px sans-serif';g.textAlign='center';g.fillText(m+'m',x,H2-60);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(x-1,wy,2,H2-50-wy)}}
  const end=W2*.42+(L-S.x)*40;if(end<W2+20){g.fillStyle='#e8f4fb';g.fillRect(end,top,W2,H2-50-top);g.fillStyle='#d23';g.fillRect(end-4,wy-8,8,H2-50-wy+8)}
  if(L==50&&!S.wall){const w2=W2*.42+(25-S.x)*40;if(w2<W2+20){g.fillStyle='#e8f4fb';g.fillRect(w2,wy-4,10,H2-50-wy+4)}}
  // 隔壁水道（淡淡的）
  RV.forEach((r,i)=>{const x=W2*.42+(r.x-S.x)*40;if(x>-80&&x<W2+80){g.globalAlpha=.35;swimmer(x,wy+70+i*44,0,sty,S.ph+r.ph,(Math.sin(S.ph*4+r.ph)+1)/2,Math.sin(S.ph*2+r.ph)>0?'L':'R',.5,0,'#333');g.globalAlpha=1}});
  swimmer(W2*.42,wy+12,1,sty,S.ph,S.arm,S.armS,S.leg,S.br,'#c03030');
  S.bub.forEach(b=>{b.t+=dt;b.x+=b.vx*dt;b.y+=b.vy*dt});S.bub=S.bub.filter(b=>b.t<.8);if(S.v>.3&&Math.random()<S.v*.4)S.bub.push({x:-50,y:0,vx:-60-Math.random()*60,vy:-20-Math.random()*30,t:0});
  S.bub.forEach(b=>{g.strokeStyle=`rgba(255,255,255,${.8-b.t})`;g.lineWidth=1.5;g.beginPath();g.arc(W2*.42+b.x,wy+12+b.y,3,0,7);g.stroke()});
  // 儀表：氧氣、速度、腿力／節奏
  const bar=(x,y,w,v,c,lab)=>{g.fillStyle='#123';g.fillRect(x,y,w,16);g.fillStyle=c;g.fillRect(x+2,y+2,(w-4)*Math.max(0,Math.min(1,v)),12);mgTxt(g,lab,x,y-4,'bold 13px sans-serif','#123','left')};
  bar(20,top-30,200,S.air/100,S.air>40?'#5ad1ff':S.air>20?'#ffb84a':'#ff4a4a','🫁 氧氣（W 換氣）');bar(250,top-30,200,S.v/2.6,'#7dff9a','💨 速度');
  if(F)bar(480,top-30,200,S.kick/100,'#ffd84a','🦵 腿力（空白鍵踢腿）');else{g.fillStyle='#123';g.fillRect(480,top-30,200,16);mgTxt(g,'🐸 划 → 蹬 → 滑行',480,top-34,'bold 13px sans-serif','#123','left');mgTxt(g,S.need?'👉 現在按空白鍵蹬腿！':S.glide>0?'滑行中…快再划手':'A＋D 一起划手',580,top-18,'bold 12px sans-serif',S.need?'#ffd84a':'#fff')}
  if(F&&S.t>0){const gap=S.t-S.lastT,k=Math.min(1,gap/.62);g.strokeStyle='#123';g.lineWidth=6;g.beginPath();g.arc(W2-50,top+35,18,0,7);g.stroke();g.strokeStyle=gap>.28&&gap<.62?'#7dff9a':'#ffb84a';g.lineWidth=4;g.beginPath();g.arc(W2-50,top+35,18,-1.57,-1.57+6.283*k);g.stroke();mgTxt(g,'節奏',W2-50,top+68,'11px sans-serif','#123')}
  if(S.t<0){g.fillStyle='rgba(0,0,0,.25)';g.fillRect(0,top,W2,H2-top);mgTxt(g,String(Math.ceil(-S.t)),W2/2,top+200,'bold 90px sans-serif','#fff');mgTxt(g,'各就位……',W2/2,top+100,'bold 26px sans-serif','#fff')}else if(S.t<.6)mgTxt(g,'嗶！',W2/2,top+200,'bold 80px sans-serif','#ffd84a');
  if(S.mt>0)mgTxt(g,S.msg,W2/2,H2-18,'bold 22px sans-serif','#c23');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
