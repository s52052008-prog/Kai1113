/* v9.9 全聯與家樂福的差別、家庭小組（受洗＋結婚後）與小組委託、家宜和 RITA 的姊妹時光、
   健身房 Lv2（第一位學員：禹豪）、聚會和室 Lv2–5（投影、兒童角落 Nerf／陀螺）、生日後的陀螺台劇情 */
// ───────── 商品 ─────────
const SHOPX={
 // 全聯：生鮮、小農蔬菜、日常小份量（比原價便宜 5%）
 px:[['px_veg','🥬','小農蔬菜（一把）',39,{s:5,j:2,h:3}],['px_egg','🥚','洗選雞蛋 10 入',85,{s:10,j:1}],['px_milk','🥛','鮮乳 936ml',95,{s:8,j:3,h:1}],['px_toast','🍞','厚片吐司',45,{s:10,j:2}],['px_tofu','🧈','板豆腐',25,{s:6,h:2}],
  ['px_pork','🥩','梅花肉片',169,{s:14,j:3}],['px_fish','🐟','鮭魚切片',199,{s:16,j:4,h:2}],['px_dump','🥟','冷凍水餃 50 入',199,{s:26,j:3}],['px_fruit','🍓','當季水果盒',129,{s:8,j:8,h:2}],['px_tea','🧃','冬瓜茶',25,{s:3,j:3}],
  ['px_soup','🍲','香菇雞湯食材包',249,{s:24,j:8,h:4}],['px_chick','🍗','舒肥雞胸肉',69,{s:12,h:3}],['px_blue','🫐','藍莓 125g',99,{s:4,j:4,h:3}],['px_zuc','🥒','櫛瓜',49,{s:4,h:3}],['px_shrimp','🦐','白蝦一盒',299,{s:14,j:6,h:2}],
  ['px_sauce','🥫','烤肉醬',59,{}],['px_pomelo','🟢','文旦柚',129,{s:6,j:6,h:2}],['px_matsu','🥓','松阪豬',199,{s:14,j:5}],['px_steak','🥩','板腱牛排',299,{s:18,j:6}],['px_oyster','🦪','鮮蚵',159,{s:10,j:5,h:2}]],
 cf:[['cf_chicken','🍗','整隻烤雞',259,{s:40,j:12}],['cf_pizza','🍕','超大 PIZZA',299,{s:44,j:14}],['cf_sushi','🍣','壽司拼盤',399,{s:36,j:12}],['cf_bucket','🍗','炸雞桶',399,{s:48,j:12,h:-2}],
  ['cf_fruit','🍉','水果大拼盤',299,{s:16,j:12,h:4}],['cf_cake','🎂','生日蛋糕 6 吋',499,{s:20,j:18}],['cf_lasagna','🍝','家庭號千層麵',289,{s:40,j:10}],['cf_snack','🍿','零食派對桶',199,{s:10,j:12,h:-1}],
  ['cf_hotdog','🌭','現烤大熱狗',59,{s:12,j:6}],['cf_coal','⬛','烤肉木炭 3kg',149,{}],['cf_perfume','🧴','香水（交換禮物）',899,{}],['cf_cream','🧴','護手霜（交換禮物）',199,{}],['cf_mug','☕','馬克杯（交換禮物）',249,{}],['cf_xgift','🎁','神秘福袋（交換禮物）',499,{}],['cf_mullet','🐟','烏魚子禮盒',1680,{s:10,j:10}],
  ['durian','🍈','超級香甜大榴槤',1280,{s:20,j:10}],
  ['cf_red','🍷','法國紅酒',499,{j:12,h:-1}],['cf_white','🥂','紐西蘭白酒',549,{j:10,h:-1}],['cf_sake','🍶','日本清酒 720ml',699,{j:12,h:-1}],['cf_beer','🍺','德國啤酒 6 入',359,{j:10,h:-1}],['cf_grape','🍇','氣泡葡萄汁（無酒精）',149,{s:4,j:10}]]};
for(const g in SHOPX)SHOPX[g].forEach(q=>{IT[q[0]]={n:q[2],i:q[1],p:q[3],d:Object.entries(q[4]).map(([k,v])=>({s:'⚡',j:'😊',h:'❤️'}[k]||'')+(v>0?'+':'')+v).join(' '),u:q[4]}});
const pxS=()=>{const W=wkN();if(!st.px||st.px.w!=W){const r=orn(W*7919+13),bad=new Set();while(bad.size<(r()<.5?1:2))bad.add(SHOPX.px[Math.floor(r()*SHOPX.px.length)][0]);st.px={w:W,bad:[...bad],sale:r()<.22}}return st.px};
function pxPrice(q){const P=pxS();return P.bad.includes(q[0])?Math.round(q[3]*1.35):Math.round(q[3]*.95)}
function cfPrice(q){return pxS().sale?Math.round(q[3]*.8):q[3]}
function buyList(title,desc,list,price,back){openDlg(title+`（💰${st.money.toLocaleString('en-US')}）`,desc,list.map(q=>{const p=price(q),tag=p>q[3]?'　⚠️ 標價好像怪怪的':p<q[3]?`　<s style="opacity:.6">${q[3]}</s>`:'';return[`${q[1]} ${q[2]}　💰${p}${tag}`,IT[q[0]].d,()=>{if(!addItem(q[0],1))return;st.money-=p;hud();if(p>q[3]&&Math.random()<.5)toast('🤔 結帳時才發現被多收了錢……標價貼錯了！');else toast('🛒 買了'+q[2]);buyList(title,desc,list,price,back)},st.money<p]}).concat([['返回','',back]]))}
// 全聯：建築與室內
I['全聯']='🛒';
def('全聯',{W:360,H:220,f:'#e8eef4',g:'#dde4ea',fl:'tile',w:'#1e5aa8',title:'🛒 全聯福利中心',
 fur:[['gshelf',20,30,80,40],['gshelf',110,30,80,40],['dairy',200,30,60,38],['dairy',266,30,60,38],['gshelf',24,100,70,40],['crate',110,110,26,22],['crate',140,110,26,22],['counter',230,160,110,22,'#1e5aa8']],
 ppl:[pp('店員 阿美',280,146,'#1e5aa8','#222','實在真便宜！|今天的小農蔬菜剛到貨喔。',{ou:'a',dir:0}),pp('婆婆媽媽',120,160,'#c0392b','#ddd','這個標價好像怪怪的……',{dir:0})],sp:[['main',230,184,110,12]]});
SP['全聯']=()=>[['🛒 生鮮・日常用品',pxS().bad.length?'實在真便宜（偶爾標價會貼錯，要看清楚）':'',()=>buyList('🛒 全聯福利中心','小份量、新鮮、比外面便宜一點。',SHOPX.px,pxPrice,()=>mainMenu('全聯'))]];
wrapSP('家樂福',o=>o.splice(1,0,[pxS().sale?'🎉 年終慶 8 折！大份量熟食・進口酒':'🍗 大份量熟食・進口酒','派對、小組聚會、送禮都適合',()=>buyList('🍗 家樂福熟食・酒類',pxS().sale?'🎉 年終慶全館 8 折！':'整隻烤雞、超大 PIZZA、進口酒……大份量最划算。',SHOPX.cf,cfPrice,()=>mainMenu('家樂福'))]));
// ───────── 家庭小組：受洗＋結婚後才開放；人數上限；小組委託 ─────────
const GCAP=[0,4,8,12,16,20];const grpCap=()=>GCAP[Math.min(5,rnS().wa.lv)]||0;
const grpOpen=()=>{const y=yjS();return !!(y.bapt&&y.wed)};
groupRoom=function(f0){const G=rnS().grp,W=wkN(),h=T.hour,ok=h>=18&&h<22,done=G.w==W,open=grpOpen(),cap=grpCap(),lv=rnS().wa.lv;
 const o=[['🙏 舉辦家庭小組（2 小時）',!open?'要先受洗、和家宜結婚後才能開始':done?'這個週末已經聚過了':ok?`邀請朋友・人數上限 ${cap} 人`:'晚上 18:00–22:00 才能開始',()=>groupInvite(),!open||done||!ok]];
 if(lv>=2)o.push(['🎬 投影看電影（2 小時）','和家宜窩在和室看一部電影・😊+14',()=>{advance(2);fxApply({j:14});try{frAdd('yijia',2,1)}catch(e){}hud();closeDlg();toast('🎬 關燈、爆米花、靠在一起看完一部電影。')}]);
 if(lv>=3)o.push(['🎯 兒童角落：Nerf 射擊','打靶小遊戲',()=>{closeDlg();nerfGame()}],['🌀 兒童角落：陀螺對戰',done?'小組的朋友還在，一起打！':'要有朋友來家裡才有人能對打',()=>{closeDlg();beyHomeGo('小組的朋友')},!done]);
 if(lv<5){const L=WALV[lv+1];o.push([`🏗️ 升級聚會和室 Lv${lv+1}（💰${L[1].toLocaleString('en-US')}）`,L[0]+`・小組上限 ${GCAP[lv+1]} 人`,()=>{payOut(L[1]);rnS().wa.lv=lv+1;hud();SVDIRTY=1;closeDlg();rnRefresh();openDlg('🎉 聚會和室 Lv'+(lv+1),L[0]+'完成！<br>小組人數上限提高到 <b>'+GCAP[lv+1]+'</b> 人。',[['太好了','',closeDlg]])},funds()<L[1]])}
 o.push(['🍵 和室原本的活動','泡茶、禱告、午睡',()=>{closeDlg();f0&&f0()}],['離開','',closeDlg]);
 openDlg('🙏 聚會和室 Lv'+lv,`家庭小組：已聚會 <b>${G.cnt}</b> 次・固定成員 <b>${G.m.length+(G.nf||0)}</b> 人（上限 ${cap}）${G.req&&G.req.w==W?`<br>📌 本週委託：${G.req.by}想要「${G.req.it=='veg'?'自己種的菜':IT[G.req.it].n}」`:''}${open?'':'<br><span style="font-size:12px;opacity:.8">🔒 家庭小組要等你們受洗、結婚之後才會開始。</span>'}`,o)};
const WALV={2:['投影機、布幕、懶骨頭',15000],3:['兒童角落：Nerf 靶場、陀螺台',25000],4:['加大和室、更多坐墊',40000],5:['敬拜音響、吉他架、詩歌投影',60000]};
groupInvite=function(sel){sel=sel||[];const ids=Object.keys(FR).filter(id=>{try{return FRS(id).met&&id!='yijia'}catch(e){return false}});const mx=Math.max(1,Math.min(ids.length,grpCap()-1));
 openDlg(`🙏 邀請誰來小組？（最多 ${mx} 位）`,'💗 家宜會一起參加。<br>'+`已選：${sel.map(id=>FR[id].n).join('、')||'（還沒選）'}`,ids.map(id=>[`${sel.includes(id)?'✅':'⬜'} ${FR[id].ic} ${FR[id].n}`,FR[id].who,()=>{const s=sel.includes(id)?sel.filter(x=>x!=id):sel.length<mx?sel.concat(id):sel;groupInvite(s)}]).concat([['▶ 下一步：準備點心',sel.length?'':'至少邀請一位',()=>groupSnack(sel),!sel.length],['取消','',closeDlg]]))};
groupSnack=function(sel){const G=rnS().grp,q=G.req&&G.req.w==wkN()?G.req:null,o=[];
 if(q){const has=q.it=='veg'?vegCount()>=2:(st.inv[q.it]||0)>0;o.push([`📌 小組委託：${q.it=='veg'?'自己種的菜 ×2':IT[q.it].i+' '+IT[q.it].n}`,has?q.by+'會超開心！好感大加成':'背包裡沒有，'+(q.it=='veg'?'去頂樓收成':q.it.startsWith('px')?'去全聯買':'去家樂福買'),()=>{if(q.it=='veg')useVeg(2);else st.inv[q.it]--;G.req.done=1;groupTopic(sel,3)},!has])}
 const party=SHOPX.cf.concat(SHOPX.px).filter(x=>(st.inv[x[0]]||0)>0&&!(q&&x[0]==q.it)&&!/cf_(red|white|sake|beer)/.test(x[0]));if(party.length)o.push([`🧺 帶背包裡的：${IT[party[0][0]].i} ${IT[party[0][0]].n}`,'',()=>{st.inv[party[0][0]]--;groupTopic(sel,1)}]);
 o.push(['🥬 用自己種的菜炒幾盤（2 份蔬菜）','大家最喜歡！好感加成',()=>{useVeg(2);groupTopic(sel,2)},vegCount()<2],['🍱 訂外食（💰800）','',()=>{st.money-=800;hud();groupTopic(sel,1)},st.money<800],['🍪 簡單茶點（💰200）','',()=>{st.money-=200;hud();groupTopic(sel,0)},st.money<200]);
 openDlg('🍽️ 準備點心',`${sel.length+2} 個人的份量`,o)};
function useVeg(n){Object.keys(CROPS).forEach(q=>{const t=Math.min(n,st.inv['veg_'+q]||0);st.inv['veg_'+q]=(st.inv['veg_'+q]||0)-t;n-=t})}
{const _gr=groupRun;groupRun=function(sel,snack,v){const req=snack==3;if(req)snack=2;const G=rnS().grp;const r=_gr.call(this,sel,snack,v);
 // 新朋友慢慢加入，直到人數上限
 const cap=grpCap(),now=G.m.length+(G.nf||0)+2;if(now<cap&&Math.random()<.5){G.nf=(G.nf||0)+1;setTimeout(()=>toast('🙋 小組來了一位新朋友！固定成員 '+(G.m.length+G.nf)+' 人'),1500)}
 if(req){try{const id=FR[G.req.by]?G.req.by:Object.keys(FR).find(k=>FR[k].n.includes(G.req.by));if(id)frAdd(id,6,1)}catch(e){}fxApply({j:8});setTimeout(()=>toast('📌 小組委託完成！'+(FR[G.req.by]?FR[G.req.by].n:G.req.by)+'超感動 😊+8'),900)}
 // 散會後：有陀螺台就可以留下來對戰
 if(st.stad&&st.stad.on)setTimeout(()=>whenFree(()=>openDlg('🌀 散會後','幾個弟兄看到客廳的陀螺台，眼睛都亮了：「欸，來一場吧！」',[['🌀 來打！','',()=>{closeDlg();beyHomeGo('小組的弟兄')}],['今天先這樣','',closeDlg]])),1200);return r}}
// ───────── 家宜 ✕ RITA：好姊妹 ─────────
const sisWeek=()=>{const y=yjS();if(!y.wed)return false;try{if(!FRS('rita').met)return false}catch(e){return false}const W=wkN();return ((W*2654435761)>>>0)%100<45};
const sisNow=()=>sisWeek()&&dow()==5&&T.hour>=18&&T.hour<21.5;
{const _yw=yjWhere;yjWhere=function(){if(sisNow())return'咖啡店';return _yw.apply(this,arguments)}}
{const _ys=yjSync;yjSync=function(dt){_ys.apply(this,arguments);try{if(scene!='咖啡店'||!rm||!rm.ppl)return;const has=rm.ppl.find(q=>q.ritaSis);
 if(sisNow()&&!has)rm.ppl.push(pp('RITA',210,126,'#c0392b','#222','我們今天是姊妹約會喔～你不准偷聽！|家宜說你最近都在打陀螺，哈哈哈。',{sit:1,pose:'chat',dir:2,ritaSis:1}));else if(!sisNow()&&has)rm.ppl=rm.ppl.filter(q=>!q.ritaSis)}catch(e){}}}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{if(sisWeek())setTimeout(()=>whenFree(()=>openDlg('📱 LINE・家宜','「老公～週六晚上我跟 RITA 去願你平安咖啡廳吃晚餐、聊天喔！🥰 你自己要乖乖吃飯～」',[['好，玩得開心！','',closeDlg]])),4000)}catch(e){}return r}}
try{FR.rita.bio=FR.rita.bio||[];FR.rita.bio.push([3,'和家宜是無話不談的好姊妹，常常一起吃晚餐、喝咖啡']);FR.yijia.bio=FR.yijia.bio||[];FR.yijia.bio.push([3,'和 RITA 是好姊妹，週末偶爾會一起去咖啡廳'])}catch(e){}
// ───────── 健身房 Lv2：第一位學員是禹豪 ─────────
const ptS=()=>{const R=rnS();return R.pt||(R.pt={kg:88,n:0,w:0,ms:{}})};
gymMenu=function(f0){const lv=rnS().gym.lv,P=ptS(),W=wkN(),o=[['💪 啞鈴訓練（小遊戲）','⚡-12・1 小時・算一次健身打卡',()=>{closeDlg();dumbbell()},st.sta<12],['🥊 打沙包、其他訓練','',()=>{closeDlg();f0&&f0()}]];
 if(lv<2)o.push(['🏗️ 升級家庭健身房 Lv2（💰25,000）','深蹲架、臥推椅・可以收第一位私人學員',()=>{payOut(25000);rnS().gym.lv=2;hud();SVDIRTY=1;closeDlg();rnRefresh();ptIntro()},funds()<25000]);
 else if(P.kg>75){const ok=P.w!=W&&dow()>=5&&T.hour>=9&&T.hour<18;o.splice(1,0,['🏀 私人教練課：黃禹豪',P.w==W?'這個週末已經上過課了':ok?`目前 ${P.kg} 公斤 → 目標 75 公斤・💰+1,200`:'週末 09:00–18:00 上課',()=>{closeDlg();coachGame()},!ok||st.sta<10])}
 else o.splice(1,0,['🏆 禹豪：畢業了！','他已經達成 75 公斤的目標',()=>openDlg('🏀 禹豪','「教練！現在打全場都不會喘了！謝謝你啦！」',[['不客氣！','',closeDlg]])]);
 openDlg('🏋️ 家庭健身房 Lv'+lv,lv<2?'瑜伽墊、啞鈴、沙包。在家練，也算進每週健身打卡。':'深蹲架、臥推椅都到位了，像一間小型私人工作室。',o.concat([['離開','',closeDlg]]))};
function ptIntro(){openDlg('📞 禹豪打來了','「欸！聽家宜說你在家裡弄了一間健身房？」<br>「我跟你說……我當爸爸之後胖了十五公斤，88 公斤了啦。上次陪頌言跑公園，跑一圈就喘到不行。」<br>「你可以當我的教練嗎？我付錢！一次 1,200，不准算我朋友價！」<br><br>🏀 <b>第一位私人學員：黃禹豪</b><br>目標：88 → 75 公斤。每個週末白天來上一次課。',[['包在我身上！','',closeDlg]])}
const CUES=[['1','膝蓋內夾','膝蓋往外推！'],['2','駝背','背打直、胸挺起來！'],['3','憋氣','記得吐氣！'],['4','速度太快','慢一點，控制住！']];
function coachGame(){const P=ptS(),M=mgBox('🏋️ 私人教練課：黃禹豪'),g=M.g,W2=720,H2=520;fxApply({s:-10});advance(1);hud();
 const N=8,S={i:0,ok:0,t:0,cur:null,res:'',rt:0,done:false};let last=performance.now();
 const nextCue=()=>{S.cur={c:Math.floor(Math.random()*4),t:0,lim:Math.max(1.3,2.4-S.i*.12)};S.i++};
 const ans=k=>{if(!S.cur||S.done)return;if(k==S.cur.c){S.ok++;S.res='✅ '+CUES[k][2]}else S.res='❌ 不對！他的問題是「'+CUES[S.cur.c][1]+'」';S.rt=1;S.cur=null;S.t=0;if(S.i>=N)setTimeout(fin,700)};
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);const sc=S.ok/N,loss=sc>=.85?1.5:sc>=.6?1:.5;P.kg=Math.round((P.kg-loss)*10)/10;P.n++;P.w=wkN();st.money+=coachPay(1200);try{frAdd('yuhao',sc>=.6?4:2,1)}catch(e){}fxApply({j:sc>=.6?8:3,r:1});hud();SVDIRTY=1;
  g.fillStyle='rgba(255,248,232,.95)';g.fillRect(0,0,W2,H2);g.fillStyle='#3a2210';g.textAlign='center';g.font='bold 34px sans-serif';g.fillText(sc>=.85?'💪 完美的一堂課！':sc>=.6?'👍 不錯的一堂課':'😅 有點手忙腳亂',W2/2,170);g.font='24px sans-serif';g.fillText(`正確提醒 ${S.ok}/${N}　禹豪 -${loss} kg → ${P.kg} kg`,W2/2,230);g.fillText('💰 +'+coachPay(1200).toLocaleString('en-US')+'　⭐ +1',W2/2,275);
  M.tip.textContent='';mgButtons(M,[['下課！',()=>{M.end();ptMilestone()}]])};
 const kd=e=>{e.preventDefault();const i=['1','2','3','4'].indexOf(e.key);if(i>=0)ans(i);if(e.key=='Escape')fin()};OVK.add(kd);
 M.bt.innerHTML='';CUES.forEach((c,i)=>{const b=document.createElement('button');b.textContent=`${c[0]} ${c[1]}`;b.style.cssText='font:inherit;font-size:14px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:6px 10px;cursor:pointer';b.onclick=()=>ans(i);M.bt.appendChild(b)});
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.rt=Math.max(0,S.rt-dt*.6);
  if(!S.cur&&S.t>.9&&S.i<N)nextCue();if(S.cur){S.cur.t+=dt;if(S.cur.t>S.cur.lim){S.res='⏰ 太慢了！他的問題是「'+CUES[S.cur.c][1]+'」';S.rt=1;S.cur=null;S.t=0;if(S.i>=N)setTimeout(fin,700)}}
  g.fillStyle='#2a2430';g.fillRect(0,0,W2,H2);const ph=(now/700)%1,dy=Math.sin(ph*Math.PI*2)*20,c=S.cur&&S.cur.c;
  // 深蹲架
  g.fillStyle='#555';g.fillRect(250,90,14,330);g.fillRect(456,90,14,330);g.fillStyle='#888';g.fillRect(230,170+dy,260,10);g.fillStyle='#222';g.fillRect(222,160+dy,16,30);g.fillRect(482,160+dy,16,30);
  // 禹豪（用他的行走圖，正面）
  if(uaOK('yh_sheet')){g.imageSmoothingEnabled=false;const sx=c==3?Math.sin(now/40)*6:0;g.save();g.translate(W2/2+sx,420);if(c==1)g.rotate(.12);sqDraw(g,UAI.yh_sheet,(1-Math.cos(ph*Math.PI*2))/2);g.restore()}
  else{g.fillStyle='#e8c8a0';g.beginPath();g.arc(W2/2,180+dy,30,0,7);g.fill();g.fillStyle='#3a6ad0';g.fillRect(W2/2-40,210+dy,80,120)}
  if(S.cur){const cc=S.cur.c,a=.6+.4*Math.sin(now/90);g.strokeStyle=`rgba(255,80,60,${a})`;g.lineWidth=5;const pos=[[W2/2,360],[W2/2+10,200+dy],[W2/2,150+dy],[W2/2,260+dy]][cc];g.beginPath();g.arc(pos[0],pos[1],46,0,7);g.stroke();
   g.fillStyle='#3a2210';g.fillRect(20,20,200,16);g.fillStyle='#ffb040';g.fillRect(22,22,196*(1-S.cur.t/S.cur.lim),12)}
  g.fillStyle='#fff6dc';g.font='bold 24px sans-serif';g.textAlign='center';g.fillText(`${S.i}/${N}`,W2-60,40);if(S.rt>0){g.globalAlpha=Math.min(1,S.rt*2);g.fillText(S.res,W2/2,490);g.globalAlpha=1}
  M.tip.textContent='看紅圈的位置，判斷他哪裡做錯了，按 1–4 或點下面的按鈕提醒他！';requestAnimationFrame(loop)};requestAnimationFrame(loop)}
function ptMilestone(){const P=ptS();const L=[[84,'第一次掉到 84 公斤！禹豪：「我上週打全場，第三節才開始喘！」'],[80,'80 公斤！禹豪把頌言扛在肩膀上，在公園跑了一整圈。頌言笑到停不下來。'],[75,'🎉 75 公斤，達成目標！<br>媛媛傳訊息來：「謝謝你把我老公還給我，他現在每天都想運動。」<br>禹豪：「教練，你一定要退伍後去當正式的教練！我第一個幫你宣傳！」']];
 L.forEach(q=>{if(P.kg<=q[0]&&!P.ms[q[0]]){P.ms[q[0]]=1;fxApply({j:10,r:3});try{feedPost('🏋️ 學員進度：禹豪 '+q[0]+' kg',q[1].replace(/<br>/g,' '),null)}catch(e){}whenFree(()=>openDlg('🏋️ 學員的改變',q[1],[['太棒了！','',closeDlg]]))}})}
// ───────── 兒童角落：Nerf 打靶 ─────────
function nerfGame(){const M=mgBox('🎯 Nerf 打靶'),g=M.g,W2=720,H2=520;advance(.5);const S={t:0,sc:0,ammo:st.nerfX?20:12,T:[],cx:W2/2,cy:H2/2,done:false};let last=performance.now();
 const spawn=()=>S.T.push({x:80+Math.random()*(W2-160),y:90+Math.random()*(H2-200),r:22+Math.random()*16,t:0,life:1.4+Math.random()*.8,hit:0});
 const shoot=(x,y)=>{if(S.done||S.ammo<=0)return;S.ammo--;const t=S.T.find(q=>!q.hit&&Math.hypot(q.x-x,q.y-y)<q.r);if(t){t.hit=1;S.sc+=t.r<28?3:1}if(S.ammo<=0)setTimeout(fin,600)};
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);fxApply({j:4+S.sc});hud();g.fillStyle='rgba(255,248,232,.95)';g.fillRect(0,0,W2,H2);g.fillStyle='#3a2210';g.textAlign='center';g.font='bold 40px sans-serif';g.fillText('🎯 得分 '+S.sc,W2/2,220);g.font='24px sans-serif';g.fillText('😊 +'+(4+S.sc),W2/2,270);mgButtons(M,[['再玩一次',()=>{M.end();nerfGame()}],['不玩了',()=>M.end()]])};
 M.cv.addEventListener('pointermove',e=>{const b=M.cv.getBoundingClientRect();S.cx=(e.clientX-b.left)*W2/b.width;S.cy=(e.clientY-b.top)*H2/b.height});M.cv.addEventListener('pointerdown',e=>{const b=M.cv.getBoundingClientRect();shoot((e.clientX-b.left)*W2/b.width,(e.clientY-b.top)*H2/b.height)});
 const kd=e=>{e.preventDefault();const s=18;if(e.key=='ArrowLeft')S.cx-=s;if(e.key=='ArrowRight')S.cx+=s;if(e.key=='ArrowUp')S.cy-=s;if(e.key=='ArrowDown')S.cy+=s;if(e.key==' '&&!e.repeat)shoot(S.cx,S.cy);if(e.key=='Escape')fin()};OVK.add(kd);
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;if(Math.random()<dt*1.6&&S.T.filter(q=>!q.hit).length<3)spawn();S.T.forEach(q=>q.t+=dt);S.T=S.T.filter(q=>q.t<q.life&&!(q.hit&&q.t>q.life));
  g.fillStyle='#3a5a7a';g.fillRect(0,0,W2,H2);g.fillStyle='#c9a06a';g.fillRect(0,H2-80,W2,80);
  S.T.forEach(q=>{const k=Math.min(1,q.t*5);g.fillStyle=q.hit?'#888':'#fff';g.beginPath();g.arc(q.x,q.y,q.r*k,0,7);g.fill();g.fillStyle=q.hit?'#666':'#e84a3a';g.beginPath();g.arc(q.x,q.y,q.r*k*.65,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(q.x,q.y,q.r*k*.3,0,7);g.fill()});
  g.strokeStyle='#ffd84a';g.lineWidth=3;g.beginPath();g.arc(S.cx,S.cy,16,0,7);g.moveTo(S.cx-24,S.cy);g.lineTo(S.cx+24,S.cy);g.moveTo(S.cx,S.cy-24);g.lineTo(S.cx,S.cy+24);g.stroke();
  g.fillStyle='#fff6dc';g.font='bold 24px sans-serif';g.textAlign='left';g.fillText(`🎯 ${S.sc}　🔫 ${'|'.repeat(S.ammo)}`,20,40);M.tip.textContent='滑鼠瞄準點擊，或方向鍵＋空白鍵射擊。小靶 3 分、大靶 1 分！';requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ───────── 生日之後：用榴槤換來的陀螺台 ─────────
// 筆電生日之後，Allen 一直跟家宜盧陀螺台；送她「超級香甜大榴槤」，下週末家裡就會出現陀螺台
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const S2=st.stad||(st.stad={});const W=wkN();
 if(st.ph&&st.ph.laptop&&!S2.hint&&!S2.on){S2.hint=1;setTimeout(()=>whenFree(()=>openDlg('💬 家宜','你抱著新筆電，眼睛卻一直往遊藝場的方向飄：「老婆～如果家裡有一個陀螺對戰台……」<br>家宜白了你一眼：「你都有筆電了還想要？」<br>「拜託啦，一個就好！」<br>家宜想了想，忽然笑了：「嗯……如果有人買一顆<b>超級香甜大榴槤</b>給我吃，我可能會考慮喔～」<br><br><span style="font-size:12px;opacity:.8">家樂福「大份量熟食・進口酒」有賣超級香甜大榴槤。</span>',[['我現在就去買！','',closeDlg]])),5000)}
 if(S2.w&&W>=S2.w&&!S2.on){S2.on=1;homeStadium();setTimeout(()=>whenFree(()=>openDlg('💬 家宜','一進家門，客廳多了一個大紙箱。<br>家宜雙手叉腰：「上禮拜的榴槤很好吃，所以……這是回禮！」<br>拆開一看——是一座正式的<b>戰鬥陀螺對戰台</b>！<br>「我看你很無聊想玩，但我還要忙做兒主簡報，只能陪你玩一次喔！之後你自己練，要對打就找朋友來家裡吧～」<br><br>🌀 客廳現在有陀螺台了！',[['老婆最好了！！','',closeDlg]])),3000)}}catch(e){}return r}}
// 帶著榴槤回家，自動送給家宜
setInterval(()=>{try{if(scene!='家'||!dlg.hidden||window.TITLE||typeof MG!='undefined'&&MG)return;const S2=st.stad||(st.stad={});if(!S2.hint||S2.w||S2.on||!(st.inv.durian>0))return;
 st.inv.durian--;S2.w=wkN()+1;try{frAdd('yijia',6,1)}catch(e){}fxApply({j:10});hud();SVDIRTY=1;openDlg('🍈 超級香甜大榴槤','你把一顆超大的榴槤放在餐桌上，整個家瞬間充滿濃郁的香味。<br>家宜眼睛發亮：「哇！你真的買了！！」她開心地一口接一口，吃得滿臉幸福。<br>「好啦好啦……我會考慮的。」她偷笑著說。<br><br>💗 家宜好感 +6',[['（期待！）','',closeDlg]])}catch(e){}},1500);
function homeStadium(){const R=IN['家'];if(!R||R.fur.some(f=>f._stad))return;const f=['uaf',214,236,50,8,'bx_stad',1,{hm:99}];f._stad=1;R.fur.push(f);R.sp.push(['bey',210,246,58,12]);R.spl.bey='陀螺對戰台';R.spf.bey=beyHome;try{gzRoomRefresh('家')}catch(e){}}
function beyHome(){const S2=st.stad,G=rnS().grp,guest=G.w==wkN(),o=[];
 if(guest)o.push(['🌀 和小組的朋友對戰','朋友還在家裡！',()=>{closeDlg();beyHomeGo('小組的朋友')}]);
 if(!S2.yj)o.push(['🌀 跟家宜對戰（只有一次！）','「就陪你玩一次喔～」',()=>{S2.yj=1;closeDlg();beyHomeGo('家宜')}]);
 o.push(['🎯 自己練習','對著空台練發射、練接軌',()=>{closeDlg();beyHomeGo('練習')}],['離開','',closeDlg]);
 openDlg('🌀 陀螺對戰台',guest?'客廳裡擠滿了人，大家都在等著打下一場！':S2.yj?'家宜在沙發上看書：「自己練吧～要對打就找朋友來！」':'家宜：「好啦，陪你玩一場！」',o)}
function beyHomeGo(who){window.BEYHOME=who;toast('🌀 '+(who=='練習'?'一個人練習……':'對手：'+who));beyStart('free')}
{const _cm=churchMenu;churchMenu=function(a){if(window.BEYHOME&&a=='sat2'){window.BEYHOME=null;closeDlg();return toast('🌀 對戰結束')}return _cm.apply(this,arguments)}}
{const _sl=svLoad;svLoad=function(){const r=_sl.apply(this,arguments);try{if(st.stad&&st.stad.on)homeStadium()}catch(e){}return r}}
{const _ha=homeApply;homeApply=function(){const r=_ha.apply(this,arguments);try{if(st.stad&&st.stad.on){const R=IN['家'];if(!R.fur.some(f=>f[5]=='bx_stad'))homeStadium()}}catch(e){}return r}}
