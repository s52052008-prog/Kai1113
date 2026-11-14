/* v13.28 修正與介面整理 */
// ── 造景：Ctrl+C（或 Ctrl+D）複製選取的物件 ──
addEventListener('keydown',ev=>{if(!(typeof ED!='undefined'&&ED.on)||!dlg.hidden)return;const t=ev.target&&ev.target.tagName;if(t=='INPUT'||t=='TEXTAREA')return;
 if((ev.ctrlKey||ev.metaKey)&&!ev.shiftKey&&(ev.key=='c'||ev.key=='C'||ev.key=='d'||ev.key=='D')){const b=document.querySelector('#gzSel [data-s="dup"]');if(b&&b.offsetParent!==null){ev.preventDefault();ev.stopImmediatePropagation();b.click();toast('⧉ 已複製（Ctrl+C）')}}},true);

// ── C 選單整理：刪公共安全、裝備→服裝、新增⚙️設定（背景音樂、畫面與字體、操作說明）──
const SHIRT_IC='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABa0lEQVR4nO2boXICMRRFdxl+omY1GoOpqqAajUFgMFX9jKo1GERNdWuLQK2pQVev4TOoTnYmbzIJe5jmHpdJ2D1z5+XBJENdJTJrHq8x63/7rh7zeRaTlA//BxQALUAztRZYe7J5eY97Y7sZ9XlWjyi+AhQALUAz2B/+no/ekwafu4fg/Gp/yfq+vt04Y78nFF8BCoAWoKlvvefvDb8nFF8BCoAWoFEAtACNAqAFaMzzgOWiccbHn/5mMjnoz2dn3MznwfXFV4ACoAVozPMAn+3HyRnTPcHf81XXBtfrPMBDAdACNIPfAdY5+mH95PSI2J7wvXwNzj8f34LzsehewEAB0AI0CoAWoFEAtACNeR6Qm9zf86kUXwEKgBagUQC0AI0CoAVoFAAtQKMAaAEaBUAL0CgAWoBm9POAVAZ3gYkUXwEKgBagSe4Bh/1XBg2O4itAAdACNNE9wL9vn3VV1H99743iK0AB0AI0f+hcTAD4o/cyAAAAAElFTkSuQmCC';
{const _o=optHTML;optHTML=function(o,i,grid){try{if(!grid&&typeof o[0]=='string'&&/^👕?\s*服裝/.test(o[0])){const t=o[0].replace(/^👕\s*/,'');return `<button data-i="${i}" ${o[3]?'disabled':''} class="dopt hic"><span class="oic2" style="width:30px;height:30px"><img src="${SHIRT_IC}" style="width:28px;height:28px;image-rendering:pixelated"></span><b>${i+1}　${t}</b>${o[1]?`<div class="sub">${o[1]}</div>`:''}</button>`}}catch(e){}return _o.apply(this,arguments)}}
let SETOPTS=[];
function settingsMenu(){openDlg('⚙️ 設定','聲音、畫面、操作方式都在這裡調整。',SETOPTS.map(q=>[q[0],q[1],q[2]]).concat([['返回','',()=>openMenu()]]))}
{const om=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(t=='📋 選單'&&Array.isArray(opts)){
  for(let i=opts.length-1;i>=0;i--){const n=String(opts[i][0]);if(/公共安全/.test(n))opts.splice(i,1)}
  opts.forEach(o=>{const n=String(o[0]);if(/^(🎒|🛡️|⚔️|👔|👕)?\s*裝備/.test(n)||/^裝備/.test(n)){o[0]='👕 服裝';o[1]='帽子、衣服、褲子、鞋子、配件（到服飾店買）'}});
  const pick=re=>{const i=opts.findIndex(q=>re.test(String(q[0])));return i<0?null:opts.splice(i,1)[0]};
  const set=[pick(/背景音樂/),pick(/畫面與字體/),pick(/操作說明/)].filter(Boolean);if(set.length){SETOPTS=set;const i=opts.findIndex(q=>/回到標題/.test(String(q[0])));opts.splice(i<0?opts.length-1:i,0,['⚙️ 設定','背景音樂、畫面與字體、操作說明',settingsMenu])}
  if(!opts.some(q=>/存檔／讀檔/.test(String(q[0])))){const j=opts.findIndex(q=>/地圖/.test(String(q[0])));opts.splice(j<0?opts.length-1:j,0,['💾 存檔／讀檔','自動存檔、3 個欄位、存檔碼',()=>svMenu()])}}}catch(e){console.error(e)}return od.call(this,t,d,opts,...r)};try{return om.apply(this,arguments)}finally{openDlg=od}}}

// ── 沙漏美化：木頭框、玻璃反光、流沙、沙堆 ──
{const s=document.createElement('style');s.textContent=`#hg{gap:8px!important;padding:4px 12px 4px 8px!important;border-radius:14px!important;background:linear-gradient(180deg,#fff8e4,#f3e2bc)!important;border:2px solid #7a4e26!important;box-shadow:0 2px 0 #4a2e14,0 4px 10px rgba(0,0,0,.28),inset 0 1px 0 #fff!important}
#hg canvas{width:26px!important;height:38px!important;image-rendering:pixelated;filter:drop-shadow(0 1px 0 rgba(0,0,0,.3))}
#hg .t{font-size:12px!important}#hg .t b{font-size:16px;margin:0 1px}#hg .b{width:96px!important;height:7px!important;border-radius:4px!important;background:#e0cda4!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.25)}
#hg .b i{background-image:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0) 60%)!important}#hg .sub{font-size:10px;color:#8a6a48;margin-top:1px}`;document.head.appendChild(s)}
{const old=hgEl.querySelector('canvas'),c=document.createElement('canvas');c.width=13;c.height=19;old.replaceWith(c);const x=c.getContext('2d');
 const IN={2:[3,9],3:[3,9],4:[4,8],5:[4,8],6:[5,7],7:[6,6],8:[6,6],9:[6,6],10:[6,6],11:[5,7],12:[4,8],13:[4,8],14:[3,9],15:[3,9],16:[3,9]};
 const P=(X,Y,col)=>{x.fillStyle=col;x.fillRect(X,Y,1,1)};
 const shade=(hex,k)=>{const n=parseInt(hex.slice(1),16),r=Math.min(255,Math.max(0,((n>>16)&255)+k)),g=Math.min(255,Math.max(0,((n>>8)&255)+k)),b=Math.min(255,Math.max(0,(n&255)+k));return `rgb(${r},${g},${b})`};
 hgDraw=function(f,t){const col=hgCol(f);x.clearRect(0,0,13,19);
  // 玻璃內部
  for(let y=2;y<=16;y++){const q=IN[y];for(let X=q[0];X<=q[1];X++)P(X,y,'rgba(205,232,255,.38)');P(q[0]-1,y,'rgba(150,190,230,.9)');P(q[1]+1,y,'rgba(150,190,230,.9)')}
  // 上半部的沙（從瓶頸往上堆）
  const up=[];for(let y=8;y>=2;y--){const q=IN[y];for(let X=q[0];X<=q[1];X++)up.push([X,y])}const nU=Math.round(f*up.length);
  // 上方沙面是平的：從瓶頸開始一列一列填滿
  for(let i=0;i<nU;i++){const [X,Y]=up[i];P(X,Y,i>=nU-IN[up[i][1]][1]+IN[up[i][1]][0]-1?shade(col,40):col)}
  // 下半部的沙堆（從底部中間往外堆）
  const lo=[];for(let y=16;y>=10;y--){const q=IN[y],c0=6,cells=[];for(let X=q[0];X<=q[1];X++)cells.push(X);cells.sort((a,b)=>Math.abs(a-c0)-Math.abs(b-c0));cells.forEach(X=>lo.push([X,y]))}
  const nL=Math.round((1-f)*lo.length*.92);for(let i=0;i<nL;i++)P(lo[i][0],lo[i][1],i>nL-4?shade(col,40):shade(col,-15));
  // 流沙
  if(f>0&&f<1){const top=nL?lo[nL-1][1]:16;for(let y=9;y<top;y++)if((y+Math.floor(t/90))%3)P(6,y,shade(col,20))}
  // 玻璃反光
  P(4,3,'rgba(255,255,255,.95)');P(4,4,'rgba(255,255,255,.7)');P(5,5,'rgba(255,255,255,.5)');P(4,14,'rgba(255,255,255,.6)');
  // 木框
  x.fillStyle='#8a5a2e';x.fillRect(0,0,13,2);x.fillRect(0,17,13,2);x.fillStyle='#b77a3e';x.fillRect(1,0,11,1);x.fillRect(1,17,11,1);x.fillStyle='#5a3618';x.fillRect(0,1,13,1);x.fillRect(0,18,13,1);
  x.fillStyle='#6b4423';x.fillRect(0,2,1,15);x.fillRect(12,2,1,15);x.fillStyle='#a06a34';x.fillRect(0,2,1,1);x.fillRect(12,2,1,1);x.fillRect(0,9,1,1);x.fillRect(12,9,1,1)};
}
{const _t=hgTick;hgTick=function(){_t.apply(this,arguments);try{if(hgEl.style.display=='none')return;const d=hgEl.querySelector('.b').parentElement;let sb=d.querySelector('.sub');if(!sb){sb=document.createElement('div');sb.className='sub';d.appendChild(sb)}
 const h=wkLeft();sb.textContent=h<=0?'週末結束了，明天要上班 😢':h<6?'⏰ 時間快沒了，把握最後的時光！':h<20?'今天是週末最後一天':`${['週一','週二','週三','週四','週五','週六','週日'][dow()]||''} ${String(Math.floor(T.hour)).padStart(2,'0')}:${String(Math.floor((T.hour%1)*60)).padStart(2,'0')}`}catch(e){}}}

// ── 家的藍圖：📌 釘選模式＋自動避開左上角人物欄 ──
let hwPin=false;try{hwPin=localStorage.getItem('pxHwPin')=='1'}catch(e){}
{const s=document.createElement('style');s.textContent=`#hwP .pin{margin-left:auto;background:none;border:none;cursor:pointer;font-size:13px;padding:0 2px;opacity:.45;filter:grayscale(1);transition:.15s}#hwP .pin.on{opacity:1;filter:none;transform:rotate(-20deg)}#hwP .hd span{margin-left:6px!important}
#hwP{transition:top .2s}#hwP.min{width:auto!important}#hwP.min .hd{border-bottom:none}`;document.head.appendChild(s)}
let hwOpen=false,hwT=0;
function hwApplyPin(){const show=hwPin||hwOpen;hwEl.classList.toggle('min',!show)}
{const _hp=hwPanel;hwPanel=function(){_hp.apply(this,arguments);try{const hd=hwEl.querySelector('.hd');if(hd&&!hd.querySelector('.pin')){const sp=hd.querySelector('span');const b=document.createElement('button');b.className='pin'+(hwPin?' on':'');b.title=hwPin?'取消釘選（平常收起來）':'釘選（一直展開）';b.textContent='📌';hd.insertBefore(b,sp);if(sp)sp.textContent=hwEl.classList.contains('min')?'▼':'▲'}hwApplyPin();if(sp0())0}catch(e){}}}
function sp0(){const sp=hwEl.querySelector('.hd span');if(sp)sp.textContent=hwEl.classList.contains('min')?'▼':'▲';return 0}
hwEl.addEventListener('click',e=>{const pin=e.target.closest('.pin');if(pin){e.stopPropagation();hwPin=!hwPin;try{localStorage.setItem('pxHwPin',hwPin?'1':'0')}catch(er){}hwOpen=hwPin;toast(hwPin?'📌 家的藍圖已釘選，會一直展開':'家的藍圖平常會收起來，點一下或滑過去就展開');hwPanel();return}
 if(e.target.closest('.hd')){e.stopPropagation();if(!hwPin){hwOpen=!hwOpen;hwApplyPin();sp0()}}},true);
hwEl.addEventListener('mouseenter',()=>{if(hwPin)return;clearTimeout(hwT);hwOpen=true;hwApplyPin();sp0()});
hwEl.addEventListener('mouseleave',()=>{if(hwPin)return;clearTimeout(hwT);hwT=setTimeout(()=>{hwOpen=false;hwApplyPin();sp0()},500)});
document.addEventListener('pointerdown',e=>{if(hwPin||!hwOpen||hwEl.contains(e.target))return;hwOpen=false;hwApplyPin();sp0()},true);
// 位置：永遠在人物欄的正下方
setInterval(()=>{try{if(hwEl.style.display=='none')return;const hud=document.getElementById('hud');if(!hud)return;const hr=hud.getBoundingClientRect(),r=hwEl.getBoundingClientRect();if(!r.height||!hwEl.offsetHeight)return;const sc=r.height/hwEl.offsetHeight,want=hr.bottom+6,cur=parseFloat(getComputedStyle(hwEl).top)||64,d=(want-r.top)/sc;if(Math.abs(d)>1)hwEl.style.top=Math.max(0,cur+d)+'px'}catch(e){}},400);
setTimeout(()=>{try{hwPanel()}catch(e){}},2600);

// ── 背景音樂：更多曲子＋可以指定一直播哪一首 ──
Object.assign(BGSONG,{
 cafe:{n:'☕ 咖啡廳午後',bpm:92,lead:'piano',arp:'piano',pad:1,ch:[[48,[64,67,71]],[45,[60,64,67]],[50,[65,69,72]],[43,[65,71,74]],[52,[67,71,74]],[45,[67,73,76]],[50,[65,69,72]],[43,[65,71,74]]],
  mel:[[[76,1.5],[74,.5],[71,1],[72,1]],[[69,2],[72,1],[76,1]],[[77,1],[76,.5],[74,.5],[72,1],[69,1]],[[71,3],[0,1]],[[79,1.5],[76,.5],[74,1],[71,1]],[[73,1],[76,1],[79,1],[77,1]],[[77,1],[76,1],[74,1],[72,1]],[[71,2],[74,1],[0,1]]]},
 love:{n:'💕 家宜的主題曲',bpm:72,lead:'musicbox',arp:'slow',pad:1,ch:[[41,[65,69,72]],[40,[64,67,72]],[50,[65,69,74]],[46,[65,70,74]],[41,[65,69,72]],[45,[64,69,72]],[46,[65,70,74]],[48,[64,67,72]]],
  mel:[[[72,1],[74,1],[76,2]],[[76,1],[74,1],[72,2]],[[74,1],[76,1],[77,1],[81,1]],[[79,4]],[[72,1],[74,1],[76,2]],[[76,1],[77,1],[79,2]],[[77,1],[76,1],[74,1],[72,1]],[[72,4]]]},
 beach:{n:'🏖️ 夏日海邊',bpm:124,lead:'marimba',arp:'bounce',hat:1,ch:[[43,[67,71,74]],[48,[67,72,76]],[50,[66,69,74]],[43,[67,71,74]],[40,[67,71,76]],[48,[67,72,76]],[50,[66,69,74]],[43,[67,71,74]]],
  mel:[[[71,.5],[74,.5],[79,1],[78,.5],[76,.5],[74,1]],[[76,.5],[74,.5],[72,1],[76,2]],[[74,.5],[76,.5],[78,1],[81,1],[78,1]],[[79,3],[0,1]],[[76,.5],[79,.5],[83,1],[81,.5],[79,.5],[76,1]],[[72,1],[76,1],[79,1],[76,1]],[[78,.5],[79,.5],[81,1],[78,1],[74,1]],[[79,3],[0,1]]]},
 rain:{n:'🌧️ 雨天的窗邊',bpm:62,lead:'piano',arp:'slow',pad:1,ch:[[45,[64,69,72]],[41,[65,69,72]],[48,[64,67,72]],[43,[62,67,71]],[45,[64,69,72]],[50,[65,69,74]],[40,[64,68,71]],[45,[64,69,72]]],
  mel:[[[76,2],[72,1],[74,1]],[[72,2],[69,2]],[[67,1],[72,1],[76,2]],[[74,4]],[[76,1],[79,1],[77,1],[76,1]],[[74,2],[77,2]],[[76,1],[74,1],[71,2]],[[69,4]]]},
 church:{n:'⛪ 主日早晨',bpm:68,lead:'piano',arp:'piano',pad:1,ch:[[50,[66,69,74]],[43,[67,71,74]],[50,[66,69,74]],[45,[64,69,73]],[47,[66,71,74]],[43,[67,71,74]],[45,[64,69,73]],[50,[66,69,74]]],
  mel:[[[74,1],[74,1],[76,1],[78,1]],[[79,2],[78,1],[76,1]],[[78,2],[74,2]],[[76,4]],[[78,1],[79,1],[81,1],[78,1]],[[79,1],[78,1],[76,2]],[[74,1],[76,1],[73,2]],[[74,4]]]},
 fest:{n:'🎉 小鎮慶典',bpm:136,lead:'marimba',arp:'bounce',hat:1,ch:[[48,[64,67,72]],[41,[65,69,72]],[43,[67,71,74]],[48,[64,67,72]],[45,[64,69,72]],[41,[65,69,72]],[43,[67,71,74]],[48,[64,67,72]]],
  mel:[[[72,.5],[72,.5],[76,.5],[79,.5],[84,1],[79,1]],[[81,.5],[79,.5],[77,.5],[76,.5],[77,2]],[[79,.5],[77,.5],[76,.5],[74,.5],[71,1],[74,1]],[[72,3],[0,1]],[[76,.5],[79,.5],[81,1],[84,1],[81,1]],[[77,.5],[81,.5],[84,1],[81,1],[77,1]],[[79,1],[83,1],[86,1],[83,1]],[[84,3],[0,1]]]}});
BGM.pick=null;try{BGM.pick=localStorage.getItem('pxBgmPick')||null;if(BGM.pick&&!BGSONG[BGM.pick])BGM.pick=null}catch(e){}
{const _w=bgmWant;bgmWant=function(){const w=_w.apply(this,arguments);if(!w)return w;return BGM.pick||w}}
bgmMenu=function(back){const pct=Math.round(BGM.vol*100),K=Object.keys(BGSONG);
 openDlg('🎵 背景音樂',`正在播：<b>${BGM.on?(BGM.cur?BGSONG[BGM.cur].n:'（等一下就會播）'):'已關閉'}</b>　｜　模式：<b>${BGM.pick?'單曲循環':'🔁 自動切換'}</b><br><div style="display:flex;align-items:center;gap:8px;margin-top:10px">🔈<input id="bgmV" type="range" min="0" max="100" step="5" value="${pct}" style="flex:1"><span id="bgmVt" style="width:44px;text-align:right">${pct}%</span>🔊</div>
  <div style="font-size:12px;opacity:.75;margin-top:6px">「自動切換」會依白天、夜晚、在家換曲子；點一首歌就會一直播那首。</div>`,
  [[BGM.on?'🔇 關閉音樂':'🔊 開啟音樂','',()=>{bgmSet(!BGM.on);bgmMenu(back)}],[(BGM.pick?'':'✅ ')+'🔁 自動切換','白天、夜晚、在家自動換',()=>{BGM.pick=null;try{localStorage.removeItem('pxBgmPick')}catch(e){}BGM.cur=null;bgmSet(true);bgmMenu(back)}]]
  .concat(K.map(k=>[(BGM.pick==k?'✅ ':'')+BGSONG[k].n,BGM.pick==k?'單曲循環中':'點一下就換成這首',()=>{BGM.pick=k;try{localStorage.setItem('pxBgmPick',k)}catch(e){}if(!BGM.on)bgmSet(true);bgmCtx();if(BGM.player)BGM.player.stop();BGM.player=null;BGM.cur=null;bgmTick();bgmMenu(back)}]))
  .concat([['返回','',back||closeDlg]]));
 setTimeout(()=>{const r=document.getElementById('bgmV');if(!r)return;['keydown','pointerdown'].forEach(ev=>r.addEventListener(ev,e=>e.stopPropagation()));r.oninput=()=>{document.getElementById('bgmVt').textContent=r.value+'%';bgmSet(null,+r.value/100)}},50)};

// ── 手機：做成像真的手機一樣的 APP 主畫面 ──
{const s=document.createElement('style');s.textContent=`#phApp{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;background:rgba(10,8,20,.45);backdrop-filter:blur(2px);animation:phIn .18s ease-out}
@keyframes phIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
#phApp .ph{position:relative;width:min(370px,94vw);height:min(700px,92vh);border-radius:44px;background:#141418;padding:12px;box-shadow:0 0 0 2px #3a3a44,0 20px 60px rgba(0,0,0,.6),inset 0 0 0 2px #2a2a32}
#phApp .scr{position:relative;width:100%;height:100%;border-radius:34px;overflow:hidden;background:linear-gradient(160deg,#ffb7c5 0%,#c9a7ff 38%,#7fb2ff 72%,#8fe0d6 100%);display:flex;flex-direction:column;font-family:inherit}
#phApp .scr:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 15%,rgba(255,255,255,.45),transparent 40%),radial-gradient(circle at 85% 70%,rgba(255,255,255,.25),transparent 45%);pointer-events:none}
#phApp .notch{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:96px;height:24px;border-radius:14px;background:#0c0c10;z-index:3}
#phApp .sb{position:relative;display:flex;justify-content:space-between;align-items:center;padding:10px 22px 0;height:34px;color:#fff;font-size:13px;font-weight:700;text-shadow:0 1px 2px rgba(0,0,0,.3);z-index:2}
#phApp .wid{position:relative;margin:14px 16px 6px;padding:12px 14px;border-radius:22px;background:rgba(255,255,255,.28);backdrop-filter:blur(6px);color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
#phApp .wid .big{font-size:38px;font-weight:800;line-height:1;letter-spacing:1px}#phApp .wid .row{display:flex;gap:10px;margin-top:6px;font-size:12.5px;flex-wrap:wrap}
#phApp .grid{position:relative;flex:1;overflow-y:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:12px 6px;padding:10px 14px 16px;align-content:start;scrollbar-width:none}#phApp .grid::-webkit-scrollbar{display:none}
#phApp .app{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;background:none;border:none;padding:0;color:#fff;font:inherit}
#phApp .ic{position:relative;width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 3px 8px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -2px 0 rgba(0,0,0,.12);transition:transform .1s}
#phApp .app:active .ic,#phApp .app:hover .ic{transform:scale(1.08)}#phApp .app.off .ic{filter:grayscale(.85) brightness(.85)}#phApp .app.off .ic:after{content:"🔒";position:absolute;right:-4px;bottom:-4px;font-size:14px}
#phApp .lb{font-size:11.5px;text-shadow:0 1px 2px rgba(0,0,0,.45);white-space:nowrap;max-width:76px;overflow:hidden;text-overflow:ellipsis}
#phApp .bd{position:absolute;right:-6px;top:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#ff3b30;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
#phApp .dock{position:relative;margin:4px 12px 8px;padding:10px 8px;border-radius:26px;background:rgba(255,255,255,.3);backdrop-filter:blur(8px);display:grid;grid-template-columns:repeat(4,1fr)}
#phApp .dock .lb{display:none}#phApp .home{position:relative;margin:0 auto 8px;width:120px;height:5px;border-radius:3px;background:rgba(255,255,255,.85);cursor:pointer}
#phApp .x{position:absolute;right:-8px;top:-8px;width:34px;height:34px;border-radius:50%;background:#fff;border:3px solid #141418;font-size:16px;cursor:pointer;z-index:4;display:flex;align-items:center;justify-content:center}`;document.head.appendChild(s)}
const PHCOL=[[/通訊錄|電話/,'#34c759,#1f9e44','📞'],[/LINE/,'#06c755,#04a144','💬'],[/約定|行事曆/,'#ffffff,#e9e9ee'],[/任務/,'#ffcc4d,#f5a623'],[/脆G|IG|社群/,'#feda75,#d62976'],[/股票/,'#1c1c1e,#3a3a3c'],[/保險/,'#5ac8fa,#2a8bd6'],[/帳單|物價/,'#ff9f0a,#e07b00'],[/相簿/,'#ffd3e0,#ff7aa2'],[/相機/,'#8e8e93,#48484a'],[/圖鑑/,'#a8d672,#5aa83a'],[/點魚|釣/,'#64d2ff,#0a84ff'],[/老房子|老屋/,'#c69c6d,#8a5a2e'],[/收藏/,'#bf9bff,#7d5ad8'],[/成長/,'#ffe066,#ffb300'],[/設定/,'#d1d1d6,#8e8e93'],[/畫面/,'#7d7aff,#5856d6'],[/音樂/,'#ff6482,#ff2d55'],[/家事|藍圖/,'#ffd8a8,#f08c3a'],[/銀行|錢/,'#30d158,#248a3d']];
function phStrip(t){return String(t).replace(/<[^>]*>/g,'').replace(/^\s*\d+\s*　?/,'').trim()}
function phApp(opts,d){const old=document.getElementById('phApp');if(old)old.remove();
 const seen=new Set(),apps=[];opts.forEach(o=>{if(!o||typeof o[0]!='string')return;const raw=phStrip(o[0]);if(/^(關閉|返回|離開)$|上一頁|下一頁|^⬅|^➡/.test(raw.replace(/^\W+/,'')))return;
  const m=raw.match(/^((?:\p{Extended_Pictographic}|️|‍)+)\s*(.*)$/u),ic=m?m[1]:'📱',name0=(m?m[2]:raw).trim(),bd=(name0.match(/[（(](\d+)(?:\s*個問題)?[）)]/)||[])[1],name=name0.replace(/[（(][^）)]*[）)]/g,'').trim();
  if(!name||seen.has(name))return;seen.add(name);apps.push({ic,name,bd,sub:o[1]||'',fn:o[2],off:!!o[3]})});
 const col=n=>{const q=PHCOL.find(c=>c[0].test(n));return q?q[1]:'#ffffff,#d8d8de'};
 const hh=String(Math.floor(T.hour)).padStart(2,'0')+':'+String(Math.floor((T.hour%1)*60)).padStart(2,'0');
 let wk='';try{const h=wkLeft();wk=h>0?`⏳ 週末還剩 ${Math.floor(h)} 小時`:''}catch(e){}
 const dockN=['通訊錄','LINE','相機','設定'],dock=dockN.map(n=>apps.find(a=>a.name==n)).filter(Boolean),main=apps.filter(a=>!dock.includes(a));
 const btn=(a,i)=>`<button class="app${a.off?' off':''}" data-a="${i}" title="${(a.sub||'').replace(/"/g,'')}"><div class="ic" style="background:linear-gradient(160deg,${col(a.name)})">${a.ic}${a.bd&&+a.bd>0?`<span class="bd">${a.bd}</span>`:''}</div><div class="lb">${a.name}</div></button>`;
 const ov=document.createElement('div');ov.id='phApp';
 ov.innerHTML=`<div class="ph"><button class="x" data-x title="關閉（Esc）">✕</button><div class="scr"><div class="notch"></div><div class="sb"><span>${hh}</span><span>📶 🔋</span></div>
  <div class="wid"><div class="big">${hh}</div><div class="row"><span>${(d||'').replace(/<[^>]*>/g,'').replace(/\s*\d{1,2}:\d{2}\s*$/,'')||''}</span><span>💰 ${(st.money||0).toLocaleString('en-US')}</span>${wk?`<span>${wk}</span>`:''}</div></div>
  <div class="grid">${main.map(a=>btn(a,apps.indexOf(a))).join('')}</div><div class="dock">${dock.map(a=>btn(a,apps.indexOf(a))).join('')}</div><div class="home" data-x title="回到遊戲"></div></div></div>`;
 window.OVL=(window.OVL||0)+1;window.TITLE=true;try{Object.keys(keys).forEach(k=>keys[k]=0)}catch(e){}
 const close=()=>{OVK.delete(kd);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL};
 const kd=e=>{if(e.key=='Escape'||e.key=='p'||e.key=='P'){e.preventDefault();close()}};OVK.add(kd);
 ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('[data-x]'))return close();const b=e.target.closest('[data-a]');if(!b)return;const a=apps[+b.dataset.a];if(!a)return;
  if(a.off){toast('🔒 '+(phStrip(a.sub)||'還沒開放'));return}close();try{a.fn&&a.fn()}catch(er){console.error(er)}});
 document.body.appendChild(ov)}
// LINE：沒加入小組群組前，也可以跟朋友一對一傳訊息
function lineHome(){const fr=[];try{for(const id in FR){const s=st.fr&&st.fr[id];if(s&&s.met)fr.push(id)}}catch(e){}
 const grpOk=(()=>{try{return lineOpen()||lineS().m.length>0}catch(e){return false}})();
 openDlg('💬 LINE',`${fr.length?'點朋友的名字就能傳訊息（好感 +1，每天一次）':'還沒有認識的朋友，先到鎮上和大家打招呼吧！'}`,
  [[grpOk?'👨‍👩‍👧‍👦 城光家庭小組（群組）':'👨‍👩‍👧‍👦 城光家庭小組（群組）',grpOk?'看群組訊息、回覆大家':'受洗、結婚、和室整理好之後會被加進群組',()=>{if(!grpOk)return toast('🔒 受洗、結婚、和室整理好之後會被加進群組');closeDlg();lineView()},!grpOk]]
  .concat(fr.map(id=>{const F=FR[id],s=FRS(id),done=s.td==dKey();return[`${F.ic} ${F.n}`,(done?'今天聊過了・':'')+F.who,()=>lineChat(id)]}))
  .concat([['返回','',phoneHome]]))}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>/LINE/.test(String(o[0])));if(i>=0){opts[i]=opts[i].slice();opts[i][2]=()=>{closeDlg();lineHome()};opts[i][3]=0}
  if(!opts.some(o=>/家事/.test(String(o[0]))))opts.splice(opts.length-1,0,['🧺 家事','洗碗、洗衣、打掃、倒垃圾',()=>{closeDlg();hwMenu()},0,1])}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}

{const _ph=phoneHome;phoneHome=function(){const r=_ph.apply(this,arguments);try{if(curDlg&&curDlg[0]=='📱 手機'&&!dlg.hidden){const o=curDlg[2].slice(),d=curDlg[1];closeDlg();phApp(o,d)}}catch(e){console.error(e)}return r}}
phoneMenu=phoneHome;
