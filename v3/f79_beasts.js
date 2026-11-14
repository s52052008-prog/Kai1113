/* v12.5 七大新環境：專屬怪物、動作、大魔王機制 */
// ───────── 共用小工具 ─────────
const vbUs=X=>[X.P,...X.AL.filter(a=>!a.dead)];
const vbSegD=(px,py,x0,y0,x1,y1)=>{const vx=x1-x0,vy=y1-y0,L=vx*vx+vy*vy||1;let t=((px-x0)*vx+(py-y0)*vy)/L;t=Math.max(0,Math.min(1,t));return Math.hypot(px-x0-vx*t,py-y0-vy*t)};
function vbBolt(g,x,y0,y1,w,c){let px=x,py=y0;g.strokeStyle=c||'#fff6a0';g.lineWidth=w||4;g.shadowColor='#fff6a0';g.shadowBlur=14;g.beginPath();g.moveTo(px,py);const n=8;for(let i=1;i<=n;i++){py=y0+(y1-y0)*i/n;px=x+(i<n?(Math.random()-.5)*36:0);g.lineTo(px,py)}g.stroke();g.shadowBlur=0;g.strokeStyle='#fff';g.lineWidth=(w||4)*.4;g.stroke()}
// 長方形範圍攻擊（先出現紅色預警，時間到才打）
function vbRect(X,o){X.G.fx.push({k:'vbr',x:o.x,y:o.y,w:o.w,h:o.h,t:-(o.delay||.6),dur:o.dur||.25,d:o.d,c:o.c||'#ff4a4a',fx:o.fx??o.x,fy:o.fy??o.y,
 upd(f){if(!f.done&&f.t>=0){f.done=1;vbUs(X).forEach(u=>{if(Math.abs(u.x-f.x)<f.w/2+u.r*.6&&Math.abs(u.y-f.y)<f.h/2+u.r*.6){X.hurtP(f.d,f.fx,f.fy,u);if(o.onHit)o.onHit(u)}});if(o.boom)o.boom(f)}},
 drw(g,f){if(f.t<0){g.fillStyle=`rgba(255,60,60,${.12+.1*Math.sin(X.G.t*18)})`;g.fillRect(f.x-f.w/2,f.y-f.h/2,f.w,f.h);g.strokeStyle='rgba(255,60,60,.8)';g.lineWidth=2;g.strokeRect(f.x-f.w/2,f.y-f.h/2,f.w,f.h)}else if(o.drw)o.drw(g,f);else{g.globalAlpha=1-f.t/f.dur;g.fillStyle=f.c;g.fillRect(f.x-f.w/2,f.y-f.h/2,f.w,f.h);g.globalAlpha=1}}})}
// 落雷（預警圈＋閃電）
function vbStrike(X,x,y,delay,d,r){X.G.fx.push({k:'eaoe',x,y,r:r||56,t:-delay,dur:.35,d,done:0});X.G.fx.push({k:'vbbolt',x,y,t:-delay,dur:.3,drw(g,f){if(f.t>=0){g.save();g.globalAlpha=1-f.t/f.dur;vbBolt(g,f.x,(X.G.cyS||0)-20,f.y+10,6);g.restore()}}})}
// 持續範圍（毒氣、重力場、旋風…）：每 tick 秒對範圍內的人造成傷害
function vbZone(X,o){const z=Object.assign({k:'vbz',t:-(o.delay||0),dur:o.dur||3,tk:0},o);z.upd=function(f,dt){if(o.move)o.move(f,dt);if(f.t<0)return;f.tk-=dt;vbUs(X).forEach(u=>{if(o.inside(f,u)){if(o.each)o.each(f,u,dt);if(f.tk<=0&&f.d)X.hurtP(f.d,f.x,f.y,u)}});if(f.tk<=0)f.tk=o.tick||.5};X.G.fx.push(z);return z}
// ───────── 子彈樣式 ─────────
const VPRD={
 bubble:(g,q)=>{g.strokeStyle='#cfefff';g.lineWidth=2;g.fillStyle='rgba(120,200,255,.45)';g.beginPath();g.arc(q.x,q.y+Math.sin(q.t*10)*2,q.r,0,7);g.fill();g.stroke();g.fillStyle='#fff';g.fillRect(q.x-q.r*.5,q.y-q.r*.5,3,3)},
 spike:(g,q)=>{g.save();g.translate(q.x,q.y);g.rotate(Math.atan2(q.vy,q.vx));g.fillStyle='#f0e0a0';g.beginPath();g.moveTo(10,0);g.lineTo(-6,-3);g.lineTo(-6,3);g.fill();g.restore()},
 poison:(g,q)=>{g.fillStyle='#8ae04a';g.beginPath();g.arc(q.x,q.y,q.r,0,7);g.fill();g.fillStyle='#c060e0';g.beginPath();g.arc(q.x+2,q.y-2,q.r*.45,0,7);g.fill();if(Math.random()<.4)q.G.parts.push({x:q.x,y:q.y,vx:0,vy:-30,t:.1,c:'#9ae05a'})},
 ice:(g,q)=>{g.save();g.translate(q.x,q.y);g.rotate(Math.atan2(q.vy,q.vx));g.fillStyle='#e0f8ff';g.beginPath();g.moveTo(12,0);g.lineTo(0,-5);g.lineTo(-8,0);g.lineTo(0,5);g.fill();g.fillStyle='#7ad0ff';g.fillRect(-4,-1,10,2);g.restore()},
 sonic:(g,q)=>{const a=Math.atan2(q.vy,q.vx),r=8+q.t*30;g.strokeStyle=`rgba(255,120,160,${Math.max(.2,1-q.t/q.life)})`;g.lineWidth=3;for(let i=0;i<2;i++){g.beginPath();g.arc(q.x-Math.cos(a)*i*10,q.y-Math.sin(a)*i*10,r-i*4,a-.9,a+.9);g.stroke()}},
 feather:(g,q)=>{g.save();g.translate(q.x,q.y);g.rotate(Math.atan2(q.vy,q.vx));g.fillStyle='#1a1424';g.beginPath();g.ellipse(0,0,12,4,0,0,7);g.fill();g.strokeStyle='#8a4ab0';g.lineWidth=1;g.beginPath();g.moveTo(-12,0);g.lineTo(12,0);g.stroke();g.restore()},
 orb:(g,q)=>{const gr=g.createRadialGradient(q.x,q.y,1,q.x,q.y,q.r*2);gr.addColorStop(0,'#f0d0ff');gr.addColorStop(.4,'#8a2ae0');gr.addColorStop(1,'rgba(40,0,80,0)');g.fillStyle=gr;g.beginPath();g.arc(q.x,q.y,q.r*2,0,7);g.fill()},
 mist:(g,q)=>{g.fillStyle='rgba(200,180,255,.55)';g.beginPath();g.arc(q.x,q.y,q.r*1.4,0,7);g.fill();g.fillStyle='#f0e8ff';g.beginPath();g.arc(q.x,q.y,q.r*.6,0,7);g.fill();if(Math.random()<.5)q.G.parts.push({x:q.x,y:q.y,vx:-q.vx*.1,vy:0,t:.1,c:'#c8b8ff'})},
 ink:(g,q)=>{g.fillStyle='#14080e';g.beginPath();g.arc(q.x,q.y,q.r,0,7);g.fill();g.fillStyle='#3a1a2a';g.beginPath();g.arc(q.x-2,q.y-2,q.r*.4,0,7);g.fill()}};
function vbShot(X,m,a,sp,kind,mul,ex){const q=Object.assign({x:m.x+Math.cos(a)*m.r*.8,y:m.y+Math.sin(a)*m.r*.8-6,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,d:m.atk*(mul||1),t:0,life:3,own:'m',r:8,G:X.G},ex||{});if(kind=='fire')q.fireb=1;else q.drw=VPRD[kind];X.G.pr.push(q);return q}
// 毒氣小水窪
function vbPuddle(X,x,d,dur){vbZone(X,{x,y:X.GY,w:110,dur:dur||3.5,d,tick:.5,inside:(f,u)=>Math.abs(u.x-f.x)<f.w/2&&u.y>f.y-50,drw(g,f){const a=Math.min(1,(f.dur-f.t)/.5);g.fillStyle=`rgba(140,220,70,${.35*a})`;g.beginPath();g.ellipse(f.x,f.y-4,f.w/2,12,0,0,7);g.fill();if(Math.random()<.3)X.G.parts.push({x:f.x+(Math.random()-.5)*f.w,y:f.y-6,vx:0,vy:-40,t:0,c:'#b0f070'})}})}
const VSHOOT={
 bubble:(X,m,a)=>vbShot(X,m,a,190,'bubble',1,{r:10,life:3.5}),
 spike:(X,m,a)=>vbShot(X,m,a,330,'spike',.8,{r:6}),
 fire:(X,m,a)=>vbShot(X,m,a,300,'fire',1.1,{r:9}),
 fire3:(X,m,a)=>{for(let i=-1;i<=1;i++)vbShot(X,m,a+i*.2,300,'fire',1,{r:9})},
 ice3:(X,m,a)=>{for(let i=-1;i<=1;i++)vbShot(X,m,a+i*.16,360,'ice',.8,{r:7})},
 sonic:(X,m,a)=>vbShot(X,m,a,240,'sonic',1,{r:14,life:2.2}),
 mist:(X,m,a)=>vbShot(X,m,a,230,'mist',1,{r:9,life:3,upd(q,dt){const u=X.P,b=Math.atan2(u.y-q.y,u.x-q.x),c=Math.atan2(q.vy,q.vx);let df=((b-c+9.42)%6.283)-3.14;const n=c+Math.max(-1.2*dt,Math.min(1.2*dt,df)),s=Math.hypot(q.vx,q.vy);q.vx=Math.cos(n)*s;q.vy=Math.sin(n)*s}}),
 orb:(X,m,a)=>vbShot(X,m,a,210,'orb',1.1,{r:9,life:3.5,upd(q,dt){const u=X.P,b=Math.atan2(u.y-q.y,u.x-q.x),c=Math.atan2(q.vy,q.vx);let df=((b-c+9.42)%6.283)-3.14;const n=c+Math.max(-.9*dt,Math.min(.9*dt,df)),s=Math.hypot(q.vx,q.vy);q.vx=Math.cos(n)*s;q.vy=Math.sin(n)*s}}),
 feather3:(X,m,a)=>{for(let i=-1;i<=1;i++)vbShot(X,m,a+i*.14,380,'feather',.8,{r:7})},
 poison:(X,m,a,TG)=>{const dx=TG.x-m.x,T=1,vx=dx/T,vy=(TG.y-m.y)/T-450*T;vbShot(X,m,0,0,'poison',1,{vx,vy,grav:1,r:9,life:3,land:q=>vbPuddle(X,q.x,m.atk*.35)})},
 ink:(X,m,a)=>vbShot(X,m,a,260,'ink',1,{r:10,hitP:()=>{X.G.inkT=2.8;X.say('🖤 被墨汁噴到，什麼都看不清楚！',1.4)}})};
// ───────── 小怪通用 AI：移動方式＋招式清單 ─────────
function vbFace(m,TG){return TG.x>=m.x?0:Math.PI}
function vbMove(m,dt,X,TG,dx,dy,d,sl){const T=m.T,s=Math.sign(dx)||1,spd=T.spd*sl;m.ht=(m.ht||0)-dt;
 if(T.mv=='walk'){const k=T.keep||0;let dir=0;if(Math.abs(dx)>Math.max(60,k))dir=s;else if(k&&Math.abs(dx)<k*.6)dir=-s;if(m.og){m.vx=dir*spd;if(dy<-90&&Math.abs(dx)<300&&Math.random()<dt*1.5)m.vy=-800;if(dy>90&&m.plat&&m.plat.thin&&Math.random()<dt)m.drop=.3}}
 else if(T.mv=='hop'){if(m.og&&m.ht<=0){m.ht=.9+Math.random()*.7;m.vx=s*spd*(1.4+Math.random()*.6);m.vy=dy<-80&&Math.abs(dx)<320?-820:-(380+Math.random()*180)}}
 else if(T.mv=='fly'||T.mv=='swarm'){const R=T.mv=='swarm'?70:110,H=T.keep?T.keep*.55:130,hx=TG.x+Math.sin(m.ph*1.2+(m.seed||0))*R*(T.keep?1.8:1),hy=TG.y-H+Math.sin(m.ph*2.1)*24;m.vx+=(hx-m.x)*(T.mv=='swarm'?2.6:1.4)*dt*sl;m.vy+=(hy-m.y)*1.4*dt*sl;if(T.mv=='swarm'&&Math.random()<dt*3){m.vx+=(Math.random()-.5)*300;m.vy+=(Math.random()-.5)*200}}
 else if(T.mv=='float'){const k=T.keep||200,want=d>k?1:d<k*.7?-1:0;m.vx+=(dx/d)*want*spd*2*dt;m.vy+=((TG.y-90-m.y)*.9+Math.sin(m.ph*2)*20)*dt}}
// 招式：開始（S）與進行中（U）
const VAS={
 lunge(m,X,TG,a){m.st='wind';m.at=.5;m.vx=0;if(m.T.fly){m.la=Math.atan2(TG.y-m.y,TG.x-m.x)}else m.la=vbFace(m,TG)},
 pounce(m,X,TG,a){if(!m.og)return m.t=.3;m.st='pounceW';m.at=.35;m.vx=0},
 shoot(m,X,TG,a){m.st='shoot';m.at=.4;m.ak=a;m.vx*=.3},
 burst(m,X,TG,a){m.st='shoot';m.at=.6;m.ak=a;m.puffT=1;m.vx*=.2},
 lob(m,X,TG,a){m.st='puff';m.at=.5;m.ak=a;m.puffT=.8},
 guard(m,X,TG,a){m.st='guard';m.at=1.8;m.gf=TG.x>=m.x?1:-1;m.vx=0;X.num(m.x,m.y-m.r-16,'🛡️ 舉起大鉗子','#9ae8ff')},
 tongue(m,X,TG,a){m.st='tongue';m.at=.55;m.la=Math.atan2(TG.y-m.y,TG.x-m.x);m.vx=0;const R=a[2]*(m.T.sprS||1),L={x0:m.x,y0:m.y,a:m.la,len:R};m.tg=L;X.G.fx.push({k:'vbtw',t:0,dur:.55,drw(g,f){g.strokeStyle=`rgba(255,80,120,${.3+.3*Math.sin(X.G.t*20)})`;g.lineWidth=3;g.setLineDash([6,6]);g.beginPath();g.moveTo(m.x,m.y);g.lineTo(m.x+Math.cos(L.a)*L.len,m.y+Math.sin(L.a)*L.len);g.stroke();g.setLineDash([])}})},
 slam(m,X,TG,a){m.st='slam';m.at=.75;m.vx=0;X.G.fx.push({k:'eaoe',x:m.x,y:m.y,r:(a[2]||150)*.8*(m.T.sprS||1),t:-.75,dur:.35,d:m.atk*1.4,done:0,quake:1})},
 strike(m,X,TG,a){m.st='cast';m.at=.5;m.vx=0;const us=vbUs(X);us.forEach((u,i)=>vbStrike(X,u.x,u.y,.95+i*.15,m.atk*1.2,54))},
 howl(m,X,TG,a){const id=a[4];if(X.G.mobs.filter(o=>o.id==id).length>=6)return m.t=2;m.st='howl';m.at=.7;m.vx=0;m.ak=a},
 blink(m,X,TG,a){m.st='hide';m.at=.4;m.vx=0},
 pull(m,X,TG,a){m.st='pull';m.at=.5;m.vx*=.3;vbGrav(X,TG.x,TG.y,2.4,150,m.atk*.4)}};
const VAU={
 wind(m,dt,X,TG){m.vx*=.8;if(m.T.fly)m.vy*=.8;if(m.at<=0){m.st='dash';m.at=.42;const sp=m.T.dash||560;m.vx=Math.cos(m.la)*sp;if(m.T.fly)m.vy=Math.sin(m.la)*sp}},
 dash(m,dt,X,TG){if(m.at<=0)vbIdle(m)},
 pounceW(m,dt,X,TG){if(m.at<=0){const dx=TG.x-m.x;m.vx=Math.max(-520,Math.min(520,dx*1.4));m.vy=-720;m.st='pounce';m.at=1.2}},
 pounce(m,dt,X,TG){if(m.og&&m.at<1){X.puff(m.x,m.y+m.r,10,'#9ae05a',160);vbIdle(m)}else if(m.at<=0)vbIdle(m)},
 shoot(m,dt,X,TG){m.vx*=.9;if(m.at<=0){const a=m.ak,ang=Math.atan2(TG.y-m.y,TG.x-m.x);if(a[0]=='burst'){const n=a[5]||10;for(let i=0;i<n;i++)VSHOOT[a[4]](X,m,i/n*6.283+m.ph,TG)}else VSHOOT[a[4]](X,m,ang,TG);vbIdle(m)}},
 puff(m,dt,X,TG){m.vx*=.9;if(m.at<=0){VSHOOT[m.ak[4]](X,m,0,TG);vbIdle(m)}},
 guard(m,dt,X,TG){m.vx=0;if(m.at<=0)vbIdle(m)},
 tongue(m,dt,X,TG){if(m.at<=0){const L=m.tg,x1=m.x+Math.cos(L.a)*L.len,y1=m.y+Math.sin(L.a)*L.len;vbUs(X).forEach(u=>{if(vbSegD(u.x,u.y,m.x,m.y,x1,y1)<u.r+10){X.hurtP(m.atk*1.2,m.x,m.y,u);u.x+=(m.x-u.x)*.35}});
  X.G.fx.push({k:'vbtg',t:0,dur:.3,x0:m.x,y0:m.y,x1,y1,drw(g,f){const k=f.t<.12?f.t/.12:1-(f.t-.12)/.18;g.strokeStyle='#ff6a8a';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(f.x0,f.y0);g.lineTo(f.x0+(f.x1-f.x0)*k,f.y0+(f.y1-f.y0)*k);g.stroke();g.fillStyle='#ff9ab0';g.beginPath();g.arc(f.x0+(f.x1-f.x0)*k,f.y0+(f.y1-f.y0)*k,7,0,7);g.fill()}});vbIdle(m)}},
 slam(m,dt,X,TG){m.vx=0;if(m.at<=0){X.G.shake=Math.max(X.G.shake,7);X.puff(m.x,m.y+m.r,18,m.T.col,200);vbIdle(m)}},
 cast(m,dt,X,TG){m.vx=0;if(m.at<=0)vbIdle(m)},
 howl(m,dt,X,TG){m.vx=0;if(m.at<=0){const id=m.ak[4];for(let i=0;i<2;i++)X.mkMob(id,m.x+(i?50:-50),m.y-40,X.G.floor);X.G.fx.push({k:'ring',x:m.x,y:m.y,r:160,t:0,dur:.5,c:'#e8f0ff'});X.say('🐺 '+(m.name||m.T.n)+' 呼叫了同伴！',1.2);vbIdle(m)}},
 hide(m,dt,X,TG){m.alpha=Math.max(.05,m.at/.4);if(m.at<=0){m.ghost=1;const s=Math.random()<.5?-1:1;m.x=Math.max(60,Math.min(X.AW-60,TG.x+s*110));if(m.T.fly)m.y=TG.y-40;else m.y=TG.y;m.vx=0;m.vy=0;m.st='appear';m.at=.35}},
 appear(m,dt,X,TG){m.alpha=1-m.at/.35;if(m.at<=0){m.alpha=1;m.ghost=0;VAS.lunge(m,X,TG);m.at=.32}},
 pull(m,dt,X,TG){if(m.at<=0)vbIdle(m)}};
function vbIdle(m){m.st='idle';m.t=(m.cd||2)*(.8+Math.random()*.4)}
// 重力場：把人往中心吸、移動變慢
function vbGrav(X,x,y,dur,R,d){vbZone(X,{x,y,dur,d,tick:.6,delay:.3,inside:(f,u)=>Math.hypot(u.x-f.x,u.y-f.y)<R,each(f,u,dt){u.x+=(f.x-u.x)*Math.min(1,2.2*dt);u.vy=Math.min(u.vy||0,120);u.slowT=Math.max(u.slowT||0,.3)},
 drw(g,f){const a=f.t<0?.5:1;g.save();g.translate(f.x,f.y);for(let i=0;i<3;i++){const r=R*(1-((X.G.t*.8+i/3)%1));g.strokeStyle=`rgba(170,120,255,${.5*a*(1-r/R)+.15})`;g.lineWidth=3;g.beginPath();g.arc(0,0,r,0,7);g.stroke()}g.fillStyle='rgba(60,20,120,.25)';g.beginPath();g.arc(0,0,R,0,7);g.fill();g.rotate(X.G.t*3);g.fillStyle='#e0d0ff';for(let i=0;i<4;i++){g.rotate(1.57);g.fillRect(R*.3,-1,R*.25,2)}g.restore()}})}
function vrGenAI(m,dt,X,TG,dx,dy,d,sl){const T=m.T;if(m.st!==m._ls){if(['shoot','puff','tongue','slam'].includes(m._ls)&&m.st=='idle')m.aa=.4;m._ls=m.st;m.ad=Math.max(.05,m.at||.4)}if(m.aa>0)m.aa-=dt;if(T.lives&&m.lives==null)m.lives=T.lives;m.at=(m.at||0)-dt*sl;if(m.puffT>0)m.puffT-=dt;if(m.seed==null)m.seed=Math.random()*6;
 if(T.bossAI)return VBAI[T.bossAI](m,dt,X,TG,dx,dy,d,sl);
 if(m.st!='idle'&&VAU[m.st]){VAU[m.st](m,dt,X,TG);return}
 if(m.st!='idle')m.st='idle';vbMove(m,dt,X,TG,dx,dy,d,sl);
 if(m.t<=0){const L=T.sk.filter(a=>d<a[2]*(T.sprS||1)&&(a[3]==null||Math.abs(dy)<a[3]));if(L.length){const a=L[Math.floor(Math.random()*L.length)];m.cd=a[1];VAS[a[0]](m,X,TG,a)}else m.t=.4}}
// ───────── 受擊／死亡的特殊規則 ─────────
function vrGenHit(m,o,X){if(m.ghost){if((m.ivT||0)<X.G.t){m.ivT=X.G.t+.4;X.num(m.x,m.y-m.r-20,'霧化中（打不到）','#c8c0ff')}return 0}
 if(m.st=='guard'){const from=o.fx??X.P.x;if((from-m.x)*m.gf>0){if((m.ivT||0)<X.G.t){m.ivT=X.G.t+.4;X.num(m.x,m.y-m.r-20,'🛡️ 格擋','#9ae8ff')}return .2}}
 if(m.st=='morph'||m.st=='revive'||m.st=='split'){if((m.ivT||0)<X.G.t){m.ivT=X.G.t+.5;X.num(m.x,m.y-m.r-30,'無敵','#9ae8ff')}return 0}return 1}
function vrGenDie(m,X){if(m.T.lives&&m.lives==null)m.lives=m.T.lives;if(m.lives>1){m.lives--;m.hp=m.mhp;m.st='revive';m.at=2.2;m.sp=(m.sp||1)*1.08;X.G.shake=16;X.G.fx.push({k:'ring',x:m.x,y:m.y,r:260,t:0,dur:.8,c:'#a04aff'});
  for(let i=0;i<20;i++)vbShot(X,m,i/20*6.283,260,'feather',.7,{r:7});X.say('🪶 墮天使失去了一隻翅膀……還剩 '+m.lives+' 條命！',2.4);X.anyone('boss',1);return false}
 if(m.cloneOf){const b=m.cloneOf;b.clones=(b.clones||[]).filter(c=>c!==m);if(!b.clones.length&&b.st=='split'){b.st='stunned';b.at=3;b.ghost=0;b.alpha=1;X.say('💥 分身全滅！虛霧巨人現形了，快打！',2.2);X.G.shake=10}}return true}
// ───────── 大魔王 ─────────
const vbRage=m=>m.hp<m.mhp*.5;
const VBAI={
 // 深海閻王：觸手從四面八方竄出、雙臂重擊、墨汁、召喚蝦兵蟹將
 octo(m,dt,X,TG,dx,dy,d){const G=X.G,rage=vbRage(m),s=Math.sign(dx)||1;
  if(m.st=='idle'){if(m.og)m.vx=Math.abs(dx)>220?s*m.T.spd:0;if(m.t<=0){const r=Math.random();m.vx=0;
    if(r<.38){m.st='tent';m.at=.5;X.say('🐙 觸手從四面八方竄出來了！看紅色區域！',1.4);const n=rage?7:5,us=vbUs(X),cy=(G.cyS||0);
     for(let i=0;i<n;i++){const u=us[i%us.length],k=Math.floor(Math.random()*3),dl=1+i*.28;
      if(k==0)vbTent(X,u.x+(Math.random()-.5)*80,X.GY-140,60,280,dl,m.atk*1.3,'up');
      else if(k==1){const L=Math.random()<.5;vbTent(X,L?Math.max(0,G.cam.x)+260:G.cam.x+X.VW-260,u.y,520,56,dl,m.atk*1.3,L?'right':'left')}
      else vbTent(X,u.x+(Math.random()-.5)*80,cy+150,60,300,dl,m.atk*1.3,'down')}}
    else if(r<.62){m.st='raise';m.at=.85;const w=230;vbRect(X,{x:m.x+s*(m.r+w/2-30),y:m.y+m.T.fo-60,w,h:120,delay:.85,d:m.atk*1.6,c:'#c03a66',boom:f=>{G.shake=14;X.puff(f.x,f.y+50,30,'#a03a66',260)}});vbRect(X,{x:m.x-s*(m.r+60),y:m.y+m.T.fo-60,w:150,h:120,delay:.85,d:m.atk*1.2})}
    else if(r<.82){m.st='ink';m.at=.5}
    else if(G.mobs.length<12){m.st='summon';m.at=.7}else m.t=.5}}
  else if(m.st=='tent'){if(m.at<=0)vbBIdle(m,rage?1.5:2.2)}
  else if(m.st=='raise'){if(m.at<=0){m.st='slam';m.at=.5}}
  else if(m.st=='slam'){if(m.at<=0)vbBIdle(m,rage?1.3:1.9)}
  else if(m.st=='ink'){if(m.at<=0){const a=Math.atan2(dy,dx),n=rage?7:5;for(let i=0;i<n;i++)VSHOOT.ink(X,m,a+(i-(n-1)/2)*.18);vbBIdle(m,1.6)}}
  else if(m.st=='summon'){if(m.at<=0){['sea_shrimp','sea_crab'].forEach((id,i)=>X.mkMob(id,m.x+(i?140:-140),m.y-40,G.floor));X.say('🦐🦀 蝦兵蟹將，上！',1.4);vbBIdle(m,1.8)}}},
 // 腐沼蟾皇：舌頭、超大範圍跳砸、全場毒氣
 toad(m,dt,X,TG,dx,dy,d){const G=X.G,rage=vbRage(m),s=Math.sign(dx)||1;
  if(m.st=='idle'){m.ht=(m.ht||0)-dt;if(m.og&&m.ht<=0&&Math.abs(dx)>260){m.ht=2.2;m.vx=s*220;m.vy=-420}if(m.t<=0&&m.og){const r=Math.random();m.vx=0;
    if(r<.36){m.st='tongue';m.at=.7;m.la=Math.atan2(dy-10,dx);const L={a:m.la,len:520};m.tg=L;G.fx.push({k:'vbtw',t:0,dur:.7,drw(g){g.strokeStyle=`rgba(255,60,90,${.35+.3*Math.sin(G.t*22)})`;g.lineWidth=16;g.beginPath();g.moveTo(m.x,m.y-10);g.lineTo(m.x+Math.cos(L.a)*L.len,m.y-10+Math.sin(L.a)*L.len);g.stroke()}})}
    else if(r<.62){m.st='leap';m.at=1.1;m.sx=m.x;m.tx=Math.max(120,Math.min(X.AW-120,TG.x));X.say('🐸 蟾皇要跳起來砸地了！落地前跳起來躲！',1.4);
     G.fx.push({k:'vbtw',t:0,dur:1.1,drw(g,f){g.strokeStyle='rgba(255,60,60,.7)';g.lineWidth=3;g.fillStyle='rgba(255,60,60,.12)';g.beginPath();g.ellipse(m.tx,X.GY-4,560,30,0,0,7);g.fill();g.stroke()}})}
    else if(r<.84&&!G.fogOn){m.st='gas';m.at=1.4;X.say('☠️ 毒氣要漫上來了！快爬到平台上！',2)}
    else if(G.mobs.length<12){m.st='summon';m.at=.6}else m.t=.5}}
  else if(m.st=='tongue'){if(m.at<=0){const L=m.tg,y0=m.y-10,x1=m.x+Math.cos(L.a)*L.len,y1=y0+Math.sin(L.a)*L.len;vbUs(X).forEach(u=>{if(vbSegD(u.x,u.y,m.x,y0,x1,y1)<u.r+16){X.hurtP(m.atk*1.5,m.x,m.y,u);u.x+=(m.x-u.x)*.5}});
    G.fx.push({k:'vbtg',t:0,dur:.45,x0:m.x,y0,x1,y1,drw(g,f){const k=f.t<.15?f.t/.15:1-(f.t-.15)/.3;g.strokeStyle='#d03a5a';g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(f.x0,f.y0);g.lineTo(f.x0+(f.x1-f.x0)*k,f.y0+(f.y1-f.y0)*k);g.stroke();g.strokeStyle='#ff8aa0';g.lineWidth=6;g.stroke();g.fillStyle='#ff6a8a';g.beginPath();g.arc(f.x0+(f.x1-f.x0)*k,f.y0+(f.y1-f.y0)*k,12,0,7);g.fill()}});vbBIdle(m,rage?1.2:1.8)}}
  else if(m.st=='leap'){const k=1-m.at/1.1;m.x=m.sx+(m.tx-m.sx)*k;m.z=Math.sin(k*Math.PI)*220;m.vx=0;if(m.at<=0){m.z=0;G.shake=18;G.fx.push({k:'ring',x:m.x,y:X.GY,r:560,t:0,dur:.6,c:'#9ae05a'});X.puff(m.x,X.GY,40,'#7a8a3a',300);vbUs(X).forEach(u=>{if(u.og&&Math.abs(u.x-m.x)<560)X.hurtP(m.atk*1.6,m.x,m.y,u)});vbBIdle(m,rage?1.2:1.8)}}
  else if(m.st=='gas'){if(m.at<=0){G.fogOn=1;vbZone(X,{x:X.AW/2,y:X.GY,dur:6,d:m.atk*.45,tick:.5,inside:(f,u)=>u.y>X.GY-120,move(f){if(f.t>f.dur-.05)G.fogOn=0},drw(g,f){const a=Math.min(1,f.t*2,(f.dur-f.t)*2);g.fillStyle=`rgba(120,200,60,${.32*a})`;g.fillRect(0,X.GY-130,X.AW,140);g.fillStyle=`rgba(170,90,220,${.18*a})`;for(let i=0;i<14;i++){const x=(i*237+G.t*30)%X.AW;g.beginPath();g.ellipse(x,X.GY-80+Math.sin(G.t+i)*20,90,34,0,0,7);g.fill()}if(Math.random()<.5)G.parts.push({x:G.cam.x+Math.random()*X.VW,y:X.GY-10,vx:0,vy:-70,t:0,c:'#b0f070'})}});vbBIdle(m,2)}}
  else if(m.st=='summon'){if(m.at<=0){for(let i=0;i<3;i++)X.mkMob(i==1?'sw_tfrog':'sw_frog',m.x+(i-1)*120,m.y-60,G.floor);X.say('🐸 呱呱呱！青蛙大軍！',1.2);vbBIdle(m,1.6)}}},
 // 霜月狼王・芬里爾：巨狼 → 狼人
 fenrir(m,dt,X,TG,dx,dy,d){const G=X.G,s=Math.sign(dx)||1,were=m.form==2;if(!m.form)m.form=1;
  if(m.form==1&&vbRage(m)&&m.st!='morph'){m.st='morph';m.at=2.4;m.vx=0;X.say('🌕 芬里爾仰天長嚎……變身成狼人了！',2.6);G.shake=12;return}
  if(m.st=='morph'){m.vx=0;if(Math.random()<.6)G.parts.push({x:m.x+(Math.random()-.5)*120,y:m.y+(Math.random()-.5)*100,vx:0,vy:-80,t:0,c:'#a8d8ff'});if(m.at<=0){m.form=2;m.fo=108;m.r=m.T.r*1.15;m.sp=1.3;m.y-=40;G.fx.push({k:'ring',x:m.x,y:m.y,r:260,t:0,dur:.7,c:'#ff3a3a'});G.shake=16;vbBIdle(m,1)}return}
  if(m.st=='idle'){if(m.og)m.vx=Math.abs(dx)>(were?110:180)?s*m.T.spd*(were?1.25:1):0;if(m.t<=0){const r=Math.random();m.la=vbFace(m,TG);m.vx=0;
    if(!were){if(r<.45){m.st='wind';m.at=.6}else if(r<.7){m.st='breath';m.at=.6}else if(G.mobs.length<12){m.st='howl';m.at=.9}else{m.st='wind';m.at=.6}}
    else{if(r<.38){m.st='claw';m.at=.4;m.cc=0}else if(r<.62){m.st='wind';m.at=.45;m.bite=1}else if(r<.84){m.st='leap';m.at=1;m.sx=m.x;m.sy=m.y;m.tx=Math.max(100,Math.min(X.AW-100,TG.x));G.fx.push({k:'eaoe',x:m.tx,y:TG.y,r:150,t:-1,dur:.35,d:m.atk*1.6,done:0,quake:1})}else{m.st='howl';m.at=.9}}}}
  else if(m.st=='wind'){m.vx=0;if(m.at<=0){m.st='dash';m.at=.5;m.vx=Math.cos(m.la)*(were?820:760);if(m.bite)X.say('🩸 血盆大口！',.8)}}
  else if(m.st=='dash'){if(m.at<=0){m.bite=0;vbBIdle(m,were?1:1.6)}}
  else if(m.st=='breath'){if(m.at<=0){const a=Math.atan2(dy,dx);for(let i=0;i<7;i++)vbShot(X,m,a+(i-3)*.12,380,'ice',.8,{r:8,x:m.x+s*m.r,y:m.y-20});vbBIdle(m,1.6)}}
  else if(m.st=='howl'){m.vx=0;if(m.at<=0){for(let i=0;i<(were?3:2);i++)X.mkMob(i%2?'ic_pup':'ic_wolf',m.x+(i-1)*120,m.y-40,G.floor);G.fx.push({k:'ring',x:m.x,y:m.y,r:300,t:0,dur:.6,c:'#e8f0ff'});X.say('🐺 狼王呼喚狼群！',1.2);vbBIdle(m,1.6)}}
  else if(m.st=='claw'){m.vx=s*60;if(m.at<=0){const f=vbFace(m,TG),sx=Math.cos(f);vbRect(X,{x:m.x+sx*(m.r+60),y:m.y,w:170,h:150,delay:.25,d:m.atk*1.1,c:'#e0f0ff',drw:(g,F)=>{g.save();g.globalAlpha=1-F.t/F.dur;g.strokeStyle='#fff';g.lineWidth=5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(F.x-60+i*20,F.y-60);g.lineTo(F.x-10+i*20,F.y+60);g.stroke()}g.restore()}});m.cc++;m.at=.45;if(m.cc>=3)vbBIdle(m,1.2);else m.st='claw'}}
  else if(m.st=='leap'){const k=1-m.at/1;m.x=m.sx+(m.tx-m.sx)*k;m.z=Math.sin(k*Math.PI)*180;m.vx=0;if(m.at<=0){m.z=0;G.shake=14;X.puff(m.x,m.y+m.r,30,'#e8f0ff',240);vbBIdle(m,1)}}},
 // 德古拉公爵：翼之旋風、化成蝙蝠瞬移撕裂、蝙蝠群、吸血
 drac(m,dt,X,TG,dx,dy,d){const G=X.G,rage=vbRage(m);m.og=0;
  if(m.st=='idle'||m.st=='spread'||m.st=='drain'){const hx=TG.x+Math.sin(m.ph*.6)*260,hy=TG.y-190;m.vx+=(hx-m.x)*1.1*dt;m.vy+=(hy-m.y)*1.4*dt}
  if(m.st=='idle'){if(m.t<=0){const r=Math.random();
    if(r<.34){m.st='spread';m.at=.8;X.say('🌪️ 德古拉張開披風……翼之旋風！',1.4)}
    else if(r<.62){m.st='bats';m.at=.5;m.alpha=1}
    else if(rage&&r<.8){m.st='drain';m.at=2.4;X.say('🩸 吸血！離他遠一點！',1.4)}
    else if(G.mobs.length<12){m.st='summon';m.at=.6}else m.t=.5}}
  else if(m.st=='spread'){m.vx*=.9;m.vy*=.9;if(m.at<=0){const n=rage?3:2;for(let i=0;i<n;i++)vbTornado(X,m,i,n);vbBIdle(m,rage?1.6:2.2)}}
  else if(m.st=='bats'){m.alpha=Math.max(0,m.at/.5);m.vx*=.8;m.vy*=.8;if(Math.random()<.7)G.parts.push({x:m.x+(Math.random()-.5)*80,y:m.y+(Math.random()-.5)*100,vx:(Math.random()-.5)*300,vy:(Math.random()-.5)*300,t:0,c:'#3a0a1a'});
   if(m.at<=0){m.ghost=1;const s=Math.random()<.5?-1:1;m.x=Math.max(80,Math.min(X.AW-80,TG.x+s*140));m.y=TG.y-30;m.vx=0;m.vy=0;m.st='claw';m.at=.45;m.alpha=1;m.ghost=0;
    vbRect(X,{x:m.x-s*100,y:m.y+20,w:200,h:150,delay:.45,d:m.atk*1.5,c:'#ff2a3a',drw:(g,F)=>{g.save();g.globalAlpha=1-F.t/F.dur;g.strokeStyle='#ff3a4a';g.lineWidth=6;for(let i=0;i<4;i++){g.beginPath();g.moveTo(F.x-80,F.y-60+i*30);g.lineTo(F.x+80,F.y-40+i*30);g.stroke()}g.restore()}})}}
  else if(m.st=='claw'){m.vx=0;m.vy=0;if(m.at<=0){m.st='rise';m.at=.6}}
  else if(m.st=='rise'){m.vy=-220;if(m.at<=0)vbBIdle(m,1.2)}
  else if(m.st=='drain'){vbUs(X).forEach(u=>{if(Math.hypot(u.x-m.x,u.y-m.y)<340){m.dtk=(m.dtk||0)-dt;if(m.dtk<=0){m.dtk=.5;X.hurtP(m.atk*.5,m.x,m.y,u);m.hp=Math.min(m.mhp,m.hp+m.mhp*.012);X.num(m.x,m.y-m.r-20,'+吸血','#ff6a8a')}if(Math.random()<.4)G.parts.push({x:u.x,y:u.y,vx:(m.x-u.x)*1.6,vy:(m.y-u.y)*1.6,t:0,c:'#ff2a3a'})}});if(m.at<=0)vbBIdle(m,1.6)}
  else if(m.st=='summon'){if(m.at<=0){for(let i=0;i<3;i++)X.mkMob(i==1?'bl_swarm':'bl_bat',m.x+(i-1)*90,m.y,G.floor);X.say('🦇 去吧，我的孩子們！',1.2);vbBIdle(m,1.6)}}},
 // 千年魔龍：雷電光束、五雷轟頂、招喚雷電（抗性超高）
 dragon(m,dt,X,TG,dx,dy,d){const G=X.G,rage=vbRage(m);m.og=0;m.dr=.7;
  if(m.st=='idle'||m.st=='storm'){if(!m.side||Math.random()<dt*.15)m.side=TG.x>X.AW/2?-1:1;const hx=Math.max(160,Math.min(X.AW-160,TG.x+m.side*330)),hy=TG.y-230;m.vx+=(hx-m.x)*1.2*dt;m.vy+=(hy-m.y)*1.2*dt}
  if(m.st=='idle'){if(m.t<=0){const r=Math.random();m.vx*=.3;m.vy*=.3;
    if(r<.36){m.st='charge';m.at=1.1;m.bx=TG.x;m.by=TG.y;X.say('⚡ 魔龍在嘴裡蓄積雷電……快離開那條線！',1.4);vbBeamWarn(X,m)}
    else if(r<.64){m.st='thunder';m.at=.6;m.n5=0;X.say('🌩️ 五雷轟頂！',1.4)}
    else if(r<.84){m.st='storm';m.at=3;m.stk=0;X.say('⛈️ 天空召喚雷電！',1.4)}
    else if(G.mobs.length<12){m.st='summon';m.at=.6}else m.t=.5}}
  else if(m.st=='charge'){m.vx*=.85;m.vy*=.85;if(m.at<=0){m.st='beam';m.at=.9;G.shake=8;G.fx.push({k:'vbbeam',t:0,dur:.9,drw(g,f){const B=m.beam;if(!B)return;g.save();g.lineCap='round';g.strokeStyle='rgba(255,230,90,.35)';g.lineWidth=60+Math.sin(G.t*40)*8;g.beginPath();g.moveTo(B.mx,B.my);g.lineTo(B.x1,B.y1);g.stroke();g.strokeStyle='rgba(255,250,200,.9)';g.lineWidth=26;g.stroke();g.strokeStyle='#fff';g.lineWidth=10;g.stroke();g.restore()}})}}
  else if(m.st=='beam'){m.vx=0;m.vy=0;const mx=m.x+(m.bx>m.x?1:-1)*m.r,my=m.y-m.T.fo*.6,a=Math.atan2(m.by-my,m.bx-mx),x1=mx+Math.cos(a)*1400,y1=my+Math.sin(a)*1400;m.beam={mx,my,x1,y1};
   vbUs(X).forEach(u=>{if(vbSegD(u.x,u.y,mx,my,x1,y1)<u.r+22)X.hurtP(m.atk*1.6,mx,my,u)});if(Math.random()<.8)G.parts.push({x:mx+(x1-mx)*Math.random()*.5,y:my+(y1-my)*Math.random()*.5,vx:(Math.random()-.5)*200,vy:(Math.random()-.5)*200,t:0,c:'#fff6a0'});if(m.at<=0){m.beam=null;vbBIdle(m,rage?1.4:2)}}
  else if(m.st=='thunder'){m.vx*=.9;m.vy*=.9;if(m.at<=0){const us=vbUs(X),u=us[m.n5%us.length];vbStrike(X,u.x+(m.n5>=us.length?(Math.random()-.5)*120:0),u.y,.75,m.atk*1.4,62);m.n5++;m.at=.28;if(m.n5>=(rage?10:5))vbBIdle(m,1.8)}}
  else if(m.st=='storm'){m.stk-=dt;if(m.stk<=0){m.stk=rage?.22:.32;const x=G.cam.x+60+Math.random()*(X.VW-120);vbStrike(X,x,X.GY-20,.9,m.atk*1.2,58)}if(m.at<=0)vbBIdle(m,1.6)}
  else if(m.st=='summon'){if(m.at<=0){for(let i=0;i<2;i++)X.mkMob('th_ptero',m.x+(i?80:-80),m.y,G.floor);X.say('🦖 翼手龍，噴火！',1.2);vbBIdle(m,1.6)}}},
 // 虛霧巨人：隱身瞬移、重力場、第二型態分裂（分身沒殺完會回收精華補血）
 mist(m,dt,X,TG,dx,dy,d){const G=X.G,s=Math.sign(dx)||1;if(m.alpha==null)m.alpha=.85;m.vis=(m.vis??5)-dt;
  const th=[.55,.25].find((v,i)=>!m['sp'+i]&&m.hp<m.mhp*v);if(th!=null&&m.st!='split'&&m.st!='hide'){const i=th==.55?0:1;m['sp'+i]=1;m.st='split';m.at=16;m.ghost=1;m.alpha=.25;m.vx=0;m.clones=[];
   for(let k=0;k<3;k++){X.mkMob('ph_clone',Math.max(100,Math.min(X.AW-100,m.x+(k-1)*360)),m.y-60,G.floor);const c=G.mobs[G.mobs.length-1];c.hp=c.mhp=m.mhp*.09;c.cloneOf=m;m.clones.push(c)}
   G.fx.push({k:'vbcl',t:0,dur:16.2,drw(g){if(m.st!='split')return;(m.clones||[]).forEach(c=>{if(c.dead)return;g.strokeStyle=`rgba(180,160,255,${.35+.25*Math.sin(G.t*10)})`;g.lineWidth=4;g.setLineDash([10,8]);g.lineDashOffset=-G.t*60;g.beginPath();g.moveTo(c.x,c.y);g.lineTo(m.x,m.y);g.stroke();g.setLineDash([]);if(Math.random()<.3)G.parts.push({x:c.x+(m.x-c.x)*Math.random(),y:c.y+(m.y-c.y)*Math.random(),vx:0,vy:-30,t:0,c:'#c8c0ff'})});g.font='bold 22px sans-serif';g.textAlign='center';g.lineWidth=4;g.strokeStyle='#000';const t='分身回收倒數 '+Math.ceil(m.at);g.strokeText(t,m.x,m.y-m.T.fo-10);g.fillStyle='#e0d0ff';g.fillText(t,m.x,m.y-m.T.fo-10)}});
   X.say('🌫️ 虛霧巨人分裂了！16 秒內打倒所有分身，不然它們會回收精華！',2.6);G.shake=10;return}
  if(m.st=='split'){m.vx=0;m.alpha=.2+.1*Math.sin(G.t*4);if(m.at<=0){const n=(m.clones||[]).filter(c=>!c.dead).length;m.clones.forEach(c=>{if(!c.dead){c.dead=1;G.fx.push({k:'ring',x:c.x,y:c.y,r:80,t:0,dur:.5,c:'#c8c0ff'})}});m.clones=[];m.hp=Math.min(m.mhp,m.hp+m.mhp*.12*n);m.ghost=0;m.alpha=.85;X.say(n?'🌫️ 分身回收了場地精華……巨人復活並恢復了 '+(12*n)+'% 血量！':'虛霧巨人現形了！',2.4);vbBIdle(m,1.5)}return}
  if(m.st=='stunned'){m.vx=0;m.alpha=.95;if(m.at<=0){vbBIdle(m,1)}return}
  if(m.st=='idle'){if(m.og)m.vx=Math.abs(dx)>160?s*m.T.spd:0;if(m.vis<=0){m.st='hide';m.at=.7;return}if(m.t<=0){const r=Math.random();m.vx=0;
    if(r<.4){m.st='pull';m.at=.6;vbGrav(X,TG.x,TG.y-10,3.2,170,m.atk*.5);X.say('🌀 重力場！很難移動！',1.2)}
    else if(r<.75){m.st='slam';m.at=.8;X.G.fx.push({k:'eaoe',x:m.x+s*70,y:m.y+m.T.fo-40,r:140,t:-.8,dur:.35,d:m.atk*1.5,done:0,quake:1})}
    else{m.st='shoot';m.at=.5}}}
  else if(m.st=='pull'||m.st=='slam'){m.vx=0;if(m.at<=0){if(m.st=='slam'){G.shake=10;X.puff(m.x+s*70,m.y+m.T.fo,24,'#c8c0ec',220)}vbBIdle(m,1.4)}}
  else if(m.st=='shoot'){if(m.at<=0){for(let i=0;i<8;i++)VSHOOT.mist(X,m,i/8*6.283);vbBIdle(m,1.6)}}
  else if(m.st=='hide'){m.alpha=Math.max(0,.85*m.at/.7);m.vx=0;if(m.at<=0){m.ghost=1;m.st='ghost';m.at=1.4+Math.random()}}
  else if(m.st=='ghost'){m.alpha=.06;const tx=TG.x+(Math.random()<.5?-1:1)*10;m.x+=(tx-m.x)*Math.min(1,2*dt);if(m.at<=0){m.x=Math.max(100,Math.min(X.AW-100,TG.x-s*150));m.st='appear';m.at=.5;X.say('👻 閃身出來了！',.8);G.fx.push({k:'eaoe',x:TG.x,y:TG.y,r:120,t:-.55,dur:.35,d:m.atk*1.5,done:0})}}
  else if(m.st=='appear'){m.alpha=.85*(1-m.at/.5);if(m.at<=0){m.ghost=0;m.alpha=.85;m.vis=5+Math.random()*2;vbBIdle(m,1.2)}}},
 // 六翼墮天使：六條命、全屬性抗性、羽毛、地裂（掉進深淵從天上摔下來扣一半血）
 seraph(m,dt,X,TG,dx,dy,d){const G=X.G,rage=m.lives<=3;m.og=0;m.dr=.6;vbPitInit(X);
  if(m.st!='revive'){const hx=Math.max(200,Math.min(X.AW-200,TG.x+Math.sin(m.ph*.4)*300)),hy=X.GY-330+Math.sin(m.ph*1.3)*20;m.vx+=(hx-m.x)*.9*dt;m.vy+=(hy-m.y)*1.2*dt}
  if(m.st=='revive'){m.vx*=.9;m.vy*=.9;if(m.at<=0)vbBIdle(m,1)}
  else if(m.st=='idle'){if(m.t<=0){const r=Math.random();
    if(r<.32){m.st='rain';m.at=.7;X.say('🪶 黑羽之雨！',1.2)}
    else if(r<.58){m.st='quake';m.at=1;X.say('💥 地裂！小心地面裂開，掉下去會從天上摔下來！',1.8)}
    else if(r<.8){m.st='cast';m.at=.6}
    else if(G.mobs.length<12){m.st='summon';m.at=.6}else m.t=.5}}
  else if(m.st=='rain'){if(m.at<=0){const us=vbUs(X),cy=(G.cyS||0)-10;for(let i=0;i<(rage?18:12);i++){const u=us[i%us.length],x=u.x+(Math.random()-.5)*420;setTimeout(()=>{if(G.st=='play')vbShot(X,{x,y:cy,r:0,atk:m.atk},Math.PI/2+(Math.random()-.5)*.2,420,'feather',.8,{x,y:cy,r:7,life:3})},i*90)}const a=Math.atan2(dy,dx);for(let i=0;i<7;i++)vbShot(X,m,a+(i-3)*.13,360,'feather',.8,{r:7});vbBIdle(m,rage?1.3:1.8)}}
  else if(m.st=='quake'){if(m.at<=0){G.shake=16;const n=rage?3:2;vbPit(X,TG.x,1.2,7);for(let i=1;i<n;i++)vbPit(X,G.cam.x+120+Math.random()*(X.VW-240),1.2+i*.3,7);vbBreakPlat(X);vbBIdle(m,2.2)}}
  else if(m.st=='cast'){if(m.at<=0){const a=Math.atan2(dy,dx);for(let i=0;i<(rage?5:3);i++)VSHOOT.orb(X,m,a+(i-1)*.4);vbBIdle(m,1.4)}}
  else if(m.st=='summon'){if(m.at<=0){X.mkMob('dk_imp',m.x-80,m.y,G.floor);X.mkMob(rage?'dk_hound':'dk_fallen',m.x+80,m.y,G.floor);X.say('😈 深淵的僕從啊，出來吧！',1.2);vbBIdle(m,1.6)}}}};
function vbBIdle(m,cd){m.st='idle';m.t=cd*(.85+Math.random()*.3)*(m.enr?.8:1)}
// 觸手（從地面、牆壁、天上竄出）
function vbTent(X,x,y,w,h,delay,d,dir){X.G.fx.push({k:'vbr',x,y,w,h,t:-delay,dur:.55,d,
 upd(f){if(!f.done&&f.t>=0){f.done=1;X.G.shake=Math.max(X.G.shake,6);vbUs(X).forEach(u=>{if(Math.abs(u.x-f.x)<f.w/2+u.r*.5&&Math.abs(u.y-f.y)<f.h/2+u.r*.5)X.hurtP(f.d,f.x,f.y,u)})}},
 drw(g,f){if(f.t<0){g.fillStyle=`rgba(255,40,90,${.12+.1*Math.sin(X.G.t*20)})`;g.fillRect(f.x-f.w/2,f.y-f.h/2,f.w,f.h);g.strokeStyle='rgba(255,60,120,.8)';g.lineWidth=2;g.setLineDash([8,6]);g.strokeRect(f.x-f.w/2,f.y-f.h/2,f.w,f.h);g.setLineDash([]);return}
  const k=Math.min(1,f.t/.12)*(f.t>f.dur-.15?(f.dur-f.t)/.15:1);g.save();g.translate(f.x,f.y);if(dir=='down')g.rotate(Math.PI);else if(dir=='right')g.rotate(Math.PI/2);else if(dir=='left')g.rotate(-Math.PI/2);
  const L=(dir=='up'||dir=='down'?f.h:f.w),W=(dir=='up'||dir=='down'?f.w:f.h),by=L/2,ty=by-L*k;g.fillStyle='#4a0e2a';g.beginPath();g.moveTo(-W/2,by);g.quadraticCurveTo(-W*.6,(by+ty)/2,-4+Math.sin(X.G.t*10)*6,ty);g.lineTo(4+Math.sin(X.G.t*10)*6,ty);g.quadraticCurveTo(W*.6,(by+ty)/2,W/2,by);g.fill();
  g.fillStyle='#7a2048';g.beginPath();g.moveTo(-W/2+5,by);g.quadraticCurveTo(-W*.45,(by+ty)/2,0,ty+4);g.quadraticCurveTo(W*.45,(by+ty)/2,W/2-5,by);g.fill();g.fillStyle='#e07aa0';for(let i=1;i<6;i++){const yy=by-(by-ty)*i/6;if(yy<ty)break;g.beginPath();g.ellipse(-W*.15*(1-i/7),yy,4,3,0,0,7);g.fill()}g.restore()}})}
// 翼之旋風：沿著地面前進，會把人吸進去撕裂
function vbTornado(X,m,i,n){const us=vbUs(X),u=us[i%us.length],dir=u.x>=m.x?1:-1,sx=m.x+(i-(n-1)/2)*120;vbZone(X,{x:sx,y:X.GY-70,vx:dir*(170+i*30),dur:5,d:m.atk*.45,tick:.45,
 inside:(f,u)=>Math.abs(u.x-f.x)<70&&u.y>f.y-110,each(f,u,dt){u.x+=(f.x-u.x)*Math.min(1,3*dt);if(Math.random()<.2)X.G.parts.push({x:u.x,y:u.y,vx:0,vy:-100,t:0,c:'#ff4a5a'})},move(f,dt){f.x+=f.vx*dt;if(f.x<60||f.x>X.AW-60)f.vx*=-1},
 drw(g,f){const a=Math.min(1,f.t*3,(f.dur-f.t)*2);g.save();g.globalAlpha=a*.85;for(let k=0;k<9;k++){const yy=f.y+60-k*16,rr=12+k*6,off=Math.sin(X.G.t*14+k)*8;g.strokeStyle=k%2?'rgba(200,60,80,.8)':'rgba(220,220,230,.8)';g.lineWidth=4;g.beginPath();g.ellipse(f.x+off,yy,rr,5+k*.8,0,0,7);g.stroke()}g.restore()}})}
// 雷電光束的預警線
function vbBeamWarn(X,m){X.G.fx.push({k:'vbbw',t:0,dur:1.1,drw(g){const mx=m.x+(m.bx>m.x?1:-1)*m.r,my=m.y-m.T.fo*.6,a=Math.atan2(m.by-my,m.bx-mx);g.strokeStyle=`rgba(255,240,120,${.3+.4*Math.abs(Math.sin(X.G.t*16))})`;g.lineWidth=6;g.setLineDash([14,10]);g.beginPath();g.moveTo(mx,my);g.lineTo(mx+Math.cos(a)*1400,my+Math.sin(a)*1400);g.stroke();g.setLineDash([]);g.fillStyle='rgba(255,255,200,.8)';g.beginPath();g.arc(mx,my,8+6*Math.sin(X.G.t*20),0,7);g.fill()}})}
// 地裂：地面開出深淵，掉下去會從天上摔下來
function vbPitInit(X){const G=X.G;if(G.pitAt)return;G.pitAt=x=>G.fx.some(f=>f.pit&&f.t>=0&&f.t<f.dur-.3&&Math.abs(x-f.x)<f.w/2);
 G.pitFall=e=>{e.y=60;e.vy=0;if(e===X.P||X.AL.includes(e)){const d=Math.min(e.hp-1,e.mhp*.5);e.hp-=d;X.num(e.x,(G.cyS||0)+80,'-'+Math.round(d)+' 墜落！','#ff5a5a',1);if(e===X.P)X.say('😱 掉進深淵……從天上摔下來了！血量少了一半！',1.8)}}}
function vbPit(X,x,delay,dur){X.G.fx.push({k:'vbpit',pit:1,x:Math.max(90,Math.min(X.AW-90,x)),w:150,t:-delay,dur,drw(g,f){const y=X.GY;if(f.t<0){g.strokeStyle='#a04aff';g.lineWidth=2;for(let i=0;i<5;i++){g.beginPath();g.moveTo(f.x,y);g.lineTo(f.x+(i-2)*30+Math.sin(i)*10,y+6);g.lineTo(f.x+(i-2)*36,y+14);g.stroke()}g.fillStyle=`rgba(160,74,255,${.15+.15*Math.sin(X.G.t*16)})`;g.fillRect(f.x-f.w/2,y-6,f.w,12);return}
  const k=Math.min(1,f.t/.25,(f.dur-f.t)/.3),w=f.w*k;const gr=g.createLinearGradient(0,y,0,y+140);gr.addColorStop(0,'#14081e');gr.addColorStop(1,'#000');g.fillStyle=gr;g.fillRect(f.x-w/2,y-2,w,150);g.fillStyle='rgba(160,74,255,.5)';g.fillRect(f.x-w/2-3,y-4,4,20);g.fillRect(f.x+w/2-1,y-4,4,20);if(Math.random()<.4)X.G.parts.push({x:f.x+(Math.random()-.5)*w,y:y+10,vx:0,vy:-60,t:0,c:'#a04aff'})}})}
function vbBreakPlat(X){const G=X.G,ps=G.plats.slice(1).filter(p=>p.w<700&&Math.abs(p.x+p.w/2-X.P.x)<700);if(!ps.length)return;const p=ps[Math.floor(Math.random()*ps.length)],i=G.plats.indexOf(p);if(i<1)return;G.plats.splice(i,1);
 for(let k=0;k<20;k++)G.parts.push({x:p.x+Math.random()*p.w,y:p.y,vx:(Math.random()-.5)*120,vy:-60-Math.random()*120,t:0,c:'#5a4a6a'});const arr=G.plats;X.say('🪨 平台被擊碎了！',1);setTimeout(()=>{if(G.plats===arr&&!arr.includes(p))arr.push(p)},9000)}

// ───────── 怪物資料 ─────────
// atk：[招式, 冷卻秒, 觸發距離, 高度差上限, 參數…]
const vbD=(o)=>Object.assign({gen:1,exp:1.3,col:'#888',drop:[['gel',.3]]},o);
const VMOBB={
 // 深藍海域
 sea_shrimp:vbD({n:'蝦兵',spr:m=>vbImg(m,'sea_shrimp')||vsShrimp(m),hits:4.6,atk:1.1,r:18,fo:36,spd:85,mv:'walk',dash:540,el:'water',col:'#ff8a6a',exp:1.4,drop:[['gel',.4]],sk:[['lunge',2.4,270,70]],d:'拿著三叉戟的蝦子士兵。壓低身體、頭上冒「!」就是要突刺了。'}),
 sea_crab:vbD({n:'蟹將',spr:m=>vbImg(m,'sea_crab')||vsCrab(m),hits:6.5,atk:1.2,r:20,fo:30,spd:55,mv:'walk',keep:160,el:'water',col:'#e8503a',exp:1.6,drop:[['bone',.35]],sk:[['guard',4,320],['shoot',2.6,440,100,'bubble']],d:'舉起大鉗子的時候正面打不痛，繞到背後打！還會吐泡泡。'}),
 sea_puffer:vbD({n:'刺河豚',spr:m=>vbImg(m,'sea_puffer')||vsPuffer(m),hits:3.6,atk:1,r:16,fo:44,spd:55,mv:'float',fly:1,keep:230,el:'water',col:'#f0c050',exp:1.3,drop:[['gel',.4]],sk:[['burst',3.2,320,null,'spike',10]],d:'在水裡飄啊飄，吸氣鼓起來就會往四面八方射刺。'}),
 sea_mini:vbD({n:'鐵甲蟹將軍',spr:vsCrab,v:1,sprS:1.7,hits:48,atk:1.6,r:34,fo:52,spd:50,mv:'walk',keep:150,boss:1,mini:1,el:'water',col:'#c83a2a',exp:6,drop:[['bone',1],['gel',1]],sk:[['guard',5,320],['burst',3,380,null,'bubble',12],['slam',3.5,170,90],['howl',9,800,null,'sea_shrimp']],d:'深藍海域第 5 層的菁英頭目。金甲大鉗子，正面幾乎打不動。'}),
 sea_boss:vbD({n:'深海閻王',spr:vsOcto,bossAI:'octo',noPz:1,hits:200,atk:1.95,r:62,fo:100,spd:40,boss:1,el:'water',col:'#7a2048',exp:15,drop:[['gel',1],['bone',1],['magma',1]],d:'深藍海域的主人。八爪章魚，觸手會從地面、牆壁、天上竄出來；兩條粗壯的手臂會重擊地面，還會噴墨汁讓你看不清楚。'}),
 // 劇毒沼澤
 sw_frog:vbD({n:'跳跳毒蛙',spr:vsFrog,ft:0,hits:3.8,atk:1.05,r:15,fo:28,spd:110,mv:'hop',el:'poison',col:'#5ac83a',exp:1.2,drop:[['gel',.4]],sk:[['pounce',2.2,320]],d:'一直跳來跳去，看準了就整隻撲過來。'}),
 sw_tfrog:vbD({n:'長舌樹蛙',spr:vsFrog,ft:1,hits:4.2,atk:1.1,r:15,fo:28,spd:70,mv:'hop',el:'poison',col:'#2ab8a8',exp:1.4,drop:[['bone',.3]],sk:[['tongue',2.6,240,70]],d:'地上出現虛線時，舌頭就要射過來了，會把人拉過去。'}),
 sw_toad:vbD({n:'膨膨毒蟾',spr:vsFrog,ft:2,hits:5.5,atk:1.15,r:17,fo:28,spd:30,mv:'walk',keep:280,el:'poison',col:'#7a8a3a',exp:1.5,drop:[['bone',.35]],sk:[['lob',3,480,null,'poison']],d:'喉囊鼓起來就會吐毒球，落地變成毒水窪。'}),
 sw_mini:vbD({n:'毒蛙統領',spr:vsFrog,ft:0,v:1,sprS:1.8,hits:50,atk:1.6,r:30,fo:50,spd:100,mv:'hop',boss:1,mini:1,el:'poison',col:'#3aa83a',exp:6,drop:[['gel',1],['bone',1]],sk:[['pounce',2.2,420],['tongue',3,260,100],['lob',3.5,480,null,'poison'],['howl',9,800,null,'sw_frog']],d:'劇毒沼澤第 5 層的菁英頭目，戴著王冠的大毒蛙。'}),
 sw_boss:vbD({n:'腐沼蟾皇',spr:vsToad,bossAI:'toad',noPz:1,hits:210,atk:2,r:64,fo:84,spd:60,boss:1,el:'poison',col:'#5a6a2a',exp:16,drop:[['bone',1],['gel',1],['bark',1]],d:'劇毒沼澤的主人。超長舌頭、跳起來砸出整片衝擊波（跳起來躲），還會讓毒氣淹滿地面（爬上平台）。'}),
 // 冰封雪原
 ic_wolf:vbD({n:'雪原狼',spr:vsWolf2,ft:0,hits:5,atk:1.15,r:17,fo:24,spd:115,mv:'walk',dash:600,el:'water',col:'#e8eef8',exp:1.4,drop:[['hide',.35],['claw',.25]],sk:[['lunge',2.2,300,70]],d:'在雪地裡衝刺的白狼，眼睛變紅就要撲了。'}),
 ic_iwolf:vbD({n:'冰牙狼',spr:vsWolf2,ft:1,hits:5.5,atk:1.2,r:17,fo:24,spd:95,mv:'walk',keep:200,dash:560,el:'water',col:'#7ab8f0',exp:1.5,drop:[['hide',.35]],sk:[['shoot',2.8,380,90,'ice3'],['lunge',3,220,70]],d:'背上長著冰晶，會吐出三道冰刺。'}),
 ic_pup:vbD({n:'霜狼崽',spr:vsWolf2,ft:2,hits:2.6,atk:.9,r:12,fo:16,spd:150,mv:'walk',dash:480,el:'water',col:'#f0f4ff',exp:.8,drop:[['hide',.2]],sk:[['lunge',1.8,200,60]],d:'毛茸茸的小狼，總是成群出現。'}),
 ic_mini:vbD({n:'白銀狼首領',spr:vsWolf2,ft:0,v:1,sprS:1.8,hits:52,atk:1.65,r:30,fo:42,spd:110,mv:'walk',dash:680,boss:1,mini:1,el:'water',col:'#c8d0e0',exp:6.5,drop:[['hide',1],['claw',1]],sk:[['lunge',2,420,110],['howl',7,800,null,'ic_pup'],['shoot',3,400,110,'ice3']],d:'冰封雪原第 5 層的菁英頭目，帶著一群狼崽。'}),
 ic_boss:vbD({n:'霜月狼王・芬里爾',spr:vsFenrir,bossAI:'fenrir',noPz:1,hits:220,atk:2.05,r:50,fo:66,spd:150,boss:1,el:'water',col:'#3a4a6a',exp:16,drop:[['hide',1],['claw',1],['bone',1]],d:'冰封雪原的主人。一開始是掙斷鎖鏈的巨狼，血剩一半會變身成狼人：巨爪連擊、血盆大口、整隻跳起來砸地，變得更狂暴。'}),
 // 血色古堡
 bl_bat:vbD({n:'吸血蝠',spr:vsBat2,ft:0,hits:3.8,atk:1.1,r:15,fo:30,spd:90,mv:'fly',fly:1,dash:560,el:'fire',col:'#8a1022',exp:1.3,drop:[['wing',.4]],sk:[['lunge',2.4,320]],d:'在頭上盤旋，冒出「!」就要俯衝了。'}),
 bl_swarm:vbD({n:'蝠群',spr:vsBat2,ft:1,hits:3,atk:.9,r:20,fo:32,spd:140,mv:'swarm',fly:1,dash:500,el:'fire',col:'#5a1a3a',exp:1.2,drop:[['wing',.4]],sk:[['lunge',1.6,260]],d:'一大群小蝙蝠亂飛，很難瞄準。'}),
 bl_sonic:vbD({n:'音波蝠',spr:vsBat2,ft:2,hits:4.5,atk:1.15,r:16,fo:30,spd:80,mv:'fly',fly:1,keep:280,el:'fire',col:'#5a1a3a',exp:1.5,drop:[['wing',.4]],sk:[['shoot',2.8,440,null,'sonic']],d:'大耳朵的蝙蝠，會發出穿透力很強的音波。'}),
 bl_mini:vbD({n:'血月蝠后',spr:vsBat2,ft:2,v:1,sprS:2.4,hits:52,atk:1.7,r:30,fo:54,spd:80,mv:'fly',fly:1,keep:260,dash:600,boss:1,mini:1,el:'fire',col:'#6a0a2a',exp:7,drop:[['wing',1],['fang',1]],sk:[['burst',3,420,null,'sonic',8],['howl',7,800,null,'bl_bat'],['lunge',2.6,360]],d:'血色古堡第 5 層的菁英頭目，胸口鑲著血月寶石。'}),
 bl_boss:vbD({n:'德古拉公爵',spr:vsDrac,bossAI:'drac',noPz:1,hits:230,atk:2.05,r:44,fo:104,spd:60,fly:1,boss:1,el:'fire',col:'#14060e',exp:17,drop:[['wing',1],['fang',1],['scale',1]],d:'血色古堡的主人，吸血鬼公爵。張開披風颳起會撕裂敵人的翼之旋風，化成蝙蝠瞬間移動到你背後，血少的時候還會吸血。'}),
 // 雷鳴高原
 th_ptero:vbD({n:'雷翼龍',spr:vsPtero,hits:4.5,atk:1.15,r:18,fo:34,spd:85,mv:'fly',fly:1,keep:260,el:'elec',col:'#c89a3a',exp:1.4,drop:[['feather',.4]],sk:[['shoot',2.6,480,null,'fire']],d:'在天上盤旋的翼手龍，會往下噴火球。'}),
 th_raptor:vbD({n:'迅雷龍',spr:vsRaptor,hits:5.5,atk:1.2,r:17,fo:34,spd:140,mv:'walk',dash:680,el:'elec',col:'#4a4aa0',exp:1.5,drop:[['scale',.35]],sk:[['lunge',2,320,70]],d:'跑得跟閃電一樣快的迅猛龍。'}),
 th_anky:vbD({n:'雷甲龍',spr:vsAnky,hits:9,atk:1.35,r:22,fo:30,spd:35,mv:'walk',el:'elec',col:'#6a6a5a',exp:1.9,drop:[['magma',.25]],sk:[['slam',3,160,90],['strike',4,440]],d:'背上長滿水晶的甲龍，尾巴錘會砸地，還會招來落雷。'}),
 th_mini:vbD({n:'暴雷翼龍王',spr:vsPtero,v:1,sprS:1.8,hits:54,atk:1.75,r:32,fo:62,spd:80,mv:'fly',fly:1,keep:280,boss:1,mini:1,el:'elec',col:'#3a5a8a',exp:7,drop:[['feather',1],['scale',1]],sk:[['shoot',2,520,null,'fire3'],['strike',3,520],['howl',9,800,null,'th_ptero']],d:'雷鳴高原第 5 層的菁英頭目，冠羽上劈啪作響。'}),
 th_boss:vbD({n:'千年魔龍',spr:vsDragon,bossAI:'dragon',noPz:1,hits:250,atk:2.15,r:60,fo:104,spd:60,fly:1,boss:1,el:'elec',col:'#1e2e5a',exp:18,drop:[['feather',1],['scale',1],['magma',1]],d:'雷鳴高原的主人，活了一千年的魔龍。抗性很高（受到的傷害少 30%）。從嘴裡噴出雷電光束、五雷轟頂、讓天空不停落雷。'}),
 // 幻影迷宮
 ph_ghost:vbD({n:'迷霧幽靈',spr:vsGhost,alpha:.8,hits:4.5,atk:1.15,r:15,fo:36,spd:60,mv:'float',fly:1,keep:120,dash:420,el:'wind',col:'#d8d0ff',exp:1.4,drop:[['wing',.35]],sk:[['blink',3,640]],d:'會消失，然後突然出現在你旁邊撞過來。'}),
 ph_eye:vbD({n:'幻影眼',spr:vsEye,hits:4.5,atk:1.15,r:16,fo:36,spd:50,mv:'float',fly:1,keep:270,el:'wind',col:'#9a4ae0',exp:1.5,drop:[['wing',.35]],sk:[['shoot',2.4,480,null,'mist'],['pull',6,420]],d:'飄浮的大眼睛，會射出追蹤的霧彈，還會放出重力場。'}),
 ph_assn:vbD({n:'霧影刺客',spr:vsAssn,hits:5.5,atk:1.25,r:16,fo:38,spd:90,mv:'walk',dash:620,el:'wind',col:'#5a4a8a',exp:1.6,drop:[['fang',.35]],sk:[['blink',3.2,640],['lunge',2.2,250,70]],d:'化成霧消失，再從你背後閃出來刺一刀。'}),
 ph_mini:vbD({n:'迷霧之眼',spr:vsEye,v:1,sprS:1.5,hits:54,atk:1.7,r:36,fo:80,spd:45,mv:'float',fly:1,keep:300,boss:1,mini:1,el:'wind',col:'#4a2a7a',exp:7,drop:[['wing',1],['fang',1]],sk:[['burst',3,440,null,'mist',10],['pull',5,520],['shoot',1.8,500,null,'mist']],d:'幻影迷宮第 5 層的菁英頭目，三隻小眼睛盯著你。'}),
 ph_boss:vbD({n:'虛霧巨人',spr:vsMist,bossAI:'mist',noPz:1,alpha:.85,hits:240,atk:2.1,r:58,fo:112,spd:55,boss:1,el:'wind',col:'#9a90c8',exp:18,drop:[['wing',1],['fang',1],['bark',1]],d:'幻影迷宮的主人。煙霧做成的巨人，常常消失再閃身出來，只有現形時打得到。會放重力場困住你。血少時分裂成分身——分身沒在時間內打完，就會回收場地精華、讓巨人恢復血量。'}),
 ph_clone:vbD({n:'霧之分身',spr:vsMist,sprS:.5,alpha:.6,hits:10,atk:1.2,r:28,fo:56,spd:50,mv:'walk',el:'wind',col:'#c8c0ec',exp:.6,drop:[],sk:[['slam',2.5,140,90]],d:'虛霧巨人分裂出來的分身。'}),
 // 暗黑深淵
 dk_imp:vbD({n:'深淵小惡魔',spr:vsImp,hits:4.6,atk:1.2,r:15,fo:34,spd:90,mv:'fly',fly:1,keep:240,el:'poison',col:'#6a2a7a',exp:1.5,drop:[['fang',.35]],sk:[['shoot',2.4,460,null,'orb']],d:'拿著黑暗魔球的小惡魔，魔球會追著你跑。'}),
 dk_fallen:vbD({n:'墮羽使徒',spr:vsFallen,hits:6,atk:1.25,r:18,fo:46,spd:50,mv:'float',fly:1,keep:290,el:'elec',col:'#2a2236',exp:1.7,drop:[['wing',.4]],sk:[['shoot',2.8,500,null,'feather3']],d:'墮落天使的手下，會射出三支黑羽。'}),
 dk_hound:vbD({n:'暗影獵犬',spr:vsHound,hits:6.5,atk:1.3,r:18,fo:30,spd:135,mv:'walk',dash:660,el:'poison',col:'#14101e',exp:1.7,drop:[['claw',.35]],sk:[['lunge',2,330,70]],d:'燃燒著紫色火焰的地獄犬。'}),
 dk_mini:vbD({n:'深淵守門者',spr:vsFallen,v:1,sprS:1.5,hits:60,atk:1.85,r:34,fo:88,spd:50,mv:'walk',boss:1,mini:1,el:'elec',col:'#3a3a4a',exp:8,drop:[['magma',1],['fang',1]],sk:[['slam',2.6,190,100],['shoot',2.6,500,null,'feather3'],['lunge',3,300,90]],d:'暗黑深淵第 5 層的菁英頭目，拿著巨劍守著深淵之門。'}),
 dk_boss:vbD({n:'六翼墮天使',spr:vsSeraph,bossAI:'seraph',noPz:1,allRes:1,lives:6,hits:75,atk:2.3,r:64,fo:124,spd:60,fly:1,boss:1,el:'poison',col:'#0e0a16',exp:26,drop:[['magma',1],['wing',1],['scale',1],['fang',1]],d:'幻境最深處的超級大魔王。六隻眼、六隻翅膀、六條命，全屬性抗性。每失去一條命就斷一隻翅膀。黑羽之雨、地裂深淵（掉下去會從天上摔下來、扣一半血）。'})};
// 舊的換色怪移除，換上新怪
Object.keys(VMOB).forEach(k=>{if(/^[wpibthd]_(slime|wolf|jelly|mini|boss|shroom|gob|bat|liz|bird|golem)$/.test(k))delete VMOB[k]});
for(const k in VMOBB){const M=VMOBB[k];VMOB[k]=M;M.d+=`（屬性：${M.allRes?'🛡️全屬性抗性':VEL[M.el][1]+VEL[M.el][0]+'，怕'+VEL[Object.keys(VBEAT).find(x=>VBEAT[x]==M.el)][0]}）`}
delete VMOB.ph_clone.d;VMOB.ph_clone.d='虛霧巨人分裂出來的分身。';VMOB.ph_clone.hide=1;
[['sea_shrimp','sea_crab','sea_puffer','sea_mini','sea_boss'],['sw_frog','sw_tfrog','sw_toad','sw_mini','sw_boss'],['ic_wolf','ic_iwolf','ic_pup','ic_mini','ic_boss'],['bl_bat','bl_swarm','bl_sonic','bl_mini','bl_boss'],['th_ptero','th_raptor','th_anky','th_mini','th_boss'],['ph_ghost','ph_eye','ph_assn','ph_mini','ph_boss'],['dk_imp','dk_fallen','dk_hound','dk_mini','dk_boss']].forEach((L,i)=>{const C=VCH[3+i];C.mobs=L.slice(0,3);C.mini=L[3];C.boss=L[4];C.extra=null});
