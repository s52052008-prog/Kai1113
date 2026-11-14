/* v13.20 造景模式「📍 互動」：看到所有互動點（建築入口、店家、釣魚碼頭、垃圾桶…），可以移動、改大小、關閉，也能自己新增「看板／留言」互動點 */
const SPE={sig:new Map(),rm:[],sel:null,drag:null};
const spGet=o=>{const d=Object.getOwnPropertyDescriptor(o,'x');return !(d&&d.get)};
function spIndex(){if(SPE.ready)return;SPE.ready=1;const seen={};const add=(o,k)=>{if(seen[k]){seen[k]++;k+='#'+seen[k]}else seen[k]=1;SPE.sig.set(o,k);o._o0=[o.x,o.y,o.w,o.h]};
 Z.forEach(z=>add(z,'Z:'+z.n));SPOTS.forEach(s=>{if(spGet(s))add(s,'S:'+String(s.n||'').replace(/[（(].*$/,''))})}
{const _i=gzIndex;gzIndex=function(){const r=_i.apply(this,arguments);spIndex();return r}}
const spList=()=>Z.map(o=>({o,z:1})).concat(SPOTS.filter(spGet).map(o=>({o,z:0})));
const spName=q=>q.z?'🚪 '+q.o.n+'（入口）':(q.o.n||'互動點');
// 自己新增的互動點：看板、留言
function spMake(q){const s={x:q[0],y:q[1],w:q[2],h:q[3],n:q[4]||'📜 看板',txt:q[5]||'',_add:1};s.fn=()=>openDlg(s.n,String(s.txt||'').replace(/\n/g,'<br>'),[['好','',closeDlg]]);return s}
// 存檔
{const _s=gzSerialize;gzSerialize=function(){const m=_s.apply(this,arguments);try{const r2=v=>Math.round(v*10)/10,o={rm:[],mv:{},add:[]};
 SPE.rm.forEach(x=>{const k=SPE.sig.get(x);if(k)o.rm.push(k)});
 spList().forEach(q=>{const s=q.o;if(s._add){o.add.push([r2(s.x),r2(s.y),r2(s.w),r2(s.h),s.n,s.txt,s.img||'',s.env===false?0:1]);return}const k=SPE.sig.get(s);if(k&&s._ed)o.mv[k]=[r2(s.x),r2(s.y),r2(s.w),r2(s.h)]});
 if(o.rm.length||o.add.length||Object.keys(o.mv).length)m.spot=o}catch(e){}return m}}
function spReset(){SPE.rm.forEach(x=>{const A=x._isZ?Z:SPOTS;if(!A.includes(x))A.push(x)});SPE.rm=[];for(let i=SPOTS.length-1;i>=0;i--)if(SPOTS[i]._add)SPOTS.splice(i,1);spList().forEach(q=>{const s=q.o;if(s._ed&&s._o0){[s.x,s.y,s.w,s.h]=s._o0;s._ed=0}});SPE.sel=null}
{const _r=gzReset;gzReset=function(){spReset();return _r.apply(this,arguments)}}
{const _a=gzApply;gzApply=function(m){_a.apply(this,arguments);try{spIndex();const S=m&&m.spot;if(!S)return;const by={};SPE.sig.forEach((k,s)=>by[k]=s);
 (S.rm||[]).forEach(k=>{const s=by[k];if(!s)return;const isZ=Z.includes(s);s._isZ=isZ;arrDel(isZ?Z:SPOTS,s);SPE.rm.push(s)});
 for(const k in S.mv||{}){const s=by[k];if(s){[s.x,s.y,s.w,s.h]=S.mv[k];s._ed=1}}
 (S.add||[]).forEach(q=>SPOTS.push(spMake(q)))}catch(e){console.warn(e)}}}
// 建築移動時，手動調過的入口點保持相對位置（重新記錄）
{const _ba=bApply;bApply=function(b){const ed=Z.filter(z=>z.b===b&&z._ed).map(z=>[z,z.x-(b.x+b.w/2),z.y-b.bot]);_ba.apply(this,arguments);ed.forEach(([z,dx,dy])=>{z.x=b.x+b.w/2+dx;z.y=b.bot+dy})}}
// 工具列按鈕
{const bar=gzUI.querySelector('.gzTop'),ref=bar.querySelector('[data-t="pan"]'),bt=document.createElement('button');bt.dataset.t='spot';bt.title='互動點：移動、改大小、關閉、新增看板';bt.textContent='📍 互動';bar.insertBefore(bt,ref)}
const spSnap=s=>({s,r:[s.x,s.y,s.w,s.h],ed:s._ed});
function spPut(q){[q.s.x,q.s.y,q.s.w,q.s.h]=q.r;q.s._ed=q.ed}
function spPick(x,y){let best=null,ba=1e12;spList().forEach(q=>{const s=q.o;if(x>=s.x-3&&x<=s.x+s.w+3&&y>=s.y-3&&y<=s.y+s.h+3){const a=s.w*s.h;if(a<ba){ba=a;best=q}}});return best}
function spDel(q){if(!q)return;const s=q.o,A=q.z?Z:SPOTS;s._isZ=!!q.z;arrDel(A,s);if(!s._add)SPE.rm.push(s);SPE.sel=null;gzPush(()=>{A.push(s);arrDel(SPE.rm,s)});toast('📍 已關閉「'+spName(q)+'」')}
function spNew(x,y,w,h){openDlg('📜 新增看板／留言','走到這裡按空白鍵，就會跳出這段文字。<br><input id="spT" placeholder="標題（例如：📜 給家宜的小紙條）" style="width:100%;margin-top:8px;font:inherit;padding:6px;border:2px solid #8a5a2e;border-radius:6px"><textarea id="spX" rows="4" placeholder="內容" style="width:100%;margin-top:6px;font:inherit;padding:6px;border:2px solid #8a5a2e;border-radius:6px"></textarea>',
 [['✅ 新增','',()=>{const t=(document.getElementById('spT').value||'').trim()||'📜 看板',c=document.getElementById('spX').value||'';const s=spMake([x,y,w,h,t,c]);SPOTS.push(s);SPE.sig.set(s,'');SPE.sel={o:s,z:0};closeDlg();gzPush(()=>{arrDel(SPOTS,s);SPE.sel=null});gzRefresh();toast('📍 新增了互動點「'+t+'」')}],['取消','',()=>{closeDlg();gzRefresh()}]]);
 setTimeout(()=>{['spT','spX'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>e.stopPropagation())});const t=document.getElementById('spT');t&&t.focus()},60)}
addEventListener('pointerdown',ev=>{if(!ED.on||ED.room||ED.tool!='spot'||!dlg.hidden)return;const r=cv.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)return;if(ev.target!==cv)return;
 ev.stopImmediatePropagation();ev.preventDefault();if(ev.button==1||ev.button==2){ED.drag={m:'pan',sx:ev.clientX,sy:ev.clientY,cx:ED.cx,cy:ED.cy};return}
 const [x,y]=gzW(ev),hs=6/ED.z,q0=SPE.sel;
 if(q0){const s=q0.o;if(Math.abs(x-(s.x+s.w))<hs&&Math.abs(y-(s.y+s.h))<hs){SPE.drag={m:'size',s,st:spSnap(s)};return}}
 const q=spPick(x,y);if(q){SPE.sel=q;gzRefresh();SPE.drag={m:'move',s:q.o,ox:x-q.o.x,oy:y-q.o.y,st:spSnap(q.o)};return}
 SPE.sel=null;SPE.drag={m:'new',x0:Math.round(x),y0:Math.round(y),x1:Math.round(x),y1:Math.round(y)};gzRefresh()},true);
addEventListener('pointermove',ev=>{const d=SPE.drag;if(!d||!ED.on)return;ev.stopImmediatePropagation();const [x,y]=gzW(ev);
 if(d.m=='move'){d.s.x=Math.round(x-d.ox);d.s.y=Math.round(y-d.oy);d.s._ed=1}else if(d.m=='size'){d.s.w=Math.max(6,Math.round(x-d.s.x));d.s.h=Math.max(6,Math.round(y-d.s.y));d.s._ed=1}else{d.x1=Math.round(x);d.y1=Math.round(y)}},true);
addEventListener('pointerup',ev=>{const d=SPE.drag;if(!d)return;SPE.drag=null;ev.stopImmediatePropagation();
 if(d.m=='new'){const x=Math.min(d.x0,d.x1),y=Math.min(d.y0,d.y1),w=Math.abs(d.x1-d.x0),h=Math.abs(d.y1-d.y0);if(w<8||h<6){gzRefresh();return}spNew(x,y,w,h);return}
 const a=d.st;if(a.r.join()!=[d.s.x,d.s.y,d.s.w,d.s.h].join())gzPush(()=>spPut(a));gzRefresh()},true);
addEventListener('keydown',ev=>{if(!ED.on||ED.tool!='spot'||!SPE.sel||!dlg.hidden)return;const k=ev.key;if(k=='Delete'||k=='Backspace'){ev.stopImmediatePropagation();ev.preventDefault();spDel(SPE.sel);gzRefresh()}
 else if(k.startsWith('Arrow')){ev.stopImmediatePropagation();ev.preventDefault();const s=SPE.sel.o,st=spSnap(s),n=ev.shiftKey?8:1;if(k=='ArrowLeft')s.x-=n;if(k=='ArrowRight')s.x+=n;if(k=='ArrowUp')s.y-=n;if(k=='ArrowDown')s.y+=n;s._ed=1;gzPush(()=>spPut(st))}},true);
gzFrame=(f=>function(now){f(now);if(ED.room||ED.tool!='spot')return;try{const z=ED.z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);g.font=`bold ${9/z}px sans-serif`;g.textAlign='center';
 spList().forEach(q=>{const s=q.o;g.fillStyle=q.z?'rgba(60,170,255,.3)':s._add?'rgba(200,120,255,.3)':'rgba(60,220,120,.3)';g.fillRect(s.x,s.y,s.w,s.h);g.strokeStyle=q.z?'#3caaff':s._add?'#c878ff':'#3cdc78';g.lineWidth=1.2/z;g.strokeRect(s.x,s.y,s.w,s.h);
  const nm=spName(q);g.fillStyle='rgba(0,0,0,.6)';const tw=g.measureText(nm).width;g.fillRect(s.x+s.w/2-tw/2-2/z,s.y-12/z,tw+4/z,11/z);g.fillStyle='#fff';g.fillText(nm,s.x+s.w/2,s.y-3.5/z)});
 const q=SPE.sel;if(q){const s=q.o;g.setLineDash([4/z,3/z]);g.strokeStyle='#ffd84a';g.lineWidth=2/z;g.strokeRect(s.x-1,s.y-1,s.w+2,s.h+2);g.setLineDash([]);const hs=5/z;g.fillStyle='#fff';g.strokeStyle='#3a2210';g.fillRect(s.x+s.w-hs/2,s.y+s.h-hs/2,hs,hs);g.strokeRect(s.x+s.w-hs/2,s.y+s.h-hs/2,hs,hs)}
 const d=SPE.drag;if(d&&d.m=='new'){g.fillStyle='rgba(200,120,255,.25)';g.strokeStyle='#c878ff';g.lineWidth=1.5/z;const x=Math.min(d.x0,d.x1),y=Math.min(d.y0,d.y1);g.fillRect(x,y,Math.abs(d.x1-d.x0),Math.abs(d.y1-d.y0));g.strokeRect(x,y,Math.abs(d.x1-d.x0),Math.abs(d.y1-d.y0))}
 g.restore()}catch(e){}})(gzFrame);
gzSelUI=(f=>function(){if(ED.tool!='spot'||ED.room)return f.apply(this,arguments);const box=$e('gzSel'),q=SPE.sel;if(!q){box.style.display='none';return}box.style.display='flex';
 box.innerHTML=`<b>📍 ${spName(q)}</b><span style="opacity:.8">${Math.round(q.o.w)}×${Math.round(q.o.h)}</span>${q.o._add?'<button data-sp="edit">✏️ 改文字</button>':''}<button data-sp="del">🚫 關閉這個互動點</button><button data-sp="x">✕</button>`})(gzSelUI);
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-sp]');if(!b)return;ev.stopImmediatePropagation();const q=SPE.sel;
 if(b.dataset.sp=='del')spDel(q);else if(b.dataset.sp=='edit'&&q){const s=q.o;openDlg('✏️ 改看板文字','',[['✅ 好了','',()=>{s.n=(document.getElementById('spT').value||'').trim()||s.n;s.txt=document.getElementById('spX').value;ED.dirty=1;closeDlg();gzRefresh()}],['取消','',closeDlg]]);
  setTimeout(()=>{const box=dbox.querySelector('.rbody')||dbox;const w=document.createElement('div');w.innerHTML=`<input id="spT" style="width:100%;font:inherit;padding:6px;border:2px solid #8a5a2e;border-radius:6px"><textarea id="spX" rows="4" style="width:100%;margin-top:6px;font:inherit;padding:6px;border:2px solid #8a5a2e;border-radius:6px"></textarea>`;const anchor=dbox.querySelector('button');anchor.parentElement.insertBefore(w,anchor);document.getElementById('spT').value=s.n;document.getElementById('spX').value=s.txt||'';w.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('keydown',e=>e.stopPropagation()))},40)}
 else SPE.sel=null;gzRefresh()},true);
{const _r=gzRefresh;gzRefresh=function(){_r.apply(this,arguments);try{if(ED.tool!='spot')SPE.sel=null;if(ED.tool=='spot'&&!ED.room){$e('gzHint').textContent='拖曳移動互動點、拉右下角改大小、Delete 關閉；在空白處拖曳＝新增看板。　｜　Ctrl+Z 復原';
  $e('gzTabs').innerHTML='<div style="font-size:13px;padding:4px">📍 互動點（走到這裡按空白鍵）</div>';$e('gzGrid').innerHTML='<div style="grid-column:1/-1;font-size:12.5px;line-height:1.7;padding:6px;opacity:.9">🟦 <b>藍色</b>：建築入口，走進去就能進建築。<br>🟩 <b>綠色</b>：店家點餐、釣魚碼頭、垃圾桶、雞鴨舍……<br>🟪 <b>紫色</b>：你自己新增的看板／留言。<br><br>👉 拖曳移動、拉右下角改大小、Delete 關閉。<br>➕ 在空白處拖曳，可以新增看板：寫一段話，走過去按空白鍵就會跳出來（可以藏小驚喜給家宜 💌）。<br><br>調完記得按「💾 儲存為開場地圖」。</div>';$e('gzOpt').innerHTML=''}
  else if(ED.tool=='spot'&&ED.room)$e('gzHint').textContent='室內的互動點請用「👆 選取」，點橘色的互動點拖曳移動。'}catch(e){}}}
