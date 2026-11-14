/* v12.3 每趟闖關的戰鬥等級（1～18）：升級時技能加點＋三選一被動卡（參考吸血鬼倖存者、Hades、Brotato、LoL 的升級節奏） */
let VRUN=null;
const VRUN_MAX=18,vrRNeed=l=>14+9*l+Math.round(.9*l*l);
const VCR=[['普通','#d8d8d8'],['稀有','#4a9aff'],['史詩','#b06aff'],['傳說','#ffa02a']];
// 卡片：s＝加到哪個數值、v＝四種稀有度的數值、u＝只能拿一次、lv＝幾級以後才會出現
const VCARD=[
 {id:'atk',ic:'💪',n:'力量灌注',s:'atk',v:[.08,.12,.18,.26],d:v=>`攻擊 +${pc(v)}`},
 {id:'aspd',ic:'⚡',n:'疾風之手',s:'aspd',v:[.08,.12,.18,.25],d:v=>`攻擊速度 +${pc(v)}`},
 {id:'def',ic:'🛡️',n:'鐵皮',s:'def',v:[.10,.15,.22,.32],d:v=>`防禦 +${pc(v)}`},
 {id:'res',ic:'🔰',n:'抗性',s:'res',v:[.08,.12,.18,.25],d:v=>`抵抗 +${pc(v)}（受到的傷害減少一半的數值、被纏住／噪音的時間縮短）`},
 {id:'hp',ic:'❤️',n:'生命強化',s:'hp',v:[.10,.15,.22,.32],d:v=>`最大血量 +${pc(v)}`},
 {id:'dodge',ic:'💨',n:'殘影',s:'dodge',v:[.03,.05,.08,.12],d:v=>`閃避 +${pc(v)}`},
 {id:'regen',ic:'💗',n:'自癒',s:'regen',v:[.005,.008,.012,.018],d:v=>`每秒回復 ${(v*100).toFixed(1)}% 最大血量`},
 {id:'mp',ic:'💧',n:'魔力泉',s:'mp',v:[.12,.18,.25,.35],d:v=>`最大魔力 +${pc(v)}`},
 {id:'mpr',ic:'🔷',n:'冥想',s:'mpr',v:[.2,.3,.45,.65],d:v=>`魔力回復 +${pc(v)}`},
 {id:'xp',ic:'📚',n:'學習力',s:'xp',v:[.10,.15,.25,.35],d:v=>`戰鬥經驗 +${pc(v)}`,maxT:4},
 {id:'crit',ic:'🎯',n:'精準',s:'crit',v:[.04,.06,.09,.13],d:v=>`爆擊率 +${pc(v)}`},
 {id:'critM',ic:'💥',n:'致命一擊',s:'critM',v:[.15,.25,.4,.6],d:v=>`爆擊傷害 +${pc(v)}`},
 {id:'ls',ic:'🧛',n:'吸血',s:'ls',v:[.02,.03,.05,.07],d:v=>`吸血 +${pc(v)}`},
 {id:'spd',ic:'👟',n:'輕功',s:'spd',v:[.06,.09,.14,.2],d:v=>`移動速度 +${pc(v)}`,maxT:4},
 {id:'cdr',ic:'⏳',n:'冷卻縮減',s:'cdr',v:[.06,.09,.14,.2],d:v=>`技能冷卻 -${pc(v)}`,maxT:4},
 {id:'gold',ic:'💰',n:'招財',s:'gold',v:[.15,.25,.4,.6],d:v=>`撿到的幻境幣 +${pc(v)}`,maxT:3},
 {id:'mag',ic:'🧲',n:'磁鐵',s:'mag',v:[.4,.6,1,1.5],d:v=>`撿東西的範圍 +${pc(v)}`,maxT:3},
 {id:'team',ic:'🤝',n:'團隊精神',s:'team',v:[.08,.12,.18,.25],d:v=>`隊友傷害 +${pc(v)}`,party:1},
 // 特殊卡（只能拿一次）
 {id:'burn',ic:'🔥',n:'灼熱之刃',u:1,d:()=>'攻擊打中有 25% 機率讓怪物燒傷'},
 {id:'chain',ic:'⚡',n:'連鎖電擊',u:1,d:()=>'爆擊時觸發連鎖閃電，彈到旁邊的怪'},
 {id:'kheal',ic:'🩸',n:'嗜殺',u:1,d:()=>'每擊倒一隻怪，回復 3% 最大血量'},
 {id:'thorn',ic:'🌵',n:'荊棘',u:1,d:()=>'怪物撞到你時，反彈你攻擊力 50% 的傷害'},
 {id:'boom',ic:'💣',n:'爆裂',u:1,lv:3,d:()=>'怪物被打倒時會爆炸，傷害旁邊的怪'},
 {id:'exec',ic:'🗡️',n:'處決',u:1,d:()=>'對血量低於 25% 的怪，傷害 +40%'},
 {id:'life',ic:'👼',n:'第二條命',u:1,lv:5,rare:1,d:()=>'這趟倒下時，以 30% 血量復活一次'},
 {id:'shell',ic:'🌀',n:'迴旋護盾',u:1,d:()=>'每 8 秒得到一層 10% 血量的護盾'},
 {id:'elm',ic:'🐉',n:'屬性專精',u:1,d:()=>'屬性剋制時傷害再 +25%'},
 {id:'gamb',ic:'🎲',n:'賭徒',u:1,d:()=>'爆擊率 +12%，但防禦 -10%'},
 {id:'pot',ic:'🧪',n:'藥劑師',u:1,d:()=>'藥水回復量 +40%'},
 {id:'mom',ic:'📈',n:'越戰越勇',u:1,d:()=>'每擊倒一隻怪，攻擊 +0.3%（這趟最多 +30%）'},
 {id:'warp',ic:'⏱️',n:'時間扭曲',u:1,d:()=>'衝刺冷卻 -40%，衝刺無敵時間變長'},
 {id:'luck',ic:'✨',n:'幸運星',u:1,d:()=>'之後出現的卡片，稀有度變高'},
 {id:'reroll',ic:'🔄',n:'命運骰子',d:()=>'得到 2 次「重抽卡片」的機會',maxT:2}];
const pc=v=>Math.round(v*100)+'%';
// 路線專屬卡（用原本技能樹的天賦）
function vrPathCards(){const P=vrPath();if(!P)return[];const T=vrTree(),L=P.nodes.map(n=>({id:'tp_'+n[0],ic:VTICON[Object.keys(n[4])[0]]||'✨',n:n[1],path:1,lv:n[5]||1,mx:n[2],k:n[0],d:()=>`${P.n}專屬・${n[3]((T.r[n[0]]||0)+1)}（${(T.r[n[0]]||0)+1}/${n[2]}）`}));
 L.push({id:'tp_cap',ic:'👑',n:P.cap[0],path:1,lv:8,mx:1,k:'cap',rare:1,d:()=>`${P.n}終極天賦・${P.cap[1]}`});return L}
const vrRM=k=>{if(!VRUN)return 0;let v=VRUN.mod[k]||0;if(k=='atk'&&VRUN.flag.mom)v+=Math.min(.3,VRUN.kills*.003);if(k=='crit'&&VRUN.flag.gamb)v+=.12;if(k=='def'&&VRUN.flag.gamb)v-=.1;if(k=='elb'&&VRUN.flag.elm)v+=.25;return v};
function vrRunStart(){const T=vrTree();T.r={};VRUN={rl:1,xp:0,q:1,mod:{},flag:{},taken:{},sk:{q:1,e:0,r:0},kills:0,last:[],rr:1,lifeUsed:0}}
function vrRunEnd(){VRUN=null;try{vrTree().r={}}catch(e){}}
// 抽三張：越常拿的卡越少出現、上一輪出現過的先避開
function vrCardOffer(){const R=VRUN,party=(vrS().party||[]).length>0,pool=[];
 VCARD.forEach(c=>{const t=R.taken[c.id]||0;if(c.u&&t)return;if(c.maxT&&t>=c.maxT)return;if(c.lv&&R.rl<c.lv)return;if(c.party&&!party)return;let w=(c.u?.7:1)*Math.pow(.6,t)*(c.rare?.35:1);if(R.last.includes(c.id))w*=.15;pool.push([c,w])});
 vrPathCards().forEach(c=>{const r=vrTree().r[c.k]||0;if(r>=c.mx||R.rl<c.lv)return;let w=1.3*(c.rare?.5:1);if(R.last.includes(c.id))w*=.15;pool.push([c,w])});
 const out=[];for(let i=0;i<3&&pool.length;i++){let x=Math.random()*pool.reduce((a,b)=>a+b[1],0),j=0;for(;j<pool.length;j++){x-=pool[j][1];if(x<=0)break}j=Math.min(j,pool.length-1);const c=pool.splice(j,1)[0][0];
  const lw=R.flag.luck?[40,35,18,7]:[60,28,10,2];let y=Math.random()*100,ra=0;for(;ra<3;ra++){y-=lw[ra];if(y<=0)break}out.push({c,r:c.s?ra:(c.rare?2:1)})}
 R.last=out.map(o=>o.c.id);return out}
function vrCardApply(o){const R=VRUN,c=o.c;R.taken[c.id]=(R.taken[c.id]||0)+1;if(c.s)R.mod[c.s]=(R.mod[c.s]||0)+c.v[o.r];else if(c.path){const T=vrTree();T.r[c.k]=(T.r[c.k]||0)+1}else if(c.id=='reroll')R.rr+=2;else R.flag[c.id]=1}
// 大廳的「技能樹」改成「路線」：Lv.5 選路線，決定升級時會出現的專屬技能與卡片
function vrTreeView(){const V=vrS(),C=vrCls(),T=vrTree(),PS=VTREE[V.cls],p=vrPath();
 openDlg('🌳 '+C.ic+C.n+'・進化路線',(p?`目前路線：<b>${p.ic} ${p.n}</b>（${p.role}・${elTag(p.el)}）<br>`:(V.lv<5?`<b>Lv.5</b> 可以選路線（現在 Lv.${V.lv}）<br>`:'選一條路線！<br>'))+
  `<span style="font-size:12px">技能不再是永久點數：每次進幻境都從<b>戰鬥等級 1</b> 開始，升級時幫技能加點、從三張卡片挑一張。選了路線，升級時就會多出路線技能［${vrKeyLbl('f')}］、專屬卡和 Lv.10 的奧義［${vrKeyLbl('g')}］。</span>`,
  PS.map(q=>[`${q.k==T.p?'✅ ':''}${q.ic} ${q.n}（${q.role}・${elTag(q.el)}）`,`${q.d}<br>［${vrKeyLbl('f')}］<b>${q.sk.n}</b>：${q.sk.d}<br>專屬卡：${q.nodes.map(n=>n[1]).join('、')}、👑${q.cap[0]}<br>Lv.10 奧義二選一：${q.ults.map(u=>u.ic+u.n).join(' / ')}`,()=>{if(T.p==q.k)return;if(T.p&&V.gold<400)return toast('換路線要 💠400');if(T.p)V.gold-=400;T.p=q.k;T.r={};SVDIRTY=1;toast(q.ic+' 走上「'+q.n+'」之路！');vrTreeView()},V.lv<5||(T.p&&T.p!=q.k&&V.gold<400)]).concat([['返回','',vrLobby]]))}
