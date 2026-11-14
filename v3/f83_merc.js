/* v12.9 隊友傭兵系統：自己的等級、屬性點、轉職（本命加成／適性）、好友分享卷 */
// 適性：本命職業 +10%；特別不擅長的職業會寫原因
const VAPT={bokai:{bard:[.75,'柏凱完全不會樂器，只能抱著琴亂刷——全能力 -25%']},paul:{bard:[1.05,'保羅會打爵士鼓、以前待過樂團——當詩人反而更順手（+5%）']},yijia:{knight:[.88,'家宜說盔甲太重了啦——全能力 -12%']}};
const VREC={knight:{vit:3,str:2},warrior:{str:3,agi:2},archer:{agi:3,luk:1,str:1},mage:{int:3,vit:1,agi:1},bard:{int:2,agi:2,vit:1},druid:{int:2,str:2,vit:1}};
function vrAclsSync(){const V=vrS();V.acls=V.acls||{};for(const k in VPAL){const Q=VPAL[k];if(!Q.ncls){Q.ncls=Q.cls;Q.nb=Q.b}const c=VCLS[V.acls[k]]?V.acls[k]:Q.ncls;Q.cls=c;Q.b=VCLS[c].wp.includes(Q.nb)?Q.nb:VCLS[c].wp[0]}}
const vrNative=k=>VPAL[k].ncls||VPAL[k].cls;
function vrApt(k,c){c=c||VPAL[k].cls;if(c==vrNative(k))return 1.1;const s=VAPT[k]&&VAPT[k][c];return s?s[0]:.95}
function vrAM(k){const V=vrS();V.am=V.am||{};if(!V.am[k]){const lv=Math.max(1,V.lv||1);V.am[k]={lv,exp:0,pts:(lv-1)*3,st:{str:0,int:0,agi:0,luk:0,vit:0},auto:1};vrAAuto(k)}return V.am[k]}
function vrAAuto(k){const M=vrS().am[k];if(!M||!M.auto)return;const R=VREC[VPAL[k].cls]||{str:1,vit:1},ks=[];for(const s in R)for(let i=0;i<R[s];i++)ks.push(s);let i=0;while(M.pts>0){M.st[ks[i%ks.length]]++;M.pts--;i++}}
// 套用到戰鬥中的隊友（f66 建立隊友時呼叫）
function vrAApply(a){const M=vrAM(a.id),S=M.st,ap=vrApt(a.id,a.cls);a.alv=M.lv;a.apt=ap;
 a.mhp=Math.round((100+19*M.lv)*a.C.hp*(1+.04*S.vit)*ap);a.def=Math.round((2+1.5*M.lv)*a.C.def*(1+.02*S.vit));a.mmp=Math.round((70+7*M.lv)*(a.C.mp||1)*(1+.03*S.int));
 a.am=(1+.01*S.str)*ap;a.asp=1/(1+.004*S.agi);a.ip=(1+.02*S.int)*ap;a.crit=Math.min(.5,.05+.005*S.luk+.0025*S.agi)}
// 結束一趟：隊友拿經驗
function vrAGain(exp,party){const V=vrS();const ups=[];for(const k in VPAL){if(!VPAL[k].need())continue;const inP=party.includes(k);if(!inP&&!V.share)continue;const M=vrAM(k);
  if(M.lv>=V.lv){M.exp=0;continue}M.exp+=Math.round(exp*(inP?1:.2));while(M.lv<V.lv&&M.exp>=vrNeed(M.lv)){M.exp-=vrNeed(M.lv);M.lv++;M.pts+=3;ups.push(VPAL[k].n+' Lv.'+M.lv)}if(M.lv>=V.lv)M.exp=0;vrAAuto(k)}
 party.forEach(k=>{V.tog=V.tog||{};V.tog[k]=(V.tog[k]||0)+1});SVDIRTY=1;return ups}
// ───────── 組隊畫面：傭兵卡 ─────────
function vrParty(){vrAclsSync();const V=vrS();
 vrInv({title:'👥 組隊',sub:`最多帶 ${vrPMax()} 位朋友（${V.party.length}/${vrPMax()}）${vrPMax()<4?'・打通第二章可以帶 4 位':''}・點朋友看他的傭兵卡`,back:vrLobby,sel:0,
  items:Object.entries(VPAL).map(([k,Q])=>{const C=VCLS[Q.cls],ok=Q.need(),inP=V.party.includes(k),M=ok?vrAM(k):null,nat=Q.cls==vrNative(k);
   return{ic:C.ic,col:inP?'#9aff9a':ok?'#c8b8ff':'#555',tl:inP?'✅':'',br:ok?'Lv'+M.lv:'',warn:ok&&M.pts>0&&!M.auto?'':'',name:Q.n+(ok?'':'（還不認識）'),rar:ok?`${C.n}${nat?' ⭐本命':''}・Lv.${M.lv}`:'',
    lines:ok?[Q.line,`💪${M.st.str} 🧠${M.st.int} 🦶${M.st.agi} 🍀${M.st.luk} ❤️${M.st.vit}${M.pts?'　（還有 '+M.pts+' 點）':''}`]:[k=='lao8'?'常在 VR 體感館出沒':'先在小鎮認識他吧'],
    acts:ok?[['📋 打開傭兵卡',()=>{vrInvClose();vrAlly(k)}],[inP?'👋 離開隊伍':'➕ 加入隊伍',()=>{if(inP)V.party=V.party.filter(x=>x!=k);else{if(V.party.length>=vrPMax())return toast('最多帶 '+vrPMax()+' 位，先讓一位離開');V.party.push(k)}SVDIRTY=1;vrParty()},0,inP?'#ff9a9a':'#9aff9a']]:[]}})})}
function vrAlly(k){vrAclsSync();vrInvClose();try{if(!dlg.hidden)closeDlg()}catch(e){}const V=vrS(),Q=VPAL[k],C=VCLS[Q.cls],M=vrAM(k),A=vrAeq(),q=A[k]||(A[k]={}),bw=V.bag.find(i=>i.id==q.w),ba=V.bag.find(i=>i.id==q.a),inP=V.party.includes(k),nat=Q.cls==vrNative(k),ap=vrApt(k);
 const ov=document.createElement('div');window._vrInv=ov;ov.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(10,6,24,.72);display:flex;align-items:center;justify-content:center;padding:10px;font-family:var(--gfont,inherit)';
 const S=M.st,fa={mhp:Math.round((100+19*M.lv)*C.hp*(1+.04*S.vit)*ap),mmp:Math.round((70+7*M.lv)*(C.mp||1)*(1+.03*S.int)),crit:Math.round(Math.min(.5,.05+.005*S.luk+.0025*S.agi)*100)};
 const B='font:inherit;cursor:pointer;border-radius:8px;color:#fff;',row=(s)=>{const T=VSTAT[s];return`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #3a2a5a"><span style="font-size:20px">${T[0]}</span><span style="flex:1"><b>${T[1]}</b> <span style="font-size:11px;opacity:.75">${T[2]}</span></span><b style="font-size:18px;min-width:32px;text-align:right">${S[s]}</b><button data-s="${s}" ${M.pts>0?'':'disabled'} style="${B}width:32px;height:32px;border:2px solid #9aff9a;background:#204a30;font-size:18px;${M.pts>0?'':'opacity:.3'}">＋</button></div>`};
 const need=vrNeed(M.lv),capd=M.lv>=V.lv;
 ov.innerHTML=`<div style="background:linear-gradient(#34265a,#20163a);border:3px solid #ffd84a;border-radius:14px;color:#fff;width:min(96vw,860px);max-height:94vh;overflow:auto;padding:14px 16px">
  <div style="display:flex;align-items:center;gap:10px;border-bottom:2px solid #4a3a7a;padding-bottom:8px"><b style="font-size:21px;color:#ffd84a">${C.ic} ${Q.n} 的傭兵卡</b><span style="flex:1;font-size:13px">${C.n}${nat?' <span style="color:#ffd84a">⭐ 本命職業（全能力 +10%）</span>':(VAPT[k]&&VAPT[k][Q.cls]?' <span style="color:#ff9a9a">⚠️ '+VAPT[k][Q.cls][1]+'</span>':' <span style="opacity:.75">（非本命：全能力 -5%）</span>')}</span><button data-x style="${B}border:2px solid #9aa0ff;background:#2e2448;padding:4px 12px">✕ 返回</button></div>
  <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px">
   <div style="flex:1;min-width:220px"><div style="text-align:center"><canvas width="96" height="110" style="image-rendering:pixelated;background:#160f28;border-radius:12px;border:2px solid #4a3a7a"></canvas></div>
    <div style="font-size:13px;margin-top:6px;line-height:1.7">「${Q.line.replace(/[「」]/g,'')}」<br><b>Lv.${M.lv}</b>${capd?'（跟你同等級，已到上限）':''}<div style="height:8px;background:#160f28;border-radius:4px;overflow:hidden"><div style="height:100%;width:${capd?100:Math.min(100,M.exp/need*100)}%;background:#7ad0ff"></div></div><span style="font-size:11px;opacity:.75">經驗 ${capd?'—':M.exp+' / '+need}・一起闖關 ${(V.tog||{})[k]||0} 次</span><br>❤️ 血量 ${fa.mhp}　💧 魔力 ${fa.mmp}　💥 爆擊 ${fa.crit}%<br><span style="font-size:11px;opacity:.75">攻擊力會跟著你的攻擊力成長（約 65%）</span></div></div>
   <div style="flex:1.2;min-width:260px"><div style="display:flex;justify-content:space-between;align-items:center"><b style="color:#ffd84a">📊 屬性</b><span style="color:${M.pts?'#9aff9a':'#aaa'}">可分配 <b>${M.pts}</b> 點</span></div>
    ${['str','int','agi','luk','vit'].map(row).join('')}
    <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap"><button data-auto style="${B}border:2px solid #9ae8ff;background:${M.auto?'#1e3a4a':'#2e2448'};padding:5px 10px">${M.auto?'✅':'⬜'} 自動加點（照職業推薦）</button><button data-reset style="${B}border:2px solid #ff9a9a;background:#4a2030;padding:5px 10px">↺ 重新分配（💠${200+M.lv*20}）</button></div></div>
   <div style="flex:1;min-width:200px"><b style="color:#ffd84a">🎒 裝備</b>
    <button data-w style="${B}display:block;width:100%;text-align:left;margin-top:6px;border:2px solid #7a6aa0;background:#2e2448;padding:8px">🗡️ 武器<br>${bw?vrItHTML(bw):'<span style="opacity:.7">'+VWP[Q.b].ic+' '+VWP[Q.b].n+'（初始）</span>'}</button>
    <button data-a style="${B}display:block;width:100%;text-align:left;margin-top:6px;border:2px solid #7a6aa0;background:#2e2448;padding:8px">🛡️ 防具<br>${ba?vrItHTML(ba):'<span style="opacity:.7">（沒穿）</span>'}</button>
    <div style="font-size:11px;opacity:.75;margin-top:4px">${C.n}能用：${C.wp.map(b=>VWP[b].n).join('、')}</div>
    <button data-cls style="${B}display:block;width:100%;margin-top:10px;border:2px solid #ffd84a;background:#4a3a10;padding:8px">🔄 轉職</button>
    <button data-p style="${B}display:block;width:100%;margin-top:6px;border:2px solid ${inP?'#ff9a9a':'#9aff9a'};background:${inP?'#4a2030':'#204a30'};padding:8px">${inP?'👋 離開隊伍':'➕ 加入隊伍'}</button></div></div></div>`;
 document.body.appendChild(ov);try{const cv=ov.querySelector('canvas'),g=cv.getContext('2d');g.imageSmoothingEnabled=false;g.save();g.translate(48,96);g.scale(3.4,3.4);drawChar(g,{x:-6,y:-8,dir:0,mv:0,fr:0,lk:vrPalLook(k),ph:0});g.restore();if(Q.cls=='druid')vrDruidLook(g,48,96,0,1.3)}catch(e){}
 const re=()=>{SVDIRTY=1;vrAlly(k)},$=s=>ov.querySelector(s);$('[data-x]').onclick=()=>{vrInvClose();vrParty()};
 ov.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{if(M.pts<=0)return;M.st[b.dataset.s]++;M.pts--;M.auto=0;re()});
 $('[data-auto]').onclick=()=>{M.auto=M.auto?0:1;vrAAuto(k);re()};
 $('[data-reset]').onclick=()=>{const c=200+M.lv*20;if(V.gold<c)return toast('💠 不夠');V.gold-=c;let n=0;for(const s in M.st){n+=M.st[s];M.st[s]=0}M.pts+=n;M.auto=0;toast('↺ 點數全部退回來了');re()};
 $('[data-w]').onclick=()=>{vrInvClose();vrAllyPick(k,'w')};$('[data-a]').onclick=()=>{vrInvClose();vrAllyPick(k,'a')};
 $('[data-cls]').onclick=()=>{vrInvClose();vrAClass(k)};
 $('[data-p]').onclick=()=>{if(inP)V.party=V.party.filter(x=>x!=k);else{if(V.party.length>=vrPMax())return toast('最多帶 '+vrPMax()+' 位，先讓一位離開');V.party.push(k)}re()};
 ov._key=e=>{if(window._vrInv!==ov)return;if(e.key=='Escape'){e.preventDefault();e.stopImmediatePropagation();vrInvClose();vrParty()}};addEventListener('keydown',ov._key,true)}
// 轉職
const VCLSLINE={bokai:{bard:'我只會國歌喔……而且只會前兩句。'},paul:{bard:'好久沒碰樂器了……樂團時期的手感，回來了。'},zhuyang:{bard:'終於回到我的主場了！'},yilun:{bard:'吉他在手，萬事不愁！'},yijia:{knight:'這盔甲好重……你要負責背我回家喔。'}};
function vrAClass(k){vrAclsSync();const V=vrS(),Q=VPAL[k],tog=(V.tog||{})[k]||0,ok=tog>=10;
 openDlg('🔄 '+Q.n+' 的轉職',`本命職業：<b>${VCLS[vrNative(k)].ic} ${VCLS[vrNative(k)].n}</b>（全能力 +10%）<br>${ok?'':`<span style="color:#ff9a9a">要跟 ${Q.n} 一起闖幻境 10 次才能轉職（目前 ${tog} 次）。換回本命職業不受限制。</span><br>`}<span style="font-size:12px">轉職費 💠500（換回本命免費）。等級、屬性點都會保留，裝備如果新職業不能用會自動卸下。</span>`,
  Object.entries(VCLS).map(([c,C])=>{const cur=Q.cls==c,nat=c==vrNative(k),ap=vrApt(k,c),sp=VAPT[k]&&VAPT[k][c];
   return[`${cur?'✅ ':''}${C.ic} ${C.n}${nat?' ⭐本命':''}`,(sp?'⚠️ '+sp[1]:nat?'全能力 +10%':'全能力 -5%')+'・武器：'+C.wp.map(b=>VWP[b].n).join('、'),()=>{if(!nat&&V.gold<500)return toast('💠 不夠');if(!nat)V.gold-=500;V.acls=V.acls||{};V.acls[k]=c;vrAclsSync();const q=(vrAeq()[k]||{}),bw=V.bag.find(i=>i.id==q.w);if(bw&&!C.wp.includes(bw.b))q.w=null;
     const M=vrAM(k);if(M.auto){let n=0;for(const s in M.st){n+=M.st[s];M.st[s]=0}M.pts+=n;vrAAuto(k)}SVDIRTY=1;closeDlg();toast(`🔄 ${Q.n} 轉職成「${C.n}」！`);const L=(VCLSLINE[k]||{})[c];if(L)setTimeout(()=>toast(Q.n+'：「'+L+'」'),900);vrAlly(k)},cur||(!ok&&!nat)||(!nat&&V.gold<500)]}).concat([['返回','',()=>vrAlly(k)]]))}
// ───────── 好友分享卷（老八好感到「好友」時的劇情） ─────────
{const _a=frAdd;frAdd=function(id,n){const r=_a.apply(this,arguments);try{if(id=='lao8'&&frLv(FRS('lao8').pt)>=3&&!vrS().share&&!st.shareQ){st.shareQ=1;setTimeout(()=>whenFree(()=>openDlg('🎟️ 老八的禮物',
 '老八神秘兮兮地塞給你一張紫色的卡片：<br>「老哥，這是我幫大家設計的『<b>好友分享卷</b>』啦！」<br>「你每次只能帶幾個人進幻境，其他人在外面乾等很可憐耶。有了這張，<b>沒跟你去的朋友也會分到一點經驗</b>！」<br>「我們是一起的嘛，誰都不能落下！」<br><br><span style="font-size:12px">🎟️ 好友分享卷已放進幻境背包：沒帶去的朋友，每趟可以拿到 20% 的經驗。</span>',
 [['謝謝老八！','💞 老八 +3',()=>{const V=vrS();V.share=1;st.shareQ=2;SVDIRTY=1;try{_a('lao8',3)}catch(e){}closeDlg();toast('🎟️ 得到「好友分享卷」！')}]])),1500)}}catch(e){}return r}}
// 背包裡顯示分享卷
{const _b=vrBag;vrBag=function(sel){_b.apply(this,arguments);try{if(!vrS().share||!window._vrInv)return;const gr=window._vrInv.querySelector('.gr'),dt=window._vrInv.querySelector('.dt');const t=document.createElement('div');t.className='tl';t.style.borderColor='#c08aff';t.style.boxShadow='0 0 10px #c08aff';t.innerHTML='🎟️<i class="a">✨</i>';
 const show=()=>{dt.innerHTML='<div class="bi">🎟️</div><div class="nm" style="color:#c08aff">好友分享卷</div><div class="rr" style="color:#c08aff">特殊道具・老八親手設計</div><ul><li>被動效果：沒跟你去幻境的朋友，每趟也能拿到 20% 的經驗</li><li>不用裝備，放在背包就有效</li></ul><div style="font-size:12px;opacity:.85">「我們是一起的嘛，誰都不能落下！」——老八</div>'};t.onmouseenter=show;t.onclick=()=>{gr.querySelectorAll('.tl').forEach(x=>x.classList.remove('on'));t.classList.add('on');show()};gr.prepend(t)}catch(e){}}}
