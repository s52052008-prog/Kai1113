/* v13.30 家事小遊戲重做：手拿菜瓜布上下刷碗（好幾個碗）、搓揉衣服、拿掃把把垃圾掃進畚箕、垃圾分類丟進垃圾桶
   ＋ 劇情回放（不影響進度） */

function hwGame(k,done){const C=HWD[k],T=hwTier(k),pow=T.pow||1,M=mgBox(C.i+' '+C.n+'（'+T.n+'）'),g=M.g,W2=720,H2=520,cv=M.cv;cv.style.cursor='none';cv.style.touchAction='none';
 let fin=false,fx=[],t0=performance.now(),lt=t0,mx=W2/2,my=H2/2,down=false,hover=false,combo=0,keyMove=false;const held={};
 const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W2/r.width,(e.clientY-r.top)*H2/r.height]};
 const finish=perfect=>{if(fin)return;fin=true;window.__kbBlock=performance.now()+1700;setTimeout(()=>{M.end();OVK.delete(kd);OVKU.delete(ku);done({perfect})},1000)};
 const rnd=(a,b)=>a+Math.random()*(b-a);
 // ── 手 ──
 const hand=(x,y,mode)=>{g.save();g.translate(x,y);if(mode!='broom')g.scale(1.5,1.5);
  if(mode=='sponge'){const w=T.pow>1?70:56;g.fillStyle='#3a9a4a';g.fillRect(-w/2,4,w,12);g.fillStyle='#ffd84a';g.fillRect(-w/2,-14,w,20);g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-w/2,-14,w,4)}
  if(mode=='broom'){const bw=T.pow>1?150:110;g.strokeStyle='#8a5a2e';g.lineWidth=7;g.beginPath();g.moveTo(0,-6);g.lineTo(46,-150);g.stroke();g.fillStyle='#c8a050';g.beginPath();g.moveTo(-bw/2,18);g.lineTo(bw/2,18);g.lineTo(bw/2-10,-6);g.lineTo(-bw/2+10,-6);g.fill();g.strokeStyle='#a07a30';g.lineWidth=1.5;for(let i=-bw/2+6;i<bw/2;i+=6){g.beginPath();g.moveTo(i*.9,-4);g.lineTo(i,18);g.stroke()}g.fillStyle='#c0392b';g.fillRect(-bw/2+10,-10,bw-20,6);g.translate(30,-92)}
  // 手掌＋手指
  const sk='#f2c9a0',sd='#d9a87a';g.fillStyle='#5a7ad0';g.fillRect(14,-8,28,34);g.fillStyle=sk;g.beginPath();g.ellipse(4,0,20,16,0,0,7);g.fill();
  if(mode=='open'){for(let i=0;i<4;i++){g.fillStyle=sk;g.fillRect(-26+i*2,-14+i*8,20,7);g.fillStyle=sd;g.fillRect(-26+i*2,-9+i*8,20,2)}}
  else{for(let i=0;i<4;i++){g.fillStyle=sk;g.beginPath();g.ellipse(-12,-12+i*8,9,5,0,0,7);g.fill();g.fillStyle=sd;g.fillRect(-18,-10+i*8,10,1.5)}}
  g.fillStyle=sk;g.beginPath();g.ellipse(-4,-18,6,9,-.6,0,7);g.fill();g.restore()};
 const bubble=(x,y,n)=>{for(let i=0;i<n;i++)fx.push({x:x+rnd(-20,20),y:y+rnd(-14,14),vx:rnd(-20,20),vy:rnd(-50,-10),t:0,r:rnd(3,9),k:'b'})};
 const bar=(pr,txt)=>{g.fillStyle='rgba(0,0,0,.28)';g.fillRect(60,16,600,26);g.fillStyle=pr>=1?'#3cc46a':'#3d9cf0';g.fillRect(63,19,594*Math.min(1,pr),20);g.fillStyle='#fff';g.font='bold 15px sans-serif';g.textAlign='center';g.fillText(txt,360,35)};
 const drawFx=dt=>{for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;if(f.k=='d'){f.x+=f.vx*dt;f.y+=f.vy*dt;if(f.t>.7){fx.splice(i,1);continue}g.globalAlpha=(1-f.t/.7)*.6;g.fillStyle='#a8a090';g.beginPath();g.arc(f.x,f.y,f.r*(1+f.t),0,7);g.fill();g.globalAlpha=1;continue}if(f.k=='b'){f.x+=f.vx*dt;f.y+=f.vy*dt;if(f.t>.8){fx.splice(i,1);continue}g.globalAlpha=1-f.t/.8;g.strokeStyle='#fff';g.lineWidth=1.5;g.fillStyle='rgba(220,240,255,.4)';g.beginPath();g.arc(f.x,f.y,f.r,0,7);g.fill();g.stroke();g.globalAlpha=1}
  else{if(f.t>1){fx.splice(i,1);continue}g.globalAlpha=1-f.t;g.fillStyle=f.c||'#2a8a4a';g.font='bold 20px sans-serif';g.textAlign='center';g.fillText(f.s,f.x,f.y-f.t*40);g.globalAlpha=1}}};
 const doneTxt=s=>{g.fillStyle='rgba(255,255,255,.6)';g.fillRect(0,0,W2,H2);g.fillStyle='#2a8a4a';g.font='bold 48px sans-serif';g.textAlign='center';g.fillText(s,360,280)};
 let move=(dx,dy,x,y)=>{},press=()=>{},release=()=>{},keyAct=e=>{},draw=dt=>{};
 // ════════ 🍽️ 洗碗：拿菜瓜布上下刷，一個一個洗 ════════
 if(k=='dish'){const N=4;let di=0,slide=0;const mk=()=>{const bowl=di%2==1,sp=[];for(let i=0;i<7+di;i++){const a=rnd(0,6.28),r=rnd(10,bowl?100:130);sp.push({x:360+Math.cos(a)*r,y:300+Math.sin(a)*r*.8,r:rnd(14,26),hp:1,c:['#8a5a2a','#b0402a','#6a4a2a','#c89a3a'][i%4],rice:Math.random()<.3})}return{bowl,sp}};let D=mk();
  M.tip.innerHTML='<b>按住滑鼠（或手指）上下來回刷</b>，把油污刷掉！一共 '+N+' 個碗盤。鍵盤：<b>↑ ↓</b> 交替按';
  move=(dx,dy,x,y)=>{if(!down||slide)return;const amt=(Math.abs(dy)*1+Math.abs(dx)*.45)*.0065*pow;let hit=0;D.sp.forEach(s=>{if(s.hp>0&&Math.hypot(s.x-x,s.y-y)<s.r+34){s.hp-=amt;hit=1}});if(hit&&Math.random()<.5)bubble(x,y,1);check()};
  const check=()=>{if(D.sp.every(s=>s.hp<=0)&&!slide){slide=.001;fx.push({x:360,y:200,t:0,s:'✨ 洗好了！'});combo++}};
  let lastK='';keyAct=e=>{if(e.key!='ArrowUp'&&e.key!='ArrowDown')return;e.preventDefault();const s=D.sp.filter(q=>q.hp>0).sort((a,b)=>b.hp-a.hp)[0];if(!s)return;mx=s.x;my=s.y+(e.key=='ArrowUp'?-16:16);down=true;move(0,e.key!=lastK?40:12,mx,my);down=false;lastK=e.key};
  draw=dt=>{// 流理台＋水槽
   g.fillStyle='#d9d4c8';g.fillRect(0,0,W2,H2);g.fillStyle='#c4c9cf';g.fillRect(70,90,580,400);g.fillStyle='#9aa4ae';g.fillRect(84,104,552,372);const wg=g.createLinearGradient(0,104,0,476);wg.addColorStop(0,'#bfe0f0');wg.addColorStop(1,'#8fc0d8');g.fillStyle=wg;g.fillRect(90,110,540,360);
   g.fillStyle='#b8bec6';g.fillRect(330,60,60,40);g.fillRect(352,60,16,70);
   // 旁邊待洗的碗、洗好的碗
   for(let i=di+1;i<N;i++){g.fillStyle='#f2efe8';g.beginPath();g.ellipse(40,440-(i-di)*14,34,10,0,0,7);g.fill();g.strokeStyle='#8a7a6a';g.stroke()}
   for(let i=0;i<di;i++){g.fillStyle='#ffffff';g.beginPath();g.ellipse(680,440-i*14,34,10,0,0,7);g.fill();g.strokeStyle='#9ad';g.stroke()}
   let ox=0;if(slide){slide+=dt;ox=slide<.5?slide*900:0;if(slide>=.5){di++;if(di>=N){finish(true);slide=0;ox=900}else{D=mk();slide=0;fx.push({x:360,y:120,t:0,s:`下一個（${di+1}/${N}）`,c:'#3d6aa8'})}}}
   g.save();g.translate(ox,0);g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(366,310,190,150,0,0,7);g.fill();g.fillStyle='#ffffff';g.beginPath();g.ellipse(360,300,D.bowl?150:180,D.bowl?130:150,0,0,7);g.fill();g.strokeStyle='#c8d4dc';g.lineWidth=5;g.stroke();
   g.strokeStyle='#e4ebef';g.lineWidth=3;g.beginPath();g.ellipse(360,300,D.bowl?100:120,D.bowl?86:100,0,0,7);g.stroke();if(D.bowl){g.strokeStyle='#4a7ab8';g.lineWidth=4;g.beginPath();g.ellipse(360,300,140,120,0,0,7);g.stroke()}
   D.sp.forEach(s=>{if(s.hp<=0)return;g.globalAlpha=Math.max(.12,s.hp);g.fillStyle=s.c;g.beginPath();g.ellipse(s.x,s.y,s.r,s.r*.75,0,0,7);g.fill();if(s.rice){g.fillStyle='#fff';for(let j=0;j<4;j++)g.fillRect(s.x-8+j*5,s.y-3+(j%2)*5,4,2)}g.globalAlpha=1});
   g.restore();const left=D.sp.reduce((a,s)=>a+Math.max(0,s.hp),0)/D.sp.length;bar((di+(1-left))/N,`🍽️ 第 ${Math.min(N,di+1)} / ${N} 個　${Math.round((1-left)*100)}%`);
   drawFx(dt);if(hover||down)hand(mx,my+(down?Math.sin(performance.now()/60)*3:0),'sponge');if(fin)doneTxt('✨ 碗盤亮晶晶！')}}
 // ════════ 👕 洗衣服：左右上下搓揉 ════════
 if(k=='laundry'){const sp=[];for(let i=0;i<7;i++)sp.push({x:rnd(270,450),y:rnd(190,400),r:rnd(18,30),hp:1,c:['#7a5a3a','#a07a40','#6a6a5a'][i%3]});let pdx=0,pdy=0,rubs=0;
  M.tip.innerHTML='<b>按住衣服左右、上下來回搓揉</b>，污漬會慢慢變乾淨！來回換方向搓最有效。鍵盤：<b>← → ↑ ↓</b> 交替按';
  move=(dx,dy,x,y)=>{if(!down)return;const d=Math.hypot(dx,dy);if(d<.5)return;const rev=(dx*pdx+dy*pdy)<0;pdx=dx;pdy=dy;if(rev)rubs++;const amt=d*.0042*pow*(rev?3:1);let hit=0;sp.forEach(s=>{if(s.hp>0&&Math.hypot(s.x-x,s.y-y)<s.r+40){s.hp-=amt;hit=1}});if(hit&&Math.random()<.6)bubble(x,y,1);if(sp.every(s=>s.hp<=0))finish(true)};
  let lk='';keyAct=e=>{const D={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!D)return;e.preventDefault();const s=sp.filter(q=>q.hp>0).sort((a,b)=>b.hp-a.hp)[0];if(!s)return;mx=s.x+D[0]*18;my=s.y+D[1]*18;down=true;move(D[0]*30,D[1]*30,s.x,s.y);down=false;lk=e.key};
  draw=dt=>{g.fillStyle='#cfe3ee';g.fillRect(0,0,W2,H2);// 洗衣盆
   g.fillStyle='#4a90c8';g.beginPath();g.ellipse(360,300,320,220,0,0,7);g.fill();g.fillStyle='#8cc8ec';g.beginPath();g.ellipse(360,300,296,198,0,0,7);g.fill();
   for(let i=0;i<30;i++){g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.arc(80+((i*97)%560),130+((i*53)%340),4+(i%4)*2,0,7);g.fill()}
   // 衣服
   const left=sp.reduce((a,s)=>a+Math.max(0,s.hp),0)/sp.length,wob=down?Math.sin(performance.now()/50)*2:0;
   g.save();g.translate(wob,0);g.fillStyle='#f6f2ea';g.beginPath();g.moveTo(250,160);g.lineTo(310,140);g.quadraticCurveTo(360,170,410,140);g.lineTo(470,160);g.lineTo(520,220);g.lineTo(470,250);g.lineTo(460,230);g.lineTo(460,430);g.lineTo(260,430);g.lineTo(260,230);g.lineTo(250,250);g.lineTo(200,220);g.closePath();g.fill();
   g.fillStyle=`rgba(140,120,90,${left*.45})`;g.fill();g.strokeStyle='#b8b0a0';g.lineWidth=3;g.stroke();g.strokeStyle='#d8d0c0';g.beginPath();g.moveTo(320,150);g.quadraticCurveTo(360,185,400,150);g.stroke();
   g.fillStyle='#e05a5a';g.font='bold 34px sans-serif';g.textAlign='center';g.fillText('♥',360,300);
   sp.forEach(s=>{if(s.hp<=0)return;g.globalAlpha=Math.max(.1,s.hp*.85);g.fillStyle=s.c;g.beginPath();g.ellipse(s.x,s.y,s.r,s.r*.8,s.x,0,7);g.fill();g.globalAlpha=1});g.restore();
   bar(1-left,`👕 搓揉中 ${Math.round((1-left)*100)}%　${rubs>5?'🫧 來回搓 ×'+rubs:''}`);drawFx(dt);
   if(hover||down){hand(mx-46,my+wob,'fist');g.save();g.translate(mx+46,my-wob);g.scale(-1,1);hand(0,0,'fist');g.restore()}if(fin)doneTxt('✨ 香香的，好乾淨！')}}
 // ════════ 🧹 掃地：拿掃把把垃圾掃進畚箕 ════════
 if(k=='clean'){const pan={x:560,y:360,w:120,h:90},items=[];const TY=[['dust','#9a948a'],['dust','#8a847a'],['hair','#3a2a1a'],['paper','#f4f0e6'],['crumb','#c8a060'],['leaf','#6a9a3a']];
  for(let i=0;i<16;i++){const t=TY[i%TY.length];let x,y;do{x=rnd(60,520);y=rnd(110,470)}while(x>pan.x-40&&y>pan.y-40);items.push({x,y,k:t[0],c:t[1],r:t[0]=='paper'?12:t[0]=='dust'?10:7,in:0,a:rnd(0,6)})}
  M.tip.innerHTML='<b>按住拖曳掃把</b>，把灰塵、紙屑、毛髮<b>推進右下角的畚箕</b>！鍵盤：<b>方向鍵</b>移動掃把';
  const bw=()=>T.pow>1?150:110;
  move=(dx,dy,x,y)=>{if(!down&&!keyMove)return;items.forEach(it=>{if(it.in)return;if(Math.abs(it.x-x)<bw()/2+it.r&&it.y>y-10&&it.y<y+30+it.r){it.x+=dx*1.05;it.y+=dy*1.05;it.x=Math.max(20,Math.min(pan.x+pan.w-12,it.x));it.y=Math.max(90,Math.min(H2-20,it.y));if(Math.random()<.2&&it.k=='dust')fx.push({x:it.x,y:it.y,vx:rnd(-20,20),vy:rnd(-30,0),t:0,r:rnd(3,6),k:'d'})}
    if(it.x>pan.x-6&&it.y>pan.y-14&&it.y<pan.y+pan.h+10){it.in=1;combo++;fx.push({x:it.x,y:it.y-10,t:0,s:'+1'})}});if(items.every(i=>i.in))finish(true)};
  const KV={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};keyAct=e=>{if(KV[e.key]){e.preventDefault();held[e.key]=1}};
  draw=dt=>{let kx=0,ky=0;for(const q in held)if(held[q]){kx+=KV[q][0];ky+=KV[q][1]}if(kx||ky){const sp=320*dt;keyMove=true;hover=true;mx=Math.max(40,Math.min(W2-40,mx+kx*sp));my=Math.max(90,Math.min(H2-30,my+ky*sp));move(kx*sp,ky*sp,mx,my);keyMove=false}
   g.fillStyle='#b88a5a';g.fillRect(0,0,W2,H2);for(let y=0;y<H2;y+=40){g.fillStyle=(y/40)%2?'#b0825a':'#bc9060';g.fillRect(0,y,W2,38);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(0,y+38,W2,2)}
   g.fillStyle='#e8e0d0';g.fillRect(0,0,W2,80);g.fillStyle='#8a6a4a';g.fillRect(0,76,W2,6);
   // 畚箕
   g.fillStyle='#3a8ac8';g.beginPath();g.moveTo(pan.x,pan.y);g.lineTo(pan.x+pan.w,pan.y-10);g.lineTo(pan.x+pan.w,pan.y+pan.h+10);g.lineTo(pan.x,pan.y+pan.h);g.fill();g.fillStyle='#2a6aa0';g.fillRect(pan.x+pan.w-6,pan.y-10,10,pan.h+20);g.fillStyle='#5aaae8';g.fillRect(pan.x,pan.y,6,pan.h);
   g.fillStyle='#fff';g.font='bold 13px sans-serif';g.textAlign='center';g.fillText('畚箕',pan.x+pan.w/2,pan.y+pan.h/2+4);g.fillText(`${items.filter(i=>i.in).length}/${items.length}`,pan.x+pan.w/2,pan.y+pan.h/2+22);
   items.forEach(it=>{if(it.in)return;g.save();g.translate(it.x,it.y);g.rotate(it.a);if(it.k=='dust'){g.fillStyle=it.c;g.globalAlpha=.85;[[0,0,10],[6,3,7],[-6,4,6]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill()})}
    else if(it.k=='paper'){g.fillStyle=it.c;g.fillRect(-10,-8,20,16);g.strokeStyle='#bbb';g.strokeRect(-10,-8,20,16);g.fillStyle='#9ab';g.fillRect(-7,-4,14,2);g.fillRect(-7,1,10,2)}
    else if(it.k=='hair'){g.strokeStyle=it.c;g.lineWidth=1.5;g.beginPath();for(let a=0;a<12;a+=.5)g.lineTo(Math.cos(a)*(3+a),Math.sin(a)*(3+a)*.6);g.stroke()}
    else if(it.k=='leaf'){g.fillStyle=it.c;g.beginPath();g.ellipse(0,0,9,5,0,0,7);g.fill()}else{g.fillStyle=it.c;for(let j=0;j<5;j++)g.fillRect(-6+j*3,(j%2)*3,3,3)}g.restore()});
   const got=items.filter(i=>i.in).length;bar(got/items.length,`🧹 掃進畚箕 ${got} / ${items.length}`);drawFx(dt);if(hover||down)hand(mx,my,'broom');if(fin)doneTxt('✨ 地板乾乾淨淨！')}}
 // ════════ 🗑️ 倒垃圾：分類丟進垃圾桶 ════════
 if(k=='trash'){const BIN=[{n:'一般垃圾',c:'#6a6a72',ic:'🗑️'},{n:'資源回收',c:'#2a7ac8',ic:'♻️'},{n:'廚餘',c:'#3a9a4a',ic:'🍂'}];BIN.forEach((b,i)=>{b.x=120+i*240;b.y=430});
  const POOL=[['🧻',0,'衛生紙'],['🩹',0,'用過的OK繃'],['🧽',0,'舊菜瓜布'],['🪥',0,'舊牙刷'],['🥫',1,'鐵罐'],['🧃',1,'鋁箔包'],['📦',1,'紙箱'],['📰',1,'舊報紙'],['🍾',1,'玻璃瓶'],['🥤',1,'飲料杯'],['🍌',2,'香蕉皮'],['🍎',2,'蘋果核'],['🥚',2,'蛋殼'],['🍉',2,'西瓜皮'],['🥬',2,'菜葉']];
  const items=POOL.sort(()=>Math.random()-.5).slice(0,12).map((q,i)=>({ic:q[0],b:q[1],n:q[2],x:80+(i%6)*112+rnd(-14,14),y:140+Math.floor(i/6)*110+rnd(-10,14),hx:0,hy:0,in:0,fly:0}));items.forEach(i=>{i.hx=i.x;i.hy=i.y});
  let hold=null,miss=0,sel=0;M.tip.innerHTML='<b>按住垃圾，拖到正確的垃圾桶</b>放開！一般垃圾、資源回收、廚餘要分好。鍵盤：<b>1 2 3</b> 把閃爍的垃圾丟進對應的桶子';
  const drop=(it,bi)=>{if(it.b==bi){it.in=1;it.fly={bi,t:0,x0:it.x,y0:it.y};combo++;fx.push({x:BIN[bi].x,y:BIN[bi].y-70,t:0,s:'+1 '+it.n})}else{miss++;combo=0;fx.push({x:it.x,y:it.y-30,t:0,s:`❌ ${it.n}要丟「${BIN[it.b].n}」`,c:'#c0392b'});it.x=it.hx;it.y=it.hy}if(items.every(i=>i.in))finish(miss==0)};
  press=(x,y)=>{hold=items.filter(i=>!i.in).find(i=>Math.hypot(i.x-x,i.y-y)<36)||null};
  move=(dx,dy,x,y)=>{if(hold){hold.x=x;hold.y=y}};
  release=(x,y)=>{if(!hold)return;const bi=BIN.findIndex(b=>Math.abs(x-b.x)<80&&y>b.y-90);if(bi>=0)drop(hold,bi);else{hold.x=hold.hx;hold.y=hold.hy}hold=null};
  keyAct=e=>{const n=+e.key;if(n>=1&&n<=3){e.preventDefault();const rest=items.filter(i=>!i.in);const it=rest[sel%Math.max(1,rest.length)];if(it){it.x=BIN[n-1].x;it.y=BIN[n-1].y-60;drop(it,n-1)}}else if(e.key=='ArrowRight'||e.key=='ArrowLeft'){sel+=e.key=='ArrowRight'?1:-1+items.length}};
  draw=dt=>{g.fillStyle='#d8e4d0';g.fillRect(0,0,W2,H2);g.fillStyle='#c8d8be';for(let i=0;i<W2;i+=48)g.fillRect(i,0,24,H2);g.fillStyle='#a8b89c';g.fillRect(0,360,W2,160);
   BIN.forEach((b,i)=>{const hl=hold&&Math.abs(mx-b.x)<80&&my>b.y-90;g.fillStyle=b.c;g.fillRect(b.x-62,b.y-60,124,110);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(b.x-70,b.y-74,140,16);g.fillStyle=hl?'#ffd84a':'#3a3a3a';g.fillRect(b.x-68,b.y-76,136,8);
    g.font='30px sans-serif';g.textAlign='center';g.fillText(b.ic,b.x,b.y-14);g.fillStyle='#fff';g.font='bold 15px sans-serif';g.fillText(`${i+1} ${b.n}`,b.x,b.y+30)});
   const rest=items.filter(i=>!i.in),cur=rest[sel%Math.max(1,rest.length)];
   items.forEach(it=>{if(it.in){if(it.fly&&it.fly.t<1){it.fly.t+=dt*3;const b=BIN[it.fly.bi],k2=Math.min(1,it.fly.t);g.globalAlpha=1-k2;g.font='34px sans-serif';g.textAlign='center';g.fillText(it.ic,it.fly.x0+(b.x-it.fly.x0)*k2,it.fly.y0+(b.y-40-it.fly.y0)*k2-Math.sin(k2*3.14)*60);g.globalAlpha=1}return}
    const sc=it===hold?1.25:1;g.save();g.translate(it.x,it.y);g.scale(sc,sc);g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(0,22,20,6,0,0,7);g.fill();g.font='40px sans-serif';g.textAlign='center';g.fillText(it.ic,0,14);
    if(it===cur&&!hold&&Math.floor(performance.now()/300)%2){g.strokeStyle='#ffd84a';g.lineWidth=3;g.strokeRect(-28,-26,56,52)}
    if(T.pow>1){g.font='bold 11px sans-serif';g.fillStyle=BIN[it.b].c;g.fillText(BIN[it.b].n,0,36)}else{g.font='11px sans-serif';g.fillStyle='#3a3a3a';g.fillText(it.n,0,36)}g.restore()});
   const got=items.filter(i=>i.in).length;bar(got/items.length,`🗑️ 分類丟好 ${got} / ${items.length}${miss?`　丟錯 ${miss}`:''}`);drawFx(dt);if(hover||down)hand(mx+22,my+10,hold?'fist':'open');if(fin)doneTxt(miss?'✨ 垃圾倒好了！':'✨ 完美分類！')}}
 // ── 輸入 ──
 cv.addEventListener('pointerdown',e=>{const [x,y]=pos(e);mx=x;my=y;down=true;hover=true;try{cv.setPointerCapture(e.pointerId)}catch(er){}press(x,y)});
 cv.addEventListener('pointermove',e=>{const [x,y]=pos(e);const dx=x-mx,dy=y-my;mx=x;my=y;hover=true;move(dx,dy,x,y)});
 const up=e=>{if(!down)return;down=false;const [x,y]=pos(e);release(x,y)};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);cv.addEventListener('pointerleave',()=>{if(!down)hover=false});
 const kd=e=>{if(fin)return;if(e.key=='Escape'){fin=true;M.end();OVK.delete(kd);OVKU.delete(ku);return}keyAct(e)},ku=e=>{delete held[e.key]};
 OVK.add(kd);OVKU.add(ku);
 const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);OVKU.delete(ku);return}const dt=Math.min(.05,(now-lt)/1000);lt=now;g.save();draw(dt);g.restore();requestAnimationFrame(loop)};requestAnimationFrame(loop)}

// ════════ 🎬 劇情回放：重看一次，不影響進度 ════════
function replayPark(){const P=st.pro=st.pro||{},bak={m1:P.m1,pkGo:P.pkGo},s=FRS('yijia'),sb={met:s.met,pt:s.pt},T0=JSON.stringify(T),hp={money:st.money,joy:st.joy};
 P.m1=0;P.pkGo=0;const _adv=advance,_od=openDlg,_fx=fxApply;let restored=false;
 const restore=()=>{if(restored)return;restored=true;P.m1=bak.m1;P.pkGo=bak.pkGo;s.met=sb.met;s.pt=sb.pt;Object.assign(T,JSON.parse(T0));st.joy=hp.joy;advance=_adv;fxApply=_fx;setTimeout(()=>{openDlg=_od},5000);try{hud();qpanel()}catch(e){}};
 advance=function(){};fxApply=function(){};
 openDlg=function(t){if(/第一次見面/.test(String(t))){restore();openDlg=_od;return _od('🎬 回放結束','這是回放模式，進度和好感度都沒有改變喔。',[['好','',closeDlg]])}return _od.apply(this,arguments)};
 try{parkDate()}catch(e){restore()}
 // 保險：中途按 Esc 離開也要還原
 const chk=setInterval(()=>{if(!window.OVL){clearInterval(chk);restore()}},1500)}
const REPLAYS=[['🧋 林園的公園・第一次見面','你們第一次見面的晚上',replayPark,()=>st.pro&&st.pro.m1]];
function replayMenu(back){openDlg('🎬 劇情回放','重看看過的劇情。<b>回放不會改變進度、時間和好感度。</b>',REPLAYS.map(r=>[r[0],r[3]()?r[1]:'🔒 還沒看過',()=>{closeDlg();r[2]()},!r[3]()]).concat([['返回','',back||closeDlg]]))}
SETOPTS=SETOPTS||[];
{const _sm=settingsMenu;settingsMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(t=='⚙️ 設定'&&Array.isArray(opts)&&!opts.some(q=>/劇情回放/.test(q[0])))opts.splice(opts.length-1,0,['🎬 劇情回放','重看看過的劇情（不影響進度）',()=>replayMenu(settingsMenu)])}catch(e){}return od.call(this,t,d,opts,...r)};try{return _sm.apply(this,arguments)}finally{openDlg=od}}}
CHEATS.push(['replay park','🎬 重看「林園的公園」',()=>{replayPark();return ''}]);
