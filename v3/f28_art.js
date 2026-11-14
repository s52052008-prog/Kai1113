/* ===== v7.6 使用者美術：主角的家外觀照片 ===== */
function showPic(img,title,html){window.TITLE=true;Object.keys(keys).forEach(q=>keys[q]=0);
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(20,12,6,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;opacity:0;transition:opacity .6s';
 const im=document.createElement('img');im.src=FAMIMG[img];im.style.cssText='display:block;max-width:min(94vw,130vh);max-height:78vh;object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,.6);border:6px solid #fbf7ee';
 const info=document.createElement('div');info.style.cssText='color:#fff6dc;text-align:center;font-size:14px;line-height:1.8;text-shadow:0 2px 0 #000;max-width:92vw';
 info.innerHTML=`<span style="font-size:18px;font-weight:bold">${title}</span><br>${html||''}<div style="opacity:.7;font-size:12px">點一下或按任意鍵繼續</div>`;
 ov.appendChild(im);ov.appendChild(info);document.body.appendChild(ov);requestAnimationFrame(()=>ov.style.opacity='1');
 let done=false;const t0=performance.now();const end=()=>{if(done||performance.now()-t0<700)return;done=true;removeEventListener('keydown',end,true);ov.style.opacity='0';setTimeout(()=>{ov.remove();window.TITLE=false},600)};
 addEventListener('keydown',end,true);ov.addEventListener('pointerdown',end)}
{const _ae=askEnter;askEnter=function(z){if(!z||z.n!='家')return _ae.apply(this,arguments);const od=openDlg;
 openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&T.hour>=6&&T.hour<18){const home=st.yj&&st.yj.home;
   opts.splice(Math.max(0,opts.length-1),0,['🏠 看家的外觀','白天才看得清楚',()=>{closeDlg();showPic('home',home?'🏠 我們的家':'🏠 我的家',home?'陽台的盆栽是家宜種的，曬衣繩上掛著兩個人的衣服。':'五樓公寓，頂樓有一片小小的空中花園。')}])}
  return od.call(this,t,d,opts,...r)};try{return _ae.apply(this,arguments)}finally{openDlg=od}}}
