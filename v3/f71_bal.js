/* v12.0 幻境 Online：法師改版（法杖物理普攻＋Q 魔力飛彈）、技能樹擴充（每點 5 級、Lv.12 第三天賦、Lv.15 二選一奧義）、五大屬性點（力量・智力・敏捷・幸運・體力，含閃避）、藥水分大小／比例、頭目機制 */
// ───────── 法師 ─────────
Object.assign(VWP.staff,{k:'melee',arc:1.5,rng:58,dmg:.6,cd:.48,d:'用法杖敲人（物理、傷害低）。真正的輸出靠 Q「魔力飛彈」',sk:['mbolt','heal']});
VSK.mbolt={n:'魔力飛彈',mp:6,cd:.5};
// ───────── 五大屬性 ─────────
const VSTAT={str:['💪','力量','攻擊 +2%'],int:['🧠','智力','技能傷害 +2.5%、魔力 +3%'],agi:['🦶','敏捷','閃避 +0.6%、爆擊 +0.2%'],luk:['🍀','幸運','爆擊 +0.5%、掉寶率 +2%'],vit:['❤️','體力','血量 +3%、防禦 +1.5%']};
const vrStO=()=>{const V=vrS();return V.stat||(V.stat={str:0,int:0,agi:0,luk:0,vit:0})};
const vrSt=k=>{try{return vrStO()[k]||0}catch(e){return 0}};
const vrStPts=()=>{const V=vrS(),o=vrStO();return Math.max(0,(V.lv-1)*3-Object.values(o).reduce((a,b)=>a+b,0))};
const vrIntM=()=>1+.02*vrSt('int');
const vrDodge=()=>Math.min(.4,.005*vrSt('agi')+vrTM('dodge')+vrRM('dodge'));
function vrStatView(){const V=vrS(),o=vrStO(),pts=vrStPts();
 openDlg('📊 屬性點',`每升 1 級拿 <b>3 點</b>，可以自由分配。剩餘 <b style="color:#c0392b">${pts}</b> 點<br><span style="font-size:12px">攻擊 ${vrAtk()}・血量 ${vrHP()}・魔力 ${vrMP()}・防禦 ${vrDef()}・爆擊 ${Math.round(vrCrit()*100)}%・閃避 ${Math.round(vrDodge()*100)}%・技能傷害 ×${vrIntM().toFixed(2)}</span>`,
  Object.entries(VSTAT).map(([k,s])=>[`${s[0]} ${s[1]}　<b>${o[k]}</b>`,`每點：${s[2]}`,()=>{if(vrStPts()<=0)return;o[k]++;SVDIRTY=1;vrStatView()},pts<=0])
  .concat([['＋5 加到最低的屬性','',()=>{for(let i=0;i<5&&vrStPts()>0;i++){const k=Object.keys(o).sort((a,b)=>o[a]-o[b])[0];o[k]++}SVDIRTY=1;vrStatView()},pts<=0],['🔄 重新分配（💠100）','',()=>{V.gold-=100;for(const k in o)o[k]=0;SVDIRTY=1;vrStatView()},V.gold<100],['返回','',vrLobby]]))}
// ───────── 藥水 ─────────
Object.assign(VIT.hpot,{n:'生命祕藥',d:'回復 40% 血量（比例）'});Object.assign(VIT.mpot,{n:'魔力祕藥',d:'回復 50% 魔力（比例）'});
Object.assign(VIT,{hpS:{n:'小紅藥水',pk:2,p:15,d:'回復 120 血（固定）',hp:120,sz:'小'},hpL:{n:'大紅藥水',pk:2,p:45,d:'回復 400 血（固定）',hp:400,sz:'大'},mpS:{n:'小藍藥水',pk:3,p:12,d:'回復 60 魔力（固定）',mp:60,sz:'小'},
 elixir:{n:'萬能藥',pk:3,p:220,d:'血量、魔力全滿（頭目常掉）',sz:'★'},HP:{n:'生命藥水',pk:2,v:1},MP:{n:'魔力藥水',pk:3,v:1}});
// 依照少掉的血量，挑最剛好的那瓶
function vrPick(kind,P){const V=vrS(),inv=V.inv,miss=kind=='HP'?P.mhp-P.hp:P.mmp-P.mp,c=kind=='HP'?[['hpS',120],['bread',P.mhp*.15],['hpot',P.mhp*.4],['hpL',400]]:[['mpS',60],['mpot',P.mmp*.5]];
 const have=c.filter(([k])=>inv[k]>0).sort((a,b)=>a[1]-b[1]);if(!have.length)return null;return(have.find(q=>q[1]>=miss*.7)||have[have.length-1])[0]}
const vrPotN=kind=>{const i=vrS().inv;return kind=='HP'?(i.hpS||0)+(i.hpL||0)+(i.hpot||0)+(i.bread||0):(i.mpS||0)+(i.mpot||0)};
// ───────── 技能樹擴充 ─────────
const VULT={};
{const P3={mageA:['魔力循環',r=>`魔力回復 +${15*r}%`,{mpr:.15}],mageB:['守護之心',r=>`隊友傷害 +${5*r}%`,{team:.05}],arcA:['殘影步',r=>`閃避 +${3*r}%`,{dodge:.03}],arcB:['毒師直覺',r=>`閃避 +${3*r}%`,{dodge:.03}],
  warA:['嗜血',r=>`吸血 +${2*r}%`,{ls:.02}],warB:['無形之刃',r=>`閃避 +${3*r}%`,{dodge:.03}],kniA:['岩石皮膚',r=>`防禦 +${8*r}%`,{def:.08}],kniB:['生命之泉',r=>`血量 +${6*r}%`,{hp:.06}],bardA:['快板',r=>`攻擊速度 +${6*r}%`,{aspd:.06}],bardB:['魔力和弦',r=>`魔力回復 +${15*r}%`,{mpr:.15}]};
 const U={mageA:[['storm','elec','雷霆萬鈞','⚡','全場落下七道雷，打最近的怪'],['nova','water','冰霜新星','❄️','你站的整片地面冒出冰柱，凍住上面所有怪物 3 秒（魔王會變慢）']],
  mageB:[['sanct','water','聖光庇護','✨','全隊回血 35%，你再加一層護盾'],['bless','wind','風之祝福','🍃','全隊攻擊、防禦 +30%，10 秒']],
  arcA:[['beam','elec','貫雷一線','⚡','前方一整排雷擊'],['storm','wind','暴風箭雨','🌪️','颶風箭射向最近的七隻怪']],
  arcB:[['nova','poison','劇毒爆發','☠️','身邊炸開毒霧，全部中毒'],['beam','fire','火焰箭陣','🔥','前方一整排火焰']],
  warA:[['nova','fire','爆炎旋風','🔥','身邊炸開烈焰'],['beam','fire','火龍斬','🐉','往前劈出一條火龍']],
  warB:[['beam','wind','真空斬','🌪️','往前斬出一整排真空刃'],['storm','elec','雷光劍舞','⚡','瞬間斬向最近的七隻怪']],
  kniA:[['nova','elec','雷神之錘','🔨','砸地放電，周圍怪物暈 1.5 秒'],['sanct','water','鋼鐵意志','🛡️','你得到大護盾，全隊回血']],
  kniB:[['sanct','water','神聖庇護','✨','全隊回血 35%＋你的護盾'],['bless','water','王者之盾','👑','全隊攻擊、防禦 +30%，10 秒']],
  bardA:[['storm','elec','搖滾風暴','🎸','音爆打最近的七隻怪'],['nova','fire','烈焰安可','🔥','舞台煙火在身邊炸開']],
  bardB:[['bless','wind','狂想曲','🎶','全隊攻擊、防禦 +30%，10 秒'],['sanct','water','天籟之音','🎵','全隊回血 35%＋你的護盾']]};
 for(const c in VTREE)VTREE[c].forEach(p=>{p.nodes.forEach(n=>n[2]=5);const q=P3[p.k];p.nodes.push(['p3',q[0],3,q[1],q[2],12]);
  p.ults=U[p.k].map((u,i)=>{const id='u_'+p.k+i,o={id,t:u[0],el:u[1],n:u[2],ic:u[3],d:u[4],mp:45,cd:22};VULT[id]=o;VSK[id]={n:u[2],mp:45,cd:22};return o})})}
const vrUlt=()=>{const P=vrPath();if(!P||!P.ults)return null;const T=vrTree();return T.r.ua?P.ults[0]:T.r.ub?P.ults[1]:null};
function vrTreeView(){const V=vrS(),C=vrCls(),T=vrTree(),PS=VTREE[V.cls];
 const elTxt='<span style="font-size:12px">'+Object.keys(VBEAT).map(a=>`${VEL[a][1]}剋${VEL[VBEAT[a]][1]}`).join(' ')+'　剋制 ×1.5、被剋 ×0.65</span>';
 if(!T.p){openDlg('🌳 '+C.ic+C.n+'・技能樹',(V.lv<5?`<b>Lv.5</b> 選進化方向（現在 Lv.${V.lv}）`:'選一條進化方向！之後每升一級拿 1 點技能點。')+'<br>'+elTxt,
  PS.map(p=>[`${p.ic} ${p.n}（${p.role}・${elTag(p.el)}）`,p.d+`<br>［F］<b>${p.sk.n}</b>：${p.sk.d}<br>Lv.15 奧義二選一：${p.ults.map(u=>u.ic+u.n).join(' / ')}`,()=>{T.p=p.k;T.r={sk:1};SVDIRTY=1;toast(p.ic+' 走上「'+p.n+'」之路！');vrTreeView()},V.lv<5]).concat([['返回','',vrLobby]]));return}
 const p=vrPath(),pts=vrTPts(),node=(k,n,mx,d,lv,blk)=>{const r=T.r[k]||0,can=pts>0&&r<mx&&V.lv>=(lv||0)&&!blk;return[`${r>=mx?'⭐':can?'➕':'▫️'} ${n} ${'●'.repeat(r)}${'○'.repeat(mx-r)}`,d+(lv&&V.lv<lv?`（Lv.${lv}）`:'')+(blk?'（已選另一個）':''),()=>{T.r[k]=r+1;SVDIRTY=1;vrTreeView()},!can]};
 openDlg('🌳 '+p.ic+p.n+'（'+C.n+'）',`屬性 ${elTag(p.el)}　技能點 <b style="color:#c0392b">${pts}</b>（Lv.5 以後每級 +1，Lv.20 共 16 點）<br>`+elTxt,
  [node('sk',`［F］${p.sk.n}`,5,`${p.sk.d}・每級 +30%`),...p.nodes.map(n=>node(n[0],n[1],n[2],`${n[3](T.r[n[0]]||0)||'—'} → 滿 ${n[3](n[2])}`,n[5])),node('cap','👑 '+p.cap[0],1,p.cap[1],9),
   ...p.ults.map((u,i)=>node(i?'ub':'ua',`［${vrKeyLbl('g')}］${u.ic}${u.n}`,1,`${elTag(u.el)} ${u.d}`,15,!!T.r[i?'ua':'ub'])),
   ['🔄 洗點（💠150）','',()=>{V.gold-=150;T.r={sk:1};SVDIRTY=1;vrTreeView()},V.gold<150],['🔀 換路線（💠400）','',()=>{V.gold-=400;T.p=null;T.r={};SVDIRTY=1;vrTreeView()},V.gold<400],['返回','',vrLobby]])}
// ───────── 頭目更耐打 ─────────
VMOB.boss.hits=110;VMOB.tking.hits=140;
// ───────── 掉寶：傳說還是打得到（很低），頭目機率高 ─────────
vrRollRar=function(boss){const w=boss=='elite'?[40,44,13,2.6,.4]:boss?[0,44,38,15,3]:[81,16.8,2,.18,.02];let x=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<5;i++){x-=w[i];if(x<=0)return i}return 0};
// ───────── 大廳加入「屬性」格 ─────────
{const _l=vrLobby;vrLobby=function(){_l.apply(this,arguments);try{if(!vrS().cls||!curDlg||!String(curDlg[0]).includes('幻境'))return;const o=curDlg[2],i=o.findIndex(q=>String(q[0]).includes('路線'));const n=vrStPts();o.splice(i,0,['📊 屬性'+(n?' 🔴':''),n?n+' 點可加':'力智敏幸體',vrStatView,0,1]);openDlg(curDlg[0],curDlg[1],o,0,'grid')}catch(e){console.warn(e)}}}
