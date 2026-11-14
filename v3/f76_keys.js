/* v12.4 幻境 Online：按鍵自訂、操作說明、暫停選單 */
const VKACT=[
 ['移動',[['mL','往左'],['mR','往右'],['mU','往上（爬繩・往上打）'],['mD','往下（爬繩・下跳・往下打）'],['jump','跳躍']]],
 ['戰鬥',[['atk','普通攻擊（按住連打）'],['roll','衝刺閃避（無敵）'],['q','技能 Q'],['e','技能 E'],['r','職業大招 R'],['f','路線技 F'],['g','奧義']]],
 ['其他',[['i1','道具 1・生命藥'],['i2','道具 2・魔力藥'],['i3','道具 3'],['i4','道具 4'],['tab','換武器'],['esc','暫停選單']]]];
const VKDEF={mL:['ArrowLeft','KeyA'],mR:['ArrowRight','KeyD'],mU:['ArrowUp','KeyW'],mD:['ArrowDown','KeyS'],jump:['Space','KeyK'],atk:['KeyJ','KeyZ'],roll:['ShiftLeft','KeyL'],
 q:['KeyQ',''],e:['KeyE',''],r:['KeyR',''],f:['KeyF',''],g:['KeyX',''],i1:['Digit1',''],i2:['Digit2',''],i3:['Digit3',''],i4:['Digit4',''],tab:['Tab',''],esc:['Escape','KeyP']};
let VKB=null,VKMC=null;window.VKCAP=null;
function vrKeys(){if(VKB)return VKB;let s=null;try{s=JSON.parse(localStorage.getItem('vrKeys')||'null')}catch(e){}VKB={};Object.keys(VKDEF).forEach(a=>{VKB[a]=(s&&Array.isArray(s[a])?s[a]:VKDEF[a]).slice(0,2);while(VKB[a].length<2)VKB[a].push('')});VKB.esc[0]='Escape';return VKB}
function vrKSave(){VKMC=null;try{localStorage.setItem('vrKeys',JSON.stringify(VKB))}catch(e){}}
function VKM(){if(VKMC)return VKMC;const B=vrKeys(),m={};Object.keys(B).forEach(a=>B[a].forEach(c=>{if(c)m[c]=a}));return VKMC=m}
// 把按鍵事件轉成固定代碼（用 code，注音輸入法開著也能玩）
function vrCode(e){let c=e.code||'';if(c){return c.replace(/Right$/,m=>/^(Shift|Control|Alt|Meta)/.test(c)?'Left':m)}
 const k=e.key||'';if(/^[a-z]$/i.test(k))return'Key'+k.toUpperCase();if(/^[0-9]$/.test(k))return'Digit'+k;
 return{' ':'Space',Shift:'ShiftLeft',Control:'ControlLeft',Alt:'AltLeft',Esc:'Escape'}[k]||k}
const VKNM={Space:'空白',ShiftLeft:'Shift',ControlLeft:'Ctrl',AltLeft:'Alt',MetaLeft:'⌘',ArrowLeft:'←',ArrowRight:'→',ArrowUp:'↑',ArrowDown:'↓',Escape:'Esc',Tab:'Tab',Enter:'Enter',Backspace:'⌫',CapsLock:'Caps',Comma:',',Period:'.',Slash:'/',Semicolon:';',Quote:"'",BracketLeft:'[',BracketRight:']',Backslash:'\\',Minus:'-',Equal:'=',Backquote:'`'};
function vrKName(c){if(!c)return'';if(VKNM[c])return VKNM[c];if(/^Key/.test(c))return c.slice(3);if(/^Digit/.test(c))return c.slice(5);if(/^Numpad/.test(c))return'Num'+c.slice(6);return c}
function vrKeyLbl(a){const b=vrKeys()[a]||[];return vrKName(b[0]||b[1])||'—'}
function vrKeyLbl2(a){return(vrKeys()[a]||[]).filter(Boolean).map(vrKName).join('／')||'—'}
function vrKSeen(){try{return localStorage.getItem('vrHelpSeen')=='1'}catch(e){return!!window._vrHS}}
function vrKSetSeen(){window._vrHS=1;try{localStorage.setItem('vrHelpSeen','1')}catch(e){}}
const VKCSS='font:inherit;cursor:pointer;border-radius:8px;';
const vkChip=(t,on)=>`<span style="display:inline-block;min-width:26px;padding:2px 7px;margin:1px;border-radius:6px;background:${on?'#fff6c0':'#efe6ff'};color:#2a1a4a;border:2px solid #8a7ac0;border-bottom-width:4px;font-weight:bold;text-align:center">${t}</span>`;
// 操作說明：看起來像一張按鍵圖
function vrCtlHTML(){const K=a=>vrKeys()[a].filter(Boolean).map(c=>vkChip(vrKName(c))).join('')||vkChip('—'),row=(a,t)=>`<div style="display:flex;align-items:center;gap:6px;padding:3px 0"><span style="min-width:96px;text-align:right">${K(a)}</span><span>${t}</span></div>`;
 return`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:4px 14px;font-size:13px">
 <div><div style="color:#ffd84a;font-weight:bold;margin:2px 0">🏃 移動</div>${row('mL','往左')}${row('mR','往右')}${row('mU','爬繩往上・往上打')}${row('mD','爬繩往下・往下打')}${row('jump','跳（按住↓再跳＝跳下平台）')}</div>
 <div><div style="color:#ffd84a;font-weight:bold;margin:2px 0">⚔️ 戰鬥</div>${row('atk','普攻（按住連打・自動瞄準）')}${row('roll','衝刺閃避（無敵）')}${row('q','技能 Q')}${row('e','技能 E')}${row('r','職業大招')}${row('f','路線技（選了路線才有）')}${row('g','奧義（戰鬥 Lv.10 學會）')}</div>
 <div><div style="color:#ffd84a;font-weight:bold;margin:2px 0">🎒 其他</div>${row('i1','生命藥')}${row('i2','魔力藥')}${row('i3','道具 3')}${row('i4','道具 4')}${row('tab','換武器')}${row('esc','暫停選單（看說明・改按鍵）')}</div></div>
 <div style="font-size:12px;margin-top:6px;color:#ffd0dc">💓 救隊友：站到倒下的隊友正上方，交替狂按 ${vrKeyLbl('q')}・${vrKeyLbl('e')}（像在做 CPR）。</div><div style="font-size:12px;opacity:.8;margin-top:6px">📱 手機：用畫面下方的按鈕操作。升級時用技能鍵加點、道具 1／2／3 的按鍵選卡（也可以直接點）。</div>`}
// 按鍵設定面板：host＝要放進去的容器，onClose＝關閉後要做的事
function vrKeyPanel(host,onClose,fixed){const el=document.createElement('div');el.style.cssText=(fixed?'position:fixed;z-index:99999;':'position:absolute;z-index:8;')+'inset:0;display:flex;align-items:center;justify-content:center;background:rgba(10,6,24,.8);padding:10px';
 let wait=null,note='點一格，再按下想要的按鍵。';const B=vrKeys();
 const draw=()=>{el.innerHTML=`<div style="background:linear-gradient(#3a2a5a,#22163a);border:3px solid #9ae8ff;border-radius:14px;padding:12px 14px;max-width:720px;width:100%;max-height:92vh;overflow:auto;color:#fff">
  <div style="font-size:20px;font-weight:bold;color:#9ae8ff;text-align:center">⌨️ 按鍵設定</div>
  <div style="text-align:center;font-size:12px;margin:4px 0 8px;color:${wait?'#ffd84a':'#ddd'}">${wait?'請按下新按鍵…（Esc 取消・Backspace 清空這格）':note}</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px 14px">${VKACT.map(([g,L])=>`<div><div style="color:#ffd84a;font-weight:bold;margin:6px 0 2px">${g}</div>${L.map(([a,t])=>`<div style="display:flex;align-items:center;gap:6px;padding:2px 0;font-size:13px"><span style="flex:1">${t}</span>${[0,1].map(i=>{const lock=a=='esc'&&i==0,on=wait&&wait[0]==a&&wait[1]==i;return`<button data-a="${a}" data-i="${i}" ${lock?'disabled':''} style="${VKCSS}min-width:50px;padding:3px 5px;border:2px solid ${on?'#ffd84a':'#7a6aa0'};background:${on?'#5a4a20':lock?'#1a1428':'#2e2448'};color:${lock?'#999':'#fff'}">${on?'…':vrKName(B[a][i])||'＋'}</button>`}).join('')}</div>`).join('')}</div>`).join('')}</div>
  <div style="display:flex;gap:8px;justify-content:center;margin-top:12px"><button data-x="def" style="${VKCSS}padding:6px 14px;border:2px solid #ff9a9a;background:#4a2030;color:#fff">↺ 恢復預設</button><button data-x="ok" style="${VKCSS}padding:6px 18px;border:2px solid #9aff9a;background:#204a30;color:#fff">✔ 完成</button></div></div>`;
  el.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{wait=[b.dataset.a,+b.dataset.i];draw()});
  el.querySelector('[data-x=def]').onclick=()=>{Object.keys(VKDEF).forEach(a=>B[a]=VKDEF[a].slice());vrKSave();wait=null;note='已恢復預設按鍵。';draw()};
  el.querySelector('[data-x=ok]').onclick=close};
 const cap=e=>{e.preventDefault();e.stopImmediatePropagation&&e.stopImmediatePropagation();if(!wait){if(vrCode(e)=='Escape')close();return}const c=vrCode(e),[a,i]=wait;
  if(c=='Escape'){wait=null;draw();return}if(c=='Backspace'){B[a][i]='';wait=null;vrKSave();note='已清空。';draw();return}
  let moved='';Object.keys(B).forEach(b=>B[b].forEach((x,j)=>{if(x==c&&!(b==a&&j==i)&&!(b=='esc'&&j==0)){B[b][j]='';moved=VKACT.flatMap(q=>q[1]).find(q=>q[0]==b)[1]}}));
  if(c=='Escape'){wait=null;draw();return}B[a][i]=c;if(!B[a][0]&&B[a][1]){B[a][0]=B[a][1];B[a][1]=''}vrKSave();wait=null;note=moved?`「${vrKName(c)}」原本是「${moved}」，已改給這裡。`:`設定好了：${vrKName(c)}`;draw()};
 const win=e=>{if(window.VKCAP===cap)cap(e)};
 function close(){window.VKCAP=null;removeEventListener('keydown',win,true);el.remove();if(onClose)onClose()}
 window.VKCAP=cap;addEventListener('keydown',win,true);draw();host.appendChild(el);return el}
// 大廳：說明對話框與按鍵設定
function vrHelp(){openDlg('📖 幻境 Online 操作',vrCtlHTML()+`<div style="font-size:12px;margin-top:8px">打倒怪物升戰鬥等級、技能加點、三選一卡片。每 10 層換一個環境：第 5 層有菁英怪、第 10 層是大魔王。</div>`,[['⌨️ 按鍵設定','改成你順手的按鍵',()=>vrKeyPanel(document.body,vrHelp,1)],['返回','',vrLobby]])}
{const _l=vrLobby;vrLobby=function(){_l.apply(this,arguments);try{if(!vrS().cls||!curDlg||!String(curDlg[0]).includes('幻境'))return;const o=curDlg[2];if(o.some(q=>String(q[0]).includes('按鍵')))return;const i=o.findIndex(q=>String(q[0]).includes('操作'));const t=['⌨️ 按鍵','自訂按鍵',()=>vrKeyPanel(document.body,vrLobby,1),0,1];if(i>=0)o.splice(i+1,0,t);else o.splice(Math.max(0,o.length-1),0,t);openDlg(curDlg[0],curDlg[1],o,0,'grid')}catch(e){console.warn(e)}}}
