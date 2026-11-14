/* ===== v3：可愛風動物（圓潤 Q 版）===== */
function drawAProc(c,n){const f=n.mv&&n.fr,k=n.t,col=n.c||'#c9a06a',O='#3a2515',tt=NOW/1000,wag=Math.sin(tt*14+(n.x||0))*(n.mv?.7:.45);
 c.save();c.translate(Math.round(n.x+6),Math.round(n.y+8));if(n.dir==2)c.scale(-1,1);c.lineJoin='round';c.lineCap='round';
 const sc=({rabbit:.95,turtle:.8,parrot:.95,callduck:.8,hamster:.7,sheep:1.1,chicken:.9,duck:.9}[k])||1;c.scale(sc,sc);
 const sh=(rx)=>{c.fillStyle='rgba(50,25,0,.28)';c.beginPath();c.ellipse(0,0,rx,rx*.36,0,0,7);c.fill()};
 const fo=(fc,lw)=>{c.fillStyle=fc;c.fill();c.strokeStyle=O;c.lineWidth=lw||.9;c.stroke()};
 const el=(x,y,rx,ry,fc,rot,lw)=>{c.beginPath();c.ellipse(x,y,rx,ry,rot||0,0,7);fo(fc,lw)};
 const eye=(x,y,r)=>{c.fillStyle='#1a1216';c.beginPath();c.ellipse(x,y,r*.85,r,0,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x+r*.3,y-r*.35,r*.38,0,7);c.fill()};
 const blush=(x,y)=>{c.fillStyle='rgba(255,120,130,.45)';c.beginPath();c.ellipse(x,y,1.5,.9,0,0,7);c.fill()};
 const leg=(x,l,w,fc)=>{c.beginPath();c.roundRect(x-w/2,-3.4-l,w,3.4+l,w/2);fo(fc,.8)};
 const bob=n.mv&&f?-.8:0;
 if(k=='dog'||k=='frenchie'||k=='shiba'){
  sh(9);c.translate(0,bob);const fr=k=='frenchie',sb=k=='shiba',bc=fr?(n.c||'#d9b48a'):sb?'#e0a45c':col,lc=shade(bc,-14),bel=sb?'#fff4e4':shade(bc,22);
  // 尾巴
  if(sb){c.beginPath();c.arc(-8,-9,3.2,.4,5.2);c.lineWidth=2.6;c.strokeStyle=O;c.stroke();c.lineWidth=1.6;c.strokeStyle='#e0a45c';c.stroke();c.fillStyle='#fff4e4';c.beginPath();c.arc(-9.4,-7.4,1.4,0,7);c.fill()}
  else if(fr){el(-8.6,-7+wag*.4,1.5,1.2,bc,0,.8)}
  else{c.beginPath();c.moveTo(-7,-7);c.quadraticCurveTo(-11,-10+wag*2,-10,-13);c.lineWidth=2.6;c.strokeStyle=O;c.stroke();c.lineWidth=1.5;c.strokeStyle=bc;c.stroke()}
  leg(-4.6,f?1.4:0,2.8,lc);leg(2.6,f?0:1.4,2.8,lc);
  el(-.4,-6.6,fr?8:7.4,fr?5.4:4.7,bc);el(1,-4.6,5,2.6,bel,0,0);
  leg(-1.8,f?0:1.4,2.8,bc);leg(5.2,f?1.4:0,2.8,bc);
  const hx=fr?8:7.6,hy=-10.4;
  if(fr){ // 蝙蝠耳
   c.beginPath();c.moveTo(hx-5,hy-3);c.lineTo(hx-4.2,hy-9.4);c.lineTo(hx-.2,hy-4);c.closePath();fo(bc);c.beginPath();c.moveTo(hx+.6,hy-4);c.lineTo(hx+4.2,hy-10);c.lineTo(hx+5.4,hy-2.4);c.closePath();fo(bc);
   c.fillStyle='#f4b4b0';c.beginPath();c.moveTo(hx-4,hy-5);c.lineTo(hx-3.8,hy-8);c.lineTo(hx-1.6,hy-4.6);c.fill();c.beginPath();c.moveTo(hx+2,hy-5);c.lineTo(hx+3.8,hy-8.4);c.lineTo(hx+4.4,hy-4);c.fill()}
  el(hx,hy,fr?5.4:4.8,fr?4.8:4.4,bc);
  if(sb){c.beginPath();c.moveTo(hx-4.2,hy-2.6);c.lineTo(hx-3.4,hy-8.2);c.lineTo(hx-.4,hy-4);c.closePath();fo('#e0a45c');c.beginPath();c.moveTo(hx+1.2,hy-4);c.lineTo(hx+4,hy-8.4);c.lineTo(hx+4.6,hy-2.4);c.closePath();fo('#e0a45c');el(hx+1,hy+1.6,3.6,2.4,'#fff4e4',0,.5)}
  else if(!fr){el(hx-3.4,hy-1.6,2.2,3.6,shade(bc,-34),.5,.8)}
  // 口鼻
  const sx=hx+(fr?3.4:3.6),sy=hy+1.4;
  if(fr){el(sx-1,sy,2.4,2,shade(bc,-30),0,.6);c.fillStyle='#1a1216';c.beginPath();c.ellipse(sx-.2,sy-.9,.9,.6,0,0,7);c.fill()}
  else{el(sx,sy,2.8,2,sb?'#fff4e4':shade(bc,20),0,.7);c.fillStyle='#1a1216';c.beginPath();c.ellipse(sx+1.6,sy-.7,.9,.7,0,0,7);c.fill()}
  eye(hx+1.4,hy-1,fr?1.3:1.1);blush(hx-.6,hy+2);
  c.strokeStyle='#a8553f';c.lineWidth=.5;c.beginPath();c.moveTo(sx,sy+1.2);c.lineTo(sx+.6,sy+1.9);c.stroke();
  if(n.mv){c.fillStyle='#ff8a9a';c.beginPath();c.ellipse(sx+.4,sy+2.4,.8,1.1,0,0,7);c.fill()}
  c.restore();return}
 if(k=='cat'){
  sh(8);c.translate(0,bob);const pat=n.pat||'',bc=col;
  c.beginPath();c.moveTo(-6,-6);c.quadraticCurveTo(-12,-8+wag*2.4,-10,-15+wag*2);c.lineWidth=3;c.strokeStyle=O;c.stroke();c.lineWidth=1.8;c.strokeStyle=bc;c.stroke();
  leg(-4,f?1.2:0,2.6,shade(bc,-12));leg(2.6,f?0:1.2,2.6,shade(bc,-12));el(-.4,-6.4,6.6,4.2,bc);
  if(pat=='t'||!pat){c.strokeStyle=shade(bc,-36);c.lineWidth=.8;[-3,-.4,2.2].forEach(x=>{c.beginPath();c.moveTo(x,-10.2);c.lineTo(x+.4,-7.6);c.stroke()})}
  leg(-1.6,f?0:1.2,2.6,bc);leg(4.4,f?1.2:0,2.6,bc);
  const hx=6.6,hy=-10.6;c.beginPath();c.moveTo(hx-4,hy-2);c.lineTo(hx-3.6,hy-7.6);c.lineTo(hx-.6,hy-3.6);c.closePath();fo(bc);c.beginPath();c.moveTo(hx+.8,hy-3.6);c.lineTo(hx+3.8,hy-7.6);c.lineTo(hx+4.4,hy-1.6);c.closePath();fo(bc);
  c.fillStyle='#f4a0a8';c.beginPath();c.moveTo(hx-3,hy-3.4);c.lineTo(hx-3,hy-6);c.lineTo(hx-1.2,hy-3.8);c.fill();c.beginPath();c.moveTo(hx+1.8,hy-3.8);c.lineTo(hx+3.2,hy-6);c.lineTo(hx+3.4,hy-3);c.fill();
  el(hx,hy,4.8,4.2,bc);if(pat=='w'||col=='#f4efe0'){}
  c.fillStyle='#7ad06a';c.beginPath();c.ellipse(hx+1.4,hy-.4,1.1,1.4,0,0,7);c.fill();c.fillStyle='#1a1216';c.beginPath();c.ellipse(hx+1.4,hy-.4,.45,1.2,0,0,7);c.fill();c.fillStyle='#fff';c.fillRect(hx+1.6,hy-1.4,.6,.6);
  c.fillStyle='#f48a98';c.beginPath();c.moveTo(hx+3.8,hy+.6);c.lineTo(hx+4.8,hy+.6);c.lineTo(hx+4.3,hy+1.4);c.fill();blush(hx-.4,hy+1.8);
  c.strokeStyle='rgba(60,40,30,.7)';c.lineWidth=.35;[[-.6,.4],[.6,0]].forEach(q=>{c.beginPath();c.moveTo(hx+4,hy+1.2);c.lineTo(hx+8.4,hy+1.2+q[0]*3);c.stroke()});
  c.restore();return}
 if(k=='rabbit'){
  sh(7);const hop=n.mv?Math.abs(Math.sin(tt*9))*3.4:0;c.translate(0,-hop);const bc=col;
  el(-6.6,-5.6,2.8,2.8,'#fff',0,.8);leg(-3,0,3,shade(bc,-14));el(-.4,-6.2,6,4.4,bc);leg(3,0,3,bc);
  const hx=4.6,hy=-10.2;el(hx-1.4,hy-7.6,1.6,4.6,bc,-.12,.8);el(hx+2.4,hy-7.4,1.6,4.6,bc,.14,.8);el(hx-1.4,hy-7.4,.8,3.2,'#f4a8b4',-.12,0);el(hx+2.4,hy-7.2,.8,3.2,'#f4a8b4',.14,0);
  el(hx,hy,4,3.6,bc);eye(hx+1.4,hy-.6,1);c.fillStyle='#f48a98';c.beginPath();c.arc(hx+3.6,hy+.5,.7,0,7);c.fill();blush(hx-.6,hy+1.6);
  c.restore();return}
 if(k=='turtle'){
  sh(7);c.translate(0,n.mv&&f?-.4:0);const lg='#8ab04a';
  el(5.8,-2.6,1.8,1.6,lg,0,.7);el(-4.4,-1.8,1.8,1.4,lg,0,.7);el(3,-1.6,1.8,1.4,lg,0,.7);el(-6.6,-3.6,1.4,.9,lg,0,.6);
  c.beginPath();c.ellipse(-.6,-4.4,7,5,0,Math.PI,0);c.closePath();const g2=c.createRadialGradient(-2,-7,1,-.6,-4.4,7);g2.addColorStop(0,'#8fc060');g2.addColorStop(1,'#3a7a3a');fo(g2);
  c.strokeStyle='rgba(30,70,30,.7)';c.lineWidth=.55;c.beginPath();c.moveTo(-4,-4.4);c.lineTo(-3,-8.2);c.moveTo(1.8,-4.4);c.lineTo(.8,-8.8);c.moveTo(-6.4,-5.8);c.lineTo(6,-5.8);c.moveTo(-1.8,-8.8);c.lineTo(.8,-8.8);c.stroke();
  R2(c,-7.4,-4.6,13.6,1.6,'#d8c890');el(7.4,-5.2,2.6,2.3,lg);eye(8.4,-5.8,.8);blush(7.2,-4.4);
  c.restore();return}
 if(k=='parrot'){
  sh(5);const hop=n.mv?Math.abs(Math.sin(tt*10))*2:0;c.translate(0,-hop);const bc=col,wc=shade(col,-40);
  c.beginPath();c.moveTo(-1.5,-9);c.quadraticCurveTo(-5,-5,-4.8,3);c.lineTo(-1.6,2);c.closePath();fo('#2f80ed',.8);c.beginPath();c.moveTo(-2.6,-8);c.quadraticCurveTo(-8,-2,-7,5);c.lineTo(-3.8,1);c.closePath();fo('#f2c230',.8);
  c.strokeStyle='#e8a030';c.lineWidth=.9;c.beginPath();c.moveTo(-1,-3.6);c.lineTo(-1,-1.2);c.moveTo(1.8,-3.6);c.lineTo(1.8,-1.2);c.stroke();
  el(.4,-9,4.4,6,bc);el(-1,-8.6,2.6,4,wc,.1,.7);el(1.8,-6.8,2.4,3.4,shade(bc,26),0,0);
  el(2,-16,3.8,3.6,bc);c.beginPath();c.moveTo(4.8,-16.6);c.quadraticCurveTo(8.4,-16.2,7,-13);c.quadraticCurveTo(6,-14.4,4.8,-14.4);c.closePath();fo('#f4eed0',.7);
  c.fillStyle='#fff';c.beginPath();c.arc(2.6,-16.6,1.4,0,7);c.fill();eye(2.8,-16.6,.8);c.beginPath();c.moveTo(.4,-18.8);c.quadraticCurveTo(-1,-21,-2.4,-19);c.quadraticCurveTo(-.4,-19.6,.4,-18.8);c.fillStyle='#e0443a';c.fill();
  c.restore();return}
 if(k=='callduck'){
  sh(6);const wob=n.mv?Math.sin(tt*12)*.9:0;c.translate(0,bob);c.rotate(wob*.04);
  c.strokeStyle='#f0902a';c.lineWidth=1;c.beginPath();c.moveTo(-1.6,-2.6);c.lineTo(-1.8,0);c.moveTo(2,-2.6);c.lineTo(2.2,0);c.stroke();el(-2,0,1.6,.7,'#f0902a',0,.5);el(2.6,0,1.6,.7,'#f0902a',0,.5);
  el(0,-6,6,5,'#fffdf4');el(-1.4,-5.8,3,2.4,'#f0ecda',.3,.7);el(4.2,-11,4.2,4,'#fffdf4');el(7.8,-10.2,2.2,1.4,'#f4a030',0,.7);c.fillStyle='#fff';eye(4.8,-11.8,.95);blush(3.2,-9.6);
  c.beginPath();c.moveTo(-5.6,-7);c.lineTo(-8,-8.4);c.lineTo(-5.6,-5.4);c.closePath();fo('#fffdf4',.7);
  c.restore();return}
 if(k=='hamster'){
  sh(5);const hop=n.mv?Math.abs(Math.sin(tt*12))*1.6:0;c.translate(0,-hop);el(0,-4,5,3.8,'#f0c88a');el(0,-2.6,3.4,2.2,'#fff4dc',0,0);
  el(-2.4,-8,1.3,1.3,'#e8b078',0,.7);el(3,-8,1.3,1.3,'#e8b078',0,.7);el(.4,-6.4,4,3.4,'#f0c88a');el(1.6,-4.8,2.6,1.8,'#fff4dc',0,.5);eye(2.2,-6.8,.8);eye(-.8,-6.8,.8);c.fillStyle='#f48a98';c.beginPath();c.arc(.6,-5.4,.5,0,7);c.fill();
  c.restore();return}
 if(k=='chicken'||k=='duck'){
  sh(7);const du=k=='duck',bc=du?'#f8f2c8':col;c.translate(0,bob+(n.peck?1:0));
  c.strokeStyle='#f0902a';c.lineWidth=1;c.beginPath();c.moveTo(-1.4,-3);c.lineTo(-1.4,0);c.moveTo(2,-3);c.lineTo(2,0);c.stroke();
  c.beginPath();c.moveTo(-5,-8);c.quadraticCurveTo(-9,-10+wag,-8,-13);c.quadraticCurveTo(-6,-10,-4,-9);c.closePath();fo(shade(bc,-20),.8);
  el(0,-6.4,6.2,4.8,bc);el(-1,-6,3,2.6,shade(bc,-14),.2,.6);
  const hx=5,hy=-11.6+(n.peck?3:0);el(hx,hy,3.4,3.4,du?'#3a9a5a':bc);
  if(du){el(hx+3.8,hy+.8,2.4,1.3,'#f4a030',0,.7)}else{c.beginPath();c.moveTo(hx+3,hy+.2);c.lineTo(hx+6,hy+1);c.lineTo(hx+3,hy+2);c.closePath();fo('#f4a030',.7);el(hx-.4,hy-3.6,1.2,1.4,'#e0443a',0,.6);el(hx+1.2,hy-3.2,1.1,1.2,'#e0443a',0,.6);el(hx+1.4,hy+2.6,.9,1.2,'#e0443a',0,.5)}
  eye(hx+1.2,hy-.5,.8);blush(hx-.6,hy+1.2);c.restore();return}
 if(k=='sheep'){
  sh(9);c.translate(0,bob);const wl='#f6f4ee';
  leg(-4,f?1.2:0,2.4,'#4a4048');leg(3.4,f?0:1.2,2.4,'#4a4048');
  [[-5.4,-7.4,4.4],[-1.4,-9.4,4.8],[3.4,-8.2,4.4],[0,-6,4.8],[-4,-5,3.8],[4,-5,3.8]].forEach(q=>{c.beginPath();c.arc(q[0],q[1],q[2],0,7);fo(wl,.7)});
  leg(-1.6,f?0:1.2,2.4,'#4a4048');leg(5.6,f?1.2:0,2.4,'#4a4048');
  const hx=8,hy=-8;el(hx-2.8,hy-3,1.8,1,'#4a4048',-.5,.6);el(hx-.4,hy-4.4,3,2.4,wl,0,.6);el(hx+.4,hy,3.6,3.6,'#4a4048');eye(hx+1.6,hy-.4,.8);c.fillStyle='#fff';c.fillRect(hx+1.8,hy-1,.5,.5);blush(hx-.4,hy+1.6);
  c.restore();return}
 // 預設
 sh(7);el(0,-6,6,4,col);el(5,-9,3.6,3.2,col);eye(6.4,-9.4,.8);c.restore()}
function R2(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
