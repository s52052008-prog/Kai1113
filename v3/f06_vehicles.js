/* ===== v9：車輛（俯視角正確：橫向側視、縱向前／後視）與交通 ===== */
function vg(c,x,y,w,h,r,col){const g2=c.createLinearGradient(0,y,0,y+h);g2.addColorStop(0,shade(col,30));g2.addColorStop(.45,col);g2.addColorStop(1,shade(col,-34));c.fillStyle=g2;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
function wheel(c,x,y,r){c.fillStyle='#14141a';c.beginPath();c.arc(x,y,r,0,7);c.fill();c.fillStyle='#8a9096';c.beginPath();c.arc(x,y,r*.52,0,7);c.fill();c.fillStyle='#e0e4e6';c.beginPath();c.arc(x,y,r*.2,0,7);c.fill()}
const poly=(c,pts,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath();c.fill()};
const glassG=(c,y0,y1)=>{const g2=c.createLinearGradient(0,y0,0,y1);g2.addColorStop(0,'#d8f0fa');g2.addColorStop(1,'#6fa8cc');return g2};
const VK={car:{L:38,T:14,Lv:30,s:[62,78]},taxi:{L:38,T:14,Lv:30,s:[66,82]},police:{L:38,T:14,Lv:30,s:[66,80]},racer:{L:40,T:14,Lv:32,s:[230,280]},van:{L:42,T:15,Lv:34,s:[54,66]},truck:{L:56,T:16,Lv:46,s:[48,60]},bus:{L:68,T:17,Lv:60,s:[42,50]},moto:{L:26,T:8,Lv:20,s:[64,82]},rmoto:{L:28,T:8,Lv:22,s:[220,260]},bike:{L:20,T:6,Lv:16,s:[26,34]}};
// 側視（朝右）
function sideSpr(k,col,o){
 const rider=(c,x0,gy,lean,o2)=>{const rc=o2.rc||'#2f80ed',hc=o2.hc||'#d33';
  R(c,x0+9.5,gy-12.4,4.2,3,'#2f3b55');R(c,x0+13,gy-10.4,3,5.6,'#2f3b55');R(c,x0+14,gy-5,4,1.8,'#222');
  vg(c,x0+7.6,gy-22,6.2,10.6,1.6,rc);c.fillStyle=rc;c.beginPath();c.moveTo(x0+12,gy-20.6);c.lineTo(x0+20.4,gy-18.4);c.lineTo(x0+20.4,gy-16.6);c.lineTo(x0+11.4,gy-17.4);c.fill();R(c,x0+19.8,gy-19.2,2.2,2,'#f1c08f');
  c.fillStyle='#f1c08f';c.beginPath();c.arc(x0+11.6,gy-25,3,0,7);c.fill();c.fillStyle=hc;c.beginPath();c.arc(x0+11.4,gy-25.6,3.5,Math.PI*.95,Math.PI*.1);c.fill();R(c,x0+12.6,gy-24.8,3.4,.9,'#1a1a1a')};
 const w=VK[k].L+6;
 if(k=='car'||k=='taxi'||k=='police'||k=='racer'){const rc=k=='racer',x0=3,L=VK[k].L,gy=rc?21:22;return mk(w,gy+4,gy,c=>{
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+L/2,gy+.5,L/2+.5,2.2,0,0,7);c.fill();
  [8.4,L-9].forEach(q=>{c.fillStyle='#0a0a0e';c.beginPath();c.arc(x0+q,gy-4,rc?5.6:5,Math.PI,0);c.fill()});
  vg(c,x0,gy-(rc?11:12),L,rc?8.4:9.4,rc?2:3,col);
  const ch=rc?5.6:7.6,cy0=gy-(rc?11:12);
  poly(c,[x0+(rc?10:8),cy0,x0+(rc?14:12),cy0-ch,x0+(rc?25:26),cy0-ch,x0+(rc?31:31.5),cy0],shade(col,8));poly(c,[x0+(rc?14:12),cy0-ch,x0+(rc?25:26),cy0-ch,x0+(rc?25:26),cy0-ch+1.4,x0+(rc?14:12),cy0-ch+1.4],'rgba(255,255,255,.35)');
  c.fillStyle=glassG(c,cy0-ch,cy0);poly(c,[x0+(rc?11.4:9.6),cy0-.7,x0+(rc?14.6:12.8),cy0-ch+1.5,x0+19,cy0-ch+1.5,x0+19,cy0-.7],c.fillStyle);poly(c,[x0+20.4,cy0-.7,x0+20.4,cy0-ch+1.5,x0+(rc?24.8:25.8),cy0-ch+1.5,x0+(rc?29.5:30),cy0-.7],c.fillStyle);
  R(c,x0+19.2,cy0-ch+.5,1.2,ch,shade(col,-20));R(c,x0+20,cy0+1.4,.8,5.6,'rgba(0,0,0,.28)');R(c,x0+22.6,cy0+2.6,2.6,.8,'rgba(255,255,255,.55)');R(c,x0+14,cy0+2.6,2.6,.8,'rgba(255,255,255,.55)');
  R(c,x0+L-3.4,gy-10.6,3,2.2,'#fff7c2');R(c,x0+L-3.4,gy-10.6,3,.7,'#fff');R(c,x0,gy-10.6,2.2,2.4,'#e0302a');R(c,x0-.6,gy-6,L+1.2,1.8,'#2a2a30');R(c,x0+3,gy-4.4,L-6,.8,'rgba(0,0,0,.3)');
  R(c,x0+27.6,cy0-.4,3,2.2,col);R(c,x0+L-2.4,gy-6.4,2.4,2.2,'#d8d8d4');
  wheel(c,x0+8.4,gy-3.8,rc?4.2:3.8);wheel(c,x0+L-9,gy-3.8,rc?4.2:3.8);
  if(k=='taxi'){R(c,x0+17,cy0-ch-3.2,7,3.4,'#fff');R(c,x0+17.8,cy0-ch-2.4,5.4,1.2,'#d9452f');for(let i=0;i<9;i++)R(c,x0+2+i*4,cy0+5.4,2,1.6,'#111')}
  if(k=='police'){R(c,x0,cy0+2,L,2.2,'#1f4fa3');R(c,x0,cy0+4.4,L,.8,'#fff');R(c,x0+14,cy0-ch-2.4,10,2.4,'#222');R(c,x0+14.6,cy0-ch-2,4.2,1.6,'#d9302a');R(c,x0+19.4,cy0-ch-2,4.2,1.6,'#2f6aef');txt(c,'警察',x0+16,cy0+8,'#1f4fa3','bold 4px sans-serif')}
  if(rc){R(c,x0-.4,gy-15.6,6,1.6,'#111');R(c,x0+1,gy-14,1.2,3.6,'#111');R(c,x0+3.6,gy-14,1.2,3.6,'#111');R(c,x0+6,gy-9,L-12,1.2,'#fff');R(c,x0+6,gy-7.2,L-12,.9,'#ffd84a');R(c,x0+3,gy-3.4,L-6,.9,'#42f0ff')}
 },VK[k].L)}
 if(k=='van')return mk(w,28,25,c=>{const x0=3,L=42,gy=25;
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+L/2,gy+.5,L/2,2.2,0,0,7);c.fill();[9,L-10].forEach(q=>{c.fillStyle='#0a0a0e';c.beginPath();c.arc(x0+q,gy-4,5,Math.PI,0);c.fill()});
  vg(c,x0,gy-19,L,16,3,col);poly(c,[x0+L-14,gy-19,x0+L-6,gy-19,x0+L-1,gy-10.6,x0+L-14,gy-10.6],'#9fd3ee');c.fillStyle=glassG(c,gy-19,gy-10);poly(c,[x0+L-13,gy-18,x0+L-6.8,gy-18,x0+L-2.4,gy-11.4,x0+L-13,gy-11.4],c.fillStyle);
  R(c,x0+2,gy-10,L-18,2,'#2f80ed');R(c,x0+2,gy-7.2,L-18,1.4,'#d9452f');R(c,x0,gy-19,L-14,1.2,'rgba(255,255,255,.5)');R(c,x0+15,gy-18.6,.9,15,'rgba(0,0,0,.2)');R(c,x0+L-2.6,gy-9,2.6,2.2,'#fff7c2');R(c,x0,gy-9,2.2,2.4,'#e0302a');R(c,x0-.6,gy-5.6,L+1.2,1.8,'#2a2a30');wheel(c,x0+9,gy-3.8,4);wheel(c,x0+L-10,gy-3.8,4)},L=42);
 if(k=='truck')return mk(w,31,28,c=>{const x0=3,L=56,gy=28;
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+L/2,gy+.5,L/2,2.2,0,0,7);c.fill();
  vg(c,x0,gy-22,38,18,2,'#f4f4f0');R(c,x0,gy-22,38,1.4,'rgba(255,255,255,.7)');R(c,x0+3,gy-13,32,2.4,col);R(c,x0+3,gy-9.4,32,1.2,shade(col,-30));txt(c,'宅配',x0+19,gy-15.2,'#444','bold 5px sans-serif');
  vg(c,x0+39,gy-16,L-39,12,2.5,col);poly(c,[x0+42,gy-16,x0+L-6,gy-16,x0+L-1.4,gy-9.4,x0+42,gy-9.4],'#9fd3ee');c.fillStyle=glassG(c,gy-16,gy-9);poly(c,[x0+43,gy-15,x0+L-6.8,gy-15,x0+L-2.6,gy-10.4,x0+43,gy-10.4],c.fillStyle);
  R(c,x0+L-2.6,gy-8,2.6,2.2,'#fff7c2');R(c,x0,gy-6,L,2,'#2a2a30');[8,30,L-9].forEach(q=>wheel(c,x0+q,gy-3.6,3.8))},L=56);
 if(k=='bus')return mk(w,32,29,c=>{const x0=3,L=68,gy=29;
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+L/2,gy+.5,L/2,2.4,0,0,7);c.fill();
  vg(c,x0,gy-25,L,21.6,3,col);R(c,x0,gy-25,L,1.8,'rgba(255,255,255,.5)');R(c,x0+5,gy-29,14,4,'#e8e8e8');R(c,x0+24,gy-28,12,3,'#e8e8e8');
  c.fillStyle=glassG(c,gy-22,gy-12);for(let i=0;i<6;i++)RR(c,x0+4+i*8.6,gy-22,7.4,9.4,1,c.fillStyle);RR(c,x0+L-14,gy-22,11,9.4,1,c.fillStyle);
  R(c,x0+L-27,gy-22,8,18,'#bfe6f7');R(c,x0+L-23.2,gy-22,.8,18,col);R(c,x0,gy-10,L,2.4,'#f4f4f0');R(c,x0,gy-7.2,L,1.6,shade(col,-40));R(c,x0+L-3,gy-9.2,3,2.4,'#fff7c2');R(c,x0,gy-9.2,2.4,2.6,'#e0302a');
  R(c,x0+L-9.4,gy-26,7.6,3,'#111');txt(c,'307',x0+L-5.6,gy-23.6,'#ffb347','bold 3.4px sans-serif');R(c,x0,gy-5.2,L,2,'#2a2a30');[12,L-14,L-24].forEach((q,i)=>i<2?wheel(c,x0+q,gy-3.8,4.2):0)},L=68);
 if(k=='moto'||k=='rmoto'){const x0=3,L=VK[k].L,gy=28,rm=k=='rmoto';return mk(w,32,gy,c=>{
  c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x0+L/2,gy+.4,L/2-1,1.8,0,0,7);c.fill();
  if(o.bx){vg(c,x0-4,gy-26,11,11,1.5,o.bx);R(c,x0-4,gy-26,11,2,'rgba(255,255,255,.35)')}
  if(o.pax){R(c,x0+2.6,gy-21,4,10,o.pax);c.fillStyle='#f1c08f';c.beginPath();c.arc(x0+4.8,gy-23.6,2.6,0,7);c.fill();c.fillStyle='#e8e8e8';c.beginPath();c.arc(x0+4.7,gy-24.2,3,Math.PI,0);c.fill()}
  c.fillStyle=col;c.beginPath();c.moveTo(x0+3,gy-11);c.lineTo(x0+8,gy-13.4);c.lineTo(x0+19,gy-13.4);c.lineTo(x0+21,gy-10.6);c.lineTo(x0+20.4,gy-6.6);c.lineTo(x0+3,gy-6.6);c.fill();
  R(c,x0+3,gy-12.4,16,1.6,'rgba(255,255,255,.3)');R(c,x0+5,gy-14.6,10,2.6,'#1c1c20');R(c,x0+18.6,gy-19,2.8,10,col);R(c,x0+17.6,gy-20.4,5.4,1.8,'#333');R(c,x0+21.6,gy-15.4,2.4,2.4,'#fff7c2');R(c,x0+19.4,gy-23.4,.8,4.6,'#333');R(c,x0,gy-11.6,2.6,2.2,'#e0302a');R(c,x0+7,gy-6,11,1,'#888');
  wheel(c,x0+5,gy-4,4.2);wheel(c,x0+L-5,gy-4,4.2);rider(c,x0,gy,0,o)},L)}
 return mk(w,28,24,c=>{const x0=3,gy=24;wheel(c,x0+4,gy-4,4);wheel(c,x0+16,gy-4,4);c.strokeStyle=col;c.lineWidth=1.2;c.beginPath();c.moveTo(x0+4,gy-4);c.lineTo(x0+9,gy-10);c.lineTo(x0+16,gy-4);c.moveTo(x0+9,gy-10);c.lineTo(x0+14,gy-10.6);c.lineTo(x0+16,gy-4);c.stroke();R(c,x0+13,gy-13,4,1.4,'#333');
  R(c,x0+5.6,gy-18,5,9,o.rc||'#2f80ed');c.fillStyle='#f1c08f';c.beginPath();c.arc(x0+8.2,gy-21,2.6,0,7);c.fill();c.fillStyle=o.hc||'#d33';c.beginPath();c.arc(x0+8.2,gy-21.6,3,Math.PI,0);c.fill();R(c,x0+8,gy-15,6,1.6,o.rc||'#2f80ed');R(c,x0+7,gy-9,2,4,'#2f3b55')},20);
 function mk(wd,ht,gy,fn,L){const c0=document.createElement('canvas');c0.width=Math.ceil(wd*SK);c0.height=Math.ceil(ht*SK);const x=c0.getContext('2d');x.scale(SK,SK);fn(x);return{img:pixelize(c0,Math.max(1,Math.round(SK)),{}),w:wd,h:ht,gy}}
}
// 前／後視（朝向觀看者＝向下行駛看到車頭，向上行駛看到車尾）
function frontSpr(k,col,back,o){
 const mk=(wd,ht,gy,fn)=>{const c0=document.createElement('canvas');c0.width=Math.ceil(wd*SK);c0.height=Math.ceil(ht*SK);const x=c0.getContext('2d');x.scale(SK,SK);fn(x);return{img:pixelize(c0,Math.max(1,Math.round(SK)),{}),w:wd,h:ht,gy}};
 const lights=(c,x0,Wv,gy,y0)=>{if(back){RR(c,x0+.4,gy-y0,4.4,2.6,1,'#e0302a');RR(c,x0+Wv-4.8,gy-y0,4.4,2.6,1,'#e0302a');R(c,x0+.6,gy-y0,4,.8,'#ff8a80');R(c,x0+Wv-4.6,gy-y0,4,.8,'#ff8a80')}else{RR(c,x0+.4,gy-y0,4,2.6,1,'#fff7c2');RR(c,x0+Wv-4.4,gy-y0,4,2.6,1,'#fff7c2');R(c,x0+.8,gy-y0,3.2,.8,'#fff')}};
 if(k=='car'||k=='taxi'||k=='police'||k=='racer'){const rc=k=='racer',x0=3,Wv=17,gy=rc?25:27,ht=gy+4;return mk(Wv+6+(k=='racer'?2:0),ht,gy,c=>{const ox=k=='racer'?1:0;c.translate(ox,0);
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+Wv/2,gy+.6,Wv/2+1.6,2.2,0,0,7);c.fill();
  R(c,x0-.8,gy-6,3,6,'#101014');R(c,x0+Wv-2.2,gy-6,3,6,'#101014');
  vg(c,x0,gy-(rc?13:14.4),Wv,rc?10.4:11.6,2.6,col);
  const top=rc?gy-22:gy-27;vg(c,x0+2,top,Wv-4,rc?5:6,2,shade(col,8));R(c,x0+3,top+.4,Wv-6,1,'rgba(255,255,255,.4)');
  c.fillStyle=glassG(c,top+5,gy-14);poly(c,[x0+3,top+(rc?5:6),x0+Wv-3,top+(rc?5:6),x0+Wv-1,gy-(rc?13:14.4),x0+1,gy-(rc?13:14.4)],c.fillStyle);
  if(back){poly(c,[x0+3,top+(rc?5:6),x0+Wv-3,top+(rc?5:6),x0+Wv-3.6,top+(rc?7.6:8.6),x0+3.6,top+(rc?7.6:8.6)],'rgba(0,0,0,.18)')}
  R(c,x0+Wv/2-.4,top+(rc?5:6),.8,(rc?3:8.4),'rgba(255,255,255,.28)');
  R(c,x0+1.4,gy-(rc?13:14.4),Wv-2.8,2,'rgba(255,255,255,.25)');
  R(c,x0-1.6,gy-(rc?15:17),2.2,1.8,col);R(c,x0+Wv-.6,gy-(rc?15:17),2.2,1.8,col);
  lights(c,x0,Wv,gy,rc?11:12);
  if(!back)R(c,x0+5.4,gy-(rc?9.4:10.4),Wv-10.8,2.2,'#26262c');
  R(c,x0+5.8,gy-6.8,Wv-11.6,2.8,'#f4f4f0');R(c,x0+6.6,gy-6,Wv-13.2,.7,back?'#2a5aa8':'#2a5aa8');R(c,x0,gy-4.2,Wv,2,'#34343a');
  if(back)R(c,x0+Wv-4.4,gy-3.2,2.4,2.4,'#111');
  if(k=='taxi'){R(c,x0+4,top-3,Wv-8,3.6,'#fff');R(c,x0+5,top-2,Wv-10,1.4,'#d9452f')}
  if(k=='police'){R(c,x0+2.4,top-2.6,Wv-4.8,3.2,'#222');R(c,x0+3,top-2,(Wv-6)/2,2,'#d9302a');R(c,x0+3+(Wv-6)/2,top-2,(Wv-6)/2,2,'#2f6aef');R(c,x0+1,gy-10,Wv-2,1.6,'#1f4fa3')}
  if(rc){if(back){R(c,x0-1.6,gy-19,Wv+3.2,1.8,'#111');R(c,x0+1.8,gy-17.4,1.2,4.4,'#111');R(c,x0+Wv-3,gy-17.4,1.2,4.4,'#111')}R(c,x0+3,gy-3,Wv-6,.9,'#42f0ff');R(c,x0+Wv/2-.6,top+.4,1.2,gy-top-8,'#ffd84a')}
 })}
 if(k=='van'){const x0=3,Wv=18,gy=29;return mk(Wv+6,gy+4,gy,c=>{c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+Wv/2,gy+.6,Wv/2+1.6,2.2,0,0,7);c.fill();R(c,x0-.8,gy-6,3,6,'#101014');R(c,x0+Wv-2.2,gy-6,3,6,'#101014');
  vg(c,x0,gy-26,Wv,22,3,col);R(c,x0,gy-26,Wv,1.6,'rgba(255,255,255,.55)');
  if(!back){c.fillStyle=glassG(c,gy-23,gy-12);poly(c,[x0+2,gy-23,x0+Wv-2,gy-23,x0+Wv-1,gy-13,x0+1,gy-13],c.fillStyle);R(c,x0+Wv/2-.4,gy-23,.8,10,'rgba(255,255,255,.3)');R(c,x0+5.4,gy-11,Wv-10.8,2.2,'#26262c')}
  else{R(c,x0+3,gy-23,Wv-6,10,shade(col,-14));R(c,x0+Wv/2-.4,gy-23,.8,10,'rgba(0,0,0,.35)');R(c,x0+Wv/2-2,gy-18,1,2.6,'#999');R(c,x0+Wv/2+1,gy-18,1,2.6,'#999')}
  lights(c,x0,Wv,gy,12);R(c,x0+5.8,gy-6.8,Wv-11.6,2.8,'#f4f4f0');R(c,x0,gy-4.2,Wv,2,'#34343a');R(c,x0+1,gy-9,Wv-2,1.2,'#2f80ed')})}
 if(k=='truck'){const x0=3,Wv=19,gy=31;return mk(Wv+6,gy+4,gy,c=>{c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+Wv/2,gy+.6,Wv/2+1.6,2.2,0,0,7);c.fill();R(c,x0-.8,gy-6,3,6,'#101014');R(c,x0+Wv-2.2,gy-6,3,6,'#101014');
  if(!back){vg(c,x0-.6,gy-32,Wv+1.2,10,2,'#f4f4f0');vg(c,x0,gy-24,Wv,20,3,col);c.fillStyle=glassG(c,gy-22,gy-12);poly(c,[x0+2,gy-22,x0+Wv-2,gy-22,x0+Wv-1,gy-13,x0+1,gy-13],c.fillStyle);R(c,x0+Wv/2-.4,gy-22,.8,9,'rgba(255,255,255,.3)');R(c,x0+5.4,gy-11,Wv-10.8,2.2,'#26262c')}
  else{vg(c,x0-.6,gy-32,Wv+1.2,28,2,'#f4f4f0');R(c,x0+Wv/2-.4,gy-31,.8,26,'rgba(0,0,0,.25)');R(c,x0+3,gy-20,Wv-6,2.4,col);txt(c,'宅配',x0+Wv/2,gy-24,'#555','bold 4px sans-serif')}
  lights(c,x0,Wv,gy,12);R(c,x0+6,gy-6.8,Wv-12,2.8,'#f4f4f0');R(c,x0,gy-4.2,Wv,2,'#34343a')})}
 if(k=='bus'){const x0=3,Wv=21,gy=33;return mk(Wv+6,gy+4,gy,c=>{c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+Wv/2,gy+.6,Wv/2+1.8,2.4,0,0,7);c.fill();R(c,x0-.8,gy-6,3.4,6,'#101014');R(c,x0+Wv-2.6,gy-6,3.4,6,'#101014');
  vg(c,x0,gy-31,Wv,27,3,col);R(c,x0+3,gy-35,Wv-6,5,'#e8e8e8');R(c,x0+5,gy-34.4,Wv-10,2,'#cfd2d4');
  if(!back){c.fillStyle=glassG(c,gy-27,gy-13);poly(c,[x0+1.8,gy-27,x0+Wv-1.8,gy-27,x0+Wv-.8,gy-13,x0+.8,gy-13],c.fillStyle);R(c,x0+Wv/2-.4,gy-27,.8,14,'rgba(255,255,255,.3)');R(c,x0+3.4,gy-31,Wv-6.8,2.6,'#111');txt(c,'307 市區',x0+Wv/2,gy-28.8,'#ffb347','bold 3px sans-serif');R(c,x0+6,gy-11,Wv-12,2.4,'#26262c')}
  else{R(c,x0+2,gy-27,Wv-4,10,shade(col,-18));c.fillStyle=glassG(c,gy-26,gy-18);RR(c,x0+3.4,gy-26,Wv-6.8,7.4,1,c.fillStyle);R(c,x0+3.4,gy-31,Wv-6.8,2.6,'#111');txt(c,'307',x0+Wv/2,gy-28.8,'#ffb347','bold 3.4px sans-serif')}
  lights(c,x0,Wv,gy,12.4);R(c,x0+6.4,gy-6.8,Wv-12.8,2.8,'#f4f4f0');R(c,x0,gy-4.2,Wv,2,'#34343a');R(c,x0,gy-9,Wv,1.6,'#f4f4f0')})}
 if(k=='moto'||k=='rmoto'){const x0=3,Wv=10,gy=28;return mk(Wv+6,gy+3,gy,c=>{const rc=o.rc||'#2f80ed',hc=o.hc||'#d33',cx=x0+Wv/2;c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(cx,gy+.4,6,1.8,0,0,7);c.fill();
  R(c,cx-1.4,gy-9,2.8,9,'#14141a');
  if(!back){RR(c,cx-3.6,gy-14,7.2,6,2,col);R(c,cx-3.6,gy-14,7.2,1.4,'rgba(255,255,255,.35)');R(c,cx-5.6,gy-17.6,11.2,1.8,'#333');R(c,cx-2.2,gy-13,4.4,2.6,'#fff7c2')}
  else{RR(c,cx-3.8,gy-13,7.6,5,2,col);R(c,cx-2.6,gy-11,5.2,2,'#e0302a');R(c,cx-2.2,gy-7.6,4.4,2,'#f4f4f0');if(o.bx){vg(c,cx-5,gy-26,10,9,1.5,o.bx);R(c,cx-5,gy-26,10,1.6,'rgba(255,255,255,.35)')}}
  R(c,cx-3.6,gy-14,1.6,5,'#2f3b55');R(c,cx+2,gy-14,1.6,5,'#2f3b55');
  vg(c,cx-4,gy-26,8,13,1.8,rc);if(!back){R(c,cx-6,gy-22,2.4,8,rc);R(c,cx+3.6,gy-22,2.4,8,rc);R(c,cx-6,gy-14.6,2.4,2,'#f1c08f');R(c,cx+3.6,gy-14.6,2.4,2,'#f1c08f')}
  else{R(c,cx-6,gy-22,2.4,8,shade(rc,-14));R(c,cx+3.6,gy-22,2.4,8,shade(rc,-14))}
  if(o.pax&&back){R(c,cx-3,gy-31,6,6,o.pax)}
  c.fillStyle=back?hc:'#f1c08f';c.beginPath();c.arc(cx,gy-29,3.4,0,7);c.fill();c.fillStyle=hc;c.beginPath();c.arc(cx,gy-29.6,3.8,back?0:Math.PI,back?Math.PI:0);c.fill();if(!back)R(c,cx-3,gy-29.6,6,1,'rgba(0,0,0,.45)');else{c.fillStyle=hc;c.beginPath();c.arc(cx,gy-29,3.8,0,7);c.fill();R(c,cx-3.4,gy-29.4,2,.8,'rgba(255,255,255,.4)')}})}
 return mk(12,24,22,c=>{const cx=6;R(c,cx-1,14,2,8,'#14141a');vg(c,cx-3.4,5,6.8,10,1.6,o.rc||'#2f80ed');c.fillStyle='#f1c08f';c.beginPath();c.arc(cx,3.4,2.8,0,7);c.fill();c.fillStyle=o.hc||'#d33';c.beginPath();c.arc(cx,2.8,3.2,Math.PI,0);c.fill();R(c,cx-5,16,10,1.4,'#444')});
}
const VSC={};
function vSpr(v){const X=v.ax=='x',view=X?'s':(v.dir>0?'f':'b'),key=v.k+'|'+v.col+'|'+view+'|'+(v.rc||'')+(v.hc||'')+(v.bx||'')+(v.pax||'');
 return VSC[key]||(VSC[key]=X?sideSpr(v.k,v.col,v):frontSpr(v.k,v.col,view=='b',v))}
function drawVeh(c,v){if(v.hold>0)return;const X=v.ax=='x',sp=vSpr(v);
 if(X){const y=v.y+v.h-sp.gy;if(v.dir<0){c.save();c.translate(v.x+v.w/2,0);c.scale(-1,1);c.drawImage(sp.img,-sp.w/2,y,sp.w,sp.h);c.restore()}else c.drawImage(sp.img,v.x+v.w/2-sp.w/2,y,sp.w,sp.h)}
 else c.drawImage(sp.img,v.x+v.w/2-sp.w/2,v.y+v.h-sp.gy,sp.w,sp.h);
 // 煞車燈
 if(v.br){const k=v.k;c.fillStyle='rgba(255,40,30,.9)';if(X){const tx=v.dir>0?v.x:v.x+v.w-2.4,ty=v.y+v.h-(k=='bus'?10.5:k=='moto'||k=='rmoto'?10:9.2);c.fillRect(tx,ty,2.4,2.2)}else if(v.dir<0){const cx=v.x+v.w/2;c.fillRect(cx-Math.min(7,v.w/2),v.y+v.h-12,3,2.4);c.fillRect(cx+Math.min(7,v.w/2)-3,v.y+v.h-12,3,2.4)}}
 // 警示燈
 if(v.k=='police'&&v.siren){const ph=Math.floor(NOW/130)%2,cx=v.x+v.w/2,by=v.y+v.h-(X?22.5:28);c.save();c.globalCompositeOperation='lighter';
  c.fillStyle=ph?'rgba(255,40,40,.95)':'rgba(60,110,255,.95)';c.beginPath();c.arc(cx-3.2,by,5.5,0,7);c.fill();c.fillStyle=ph?'rgba(60,110,255,.95)':'rgba(255,40,40,.95)';c.beginPath();c.arc(cx+3.2,by,5.5,0,7);c.fill();c.restore()}
 }
/* ── 車道與號誌 ── */
const PH=[['H',13],['Hy',2],['R',2],['V',9],['Vy',2],['R',2]],LT={i:0,t:0};
var stLt=(L,st)=>ls(L.ax);
const ls=ax=>{const c=PH[LT.i][0];return ax=='x'?(c=='H'?'g':c=='Hy'?'y':'r'):(c=='V'?'g':c=='Vy'?'y':'r')};
const cdn=ax=>{let t=PH[LT.i][1]-LT.t,i=LT.i;const cur=ls(ax);if(cur=='y')return Math.ceil(t);let guard=0;
 const st=j=>{const c=PH[j][0];return ax=='x'?(c=='H'?'g':c=='Hy'?'y':'r'):(c=='V'?'g':c=='Vy'?'y':'r')};
 if(cur=='g'){let j=(i+1)%PH.length;while(st(j)=='g'&&guard++<8){t+=PH[j][1];j=(j+1)%PH.length}return Math.ceil(t)}
 let j=(i+1)%PH.length;while(st(j)!='g'&&guard++<8){t+=PH[j][1];j=(j+1)%PH.length}return Math.ceil(t)};
const pedGo=ax=>{// ax：被穿越的車流軸向。行人可走＝該車流為紅且處於另一向綠燈期間且剩餘時間夠
 const c=PH[LT.i][0],rem=PH[LT.i][1]-LT.t;return ax=='x'?(c=='V'&&rem>4.5):(c=='H'&&rem>4.5)};
const LN=[],TR=[],AV=[];
const sd=x=>x;
const stopsFor=(ax,dir,c)=>{const a=[],rd=ax=='x'?HRD.find(r=>c>r.y&&c<r.y+r.h):VRD.find(r=>c>r.x&&c<r.x+r.w);
 if(ax=='x')VRD.slice().sort((p,q)=>dir>0?p.x-q.x:q.x-p.x).forEach(v=>a.push({pos:dir>0?v.x-SWK/2-10:v.x+v.w+SWK/2+10,zone:{x:v.x-8,y:rd.y-8,w:v.w+16,h:rd.h+16}}));
 else HRD.slice().sort((p,q)=>dir>0?p.y-q.y:q.y-p.y).forEach(h=>a.push({pos:dir>0?h.y-SWK/2-10:h.y+h.h+SWK/2+10,zone:{x:rd.x-8,y:h.y-8,w:rd.w+16,h:h.h+16}}));return a};
function addLane(id,ax,dir,c,o){const len=ax=='x'?WW:WH,L={id,ax,dir,c,v:[],len,s0:dir>0?-90:len+90,s1:dir>0?len+90:-90,stops:stopsFor(ax,dir,c),...o};LN.push(L);return L}
addLane('H1e1','x',1,381.5,{n:6,pool:'in',race:1});addLane('H1e2','x',1,400.5,{n:6,pool:'out'});addLane('H1w1','x',-1,358.5,{n:6,pool:'in',race:1});addLane('H1w2','x',-1,339.5,{n:6,pool:'out'});
addLane('H2e','x',1,760,{n:4,pool:'st'});addLane('H2w','x',-1,732,{n:4,pool:'st'});
addLane('V1s1','y',1,717,{n:4,pool:'in'});addLane('V1s2','y',1,694,{n:3,pool:'mo'});addLane('V1n1','y',-1,747,{n:4,pool:'in'});addLane('V1n2','y',-1,770,{n:3,pool:'mo'});
addLane('V2s','y',1,1242,{n:3,pool:'st'});addLane('V2n','y',-1,1270,{n:3,pool:'st'});
const CARC=['#d33a3a','#3a7bd5','#2a9d5c','#e8e8e8','#222','#9aa0a6','#8a5aa8','#f0f0f0','#c9a06a','#2a6a8a'],RCL=['#2f80ed','#e0679a','#2a9d5c','#f0b030','#8a5aa8','#d9452f','#222','#eee'],HCL=['#d33','#222','#fff','#f0b030','#2f80ed','#2a9d5c'],BUSC=['#2d6cdf','#2a9d5c','#e8742a','#8a5aa8'],NEON=['#ff2bd6','#2bff6a','#2bd4ff','#ffe02b','#ff5a2b'];
const POOLS={mo:[['moto',80],['bike',12]],in:[['car',44],['taxi',14],['van',9],['truck',6],['bus',9],['police',2]],out:[['moto',62],['car',12],['taxi',8],['bike',4],['van',4],['bus',6]],st:[['car',38],['moto',36],['taxi',8],['van',8],['truck',4],['police',2]]};
function pickKind(pool){const a=POOLS[pool];let t=0;a.forEach(q=>t+=q[1]);let r=Math.random()*t;for(const q of a){if((r-=q[1])<0)return q[0]}return 'car'}
function setKind(v,L,k){const d=VK[k],ax=L.ax;v.k=k;v.ax=ax;v.dir=L.dir;v.lane=L;v.LL=ax=='x'?d.L:d.Lv;v.TT=d.T;
 v.v0=(d.s[0]+Math.random()*(d.s[1]-d.s[0]))*(L.pool=='st'&&k!='racer'?.86:1);v.acc=k=='racer'||k=='rmoto'?200:75;v.brk=k=='racer'||k=='rmoto'?260:200;
 v.col=k=='taxi'?'#f2c230':k=='police'?'#f4f6f8':k=='racer'?NEON[(Math.random()*5)|0]:k=='bus'?BUSC[(Math.random()*4)|0]:k=='van'?(Math.random()<.5?'#f4f4f4':'#dfe8f0'):k=='truck'?['#2f80ed','#d9452f','#2a9d5c'][(Math.random()*3)|0]:k=='moto'||k=='rmoto'?CARC[(Math.random()*10)|0]:k=='bike'?'#2a8a6a':CARC[(Math.random()*10)|0];
 v.rc=RCL[(Math.random()*8)|0];v.hc=HCL[(Math.random()*6)|0];v.bx=0;v.pax=0;if(k=='moto'){const r=Math.random();if(r<.2)v.bx=Math.random()<.5?'#ff2b85':'#06c167';else if(r<.45)v.pax=RCL[(Math.random()*8)|0]}
 v.race=k=='racer'||k=='rmoto';v.siren=0}
function posBox(v){const X=v.ax=='x',L=v.lane,hl=v.LL/2;if(X){v.w=v.LL;v.h=v.TT;v.x=v.p-hl;v.y=L.c-v.TT/2}else{v.w=v.TT;v.h=v.LL;v.x=L.c-v.TT/2;v.y=v.p-hl}}
function newVeh(L,k){const v={p:0,spd:0,hold:0,br:0,idx:TR.length};setKind(v,L,k||pickKind(L.pool));v.spd=v.v0*.8;L.v.push(v);TR.push(v);return v}
LN.forEach(L=>{const n=L.n,seg=(L.len+120)/n;for(let i=0;i<n;i++){const v=newVeh(L);v.p=(L.dir>0?-60+seg*i:L.len+60-seg*i)+(Math.random()-.5)*seg*.35;posBox(v)}});
// 街頭巷弄的小機車
[['y',407,452,680],['y',453,806,1290],['x',1145,20,660]].forEach((a,i)=>{const ax=a[0],d=VK.moto,v={k:'moto',ax,dir:1,LL:ax=='x'?d.L:d.Lv,TT:8,col:CARC[(i*3+1)%10],rc:RCL[i],hc:HCL[i],bx:i==1?'#06c167':0,pax:0,spd:0,v0:26,acc:60,brk:200,hold:0,br:0,idx:900+i,al:{c:a[1],a0:a[2],a1:a[3]},lane:{c:a[1]}};v.p=a[2]+30;posBox(v);AV.push(v);TR.push(v)});
function nightMode(){return T.hour>=23||T.hour<5}
const RACE={st:0,t:25,lane:null,list:[],seen:0,seenT:0,reported:0};
function spawnRace(){const L=RACE.lane;RACE.list=[];RACE.reported=0;RACE.seen=0;
 const n=2+((Math.random()*2)|0);for(let i=0;i<n;i++){const k=Math.random()<.4?'rmoto':'racer',v=newVeh(L,k);v.p=L.s0-L.dir*(i*52+Math.random()*10);v.spd=0;v.v0=(k=='rmoto'?215:235)+Math.random()*45;v.hold=0;v.gone=1;posBox(v);RACE.list.push(v)}
 const last=RACE.list[RACE.list.length-1],pc=newVeh(L,'police');pc.v0=Math.min(...RACE.list.map(r=>r.v0))+14;pc.siren=1;pc.race=true;pc.p=last.p-L.dir*130;pc.spd=0;pc.gone=1;posBox(pc);RACE.list.push(pc)}
function raceStep(dt){const night=T.hour>=22.5||T.hour<4.5;
 if(RACE.st==0){if(night){RACE.t-=dt;if(RACE.t<=0){const rid=Math.random()<.5?'H1e1':'H1w1';RACE.lane=LN.find(L=>L.id==rid);RACE.lane.block=1;RACE.st=1}}else RACE.t=Math.max(RACE.t,15)}
 else if(RACE.st==1){if(RACE.lane.v.every(v=>v.hold>0)){spawnRace();RACE.st=2;RACE.age=0}}
 else{RACE.age+=dt;const L=RACE.lane;if(RACE.list.every(v=>(v.p-L.s1)*L.dir>0)||RACE.age>60){RACE.list.forEach(v=>{const i=L.v.indexOf(v);if(i>=0)L.v.splice(i,1);const j=TR.indexOf(v);if(j>=0)TR.splice(j,1)});RACE.list=[];L.block=0;RACE.st=0;RACE.t=45+Math.random()*75;
  }
  else if(!RACE.seen&&RACE.list.some(v=>v.x+v.w>CAM.x&&v.x<CAM.x+W&&v.y+v.h>CAM.y&&v.y<CAM.y+H)){RACE.seen=1;RACE.seenT=gt();toast('🏍️ 轟轟轟──有人在大馬路上飆車！後面還有警車在追！')}}}
const obstacles=()=>{const a=[];if(!scene)a.push(p);NP.forEach(n=>{if(!n.hid&&!n.t&&n.walk&&n.cross)a.push(n)});return a};
function vehFrontRect(v,L,fe,len){return L.ax=='x'?{x:L.dir>0?fe:fe-len,y:L.c-v.TT/2-1,w:len,h:v.TT+2}:{x:L.c-v.TT/2-1,y:L.dir>0?fe:fe-len,w:v.TT+2,h:len}}
function trafficStep(dt){LT.t+=dt;if(LT.t>=PH[LT.i][1]){LT.t=0;LT.i=(LT.i+1)%PH.length}
 raceStep(dt);const night=nightMode(),ob=obstacles();
 LN.forEach(L=>{const vs=L.v,dir=L.dir;vs.sort((a,b)=>(b.p-a.p)*dir);let lead=null;
  for(let i=0;i<vs.length;i++){const v=vs[i];
   if(v.hold>0){v.hold-=dt;if(v.hold<=0){if((L.block&&!v.gone)||(night&&v.nt)){v.hold=3;continue}
     // 進場需要入口淨空
     if(vs.some(o=>o!==v&&o.hold<=0&&Math.abs(o.p-L.s0)<(o.LL+v.LL)/2+80)){v.hold=.5;continue}
     setKind(v,L,v.gone?v.k:pickKind(L.pool));v.p=L.s0;v.spd=v.v0*.6;v.hold=0;v.nt=0;posBox(v)}else{v.x=v.y=-9999;continue}}
   if(v.hold>0)continue;
   const fe=v.p+dir*v.LL/2;let avail=1e9;
   if(lead){avail=(lead.p-v.p)*dir-(lead.LL+v.LL)/2}
   lead=v;
   for(const st of L.stops){const ds=(st.pos-fe)*dir;if(ds<-1)continue;const lt=stLt(L,st);if(!lt)continue;
    if(lt=='g')break;if(lt=='y'&&ds<v.spd*v.spd/360+4)break;
    if(v.race){const busy=TR.some(o=>o!==v&&o.hold<=0&&o.ax!=v.ax&&hit(o,st.zone));if(!busy)break}
    avail=Math.min(avail,ds);break}
   const fr=vehFrontRect(v,L,fe,Math.max(22,v.spd*.5)+8);
   for(const o of ob){if(hit(fr,o)){const dd=L.ax=='x'?(dir>0?o.x-fe:fe-(o.x+o.w)):(dir>0?o.y-fe:fe-(o.y+o.h));avail=Math.min(avail,Math.max(0,dd))}}
   const mg=v.k=='moto'||v.k=='bike'?4:v.race?16:7;let target=v.v0;if(avail<1e8)target=Math.min(target,Math.max(0,(avail-mg)*(v.race?3.2:2.4)));
   if(v.spd<target)v.spd=Math.min(target,v.spd+v.acc*dt);else v.spd=Math.max(target,v.spd-v.brk*dt);v.br=target<v.spd-2||(v.spd<4&&avail<30);
   v.p+=dir*v.spd*dt;
   if((v.p-dir*v.LL/2-L.s1)*dir>0){v.hold=v.gone?9999:(night&&(v.idx%5>=2)?10:.5+Math.random()*3);if(night&&v.idx%5>=2&&!L.race)v.nt=1;v.x=v.y=-9999;continue}
   posBox(v)}});
 // 巷弄機車
 AV.forEach(v=>{const A=v.al,fwd=v.dir,ax=v.ax;let stop=false;const fe=v.p+fwd*v.LL/2,fr=vehFrontRect(v,{ax,dir:fwd,c:A.c},fe,26);ob.forEach(o=>{if(hit(fr,o))stop=true});
  if(v.pause>0){v.pause-=dt;v.spd=0}else{if(stop)v.spd=Math.max(0,v.spd-v.brk*dt);else v.spd=Math.min(v.v0,v.spd+v.acc*dt);v.p+=fwd*v.spd*dt;
   if(fwd>0&&v.p>A.a1){v.dir=-1;v.pause=3+Math.random()*4}else if(fwd<0&&v.p<A.a0){v.dir=1;v.pause=3+Math.random()*4}}
  v.br=stop;posBox(v)})}
function resetAlleys(){}
/* 號誌燈具 */
const HEADS=[];IXS.forEach(q=>{[['x',q.x-15,q.y+q.hh+2],['x',q.x+q.w+8,q.y-24],['y',q.x-15,q.y-24],['y',q.x+q.w+8,q.y+q.hh+2]].forEach(h=>HEADS.push({ax:h[0],x:h[1],y:h[2]}))});
function drawLt(c,x,y,ax){const t=ls(ax);R(c,x+2,y+11,2,10,'#333');R(c,x,y,6,12,'#1a1a1a');R(c,x+1,y+1,4,3,t=='r'?'#ff3b30':'#4a1f1f');R(c,x+1,y+5,4,3,t=='y'?'#ffd60a':'#4a4220');R(c,x+1,y+9,4,3,t=='g'?'#30d158':'#1f4a2a');
 const n=cdn(ax);if(n<100&&n>0){R(c,x-2,y-7,10,7,'#111');txt(c,String(n),x+3,y-1.2,t=='r'?'#ff5a4a':t=='y'?'#ffd60a':'#4aff80','bold 6px sans-serif')}}
