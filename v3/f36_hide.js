/* v8.8 素材欄：隱藏不想要的素材（放進「已隱藏」，隨時可還原） */
const GZHIDE=new Set();
const GZHCAT=['🗃️ 已隱藏的素材',[],'🗃️ 回收區','hid'];EDCAT.push(GZHCAT);
const gzHideSync=()=>{GZHCAT[1]=[...GZHIDE]};
{const _p=gzPanel;gzPanel=function(){gzHideSync();_p();const o=$e('gzOpt');if(!o||!ED.pal||ED.tool!='obj'||GZWALL[ED.pal])return;const hid=GZHIDE.has(ED.pal);
 const d=document.createElement('div');d.className='row';d.innerHTML=hid?`<button data-unhide="1">↩️ 還原到素材欄</button><span style="opacity:.75">目前在「已隱藏」</span>`:`<button data-hide="1">🙈 從素材欄隱藏</button><span style="opacity:.75">已經擺在地圖上的不受影響</span>`;o.appendChild(d)}}
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;
 if(b.dataset.hide){GZHIDE.add(ED.pal);toast('🙈 已隱藏「'+gzName(ED.pal)+'」，可在「🗃️ 已隱藏的素材」找回');ED.pal=null;ED.dirty=1;gzRefresh()}
 else if(b.dataset.unhide){GZHIDE.delete(ED.pal);toast('↩️ 已還原「'+gzName(ED.pal)+'」');ED.dirty=1;gzRefresh()}});
{const _s=gzSerialize;gzSerialize=function(){const m=_s();if(GZHIDE.size)m.hide=[...GZHIDE];return m}}
{const _a=gzApply;gzApply=function(m){_a(m);GZHIDE.clear();((m&&m.hide)||[]).forEach(k=>GZHIDE.add(k))}}
