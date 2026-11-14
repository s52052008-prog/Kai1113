/* v13.6 遊戲畫面放大成滿版；卡丁車 3.0：↑ 加速、L 甩尾集氣（放開噴射）、氣滿存氮氣、空白鍵放氮氣；對手變強、路上有三角錐／油漬／油桶 */
function mgBoxBig(title){const M=mgBox(title),box=M.ov.firstElementChild;box.style.padding='6px 8px 8px';box.style.gap='4px';box.style.maxWidth='none';
 M.cv.style.width='min(98vw, calc((100vh - 118px) * 720 / 520))';M.cv.style.height='auto';M.tip.style.fontSize='12.5px';M.tip.style.minHeight='0';M.tip.style.lineHeight='1.4';return M}
function kartPro(){const M=mgBoxBig('🏎️ 小鎮卡丁車大賽'),g=M.g,W2=720,H2=520;
 const SEGL=200,RW=2000,CAMH=1000,DRAW=180,CD=1/Math.tan(50*Math.PI/180);
 const segs=[];const add=(n,c,h)=>{const y0=segs.length?segs[segs.length-1].y:0;for(let i=0;i<n;i++){const k=i/n,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;segs.push({i:segs.length,c:c*(k<.2?k*5:k>.8?(1-k)*5:1),y:y0+h*e*SEGL})}};
 add(50,0,0);add(70,4,10);add(30,0,-6);add(80,-6,0);add(40,0,14);add(60,7,-10);add(30,-3,0);add(90,-6,8);add(40,0,-14);add(70,6,0);add(30,0,0);add(60,-7,6);add(50,4,-8);add(40,0,0);
 segs.forEach(s=>{s.boost=(s.i%240>30&&s.i%240<35);s.dec=(s.i%19==0)?(s.i%38?'tree':'sign'):null;s.side=s.i%2?1:-1;s.ob=[]});
 // 障礙物
 const OBS=[];let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
 for(let i=90;i<segs.length-20;i+=55+((rnd()*45)|0)){const r0=rnd(),k=r0<.55?'cone':r0<.8?'oil':'barrel';const n=k=='cone'?1+((rnd()*2)|0):1;for(let j=0;j<n;j++){const o={k,seg:i+j*2,x:(rnd()*1.5-.75),hit:0};OBS.push(o);segs[o.seg].ob.push(o)}}
 const LEN=segs.length*SEGL,LAPS=3,MAXS=SEGL*60;
 const P={z:0,x:0,s:0,lap:1,t:0,gauge:0,nitro:1,nit:0,mini:0,drift:0,dd:0,dc:0,ready:0,spin:0,slip:0,steerV:0,tilt:0};
 const RIV=[['柏凱','#e02040',1.03],['禹豪','#2a7aff',1.0],['哲良','#ff8a2a',1.05],['RITA','#d05aff',.97],['以倫','#2aa04a',1.01]].map((q,i)=>({n:q[0],c:q[1],sp:q[2],z:(i+1)*SEGL*2.5,x:[-.5,.4,0,-.3,.5][i],lap:1,v:0,ph:i*1.7}));
 const K={};let started=false,cd=3,done=false,res=null,prevUp=0;const sparks=[];
 const kd=e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown','a','d','w','s',' ','l'].includes(k)){K[k]=1;e.preventDefault()}if(k==' ')useNitro();if(k=='escape')quit()};
 const ku=e=>{const k=e.key.toLowerCase();K[k]=0};OVK.add(kd);OVKU.add(ku);
 function useNitro(){if(started&&!done&&P.nitro>0&&P.nit<=0){P.nitro--;P.nit=2.4;sparkBurst('#ffb040',30)}}
 const mk=(t,k,hold)=>{const b=document.createElement('button');b.textContent=t;b.style.cssText='font:inherit;font-size:15px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:8px 12px;touch-action:none;user-select:none;min-width:58px';if(hold){b.onpointerdown=e=>{e.preventDefault();K[k]=1};['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>K[k]=0))}else b.onclick=k;M.bt.appendChild(b)};
 M.bt.innerHTML='';mk('⬅','arrowleft',1);mk('🌀 甩尾 L','l',1);mk('⬆ 油門','arrowup',1);mk('🛑','arrowdown',1);mk('🚀 氮氣',useNitro);mk('➡','arrowright',1);
 M.tip.innerHTML='<b>↑</b> 加速・<b>←→</b> 轉彎・<b>↓</b> 煞車・彎道中<b>按住 L＋方向</b>甩尾集氣，放開瞬間踩著 ↑ 會噴射！甩尾集滿氣條會存一瓶<b>氮氣</b>，按<b>空白鍵</b>釋放。小心三角錐、油漬和油桶！';
 function quit(){if(done&&!res)return;done=true;OVK.delete(kd);OVKU.delete(ku);M.end();try{arcadeMenu()}catch(e){}}
 const segAt=z=>segs[Math.floor(((z%LEN)+LEN)%LEN/SEGL)];
 const prog=o=>(o.lap-1)*LEN+o.z;
 const rank=()=>1+RIV.filter(r=>prog(r)>prog(P)).length;
 const sparkBurst=(c,n)=>{for(let i=0;i<n;i++)sparks.push({x:W2/2+(Math.random()-.5)*160,y:H2-40,vx:(Math.random()-.5)*300,vy:-Math.random()*200,t:0,c})};
 function finish(){done=true;OVK.delete(kd);OVKU.delete(ku);const pos=rank(),tix=[0,40,25,16,10,8,6][pos];st.tix=(st.tix||0)+tix;st.cnt.arcade=(st.cnt.arcade||0)+1;fxApply({j:pos<=3?12:6});advance(.5);hud();SVDIRTY=1;
  res={pos,tix};M.tip.innerHTML=`🏁 第 <b>${pos}</b> 名！時間 ${P.t.toFixed(1)} 秒　🎟️ 彩票 +${tix}（合計 ${st.tix}）`;mgButtons(M,[['再跑一場（🪙3）',()=>{if(st.coin<3)return toast('遊戲幣不足');st.coin-=3;hud();M.end();kartPro()}],['離開',()=>{M.end();try{arcadeMenu()}catch(e){}}]])}
 const up=dt=>{if(!started){cd-=dt;if(cd<=0)started=true;return}if(done)return;P.t+=dt;
  const seg=segAt(P.z),off=Math.abs(P.x)>1,spdPct=P.s/MAXS,upK=K.arrowup||K.w,steer=((K.arrowright||K.d)?1:0)-((K.arrowleft||K.a)?1:0);
  // 油門／煞車
  if(K.arrowdown||K.s)P.s-=MAXS*1.4*dt;else if(upK)P.s+=MAXS/2.6*dt*(1-spdPct*.55);else P.s-=MAXS*.25*dt;
  let top=MAXS*(off?.42:1)*(P.nit>0?1.45:1)*(P.mini>0?1.25:1)*(P.drift?.97:1);if(P.spin>0)top*=.5;
  if(seg.boost&&Math.abs(P.x)<.65)P.mini=Math.max(P.mini,1);
  if(P.s>top)P.s=Math.max(top,P.s-MAXS*1.1*dt);if(P.s<0)P.s=0;P.nit-=dt;P.mini-=dt;P.spin-=dt;P.slip-=dt;P.ready-=dt;
  // 甩尾
  if(K.l&&!P.drift&&steer&&spdPct>.4&&P.spin<=0){P.drift=1;P.dd=steer;P.dc=0}
  if(P.drift){if(!K.l||spdPct<.3){const lv=P.dc>1.8?2:P.dc>.8?1:0;P.drift=0;if(lv){P.ready=.6;P.rlv=lv}}else{P.dc+=dt*(steer==P.dd?1.4:.7);P.gauge+=dt*(steer==P.dd?30:15);if(P.gauge>=100){P.gauge-=100;if(P.nitro<3){P.nitro++;sparkBurst('#5ad8ff',18)}}
   if(Math.random()<dt*30)sparks.push({x:W2/2+(P.dd>0?-90:90)+(Math.random()-.5)*30,y:H2-30,vx:-P.dd*80+(Math.random()-.5)*60,vy:-40-Math.random()*60,t:0,c:P.dc>1.8?'#ff8a2a':P.dc>.8?'#5ad8ff':'#ddd'})}}
  if(P.ready>0&&upK&&!prevUp||P.ready>0&&upK&&P.ready<.55){P.mini=P.rlv==2?1.3:.7;P.ready=0;sparkBurst(P.rlv==2?'#ff8a2a':'#5ad8ff',20)}prevUp=upK;
  // 轉向＋離心力
  const turn=P.drift?(.75+(steer==P.dd?.45:steer?-.55:0)):(steer*1.0);const sv=P.drift?P.dd*turn:turn;P.steerV+=(sv-P.steerV)*Math.min(1,dt*10);
  P.x+=P.steerV*dt*2.0*Math.max(.35,spdPct);P.x-=dt*2*spdPct*spdPct*seg.c*(P.drift?.07:.2);if(P.slip>0)P.x+=Math.sin(P.t*9)*dt*1.2;P.x=Math.max(-2.3,Math.min(2.3,P.x));P.sky=(P.sky||0)+seg.c*spdPct*dt*60;
  P.tilt+=((P.drift?P.dd*.32:steer*.08)-P.tilt)*Math.min(1,dt*8);
  // 障礙物
  const si=Math.floor(P.z/SEGL);for(let d=0;d<=1;d++){const s=segs[(si+d)%segs.length];s.ob.forEach(o=>{if(o.hit)return;const dz=((o.seg*SEGL-P.z)%LEN+LEN)%LEN;if(dz<SEGL*.6&&Math.abs(o.x-P.x)<(o.k=='oil'?.32:.22)){o.hit=1;o.ht=P.t;
   if(o.k=='cone'){P.s*=.62;P.spin=.5;sparkBurst('#ff8a2a',10)}else if(o.k=='oil'){P.slip=1.2;P.drift=0}else{P.s*=.35;P.spin=.9;sparkBurst('#a86a3a',16)}}})}
  OBS.forEach(o=>{if(o.hit&&o.k!='oil'&&P.t-o.ht>8)o.hit=0;if(o.k=='oil'&&o.hit&&P.t-o.ht>4)o.hit=0});
  P.z+=P.s*dt;if(P.z>=LEN){P.z-=LEN;P.lap++;if(P.lap>LAPS){finish();return}}
  // 對手：會追、會閃、會甩尾
  RIV.forEach(r=>{const rs=segAt(r.z);const gap=prog(P)-prog(r);let want=MAXS*r.sp*(1-Math.abs(rs.c)*.012);if(gap>SEGL*12)want*=1.12;else if(gap<-SEGL*25)want*=.93;
   if(rs.boost)want*=1.2;r.v+=(want-r.v)*Math.min(1,dt*(r.v<want?.5:2));r.z+=r.v*dt;if(r.z>=LEN){r.z-=LEN;r.lap++}
   let tx=Math.sin(P.t*.45+r.ph)*.55;const ns=segs[(Math.floor(r.z/SEGL)+3)%segs.length];ns.ob.forEach(o=>{if(Math.abs(o.x-tx)<.35)tx=o.x>0?o.x-.5:o.x+.5});r.x+=(tx-r.x)*dt*1.2;
   const dz=prog(r)-prog(P);if(Math.abs(dz)<SEGL*.7&&Math.abs(r.x-P.x)<.42){if(dz>0&&P.s>r.v){P.s=r.v*.85}else if(dz<0&&r.v>P.s){r.v=P.s*.9}P.x+=P.x<r.x?-.12:.12}})};
 const proj=(x,y,z,camX,camY,camZ)=>{const tz=z-camZ;const sc=CD/tz;return{X:W2/2+sc*(x-camX)*W2/2,Y:H2/2-sc*(y-camY)*H2/2,Wd:sc*RW*W2/2,sc}};
 const poly=(x1,y1,w1,x2,y2,w2,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(x1-w1,y1);g.lineTo(x2-w2,y2);g.lineTo(x2+w2,y2);g.lineTo(x1+w1,y1);g.closePath();g.fill()};
 const draw=dt=>{const base=segAt(P.z),bp=(P.z%SEGL)/SEGL,camY=CAMH+base.y+(segs[(base.i+1)%segs.length].y-base.y)*bp;
  g.save();if(P.spin>0)g.translate(Math.sin(P.t*50)*4,0);
  const sk=g.createLinearGradient(0,0,0,H2/2);sk.addColorStop(0,'#2a7ad8');sk.addColorStop(1,'#bfe4ff');g.fillStyle=sk;g.fillRect(-10,0,W2+20,H2);
  const par=-(P.sky||0)-P.x*20;g.fillStyle='#6a9a7a';g.beginPath();g.moveTo(0,H2/2+10);for(let x=0;x<=W2;x+=30)g.lineTo(x,H2/2-30-Math.sin((x+par)*.012)*28-Math.sin((x+par)*.031)*12);g.lineTo(W2,H2/2+10);g.fill();
  g.fillStyle='#4a7a5a';g.beginPath();g.moveTo(0,H2/2+10);for(let x=0;x<=W2;x+=24)g.lineTo(x,H2/2-8-Math.sin((x+par*1.6)*.02)*14);g.lineTo(W2,H2/2+10);g.fill();
  g.fillStyle='#fff';g.globalAlpha=.85;[[120,60],[420,40],[620,80]].forEach(([x,y])=>{const xx=((x+par*.3)%W2+W2)%W2;g.beginPath();g.ellipse(xx,y,40,12,0,0,7);g.ellipse(xx+24,y-6,26,12,0,0,7);g.fill()});g.globalAlpha=1;
  let maxy=H2,x=0,dx=-(base.c*bp);const SP=[];
  for(let n=0;n<DRAW;n++){const idx=base.i+n,s=segs[idx%segs.length],s2=segs[(idx+1)%segs.length],loop=idx>=segs.length?LEN:0,z1=s.i*SEGL+loop,z2=z1+SEGL;
   const a=proj(0,s.y,z1,P.x*RW-x,camY,P.z),b=proj(0,s2.y,z2,P.x*RW-x-dx,camY,P.z);x+=dx;dx+=s.c;s._a=null;
   if(z1-P.z<=8||b.Y>=maxy||b.Y>=a.Y)continue;s._a=a;s._clip=maxy;const odd=Math.floor(s.i/3)%2;
   g.fillStyle=odd?'#5aa84a':'#4e9a40';g.fillRect(0,b.Y,W2,a.Y-b.Y+1);
   poly(a.X,a.Y,a.Wd*1.18,b.X,b.Y,b.Wd*1.18,odd?'#e02020':'#f4f4f4');
   poly(a.X,a.Y,a.Wd,b.X,b.Y,b.Wd,s.boost?(odd?'#ffd84a':'#e8b020'):odd?'#6a6a72':'#62626a');
   if(s.boost&&odd){g.fillStyle='rgba(255,255,255,.6)';g.font=`bold ${Math.max(6,a.Wd*.18)|0}px sans-serif`;g.textAlign='center';g.fillText('▲▲',a.X,a.Y-2)}
   if(odd&&!s.boost)[-.33,.33].forEach(l=>poly(a.X+a.Wd*l,a.Y,a.Wd*.02,b.X+b.Wd*l,b.Y,b.Wd*.02,'#f4f4f4'));
   SP.push(s);maxy=b.Y}
  for(let i=SP.length-1;i>=0;i--){const s=SP[i],a=s._a;if(!a)continue;const W1=a.Wd;
   if(s.dec){const sx=a.X+s.side*W1*1.6,sz=W1*1.1;if(s.dec=='tree'){g.fillStyle='#6a4a2a';g.fillRect(sx-sz*.06,a.Y-sz*.5,sz*.12,sz*.5);g.fillStyle='#2a7a3a';g.beginPath();g.arc(sx,a.Y-sz*.6,sz*.28,0,7);g.fill()}else{g.fillStyle='#ddd';g.fillRect(sx-sz*.02,a.Y-sz*.5,sz*.04,sz*.5);g.fillStyle='#ffd84a';g.fillRect(sx-sz*.25,a.Y-sz*.65,sz*.5,sz*.2);if(sz>30)mgTxt(g,s.c>0?'➡ 右彎':s.c<0?'⬅ 左彎':'小鎮',sx,a.Y-sz*.51,`bold ${Math.max(6,sz*.1)|0}px sans-serif`,'#3a2210')}}
   s.ob.forEach(o=>{if(o.hit&&o.k!='oil')return;const ox=a.X+o.x*W1,w=W1*.14;if(w<2)return;
    if(o.k=='cone'){g.fillStyle='#ff6a1a';g.beginPath();g.moveTo(ox-w*.5,a.Y);g.lineTo(ox+w*.5,a.Y);g.lineTo(ox,a.Y-w*1.2);g.fill();g.fillStyle='#fff';g.fillRect(ox-w*.25,a.Y-w*.6,w*.5,w*.15)}
    else if(o.k=='oil'){g.fillStyle='rgba(20,20,30,.85)';g.beginPath();g.ellipse(ox,a.Y-w*.1,w*1.4,w*.35,0,0,7);g.fill();g.fillStyle='rgba(120,90,200,.35)';g.beginPath();g.ellipse(ox-w*.3,a.Y-w*.2,w*.5,w*.12,0,0,7);g.fill()}
    else{g.fillStyle='#8a4a1a';g.fillRect(ox-w*.45,a.Y-w*1.1,w*.9,w*1.1);g.fillStyle='#ffd84a';g.fillRect(ox-w*.45,a.Y-w*.75,w*.9,w*.15);g.fillStyle='#5a2a0a';g.fillRect(ox-w*.45,a.Y-w*1.1,w*.9,w*.12)}});
   RIV.forEach(r=>{if(Math.floor((r.z%LEN)/SEGL)!=s.i)return;const cx=a.X+r.x*W1,w=W1*.5,h=w*.6;if(w<3||a.Y>s._clip+40)return;
    g.fillStyle='rgba(0,0,0,.3)';g.fillRect(cx-w/2,a.Y-h*.1,w,h*.15);g.fillStyle=r.c;g.fillRect(cx-w/2,a.Y-h*.7,w,h*.6);g.fillStyle='#222';g.fillRect(cx-w*.5,a.Y-h*.25,w*.2,h*.3);g.fillRect(cx+w*.3,a.Y-h*.25,w*.2,h*.3);
    g.fillStyle='#f2c7a5';g.beginPath();g.arc(cx,a.Y-h*.95,w*.16,0,7);g.fill();g.fillStyle='#222';g.fillRect(cx-w*.17,a.Y-h*1.12,w*.34,h*.12);if(w>26)mgTxt(g,r.n,cx,a.Y-h*1.25,`bold ${Math.min(16,w*.25)|0}px sans-serif`,'#fff')})}
  // 自己的車
  const cx=W2/2,cy=H2-62,bob=Math.sin(P.t*30)*P.s/MAXS*1.5;g.save();g.translate(cx,cy+bob);g.rotate(P.tilt+(P.spin>0?Math.sin(P.t*30)*.3:0));
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,40,120,14,0,0,7);g.fill();
  g.fillStyle='#1a1a1a';g.fillRect(-118,6,46,40);g.fillRect(72,6,46,40);g.fillStyle='#d33a2a';g.beginPath();g.moveTo(-90,-10);g.lineTo(90,-10);g.lineTo(104,30);g.lineTo(-104,30);g.closePath();g.fill();
  g.fillStyle='#ffd84a';g.fillRect(-60,10,120,8);g.fillStyle='#222';g.fillRect(-40,22,80,10);
  if(P.nit>0||P.mini>0){const col=P.nit>0?'255,140,40':P.rlv==2?'255,140,40':'90,216,255';g.fillStyle=`rgba(${col},.9)`;[-24,24].forEach(x=>{g.beginPath();g.moveTo(x-9,32);g.lineTo(x+9,32);g.lineTo(x,54+Math.random()*(P.nit>0?40:22));g.fill()})}
  g.fillStyle='#2a3a6a';g.fillRect(-26,-56,52,48);g.fillStyle='#f2c7a5';g.beginPath();g.arc(0,-70,18,0,7);g.fill();g.fillStyle='#d33';g.beginPath();g.arc(0,-74,20,Math.PI,0);g.fill();g.fillStyle='#fff';g.fillRect(-20,-76,40,4);
  g.strokeStyle='#333';g.lineWidth=6;g.beginPath();g.moveTo(-28,-36);g.lineTo(-44,-20);g.moveTo(28,-36);g.lineTo(44,-20);g.stroke();g.restore();
  sparks.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=300*dt;p.t+=dt;g.globalAlpha=Math.max(0,1-p.t/.6);g.fillStyle=p.c;g.fillRect(p.x,p.y,4,4)});g.globalAlpha=1;for(let i=sparks.length-1;i>=0;i--)if(sparks[i].t>.6)sparks.splice(i,1);
  if(P.s>MAXS*.85||P.nit>0){g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;for(let i=0;i<(P.nit>0?18:8);i++){const a=Math.random()*6.28,r1=200+Math.random()*80;g.beginPath();g.moveTo(W2/2+Math.cos(a)*r1,H2/2+Math.sin(a)*r1*.6);g.lineTo(W2/2+Math.cos(a)*(r1+90),H2/2+Math.sin(a)*(r1+90)*.6);g.stroke()}}
  g.restore();
  // HUD
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(10,10,210,66);mgTxt(g,`🏁 第 ${Math.min(LAPS,P.lap)}/${LAPS} 圈`,20,34,'bold 18px sans-serif','#fff','left');mgTxt(g,`🏆 第 ${rank()} 名　⏱ ${P.t.toFixed(1)}`,20,62,'bold 16px sans-serif','#ffd84a','left');
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(W2-210,10,200,84);mgTxt(g,`${Math.round(P.s/MAXS*120)} km/h`,W2-20,36,'bold 22px sans-serif','#fff','right');
  g.fillStyle='#222';g.fillRect(W2-200,48,120,12);g.fillStyle=P.gauge>70?'#ff8a2a':'#5ad8ff';g.fillRect(W2-200,48,120*P.gauge/100,12);mgTxt(g,'集氣',W2-72,59,'bold 12px sans-serif','#fff','left');
  for(let i=0;i<3;i++){g.globalAlpha=i<P.nitro?1:.25;mgTxt(g,'🚀',W2-196+i*26,86,'18px sans-serif','#fff','left')}g.globalAlpha=1;mgTxt(g,'空白鍵',W2-20,86,'bold 11px sans-serif','#ccc','right');
  g.fillStyle='rgba(0,0,0,.45)';g.fillRect(234,16,252,12);RIV.forEach(r=>{g.fillStyle=r.c;g.fillRect(234+(r.z/LEN)*248,14,4,16)});g.fillStyle='#fff';g.fillRect(234+(P.z/LEN)*248-2,12,6,20);
  if(P.drift)mgTxt(g,P.dc>1.8?'🔥 DRIFT!!':P.dc>.8?'💨 DRIFT!':'DRIFT',W2/2,H2-150,'bold 26px sans-serif',P.dc>1.8?'#ff8a2a':P.dc>.8?'#5ad8ff':'#fff');
  if(P.ready>0)mgTxt(g,'⬆ 踩油門噴射！',W2/2,H2-180,'bold 22px sans-serif','#ffd84a');
  if(P.slip>0)mgTxt(g,'💦 打滑了！',W2/2,140,'bold 24px sans-serif','#9ad0ff');
  if(!started)mgTxt(g,cd>0?Math.ceil(cd)+'':'GO!',W2/2,H2/2-40,'bold 90px sans-serif','#fff');else if(P.t<1)mgTxt(g,'GO!',W2/2,H2/2-40,'bold 90px sans-serif','#ffd84a');
  if(res)mgTxt(g,`🏁 第 ${res.pos} 名！`,W2/2,H2/2-40,'bold 60px sans-serif','#ffd84a')};
 let last=performance.now();const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;up(dt);draw(dt);if(!done||res)requestAnimationFrame(loop)};requestAnimationFrame(loop)}
