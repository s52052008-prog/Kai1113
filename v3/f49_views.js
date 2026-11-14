/* v9.8 造景素材欄：可拉寬、縮放縮圖；素材多角度（正面／背面＋鏡像）；願你平安咖啡廳素材 */
// ───────── 素材欄寬度、縮圖大小（記在這台裝置） ─────────
const GZPK='ptown-gzpan-v1';let GZP={w:380,z:1};try{Object.assign(GZP,JSON.parse(localStorage.getItem(GZPK)||'{}'))}catch(e){}
const gzpSave=()=>{try{localStorage.setItem(GZPK,JSON.stringify(GZP))}catch(e){}};
(()=>{const s=document.createElement('style');s.textContent=`
@media (min-width:701px){.gzPan{width:var(--gzw,380px)!important}.gzHint{max-width:calc(100vw - var(--gzw,380px) - 20px)!important}.gzSel{transform:translateX(calc(-50% - var(--gzw,380px)/2))!important;max-width:calc(100vw - var(--gzw,380px) - 20px)!important}}
.gzGrid{grid-template-columns:repeat(auto-fill,minmax(calc(76px * var(--gzz,1)),1fr))!important}
.gzIt{min-height:calc(84px * var(--gzz,1))!important}.gzIt>div:first-child,.gzIt>img{zoom:var(--gzz,1)}
.gzDrag{position:absolute;left:-7px;top:0;bottom:0;width:10px;cursor:ew-resize;z-index:2}.gzDrag::after{content:'';position:absolute;left:3px;top:50%;width:4px;height:48px;margin-top:-24px;border-radius:2px;background:#e8b04a;opacity:.7}
.gzZoom{display:flex;align-items:center;gap:4px;padding:4px 6px 0;font-size:12px}.gzZoom button{font:inherit;font-size:13px;color:#fff6dc;background:#6b4423;border:2px solid #24150a;border-radius:6px;padding:1px 8px;cursor:pointer}
.gzIt .vw{position:absolute;top:2px;right:4px;font-size:11px;background:#2a6ad0;color:#fff;border-radius:8px;padding:0 4px}
@media (max-width:700px){.gzDrag{display:none}}`;document.head.appendChild(s)})();
function gzpApply(){document.documentElement.style.setProperty('--gzw',Math.round(GZP.w)+'px');document.documentElement.style.setProperty('--gzz',GZP.z)}
gzpApply();
{const pan=gzUI.querySelector('.gzPan');pan.style.position='fixed';const d=document.createElement('div');d.className='gzDrag';d.title='拖曳調整素材欄寬度';pan.appendChild(d);
 let drag=null;d.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();drag={x:e.clientX,w:GZP.w};try{d.setPointerCapture(e.pointerId)}catch(_){}});
 d.addEventListener('pointermove',e=>{if(!drag)return;GZP.w=Math.max(260,Math.min(innerWidth*.7,drag.w+(drag.x-e.clientX)));gzpApply()});
 d.addEventListener('pointerup',()=>{if(drag){drag=null;gzpSave()}});
 const z=document.createElement('div');z.className='gzZoom';z.innerHTML='縮圖 <button data-gzz="-1">－</button><span id="gzZv"></span><button data-gzz="1">＋</button><span style="opacity:.7;margin-left:auto">左邊框可拖曳拉寬</span>';
 pan.insertBefore(z,pan.children[1]);const zv=()=>{$e('gzZv').textContent=Math.round(GZP.z*100)+'%'};zv();
 z.addEventListener('click',e=>{const b=e.target.closest('[data-gzz]');if(!b)return;GZP.z=Math.max(.6,Math.min(2.2,Math.round((GZP.z+(+b.dataset.gzz)*.2)*10)/10));gzpApply();gzpSave();zv()})}
// ───────── 多角度素材 ─────────
// VIEWS：素材 → 同一件物品的不同角度（[正面, 背面, ...]）
const VIEWS={},VWN=['正面','背面','側面','側背'];
function vwReg(list){list.forEach(k=>VIEWS[k]=list)}
(function(){const X=window.PKIDX&&PKIDX['45'];if(!X)return;for(let i=0;i+1<X.r.length;i+=2)vwReg(['pk45_'+i,'pk45_'+(i+1)])})();
// 素材欄只顯示每組的第一個角度，其他角度用「🔄 換角度」叫出來
EDCAT.forEach(c=>{if(Array.isArray(c[1]))c[1]=c[1].filter(k=>!VIEWS[k]||VIEWS[k][0]==k)});
const vwLab=(k,mx)=>{const g=VIEWS[k];return (g?VWN[g.indexOf(k)]||('角度'+(g.indexOf(k)+1)):'正面')+(mx?'・鏡像':'')};
// 循環順序：正面 → 正面鏡像 → 背面 → 背面鏡像 → …
function vwNext(k,mx){const g=VIEWS[k]||[k],i=g.indexOf(k);if(!mx)return[k,1];return[g[(i+1)%g.length],0]}
{const _p=gzPanel;gzPanel=function(){_p.apply(this,arguments);try{
 document.querySelectorAll('#gzGrid .gzIt[data-k]').forEach(it=>{const g=VIEWS[it.dataset.k];if(g&&!it.querySelector('.vw')){const s=document.createElement('span');s.className='vw';s.textContent='🔄'+g.length;s.title='有 '+g.length+' 個角度';it.appendChild(s)}});
 const o=$e('gzOpt');if(ED.pal&&o&&(ED.tool=='obj')&&!(typeof GZWALL!='undefined'&&GZWALL[ED.pal])){const d=document.createElement('div');d.className='row';d.innerHTML=`<button data-vwp="1">🔄 換角度</button><span>目前：<b>${vwLab(ED.pal,ED.pmx)}</b></span><span style="opacity:.7">快捷鍵 V</span>`;o.appendChild(d)}}catch(e){}}}
function vwPal(){if(!ED.pal)return;const [k,mx]=vwNext(ED.pal,ED.pmx);ED.pal=k;ED.pmx=mx;gzPanel();toast('🔄 '+gzName(k).replace(/（背面）$/,'')+'：'+vwLab(k,mx))}
gzUI.addEventListener('click',e=>{if(e.target.closest('[data-vwp]')){e.stopImmediatePropagation();vwPal()}},true);
// 已擺好的物件：選取後換角度
function vwSel(){const h=ED.sel;if(!h)return false;
 if(ED.room){const f=h.f;if(!f||(f[0]!='uaf'&&f[0]!='uax'))return toast('這個物件不能換角度'),true;const before=gzRSnap();const k0=Array.isArray(f[5])?f[5][0]:f[5];f[7]=f[7]||{hm:99};
  if(f[0]=='uax'){f[0]='uaf';f[2]=f[2]+8-f[4]}const [k,mx]=vwNext(k0,f[7].mx);f[5]=k;f[7].mx=mx;gzRDone(before);toast('🔄 '+vwLab(k,mx));return true}
 const e=h;if(!e||e.kind=='tree')return false;const g=VIEWS[e.k];
 if(!g||g.length<2)return false;if(!e.add)return toast('原本地圖上的物件只能鏡像；自己放的物件才能換角度'),true;
 gzChange(e,()=>{const [k,mx]=vwNext(e.k,e.mx);if(k!=e.k){const p=gzPose(e);e.k=k;e.spr0=UAI[k];e.mx=0;e.o.spr=UAI[k];gzSet(e,p.cx,p.by,p.s)}gzSetMx(e,mx)});toast('🔄 '+vwLab(e.k,e.mx));return true}
{const _a=gzSelAct;gzSelAct=function(a){if(a=='vw'){if(!vwSel()){gzSelAct('mx')}return}return _a.apply(this,arguments)}}
{const _u=gzSelUI;gzSelUI=function(){_u.apply(this,arguments);try{const box=$e('gzSel');if(box.style.display=='none'||box.querySelector('[data-s="vw"]'))return;const h=ED.sel;const k=ED.room?(h&&h.f&&(Array.isArray(h.f[5])?h.f[5][0]:h.f[5])):(h&&h.k);if(!k||!VIEWS[k])return;
 const b=document.createElement('button');b.dataset.s='vw';b.textContent='🔄 換角度（'+vwLab(k,ED.room?(h.f[7]&&h.f[7].mx):h.mx)+'）';const x=box.querySelector('[data-s="x"]');x?box.insertBefore(b,x):box.appendChild(b)}catch(e){}}}
addEventListener('keydown',ev=>{if(!ED.on||!dlg.hidden)return;const t=ev.target&&ev.target.tagName;if(t=='INPUT'||t=='TEXTAREA')return;if(ev.key=='v'||ev.key=='V'){ev.preventDefault();ev.stopImmediatePropagation();if(ED.sel&&ED.tool=='sel')gzSelAct('vw');else if(ED.pal)vwPal()}},true);
// 名稱：背面版本在搜尋時也找得到
try{Object.keys(VIEWS).forEach(k=>{if(!EDNM[k]&&PKN[k])EDNM[k]=PKN[k][0]})}catch(e){}
