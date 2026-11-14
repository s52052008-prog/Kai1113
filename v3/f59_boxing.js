/* v10.6 拳擊月賽 2.0：五位格鬥家（考克腿、鐵頭、獵豹、颱風、超級魔王），各有招式、弱點與絕招 */
const BXO=[[[91,11],[79,27],[89,12],[81,11],[107,29],[107,0],[109,0],[106,10],[77,70],[47,8],[73,0],[89,0]],[[75,11],[61,20],[58,12],[76,13],[77,2],[20,11],[62,8],[81,30],[28,0],[31,6],[33,0],[54,0]],[[110,6],[73,16],[64,6],[37,6],[90,43],[82,37],[59,0],[53,0],[86,22],[63,14],[48,18],[39,0]],[[80,9],[75,14],[47,9],[50,9],[120,0],[75,0],[34,0],[70,18],[54,10],[50,0],[42,6],[40,2]],[[70,12],[68,12],[55,8],[45,11],[59,65],[97,1],[96,3],[63,18],[60,7],[62,8],[44,17],[49,7]]];
// 招式步驟：f＝畫格、t＝秒數、hit＝傷害、gf＝護頭後剩下的比例、tel＝預告、inv＝無敵、vul＝破綻
const BXR={
 kk:{ci:0,n:'「考克腿」陳大山',sh:'考克腿',hp:210,wt:.5,dj:12,dk:20,P:{jab:.33,kick:.32,guard:.15,sp:.2},
  F:{idle:[0,3,7],wind:1,jab:2,knee:5,kick:6,guard:8,dodge:4,tired:4},
  sp:{n:'衝步上勾拳',seq:[{f:8,t:.75,tel:1},{f:9,t:.16},{f:10,t:.3,hit:34,gf:.5},{f:11,t:.5,vul:1}]},
  bio:'下半身特別發達的拳擊手，腳步又快又靈活、彈跳力驚人。上半身和防守都普通。',tip:'他常用腳踢，看到抬膝就要閃。蹲低蓄力是「衝步上勾拳」的前兆——一定要閃開！'},
 tt:{ci:1,n:'「鐵頭」林志強',sh:'鐵頭',hp:240,wt:.62,dj:13,dk:15,P:{jab:.33,kick:.12,guard:.38,sp:.17},
  F:{idle:[0,3,11,8],wind:1,jab:2,knee:4,kick:5,guard:6,dodge:9,tired:7},
  sp:{n:'金鐘罩鐵布衫',seq:[{f:9,t:.45,tel:1},{f:10,t:2.4,inv:1}]},
  bio:'平頭、健身房常客，斜方肌和腹肌超發達。總是護著頭，頭也硬得像石頭。',tip:'打頭沒什麼用！他的弱點是腿和膝蓋——用 L 低踢，踢三下他就會站不穩。發光時（金鐘罩）不要出拳。'},
 lb:{ci:2,n:'「獵豹」吳俊傑',sh:'獵豹',hp:220,wt:.45,dj:11,dk:15,P:{jab:.4,kick:.24,guard:.14,sp:.22},dodgeP:.4,
  F:{idle:[0,3],wind:1,jab:2,knee:6,kick:7,guard:3,dodge:[4,5],tired:0},
  sp:{n:'近身連打',seq:[{f:8,t:.6,tel:1},{f:9,t:.2,hit:9},{f:10,t:.2,hit:9},{f:9,t:.2,hit:9},{f:11,t:.28,hit:14},{f:3,t:.6,vul:1}]},
  bio:'金色長辮子、上半身滿是日式刺青。年輕時混過黑道，混不下去才改打拳，從此愛上擂台。',tip:'能力平均但非常會閃，出拳常常打空。連打時一直護頭就好，打完會喘一下——那是反擊的機會。'},
 tf:{ci:3,n:'「颱風」黃建宏',sh:'颱風',hp:300,wt:.72,dj:16,dk:22,P:{jab:.45,kick:.18,guard:.15,sp:.22},tiredP:.4,
  F:{idle:[0,3],wind:1,jab:2,knee:4,kick:5,guard:6,dodge:6,tired:7},
  sp:{n:'左右勾拳連彈',seq:[{f:8,t:.65,tel:1},{f:9,t:.25,hit:26,gf:.4},{f:10,t:.45},{f:11,t:.25,hit:26,gf:.4},{f:7,t:1,vul:1}]},
  bio:'美台混血，身材高大、全身肌肉，側腹肌和鯊魚肌清清楚楚。體力驚人，但移動比較慢。',tip:'第一回合他最兇，先拉開距離、多閃少打。後面體力會掉，看到他垂下手喘氣就全力進攻！'},
 mw:{ci:4,n:'「超級魔王」頌猜',sh:'超級魔王',hp:340,wt:.42,dj:15,dk:21,P:{jab:.4,kick:.24,guard:.14,sp:.22},readP:.4,
  F:{idle:[0,3,11],wind:1,jab:2,knee:5,kick:6,guard:3,dodge:[4,7],tired:4},
  sp:{n:'逆拳下擊',seq:[{f:8,t:.4,tel:1},{f:9,t:.55},{f:10,t:.3,hit:40,gf:1},{f:11,t:.5,vul:1}]},
  bio:'來自泰國的神秘男子，曾經的拳王。骨骼驚奇、耐力強、出拳猛，好像能預知你的下一步。',tip:'他會看穿你的出拳然後反擊，不要亂打。弱點在正中間——J 刺拳特別有效。「逆拳下擊」護頭擋不住，只能閃！'}};
const BXORD=['kk','tt','lb','tf'];
const bxS=()=>st.bxr||(st.bxr={beat:[],king:0});
function bxNext(){const S=bxS(),k=BXORD.find(k=>!S.beat.includes(k));if(k)return k;if(!S.king)return'mw';return['kk','tt','lb','tf','mw'][wkN()%5]}
const bxImg=(o,f)=>UAI['pk49_'+(BXR[o].ci*12+f)];
const bxUrl=o=>{try{return UA['pk49_'+BXR[o].ci*12]}catch(e){return''}};
function bxDraw(g,o,f,cx,base,s,shake){const im=bxImg(o,f);if(!im||!im.naturalWidth)return;const off=BXO[BXR[o].ci][f],k=s/.6;
 g.drawImage(im,cx+(off[0]-181)*s+(shake||0),base+(off[1]-362)*s,im.naturalWidth*k,im.naturalHeight*k)}
function bxCard(o){const R=BXR[o];return `<div style="display:flex;gap:10px;align-items:center"><img src="${bxUrl(o)}" style="width:76px;height:auto;image-rendering:pixelated;flex:none"><div><b>${R.n}</b><br><span style="font-size:12px">${R.bio}</span><br><span style="font-size:12px;color:#8a3a10">💡 ${R.tip}</span><br><span style="font-size:12px">絕招：<b>${R.sp.n}</b></span></div></div>`}
// ───────── 比賽結果 ─────────
function boxEnd(win,o){const b=st.box;b.done=1;o=o||bxNext();const S=bxS(),R=BXR[o];
 if(win){if(!S.beat.includes(o))S.beat.push(o);const boss=o=='mw'&&!S.king;if(o=='mw')S.king=1;
  st.money+=30000+(boss?50000:0);st.earned=(st.earned||0)+30000+(boss?50000:0);fxApply({r:boss?40:20,j:30,h:-20,s:-40});addItem('belt',1);hud();
  if(boss)try{feedPost('👑 打倒超級魔王！','擂台上的傳說「超級魔王」頌猜，被我打倒了！老婆在台下哭得比我還兇。',null)}catch(e){}
  openDlg(boss?'👑 新的拳王誕生！':'🏆 冠軍！',(boss?'頌猜躺在擂台上，笑著朝你舉起拳套：「你……是真正的拳王。」<br>全場起立鼓掌，家宜在台下哭成淚人兒。<br>💰 冠軍獎金 +30000、拳王獎金 +50000　⭐ 聲望 +40':`裁判舉起你的手，全場歡呼！你打敗了 <b>${R.n}</b>。<br>💰 冠軍獎金 +30000　⭐ 聲望 +20`)+'<br>🏆 獲得冠軍腰帶<br>❤️ 雖然贏了，身上也掛了不少彩。'+
   (!boss&&o!='mw'&&BXORD.every(k=>S.beat.includes(k))&&!S.king?'<br><br>📣 主辦單位宣布：下個月，傳說中的「超級魔王」將從泰國來台挑戰你！':''),[['🏆','',closeDlg]])}
 else{fxApply({h:-50,s:-60,j:-15,r:2});st.money-=1500;b.inj=wkN()+1;hud();openDlg('💥 落敗',`你輸給了 <b>${R.n}</b>。在診所縫了三針、照了 X 光。<br>❤️ 健康 -50　💸 醫藥費 -1500<br>下個週末身體還在恢復，體力會比較差。<br><span class="text-[12px] opacity-80">教練：「${R.tip.split('！')[0]}。下個月再來。」</span>`,[['……','',closeDlg]])}}
// ───────── 自動比賽 ─────────
function boxAuto(o){closeDlg();advance(3);const R=BXR[o],win=Math.random()<boxP()*(o=='mw'?.6:1);
 const T=win?[`第一回合：${R.sh}一開始就壓著你打，你護住頭部撐了下來。`,`第二回合：他使出「${R.sp.n}」——你看穿了！閃開之後一記右直拳命中！`,'第三回合：你把兩個週末的汗水全部打出去——他倒在擂台上，裁判數到十！']:[`第一回合：${R.sh}的速度比你想像的快，你的眼角馬上腫了起來。`,`第二回合：「${R.sp.n}」！你來不及反應，整個人飛了出去。`,'第三回合：重拳迎面而來，眼前一黑……醒來時，你已經躺在擂台上。'];
 let i=0;const next=()=>{if(i<3){const t=T[i++];return openDlg(`🥊 vs ${R.sh} 第 ${i} 回合`,t,[['▶','',next]])}boxEnd(win,o)};next()}
// ───────── 即時對打 ─────────
function boxRT(o){o=o||bxNext();const R=BXR[o],cond=boxCond();advance(3);closeDlg();
 const M=mgBox('🥊 拳擊月賽 vs '+R.n),g=M.g,W2=720,H2=520,sl=.85+cond/100*.35;
 const S={rd:1,rt:45,pause:1.6,msg:'第 1 回合！',mt:1.6,done:false,pts:[0,0],gap:0,shake:0,
  P:{hp:100+cond*.6,mx:100+cond*.6,en:100,act:'',at:0,stun:0},
  E:{hp:R.hp,mx:R.hp,st:'idle',t:1.2,f:0,hit:0,legs:0,seq:null,si:0,it:0}};window.__mg=S;
 const E=S.E,P=S.P,fr=k=>{const v=R.F[k];return Array.isArray(v)?v[Math.floor(Math.random()*v.length)]:v};
 const setE=(s,t,f)=>{E.st=s;E.t=t;E.f=f!=null?f:E.f};
 const vul=()=>E.st=='tired'||(E.seq&&E.seq[E.si]&&E.seq[E.si].vul);
 const ok=()=>!S.done&&S.pause<=0&&P.stun<=0&&!P.act;
 const COST={j:12,k:22,l:18},WIND={j:.2,k:.42,l:.38};
 const act=k=>{if(!ok())return;if(P.en<COST[k]){S.msg='沒力了……先護頭喘口氣';S.mt=.6;return}P.en-=COST[k];P.act=k;P.at=WIND[k];
  // 魔王看穿：你一出拳他就閃開反擊
  if(o=='mw'&&(E.st=='idle'||E.st=='guard')&&Math.random()<R.readP){setE('read',.32,R.F.dodge[1]);S.msg='他看穿了！';S.mt=.6}
  if(o=='lb'&&(E.st=='idle'||E.st=='guard')&&k!='l'&&Math.random()<R.dodgeP){setE('dodge',.42,fr('dodge'))}};
 const guard=on=>{if(S.done)return;if(on&&ok()){P.act='g';P.at=99}else if(!on&&P.act=='g'){P.act='';P.at=0}};
 const dodge=()=>{if(!ok()||P.en<10)return;P.en-=10;P.act='d';P.at=.4};
 const kd=e=>{const k=e.key.toLowerCase();if(k=='j'||k=='z'){e.preventDefault();act('j')}else if(k=='k'||k=='x'){e.preventDefault();act('k')}else if(k=='l'||k=='c'){e.preventDefault();act('l')}else if(k=='s'||k=='arrowdown'||k==' '){e.preventDefault();guard(1)}else if(['a','d','arrowleft','arrowright'].includes(k)){e.preventDefault();dodge()}};
 const ku=e=>{const k=e.key.toLowerCase();if(k=='s'||k=='arrowdown'||k==' ')guard(0)};OVK.add(kd);OVKU.add(ku);
 mgBtn(M,[['👊 刺拳',()=>act('j')],['💥 勾拳',()=>act('k')],['🦵 低踢',()=>act('l')],['🛡️ 護頭',()=>guard(1),()=>guard(0)],['↔ 閃躲',dodge]]);
 M.tip.innerHTML=`J 刺拳・K 勾拳・L 低踢・按住 S 護頭・A/D 閃躲<br>對手頭上 <b>❗</b> 要出拳、<b>‼️</b> 是絕招——閃開後馬上反擊，傷害更高！`;
 const fin=win=>{if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);
  g.fillStyle='rgba(20,10,5,.82)';g.fillRect(0,0,W2,H2);mgTxt(g,win?'🏆 你贏了！':'💥 你輸了……',W2/2,220,'bold 52px sans-serif',win?'#ffd84a':'#ff8a7a');
  mgTxt(g,E.hp<=0?'K.O.！':P.hp<=0?'被擊倒了':'裁判判定',W2/2,280,'24px sans-serif','#fff');
  mgButtons(M,[['繼續',()=>{M.end();boxEnd(win,o)}]])};
 // 打到對手
 const hitE=a=>{let d={j:7,k:16,l:12}[a]*(.85+Math.random()*.3),m='';
  if(E.st=='inv'){P.hp-=3;P.en=Math.max(0,P.en-15);S.shake=.15;S.msg='金鐘罩！打不動，手好痛';S.mt=.7;return}
  if(E.st=='dodge'||E.st=='read'){S.msg=o=='lb'?'被他閃開了！':'打空了！';S.mt=.5;return}
  if(E.st=='guard'&&!S.gap){if(a=='l'){d*=.8;m='低踢穿過防守！'}else{d*=.15;m='被擋住了'}}
  if(o=='tt'){if(a=='l'){d*=1.8;E.legs++;m='膝蓋被踢中！';if(E.legs>=3&&E.st!='tired'){E.legs=0;E.seq=null;setE('tired',1.8,R.F.tired);m='💫 他站不穩了！快打！'}}else if(!vul())d*=.5}
  if(o=='mw'&&a=='j')d*=1.6;
  if(S.gap>0){d*=1.6;m='💥 反擊命中！'}if(vul())d*=1.6;
  if(E.st=='wind'&&a=='j'){setE('idle',.8*sl,fr('idle'));m=m||'打斷了他的出拳！'}
  E.hp=Math.max(0,E.hp-d);E.hit=.22;S.pts[0]+=d;if(m){S.msg=m;S.mt=.6}if(E.hp<=0)setTimeout(()=>fin(true),500)};
 // 打到你
 const hitP=(dmg,gf)=>{gf=gf==null?.25:gf;if(o=='tf'&&S.rd==1)dmg*=1.25;
  if(P.act=='d'){S.gap=.75;S.msg='閃過了！快反擊！';S.mt=.8;return}
  if(P.act=='g'){const d2=dmg*gf;P.hp-=d2;S.pts[1]+=d2;P.en=Math.max(0,P.en-dmg*.8);S.msg=gf>=1?'防守被打穿了！':'擋住了';S.mt=.5;if(gf>=1||P.en<=0){P.act='';P.stun=.7;S.shake=.3}}
  else{P.hp-=dmg;S.pts[1]+=dmg;S.shake=.28;P.act='';P.stun=dmg>18?.6:.25}
  if(P.hp<=0){P.hp=0;setTimeout(()=>fin(false),500)}};
 // 對手的大腦
 const think=()=>{if(E.seq){const st0=E.seq[E.si];if(st0.hit)hitP(st0.hit,st0.gf);E.si++;const nx=E.seq[E.si];if(!nx){E.seq=null;return setE('idle',(.5+Math.random()*.6)*sl,fr('idle'))}
   if(nx.inv)setE('inv',nx.t,nx.f);else setE('sp',nx.t*(nx.hit?1:sl),nx.f);return}
  switch(E.st){
   case'wind':setE('strike',.22,R.F.jab);return hitP(R.dj);
   case'knee':setE('kick',.26,R.F.kick);return hitP(R.dk);
   case'read':setE('wind',.26,R.F.wind);return;
   case'strike':case'kick':if(R.tiredP&&S.rd>=2&&Math.random()<R.tiredP)return setE('tired',1.3,R.F.tired);
   default:{const r=Math.random(),Q=R.P;
    if(r<Q.sp){E.seq=R.sp.seq;E.si=0;const s0=E.seq[0];setE(s0.inv?'inv':'sp',s0.t*sl,s0.f);if(s0.tel){S.msg='‼️ '+R.sp.n+'！';S.mt=1}}
    else if(r<Q.sp+Q.jab)setE('wind',R.wt*sl,R.F.wind);
    else if(r<Q.sp+Q.jab+Q.kick)setE('knee',(R.wt+.12)*sl,R.F.knee);
    else if(r<Q.sp+Q.jab+Q.kick+Q.guard)setE('guard',.8+Math.random()*.8,R.F.guard);
    else setE('idle',(.4+Math.random()*.6)*sl,fr('idle'))}}};
 let last=performance.now(),it=0;
 const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.mt-=dt;S.shake=Math.max(0,S.shake-dt);E.hit=Math.max(0,E.hit-dt);
  if(S.pause>0)S.pause-=dt;else{S.rt-=dt;S.gap=Math.max(0,S.gap-dt);if(P.stun>0)P.stun-=dt;
   P.en=Math.min(100,P.en+dt*(P.act=='g'?20:13)*(.8+cond/250));
   if(P.act&&P.act!='g'){P.at-=dt;if(P.at<=0){const a=P.act;P.act='';if(a!='d')hitE(a)}}
   E.t-=dt;if(E.t<=0)think();
   if(E.st=='idle'){it+=dt;if(it>.7){it=0;E.f=fr('idle')}}
   if(S.rt<=0){if(S.rd>=3){fin(S.pts[0]+P.hp*.3>S.pts[1]+E.hp*.25)}else{S.rd++;S.rt=45;S.pause=2;P.en=100;P.hp=Math.min(P.mx,P.hp+12);E.hp=Math.min(E.mx,E.hp+8);E.seq=null;setE('idle',1.2,fr('idle'));S.msg='第 '+S.rd+' 回合！';S.mt=1.8}}}
  // 擂台
  const sx=S.shake>0?(Math.random()-.5)*14:0;g.save();g.translate(sx,0);
  g.fillStyle='#1a1428';g.fillRect(-20,0,W2+40,H2);const sp=g.createRadialGradient(W2/2,120,20,W2/2,200,420);sp.addColorStop(0,'rgba(255,240,200,.18)');sp.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sp;g.fillRect(0,0,W2,H2);
  g.fillStyle='#3a2a50';g.fillRect(-20,360,W2+40,H2-360);for(let i=0;i<3;i++){g.fillStyle=['#e04030','#fff','#2f6ad0'][i];g.fillRect(-20,250+i*26,W2+40,5)}
  // 對手
  const big=E.st=='strike'||E.st=='kick'||(E.seq&&E.seq[E.si]&&E.seq[E.si].hit),sc=big?1.2:1.12,hx=E.hit>0?(Math.random()-.5)*12:0;
  if(E.st=='inv'){g.save();g.shadowColor='#ffd84a';g.shadowBlur=30;bxDraw(g,o,E.f,W2/2,515,sc,hx);g.restore()}else bxDraw(g,o,E.f,W2/2,515,sc,hx);
  if(E.hit>0)mgTxt(g,'💥',W2/2+hx+40,200,'bold 46px sans-serif');
  if(E.st=='wind'||E.st=='knee')mgTxt(g,'❗',W2/2,96,'bold 48px sans-serif','#ffd84a');
  if(E.seq&&E.seq[E.si]&&E.seq[E.si].tel)mgTxt(g,'‼️',W2/2,96,'bold 52px sans-serif','#ff5a4a');
  if(vul())mgTxt(g,'⚡ 破綻！',W2/2,140,'bold 28px sans-serif','#7dff9a');
  // 你的拳套（第一人稱）
  const gl=(x,y,r)=>{g.fillStyle='#c81e1e';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='rgba(255,255,255,.25)';g.beginPath();g.arc(x-r*.3,y-r*.3,r*.35,0,7);g.fill()};
  const dx=P.act=='d'?-170:0;g.globalAlpha=P.stun>0?.5:1;
  if(P.act=='l'){g.fillStyle='#d79a72';g.fillRect(W2/2+40+dx,380,40,140);g.fillStyle='#222';g.fillRect(W2/2+36+dx,380,48,30)}
  if(typeof glDraw=='function'&&UAI['pk63_13']){const pr=P.act=='j'?1-Math.max(0,P.at)/.2:P.act=='k'?1-Math.max(0,P.at)/.42:0,out=pr<.6?pr/.6:1;
   if(P.act=='g')glDraw(g,'guard',W2/2+dx,H2+20,2.6);
   else{if(P.act=='j')glDraw(g,out>.4?'jabL':'windL',W2/2-150+dx+out*110,H2+10-out*170,2.5-out*.7);else glDraw(g,'idleL',W2/2-180+dx,H2+40,2.4);
    if(P.act=='k')glDraw(g,out>.4?'hookR':'windR',W2/2+180+dx-out*170,H2+10-out*190,2.6-out*.5);else glDraw(g,'idleR',W2/2+180+dx,H2+40,2.4)}}
  else{gl(W2/2-150+dx+(P.act=='j'?110:0),P.act=='g'?330:P.act=='j'?250:440,P.act=='j'?54:44);gl((P.act=='k'?W2/2+60:W2/2+150)+dx,P.act=='k'?240:P.act=='g'?330:440,P.act=='k'?58:44)}g.globalAlpha=1;
  g.restore();
  // 狀態列
  const bar=(x,v,mx,c,lb,al)=>{g.fillStyle='#000';g.fillRect(x,16,280,20);g.fillStyle=c;const w=276*Math.max(0,v)/mx;g.fillRect(al?x+2+276-w:x+2,18,w,16);mgTxt(g,lb,al?x+280:x,54,'bold 15px sans-serif','#fff',al?'right':'left')};
  bar(20,P.hp,P.mx,'#4ad06a','你 ❤️'+Math.ceil(P.hp));bar(W2-300,E.hp,E.mx,'#ff5a4a',R.sh+' ❤️'+Math.ceil(E.hp),1);
  g.fillStyle='#000';g.fillRect(20,62,160,10);g.fillStyle='#ffd84a';g.fillRect(21,63,158*P.en/100,8);mgTxt(g,'體力',190,72,'12px sans-serif','#ffd84a','left');
  mgTxt(g,`第 ${S.rd} 回合　${Math.max(0,Math.ceil(S.rt))}`,W2/2,32,'bold 22px sans-serif','#fff');
  if(S.gap>0)mgTxt(g,'⚡ 反擊時機！',W2/2,180,'bold 30px sans-serif','#7dff9a');
  if(S.mt>0&&S.msg)mgTxt(g,S.msg,W2/2,H2-24,'bold 26px sans-serif','#fff');requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// ───────── 上場前：介紹對手 ─────────
boxFight=function(){const o=bxNext(),p=Math.round(boxP()*(o=='mw'?.6:1)*100),c=boxCond();
 openDlg('🥊 拳擊月賽：今晚的對手',bxCard(o)+`<br>備賽狀態：<b>${c}%</b>（狀態越好，血量越多、對手越慢）`,[['🥊 親自上場（即時對打）','J 刺拳・K 勾拳・L 低踢・S 護頭・A/D 閃躲（手機有按鈕）',()=>boxRT(o)],['📜 讓比賽自己進行','依備賽狀態自動判定（勝率約 '+p+'%）',()=>boxAuto(o)]])};
// 擂台選單：顯示下一位對手、戰績
{const _fm=fightMenu;fightMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t.includes('拳擊月賽')&&Array.isArray(opts)){const S=bxS(),o=bxNext();
  d+=`<br><br><b>下一位對手</b>${S.king?'（你是現任拳王）':''}<br>`+bxCard(o)+`<br><span style="font-size:12px">戰績：${['kk','tt','lb','tf','mw'].map(k=>(S.beat.includes(k)?'✅':'⬜')+BXR[k].sh).join('　')}</span>`;
  opts.splice(opts.length-1,0,['📖 格鬥家圖鑑','五位對手的資料',()=>openDlg('📖 格鬥家圖鑑',['kk','tt','lb','tf','mw'].map(k=>k=='mw'&&!S.beat.includes('mw')&&!BXORD.every(q=>S.beat.includes(q))?'<b>？？？</b><br><span style="font-size:12px">打敗前四位對手之後才會出現……</span>':bxCard(k)).join('<hr style="margin:8px 0;opacity:.3">'),[['返回','',fightMenu]])])}
 return od.call(this,t,d,opts,...r)};try{return _fm.apply(this,arguments)}finally{openDlg=od}}}
