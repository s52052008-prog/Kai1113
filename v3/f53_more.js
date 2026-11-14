/* v10.1 依藍圖繼續：頂樓菜園 Lv2 溫室／Lv3 小雞舍、家庭健身房 Lv3 新學員（阿榮、貓奶奶）、
   吉他班改版（摯友＋買吉他＋五堂課）、十一奉獻與「上帝的祝福」 */
// ───────── 頂樓菜園 Lv2・Lv3 ─────────
const GDLV={2:['🏠 溫室',20000,'不受季節限制，什麼菜都能種'],3:['🐔 小雞舍',30000,'養三隻母雞，每個週末餵飼料就能撿雞蛋']};
{const _sm=seedMenu;seedMenu=function(i){if(rnS().roof.lv<2)return _sm.apply(this,arguments);const c=cal(),G=rnS().g;
 openDlg('🌱 播種：菜圃 '+(i+1),`🏠 溫室裡四季都能種。`,Object.keys(CROPS).map(k=>{const C=CROPS[k];return[`${C.ic} ${C.n}（種子 💰${C.seed}）`,`${C.d} 週收成・可收 ${C.y} 份`,()=>{st.money-=C.seed;G.p[i]={c:k,g:0,w:-1,bug:0};hud();SVDIRTY=1;rnRefresh();toast('🌱 種下了'+C.n);gardenMenu()},st.money<C.seed]}).concat([['返回','',gardenMenu]]))}}
{const _gm=gardenMenu;gardenMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&t.includes('頂樓菜園')){const lv=rnS().roof.lv;t='🌱 頂樓菜園 Lv'+lv;const i=opts.findIndex(o=>o[0]=='離開');
  if(lv>=3){const H=rnS().hen||(rnS().hen={w:-1,fed:-1});const W=wkN();d+=`<br>🐔 小雞舍：${H.fed==W?'這週已經餵過了':'⚠️ 本週還沒餵飼料'}`;opts.splice(i,0,['🐔 餵雞、撿雞蛋',H.fed==W?'這個週末已經餵過了':'飼料 💰50・撿到 3 顆雞蛋',()=>{H.fed=W;st.money-=50;addItem('px_egg',1);fxApply({j:5});hud();SVDIRTY=1;closeDlg();toast('🐔 咕咕咕！撿到一盒新鮮雞蛋')},H.fed==W||st.money<50])}
  if(lv<3){const L=GDLV[lv+1];opts.splice(opts.findIndex(o=>o[0]=='離開'),0,[`🏗️ 升級 Lv${lv+1}：${L[0]}（💰${L[1].toLocaleString('en-US')}）`,L[2],()=>{payOut(L[1]);rnS().roof.lv=lv+1;hud();SVDIRTY=1;closeDlg();rnRefresh();openDlg('🎉 頂樓菜園 Lv'+(lv+1),L[0]+'蓋好了！<br>'+L[2]+'。',[['太好了','',closeDlg]])},funds()<L[1]])}}
 return od.call(this,t,d,opts,...r)};try{return _gm.apply(this,arguments)}finally{openDlg=od}}}
{const _jk=rnPlots;rnPlots=function(c){_jk.apply(this,arguments);if(!rnReady('roof'))return;const lv=rnS().roof.lv;
 if(lv>=2){c.strokeStyle='rgba(200,235,255,.8)';c.lineWidth=1.2;c.fillStyle='rgba(200,235,255,.15)';const x=PLOTS[0][0]-6,y=PLOTS[0][1]-14,w=PLW*4+26,h=PLH+20;c.fillRect(x,y,w,h);c.strokeRect(x,y,w,h);for(let i=1;i<6;i++){c.beginPath();c.moveTo(x+i*w/6,y);c.lineTo(x+i*w/6,y+h);c.stroke()}}
 if(lv>=3){const x=360,y=560;R(c,x,y,60,34,'#a8794a');R(c,x+2,y+2,56,30,'#c8a070');oPoly(c,[[x-4,y+2],[x+30,y-14],[x+64,y+2]],'#8a3a2a');R(c,x+24,y+16,12,18,'#5a3418');
  [[x+8,y+40],[x+28,y+44],[x+48,y+40]].forEach(q=>{c.fillStyle='#fff';c.beginPath();c.ellipse(q[0],q[1],5,4,0,0,7);c.fill();R(c,q[0]+3,q[1]-5,3,3,'#fff');R(c,q[0]+4,q[1]-6,2,1,'#e83a2a');R(c,q[0]+5,q[1]-4,2,1,'#f0b030')})}}}
// ───────── 家庭健身房 Lv3：更多學員 ─────────
const STU={laoli:{n:'里長阿榮',key:'lz',goal:'腰痛，想繼續每天站在路口顧小朋友過馬路',cues:[['1','腰部塌陷','核心收緊！'],['2','膝蓋超過腳尖','屁股往後坐！'],['3','聳肩','肩膀放鬆！'],['4','憋氣','記得吐氣！']],
  ms:[[30,'阿榮：「這兩天早上起床，腰居然不痛了！」'],[60,'阿榮在路口站了一整個早上，回來還能提菜上樓。'],[100,'🎉 阿榮的腰痛完全好了！<br>他在里民大會上大聲宣傳：「我們里有一位神教練！」<br>⭐ 名聲大增']]},
 maonai:{n:'貓奶奶',key:'mn',goal:'怕跌倒，想自己去市場買菜、餵街上的貓',cues:[['1','重心不穩','扶好椅背，慢慢來！'],['2','步伐太小','腳抬高一點！'],['3','低頭看地','眼睛看前面！'],['4','動作太快','慢慢的，不急！']],
  ms:[[30,'貓奶奶：「我今天自己走到巷口餵小橘了！」'],[60,'貓奶奶提著菜籃，自己從市場走回家，一路上跟每隻貓打招呼。'],[100,'🎉 貓奶奶可以自己出門散步了！<br>她送來一大袋自己做的小魚乾：「給你，也給你們家的貓——沒有貓？那就給你吃！」']]}};
const stuS=id=>{const R=rnS();R.stu=R.stu||{};return R.stu[id]||(R.stu[id]={p:0,w:0,ms:{}})};
{const _g=gymMenu;gymMenu=function(f0){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&t.includes('家庭健身房')){const lv=rnS().gym.lv,i=opts.findIndex(o=>o[0]=='離開'),W=wkN();t='🏋️ 家庭健身房 Lv'+lv;
  if(lv>=2)Object.keys(STU).filter(id=>STU[id].lv2||lv>=3).filter(id=>!STU[id].need||STU[id].need()).forEach(id=>{const S=STU[id],P=stuS(id),ok=P.w!=W&&dow()>=5&&T.hour>=9&&T.hour<18;opts.splice(opts.findIndex(o=>o[0]=='離開'),0,P.p>=100?[`🏆 ${S.n}：畢業了！`,'',()=>openDlg('🏋️ '+S.n,'「教練，謝謝你！」',[['不客氣！','',closeDlg]])]:[`🧓 私人教練課：${S.n}`,P.w==W?'這個週末已經上過課了':ok?`進度 ${P.p}%・💰+1,000`:'週末 09:00–18:00 上課',()=>{closeDlg();coachGame2(id)},!ok||st.sta<10])});
  if(lv==2){const P=ptS(),open=P.kg<=84;opts.splice(opts.findIndex(o=>o[0]=='離開'),0,['🏗️ 升級家庭健身房 Lv3（💰40,000）',open?'跑步機、拳擊台・里長阿榮和貓奶奶聽說了，也想來上課':'先讓禹豪瘦到 84 公斤，口碑傳開才會有新學員',()=>{payOut(40000);rnS().gym.lv=3;hud();SVDIRTY=1;closeDlg();rnRefresh();openDlg('🎉 家庭健身房 Lv3','跑步機、拳擊台都到位了！<br>隔天，里長阿榮和貓奶奶一起來按門鈴：<br>阿榮：「聽禹豪說你很會教，我這腰……可以救一下嗎？」<br>貓奶奶：「奶奶也想學，不想再跌倒了。」<br><br>🧓 新學員：里長阿榮、貓奶奶',[['歡迎！','',closeDlg]])},!open||funds()<40000])}}
 return od.call(this,t,d,opts,...r)};try{return _g.apply(this,arguments)}finally{openDlg=od}}}
function coachGame2(id){const D=STU[id],P=stuS(id),M=mgBox((D.exam?'📝 術科考試：':'🏋️ 私人教練課：')+D.n),g=M.g,W2=720,H2=520,CU=D.cues;fxApply({s:-10});advance(1);hud();
 const N=8,S={i:0,ok:0,t:0,cur:null,res:'',rt:0,done:false};let last=performance.now();
 const nextCue=()=>{S.cur={c:Math.floor(Math.random()*4),t:0,lim:Math.max(1.4,2.5-S.i*.12)};S.i++};
 const ans=k=>{if(!S.cur||S.done)return;if(k==S.cur.c){S.ok++;S.res='✅ '+CU[k][2]}else S.res='❌ 他的問題是「'+CU[S.cur.c][1]+'」';S.rt=1;S.cur=null;S.t=0;if(S.i>=N)setTimeout(fin,700)};
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);if(D.exam){M.end();return D.done(S.ok/N)}const sc=S.ok/N,gain=sc>=.85?20:sc>=.6?14:8;P.p=Math.min(100,P.p+gain);P.w=wkN();st.money+=coachPay(1000);fxApply({j:sc>=.6?8:3,r:1});hud();SVDIRTY=1;
  g.fillStyle='rgba(255,248,232,.95)';g.fillRect(0,0,W2,H2);g.fillStyle='#3a2210';g.textAlign='center';g.font='bold 34px sans-serif';g.fillText(sc>=.85?'💪 完美的一堂課！':sc>=.6?'👍 不錯的一堂課':'😅 有點手忙腳亂',W2/2,170);g.font='24px sans-serif';g.fillText(`正確提醒 ${S.ok}/${N}　進度 +${gain}% → ${P.p}%`,W2/2,230);g.fillText('💰 +'+coachPay(1000).toLocaleString('en-US')+'　⭐ +1',W2/2,275);
  mgButtons(M,[['下課！',()=>{M.end();D.ms.forEach(q=>{if(P.p>=q[0]&&!P.ms[q[0]]){P.ms[q[0]]=1;fxApply({j:8,r:q[0]==100?10:2});whenFree(()=>openDlg('🏋️ 學員的改變：'+D.n,q[1],[['太棒了！','',closeDlg]]))}})}]])};
 const kd=e=>{e.preventDefault();const i=['1','2','3','4'].indexOf(e.key);if(i>=0)ans(i);if(e.key=='Escape')fin()};OVK.add(kd);
 M.bt.innerHTML='';CU.forEach((c,i)=>{const b=document.createElement('button');b.textContent=`${c[0]} ${c[1]}`;b.style.cssText='font:inherit;font-size:14px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:6px 10px;cursor:pointer';b.onclick=()=>ans(i);M.bt.appendChild(b)});
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.rt=Math.max(0,S.rt-dt*.6);
  if(!S.cur&&S.t>.9&&S.i<N)nextCue();if(S.cur){S.cur.t+=dt;if(S.cur.t>S.cur.lim){S.res='⏰ 太慢了！他的問題是「'+CU[S.cur.c][1]+'」';S.rt=1;S.cur=null;S.t=0;if(S.i>=N)setTimeout(fin,700)}}
  g.fillStyle='#2a2430';g.fillRect(0,0,W2,H2);const dy=Math.sin(now/600)*14,c=S.cur&&S.cur.c,key=D.key+'_sheet';
  g.fillStyle='#6a4a2a';g.fillRect(W2/2+70,300,12,120);g.fillRect(W2/2+70,300,60,10);
  if(uaOK(key)){g.imageSmoothingEnabled=false;g.save();g.translate(W2/2,420);if(c==0&&id=='maonai')g.rotate(Math.sin(now/90)*.08);sqDraw(g,UAI[key],(1+Math.sin(now/600))/2);g.restore()}
  if(S.cur){const a=.6+.4*Math.sin(now/90);g.strokeStyle=`rgba(255,80,60,${a})`;g.lineWidth=5;const pos=[[W2/2,250+dy],[W2/2,360],[W2/2,190+dy],[W2/2,150+dy]][S.cur.c];g.beginPath();g.arc(pos[0],pos[1],46,0,7);g.stroke();g.fillStyle='#3a2210';g.fillRect(20,20,200,16);g.fillStyle='#ffb040';g.fillRect(22,22,196*(1-S.cur.t/S.cur.lim),12)}
  g.fillStyle='#fff6dc';g.font='bold 24px sans-serif';g.textAlign='center';g.fillText(`${S.i}/${N}`,W2-60,40);g.font='16px sans-serif';g.fillText('目標：'+D.goal,W2/2,505);if(S.rt>0){g.font='bold 24px sans-serif';g.globalAlpha=Math.min(1,S.rt*2);g.fillText(S.res,W2/2,470);g.globalAlpha=1}
  M.tip.textContent='看紅圈和他的動作，判斷哪裡要提醒，按 1–4 或點按鈕！';requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ───────── 吉他班：摯友＋自己的吉他＋五堂課 ─────────
IT.guitar={n:'木吉他',i:'🎸',p:5000,d:'以倫牧師推薦的入門木吉他。',u:'keep'};
churchGuitar=function(){const sk=st.skill,cls=CHM()=='guitar',lv=(()=>{try{return frLv(FRS('yilun').pt)}catch(e){return 0}})(),own=(st.inv.guitar||0)>0||st.guitarOwn,G=st.gtr||(st.gtr={n:0,w:-1}),o=[];let d;
 if(st.guitarDone){d='你已經學會吉他彈唱了！練團室的吉他架上，有一把是你的。';o.push(['🎸 自己練一首詩歌（1 小時）','😊+8',()=>{fxApply({j:8});advance(1);hud();closeDlg();toast('🎸 越彈越順手了')}])}
 else if(lv<4){d=`練團室的牆上寫著：<b>週六中午 12:00–14:00　吉他班（黃以倫）</b><br>以倫牧師的吉他班只收熟識的學生。<br><span style="font-size:12px;opacity:.8">🔒 和以倫成為「摯友」後開放（目前：${FRL[lv][1]}）</span>`}
 else if(!own){d='以倫牧師：「想學吉他？太好了！先去買一把自己的吉他，我推薦這把入門的木吉他。」';o.push(['🎸 買一把木吉他（💰5,000）','放在家裡的書房',()=>{st.money-=5000;st.guitarOwn=1;addItem('guitar',1);hud();SVDIRTY=1;toast('🎸 買了一把木吉他！');churchGuitar()},st.money<5000])}
 else{const W=wkN(),miss=G.n>0&&G.w<W-1,mk=miss&&dow()==4&&T.hour>=14&&T.hour<18,ok=cls||mk;d=`吉他班進度：<b>${G.n}/5</b> 堂${miss?'<br>📅 上週沒來上課，以倫牧師說：「沒關係，這週五下午 14:00–18:00 來練團室，我幫你補課！」（週六的正課也可以上）':''}`;
  o.push([mk?'🎸 補課（小遊戲・1.5 小時）':'🎸 上吉他課（小遊戲・1.5 小時）',G.w==W?'這週已經上過了':ok?'第 '+(G.n+1)+' 堂':miss?'週五 14:00–18:00 補課，或週六 12:00–14:00 正課':'週六 12:00–14:00 才有課',()=>{closeDlg();strumGame()},!ok||G.w==W||st.sta<6])}
 o.push(['離開','',closeDlg]);openDlg('🎸 練團室',d,o)};
function strumGame(){const G=st.gtr,M=mgBox('🎸 吉他課 第 '+(G.n+1)+' 堂'),g=M.g,W2=720,H2=520;fxApply({s:-6});advance(1.5);
 const CH=['C','G','Am','F','D','Em'],seq=[];for(let i=0;i<16;i++)seq.push(CH[Math.floor(Math.random()*Math.min(6,3+G.n))]);
 const keys2={C:'1',G:'2',Am:'3',F:'4',D:'5',Em:'6'},S={t:0,i:0,ok:0,done:false,msg:'',mt:0},beat=Math.max(.7,1.15-G.n*.08);let last=performance.now();
 const hit=ch=>{if(S.done)return;const cur=seq[S.i];if(!cur)return;const ph=(S.t%beat)/beat,good=ph<.3||ph>.8;if(ch==cur&&good){S.ok++;S.msg='♪ 好聽！'}else S.msg=ch==cur?'節奏不對':'和弦按錯了';S.mt=.6;S.i++;if(S.i>=seq.length)setTimeout(fin,400)};
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);const sc=S.ok/seq.length;G.n++;G.w=wkN();st.skill.guitar=Math.min(100,(st.skill.guitar||0)+20);try{frAdd('yilun',3,1)}catch(e){}fxApply({j:6,l:1});hud();SVDIRTY=1;
  g.fillStyle='rgba(255,248,232,.95)';g.fillRect(0,0,W2,H2);g.fillStyle='#3a2210';g.textAlign='center';g.font='bold 34px sans-serif';g.fillText(sc>=.8?'🎸 以倫：「彈得很好！」':sc>=.5?'🎸 以倫：「有進步喔！」':'🎸 以倫：「慢慢來，多練習。」',W2/2,190);g.font='24px sans-serif';g.fillText(`準確 ${S.ok}/${seq.length}　吉他班 ${G.n}/5`,W2/2,250);
  mgButtons(M,[['謝謝牧師！',()=>{M.end();if(G.n>=5&&!st.guitarDone){st.guitarDone=1;fxApply({j:20});try{feedPost('🎸 學會吉他彈唱了！','連續五週跟以倫牧師學吉他，終於可以自彈自唱了！',null)}catch(e){}
   whenFree(()=>openDlg('🎸 學會吉他彈唱！','第五堂課結束，以倫牧師把吉他交還給你：「你已經可以自己帶敬拜了。」<br>回家後，你在和室彈了一首〈此生相依〉給家宜聽，她靠在你肩上輕輕跟著唱。<br><br>🎸 解鎖：在家彈吉他給家宜聽、家庭小組帶敬拜（心情加成）',[['感謝主！','',closeDlg]]))}}]])};
 const kd=e=>{e.preventDefault();const i=['1','2','3','4','5','6'].indexOf(e.key);if(i>=0)hit(CH[i]);if(e.key=='Escape')fin()};OVK.add(kd);
 M.bt.innerHTML='';CH.forEach((c,i)=>{const b=document.createElement('button');b.textContent=(i+1)+' '+c;b.style.cssText='font:inherit;font-size:14px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:6px 10px;cursor:pointer;min-width:52px';b.onclick=()=>hit(c);M.bt.appendChild(b)});
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.mt-=dt;
  g.fillStyle='#2a2018';g.fillRect(0,0,W2,H2);for(let i=0;i<6;i++){g.fillStyle='#c8b090';g.fillRect(0,180+i*24,W2,2)}
  const ph=(S.t%beat)/beat;g.fillStyle=`rgba(255,216,74,${1-ph})`;g.beginPath();g.arc(80,240,30+ph*20,0,7);g.fill();
  seq.forEach((c,i)=>{const x=200+(i-S.i)*110;if(x<120||x>W2+60)return;g.fillStyle=i==S.i?'#ffd84a':'#fff6dc';g.font=`bold ${i==S.i?44:30}px sans-serif`;g.textAlign='center';g.fillText(c,x,250);g.font='16px sans-serif';g.fillText(keys2[c],x,285)});
  if(S.mt>0){g.fillStyle='#fff';g.font='bold 26px sans-serif';g.fillText(S.msg,W2/2,380)}g.fillStyle='#fff6dc';g.font='20px sans-serif';g.fillText(`${S.i}/${seq.length}`,W2-60,40);
  M.tip.textContent='黃色圓圈亮起的瞬間，按下對應的和弦（數字鍵 1–6 或按鈕）！';requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// 學會吉他後：在家彈給家宜聽、小組帶敬拜
{const _gr=groupRoom;groupRoom=function(f0){const od=openDlg;openDlg=function(t,d,opts,...r){if(st.guitarDone&&Array.isArray(opts)&&t.includes('聚會和室')){const i=opts.findIndex(o=>o[0]=='離開');opts.splice(i,0,['🎸 彈吉他給家宜聽（30 分鐘）',(st.gtrW==wkN())?'這週已經彈過了':'💗 家宜 +3 😊+10',()=>{st.gtrW=wkN();fxApply({j:10});try{frAdd('yijia',3,1)}catch(e){}advance(.5);hud();closeDlg();toast('🎸 家宜跟著哼，笑得好溫柔')},st.gtrW==wkN()])}return od.call(this,t,d,opts,...r)};try{return _gr.apply(this,arguments)}finally{openDlg=od}}}
{const _run=groupRun;groupRun=function(sel,snack,v){const r=_run.apply(this,arguments);if(st.guitarDone){fxApply({j:6});setTimeout(()=>toast('🎸 你抱著吉他帶大家敬拜，和室裡的歌聲特別溫暖（😊+6）'),600)}return r}}
// ───────── 十一奉獻：上帝的祝福 ─────────
const titheS=()=>st.tithe||(st.tithe={last:-99,until:-1});
const blessed=()=>wkN()<=titheS().until;
{const _cm=churchMenu;churchMenu=function(m){if(m=='sun'){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='⛪ 主日崇拜'&&Array.isArray(opts)&&opts.length&&opts[0][0].includes('參加主日')){const T2=titheS(),W=wkN(),amt=Math.round((typeof WPAY=='number'?WPAY:15000)*4/10);
  opts.splice(1,0,['💝 十一奉獻（本月收入的 1/10・💰'+amt.toLocaleString('en-US')+'）',W-T2.last<4?`這個月已經奉獻過了（第 ${T2.last} 週末）`:'接下來 4 個週末：倒楣事減半，還會有好事發生',()=>{payOut(amt);T2.last=W;T2.until=W+4;fxApply({j:10,r:3});hud();SVDIRTY=1;closeDlg();openDlg('💝 十一奉獻','你把這個月收入的十分之一放進奉獻袋。<br>「你們要將當納的十分之一全然送入倉庫……試試我，是否為你們敞開天上的窗戶，傾福與你們。」（瑪拉基書 3:10）<br><br>✨ <b>上帝的祝福</b>：接下來 4 個週末，壞事發生的機會減半，還可能遇到中發票、長官嘉獎、鄰居送水果這些好事。',[['阿們','',closeDlg]])},W-T2.last<4||funds()<amt])}return od.call(this,t,d,opts,...r)};try{return _cm.apply(this,arguments)}finally{openDlg=od}}return _cm.apply(this,arguments)}}
{const _ea=evArrive;evArrive=function(){if(blessed()&&Math.random()<.5)return;return _ea.apply(this,arguments)}}
const GOODEV=[[1/15,'🧾 中發票！','你對了一下發票……中了 <b>2,000 元</b>！感謝主～',()=>{st.money+=2000}],
 [.08,'🎖️ 長官的嘉獎','這週演習表現優異，連長特別嘉獎，多發了一筆獎金。',()=>{st.money+=3000;fxApply({r:3})}],
 [.08,'👛 撿到錢包','你在路邊撿到一個錢包，送到派出所。失主是一位阿伯，特地買了一盒水果來道謝。',()=>{addItem('px_fruit',1);fxApply({r:5,j:5})}],
 [.08,'🍊 鄰居的心意','樓下的阿姨說家鄉寄來太多柑橘，硬塞了一大袋給你們。',()=>{addItem('px_fruit',1);fxApply({j:5})}],
 [.07,'☕ 朋友請客','禹豪傳訊息：「這週我請你喝咖啡！上次謝謝你幫忙。」',()=>{fxApply({j:6,s:10});try{frAdd('yuhao',2,1)}catch(e){}}],
 [.06,'🌈 好天氣','整個週末天氣都好舒服，連空氣都是甜的。',()=>{fxApply({j:8,h:3})}],
 [.05,'📮 意外的退稅','收到國稅局的通知：去年多繳的稅退回來了！',()=>{st.money+=1500}],
 [.05,'🎫 抽中電影票','教會的感恩抽獎，你抽中了兩張電影票！',()=>{fxApply({j:8});addItem('px_tea',1)}]];
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{if(blessed()){fxApply({j:3});let x=Math.random();for(const q of GOODEV){if(x<q[0]){q[3]();hud();SVDIRTY=1;setTimeout(()=>whenFree(()=>openDlg('✨ 上帝的祝福・'+q[1],q[2],[['感謝主！','',closeDlg]])),6000);break}x-=q[0]}}}catch(e){}return r}}
