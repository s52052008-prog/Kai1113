/* v12.8 新職業：德魯伊（馴服怪物、寵物、變身）＋新隊友：哲良（小朱） */
// ───────── 職業、武器、技能 ─────────
VWP.totem={n:'圖騰杖',ic:'🦴',k:'magic',spd:440,dmg:1.15,cd:.45,mp:2,price:600,d:'恐龍骨做的手杖，射出旋轉的飛葉',sk:['vine','tame']};
VCLS.druid={n:'德魯伊',ic:'🦖',wp:['totem'],atk:.95,hp:1.05,mp:1.25,def:.9,crit:0,spd:1,spell:1.1,R:'wildcall',
 d:'森林的守護者。把怪物打虛弱，丟出「種子捕獸球」把牠收服，讓牠幫你作戰！',pas:'寵物會跟你一起闖關（最多 2 隻），寵物的攻擊跟著你的攻擊力成長'};
Object.assign(VSK,{vine:{n:'藤蔓纏繞',mp:12,cd:6},tame:{n:'種子捕獸球',mp:16,cd:4},wildcall:{n:'野性呼喚',mp:30,cd:22},
 beastroar:{n:'萬獸咆哮',mp:24,cd:14},shift:{n:'自然化身',mp:10,cd:1.2}});
VPAL_EL.zheliang='wind';
// 進化路線
VTREE.druid=[
 {k:'druA',n:'萬獸之主',role:'召喚',el:'wind',ic:'🐾',d:'把收服的怪物養得又大又強。寵物越多、越壯，你就越輕鬆。',
  sk:{id:'beastroar',n:'萬獸咆哮',mp:24,cd:14,d:'所有寵物回復 40% 血量，6 秒內攻擊 +60%'},
  nodes:[['p1','野性連結',5,r=>`寵物攻擊 +${15*r}%`,{pet:.15}],['p2','堅韌毛皮',5,r=>`寵物血量 +${20*r}%`,{peth:.2}],['p3','馴獸大師',3,r=>`收服成功率 +${5*r}%、可馴服血量 +${3*r}%`,{tame:.05},12]],
  cap:['萬獸之王','寵物上限變成 3 隻']},
 {k:'druB',n:'自然化身',role:'變身',el:'poison',ic:'🐻',d:'自己變成野獸戰鬥。熊形態超硬、狼形態超快，隨時切換。',
  sk:{id:'shift',n:'自然化身',mp:10,cd:1.2,d:'在「人 → 熊 → 狼」之間切換。熊：受傷 -40%、慢慢回血、熊掌橫掃；狼：移動 +35%、快速撕咬'},
  nodes:[['p1','厚皮',5,r=>`熊形態受傷再 -${4*r}%`,{bear:.04}],['p2','狂野',5,r=>`變身時攻擊 +${8*r}%`,{wild:.08}],['p3','月下再生',3,r=>`變身時每秒回 ${r}% 血`,{regen:.01},12]],
  cap:['月之子','變身不用魔力，變身時爆擊率 +15%']}];
{const U={druA:[['stampede','wind','萬獸奔騰','🐺','一群森林靈獸從身後衝過整片地面，所有寵物一起衝鋒'],['grove','water','森之守護','🌳','全隊回血 35%、寵物補滿血並得到護盾']],
 druB:[['wrath','poison','森林之怒','🌲','你站的整片地面竄出巨大樹根，纏住並重創上面所有怪物'],['heart','wind','狂野之心','💚','15 秒內攻擊 +40%、吸血 +10%，變身不用魔力']]};
 VTREE.druid.forEach(p=>{p.ults=U[p.k].map((u,i)=>{const id='u_'+p.k+i,o={id,t:'dru',k:u[0],el:u[1],n:u[2],ic:u[3],d:u[4],mp:45,cd:22};VULT[id]=o;VSK[id]={n:u[2],mp:45,cd:22};return o})})}
Object.assign(VTICON,{pet:'🐾',peth:'❤️',tame:'🌰',bear:'🐻',wild:'🐺',regen:'💚'});
// 每趟一開始，德魯伊的「馴服」就會用
{const _s=vrRunStart;vrRunStart=function(){_s.apply(this,arguments);try{if(vrS().cls=='druid')VRUN.sk.e=1}catch(e){}}}
// ───────── 種子捕獸球（原創設計：橡實殼＋藤蔓帶＋發光琥珀） ─────────
function vsSeedBall(t){return vbGet('seedball'+(t||0),18,18,'#2a1a08',x=>{_e(x,9,10,7.5,7.5,'#e8d4a8');_e(x,8,11,5.5,5,'#f6e8c8');
 _p(x,'#5a8a2a',1.5,9,16.5,9,16,6,13,3.5,9,2.5,5,3.5,2,6);_e(x,9,6,7.5,4.5,'#6aa83a');for(let i=0;i<5;i++)_r(x,3+i*3,4+(i%2),2,1,'#3a6a1a');
 _r(x,8,0,2,3,'#7a4a1a');_p(x,'#8ae04a',10,1,15,0,12,3);_r(x,1,9,16,2,'#7a4a1a');_e(x,9,10,2.6,2.6,'#5a3a10');_e(x,9,10,1.7,1.7,t?'#fff6a0':'#ffb030')})}
// ───────── 寵物 ─────────
function vrPetMax(){return 2+(vrTR('cap')>0&&vrPath()&&vrPath().k=='druA'?1:0)}
function vrPetStats(p){const pa=vrAtk(),T=p.T;p.atk=pa*.5*Math.max(.7,Math.min(1.6,T.atk||1))*(1+vrTR('p1')*.15*(vrPath()&&vrPath().k=='druA'?1:0));
 const mh=Math.round(vrHP()*.45*Math.max(.7,Math.min(1.8,(T.hits||5)/5))*(T.boss?2.2:1)*(1+(vrPath()&&vrPath().k=='druA'?vrTR('p2')*.2:0)));p.hp=p.mhp?Math.min(mh,p.hp/p.mhp*mh):mh;p.mhp=mh}
function vrMakePet(m,X){m.pet=1;m.capT=0;m.hide=0;m.elite=null;m.shield=0;m.stun=0;m.ghost=0;m.alpha=null;m.st='idle';m.t=0;m.taunt=0;m.poison=0;m.burn=0;m.slow=0;m.mhp=0;vrPetStats(m);m.hp=m.mhp;m.name='🐾'+(m.vn||m.T.n);
 (X.G.pets=X.G.pets||[]).push(m);const D=vrS();D.tamed=D.tamed||{};D.tamed[m.id||m.k]=(D.tamed[m.id||m.k]||0)+1;SVDIRTY=1}
function vrPetHurt(p,d,X){if(p.dead)return;d=Math.max(1,Math.round(d*.8));p.hp-=d;p.fl=.12;X.num(p.x,p.y-p.r-8,'-'+d,'#ffb0b0');if(p.hp<=0){p.dead=1;X.say('💔 寵物 '+p.name+' 倒下了……',1.6);X.puff(p.x,p.y,20,'#9ae05a',160)}}
function vrPetTick(dt,X){const G=X.G,P=X.P;if(!G.pets||!G.pets.length)return;G.pets=G.pets.filter(p=>!p.dead);
 G.pets.forEach((p,i)=>{const T=p.T;p.ph+=dt;p.acd=(p.acd||0)-dt;p.at=(p.at||0)-dt;p.bf=Math.max(0,(p.bf||0)-dt);p.fl=Math.max(0,(p.fl||0)-dt);
  let tg=null,td=1e9;G.mobs.forEach(m=>{if(m.capT>0||m.ghost)return;const d=Math.hypot(m.x-p.x,m.y-p.y);if(d<td&&Math.hypot(m.x-P.x,m.y-P.y)<700){td=d;tg=m}});p.ptg=tg||P;
  const sk=T.sk||[],rng=sk.some(a=>a[0]=='shoot'||a[0]=='burst'||a[0]=='lob')||['lizard','goblin','shroom','tbird'].includes(p.k),fly=!!T.fly,spd=(T.spd||80)*(p.bf>0?1.3:1)+40,reach=rng?360:p.r+(tg?tg.r:0)+14;
  let gx,gy;if(tg){gx=td>reach?tg.x:(rng&&td<reach*.5?p.x-(tg.x-p.x):p.x);gy=tg.y}else{gx=P.x+(i%2?-1:1)*(60+i*30);gy=P.y-(fly?90:0)}
  if(p.st=='wind'){p.vx*=.8;if(fly)p.vy*=.8;if(p.at<=0){p.st='dash';p.at=.3;const a=Math.atan2(tg?tg.y-p.y:0,tg?tg.x-p.x:1),s=T.dash||520;p.vx=Math.cos(a)*s;if(fly)p.vy=Math.sin(a)*s;p.la=a;p.hitDone=0}}
  else if(p.st=='dash'){if(!p.hitDone&&tg&&Math.hypot(tg.x-p.x,tg.y-p.y)<p.r+tg.r+10){p.hitDone=1;X.hitMob(tg,p.atk*(p.bf>0?1.6:1)*1.4,{ally:1,el:p.el,fx:p.x,fy:p.y,kb:120})}p.vx*=Math.exp(-2*dt);if(p.at<=0)p.st='idle'}
  else if(p.st=='shoot'){p.vx*=.85;if(p.at<=0){p.st='idle';if(tg){const a=Math.atan2(tg.y-p.y,tg.x-p.x),k=(sk.find(s=>s[0]=='shoot'||s[0]=='burst')||[])[4]||'mist',pr=VPRD[k]?{drw:VPRD[k]}:{orb:'#9ae05a'};X.G.pr.push(Object.assign({x:p.x,y:p.y-6,vx:Math.cos(a)*420,vy:Math.sin(a)*420,d:p.atk*(p.bf>0?1.6:1),t:0,life:1.4,own:'a',r:8,el:p.el,hit:new Set(),G:X.G},pr))}}}
  else{if(fly){p.vx+=(gx-p.x)*2*dt;p.vy+=((gy-(tg?60:0))-p.y)*2*dt;p.vx*=Math.exp(-2.2*dt);p.vy*=Math.exp(-2.2*dt)}else{const dx=gx-p.x;p.vx=Math.abs(dx)>16?Math.sign(dx)*spd:0;if(p.og&&gy<p.y-80&&Math.random()<dt*2.5)p.vy=-780;if(p.og&&gy>p.y+80&&p.plat&&p.plat.thin&&Math.random()<dt*2)p.drop=.3}
   if(tg&&td<reach+10&&p.acd<=0){p.acd=(rng?1.3:1.1)*(p.bf>0?.7:1);if(rng){p.st='shoot';p.at=.35;p.ak=sk.find(s=>s[0]=='shoot'||s[0]=='burst')}else{p.st='wind';p.at=.25}}}
  p.x+=p.vx*dt;if(fly){p.y+=p.vy*dt;p.y=Math.max(40,Math.min(X.GY-24,p.y))}else X.phys(p,dt,X.FOm(p));p.x=Math.max(p.r,Math.min(X.AW-p.r,p.x));
  if(Math.hypot(P.x-p.x,P.y-p.y)>900){p.x=P.x+(i?-50:50);p.y=P.y-40;p.vy=0}
  if(p.hp<p.mhp&&!tg)p.hp=Math.min(p.mhp,p.hp+p.mhp*.03*dt)})}
function vrPetMark(g,p){if(p.hide)return;const w=40,y=p.y-p.r-(p._h?Math.min(60,p._h*.45):10)-14;g.fillStyle='#000';g.fillRect(p.x-w/2-1,y-1,w+2,6);g.fillStyle='#7aff9a';g.fillRect(p.x-w/2,y,w*Math.max(0,p.hp)/p.mhp,4);
 g.font='bold 11px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#000';g.strokeText(p.name,p.x,y-4);g.fillStyle=p.bf>0?'#ffd84a':'#c8ffb0';g.fillText(p.name,p.x,y-4)}
function vrPetHud(g,X){const ps=X.G.pets||[];if(!ps.length)return;const y0=74+X.AL.length*40;ps.forEach((p,i)=>{const y=y0+i*22;g.fillStyle='rgba(0,0,0,.5)';g.fillRect(14,y,200,18);g.font='bold 11px sans-serif';g.textAlign='left';g.fillStyle='#c8ffb0';g.fillText(p.name,20,y+13);g.fillStyle='#232';g.fillRect(110,y+6,98,6);g.fillStyle='#7aff9a';g.fillRect(110,y+6,98*Math.max(0,p.hp)/p.mhp,6)})}
// ───────── 馴服（E）：用滑鼠指著怪物，或打最近的那隻 ─────────
function vrTameLimit(m){return(m.T.mini?.2:.3)+(vrPath()&&vrPath().k=='druA'?vrTR('p3')*.03:0)}
function vrTameOk(m){return !m.T.boss||m.T.mini}
function vrTamePick(X){const G=X.G,P=X.P,M=X.mouse();const L=G.mobs.filter(m=>!m.capT&&!m.gold&&vrTameOk(m));if(!L.length)return null;
 if(G.t-M.t<6){let b=null,bd=1e9;L.forEach(m=>{const d=Math.hypot(m.x-M.x,m.y-M.y);if(d<bd){bd=d;b=m}});if(b&&bd<m_r(b)+90)return b}
 const f=Math.cos(P.face)>=0?1:-1;let b=null,bd=1e9;L.forEach(m=>{const dx=(m.x-P.x)*f;if(dx<-30)return;const d=Math.hypot(m.x-P.x,m.y-P.y)*(m.hp/m.mhp<=vrTameLimit(m)?.5:1);if(d<bd&&d<640){bd=d;b=m}});return b}
const m_r=m=>m.r*(m.T.sprS||1);
function vrTame(X){const G=X.G,P=X.P;if((G.pets||[]).filter(p=>!p.dead).length>=vrPetMax()){X.say('🐾 寵物滿了（最多 '+vrPetMax()+' 隻）',1.2);return false}
 const m=vrTamePick(X);if(!m){X.say('附近沒有可以收服的怪（大魔王不行）',1.2);return false}
 const lim=vrTameLimit(m);if(m.hp/m.mhp>lim){X.say(`${m.name||m.T.n} 血量還太多！打到 ${Math.round(lim*100)}% 以下再丟`,1.4);X.num(m.x,m.y-m.r-30,'血量 '+Math.round(m.hp/m.mhp*100)+'% > '+Math.round(lim*100)+'%','#ffb04a');return false}
 m.capT=99;m.vx=0;m.vy=0;m.st='idle';const sx=P.x,sy=P.y-20,tx=m.x,ty=m.y,mini=!!m.T.mini;X.say('🌰 去吧！種子捕獸球！',1.2);
 G.fx.push({k:'vbball',t:0,dur:.55,drw(g,f){const k=f.t/.55,x=sx+(tx-sx)*k,y=sy+(ty-sy)*k-Math.sin(k*Math.PI)*140;const c=vsSeedBall(0);g.save();g.translate(x,y);g.rotate(k*12);g.drawImage(c,-18,-18,36,36);g.restore()}});
 setTimeout(()=>{if(G.st!='play'&&G.st!='lvl'&&G.st!='pause'){m.capT=0;return}if(m.dead){return}m.hide=1;X.puff(tx,ty,26,'#ffe6a0',220);G.fx.push({k:'ring',x:tx,y:ty,r:60,t:0,dur:.4,c:'#fff6a0'});
  const gy=(m.og?m.y+X.FOm(m):X.GY)-10,bx=tx,dur=mini?3.4:2.6,chance=Math.min(1,(m.hp/m.mhp<=lim*.5?1:mini?.72:.86)+(vrPath()&&vrPath().k=='druA'?vrTR('p3')*.05:0)),ok=Math.random()<chance;
  G.fx.push({k:'vbwob',t:0,dur,drw(g,f){const n=Math.floor(f.t/(dur/3.2)),ph=(f.t%(dur/3.2))/(dur/3.2),w=ph<.35?Math.sin(ph/.35*Math.PI*2)*.5:0,gl=ph<.35;g.save();g.translate(bx,gy);g.rotate(w);g.drawImage(vsSeedBall(gl?1:0),-18,-30,36,36);g.restore();
   if(gl){g.font='bold 14px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#000';const t='…'.repeat(Math.min(3,n+1));g.strokeText(t,bx,gy-40);g.fillStyle='#fff';g.fillText(t,bx,gy-40)}}});
  setTimeout(()=>{if(m.dead)return;if(G.st!='play'&&G.st!='lvl'&&G.st!='pause'){m.capT=0;m.hide=0;return}
   if(ok){m.dead=1;G.mobs=G.mobs.filter(o=>o!==m);m.dead=0;m.x=bx;m.y=gy-30;vrMakePet(m,X);for(let i=0;i<14;i++)G.parts.push({x:bx,y:gy-10,vx:(Math.random()-.5)*300,vy:-100-Math.random()*200,t:0,c:['#ffd84a','#9ae05a','#fff'][i%3]});
    G.fx.push({k:'ring',x:bx,y:gy-10,r:80,t:0,dur:.5,c:'#9ae05a'});X.say('🎉 收服成功！'+m.name+' 成為你的夥伴了！',2);X.anyone('loot',1)}
   else{m.capT=0;m.hide=0;m.stun=.8;X.puff(bx,gy,24,'#c8a060',240);X.num(m.x,m.y-m.r-20,'💢 掙脫了！','#ff8a8a',1);X.say('💢 '+(m.name||m.T.n)+' 從種子球裡掙脫了！再試一次！',1.6)}},dur*1000)},550);return true}
// 滑鼠指到的怪顯示「可以收服」
function vrTameHint(g,X){if(X.CL()!==VCLS.druid)return;const G=X.G,M=X.mouse();if(G.t-M.t>3)return;const m=vrTamePick(X);if(!m)return;const ok=m.hp/m.mhp<=vrTameLimit(m),R=m_r(m)+16;
 g.save();g.strokeStyle=ok?'#9ae05a':'rgba(255,180,80,.7)';g.lineWidth=3;g.setLineDash([8,6]);g.lineDashOffset=-G.t*30;g.beginPath();g.arc(m.x,m.y,R,0,7);g.stroke();g.setLineDash([]);
 g.font='bold 12px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#000';const t=ok?'🌰 可以收服！':'血量 '+Math.round(m.hp/m.mhp*100)+'%（要 '+Math.round(vrTameLimit(m)*100)+'% 以下）';g.strokeText(t,m.x,m.y+R+16);g.fillStyle=ok?'#c8ffb0':'#ffd0a0';g.fillText(t,m.x,m.y+R+16);g.restore()}
// ───────── 德魯伊技能 ─────────
const VDRU={
 vine(a,D,X){const P=X.P,s=Math.cos(a)>=0?1:-1;X.say('🌿 藤蔓纏繞！',.8);for(let i=1;i<=6;i++){const x=P.x+s*i*52,y=P.y;setTimeout(()=>{X.G.fx.push({k:'vbvine',x,y,t:0,dur:1.8,drw(g,f){const k=Math.min(1,f.t/.15)*(f.t>f.dur-.3?(f.dur-f.t)/.3:1);g.strokeStyle='#3a8a2a';g.lineWidth=5;for(let j=0;j<3;j++){g.beginPath();g.moveTo(f.x-10+j*10,f.y+18);g.quadraticCurveTo(f.x-20+j*14+Math.sin(X.G.t*6+j)*6,f.y-10,f.x-6+j*8,f.y+18-48*k);g.stroke()}g.fillStyle='#7ad04a';g.beginPath();g.ellipse(f.x,f.y+18-48*k,6,3,.5,0,7);g.fill()}});
   X.G.mobs.forEach(m=>{if(Math.abs(m.x-x)<40+m.r&&Math.abs(m.y-y)<70+m.r&&!m.capT){X.hitMob(m,D*.9,{kb:false,fx:x,fy:y});if(m.T.boss)m.slow=2.5;else m.stun=Math.max(m.stun||0,2)}})},i*55)}},
 tame(a,D,X){if(!vrTame(X)){X.refund('e');}},
 wildcall(a,D,X){const ps=(X.G.pets||[]);X.say('🐾 野性呼喚！',1.2);ps.forEach(p=>{p.bf=8;p.hp=Math.min(p.mhp,p.hp+p.mhp*.3);X.G.fx.push({k:'ring',x:p.x,y:p.y,r:50,t:0,dur:.5,c:'#ffd84a'})});if(!ps.length){X.P.buff.anthem=Math.max(X.P.buff.anthem||0,6);X.say('🐾 野性呼喚！（沒有寵物，改成自己變強 6 秒）',1.4)}},
 beastroar(a,D,X){const ps=(X.G.pets||[]);X.say('🦁 萬獸咆哮！',1.2);X.G.shake=8;ps.forEach(p=>{p.bf=6;p.hp=Math.min(p.mhp,p.hp+p.mhp*.4)});X.G.fx.push({k:'ring',x:X.P.x,y:X.P.y,r:260,t:0,dur:.6,c:'#ffd84a'})},
 shift(a,D,X){const P=X.P,nx={'':'bear',bear:'wolf',wolf:''}[P.form||''];P.form=nx;X.puff(P.x,P.y,24,'#9ae05a',200);X.G.fx.push({k:'ring',x:P.x,y:P.y,r:70,t:0,dur:.4,c:'#9ae05a'});X.say(nx=='bear'?'🐻 化身成熊！':nx=='wolf'?'🐺 化身成狼！':'🧑 變回人形',1)},
 u_druA0(a,D,X){const G=X.G,P=X.P,s=Math.cos(a)>=0?1:-1;X.say('🐺 萬獸奔騰！',1.6);G.shake=12;(G.pets||[]).forEach(p=>{p.bf=6;p.st='wind';p.at=.1});
  const x0=P.x-s*420,x1=P.x+s*900;G.fx.push({k:'vbst',t:0,dur:1.6,drw(g,f){for(let i=0;i<8;i++){const k=Math.min(1,Math.max(0,(f.t-i*.08)/1.1)),x=x0+(x1-x0)*k,y=P.y+((i*29)%40)-20,c=vaWolf('run'+(Math.floor(f.t*12+i)%4),0);g.save();g.globalAlpha=.6*(1-Math.max(0,f.t-1.2)/.4);g.translate(x,y+FOmW);g.scale(s*2,2);g.drawImage(c,-c.width/2,-c.height);g.restore()}}});
  for(let i=0;i<10;i++)setTimeout(()=>{if(G.st!='play')return;const x=x0+(x1-x0)*(i/9);G.mobs.forEach(m=>{if(Math.abs(m.x-x)<70&&Math.abs(m.y-P.y)<150&&!m.capT)X.hitMob(m,D*.75,{el:'wind',fx:x-s*30,fy:m.y,kb:240})})},i*110)},
 u_druA1(a,D,X){X.teamHeal(.35);(X.G.pets||[]).forEach(p=>{p.hp=p.mhp;p.bf=4});X.P.shield=(X.P.shield||0)+X.P.mhp*.15;X.G.fx.push({k:'ring',x:X.P.x,y:X.P.y,r:260,t:0,dur:.7,c:'#9ae05a'});X.say('🌳 森之守護！',1.6)},
 u_druB0(a,D,X){X.plane(D,'root');X.say('🌲 森林之怒！',1.6)},
 u_druB1(a,D,X){const P=X.P;P.buff.heart=15;P.buff.anthem=Math.max(P.buff.anthem||0,15);if(!P.form)P.form='bear';X.say('💚 狂野之心！15 秒',1.6);X.G.fx.push({k:'ring',x:P.x,y:P.y,r:200,t:0,dur:.6,c:'#9ae05a'})}};
const FOmW=-4;
// 變身時的普攻
function vrFormAtk(X,a){const P=X.P,bear=P.form=='bear',mul=X.dmgMul()*(1+(vrPath()&&vrPath().k=='druB'?vrTR('p2')*.08:0))*(P.buff.heart>0?1.4:1);P.acd=bear?.55:.28;P.face=a;P.swing=.18;P.alt=!P.alt;
 X.slash(a,bear?2.6:1.6,bear?96:70,mul*(bear?1.5:.85),bear?'great':'dual',{kb:bear?220:60,c:bear?'#c8a060':'#9ae05a'})}
// 熊／狼的樣子
function vsBear(m){const st=m.st||'i';return vbGet('vsBear'+st,48,40,'#1a0e06',x=>{const C=['#7a4a2a','#a06a3a','#4a2a14','#c89a6a'],a=st=='a';
 _e(x,22,24,15,11,C[2]);_e(x,22,23,14,10,C[0]);_e(x,24,27,8,4,C[3]);[[12,34],[19,35],[28,35],[34,34]].forEach(([X,Y],i)=>{_r(x,X-3,Y-6,6,8,C[2]);_r(x,X-3,Y+1,6,2,'#2a1a0a')});
 _e(x,37,16,9,8,C[2]);_e(x,37,15,8,7,C[0]);_e(x,32,9,3,3,C[2]);_e(x,41,9,3,3,C[2]);_e(x,43,18,4,3,C[3]);_r(x,45,16,2,2,'#1a0a04');_r(x,38,13,2,2,'#1a0a04');
 if(a){_p(x,'#3a0a10',40,20,47,20,44,25);for(let i=0;i<3;i++)_l(x,'#fff',1,30+i*3,26,33+i*3,32)}
 _p(x,'#e8e0c8',30,6,32,0,34,6);_p(x,'#e8e0c8',39,5,42,0,43,6);_p(x,'#6aa83a',14,14,8,20,16,18)})}
// 主角變身時的繪圖
function vrDrawForm(g,P,G){const f=P.form;if(!f)return false;const s=Math.cos(P.face)>=0?1:-1,mv=Math.abs(P.vx||0)>10||P.mv;let c;
 if(f=='bear')c=vsBear({st:P.swing>0?'a':'i'});else c=vsWolf2({T:{ft:0},st:P.swing>0?'dash':mv?'run':'idle',ph:G.t,vx:mv?80:0,og:1});
 if(f=='wolf'&&!c._gr){c=vaTint(c,'#6ad04a',.35)}g.save();g.translate(P.x,P.y+18);g.scale(s*2.2,2.2);g.drawImage(c,-c.width/2,-c.height);g.restore();
 g.font='bold 11px sans-serif';g.textAlign='center';g.fillStyle='#c8ffb0';g.fillText(f=='bear'?'🐻 熊':'🐺 狼',P.x,P.y-52);return true}
// 恐龍骨頭頭冠＋樹葉斗篷（主角與哲良）
function vrDruidLook(g,x,y,face,sc){sc=sc||1;const s=Math.cos(face)>=0?1:-1;g.save();g.translate(x,y-20*sc);g.scale(s*sc,sc);
 g.fillStyle='#4a8a2a';g.beginPath();g.moveTo(-9,-30);g.quadraticCurveTo(-20,-6,-16,14);g.lineTo(-6,10);g.lineTo(-4,-26);g.fill();g.fillStyle='#6ab03a';for(let i=0;i<5;i++){g.beginPath();g.ellipse(-13+((i%2)*4),-22+i*8,5,3,.6,0,7);g.fill()}
 g.fillStyle='#3a7a1a';g.beginPath();g.ellipse(-2,-31,11,4,0,0,7);g.fill();
 g.fillStyle='#efe6cc';g.strokeStyle='#5a4a2a';g.lineWidth=1.2;g.beginPath();g.moveTo(-9,-44);g.quadraticCurveTo(0,-52,10,-44);g.lineTo(9,-41);g.quadraticCurveTo(0,-47,-8,-41);g.closePath();g.fill();g.stroke();
 [[-7,-46,-11,-58],[-1,-49,-2,-62],[5,-48,9,-59]].forEach(([a,b,c,d])=>{g.beginPath();g.moveTo(a-2,b);g.lineTo(c,d);g.lineTo(a+3,b);g.closePath();g.fill();g.stroke()});
 g.fillStyle='#1a1a1a';g.fillRect(8,-46,2,2);g.restore()}
// ───────── 哲良（小朱） ─────────
VPAL.zheliang={flee:['大家先閃！我在上面看得很清楚！','哇這招會死人欸，快跑！','我先撤，我是專業的高空人員！'],n:'哲良',cls:'druid',b:'totem',fr:'zheliang',line:'「我、我負責抓怪啦……大家不要看我……」',need:()=>true};
VLINE.zheliang={start:['好、好！我會努力的！','今天也要平安下班……啊不是，平安闖關！','先說好，我抓到的怪不准笑牠醜喔！','老哥，伴郎任務完成，現在換保鑣任務！'],
 elite:['這隻……看起來可以收編！','哇，菁英怪！我想要牠！'],boss:['這隻我抓不起來啦！大家加油！','比我在 30 樓外牆看到的還可怕……'],
 low:['欸欸欸我要掉下去了……','救、救命，我安全繩斷了！'],needheal:['誰幫我補一下……拜託……','我血在閃了！'],buffed:['喔喔！突然好有勁！','這個好讚，可以打一整場羽球！'],
 down:['我先……休息一下……','安全帽沒戴好……'],revive:['我回來了！謝謝大家～','復活！剛剛有人看到我很狼狽嗎？'],allydown:['{n}！撐住，我來了！','{n} 倒了！寵物上！'],
 alone:['只剩我……沒關係，我有寵物！'],clear:['收工！','好欸！晚上吃什麼？'],bosskill:['贏了！！我要唱一首慶祝！','這個要發限動！'],
 wipe:['全滅了……我請大家吃宵夜當安慰……','下次我們一定可以的！'],loot:['我抓到了！','哇這件好帥！'],
 idle:['等等打完要不要去吃牛肉湯？','你知道我工作的時候都在幾樓嗎？很高喔。','明天要不要打羽球？','嗯……我不是害羞，我只是在觀察。','這裡的怪比女生好相處多了……']};
VBANTER.push(['zheliang','老哥，我當伴郎那天都沒那麼緊張！','allen','你那天明明緊張到手在抖。'],['bokai','哲良，你寵物比你還會卡位欸！','zheliang','牠是跟你學的啦！'],['zheliang','打完我要唱一首給大家聽！','yuhao','那我們打慢一點好了。']);
const ZL_LK={...GL('casual',7171),fm:0,sk:'#b07a4a',hs:'s',hr:'#14100c',tp:'#ff8a2a',bt:'#3a4a5a',bd:1,ou:'t',ac:'',ht:0};

