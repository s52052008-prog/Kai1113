/* ===== v5.1：第一批修正（健身房動作、拳手、貓咪立繪…） ===== */
// ── 臥推：床椅只畫架子，槓鈴與人由動畫繪製 ──
FD.bpress=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,2.4,'rgba(0,0,0,.28)');RR(c,x+w/2-6,y+4,12,h-4,2,'#3a3a42');R(c,x+w/2-4,y+6,8,h-10,'#14141a');R(c,x+w/2-4,y+h-8,8,3,'#6a6a72');
 [[2],[w-5]].forEach(q=>{R(c,x+q[0],y+1,3,h-10,'#6a7076');R(c,x+q[0]-.6,y+1,4.2,2,'#9aa0a6')})};
function gymLifter(g,x,y,w,h,t,ph,o){const cx=x+w/2,lift=Math.sin(t*2.1+ph)*.5+.5,ry=lift*3.4,E=(a,b,rx,ry2,col)=>{g.fillStyle=col;g.beginPath();g.ellipse(a,b,rx,ry2,0,0,7);g.fill()};
 // 腿（自然岔開、腳踩地）
 R(g,cx-6.4,y+h-8,4.2,9,o.pants);R(g,cx+2.2,y+h-8,4.2,9,o.pants);R(g,cx-7,y+h+.4,5,3,'#f4f4f4');R(g,cx+2,y+h+.4,5,3,'#f4f4f4');
 // 軀幹與頭
 R(g,cx-5.4,y+8,10.8,13,o.shirt);R(g,cx-5.4,y+8,10.8,1.4,'rgba(255,255,255,.3)');R(g,cx-4,y+19,8,3,o.pants);
 E(cx,y+5,3.4,3.6,o.skin);R(g,cx-3.4,y+2,6.8,2.4,o.hair);R(g,cx-1.8,y+4.4,.9,.9,'#222');R(g,cx+1,y+4.4,.9,.9,'#222');R(g,cx-1,y+6.6,2,.7,'#a0402a');
 // 手臂與槓鈴：舉起時槓與板片略放大，營造由下往上推的感覺
 const by=y+3-ry,sc=1+lift*.14;
 [-1,1].forEach(d=>{R(g,cx+d*6.6-1,by+2,2.2,y+10-by-2,o.skin);E(cx+d*6.6,y+10,2.1,1.6,o.skin)});
 R(g,x-3,by,w+6,2.6,'#b8bec4');R(g,x-3,by,w+6,.8,'#e8ecef');
 [[x-2],[x+w-3]].forEach(q=>{g.save();g.translate(q[0]+1.6,by+1.3);g.scale(sc,sc);R(g,-3.4,-6,6.8,12,'#26262c');R(g,-2.4,-5,2,10,'#44444c');R(g,-4.4,-3,1.6,6,'#666');g.restore()});
 if(lift>.9){g.fillStyle='rgba(255,255,255,.7)';g.fillRect(cx+4,y+1,.9,1.6);g.fillRect(cx-5,y+2,.9,1.6)}}
{const G=IN['健身房'];G.ppl=G.ppl.filter(n=>!n.lying);
 const LF=[{p:[232,70,34,24],o:{shirt:'#d9452f',pants:'#222',skin:'#c68642',hair:'#111'},ph:0},{p:[280,70,34,24],o:{shirt:'#2f80ed',pants:'#333',skin:'#e0ac69',hair:'#5a3a1a'},ph:2.3}];
 G.animf=(g,t)=>{LF.forEach(l=>gymLifter(g,l.p[0],l.p[1],l.p[2],l.p[3],t,l.ph,l.o))}}
// ── 擂台戰鬥畫面：改用與全遊戲一致的角色美術 ──
function boxer(c,x,y,f,o){c.save();c.fillStyle='rgba(0,0,0,.32)';c.beginPath();c.ellipse(x,y,16,4,0,0,7);c.fill();
 c.translate(x,y);c.scale(o.sc*1.12,o.sc*1.12);if(o.fall)c.rotate(-o.fall*1.45*f);if(o.lean)c.rotate(-o.lean*f);
 const k=o.k,e=Math.min(1,o.e||0),bob=k=='idle'||k=='guard'?Math.sin(performance.now()/170)*.8:0;c.translate(0,bob);
 const lk={sk:o.sk,hr:o.hr,fm:0,tp:o.tc,bt:o.tc,sh:'#222',ou:'b',bd:1,ac:'',ht:0,hc:'#fff',sho:1,hs:o.ft=='b'?'m':o.ft=='k'?'x':'s'};
 const want=k=='jab'?.35+e*.65:k=='hook'?.2+e*.8:k=='guard'?.12:k=='hit'?.0:.16;
 if(f<0)c.scale(-1,1);
 drawChar(c,{x:-6,y:-8,dir:3,mv:false,fr:0,lk,pose:'punch',ph:Math.asin(Math.min(1,want))/6});
 if(o.fl>0){c.globalAlpha=Math.min(1,o.fl)*.6;c.fillStyle='#fff';c.fillRect(-7,-44,14,46);c.globalAlpha=1}
 c.restore()}
// ── 動物立繪：可愛貓咪／小狗（向量繪製，取代放大的像素小圖）──
function animalPortrait(c,obj){const t=obj.t;if(t!='cat'&&t!='dog')return false;
 const base=obj.c||'#e8a45a',dk=shade(base,-38),md=shade(base,-16),lt=shade(base,34);
 const E=(x,y,rx,ry,col,a)=>{c.globalAlpha=a==null?1:a;c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();c.globalAlpha=1};
 const P=(pts,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();c.fill()};
 const cat=t=='cat';c.save();
 E(84,158,50,12,'rgba(0,0,0,.18)');
 if(cat){c.strokeStyle=md;c.lineWidth=13;c.lineCap='round';c.beginPath();c.moveTo(120,150);c.bezierCurveTo(158,150,160,110,138,98);c.stroke();c.strokeStyle=dk;c.lineWidth=13;c.beginPath();c.moveTo(146,118);c.lineTo(138,98);c.stroke()}
 E(84,138,44,34,base);E(84,142,26,26,'#fff8ee');E(56,158,13,8,base);E(112,158,13,8,base);E(56,160,10,5,'#fff8ee');E(112,160,10,5,'#fff8ee');
 // 耳朵
 if(cat){P([[34,70],[40,20],[78,46]],base);P([[134,70],[128,20],[90,46]],base);P([[43,58],[46,34],[66,48]],'#ffb0c0');P([[125,58],[122,34],[102,48]],'#ffb0c0')}
 else{E(36,78,16,30,dk);E(132,78,16,30,dk);E(36,76,11,24,md);E(132,76,11,24,md)}
 // 頭
 E(84,88,54,46,base);E(84,78,46,30,lt,.35);
 // 花紋
 const pat=obj.pat||'';if(cat){c.fillStyle=dk;[[-12,0],[0,-3],[12,0]].forEach(q=>{c.beginPath();c.moveTo(84+q[0]-3,56);c.lineTo(84+q[0]+3,56);c.lineTo(84+q[0]+q[1]*0,70);c.closePath();c.fill()});if(pat=='spot'||pat=='cal'){E(54,70,13,10,'#3a2a20',.85);E(116,98,12,9,'#fff8ee',.9)}if(pat=='bi'){E(84,100,34,28,'#fff8ee',.9)}}
 // 臉頰毛與口鼻
 E(44,106,14,10,base);E(124,106,14,10,base);E(84,112,22,15,'#fff8ee');
 // 眼睛
 [[62,90],[106,90]].forEach(q=>{E(q[0],q[1],11,13,'#2a1a1a');E(q[0],q[1]+3,9,9,cat?'#3a2a2a':'#4a3020');E(q[0]-3,q[1]-4,4.6,4.8,'#fff');E(q[0]+3.4,q[1]+4,2.2,2.2,'#fff');});
 E(48,108,9,5.6,'#ff8aa8',.55);E(120,108,9,5.6,'#ff8aa8',.55);
 // 鼻與嘴
 if(cat){P([[79,103],[89,103],[84,109]],'#ff7a98')}else{E(84,104,8,6,'#2a1a1a');E(81.6,102.4,2.4,1.6,'#fff')}
 c.strokeStyle='#5a3a30';c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.moveTo(84,109);c.lineTo(84,113);c.moveTo(84,113);c.quadraticCurveTo(77,121,70,114);c.moveTo(84,113);c.quadraticCurveTo(91,121,98,114);c.stroke();
 if(!cat){E(84,124,6,7,'#ff7a98')}
 // 鬍鬚
 if(cat){c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=1.4;[[-1,0],[-1,5],[-1,10]].forEach((q,i)=>{c.beginPath();c.moveTo(60,110+i*4);c.lineTo(28,104+i*7);c.moveTo(108,110+i*4);c.lineTo(140,104+i*7);c.stroke()})}
 // 頭頂高光
 E(70,56,14,5,'rgba(255,255,255,.3)');
 c.restore();return true}
// ── 商店：金錢不足時仍清楚顯示名稱、價格與「金錢不足」──
function shopDlg(title,ids,ex){const o=ids.map(k=>{
  if(k=='bagup'){const bad=st.money<PR[k]||st.cap>=90;return['🎒 大容量背包（+20 格）　💰'+PR[k]+(st.money<PR[k]?'<span class="lack">金錢不足</span>':''),'目前容量 '+st.cap+(st.cap>=90?'（已達上限）':''),()=>{st.money-=PR[k];st.cap+=20;hud();toast('背包容量提升到 '+st.cap);shopDlg(title,ids,ex)},bad]}
  const it=IT[k],lack=st.money<PR[k],full=bagCount()>=st.cap;
  return[`${it.i} ${it.n}　💰${PR[k]}${lack?'<span class="lack">金錢不足</span>':full?'<span class="lack">背包已滿</span>':''}`,`持有 ${st.inv[k]||0}・${it.d}`,()=>{if(!addItem(k,1))return;st.money-=PR[k];hud();toast('購買成功：'+it.n);shopDlg(title,ids,ex)},lack||full]});
 openDlg(title,`你有 💰${st.money}　🎒 ${bagCount()}/${st.cap}`,[...o,...(ex||[]),['離開','',closeDlg]])}
/* v5.1 出口地毯：閃爍光暈＋跳動箭頭 */
function exitGlow(g,W,H,t){const a=.25+.2*Math.sin(t*4),b=Math.sin(t*5)*2;g.fillStyle=`rgba(255,220,90,${a})`;g.fillRect(W/2-38,H-26,76,26);
 g.fillStyle='#ffe066';const ay=H-36+b;g.beginPath();g.moveTo(W/2-6,ay);g.lineTo(W/2+6,ay);g.lineTo(W/2,ay+7);g.fill();g.fillStyle='rgba(0,0,0,.35)';g.fillRect(W/2-2,ay-6,4,6);g.fillStyle='#ffe066';g.fillRect(W/2-1.5,ay-6,3,6)}
