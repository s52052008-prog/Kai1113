/* v11.8 幻境 Online 像素美術：在小畫布上畫圖 → 硬邊化 → 自動描邊 → 放大，做出統一的像素風（怪物、道具、平台、視差背景） */
const VA={},VA_S=2;
const vaHex=c=>{c=c.replace('#','');if(c.length==3)c=c.split('').map(q=>q+q).join('');return[parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]};
function vaPix(w,h,fn,ol){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');fn(x,w,h);
 const d=x.getImageData(0,0,w,h),a=d.data;for(let i=3;i<a.length;i+=4)a[i]=a[i]>120?255:0;
 if(ol){const o=new Uint8ClampedArray(a),[r,g,b]=vaHex(ol);for(let y=0;y<h;y++)for(let X=0;X<w;X++){const i=(y*w+X)*4;if(a[i+3])continue;
  if((X>0&&a[i-1])||(X<w-1&&a[i+7])||(y>0&&a[i-w*4+3])||(y<h-1&&a[i+w*4+3])){o[i]=r;o[i+1]=g;o[i+2]=b;o[i+3]=255}}d.data.set(o)}
 x.putImageData(d,0,0);return c}
const vaRnd=s=>()=>{s=(s*16807+11)%2147483647;return s/2147483647};
// ───────── 史萊姆（含頭目） ─────────
const VAP={green:['#6ad86a','#b8f4a8','#3aa04a','#1e4a26'],fire:['#ff8a4a','#ffd6a8','#d4522a','#5a1a0a'],elec:['#ffd84a','#fff6bc','#d0a020','#5a4210'],
 poison:['#b07ad8','#e4c8ff','#7a4aa0','#3a1a4a'],flash:['#ffffff','#ffffff','#eeeeee','#9a9a9a']};
function vaSlime(pal,big,sq,eye){const k='s'+pal+big+sq+eye;if(VA[k])return VA[k];const C=VAP[pal],S=big?2.3:1,w=Math.round(24*S),h=Math.round((big?25:18)*S);
 return VA[k]=vaPix(w,h,x=>{const cx=w/2,bot=h-2,bw=(17+sq*2.6)*S,bh=(12.5-sq*2.2)*S,u=Math.max(1,Math.round(S));
  const body=()=>{x.beginPath();x.moveTo(cx-bw/2,bot);x.bezierCurveTo(cx-bw/2-S,bot-bh*.95,cx-bw*.28,bot-bh*1.06,cx,bot-bh);x.bezierCurveTo(cx+bw*.28,bot-bh*1.06,cx+bw/2+S,bot-bh*.95,cx+bw/2,bot);x.closePath()};
  body();x.fillStyle=C[0];x.fill();x.save();body();x.clip();x.fillStyle=C[2];x.fillRect(0,bot-bh*.3,w,h);x.fillStyle=C[0];x.beginPath();x.ellipse(cx+bw*.12,bot-bh*.38,bw*.44,bh*.3,0,0,7);x.fill();
   x.fillStyle=C[1];x.beginPath();x.ellipse(cx-bw*.2,bot-bh*.7,bw*.15,bh*.14,-.6,0,7);x.fill();x.restore();
  x.fillStyle='#fff';x.fillRect(Math.round(cx-bw*.27),Math.round(bot-bh*.8),u,u*2);x.fillRect(Math.round(cx-bw*.27)+u,Math.round(bot-bh*.8),u,u);
  const ey=Math.round(bot-bh*.5),e1=Math.round(cx-.5*S),e2=Math.round(cx+4.5*S),ew=Math.max(2,Math.round(2*S)),eh=Math.max(2,Math.round(3*S));x.fillStyle='#1a1a24';
  if(eye==1){x.fillRect(e1,ey+eh-u,ew,u);x.fillRect(e2,ey+eh-u,ew,u)}
  else{x.fillRect(e1,ey,ew,eh);x.fillRect(e2,ey,ew,eh);x.fillStyle=eye==2?'#ff4a4a':'#fff';x.fillRect(e1,ey,u,u);x.fillRect(e2,ey,u,u);if(eye==2){x.fillStyle=C[3];x.fillRect(e1-u,ey-2*u,ew+u,u);x.fillRect(e2,ey-2*u,ew+u,u)}}
  x.fillStyle='#ff8aa8';x.fillRect(e1-2*u,ey+eh+u,2*u,u);x.fillRect(e2+ew,ey+eh+u,2*u,u);
  x.fillStyle=C[3];const my=ey+eh+u;x.fillRect(Math.round(cx+1.8*S),my,u,u);x.fillRect(Math.round(cx+1.8*S)+u,my+u,u,u);x.fillRect(Math.round(cx+1.8*S)+2*u,my,u,u);
  if(big){const cy=Math.round(bot-bh+3*S),cw=15*S,ch=8*S;x.fillStyle='#ffc830';x.beginPath();x.moveTo(cx-cw/2,cy);x.lineTo(cx-cw/2,cy-ch);x.lineTo(cx-cw/4,cy-ch*.45);x.lineTo(cx,cy-ch*1.15);x.lineTo(cx+cw/4,cy-ch*.45);x.lineTo(cx+cw/2,cy-ch);x.lineTo(cx+cw/2,cy);x.closePath();x.fill();
   x.fillStyle='#fff2a0';x.fillRect(cx-cw/2+u,cy-ch+u,u,ch-2*u);x.fillStyle='#d89a10';x.fillRect(cx-cw/2,cy-2*u,cw,2*u);x.fillStyle='#ff3a5a';x.fillRect(cx-u,cy-ch*.7,2*u,2*u);x.fillStyle='#3a8aff';x.fillRect(cx-cw/2+2*u,cy-ch*.45,2*u,2*u);x.fillRect(cx+cw/2-4*u,cy-ch*.45,2*u,2*u)}},C[3])}
// ───────── 野狼（側面，朝右） ─────────
function vaWolf(st,fl){const k='w'+st+fl;if(VA[k])return VA[k];const C=fl?['#fff','#fff','#ddd','#999']:['#9aa0b4','#e0e4ee','#6a7086','#262a3a'];
 return VA[k]=vaPix(40,26,x=>{const wind=st=='wind',dash=st=='dash',run=st.startsWith('run')?+st.slice(3):-1,by=wind?16:dash?13:14;
  // 腳
  const legs=[[11,1],[14,0],[24,1],[27,0]];legs.forEach(([lx,back],i)=>{let dx=0,lift=0;if(run>=0){const ph=(run+i*2)%4;dx=[-2,0,2,0][ph];lift=ph==3?1:0}if(dash)dx=i<2?-3:3;x.fillStyle=back?C[2]:C[0];x.fillRect(lx+dx,by+2-lift,3,7-(wind?2:0));x.fillStyle=C[2];x.fillRect(lx+dx,by+8-lift-(wind?2:0),4,1)});
  // 尾巴
  x.fillStyle=C[0];x.beginPath();x.ellipse(7,by-4+(dash?3:0),6,2.6,dash?-.2:-.8,0,7);x.fill();x.fillStyle=C[1];x.beginPath();x.ellipse(3.5,by-7.5+(dash?3:0),2,1.6,-.8,0,7);x.fill();
  // 身體
  x.fillStyle=C[0];x.beginPath();x.ellipse(19,by,dash?12:10.5,wind?5:6,0,0,7);x.fill();x.fillStyle=C[1];x.beginPath();x.ellipse(19,by+3,7,2.4,0,0,7);x.fill();x.fillStyle=C[2];x.fillRect(12,by-5,12,2);
  // 頭
  const hx=wind?30:31,hy=wind?by-2:by-5;x.fillStyle=C[0];x.beginPath();x.arc(hx,hy,5.5,0,7);x.fill();x.beginPath();x.ellipse(hx+5,hy+2,4,2.6,0,0,7);x.fill();x.fillStyle=C[1];x.beginPath();x.ellipse(hx+1,hy+3,3,2,0,0,7);x.fill();
  x.fillStyle=C[2];x.beginPath();x.moveTo(hx-4,hy-3);x.lineTo(hx-3,hy-10);x.lineTo(hx,hy-4);x.fill();x.fillStyle=C[0];x.beginPath();x.moveTo(hx-1,hy-3);x.lineTo(hx+1,hy-10);x.lineTo(hx+3,hy-3);x.fill();x.fillStyle='#ffb0c0';x.fillRect(hx+1,hy-7,1,3);
  x.fillStyle='#1a1a24';x.fillRect(hx+8,hy+1,2,2);x.fillStyle=wind?'#ff3a3a':'#1a1a24';x.fillRect(hx+1,hy-2,2,2);x.fillStyle='#fff';if(!wind)x.fillRect(hx+1,hy-2,1,1);
  if(wind||dash){x.fillStyle='#8a1a2a';x.fillRect(hx+3,hy+4,6,2);x.fillStyle='#fff';x.fillRect(hx+4,hy+4,1,1);x.fillRect(hx+7,hy+4,1,1)}},C[3])}
// ───────── 毒蘑菇 ─────────
function vaShroom(puff,fl,blink){const k='m'+puff+fl+blink;if(VA[k])return VA[k];const C=fl?['#fff','#fff','#ddd','#999','#fff','#eee']:['#b04ac8','#e892f4','#7a2a90','#3a1446','#f6ead2','#dcc6a0'];
 return VA[k]=vaPix(28,28,x=>{const s=puff?1.15:1;x.fillStyle=C[4];x.beginPath();x.roundRect(9,13,11,13,4);x.fill();x.fillStyle=C[5];x.fillRect(16,14,3,11);
  x.fillStyle=C[0];x.beginPath();x.ellipse(14,13,12*s,9*s,0,Math.PI,0);x.fill();x.fillStyle=C[2];x.fillRect(14-12*s,12,24*s,2);x.fillStyle=C[1];x.beginPath();x.ellipse(10,7,3,2,-.4,0,7);x.fill();
  x.fillStyle='#fff';[[8,10,2],[15,5,2.2],[20,10,1.8],[13,10,1.2]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r*s,0,7);x.fill()});
  x.fillStyle='#1a1a24';if(blink){x.fillRect(11,19,2,1);x.fillRect(16,19,2,1)}else{x.fillRect(11,18,2,2);x.fillRect(16,18,2,2);x.fillStyle='#fff';x.fillRect(11,18,1,1);x.fillRect(16,18,1,1)}
  x.fillStyle='#ff8aa8';x.fillRect(9,21,2,1);x.fillRect(18,21,2,1);x.fillStyle=C[3];if(puff){x.fillRect(13,21,2,2)}else{x.fillRect(13,22,3,1)}},C[3])}
// ───────── 道具 ─────────
function vaChest(open){const k='c'+open;if(VA[k])return VA[k];return VA[k]=vaPix(26,22,x=>{x.fillStyle='#9a5a26';x.fillRect(2,10,22,11);x.fillStyle='#7a4218';[13,17].forEach(y=>x.fillRect(2,y,22,1));
  if(open){x.fillStyle='#ffe680';x.fillRect(4,8,18,3);x.fillStyle='#b8743a';x.fillRect(2,2,22,5);x.fillStyle='#ffd84a';x.fillRect(2,6,22,1)}
  else{x.fillStyle='#b8743a';x.beginPath();x.roundRect(2,3,22,8,[4,4,0,0]);x.fill();x.fillStyle='#d4904a';x.fillRect(4,4,18,1)}
  x.fillStyle='#ffd84a';x.fillRect(5,open?2:3,2,18);x.fillRect(19,open?2:3,2,18);x.fillRect(2,10,22,1);if(!open){x.fillRect(11,8,4,5);x.fillStyle='#3a2a10';x.fillRect(12,10,2,2)}},'#3a1e0a')}
function vaBarrel(fl){const k='b'+fl;if(VA[k])return VA[k];return VA[k]=vaPix(20,24,x=>{x.fillStyle=fl?'#fff':'#d0402a';x.beginPath();x.ellipse(10,12,8,10.5,0,0,7);x.fill();x.fillStyle=fl?'#eee':'#ff7a5a';x.fillRect(5,4,2,15);
  x.fillStyle='#4a3020';x.fillRect(2,6,16,2);x.fillRect(2,16,16,2);x.fillStyle='#ffd84a';x.beginPath();x.moveTo(10,8.5);x.lineTo(14,14.5);x.lineTo(6,14.5);x.fill();x.fillStyle='#1a1a24';x.fillRect(9.5,10,1,3)},'#3a1410')}
function vaSpike(up){const k='k'+up;if(VA[k])return VA[k];return VA[k]=vaPix(28,18,x=>{x.fillStyle='#5a5a6a';x.fillRect(1,12,26,5);x.fillStyle='#8a8a9a';x.fillRect(1,12,26,1);x.fillStyle='#3a3a46';[4,13,23].forEach(a=>x.fillRect(a,14,1,1));
  [5,14,23].forEach(a=>{x.fillStyle=up?'#e8eef8':'#6a6a7a';x.beginPath();x.moveTo(a-4,12);x.lineTo(a,up?0:9);x.lineTo(a+4,12);x.fill();if(up){x.fillStyle='#a8b0c0';x.beginPath();x.moveTo(a,1);x.lineTo(a+4,12);x.lineTo(a+1,12);x.fill()}})},'#22222c')}
function vaGem(c){const k='g'+c;if(VA[k])return VA[k];return VA[k]=vaPix(12,16,x=>{x.fillStyle=c;x.beginPath();x.moveTo(6,1);x.lineTo(11,6);x.lineTo(6,15);x.lineTo(1,6);x.fill();x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.moveTo(6,2);x.lineTo(8,6);x.lineTo(6,6);x.lineTo(3.5,6);x.fill();x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.moveTo(6,15);x.lineTo(11,6);x.lineTo(8,6);x.fill()},'#1a2a4a')}
// ───────── 浮島平台 ─────────
function vaPlat(p){if(p._cv)return p._cv;const r=vaRnd(Math.round(p.x*7+p.y)),w=Math.ceil(p.w/2)+4,h=34;
 return p._cv=vaPix(w,h,x=>{const top=4;x.fillStyle='#9a6a3a';x.beginPath();x.moveTo(1,top+3);x.lineTo(w-1,top+3);let px=w-1,py=top+3;const pts=[];for(let i=0;i<=10;i++){const t=i/10,X=w-1-t*(w-2),Y=top+6+Math.sin(t*Math.PI)*(16+r()*6)+r()*3;pts.push([X,Y])}pts.forEach(q=>x.lineTo(q[0],q[1]));x.closePath();x.fill();
  x.save();x.clip();x.fillStyle='#6e4422';x.fillRect(0,top+16,w,h);x.fillStyle='#b88050';for(let i=0;i<w/5;i++)x.fillRect(r()*w,top+5+r()*8,3,2);x.fillStyle='#a0a0aa';for(let i=0;i<w/14;i++){x.beginPath();x.ellipse(r()*w,top+8+r()*14,2.5,1.6,0,0,7);x.fill()}x.restore();
  x.fillStyle='#4a9a3a';x.fillRect(0,top,w,5);x.fillStyle='#6ac850';x.fillRect(0,top,w,3);x.fillStyle='#a8ec80';x.fillRect(1,top,w-2,1);
  for(let i=0;i<w;i+=2+Math.floor(r()*3)){x.fillStyle=r()<.5?'#6ac850':'#4a9a3a';x.fillRect(i,top-1-Math.floor(r()*2),1,2)}
  for(let i=0;i<w/12;i++){const fx=2+r()*(w-4);x.fillStyle=['#ffd84a','#ff8ac0','#fff','#9ad0ff'][i%4];x.fillRect(fx,top-2,2,2);x.fillStyle='#3a8a30';x.fillRect(fx+.5,top,1,1)}
  for(let i=0;i<w/16;i++){const vx=4+r()*(w-8),vl=4+r()*10;x.fillStyle='#3a8a30';x.fillRect(vx,top+5,1,vl);x.fillStyle='#5ab048';x.fillRect(vx-1,top+5+vl*.6,2,2)}},'#3a2410')}
// ───────── 地面＋視差背景 ─────────
function vaGround(AW,AH,GY,seed){const r=vaRnd(seed),w=AW/2,h=AH/2,gy=GY/2;return vaPix(w,h,x=>{x.fillStyle='#8a5a30';x.fillRect(0,gy+3,w,h);x.fillStyle='#6e4422';x.fillRect(0,gy+14,w,h);x.fillStyle='#5a361a';x.fillRect(0,gy+34,w,h);
  for(let i=0;i<w/2;i++){x.fillStyle=['#a0703e','#7a4a24','#b0b0b8','#8a8a94'][i%4];const sx=r()*w,sy=gy+5+r()*(h-gy-5);if(i%4>=2){x.beginPath();x.ellipse(sx,sy,2.5,1.6,0,0,7);x.fill()}else x.fillRect(sx,sy,3,2)}
  x.fillStyle='#4a9a3a';x.fillRect(0,gy-2,w,6);x.fillStyle='#6ac850';x.fillRect(0,gy-2,w,3);x.fillStyle='#a8ec80';x.fillRect(0,gy-2,w,1);
  for(let i=0;i<w;i+=1+Math.floor(r()*3)){x.fillStyle=r()<.5?'#6ac850':'#4a9a3a';x.fillRect(i,gy-3-Math.floor(r()*3),1,3)}
  for(let i=0;i<w/10;i++){const fx=r()*w;x.fillStyle=['#ffd84a','#ff8ac0','#fff','#9ad0ff','#ff6a5a'][i%5];x.fillRect(fx,gy-5,2,2);x.fillStyle='#3a8a30';x.fillRect(fx+.5,gy-3,1,2)}},null)}
function vaLayers(VW,VH,AW,seed){const r=vaRnd(seed),mk=(f,h,fn)=>{const w=Math.ceil((VW+(AW-VW)*f)/2)+20;return{f,cv:vaPix(w,h,x=>fn(x,w,h),null)}};
 return[mk(.08,110,(x,w,h)=>{for(let i=0;i<w/40;i++){const cx=r()*w,cy=10+r()*60,s=.6+r()*.7;x.fillStyle='#ffffff';for(let j=0;j<4;j++){x.beginPath();x.arc(cx+j*7*s,cy-(j%2)*4*s,(6+r()*3)*s,0,7);x.fill()}x.fillStyle='#e4f2ff';x.fillRect(cx-5*s,cy+3*s,28*s,2)}}),
  mk(.18,150,(x,w,h)=>{const ridge=(c,base,amp,step)=>{x.fillStyle=c;x.beginPath();x.moveTo(0,h);let y=base;for(let X=0;X<=w;X+=step){y=base-amp*(.5+.5*Math.sin(X*.02+r()*.6))-r()*8;x.lineTo(X,y)}x.lineTo(w,h);x.fill()};
   x.fillStyle='#9ab8dc';x.beginPath();x.moveTo(0,h);for(let X=0;X<=w;X+=30){const pk=40+r()*50;x.lineTo(X+15,h-pk-30);x.lineTo(X+30,h-20-r()*20)}x.lineTo(w,h);x.fill();
   x.fillStyle='#f2f8ff';for(let X=0;X<=w;X+=30){const pk=h-80-r()*10;x.fillRect(X+12,pk,6,3)}ridge('#86a8cc',h-30,20,12)}),
  mk(.38,140,(x,w,h)=>{x.fillStyle='#80c08a';x.beginPath();x.moveTo(0,h);for(let X=0;X<=w;X+=6)x.lineTo(X,h-50-Math.sin(X*.025)*18-Math.sin(X*.07)*6);x.lineTo(w,h);x.fill();
   for(let i=0;i<w/18;i++){const tx=r()*w,ty=h-48-Math.sin(tx*.025)*18,s=.7+r()*.6;x.fillStyle='#6a4a2a';x.fillRect(tx-1,ty-8*s,2,10*s);x.fillStyle=['#5aa860','#4a9650'][i%2];x.beginPath();x.arc(tx,ty-12*s,7*s,0,7);x.fill();x.fillStyle='#7ac87a';x.fillRect(tx-3*s,ty-16*s,3,2)}
   x.fillStyle='#6aae74';x.fillRect(0,h-30,w,30)}),
  mk(.62,110,(x,w,h)=>{for(let i=0;i<w/10;i++){const tx=r()*w,s=.8+r()*.8;x.fillStyle='#4a3420';x.fillRect(tx-1.5,h-40*s,3,40*s);x.fillStyle=['#3e8a46','#357a3e','#469650'][i%3];x.beginPath();x.arc(tx,h-42*s,11*s,0,7);x.arc(tx-8*s,h-34*s,8*s,0,7);x.arc(tx+8*s,h-34*s,8*s,0,7);x.fill()}
   x.fillStyle='#357a3e';x.fillRect(0,h-26,w,26);for(let i=0;i<w/6;i++){x.fillStyle='#2e6a36';x.beginPath();x.arc(r()*w,h-26,4+r()*5,0,7);x.fill()}})]}
function vaSky(g,VW,VH,t){const gr=g.createLinearGradient(0,0,0,VH);gr.addColorStop(0,'#58aef0');gr.addColorStop(.6,'#a8dcff');gr.addColorStop(1,'#e4f6ff');g.fillStyle=gr;g.fillRect(0,0,VW,VH);
 g.fillStyle='rgba(255,248,210,.35)';g.beginPath();g.arc(VW*.82,90,60,0,7);g.fill();g.fillStyle='#fff6d0';g.beginPath();g.arc(VW*.82,90,36,0,7);g.fill()}
