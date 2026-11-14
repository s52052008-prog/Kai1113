/* v12.6 幻境 Online：裝備／素材改成「圖示格子＋旁邊的詳細資料欄」 */
// 通用面板：o={title,sub,items:[{ic,col,tl,br,warn,name,rar,lines,acts:[[文字,fn,停用,顏色]]}],foot:[[文字,fn,停用]],back,sel,empty}
function vrInv(o){vrInvClose();try{if(!dlg.hidden)closeDlg()}catch(e){}
 const ov=document.createElement('div');window._vrInv=ov;ov.className='vrinv';
 ov.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(10,6,24,.72);display:flex;align-items:center;justify-content:center;padding:10px;font-family:var(--gfont,inherit)';
 let sel=Math.max(0,Math.min((o.items||[]).length-1,o.sel||0)),hov=null;const I=o.items||[];
 ov.innerHTML=`<style>
 .vrinv .pn{background:linear-gradient(#34265a,#20163a);border:3px solid #ffd84a;border-radius:14px;color:#fff;width:min(96vw,880px);height:min(92vh,640px);display:flex;flex-direction:column;box-shadow:0 0 30px rgba(0,0,0,.5)}
 .vrinv .hd{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:2px solid #4a3a7a}
 .vrinv .hd b{font-size:20px;color:#ffd84a;white-space:nowrap}.vrinv .hd .sb{flex:1;font-size:12px;opacity:.85;min-width:0}
 .vrinv .x{font:inherit;cursor:pointer;border:2px solid #9aa0ff;background:#2e2448;color:#fff;border-radius:8px;padding:4px 12px}
 .vrinv .bd{flex:1;display:flex;gap:10px;padding:10px;min-height:0}
 .vrinv .gr{flex:1;overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(62px,1fr));gap:6px;align-content:start;padding-right:4px}
 .vrinv .tl{position:relative;aspect-ratio:1;border-radius:10px;border:3px solid #6a5a8a;background:#1a1230;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer;user-select:none}
 .vrinv .tl img{width:70%;height:70%;image-rendering:pixelated;object-fit:contain}
 .vrinv .tl.on{outline:3px solid #fff;outline-offset:1px;background:#3a2a5a}
 .vrinv .tl i{position:absolute;font-style:normal;font-size:11px;line-height:1;text-shadow:0 1px 0 #000,1px 0 0 #000,-1px 0 0 #000,0 -1px 0 #000}
 .vrinv .tl .a{left:3px;top:3px}.vrinv .tl .b{right:3px;bottom:3px;color:#ffe9a0}.vrinv .tl .w{right:3px;top:3px}
 .vrinv .dt{width:300px;flex:none;background:#160f28;border:2px solid #4a3a7a;border-radius:12px;padding:12px;overflow:auto;display:flex;flex-direction:column;gap:6px}
 .vrinv .dt .bi{font-size:44px;text-align:center;line-height:1.2}.vrinv .dt .bi img{width:64px;height:64px;image-rendering:pixelated}
 .vrinv .dt .nm{font-size:17px;font-weight:bold;text-align:center;text-shadow:0 1px 0 #000}.vrinv .dt .rr{text-align:center;font-size:12px}
 .vrinv .dt ul{margin:4px 0;padding-left:18px;font-size:13px;line-height:1.6}.vrinv .dt .wn{font-size:12px;color:#ff9a9a}
 .vrinv .ab{font:inherit;cursor:pointer;border-radius:10px;padding:8px;border:2px solid #9aff9a;background:#204a30;color:#fff;font-size:14px}
 .vrinv .ab:disabled{opacity:.4;cursor:default}
 .vrinv .ft{display:flex;gap:8px;flex-wrap:wrap;padding:8px 12px;border-top:2px solid #4a3a7a}
 .vrinv .ft button{font:inherit;cursor:pointer;border-radius:8px;padding:6px 12px;border:2px solid #7a6aa0;background:#2e2448;color:#fff;font-size:13px}
 .vrinv .ft button:disabled{opacity:.4}
 .vrinv .em{grid-column:1/-1;opacity:.7;text-align:center;padding:30px 10px}
 @media (max-width:640px){.vrinv .bd{flex-direction:column}.vrinv .dt{width:auto;max-height:42%}.vrinv .gr{grid-template-columns:repeat(auto-fill,minmax(54px,1fr))}}
 </style><div class="pn"><div class="hd"><b>${o.title}</b><div class="sb">${o.sub||''}</div><button class="x" data-x>✕ 返回</button></div>
 <div class="bd"><div class="gr"></div><div class="dt"></div></div>${(o.foot||[]).length?'<div class="ft"></div>':''}</div>`;
 const gr=ov.querySelector('.gr'),dt=ov.querySelector('.dt');
 const tile=(it,i)=>`<div class="tl${i==sel?' on':''}" data-i="${i}" style="border-color:${it.col||'#6a5a8a'};box-shadow:${it.glow?'0 0 10px '+it.col:'none'}">${it.ic}${it.tl?`<i class="a">${it.tl}</i>`:''}${it.br!=null?`<i class="b">${it.br}</i>`:''}${it.warn?'<i class="w">⚠️</i>':''}</div>`;
 const detail=()=>{const it=I[hov??sel];if(!it){dt.innerHTML=`<div style="opacity:.7;text-align:center;margin-top:30px">${o.empty||'這裡空空的'}</div>`;return}
  dt.innerHTML=`<div class="bi">${it.big||it.ic}</div><div class="nm" style="color:${it.col||'#fff'}">${it.name}</div>${it.rar?`<div class="rr" style="color:${it.col}">${it.rar}</div>`:''}
   ${it.lines&&it.lines.length?'<ul>'+it.lines.map(l=>`<li>${l}</li>`).join('')+'</ul>':''}${it.note?`<div style="font-size:12px;opacity:.85">${it.note}</div>`:''}${it.warn?`<div class="wn">⚠️ ${it.warn}</div>`:''}
   ${hov!=null&&hov!=sel?'<div style="font-size:11px;opacity:.6;text-align:center">點一下選取，就能操作</div>':(it.acts||[]).map((a,k)=>`<button class="ab" data-a="${k}" ${a[2]?'disabled':''} style="border-color:${a[3]||'#9aff9a'};background:${a[3]=='#ff9a9a'?'#4a2030':a[3]=='#9ae8ff'?'#1e3a4a':'#204a30'}">${a[0]}</button>`).join('')}`;
  dt.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=it.acts[+b.dataset.a];if(!a[2])a[1]()})};
 const draw=()=>{gr.innerHTML=I.length?I.map(tile).join(''):`<div class="em">${o.empty||'這裡空空的'}</div>`;
  gr.querySelectorAll('[data-i]').forEach(t=>{t.onclick=()=>{sel=+t.dataset.i;hov=null;draw()};t.onmouseenter=()=>{hov=+t.dataset.i;detail()};t.onmouseleave=()=>{hov=null;detail()}});detail()};
 const ft=ov.querySelector('.ft');if(ft)(o.foot||[]).forEach(f=>{if(!f)return;const b=document.createElement('button');b.textContent=f[0];b.disabled=!!f[2];b.onclick=()=>{if(!f[2])f[1]()};ft.appendChild(b)});
 const back=()=>{vrInvClose();(o.back||vrLobby)()};ov.querySelector('[data-x]').onclick=back;ov.addEventListener('pointerdown',e=>{if(e.target===ov)back()});
 ov._key=e=>{if(window._vrInv!==ov)return;if(e.key=='Escape'){e.preventDefault();e.stopImmediatePropagation();back()}else if(/^Arrow/.test(e.key)&&I.length){e.preventDefault();e.stopImmediatePropagation();const cols=Math.max(1,Math.round(gr.clientWidth/68)),d={ArrowLeft:-1,ArrowRight:1,ArrowUp:-cols,ArrowDown:cols}[e.key];sel=Math.max(0,Math.min(I.length-1,sel+d));hov=null;draw();const t=gr.querySelector('.on');t&&t.scrollIntoView({block:'nearest'})}};
 addEventListener('keydown',ov._key,true);draw();document.body.appendChild(ov);const t=gr.querySelector('.on');t&&t.scrollIntoView({block:'nearest'});return ov}
function vrInvClose(){const o=window._vrInv;if(o){removeEventListener('keydown',o._key,true);o.remove();window._vrInv=null}}
// 裝備的格子資料
function vrInvIt(it,extra){const w=it.t=='w',ic=w?VWP[it.b].ic:'🛡️',L=[w?`⚔️ 攻擊 +${it.atk}%`:`🛡️ 防禦 +${it.def}`].concat(Object.entries(it.af).map(([k,v])=>`${AFX[k][0]} ${k=='cdr'?'-':'+'}${v}${AFX[k][3]}`));if(it.leg)L.push('🔥 攻擊附帶燃燒');
 return Object.assign({ic,col:VRAR[it.r][1],glow:it.r>=3,tl:'',br:'Lv'+it.lv,name:vrItName(it),rar:`${VRAR[it.r][0]}・${w?VWP[it.b].n:'防具'}・Lv.${it.lv}`,lines:L},extra||{})}
const vrSortIt=(a,b)=>b.r-a.r||b.lv-a.lv||(a.t>b.t?1:-1);
// 🎒 背包
function vrBag(sel){const V=vrS(),C=vrCls(),L=V.bag.slice().sort(vrSortIt);
 vrInv({title:'🎒 裝備與背包',sub:`${V.bag.length}/30 件・💠 ${V.gold}・把滑鼠移到圖示上看屬性，點一下選取`,sel:typeof sel=='number'?sel:L.findIndex(i=>i.id==sel),empty:'背包是空的，去幻境打怪吧！',
  items:L.map((it,i)=>{const on=V.eq.w==it.id||V.eq.a==it.id,ok=it.t=='a'||C.wp.includes(it.b),ub=vrUsedBy(it.id),uby=ub&&ub!='你'?ub:'';
   return vrInvIt(it,{tl:on?'✅':uby?'👥':'',warn:ok?'':C.n+'不能用這種武器',note:on?'你正穿著這件':uby?uby+' 正在用這件':'',
    acts:[[on?'（穿著中）':'👕 穿上',()=>{if(it.t=='w'){V.eq.w=it.id;V.cur=it.b}else V.eq.a=it.id;SVDIRTY=1;toast('✨ 換上了 '+vrItName(it));vrBag(it.id)},on||!ok],
     ['🌀 收進異次元',()=>{V.bag=V.bag.filter(x=>x!==it);vrStash().push(it);SVDIRTY=1;vrBag(Math.min(i,L.length-2))},on||!!uby,'#9ae8ff'],
     ['💰 賣掉（💠'+VPRICE(it)+'）',()=>{V.bag=V.bag.filter(x=>x!==it);V.gold+=VPRICE(it);SVDIRTY=1;toast('💠 +'+VPRICE(it));vrBag(Math.min(i,L.length-2))},on||!!uby,'#ff9a9a']]})}),
  foot:[['💰 賣掉全部「普通」（沒穿的）',()=>{const s=V.bag.filter(i=>i.r==0&&i.id!=V.eq.w&&i.id!=V.eq.a&&!vrUsedBy(i.id));let g=0;s.forEach(i=>g+=VPRICE(i));V.bag=V.bag.filter(i=>!s.includes(i));V.gold+=g;SVDIRTY=1;toast('💠 +'+g);vrBag()}],
   ['📦 「普通」全部收進異次元',()=>{const mv=V.bag.filter(i=>i.r==0&&i.id!=V.eq.w&&i.id!=V.eq.a&&!vrUsedBy(i.id));V.bag=V.bag.filter(i=>!mv.includes(i));vrStash().push(...mv);SVDIRTY=1;toast('📦 收進 '+mv.length+' 件');vrBag()}],['🌀 打開異次元背包',()=>vrStashView()]]})}
// 🌀 異次元背包
function vrStashView(sel){const V=vrS(),L=vrStash().slice().sort(vrSortIt);
 vrInv({title:'🌀 異次元背包',sub:`收了 ${L.length} 件（上限 300）・隨身背包 ${V.bag.length}/30・背包裝不下的裝備會傳送到這裡`,sel:typeof sel=='number'?sel:0,empty:'異次元背包是空的',back:vrLobby,
  items:L.map((it,i)=>vrInvIt(it,{acts:[['🎒 拿到隨身背包',()=>{V.stash=vrStash().filter(x=>x!==it);V.bag.push(it);SVDIRTY=1;vrStashView(Math.min(i,L.length-2))},V.bag.length>=30],
   ['💰 賣掉（💠'+VPRICE(it)+'）',()=>{V.stash=vrStash().filter(x=>x!==it);V.gold+=VPRICE(it);SVDIRTY=1;toast('💠 +'+VPRICE(it));vrStashView(Math.min(i,L.length-2))},0,'#ff9a9a']]})),
  foot:[['💰 賣掉這裡全部「普通」',()=>{const s=vrStash().filter(i=>i.r==0);let g=0;s.forEach(i=>g+=VPRICE(i));V.stash=vrStash().filter(i=>i.r!=0);V.gold+=g;SVDIRTY=1;toast('💠 +'+g);vrStashView()}],['🎒 打開隨身背包',()=>vrBag()]]})}
// 👥 幫隊友換裝備
function vrAllyPick(k,t){const V=vrS(),A=vrAeq(),C=VCLS[VPAL[k].cls],q=A[k]||(A[k]={});const L=V.bag.filter(i=>i.t==t&&(t=='a'||C.wp.includes(i.b))&&(!vrUsedBy(i.id)||q[t]==i.id)).sort(vrSortIt);
 vrInv({title:(t=='w'?'🗡️ 幫':'🛡️ 幫')+VPAL[k].n+(t=='w'?'換武器':'換防具'),sub:t=='w'?`${C.n}能用：${C.wp.map(b=>VWP[b].ic+VWP[b].n).join('、')}・你身上穿的不能借`:'你身上穿的不能借',back:()=>vrAlly(k),sel:Math.max(0,L.findIndex(i=>i.id==q[t])),
  empty:'背包裡沒有能用的'+(t=='w'?'武器':'防具'),items:L.map(it=>vrInvIt(it,{tl:q[t]==it.id?'✅':'',acts:[[q[t]==it.id?'（使用中）':'✨ 給'+VPAL[k].n+'用',()=>{q[t]=it.id;SVDIRTY=1;toast('✨ '+VPAL[k].n+' 換上了 '+vrItName(it));vrAlly(k)},q[t]==it.id]]})),
  foot:q[t]?[['卸下目前的'+(t=='w'?'武器':'防具'),()=>{q[t]=null;SVDIRTY=1;vrAlly(k)}]]:[]})}
// 💎 素材
const vrPkImg=(ic,fb)=>{let u='';try{u=typeof UA!='undefined'&&UA['pk43_'+ic]}catch(e){}return u?`<img src="${u}">`:fb},vrMatIc=k=>vrPkImg(VMAT[k]&&VMAT[k][1],'💎');
function vrMatView(sel){const V=vrS(),L=Object.keys(VMAT).filter(k=>(V.mat[k]||0)>0),pr=6;
 vrInv({title:'💎 素材',sub:`💠 ${V.gold}・素材可以拿去「🔨 素材工坊」打造有名字的好裝備，別急著全部賣掉！`,sel:sel||0,empty:'還沒有素材，打怪會掉喔',
  items:L.map((k,i)=>{const n=V.mat[k],from=Object.values(VMOB).filter(M=>!M.hide&&(M.drop||[]).some(d=>d[0]==k)).map(M=>M.n),use=(typeof VFORGE!='undefined'?VFORGE:[]).filter(f=>f.m[k]).map(f=>`${f.nm}（要 ${f.m[k]}）`);
   return{ic:vrMatIc(k),col:'#9ae8ff',br:'×'+n,name:VMAT[k][0],rar:`持有 ${n} 個・每個賣 💠${pr}`,lines:[`📍 哪裡掉：${from.slice(0,6).join('、')||'—'}${from.length>6?'…':''}`,`🔨 可以打造：${use.join('、')||'目前沒有配方'}`],
    acts:[['💰 賣 1 個（💠'+pr+'）',()=>{V.mat[k]--;V.gold+=pr;SVDIRTY=1;vrMatView(V.mat[k]?i:Math.max(0,i-1))},0,'#ff9a9a'],['💰 這種全部賣掉（💠'+n*pr+'）',()=>{V.gold+=n*pr;V.mat[k]=0;SVDIRTY=1;toast('💠 +'+n*pr);vrMatView(Math.max(0,i-1))},0,'#ff9a9a'],['🔨 去素材工坊',()=>{vrInvClose();vrForge()},typeof vrForge!='function','#9ae8ff']]}}),
  foot:[['💰 全部素材都賣掉',()=>{let g=0;for(const k in V.mat){g+=V.mat[k]*pr;V.mat[k]=0}V.gold+=g;SVDIRTY=1;toast('💠 +'+g);vrMatView()},!L.length]]})}
// 🗡️ 武器店、🧪 道具店
function vrWeapons(sel){const V=vrS(),C=vrCls(),L=Object.entries(VWP);
 vrInv({title:'🗡️ 幻境武器店',sub:`💠 ${V.gold}・這裡只賣「普通」品質，好裝備要靠打怪掉或素材工坊打造`,sel:sel||0,
  items:L.map(([k,w],i)=>({ic:w.ic,col:C.wp.includes(k)?'#d8d8d8':'#6a5a6a',br:'💠'+w.price,warn:C.wp.includes(k)?'':C.n+'不能用',name:w.n,rar:'普通・Lv.'+V.lv,lines:[w.d,'技能：'+w.sk.map(s=>VSK[s].n).join('／')],
   acts:[['💠 買下（'+w.price+'）',()=>{if(V.bag.length>=30)return toast('背包滿了');V.gold-=w.price;V.bag.push(vrMkItem('w',0,V.lv,k));SVDIRTY=1;toast('🗡️ 買了'+w.n);vrWeapons(i)},V.gold<w.price]]}))})}
function vrShop(sel){const V=vrS(),L=Object.entries(VIT).filter(([k,it])=>!it.v);
 vrInv({title:'🧪 幻境道具店',sub:`💠 ${V.gold}`,sel:sel||0,
  items:L.map(([k,it],i)=>{return{ic:vrPkImg(it.pk,'🧪'),col:'#ffd84a',br:'×'+(V.inv[k]||0),name:it.n,rar:'💠'+it.p+'・身上有 '+(V.inv[k]||0)+' 個',lines:[it.d],
   acts:[['💠 買 1 個（'+it.p+'）',()=>{V.gold-=it.p;V.inv[k]=(V.inv[k]||0)+1;SVDIRTY=1;vrShop(i)},V.gold<it.p],['💠 買 5 個（'+it.p*5+'）',()=>{V.gold-=it.p*5;V.inv[k]=(V.inv[k]||0)+5;SVDIRTY=1;vrShop(i)},V.gold<it.p*5]]}})})}
// 大廳的「賣素材」改成打開素材欄
{const _l=vrLobby;vrLobby=function(){vrInvClose();_l.apply(this,arguments);try{if(!curDlg||!String(curDlg[0]).includes('幻境'))return;const o=curDlg[2],i=o.findIndex(q=>String(q[0]).includes('賣素材'));if(i<0)return;const n=Object.values(vrS().mat).reduce((a,b)=>a+(b||0),0);o[i]=['💎 素材',n?n+' 個':'沒有素材',()=>vrMatView(),0,1];openDlg(curDlg[0],curDlg[1],o,0,'grid')}catch(e){console.warn(e)}}}
