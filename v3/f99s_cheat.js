/* v13.22 金手指（世紀帝國二風格）：按 / 打開輸入框，輸入英文祕技；造景模式要密碼；禮物密碼可以顯示；讀取進度條 */

// ── 1. 祕技表 ──
const CHEATS=[
 ['energizer','⚡ 體力充沛！',()=>{st.sta=staMax();st.exh=0}],
 ['robin hood','💰 劫富濟貧：金錢 +10,000',()=>{st.money+=10000}],
 ['rich kai','💰 老婆說可以買：金錢 +100,000',()=>{st.money+=100000}],
 ['scoot scoot','🛴 獲得電動滑板車（停在家門口）',()=>{st.veh=st.veh||{};if(st.veh.scoot)return '你已經有滑板車了';st.veh.scoot={cx:0,cy:0,col:'#2a2a2e',ax:'x',dir:-1,rd:0,pk:0};try{rackPark('scoot')}catch(e){}}],
 ['ring ring','🚲 獲得腳踏車（停在家門口）',()=>{st.veh=st.veh||{};if(st.veh.bike)return '你已經有腳踏車了';vBuyDo('bike',null,0,0)}],
 ['vroom vroom','🛵 獲得機車（停在家門口）',()=>{st.veh=st.veh||{};if(st.veh.moto)return '你已經有機車了';vBuyDo('moto',null,0,0)}],
 ['how do you turn this on','🏎️ 獲得跑車（停在家門口）',()=>{st.veh=st.veh||{};if(st.veh.car)return '你已經有車了';vBuyDo('car','sport',0,0)}],
 ['cheese steak jimmys','🍱 獲得便當 ×10',()=>{st.inv.lunch=(st.inv.lunch||0)+10}],
 ['coffee time','☕ 獲得手沖咖啡 ×10',()=>{st.inv.coffee=(st.inv.coffee||0)+10}],
 ['sweet tooth','🍰 獲得蛋糕 ×5',()=>{st.inv.cake=(st.inv.cake||0)+5}],
 ['farmer joe','🥬 獲得各種蔬菜 ×5',()=>{Object.keys(CROPS).forEach(k=>st.inv['veg_'+k]=(st.inv['veg_'+k]||0)+5)}],
 ['doctor kai','❤️ 健康回滿',()=>{st.hp=100}],
 ['happy happy','😊 心情 +50',()=>{st.joy=(st.joy||0)+50}],
 ['i love kai','💕 老公最愛家宜！',()=>{st.joy=(st.joy||0)+20;cheatHearts()}],
 ['happy birthday kai','🎂 生日快樂，家宜！',()=>{cheatHearts();setTimeout(()=>{try{memShow()}catch(e){}},1200)}],
 ['cheat list','📜 祕技清單',()=>{cheatList();return ''}],
];
const cheatNorm=s=>String(s||'').toLowerCase().replace(/['’`]/g,'').replace(/\s+/g,' ').trim();
function cheatRun(raw){const c=cheatNorm(raw);if(!c)return;const q=CHEATS.find(x=>x[0]==c);
 if(!q){toast('💬「'+raw+'」……什麼事都沒發生');return}
 let r;try{r=q[2]()}catch(e){console.warn(e);r='這個祕技現在不能用'}
 if(r===''){}else if(r)toast('💬 '+r);else{toast('✨ 祕技啟動：'+q[1]);try{hud()}catch(e){}try{SVDIRTY=1}catch(e){}}}
function cheatList(){openDlg('📜 祕技清單','按 <b>/</b>（或連點右上角時間 5 下）打開輸入框，打英文按 Enter：<br><br>'+CHEATS.map(q=>`<div style="display:flex;gap:10px;margin:3px 0"><code style="background:#3a2414;color:#ffd36e;padding:1px 6px;border-radius:4px;white-space:nowrap">${q[0]}</code><span>${q[1]}</span></div>`).join(''),[['好','',closeDlg]])}
function cheatHearts(){const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:99990;overflow:hidden';document.body.appendChild(ov);
 for(let i=0;i<40;i++){const h=document.createElement('div');h.textContent=['💗','💕','💖','❤️','💞'][i%5];h.style.cssText=`position:absolute;left:${Math.random()*100}%;bottom:-40px;font-size:${18+Math.random()*26}px;transition:transform ${2.5+Math.random()*2}s ease-out,opacity 3s;opacity:1`;ov.appendChild(h);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{h.style.transform=`translate(${(Math.random()-.5)*120}px,-${innerHeight+80}px) rotate(${(Math.random()-.5)*60}deg)`;h.style.opacity='0'}))}setTimeout(()=>ov.remove(),5000)}
// 輸入框（像世紀帝國的聊天列）
function cheatOpen(){if(document.getElementById('chtBox')||window.TITLE||!dlg.hidden||(typeof MG!='undefined'&&MG)||(typeof ED!='undefined'&&ED.on))return;
 const b=document.createElement('div');b.id='chtBox';b.style.cssText='position:fixed;left:50%;bottom:14%;transform:translateX(-50%);z-index:99995;display:flex;align-items:center;gap:8px;background:rgba(20,12,6,.88);border:2px solid #ffd36e;border-radius:10px;padding:8px 12px;box-shadow:0 6px 20px rgba(0,0,0,.5)';
 b.innerHTML='<span style="color:#ffd36e;font-weight:bold">💬</span><input id="chtIn" autocomplete="off" spellcheck="false" placeholder="輸入祕技後按 Enter（Esc 取消）" style="width:min(70vw,360px);font:inherit;font-size:15px;background:transparent;border:none;outline:none;color:#fff6dc">';
 document.body.appendChild(b);const i=b.querySelector('input');i.focus();
 const close=()=>{b.remove()};i.addEventListener('keydown',e=>{e.stopPropagation();if(e.key=='Enter'){const v=i.value;close();cheatRun(v)}else if(e.key=='Escape')close()});i.addEventListener('keyup',e=>e.stopPropagation());i.addEventListener('blur',()=>setTimeout(close,150))}
addEventListener('keydown',e=>{if(e.key=='/'&&!e.repeat){const t=e.target&&e.target.tagName;if(t=='INPUT'||t=='TEXTAREA')return;e.preventDefault();cheatOpen()}},true);
// 手機：連點右上角時間 5 下
{let n=0,tm=0;document.addEventListener('pointerdown',e=>{const t=e.target.closest&&e.target.closest('#tm');if(!t)return;const now=performance.now();n=now-tm<600?n+1:1;tm=now;if(n>=5){n=0;cheatOpen()}},true)}

// ── 2. 造景模式要密碼 ──
const GZPW='s124658317';let gzOK=false;try{gzOK=sessionStorage.getItem('pxGzOk')=='1'}catch(e){}
{const _g=gzEnter;gzEnter=function(){if(gzOK)return _g.apply(this,arguments);if(scene)return toast('請先走到戶外，再打開造景模式');const args=arguments,self=this;
 openDlg('🔒 造景模式',`這是作者專用的上帝視角，請輸入密碼：${pwField('gzPw')}<div id="gzPwM" style="color:#c0392b;font-size:13px;min-height:1.2em;margin-top:4px"></div>`,[['🔓 進入','',()=>chk()],['取消','',closeDlg]]);
 const chk=()=>{const el=document.getElementById('gzPw');if(!el)return;if(el.value.trim()==GZPW){gzOK=true;try{sessionStorage.setItem('pxGzOk','1')}catch(e){}closeDlg();_g.apply(self,args)}else{document.getElementById('gzPwM').textContent='密碼不對喔';el.value='';el.focus()}};
 setTimeout(()=>{const el=document.getElementById('gzPw');if(!el)return;pwWire(el);el.focus();el.addEventListener('keydown',e=>{if(e.key=='Enter'){e.preventDefault();chk()}})},60)}}

// ── 3. 密碼欄：👁 按住／點一下就能看到密碼 ──
function pwField(id){return `<div style="position:relative;margin-top:8px"><input id="${id}" type="password" autocomplete="off" style="width:100%;font:inherit;font-size:18px;letter-spacing:4px;text-align:center;padding:8px 44px 8px 8px;border:2px solid #8a5a2e;border-radius:8px;background:#fffaf0;color:#3a2410"><button type="button" data-eye="${id}" title="顯示／隱藏密碼" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:20px;cursor:pointer;padding:4px">👁️</button></div>`}
function pwWire(el){el.addEventListener('keydown',e=>e.stopPropagation(),true);el.addEventListener('keyup',e=>e.stopPropagation(),true)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-eye]');if(!b)return;e.preventDefault();e.stopPropagation();const i=document.getElementById(b.dataset.eye);if(!i)return;const show=i.type=='password';i.type=show?'text':'password';b.textContent=show?'🙈':'👁️';i.focus()},true);
// 生日禮物的密碼欄也加上 👁
{const _ga=giftAsk;giftAsk=function(){const r=_ga.apply(this,arguments);setTimeout(()=>{const i=document.getElementById('gpw');if(!i||i.parentElement.querySelector('[data-eye]'))return;const w=document.createElement('div');w.style.cssText='position:relative';i.parentElement.insertBefore(w,i);w.appendChild(i);i.style.paddingRight='44px';
 const b=document.createElement('button');b.type='button';b.dataset.eye='gpw';b.title='顯示／隱藏密碼';b.textContent='👁️';b.style.cssText='position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:20px;cursor:pointer;padding:4px';w.appendChild(b)},90);return r}}
