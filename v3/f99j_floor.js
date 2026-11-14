/* v13.13 刷地板：隱藏不要的地板、建築底下與邊框也能刷、移動建築不會蓋掉地板、馬路材質 */

// ── 馬路材質（柏油、黃線、白虛線、斑馬線、邊線） ──
{const T=24,Q=8,mk=(key,name,fn)=>{const c=document.createElement('canvas');c.width=c.height=T*Q;const x=c.getContext('2d');x.scale(Q,Q);
  // 柏油底：用原本的柏油材質，沒有的話自己畫
  if(ltOK('lt_21'))x.drawImage(UAI.lt_21,0,0,T,T);else{x.fillStyle='#4a4d52';x.fillRect(0,0,T,T);for(let i=0;i<90;i++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.12)';x.fillRect(Math.random()*T,Math.random()*T,.6,.6)}}
  fn(x);const im=new Image();im.onload=()=>{try{for(const ci in EFL)if(EFL[ci]==key)gzPaintCell(+ci,key)}catch(e){}};im.src=c.toDataURL();UAI[key]=im;try{UA[key]=im.src}catch(e){}EDT[key]=name;ETS[key]=T};
 const Y='#f2c230',Wt='#f4f4ee';
 mk('rd_asph','🛣️ 柏油',x=>{});
 mk('rd_yel_h','🛣️ 黃雙線（橫）',x=>{x.fillStyle=Y;x.fillRect(0,10.2,T,1.3);x.fillRect(0,12.6,T,1.3)});
 mk('rd_yel_v','🛣️ 黃雙線（直）',x=>{x.fillStyle=Y;x.fillRect(10.2,0,1.3,T);x.fillRect(12.6,0,1.3,T)});
 mk('rd_wd_h','🛣️ 白虛線（橫）',x=>{x.fillStyle=Wt;x.fillRect(2,11.3,12,1.4)});
 mk('rd_wd_v','🛣️ 白虛線（直）',x=>{x.fillStyle=Wt;x.fillRect(11.3,2,1.4,12)});
 mk('rd_ed_h','🛣️ 白邊線（橫）',x=>{x.fillStyle=Wt;x.fillRect(0,11.3,T,1.4)});
 mk('rd_ed_v','🛣️ 白邊線（直）',x=>{x.fillStyle=Wt;x.fillRect(11.3,0,1.4,T)});
 mk('rd_zb_h','🛣️ 斑馬線（橫向馬路用）',x=>{x.fillStyle=Wt;x.fillRect(2,0,8,T);x.fillRect(14,0,8,T)});
 mk('rd_zb_v','🛣️ 斑馬線（直向馬路用）',x=>{x.fillStyle=Wt;x.fillRect(0,2,T,8);x.fillRect(0,14,T,8)});
 mk('rd_stop_h','🛣️ 停止線（橫）',x=>{x.fillStyle=Wt;x.fillRect(0,9.5,T,5)});
 mk('rd_stop_v','🛣️ 停止線（直）',x=>{x.fillStyle=Wt;x.fillRect(9.5,0,5,T)});
}

// ── 地板面板：隱藏不要的地板（收在最下面，平常不佔版面） ──
{const _p=gzPanel;gzPanel=function(){_p.apply(this,arguments);if(ED.tool!='floor')return;const grid=$e('gzGrid'),opt=$e('gzOpt');
  const all=Object.keys(EDT).filter(k=>uaOK(k)),vis=all.filter(k=>!GZHIDE.has(k)),hid=all.filter(k=>GZHIDE.has(k));
  const it=k=>`<div class="gzIt${ED.tile==k?' on':''}" data-tile="${k}">${gzThumb(k)}<span>${EDT[k]}</span></div>`;
  grid.innerHTML=vis.map(it).join('')+(hid.length?`<details style="grid-column:1/-1;margin-top:6px;border-top:1px dashed #8a5a2e;padding-top:4px"><summary style="cursor:pointer;opacity:.8;font-size:12px">🙈 已隱藏的地板（${hid.length}）</summary><div style="display:grid;grid-template-columns:inherit;gap:4px;margin-top:4px">${hid.map(k=>`<div class="gzIt" data-unhidet="${k}" title="點一下還原">${gzThumb(k)}<span>↩️ ${EDT[k]}</span></div>`).join('')}</div></details>`:'');
  try{grid.querySelector('details>div').style.gridTemplateColumns=getComputedStyle(grid).gridTemplateColumns}catch(e){}
  if(ED.tile&&!GZHIDE.has(ED.tile)){const d=document.createElement('div');d.className='row';d.innerHTML=`<button data-hidet="1">🙈 隱藏「${EDT[ED.tile]||ED.tile}」</button><span style="opacity:.75">已經刷上去的不受影響</span>`;opt.appendChild(d)}}}
gzUI.addEventListener('click',ev=>{const h=ev.target.closest('[data-hidet]'),u=ev.target.closest('[data-unhidet]');
 if(h&&ED.tile){ev.stopImmediatePropagation();GZHIDE.add(ED.tile);toast('🙈 已隱藏「'+(EDT[ED.tile]||ED.tile)+'」，收在地板清單最下面');ED.tile=Object.keys(EDT).find(k=>uaOK(k)&&!GZHIDE.has(k))||ED.tile;ED.dirty=1;gzRefresh()}
 else if(u){ev.stopImmediatePropagation();GZHIDE.delete(u.dataset.unhidet);ED.tile=u.dataset.unhidet;toast('↩️ 已還原「'+EDT[u.dataset.unhidet]+'」');ED.dirty=1;gzRefresh()}},true);

// ── 建築底下、建築邊框也可以刷地板 ──
gzCellOK=function(){return true};
// 刷到程式畫的建築時，把建築補畫回去（圖片建築本來就畫在上層，不用補）
{let rp=new Set(),qd=0;const flush=()=>{qd=0;rp.forEach(b=>{try{bPaint(b)}catch(e){}});rp.clear();try{buildBOV()}catch(e){}};
 const _pc=gzPaintCell;gzPaintCell=function(ci,t){_pc.apply(this,arguments);try{const cy=Math.floor(ci/ECW),cx=ci-cy*ECW,r={x:cx*EDC,y:cy*EDC,w:EDC,h:EDC};
  BALL().forEach(b=>{if(b.ua)return;if(hitR(bRect(b),r)){rp.add(b);if(!qd){qd=1;setTimeout(flush,120)}}})}catch(e){}}}
// 移動建築：原本的位置不要被灰色石板蓋掉，刷過的地板補回來
{const _be=bErase;bErase=function(b){const r=bRect(b);_be.apply(this,arguments);try{const c0=Math.max(0,Math.floor(r.x/EDC)),c1=Math.ceil((r.x+r.w)/EDC),r0=Math.max(-Math.ceil(NY/EDC),Math.floor(r.y/EDC)),r1=Math.ceil((r.y+r.h)/EDC);
  for(let j=r0;j<r1;j++)for(let i=c0;i<c1&&i<ECW;i++){const ci=j*ECW+i;EFB.delete(ci);if(EFL[ci])gzPaintCell(ci,EFL[ci])}}catch(e){}}}
