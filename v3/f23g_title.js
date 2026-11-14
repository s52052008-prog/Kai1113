window.OVK=new Set();window.OVKU=new Set();
addEventListener('keydown',e=>{if(!window.OVL)return;[...OVK].forEach(f=>{try{f(e)}catch(er){console.error(er)}});e.stopImmediatePropagation()},true);
addEventListener('keyup',e=>{if(!window.OVL)return;[...OVKU].forEach(f=>{try{f(e)}catch(er){}});e.stopImmediatePropagation()},true);
/* v5.3 標題畫面 → 按任意鍵 → 讀取存檔／開始新遊戲；選單可回到標題 */
window.TITLE=!window.NOTITLE;if(window.NOTITLE)SVARM=true;
(function(){if(window.NOTITLE)return;const ov=document.createElement('div');ov.id='titleOv';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:#0e0a1a;display:flex;align-items:center;justify-content:center;cursor:pointer;touch-action:manipulation';
 const c=document.createElement('canvas');const TW=480,TH=300,SC=4;c.width=TW*SC;c.height=TH*SC;c.style.cssText='width:min(100vw,160vh);max-height:100vh;aspect-ratio:8/5;image-rendering:pixelated;display:block';
 ov.appendChild(c);document.body.appendChild(ov);const x=c.getContext('2d');x.imageSmoothingEnabled=false;
 let cm=null;try{cm=svCloudMerge()}catch(e){}
 const rr=s=>{let v=s;return()=>(v=(v*16807)%2147483647)/2147483647};
 // 靜態背景：黃昏天空、遠山、小鎮剪影
 const bg=document.createElement('canvas');bg.width=TW;bg.height=TH;const b=bg.getContext('2d');const r=rr(20261017);
 let g=b.createLinearGradient(0,0,0,TH);g.addColorStop(0,'#2a1e5a');g.addColorStop(.45,'#c8648a');g.addColorStop(.7,'#f6b066');g.addColorStop(1,'#f8d890');b.fillStyle=g;b.fillRect(0,0,TW,TH);
 b.fillStyle='#ffe8a0';b.beginPath();b.arc(360,170,26,0,7);b.fill();b.fillStyle='rgba(255,232,160,.25)';b.beginPath();b.arc(360,170,40,0,7);b.fill();
 const mt=(pts,col)=>{b.fillStyle=col;b.beginPath();b.moveTo(0,TH);pts.forEach(q=>b.lineTo(q[0],q[1]));b.lineTo(TW,TH);b.fill()};
 mt([[0,170],[60,130],[120,160],[190,110],[260,155],[330,120],[400,150],[480,125]],'#7a5a8a');
 mt([[0,195],[80,165],[150,185],[230,160],[300,190],[380,168],[480,185]],'#5a4470');
 // 小鎮剪影
 const bx=[[10,40,46],[54,30,62],[88,36,40],[128,44,70],[176,26,50],[206,52,84],[262,34,56],[300,40,44],[344,30,60],[378,48,72],[430,40,50]];
 bx.forEach(q=>{b.fillStyle='#2e2440';b.fillRect(q[0],TH-62-q[2]+30,q[1],q[2]+32);for(let i=0;i<q[2]/10;i++)for(let j=0;j<q[1]/9;j++)if(r()<.55){b.fillStyle=r()<.7?'#ffd870':'#ffb050';b.fillRect(q[0]+3+j*9,TH-58-q[2]+34+i*10,4,5)}});
 b.fillStyle='#2e2440';b.fillRect(236,140,4,40);b.fillRect(230,148,16,4);b.beginPath();b.moveTo(214,182);b.lineTo(238,160);b.lineTo(262,182);b.fill(); // 教會十字架
 b.fillStyle='#3a5a3a';b.fillRect(0,TH-36,TW,36);b.fillStyle='#4a4a58';b.fillRect(0,TH-26,TW,14);for(let i=0;i<TW;i+=24){b.fillStyle='#e8e0c8';b.fillRect(i,TH-20,12,2)}
 for(let i=0;i<TW;i+=40){b.fillStyle='#1e1a2a';b.fillRect(i+18,TH-60,2,26);b.fillStyle='#ffe9a0';b.fillRect(i+15,TH-62,8,3)}
 const L=[typeof ALLEN!='undefined'?ALLEN:null,GL('office',732),GL('default',731)];let t0=performance.now(),run=true,done=false;
 function draw(){if(!run)return;if(window.TITLEDRAW)return;const t=(performance.now()-t0)/1000;x.setTransform(SC,0,0,SC,0,0);x.drawImage(bg,0,0);
  for(let i=0;i<30;i++){const a=(Math.sin(t*2+i*1.7)+1)/2;x.fillStyle=`rgba(255,255,255,${.3+.6*a})`;x.fillRect((i*97)%TW,(i*53)%90,1,1)}
  for(let i=0;i<4;i++){const cx=((t*8+i*140)%(TW+120))-60;x.fillStyle='rgba(255,230,240,.55)';x.beginPath();x.ellipse(cx,40+i*18,30,5,0,0,7);x.fill();x.beginPath();x.ellipse(cx+14,36+i*18,16,4,0,0,7);x.fill()}
  // 路上的小車
  const cx2=((t*60)%(TW+60))-30;x.fillStyle='#e04a3a';x.fillRect(cx2,TH-24,20,7);x.fillStyle='#ffe9a0';x.fillRect(cx2+19,TH-22,2,2);x.fillStyle='#bfe0f4';x.fillRect(cx2+5,TH-27,10,4);x.fillStyle='#222';x.fillRect(cx2+3,TH-17,4,3);x.fillRect(cx2+13,TH-17,4,3);
  // 人物
  try{[[200,TH-40,0],[232,TH-40,1],[262,TH-40,2]].forEach((q,i)=>{if(L[i]&&typeof drawChar=='function')drawChar(x,{x:q[0],y:q[1],dir:0,mv:false,fr:0,lk:L[i],ph:t+i})})}catch(e){}
  // 標題
  x.textAlign='center';x.textBaseline='middle';x.font='900 34px "Noto Sans TC",sans-serif';x.lineJoin='round';
  x.strokeStyle='#2a1208';x.lineWidth=7;x.strokeText('Allen 的像素小鎮',TW/2,88+Math.sin(t*1.6)*2);x.fillStyle='#ffe066';x.fillText('Allen 的像素小鎮',TW/2,88+Math.sin(t*1.6)*2);
  x.font='bold 11px sans-serif';x.lineWidth=4;x.strokeStyle='#2a1208';x.strokeText('～ 一座小鎮，一段人生 ～',TW/2,118);x.fillStyle='#fff3d6';x.fillText('～ 一座小鎮，一段人生 ～',TW/2,118);
  if(Math.floor(t*1.6)%2==0){x.font='bold 12px sans-serif';x.lineWidth=4;x.strokeText('▶ 按任意鍵開始',TW/2,226);x.fillStyle='#fff';x.fillText('▶ 按任意鍵開始',TW/2,226)}
  x.font='8px sans-serif';x.fillStyle='rgba(255,255,255,.6)';x.fillText('v11.5',TW-16,TH-6);
  requestAnimationFrame(draw)}
 requestAnimationFrame(draw);
 async function go(e){if(done)return;done=true;if(e){e.preventDefault&&e.preventDefault();e.stopImmediatePropagation&&e.stopImmediatePropagation()}
  if(window.TITLEDRAW){ov.style.zIndex='40';ov.style.pointerEvents='none';ov.querySelectorAll('button,div').forEach(el=>el.style.display='none')}else{ov.style.transition='opacity .4s';ov.style.opacity='0';setTimeout(()=>{run=false;ov.remove()},420)}
  try{if(cm)await Promise.race([cm,new Promise(r=>setTimeout(r,2500))])}catch(err){}
  window.TITLE=false;Object.keys(keys).forEach(k=>keys[k]=0);startMenu()}
 const kd=e=>{if(!window.TITLE||window.OVL)return;e.preventDefault();e.stopImmediatePropagation();if(!e.repeat){if(window.TITLEDRAW&&!window.TITLEREADY){if(/Enter| |Space/.test(e.key)&&window.titleReveal)titleReveal();return}go(e)}};
 addEventListener('keydown',kd,true);addEventListener('keyup',e=>{if(window.TITLE&&!window.OVL){e.stopImmediatePropagation()}},true);
 ov.addEventListener('pointerdown',go);
})();
function startMenu(){const all=['auto',...SV_SLOTS].map(s=>[s,svRead(s)]).filter(q=>q[1]);all.sort((a,b)=>b[1].t-a[1].t);const nw=all[0];SVARM=false;
 const o=[];if(nw)o.push(['▶ 繼續遊戲','最近的存檔：'+svSum(nw[1]),()=>{SVARM=true;svLoad(nw[1])}]);
 if(all.length)o.push(['📂 讀取其他存檔','自動存檔＋3 個欄位',()=>{SVARM=true;svMenu()}]);
 o.push(['🆕 開始新遊戲',all.length?'自動存檔會被新進度取代，手動欄位不受影響':'從 32 歲的 Allen 開始新的人生',()=>{SVARM=true;closeDlg();toast('新的一天，新的開始！')}]);
 o.push(['📥 匯入存檔碼','從備份還原',()=>{SVARM=true;svImport()}]);
 openDlg('🏡 Allen 的像素小鎮',all.length?'要讀取存檔，還是開始新遊戲？':'還沒有任何存檔，開始你的新人生吧！',o)}
function backToTitle(){openDlg('🏠 回到標題畫面','會先自動存檔，再回到標題畫面。',[['確定','',()=>{try{if(SVARM&&!MG&&!DM.on)svWrite('auto',svSnap())}catch(e){}location.reload()}],['取消','',cancel]],true)}
