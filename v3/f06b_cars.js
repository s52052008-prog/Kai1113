/* ===== v3：新增車型（休旅車、跑車、小客貨車、掀背車）===== */
Object.assign(VK,{suv:{L:42,T:15,Lv:34,s:[56,72]},sport:{L:38,T:13,Lv:30,s:[78,98]},pickup:{L:48,T:15,Lv:38,s:[54,68]},hatch:{L:33,T:13,Lv:27,s:[62,80]}});
const CX={ // 側視輪廓（朝右＝車頭）
 suv:{L:42,gy:27,bt:14,bh:11,ch:8.4,c0:5,c1:34,s0:8,s1:31,wr:4.7,wx:[9.5,32],H:30},
 sport:{L:38,gy:20,bt:9.8,bh:6.8,ch:4.4,c0:11,c1:29,s0:16,s1:23,wr:4.2,wx:[8,29.6],H:23},
 hatch:{L:33,gy:24,bt:12,bh:9.4,ch:7.2,c0:6,c1:25,s0:8,s1:19,wr:4.4,wx:[7.2,26],H:27},
 pickup:{L:48,gy:27,bt:13.6,bh:10.6,ch:7.6,c0:17,c1:36,s0:21,s1:31,wr:4.8,wx:[9,39.6],H:30}};
const mk2=(wd,ht,gy,fn)=>{const c0=document.createElement('canvas');c0.width=Math.ceil(wd*SK);c0.height=Math.ceil(ht*SK);const x=c0.getContext('2d');x.scale(SK,SK);fn(x);return{img:c0,w:wd,h:ht,gy}};
function carSide(k,col,o){const P=CX[k],L=P.L,gy=P.gy,x0=3;return mk2(L+6,P.H+4,gy,c=>{
 c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+L/2,gy+.5,L/2+.5,2.2,0,0,7);c.fill();
 P.wx.forEach(q=>{c.fillStyle='#0a0a0e';c.beginPath();c.arc(x0+q,gy-P.wr+.2,P.wr+1,Math.PI,0);c.fill()});
 const by=gy-P.bt,cy0=by;
 if(k=='pickup'){ // 後斗
  vg(c,x0,by+1.4,L-P.c1+x0-2,P.bh-1.4,1.4,col);R(c,x0,by+.8,L-P.c1+3,1.6,shade(col,-30));R(c,x0+1.4,by+1.8,L-P.c1-1,3,shade(col,-46));
  const cg=['#b48a4a','#6a7a8a','#c05a3a'];R(c,x0+3,by-1.2,7,3.4,cg[(o.pax?1:0)+((col.length)%2)]);R(c,x0+3,by-1.2,7,.7,'rgba(255,255,255,.4)');R(c,x0+3.6,by-3.4,4,2.4,'#8a5a2a')}
 // 主車身
 const bx0=k=='pickup'?x0+P.c0-2:x0,bw=k=='pickup'?L-(P.c0-2):L;
 vg(c,bx0,by,bw,P.bh,k=='sport'?2.4:3,col);
 // 座艙
 const sx=(v)=>x0+v;
 poly(c,[sx(P.c0),cy0,sx(P.s0),cy0-P.ch,sx(P.s1),cy0-P.ch,sx(P.c1),cy0],shade(col,k=='sport'?0:8));
 poly(c,[sx(P.s0),cy0-P.ch,sx(P.s1),cy0-P.ch,sx(P.s1),cy0-P.ch+1.2,sx(P.s0),cy0-P.ch+1.2],'rgba(255,255,255,.4)');
 const gm=1.3,gg=glassG(c,cy0-P.ch,cy0);
 const mid=(P.s0+P.s1)/2+(k=='suv'?-1:0);
 poly(c,[sx(P.c0+gm+.4),cy0-.6,sx(P.s0+gm*.8),cy0-P.ch+1.4,sx(mid-.5),cy0-P.ch+1.4,sx(mid-.5),cy0-.6],gg);
 poly(c,[sx(mid+.7),cy0-.6,sx(mid+.7),cy0-P.ch+1.4,sx(P.s1-gm*.4),cy0-P.ch+1.4,sx(P.c1-gm-.2),cy0-.6],gg);
 R(c,sx(mid-.5),cy0-P.ch+.6,1.2,P.ch,shade(col,-22));
 // 車門線、把手、後視鏡
 R(c,sx(mid+.3),cy0+1,.8,P.bh-2.4,'rgba(0,0,0,.28)');R(c,sx(P.c1-9),cy0+2.4,2.6,.8,'rgba(255,255,255,.55)');R(c,sx(mid-9),cy0+2.4,2.6,.8,'rgba(255,255,255,.55)');R(c,sx(P.c1-3),cy0-.6,2.8,2,shade(col,-10));
 // 燈與保險桿
 R(c,x0+L-3.6,by+1.6,3.2,2.2,'#fff7c2');R(c,x0+L-3.6,by+1.6,3.2,.7,'#fff');R(c,x0,by+1.8,2.4,2.4,'#e0302a');R(c,x0-.6,gy-P.wr-1.6,L+1.2,1.8,'#2a2a30');R(c,x0+L-2.4,gy-P.wr-3.2,2.4,1.6,'#d8d8d4');
 R(c,x0+2,gy-P.wr-.4,L-4,.8,'rgba(0,0,0,.3)');
 if(k=='suv'){R(c,x0+1,gy-P.wr-3.8,L-2,2.2,'#2a2a30');R(c,sx(P.s0-1),cy0-P.ch-1.6,P.s1-P.s0+2,1,'#222');R(c,sx(P.s0+1),cy0-P.ch-2.4,1,1.4,'#222');R(c,sx(P.s1-2),cy0-P.ch-2.4,1,1.4,'#222');R(c,x0-1.6,by+4,2.4,5,'#3a3a40');R(c,x0+L-.8,by+4,2.4,5,'#3a3a40')}
 if(k=='sport'){R(c,x0-.6,by-2.4,5.4,1.4,'#111');R(c,x0+.8,by-2.4,1.1,3,'#111');R(c,x0+4,by+1.4,L-14,1,'#fff');R(c,x0+4,by+2.8,L-14,.8,'#e0302a');R(c,x0+24,by+2.4,5,1.4,'rgba(0,0,0,.4)');R(c,x0+3,gy-P.wr-2.6,L-6,.7,'#42f0ff')}
 if(k=='hatch'){R(c,x0+.4,cy0-P.ch+1.8,1.4,P.ch-1.6,shade(col,-14));R(c,x0+L-9,by+5,5,.8,'rgba(255,255,255,.4)')}
 P.wx.forEach(q=>wheel(c,x0+q,gy-P.wr+.2,P.wr*(k=='sport'?1:.96)));
 if(k=='pickup'){R(c,x0+L-1.6,by+4,1.8,3,'#d8d8d4')}
},L)}
// 前／後視
const CF={suv:{Wv:19,gy:30,bh:13,top:9.6,H:33},sport:{Wv:19,gy:23,bh:8.4,top:5.6,H:26},hatch:{Wv:16,gy:26,bh:11,top:6.8,H:29},pickup:{Wv:19,gy:29,bh:13,top:8.4,H:32}};
function carFront(k,col,back,o){const P=CF[k],Wv=P.Wv,x0=3,gy=P.gy;return mk2(Wv+6,gy+4,gy,c=>{
 c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x0+Wv/2,gy+.6,Wv/2+1.6,2.2,0,0,7);c.fill();
 const tw=k=='sport'?3.6:3;R(c,x0-.8,gy-6.4,tw,6.4,'#101014');R(c,x0+Wv-tw+.8,gy-6.4,tw,6.4,'#101014');
 const bt=gy-P.bh-1.6;
 if(k=='pickup'&&back){vg(c,x0,gy-P.bh-3,Wv,P.bh+0,2,shade(col,-6));R(c,x0+1.6,gy-P.bh-1.6,Wv-3.2,2.6,shade(col,-40));R(c,x0+Wv/2-2.4,gy-P.bh-.6,4.8,1.2,'#aaa')}
 vg(c,x0,bt,Wv,P.bh,k=='sport'?3.2:2.8,col);
 const top=bt-P.top,ins=k=='sport'?3.4:2.2;
 vg(c,x0+ins,top,Wv-ins*2,P.top+1,2,shade(col,8));R(c,x0+ins+.8,top+.4,Wv-ins*2-1.6,1,'rgba(255,255,255,.4)');
 const gg=glassG(c,top+1.4,bt);poly(c,[x0+ins+1,top+1.8,x0+Wv-ins-1,top+1.8,x0+Wv-ins+.4,bt,x0+ins-.4,bt],gg);
 if(back)poly(c,[x0+ins+1,top+1.8,x0+Wv-ins-1,top+1.8,x0+Wv-ins-1.4,top+4.4,x0+ins+1.4,top+4.4],'rgba(0,0,0,.2)');
 R(c,x0+Wv/2-.4,top+1.8,.8,bt-top-1.8,'rgba(255,255,255,.28)');
 R(c,x0-1.4,bt-2,2.2,1.8,col);R(c,x0+Wv-.8,bt-2,2.2,1.8,col); // 後視鏡
 R(c,x0+1.2,bt,Wv-2.4,1.8,'rgba(255,255,255,.22)');
 // 燈
 const ly=gy-P.bh+.6;if(back){RR(c,x0+.4,ly,4.6,2.6,1,'#e0302a');RR(c,x0+Wv-5,ly,4.6,2.6,1,'#e0302a');R(c,x0+.6,ly,4,.8,'#ff8a80');R(c,x0+Wv-4.8,ly,4,.8,'#ff8a80');if(k=='sport'){R(c,x0+5,ly+.6,Wv-10,1,'#e0302a')}}
 else{RR(c,x0+.4,ly,k=='sport'?5.2:4,k=='sport'?1.9:2.6,1,'#fff7c2');RR(c,x0+Wv-(k=='sport'?5.6:4.4),ly,k=='sport'?5.2:4,k=='sport'?1.9:2.6,1,'#fff7c2');R(c,x0+5.4,ly+.8,Wv-10.8,2,'#26262c');if(k=='suv'||k=='pickup'){R(c,x0+Wv/2-3.4,ly+1,6.8,.6,'#c8ccd0')}}
 R(c,x0+5.8,gy-6.8,Wv-11.6,2.8,'#f4f4f0');R(c,x0+6.6,gy-6,Wv-13.2,.7,'#2a5aa8');R(c,x0,gy-4.2,Wv,2,k=='suv'||k=='pickup'?'#2a2a30':'#34343a');
 if(k=='suv'){R(c,x0+.8,top-1.8,Wv-1.6,1,'#222');R(c,x0+1.4,top-2.6,1,1.4,'#222');R(c,x0+Wv-2.4,top-2.6,1,1.4,'#222');R(c,x0-.6,bt+2,1.2,5,'#3a3a40');R(c,x0+Wv-.6,bt+2,1.2,5,'#3a3a40')}
 if(k=='sport'){if(back){R(c,x0-1.4,bt-4.2,Wv+2.8,1.8,'#111');R(c,x0+1.8,bt-3,1.2,3,'#111');R(c,x0+Wv-3,bt-3,1.2,3,'#111');R(c,x0+Wv/2-.9,top+.4,1.8,bt-top-4,'#e8e8e8')}else{R(c,x0+Wv/2-.9,top+.4,1.8,P.top+P.bh-2,'#f4f4f4');R(c,x0+3,gy-3,Wv-6,.9,'#42f0ff')}}
 if(k=='pickup'&&!back){R(c,x0+1.4,bt-.8,Wv-2.8,1,'#222')}
})}
// 掛接到原有 sideSpr / frontSpr
const _side=sideSpr,_front=frontSpr;
sideSpr=function(k,col,o){return CX[k]?carSide(k,col,o):_side(k,col,o)};
frontSpr=function(k,col,back,o){return CF[k]?carFront(k,col,back,o):_front(k,col,back,o)};
// 車流組成與顏色
POOLS.in=[['car',26],['suv',16],['hatch',10],['sport',5],['pickup',5],['taxi',14],['van',7],['truck',6],['bus',9],['police',2]];
POOLS.out=[['moto',72],['bike',10]];
POOLS.st=[['car',26],['suv',12],['hatch',10],['sport',3],['pickup',5],['moto',32],['taxi',8],['van',6],['truck',4],['police',2]];
const _setKind=setKind;
setKind=function(v,L,k){_setKind(v,L,k);if(k=='suv')v.col=['#1f2a38','#e8e8e8','#5a6a58','#7a2a2a','#9aa0a6','#2a4a6a','#6a5a3a'][(Math.random()*7)|0];else if(k=='sport')v.col=['#e03a2a','#f2c230','#2f80ed','#ff7a1a','#1fb8a0','#e8e8e8','#8a2ad0'][(Math.random()*7)|0];else if(k=='pickup')v.col=['#4a5a3a','#9aa0a6','#c8a050','#2a4a8a','#e8e8e8','#7a2a1a'][(Math.random()*6)|0];else if(k=='hatch')v.col=['#f08cb6','#7ad0e0','#f2c230','#e8e8e8','#8ac060','#d33a3a','#3a7bd5'][(Math.random()*7)|0]};

/* ===== 整齊的停車格（汽車＋機車）：依建築出入口自動規劃，只鋪在人行鋪面內，避開裝飾與樹 ===== */
const PARKED=[];
{const PKS={'全家':[0,3],'診所':[2,2],'咖啡店':[0,3],'書局':[0,3],'健身房':[5,3],'電影院':[3,3],'旅館':[3,2],'餐廳':[2,3],'派出所':[2,3,'police','#f4f6f8'],'銀行':[2,2],'消防局':[4,0,'truck'],'城光復興堂':[6,3],'遊藝場':[3,5],'寵物店':[1,2],'服飾店':[2,2],'家樂福':[0,0],'機車行':[0,6],'美髮':[0,3],'廟':[0,4],'新興高中':[0,5],'家':[1,2]};
 const DEP={262:40,640:48,990:68},CK=['car','suv','hatch','sport','pickup','car','suv','hatch','taxi'],COL={car:['#d33a3a','#3a7bd5','#2a9d5c','#e8e8e8','#222','#9aa0a6','#c9a06a'],suv:['#1f2a38','#e8e8e8','#5a6a58','#7a2a2a','#9aa0a6','#2a4a6a'],hatch:['#f08cb6','#7ad0e0','#f2c230','#e8e8e8','#8ac060','#d33a3a'],sport:['#e03a2a','#f2c230','#2f80ed','#ff7a1a','#1fb8a0'],pickup:['#4a5a3a','#9aa0a6','#c8a050','#2a4a8a','#e8e8e8'],taxi:['#f2c230'],police:['#f4f6f8'],truck:['#d9302a']};
 const inPave=(x,y,w,h)=>PAVE.some(q=>x>=q[0]&&y>=q[1]&&x+w<=q[0]+q[2]&&y+h<=q[1]+q[3]);
 const free=(x,y,w,h)=>inPave(x,y,w,h)&&!DEC.some(d=>d.__pk?false:hit({x:x+2,y:y+h*.4,w:w-4,h:h*.6},{x:d.x,y:d.y+d.h*.4,w:d.w,h:d.h*.6}))&&!solids.some(o=>hit({x:x+2,y:y+h*.4,w:w-4,h:h*.6},o))&&!B.concat(BD).some(b=>hit({x:x,y:y,w:w,h:h},{x:b.x-2,y:b.y,w:b.w+4,h:b.h}))&&!AL.some(a=>hit({x:x,y:y,w:w,h:h},a));
 const pr=(()=>{let a=7;return()=>(a=(a*9301+49297)%233280)/233280})();
  B.forEach(b=>{const spec=PKS[b.n];if(!spec||!DEP[b.bot])return;const base=b.bot+DEP[b.bot],dx=b.x+b.dx,dd=b.dw/2+11;
  const iv=[[b.x-4,dx-dd],[dx+dd,b.x+b.w+4]].filter(q=>q[1]-q[0]>=20).sort((p,q)=>(q[1]-q[0])-(p[1]-p[0]));
  let cars=spec[0],sc=0;const ck=spec[2];
  const doRow=(x0,x1,kind,want)=>{ // kind: 'c' | 's'
   const SW=kind=='c'?26:22,n=Math.floor((x1-x0)/SW),h=kind=='c'?34:16;if(n<1)return 0;let used=0;const xs=x1-x0-n*SW;
   // 先畫格線
   const slots=[];for(let i=0;i<n;i++){const sx=x0+xs/2+i*SW;if(free(sx,base-h,SW,h))slots.push(sx);else if(slots.length&&slots[slots.length-1]!==null)slots.push(null)}
   const runs=[];let cur=[];slots.forEach(q=>{if(q===null){if(cur.length)runs.push(cur);cur=[]}else cur.push(q)});if(cur.length)runs.push(cur);
   runs.forEach(r=>{if(!r.length||used>=want)return;const SWk2=kind=='c'?26:22,rx0=r[0],rx1=r[r.length-1]+SWk2;
    s.fillStyle='rgba(60,62,70,.22)';s.fillRect(rx0,base-h-1,rx1-rx0,h+1);
    s.fillStyle='rgba(255,255,255,.85)';{const SWk=kind=='c'?26:22;for(let i=0;i<=r.length;i++)s.fillRect(rx0+i*SWk-.5,base-h,1,h)}
    if(kind=='s'){s.fillRect(rx0-.5,base-h,rx1-rx0+1,.8)}
    r.forEach(sx=>{if(used>=want)return;const SW=kind=='c'?26:22;
     if(kind=='c'){const k=ck||CK[(pr()*CK.length)|0],cl=COL[k]||COL.car,col=cl[(pr()*cl.length)|0],back=pr()<.62,sp=frontSpr(k,col,back,{});
      const e={spr:sp.img,x:sx+SW/2-sp.w/2,y:base-sp.gy,w:sp.w,h:sp.h,by:base+1,__pk:1};DEC.push(e);solids.push({x:sx+3,y:base-9,w:SW-6,h:9});if(back===false&&k=='police'){}}
     else{const col=spec[3]||SCC[(pr()*8)|0];DEC.push({spr:scSpr(col,spec[3]?'#1f4fa3':(pr()<.35?SCC[(pr()*8)|0]:null)),x:sx+.5,y:base-13.5,w:21,h:13,by:base,__pk:1});solids.push({x:sx+2,y:base-8,w:18,h:8})}
     used++})});
   return used};
  // 汽車放最寬的一段，機車放其餘
  if(cars&&iv[0]){const w=iv[0];const u0=doRow(w[0],w[1],'c',ck=='truck'?2:cars);if(ck=='truck'&&iv[1])doRow(iv[1][0],iv[1][1],'c',2)}
  if(sc){const w=cars?iv[1]||null:iv[0];if(w)doRow(w[0],w[1],'s',sc);else if(iv[0]&&!cars)doRow(iv[0][0],iv[0][1],'s',sc)}
 })}

/* ===== 家樂福專屬停車場（柏油地面、車格線、出入口、停車標誌）===== */
{const LX=28,LY=1000,LW=228,LH=90,pr=(()=>{let a=11;return()=>(a=(a*9301+49297)%233280)/233280})();
 // 路緣與柏油
 R(s,LX-3,LY-3,LW+6,LH+6,'#c9c4b6');R(s,LX-2,LY-2,LW+4,LH+4,'#8d8a82');GR(s,LX,LY,LW,LH,'#4c4f58','#3f424a');
 for(let i=0;i<520;i++)R(s,LX+pr()*LW,LY+pr()*LH,1.4,1,'rgba(255,255,255,.07)');
 for(let i=0;i<320;i++)R(s,LX+pr()*LW,LY+pr()*LH,1.6,1,'rgba(0,0,0,.14)');
 // 入口缺口（右側連到前方鋪面）與停車標誌
 R(s,LX+LW-2,LY+30,6,24,'#4c4f58');R(s,LX+LW-2,LY+30,6,1,'rgba(255,255,255,.12)');
 // 兩排車格
 const SW=26,N=8,rows=[{base:LY+38,h:34},{base:LY+LH-2,h:34}];
 rows.forEach((r,ri)=>{R(s,LX+1,r.base-r.h,N*SW,.9,'rgba(255,255,255,.7)');for(let i=0;i<=N;i++)R(s,LX+1+i*SW-.5,r.base-r.h,1,r.h,'rgba(255,255,255,.85)');
  for(let i=0;i<N;i++)R(s,LX+1+i*SW+5,ri?r.base-r.h+1:r.base-3,SW-10,2,'#d8d4c8')});
 // 行車方向箭頭
 for(let i=0;i<3;i++){const ax=LX+30+i*62,ay=LY+46;s.fillStyle='rgba(255,255,255,.55)';s.beginPath();s.moveTo(ax+14,ay);s.lineTo(ax+8,ay-3.4);s.lineTo(ax+8,ay-1.2);s.lineTo(ax,ay-1.2);s.lineTo(ax,ay+1.2);s.lineTo(ax+8,ay+1.2);s.lineTo(ax+8,ay+3.4);s.fill()}
 // 停車牌
 R(s,LX+LW-14,LY-26,2,26,'#777');R(s,LX+LW-22,LY-34,18,14,'#2f6fd0');R(s,LX+LW-22,LY-34,18,1.4,'#fff');txt(s,'P',LX+LW-13,LY-23,'#fff','bold 12px sans-serif');
 place(sandSpr('家樂福 停車場','#2d6cdf'),LX+4,LY-22,14,16);
 // 停車
 const CKK=['car','suv','hatch','sport','pickup','car','suv','hatch','taxi'],CCL={car:['#d33a3a','#3a7bd5','#2a9d5c','#e8e8e8','#222','#9aa0a6','#c9a06a'],suv:['#1f2a38','#e8e8e8','#5a6a58','#7a2a2a','#9aa0a6','#2a4a6a'],hatch:['#f08cb6','#7ad0e0','#f2c230','#e8e8e8','#8ac060','#d33a3a'],sport:['#e03a2a','#f2c230','#2f80ed','#ff7a1a','#1fb8a0','#e8e8e8'],pickup:['#4a5a3a','#9aa0a6','#c8a050','#2a4a6a'],taxi:['#f2c230']};
 rows.forEach((r,ri)=>{for(let i=0;i<N;i++){if(pr()<.38)continue;const k=CKK[(pr()*CKK.length)|0],cl=CCL[k]||CCL.car,col=cl[(pr()*cl.length)|0],back=ri==0?pr()<.7:pr()<.3,sp=frontSpr(k,col,back,{}),sx=LX+1+i*SW;
   DEC.push({spr:sp.img,x:sx+SW/2-sp.w/2,y:r.base-sp.gy-1,w:sp.w,h:sp.h,by:r.base,__pk:1});solids.push({x:sx+3,y:r.base-10,w:SW-6,h:10})}});
 // 圍欄兩端
 [[LX-4,LY-4],[LX-4,LY+LH-6]].forEach(q=>{R(s,q[0],q[1],5,10,'#e8b23a');R(s,q[0],q[1]+3,5,2,'#222')});
}
