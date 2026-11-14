/* ===== v5.0：山區溫泉鄉・美術（戶外建築、地形、室內和風家具） ===== */
const oEl=(c,x,y,rx,ry,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill()};
const oPoly=(c,pts,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();c.fill()};
const orn=seed=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
// 屋頂：梯形瓦片（x,y 為屋頂頂邊左端，w 頂邊寬，bw 底邊寬，hh 高）
function oRoof(c,cx,y,tw,bw,hh,col,eave){
 oPoly(c,[[cx-tw/2,y],[cx+tw/2,y],[cx+bw/2,y+hh],[cx-bw/2,y+hh]],col);
 for(let i=1;i<hh/3;i++){const k=i*3/hh,w=tw+(bw-tw)*k;R(c,cx-w/2,y+i*3,w,.7,'rgba(0,0,0,.22)')}
 for(let i=0;i<bw;i+=5){const k=i/bw;R(c,cx-bw/2+i*(1-0)+0,y+hh-4,.6,4,'rgba(0,0,0,.14)')}
 R(c,cx-tw/2,y,tw,1.4,'rgba(255,255,255,.35)');R(c,cx-bw/2,y+hh-2,bw,2.6,eave||shade(col,-34));R(c,cx-bw/2,y+hh+.4,bw,1.4,'rgba(0,0,0,.25)')}
function oNoren(c,x,y,w,h,col,ch){const n=Math.max(2,Math.round(w/10)),ww=w/n;R(c,x-1,y-1.6,w+2,2.4,'#3a2a1a');for(let i=0;i<n;i++){R(c,x+i*ww+.6,y,ww-1.2,h,col);R(c,x+i*ww+.6,y+h-1.4,ww-1.2,1.4,'rgba(0,0,0,.25)')}if(ch)txt(c,ch,x+w/2,y+h*.68,'#fff','bold '+Math.round(Math.min(h*.7,w*.5))+'px sans-serif')}
function oLantern(c,x,y,col,s0){s0=s0||1;R(c,x-.5,y-3*s0,1,3*s0,'#3a2a1a');oEl(c,x,y+3*s0,2.8*s0,3.6*s0,col||'#d9452f');R(c,x-2*s0,y+1.2*s0,4*s0,.6,'rgba(0,0,0,.3)');R(c,x-2*s0,y+4.6*s0,4*s0,.6,'rgba(0,0,0,.3)');R(c,x-1*s0,y+2.4*s0,2*s0,1.4*s0,'#ffe9a0')}
function oWoodWall(c,x,y,w,h,col,beam){GR(c,x,y,w,h,shade(col,10),shade(col,-18));for(let i=3;i<h;i+=4)R(c,x,y+i,w,.6,'rgba(0,0,0,.14)');beam=beam||'#4a2f1a';R(c,x,y,w,1.6,beam);R(c,x,y+h-1.6,w,1.6,beam);R(c,x,y,1.6,h,beam);R(c,x+w-1.6,y,1.6,h,beam)}
function oPlaster(c,x,y,w,h){GR(c,x,y,w,h,'#f6efe0','#ddd2ba');for(let i=0;i<w;i+=22)R(c,x+i,y,1.4,h,'#4a2f1a');R(c,x,y,w,1.4,'#4a2f1a');R(c,x,y+h-1.4,w,1.4,'#4a2f1a')}
function oShoji(c,x,y,w,h,lit){R(c,x-1,y-1,w+2,h+2,'#4a2f1a');R(c,x,y,w,h,lit?'#ffe8a8':'#f4f0e2');for(let i=1;i<3;i++)R(c,x+w*i/3,y,.8,h,'#6a4a2a');for(let i=1;i<3;i++)R(c,x,y+h*i/3,w,.8,'#6a4a2a')}
function oSlide(c,x,y,w,h){R(c,x-1,y-1,w+2,h+1,'#3a2410');R(c,x,y,w/2-.4,h,'#eadcb8');R(c,x+w/2+.4,y,w/2-.4,h,'#eadcb8');for(let i=1;i<4;i++){R(c,x+(w/2-.4)*i/4,y,.7,h,'rgba(90,60,30,.5)');R(c,x+w/2+.4+(w/2-.4)*i/4,y,.7,h,'rgba(90,60,30,.5)')}R(c,x,y+h*.52,w,.8,'rgba(90,60,30,.5)');R(c,x+w/2-2,y+h*.45,1,3,'#3a2410');R(c,x+w/2+1,y+h*.45,1,3,'#3a2410')}
function oSign(c,x,y,w,h,t,bg,fg,fs,vert){R(c,x+1,y+1,w,h,'rgba(0,0,0,.25)');R(c,x,y,w,h,bg);R(c,x,y,w,1,'rgba(255,255,255,.3)');R(c,x,y+h-1,w,1,'rgba(0,0,0,.28)');if(vert){[...t].forEach((ch,i)=>txt(c,ch,x+w/2,y+(h/(t.length))*(i+.78),fg,'bold '+fs+'px sans-serif'))}else txt(c,t,x+w/2,y+h*.72,fg,'bold '+fs+'px sans-serif')}
function oSteps(c,x,y,w,h){for(let i=0;i<h;i+=5){R(c,x,y+i,w,4,i%10?'#b8b0a0':'#c8c0b0');R(c,x,y+i+3.4,w,1.4,'rgba(0,0,0,.28)');R(c,x,y+i,w,.8,'rgba(255,255,255,.4)')}R(c,x-2,y,2,h,'#7a746a');R(c,x+w,y,2,h,'#7a746a')}
// ── 戶外建築 ──
FD.oinn=(c,x,y,w,h)=>{const cx=x+w/2;
 R(c,x+3,y+h-1,w,5,'rgba(0,0,0,.25)');
 oPlaster(c,x+8,y+58,w-16,h-58-4);R(c,x+4,y+h-6,w-8,6,'#6a5a46');R(c,x+4,y+h-6,w-8,1.4,'#8a7a64');
 // 二樓
 oWoodWall(c,x+14,y+30,w-28,30,'#a8794a');for(let i=0;i<5;i++){const wx=x+24+i*((w-60)/4);oShoji(c,wx,y+36,22,16,i%2==0)}
 R(c,x+12,y+54,w-24,3,'#3a2410');for(let i=0;i<w-24;i+=6)R(c,x+14+i,y+50,1.2,5,'#3a2410');
 oRoof(c,cx,y+2,w*.46,w+10,26,'#46566a','#2a3646');R(c,cx-w*.23,y-1,w*.46,3,'#2a3646');
 oRoof(c,cx,y+56,w-8,w+4,12,'#46566a','#2a3646');
 // 入口
 const dw=64,dx=cx-dw/2;oSlide(c,dx+4,y+h-32,dw-8,28);R(c,dx-2,y+h-36,dw+4,4,'#3a2410');
 oNoren(c,dx+6,y+h-42,dw-12,18,'#27408b','湯');
 oLantern(c,dx-10,y+h-46,'#d9452f');oLantern(c,dx+dw+10,y+h-46,'#d9452f');
 oSign(c,x+16,y+64,16,44,'湯之里','#f4ead0','#2a1a0a',9,1);R(c,x+16,y+64,16,1,'#6a4a2a');
 // 窗
 [[x+28,y+h-34],[x+w-52,y+h-34]].forEach(q=>{oShoji(c,q[0],q[1],22,16,1)});
 // 煙囪
 R(c,x+w-40,y-8,8,12,'#7a6a5a');R(c,x+w-41,y-9,10,2,'#5a4a3a')};
FD.oeat=(c,x,y,w,h)=>{const cx=x+w/2;R(c,x+3,y+h-1,w,5,'rgba(0,0,0,.25)');
 oWoodWall(c,x+6,y+30,w-12,h-30-3,'#b88a5a');R(c,x+3,y+h-5,w-6,5,'#6a5a46');
 oRoof(c,cx,y+4,w*.5,w+8,28,'#7a4a2a','#4a2a14');for(let i=0;i<w+8;i+=7)R(c,cx-(w+8)/2+i,y+10,1,16,'rgba(255,230,160,.10)');
 const dw=40,dx=cx-dw/2;oSlide(c,dx+3,y+h-30,dw-6,26);oNoren(c,dx+4,y+h-40,dw-8,16,'#c0392b','食');
 oLantern(c,dx-9,y+h-42,'#e0443a');oLantern(c,dx+dw+9,y+h-42,'#e0443a');
 oShoji(c,x+16,y+h-34,26,16,1);oShoji(c,x+w-42,y+h-34,26,16,1);
 oSign(c,cx-26,y+34,52,12,'山莊食堂','#f4ead0','#3a1a0a',9);R(c,x+w-28,y-6,5,10,'#6a5a4a')};
FD.otea=(c,x,y,w,h)=>{const cx=x+w/2;R(c,x+3,y+h-1,w,5,'rgba(0,0,0,.25)');
 oPlaster(c,x+6,y+32,w-12,h-32-3);R(c,x+3,y+h-5,w-6,5,'#6a5a46');
 oRoof(c,cx,y+4,w*.44,w+8,30,'#3e6a52','#244a36');
 const dw=36,dx=cx-dw/2;R(c,dx-1,y+h-34,dw+2,30,'#3a2410');R(c,dx,y+h-33,dw,28,'#f2e6c4');
 for(let r=0;r<3;r++)for(let k=0;k<4;k++)R(c,dx+3+k*8,y+h-30+r*8,6,6,['#6a8a3a','#a8602a','#b8452a','#3a6a4a'][(r+k)%4]);
 oNoren(c,dx-8,y+h-42,dw+16,14,'#2a6a4a','茶');oSign(c,cx-24,y+36,48,12,'茶行・伴手禮','#f4ead0','#2a1a0a',7.5);
 oLantern(c,x+12,y+h-40,'#6a8a3a');oLantern(c,x+w-12,y+h-40,'#6a8a3a');R(c,x+w-26,y+h-12,14,9,'#8a5a2e');R(c,x+w-24,y+h-17,10,6,'#4a8a4a')};
FD.obath=(c,x,y,w,h)=>{const cx=x+w/2;R(c,x+3,y+h-1,w,5,'rgba(0,0,0,.25)');
 R(c,x+8,y+34,w-16,h-34-3,'#c8c0ae');for(let r=0;r<h;r+=7)for(let k=(r/7|0)%2*5;k<w;k+=10)R(c,x+8+k,y+34+r,9,.7,'rgba(0,0,0,.2)');R(c,x+3,y+h-5,w-6,5,'#6a5a46');
 oRoof(c,cx,y+8,w*.4,w+10,28,'#5a3a3a','#3a2222');oRoof(c,cx,y+4,w*.26,w*.5,8,'#5a3a3a','#3a2222');
 R(c,x+w-34,y-14,10,26,'#8a7a6a');R(c,x+w-35,y-15,12,2,'#5a4a3a');R(c,x+w-34,y-6,10,1,'#6a5a4a');
 const dw=54,dx=cx-dw/2;oSlide(c,dx+3,y+h-32,dw-6,28);R(c,dx-2,y+h-36,dw+4,4,'#3a2410');
 R(c,dx+2,y+h-52,dw-4,14,'#e8d8b0');R(c,dx+2,y+h-52,dw-4,14,'#2b4a88');txt(c,'岩之湯',cx,y+h-41,'#fff','bold 10px sans-serif');
 oNoren(c,dx+6,y+h-34,10,14,'#c0392b','男');oNoren(c,dx+dw-16,y+h-34,10,14,'#2f6fd0','女');
 [[x+22,y+h-34],[x+w-44,y+h-34]].forEach(q=>oShoji(c,q[0],q[1],22,16,1));
 oLantern(c,dx-12,y+h-40,'#d9452f');oLantern(c,dx+dw+12,y+h-40,'#d9452f')};
FD.osta=(c,x,y,w,h)=>{const cx=x+w/2;R(c,x+3,y+h-1,w,5,'rgba(0,0,0,.25)');
 oWoodWall(c,x+8,y+34,w-16,h-34-3,'#c8a070','#5a3a1a');R(c,x+3,y+h-5,w-6,5,'#6a5a46');
 oPoly(c,[[x-4,y+38],[cx,y+6],[x+w+4,y+38]],'#b5432f');for(let i=1;i<10;i++){const k=i/10;R(c,x-4+k*(w/2+4)*.9,y+38-k*32,(w+8)*(1-k)*1.0,.7,'rgba(0,0,0,.2)')}R(c,x-4,y+37,w+8,2.4,'#6a2a1a');
 oPoly(c,[[cx-8,y+16],[cx,y+8],[cx+8,y+16]],'#e8d8b0');
 R(c,cx-14,y+16,28,22,'#f4efe0');R(c,cx-14,y+16,28,2,'#5a3a1a');oEl(c,cx,y+27,8,8,'#fff');oEl(c,cx,y+27,8,8,'rgba(0,0,0,0)');R(c,cx-.6,y+21,1.2,6,'#222');R(c,cx,y+26.4,5,1.2,'#222');
 oSign(c,cx-34,y+42,68,13,'溫泉鄉站','#1c3d5c','#fff',9.5);
 const dw=40,dx=cx-dw/2;R(c,dx-1,y+h-34,dw+2,31,'#3a2410');R(c,dx,y+h-33,dw,29,'#bfe0f0');R(c,dx+dw/2-.4,y+h-33,.8,29,'#3a2410');R(c,dx,y+h-33,dw,5,'rgba(255,255,255,.4)');
 oShoji(c,x+16,y+h-34,22,16,1);oShoji(c,x+w-38,y+h-34,22,16,1)};
FD.oshrine=(c,x,y,w,h)=>{const cx=x+w/2;R(c,x+3,y+h-1,w,5,'rgba(0,0,0,.25)');
 R(c,x+10,y+h-8,w-20,8,'#a8a090');R(c,x+14,y+h-12,w-28,4,'#c8c0b0');
 for(let i=0;i<4;i++)R(c,x+24+i*((w-52)/3),y+44,5,h-56,'#c0392b');R(c,x+18,y+58,w-36,3,'#8a2a1a');
 R(c,x+22,y+46,w-44,h-58,'#3a2a1a');R(c,x+34,y+60,w-68,h-72,'#4a3828');R(c,cx-10,y+h-40,20,26,'#2a1a10');
 oPoly(c,[[x-2,y+48],[x+16,y+26],[x+w-16,y+26],[x+w+2,y+48]],'#2c3a46');oPoly(c,[[x+14,y+28],[cx,y+8],[x+w-14,y+28]],'#2c3a46');
 for(let i=1;i<7;i++)R(c,x+4+i*2,y+27+i*3,w-8-i*4,.7,'rgba(255,255,255,.12)');R(c,x-2,y+47,w+4,2.4,'#1a242c');
 oPoly(c,[[x-6,y+44],[x-2,y+48],[x+2,y+44]],'#2c3a46');oPoly(c,[[x+w-2,y+44],[x+w+2,y+48],[x+w+6,y+44]],'#2c3a46');
 R(c,cx-12,y+48,24,2,'#e8d8b0');for(let i=0;i<5;i++){R(c,cx-10+i*5,y+50,2.4,5,'#fff')}
 R(c,cx-12,y+h-16,24,8,'#6a4a2a');R(c,cx-12,y+h-16,24,1.4,'#8a6a3a');for(let i=0;i<6;i++)R(c,cx-11+i*4,y+h-14,.7,6,'#3a2410');
 [[x+4],[x+w-14]].forEach(q=>{R(c,q[0],y+h-20,10,18,'#9a9488');oEl(c,q[0]+5,y+h-24,5,5,'#aaa498');R(c,q[0]+2,y+h-26,2,2,'#222');R(c,q[0]+6,y+h-26,2,2,'#222')})};
FD.otorii=(c,x,y,w,h)=>{const cx=x+w/2;R(c,x+2,y+h-1,w,3,'rgba(0,0,0,.2)');
 R(c,x+4,y+6,6,h-6,'#c0392b');R(c,x+w-10,y+6,6,h-6,'#c0392b');R(c,x+4,y+h-3,6,3,'#2a2a2a');R(c,x+w-10,y+h-3,6,3,'#2a2a2a');
 R(c,x-2,y+8,w+4,5,'#c0392b');oPoly(c,[[x-6,y+3],[x+w+6,y+3],[x+w+2,y+8],[x-2,y+8]],'#2a2a2a');R(c,x+4,y+16,w-8,3,'#c0392b');R(c,cx-5,y+11,10,8,'#2a2a2a');R(c,cx-4,y+12,8,6,'#e8d8b0')};
FD.pine=(c,x,y,w,h)=>{const cx=x+w/2,b=y+h;R(c,x-3,b-3,w+6,4,'rgba(0,0,0,.22)');R(c,cx-2,b-14,4,14,'#5a3a1f');R(c,cx-2,b-14,1.2,14,'#7a5028');
 for(let i=0;i<4;i++){const ty=b-18-i*10,ww=24-i*4;oPoly(c,[[cx-ww/2,ty+11],[cx,ty-9],[cx+ww/2,ty+11]],i%2?'#2f6a42':'#2a5c3a');oPoly(c,[[cx-ww/2+2,ty+9],[cx,ty-7],[cx-1,ty+9]],'rgba(255,255,255,.07)');R(c,cx-ww/2,ty+10,ww,1,'rgba(0,0,0,.22)')}};
FD.maple=(c,x,y,w,h,f)=>{const cx=x+w/2,b=y+h,cols=f[5]=='y'?['#e8b030','#f0c840','#d89a20']:['#c9302c','#e04a2a','#a82424'];R(c,x-3,b-3,w+6,4,'rgba(0,0,0,.22)');R(c,cx-2,b-16,4,16,'#4a2f1a');R(c,cx-6,b-18,4,2,'#4a2f1a');
 oEl(c,cx,b-30,17,13,cols[2]);oEl(c,cx-9,b-26,10,9,cols[0]);oEl(c,cx+9,b-26,10,9,cols[1]);oEl(c,cx,b-36,12,9,cols[1]);oEl(c,cx-3,b-34,6,4,'rgba(255,255,255,.14)');
 const r=orn(x*7+y);for(let i=0;i<14;i++)R(c,cx-16+r()*32,b-42+r()*26,2.2,1.6,cols[i%3])};
FD.cherry=(c,x,y,w,h)=>{const cx=x+w/2,b=y+h;R(c,x-3,b-3,w+6,4,'rgba(0,0,0,.22)');R(c,cx-2,b-16,4,16,'#5a3a2a');oEl(c,cx,b-30,18,13,'#f0a8c0');oEl(c,cx-9,b-26,10,9,'#f8c0d4');oEl(c,cx+9,b-26,10,9,'#f4b0c8');oEl(c,cx,b-36,12,9,'#f8d0de');const r=orn(x+y);for(let i=0;i<16;i++)R(c,cx-17+r()*34,b-42+r()*26,1.8,1.8,'#fff0f4')};
FD.rockb=(c,x,y,w,h)=>{R(c,x,y+h-2,w+2,3,'rgba(0,0,0,.22)');oEl(c,x+w/2,y+h*.58,w/2,h*.5,'#8a8a86');oEl(c,x+w*.4,y+h*.46,w*.32,h*.3,'#a8a8a2');oEl(c,x+w*.62,y+h*.7,w*.3,h*.22,'#767672');R(c,x+w*.3,y+h*.3,w*.2,1,'rgba(255,255,255,.35)')};
FD.slant=(c,x,y,w,h)=>{R(c,x+1,y+h-1,w,2,'rgba(0,0,0,.22)');R(c,x+w/2-4,y+h-4,8,4,'#a8a298');R(c,x+w/2-2,y+h-12,4,9,'#b8b2a8');R(c,x+w/2-5,y+h-18,10,6,'#c8c2b8');R(c,x+w/2-3,y+h-16,6,3,'#ffe8a0');oPoly(c,[[x+w/2-7,y+h-18],[x+w/2,y+h-24],[x+w/2+7,y+h-18]],'#a8a298')};
FD.obench=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.2)');R(c,x+2,y+h-6,2.4,6,'#4a2f1a');R(c,x+w-4.4,y+h-6,2.4,6,'#4a2f1a');R(c,x,y+h-9,w,3.6,'#a8794a');R(c,x,y+h-9,w,.9,'rgba(255,255,255,.3)');R(c,x,y,w,2.4,'#8a5a2e');R(c,x+1,y+1,w-2,.8,'rgba(255,255,255,.2)')};
FD.ofence=(c,x,y,w,h)=>{for(let i=0;i<w;i+=8){R(c,x+i,y,2.4,h,'#8a5a2e');R(c,x+i,y,2.4,1,'#b88a54')}R(c,x,y+h*.28,w,1.8,'#6a4222');R(c,x,y+h*.62,w,1.8,'#6a4222')};
FD.blk=()=>{};
FD.bridge=(c,x,y,w,h)=>{R(c,x,y,w,h,'#a8794a');for(let i=0;i<w;i+=4)R(c,x+i,y,.8,h,'rgba(0,0,0,.3)');R(c,x,y,w,2.6,'#6a4222');R(c,x,y+h-2.6,w,2.6,'#6a4222');R(c,x,y-1,w,1,'rgba(255,255,255,.3)');[0,w-3].forEach(o=>{R(c,x+o,y-3,3,h+6,'#5a3a1a')});for(let i=8;i<w-8;i+=16){R(c,x+i,y-3,2,3,'#5a3a1a');R(c,x+i,y+h,2,3,'#5a3a1a')}};
FD.foot=(c,x,y,w,h)=>{R(c,x+1,y+h,w,3,'rgba(0,0,0,.22)');RR(c,x-3,y-3,w+6,h+6,6,'#8a8478');RR(c,x-1,y-1,w+2,h+2,5,'#b8b2a2');RR(c,x+2,y+2,w-4,h-4,4,'#8fd4e0');R(c,x+5,y+5,w-10,2,'rgba(255,255,255,.4)');for(let i=0;i<4;i++)R(c,x+8+i*(w-22)/3,y+h*.5,8,1,'rgba(255,255,255,.35)')};
FD.vent=(c,x,y,w,h)=>{R(c,x,y+h-2,w,4,'rgba(0,0,0,.2)');const r=orn(77);oEl(c,x+w/2,y+h*.6,w/2,h*.46,'#cfc8b2');oEl(c,x+w/2,y+h*.56,w*.46,h*.38,'#e8dc9a');oEl(c,x+w*.5,y+h*.55,w*.3,h*.24,'#d8c860');
 for(let i=0;i<22;i++)oEl(c,x+8+r()*(w-16),y+6+r()*(h-12),3+r()*5,2+r()*3,['#8a8a86','#a8a8a2','#767672'][i%3]);
 oEl(c,x+w*.36,y+h*.5,12,7,'#7ac4d0');oEl(c,x+w*.36,y+h*.5,12,7,'rgba(255,255,255,.2)');oEl(c,x+w*.68,y+h*.58,9,5,'#8fd4e0');
 R(c,x+w-22,y+h-6,2,8,'#6a4222');R(c,x+w-30,y+h-14,18,9,'#f0e0b0');R(c,x+w-30,y+h-14,18,9,'#f0e0b0');txt(c,'燙！',x+w-21,y+h-7,'#c0392b','bold 6px sans-serif')};
FD.eggst=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.22)');bxx(c,x,y+8,w,h-8,'#a8794a',4);R(c,x-2,y-4,w+4,6,'#c0392b');for(let i=0;i<w+4;i+=6)R(c,x-2+i,y-4,3,6,'#f4f0e2');R(c,x,y+2,1.4,8,'#6a4222');R(c,x+w-1.4,y+2,1.4,8,'#6a4222');
 R(c,x+4,y+4,w-8,5,'#6a4a2a');for(let i=0;i<6;i++)oEl(c,x+7+i*((w-14)/5),y+5.4,2,2.6,'#f0e2b8');R(c,x+3,y+h-6,w-6,1,'rgba(255,255,255,.3)')};
FD.scope=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.22)');R(c,x+w/2-1,y+8,2,h-8,'#6a6a70');R(c,x+w/2-6,y+h-3,12,3,'#4a4a50');R(c,x+w/2-6,y+4,13,4,'#3a4a6a');R(c,x+w/2+5,y+3,4,6,'#2a3a5a');R(c,x+w/2-6,y+4,13,1,'rgba(255,255,255,.4)')};
FD.deck=(c,x,y,w,h)=>{R(c,x,y,w,h,'#a8794a');for(let i=0;i<h;i+=5){R(c,x,y+i,w,.8,'rgba(0,0,0,.3)')}R(c,x,y,w,2,'rgba(255,255,255,.2)');R(c,x,y,3,h,'#6a4222');R(c,x+w-3,y,3,h,'#6a4222');R(c,x,y,w,3,'#6a4222')};
FD.trail=(c,x,y,w,h)=>{R(c,x+w/2-1.4,y+8,2.8,h-8,'#6a4222');R(c,x,y,w,14,'#a8794a');R(c,x,y,w,1.4,'rgba(255,255,255,.3)');R(c,x,y+13,w,1.4,'rgba(0,0,0,.3)');txt(c,'登山步道 ▶',x+w/2,y+10,'#2a1a0a','bold 6.4px sans-serif')};
FD.board=FD.board||((c,x,y,w,h)=>{R(c,x,y,w,h,'#5a3a1a');R(c,x+2,y+2,w-4,h-4,'#f4efe0')});
FD.mapb=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.22)');R(c,x+3,y+h-8,2.4,8,'#4a2f1a');R(c,x+w-5.4,y+h-8,2.4,8,'#4a2f1a');R(c,x,y,w,h-6,'#4a2f1a');R(c,x+2,y+2,w-4,h-10,'#f2e6c4');R(c,x+5,y+5,w-10,2,'#a8794a');R(c,x+5,y+9,w*.5,2,'#7a9a5a');R(c,x+w*.55,y+8,6,6,'#8fd4e0')};
// ── 室內和風家具 ──
FLAT.add('tatami');FLAT.add('futonf');FLAT.add('zrug');
FD.tatami=(c,x,y,w,h)=>{R(c,x,y,w,h,'#c8c47a');for(let i=0;i<w;i+=w/ Math.max(1,Math.round(w/52))){R(c,x+i,y,1.4,h,'#5a6a3a')}R(c,x,y,w,1.2,'#5a6a3a');R(c,x,y+h-1.2,w,1.2,'#5a6a3a');for(let j=3;j<h;j+=3)R(c,x,y+j,w,.5,'rgba(90,100,40,.22)')};
FD.futonf=(c,x,y,w,h,f)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.18)');RR(c,x,y,w,h,3,'#f4f0e8');RR(c,x+2,y+h*.26,w-4,h*.7,2,f[5]||'#4a6a9a');R(c,x+2,y+h*.26,w-4,1.2,'rgba(255,255,255,.4)');RR(c,x+w*.1,y+2,w*.34,h*.2,2,'#fff');R(c,x+w*.1,y+2,w*.34,1,'rgba(0,0,0,.1)')};
FD.zrug=(c,x,y,w,h,f)=>{RR(c,x,y,w,h,2,f[5]||'#8a3a3a');R(c,x+2,y+2,w-4,h-4,shade(f[5]||'#8a3a3a',18));R(c,x+4,y+4,w-8,h-8,f[5]||'#8a3a3a')};
FD.lowt=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,3,'rgba(0,0,0,.22)');R(c,x+2,y+h-3,3,5,'#4a2f1a');R(c,x+w-5,y+h-3,3,5,'#4a2f1a');GR(c,x,y,w,h,'#8a5a2e','#6a4222');R(c,x,y,w,1.2,'rgba(255,255,255,.3)');R(c,x+w/2-4,y+h/2-2,8,4,'#f4efe0');oEl(c,x+w*.25,y+h*.5,2.6,1.8,'#2f6a42');oEl(c,x+w*.75,y+h*.5,2.6,1.8,'#c0392b')};
FD.zabu=(c,x,y,w,h,f)=>{R(c,x,y+h-1,w,2,'rgba(0,0,0,.18)');RR(c,x,y,w,h,3,f[5]||'#c0392b');R(c,x+1,y+1,w-2,1,'rgba(255,255,255,.3)');R(c,x+w/2-.6,y+1,1.2,h-2,'rgba(0,0,0,.12)')};
FD.shojiw=(c,x,y,w,h)=>{oShoji(c,x,y,w,h,0)};
FD.byobu=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.2)');const n=4,ww=w/n;for(let i=0;i<n;i++){R(c,x+i*ww,y+(i%2?1:0),ww-1,h-(i%2?1:0),'#e8d8a8');R(c,x+i*ww,y+(i%2?1:0),ww-1,1.4,'#4a2f1a');R(c,x+i*ww+ww*.2,y+h*.25,ww*.6,h*.4,i%2?'#7a9a6a':'#a8c0a0');oEl(c,x+i*ww+ww*.5,y+h*.35,ww*.2,ww*.2,'#c0392b')}};
FD.zshelf=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.2)');GR(c,x,y,w,h,'#8a5a2e','#5a3a1a');R(c,x+1.5,y+1.5,w-3,h-3,'#3a2410');for(let r=0;r<2;r++){R(c,x+3,y+h/2*r+h/2-2,w-6,1.6,'#a8794a')}[0,1].forEach(r=>{for(let i=0;i<w-10;i+=7)R(c,x+4+i,y+3+r*h/2,5,h/2-6,['#e8d8b0','#c9a060','#8a6a3a'][(i/7|0)%3])})};
FD.opool=(c,x,y,w,h,f)=>{R(c,x+1,y+h+1,w,3,'rgba(0,0,0,.22)');RR(c,x-3,y-3,w+6,h+6,7,'#7a7468');RR(c,x-1.4,y-1.4,w+3,h+3,6,'#a8a294');RR(c,x+1.4,y+1.4,w-3,h-3,5,f[5]||'#7cc8dc');R(c,x+4,y+4,w-8,2,'rgba(255,255,255,.35)');for(let i=0;i<5;i++)R(c,x+8+i*(w-24)/4,y+h*.55,10,1,'rgba(255,255,255,.3)');
 const r=orn(x+y);for(let i=0;i<10;i++)oEl(c,x-4+r()*(w+8),y-3+(r()<.5?0:h+6),3+r()*3,2+r()*2,['#8a8a86','#a8a8a2','#767672'][i%3])};
FD.cedar=(c,x,y,w,h)=>{R(c,x+1,y+h+1,w,3,'rgba(0,0,0,.22)');RR(c,x,y,w,h,5,'#c89a5a');RR(c,x+3,y+3,w-6,h-6,4,'#e0b878');RR(c,x+5,y+5,w-10,h-10,3,'#8fd4e0');for(let i=3;i<w;i+=5)R(c,x+i,y,.8,h,'rgba(90,50,10,.3)');R(c,x+7,y+7,w-14,2,'rgba(255,255,255,.4)')};
FD.sauna=(c,x,y,w,h)=>{R(c,x+1,y+h,w,3,'rgba(0,0,0,.22)');oWoodWall(c,x,y,w,h,'#b88a54');R(c,x+w/2-9,y+8,18,h-8,'#6a4222');R(c,x+w/2-7,y+10,14,h-12,'#d8b87a');R(c,x+w/2-7,y+10,14,5,'#f4e8c8');R(c,x+w/2+3,y+h*.5,1.6,5,'#4a2f1a');txt(c,'蒸',x+w/2,y+h-3,'#fff','bold 7px sans-serif')};
FD.bucket=(c,x,y,w,h)=>{R(c,x+1,y+h,w,1.6,'rgba(0,0,0,.2)');R(c,x,y+2,w,h-2,'#c89a5a');R(c,x,y+2,w,1.2,'#e0b878');R(c,x+w*.3,y+2,.7,h-2,'rgba(90,50,10,.4)');R(c,x+w*.6,y+2,.7,h-2,'rgba(90,50,10,.4)');R(c,x+1,y+h*.4,w-2,1,'#6a4222')};
FD.stoolb=(c,x,y,w,h)=>{R(c,x+1,y+h,w,1.6,'rgba(0,0,0,.2)');R(c,x,y+h*.3,w,h*.55,'#c89a5a');R(c,x,y+h*.3,w,1.4,'#e0b878')};
FD.washb=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.2)');R(c,x,y,w,2,'#9aa4aa');R(c,x+w/2-1,y-2,2,3,'#9aa4aa');R(c,x,y+3,w,h-3,'#d0c8b0');R(c,x+2,y+5,w-4,2,'#8fd4e0')};
FD.train=(c,x,y,w,h)=>{R(c,x+2,y+h,w,3,'rgba(0,0,0,.25)');GR(c,x,y,w,h-6,'#f2efe4','#d8d4c4');R(c,x,y+h*.45,w,5,'#2f6a52');R(c,x,y+h*.45+5,w,2,'#e8b23a');for(let i=0;i<5;i++){const wx=x+10+i*((w-34)/4);R(c,wx,y+6,18,12,'#2a3a52');R(c,wx+1,y+7,16,10,'#9ccce8');R(c,wx+1,y+7,16,3,'rgba(255,255,255,.4)')}R(c,x+w-24,y+4,3,h-14,'#2a3a52');R(c,x,y+h-9,w,3,'#3a3a40');for(let i=0;i<4;i++){oEl(c,x+14+i*((w-28)/3),y+h-3,5,5,'#222');oEl(c,x+14+i*((w-28)/3),y+h-3,2,2,'#888')}R(c,x,y,w,1.4,'#fff');R(c,x+w-10,y+h*.5,10,5,'#e8b23a')};
FD.tkwin=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2.6,'rgba(0,0,0,.22)');bxx(c,x,y+10,w,h-10,'#8a5a2e',5);R(c,x,y-8,w,20,'#4a3a22');R(c,x+3,y-6,w-6,14,'#bfe0f0');R(c,x+3,y-6,w-6,3,'rgba(255,255,255,.45)');R(c,x+w/2-.5,y-6,1,14,'#4a3a22');R(c,x+6,y+9,w-12,2,'#d9b060');txt(c,'售票',x+w/2,y+h-3,'#fff','bold 7px sans-serif')};
FD.ttable=(c,x,y,w,h)=>{R(c,x,y,w,h,'#2a2a32');R(c,x+1,y+1,w-2,h-2,'#1a1a22');for(let i=0;i<4;i++){R(c,x+4,y+4+i*(h-8)/4,w*.25,2,'#ffd84a');R(c,x+w*.4,y+4+i*(h-8)/4,w*.3,2,'#e8e8e8');R(c,x+w*.78,y+4+i*(h-8)/4,w*.16,2,i%2?'#7ad87a':'#ff8a5a')}};
FD.eki=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.22)');bxx(c,x,y,w,h,'#c0392b',5);R(c,x+3,y+6,w-6,h-14,'#ffe9a0');for(let i=0;i<3;i++)R(c,x+5+i*((w-14)/3),y+8,(w-18)/3,h-18,['#8a5a2a','#c9a060','#6a8a3a'][i]);R(c,x+3,y+h-7,w-6,1.2,'rgba(255,255,255,.4)')};
FD.pond=(c,x,y,w,h)=>{R(c,x+1,y+h,w,3,'rgba(0,0,0,.2)');oEl(c,x+w/2,y+h/2,w/2+2,h/2+2,'#8a8478');oEl(c,x+w/2,y+h/2,w/2,h/2,'#6ab8d8');oEl(c,x+w/2-4,y+h/2-3,w/2-10,h/2-8,'rgba(255,255,255,.2)');oEl(c,x+w*.3,y+h*.55,4,2.4,'#e8903a');oEl(c,x+w*.62,y+h*.4,4,2.4,'#f4f0e2')};
FD.maneki=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2,'rgba(0,0,0,.2)');oEl(c,x+w/2,y+h*.6,w*.36,h*.36,'#f4f0e2');oEl(c,x+w/2,y+h*.28,w*.3,h*.26,'#f4f0e2');R(c,x+w*.2,y+1,3,4,'#f4f0e2');R(c,x+w*.64,y+1,3,4,'#f4f0e2');R(c,x+w*.32,y+h*.28,2,2,'#222');R(c,x+w*.58,y+h*.28,2,2,'#222');R(c,x+w*.3,y+h*.5,w*.4,2,'#c0392b');R(c,x+w*.72,y+h*.35,4,9,'#f4f0e2')};
// ── 山區地形（大地圖背景） ──
function onsenTerrain(x,W,H){const r=orn(20261017);
 // 天空
 GR(x,0,0,W,150,'#a8d4ee','#e8f2ec');
 // 遠山
 const peak=(bx,top,base,w,col,snow)=>{oPoly(x,[[bx-w,base],[bx-w*.2,top+(base-top)*.22],[bx,top],[bx+w*.3,top+(base-top)*.28],[bx+w,base]],col);if(snow){oPoly(x,[[bx-w*.2,top+(base-top)*.22],[bx,top],[bx+w*.3,top+(base-top)*.28],[bx+w*.12,top+(base-top)*.2],[bx,top+(base-top)*.3],[bx-w*.08,top+(base-top)*.18]],'#f4f8fb')}};
 [[120,22,175,200,'#8fa6c2',1],[420,8,175,260,'#8aa0be',1],[760,26,175,220,'#93aac4',1],[1010,14,175,200,'#8aa0be',1]].forEach(q=>peak(q[0],q[1],q[2],q[3],q[4],q[5]));
 [[40,70,185,170,'#6f9588'],[290,56,185,200,'#6a9080'],[600,64,185,240,'#6f9588'],[900,52,185,200,'#6a9080']].forEach(q=>peak(q[0],q[1],q[2],q[3],q[4]));
 // 雲霧
 for(let i=0;i<7;i++){const cx=60+i*170+r()*40,cy=60+r()*50;oEl(x,cx,cy,50+r()*30,7,'rgba(255,255,255,.55)');oEl(x,cx+20,cy-4,30,5,'rgba(255,255,255,.55)')}
 // 森林山坡
 GR(x,0,120,W,90,'#4f8a58','#3f7a4a');for(let i=0;i<260;i++){const px=r()*W,py=130+r()*70;oPoly(x,[[px-5,py+9],[px,py-6],[px+5,py+9]],['#2f6a42','#2a5c3a','#3a7a4a'][i%3])}
 // 草地
 GR(x,0,185,W,H-185,'#86be62','#6fae52');
 for(let i=0;i<5200;i++){const px=r()*W,py=185+r()*(H-185);R(x,px,py,1.6+r()*2,1,['#78b058','#94c870','#6aa24c','#a4d47c'][i%4])}
 for(let i=0;i<380;i++){const px=r()*W,py=200+r()*(H-210);R(x,px,py,1.8,1.8,['#fff','#ffd84a','#f0a8c0','#c8a8f0'][i%4]);R(x,px+.4,py+1.8,.8,2,'#4a8a3a')}
 // 林下暗影帶（頂端與兩側）
 const sh=x.createLinearGradient(0,185,0,240);sh.addColorStop(0,'rgba(20,50,30,.35)');sh.addColorStop(1,'rgba(20,50,30,0)');x.fillStyle=sh;x.fillRect(0,185,W,55);
 // ── 石板路 ──
 const paveO=(px,py,pw,ph,a,b)=>{R(x,px-2,py-2,pw+4,ph+4,'rgba(60,50,30,.35)');R(x,px,py,pw,ph,a);for(let j=0;j<ph;j+=9)for(let i=((j/9|0)%2)*7;i<pw;i+=14){R(x,px+i,py+j,13,8,(i+j)%3?a:b);R(x,px+i,py+j+7.4,13,.8,'rgba(0,0,0,.15)');R(x,px+i+12.4,py+j,.7,8,'rgba(0,0,0,.12)')}R(x,px,py,pw,1.2,'rgba(255,255,255,.35)')};
 const sa='#d6ccb4',sb='#c8bea4';
 paveO(140,346,920,50,sa,sb);                 // 溫泉街
 paveO(90,600,950,50,sa,sb);                  // 站前通
 paveO(500,396,56,204,sa,sb);                 // 連接道
 paveO(440,396,230,104,sa,sb);                // 廣場
 paveO(86,510,214,96,sa,sb);                  // 站前廣場
 paveO(930,150,170,50,'#bfb6a2','#b0a690');   // 神社前庭
 // 往旅館、茶行、岩之湯、食堂的入口小石板
 [[262,336,56,14],[637,336,56,14],[838,336,56,14],[690,596,56,14],[162,596,56,14]].forEach(q=>paveO(q[0],q[1],q[2],q[3],sa,sb));
 // 東側登山小徑（泥土）
 x.fillStyle='#b89a6a';x.beginPath();x.moveTo(1040,470);x.quadraticCurveTo(1070,480,1100,462);x.lineTo(1100,500);x.quadraticCurveTo(1060,510,1040,498);x.fill();
 // 西側往觀景台
 paveO(30,346,112,50,'#c9b48a','#bba478');
 // 河流
 const rv=x.createLinearGradient(330,0,372,0);rv.addColorStop(0,'#5ab0d4');rv.addColorStop(.5,'#7ac8e4');rv.addColorStop(1,'#5ab0d4');
 R(x,326,400,50,H-400,'#7a7468');x.fillStyle=rv;x.fillRect(332,400,38,H-400);for(let i=0;i<30;i++){R(x,334+r()*28,404+r()*(H-420),4+r()*6,1,'rgba(255,255,255,.4)')}
 for(let i=0;i<22;i++){oEl(x,328+r()*3,404+i*14.5+r()*6,2.4+r()*2,2+r()*2,['#8a8a86','#a8a8a2','#767672'][i%3]);oEl(x,372+r()*3,404+i*14.5+r()*6,2.4+r()*2,2+r()*2,['#8a8a86','#a8a8a2','#767672'][i%3])}
 // 河源岩壁
 for(let i=0;i<9;i++)oEl(x,322+i*7.4,400+r()*4,6+r()*3,5+r()*2,['#8a8a86','#a8a8a2','#767672'][i%3]);
 R(x,340,396,22,8,'#a8d8ec');for(let i=0;i<4;i++)R(x,342+i*5,398,1.4,10,'rgba(255,255,255,.7)');
 // 神社階梯
 oSteps(x,985,196,50,152);
 // 溫泉街石燈籠線與暖色地面光（白天無感）
 }
