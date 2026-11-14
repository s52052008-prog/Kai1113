/* v13.31 室內家具障礙框可以調大小、進房間不會被卡住 */
// ── 自訂障礙框：存在家具陣列第 11 格 [dx,dy,w,h]（相對家具位置）──
function sbDef(f){const o=(typeof mkSol0=='function'?mkSol0([f]):[])[0];return o||{x:f[1],y:f[2],w:f[3],h:f[4]}}
function sbRect(f){const s=f[11];if(Array.isArray(s))return{x:f[1]+s[0],y:f[2]+s[1],w:s[2],h:s[3]};return sbDef(f)}
const mkSol0=mkSol;
function sbFix(fur,sol){if(!sol)return sol;fur.forEach(f=>{if(!Array.isArray(f))return;const d=mkSol0([f])[0];if(!d)return;const o=sol.find(s=>!s._f&&Math.abs(s.x-d.x)<.5&&Math.abs(s.w-d.w)<.5&&Math.abs(s.y-d.y)<12);if(!o)return;o._f=f;if(Array.isArray(f[11])){const r=sbRect(f);o.x=r.x;o.y=r.y;o.w=r.w;o.h=r.h}});return sol}
mkSol=function(fur){return sbFix(fur,mkSol0(fur))};
{const _rb=rmBuild;rmBuild=function(n){const r=_rb.apply(this,arguments);try{if(rm&&rm.fur&&rm.sol)sbFix(rm.fur,rm.sol)}catch(e){}return r}}
// ── 室內造景：選到家具時多一排「🟥 障礙框」按鈕 ──
{const _u=gzRSelUI;gzRSelUI=function(){_u.apply(this,arguments);try{const h=ED.sel;if(!h||!h.f||ED.tool!='sel')return;const f=h.f;if(!furnSolid(f))return;const box=$e('gzSel'),r=sbRect(f);
 const d=document.createElement('div');d.style.cssText='flex-basis:100%;display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin-top:3px;padding-top:4px;border-top:1px dashed rgba(255,255,255,.3)';
 d.innerHTML=`<b style="color:#ff8a8a">🟥 障礙框</b><span style="opacity:.7">${Math.round(r.w)}×${Math.round(r.h)}</span>｜寬<button data-s="sb:w-">－</button><button data-s="sb:w+">＋</button>高<button data-s="sb:h-">－</button><button data-s="sb:h+">＋</button>｜移動<button data-s="sb:l">←</button><button data-s="sb:r">→</button><button data-s="sb:u">↑</button><button data-s="sb:d">↓</button><button data-s="sb:0">↺ 重設</button>`;box.appendChild(d)}catch(e){}}}
{const _a=gzRSelAct;gzRSelAct=function(a){if(!/^sb:/.test(a))return _a.apply(this,arguments);const h=ED.sel;if(!h||!h.f)return;const f=h.f,before=gzRSnap(),st=2;
 if(a=='sb:0'){f.length>11&&(f[11]=null)}else{let s=Array.isArray(f[11])?f[11].slice():(()=>{const d=sbDef(f);return[d.x-f[1],d.y-f[2],d.w,d.h]})();
  const c=a.slice(3);if(c=='w-'){s[0]+=st/2;s[2]=Math.max(2,s[2]-st)}if(c=='w+'){s[0]-=st/2;s[2]+=st}if(c=='h-'){s[1]+=st;s[3]=Math.max(2,s[3]-st)}if(c=='h+'){s[1]-=st;s[3]+=st}if(c=='l')s[0]-=st;if(c=='r')s[0]+=st;if(c=='u')s[1]-=st;if(c=='d')s[1]+=st;
  while(f.length<11)f.push(null);f[11]=s.map(v=>Math.round(v*10)/10)}
 gzRDone(before)}}
// ── 室內也能用「🚧 障礙」：看到全部紅框，點紅框就選到那個家具 ──
addEventListener('pointerdown',ev=>{if(!(typeof ED!='undefined'&&ED.on&&ED.room&&ED.tool=='sol')||!dlg.hidden||ev.target!==cv)return;ev.stopImmediatePropagation();ev.preventDefault();const [x,y]=gzW(ev);
 const o=(rm.sol||[]).filter(s=>s._f&&x>=s.x-2&&x<=s.x+s.w+2&&y>=s.y-2&&y<=s.y+s.h+2).sort((a,b)=>a.w*a.h-b.w*b.h)[0];
 if(!o){toast(rm.sol&&rm.sol.some(s=>s._wall&&x>=s.x&&x<=s.x+s.w&&y>=s.y&&y<=s.y+s.h)?'這是牆壁（橘色），人不能走進牆裡':'點紅色的框框，就能調整那個家具的障礙範圍');return}
 ED.tool='sel';ED.sel={f:o._f};gzRefresh();toast('🟥 已選取，用下面「障礙框」的按鈕調整大小')},true);
{const _h=gzHintTxt;gzHintTxt=function(){_h.apply(this,arguments);try{if(ED.room&&ED.tool=='sol')$e('gzHint').textContent='🟥 紅色＝家具擋路的範圍、🟧 橘色＝牆壁。點紅框選取家具，再用「障礙框」按鈕調大小、位置'}catch(e){}}}
// ── 進到房間被卡住（出生點在牆裡或家具裡）→ 自動移到旁邊空的地方 ──
const sBlk=()=>p.x<4||p.x+p.w>rm.W-4||p.y<30||p.y+p.h>rm.H||rm.sol.some(o=>hit(p,o));
function unstuck(){if(!scene||!rm||!rm.sol||rm.out||(typeof ED!='undefined'&&ED.on)||window.OVL)return;if(!sBlk())return;const ox=p.x,oy=p.y;
 for(let rr=4;rr<320;rr+=4)for(let a=0;a<24;a++){const an=Math.PI/2+a*Math.PI*2/24;p.x=ox+Math.cos(an)*rr;p.y=oy+Math.sin(an)*rr;if(p.x>4&&p.y>30&&p.x<rm.W-16&&p.y<rm.H-12&&!sBlk())return}p.x=ox;p.y=oy}
{const _e=enterB;enterB=function(){const r=_e.apply(this,arguments);setTimeout(unstuck,60);setTimeout(unstuck,500);return r}}
setInterval(()=>{try{unstuck()}catch(e){}},700);
