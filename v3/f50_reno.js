/* v9.8 老房子改造計畫：6F 頂樓加蓋的三個空間（家庭健身房、聚會和室、頂樓菜園）——清理 → 修繕 → 建設 Lv1 */
const RENO={
 gym:{n:'家庭健身房',ic:'🏋️',was:'堆滿雜物的舊房間',r:{x:69,y:28,w:189,h:237},sp:['work'],repair:['油漆、換地板、修電燈',12000],build:['瑜伽墊、啞鈴、沙包',8000],lv1:'在家就能訓練，算進每週健身打卡'},
 wa:{n:'聚會和室',ic:'🙏',was:'漏水發霉的舊和室',r:{x:265,y:28,w:176,h:357},sp:['tea'],repair:['抓漏、換榻榻米、除霉',18000],build:['長矮桌、坐墊、詩歌本、小音響',6000],lv1:'每週可以在家辦家庭小組'},
 roof:{n:'頂樓菜園',ic:'🌱',was:'長滿雜草的頂樓陽台',r:{x:4,y:385,w:492,h:261},sp:['sun','clothes','plants'],repair:['頂樓防水、排水孔疏通',30000],build:['4 個菜圃、澆水器、小農具',5000],lv1:'種菜、收成、自己煮或拿去賣'}};
const RK=['gym','wa','roof'];
const rnS=()=>{const R=st.reno||(st.reno={});RK.forEach(k=>{R[k]=R[k]||{s:0,cl:0,lv:0}});R.g=R.g||{p:[null,null,null,null]};R.grp=R.grp||{n:0,m:[],w:0,cnt:0};R.let=R.let||[];return R};
const rnReady=k=>{const s=rnS()[k];return s.s>=2&&s.lv>=1};
const ST6=['清理','修繕','建設','完成'];
function rnStage(k){const s=rnS()[k];if(s.s==0)return 0;if(s.s==1)return s.rw?1.5:1;if(s.lv<1)return 2;return 3}
// ───────── 6F 畫面：未完成的空間顯示雜物、灰塵、壁癌 ─────────
const rnIn=(f,r)=>{if(!Array.isArray(f)||['wallh','wallv','glassw','stairs','doorm'].includes(f[0]))return false;const cx=f[1]+f[3]/2,by=f[2]+f[4];return cx>=r.x&&cx<=r.x+r.w&&by>=r.y&&by<=r.y+r.h+4};
function rnFur(d){const R=rnS();return d.fur.filter(f=>!RK.some(k=>!rnReady(k)&&rnIn(f,RENO[k].r)))}
const PLOTS=[[128,548],[180,548],[232,548],[284,548]],PLW=46,PLH=30;
function rnJunk(c,k){const s=rnS()[k],r=RENO[k].r,rnd=orn(k.length*977+31);
 if(s.s>=2)return;
 if(s.s==0){// 灰塵與雜物
  c.fillStyle='rgba(90,80,70,.28)';for(let i=0;i<26;i++){c.beginPath();c.ellipse(r.x+rnd()*r.w,r.y+12+rnd()*(r.h-16),8+rnd()*18,4+rnd()*8,0,0,7);c.fill()}
  const left=1-s.cl/100,n=Math.round(14*left);
  for(let i=0;i<n;i++){const x=r.x+10+rnd()*(r.w-34),y=r.y+20+rnd()*(r.h-40),w=12+rnd()*16,h=9+rnd()*10,t=rnd();
   if(k=='roof'&&t<.45){for(let j=0;j<6;j++)R(c,x+j*3,y+h-6-rnd()*6,1.4,6+rnd()*6,['#5e8a3c','#7aa04a','#4a7030'][j%3])}
   else if(t<.7){R(c,x+1,y+h,w,2,'rgba(0,0,0,.25)');R(c,x,y,w,h,'#a87a4a');R(c,x,y,w,2,'#c8986a');R(c,x+w/2-1,y,2,h,'#d8c8a0');R(c,x,y,1,h,'#6a4a2a');R(c,x+w-1,y,1,h,'#6a4a2a')}
   else{R(c,x,y+h-3,w,3,'rgba(0,0,0,.22)');R(c,x+2,y+2,w-4,h-5,'#7a7068');R(c,x+3,y+3,w-8,2,'#9a9088')}}
  c.strokeStyle='rgba(230,230,230,.5)';c.lineWidth=.5;[[r.x+2,r.y+2],[r.x+r.w-2,r.y+2]].forEach((q,i)=>{const dx=i?-1:1;for(let j=0;j<4;j++){c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(q[0]+dx*(10+j*3),q[1]+14-j*3);c.stroke()}c.beginPath();c.arc(q[0],q[1],8,i?Math.PI/2:0,i?Math.PI:Math.PI/2);c.stroke()})}
 // 壁癌、漏水痕、裂縫（修繕前都看得到）
 const rr=orn(k.length*331+7);c.fillStyle='rgba(120,140,110,.35)';for(let i=0;i<5;i++){c.beginPath();c.ellipse(r.x+12+rr()*(r.w-24),r.y+4+rr()*10,6+rr()*10,3+rr()*4,0,0,7);c.fill()}
 if(k=='wa'||k=='roof'){c.fillStyle='rgba(70,100,130,.25)';for(let i=0;i<3;i++){c.beginPath();c.ellipse(r.x+20+rr()*(r.w-40),r.y+40+rr()*(r.h-60),12+rr()*12,5+rr()*4,0,0,7);c.fill()}}
 c.strokeStyle='rgba(60,40,30,.45)';c.lineWidth=.7;for(let i=0;i<3;i++){let x=r.x+20+rr()*(r.w-40),y=r.y+30+rr()*(r.h-50);c.beginPath();c.moveTo(x,y);for(let j=0;j<5;j++){x+=rr()*8-4;y+=4+rr()*4;c.lineTo(x,y)}c.stroke()}
 txt(c,s.s==0?'🧹 待清理':'🔧 待修繕',r.x+r.w/2,r.y+r.h/2,'rgba(255,240,210,.85)','bold 9px sans-serif')}
const CROPS={bok:{n:'小白菜',ic:'🥬',seed:60,d:2,y:3,p:60,s:[0,1,2,3],col:'#7ac84a'},yam:{n:'地瓜葉',ic:'🍃',seed:50,d:2,y:3,p:50,s:[1,2],col:'#5aa040'},basil:{n:'九層塔',ic:'🌿',seed:40,d:2,y:2,p:60,s:[0,1,2],col:'#3a8a3a'},
 tom:{n:'番茄',ic:'🍅',seed:120,d:4,y:5,p:80,s:[0,1],col:'#d83a2a'},cab:{n:'高麗菜',ic:'🥬',seed:100,d:4,y:2,p:150,s:[2,3],col:'#b8e08a'}};
Object.keys(CROPS).forEach(k=>{const C=CROPS[k];IT['veg_'+k]={n:C.n,i:C.ic,p:C.p,d:'自己種的'+C.n+'，新鮮又安心。可以下廚、帶去小組，或到全聯賣。',u:'keep'}});
function rnPlots(c){if(!rnReady('roof'))return;const G=rnS().g;PLOTS.forEach((q,i)=>{const [x,y]=q,P=G.p[i];
 R(c,x-1,y+PLH,PLW+2,3,'rgba(0,0,0,.25)');R(c,x,y,PLW,PLH,'#8a5a32');R(c,x+3,y+3,PLW-6,PLH-6,P&&P.w==wkN()?'#4a3020':'#6a4428');for(let j=0;j<3;j++)R(c,x+5,y+7+j*7,PLW-10,1,'rgba(0,0,0,.2)');
 if(!P)return;const C=CROPS[P.c],st2=Math.min(1,P.g/C.d);
 for(let j=0;j<6;j++){const px=x+6+(j%3)*14,py=y+9+Math.floor(j/3)*10;
  if(st2<.3){R(c,px+2,py+2,2,3,'#6ac04a')}
  else if(st2<1){R(c,px,py,8*st2+2,5*st2+2,C.col=='#d83a2a'?'#4a9a3a':C.col);R(c,px+2,py-2,2,3,'#5ab03a')}
  else{if(P.c=='tom'){R(c,px,py-2,8,7,'#4a9a3a');R(c,px+1,py,3,3,'#e8402a');R(c,px+5,py+2,3,3,'#e8402a')}else if(P.c=='cab'){c.fillStyle='#a8d878';c.beginPath();c.arc(px+4,py+2,5,0,7);c.fill();c.fillStyle='#d8f0b0';c.beginPath();c.arc(px+4,py+1,2.5,0,7);c.fill()}else{R(c,px-1,py-3,10,8,C.col);R(c,px+1,py-5,3,3,C.col);R(c,px+5,py-5,3,3,C.col)}}}
 if(P.bug){R(c,x+PLW-8,y+2,3,2,'#2a2a2a');R(c,x+PLW-14,y+12,3,2,'#2a2a2a')}
 if(st2>=1)txt(c,'✨',x+PLW-6,y+8,'#ffd84a','bold 7px sans-serif')});txt(c,'🌱 菜園',PLOTS[0][0]+PLW*2+3,PLOTS[0][1]+PLH+12,'rgba(60,30,10,.4)','bold 8px sans-serif')}
{const _rr=renderRm;renderRm=function(d,n){if(n!='家6F'||d.out)return _rr(d,n);const f0=d.fur,p0=d.pre,q0=d.post;d.fur=rnFur(d);
 d.pre=(c,W,H)=>{p0&&p0(c,W,H)};d.post=(c,W,H)=>{q0&&q0(c,W,H);RK.forEach(k=>rnJunk(c,k));rnPlots(c)};try{return _rr(d,n)}finally{d.fur=f0;d.pre=p0;d.post=q0}}}
function rnRefresh(){const r=IN['家6F'];if(!r||!r.built)return;r.sol=mkSol(rnFur(r));if(rnReady('roof'))PLOTS.forEach(q=>r.sol.push({x:q[0],y:q[1]+PLH-8,w:PLW,h:8}));r.cv=renderRm(r,'家6F')}
{const _rb=rmBuild;rmBuild=function(n){const r=_rb.apply(this,arguments);if(n=='家6F'){rnRefresh();setTimeout(rnIntro,500)}return r}}
{const _g=gzRoomRefresh;gzRoomRefresh=function(n){const r=_g.apply(this,arguments);if(n=='家6F')rnRefresh();return r}}
// ───────── 互動點 ─────────
{const R6=IN['家6F'];if(R6){R6.sp.push(['garden',PLOTS[0][0],PLOTS[0][1]+PLH,PLW*4+20,14]);R6.spl.garden='菜圃';const F=R6.spf;
 const wrap=(id,k,fn)=>{const f0=F[id];F[id]=()=>rnReady(k)?(fn?fn(f0):f0&&f0()):renoMenu(k)};
 wrap('work','gym',f0=>gymMenu(f0));wrap('tea','wa',f0=>groupRoom(f0));wrap('sun','roof');wrap('clothes','roof');wrap('plants','roof',()=>gardenMenu());wrap('garden','roof',()=>gardenMenu());
 F.store=()=>openDlg('📦 儲藏室','堆滿了丁爺爺、丁奶奶留下的紙箱。',[['📜 丁家的舊信件','清理時找到的',letterView],['翻翻舊東西（30 分鐘）','😊+3',()=>{fxApply({j:3});advance(.5);hud();closeDlg();toast('📦 翻到一本舊相簿，回憶湧上心頭。')}],['離開','',closeDlg]])}}
function rnIntro(){const R=rnS();if(R.intro||scene!='家6F')return;R.intro=1;SVDIRTY=1;openDlg('🏚️ 頂樓加蓋','這層頂樓加蓋是三十幾年前前屋主丁爺爺、丁奶奶蓋的。兩位老人家都是退休老師，後來因為爬五樓太累，才把房子賣給我們。頂樓已經荒廢了很久：<br>・舊房間堆滿紙箱和灰塵<br>・和室天花板會漏水，榻榻米都發霉了<br>・陽台長滿雜草，排水孔也塞住了<br><br>家宜站在樓梯口：「好可惜喔……如果整理起來，這裡一定很棒。」<br><br><b>🏚️ 老房子改造計畫開始！</b><br><span style="font-size:12px;opacity:.85">每個空間都要：🧹 清理 → 🔧 修繕 → 🏗️ 建設。走到空間裡的互動點就能開始。手機「🏚️ 老房子」可以看進度。</span>',[['開始整理吧！','',closeDlg]])}
// ───────── 改造流程 ─────────
function renoMenu(k){const S=rnS()[k],D=RENO[k],o=[];let d=`<b>${D.ic} ${D.n}</b>　目前：${D.was}<br>`;
 if(S.s==0){d+=`🧹 清理進度 <b>${S.cl}%</b><br><span style="font-size:12px;opacity:.85">每次清理約 1 小時（⚡-12），雜物裡可能藏著丁爺爺、丁奶奶留下的東西。</span>`;o.push(['🧹 動手清理（小遊戲）','⚡-12・1 小時',()=>{closeDlg();cleanGame(k)},st.sta<12])}
 else if(S.s==1&&!S.rw){d+=`🔧 需要修繕：${D.repair[0]}<br>請師傅施工，<b>下個週末</b>完工。`;o.push([`🔧 請師傅修繕（💰${D.repair[1].toLocaleString('en-US')}）`,'下週末完工',()=>{payOut(D.repair[1]);S.rw=wkN()+1;hud();SVDIRTY=1;closeDlg();toast('🔧 師傅排好工期了，下週末完工');rnRefresh()},funds()<D.repair[1]])}
 else if(S.s==1){d+=`🔧 師傅施工中……第 ${S.rw} 個週末完工。`}
 else if(S.lv<1){d+=`✨ 空間已經修好了，乾乾淨淨。<br>🏗️ 建設 Lv1：${D.build[0]}<br>完成後：${D.lv1}`;o.push([`🏗️ 建設 ${D.n} Lv1（💰${D.build[1].toLocaleString('en-US')}）`,D.lv1,()=>{payOut(D.build[1]);S.lv=1;hud();SVDIRTY=1;closeDlg();rnRefresh();rnDone(k)},funds()<D.build[1]])}
 o.push(['離開','',closeDlg]);openDlg('🏚️ 老房子改造',d,o)}
function rnDone(k){const D=RENO[k];fxApply({j:15});try{feedPost(D.ic+' '+D.n+' 完工！','老房子改造：'+D.was+' → '+D.n,null)}catch(e){}
 const yj=typeof yjS=='function'&&yjS().wed;openDlg('🎉 '+D.n+' Lv1 完工！',`${D.was}，現在變成了<b>${D.n}</b>。<br>${D.lv1}。<br><br>${yj?'家宜繞了一圈，開心地抱住你：「我們家越來越像樣了！」':'看著煥然一新的空間，成就感滿滿。'}<br><br>😊 +15（已發到脆G）`,[['太棒了！','',closeDlg]])}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const R=rnS(),W=wkN();
 RK.forEach(k=>{const S=R[k];if(S.s==1&&S.rw&&W>=S.rw){S.s=2;S.rw=0;whenFree(()=>openDlg('🔧 修繕完工',`${RENO[k].ic} ${RENO[k].n}的修繕完成了！<br>${RENO[k].repair[0]}都弄好了，可以開始建設。`,[['好！','',closeDlg]]))}});
 // 菜園：有澆水的菜長大一週
 R.g.p.forEach(P=>{if(!P)return;const C=CROPS[P.c];if(P.w==W-1&&!P.bug)P.g=Math.min(C.d,P.g+1);if(P.g<C.d&&Math.random()<.18)P.bug=1});
 // 老房子的小意外：v13.3 起改由「老屋維修事件」處理


 SVDIRTY=1;if(scene=='家6F')rnRefresh()}catch(e){console.error(e)}return r}}
// ───────── 清理小遊戲 ─────────
const DINGK=[['dk_paddle','🏓','丁爺爺的舊桌球拍'],['dk_bonsai','✂️','盆景修剪剪刀'],['dk_plane','🪚','木工刨刀'],['dk_brush','🖌️','丁奶奶的毛筆'],['dk_kenzan','💐','插花用的劍山'],['dk_jar','🏺','空的梅酒罈'],['dk_recipe','📒','手寫食譜本']];
DINGK.forEach(x=>IT[x[0]]={n:x[2],i:x[1],d:'丁爺爺、丁奶奶留在老房子裡的東西。好像可以拿去問問看……',u:'keep'});
const LETTERS=['「民國七十八年，我和老伴用兩個人教書存下的錢，買下了這間五樓的公寓。頂樓加蓋是我自己畫的圖，想給孩子們一個可以跑跳的地方。」——丁爺爺',
 '「頂樓種滿了我的寶貝盆景，旁邊那排地瓜葉是老伴炒菜用的。週末我在這裡做木工，桌球桌也是自己釘的，學生們常常來挑戰我，一個都沒贏過。」——丁爺爺',
 '「和室是我的小天地。早上寫書法，下午插花，過年前就在這張矮桌上寫春聯，整棟樓的鄰居都來討。」——丁奶奶',
 '「那年颱風，頂樓漏了一整夜。我們一邊拿臉盆接水，一邊開了一罈我自己釀的梅子酒，兩個老人家笑到天亮。」——丁爺爺',
 '「膝蓋爬不動五樓了，我們決定把這個家交給下一家人。希望你們也在這裡，留下滿滿的笑聲。頂樓的老梅樹，請幫我們多看兩眼。」——丁爺爺、丁奶奶']
function letterView(){const R=rnS();openDlg('📜 丁家的信',R.let.length?R.let.map(i=>'・'+LETTERS[i]).join('<br><br>')+(R.let.length<5?`<br><br><span style="font-size:12px;opacity:.75">還有 ${5-R.let.length} 封沒找到……</span>`:''):'還沒有找到任何信。清理空間的時候仔細找找看。',[['返回','',closeDlg]])}
function cleanGame(k){const S=rnS()[k],R=rnS(),M=mgBox('🧹 清理：'+RENO[k].n),g=M.g,W2=720,H2=520;fxApply({s:-12});advance(1);hud();
 const rnd=Math.random,items=[];for(let i=0;i<9;i++){const t=k=='roof'?(rnd()<.5?'weed':rnd()<.5?'pot':'box'):(rnd()<.55?'box':rnd()<.5?'junk':'dust');items.push({x:70+(i%3)*200+rnd()*80,y:90+Math.floor(i/3)*130+rnd()*40,t,w:t=='box'?90:70,h:t=='box'?70:50,gone:0,a:0,hide:rnd()<.12?'letter':rnd()<.12?'coin':rnd()<.14?'keep':null})}
 if(R.let.length<5&&!items.some(q=>q.hide=='letter'))items[Math.floor(rnd()*9)].hide='letter';
 let T0=performance.now(),cur=0,found=[],done=false,raf,lim=22;
 const pick=i=>{const q=items[i];if(!q||q.gone||done)return;q.gone=1;q.a=0;if(q.hide=='letter'&&R.let.length<5){const n=R.let.length;R.let.push(n);found.push('📜 丁家的信（第 '+(n+1)+' 封）')}else if(q.hide=='coin'){const v=50+Math.floor(rnd()*6)*50;st.money+=v;found.push('🪙 舊硬幣罐 💰'+v)}else if(q.hide=='keep'){const L=DINGK.filter(x=>!(st.inv[x[0]]>0));if(L.length){const x=L[Math.floor(rnd()*L.length)];addItem(x[0],1);found.push(x[1]+' '+x[2])}}
  if(items.every(q=>q.gone))finish()};
 const finish=()=>{if(done)return;done=true;cancelAnimationFrame(raf);OVK.delete(kd);const n=items.filter(q=>q.gone).length;S.cl=Math.min(100,S.cl+Math.round(n/9*40));if(S.cl>=100){S.s=1;S.cl=100}hud();SVDIRTY=1;rnRefresh();
  g.fillStyle='rgba(255,248,232,.95)';g.fillRect(0,0,W2,H2);g.fillStyle='#3a2210';g.textAlign='center';g.font='bold 36px sans-serif';g.fillText(S.s>=1?'🎉 清理完成！':'🧹 清掉了 '+n+' 件雜物',W2/2,170);g.font='bold 26px sans-serif';g.fillText('清理進度 '+S.cl+'%',W2/2,230);
  g.font='22px sans-serif';found.forEach((t,i)=>g.fillText('找到：'+t,W2/2,290+i*34));
  M.tip.innerHTML=S.s>=1?`${RENO[k].n}清乾淨了！下一步：🔧 請師傅修繕。`:'還沒清完，休息一下再繼續。';if(found.some(t=>t.includes('信')))M.tip.innerHTML+='<br>（信放進 6F 儲藏室了，可以去看看）';
  mgButtons(M,[[S.s>=1?'好！':'先這樣',()=>M.end()]])};
 const kd=e=>{e.preventDefault();if(e.key=='Escape')return finish();if(e.key==' '||e.key=='Enter'){if(!e.repeat)pick(cur)}if(e.key=='ArrowRight'||e.key=='d')cur=(cur+1)%9;if(e.key=='ArrowLeft'||e.key=='a')cur=(cur+8)%9;if(e.key=='ArrowDown'||e.key=='s')cur=(cur+3)%9;if(e.key=='ArrowUp'||e.key=='w')cur=(cur+6)%9};OVK.add(kd);
 M.cv.addEventListener('pointerdown',e=>{const b=M.cv.getBoundingClientRect(),x=(e.clientX-b.left)*W2/b.width,y=(e.clientY-b.top)*H2/b.height;items.forEach((q,i)=>{if(!q.gone&&x>q.x&&x<q.x+q.w&&y>q.y&&y<q.y+q.h)pick(i)})});
 const loop=now=>{const t=(now-T0)/1000;if(t>=lim)return finish();
  g.fillStyle=k=='roof'?'#b8b0a0':'#c9a878';g.fillRect(0,0,W2,H2);for(let y=0;y<H2;y+=40)g.fillRect(0,y,W2,1);
  items.forEach((q,i)=>{if(q.gone){q.a+=.06;if(q.a>1)return;g.globalAlpha=1-q.a}const y=q.y-(q.gone?q.a*60:0);
   if(q.t=='box'){g.fillStyle='#a87a4a';g.fillRect(q.x,y,q.w,q.h);g.fillStyle='#d8c8a0';g.fillRect(q.x+q.w/2-5,y,10,q.h);g.strokeStyle='#5a3a1a';g.lineWidth=3;g.strokeRect(q.x,y,q.w,q.h)}
   else if(q.t=='weed'){g.fillStyle='#5e8a3c';for(let j=0;j<9;j++)g.fillRect(q.x+j*8,y+q.h-10-((j*13)%30),5,10+((j*13)%30))}
   else if(q.t=='pot'){g.fillStyle='#b8643a';g.beginPath();g.moveTo(q.x+10,y+10);g.lineTo(q.x+q.w-10,y+10);g.lineTo(q.x+q.w-20,y+q.h);g.lineTo(q.x+20,y+q.h);g.fill();g.fillStyle='#6a4a2a';g.fillRect(q.x+25,y+4,10,10)}
   else if(q.t=='dust'){g.fillStyle='rgba(90,80,70,.7)';g.beginPath();g.ellipse(q.x+q.w/2,y+q.h/2,q.w/2,q.h/3,0,0,7);g.fill()}
   else{g.fillStyle='#7a7068';g.fillRect(q.x,y+10,q.w,q.h-10);g.fillStyle='#9a9088';g.fillRect(q.x+6,y,q.w-20,14)}
   if(!q.gone&&i==cur){g.strokeStyle='#ffd84a';g.lineWidth=4;g.strokeRect(q.x-6,y-6,q.w+12,q.h+12)}g.globalAlpha=1});
  g.fillStyle='#3a2210';g.fillRect(20,H2-34,W2-40,16);g.fillStyle=t>lim-5?'#e85a3a':'#4ac84a';g.fillRect(22,H2-32,(W2-44)*(1-t/lim),12);
  M.tip.textContent='點雜物，或用方向鍵選、空白鍵搬走。時間內搬越多越好！';raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)}
// ───────── 家庭健身房 Lv1 ─────────
function gymMenu(f0){openDlg('🏋️ 家庭健身房 Lv1','瑜伽墊、啞鈴、沙包。在家練，也算進每週健身打卡。<br><span style="font-size:12px;opacity:.75">Lv2（深蹲架、臥推椅）之後開放：可以收第一位私人學員。</span>',[['💪 啞鈴訓練（小遊戲）','⚡-12・1 小時・算一次健身打卡',()=>{closeDlg();dumbbell()},st.sta<12],['🥊 打沙包、其他訓練','',()=>{closeDlg();f0&&f0()}],['離開','',closeDlg]])}
function dumbbell(){const M=mgBox('💪 啞鈴彎舉'),g=M.g,W2=720,H2=520;fxApply({s:-12});advance(1);hud();
 const S={rep:0,good:0,perfect:0,x:0,v:1.1,zone:.5,zw:.2,done:false,fl:0,msg:''},N=12;
 const hit=()=>{if(S.done)return;const d=Math.abs(S.x-S.zone);if(d<S.zw*.25){S.perfect++;S.good++;S.msg='PERFECT!';S.fl=.3}else if(d<S.zw/2){S.good++;S.msg='GOOD';S.fl=.2}else{S.msg='MISS';S.fl=-.2}S.rep++;S.zone=.2+Math.random()*.6;S.zw=Math.max(.1,.22-S.rep*.009);S.v=1.1+S.rep*.06;if(S.rep>=N)fin()};
 const fin=()=>{S.done=true;OVK.delete(kd);const sc=S.good/N,pw=sc>=.9?3:sc>=.6?2:1;fxApply({p:pw,h:2,j:sc>=.9?6:2});try{gymTick()}catch(e){}hud();
  g.fillStyle='rgba(255,248,232,.95)';g.fillRect(0,0,W2,H2);g.fillStyle='#3a2210';g.textAlign='center';g.font='bold 40px sans-serif';g.fillText(sc>=.9?'💪 完美的一組！':sc>=.6?'👍 不錯！':'😮‍💨 有點散掉了',W2/2,190);g.font='26px sans-serif';g.fillText(`成功 ${S.good}/${N}　PERFECT ${S.perfect}`,W2/2,250);g.fillText(`⚔️ 力量 +${pw}　❤️ +2`,W2/2,300);
  M.tip.textContent='已算進本週健身打卡。';mgButtons(M,[['好！',()=>M.end()]])};
 const kd=e=>{e.preventDefault();if(e.key==' '||e.key=='Enter'){if(!e.repeat)hit()}if(e.key=='Escape')fin()};OVK.add(kd);M.cv.addEventListener('pointerdown',hit);
 let last=performance.now();const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.x+=S.v*dt;if(S.x>1||S.x<0){S.v*=-1;S.x=Math.max(0,Math.min(1,S.x))}S.fl*=.9;
  g.fillStyle='#2a2430';g.fillRect(0,0,W2,H2);const up=S.fl>0?1:0;
  // 人物（簡單剪影）＋ 啞鈴
  g.fillStyle='#e8c8a0';g.beginPath();g.arc(W2/2,150,34,0,7);g.fill();g.fillStyle='#2a2a2a';g.fillRect(W2/2-40,184,80,110);
  const ay=up?200:260;g.strokeStyle='#e8c8a0';g.lineWidth=16;g.beginPath();g.moveTo(W2/2+40,200);g.lineTo(W2/2+70,ay);g.stroke();g.fillStyle='#555';g.fillRect(W2/2+50,ay-12,50,24);g.fillStyle='#222';g.fillRect(W2/2+44,ay-18,10,36);g.fillRect(W2/2+96,ay-18,10,36);
  const bx=80,by=380,bw=W2-160;g.fillStyle='#111';g.fillRect(bx-4,by-4,bw+8,44);g.fillStyle='#444';g.fillRect(bx,by,bw,36);g.fillStyle='rgba(80,220,80,.9)';g.fillRect(bx+(S.zone-S.zw/2)*bw,by,S.zw*bw,36);g.fillStyle='rgba(255,230,80,1)';g.fillRect(bx+(S.zone-S.zw/8)*bw,by,S.zw/4*bw,36);g.fillStyle='#fff';g.fillRect(bx+S.x*bw-3,by-10,6,56);
  g.fillStyle='#fff6dc';g.font='bold 28px sans-serif';g.textAlign='center';g.fillText(`${S.rep}/${N}`,W2/2,60);if(S.msg){g.fillStyle=S.msg=='MISS'?'#ff7a6a':'#ffd84a';g.fillText(S.msg,W2/2,350)}
  M.tip.textContent='白線在綠色區按空白鍵（或點畫面），黃色正中央是 PERFECT。越後面越快！';requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ───────── 頂樓菜園 Lv1 ─────────
function gardenMenu(){const G=rnS().g,W=wkN(),c=cal(),o=[];
 const line=(P,i)=>{if(!P)return`菜圃 ${i+1}：空的`;const C=CROPS[P.c],ok=P.g>=C.d;return`菜圃 ${i+1}：${C.ic} ${C.n}　${ok?'✨ 可以收成！':`成長 ${P.g}/${C.d} 週`}${P.w==W?'　💧已澆水':'　⚠️ 本週還沒澆水'}${P.bug?'　🐛 有蟲':''}`};
 const anyDry=G.p.some(P=>P&&P.w!=W&&P.g<CROPS[P.c].d),anyBug=G.p.some(P=>P&&P.bug),ripe=G.p.map((P,i)=>P&&P.g>=CROPS[P.c].d?i:-1).filter(i=>i>=0),empty=G.p.map((P,i)=>P?-1:i).filter(i=>i>=0);
 if(anyDry)o.push(['💧 澆水（全部菜圃）','20 分鐘・⚡-3・每個週末要澆一次，下週才會長大',()=>{G.p.forEach(P=>{if(P)P.w=W});fxApply({s:-3,j:2});advance(.33);hud();SVDIRTY=1;rnRefresh();toast('💧 澆完水，葉子閃閃發亮');gardenMenu()},st.sta<3]);
 if(anyBug)o.push(['🐛 抓蟲','20 分鐘・⚡-4・有蟲的菜不會長大',()=>{G.p.forEach(P=>{if(P)P.bug=0});fxApply({s:-4});advance(.33);hud();SVDIRTY=1;rnRefresh();toast('🐛 菜蟲都抓光了！');gardenMenu()},st.sta<4]);
 if(ripe.length)o.push(['🧺 收成',ripe.length+' 個菜圃可以收成',()=>{const got=[];ripe.forEach(i=>{const P=G.p[i],C=CROPS[P.c];addItem('veg_'+P.c,C.y);got.push(C.ic+' '+C.n+' ×'+C.y);G.p[i]=null});fxApply({j:8});advance(.3);hud();SVDIRTY=1;rnRefresh();
  try{feedPost('🧺 頂樓菜園收成','自己種的：'+got.join('、'),null)}catch(e){}openDlg('🧺 收成！','親手種的菜，一顆一顆摘下來：<br>'+got.join('<br>')+'<br><br>可以下廚、帶去小組，或到全聯賣掉。',[['好有成就感！','',gardenMenu]])}]);
 if(empty.length)o.push(['🌱 播種',`${empty.length} 個空菜圃・現在是${c.name}`,()=>seedMenu(empty[0])]);
 o.push(['🍳 用自己種的菜煮一餐','用 2 份蔬菜・1 小時・⚡+30 😊+12',()=>{const k=Object.keys(CROPS).filter(k=>(st.inv['veg_'+k]||0)>0);let n=2;k.forEach(q=>{const t=Math.min(n,st.inv['veg_'+q]);st.inv['veg_'+q]-=t;n-=t});fxApply({s:30,j:12,h:3});advance(1);st.full=Math.min(100,(st.full||0)+25);hud();closeDlg();toast('🍳 自己種的菜特別甜！')},vegCount()<2]);
 o.push(['離開','',closeDlg]);openDlg('🌱 頂樓菜園 Lv1',G.p.map(line).join('<br>')+`<br><span style="font-size:12px;opacity:.75">蔬菜庫存：${vegCount()} 份</span>`,o)}
const vegCount=()=>Object.keys(CROPS).reduce((a,k)=>a+(st.inv['veg_'+k]||0),0);
function seedMenu(i){const c=cal(),G=rnS().g;openDlg('🌱 播種：菜圃 '+(i+1),`現在是${c.ic} ${c.name}。不同季節適合種不同的菜。`,Object.keys(CROPS).map(k=>{const C=CROPS[k],ok=C.s.includes(c.s);return[`${C.ic} ${C.n}（種子 💰${C.seed}）`,ok?`${C.d} 週收成・可收 ${C.y} 份`:'這個季節種不起來',()=>{st.money-=C.seed;G.p[i]={c:k,g:0,w:-1,bug:0};hud();SVDIRTY=1;rnRefresh();toast('🌱 種下了'+C.n+'，記得每個週末澆水');gardenMenu()},!ok||st.money<C.seed]}).concat([['返回','',gardenMenu]]))}
// 全聯收購蔬菜
wrapSP('全聯',o=>o.splice(1,0,['🥬 小農蔬菜收購','把頂樓菜園種的菜賣掉',()=>{const ks=Object.keys(CROPS).filter(k=>(st.inv['veg_'+k]||0)>0);if(!ks.length)return openDlg('🥬 蔬菜收購','你身上沒有自己種的菜。',[['返回','',()=>mainMenu('全聯')]]);
 let tot=0;ks.forEach(k=>tot+=st.inv['veg_'+k]*CROPS[k].p);openDlg('🥬 蔬菜收購','生鮮區阿姨：「自己種的喔？看起來好新鮮！我們專門收小農的菜。」',[['💰 全部賣掉',`共 💰${tot.toLocaleString('en-US')}`,()=>{ks.forEach(k=>st.inv['veg_'+k]=0);st.money+=tot;hud();toast('🥬 蔬菜賣掉了：💰+'+tot);mainMenu('全聯')}],['返回','',()=>mainMenu('全聯')]])}]));
// ───────── 聚會和室 Lv1：家庭小組 ─────────
function groupRoom(f0){const G=rnS().grp,W=wkN(),h=T.hour,ok=h>=18&&h<22,done=G.w==W;
 openDlg('🙏 聚會和室 Lv1',`長矮桌、坐墊、詩歌本。<br>家庭小組：已聚會 <b>${G.cnt}</b> 次・固定成員 <b>${G.m.length}</b> 人<br><span style="font-size:12px;opacity:.75">每個週末一次，晚上 18:00–22:00 開始。</span>`,
 [['🙏 舉辦家庭小組（2 小時）',done?'這個週末已經聚過了':ok?'邀請朋友、準備點心、選一段經文':'晚上 18:00–22:00 才能開始',()=>groupInvite(),done||!ok],['🍵 和室原本的活動','泡茶、禱告、午睡',()=>{closeDlg();f0&&f0()}],['離開','',closeDlg]])}
function groupInvite(sel){sel=sel||[];const ids=Object.keys(FR).filter(id=>{try{return FRS(id).met&&id!='yijia'}catch(e){return false}});const wed=typeof yjS=='function'&&yjS().wed;
 openDlg('🙏 邀請誰來小組？（最多 4 位）',(wed?'💗 家宜會一起參加。<br>':'')+`已選：${sel.map(id=>FR[id].n).join('、')||'（還沒選）'}`,ids.map(id=>[`${sel.includes(id)?'✅':'⬜'} ${FR[id].ic} ${FR[id].n}`,FR[id].who,()=>{const s=sel.includes(id)?sel.filter(x=>x!=id):sel.length<4?sel.concat(id):sel;groupInvite(s)}]).concat([['▶ 下一步：準備點心',sel.length?'':'至少邀請一位',()=>groupSnack(sel),!sel.length],['取消','',closeDlg]]))}
function groupSnack(sel){openDlg('🍽️ 準備點心',`${sel.length+1} 個人的份量`,[['🥬 用自己種的菜炒幾盤（2 份蔬菜）','大家最喜歡！好感加成',()=>{let n=2;Object.keys(CROPS).forEach(q=>{const t=Math.min(n,st.inv['veg_'+q]||0);st.inv['veg_'+q]=(st.inv['veg_'+q]||0)-t;n-=t});groupTopic(sel,2)},vegCount()<2],
 ['🍱 訂外食（💰800）','',()=>{st.money-=800;hud();groupTopic(sel,1)},st.money<800],['🍪 簡單茶點（💰200）','',()=>{st.money-=200;hud();groupTopic(sel,0)},st.money<200]])}
function groupTopic(sel,snack){const P=[];while(P.length<3){const v=VERSES[Math.floor(Math.random()*VERSES.length)];if(!P.includes(v))P.push(v)}
 openDlg('📖 這次要分享哪一段經文？','',P.map(v=>[v[0],v[1].slice(0,30)+(v[1].length>30?'…':''),()=>groupRun(sel,snack,v)]))}
function groupRun(sel,snack,v){const G=rnS().grp,W=wkN();G.w=W;G.cnt++;sel.forEach(id=>{if(!G.m.includes(id))G.m.push(id)});advance(2);
 const L=['大家陸續到了，脫鞋坐上榻榻米，'+(snack==2?'桌上那幾盤自己種的青菜一下就被夾光：「這是你們頂樓種的？好甜！」':snack==1?'一邊吃便當一邊聊這週發生的事。':'泡了一壺茶，配著小餅乾聊天。'),
  '你打開詩歌本，大家一起唱了兩首詩歌，和室裡的聲音暖暖的。',`今天分享的經文是 <b>${v[0]}</b>：<br>「${v[1]}」`];
 const SAY=['「這段經文剛好是我這週最需要的。」','「最近工作壓力好大，謝謝大家為我禱告。」','「我想分享一件這週被神祝福的小事……」','「每次來這裡，心都會安靜下來。」','「下次可以帶我同事來嗎？」','「這個和室好有感覺，好像回到小時候的家。」'];
 sel.forEach((id,i)=>L.push(`${FR[id].ic} <b>${FR[id].n}</b>：${SAY[(i+G.cnt)%SAY.length]}`));L.push('最後大家圍成一圈，彼此代禱。散會時已經很晚了，大家還捨不得走。');
 sel.forEach(id=>{try{frAdd(id,snack==2?6:4,1)}catch(e){}});try{if(typeof yjS=='function'&&yjS().wed)frAdd('yijia',3,1)}catch(e){}fxApply({j:12+snack*3,w:2});hud();SVDIRTY=1;
 const ms={1:'第一次家庭小組',5:'小組聚會 5 次',10:'小組聚會 10 次'}[G.cnt];
 let i=0;const next=()=>{if(i<L.length)return openDlg('🙏 家庭小組・第 '+G.cnt+' 次',L[i++],[['▶','',next]]);
  try{feedPost('🙏 家庭小組','今天在家裡的和室聚會，'+(sel.length+1)+' 個人一起唱詩、分享、禱告。',null)}catch(e){}
  openDlg('🙏 散會',`😊 +${12+snack*3}　🧠 +2　💞 每位朋友好感 +${snack==2?6:4}${ms?'<br><br>🏅 <b>'+ms+'</b>':''}`,[['願神祝福大家','',closeDlg]])};next()}
// ───────── 手機：老房子進度 ─────────
function renoPhone(){const R=rnS();openDlg('🏚️ 老房子改造計畫',RK.map(k=>{const D=RENO[k],S=R[k],sg=rnStage(k);const bar=[0,1,2,3].map(i=>i<Math.floor(sg)?'🟩':i==Math.floor(sg)&&sg<3?'🟨':'⬜').join('');
  return`${D.ic} <b>${D.n}</b>　${bar}<br><span style="font-size:12px;opacity:.85">${sg==0?'🧹 清理中 '+S.cl+'%':sg==1?'🔧 等待修繕（💰'+D.repair[1].toLocaleString('en-US')+'）':sg==1.5?'🔧 師傅施工中，第 '+S.rw+' 週末完工':sg==2?'🏗️ 可以建設 Lv1（💰'+D.build[1].toLocaleString('en-US')+'）':'✅ Lv1 完成：'+D.lv1}</span>`}).join('<br><br>')+`<br><br><span style="font-size:12px;opacity:.75">全部在 6F 頂樓加蓋，走到該空間的互動點操作。📜 丁家的信 ${R.let.length}/5</span>`,[['返回','',phoneHome]])}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i<0?opts.length:i,0,['🏚️ 老房子','改造進度',renoPhone,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
