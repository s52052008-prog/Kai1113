/* v13.37 拿掉雨傘；刷地板：🧪 滴管吸取、最近用過的排前面 */
// ── 下雨不撐傘 ──
{const _d=drawChar;drawChar=function(c,o){if(o&&o.um)o.um=0;return _d.apply(this,arguments)}}
{const _a=alDraw;alDraw=function(c,o){if(o&&o.um)o.um=0;return _a.apply(this,arguments)}}
// ── 最近用過的地板 ──
let FLREC=[];try{FLREC=JSON.parse(localStorage.getItem('pxFlRecent')||'[]')}catch(e){}
function flUse(k){if(!k)return;FLREC=[k].concat(FLREC.filter(q=>q!=k)).slice(0,8);try{localStorage.setItem('pxFlRecent',JSON.stringify(FLREC))}catch(e){}}
{const s=document.createElement('style');s.textContent=`#gzGrid .flRec{grid-column:1/-1;font-size:12px;opacity:.85;padding:2px 2px 0}#gzGrid .flRec.all{border-top:1px dashed #8a5a2e;margin-top:4px;padding-top:6px}
.gzPick{display:flex;gap:6px;align-items:center;margin:4px 0}.gzPick button.on{background:#ffd84a!important;color:#3a2410!important}body.gzEye #c{cursor:crosshair!important}`;document.head.appendChild(s)}
ED.pick=false;
{const _p=gzPanel;gzPanel=function(){_p.apply(this,arguments);if(ED.tool!='floor')return;try{const grid=$e('gzGrid'),tabs=$e('gzTabs');
 tabs.innerHTML=`<div class="gzPick"><b style="font-size:12px">🎨 地板材質</b><button data-pick="1" class="${ED.pick?'on':''}" title="點地圖上已經刷過的地板，吸取那個材質（也可以按住 Alt 點）">🧪 滴管</button></div>`;
 const rec=FLREC.filter(k=>EDT[k]&&uaOK(k));if(rec.length){const it=k=>`<div class="gzIt${ED.tile==k?' on':''}" data-tile="${k}">${gzThumb(k)}<span>${EDT[k]}</span></div>`;
  grid.insertAdjacentHTML('afterbegin',`<div class="flRec">🕘 最近用過</div>${rec.map(it).join('')}<div class="flRec all">📦 全部地板</div>`)}}catch(e){}}}
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-pick]');if(b){ev.stopImmediatePropagation();ED.pick=!ED.pick;document.body.classList.toggle('gzEye',ED.pick);if(ED.pick)toast('🧪 點一下地圖上刷過的地板，就會選到那個材質');gzRefresh();return}
 const t=ev.target.closest('[data-tile]');if(t)flUse(t.dataset.tile)},true);
function flPickAt(ev){const [x,y]=gzW(ev);let k=null;
 if(ED.room&&typeof rm!='undefined'&&rm){const r=rm,cw=Math.ceil(r.W/8),ci=Math.floor(y/8)*cw+Math.floor(x/8);k=r._efl&&r._efl[ci]}
 else{const ci=Math.floor(y/EDC)*ECW+Math.floor(x/EDC);k=EFL[ci]}
 if(!k){toast('這裡沒有刷過地板（是原本的地面），換個地方點看看');return}
 ED.tile=k;ED.tool='floor';ED.pick=false;document.body.classList.remove('gzEye');flUse(k);gzRefresh();toast('🧪 已選取「'+(EDT[k]||k)+'」，可以直接刷了')}
addEventListener('pointerdown',ev=>{if(!(typeof ED!='undefined'&&ED.on)||ev.target!==cv)return;if(!(ED.pick||(ev.altKey&&(ED.tool=='floor'||ED.tool=='erase'))))return;ev.stopImmediatePropagation();ev.preventDefault();flPickAt(ev)},true);
// 開始刷的時候也記錄
addEventListener('pointerdown',ev=>{if(typeof ED!='undefined'&&ED.on&&ED.tool=='floor'&&ev.target===cv&&!ED.pick&&!ev.altKey&&ED.tile&&FLREC[0]!=ED.tile){flUse(ED.tile);setTimeout(()=>{try{gzPanel()}catch(e){}},50)}},false);
addEventListener('keydown',ev=>{if(ev.key=='Escape'&&ED.pick){ED.pick=false;document.body.classList.remove('gzEye');try{gzRefresh()}catch(e){}}},true);
