/* v12.5 七大新環境的專屬怪物像素圖 */
const _e=(x,cx,cy,rx,ry,c,a)=>{x.fillStyle=c;x.beginPath();x.ellipse(cx,cy,Math.max(.5,rx),Math.max(.5,ry),a||0,0,7);x.fill()};
const _r=(x,X,Y,w,h,c)=>{x.fillStyle=c;x.fillRect(X,Y,w,h)};
const _p=(x,c,...p)=>{x.fillStyle=c;x.beginPath();x.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)x.lineTo(p[i],p[i+1]);x.closePath();x.fill()};
const _l=(x,c,w,...p)=>{x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)x.lineTo(p[i],p[i+1]);x.stroke()};
const _q=(x,c,w,x0,y0,cx,cy,x1,y1)=>{x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo(cx,cy,x1,y1);x.stroke()};
// 眼睛：白底＋瞳孔＋亮點
const _eye=(x,X,Y,s,pu,hl)=>{_e(x,X,Y,s,s,'#fff');_e(x,X+s*.25,Y+s*.1,s*.6,s*.65,pu||'#1a1024');if(hl!==0)_r(x,Math.round(X-s*.15),Math.round(Y-s*.45),1,1,'#fff')};
// 怒眼：發光＋眉毛
const _angry=(x,X,Y,s,c,dir)=>{_e(x,X,Y,s*1.6,s*1.2,'rgba(0,0,0,.6)');_e(x,X,Y,s,s*.75,c);_r(x,X-.5,Y-s*.6,1,s*1.2,'#1a0408');_l(x,'#1a0408',1.6,X-s*1.4*dir,Y-s*1.5,X+s*1.2*dir,Y-s*.5)};
function vbGet(k,w,h,ol,fn){if(VA[k])return VA[k];return VA[k]=vaPix(w,h,fn,ol)}
// 受擊閃白
function vbFlash(cv){if(cv._fl)return cv._fl;const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');x.drawImage(cv,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='rgba(255,255,255,.85)';x.fillRect(0,0,c.width,c.height);c._k=cv._k;return cv._fl=c}
const vbF=(m,n,sp)=>Math.floor(m.ph*(sp||8))%n;

// ═════════ 深藍海域 ═════════
// 蝦兵：拿三叉戟的蝦子士兵
function vsShrimp(m){const st=m.st=='wind'?'w':m.st=='dash'?'d':'r'+vbF(m,2,8);return vbGet('vsShrimp'+st,40,38,'#4a120a',x=>{
 const C=['#ff8a6a','#ffc6a8','#d8553a','#9a2a1a'],th=st=='d'?8:st=='w'?-3:0,bob=st=='r1'?1:0;
 // 尾扇＋身體節（彎彎的）
 _p(x,C[2],4,34,1,29,9,30);_p(x,C[2],4,34,6,37,10,31);
 [[9,30,6,5],[11,25,6.5,5.5],[14,20,7,6],[17,15,7,6.5]].forEach(([X,Y,a,b],i)=>{_e(x,X,Y+bob,a,b,C[i%2?0:3]);_e(x,X-1,Y-1+bob,a-2,b-2,C[0]);_r(x,X-a+2,Y+bob-1,a*2-4,1,C[1])});
 // 腳
 for(let i=0;i<4;i++)_l(x,C[3],1.5,10+i*3,28+bob,9+i*3+((st[1]=='1')^(i%2)?1:-1),35);
 // 頭＋頭盔＋眼睛＋觸鬚
 _e(x,21,10+bob,6.5,6,C[0]);_p(x,C[1],25,9+bob,33,8+bob,25,12+bob);
 _p(x,'#6a7a9a',14,9+bob,16,3+bob,22,1+bob,27,4+bob,27,8+bob);_r(x,15,8+bob,13,2,'#8a9aba');_p(x,'#ffd84a',20,1+bob,22,-2+bob,24,1+bob);
 _eye(x,24,9+bob,2,'#1a1024',0);
 _q(x,C[3],1,23,5+bob,16,-4,6,3);_q(x,C[3],1,24,5+bob,22,-6,12,-1);
 // 三叉戟
 const sx=20+th,sy=19+bob;_l(x,'#8a5a2a',2,sx-10,sy+4,sx+16,sy-3);_l(x,'#c8d0e0',1.6,sx+15,sy-3,sx+21,sy-5);_l(x,'#c8d0e0',1.4,sx+15,sy-3,sx+19,sy-8);_l(x,'#c8d0e0',1.4,sx+16,sy-2,sx+20,sy);
 _e(x,sx,sy,2.5,2,C[3])})}
// 蟹將（v=1：鐵甲蟹將軍）
function vsCrab(m){const v=m.T.v||0,st=m.st=='guard'?'g':m.st=='wind'||m.st=='shoot'?'s':'w'+vbF(m,2,7);return vbGet('vsCrab'+v+st,48,34,'#3a0a06',x=>{
 const C=v?['#c83a2a','#ff7a5a','#8a1a10']:['#e8503a','#ff9a7a','#a82a1a'],lw=st=='w1'?1:-1;
 // 腳（三對）
 for(let i=0;i<3;i++){const y=22+i*1.5;_l(x,C[2],2,16-i*3,y,10-i*4,y+6+lw*(i%2?1:-1),8-i*4,33);_l(x,C[2],2,32+i*3,y,38+i*4,y+6-lw*(i%2?1:-1),40+i*4,33)}
 // 身體
 _e(x,24,21,14,9,C[2]);_e(x,24,20,13,8,C[0]);_e(x,22,17,8,3.5,C[1]);[[17,23],[30,22],[24,25]].forEach(([X,Y])=>_e(x,X,Y,1.3,1.3,C[2]));
 if(v){_p(x,'#ffd84a',13,20,24,13,35,20,33,23,24,17,15,23);_r(x,23,13,2,9,'#c8a020');_p(x,'#c8d0e0',17,13,24,6,31,13);_p(x,'#ff3a3a',23,7,25,0,27,7)}
 // 眼柄
 _l(x,C[2],2,20,13,19,7);_l(x,C[2],2,28,13,29,7);_eye(x,19,6,2.2);_eye(x,29,6,2.2);_l(x,'#1a0408',1.2,16,3,22,5);_l(x,'#1a0408',1.2,32,3,26,5);
 // 大鉗子
 const claw=(X,Y,s,open)=>{_l(x,C[2],3,24+s*10,17,X-s*2,Y+4);_e(x,X,Y,6+v,5+v,C[0]);_e(x,X-s,Y-1,3,2,C[1]);_p(x,C[0],X+s*3,Y-3,X+s*10,Y-6-open,X+s*6,Y);_p(x,C[2],X+s*3,Y+2,X+s*10,Y+4+open,X+s*5,Y+3)};
 if(st=='g'){claw(36,14,1,0);claw(32,22,1,0)}else if(st=='s'){claw(8,12,-1,0);claw(39,11,1,4)}else{claw(7,14,-1,1);claw(41,14,1,1)}})}
// 刺河豚
function vsPuffer(m){const big=m.st=='shoot'||m.puffT>0?1:0,f=vbF(m,2,6);return vbGet('vsPuffer'+big+f,36,36,'#4a3010',x=>{
 const r=big?12:8.5,cx=17,cy=18;
 if(big)for(let i=0;i<14;i++){const a=i/14*6.283;_p(x,'#e8d8a0',cx+Math.cos(a-.15)*r,cy+Math.sin(a-.15)*r,cx+Math.cos(a)*(r+5),cy+Math.sin(a)*(r+5),cx+Math.cos(a+.15)*r,cy+Math.sin(a+.15)*r)}
 else for(let i=0;i<8;i++){const a=i/8*6.283+.2;_r(x,cx+Math.cos(a)*(r+1),cy+Math.sin(a)*(r+1),1,1,'#c8a860')}
 _p(x,'#e0a030',cx-r+1,cy,cx-r-6,cy-5+f*2,cx-r-6,cy+5-f*2);
 _e(x,cx,cy,r,r*.92,'#f0c050');_e(x,cx+1,cy+r*.35,r*.75,r*.45,'#fff2c8');[[-3,-4],[2,-6],[-5,1],[4,-1]].forEach(([a,b])=>_e(x,cx+a*r/9,cy+b*r/9,1.2,1.2,'#a06a20'));
 _p(x,'#e0a030',cx-2,cy-r+1,cx+2,cy-r-4+f,cx+4,cy-r+2);
 _eye(x,cx+r*.45,cy-r*.3,big?3:2.6);_e(x,cx+r*.95,cy+r*.15,1.6,big?2:1.3,'#c04a3a')})}
// 深海閻王：八爪章魚、兩條粗壯手臂、閻王冕旒
function vsOcto(m){const st=m.st=='raise'?'u':m.st=='slam'?'s':m.st=='ink'?'i':'n'+vbF(m,4,3),rage=m.hp<m.mhp*.5?1:0;return vbGet('vsOcto'+st+rage,120,104,'#14040c',x=>{
 const C=['#7a2048','#b03a66','#4a0e2a','#e07aa0'],cx=60,ph=st[0]=='n'?+st[1]:0;
 // 八隻腳（吸盤）
 for(let i=0;i<8;i++){const bx=24+i*10,dir=i<4?-1:1,w=Math.sin(ph*1.57+i)*4;x.strokeStyle=C[2];x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(bx+2,62);x.bezierCurveTo(bx+dir*4,78,bx+dir*14+w,88,bx+dir*20+w,100-(i%2)*4);x.stroke();
  x.strokeStyle=C[0];x.lineWidth=6;x.stroke();for(let k=1;k<5;k++){const t=k/5,px=bx+2+(dir*20+w-2)*t,py=62+(38-(i%2)*4)*t;_e(x,px-dir*1.5,py,1.6,1.4,C[3])}}
 // 身體＋頭（巨大的外套膜）
 _e(x,cx,52,30,18,C[2]);_e(x,cx,50,28,16,C[0]);
 _e(x,cx,30,30,28,C[2]);_e(x,cx,28,28,26,C[0]);_e(x,cx-8,18,12,9,C[1]);[[44,30],[76,26],[70,40],[48,42],[62,12]].forEach(([X,Y])=>_e(x,X,Y,2.4,2,C[2]));
 // 閻王冕旒（平頂冠＋垂珠）
 _r(x,cx-20,2,40,4,'#1a1018');_r(x,cx-20,2,40,1,'#c8a040');_r(x,cx-8,6,16,6,'#2a1a20');_r(x,cx-8,8,16,1,'#c8a040');for(let i=0;i<7;i++){_l(x,'#c8a040',1,cx-18+i*6,6,cx-18+i*6,12+i%2*2);_e(x,cx-18+i*6,13+i%2*2,1.3,1.3,'#ff4a4a')}
 // 猙獰的臉：發光怒眼、皺紋、獠牙大嘴
 const ec=rage?'#ff3a2a':'#ffd040';_angry(x,cx-11,32,4,ec,1);_angry(x,cx+11,32,4,ec,-1);_l(x,C[2],1.5,cx-3,26,cx,34,cx+3,26);
 _l(x,C[2],1.2,cx-20,40,cx-14,38);_l(x,C[2],1.2,cx+20,40,cx+14,38);
 const mo=st=='i'||st=='s'?7:4;_e(x,cx,46,11,mo,'#2a0410');_e(x,cx,47,9,mo-1.5,'#6a0a1a');for(let i=0;i<6;i++){_p(x,'#f0e8d0',cx-9+i*3.6,46-mo+1,cx-7.5+i*3.6,46-mo+4,cx-6+i*3.6,46-mo+1);_p(x,'#f0e8d0',cx-9+i*3.6,46+mo-1,cx-7.5+i*3.6,46+mo-4,cx-6+i*3.6,46+mo-1)}
 _p(x,'#f0e8d0',cx-11,44,cx-9,52,cx-7,44);_p(x,'#f0e8d0',cx+11,44,cx+9,52,cx+7,44);
 // 兩條粗壯的上肢
 const arm=(s)=>{const up=st=='u',sl=st=='s',sx=cx+s*24,sy=46,ex=sx+s*(up?10:16),ey=up?14:sl?66:58,hx=ex+s*(up?2:6),hy=up?2:sl?78:70;
  _l(x,C[2],13,sx,sy,ex,ey,hx,hy);_l(x,C[0],10,sx,sy,ex,ey,hx,hy);_e(x,ex,ey,5,4,C[1]);_e(x,hx,hy,9,8,C[2]);_e(x,hx,hy,7.5,6.5,C[0]);
  for(let k=0;k<3;k++)_e(x,hx+s*(k-1)*3,hy+(up?-6:6),2,2,C[3]);_e(x,sx+s*4,sy+2,6,5,C[1])};arm(-1);arm(1)})}

// ═════════ 劇毒沼澤 ═════════
// 青蛙通用：t＝0 跳跳毒蛙、1 長舌樹蛙、2 膨膨毒蟾；v＝1 毒蛙統領
function vsFrog(m){const t=m.T.ft||0,v=m.T.v||0,st=!m.og?'j':m.st=='tongue'||m.st=='shoot'?'o':m.st=='puff'||m.puffT>0?'p':'s'+vbF(m,2,3);return vbGet('vsFrog'+t+v+st,40,32,'#0e2a0a',x=>{
 const P=[['#5ac83a','#a8f07a','#2a8a1a','#b04ae0'],['#2ab8a8','#8af0e0','#147a70','#ff8a2a'],['#7a8a3a','#c8d080','#4a5a1a','#c060e0']][t],C=v?['#3aa83a','#9ae86a','#1a6a1a','#ffd84a']:P,j=st=='j';
 const bx=20,by=j?18:22,w=t==2?13:11,h=t==2?9:8;
 // 後腳
 if(j){_l(x,C[2],4,bx-6,by+4,bx-14,by+9,bx-18,by+12);_l(x,C[2],3,bx+4,by+5,bx+10,by+11)}else{_e(x,bx-8,by+5,6,4,C[2]);_e(x,bx-8,by+4,5,3,C[0]);_r(x,bx-14,by+8,6,2,C[2]);_r(x,bx+4,by+7,4,3,C[2]);_r(x,bx+3,by+9,7,2,C[2])}
 // 身體
 _e(x,bx,by,w,h,C[2]);_e(x,bx,by-1,w-1,h-1,C[0]);_e(x,bx+2,by+3,w-4,h-4,C[1]);
 if(t==0||v)[[-6,-3],[-1,-5],[-8,2],[4,-4]].forEach(([a,b])=>_e(x,bx+a,by+b,1.6,1.4,C[3]));if(t==1){_l(x,C[3],1.5,bx-9,by-4,bx+1,by-6);_l(x,C[3],1.5,bx-9,by,bx-2,by-1)}
 if(t==2){[[-7,-4],[-2,-6],[-9,1],[3,-6],[-4,-1]].forEach(([a,b])=>_e(x,bx+a,by+b,1.8,1.6,C[2]));_e(x,bx+6,by+4,st=='p'?7:4,st=='p'?6:3,st=='p'?'#d8a0ff':C[1])}
 // 眼（頭頂兩顆大眼）
 _e(x,bx+3,by-h+1,3.6,3.6,C[2]);_e(x,bx+9,by-h+2,3.6,3.6,C[2]);_eye(x,bx+3,by-h+1,2.8,t==1?'#c03a10':'#1a1024');_eye(x,bx+9,by-h+2,2.8,t==1?'#c03a10':'#1a1024');
 // 嘴
 if(st=='o'){_p(x,'#3a0a14',bx+5,by-1,bx+w+3,by-3,bx+w+3,by+3);_e(x,bx+w+2,by,2,1.5,'#ff6a8a')}else _l(x,C[2],1,bx+4,by,bx+w,by-1);
 if(v){_p(x,'#ffd84a',bx-1,by-h-1,bx+1,by-h-6,bx+3,by-h-2,bx+6,by-h-7,bx+8,by-h-2,bx+11,by-h-6,bx+12,by-h);_e(x,bx+6,by-h-3,1.2,1.2,'#ff3a6a');_l(x,'#e8e0c0',1.4,bx-4,by-2,bx-1,by+2)}})}
// 腐沼蟾皇
function vsToad(m){const st=m.st=='tongue'?'o':m.st=='gas'?'g':m.st=='leap'||m.z>0?'j':'n'+vbF(m,2,2);return vbGet('vsToad'+st,120,92,'#101806',x=>{
 const C=['#5a6a2a','#8a9a4a','#34401a','#b8c070'],cx=60,j=st=='j',by=j?50:58;
 // 腳
 if(j){_l(x,C[2],12,30,by+10,16,by+24,8,by+30);_l(x,C[2],12,90,by+10,104,by+24,112,by+30)}else{_e(x,26,by+22,16,10,C[2]);_e(x,26,by+20,14,8,C[0]);_e(x,94,by+22,16,10,C[2]);_e(x,94,by+20,14,8,C[0]);for(let i=0;i<3;i++){_e(x,14+i*7,by+30,3,2,C[2]);_e(x,92+i*7,by+30,3,2,C[2])}}
 // 肥肚子
 _e(x,cx,by+2,48,30,C[2]);_e(x,cx,by,46,28,C[0]);_e(x,cx,by+12,32,15,C[3]);_e(x,cx-14,by-14,14,8,C[1]);
 // 疣＋發光毒膿包
 [[22,by-6],[34,by-18],[86,by-14],[98,by-2],[30,by+8],[92,by+10],[50,by-24],[74,by-22]].forEach(([X,Y],i)=>{_e(x,X,Y,3.5,3,C[2]);_e(x,X-.5,Y-.5,2.4,2,i%3?C[1]:'#c060ff')});
 // 鼓起的喉囊（毒氣）
 if(st=='g'){_e(x,cx,by+10,24,18,'#a060d0');_e(x,cx-6,by+4,8,6,'#e0b0ff')}
 // 大眼（黃色縱瞳）
 [[cx-20,by-26],[cx+20,by-26]].forEach(([X,Y],i)=>{_e(x,X,Y,11,10,C[2]);_e(x,X,Y-1,9,8,'#ffd040');_e(x,X,Y-1,2,6.5,'#1a0a04');_l(x,C[2],3,X-10*(i?-1:1),Y-11,X+8*(i?-1:1),Y-6)});
 // 大嘴
 if(st=='o'){_p(x,'#3a0612',cx-34,by-8,cx+34,by-8,cx+26,by+8,cx-26,by+8);_e(x,cx,by+2,18,4,'#d03a5a')}else{_q(x,C[2],2.5,cx-36,by-10,cx,by+2,cx+36,by-10)}
 // 歪歪的皇冠
 x.save();x.translate(cx+6,by-38);x.rotate(.18);_p(x,'#e8b830',-14,4,-14,-6,-8,-1,-3,-10,2,-1,8,-8,10,4);_r(x,-14,2,24,3,'#b88a10');[-8,-1,6].forEach(X=>_e(x,X,-1,1.6,1.6,'#c03aff'));x.restore()})}

// ═════════ 冰封雪原 ═════════
// 狼通用：t＝0 雪原狼、1 冰牙狼、2 霜狼崽；v＝1 白銀狼首領
function vsWolf2(m){const t=m.T.ft||0,v=m.T.v||0,st=m.st=='wind'?'w':m.st=='dash'?'d':m.st=='shoot'||m.st=='howl'?'o':Math.abs(m.vx)>20&&m.og?'r'+vbF(m,4,11):'i';const W=t==2?28:44,H=t==2?22:30;return vbGet('vsWolf'+t+v+st,W,H,'#0e1828',x=>{
 const P=[['#e8eef8','#ffffff','#9ab0d0','#5a6a8a'],['#7ab8f0','#c8ecff','#3a78c0','#1a3a6a'],['#f0f4ff','#ffffff','#b8c8e0','#7a8aa8']][t],C=v?['#c8d0e0','#ffffff','#8a98b0','#3a4458']:P,s=t==2?.62:1,X=(a)=>a*s,Y=(b)=>b*s+(t==2?2:0);
 const crouch=st=='w'?2:0,str=st=='d'?3:0,run=st[0]=='r'?+st[1]:-1,leg=(lx,i)=>{const o=run>=0?[3,1,-3,-1][(run+i)%4]:str?(i<2?4:-4):0;_l(x,C[3],X(3),X(lx),Y(19+crouch),X(lx+o),Y(26));_r(x,X(lx+o)-1,Y(26),X(4),X(2),C[2])};
 leg(10,0);leg(30,1);
 // 尾巴
 _p(x,C[2],X(9),Y(13+crouch),X(1-str),Y(8),X(2),Y(15),X(6),Y(18));_p(x,C[1],X(3),Y(10),X(1-str),Y(8),X(5),Y(12));
 // 身體
 _e(x,X(21+str/2),Y(15+crouch),X(13+str),Y(7),C[2]);_e(x,X(21+str/2),Y(14+crouch),X(12+str),Y(6),C[0]);_e(x,X(24),Y(17+crouch),X(8),Y(3),C[1]);
 if(t==1)for(let i=0;i<4;i++)_p(x,'#e0f8ff',X(12+i*5),Y(9+crouch),X(14+i*5),Y(2+crouch-(i%2)*2),X(16+i*5),Y(9+crouch));
 if(v){_e(x,X(30),Y(11+crouch),X(8),Y(7),'#f8fcff');for(let i=0;i<5;i++)_p(x,'#e8f0ff',X(25+i*2),Y(6+crouch),X(26+i*2),Y(1+crouch),X(28+i*2),Y(6+crouch))}
 leg(15,2);leg(35,3);
 // 頭
 const hx=34+str,hy=10+crouch;_e(x,X(hx),Y(hy),X(7),Y(6),C[2]);_e(x,X(hx),Y(hy-1),X(6.3),Y(5.3),C[0]);_p(x,C[0],X(hx+3),Y(hy-2),X(hx+11),Y(hy+1),X(hx+10),Y(hy+4),X(hx+3),Y(hy+4));
 _p(x,C[2],X(hx-4),Y(hy-4),X(hx-3),Y(hy-11),X(hx+1),Y(hy-5));_p(x,C[2],X(hx),Y(hy-5),X(hx+2),Y(hy-11),X(hx+4),Y(hy-4));_r(x,X(hx+10),Y(hy),X(2),X(2),'#1a1a2a');
 const eyc=st=='w'||st=='d'?'#ff3a3a':t==1?'#4ae8ff':'#2a3a6a';_r(x,X(hx+2),Y(hy-3),X(2.4),X(2),eyc);if(v)_l(x,'#c04a4a',1,X(hx),Y(hy-6),X(hx+4),Y(hy+1));
 if(st=='o'||st=='d'){_p(x,'#5a0a1a',X(hx+4),Y(hy+3),X(hx+12),Y(hy+3),X(hx+10),Y(hy+8));_p(x,'#fff',X(hx+6),Y(hy+3),X(hx+7),Y(hy+5),X(hx+8),Y(hy+3));if(t==1)_e(x,X(hx+13),Y(hy+5),X(2.5),Y(2),'#c8f4ff')}})}
// 霜月狼王・芬里爾：一階段巨狼，二階段狼人
function vsFenrir(m){const were=m.form==2,st=m.st;let k;if(!were)k=st=='wind'?'w':st=='dash'?'d':st=='howl'?'o':Math.abs(m.vx)>20?'r'+vbF(m,2,8):'i';else k=st=='claw'||st=='claw2'?'c'+((m.cc||0)%2):st=='bite'||st=='dash'?'b':st=='howl'||st=='morph'?'o':st=='leap'?'j':'i'+vbF(m,2,3);
 return vbGet('vsFen'+(were?1:0)+k,were?96:116,were?112:70,'#060a18',x=>{const C=['#3a4a6a','#5a6e94','#1e2840','#a8d8ff'],rage=were;
 if(!were){// 巨狼
  const cr=k=='w'?4:0,dsh=k=='d'?8:0,rn=k[0]=='r'?+k[1]:-1,leg=(lx,i)=>{const o=rn>=0?(rn^(i%2)?6:-6):dsh?(i<2?10:-10):0;_l(x,C[2],9,lx,40+cr,lx+o,62);_l(x,C[0],7,lx,40+cr,lx+o,62);_p(x,'#dfeaff',lx+o-4,63,lx+o+5,63,lx+o+7,66,lx+o-4,66)};
  leg(26,0);leg(62,1);_p(x,C[2],22,30+cr,0,12,4,30,14,42);_p(x,C[3],6,16,0,12,10,24);
  _e(x,52+dsh/2,32+cr,36+dsh,18,C[2]);_e(x,52+dsh/2,30+cr,34+dsh,16,C[0]);_e(x,58,40+cr,24,7,C[1]);
  for(let i=0;i<9;i++)_p(x,i%2?'#e8f6ff':C[3],56+i*4,16+cr,59+i*4,2+cr+(i%3)*2,62+i*4,18+cr);
  // 斷掉的鎖鏈
  _l(x,'#8a8a9a',3,80,32+cr,74,46+cr);[[78,36],[75,42]].forEach(([X,Y])=>_e(x,X,Y+cr,3,2,'#b0b0c0'));
  leg(36,2);leg(74,3);
  const hx=92+dsh,hy=24+cr;_e(x,hx,hy,14,12,C[2]);_e(x,hx,hy-1,13,11,C[0]);_p(x,C[0],hx+6,hy-4,hx+24,hy+2,hx+22,hy+9,hx+6,hy+9);_r(x,hx+21,hy+1,4,3,'#0a0a14');
  _p(x,C[2],hx-8,hy-8,hx-6,hy-24,hx+1,hy-10);_p(x,C[2],hx,hy-10,hx+4,hy-24,hx+8,hy-8);
  _e(x,hx+5,hy-4,3.5,2.5,'#7af0ff');_r(x,hx+5,hy-5,2,2,'#fff');
  if(k=='o'||k=='d'){_p(x,'#4a0a1a',hx+8,hy+7,hx+24,hy+6,hx+20,hy+18);for(let i=0;i<3;i++){_p(x,'#fff',hx+9+i*4,hy+7,hx+10+i*4,hy+11,hx+12+i*4,hy+7)}}
 }else{// 狼人
  const cx=48,ph=k[0]=='i'?+k[1]:0,c=k[0]=='c',cs=c?+k[1]:0,jp=k=='j'?-6:0;
  _l(x,C[2],12,cx-12,78+jp,cx-18,96+jp,cx-14,108);_l(x,C[2],12,cx+12,78+jp,cx+18,96+jp,cx+20,108);_l(x,C[0],9,cx-12,78+jp,cx-18,96+jp,cx-14,108);_l(x,C[0],9,cx+12,78+jp,cx+18,96+jp,cx+20,108);
  [[cx-14,109],[cx+20,109]].forEach(([X,Y])=>{for(let i=0;i<3;i++)_p(x,'#e8e8f0',X-4+i*3,Y-2,X-3+i*3,Y+2,X-2+i*3,Y-2)});
  _p(x,C[2],cx-26,40+jp,cx+26,40+jp,cx+20,82+jp,cx-20,82+jp);_p(x,C[0],cx-24,42+jp,cx+24,42+jp,cx+18,80+jp,cx-18,80+jp);
  _e(x,cx-9,56+jp,8,7,C[1]);_e(x,cx+9,56+jp,8,7,C[1]);for(let i=0;i<3;i++)_r(x,cx-6,66+i*5+jp,12,2,C[2]);
  for(let i=0;i<8;i++)_p(x,i%2?'#e8f6ff':C[3],cx-26+i*7,44+jp,cx-22+i*7,30+jp,cx-18+i*7,44+jp);
  // 巨爪手臂
  const arm=(s,sw)=>{const ex=cx+s*(sw?38:32),ey=sw?40+jp:66+jp,hx=cx+s*(sw?44:36),hy=sw?28+jp:84+jp;_l(x,C[2],12,cx+s*22,46+jp,ex,ey,hx,hy);_l(x,C[0],9,cx+s*22,46+jp,ex,ey,hx,hy);_e(x,hx,hy,7,6,C[1]);
   for(let i=0;i<4;i++){const a=(sw?-1.2:1.4)+(i-1.5)*.35;_p(x,'#f0f0ff',hx+Math.cos(a)*4-1,hy+Math.sin(a)*4,hx+Math.cos(a)*15*(s>0?1:1),hy+Math.sin(a)*15,hx+Math.cos(a)*4+1,hy+Math.sin(a)*4+1)}};
  arm(-1,c&&cs==1||k=='o');arm(1,c&&cs==0||k=='o'||k=='j');
  // 頭＋血盆大口
  const hy=26+jp+ph;_e(x,cx,hy,16,15,C[2]);_e(x,cx,hy-1,15,14,C[0]);_p(x,C[2],cx-14,hy-6,cx-12,hy-28,cx-4,hy-12);_p(x,C[2],cx+14,hy-6,cx+12,hy-28,cx+4,hy-12);
  _p(x,C[0],cx-9,hy+2,cx+9,hy+2,cx+6,hy+14,cx-6,hy+14);
  const op=k=='b'||k=='o'?12:5;_p(x,'#4a0410',cx-10,hy+6,cx+10,hy+6,cx+7,hy+6+op,cx-7,hy+6+op);_e(x,cx,hy+6+op*.6,5,op*.3,'#c0102a');
  for(let i=0;i<5;i++){_p(x,'#fff',cx-9+i*4,hy+6,cx-8+i*4,hy+10,cx-6+i*4,hy+6);_p(x,'#fff',cx-9+i*4,hy+6+op,cx-8+i*4,hy+2+op,cx-6+i*4,hy+6+op)}
  _angry(x,cx-7,hy-5,3,'#ff2a2a',1);_angry(x,cx+7,hy-5,3,'#ff2a2a',-1);_r(x,cx-2,hy+1,4,3,'#0a0a14')}})}

// ═════════ 血色古堡 ═════════
// 蝙蝠通用：t＝0 吸血蝠、1 蝠群、2 音波蝠；v＝1 血月蝠后
function vsBat2(m){const t=m.T.ft||0,v=m.T.v||0,f=vbF(m,2,m.st=='dash'?5:10),cry=m.st=='shoot'||m.st=='wind'&&t==2?1:0;return vbGet('vsBat'+t+v+f+cry,t==1?50:44,t==1?36:34,'#16020a',x=>{
 const one=(cx,cy,s,C,ears,crown)=>{const up=!f;[-1,1].forEach(d=>{_p(x,C[1],cx+d*3*s,cy,cx+d*15*s,cy+(up?-11:7)*s,cx+d*12*s,cy+(up?-6:3)*s,cx+d*9*s,cy+(up?-8:6)*s,cx+d*6*s,cy+(up?-3:3)*s);_l(x,C[2],1,cx+d*3*s,cy,cx+d*13*s,cy+(up?-9:5)*s)});
  _e(x,cx,cy+1*s,6*s,6.5*s,C[0]);const eh=ears?9:6;_p(x,C[0],cx-5*s,cy-3*s,cx-(ears?7:5)*s,cy-eh*s,cx-1*s,cy-4*s);_p(x,C[0],cx+5*s,cy-3*s,cx+(ears?7:5)*s,cy-eh*s,cx+1*s,cy-4*s);
  if(ears){_p(x,'#ff8aa8',cx-5*s,cy-4*s,cx-6*s,cy-7*s,cx-3*s,cy-4*s);_p(x,'#ff8aa8',cx+5*s,cy-4*s,cx+6*s,cy-7*s,cx+3*s,cy-4*s)}
  _e(x,cx-2.2*s,cy-.5*s,1.4*s,1.2*s,'#ffe04a');_e(x,cx+2.2*s,cy-.5*s,1.4*s,1.2*s,'#ffe04a');_r(x,cx-2.5*s,cy-1*s,1,1,'#000');_r(x,cx+2*s,cy-1*s,1,1,'#000');
  if(cry&&ears){_e(x,cx,cy+3.5*s,2.5*s,2.5*s,'#3a0410')}else{_p(x,'#fff',cx-2*s,cy+3*s,cx-1*s,cy+6*s,cx,cy+3*s);_p(x,'#fff',cx+2*s,cy+3*s,cx+1*s,cy+6*s,cx,cy+3*s)}
  if(crown){_p(x,'#ffd84a',cx-5*s,cy-5*s,cx-5*s,cy-10*s,cx-2*s,cy-7*s,cx,cy-11*s,cx+2*s,cy-7*s,cx+5*s,cy-10*s,cx+5*s,cy-5*s);_e(x,cx,cy-7*s,1.3*s,1.3*s,'#ff1a3a')}};
 const R=['#8a1022','#c02a3a','#3a0410'],D=['#5a1a3a','#8a2a5a','#2a0418'];
 if(t==1){[[13,12,.62],[34,10,.62],[24,24,.7],[40,26,.55],[8,27,.5]].forEach(([X,Y,s],i)=>one(X,Y+(f^(i%2)?1:-1),s,i%2?D:R,0,0))}
 else if(t==2)one(22,18,1.1,v?['#6a0a2a','#a01a3a','#2a0010']:D,1,v);else one(22,18,1.05,R,0,0);
 if(v){_e(x,22,30,3,3,'#ff2a3a');_e(x,21,29,1,1,'#fff')}})}
// 德古拉公爵
function vsDrac(m){const st=m.st=='spread'||m.st=='storm'?'s':m.st=='claw'||m.st=='dash'?'c':m.st=='drain'?'d':'i'+vbF(m,2,2);return vbGet('vsDrac'+st,104,104,'#0a0206',x=>{
 const cx=52,sp=st=='s'||st=='d',cl=st=='c',fl=st[0]=='i'?+st[1]:0;
 // 披風翅膀（外黑內紅、蝙蝠翼的邊）
 if(sp){[-1,1].forEach(d=>{_p(x,'#14060e',cx+d*10,26,cx+d*50,8-fl,cx+d*46,30,cx+d*52,46,cx+d*42,56,cx+d*46,74,cx+d*30,70,cx+d*16,90,cx+d*8,60);_p(x,'#8a0a1a',cx+d*12,32,cx+d*42,18,cx+d*40,34,cx+d*44,48,cx+d*36,56,cx+d*38,68,cx+d*26,64,cx+d*14,80);
  for(let i=0;i<3;i++)_l(x,'#2a0a14',1.5,cx+d*12,30,cx+d*(46-i*6),10+i*24)})}
 else{_p(x,'#14060e',cx-22,24,cx+22,24,cx+28+fl,96,cx+12,90,cx,98,cx-12,90,cx-28-fl,96);_p(x,'#8a0a1a',cx-18,30,cx-14,30,cx-12,90,cx-22,92)}
 // 高領
 _p(x,'#14060e',cx-16,26,cx-22,8,cx-8,20);_p(x,'#14060e',cx+16,26,cx+22,8,cx+8,20);_p(x,'#a01020',cx-14,24,cx-18,12,cx-9,20);_p(x,'#a01020',cx+14,24,cx+18,12,cx+9,20);
 // 西裝、領巾、勳章
 _p(x,'#1e1a2a',cx-12,26,cx+12,26,cx+10,72,cx-10,72);_p(x,'#f0e8f0',cx-4,26,cx+4,26,cx+3,40,cx,44,cx-3,40);_e(x,cx,34,2.5,2,'#c01a2a');_e(x,cx+7,44,3,3,'#ffd84a');_e(x,cx+7,44,1.5,1.5,'#c01a2a');
 _l(x,'#1e1a2a',6,cx-8,72,cx-9,96);_l(x,'#1e1a2a',6,cx+8,72,cx+9,96);_r(x,cx-13,95,8,3,'#0a0a0a');_r(x,cx+6,95,8,3,'#0a0a0a');
 // 手
 if(cl){_l(x,'#1e1a2a',5,cx+10,32,cx+28,36);for(let i=0;i<4;i++)_l(x,'#f0e0e8',1.5,cx+28,36,cx+38,30+i*3)}else if(sp){_l(x,'#1e1a2a',5,cx-10,30,cx-26,18);_l(x,'#1e1a2a',5,cx+10,30,cx+26,18);_e(x,cx-27,17,3,3,'#e8dce4');_e(x,cx+27,17,3,3,'#e8dce4')}
 else{_l(x,'#1e1a2a',5,cx-10,30,cx-14,52);_l(x,'#1e1a2a',5,cx+10,30,cx+12,50);_e(x,cx+12,51,3,3,'#e8dce4')}
 // 臉：蒼白、尖下巴、美人尖黑髮、紅眼、獠牙
 _p(x,'#e8dce4',cx-8,8,cx+8,8,cx+8,18,cx,26,cx-8,18);_p(x,'#1a1018',cx-9,10,cx-9,2,cx,0,cx+9,2,cx+9,10,cx+4,5,cx,9,cx-4,5);
 _l(x,'#1a1018',1,cx-6,12,cx-2,13);_l(x,'#1a1018',1,cx+6,12,cx+2,13);_r(x,cx-5,13,2,2,st=='d'?'#ff0a2a':'#e0102a');_r(x,cx+3,13,2,2,st=='d'?'#ff0a2a':'#e0102a');
 _l(x,'#7a1020',1,cx-3,20,cx+3,20);_p(x,'#fff',cx-3,20,cx-2,23,cx-1,20);_p(x,'#fff',cx+1,20,cx+2,23,cx+3,20)})}

// ═════════ 雷鳴高原 ═════════
// 雷翼龍（v＝1 暴雷翼龍王）
function vsPtero(m){const v=m.T.v||0,f=vbF(m,2,6),sp=m.st=='shoot'?1:0;return vbGet('vsPtero'+v+f+sp,58,38,'#0a1018',x=>{
 const C=v?['#3a5a8a','#5a8ac0','#1a2a4a','#ffe04a']:['#c89a3a','#e8c070','#7a5a1a','#ff8a3a'],up=!f;
 // 翅膀（皮膜）
 [-1,1].forEach(d=>{const s=d<0?.75:1;_p(x,C[2],29,17,29+d*26*s,up?2:28,29+d*20*s,up?10:24,29+d*14*s,up?12:22,29+d*8*s,20);_p(x,C[1],29,18,29+d*22*s,up?5:26,29+d*16*s,up?12:22,29+d*7*s,20);_l(x,C[2],1.5,29,17,29+d*26*s,up?2:28)});
 // 身體＋尾
 _e(x,27,20,9,6,C[0]);_e(x,27,22,6,3,'#f0e0c0');_l(x,C[0],2,19,21,6,24);_p(x,C[3],5,22,3,27,8,25);_l(x,C[2],2,24,25,22,31);_l(x,C[2],2,30,25,31,31);
 // 頭＋冠＋長喙
 _e(x,37,14,6,5,C[0]);_p(x,C[0],40,12,56,15+sp,40,17);if(sp)_p(x,C[0],40,17,54,21,40,18);_p(x,C[3],33,12,24,3,36,9);if(v){_p(x,'#fff6a0',30,9,22,0,32,6);_p(x,'#fff6a0',35,10,30,0,38,8)}
 _r(x,38,12,2,2,v?'#ff3a3a':'#1a0a04');if(sp)_e(x,52,18,3,2.5,v?'#fff6a0':'#ffb04a')})}
// 迅雷龍（迅猛龍）
function vsRaptor(m){const st=m.st=='wind'?'w':m.st=='dash'?'d':Math.abs(m.vx)>20&&m.og?'r'+vbF(m,2,10):'i';return vbGet('vsRaptor'+st,44,36,'#08081a',x=>{
 const C=['#4a4aa0','#7a7ad8','#24245a','#ffe04a'],cr=st=='w'?3:0,ds=st=='d'?3:0,rn=st[0]=='r'?+st[1]:-1;
 _p(x,C[0],16,18+cr,0,12+cr,1,16+cr,14,22+cr);
 const leg=(lx,i)=>{const o=rn>=0?(rn^i?5:-4):ds?(i?6:-6):0;_l(x,C[2],3,lx,23+cr,lx-3,28,lx+o,34);_l(x,'#e8e8f0',1.5,lx+o+2,33,lx+o+5,31)};leg(18,0);
 _e(x,22+ds,18+cr,10,7,C[2]);_e(x,22+ds,17+cr,9,6,C[0]);_e(x,23+ds,20+cr,6,3,C[1]);
 for(let i=0;i<4;i++)_l(x,C[3],1.5,14+i*4+ds,13+cr,16+i*4+ds,16+cr,15+i*4+ds,19+cr);
 leg(25,1);_l(x,C[0],2,30+ds,19+cr,34+ds,24+cr);
 _l(x,C[0],5,29+ds,15+cr,34+ds,8+cr);_e(x,37+ds,7+cr,6,4.5,C[0]);_p(x,C[0],38+ds,5+cr,44+ds,8+cr,38+ds,11+cr);_r(x,38+ds,5+cr,2,2,st=='w'||st=='d'?'#ff3a3a':C[3]);
 if(st=='d'||st=='w'){_p(x,'#3a0410',39+ds,9+cr,44+ds,9+cr,40+ds,12+cr);_p(x,'#fff',40+ds,9+cr,41+ds,11+cr,42+ds,9+cr)}})}
// 雷甲龍
function vsAnky(m){const sl=m.st=='slam'||m.st=='wind'?1:0,f=Math.abs(m.vx)>5?vbF(m,2,4):0;return vbGet('vsAnky'+sl+f,58,34,'#0a0a10',x=>{
 const C=['#6a6a5a','#9a9a80','#3a3a30','#7af0ff'];
 // 尾巴＋發光錘
 if(sl){_l(x,C[2],5,16,18,8,8,6,2);_e(x,6,3,6,5,C[2]);_e(x,6,3,4.5,3.8,C[3])}else{_l(x,C[2],5,16,20,6,22,2,24);_e(x,3,24,5,4.5,C[2]);_e(x,3,24,3.8,3.3,C[3])}
 for(let i=0;i<4;i++)_l(x,C[2],5,16+i*9,24,16+i*9+(f^(i%2)?2:-2),32);
 _e(x,31,19,18,10,C[2]);_e(x,31,18,17,9,C[0]);
 // 背甲與水晶刺
 for(let i=0;i<5;i++){_e(x,19+i*6,13,3.5,2.5,C[1]);_p(x,i%2?'#c8faff':C[3],17+i*6,12,19+i*6,4-(i%2)*2,21+i*6,12)}
 _e(x,50,20,6,5,C[0]);_r(x,52,18,2,2,'#ffe04a');_p(x,C[2],44,15,48,10,49,16)})}
// 千年魔龍
function vsDragon(m){const st=m.st=='beam'||m.st=='charge'?'b':m.st=='thunder'||m.st=='storm'?'t':'i'+vbF(m,2,2.5);return vbGet('vsDragon'+st,136,104,'#04060e',x=>{
 const C=['#1e2e5a','#34508c','#0e1630','#e8c060'],up=st=='i0'||st=='t',mo=st=='b';
 // 翅膀
 [[-1,.7],[1,1]].forEach(([d,s])=>{const bx=58,by=40;_p(x,'#0e1630',bx,by,bx+d*60*s,up?2:30,bx+d*56*s,up?24:50,bx+d*44*s,up?22:52,bx+d*36*s,up?36:60,bx+d*22*s,up?34:56,bx+d*10,58);
  _p(x,'#2a3e70',bx+d*4,by+4,bx+d*54*s,up?8:34,bx+d*46*s,up?28:52,bx+d*34*s,up?38:58,bx+d*14,54);for(let i=0;i<3;i++)_l(x,'#0e1630',2,bx,by,bx+d*(56-i*12)*s,up?6+i*10:32+i*8)});
 // 尾巴
 x.strokeStyle=C[2];x.lineWidth=12;x.lineCap='round';x.beginPath();x.moveTo(44,70);x.quadraticCurveTo(14,92,4,74);x.stroke();x.strokeStyle=C[0];x.lineWidth=9;x.stroke();_p(x,C[3],0,70,4,62,9,72);
 // 身體＋金色腹甲
 _e(x,60,66,28,20,C[2]);_e(x,60,64,27,19,C[0]);for(let i=0;i<5;i++)_e(x,64,56+i*6,12-i,2.5,C[3]);
 _l(x,C[2],7,46,80,42,96);_l(x,C[2],7,72,80,76,96);[[42,97],[76,97]].forEach(([X,Y])=>{for(let i=0;i<3;i++)_p(x,'#f0f0ff',X-4+i*3,Y-2,X-3+i*3,Y+3,X-1+i*3,Y-2)});
 // 長脖子＋頭
 x.strokeStyle=C[2];x.lineWidth=16;x.beginPath();x.moveTo(74,56);x.quadraticCurveTo(96,44,100,26);x.stroke();x.strokeStyle=C[0];x.lineWidth=13;x.stroke();for(let i=0;i<4;i++)_e(x,80+i*6,52-i*7,4,2,C[3]);
 for(let i=0;i<5;i++)_p(x,C[1],74+i*6,48-i*6,78+i*6,38-i*6,82+i*6,46-i*6);
 const hx=106,hy=22;_e(x,hx,hy,14,11,C[2]);_e(x,hx,hy-1,13,10,C[0]);_p(x,C[0],hx+6,hy-6,hx+30,hy-2,hx+28,hy+4,hx+6,hy+4);
 if(mo){_p(x,C[0],hx+6,hy+4,hx+28,hy+16,hx+24,hy+18,hx+4,hy+8);_p(x,'#fff6a0',hx+8,hy+4,hx+28,hy+2,hx+26,hy+12);_e(x,hx+26,hy+6,6,5,'#ffffff')}else{_l(x,C[2],1.5,hx+8,hy+3,hx+27,hy+2)}
 for(let i=0;i<3;i++)_p(x,'#f0f0ff',hx+10+i*6,hy+3,hx+11+i*6,hy+7,hx+13+i*6,hy+3);
 // 雙角（閃電）
 _p(x,'#e8e0c0',hx-6,hy-8,hx-22,hy-26,hx-2,hy-12);_p(x,'#e8e0c0',hx+2,hy-9,hx-6,hy-30,hx+6,hy-11);
 _angry(x,hx+8,hy-4,3,mo||st=='t'?'#ffffff':'#ffe04a',-1);
 if(st=='t'){_l(x,'#fff6a0',1.5,hx-20,hy-26,hx-26,hy-34,hx-20,hy-38,hx-28,hy-46);_l(x,'#fff6a0',1.5,hx-6,hy-30,hx-2,hy-38,hx-8,hy-42)}})}

// ═════════ 幻影迷宮 ═════════
function vsGhost(m){const f=vbF(m,3,5),at=m.st=='wind'||m.st=='dash'?1:0;return vbGet('vsGhost'+f+at,34,38,'#2a1a4a',x=>{
 _e(x,17,14,12,12,'#d8d0ff');_p(x,'#d8d0ff',5,14,29,14,29,30,25,26-f,21,32,17,27+f,13,33,9,27-f,5,31);_e(x,13,10,4,5,'#f4f0ff');
 _e(x,12,15,3,at?4:3.5,'#1a0a3a');_e(x,22,15,3,at?4:3.5,'#1a0a3a');_r(x,12,14,1,1,'#b08aff');_r(x,22,14,1,1,'#b08aff');_e(x,17,22,at?3:2,at?3:1.5,'#1a0a3a');
 _e(x,7,22+f,2.5,2,'#c8c0f0');_e(x,28,20-f,2.5,2,'#c8c0f0')})}
// 幻影眼（v＝1 迷霧之眼）
function vsEye(m){const v=m.T.v||0,bl=(m.ph%3.2)<.12?1:0,sh=m.st=='shoot'||m.st=='pull'?1:0,f=vbF(m,2,4);return vbGet('vsEye'+v+bl+sh+f,v?54:36,v?54:36,'#1a0a2a',x=>{
 const c=v?27:18,R=v?14:10;
 for(let i=0;i<(v?8:5);i++){const a=i/(v?8:5)*6.283+f*.3;_l(x,'#7a5ab0',2.5,c+Math.cos(a)*R*.8,c+Math.sin(a)*R*.8,c+Math.cos(a+.3)*(R+7),c+Math.sin(a+.3)*(R+7),c+Math.cos(a+.6)*(R+10),c+Math.sin(a+.6)*(R+10))}
 _e(x,c,c,R+1.5,R+1.5,'#4a2a7a');_e(x,c,c,R,R,'#f4eef8');for(let i=0;i<4;i++){const a=i*1.6;_l(x,'#e05a7a',1,c+Math.cos(a)*R*.95,c+Math.sin(a)*R*.95,c+Math.cos(a+.2)*R*.6,c+Math.sin(a+.2)*R*.6)}
 if(bl){_e(x,c,c,R,R,'#6a4aa0');_l(x,'#2a1a4a',1.5,c-R+1,c,c+R-1,c)}else{_e(x,c+2,c,R*.55,R*.55,sh?'#ff4aa0':'#9a4ae0');_e(x,c+2,c,R*.28,R*.38,'#0a0414');_r(x,c-1,c-4,2,2,'#fff')}
 if(v){for(let i=0;i<3;i++){const a=-1.6+(i-1)*.9,X=c+Math.cos(a)*(R+8),Y=c+Math.sin(a)*(R+8);_e(x,X,Y,4,4,'#4a2a7a');_e(x,X,Y,3,3,'#f4eef8');_e(x,X+.5,Y,1.5,1.5,'#9a4ae0')}}})}
// 霧影刺客
function vsAssn(m){const st=m.st=='wind'?'w':m.st=='dash'?'d':'i'+vbF(m,2,4);return vbGet('vsAssn'+st,40,40,'#0e0a1e',x=>{
 const ds=st=='d'?4:0,cr=st=='w'?2:0;_p(x,'#5a4a8a',12,14+cr,24+ds,14+cr,28+ds,36,20,32,8,36);_p(x,'#3a2a6a',14,16+cr,20,16+cr,20,32,10,34);
 _p(x,'#8a7ac0',4+(st=='i1'?2:0),20,14,16+cr,14,20+cr);_p(x,'#8a7ac0',2,26,14,18+cr,12,22+cr);
 _e(x,20+ds,10+cr,7,7,'#3a2a6a');_p(x,'#3a2a6a',14+ds,8+cr,20+ds,0+cr,26+ds,8+cr);_e(x,21+ds,11+cr,5,4,'#0a0614');_r(x,19+ds,10+cr,2,1,'#c0f0ff');_r(x,23+ds,10+cr,2,1,'#c0f0ff');
 const kx=st=='d'?32:st=='w'?14:26,ky=st=='d'?18:st=='w'?12:22;_l(x,'#3a2a6a',3,22+ds,18+cr,kx,ky);_p(x,'#e0f0ff',kx,ky-1,kx+(st=='w'?-8:9),ky-2,kx,ky+1)})}
// 虛霧巨人
function vsMist(m){const st=m.st=='pull'||m.st=='cast'?'c':m.st=='split'||m.st=='hide'?'s':m.st=='slam'?'h':'i'+vbF(m,3,3);return vbGet('vsMist'+st,104,116,'#1a1430',x=>{
 const cx=52,ph=st[0]=='i'?+st[1]:0,P2=['#9a90c8','#c8c0ec','#6a5e98','#e8e4ff'];
 const puffs=(arr)=>arr.forEach(([X,Y,R],i)=>{_e(x,X,Y,R+1,R+1,P2[2]);_e(x,X,Y-1,R,R,i%2?P2[0]:P2[1])});
 puffs([[cx-14,104,9],[cx+14,104,9],[cx-12,88,10],[cx+12,88,10]]);
 puffs([[cx-18,60,15],[cx+18,60,15],[cx,52,18],[cx-10,74,14],[cx+10,74,14],[cx,40,16]]);
 // 手臂
 const hand=(s)=>{const up=st=='c',sl=st=='h',hx=cx+s*(up?34:40),hy=up?16:sl?96:72;puffs([[cx+s*28,46,10],[cx+s*34,56+(up?-14:0),9],[hx,hy,12]]);for(let i=0;i<3;i++)_e(x,hx+s*(i-1)*5,hy+(up?-10:10),3.5,4,P2[3])};hand(-1);hand(1);
 // 頭
 puffs([[cx,22,14],[cx-8,14,8],[cx+8,12,8]]);
 _e(x,cx-6,22,4,st=='s'?6:3.5,'#2a1a5a');_e(x,cx+6,22,4,st=='s'?6:3.5,'#2a1a5a');_e(x,cx-6,22,2,2,'#7af0ff');_e(x,cx+6,22,2,2,'#7af0ff');_e(x,cx,30,3,2,'#2a1a5a');
 // 胸口的核心
 _e(x,cx,58,8+(st=='s'?4:ph),8+(st=='s'?4:ph),'rgba(122,240,255,.7)');_e(x,cx,58,4,4,'#e8ffff')})}

// ═════════ 暗黑深淵 ═════════
function vsImp(m){const f=vbF(m,2,9),th=m.st=='shoot'?1:0;return vbGet('vsImp'+f+th,38,34,'#0e0414',x=>{
 const up=!f;[-1,1].forEach(d=>_p(x,'#3a1a4a',19+d*4,14,19+d*16,up?3:20,19+d*12,up?10:18,19+d*8,16));
 _q(x,'#5a2a6a',2,13,24,4,28,6,20);_p(x,'#ff3a5a',4,22,7,18,8,22);
 _e(x,19,18,7,7,'#6a2a7a');_e(x,19,20,4,3,'#8a4a9a');_p(x,'#e8e0d0',13,12,10,4,16,10);_p(x,'#e8e0d0',25,12,28,4,22,10);
 _e(x,16,16,2,1.5,'#ffd84a');_e(x,22,16,2,1.5,'#ffd84a');_q(x,'#1a0414',1.2,15,21,19,24,23,21);_r(x,16,21,1,2,'#fff');_r(x,21,21,1,2,'#fff');
 const ox=th?30:26,oy=th?14:22;_e(x,ox,oy,4,4,'#1a0a2a');_e(x,ox,oy,2.5,2.5,'#a04aff')})}
// 墮羽使徒（v＝1 深淵守門者）
function vsFallen(m){const v=m.T.v||0,st=m.st=='shoot'?'s':m.st=='slam'||m.st=='wind'?'h':'i'+vbF(m,2,3);return vbGet('vsFallen'+v+st,v?60:44,v?60:46,'#06020c',x=>{
 const c=v?30:22,s=v?1.25:1,Y=(a)=>a*s,X=(a)=>c+a*s,fl=st[0]=='i'?+st[1]:0;
 [-1,1].forEach(d=>{_p(x,'#16121e',X(d*4),Y(16),X(d*20),Y(2+fl*2),X(d*18),Y(14),X(d*21),Y(24),X(d*14),Y(26),X(d*16),Y(34),X(d*6),Y(28));for(let i=0;i<3;i++)_l(x,'#2e2840',1,X(d*6),Y(18),X(d*(18-i*2)),Y(6+i*9))});
 // 破碎光環
 x.strokeStyle='#8a7a5a';x.lineWidth=1.5;x.beginPath();x.arc(X(0),Y(5),5*s,3.6,5.5);x.stroke();x.beginPath();x.arc(X(0),Y(5),5*s,5.9,6.9);x.stroke();
 // 長袍
 _p(x,'#2a2236',X(-7),Y(14),X(7),Y(14),X(10),Y(42),X(-10),Y(42));_p(x,'#4a3a5e',X(-2),Y(14),X(2),Y(14),X(1),Y(42),X(-1),Y(42));_r(x,X(-8),Y(24),16*s,2*s,'#7a2a4a');
 if(v){_p(x,'#3a3a4a',X(-8),Y(14),X(8),Y(14),X(7),Y(26),X(-7),Y(26));_r(x,X(-8),Y(14),16*s,1.5,'#8a8aa0')}
 // 面具臉
 _e(x,X(0),Y(10),5*s,5.5*s,'#d8d0e0');_r(x,X(-3),Y(9),2*s,1.5*s,'#ff2a4a');_r(x,X(1.5),Y(9),2*s,1.5*s,'#ff2a4a');_l(x,'#8a8098',1,X(-1),Y(12),X(-1),Y(15));
 // 武器
 if(v){const up=st=='h';_l(x,'#5a4a6a',3,X(5),Y(22),X(up?10:14),Y(up?4:30));_p(x,'#b8b0d8',X(up?8:12),Y(up?6:28),X(up?12:16),Y(up?6:28),X(up?11:30),Y(up?-14:52),X(up?9:28),Y(up?-14:52));_r(x,X(up?6:10),Y(up?6:27),8*s,2,'#7a2a4a')}
 else{const sh=st=='s';_l(x,'#2a2236',2.5,X(6),Y(18),X(sh?16:10),Y(sh?14:26));_p(x,'#1a1424',X(sh?16:10),Y(sh?12:24),X(sh?24:12),Y(sh?10:32),X(sh?17:9),Y(sh?16:26))}})}
// 暗影獵犬
function vsHound(m){const st=m.st=='wind'?'w':m.st=='dash'?'d':Math.abs(m.vx)>20&&m.og?'r'+vbF(m,2,10):'i'+vbF(m,2,6);return vbGet('vsHound'+st,46,32,'#04020a',x=>{
 const cr=st=='w'?2:0,ds=st=='d'?3:0,rn=st[0]=='r'?+st[1]:-1,fl=st[0]=='i'?+st[1]:rn>=0?rn:0;
 const leg=(lx,i)=>{const o=rn>=0?(rn^(i%2)?3:-3):ds?(i<2?5:-5):0;_l(x,'#14101e',3,lx,20+cr,lx+o,29);_r(x,lx+o-1,29,4,2,'#2a1a3a')};leg(10,0);leg(30,1);
 _p(x,'#14101e',8,14+cr,0,10,3,16);_e(x,22+ds/2,16+cr,13+ds,7,'#14101e');_e(x,22,18+cr,8,3,'#2a2236');
 for(let i=0;i<6;i++)_p(x,i%2?'#a04aff':'#6a2ac0',14+i*3+ds,12+cr,16+i*3+ds,2+cr-(fl^(i%2))*3,19+i*3+ds,12+cr);
 leg(15,2);leg(35,3);const hx=36+ds,hy=12+cr;_e(x,hx,hy,7,6,'#14101e');_p(x,'#14101e',hx+3,hy-2,hx+11,hy+1,hx+10,hy+4,hx+3,hy+4);_p(x,'#14101e',hx-3,hy-4,hx-1,hy-11,hx+2,hy-4);
 _r(x,hx+2,hy-3,3,2,'#ff2a6a');if(st=='w'||st=='d'){_p(x,'#a04aff',hx+4,hy+3,hx+12,hy+3,hx+10,hy+8);_p(x,'#fff',hx+5,hy+3,hx+6,hy+5,hx+7,hy+3)}})}
// 六翼墮天使（翅膀數＝剩下的命）
function vsSeraph(m){const W=Math.max(0,Math.min(6,m.lives||6)),st=m.st=='rain'||m.st=='cast'?'c':m.st=='quake'||m.st=='slam'?'q':m.st=='revive'?'r':'i'+vbF(m,2,2.5);return vbGet('vsSeraph'+W+st,140,124,'#04020a',x=>{
 const cx=70,fl=st[0]=='i'?+st[1]:0,up=st=='c'||st=='r';
 // 六翼（三對，由上而下）
 const pairs=[[-30,1.05,0],[-4,1.2,1],[22,.95,2]];
 for(let i=0;i<6;i++){if(i>=W)continue;const [oy,sz,row]=pairs[Math.floor(i/2)],d=i%2?1:-1,by=46+oy*.6,ty=by+oy*.5-(up?14:0)-fl*3;
  _p(x,'#0e0a16',cx+d*12,by,cx+d*60*sz,ty-14,cx+d*58*sz,ty+2,cx+d*50*sz,ty+6,cx+d*52*sz,ty+16,cx+d*40*sz,ty+18,cx+d*40*sz,ty+28,cx+d*26*sz,by+16);
  for(let k=0;k<4;k++)_l(x,'#2a2238',1.5,cx+d*14,by+2,cx+d*(56-k*8)*sz,ty-10+k*8);_l(x,'#6a2a8a',1,cx+d*12,by,cx+d*60*sz,ty-14)}
 // 斷掉的翅膀殘根
 for(let i=W;i<6;i++){const [oy]=pairs[Math.floor(i/2)],d=i%2?1:-1;_p(x,'#2a1a2a',cx+d*12,46+oy*.6,cx+d*22,40+oy*.6,cx+d*20,52+oy*.6)}
 // 破碎的黑色光環
 x.strokeStyle='#3a2a1a';x.lineWidth=3;x.beginPath();x.arc(cx,12,14,3.4,5.2);x.stroke();x.beginPath();x.arc(cx,12,14,5.6,7.4);x.stroke();x.strokeStyle='#a07a3a';x.lineWidth=1;x.beginPath();x.arc(cx,12,14,3.4,5.2);x.stroke();
 // 長袍、盔甲
 _p(x,'#1e1828',cx-16,40,cx+16,40,cx+24,118,cx-24,118);_p(x,'#2e263c',cx-12,42,cx+12,42,cx+6,118,cx-6,118);_r(x,cx-16,62,32,4,'#6a1a3a');
 _p(x,'#3a3448',cx-18,38,cx+18,38,cx+14,58,cx-14,58);_r(x,cx-18,38,36,2,'#8a7aa0');_e(x,cx,48,4,4,'#a01a4a');_e(x,cx,48,2,2,'#ff4a8a');
 // 手
 if(up){_l(x,'#3a3448',6,cx-16,44,cx-30,20);_l(x,'#3a3448',6,cx+16,44,cx+30,20);_e(x,cx-31,18,4,4,'#c8c0d0');_e(x,cx+31,18,4,4,'#c8c0d0');_e(x,cx,6,6,6,'rgba(160,60,255,.8)')}
 else if(st=='q'){_l(x,'#3a3448',6,cx+16,44,cx+28,70);_l(x,'#5a4a6a',3,cx+28,72,cx+28,118);_p(x,'#c8c0e0',cx+24,100,cx+32,100,cx+28,122)}
 else{_l(x,'#3a3448',6,cx-16,44,cx-22,74);_l(x,'#3a3448',6,cx+16,44,cx+22,74);_e(x,cx-22,76,3.5,3.5,'#c8c0d0');_e(x,cx+22,76,3.5,3.5,'#c8c0d0')}
 // 蒼白的臉＋六隻紅眼
 _e(x,cx,26,10,12,'#c8c0d0');_p(x,'#14101e',cx-11,22,cx-12,14,cx-4,10,cx,16,cx+4,10,cx+12,14,cx+11,22,cx+6,18,cx-6,18);
 [[-5,22],[5,22],[-7,27],[7,27],[-3,31],[3,31]].forEach(([a,b])=>{_e(x,cx+a,b,1.8,1.2,'#ff1a3a');_r(x,cx+a-.5,b-.5,1,1,'#ffd0d0')});_l(x,'#5a1a2a',1,cx-3,35,cx+3,35)})}
