/* v13.24 第二條：頂樓菜園線
   手動：澆水／抓蟲／收成 都變成小遊戲 → 做過才會想買工具 → 最後滴灌、瓢蟲、蔬菜箱訂閱全自動，菜園變成被動收入 */
const GDW={
 water:{n:'澆水',i:'💧',T:[{n:'手提澆水壺',d:'一趟一趟提水上頂樓'},{n:'長水管＋蓮蓬噴頭',p:1200,need:1,pow:2.2,d:'水量大、澆得快'},{n:'定時滴灌系統',p:9000,need:3,auto:1,d:'每週自動澆水，出門也不怕菜渴死'}]},
 bug:{n:'抓蟲',i:'🐛',T:[{n:'徒手抓',d:'戴手套一隻一隻抓'},{n:'防蟲網',p:1500,need:1,d:'長蟲的機率大減'},{n:'瓢蟲天敵＋苦楝油',p:6000,need:2,auto:1,d:'交給瓢蟲巡邏，再也不用抓蟲'}]},
 harv:{n:'收成',i:'🧺',T:[{n:'徒手摘',d:'摘得手很痠'},{n:'採收剪＋竹籃',p:800,need:1,bonus:1,d:'每個菜圃多收 1 份'},{n:'廚餘堆肥桶',p:3500,need:2,bonus:1,comp:1,d:'土變肥了，菜長得更快'},{n:'家宜的蔬菜箱（訂閱）',p:20000,need:3,bonus:1,comp:1,auto:1,d:'自動收成、補種，宅配給小組和鄰居，每週進帳'}]}};
const GDK=Object.keys(GDW);
function gdS(){st.gd=st.gd||{t:{},cnt:{},saved:0,earn:0};const G=st.gd;GDK.forEach(k=>{G.t[k]=G.t[k]||0;G.cnt[k]=G.cnt[k]||0});return G}
const gdTier=k=>GDW[k].T[gdS().t[k]];
const gdAuto=k=>!!gdTier(k).auto;
function gdPct(){const G=gdS();let own=0,tot=0;GDK.forEach(k=>{own+=G.t[k];tot+=GDW[k].T.length-1});let lv=0;try{lv=rnReady('roof')?rnS().roof.lv:0}catch(e){}return (own/tot)*.75+(Math.min(3,lv)/3)*.25}
const gdPlots=()=>{try{return rnS().g.p}catch(e){return[]}};
const gdRipe=P=>P&&P.g>=CROPS[P.c].d;

// ════════ 週末開始：自動化設備上工 ════════
{const _a=wkArrive;wkArrive=function(){let pre=0;try{if(rnReady('roof')&&gdS().t.bug>=2)gdPlots().forEach(P=>{if(P)P.bug=0});if(rnReady('roof')&&gdAuto('water')){const W=wkN();gdPlots().forEach(P=>{if(P&&!gdRipe(P)&&P.w!=W-1){P.w=W-1;pre=1}})}}catch(e){}
 const r=_a.apply(this,arguments);
 try{if(!rnReady('roof'))return r;const G=gdS(),W=wkN(),msg=[];const ps=gdPlots();
  if(pre){G.saved+=.33;msg.push('💧 滴灌系統澆好水了')}
  const bt=G.t.bug;ps.forEach(P=>{if(P&&P.bug&&(bt>=2||(bt==1&&Math.random()<.65)))P.bug=0});if(bt>=2&&ps.some(P=>P)){G.saved+=.33;msg.push('🐞 瓢蟲把菜蟲吃光光')}
  if(gdTier('harv').comp)ps.forEach(P=>{if(P&&P.w==W-1&&!P.bug&&!gdRipe(P)&&Math.random()<.45){P.g++;P.cp=1}});
  if(gdAuto('harv')){let money=0,got=[];const c=cal(),gh=rnS().roof.lv>=2;ps.forEach((P,i)=>{if(!gdRipe(P))return;const C=CROPS[P.c],n=C.y+1,m=Math.round(n*C.p*1.2);money+=m;got.push(C.ic+C.n+'×'+n);
    addItem('veg_'+P.c,1);if((gh||C.s.includes(c.s))&&st.money>=C.seed){st.money-=C.seed;ps[i]={c:P.c,g:0,w:-1,bug:0}}else ps[i]=null});
   if(got.length){st.money+=money;G.earn+=money;G.saved+=.5;msg.push(`📦 蔬菜箱寄出：${got.join('、')}，進帳 💰${money.toLocaleString('en-US')}（自己留 ${got.length} 份）`)}}
  if(msg.length)setTimeout(()=>whenFree(()=>{toast('🌱 頂樓菜園：'+msg.join('；'));try{hud();hwPanel()}catch(e){}}),2500);
  SVDIRTY=1;if(scene=='家6F')rnRefresh()}catch(e){console.error(e)}return r}}

// ════════ 菜園小遊戲 ════════
function gdImg(c,P){try{let k=CROPIMG[c];if(P){const s2=P.g/CROPS[P.c].d;k=s2>=1?k:P.g==0?1:s2<.5?2:3}const im=UAI['pk47_'+k];if(im&&im.naturalWidth)return im}catch(e){}return null}
function gdGame(kind,done){const T=gdTier(kind),pow=T.pow||1,M=mgBox({water:'💧 澆水（'+T.n+'）',bug:'🐛 抓菜蟲（'+T.n+'）',harv:'🧺 收成（'+T.n+'）'}[kind]),g=M.g,W2=720,H2=520;
 const ps=gdPlots(),W=wkN();let fin=false,combo=0,last=0,miss=0,fx=[],t0=performance.now();
 const idx=ps.map((P,i)=>i).filter(i=>ps[i]&&(kind=='water'?!gdRipe(ps[i])&&ps[i].w!=W:kind=='harv'?gdRipe(ps[i]):true));
 const n=Math.max(1,idx.length),bw=Math.min(150,600/n),gap=(W2-bw*n)/(n+1);
 const box=idx.map((i,j)=>({i,x:gap+j*(bw+gap),y:200,w:bw,h:150,m:10+Math.random()*25,P:ps[i]}));
 const pos=e=>{const r=M.cv.getBoundingClientRect();return[(e.clientX-r.left)*W2/r.width,(e.clientY-r.top)*H2/r.height]};
 const finish=perfect=>{if(fin)return;fin=true;window.__kbBlock=performance.now()+1700;setTimeout(()=>{M.end();OVK.delete(kd);OVKU.delete(ku);done({perfect})},800)};
 // 澆水：按住倒水，水位停在綠色區間；倒太多會淹水
 let cur=0,pour=false,flood=0,floodT=0;
 // 抓蟲
 const bugs=[];let caught=0,spawn=0;const NEED=kind=='bug'?12:0;
 // 收成：一顆一顆冒出來
 const veg=[];let picked=0;if(kind=='harv'){box.forEach(b=>{const C=CROPS[b.P.c],k=C.y+(T.bonus||0);for(let q=0;q<k;q++)veg.push({b,c:b.P.c,x:b.x+20+Math.random()*(b.w-40),y:b.y+30+Math.random()*(b.h-60),s:0,dl:q*.12+Math.random()*.3,got:0})})}
 const hit=(x,y)=>{if(fin)return;const now=performance.now();combo=now-last<450?combo+1:1;last=now;
  if(kind=='bug'){const b=bugs.find(q=>!q.dead&&(x==null||Math.hypot(q.x-x,q.y-y)<26));if(!b){combo=0;return}b.dead=1;caught++;fx.push({x:b.x,y:b.y,t:0,s:'💥'});if(caught>=NEED)finish(miss==0)}
  else if(kind=='harv'){const v=veg.find(q=>!q.got&&q.s>=1&&(x==null||Math.hypot(q.x-x,q.y-y)<34));if(!v){combo=0;return}v.got=1;picked++;fx.push({x:v.x,y:v.y,t:0,s:'+1',fly:1});if(picked>=veg.length)finish(true)}};
 const kd=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();if(kind=='water')pour=true;else if(!e.repeat)hit()}else if(kind=='water'&&(e.key=='ArrowRight'||e.key=='ArrowLeft')){cur=(cur+(e.key=='ArrowRight'?1:box.length-1))%box.length}else if(e.key=='Escape'&&!fin){fin=true;M.end();OVK.delete(kd);OVKU.delete(ku)}},
  ku=e=>{if(e.key==' '||e.key=='Enter')pour=false};OVK.add(kd);OVKU.add(ku);
 M.cv.addEventListener('pointerdown',e=>{const [x,y]=pos(e);if(kind=='water'){const j=box.findIndex(b=>x>b.x-10&&x<b.x+b.w+10&&y>b.y-80&&y<b.y+b.h+60);if(j>=0){cur=j;pour=true}}else hit(x,y)});
 addEventListener('pointerup',()=>pour=false);
 M.tip.innerHTML={water:'<b>按住</b>菜圃（或空白鍵）倒水，水位停在 <b style="color:#2a9a4a">綠色區間</b> 就放開；倒太多會淹水！←→ 換菜圃',bug:'菜蟲爬出來了！<b>點牠</b>（或空白鍵）抓起來，別讓牠鑽回土裡',harv:'菜長好了！<b>點一下</b>（或狂按空白鍵）摘下來丟進籃子'}[kind];
 let lt=performance.now();
 const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);OVKU.delete(ku);return}const dt=Math.min(.05,(now-lt)/1000);lt=now;
  // 天空＋頂樓地板
  const sky=g.createLinearGradient(0,0,0,H2);sky.addColorStop(0,'#bfe3ff');sky.addColorStop(.45,'#e9f6ff');sky.addColorStop(.46,'#cdb89a');sky.addColorStop(1,'#b59e7e');g.fillStyle=sky;g.fillRect(0,0,W2,H2);
  g.fillStyle='rgba(255,255,255,.7)';[[120,70],[420,50],[600,95]].forEach(c=>{g.beginPath();g.ellipse(c[0]+Math.sin(now/3000+c[0])*10,c[1],46,14,0,0,7);g.fill()});
  box.forEach((b,j)=>{const P=b.P,C=CROPS[P.c],im=gdImg(P.c);
   g.fillStyle='#7a4a26';g.fillRect(b.x-6,b.y+b.h-40,b.w+12,52);g.fillStyle=kind=='water'?`rgb(${110-b.m*.5},${72-b.m*.3},${40-b.m*.15})`:'#5a3a20';g.fillRect(b.x,b.y+b.h-34,b.w,38);
   if(im&&kind!='harv'){const s=Math.min(b.w,110),h=s*im.naturalHeight/im.naturalWidth;g.globalAlpha=P.bug&&kind=='bug'?.85:1;g.drawImage(im,b.x+(b.w-s)/2,b.y+b.h-20-h,s,h);g.globalAlpha=1}
   else if(kind!='harv'){g.font='54px sans-serif';g.textAlign='center';g.fillText(C.ic,b.x+b.w/2,b.y+b.h-40)}
   g.fillStyle='#3a2410';g.font='bold 15px sans-serif';g.textAlign='center';g.fillText(C.n,b.x+b.w/2,b.y+b.h+30);
   if(kind=='water'){const mx=b.x+b.w/2-12,my=b.y-120,mh=100;g.fillStyle='#fff';g.fillRect(mx,my,24,mh);g.fillStyle='rgba(60,200,100,.35)';g.fillRect(mx,my+mh*(1-.85),24,mh*.25);
    g.fillStyle=b.m>100?'#e2412f':b.m>=60?'#3ca0f0':'#7fc6ff';g.fillRect(mx+3,my+mh*(1-Math.min(1,b.m/100)),18,mh*Math.min(1,b.m/100));g.strokeStyle='#3a2410';g.lineWidth=2;g.strokeRect(mx,my,24,mh);
    if(b.m>=60&&b.m<=85){g.fillStyle='#2a9a4a';g.font='bold 16px sans-serif';g.fillText('✓',mx+12,my-6)}
    if(j==cur){g.strokeStyle='#ff9a2a';g.lineWidth=3;g.setLineDash([8,6]);g.strokeRect(b.x-10,b.y-130,b.w+20,b.h+170);g.setLineDash([])}}});
  if(kind=='water'&&!fin&&box.length){const b=box[cur];if(floodT>0)floodT-=dt;else if(pour){b.m+=dt*38*pow;for(let q=0;q<3;q++)fx.push({x:b.x+b.w/2+(Math.random()-.5)*b.w*.6,y:b.y+20,t:0,s:'drop',vy:200+Math.random()*120})
    if(b.m>100){b.m=40;flood++;floodT=.7;pour=false;fx.push({x:b.x+b.w/2,y:b.y,t:0,s:'💦 淹水了！'})}}
   else if(b.m>=60&&b.m<=85){const nx=box.findIndex(q=>q.m<60);if(nx>=0&&nx!=cur&&!pour)cur=nx}
   // 壺／水管
   g.save();g.translate(box[cur].x+box[cur].w/2+46,box[cur].y-30);g.rotate(pour?-.6:-.15);g.font='46px sans-serif';g.textAlign='center';g.fillText(gdS().t.water?'🚿':'🪣',0,0);g.restore();
   if(!pour&&box.every(q=>q.m>=60&&q.m<=85))finish(flood==0)}
  if(kind=='bug'&&!fin){spawn-=dt;if(spawn<=0&&bugs.filter(q=>!q.dead&&!q.gone).length<4&&caught+bugs.filter(q=>!q.dead&&!q.gone).length<NEED+miss){spawn=.5+Math.random()*.5;const b=box[(Math.random()*box.length)|0];bugs.push({x:b.x+20+Math.random()*(b.w-40),y:b.y+b.h-30,vx:(Math.random()-.5)*60,vy:-30-Math.random()*40,t:0,life:3.2})}
   bugs.forEach(q=>{if(q.dead||q.gone)return;q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt+Math.sin(q.t*8)*.6;if(q.t>q.life){q.gone=1;miss++;fx.push({x:q.x,y:q.y,t:0,s:'溜走了…'})}
    g.fillStyle='#4a8a2a';for(let s=0;s<5;s++){g.beginPath();g.arc(q.x-s*6*Math.sign(q.vx||1),q.y+Math.sin(q.t*10+s)*2,7-s*.6,0,7);g.fill()}g.fillStyle='#1a1a1a';g.beginPath();g.arc(q.x+3*Math.sign(q.vx||1),q.y-2,2,0,7);g.fill();
    if(q.t>q.life-.8){g.globalAlpha=.5;g.fillStyle='#e2412f';g.fillRect(q.x-12,q.y-16,24*(1-(q.t-(q.life-.8))/.8),3);g.globalAlpha=1}})}
  if(kind=='harv'){veg.forEach(v=>{if(v.dl>0){v.dl-=dt;return}if(v.got){return}v.s=Math.min(1,v.s+dt*4);const im=gdImg(v.c),sz=46*v.s+Math.sin(now/200+v.x)*2;
    if(im){const h=sz*im.naturalHeight/im.naturalWidth;g.drawImage(im,v.x-sz/2,v.y-h/2,sz,h)}else{g.font=(sz|0)+'px sans-serif';g.textAlign='center';g.fillText(CROPS[v.c].ic,v.x,v.y+sz/3)}
    if(v.s>=1){g.fillStyle='rgba(255,230,120,.9)';g.font='12px sans-serif';g.fillText('✨',v.x+18,v.y-16)}});
   g.font='54px sans-serif';g.textAlign='center';g.fillText('🧺',W2/2,H2-30);g.fillStyle='#3a2410';g.font='bold 18px sans-serif';g.fillText(`${picked} / ${veg.length}`,W2/2+60,H2-40)}
  // 特效
  for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;if(f.s=='drop'){f.y+=f.vy*dt;if(f.t>.35){fx.splice(i,1);continue}g.fillStyle='rgba(80,160,255,.8)';g.fillRect(f.x,f.y,3,7);continue}
   if(f.t>.9){fx.splice(i,1);continue}g.globalAlpha=1-f.t/.9;g.textAlign='center';
   if(f.fly){const k=f.t/.9;g.fillStyle='#2a9a4a';g.font='bold 22px sans-serif';g.fillText('+1',f.x+(W2/2-f.x)*k,f.y+(H2-60-f.y)*k)}else{g.fillStyle='#c0392b';g.font='bold 22px sans-serif';g.fillText(f.s,f.x,f.y-f.t*40)}g.globalAlpha=1}
  // 進度條
  const pr=kind=='water'?box.filter(q=>q.m>=60&&q.m<=85).length/Math.max(1,box.length):kind=='bug'?caught/NEED:picked/Math.max(1,veg.length);
  g.fillStyle='rgba(0,0,0,.25)';g.fillRect(60,24,600,24);g.fillStyle=pr>=1?'#3cc46a':'#3d9cf0';g.fillRect(63,27,594*pr,18);g.fillStyle='#fff';g.font='bold 16px sans-serif';g.textAlign='center';
  g.fillText(kind=='water'?`澆好 ${box.filter(q=>q.m>=60&&q.m<=85).length} / ${box.length} 塊菜圃${flood?`　💦淹水 ${flood} 次`:''}`:kind=='bug'?`抓到 ${caught} / ${NEED} 隻${miss?`　溜走 ${miss}`:''}`:`${Math.round(pr*100)}%`,360,42);
  if(combo>3&&now-last<600){g.fillStyle='#ff8a3a';g.font='bold 26px sans-serif';g.fillText('COMBO ×'+combo,360,90)}
  if(fin){g.fillStyle='rgba(255,255,255,.55)';g.fillRect(0,0,W2,H2);g.fillStyle='#2a8a4a';g.font='bold 50px sans-serif';g.fillText({water:'💧 喝飽飽！',bug:'🐛 一隻不剩！',harv:'🧺 大豐收！'}[kind],360,290)}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

// ════════ 把菜園選單的按鈕換成小遊戲＋加入工具店 ════════
{const _gm=gardenMenu;gardenMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(Array.isArray(opts)&&/頂樓菜園/.test(t)){const G=gdS();
  const sw=(re,kind)=>{const i=opts.findIndex(q=>typeof q[0]=='string'&&re.test(q[0]));if(i<0)return;const f0=opts[i][2];
   if(gdAuto(kind)&&kind!='harv'){opts[i]=[`${GDW[kind].i} ${GDW[kind].n}`,`🤖 ${gdTier(kind).n}每週自動處理`,()=>{},true];return}
   opts[i]=[opts[i][0]+'（小遊戲）',opts[i][1],()=>{closeDlg();const ripe=gdPlots().map(P=>gdRipe(P)?P.c:null).filter(Boolean);gdGame(kind,res=>{G.cnt[kind]++;if(res.perfect)fxApply({j:3});f0&&f0();
     if(kind=='harv'&&gdTier('harv').bonus&&ripe.length){ripe.forEach(c=>addItem('veg_'+c,1));setTimeout(()=>toast(`✂️ ${gdTier('harv').n}多收了 ${ripe.length} 份！`),300)}
     const nx=GDW[kind].T[G.t[kind]+1];if(nx&&G.cnt[kind]==nx.need)setTimeout(()=>toast(`💡 菜園的「🛒 園藝資材」現在可以買「${nx.n}」了！`),1200);try{hwPanel()}catch(e){}})},opts[i][3]]};
  sw(/^💧 澆水/,'water');sw(/^🐛 抓蟲/,'bug');sw(/^🧺 收成/,'harv');
  const li=opts.findIndex(q=>q[0]=='離開');opts.splice(li<0?opts.length:li,0,['🛒 園藝資材',`菜園自動化 ${Math.round(gdPct()*100)}%・水管、防蟲網、滴灌、蔬菜箱……`,()=>gdShop()]);
  if(G.earn)d+=`<br><span style="font-size:12px;opacity:.75">📦 蔬菜箱累計進帳 💰${G.earn.toLocaleString('en-US')}</span>`}}catch(e){console.error(e)}return od.call(this,t,d,opts,...r)};try{return _gm.apply(this,arguments)}finally{openDlg=od}}}
function gdShop(back){const G=gdS(),o=[];GDK.forEach(k=>{const C=GDW[k],nx=C.T[G.t[k]+1];if(!nx)return o.push([`${C.i} ${C.n}：${gdTier(k).n}`,'✅ 已經是最高級了',()=>{},true]);
  const lock=G.cnt[k]<nx.need;o.push([`${C.i} ${nx.n}　💰${nx.p.toLocaleString('en-US')}`,lock?`🔒 先自己${C.n} ${nx.need} 次才會想買（${G.cnt[k]}/${nx.need}）`:nx.d+(nx.auto?'・🤖 每週自動':''),()=>{if(st.money<nx.p)return toast('錢不夠');st.money-=nx.p;G.t[k]++;hud();SVDIRTY=1;try{hwPanel()}catch(e){}closeDlg();
   const yj=typeof yjS=='function'&&yjS().wed;openDlg(`🎉 ${nx.n} 裝好了！`,`${nx.d}。<br>${nx.auto?'<b>🤖 從下個週末開始自動運作</b>，省下來的時間可以陪家宜。':''}${k=='harv'&&nx.auto?(yj?'<br><br>家宜設計了一張可愛的蔬菜箱貼紙：「冠宏＆家宜的頂樓小農 🌱」':'<br><br>小組的姊妹們第一個訂了！'):''}<br><br>🌱 菜園自動化：${Math.round(gdPct()*100)}%`,[['太讚了！','',closeDlg]])},lock||st.money<nx.p])});
 openDlg('🛒 園藝資材'+`（💰${st.money.toLocaleString('en-US')}）`,'自己做過才知道哪裡累。工具買了，週末就多出時間！',o.concat([['返回','',back||(()=>scene=='家6F'?gardenMenu():closeDlg())]]))}
// 農夫伯也賣
{const _f=farmerMenu;farmerMenu=function(n,line){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(Array.isArray(opts)&&/🌾/.test(t)){const i=opts.findIndex(q=>q[0]=='離開');opts.splice(i<0?opts.length:i,0,['🛒 跟農夫伯買園藝資材','水管、防蟲網、滴灌……他都有門路',()=>gdShop(()=>farmerMenu(n,line))])}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _f.apply(this,arguments)}finally{openDlg=od}}}

// ════════ 家的藍圖：加上「菜園」分頁 ════════
{const s=document.createElement('style');s.textContent=`#hwP .tb{display:flex;gap:3px;padding:4px 6px 0}#hwP .tb b{flex:1;text-align:center;padding:2px 0;border-radius:6px 6px 0 0;background:#e8d6b0;cursor:pointer;font-weight:normal}#hwP .tb b.on{background:#ffd98a;font-weight:900}#hwP.min .tb{display:none}
#hwP .pl{display:flex;gap:3px;margin-top:3px}#hwP .pl div{flex:1;text-align:center;background:#efe2c4;border-radius:5px;padding:2px 0 3px;cursor:pointer}#hwP .pl div.rp{background:#ffe9a8}#hwP .pl .mini{height:4px;margin:2px 4px 0;background:#d9c49a;border-radius:2px;overflow:hidden}#hwP .pl .mini i{display:block;height:100%;background:#5ab83a}`;document.head.appendChild(s)}
let hwTab='hw';try{hwTab=localStorage.getItem('pxHwTab')||'hw'}catch(e){}
function gdPanelHTML(){const G=gdS();let ready=false;try{ready=rnReady('roof')}catch(e){}
 if(!ready){let s=0;try{s=rnStage('roof')}catch(e){}return `<div class="rw">🏚️ 頂樓陽台還沒整理好<br><span style="opacity:.75">到 6F 頂樓：清理 → 修繕 → 建設，就能開始種菜</span>${hwBar(s/3,'#8ac24a')}</div>`}
 const ps=gdPlots(),W=wkN(),dry=ps.filter(P=>P&&!gdRipe(P)&&P.w!=W).length,bug=ps.filter(P=>P&&P.bug).length,ripe=ps.filter(gdRipe).length;
 const nb=(()=>{let b=null;GDK.forEach(k=>{const nx=GDW[k].T[G.t[k]+1];if(!nx)return;const sc=(G.cnt[k]>=nx.need?0:1e6)+nx.p;if(!b||sc<b.sc)b={k,nx,sc}});return b})();
 const pc=Math.round(gdPct()*100);
 return `<div class="rw">🌱 菜圃 ${ripe?`<b style="color:#c07a00">✨ ${ripe} 塊可以收成</b>`:''}<div class="pl">${ps.map((P,i)=>{if(!P)return`<div data-gd="${i}" title="空的">🟫<div class="mini"><i style="width:0"></i></div></div>`;const C=CROPS[P.c];return`<div data-gd="${i}" class="${gdRipe(P)?'rp':''}" title="${C.n}">${C.ic}${P.bug?'🐛':''}${!gdRipe(P)&&P.w!=W?'💧':''}<div class="mini"><i style="width:${Math.min(100,P.g/C.d*100)}%"></i></div></div>`}).join('')}</div></div>
  <div class="rw">💧 本週照顧：${dry?`還有 ${dry} 塊要澆水`:'水都澆好了 ✓'}${bug?`、${bug} 塊有蟲`:''}</div>
  ${nb?`<div class="rw">🎯 下一個目標：${nb.nx.n}<br><span style="opacity:.75">${G.cnt[nb.k]<nb.nx.need?`再自己${GDW[nb.k].n} ${nb.nx.need-G.cnt[nb.k]} 次解鎖`:`💰${Math.min(st.money,nb.nx.p).toLocaleString('en-US')} / ${nb.nx.p.toLocaleString('en-US')}`}</span>${hwBar(G.cnt[nb.k]<nb.nx.need?G.cnt[nb.k]/nb.nx.need:st.money/nb.nx.p,'#c98af0')}</div>`:'<div class="rw">🎉 菜園全自動化！</div>'}
  <div class="rw">🤖 菜園自動化 <b>${pc}%</b>${hwBar(pc/100,'#5ab83a')}</div>
  <div style="opacity:.7;margin-top:3px">📦 蔬菜箱進帳 💰${G.earn.toLocaleString('en-US')}・省下 ${G.saved.toFixed(1)} 小時</div>`}
{const _hp=hwPanel;hwPanel=function(){_hp.apply(this,arguments);try{if(hwEl.style.display=='none')return;const hd=hwEl.querySelector('.hd');if(!hd)return;
 hd.insertAdjacentHTML('afterend',`<div class="tb"><b data-tab="hw" class="${hwTab=='hw'?'on':''}">🧺 家事</b><b data-tab="gd" class="${hwTab=='gd'?'on':''}">🌱 菜園</b></div>`);
 if(hwTab=='gd'){const bd=hwEl.querySelector('.bd'),last=bd&&[...bd.querySelectorAll('.rw')].find(x=>/家園完成度/.test(x.textContent));if(bd)bd.innerHTML=gdPanelHTML()+(last?last.outerHTML:'')}}catch(e){console.error(e)}}}
hwEl.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(t){e.stopPropagation();hwTab=t.dataset.tab;try{localStorage.setItem('pxHwTab',hwTab)}catch(er){}hwPanel();return}
 const p=e.target.closest('[data-gd]');if(p){e.stopPropagation();if(scene=='家6F')gardenMenu();else toast('🌱 到 6F 頂樓菜園才能照顧菜喔')}},true);

// 小遊戲結束後短暫擋住按鍵，避免狂按空白鍵誤點到後面的對話框
addEventListener('keydown',e=>{if(!window.OVL&&performance.now()<(window.__kbBlock||0)&&(e.key==' '||e.key=='Enter')){e.stopImmediatePropagation();e.preventDefault()}},true);
