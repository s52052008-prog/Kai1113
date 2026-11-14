/* v12.9 Nerf 軟彈槍：🎯 靶場練習＋⚔️ 2 對 2 對戰（公園、教會青年團契）。找以倫哥說要玩就會開始 */
const NERF_GUN={pistol:{n:'小旋風手槍',ic:'🔫',mag:6,rate:.32,rel:1.1,spd:760,spr:.03,pel:1,d:'入門款，6 發，換彈快',need:null},
 smg:{n:'連珠炮衝鋒槍',ic:'🌀',mag:18,rate:.11,rel:2,spd:720,spr:.1,pel:1,d:'18 發連射，比較不準',need:['g',300,'靶場拿到 300 分']},
 shotgun:{n:'霰彈榴槤',ic:'🍈',mag:4,rate:.7,rel:1.6,spd:640,spr:.22,pel:5,d:'一次噴 5 發，近距離超強',need:['g',500,'靶場拿到 500 分']},
 sniper:{n:'鷹眼長槍',ic:'🎯',mag:4,rate:.85,rel:1.7,spd:1150,spr:0,pel:1,d:'超快超準，每發算 2 下',need:['w',3,'對戰贏 3 場']}};
const NERF_MEN=[['yilun','以倫哥','#4a8ad0'],['zhuyang','主揚哥','#d0a03a'],['zheliang','小朱','#ff8a2a'],['yuhao','禹豪','#3a9a5a'],['bokai','柏凱','#7a4ac0']];
const nfMet=id=>{try{return id=='bokai'?!!(st.bk&&st.bk.met)||FRS('bokai').met:FRS(id).met}catch(e){return false}};
const nfS=()=>st.nerf||(st.nerf={u:0,best:0,wins:0,games:0,gun:'pistol'});
const nfHas=k=>{const N=nfS(),q=NERF_GUN[k].need;return !q||(q[0]=='g'?N.best>=q[1]:N.wins>=q[1])};
// 以倫哥：找他說要玩 Nerf
FR.yilun.acts.push({k:'nerf',t:'🔫 找學長玩 Nerf',d:'教會青年團契的軟彈槍大戰（靶場／2 對 2）',custom:'nerf'});
function nerfMenu(loc){const N=nfS();const where=loc=='park'?'🌳 公園':loc=='court'?'🏟️ 教會多功能球場':'⛪ 教會青年團契';
 if(!N.u){N.u=1;SVDIRTY=1;return openDlg('🔫 Nerf 大戰！','以倫哥眼睛一亮，從辦公室櫃子裡拖出一大箱軟彈槍：<br>「老哥！你終於問了！這是我們青年團契的祕密武器！」<br>「主揚、小朱、禹豪、柏凱都超愛玩，教會的男生都可以來！我們就在<b>教會旁邊的多功能球場</b>打。」<br>「先去靶場練練手感，再來 2 對 2！輸的人要請飲料喔～」<br><br><span style="font-size:12px">🔓 解鎖 Nerf：教會找以倫哥，或走到教會旁邊的「多功能球場」按空白鍵都能玩。</span>',[['好，來！','',()=>nerfMenu(loc)]])}
 const G=NERF_GUN[N.gun];openDlg('🔫 Nerf・'+where,`目前用：<b>${G.ic} ${G.n}</b>（${G.d}）<br>🎯 靶場最高分 <b>${N.best}</b>　⚔️ 對戰 ${N.wins} 勝／${N.games} 場`,
  [['🎯 靶場練習','45 秒打靶・⚡-5',()=>{if(st.sta<5)return toast('體力不夠了');closeDlg();nerfRange(loc)}],['⚔️ 2 對 2 對戰','選一位隊友・⚡-12・好感++',()=>{if(st.sta<12)return toast('體力不夠了');nerfPick(loc)}],['🔫 換軟彈槍','',()=>nerfGuns(loc)],['離開','',closeDlg]])}
function nerfGuns(loc){const N=nfS();openDlg('🔫 我的軟彈槍','打靶、打贏對戰就能解鎖新槍。',Object.entries(NERF_GUN).map(([k,G])=>{const ok=nfHas(k);return[`${N.gun==k?'✅ ':''}${G.ic} ${G.n}`,ok?G.d+`・彈匣 ${G.mag}`:'🔒 '+G.need[2],()=>{N.gun=k;SVDIRTY=1;nerfGuns(loc)},!ok]}).concat([['返回','',()=>nerfMenu(loc)]]))}
function nerfPick(loc){const L=NERF_MEN.filter(q=>nfMet(q[0])||q[0]=='yilun');if(L.length<3){NERF_MEN.slice(0,3).forEach(q=>{if(!L.includes(q))L.push(q)})}openDlg('⚔️ 選一位隊友','對手會從其他人裡面隨機找兩位。<br><span style="font-size:12px">在小鎮認識越多教會弟兄，能一起玩的人就越多。</span>',L.map(([id,n])=>[`🤝 跟${n}一隊`,'',()=>{closeDlg();const rest=L.filter(q=>q[0]!=id).sort(()=>Math.random()-.5).slice(0,2);nerfBattle(loc,id,rest)}]).concat([['返回','',()=>nerfMenu(loc)]]))}
// 背景
function nfBg(g,W,H,loc,top){if(loc=='court'){g.fillStyle='#3a8a7a';g.fillRect(0,0,W,H);g.fillStyle='#4a9a8a';g.fillRect(20,top?60:20,W-40,H-(top?80:40));g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=3;g.strokeRect(20,top?60:20,W-40,H-(top?80:40));g.beginPath();g.moveTo(W/2,top?60:20);g.lineTo(W/2,H-20);g.stroke();g.beginPath();g.arc(W/2,H/2+(top?20:0),50,0,7);g.stroke();if(top){g.fillStyle='#2a6a5a';g.fillRect(0,0,W,60);g.fillStyle='#fff';g.font='bold 16px sans-serif';g.textAlign='center';g.fillText('🏟️ 教會多功能球場',W/2,38)}return}if(loc=='park'){g.fillStyle='#7ac857';g.fillRect(0,0,W,H);for(let i=0;i<60;i++){g.fillStyle=i%2?'#6ab648':'#8ad468';g.fillRect((i*137)%W,(i*71)%H,14,6)}}
 else{g.fillStyle='#d8c8a8';g.fillRect(0,0,W,H);for(let x=0;x<W;x+=40){g.fillStyle=(x/40)%2?'#ccbb98':'#d8c8a8';g.fillRect(x,0,40,H)}g.fillStyle='#8a5a3a';g.fillRect(0,0,W,top?60:14);if(top){g.fillStyle='#fff';g.font='bold 16px sans-serif';g.textAlign='center';g.fillText('✝ 青年團契 Nerf 之夜 ✝',W/2,38)}}}
// 🎯 靶場
function nerfRange(loc){const M=mgBox('🎯 Nerf 靶場'),g=M.g,W=720,H=520,N=nfS(),GN=NERF_GUN[N.gun];
 const S={t:-3,end:45,sc:0,combo:0,mag:GN.mag,rel:0,cd:0,tg:[],dart:[],spawn:0,mx:W/2,my:H/2,hits:0,shots:0,msg:'',mt:0,done:false,pop:[]};
 const cv=g.canvas,toC=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]};
 const fire=()=>{if(S.done||S.t<0||S.rel>0||S.cd>0)return;if(S.mag<=0){S.msg='沒子彈了！按 R 換彈';S.mt=.6;return}S.mag--;S.cd=GN.rate;S.shots++;
  for(let i=0;i<GN.pel;i++){const a=(Math.random()-.5)*GN.spr*2,tx=S.mx+Math.cos(a+1.57)*0+(Math.random()-.5)*GN.spr*500,ty=S.my+(Math.random()-.5)*GN.spr*400,d=Math.hypot(tx-W/2,ty-(H+40));S.dart.push({x0:W/2,y0:H+20,x:tx,y:ty,t:0,dur:d/GN.spd})}
  if(S.mag<=0)setTimeout(()=>{if(!S.done&&S.mag<=0&&S.rel<=0)reload()},250)};
 const reload=()=>{if(S.done||S.rel>0||S.mag==GN.mag)return;S.rel=GN.rel};
 const mm=e=>{[S.mx,S.my]=toC(e)};cv.addEventListener('pointermove',mm);cv.addEventListener('pointerdown',e=>{mm(e);fire()});cv.style.cursor='none';
 const kd=e=>{const k=e.key.toLowerCase();if(k=='r'){e.preventDefault();reload()}else if(k==' '){e.preventDefault();fire()}else if(k=='escape')fin(true)};OVK.add(kd);
 mgBtn(M,[['🔄 換彈 R',reload]]);M.tip.textContent='滑鼠瞄準、點擊射擊・R 換彈・不要射到「🙅 不能射」的人形牌！';
 const spawn=()=>{const row=Math.floor(Math.random()*3),y=[170,270,380][row],sc=[.7,.85,1][row],r=Math.random(),k=r<.12?'gold':r<.25?'no':r<.45?'duck':'ring';
  S.tg.push({k,x:k=='duck'?(Math.random()<.5?-30:W+30):60+Math.random()*(W-120),y,sc,t:0,life:k=='gold'?1.1:1.8+Math.random()*.8,vx:k=='duck'?(Math.random()<.5?1:-1)*(110+Math.random()*80):0,up:0,hit:0})};
 const fin=quit=>{if(S.done)return;S.done=true;OVK.delete(kd);const pb=!quit&&S.sc>N.best;if(pb)N.best=S.sc;SVDIRTY=1;fxApply({s:-5,j:quit?1:4+Math.min(6,S.sc/120)});advance(.5);hud();
  const unl=Object.entries(NERF_GUN).filter(([k,G])=>G.need&&G.need[0]=='g'&&N.best>=G.need[1]&&!(N.got||{})[k]);N.got=N.got||{};unl.forEach(([k])=>N.got[k]=1);
  g.fillStyle='rgba(255,250,235,.96)';g.fillRect(0,0,W,H);mgTxt(g,quit?'中途離開':`🎯 ${S.sc} 分`,W/2,170,'bold 48px sans-serif','#3a2a10');
  if(!quit){mgTxt(g,`命中率 ${S.shots?Math.round(S.hits/S.shots*100):0}%`+(pb?'　🎉 新紀錄！':`　（最高 ${N.best}）`),W/2,230,'24px sans-serif','#3a2a10');
   mgTxt(g,S.sc>=500?'以倫哥：「老哥，你是不是偷偷練過？」':S.sc>=300?'主揚哥：「手感不錯喔！」':'小朱：「我第一次也打很爛啦，沒關係！」',W/2,280,'20px sans-serif','#5a4a2a');
   unl.forEach(([k,G],i)=>mgTxt(g,`🔓 解鎖新槍：${G.ic} ${G.n}！`,W/2,330+i*30,'bold 22px sans-serif','#c05a10'))}
  cv.style.cursor='';mgButtons(M,[['再打一次',()=>{M.end();nerfRange(loc)}],['回選單',()=>{M.end();nerfMenu(loc)}]])};
 let last=performance.now();
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;S.cd-=dt;if(S.rel>0){S.rel-=dt;if(S.rel<=0)S.mag=GN.mag}
  if(S.t>0){if(S.t>=S.end)return fin(false);S.spawn-=dt;if(S.spawn<=0){S.spawn=.45+Math.random()*.5*(1-S.t/S.end);spawn()}
   S.tg.forEach(o=>{o.t+=dt;o.up=Math.min(1,o.t*6,(o.life-o.t)*6);o.x+=o.vx*dt});S.tg=S.tg.filter(o=>o.t<o.life&&o.x>-60&&o.x<W+60);
   S.dart.forEach(d=>{d.t+=dt;if(!d.done&&d.t>=d.dur){d.done=1;let hit=null;S.tg.slice().reverse().forEach(o=>{if(hit||o.hit||o.up<.5)return;const R=(o.k=='gold'?18:o.k=='no'?28:30)*o.sc;if(Math.hypot(d.x-o.x,d.y-(o.y-40*o.sc))<R)hit=o});
    if(hit){hit.hit=1;hit.life=Math.min(hit.life,hit.t+.25);if(hit.k=='no'){S.sc=Math.max(0,S.sc-30);S.combo=0;S.msg='🙅 打到不能射的！-30';S.mt=.8;S.pop.push({x:hit.x,y:hit.y-60,s:'-30',c:'#d23',t:0})}
     else{S.combo++;S.hits++;const bull=Math.hypot(d.x-hit.x,d.y-(hit.y-40*hit.sc))<9*hit.sc,v=(hit.k=='gold'?40:hit.k=='duck'?15:bull?20:10)*(1+Math.min(1,Math.floor(S.combo/5)*.25));S.sc+=Math.round(v);S.pop.push({x:hit.x,y:hit.y-60,s:'+'+Math.round(v)+(bull&&hit.k=='ring'?' 正中紅心！':''),c:hit.k=='gold'?'#ffb000':'#2a8a2a',t:0})}}
    else S.combo=0}});S.dart=S.dart.filter(d=>d.t<d.dur+.3)}
  S.pop.forEach(q=>q.t+=dt);S.pop=S.pop.filter(q=>q.t<.8);
  nfBg(g,W,H,loc,1);if(loc=='park'){g.fillStyle='#5a9a3a';[[60,120],[200,100],[520,110],[660,130]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,40,0,7);g.fill()})}
  [190,290,400].forEach((y,i)=>{g.fillStyle='#8a5a2a';g.fillRect(0,y-2,W,10);g.fillStyle='#6a4220';g.fillRect(0,y+8,W,4)});
  S.tg.slice().sort((a,b)=>a.y-b.y).forEach(o=>{g.save();g.translate(o.x,o.y);g.scale(o.sc,o.sc*o.up);g.translate(0,-40);
   if(o.k=='ring'){g.fillStyle='#5a3a1a';g.fillRect(-3,10,6,34);[30,22,14,7].forEach((r,i)=>{g.fillStyle=i%2?'#fff':'#d23';g.beginPath();g.arc(0,0,r,0,7);g.fill()})}
   else if(o.k=='duck'){g.fillStyle='#5a3a1a';g.fillRect(-3,10,6,34);g.fillStyle='#ffd84a';g.beginPath();g.ellipse(0,4,26,16,0,0,7);g.fill();g.beginPath();g.arc(16,-12,11,0,7);g.fill();g.fillStyle='#ff8a2a';g.beginPath();g.moveTo(26,-12);g.lineTo(38,-9);g.lineTo(26,-6);g.fill();g.fillStyle='#000';g.fillRect(18,-15,3,3)}
   else if(o.k=='gold'){g.fillStyle='#5a3a1a';g.fillRect(-2,10,4,34);g.fillStyle='#ffd84a';g.beginPath();for(let i=0;i<10;i++){const r=i%2?8:18,a=i*.628-1.57;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.fill();g.strokeStyle='#c08a00';g.lineWidth=2;g.stroke()}
   else{g.fillStyle='#5a3a1a';g.fillRect(-3,10,6,34);g.fillStyle='#e8d8b8';g.fillRect(-22,-34,44,58);g.fillStyle='#f0c09a';g.beginPath();g.arc(0,-14,11,0,7);g.fill();g.fillStyle='#4a8ad0';g.fillRect(-14,-2,28,22);g.font='bold 18px sans-serif';g.textAlign='center';g.fillText('🙅',0,-28);g.fillStyle='#d23';g.font='bold 9px sans-serif';g.fillText('不能射',0,32)}
   g.restore()});
  S.dart.forEach(d=>{if(d.done)return;const k=Math.min(1,d.t/d.dur),x=d.x0+(d.x-d.x0)*k,y=d.y0+(d.y-d.y0)*k-Math.sin(k*Math.PI)*20,a=Math.atan2(d.y-d.y0,d.x-d.x0);g.save();g.translate(x,y);g.rotate(a);g.scale(1.4-k*.6,1.4-k*.6);g.fillStyle='#ff8a2a';g.fillRect(-12,-3,16,6);g.fillStyle='#2a6ad0';g.beginPath();g.arc(5,0,4,0,7);g.fill();g.restore()});
  S.pop.forEach(q=>mgTxt(g,q.s,q.x,q.y-q.t*40,'bold 20px sans-serif',q.c));
  // 準星
  g.strokeStyle=S.rel>0?'#888':'#d23';g.lineWidth=2;g.beginPath();g.arc(S.mx,S.my,14,0,7);g.moveTo(S.mx-22,S.my);g.lineTo(S.mx-6,S.my);g.moveTo(S.mx+6,S.my);g.lineTo(S.mx+22,S.my);g.moveTo(S.mx,S.my-22);g.lineTo(S.mx,S.my-6);g.moveTo(S.mx,S.my+6);g.lineTo(S.mx,S.my+22);g.stroke();
  // HUD
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,H-46,W,46);mgTxt(g,`🎯 ${S.sc} 分${S.combo>=5?'　🔥 連擊 x'+S.combo:''}`,16,H-16,'bold 20px sans-serif','#fff','left');mgTxt(g,`⏱️ ${Math.max(0,S.end-Math.max(0,S.t)).toFixed(1)}`,W/2,H-16,'bold 20px sans-serif','#fff');
  for(let i=0;i<GN.mag;i++){g.fillStyle=i<S.mag?'#ff8a2a':'#444';g.fillRect(W-24-i*(GN.mag>8?9:16),H-34,GN.mag>8?6:12,22)}if(S.rel>0)mgTxt(g,'換彈中…',W-110,H-54,'bold 16px sans-serif','#ffd84a');
  if(S.t<0)mgTxt(g,String(Math.ceil(-S.t)),W/2,H/2,'bold 90px sans-serif','#fff');if(S.mt>0)mgTxt(g,S.msg,W/2,80,'bold 22px sans-serif','#d23');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ⚔️ 2 對 2 對戰（俯視）
function nerfBattle(loc,mate,opp){const M=mgBox('⚔️ Nerf 2 對 2・'+(loc=='park'?'公園':loc=='court'?'教會多功能球場':'教會青年團契')),g=M.g,W=720,H=520,N=nfS(),GN=NERF_GUN[N.gun];
 const top=50,AR={x:10,y:top,w:W-20,h:H-top-10};
 const cov=loc=='court'?[[120,110,16,16,'hoop'],[584,394,16,16,'hoop'],[300,150,26,90,'bench'],[394,290,26,90,'bench'],[200,330,34,34,'barrel'],[486,150,34,34,'barrel'],[70,250,40,30,'box'],[610,250,40,30,'box']]:loc=='park'?[[150,140,30,90,'tree'],[540,280,30,90,'tree'],[330,90,60,24,'bench'],[330,400,60,24,'bench'],[230,300,40,40,'bush'],[450,170,40,40,'bush'],[90,380,50,30,'slide'],[590,110,50,30,'slide']]
  :[[140,120,24,100,'pew'],[556,300,24,100,'pew'],[300,160,120,22,'pew'],[300,370,120,22,'pew'],[200,330,40,40,'box'],[480,150,40,40,'box'],[60,280,40,40,'box'],[620,180,40,40,'box']];
 const C=cov.map(c=>({x:c[0],y:c[1],w:c[2],h:c[3],k:c[4]}));
 const MATE=NERF_MEN.find(q=>q[0]==mate),OPP=opp||NERF_MEN.filter(q=>q[0]!=mate).slice(0,2);
 const mk=(n,team,x,y,col,ai,gun)=>({n,team,x,y,col,ai,hp:3,mag:NERF_GUN[gun].mag,gun,rel:0,cd:0,a:0,vx:0,vy:0,tx:x,ty:y,rt:0,out:0,flash:0,id:n});
 const U=[mk('你',0,80,250,'#c03030',0,N.gun),mk(MATE[1],0,80,330,MATE[2],1,'pistol'),mk(OPP[0][1],1,W-80,200,OPP[0][2],1,Math.random()<.5?'smg':'pistol'),mk(OPP[1][1],1,W-80,330,OPP[1][2],1,'pistol')],me=U[0];
 const S={t:-3,end:120,dart:[],box:[],boxT:8,done:false,msg:'',mt:0,mx:W/2,my:H/2,keys:{}};
 const blocked=(x,y,r)=>x<AR.x+r||x>AR.x+AR.w-r||y<AR.y+r||y>AR.y+AR.h-r||C.some(c=>x>c.x-r&&x<c.x+c.w+r&&y>c.y-r&&y<c.y+c.h+r);
 const segRect=(x0,y0,x1,y1,c)=>{for(let i=0;i<=12;i++){const x=x0+(x1-x0)*i/12,y=y0+(y1-y0)*i/12;if(x>c.x&&x<c.x+c.w&&y>c.y&&y<c.y+c.h)return true}return false};
 const los=(a,b)=>!C.some(c=>segRect(a.x,a.y,b.x,b.y,c));
 const shoot=(u,ang)=>{const G=NERF_GUN[u.gun];if(u.rel>0||u.cd>0||u.out)return;if(u.mag<=0){u.rel=G.rel;return}u.mag--;u.cd=G.rate;for(let i=0;i<G.pel;i++){const a=ang+(Math.random()-.5)*G.spr*2+(u.ai?(Math.random()-.5)*.18:0);S.dart.push({x:u.x+Math.cos(a)*14,y:u.y+Math.sin(a)*14,vx:Math.cos(a)*G.spd*.55,vy:Math.sin(a)*G.spd*.55,t:0,team:u.team,dmg:u.gun=='sniper'?2:1,own:u})}if(u.mag<=0)u.rel=G.rel};
 const cv=g.canvas,toC=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]};let down=0;
 cv.addEventListener('pointermove',e=>{[S.mx,S.my]=toC(e)});cv.addEventListener('pointerdown',e=>{[S.mx,S.my]=toC(e);down=1});addEventListener('pointerup',()=>down=0);cv.style.cursor='crosshair';
 const kd=e=>{const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(k)){e.preventDefault();S.keys[k]=1}else if(k=='r'){e.preventDefault();if(me.mag<NERF_GUN[me.gun].mag&&me.rel<=0)me.rel=NERF_GUN[me.gun].rel}else if(k=='escape')fin(-1)},ku=e=>{S.keys[e.key.toLowerCase()]=0};OVK.add(kd);OVKU.add(ku);
 mgBtn(M,[['🔄 換彈 R',()=>{if(me.rel<=0)me.rel=NERF_GUN[me.gun].rel}]]);M.tip.textContent='WASD 移動・滑鼠瞄準、按住左鍵射擊・R 換彈・躲在掩體後面！被打中 3 下就出局';
 const fin=res=>{if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);cv.style.cursor='';N.games++;const win=res==1;if(win)N.wins++;SVDIRTY=1;
  try{frAdd(mate,win?4:3);OPP.forEach(q=>frAdd(q[0],2))}catch(e){}fxApply({s:-12,j:win?14:7});advance(1);hud();
  const unl=Object.entries(NERF_GUN).filter(([k,G])=>G.need&&G.need[0]=='w'&&N.wins>=G.need[1]&&!(N.got||{})[k]);N.got=N.got||{};unl.forEach(([k])=>N.got[k]=1);
  g.fillStyle='rgba(255,250,235,.96)';g.fillRect(0,0,W,H);mgTxt(g,res==-1?'中途離開':win?'🏆 你們贏了！':res==0?'🤝 平手！':'😵 你們輸了……',W/2,170,'bold 44px sans-serif','#3a2a10');
  if(res!=-1){const L={yilun:win?'以倫哥：「哈利路亞！老哥這波帶飛！」':'以倫哥：「老哥，輸了要請飲料喔～」',zhuyang:win?'主揚哥：「完美的合奏。」':'主揚哥：「下一首，我們會更好。」',zheliang:win?'小朱：「贏了！我要做成迷因！」':'小朱：「欸這個槍有問題啦！」',yuhao:win?'禹豪：「兄弟，這波我射最多！」':'禹豪：「酸喔……下次我要換長槍。」',bokai:win?'柏凱：「防守贏球，這就是卡位！」':'柏凱：「欸～老哥你怎麼醬子，一直衝。」'};
   mgTxt(g,L[mate],W/2,230,'22px sans-serif','#5a4a2a');mgTxt(g,`💞 ${MATE[1]} 的好感上升了`,W/2,270,'18px sans-serif','#a04a6a');unl.forEach(([k,G],i)=>mgTxt(g,`🔓 解鎖新槍：${G.ic} ${G.n}！`,W/2,320+i*30,'bold 22px sans-serif','#c05a10'))}
  mgButtons(M,[['再來一場',()=>{M.end();nerfBattle(loc,mate,opp)}],['回選單',()=>{M.end();nerfMenu(loc)}]])};
 let last=performance.now();
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;
  if(S.t>0){if(S.t>=S.end){const a=U.filter(u=>u.team==0).reduce((s,u)=>s+u.hp,0),b=U.filter(u=>u.team==1).reduce((s,u)=>s+u.hp,0);return fin(a>b?1:a<b?2:0)}
   U.forEach(u=>{u.cd-=dt;u.flash-=dt;if(u.rel>0){u.rel-=dt;if(u.rel<=0)u.mag=NERF_GUN[u.gun].mag}if(u.out)return;
    if(!u.ai){const K=S.keys;let mx=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0),my=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0);const l=Math.hypot(mx,my)||1;const sp=170;const nx=u.x+mx/l*sp*dt,ny=u.y+my/l*sp*dt;if(!blocked(nx,u.y,12))u.x=nx;if(!blocked(u.x,ny,12))u.y=ny;u.a=Math.atan2(S.my-u.y,S.mx-u.x);if(down)shoot(u,u.a)}
    else{const foes=U.filter(o=>o.team!=u.team&&!o.out);if(!foes.length)return;let tg=foes.sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y))[0];u.rt-=dt;
     const see=los(u,tg);if(u.rt<=0||Math.hypot(u.tx-u.x,u.ty-u.y)<8){u.rt=1.2+Math.random()*1.5;const home=u.team==0?[40,W*.55]:[W*.45,W-40];
      if(u.rel>0||u.hp==1){const c=C[Math.floor(Math.random()*C.length)];u.tx=c.x+c.w/2+(tg.x<c.x?c.w/2+18:-c.w/2-18);u.ty=c.y+c.h/2}else{u.tx=home[0]+Math.random()*(home[1]-home[0]);u.ty=AR.y+30+Math.random()*(AR.h-60)}}
     const dx=u.tx-u.x,dy=u.ty-u.y,d=Math.hypot(dx,dy)||1,sp=135;const nx=u.x+dx/d*sp*dt,ny=u.y+dy/d*sp*dt;if(!blocked(nx,u.y,12))u.x=nx;else u.rt=0;if(!blocked(u.x,ny,12))u.y=ny;else u.rt=0;
     u.a=Math.atan2(tg.y-u.y,tg.x-u.x);if(see&&Math.hypot(tg.x-u.x,tg.y-u.y)<520&&Math.random()<dt*3.2)shoot(u,u.a+(tg.vx||0)*0)}});
   S.dart.forEach(q=>{q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.dead)return;if(blocked(q.x,q.y,0)){q.dead=1;q.st=1;return}
    U.forEach(u=>{if(q.dead||u.out||u.team==q.team)return;if(Math.hypot(u.x-q.x,u.y-q.y)<14){q.dead=1;u.hp-=q.dmg;u.flash=.3;if(u.hp<=0){u.hp=0;u.out=1;S.msg=(u===me?'😵 你出局了！隊友加油！':'💥 '+u.n+' 出局！');S.mt=1.2}}})});
   S.dart=S.dart.filter(q=>q.t<2&&!(q.dead&&!q.st));S.boxT-=dt;if(S.boxT<=0&&S.box.length<2){S.boxT=10;let x,y,n=0;do{x=W/2+(Math.random()-.5)*200;y=AR.y+40+Math.random()*(AR.h-80)}while(blocked(x,y,14)&&++n<20);S.box.push({x,y})}
   S.box=S.box.filter(b=>{const u=U.find(u=>!u.out&&Math.hypot(u.x-b.x,u.y-b.y)<20);if(u){u.mag=NERF_GUN[u.gun].mag;u.rel=0;if(u===me){S.msg='📦 彈藥補滿！';S.mt=.8}return false}return true});
   const A=U.filter(u=>u.team==0&&!u.out).length,B=U.filter(u=>u.team==1&&!u.out).length;if(!B)return fin(1);if(!A)return fin(2)}
  // 畫面
  nfBg(g,W,H,loc,0);g.fillStyle='rgba(0,0,0,.08)';g.fillRect(W/2-1,AR.y,2,AR.h);
  C.forEach(c=>{if(c.k=='tree'){g.fillStyle='#4a8a2a';g.beginPath();g.arc(c.x+c.w/2,c.y+c.h/2,c.h/2+8,0,7);g.fill();g.fillStyle='#3a6a1a';g.beginPath();g.arc(c.x+c.w/2-6,c.y+c.h/2-8,c.h/3,0,7);g.fill()}
   else if(c.k=='bush'){g.fillStyle='#3a8a3a';g.beginPath();g.arc(c.x+c.w/2,c.y+c.h/2,c.w/2+4,0,7);g.fill()}
   else if(c.k=='hoop'){g.fillStyle='#888';g.fillRect(c.x,c.y,c.w,c.h);g.strokeStyle='#ff6a2a';g.lineWidth=3;g.beginPath();g.arc(c.x+c.w/2,c.y-8,9,0,7);g.stroke()}else if(c.k=='barrel'){g.fillStyle='#2a6ad0';g.beginPath();g.arc(c.x+c.w/2,c.y+c.h/2,c.w/2,0,7);g.fill();g.strokeStyle='#1a4a9a';g.lineWidth=3;g.stroke()}else{g.fillStyle=c.k=='pew'?'#7a4a2a':c.k=='bench'?'#9a6a3a':c.k=='slide'?'#e05a3a':'#b08a5a';g.fillRect(c.x,c.y,c.w,c.h);g.fillStyle='rgba(0,0,0,.2)';g.fillRect(c.x,c.y+c.h-5,c.w,5)}});
  S.box.forEach(b=>{g.fillStyle='#ffd84a';g.fillRect(b.x-10,b.y-10,20,20);g.fillStyle='#ff8a2a';g.fillRect(b.x-6,b.y-2,12,4);mgTxt(g,'彈',b.x,b.y-14,'bold 11px sans-serif','#3a2a10')});
  S.dart.forEach(q=>{g.save();g.translate(q.x,q.y);g.rotate(Math.atan2(q.vy,q.vx));g.fillStyle=q.team?'#2a6ad0':'#ff8a2a';g.fillRect(-8,-2,12,4);g.fillStyle='#fff';g.beginPath();g.arc(5,0,2.5,0,7);g.fill();g.restore()});
  U.forEach(u=>{g.save();g.translate(u.x,u.y);if(u.out)g.globalAlpha=.35;g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(2,4,13,8,0,0,7);g.fill();g.rotate(u.a);g.fillStyle='#444';g.fillRect(6,-3,16,6);g.fillStyle=u.gun=='smg'?'#3a8a3a':u.gun=='sniper'?'#2a2a6a':u.gun=='shotgun'?'#c08a20':'#ff8a2a';g.fillRect(8,-4,12,8);
   g.fillStyle=u.flash>0?'#fff':u.col;g.beginPath();g.arc(0,0,12,0,7);g.fill();g.fillStyle='#f0c09a';g.beginPath();g.arc(2,0,7,0,7);g.fill();g.fillStyle='#2a1a10';g.beginPath();g.arc(-1,0,7,1.6,4.7);g.fill();g.restore();
   mgTxt(g,u.n+(u.out?' 出局':''),u.x,u.y-20,'bold 12px sans-serif',u.team?'#1a3a8a':'#8a1a1a');for(let i=0;i<3;i++){g.fillStyle=i<u.hp?(u.team?'#4a8ad0':'#e05a4a'):'#ccc';g.fillRect(u.x-13+i*9,u.y+15,7,4)}
   if(u.rel>0&&!u.out)mgTxt(g,'換彈…',u.x,u.y+30,'11px sans-serif','#555')});
  g.fillStyle='rgba(0,0,0,.6)';g.fillRect(0,0,W,top-4);mgTxt(g,`🔴 你和${MATE[1]}`,16,30,'bold 17px sans-serif','#ffb0a0','left');mgTxt(g,`${OPP.map(q=>q[1]).join('、')} 🔵`,W-16,30,'bold 17px sans-serif','#a0c8ff','right');
  mgTxt(g,`⏱️ ${Math.max(0,S.end-Math.max(0,S.t)).toFixed(0)}`,W/2,30,'bold 20px sans-serif','#fff');
  const G0=NERF_GUN[me.gun];for(let i=0;i<G0.mag;i++){g.fillStyle=i<me.mag?'#ff8a2a':'#444';g.fillRect(W-20-i*(G0.mag>8?8:14),H-26,G0.mag>8?5:10,16)}if(me.rel>0)mgTxt(g,'換彈中…',W-100,H-34,'bold 15px sans-serif','#c05a10');
  if(S.t<0){g.fillStyle='rgba(0,0,0,.3)';g.fillRect(0,top,W,H-top);mgTxt(g,String(Math.ceil(-S.t)),W/2,H/2,'bold 90px sans-serif','#fff');mgTxt(g,'躲好掩體，準備開戰！',W/2,H/2-80,'bold 24px sans-serif','#fff')}
  if(S.mt>0)mgTxt(g,S.msg,W/2,top+30,'bold 22px sans-serif','#d23');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
