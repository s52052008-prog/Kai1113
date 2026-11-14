/* v8.3 造景模式：介面、操作、繪製 */
(function(){const css=`
#gzUI{display:none;font-family:inherit;color:#fff6dc}
body.ed-on #gzUI{display:block}
body.ed-on #hud,body.ed-on #tm,body.ed-on #qp,body.ed-on #pad,body.ed-on .ed-hide{display:none!important}
body.ed-on #wrap{position:fixed!important;left:0;top:52px;z-index:40;width:min(calc(100vw - 284px),calc((100dvh - 92px)*1.6))!important;max-width:none!important}
body.ed-on #c{cursor:crosshair;touch-action:none}
.gzTop{position:fixed;left:0;right:0;top:0;height:52px;z-index:46;display:flex;align-items:center;gap:4px;padding:0 6px;background:#3a2210;border-bottom:3px solid #1f1208;overflow-x:auto;white-space:nowrap}
.gzTop button,.gzPan button,.gzSel button{font:inherit;font-size:13px;color:#fff6dc;background:#6b4423;border:2px solid #24150a;border-radius:6px;padding:5px 9px;cursor:pointer;flex:none;line-height:1.2}
.gzTop button:hover,.gzPan button:hover,.gzSel button:hover{background:#8a5a2e}
.gzTop button.on,.gzPan button.on{background:#e8b04a;color:#2a1608;border-color:#fff3c4}
.gzTop .sep{width:2px;height:30px;background:#24150a;margin:0 4px;flex:none}
.gzTop .zl{min-width:44px;text-align:center;font-size:12px;flex:none}
.gzTop .save{background:#2f7a3a}.gzTop .save:hover{background:#3c9a4a}.gzTop .save.dirty{box-shadow:0 0 0 2px #ffd84a}
.gzPan{position:fixed;right:0;top:52px;bottom:0;width:280px;z-index:46;background:#2a1a0e;border-left:3px solid #1f1208;display:flex;flex-direction:column}
.gzTabs{display:flex;flex-wrap:wrap;gap:4px;padding:6px}
.gzTabs button{font-size:12px;padding:4px 7px}
.gzGrid{flex:1;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:6px;padding:6px;align-content:start}
.gzIt{background:#4a3018;border:2px solid #24150a;border-radius:8px;padding:4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:84px}
.gzIt:hover{border-color:#e8b04a}.gzIt.on{border-color:#ffd84a;background:#7a5226}
.gzIt img{width:64px;height:56px;object-fit:contain;image-rendering:auto}
.gzIt span{font-size:11px;line-height:1.1;text-align:center}
.gzOpt{padding:6px 8px;border-top:2px solid #1f1208;font-size:12px;display:flex;flex-direction:column;gap:6px}
.gzOpt .row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.gzOpt input[type=range]{flex:1}
.gzHint{position:fixed;left:6px;bottom:6px;z-index:46;max-width:calc(100vw - 300px);font-size:12px;background:rgba(42,26,14,.9);border:2px solid #1f1208;border-radius:6px;padding:4px 8px;pointer-events:none}
.gzSel{position:fixed;left:50%;transform:translateX(calc(-50% - 140px));top:60px;z-index:46;background:rgba(42,26,14,.95);border:2px solid #e8b04a;border-radius:8px;padding:6px 8px;display:none;gap:5px;align-items:center;flex-wrap:wrap;max-width:calc(100vw - 300px);font-size:13px}
.gzSel b{margin-right:4px}
@media (max-width:820px){
 body.ed-on #wrap{width:min(100vw,calc((100dvh - 52px - 230px)*1.6))!important}
 .gzPan{left:0;right:0;top:auto;height:230px;width:auto;border-left:0;border-top:3px solid #1f1208}
 .gzGrid{grid-template-columns:repeat(auto-fill,minmax(64px,1fr))}.gzIt img{width:52px;height:44px}.gzIt{min-height:70px}
 .gzTabs{flex-wrap:nowrap;overflow-x:auto}.gzTabs button{flex:none}
 .gzHint{display:none}.gzSel{transform:translateX(-50%);top:auto;bottom:238px;max-width:96vw}
}`;const st=document.createElement('style');st.textContent=css;document.head.appendChild(st)})();
const gzUI=document.createElement('div');gzUI.id='gzUI';
gzUI.innerHTML=`<div class="gzTop">
 <button data-t="sel" title="點物件選取、拖曳移動">👆 選取</button><button data-t="obj" title="從右邊挑素材，點地圖放下">🧱 放物件</button><button data-t="floor" title="拖曳刷上地板材質">🎨 刷地板</button><button data-t="erase" title="拖曳把地板還原成原本的樣子">🧽 擦地板</button><button data-t="pan" title="拖曳移動視角">✋ 移動視角</button>
 <span class="sep"></span><button data-a="zo" title="縮小（看更大範圍）">－</button><span class="zl" id="gzZ">100%</span><button data-a="zi" title="放大">＋</button><button data-a="all" title="看整張地圖">🗺️ 全圖</button>
 <span class="sep"></span><button data-a="undo" title="Ctrl+Z">↶ 復原</button><button data-a="save" class="save">💾 儲存為開場地圖</button><button data-a="more">⋯ 更多</button><button data-a="exit">✖ 離開</button></div>
<div class="gzPan"><div style="padding:6px 6px 0"><input id="gzQ" type="search" placeholder="🔍 搜尋素材（例如：沙發、冰箱、樹）" style="width:100%;font:inherit;font-size:13px;padding:5px 8px;border-radius:6px;border:2px solid #24150a;background:#fff6dc;color:#2a1608"></div><div class="gzTabs" id="gzTabs"></div><div class="gzGrid" id="gzGrid"></div><div class="gzOpt" id="gzOpt"></div></div>
<div class="gzSel" id="gzSel"></div><div class="gzHint" id="gzHint"></div>`;
document.body.appendChild(gzUI);
const $e=id=>document.getElementById(id);
const ZL=[1.5,1.25,1,.75,.5,.35,.25,.18];
function gzHintTxt(){const t={sel:'點一下物件選取，拖曳移動；方向鍵微調（Shift 一次 8 格）、Delete 刪除。拖曳空白處可移動視角。',obj:ED.pal?`點地圖放下「${gzName(ED.pal)}」，可以連續放；滑鼠滾輪或＋－縮放。`:'先從右邊挑一個素材。',floor:`拖曳刷上「${EDT[ED.tile]||ED.tile}」。建築本體不會被刷到。`,erase:'拖曳把刷過的地板還原。',pan:'拖曳畫面移動視角，也可以用 WASD／方向鍵。'}[ED.tool];$e('gzHint').textContent=t+'　｜　WASD 移動視角・滾輪縮放・Ctrl+Z 復原'}
function gzRefresh(){gzUI.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t==ED.tool));$e('gzZ').textContent=Math.round(ED.z*100)+'%';gzUI.querySelector('[data-a=save]').classList.toggle('dirty',!!ED.dirty);gzPanel();gzSelUI();gzHintTxt()}
function gzPanel(){const tabs=$e('gzTabs'),grid=$e('gzGrid'),opt=$e('gzOpt');
 if(ED.tool=='floor'||ED.tool=='erase'){tabs.innerHTML=`<div style="font-size:12px;padding:2px 2px">${ED.tool=='floor'?'🎨 地板材質':'🧽 擦地板：把刷過的地方還原'}</div>`;
  grid.innerHTML=ED.tool=='floor'?Object.keys(EDT).filter(k=>uaOK(k)).map(k=>`<div class="gzIt${ED.tile==k?' on':''}" data-tile="${k}">${gzThumb(k)}<span>${EDT[k]}</span></div>`).join(''):'';
  opt.innerHTML=`<div class="row">筆刷大小：${[1,2,4,8].map(n=>`<button data-bs="${n}" class="${ED.bs==n?'on':''}">${n}×${n}</button>`).join('')}</div><div style="opacity:.75">1 格 = 8 像素。刷錯了按「↶ 復原」，或用 🧽 擦地板。</div>`;return}
 {let h='',open=0;EDCAT.forEach((c,i)=>{if(c[2]){if(open)h+='</optgroup>';h+=`<optgroup label="${c[2]}">`;open=1}h+=`<option value="${i}"${ED.cat==i?' selected':''}>${c[0]}（${c[1].filter(k=>(uaOK(k)||(typeof GZWALL!='undefined'&&GZWALL[k]))&&(c[3]=='hid'||!GZHIDE.has(k))).length}）</option>`});if(open)h+='</optgroup>';
  tabs.innerHTML=`<select id="gzCat" style="width:100%;font:inherit;font-size:14px;padding:6px;border-radius:6px;border:2px solid #24150a;background:#4a3018;color:#fff6dc">${h}</select><div style="display:flex;gap:4px;margin-top:4px;width:100%"><button data-cs="-1" style="flex:1">◀ 上一類</button><button data-cs="1" style="flex:1">下一類 ▶</button></div>`}
 const q=(ED.q||'').trim();let ks=q?[...new Set(EDCAT.flatMap(c=>c[1]))].filter(k=>gzName(k).includes(q)||k.includes(q)):EDCAT[ED.cat][1];const HC=EDCAT[ED.cat]&&EDCAT[ED.cat][3]=='hid';ks=ks.filter(k=>(uaOK(k)||(typeof GZWALL!='undefined'&&GZWALL[k]&&ED.room))&&(HC&&!q?true:!GZHIDE.has(k)));
 grid.innerHTML=(ks.length?'':`<div style="grid-column:1/-1;opacity:.75;font-size:12px;padding:6px">${q?'找不到「'+q+'」':(EDCAT[ED.cat][0].includes('隔間')?'隔間牆只能在室內使用（進到建築裡再打開造景模式）':'這個分類目前沒有素材')}</div>`)+ks.map(k=>`<div class="gzIt${ED.pal==k?' on':''}" data-k="${k}">${GZWALL&&GZWALL[k]?`<div style="width:64px;height:56px;display:flex;align-items:center;justify-content:center;font-size:30px">${{'#wh':'▬','#wv':'▮','#glass':'🪟','#tatami':'🟩','#rug':'🟥','#door':'🚪'}[k]}</div>`:`${gzThumb(k)}`}<span>${GZWALL&&GZWALL[k]?GZWALL[k][1]:gzName(k)}</span></div>`).join('');
 const pw=ED.pw||(ED.pal?gzNomW(ED.pal):24);
 opt.innerHTML=ED.pal?`<div class="row"><b>${gzName(ED.pal)}</b>${EFLATK.has(ED.pal)?'<span style="opacity:.75">（貼地，人可以走上去）</span>':''}</div><div class="row">大小 <input type="range" min="4" max="300" step="1" value="${Math.round(pw)}" id="gzPw"> <span id="gzPwv">${Math.round(pw)}</span></div><div class="row"><button data-pmx="1" class="${ED.pmx?'on':''}">↔ 鏡像放置${ED.pmx?'：開':'：關'}</button><span style="opacity:.75">快捷鍵 F</span></div>`:'<div style="opacity:.75">挑一個素材，再到地圖上點一下放下去。</div>'}
function gzSelUI(){const box=$e('gzSel'),e=ED.sel;if(!e||e.rm||ED.tool!='sel'){box.style.display='none';return}box.style.display='flex';
 const nm=e.kind=='tree'?'樹':gzName(e.k);
 box.innerHTML=`<b>${nm}</b><button data-s="del">🗑 刪除</button><button data-s="dup">⧉ 複製</button><button data-s="mx">↔ 鏡像</button><button data-s="sm">－ 縮小</button><button data-s="lg">＋ 放大</button>`+
  (e.kind=='tree'?'':`<button data-s="sd">${e.sd?'🧱 會擋路':'🚶 可穿越'}</button><button data-s="fl">${e.flat?'🟫 貼地':'⬆ 立體'}</button>`)+`<button data-s="x">✕</button>`}
// ── 復原 ──
const gzState=e=>{const p=gzPose(e);return{cx:p.cx,by:p.by,s:p.s,rm:e.rm,flat:e.flat,sd:e.sd,mx:e.mx||0}};
function gzRestore(e,q){if(q.rm!=e.rm){e.rm=q.rm;gzShow(e,!q.rm)}gzSetMx(e,q.mx);gzSet(e,q.cx,q.by,q.s);if(e.kind!='tree')gzSetFlat(e,q.flat);if(e.sol)gzSetSolid(e,q.sd)}
function gzPush(u){ED.undo.push(u);if(ED.undo.length>300)ED.undo.shift();ED.dirty=1;gzRefresh()}
function gzUndo(){const u=ED.undo.pop();if(!u)return toast('沒有可以復原的動作');u();ED.dirty=1;gzRefresh()}
function gzChange(e,fn){const a=gzState(e);fn();const b=gzState(e);if(JSON.stringify(a)!=JSON.stringify(b))gzPush(()=>gzRestore(e,a))}
// ── 選取與操作 ──
function gzPick(x,y){let best=null,bb=-1e9;EO.forEach(e=>{if(e.rm)return;const b=gzBox(e);if(x<b.x||x>b.x+b.w||y<b.y||y>b.y+b.h)return;const sc=(e.flat?-1e6:0)+b.y+b.h;if(sc>bb){bb=sc;best=e}});return best}
function gzSelAct(a){const e=ED.sel;if(!e)return;
 if(a=='x'){ED.sel=null}
 else if(a=='del'){const q=gzState(e);e.rm=1;gzShow(e,0);ED.sel=null;gzPush(()=>gzRestore(e,q))}
 else if(a=='dup'){const p=gzPose(e),b=gzBox(e);let k=e.kind=='tree'?(UATREE[e.o.k]||'t_oak'):e.k;if(!uaOK(k))return toast('這個物件不能複製');const n=gzAdd(k,p.cx+b.w*.6+4,p.by+4,b.w,e.flat);if(n){if(!e.sd)gzSetSolid(n,0);if(e.mx)gzSetMx(n,1);ED.sel=n;gzPush(()=>{n.rm=1;gzShow(n,0)})}}
 else if(a=='sm'||a=='lg'){gzChange(e,()=>{const p=gzPose(e);gzSet(e,p.cx,p.by,Math.max(.2,Math.min(5,p.s*(a=='lg'?1.1:1/1.1))))})}
 else if(a=='mx'){gzChange(e,()=>gzSetMx(e,!e.mx))}
 else if(a=='sd'){gzChange(e,()=>gzSetSolid(e,!e.sd))}
 else if(a=='fl'){gzChange(e,()=>gzSetFlat(e,!e.flat))}
 gzRefresh()}
function gzNudge(dx,dy){const e=ED.sel;if(!e)return;gzChange(e,()=>{const p=gzPose(e);gzSet(e,p.cx+dx,p.by+dy,p.s)})}
// ── 地板筆刷 ──
let gzStroke=null;
function gzBrush(x,y){const n=ED.bs,c0=Math.floor(x/EDC-n/2+.5),r0=Math.floor(y/EDC-n/2+.5);
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const cx=c0+i,cy=r0+j;if(cx<0||cy*EDC<-NY||cx>=ECW||cy*EDC>=WH)continue;const ci=cy*ECW+cx;
  if(!gzCellOK(ci))continue;const want=ED.tool=='floor'?ED.tile:null,cur=EFL[ci]||null;if(cur==want)continue;
  if(gzStroke&&!gzStroke.has(ci))gzStroke.set(ci,cur);gzPaintCell(ci,want)}}
// ── 視角 ──
function gzClampCam(){const vw=W/ED.z,vh=H/ED.z;ED.cx=vw>=WW?(WW-vw)/2:Math.max(0,Math.min(WW-vw,ED.cx));ED.cy=vh>=WH+NY?(WH-NY-vh)/2:Math.max(-NY,Math.min(WH-vh,ED.cy))}
function gzZoom(nz,ax,ay){const vw=W/ED.z,vh=H/ED.z;ax=ax??ED.cx+vw/2;ay=ay??ED.cy+vh/2;const fx=(ax-ED.cx)/vw,fy=(ay-ED.cy)/vh;ED.z=nz;ED.cx=ax-fx*W/nz;ED.cy=ay-fy*H/nz;gzClampCam();gzRefresh()}
const gzW=e=>{const r=cv.getBoundingClientRect();return[ED.cx+(e.clientX-r.left)/r.width*W/ED.z,ED.cy+(e.clientY-r.top)/r.height*H/ED.z]};
// ── 進入／離開 ──
function gzEnter(){if(scene)return toast('請先走到戶外，再打開造景模式');if(!ED.ready)gzIndex();closeDlg();
 ED.on=1;ED.cx=CAM.x;ED.cy=CAM.y;ED.z=1;ED.sel=null;ED.keys={};for(const k in keys)keys[k]=0;
 document.body.classList.add('ed-on');document.querySelectorAll('body > *').forEach(el=>{if(el.id!='wrap'&&el.id!='gzUI'&&el.id!='dlg'&&el.tagName!='SCRIPT'&&el.tagName!='STYLE'&&getComputedStyle(el).position=='fixed'&&!el.classList.contains('ed-hide')){el.classList.add('ed-hide');el.dataset.edh=1}});
 gzClampCam();gzRefresh();toast('🛠️ 造景模式：挑素材、放物件、刷地板，完成後按「💾 儲存為開場地圖」')}
function gzExit(force){if(ED.dirty&&!force)return openDlg('🛠️ 離開造景模式',`還有變更沒有儲存。<br>不儲存的話，這次的變更只會留到關閉遊戲為止。`,[['💾 儲存後離開','',async()=>{closeDlg();await gzSave();gzExit(1)}],['不儲存，直接離開','',()=>{closeDlg();gzExit(1)}],['繼續編輯','',closeDlg]]);
 ED.on=0;ED.sel=null;ED.drag=null;document.body.classList.remove('ed-on');document.querySelectorAll('[data-edh]').forEach(el=>{el.classList.remove('ed-hide');delete el.dataset.edh});
 if(staticBlk()){toast('角色被物件擋住了，已移到附近空地');for(let r=8;r<200;r+=8){let ok=0;for(let a=0;a<16&&!ok;a++){const ox=p.x,oy=p.y;p.x=ox+Math.cos(a*.39)*r;p.y=oy+Math.sin(a*.39)*r;if(!staticBlk())ok=1;else{p.x=ox;p.y=oy}}if(ok)break}}
 try{hud()}catch(e){}}
async function gzSave(){const m=gzSerialize();try{localStorage.setItem(EDLS,JSON.stringify(m))}catch(e){}ED.cur=m.t;ED.dirty=0;gzRefresh();toast('💾 儲存中……');
 const r=await gzSaveRemote(m);
 if(r=='ok')toast('✅ 已儲存！之後打開遊戲，開場就是這張地圖');
 else openDlg('💾 已存在這台裝置',`地圖已經存在這台裝置的瀏覽器裡，下次在這裡打開就會是新地圖。<br><br>${r=='nodb'?'目前沒有連上共用資料庫（例如直接開檔案的時候），':'共用資料庫沒有寫入成功（'+r+'），'}所以別人的裝置還看不到。<br>要讓每個人都看到，可以按「⋯ 更多 → 📤 匯出地圖代碼」，把代碼傳給 Claude 做成內建地圖。`,[['好','',closeDlg]])}
function gzMore(){openDlg('🛠️ 造景模式',`物件 ${EO.filter(e=>!e.rm).length} 個（新增 ${EO.filter(e=>e.add&&!e.rm).length}、刪除 ${EO.filter(e=>!e.add&&e.rm).length}）・地板 ${Object.keys(EFL).length} 格`,[
 ['📤 匯出地圖代碼','複製後傳給 Claude，可以做成內建的預設地圖',()=>{const s=JSON.stringify(gzSerialize());openDlg('📤 地圖代碼',`<textarea id="gzTa" style="width:100%;height:160px;font-size:11px;color:#222" readonly>${s.replace(/</g,'&lt;')}</textarea><div style="font-size:12px;opacity:.8">共 ${s.length.toLocaleString()} 字</div>`,[['📋 複製','',()=>{const t=$e('gzTa');t.select();try{navigator.clipboard.writeText(s).then(()=>toast('已複製！'),()=>{document.execCommand('copy');toast('已複製！')})}catch(e){document.execCommand('copy');toast('已複製！')}}],['關閉','',closeDlg]],true)}],
 ['📥 匯入地圖代碼','貼上之前匯出的代碼',()=>{openDlg('📥 匯入地圖代碼','<textarea id="gzTi" style="width:100%;height:160px;font-size:11px;color:#222"></textarea>',[['匯入','',()=>{try{const m=JSON.parse($e('gzTi').value);gzApply(m);ED.dirty=1;closeDlg();gzRefresh();toast('✅ 已匯入，記得按儲存')}catch(e){toast('代碼格式不對')}}],['取消','',closeDlg]],true)}],
 ['♻️ 還原成原始地圖','清掉所有造景變更（儲存後才會生效）',()=>openDlg('♻️ 還原成原始地圖','確定要清掉所有物件和地板的變更嗎？',[['確定還原','',()=>{gzReset();ED.undo=[];ED.dirty=1;closeDlg();gzRefresh();toast('已還原，按「💾 儲存」後就會成為開場地圖')}],['取消','',closeDlg]],true)],
 ['❔ 操作說明','',()=>openDlg('❔ 造景模式操作',`<b>👆 選取</b>：點物件選取，拖曳移動；上方會出現刪除、複製、大小、擋路、貼地的按鈕。方向鍵微調位置（按住 Shift 一次 8 格），Delete 刪除，<b>↔ 鏡像</b>（快捷鍵 F）可以左右翻轉。<br><b>🧱 放物件</b>：右邊分類裡挑素材，到地圖上點一下就放下，可以連續放；下面的拉桿調整大小，「↔ 鏡像放置」打開就會直接放翻轉的版本。室內家具、夜市攤販、車輛也都在分類裡。<br><b>🎨 刷地板</b>：挑材質和筆刷大小，在地圖上拖曳。建築不會被刷到。<br><b>🧽 擦地板</b>：把刷過的地方還原。<br><b>視角</b>：WASD 或方向鍵移動，滾輪或 ＋－ 縮放，🗺️ 看全圖；也可以按住空白處拖曳。<br><b>🧱 會擋路／🚶 可穿越</b>：決定角色能不能穿過去。<b>🟫 貼地</b>：畫在最底層，人可以踩在上面走。<br><b>💾 儲存為開場地圖</b>：之後打開遊戲就是這張地圖。`,[['好','',closeDlg]],true)],
 ['返回','',closeDlg]])}
// ── 事件 ──
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('button,.gzIt');if(!b)return;
 if(b.dataset.t){ED.tool=b.dataset.t;if(ED.tool!='sel')ED.sel=null;gzRefresh();return}
 const a=b.dataset.a;if(a){if(a=='zo'||a=='zi'){const i=ZL.findIndex(z=>Math.abs(z-ED.z)<.01);gzZoom(ZL[Math.max(0,Math.min(ZL.length-1,(i<0?2:i)+(a=='zo'?1:-1)))])}
  else if(a=='all')gzZoom(ZL[ZL.length-1]);else if(a=='undo')gzUndo();else if(a=='save')gzSave();else if(a=='more')gzMore();else if(a=='exit')gzExit();return}
 if(b.dataset.cs){ED.cat=(ED.cat+(+b.dataset.cs)+EDCAT.length)%EDCAT.length;ED.q='';gzPanel();return}
 if(b.dataset.cat!=null){ED.cat=+b.dataset.cat;ED.q='';const si=$e('gzQ');if(si)si.value='';gzPanel();return}
 if(b.dataset.k){ED.pal=b.dataset.k;ED.pw=ED.pal.startsWith('lf_')?LFW(ED.pal):GZWALL[ED.pal]?0:gzNomW(ED.pal);ED.tool='obj';ED.sel=null;gzRefresh();return}
 if(b.dataset.tile){ED.tile=b.dataset.tile;ED.tool='floor';gzRefresh();return}
 if(b.dataset.pmx){ED.pmx=!ED.pmx;gzPanel();return}
 if(b.dataset.bs){ED.bs=+b.dataset.bs;gzPanel();return}
 if(b.dataset.s){gzSelAct(b.dataset.s)}});
gzUI.addEventListener('change',ev=>{if(ev.target.id=='gzCat'){ED.cat=+ev.target.value;ED.q='';const si=$e('gzQ');if(si)si.value='';if(ED.tool!='obj'&&ED.tool!='sel'&&!ED.bpick)ED.tool='obj';gzRefresh()}});
gzUI.addEventListener('input',ev=>{if(ev.target.id=='gzQ'){ED.q=ev.target.value;if(ED.tool!='obj'&&ED.tool!='sel'&&!ED.bpick)ED.tool='obj';gzPanel();return}if(ev.target.id=='gzPw'){ED.pw=+ev.target.value;$e('gzPwv').textContent=ED.pw}});
cv.addEventListener('pointerdown',ev=>{if(!ED.on)return;if(ED.tool=='bld'&&!ED.room&&window.bldDown){ev.stopImmediatePropagation();ev.preventDefault();return bldDown(ev)}ev.stopImmediatePropagation();ev.preventDefault();if(!dlg.hidden)return;try{cv.setPointerCapture(ev.pointerId)}catch(e){}
 const [x,y]=gzW(ev);ED.mx=x;ED.my=y;const pan=()=>{ED.drag={m:'pan',sx:ev.clientX,sy:ev.clientY,cx:ED.cx,cy:ED.cy}};
 if(ev.button==1||ev.button==2||ED.tool=='pan')return pan();
 if(ED.room)return gzRDown(x,y,pan);
 if(ED.tool=='sel'){const e=gzPick(x,y);ED.sel=e;gzRefresh();if(e){const p=gzPose(e);ED.drag={m:'move',e,ox:x-p.cx,oy:y-p.by,st:gzState(e)}}else pan();return}
 if(ED.tool=='obj'){if(!ED.pal)return toast('先從右邊挑一個素材');const w=ED.pw||gzNomW(ED.pal);const n=gzAdd(ED.pal,Math.round(x),Math.round(y),w,EFLATK.has(ED.pal));if(n&&ED.pmx)gzSetMx(n,1);if(n){gzPush(()=>{n.rm=1;gzShow(n,0)})}return}
 if(ED.tool=='floor'||ED.tool=='erase'){gzStroke=new Map();ED.drag={m:'paint'};gzBrush(x,y)}},true);
addEventListener('pointermove',ev=>{if(!ED.on)return;const r=cv.getBoundingClientRect();ED.inCv=ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom;const [x,y]=gzW(ev);ED.mx=x;ED.my=y;const d=ED.drag;if(!d)return;if(ED.room&&d.m!='pan')return gzRMove(d,x,y);
 if(d.m=='pan'){ED.cx=d.cx-(ev.clientX-d.sx)/r.width*W/ED.z;ED.cy=d.cy-(ev.clientY-d.sy)/r.height*H/ED.z;gzClampCam()}
 else if(d.m=='move'){const p=gzPose(d.e);gzSet(d.e,Math.round(x-d.ox),Math.round(y-d.oy),p.s)}
 else if(d.m=='paint')gzBrush(x,y)});
addEventListener('pointerup',ev=>{if(!ED.on||!ED.drag)return;const d=ED.drag;ED.drag=null;if(ED.room)return gzRUp(d);
 if(d.m=='move'){const a=d.st,b=gzState(d.e);if(a.cx!=b.cx||a.by!=b.by){const e=d.e;gzPush(()=>gzRestore(e,a))}}
 if(d.m=='paint'&&gzStroke&&gzStroke.size){const s=gzStroke;gzPush(()=>{s.forEach((t,ci)=>gzPaintCell(ci,t))})}gzStroke=null});
cv.addEventListener('contextmenu',ev=>{if(ED.on)ev.preventDefault()});
cv.addEventListener('wheel',ev=>{if(!ED.on)return;ev.preventDefault();const [x,y]=gzW(ev);const nz=Math.max(.18,Math.min(1.5,ED.z*(ev.deltaY<0?1.15:1/1.15)));gzZoom(nz,x,y)},{passive:false});
addEventListener('keydown',ev=>{if(!ED.on||!dlg.hidden)return;const k=ev.key,t=ev.target&&ev.target.tagName;if(t=='INPUT'||t=='TEXTAREA')return;
 if((ev.ctrlKey||ev.metaKey)&&(k=='z'||k=='Z')){gzUndo()}
 else if(k=='Delete'||k=='Backspace'){gzSelAct('del')}
 else if(k=='f'||k=='F'){if(ED.sel&&ED.tool=='sel')gzSelAct('mx');else if(ED.tool=='obj'){ED.pmx=!ED.pmx;gzPanel()}}
 else if(k=='Escape'){if(ED.sel){ED.sel=null;gzRefresh()}else gzExit()}
 else if(k=='+'||k=='='){gzUI.querySelector('[data-a=zi]').click()}else if(k=='-'||k=='_'){gzUI.querySelector('[data-a=zo]').click()}
 else if(ED.sel&&k.startsWith('Arrow')){const s=ev.shiftKey?8:1;gzNudge(k=='ArrowLeft'?-s:k=='ArrowRight'?s:0,k=='ArrowUp'?-s:k=='ArrowDown'?s:0)}
 else{const m=MAP[k]||MAP[ev.code];if(m)ED.keys[m]=1;else return}
 ev.preventDefault();ev.stopImmediatePropagation()},true);
addEventListener('keyup',ev=>{if(!ED.on)return;const m=MAP[ev.key]||MAP[ev.code];if(m){ED.keys[m]=0;ev.stopImmediatePropagation()}},true);
// ── 繪製 ──
let gzLast=0;
function gzFrame(now){NOW=now;const dt=Math.min(.05,Math.max(0,(now-(gzLast||now))/1000));gzLast=now;
 const kx=(ED.keys.right?1:0)-(ED.keys.left?1:0),ky=(ED.keys.down?1:0)-(ED.keys.up?1:0);if(kx||ky){ED.cx+=kx*420*dt/ED.z;ED.cy+=ky*420*dt/ED.z;gzClampCam()}
 const z=ED.z,vw=W/z,vh=H/z,cx=ED.cx,cy=ED.cy;
 g.setTransform(K,0,0,K,0,0);g.fillStyle='#1a120a';g.fillRect(0,0,W,H);
 g.setTransform(K*z,0,0,K*z,0,0);
 const sx=Math.max(0,cx),sy=Math.max(-NY,cy),sw=Math.min(WW,cx+vw)-sx,sh=Math.min(WH,cy+vh)-sy;
 g.imageSmoothingEnabled=false;g.drawImage(S0,sx*KS,(sy+NY)*KS,sw*KS,sh*KS,sx-cx,sy-cy,sw,sh);g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(S,sx*KS,(sy+NY)*KS,sw*KS,sh*KS,sx-cx,sy-cy,sw,sh);
 g.save();g.translate(-cx,-cy);const X0=cx-80,X1=cx+vw+80,Y0=cy-100,Y1=cy+vh+100,iv=(x,y,w,h)=>x+w>X0&&x<X1&&y+h>Y0&&y<Y1;
 FLATS.forEach(d=>{if(iv(d.x,d.y,d.w,d.h))g.drawImage(d.spr,d.x,d.y,d.w,d.h)});
 const a=[];trees.forEach(t=>{if(iv(t.x-30,t.y-40,90,90))a.push({y:t.y+36,f:()=>drawTree(g,t)})});
 DEC.forEach(d=>{if(iv(d.x,d.y,d.w,d.h))a.push({y:d.y+d.h+(d.z||0),f:()=>{g.fillStyle='rgba(30,18,0,.15)';g.beginPath();g.ellipse(d.x+d.w/2+1,(d.by==null?d.y+d.h:d.by)-1.5,d.w*.4,Math.max(1.8,d.h*.07),0,0,7);g.fill();g.drawImage(d.spr,d.x,d.y,d.w,d.h)}})});
 BOV.forEach(o=>{if(iv(o.x,o.y,o.w,o.h))a.push({y:o.by,f:()=>bovDraw(g,o)})});
 a.sort((u,v)=>u.y-v.y).forEach(i=>i.f());
 const lw=1/z;
 if(ED.tool=='floor'||ED.tool=='erase'){g.fillStyle='rgba(220,40,40,.13)';BOV.forEach(o=>{if(iv(o.x,o.y,o.w,o.h))g.fillRect(o.x+2,o.y,o.w-4,o.h-1)});
  if(z>=.75){g.strokeStyle='rgba(255,255,255,.1)';g.lineWidth=lw;g.beginPath();for(let x=Math.floor(X0/EDC)*EDC;x<X1;x+=EDC){g.moveTo(x,Y0);g.lineTo(x,Y1)}for(let y=Math.floor(Y0/EDC)*EDC;y<Y1;y+=EDC){g.moveTo(X0,y);g.lineTo(X1,y)}g.stroke()}
  if(ED.inCv){const n=ED.bs,c0=Math.floor(ED.mx/EDC-n/2+.5),r0=Math.floor(ED.my/EDC-n/2+.5);g.strokeStyle=ED.tool=='floor'?'#ffd84a':'#7ad0ff';g.lineWidth=2*lw;g.strokeRect(c0*EDC,r0*EDC,n*EDC,n*EDC)}}
 if(ED.tool=='sel'&&ED.inCv&&!ED.drag){const h=gzPick(ED.mx,ED.my);if(h&&h!=ED.sel){const b=gzBox(h);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=lw;g.strokeRect(b.x,b.y,b.w,b.h)}}
 if(ED.sel&&!ED.sel.rm){const e=ED.sel,b=gzBox(e);g.setLineDash([4*lw,3*lw]);g.strokeStyle='#ffd84a';g.lineWidth=2*lw;g.strokeRect(b.x-1,b.y-1,b.w+2,b.h+2);g.setLineDash([]);
  if(e.sd&&e.sol&&solids.includes(e.sol)){g.fillStyle='rgba(255,60,60,.35)';g.fillRect(e.sol.x,e.sol.y,e.sol.w,e.sol.h)}}
 if(ED.tool=='obj'&&ED.pal&&ED.inCv&&uaOK(ED.pal)){const im=UAI[ED.pal],w=ED.pw||gzNomW(ED.pal),h=w*im.naturalHeight/im.naturalWidth,x=Math.round(ED.mx),y=Math.round(ED.my);g.globalAlpha=.65;if(ED.pmx){g.save();g.translate(x,0);g.scale(-1,1);g.drawImage(im,-w/2,y-h,w,h);g.restore()}else g.drawImage(im,x-w/2,y-h,w,h);g.globalAlpha=1;g.strokeStyle='#ffd84a';g.lineWidth=lw;g.strokeRect(x-w/2,y-h,w,h);g.fillStyle='#ffd84a';g.fillRect(x-1.5*lw,y-1.5*lw,3*lw,3*lw)}
 g.restore();
 g.setTransform(K,0,0,K,0,0);g.fillStyle='rgba(0,0,0,.45)';g.fillRect(0,H-12,128,12);g.fillStyle='#fff6dc';g.font='7px sans-serif';g.textAlign='left';g.fillText(`🛠️ 造景模式　x ${Math.round(ED.mx)}  y ${Math.round(ED.my)}`,4,H-3.5)}
{const _f0=frame0;frame0=function(now){if(ED.on)return gzFrame(now);gzLast=0;return _f0(now)}}
// 選單：加入造景模式
{const od0=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts))opts.splice(opts.length-1,0,['🛠️ 造景模式（上帝視角）','自由擺放物件、刷地板，儲存成開場地圖',()=>gzEnter()]);return od.call(this,t,d,opts,...r)};try{return od0.apply(this,arguments)}finally{openDlg=od}}}
