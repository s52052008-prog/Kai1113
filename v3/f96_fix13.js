/* v13.5 修正與介面：手機選單、運動中心樓層卡住、德魯伊抓滿寵物、裝備圖示、⬅ 上一頁、任務欄（主線／支線）、外帶、超商 ATM、睡覺過場 */
// ───────── 手機：P 鍵和選單一律打開「最新」的手機（之前被舊捷徑擋住，Binder、成長紀錄、老屋健檢都看不到） ─────────
phoneMenu=function(){return phoneHome.apply(this,arguments)};
// ───────── 運動中心 B1／2F／3F：電梯出口卡在牆裡 ─────────
{const _m=mtnShow;mtnShow=function(){const r=_m.apply(this,arguments);try{if(rm&&typeof iBlocked=='function'&&iBlocked()){p.y-=34;if(iBlocked())unstick()}}catch(e){}return r}}
// ───────── 德魯伊：寵物滿了，E 變成「森林龍捲風」 ─────────
function druTornado(a,D,X){const G=X.G,P=X.P,s=Math.cos(a)>=0?1:-1;X.say('🌪️ 寵物滿了！森林龍捲風！',1.2);G.shake=Math.max(G.shake||0,5);
 const hitT=new Map();G.fx.push({k:'drutor',x:P.x+s*40,y:P.y,vx:s*300,t:0,dur:2.4,
  upd(f,dt){f.x+=f.vx*dt;f.vx*=1-dt*.25;G.mobs.forEach(m=>{if(m.dead||m.capT||m.hide)return;if(Math.abs(m.x-f.x)<62+m.r*.4&&Math.abs(m.y-f.y)<160){const last=hitT.get(m)||-9;if(f.t-last>=.35){hitT.set(m,f.t);X.hitMob(m,D*.7,{kb:false,fx:f.x,fy:f.y});if(!m.T.boss){m.vy=-720;m.x+=(f.x-m.x)*.3;m.stun=Math.max(m.stun||0,1.2)}else m.slow=1.5}}});
   if(Math.random()<dt*40)G.parts.push({x:f.x+(Math.random()-.5)*60,y:f.y+20,vx:(Math.random()-.5)*80,vy:-160-Math.random()*120,t:0,c:['#9ae05a','#e8ffd0','#5a9a3a'][Math.random()*3|0]})},
  drw(g,f){const al=Math.min(1,f.t*4,(f.dur-f.t)*2.5);g.save();g.globalAlpha=al*.9;for(let k=0;k<11;k++){const yy=f.y+40-k*18,rr=10+k*7,off=Math.sin(G.t*16+k*.8)*(6+k);g.strokeStyle=k%3==0?'rgba(140,220,90,.9)':k%3==1?'rgba(230,255,220,.85)':'rgba(90,160,60,.8)';g.lineWidth=5;g.beginPath();g.ellipse(f.x+off,yy,rr,5+k*.9,0,0,7);g.stroke()}
   for(let j=0;j<5;j++){const ang=G.t*9+j*1.26,yy=f.y-20-j*26;g.fillStyle='#7ad04a';g.beginPath();g.ellipse(f.x+Math.cos(ang)*(18+j*9),yy,6,3,ang,0,7);g.fill()}g.restore()}})}
VDRU.tame=function(a,D,X){if((X.G.pets||[]).filter(p=>!p.dead).length>=vrPetMax())return druTornado(a,D,X);if(!vrTame(X))X.refund('e')};
// ───────── 小鎮裝備：帽子／上衣／褲子／鞋子／配件 用對應圖示，不再是刀劍盾牌 ─────────
{const SLI={'帽子':'🧢','上衣':'👕','褲子':'👖','鞋子':'👟','配件':'💍'};const _oe=openEquip;openEquip=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts))opts.forEach(o=>{if(typeof o[0]!='string')return;for(const k in SLI)if(o[0].includes(k+'：')||o[0].includes(k+'／')){o[0]=o[0].replace(/^▫️\s*/,SLI[k]+' ').replace('（未裝備）','（空）');break}});return od.call(this,t,d,opts,...r)};try{return _oe.apply(this,arguments)}finally{openDlg=od}}}

// ───────── 每個選單都有「⬅ 上一頁」 ─────────
{let H=[],LAST=null,BACK=0;
 const isClose=s=>typeof s=='string'&&/^(關閉|離開|取消|掛斷)/.test(s.replace(/<[^>]+>/g,'').trim());
 const isBack=s=>typeof s=='string'&&/^(返回|⬅|↩|上一頁|回到)/.test(s.replace(/<[^>]+>/g,'').trim());
 const _od=openDlg;openDlg=function(t,d,opts,sub,...rest){try{
  if(!BACK&&!sub){const prev=LAST&&LAST.live?LAST:null;if(prev&&prev.t!==t&&!/\d+\/\d+/.test(String(prev.t))){H.push(prev);if(H.length>12)H.shift()}else if(!prev)H=[]}
  if(Array.isArray(opts)&&!sub){LAST={t,d,opts:opts.slice(),rest,live:1};
   if(H.length&&opts.length&&isClose(opts[opts.length-1][0])&&!opts.some(o=>isBack(o[0]))){const prev=H[H.length-1];opts=opts.slice();opts.splice(opts.length-1,0,['⬅ 上一頁','回到「'+String(prev.t).replace(/<[^>]+>/g,'').slice(0,14)+'」',()=>{const q=H.pop();BACK=1;try{openDlg(q.t,q.d,q.opts,undefined,...q.rest)}finally{BACK=0}},0,1])}}else LAST=null}catch(e){console.error(e)}
  return _od.call(this,t,d,opts,sub,...rest)};
 new MutationObserver(()=>{if(!dlg.hidden)return;const L=LAST;setTimeout(()=>{if(dlg.hidden&&LAST===L){LAST=null;H=[]}},0)}).observe(dlg,{attributes:true,attributeFilter:['hidden']})}

// ───────── 任務欄：可以縮放，分「主線」「支線」 ─────────
(function(){const s=document.createElement('style');s.textContent=`#qp .qtab{display:inline-block;font-size:10.5px;font-weight:800;padding:1px 8px;border-radius:10px;margin-right:3px;cursor:pointer;border:1.5px solid #8a5a2e;background:#f3e2bc;color:#5a3417}
#qp .qtab.on{background:#8a5a2e;color:#fff6dc}#qp .qhd{display:flex;align-items:center;gap:4px;margin-bottom:3px}#qp .qx{margin-left:auto;font-size:11px;opacity:.7;cursor:pointer;padding:0 4px}
#qp .qside div{margin-top:3px;line-height:1.35}#qp.qmin{width:auto!important;padding:3px 9px!important}`;document.head.appendChild(s)})();
let QTAB=0;
function qSide(){const L=[];try{const od=openDlg;let d='';openDlg=function(t,dd){d=dd};try{todoView()}finally{openDlg=od}String(d).split('<br>').map(x=>x.trim()).filter(Boolean).forEach(x=>L.push(x))}catch(e){}
 try{if(st.er&&st.er.key)L.unshift('📌 '+st.er.by+'的委託：'+(st.er.t||st.er.d||'進行中'))}catch(e){}
 try{const G=rnS().grp;if(G&&G.req&&G.req.w==wkN())L.unshift('🙏 小組委託：'+G.req.by+'想要「'+(G.req.it=='veg'?'自己種的菜':IT[G.req.it].n)+'」')}catch(e){}
 try{const O=ohS();OHK.forEach(k=>{if(O[k].seen&&!O[k].fix)L.push('🏚️ 老屋：'+OHF[k].n+'（根治 💰'+OHF[k].cost.toLocaleString('en-US')+'）')})}catch(e){}
 return L}
{const _q=qpanel;qpanel=function(){const r=_q.apply(this,arguments);try{const main=qp.innerHTML,txt=qp.textContent;
 if(!qOpen){let m=null;try{if(typeof proOn=='function'&&proOn()){const G=proGoals(st.pro.ch);m=[G.filter(x=>x[1]).length+'/'+G.length]}else m=txt.match(/人生目標\s*(\d+\/\d+)/);if(m&&m[1])m=[m[1]]}catch(e){}qp.classList.add('qmin');qp.innerHTML=`<b>📜 任務</b> <span style="font-size:10.5px;opacity:.8">主線${m?' '+m[0]:''}・支線 ${qSide().length}</span> ▸`;return r}
 qp.classList.remove('qmin');const side=qSide();
 qp.innerHTML=`<div class="qhd"><span class="qtab${QTAB==0?' on':''}" data-qt="0">主線</span><span class="qtab${QTAB==1?' on':''}" data-qt="1">支線 ${side.length}</span><span class="qx" data-qx>▲ 收起</span></div>`+
  (QTAB==0?`<div>${main.replace(/ ▸$/,'')}</div>`:`<div class="qside">${side.length?side.map(x=>`<div>${x}</div>`).join(''):'<div style="opacity:.7">目前沒有支線任務</div>'}</div>`)}catch(e){console.error(e)}return r}}
{const _c=qp.onclick;qp.onclick=function(e){const t=e&&e.target;if(t&&t.dataset&&t.dataset.qt!=null){e.stopPropagation();QTAB=+t.dataset.qt;qpanel();return}
 if(t&&t.dataset&&t.dataset.qx!=null){qOpen=false;qpanel();return}if(qOpen&&QTAB==1)return;if(!qOpen){qOpen=true;qpanel();return}return _c.apply(this,arguments)}}
setTimeout(()=>{try{qpanel()}catch(e){}},800);

// ───────── 咖啡廳、餐廳：外帶為主（放進背包，可以之後吃或送人） ─────────
const fdKind=f=>f.kind||((f.s||0)<=8?'drink':'meal');
const fdIc=f=>{const k=fdKind(f);return k=='drink'?'🥤':k=='sweet'?'🍰':k=='dim'?'🥟':'🥡'};
function fdReg(){try{FOODS.forEach(f=>{const k='fd_'+f.id;if(IT[k])return;IT[k]={n:f.n+'（外帶）',i:fdIc(f),p:Math.round(f.p*.3),d:`外帶的${f.n}。⚡+${f.s}${f.j?' 😊+'+f.j:''}・可以自己吃，也可以送人。`,u:{s:f.s,j:f.j||0,h:f.h||0},fd:f.id}})}catch(e){}}
fdReg();setTimeout(fdReg,1500);
let FD_TO=true;
addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-tog]');if(!b)return;FD_TO=!FD_TO;b.innerHTML=FD_TO?'🥡 外帶（放進背包）':'🍽️ 內用（現在吃）';b.style.background=FD_TO?'#2f7a3a':'#8a5a2e'},true);
{const _f=foodMenu;foodMenu=function(title,sub,groups,o={}){if(o&&o.cost)return _f.apply(this,arguments);const op=picPanel;
 picPanel=function(t,sb,tabs,onPick,...r){const sw=`<br><button data-tog style="font:inherit;font-size:13px;font-weight:800;color:#fff;background:${FD_TO?'#2f7a3a':'#8a5a2e'};border:2px solid #24150a;border-radius:14px;padding:3px 12px;cursor:pointer;margin-top:4px">${FD_TO?'🥡 外帶（放進背包）':'🍽️ 內用（現在吃）'}</button> <span style="font-size:11.5px;opacity:.75">點一下切換</span>`;
  return op.call(this,t,sb+sw,tabs,(it,close,draw)=>{if(!FD_TO)return onPick(it,close,draw);const f=it.f,k='fd_'+it.id;fdReg();if(st.money<it.cost){toast('💸 錢不夠');return false}if(!addItem(k,1))return false;st.money-=it.cost;advance(.1);hud();SVDIRTY=1;
   const D=dexF();if(!D[it.id]){D[it.id]=wkN()}toast(`🥡 外帶 ${f.n}，放進背包了（身上 ${st.inv[k]} 份）`);try{draw()}catch(e){}return false},...r)};
 try{return _f.apply(this,arguments)}finally{picPanel=op}}}
// 外帶的東西送禮：看是哪一類
{const gk=k=>{const f=FDI[IT[k].fd];if(!f)return null;const n=f.n,kd=fdKind(f);return /咖啡|拿鐵|美式|卡布/.test(n)?'coffee':kd=='drink'?'drink':kd=='sweet'?(/蛋糕/.test(n)?'cake':'cake'):'lunch'};
 const _g=giftMenu;giftMenu=function(id){try{const F=FR[id];Object.keys(st.inv).forEach(k=>{if(k.startsWith('fd_')&&st.inv[k]>0&&F.likes&&F.likes[k]==null){const c=gk(k);F.likes[k]=Math.max(2,(F.likes[c]||1))}})}catch(e){}return _g.apply(this,arguments)}}

// ───────── 全家：ATM 提款／存款 ─────────
function atmMenu(){const n=x=>x.toLocaleString('en-US'),o=[];
 [1000,3000,5000,10000,20000].forEach(v=>o.push([`💵 提款 ${n(v)}`,'',()=>{st.bank-=v;st.money+=v;hud();SVDIRTY=1;toast(`🏧 提款 ${n(v)}　現金 ${n(st.money)}`);atmMenu()},st.bank<v]));
 o.push([`💵 全部領出（${n(st.bank)}）`,'',()=>{st.money+=st.bank;st.bank=0;hud();SVDIRTY=1;atmMenu()},st.bank<=0]);
 o.push([`🏦 現金全部存入（${n(st.money)}）`,'跨行存款免手續費',()=>{st.bank+=st.money;st.money=0;hud();SVDIRTY=1;atmMenu()},st.money<=0]);
 o.push(['返回','',openShop]);openDlg('🏧 全家 ATM',`💰 現金 <b>${n(st.money)}</b>　🏦 存款 <b>${n(st.bank)}</b>`,o)}
{const _s=shopDlg;shopDlg=function(t,ids,ex,...r){if(String(t).startsWith('🏪 全家'))ex=[['🏧 ATM（提款／存款）','24 小時・免手續費',atmMenu]].concat(ex||[]);return _s.call(this,t,ids,ex,...r)}}

// ───────── 睡覺：畫面暗下來的過場 ─────────
function sleepFx(txt2){const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99997;background:#05060f;opacity:0;transition:opacity .9s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#cfd8ff;font-weight:800;pointer-events:none';
 ov.innerHTML=`<div style="font-size:40px;animation:zz 1.6s ease-in-out infinite">💤</div><div style="font-size:18px;letter-spacing:4px">Z z z …</div><div style="font-size:13px;opacity:.7">${txt2||''}</div><style>@keyframes zz{50%{transform:translateY(-8px) scale(1.08)}}</style>`;
 document.body.appendChild(ov);requestAnimationFrame(()=>ov.style.opacity='1');setTimeout(()=>{ov.style.opacity='0';setTimeout(()=>ov.remove(),1000)},2300)}
{const _w=wakeTo6;wakeTo6=function(){const f=!!st._fainting;try{if(!f)sleepFx('隔天早上 06:00')}catch(e){}return _w.apply(this,arguments)}}
{const _om=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts))opts.forEach(o=>{if(o[0]=='裝備'||o[0].startsWith('裝備'))o[0]='👕 '+o[0];if(String(o[0]).startsWith('👕 裝備'))o[1]=o[1]||'帽子、衣服、褲子、鞋子、配件（到服飾店買）'});return od.call(this,t,d,opts,...r)};try{return _om.apply(this,arguments)}finally{openDlg=od}}}
// ───────── 德魯伊寵物變強：一半機率是「⭐ 菁英」，血更厚、打更痛、會慢慢回血 ─────────
{const _s=vrPetStats;vrPetStats=function(p){_s.apply(this,arguments);const k=p.petElite?1:0;const hm=1.7*(k?1.8:1),am=1.3*(k?1.5:1);const r=p.mhp?p.hp/p.mhp:1;p.mhp=Math.round(p.mhp*hm);p.hp=Math.round(p.mhp*r);p.atk*=am}}
{const _m=vrMakePet;vrMakePet=function(m,X){m.petElite=(m.T&&m.T.mini)||Math.random()<.5?1:0;const r=_m.apply(this,arguments);try{if(m.petElite){m.name='⭐'+m.name.replace('🐾','🐾菁英');X.G.fx.push({k:'ring',x:m.x,y:m.y,r:90,t:0,dur:.6,c:'#ffd84a'});setTimeout(()=>X.say('⭐ 是菁英寵物！血量、攻擊大幅提升！',1.8),2100)}}catch(e){}return r}}
{const _h=vrPetHurt;vrPetHurt=function(p,d,X){return _h.call(this,p,d*(p.petElite?.6:.8),X)}}
{const _t=vrPetTick;vrPetTick=function(dt,X){try{(X.G.pets||[]).forEach(p=>{if(!p.dead&&p.hp<p.mhp)p.hp=Math.min(p.mhp,p.hp+p.mhp*(p.petElite?.025:.015)*dt)})}catch(e){}return _t.apply(this,arguments)}}
