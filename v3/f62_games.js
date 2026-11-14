/* v10.8 遊藝場小遊戲改版：彈珠台 2.0（蓄力發射、拍台、風車、開門 V 洞、FEVER）、卡丁車 2.0（俯視大賽道、甩尾、迷你加速、五台對手車） */
// ───────── 🎰 彈珠台 2.0 ─────────
GAMES.pachi=o=>{const BX=140,BW=200,BY=16,BH=276,R0=3.4,pw=BW/7,pegs=[],bump=[[BX+44,96],[BX+156,96],[BX+100,150]],MILL={x:BX+100,y:70,r:20},VH={x:BX+100,y:206,w:22};
 const pv=[0,0,0,0,0,0,0].map(()=>wpick(PVAL)),pt=pv.map(()=>Math.random()*.6);
 for(let r=0;r<11;r++){const y=BY+40+r*16+(r>6?14:0);for(let i=0;i<(r%2?10:11);i++){const x=BX+(r%2?19:9)+i*18;if(bump.some(b=>Math.hypot(b[0]-x,b[1]-y)<20)||Math.hypot(MILL.x-x,MILL.y-y)<MILL.r+6||(Math.abs(x-VH.x)<VH.w&&Math.abs(y-VH.y)<14))continue;pegs.push([x,y])}}
 const parts=[],trails=[];let shake=0;
 const G={name:'🎰 彈珠台 2.0・幸運七洞',ph:'bet',bet:0,bt:0,mult:1,mshow:1,mt2:0,mlock:0,balls:[],left:5,score:0,mt:0,pop:[],hit:bump.map(()=>0),pow:0,chg:0,hold:0,
  mill:0,vOpen:0,fever:0,tilt:0,tiltLock:0,nudge:0,gate:BX+BW/2,gv:40,combo:0,ct:0,msg:'',msgT:0,
  lockMult(){G.mult=wpick(PMULT);G.mshow=G.mult;G.mlock=1;G.mt2=0;G.fl=1},
  say(m,t){G.msg=m;G.msgT=t||1.4},
  up(dt){G.mt+=dt;G.msgT-=dt;shake=Math.max(0,shake-dt*8);
   if(G.ph=='bet'){if(G.bet>0){G.bt+=dt;if(G.bt>1.7){st.coin-=G.bet;hud();G.ph='mult';G.mt2=0;G.mlock=0}}return}
   if(G.ph=='mult'){G.mt2+=dt;if(!G.mlock){G.mshow=PMULT[Math.floor(G.mt*14)%PMULT.length][0];if(G.mt2>3)G.lockMult()}else if(G.mt2>1.2){G.ph='play';G.say('按住 A 蓄力，放開發射！',2)}return}
   pv.forEach((v,i)=>{pt[i]-=dt;if(pt[i]<=0){pv[i]=wpick(PVAL);pt[i]=.45+Math.random()*.6}});
   if(G.hold){G.chg+=dt;G.pow=.5-.5*Math.cos(G.chg*3.2)}
   G.mill+=dt*(G.fever>0?6:3.2);G.vOpen=(Math.sin(G.mt*2.2)>.35)?1:0;G.fever=Math.max(0,G.fever-dt);G.tilt=Math.max(0,G.tilt-dt*.7);G.tiltLock=Math.max(0,G.tiltLock-dt);G.ct-=dt;if(G.ct<=0)G.combo=0;
   G.gate+=G.gv*dt;if(G.gate<BX+20||G.gate>BX+BW-20){G.gv*=-1;G.gate=Math.max(BX+20,Math.min(BX+BW-20,G.gate))}
   // 拍台（←→）
   const nd=(keys.left?-1:0)+(keys.right?1:0);if(nd&&!G.nudge&&G.balls.length&&!G.tiltLock){G.nudge=1;G.balls.forEach(b=>{b.vx+=nd*85;b.vy-=25});shake=2.5;G.tilt+=1;if(G.tilt>3.2){G.tiltLock=2;G.tilt=0;G.balls.forEach(b=>b.dead=1);G.say('⚠️ TILT！拍太大力，鋼珠沒收了',1.6)}}if(!nd)G.nudge=0;
   G.balls.forEach(b=>{b.vy+=330*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.vx*=.999;trails.push({x:b.x,y:b.y,t:0,f:G.fever>0});
    if(b.x<BX+R0){b.x=BX+R0;b.vx=Math.abs(b.vx)*.6}if(b.x>BX+BW-R0){b.x=BX+BW-R0;b.vx=-Math.abs(b.vx)*.6}if(b.y<BY+R0){b.y=BY+R0;b.vy=Math.abs(b.vy)*.5}
    pegs.forEach(p=>{const dx=b.x-p[0],dy=b.y-p[1],d=Math.hypot(dx,dy);if(d<R0+2&&d>.01){const nx=dx/d,ny=dy/d,vn=b.vx*nx+b.vy*ny;if(vn<0){b.vx-=1.55*vn*nx;b.vy-=1.55*vn*ny;b.vx+=(Math.random()-.5)*14;b.x=p[0]+nx*(R0+2.05);b.y=p[1]+ny*(R0+2.05)}}});
    bump.forEach((p,i)=>{const dx=b.x-p[0],dy=b.y-p[1],d=Math.hypot(dx,dy);if(d<R0+8&&d>.01){const nx=dx/d,ny=dy/d;b.vx=nx*200;b.vy=ny*200;b.x=p[0]+nx*(R0+8.1);b.y=p[1]+ny*(R0+8.1);G.hit[i]=.25;
     G.combo++;G.ct=1.2;const s=10*G.combo;G.score+=s;G.pop.push({x:p[0],y:p[1]-10,s:'+'+s+(G.combo>1?' COMBO×'+G.combo:''),t:0});for(let k=0;k<10;k++){const a=Math.random()*6.28;parts.push({x:p[0],y:p[1],vx:Math.cos(a)*90,vy:Math.sin(a)*90,t:0,c:['#ffd84a','#ff4aa0','#42d6ff'][k%3]})}}});
    // 風車：兩片旋轉葉片
    {const dx=b.x-MILL.x,dy=b.y-MILL.y,d=Math.hypot(dx,dy);if(d<MILL.r+R0&&d>4){const a=Math.atan2(dy,dx),near=[0,1,2,3].some(k=>{const q=G.mill+k*Math.PI/2;return Math.abs(Math.atan2(Math.sin(a-q),Math.cos(a-q)))<.35});if(near){const tx=-Math.sin(a),ty=Math.cos(a),sp=(G.fever>0?260:180);b.vx=dx/d*80+tx*sp*.9;b.vy=dy/d*80+ty*sp*.9;b.x=MILL.x+dx/d*(MILL.r+R0+.5);b.y=MILL.y+dy/d*(MILL.r+R0+.5)}}}
    // 開門 V 洞：開的時候掉進去＝JACKPOT
    if(Math.abs(b.x-VH.x)<(G.vOpen?VH.w/2+3:4)&&Math.abs(b.y-VH.y)<5){if(G.vOpen){b.dead=1;G.left+=2;G.fever=8;G.score+=300;G.fl=1;shake=6;G.say('🎉 JACKPOT！V 洞入賞！＋2 顆鋼珠・FEVER 8 秒',2);G.pop.push({x:VH.x,y:VH.y-12,s:'JACKPOT +300',t:0,big:1});for(let k=0;k<40;k++){const a=Math.random()*6.28;parts.push({x:VH.x,y:VH.y,vx:Math.cos(a)*160,vy:Math.sin(a)*160,t:0,c:`hsl(${k*30},90%,60%)`})}}else{b.vy=-Math.abs(b.vy)*.5;b.vx+=(Math.random()-.5)*80}}
    // 移動擋板
    if(Math.abs(b.y-(BY+BH-36))<4&&Math.abs(b.x-G.gate)<14){b.vy=-Math.abs(b.vy)*.6;b.vx+=(b.x<G.gate?-1:1)*60}
    if(b.y>BY+BH-26){const i=Math.max(0,Math.min(6,Math.floor((b.x-BX)/pw))),v=pv[i]*(G.fever>0?2:1),sc=v*G.mult;b.dead=1;G.score+=sc;G.pop.push({x:BX+i*pw+pw/2,y:BY+BH-34,s:v+'×'+G.mult+'='+sc,t:0,big:sc>=1000});if(sc>=500){G.fl=1;shake=4}}});
   G.balls=G.balls.filter(b=>!b.dead);G.hit=G.hit.map(h=>Math.max(0,h-dt));G.pop.forEach(p=>p.t+=dt);G.pop=G.pop.filter(p=>p.t<1.2);
   parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=200*dt;p.t+=dt});while(parts.length&&parts[0].t>.7)parts.shift();trails.forEach(q=>q.t+=dt);while(trails.length&&trails[0].t>.18)trails.shift();
   if(!G.left&&!G.balls.length&&!G.done&&G.ph=='play'){const r=pachiTix(G.score,G.bet);
    gameOver(r.tix,'🎰 結算',`投幣 <b>${G.bet}</b>　倍率 <b>×${G.mult}</b><br>本局得分 <b>${G.score}</b><br><span style="opacity:.8">每枚幣 ${r.per} 張 × ${G.bet} 枚${r.pity?'（保底補助）':''}${r.cap?'（今日已超過 240 張，減半）':''}</span>`)}},
  press(){if(G.done)return;
   if(G.ph=='bet'){if(G.bet<10&&st.coin>G.bet){G.bet++;G.bt=0}else if(st.coin<=G.bet&&G.bet<10)toast('遊戲幣不足');return}
   if(G.ph=='mult'){if(!G.mlock&&G.mt2>.4)G.lockMult();return}
   if(G.ph=='play'&&G.left>0&&G.balls.length<3&&!G.hold){G.hold=1;G.chg=0;G.pow=0}},
  release(){if(G.ph!='play'||!G.hold)return;G.hold=0;if(G.left<=0)return;G.left--;const p=G.pow;
   // 從右側發射軌道打上去：力道越大，越往左邊飛
   G.balls.push({x:BX+BW-6,y:BY+12,vx:-(40+p*260)*(.92+Math.random()*.16),vy:-10+Math.random()*20});G.pow=0},
  dr(c){c.save();if(shake>0)c.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
   const gr=c.createLinearGradient(0,0,0,300);gr.addColorStop(0,G.fever>0?'#5a1050':'#2a1050');gr.addColorStop(1,'#10082a');c.fillStyle=gr;c.fillRect(-10,-10,W+20,H+20);
   for(let i=0;i<30;i++){c.fillStyle=`hsla(${i*40+G.mt*(G.fever>0?300:60)},90%,60%,${G.fever>0?.7:.35})`;c.fillRect(BX-12+(i%2)*(BW+20),BY+Math.floor(i/2)*18,4,10)}
   c.fillStyle=G.fever>0?`hsl(${G.mt*300%360},80%,70%)`:'#f6ecc8';RR(c,BX-6,BY-5,BW+12,BH+10,7);c.fill();const bg=c.createLinearGradient(0,BY,0,BY+BH);bg.addColorStop(0,'#1a4a80');bg.addColorStop(1,'#0e2a50');c.fillStyle=bg;c.fillRect(BX,BY,BW,BH);
   txt(c,G.fever>0?'★ FEVER ★':'LUCKY 7',BX+BW/2,BY+26,`hsl(${G.mt*120%360},90%,70%)`,'bold 15px sans-serif');
   c.fillStyle='#e8e8f0';pegs.forEach(p=>{c.beginPath();c.arc(p[0],p[1],1.8,0,7);c.fill()});
   // 風車
   c.save();c.translate(MILL.x,MILL.y);c.fillStyle='#ffd84a';c.beginPath();c.arc(0,0,4,0,7);c.fill();for(let k=0;k<4;k++){c.rotate(Math.PI/2);c.save();c.rotate(G.mill);c.fillStyle=k%2?'#ff4aa0':'#42d6ff';c.fillRect(2,-2.5,MILL.r-2,5);c.restore()}c.restore();
   bump.forEach((p,i)=>{c.fillStyle=G.hit[i]>0?'#fff':'#ff4aa0';c.beginPath();c.arc(p[0],p[1],8,0,7);c.fill();c.strokeStyle='#ffd84a';c.lineWidth=1.5;c.stroke();txt(c,'★',p[0],p[1]+3,'#ffd84a','bold 7px sans-serif')});
   // V 洞（鬱金香門）
   {const o2=G.vOpen?1:0;c.fillStyle=o2?'#ff4aa0':'#8a2a5a';c.save();c.translate(VH.x,VH.y);c.beginPath();c.moveTo(-VH.w/2-o2*5,-12);c.lineTo(-3,4);c.lineTo(3,4);c.lineTo(VH.w/2+o2*5,-12);c.lineTo(VH.w/2-2,-12);c.lineTo(2,0);c.lineTo(-2,0);c.lineTo(-VH.w/2+2,-12);c.fill();c.restore();txt(c,o2?'OPEN!':'V',VH.x,VH.y+14,o2?'#ffd84a':'#c08ab0','bold 7px sans-serif')}
   // 移動擋板
   c.fillStyle='#c0c8d8';c.fillRect(G.gate-12,BY+BH-38,24,3);
   for(let i=0;i<7;i++){const x=BX+i*pw,v=pv[i]*(G.fever>0?2:1),hot=v>=50;c.fillStyle=hot?'#ffd84a':v==0?'#5a2a3a':['#3a6ab8','#2a8a6a'][i%2];c.fillRect(x+1,BY+BH-24,pw-2,22);txt(c,v,x+pw/2,BY+BH-9,hot?'#7a2a00':'#fff','bold 10px sans-serif');c.fillStyle='#e8e8f0';c.fillRect(x-1,BY+BH-30,2,8)}
   // 右側發射軌道
   c.fillStyle='#0a1a30';c.fillRect(BX+BW+8,BY,10,BH);if(G.ph=='play'){c.fillStyle='#333';c.fillRect(BX+BW+10,BY+40,6,BH-60);const pc=G.pow>.85?'#ff6a4a':G.pow>.55?'#ffd84a':'#8affb0';c.fillStyle=pc;c.fillRect(BX+BW+10,BY+40+(BH-60)*(1-G.pow),6,(BH-60)*G.pow);txt(c,'力',BX+BW+13,BY+34,'#fff','bold 7px sans-serif')}
   trails.forEach(q=>{c.globalAlpha=Math.max(0,.5-q.t*3);c.fillStyle=q.f?'#ff8af0':'#bcd4ff';c.beginPath();c.arc(q.x,q.y,R0*.8,0,7);c.fill()});c.globalAlpha=1;
   G.balls.forEach(b=>{const r=c.createRadialGradient(b.x-1,b.y-1,.5,b.x,b.y,R0);r.addColorStop(0,'#fff');r.addColorStop(1,'#9aa6b8');c.fillStyle=r;c.beginPath();c.arc(b.x,b.y,R0,0,7);c.fill()});
   parts.forEach(p=>{c.globalAlpha=Math.max(0,1-p.t*1.5);c.fillStyle=p.c;c.fillRect(p.x-1,p.y-1,2,2)});c.globalAlpha=1;
   G.pop.forEach(p=>txt(c,p.s,p.x,p.y-p.t*26,`rgba(255,240,120,${Math.max(0,1.2-p.t)})`,(p.big?'bold 14px':'bold 8px')+' sans-serif'));c.restore();
   // 左側面板
   c.fillStyle='rgba(0,0,0,.5)';c.fillRect(6,30,124,82);txt(c,'倍率',68,44,'#ffd84a','bold 9px sans-serif');const hue=G.mlock?50:G.mt*600%360;c.fillStyle=G.ph=='bet'?'#333':`hsl(${hue},80%,${G.mlock?55:40}%)`;c.fillRect(16,50,104,42);
   txt(c,G.ph=='bet'?'？':'×'+G.mshow,68,82,'#fff','bold 28px sans-serif');txt(c,G.ph=='mult'&&!G.mlock?'按 A 停下！':G.mlock?'鎖定！':'',68,106,'#ffd84a','bold 9px sans-serif');
   c.fillStyle='rgba(0,0,0,.45)';c.fillRect(6,120,124,62);txt(c,'拍台 TILT',68,134,'#ffd84a','bold 8px sans-serif');c.fillStyle='#333';c.fillRect(16,140,104,8);c.fillStyle=G.tilt>2.4?'#ff4a4a':G.tilt>1.4?'#ffb04a':'#4ac86a';c.fillRect(16,140,104*Math.min(1,G.tilt/3.2),8);txt(c,G.tiltLock>0?'TILT 鎖定中':'←→ 拍台推一下鋼珠',68,162,'#fff','7px sans-serif');if(G.fever>0)txt(c,'FEVER '+G.fever.toFixed(1)+'s',68,176,'#ff8af0','bold 9px sans-serif');
   c.fillStyle='rgba(0,0,0,.4)';c.fillRect(6,230,124,60);txt(c,'得分',68,246,'#ffd84a','bold 9px sans-serif');txt(c,G.score,68,268,'#fff','bold 20px sans-serif');
   c.fillStyle='rgba(0,0,0,.4)';c.fillRect(360,230,114,60);txt(c,'剩餘鋼珠',417,246,'#ffd84a','bold 9px sans-serif');for(let i=0;i<Math.min(7,G.left);i++){c.fillStyle='#cfd6e2';c.beginPath();c.arc(380+i*12,268,4.5,0,7);c.fill()}if(G.left>7)txt(c,'+'+(G.left-7),468,284,'#fff','8px sans-serif');
   c.fillStyle='rgba(0,0,0,.4)';c.fillRect(360,30,114,60);txt(c,'投入遊戲幣',417,44,'#ffd84a','bold 9px sans-serif');txt(c,'🪙 '+G.bet,417,70,'#fff','bold 18px sans-serif');
   c.fillStyle='rgba(0,0,0,.4)';c.fillRect(360,96,114,92);txt(c,'玩法',417,110,'#ffd84a','bold 8px sans-serif');['★ 打到星星彈簧＝連擊加分','V 洞打開時掉進去＝JACKPOT','風車會把鋼珠甩出去','擋板會左右移動'].forEach((t,i)=>txt(c,t,417,124+i*15,'#fff','6px sans-serif'));
   if(G.ph=='bet'){c.fillStyle='rgba(0,0,0,.7)';c.fillRect(150,120,180,70);txt(c,'投幣階段',240,138,'#ffd84a','bold 11px sans-serif');txt(c,G.bet?'再按 A 追加（最多10枚）':'按 A 投入遊戲幣',240,155,'#fff','9px sans-serif');
    if(G.bet){c.fillStyle='#333';c.fillRect(170,168,140,6);c.fillStyle='#4ac86a';c.fillRect(170,168,140*Math.min(1,G.bt/1.7),6);txt(c,'停手後自動確定',240,184,'#ffffffaa','8px sans-serif')}}
   if(G.ph=='mult'&&G.mlock){c.fillStyle=`rgba(255,255,255,${.4*Math.max(0,1.2-G.mt2)})`;c.fillRect(0,0,W,H)}
   if(G.msgT>0)txt(c,G.msg,W/2,BY+BH/2-40,'#fff','bold 10px sans-serif');
   txt(c,G.ph=='play'?'按住 A 蓄力、放開發射（越大力越往左）　←→ 拍台':'A：投幣／停止倍率',W/2,296,'#ffffffcc','8px sans-serif')}};return G};
// ───────── 🏎️ 卡丁車 2.0：俯視大賽道、甩尾、五台對手 ─────────
const KTRK=(()=>{const C=[[400,1500],[300,1200],[340,800],[260,480],[420,260],[760,240],[940,420],[880,640],[1100,760],[1440,620],[1640,360],[1980,320],[2160,560],[2080,900],[1780,1000],[1720,1240],[2040,1380],[2100,1640],[1760,1800],[1240,1720],[960,1500],[700,1680]];
 const P=[],N=C.length;for(let i=0;i<N;i++){const p0=C[(i-1+N)%N],p1=C[i],p2=C[(i+1)%N],p3=C[(i+2)%N];for(let t=0;t<1;t+=1/14){const t2=t*t,t3=t2*t,f=(a,b,c2,d)=>.5*(2*b+(-a+c2)*t+(2*a-5*b+4*c2-d)*t2+(-a+3*b-3*c2+d)*t3);P.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}
 const L=[0];for(let i=1;i<=P.length;i++){const a=P[i-1],b=P[i%P.length];L.push(L[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]))}return{P,L,len:L[P.length],W:2440,H:2000,TW:62}})();
let KCV=null;function kartTrack(){if(KCV)return KCV;const T=KTRK,c=document.createElement('canvas');c.width=T.W/2;c.height=T.H/2;const x=c.getContext('2d');x.scale(.5,.5);
 x.fillStyle='#4f9a44';x.fillRect(0,0,T.W,T.H);const r=orn(77);for(let i=0;i<9000;i++){x.fillStyle=['#5aa84c','#468c3c','#62b054'][i%3];x.fillRect(r()*T.W,r()*T.H,4,6)}
 for(let i=0;i<60;i++){const tx=r()*T.W,ty=r()*T.H;if(T.P.some(p=>Math.hypot(p[0]-tx,p[1]-ty)<T.TW*2.2))continue;x.fillStyle='#2e6e30';x.beginPath();x.arc(tx,ty,18+r()*16,0,7);x.fill();x.fillStyle='#3e8a3a';x.beginPath();x.arc(tx-4,ty-5,12+r()*8,0,7);x.fill()}
 const path=()=>{x.beginPath();T.P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath()};x.lineJoin='round';x.lineCap='round';
 path();x.strokeStyle='#d8c890';x.lineWidth=T.TW*2+46;x.stroke();
 path();x.setLineDash([22,22]);x.strokeStyle='#e03030';x.lineWidth=T.TW*2+14;x.stroke();x.setLineDash([22,22]);x.lineDashOffset=22;x.strokeStyle='#f4f4f4';x.stroke();x.setLineDash([]);
 path();x.strokeStyle='#55585f';x.lineWidth=T.TW*2;x.stroke();path();x.setLineDash([30,30]);x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=3;x.stroke();x.setLineDash([]);
 const s=T.P[0],n=T.P[1],a=Math.atan2(n[1]-s[1],n[0]-s[0]);x.save();x.translate(s[0],s[1]);x.rotate(a);for(let i=-6;i<6;i++)for(let j=0;j<2;j++){x.fillStyle=(i+j)%2?'#111':'#fff';x.fillRect(j*8-8,i*T.TW/6,8,T.TW/6)}x.restore();
 [[.22],[.5],[.78]].forEach(q=>{const i=Math.floor(q[0]*T.P.length),p=T.P[i],p2=T.P[i+1];const a2=Math.atan2(p2[1]-p[1],p2[0]-p[0]);x.save();x.translate(p[0],p[1]);x.rotate(a2);x.fillStyle='#ffb02a';for(let k=0;k<3;k++){x.beginPath();x.moveTo(-20+k*14,-18);x.lineTo(-8+k*14,0);x.lineTo(-20+k*14,18);x.lineTo(-14+k*14,18);x.lineTo(-2+k*14,0);x.lineTo(-14+k*14,-18);x.fill()}x.restore()});
 KCV=c;return c}
function kNear(x,y,hint){const T=KTRK,N=T.P.length;let best=1e9,bi=0;const from=hint==null?0:hint-25,to=hint==null?N:hint+25;for(let j=from;j<to;j++){const i=((j%N)+N)%N,p=T.P[i],d=(p[0]-x)**2+(p[1]-y)**2;if(d<best){best=d;bi=i}}return{i:bi,d:Math.sqrt(best)}}
function drawKartTop(c,x,y,a,col,hl,drift,boost,sc){c.save();c.translate(x,y);c.rotate(a);c.scale(sc,sc);
 c.fillStyle='rgba(0,0,0,.35)';c.fillRect(-11,-6,24,14);
 if(boost){c.fillStyle=boost>1?'#c06aff':'#ffb02a';c.beginPath();c.moveTo(-11,-4);c.lineTo(-20-Math.random()*8,0);c.lineTo(-11,4);c.fill()}
 c.fillStyle='#1a1a22';c.fillRect(-10,-9,6,4);c.fillRect(-10,5,6,4);c.fillRect(5,-8,5,3);c.fillRect(5,5,5,3);
 c.fillStyle=col;RR(c,-10,-6,21,12,4);c.fill();c.fillStyle=hl;c.fillRect(6,-4,4,8);c.fillStyle='#222';c.fillRect(-2,-4,5,8);
 c.fillStyle=col;c.beginPath();c.arc(0,0,3.6,0,7);c.fill();c.fillStyle='#fff';c.fillRect(1,-1.2,2.4,2.4);c.restore()}
GAMES.kart=o=>{const T=KTRK,LAPS=3,N=T.P.length,cv=kartTrack();
 const p0=T.P[0],p1=T.P[3],a0=Math.atan2(p1[1]-p0[1],p1[0]-p0[0]),nx=-Math.sin(a0),ny=Math.cos(a0);
 const COL=[['#ff3a3a','#ffe0e0'],['#3a8ae8','#d0e4ff'],['#2ea860','#d0f4dc'],['#e8b020','#fff0c0'],['#a050d0','#ecd8ff'],['#ff8ad0','#ffe0f4']];
 const NM=['你','柏凱','禹豪','阿哲','小美','阿傑'];
 const cars=COL.map((cc,i)=>{const row=Math.floor(i/2),side=i%2?1:-1,back=40+row*42;return{i,nm:NM[i],c:cc,x:p0[0]-Math.cos(a0)*back+nx*side*22,y:p0[1]-Math.sin(a0)*back+ny*side*22,a:a0,vx:0,vy:0,lap:-1,prog:0,ni:N-2,lastI:N-2,mt:0,mtLv:0,boost:0,drift:0,dd:0,ai:i>0,skill:.9+i*.025+Math.random()*.04,lane:(Math.random()-.5)*.8,fin:0,ft:0}});
 const me=cars[0];me.ai=false;window.__kc=cars;const skid=[];const sk=cv.getContext('2d');
 const G={name:'🏎️ 歡樂卡丁車 GP 2.0',cd:3.2,tm:0,place:6,fin:0,hold:0,shake:0,msg:'',msgT:0,
  up(dt){G.cd-=dt;G.msgT-=dt;G.shake=Math.max(0,G.shake-dt*6);const go=G.cd<=0;if(go&&!G.fin)G.tm+=dt;
   cars.forEach(k=>{if(k.fin){k.vx*=.97;k.vy*=.97;k.x+=k.vx*dt;k.y+=k.vy*dt;return}
    const nr=kNear(k.x,k.y,k.ni);k.ni=nr.i;const off=nr.d>T.TW+4;
    // 圈數
    if(k.lastI>N*.8&&nr.i<N*.2){k.lap++;if(k===me&&k.lap>0&&k.lap<LAPS){G.msg='第 '+(k.lap+1)+' 圈！';G.msgT=1.2}}else if(k.lastI<N*.2&&nr.i>N*.8)k.lap--;k.lastI=nr.i;k.prog=k.lap*N+nr.i;
    if(k.lap>=LAPS&&!k.fin){k.fin=1;k.ft=G.tm;if(k===me){G.fin=1;const r=1+cars.filter(q=>q!==me&&q.fin&&q.ft<=k.ft).length;G.place=r;const tx=[0,45,32,22,14,8,4][r];setTimeout(()=>gameOver(o.free?0:tx,r==1?'🏆 冠軍！':'🏁 完賽',`第 <b>${r}</b> 名　時間 ${G.tm.toFixed(1)} 秒<br>${r==1?'甩尾甩得漂亮！':'下次多用甩尾加速！'}`),900)}}
    let steer=0,thr=go?1:0,brake=0,drift=0;
    if(k.ai){const la=Math.floor(8+Math.hypot(k.vx,k.vy)/40),tp=T.P[(nr.i+la)%N],tp2=T.P[(nr.i+la+1)%N],ta=Math.atan2(tp2[1]-tp[1],tp2[0]-tp[0]),lx=tp[0]-Math.sin(ta)*k.lane*T.TW*.6,ly=tp[1]+Math.cos(ta)*k.lane*T.TW*.6;
     let da=Math.atan2(ly-k.y,lx-k.x)-k.a;da=Math.atan2(Math.sin(da),Math.cos(da));steer=Math.max(-1,Math.min(1,da*2.4));
     const fa=T.P[(nr.i+22)%N],fb=T.P[(nr.i+24)%N],ca=Math.atan2(fb[1]-fa[1],fb[0]-fa[0]),curve=Math.abs(Math.atan2(Math.sin(ca-k.a),Math.cos(ca-k.a)));drift=curve>.85&&Math.hypot(k.vx,k.vy)>170?1:0;
     // 追趕：落後的加油、領先的放慢一點，比賽才會黏在一起
     const gap=(me.prog-k.prog)/N;k.rb=Math.max(.9,Math.min(1.12,1+gap*.35));if(Math.random()<dt*.3)k.lane=Math.max(-.8,Math.min(.8,k.lane+(Math.random()-.5)*.6))}
    else{steer=(keys.right?1:0)-(keys.left?1:0);brake=keys.down?1:0;drift=G.hold&&Math.hypot(k.vx,k.vy)>80?1:0}
    if(!go){return}
    const sp=Math.hypot(k.vx,k.vy),fwx=Math.cos(k.a),fwy=Math.sin(k.a),vf=k.vx*fwx+k.vy*fwy,vs=-k.vx*fwy+k.vy*fwx;
    const top=(k.ai?250*k.skill*(k.rb||1):262)*(off?.55:1)*(k.boost>0?1.35:1);
    let acc=thr*(vf<top?190:-120)-brake*260;
    // 轉向：甩尾時轉得更急
    if(drift&&!k.drift&&Math.abs(steer)>.1){k.drift=1;k.dd=Math.sign(steer)}if(!drift&&k.drift){k.drift=0;if(k.mtLv>0){k.boost=k.mtLv==1?.6:k.mtLv==2?1:1.4;if(k===me){G.msg=['','🔵 迷你加速！','🟠 超級加速！','🟣 終極加速！'][k.mtLv];G.msgT=1}}k.mt=0;k.mtLv=0}
    const turn=(k.drift?2.6+steer*k.dd*1.1:2.4)*Math.min(1,sp/120)*(k.drift?k.dd:steer)*(k.drift?Math.max(.3,1+steer*k.dd*.6):1);k.a+=turn*dt;
    if(k.drift){k.mt+=dt*(.6+Math.abs(steer));k.mtLv=k.mt>2.2?3:k.mt>1.3?2:k.mt>.6?1:0;
     if(sp>60&&Math.random()<.9){const bx=k.x-fwx*9,by=k.y-fwy*9;sk.fillStyle='rgba(30,30,30,.12)';sk.fillRect(bx-fwy*6,by+fwx*6,3,3);sk.fillRect(bx+fwy*6,by-fwx*6,3,3)}}
    // 側滑摩擦：甩尾時抓地力低
    const grip=k.drift?(k.ai?2.6:1.6):off?5:7.5;const nvs=vs*Math.exp(-grip*dt),nvf=Math.max(-60,vf+acc*dt-vf*(off?1.4:.25)*dt);
    k.vx=fwx*nvf-fwy*nvs;k.vy=fwy*nvf+fwx*nvs;k.x+=k.vx*dt;k.y+=k.vy*dt;k.boost=Math.max(0,k.boost-dt);
    if(!off&&[.22,.5,.78].some(q=>Math.abs(nr.i-Math.floor(q*N))<2)&&nr.d<34){k.boost=Math.max(k.boost,.8)}
    if(off&&k===me&&sp>120)G.shake=1.2;
    k.x=Math.max(10,Math.min(T.W-10,k.x));k.y=Math.max(10,Math.min(T.H-10,k.y))});
   // 車子互撞
   for(let i=0;i<cars.length;i++)for(let j=i+1;j<cars.length;j++){const A=cars[i],Bc=cars[j],dx=Bc.x-A.x,dy=Bc.y-A.y,d=Math.hypot(dx,dy);if(d<18&&d>.1){const nx2=dx/d,ny2=dy/d,ov=(18-d)/2;A.x-=nx2*ov;A.y-=ny2*ov;Bc.x+=nx2*ov;Bc.y+=ny2*ov;const rv=(A.vx-Bc.vx)*nx2+(A.vy-Bc.vy)*ny2;if(rv>0){A.vx-=nx2*rv*.6;A.vy-=ny2*rv*.6;Bc.vx+=nx2*rv*.6;Bc.vy+=ny2*rv*.6;if(A===me||Bc===me)G.shake=Math.max(G.shake,1.5)}}}
   if(!G.fin)G.place=1+cars.filter(k=>k!==me&&(k.fin||k.prog>me.prog)).length},
  press(){G.hold=1},release(){G.hold=0},
  dr(c){const cx=me.x+me.vx*.25,cy=me.y+me.vy*.25,ox=W/2-cx,oy=H/2-cy;c.save();if(G.shake>0)c.translate((Math.random()-.5)*G.shake*2,(Math.random()-.5)*G.shake*2);
   c.fillStyle='#4f9a44';c.fillRect(0,0,W,H);c.imageSmoothingEnabled=false;{const sx0=Math.max(0,Math.min(cv.width-W/2,(cx-W/2)/2)),sy0=Math.max(0,Math.min(cv.height-H/2,(cy-H/2)/2));c.drawImage(cv,sx0,sy0,W/2,H/2,sx0*2+ox,sy0*2+oy,W,H)}
   [...cars].sort((a,b)=>a.y-b.y).forEach(k=>{const sx=k.x+ox,sy=k.y+oy;if(sx<-30||sx>W+30||sy<-30||sy>H+30)return;
    if(k.drift&&k.mtLv>0){const cc=['','#4ac0ff','#ffa02a','#c06aff'][k.mtLv];for(let s=0;s<3;s++){c.fillStyle=cc;c.fillRect(sx-Math.cos(k.a)*10+(Math.random()-.5)*8-Math.sin(k.a)*6*(s-1),sy-Math.sin(k.a)*10+(Math.random()-.5)*8+Math.cos(k.a)*6*(s-1),2,2)}}
    if(k.drift){c.fillStyle='rgba(230,230,230,.5)';c.beginPath();c.arc(sx-Math.cos(k.a)*12+(Math.random()-.5)*6,sy-Math.sin(k.a)*12+(Math.random()-.5)*6,3+Math.random()*3,0,7);c.fill()}
    drawKartTop(c,sx,sy,k.a+(k.drift?k.dd*.35:0),k.c[0],k.c[1],k.drift,k.boost>0?(k.mtLv>1?2:1):0,1.25);
    if(k!==me)txt(c,k.nm,sx,sy-14,'#fff','bold 7px sans-serif');else txt(c,'▼ 你',sx,sy-15,'#8affb0','bold 7px sans-serif')});
   c.restore();
   // 小地圖
   const mw=96,mh=mw*T.H/T.W,mx=W-mw-8,my=H-mh-14;c.fillStyle='rgba(0,0,0,.45)';c.fillRect(mx-3,my-3,mw+6,mh+6);c.strokeStyle='#bbb';c.lineWidth=2;c.beginPath();T.P.forEach((p,i)=>{const X=mx+p[0]/T.W*mw,Y=my+p[1]/T.H*mh;i?c.lineTo(X,Y):c.moveTo(X,Y)});c.closePath();c.stroke();
   cars.forEach(k=>{c.fillStyle=k===me?'#fff':k.c[0];c.beginPath();c.arc(mx+k.x/T.W*mw,my+k.y/T.H*mh,k===me?3:2.2,0,7);c.fill()});
   c.fillStyle='rgba(0,0,0,.5)';c.fillRect(6,18,100,46);txt(c,'第 '+G.place+' 名',56,36,'#ffd84a','bold 14px sans-serif');txt(c,'圈數 '+Math.max(1,Math.min(LAPS,me.lap+1))+'/'+LAPS,56,55,'#fff','bold 10px sans-serif');
   const sp=Math.hypot(me.vx,me.vy);c.fillStyle='rgba(0,0,0,.5)';c.fillRect(6,68,100,30);txt(c,Math.round(sp*.42)+' km/h',56,80,'#fff','bold 10px sans-serif');c.fillStyle='#333';c.fillRect(12,86,88,6);c.fillStyle=['#888','#4ac0ff','#ffa02a','#c06aff'][me.mtLv];c.fillRect(12,86,88*Math.min(1,me.mt/2.2),6);txt(c,me.drift?'甩尾中…':'',56,104,'#fff','bold 7px sans-serif');
   if(G.cd>0){const n=Math.ceil(G.cd-.2);txt(c,n>0?n+'':'GO!',W/2,140,n>0?'#ffd84a':'#6aff6a','bold 60px sans-serif')}else if(G.tm<1)txt(c,'GO!',W/2,140,'#6aff6a','bold 54px sans-serif');
   if(G.msgT>0)txt(c,G.msg,W/2,90,'#fff','bold 14px sans-serif');
   txt(c,'←→ 轉向　↓ 煞車　按住 A（空白鍵）＋轉向＝甩尾，放開＝加速（藍→橘→紫）',W/2,H-3,'#fff','7px sans-serif')}};
 return G};
