/* v13.41 地圖右下「柳岸釣魚池」：池塘、木棧橋、東岸釣台、小船、柳樹、涼亭、環湖步道
   ＋ 造景「📍 互動」可以新增 🎣 釣魚點（淡水／海水）、🚣 划船點 */
const LK={cx:2310,cy:985,rx:225,ry:100};
const lkR=a=>1+.06*Math.sin(a*3+.7)+.035*Math.sin(a*5+2.1);
function lkPath(c,k,dx=0,dy=0){c.beginPath();for(let i=0;i<=72;i++){const a=i/72*6.2832,r=lkR(a)*k;const x=LK.cx+Math.cos(a)*LK.rx*r+dx,y=LK.cy+Math.sin(a)*LK.ry*r+dy;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath()}
const lkIn=(x,y,k=1)=>{const dx=(x-LK.cx)/LK.rx,dy=(y-LK.cy)/LK.ry,a=Math.atan2(dy,dx);return Math.hypot(dx,dy)<lkR(a)*k};
const PIER={x:2352,w:28,y0:1004,y1:LK.cy+LK.ry*1.14},PIERH={x:2340,y:990,w:52,h:22},EDECK={x:2512,y:958,w:46,h:40},PAV={cx:2148,by:880,w:76,h:46};
const BOATP={x:2296,y:1052};
function lkGround(){const c=lkC(),rnd=(a,b)=>a+Math.random()*(b-a);c.save();
 // 草地上的深色草叢感
 c.fillStyle='rgba(60,110,40,.18)';lkPath(c,1.5);c.fill();
 // ── 環湖步道（石板）──
 c.beginPath();for(let i=0;i<=72;i++){const a=i/72*6.2832,r=lkR(a)*1.26;const x=LK.cx+Math.cos(a)*LK.rx*r,y=LK.cy+Math.sin(a)*LK.ry*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath();
 for(let i=72;i>=0;i--){const a=i/72*6.2832,r=lkR(a)*1.13;const x=LK.cx+Math.cos(a)*LK.rx*r,y=LK.cy+Math.sin(a)*LK.ry*r;i==72?c.moveTo(x,y):c.lineTo(x,y)}c.closePath();c.fillStyle='#cbbd9f';c.fill('evenodd');
 const ring=(x,y)=>lkIn(x,y,1.255)&&!lkIn(x,y,1.135);
 for(let i=0;i<2600;i++){const x=rnd(LK.cx-LK.rx*1.4,LK.cx+LK.rx*1.4),y=rnd(LK.cy-LK.ry*1.45,LK.cy+LK.ry*1.45);if(!ring(x,y))continue;c.fillStyle=['#d8cbb0','#bfae8c','#c6b796','#b3a283'][i%4];c.fillRect(Math.round(x),Math.round(y),rnd(3,6),rnd(2,4))}
 // 北邊入口步道（接大馬路人行道）＋ 西邊通往涼亭
 const walk=(x,y,w,h)=>{c.fillStyle='#cbbd9f';c.fillRect(x,y,w,h);for(let i=0;i<w*h/14;i++){c.fillStyle=['#d8cbb0','#bfae8c','#c6b796','#b3a283'][i%4];c.fillRect(x+rnd(0,w-4),y+rnd(0,h-3),rnd(3,6),rnd(2,4))}c.fillStyle='rgba(90,70,40,.25)';c.fillRect(x-1,y,1,h);c.fillRect(x+w,y,1,h)};
 walk(2292,792,30,LK.cy-LK.ry*1.18-792);walk(PAV.cx-14,792,28,PAV.by-PAV.h-792+2);
 // 涼亭地基
 const px=PAV.cx-PAV.w/2-6,py=PAV.by-PAV.h;c.fillStyle='#9a8a74';c.fillRect(px,py,PAV.w+12,PAV.h+6);c.fillStyle='#d6cab4';c.fillRect(px+2,py+2,PAV.w+8,PAV.h+2);for(let x=px+2;x<px+PAV.w+10;x+=10)for(let y=py+2;y<py+PAV.h+4;y+=10){c.fillStyle=((x+y)/10)%2?'#cfc2aa':'#ddd2bd';c.fillRect(x,y,9,9)}
 c.fillStyle='#8a7a64';c.fillRect(px+PAV.w/2-2,PAV.by+6,16,4);
 // ── 岸邊（濕泥＋石頭）──
 lkPath(c,1.07);c.fillStyle='#8a7a5a';c.fill();lkPath(c,1.03);c.fillStyle='#6f6248';c.fill();
 // ── 水 ──
 c.save();lkPath(c,1);c.clip();const gr=c.createRadialGradient(LK.cx,LK.cy-10,10,LK.cx,LK.cy,LK.rx);gr.addColorStop(0,'#2f7f9e');gr.addColorStop(.7,'#3f97b2');gr.addColorStop(1,'#73bcc6');c.fillStyle=gr;c.fillRect(LK.cx-LK.rx*1.2,LK.cy-LK.ry*1.2,LK.rx*2.4,LK.ry*2.4);
 lkPath(c,.97,0,3);c.strokeStyle='rgba(40,60,50,.35)';c.lineWidth=4;c.stroke();
 // 倒影：柳樹的影子
 [[2082,960],[2508,905],[2560,1040],[2140,1068]].forEach(q=>{c.fillStyle='rgba(30,70,50,.25)';c.beginPath();c.ellipse(q[0]+10,q[1]+30,40,18,0,0,7);c.fill()});
 c.restore();
 // 岸邊石頭
 for(let i=0;i<70;i++){const a=rnd(0,6.28),r=lkR(a)*rnd(.99,1.08),x=LK.cx+Math.cos(a)*LK.rx*r,y=LK.cy+Math.sin(a)*LK.ry*r;if(x>PIER.x-8&&x<PIER.x+PIER.w+8&&y>LK.cy)continue;const w=rnd(4,9);c.fillStyle='#7d7a72';c.beginPath();c.ellipse(x,y,w,w*.6,0,0,7);c.fill();c.fillStyle='#a3a097';c.beginPath();c.ellipse(x-1,y-1.2,w*.6,w*.3,0,0,7);c.fill()}
 // 蘆葦
 [[2110,1060],[2125,1072],[2505,1045],[2520,1035],[2180,900],[2440,893]].forEach(q=>{for(let i=0;i<7;i++){const x=q[0]+rnd(-8,8),h=rnd(10,18);c.strokeStyle=i%2?'#6a8a3a':'#88a84a';c.lineWidth=1.3;c.beginPath();c.moveTo(x,q[1]);c.quadraticCurveTo(x+rnd(-3,3),q[1]-h*.6,x+rnd(-4,4),q[1]-h);c.stroke();if(i%3==0){c.fillStyle='#7a5a32';c.fillRect(x-1,q[1]-h-4,2.4,6)}}});
 // 荷葉、蓮花
 [[2170,950],[2190,965],[2160,975],[2430,1020],[2452,1030],[2420,1040],[2470,960]].forEach((q,i)=>{c.fillStyle='#4f9a4a';c.beginPath();c.arc(q[0],q[1],7,.35,6.0);c.lineTo(q[0],q[1]);c.fill();c.fillStyle='#6ab85a';c.beginPath();c.arc(q[0]-1,q[1]-1,4,.4,5.9);c.lineTo(q[0]-1,q[1]-1);c.fill();if(i%3==0){c.fillStyle='#ffb3c8';[[0,-3],[-3,0],[3,0],[0,2]].forEach(o=>{c.beginPath();c.ellipse(q[0]+o[0],q[1]+o[1]-3,2.4,3.2,0,0,7);c.fill()});c.fillStyle='#ffe066';c.fillRect(q[0]-1,q[1]-4,2,2)}});
 // ── 木棧橋（南岸往湖中）──
 const plank=(x,y,w,h,vert)=>{c.fillStyle='#6a4426';c.fillRect(x-1,y-1,w+2,h+2);for(let i=0;i<(vert?h:w);i+=5){c.fillStyle=(i/5)%2?'#b07e4a':'#c08c55';if(vert)c.fillRect(x,y+i,w,4);else c.fillRect(x+i,y,4,h);c.fillStyle='rgba(70,40,20,.35)';if(vert)c.fillRect(x,y+i+4,w,1);else c.fillRect(x+i+4,y,1,h)}};
 c.fillStyle='rgba(0,0,0,.25)';c.fillRect(PIER.x+3,PIER.y0+4,PIER.w,PIER.y1-PIER.y0);c.fillRect(PIERH.x+3,PIERH.y+4,PIERH.w,PIERH.h);
 plank(PIER.x,PIER.y0,PIER.w,PIER.y1-PIER.y0,true);plank(PIERH.x,PIERH.y,PIERH.w,PIERH.h,false);
 [[PIERH.x,PIERH.y+PIERH.h],[PIERH.x+PIERH.w-4,PIERH.y+PIERH.h],[PIER.x-2,1040],[PIER.x+PIER.w-2,1040],[PIER.x-2,1070],[PIER.x+PIER.w-2,1070]].forEach(q=>{c.fillStyle='#4a2e16';c.fillRect(q[0],q[1]-2,4,6)});
 // 東岸釣台
 c.fillStyle='rgba(0,0,0,.25)';c.fillRect(EDECK.x+3,EDECK.y+4,EDECK.w,EDECK.h);plank(EDECK.x,EDECK.y,EDECK.w,EDECK.h,false);
 // 小船的繫船柱
 c.fillStyle='#4a2e16';c.fillRect(PIER.x-6,1050,5,7);c.fillStyle='#8a6a3a';c.fillRect(PIER.x-6,1049,5,2);
 c.restore()}
// 湖先畫在一張小畫布上，再貼到地面（玩家刷過的地板也蓋不掉）
const LKB={x0:1900,y0:770,x1:2640,y1:1150};let LKCV=null,LKT=0;
function lkC(){const m=s.getTransform(),cv2=document.createElement('canvas');cv2.width=Math.ceil((LKB.x1-LKB.x0)*m.a);cv2.height=Math.ceil((LKB.y1-LKB.y0)*m.d);const c=cv2.getContext('2d');c.setTransform(m.a,0,0,m.d,-m.a*LKB.x0,-m.d*LKB.y0);LKCV={cv:cv2,m};return c}
function lkBlit(){if(!LKCV)return;const m=LKCV.m,x=S.getContext('2d');x.save();x.setTransform(1,0,0,1,0,0);x.drawImage(LKCV.cv,Math.round(m.a*LKB.x0+m.e),Math.round(m.d*LKB.y0+m.f));x.restore()}
const lkSoon=()=>{clearTimeout(LKT);LKT=setTimeout(lkBlit,30)};
{const _wl=worldLayout;worldLayout=function(){const r=_wl.apply(this,arguments);try{lkGround();lkBlit();lkSolids();lkSpots()}catch(e){console.error(e)}return r}}
{const _p=gzPaintCell;gzPaintCell=function(ci,t){const r=_p.apply(this,arguments);try{if(LKCV){const q=gzCellRect(ci),m=LKCV.m,X0=m.a*LKB.x0+m.e,Y0=m.d*LKB.y0+m.f;if(q[0]+q[2]>X0&&q[0]<X0+LKCV.cv.width&&q[1]+q[3]>Y0&&q[1]<Y0+LKCV.cv.height)lkSoon()}}catch(e){}return r}}
// ── 擋路：水不能走（棧橋、釣台除外）──
function lkSolids(){for(let y=Math.floor(LK.cy-LK.ry*1.1);y<LK.cy+LK.ry*1.1;y+=6){let x0=null;for(let x=LK.cx-LK.rx*1.15;x<=LK.cx+LK.rx*1.15+3;x+=3){const onW=lkIn(x,y+3,.97)&&!(x>PIER.x-2&&x<PIER.x+PIER.w+2&&y+6>PIER.y0)&&!(x>PIERH.x-2&&x<PIERH.x+PIERH.w+2&&y+6>PIERH.y&&y<PIERH.y+PIERH.h)&&!(x>EDECK.x-2&&x<EDECK.x+EDECK.w+2&&y+6>EDECK.y&&y<EDECK.y+EDECK.h);
  if(onW&&x0==null)x0=x;if(!onW&&x0!=null){solids.push({x:x0,y,w:x-x0,h:6,_lk:1});x0=null}}}
 // 涼亭柱子、柳樹樹幹
 const px=PAV.cx-PAV.w/2;[[px,PAV.by-6],[px+PAV.w-6,PAV.by-6]].forEach(q=>solids.push({x:q[0],y:q[1],w:6,h:6,_lk:1}));LKW.forEach(w=>solids.push({x:w.x-4,y:w.y-4,w:8,h:5,_lk:1}))}
// ════════ 會動的東西：水波、小船、柳樹、涼亭、跳魚 ════════
const LKW=[{x:2070,y:950,s:1},{x:2516,y:896,s:1.1},{x:2582,y:1030,s:.95},{x:2128,y:1084,s:1.05},{x:2244,y:868,s:.85}];
let LKF=[];
function lkWater(c,t){c.save();lkPath(c,.985);c.clip();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1;
 for(let i=0;i<18;i++){const bx=LK.cx-LK.rx+((i*67+t*8)%(LK.rx*2)),by=LK.cy-LK.ry+((i*41)%(LK.ry*2))+Math.sin(t+i)*2;c.globalAlpha=.25+.25*Math.sin(t*1.7+i);c.beginPath();c.moveTo(bx,by);c.lineTo(bx+10,by);c.stroke()}
 c.globalAlpha=1;if(Math.random()<.008)LKF.push({x:LK.cx+(Math.random()-.5)*LK.rx*1.3,y:LK.cy+(Math.random()-.5)*LK.ry*1.1,t:0});
 LKF=LKF.filter(f=>{f.t+=1/60;if(f.t>1.6)return false;if(!lkIn(f.x,f.y,.9))return false;const r=f.t*14;c.strokeStyle=`rgba(255,255,255,${.7*(1-f.t/1.6)})`;c.beginPath();c.ellipse(f.x,f.y,r,r*.45,0,0,7);c.stroke();if(f.t<.35){c.fillStyle='#d8c070';const h=Math.sin(f.t/.35*Math.PI)*8;c.beginPath();c.ellipse(f.x,f.y-h,3,1.4,f.t*6,0,7);c.fill()}return true});
 c.restore()}
function lkBoat(c,t){const x=BOATP.x+Math.sin(t*.6)*2,y=BOATP.y+Math.sin(t*1.3)*1;c.save();c.translate(x,y);c.rotate(Math.sin(t*.9)*.03);
 c.fillStyle='rgba(20,50,60,.3)';c.beginPath();c.ellipse(0,4,26,7,0,0,7);c.fill();
 c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=1;c.beginPath();c.ellipse(0,4,28+Math.sin(t*2)*2,8,0,0,7);c.stroke();
 c.fillStyle='#7a4a26';c.beginPath();c.moveTo(-26,-4);c.quadraticCurveTo(-24,6,-12,7);c.lineTo(14,7);c.quadraticCurveTo(26,5,28,-4);c.closePath();c.fill();
 c.fillStyle='#a8703c';c.beginPath();c.moveTo(-24,-5);c.lineTo(27,-5);c.lineTo(24,-1);c.lineTo(-21,-1);c.closePath();c.fill();
 c.fillStyle='#d65a3a';c.fillRect(-25,-6,52,2);c.fillStyle='#5a3418';c.fillRect(-8,-4,4,9);c.fillRect(8,-4,4,9);
 c.strokeStyle='#5a3418';c.lineWidth=2;c.beginPath();c.moveTo(-3,-3);c.lineTo(-20,10);c.moveTo(6,-3);c.lineTo(22,10);c.stroke();c.fillStyle='#8a5a2e';c.fillRect(-23,8,6,3);c.fillRect(19,8,6,3);
 c.restore();c.strokeStyle='#c8b08a';c.lineWidth=.8;c.beginPath();c.moveTo(PIER.x-4,1051);c.quadraticCurveTo((PIER.x+x)/2,1058,x+24,y-2);c.stroke()}
function lkWillow(c,w,t){const s=w.s,x=w.x,y=w.y;c.save();c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(x+4,y,22*s,6*s,0,0,7);c.fill();
 c.fillStyle='#5a4028';c.beginPath();c.moveTo(x-4*s,y);c.quadraticCurveTo(x-2,y-24*s,x-8*s,y-44*s);c.lineTo(x+2*s,y-46*s);c.quadraticCurveTo(x+5,y-22*s,x+4*s,y);c.fill();
 c.fillStyle='#4a7a3a';c.beginPath();c.ellipse(x,y-50*s,26*s,14*s,0,0,7);c.fill();c.fillStyle='#5a9a48';c.beginPath();c.ellipse(x-4,y-54*s,20*s,10*s,0,0,7);c.fill();
 for(let i=0;i<22;i++){const a=-1.3+i/21*2.6,bx=x+Math.sin(a)*24*s,by=y-50*s+Math.cos(a)*6*s,len=(26+((i*7)%11))*s,sw=Math.sin(t*1.2+i*.5+w.x)*3*s;
  c.strokeStyle=i%3?'#6aaa52':'#88c068';c.lineWidth=2.2*s;c.beginPath();c.moveTo(bx,by);c.quadraticCurveTo(bx+sw*.5,by+len*.5,bx+sw,by+len);c.stroke();
  c.fillStyle=i%2?'#7cba5e':'#9ad070';for(let k=6;k<len;k+=5){const kx=bx+sw*(k/len)*(k/len);c.fillRect(kx-1.4,by+k,2.8,2)}}
 c.restore()}
function lkPavilion(c,t){const x=PAV.cx,by=PAV.by,w=PAV.w,top=by-62,night=typeof nightMode=='function'&&nightMode();c.save();
 [[x-w/2,by],[x+w/2-6,by]].forEach(q=>{c.fillStyle='#8a2a1a';c.fillRect(q[0],top+16,6,by-top-16);c.fillStyle='#b8402a';c.fillRect(q[0]+1,top+16,2,by-top-16);c.fillStyle='#5a4a3a';c.fillRect(q[0]-1,by-3,8,3)});
 // 欄杆座椅
 c.fillStyle='#8a5a2e';c.fillRect(x-w/2+6,by-12,w-12,4);c.fillStyle='#6a4022';for(let i=x-w/2+8;i<x+w/2-8;i+=6)c.fillRect(i,by-8,2,8);
 // 屋頂（紅瓦飛簷）
 c.fillStyle='#2a1a10';c.beginPath();c.moveTo(x-w/2-16,top+18);c.quadraticCurveTo(x-w/2-4,top+14,x-w/2+4,top+8);c.lineTo(x+w/2-4,top+8);c.quadraticCurveTo(x+w/2+4,top+14,x+w/2+16,top+18);c.lineTo(x+w/2+10,top+22);c.lineTo(x-w/2-10,top+22);c.closePath();c.fill();
 c.fillStyle='#b23a2a';c.beginPath();c.moveTo(x-w/2-14,top+16);c.quadraticCurveTo(x-w/2,top+12,x-w/2+8,top+4);c.lineTo(x,top-10);c.lineTo(x+w/2-8,top+4);c.quadraticCurveTo(x+w/2,top+12,x+w/2+14,top+16);c.closePath();c.fill();
 c.strokeStyle='#7a2418';c.lineWidth=1;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(x+i*8,top-6+Math.abs(i)*1.6);c.lineTo(x+i*11,top+15);c.stroke()}
 c.fillStyle='#e8c050';c.beginPath();c.arc(x,top-11,3,0,7);c.fill();c.fillStyle='#2a6a3a';c.fillRect(x-w/2+8,top+18,w-16,4);
 c.fillStyle='#f6e6b8';c.fillRect(x-14,top+22,28,9);c.strokeStyle='#8a5a2e';c.strokeRect(x-14,top+22,28,9);c.fillStyle='#8a2a1a';c.font='bold 7px sans-serif';c.textAlign='center';c.fillText('觀柳亭',x,top+29);
 // 燈籠
 [[x-w/2+12],[x+w/2-12]].forEach(q=>{const lx=q[0],ly=top+26+Math.sin(t*1.5+lx)*1;c.strokeStyle='#3a2a1a';c.beginPath();c.moveTo(lx,top+22);c.lineTo(lx,ly);c.stroke();c.fillStyle='#e0402a';c.beginPath();c.ellipse(lx,ly+4,4,5,0,0,7);c.fill();c.fillStyle='#ffd84a';c.fillRect(lx-3,ly-1,6,1.2);c.fillRect(lx-3,ly+8,6,1.2);
  if(night){c.save();c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(lx,ly+4,0,lx,ly+4,26);g2.addColorStop(0,'rgba(255,140,60,.45)');g2.addColorStop(1,'rgba(255,100,40,0)');c.fillStyle=g2;c.beginPath();c.arc(lx,ly+4,26,0,7);c.fill();c.restore()}});
 c.restore()}
function lkSign(c){const x=2307,y=842;c.fillStyle='#5a3a1e';c.fillRect(x-22,y-4,3,18);c.fillRect(x+19,y-4,3,18);c.fillStyle='#8a5a2e';c.fillRect(x-28,y-20,56,18);c.fillStyle='#f2dfb0';c.fillRect(x-26,y-18,52,14);c.fillStyle='#2a6a8a';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText('🎣 柳岸釣魚池',x,y-7)}
{const _sd=safetyDraw;safetyDraw=function(a){_sd.apply(this,arguments);if(scene)return;try{if(CAM.x+W<1900||CAM.y+H<780)return;const t=NOW/1000;
 a.push({y:LK.cy-LK.ry,f:()=>lkWater(g,t)});a.push({y:BOATP.y+6,f:()=>lkBoat(g,t)});LKW.forEach(w=>a.push({y:w.y,f:()=>lkWillow(g,w,t)}));a.push({y:PAV.by,f:()=>lkPavilion(g,t)});a.push({y:856,f:()=>lkSign(g)})}catch(e){}}}

// ════════ 互動點 ════════
let FISHLOC=null;
{const od=openDlg;openDlg=function(t,d,...r){const L=FISHLOC;if(L&&/知本溪・河岸|東海岸・堤防/.test(t)&&!!L.sea==/東海岸/.test(t)&&Math.hypot(p.x-L.x,p.y-L.y)<90){t=L.t;d=L.d+String(d).replace(/^[^<]*/,'')}return od.call(this,t,d,...r)}}
function fishAt(place,desc,sea){FISHLOC={t:place,d:desc,sea:!!sea,x:p.x,y:p.y};fishSpot(sea)}
const lkFish=()=>fishAt('🎣 柳岸釣魚池','柳條輕輕垂到水面，偶爾有魚跳出來濺起水花。',false);
function lkPavMenu(){const yj=st.partner=='劉家宜'||(typeof FRS=='function'&&FRS('yijia').pt>=40);openDlg('⛩️ 觀柳亭','紅色的小涼亭，坐在這裡可以看整個湖面和柳樹。',[
 ['🪑 坐下來休息（30 分鐘）','⚡+12・😊+4',()=>{closeDlg();advance(.5);st.sta=Math.min(staMax(),st.sta+12);st.joy=(st.joy||0)+4;hud();toast('🍃 微風吹過柳樹，好舒服')}],
 ...(yj?[['💗 約家宜來亭子看湖（1 小時）','聊聊天、看看魚',()=>{closeDlg();advance(1);try{frAdd('yijia',2)}catch(e){}st.joy=(st.joy||0)+8;hud();toast('💗 家宜靠在你肩上：「這裡好安靜，下次帶便當來野餐！」')}]]:[]),
 ['離開','',closeDlg]])}
function lkBoatMenu(){openDlg('🚣 小木船','繫在棧橋邊的小木船，可以划到湖中間。',[
 ['🚣 划船繞湖一圈（1 小時・⚡-6）','😊+10',()=>{if(st.sta<6)return toast('⚡ 體力不夠');closeDlg();advance(1);st.sta-=6;st.joy=(st.joy||0)+10;hud();toast('🚣 划到湖中間，柳樹的倒影在水裡晃呀晃')},st.sta<6],
 ['🎣 在船上釣魚','湖中間的魚比較大隻',()=>{closeDlg();fishAt('🚣 小木船・湖中央','船輕輕地搖，四周只聽得到水聲。',false)}],['離開','',closeDlg]])}
function lkSpots(){SPOTS.push({x:PIERH.x+2,y:PIERH.y-6,w:PIERH.w-4,h:PIERH.h+6,n:'柳岸釣魚池・棧橋',fn:lkFish},{x:EDECK.x,y:EDECK.y-4,w:EDECK.w,h:EDECK.h+4,n:'柳岸釣魚池・東岸釣台',fn:lkFish},
 {x:PAV.cx-PAV.w/2,y:PAV.by-PAV.h,w:PAV.w,h:PAV.h+8,n:'觀柳亭',fn:lkPavMenu},{x:PIER.x-14,y:1040,w:14,h:26,n:'小木船',fn:lkBoatMenu})}

// ════════ 造景「📍 互動」：可以新增 🎣 釣魚點 ════════
const SPKIND={fresh:['🎣 釣魚點（淡水）','溪魚、湖魚'],sea:['🌊 釣魚點（海水）','海魚、龍蝦、黑鮪魚'],boat:['🚣 划船點','划船、船上釣魚'],rest:['🪑 休息點','坐下來恢復體力']};
{const _m=spMake;spMake=function(q){const s=_m.apply(this,arguments);const k=String(q[6]||'').match(/^@(fresh|sea|boat|rest)$/);if(k){s.kind=k[1];s.env=false;s.img=q[6];
  s.fn=()=>{const d=String(s.txt||'').trim();if(s.kind=='fresh'||s.kind=='sea')fishAt(s.n,d||(s.kind=='sea'?'海風迎面吹來，浪花打在岸邊。':'水面平靜，偶爾冒出一兩個泡泡。'),s.kind=='sea');else if(s.kind=='boat')lkBoatMenu();else{advance(.5);st.sta=Math.min(staMax(),st.sta+10);hud();toast('🪑 在'+s.n.replace(/^\W+/,'')+'休息了一下（⚡+10）')}}}return s}}
spNew=(f=>function(x,y,w,h){openDlg('📍 新增互動點','走到這個框框裡按空白鍵會觸發。要做成哪一種？',[
 ['📜 看板／留言','文字、照片、信封',()=>{closeDlg();f(x,y,w,h)}],
 ...Object.keys(SPKIND).map(k=>[SPKIND[k][0],SPKIND[k][1],()=>{closeDlg();spKindEdit(null,[x,y,w,h],k)}]),
 ['取消','',()=>{closeDlg();gzRefresh()}]])})(spNew);
function spKindEdit(s,rect,kind){kind=kind||s.kind;const isNew=!s,inp='width:100%;font:inherit;padding:6px;border:2px solid #8a5a2e;border-radius:6px;margin-top:6px';
 openDlg((isNew?'新增':'編輯')+' '+SPKIND[kind][0],`名稱會顯示在走過去時的提示上。<input id="skN" style="${inp}" placeholder="例如：🎣 林園河堤釣點"><textarea id="skD" rows="2" style="${inp}" placeholder="打開時的描述（可以不填）"></textarea>
  <div style="margin-top:8px;font-size:13px">種類：${Object.keys(SPKIND).map(k=>`<label style="margin-right:8px"><input type="radio" name="skK" value="${k}" ${k==kind?'checked':''}> ${SPKIND[k][0]}</label>`).join('')}</div>`,
  [[isNew?'✅ 新增':'✅ 儲存','',()=>{const n=(document.getElementById('skN').value||'').trim()||SPKIND[kind][0],d=document.getElementById('skD').value||'',k=(document.querySelector('input[name="skK"]:checked')||{}).value||kind;
   if(isNew){const ns=spMake([rect[0],rect[1],rect[2],rect[3],n,d,'@'+k,0]);SPOTS.push(ns);SPE.sig.set(ns,'');SPE.sel={o:ns,z:0};gzPush(()=>{arrDel(SPOTS,ns);SPE.sel=null});toast('📍 新增了「'+n+'」')}
   else{const old={n:s.n,txt:s.txt,img:s.img,kind:s.kind};const ns=spMake([s.x,s.y,s.w,s.h,n,d,'@'+k,0]);Object.assign(s,{n:ns.n,txt:ns.txt,img:ns.img,kind:ns.kind,fn:ns.fn,env:false});gzPush(()=>{Object.assign(s,old);Object.assign(s,{fn:spMake([s.x,s.y,s.w,s.h,s.n,s.txt,s.img,0]).fn})});toast('✏️ 改好了')}
   ED.dirty=1;closeDlg();gzRefresh()}],['取消','',()=>{closeDlg();gzRefresh()}]]);
 setTimeout(()=>{const a=document.getElementById('skN'),b=document.getElementById('skD');if(!a)return;[a,b].forEach(el=>el.addEventListener('keydown',e=>e.stopPropagation()));a.value=s?s.n:SPKIND[kind][0];b.value=s?s.txt||'':'';a.focus();a.select()},40)}
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-sp="edit"]');if(!b||!SPE.sel||!SPE.sel.o.kind)return;ev.stopImmediatePropagation();ev.preventDefault();spKindEdit(SPE.sel.o)},true);
gzSelUI=(f=>function(){f.apply(this,arguments);try{if(ED.tool=='spot'&&SPE.sel&&SPE.sel.o.kind){const e=$e('gzSel').querySelector('[data-sp="edit"]');if(e)e.textContent='✏️ 編輯（名稱、種類）'}}catch(er){}})(gzSelUI);
// 編輯模式裡把釣魚點標出來
gzFrame=(f=>function(now){f(now);if(!ED.on||ED.room||ED.tool!='spot')return;try{const z=ED.z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);
 SPOTS.forEach(s=>{const ic=s.kind?SPKIND[s.kind][0].slice(0,2):/釣/.test(s.n||'')?'🎣':null;if(!ic)return;g.fillStyle='rgba(40,140,220,.25)';g.fillRect(s.x,s.y,s.w,s.h);g.font=`${12/z}px sans-serif`;g.textAlign='center';g.fillText(ic,s.x+s.w/2,s.y+s.h/2+4/z)});g.restore()}catch(e){}})(gzFrame);
