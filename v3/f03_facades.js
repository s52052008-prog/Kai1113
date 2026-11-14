/* ===== v9：建築外觀 ===== */
const WIN=[],SIGNS=[];
const hx2=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const shade=(h,a)=>{const c=hx2(h);return `rgb(${clamp(c[0]+a,0,255)|0},${clamp(c[1]+a,0,255)|0},${clamp(c[2]+a,0,255)|0})`};
function wallBody(b,col,tex){const{x,y,w,h}=b;
 s.save();s.shadowColor='rgba(30,18,5,.5)';s.shadowBlur=4*KS;s.shadowOffsetX=2.2*KS;s.shadowOffsetY=2.6*KS;R(s,x,y,w,h,'#000');s.restore();
 GR(s,x,y,w,h,shade(col,14),shade(col,-16));
 if(tex=='brick'){for(let yy=0,k=0;yy<h;yy+=4,k++){R(s,x,y+yy,w,.7,'rgba(0,0,0,.14)');for(let xx=k%2?3:0;xx<w;xx+=6)R(s,x+xx,y+yy,.7,4,'rgba(0,0,0,.1)')}}
 else if(tex=='tile'){for(let yy=0;yy<h;yy+=7)R(s,x,y+yy,w,.5,'rgba(0,0,0,.09)');for(let xx=0;xx<w;xx+=7)R(s,x+xx,y,.5,h,'rgba(0,0,0,.07)')}
 else if(tex=='siding'){for(let yy=0;yy<h;yy+=3.5){R(s,x,y+yy,w,.6,'rgba(0,0,0,.12)');R(s,x,y+yy+.6,w,.5,'rgba(255,255,255,.1)')}}
 else {for(let i=0;i<w*h/22;i++)R(s,x+rnd()*w,y+rnd()*h,1.6,1,i%2?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)')}
 R(s,x,y,2.4,h,'rgba(255,255,255,.12)');R(s,x+w-3,y,3,h,'rgba(0,0,0,.22)');R(s,x,y+h-4,w,4,'rgba(0,0,0,.2)');R(s,x,y+h-4,w,.8,'rgba(255,255,255,.15)');
 s.strokeStyle='rgba(30,15,0,.55)';s.lineWidth=.9;s.strokeRect(x+.5,y+.5,w-1,h-1)}
function roofFlat(b,col,hh,o){const{x,y,w}=b,h=hh||12;GR(s,x-2,y-1,w+4,h,shade(col,22),shade(col,-6));R(s,x-2,y+h-1,w+4,2.4,'rgba(0,0,0,.35)');R(s,x-2,y-1,w+4,1.2,'rgba(255,255,255,.35)');
 if(!o||!o.nobl)for(let xx=x+3;xx<x+w-3;xx+=9)R(s,xx,y+2,5,h-6,'rgba(255,255,255,.08)')}
function roofTile(b,col,hh,o){const{x,y,w}=b,h=hh||30;
 s.fillStyle=col;s.beginPath();s.moveTo(x-4,y+h);s.lineTo(x+7,y-2);s.lineTo(x+w-7,y-2);s.lineTo(x+w+4,y+h);s.fill();
 s.save();s.beginPath();s.moveTo(x-4,y+h);s.lineTo(x+7,y-2);s.lineTo(x+w-7,y-2);s.lineTo(x+w+4,y+h);s.clip();
 for(let yy=0,k=0;yy<h;yy+=4,k++){for(let xx=x-6+(k%2?3:0);xx<x+w+6;xx+=6){R(s,xx,y+yy,5.4,3.4,'rgba(255,255,255,'+(.1+((xx*3+yy)%5)*.02)+')');R(s,xx,y+yy+2.6,5.4,1,'rgba(0,0,0,.28)')}}
 GR(s,x-6,y-2,w+12,h+3,'rgba(255,255,255,.14)','rgba(0,0,0,.18)');s.restore();
 R(s,x+7,y-3,w-14,2.2,shade(col,-30));R(s,x+7,y-3,w-14,.8,'rgba(255,255,255,.4)');R(s,x-4,y+h,w+8,2.6,'rgba(0,0,0,.4)');R(s,x-4,y+h-.6,w+8,.9,'rgba(255,255,255,.2)')}
function win(x,y,w,h,o){o=o||{};const fr=o.fr||'#f4efe6';
 R(s,x-1.6,y-1.6,w+3.2,h+3.2,'rgba(0,0,0,.3)');R(s,x-1.2,y-1.2,w+2.4,h+2.4,fr);
 const g2=s.createLinearGradient(x,y,x+w,y+h);g2.addColorStop(0,o.g1||'#bfe6f7');g2.addColorStop(.55,o.g2||'#6fb2da');g2.addColorStop(1,o.g3||'#4a8fc0');s.fillStyle=g2;s.fillRect(x,y,w,h);
 if(o.cur){R(s,x,y,w*.28,h,o.cur);R(s,x+w*.72,y,w*.28,h,o.cur);R(s,x,y,w,1.4,o.cur)}
 s.fillStyle='rgba(255,255,255,.35)';s.beginPath();s.moveTo(x+1,y+h-1);s.lineTo(x+w*.45,y+1);s.lineTo(x+w*.6,y+1);s.lineTo(x+w*.12,y+h-1);s.fill();
 if(!o.nomul){R(s,x+w/2-.5,y,1,h,fr);if(h>14)R(s,x,y+h*.45,w,.9,fr)}
 R(s,x-2,y+h+1.2,w+4,1.8,'#9a8a70');R(s,x-2,y+h+1.2,w+4,.6,'rgba(255,255,255,.4)');
 if(o.ac){R(s,x+w+2.5,y+h-6,8,6.5,'#e4e8ea');R(s,x+w+3.2,y+h-3.6,6.6,.8,'#9aa4aa');R(s,x+w+4.5,y+h-2,1,1,'#8ab0d0')}
 if(o.pl){R(s,x-1,y+h+3,w+2,3,'#8a5a2e');for(let i=0;i<Math.floor(w/4);i++){s.fillStyle=['#3f9a46','#4fae3b','#2f8a3a'][i%3];s.beginPath();s.arc(x+2+i*4,y+h+2.4,2,0,7);s.fill();if(i%2)R(s,x+1.4+i*4,y+h+.4,1.4,1.4,['#ff7a9a','#ffd84a'][i%2*0|i>>1&1])}}
 if(o.bars){s.fillStyle='#3a3a3a';for(let gx=0;gx<=w;gx+=3)s.fillRect(x+gx,y,.7,h);s.fillRect(x,y+h/2,w,.7)}
 WIN.push([x,y,w,h,o.nm||'',o.fl||0,o.always])}
function glassFront(x,y,w,h,o){o=o||{};R(s,x-1.5,y-1.5,w+3,h+3,o.fr||'#3a3a3a');GR(s,x,y,w,h,o.g1||'#bfe6f7',o.g2||'#5a9ac8');
 if(o.inside){R(s,x,y,w,h,o.inside)}
 if(o.shelves){for(let j=0;j<o.shelves;j++){const yy=y+h*.25+j*(h*.62/o.shelves);R(s,x+1,yy+h*.12,w-2,1,'#7a8a9a');for(let xx=x+2;xx<x+w-3;xx+=4)R(s,xx,yy+h*.12-3.4,3,3.4,['#e0443a','#f2c230','#2a9d5c','#2f80ed','#fff','#e0679a'][((xx*7|0)+j)%6])}}
 s.fillStyle='rgba(255,255,255,.28)';s.beginPath();s.moveTo(x+2,y+h);s.lineTo(x+w*.35,y);s.lineTo(x+w*.5,y);s.lineTo(x+w*.17,y+h);s.fill();s.beginPath();s.moveTo(x+w*.55,y+h);s.lineTo(x+w*.8,y);s.lineTo(x+w*.86,y);s.lineTo(x+w*.61,y+h);s.fill();
 if(o.mull)for(let xx=x+o.mull;xx<x+w-1;xx+=o.mull)R(s,xx,y,1,h,o.fr||'#3a3a3a');
 WIN.push([x,y,w,h,o.nm||'',0,1])}
function doorGlass(b,o){o=o||{};const dw=b.dw,dh=o.dh||27,dx=b.x+b.dx-dw/2,dy=b.y+b.h-dh;
 R(s,dx-3,dy-3,dw+6,dh+3,o.frame||'#2a2a30');R(s,dx-1.6,dy-1.6,dw+3.2,dh+1.6,o.frame2||'#6a6a74');
 GR(s,dx,dy,dw,dh,'#bfe6f7','#4a8ab8');R(s,dx+dw/2-.6,dy,1.2,dh,o.frame||'#2a2a30');
 s.fillStyle='rgba(255,255,255,.3)';s.beginPath();s.moveTo(dx+1,dy+dh);s.lineTo(dx+dw*.35,dy);s.lineTo(dx+dw*.5-1,dy);s.lineTo(dx+dw*.16,dy+dh);s.fill();
 R(s,dx+dw/2-3,dy+dh*.5,1.2,6,'#ddd');R(s,dx+dw/2+1.8,dy+dh*.5,1.2,6,'#ddd');
 R(s,dx-4,b.y+b.h-2,dw+8,2,'#8a8a90');R(s,dx-2,b.y+b.h-1,dw+4,1,'#6a6a70');
 R(s,dx+2,b.y+b.h+1,dw-4,3,'#3a3a44');for(let i=0;i<dw-4;i+=2)R(s,dx+2+i,b.y+b.h+1,.8,3,'#55555e');
 WIN.push([dx,dy,dw,dh,'',0,1])}
function doorWood(b,o){o=o||{};const dw=b.dw,dh=o.dh||26,dx=b.x+b.dx-dw/2,dy=b.y+b.h-dh;
 R(s,dx-3,dy-3,dw+6,dh+3,'#3a2210');GR(s,dx,dy,dw,dh,o.c1||'#9a6a38',o.c2||'#6f4524');
 R(s,dx+2,dy+2.5,dw/2-3,dh*.38,'rgba(0,0,0,.22)');R(s,dx+dw/2+1,dy+2.5,dw/2-3,dh*.38,'rgba(0,0,0,.22)');R(s,dx+2,dy+dh*.5,dw/2-3,dh*.42,'rgba(0,0,0,.14)');R(s,dx+dw/2+1,dy+dh*.5,dw/2-3,dh*.42,'rgba(0,0,0,.14)');
 R(s,dx+dw/2-.5,dy,1,dh,'rgba(0,0,0,.4)');R(s,dx+dw-4.5,dy+dh*.55,2,2,'#ffd84a');R(s,dx-4,b.y+b.h-2,dw+8,2.2,'#8a7a64');R(s,dx-2.4,b.y+b.h-.4,dw+4.8,1.4,'#6a5a48');
 R(s,dx-2,b.y+b.h+1,dw+4,3,'#7a2a2a');R(s,dx-2,b.y+b.h+1,dw+4,.8,'#a84a4a')}
function awning(x,y,w,c1,c2,d,n){d=d||9;n=n||Math.round(w/5);const sw=w/n;
 for(let i=0;i<n;i++){R(s,x+i*sw,y,sw+.2,d,i%2?c1:c2);s.fillStyle=i%2?c1:c2;s.beginPath();s.arc(x+i*sw+sw/2,y+d,sw/2,0,Math.PI);s.fill()}
 GR(s,x,y,w,d+2,'rgba(255,255,255,.25)','rgba(0,0,0,.12)');R(s,x,y-1.2,w,1.4,'rgba(0,0,0,.4)');R(s,x,y+d+sw/2,w,2,'rgba(0,0,0,.12)')}
function signBoard(x,y,w,h,t,bg,fg,fs,o){o=o||{};s.save();s.shadowColor='rgba(0,0,0,.4)';s.shadowBlur=1.6*KS;s.shadowOffsetY=1*KS;RR(s,x,y,w,h,o.r??1.5,bg);s.restore();
 GR(s,x,y,w,h/2,'rgba(255,255,255,.22)','rgba(255,255,255,0)');if(o.bd){s.strokeStyle=o.bd;s.lineWidth=.9;s.strokeRect(x+.9,y+.9,w-1.8,h-1.8)}
 txt(s,t,x+w/2,y+h/2+(fs||9)*.36,fg,`bold ${fs||9}px sans-serif`);if(o.glow!==0)SIGNS.push([x,y,w,h,bg])}
const NMS=(b,fs)=>b.sg;
function wgrid(b,y0,rows,rh,o){o=o||{};const{x,w}=b,pitch=o.pitch||26,cols=Math.max(1,Math.floor((w-14)/pitch)),gap=(w-cols*(o.ww||16))/(cols+1);
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const wx0=x+gap+c*((o.ww||16)+gap),wy=y0+r*rh;if(o.skip&&o.skip(wx0,wy,r,c))continue;
  const k=(wx0*7+wy*13)|0;win(wx0,wy,o.ww||16,o.wh||rh-9,{nm:b.n,fl:r,cur:o.cur&&k%3==0?o.cur:'',ac:o.ac!==false&&k%4==0,pl:o.pl&&k%3==1,bars:o.bars&&k%2==0,fr:o.fr,g1:o.g1,g2:o.g2,g3:o.g3,nomul:o.nomul})}}
const lantern=(x,y,col)=>{R(s,x-.5,y-5,1,5,'#3a2210');s.fillStyle=col||'#e0301f';s.beginPath();s.ellipse(x,y+3,3,3.8,0,0,7);s.fill();R(s,x-2,y-.4,4,1,'#ffd84a');R(s,x-2,y+6,4,1,'#ffd84a');s.fillStyle='rgba(255,255,255,.35)';s.beginPath();s.ellipse(x-1,y+2,.9,1.6,0,0,7);s.fill();SIGNS.push([x-3,y,6,7,'#ff6a3a'])};
const acUnit=(x,y)=>{R(s,x,y,12,8,'#e4e8ea');R(s,x,y,12,1.2,'#fff');R(s,x+1.5,y+3,9,.8,'#9aa4aa');R(s,x+1.5,y+5,9,.8,'#9aa4aa');R(s,x+3,y+8,1,2.4,'rgba(80,150,200,.5)')};

const STY={};
STY.house=b=>{const{x,y,w,h}=b;wallBody(b,b.c,'plaster');R(s,x+w-30,y-12,11,18,'#8a5a4a');R(s,x+w-31,y-14,13,3,'#6a3a2a');roofTile(b,b.r,36);
 wgrid(b,y+44,1,26,{pitch:34,ww:17,wh:17,cur:'#e8a0a8',pl:1,ac:1});
 win(x+10,y+h-50,18,20,{nm:b.n,pl:1,cur:'#e8a0a8'});win(x+w-28,y+h-50,18,20,{nm:b.n,pl:1,cur:'#e8a0a8'});
 doorWood(b);RR(s,x+b.dx-14,y+h-36,28,3,1,'#6a3a2a');R(s,x+b.dx-12,y+h-34,24,2,'rgba(0,0,0,.2)');
 R(s,x+b.dx+13,y+h-22,5,7,'#f4efe6');txt(s,'12',x+b.dx+15.5,y+h-16.6,'#a33','bold 4px sans-serif');
 signBoard(x+b.dx-9,y+37,18,8,'我家','#8a5a2e','#fff3d6',6)};
STY.conv=b=>{const{x,y,w,h}=b;wallBody(b,'#f4f4ee','tile');roofFlat(b,'#e8e8e0',10);
 R(s,x,y+11,w,5,'#e8942a');R(s,x,y+16,w,4,'#2a9d5c');R(s,x,y+20,w,2.4,'#d9452f');signBoard(x+10,y+25,w-20,12,b.sg,'#14803e','#fff',9);
 win(x+10,y+44,16,12,{nm:b.n,ac:1});win(x+w-26,y+44,16,12,{nm:b.n,ac:1});
 glassFront(x+5,y+h-48,b.dx-b.dw/2-8,40,{shelves:3,inside:'#fff6dc',nm:b.n,mull:11});glassFront(x+b.dx+b.dw/2+3,y+h-48,w-(b.dx+b.dw/2)-8,40,{shelves:3,inside:'#fff6dc',nm:b.n,mull:11});
 doorGlass(b,{dh:34});R(s,x+w-17,y+h-24,9,16,'#2f80ed');R(s,x+w-16,y+h-23,7,5,'#9fd3ee');R(s,x+w-15,y+h-16,5,1.2,'#fff');R(s,x+w-15,y+h-13,5,1.2,'#fff');
 R(s,x+7,y+h-52,4,3,'#d9452f');R(s,x+w-34,y+h-52,5,3,'#ffd84a');SIGNS.push([x+10,y+25,w-20,12,'#2a9d5c'])};
STY.clinic=b=>{const{x,y,w,h}=b;wallBody(b,'#eaf3f5','tile');roofFlat(b,'#2a8fb8',12);R(s,x,y+12,w,2.4,'#d8eef5');
 signBoard(x+10,y+17,w-20,12,b.sg,'#2a8fb8','#fff',9);
 wgrid(b,y+36,2,28,{pitch:30,ww:16,wh:17,cur:'#f2d0d6',ac:1});
 R(s,x+w-22,y-18,14,14,'#fff');R(s,x+w-19,y-16,8,10,'#fff');R(s,x+w-17.2,y-17,4.4,12,'#2aa86a');R(s,x+w-20,y-13.6,10,4.8,'#2aa86a');SIGNS.push([x+w-22,y-18,14,14,'#2aa86a']);R(s,x+w-16,y-4,2,4,'#8a9096');
 win(x+10,y+h-46,22,24,{nm:b.n,g1:'#e8f4f8',g2:'#bcd8e4',g3:'#a8c8d8',nomul:1});win(x+w-32,y+h-46,22,24,{nm:b.n,g1:'#e8f4f8',g2:'#bcd8e4',g3:'#a8c8d8',nomul:1});
 doorGlass(b,{dh:32,frame:'#1f6a8a'});R(s,x+b.dx-b.dw/2-6,y+h-11,b.dw+12,3,'#bfc8cc');R(s,x+b.dx-b.dw/2-6,y+h-11,2,10,'#8a9096');R(s,x+b.dx+b.dw/2+4,y+h-11,2,10,'#8a9096');
 txt(s,'診療時間 08–21',x+b.dx,y+h-35,'#1f6a8a','bold 4.5px sans-serif')};
STY.cafe=b=>{const{x,y,w,h}=b;wallBody(b,'#b87a4b','brick');roofFlat(b,'#4a2f1a',9);
 signBoard(x+8,y+13,w-16,12,'☕ '+b.sg,'#2a1a10','#ffd9a0',7.4,{bd:'#8a6a3a'});
 win(x+8,y+31,15,15,{nm:b.n,pl:1,ac:1});win(x+w-23,y+31,15,15,{nm:b.n,pl:1,ac:1});
 glassFront(x+8,y+h-44,b.dx-b.dw/2-12,28,{inside:'#ffe9b8',nm:b.n,mull:12,fr:'#3a2210'});glassFront(x+b.dx+b.dw/2+4,y+h-44,w-b.dx-b.dw/2-12,28,{inside:'#ffe9b8',nm:b.n,mull:12,fr:'#3a2210'});
 awning(x+4,y+h-52,w-8,'#2f6a4a','#f2ead4',8,9);doorWood(b,{dh:28});R(s,x+b.dx-b.dw/2+3,y+h-22,b.dw-6,9,'#9fd3ee');
 R(s,x+w-17,y+h-10,12,8,'#2a2a2a');txt(s,'菜單',x+w-11,y+h-4,'#ffe9b8','bold 4px sans-serif');lantern(x+10,y+h-58,'#ffb347')};
STY.book=b=>{const{x,y,w,h}=b;wallBody(b,'#4d6b57','siding');roofFlat(b,'#2f4a3a',10);
 signBoard(x+14,y+14,w-28,13,'📚 '+b.sg,'#2a1a10','#f2d58a',9,{bd:'#c9a45a'});wgrid(b,y+38,2,28,{pitch:28,ww:15,wh:17,cur:'#c9a45a',ac:1});
 glassFront(x+6,y+h-50,b.dx-b.dw/2-10,42,{inside:'#f2e0b0',nm:b.n,mull:16,fr:'#3a2a1a'});glassFront(x+b.dx+b.dw/2+4,y+h-50,w-b.dx-b.dw/2-10,42,{inside:'#f2e0b0',nm:b.n,mull:16,fr:'#3a2a1a'});
 for(let i=0;i<8;i++){const bx=x+8+i*5+(i>3?b.dw+10:0);R(s,bx,y+h-30,4,10,['#c0392b','#2f80ed','#f1c40f','#2a9d5c','#8a5aa8','#e8e8e8'][i%6]);R(s,bx,y+h-20,4,.8,'#222')}
 awning(x+3,y+h-58,w-6,'#7a2a2a','#f2ead4',7,10);doorWood(b,{c1:'#7a5a3a',c2:'#4a3220'});R(s,x+b.dx-4,y+h-36,8,4,'#ffd84a')};
// 肌肉明星（正面雙頭肌姿勢）
function flexFig(c,cx,top,sc,o){o=o||{};const sk=o.skin||'#e0a070',sd=shade(sk,-28),hl=shade(sk,22),hr=o.hair||'#2a1a10',sh=o.shorts||'#2f80ed';
 c.save();c.translate(cx,top);c.scale(sc,sc);const E=(x,y,rx,ry,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill()},P=(pts,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();c.fill()};
 // 腿
 P([[-7,36],[-1,36],[-1.4,58],[-5.4,58]],sk);P([[1,36],[7,36],[5.4,58],[1.4,58]],sk);E(-4.4,44,3.4,7,hl);E(4.4,44,3.4,7,hl);R(c,-6,56,5,3,'#fff');R(c,1,56,5,3,'#fff');
 // 軀幹
 P([[-12,11],[12,11],[7,32],[-7,32]],sk);E(-5.4,17,5.2,4.4,hl);E(5.4,17,5.2,4.4,hl);R(c,-.4,12,.8,19,sd);for(let i=0;i<3;i++){R(c,-3.6,21+i*3.4,3,2.4,sd);R(c,.6,21+i*3.4,3,2.4,sd)}R(c,-5.2,16.4,10.4,.7,sd);
 P([[-7,31],[7,31],[8,39],[-8,39]],sh);R(c,-7,31,14,1.6,'rgba(255,255,255,.55)');
 if(o.fem){P([[-8,12],[8,12],[7,19],[-7,19]],o.top||'#ff4aa0')}
 // 手臂：上臂向外、前臂上舉
 [-1,1].forEach(d=>{P([[d*10,11],[d*19,13],[d*19,19],[d*10,19]],sk);E(d*14,15,5,4.4,hl);P([[d*17,15],[d*21,15],[d*21.4,5],[d*17.4,5]],sk);E(d*19,8,3,5,hl);E(d*19.4,3.4,3.2,3.2,sk);E(d*10.4,10.4,4.2,3.6,sk)});
 // 脖子與頭
 R(c,-2.6,7,5.2,5,sd);E(0,4.4,4.4,4.8,sk);E(0,3.8,4.4,4.6,hl);R(c,-3,2.6,2,1,'#222');R(c,1,2.6,2,1,'#222');R(c,-1.4,6.6,2.8,.8,'#a0402a');
 if(o.fem){P([[-5,2],[0,-3],[5,2],[5.6,5],[-5.6,5]],hr);E(6.4,6,2.4,5,hr)}else P([[-4.8,2.2],[0,-2.4],[4.8,2.2],[3.6,.8],[-3.6,.8]],hr);
 c.restore()}
STY.gym=b=>{const{x,y,w,h}=b;wallBody(b,'#2d2f36','plaster');R(s,x,y,w,14,'#1a1b20');R(s,x,y+13,w,2.4,'#ffcc00');
 for(let i=0;i<w;i+=12)R(s,x+i,y+2,6,3,'rgba(255,255,255,.12)');
 signBoard(x+8,y+18,w-16,32,'','#d62828','#fff',9,{bd:'#ffcc00',glow:1});txt(s,'WORLD FIT',x+w/2,y+36,'#fff','bold 17px sans-serif');txt(s,'世 界 健 身',x+w/2,y+46,'#ffe066','bold 8px sans-serif');
 R(s,x+13,y+27,16,2.4,'#ffcc00');R(s,x+10,y+23,3,10,'#ffcc00');R(s,x+29,y+23,3,10,'#ffcc00');R(s,x+w-29,y+27,16,2.4,'#ffcc00');R(s,x+w-32,y+23,3,10,'#ffcc00');R(s,x+w-13,y+23,3,10,'#ffcc00');
 // 二樓玻璃帷幕：跑步機與人影
 const gy=y+58,gh=46;R(s,x+8,gy-2,w-16,gh+4,'#14151a');GR(s,x+10,gy,w-20,gh,'#2a3a50','#16202e');
 for(let i=0;i<6;i++){const cx=x+22+i*((w-44)/5);R(s,cx-9,gy+gh-14,18,10,'#3a3d46');R(s,cx-8,gy+gh-5,16,2,'#14151a');R(s,cx-7,gy+gh-22,2,10,'#555');R(s,cx+5,gy+gh-22,2,10,'#555');R(s,cx-7,gy+gh-24,14,3,'#222');R(s,cx-5,gy+gh-23,10,1.4,'#42d6ff');
  if(i%2==0||i==3){s.fillStyle='#0a0a10';s.beginPath();s.arc(cx,gy+gh-28,2.6,0,7);s.fill();R(s,cx-2.4,gy+gh-25.5,4.8,8,'#0a0a10');R(s,cx-3,gy+gh-17.6,2.4,4.6,'#0a0a10');R(s,cx+.6,gy+gh-17.6,2.4,4.6,'#0a0a10')}}
 for(let i=1;i<6;i++)R(s,x+8+i*(w-16)/6,gy,1.2,gh,'#14151a');s.fillStyle='rgba(255,255,255,.12)';s.beginPath();s.moveTo(x+14,gy+gh);s.lineTo(x+60,gy);s.lineTo(x+78,gy);s.lineTo(x+32,gy+gh);s.fill();
 WIN.push([x+10,gy,w-20,gh,b.n,1,1]);
 // 一樓
 const fy=y+h-64;R(s,x,fy-4,w,3,'#ffcc00');
 glassFront(x+8,fy,b.dx-b.dw/2-14,52,{inside:'#2a3042',nm:b.n,mull:0,fr:'#14151a',g1:'#3a4a68',g2:'#1c2438'});
 const post=(px,pw,c1,c2,name,sub,o)=>{const ph=52;s.save();s.beginPath();s.rect(px,fy,pw,ph);s.clip();GR(s,px,fy,pw,ph,c1,c2);
  const rg=s.createRadialGradient(px+pw/2,fy+26,2,px+pw/2,fy+26,pw*.62);rg.addColorStop(0,'rgba(255,255,255,.55)');rg.addColorStop(1,'rgba(255,255,255,0)');s.fillStyle=rg;s.fillRect(px,fy,pw,ph);
  for(let i=0;i<7;i++){s.fillStyle='rgba(255,255,255,.1)';s.beginPath();s.moveTo(px+pw/2,fy+54);s.lineTo(px+pw/2-30+i*10,fy);s.lineTo(px+pw/2-24+i*10,fy);s.fill()}
  flexFig(s,px+pw/2,fy+6,.78,o);R(s,px,fy+ph-13,pw,13,'rgba(10,10,20,.78)');txt(s,name,px+pw/2,fy+ph-5.4,'#ffe066','bold 8.6px sans-serif');txt(s,sub,px+pw/2,fy+9,'#fff','bold 5.6px sans-serif');
  s.restore()};
 post(x+8,b.dx-b.dw/2-14,'#ff5a3a','#7a1a6a','鐵人 阿鋼','三屆世界冠軍',{skin:'#d89060',hair:'#1a1008',shorts:'#2f80ed'});
 post(x+b.dx+b.dw/2+6,w-b.dx-b.dw/2-14,'#3aa0ff','#3a1a7a','FIT 女王 小靜','健美衛冕',{skin:'#f0c090',hair:'#5a2a10',shorts:'#ff4aa0',fem:1,top:'#ff4aa0'});
 [[x+8,b.dx-b.dw/2-14],[x+b.dx+b.dw/2+6,w-b.dx-b.dw/2-14]].forEach(q=>{R(s,q[0]-1,fy-1,q[1]+2,1.4,'#14151a');R(s,q[0]-1,fy+51,q[1]+2,1.4,'#14151a');R(s,q[0]-1,fy-1,1.4,53,'#14151a');R(s,q[0]+q[1]-.4,fy-1,1.4,53,'#14151a')});
 doorGlass(b,{dh:36,frame:'#d62828',frame2:'#ffcc00'});signBoard(x+b.dx-14,y+h-48,28,8,'OPEN 24H','#111','#42d6ff',5.5);
 R(s,x+4,y+h-14,26,10,'#ffcc00');txt(s,'No Pain',x+17,y+h-6.4,'#111','bold 5px sans-serif');R(s,x+w-32,y+h-14,28,10,'#d62828');txt(s,'No Gain',x+w-18,y+h-6.4,'#fff','bold 5px sans-serif')};
STY.cinema=b=>{const{x,y,w,h}=b;wallBody(b,'#4a3a6a','plaster');roofFlat(b,'#2a2040',12);
 signBoard(x+10,y+16,w-20,20,'CINEMA 電影院','#1a1230','#ffd84a',11,{bd:'#ff7ab0'});for(let i=0;i<w;i+=8){R(s,x+i,y+2,3,3,'#ffd84a');SIGNS.push([x+i,y+2,3,3,'#ffd84a'])}
 const px=[x+10,x+w/2+b.dw/2+8],pw=Math.max(18,w/2-b.dw/2-20);[px[0],px[1]].forEach((p0,i)=>{R(s,p0-1.5,y+44,pw+3,34,'#222');GR(s,p0,y+45.5,pw,31,['#c0392b','#2f80ed'][i],['#f2c230','#8a5aa8'][i]);txt(s,['冒險','愛情'][i],p0+pw/2,y+64,'#fff','bold 6px sans-serif');SIGNS.push([p0,y+45,pw,31,'#ffaa44'])});
 R(s,x+4,y+h-52,w-8,7,'#ffd84a');R(s,x+4,y+h-45,w-8,2,'rgba(0,0,0,.35)');for(let i=x+8;i<x+w-6;i+=6){s.fillStyle='#fffbe0';s.beginPath();s.arc(i,y+h-49,1.5,0,7);s.fill();SIGNS.push([i-1.5,y+h-50.5,3,3,'#ffe9a0'])}
 doorGlass(b,{dh:32,frame:'#7a1a2a'});R(s,x+8,y+h-37,24,22,'#14101f');R(s,x+10,y+h-35,20,10,'#bfe6f7');R(s,x+12,y+h-22,16,2,'#d4a017');txt(s,'售票',x+20,y+h-18,'#ffd84a','bold 4px sans-serif');
 R(s,x+w-30,y+h-34,22,26,'#1a1230');txt(s,'NOW',x+w-19,y+h-26,'#ffd84a','bold 5px sans-serif');txt(s,'SHOWING',x+w-19,y+h-19,'#fff','bold 3.8px sans-serif')};
STY.hotel=b=>{const{x,y,w,h}=b;wallBody(b,'#eadcc2','plaster');R(s,x+10,y-14,w-20,16,'#d4c6a8');R(s,x+10,y-14,w-20,2.4,'#fff');
 signBoard(x+w/2-34,y-11,68,11,'HOTEL 旅館','#4a2a6a','#ffd84a',8.5,{bd:'#ffd84a'});roofFlat(b,'#7a4a9e',10);
 for(let r=0;r<4;r++){const wy=y+16+r*30;R(s,x,wy+22,w,2,'rgba(0,0,0,.1)');for(let c=0;c<3;c++){const wx0=x+12+c*((w-24)/3)+((w-24)/3-26)/2;
  if(r==3&&c==1)continue;R(s,wx0-4,wy+18,34,5,'#9a8a70');R(s,wx0-4,wy+12,34,1.4,'#8a7a60');for(let q=0;q<9;q++)R(s,wx0-3+q*4,wy+12,.9,6,'#8a7a60');win(wx0+2,wy+2,22,15,{nm:b.n,fl:r,cur:r%2?'#e8c0a0':'#d0a0c0',nomul:1,ac:c==0})}}
 R(s,x+b.dx-34,y+h-48,68,5,'#ffd84a');R(s,x+b.dx-34,y+h-43,68,2,'rgba(0,0,0,.3)');R(s,x+b.dx-33,y+h-43,3,43,'#c9a45a');R(s,x+b.dx+30,y+h-43,3,43,'#c9a45a');awning(x+b.dx-36,y+h-54,72,'#7a4a9e','#d9c4e8',8,10);
 doorGlass(b,{dh:32,frame:'#7a5a2a',frame2:'#ffd84a'});R(s,x+8,y+h-24,16,24,'#cdbfa0');txt(s,'訂房',x+16,y+h-8,'#4a2a6a','bold 5px sans-serif');R(s,x+w-22,y+h-24,14,20,'#cdbfa0');
 [[x+12],[x+w-12]].forEach(q=>{R(s,q[0]-.5,y+h-44,1,44,'#8a8a90');R(s,q[0]-5,y+h-44,10,6,'#d9452f');R(s,q[0]-5,y+h-44,10,1.4,'rgba(255,255,255,.4)')})};
STY.resto=b=>{const{x,y,w,h}=b;wallBody(b,'#e9c58a','plaster');roofTile(b,'#b5322a',22);
 signBoard(x+10,y+26,w-20,15,b.sg,'#b5322a','#ffe066',11,{bd:'#ffd84a'});[x+14,x+w/2,x+w-14].forEach((lx,i)=>lantern(lx,y+h-82,'#e0301f'));
 win(x+10,y+46,16,14,{nm:b.n,ac:1});win(x+w-26,y+46,16,14,{nm:b.n,ac:1});
 glassFront(x+5,y+h-44,b.dx-b.dw/2-9,36,{inside:'#ffd9a0',nm:b.n,mull:0,fr:'#6a2a1a',g1:'#ffe6b0',g2:'#e8a860'});glassFront(x+b.dx+b.dw/2+4,y+h-44,w-b.dx-b.dw/2-9,36,{inside:'#ffd9a0',nm:b.n,mull:0,fr:'#6a2a1a',g1:'#ffe6b0',g2:'#e8a860'});
 for(let i=0;i<5;i++){R(s,x+8+i*4,y+h-26,3,14,'rgba(160,220,255,.35)');R(s,x+w-30+i*4,y+h-26,3,14,'rgba(160,220,255,.35)')}
 doorGlass(b,{dh:30,frame:'#6a2a1a'});signBoard(x+w-12,y+h-70,9,28,'','#14803e','#fff',6);[...'啤酒生猛'].forEach((ch,k)=>txt(s,ch,x+w-7.5,y+h-63+k*6,'#fff','bold 5.5px sans-serif'));
 signBoard(x+7,y+h-62,22,9,'快炒99','#111','#ffd84a',5.5)};
STY.market=b=>{const{x,y,w,h}=b;wallBody(b,'#f2f0e6','tile');roofFlat(b,'#2d6cdf',12);R(s,x,y+12,w,3,'#1a4ab0');
 signBoard(x+14,y+18,w-28,22,b.sg,'#2d6cdf','#fff',14,{bd:'#fff'});
 for(let i=0;i<5;i++){const bx=x+14+i*((w-28)/5);R(s,bx,y+46,(w-28)/5-3,14,['#d9452f','#f2c230','#d9452f','#f2c230','#d9452f'][i]);txt(s,['特價','鮮食','生鮮','日用','會員'][i],bx+((w-28)/5-3)/2,y+56.4,i%2?'#a02020':'#fff','bold 6.5px sans-serif');SIGNS.push([bx,y+46,(w-28)/5-3,14,'#ff6a3a'])}
 const gw=(b.dx-b.dw/2-12);glassFront(x+8,y+h-62,gw,54,{inside:'#fff6dc',nm:b.n,shelves:4,mull:16});glassFront(x+b.dx+b.dw/2+4,y+h-62,w-b.dx-b.dw/2-12,54,{inside:'#fff6dc',nm:b.n,shelves:4,mull:16});
 doorGlass(b,{dh:40,frame:'#1a4ab0'});R(s,x+b.dx-b.dw/2-6,y+h-48,b.dw+12,5,'#1a4ab0');txt(s,'自動門',x+b.dx,y+h-44,'#fff','bold 3.8px sans-serif');
 acUnit(x+20,y-10);acUnit(x+w-40,y-10);acUnit(x+w/2,y-10)};
STY.garage=b=>{const{x,y,w,h}=b;wallBody(b,'#c9c4b6','plaster');roofFlat(b,'#8a8a82',10);R(s,x,y+10,w,16,'#f0b030');for(let i=0;i<w;i+=10){s.fillStyle='#222';s.beginPath();s.moveTo(x+i,y+10);s.lineTo(x+i+5,y+10);s.lineTo(x+i+1,y+26);s.lineTo(x+i-4,y+26);s.fill()}
 signBoard(x+10,y+29,w-20,13,b.sg,'#14151a','#ffd84a',9.5,{bd:'#f0b030'});win(x+10,y+48,16,13,{nm:b.n,bars:1,ac:1});win(x+w-26,y+48,16,13,{nm:b.n,bars:1,ac:1});
 const gx=x+8,gw=w-16,gy=y+h-50;R(s,gx-2,gy-2,gw+4,52,'#4a4a4a');GR(s,gx,gy,gw,50,'#1a1a1e','#2a2a30');
 for(let i=0;i<4;i++){R(s,gx+4+i*22,gy+14,16,14,'#3a3a40');R(s,gx+6+i*22,gy+30,12,6,'#c9302c')}
 R(s,gx+8,gy+8,26,3,'#888');R(s,gx+gw-40,gy+16,22,4,'#e8b23a');R(s,gx+gw-36,gy+20,14,18,'#c9302c');
 for(let i=0;i<9;i++)R(s,gx,gy-.4+i*2.6,gw,1.4,i%2?'#b5b2a8':'#a5a298');R(s,gx,gy,gw,18,'#b5b2a8');for(let i=0;i<7;i++)R(s,gx,gy+i*2.6,gw,1,'#8f8c82');R(s,gx,gy+17,gw,2.4,'#6a6a64');
 WIN.push([gx,gy+18,gw,32,b.n,0,1]);doorGlass(b,{dh:32,frame:'#222'});
 [[x+w-24,y+h-12],[x+w-14,y+h-12]].forEach(q=>{s.fillStyle='#1a1a1a';s.beginPath();s.arc(q[0],q[1]+4,5,0,7);s.fill();s.fillStyle='#666';s.beginPath();s.arc(q[0],q[1]+4,2.2,0,7);s.fill()});
 signBoard(x+4,y+h-70,8,22,'','#d9452f','#fff',5);[...'修車'].forEach((ch,k)=>txt(s,ch,x+8,y+h-62+k*8,'#fff','bold 6px sans-serif'))};
STY.salon=b=>{const{x,y,w,h}=b;wallBody(b,'#f8e4ea','plaster');roofFlat(b,'#e0679a',10);
 signBoard(x+8,y+14,w-16,14,'✂ '+b.sg,'#e0679a','#fff',9,{bd:'#fff'});win(x+10,y+36,14,12,{nm:b.n,ac:1,cur:'#e0679a'});win(x+w-24,y+36,14,12,{nm:b.n,ac:1,cur:'#e0679a'});
 glassFront(x+6,y+h-44,b.dx-b.dw/2-10,36,{inside:'#ffe6ee',nm:b.n,fr:'#e0679a',g1:'#fff0f4',g2:'#d0a8c0'});glassFront(x+b.dx+b.dw/2+4,y+h-44,w-b.dx-b.dw/2-10,36,{inside:'#ffe6ee',nm:b.n,fr:'#e0679a',g1:'#fff0f4',g2:'#d0a8c0'});
 [[x+14],[x+w-24]].forEach(q=>{s.fillStyle='#2a1a12';s.beginPath();s.arc(q[0]+4,y+h-30,4,0,7);s.fill();R(s,q[0],y+h-27,8,14,'#e8e8e8');R(s,q[0],y+h-27,8,3,'#d0d0d8')});
 doorGlass(b,{dh:28,frame:'#e0679a'});const px=x+b.dx+b.dw/2+10;R(s,px-1.6,y+h-30,3.2,22,'#fff');for(let i=0;i<5;i++){R(s,px-1.6,y+h-30+i*4.4,3.2,2,i%2?'#d9452f':'#2f80ed')}s.fillStyle='#ddd';s.beginPath();s.arc(px,y+h-31,2.2,0,7);s.fill()};
STY.school=b=>{const{x,y,w,h}=b;wallBody(b,'#dcb68c','brick');roofFlat(b,'#a8452f',14);R(s,x,y+14,w,2,'#7a2a1a');
 // 中央鐘樓
 const tx=x+w/2-24;R(s,tx,y-30,48,40,'#d2aa7e');R(s,tx,y-30,48,3,'#a8452f');R(s,tx-3,y-34,54,6,'#a8452f');R(s,tx+10,y-44,28,12,'#d2aa7e');roofTile({x:tx+6,y:y-52,w:36},'#a8452f',9);
 s.fillStyle='#fff';s.beginPath();s.arc(x+w/2,y-14,9,0,7);s.fill();s.strokeStyle='#3a2210';s.lineWidth=1.4;s.stroke();R(s,x+w/2-.5,y-20,1,6.4,'#222');R(s,x+w/2-.5,y-14.6,5,1,'#222');
 signBoard(x+w/2-34,y+8,68,14,b.sg,'#14803e','#fff',9,{bd:'#fff'});
 wgrid(b,y+28,2,30,{pitch:22,ww:14,wh:20,nomul:0,ac:false,skip:(wx0,wy,r,c)=>Math.abs(wx0+7-(x+w/2))<30&&r==1});
 doorGlass(b,{dh:38,frame:'#6a3a1a',frame2:'#c9a45a'});R(s,x+w/2-28,y+h-48,56,6,'#a8452f');R(s,x+w/2-26,y+h-42,52,2,'rgba(0,0,0,.3)');R(s,x+w/2-26,y+h-42,4,42,'#e8dcc0');R(s,x+w/2+22,y+h-42,4,42,'#e8dcc0');
 txt(s,'歡迎入學',x+w/2,y+h-51.5,'#fff3d6','bold 5px sans-serif');for(let i=0;i<3;i++)R(s,x+w/2-12+i*10,y+h-14+i*0,8,2,'#d8c8a8')};
STY.temple=b=>{const{x,y,w,h}=b;wallBody(b,'#c8372d','plaster');
 // 兩層屋頂
 const ry=y-18;s.fillStyle='#2f8a6a';s.beginPath();s.moveTo(x-14,y+10);s.quadraticCurveTo(x-8,y-2,x+10,y-4);s.lineTo(x+w-10,y-4);s.quadraticCurveTo(x+w+8,y-2,x+w+14,y+10);s.lineTo(x+w+14,y+16);s.lineTo(x-14,y+16);s.fill();
 for(let i=0;i<w+24;i+=5)R(s,x-12+i,y-2+Math.abs(i-(w+24)/2)*.0,2.6,17,'rgba(0,0,0,.18)');R(s,x-14,y+12,w+28,4,'#ffd84a');R(s,x-14,y+16,w+28,2,'#8a5a1a');
 s.fillStyle='#2f8a6a';s.beginPath();s.moveTo(x+w*.2,y-4);s.quadraticCurveTo(x+w*.24,y-18,x+w*.38,y-22);s.lineTo(x+w*.62,y-22);s.quadraticCurveTo(x+w*.76,y-18,x+w*.8,y-4);s.fill();for(let i=0;i<w*.5;i+=4)R(s,x+w*.25+i,y-18+Math.abs(i-w*.25)*.15,2,13,'rgba(0,0,0,.18)');R(s,x+w*.2,y-6,w*.6,3,'#ffd84a');
 R(s,x+w/2-1.6,y-34,3.2,12,'#ffd84a');s.fillStyle='#ffd84a';s.beginPath();s.arc(x+w/2,y-35,3.2,0,7);s.fill();[[x-10,y+4],[x+w+10,y+4]].forEach(q=>{s.fillStyle='#ffd84a';s.beginPath();s.arc(q[0],q[1],3,0,7);s.fill()});
 signBoard(x+w/2-26,y+22,52,13,b.sg,'#14151a','#ffd84a',9,{bd:'#ffd84a'});
 [x+10,x+w-24].forEach((px,i)=>{R(s,px,y+40,14,h-40,'#a82820');R(s,px+2,y+44,10,h-52,'#e8c840');for(let k=0;k<3;k++)R(s,px+3,y+50+k*14,8,3,'#a82820')});
 [x+30,x+w-34].forEach(px=>{R(s,px,y+h-58,2.6,58,'#a82820')});
 const dx=x+b.dx-b.dw/2;R(s,dx-4,y+h-44,b.dw+8,44,'#3a1a10');GR(s,dx,y+h-40,b.dw/2-.6,40,'#1f6a8a','#14405a');GR(s,dx+b.dw/2+.6,y+h-40,b.dw/2-.6,40,'#a82820','#6a1a14');
 R(s,dx+3,y+h-34,b.dw/2-6,12,'#ffd84a');R(s,dx+b.dw/2+3.6,y+h-34,b.dw/2-6,12,'#ffd84a');R(s,dx+b.dw/2-.6,y+h-40,1.2,40,'#ffd84a');
 for(let r=0;r<4;r++)for(let c=0;c<2;c++){R(s,dx+3+c*(b.dw/2+.6),y+h-18+r*0-4+r*0,2,2,'#ffd84a')}
 WIN.push([dx,y+h-40,b.dw,40,b.n,0,1]);lantern(x+40,y+h-52,'#e0301f');lantern(x+w-40,y+h-52,'#e0301f');R(s,x+b.dx-9,y+h-2,18,3,'#8a7a64')};
STY.police=b=>{const{x,y,w,h}=b;wallBody(b,'#e8eef4','tile');roofFlat(b,'#1f4fa3',12);R(s,x,y+12,w,3,'#12307a');
 signBoard(x+10,y+19,w-20,19,'','#1f4fa3','#fff',10,{bd:'#fff'});txt(s,b.sg+'  POLICE',x+w/2,y+32,'#fff','bold 10px sans-serif');
 s.fillStyle='#ffd84a';s.beginPath();s.arc(x+22,y+28.6,5,0,7);s.fill();txt(s,'110',x+22,y+30,'#12307a','bold 4px sans-serif');
 wgrid(b,y+46,1,26,{pitch:28,ww:16,wh:16,ac:1,bars:1});R(s,x,y+h-14-30,w,2,'#1f4fa3');
 glassFront(x+8,y+h-48,b.dx-b.dw/2-14,38,{inside:'#d8e8f4',nm:b.n,fr:'#1f4fa3',mull:12});glassFront(x+b.dx+b.dw/2+6,y+h-48,w-b.dx-b.dw/2-14,38,{inside:'#d8e8f4',nm:b.n,fr:'#1f4fa3',mull:12});
 doorGlass(b,{dh:34,frame:'#1f4fa3',frame2:'#ffd84a'});R(s,x+b.dx-b.dw/2-10,y+h-50,b.dw+20,5,'#1f4fa3');
 R(s,x+w-8,y-22,1.6,34,'#8a9096');R(s,x+w-6.4,y-21,13,8,'#d9452f');R(s,x+w-6.4,y-21,13,2,'rgba(255,255,255,.4)');
 R(s,x+12,y+h-16,22,12,'#1f4fa3');txt(s,'報案',x+23,y+h-7.4,'#fff','bold 5.5px sans-serif')};
STY.bank=b=>{const{x,y,w,h}=b;wallBody(b,'#e6dcc6','tile');
 s.fillStyle='#d4c8ac';s.beginPath();s.moveTo(x-6,y+22);s.lineTo(x+w/2,y-12);s.lineTo(x+w+6,y+22);s.fill();s.fillStyle='rgba(255,255,255,.3)';s.beginPath();s.moveTo(x+w/2,y-12);s.lineTo(x+w+6,y+22);s.lineTo(x+w/2,y+22);s.fill();R(s,x-6,y+22,w+12,5,'#b8a888');R(s,x-6,y+22,w+12,1.2,'#fff');
 s.fillStyle='#ffd84a';s.beginPath();s.arc(x+w/2,y+6,6,0,7);s.fill();txt(s,'$',x+w/2,y+9,'#8a6a3a','bold 9px sans-serif');
 signBoard(x+w/2-34,y+31,68,12,b.sg,'#2a1a10','#ffd84a',8.5,{bd:'#c9a45a'});
 for(let i=0;i<5;i++){const cx=x+8+i*((w-20)/4);if(Math.abs(cx+2-(x+b.dx))<b.dw/2+4)continue;GR(s,cx,y+47,5,h-51,'#f4ecd8','#c8bca0');R(s,cx-1,y+47,7,3,'#d8ccb0');R(s,cx-1,y+h-8,7,4,'#c4b898')}
 doorGlass(b,{dh:34,frame:'#8a6a3a',frame2:'#ffd84a'});win(x+14,y+60,10,14,{nm:b.n,nomul:1,fr:'#d8ccb0'});win(x+w-24,y+60,10,14,{nm:b.n,nomul:1,fr:'#d8ccb0'});
 R(s,x+4,y+h-8,w-8,5,'#c8bca0');R(s,x+w-30,y+h-34,18,28,'#3a3d46');R(s,x+w-28,y+h-32,14,10,'#9fd3ee');R(s,x+w-26,y+h-19,10,2,'#6a6a74');txt(s,'ATM',x+w-21,y+h-8,'#fff','bold 4px sans-serif')};
STY.stall=b=>{const{x,y,w,h}=b;R(s,x+4,y+h-2,w,5,'rgba(50,25,0,.3)');GR(s,x,y+24,w,h-24,'#c08a55','#9a6a3a');R(s,x,y+24,w,4,'#8a5a2e');
 const ca=b.r||'#d9452f',nn=Math.max(4,Math.round(w/10)),sw2=w/nn;for(let i=0;i<nn;i++){R(s,x+i*sw2,y,sw2,22,i%2?'#fff':ca);R(s,x+i*sw2,y+18,sw2,4,'rgba(0,0,0,.15)');s.fillStyle=i%2?'#fff':ca;s.beginPath();s.arc(x+i*sw2+sw2/2,y+22,sw2/2,0,Math.PI);s.fill()}
 R(s,x,y+22,w,2,'#7a2a1a');R(s,x+2,y+24,3,h-24,'#5a3418');R(s,x+w-5,y+24,3,h-24,'#5a3418');
 for(let i=0;i<Math.floor((w-16)/14);i++)R(s,x+8+i*14,y+31,8,6,['#ffb347','#e74c3c','#f1c40f','#a0522d','#8bc34a'][i%5]);R(s,x+8,y+37,w-16,2,'#8a6a40');
 R(s,x+30,y+44,40,4,'#5a3418');txt(s,b.menu||'牛肉麵 · 滷肉飯',x+w/2,y+55,'#fff8e0','bold 5.5px sans-serif');signBoard(x+w/2-24,y+2,48,9,b.sg,'#7a1a10','#ffe066',6.5,{glow:1});
 for(let i=0;i<Math.max(2,Math.floor(w/26));i++)lantern(x+8+i*(w-16)/Math.max(1,Math.floor(w/26)-1||1),y+26,'#e0301f')};
STY.barn=b=>{const{x,y,w,h}=b;wallBody(b,'#b5432f','siding');
 s.fillStyle='#8a2a1a';s.beginPath();s.moveTo(x-8,y+34);s.lineTo(x+w/2,y-26);s.lineTo(x+w+8,y+34);s.fill();s.fillStyle='rgba(255,255,255,.12)';s.beginPath();s.moveTo(x+w/2,y-26);s.lineTo(x+w+8,y+34);s.lineTo(x+w/2,y+34);s.fill();
 s.strokeStyle='#f4ead0';s.lineWidth=2;s.beginPath();s.moveTo(x-8,y+34);s.lineTo(x+w/2,y-26);s.lineTo(x+w+8,y+34);s.stroke();
 for(let i=0;i<w;i+=7)R(s,x+i,y+8+Math.abs(i-w/2)*.0,.8,26,'rgba(0,0,0,.2)');R(s,x-8,y+34,w+16,3,'#6a1a10');
 R(s,x+w/2-9,y-4,18,18,'#f4ead0');R(s,x+w/2-7,y-2,14,14,'#3a2a1a');R(s,x+w/2-.6,y-2,1.2,14,'#f4ead0');R(s,x+w/2-7,y+4.6,14,1.2,'#f4ead0');
 signBoard(x+w/2-36,y+38,72,14,b.sg,'#f4ead0','#8a2a1a',9,{bd:'#8a2a1a',glow:1});
 [x+10,x+w-28].forEach(wx0=>{win(wx0,y+60,18,16,{nm:b.n,fr:'#f4ead0',pl:1,cur:'#e8c0a0'})});
 const dx=x+b.dx-b.dw/2;R(s,dx-4,y+h-40,b.dw+8,40,'#f4ead0');GR(s,dx,y+h-37,b.dw/2-.5,37,'#9a6a38','#6f4524');GR(s,dx+b.dw/2+.5,y+h-37,b.dw/2-.5,37,'#9a6a38','#6f4524');
 s.strokeStyle='#f4ead0';s.lineWidth=1.2;s.beginPath();s.moveTo(dx,y+h-37);s.lineTo(dx+b.dw/2,y+h-2);s.moveTo(dx+b.dw/2,y+h-37);s.lineTo(dx,y+h-2);s.moveTo(dx+b.dw/2,y+h-37);s.lineTo(dx+b.dw,y+h-2);s.moveTo(dx+b.dw,y+h-37);s.lineTo(dx+b.dw/2,y+h-2);s.stroke();
 WIN.push([dx,y+h-37,b.dw,37,b.n,0,1]);R(s,dx-4,y+h-1,b.dw+8,2,'#8a7a64')};
STY.apt=b=>{const{x,y,w,h}=b;wallBody(b,b.c,'plaster');roofFlat(b,'#8a8a84',9);R(s,x+8,y-14,16,15,'#9fb4c4');R(s,x+8,y-14,16,2,'#c0d0dc');R(s,x+10,y-2,2,3,'#555');R(s,x+20,y-2,2,3,'#555');
 const rows=Math.floor((h-40)/30);for(let r=0;r<rows;r++){const wy=y+14+r*30;R(s,x+2,wy+19,w-4,4,'rgba(0,0,0,.12)');R(s,x+2,wy+19,w-4,1,'rgba(255,255,255,.3)');
  const cols=Math.floor((w-10)/36);for(let c=0;c<Math.max(1,cols);c++){const wx0=x+8+c*(w-10)/Math.max(1,cols)+((w-10)/Math.max(1,cols)-22)/2;win(wx0,wy+2,22,15,{nm:b.n,fl:r,cur:(r+c)%2?'#e0b8a0':'#b8d0e0',ac:(r+c)%3==0,nomul:0});
   if((r*3+c)%4==1){R(s,wx0-2,wy+12,26,.8,'#777');for(let k=0;k<4;k++)R(s,wx0+k*6,wy+13,4,7,['#e0679a','#2f80ed','#f4f4f4','#f0b030'][(k+r)%4])}}}
 R(s,x+6,y+h-30,w-12,26,'#6a6a70');for(let i=0;i<w-12;i+=3)R(s,x+6+i,y+h-30,1.2,26,'#7a7a82');R(s,x+6,y+h-8,w-12,4,'#555')};
STY.station=b=>{const{x,y,w,h}=b,cx=x+w/2;
 R(s,x,y+36,w,h-36,'#e6dcc2');for(let i=0;i<w;i+=5)R(s,x+i,y+36,.7,h-36,'rgba(120,100,70,.14)');R(s,x,y+h-7,w,7,'#8a7a5a');R(s,x,y+36,w,2,'#c9bc9a');
 // 兩翼屋頂
 [[x-6,x+w/2-34],[x+w/2+34,x+w+6]].forEach(q=>{s.fillStyle='#2f5f8a';s.beginPath();s.moveTo(q[0],y+40);s.lineTo(q[0]+14,y+22);s.lineTo(q[1]-14,y+22);s.lineTo(q[1],y+40);s.fill();for(let i=0;i<5;i++)R(s,q[0]+8+i*1.5,y+24+i*3.6,q[1]-q[0]-16-i*3,.9,'rgba(255,255,255,.18)');R(s,q[0],y+39,q[1]-q[0],2.4,'#1c3d5c')});
 // 中央鐘樓
 R(s,cx-26,y+6,52,40,'#efe6cc');R(s,cx-26,y+6,52,2,'#fff8e4');R(s,cx-26,y+44,52,2,'#b5a880');
 s.fillStyle='#2f5f8a';s.beginPath();s.moveTo(cx-32,y+8);s.lineTo(cx,y-14);s.lineTo(cx+32,y+8);s.fill();R(s,cx-32,y+7,64,2.4,'#1c3d5c');R(s,cx-.8,y-20,1.6,8,'#555');
 s.fillStyle='#fff';s.beginPath();s.arc(cx,y+22,10,0,7);s.fill();s.strokeStyle='#5a4a2a';s.lineWidth=1.4;s.stroke();R(s,cx-.6,y+15,1.2,7.6,'#222');R(s,cx,y+21.4,6,1.2,'#222');
 // 站名牌
 signBoard(cx-48,y+50,96,14,'火車站','#173a5a','#fff',10,{bd:'#c9a040'});
 // 雨庇與入口
 R(s,x+20,y+h-40,w-40,4,'#7a6a4a');for(let i=0;i<w-40;i+=20)R(s,x+22+i,y+h-36,2.4,30,'#8a7a5a');
 // 售票窗與時刻表
 for(let k=0;k<2;k++){const wx=k?x+w-76:x+30;R(s,wx,y+h-34,40,24,'#4a3a22');R(s,wx+2,y+h-32,36,18,'#bfe0f0');R(s,wx+2,y+h-32,36,3,'rgba(255,255,255,.5)');R(s,wx+6,y+h-12,28,2,'#d9b060');WIN.push([wx+2,y+h-32,36,18,b.n,0,1])}
 R(s,x+14,y+h-60,0,0,'#000');
 doorGlass(b,{dh:34,frame:'#2f5f8a'});
 // 軌道與長椅
 R(s,x+8,y+h-4,10,3,'#6a4a2a');R(s,x+w-18,y+h-4,10,3,'#6a4a2a')};
function bShadow(b){const h=b.h,bt=b.bot;s.save();const g1=s.createLinearGradient(0,bt-2,0,bt+9);g1.addColorStop(0,'rgba(20,10,0,.34)');g1.addColorStop(1,'rgba(20,10,0,0)');s.fillStyle=g1;s.fillRect(b.x-2,bt-2,b.w+4,11);
 s.fillStyle='rgba(20,10,0,.2)';s.beginPath();s.moveTo(b.x+b.w,bt-h*.55);s.lineTo(b.x+b.w+h*.2,bt-h*.55+h*.1);s.lineTo(b.x+b.w+h*.2,bt+7);s.lineTo(b.x+b.w,bt);s.closePath();s.fill();s.restore()}
function drawB(b){bShadow(b);STY[b.st](b)}
function paintBldgs(){B.forEach(drawB);BD.forEach(drawB);
// 建築立面柔光
[...B,...BD].filter(b=>b.st!='ua').forEach(b=>{const gr=s.createLinearGradient(0,b.y,0,b.y+b.h);gr.addColorStop(0,'rgba(255,255,255,.1)');gr.addColorStop(.6,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(30,15,0,.14)');s.fillStyle=gr;s.fillRect(b.x,b.y,b.w,b.h)});}
