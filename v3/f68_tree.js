/* v11.5 幻境 Online：技能樹（每個職業兩條進化路線，Lv.5 選擇）＋五屬性相剋（電→水→火→風→毒→電） */
const VEL={elec:['電','⚡','#ffe04a'],water:['水','💧','#4aa8ff'],fire:['火','🔥','#ff6a2a'],wind:['風','🌪️','#7affc0'],poison:['毒','☠️','#b06ae0']};
const VBEAT={elec:'water',water:'fire',fire:'wind',wind:'poison',poison:'elec'};
const VBEATW={elec:'水會導電',water:'水能澆熄火',fire:'烈火吞噬風',wind:'風吹散毒霧',poison:'毒會腐蝕電路'};
function vrElMul(a,d,bonus){if(!a||!d)return 1;if(VBEAT[a]==d)return 1.5+(bonus||0);if(VBEAT[d]==a)return .65;if(a==d)return .75;return 1}
const elTag=e=>e?`<span style="color:${VEL[e][2]}">${VEL[e][1]}${VEL[e][0]}</span>`:'';
// 怪物屬性
VMOB.slime.el='water';VMOB.wolf.el='wind';VMOB.shroom.el='poison';VMOB.boss.el='water';
for(const k in VMOB)VMOB[k].d+=`（屬性：${VEL[VMOB[k].el][1]}${VEL[VMOB[k].el][0]}，怕${VEL[Object.keys(VBEAT).find(x=>VBEAT[x]==VMOB[k].el)][0]}）`;
VMOB.slime.d+='　2 層以後會出現🔥火焰史萊姆、⚡雷電史萊姆。';
// 隊友屬性
const VPAL_EL={yijia:'water',bokai:'elec',yuhao:'wind',rita:'fire',paul:'water',lao8:'poison',zhuyang:'elec',yilun:'wind'};
// ───────── 技能樹 ─────────
// 節點：[key, 名稱, 最高等級, 說明(r), {屬性:每級加成}]；sk＝路線技能（選路線就送 1 級）；cap＝終極天賦（Lv.9）
const VTREE={
 mage:[{k:'mageA',n:'烈焰大魔導',role:'攻擊',el:'fire',ic:'☄️',d:'把魔力全部拿來轟炸。範圍大、傷害高，站後排把怪燒光。',
   sk:{id:'firestorm',n:'烈焰風暴',mp:22,cd:7,d:'在滑鼠指的地方降下大範圍火焰風暴，1.6 秒內連續灼燒（可以打很遠、打天上的怪）'},
   nodes:[['p1','法術精通',3,r=>`攻擊 +${8*r}%`,{atk:.08}],['p2','元素共鳴',3,r=>`屬性剋制時傷害再 +${15*r}%`,{elb:.15}]],
   cap:['隕石天降','R 變成「隕石術」：三顆隕石砸下，超大範圍火屬性傷害'],capR:'meteor'},
  {k:'mageB',n:'聖光祭司',role:'輔助',el:'water',ic:'💧',d:'專心照顧隊友。補血、回魔、還能把倒下的人拉起來。',
   sk:{id:'spring',n:'治癒之泉',mp:26,cd:13,d:'在滑鼠指的地方（或腳下）湧出泉水 5 秒：範圍內的自己人持續回血，怪物變慢'},
   nodes:[['p1','祝福之手',3,r=>`所有治療量 +${15*r}%`,{heal:.15}],['p2','魔力湧泉',3,r=>`魔力回復 +${20*r}%`,{mpr:.2}]],
   cap:['天使降臨','R 變成「聖光復活」：救活倒下的隊友、全隊回血 50%、2 秒無敵'],capR:'revive'}],
 archer:[{k:'arcA',n:'雷光狙擊手',role:'攻擊',el:'elec',ic:'⚡',d:'一箭一個。爆擊、貫穿、連鎖閃電，遠遠的把怪點掉。',
   sk:{id:'railshot',n:'雷光貫穿箭',mp:16,cd:5,d:'射出一支貫穿全部敵人的雷光箭'},
   nodes:[['p1','致命瞄準',3,r=>`爆擊傷害 +${15*r}%`,{critM:.15}],['p2','鷹之眼',3,r=>`爆擊率 +${4*r}%`,{crit:.04}]],
   cap:['雷神之箭','鷹眼期間：所有箭都會貫穿，而且每一箭都觸發連鎖閃電']},
  {k:'arcB',n:'毒霧陷阱師',role:'控場',el:'poison',ic:'☠️',d:'不跟你硬碰硬。放毒、放慢、讓怪物自己爛掉。',
   sk:{id:'toxic',n:'劇毒迷霧',mp:18,cd:9,d:'在前方丟出毒霧 4.5 秒：怪物中毒、變慢'},
   nodes:[['p1','劇毒調配',3,r=>`中毒傷害 +${30*r}%`,{psn:.3}],['p2','輕盈步伐',3,r=>`移動速度 +${6*r}%、翻滾冷卻 -${10*r}%`,{spd:.06,rollcd:.1}]],
   cap:['瘟疫爆發','中毒的怪物死掉時會爆炸，把毒傳染給旁邊的怪']}],
 warrior:[{k:'warA',n:'狂戰士',role:'爆發',el:'fire',ic:'🔥',d:'血越少越兇。開大之後誰都擋不住。',
   sk:{id:'flameslash',n:'烈焰斬',mp:16,cd:6,d:'一刀劈出大範圍火焰，擊退並灼燒敵人'},
   nodes:[['p1','蠻力',3,r=>`攻擊 +${6*r}%`,{atk:.06}],['p2','背水一戰',3,r=>`血量低於一半時傷害 +${12*r}%`,{low:.12}]],
   cap:['不死狂怒','狂怒延長到 12 秒，期間血量不會低於 1']},
  {k:'warB',n:'疾風劍聖',role:'連擊',el:'wind',ic:'🌪️',d:'快到看不見。在怪物之間來回穿梭砍。',
   sk:{id:'gale',n:'疾風連斬',mp:18,cd:7,d:'連續三次瞬移斬向最近的敵人'},
   nodes:[['p1','疾如風',3,r=>`攻擊速度 +${10*r}%`,{aspd:.1}],['p2','見切',3,r=>`爆擊率 +${4*r}%`,{crit:.04}]],
   cap:['萬劍歸宗','R 變成「萬劍歸宗」：4 秒內劍氣在身邊狂轉'],capR:'bladestorm'}],
 knight:[{k:'kniA',n:'雷霆巨人',role:'攻擊坦',el:'elec',ic:'🗿',d:'變！大！巨大化之後攻擊範圍變大、擊退超遠、受到傷害減少。',
   sk:{id:'giant',n:'巨大化',mp:30,cd:20,d:'變成兩倍大 8 秒：攻擊 +40%、範圍 +60%、受傷 -30%，落地時雷霆震地'},
   nodes:[['p1','鐵壁',3,r=>`血量 +${8*r}%`,{hp:.08}],['p2','雷霆踩踏',3,r=>`巨大化時每秒震地，造成 ${60*r}% 傷害`,{}]],
   cap:['泰坦覺醒','巨大化多 4 秒，變回來時召喚一圈落雷']},
  {k:'kniB',n:'聖騎士',role:'守護',el:'water',ic:'🛡️',d:'隊伍的盾牌。光環減傷、格擋回血，讓大家都不會倒。',
   sk:{id:'aura',n:'守護光環',mp:24,cd:15,d:'身邊展開光環 6 秒：範圍內自己人受傷 -35%、慢慢回血'},
   nodes:[['p1','堅守',3,r=>`格擋率 +${4*r}%`,{block:.04}],['p2','神聖反擊',3,r=>`格擋時回血 ${4*r}%`,{}]],
   cap:['聖域','聖盾時全隊回血 30%，並自動展開守護光環']}],
 bard:[{k:'bardA',n:'搖滾狂人',role:'攻擊',el:'elec',ic:'🎸',d:'把魯特琴插上電。音波就是武器。',
   sk:{id:'solo',n:'電吉他獨奏',mp:22,cd:9,d:'2.4 秒內連續放出電流音波，震飛身邊的怪'},
   nodes:[['p1','重低音',3,r=>`攻擊 +${6*r}%`,{atk:.06}],['p2','舞台魅力',3,r=>`爆擊率 +${4*r}%`,{crit:.04}]],
   cap:['世界巡迴','頌歌期間，每次普攻射出三個音符']},
  {k:'bardB',n:'風之詩人',role:'輔助',el:'wind',ic:'🍃',d:'歌聲隨風傳出去，全隊回血、加速、變強。',
   sk:{id:'breeze',n:'治癒之風',mp:24,cd:11,d:'全隊回血 18%，你加速 5 秒'},
   nodes:[['p1','溫柔歌聲',3,r=>`所有治療量 +${15*r}%`,{heal:.15}],['p2','和聲共鳴',3,r=>`隊友傷害 +${5*r}%`,{team:.05}]],
   cap:['安可！','頌歌持續 20 秒，唱的時候全隊回血 25%']}]};
// 路線技能、終極技能
Object.assign(VSK,{meteor:{n:'隕石術',mp:45,cd:26},revive:{n:'聖光復活',mp:50,cd:40},bladestorm:{n:'萬劍歸宗',mp:40,cd:24}});
for(const c in VTREE)VTREE[c].forEach(p=>VSK[p.sk.id]={n:p.sk.n,mp:p.sk.mp,cd:p.sk.cd});
const vrTree=()=>{const V=vrS();V.tree=V.tree||{};const c=V.cls||'warrior';return V.tree[c]||(V.tree[c]={p:null,r:{}})};
const vrPath=()=>{const T=vrTree();return T.p?VTREE[vrS().cls||'warrior'].find(p=>p.k==T.p):null};
const vrTR=k=>{const T=vrTree();return T.p?(T.r[k]||0):0};
function vrTM(stat){const P=vrPath();if(!P)return 0;let s=0;P.nodes.forEach(n=>{if(n[4][stat])s+=n[4][stat]*vrTR(n[0])});return s}
const vrTPts=()=>0;
function vrTreeView(){const V=vrS(),C=vrCls(),T=vrTree(),PS=VTREE[V.cls];
 const elTxt='<span style="font-size:12px">屬性相剋：'+Object.keys(VBEAT).map(a=>`${VEL[a][1]}${VEL[a][0]}剋${VEL[VBEAT[a]][1]}${VEL[VBEAT[a]][0]}`).join('・')+'　剋制 ×1.5、被剋 ×0.65</span>';
 if(!T.p){openDlg('🌳 '+C.ic+C.n+'・技能樹',(V.lv<5?`<b>Lv.5</b> 可以選擇進化方向（現在 Lv.${V.lv}）。先看看兩條路：`:'選一條進化方向！之後每升一級拿 1 點技能點。（可以花幻境幣換路線）')+'<br>'+elTxt,
  PS.map(p=>[`${p.ic} ${p.n}（${p.role}・${elTag(p.el)}）`,p.d+`<br>🌟 路線技能［F］<b>${p.sk.n}</b>：${p.sk.d}<br>`+p.nodes.map(n=>`・${n[1]}：${n[3](3)}`).join('<br>')+`<br>👑 Lv.9 <b>${p.cap[0]}</b>：${p.cap[1]}`,()=>{T.p=p.k;T.r={sk:1};SVDIRTY=1;toast(p.ic+' 走上「'+p.n+'」之路！');vrTreeView()},V.lv<5]).concat([['返回','',vrLobby]]));return}
 const p=vrPath(),pts=vrTPts(),node=(k,n,mx,d,lv)=>{const r=T.r[k]||0,can=pts>0&&r<mx&&V.lv>=(lv||0);return[`${r>=mx?'⭐':can?'➕':'▫️'} ${n}　${'●'.repeat(r)}${'○'.repeat(mx-r)}`,d+(lv&&V.lv<lv?`（Lv.${lv} 解鎖）`:''),()=>{T.r[k]=r+1;SVDIRTY=1;vrTreeView()},!can]};
 openDlg('🌳 '+p.ic+p.n+'（'+C.n+'・'+p.role+'）',`屬性 ${elTag(p.el)}　技能點 <b>${pts}</b>（Lv.5 以後每級 +1）<br><span style="font-size:12px">普攻和路線技能都帶${elTag(p.el)}屬性。${VEL[p.el][0]}剋${VEL[VBEAT[p.el]][0]}（${VBEATW[p.el]}）</span><br>`+elTxt,
  [node('sk',`［F］${p.sk.n}`,3,`${p.sk.d}・每級傷害／效果 +30%（目前 Lv.${T.r.sk||1}）`),...p.nodes.map(n=>node(n[0],n[1],n[2],`目前：${n[3](T.r[n[0]]||0)}・滿級：${n[3](n[2])}`)),node('cap','👑 '+p.cap[0],1,p.cap[1],9),
   ['🔄 洗點（💠150）','技能點全部拿回來重新分配',()=>{V.gold-=150;T.r={sk:1};SVDIRTY=1;vrTreeView()},V.gold<150],
   ['🔀 改走另一條路（💠400）','換成「'+PS.find(q=>q.k!=p.k).n+'」，技能點重來',()=>{V.gold-=400;T.p=null;T.r={};SVDIRTY=1;vrTreeView()},V.gold<400],['返回','',vrLobby]])}
// 大廳加入入口
{const _vl=vrLobby;vrLobby=function(){_vl.apply(this,arguments);try{const V=vrS();if(!V.cls||!document.getElementById('dbox'))return;const T=vrTree(),pts=vrTPts(),box=dbox,bs=[...box.querySelectorAll('button')];const ref=bs.find(b=>b.textContent.includes('裝備與背包'));if(!ref)return;
 const b=ref.cloneNode(true),hot=(!T.p&&V.lv>=5)||pts>0;b.innerHTML=`<b>🌳 技能樹</b>${hot?' <span style="color:#ff5a8a">●NEW</span>':''}<br><span style="font-size:12px;opacity:.8">${T.p?vrPath().ic+' '+vrPath().n+'・剩 '+pts+' 點':V.lv>=5?'可以選擇進化方向了！':'Lv.5 選擇進化方向'}</span>`;b.disabled=false;b.onclick=e=>{e.stopPropagation();vrTreeView()};ref.parentNode.insertBefore(b,ref)}catch(e){console.warn(e)}}}
// 巨大化台詞
{const GL={allen:['變！大！！','我現在是巨人了！誰敢過來！','看我一腳踩扁你們！','部隊沒教這招，這是天生的！'],
 yijia:['老公你變好大一隻！','哇……我老公是巨人！','小心不要踩到我啦！'],bokai:['欸！Allen 你吃了什麼！','這身高打籃球無敵了吧！','禹豪你看，這才叫禁區霸主！'],
 yuhao:['我的天……頌言看到一定會尖叫！','老哥你這樣射不到我吧？','我要拍照傳給媛媛！'],rita:['這是吃了幾碗牛肉湯！','好大！可以幫我拿高處的東西嗎！'],
 paul:['……我需要一杯更大的咖啡。','體型，決定一切。'],lao8:['老哥！你終於比我高了！','哇靠！我第一次要抬頭看人！','老哥你這樣進不了我家門啦！'],
 zhuyang:['這音量……要調大了！','巨人登場！BGM 下！'],yilun:['歌利亞！？不對，是我們這邊的！','大衛與歌利亞……這次我們是歌利亞！']};
 for(const k in GL)if(VLINE[k])VLINE[k].giant=GL[k]}
// 遊藝場室內：網咖電腦區改成「VR 體感館」互動點（新版室內每台機器都有自己的互動點，原本的總選單進不去）
{const R=IN['遊藝場'];if(R){R.sp=(R.sp||[]).filter(s=>s[0]!='vr');R.sp.push(['vr',212,98,58,12]);(R.ppl||[]).forEach(o=>{if(o.n=='玩家'&&o.x==250){o.x=292;o.y=100}});R.spf=R.spf||{};R.spl=R.spl||{};R.spl.vr='🥽 VR 體感館';
 R.spf.vr=()=>{const it=SP['遊藝場']().find(o=>String(o[0]).includes('幻境'));if(it){const tired=st.sta<15,poor=st.money<300;openDlg('🥽 VR 體感館','一排電腦旁邊擺著幾台全身體感 VR 設備，螢幕上寫著<b>「幻境 Online」</b>。<br>'+(tired?`<b style="color:#c0392b">😫 體力只剩 ${Math.round(st.sta)}，全身體感很累，至少要 15 才能玩。</b><br>先回家睡一覺、吃點東西補體力再來吧！`:poor?'<b style="color:#c0392b">💰 錢不夠，一次要 300。</b>':`<span style="font-size:12px">💰 ${st.money}・體力 ${Math.round(st.sta)}（玩一次 💰300、體力 -10）</span>`),[[it[0],tired?'😫 體力不足（需要 15）':poor?'💰 錢不夠':it[1],it[2],tired||poor],['算了','',closeDlg]])}};R.built=0}}

// 讀上帝模式存檔後，遊藝場一定要有 VR 互動點（舊存檔沒有）
{const _a=gzApply;gzApply=function(m){_a(m);try{const R=IN['遊藝場'];if(R&&!(R.sp||[]).some(s=>s[0]=='vr'))R.sp=(R.sp||[]).concat([['vr',212,98,58,12]])}catch(e){}}}
// ───────── 上帝模式（室內）：NPC 也可以拖曳、隱藏 ─────────
for(const n in IN){const R=IN[n];(R.ppl||[]).forEach((o,i)=>{if(!o._nk&&!o.fr){o._nk=o.n+'#'+i;o._o=[o.x,o.y]}})}
function npApply(R){if(!R||!R.ppl)return;R.ppl.forEach(o=>{if(!o._nk)return;const q=R._np&&R._np[o._nk];const v=q?(q[2]?[-900,-900]:q):o._o;o.x=o.hx=v[0];o.y=o.hy=v[1];o._tx=o._ty=undefined;o.mv=false})}
function npPick(x,y){return(rm.ppl||[]).filter(o=>o._nk&&o.x>-500&&x>=o.x-6&&x<=o.x+18&&y>=o.y-30&&y<=o.y+12).sort((a,b)=>b.y-a.y)[0]||null}
{const _d=gzRDown;gzRDown=function(x,y,pan){if(ED.tool=='sel'){const o=npPick(x,y);if(o){ED.npSel=o;ED.sel=null;ED.drag={m:'npmove',o,ox:x-o.x,oy:y-o.y};gzRefresh();return}}ED.npSel=null;return _d(x,y,pan)}}
{const _m=gzRMove;gzRMove=function(d,x,y){if(d.m=='npmove'){d.o.x=d.o.hx=Math.round(x-d.ox);d.o.y=d.o.hy=Math.round(y-d.oy);return}return _m(d,x,y)}}
{const _u=gzRUp;gzRUp=function(d){if(d.m=='npmove'){const R=IN[ED.room];R._np=R._np||{};R._np[d.o._nk]=[d.o.x,d.o.y,0];ROOMED.add(ED.room);ED.dirty=1;gzRefresh();return}return _u(d)}}
{const _s=gzRSelUI;gzRSelUI=function(){const o=ED.npSel;if(o&&ED.tool=='sel'){const box=$e('gzSel');box.style.display='flex';box.innerHTML=`<b>🧑 ${o.n}</b><span style="opacity:.75">拖曳移動位置</span><button data-s="nphide">🙈 隱藏</button><button data-s="npback">↺ 回原位</button><button data-s="x">✕</button>`;return}return _s()}}
{const _a=gzRSelAct;gzRSelAct=function(a){const o=ED.npSel;if(o){const R=IN[ED.room];R._np=R._np||{};if(a=='x'){ED.npSel=null;return gzRefresh()}
 if(a=='nphide'){R._np[o._nk]=[o.x,o.y,1];npApply(R);ED.npSel=null;toast('🙈 '+o.n+' 隱藏了（「重設」可以找回來）')}if(a=='npback'){delete R._np[o._nk];npApply(R)}ROOMED.add(ED.room);ED.dirty=1;return gzRefresh()}return _a(a)}}
{const _f=gzRFrame;gzRFrame=function(now){const r=_f.apply(this,arguments);try{if(!rm||!rm.ppl)return r;const z=ED.z,lw=1/z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);
 rm.ppl.forEach(o=>{if(o.x<-500)return;const mv=!!o._nk,sel=ED.npSel===o;g.fillStyle=mv?'rgba(255,120,190,.35)':'rgba(160,160,160,.25)';g.beginPath();g.ellipse(o.x+6,o.y-8,9,16,0,0,7);g.fill();g.strokeStyle=sel?'#ffd84a':mv?'#ff78be':'#999';g.lineWidth=(sel?2.5:1.2)*lw;g.stroke();
  g.font='bold 7px sans-serif';g.textAlign='center';g.fillStyle=sel?'#ffd84a':'#fff';g.fillText('🧑'+o.n,o.x+6,o.y-27)});g.restore()}catch(e){}return r}}
{const _s=gzSerialize;gzSerialize=function(){const m=_s();for(const n in IN){const R=IN[n];if(R._np&&Object.keys(R._np).length){m.rooms=m.rooms||{};if(!m.rooms[n])m.rooms[n]={fur:R.fur,sp:R.sp||[],fl:R._efl||{}};m.rooms[n].np=R._np}}return m}}
{const _a=gzApply;gzApply=function(m){_a(m);try{if(m&&m.rooms)for(const n in m.rooms){const R=IN[n];if(R&&m.rooms[n].np){R._np=JSON.parse(JSON.stringify(m.rooms[n].np));npApply(R)}}}catch(e){}}}
{const _r=gzReset;gzReset=function(){_r();for(const n in IN){if(IN[n]._np){IN[n]._np={};npApply(IN[n])}}}}
{const _e=enterB;enterB=function(z){const r=_e.apply(this,arguments);try{if(rm&&rm._np)npApply(rm)}catch(e){}return r}}
