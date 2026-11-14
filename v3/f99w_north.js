/* v13.26 地圖往北加大：新增北區（y = -NY ~ 0）
   北邊新增一條東西向的「站前路」，大馬路（V1）與 V2 往北接到站前路形成 T 字路口；
   火車站搬到 T 字路口正上方，後面是鐵軌，火車會定時經過。 */
const H0Y=-200,H0H=56,H0C=H0Y+H0H/2,RAILY=-476;
// ════════ 1. 北區地面 ════════
function northGround(){
 const V=VRD.slice().sort((a,b)=>a.x-b.x),hitV=(x0,x1)=>V.some(v=>x1>v.x-SWK-2&&x0<v.x+v.w+SWK+2);
 // 站前廣場
 paveTile(s,560,-412,640,412+H0Y-SWK,'#d6cdb8','#cdc3ac');
 // 鐵軌與月台
 GR(s,0,RAILY,WW,64,'#8d867c','#7a736a');for(let i=0;i<WW*64/40;i++)R(s,Math.random()*WW,RAILY+Math.random()*64,1.6,1.2,i%2?'rgba(255,255,255,.12)':'rgba(0,0,0,.15)');
 [RAILY+18,RAILY+44].forEach(ty=>{for(let x=0;x<WW;x+=9)R(s,x,ty-7,4.5,14,'#5a4433');R(s,0,ty-5,WW,1.6,'#d4d6da');R(s,0,ty+3.4,WW,1.6,'#d4d6da');R(s,0,ty-3.6,WW,.6,'rgba(0,0,0,.35)');R(s,0,ty+4.8,WW,.6,'rgba(0,0,0,.35)')});
 GR(s,0,RAILY+64,WW,10,'#d8d0bc','#c4bba5');R(s,0,RAILY+65.5,WW,2,'#f2c230');R(s,0,RAILY+74,WW,1.2,'rgba(0,0,0,.25)');
 // 站前路人行道
 cobble(s,0,H0Y-SWK,WW,SWK,'#b0a090',-8);cobble(s,0,H0Y+H0H,WW,SWK,'#b0a090',-8);
 // 大馬路往北延伸（到站前路）
 V.forEach(r=>{cobble(s,r.x-SWK,H0Y+H0H,SWK,-(H0Y+H0H),'#b0a090',-8);cobble(s,r.x+r.w,H0Y+H0H,SWK,-(H0Y+H0H),'#b0a090',-8)});
 asphalt(0,H0Y,WW,H0H);V.forEach(r=>{const y0=H0Y+H0H,h=-y0+1;GR(s,r.x,y0,r.w,h,'#4b4f58','#50545d');for(let i=0;i<r.w*h/90;i++)R(s,r.x+Math.random()*r.w,y0+Math.random()*h,2,1,i%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)')});
 // 路緣、邊線
 R(s,0,H0Y-1.2,WW,1.4,'#d8d2c4');R(s,0,H0Y-2.2,WW,1,'rgba(0,0,0,.2)');
 {let cur=0;V.forEach(v=>{R(s,cur,H0Y+H0H-.2,v.x-cur,1.4,'#d8d2c4');R(s,cur,H0Y+H0H+1.2,v.x-cur,1,'rgba(0,0,0,.2)');cur=v.x+v.w});R(s,cur,H0Y+H0H-.2,WW-cur,1.4,'#d8d2c4')}
 V.forEach(r=>{R(s,r.x-1.2,H0Y+H0H,1.4,-(H0Y+H0H),'#d8d2c4');R(s,r.x+r.w-.2,H0Y+H0H,1.4,-(H0Y+H0H),'#d8d2c4');R(s,r.x+1.5,H0Y+H0H+6,.8,-(H0Y+H0H)-6,'rgba(245,245,240,.7)');R(s,r.x+r.w-2.3,H0Y+H0H+6,.8,-(H0Y+H0H)-6,'rgba(245,245,240,.7)')});
 R(s,0,H0Y+1.5,WW,.8,'rgba(245,245,240,.7)');{let cur=0;V.forEach(v=>{R(s,cur,H0Y+H0H-2.3,v.x-SWK-2-cur,.8,'rgba(245,245,240,.7)');cur=v.x+v.w+SWK+2});R(s,cur,H0Y+H0H-2.3,WW-cur,.8,'rgba(245,245,240,.7)')}
 // 站前路中央雙黃線（路口斷開）
 {let cur=0;V.forEach(v=>{[H0C-1.6,H0C+.6].forEach(y=>R(s,cur,y,v.x-SWK-2-cur,1.1,'#f5d742'));cur=v.x+v.w+SWK+2});[H0C-1.6,H0C+.6].forEach(y=>R(s,cur,y,WW-cur,1.1,'#f5d742'))}
 // V1 四線道標線＋中央分隔島；V2 雙黃線
 const v1=V[0],v2=V[1];for(let y=H0Y+H0H+SWK+4;y<-10;y+=18){R(s,v1.x+20,y,1.2,10,'#f4f4f4');R(s,v1.x+76,y,1.2,10,'#f4f4f4')}
 GR(s,v1.x+46,H0Y+H0H+SWK+2,4,-(H0Y+H0H+SWK+2),'#7a9a68','#5f7f50',1);for(let y=H0Y+H0H+SWK+8;y<-4;y+=14){s.fillStyle='#3f8a3a';s.beginPath();s.arc(v1.x+48,y,2.1,0,7);s.fill()}
 if(v2){R(s,v2.x+24.6,H0Y+H0H+SWK+2,1.1,-(H0Y+H0H+SWK+2),'#f5d742');R(s,v2.x+26.8,H0Y+H0H+SWK+2,1.1,-(H0Y+H0H+SWK+2),'#f5d742')}
 // 斑馬線＋停止線（T 字路口）
 V.forEach(v=>{zebra(v.x,H0Y+H0H+SWK/2-6,v.w,12,true);zebra(v.x-SWK/2-6,H0Y,12,H0H,false);zebra(v.x+v.w+SWK/2-6,H0Y,12,H0H,false);R(s,v.x+v.w/2,H0Y+H0H+SWK+1,v.w/2,2,'#f4f4f4')});
 // 站前廣場的花圃、行道樹
 const tree=(x,y)=>{try{tr(x,y)}catch(e){}};
 for(let x=30;x<WW;x+=64){if(x>540&&x<1220)continue;if(hitV(x-16,x+16))continue;tree(x,H0Y-SWK-6)}
 for(let x=50;x<WW;x+=96){if(hitV(x-20,x+20))continue;tree(x,-14)}
 [[600,-300],[1160,-300],[600,-250],[1160,-250]].forEach(q=>tree(q[0],q[1]));
 // 鐵軌不能走
 solids.push({x:0,y:-NY-40,w:WW,h:RAILY+76+NY+40});
 for(let x=40;x<WW;x+=180){R(s,x,RAILY-4,3,58,'#6a6a70');R(s,x-6,RAILY+2,15,2,'#6a6a70')}R(s,0,RAILY+4,WW,.8,'rgba(40,40,40,.6)')}
{const _wl=worldLayout;worldLayout=function(){const r=_wl.apply(this,arguments);try{northGround()}catch(e){console.error(e)}return r}}

// ════════ 2. 火車站搬到 T 字路口 ════════
function northStation(){try{const b=BALL().find(q=>q.n=='火車站');if(!b)return;bOrig(b);const o=b._o,S2={d:[876-(o.x+o.w/2),(H0Y-SWK-4)-o.bot],s:1.35,k:null,c:null};bApply(b,S2);b._s=S2;try{if(typeof bovRefresh=='function')bovRefresh()}catch(e){}}catch(e){console.error(e)}}
{const _a=gzApply;gzApply=function(m){const r=_a.apply(this,arguments);try{if(!(m&&m.north))northStation()}catch(e){}return r}}
{const _s=gzSerialize;gzSerialize=function(){const m=_s.apply(this,arguments);try{if(m&&typeof m=='object')m.north=1}catch(e){}return m}}
setTimeout(()=>{try{const b=BALL().find(q=>q.n=='火車站');if(b&&b.bot>0&&!(typeof ED!='undefined'&&ED.on))northStation()}catch(e){}},1500);

// ════════ 3. 車流：站前路＋T 字路口轉彎 ════════
{const mkL=(id,dir,c)=>{const L={id,ax:'x',dir,c,v:[],len:WW,s0:dir>0?-90:WW+90,s1:dir>0?WW+90:-90,stops:[],n:3,pool:'st'};LN.push(L);return L};const H0e=mkL('H0e',1,H0C+14),H0w=mkL('H0w',-1,H0C-14);
 [H0e,H0w].forEach(L=>{const seg=(L.len+120)/L.n;for(let i=0;i<L.n;i++){const v=newVeh(L);v.p=(L.dir>0?-60+seg*i:L.len+60-seg*i);posBox(v)}});
 const VN=LN.filter(L=>L.ax=='y'&&L.dir<0),VS=LN.filter(L=>L.ax=='y'&&L.dir>0);
 VN.forEach(L=>{L.s1=H0Y-30});VS.forEach(L=>{L.s0=H0C;L.block=1});
 const idle=L=>L.v.find(v=>v.hold>0&&!v.gone&&v.x<-9000);
 const clone=(v,L,pos)=>{const u=idle(L);if(!u)return false;setKind(u,L,v.k);u.col=v.col;u.rc=v.rc;u.hc=v.hc;u.p=pos;u.spd=Math.max(14,v.spd*.45);u.hold=0;u.nt=0;posBox(u);return true};
 const hide=v=>{v.hold=.6+Math.random()*2.5;v.x=v.y=-9999};
 const _ts=trafficStep;trafficStep=function(dt){_ts.apply(this,arguments);try{
  // 往北的車開到 T 字路口 → 左轉或右轉上站前路
  VN.forEach(L=>L.v.forEach(v=>{if(v.hold>0||v.gone||v.p>H0C+6)return;const T=Math.random()<.5?H0e:H0w;clone(v,T,L.c);hide(v)}));
  // 站前路上的車經過路口 → 三成機率右轉往南
  [H0e,H0w].forEach(L=>L.v.forEach(v=>{if(v.hold>0||v.gone)return;VS.forEach(D=>{if(v._tk===D.id)return;if(Math.abs(v.p-D.c)<4){v._tk=D.id;if(Math.random()<.35&&clone(v,D,H0C+4))hide(v)}})}));
 }catch(e){}}}

// ════════ 4. 火車定時進出站 ════════
const TRAIN={x:-9999,dir:1,v:0,t:12,stop:0,col:0};
function trainStep(dt){const T=TRAIN,len=5*92;if(T.t>0){T.t-=dt;if(T.t<=0){T.dir=Math.random()<.5?1:-1;T.x=T.dir>0?-len-40:WW+40;T.v=150;T.stop=0;T.col=(Math.random()*3)|0;T.trk=T.dir>0?RAILY+44:RAILY+18}return}
 const cx=876,mid=T.x+len/2,dist=(cx-mid)*T.dir;
 if(!T.stop&&dist>0&&dist<300){T.v=Math.max(6,T.v-(T.v*T.v/(2*Math.max(dist,1)))*dt);if(dist<3){T.v=0;T.stop=1;T.wait=6}}
 else if(T.stop==1){T.v=0;T.wait-=dt;if(T.wait<=0)T.stop=2}
 else if(T.stop==2)T.v=Math.min(170,T.v+55*dt);
 T.x+=T.dir*T.v*dt;if((T.dir>0&&T.x>WW+40)||(T.dir<0&&T.x<-len-40)){T.t=35+Math.random()*40;T.x=-9999}}
function trainDraw(c){const T=TRAIN;if(T.x<-9000)return;const y=T.trk,len=5*92,CL=[['#f4f2ea','#e8742a','#2a5aa8'],['#f4f2ea','#2a7ab8','#2a7ab8'],['#e8e4d8','#d9302a','#2a2a2a']][T.col];
 for(let i=0;i<5;i++){const x=T.x+i*92,cab=(i==0&&T.dir<0)||(i==4&&T.dir>0);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(x+2,y+6,88,5);
  c.fillStyle=CL[0];c.beginPath();c.roundRect(x,y-24,88,30,cab?[T.dir>0?2:9,T.dir>0?9:2,2,2]:3);c.fill();c.fillStyle=CL[1];c.fillRect(x,y-4,88,3);c.fillStyle=CL[2];c.fillRect(x,y-1,88,1.6);
  c.fillStyle='#2a3a4a';for(let w=0;w<6;w++)c.fillRect(x+8+w*13,y-19,9,8);c.fillStyle='rgba(255,255,255,.35)';for(let w=0;w<6;w++)c.fillRect(x+8+w*13,y-19,9,2);
  c.fillStyle='#555';c.fillRect(x+40,y-21,8,20);c.fillStyle='#1a1a1a';[10,24,64,78].forEach(q=>{c.beginPath();c.arc(x+q,y+6,3.4,0,7);c.fill()});
  if(cab){c.fillStyle='#2a3a4a';c.fillRect(T.dir>0?x+78:x+2,y-19,8,9);c.fillStyle='#fff7c2';c.fillRect(T.dir>0?x+85:x,y-6,3,3)}
  c.fillStyle='#666';c.fillRect(x+88,y-10,4,3)}
 // 架空電車線
 if(T.stop==1){c.font='bold 8px sans-serif';c.textAlign='center';c.fillStyle='#ffd84a';c.fillText('🚉 列車進站中',876,y-32)}}
{const _sd=safetyDraw;safetyDraw=function(a){_sd.apply(this,arguments);try{if(!scene&&TRAIN.x>-9000)a.push({y:TRAIN.trk+8,f:()=>trainDraw(g)})}catch(e){}}}
{const _ts=trafficStep;trafficStep=function(dt){_ts.apply(this,arguments);try{trainStep(dt)}catch(e){}}}
