/* v13.38 Delete 刪除障礙／互動點更可靠；素材 90° 旋轉（室外、室內、放置時都可以） */
// ── Delete：障礙、互動點也走主要的刪除流程 ──
{const _a=gzSelAct;gzSelAct=function(a){if(a=='del'&&!ED.room){if(ED.tool=='sol'&&typeof SOLE!='undefined'&&SOLE.sel){solDel(SOLE.sel);return gzRefresh()}if(ED.tool=='spot'&&typeof SPE!='undefined'&&SPE.sel){spDel(SPE.sel);return gzRefresh()}}return _a.apply(this,arguments)}}
// 換場景的黑幕（TRIP）在造景模式下不要吃掉按鍵
addEventListener('keydown',ev=>{if(typeof ED!='undefined'&&ED.on&&(ev.key=='Delete'||ev.key=='Backspace')&&dlg.hidden){const t=ev.target&&ev.target.tagName;if(t=='INPUT'||t=='TEXTAREA')return;
 if(!ED.room&&ED.tool=='sol'&&SOLE.sel){ev.preventDefault();ev.stopImmediatePropagation();solDel(SOLE.sel);gzRefresh()}
 else if(!ED.room&&ED.tool=='spot'&&SPE.sel){ev.preventDefault();ev.stopImmediatePropagation();spDel(SPE.sel);gzRefresh()}}},true);

// ── 旋轉圖片 ──
const ROTC=new Map();
function rotImg(im,r){r=((r%4)+4)%4;if(!r)return im;let m=ROTC.get(im);if(!m){m={};ROTC.set(im,m)}if(m[r])return m[r];const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height,c=document.createElement('canvas');
 c.width=r%2?h:w;c.height=r%2?w:h;const x=c.getContext('2d');x.translate(c.width/2,c.height/2);x.rotate(r*Math.PI/2);x.drawImage(im,-w/2,-h/2);c.naturalWidth=c.width;c.naturalHeight=c.height;c.complete=true;return m[r]=c}

// ════════ 室外物件 ════════
function gzSetRot(e,r){if(!e||e.kind=='tree')return toast('樹不能旋轉');r=((r%4)+4)%4;const p=gzPose(e);if(!e.O0)e.O0={w:e.O.w,h:e.O.h,sol:e.O.sol?Object.assign({},e.O.sol):null};const O0=e.O0;
 e.rot=r;const base=e.mx?gzFlipSpr(e.spr0):e.spr0;e.o.spr=rotImg(base,r);const odd=r%2;e.O.w=odd?O0.h:O0.w;e.O.h=odd?O0.w:O0.h;
 if(O0.sol&&e.O.sol){e.O.sol.w=O0.sol.w*e.O.w/O0.w}gzSet(e,p.cx,p.by,p.s)}
{const _m=gzSetMx;gzSetMx=function(e,f){const r=_m.apply(this,arguments);try{if(e&&e.rot)gzSetRot(e,e.rot)}catch(er){}return r}}
// 復原時把旋轉也還原：重設前先轉回 0
{const _r=gzReset;gzReset=function(){EO.forEach(e=>{if(e.rot)try{gzSetRot(e,0)}catch(er){}});return _r.apply(this,arguments)}}
// 存檔：另外記在 m.rot（存之前先轉回 0，讓原本的格式不受影響）
{const _s=gzSerialize;gzSerialize=function(){const rot=EO.filter(e=>e.rot&&!e.rm),keep=rot.map(e=>e.rot);rot.forEach(e=>gzSetRot(e,0));let m;try{m=_s.apply(this,arguments)}finally{rot.forEach((e,i)=>gzSetRot(e,keep[i]))}
 const R={};let ai=0;EO.forEach(e=>{if(e.add){if(e.rm)return;if(e.rot)R['a'+ai]=e.rot;ai++;return}if(!e.rm&&e.rot)R[e.sig]=e.rot});if(Object.keys(R).length)m.rot=R;return m}}
{const _a=gzApply;gzApply=function(m){const r=_a.apply(this,arguments);try{if(m&&m.rot){const by={};EO.forEach(e=>by[e.sig]=e);const adds=EO.filter(e=>e.add&&!e.rm);for(const k in m.rot){const e=k[0]=='a'&&/^a\d+$/.test(k)?adds[+k.slice(1)]:by[k];if(e)gzSetRot(e,m.rot[k])}}}catch(e){console.error(e)}return r}}
// 按鈕
{const _u=gzSelUI;gzSelUI=function(){_u.apply(this,arguments);try{if(ED.room||ED.tool!='sel'||!ED.sel||ED.sel.kind=='tree')return;const box=$e('gzSel'),mx=box.querySelector('[data-s="mx"]');if(!mx||box.querySelector('[data-s="r90"]'))return;
 mx.insertAdjacentHTML('afterend',`<button data-s="r90" title="順時針轉 90°（快捷鍵 R）">⟳ 轉 90°${ED.sel.rot?'（'+ED.sel.rot*90+'°）':''}</button>`)}catch(e){}}}
{const _a=gzSelAct;gzSelAct=function(a){if(a=='r90'&&!ED.room){const e=ED.sel;if(!e)return;const old=e.rot||0;gzSetRot(e,old+1);gzPush(()=>gzSetRot(e,old));return gzRefresh()}return _a.apply(this,arguments)}}

// ════════ 室內家具 ════════
{const _rr=renderRm;renderRm=function(d,n){const L=(d.fur||[]).filter(f=>f[0]=='uaf'&&f[7]&&f[7].rot);if(!L.length)return _rr(d,n);
 const keep=L.map(f=>[f[5],f[7].mx]);L.forEach(f=>{const k=Array.isArray(f[5])?f[5][0]:f[5];if(!UAI[k])return;let base=UAI[k];if(f[7].mx){const fk=k+'__mx';if(!UAI[fk]&&base.naturalWidth){const c=document.createElement('canvas');c.width=base.naturalWidth;c.height=base.naturalHeight;const x=c.getContext('2d');x.translate(c.width,0);x.scale(-1,1);x.drawImage(base,0,0);c.naturalWidth=c.width;c.naturalHeight=c.height;c.complete=true;UAI[fk]=c}base=UAI[fk]||base}
  const rk=k+(f[7].mx?'__mx':'')+'__r'+f[7].rot;if(!UAI[rk])UAI[rk]=rotImg(base,f[7].rot);f[5]=rk;f[7].mx=0});
 try{return _rr(d,n)}finally{L.forEach((f,i)=>{f[5]=keep[i][0];f[7].mx=keep[i][1]})}}}
function furRot(f,dr){const k=Array.isArray(f[5])?f[5][0]:f[5],im=UAI[k];if(!im||!im.naturalWidth)return;f[7]=f[7]||{};const r0=f[7].rot||0,r1=(((r0+dr)%4)+4)%4;
 const ar=r=>r%2?im.naturalWidth/im.naturalHeight:im.naturalHeight/im.naturalWidth,visH=f[3]*ar(r0)*(f[7].sy||1)/(f[7].sx||1),cx=f[1]+f[3]/2,nw=Math.max(4,visH);f[3]=nw;f[1]=cx-nw/2;f[7].rot=r1}
{const _u=gzRSelUI;gzRSelUI=function(){_u.apply(this,arguments);try{const h=ED.sel;if(!h||!h.f||h.f[0]!='uaf')return;const box=$e('gzSel'),mx=box.querySelector('[data-s="mx"]');if(!mx||box.querySelector('[data-s="r90"]'))return;
 mx.insertAdjacentHTML('afterend',`<button data-s="r90" title="順時針轉 90°（快捷鍵 R）">⟳ 轉 90°${h.f[7]&&h.f[7].rot?'（'+h.f[7].rot*90+'°）':''}</button>`)}catch(e){}}}
{const _a=gzRSelAct;gzRSelAct=function(a){if(a=='r90'){const h=ED.sel;if(!h||!h.f)return;if(h.f[0]!='uaf')return toast('這個家具不能旋轉');const before=gzRSnap();furRot(h.f,1);return gzRDone(before)}return _a.apply(this,arguments)}}

// ════════ 放置素材時也能先轉好 ════════
ED.prot=0;
{const _p=gzPanel;gzPanel=function(){_p.apply(this,arguments);try{if(ED.tool!='obj'||!ED.pal)return;const opt=$e('gzOpt'),b=opt.querySelector('[data-pmx]');if(!b||opt.querySelector('[data-prot]'))return;
 b.insertAdjacentHTML('afterend',`<button data-prot="1" class="${ED.prot?'on':''}" title="放下前先轉好（快捷鍵 R）">⟳ 轉 90°（${ED.prot*90}°）</button>`)}catch(e){}}}
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-prot]');if(b){ev.stopImmediatePropagation();ED.prot=(ED.prot+1)%4;gzPanel()}},true);
{const _a=gzAdd;gzAdd=function(){const n=_a.apply(this,arguments);try{if(n&&ED.on&&ED.tool=='obj'&&ED.prot&&!window.__gzApplying)gzSetRot(n,ED.prot)}catch(e){}return n}}
{const _ap=gzApply;gzApply=function(){window.__gzApplying=1;try{return _ap.apply(this,arguments)}finally{window.__gzApplying=0}}}
{const _n=gzRNew;gzRNew=function(){const f=_n.apply(this,arguments);try{if(f&&f[0]=='uaf'&&ED.prot)furRot(f,ED.prot)}catch(e){}return f}}
// 預覽也跟著轉
{const _fr=gzFrame;gzFrame=function(now){if(!(ED.on&&ED.tool=='obj'&&ED.prot&&ED.pal&&uaOK(ED.pal)))return _fr.apply(this,arguments);const k=ED.pal,im=UAI[k];UAI[k]=rotImg(im,ED.prot);const pw=ED.pw;if(ED.pw)ED.pw=ED.pw*(ED.prot%2?im.naturalHeight/im.naturalWidth:1);try{return _fr.apply(this,arguments)}finally{UAI[k]=im;ED.pw=pw}}}
// 快捷鍵 R
addEventListener('keydown',ev=>{if(!(typeof ED!='undefined'&&ED.on)||!dlg.hidden||ev.ctrlKey||ev.metaKey)return;const t=ev.target&&ev.target.tagName;if(t=='INPUT'||t=='TEXTAREA')return;if(ev.key!='r'&&ev.key!='R')return;
 if(ED.tool=='obj'){ED.prot=(ED.prot+1)%4;gzPanel();toast('⟳ 放置角度 '+ED.prot*90+'°')}else if(ED.tool=='sel'&&ED.sel){gzSelAct('r90')}else return;ev.preventDefault();ev.stopImmediatePropagation()},true);
