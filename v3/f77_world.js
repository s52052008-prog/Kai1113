/* v12.4 幻境 Online：每 10 層一個環境（共 10 個），第 5 層菁英頭目、第 10 層大魔王 */
// 前三章改成 10 層
Object.assign(VCH[0],{f0:1,f1:10,lv:'Lv.1～10',ic:'🌿',mini:'m_wolf'});
Object.assign(VCH[1],{f0:11,f1:20,lv:'Lv.10～20',ic:'🌲',mini:'m_gob',traps:['gas']});
Object.assign(VCH[2],{f0:21,f1:30,lv:'Lv.20～30',ic:'🌋',mini:'m_golem',traps:['lava','geyser','rocks']});
// 用既有怪的動作＋重新上色做出新怪：ai＝動作、tint＝上色
const VMOBX={
 m_wolf:{ai:'wolf',n:'野狼頭目',hits:30,atk:1.4,r:26,exp:5,boss:1,mini:1,tint:['#a0603a',.45],el:'wind',drop:[['hide',1],['claw',1]],d:'草原第 5 層的菁英頭目。體型大一號的野狼，會連續猛撲。'},
 m_gob:{ai:'goblin',n:'哥布林隊長',hits:34,atk:1.5,r:26,exp:5.5,boss:1,mini:1,tint:['#c03a2a',.4],el:'fire',drop:[['fang',1],['bark',1]],d:'森林第 5 層的菁英頭目。炸彈丟得又多又遠。'},
 m_golem:{ai:'golem',n:'熔岩巨像',hits:40,atk:1.6,r:32,exp:6,boss:1,mini:1,tint:['#e05a1a',.5],el:'fire',drop:[['magma',1],['scale',1]],d:'火山第 5 層的菁英頭目。超硬的岩石外殼，砸地範圍很大。'},
 // 第四章・深藍海域（水）
 w_slime:{ai:'slime',n:'泡泡史萊姆',hits:4,atk:1.05,tint:['#3a9aff',.65],el:'water',drop:[['gel',.45]],d:'吸飽海水的史萊姆，跳起來會濺起水花。'},
 w_wolf:{ai:'wolf',n:'海狼',hits:5,atk:1.15,tint:['#2a6ad0',.6],el:'water',drop:[['hide',.35]],d:'在淺灘狂奔的狼，撲擊又快又遠。'},
 w_jelly:{ai:'bat',n:'水母',hits:3.5,atk:1.05,tint:['#7ae8ff',.6],el:'water',drop:[['gel',.4]],d:'在空中漂浮，停住的時候就會往下衝。'},
 w_mini:{ai:'golem',n:'珊瑚岩魔',hits:42,atk:1.6,r:32,exp:6,boss:1,mini:1,tint:['#ff7a9a',.55],el:'water',drop:[['bone',1],['gel',1]],d:'深藍海域第 5 層的菁英頭目，全身長滿珊瑚的岩魔。'},
 w_boss:{ai:'demon',n:'深海魔神',hits:190,atk:1.95,exp:15,tint:['#2a5ad0',.6],el:'water',drop:[['gel',1],['bone',1],['magma',1]],d:'深藍海域的主人。會噴出水柱、叫落石、整隻跳起來砸地。'},
 // 第五章・劇毒沼澤（毒）
 p_slime:{ai:'slime',n:'毒沼史萊姆',hits:4.2,atk:1.05,tint:['#9a4ad0',.65],el:'poison',drop:[['gel',.45]],d:'泡在毒沼裡長大的史萊姆。'},
 p_shroom:{ai:'shroom',n:'毒孢菇',hits:4,atk:1,tint:['#6ad03a',.55],el:'poison',drop:[['bone',.3]],d:'站著不動，會噴出一大片毒孢子。'},
 p_gob:{ai:'goblin',n:'沼澤哥布林',hits:5,atk:1.15,tint:['#4a8a3a',.55],el:'poison',drop:[['fang',.35]],d:'把毒藥做成炸彈丟過來的哥布林。'},
 p_mini:{ai:'treant',n:'腐沼樹精',hits:44,atk:1.6,r:30,exp:6,boss:1,mini:1,tint:['#6a3a8a',.55],el:'poison',drop:[['bark',1],['bone',1]],d:'劇毒沼澤第 5 層的菁英頭目，樹根會從腳下冒出來。'},
 p_boss:{ai:'tking',n:'沼澤腐王',hits:200,atk:2,exp:16,tint:['#7a2aa0',.55],el:'poison',drop:[['bark',1],['wing',1],['gel',1]],d:'劇毒沼澤的主人。一整排毒根、甩毒葉、叫手下圍攻。'},
 // 第六章・冰封雪原（水）
 i_slime:{ai:'slime',n:'雪球史萊姆',hits:4.5,atk:1.05,tint:['#e8f6ff',.7],el:'water',drop:[['gel',.45]],d:'圓滾滾的雪球，撞到會冷一下。'},
 i_wolf:{ai:'wolf',n:'冰狼',hits:5.5,atk:1.2,tint:['#9ad8ff',.6],el:'water',drop:[['hide',.35],['claw',.25]],d:'雪原上的獵手，壓低身體就是要撲了。'},
 i_bat:{ai:'bat',n:'冰晶精靈',hits:3.8,atk:1.1,tint:['#c8f0ff',.65],el:'wind',drop:[['wing',.4]],d:'冰晶凝成的小精靈，會俯衝撞人。'},
 i_mini:{ai:'golem',n:'雪怪',hits:46,atk:1.65,r:32,exp:6.5,boss:1,mini:1,tint:['#f0f8ff',.65],el:'water',drop:[['hide',1],['bone',1]],d:'冰封雪原第 5 層的菁英頭目，力氣大到能把地面砸裂。'},
 i_boss:{ai:'boss',n:'冰霜史萊姆皇',hits:210,atk:2,exp:16,r:54,tint:['#bfe6ff',.65],el:'water',drop:[['gel',1],['hide',1],['bone',1]],d:'冰封雪原的主人。巨大的冰史萊姆，跳起來砸地前地上會出現紅圈。'},
 // 第七章・血色古堡（火）
 b_bat:{ai:'bat',n:'血蝙蝠',hits:4,atk:1.15,tint:['#c0203a',.6],el:'fire',drop:[['wing',.4]],d:'聞到血味就會撲過來的蝙蝠。'},
 b_gob:{ai:'goblin',n:'吸血鬼僕人',hits:5.5,atk:1.2,tint:['#8a2a4a',.6],el:'poison',drop:[['fang',.35]],d:'替伯爵看門的僕人，會丟血瓶炸彈。'},
 b_liz:{ai:'lizard',n:'血蜥',hits:5.5,atk:1.2,tint:['#b0102a',.55],el:'fire',drop:[['scale',.35]],d:'古堡地窖裡的蜥蜴，會吐血火球。'},
 b_mini:{ai:'golem',n:'血鎧騎士',hits:50,atk:1.7,r:32,exp:7,boss:1,mini:1,tint:['#8a1020',.6],el:'fire',drop:[['magma',1],['bone',1]],d:'血色古堡第 5 層的菁英頭目，穿著厚重血色盔甲。'},
 b_boss:{ai:'gchief',n:'血之伯爵',hits:220,atk:2.05,exp:17,r:34,tint:['#c0103a',.6],el:'fire',drop:[['fang',1],['wing',1],['scale',1]],d:'血色古堡的主人。火球連發、召喚隕石、還會瞬間移動。'},
 // 第八章・雷鳴高原（電）
 t_slime:{ai:'slime',n:'電漿史萊姆',hits:4.8,atk:1.1,tint:['#ffe04a',.6],el:'elec',drop:[['gel',.45]],d:'帶電的史萊姆，碰到會麻麻的。'},
 t_wolf:{ai:'wolf',n:'雷狼',hits:5.8,atk:1.25,tint:['#ffd02a',.55],el:'elec',drop:[['hide',.35],['claw',.25]],d:'跑起來像一道閃電。'},
 t_bird:{ai:'tbird',n:'暴風雷鳥',hits:4.2,atk:1.15,tint:['#9ad0ff',.55],el:'elec',drop:[['feather',.4]],d:'頭頂出現「!」時，你腳下會落雷。'},
 t_mini:{ai:'lizard',n:'雷獸',hits:50,atk:1.75,r:28,exp:7,boss:1,mini:1,tint:['#fff06a',.55],el:'elec',drop:[['scale',1],['feather',1]],d:'雷鳴高原第 5 層的菁英頭目，全身放電的巨獸。'},
 t_boss:{ai:'demon',n:'雷神巨像',hits:230,atk:2.1,exp:18,tint:['#ffe04a',.5],el:'elec',drop:[['feather',1],['magma',1],['scale',1]],d:'雷鳴高原的主人。降下雷光、叫落石、跳起來砸地。'},
 // 第九章・幻影迷宮（風）
 h_slime:{ai:'slime',n:'幻影史萊姆',hits:5,atk:1.15,tint:['#d0b0ff',.65],el:'wind',drop:[['gel',.45]],d:'半透明的史萊姆，一不小心就被撞到。'},
 h_gob:{ai:'goblin',n:'鏡像哥布林',hits:6,atk:1.25,tint:['#b090ff',.6],el:'wind',drop:[['fang',.35]],d:'像照鏡子一樣模仿你的哥布林。'},
 h_bat:{ai:'bat',n:'幽靈',hits:4.5,atk:1.2,tint:['#e8e8ff',.7],el:'wind',drop:[['wing',.4]],d:'飄來飄去的幽靈，停住時就要俯衝了。'},
 h_mini:{ai:'gchief',n:'幻術師',hits:52,atk:1.75,r:28,exp:7.5,boss:1,mini:1,tint:['#9a6aff',.55],el:'wind',drop:[['fang',1],['wing',1]],d:'幻影迷宮第 5 層的菁英頭目，會瞬間移動、放魔法。'},
 h_boss:{ai:'tking',n:'千面幻王',hits:240,atk:2.15,exp:18,tint:['#8a5aff',.55],el:'wind',drop:[['bark',1],['wing',1],['fang',1]],d:'幻影迷宮的主人。幻影樹根、葉刃、還會叫幽靈助陣。'},
 // 第十章・暗黑深淵（毒）
 d_wolf:{ai:'wolf',n:'暗影狼',hits:6.5,atk:1.3,tint:['#4a3a7a',.65],el:'poison',drop:[['hide',.35],['claw',.25]],d:'從黑暗中衝出來的狼。'},
 d_bat:{ai:'bat',n:'深淵蝙蝠',hits:5,atk:1.25,tint:['#5a2a7a',.65],el:'poison',drop:[['wing',.4]],d:'深淵裡成群結隊的蝙蝠。'},
 d_golem:{ai:'golem',n:'黑暗岩魔',hits:9.5,atk:1.4,tint:['#3a2a5a',.65],el:'elec',drop:[['magma',.25]],d:'黑曜石組成的岩魔，又硬又會砸地。'},
 d_mini:{ai:'gchief',n:'暗黑騎士',hits:58,atk:1.85,r:30,exp:8,boss:1,mini:1,tint:['#5a3a9a',.75],el:'poison',drop:[['fang',1],['magma',1]],d:'暗黑深淵第 5 層的菁英頭目。'},
 d_boss:{ai:'demon',n:'深淵魔王',hits:270,atk:2.25,exp:22,tint:['#4a1a6a',.65],el:'poison',drop:[['magma',1],['wing',1],['scale',1],['fang',1]],d:'幻境最深處的魔王。打倒牠，幻境就全破了！'}};
for(const k in VMOBX){const o=VMOBX[k],b=VMOB[o.ai];VMOB[k]=Object.assign({},b,o);const M=VMOB[k];if(/_boss$/.test(k))M.boss=1;M.d+=`（屬性：${VEL[M.el][1]}${VEL[M.el][0]}，怕${VEL[Object.keys(VBEAT).find(x=>VBEAT[x]==M.el)][0]}）`}
VCH.push(
 {n:'深藍海域',ic:'🌊',f0:31,f1:40,lv:'Lv.30～40',th:'water',mobs:['w_slime','w_wolf','w_jelly'],mini:'w_mini',boss:'w_boss',traps:['geyser'],extra:[['golem',1]]},
 {n:'劇毒沼澤',ic:'☠️',f0:41,f1:50,lv:'Lv.40～50',th:'poison',mobs:['p_slime','p_shroom','p_gob'],mini:'p_mini',boss:'p_boss',traps:['gas']},
 {n:'冰封雪原',ic:'❄️',f0:51,f1:60,lv:'Lv.50～60',th:'ice',mobs:['i_slime','i_wolf','i_bat'],mini:'i_mini',boss:'i_boss',traps:['rocks'],rockMsg:'🧊 小心冰柱！'},
 {n:'血色古堡',ic:'🩸',f0:61,f1:70,lv:'Lv.60～70',th:'blood',mobs:['b_bat','b_gob','b_liz'],mini:'b_mini',boss:'b_boss',traps:['gas','lava']},
 {n:'雷鳴高原',ic:'⚡',f0:71,f1:80,lv:'Lv.70～80',th:'thunder',mobs:['t_slime','t_wolf','t_bird'],mini:'t_mini',boss:'t_boss',traps:['geyser','rocks'],rockMsg:'⚡ 小心落雷！'},
 {n:'幻影迷宮',ic:'🔮',f0:81,f1:90,lv:'Lv.80～90',th:'phantom',mobs:['h_slime','h_gob','h_bat'],mini:'h_mini',boss:'h_boss',traps:['gas']},
 {n:'暗黑深淵',ic:'🌑',f0:91,f1:100,lv:'Lv.90～100',th:'dark',mobs:['d_wolf','d_bat','d_golem'],mini:'d_mini',boss:'d_boss',traps:['lava','gas','rocks'],rockMsg:'🌑 小心暗黑隕石！'});
// 新環境的畫面：以前三章的圖為底，重新上色＋各自的天空與飄浮粒子
const VTH2={
 water:{base:'grass',tint:['#2a7ad0',.55],sky:['#0a2a5a','#1a5a9a','#4ab0e0'],orb:'#bfeaff',amb:'bubble'},
 poison:{base:'forest',tint:['#6a3a9a',.45],sky:['#1a0e2a','#3a1e4a','#6a8a3a'],orb:'#c0ff7a',amb:'spore'},
 ice:{base:'grass',tint:['#d8f0ff',.6],sky:['#6a9ac8','#b8d8f0','#f0f8ff'],orb:'#ffffff',amb:'snow'},
 blood:{base:'forest',tint:['#9a1830',.5],sky:['#1a0408','#4a0a18','#a02a2a'],orb:'#ff3a3a',amb:'ember'},
 thunder:{base:'volcano',tint:['#c8b040',.45],sky:['#1a1a3a','#3a3a6a','#8a8ab0'],orb:'#fff6a0',amb:'spark'},
 phantom:{base:'forest',tint:['#9a7aff',.5],sky:['#1a1040','#3a2a7a','#9a7ad0'],orb:'#e0d0ff',amb:'wisp'},
 dark:{base:'volcano',tint:['#2a1040',.65],sky:['#05020a','#14081e','#3a1a4a'],orb:'#a04aff',amb:'void'}};
function vaTint(cv,hex,amt,nc){const k='tn'+(cv._id||(cv._id=Math.random()))+hex+amt;if(!nc&&VA[k])return VA[k];const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');x.drawImage(cv,0,0);
 const d=x.getImageData(0,0,c.width,c.height),a=d.data,tr=parseInt(hex.slice(1,3),16),tg=parseInt(hex.slice(3,5),16),tb=parseInt(hex.slice(5,7),16);
 for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const L=(a[i]*.3+a[i+1]*.59+a[i+2]*.11)/255;if(L>.93)continue;const f=.25+1.35*L;a[i]=a[i]*(1-amt)+Math.min(255,tr*f)*amt;a[i+1]=a[i+1]*(1-amt)+Math.min(255,tg*f)*amt;a[i+2]=a[i+2]*(1-amt)+Math.min(255,tb*f)*amt}
 x.putImageData(d,0,0);if(!nc)VA[k]=c;return c}
{const _s=vaSky;vaSky=function(g,VW,VH,t,th){const C=VTH2[th];if(!C)return _s(g,VW,VH,t,th);const gr=g.createLinearGradient(0,0,0,VH);gr.addColorStop(0,C.sky[0]);gr.addColorStop(.6,C.sky[1]);gr.addColorStop(1,C.sky[2]);g.fillStyle=gr;g.fillRect(0,0,VW,VH);
 g.save();g.globalAlpha=.85;g.fillStyle=C.orb;g.shadowColor=C.orb;g.shadowBlur=30;g.beginPath();g.arc(VW*.78,VH*.2,th=='dark'?26:36,0,7);g.fill();g.shadowBlur=0;
 if(th=='dark'){g.fillStyle=C.sky[0];g.beginPath();g.arc(VW*.78+12,VH*.2-6,24,0,7);g.fill()}
 if(th=='thunder'&&(t%5)<.12){g.globalAlpha=.35;g.fillStyle='#fff';g.fillRect(0,0,VW,VH)}
 for(let i=0;i<40;i++){const s=i*97.3,sp=10+(i%5)*6;let x,y,r=1.5+(i%3);
  if(C.amb=='bubble'){x=(s*3.1+Math.sin(t+i)*10)%VW;y=VH-((t*sp+s*7)%VH);g.globalAlpha=.4;g.strokeStyle='#cfeeff';g.lineWidth=1.5;g.beginPath();g.arc(x,y,r+1,0,7);g.stroke();continue}
  if(C.amb=='snow'){x=(s*3.1+Math.sin(t*.7+i)*20)%VW;y=(t*sp*1.5+s*7)%VH;g.globalAlpha=.85;g.fillStyle='#fff'}
  else if(C.amb=='ember'){x=(s*3.1+Math.sin(t+i)*14)%VW;y=VH-((t*sp+s*7)%VH);g.globalAlpha=.6;g.fillStyle='#ff4a5a'}
  else if(C.amb=='spark'){x=(s*3.1)%VW;y=(s*5.7)%VH;g.globalAlpha=(Math.sin(t*6+i)>.85)?.9:0;g.fillStyle='#fff6a0'}
  else if(C.amb=='spore'){x=(s*3.1+t*8)%VW;y=(s*5.7+Math.sin(t+i)*15)%VH;g.globalAlpha=.45;g.fillStyle='#b0ff6a'}
  else if(C.amb=='wisp'){x=(s*3.1+Math.sin(t*.5+i)*40)%VW;y=(s*5.7+Math.cos(t*.4+i)*30)%VH;g.globalAlpha=.3+.25*Math.sin(t*2+i);g.fillStyle='#e8dcff';r+=2}
  else{x=(s*3.1)%VW;y=(s*5.7)%(VH*.7);g.globalAlpha=.4+.4*Math.sin(t*2+i);g.fillStyle='#c08aff';r=1}
  g.beginPath();g.arc(x,y,r,0,7);g.fill()}
 g.restore()}}
{const _l=vaLayers;vaLayers=function(VW,VH,AW,seed,th){const C=VTH2[th];if(!C)return _l(VW,VH,AW,seed,th);return _l(VW,VH,AW,seed,C.base).map(L=>({f:L.f,cv:vaTint(L.cv,C.tint[0],C.tint[1],1)}))}}
{const _g=vaGround;vaGround=function(AW,AH,GY,seed,th){const C=VTH2[th];if(!C)return _g(AW,AH,GY,seed,th);return vaTint(_g(AW,AH,GY,seed,C.base),C.tint[0],Math.min(.8,C.tint[1]+.1),1)}}
{const _p=vaPlat;vaPlat=function(p,th){const C=VTH2[th];if(!C)return _p(p,th);if(p._cv&&p._tn)return p._cv;_p(p,C.base);p._cv=vaTint(p._cv,C.tint[0],Math.min(.8,C.tint[1]+.1),1);p._tn=1;return p._cv}}
// 進度：打倒第 10 層的大魔王＝通關一個環境，等級上限 +10
function vrClrSync(){const V=vrS();if(!V.w10){V.w10=1;V.clr=Math.max(V.clr||0,(V.best||0)>=15?2:(V.best||0)>=10?1:0)}V.clr=V.clr||0;V.cap=Math.max(V.cap||10,Math.min(100,10*(V.clr+1)))}
{const _l=vrLobby;vrLobby=function(){try{vrClrSync()}catch(e){}return _l.apply(this,arguments)}}
function vrStart(){const V=vrS();vrClrSync();if(!V.clr){closeDlg();return vrGame(1)}
 openDlg('⚔️ 選擇環境',`通關一個環境（打倒第 10 層大魔王）就能從下一個環境開始，等級上限也會 +10。<br>目前通關：<b>${V.clr}</b> / ${VCH.length}`,VCH.map((c,i)=>[`${c.ic} 第${'一二三四五六七八九十'[i]}章・${c.n}`,i>V.clr?'🔒 先通關上一個環境':`第 ${c.f0}～${c.f1} 層・建議 ${c.lv}`,()=>{closeDlg();vrGame(c.f0)},i>V.clr,1]).concat([['返回','',vrLobby]]),0,'grid')}
