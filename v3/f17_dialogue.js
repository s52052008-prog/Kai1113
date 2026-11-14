/* ===== v4.5：情境對話引擎（地點／時段／天氣／好感／章節故事線）===== */
st.aff=st.aff||{};st.arc=st.arc||{};st.dsn=st.dsn||{};st.dlast=st.dlast||{};st.afm=st.afm||{};st.dgain=st.dgain||{};
const DB={},GDB={};            // DB: 具名角色（鍵＝名字片段）／GDB: 一般路人與店員（鍵＝類別）
/* 登錄：D('里長阿榮',[ {…topic…}, … ])  topic 欄位
   p:[地點片段] t:'mneg'時段 w:天氣(0晴1雲2雨3風) a:最低好感 x:最高好感 d:'we'週末/'wk'平日 ch:章節 g:函式條件
   s:NPC 說的話  f/n/b:[玩家選項,NPC 回應] 分別為友善(+)/中性/負面(−) */
const D=(k,a)=>{(DB[k]=DB[k]||[]).push(...a)},G=(k,a)=>{(GDB[k]=GDB[k]||[]).push(...a)};
const dSlot=h=>h>=5&&h<11?'m':h>=11&&h<17?'n':h>=17&&h<21?'e':'g';
function dKeyOf(n){if(typeof n.fr=='string'&&FR[n.fr])return FR[n.fr].n;const ks=Object.keys(DB).sort((a,b)=>b.length-a.length);for(const k of ks)if(n.n.includes(k))return k;return null}
function dGenOf(n){const t=n.n+(n.role||'');
 const M=[['健身客|運動員|拳手|教練','運動'],['老師|導護','師長'],['同學|學生','學生'],['小朋友|小孩|少年','孩子'],['阿公|阿嬤|長者|廟祝','長者'],['遊客|旅客','遊客'],['上班族|office','上班族'],['員警|警察|警員','警察'],['醫生|護士|醫師','醫護'],['店員|收銀|櫃員|行員|櫃檯|理專|行李|售票|驗票|咖啡師|髮型師|助理|攤販|洗碗|老闆|廚師|服務生|師傅|學徒|房東|消防','店員'],['客|讀者|觀眾|病患|民眾|路人|casual','顧客']];
 for(const [re,k] of M)if(new RegExp(re).test(t))return k;return '顧客'}
function dCtx(n){const place=scene||placeName(n.x,n.y),h=T.hour,wd=dow();return{place,slot:dSlot(h),w:wx(),we:wd>=5,wd}}
function dOK(tp,c,aff,arc){
 if(tp.p&&!tp.p.some(q=>c.place.includes(q)))return false;
 if(tp.t&&!tp.t.includes(c.slot))return false;
 if(tp.w!=null&&!([].concat(tp.w).includes(c.w)))return false;
 if(tp.a!=null&&aff<tp.a)return false;if(tp.x!=null&&aff>tp.x)return false;
 if(tp.d=='we'&&!c.we)return false;if(tp.d=='wk'&&c.we)return false;
 if(tp.ch!=null&&arc!=tp.ch-1)return false;
 if(tp.g&&!tp.g())return false;return true}
function dPick(key,list,c,aff,arc,sd){const dk=dKey(),ok=list.filter(tp=>dOK(tp,c,aff,arc));
 const chs=ok.filter(tp=>tp.ch!=null),plain=ok.filter(tp=>tp.ch==null);
 const last=st.dlast[key]||[];
 if(chs.length&&(st.dsn[key]!=dk||Math.random()<.35))return chs[0];
 const ctxp=plain.filter(tp=>tp.p||tp.t||tp.w!=null||tp.d||tp.g),pool=(ctxp.length&&Math.random()<.75?ctxp:plain).filter(tp=>!last.includes(tp.s));
 const src=pool.length?pool:plain.length?plain:ok;if(!src.length)return null;return src[(Math.random()*src.length)|0]}
function dAffGet(n,o){return o&&o.fr?FRS(o.fr).pt:(st.aff[dKeyOf(n)||'']||0)}
function dAffAdd(n,o,key,d){if(!o.fr&&String(key)[0]=='~')return;if(o&&o.fr){const f=FRS(o.fr);const old=f.pt;f.pt=Math.max(0,Math.min(100,f.pt+d));if(frLv(f.pt)>frLv(old))toast(`💞 你和${FR[o.fr].n}的關係提升了：${FRL[frLv(f.pt)][1]}`);else if(d<0)toast(`💔 ${FR[o.fr].n}的好感 ${d}`);return}
 const old=st.aff[key]||0,nv=Math.max(-30,Math.min(100,old+d));st.aff[key]=nv;
 if(d>0)toast(`💗 ${n.n} 好感 +${d}（${nv}）`);else if(d<0)toast(`💔 ${n.n} 好感 ${d}（${nv}）`);
 [[15,{r:2,j:4},'開始把你當熟人了'],[35,{r:3,j:6,m:60},'把你當朋友，塞給你一點謝禮'],[60,{r:5,j:10,m:120},'對你推心置腹']].forEach(([th,fx,t])=>{const kk=key+th;if(nv>=th&&!st.afm[kk]){st.afm[kk]=1;fxApply(fx);hud();toast(`🎉 ${n.n}${t}`)}})}
function dHeart(n,o){const a=dAffGet(n,o);return a>=60?' ❤❤❤':a>=35?' ❤❤':a>=15?' ❤':a<=-8?' 💢':''}
function dlgEngine(n,o){o=o||{};const key=o.fr?FR[o.fr].n:dKeyOf(n),list=key?DB[key]:null,gk=key?null:dGenOf(n),gl=gk?(GDB[gk]||[]):null,L=list||gl;
 if(!L||!L.length)return false;
 const c=dCtx(n),aff=dAffGet(n,o),arcK=key||('~'+gk),arc=st.arc[arcK]||0,tp=dPick(arcK,L,c,aff,arc,0);if(!tp)return false;
 const dk=dKey(),first=st.dsn[arcK]!=dk;st.dsn[arcK]=dk;
 const lastL=st.dlast[arcK]=(st.dlast[arcK]||[]);lastL.push(tp.s);if(lastL.length>5)lastL.shift();
 const pre=aff>=35?`<i>（${n.n}見到你，笑得很自然。）</i><br>`:aff<=-8?`<i>（${n.n}瞥了你一眼，語氣有點冷淡。）</i><br>`:'';
 const hello=!o.fr&&key&&!st.dgain['m'+key]?(st.dgain['m'+key]=1,`「初次見面，我是${n.n}。」<br>`):'';
 const opts=[],mk=(ic,arr,kind)=>{if(!arr)return;opts.push([ic+' '+arr[0],kind=='f'?'友善':kind=='b'?'態度不好':'',()=>{
   let d=kind=='f'?2:kind=='n'?1:-3;if(kind!='b'){const gk=arcK+'|'+dk;if(st.dgain[gk])d=0;else st.dgain[gk]=1}
   if(tp.ch!=null&&kind!='b')st.arc[arcK]=Math.max(arc,tp.ch);
   if(kind=='f'){fxApply({j:2})}if(kind=='b'){fxApply({j:-3})}
   dAffAdd(n,o,key||arcK,d);hud();
   const re=tp.ch!=null&&kind=='b'?'（'+n.n+'皺了皺眉，沒再多說下去。）':arr[1];
   openDlg('💬 '+n.n+dHeart(n,o),re,[['💬 再聊聊','',()=>dlgEngine(n,o)],...(o.extra||[]),['離開','',closeDlg]])}])};
 mk('😊',tp.f,'f');mk('💬',tp.n,'n');mk('😒',tp.b,'b');
 if(o.extra)o.extra.forEach(e=>opts.push(e));opts.push(['離開','',closeDlg]);
 openDlg('💬 '+n.n+dHeart(n,o),pre+hello+'「'+tp.s+'」'+(tp.ch!=null?'<br><span class="opacity-60" style="font-size:11px">📖 '+n.n+'的故事 第 '+tp.ch+' 章</span>':''),opts);return true}
/* 供其他選單取用的單句（依情境選一句）*/
function dLine(n){const key=dKeyOf(n),L=key?DB[key]:GDB[dGenOf(n)];if(!L||!L.length)return null;const c=dCtx(n),aff=dAffGet(n,{}),arc=st.arc[key||('~'+dGenOf(n))]||0;const ok=L.filter(tp=>tp.ch==null&&dOK(tp,c,aff,arc));const pool=ok.length?ok:L.filter(tp=>tp.ch==null);return pool.length?pool[(Math.random()*pool.length)|0].s:null}

/* ===== 對話入口接管 ===== */
function talkIn(n){const orig=()=>n.tr?gymCoach(n):typeof n.fr=='string'?frTalk(n):n.rent?rentTalk(n):n.t?petTalk(n):n.cop?policeMenu(n,say(n)):openDlg('💬 '+n.n,say(n),[['離開','',closeDlg]]);
 if(n.t||typeof n.fr=='string')return orig();
 const extra=(n.tr||n.rent||n.cop)?[['📋 辦事／其他選項','',orig]]:null;
 if(!n.own&&dlgEngine(n,{extra}))return;orig()}
{const talkOrig=talk;talk=function(n){const orig=()=>{const f=n.fr;if(typeof f=='number')n.fr=0;try{talkOrig(n)}finally{n.fr=f}};
  if(n.t||typeof n.fr=='string'||n.rent)return orig();
  if(n.q!=null&&(Q[n.q].s==0||(n.q==2&&st.romance)))return orig();
  const extra=(n.cop||n.shop||n.n=='農夫伯'||n.n=='牧場阿姨'||n.q!=null)?[['📋 辦事／任務／其他選項','',orig]]:null;
  if(dlgEngine(n,{extra}))return;orig()}}
{const sayOrig=say;say=function(n){const base=sayOrig(n),l=n.own?null:dLine(n);return l&&!/^「初次見面/.test(base)?'「'+l+'」':base}}
