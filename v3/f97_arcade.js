/* v13.5 遊藝場重做：🎰 豪華鋼珠台（一次買一大盒鋼珠、連發、風車、轉盤、鬱金香、拉霸大獎）、🏎️ 卡丁車（第一人稱往前的賽道）；🏀 三分球大賽美化 */
const ARC={W:720,H:520};
// ═════════════════════════ 🎰 豪華鋼珠台 ═════════════════════════
function pachiPro(){const M=mgBoxBig('🎰 豪華鋼珠台・幸運 777'),g=M.g,W2=720,H2=520;const PB=st.pball=st.pball||0;
 const S={ph:'buy',balls:PB,won:0,spent:0,fire:0,fireT:0,pow:.62,arr:[],t:0,pegs:[],grid:{},mills:[{x:250,y:170,a:0,s:2.4},{x:470,y:170,a:0,s:-2.4}],bump:[{x:205,y:300,h:0},{x:515,y:300,h:0},{x:360,y:118,h:0}],
  tul:[{x:215,y:380,o:0,ot:0},{x:505,y:380,o:0,ot:0}],chuck:{x:360,y:330},reel:[7,7,7],spin:0,rres:null,stock:0,fever:0,att:{x:360,y:452,w:70,o:0},disk:{x:360,y:240,r:34,a:0},
  pops:[],parts:[],flash:0,msg:'',mt:0,done:false,lights:0};
 // 釘子
 for(let r=0;r<17;r++){const y=70+r*24;for(let c=0;c<20;c++){const x=150+c*22+(r%2?11:0);if(x>585)continue;
  if(S.mills.some(m=>Math.hypot(m.x-x,m.y-y)<40)||S.bump.some(b=>Math.hypot(b.x-x,b.y-y)<28)||S.tul.some(t=>Math.hypot(t.x-x,t.y-y)<26)||Math.hypot(S.chuck.x-x,S.chuck.y-y)<34||Math.hypot(S.disk.x-x,S.disk.y-y)<S.disk.r+14||(Math.abs(x-360)<70&&y>420)||(y>260&&y<330&&Math.abs(x-360)<80))continue;
  if((r*7+c*3)%5==0)continue;S.pegs.push({x,y,h:0})}}
 S.pegs.forEach((p,i)=>{const k=(p.x/24|0)+','+(p.y/24|0);(S.grid[k]=S.grid[k]||[]).push(p)});
 const R=4.2,FL=128,FR_=592,TOP=36,BOT=490;
 const say=(m,t)=>{S.msg=m;S.mt=t||1.6};
 const pop=(x,y,s,c)=>S.pops.push({x,y,s,c:c||'#ffd84a',t:0});
 const burst=(x,y,n,cols)=>{for(let i=0;i<n;i++){const a=Math.random()*6.28,v=60+Math.random()*180;S.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,c:cols[i%cols.length]})}};
 S.mul=1;const give=(n,x,y)=>{n*=S.mul;S.balls+=n;S.won+=n;pop(x,y,'+'+n,n>=15?'#ff5ad0':'#ffd84a')};
 const launch=()=>{if(S.balls<S.mul)return;S.balls-=S.mul;S.spent+=S.mul;const v=430+S.pow*430;S.arr.push({x:FR_-6,y:BOT-10,vx:0,vy:-v,rail:1,t:0,m:S.mul})};
 // 購買
 const buyUI=()=>{S.ph='buy';const o=[[1,40],[5,220],[10,480],[20,1000]].map(([c,n])=>[`🪙${c} → ${n} 顆`,()=>{if(st.coin<c)return toast('遊戲幣不夠，到換幣機換一些吧');st.coin-=c;hud();S.balls+=n;start()}]);
  if(S.balls>0)o.unshift([`▶ 用身上的 ${S.balls} 顆開始`,start]);o.push(['離開',fin]);mgButtons(M,o);M.tip.innerHTML=`買一盒鋼珠（遊戲幣 🪙${st.coin}）。贏到的鋼珠可以換<b>彩票</b>。`};
 const ctlUI=()=>{M.bt.innerHTML='';const mk=(t,f,hold)=>{const b=document.createElement('button');b.textContent=t;b.style.cssText='font:inherit;font-size:15px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:8px 14px;touch-action:none;user-select:none';if(hold){b.onpointerdown=e=>{e.preventDefault();f(1)};['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>f(0)))}else b.onclick=f;M.bt.appendChild(b)};
  const sl=document.createElement('label');sl.style.cssText='display:flex;align-items:center;gap:6px;font-weight:800;color:#5a3417;font-size:14px';sl.innerHTML='💪 力道<input type="range" min="20" max="100" value="'+Math.round(S.pow*100)+'" style="width:150px;accent-color:#5ad8ff">';const rg=sl.querySelector('input');rg.oninput=()=>{S.pow=rg.value/100};S.rg=rg;M.bt.appendChild(sl);
  mk('🔥 按住連發（空白鍵）',v=>S.fire=v,1);
  [1,2,5].forEach(m=>{const b=document.createElement('button');b.textContent='×'+m;b.style.cssText=`font:inherit;font-size:15px;font-weight:800;background:${S.mul==m?'#e0a020':'#6b4423'};color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:8px 10px`;b.onclick=()=>{S.mul=m;ctlUI()};M.bt.appendChild(b)});mk('🛒 加買',()=>{S.fire=0;buyUI()});mk('💰 結算',fin)};
 S.score=0;S.lmult=1;S.pv=[0,0,0,0,0,0,0].map(()=>wpick(PVAL));S.pvt=S.pv.map(()=>Math.random()*.6);S.pvp=S.pv.map(()=>0);
 const lockM=()=>{if(S.ph!='mult'||S.mt2<.4)return;S.lmult=wpick(PMULT);S.ph='play';say(`🎯 幸運倍率 ×${S.lmult}！`,1.8);if(S.lmult>=10){S.flash=1;burst(360,200,40,['#ffd84a','#ff5ad0','#fff'])}ctlUI()};
 const start=()=>{if(!S.rolled){S.rolled=1;S.ph='mult';S.mt2=0;mgButtons(M,[['🎯 停！（空白鍵）',lockM]]);M.tip.innerHTML='先轉<b>幸運倍率</b>！按空白鍵讓數字停下來，這一盤的分數都會乘上它。';return}S.ph='play';ctlUI();M.tip.innerHTML='按住空白鍵連發！鋼珠會沿著外圈軌道繞到左邊落下，<b>力道</b>決定落點。<b>倍率</b> ×2／×5：每發用掉 2／5 顆，獎勵也 ×2／×5。打進中央 START 會轉拉霸，三個一樣＝大獎！';say('🎰 開始！',1.2)};
 const kd=e=>{const k=e.key;if(k==' '){e.preventDefault();if(S.ph=='mult')lockM();else if(S.ph=='play')S.fire=1}else if(k=='ArrowUp'||k=='w'){S.pow=Math.min(1,S.pow+.04);if(S.rg)S.rg.value=S.pow*100;e.preventDefault()}else if(k=='ArrowDown'||k=='s'){S.pow=Math.max(.2,S.pow-.04);if(S.rg)S.rg.value=S.pow*100;e.preventDefault()}else if(k=='Escape')fin()};
 const ku=e=>{if(e.key==' ')S.fire=0};OVK.add(kd);OVKU.add(ku);
 function fin(){if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);const left=S.balls+S.arr.length;const ts=Math.min(80,Math.round(Math.sqrt(S.score)*.6)),tix=Math.floor(left/20)+ts;st.pball=left%20;st.tix=(st.tix||0)+tix;st.cnt.arcade=(st.cnt.arcade||0)+1;fxApply({j:8});advance(.5);hud();SVDIRTY=1;
  M.tip.innerHTML=`⭐ 分數 <b>${S.score}</b> → 🎟️ ${ts} 張　剩下 <b>${left}</b> 顆鋼珠 → 🎟️ ${Math.floor(left/20)} 張　合計 <b>${tix}</b> 張彩票${st.pball?`（零頭 ${st.pball} 顆幫你存著）`:''}<br>這一盤贏了 ${S.won} 顆、打出 ${S.spent} 顆。彩票合計 ${st.tix}`;
  mgButtons(M,[['再玩一次',()=>{M.end();pachiPro()}],['離開',()=>{M.end();try{arcadeMenu()}catch(e){}}]])}
 // 物理
 const step=dt=>{const G=900;
  S.mills.forEach(m=>m.a+=m.s*dt*(S.fever?1.8:1));S.disk.a+=dt*(S.fever?5:2.2);
  S.tul.forEach(t=>{if(t.o){t.ot-=dt;if(t.ot<=0)t.o=0}});if(S.att.o>0)S.att.o-=dt;
  if(S.spin>0){S.spin-=dt;if(S.spin<=0)reelStop()}else if(S.stock>0&&!S.fever){S.stock--;S.spin=1.6;S.rres=null}
  if(S.fever>0){S.fever-=dt;if(S.fever<=0){S.att.o=0;say('FEVER 結束',1.2)}}
  if(S.fire&&S.ph=='play'){S.fireT-=dt;if(S.fireT<=0){S.fireT=.09;launch()}}
  S.arr.forEach(b=>{b.t+=dt;
   if(b.rail==1){b.vy+=G*.35*dt;b.y+=b.vy*dt;b.x=FR_-6;if(b.vy>=0){b.dead=1;S.balls+=b.m;return}if(b.y<=260){b.rail=2;b.phi=0;b.v=-b.vy}return}
   if(b.rail==2){const r=226;b.v-=G*.35*Math.cos(b.phi)*dt;if(b.v<=0&&b.phi>-Math.PI/2){b.rail=1;b.vy=0;b.y=260;b.x=FR_-6;return}b.phi-=b.v/r*dt;b.x=360+r*Math.cos(b.phi);b.y=260+r*Math.sin(b.phi);
    const ex=-Math.PI*(.36+S.pow*.18);if(b.phi<=ex){b.rail=0;b.vx=Math.sin(b.phi)*b.v;b.vy=-Math.cos(b.phi)*b.v}return}
   b.vy+=G*dt;b.vx*=.999;b.x+=b.vx*dt;b.y+=b.vy*dt;
   // 外框（上方圓弧）
   const cx=360,cy=260,rr=236;const dx=b.x-cx,dy=b.y-cy;if(b.y<cy){const d=Math.hypot(dx,dy);if(d>rr-R){const nx=dx/d,ny=dy/d,vn=b.vx*nx+b.vy*ny;if(vn>0){b.vx-=1.6*vn*nx;b.vy-=1.6*vn*ny}b.x=cx+nx*(rr-R);b.y=cy+ny*(rr-R)}}
   if(b.x<FL+R){b.x=FL+R;b.vx=Math.abs(b.vx)*.5}if(b.x>FR_-R-14&&b.y>TOP+30){b.x=FR_-R-14;b.vx=-Math.abs(b.vx)*.5}
   // 釘子
   const gx=b.x/24|0,gy=b.y/24|0;for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const L=S.grid[(gx+i)+','+(gy+j)];if(!L)continue;L.forEach(p=>{const dx=b.x-p.x,dy=b.y-p.y,d=Math.hypot(dx,dy);if(d<R+1.6&&d>.01){const nx=dx/d,ny=dy/d,vn=b.vx*nx+b.vy*ny;if(vn<0){b.vx-=1.5*vn*nx;b.vy-=1.5*vn*ny;b.vx+=(Math.random()-.5)*20;p.h=.15}b.x=p.x+nx*(R+1.7);b.y=p.y+ny*(R+1.7)}})}
   // 風車（四片葉）
   S.mills.forEach(m=>{const dx=b.x-m.x,dy=b.y-m.y,d=Math.hypot(dx,dy);if(d<26&&d>3){for(let k=0;k<4;k++){const a=m.a+k*Math.PI/2,ex=Math.cos(a),ey=Math.sin(a),pr=dx*ex+dy*ey;if(pr>0&&pr<26){const pd=Math.abs(-dx*ey+dy*ex);if(pd<R+2){const tv=m.s*pr*1.2;b.vx=-ey*tv*40/26+dx/d*120;b.vy=ex*tv*40/26+dy/d*120;b.x+=dx/d*2;b.y+=dy/d*2}}}if(d<8){b.x=m.x+dx/d*9;b.y=m.y+dy/d*9}}});
   // 彈跳柱
   S.bump.forEach(q=>{const dx=b.x-q.x,dy=b.y-q.y,d=Math.hypot(dx,dy);if(d<R+11&&d>.01){const nx=dx/d,ny=dy/d;b.vx=nx*360;b.vy=ny*360;b.x=q.x+nx*(R+11.5);b.y=q.y+ny*(R+11.5);q.h=.25;burst(q.x,q.y,6,['#ff5ad0','#5ad8ff','#fff'])}});
   // 轉盤：碰到外圈會被帶著甩出去
   {const D=S.disk,dx=b.x-D.x,dy=b.y-D.y,d=Math.hypot(dx,dy);if(d<D.r+R&&d>.01){const nx=dx/d,ny=dy/d,sp=(S.fever?260:150);b.vx=nx*120-ny*sp;b.vy=ny*120+nx*sp;b.x=D.x+nx*(D.r+R+.5);b.y=D.y+ny*(D.r+R+.5)}}
   // 鬱金香
   S.tul.forEach(t=>{const w=t.o?16:7;if(Math.abs(b.x-t.x)<w&&b.y>t.y-6&&b.y<t.y+6&&b.vy>0){b.dead=1;give(6,t.x,t.y-16);t.o=1;t.ot=S.fever?99:2.5;burst(t.x,t.y,10,['#ff8ab0','#ffd84a']);}
    else{[-1,1].forEach(sd=>{const px=t.x+sd*(t.o?20:10),py=t.y-6;const dx=b.x-px,dy=b.y-py,d=Math.hypot(dx,dy);if(d<R+3&&d>.01){const nx=dx/d,ny=dy/d,vn=b.vx*nx+b.vy*ny;if(vn<0){b.vx-=1.5*vn*nx;b.vy-=1.5*vn*ny}}})}});
   // 中央入賞口 → 拉霸
   {const C=S.chuck;if(Math.abs(b.x-C.x)<9&&Math.abs(b.y-C.y)<6&&b.vy>0){b.dead=1;give(3,C.x,C.y-14);if(S.stock<4)S.stock++;burst(C.x,C.y,8,['#fff','#ffd84a'])}}
   // 大獎門（FEVER 時打開）
   {const A=S.att;if(A.o>0&&Math.abs(b.x-A.x)<A.w/2&&Math.abs(b.y-A.y)<6){b.dead=1;give(15,A.x,A.y-18);burst(A.x,A.y,12,['#ff5ad0','#ffd84a','#5ad8ff'])}}
   // 底部小口袋
   if(b.y>BOT-6){b.dead=1;const pw=(FR_-14-FL)/7,i=Math.max(0,Math.min(6,Math.floor((b.x-FL)/pw))),v=S.pv[i]*(S.fever?2:1),sc=v*S.lmult*(b.m||1);if(sc>0){S.score+=sc;pop(FL+i*pw+pw/2,BOT-22,v+'×'+S.lmult+(b.m>1?'×'+b.m:'')+'='+sc,sc>=500?'#ff5ad0':'#5ad8ff');if(sc>=500){S.flash=.6;burst(FL+i*pw+pw/2,BOT-10,20,['#ff5ad0','#ffd84a'])}}}});
  S.pv.forEach((v,i)=>{S.pvt[i]-=dt;S.pvp[i]=Math.max(0,S.pvp[i]-dt*3);if(S.pvt[i]<=0){S.pv[i]=wpick(PVAL);S.pvt[i]=.45+Math.random()*.6;S.pvp[i]=1}});
  S.arr=S.arr.filter(b=>!b.dead);S.pegs.forEach(p=>{if(p.h>0)p.h-=dt});S.bump.forEach(q=>q.h=Math.max(0,q.h-dt));
  S.pops.forEach(p=>p.t+=dt);S.pops=S.pops.filter(p=>p.t<1);S.parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=300*dt;p.t+=dt});S.parts=S.parts.filter(p=>p.t<.8);
  if(S.ph=='play'&&S.balls<=0&&!S.arr.length&&!S.spin&&!S.stock&&!S.fever&&!S.over){S.over=1;S.fire=0;say('鋼珠打完了！',2);setTimeout(()=>{if(!S.done){S.over=0;buyUI()}},1200)}};
 function reelStop(){const r=Math.random(),big=r<(S.fever?.25:.11),reach=!big&&r<.32;const d=Math.random()*9+1|0;
  if(big){S.reel=[d,d,d];S.fever=12;S.att.o=12;S.tul.forEach(t=>{t.o=1;t.ot=12});S.flash=1;say(`🎉 ${d}${d}${d} 大當り！FEVER 12 秒！下面的大獎門打開了！`,3);burst(360,250,60,['#ff5ad0','#ffd84a','#5ad8ff','#fff']);give(50,360,250)}
  else if(reach){S.reel=[d,d,(d%9)+1];say('💦 差一點！リーチ！',1.4)}else{S.reel=[d,(d+3)%9+1,(d+5)%9+1]}}
 // 畫面
 const draw=()=>{S.t+=1/60;S.lights+=1/60;
  const bg=g.createLinearGradient(0,0,0,H2);bg.addColorStop(0,'#1a0f2a');bg.addColorStop(1,'#0c0614');g.fillStyle=bg;g.fillRect(0,0,W2,H2);
  // 機台外殼
  g.fillStyle='#c8ccd8';g.beginPath();g.moveTo(110,BOT+20);g.lineTo(110,260);g.arc(360,260,250,Math.PI,0);g.lineTo(610,BOT+20);g.closePath();g.fill();
  const pf=g.createRadialGradient(360,240,40,360,280,300);pf.addColorStop(0,S.fever?'#3a1a5a':'#25406a');pf.addColorStop(1,S.fever?'#140828':'#0d1a33');g.fillStyle=pf;g.beginPath();g.moveTo(FL,BOT);g.lineTo(FL,260);g.arc(360,260,236,Math.PI,0);g.lineTo(FR_,BOT);g.closePath();g.fill();
  // 跑馬燈
  for(let i=0;i<44;i++){const a=Math.PI+i/43*Math.PI,x=360+Math.cos(a)*244,y=260+Math.sin(a)*244,on=((i+(S.lights*12|0))%4)==0;g.fillStyle=on?(S.fever?'#ff5ad0':'#ffe66a'):'#5a4a6a';g.beginPath();g.arc(x,y,4,0,7);g.fill()}
  for(let i=0;i<10;i++){[115,605].forEach((x,k)=>{const on=((i+k+(S.lights*10|0))%3)==0;g.fillStyle=on?'#5ad8ff':'#3a3a5a';g.beginPath();g.arc(x,280+i*22,4,0,7);g.fill()})}
  // 發射軌道
  g.strokeStyle='#e8ecf8';g.lineWidth=2;g.beginPath();g.moveTo(FR_+0,BOT);g.lineTo(FR_+0,260);g.arc(360,260,232,0,-Math.PI*.82,true);g.stroke();g.strokeStyle='rgba(200,210,230,.6)';g.beginPath();g.moveTo(FR_-12,BOT);g.lineTo(FR_-12,262);g.arc(360,260,220,0,-Math.PI*.58,true);g.stroke();
  // 中央液晶
  const L={x:300,y:262,w:120,h:58};g.fillStyle='#000';g.fillRect(L.x-4,L.y-4,L.w+8,L.h+8);const lc=g.createLinearGradient(0,L.y,0,L.y+L.h);lc.addColorStop(0,S.fever?'#ff5ad0':'#2a6aff');lc.addColorStop(1,S.fever?'#7a1a8a':'#0a1a4a');g.fillStyle=lc;g.fillRect(L.x,L.y,L.w,L.h);
  for(let i=0;i<3;i++){const x=L.x+20+i*40,sp=S.spin>0&&(i==2?S.spin>0:S.spin>.4*(2-i));const v=sp?((S.t*30+i*3)|0)%9+1:S.reel[i];g.fillStyle='#fff';g.fillRect(x-14,L.y+8,28,42);mgTxt(g,v+'',x,L.y+42,'bold 32px sans-serif',v==7?'#e02040':'#1a1a4a')}
  if(S.stock)for(let i=0;i<S.stock;i++){g.fillStyle='#ffd84a';g.beginPath();g.arc(L.x+10+i*12,L.y+L.h+12,4,0,7);g.fill()}
  // 入賞口
  {const C=S.chuck;g.fillStyle='#ffd84a';g.fillRect(C.x-16,C.y+2,32,6);g.fillStyle='#e02040';g.fillRect(C.x-10,C.y-4,20,8);mgTxt(g,'START',C.x,C.y+20,'bold 9px sans-serif','#ffd84a')}
  // 釘子
  S.pegs.forEach(p=>{g.fillStyle=p.h>0?'#fff6a0':'#c8ccd8';g.beginPath();g.arc(p.x,p.y,1.8,0,7);g.fill()});
  // 風車
  S.mills.forEach(m=>{g.save();g.translate(m.x,m.y);g.rotate(m.a);for(let k=0;k<4;k++){g.rotate(Math.PI/2);g.fillStyle=k%2?'#ff5ad0':'#5ad8ff';g.beginPath();g.moveTo(0,-3);g.lineTo(24,-6);g.lineTo(24,6);g.lineTo(0,3);g.fill()}g.fillStyle='#fff';g.beginPath();g.arc(0,0,5,0,7);g.fill();g.restore()});
  // 轉盤
  {const D=S.disk;g.save();g.translate(D.x,D.y);g.rotate(D.a);for(let k=0;k<8;k++){g.fillStyle=k%2?'#ffd84a':'#e02040';g.beginPath();g.moveTo(0,0);g.arc(0,0,D.r,k*Math.PI/4,(k+1)*Math.PI/4);g.fill()}g.fillStyle='#fff';g.beginPath();g.arc(0,0,8,0,7);g.fill();g.restore();g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(D.x,D.y,D.r,0,7);g.stroke()}
  // 彈跳柱
  S.bump.forEach(q=>{const r=11+q.h*12;const gr=g.createRadialGradient(q.x,q.y,2,q.x,q.y,r);gr.addColorStop(0,'#fff');gr.addColorStop(1,q.h>0?'#ff5ad0':'#a03ae0');g.fillStyle=gr;g.beginPath();g.arc(q.x,q.y,r,0,7);g.fill()});
  // 鬱金香
  S.tul.forEach(t=>{const o=t.o?1:0;g.fillStyle='#ff8ab0';[-1,1].forEach(sd=>{g.save();g.translate(t.x+sd*(o?20:10),t.y-6);g.rotate(sd*(o?.7:.1));g.beginPath();g.ellipse(0,0,6,12,0,0,7);g.fill();g.restore()});g.fillStyle='#ffe0ea';g.fillRect(t.x-8,t.y,16,6)});
  // 大獎門
  {const A=S.att;g.fillStyle=A.o>0?'#ffd84a':'#6a5a7a';g.fillRect(A.x-A.w/2,A.y,A.w,8);if(A.o>0){g.save();g.globalAlpha=.4+.3*Math.sin(S.t*12);g.fillStyle='#fff';g.fillRect(A.x-A.w/2,A.y-6,A.w,6);g.restore();mgTxt(g,'OPEN!',A.x,A.y-10,'bold 13px sans-serif','#ffd84a')}}
  // 底部口袋
  {const pw=(FR_-14-FL)/7;for(let i=0;i<7;i++){const x=FL+i*pw,v=S.pv[i];g.fillStyle=v>=100?'#7a1a4a':v>=50?'#5a2a7a':v==0?'#1a1a22':'#2a2a4a';g.fillRect(x+2,BOT-26,pw-4,26);g.fillStyle='#ffd84a';g.fillRect(x,BOT-28,2,28);mgTxt(g,v+'',x+pw/2,BOT-8,`bold ${16+S.pvp[i]*8|0}px sans-serif`,v>=100?'#ff5ad0':v>=50?'#ffd84a':v==0?'#666':'#fff')}}
  // 鋼珠
  S.arr.forEach(b=>{const gr=g.createRadialGradient(b.x-1.5,b.y-1.5,.5,b.x,b.y,R);gr.addColorStop(0,'#fff');gr.addColorStop(.5,'#c8ccd8');gr.addColorStop(1,'#5a5e6a');g.fillStyle=gr;g.beginPath();g.arc(b.x,b.y,R,0,7);g.fill()});
  S.parts.forEach(p=>{g.globalAlpha=1-p.t/.8;g.fillStyle=p.c;g.fillRect(p.x,p.y,3,3)});g.globalAlpha=1;
  S.pops.forEach(p=>{g.globalAlpha=1-p.t;mgTxt(g,p.s,p.x,p.y-p.t*30,'bold 15px sans-serif',p.c)});g.globalAlpha=1;
  if(S.flash>0){g.fillStyle=`rgba(255,240,180,${S.flash*.6})`;g.fillRect(0,0,W2,H2);S.flash=Math.max(0,S.flash-.02)}
  // 下方托盤 HUD
  g.fillStyle='#2a2a38';g.fillRect(0,BOT+20,W2,H2-BOT-20);
  g.fillStyle='rgba(0,0,0,.6)';g.fillRect(6,6,320,52);mgTxt(g,`🔘 鋼珠 ${S.balls}`,14,28,'bold 17px sans-serif','#fff','left');mgTxt(g,`⭐ 分數 ${S.score}`,170,28,'bold 17px sans-serif','#ffd84a','left');mgTxt(g,`🎯 幸運倍率 ×${S.lmult}　押注 ×${S.mul}`,14,50,'bold 13px sans-serif','#5ad8ff','left');
  g.fillStyle='rgba(0,0,0,.6)';g.fillRect(W2-156,6,150,52);g.fillStyle='#000';g.fillRect(W2-146,36,130,12);g.fillStyle='#5ad8ff';g.fillRect(W2-146,36,130*S.pow,12);mgTxt(g,'💪 發射力道',W2-146,28,'bold 13px sans-serif','#fff','left');
  if(S.fever>0)mgTxt(g,`🎉 FEVER ${Math.ceil(S.fever)}`,W2-16,82,'bold 18px sans-serif','#ff5ad0','right');
  if(S.ph=='mult'){S.mt2=(S.mt2||0)+1/60;const v=PMULT[Math.floor(S.mt2*14)%PMULT.length][0];g.fillStyle='rgba(0,0,0,.7)';g.fillRect(200,170,320,150);g.strokeStyle='#ffd84a';g.lineWidth=4;g.strokeRect(200,170,320,150);mgTxt(g,'🎯 幸運倍率',360,205,'bold 22px sans-serif','#fff');mgTxt(g,'×'+v,360,285,'bold 68px sans-serif',v>=20?'#ff5ad0':v>=5?'#ffd84a':'#5ad8ff');if(S.mt2>4)lockM()}
  if(S.mt>0){S.mt-=1/60;g.fillStyle='rgba(0,0,0,.55)';g.fillRect(140,200,440,34);mgTxt(g,S.msg,360,223,'bold 17px sans-serif','#fff')}};
 let last=performance.now();const loop=now=>{if(S.done&&!S.arr.length){draw();return}const dt=Math.min(.033,(now-last)/1000);last=now;if(S.ph=='play'||S.arr.length){step(dt/2);step(dt/2)}draw();requestAnimationFrame(loop)};
 buyUI();requestAnimationFrame(loop)}

// ═════════════════════════ 🏎️ 卡丁車（第一人稱往前跑） ═════════════════════════
function kartPro(){const M=mgBox('🏎️ 小鎮卡丁車大賽'),g=M.g,W2=720,H2=520;
 const SEGL=200,RW=2000,CAMH=1000,DRAW=180,FOV=100,CD=1/Math.tan(FOV/2*Math.PI/180);
 const segs=[];const add=(n,c,h)=>{const y0=segs.length?segs[segs.length-1].y:0;for(let i=0;i<n;i++){const k=i/n,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;segs.push({i:segs.length,c:c*(k<.25?k*4:k>.75?(1-k)*4:1),y:y0+h*e*SEGL,cars:[]})}};
 add(60,0,0);add(80,3,10);add(40,0,-6);add(90,-4,0);add(50,0,14);add(70,5,-10);add(60,-2,0);add(100,-5,8);add(60,0,-14);add(80,4,0);add(70,-3,6);add(60,0,-8);
 segs.forEach(s=>{s.boost=(s.i%300>40&&s.i%300<46);s.dec=(s.i%23==0)?(s.i%46?'tree':'sign'):null;s.side=s.i%2?1:-1});
 const LEN=segs.length*SEGL,LAPS=3,MAXS=SEGL*58;
 const P={z:0,x:0,s:0,lap:1,t:0,nitro:3,nit:0,boost:0,wob:0,best:0};
 const RIV=[['柏凱','#e02040',.93],['禹豪','#2a7aff',.9],['哲良','#ff8a2a',.95],['RITA','#d05aff',.87],['以倫','#2aa04a',.91]].map((q,i)=>({n:q[0],c:q[1],sp:q[2],z:(i+1)*SEGL*3,x:[-.5,.4,0,-.3,.5][i],lap:1,dx:0}));
 const K={};let started=false,cd=3,done=false,res=null;
 const kd=e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown','a','d','w','s',' '].includes(k)){K[k]=1;e.preventDefault()}if(k==' '&&started&&P.nitro>0&&P.nit<=0){P.nitro--;P.nit=2.2}if(k=='escape')quit()};
 const ku=e=>{K[e.key.toLowerCase()]=0};OVK.add(kd);OVKU.add(ku);
 const hb=(t,k)=>[t,v=>{K[k]=v},1];M.bt.innerHTML='';[['⬅',..._h('arrowleft')],['🚀 氮氣',()=>{if(started&&P.nitro>0&&P.nit<=0){P.nitro--;P.nit=2.2}}],['🛑 煞車',..._h('arrowdown')],['➡',..._h('arrowright')]].forEach(q=>{const b=document.createElement('button');b.textContent=q[0];b.style.cssText='font:inherit;font-size:16px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:10px 16px;touch-action:none;user-select:none;min-width:64px';if(q[2]){b.onpointerdown=e=>{e.preventDefault();q[1](1)};['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>q[1](0)))}else b.onclick=q[1];M.bt.appendChild(b)});
 function _h(k){return[v=>{K[k]=v},1]}
 M.tip.innerHTML='車子會自己加速！←→ 轉彎、↓ 煞車、空白鍵 <b>氮氣</b>（3 次）。壓到<b style="color:#e0a020">黃色加速帶</b>會衝刺，開出路面會變慢。';
 function quit(){if(done)return;done=true;OVK.delete(kd);OVKU.delete(ku);M.end();try{arcadeMenu()}catch(e){}}
 const segAt=z=>segs[Math.floor(((z%LEN)+LEN)%LEN/SEGL)];
 const rank=()=>1+RIV.filter(r=>(r.lap-1)*LEN+r.z>(P.lap-1)*LEN+P.z).length;
 function finish(){done=true;OVK.delete(kd);OVKU.delete(ku);const pos=rank(),tix=[0,30,20,14,10,8,6][pos];st.tix=(st.tix||0)+tix;st.cnt.arcade=(st.cnt.arcade||0)+1;fxApply({j:pos<=3?12:6});advance(.5);hud();SVDIRTY=1;
  res={pos,tix};M.tip.innerHTML=`🏁 第 <b>${pos}</b> 名！時間 ${P.t.toFixed(1)} 秒　🎟️ 彩票 +${tix}（合計 ${st.tix}）`;mgButtons(M,[['再跑一場（🪙3）',()=>{if(st.coin<3)return toast('遊戲幣不足');st.coin-=3;hud();M.end();kartPro()}],['離開',()=>{M.end();try{arcadeMenu()}catch(e){}}]])}
 const up=dt=>{if(!started){cd-=dt;if(cd<=0)started=true;return}if(done)return;P.t+=dt;
  const seg=segAt(P.z),off=Math.abs(P.x)>1,spdPct=P.s/MAXS;
  let acc=MAXS/3.2;if(K.arrowdown||K.s)P.s-=MAXS*1.6*dt;else P.s+=acc*dt;
  const tmax=MAXS*(off?.45:1)*(P.nit>0?1.45:1)*(P.boost>0?1.3:1);if(P.s>tmax)P.s=Math.max(tmax,P.s-MAXS*1.2*dt);if(P.s<0)P.s=0;
  P.nit-=dt;P.boost-=dt;if(seg.boost&&Math.abs(P.x)<.6&&P.boost<=0){P.boost=1.2}
  const steer=((K.arrowright||K.d)?1:0)-((K.arrowleft||K.a)?1:0);P.x+=steer*dt*2.3*Math.max(.4,spdPct);P.x-=dt*2*spdPct*spdPct*seg.c*.11;P.sky=(P.sky||0)+seg.c*spdPct*dt*60;P.x=Math.max(-2.2,Math.min(2.2,P.x));P.wob=steer;
  P.z+=P.s*dt;if(P.z>=LEN){P.z-=LEN;P.lap++;if(P.lap>LAPS){finish();return}}
  RIV.forEach(r=>{const rs=segAt(r.z);const want=MAXS*r.sp*(1-Math.abs(rs.c)*.03);r.v=r.v==null?0:r.v+(want-r.v)*Math.min(1,dt*.8);r.z+=r.v*dt;if(r.z>=LEN){r.z-=LEN;r.lap++}
   r.x+=(Math.sin(P.t*.7+r.sp*9)*.5-r.x)*dt*.5;
   // 碰撞
   const dz=((r.z-P.z)%LEN+LEN)%LEN;if(r.lap==P.lap||Math.abs(r.lap-P.lap)<=1){if(dz<SEGL*.9&&Math.abs(r.x-P.x)<.45&&P.s>r.v){P.s=r.v*.8;P.x+=P.x<r.x?-.2:.2}}});};
 const proj=(x,y,z,camX,camY,camZ)=>{const tz=z-camZ;const sc=CD/tz;return{X:W2/2+sc*(x-camX)*W2/2,Y:H2/2-sc*(y-camY)*H2/2,Wd:sc*RW*W2/2,sc}};
 const poly=(x1,y1,w1,x2,y2,w2,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(x1-w1,y1);g.lineTo(x2-w2,y2);g.lineTo(x2+w2,y2);g.lineTo(x1+w1,y1);g.closePath();g.fill()};
 const draw=()=>{const base=segAt(P.z),bp=(P.z%SEGL)/SEGL,camY=CAMH+base.y+(segs[(base.i+1)%segs.length].y-base.y)*bp;
  const sk=g.createLinearGradient(0,0,0,H2/2);sk.addColorStop(0,'#3a8ae0');sk.addColorStop(1,'#bfe4ff');g.fillStyle=sk;g.fillRect(0,0,W2,H2);
  // 遠山（跟著彎道轉）
  const par=(P.sky||0)*-1+P.x*-20;g.fillStyle='#6a9a7a';g.beginPath();g.moveTo(0,H2/2+10);for(let x=0;x<=W2;x+=30)g.lineTo(x,H2/2-30-Math.sin((x+par+P.t*0)*.012)*28-Math.sin((x+par)*.031)*12);g.lineTo(W2,H2/2+10);g.fill();
  g.fillStyle='#4a7a5a';g.beginPath();g.moveTo(0,H2/2+10);for(let x=0;x<=W2;x+=24)g.lineTo(x,H2/2-8-Math.sin((x+par*1.6)*.02)*14);g.lineTo(W2,H2/2+10);g.fill();
  g.fillStyle='#fff';g.globalAlpha=.85;[[120,60],[420,40],[620,80]].forEach(([x,y])=>{const xx=((x+par*.3)%W2+W2)%W2;g.beginPath();g.ellipse(xx,y,40,12,0,0,7);g.ellipse(xx+24,y-6,26,12,0,0,7);g.fill()});g.globalAlpha=1;
  let maxy=H2,x=0,dx=-(base.c*bp);const SP=[];
  for(let n=0;n<DRAW;n++){const idx=base.i+n,s=segs[idx%segs.length],s2=segs[(idx+1)%segs.length],loop=idx>=segs.length?LEN:0;
   const z1=s.i*SEGL+loop,z2=z1+SEGL;
   const a=proj(0,s.y,z1,P.x*RW-x,camY,P.z),b=proj(0,s2.y,z2,P.x*RW-x-dx,camY,P.z);
   x+=dx;dx+=s.c;s._a=null;
   if(z1-P.z<=CD*10||b.Y>=maxy||b.Y>=a.Y)continue;
   s._a=a;s._clip=maxy;const odd=Math.floor(s.i/3)%2;
   g.fillStyle=odd?'#5aa84a':'#4e9a40';g.fillRect(0,b.Y,W2,a.Y-b.Y+1);
   poly(a.X,a.Y,a.Wd*1.18,b.X,b.Y,b.Wd*1.18,odd?'#e02020':'#f4f4f4');
   poly(a.X,a.Y,a.Wd,b.X,b.Y,b.Wd,s.boost?(odd?'#ffd84a':'#e8b020'):odd?'#6a6a72':'#62626a');
   if(odd&&!s.boost)[-.33,.33].forEach(l=>poly(a.X+a.Wd*l,a.Y,a.Wd*.02,b.X+b.Wd*l,b.Y,b.Wd*.02,'#f4f4f4'));
   SP.push(s);maxy=b.Y}
  // 路邊裝飾與對手（由遠到近）
  for(let i=SP.length-1;i>=0;i--){const s=SP[i],a=s._a;if(!a||a.sc<=0)continue;
   if(s.dec){const sx=a.X+s.side*a.Wd*1.6,sz=a.sc*W2*900;if(s.dec=='tree'){g.fillStyle='#6a4a2a';g.fillRect(sx-sz*.06,a.Y-sz*.5,sz*.12,sz*.5);g.fillStyle='#2a7a3a';g.beginPath();g.arc(sx,a.Y-sz*.6,sz*.28,0,7);g.fill()}else{g.fillStyle='#ddd';g.fillRect(sx-sz*.02,a.Y-sz*.5,sz*.04,sz*.5);g.fillStyle='#ffd84a';g.fillRect(sx-sz*.25,a.Y-sz*.65,sz*.5,sz*.2);mgTxt(g,'小鎮',sx,a.Y-sz*.5,`bold ${Math.max(6,sz*.12)|0}px sans-serif`,'#3a2210')}}
   RIV.forEach(r=>{const rz=r.z%LEN;if(Math.floor(rz/SEGL)!=s.i)return;const sc=a.sc,cx=a.X+r.x*a.Wd,w=a.Wd*.5,h=w*.6;if(w<3||a.Y>s._clip+2)return;
    g.fillStyle='rgba(0,0,0,.3)';g.fillRect(cx-w/2,a.Y-h*.1,w,h*.15);g.fillStyle=r.c;g.fillRect(cx-w/2,a.Y-h*.7,w,h*.6);g.fillStyle='#222';g.fillRect(cx-w*.5,a.Y-h*.25,w*.2,h*.3);g.fillRect(cx+w*.3,a.Y-h*.25,w*.2,h*.3);
    g.fillStyle='#f2c7a5';g.beginPath();g.arc(cx,a.Y-h*.95,w*.16,0,7);g.fill();g.fillStyle='#222';g.fillRect(cx-w*.17,a.Y-h*1.12,w*.34,h*.12);if(w>26)mgTxt(g,r.n,cx,a.Y-h*1.25,`bold ${Math.min(16,w*.25)|0}px sans-serif`,'#fff')})}
  // 自己的卡丁車（後視）
  const cx=W2/2,cy=H2-60,bob=Math.sin(P.t*30)*P.s/MAXS*1.5,tilt=P.wob*.06;g.save();g.translate(cx,cy+bob);g.rotate(tilt);
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,40,120,14,0,0,7);g.fill();
  g.fillStyle='#1a1a1a';g.fillRect(-118,6,46,40);g.fillRect(72,6,46,40);g.fillStyle='#d33a2a';g.beginPath();g.moveTo(-90,-10);g.lineTo(90,-10);g.lineTo(104,30);g.lineTo(-104,30);g.closePath();g.fill();
  g.fillStyle='#ffd84a';g.fillRect(-60,10,120,8);g.fillStyle='#222';g.fillRect(-40,22,80,10);if(P.nit>0||P.boost>0){g.fillStyle=`rgba(255,${120+Math.random()*100|0},40,.9)`;[-24,24].forEach(x=>{g.beginPath();g.moveTo(x-8,32);g.lineTo(x+8,32);g.lineTo(x,50+Math.random()*24);g.fill()})}
  g.fillStyle='#2a3a6a';g.fillRect(-26,-56,52,48);g.fillStyle='#f2c7a5';g.beginPath();g.arc(0,-70,18,0,7);g.fill();g.fillStyle='#d33';g.beginPath();g.arc(0,-74,20,Math.PI,0);g.fill();g.fillStyle='#fff';g.fillRect(-20,-76,40,4);
  g.strokeStyle='#333';g.lineWidth=6;g.beginPath();g.moveTo(-28,-36);g.lineTo(-44,-20);g.moveTo(28,-36);g.lineTo(44,-20);g.stroke();g.restore();
  // 速度線
  if(P.s>MAXS*.8){g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;for(let i=0;i<10;i++){const a=Math.random()*6.28,r1=200+Math.random()*80;g.beginPath();g.moveTo(W2/2+Math.cos(a)*r1,H2/2+Math.sin(a)*r1*.6);g.lineTo(W2/2+Math.cos(a)*(r1+80),H2/2+Math.sin(a)*(r1+80)*.6);g.stroke()}}
  // HUD
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(10,10,200,66);mgTxt(g,`🏁 第 ${Math.min(LAPS,P.lap)}/${LAPS} 圈`,20,34,'bold 18px sans-serif','#fff','left');mgTxt(g,`🏆 第 ${rank()} 名　⏱ ${P.t.toFixed(1)}`,20,62,'bold 16px sans-serif','#ffd84a','left');
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(W2-190,10,180,66);mgTxt(g,`${Math.round(P.s/MAXS*120)} km/h`,W2-20,38,'bold 22px sans-serif','#fff','right');mgTxt(g,'🚀'.repeat(P.nitro)+'　'.repeat(3-P.nitro),W2-20,64,'16px sans-serif','#fff','right');
  // 小地圖（進度條）
  g.fillStyle='rgba(0,0,0,.45)';g.fillRect(230,16,260,12);RIV.forEach(r=>{g.fillStyle=r.c;g.fillRect(230+(r.z/LEN)*256,14,4,16)});g.fillStyle='#fff';g.fillRect(230+(P.z/LEN)*256-2,12,6,20);
  if(!started)mgTxt(g,cd>0?Math.ceil(cd)+'':'GO!',W2/2,H2/2-40,'bold 90px sans-serif','#fff');
  if(res)mgTxt(g,`🏁 第 ${res.pos} 名！`,W2/2,H2/2-40,'bold 60px sans-serif','#ffd84a')};
 let last=performance.now();const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;up(dt);draw();if(!done||res)requestAnimationFrame(loop)};requestAnimationFrame(loop)}

// 遊藝場入口改成新版本
{const _pg=playGame;playGame=function(k,o){o=o||{};if(k=='pachi'&&!o.free){closeDlg();return pachiPro()}if(k=='kart'&&!o.free){closeDlg();if(st.coin<3)return toast('遊戲幣不足（要 🪙3）');st.coin-=3;hud();return kartPro()}return _pg.apply(this,arguments)}}

// ═════════════════════════ 🏀 三分球大賽（美化：站在射手後面看籃框） ═════════════════════════
threeGame=function(){const M=mgBox('🏀 三分球大賽'),g=M.g,W2=720,H2=520,bk=st.bk&&st.bk.met;
 const S={rack:0,ball:0,sc:0,p:0,dir:1,shot:null,done:false,msg:'',mt:0,res:[],t:0,net:0,cam:0,crowd:0},SPOT=['左底角','左翼','弧頂','右翼','右底角'],sweet=[.47,.5,.53,.5,.47],CAMX=[-170,-90,0,90,170];
 const rival=bk?{n:'柏凱',sc:Math.round(15+Math.random()*9)}:{n:'球場紀錄',sc:(st.three&&st.three.best)||12};
 const fans=[];for(let i=0;i<70;i++)fans.push({x:i*11+Math.random()*6-20,y:30+(i%4)*26+Math.random()*6,c:['#e0443a','#2a7aff','#ffd84a','#2aa04a','#fff','#d05aff'][i%6],s:['#f2c7a5','#c8956a','#ffdcb8'][i%3],ph:Math.random()*6});
 const spd=()=>1.25+S.rack*.18;
 const shoot=()=>{if(S.done||S.shot)return;const d=Math.abs(S.p-sweet[S.rack]),win=.05-S.rack*.004,mb=S.ball==4,ok=d<win||(d<win*2&&Math.random()<.35),perfect=d<win*.35;
  S.shot={t:0,ok,off:(S.p-sweet[S.rack]),perfect};if(ok){S.sc+=mb?2:1;S.msg=perfect?(mb?'✨ PERFECT 彩球！+2':'✨ PERFECT！'):mb?'💰 彩球進了！+2':'唰！';S.res.push(mb?2:1)}else{S.msg=S.p<sweet[S.rack]?'太短了…':'太大力了…';S.res.push(0)}S.mt=.9};
 const kd=e=>{if(e.key==' '||e.key=='Enter'||e.key=='j'){e.preventDefault();shoot()}else if(e.key=='Escape')fin()};OVK.add(kd);
 mgBtn(M,[['🏀 出手！',shoot]]);M.tip.textContent='力道條跑到綠色區按空白鍵出手。每個點 5 球，最後一顆彩球算 2 分！';
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);const T3=st.three||(st.three={best:0,n:0,winBk:0});T3.n++;const pb=S.sc>T3.best;if(pb)T3.best=S.sc;const win=S.sc>rival.sc;
  if(win&&bk){T3.winBk++;try{frAdd('bokai',3,1)}catch(e){}}fxApply({s:-12,p:1,j:win?12:6});advance(1);hud();SVDIRTY=1;
  setTimeout(()=>{g.fillStyle='rgba(20,12,6,.86)';g.fillRect(0,0,W2,H2);mgTxt(g,`你 ${S.sc} 分　vs　${rival.n} ${rival.sc} 分`,W2/2,190,'bold 40px sans-serif','#ffd84a');
   mgTxt(g,win?(bk?'柏凱：「好球！下次我不會讓你了。」':'🎉 破了球場紀錄！'):S.sc==rival.sc?'平手！':(bk?'柏凱：「手腕再放鬆一點，跟著腿的力量出手。」':'差一點點！'),W2/2,250,'22px sans-serif','#fff');
   if(pb)mgTxt(g,'🏅 個人最佳 '+S.sc+' 分',W2/2,300,'bold 24px sans-serif','#ffb04a');
   if(win&&bk&&T3.winBk==1){st.money+=500;hud();mgTxt(g,'柏凱願賭服輸，請你喝了一杯珍奶（💰+500 等值）',W2/2,340,'18px sans-serif','#fff')}},900);
  mgButtons(M,[['再比一場',()=>{if(st.sta<12)return toast('體力不夠了');M.end();threeGame()}],['離開',()=>M.end()]])};
 const HX=()=>W2/2-S.cam*.9,HY=168;
 let last=performance.now();
 const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;S.net=Math.max(0,S.net-dt);S.crowd=Math.max(0,S.crowd-dt);
  if(!S.done){S.cam+=(CAMX[Math.min(4,S.rack)]-S.cam)*Math.min(1,dt*3);
   if(!S.shot){S.p+=S.dir*spd()*dt;if(S.p>1){S.p=1;S.dir=-1}if(S.p<0){S.p=0;S.dir=1}}else{S.shot.t+=dt;if(S.shot.ok&&S.shot.t>.82&&!S.shot.sw){S.shot.sw=1;S.net=.6;S.crowd=1}if(S.shot.t>1.35){S.shot=null;S.ball++;S.p=0;S.dir=1;if(S.ball>=5){S.ball=0;S.rack++;if(S.rack>=5){fin()}}}}}
  const hx=HX(),hy=HY;
  // 觀眾席
  const bg=g.createLinearGradient(0,0,0,220);bg.addColorStop(0,'#14101e');bg.addColorStop(1,'#2a2238');g.fillStyle=bg;g.fillRect(0,0,W2,230);
  for(let i=0;i<6;i++){g.fillStyle='rgba(255,240,200,.08)';g.beginPath();g.moveTo(60+i*120,0);g.lineTo(20+i*120,230);g.lineTo(100+i*120,230);g.fill()}
  fans.forEach(f=>{const jump=S.crowd>0?Math.abs(Math.sin(S.t*14+f.ph))*8:Math.sin(S.t*2+f.ph)*1.5,x=((f.x-S.cam*.25)%760+760)%760-20;g.fillStyle=f.c;g.fillRect(x-6,f.y+8-jump,12,14);g.fillStyle=f.s;g.beginPath();g.arc(x,f.y+3-jump,5,0,7);g.fill();if(S.crowd>0&&f.ph>3){g.fillStyle=f.s;g.fillRect(x-8,f.y-8-jump,3,10);g.fillRect(x+5,f.y-8-jump,3,10)}});
  // 地板（透視）
  const fl=g.createLinearGradient(0,220,0,H2);fl.addColorStop(0,'#b97a3d');fl.addColorStop(1,'#d89a58');g.fillStyle=fl;g.fillRect(0,220,W2,H2-220);
  g.strokeStyle='rgba(120,70,20,.25)';g.lineWidth=1;for(let i=-20;i<=20;i++){g.beginPath();g.moveTo(hx+i*20,220);g.lineTo(hx+i*90-S.cam*.4,H2);g.stroke()}
  // 禁區＋三分線
  g.fillStyle='rgba(200,60,40,.75)';g.beginPath();g.moveTo(hx-60,222);g.lineTo(hx+60,222);g.lineTo(hx+120,330);g.lineTo(hx-120,330);g.fill();
  g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.moveTo(hx-60,222);g.lineTo(hx-120,330);g.lineTo(hx+120,330);g.lineTo(hx+60,222);g.stroke();
  g.beginPath();g.ellipse(hx,330,60,14,0,0,Math.PI);g.stroke();g.beginPath();g.ellipse(hx,222,330,210,0,0,Math.PI);g.stroke();
  // 籃架
  g.fillStyle='#555';g.fillRect(hx-6,hy-10,12,60);g.fillStyle='#2a2a2a';g.fillRect(hx-30,206,60,14);
  g.fillStyle='rgba(240,248,255,.92)';g.fillRect(hx-78,hy-110,156,96);g.strokeStyle='#e0443a';g.lineWidth=3;g.strokeRect(hx-78,hy-110,156,96);g.strokeRect(hx-28,hy-60,56,40);
  // 籃網
  const sw=S.net>0?Math.sin(S.net*30)*S.net*6:Math.sin(S.t*2)*1;g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.5;for(let i=0;i<=8;i++){const x0=hx-22+i*5.5;g.beginPath();g.moveTo(x0,hy);g.quadraticCurveTo(x0+sw,hy+18,hx-12+i*3+sw*1.5,hy+34+(S.net>0?S.net*10:0));g.stroke()}
  for(let j=1;j<4;j++){g.beginPath();g.moveTo(hx-22+j*2,hy+j*9);g.lineTo(hx+22-j*2,hy+j*9);g.stroke()}
  g.strokeStyle='#ff6a20';g.lineWidth=4;g.beginPath();g.ellipse(hx,hy,24,6,0,0,7);g.stroke();
  // 射手（背影）
  const shooting=S.shot&&S.shot.t<.35,px=W2/2,py=430;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(px,py+86,46,10,0,0,7);g.fill();
  g.fillStyle='#1a1a1a';g.fillRect(px-22,py+40,16,46);g.fillRect(px+6,py+40,16,46);g.fillStyle='#2a3a8a';g.fillRect(px-28,py+20,56,30);
  g.fillStyle='#e0443a';g.fillRect(px-30,py-34,60,58);mgTxt(g,'18',px,py+4,'bold 26px sans-serif','#fff');mgTxt(g,'ALLEN',px,py-16,'bold 11px sans-serif','#fff');
  g.fillStyle='#d8a07a';const arm=shooting?-70:-20;g.save();g.translate(px-28,py-28);g.rotate(shooting?-.3:.5);g.fillRect(-6,arm,12,-arm);g.restore();g.save();g.translate(px+28,py-28);g.rotate(shooting?.3:-.5);g.fillRect(-6,arm,12,-arm);g.restore();
  g.fillStyle='#1a1410';g.beginPath();g.arc(px,py-50,20,0,7);g.fill();g.fillStyle='#d8a07a';g.fillRect(px-20,py-48,4,10);g.fillRect(px+16,py-48,4,10);
  // 球
  const ballAt=(x,y,r,rot)=>{g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,Math.min(H2-10,y+60+r*4),r,r*.3,0,0,7);g.fill();g.fillStyle='#e8762c';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#5a2a10';g.lineWidth=1.5;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.beginPath();g.moveTo(x-r*Math.cos(rot),y-r*Math.sin(rot));g.lineTo(x+r*Math.cos(rot),y+r*Math.sin(rot));g.stroke();g.beginPath();g.ellipse(x,y,r*.45,r,rot,0,7);g.stroke()};
  if(S.shot){const T=S.shot,k=Math.min(1,T.t/.82),sx=px,sy=py-80,ex=hx+(T.ok?0:T.off*140),ey=hy-4;
   if(k<1){ballAt(sx+(ex-sx)*k,sy+(ey-sy)*k-Math.sin(k*Math.PI)*190,15-k*6,T.t*14)}
   else{const k2=(T.t-.82)/.5;if(T.ok)ballAt(hx,hy+k2*90,9,T.t*10);else{const dirx=T.off<0?-1:1;ballAt(ex+dirx*k2*120,hy-Math.sin(k2*Math.PI)*60+k2*120,9,T.t*10)}}}
  else if(!S.done)ballAt(px+Math.sin(S.t*6)*2,py-80+Math.abs(Math.sin(S.t*6))*3,15,0);
  // 球架
  for(let i=0;i<5;i++){const r=S.res[S.rack*5+i],used=i<S.ball;g.globalAlpha=used?.3:1;g.fillStyle=i==4?'#f0c030':'#e8762c';g.beginPath();g.arc(40+i*28,H2-26,11,0,7);g.fill();g.globalAlpha=1;if(used){mgTxt(g,r?'✔':'✖',40+i*28,H2-20,'bold 14px sans-serif',r?'#2f7a3a':'#c33')}}
  // 小地圖（五個點）
  g.fillStyle='rgba(0,0,0,.5)';g.fillRect(14,236,120,70);g.strokeStyle='#fff';g.lineWidth=1.5;g.beginPath();g.arc(74,240,56,0,Math.PI);g.stroke();[[24,244],[34,280],[74,294],[114,280],[124,244]].forEach(([x,y],i)=>{g.fillStyle=i==S.rack?'#ffd84a':i<S.rack?'#7ad06a':'rgba(255,255,255,.4)';g.beginPath();g.arc(x,y,6,0,7);g.fill()});
  // 力道條
  const bx=W2-60,by=240,bh=240;g.fillStyle='rgba(0,0,0,.7)';g.fillRect(bx-4,by-4,38,bh+8);const sw2=sweet[Math.min(4,S.rack)],ww=(.05-Math.min(4,S.rack)*.004)*bh;g.fillStyle='#3cd070';g.fillRect(bx,by+bh*(1-sw2)-ww,30,ww*2);g.fillStyle='#b8ffcc';g.fillRect(bx,by+bh*(1-sw2)-ww*.35,30,ww*.7);
  const pg=g.createLinearGradient(0,by+bh,0,by);pg.addColorStop(0,'#2a6aff');pg.addColorStop(1,'#ff4a3a');g.fillStyle=pg;g.globalAlpha=.35;g.fillRect(bx,by+bh*(1-S.p),30,bh*S.p);g.globalAlpha=1;g.fillStyle='#ffd84a';g.fillRect(bx-8,by+bh*(1-S.p)-3,46,6);mgTxt(g,'力道',bx+15,by-12,'bold 15px sans-serif','#fff');
  // 計分板
  g.fillStyle='#111';g.fillRect(W2/2-150,6,300,40);g.strokeStyle='#ffd84a';g.lineWidth=2;g.strokeRect(W2/2-150,6,300,40);mgTxt(g,`ALLEN ${S.sc}`,W2/2-70,34,'bold 22px monospace','#ff5a3a');mgTxt(g,`${rival.n} ${rival.sc}`,W2/2+75,34,'bold 20px monospace','#5ad8ff');
  mgTxt(g,`${SPOT[Math.min(4,S.rack)]}・第 ${Math.min(5,S.ball+1)} 球${S.ball==4?'（彩球）':''}`,W2-20,H2-16,'bold 18px sans-serif','#fff','right');
  if(S.mt>0)mgTxt(g,S.msg,W2/2,120,'bold 34px sans-serif',S.msg.includes('PERFECT')?'#ffd84a':'#fff');
  if(!S.done||S.t<200)requestAnimationFrame(loop)};requestAnimationFrame(loop)};
