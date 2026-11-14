/* v13.3 老房子維修事件：颱風天頂樓漏水、浴室旁壁癌、電器太多會跳電、熱水器加熱棒壞掉
   每個問題都可以：自己 DIY（小遊戲・省錢・可能失敗）／叫師傅（花錢・穩）／找朋友幫忙；存夠錢就能「根治」，從此不再發生 */
const ohS=()=>{const o=st.oh||(st.oh={});['roof','wall','elec','heat'].forEach(k=>o[k]=o[k]||{seen:0,fix:0});return o};
const OHF={roof:{n:'頂樓加蓋漏水',ic:'🌀',fix:'鐵皮屋頂翻新＋防水塗層',cost:45000,h:6,bef:'每到颱風天，頂樓加蓋就滴滴答答漏水，要拿水桶接一整晚',aft:'屋頂重新鋪過、上了防水塗層<br>颱風天也能安心睡覺'},
 wall:{n:'浴室旁的壁癌',ic:'🦠',fix:'打掉重做＋浴室牆面防水',cost:28000,h:6,bef:'浴室旁的牆一直長壁癌，刮掉沒多久又長回來，空氣也不好',aft:'牆面打到見底重新防水<br>壁癌再也不會回來'},
 elec:{n:'電器用太多會跳電',ic:'⚡',fix:'重新拉電線＋換新電箱（無熔絲開關）',cost:22000,h:5,bef:'冷氣、熱水器、電鍋一起開就跳電，晚上常常摸黑去扳電箱',aft:'舊電線全部換新、加大迴路<br>電器一起開也不會跳電'},
 heat:{n:'熱水器加熱棒壞掉',ic:'🚿',fix:'換一台新的熱水器',cost:18000,h:3,bef:'老熱水器的加熱棒動不動就壞，洗到一半變冷水',aft:'新熱水器出水穩定<br>每次洗澡都是熱的（洗澡心情 +2）'}};
const OHK=['roof','wall','elec','heat'],ohName=k=>OHF[k].ic+' '+OHF[k].n,ohMoney=n=>'💰'+n.toLocaleString('en-US');
const ohHome=()=>scene=='家'||scene=='家6F';
const ohZL=()=>{try{return FRS('zheliang').met}catch(e){return false}};
// ───────── 家樂福：五金耗材 ─────────
GRIT.push(['g_rod','🔩','熱水器加熱棒（替換用）',1200,'熱水器加熱棒壞了可以自己換。記得先關電！'],['g_mold','🧽','壁癌處理組',650,'刮刀、除霉劑、防水漆。可以自己處理壁癌（治標）。']);
['g_rod','g_mold'].forEach(k=>{const q=GRIT.find(q=>q[0]==k);IT[k]={n:q[2],i:q[1],p:Math.round(q[3]*.3),d:q[4],u:'keep'}});
{const _o=grOwned;grOwned=function(k){if(k=='g_rod'||k=='g_mold')return false;return _o.apply(this,arguments)}}

// ═════════ 小遊戲 ═════════
function ohHoldBtns(M,list){M.bt.innerHTML='';list.forEach(q=>{const b=document.createElement('button');b.textContent=q[0];b.style.cssText='font:inherit;font-size:15px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:8px 14px;cursor:pointer;min-width:64px;touch-action:none;user-select:none';
 if(q[2]){b.onpointerdown=e=>{e.preventDefault();q[1](1)};['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>q[1](0)))}else b.onclick=q[1];M.bt.appendChild(b)})}
// ① 颱風漏水：移動水桶接水
function ohLeakGame(cb){const M=mgBox('🌀 颱風夜・頂樓加蓋漏水了！'),g=M.g,W2=720,H2=520,LK=[120,260,430,600].map(x=>({x,r:.6+Math.random()*.8}));
 const S={t:-2.5,bx:360,tx:null,L:0,Rt:0,drops:[],sp:0,got:0,miss:0,pud:LK.map(()=>0),done:false,flash:0,end:26};
 const cvR=()=>M.cv.getBoundingClientRect();M.cv.addEventListener('pointermove',e=>{const r=cvR();S.tx=(e.clientX-r.left)*W2/r.width});M.cv.addEventListener('pointerdown',e=>{const r=cvR();S.tx=(e.clientX-r.left)*W2/r.width});
 const kd=e=>{const k=e.key.toLowerCase();if(k=='a'||k=='arrowleft'){S.L=1;S.tx=null;e.preventDefault()}else if(k=='d'||k=='arrowright'){S.Rt=1;S.tx=null;e.preventDefault()}else if(k=='escape')fin()};
 const ku=e=>{const k=e.key.toLowerCase();if(k=='a'||k=='arrowleft')S.L=0;if(k=='d'||k=='arrowright')S.Rt=0};OVK.add(kd);OVKU.add(ku);
 ohHoldBtns(M,[['⬅ 左',v=>{S.L=v;S.tx=null},1],['右 ➡',v=>{S.Rt=v;S.tx=null},1]]);M.tip.textContent='A／D 或滑鼠、手指左右移動水桶，把漏下來的水接住！';
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);const tot=S.got+S.miss,rate=tot?S.got/tot:1;
  setTimeout(()=>{M.end();cb(rate,S.got,S.miss)},900)};
 let last=performance.now();const loop=now=>{if(S.done&&S.t>S.end+1)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;
  if(!S.done&&S.t>=0){const v=560;if(S.tx!=null)S.bx+=Math.max(-v*dt,Math.min(v*dt,S.tx-S.bx));else S.bx+=(S.Rt-S.L)*v*dt;S.bx=Math.max(50,Math.min(W2-50,S.bx));
   S.sp-=dt;if(S.sp<=0&&S.t<S.end-1.2){const q=LK[Math.random()*LK.length|0];S.drops.push({x:q.x+(Math.random()-.5)*10,y:70,v:200+Math.random()*90+S.t*6,li:LK.indexOf(q)});S.sp=Math.max(.32,.95-S.t*.025)*(.7+Math.random()*.5)}
   S.drops.forEach(d=>{d.y+=d.v*dt;if(!d.hit&&d.y>=420&&d.y<448&&Math.abs(d.x-S.bx)<46){d.hit=1;S.got++}else if(!d.hit&&d.y>=478){d.hit=2;S.miss++;S.pud[d.li]=Math.min(1,S.pud[d.li]+.12)}});S.drops=S.drops.filter(d=>!d.hit);
   if(Math.random()<dt*.18)S.flash=.25;if(S.t>=S.end)fin()}
  S.flash=Math.max(0,S.flash-dt);
  // 畫面
  g.fillStyle='#3a2e24';g.fillRect(0,0,W2,H2);g.fillStyle='#5a4a3a';g.fillRect(0,0,W2,64);for(let i=0;i<W2;i+=36){g.fillStyle=i%72?'#6a5a48':'#544434';g.fillRect(i,0,34,64)}
  g.fillStyle='#4a6a5a';LK.forEach(q=>{g.beginPath();g.ellipse(q.x,62,22,8,0,0,7);g.fill()});
  g.fillStyle='#8a6a42';g.fillRect(0,478,W2,42);for(let i=0;i<W2;i+=60){g.fillStyle='#7a5a34';g.fillRect(i,478,2,42)}
  S.pud.forEach((v,i)=>{if(v>0){g.fillStyle='rgba(120,170,220,.55)';g.beginPath();g.ellipse(LK[i].x,492,30+v*60,6+v*8,0,0,7);g.fill()}});
  S.drops.forEach(d=>{g.fillStyle='#bfe4ff';g.beginPath();g.moveTo(d.x,d.y-20);g.quadraticCurveTo(d.x+11,d.y,d.x,d.y+9);g.quadraticCurveTo(d.x-11,d.y,d.x,d.y-20);g.fill();g.fillStyle='#fff';g.fillRect(d.x-3,d.y-4,3,5)});
  // 水桶
  const bx=S.bx;g.fillStyle='#2f6fd0';g.beginPath();g.moveTo(bx-44,420);g.lineTo(bx+44,420);g.lineTo(bx+34,476);g.lineTo(bx-34,476);g.fill();g.fillStyle='#5a9aff';g.fillRect(bx-44,418,88,6);g.strokeStyle='#ccc';g.lineWidth=3;g.beginPath();g.arc(bx,420,40,Math.PI,0);g.stroke();
  const fill=Math.min(1,S.got/40);g.fillStyle='rgba(150,210,255,.8)';g.fillRect(bx-38+fill*4,474-fill*48,76-fill*8,fill*48);
  if(S.flash>0){g.fillStyle=`rgba(255,255,255,${S.flash*1.6})`;g.fillRect(0,0,W2,H2)}
  mgTxt(g,`接到 ${S.got}　漏掉 ${S.miss}`,20,100,'bold 22px sans-serif','#fff6dc','left');mgTxt(g,`⏱ ${Math.max(0,Math.ceil(S.end-S.t))}`,W2-20,100,'bold 22px sans-serif','#fff6dc','right');
  if(S.t<0)mgTxt(g,'窗外風雨好大……準備！',W2/2,260,'bold 34px sans-serif','#ffe68a');
  if(S.done){const tot=S.got+S.miss,r=tot?S.got/tot:1;mgTxt(g,r>=.7?'💪 撐過去了！':'💦 地上淹了一片……',W2/2,260,'bold 38px sans-serif',r>=.7?'#9effa8':'#ffb0a0')}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ② 壁癌：刮掉霉斑
function ohScrapeGame(cb){const M=mgBox('🦠 刮除壁癌'),g=M.g,W2=720,H2=520,B=[];for(let i=0;i<14;i++)B.push({x:80+Math.random()*560,y:90+Math.random()*300,r:22+Math.random()*20,hp:3,cd:0});
 const S={t:-1.5,cx:360,cy:260,done:false,end:22,sc:0,dn:false,fl:[]};
 const hitAt=(x,y)=>{if(S.done||S.t<0)return;B.forEach(b=>{if(b.hp>0&&b.cd<=0&&Math.hypot(b.x-x,b.y-y)<b.r+10){b.hp--;b.cd=.1;for(let i=0;i<4;i++)S.fl.push({x,y,vx:(Math.random()-.5)*160,vy:-Math.random()*120,t:0})}})};
 const pos=e=>{const r=M.cv.getBoundingClientRect();return[(e.clientX-r.left)*W2/r.width,(e.clientY-r.top)*H2/r.height]};
 M.cv.addEventListener('pointerdown',e=>{S.dn=true;const[x,y]=pos(e);S.cx=x;S.cy=y;hitAt(x,y)});M.cv.addEventListener('pointermove',e=>{const[x,y]=pos(e);S.cx=x;S.cy=y;if(S.dn)hitAt(x,y)});addEventListener('pointerup',()=>S.dn=false);
 const K={};const kd=e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','arrowup','arrowdown','a','d','w','s'].includes(k)){K[k]=1;e.preventDefault()}if(k==' '){e.preventDefault();hitAt(S.cx,S.cy)}if(k=='escape')fin()};const ku=e=>{K[e.key.toLowerCase()]=0};OVK.add(kd);OVKU.add(ku);
 M.tip.textContent='用滑鼠／手指在黑黑的霉斑上來回刮（鍵盤：方向鍵移動刮刀、空白鍵刮）。每塊要刮 3 下！';mgBtn(M,[['放棄',()=>fin()]]);
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);const r=B.filter(b=>b.hp<=0).length/B.length;setTimeout(()=>{M.end();cb(r)},1100)};
 let last=performance.now();const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;
  if(!S.done){const v=380*dt;S.cx+=((K.arrowright||K.d)?v:0)-((K.arrowleft||K.a)?v:0);S.cy+=((K.arrowdown||K.s)?v:0)-((K.arrowup||K.w)?v:0);S.cx=Math.max(20,Math.min(W2-20,S.cx));S.cy=Math.max(60,Math.min(H2-40,S.cy));
   B.forEach(b=>b.cd-=dt);if(S.t>=S.end||B.every(b=>b.hp<=0))fin()}
  g.fillStyle='#e8e0cc';g.fillRect(0,0,W2,H2);g.fillStyle='#d8ceb4';for(let y=0;y<H2;y+=40)g.fillRect(0,y,W2,1);
  g.fillStyle='#9ab0c0';g.fillRect(0,H2-60,W2,60);mgTxt(g,'← 浴室',60,H2-22,'bold 18px sans-serif','#4a6070','left');
  B.forEach(b=>{if(b.hp<=0){g.fillStyle='rgba(200,190,160,.6)';g.beginPath();g.arc(b.x,b.y,b.r*.8,0,7);g.fill();return}const a=b.hp/3;g.fillStyle=`rgba(60,70,50,${.35+a*.45})`;g.beginPath();g.ellipse(b.x,b.y,b.r,b.r*.8,0,0,7);g.fill();g.fillStyle=`rgba(30,40,25,${a*.6})`;for(let i=0;i<5;i++){g.beginPath();g.arc(b.x+Math.cos(i*1.3)*b.r*.5,b.y+Math.sin(i*1.7)*b.r*.4,b.r*.25,0,7);g.fill()}});
  S.fl=S.fl.filter(f=>(f.t+=dt)<.6);S.fl.forEach(f=>{f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=400*dt;g.fillStyle='#7a6a4a';g.fillRect(f.x,f.y,4,4)});
  // 刮刀
  g.save();g.translate(S.cx,S.cy);g.rotate(-.5);g.fillStyle='#c8ccd0';g.fillRect(-16,-4,32,8);g.fillStyle='#8a5a2e';g.fillRect(-4,4,8,26);g.restore();
  const n=B.filter(b=>b.hp<=0).length;mgTxt(g,`刮掉 ${n}/${B.length}`,20,40,'bold 22px sans-serif','#5a3417','left');mgTxt(g,`⏱ ${Math.max(0,Math.ceil(S.end-S.t))}`,W2-20,40,'bold 22px sans-serif','#5a3417','right');
  if(S.t<0)mgTxt(g,'戴好口罩……開始刮！',W2/2,260,'bold 32px sans-serif','#5a3417');
  if(S.done){const r=n/B.length;mgTxt(g,r>=.8?'✨ 刮乾淨了，上防水漆！':'😣 還有好多沒刮掉……',W2/2,260,'bold 32px sans-serif',r>=.8?'#2f7a3a':'#b5532f')}
  if(!S.done||S.t<S.end+3)requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ③ 電箱：先關電器，再把跳下來的開關扳回去
function ohBreakerGame(cb){const M=mgBox('⚡ 門口的電箱'),g=M.g,W2=720,H2=520,N=8,tr=Math.random()*N|0,LB=['客廳','廚房','冷氣','浴室熱水器','主臥','書房','頂樓加蓋','電鍋插座'];
 const S={un:0,on:Array(N).fill(1),msg:'手電筒照過去……有一個開關跳下來了。',mx:360,my:260,tries:0,done:false,ok:0};S.on[tr]=0;
 const flip=i=>{if(S.done)return;if(S.on[i]){S.msg=`「${LB[i]}」這個本來就是開著的。`;return}S.tries++;
  if(!S.un){S.on[i]=1;S.msg='扳上去……「啪！」又跳下來了！負載太大，要先把一些電器關掉。';setTimeout(()=>{S.on[i]=0},350);return}
  S.on[i]=1;S.msg='「喀」一聲，燈全亮了！';S.ok=1;S.done=true;OVK.delete(kd);setTimeout(()=>{M.end();cb(true,S.tries)},1100)};
 const unplug=()=>{if(S.un)return;S.un=1;S.msg='你把冷氣、電熱水器、電鍋都先關掉了。現在把跳下來的開關扳回去！'};
 const kd=e=>{const n=+e.key;if(n>=1&&n<=N){e.preventDefault();flip(n-1)}else if(e.key=='u'||e.key=='U'||e.key==' '){e.preventDefault();unplug()}else if(e.key=='Escape'){S.done=true;OVK.delete(kd);M.end();cb(false,S.tries)}};OVK.add(kd);
 const pos=e=>{const r=M.cv.getBoundingClientRect();return[(e.clientX-r.left)*W2/r.width,(e.clientY-r.top)*H2/r.height]};
 M.cv.addEventListener('pointermove',e=>{[S.mx,S.my]=pos(e)});M.cv.addEventListener('pointerdown',e=>{[S.mx,S.my]=pos(e);for(let i=0;i<N;i++){const x=110+(i%4)*150,y=150+Math.floor(i/4)*170;if(Math.abs(S.mx-x)<50&&Math.abs(S.my-y)<70)flip(i)}});
 mgBtn(M,[['🔌 先關掉幾個電器（空白鍵）',unplug],['先不管它',()=>{S.done=true;OVK.delete(kd);M.end();cb(false,S.tries)}]]);M.tip.textContent='點跳下來的開關（或按數字 1–8）。提示：電器太多同時開才會跳電。';
 const loop=()=>{g.fillStyle='#0c0a08';g.fillRect(0,0,W2,H2);g.fillStyle='#4a4a50';g.fillRect(40,60,640,400);g.fillStyle='#3a3a40';g.fillRect(50,70,620,380);
  for(let i=0;i<N;i++){const x=110+(i%4)*150,y=150+Math.floor(i/4)*170;g.fillStyle='#ddd';g.fillRect(x-40,y-60,80,120);g.fillStyle='#bbb';g.fillRect(x-14,y-40,28,80);g.fillStyle=S.on[i]?'#2a2a2a':'#d33';g.fillRect(x-12,S.on[i]?y-38:y+2,24,36);mgTxt(g,(i+1)+'',x-30,y-44,'bold 16px sans-serif','#333','left');mgTxt(g,LB[i],x,y+82,'bold 15px sans-serif','#e8e0cc')}
  const r=g.createRadialGradient(S.mx,S.my,30,S.mx,S.my,230);r.addColorStop(0,'rgba(0,0,0,0)');r.addColorStop(1,'rgba(0,0,0,.88)');g.fillStyle=r;g.fillRect(0,0,W2,H2);
  g.fillStyle='rgba(20,12,6,.85)';g.fillRect(0,H2-54,W2,54);mgTxt(g,S.msg,W2/2,H2-20,'bold 18px sans-serif',S.ok?'#9effa8':'#ffe68a');
  if(!S.done||S.ok)requestAnimationFrame(loop)};loop()}
// ④ 換加熱棒：照正確順序
const ROD=['🔌 關掉熱水器電源','🚰 關冷水進水閥','💧 打開洩壓閥把水排掉','🔧 拆下舊的加熱棒','🔩 裝上新的加熱棒','🚿 打開進水閥注滿水','⚡ 再打開電源'];
function ohRodGame(cb){const M=mgBox('🔧 自己換熱水器加熱棒'),g=M.g,W2=720,H2=520,S={i:0,err:0,msg:'照正確的順序操作。安全第一！',done:false,shock:0};
 const pick=j=>{if(S.done)return;if(j==S.i){S.i++;S.msg='✔ '+ROD[j].slice(2);if(S.i>=ROD.length){S.done=true;S.msg='🔥 熱水器「嗡——」地開始加熱了！';draw();setTimeout(()=>{M.end();cb(true,S.err)},1200)}else draw();return}
  S.err++;if(S.i==0&&j!=0){S.shock=1;fxApply({h:-5});S.msg='⚡ 啊！被電到麻了一下……一定要先關電！（❤️ -5）'}
  else if(j==6&&S.i<6){S.msg='🔥 還沒注水就通電——差點乾燒！趕快關掉。'}else S.msg='🤔 順序好像不對……';
  if(S.err>=3){S.done=true;S.msg='😵 搞不定……還是叫師傅好了。';draw();setTimeout(()=>{M.end();cb(false,S.err)},1300)}else draw()};
 const order=ROD.map((_,i)=>i).sort(()=>Math.random()-.5);mgBtn(M,order.map(j=>[ROD[j],()=>pick(j)]));M.tip.textContent='按照正確的順序點按鈕。錯 3 次就失敗。';
 const draw=()=>{g.fillStyle='#e8e0cc';g.fillRect(0,0,W2,H2);g.fillStyle='#f4f6f8';g.fillRect(260,40,200,300);g.strokeStyle='#888';g.lineWidth=3;g.strokeRect(260,40,200,300);g.fillStyle='#ccd';g.fillRect(300,340,20,60);g.fillRect(400,340,20,60);
  g.fillStyle=S.i>=7?'#ff8a3a':S.i>=5?'#9ad0ff':S.i>=3?'#ddd':'#9ad0ff';g.fillRect(270,50+(S.i>=3&&S.i<5?280:0),180,S.i>=3&&S.i<5?10:280);g.fillStyle=S.i==4?'#888':'#a86a3a';if(S.i!=3)g.fillRect(340,250,40,80);
  mgTxt(g,'電熱水器',360,30,'bold 18px sans-serif','#5a3417');ROD.forEach((t,i)=>mgTxt(g,(i<S.i?'✅ ':'⬜ ')+(i<S.i?t.slice(2):'？？？'),24,80+i*34,'15px sans-serif',i<S.i?'#2f7a3a':'#8a7a5a','left'));
  mgTxt(g,S.msg,W2/2,470,'bold 18px sans-serif',S.shock&&S.err?'#b5532f':'#5a3417');mgTxt(g,'錯誤 '+S.err+'/3',W2-20,30,'bold 16px sans-serif','#b5532f','right')};draw()}

// ═════════ 事件 ═════════
function ohDone(k){const O=ohS()[k];return O.fix}
function ohFixCard(k){const F=OHF[k];growCard('老屋改造：'+F.n+' 根治！','師傅忙了一整天，'+F.fix+'完成。'+(gwWed()?'<br>家宜摸摸新牆、開開水龍頭：「這才像我們的家。」':''),F.bef,F.aft,()=>{if(OHK.every(q=>ohS()[q].fix)&&!ohS().allFix){ohS().allFix=1;fxApply({j:20});growCard('老房子重生了','颱風天不漏水、牆面乾乾淨淨、電器一起開也不跳電、每天都有熱水。<br>這間三十多年的老公寓，終於被你們一點一點修成了「家」。','一間住了三十年、到處小毛病的老公寓','每個角落都修好了的家<br>😊 +20')}})}
function ohFix(k,disc){const F=OHF[k],c=Math.round(F.cost*(disc||1));if(st.money<c)return toast('錢不夠，還要 '+ohMoney(c-st.money));st.money-=c;ohS()[k].fix=1;ohS()[k].broken=0;if(k=='elec')ohS().elec.dark=0;advance(F.h);hud();SVDIRTY=1;closeDlg();ohFixCard(k)}
// 老屋問題總覽（床邊、手機）
function ohMenu(){const O=ohS(),ks=OHK.filter(k=>O[k].seen);if(!ks.length)return openDlg('🏚️ 老屋健檢','目前還沒發現什麼大問題。<br>不過三十多年的老房子……總會有些小毛病的。',[['好','',closeDlg]]);
 openDlg('🏚️ 老屋健檢',`已經發現 ${ks.length} 個問題，根治了 ${ks.filter(k=>O[k].fix).length} 個。<br><span style="font-size:12px;opacity:.8">DIY 和臨時修理都是治標；存夠錢請師傅「根治」，就再也不會發生。</span>`,
  ks.map(k=>{const F=OHF[k],disc=k=='roof'&&O.roof.zl?.8:1,c=Math.round(F.cost*disc);return O[k].fix?[`✅ ${ohName(k)}`,'已根治：'+F.fix,()=>{},1]:[`🔧 根治 ${ohName(k)}（${ohMoney(c)}）`,F.fix+(disc<1?'（小朱介紹的師傅打 8 折）':'')+'・約 '+F.h+' 小時',()=>ohFix(k,disc),st.money<c]}).concat([['關閉','',closeDlg]]))}
{const _oh=openHome;openHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(Array.isArray(opts)&&/床/.test(t)){const O=ohS(),n=OHK.filter(k=>O[k].seen&&!O[k].fix).length;if(OHK.some(k=>O[k].seen))opts.splice(Math.max(0,opts.length-1),0,['🏚️ 老屋健檢'+(n?`（${n} 個問題）`:'（全部修好了）'),'漏水、壁癌、跳電、熱水器',ohMenu])}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _oh.apply(this,arguments)}finally{openDlg=od}}}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)&&OHK.some(k=>ohS()[k].seen)){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i<0?opts.length:i,0,['🏚️ 老屋健檢','',ohMenu,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}

// ── ① 颱風天頂樓漏水（7–10 月，起大風或每週機率） ──
function ohRoofEvent(){const O=ohS().roof,first=!O.seen;O.seen=1;O.w=wkN();SVDIRTY=1;const w=gwWed(),o=[];
 o.push(['🪣 拿水桶、臉盆接水（小遊戲）','自己撐過今晚・免費・1.5 小時',()=>{closeDlg();ohLeakGame(r=>{advance(1.5);if(r>=.7){fxApply({j:4});hud();openDlg('🪣 撐過一夜','天亮了，風雨停了。地上只有幾灘水，擦一擦就好。<br><span style="font-size:12px;opacity:.8">（下次颱風還是會漏……存錢根治吧）</span>',[['累死了……','',closeDlg]])}
  else{const c=3000;payOut(c);fxApply({j:-10});hud();openDlg('💦 淹水了','和室的榻榻米泡水了，只好拿出去曬、換掉兩塊。<br>💸 -3,000　😊 -10',[['唉……','',closeDlg]])}})}]);
 if(ohZL())o.push(['📞 打給小朱（高空作業的專家）','好感 +6・他會幫你介紹師傅（根治打 8 折）',()=>{O.zl=1;frAdd('zheliang',6);advance(1.5);hud();closeDlg();openDlg('🧗 小朱來了','半小時後，小朱穿著雨衣、背著工具出現在門口：「交給我！我每天都在三十樓外面吊，這個小意思啦。」<br>他爬上頂樓，用帆布和防水膠帶把破洞先封起來。<br>「你這個鐵皮屋頂太老了啦，我認識做屋頂的師傅，叫他算你便宜一點！」<br><br>💚 小朱好感 +6　🏚️ 根治費用打 8 折',[['兄弟，謝啦！','',closeDlg]])}]);
 o.push(['📞 叫師傅緊急處理（💰3,000）','穩・今晚就不漏了（治標）',()=>{payOut(3000);advance(1);hud();closeDlg();toast('🔧 師傅冒著風雨上頂樓補了破洞。「這個屋頂要整個翻新啦！」')},st.money+st.bank<3000]);
 openDlg('🌀 颱風來了！',(first?'窗外的風呼呼地吹，雨打在鐵皮屋頂上像打鼓一樣。<br>突然——「滴、滴、滴……」<br>':'又是颱風天……「滴、滴、滴……」<br>')+'<b>頂樓加蓋在漏水！</b>水從天花板的接縫滴下來，地上已經積了一小灘。'+(w?'<br>家宜抱著臉盆衝上樓：「老公！快來幫忙！」':''),o)}
// ── ② 浴室旁的壁癌（越來越大，影響健康） ──
const ohWallLv=()=>{const O=ohS().wall;if(!O.seen||O.fix)return 0;return Math.max(0,Math.min(3,Math.floor((wkN()-(O.since||0))/2)))};
function ohWallEvent(){const O=ohS().wall;O.seen=1;O.since=wkN()-2;SVDIRTY=1;
 openDlg('🦠 牆上那是什麼？','你經過書房，發現浴室隔壁那面牆的底部，冒出一片黑黑綠綠的斑點，摸起來粉粉的，油漆都膨起來了。<br>'+(gwWed()?'家宜皺眉：「是壁癌啦！浴室的水氣滲過來了，放著會越長越大，空氣也不好。」':'是壁癌。浴室的水氣滲過來，放著會越長越大，空氣也會變差。')+'<br><br>🧽 <b>治標</b>：家樂福買「壁癌處理組」（💰650）自己刮掉、上防水漆（過一陣子會長回來）<br>🔧 <b>根治</b>：請師傅打掉重做、做牆面防水（💰28,000）',[['記下來','',closeDlg]])}
function ohWallMenu(){const O=ohS().wall,lv=ohWallLv(),has=(st.inv.g_mold||0)>0;
 openDlg('🦠 浴室旁的壁癌',`壁癌程度：${['乾乾淨淨','一小片','一大片','整面牆都是'][lv]}${lv>=2?'<br><span style="color:#b5532f">😷 空氣很差，每天睡醒健康 -'+(lv-1)*2+'</span>':''}`,
  [['🧽 自己刮除＋上防水漆（小遊戲・1 小時）',has?'用掉 1 組壁癌處理組':'先到家樂福「🏠 家電・寢具」買壁癌處理組（💰650）',()=>{st.inv.g_mold--;closeDlg();ohScrapeGame(r=>{advance(1);if(r>=.8){O.since=wkN()+2;fxApply({j:5});toast('✨ 牆面乾淨了！（大概可以撐一個多月）')}else{O.since=Math.max(O.since||0,wkN()-1);toast('😣 刮得不夠乾淨，很快又會長回來')}hud();SVDIRTY=1})},!has||lv==0],
   ['🔧 請師傅根治（💰28,000）','打掉重做、浴室牆面防水',()=>ohFix('wall'),st.money<28000],['離開','',closeDlg]])}
// ── ③ 跳電（晚上同時開太多電器） ──
function ohTrip(what,auto){const O=ohS().elec,first=!O.seen;O.seen=1;O.dark=1;O.n=(O.n||0)+1;O.d=dKey();SVDIRTY=1;closeDlg();
 openDlg('⚡ 啪——！',(auto?what+'——「啪！」整間屋子突然一片漆黑。<br>':'你'+what+'，整間屋子突然一片漆黑。<br>')+(first?'冷氣停了、電視黑了，連冰箱都安靜下來。<br>':'')+'<b>又跳電了！</b>老房子的電線太舊，電器一起開就撐不住。<br>'+(gwWed()?'黑暗中傳來家宜的聲音：「老公～去門口電箱看一下啦！」<br>':'')+'<br>📍 去<b>門口旁邊的電箱</b>把開關扳回來。',[['拿手機照明，去電箱','',closeDlg]])}
function ohBreaker(){const O=ohS().elec;if(!O.dark)return openDlg('⚡ 電箱','老舊的電箱，裡面的開關有些已經泛黃了。'+(O.fix?'<br>（已經換成新的無熔絲開關，再也不跳電了）':O.seen?'<br><span style="font-size:12px;opacity:.8">電器太多同時開還是會跳電。根治：重新拉電線、換新電箱（💰22,000）</span>':''),[['🔧 請師傅根治（💰22,000）','',()=>ohFix('elec'),!O.seen||O.fix||st.money<22000],['離開','',closeDlg]]);
 openDlg('⚡ 電箱（跳電中）','手機的手電筒照著電箱……',[['🔦 自己扳開關（小遊戲）','',()=>{closeDlg();ohBreakerGame(ok=>{if(ok){O.dark=0;hud();toast('💡 燈亮了！')}else toast('還是一片黑……')})}],['🔧 請師傅根治（💰22,000）','重新拉電線、換新電箱：再也不跳電',()=>ohFix('elec'),st.money<22000],['離開','',closeDlg]])}
// ── ④ 熱水器加熱棒壞掉（洗澡時） ──
function ohHeatMenu(first,cont){const go=()=>{closeDlg();if(cont)setTimeout(cont,60)};const O=ohS().heat,has=(st.inv.g_rod||0)>0;
 openDlg(first?'🥶 冷、冷、冷！':'🚿 熱水器壞了',(first?'洗到一半，熱水突然變成冰水！你整個人跳起來。<br>打開熱水器的蓋子一看——<b>加熱棒燒壞了</b>，表面都是黑黑的水垢。<br><br>':'熱水器的加熱棒壞了，現在只有冷水。<br><br>')+'🔩 <b>自己換</b>：家樂福「🏠 家電・寢具」買加熱棒（💰1,200）<br>📞 <b>叫師傅換</b>：💰3,500<br>🔧 <b>根治</b>：換一台新熱水器（💰18,000）',
  [['🔩 自己換加熱棒（小遊戲・1 小時）',has?'用掉 1 支加熱棒':'還沒買加熱棒',()=>{closeDlg();ohRodGame(ok=>{advance(1);if(ok){st.inv.g_rod--;O.broken=0;O.rw=wkN();fxApply({j:6});toast('🔥 自己換好了！又有熱水了')}else toast('😵 沒換成功……加熱棒還在，下次再試或叫師傅');hud();SVDIRTY=1})},!has],
   ['📞 叫師傅換加熱棒（💰3,500）','',()=>{payOut(3500);O.broken=0;O.rw=wkN();advance(1);hud();closeDlg();toast('🔧 師傅換好了：「這台熱水器很老了，下次可能又壞喔。」')},st.money+st.bank<3500],
   ['🔧 根治：換新熱水器（💰18,000）','再也不會壞・洗澡心情 +2',()=>ohFix('heat'),st.money<18000],
   ['🥶 先洗冷水澡就好','😊 -6 ❤️ -2',()=>{fxApply({j:-6,h:-2});advance(.3);hud();go();toast('🥶 好冰！一邊洗一邊發抖……')}],[cont?'😴 先去睡覺，明天再處理':'離開','',go]])}

// ═════════ 觸發 ═════════
const ohAPP={cook:'打開電鍋煮飯',tv:'打開電視',wash:'按下洗衣機開關',tub:'打開電熱水器'};
{const _ha=homeAct;homeAct=function(k){try{const E=ohS().elec,H=ohS().heat;
 if(E.dark&&ohAPP[k])return toast('⚡ 停電中……先去門口的電箱把開關扳回來');
 if(k=='tub'&&!H.fix){if(H.broken)return ohHeatMenu(false);if(wkN()>=3&&(H.rw||0)<=wkN()-4&&Math.random()<.14){H.seen=1;H.broken=1;SVDIRTY=1;fxApply({j:-6});hud();return ohHeatMenu(true)}}
 if(ohAPP[k]&&!E.fix&&!E.dark&&T.hour>=18&&E.d!=dKey()&&wkN()>=2&&Math.random()<(E.seen?.16:.3))return ohTrip(ohAPP[k]);
 if(k=='tub'&&H.fix){const od=openDlg;openDlg=function(t2,d,opts,...r){if(Array.isArray(opts)&&opts[0]&&typeof opts[0][2]=='function'&&!/離開/.test(opts[0][0])){const f0=opts[0][2];opts[0]=[opts[0][0],(opts[0][1]||'')+'　🔥 新熱水器 😊+2',()=>{f0();fxApply({j:2});hud()},opts[0][3]]}return od.call(this,t2,d,opts,...r)};try{return _ha.apply(this,arguments)}finally{openDlg=od}}}catch(e){console.error(e)}return _ha.apply(this,arguments)}}
setInterval(()=>{try{if(window.TITLE||!dlg.hidden||MG||!ohHome())return;const O=ohS(),W=wkN(),mo=cal().mo;
 // 颱風：7–10 月；大風一定漏、不然每週一次 35% 機率
 if(!O.roof.fix&&mo>=7&&mo<=10&&O.roof.w!=W&&O.roof.ck!=W+'-'+(T.hour|0)){O.roof.ck=W+'-'+(T.hour|0);if(wx()==3||(O.roof.roll!=W&&(O.roof.roll=W,Math.random()<.35)))return ohRoofEvent()}
 // 壁癌：回家第 3 次後在書房發現
 if(!O.wall.seen&&scene=='家'&&(gwS().stair||0)>=3&&p.y>560&&p.x<230)return ohWallEvent()}catch(e){}},2500);
// 睡醒：壁癌影響健康
{const _w=wakeTo6;wakeTo6=function(){const f0=!!st._fainting,r=_w.apply(this,arguments);try{const lv=ohWallLv();if(!f0&&lv>=2){fxApply({h:-(lv-1)*2});setTimeout(()=>toast('😷 浴室旁的壁癌越來越大，空氣好差……（❤️ -'+(lv-1)*2+'）'),3200)}}catch(e){}return r}}

// ═════════ 家裡的畫面：電箱、壁癌、停電 ═════════
setInterval(()=>{try{if(scene!='家'||!rm||rm._oh)return;rm._oh=1;rm.sp.push(['breaker',448,178,40,10],['mold',20,566,180,10]);rm.spl=rm.spl||{};rm.spf=rm.spf||{};rm.spl.breaker='電箱';rm.spl.mold='壁癌';rm.spf.breaker=ohBreaker;rm.spf.mold=()=>{if(!ohS().wall.seen||ohS().wall.fix)return toast('牆面乾乾淨淨。');ohWallMenu()};
 const af=rm.animf;rm.animf=function(c,t){if(af)af.apply(this,arguments);try{
  // 電箱
  R(c,447,158,9,15,'#8a8a90');R(c,448,159,7,13,'#b8b8be');R(c,449,161,5,1,'#555');R(c,449,164,5,1,'#555');R(c,449,167,5,1,ohS().elec.dark?'#d33':'#555');
  // 壁癌
  const lv=ohWallLv();if(lv>0){const rr=orn(77);for(let i=0;i<lv*6;i++){const x=24+rr()*170,y=556+rr()*14,s=3+rr()*(4+lv*2);c.fillStyle=`rgba(${50+rr()*20},${60+rr()*20},${40},${.35+lv*.12})`;c.beginPath();c.ellipse(x,y,s,s*.6,0,0,7);c.fill()}}}catch(e){}}}catch(e){}},300);
{const _di=drawIn;drawIn=function(){_di.apply(this,arguments);try{if(!ohS().elec.dark||!ohHome())return;g.setTransform(K,0,0,K,0,0);
 const ox=rm.W<=W?Math.round((W-rm.W)/2):-Math.round(clamp(p.x+6-W/2,0,rm.W-W)),oy=rm.H<=H?Math.round((H-rm.H)/2):-Math.round(clamp(p.y+4-H/2,0,rm.H-H)),px=ox+p.x+6,py=oy+p.y-4;
 const r=g.createRadialGradient(px,py,14,px,py,70);r.addColorStop(0,'rgba(5,5,15,0)');r.addColorStop(1,'rgba(5,5,15,.9)');g.fillStyle=r;g.fillRect(0,0,W,H);
 R(g,W/2-90,6,180,14,'rgba(0,0,0,.7)');txt(g,'⚡ 跳電了！去門口旁邊的電箱',W/2,16,'#ffe68a','bold 9px sans-serif')}catch(e){}}}

// ═════════ 合理化：這些事會自己發生，不用主角特地去洗澡、開電器 ═════════
// 睡前洗澡：每天按「睡覺」時，主角會先洗個澡 → 熱水器的問題在這裡出現
{const _gs=goSleep;goSleep=function(){const a=arguments,self=this,go=()=>_gs.apply(self,a);try{const H=ohS().heat;if(st._bedSh==dKey())return go();st._bedSh=dKey();
 if(!H.fix){if(H.broken){fxApply({j:-4});hud();toast('🥶 熱水器還沒修，睡前只能洗冷水澡……（😊 -4）');return go()}
  if(wkN()>=3&&(H.rw||0)<=wkN()-4&&Math.random()<.15){H.seen=1;H.broken=1;SVDIRTY=1;fxApply({j:-6});hud();closeDlg();return ohHeatMenu(true,go)}}
 else{fxApply({j:2});hud();setTimeout(()=>toast('🛁 睡前洗了個熱水澡，好舒服（😊 +2）'),200)}}catch(e){console.error(e)}return go()}}
// 晚上在家：家裡的電器本來就會開著（夏天冷氣、電鍋煮飯、熱水器燒洗澡水）→ 每天傍晚有機率跳電
setInterval(()=>{try{if(window.TITLE||!dlg.hidden||MG||!ohHome())return;const E=ohS().elec,k=dKey();if(E.fix||E.dark||E.d==k||E.roll==k||wkN()<2||T.hour<18||T.hour>=23)return;E.roll=k;
 const mo=cal().mo,hot=mo>=6&&mo<=9,ch=(hot?.45:.2)*(E.seen?.8:1.2);if(Math.random()>=ch)return;const w=gwWed();
 const why=hot?(w?'家宜開了冷氣、電鍋在煮飯、熱水器在燒洗澡水，你正想打開電視':'冷氣開著、電鍋在煮飯、熱水器在燒洗澡水，你正想打開電視'):(w?'家宜用電鍋煮飯、熱水器在燒洗澡水、洗衣機也在轉，她又插上了吹風機':'電鍋在煮飯、熱水器在燒洗澡水、洗衣機也在轉，你又插上了電暖器');
 ohTrip(why,1)}catch(e){}},4000);
