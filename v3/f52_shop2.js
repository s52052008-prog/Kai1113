/* v10.0 收藏品與丁家來訪、LINE 小組群組（可以聊天）、生日月份、小組委託 2.0、家樂福會員點數・試吃・年節禮盒、
   全聯晚上 9 點後 7 折・福利卡・和家宜買菜、小組季節活動（中秋烤肉、聖誕交換禮物） */
// ───────── 收藏品：丁爺爺、丁奶奶的舊物 ─────────
DINGK.forEach(x=>{IT[x[0]].d='丁爺爺、丁奶奶留在老房子裡的東西。好像可以拿去問問看……丟掉感覺不太好，先留著吧！';IT[x[0]].col=1});
const colHave=()=>DINGK.filter(x=>(st.inv[x[0]]||0)>0);
{const _im=itemMenu;itemMenu=function(k){if(IT[k]&&IT[k].col)return openDlg(IT[k].i+' '+IT[k].n,IT[k].d,[['🗃️ 收進收藏品','',closeDlg],['返回','',closeDlg]]);return _im.apply(this,arguments)}}
const DINGRET={dk_paddle:['丁爺爺接過球拍，揮了兩下：「這支拍子陪我打了二十年！學生們沒一個贏過我，哈哈。」<br>他把球拍塞回你手裡：「送你，有空練練，下次來跟我比一場！」',{p:2},null],
 dk_bonsai:['丁爺爺摸著剪刀的刀刃：「我的盆景都是用它修的……頂樓那棵老梅樹還在嗎？」<br>「在！我們有好好照顧。」老人家眼眶紅了：「那就好、那就好。」<br>他教了你幾招種菜的訣竅。',{j:6},'garden'],
 dk_plane:['丁爺爺笑了：「這刨刀可是我的寶貝！頂樓那張桌球桌就是用它刨出來的。」<br>「年輕人，家裡有什麼要修的木工，打給我！」',{j:5},null],
 dk_brush:['丁奶奶捧著毛筆，輕輕撫過筆桿：「這是我當老師第一年，學生送我的。」<br>她當場寫了一幅「平安」送給你們，掛在客廳正好。',{j:8,w:2},null],
 dk_kenzan:['丁奶奶眼睛一亮：「我的劍山！以前和室天天有花。」<br>她轉頭對家宜說：「下次來，奶奶教你插花。」',{j:6},null],
 dk_jar:['丁爺爺抱著空罈子大笑：「梅子酒！那年颱風夜就是開這罈！」<br>「明年梅子季，我教你怎麼釀。」',{j:8},null],
 dk_recipe:['丁奶奶翻開食譜本，一頁一頁都是她的字：「這是我四十年的家常菜……」<br>她把本子推回給家宜：「留給你們吧，這個家的廚房，也要有好吃的味道。」<br><b>📒 學會了丁奶奶的家常菜！</b>',{j:10},'recipe']};
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const D=st.ding||(st.ding={v:0,got:[]});const have=colHave().length;
 if(D.plan&&wkN()>=D.plan){D.plan=0;setTimeout(()=>whenFree(dingVisit),3500)}
 else if(!D.plan&&have>=(D.v?2:3)){D.plan=wkN()+1;setTimeout(()=>whenFree(()=>openDlg('📞 一通陌生的電話',D.v?'「喂？我是丁奶奶啦！上次回去好開心，你們還有找到我們的舊東西嗎？下禮拜我們再去坐坐喔～」':'「請問是現在住在五樓的住戶嗎？我是前屋主丁奶奶……」<br>「聽仲介說你們在整理頂樓，我跟老伴好想回去看看，下禮拜方便嗎？」<br><br><span style="font-size:12px;opacity:.85">下個週末，丁爺爺、丁奶奶會來家裡拜訪。記得把收藏的舊物帶在身上！</span>',[['當然歡迎！','',closeDlg]])),3000)}}catch(e){}return r}}
function dingVisit(){const D=st.ding,H=colHave();D.v++;const L=[`門鈴響了。門口站著一對白髮蒼蒼的老夫婦，丁爺爺拄著拐杖，丁奶奶手上提著一盒自己做的點心。<br>「哎呀，這樓梯……爬上來真的要我的老命囉！」兩個人笑著喘氣。`];
 H.forEach(x=>{const q=DINGRET[x[0]];L.push(`你拿出 ${x[1]} <b>${x[2]}</b>。<br>`+q[0]);st.inv[x[0]]--;D.got.push(x[0]);fxApply(q[1]);if(q[2]=='garden')D.garden=1;if(q[2]=='recipe')D.recipe=1});
 L.push(D.v==1?'臨走前，丁奶奶握著家宜的手：「看到這個家被你們照顧得這麼好，我們就放心了。以後我們就是你們的爺爺奶奶喔！」':'「下次再來看你們！」兩位老人家揮揮手，慢慢走下樓梯。');
 hud();SVDIRTY=1;let i=0;const next=()=>{if(i<L.length)return openDlg('👴👵 丁爺爺、丁奶奶來訪',L[i++],[['▶','',next]]);try{feedPost('👴👵 前屋主來家裡作客','丁爺爺、丁奶奶回來看老房子，聊了好多以前的故事。',null)}catch(e){}fxApply({j:12});hud();closeDlg()};next()}
// 丁爺爺的園藝訣竅：菜園不會長蟲；丁奶奶的食譜：自己種的菜煮得更好
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{if(st.ding&&st.ding.garden)rnS().g.p.forEach(P=>{if(P)P.bug=0})}catch(e){}return r}}
{const _gm=gardenMenu;gardenMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(st.ding&&st.ding.recipe&&Array.isArray(opts))opts.forEach(o=>{if(o[0]&&o[0].includes('用自己種的菜煮')){o[0]='🍳 照丁奶奶的食譜煮一餐';o[1]='用 2 份蔬菜・1 小時・⚡+40 😊+18';const f=o[2];o[2]=()=>{f();fxApply({s:10,j:6});hud()}}});return od.call(this,t,d,opts,...r)};try{return _gm.apply(this,arguments)}finally{openDlg=od}}}
function colView(){const D=st.ding||{got:[]},o=DINGK.map(x=>{const h=(st.inv[x[0]]||0)>0,g=(D.got||[]).includes(x[0]);return`${h||g?x[1]:'❔'} ${h||g?x[2]:'？？？'}　${g?'<span style="color:#2a8a2a">✅ 已還給丁家</span>':h?'🗃️ 收藏中':''}`});
 openDlg('🗃️ 收藏品',o.join('<br>')+'<br><br><span style="font-size:12px;opacity:.8">整理老房子時找到的舊物。丟掉感覺不太好，先留著吧！</span>',[['返回','',phoneHome]])}
// ───────── 朋友生日（月份） ─────────
const FBDAY={yijia:11,yilun:4,rita:6,huijing:3,fangci:3,yuhao:10,zhuyang:2,bokai:10};
try{for(const id in FBDAY)if(FR[id]){FR[id].bm=FBDAY[id];FR[id].bio=FR[id].bio||[];FR[id].bio.unshift([0,'🎂 生日：'+FBDAY[id]+' 月'])}}catch(e){}
const bdNow=()=>Object.keys(FBDAY).filter(id=>FR[id]&&FBDAY[id]==cal().mo&&(()=>{try{return FRS(id).met}catch(e){return false}})());
// 生日當月送蛋糕：好感大加成（用背包裡的蛋糕送禮時）
// ───────── LINE 小組群組 ─────────
const lineS=()=>st.line||(st.line={m:[],un:0});
function linePost(who,txt,o){const L=lineS();L.m.push({who,txt,w:wkN(),t:T.hour,...(o||{})});if(L.m.length>80)L.m.shift();if(who!='me')L.un++;SVDIRTY=1}
const lineMembers=()=>['yijia','yilun','rita','huijing','zhuyang','bokai','yuhao','fangci'].filter(id=>{try{return FR[id]&&FRS(id).met}catch(e){return false}});
const lineOpen=()=>grpOpen()&&rnReady('wa');
const CHAT=[['yilun','這週主日的信息大家有感動嗎？🙏'],['rita','提醒大家：下週聚會記得帶聖經喔📖'],['huijing','兒童主日學的小朋友今天超可愛🥰'],['zhuyang','我今天練了一首新詩歌，下次彈給大家聽🎹'],['bokai','週六早上球場有人要來嗎🏀'],['yuhao','頌言今天會叫「把拔」了！！😭'],['yijia','老公又在打陀螺了😑'],['fangci','有人推薦好看的電影嗎🎬']];
const REPLY={yilun:['「阿們！牧師講得很好」','「我這週也被提醒要多禱告」'],rita:['「收到！」','「RITA 好貼心～」'],huijing:['「小朋友好可愛！」','「辛苦惠菁了🙏」'],zhuyang:['「期待！」','「主揚彈什麼都好聽」'],bokai:['「我去！」','「這週沒辦法QQ」'],yuhao:['「恭喜恭喜！」','「頌言好棒！」'],yijia:['「哪有😳」','「才沒有！」'],fangci:['「推《天堂的孩子》」','「最近都沒看耶」']};
function lineView(){const L=lineS();L.un=0;window.TITLE=true;window.OVL=(window.OVL||0)+1;Object.keys(keys).forEach(k=>keys[k]=0);
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99990;background:rgba(10,6,2,.6);display:flex;align-items:center;justify-content:center';
 const nm=id=>id=='me'?st.name:id=='sys'?'':(FR[id]?FR[id].n:id);
 const draw=()=>{const ms=L.m.slice(-40);ov.innerHTML=`<div style="width:min(94vw,420px);height:min(88vh,640px);background:#8cabd9;border-radius:18px;border:3px solid #24150a;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.6)">
  <div style="background:#2b3a55;color:#fff;padding:10px 14px;display:flex;align-items:center;gap:8px"><b style="flex:1">🙏 城光家庭小組（${lineMembers().length+1}）</b><button data-x style="font:inherit;background:none;color:#fff;border:0;font-size:18px;cursor:pointer">✕</button></div>
  <div class="lmsg" style="flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px">${ms.length?ms.map(m=>m.who=='sys'?`<div style="align-self:center;background:rgba(0,0,0,.25);color:#fff;font-size:11px;border-radius:10px;padding:2px 10px">${m.txt}</div>`:m.who=='me'?`<div style="align-self:flex-end;max-width:78%;background:#8de055;color:#1a1a1a;border-radius:14px 14px 2px 14px;padding:6px 10px;font-size:14px">${m.txt}</div>`:`<div style="align-self:flex-start;max-width:82%"><div style="font-size:11px;color:#1a2a44;margin:0 0 2px 4px">${FR[m.who]?FR[m.who].ic:''} ${nm(m.who)}</div><div style="background:#fff;color:#1a1a1a;border-radius:14px 14px 14px 2px;padding:6px 10px;font-size:14px">${m.txt}</div></div>`).join(''):'<div style="align-self:center;color:#fff;opacity:.8;font-size:13px;margin-top:40%">還沒有訊息</div>'}</div>
  <div class="lqr" style="padding:6px;display:flex;gap:4px;flex-wrap:wrap;background:#eef2f8">${lineQuick().map((q,i)=>`<button data-q="${i}" style="font:inherit;font-size:13px;background:#fff;border:1px solid #b8c4d8;border-radius:14px;padding:4px 10px;cursor:pointer">${q[0]}</button>`).join('')}</div>
  <div style="display:flex;gap:6px;padding:6px 8px 10px;background:#eef2f8"><input class="lin" placeholder="${AIS?'輸入訊息，大家會回你…':'輸入訊息…'}" style="flex:1;font:inherit;font-size:14px;padding:7px 10px;border-radius:16px;border:1px solid #b8c4d8"><button data-send style="font:inherit;background:#2b3a55;color:#fff;border:0;border-radius:16px;padding:6px 14px;cursor:pointer">傳送</button></div></div>`;
  const box=ov.querySelector('.lmsg');box.scrollTop=box.scrollHeight;const inp=ov.querySelector('.lin');inp.addEventListener('keydown',e=>{e.stopPropagation();if(e.key=='Enter'&&!e.isComposing){e.preventDefault();send(inp.value)}})};
 const close=()=>{OVK.delete(kd);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL};
 const kd=e=>{if(e.key=='Escape'){e.preventDefault();close()}};OVK.add(kd);
 const send=async t=>{t=(t||'').trim();if(!t)return;linePost('me',t.replace(/</g,'&lt;'));L.un=0;draw();
  const who=lineMembers();if(!who.length)return;const id=who[Math.floor(Math.random()*who.length)];
  let rep=null;if(AIS){try{const hist=L.m.slice(-8).map(m=>(m.who=='me'?st.name:m.who=='sys'?'系統':(FR[m.who]?FR[m.who].n:m.who))+'：'+m.txt.replace(/<[^>]+>/g,'')).join('\n');
   const r=await AIS(`你在一個教會家庭小組的 LINE 群組裡，扮演「${FR[id].n}」（${FR[id].who}）。群組最近的訊息：\n${hist}\n\n請用繁體中文、口語、像 LINE 聊天那樣回覆一句（20 字以內，可以用表情符號），只輸出訊息內容。`,{modelTier:'quick'});rep=(r&&r.text||'').trim().split('\n')[0].slice(0,60)}catch(e){}}
  if(!rep)rep=['👍','哈哈哈','真的！','阿們🙏','好喔～','+1','😂😂','收到！'][Math.floor(Math.random()*8)];
  setTimeout(()=>{linePost(id,rep);L.un=0;if(document.body.contains(ov))draw()},700)};
 ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('[data-x]'))return close();const q=e.target.closest('[data-q]');if(q){const Q=lineQuick()[+q.dataset.q];if(Q){linePost('me',Q[0]);if(Q[1])Q[1]();L.un=0;draw()}return}
  if(e.target.closest('[data-send]')){const i=ov.querySelector('.lin');send(i.value)}});
 document.body.appendChild(ov);draw()}
function lineQuick(){const L=lineS(),last=[...L.m].reverse().find(m=>m.who!='me'&&m.who!='sys');if(!last||last.rep)return[['👍',null],['阿們🙏',null]];
 const id=last.who,opts=(REPLY[id]||['「好喔」','「哈哈」']).map(s=>s.replace(/[「」]/g,''));return opts.map(s=>[s,()=>{last.rep=1;try{frAdd(id,1,1)}catch(e){}}])}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{if(lineOpen()){const M=lineMembers();const c=CHAT.filter(q=>M.includes(q[0]));if(c.length){const q=c[Math.floor(Math.random()*c.length)];linePost(q[0],q[1])}}}catch(e){}return r}}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]=='關閉');const un=lineS().un;opts.splice(i<0?opts.length:i,0,['💬 LINE'+(un?'（'+un+'）':''),lineOpen()?'城光家庭小組群組':'受洗、結婚、和室整理好之後會加入小組群組',()=>{closeDlg();lineView()},!lineOpen()&&!lineS().m.length,1],['🗃️ 收藏品','丁家的舊物',colView,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
// ───────── 小組委託 2.0（每週約 3 成） ─────────
const DIET=['px_chick','px_blue','px_zuc','px_shrimp'],BOOZE=['cf_red','cf_white','cf_sake','cf_beer'],JUNKF=['cf_bucket','cf_pizza','cf_snack'];
function reqMake(){const c=cal(),M=lineMembers(),pick=a=>a[Math.floor(Math.random()*a.length)],L=[];const yr=c.yr;const G=rnS().grp;G.bd=G.bd||{};
 bdNow().filter(id=>G.bd[id]!=yr&&id!='yijia').forEach(id=>L.push({k:'bd',id,by:'rita',its:['cf_cake'],t:`這個月是${FR[id].n}的生日🎂！聚會的時候幫他慶生好嗎？誰可以準備蛋糕？`}));
 if(M.includes('yilun'))L.push({k:'hotdog',id:'yilun',by:'yilun',its:['cf_hotdog'],t:'好想吃家樂福的現烤大熱狗喔🌭🌭🌭'});
 L.push({k:'new',by:'rita',its:['cf_fruit'],t:'這週有新朋友第一次來！準備一盤水果大拼盤歡迎他吧🍉'});
 if(c.s==3)L.push({k:'soup',by:'huijing',its:['px_soup'],t:'這週好冷喔🥶 來煮一鍋香菇雞湯大家一起喝吧！全聯有食材包～'});
 if(M.includes('zhuyang'))L.push({k:'booze',id:'zhuyang',by:'zhuyang',its:BOOZE,t:'我這個月工作賺了一筆！這週我請大家喝酒🍷 誰幫我去家樂福買一瓶，回來我付錢！'});
 if(M.includes('bokai'))L.push({k:'ball',id:'bokai',by:'bokai',its:['cf_pizza','cf_chicken'],t:'這週我帶打球的弟兄來！他們超會吃，PIZZA 或整隻烤雞拜託🍕🍗'});
 L.push({k:'veg',by:'yijia',its:['veg'],t:'大家都說想吃我們頂樓種的菜耶🥬 老公這週可以多收一點嗎？'});
 L.push({k:'diet',by:'rita',its:DIET,t:'最近大家都在減肥😤 這週準備健康一點的：舒肥雞胸、藍莓、櫛瓜、蝦子都可以！不准買炸雞桶跟 PIZZA 喔！'});
 const q=pick(L.filter(x=>!x.by||M.includes(x.by)||x.by=='yijia'));return q}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const G=rnS().grp;G.req=null;if(lineOpen()&&Math.random()<.3){const q=reqMake();if(q){G.req=Object.assign(q,{w:wkN(),it:q.its[0]});linePost(q.by,q.t);setTimeout(()=>toast('💬 LINE 小組群組有新訊息'),3500)}}}catch(e){}return r}}
const reqHas=q=>q.its[0]=='veg'?vegCount()>=2:q.its.some(k=>(st.inv[k]||0)>0);
function reqUse(q){if(q.its[0]=='veg')return useVeg(2);const k=q.its.find(k=>(st.inv[k]||0)>0);st.inv[k]--;return k}
groupSnack=function(sel){const G=rnS().grp,q=G.req&&G.req.w==wkN()?G.req:null,ev=seasonEv(),o=[];
 if(ev&&!ev.done)o.push([`🎉 ${ev.n}（清單 ${ev.list.filter(evHas).length}/${ev.list.length}）`,evReady(ev)?'東西都買齊了！':'還缺：'+ev.list.filter(x=>!evHas(x)).map(x=>evName(x)+' ×'+x[1]).join('、'),()=>{ev.list.forEach(evUse);ev.done=1;G.evRun=ev.k;groupTopic(sel,2)},!evReady(ev)]);
 if(q){const has=reqHas(q);o.push([`📌 小組委託：${q.its[0]=='veg'?'自己種的菜 ×2':q.its.map(k=>IT[k].i).join('/')+' '+(q.its.length>1?IT[q.its[0]].n+' 等':IT[q.its[0]].n)}`,has?'大家會超開心！好感大加成':'背包裡沒有，'+(q.its[0]=='veg'?'去頂樓收成':q.its[0].startsWith('px')?'去全聯買':'去家樂福買'),()=>{reqUse(q);q.done=1;G.bd=G.bd||{};if(q.k=='bd')G.bd[q.id]=cal().yr;groupTopic(sel,3)},!has])}
 const party=SHOPX.cf.concat(SHOPX.px).filter(x=>(st.inv[x[0]]||0)>0&&!BOOZE.includes(x[0])&&!['cf_coal','cf_xgift','px_sauce','durian'].includes(x[0])&&!(q&&q.its.includes(x[0])));
 party.slice(0,3).forEach(x=>o.push([`🧺 帶背包裡的：${x[1]} ${x[2]}`,q&&q.k=='diet'&&JUNKF.includes(x[0])?'⚠️ 這週大家在減肥……':'',()=>{st.inv[x[0]]--;if(q&&q.k=='diet'&&JUNKF.includes(x[0])){G.eye=1}groupTopic(sel,1)}]));
 o.push(['🥬 用自己種的菜炒幾盤（2 份蔬菜）','大家最喜歡！好感加成',()=>{useVeg(2);groupTopic(sel,2)},vegCount()<2],['🍱 訂外食（💰800）','',()=>{st.money-=800;hud();groupTopic(sel,1)},st.money<800],['🍪 簡單茶點（💰200）','',()=>{st.money-=200;hud();groupTopic(sel,0)},st.money<200]);
 openDlg('🍽️ 準備點心',`${sel.length+2} 個人的份量`,o)};
{const _gr=groupRun;groupRun=function(sel,snack,v){const G=rnS().grp,q=G.req,eye=G.eye,evk=G.evRun;G.eye=0;G.evRun=null;const r=_gr.apply(this,arguments);
 if(eye){sel.forEach(id=>{try{frAdd(id,-2)}catch(e){}});setTimeout(()=>whenFree(()=>openDlg('😑 白眼','你把炸雞桶放上桌，RITA 直接翻了一個白眼：「我們不是說好要減肥嗎……」<br>大家還是吃光了，但每個人都很有罪惡感。<br><br>💔 每位朋友好感 -2',[['對不起嘛……','',closeDlg]])),900)}
 if(q&&q.done&&q.k=='bd'&&q.id){try{frAdd(q.id,10,1)}catch(e){}setTimeout(()=>whenFree(()=>openDlg('🎂 生日快樂！',`燈關掉，蛋糕上的蠟燭亮起來，大家一起唱生日快樂歌。<br>${FR[q.id].n}感動到說不出話：「謝謝你們……這是我過最溫暖的一次生日。」<br><br>💞 ${FR[q.id].n} 好感 +10`,[['生日快樂！','',closeDlg]])),900)}
 if(evk)setTimeout(()=>whenFree(()=>seasonDone(evk,sel)),900);
 if(q&&q.done)linePost('sys',`📌 ${FR[q.by]?FR[q.by].n:''}的委託完成了`);return r}}
// ───────── 小組季節活動 ─────────
const XG=['cf_perfume','cf_cream','cf_mug','cf_xgift'];
const SEV={moon:{n:'中秋烤肉',mo:9,list:[['px_pork',2],['px_matsu',1],['px_steak',1],['px_shrimp',1],['px_oyster',1],['cf_coal',1],['px_sauce',1],['px_toast',1],['px_pomelo',1]]},xmas:{n:'聖誕交換禮物',mo:12,list:[[XG,1],['cf_chicken',1],['cf_cake',1],['cf_grape',1]]}};
function seasonEv(){const c=cal();for(const k in SEV){const E=SEV[k];if(E.mo==c.mo){const S=rnS().sev||(rnS().sev={});const id=k+c.yr;return{k,n:E.n,list:E.list,get done(){return !!S[id]},set done(v){S[id]=v}}}}return null}
const evHas=x=>Array.isArray(x[0])?x[0].reduce((a,k)=>a+(st.inv[k]||0),0)>=x[1]:(st.inv[x[0]]||0)>=x[1];
const evName=x=>Array.isArray(x[0])?'交換禮物（香水／護手霜／馬克杯／福袋 任一）':IT[x[0]].n;
const evUse=x=>{if(!Array.isArray(x[0]))return st.inv[x[0]]-=x[1];let n=x[1];for(const k of x[0]){const t=Math.min(n,st.inv[k]||0);st.inv[k]-=t;n-=t;if(!n)break}};
const evReady=ev=>ev.list.every(evHas);
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const ev=seasonEv();if(ev&&!ev.done&&lineOpen()){const G=rnS().grp;G.evAnn=G.evAnn||{};const id=ev.k+cal().yr;if(!G.evAnn[id]){G.evAnn[id]=1;linePost('rita',`📣 這個月小組要辦「${ev.n}」！購物清單：<br>`+ev.list.map(x=>Array.isArray(x[0])?`・🎁 ${evName(x)}（家樂福）`:`・${IT[x[0]].i} ${IT[x[0]].n} ×${x[1]}（${x[0].startsWith('px')?'全聯':'家樂福'}）`).join('<br>')+'<br>誰幫忙採買？🙋')}}}catch(e){}return r}}
function seasonDone(k,sel){let T0x='';const n=sel.map(id=>FR[id].n).join('、');sel.forEach(id=>{try{frAdd(id,8,1)}catch(e){}});fxApply({j:25});hud();
 const T0=k=='moon'?`頂樓烤肉架升起炭火，梅花肉、松阪豬、板腱牛排滋滋作響，蝦子和牡蠣在網子上冒泡，${n}圍著烤架聊天。<br>大家剝著文旦柚，抬頭看著又大又圓的月亮，有人起頭唱了一首詩歌。<br><br>這是老房子頂樓三十年來，第一次又這麼熱鬧。`:`和室掛上了聖誕燈，大家拿著交換禮物圍成一圈。<br>音樂一停，${n}拆開禮物，笑聲不斷。<br>最後大家手牽手唱〈平安夜〉，家宜靠在你肩上。`;
 if(k=='xmas'){const G2=[['🧴','一瓶好香的香水',1],['🧤','一條溫暖的手工圍巾',1],['☕','一張咖啡廳禮物卡',1],['🧦','一雙印著「我愛主日學」的襪子',0],['📅','一本去年的月曆',0],['🩲','一條印著陀螺圖案的四角褲',0]],g=G2[Math.floor(Math.random()*G2.length)];T0x=`<br><br>你抽到的交換禮物是……${g[0]} <b>${g[2]?'':''}${g[1]}</b>！${g[2]?'好棒！':'全場笑翻了，到底是誰買的啦！😂'}`}
 try{feedPost(k=='moon'?'🥩 中秋小組烤肉':'🎄 小組聖誕交換禮物',k=='moon'?'在頂樓烤肉賞月，好幸福！':'今年的聖誕節，和小組的大家一起過。',null)}catch(e){}
 openDlg(k=='moon'?'🌕 中秋烤肉':'🎄 聖誕交換禮物',T0+T0x+'<br><br>😊 +25　💞 每位朋友好感 +8',[['好開心！','',closeDlg]])}
// ───────── 家樂福：會員點數、試吃阿姨、年節禮盒 ─────────
const cfS=()=>st.cf||(st.cf={pt:0,sp:0,tr:-1});
// 在家樂福花的錢：每 100 元 1 點；在全聯花的錢：福利卡每 100 元 1 點
setInterval(()=>{try{const m=st.money;if(window.__lm==null){window.__lm=m;return}const d=window.__lm-m;window.__lm=m;if(d<=0||d>60000)return;if(scene=='家樂福'){const C=cfS();C.sp+=d;const add=Math.floor(C.sp/100);if(add>0){C.pt+=add;C.sp-=add*100}}else if(scene=='全聯'){const P=pxC();P.sp+=d*(P.yj?2:1);const add=Math.floor(P.sp/100);if(add>0){P.pt+=add;P.sp-=add*100}}}catch(e){}},300);
const CFREW=[['🌀','陀螺配件強化組',300,()=>addItem('topx',1),'陀螺對戰時性能提升（★）'],['🎯','Nerf 連發衝鋒槍',500,()=>{st.nerfX=1},'Nerf 打靶子彈 12 → 20 發'],['🍟','小米氣炸鍋',800,()=>{st.airfry=1},'頂樓菜園下廚多一道「氣炸時蔬」'],
 ['☕','toffy 時尚咖啡機',1200,()=>{st.coffee=1},'家裡廚房每天可以煮一杯咖啡 ⚡+10'],['🤖','掃地機器人',2000,()=>{st.robot=1},'老房子清理時每次多 15% 進度'],['💺','按摩椅',3000,()=>{st.massage=1},'每個週末可以在家按摩一次 ⚡+25']];
function cfRewards(){const C=cfS();openDlg('🎁 家樂福會員點數兌換',`目前點數：<b>${C.pt}</b> 點（每消費 100 元累積 1 點）`,CFREW.map(q=>{const own=q[0]=='🌀'?false:(q[1]=='Nerf 連發衝鋒槍'&&st.nerfX)||(q[1]=='小米氣炸鍋'&&st.airfry)||(q[1]=='toffy 時尚咖啡機'&&st.coffee)||(q[1]=='掃地機器人'&&st.robot)||(q[1]=='按摩椅'&&st.massage);
 return[`${q[0]} ${q[1]}　${q[2]} 點`,own?'已經兌換過了':q[4],()=>{C.pt-=q[2];q[3]();hud();SVDIRTY=1;toast('🎁 兌換了'+q[1]+'！已送到家裡');cfRewards()},own||C.pt<q[2]]}).concat([['返回','',()=>mainMenu('家樂福')]]))}
const SAMPLE=[['🧀','起司夾心餅乾',89],['🍗','韓式炸雞塊',199],['🥟','爆漿小籠包',159],['🍜','麻辣鍋湯底',129],['🫓','黑松露洋芋片',79],['🍋','檸檬氣泡飲',35]];
function sampleLady(){const C=cfS(),q=SAMPLE[Math.floor(Math.random()*SAMPLE.length)];C.tr=wkN()*10+dow();fxApply({s:3,j:2});hud();
 openDlg('🍢 試吃阿姨','「帥哥～來試吃看看！」<br>你吃了一口<b>'+q[1]+'</b>……好像還不錯？<br>阿姨笑咪咪：「今天新品特價，買兩盒再打九折喔！家裡老婆一定喜歡！」',[[`🛒 買兩盒（💰${Math.round(q[2]*2*.9)}）`,'⚡+12 😊+8',()=>{st.money-=Math.round(q[2]*2*.9);fxApply({s:12,j:8});hud();closeDlg();toast('🛒 又被試吃阿姨推坑了……')},st.money<q[2]*2],['謝謝阿姨，我只是試吃','阿姨小小失望',()=>{closeDlg();toast('阿姨：「下次再來喔～」（嘟嘴）')}]])}
const GIFTBOX=[['gb_pine','🍍','鳳梨酥禮盒',599],['gb_moon','🥮','月餅禮盒',799],['gb_tea','🍵','高山茶禮盒',1200]];
GIFTBOX.forEach(q=>IT[q[0]]={n:q[2],i:q[1],p:q[3],d:'年節禮盒，送給長輩最有心意。打開手機「🎁 送禮」就能送出。',u:'keep'});
const giftSeason=()=>{const m=cal().mo;return(m==1||m==2)?'春節':m==9?'中秋':null};
wrapSP('家樂福',o=>{const C=cfS();o.splice(1,0,['🎁 會員點數兌換',`目前 ${C.pt} 點・家電、玩具`,cfRewards]);
 if(C.tr!=wkN()*10+dow()&&((wkN()*31+dow()*7)%10)<3)o.splice(1,0,['🍢 試吃攤位','試吃阿姨在招手……',()=>{closeDlg();sampleLady()}]);
 const gs=giftSeason();if(gs)o.splice(1,0,['🎁 '+gs+'禮盒',GIFTBOX.map(q=>q[2]).join('、'),()=>buyList('🎁 '+gs+'禮盒','送長輩、送家人，都很有面子。',GIFTBOX,q=>q[3],()=>mainMenu('家樂福'))])});
const GIFTTO=[['afu','👨 阿福（爸爸）',()=>true,['gb_tea'],'阿福最愛泡茶，收到高山茶笑得合不攏嘴：「這茶好！今晚就來泡一壺。」','阿福：「人回來就好，還買什麼禮物！」嘴上這樣說，還是收得很開心。'],
 ['yjmom','💗 家宜的媽媽',()=>yjS().wed,['gb_pine','gb_tea'],'家宜媽媽眼睛一亮：「哎呀，這是我最喜歡的！」拉著家宜的手說：「這個女婿真貼心。」','家宜媽媽：「來就好了，還這麼客氣。」家宜在旁邊偷笑。'],
 ['ding','👴👵 丁爺爺、丁奶奶',()=>st.ding&&st.ding.v>0,[],'丁奶奶在電話那頭笑得好開心：「還記得我們這兩個老人家喔！」過幾天，郵差送來一罐丁爺爺釀的梅子醬。',''],
 ['yilun','⛪ 以倫牧師',()=>{try{return FRS('yilun').met}catch(e){return false}},[],'以倫牧師：「哇，太客氣了！謝謝你們一直在小組裡擺上。」',''],
 ['huijing','💐 惠菁師母',()=>{try{return FRS('huijing').met}catch(e){return false}},[],'惠菁：「謝謝你們～我拿去兒主辦公室跟大家分！」','']];
function giftMenu2(){const gs=giftSeason(),G=st.gift||(st.gift={}),tag=gs+cal().yr;
 if(!gs)return openDlg('🎁 送禮','年節禮盒只有春節（1–2 月）和中秋（9 月）才有。',[['返回','',phoneHome]]);
 const box=GIFTBOX.filter(q=>(st.inv[q[0]]||0)>0);if(!box.length)return openDlg('🎁 '+gs+'送禮','你身上沒有禮盒。到家樂福買'+gs+'禮盒吧！',[['返回','',phoneHome]]);
 openDlg('🎁 '+gs+'送禮','要送給誰？',GIFTTO.filter(q=>q[2]()).map(q=>[q[1],G[tag+q[0]]?'今年'+gs+'已經送過了':(q[3].length?'喜歡：'+q[3].map(k=>IT[k].n).join('、'):''),()=>giftPick(q,box,tag),G[tag+q[0]]]).concat([['返回','',phoneHome]]))}
function giftPick(q,box,tag){openDlg('🎁 送給'+q[1].replace(/^\S+\s/,''),'要送哪一盒？',box.map(b=>[`${b[1]} ${b[2]}`,q[3].includes(b[0])?'💗 正合他的喜好':'',()=>{const G=st.gift,love=!q[3].length||q[3].includes(b[0]);st.inv[b[0]]--;G[tag+q[0]]=1;fxApply({j:love?14:8,r:2});if(FR[q[0]])try{frAdd(q[0],love?8:4,1)}catch(e){}if(q[0]=='yjmom')try{frAdd('yijia',love?8:4,1)}catch(e){}if(q[0]=='ding')addItem('px_sauce',1);hud();SVDIRTY=1;
  openDlg('🎁 送禮',(love?q[4]:(q[5]||q[4]))+`<br><br>😊 +${love?14:8}　⭐ +2`,[['好！','',closeDlg]])}]).concat([['返回','',giftMenu2]]))}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)&&giftSeason()){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i<0?opts.length:i,0,['🎁 送禮',giftSeason()+'禮盒',giftMenu2,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
// ───────── 全聯：晚上 9 點後生鮮 7 折（限量）、福利卡、和家宜一起買菜 ─────────
const FRESH=['px_veg','px_pork','px_fish','px_fruit','px_shrimp','px_chick','px_zuc','px_blue'];
const pxC=()=>st.pxc||(st.pxc={pt:0,sp:0,cp:0,yj:0,date:-1});
const pxLim=()=>{const P=pxS(),k=dow();if(P.limD!=k){P.limD=k;P.lim={};FRESH.forEach(x=>P.lim[x]=1+Math.floor(Math.random()*3))}return P.lim};
const pxNight=()=>T.hour>=21;
pxPrice=function(q){const P=pxS();if(pxNight()&&FRESH.includes(q[0])&&(pxLim()[q[0]]||0)>0)return Math.round(q[3]*.7);return P.bad.includes(q[0])?Math.round(q[3]*1.35):Math.round(q[3]*.95)};
{const _bl=buyList;buyList=function(title,desc,list,price,back){if(list===SHOPX.px){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)){const C=pxC();if(pxNight())d='🌙 晚上 9 點後，生鮮 7 折（數量有限）！<br>'+d;if(C.cp>0)d+=`<br>🎟️ 福利卡折價券 ×${C.cp}（每張折 50 元，結帳自動使用）`;
   opts.forEach((o,i)=>{const q=list[i];if(!q)return;if(pxNight()&&FRESH.includes(q[0])){const n=pxLim()[q[0]]||0;o[0]=o[0].replace(/　⚠️.*$/,'')+(n>0?`　🌙 7 折・剩 ${n}`:'　🌙 賣完了');if(n<=0)o[3]=true}
    const f=o[2];o[2]=()=>{if(pxNight()&&FRESH.includes(q[0]))pxLim()[q[0]]--;if(C.cp>0&&price(q)>=100){C.cp--;st.money+=50;toast('🎟️ 用了一張折價券，折 50 元')}f()}})}return od.call(this,t,d,opts,...r)};try{return _bl.apply(this,arguments)}finally{openDlg=od}}return _bl.apply(this,arguments)}}
wrapSP('全聯',o=>{const C=pxC();o.splice(1,0,['💳 福利卡',`點數 ${C.pt}・每 100 點換一張 50 元折價券`,()=>{const n=Math.floor(C.pt/100);openDlg('💳 全聯福利卡',`點數：<b>${C.pt}</b>　折價券：<b>${C.cp}</b> 張<br><span style="font-size:12px;opacity:.8">每消費 100 元 1 點；和家宜一起買菜時點數加倍。</span>`,[[`🎟️ 兌換折價券 ×${n}`,'每 100 點換一張 50 元',()=>{C.pt-=n*100;C.cp+=n;hud();toast('🎟️ 換了 '+n+' 張折價券');mainMenu('全聯')},n<1],['返回','',()=>mainMenu('全聯')]])}]);
 if(yjS().wed)o.splice(1,0,['💗 和家宜一起買菜（約會）',C.date==wkN()?'這個週末已經一起逛過了':'1 小時・推著購物車慢慢逛・福利卡點數加倍',()=>pxDate(),C.date==wkN()]) });
function pxDate(){const C=pxC();C.date=wkN();C.yj=1;closeDlg();advance(1);const pick=[...SHOPX.px].sort(()=>Math.random()-.5).slice(0,4);let tot=0;pick.forEach(q=>{tot+=pxPrice(q);addItem(q[0],1)});st.money-=tot;C.yj=0;C.sp+=tot*2;const add=Math.floor(C.sp/100);C.pt+=add;C.sp-=add*100;window.__lm=st.money;
 try{frAdd('yijia',4,1)}catch(e){}fxApply({j:12});hud();SVDIRTY=1;
 const L=['家宜推著購物車，你負責拿東西。她拿起兩把青菜比來比去：「這把比較新鮮！」','經過零食區，你偷偷丟了一包洋芋片進車子，被她抓到：「欸！」然後她自己也丟了一包巧克力。','結帳的時候，店員說「福利卡點數兩倍喔」，家宜開心得像中了發票。'];
 openDlg('💗 和家宜一起買菜',L.join('<br><br>')+`<br><br>🛒 買了：${pick.map(q=>q[1]+q[2]).join('、')}（💰${tot}）<br>💳 福利卡點數 +${add}　💞 家宜好感 +4　😊 +12`,[['下次再一起來','',closeDlg]])}
// ───────── 兌換到的家電、玩具效果 ─────────
{const _ng=nerfGame;nerfGame=function(){const r=_ng.apply(this,arguments);return r}}
{const _cg=cleanGame;cleanGame=function(k){const S=rnS()[k],c0=S.cl;const r=_cg.apply(this,arguments);if(st.robot){const t=setInterval(()=>{if(S.cl!=c0){clearInterval(t);if(S.cl<100){S.cl=Math.min(100,S.cl+15);if(S.cl>=100){S.s=1}rnRefresh();toast('🤖 掃地機器人幫忙多清了 15%')}}},400);setTimeout(()=>clearInterval(t),60000)}return r}}
{const R5=IN['家'];if(R5&&R5.spf){const ck=R5.spf.cook,sf=R5.spf.sofa;R5.spf.cook=()=>{if(!st.coffee)return ck&&ck();openDlg('🍳 廚房','',[['☕ 用咖啡機煮一杯咖啡',(st.cofD==wkN()*10+dow())?'今天已經喝過了':'⚡+10 😊+4',()=>{st.cofD=wkN()*10+dow();fxApply({s:10,j:4});advance(.2);hud();closeDlg();toast('☕ toffy 咖啡機嗡嗡作響，咖啡香充滿整個家')},st.cofD==wkN()*10+dow()],['🍳 原本的廚房','',()=>{closeDlg();ck&&ck()}],['離開','',closeDlg]])};
 R5.spf.sofa=()=>{if(!st.massage)return sf&&sf();openDlg('🛋️ 沙發・按摩椅','',[['💺 按摩椅（30 分鐘）',st.msgW==wkN()?'這個週末已經按過了':'⚡+25 😊+6',()=>{st.msgW=wkN();fxApply({s:25,j:6});advance(.5);hud();closeDlg();toast('💺 全身被揉開了……好舒服')},st.msgW==wkN()],['🛋️ 原本的沙發','',()=>{closeDlg();sf&&sf()}],['離開','',closeDlg]])}}}
{const _gm=gardenMenu;gardenMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(st.airfry&&Array.isArray(opts)&&t.includes('菜園')){const i=opts.findIndex(o=>o[0]=='離開');opts.splice(i,0,['🍟 氣炸時蔬','用 1 份蔬菜・30 分鐘・⚡+16 😊+8',()=>{useVeg(1);fxApply({s:16,j:8});advance(.5);hud();closeDlg();toast('🍟 小米氣炸鍋出品，酥酥脆脆！')},vegCount()<1])}return od.call(this,t,d,opts,...r)};try{return _gm.apply(this,arguments)}finally{openDlg=od}}}
