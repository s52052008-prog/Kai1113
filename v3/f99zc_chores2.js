/* v13.31 家事小遊戲美術重做：廚房水槽、木桶洗衣、客廳木地板、垃圾分類角落；描邊手、菜瓜布、掃把、結算星星與彩帶 */
function hwGame(k,done){const C=HWD[k],T=hwTier(k),pow=T.pow||1,M=mgBox(C.i+' '+C.n+'（'+T.n+'）'),g=M.g,W2=720,H2=520,cv=M.cv;cv.style.cursor='none';cv.style.touchAction='none';
 let fin=false,finT=0,perf=true,fx=[],conf=[],lt=performance.now(),mx=W2/2,my=H2/2,down=false,hover=false,combo=0,comboT=0,keyMove=false;const held={},OL='#4a2e1c';
 const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W2/r.width,(e.clientY-r.top)*H2/r.height]};
 const finish=p=>{if(fin)return;fin=true;perf=p;finT=0;window.__kbBlock=performance.now()+2300;for(let i=0;i<90;i++)conf.push({x:360+rnd(-60,60),y:250,vx:rnd(-320,320),vy:rnd(-520,-160),r:rnd(0,6),vr:rnd(-8,8),c:['#ff6b8a','#ffd84a','#5ac8fa','#7ad06a','#c98af0','#ff9f43'][i%6],w:rnd(5,10),h:rnd(3,6)});
  setTimeout(()=>{M.end();OVK.delete(kd);OVKU.delete(ku);done({perfect:p})},1800)};
 const rnd=(a,b)=>a+Math.random()*(b-a);
 // ── 小工具 ──
 const rr=(x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
 const lg=(y0,y1,a,b)=>{const q=g.createLinearGradient(0,y0,0,y1);q.addColorStop(0,a);q.addColorStop(1,b);return q};
 const star=(x,y,r,c)=>{g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rad=i%2?r*.45:r;g.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad)}g.closePath();g.fillStyle=c;g.fill()};
 const spark=(x,y,n)=>{for(let i=0;i<n;i++)fx.push({k:'s',x:x+rnd(-24,24),y:y+rnd(-20,20),t:-i*.05,r:rnd(5,10)})};
 const bubble=(x,y,n)=>{for(let i=0;i<n;i++)fx.push({x:x+rnd(-22,22),y:y+rnd(-14,14),vx:rnd(-24,24),vy:rnd(-60,-14),t:0,r:rnd(3,10),k:'b'})};
 const blob=(x,y,r,seed)=>{g.beginPath();for(let i=0;i<=14;i++){const a=i/14*6.283,q=r*(.78+.22*Math.sin(a*3+seed)+.1*Math.sin(a*5+seed*2));g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q*.82)}g.closePath()};
 // 手（描邊、有陰影）
 const handShape=open=>{g.beginPath();if(open){g.moveTo(14,-14);g.lineTo(-18,-16);g.quadraticCurveTo(-26,-14,-18,-9);g.lineTo(-4,-8);g.lineTo(-24,-5);g.quadraticCurveTo(-31,0,-23,4);g.lineTo(-4,3);g.lineTo(-21,8);g.quadraticCurveTo(-27,13,-19,15);g.lineTo(-2,12);g.lineTo(-14,17);g.quadraticCurveTo(-18,22,-11,23);g.lineTo(8,20);g.quadraticCurveTo(20,18,22,6);g.lineTo(22,-8);g.quadraticCurveTo(20,-16,14,-14)}
  else{g.moveTo(-14,-14);g.quadraticCurveTo(-24,-14,-24,-4);g.quadraticCurveTo(-26,8,-20,14);g.quadraticCurveTo(-12,22,4,20);g.quadraticCurveTo(20,18,22,4);g.lineTo(22,-8);g.quadraticCurveTo(18,-18,4,-16);g.closePath()}};
 const handDraw=(x,y,open,s=1.25,flip=false)=>{g.save();g.translate(x,y);g.scale(flip?-s:s,s);g.fillStyle='rgba(0,0,0,.18)';g.save();g.translate(5,7);handShape(open);g.fill();g.restore();
  g.fillStyle='#4a7ad8';rr(16,-14,22,32,5);g.fill();g.strokeStyle=OL;g.lineWidth=2.4/s;g.stroke();g.fillStyle='rgba(255,255,255,.25)';g.fillRect(19,-11,4,26);
  handShape(open);g.fillStyle=lg(-16,22,'#ffdcb8','#e9b48a');g.fill();g.strokeStyle=OL;g.lineWidth=2.4/s;g.stroke();
  if(!open){g.strokeStyle='rgba(120,70,40,.55)';g.lineWidth=1.4/s;[-6,2,10].forEach(yy=>{g.beginPath();g.moveTo(-22,yy);g.quadraticCurveTo(-14,yy+2,-8,yy);g.stroke()})}
  g.beginPath();g.ellipse(-6,-18,6,9,-.7,0,7);g.fillStyle='#f7c9a0';g.fill();g.strokeStyle=OL;g.stroke();g.restore()};
 const sponge=(x,y)=>{const w=T.pow>1?84:70,wob=down?Math.sin(performance.now()/45)*3:0;g.save();g.translate(x,y+wob);g.fillStyle='rgba(0,0,0,.2)';rr(-w/2+6,-14,w,40,10);g.fill();
  g.fillStyle=lg(10,26,'#3cae5a','#2a8a44');rr(-w/2,8,w,16,6);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='rgba(255,255,255,.18)';for(let i=-w/2+6;i<w/2-4;i+=7)g.fillRect(i,12,3,3);
  g.fillStyle=lg(-20,10,'#ffe680','#f5c430');rr(-w/2,-20,w,32,9);g.fill();g.strokeStyle=OL;g.stroke();g.fillStyle='rgba(200,150,30,.45)';[[-20,-10,3],[-6,-4,2.4],[10,-12,2.8],[22,-2,2.2],[-14,2,2],[4,4,2.6]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill()});
  g.fillStyle='rgba(255,255,255,.55)';rr(-w/2+5,-17,w-10,5,3);g.fill();
  if(down){g.fillStyle='rgba(255,255,255,.85)';[[-w/2,22,7],[-w/2+12,26,5],[w/2-4,24,6],[w/2-16,27,4]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill()})}
  handDraw(w/2-14,-24,false,1.1);g.restore()};
 const broom=(x,y)=>{const bw=T.pow>1?150:112;g.save();g.translate(x,y);const sw=down?Math.sin(performance.now()/90)*.06:0;g.rotate(sw);
  g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(4,22,bw/2,8,0,0,7);g.fill();
  g.strokeStyle=OL;g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(0,-8);g.lineTo(54,-170);g.stroke();g.strokeStyle='#c08a4a';g.lineWidth=7;g.stroke();g.strokeStyle='rgba(255,230,190,.5)';g.lineWidth=2;g.beginPath();g.moveTo(-2,-14);g.lineTo(50,-166);g.stroke();
  g.beginPath();g.moveTo(-bw/2,20);g.quadraticCurveTo(0,26,bw/2,20);g.lineTo(bw/2-14,-8);g.lineTo(-bw/2+14,-8);g.closePath();g.fillStyle=lg(-8,22,'#e8c46a','#c8962e');g.fill();g.strokeStyle=OL;g.lineWidth=2.4;g.stroke();
  g.strokeStyle='rgba(140,90,20,.6)';g.lineWidth=1.3;for(let i=-bw/2+10;i<bw/2-6;i+=5){g.beginPath();g.moveTo(i*.82,-6);g.lineTo(i,20);g.stroke()}
  g.fillStyle='#d23c3c';rr(-bw/2+12,-14,bw-24,9,3);g.fill();g.strokeStyle=OL;g.stroke();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-bw/2+16,-12,bw-32,2);
  handDraw(30,-96,false,1.15);handDraw(46,-140,false,1.05);g.restore()};
 // ── 上方進度條、連擊、結算 ──
 const hud=(pr,label,sub)=>{pr=Math.max(0,Math.min(1,pr));g.save();g.fillStyle='rgba(40,24,12,.55)';rr(54,12,612,40,20);g.fill();g.fillStyle='#fff6e2';rr(58,16,604,32,16);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;rr(58,16,604,32,16);g.stroke();
  g.save();rr(62,20,596,24,12);g.clip();g.fillStyle='#ead9b6';g.fillRect(62,20,596,24);const c1=pr>=1?'#5ad07a':'#5ab0ff',c2=pr>=1?'#2a9a4a':'#2a7ad8';g.fillStyle=lg(20,44,c1,c2);g.fillRect(62,20,596*pr,24);g.fillStyle='rgba(255,255,255,.4)';g.fillRect(62,22,596*pr,6);
  const sh=(performance.now()/6)%800-100;g.fillStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(62+sh,20);g.lineTo(92+sh,20);g.lineTo(72+sh,44);g.lineTo(42+sh,44);g.fill();g.restore();
  g.font='bold 15px sans-serif';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(60,30,10,.75)';g.strokeText(label,360,37);g.fillStyle='#fff';g.fillText(label,360,37);
  if(sub){g.font='bold 13px sans-serif';g.fillStyle='#fff6e2';g.strokeText(sub,360,70);g.fillText(sub,360,70)}
  if(combo>=3&&performance.now()-comboT<1200){const a=1-(performance.now()-comboT)/1200;g.globalAlpha=Math.min(1,a*2);g.save();g.translate(640,92);g.rotate(-.12);g.scale(1+a*.15,1+a*.15);g.fillStyle='#ff7a3a';rr(-52,-18,104,34,10);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='#fff';g.font='bold 18px sans-serif';g.fillText('COMBO ×'+combo,0,6);g.restore();g.globalAlpha=1}
  g.restore()};
 const bump=()=>{combo++;comboT=performance.now()};
 const drawFx=dt=>{for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;if(f.t<0)continue;
  if(f.k=='d'){f.x+=f.vx*dt;f.y+=f.vy*dt;if(f.t>.8){fx.splice(i,1);continue}g.globalAlpha=(1-f.t/.8)*.55;g.fillStyle='#bdb3a0';g.beginPath();g.arc(f.x,f.y,f.r*(1+f.t*1.5),0,7);g.fill();g.globalAlpha=1;continue}
  if(f.k=='b'){f.x+=f.vx*dt;f.y+=f.vy*dt;if(f.t>.9){fx.splice(i,1);continue}g.globalAlpha=1-f.t/.9;const q=g.createRadialGradient(f.x-f.r*.3,f.y-f.r*.3,0,f.x,f.y,f.r);q.addColorStop(0,'rgba(255,255,255,.95)');q.addColorStop(.6,'rgba(200,235,255,.35)');q.addColorStop(1,'rgba(160,210,255,.6)');g.fillStyle=q;g.beginPath();g.arc(f.x,f.y,f.r,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=1.2;g.stroke();g.globalAlpha=1;continue}
  if(f.k=='s'){if(f.t>.6){fx.splice(i,1);continue}const a=Math.sin(f.t/.6*Math.PI);g.globalAlpha=a;star(f.x,f.y-f.t*20,f.r*a+2,'#fff7b0');g.globalAlpha=1;continue}
  if(f.t>1.1){fx.splice(i,1);continue}g.globalAlpha=Math.min(1,(1.1-f.t)*2);g.font='bold 20px sans-serif';g.textAlign='center';g.lineWidth=4;g.strokeStyle='rgba(255,255,255,.9)';g.strokeText(f.s,f.x,f.y-f.t*44);g.fillStyle=f.c||'#2a9a4a';g.fillText(f.s,f.x,f.y-f.t*44);g.globalAlpha=1}};
 const finDraw=(dt,title)=>{if(!fin)return;finT+=dt;const a=Math.min(1,finT*3);g.fillStyle=`rgba(30,18,8,${.45*a})`;g.fillRect(0,0,W2,H2);
  conf.forEach(c=>{c.vy+=700*dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.vx*=.99;c.r+=c.vr*dt;g.save();g.translate(c.x,c.y);g.rotate(c.r);g.fillStyle=c.c;g.fillRect(-c.w/2,-c.h/2,c.w,c.h);g.restore()});
  const s=Math.min(1,finT*4),bs=s<1?s*1.12:1;g.save();g.translate(360,262);g.scale(bs,bs);g.fillStyle='rgba(0,0,0,.25)';rr(-200,-84,412,180,22);g.fill();g.fillStyle='#fff8e6';rr(-206,-92,412,180,22);g.fill();g.strokeStyle=OL;g.lineWidth=4;g.stroke();
  g.fillStyle='#e05a7a';g.beginPath();g.moveTo(-150,-110);g.lineTo(150,-110);g.lineTo(166,-86);g.lineTo(150,-62);g.lineTo(-150,-62);g.lineTo(-166,-86);g.closePath();g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();
  g.fillStyle='#fff';g.font='bold 24px sans-serif';g.textAlign='center';g.fillText(title,0,-78);
  const n=perf?3:2;for(let i=0;i<3;i++){const t2=finT-.25-i*.18,sc=t2<=0?0:Math.min(1,t2*5)*(t2<.2?1.3:1);if(sc<=0)continue;g.save();g.translate(-80+i*80,-6);g.scale(sc,sc);star(0,0,30,'#7a5a3a');star(0,-2,27,i<n?'#ffd23a':'#e2d6c0');if(i<n){g.globalAlpha=.6;star(-6,-9,9,'#fff7c8');g.globalAlpha=1}g.restore()}
  g.fillStyle='#6a4a2a';g.font='bold 16px sans-serif';g.fillText(perf?'完美！超有效率 ✨':'辛苦了！家裡乾淨多了',0,60);g.restore()};
 let move=()=>{},press=()=>{},release=()=>{},keyAct=()=>{},draw=()=>{};
 const stain=(s)=>{const a=Math.max(0,s.hp);if(a<=0)return;g.globalAlpha=Math.min(1,.15+a);blob(s.x,s.y,s.r*(.55+.45*a),s.seed);g.fillStyle=s.c;g.fill();g.globalAlpha=Math.min(1,.15+a)*.45;blob(s.x-s.r*.2,s.y-s.r*.2,s.r*.4*(.55+.45*a),s.seed+1);g.fillStyle='rgba(255,255,255,.6)';g.fill();g.globalAlpha=1};
 const hitSp=(arr,x,y,amt,rad)=>{let hit=0;arr.forEach(s=>{if(s.hp>0&&Math.hypot(s.x-x,s.y-y)<s.r+rad){s.hp-=amt;hit=1;if(s.hp<=0){spark(s.x,s.y,5);bump()}}});return hit};

 // ════════ 🍽️ 洗碗 ════════
 if(k=='dish'){const N=4;let di=0,slide=0;const PAT=['#3a6ac8','#d0506a','#3a9a6a','#c8902a'];
  const mk=()=>{const bowl=di%2==1,sp=[];for(let i=0;i<7+di;i++){const a=rnd(0,6.28),r=rnd(10,bowl?96:126);sp.push({x:360+Math.cos(a)*r,y:300+Math.sin(a)*r*.78,r:rnd(16,28),hp:1,seed:rnd(0,9),c:['#9a6a2a','#b8482a','#7a5530','#c8a03a','#6a8a3a'][i%5],rice:Math.random()<.35})}return{bowl,sp,pat:PAT[di%4]}};let D=mk();
  M.tip.innerHTML='🧽 <b>按住菜瓜布上下來回刷</b>，把油污刷掉！一共 '+N+' 個碗盤。鍵盤：<b>↑ ↓</b> 交替按';
  move=(dx,dy,x,y)=>{if(!down||slide)return;const amt=(Math.abs(dy)+Math.abs(dx)*.45)*.0065*pow;if(hitSp(D.sp,x,y,amt,36)&&Math.random()<.55)bubble(x,y+10,1);if(D.sp.every(s=>s.hp<=0)&&!slide){slide=.001;spark(360,300,14);fx.push({x:360,y:190,t:0,s:'✨ 亮晶晶！',c:'#2a7ad8'})}};
  let lastK='';keyAct=e=>{if(e.key!='ArrowUp'&&e.key!='ArrowDown')return;e.preventDefault();const s=D.sp.filter(q=>q.hp>0).sort((a,b)=>b.hp-a.hp)[0];if(!s)return;mx=s.x;my=s.y+(e.key=='ArrowUp'?-16:16);hover=true;down=true;move(0,e.key!=lastK?40:12,mx,my);down=false;lastK=e.key};
  const plate=(x,y,sc,pat,bowl,clean)=>{g.save();g.translate(x,y);g.scale(sc,sc);g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(8,10,bowl?150:182,bowl?128:150,0,0,7);g.fill();
   g.beginPath();g.ellipse(0,0,bowl?150:182,bowl?128:150,0,0,7);g.fillStyle='#fdfcf8';g.fill();g.strokeStyle='#8a9aa8';g.lineWidth=3;g.stroke();
   g.strokeStyle=pat;g.lineWidth=4;g.beginPath();g.ellipse(0,0,bowl?138:168,bowl?116:138,0,0,7);g.stroke();g.fillStyle=pat;for(let i=0;i<24;i++){const a=i/24*6.283;g.beginPath();g.arc(Math.cos(a)*(bowl?128:156),Math.sin(a)*(bowl?107:128),2.6,0,7);g.fill()}
   const q=g.createRadialGradient(0,0,10,0,0,bowl?110:124);q.addColorStop(0,bowl?'#e6ecf0':'#ffffff');q.addColorStop(1,bowl?'#cdd6de':'#eef2f4');g.fillStyle=q;g.beginPath();g.ellipse(0,0,bowl?108:122,bowl?90:102,0,0,7);g.fill();g.strokeStyle='rgba(150,165,180,.6)';g.lineWidth=2;g.stroke();
   g.fillStyle='rgba(255,255,255,.75)';g.beginPath();g.ellipse(-70,-60,30,10,-.6,0,7);g.fill();if(clean){g.globalAlpha=.6;star(60,-50,10,'#fff')}g.restore()};
  draw=dt=>{// 牆面磁磚
   g.fillStyle='#f4efe4';g.fillRect(0,0,W2,H2);for(let y=0;y<200;y+=34)for(let x=(y/34%2)*20;x<W2;x+=40){g.fillStyle=((x+y)/2)%3?'#fbf7ee':'#f1eadb';g.fillRect(x+1,y+1,38,32)}g.strokeStyle='#ddd2bc';g.lineWidth=1;
   // 窗戶
   g.fillStyle=lg(0,120,'#9fd8ff','#dff3ff');rr(26,20,120,100,6);g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();g.strokeStyle='#fff';g.lineWidth=5;g.beginPath();g.moveTo(86,22);g.lineTo(86,118);g.moveTo(28,70);g.lineTo(144,70);g.stroke();
   g.fillStyle='#ff9fb2';g.beginPath();g.moveTo(20,16);g.quadraticCurveTo(48,60,30,124);g.lineTo(20,124);g.fill();g.beginPath();g.moveTo(152,16);g.quadraticCurveTo(124,60,142,124);g.lineTo(152,124);g.fill();
   // 盆栽
   g.fillStyle='#d2693a';rr(612,82,52,40,6);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='#4aa85a';[[620,70,16],[640,58,18],[658,72,14],[638,80,14]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill()});
   // 流理台
   g.fillStyle=lg(110,134,'#d8a46a','#b07a42');g.fillRect(0,110,W2,26);g.fillStyle='#8a5a2e';g.fillRect(0,134,W2,6);g.fillStyle=lg(140,H2,'#e9e0cf','#d4c7ae');g.fillRect(0,140,W2,H2);
   // 水龍頭與水流
   g.fillStyle=lg(60,140,'#e8eef4','#9aa8b4');rr(338,62,44,20,8);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();rr(350,62,20,76,6);g.fill();g.stroke();g.beginPath();g.ellipse(360,62,26,9,0,0,7);g.fillStyle='#c8d2dc';g.fill();g.stroke();
   if(!fin){const w=g.createLinearGradient(354,0,366,0);w.addColorStop(0,'rgba(140,200,255,.25)');w.addColorStop(.5,'rgba(220,245,255,.85)');w.addColorStop(1,'rgba(140,200,255,.25)');g.fillStyle=w;g.fillRect(354,138,12,40)}
   // 水槽
   g.fillStyle='#7a8692';rr(78,150,564,350,26);g.fill();g.strokeStyle=OL;g.lineWidth=3.5;g.stroke();g.fillStyle=lg(160,490,'#b8c4ce','#dfe6ec');rr(92,164,536,322,20);g.fill();
   const wq=g.createLinearGradient(0,200,0,486);wq.addColorStop(0,'rgba(150,210,245,.55)');wq.addColorStop(1,'rgba(100,180,230,.75)');g.fillStyle=wq;rr(96,200,528,282,18);g.fill();
   const tt=performance.now()/1000;g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=2;for(let i=0;i<5;i++){const yy=230+i*52+Math.sin(tt+i)*4;g.beginPath();g.moveTo(110,yy);for(let x=110;x<610;x+=20)g.lineTo(x,yy+Math.sin(x/30+tt*2+i)*3);g.stroke()}
   g.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<16;i++){g.beginPath();g.arc(110+((i*131)%500),206+((i*37)%30),5+(i%3)*3,0,7);g.fill()}
   // 待洗、洗好
   for(let i=di+1;i<N;i++){const yy=470-(i-di)*12;g.beginPath();g.ellipse(46,yy,40,12,0,0,7);g.fillStyle='#f6f2e8';g.fill();g.strokeStyle=OL;g.lineWidth=2;g.stroke();g.fillStyle='#9a6a2a';g.beginPath();g.ellipse(40,yy-2,10,3,0,0,7);g.fill()}
   g.fillStyle='#8a9aa8';rr(640,380,74,110,8);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();for(let i=0;i<5;i++){g.fillStyle='#c4ced8';g.fillRect(646+i*14,384,4,104)}
   for(let i=0;i<di;i++){g.save();g.translate(660+i*14,430);g.rotate(-.25);g.beginPath();g.ellipse(0,0,8,40,0,0,7);g.fillStyle='#fff';g.fill();g.strokeStyle=PAT[i%4];g.lineWidth=2.5;g.stroke();g.restore()}
   let ox=0;if(slide){slide+=dt;ox=slide<.45?Math.pow(slide/.45,2)*520:0;if(slide>=.45){di++;bump();if(di>=N){finish(true);slide=0;ox=900}else{D=mk();slide=0;fx.push({x:360,y:120,t:0,s:`下一個 ${di+1} / ${N}`,c:'#3d6aa8'})}}}
   if(!(fin&&di>=N)){g.save();g.translate(ox,-Math.sin(Math.min(1,slide/.45)*Math.PI)*30);plate(360,310,1,D.pat,D.bowl,false);g.translate(0,10);D.sp.forEach(s=>{stain(s);if(s.hp>0&&s.rice){g.globalAlpha=Math.max(0,s.hp);g.fillStyle='#fff';g.strokeStyle='#bbb';for(let j=0;j<4;j++){g.beginPath();g.ellipse(s.x-8+j*6,s.y-3+(j%2)*6,3.5,1.8,j,0,7);g.fill();g.stroke()}g.globalAlpha=1}});g.restore()}
   const left=D.sp.reduce((a,s)=>a+Math.max(0,s.hp),0)/D.sp.length;hud((di+(1-left))/N,`🍽️ 碗盤 ${Math.min(N,di+1)} / ${N}　・　${Math.round((1-left)*100)}%`);
   drawFx(dt);if(hover||down)sponge(mx,my);finDraw(dt,'🍽️ 碗盤洗好了！')}}

 // ════════ 👕 洗衣服 ════════
 if(k=='laundry'){const sp=[];for(let i=0;i<8;i++)sp.push({x:rnd(285,435),y:rnd(205,400),r:rnd(18,30),hp:1,seed:rnd(0,9),c:['#8a6a3a','#a8803e','#6a6458','#7a4a3a'][i%4]});let pdx=0,pdy=0,rubs=0,squish=0;
  M.tip.innerHTML='👕 <b>按住衣服左右、上下來回搓揉</b>，污漬慢慢變乾淨！<b>來回換方向搓</b>最有效。鍵盤：<b>← → ↑ ↓</b> 交替按';
  move=(dx,dy,x,y)=>{if(!down)return;const d=Math.hypot(dx,dy);if(d<.5)return;const rev=(dx*pdx+dy*pdy)<0;pdx=dx;pdy=dy;if(rev){rubs++;squish=1}const amt=d*.0042*pow*(rev?3:1);if(hitSp(sp,x,y,amt,42)&&Math.random()<.65)bubble(x,y,2);if(sp.every(s=>s.hp<=0))finish(true)};
  keyAct=e=>{const D={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!D)return;e.preventDefault();const s=sp.filter(q=>q.hp>0).sort((a,b)=>b.hp-a.hp)[0];if(!s)return;mx=s.x+D[0]*18;my=s.y+D[1]*18;hover=true;down=true;move(D[0]*30,D[1]*30,s.x,s.y);down=false};
  draw=dt=>{const tt=performance.now()/1000;squish=Math.max(0,squish-dt*4);
   // 浴室：磁磚牆＋地板
   g.fillStyle='#e6f2f6';g.fillRect(0,0,W2,H2);for(let y=0;y<H2;y+=40)for(let x=0;x<W2;x+=40){g.fillStyle=((x+y)/40)%2?'#dcedf3':'#eef7fa';g.fillRect(x+1,y+1,38,38)}
   // 肥皂、洗衣精
   g.fillStyle='#ff9ec0';rr(36,350,62,34,12);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='rgba(255,255,255,.6)';rr(44,356,30,6,3);g.fill();g.fillStyle='#fff';[[44,346,6],[58,342,8],[76,346,5]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill();g.strokeStyle='#bfe3f2';g.lineWidth=1.5;g.stroke()});
   g.fillStyle='#5ab0e8';rr(624,250,62,110,12);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='#2a7ac8';rr(640,232,30,24,4);g.fill();g.stroke();g.fillStyle='#fff';rr(632,282,46,40,6);g.fill();g.fillStyle='#2a7ac8';g.font='bold 13px sans-serif';g.textAlign='center';g.fillText('洗衣精',655,306);
   // 木桶
   g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(368,480,300,34,0,0,7);g.fill();
   g.fillStyle=lg(90,500,'#c88a4a','#8a5a2a');g.beginPath();g.moveTo(80,140);g.lineTo(640,140);g.lineTo(610,482);g.quadraticCurveTo(360,510,110,482);g.closePath();g.fill();g.strokeStyle=OL;g.lineWidth=3.5;g.stroke();
   g.strokeStyle='rgba(90,50,20,.45)';g.lineWidth=2;for(let i=1;i<10;i++){const x0=80+i*56,x1=110+i*50;g.beginPath();g.moveTo(x0,142);g.lineTo(x1,488);g.stroke()}
   [[200,'#6a6a72'],[420,'#6a6a72']].forEach(b=>{const y=b[0];const k2=(y-140)/340,xl=80+30*k2,xr=640-30*k2;g.fillStyle=lg(y-8,y+8,'#a0a6ae','#5a6068');g.fillRect(xl,y-8,xr-xl,16);g.strokeStyle=OL;g.lineWidth=2;g.strokeRect(xl,y-8,xr-xl,16)});
   // 水面＋泡泡
   g.beginPath();g.ellipse(360,150,280,34,0,0,7);g.fillStyle='#7a4a22';g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();
   const wq=g.createLinearGradient(0,140,0,470);wq.addColorStop(0,'#a6dcf6');wq.addColorStop(1,'#5aaee0');g.fillStyle=wq;g.beginPath();g.moveTo(92,158);g.lineTo(628,158);g.lineTo(600,470);g.quadraticCurveTo(360,496,120,470);g.closePath();g.fill();
   g.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<40;i++){const x=100+((i*97)%520),y=160+((i*61)%60)+Math.sin(tt*2+i)*2;g.beginPath();g.arc(x,y,5+(i%4)*3,0,7);g.fill()}
   for(let i=0;i<8;i++){const x=120+i*64+Math.sin(tt+i)*6,y=430+Math.sin(tt*1.5+i)*4;g.beginPath();g.arc(x,y,7+(i%3)*3,0,7);g.fillStyle='rgba(255,255,255,.65)';g.fill()}
   // 衣服（T 恤）
   const left=sp.reduce((a,s)=>a+Math.max(0,s.hp),0)/sp.length,wob=down?Math.sin(performance.now()/50)*2:0,sq=1-squish*.03;
   g.save();g.translate(360+wob,300);g.scale(1+squish*.03,sq);g.translate(-360,-300);
   const shirt=()=>{g.beginPath();g.moveTo(246,170);g.lineTo(312,146);g.quadraticCurveTo(360,178,408,146);g.lineTo(474,170);g.lineTo(528,232);g.lineTo(478,262);g.lineTo(466,244);g.lineTo(466,432);g.quadraticCurveTo(360,442,254,432);g.lineTo(254,244);g.lineTo(242,262);g.lineTo(192,232);g.closePath()};
   g.fillStyle='rgba(0,40,80,.18)';g.save();g.translate(8,10);shirt();g.fill();g.restore();
   shirt();g.fillStyle=lg(146,440,'#ffffff','#e8eef4');g.fill();g.fillStyle=`rgba(150,125,90,${left*.5})`;g.fill();g.strokeStyle=OL;g.lineWidth=3.5;g.stroke();
   g.strokeStyle='rgba(120,140,160,.45)';g.lineWidth=2.5;g.beginPath();g.moveTo(254,244);g.lineTo(242,262);g.moveTo(466,244);g.lineTo(478,262);g.moveTo(300,300);g.quadraticCurveTo(310,360,296,420);g.moveTo(430,290);g.quadraticCurveTo(418,350,428,420);g.stroke();
   g.beginPath();g.moveTo(312,146);g.quadraticCurveTo(360,192,408,146);g.strokeStyle=OL;g.lineWidth=3;g.stroke();g.strokeStyle='#ff8fb1';g.lineWidth=5;g.beginPath();g.moveTo(318,152);g.quadraticCurveTo(360,186,402,152);g.stroke();
   // 胸前愛心
   g.save();g.translate(360,290);g.beginPath();g.moveTo(0,16);g.bezierCurveTo(-30,-4,-18,-28,0,-12);g.bezierCurveTo(18,-28,30,-4,0,16);g.fillStyle='#ff5a7a';g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.ellipse(-10,-10,4,3,-.6,0,7);g.fill();g.restore();
   g.fillStyle='#5aa0e8';g.font='bold 15px sans-serif';g.textAlign='center';g.fillText('Allen ♥ Kai',360,340);
   sp.forEach(stain);g.restore();
   hud(1-left,`👕 搓揉中 ${Math.round((1-left)*100)}%`,rubs>4?`🫧 來回搓 ×${rubs}`:'');drawFx(dt);
   if(hover||down){handDraw(mx-48,my+wob,false,1.4,true);handDraw(mx+48,my-wob,false,1.4)}finDraw(dt,'👕 香香的，好乾淨！')}}

 // ════════ 🧹 掃地 ════════
 if(k=='clean'){const pan={x:570,y:356,w:116,h:96},items=[];const TY=['dust','dust','dust','hair','paper','crumb','leaf','wrap'];
  for(let i=0;i<16;i++){const t=TY[i%TY.length];let x,y;do{x=rnd(60,520);y=rnd(150,470)}while(x>pan.x-60&&y>pan.y-60);items.push({x,y,k:t,r:t=='paper'?13:t=='dust'?12:t=='wrap'?11:8,in:0,a:rnd(0,6),seed:rnd(0,9),sc:1})}
  M.tip.innerHTML='🧹 <b>按住拖曳掃把</b>，把灰塵、紙屑、毛髮<b>掃進右下角的畚箕</b>！鍵盤：<b>方向鍵</b>移動掃把';
  const bw=()=>T.pow>1?150:112;
  move=(dx,dy,x,y)=>{if(!down&&!keyMove)return;items.forEach(it=>{if(it.in)return;if(Math.abs(it.x-x)<bw()/2+it.r&&it.y>y-12&&it.y<y+32+it.r){it.x+=dx*1.05;it.y+=dy*1.05;it.a+=dx*.01;it.x=Math.max(20,Math.min(pan.x+pan.w-12,it.x));it.y=Math.max(130,Math.min(H2-20,it.y));if(Math.random()<.25)fx.push({x:it.x,y:it.y,vx:rnd(-24,24),vy:rnd(-36,-4),t:0,r:rnd(3,6),k:'d'})}
    if(!it.in&&it.x>pan.x-6&&it.y>pan.y-16&&it.y<pan.y+pan.h+12){it.in=1;it.inT=0;bump();fx.push({x:it.x,y:it.y-14,t:0,s:'+1',c:'#2a7ad8'})}});if(items.every(i=>i.in))finish(true)};
  const KV={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};keyAct=e=>{if(KV[e.key]){e.preventDefault();held[e.key]=1}};
  const item=it=>{g.save();g.translate(it.x,it.y);g.rotate(it.a);g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(2,6,it.r,it.r*.4,0,0,7);g.fill();
   if(it.k=='dust'){blob(0,0,it.r,it.seed);g.fillStyle='#b4ab9c';g.fill();g.strokeStyle='#7a7064';g.lineWidth=1.5;g.stroke();g.strokeStyle='rgba(90,80,70,.6)';g.lineWidth=1;for(let i=0;i<6;i++){const a=i+it.seed;g.beginPath();g.moveTo(Math.cos(a)*it.r*.6,Math.sin(a)*it.r*.5);g.lineTo(Math.cos(a)*it.r*1.2,Math.sin(a)*it.r)}g.stroke();g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(-3,-3,3,0,7);g.fill()}
   else if(it.k=='paper'){g.beginPath();g.moveTo(-12,-8);g.lineTo(-2,-12);g.lineTo(10,-9);g.lineTo(13,2);g.lineTo(6,11);g.lineTo(-8,10);g.lineTo(-13,1);g.closePath();g.fillStyle='#fbf8f0';g.fill();g.strokeStyle='#8a8070';g.lineWidth=1.5;g.stroke();g.strokeStyle='#c8c0b0';g.beginPath();g.moveTo(-6,-6);g.lineTo(2,4);g.moveTo(4,-8);g.lineTo(-2,6);g.stroke()}
   else if(it.k=='hair'){g.strokeStyle='#3a2a1a';g.lineWidth=1.6;g.beginPath();for(let a=0;a<14;a+=.4)g.lineTo(Math.cos(a)*(2+a*.8),Math.sin(a)*(2+a*.8)*.6);g.stroke()}
   else if(it.k=='leaf'){g.beginPath();g.moveTo(-11,0);g.quadraticCurveTo(0,-11,11,0);g.quadraticCurveTo(0,11,-11,0);g.fillStyle='#d89a3a';g.fill();g.strokeStyle='#8a5a1a';g.lineWidth=1.5;g.stroke();g.beginPath();g.moveTo(-11,0);g.lineTo(11,0);g.stroke()}
   else if(it.k=='wrap'){g.fillStyle='#ff6a8a';rr(-8,-6,16,12,3);g.fill();g.strokeStyle=OL;g.lineWidth=1.5;g.stroke();g.fillStyle='#ffd84a';g.beginPath();g.moveTo(-8,-6);g.lineTo(-14,-9);g.lineTo(-14,9);g.lineTo(-8,6);g.fill();g.stroke();g.beginPath();g.moveTo(8,-6);g.lineTo(14,-9);g.lineTo(14,9);g.lineTo(8,6);g.fill();g.stroke()}
   else{g.fillStyle='#d8a85a';g.strokeStyle='#8a6a2a';g.lineWidth=1;[[-6,0,3],[0,-3,2.5],[4,2,3],[8,-1,2],[-2,4,2]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill();g.stroke()})}
   g.restore()};
  draw=dt=>{let kx=0,ky=0;for(const q in held)if(held[q]){kx+=KV[q][0];ky+=KV[q][1]}if(kx||ky){const s2=320*dt;keyMove=true;hover=true;mx=Math.max(40,Math.min(W2-40,mx+kx*s2));my=Math.max(130,Math.min(H2-30,my+ky*s2));move(kx*s2,ky*s2,mx,my);keyMove=false}
   // 牆＋踢腳板
   g.fillStyle='#f3e6cf';g.fillRect(0,0,W2,120);g.fillStyle='rgba(200,170,120,.25)';for(let x=0;x<W2;x+=24)g.fillRect(x,0,12,120);
   g.fillStyle=lg(0,90,'#ffffff','#e8f4ff');rr(250,14,140,80,6);g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();g.fillStyle='#ffd27a';g.beginPath();g.arc(320,54,18,0,7);g.fill();g.fillStyle='#7ac06a';g.beginPath();g.moveTo(256,92);g.quadraticCurveTo(300,60,340,92);g.quadraticCurveTo(370,70,386,92);g.fill();
   g.fillStyle='#4a6ab8';rr(450,58,220,56,14);g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();g.fillStyle='#5a7ac8';rr(458,40,96,40,12);g.fill();g.stroke();rr(560,40,100,40,12);g.fill();g.stroke();
   g.fillStyle=lg(110,128,'#a8764a','#7a4e2a');g.fillRect(0,112,W2,14);g.strokeStyle=OL;g.lineWidth=2;g.beginPath();g.moveTo(0,112);g.lineTo(W2,112);g.stroke();
   // 木地板
   for(let y=126;y<H2;y+=34){const off=((y-126)/34%2)*90;for(let x=-off;x<W2;x+=180){const tone=['#c8945e','#be8a54','#d09c66','#c49058'][((x+y)/34|0)&3];g.fillStyle=tone;g.fillRect(x,y,179,33);g.strokeStyle='rgba(120,70,30,.18)';g.lineWidth=1;g.beginPath();g.moveTo(x+20,y+12);g.quadraticCurveTo(x+90,y+6,x+160,y+14);g.stroke();g.fillStyle='rgba(90,50,20,.5)';g.fillRect(x+179,y,1.5,33)}g.fillStyle='rgba(90,50,20,.45)';g.fillRect(0,y+33,W2,1.5)}
   // 地毯角落
   g.save();g.beginPath();rr(-40,380,240,180,16);g.clip();g.fillStyle='#e07a8a';g.fillRect(-40,380,240,180);g.strokeStyle='#fff3e0';g.lineWidth=4;rr(-28,392,216,160,10);g.stroke();g.fillStyle='#fff3e0';for(let i=0;i<5;i++)for(let j=0;j<3;j++){g.beginPath();g.arc(10+i*38,420+j*40,5,0,7);g.fill()}g.restore();g.strokeStyle=OL;g.lineWidth=2.5;rr(-40,380,240,180,16);g.stroke();
   // 畚箕
   const P=pan,got=items.filter(i=>i.in).length;g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(P.x+P.w/2+6,P.y+P.h+12,P.w/2+10,10,0,0,7);g.fill();
   g.strokeStyle=OL;g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(P.x+P.w-10,P.y+P.h/2);g.lineTo(P.x+P.w+30,P.y-70);g.stroke();g.strokeStyle='#2a6ab8';g.lineWidth=5;g.stroke();
   g.beginPath();g.moveTo(P.x,P.y+6);g.lineTo(P.x+P.w,P.y-12);g.lineTo(P.x+P.w,P.y+P.h+12);g.lineTo(P.x,P.y+P.h-6);g.closePath();g.fillStyle=lg(P.y,P.y+P.h,'#5ab0f0','#2a78c8');g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();
   g.fillStyle='#1a5aa0';g.beginPath();g.moveTo(P.x+P.w-14,P.y-9);g.lineTo(P.x+P.w,P.y-12);g.lineTo(P.x+P.w,P.y+P.h+12);g.lineTo(P.x+P.w-14,P.y+P.h+9);g.closePath();g.fill();g.stroke();
   g.fillStyle='rgba(255,255,255,.35)';g.fillRect(P.x+4,P.y+10,P.w-24,4);
   items.forEach(it=>{if(!it.in)return;it.inT=Math.min(1,(it.inT||0)+dt*3)});const inside=items.filter(i=>i.in);inside.forEach((it,i)=>{if(it.inT<1){const x=it.x+(P.x+30+(i%4)*16-it.x)*it.inT,y=it.y+(P.y+P.h-20-Math.floor(i/4)*8-it.y)*it.inT;item({...it,x,y})}else item({...it,x:P.x+24+(i%4)*16,y:P.y+P.h-18-Math.floor(i/4)*8,a:it.a})});
   g.fillStyle='#fff';g.font='bold 14px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle=OL;g.strokeText(`${got}/${items.length}`,P.x+P.w/2-6,P.y+28);g.fillText(`${got}/${items.length}`,P.x+P.w/2-6,P.y+28);
   items.forEach(it=>{if(!it.in)item(it)});
   hud(got/items.length,`🧹 掃進畚箕 ${got} / ${items.length}`);drawFx(dt);if(hover||down)broom(mx,my);finDraw(dt,'🧹 地板乾乾淨淨！')}}

 // ════════ 🗑️ 倒垃圾 ════════
 if(k=='trash'){const BIN=[{n:'一般垃圾',c:'#7a7a86',c2:'#55555f',sym:'G'},{n:'資源回收',c:'#3a8ad8',c2:'#2a62a8',sym:'R'},{n:'廚餘',c:'#4aae5a',c2:'#2e8040',sym:'F'}];BIN.forEach((b,i)=>{b.x=130+i*230;b.y=420;b.open=0;b.jig=0});
  const POOL=[['🧻',0,'衛生紙'],['🩹',0,'用過的OK繃'],['🧽',0,'舊菜瓜布'],['🪥',0,'舊牙刷'],['🥫',1,'鐵罐'],['🧃',1,'鋁箔包'],['📦',1,'紙箱'],['📰',1,'舊報紙'],['🍾',1,'玻璃瓶'],['🥤',1,'飲料杯'],['🍌',2,'香蕉皮'],['🍎',2,'蘋果核'],['🥚',2,'蛋殼'],['🍉',2,'西瓜皮'],['🥬',2,'菜葉']];
  const items=POOL.sort(()=>Math.random()-.5).slice(0,12).map((q,i)=>({ic:q[0],b:q[1],n:q[2],x:92+(i%6)*108+rnd(-10,10),y:160+Math.floor(i/6)*96+rnd(-6,8),in:0,fly:0,sh:0}));items.forEach(i=>{i.hx=i.x;i.hy=i.y});
  let hold=null,miss=0,sel=0;M.tip.innerHTML='🗑️ <b>按住垃圾，拖到正確的垃圾桶</b>放開！一般垃圾、資源回收、廚餘要分好。鍵盤：<b>1 2 3</b> 把閃爍的垃圾丟進桶子';
  const drop=(it,bi)=>{if(it.b==bi){it.in=1;it.fly={bi,t:0,x0:it.x,y0:it.y};BIN[bi].jig=1;bump();fx.push({x:BIN[bi].x,y:BIN[bi].y-110,t:0,s:'+1 '+it.n,c:BIN[bi].c2});spark(BIN[bi].x,BIN[bi].y-80,4)}
   else{miss++;combo=0;it.sh=1;fx.push({x:it.hx,y:it.hy-40,t:0,s:`${it.n} → 「${BIN[it.b].n}」`,c:'#c0392b'});it.x=it.hx;it.y=it.hy}if(items.every(i=>i.in))finish(miss==0)};
  press=(x,y)=>{hold=items.filter(i=>!i.in).find(i=>Math.hypot(i.x-x,i.y-y)<40)||null};
  move=(dx,dy,x,y)=>{if(hold){hold.x=x;hold.y=y}};
  release=(x,y)=>{if(!hold)return;const bi=BIN.findIndex(b=>Math.abs(x-b.x)<84&&y>b.y-120);if(bi>=0)drop(hold,bi);else{hold.x=hold.hx;hold.y=hold.hy}hold=null};
  keyAct=e=>{const n=+e.key;if(n>=1&&n<=3){e.preventDefault();const rest=items.filter(i=>!i.in);const it=rest[sel%Math.max(1,rest.length)];if(it){it.x=BIN[n-1].x;it.y=BIN[n-1].y-80;drop(it,n-1)}}else if(e.key=='ArrowRight'||e.key=='ArrowLeft'){sel+=e.key=='ArrowRight'?1:items.length-1}};
  const symDraw=(b)=>{g.save();g.strokeStyle='#fff';g.fillStyle='#fff';g.lineWidth=4;g.lineCap='round';if(b.sym=='R'){for(let i=0;i<3;i++){g.save();g.rotate(i*2.094);g.beginPath();g.arc(0,0,14,-.9,.5);g.stroke();g.beginPath();g.moveTo(14*Math.cos(.5)+5,14*Math.sin(.5)-4);g.lineTo(14*Math.cos(.5),14*Math.sin(.5));g.lineTo(14*Math.cos(.5)-6,14*Math.sin(.5)-3);g.stroke();g.restore()}}
   else if(b.sym=='F'){g.beginPath();g.moveTo(-12,8);g.quadraticCurveTo(-12,-14,12,-14);g.quadraticCurveTo(12,8,-12,8);g.fill();g.strokeStyle=b.c2;g.lineWidth=2;g.beginPath();g.moveTo(-10,6);g.lineTo(8,-10);g.stroke()}
   else{rr(-10,-10,20,22,3);g.stroke();g.beginPath();g.moveTo(-14,-12);g.lineTo(14,-12);g.moveTo(-4,-16);g.lineTo(4,-16);g.stroke();g.lineWidth=2;[-4,0,4].forEach(x=>{g.beginPath();g.moveTo(x,-5);g.lineTo(x,8);g.stroke()})}g.restore()};
  draw=dt=>{const tt=performance.now()/1000;
   // 後陽台：磚牆＋地磚
   g.fillStyle='#d8a07a';g.fillRect(0,0,W2,330);for(let y=0;y<330;y+=22)for(let x=-((y/22)%2)*30;x<W2;x+=60){g.fillStyle=['#c8805a','#d08a62','#c47a56'][((x+y)/20|0)%3];g.fillRect(x+2,y+2,56,18)}
   g.fillStyle='#e8dcc4';g.fillRect(0,330,W2,H2);for(let x=0;x<W2;x+=60){g.fillStyle='rgba(120,100,70,.2)';g.fillRect(x,330,2,H2)}g.fillStyle='rgba(120,100,70,.2)';g.fillRect(0,400,W2,2);g.fillRect(0,470,W2,2);g.fillStyle='#a8784a';g.fillRect(0,324,W2,10);
   // 公告
   g.fillStyle='#fff8e0';rr(14,60,150,48,6);g.fill();g.strokeStyle=OL;g.lineWidth=2.5;g.stroke();g.fillStyle='#c0392b';g.beginPath();g.arc(89,62,5,0,7);g.fill();g.fillStyle='#4a3a2a';g.font='bold 13px sans-serif';g.textAlign='center';g.fillText('🚛 垃圾車 19:30',89,80);g.font='12px sans-serif';g.fillText('🎵 少女的祈禱',89,99);
   // 垃圾桶
   BIN.forEach((b,i)=>{const hl=hold&&Math.abs(mx-b.x)<84&&my>b.y-120;b.open+=((hl?1:0)-b.open)*Math.min(1,dt*12);b.jig=Math.max(0,b.jig-dt*3);const jx=Math.sin(b.jig*30)*b.jig*4;
    g.save();g.translate(b.x+jx,b.y);g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(6,64,74,12,0,0,7);g.fill();
    g.beginPath();g.moveTo(-60,-62);g.lineTo(60,-62);g.lineTo(52,60);g.quadraticCurveTo(0,68,-52,60);g.closePath();g.fillStyle=lg(-62,64,b.c,b.c2);g.fill();g.strokeStyle=OL;g.lineWidth=3.5;g.stroke();
    g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=3;[-30,0,30].forEach(x=>{g.beginPath();g.moveTo(x,-48);g.lineTo(x*.9,50);g.stroke()});
    g.fillStyle='rgba(255,255,255,.25)';g.fillRect(-54,-56,8,100);
    g.save();g.translate(0,-16);symDraw(b);g.restore();
    g.fillStyle='#fff8e6';rr(-50,12,100,26,8);g.fill();g.strokeStyle=OL;g.lineWidth=2;g.stroke();g.fillStyle='#3a2410';g.font='bold 15px sans-serif';g.textAlign='center';g.fillText(`${i+1} ${b.n}`,0,31);
    // 蓋子（拿著垃圾靠近會打開）
    g.save();g.translate(-62,-62);g.rotate(-b.open*1.1);g.fillStyle=lg(-14,0,b.c,b.c2);rr(0,-14,124,16,6);g.fill();g.strokeStyle=OL;g.lineWidth=3;g.stroke();g.fillStyle=b.c2;rr(48,-22,28,10,4);g.fill();g.stroke();g.restore();
    if(hl){g.globalAlpha=.5+.5*Math.sin(tt*8);g.strokeStyle='#ffe066';g.lineWidth=5;rr(-70,-80,140,154,14);g.stroke();g.globalAlpha=1}
    g.restore()});
   const rest=items.filter(i=>!i.in),cur=rest[sel%Math.max(1,rest.length)];
   items.forEach(it=>{if(it.in){if(it.fly&&it.fly.t<1){it.fly.t+=dt*2.6;const b=BIN[it.fly.bi],k2=Math.min(1,it.fly.t);g.save();g.globalAlpha=1-k2*.6;g.translate(it.fly.x0+(b.x-it.fly.x0)*k2,it.fly.y0+(b.y-60-it.fly.y0)*k2-Math.sin(k2*3.14)*90);g.rotate(k2*6);g.scale(1-k2*.5,1-k2*.5);g.font='40px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(it.ic,0,0);g.restore();g.textBaseline='alphabetic'}return}
    it.sh=Math.max(0,it.sh-dt*2.5);const shx=Math.sin(it.sh*40)*it.sh*8,isH=it===hold,bob=isH?0:Math.sin(tt*2+it.hx)*2;
    g.save();g.translate(it.x+shx,it.y+bob);g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(0,isH?40:28,isH?18:24,6,0,0,7);g.fill();
    const sc=isH?1.25:1;g.scale(sc,sc);g.beginPath();g.arc(0,0,30,0,7);g.fillStyle='#fffaf0';g.fill();g.strokeStyle=it===cur&&!hold&&Math.floor(tt*3)%2?'#ffb020':OL;g.lineWidth=it===cur&&!hold?4:2.5;g.stroke();
    g.font='36px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(it.ic,0,2);g.textBaseline='alphabetic';
    g.font='bold 12px sans-serif';const lab=T.pow>1?BIN[it.b].n:it.n;const tw=g.measureText(lab).width+12;g.fillStyle=T.pow>1?BIN[it.b].c2:'rgba(60,36,16,.85)';rr(-tw/2,36,tw,18,9);g.fill();g.fillStyle='#fff';g.fillText(lab,0,49);g.restore()});
   const got=items.filter(i=>i.in).length;hud(got/items.length,`🗑️ 分類丟好 ${got} / ${items.length}`,miss?`丟錯 ${miss} 次`:'');drawFx(dt);if(hover||down)handDraw(mx+20,my+16,!hold,1.3);finDraw(dt,miss?'🗑️ 垃圾倒好了！':'🗑️ 完美分類！')}}

 // ── 輸入 ──
 cv.addEventListener('pointerdown',e=>{if(fin)return;const [x,y]=pos(e);mx=x;my=y;down=true;hover=true;try{cv.setPointerCapture(e.pointerId)}catch(er){}press(x,y)});
 cv.addEventListener('pointermove',e=>{const [x,y]=pos(e);const dx=x-mx,dy=y-my;mx=x;my=y;hover=true;if(!fin)move(dx,dy,x,y)});
 const up=e=>{if(!down)return;down=false;const [x,y]=pos(e);release(x,y)};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);cv.addEventListener('pointerleave',()=>{if(!down)hover=false});
 const kd=e=>{if(fin)return;if(e.key=='Escape'){fin=true;M.end();OVK.delete(kd);OVKU.delete(ku);return}keyAct(e)},ku=e=>{delete held[e.key]};
 OVK.add(kd);OVKU.add(ku);
 const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);OVKU.delete(ku);return}const dt=Math.min(.05,(now-lt)/1000);lt=now;g.save();g.lineCap='butt';draw(dt);g.restore();requestAnimationFrame(loop)};requestAnimationFrame(loop)}
