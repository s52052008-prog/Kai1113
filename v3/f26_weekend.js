/* v6.0 週末限定人生：主角是職業軍人，只在 週五 12:00 ～ 週一 07:00 休假
   ・片頭：營區放假 → 背包走回家 → 在家規劃週末
   ・週一 07:00 收假：回營區動畫 → 一週總結 → 直接跳到下個週五 12:00
   ・時間流速放慢：遊戲 1 小時 ≈ 現實 80 秒（整個週末約 90 分鐘） */
window.TSPD=80;
const WK={busy:0,PLANS:[['⛪','參加主日崇拜','城光復興堂'],['🏀','去操場打籃球','操場'],['👨‍👩‍👦','去小石頭家坐坐','黃禹豪的家'],['☕','去咖啡店放空','咖啡店'],['🌙','逛夜市吃宵夜','夜市'],['♨️','搭火車去台東知本泡湯','溫泉鄉'],['🌀','遊藝場打陀螺','遊藝場'],['💪','健身房練身體','健身房'],['🍷','碳佐麻里吃大餐','碳佐麻里'],['🤝','社福中心當志工','社福中心'],['🌳','公園散步','公園'],['🛒','去家樂福採買','家樂福']]};
const wkIn=()=>{const d=dow(),h=T.hour;return (d==4&&h>=12)||d==5||d==6||(d==0&&h<7)};
const wkLeft=()=>{const d=dow(),h=T.hour;const dd=d==4?3:d==5?2:d==6?1:0;return Math.max(0,dd*24+(7-h))};
function wkState(){if(!st.wk)st.wk={n:1,plan:[],done:{},vis:{},hist:[]};return st.wk}
// 時間推進：記錄去過的地方；超過週一 07:00 就收假
{const _adv=advance;advance=function(h){_adv(h);try{const W=wkState();const here=scene||(typeof placeName=='function'?placeName(p.x,p.y):null);if(here)W.vis[here]=1;
  W.plan.forEach(k=>{const q=WK.PLANS[k];if(q&&!W.done[k]&&W.vis[q[2]]){W.done[k]=1;fxApply({j:8});toast(`✅ 完成週末計畫：${q[0]} ${q[1]}（😊+8）`)}});
  if(!WK.busy&&!window.TITLE&&!wkIn()&&!(window.NOTITLE&&!window.WKTEST)){WK.busy=1;setTimeout(wkReturn,60)}
  if(dow()==6&&T.hour>=20&&!W.warn){W.warn=1;toast('⏰ 明天早上 07:00 就要收假回營區了，把握最後的時光！')}}catch(e){console.error(e)}};
 window.__advRaw=_adv}
// 職稱顯示
{const _h=hud;hud=function(){_h.apply(this,arguments);try{if(st.cp<0){const w=document.createTreeWalker(hudEl,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())if(n.nodeValue.includes('無業遊民'))n.nodeValue=n.nodeValue.replace('無業遊民','職業軍人・週末休假')}}catch(e){}}}
// ── 過場動畫（覆蓋整個畫面，時間暫停） ──
function cutscene(kind,done){window.TITLE=true;Object.keys(keys).forEach(k=>keys[k]=0);try{closeDlg()}catch(e){}
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:#000;display:flex;align-items:center;justify-content:center;cursor:pointer';
 const c=document.createElement('canvas');c.width=960;c.height=600;c.style.cssText='width:min(100vw,160vh);max-height:100vh;aspect-ratio:8/5;image-rendering:pixelated';ov.appendChild(c);document.body.appendChild(ov);
 const x=c.getContext('2d');x.imageSmoothingEnabled=false;const t0=performance.now(),DUR=kind=='out'?6.5:8.5;let fin=false;
 const end=()=>{if(fin)return;fin=true;ov.style.transition='opacity .5s';ov.style.opacity='0';setTimeout(()=>{ov.remove();window.TITLE=false;done&&done()},500)};
 const skip=e=>{if(performance.now()-t0>800){e&&e.preventDefault();removeEventListener('keydown',skip,true);end()}};addEventListener('keydown',skip,true);ov.addEventListener('pointerdown',skip);
 const bag=(bx,by)=>{x.fillStyle='#4a5a2a';x.fillRect(bx,by,9,6);x.fillStyle='#3a4820';x.fillRect(bx,by,9,1.5);x.fillStyle='#2a2a1a';x.fillRect(bx+2,by-3,1,3);x.fillRect(bx+6,by-3,1,3);x.fillRect(bx+2,by-3,5,1)};
 function frame(){if(fin)return;const t=(performance.now()-t0)/1000;x.setTransform(4,0,0,4,0,0);
  const morning=kind=='out';
  // 天空與遠山
  const g=x.createLinearGradient(0,0,0,150);if(morning){g.addColorStop(0,'#7a8ab8');g.addColorStop(1,'#f0c8a0')}else{g.addColorStop(0,'#5aa8e8');g.addColorStop(1,'#cfe8f8')}x.fillStyle=g;x.fillRect(0,0,240,150);
  x.fillStyle=morning?'#6a7a8a':'#7a9a7a';x.beginPath();x.moveTo(0,70);x.lineTo(40,48);x.lineTo(80,62);x.lineTo(130,40);x.lineTo(180,60);x.lineTo(240,46);x.lineTo(240,90);x.lineTo(0,90);x.fill();
  for(let i=0;i<3;i++){const cx=((t*6+i*90)%300)-30;x.fillStyle='rgba(255,255,255,.8)';x.beginPath();x.ellipse(cx,18+i*9,16,4,0,0,7);x.fill()}
  // 營區圍牆與大門
  x.fillStyle='#c8c0a8';x.fillRect(0,64,240,30);x.fillStyle='#a8a088';for(let i=0;i<240;i+=12)x.fillRect(i,64,1,30);x.fillStyle='#8a8070';x.fillRect(0,62,240,3);
  x.fillStyle='#5a6a4a';x.fillRect(40,46,8,48);x.fillRect(92,46,8,48);x.fillStyle='#3a4a2a';x.fillRect(36,42,68,8);
  x.fillStyle='#f4efe0';x.fillRect(48,50,44,10);x.fillStyle='#2a3a1a';x.font='bold 6px sans-serif';x.textAlign='center';x.fillText('國軍營區',70,57.5);
  x.fillStyle='#d8d0b8';x.fillRect(48,70,44,24);for(let i=0;i<6;i++){x.fillStyle='#6a6a6a';x.fillRect(50+i*7,70,2,24)}x.fillStyle='#6a6a6a';x.fillRect(48,70,44,2);x.fillRect(48,82,44,1.5);
  // 衛哨亭與旗桿
  x.fillStyle='#e8e0c8';x.fillRect(108,70,14,22);x.fillStyle='#8a2a2a';x.fillRect(106,66,18,5);x.fillStyle='#9ad0f0';x.fillRect(111,74,8,6);
  x.fillStyle='#aaa';x.fillRect(140,20,1.5,74);const wv=Math.sin(t*4)*1.5;x.fillStyle='#d83a2a';x.beginPath();x.moveTo(141.5,22);x.lineTo(160,24+wv);x.lineTo(160,34+wv);x.lineTo(141.5,32);x.fill();
  // 地面與道路
  x.fillStyle='#8a9a6a';x.fillRect(0,94,240,56);x.fillStyle='#6a6a70';x.fillRect(0,104,240,24);x.fillStyle='#e8e0c0';for(let i=0;i<240;i+=20)x.fillRect(i,115,10,1.5);
  for(let i=0;i<6;i++){const tx=10+i*44;x.fillStyle='#6a4a2a';x.fillRect(tx+170>240?tx:tx,132,3,10);x.fillStyle='#3f8a3a';x.beginPath();x.arc(tx+1.5,128,7,0,7);x.fill()}
  // 主角走路
  let ax,dir,mv=true;if(!morning){ax=70+Math.min(1,t/5.5)*160;dir=3;if(t>5.5)mv=false}else{ax=230-Math.min(1,t/4.8)*160;dir=2;if(t>4.8)mv=false}
  const ay=112;try{drawChar(x,{x:ax-6,y:ay-8,dir,mv,ph:t,lk:ALLEN})}catch(e){}bag(dir==3?ax+3:ax-12,ay-14);
  // 衛兵
  try{if(!alDraw(x,{x:108,y:96,dir:0,mv:false,ph:t*.5},'g03_sheet'))drawChar(x,{x:112,y:96,dir:0,mv:false,ph:t*.5,lk:GL('police',555)})}catch(e){}
  // 字幕
  x.setTransform(1,0,0,1,0,0);x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,0,960,64);x.fillRect(0,536,960,64);
  x.textAlign='center';x.fillStyle='#ffe066';x.font='bold 30px "Noto Sans TC",sans-serif';x.fillText(morning?'週一 07:00　收假回營':'週五 12:00　營區放假！',480,44);
  x.fillStyle='#fff';x.font='22px "Noto Sans TC",sans-serif';
  const subs=morning?[[0,'週末過得真快……'],[2.8,'又要回到部隊了，下個週末見！']]:[[0,'一週的操課終於結束了。'],[3,'背起背包，回家囉！'],[5.8,'（這個週末，要怎麼過呢？）']];
  let sub='';subs.forEach(q=>{if(t>=q[0])sub=q[1]});x.fillText(sub,480,578);x.font='13px sans-serif';x.fillStyle='rgba(255,255,255,.6)';x.textAlign='right';x.fillText('按任意鍵跳過',948,592);x.textAlign='left';
  const fa=Math.max(0,1-t/.6)+Math.max(0,(t-(DUR-.6))/.6);if(fa>0){x.fillStyle=`rgba(0,0,0,${Math.min(1,fa)})`;x.fillRect(0,0,960,600)}
  if(t>=DUR)return end();requestAnimationFrame(frame)}
 requestAnimationFrame(frame)}
// ── 放假：回到家、規劃週末 ──
function wkArrive(){const W=wkState();W.plan=[];W.done={};W.vis={};W.warn=0;
 cutscene('in',()=>{try{if(scene)exitB()}catch(e){}const z=Z.find(z=>z.n=='家');if(z){enterB(z);try{closeDlg()}catch(e){}}
  p.dir=0;st.sta=Math.max(st.sta,60);hud();setTimeout(wkPlan,400)})}
function wkPlan(){const W=wkState(),sel=W.plan;
 const o=WK.PLANS.map((q,i)=>[(sel.includes(i)?'✅ ':q[0]+' ')+q[1],sel.includes(i)?'已加入計畫（再按一次取消）':'',()=>{const j=sel.indexOf(i);if(j>=0)sel.splice(j,1);else if(sel.length<3)sel.push(i);else return toast('最多選 3 件事喔！');wkPlan()}]);
 o.push(['📝 就這樣決定了！',sel.length?`已選 ${sel.length}/3：完成每件事 😊+8`:'至少選一件事',()=>{if(!sel.length)return toast('先選一件想做的事吧！');closeDlg();toast(`📅 第 ${W.n} 個週末開始！計畫：${sel.map(k=>WK.PLANS[k][1]).join('、')}`)},!sel.length]);
 openDlg(`📅 第 ${W.n} 個週末計畫`,`Allen 把背包丟在床邊，攤開手機行事曆：<br>「週五中午到週一早上 07:00，扣掉睡覺……時間不多，要好好安排！」<br><span class="opacity-70 text-xs">選 1～3 件這個週末想做的事，完成會加心情。選單裡隨時可以查看。</span>`,o)}
function wkShow(){const W=wkState(),h=wkLeft();openDlg('📅 本週末計畫',`距離收假還有 <b>${Math.floor(h)} 小時 ${Math.round((h%1)*60)} 分</b><br><br>`+(W.plan.length?W.plan.map(k=>`${W.done[k]?'✅':'⬜'} ${WK.PLANS[k][0]} ${WK.PLANS[k][1]}`).join('<br>'):'還沒有計畫'),[['✏️ 重新規劃','',wkPlan],['返回','',cancel]],true)}
// ── 收假：回營區 → 一週總結 → 下個週末 ──
function wkReturn(){if(MG){MG=null}const W=wkState();const done=W.plan.filter(k=>W.done[k]).length;
 cutscene('out',()=>{try{if(scene)exitB()}catch(e){}
  const pay=typeof WPAY=='number'?WPAY:15000;st.money+=pay;const lnTxt=typeof loanWeek=='function'?loanWeek():'';st.pow=(st.pow||0)+1;st.sta=70;st.joy=Math.max(30,Math.min(100,st.joy+(done>=2?5:-5)));
  // 直接跳到下個週五 12:00
  const d=dow(),days=(4-d+7)%7||7,hrs=days*24+(12-T.hour);window.__advRaw(hrs>0?hrs:hrs+168);
  W.hist.push({n:W.n,done,plan:W.plan.length});W.n++;hud();
  openDlg('🎖️ 一週的部隊生活',`週一到週五都在營區：出操、打靶、站哨、帶新兵……<br><br>上個週末完成計畫：<b>${done}/${W.plan.length||0}</b> ${done>=2?'——充實的假期，心情很好！😊+5':'——好像沒做什麼就收假了……😢-5'}<br>💰 薪餉入帳 <b>+${pay.toLocaleString('en-US')}</b>　💪 體能 +1　⚡ 體力 70<br><br>時間來到 <b>週五 12:00</b>……又放假了！${lnTxt}`,[['🎒 回家！','',()=>{closeDlg();WK.busy=0;wkArrive()}]])})}
// 選單加上「本週末計畫」
{const od0=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts))opts.splice(1,0,['📅 本週末計畫','查看計畫與距離收假時間',()=>wkShow()]);return od.call(this,t,d,opts,...r)};try{return od0.apply(this,arguments)}finally{openDlg=od}}}
// 開始畫面：新遊戲從片頭開始；讀檔若不在休假時間就跳到下個週五
function wkNewGame(){T.year=1;T.day=5;T.hour=12;wkState();try{hud();tm()}catch(e){}wkArrive()}
function wkAfterLoad(){setTimeout(()=>{if(!wkIn()){WK.busy=1;const d=dow(),days=(4-d+7)%7,hrs=days*24+(12-T.hour);window.__advRaw(hrs>0?hrs:hrs+168);WK.busy=0;wkArrive()}},300)}
function startMenu(){const all=['auto',...SV_SLOTS].map(s=>[s,svRead(s)]).filter(q=>q[1]);all.sort((a,b)=>b[1].t-a[1].t);const nw=all[0];SVARM=false;
 const o=[];if(nw)o.push(['▶ 繼續遊戲','最近的存檔：'+svSum(nw[1]),()=>{SVARM=true;svLoad(nw[1])}]);
 if(all.length)o.push(['📂 讀取其他存檔','自動存檔＋3 個欄位',()=>{SVARM=true;svMenu()}]);
 o.push(['🆕 開始新遊戲',all.length?'自動存檔會被新進度取代，手動欄位不受影響':'職業軍人 Allen，只有週末能回到小鎮……',()=>{SVARM=true;closeDlg();wkNewGame()}]);
 o.push(['📥 匯入存檔碼','從備份還原',()=>{SVARM=true;svImport()}]);
 openDlg('🏡 Allen 的像素小鎮',all.length?'要讀取存檔，還是開始新遊戲？':'還沒有任何存檔，開始你的新人生吧！',o)}
if(window.NOTITLE){T.day=5;T.hour=12.5}

{const _sl=svLoad;svLoad=function(d){const r=_sl.apply(this,arguments);if(!(window.NOTITLE&&!window.WKTEST))wkAfterLoad();return r}}
