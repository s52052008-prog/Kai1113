/* v5.2 阿香炭烤：客人進出、帶位、點餐、上菜、用餐、收拾、清潔 */
FD.cgrill=(c,x,y,w,h)=>{R(c,x+2,y+h,w,3,'rgba(0,0,0,.25)');GR(c,x,y+8,w,h-8,'#5a5a62','#3a3a40');R(c,x+3,y+10,w-6,h-16,'#2a1a14');
 for(let i=0;i<w-8;i+=5)for(let j=0;j<h-18;j+=5){const k=(i*7+j*3)%11;R(c,x+5+i,y+12+j,4,4,k<3?'#ff6a20':k<6?'#c03a10':'#5a2a14')}
 for(let i=0;i<w-6;i+=3)R(c,x+3+i,y+10,1,h-16,'rgba(200,200,210,.55)');
 for(let i=0;i<4;i++){const sx=x+8+i*(w-16)/4;R(c,sx,y+14,14,2,'#d9b080');for(let k=0;k<3;k++)R(c,sx+2+k*4,y+12,3,5,['#8a3a1a','#c0392b','#e8b040'][(i+k)%3])}
 for(let i=0;i<3;i++){c.fillStyle='#e8e0d0';c.beginPath();c.ellipse(x+w-18+i*0,y+h-12,0,0,0,0,7)}
 R(c,x,y,w,9,'#7a2a1a');R(c,x,y+7,w,2,'#5a1a10');txt(c,'炭烤',x+w/2,y+6.6,'#ffe066','bold 5.6px sans-serif')};
FD.seafood=(c,x,y,w,h)=>{R(c,x+2,y+h,w,3,'rgba(0,0,0,.22)');R(c,x,y,w,h,'#d0d6dc');R(c,x+2,y+2,w-4,h-6,'#eaf6fb');
 for(let i=0;i<10;i++){c.fillStyle='#cfd8dc';c.beginPath();c.ellipse(x+6+(i%5)*((w-10)/5),y+6+Math.floor(i/5)*7,3.6,2.2,0,0,7);c.fill();R(c,x+5+(i%5)*((w-10)/5),y+5+Math.floor(i/5)*7,2,1.2,'#f4ead0')}
 for(let i=0;i<2;i++){c.fillStyle='#d9452f';c.beginPath();c.ellipse(x+10+i*16,y+h-10,5,3.4,0,0,7);c.fill();R(c,x+4+i*16,y+h-12,2,1,'#d9452f');R(c,x+15+i*16,y+h-12,2,1,'#d9452f')}
 R(c,x,y+h-4,w,4,'#9aa0a6');txt(c,'澎湖直送',x+w/2,y-2,'#b3261e','bold 5.6px sans-serif')};
const GR_D={oy:['澎湖烤蚵',220],crab:['炭烤花蟹',480],sk:['烤肉串拼盤',160],sq:['炭烤魷魚',180],beer:['冰啤酒',80]};
function drawDish(g,x,y,k,f,dirty){g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(x+.6,y+1.2,6.4,3,0,0,7);g.fill();g.fillStyle='#fbfbf6';g.beginPath();g.ellipse(x,y,6.4,3.2,0,0,7);g.fill();g.fillStyle='#d8d8d0';g.beginPath();g.ellipse(x,y+.5,4.6,2,0,0,7);g.fill();
 if(dirty){g.fillStyle='#a8a8a0';g.fillRect(x-3,y-1,2,1);g.fillRect(x+1,y,2,1);g.fillStyle='rgba(120,60,20,.6)';g.fillRect(x-1,y-.5,3,1);return}
 const n=Math.ceil(f*4);if(k=='oy')for(let i=0;i<n;i++){g.fillStyle='#9aa4aa';g.beginPath();g.ellipse(x-3+i*2,y-.4+(i%2)*.8,1.8,1.2,0,0,7);g.fill();g.fillStyle='#f4ead0';g.fillRect(x-3.6+i*2,y-1+(i%2)*.8,1.2,.9)}
 else if(k=='crab'){if(f>.05){g.fillStyle='#e0442a';g.beginPath();g.ellipse(x,y-.8,4*Math.max(.4,f),2.2,0,0,7);g.fill();g.fillRect(x-5,y-2,1.4,1);g.fillRect(x+3.6,y-2,1.4,1)}}
 else if(k=='sk')for(let i=0;i<n;i++){g.fillStyle='#d9b080';g.fillRect(x-4,y-1.6+i,8,.6);g.fillStyle=['#8a3a1a','#c0392b','#6a8a2a','#8a3a1a'][i];g.fillRect(x-2,y-2+i,4,1.2)}
 else if(k=='sq'){g.fillStyle='#f0c070';g.fillRect(x-3,y-2,6*Math.max(.3,f),2);g.fillStyle='#c08040';g.fillRect(x-3,y-2,6*Math.max(.3,f),.6)}
 else if(k=='beer'){g.fillStyle='rgba(255,255,255,.8)';g.fillRect(x-1.6,y-6,3.2,5);g.fillStyle='#f0b020';g.fillRect(x-1.2,y-5+4*(1-f),2.4,4*f);g.fillStyle='#fff';g.fillRect(x-1.4,y-6+4*(1-f),2.8,1)}}
(function(){const W=420,H=250,TB=[[110,100],[210,100],[310,100],[110,168],[210,168],[310,168]],TW=44,TH=26,DOOR=[204,232];
def('餐廳',{W,H,f:'#c9a06a',g:'#bb915a',fl:'wood',w:'#5a2a1a',
 fur:[['cgrill',18,30,96,40],['seafood',124,34,60,30],['pass',196,30,90,38],['menu',298,32,28,22],['menu',332,32,28,22],['fridge',372,28,32,44],['counter',326,184,76,18,'#7a4a2a'],['plant',16,200,16,26],['lantern',150,30,0,0],...TB.map(q=>['rtable',q[0],q[1],TW,TH])],
 ppl:[],sp:[['main',326,204,76,12]],title:'🔥 阿香炭烤・澎湖海鮮',
 onEnter:rm=>grillInit(rm,{W,H,TB,TW,TH,DOOR})});})();
function grillInit(rm,C){const h=T.hour,open=h>=11&&h<24,R0=rm;
 const ppl=[pp('阿香',58,78,'#c0392b','#222','',{own:1,dir:0,pose:'chat',L:['我們家的蚵仔是澎湖直送，每天早上第一班飛機送到！','炭火要用龍眼木炭，烤出來才香。','螃蟹今天特別肥，要不要來一隻？'],bub:['炭火正旺！','蚵仔剛到貨喔！','螃蟹肥滋滋～'],lk:GL('elder',511)}),
  pp('收銀員',360,170,'#2f80ed','#222','',{own:1,dir:0,L:['結帳這邊請～','我們有收行動支付喔！'],bub:['謝謝光臨！','歡迎再來～'],lk:GL('student',512)})];
 const wt=pp('服務生',250,80,'#1a1a1a','#3a2a1a','',{own:1,dir:0,L:['請問先生幾位呢？','今天推薦澎湖烤蚵跟炭烤花蟹！','小心燙喔！'],bub:[],lk:GL('office',513),sp:46});
 const bb=pp('收桌阿姨',392,110,'#6a8a5a','#222','',{own:1,dir:2,L:['收桌擦桌，一天下來腰都快斷了。','客人吃得開心我就開心！'],bub:[],lk:GL('elder',514),sp:38});
 ppl.push(wt,bb);rm.ppl=ppl;
 const TBs=C.TB.map((q,i)=>({i,x:q[0],y:q[1],st:'clean',cu:[],tm:0,f:1,dish:[]}));
 if(typeof yjWhere=='function'&&yjWhere()=='餐廳'){TBs[2].st='vip';ppl.push(yjMk(C.TB[2][0]+C.TW,C.TB[2][1]+C.TH/2-6,{sit:1,pose:'chat',dir:2}))}
 // 開門時先放幾桌正在用餐的客人
 if(open)TBs.forEach((tb,i)=>{if(tb.st!='clean')return;if(i%2==0||Math.random()<.4){seatGroup(tb,1+(Math.random()<.6?1:0));tb.st='eat';tb.tm=4+Math.random()*10;tb.dish=tb.cu.map(()=>pickDish());tb.cu.forEach(c=>{c.x=c.sx;c.y=c.sy;c.sit=1;c.dir=c.sd;c.mode='eat'})}});
 function pickDish(){return['oy','crab','sk','sq','oy','sk'][Math.random()*6|0]}
 function seatGroup(tb,n){for(let k=0;k<n;k++){const g=genLook(['office','default','student','elder','default'][Math.random()*5|0],600+Math.floor(Math.random()*400)),left=k==0;
   const c=pp(g.name,C.DOOR[0],C.DOOR[1],'#888','#222','',{own:1,lk:g.lk,L:['澎湖的蚵仔真的好肥！','這螃蟹膏好多！','炭烤的香味真的不一樣。','下次要帶家人一起來。'],sx:left?tb.x-12:tb.x+C.TW,sy:tb.y+C.TH/2-6,sd:left?3:2,tb:tb.i,bub:[]});
   tb.cu.push(c);ppl.push(c)}}
 const say=(n,s,d)=>{n.say={s,u:(R0._tt||0)+(d||2.4)}};
 const mv=(n,x,y,dt)=>{const dx=x-n.x,dy=y-n.y,d=Math.hypot(dx,dy);if(d<1.5){n.mv=false;return true}const v=(n.sp||40)*dt;n.x+=dx/d*Math.min(v,d);n.y+=dy/d*Math.min(v,d);n.mv=true;n.dir=Math.abs(dx)>=Math.abs(dy)*.6?(dx<0?2:3):(dy<0?1:0);n.at=(n.at||0)+dt;if(n.at>.18){n.at=0;n.fr=n.fr^1}return false};
 const path=(n,x,y,dt)=>{// 走道 y=148：先垂直進走道、再水平、最後垂直到目標
   const key=x+','+y;if(n._k!==key){n._k=key;const ay=148;n._wp=Math.abs(n.y-y)<6&&Math.abs(n.y-ay)>20?[[x,y]]:[[n.x,ay],[x,ay],[x,y]]}
   const w=n._wp[0];if(!w)return true;if(mv(n,w[0],w[1],dt)){n._wp.shift();if(!n._wp.length){n.x=x;n.y=y;return true}}return false};
 wt.q=[];bb.q=[];let spawnT=2,last=null;
 rm.animf=(g,t)=>{const dt=last==null?0:Math.min(.1,t-last);last=t;R0._tt=t;
  // 炭火煙
  for(let i=0;i<5;i++){const ph=(t*.6+i*.2)%1;g.fillStyle=`rgba(230,230,230,${.35*(1-ph)})`;g.beginPath();g.arc(30+i*16+Math.sin(t+i)*3,26-ph*18,3+ph*4,0,7);g.fill()}
  // 桌上餐點
  TBs.forEach(tb=>{const cx=tb.x+C.TW/2,cy=tb.y+C.TH/2;if(tb.st=='eat'||tb.st=='served')tb.dish.forEach((k,i)=>{drawDish(g,cx+(i?7:-7),cy-1,k,tb.f);drawDish(g,cx+(i?3:-3),cy+5,'beer',tb.f)});
   if(tb.st=='dirty'||tb.st=='clearing')for(let i=0;i<2;i++)drawDish(g,cx+(i?7:-7),cy,'oy',0,1);
   if(tb.st=='wiping'){for(let i=0;i<4;i++){const a=t*6+i*1.6;g.fillStyle='rgba(255,255,255,.85)';g.fillRect(cx+Math.cos(a)*10,cy+Math.sin(a)*4-1,1.6,1.6)}}});
  if(!dt)return;
  if(!open)return;
  // 新客人上門
  spawnT-=dt;const free=TBs.find(tb=>tb.st=='clean'&&!tb.cu.length);
  if(spawnT<=0&&free&&!wt.q.some(q=>q[0]=='seat')){spawnT=7+Math.random()*7;const n=1+(Math.random()<.55?1:0);seatGroup(free,n);free.st='arrive';free.cu.forEach((c,k)=>{c.x=C.DOOR[0]+k*12;c.y=C.DOOR[1];c.mode='door';c.sit=0;c.dir=1});wt.q.push(['seat',free,n])}
  // 客人移動
  TBs.forEach(tb=>{tb.cu.forEach(c=>{if(c.mode=='walk'){if(path(c,c.sx,c.sy,dt)){c.mode='sit';c.sit=1;c.dir=c.sd}}
    else if(c.mode=='leave'){if(path(c,C.DOOR[0],C.H+14,dt)&&!c.gone){c.gone=1;const i=rm.ppl.indexOf(c);if(i>=0)rm.ppl.splice(i,1);const j=ppl.indexOf(c);if(j>=0)ppl.splice(j,1)}}});
   if(tb.cu.length&&tb.cu.every(c=>c.gone)){tb.cu.forEach(c=>{const i=ppl.indexOf(c);if(i>=0)ppl.splice(i,1);const j=rm.ppl.indexOf(c);if(j>=0)rm.ppl.splice(j,1)});tb.cu=[]}
   if(tb.st=='arrive'&&tb.cu.length&&tb.cu.every(c=>c.mode=='sit')){tb.st='order';wt.q.push(['order',tb])}
   if(tb.st=='eat'){tb.tm-=dt;tb.f=Math.max(0,tb.tm/14);if(Math.random()<dt*.15&&tb.cu[0])say(tb.cu[Math.random()*tb.cu.length|0],['好好吃！','蚵仔超肥！','再來一杯！','這螃蟹讚！'][Math.random()*4|0]);
    if(tb.tm<=0){tb.st='dirty';tb.cu.forEach(c=>{c.mode='leave';c.sit=0;say(c,'吃飽了～謝謝！')});bb.q.push(['clear',tb])}}});
  // 服務生
  const W0=wt.q[0];if(!W0){path(wt,250,80,dt)}else{const tb=W0[1];
   if(W0[0]=='seat'){if(!W0.s){if(path(wt,C.DOOR[0]-16,C.DOOR[1]-14,dt)){W0.s=1;say(wt,'歡迎光臨！請問先生幾位呢？',2.2);W0.tm=1.6}}
    else if(W0.s==1){W0.tm-=dt;if(W0.tm<=0){W0.s=2;say(tb.cu[0],W0[2]+' 位！',1.6);W0.tm=1.2}}
    else if(W0.s==2){W0.tm-=dt;if(W0.tm<=0){W0.s=3;say(wt,'這邊請入座～',2);tb.cu.forEach(c=>c.mode='walk')}}
    else if(path(wt,tb.x+C.TW/2-6,tb.y+C.TH+4,dt))wt.q.shift()}
   else if(W0[0]=='order'){if(!W0.s){if(path(wt,tb.x+C.TW/2-6,tb.y+C.TH+4,dt)){W0.s=1;wt.dir=1;say(wt,'請問要點什麼呢？',1.8);W0.tm=1.8}}
    else if(W0.s==1){W0.tm-=dt;if(W0.tm<=0){W0.s=2;tb.dish=tb.cu.map(()=>pickDish());say(tb.cu[0],GR_D[tb.dish[0]][0]+'，再兩杯啤酒！',1.8);W0.tm=1.8}}
    else{W0.tm-=dt;if(W0.tm<=0){say(wt,'好的，馬上來！',1.4);tb.st='cook';tb.tm=3;wt.q.shift();wt.q.push(['serve',tb])}}}
   else if(W0[0]=='serve'){if(!W0.s){if(path(wt,240,76,dt)){W0.s=1;W0.tm=Math.max(.8,tb.tm);say(wt,'出菜囉～',1)}}
    else if(W0.s==1){W0.tm-=dt;if(W0.tm<=0)W0.s=2}
    else{wt.carry=1;if(path(wt,tb.x+C.TW/2-6,tb.y+C.TH+4,dt)){wt.carry=0;tb.st='eat';tb.tm=14;tb.f=1;say(wt,'餐點來囉，小心燙！請慢用～',2.2);wt.q.shift()}}}}
  if(wt.carry)drawDish(g,wt.x+12,wt.y-14,'crab',1);
  // 收桌阿姨
  const B0=bb.q[0];if(!B0){path(bb,392,110,dt)}else{const tb=B0[1];
   if(!B0.s){if(tb.cu.length==0&&path(bb,tb.x+C.TW/2-6,tb.y+C.TH+4,dt)){B0.s=1;tb.st='clearing';bb.dir=1;say(bb,'我來收拾～',1.8);B0.tm=2}}
   else if(B0.s==1){B0.tm-=dt;if(B0.tm<=0){B0.s=2;tb.st='wiping';say(bb,'擦乾淨囉！',1.8);B0.tm=2}}
   else{B0.tm-=dt;if(B0.tm<=0){tb.st='clean';tb.dish=[];bb.q.shift()}}}}}
SP['餐廳']=()=>Object.keys(GR_D).filter(k=>k!='beer').map(k=>{const d=GR_D[k],fx={oy:{s:22,j:10,h:3,p:1},crab:{s:30,j:16,h:2,l:1},sk:{s:24,j:9},sq:{s:18,j:8}}[k];
  return['🍽️ 內用：'+d[0]+'　$'+d[1],k=='oy'?'澎湖直送・補鋅':k=='crab'?'招牌・膏黃飽滿':'炭火現烤',()=>{if(st.money<d[1])return;st.money-=d[1];fxApply(fx);advance(1);hud();closeDlg();toast('😋 '+d[0]+'烤得香噴噴，太滿足了！')},st.money<d[1]]}).concat([['🍻 冰啤酒　$80','😊+6',()=>{if(st.money<80)return;st.money-=80;fxApply({j:6});hud();closeDlg();toast('🍻 乾杯！')},st.money<80]]);
