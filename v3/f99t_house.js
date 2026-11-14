/* v13.23 時間沙漏＋家務自動化線＋家的藍圖（進度條）
   核心：週末時間是最稀缺的資源。手動做家事很累很花時間 → 賺錢升級設備 → 家事自動完成、省下時間 */

// ════════ 1. 時間沙漏（畫面最上方）════════
const WKTOT=67; // 週五 12:00 → 週一 07:00
{const s=document.createElement('style');s.textContent=`#hg{position:absolute;left:50%;top:4px;transform:translateX(-50%);z-index:30;display:flex;align-items:center;gap:6px;padding:3px 10px 3px 6px;border-radius:12px;background:rgba(255,246,220,.92);border:2px solid #6b4423;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;zoom:var(--vf,1);font-family:"Cubic11",sans-serif;font-synthesis:none}
#hg canvas{width:20px;height:30px;image-rendering:pixelated}#hg .t{font-size:12px;color:#3a2410;line-height:1.2;white-space:nowrap}#hg .b{width:84px;height:6px;border-radius:3px;background:#e2d2b0;overflow:hidden;margin-top:2px}#hg .b i{display:block;height:100%;border-radius:3px;transition:width .5s,background .5s}
#hg.low{animation:hgBl 1s steps(2) infinite}@keyframes hgBl{50%{box-shadow:0 0 0 3px rgba(231,76,60,.7),0 2px 8px rgba(0,0,0,.25)}}`;document.head.appendChild(s)}
const hgEl=document.createElement('div');hgEl.id='hg';hgEl.title='週末剩下的時間';hgEl.innerHTML='<canvas width="10" height="15"></canvas><div><div class="t"></div><div class="b"><i></i></div></div>';(document.getElementById('wrap')||document.body).appendChild(hgEl);
const hgC=hgEl.querySelector('canvas').getContext('2d');
function hgCol(f){return f>.5?'#3d9cf0':f>.25?'#f0a830':'#e2412f'}
function hgDraw(f,t){const x=hgC,col=hgCol(f);x.clearRect(0,0,10,15);
 x.fillStyle='#6b4423';x.fillRect(0,0,10,1);x.fillRect(0,14,10,1);x.fillStyle='rgba(200,230,255,.55)';
 const G=['.########.','.#......#.','..#....#..','...#..#...','....##....','...#..#...','..#....#..','.#......#.','.########.'];
 // 玻璃輪廓
 x.fillStyle='#8a6a4a';[[1,1],[8,1],[1,2],[8,2],[2,3],[7,3],[2,4],[7,4],[3,5],[6,5],[4,6],[5,6],[4,7],[5,7],[4,8],[5,8],[3,9],[6,9],[2,10],[7,10],[2,11],[7,11],[1,12],[8,12],[1,13],[8,13]].forEach(q=>x.fillRect(q[0],q[1],1,1));
 // 上半部的沙（剩下的時間）
 x.fillStyle=col;const top=[[2,2,6],[3,3,4],[3,4,4],[4,5,2],[4,6,2]],nTop=Math.round(f*top.length);for(let i=0;i<nTop;i++){const q=top[top.length-1-i];x.fillRect(q[0],q[1],q[2],1)}
 // 下半部的沙（用掉的時間）
 const bot=[[2,13,6],[2,12,6],[3,11,4],[3,10,4],[4,9,2]],nBot=Math.round((1-f)*bot.length);for(let i=0;i<nBot;i++){const q=bot[i];x.fillRect(q[0],q[1],q[2],1)}
 // 落下的沙
 if(f>0&&Math.floor(t/250)%2==0)x.fillRect(4,7+Math.floor(t/120)%2,1,1);else if(f>0)x.fillRect(5,8,1,1)}
function hgTick(){try{const show=!window.TITLE&&typeof wkIn=='function'&&wkIn();hgEl.style.display=show?'flex':'none';if(!show)return;const h=wkLeft(),f=Math.max(0,Math.min(1,h/WKTOT));
 hgEl.querySelector('.t').innerHTML=`週末還剩 <b>${Math.floor(h)}</b> 小時`;const b=hgEl.querySelector('.b i');b.style.width=(f*100)+'%';b.style.background=hgCol(f);hgEl.classList.toggle('low',f<.1);hgDraw(f,performance.now())}catch(e){}}
setInterval(hgTick,250);
hgEl.addEventListener('click',()=>{try{if(dlg.hidden)questView()}catch(e){}});

// ════════ 2. 家務線 ════════
const HWD={
 dish:{n:'洗碗',i:'🍽️',h:.75,s:8,mg:'dish',T:[{n:'手洗',d:'一個一個刷'},{n:'強力菜瓜布＋濃縮洗碗精',p:300,need:2,pow:1.7,tm:.7,d:'刷得更快、更省時間'},{n:'洗碗機',p:15000,need:5,auto:1,d:'碗丟進去，按個鈕就好'}]},
 laundry:{n:'洗衣服',i:'👕',h:1,s:10,mg:'laundry',T:[{n:'手洗＋手擰',d:'衣服好多……手好痠'},{n:'直立式洗衣機',p:8000,need:2,pow:2,tm:.45,d:'只剩晾衣服要自己來'},{n:'洗脫烘滾筒',p:26000,need:5,auto:1,d:'洗好就是乾的，連晾都不用'}]},
 clean:{n:'打掃',i:'🧹',h:.75,s:10,mg:'clean',T:[{n:'掃把＋拖把',d:'老房子灰塵特別多'},{n:'無線吸塵器',p:4500,need:2,pow:2,tm:.5,d:'吸力超強，角落也吸得到'},{n:'掃拖機器人',p:12000,need:5,auto:1,d:'出門前按一下，回家就乾淨了'}]},
 trash:{n:'倒垃圾',i:'🗑️',h:.5,s:6,mg:'trash',T:[{n:'追垃圾車',d:'提著垃圾爬五樓樓梯、在巷口等車'},{n:'大容量分類垃圾桶',p:800,need:2,pow:1.6,tm:.6,d:'分類好、一次倒完'},{n:'垃圾代收服務',p:1500,need:4,auto:1,week:150,d:'每週 💰150，管理員幫你收'}]}};
const HWK=Object.keys(HWD);
function hwS(){st.hw=st.hw||{t:{},cnt:{},done:{},cl:60,saved:0,wk:-1};const H=st.hw;HWK.forEach(k=>{H.t[k]=H.t[k]||0;H.cnt[k]=H.cnt[k]||0});return H}
const hwTier=k=>HWD[k].T[hwS().t[k]];
const hwAuto=k=>!!hwTier(k).auto;
function hwHours(k){const T=hwTier(k);return HWD[k].h*(T.tm||1)}
function hwAtHome(){return scene=='家'||/家$/.test(scene||'')}
// 週末開始：結算上週、自動化設備自動完成
function hwWeek(){const H=hwS(),n=wkN();if(H.wk==n)return;const first=H.wk<0;H.wk=n;
 if(!first){let miss=0;HWK.forEach(k=>{if(!H.done[k])miss++});H.cl=Math.max(0,Math.min(100,H.cl-miss*9+(4-miss)*4));if(miss>=3)setTimeout(()=>toast('😣 上週家事沒做完，家裡有點亂……（整潔度 '+H.cl+'）'),2600)}
 H.done={};const auto=[];let fee=0;HWK.forEach(k=>{if(hwAuto(k)){const T=hwTier(k);if(T.week){if(st.money>=T.week){st.money-=T.week;fee+=T.week}else return}H.done[k]=1;H.saved+=HWD[k].h;auto.push(HWD[k].i+T.n)}});
 if(auto.length)setTimeout(()=>whenFree(()=>{toast(`🤖 ${auto.join('、')} 已經自動處理好家事了！省下 ${auto.length?HWK.filter(k=>hwAuto(k)).reduce((a,k)=>a+HWD[k].h,0).toFixed(1):0} 小時${fee?`（代收費 💰${fee}）`:''}`);hwPanel()}),2500);hwPanel()}
{const _a=wkArrive;wkArrive=function(){const r=_a.apply(this,arguments);try{hwWeek()}catch(e){}return r}}
// 睡覺：整潔度影響隔天
{const _gs=goSleep;goSleep=function(){const r=_gs.apply(this,arguments);try{const H=hwS();setTimeout(()=>{if(H.cl>=80){st.joy=(st.joy||0)+5;st.sta=Math.min(staMax(),st.sta+10);toast('✨ 家裡乾乾淨淨，睡得特別好（😊+5 ⚡+10）')}else if(H.cl<35){st.joy=Math.max(0,(st.joy||0)-5);toast(H.cl<20?'🪳 半夜看到一隻蟑螂飛過去……（😊-5）快整理家裡吧':'😩 家裡亂糟糟的，睡不太好（😊-5）');}hud()},1800)}catch(e){}return r}}
function hwDo(k){const H=hwS(),C=HWD[k];if(H.done[k])return toast(C.i+' 這週已經'+C.n+'過了');if(!hwAtHome())return toast('要在家裡才能做家事');if(hwAuto(k))return toast('🤖 交給設備就好');
 if(st.sta<C.s)return toast('⚡ 體力不夠，先休息一下');hwGame(k,res=>{const h=hwHours(k);advance(h);st.sta=Math.max(0,st.sta-C.s);H.done[k]=1;H.cnt[k]++;H.cl=Math.min(100,H.cl+6);st.joy=(st.joy||0)+(res.perfect?4:2);
  const nx=HWD[k].T[H.t[k]+1];let tip='';if(nx){const left=nx.need-H.cnt[k];tip=left>0?`<br><span style="opacity:.75">再手動${C.n} ${left} 次，家樂福就會開始賣「${nx.n}」</span>`:`<br>💡 家樂福現在有賣「${nx.n}」（💰${nx.p.toLocaleString('en-US')}）了！`}
  hud();hwPanel();openDlg(C.i+' '+C.n+'完成！',`花了 ${Math.round(h*60)} 分鐘、⚡-${C.s}${res.perfect?'<br>✨ 完美！😊+4':''}<br>🏠 家的整潔度：${H.cl}${tip}`,[['好','',closeDlg]])})}
// ── 手動家事的小遊戲：刷掉髒污（連點／連按空白鍵），升級工具每下更有力 ──
function hwGame(k,done){const C=HWD[k],T=hwTier(k),pow=T.pow||1,M=mgBox(C.i+' '+C.n+'（'+T.n+'）'),g=M.g,W2=720,H2=520;M.tip.innerHTML='點髒污、或狂按 <b>空白鍵</b> 刷乾淨！工具越好，刷得越快';
 const spots=[],N=k=='trash'?6:9;for(let i=0;i<N;i++)spots.push({x:140+Math.random()*440,y:150+Math.random()*260,r:26+Math.random()*20,hp:1});
 const bub=[];let t0=performance.now(),combo=0,last=0,fin=false;
 const scrub=(x,y)=>{if(fin)return;let s=null;if(x==null){s=spots.filter(q=>q.hp>0).sort((a,b)=>b.hp-a.hp)[0]}else s=spots.find(q=>q.hp>0&&Math.hypot(q.x-x,q.y-y)<q.r+18);if(!s)return;
  const now=performance.now();combo=now-last<260?combo+1:0;last=now;s.hp-=(.14+Math.min(.12,combo*.01))*pow;for(let i=0;i<4;i++)bub.push({x:s.x+(Math.random()-.5)*s.r,y:s.y+(Math.random()-.5)*s.r,v:20+Math.random()*40,l:1,r:3+Math.random()*6});
  if(spots.every(q=>q.hp<=0)){fin=true;window.__kbBlock=performance.now()+1600;const sec=(now-t0)/1000;setTimeout(()=>{M.end();done({perfect:sec<N*1.1/pow+2})},700)}};
 M.cv.addEventListener('pointerdown',e=>{const r=M.cv.getBoundingClientRect();scrub((e.clientX-r.left)/r.width*W2,(e.clientY-r.top)/r.height*H2)});
 const kd=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();if(!e.repeat)scrub()}else if(e.key=='Escape'&&!fin){fin=true;M.end();OVK.delete(kd)}};OVK.add(kd);
 const bg={dish:'#dfe9f0',laundry:'#e8e0f0',clean:'#d8c6a6',trash:'#cfd8c8'}[k],dirt={dish:'#8a6a3a',laundry:'#7a6a5a',clean:'#6a5a44',trash:'#5a6a3a'}[k];
 const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);return}g.fillStyle=bg;g.fillRect(0,0,W2,H2);
  // 物件本體
  g.save();if(k=='dish'){g.fillStyle='#fff';g.beginPath();g.ellipse(360,285,250,170,0,0,7);g.fill();g.strokeStyle='#b8c8d4';g.lineWidth=6;g.stroke();g.beginPath();g.ellipse(360,285,170,110,0,0,7);g.stroke()}
  else if(k=='laundry'){g.fillStyle='#f4f0ea';g.fillRect(180,130,360,300);g.fillRect(120,130,90,120);g.fillRect(510,130,90,120);g.fillStyle='#d8d0c4';g.fillRect(320,130,80,26)}
  else if(k=='clean'){g.fillStyle='#c8b28a';for(let i=0;i<6;i++)g.fillRect(0,i*90+20,W2,6)}
  else{g.fillStyle='#3a5a3a';g.fillRect(250,140,220,280);g.fillStyle='#2a4a2a';g.fillRect(236,124,248,30)}
  g.restore();
  spots.forEach(s=>{if(s.hp<=0)return;g.globalAlpha=Math.max(.15,s.hp);g.fillStyle=dirt;g.beginPath();g.arc(s.x,s.y,s.r*(0.6+s.hp*.4),0,7);g.fill();g.globalAlpha=1});
  for(let i=bub.length-1;i>=0;i--){const b=bub[i];b.l-=1/60;b.y-=b.v/60;if(b.l<=0){bub.splice(i,1);continue}g.globalAlpha=b.l;g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.stroke();g.globalAlpha=1}
  // 進度條
  const pr=1-spots.reduce((a,s)=>a+Math.max(0,s.hp),0)/N;g.fillStyle='rgba(0,0,0,.25)';g.fillRect(60,30,600,26);g.fillStyle=pr>=1?'#3cc46a':'#3d9cf0';g.fillRect(63,33,594*pr,20);g.fillStyle='#fff';g.font='bold 18px sans-serif';g.textAlign='center';g.fillText(`${Math.round(pr*100)}%`,360,50);
  if(combo>3){g.fillStyle='#ff8a3a';g.font='bold 26px sans-serif';g.fillText('COMBO ×'+combo,360,100)}
  if(fin){g.fillStyle='rgba(255,255,255,.6)';g.fillRect(0,0,W2,H2);g.fillStyle='#2a8a4a';g.font='bold 54px sans-serif';g.fillText('✨ 乾淨溜溜！',360,290)}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ── 家樂福：家事好幫手（手動做夠次數才會上架）──
function hwShop(){const H=hwS(),o=[];HWK.forEach(k=>{const C=HWD[k],nx=C.T[H.t[k]+1];if(!nx)return o.push([`${C.i} ${C.n}：${hwTier(k).n}`,'✅ 已經是最高級了',()=>{},true]);
  const lock=H.cnt[k]<nx.need;o.push([`${C.i} ${nx.n}　💰${nx.p.toLocaleString('en-US')}`,lock?`🔒 先手動${C.n} ${nx.need} 次才會想買（${H.cnt[k]}/${nx.need}）`:nx.d+(nx.auto?'・🤖 每週自動完成':`・${C.n}時間 -${Math.round((1-(nx.tm||1))*100)}%`),()=>{if(st.money<nx.p)return toast('錢不夠');st.money-=nx.p;H.t[k]++;hud();hwPanel();closeDlg();typeof growCard=='function'?growCard(`${C.i} ${nx.n}`,nx.d,`${C.n}：${C.T[H.t[k]-1].n}`,`${C.n}：${nx.n}${nx.auto?'（自動）':''}`,()=>{}):toast('買了 '+nx.n)},lock||st.money<nx.p])});
 openDlg('🧺 家樂福・家事好幫手'+`（💰${st.money.toLocaleString('en-US')}）`,'做過才知道有多累。買了以後每個週末都省時間！',o.concat([['返回','',()=>mainMenu('家樂福')]]))}
wrapSP('家樂福',o=>o.splice(1,0,['🧺 家事好幫手','洗碗機、洗衣機、掃地機器人……',hwShop]));

// ════════ 3. 家的藍圖（進度條面板）════════
{const s=document.createElement('style');s.textContent=`#hwP{position:absolute;left:8px;top:64px;z-index:29;width:208px;background:rgba(255,246,220,.94);border:2px solid #6b4423;border-radius:10px;box-shadow:0 3px 10px rgba(0,0,0,.25);font-size:12px;color:#3a2410;font-family:"Cubic11",sans-serif;font-synthesis:none;zoom:var(--vf,1)}
#hwP .hd{display:flex;align-items:center;padding:4px 8px;cursor:pointer;font-weight:900;border-bottom:1px solid #d9b98a}#hwP .hd span{margin-left:auto;font-weight:normal;opacity:.7}
#hwP .bd{padding:5px 8px 7px}#hwP .rw{margin:4px 0}#hwP .bar{height:7px;border-radius:4px;background:#e2d2b0;overflow:hidden;margin-top:2px}#hwP .bar i{display:block;height:100%;border-radius:4px}
#hwP .ch{display:flex;gap:3px;margin-top:3px}#hwP .ch b{flex:1;text-align:center;padding:2px 0;border-radius:5px;background:#efe2c4;cursor:pointer;font-weight:normal}#hwP .ch b.ok{background:#bfe6c4}#hwP .ch b.au{background:#cfe4fb}#hwP.min .bd{display:none}`;document.head.appendChild(s)}
const hwEl=document.createElement('div');hwEl.id='hwP';(document.getElementById('wrap')||document.body).appendChild(hwEl);
try{if(localStorage.getItem('pxHwMin')=='1')hwEl.classList.add('min')}catch(e){}
const hwBar=(v,col)=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,v*100))}%;background:${col}"></i></div>`;
function hwNext(){const H=hwS();let best=null;HWK.forEach(k=>{const nx=HWD[k].T[H.t[k]+1];if(!nx)return;const sc=(H.cnt[k]>=nx.need?0:1e6)+nx.p;if(!best||sc<best.sc)best={k,nx,sc}});return best}
function hwPanel(){try{const show=!window.TITLE&&!(typeof ED!='undefined'&&ED.on);hwEl.style.display=show?'':'none';if(!show)return;const H=hwS();
 const dn=HWK.filter(k=>H.done[k]).length,tot=HWK.reduce((a,k)=>a+HWD[k].T.length-1,0),own=HWK.reduce((a,k)=>a+H.t[k],0),nb=hwNext();
 let oh=0,ohT=0;try{const O=ohS();['roof','wall','elec','heat'].forEach(q=>{ohT++;if(O[q]&&O[q].fix)oh++})}catch(e){}
 const gp=typeof gdPct=='function'?gdPct():0,cp=typeof coPct=='function'?coPct():0,home=Math.round(((own/tot)*.3+gp*.2+cp*.2+(ohT?oh/ohT:0)*.2+(H.cl/100)*.1)*100);
 const clc=H.cl>=80?'#3cc46a':H.cl>=40?'#f0a830':'#e2412f';
 hwEl.innerHTML=`<div class="hd">🏡 家的藍圖<span>${hwEl.classList.contains('min')?'▼':'▲'}</span></div><div class="bd">
  <div class="rw">🧺 本週家事 <b>${dn}/4</b>${hwBar(dn/4,'#3d9cf0')}<div class="ch">${HWK.map(k=>`<b data-hw="${k}" class="${H.done[k]?(hwAuto(k)?'au':'ok'):''}" title="${HWD[k].n}">${HWD[k].i}${H.done[k]?(hwAuto(k)?'🤖':'✓'):''}</b>`).join('')}</div></div>
  <div class="rw">✨ 家的整潔度 <b>${H.cl}</b>${hwBar(H.cl/100,clc)}</div>
  ${nb?`<div class="rw">🎯 下一個目標：${nb.nx.n}<br><span style="opacity:.75">${H.cnt[nb.k]<nb.nx.need?`再手動${HWD[nb.k].n} ${nb.nx.need-H.cnt[nb.k]} 次解鎖`:`💰${Math.min(st.money,nb.nx.p).toLocaleString('en-US')} / ${nb.nx.p.toLocaleString('en-US')}`}</span>${hwBar(H.cnt[nb.k]<nb.nx.need?H.cnt[nb.k]/nb.nx.need:st.money/nb.nx.p,'#c98af0')}</div>`:'<div class="rw">🎉 家事全自動化完成！</div>'}
  <div class="rw">🏠 家園完成度 <b>${home}%</b>${hwBar(home/100,'#ff8fb1')}</div>
  <div style="opacity:.7;margin-top:3px">⏱️ 設備累計幫你省下 ${H.saved.toFixed(1)} 小時</div></div>`}catch(e){}}
hwEl.addEventListener('click',e=>{const c=e.target.closest('[data-hw]');if(c){e.stopPropagation();hwDo(c.dataset.hw);return}if(e.target.closest('.hd')){hwEl.classList.toggle('min');try{localStorage.setItem('pxHwMin',hwEl.classList.contains('min')?'1':'0')}catch(er){}hwPanel()}});
setInterval(()=>hwPanel(),1500);setTimeout(()=>{try{hwS();if(hwS().wk<0)hwS().wk=wkN();hwPanel()}catch(e){}},2500);
// 家裡的床邊選單加入口
{const _oh=openHome;openHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(Array.isArray(opts)&&opts.length>2&&!opts.some(q=>q[0]&&q[0].includes('🧺 家事'))){const H=hwS(),n=HWK.filter(k=>!H.done[k]).length;opts.splice(1,0,['🧺 家事'+(n?`（還有 ${n} 件）`:'（都做完了）'),'洗碗、洗衣、打掃、倒垃圾',()=>{closeDlg();hwMenu()}])}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _oh.apply(this,arguments)}finally{openDlg=od}}}
function hwMenu(){const H=hwS();openDlg('🧺 這週的家事',`🏠 整潔度 ${H.cl}　｜　${hwAtHome()?'在家裡，可以開始做':'⚠ 要回家才能做'}`,HWK.map(k=>{const C=HWD[k],T=hwTier(k);return[`${C.i} ${C.n}（${T.n}）`,H.done[k]?(hwAuto(k)?'🤖 已自動完成':'✅ 這週做過了'):hwAuto(k)?'🤖 設備處理':`約 ${Math.round(hwHours(k)*60)} 分鐘・⚡-${C.s}`,()=>{closeDlg();hwDo(k)},!!H.done[k]||hwAuto(k)]}).concat([['返回','',closeDlg]]))}
