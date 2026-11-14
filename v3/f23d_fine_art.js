/* v5.2 外觀：碳佐麻里、小石頭的家、家宜的家 */
STY.fine=b=>{const{x,y,w,h}=b;wallBody(b,'#2a3550','tile');
 R(s,x-2,y-6,w+4,10,'#1a2238');R(s,x-2,y-6,w+4,2,'#d8b45a');R(s,x-2,y+2,w+4,1.4,'#d8b45a');
 for(let i=0;i<4;i++){const wx=x+14+i*((w-28)/4)+(i>1?18:0)-(i>1?8:0);if(Math.abs(wx+10-(x+b.dx))<26)continue;
  s.fillStyle='#d8b45a';s.beginPath();s.moveTo(wx-2,y+h-14);s.lineTo(wx-2,y+40);s.arc(wx+10,y+40,12,Math.PI,0);s.lineTo(wx+22,y+h-14);s.fill();
  const gg=s.createLinearGradient(wx,y+30,wx,y+h-16);gg.addColorStop(0,'#ffe9a8');gg.addColorStop(1,'#d9822b');s.fillStyle=gg;s.beginPath();s.moveTo(wx,y+h-16);s.lineTo(wx,y+40);s.arc(wx+10,y+40,10,Math.PI,0);s.lineTo(wx+20,y+h-16);s.fill();
  R(s,wx+9.4,y+30,1.2,y+h-16-(y+30),'#8a6a2a');R(s,wx,y+52,20,1,'#8a6a2a');
  for(let k=0;k<2;k++){R(s,wx+4+k*9,y+h-24,3,4,'#fff');s.fillStyle='rgba(255,200,80,.9)';s.beginPath();s.arc(wx+5.5+k*9,y+h-25.5,1.3,0,7);s.fill()}
  R(s,wx-3,y+h-15,26,2.4,'#5a1a2a');}
 // 酒紅色雨遮與招牌
 const ax=x+b.dx-22;s.fillStyle='#6a1428';s.beginPath();s.moveTo(ax,y+h-36);s.lineTo(ax+44,y+h-36);s.lineTo(ax+48,y+h-28);s.lineTo(ax-4,y+h-28);s.fill();for(let i=0;i<6;i++){s.fillStyle='#6a1428';s.beginPath();s.arc(ax-4+i*9.4+4.7,y+h-28,4.7,0,Math.PI);s.fill()}
 doorGlass(b,{dh:26});R(s,x+b.dx-1,y+h-26,2,26,'#d8b45a');
 signBoard(x+w/2-46,y+8,92,16,'✦ 碳佐麻里 ✦','#141a2c','#f2d27a',7.6,{glow:1});
 R(s,x+b.dx+18,y+h-22,16,10,'#d8b45a');R(s,x+b.dx+19,y+h-21,14,8,'#141a2c');txt(s,'預約制',x+b.dx+26,y+h-15.4,'#f2d27a','bold 3.6px sans-serif');
 [x+b.dx-34,x+b.dx+38].forEach(px=>{R(s,px-4,y+h-8,10,8,'#c8c0b0');s.fillStyle='#2f6a3a';s.beginPath();s.arc(px+1,y+h-14,7,0,7);s.fill();s.fillStyle='#3f8a4a';s.beginPath();s.arc(px-1,y+h-16,4,0,7);s.fill()});
 R(s,x+b.dx-12,y+h,24,14,'#8a1a2a');R(s,x+b.dx-12,y+h,1.4,14,'#d8b45a');R(s,x+b.dx+10.6,y+h,1.4,14,'#d8b45a')};
function houseBase(b,cur){const{x,y,w,h}=b;wallBody(b,b.c,'plaster');R(s,x+w-30,y-12,11,18,'#8a5a4a');R(s,x+w-31,y-14,13,3,'#6a3a2a');roofTile(b,b.r,36);
 wgrid(b,y+44,1,26,{pitch:34,ww:17,wh:17,cur,pl:1,ac:1});
 win(x+10,y+h-50,18,20,{nm:b.n,pl:1,cur});win(x+w-28,y+h-50,18,20,{nm:b.n,pl:1,cur});
 doorWood(b);RR(s,x+b.dx-14,y+h-36,28,3,1,'#6a3a2a');R(s,x+b.dx-12,y+h-34,24,2,'rgba(0,0,0,.2)')}
// 小小像素人頭像（門牌用）
function miniHead(cx,cy,hair,skin,o){o=o||{};const sz=o.baby?2.2:3;R(s,cx-sz,cy-sz,sz*2,sz*2,skin||'#f2c8a0');R(s,cx-sz,cy-sz,sz*2,o.long?sz*1.1:sz*.8,hair);if(o.long){R(s,cx-sz-.6,cy-sz,1,sz*2.2,hair);R(s,cx+sz-.4,cy-sz,1,sz*2.2,hair)}
 R(s,cx-sz*.5,cy,.8,.8,'#2a1a10');R(s,cx+sz*.5-.8,cy,.8,.8,'#2a1a10');R(s,cx-.6,cy+sz*.55,1.2,.5,'#d9707a');R(s,cx-sz,cy+sz,sz*2,o.baby?1.6:2.4,o.shirt||'#4a7aa0')}
// 吊掛式木門牌：兩條細繩＋圓角木牌＋家人頭像＋名字
function famPlaque(cx,top,w,name,people,col,fg){const y0=top+5,h=17;R(s,cx-w/2+5,top,.7,6,'#5a3a1a');R(s,cx+w/2-5.7,top,.7,6,'#5a3a1a');
 s.save();s.shadowColor='rgba(0,0,0,.35)';s.shadowBlur=1.4*KS;s.shadowOffsetY=1*KS;RR(s,cx-w/2,y0,w,h,3,col);s.restore();
 R(s,cx-w/2+1.4,y0+1.2,w-2.8,.8,'rgba(255,255,255,.28)');for(let i=4;i<w-3;i+=7)R(s,cx-w/2+i,y0+3,3,.5,'rgba(0,0,0,.12)');
 const n=people.length,gap=8;people.forEach((q,i)=>miniHead(cx-(n-1)*gap/2+i*gap,y0+5.2,q[0],q[1],q[2]));
 txt(s,name,cx,y0+15.2,fg||'#fff6dc','bold 4.6px sans-serif')}
// 現代風信箱（門旁）
function nameMailbox(x,y,nm,col){R(s,x+2.2,y+6,1.6,12,'#4a4a50');RR(s,x-2,y-2,10,8,1.6,col);R(s,x-2,y+1,10,.6,'rgba(0,0,0,.25)');R(s,x+7.4,y-4,1,4,'#e0302a');R(s,x+7.4,y-4,2.4,1.6,'#e0302a');txt(s,nm,x+3,y+4.6,'#fff','bold 2.6px sans-serif')}
STY.yhouse=b=>{houseBase(b,'#bfe0c8');const{x,y,w,h}=b;
 famPlaque(x+b.dx,y+34,46,'小石頭・媛媛・頌言',[['#1a1a1a','#e8b890',{shirt:'#2f6a4a'}],['#5a3018','#f2c8a0',{long:1,shirt:'#e8a0b8'}],['#3a2a1a','#f6d4b0',{baby:1,shirt:'#9ad0f0'}]],'#6a4426');
 nameMailbox(x+b.dx+18,y+h-22,'HUANG','#2f6a4a');
 // 門上小十字貼＋門口歡迎腳踏墊
 R(s,x+b.dx-.6,y+h-22,1.2,5,'#ffe9a8');R(s,x+b.dx-2,y+h-20.6,4,1.2,'#ffe9a8');R(s,x+b.dx-11,y+h+1,22,4,'#7a5a3a');txt(s,'WELCOME',x+b.dx,y+h+4.2,'#f4e2c0','bold 2.6px sans-serif');
 // 籃球框與嬰兒車
 R(s,x+w+6,y+h-46,2,46,'#6a6a72');R(s,x+w-2,y+h-56,18,12,'#fff');R(s,x+w-2,y+h-56,18,1,'#c0392b');R(s,x+w+4,y+h-50,6,4,'#c0392b');R(s,x+w+3,y+h-45,8,1,'#e8742a');
 s.fillStyle='#e8742a';s.beginPath();s.arc(x+w+12,y+h-4,3,0,7);s.fill();
 R(s,x+8,y+h-10,14,6,'#7ab0d8');s.fillStyle='#5a90b8';s.beginPath();s.arc(x+15,y+h-10,7,Math.PI,0);s.fill();s.fillStyle='#333';s.beginPath();s.arc(x+10,y+h-3,1.6,0,7);s.arc(x+20,y+h-3,1.6,0,7);s.fill()};
STY.lhouse=b=>{houseBase(b,'#c8b8e8');const{x,y,w,h}=b;
 famPlaque(x+b.dx,y+36,40,'Jiayi 家宜',[['#2b1a10','#f2c8a0',{long:1,shirt:'#9cc4e4'}]],'#4a3a6a','#f6eaff');
 R(s,x+b.dx+12,y+40,6,6,'#7aa84a');s.fillStyle='#8ab84a';s.beginPath();s.arc(x+b.dx+15,y+40,3.2,0,7);s.fill();for(let i=0;i<5;i++)R(s,x+b.dx+12.4+i*1.4,y+37.6+(i%2),1,1,'#5a8a2a'); // 小榴槤吊飾
 nameMailbox(x+b.dx+18,y+h-22,'LIU','#6a5acd');
 // 窗邊串燈與書堆
 for(let i=0;i<9;i++){const lx=x+6+i*((w-12)/8),ly=y+h-54+Math.sin(i*.9)*1.4;s.fillStyle=['#ffe066','#ff9ad0','#9ad8ff'][i%3];s.beginPath();s.arc(lx,ly,1.1,0,7);s.fill()}
 s.strokeStyle='rgba(60,40,30,.6)';s.lineWidth=.5;s.beginPath();s.moveTo(x+6,y+h-54);for(let i=1;i<9;i++)s.lineTo(x+6+i*((w-12)/8),y+h-54+Math.sin(i*.9)*1.4);s.stroke();
 [['#c0392b',0],['#2f80ed',1.4],['#f0b030',2.8]].forEach(q=>R(s,x+12,y+h-33+q[1],12,1.4,q[0]));
 R(s,x+b.dx-11,y+h+1,22,4,'#8a7aa8');txt(s,'HELLO',x+b.dx,y+h+4.2,'#fff','bold 2.6px sans-serif')};

STY.social=b=>{const{x,y,w,h}=b;wallBody(b,'#eef2f4','tile');roofFlat(b,'#4a8a9a',10);
 R(s,x,y+10,w,6,'#2f7a8a');R(s,x,y+16,w,1.2,'rgba(255,255,255,.4)');
 for(let i=0;i<5;i++){const wx=x+10+i*((w-20)/5);if(Math.abs(wx+12-(x+b.dx))<22)continue;win(wx,y+24,24,18,{nm:b.n,g1:'#d8f0f8',g2:'#9ad0e4',g3:'#6ab0cc',cur:i%2?'#f4e0a0':''})}
 doorGlass(b,{dh:24});R(s,x+b.dx-16,y+h-28,32,3,'#2f7a8a');
 signBoard(x+w/2-42,y+2,84,11,'♥ 城光社會福利中心','#2f7a8a','#fff',6.6,{glow:0});
 // 無障礙坡道與植栽、愛心標誌
 R(s,x+b.dx+16,y+h-4,24,4,'#c8ccd0');R(s,x+b.dx+16,y+h-4,24,.8,'#fff');
 s.fillStyle='#e8546a';s.beginPath();s.arc(x+w-22,y+30,3,0,7);s.arc(x+w-17,y+30,3,0,7);s.fill();s.beginPath();s.moveTo(x+w-25,y+31);s.lineTo(x+w-19.5,y+37);s.lineTo(x+w-14,y+31);s.fill();
 [x+6,x+w-18].forEach(px=>{R(s,px,y+h-10,12,10,'#c8b8a0');s.fillStyle='#3f8a4a';s.beginPath();s.arc(px+6,y+h-12,7,0,7);s.fill()})};
