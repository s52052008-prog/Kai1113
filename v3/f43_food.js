/* v9.3 美食圖鑑：冠宏畫的料理（日韓定食、台港澳、炭烤燒肉、甜點咖啡），在各店點餐就會登錄 */
const FDS={'40':'🏮 夜市小吃','42':'🔥 碳佐麻里','34':'🍱 日韓定食','35':'🥢 台港澳料理','36':'🔥 炭烤燒肉','37':'🍰 甜點咖啡'};
const FOODS=[];
(function(){if(!window.PKIDX)return;const P=(n,a)=>a.some(w=>n.includes(w));
 const BBQ={A5和牛:2400,戰斧牛排:1800,厚切牛排:900,牛舌:680,牛五花:580,牛肋條:620,綜合燒肉盛合:1500,豬五花:380,松阪豬:450,雞腿肉:320,蒲燒鰻魚:580,烤魷魚:320,烤蝦:420,烤干貝:480,烤蚵:350,生蠔:520,花蟹:880,三點蟹:780,紅蟳:1280,帝王蟹:3200,松葉蟹:2400,毛蟹:1800,龍蝦:2600,烤鮮魚:420,清蒸魚:480,綜合生魚片:880,海鮮鍋:980,海鮮拼盤:1380};
 for(const sid in FDS){const X=PKIDX[sid];if(!X||!X.nm)continue;X.nm.forEach((n,i)=>{if(sid=='42'&&i<14)return;let p=260,s=40,j=6,h=0,t=.6,kind='meal';
  if(sid=='34'){if(P(n,['刺身','鰻魚']))p=520,j=10;else if(P(n,['壽喜燒']))p=420,j=9;else if(P(n,['韓式','泡菜']))p=290;else if(P(n,['拉麵','烏龍','蕎麥']))p=240,s=36}
  else if(sid=='35'){if(i<16){p=180;s=34;j=8;h=2;kind='home'}else if(P(n,['蝦餃','燒賣','叉燒包','蘿蔔糕','蛋塔','豬扒包'])){p=95;s=14;j=6;t=.3;kind='dim'}else if(P(n,['燒鵝','燒肉','叉燒'])){p=320;s=38;j=8}else{p=240;s=38}}
  else if(sid=='42'){p=/A5|戰斧|活龍蝦|帝王蟹/.test(n)?1800:/和牛|松葉|紅蟳|毛蟹|拼盤|海鮮盛/.test(n)?880:/牛|蝦|蟹|蠔|干貝|鰻|鮭|鯛|鯖|香魚|豬/.test(n)?480:/啤酒|可樂|汁|飲|牛奶|拿鐵|星冰樂/.test(n)?150:/冰淇淋|布蕾|提拉米蘇/.test(n)?220:/泡菜|海帶|鵪鶉|毛豆|沾醬|白飯|味噌湯|沙拉/.test(n)?90:280;s=Math.round(Math.min(36,6+p/40));j=Math.round(6+p/120);t=.3;if(p<=150)s=Math.min(s,8)}
  else if(sid=='40'){const NP={烤魷魚:120,鹽酥雞:80,臭豆腐:70,珍奶:60,泡沫紅茶:45,大腸麵線:65,小籠包:90,炒米粉:60,棺材板:90,豆乳雞:80,QQ蛋:40,營養三明治:65,烤玉米:70,骰子牛:150,鍋燒麵:90,滷雞腳:70,滷味:120,鹹水雞:110,豆花:50,牛排:220,雞排:80,豬排:160,蒙古烤肉:220,小火鍋:180,蚵仔煎:70,章魚小丸子:60,大阪燒:90,藥膳排骨湯:90,鱔魚意麵:130,綠豆湯:40,胡椒餅:55,越南河粉:110};p=NP[n]||80;s=Math.round(Math.min(32,6+p/7));j=Math.round(5+p/40);t=.4;kind=P(n,['珍奶','紅茶','豆花','綠豆湯'])?'drink':'night';if(kind=='drink')s=Math.min(s,8),t=.2}
  else if(sid=='36'){p=BBQ[n]||480;s=Math.round(18+Math.min(30,p/60));j=Math.round(6+p/200)}
  else{if(i<24){p=P(n,['蜜糖吐司','鬆餅塔','聖代'])?220:150;s=10;j=10;t=.3;kind='sweet'}else{p=P(n,['美式'])?80:P(n,['珍珠'])?70:P(n,['冰紅茶'])?50:P(n,['奶茶'])?60:110;s=6;j=6;t=.2;kind='drink'}}
  FOODS.push({id:sid+'_'+i,sid,i,n,p,s,j,h,t,kind})})}})();
const FDI=Object.fromEntries(FOODS.map(f=>[f.id,f]));
const fdByName=n=>FOODS.find(f=>f.n==n);
const fdRange=(sid,a,b)=>FOODS.filter(f=>f.sid==sid&&f.i>=a&&f.i<=b).map(f=>f.id);
function pkSpr(sid,i,box,dark){const X=window.PKIDX&&PKIDX[sid];if(!X)return'';const r=X.r[i],s=Math.min(box/r[2],box/r[3]);
 return `<div style="width:${box}px;height:${box}px;display:flex;align-items:center;justify-content:center;flex:none"><div style="width:${r[2]}px;height:${r[3]}px;flex:none;transform:scale(${s});background:url(pk/p${sid}.webp) -${r[0]}px -${r[1]}px no-repeat;${dark?'filter:brightness(0) opacity(.28)':''}"></div></div>`}
const dexF=()=>{const D=dexS();return D.fd||(D.fd={})};
// ───────── 共用的圖片面板（菜單、圖鑑） ─────────
function picPanel(title,sub,tabs,onPick,opts={}){window.TITLE=true;window.OVL=(window.OVL||0)+1;Object.keys(keys).forEach(k=>keys[k]=0);
 const ov=document.createElement('div');ov.className='picov';let ti=opts.tab||0;
 ov.style.cssText='position:fixed;inset:0;z-index:99990;background:rgba(20,12,6,.6);display:flex;align-items:center;justify-content:center';
 const close=()=>{OVK.delete(kd);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL;if(opts.onClose)opts.onClose()};
 const kd=e=>{if(e.key=='Escape'||e.key=='c'||e.key=='C'){e.preventDefault();e.stopImmediatePropagation();close()}};
 const draw=()=>{const T0=tabs[ti];ov.innerHTML=`<div class="rpg" style="width:min(94vw,760px);max-height:90vh;display:flex;flex-direction:column;gap:8px">
  <div style="display:flex;align-items:center;gap:8px"><b class="rttl" style="font-size:17px;flex:1">${title}</b><button data-x style="font:inherit;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:6px;padding:3px 10px;cursor:pointer">✕ 關閉</button></div>
  ${sub?`<div class="rdesc" style="font-size:13px">${sub}</div>`:''}
  ${tabs.length>1?`<div style="display:flex;gap:4px;flex-wrap:wrap">${tabs.map((t,k)=>`<button data-t="${k}" style="font:inherit;font-size:13px;padding:4px 10px;border-radius:14px;border:2px solid #6b4423;cursor:pointer;background:${k==ti?'#6b4423':'#fff3d6'};color:${k==ti?'#fff6dc':'#5a3417'}">${t.n}</button>`).join('')}</div>`:''}
  ${T0.top||''}
  <div style="overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;padding:2px">${T0.items.map((it,k)=>`<div data-i="${k}" style="background:${it.lock?'#efe2c4':'#fffaf0'};border:2px solid ${it.hi?'#e8b04a':'#d9b67a'};border-radius:10px;padding:6px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:${it.lock||opts.view?'default':'pointer'};position:relative;opacity:${it.dis?.5:1}">
   ${it.badge?`<span style="position:absolute;top:3px;right:5px;font-size:12px">${it.badge}</span>`:''}${it.img}<div style="font-size:12px;font-weight:700;text-align:center;line-height:1.2;color:#3a2210">${it.n}</div>${it.s?`<div style="font-size:11px;color:#8a5a2e;text-align:center">${it.s}</div>`:''}</div>`).join('')}</div></div>`};
 ov.addEventListener('click',e=>{if(e.target===ov)return close();const x=e.target.closest('[data-x]');if(x)return close();const t=e.target.closest('[data-t]');if(t){ti=+t.dataset.t;draw();return}
  const c=e.target.closest('[data-i]');if(c&&!opts.view){const it=tabs[ti].items[+c.dataset.i];if(it.lock||it.dis)return toast(it.why||'目前不行');if(onPick(it,close,draw)===false)return}});
 draw();document.body.appendChild(ov);OVK.add(kd);return{close,draw}}
// ───────── 點餐 ─────────
const fdEff=f=>`💰${f.p.toLocaleString('en-US')}　⚡+${f.s}${f.j?' 😊+'+f.j:''}`;
function foodMenu(title,sub,groups,o={}){const D=dexF();const mk=ids=>ids.map(id=>{const f=FDI[id];if(!f)return null;const cost=o.cost?o.cost(f):f.p;return{id,f,cost,img:pkSpr(f.sid,f.i,72),n:f.n,s:`💰${cost.toLocaleString('en-US')}　⚡+${f.s}`,badge:D[id]?'✅':'🆕',dis:st.money<cost,why:'錢不夠'}}).filter(Boolean);
 picPanel(title,sub+`<br><span style="font-size:12px;opacity:.75">🆕＝還沒吃過，吃了會登錄美食圖鑑・飽足 ${Math.round(st.full||0)}/100・身上 💰${st.money.toLocaleString('en-US')}</span>`,groups.map(g=>({n:g[0],items:mk(g[1])})),(it,close)=>{const r=eatFood(it.id,{cost:it.cost,msg:o.msg,t:o.t});if(r){close();if(r!='full')setTimeout(()=>{if(o.after)o.after(it.f)},50)}return false})}
function eatFood(id,o={}){const f=FDI[id];if(!f)return;const cost=o.cost!=null?o.cost:f.p;if(st.money<cost){toast('💸 錢不夠');return}
 const fu=fullOf(f.s);if((st.full||0)+fu>100){toast('🍚 吃太飽了，等一下再吃吧（飽足 '+Math.round(st.full||0)+'/100）');return}
 st.money-=cost;fxApply({s:f.s,j:f.j,h:f.h||0});st.full=Math.min(100,(st.full||0)+fu);advance(o.t!=null?o.t:f.t);
 const D=dexF(),isNew=!D[id];if(isNew)D[id]=wkN();hud();SVDIRTY=1;dishCard(f,isNew,o.msg);fdReward();return 1}
function dishCard(f,isNew,msg){window.TITLE=true;window.OVL=(window.OVL||0)+1;const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99995;background:rgba(20,12,6,.7);display:flex;align-items:center;justify-content:center;cursor:pointer';
 ov.innerHTML=`<div class="rpg" style="width:min(86vw,340px);display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center">${isNew?'<div style="background:#e8b04a;color:#2a1608;font-weight:700;border-radius:12px;padding:2px 12px;font-size:13px">📖 新登錄美食圖鑑！</div>':''}
  <div style="animation:dcPop .45s cubic-bezier(.2,1.6,.4,1)">${pkSpr(f.sid,f.i,180)}</div><b style="font-size:19px;color:#3a2210">${f.n}</b><div style="font-size:13px;color:#8a5a2e">${FDS[f.sid]}</div>
  <div style="font-size:14px">⚡ 體力 +${f.s}${f.j?'　😊 心情 +'+f.j:''}${f.h?'　❤️ +'+f.h:''}</div>${msg?`<div style="font-size:13px;opacity:.85">${typeof msg=='function'?msg(f):msg}</div>`:''}<div style="font-size:12px;opacity:.6">點一下繼續</div></div>`;
 if(!document.getElementById('dcPopCss')){const s=document.createElement('style');s.id='dcPopCss';s.textContent='@keyframes dcPop{0%{transform:scale(.3) rotate(-8deg);opacity:0}100%{transform:none;opacity:1}}';document.head.appendChild(s)}
 document.body.appendChild(ov);const t0=performance.now();const end=e=>{if(performance.now()-t0<500)return;if(e&&e.type=='keydown')e.preventDefault();OVK.delete(end);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL};OVK.add(end);ov.addEventListener('pointerdown',end)}
function fdReward(){const D=dexF(),R=dexS();R.rw=R.rw||{};for(const sid in FDS){const all=FOODS.filter(f=>f.sid==sid);if(!R.rw['fd'+sid]&&all.length&&all.every(f=>D[f.id])){R.rw['fd'+sid]=1;st.money+=3000;fxApply({j:15});setTimeout(()=>openDlg('🏆 '+FDS[sid]+' 全部吃過了！','美食家認證！<br><br>💰 +3,000　😊 +15',[['好耶！','',closeDlg]]),1200)}}}
// ───────── 各店家 ─────────
const wrapSP=(n,fn)=>{const o=SP[n];SP[n]=function(){const r=o?o.apply(this,arguments):[];try{fn(r)}catch(e){console.error(e)}return r}};
wrapSP('咖啡店',o=>o.unshift(['🍰 甜點・飲料（看圖點餐）','蛋糕、布丁、咖啡、冰沙，共 40 種',()=>{closeDlg();foodMenu('☕ 願你平安咖啡廳','保羅：「今天想來點什麼？甜點都是早上現烤的。」',[['🍰 甜點',fdRange('37',0,23)],['☕ 飲料',fdRange('37',24,39)]])}]));
wrapSP('餐廳',o=>o.unshift(['🔥 炭烤菜單（看圖點餐）','海鮮、烤肉，共 21 種',()=>{closeDlg();foodMenu('🔥 阿香炭烤・澎湖海鮮','阿香：「今天的螃蟹很肥喔！」',[['🦀 海鮮',fdRange('36',10,27)],['🍖 烤肉',fdRange('36',7,9)]])}]));
wrapSP('家樂福',o=>o.unshift(['🍱 美食街（看圖點餐）','日式定食、韓式料理、港式茶餐廳',()=>{closeDlg();foodMenu('🍱 家樂福美食街','美食街人聲鼎沸，每一攤都在排隊。',[['🍱 日式定食',fdRange('34',0,19)],['🇰🇷 韓式',fdRange('34',24,31)],['🥟 港式茶餐廳',fdRange('35',16,31)]])}]));
// 碳佐麻里：訂位用餐時可以加點燒肉
wrapSP('碳佐麻里',o=>{if(typeof resvToday=='function'&&resvToday()&&T.hour>=17&&T.hour<23)o.splice(1,0,['🥩 加點（看圖單點）','和牛、戰斧、牛舌……',()=>{closeDlg();foodMenu('🔥 碳佐麻里・單點','主廚：「今天的 A5 和牛油花特別漂亮。」',[['🥩 燒肉',fdRange('42',14,24).concat(fdRange('42',37,37))],['🦞 海鮮',fdRange('42',25,36).concat(fdRange('42',38,41),fdRange('42',46,48))],['🍚 小菜・湯飯',fdRange('42',42,45).concat(fdRange('42',49,58),fdRange('42',63,64))],['🍨 甜點・飲料',fdRange('42',59,71)]])}])});
{const _fd=fineDine;fineDine=function(){const r=_fd.apply(this,arguments);try{const D=dexF(),pool=fdRange('42',14,24),nw=pool.filter(id=>!D[id]),pick=(nw.length?nw:pool).sort(()=>Math.random()-.5).slice(0,3);pick.forEach(id=>{if(!D[id])D[id]=wkN()});setTimeout(()=>toast('📖 套餐裡的 '+pick.map(id=>FDI[id].n).join('、')+' 登錄到美食圖鑑'),900);fdReward()}catch(e){}return r}}
// 山莊食堂（溫泉）
{const R=IN['山莊食堂'];if(R&&R.spf){const f0=R.spf.main;R.spf.main=()=>openDlg('🍱 山莊食堂・櫃檯','「今天的山菜是早上剛採的喔。」',[['🍱 山莊定食（看圖點餐）','烤魚、山豬肉、山菜、竹筍……',()=>{closeDlg();foodMenu('🍱 山莊食堂','阿桑：「吃不夠再加飯，免費！」',[['🍱 定食',[...fdRange('34',20,23),...fdRange('34',13,15)]]])}],['📋 原本的菜單','',f0],['離開','',closeDlg]])}}
// 家：自己下廚（家常菜，材料費比外食便宜）
{const _oh=openHome;openHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&opts.length>2&&!opts.some(q=>q[0]&&q[0].includes('下廚')))opts.splice(1,0,['🍳 下廚做家常菜','滷肉飯、三杯雞、番茄炒蛋……材料費比外食便宜',()=>{closeDlg();const wed=typeof yjS=='function'&&yjS().wed;foodMenu('🍳 我家廚房',wed?'家宜綁起頭髮：「今天想吃什麼？我們一起煮！」':'打開冰箱，看看今天能煮什麼。',[['🍳 家常菜',fdRange('35',0,15)]],{cost:f=>Math.round(f.p*.6),t:1,msg:wed?'兩個人一起煮，邊煮邊聊，廚房好熱鬧。':'自己煮的，吃起來特別香。',after:()=>{if(wed)try{frAdd('yijia',1,1)}catch(e){}}})}]);return od.call(this,t,d,opts,...r)};try{return _oh.apply(this,arguments)}finally{openDlg=od}}}

// 夜市：各攤改成看圖點餐（冠宏畫的夜市小吃）
{const NMF={鹽酥雞:['鹽酥雞','豆乳雞','雞排','烤魷魚','QQ蛋','烤玉米'],臭豆腐:['臭豆腐','大腸麵線','滷味','鹹水雞','滷雞腳'],珍珠奶茶:['珍奶','泡沫紅茶','豆花','綠豆湯'],牛排:['牛排','豬排','骰子牛','營養三明治','棺材板'],蒙古烤肉:['蒙古烤肉','炒米粉','鍋燒麵','胡椒餅','越南河粉'],小火鍋:['小火鍋','藥膳排骨湯','鱔魚意麵','小籠包'],蚵仔煎:['蚵仔煎','章魚小丸子','大阪燒']};
 const _nm=nmMenu;nmMenu=function(name){const L=NMF[name];if(!L||!nmOpen())return _nm.apply(this,arguments);const ids=L.map(n=>{const f=FOODS.find(x=>x.sid=='40'&&x.n==n);return f&&f.id}).filter(Boolean);
  foodMenu('🏮 '+(NMB[name]||name),(NM[name]&&NM[name].d||'')+'<br><span style="font-size:12px;opacity:.8">也可以吃整條夜市：每一攤的菜色都不一樣。</span>',[['🏮 '+name,ids],['🏮 整條夜市',FOODS.filter(x=>x.sid=='40').map(x=>x.id)]])}}
