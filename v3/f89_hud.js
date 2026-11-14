/* v13.0 介面改版：左上角人物欄縮成頭像（點開看細節）＋常駐體力／金錢；底部星露谷式快捷欄（1–0、滾輪、拖曳、E 使用、靠近朋友空白鍵送禮） */
(function(){const css=`
#hud.hmin{width:auto!important;padding:3px 9px 3px 3px!important}
.hmn{display:flex;align-items:center;gap:7px;white-space:nowrap}
.hmn canvas{width:34px;height:34px;flex:none;border:2px solid #8a5a2e;border-radius:50%;background:#e8d3a6}
.hmn .st{display:flex;align-items:center;gap:4px;font-weight:800;font-size:11.5px}
.hmn .tr2{width:64px;height:9px;border:1.5px solid #3a2210;border-radius:5px;background:#2a1808;overflow:hidden;position:relative}
.hmn .tr2 i{position:absolute;left:0;top:0;bottom:0}
.hmn .tr2 u{position:absolute;right:0;top:0;bottom:0;background:linear-gradient(#ffe68a,#e8a810)}
.hmn .mon{background:#3a2210;color:#ffe68a;border-radius:9px;padding:0 7px;font-size:11.5px;font-weight:800}
.hmn .wn{font-size:12px;animation:hbBl 1s infinite}
.hmn .ex{font-size:10px;opacity:.65}
@keyframes hbBl{50%{opacity:.35}}
.hchev{position:absolute;right:6px;top:4px;font-size:10px;opacity:.6}
#hb{position:absolute;left:50%;bottom:5px;transform:translateX(-50%);display:flex;gap:3px;z-index:40;padding:3px;border-radius:9px;background:rgba(40,22,8,.78);border:2px solid #150a04;box-shadow:0 2px 0 #150a04;user-select:none;-webkit-user-select:none}
#hb.up{z-index:60}
#hb.off{display:none}
#hb .s{--z:34px;position:relative;width:var(--z);height:var(--z);border-radius:6px;background:linear-gradient(#f6e6b8,#dcc088);border:2px solid #6a4020;display:flex;align-items:center;justify-content:center;font-size:calc(var(--z)*.58);line-height:1;cursor:pointer}
#hb .s.sel{border-color:#ffd84a;box-shadow:0 0 0 2px #ffd84a,0 0 10px #ffd84a;transform:translateY(-3px)}
#hb .s.ov{background:linear-gradient(#fff6c8,#ffe08a)}
#hb .s b{position:absolute;left:2px;top:0;font-size:8.5px;color:#7a5028;font-weight:800}
#hb .s em{position:absolute;right:1px;bottom:0;font-style:normal;font-size:9px;font-weight:800;background:#3a2210;color:#fff6dc;border-radius:6px;padding:0 3px}
#hb .s.eqd::after{content:'穿';position:absolute;right:1px;top:1px;font-size:8px;background:#c33;color:#fff;border-radius:3px;padding:0 2px}
#hb .bag{background:linear-gradient(#c88a4a,#8a5a2e);font-size:calc(var(--z)*.55)}
#hbtip{position:absolute;left:50%;transform:translateX(-50%);bottom:52px;z-index:41;background:rgba(20,10,4,.86);color:#ffe68a;font-weight:800;font-size:12px;padding:3px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;display:none}
.tile[draggable=true]{cursor:grab}
`;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s)})();

// ───────── 人物欄：預設縮成頭像 ─────────
hudOpen=false;
{const _h=hud;hud=function(){_h.apply(this,arguments);try{
 if(hudOpen){hudEl.classList.remove('hmin');if(!hudEl.querySelector('.hchev'))hudEl.insertAdjacentHTML('beforeend','<span class="hchev">▲ 收起</span>');return}
 hudEl.classList.add('hmin');const mx=staMax(),sta=Math.max(0,st.sta),chg=Math.round(st.chg||0),pc=Math.min(1,sta/mx)*100;
 const col=st.sta<=0?'linear-gradient(#999,#666)':sta<mx*.25?'linear-gradient(#ff9a7a,#d44a2a)':'linear-gradient(#6ab8ff,#1f6fd0)';
 const w=[];if(st.hp<30)w.push('<span class="wn" title="健康很低">❤️</span>');if((st.full||0)<15)w.push('<span class="wn" title="肚子餓了">🍚</span>');if(st.joy<20)w.push('<span class="wn" title="心情低落">😞</span>');if(st.sta<=0)w.push('<span class="wn" title="力竭：走路變慢">😵</span>');
 hudEl.innerHTML=`<div class="hmn"><canvas id="av" width="80" height="80" title="點一下展開人物資訊"></canvas>
 <span class="st" title="體力"><img src="ui/i_drop.png" style="width:13px;height:13px" alt="體力"><span class="tr2"><i style="width:${pc}%;background:${col}"></i>${chg>0?`<u style="width:${Math.min(40,chg/mx*100)}%"></u>`:''}</span>${Math.round(sta)}${chg>0?`<span style="color:#e8a810">+${chg}</span>`:''}</span>
 <span class="mon" title="現金">💰 ${st.money.toLocaleString('en-US')}</span>${w.join('')}<span class="ex">▼</span></div>`;
 const a=document.getElementById('av').getContext('2d');a.drawImage(portrait('me',{n:'me'}),0,0,80,80)}catch(e){}}}
hudEl.onclick=e=>{if(window.TITLE)return;hudOpen=!hudOpen;hud()};

// ───────── 快捷欄 ─────────
const HB={sel:0,prev:{}};
const hbS=()=>{if(!Array.isArray(st.hb)){st.hb=[null,null,null,null,null,null,null,null,null,null];Object.keys(st.inv||{}).filter(k=>st.inv[k]>0&&IT[k]).slice(0,10).forEach((k,i)=>st.hb[i]=k)}return st.hb};
const hbEl=document.createElement('div');hbEl.id='hb';document.getElementById('wrap').appendChild(hbEl);
const hbTip=document.createElement('div');hbTip.id='hbtip';document.getElementById('wrap').appendChild(hbTip);
function hbSize(){const w=document.getElementById('wrap').clientWidth;return Math.max(24,Math.min(36,Math.floor((w-40)/11.4)))}
let hbSig='';
function hbRender(force){const A=hbS(),z=hbSize(),sig=JSON.stringify([A.map(k=>k?k+(st.inv[k]||0)+(typeof eqOn=='function'&&EQ[k]&&eqOn(k)?'e':''):''),HB.sel,z,!!(st.veh&&st.veh.bike),!!(st.veh&&st.veh.scoot),p.ride]);if(!force&&sig==hbSig)return;hbSig=sig;
 hbEl.innerHTML=A.map((k,i)=>{const it=k&&IT[k],n=k?st.inv[k]||0:0;return`<div class="s${i==HB.sel?' sel':''}${it&&EQ[k]&&eqOn(k)?' eqd':''}" data-i="${i}" draggable="${it?'true':'false'}" title="${it?it.n+'：'+String(it.d||'').replace(/<[^>]+>/g,'').replace(/"/g,''):'空格（從背包把東西拖進來）'}" style="--z:${z}px"><b>${(i+1)%10}</b>${it?it.i:''}${it&&n>1?`<em>${n}</em>`:''}</div>`}).join('')+(st.veh&&(st.veh.bike||st.veh.scoot)?`<div class="s bag" data-bike="1" title="R：騎上／停車／折疊滑板車" style="--z:${z}px${p.ride?';box-shadow:0 0 0 2px #7ad06a':''}">${st.veh.scoot?'🛴':'🚲'}</div>`:'')+`<div class="s bag" data-bag="1" title="背包（B）" style="--z:${z}px">🎒</div>`;
 const t=document.getElementById('toast');if(t)t.style.bottom=(hbEl.offsetHeight+10)+'px';hbTip.style.bottom=(hbEl.offsetHeight+12)+'px'}
function hbSel(i){HB.sel=(i+10)%10;hbRender();const k=hbS()[HB.sel];if(k&&IT[k])toast(IT[k].i+' '+IT[k].n+(st.inv[k]>1?' ×'+st.inv[k]:'')+'　（E：使用／靠近朋友按空白鍵：送禮）')}
// 背包變化：新拿到的東西自動放進空格；用完的格子清空
function hbSync(){const A=hbS();A.forEach((k,i)=>{if(k&&(!IT[k]||!(st.inv[k]>0)))A[i]=null});
 Object.keys(st.inv||{}).forEach(k=>{const n=st.inv[k]||0,p=HB.prev[k]||0;if(n>0&&p<=0&&IT[k]&&!A.includes(k)&&HB.ready){const e=A.indexOf(null);if(e>=0)A[e]=k}HB.prev[k]=n});
 Object.keys(HB.prev).forEach(k=>{if(!(st.inv[k]>0))HB.prev[k]=0});HB.ready=1}
// 哪個朋友可以送禮
function hbGiftable(k){return k&&IT[k]&&st.inv[k]>0&&!EQ[k]&&IT[k].u!='equip'&&!IT[k].col}
function hbNearFriend(){let L;if(scene){if(!rm)return null;L=rm.ppl}else L=NP;let b=null,bd=scene?38:48;(L||[]).forEach(n=>{if(!n||n.hid||n.vh||typeof n.fr!='string'||!FR[n.fr])return;const d=Math.hypot(n.x-p.x,n.y-p.y);if(d<bd){bd=d;b=n}});return b}
function hbVisible(){return !window.TITLE&&!window.OVL&&!(typeof MG!='undefined'&&MG)&&!(typeof ED!='undefined'&&ED.on)&&!(typeof DM!='undefined'&&DM.on)&&!(typeof TRIP!='undefined'&&TRIP)&&!document.getElementById('vrc')}
setInterval(()=>{try{hbSync();const vis=hbVisible();hbEl.classList.toggle('off',!vis);
 const bagOpen=!dlg.hidden&&dbox.textContent.includes('🎒 背包');hbEl.classList.toggle('up',bagOpen);
 hbRender();window.HBY=vis?Math.ceil((hbEl.offsetHeight+34)*H/Math.max(1,cv.clientHeight)):0;
 const k=hbS()[HB.sel],n=vis&&dlg.hidden&&hbGiftable(k)?hbNearFriend():null;
 if(n&&FRS(n.fr).met&&FRS(n.fr).gd!=dKey()){hbTip.textContent=`🎁 空白鍵：把 ${IT[k].i}${IT[k].n} 送給 ${FR[n.fr].n}`;hbTip.style.display='block'}else hbTip.style.display='none'}catch(e){}},150);

// 使用選中的物品（E 鍵／再點一次格子）
function hbUse(){const k=hbS()[HB.sel];if(!k||!IT[k]||!(st.inv[k]>0))return toast('這一格是空的。打開背包（B），把東西拖到快捷欄。');
 if(EQ[k]){toggleEquip(k);hud();hbRender(1);return toast(eqOn(k)?'👕 穿上了 '+EQ[k].n:'👕 脫下了 '+EQ[k].n)}
 const u=IT[k].u;
 if(u=='keep')return toast(IT[k].i+' '+IT[k].n+'：帶在身上就有效果。靠近朋友按空白鍵可以送禮。');
 if((u&&typeof u=='object')||['capsule','mush','soup','mealprep','lunch'].includes(k)){const ob=openBag;openBag=function(){};try{useItem(k)}finally{openBag=ob}if(!dlg.hidden&&dbox.textContent.includes('🎒 背包'))closeDlg();hud();hbRender(1);return}
 itemMenu(k)}
addEventListener('keydown',e=>{if(e.target&&(e.target.tagName=='INPUT'||e.target.tagName=='TEXTAREA'))return;if(!hbVisible()||!dlg.hidden||e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;
 if(/^[0-9]$/.test(e.key)){e.preventDefault();hbSel(e.key=='0'?9:+e.key-1);return}
 if(e.key=='e'||e.key=='E'){e.preventDefault();hbUse()}});
cv.addEventListener('wheel',e=>{if(!hbVisible()||!dlg.hidden)return;e.preventDefault();hbSel(HB.sel+(e.deltaY>0?1:-1))},{passive:false});
// 點擊：選取；再點一次：使用
hbEl.addEventListener('click',e=>{const s=e.target.closest('.s');if(!s)return;e.stopPropagation();if(s.dataset.bike){if(dlg.hidden)bikeToggle();return}if(s.dataset.bag){if(dlg.hidden)openBag();else if(dbox.textContent.includes('🎒 背包'))closeDlg();return}
 const i=+s.dataset.i;if(!dlg.hidden){if(dbox.textContent.includes('🎒 背包')){HB.sel=i;hbRender(1)}return}if(i==HB.sel)hbUse();else hbSel(i)});
hbEl.addEventListener('contextmenu',e=>{const s=e.target.closest('.s');if(!s||s.dataset.bag||s.dataset.bike)return;e.preventDefault();hbS()[+s.dataset.i]=null;hbRender(1);SVDIRTY=1});
// 拖曳：背包 → 快捷欄、快捷欄互換、拖出去就移除
let hbDrag=null;
hbEl.addEventListener('dragstart',e=>{const s=e.target.closest('.s');if(!s||s.dataset.bag)return;hbDrag={from:+s.dataset.i,ok:0};e.dataTransfer.setData('text/plain','hb:'+s.dataset.i);e.dataTransfer.effectAllowed='move'});
hbEl.addEventListener('dragend',()=>{if(hbDrag&&!hbDrag.ok){hbS()[hbDrag.from]=null;SVDIRTY=1;toast('從快捷欄移除了（東西還在背包裡）')}hbDrag=null;hbRender(1)});
hbEl.addEventListener('dragover',e=>{const s=e.target.closest('.s');if(!s||s.dataset.bag)return;e.preventDefault();hbEl.querySelectorAll('.ov').forEach(x=>x.classList.remove('ov'));s.classList.add('ov')});
hbEl.addEventListener('dragleave',e=>{const s=e.target.closest('.s');s&&s.classList.remove('ov')});
hbEl.addEventListener('drop',e=>{const s=e.target.closest('.s');if(!s||s.dataset.bag)return;e.preventDefault();const A=hbS(),to=+s.dataset.i,d=e.dataTransfer.getData('text/plain')||'';
 if(d.startsWith('hb:')){const f=+d.slice(3);[A[f],A[to]]=[A[to],A[f]];if(hbDrag)hbDrag.ok=1}
 else if(d.startsWith('it:')){const k=d.slice(3);if(!IT[k])return;const j=A.indexOf(k);if(j>=0)A[j]=A[to];A[to]=k;toast(IT[k].i+' '+IT[k].n+' 放進快捷欄第 '+((to+1)%10)+' 格')}
 HB.sel=to;SVDIRTY=1;hbRender(1)});
// 背包格子可以拖
{const _ob=openBag;openBag=function(){const r=_ob.apply(this,arguments);try{const ids=Object.keys(IT).filter(k=>(st.inv[k]||0)>0),bs=[...dbox.querySelectorAll('button')];
 ids.forEach((k,i)=>{const b=bs[i];if(!b)return;b.draggable=true;b.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain','it:'+k);e.dataTransfer.effectAllowed='copy'})});
 const d=dbox.querySelector('.rdesc')||dbox.querySelector('p');if(d&&!d.querySelector('.hbh'))d.insertAdjacentHTML('beforeend','<br><span class="hbh" style="font-size:12px;opacity:.75">🖱️ 把物品拖到下方快捷欄；手機可以點物品 →「📌 放到快捷欄」。</span>')}catch(e){}return r}}
// 物品選單：放到快捷欄（手機用）
{const _im=itemMenu;itemMenu=function(k){const od=openDlg;openDlg=function(t,d,o,...r){if(Array.isArray(o)&&IT[k]){const A=hbS(),i=A.indexOf(k);o.splice(Math.max(0,o.length-1),0,i>=0?['📌 從快捷欄拿下來',`目前在第 ${(i+1)%10} 格`,()=>{A[i]=null;SVDIRTY=1;hbRender(1);closeDlg();openBag()}]:['📌 放到快捷欄',A.includes(null)?'放進第一個空格':`替換第 ${(HB.sel+1)%10} 格（目前選中的格子）`,()=>{let j=A.indexOf(null);if(j<0)j=HB.sel;A[j]=k;HB.sel=j;SVDIRTY=1;hbRender(1);closeDlg();toast('📌 '+IT[k].n+' 放進快捷欄第 '+((j+1)%10)+' 格')}])}return od.call(this,t,d,o,...r)};try{return _im.apply(this,arguments)}finally{openDlg=od}}}

// ───────── 送禮：選中禮物後，對朋友按空白鍵 → 是／否 ─────────
function hbGiftTry(n,orig){try{const id=n&&n.fr,k=hbS()[HB.sel];
 if(typeof id!='string'||!FR[id]||!hbGiftable(k))return orig();const s=FRS(id);if(!s.met)return orig();
 if(s.gd==dKey()){orig();return toast('🎁 今天已經送過 '+FR[id].n+' 禮物了（每人每天一次）')}
 openDlg('🎁 送禮',`要把 <b>${IT[k].i} ${IT[k].n}</b> 送給 <b>${FR[id].n}</b> 嗎？<br><span style="font-size:12px;opacity:.75">（身上還有 ${st.inv[k]} 個）</span>`,[['🎁 是，送給'+FR[id].n,'',()=>{let cap=null;const od=openDlg;openDlg=function(t,d,o){cap=o};try{giftMenu(id,n)}finally{openDlg=od}
   const pre=IT[k].i+' '+IT[k].n+'（',op=cap&&cap.find(o=>o&&typeof o[0]=='string'&&o[0].startsWith(pre));if(op&&!op[3]){op[2]();hbRender(1)}else{closeDlg();toast('送不出去……換個禮物試試')}}],['否，只是聊聊','',()=>{closeDlg();orig()}]])}catch(e){console.error(e);orig()}}
{const _ti=talkIn;talkIn=function(n){const a=arguments,self=this;return hbGiftTry(n,()=>_ti.apply(self,a))}}
{const _tk=talk;talk=function(n){const a=arguments,self=this;return hbGiftTry(n,()=>_tk.apply(self,a))}}
// 讀檔後重畫
{const _sl=svLoad;svLoad=function(){const r=_sl.apply(this,arguments);HB.prev={};HB.ready=0;hbSig='';try{hbS();hbSync();hbRender(1)}catch(e){}return r}}
addEventListener('resize',()=>hbRender(1));
setTimeout(()=>{try{hbS();hbRender(1);hud()}catch(e){}},300);
