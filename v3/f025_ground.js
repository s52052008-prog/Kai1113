/* ===== v9：操場、公園、休閒農場、夜市（地面） ===== */
const PL=[];for(let j=0;j<3;j++)for(let i=0;i<4;i++)PL.push({x:F.x+14+i*46,y:F.y+18+j*40,w:38,h:24,st:0,t:0,wt:0,k:(i+j)%2?'pumpkin':'tomato'});
// ── 操場（v3：比例修正、含籃球場與健身區）──
{const cx=FIELD.cx,cy=FIELD.cy,TX=140,TY=98;
 R(s,FIELD.x-2,FIELD.y-2,FIELD.w+4,FIELD.h+4,'#5aa83e');GR(s,FIELD.x,FIELD.y,FIELD.w,FIELD.h,'#7ccb58','#6ab94a');
 for(let i=0;i<FIELD.w;i+=24)R(s,FIELD.x+i,FIELD.y,12,FIELD.h,'rgba(255,255,255,.05)');
 // 跑道（外圈=紅土、白線分道）
 s.fillStyle='#8a3a22';s.beginPath();s.ellipse(cx,cy+1.5,TX+2,TY+2,0,0,7);s.fill();
 const tg=s.createRadialGradient(cx,cy,60,cx,cy,TX+4);tg.addColorStop(0,'#cf7048');tg.addColorStop(1,'#b2552f');s.fillStyle=tg;s.beginPath();s.ellipse(cx,cy,TX,TY,0,0,7);s.fill();
 for(let i=0;i<420;i++){const a=rnd()*6.28,r=.86+rnd()*.13;R(s,cx+Math.cos(a)*TX*r,cy+Math.sin(a)*TY*r,1.2,1,'rgba(255,230,200,.18)')}
 s.strokeStyle='rgba(255,255,255,.75)';s.lineWidth=.7;for(let k=0;k<=5;k++){s.beginPath();s.ellipse(cx,cy,TX-k*4.4,TY-k*3.8,0,0,7);s.stroke()}
 // 內場草地（被橢圓裁切，絕不超出跑道）
 const IX=TX-24,IY=TY-22;
 s.fillStyle='#8a3a22';s.beginPath();s.ellipse(cx,cy,IX+2,IY+2,0,0,7);s.fill();
 s.save();s.beginPath();s.ellipse(cx,cy,IX,IY,0,0,7);s.clip();GR(s,cx-IX-4,cy-IY-4,IX*2+8,IY*2+8,'#79c857','#68b648');for(let i=-IX;i<IX;i+=14)R(s,cx+i,cy-IY-4,7,IY*2+8,'rgba(255,255,255,.07)');s.restore();
 // 足球場 148x92（約 1.6:1）
 const PW=148,PH=92,px0=cx-PW/2,py0=cy-PH/2;
 s.save();s.beginPath();s.rect(px0,py0,PW,PH);s.clip();for(let i=0;i<PW;i+=18)R(s,px0+i,py0,9,PH,'rgba(255,255,255,.1)');s.restore();
 s.strokeStyle='rgba(255,255,255,.92)';s.lineWidth=.8;s.strokeRect(px0,py0,PW,PH);s.beginPath();s.moveTo(cx,py0);s.lineTo(cx,py0+PH);s.stroke();s.beginPath();s.arc(cx,cy,11,0,7);s.stroke();R(s,cx-.8,cy-.8,1.6,1.6,'#fff');
 s.strokeRect(px0,cy-24,22,48);s.strokeRect(px0+PW-22,cy-24,22,48);s.strokeRect(px0,cy-11,8,22);s.strokeRect(px0+PW-8,cy-11,8,22);
 s.beginPath();s.arc(px0+16,cy,9,-1,1);s.stroke();s.beginPath();s.arc(px0+PW-16,cy,9,Math.PI-1,Math.PI+1);s.stroke();
 [px0,px0+PW].forEach((gx,gi)=>{const x2=gi?gx:gx-3;R(s,x2,cy-8,3,16,'rgba(255,255,255,.85)');R(s,x2,cy-8,3,1,'#bbb');R(s,x2,cy+7,3,1,'#bbb');s.strokeStyle='rgba(255,255,255,.35)';s.lineWidth=.3;for(let q=0;q<5;q++){s.beginPath();s.moveTo(x2,cy-8+q*4);s.lineTo(x2+3,cy-8+q*4);s.stroke()}});
 R(s,cx-TX+2,cy-24,2,48,'#fff');txt(s,'START',cx-TX+10,cy+3,'rgba(255,255,255,.8)','bold 5px sans-serif');
 // 跳遠沙坑（跑道外南側）
 R(s,cx-92,FIELD.y+FIELD.h-4,44,3,'#c9b278');
 // 入口石板路
 paveTile(s,184,250,52,60,'#d8cfba','#cfc5ae');R(s,184,250,2,60,'rgba(0,0,0,.15)');R(s,234,250,2,60,'rgba(0,0,0,.15)')}
// ── 公園 ──
{const px=PARK.x,py=PARK.y,fx=927,fy=150;
 GR(s,px,py,PARK.w,PARK.h,'#79c857','#68b648');LTX(s,'lt_3',px,py,PARK.w,PARK.h,32);R(s,px-1.5,py-1.5,PARK.w+3,2.5,'#3f8a3a');
 for(let i=0;i<12;i++){const x=px+10+rnd()*(PARK.w-20),y=py+10+rnd()*(PARK.h-20),r=14+rnd()*14,rg=s.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,'rgba(190,240,140,.25)');rg.addColorStop(1,'rgba(0,0,0,0)');s.fillStyle=rg;s.fillRect(x-r,y-r,r*2,r*2)}
 const path=(x,y,w,h)=>{R(s,x-1,y-1,w+2,h+2,'rgba(0,0,0,.18)');paveTile(s,x,y,w,h,'#ddd3bd','#d2c8b0')};
 path(fx-11,fy,22,170);path(px,fy-11,PARK.w,22);
 s.fillStyle='rgba(0,0,0,.18)';s.beginPath();s.arc(fx,fy,44,0,7);s.fill();paveTile(s,fx-42,fy-42,84,84,'#ddd3bd','#d2c8b0');
 s.save();s.beginPath();s.arc(fx,fy,42,0,7);s.clip();s.fillStyle='#e8e0cc';s.fillRect(fx-43,fy-43,86,86);LTX(s,'lt_34',fx-43,fy-43,86,86,24);s.fillStyle='rgba(255,250,235,.18)';s.fillRect(fx-43,fy-43,86,86);s.restore();
 // 花圃
 [[px+34,py+36],[px+PARK.w-70,py+36],[px+34,py+PARK.h-64],[px+PARK.w-70,py+PARK.h-64]].forEach((q,qi)=>{R(s,q[0]-3,q[1]-3,46,34,'#8a5a2e');R(s,q[0]-1.5,q[1]-1.5,43,31,'#5a3a1a');GR(s,q[0],q[1],40,28,'#3f8a3a','#2f7a3a');
  for(let i=0;i<26;i++){s.fillStyle=['#ff7a9a','#ffd84a','#fff','#c9a7ff','#ff9a4a'][(i+qi)%5];s.beginPath();s.arc(q[0]+3+rnd()*34,q[1]+3+rnd()*22,1.4,0,7);s.fill()}});
 // 涼亭地面
 s.fillStyle='rgba(0,0,0,.2)';s.beginPath();s.ellipse(862,106,28,14,0,0,7);s.fill();paveTile(s,838,92,48,26,'#b08850','#a07840');
 // 遊戲區沙地
 RR(s,PARK.x+PARK.w-70,py+60,64,70,6,'#d8c284');s.save();RR(s,PARK.x+PARK.w-70,py+60,64,70,6);s.clip();LTX(s,'lt_15',PARK.x+PARK.w-70,py+60,64,70,24);s.restore();for(let i=0;i<60;i++)R(s,PARK.x+PARK.w-68+rnd()*60,py+62+rnd()*66,1.2,1,'rgba(150,120,60,.35)')}
// ── 休閒農場 ──
{const fx0=FARM.x,fy0=FARM.y;
 GR(s,fx0,fy0,FARM.w,FARM.h,'#86d060','#73c24f');LTX(s,'lt_4',fx0,fy0,FARM.w,FARM.h,32);
 for(let i=0;i<40;i++){const x=fx0+rnd()*FARM.w,y=fy0+rnd()*FARM.h,r=20+rnd()*40,rg=s.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,rnd()<.5?'rgba(190,240,140,.25)':'rgba(46,130,50,.16)');rg.addColorStop(1,'rgba(0,0,0,0)');s.fillStyle=rg;s.fillRect(x-r,y-r,r*2,r*2)}
 // 泥土小徑
 const dirt=(x,y,w,h)=>{if(LTX(s,'lt_5',x,y,w,h,24)){R(s,x,y,w,1,'rgba(255,255,255,.2)');return}R(s,x,y,w,h,'#b8935a');for(let i=0;i<w*h/20;i++)R(s,x+rnd()*w,y+rnd()*h,1.6,1,i%2?'rgba(255,230,170,.35)':'rgba(90,60,20,.25)');R(s,x,y,w,1,'rgba(255,255,255,.2)')};
 dirt(1424,806,36,40);dirt(F.x-18,F.y+F.h+6,F.w+36,12);dirt(1408,F.y+F.h-4,22,14);dirt(1408,F.y+F.h+18,22,48);dirt(1530,900,200,14);dirt(1536,812,40,92);
 paveTile(s,1568,934,164,50,'#d8cfba','#cfc5ae');
 // 菜園
 R(s,F.x-6,F.y-6,F.w+12,F.h+12,'#6a4a2a');R(s,F.x-3,F.y-3,F.w+6,F.h+6,'#8a5a32');
 PL.forEach(q=>{const g3=s.createLinearGradient(0,q.y,0,q.y+q.h);g3.addColorStop(0,'#6a4224');g3.addColorStop(1,'#4e2f18');s.fillStyle=g3;s.fillRect(q.x,q.y,q.w,q.h);for(let i=0;i<4;i++){s.fillStyle='rgba(0,0,0,.18)';s.fillRect(q.x+2,q.y+3+i*5.5,q.w-4,1.2)}s.fillStyle='rgba(255,255,255,.1)';s.fillRect(q.x,q.y,q.w,1)});
 // 養殖池（水泥池＋碼頭）
 R(s,FP.x-5,FP.y-5,FP.w+10,FP.h+10,'#8a8c86');R(s,FP.x-3,FP.y-3,FP.w+6,FP.h+6,'#b8bab2');
 const wg=s.createLinearGradient(FP.x,FP.y,FP.x+FP.w,FP.y+FP.h);wg.addColorStop(0,'#5fc0e8');wg.addColorStop(1,'#2f86c0');s.fillStyle=wg;s.fillRect(FP.x,FP.y,FP.w,FP.h);
 R(s,FP.x+FP.w/2-1.5,FP.y,3,FP.h,'#b8bab2');
 for(let i=0;i<14;i++)R(s,FP.x+4+rnd()*(FP.w-8),FP.y+4+rnd()*(FP.h-8),6+rnd()*5,1,'rgba(255,255,255,.25)');
 R(s,FP.x+FP.w/2-10,FP.y-14,20,6,'#8a5a2e');for(let i=0;i<9;i++)R(s,FP.x+FP.w/2-9+i*2.2,FP.y-14,1,6,'#6a4220');
 R(s,FP.x+FP.w/2-8,FP.y-8,16,30,'#a0703a');for(let i=0;i<8;i++){R(s,FP.x+FP.w/2-8,FP.y-8+i*4,16,.8,'#6a4220')}R(s,FP.x+FP.w/2-8,FP.y-8,1.4,30,'#6a4220');R(s,FP.x+FP.w/2+6.6,FP.y-8,1.4,30,'#6a4220');
 // 雞鴨園
 R(s,COOP.x,COOP.y,COOP.w,COOP.h,'#c4a070');LTX(s,'lt_15',COOP.x,COOP.y,COOP.w,COOP.h,24);for(let i=0;i<220;i++)R(s,COOP.x+rnd()*COOP.w,COOP.y+rnd()*COOP.h,1.5,1,i%2?'rgba(255,230,170,.35)':'rgba(90,60,20,.25)');
 s.fillStyle='#6fc0e0';s.beginPath();s.ellipse(COOP.x+88,COOP.y+58,22,13,0,0,7);s.fill();s.strokeStyle='#9a7a50';s.lineWidth=1.2;s.stroke();
 // 羊圈
 GR(s,SHEEP.x,SHEEP.y,SHEEP.w,SHEEP.h,'#8ed268','#7cc457');LTX(s,'lt_3',SHEEP.x,SHEEP.y,SHEEP.w,SHEEP.h,32);for(let i=0;i<30;i++)R(s,SHEEP.x+rnd()*SHEEP.w,SHEEP.y+rnd()*SHEEP.h,1.4,2.4,'rgba(60,140,50,.5)');
 // 野餐花海
 for(let i=0;i<150;i++){const x=1552+rnd()*140,y=1130-rnd()*14;s.fillStyle=['#ff7a9a','#ffd84a','#fff','#c9a7ff'][i%4];s.beginPath();s.arc(x,y,1.1,0,7);s.fill()}
 // 入口大門牌
 txt(s,'☀ 休閒農場',1443,801,'#fff8e0','bold 7px sans-serif')}
// 夜市地面標誌
txt(s,'—— 夜 市 ——',1005,818,'rgba(120,60,20,.55)','bold 10px sans-serif');
// 各建築前庭鋪面 & 小徑（延後到版面重排後繪製）
function paintDoorPaths(){B.forEach(b=>{const dx=b.x+b.dx-b.dw/2;paveTile(s,dx-3,b.bot,b.dw+6,16,'#d8cfba','#cfc5ae');R(s,dx-3,b.bot,b.dw+6,1,'rgba(0,0,0,.2)');
 const ty=b.bot>=900?b.bot+16:(b.bot==640?HRD[1].y-SWK:HRD[0].y-SWK);if(b.bot<=640)paveTile(s,dx-3,b.bot+16,b.dw+6,ty-b.bot-16,'#d8cfba','#cfc5ae')})}
