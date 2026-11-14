/* ===== v3：東南花園廣場（草皮裝飾區）===== */
{const gx=GARDEN.x,gy=GARDEN.y,gw=GARDEN.w,gh=GARDEN.h;
 const L=(()=>{let q=7;return()=>(q=q*48271%2147483647)/2147483647})();
 const pal=[['#ff6a8a','#ffd0dc'],['#ffd84a','#fff3a0'],['#ffffff','#ffe8f4'],['#b07af0','#e0ccff'],['#ff9a3a','#ffd8a8'],['#5ac8e8','#d0f0ff']];
 // 草皮色塊與修剪紋
 for(let i=0;i<26;i++){const x=gx+L()*gw,y=gy+L()*gh,r=24+L()*46;const g2=s.createRadialGradient(x,y,2,x,y,r);g2.addColorStop(0,'rgba(190,235,130,.35)');g2.addColorStop(1,'rgba(190,235,130,0)');s.fillStyle=g2;s.beginPath();s.arc(x,y,r,0,7);s.fill()}
 LTX(s,'lt_3',gx,gy,gw,gh,32);for(let y=gy+6;y<gy+gh-4;y+=14){s.fillStyle='rgba(60,130,50,.06)';s.fillRect(gx,y,gw,7)}
 // 石板路
 const P0='#d9cfb4',P1='#a89a78';
 const path=(x,y,w,h)=>{R(s,x-2,y-2,w+4,h+4,P1);if(LTX(s,'lt_10',x,y,w,h,24))return;R(s,x,y,w,h,P0);for(let yy=y;yy<y+h;yy+=8)for(let xx=x+((yy/8|0)%2)*6;xx<x+w;xx+=12){R(s,xx,yy,.7,8,'rgba(0,0,0,.08)')}for(let yy=y;yy<y+h;yy+=8)R(s,x,yy,w,.7,'rgba(0,0,0,.07)')};
 const PX=2090,PY=1018;
 path(PX-18,gy-12,36,PY-gy+12);            // 主步道
 path(gx+12,PY-14,gw-30,28);               // 橫向步道
 path(PX-14,PY,28,gy+gh-PY-4);            // 向南
 path(gx+470,gy-12,28,100);               // 東側支線（連到池塘邊）
 // 圓形廣場
 s.fillStyle=P1;s.beginPath();s.ellipse(PX,PY,66,56,0,0,7);s.fill();s.fillStyle=P0;s.beginPath();s.ellipse(PX,PY,63,53,0,0,7);s.fill();if(ltOK('lt_33')){s.save();s.beginPath();s.ellipse(PX,PY,63,53,0,0,7);s.clip();s.drawImage(UAI.lt_33,PX-64,PY-54,128,108);s.restore()}else 
 for(let r=14;r<62;r+=12){s.strokeStyle='rgba(120,100,70,.28)';s.lineWidth=.7;s.beginPath();s.ellipse(PX,PY,r,r*.85,0,0,7);s.stroke()}
 if(!ltOK('lt_33'))for(let a=0;a<12;a++){s.strokeStyle='rgba(120,100,70,.2)';s.beginPath();s.moveTo(PX,PY);s.lineTo(PX+Math.cos(a*.5236)*63,PY+Math.sin(a*.5236)*53);s.stroke()}
 // 樹籬
 const hedge=(x,y,w,h)=>{s.fillStyle='rgba(0,0,0,.18)';RR(s,x+1,y+2,w,h,4);s.fill();GR(s,x,y,w,h,'#4a9a4a','#2f7a38');s.fillStyle='rgba(255,255,255,.1)';for(let i=0;i<w*h/30;i++)s.fillRect(x+L()*w,y+L()*h,1.4,1.4)};
 // 花圃
 const bed=(x,y,w,h,pi)=>{s.fillStyle='rgba(0,0,0,.2)';RR(s,x-1,y+1,w+4,h+3,5);s.fill();s.fillStyle='#8a6a48';RR(s,x-2,y-2,w+4,h+4,5);s.fill();s.fillStyle='#5a3e26';RR(s,x,y,w,h,4);s.fill();
  const n=Math.round(w*h/9);for(let i=0;i<n;i++){const fx=x+3+L()*(w-6),fy=y+3+L()*(h-6),pc=pal[(pi+(L()*3|0))%pal.length];s.fillStyle='#3a8a3a';s.fillRect(fx-.4,fy,.9,2.4);s.fillStyle=pc[0];s.beginPath();s.arc(fx,fy,1.7,0,7);s.fill();s.fillStyle=pc[1];s.beginPath();s.arc(fx-.4,fy-.4,.7,0,7);s.fill()}};
 // 圍著廣場的花圃
 [[PX-130,PY-70,56,34,0],[PX+74,PY-70,56,34,1],[PX-130,PY+40,56,34,2],[PX+74,PY+40,56,34,3],[PX-34,PY-100,68,22,4],[PX-34,PY+78,68,22,5]].forEach(q=>bed(q[0],q[1],q[2],q[3],q[4]));
 // 沿步道的長條花帶
 [[gx+14,gy+22,86,20,1],[gx+14,gy+50,86,20,3],[gx+14,gy+190,100,22,0],[gx+14,gy+222,100,22,2],[gx+160,gy+24,100,20,4],[gx+160,gy+52,100,20,5],[gx+330,gy+190,120,22,2],[gx+330,gy+222,120,22,1],[gx+450,gy+150,86,24,4],[gx+450,gy+184,86,24,0],[gx+160,gy+260,140,24,3]].forEach(q=>bed(q[0],q[1],q[2],q[3],q[4]));
 hedge(gx+12,gy+2,86,10);hedge(gx+160,gy+2,100,10);hedge(gx+12,gy+270,128,12);hedge(gx+330,gy+280,200,12);
 // 池塘
 const PW={x:2240,y:884,rx:92,ry:44};
 {const {x,y,rx,ry}=PW;s.fillStyle='rgba(0,0,0,.2)';s.beginPath();s.ellipse(x+2,y+4,rx+8,ry+8,0,0,7);s.fill();s.fillStyle='#b9b2a0';s.beginPath();s.ellipse(x,y,rx+7,ry+7,0,0,7);s.fill();for(let a=0;a<40;a++){const t=a/40*6.283;s.fillStyle=a%2?'#9a937f':'#cfc8b4';s.beginPath();s.ellipse(x+Math.cos(t)*(rx+3),y+Math.sin(t)*(ry+3),5,3.4,t,0,7);s.fill()}
  const wg=s.createRadialGradient(x-20,y-14,4,x,y,rx);wg.addColorStop(0,'#8fe2f4');wg.addColorStop(.6,'#3aaed8');wg.addColorStop(1,'#1f7ab0');s.fillStyle=wg;s.beginPath();s.ellipse(x,y,rx,ry,0,0,7);s.fill();
  s.strokeStyle='rgba(255,255,255,.45)';s.lineWidth=.8;for(let i=0;i<8;i++){s.beginPath();s.ellipse(x-40+i*12,y-10+(i%3)*10,10,2.4,0,0,7);s.stroke()}
  for(let i=0;i<9;i++){const lx=x-70+L()*140,ly=y-26+L()*52;if(((lx-x)/rx)**2+((ly-y)/ry)**2>.75)continue;s.fillStyle='#3a9a48';s.beginPath();s.arc(lx,ly,5,.4,6.1);s.lineTo(lx,ly);s.fill();if(i%2){s.fillStyle='#ffb6d0';s.beginPath();s.arc(lx+1,ly-1,2,0,7);s.fill();s.fillStyle='#fff';s.beginPath();s.arc(lx+1,ly-1,.8,0,7);s.fill()}}
  // 木棧橋
  R(s,x-8,y+ry-6,16,24,'#8a5a2e');for(let i=0;i<6;i++)R(s,x-8,y+ry-4+i*4,16,.8,'#5a3a1a');R(s,x-8,y+ry-6,1.6,24,'#6a4220');R(s,x+6.4,y+ry-6,1.6,24,'#6a4220');
  const ww=[];for(let yy=-ry;yy<=ry;yy+=10){const w2=Math.sqrt(Math.max(0,1-(yy/ry)**2))*(rx+4);ww.push([x-w2,y+yy,w2*2,10])}ww.forEach(q=>sol(q[0],q[1],q[2],q[3]));
  // 蘆葦與岸邊小花
  for(let i=0;i<14;i++){const t=(i/14)*6.283+.3,bx2=x+Math.cos(t)*(rx+10),by2=y+Math.sin(t)*(ry+10);if(Math.sin(t)>.7&&Math.abs(Math.cos(t))<.15)continue;s.strokeStyle='#5a9a3a';s.lineWidth=.9;for(let k=0;k<3;k++){s.beginPath();s.moveTo(bx2+k*2,by2);s.quadraticCurveTo(bx2+k*2+1,by2-8,bx2+k*2+3,by2-13-k);s.stroke()}s.fillStyle='#8a5a2e';s.fillRect(bx2+3,by2-14,1.6,5)}}
 // 噴水（動態排序精靈）
 const fn=mkSpr(76,64,c=>{c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(38,52,36,10,0,0,7);c.fill();
  c.fillStyle='#b9b2a0';c.beginPath();c.ellipse(38,46,34,12,0,0,7);c.fill();c.fillStyle='#d8d2c0';c.beginPath();c.ellipse(38,43,34,12,0,0,7);c.fill();
  const wg=c.createLinearGradient(0,34,0,50);wg.addColorStop(0,'#7edcf0');wg.addColorStop(1,'#2a9ad0');c.fillStyle=wg;c.beginPath();c.ellipse(38,43,29,9.4,0,0,7);c.fill();
  R(c,35,20,6,24,'#c8c2b0');c.fillStyle='#d8d2c0';c.beginPath();c.ellipse(38,26,13,4.4,0,0,7);c.fill();c.fillStyle='#7edcf0';c.beginPath();c.ellipse(38,25,10.5,3.2,0,0,7);c.fill();
  R(c,36.4,6,3.2,18,'#c8c2b0');c.fillStyle='#e8e2d0';c.beginPath();c.ellipse(38,8,5,2,0,0,7);c.fill();
  c.strokeStyle='rgba(220,248,255,.85)';c.lineWidth=1;for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(38,7);c.quadraticCurveTo(38+k*7,-2,38+k*11,24);c.stroke()}
  c.fillStyle='rgba(255,255,255,.8)';for(let k=0;k<10;k++)c.fillRect(24+k*3.2,40+(k%3),1.4,1)});
 place(fn,PX-38,PY-48,76,64,[PX-30,PY-14,60,22]);
 // 涼亭
 const AX=gx+130,AY=gy+90,pergola=mkSpr(98,80,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(49,70,46,8,0,0,7);c.fill();
  [[8,26],[84,26],[8,62],[84,62]].forEach(q=>{R(c,q[0]-2,q[1]-22,5,44,'#f4efe4');R(c,q[0]-2,q[1]-22,1.4,44,'#fff')});
  c.fillStyle='#8a5a2e';RR(c,0,2,98,8,2);c.fill();for(let i=0;i<10;i++)R(c,4+i*9.4,0,3,14,'#a8723a');
  for(let i=0;i<22;i++){c.fillStyle=['#3a9a48','#4aaa56','#2f8a40'][i%3];c.beginPath();c.arc(4+L()*90,6+L()*8,3+L()*2,0,7);c.fill()}
  for(let i=0;i<12;i++){const pc=pal[i%6];c.fillStyle=pc[0];c.beginPath();c.arc(8+L()*84,8+L()*8,1.5,0,7);c.fill()}
  R(c,14,52,70,3,'#a07038');R(c,14,55,3,8,'#444');R(c,81,55,3,8,'#444');R(c,14,46,70,2.4,'#b8844a')});
 place(pergola,AX,AY,98,80,[AX+4,AY+50,6,8]);sol(AX+88,AY+50,6,8);
 // 長椅、路燈、樹
 [[gx+104,gy+190],[gx+300,gy+150],[PX-86,PY+78],[PX+50,PY+78],[gx+30,gy+150],[2330,gy+90],[2310,PY-30]].forEach(q=>benchAt(q[0],q[1]));
 [[PX-26,gy+4],[PX+12,gy+4],[PX-70,PY-60],[PX+60,PY-60],[PX-70,PY+60],[PX+60,PY+60],[gx+110,PY-20],[gx+440,PY-20],[2320,gy+130],[gx+70,gy+150]].forEach(q=>lampAt(q[0],q[1]));
 [[gx+60,gy+120],[gx+260,gy+110],[gx+296,gy+200],[2160,gy+180],[2360,gy+10],[2370,gy+160],[2370,gy+270],[gx+36,gy+300],[gx+200,gy+310],[gx+300,gy+300],[2250,gy+300],[2350,gy+300],[gx+420,gy+120],[gx+250,gy+250]].forEach((q,i)=>tr(q[0],q[1],[-1,0,2,3,6,-1][i%6]));
 // 北側草皮：一排樹與花叢（H1 北側人行道外）
 for(let x=1180;x<2400;x+=88){tr(x+((x*7)%24),44+((x*3)%10),-1)}
 // 公園告示牌與入口拱門
 R(s,PX-26,gy-20,52,12,'#6a4a2a');R(s,PX-24,gy-19,48,10,'#8a6a42');txt(s,'花園廣場',PX,gy-11,'#fff3d6','bold 7px sans-serif');R(s,PX-24,gy-8,2,10,'#6a4a2a');R(s,PX+22,gy-8,2,10,'#6a4a2a');
}
