/* v13.19 造景模式「🚧 障礙」：看得到所有擋路的範圍，可以移動、拉大小、刪除、自己畫新的；存進開場地圖 */
const SOLE={sig:new Map(),rm:[],sel:null,drag:null};
// 記下每個障礙原本的位置當作編號
function solIndex(){if(SOLE.ready)return;SOLE.ready=1;const seen={};solids.forEach(s=>{let k=Math.round(s.x)+','+Math.round(s.y)+','+Math.round(s.w)+','+Math.round(s.h);if(seen[k]){seen[k]++;k+='#'+seen[k]}else seen[k]=1;SOLE.sig.set(s,k);s._o0=[s.x,s.y,s.w,s.h]})}
{const _i=gzIndex;gzIndex=function(){const r=_i.apply(this,arguments);solIndex();return r}}
// 綁在物件或建築上的障礙（要到那邊調整）
let SOWN=null,SOWT=0;function solOwner(s){const now=performance.now();if(!SOWN||now-SOWT>600){SOWN=new Map();SOWT=now;EO.forEach(e=>{if(e.sol&&!e.rm)SOWN.set(e.sol,e.kind=='tree'?'樹':gzName(e.k))});BALL().forEach(b=>{const q=bSol(b);if(q)SOWN.set(q,'🏢 '+b.n)})}return SOWN.get(s)||null}
// 存檔
{const _s=gzSerialize;gzSerialize=function(){const m=_s.apply(this,arguments);try{const r2=v=>Math.round(v*10)/10,o={rm:[],mv:{},add:[]};
 SOLE.rm.forEach(s=>{const k=SOLE.sig.get(s);if(k)o.rm.push(k)});
 solids.forEach(s=>{if(s._add){o.add.push([r2(s.x),r2(s.y),r2(s.w),r2(s.h)]);return}const k=SOLE.sig.get(s);if(!k||!s._ed)return;o.mv[k]=[r2(s.x),r2(s.y),r2(s.w),r2(s.h)]});
 if(o.rm.length||o.add.length||Object.keys(o.mv).length)m.sol=o}catch(e){}return m}}
function solReset(){SOLE.rm.forEach(s=>{if(!solids.includes(s))solids.push(s)});SOLE.rm=[];for(let i=solids.length-1;i>=0;i--){const s=solids[i];if(s._add)solids.splice(i,1);else if(s._ed&&s._o0){[s.x,s.y,s.w,s.h]=s._o0;s._ed=0}}SOLE.sel=null}
{const _r=gzReset;gzReset=function(){solReset();return _r.apply(this,arguments)}}
{const _a=gzApply;gzApply=function(m){_a.apply(this,arguments);try{solIndex();const S=m&&m.sol;if(!S)return;const by={};SOLE.sig.forEach((k,s)=>by[k]=s);
 (S.rm||[]).forEach(k=>{const s=by[k];if(s&&solids.includes(s)){arrDel(solids,s);SOLE.rm.push(s)}});
 for(const k in S.mv||{}){const s=by[k];if(s){[s.x,s.y,s.w,s.h]=S.mv[k];s._ed=1}}
 (S.add||[]).forEach(q=>solids.push({x:q[0],y:q[1],w:q[2],h:q[3],_add:1}))}catch(e){console.warn(e)}}}
// 工具列按鈕
{const bar=gzUI.querySelector('.gzTop'),ref=bar.querySelector('[data-t="pan"]'),bt=document.createElement('button');bt.dataset.t='sol';bt.title='看到、移動、刪除、畫出擋路的範圍';bt.textContent='🚧 障礙';bar.insertBefore(bt,ref)}
const solSnap=s=>({s,r:[s.x,s.y,s.w,s.h],ed:s._ed});
function solPutBack(q){[q.s.x,q.s.y,q.s.w,q.s.h]=q.r;q.s._ed=q.ed}
function solPick(x,y){let best=null,ba=1e12;solids.forEach(s=>{if(x>=s.x-2&&x<=s.x+s.w+2&&y>=s.y-2&&y<=s.y+s.h+2){const a=s.w*s.h;if(a<ba){ba=a;best=s}}});return best}
function solDel(s){if(!s)return;const own=solOwner(s);
 if(own){const e=EO.find(q=>q.sol===s&&!q.rm);if(e){gzChange(e,()=>gzSetSolid(e,false));SOLE.sel=null;SOWN=null;toast('🚶 「'+own+'」改成可以穿越了');return}
  const b=BALL().find(q=>bSol(q)===s);if(b){bOrig(b);b._s=b._s||BS0();b._s.nosol=1;arrDel(solids,s);SOLE.sel=null;SOWN=null;gzPush(()=>{b._s.nosol=0;if(!solids.includes(s))solids.push(s)});toast('🚶 「'+b.n+'」的牆拿掉了，現在可以穿過去');return}}arrDel(solids,s);if(s._add){}else SOLE.rm.push(s);SOLE.sel=null;gzPush(()=>{solids.push(s);if(!s._add)arrDel(SOLE.rm,s)});toast('🚧 障礙刪掉了，現在可以走過去')}
addEventListener('pointerdown',ev=>{if(!ED.on||ED.room||ED.tool!='sol'||!dlg.hidden)return;const r=cv.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)return;if(ev.target!==cv)return;
 ev.stopImmediatePropagation();ev.preventDefault();if(ev.button==1||ev.button==2){ED.drag={m:'pan',sx:ev.clientX,sy:ev.clientY,cx:ED.cx,cy:ED.cy};return}
 const [x,y]=gzW(ev),hs=6/ED.z,s0=SOLE.sel;
 if(s0&&!solOwner(s0)&&Math.abs(x-(s0.x+s0.w))<hs&&Math.abs(y-(s0.y+s0.h))<hs){SOLE.drag={m:'size',s:s0,st:solSnap(s0)};return}
 const s=solPick(x,y);if(s){SOLE.sel=s;gzRefresh();if(solOwner(s))return;SOLE.drag={m:'move',s,ox:x-s.x,oy:y-s.y,st:solSnap(s)};return}
 SOLE.sel=null;SOLE.drag={m:'new',x0:Math.round(x),y0:Math.round(y),x1:Math.round(x),y1:Math.round(y)};gzRefresh()},true);
addEventListener('pointermove',ev=>{const d=SOLE.drag;if(!d||!ED.on)return;ev.stopImmediatePropagation();const [x,y]=gzW(ev);
 if(d.m=='move'){d.s.x=Math.round(x-d.ox);d.s.y=Math.round(y-d.oy);d.s._ed=1}else if(d.m=='size'){d.s.w=Math.max(3,Math.round(x-d.s.x));d.s.h=Math.max(3,Math.round(y-d.s.y));d.s._ed=1}else{d.x1=Math.round(x);d.y1=Math.round(y)}},true);
addEventListener('pointerup',ev=>{const d=SOLE.drag;if(!d)return;SOLE.drag=null;ev.stopImmediatePropagation();
 if(d.m=='new'){const x=Math.min(d.x0,d.x1),y=Math.min(d.y0,d.y1),w=Math.abs(d.x1-d.x0),h=Math.abs(d.y1-d.y0);if(w<4||h<3){gzRefresh();return}const s={x,y,w,h,_add:1};solids.push(s);SOLE.sel=s;gzPush(()=>{arrDel(solids,s);SOLE.sel=null});toast('🚧 新增了一塊障礙')}
 else{const a=d.st;if(a.r.join()!=[d.s.x,d.s.y,d.s.w,d.s.h].join())gzPush(()=>solPutBack(a))}gzRefresh()},true);
addEventListener('keydown',ev=>{if(!ED.on||ED.tool!='sol'||!SOLE.sel||!dlg.hidden)return;const k=ev.key;if(k=='Delete'||k=='Backspace'){ev.stopImmediatePropagation();ev.preventDefault();solDel(SOLE.sel);gzRefresh()}
 else if(k.startsWith('Arrow')){ev.stopImmediatePropagation();ev.preventDefault();const s=SOLE.sel;if(solOwner(s))return;const st=solSnap(s),n=ev.shiftKey?8:1;if(k=='ArrowLeft')s.x-=n;if(k=='ArrowRight')s.x+=n;if(k=='ArrowUp')s.y-=n;if(k=='ArrowDown')s.y+=n;s._ed=1;gzPush(()=>solPutBack(st))}},true);
// 畫出所有障礙
gzFrame=(f=>function(now){f(now);if(ED.room||ED.tool!='sol')return;try{const z=ED.z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);const X0=ED.cx-20,X1=ED.cx+W/z+20,Y0=ED.cy-20,Y1=ED.cy+H/z+20;
 solids.forEach(s=>{if(s.x+s.w<X0||s.x>X1||s.y+s.h<Y0||s.y>Y1)return;const own=solOwner(s);g.fillStyle=own?'rgba(255,150,40,.22)':'rgba(255,40,40,.32)';g.fillRect(s.x,s.y,s.w,s.h);g.strokeStyle=own?'rgba(255,170,60,.9)':'rgba(255,60,60,.95)';g.lineWidth=1/z;g.strokeRect(s.x,s.y,s.w,s.h)});
 const s=SOLE.sel;if(s){g.setLineDash([4/z,3/z]);g.strokeStyle='#ffd84a';g.lineWidth=2/z;g.strokeRect(s.x-1,s.y-1,s.w+2,s.h+2);g.setLineDash([]);if(!solOwner(s)){const hs=5/z;g.fillStyle='#fff';g.strokeStyle='#3a2210';g.fillRect(s.x+s.w-hs/2,s.y+s.h-hs/2,hs,hs);g.strokeRect(s.x+s.w-hs/2,s.y+s.h-hs/2,hs,hs)}}
 const d=SOLE.drag;if(d&&d.m=='new'){g.fillStyle='rgba(255,216,74,.25)';g.strokeStyle='#ffd84a';g.lineWidth=1.5/z;const x=Math.min(d.x0,d.x1),y=Math.min(d.y0,d.y1);g.fillRect(x,y,Math.abs(d.x1-d.x0),Math.abs(d.y1-d.y0));g.strokeRect(x,y,Math.abs(d.x1-d.x0),Math.abs(d.y1-d.y0))}
 g.restore()}catch(e){}})(gzFrame);
// 面板與提示
gzSelUI=(f=>function(){if(ED.tool!='sol'||ED.room)return f.apply(this,arguments);const box=$e('gzSel'),s=SOLE.sel;if(!s){box.style.display='none';return}box.style.display='flex';const own=solOwner(s);
 box.innerHTML=own?`<b>🚧 障礙</b><span style="opacity:.85">屬於「${own}」，跟著它移動</span><button data-so="del">🗑 刪除（變成可以走）</button><button data-so="x">✕</button>`:`<b>🚧 障礙</b><span style="opacity:.8">${Math.round(s.w)}×${Math.round(s.h)}</span><button data-so="del">🗑 刪除（變成可以走）</button><button data-so="x">✕</button>`})(gzSelUI);
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-so]');if(!b)return;ev.stopImmediatePropagation();if(b.dataset.so=='del')solDel(SOLE.sel);else SOLE.sel=null;gzRefresh()},true);
{const _r=gzRefresh;gzRefresh=function(){_r.apply(this,arguments);try{if(ED.tool!='sol')SOLE.sel=null;if(ED.tool=='sol'&&!ED.room){$e('gzHint').textContent='紅色＝擋路的範圍（可以拖、拉右下角改大小、Delete 刪除）；橘色＝跟著物件或建築的障礙；在空白處拖曳＝畫新的障礙。　｜　Ctrl+Z 復原';
  $e('gzTabs').innerHTML='<div style="font-size:13px;padding:4px">🚧 障礙（擋路的範圍）</div>';$e('gzGrid').innerHTML='<div style="grid-column:1/-1;font-size:12.5px;line-height:1.7;padding:6px;opacity:.9">🟥 <b>紅色</b>：單獨的障礙，可以移動、改大小、刪除。<br>🟧 <b>橘色</b>：屬於某個物件或建築，會跟著它走。物件請用「👆 選取」→「🧱 會擋路／🚶 可穿越」切換；建築請用「🏢 建築」調碰撞範圍。<br>➕ 在空白的地方拖曳，就能畫出新的障礙（例如不想讓人走進去的草地）。<br><br>調完記得按「💾 儲存為開場地圖」。</div>';$e('gzOpt').innerHTML=''}
  else if(ED.tool=='sol'&&ED.room){$e('gzHint').textContent='🟥 紅色＝家具擋路的範圍、🟧 橘色＝牆壁。點紅框選取家具，再用「障礙框」按鈕調大小、位置'}}catch(e){}}}

// 建築的牆被刪掉（nosol）：重新套用時也要拿掉
{const _ba=bApply;bApply=function(b,S2){const r=_ba.apply(this,arguments);try{if(S2&&S2.nosol){const q=bSol(b);if(q)arrDel(solids,q)}}catch(e){}return r}}
