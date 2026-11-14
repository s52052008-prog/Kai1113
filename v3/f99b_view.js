/* v13.8 畫面放大：大螢幕填滿視窗（介面等比放大）、字體大小、鏡頭拉近、手機直拿提示 */
const VIEW={s:1,big:false,f:1,z:1};
try{VIEW.f=+localStorage.getItem('pxFs')||1;const zz=localStorage.getItem('pxZm');VIEW.z=zz?+zz:(((('ontouchstart' in window)||navigator.maxTouchPoints>0)&&Math.min(screen.width,screen.height)<700)?1.25:1)}catch(e){}
{const s=document.createElement('style');s.textContent=`
body.bigv #wrap{width:960px!important;max-width:none!important;zoom:var(--vs,1)}
#hud,#qp,#hb,#tm{zoom:var(--vf,1)}
#rotTip{position:fixed;inset:0;z-index:999999;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#1b1209;color:#fff6dc;font-size:20px;font-weight:bold;text-align:center;padding:24px}
#rotTip .ph{font-size:64px;animation:rotPh 1.6s ease-in-out infinite}
#rotTip button{margin-top:10px;font:inherit;font-size:14px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:6px 16px}
@keyframes rotPh{0%,20%{transform:rotate(0)}50%,80%{transform:rotate(-90deg)}100%{transform:rotate(-90deg)}}
@media (orientation:portrait) and (max-width:700px){body:not(.rotOk) #rotTip{display:flex}}`;document.head.appendChild(s)}
{const d=document.createElement('div');d.id='rotTip';d.innerHTML='<div class="ph">📱</div><div>把手機橫過來玩<br><span style="font-size:14px;opacity:.75;font-weight:normal">橫向畫面比較大，字也看得比較清楚</span></div><button>先這樣直著玩</button>';d.querySelector('button').onclick=()=>document.body.classList.add('rotOk');document.body.appendChild(d)}
function viewFit(){const w=innerWidth,h=innerHeight,big=w>=1000&&h>=620;VIEW.big=big;
 VIEW.s=big?Math.max(1,Math.min(w/966,h/606)):1;document.body.classList.toggle('bigv',big);
 const R=document.documentElement.style;R.setProperty('--vs',VIEW.s);R.setProperty('--vf',VIEW.f);
 const db=document.getElementById('dbox');if(db)db.style.zoom=VIEW.s*VIEW.f}
addEventListener('resize',viewFit);viewFit();setTimeout(viewFit,500);
/* 對話框跟著放大 */
{const _o=openDlg;openDlg=function(){const r=_o.apply(this,arguments);try{const db=document.getElementById('dbox');if(db)db.style.zoom=VIEW.s*VIEW.f}catch(e){}return r}}
/* 小遊戲框（一般大小）也跟著放大；全螢幕版不放大 */
{const _m=mgBox;mgBox=function(){const M=_m.apply(this,arguments);try{const b=M.ov.firstElementChild,k=VIEW.s*VIEW.f;if(k>1.01)b.style.zoom=Math.min(k,(innerHeight-20)/Math.max(300,b.offsetHeight||640))}catch(e){}return M}}
{const _b=mgBoxBig;mgBoxBig=function(){const M=_b.apply(this,arguments);try{M.ov.firstElementChild.style.zoom=''}catch(e){}return M}}
/* 鏡頭拉近：畫完整個畫面後，以主角為中心放大；點擊座標同步換算 */
const ZM={on:false,sx:0,sy:0};
function zmActive(){return VIEW.z>1.01&&!MG&&!window.TITLE&&!(typeof DM!='undefined'&&DM.on)&&!(typeof ED!='undefined'&&ED.on)}
function zmPost(){ZM.on=false;if(!zmActive())return;const z=VIEW.z,vw=W/z,vh=H/z;let px,py,bx0=0,by0=0,bx1=W,by1=H;
 if(scene){if(typeof rm=='undefined'||!rm)return;const ox=rm.W<=W?Math.round((W-rm.W)/2):-Math.round(clamp(p.x+6-W/2,0,rm.W-W)),oy=rm.H<=H?Math.round((H-rm.H)/2):-Math.round(clamp(p.y+4-H/2,0,rm.H-H));
  px=p.x+6+ox;py=p.y+4+oy;bx0=Math.max(0,ox);by0=Math.max(0,oy);bx1=Math.min(W,ox+rm.W);by1=Math.min(H,oy+rm.H)}
 else{px=p.x+6-CAM.x;py=p.y+4-CAM.y}
 const fit=(c,a0,a1,v)=>a1-a0<=v?(a0+a1)/2-v/2:clamp(c-v/2,a0,a1-v);
 let sx=clamp(fit(px,bx0,bx1,vw),0,W-vw),sy=clamp(fit(py,by0,by1,vh),0,H-vh);
 ZM.sx=ZM.sx&&Math.abs(ZM.sx-sx)<40?ZM.sx+(sx-ZM.sx)*.35:sx;ZM.sy=ZM.sy&&Math.abs(ZM.sy-sy)<40?ZM.sy+(sy-ZM.sy)*.35:sy;
 const k=cv.width/W;g.save();g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';
 g.drawImage(cv,ZM.sx*k,ZM.sy*k,vw*k,vh*k,0,0,cv.width,cv.height);g.restore();ZM.on=true}
{const _f=frame0;frame0=function(now){_f(now);try{zmPost()}catch(e){ZM.on=false}}}
{const gb=cv.getBoundingClientRect.bind(cv);cv.getBoundingClientRect=function(){const r=gb();if(!ZM.on)return r;const z=VIEW.z,w=r.width*z,h=r.height*z,l=r.left-ZM.sx/W*w,t=r.top-ZM.sy/H*h;
 return{left:l,top:t,width:w,height:h,right:l+w,bottom:t+h,x:l,y:t}}}
/* 設定選單 */
function viewMenu(back){const fs=[[1,'標準'],[1.15,'大'],[1.3,'特大']],zs=[[1,'1 倍（看得最廣）'],[1.25,'1.25 倍'],[1.5,'1.5 倍（人物最大）']];
 openDlg('🖥️ 畫面與字體',`畫面會自動填滿視窗。看不清楚可以把字放大、或把鏡頭拉近。<br><span style="font-size:12px;opacity:.75">電腦上按 F11 可以全螢幕。</span>`,
  fs.map(q=>[(Math.abs(VIEW.f-q[0])<.01?'✅ ':'')+'🔤 字體：'+q[1],'',()=>{VIEW.f=q[0];try{localStorage.setItem('pxFs',q[0])}catch(e){}viewFit();viewMenu(back)}])
  .concat(zs.map(q=>[(Math.abs(VIEW.z-q[0])<.01?'✅ ':'')+'🔍 鏡頭：'+q[1],'',()=>{VIEW.z=q[0];try{localStorage.setItem('pxZm',q[0])}catch(e){}ZM.sx=ZM.sy=0;viewMenu(back)}]))
  .concat([['返回','',back||closeDlg]]))}
{const _h=phoneHome;phoneHome=function(){_h.apply(this,arguments);try{if(!curDlg)return;const o=curDlg[2],i=o.findIndex(q=>String(q[0]).startsWith('⚙️'));o.splice(i<0?o.length:i+1,0,['🖥️ 畫面','字體、鏡頭',()=>viewMenu(phoneHome),0,1]);openDlg(curDlg[0],curDlg[1],o,0,'grid')}catch(e){console.warn(e)}}}
{const om=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts)){const i=opts.findIndex(q=>/離開|關閉/.test(String(q[0])));opts.splice(i<0?opts.length:i,0,['🖥️ 畫面與字體','看不清楚？放大字體或拉近鏡頭',()=>viewMenu(openMenu)])}return od.call(this,t,d,opts,...r)};try{return om.apply(this,arguments)}finally{openDlg=od}}}
{const s=document.createElement('style');s.textContent='#dlg{align-items:flex-start!important}#dlg>#dbox{margin:auto}';document.head.appendChild(s)}
