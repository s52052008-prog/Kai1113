/* ===== v9：街道家具、樹木、圍籬、電線桿 ===== */
function mkSpr(w,h,fn){const c=document.createElement('canvas');c.width=Math.ceil(w*SK);c.height=Math.ceil(h*SK);const x=c.getContext('2d');x.scale(SK,SK);fn(x);return pixelize(c,Math.max(1,Math.round(SK)),{})}
const SPC={},DEC=[],LAMPS=[],BULBS=[],WS=[],solids=[];
const sol=(x,y,w,h)=>solids.push({x,y,w,h});
function place(spr,x,y,w,h,so,by){DEC.push({spr,x,y,w,h,by:by??y+h});if(so)sol(so[0],so[1],so[2],so[3])}
const scSpr=(col,hm)=>{const key=col+hm;return SPC[key]||(SPC[key]=mkSpr(24,15,c=>{c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(12,14,10.5,2,0,0,7);c.fill();
 [[5,10],[19,10]].forEach(w=>{c.fillStyle='#1c1c1c';c.beginPath();c.arc(w[0],w[1],4,0,7);c.fill();c.fillStyle='#8a9096';c.beginPath();c.arc(w[0],w[1],1.8,0,7);c.fill()});
 R(c,7,4,12,6,col);R(c,18,1.5,3,9,col);R(c,8,2.5,9,2,'#222');R(c,21,4,2,2,'#fff3a0');R(c,19,-.5,4,1.5,'#333');R(c,9,5,8,1,'rgba(255,255,255,.25)');
 if(hm){c.fillStyle=hm;c.beginPath();c.arc(12,1.5,2.6,Math.PI,0);c.fill()}}))};
const poleSpr=mkSpr(14,50,c=>{R(c,5.5,6,3,44,'#7a6a5a');R(c,5.5,6,1,44,'rgba(255,255,255,.2)');R(c,0,6,14,2.5,'#6a5a4a');[1,6,11].forEach(i=>R(c,i,3.5,2,2.5,'#cfe8f0'));R(c,3,15,8,10,'#8a9096');R(c,3,15,8,2,'#aab0b6');R(c,2,32,10,6,'#c8c0a0');R(c,7,40,3,3,'#d9452f');R(c,3,45,8,3,'#4a4f55')});
const lampSpr=mkSpr(16,42,c=>{R(c,6,9,2.2,33,'#4a4f55');R(c,6,9,.8,33,'rgba(255,255,255,.2)');c.fillStyle='#4a4f55';c.beginPath();c.moveTo(7,9);c.quadraticCurveTo(7,3,13,4);c.lineTo(13,5.6);c.quadraticCurveTo(9,5.4,8.4,9);c.fill();RR(c,10,3.4,5.6,3,1,'#cfd6dc');R(c,4,38,6,4,'#333')});
const binSpr=mkSpr(9,11,c=>{R(c,1,2,7,9,'#3f7a4a');R(c,0,0,9,3,'#2f5a38');R(c,3,5,3,2,'rgba(255,255,255,.4)')});
const plantSpr=mkSpr(12,13,c=>{R(c,3,8,6,5,'#a0522d');[[2,4,3],[6,2,3.5],[8,5,3]].forEach(q=>{c.fillStyle='#3f9a46';c.beginPath();c.arc(q[0]+1.5,q[1]+1,q[2],0,7);c.fill()});R(c,5,2,2,2,'#ff7a9a')});
const vendSpr=mkSpr(13,22,c=>{R(c,0,0,13,22,'#d9452f');R(c,1,2,11,10,'#1a2a3a');for(let i=0;i<6;i++)R(c,2+(i%3)*3.4,3+(i/3|0)*4.5,2.4,3.4,['#f0b030','#2a9d5c','#fff','#2f80ed','#e0679a','#f0b030'][i]);R(c,2,15,9,3,'#111');R(c,0,0,13,1.5,'rgba(255,255,255,.3)')});
const benchSpr=mkSpr(26,16,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(13,14.4,12,1.8,0,0,7);c.fill();R(c,2,7,2,7,'#3a3a40');R(c,22,7,2,7,'#3a3a40');for(let i=0;i<3;i++)R(c,1,6+i*1.8,24,1.5,i%2?'#a8743a':'#b8844a');for(let i=0;i<2;i++)R(c,1,1+i*2.4,24,1.8,'#9a6a36');R(c,2,0,2,7,'#3a3a40');R(c,22,0,2,7,'#3a3a40')});
const hydSpr=mkSpr(8,10,c=>{R(c,1.5,2,5,8,'#d9452f');R(c,.5,3.4,7,2,'#b83a28');R(c,2,0,4,2.4,'#d9452f');R(c,3.4,5,1.2,2,'#ffd84a')});
const mailSpr=mkSpr(9,14,c=>{R(c,4,7,1.6,7,'#444');RR(c,.5,0,8,8,3,'#2a9d5c');R(c,2,3.4,5,1,'#0a0a0a');R(c,.5,5.6,8,.8,'#1a7a40')});
const cartSpr=mkSpr(14,12,c=>{c.strokeStyle='#8a9096';c.lineWidth=.6;c.strokeRect(2,1,10,6);for(let i=0;i<4;i++)R(c,3+i*2.4,1,.4,6,'#8a9096');R(c,0,0,3,.8,'#8a9096');R(c,3,7,8,.8,'#555');[[4,10],[10,10]].forEach(w=>{c.fillStyle='#222';c.beginPath();c.arc(w[0],w[1],1.2,0,7);c.fill()})});
const sandSpr=(t,col)=>{const k='sb'+t+col;return SPC[k]||(SPC[k]=mkSpr(14,16,c=>{R(c,1.6,3,1,12,'#555');R(c,11.4,3,1,12,'#555');c.fillStyle=col;c.beginPath();c.moveTo(2,15);c.lineTo(7,1);c.lineTo(12,15);c.fill();RR(c,3.2,6.6,7.6,6,1,'#222');txt(c,t,7,11.4,'#fff','bold 4px sans-serif')}))};
const tableSpr=(col)=>{const k='tb'+col;return SPC[k]||(SPC[k]=mkSpr(34,34,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(17,30,14,3,0,0,7);c.fill();R(c,16,12,2,18,'#777');[[4,22],[26,22],[15,27]].forEach(q=>{R(c,q[0],q[1],5,3,'#4a2a12');R(c,q[0]+.6,q[1]+3,.9,5,'#4a2a12');R(c,q[0]+3.4,q[1]+3,.9,5,'#4a2a12')});c.fillStyle='#e8dcc0';c.beginPath();c.ellipse(17,21,10,3.4,0,0,7);c.fill();c.fillStyle=col;c.beginPath();c.moveTo(0,12);c.quadraticCurveTo(17,-6,34,12);c.lineTo(34,13);c.quadraticCurveTo(17,9,0,13);c.fill();for(let i=0;i<5;i++){c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.moveTo(17,1.4);c.lineTo(i*8+1,12);c.lineTo(i*8+5,12);c.fill()}}))};
const stoolSet=mkSpr(40,22,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(20,19,17,2.6,0,0,7);c.fill();[[2,6],[26,6]].forEach(q=>{RR(c,q[0],q[1],12,7,2,'#d9452f');R(c,q[0]+1,q[1]+7,1,6,'#555');R(c,q[0]+10,q[1]+7,1,6,'#555')});RR(c,11,5,18,5,1,'#8ab4d8');R(c,13,10,2,8,'#555');R(c,25,10,2,8,'#555');R(c,13,6,3,2,'#fff');R(c,22,5.4,3,3,'#a0522d')});
const boothSpr=mkSpr(20,32,c=>{c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(10,30,10,2.4,0,0,7);c.fill();R(c,2,10,16,20,'#e8eef4');R(c,2,10,16,3,'#1f4fa3');R(c,2,10,1.4,20,'rgba(0,0,0,.15)');R(c,16.6,10,1.4,20,'rgba(0,0,0,.25)');R(c,4,15,12,9,'#6fb2da');R(c,4,15,12,1,'#bfe6f7');R(c,9.4,15,1.2,9,'#e8eef4');R(c,1,8,18,3,'#1f4fa3');R(c,0,10,20,1.4,'rgba(0,0,0,.3)');R(c,8,3,4,5,'#d9452f');R(c,8,3,4,2,'#ff6a5a');R(c,3,25,14,2,'#aab4be');txt(c,'警',10,22.5,'#1f4fa3','bold 5px sans-serif')});
const lionSpr=mkSpr(12,16,c=>{c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(6,14.6,6,1.6,0,0,7);c.fill();R(c,1,11,10,4,'#9a9a92');R(c,2.4,5,7,7,'#b4b4aa');c.fillStyle='#b4b4aa';c.beginPath();c.arc(6,4.6,3.6,0,7);c.fill();R(c,2,2,8,1.6,'#9a9a92');R(c,4,4,1.2,1.2,'#222');R(c,6.8,4,1.2,1.2,'#222');R(c,5,6,2,1,'#6a6a62');R(c,3,8,6,1,'rgba(0,0,0,.15)')});
const burnerSpr=mkSpr(18,20,c=>{c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(9,18.4,8,1.8,0,0,7);c.fill();R(c,3,14,12,4,'#8a6a2a');R(c,2,8,14,7,'#c9a030');R(c,2,8,14,1.6,'#ffe066');R(c,4,6,10,3,'#8a6a2a');R(c,1,7,2,5,'#c9a030');R(c,15,7,2,5,'#c9a030');R(c,5,4,1,3,'#d9452f');R(c,8.4,3,1,4,'#d9452f');R(c,11.6,4,1,3,'#d9452f')});
const swingSpr=mkSpr(40,32,c=>{c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(20,30,18,2.4,0,0,7);c.fill();R(c,2,4,2.2,26,'#d9452f');R(c,35.8,4,2.2,26,'#d9452f');R(c,1,3,38,2.4,'#d9452f');[[11],[27]].forEach(q=>{R(c,q[0],5,.8,16,'#555');R(c,q[0]+5,5,.8,16,'#555');R(c,q[0]-1,20,8,2,'#f0b030')})});
const slideSpr=mkSpr(34,36,c=>{c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(17,34,15,2.4,0,0,7);c.fill();R(c,2,6,3,28,'#2f80ed');R(c,12,6,3,28,'#2f80ed');R(c,1,5,16,3,'#f0b030');for(let i=0;i<5;i++)R(c,3,12+i*4.4,10,1.2,'#8a9096');c.fillStyle='#e0679a';c.beginPath();c.moveTo(13,6);c.lineTo(32,32);c.lineTo(26,32);c.lineTo(10,8);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.moveTo(14,6);c.lineTo(31,31);c.lineTo(29,31);c.lineTo(12,7);c.fill()});
const seesawSpr=mkSpr(30,14,c=>{c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(15,12.6,12,1.6,0,0,7);c.fill();R(c,13,6,4,6,'#555');c.save();c.translate(15,6);c.rotate(-.15);R(c,-13,-1.4,26,2.8,'#f0b030');R(c,-13,-3,2,3,'#d9452f');R(c,11,-3,2,3,'#d9452f');c.restore()});
const fkSpr=mkSpr(18,24,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(9,22,8,2,0,0,7);c.fill();R(c,8,6,2,16,'#6a4a2a');R(c,1,9,16,2,'#6a4a2a');c.fillStyle='#e8c27a';c.beginPath();c.arc(9,4,3.4,0,7);c.fill();R(c,5,.8,8,1.8,'#d9b45a');R(c,2,2,14,1.4,'#d9b45a');R(c,5,11,8,8,'#4a6a9a');R(c,6,13,1.2,1.2,'#e8c27a');R(c,11,15,1.2,1.2,'#e8c27a')});
const haySpr=mkSpr(22,16,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(11,14.6,10,1.8,0,0,7);c.fill();RR(c,1,3,20,11,5,'#e0c060');for(let i=0;i<5;i++)R(c,3+i*3.6,4,.7,9,'rgba(150,110,30,.5)');R(c,1,7.4,20,1.2,'#a07830');R(c,1,10.4,20,1.2,'#a07830');RR(c,1,3,20,3,3,'rgba(255,255,255,.25)')});
const milkSpr=mkSpr(10,14,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(5,13,4.4,1.2,0,0,7);c.fill();RR(c,1.4,3,7,10,1.5,'#d8dce0');R(c,1.4,3,7,1.4,'#fff');R(c,2.4,.8,5,2.6,'#b8bcc0');R(c,1.6,6,6.8,1,'#8a9096');R(c,1.6,10,6.8,1,'#8a9096')});
const wheelSpr=mkSpr(20,20,c=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(10,18.4,8,1.6,0,0,7);c.fill();R(c,9,6,2,12,'#6a4a2a');c.strokeStyle='#8a6a3a';c.lineWidth=1.2;c.beginPath();c.arc(10,8,7,0,7);c.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4;c.beginPath();c.moveTo(10,8);c.lineTo(10+Math.cos(a)*7,8+Math.sin(a)*7);c.stroke()}});
const arrowSign=(t,col)=>{const k='as'+t+col;return SPC[k]||(SPC[k]=mkSpr(30,24,c=>{R(c,14,10,2,14,'#6a4a2a');RR(c,2,2,26,10,2,col||'#8a5a2e');c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=.6;c.strokeRect(3.2,3.2,23.6,7.6);txt(c,t,15,9.4,'#fff8e0','bold 6px sans-serif')}))};
const busSpr=mkSpr(50,38,c=>{c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(25,35,24,2.4,0,0,7);c.fill();R(c,4,5,42,2.6,'#2d6cdf');R(c,5,7,2,28,'#6a7a8a');R(c,43,7,2,28,'#6a7a8a');R(c,5,7,40,20,'rgba(160,210,240,.33)');R(c,10,28,30,3,'#8a5a2e');R(c,12,31,2,4,'#333');R(c,36,31,2,4,'#333');R(c,14,0,22,5,'#2d6cdf');txt(c,'公車站',25,4.2,'#fff','bold 4px sans-serif');R(c,8,12,12,8,'#fff');txt(c,'307',14,18.6,'#2d6cdf','bold 5px sans-serif')});

// ── 放置工具 ──
const sw0=(x,y)=>{};
function lampAt(x,y){place(lampSpr,x,y,16,42,[x+5,y+37,6,4]);LAMPS.push([x+12.8,y+5])}
function benchAt(x,y){place(benchSpr,x,y,26,16,[x+1,y+8,24,6])}
// 路燈（H1 與 H2 兩側人行道、V1/V2）
for(let x=84;x<WW-40;x+=88){HRD.forEach(r=>{if(VRD.some(v=>x>v.x-SWK-14&&x<v.x+v.w+SWK+6))return;lampAt(x,r.y-SWK-46)});}
for(let x=84;x<WW-40;x+=88){HRD.forEach(r=>{if(VRD.some(v=>x>v.x-SWK-14&&x<v.x+v.w+SWK+6))return;lampAt(x,r.y+r.h+SWK-34)})}
for(let y=104;y<WH-40;y+=88){VRD.forEach(r=>{if(HRD.some(h=>y>h.y-SWK-30&&y<h.y+h.h+SWK+6))return;lampAt(r.x-SWK-11+(r.id=='V1'?14:0),y);lampAt(r.x+r.w+SWK-5,y)})}
// 電線桿與電線
const PTOP=[60,330,490,880,1040,1200,1360,1520],PBOT=[110,250,400,560,900,1100,1330,1560],PM=[640,1250];
PTOP.forEach(x=>{if(Math.abs(x-540)<22||Math.abs(x-1405)<22)x+=34;place(poleSpr,x,HRD[0].y-SWK-50,14,50,[x+4,HRD[0].y-SWK-6,6,4])});
PBOT.forEach(x=>place(poleSpr,x,HRD[0].y+HRD[0].h+SWK-14,14,50,[x+4,HRD[0].y+HRD[0].h+SWK+30,6,4]));
{const ty=HRD[0].y-SWK-47,by=HRD[0].y+HRD[0].h+SWK-11,pt=PTOP.map(x=>(Math.abs(x-540)<22||Math.abs(x-1405)<22)?x+34:x);
 for(let i=0;i<pt.length-1;i++)if(!(pt[i]<700&&pt[i+1]>700))WS.push([pt[i]+7,ty,pt[i+1]+7,ty]);else WS.push([pt[i]+7,ty,pt[i+1]+7,ty]);
 for(let i=0;i<PBOT.length-1;i++)WS.push([PBOT[i]+7,by,PBOT[i+1]+7,by]);
 [[pt[1],PBOT[2]],[pt[3],PBOT[4]],[pt[6],PBOT[6]]].forEach(q=>WS.push([q[0]+7,ty,q[1]+7,by]))}
// 垃圾桶、消防栓、信箱、販賣機
[[190,288],[620,288],[1230,288],[1640,288],[300,434],[420,680],[1000,680],[1270,680],[700,800],[1330,800],[520,1084]].forEach(q=>place(binSpr,q[0],q[1],9,11,[q[0],q[1]+5,9,6]));
[[676,304],[1308,300],[366,704],[1212,704],[790,1000]].forEach(q=>place(hydSpr,q[0],q[1],8,10));
[[262,676],[1480,676],[640,284]].forEach(q=>place(mailSpr,q[0],q[1],9,14,[q[0],q[1]+8,9,6]));
[[1,1]].length;
place(vendSpr,256,618,13,22,[256,632,13,8]);place(vendSpr,1494,618,13,22,[1494,632,13,8]);place(vendSpr,1184,618,13,22,[1184,632,13,8]);place(vendSpr,1590,886,13,22,[1590,900,13,8]);
// 公車亭與長椅
place(busSpr,580,268,50,38,[580,292,50,8]);place(busSpr,1080,438,50,38,[1080,462,50,8]);place(busSpr,806,740,50,38,[806,764,50,8]);
[[1100,438+0]].length;
// 警察崗亭（路口交通指揮）
place(boothSpr,656,264,20,32,[656,288,20,8]);
// 各建築前庭裝飾
const SCC=['#e8e8e8','#222','#c0392b','#2f80ed','#9aa0a6','#f08cb6','#f0b030','#2a9d5c'];
function scRow(x0,y0,n,gap){for(let i=0;i<n;i++){const xx=x0+i*(gap||13),yy=y0+(i%2)*1;place(scSpr(SCC[(x0+i*3)%8],i%3==0?SCC[(i+2)%8]:null),xx,yy,24,15,[xx+2,yy+5,19,9])}}
// （停車格由 f06b 依各建築出入口自動規劃）
// 各店前庭小物
const plantsAt=[[160,640],[238,640],[40,640],[124,640],[274,640],[368,640],[438,640],[508,640],[540,640],[640,640],[1048,640],[1180,640],[1332,640],[1452,640],[1490,640],[1590,640],[36,990],[236,990],[296,990],[396,990],[496,990],[584,990],[446,262],[626,262],[1336,262],[1464,262],[1516,262],[1634,262],[1066,262],[1176,262]];
plantsAt.forEach(q=>place(plantSpr,q[0],q[1]+2,12,13));
place(sandSpr('營業中','#d9452f'),182,658,14,16);place(sandSpr('MENU','#2a1a10'),503,658,14,16);place(sandSpr('特價','#2d6cdf'),255,972,14,16);place(sandSpr('入場','#7a1a2a'),1036,666,14,16);place(sandSpr('歡迎','#1f4fa3'),1383,284,14,16);
place(tableSpr('#2f6a4a'),438,660,34,34,[444,676,22,8]);place(tableSpr('#e8b23a'),510,660,34,34,[516,676,22,8]);
place(stoolSet,1492,666,40,22,[1494,674,36,10]);place(stoolSet,1548,670,40,22,[1550,678,36,10]);
for(let i=0;i<3;i++)place(cartSpr,246+i*3,960+i*0,14,12);
// 長椅
[[864,126],[1000,126],[868,170],[995,170],[830,255],[1010,255],[470,276],[96,740],[1100,712],[1340,712]].forEach(q=>benchAt(q[0],q[1]));
[[200,284],[1388,284]].forEach(q=>benchAt(q[0],q[1]));
// 廟前：石獅、香爐、旗桿
place(lionSpr,1070,262,12,16,[1070,268,12,8]);place(lionSpr,1170,262,12,16,[1170,268,12,8]);place(burnerSpr,1117,276,18,20,[1119,284,14,10]);
// 公園：遊樂設施
place(swingSpr,PARK.x+PARK.w-60,PARK.y+70,40,32,[PARK.x+PARK.w-60,PARK.y+98,40,6]);place(slideSpr,PARK.x+PARK.w-36,PARK.y+98,34,36,[PARK.x+PARK.w-32,PARK.y+126,28,8]);place(seesawSpr,PARK.x+PARK.w-60,PARK.y+108,30,14,[PARK.x+PARK.w-58,PARK.y+114,26,6]);
// 農場裝飾
place(fkSpr,F.x-30,F.y+66,18,24,[F.x-28,F.y+84,12,6]);
place(haySpr,1560,1000,22,16,[1560,1008,22,8]);place(haySpr,1580,1004,22,16,[1580,1010,22,8]);place(haySpr,1546,1006,22,16);
[[1548,944],[1552,956],[1708,944]].forEach(q=>place(milkSpr,q[0],q[1],10,14));
place(wheelSpr,FP.x+FP.w+2,FP.y+10,20,20,[FP.x+FP.w+4,FP.y+22,16,6]);place(wheelSpr,FP.x-24,FP.y+30,20,20,[FP.x-22,FP.y+42,16,6]);
place(arrowSign('釣魚池','#2a7ab0'),FP.x-6,FP.y-34,30,24,[FP.x+6,FP.y-18,6,6]);place(arrowSign('雞鴨區','#a06a2a'),COOP.x-18,COOP.y-30,30,24,[COOP.x-6,COOP.y-14,6,6]);place(arrowSign('羊咩咩','#6a8a3a'),SHEEP.x-6,SHEEP.y-30,30,24,[SHEEP.x+6,SHEEP.y-14,6,6]);place(arrowSign('菜園','#4a7a3a'),F.x-34,F.y-28,30,24,[F.x-22,F.y-12,6,6]);
// 夜市裝飾：燈籠與燈串
{const ys=[858,982];ys.forEach(yy=>{s.strokeStyle='rgba(30,25,25,.6)';s.lineWidth=.5;s.beginPath();s.moveTo(MARKET.x+14,yy);s.quadraticCurveTo(MARKET.x+MARKET.w/2,yy+10,MARKET.x+MARKET.w-14,yy);s.stroke();
 for(let i=0;i<=22;i++){const t=i/22,bx=MARKET.x+14+t*(MARKET.w-28),by=yy+Math.sin(t*Math.PI)*5.2+.6;s.fillStyle=['#ffd84a','#ff7a5a','#fff3b0','#8ae0ff'][i%4];s.beginPath();s.arc(bx,by+1.5,1.3,0,7);s.fill();BULBS.push([bx,by+1.5])}})}

// ── 樹木（多種類、高矮不一、開花）──
const TC=[['#2d7436','#3f9a46','#7bd464'],['#d4608f','#f08cb6','#ffd3e4'],['#3a7a3a','#58a844','#a0dc70'],['#1f5a3a','#2f7d4f','#5fb078'],['#2f6a30','#46903c','#8ed26a'],['#3d8a3a','#5cb04a','#a6e27a'],['#c0561f','#e5802f','#ffc062'],['#d6a81e','#f2cc3a','#fff0a0']];
const TSP={};
function blob(c,x,y,r,col){const g2=c.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);g2.addColorStop(0,col[2]);g2.addColorStop(.55,col[1]);g2.addColorStop(1,col[0]);c.fillStyle=g2;c.beginPath();c.arc(x,y,r,0,7);c.fill()}
function treeSpriteProc(k,v){const key=k+'_'+v;if(TSP[key])return TSP[key];const cv2=document.createElement('canvas');cv2.width=Math.ceil(48*SK);cv2.height=Math.ceil(66*SK);const c=cv2.getContext('2d');c.scale(SK,SK);const col=TC[k],cx=24,B0=60,r2=Math.sin(v*7.3+1)*.5;
 const shadow=(w)=>{c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(cx+2,B0-1,w,w*.34,0,0,7);c.fill()};
 const trunk=(h,w,x0)=>{const tg=c.createLinearGradient(cx-w/2,0,cx+w/2,0);tg.addColorStop(0,'#8a5a30');tg.addColorStop(1,'#5a3a1a');c.fillStyle=tg;c.fillRect(cx-w/2+(x0||0),B0-h,w,h)};
 const spark=(n,x0,y0,w,h)=>{for(let i=0;i<n;i++){c.fillStyle='rgba(255,255,255,.2)';c.beginPath();c.arc(x0+((i*37+v*11)%w),y0+((i*19+v*7)%h),1.1,0,7);c.fill()}};
 if(k==3){ // 高松柏
  shadow(10);trunk(8,4);
  for(let i=0;i<5;i++){const y=B0-8-i*10,w=15-i*2.4;const g=c.createLinearGradient(cx-w,0,cx+w,0);g.addColorStop(0,col[0]);g.addColorStop(.5,col[1]);g.addColorStop(1,col[0]);c.fillStyle=g;c.beginPath();c.moveTo(cx,y-17);c.quadraticCurveTo(cx+w*.8,y-6,cx+w,y);c.quadraticCurveTo(cx,y+3,cx-w,y);c.quadraticCurveTo(cx-w*.8,y-6,cx,y-17);c.fill()}
 }else if(k==4){ // 細高白楊
  shadow(8);trunk(10,3.6);
  [[0,-14,7],[0,-26,8],[0,-38,8],[0,-48,6.4],[r2,-54,4.6]].forEach(b=>blob(c,cx+b[0],B0+b[1],b[2],col));
  spark(5,cx-6,B0-50,12,40);
 }else if(k==5){ // 矮灌木+花叢
  shadow(12);const fl=['#ff6a8a','#ffd23a','#ffffff','#ff9a3a','#c26aff'][v%5];
  blob(c,cx-6,B0-7,7,col);blob(c,cx+6,B0-7,7,col);blob(c,cx,B0-11,8,col);
  for(let i=0;i<11;i++){c.fillStyle=i%3?fl:'#fff4c0';c.beginPath();c.arc(cx-11+((i*53+v*13)%23),B0-15+((i*29+v*5)%14),1.3,0,7);c.fill()}
 }else if(k==1||k==7||k==6){ // 開花/銀杏/楓
  shadow(13);trunk(17,5);c.strokeStyle='#6a4524';c.lineWidth=2;c.beginPath();c.moveTo(cx,B0-12);c.lineTo(cx-7,B0-24);c.moveTo(cx,B0-14);c.lineTo(cx+7,B0-26);c.stroke();
  [[0,-30,11],[-9,-26,8],[9,-26,8],[-5,-38,8],[5,-37,8],[r2*3,-44,6]].forEach(b=>blob(c,cx+b[0],B0+b[1],b[2],col));
  spark(7,cx-14,B0-48,26,26);
  if(k==1){c.fillStyle='#fff';for(let i=0;i<9;i++){c.beginPath();c.arc(cx-14+((i*47+v*9)%28),B0-48+((i*31+v*5)%26),.9,0,7);c.fill()}
   c.fillStyle='#f6a8c8';for(let i=0;i<8;i++){c.beginPath();c.arc(cx-13+i*3.6,B0-1+(i%2),.9,0,7);c.fill()}}
 }else{ // 0,2 圓冠闊葉：矮胖 / 中型
  const sm=k==2;shadow(sm?10:13);trunk(sm?14:19,sm?4:5.4);
  const o=sm?-6:0;
  (sm?[[0,-22,9],[-7,-19,7],[7,-19,7],[-3,-29,7],[4,-28,6.4]]:[[0,-24,12],[-9,-21,9],[9,-21,9],[-4+r2*2,-33,9],[5,-32,9],[r2*3,-39,7]]).forEach(b=>blob(c,cx+b[0],B0+b[1]+o*0,b[2],col));
  spark(7,cx-14,B0-(sm?34:46),26,sm?18:24);
 }
 return TSP[key]=cv2}
const TH={0:[.95,1,1.1,1.2],1:[.9,1,1.08,1],2:[.9,1.05,1,1.1],3:[1,1.12,.95,1.2],4:[1,1.1,.95,1.2],5:[1,1,1,1],6:[.95,1,1.1,1],7:[1,1.1,1,.95]};
const trees=[];
const TMIX=[0,3,1,2,4,5,0,6,2,7,3,5];
function tr(bx,by,k){const hv=((bx*7+by*3)|0);if(k==null||k<0)k=TMIX[Math.abs(hv>>2)%TMIX.length];const t={x:bx-14,y:by-36,w:28,h:36,k:k,sc:TH[k][Math.abs(hv)&3]};t.v=hv&3;trees.push(t);if(k!=5)sol(t.x+10,t.y+28,9,8);else sol(t.x+8,t.y+28,13,6)}
function treeRow(ax,fixed,a,b,step,k,skip){for(let v=a;v<=b;v+=step){if(skip&&skip(v))continue;ax=='x'?tr(v,fixed,k):tr(fixed,v,k)}}
const doorsX={r1:B.filter(b=>b.bot==262).map(b=>b.x+b.dx),r2:B.filter(b=>b.bot==640).map(b=>b.x+b.dx)};
const noV=v=>VRD.some(r=>v>r.x-SWK-22&&v<r.x+r.w+SWK+22);
treeRow('x',298,40,WW-40,88,-1,v=>noV(v)||doorsX.r1.some(d=>Math.abs(v-d)<24)||Math.abs(v-210)<40);
treeRow('x',446,40,WW-40,88,-1,v=>noV(v)||(v>380&&v<435));
treeRow('x',690,40,WW-40,88,-1,v=>noV(v)||doorsX.r2.some(d=>Math.abs(v-d)<24)||(v>380&&v<435));
treeRow('x',808,40,WW-40,88,-1,v=>noV(v)||(v>430&&v<480)||(v>1300&&v<1440));
treeRow('y',1318,60,WH-50,88,-1,v=>HRD.some(h=>v>h.y-SWK-26&&v<h.y+h.h+SWK+30));
// 公園與周邊
[[826,52],[1030,50],[826,268],[1030,268],[884,44],[970,44],[880,262],[978,262],[1024,160],[820,160],[1000,200],[848,200]].forEach(q=>tr(q[0],q[1],-1));
// 操場外圍
[[18,70],[18,140],[18,210],[412,70],[412,150],[412,226],[100,24],[330,24]].forEach(q=>tr(q[0],q[1],-1));
// 住宅區零星
[[16,454],[396,456],[16,780]].forEach(q=>tr(q[0],q[1],-1));
// 農場
[[1790,840],[1790,900],[1790,960],[1716,846],[1740,900],[1480,806+54],[1550,1000],[1540,1100],[1704,992]].forEach((q,i)=>tr(q[0],q[1],-1));
[[1320,1060],[1320,1120],[1400,1148],[1520,1148],[1760,1150],[1640,1148]].forEach(q=>tr(q[0],q[1],-1));
// 夜市外圍
[[812,812],[1196,812],[812,1152],[1196,1152],[1000,1150]].forEach(q=>tr(q[0],q[1],-1));
// 移除與擺設重疊的樹
for(let i=trees.length-1;i>=0;i--){const t=trees[i];const box={x:t.x+4,y:t.y+10,w:20,h:30};
 if(DEC.some(d=>hit({x:t.x+6,y:t.y+18,w:16,h:20},{x:d.x,y:d.y,w:d.w,h:d.h}))||B.concat(BD).some(b=>hit({x:t.x+8,y:t.y+26,w:12,h:12},{x:b.x-6,y:b.y,w:b.w+12,h:b.h+8}))||AL.some(a=>hit({x:t.x+8,y:t.y+26,w:12,h:12},a))){const j=solids.findIndex(o=>o.x==t.x+10&&o.y==t.y+28&&o.w==9);if(j>=0)solids.splice(j,1);trees.splice(i,1)}}

// ── 圍籬 ──
const FNS=[];function fence(x,y,w,h,k){FNS.push({x,y,w,h});sol(x,y,w,h);
 if(k=='mesh'){w>h?fenceMesh(s,x,y-6,w,9):R(s,x,y,3,h,'#6a7a7a')}
 else if(k=='hedge'){w>h?(RR(s,x,y-4,w,9,3,'#3f8a3a'),RR(s,x,y-4,w,3,2,'#58a844')):RR(s,x,y,6,h,3,'#3f8a3a')}
 else w>h?fenceH(s,x,y-4,w):fenceV(s,x,y,h)}
// 操場

// 公園矮樹籬
fence(PARK.x,PARK.y+PARK.h-6,98,8,'hedge');fence(PARK.x+PARK.w-92,PARK.y+PARK.h-6,92,8,'hedge');fence(PARK.x,PARK.y+PARK.h-6,6,0.1,'hedge');
// 農場外圍
fence(FARM.x+2,FARM.y,114,6);fence(1466,FARM.y,334,6);fence(FARM.x+2,FARM.y,5,FARM.h);fence(FARM.x,FARM.y+FARM.h-8,FARM.w,6);fence(FARM.x+FARM.w-6,FARM.y,5,FARM.h);
// 菜園
fence(F.x-12,F.y-14,F.w/2+4,6);fence(F.x+F.w/2+34,F.y-14,F.w/2-20,6);fence(F.x-12,F.y+F.h+8,F.w/2-12,6);fence(F.x+F.w/2+22,F.y+F.h+8,F.w/2-4,6);fence(F.x-12,F.y-14,5,F.h+28);fence(F.x+F.w+8,F.y-14,5,F.h+28);
// 養殖池欄杆
fence(FP.x-12,FP.y+FP.h+8,FP.w+24,5,'');fence(FP.x-12,FP.y-6,5,FP.h+16);fence(FP.x+FP.w+8,FP.y-6,5,FP.h+16);fence(FP.x-12,FP.y-12,FP.w/2-10,5);fence(FP.x+FP.w/2+12,FP.y-12,FP.w/2,5);
// 雞鴨園
fence(COOP.x-4,COOP.y-4,COOP.w/2-12,5);fence(COOP.x+COOP.w/2+12,COOP.y-4,COOP.w/2+8,5);fence(COOP.x-4,COOP.y+COOP.h,COOP.w+8,5);fence(COOP.x-4,COOP.y-4,5,COOP.h+8);fence(COOP.x+COOP.w,COOP.y-4,5,COOP.h+8);
// 羊圈
fence(SHEEP.x-4,SHEEP.y-4,SHEEP.w+8,5);fence(SHEEP.x-4,SHEEP.y+SHEEP.h,SHEEP.w+8,5);fence(SHEEP.x+SHEEP.w,SHEEP.y-4,5,SHEEP.h+8);fence(SHEEP.x-4,SHEEP.y-4,5,SHEEP.h/2-16);fence(SHEEP.x-4,SHEEP.y+SHEEP.h/2+16,5,SHEEP.h/2+8);
// 噴水池（公園中央）與涼亭柱子
sol(927-22,150-22,44,44);sol(842,96,5,5);sol(876,96,5,5);sol(842,110,5,5);sol(876,110,5,5);
// 建築本體碰撞
B.concat(BD).forEach(b=>sol(b.x,b.y,b.w,b.h));
// 池塘與動物欄、花圃
sol(FP.x-2,FP.y,FP.w+4,FP.h+2);
[[PARK.x+34,PARK.y+36],[PARK.x+PARK.w-70,PARK.y+36],[PARK.x+34,PARK.y+PARK.h-64],[PARK.x+PARK.w-70,PARK.y+PARK.h-64]].forEach(q=>sol(q[0]-3,q[1],46,28));
sol(COOP.x+COOP.w/2-18,COOP.y+4,36,20);
// 公園噴水池與涼亭（靜態部分）
{const fx=927,fy=150;s.fillStyle='rgba(0,0,0,.25)';s.beginPath();s.ellipse(fx+2,fy+3,25,19,0,0,7);s.fill();
 const bg=s.createLinearGradient(fx-24,fy-20,fx+24,fy+20);bg.addColorStop(0,'#cfd0cc');bg.addColorStop(1,'#8a8c88');s.fillStyle=bg;s.beginPath();s.ellipse(fx,fy,24,18,0,0,7);s.fill();
 const wg=s.createRadialGradient(fx-6,fy-4,2,fx,fy,20);wg.addColorStop(0,'#bfeaff');wg.addColorStop(1,'#4aa6d8');s.fillStyle=wg;s.beginPath();s.ellipse(fx,fy,20,14.5,0,0,7);s.fill();
 R(s,fx-3,fy-7,6,12,'#b8bab4');R(s,fx-5,fy+3,10,3,'#a8aaa4')}
{const gx=862,gy=106;[[-22,-4],[20,-4],[-22,10],[20,10]].forEach(q=>{R(s,gx+q[0],gy+q[1]-24,3.4,28,'#a82820');R(s,gx+q[0]-.6,gy+q[1]+2,4.6,2,'#6a1a14')});
 s.fillStyle='#2f8a6a';s.beginPath();s.moveTo(gx-34,gy-22);s.quadraticCurveTo(gx-30,gy-32,gx-12,gy-36);s.lineTo(gx+12,gy-36);s.quadraticCurveTo(gx+30,gy-32,gx+34,gy-22);s.lineTo(gx+26,gy-18);s.lineTo(gx-26,gy-18);s.fill();
 for(let i=-30;i<30;i+=4)R(s,gx+i,gy-34+Math.abs(i)*.18,2,14,'rgba(0,0,0,.18)');R(s,gx-34,gy-20,68,2.4,'#ffd84a');R(s,gx-1.4,gy-42,2.8,8,'#ffd84a');
 R(s,gx-12,gy-6,24,8,'#8a5a2e');R(s,gx-12,gy-6,24,2,'#b8844a');R(s,gx-4,gy-2,4,3,'#fff');R(s,gx+2,gy-3,4,3,'#222');R(s,gx-14,gy+2,4,4,'#5a3418');R(s,gx+10,gy+2,4,4,'#5a3418')}
// 學校旗桿、操場計分板
R(s,566,200,1.6,62,'#aab0b6');R(s,567.2,201,16,10,'#d9452f');R(s,567.2,201,16,2,'rgba(255,255,255,.4)');
// 大型指示牌
signBoard(1384,816,34,10,'休閒農場','#4a7a3a','#fff8e0',6,{glow:0});
signBoard(FIELD.x+160,28,108,10,'市立運動場','#14803e','#fff',7,{glow:0});
// 籃框、單槓、足球與長椅
{const hoopSpr=mkSpr(16,34,c=>{R(c,7.2,10,1.8,22,'#8a8f98');R(c,6.4,30,3.4,2.4,'#555');RR(c,1,1,11,9,1,'#f4f6f8');R(c,1,1,11,.8,'#aaa');R(c,1,9,11,.8,'#aaa');R(c,3.6,3,6,4.2,'rgba(220,60,40,.8)');c.strokeStyle='#e8541f';c.lineWidth=1;c.beginPath();c.ellipse(5.8,10.6,3.4,1.2,0,0,7);c.stroke();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=.4;for(let i=0;i<4;i++){c.beginPath();c.moveTo(3+i*1.5,11);c.lineTo(4+i,14);c.stroke()}});
 place(hoopSpr,352,32,16,34,[358,60,5,5]);place(hoopSpr,352,214,16,34,[358,242,5,5]);
 const ball=mkSpr(7,7,c=>{c.fillStyle='#e8762a';c.beginPath();c.arc(3.5,3.5,3,0,7);c.fill();c.strokeStyle='#5a2a10';c.lineWidth=.4;c.beginPath();c.moveTo(.6,3.5);c.lineTo(6.4,3.5);c.moveTo(3.5,.6);c.lineTo(3.5,6.4);c.stroke()});
 place(ball,366,140,5,5);
 const sball=mkSpr(7,7,c=>{c.fillStyle='#fff';c.beginPath();c.arc(3.5,3.5,3,0,7);c.fill();c.strokeStyle='#222';c.lineWidth=.5;c.stroke();c.fillStyle='#222';c.beginPath();c.arc(3.5,3.5,1.2,0,7);c.fill()});
 place(sball,FIELD.cx+6,FIELD.cy+4,5,5);
 const pbar=mkSpr(20,30,c=>{R(c,1.5,4,1.6,26,'#7b8590');R(c,16.9,4,1.6,26,'#7b8590');R(c,.5,3,19,1.8,'#c8ced6');R(c,.5,3,19,.6,'#fff');R(c,.4,29,3.6,1.2,'#555');R(c,15.8,29,3.6,1.2,'#555')});
 
 const bench=mkSpr(22,12,c=>{R(c,2,5,18,2.4,'#b8844a');R(c,2,2,18,2,'#a07038');R(c,3,7,1.6,4,'#444');R(c,17.4,7,1.6,4,'#444')});
 place(bench,336,222,22,12,[336,228,22,4]);place(bench,364,222,22,12,[364,228,22,4]);
 // 橫桿與雙槓：低矮示意
 const par=mkSpr(24,12,c=>{R(c,2,3,1.4,8,'#666');R(c,20.6,3,1.4,8,'#666');R(c,1,2,22,1.2,'#d33');R(c,1,5,22,1.2,'#d33')});
 place(par,348,222-34,24,12,[348,196,24,4])}
