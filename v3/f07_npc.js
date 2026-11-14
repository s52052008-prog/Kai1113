/* ===== v9：居民、路人、運動中的人、動物 ===== */
const NP=[];
let NPID=0;
const mkNP=o=>{const n={w:12,h:8,vx:0,vy:0,tm:Math.random()*2,fr:0,dir:0,mv:false,sp:20,at:0,L:[],id:NPID++,ph0:Math.random()*6,...o};NP.push(n);return n};
const dirOf=(dx,dy)=>!dx&&!dy?0:Math.abs(dx)>Math.abs(dy)*2.2?(dx<0?2:3):Math.abs(dy)>Math.abs(dx)*2.2?(dy>0?0:1):dy>0?(dx<0?4:5):(dx<0?6:7);
// ── 具名居民 ──
mkNP({n:'里長阿榮',q:0,c:'#7b5e3b',hair:'#e8e8e8',x:300,y:312,r:[250,308,330,20],mode:'h',L:['年輕人，日子要靠自己打拚。','聽說機車行最近缺人手。','賺錢不是壞事，但別忘了休息。']});
mkNP({n:'貓奶奶',q:1,c:'#8a5aa8',hair:'#cfcfcf',x:120,y:704,r:[30,700,300,14],mode:'h',L:['我家的貓昨天又偷吃魚了。','有毛孩子在身邊，家才像家。']});
mkNP({n:'小花',q:2,c:'#e0679a',hair:'#6b3a1a',x:600,y:704,r:[560,700,100,14],mode:'h',L:['書局新到了好多書喔！','你知道嗎？我喜歡聰明的人。']});
mkNP({n:'神秘老頭',shop:1,c:'#2a8a8a',hair:'#222',hat:'#d9b45a',x:920,y:920,r:[830,914,360,24],mode:'h',vis:[[15.5,24]],L:['來看看！貨比三家不吃虧！']});
mkNP({n:'阿寶',kid:1,c:'#f0b030',hair:'#2b1d14',x:520,y:276,r:[450,268,200,30],mode:'a',sp:26,L:['我長大要當冒險家！','你有看到我的球嗎？']});
mkNP({n:'農夫伯',c:'#4a7a3a',hair:'#bbb',hat:'#d9b45a',x:1380,y:1004,r:[1340,1002,200,14],mode:'h',L:['今年的南瓜長得特別好。','天氣好，種什麼都開心。']});
mkNP({n:'牧場阿姨',c:'#d9452f',hair:'#6b3a1a',x:1590,y:954,r:[1580,950,140,24],mode:'h',vis:[[9,18]],L:['歡迎來到休閒農場！','買杯鮮乳再走吧，冰的好喝喔。']});
mkNP({n:'旺財',t:'dog',c:'#b9803c',x:870,y:70,r:[815,34,200,130],mode:'a'});
mkNP({n:'咪咪',t:'cat',c:'#e8a45a',x:60,y:700,r:[30,698,120,12],mode:'a'});
// 交通警察（路口指揮）與派出所門口
mkNP({n:'交通警察 林警員',cop:1,pose:'dir',still:1,c:'#2a4a8a',x:664,y:316,dir:5,L:['注意交通安全，綠燈再走！','路口車多，請走斑馬線。','晚上偶爾會有人飆車，要小心喔。']});
mkNP({n:'值班員警 張警員',cop:1,still:1,x:1396,y:272,dir:0,L:['派出所二十四小時為您服務。','需要報案可以進去櫃檯。']});
mkNP({n:'巡邏員警 陳警員',cop:1,x:1360,y:688,r:[1330,706,260,12],mode:'h',sp:18,L:['我正在巡邏，有事請找我。','最近治安良好。']});
// 其他生活角色（有個性的固定位置）
mkNP({n:'廟祝 王伯',x:1112,y:290,pose:'sweep',still:1,dir:3,L:['拜拜要心誠，不在香多。','求籤的話，進去廟裡問神明吧。'],lk:genLook('elder',77).lk});
mkNP({n:'導護老師 吳老師',x:500,y:304,pose:'wave',still:1,dir:0,vis:[[6.5,8.5],[15.5,17.5]],L:['同學們走路要看左右來車！','早安，請小心過馬路。']});
// 活動人群
const FLD=FIELD;
const KEEPACT=new Set([200,300,402,500,503,505,510,520,555]);
function mkAct(kind,seed,o){const g2=genLook(kind,seed),n=mkNP({n:g2.name,lk:g2.lk,role:g2.role,...o});if(!KEEPACT.has(seed)&&!(seed>=600&&seed<608)){const i=NP.indexOf(n);if(i>=0)NP.splice(i,1)}return n}
// 太極拳（清晨與傍晚）
[[136,201],[157,201],[178,201],[199,201],[146,213],[167,213],[188,213]].forEach((q,i)=>mkAct('elder',100+i,{x:q[0],y:q[1],pose:'tc',still:1,dir:0,vis:[[5.5,9],[16,19]],ph0:0}));
// 田徑：外圈跑者
[[0,1,46],[1.6,1,40],[3.0,-1,44],[4.2,-1,52],[5.0,1,58]].forEach((q,i)=>mkAct('jogger',200+i,{b:'loop',cx:FLD.cx,cy:FLD.cy,rx:128,ry:87,th:q[0],om:q[1]*q[2]/127,pose:'run',vis:[[5.5,21]],sp:q[2]}));
// 內圈健走的阿公阿嬤
[[0.5,1,14],[2.2,1,12],[3.9,-1,13],[5.3,-1,12]].forEach((q,i)=>mkAct('elder',300+i,{b:'loop',cx:FLD.cx,cy:FLD.cy,rx:124,ry:82,th:q[0],om:q[1]*q[2]/96,vis:[[5.5,20]],sp:q[2]}));
// 場中運動：伸展、跳繩、深蹲、啞鈴
mkAct('jogger',401,{x:84,y:118,pose:'stretch',still:1,dir:0,vis:[[6,20]]});mkAct('jogger',402,{x:268,y:176,pose:'rope',still:1,dir:0,vis:[[6,20]]});mkAct('jogger',403,{x:86,y:174,pose:'squat',still:1,dir:0,vis:[[6,20]]});mkAct('jogger',404,{x:266,y:112,pose:'lift',still:1,dir:0,vis:[[6,20]]});mkAct('elder',405,{x:262,y:150,pose:'stretch',still:1,dir:0,vis:[[5.5,19]]});
for(let i=0;i<6;i++)mkAct(i%2?'student':'kid',410+i,{x:130+i*14,y:120+(i%3)*16,b:'wander',r:[108,102,134,82],mode:'a',sp:34,vis:[[7,18]]});
// 籃球場：打球的人
for(let i=0;i<6;i++)mkAct(i%2?'student':'jogger',420+i,{x:336+(i%3)*18,y:80+i*22,b:'wander',r:[332,72,56,150],mode:'a',sp:38,vis:[[7,21]]});
// 單槓：引體向上

// 公園：下棋、長椅、孩童、遊客
mkAct('elder',500,{x:852,y:98,sit:1,dir:3,pose:'chat',still:1,vis:[[7,21]]});mkAct('elder',501,{x:872,y:98,sit:1,dir:2,still:1,vis:[[7,21]]});mkAct('elder',502,{x:884,y:112,dir:2,still:1,vis:[[7,21]]});
mkAct('elder',503,{x:868,y:162,sit:1,dir:0,pose:'read',still:1,vis:[[6,20]]});mkAct('office',504,{x:1002,y:162,sit:1,dir:0,still:1,vis:[[11,14],[17,20]]});mkAct('student',505,{x:832,y:246,sit:1,dir:0,still:1,vis:[[15.5,20]]});
[[990,60],[1010,90],[978,110]].forEach((q,i)=>mkAct('kid',510+i,{x:q[0],y:q[1],b:'wander',r:[PARK.x+PARK.w-76,PARK.y+34,70,100],mode:'a',sp:28,vis:[[8,19]]}));
mkAct('tourist',520,{x:944,y:176,pose:'chat',still:1,dir:1,vis:[[8,20]]});mkAct('tourist',521,{x:905,y:176,pose:'chat',still:1,dir:3,vis:[[8,20]]});
// 學校前、公車亭
[[470,282],[600,284],[540,292]].forEach((q,i)=>mkAct('student',530+i,{x:q[0],y:q[1],b:'wander',r:[452,270,190,34],mode:'a',sp:24,vis:[[6.5,18]]}));
[[598,300],[612,302]].forEach((q,i)=>mkAct('office',540+i,{x:q[0],y:q[1],still:1,dir:i?2:3,pose:'chat',vis:[[6,23]]}));[[1096,452],[1110,454]].forEach((q,i)=>mkAct('student',545+i,{x:q[0],y:q[1],still:1,dir:i?3:2,vis:[[6,23]]}));
// 咖啡店露天座、餐廳門口
mkAct('office',550,{x:446,y:670,sit:1,dir:3,pose:'read',still:1,vis:[[8,21]]});mkAct('tourist',551,{x:514,y:672,sit:1,dir:2,still:1,vis:[[8,21]]});mkAct('office',552,{x:1500,y:678,sit:1,dir:3,still:1,vis:[[17,24]]});
// 廟前信眾
mkAct('elder',555,{x:1120,y:300,pose:'wave',still:1,dir:1,vis:[[6,20]]});
// 夜市：攤販與逛街民眾
BD.filter(b=>b.st=='stall').forEach((b,i)=>mkAct(i%2?'worker':'elder',600+i,{x:b.x+b.w/2-6,y:b.y+34,pose:'chat',still:1,dir:0,vis:[[16,24]],noUm:1,lk:(()=>{const q=genLook(i%2?'office':'elder',600+i).lk;q.ou='a';q.ac='';q.ht=0;return q})()}));
for(let i=0;i<7;i++)mkAct(['tourist','office','student','kid','casual','casual','elder'][i],640+i,{x:840+i*48,y:918+(i%2)*12,b:'wander',r:[826,912,366,32],mode:'h',sp:16+i%3*4,vis:[[16.5,24]]});
// 休閒農場：遊客與工人
for(let i=0;i<5;i++)mkAct(['tourist','tourist','kid','casual','tourist'][i],700+i,{x:1400+i*40,y:1002+(i%2)*10,b:'wander',r:[1330,1000,420,16],mode:'h',sp:14+i*2,vis:[[9,18]]});
mkAct('worker',710,{x:1490,y:996,b:'wander',r:[1480,994,20,12],mode:'a',sp:10,vis:[[8,18]]});
// 動物
[[1590,1050],[1612,1064],[1636,1046],[1600,1076],[1650,1074]].forEach((q,i)=>mkNP({n:i<3?'雞':'鴨',t:i<3?'chicken':'duck',c:['#f4efe0','#d9a050','#fff'][i%3],x:q[0],y:q[1],r:[COOP.x+4,COOP.y+4,COOP.w-10,COOP.h-12],mode:'a',sp:12}));
[[1722,1030],[1744,1070],[1730,1110]].forEach((q,i)=>mkNP({n:'羊咩咩',t:'sheep',c:'#f4f2ea',x:q[0],y:q[1],r:[SHEEP.x+2,SHEEP.y+4,SHEEP.w-14,SHEEP.h-12],mode:'a',sp:10}));
// ── 街上行走的路人（沿人行道網路） ──
const GN=new Map();
const gnode=(x,y)=>{const k=x+','+y;let n=GN.get(k);if(!n){n={x,y,nb:[],k};GN.set(k,n)}return n};
const glink=(a,b,cross,ax)=>{a.nb.push({n:b,cross,ax});b.nb.push({n:a,cross,ax})};
{const hy=[],vx=[];HRD.forEach(h=>{hy.push(h.y-SWK/2,h.y+h.h+SWK/2)});VRD.forEach(v=>{vx.push(v.x-SWK/2,v.x+v.w+SWK/2)});
 const xe={},ye={};hy.forEach(y=>xe[y]=new Set([20,WW-20,...vx]));vx.forEach(x=>ye[x]=new Set([20,WH-20,...hy]));
 const dn=[];B.forEach(b=>{const dx=b.x+b.dx;let sy=null;if(b.bot==262)sy=hy[0];else if(b.bot==640)sy=hy[2];else if(b.bot==990)sy=1004;if(sy==null)return;dn.push({b,dx,sy});if(sy!=1004)xe[sy].add(dx)});
 xe[hy[1]].add(407);xe[hy[2]].add(407);xe[hy[3]].add(453);xe[hy[0]].add(210);xe[hy[0]].add(927);xe[hy[3]].add(1005);xe[hy[3]].add(1443);
 hy.forEach(y=>{const xs=[...xe[y]].sort((a,b)=>a-b);for(let i=0;i<xs.length-1;i++){const a=xs[i],b=xs[i+1],v=VRD.find(v=>a==v.x-SWK/2&&b==v.x+v.w+SWK/2);glink(gnode(a,y),gnode(b,y),!!v,'y')}});
 vx.forEach(x=>{const ys=[...ye[x]].sort((a,b)=>a-b);for(let i=0;i<ys.length-1;i++){const a=ys[i],b=ys[i+1],h=HRD.find(h=>a==h.y-SWK/2&&b==h.y+h.h+SWK/2);glink(gnode(x,a),gnode(x,b),!!h,'x')}});
 // 小巷
 glink(gnode(407,hy[1]),gnode(407,hy[2]),false);glink(gnode(453,hy[3]),gnode(453,1004),false);
 const h3=[20,453,640].sort((a,b)=>a-b);dn.filter(d=>d.sy==1004).forEach(d=>h3.push(d.dx));[...new Set(h3)].sort((a,b)=>a-b).forEach((x,i,a)=>{if(i)glink(gnode(a[i-1],1004),gnode(x,1004),false)});
 // 門口節點
 dn.forEach(d=>{const dd=gnode(d.dx,d.sy==1004?998:d.b.bot+22);dd.door=d.b.n;glink(dd,gnode(d.dx,d.sy),false)});
 // 公園與操場
 {const a=gnode(927,296),c=gnode(927,150),e=gnode(870,150),f=gnode(985,150);glink(gnode(927,hy[0]),a,false);glink(a,c,false);glink(c,e,false);glink(c,f,false);e.door='公園';f.door='公園';
  const g1=gnode(210,262);glink(gnode(210,hy[0]),g1,false);g1.door='操場';
  const m=gnode(1005,830);glink(gnode(1005,hy[3]),m,false);m.door='夜市';const fg=gnode(1443,826);glink(gnode(1443,hy[3]),fg,false);fg.door='農場'}}
const GNL=[...GN.values()];
let wkid=0;
function spawnWalker(kind){const nd=GNL[(Math.random()*GNL.length)|0],g2=genLook(kind,7000+wkid++),spd={elder:12,kid:28,jogger:46,tourist:17,student:24,office:24,worker:20,police:19,casual:22}[kind]||22;
 const n=mkNP({n:g2.name,lk:g2.lk,role:g2.role,walk:1,node:nd,tg:null,sp:spd*(.9+Math.random()*.2),x:nd.x-6,y:nd.y-4,ox:(Math.random()-.5)*10,oy:(Math.random()-.5)*10,um:1,cop:kind=='police'?1:0,pose:kind=='jogger'?'run':kind=='worker'?'':'',wait:Math.random()*3,id10:wkid%10});
 if(kind=='police')n.L=['我正在巡邏。','注意安全！'];return n}
['office','office','student','student','kid','elder','elder','jogger','police'].forEach(spawnWalker);
function pickNext(n){const cand=n.node.nb.filter(e=>e.n!==n.prev);const list=cand.length?cand:n.node.nb;let e=list[(Math.random()*list.length)|0];
 // 夜間少往門口，白天多
 n.edge=e;n.tg=e.n}
function walkStep(n,dt){
 if(n.hidT>0){n.hidT-=dt;if(n.hidT<=0){n.hid=false}return}
 if(n.wait>0){n.wait-=dt;n.mv=false;return}
 if(!n.tg)pickNext(n);
 const e=n.edge;if(e.cross&&!n.cross){if(!pedGo(e.ax)){n.mv=false;n.wait=.3;return}n.cross=1}
 const hor=n.tg.y==n.node.y,tx=hor?n.tg.x:n.tg.x+n.ox,ty=hor?n.tg.y+n.oy:n.tg.y,cx=n.x+6,cy=n.y+4,dx=tx-cx,dy=ty-cy,dd=Math.hypot(dx,dy),st=Math.min(dd,n.sp*dt);
 if(dd<1.5){n.prev=n.node;n.node=n.tg;n.tg=null;n.cross=0;if(n.node.door&&Math.random()<.6&&!n.cop){n.hid=true;n.hidT=5+Math.random()*16;n.mv=false;n.prev=null;return}if(Math.random()<.18){n.wait=1+Math.random()*3;n.mv=false}return}
 n.x+=dx/dd*st;n.y+=dy/dd*st;n.mv=true;n.dir=dirOf(dx,dy);n.at+=dt;if(n.at>(n.pose=='run'?.12:.2)){n.at=0;n.fr=typeof n.fr=='string'?n.fr:n.fr^1}}
function visNow(n){if(n.vf)return n.vf();if(!n.vis)return n.walk?(!nightMode()||(n.id10<3)):true;const h=T.hour;return n.vis.some(r=>h>=r[0]&&h<r[1])}
const nBlocked=n=>{const r=n.r;return n.x<r[0]||n.y<r[1]||n.x+n.w>r[0]+r[2]||n.y+n.h>r[1]+r[3]||hit(n,p)||solids.some(o=>hit(n,o))||NP.some(o=>o!==n&&!o.hid&&!o.walk&&o.still&&hit(n,o))};
function updateWorld(dt){
 NP.forEach(n=>{n.vh=!visNow(n);if(n.vh&&!n.walk){n.mv=false;return}
  if(n.walk){if(n.vh)return;walkStep(n,dt);return}
  if(n.b=='loop'){n.th+=n.om*dt;n.x=n.cx+Math.cos(n.th)*n.rx-6;n.y=n.cy+Math.sin(n.th)*n.ry-4;const dx=-Math.sin(n.th)*n.om,dy=Math.cos(n.th)*n.om*n.ry/n.rx*0+Math.cos(n.th)*n.om;n.dir=dirOf(-Math.sin(n.th)*n.rx*Math.sign(n.om),Math.cos(n.th)*n.ry*Math.sign(n.om));n.mv=true;n.at+=dt;if(n.at>(n.pose=='run'?.13:.24)){n.at=0;n.fr=typeof n.fr=='string'?n.fr:n.fr^1}return}
  if(n.still){n.mv=false;return}
  if(!n.r)return;n.tm-=dt;
  if(n.tm<=0){n.tm=1+Math.random()*2.5;n.vx=n.vy=0;if(Math.random()>.3){const v=n.mode=='v'||(n.mode=='a'&&Math.random()<.5),d=Math.random()<.5?-1:1;if(v)n.vy=d*n.sp;else n.vx=d*n.sp}n.peck=Math.random()<.3}
  const ox=n.x,oy=n.y;n.x+=n.vx*dt;n.y+=n.vy*dt;
  if(nBlocked(n)){n.x=ox;n.y=oy;n.vx*=-1;n.vy*=-1;n.tm=Math.min(n.tm,.5)}
  n.mv=!!(n.vx||n.vy);if(n.vx)n.dir=n.vx<0?2:3;else if(n.vy)n.dir=n.vy<0?1:0;if(n.mv){n.at=(n.at||0)+dt;if(n.at>.2){n.at=0;n.fr=typeof n.fr=='string'?n.fr:n.fr^1}}});
 trafficStep(dt);
 if(st.comp){if(!PET.on){PET.on=1;PET.x=p.x;PET.y=p.y}
  petSync();
  const tx=p.x-([3,5,7].includes(p.dir)?18:[2,4,6].includes(p.dir)?-18:0),ty=p.y-([1,6,7].includes(p.dir)?-14:[0,4,5].includes(p.dir)?14:0),k=Math.min(1,dt*3.5),px=PET.x;
  PET.x+=(tx-PET.x)*k;PET.y+=(ty-PET.y)*k;PET.mv=Math.hypot(tx-PET.x,ty-PET.y)>3;if(Math.abs(PET.x-px)>.05)PET.dir=PET.x<px?2:3;
  PET.at+=dt;if(PET.at>.2){PET.at=0;PET.fr^=1}}
}
const PET={x:0,y:0,w:12,h:8,t:'cat',c:'#e8a45a',dir:3,mv:false,fr:0,at:0,on:0};
function drawH(c,n){drawChar(c,{x:n.x,y:n.y,dir:n.dir,mv:n.mv,fr:n.fr,lk:n.lk||lookFor(n),pose:n.pose,ph:NOW/1000+n.ph0,sit:n.sit,um:n.um&&wx()==2,go:n.go,nm:n.n,ob:n})}
// 交通警察手勢：隨號誌變化
function copSync(){NP.forEach(n=>{if(n.pose=='dir')n.go=ls('x')=='g'})}
