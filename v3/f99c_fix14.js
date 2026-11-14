/* v13.9 試玩回饋：禮物密碼＋煙火背景、結束不卡、拿掉週末三選一、選單整併（任務詳情／回憶合併／刪職業／存檔不重複） */

// ── 1. 生日禮物：開始畫面要輸入密碼；背景加煙火、流星、愛心；結束更順 ──
const GIFTPW='1113520';
function giftAsk(onOk,back){openDlg('🎁 給家宜的生日禮物',`這份禮物上了鎖 🔒<br>請輸入密碼：<br>
 <input id="gpw" type="password" inputmode="numeric" autocomplete="off" maxlength="12" style="margin-top:8px;width:100%;font:inherit;font-size:20px;letter-spacing:6px;text-align:center;padding:8px;border:2px solid #8a5a2e;border-radius:8px;background:#fffaf0;color:#3a2410">
 <div id="gpwMsg" style="margin-top:6px;font-size:13px;min-height:1.2em;color:#c0392b"></div>
 <div style="margin-top:4px;font-size:12.5px;opacity:.75">💡 提示：生日＋520</div>`,
 [['🎁 打開禮物','',()=>giftCheck(onOk)],['返回','',back||closeDlg]]);
 setTimeout(()=>{const i=document.getElementById('gpw');if(!i)return;i.focus();i.addEventListener('keydown',e=>{e.stopPropagation();if(e.key=='Enter'){e.preventDefault();giftCheck(onOk)}})},80)}
function giftCheck(onOk){const i=document.getElementById('gpw'),m=document.getElementById('gpwMsg');if(!i)return;const v=i.value.replace(/\D/g,'');
 if(v==GIFTPW){closeDlg();onOk()}else{m.textContent=v?'密碼不對喔，再想想看～ 💭':'先輸入密碼喔';i.value='';i.focus();i.animate&&i.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:240,iterations:2})}}
// 開始畫面的禮物入口改成先問密碼
{const _s=startMenu;startMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&String(t).includes('像素小鎮')){opts=opts.map(q=>String(q[0]).includes('給家宜的生日禮物')?[q[0],q[1],()=>giftAsk(()=>memShow(()=>startMenu()),startMenu)]:q)}return od.call(this,t,d,opts,...r)};try{return _s.apply(this,arguments)}finally{openDlg=od}}}

// 煙火背景（畫在照片後面）
function memFx(ov){const c=document.createElement('canvas');c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';ov.insertBefore(c,ov.firstChild);
 const x=c.getContext('2d');let Wd=0,Hd=0,dp=1;const fit=()=>{dp=Math.min(2,devicePixelRatio||1);Wd=innerWidth;Hd=innerHeight;c.width=Wd*dp;c.height=Hd*dp};fit();addEventListener('resize',fit);
 const COL=['#ff8fb1','#ffd36e','#8fe3ff','#ffffff','#c9a0ff','#ff6f7d','#9dffb0'];const P=[],R=[],ST=[],HT=[];
 for(let i=0;i<110;i++)ST.push({x:Math.random(),y:Math.random()*.75,s:Math.random()<.15?2:1,p:Math.random()*6.3,v:.5+Math.random()*1.5});
 let last=performance.now(),nextFw=600,nextSh=3000,nextHt=500,alive=true,boost=0;
 const launch=()=>{const side=Math.random()<.5?Math.random()*.3:.7+Math.random()*.3,big=boost>0;R.push({x:side*Wd,y:Hd+4,vx:(Math.random()-.5)*40,vy:-(Hd*(.55+Math.random()*.35))*1.15,t:.95+Math.random()*.35,c:COL[Math.floor(Math.random()*COL.length)],big})};
 const burst=r=>{const n=r.big?110:80,heart=Math.random()<.3,sp=(r.big?300:230)*(.75+Math.random()*.5)*Math.max(.7,Math.min(1.4,Hd/800));
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;let vx,vy;if(heart){const t=a;vx=16*Math.pow(Math.sin(t),3);vy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));vx*=sp/17;vy*=sp/17}else{const k=.75+Math.random()*.25;vx=Math.cos(a)*sp*k;vy=Math.sin(a)*sp*k}
   P.push({x:r.x,y:r.y,vx,vy,l:1.3+Math.random()*.6,m:1.3+Math.random()*.6,c:Math.random()<.2?'#fff':r.c,s:Math.random()<.35?5:4,tr:[]})}};
 const heartPix=(cx,cy,s,col,a)=>{const H=['01100110','11111111','11111111','01111110','00111100','00011000'];x.globalAlpha=a;x.fillStyle=col;H.forEach((row,j)=>{for(let i=0;i<8;i++)if(row[i]=='1')x.fillRect(Math.round(cx+(i-4)*s),Math.round(cy+(j-3)*s),s,s)})};
 const fr=now=>{if(!alive||!ov.isConnected){removeEventListener('resize',fit);return}const dt=Math.min(.05,(now-last)/1000);last=now;
  x.setTransform(dp,0,0,dp,0,0);x.globalCompositeOperation='source-over';x.clearRect(0,0,Wd,Hd);
  // 星星閃爍
  ST.forEach(s=>{s.p+=dt*s.v;x.globalAlpha=.25+.55*(.5+.5*Math.sin(s.p));x.fillStyle='#fff';x.fillRect(Math.round(s.x*Wd),Math.round(s.y*Hd),s.s,s.s)});
  // 流星
  nextSh-=dt*1000;if(nextSh<0){nextSh=3500+Math.random()*4000;R.push({sh:1,x:Math.random()*Wd*.7+Wd*.2,y:Math.random()*Hd*.3,vx:-Wd*.55,vy:Hd*.22,t:.9})}
  // 煙火
  nextFw-=dt*1000*(boost>0?1.8:1);if(nextFw<0){nextFw=900+Math.random()*1100;launch();if(Math.random()<.35)setTimeout(launch,250)}
  for(let i=R.length-1;i>=0;i--){const r=R[i];r.t-=dt;r.x+=r.vx*dt;r.y+=r.vy*dt;
   if(r.sh){x.globalAlpha=Math.max(0,r.t);const g=x.createLinearGradient(r.x,r.y,r.x+60,r.y-24);g.addColorStop(0,'#fff');g.addColorStop(1,'rgba(255,255,255,0)');x.strokeStyle=g;x.lineWidth=2;x.beginPath();x.moveTo(r.x,r.y);x.lineTo(r.x+60,r.y-24);x.stroke();if(r.t<=0)R.splice(i,1);continue}
   r.vy+=Hd*.55*dt;x.globalAlpha=1;x.fillStyle=r.c;x.fillRect(Math.round(r.x),Math.round(r.y),3,7);x.globalAlpha=.45;x.fillRect(Math.round(r.x),Math.round(r.y)+8,3,10);
   if(r.t<=0||r.vy>-10){burst(r);R.splice(i,1)}}
  x.globalCompositeOperation='lighter';for(let i=P.length-1;i>=0;i--){const q=P[i];q.l-=dt;q.vx*=.982;q.vy=q.vy*.982+70*dt;q.tr.push(q.x,q.y);if(q.tr.length>10)q.tr.splice(0,2);q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.l<=0){P.splice(i,1);continue}
   const a=Math.min(1,q.l/q.m*1.5)*(q.l<.35&&Math.random()<.4?.3:1);x.fillStyle=q.c;for(let k=0;k<q.tr.length;k+=2){x.globalAlpha=a*(k+2)/q.tr.length*.35;x.fillRect(Math.round(q.tr[k]),Math.round(q.tr[k+1]),q.s-1,q.s-1)}
   x.globalAlpha=a*.25;x.fillRect(Math.round(q.x)-q.s,Math.round(q.y)-q.s,q.s*3,q.s*3);x.globalAlpha=a;x.fillRect(Math.round(q.x),Math.round(q.y),q.s,q.s)}x.globalCompositeOperation='source-over';
  // 慢慢往上飄的像素愛心
  nextHt-=dt*1000;if(nextHt<0){nextHt=900+Math.random()*900;HT.push({x:Math.random()*Wd,y:Hd+20,v:28+Math.random()*30,s:Math.random()<.5?4:3,c:Math.random()<.5?'#ff8fb1':'#ffc0d6',ph:Math.random()*6})}
  for(let i=HT.length-1;i>=0;i--){const h=HT[i];h.y-=h.v*dt;h.ph+=dt;if(h.y<-30){HT.splice(i,1);continue}heartPix(h.x+Math.sin(h.ph)*10,h.y,h.s,h.c,.45*Math.min(1,(Hd-h.y)/120))}
  x.globalAlpha=1;if(boost>0)boost-=dt;requestAnimationFrame(fr)};
 requestAnimationFrame(fr);return{boost(s){boost=s},stop(){alive=false}}}

{const _m=memShow;memShow=function(onEnd){const pt=!!window.TITLE;let fx=null;
 const ret=_m.call(this,()=>{try{fx&&fx.stop()}catch(e){}if(pt)window.TITLE=true;onEnd&&onEnd()});
 try{const ov=[...document.body.children].reverse().find(d=>d.querySelector&&d.querySelector('.mdots'));if(ov){
   ov.style.background='radial-gradient(ellipse at 50% 120%,#3b1d4a 0%,#1a0f2e 45%,#0a0714 100%)';fx=memFx(ov);
   // 結束按鈕：一按就有反應、淡出更快
   const st0=document.createElement('style');st0.textContent='.mend{z-index:5}.mend:active{transform:translateX(-50%) scale(.94)}';ov.appendChild(st0);
   new MutationObserver((ms,ob)=>{const b=ov.querySelector('.mend');if(b&&!b._fx){b._fx=1;fx.boost(6);
     b.addEventListener('click',()=>{b.textContent='💞';b.style.pointerEvents='none';ov.style.transition='opacity .7s'},{capture:true})}
     if(ov.querySelector('.mlet')&&!ov._lt){ov._lt=1;fx.boost(3)}}).observe(ov,{childList:true})}}catch(e){console.warn(e)}
 return ret}}

// ── 2. 放假回家不再跳「選三件事」 ──
wkPlan=function(){try{const W=wkState();W.plan=[];toast(`📅 第 ${W.n} 個週末開始！要做什麼，看右上角的任務或選單「📜 任務詳情」`)}catch(e){}};

// ── 3. 任務詳情（取代本週末計畫）：主線、支線的細部內容與提示 ──
function questView(){let main='',side=[];try{const qo=qOpen,qt=QTAB;qOpen=true;QTAB=0;qpanel();const box=qp.querySelector('.qhd');main=box?box.nextElementSibling.innerHTML:'';qOpen=qo;QTAB=qt;qpanel()}catch(e){}
 try{side=qSide()}catch(e){}let hint='';try{if(typeof proOn=='function'&&proOn())hint=proHint()}catch(e){}
 let left='';try{const h=wkLeft();left=`⏳ 距離收假還有 <b>${Math.floor(h)} 小時 ${Math.round((h%1)*60)} 分</b>`}catch(e){}
 const sec=(t,b)=>`<div style="margin-top:10px;padding:8px 10px;border:2px solid #d9b98a;border-radius:8px;background:#fffaf0"><div style="font-weight:900;margin-bottom:4px">${t}</div>${b}</div>`;
 openDlg('📜 任務詳情',left+sec('📖 主線',(main.replace(/ ▸$/,'')||'<span style="opacity:.7">目前沒有主線任務</span>')+(hint&&!main.includes('💡')?`<div style="margin-top:6px;padding:6px 8px;background:#fff3c4;border-radius:6px">💡 ${hint}</div>`:''))
  +sec(`🧩 支線（${side.length}）`,side.length?side.map(x=>`<div style="margin-top:3px">${x}</div>`).join(''):'<span style="opacity:.7">目前沒有支線任務</span>'),[['返回','',cancel]],true)}

// ── 3b. 「我們的回憶」併進回憶相簿 ──
function memOK(){try{return !!(st.memSeen||yjS().wed)}catch(e){return false}}
{const _a=albumMenu;albumMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📷 回憶相簿'&&Array.isArray(opts)&&memOK()){opts=opts.slice();if(!(st.album||[]).length)d='完成劇情和活動後，合照也會收進這裡。';opts.unshift(['💝 我們的回憶','照片輪播＋寫給家宜的一段話（約 3 分鐘）',()=>{closeDlg();memShow()}])}return od.call(this,t,d,opts,...r)};try{return _a.apply(this,arguments)}finally{openDlg=od}}}

// ── 4、5. 選單整理：拿掉本週末計畫／我們的回憶／職業與進度，加任務詳情；同一項不會出現兩次 ──
{const _od=openDlg;openDlg=function(t,d,o,...r){if(t=='📋 選單'&&Array.isArray(o)){const seen=new Set();
  o=o.filter(q=>{const l=String(q[0]).replace(/^\s*(✅\s*)?/,'');if(/本週末計畫|我們的回憶|職業與進度/.test(l))return false;const k=l.replace(/[（(].*$/,'').trim();if(seen.has(k))return false;seen.add(k);return true});
  if(!o.some(q=>/任務詳情/.test(q[0])))o.splice(1,0,['📜 任務詳情','主線、支線的細部內容與下一步提示',()=>questView()])}return _od.call(this,t,d,o,...r)}}
// 序一還沒見到家宜之前，支線不要先劇透她
{const _qs=qSide;qSide=function(){const L=_qs.apply(this,arguments);try{if(typeof proOn=='function'&&proOn()&&st.pro.ch==1&&!st.pro.m1)return L.filter(x=>!/家宜/.test(x))}catch(e){}return L}}
