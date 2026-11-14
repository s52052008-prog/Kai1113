/* ===== v10：新建築外觀（教堂、消防局、遊藝場、寵物店、服飾店） ===== */
function archShape(c,x,y,w,h){c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+w/2);c.quadraticCurveTo(x,y,x+w/2,y-w*.15);c.quadraticCurveTo(x+w,y,x+w,y+w/2);c.lineTo(x+w,y+h);c.closePath()}
function stainedWin(x,y,w,h,b){R(s,x-2,y-w*.2,w+4,h+w*.2+2,'#8a8478');
 s.save();archShape(s,x,y,w,h);s.clip();const cols=['#d9452f','#2f80ed','#f2c230','#2a9d5c','#8a5aa8','#e0679a'];
 for(let i=0;i<4;i++)for(let j=0;j<Math.ceil(h/5);j++)R(s,x+i*w/4,y-4+j*5,w/4+.2,5.2,cols[(i*2+j*3+(x|0))%6]);
 R(s,x+w/2-.6,y-4,1.2,h+8,'#3a3a40');for(let j=1;j<h/9;j++)R(s,x,y-4+j*9,w,.9,'#3a3a40');
 GR(s,x,y,w,h,'rgba(255,255,255,.25)','rgba(0,0,0,.2)');s.restore();
 s.strokeStyle='#d8d2c4';s.lineWidth=1.6;archShape(s,x,y,w,h);s.stroke();WIN.push([x,y,w,h,b.n,0,1])}
STY.church=b=>{const{x,y,w,h}=b,cx=x+w/2;
 wallBody(b,'#ece6da','plaster');
 // 左右側翼低牆與山形屋頂
 s.fillStyle='#46567a';s.beginPath();s.moveTo(x-10,y+52);s.lineTo(x+w*.28,y+6);s.lineTo(x+w*.72,y+6);s.lineTo(x+w+10,y+52);s.closePath();s.fill();
 s.save();s.beginPath();s.moveTo(x-10,y+52);s.lineTo(x+w*.28,y+6);s.lineTo(x+w*.72,y+6);s.lineTo(x+w+10,y+52);s.closePath();s.clip();
 for(let yy=y+6;yy<y+54;yy+=4)R(s,x-12,yy,w+24,.8,'rgba(0,0,0,.25)');for(let xx=x-10;xx<x+w+10;xx+=7)R(s,xx,y+6,.6,50,'rgba(0,0,0,.1)');GR(s,x-10,y+6,w+20,48,'rgba(255,255,255,.15)','rgba(0,0,0,.22)');s.restore();
 R(s,x-10,y+52,w+20,3,'#2e3a58');
 // 鐘樓
 const tw=54,tx=cx-tw/2;GR(s,tx,y-52,tw,90,'#f0e9dc','#cfc6b4');R(s,tx+tw-5,y-52,5,90,'rgba(0,0,0,.14)');R(s,tx,y-52,tw,3,'#bfb6a4');
 s.fillStyle='#46567a';s.beginPath();s.moveTo(tx-4,y-52);s.lineTo(cx,y-100);s.lineTo(tx+tw+4,y-52);s.closePath();s.fill();s.fillStyle='rgba(255,255,255,.16)';s.beginPath();s.moveTo(cx,y-100);s.lineTo(tx+tw+4,y-52);s.lineTo(cx,y-52);s.closePath();s.fill();
 R(s,cx-1.2,y-118,2.4,22,'#f4f0e4');R(s,cx-6,y-111,12,2.4,'#f4f0e4');R(s,cx-1.2,y-118,2.4,22,'rgba(0,0,0,.12)');
 s.fillStyle='#14151a';archShape(s,cx-9,y-44,18,26);s.fill();R(s,cx-9,y-28,18,3,'#2a2a30');s.fillStyle='#c9a030';s.beginPath();s.arc(cx,y-24,3.4,0,7);s.fill();s.fillStyle='#8a6a20';s.fillRect(cx-.5,y-24,1,5);
 // 玫瑰窗
 const ry=y+30;s.fillStyle='#8a8478';s.beginPath();s.arc(cx,ry,15,0,7);s.fill();const rc=['#d9452f','#2f80ed','#f2c230','#2a9d5c','#8a5aa8','#e0679a','#2f80ed','#f2c230'];
 for(let i=0;i<8;i++){s.fillStyle=rc[i];s.beginPath();s.moveTo(cx,ry);s.arc(cx,ry,12.4,i*Math.PI/4,(i+1)*Math.PI/4);s.closePath();s.fill()}
 s.strokeStyle='#3a3a40';s.lineWidth=.9;for(let i=0;i<8;i++){s.beginPath();s.moveTo(cx,ry);s.lineTo(cx+Math.cos(i*Math.PI/4)*12.4,ry+Math.sin(i*Math.PI/4)*12.4);s.stroke()}s.fillStyle='#ffd84a';s.beginPath();s.arc(cx,ry,2.6,0,7);s.fill();WIN.push([cx-12,ry-12,24,24,b.n,0,1]);
 // 彩繪長窗（左右各三扇）
 [-1,1].forEach(sd=>[0,1,2].forEach(i=>{const wx=sd<0?x+16+i*26:x+w-16-14-i*26;if(Math.abs(wx+7-cx)<44)return;stainedWin(wx,y+86,14,50,b)}));
 // 扶壁
 [x+4,x+w-12,cx-40,cx+34].forEach(px=>{if(px<x||px>x+w-8)return;GR(s,px,y+58,8,h-58,'#e4dcca','#bfb6a2');R(s,px,y+58,8,2,'#fff')});
 // 招牌
 signBoard(cx-48,y+50,96,13,b.sg,'#1c2640','#ffd84a',8.5,{bd:'#c9a030'});
 // 大門（拱形雙扇）與台階
 const dx=x+b.dx-b.dw/2;R(s,dx-6,y+h-52,b.dw+12,52,'#d8d0be');R(s,dx-6,y+h-52,b.dw+12,2,'#fff');
 s.fillStyle='#3a1f10';archShape(s,dx,y+h-46,b.dw,46);s.fill();s.save();archShape(s,dx,y+h-46,b.dw,46);s.clip();GR(s,dx,y+h-46,b.dw/2-.6,46,'#8a5a30','#5a3418');GR(s,dx+b.dw/2+.6,y+h-46,b.dw/2-.6,46,'#8a5a30','#5a3418');
 for(let j=0;j<3;j++){R(s,dx+3,y+h-36+j*11,b.dw/2-6,8,'rgba(0,0,0,.22)');R(s,dx+b.dw/2+3.6,y+h-36+j*11,b.dw/2-6,8,'rgba(0,0,0,.22)')}s.restore();
 R(s,dx+b.dw/2-.6,y+h-44,1.2,44,'#2a1408');R(s,dx+b.dw/2-4,y+h-18,1.6,3,'#ffd84a');R(s,dx+b.dw/2+2.4,y+h-18,1.6,3,'#ffd84a');
 for(let i=0;i<3;i++){R(s,dx-8-i*3,y+h+i*2,b.dw+16+i*6,2.4,['#cfc6b4','#bfb6a4','#afa694'][i])}
 WIN.push([dx,y+h-46,b.dw,46,b.n,0,1]);
 // 十字架燈
 R(s,cx-1.4,y+h-96,2.8,14,'#f4f0e4');R(s,cx-5,y+h-92,10,2.8,'#f4f0e4');SIGNS.push([cx-5,y+h-96,10,14,'#fff6c8']);
 // 週間聚會公告板
 R(s,x+10,y+h-34,26,22,'#5a3418');R(s,x+11.4,y+h-32.6,23.2,19.2,'#e8dcc0');txt(s,'聚會',x+23,y+h-26,'#5a3418','bold 5px sans-serif');R(s,x+14,y+h-23,18,.8,'#8a6a40');R(s,x+14,y+h-20,18,.8,'#8a6a40');R(s,x+14,y+h-17,12,.8,'#8a6a40')};
STY.fire=b=>{const{x,y,w,h}=b;wallBody(b,'#ece0d6','brick');roofFlat(b,'#8a1a20',14);R(s,x,y+14,w,3,'#c0272d');
 // 瞭望塔
 R(s,x+w-34,y-46,28,56,'#c0272d');R(s,x+w-34,y-46,28,4,'#8a1a20');R(s,x+w-30,y-34,20,14,'#9fd3ee');R(s,x+w-30,y-34,20,2,'#fff');R(s,x+w-33,y-52,34,6,'#8a1a20');R(s,x+w-17.6,y-64,2,12,'#8a9096');SIGNS.push([x+w-30,y-34,20,14,'#ffe9a0']);WIN.push([x+w-30,y-34,20,14,b.n,0,1]);
 signBoard(x+14,y+22,w-70,17,'','#c0272d','#fff',10,{bd:'#fff'});txt(s,b.sg+'  119',x+14+(w-70)/2,y+34.4,'#fff','bold 10px sans-serif');
 // 三個車庫門：左右為消防車庫，中間為人員出入口
 const bays=[x+10,x+w-34-52-6];[...bays].forEach((bx,i)=>{R(s,bx-2,y+54,56,h-58,'#8a1a20');GR(s,bx,y+56,52,h-62,'#d8dde0','#9aa0a6');for(let j=0;j<10;j++)R(s,bx,y+58+j*(h-66)/10,52,.8,'rgba(0,0,0,.25)');
  if(i==0){/* 消防車半露 */}R(s,bx,y+h-8,52,4,'#555');R(s,bx+14,y+h-18,24,3,'#ffd84a')});
 R(s,x+b.dx-b.dw/2-4,y+h-52,b.dw+8,52,'#8a1a20');doorGlass(b,{dh:44,frame:'#8a1a20',frame2:'#ffd84a'});
 // 消防車（右側車庫門開一半露出車頭）
 R(s,bays[0]+4,y+h-30,44,22,'#c0272d');R(s,bays[0]+8,y+h-27,16,10,'#9fd3ee');R(s,bays[0]+4,y+h-14,44,3,'#fff');R(s,bays[0]+44,y+h-18,5,5,'#ffe9a0');
 // 二樓窗
 win(x+22,y+44,16,10,{nm:b.n,nomul:1});
 // 消防栓標誌
 s.fillStyle='#e03030';s.beginPath();s.arc(x+w/2,y+h-60,6,0,7);s.fill();txt(s,'🔥',x+w/2,y+h-57,'#fff','bold 8px sans-serif')};
STY.arcade=b=>{const{x,y,w,h}=b;wallBody(b,'#2a1f4a','plaster');roofFlat(b,'#12082a',12);R(s,x,y+12,w,2.4,'#ff4aa0');R(s,x,y+14.4,w,1.2,'#4af0ff');
 // 霓虹招牌
 s.save();s.shadowColor='#ff4aa0';s.shadowBlur=6*KS;signBoard(x+10,y+20,w-20,26,'','#1a0a3a','#ff4aa0',12,{bd:'#ff4aa0',glow:1});s.restore();txt(s,b.sg,x+w/2,y+32,'#ff7ac8','bold 11px sans-serif');txt(s,'GAME CENTER',x+w/2,y+42,'#4af0ff','bold 6px sans-serif');
 // 遊戲機窗
 [[x+8,52],[x+w-8-60,52]].forEach(([wx,wy],k)=>{const ww=60;R(s,wx-2,y+h-62,ww+4,52,'#12082a');GR(s,wx,y+h-60,ww,48,'#3a1a6a','#1a0a3a');for(let i=0;i<3;i++){const mx=wx+4+i*18;R(s,mx,y+h-52,14,34,'#2a2a38');R(s,mx+1.4,y+h-49,11.2,11,['#4af0ff','#ff7ac8','#ffd84a'][(i+k)%3]);R(s,mx+2,y+h-34,10,2,'#ddd');R(s,mx+3,y+h-30,3,3,'#ff3b30');R(s,mx+8,y+h-30,3,3,'#30d158');SIGNS.push([mx+1.4,y+h-49,11.2,11,['#4af0ff','#ff7ac8','#ffd84a'][(i+k)%3]])}WIN.push([wx,y+h-60,ww,48,b.n,0,1])});
 // 方格燈帶
 for(let i=0;i<w;i+=8){R(s,x+i,y+50,4,4,i%16?'#ff4aa0':'#4af0ff');SIGNS.push([x+i,y+50,4,4,i%16?'#ff4aa0':'#4af0ff'])}
 doorGlass(b,{dh:38,frame:'#ff4aa0',frame2:'#4af0ff'});R(s,x+b.dx-b.dw/2-8,y+h-44,b.dw+16,6,'#ff4aa0');txt(s,'OPEN',x+b.dx,y+h-39.4,'#fff','bold 5px sans-serif');
 // 搖桿、骰子裝飾
 R(s,x+10,y+h-8,w-20,4,'rgba(255,255,255,.08)')};
STY.pet=b=>{const{x,y,w,h}=b;wallBody(b,'#fbe6c8','plaster');roofFlat(b,'#ff8a5a',11);
 signBoard(x+8,y+14,w-16,18,b.sg,'#fff3d6','#e0602a',9.5,{bd:'#ff8a5a',r:6});
 // 肉球
 [[x+16,y+9],[x+w-16,y+9]].forEach(q=>{s.fillStyle='#ff8a5a';s.beginPath();s.arc(q[0],q[1]+2,3,0,7);s.fill();[[-3.4,-3],[0,-4.4],[3.4,-3]].forEach(o=>{s.beginPath();s.arc(q[0]+o[0],q[1]+o[1]+1,1.2,0,7);s.fill()})});
 awning(x+4,y+36,w-8,'#ff8a5a','#fff3d6',8,Math.round((w-8)/8));
 // 橱窗：籠中小動物
 const gw=b.dx-b.dw/2-14;[[x+8,gw],[x+b.dx+b.dw/2+6,w-b.dx-b.dw/2-14]].forEach(([wx,ww],k)=>{glassFront(wx,y+h-46,ww,36,{inside:'#fff6e4',nm:b.n,fr:'#ff8a5a'});
  const pets=[['#e8a45a','#b8741a'],['#fff','#ccc'],['#8a8a94','#555']];const px=wx+ww/2-6;s.fillStyle=pets[k%3][0];s.beginPath();s.ellipse(px+6,y+h-22,8,6.4,0,0,7);s.fill();s.beginPath();s.arc(px+6,y+h-30,6.4,0,7);s.fill();s.fillStyle=pets[k%3][1];s.beginPath();s.ellipse(px+1.4,y+h-34,2.2,4,-.3,0,7);s.ellipse(px+10.6,y+h-34,2.2,4,.3,0,7);s.fill();R(s,px+3,y+h-30.4,1.6,1.6,'#222');R(s,px+7.4,y+h-30.4,1.6,1.6,'#222');R(s,px+5,y+h-27.6,2,1.2,'#e07a8a')});
 doorGlass(b,{dh:34,frame:'#ff8a5a',frame2:'#fff3d6'});txt(s,'♥ PET SHOP',x+b.dx,y+h-39,'#e0602a','bold 5px sans-serif')};
STY.clothes=b=>{const{x,y,w,h}=b;wallBody(b,'#f1e8f4','plaster');roofFlat(b,'#8a5aa8',11);R(s,x,y+11,w,2,'#c9a7e0');
 signBoard(x+10,y+16,w-20,17,b.sg,'#2a1a3a','#f0d0ff',9.5,{bd:'#c9a7e0'});
 awning(x+4,y+38,w-8,'#8a5aa8','#e8d8f4',8,Math.round((w-8)/9));
 const gw=b.dx-b.dw/2-12;[[x+7,gw],[x+b.dx+b.dw/2+5,w-b.dx-b.dw/2-12]].forEach(([wx,ww],k)=>{glassFront(wx,y+h-52,ww,42,{inside:'#f8f2fa',nm:b.n,fr:'#8a5aa8'});
  const mx=wx+ww/2;const col=[['#d9452f','#2b3a55'],['#2f80ed','#f4f4f4']][k%2];R(s,mx-.8,y+h-42,1.6,26,'#8a8478');s.fillStyle='#f1c08f';s.beginPath();s.arc(mx,y+h-44,3,0,7);s.fill();R(s,mx-6,y+h-41,12,13,col[0]);R(s,mx-5,y+h-28,10,14,col[1]);R(s,mx-6,y+h-14,12,2,'#555')});
 doorGlass(b,{dh:34,frame:'#8a5aa8',frame2:'#e8d8f4'});for(let i=0;i<5;i++){R(s,x+b.dx-14+i*7,y+h-46,.8,5,'#8a8478');s.strokeStyle='#8a8478';s.lineWidth=.6;s.beginPath();s.moveTo(x+b.dx-14+i*7,y+h-46);s.lineTo(x+b.dx-17+i*7,y+h-41);s.lineTo(x+b.dx-11+i*7,y+h-41);s.closePath();s.stroke()}};
// ── 福德宮：台灣傳統廟宇（參考艋舺龍山寺三川殿）──
STY.temple=b=>{const{x,y,w,h}=b,cx=x+w/2,bot=y+h;
 const roof=(x0,x1,yb,hh,c1,c2)=>{const L=x1-x0;
  s.fillStyle='rgba(0,0,0,.22)';s.beginPath();s.moveTo(x0+4,yb-8);s.quadraticCurveTo(x0+L*.14,yb+8,x0+L*.3,yb+7);s.lineTo(x1-L*.3,yb+7);s.quadraticCurveTo(x1-L*.14,yb+8,x1-4,yb-8);s.lineTo(x1-4,yb);s.lineTo(x0+4,yb);s.fill();
  const g=s.createLinearGradient(0,yb-hh,0,yb+2);g.addColorStop(0,c1);g.addColorStop(1,c2);s.fillStyle=g;s.beginPath();s.moveTo(x0,yb-14);s.quadraticCurveTo(x0+L*.12,yb+3,x0+L*.3,yb+3);s.lineTo(x1-L*.3,yb+3);s.quadraticCurveTo(x1-L*.12,yb+3,x1,yb-14);
  s.quadraticCurveTo(x1-L*.07,yb-hh+10,x1-L*.24,yb-hh+2);s.lineTo(x0+L*.24,yb-hh+2);s.quadraticCurveTo(x0+L*.07,yb-hh+10,x0,yb-14);s.fill();
  s.save();s.clip();for(let i=x0;i<x1;i+=3.2){s.fillStyle='rgba(120,50,0,.28)';s.fillRect(i,yb-hh,1,hh+6)}for(let j=0;j<hh;j+=5){s.fillStyle='rgba(255,230,160,.10)';s.fillRect(x0,yb-hh+j,L,1)}s.restore();
  // 瓦當滴水
  for(let i=x0+L*.12;i<x1-L*.12;i+=4){const t=(i-x0)/L,ey=yb+3-Math.max(0,(Math.abs(t-.5)-.2)*50);s.fillStyle='#ffd45a';s.beginPath();s.arc(i,Math.min(yb+3,ey+1),1.5,0,Math.PI);s.fill()}
  // 屋脊金線與燕尾
  s.strokeStyle='#ffd45a';s.lineWidth=1.6;s.beginPath();s.moveTo(x0+L*.07,yb-hh+10);s.quadraticCurveTo(x0+L*.1,yb-hh+4,x0+L*.24,yb-hh+2);s.lineTo(x1-L*.24,yb-hh+2);s.quadraticCurveTo(x1-L*.1,yb-hh+4,x1-L*.07,yb-hh+10);s.stroke();
  [[x0,1],[x1,-1]].forEach(q=>{const tx=q[0],d=q[1];s.fillStyle='#2f8a6a';s.beginPath();s.moveTo(tx,yb-14);s.quadraticCurveTo(tx-d*5,yb-22,tx-d*1,yb-32);s.quadraticCurveTo(tx+d*1,yb-24,tx+d*3,yb-30);s.quadraticCurveTo(tx+d*5,yb-20,tx+d*3,yb-12);s.fill();s.fillStyle='#ffd45a';s.beginPath();s.arc(tx-d*1,yb-30,1.4,0,7);s.fill()})};
 // 石基座
 R(s,x-10,bot-9,w+20,9,'#8f897f');R(s,x-10,bot-9,w+20,2,'#c9c3b7');for(let i=x-8;i<x+w+10;i+=9)R(s,i,bot-6,6,3,'#7a746a');
 // 牆身與腰堵
 wallBody(b,'#b52a20','plaster');R(s,x,bot-34,w,26,'#a59e92');for(let i=x+4;i<x+w-4;i+=14){R(s,i,bot-31,10,19,'#bdb6a8');R(s,i+1.4,bot-29.6,7.2,16.2,'#968f84');s.fillStyle='#bdb6a8';s.beginPath();s.arc(i+5,bot-21,2.4,0,7);s.fill()}
 // 上層歇山屋頂與山牆
 R(s,x+16,y+4,w-32,26,'#b52a20');for(let i=0;i<4;i++){const wx=x+24+i*((w-62)/3);R(s,wx,y+10,12,12,'#6a1a14');R(s,wx+1,y+11,10,10,'#e8c050');for(let k=0;k<3;k++){R(s,wx+1,y+13+k*3,10,.8,'#6a1a14');R(s,wx+3+k*3,y+11,.8,10,'#6a1a14')}}
 roof(x+10,x+w-10,y+8,30,'#f2b03a','#c9741e');
 // 寶塔脊飾與雙龍
 const rt=y-22;R(s,cx-1.4,rt-12,2.8,14,'#ffd45a');for(let k=0;k<3;k++){const ww=12-k*3.4;s.fillStyle=['#e8472a','#2f8a6a','#ffd45a'][k];s.beginPath();s.moveTo(cx-ww,rt-1-k*5);s.lineTo(cx,rt-6-k*5);s.lineTo(cx+ww,rt-1-k*5);s.fill()}s.fillStyle='#ffd45a';s.beginPath();s.arc(cx,rt-16,2.4,0,7);s.fill();
 [-1,1].forEach(d=>{s.strokeStyle='#2f8a6a';s.lineWidth=2.4;s.lineCap='round';s.beginPath();s.moveTo(cx+d*14,rt+1);s.bezierCurveTo(cx+d*24,rt-10,cx+d*32,rt+4,cx+d*40,rt-3);s.stroke();s.strokeStyle='#ffd45a';s.lineWidth=.8;s.stroke();s.fillStyle='#e8472a';s.beginPath();s.arc(cx+d*13,rt-1,2.8,0,7);s.fill();s.fillStyle='#ffd45a';s.fillRect(cx+d*13-1,rt-3,2,1.2);s.lineCap='butt'});
 // 下層屋簷＋斗拱
 R(s,x-6,y+36,w+12,16,'#7a1a14');for(let i=x-4;i<x+w+6;i+=6){R(s,i,y+38,5,12,['#2f8a6a','#2a6ab8','#ffd45a','#e8472a'][((i-x)/6|0)&3]);R(s,i,y+38,5,2,'rgba(255,255,255,.35)')}
 roof(x-18,x+w+18,y+40,22,'#f2b03a','#b8651c');
 // 匾額
 R(s,cx-23,y+56,46,15,'#c9a45a');R(s,cx-21.5,y+57.5,43,12,'#14110a');txt(s,'福德宮',cx,y+67,'#ffd45a','bold 10px sans-serif');SIGNS.push([cx-21,y+57,42,12,'#ffd45a']);
 // 龍柱
 [cx-34,cx+22].forEach((px,i)=>{R(s,px,y+58,12,bot-y-66,'#d8d0bc');R(s,px,y+58,2,bot-y-66,'#f2ecd8');R(s,px+10,y+58,2,bot-y-66,'#a49c86');s.strokeStyle='#8a7a5a';s.lineWidth=1.3;s.beginPath();for(let k=0;k<7;k++){const yy=y+62+k*((bot-y-80)/6);s.moveTo(px+1,yy);s.quadraticCurveTo(px+11,yy+3,px+1,yy+7)}s.stroke();s.fillStyle='#b8a878';for(let k=0;k<12;k++)s.fillRect(px+2+(k%2)*5,y+62+k*5,1.6,1.6);s.fillStyle='#c9b068';s.beginPath();s.arc(px+6,y+60,4,0,7);s.fill();s.fillStyle='#e8472a';s.beginPath();s.arc(px+6+(i?2:-2),y+60,1.6,0,7);s.fill()});
 // 側面石獅與香爐
 [[x+8,1],[x+w-22,-1]].forEach(q=>{const lx=q[0],by=bot-8;R(s,lx,by-3,14,3,'#8f897f');s.fillStyle='#b9b2a2';s.beginPath();s.ellipse(lx+7,by-8,5.4,5.6,0,0,7);s.fill();s.beginPath();s.arc(lx+7,by-15,4.2,0,7);s.fill();s.fillStyle='#8f897f';s.fillRect(lx+4.6,by-16,1,1);s.fillRect(lx+8.4,by-16,1,1);R(s,lx+5,by-13,4,1,'#8f897f');s.fillStyle='#d9d2c0';s.beginPath();s.arc(lx+7,by-18.4,3,Math.PI,0);s.fill()});
 s.fillStyle='#7a5a2a';s.beginPath();s.ellipse(x-8,bot-4,8,3,0,0,7);s.fill();R(s,x-14,bot-16,12,10,'#a8782e');R(s,x-15,bot-18,14,3,'#c9983e');R(s,x-13,bot-6,2,5,'#6a4a1a');R(s,x-5,bot-6,2,5,'#6a4a1a');R(s,x-10,bot-22,1.6,6,'#8a8a8a');
 // 門與門神
 const dx=x+b.dx-b.dw/2;R(s,dx-4,bot-46,b.dw+8,46,'#2a0e0a');R(s,dx-5,bot-47,b.dw+10,3,'#ffd45a');[0,1].forEach(i=>{const px=dx+i*(b.dw/2+.5),pw=b.dw/2-.5;GR(s,px,bot-43,pw,43,i?'#c8302a':'#b0281f',i?'#8a1c16':'#7a1812');R(s,px+1.5,bot-41,pw-3,2,'#ffd45a');for(let r=0;r<3;r++)for(let c=0;c<3;c++){s.fillStyle='#e8c050';s.beginPath();s.arc(px+3+c*((pw-6)/2),bot-9-r*0+0,0,0,7)}
  s.fillStyle=i?'#2f8a6a':'#2a6ab8';s.fillRect(px+2,bot-36,pw-4,22);s.fillStyle='#f1c08f';s.beginPath();s.arc(px+pw/2,bot-31,2.8,0,7);s.fill();s.fillStyle='#14110a';s.fillRect(px+pw/2-2.6,bot-35,5.2,2);s.fillStyle='#ffd45a';s.fillRect(px+3,bot-27,pw-6,2);s.fillStyle='#c8302a';s.fillRect(px+pw/2-2,bot-25,4,8);R(s,px+pw/2-.5,bot-43,1,43,'rgba(0,0,0,.0)')});
 R(s,dx+b.dw/2-.6,bot-43,1.2,43,'#ffd45a');
 WIN.push([dx,bot-43,b.dw,43,b.n,0,1]);
 // 燈籠與信眾花窗
 for(let i=0;i<7;i++){const lx=x-4+i*((w+8)/6);lantern(lx,y+54,'#e0301f')}
 [[x+6],[x+w-20]].forEach(q=>{R(s,q[0],y+74,14,18,'#6a1a14');R(s,q[0]+1.4,y+75.4,11.2,15.2,'#e8c050');for(let k=0;k<4;k++){R(s,q[0]+1.4,y+78+k*3.6,11.2,.8,'#6a1a14');R(s,q[0]+4+k*2.4,y+75.4,.8,15.2,'#6a1a14')}});
 R(s,x+b.dx-9,bot-2,18,3,'#8a7a64')};
