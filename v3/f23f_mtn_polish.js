/* v5.2 山區溫泉鄉美術強化：竹林、河岸木柵、足湯、水車、溫泉街燈籠串、錦鯉、鴨子、蝴蝶／螢火蟲、山嵐 */
(function(){const R0=IN['溫泉鄉'];if(!R0)return;const pre0=R0.pre,an0=R0.animf;
 R0.pre=(x,W,H)=>{pre0&&pre0(x,W,H);const r=orn(777123);
  // 草地紋理：深色草叢、泥土小塊
  for(let i=0;i<420;i++){const px=r()*W,py=250+r()*(H-260);if(px>320&&px<382)continue;for(let k=0;k<3;k++)R(x,px+k*1.6,py-k%2,1,3+k%2,['#5e9a46','#6aa850','#4f8a3c'][k])}
  // 竹林（湯之里與茶行之間、西北角）
  const bamboo=(bx,by,w,h,n)=>{for(let i=0;i<n;i++){const sx=bx+r()*w,sy=by+r()*8,hh=h-r()*12;R(x,sx,sy-hh,2.2,hh,['#6aa84a','#5a9a3e','#7ab85a'][i%3]);for(let j=6;j<hh;j+=7)R(x,sx-.3,sy-hh+j,2.8,.8,'#4a7a32');
    for(let k=0;k<3;k++){x.fillStyle=['#4f9a3a','#6ab84a'][k%2];x.beginPath();x.ellipse(sx+(k-1)*4,sy-hh+k*5,5,1.6,(k-1)*.6,0,7);x.fill()}}};
  bamboo(462,250,96,60,26);bamboo(4,250,26,70,10);bamboo(1070,250,26,70,10);
  // 河岸木柵
  const fence=(fx,y0,y1)=>{for(let y=y0;y<y1;y+=12){R(x,fx,y,3,9,'#8a5a30');R(x,fx,y,3,1,'#b07a45')}R(x,fx-1,y0+2,5,1.6,'#7a4a24');R(x,fx-1,y0+2,1.2,y1-y0,'#7a4a24');for(let y=y0+2;y<y1;y+=24)R(x,fx-1,y,5,1.4,'#a06a3a')};
  fence(320,404,592);fence(380,404,592);fence(320,656,720);fence(380,656,720);
  // 足湯（溫泉街西南草地）
  const fx=168,fy=432;R(x,fx-2,fy+38,108,4,'rgba(0,0,0,.2)');R(x,fx-4,fy-4,108,46,'#8a5a30');R(x,fx,fy,100,38,'#a8794a');R(x,fx+8,fy+8,84,22,'#7a7470');
  const fg=x.createLinearGradient(fx,fy+10,fx,fy+28);fg.addColorStop(0,'#bfe8f4');fg.addColorStop(1,'#7ac0d8');x.fillStyle=fg;x.fillRect(fx+10,fy+10,80,18);for(let i=0;i<6;i++)R(x,fx+14+i*12,fy+14+(i%2)*6,6,1,'rgba(255,255,255,.6)');
  R(x,fx+2,fy+32,96,6,'#6a4222');oSign(x,fx+30,fy-16,40,10,'免費足湯','#3a2410','#ffe9b0',6);R(x,fx+49,fy-6,2,6,'#3a2410');
  // 水車小屋
  R(x,388,452,40,36,'#7a4a24');R(x,386,446,44,8,'#5a3418');R(x,394,462,10,10,'#ffe8a8');R(x,412,468,10,20,'#4a2a14');
  // 溫泉街長椅
  [[300,398],[700,398],[930,398]].forEach(q=>{R(x,q[0],q[1]+5,26,2,'rgba(0,0,0,.2)');R(x,q[0],q[1],26,4,'#a0683a');R(x,q[0]+2,q[1]+4,2,4,'#5a3418');R(x,q[0]+22,q[1]+4,2,4,'#5a3418')});
 };
 R0.animf=(g,t)=>{an0&&an0(g,t);const n=typeof nf=='function'?nf():0;
  // 山嵐飄移
  for(let i=0;i<4;i++){const cx=((t*6+i*300)%(OW+240))-120,cy=150+i*9;g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(cx,cy,110,9,0,0,7);g.fill()}
  // 足湯蒸氣
  for(let i=0;i<5;i++){const ph=(t*.3+i/5)%1;g.fillStyle=`rgba(255,255,255,${.4*(1-ph)})`;g.beginPath();g.ellipse(186+i*16+Math.sin(t+i)*3,438-ph*22,4+ph*6,3+ph*3,0,0,7);g.fill()}
  // 水車
  g.save();g.translate(380,476);g.rotate(t*.9);g.strokeStyle='#6a3a1a';g.lineWidth=2;g.beginPath();g.arc(0,0,16,0,7);g.stroke();for(let i=0;i<8;i++){g.rotate(Math.PI/4);g.fillStyle='#8a5a30';g.fillRect(-1,-17,2,17);g.fillRect(-4,-19,8,4)}g.fillStyle='#4a2a14';g.beginPath();g.arc(0,0,3,0,7);g.fill();g.restore();
  for(let i=0;i<4;i++){g.fillStyle='rgba(255,255,255,.7)';g.fillRect(366+((t*30+i*7)%14),490+i*2,2,1)}
  // 錦鯉
  for(let i=0;i<3;i++){const a=t*.5+i*2.1,kx=505+Math.cos(a)*36,ky=297+Math.sin(a)*12;g.fillStyle=['#ff7a30','#fff','#ffd040'][i];g.beginPath();g.ellipse(kx,ky,3.4,1.6,a+Math.PI/2,0,7);g.fill();g.fillStyle='#d94a20';g.fillRect(kx-1,ky-.6,1.4,1.2)}
  // 河上鴨子
  for(let i=0;i<2;i++){const dy=420+((t*8+i*90)%170),dx=346+i*10+Math.sin(t+i)*2;g.fillStyle='#f4f4ee';g.beginPath();g.ellipse(dx,dy,3.4,2.2,0,0,7);g.fill();g.fillStyle='#2a7a4a';g.beginPath();g.arc(dx,dy-2.6,1.6,0,7);g.fill();g.fillStyle='#f0a020';g.fillRect(dx-.6,dy-1.2,1.2,1.4);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(dx-4,dy+2,8,.8)}
  // 溫泉街燈籠串（人物上方）
  const posts=[156,418,596,746,978,1052];for(let k=0;k<posts.length-1;k++){const a=posts[k],b=posts[k+1];if(b-a>260)continue;g.strokeStyle='rgba(60,30,10,.8)';g.lineWidth=.8;g.beginPath();g.moveTo(a,330);g.quadraticCurveTo((a+b)/2,346,b,330);g.stroke();
   for(let i=1;i<6;i++){const u=i/6,lx=a+(b-a)*u,ly=330+16*2*u*(1-u)*1+Math.sin(t*2+i+k)*.6;g.fillStyle='#3a2410';g.fillRect(lx-.4,ly,.8,2);g.fillStyle=n>.05?'#ff7a4a':'#e0402a';g.beginPath();g.ellipse(lx,ly+4.4,2.4,3,0,0,7);g.fill();g.fillStyle='#3a2410';g.fillRect(lx-1.6,ly+1.4,3.2,.8);g.fillRect(lx-1.6,ly+7,3.2,.8)}}
  // 白天蝴蝶／夜晚螢火蟲
  if(n<.3)for(let i=0;i<5;i++){const bx=150+i*190+Math.sin(t*.7+i)*30,by=470+Math.cos(t*.5+i*2)*40+(i%2)*80,w=Math.abs(Math.sin(t*12+i))*2.4;g.fillStyle=['#fff','#ffd84a','#f0a8c0'][i%3];g.fillRect(bx-w,by,w,2);g.fillRect(bx+.8,by,w,2);g.fillStyle='#3a2a1a';g.fillRect(bx,by,.8,2.4)}
  else{g.save();g.globalCompositeOperation='lighter';for(let i=0;i<22;i++){const fx=300+((i*53)%120)+Math.sin(t*.8+i)*14,fy=420+((i*37)%280)+Math.cos(t*.6+i*1.7)*10,a=(Math.sin(t*3+i*2)+1)/2;g.fillStyle=`rgba(200,255,120,${.8*a*n})`;g.fillRect(fx,fy,1.6,1.6)}g.restore()}};
})();
