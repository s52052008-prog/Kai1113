/* v5.9 戰鬥陀螺 X 2.0：發射決定開局、配裝決定個性、戰中有限操控
   第一版：落點＋蓄力發射、輕微引導、接軌三拍、分級碰撞、停轉／出界兩種勝負（爆裂與發射角度留待下一版） */
const BEY2={launchY:0};
function beyStats(t,bonus){const bl=t.bl,ra=t.ra,bi=t.bi,b=bonus?1.08:1;
 return{m:(1+(bl.def-1)*.7+(ra.br-1)*.35)*(bl.def>=1.3?1.35:1),atk:bl.atk*b,drive:bi.spd,sta:bi.sta*bl.sta*b,mx:100*b*(1+((t.ids&&st.bup&&st.bup[t.ids[0]])||0)*.04),c1:t.c,nm:t.nm,
  type:bl.atk>=1.3?'攻擊':bl.def>=1.3?'防禦':bl.sta>=1.3?'耐久':'平衡'}}
GAMES.bey=o=>{const CX=240,CY=162,RD=112,R=10,PTS={spin:1,over:2,xtreme:3};
 const bonus=(st.inv.topx||0)>0&&!o.free,PS=beyStats(o.pt,bonus),ES=beyStats(o.et,0);
 const mk=(S,c2)=>({...S,c2,x:CX,y:CY,vx:0,vy:0,sp:S.mx,stab:100,a:0,rail:0,railT:0,railDir:1,dashT:0,cd:0,tr:[],out:0,stop:0,fallA:0,hitT:0});
 const P=mk(PS,'#ffffff'),E=mk(ES,'#2a1a4a');window.__bd={P,E};
 const sp=[],fx=[],dmg=[];let shake=0,slow=0,flash=0,hs=0;
 const dmgPop=(T,s0)=>{const d=s0-T.sp;T.acc=(T.acc||0)+Math.max(0,d);if(T.acc>=1.5){const big=T.acc>=10;dmg.push({x:T.x,y:T.y,v:Math.round(T.acc),t:0,big,c:T===P?'#ff8a8a':'#ffe066'});T.acc=0}};
 const G={name:'🌀 戰鬥陀螺 X・颶風擂台'+(o.free?'（友誼賽）':''),ph:'aim',aim:{x:CX-40,y:CY+30},c:0,cd2:0,hold:0,msg:'',msgT:0,t:0,res:null,ftime:0};
 const say=(m,t)=>{G.msg=m;G.msgT=t||1.2};
 const spark=(x,y,n,dir,spd,col)=>{for(let i=0;i<n;i++){const a=(dir==null?Math.random()*6.283:dir+(Math.random()-.5)*1.1),v=spd*(.4+Math.random()*.8);sp.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,c:col||'#ffd84a'})}};
 // ── 發射 ──
 function launch(T,lx,ly,c,isP){const perfect=c>=.8&&c<=.93,over=c>.93;let ex=0,ey=0;
  if(over){const a=Math.random()*6.283,r=10+Math.random()*12;ex=Math.cos(a)*r;ey=Math.sin(a)*r}else if(!perfect){const a=Math.random()*6.283,r=Math.random()*6;ex=Math.cos(a)*r;ey=Math.sin(a)*r}
  T.x=lx+ex;T.y=ly+ey;const d=Math.hypot(T.x-CX,T.y-CY);if(d>RD-R-4){T.x=CX+(T.x-CX)/d*(RD-R-4);T.y=CY+(T.y-CY)/d*(RD-R-4)}
  T.sp=T.mx*(.5+.5*Math.min(1,c))*(perfect?1.06:1);T.stab=over?68:perfect?100:88;
  const dd=Math.hypot(T.x-CX,T.y-CY)||1,tx=-(T.y-CY)/dd,ty=(T.x-CX)/dd,ts=(30+dd*.9)*T.drive*(.6+.4*c);T.vx=tx*ts;T.vy=ty*ts;
  if(isP)say(perfect?'✨ PERFECT 發射！':over?'💨 力道過猛，落點偏了！':c<.5?'力道太弱…':'發射！',1.3)}
 function aiLaunch(){const atk=E.type=='攻擊',a=Math.random()*6.283,r=atk?RD*.6+Math.random()*20:Math.random()*30;launch(E,CX+Math.cos(a)*r,CY+Math.sin(a)*r,.72+Math.random()*.24,false)}
 // ── 接軌 ──
 function tryRail(T,bonusChance){if(T.rail||T.stop||T.out)return false;const dx=T.x-CX,dy=T.y-CY,d=Math.hypot(dx,dy);if(d<RD-R-8)return false;
  const tx=-dy/d,ty=dx/d,vt=T.vx*tx+T.vy*ty,ch=Math.max(.12,Math.min(.95,.32+.45*(T.drive-1)+Math.abs(vt)/260+(bonusChance||0)+(T.type=='攻擊'?.3:0)));
  if(Math.random()<ch){T.rail=1;T.railT=0;T.railDir=vt>=0?1:-1;T.railA=Math.atan2(dy,dx);spark(CX+dx/d*RD,CY+dy/d*RD,7,null,60,'#9ae8ff');if(T===P)say('⚙️ 接軌成功！',.8);return true}
  T.vx*=.85;T.vy*=.85;if(T===P)say('打滑了…',.6);return false}
 function xDash(T,m){T.rail=0;const O=T===P?E:P,aim=T.type=='攻擊'&&!O.out&&!O.stop,tx=(aim?O.x:CX)-T.x,ty=(aim?O.y:CY+RD*.3)-T.y,d=Math.hypot(tx,ty)||1,s=(230+T.drive*60)*(T.boost?1.15:1);T.boost=0;T.vx=tx/d*s;T.vy=ty/d*s;T.dashT=.75;T.sp-=2;spark(T.x,T.y,18,Math.atan2(ty,tx)+Math.PI,160,'#9ae8ff');shake=Math.max(shake,2.5);if(T===P)say(m||'⚡ X 衝刺！',.8)}
 // ── 碰撞 ──
 function collide(A,B){const dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy);if(d>=R*2||d<.01)return;
  const nx=dx/d,ny=dy/d,ov=R*2-d;A.x-=nx*ov/2;A.y-=ny*ov/2;B.x+=nx*ov/2;B.y+=ny*ov/2;
  const rvx=A.vx-B.vx,rvy=A.vy-B.vy,rv=rvx*nx+rvy*ny,vrel=Math.hypot(rvx,rvy);if(rv<=18){const push=45*(.5+Math.random()*.5);A.vx-=nx*push*(.5+.5*B.atk)/A.m;A.vy-=ny*push*(.5+.5*B.atk)/A.m;B.vx+=nx*push*(.5+.5*A.atk)/B.m;B.vy+=ny*push*(.5+.5*A.atk)/B.m;A.sp-=.25*B.atk;B.sp-=.25*A.atk;if(Math.random()<.3)spark(A.x+nx*R,A.y+ny*R,1,null,50);return}if(G.hcd>0)return;G.hcd=.08;
  const head=rv/(vrel+1),power=rv*(.5+.5*head),dash=(A.dashT>0||B.dashT>0)&&rv>70,tier=dash?'rail':power>42?'heavy':'glance';
  const e=.45+.15*Math.max(A.atk,B.atk,1)-.15,J=1.6*(1+e)*rv/(1/A.m+1/B.m)*(tier=='glance'?.5:1),boostA=A.dashT>0?1.8:1,boostB=B.dashT>0?1.8:1;
  A.vx-=J/A.m*nx*(.8+.4*B.atk)*boostB;A.vy-=J/A.m*ny*(.8+.4*B.atk)*boostB;B.vx+=J/B.m*nx*(.8+.4*A.atk)*boostA;B.vy+=J/B.m*ny*(.8+.4*A.atk)*boostA;
  if(dash){const dA=A.dashT>0?A:B,dB=dA===A?B:A,v=Math.hypot(dA.vx,dA.vy)||1,kb=230*(.8+.4*dA.atk)/dB.m;dB.vx+=dA.vx/v*kb;dB.vy+=dA.vy/v*kb}
  A.vx-=nx*J*Math.max(0,A.atk-1)*.35/A.m;A.vy-=ny*J*Math.max(0,A.atk-1)*.35/A.m;B.vx+=nx*J*Math.max(0,B.atk-1)*.35/B.m;B.vy+=ny*J*Math.max(0,B.atk-1)*.35/B.m;
  const tm=tier=='glance'?.35:tier=='heavy'?1:1.5;A.sp-=J*.03*B.atk*B.atk/A.m*tm;B.sp-=J*.03*A.atk*A.atk/B.m*tm;
  const weak=(A.sp/A.mx<B.sp/B.mx)?A:B;if(tier!='glance'){weak.stab-=tier=='rail'?30:18;(weak===A?B:A).stab-=tier=='rail'?6:5}else{A.stab-=2;B.stab-=2}A.stab=Math.max(0,A.stab);B.stab=Math.max(0,B.stab);
  A.rail=B.rail=0;const cx=A.x+nx*R,cy=A.y+ny*R,tang=Math.atan2(ny,nx)+Math.PI/2;if(tier!='glance'){A.kick=B.kick=.22;A.kx=-nx;A.ky=-ny;B.kx=nx;B.ky=ny;fx.push({x:cx,y:cy,t:-.02,r:tier=='rail'?44:30,c:'#ffffff',star:1})}
  if(tier=='glance'){spark(cx,cy,7,tang,130);spark(cx,cy,6,tang+Math.PI,130);shake=Math.max(shake,.8)}
  else if(tier=='heavy'){spark(cx,cy,24,null,200);spark(cx,cy,10,null,120,'#ff7040');fx.push({x:cx,y:cy,t:0,r:16,c:'#fff'});shake=Math.max(shake,3.2);hs=.06;flash=.12;say(['💥 重擊！','⚡ 正面對撞！','🔥 火花四濺！'][Math.floor(Math.random()*3)],.6)}
  else{const fd=Math.atan2(B.dashT>0?-ny:ny,B.dashT>0?-nx:nx);spark(cx,cy,40,fd,320,'#ffb040');spark(cx,cy,16,null,180,'#ffffff');fx.push({x:cx,y:cy,t:0,r:28,c:'#ffe080'});fx.push({x:cx,y:cy,t:-.08,r:18,c:'#ff6040'});shake=7;flash=.4;hs=.1;slow=.22;say('💥 接軌衝撞！',.8)}
  G.lastHit={t:G.t,tier}}
 function step(T,dt,ax,ay,ctl){if(T.out||T.stop)return;const dx=T.x-CX,dy=T.y-CY,d=Math.hypot(dx,dy)||1,tx=-dy/d,ty=dx/d,sf=Math.max(0,T.sp/T.mx);
  if(T.rail){T.railT+=dt;const w=Math.min(7,(2.2+T.drive*1.6)*(1+T.railT*1.2))*T.railDir;T.railA+=w*dt;T.x=CX+Math.cos(T.railA)*(RD-R-2);T.y=CY+Math.sin(T.railA)*(RD-R-2);T.vx=-Math.sin(T.railA)*w*(RD-R);T.vy=Math.cos(T.railA)*w*(RD-R);
   if(Math.random()<.5)spark(CX+Math.cos(T.railA)*RD,CY+Math.sin(T.railA)*RD,1,null,40,'#9ae8ff');
   {const D0=Math.PI/180,ad=Math.abs(Math.atan2(Math.sin(T.railA+90*D0),Math.cos(T.railA+90*D0)));if(T.railT>.12&&ad<10*D0)return xDash(T,'🐱 貓耳！衝向中央！')}
   if(T.type=='攻擊'&&T.railT>.35){const O=T===P?E:P,ox2=O.x-T.x,oy2=O.y-T.y,od2=Math.hypot(ox2,oy2)||1,fx2=-Math.sin(T.railA)*T.railDir,fy2=Math.cos(T.railA)*T.railDir;if((ox2*fx2+oy2*fy2)/od2>.55&&Math.random()<.25){T.boost=1;return xDash(T,'⚡ 極限衝擊！')}}
   if(T.railT>1.5){T.rail=0;const s=(170+T.drive*70)*(T.boost?1.25:1);T.boost=0;T.vx=-Math.sin(T.railA)*s*T.railDir;T.vy=Math.cos(T.railA)*s*T.railDir;T.dashT=.55;T.sp-=3;if(T===P)say('⚡ 衝出！',.6)}
   T.sp-=1.2*dt;return}
  // 坡度往中央拉、軸心帶動繞行、阻力
  const k=1.1;T.vx+=-dx*k*dt;T.vy+=-dy*k*dt;const orb=(T.drive-.8)*95*sf*(T.type=='防禦'||T.type=='耐久'?.3:1.4);T.vx+=tx*orb*dt;T.vy+=ty*orb*dt;
  T.vx+=(Math.random()-.5)*20*dt*(1+(100-T.stab)/40);T.vy+=(Math.random()-.5)*20*dt*(1+(100-T.stab)/40);
  T.vx+=ax*95*ctl*dt;T.vy+=ay*95*ctl*dt;
  const fr=.55+(1-sf)*.9+(T.stab<30?.8:0);T.vx*=Math.exp(-fr*dt);T.vy*=Math.exp(-fr*dt);
  const v=Math.hypot(T.vx,T.vy);if(v>460){T.vx*=460/v;T.vy*=460/v}
  T.x+=T.vx*dt;T.y+=T.vy*dt;T.dashT=Math.max(0,T.dashT-dt);
  T.sp-=(2.3/Math.sqrt(T.sta)+v*.005+(T.stab<30?3.5:0))*dt*(T===P?.87:1.08);T.stab=Math.min(100,T.stab+(sf>.4?7:2)*dt);
  // 外牆與袋口
  const ox=T.x-CX,oy=T.y-CY,od=Math.hypot(ox,oy);if(od>RD-R){const ph=Math.atan2(oy,ox),nx=ox/od,ny=oy/od,vn=T.vx*nx+T.vy*ny,D=Math.PI/180;
   const adf=(x,y)=>Math.abs(Math.atan2(Math.sin(x-y),Math.cos(x-y))),inOver=adf(ph,30*D)<8*D||adf(ph,150*D)<8*D,inX=adf(ph,90*D)<13*D;
   if((inOver&&vn>42)||(inX&&vn>24)){T.out=inX?'xtreme':'over';T.ox=T.x;T.oy=T.y;T.ovx=T.vx;T.ovy=T.vy;spark(T.x,T.y,10,ph,120,'#ff6060');shake=3;slow=.5;return}
   T.x=CX+nx*(RD-R);T.y=CY+ny*(RD-R);if(vn>0){T.vx-=1.5*vn*nx;T.vy-=1.5*vn*ny;T.sp-=vn*.01;if(vn>60){spark(CX+nx*RD,CY+ny*RD,8,ph+Math.PI,110,'#ffd84a');T.kick=.18;T.kx=-nx;T.ky=-ny;if(vn>140){fx.push({x:CX+nx*RD,y:CY+ny*RD,t:0,r:18,c:'#ffe080'});shake=Math.max(shake,1.5)}}}
   if(!T.rail&&T.dashT<=0&&Math.random()<(T===P?.09:.05)*T.drive)tryRail(T,T===P?.2:0)}
  if(T.sp<=0){T.sp=0;T.stop=1;T.stopT=0;T.fallA=Math.random()*6.283;spark(T.x,T.y,5,null,40,'#cccccc');slow=.45}
  T.a+=(T.sp/12+2)*dt*6;T.tr.push([T.x,T.y]);if(T.tr.length>10)T.tr.shift();T.kick=Math.max(0,(T.kick||0)-dt)}
 function autoMove(T,O){if(T.out||T.stop||T.rail)return[0,0];const dx=T.x-CX,dy=T.y-CY,d=Math.hypot(dx,dy)||1;let tx=CX,ty=CY,k=1;
  if(T.type=='攻擊'){const a=Math.atan2(dy,dx)+.5*(T.railDir||1);tx=CX+Math.cos(a)*(RD-R);ty=CY+Math.sin(a)*(RD-R);k=1.2;if(d>RD-R-10&&Math.random()<.06)tryRail(T,.35)}
  else if(T.type=='平衡'){T.fa=(T.fa||Math.random()*6)+.02;const th=G.t*1.6+(T===P?0:3),r=RD*.62*(.25+.75*Math.abs(Math.cos(2.5*th)));tx=CX+Math.cos(th)*r;ty=CY+Math.sin(th)*r;k=1}
  else{tx=CX;ty=CY;k=1.4;if(d<8){T.vx*=.9;T.vy*=.9}}
  const ex=tx-T.x,ey=ty-T.y,e=Math.hypot(ex,ey)||1;return[ex/e*Math.min(1,e/25)*k,ey/e*Math.min(1,e/25)*k]}
 function ai(dt){const am=autoMove(E,P);if(E.out||E.stop||E.rail)return[0,0];const dx=P.x-E.x,dy=P.y-E.y,d=Math.hypot(dx,dy)||1;let ax=0,ay=0;
  if(E.type=='攻擊'||E.type=='平衡'){ax=dx/d;ay=dy/d;const od=Math.hypot(E.x-CX,E.y-CY);if(od>RD-R-6){const ex=-(E.y-CY)/od,ey=(E.x-CX)/od,dot=(dx*ex+dy*ey)/d;if(Math.abs(dot)>.6&&Math.random()<dt*.8)tryRail(E,0)}}
  else{const cx=CX-E.x,cy=CY-E.y,c=Math.hypot(cx,cy)||1;ax=cx/c;ay=cy/c;if(E.type=='防禦'&&d<60){ax=-dx/d*.5+ax*.5;ay=-dy/d*.5+ay*.5}}
  return[ax*.4+am[0]*.9,ay*.4+am[1]*.9]}
 G.up=function(dt){if(hs>0){hs-=dt;shake=Math.max(0,shake-dt*6);return}if(slow>0){slow-=dt;dt*=.25}G.t+=dt;G.msgT-=dt;shake=Math.max(0,shake-dt*10);flash=Math.max(0,flash-dt);G.hcd=(G.hcd||0)-dt;
  dmg.forEach(q=>q.t+=dt);while(dmg.length&&dmg[0].t>1)dmg.shift();sp.forEach(s=>{s.x+=s.vx*dt;s.y+=s.vy*dt;s.vx*=.92;s.vy*=.92;s.t+=dt});while(sp.length&&sp[0].t>.6)sp.shift();fx.forEach(f=>f.t+=dt);while(fx.length&&fx[0].t>.3)fx.shift();
  let ax=(keys.right?1:0)-(keys.left?1:0),ay=(keys.down?1:0)-(keys.up?1:0);if(ax&&ay){ax*=.707;ay*=.707}
  if(G.ph=='aim'){G.aim.x+=ax*110*dt;G.aim.y+=ay*110*dt;const d=Math.hypot(G.aim.x-CX,G.aim.y-CY);if(d>RD-R-6){G.aim.x=CX+(G.aim.x-CX)/d*(RD-R-6);G.aim.y=CY+(G.aim.y-CY)/d*(RD-R-6)}return}
  if(G.ph=='charge'){G.ct+=dt;const u=G.ct/1.05;G.c=u<=1?u:1-((u-1)%1.2)/1.2*.55;if(!G.hold){G.ph='go';G.cd2=1.0;launch(P,G.aim.x,G.aim.y,G.c,true);aiLaunch()}return}
  if(G.ph=='go'){G.cd2-=dt;if(G.cd2<=0)G.ph='fight';return}
  if(G.ph!='fight')return;G.ftime+=dt;dt*=1.75;{const am=autoMove(P,E);ax=ax*.8+am[0]*.85;ay=ay*.8+am[1]*.85}
  const grip=G.hold&&!P.rail&&!P.out&&!P.stop;const ctl=(1/P.m)*(.5+.5*P.stab/100)*(grip?2.3:1);if(grip)P.sp-=6*dt;
  const [eax,eay]=ai(dt);for(let i=0;i<2;i++){step(P,dt/2,ax,ay,ctl);step(E,dt/2,eax,eay,(1/E.m)*(.5+.5*E.stab/100)*(E.type=='攻擊'?1.3:1));if(!P.out&&!E.out&&!P.stop&&!E.stop){const s0=P.sp,s1=E.sp;collide(P,E);dmgPop(P,s0);dmgPop(E,s1)}}
  [P,E].forEach(T=>{if(T.out){T.ox+=T.ovx*dt*.5;T.oy+=T.ovy*dt*.5}if(T.stop)T.stopT=(T.stopT||0)+dt});
  let r=null;if(P.out&&E.out)r={w:null};else if(E.out)r={w:'p',how:E.out};else if(P.out)r={w:'e',how:P.out};
  else if(P.stop&&E.stop)r={w:null};else if(E.stop)r={w:'p',how:'spin'};else if(P.stop)r={w:'e',how:'spin'};else if(G.ftime>45)r={w:P.sp/P.mx>=E.sp/E.mx?'p':'e',how:'spin'};
  if(r&&!G.res){r.pts=r.w?PTS[r.how]:0;G.res=r;setTimeout(()=>beyEnd(r),slow>0?700:300)}};
 G.press=function(){G.hold=1;if(G.ph=='aim'){G.ph='charge';G.ct=0;G.c=0;return}
  if(G.ph!='fight'||P.out||P.stop)return;if(P.rail){if(P.railT>.1)xDash(P,'⚡ X 衝刺！');return}if((G.pcd||0)>G.t)return;G.pcd=G.t+.55;
  const od=Math.hypot(P.x-CX,P.y-CY);if(od>RD-R-12){tryRail(P,.5);return}
  let ax=(keys.right?1:0)-(keys.left?1:0),ay=(keys.down?1:0)-(keys.up?1:0),m=Math.hypot(ax,ay);if(!m){const v=Math.hypot(P.vx,P.vy)||1;ax=P.vx/v;ay=P.vy/v;m=1}
  P.vx+=ax/m*70/P.m;P.vy+=ay/m*70/P.m;P.sp-=2;spark(P.x,P.y+6,3,null,40,'#ffffff')};
 G.release=function(){G.hold=0};
 const SCX=240,SCY=158,SS=290,SF=SS/256,KX=97*SF/RD,KY=66*SF/RD,SX=x=>SCX+(x-CX)*KX,SY=y=>SCY+(y-CY)*KY,D=Math.PI/180;
 const BCOL={b1:'y',b2:'y',b3:'b',b4:'g',b5:'y',b6:'b',b7:'g',b8:'y'};P.sk=BCOL[o.pt.ids[0]]||'y';E.sk=BCOL[o.et.ids[0]]||'b';if(E.sk==P.sk)E.sk=P.sk=='b'?'g':'b';
 const ring=(ph,rr)=>[SX(CX+Math.cos(ph)*rr),SY(CY+Math.sin(ph)*rr)];
 G.dr=function(c){c.save();if(shake>0)c.translate((Math.random()-.5)*shake*2,(Math.random()-.5)*shake*2);
  const bg=c.createRadialGradient(SCX,SCY,10,SCX,SCY,260);bg.addColorStop(0,'#2e2458');bg.addColorStop(1,'#0c0818');c.fillStyle=bg;c.fillRect(-10,0,W+20,H);
  c.imageSmoothingEnabled=false;
  if(uaOK('bx_stad'))c.drawImage(UAI.bx_stad,Math.round(SCX-128.3*SF),Math.round(SCY-116.7*SF),SS,SS);
  else{c.fillStyle='#9aa6be';c.beginPath();c.ellipse(SCX,SCY,RD*KX,RD*KY,0,0,7);c.fill()}
  // 洞口與加速帶（依盤面位置）
  const pocket=(a0,col,lab,hw)=>{c.fillStyle=col;c.beginPath();for(let a=a0-hw;a<=a0+hw;a+=1){const q=ring(a*D,RD+3);a==a0-hw?c.moveTo(q[0],q[1]):c.lineTo(q[0],q[1])}for(let a=a0+hw;a>=a0-hw;a-=1){const q=ring(a*D,RD-9);c.lineTo(q[0],q[1])}c.closePath();c.fill();
   const t=ring(a0*D,RD+18);txt(c,lab,t[0],t[1]+3,'#fff','bold 8px sans-serif')};
  pocket(30,'rgba(10,6,20,.82)','2',7);pocket(150,'rgba(10,6,20,.82)','2',7);pocket(90,'rgba(60,40,0,.85)','3',13);
  {const g2=.5+.5*Math.sin(G.t*6);c.strokeStyle=`rgba(255,240,120,${.25+.3*g2})`;c.lineWidth=2;c.setLineDash([3,3]);c.lineDashOffset=-G.t*30;c.beginPath();c.ellipse(SCX,SCY,(RD-3)*KX,(RD-3)*KY,0,0,7);c.stroke();c.setLineDash([]);
   const e1=ring(-97*D,RD-6),e2=ring(-83*D,RD-6),tp=ring(-90*D,RD-20);c.fillStyle=`rgba(255,200,230,${.6+.35*g2})`;[e1,e2].forEach(q=>{c.beginPath();c.moveTo(q[0]-4,q[1]+2);c.lineTo(q[0],q[1]-6);c.lineTo(q[0]+4,q[1]+2);c.fill()});
   c.strokeStyle=`rgba(255,200,230,${.3+.4*g2})`;c.lineWidth=1.2;c.beginPath();c.moveTo(tp[0],tp[1]);c.lineTo(SCX,SCY+18);c.stroke();
   const t=ring(-90*D,RD+16);txt(c,'貓耳・衝向中央',t[0],t[1]+2,'#ffc8e6','bold 6px sans-serif')}
  // 陀螺
  const frameOf=T=>{if(T.stop)return[3,Math.min(5,Math.floor((T.stopT||0)*8))];if(T.stab<35)return[2,Math.floor(G.t*8)%6];if(T.rail||T.dashT>0||T.sp/T.mx>.72)return[1,Math.floor(G.t*20)%6];return[0,Math.floor(G.t*10)%6]};
  const drawT=(T,lab)=>{let x=T.x,y=T.y;if(T.out){x=T.ox;y=T.oy;c.globalAlpha=.55}if(T.kick>0&&!T.out){const k=T.kick/.22;x+=T.kx*k*7;y+=T.ky*k*7}const sx=SX(x),sy=SY(y);
   {const v=Math.hypot(T.vx,T.vy),fast=T.dashT>0||T.rail||v>110;if(fast&&!T.stop&&!T.out){const key0='bx_'+T.sk,n=T.tr.length;T.tr.forEach((q,i)=>{if(i%2&&!(T.dashT>0||T.rail))return;const a=(i+1)/n*(T.dashT>0||T.rail?.55:.32);c.globalAlpha=a;if(uaOK(key0))c.drawImage(UAI[key0],0,64,64,64,SX(q[0])-14,SY(q[1])-18,28,28);else{c.fillStyle=T.c1;c.beginPath();c.ellipse(SX(q[0]),SY(q[1]),R*KX,R*KY,0,0,7);c.fill()}});
    if(T.dashT>0||T.rail){c.globalAlpha=.6;c.strokeStyle=T.rail?'#9ae8ff':'#ffe080';c.lineWidth=2;c.beginPath();T.tr.forEach((q,i)=>i?c.lineTo(SX(q[0]),SY(q[1])):c.moveTo(SX(q[0]),SY(q[1])));c.stroke()}}c.globalAlpha=T.out?.55:1}
   c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(sx+1,sy+3,R*KX+1,R*KY*.8,0,0,7);c.fill();
   const key='bx_'+T.sk;if(uaOK(key)){const [r0,f]=frameOf(T),sz=30,wob=T.stop?0:(100-T.stab)/100;c.drawImage(UAI[key],f*64,r0*64,64,64,Math.round(sx-sz/2+Math.cos(G.t*14)*wob*2),Math.round(sy-sz/2-4),sz,sz)}
   else beyX(c,sx,sy,R,T.c1,T.c2,T.a);
   c.globalAlpha=1;if(T.stab<35&&!T.stop&&!T.out)txt(c,'搖晃！',sx,sy-20,'#ffb040','bold 6px sans-serif');txt(c,lab,sx,sy+14,lab=='你'?'#8affb0':'#ff9a9a','bold 6px sans-serif')};
  if(G.ph=='aim'||G.ph=='charge'){const a=G.aim,ax=SX(a.x),ay=SY(a.y);c.strokeStyle='#8affb0';c.lineWidth=1.2;c.beginPath();c.ellipse(ax,ay,(R+2)*KX,(R+2)*KY,0,0,7);c.stroke();c.beginPath();c.moveTo(ax-14,ay);c.lineTo(ax+14,ay);c.moveTo(ax,ay-10);c.lineTo(ax,ay+10);c.stroke();
   if(uaOK('bx_lnch'))c.drawImage(UAI.bx_lnch,ax-16,ay-40-(G.ph=='charge'?G.c*4:0),32,32);
   const d=Math.hypot(a.x-CX,a.y-CY);txt(c,d<35?'中央：穩定':d>RD-30?'外圈：容易接軌、風險高':'中段',ax,ay+18,'#fff','bold 7px sans-serif');
   const bx=W-36,by=70,bh=150;c.fillStyle='rgba(0,0,0,.6)';c.fillRect(bx,by,16,bh);c.fillStyle='rgba(120,255,160,.35)';c.fillRect(bx,by+bh*(1-.93),16,bh*.13);
   const cc=G.ph=='charge'?G.c:0;c.fillStyle=cc>.93?'#ff6a4a':cc>=.8?'#8affb0':'#ffd84a';c.fillRect(bx+2,by+bh*(1-cc),12,bh*cc);txt(c,'力道',bx+8,by-4,'#fff','bold 7px sans-serif');txt(c,'甜蜜點',bx-14,by+bh*.13,'#8affb0','6px sans-serif')}
  else{[[E,'對手'],[P,'你']].sort((u,v)=>(u[0].out?u[0].oy:u[0].y)-(v[0].out?v[0].oy:v[0].y)).forEach(q=>drawT(q[0],q[1]))}
  sp.forEach(s=>{c.globalAlpha=Math.max(0,1-s.t*2.2);c.fillStyle=s.c;c.fillRect(SX(s.x)-1,SY(s.y)-1,2,2)});c.globalAlpha=1;
  fx.forEach(f=>{if(f.t<0)return;const k=f.t/.3;c.globalAlpha=Math.max(0,1-k);if(f.star){const X=SX(f.x),Y=SY(f.y);c.fillStyle='#fff8d0';c.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8,r=(i%2?.35:1)*f.r*(.6+k*1.4);c.lineTo(X+Math.cos(a)*r,Y+Math.sin(a)*r*.75)}c.closePath();c.fill();c.fillStyle='rgba(255,170,60,.8)';c.beginPath();c.arc(X,Y,f.r*.35*(1-k),0,7);c.fill()}else{c.strokeStyle=f.c;c.lineWidth=2;c.beginPath();c.ellipse(SX(f.x),SY(f.y),f.r*(.4+f.t*3)*KX,f.r*(.4+f.t*3)*KY,0,0,7);c.stroke()}});c.globalAlpha=1;
  c.restore();if(flash>0){c.fillStyle=`rgba(255,240,200,${flash})`;c.fillRect(0,0,W,H)}
  const bar=(x,T,lb,col)=>{const f=Math.max(0,T.sp)/T.mx;T.shw=T.shw==null?f:Math.max(f,T.shw-.006);c.fillStyle='rgba(0,0,0,.6)';c.fillRect(x,15,140,30);txt(c,lb,x+70,24,'#fff','bold 7px sans-serif');c.fillStyle='#222';c.fillRect(x+6,28,128,9);c.fillStyle='#ff5a4a';c.fillRect(x+7,29,126*T.shw,7);c.fillStyle=f<.25?'#ff4040':T.stab<35?'#ffb040':col;c.fillRect(x+7,29,126*f,7);txt(c,'耐力 '+Math.ceil(Math.max(0,T.sp))+' / '+Math.round(T.mx),x+70,43,'#fff','bold 6px sans-serif')};
  dmg.forEach(q=>{const a=Math.max(0,1-q.t);c.globalAlpha=a;txt(c,'-'+q.v,SX(q.x),SY(q.y)-18-q.t*22,q.c,(q.big?'bold 14px':'bold 9px')+' sans-serif');c.globalAlpha=1});
  bar(4,P,`${P.nm}（${P.type}）`+(bonus?'★':''),'#5ae07a');bar(336,E,`對手 ${E.nm}（${E.type}）`,'#4a9aff');
  const B=BM;if(o.bm)txt(c,`你 ${B.pts[0]} : ${B.pts[1]} 對手（先取 ${B.tgt} 分）`,W/2,H-13,'#ffd84a','bold 8px sans-serif');
  if(G.msgT>0)txt(c,G.msg,W/2,52,'#fff','bold 10px sans-serif');
  if(G.ph=='go')txt(c,'3、2、1… GO SHOOT！',SCX,SCY+4,'#ffd84a','bold 16px sans-serif');
  if(G.res){const r=G.res;txt(c,r.w?((r.how=='spin'?'轉停':r.how=='over'?'場外':'極限')+'！ +'+r.pts):'平手',SCX,SCY+8,r.w=='p'?'#ffd84a':'#ff8a8a','bold 22px sans-serif')}
  txt(c,G.ph=='aim'?'方向鍵：選落點　按住空白鍵蓄力，放開發射（綠色區最準）':G.ph=='charge'?'放開空白鍵發射！':'方向鍵：引導　靠外圈按空白鍵＝上軌加速　在軌道上按空白鍵／經過貓耳＝衝向中央！',W/2,H-3,'#ffffffcc','7px sans-serif')};
 return G};
addEventListener('keyup',e=>{if((e.key==' '||e.key=='Enter')&&typeof MG!='undefined'&&MG&&MG.release)MG.release()});
addEventListener('pointerup',()=>{if(typeof MG!='undefined'&&MG&&MG.release)MG.release()});
function beyRules(){openDlg('📖 戰鬥陀螺 X 規則書（2.0）',`<b>① 發射</b><br>・方向鍵選落點：靠中央較穩、靠外圈容易接軌但風險高<br>・按住空白鍵蓄力，放開發射。綠色「甜蜜點」最準；蓄滿反而會偏、會晃<br><br><b>② 戰鬥（有限操控）</b><br>・方向鍵：輕微引導（有慣性，不能急轉）<br>・空白鍵：修正路線；靠近外圈時按＝上軌<br>・外圈一整圈都是加速軌道：靠近外圈按空白鍵就能上軌<br>・在軌道上會越轉越快；經過上方「貓耳」會自動衝向中央，也可以自己按空白鍵提早衝<br>・從貓耳衝下來剛好朝下方 XTREME 袋，正面撞到對手最容易拿 3 分！<br>・長按空白鍵：抓地，引導變強但持續消耗轉速<br><br><b>③ 得分</b><br>・轉停（對手停止旋轉）＝ 1 分<br>・場外（左右兩側 OVER 袋）＝ 2 分<br>・極限（下方 XTREME 袋）＝ 3 分<br><br><b>④ 配件個性</b><br>・刃：攻擊刃撞得重但自己也彈得遠；防禦刃不易被撞飛<br>・棘輪：越重越穩，但加速慢<br>・軸心：平底 F／高速 H 跑得積極、容易接軌但耗轉快；針尖 N 耐久穩定<br><br>正規賽需登錄 3 顆陀螺，每顆只能出戰一次。`,[['返回','',beyHub]])}
// ── 零件圖示（對話選單用） ──
const PIMG={b1:[0,2],b2:[0,3],b3:[0,1],b4:[0,4],b5:[0,3],b6:[0,0],b7:[0,4],b8:[0,5],r1:[1,0],r2:[1,1],r3:[1,2],r4:[1,3],r5:[1,4],bF:[2,0],bN:[2,1],bB:[2,2],bG:[2,5],bH:[2,4]},PURL={};
function pimg(id){if(PURL[id])return PURL[id];const q=PIMG[id];if(!q||!uaOK('bx_parts'))return '';const c=document.createElement('canvas');c.width=c.height=64;c.getContext('2d').drawImage(UAI.bx_parts,q[1]*64,q[0]*64,64,64,0,0,64,64);return PURL[id]=`<img src="${c.toDataURL()}" style="width:22px;height:22px;image-rendering:pixelated;vertical-align:middle;margin-right:4px">`}
['partShop','beySlot','bePart','beyUp','beyDeck'].forEach(fn=>{const f0=window[fn]||eval(fn);const w=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts))opts.forEach(o=>{if(typeof o[0]!='string')return;for(const id in PIMG){const p=partOf(id);if(p&&o[0].includes(p.n)){o[0]=pimg(id)+o[0];break}}});return od.call(this,t,d,opts,...r)};try{return f0.apply(this,arguments)}finally{openDlg=od}};eval(fn+'=w')});
{const _oh=optHTML;optHTML=function(o,i,grid){if(!grid&&typeof o[0]=='string'){const m=o[0].match(/^<img src="([^"]+)"[^>]*>([\s\S]*)$/);if(m)return `<button data-i="${i}" ${o[3]?'disabled':''} class="dopt wic"><img class="oic" src="${m[1]}"><b>${i+1}　${m[2]}</b>${o[1]?`<div class="sub">${o[1]}</div>`:''}</button>`}return _oh.apply(this,arguments)}}
