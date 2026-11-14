/* ===== v9：人物外觀（更多髮型・服裝・配件・動作） ===== */
const SKT=['#f6d3b0','#f1c08f','#e0a878','#c68642','#8d5524'],HC=['#2b1d14','#5a3a1a','#8a4a1a','#c9a06a','#111','#6b2a1a','#3a2a4a'];
const hsh=s=>{let h=7;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))>>>0;return h};
const RL=[[/廚師/,{ou:'c',tp:'#f4efe0',ht:'c',bd:1}],[/護士/,{ou:'n',tp:'#f6a8c0',ht:'n',fm:1,hs:'p'}],[/醫生/,{ou:'u',tp:'#f4f8fa',ac:'g',hs:'s'}],[/服務生/,{ou:'v',hs:'s',bd:2}],
 [/老闆娘/,{ou:'a',fm:1,hs:'b',bd:1}],[/老闆/,{ou:'a',bd:1,ac:'m',ht:0}],[/房東太太/,{fm:1,hs:'b',hr:'#d8d8d8',ac:'g',bd:1,ou:'e'}],[/貓奶奶/,{fm:1,hs:'b',hr:'#e0e0e0',ac:'gc',bd:1,ou:'e',sc:.7}],
 [/里長/,{ou:'z',hr:'#e8e8e8',hs:'e',ac:'bg',bd:1,tp:'#7b5e3b',sc:.72}],[/小花/,{ou:'d',fm:1,hs:'l',hr:'#6b3a1a',sk:'#f6d3b0',bd:2}],[/神秘老頭/,{ou:'v',ac:'m',hs:'s',ht:'a',hc:'#d9b45a'}],[/農夫|牧羊|農婦/,{ou:'o',ac:'b',bd:1,tp:'#c9a06a',bt:'#4a6a9a',ht:'a',hc:'#d9b45a'}],
 [/阿寶/,{bd:3,hs:'m',sho:1}],[/教練/,{ac:'k',hs:'s',bd:1,sho:1,ou:'y',tp:'#d62828'}],[/拳手/,{ou:'b',sho:1,hs:'s',bd:1,bt:'#222'}],[/健身客|運動員/,{ou:'y',sho:1,bd:1,ac:'k'}],[/學徒|技師|黑手/,{ou:'a',bd:1,ac:'b',ht:'h',hc:'#2f80ed'}],
 [/售票員|收銀員|店員|櫃員/,{ou:'v'}],[/櫃檯小姐/,{ou:'v',fm:1,hs:'b',bd:2}],[/行李員/,{ou:'v',ht:'h',hc:'#c0392b'}],[/讀者/,{ac:'g'}],[/攤販阿姨/,{ou:'a',fm:1,hs:'b',bd:1}],[/洗碗小弟/,{ou:'a',hs:'m',bd:2}],[/採收工/,{ou:'o',ht:'a',hc:'#d9b45a',tp:'#8fd6a5',bt:'#4a6a9a'}],
 [/警員|警察|巡佐|員警/,{ou:'q',tp:'#2a4a8a',bt:'#1c2f5a',ht:'p',bd:1,sh:'#111'}],[/導護|交通警/,{ou:'q',tp:'#2a4a8a',bt:'#1c2f5a',ht:'p',bd:1,sh:'#111',ac:'s'}],[/老師/,{ou:'t',ac:'g',hs:'k',fm:1}],[/髮型師|設計師/,{ou:'a',tp:'#2a2a2a',hs:'h',ac:'g'}],[/理專|行員/,{ou:'z',tp:'#2b3a55',ac:'g'}],[/廟祝/,{ou:'j',hr:'#ddd',hs:'e',ac:'b',tp:'#e8e0c8',sc:.72}]];
function lookFor(n){if(n.lk)return n.lk;const h=hsh(n.n+(n.x|0)),fmr=(h>>>5)&1,L={sk:SKT[h%5],hr:/^#[b-f]/.test(n.hair||'')?n.hair:HC[(h>>>3)%7],fm:fmr,tp:n.c||'#2f80ed',bt:['#3b4a63','#4a4a56','#6b4a2a','#2a3a5a'][(h>>>9)%4],sh:['#3a2a1a','#222','#7a3a2a'][(h>>>11)%3],ou:'t',bd:[0,1,2][(h>>>14)%3],ac:'',ht:0,hc:'#8a5a2e',sho:0},
 rl=(RL.find(r=>r[0].test(n.n))||[0,{}])[1];Object.assign(L,rl);
 if(!L.hs)L.hs=L.fm?['l','p','b','l','k'][(h>>>7)%5]:['s','m','s','x','h'][(h>>>7)%5];
 if(!('ht' in rl)&&n.hat){L.ht='a';L.hc=n.hat}
 if(!rl.ou&&L.fm&&(h>>>13)&1)L.ou='d';
 if(n.kid)L.bd=3;return n.lk=L}
const ALLEN={sk:'#f1c08f',hr:'#2b1d14',hs:'s',fm:0,tp:'#2f80ed',bt:'#3b4a63',sh:'#fff',ou:'h',bd:0,ac:'',ht:0,hc:'',sho:0,sc:.76};
const SUR='陳林黃張李王吳劉蔡楊許鄭謝郭洪曾邱廖賴周徐蘇葉莊呂江何蕭羅高潘朱',BRI=['#e0443a','#2f80ed','#f2c230','#2a9d5c','#e0679a','#8a5aa8','#f0932b','#17a2b8','#fff','#222','#6c757d','#b5533c'],
 SUIT=['#2b3a55','#3a3a3a','#4a4a5a','#5a4a3a','#27384a'],PNT=['#3b4a63','#2a2a2a','#4a4a56','#6b5a3a','#2a3a5a','#7a6a50'];
const pick=(a,r)=>a[(r()*a.length)|0];
function genLook(kind,seed){let t=(seed*2654435761)>>>0;const r=()=>(t=(t*1664525+1013904223)>>>0)/4294967296;
 const fm=r()<.5?1:0,L={sk:pick(SKT,r),hr:pick(HC,r),fm,tp:pick(BRI,r),bt:pick(PNT,r),sh:pick(['#3a2a1a','#222','#7a3a2a','#fff','#c0392b'],r),ou:'t',bd:(r()*3)|0,ac:'',ht:0,hc:pick(BRI,r),sho:0,hs:fm?pick(['l','p','b','k','c','l'],r):pick(['s','m','s','x','h','c','s'],r)},nm=sf=>SUR[(r()*SUR.length)|0]+sf;
 let name,role;
 switch(kind){
 case'office':role='上班族';L.ou=fm&&r()<.5?'d':'z';L.tp=pick(SUIT,r);if(fm)L.tp=pick(['#c9506a','#4a5a8a','#2a6a5a','#7a4a6a','#2b3a55'],r);L.bt=pick(['#222','#2b3a55','#3a3a3a'],r);if(r()<.4)L.ac+='g';if(r()<.25)L.ac+='x';if(!fm&&r()<.2)L.hs='s';name=nm(fm?'小姐':'先生');break;
 case'student':role='學生';L.ou='s';L.tp='#f4f4f4';L.bt='#243a6e';L.ac='p';L.bp=pick(['#d9452f','#2f80ed','#f2c230','#2a9d5c','#e0679a'],r);L.sh='#fff';if(r()<.3)L.ac+='g';L.hs=fm?pick(['p','k','l','b'],r):pick(['s','m','h','s','m'],r);if(!fm&&r()<.4)L.hr=pick(['#e8d27a','#c0392b','#e8e8e8','#5a8ac0','#d98a3a'],r);L.hc='#fff';name=nm('同學');break;
 case'kid':role='小朋友';L.bd=3;L.tp=pick(BRI,r);L.hs=fm?pick(['p','b'],r):pick(['m','s'],r);L.ou=fm?'d':'t';if(r()<.5)L.ac='p',L.bp=pick(BRI,r);name='小'+pick(['明','華','美','安','寶','豪','珊','翔'],r);break;
 case'elder':role=fm?'阿嬤':'阿公';L.ou='e';L.sc=.7;L.hr=pick(['#e0e0e0','#cfcfcf','#b8b8b8','#a8a8a8'],r);L.hs=fm?pick(['b','k','p'],r):pick(['e','x','e','s'],r);L.tp=pick(['#8a6a4a','#6a8a6a','#7a7aa0','#a07a7a','#c9b48a'],r);L.bt=pick(['#4a4a56','#5a4a3a','#3b4a63'],r);if(r()<.5)L.ac+='g';if(r()<.45)L.ac+='c';if(!fm&&r()<.5){L.ht=pick(['f','a'],r);L.hc=pick(['#d9b45a','#6a6a5a','#8a6a4a'],r)}if(!fm&&r()<.25)L.ac+='b';L.bd=r()<.5?1:2;name=SUR[(r()*SUR.length)|0]+role;break;
 case'tourist':role='遊客';L.ou=fm&&r()<.5?'d':'t';L.tp=pick(['#ff9a3a','#2fb8d8','#ff6a8a','#8ae04a','#f2c230'],r);L.ht=pick(['a','h','a',0],r);L.hc=pick(BRI,r);L.ac=(r()<.5?'s':'')+'p';L.bp=pick(BRI,r);name='旅客'+SUR[(r()*SUR.length)|0]+(fm?'小姐':'先生');break;
 case'jogger':role='運動員';L.ou='y';L.sho=1;L.tp=pick(['#e0443a','#2f80ed','#f2c230','#2a9d5c','#ff6aa0','#fff'],r);L.bt=pick(['#222','#2b3a55','#3a3a3a'],r);L.ac=pick(['k','e','ke',''],r);L.hc=pick(BRI,r);L.hs=fm?pick(['p','p','b'],r):pick(['s','m','h'],r);L.hbc=pick(BRI,r);name=nm('同學');name=SUR[(r()*SUR.length)|0]+(fm?'小姐':'先生');break;
 case'worker':role='師傅';L.ou='r';L.ht='u';L.hc=pick(['#f2c230','#fff','#ff9a3a'],r);L.tp='#ff8a2a';L.bt='#3b4a63';L.bd=1;L.fm=0;L.hs='s';if(r()<.4)L.ac='b';name=SUR[(r()*SUR.length)|0]+'師傅';break;
 case'police':role='警員';L.ou='q';L.tp='#2a4a8a';L.bt='#1c2f5a';L.ht='p';L.sh='#111';L.bd=1;L.hs=fm?'p':'s';if(r()<.3)L.ac='s';name=SUR[(r()*SUR.length)|0]+'警員';break;
 default:role='路人';L.ou=fm?(r()<.55?'d':'t'):(r()<.35?'h':'t');L.tp=pick(BRI,r);if(r()<.28)L.ac+='g';if(r()<.2)L.ac+='x';if(r()<.2)L.ac+='e';if(r()<.2)L.ac+='p',L.bp=pick(BRI,r);if(r()<.18)L.ht=pick(['h','b'],r),L.hc=pick(BRI,r);name=nm(fm?'小姐':'先生')}
 if(kind!='elder'&&kind!='kid'&&r()<.35)L.sc=.72+r()*.1;
 return{lk:L,name,role}}
function drawLying(c,o){const L=o.lk,ph=o.ph||0,O='#2a1a10',lift=Math.max(0,Math.sin(ph*2.2))*4;c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8));c.fillStyle='rgba(50,25,0,.3)';c.beginPath();c.ellipse(0,0,15,3.4,0,0,7);c.fill();c.scale(.75,.75);
 const r=(x,y,w,h,col)=>{R(c,x-1,y-1,w+2,h+2,O);R(c,x,y,w,h,col)},q=(x,y,w,h,col)=>R(c,x,y,w,h,col);
 r(-16,-8,10,4,L.bt);r(-18,-4,4,4,L.sh||'#222');r(-6,-10,16,7,L.tp);r(10,-10,7,7,L.sk);q(11,-9,5,2,L.hr);
 r(6,-18-lift,3,9,L.sk);r(-9,-18-lift,3,9,L.sk);r(-24,-20-lift,48,3.2,'#aab0b6');r(-27,-25-lift,5,13,'#222');r(22,-25-lift,5,13,'#222');q(-26,-26-lift,3,15,'#444');q(23,-26-lift,3,15,'#444');
 c.restore()}
function drawCharProc(c,o){
 const L=o.lk,m=o.mv,f=o.fr,dr=o.dir,ps=o.pose||'',ph=o.ph||0,sd=dr==2||dr==3,dg=dr>3,bk=dr==1||dr==6||dr==7,ou=L.ou,fm=L.fm,dress=ou=='d'||ou=='n'||(ou=='s'&&fm),O='#2a1a10',sk=L.sk,hr=L.hr,tp=L.tp,bt=L.bt,hs=L.hs,ac=L.ac||'',has=ch=>ac.includes(ch),sit=o.sit,bd=L.bd,
  tw=sd?(bd==1?10.4:bd==2?7.6:8.8):(bd==1?13:bd==2?9.2:11),shc=L.sh||'#3a2a1a',skd=shade(sk,-22);
 c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8));
 c.fillStyle='rgba(50,25,0,.3)';c.beginPath();c.ellipse(0,0,sit?6.5:8.4,sit?2.2:3,0,0,7);c.fill();
 if(dr==2||dr==4||dr==6)c.scale(-1,1);const S=L.sc||(L.bd==3?.6:.78);c.scale(S,S);
 let by=m&&f?-.8:0;if(ps=='squat')by=Math.abs(Math.sin(ph*3))*3;else if(ps=='rope')by=-Math.abs(Math.sin(ph*7))*3.5;else if(ps=='pull')by=-5-Math.abs(Math.sin(ph*2.4))*5;else if(ps=='dribble')by=Math.abs(Math.sin(ph*5))*.8;else if(sit)by=3;c.translate(0,by);
 c.lineJoin='round';c.lineCap='round';
 const fo=(col,lw)=>{c.fillStyle=col;c.fill();c.strokeStyle=O;c.lineWidth=lw||1.1;c.stroke()};
 const ell=(x,y,rx,ry,col,lw)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);fo(col,lw)};
 const cap=(x1,y1,x2,y2,w,col)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=O;c.lineWidth=w+1.3;c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke()};
 const capn=(x1,y1,x2,y2,w,col)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=col;c.lineWidth=w;c.stroke()};
 const rr=(x,y,w,h,r,col,lw)=>{c.beginPath();c.roundRect(x,y,w,h,r);fo(col,lw)};
 const pg=(pts,col,lw)=>{c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath();fo(col,lw)};
 const hl=(x,y,rx,ry,a)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle='rgba(255,255,255,'+(a||.22)+')';c.fill()};
 const sw=m?(f?3:-3):0;
 const jk=ou=='s'&&!fm?shade(bt,-6):ou=='z'||ou=='q'||ou=='u'||ou=='c'||ou=='e'||ou=='h'||ou=='j'?tp:tp;
 const longSl=({h:1,z:1,u:1,c:1,e:1,q:1,j:1,v:1,s:fm?0:1}[ou])||0,bare=ou=='k'||ou=='b';
 const slc=ou=='s'&&!fm?jk:ou=='b'?sk:tp;
 // ── 背包（背面）──
 if(L.bp&&bk)rr(-tw/2-1.6,-23,tw+3.2,14,3,L.bp);
 // ── 腿／褲／裙 ──
 const legC=(dress||ou=='b'||L.sho)?sk:bt;
 const leg=(x,l,fw)=>{cap(x,-10.5,x+(sd?(x>0?.4:-.4):0),-2.6-l,3.9,legC);
  if(ou=='s'&&fm){capn(x,-5.4-l,x,-2.8-l,3.9,'#f4f4f4')}
  ell(x+(sd?1.5:0),-1.9-l,sd?3.5:3.1,1.9,shc);hl(x+(sd?2.2:.4),-2.6-l,1.5,.7,.35);R2(x+(sd?-1.4:-1.6),-1.2-l,sd?5.6:3.4,.7,'rgba(255,255,255,.6)')};
 function R2(x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
 if(!sit){if(sd){leg(-sw*.85-.6,m&&f?1.2:0);leg(sw*.85+.8,m&&!f?1.2:0)}else{leg(-2.7-(m?(f?.4:-.4):0),m&&f?1.2:0);leg(2.7+(m?(f?-.4:.4):0),m&&!f?1.2:0)}}
 else{cap(-2.6,-8.4,1.4,-6.6,3.9,legC);cap(2.4,-8.4,5.6,-6.6,3.9,legC);ell(5.6,-4.4,2.6,1.8,shc);ell(8,-4.4,2.6,1.8,shc)}
 if(L.sho||ou=='b'||(ou=='y'&&L.sho)){const cl=ou=='b'?bt:bt;if(!sd){rr(-5.4,-13.2,5.2,5.4,1.6,cl);rr(.2,-13.2,5.2,5.4,1.6,cl)}else rr(-3.8,-13.2,7.6,5.4,1.8,cl)}
 // ── 裙 ──
 if(dress||(ou=='s'&&fm)){const sc2=ou=='s'?bt:tp,yb=ou=='s'?-6.6:ou=='n'?-6.4:-5.4,w2=sd?4.6:6.6;c.beginPath();c.moveTo(-tw/2+.4,-14);c.quadraticCurveTo(-w2-1,-9,-w2-1.6,yb);c.quadraticCurveTo(0,yb+1.6,w2+1.6,yb);c.quadraticCurveTo(w2+1,-9,tw/2-.4,-14);c.closePath();fo(sc2);
  if(ou=='s'){c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=.5;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*2,-13);c.lineTo(i*2.7,yb+.6);c.stroke()}}}
 // ── 遠側手臂（側視）──
 // 手臂：skin 底 + 袖子
 const hand=(x,y,r,col)=>ell(x,y,r||1.9,r||1.9,col||sk,1);
 const arm=(x0,y0,x1,y1,hc,rad)=>{const t=bare?.2:longSl?.82:.42;cap(x0,y0,x1,y1,3.2,sk);if(!bare||ou=='k')capn(x0,y0,x0+(x1-x0)*t,y0+(y1-y0)*t,3.2,slc);
  hand(x1,y1,rad,hc)};
 const shy=-21,hx=tw/2+.4;
 let farArm=null;
 // ── 身體 ──
 const torso=(col,w1,w2,yt,yb)=>{c.beginPath();c.moveTo(-w1/2+2,yt);c.quadraticCurveTo(0,yt-.9,w1/2-2,yt);c.quadraticCurveTo(w1/2+.5,yt,w1/2,yt+2.8);c.lineTo(w2/2,yb-1.6);c.quadraticCurveTo(w2/2,yb,w2/2-2,yb);c.lineTo(-w2/2+2,yb);c.quadraticCurveTo(-w2/2,yb,-w2/2,yb-1.6);c.lineTo(-w1/2,yt+2.8);c.quadraticCurveTo(-w1/2-.5,yt,-w1/2+2,yt);c.closePath();fo(col)};
 // 先畫動作手臂（在身體後的）
 const armsFront=()=>{ // 前／斜視的手臂（身體之後畫，疊在身側）
  const w=Math.sin(ph*1.3)*3.5,wl=hx+1.6;
  if(ps=='tc'){arm(-wl,shy,-wl-8,-23+w);arm(wl,shy,wl+8,-23-w)}
  else if(ps=='stretch'||ps=='yoga'){const q=Math.sin(ph*1.5)*1.6;arm(-wl,shy,-wl-1,-37+q);arm(wl,shy,wl+1,-37-q)}
  else if(ps=='lift'){const p=Math.sin(ph*5)>0;[[-wl,p],[wl,!p]].forEach(q=>{const x=q[0];if(q[1]){arm(x,shy,x+(x<0?-1:1)*1,-27);rr(x-3.4,-29.4,6.8,2.6,1,'#444')}else{arm(x,shy,x,-12.6);rr(x-3.4,-11.4,6.8,2.6,1,'#444')}})}
  else if(ps=='pull'){const a=-1;arm(-wl,shy,-3.6,-43);arm(wl,shy,3.6,-43);cap(-9,-43,9,-43,1.2,'#c8ced6')}
  else if(ps=='dir'){const q=Math.sin(ph*6);if(o.go){arm(-wl,shy,-wl,-12.4);arm(wl,shy,wl+11,-22);rr(wl+9,-26+q*2.4,5,5,1,'#fff')}else{arm(wl,shy,wl,-12.4);arm(-wl,shy,-wl-1,-33);rr(-wl-3.4,-40,6,6,1.4,'#fff')}}
  else if(ps=='chat'||ps=='wave'){arm(-wl,shy,-wl,-12.4);const q=Math.sin(ph*7)*1.6;arm(wl,shy,wl+1.4,-31+q)}
  else if(ps=='read'){arm(-wl,shy,-4,-15);arm(wl,shy,4,-15);rr(-6,-20,12,8.4,1,'#f4efe0',.9);c.fillStyle='#999';c.fillRect(-4,-18,8,.7);c.fillRect(-4,-15.8,8,.7);c.fillRect(-4,-13.6,8,.7)}
  else if(ps=='pray'||ps=='listen'){arm(-wl,shy,-1.4,-15.4);arm(wl,shy,1.4,-15.4)}
  else if(ps=='guitar'){const q=Math.sin(ph*9)*1.6;arm(-wl,shy,-wl-5,-17);arm(wl,shy,3,-15+q);c.save();c.translate(0,-14);c.rotate(-.5);ell(0,0,6,4.6,'#c4772e');ell(-3.4,0,3.6,3.2,'#d9904a');ell(0,.4,1.5,1.5,'#3a1a08',.6);c.restore();cap(2,-17,12,-25,1.5,'#6a4524');rr(11,-27,3,3,.8,'#3a2a1a',.8)}
  else if(ps=='sing'){arm(-wl,shy,-wl,-12.4);arm(wl,shy,2,-27);ell(2,-29,1.6,1.6,'#555',.8)}
  else if(ps=='dribble'){const q=Math.abs(Math.sin(ph*5));arm(-wl,shy,-wl,-12.4);arm(wl,shy,wl+1.4,-11+q*0);ell(wl+1.4,-3.2-q*6,2.6,2.6,'#e8762a',.9);c.strokeStyle='#5a2a10';c.lineWidth=.4;c.beginPath();c.moveTo(wl-1.2,-3.2-q*6);c.lineTo(wl+4,-3.2-q*6);c.stroke()}
  else if(ps=='spin'){const q=Math.sin(ph*8)*2;arm(-wl,shy,-wl,-12.4);arm(wl,shy,wl+7,-17+q);rr(wl+4,-19+q,6,3,1,'#2f80ed',.8)}
  else{const a1=m&&!f?1:0,a2=m&&f?1:0,s1=m?(f?-1:1)*1.2:0;arm(-wl,shy,-wl-.4+s1*.4,-12.2+a1);arm(wl,shy,wl+.4-s1*.4,-12.2+a2)}};
 const armsSide=(far)=>{ // 側視：單手
  const sp=ps=='punch'||ps=='bag',e=Math.abs(Math.sin(ph*6));
  if(far){if(sp){arm(1,shy,-3,-16)}else if(ps=='fish'||ps=='sweep'||ps=='guitar'||ps=='spin'||ps=='dribble'||ps=='sing')arm(0,shy,5,-17);else arm(-sw*.7,shy,-sw*.9-.4,-12.4);return}
  if(sp){arm(1,shy,6+e*7,-22);ell(7.4+e*7,-22.4,2.7,2.7,'#d9452f',1)}
  else if(ps=='fish'){arm(1,shy,9,-20);cap(9,-20,22,-34,.8,'#6a4524');capn(22,-34,22,-14,.3,'rgba(255,255,255,.6)')}
  else if(ps=='sweep'){arm(1,shy,9,-18);cap(10,-30,10,-1,1,'#8a5a2e')}
  else if(ps=='guitar'){arm(1,shy,7,-18);c.save();c.translate(3,-14);c.rotate(-.4);ell(0,0,5.6,4.2,'#c4772e');c.restore();cap(5,-16,13,-23,1.4,'#6a4524')}
  else if(ps=='spin'){arm(1,shy,9,-20);rr(8,-22,6,3,1,'#2f80ed',.8)}
  else if(ps=='dribble'){const q=Math.abs(Math.sin(ph*5));arm(1,shy,5,-12);ell(5.4,-3-q*6,2.6,2.6,'#e8762a',.9)}
  else if(ps=='sing'){arm(1,shy,5,-27);ell(5.4,-28.6,1.6,1.6,'#555',.8)}
  else arm(sw*.7,shy,sw*.9+.4,-12.4)};
 if(sd)armsSide(true);
 // ── 軀幹 ──
 const wTop=tw+1.4,wBot=tw-1.2;
 const ytop=-22.6,ybot=ou=='u'?-5.6:ou=='j'?-5:ou=='s'&&!fm?-9.4:ou=='z'||ou=='e'?-9:-10.4;
 if(ou=='j'){torso(tp,wTop+1,wBot+3,ytop,-5)}
 else if(dress&&ou!='s'){torso(tp,wTop,wBot,ytop,-13);}
 else if(ou=='b'){torso(sk,wTop,wBot,ytop,-10.4)}
 else if(ou=='s'){torso(fm?'#f4f4f4':'#f2f2ee',wTop,wBot,ytop,-10.4)}
 else torso(ou=='o'||ou=='a'||ou=='v'?tp:tp,wTop,wBot,ytop,ybot);
 const bw=wBot;
 // 衣著細節（正／側／背）
 if(ou=='h'){if(!sd&&!bk){c.beginPath();c.ellipse(0,-22.4,3.8,1.6,0,0,7);c.fillStyle=shade(tp,-26);c.fill();rr(-3.6,-15.6,7.2,3.6,1.4,shade(tp,-14),.7);capn(-1,-21.6,-1,-18.6,.7,'#fff');capn(1,-21.6,1,-18.6,.7,'#fff')}else if(bk){c.beginPath();c.ellipse(0,-23,4.6,2,0,0,7);c.fillStyle=shade(tp,-24);c.fill()}}
 if(ou=='y'){c.fillStyle='rgba(255,255,255,.7)';c.fillRect(-tw/2+.4,-17,tw-.8,1);if(!sd&&!bk){c.fillStyle='rgba(255,255,255,.85)';c.beginPath();c.arc(0,-19,1.4,0,7);c.fill()}}
 if(ou=='a'){if(!bk){c.beginPath();c.moveTo(-3.4,-20);c.lineTo(3.4,-20);c.lineTo(4.2,-10);c.lineTo(-4.2,-10);c.closePath();fo('#f4efe0',.9);c.fillStyle='#d8d0b8';c.fillRect(-1.6,-15,3.2,2.4);capn(-3,-20,-2.6,-23,.6,'#f4efe0');capn(3,-20,2.6,-23,.6,'#f4efe0')}}
 if(ou=='v'){if(!bk&&!sd){c.beginPath();c.moveTo(-tw/2,-22);c.lineTo(-1.2,-22);c.lineTo(-1.2,-11);c.lineTo(-tw/2,-11);c.closePath();fo('#2a3a5a',.8);c.beginPath();c.moveTo(tw/2,-22);c.lineTo(1.2,-22);c.lineTo(1.2,-11);c.lineTo(tw/2,-11);c.closePath();fo('#2a3a5a',.8);pg([-1.8,-22,1.8,-22,1.2,-19.4,-1.2,-19.4],'#c0392b',.6)}}
 if(ou=='c'){if(!bk){capn(0,-22,0,-11,.5,'rgba(0,0,0,.22)');for(let i=0;i<3;i++){c.fillStyle='#bbb';c.beginPath();c.arc(-1.6,-20+i*3.6,.7,0,7);c.arc(1.6,-20+i*3.6,.7,0,7);c.fill()}}}
 if(ou=='u'){if(!bk){pg([-1.4,-22.4,1.4,-22.4,0,-16],'#9fd8f2',.6);capn(-1.6,-22,-3.2,-16.4,.6,'rgba(0,0,0,.2)');capn(1.6,-22,3.2,-16.4,.6,'rgba(0,0,0,.2)');c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-tw/2-1,-6,tw+2,.8)}}
 if(ou=='n'){if(!bk){rr(-2.4,-20.4,4.8,4.6,1,'#fff',.8);capn(0,-19.6,0,-16.8,1,'#d33');capn(-1.4,-18.2,1.4,-18.2,1,'#d33')}}
 if(ou=='o'){if(!bk){c.beginPath();c.moveTo(-3.6,-18);c.lineTo(3.6,-18);c.lineTo(4.2,-10);c.lineTo(-4.2,-10);c.closePath();fo('#4a6a9a',.9);capn(-3,-18,-3,-22.4,1,'#4a6a9a');capn(3,-18,3,-22.4,1,'#4a6a9a');c.fillStyle='#d9b45a';c.fillRect(-1,-15.4,2,1.2)}}
 if(ou=='e'){if(!bk){c.fillStyle='rgba(0,0,0,.14)';c.fillRect(-tw/2+1,-21,tw-2,9);capn(0,-21.6,0,-11.4,.7,'rgba(0,0,0,.3)');c.fillStyle='#c9a45a';c.beginPath();c.arc(-1.4,-18,.6,0,7);c.arc(1.4,-18,.6,0,7);c.arc(-1.4,-14.6,.6,0,7);c.arc(1.4,-14.6,.6,0,7);c.fill()}}
 if(ou=='z'){if(!bk){pg([-2.8,-22.6,0,-18,2.8,-22.6,1.4,-22.6,0,-21,-1.4,-22.6],'#fff',.7);capn(0,-20.2,0,-12,1.2,'#c0392b');pg([-1.2,-20.8,1.2,-20.8,.8,-19.6,-.8,-19.6],'#a02a22',.5);c.fillStyle='rgba(0,0,0,.2)';c.fillRect(-tw/2+.4,-22,2.2,11);c.fillRect(tw/2-2.6,-22,2.2,11)}else{capn(0,-22,0,-10,.6,'rgba(0,0,0,.25)')}}
 if(ou=='q'){if(!bk){c.fillStyle='#ffd84a';c.beginPath();c.arc(-tw/2+2.2,-19.2,1.1,0,7);c.fill();rr(-tw/2,-11.8,tw,1.8,.6,'#111',.6);rr(-1,-11.9,2,1.9,.4,'#ffd84a',.5);rr(1.6,-20,2.4,2.6,.6,'#ffd84a',.5);pg([-1.4,-22.4,0,-19.6,1.4,-22.4],'#fff',.5)}else rr(-tw/2,-11.8,tw,1.8,.6,'#111',.6)}
 if(ou=='r'){c.fillStyle='#ffd84a';c.fillRect(-tw/2,-22,2.8,11);c.fillRect(tw/2-2.8,-22,2.8,11);c.fillStyle='#d8dde0';c.fillRect(-tw/2,-17,tw,1.2);c.fillRect(-tw/2,-13.6,tw,1.2)}
 if(ou=='k'){if(!bk){c.fillStyle=skd;c.fillRect(-1,-22,.1,0)}}
 if(ou=='b'){if(!bk){c.strokeStyle=skd;c.lineWidth=.6;c.beginPath();c.moveTo(-3.4,-19.6);c.quadraticCurveTo(0,-17.4,3.4,-19.6);c.moveTo(0,-19);c.lineTo(0,-13);c.moveTo(-3,-15.6);c.lineTo(3,-15.6);c.stroke()}rr(-tw/2,-11.4,tw,1.8,.6,'#fff',.5)}
 if(ou=='j'){capn(-tw/2,-22,-tw/2+1,-6,.8,'rgba(255,255,255,.2)');c.beginPath();c.moveTo(-3,-22.4);c.lineTo(0,-17);c.lineTo(3,-22.4);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=.9;c.stroke();capn(0,-17,0,-5.4,.6,'rgba(0,0,0,.3)')}
 if(ou=='s'){
  if(!fm){ // 敞開的學蘭外套（熱血高校風）
   if(!bk&&!sd){const gap=1.8;
    c.beginPath();c.moveTo(-wTop/2+.4,ytop+.4);c.lineTo(-gap-.2,ytop+.2);c.lineTo(-gap-.6,-9.4);c.lineTo(-wBot/2-.6,-9.4);c.closePath();fo(jk,.9);
    c.beginPath();c.moveTo(wTop/2-.4,ytop+.4);c.lineTo(gap+.2,ytop+.2);c.lineTo(gap+.6,-9.4);c.lineTo(wBot/2+.6,-9.4);c.closePath();fo(jk,.9);
    capn(-gap-.2,-22,-gap-.6,-10,.5,'rgba(255,255,255,.2)');rr(-wTop/2+.2,-12.6,wTop-.4,1.6,.6,'#222',.5);rr(-1,-12.7,2,1.8,.4,'#c9a45a',.4);c.fillStyle='#c9a45a';[-17.6,-14.8].forEach(yy=>{c.beginPath();c.arc(-gap-1.4,yy,.5,0,7);c.arc(gap+1.4,yy,.5,0,7);c.fill()});
    pg([-gap-.4,-22.6,-gap-2.4,-22.6,-gap-.4,-19.4],shade(jk,18),.6);pg([gap+.4,-22.6,gap+2.4,-22.6,gap+.4,-19.4],shade(jk,18),.6)}
   else if(sd){c.beginPath();c.moveTo(-tw/2-.3,ytop+.4);c.lineTo(tw/2-.4,ytop+.4);c.lineTo(tw/2-.8,-9.4);c.lineTo(-tw/2+.4,-9.4);c.closePath();fo(jk,.9)}
   else{rr(-wTop/2-.2,ytop+.2,wTop+.4,13.6,2,jk,.9);capn(0,-22,0,-9.4,.6,'rgba(0,0,0,.35)');rr(-wTop/2,-12.6,wTop,1.6,.6,'#222',.5)}}
  else{ // 水手服
   if(!bk&&!sd){pg([-wTop/2+.6,ytop+.4,-1.8,ytop+.4,0,-18.6,1.8,ytop+.4,wTop/2-.6,ytop+.4,wTop/2-1.2,-18.4,0,-16.4,-wTop/2+1.2,-18.4],'#243a6e',.7);pg([-1.6,-19.6,1.6,-19.6,2.2,-16.4,0,-17.2,-2.2,-16.4],'#c0392b',.6)}
   else if(sd){c.beginPath();c.moveTo(-tw/2,ytop+.2);c.lineTo(tw/2-.4,ytop+.2);c.lineTo(tw/2-1,-18.2);c.lineTo(-tw/2+.6,-18.6);c.closePath();fo('#243a6e',.7)}
   else{pg([-wTop/2+.6,ytop+.2,wTop/2-.6,ytop+.2,wTop/2-1,-17.6,-wTop/2+1,-17.6],'#243a6e',.7)}}}
 // 頸
 if(!bk||1){c.beginPath();c.rect(-1.8,-25,3.6,3);c.fillStyle=sk;c.fill()}
 if(ou=='e'||ou=='z'){} 
 // ── 近側手臂／前視手臂 ──
 if(sd)armsSide(false);else armsFront();
 if(L.bp&&!bk&&!sd){capn(-tw/2-.4,-21,-tw/2-.4,-11,1.7,L.bp);capn(tw/2+.4,-21,tw/2+.4,-11,1.7,L.bp)}
 else if(L.bp&&sd)rr(-tw/2-3,-22,4.6,12,2.4,L.bp);
 // 光影
 c.fillStyle='rgba(0,0,0,.1)';c.fillRect(-tw/2+.6,-12.6,tw-1.2,1.6);
 // ── 頭 ──
 const hxo=sd?.7:dg?1.5:0,hcx=hxo,hcy=-29.8,HR=6.4,HRy=6.6;
 const bgHair=()=>{ // 後髮（頭後方）
  c.fillStyle=hr;c.strokeStyle=O;c.lineWidth=1.1;
  if(hs=='l'){c.beginPath();c.moveTo(hcx-7,-31);c.quadraticCurveTo(hcx-9.6,-18,hcx-6.4,-16.6);c.lineTo(hcx+6.4,-16.6);c.quadraticCurveTo(hcx+9.6,-18,hcx+7,-31);c.closePath();fo(hr)}
  else if(hs=='k'){c.beginPath();c.moveTo(hcx-7,-31);c.quadraticCurveTo(hcx-8.4,-23.4,hcx-5.6,-23.6);c.lineTo(hcx+5.6,-23.6);c.quadraticCurveTo(hcx+8.4,-23.4,hcx+7,-31);c.closePath();fo(hr)}
  else if(hs=='c'){for(let i=0;i<9;i++){const a=i/9*6.28;ell(hcx+Math.cos(a)*6.6,-30.6+Math.sin(a)*6.4,3.2,3.2,hr,1)}ell(hcx,-30.6,6.8,7,hr,.6)}
  else if(hs=='p'&&!sd){c.beginPath();c.moveTo(hcx+(bk?0:5.6),-31.6);c.quadraticCurveTo(hcx+(bk?5:9.6),-24,hcx+(bk?1:6.8),-18.6);c.quadraticCurveTo(hcx+(bk?-3:3.8),-24,hcx+(bk?-1:3.6),-30);c.closePath();fo(hr)}
  else if(hs=='p'&&sd){c.beginPath();c.moveTo(hcx-5.4,-32);c.quadraticCurveTo(hcx-11.4,-27,hcx-8.6,-19.4);c.quadraticCurveTo(hcx-6.4,-25,hcx-3.6,-29);c.closePath();fo(hr)}};
 bgHair();
 ell(hcx,hcy,sd?5.9:HR,HRy,sk,1.1);
 // 耳
 if(!bk){if(sd)ell(hcx-1.2,-29.2,1.3,1.8,sk,.8);else if(!dg){ell(-HR+.1,-29.2,1.2,1.8,sk,.8);ell(HR-.1,-29.2,1.2,1.8,sk,.8)}else{ell(-HR+.6,-29.2,1.2,1.8,sk,.8)}}
 // 髮（前）
 const hairFront=()=>{const t=-36.8;
  if(bk){ // 後腦勺全髮
   if(hs!='x'){c.beginPath();c.ellipse(hcx,-30.2,HR+.5,HRy+.2,0,0,7);fo(hr,1.1);
    if(hs=='m'){for(let i=-2;i<=2;i++)pg([hcx+i*2.8-1.8,-35.4,hcx+i*2.8,-43.4-(i==0?2:0),hcx+i*2.8+1.8,-35.4],hr,1)}
    if(hs=='h'){c.beginPath();c.ellipse(hcx+.4,-38.6,4.8,3.8,0,0,7);fo(hr,1)}
    if(hs=='b')ell(hcx,-39,3.2,3.2,hr,1)
    if(hs=='e'){hl(hcx,-35,4,1.8,.5)}
    c.fillStyle=shade(hr,22);c.globalAlpha=.4;c.beginPath();c.ellipse(hcx-2,-34.4,2.4,1.2,-.4,0,7);c.fill();c.globalAlpha=1}
   else hl(hcx-2,-34,2.4,1.4,.4);return}
  if(hs=='x'){hl(hcx-2,-34.4,2.4,1.3,.5);return}
  if(hs=='e'){ // 老人：兩側剩餘白髮
   if(sd){ell(hcx-4,-31.4,2.2,3.6,hr,.9)}else{ell(hcx-5.2,-31.4,1.9,3.6,hr,.9);if(!dg)ell(hcx+5.2,-31.4,1.9,3.6,hr,.9)}hl(hcx-1.6,-34.8,2.6,1.2,.55);return}
  const spike=(x0,x1,tx,ty)=>pg([x0,-34.2,tx,ty,x1,-34.2],hr,.9);
  if(sd){ // 側視：蓋住頭頂與後腦
   c.beginPath();c.moveTo(hcx+4.4,-33.2);c.quadraticCurveTo(hcx+3,t-.4,hcx-1.6,t);c.quadraticCurveTo(hcx-7.4,-35.4,hcx-6.2,-29);c.lineTo(hcx-5,-26.2);c.quadraticCurveTo(hcx-3.4,-30,hcx-1.8,-31.4);c.quadraticCurveTo(hcx+1.4,-32,hcx+3,-31.8);c.lineTo(hcx+4.4,-33.2);c.closePath();fo(hr,1.1);
   if(hs=='m'){for(let i=0;i<4;i++)pg([hcx-5+i*2.6,-35.4,hcx-4.2+i*2.7,-43.2+(i==1?-1.6:0),hcx-2.2+i*2.6,-35.8],hr,.9)}
   if(hs=='h'){c.beginPath();c.moveTo(hcx-4,-35);c.quadraticCurveTo(hcx-3,-44,hcx+4.6,-41.4);c.quadraticCurveTo(hcx+8,-38.4,hcx+5.2,-34);c.quadraticCurveTo(hcx+2,-36.4,hcx-4,-35);c.closePath();fo(hr,1)}
   if(hs=='b')ell(hcx-2.4,-38.8,3.2,3.2,hr,1);
   if(hs=='l'){c.beginPath();c.moveTo(hcx-6,-32);c.quadraticCurveTo(hcx-9.6,-22,hcx-6,-16.8);c.lineTo(hcx-1,-17.6);c.quadraticCurveTo(hcx-4,-24,hcx-2,-30);c.closePath();fo(hr,1)}
   if(hs=='k'){c.beginPath();c.moveTo(hcx-6,-32);c.quadraticCurveTo(hcx-8.4,-25,hcx-5,-23.4);c.lineTo(hcx-1,-24.2);c.quadraticCurveTo(hcx-3.4,-27,hcx-2,-30);c.closePath();fo(hr,1)}
   if(hs=='c')ell(hcx-1,-34,6.6,4.4,hr,1);
   return}
  // 正面／斜前：瀏海
  const sx2=dg?1.4:0;
  if(hs=='c'){for(let i=0;i<7;i++){const a=Math.PI+i/6*Math.PI;ell(hcx+Math.cos(a)*5.6,-31.4+Math.sin(a)*5.6,2.5,2.5,hr,.9)}return}
  c.beginPath();c.moveTo(hcx-HR-.5,-29.6);c.quadraticCurveTo(hcx-HR-.5,t+.8,hcx,t);c.quadraticCurveTo(hcx+HR+.5,t+.8,hcx+HR+.5,-29.6);
  if(hs=='l'||hs=='k'||hs=='p'||hs=='b'){ // 柔和瀏海（女）
   c.lineTo(hcx+HR-.4,-30.6);c.quadraticCurveTo(hcx+3.4,-32.4,hcx+1.6,-33.2);c.quadraticCurveTo(hcx-2.6,-32,hcx-HR+.4,-30.6);c.closePath();fo(hr,1.1)}
  else{ // 熱血尖瀏海
   c.lineTo(hcx+HR-.2,-31.2);c.lineTo(hcx+4.6,-32.6);c.lineTo(hcx+3.6,-30.6);c.lineTo(hcx+1.8,-33.2);c.lineTo(hcx+.6,-30.4);c.lineTo(hcx-1.2,-33);c.lineTo(hcx-2.6,-30.2);c.lineTo(hcx-4.2,-32.8);c.lineTo(hcx-5,-30.4);c.lineTo(hcx-HR+.2,-31.4);c.closePath();fo(hr,1.1)}
  if(hs=='m'){for(let i=-2;i<=2;i++)pg([hcx+i*2.6-2,-35.6,hcx+i*2.6+(i%2?.8:-.6),-44.2+Math.abs(i)*1.4,hcx+i*2.6+2,-35.6],hr,.9)}
  if(hs=='h'){c.beginPath();c.moveTo(hcx-5.4,-35);c.quadraticCurveTo(hcx-5.8,-45.2,hcx+1.4,-44);c.quadraticCurveTo(hcx+7.4,-43,hcx+5.4,-35);c.closePath();fo(hr,1)}
  if(hs=='b')ell(hcx,-40,3.2,3.2,hr,1);
  if(hs=='p'){}
  c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.ellipse(hcx-2.2,-35.4,2.6,1.1,-.35,0,7);c.fill()};
 if(!bk){ // 臉
  const ex=dg?1.4:0;
  if(sd){const eyeX=hcx+2.4;
   if(has('s')){rr(eyeX-2,-31.2,4.8,3.4,1.2,'#111',.5)}else{ell(eyeX,-29.8,1.1,1.55,'#1b1b22',.5);c.fillStyle='#fff';c.fillRect(eyeX+.1,-30.8,.7,.7)}
   capn(eyeX-1.6,-32.6,eyeX+1.7,fm?-32.6:-32,fm?.6:.9,shade(hr,-12));
   ell(hcx+5.9,-28.4,.9,.8,sk,.6);capn(hcx+2.8,-25.7,hcx+4.4,-25.9,.6,'#a8553f');if(fm||bd==3){c.fillStyle='rgba(255,130,130,.4)';c.beginPath();c.ellipse(eyeX-.8,-27.2,1.4,.9,0,0,7);c.fill()}}
  else{const lx=-2.7+ex*.7,rx2=2.7+ex*.9;
   [lx,rx2].forEach((x,i)=>{const nar=dg&&i==0?.78:1;if(has('s')){}else{ell(x,-29.6,1.15*nar,1.65,'#1b1b22',.5);c.fillStyle='#fff';c.fillRect(x-.2,-30.6,.7,.7);if(fm){c.strokeStyle='#1b1b22';c.lineWidth=.5;c.beginPath();c.moveTo(x-1.4*nar,-31);c.lineTo(x-1.8*nar,-31.8);c.stroke()}}});
   if(has('s')){rr(lx-2,-31.2,4.4,3.4,1.2,'#111',.5);rr(rx2-2.2,-31.2,4.4,3.4,1.2,'#111',.5);capn(lx+2,-30.2,rx2-2.2,-30.2,.6,'#111')}
   const bc=shade(hr,-14);
   if(fm||bd==3){capn(lx-1.6,-32.6,lx+1.2,-32.9,.6,bc);capn(rx2-1.2,-32.9,rx2+1.6,-32.6,.6,bc)}
   else{capn(lx-2,-33.3,lx+1.6,-32.1,.95,bc);capn(rx2-1.6,-32.1,rx2+2,-33.3,.95,bc)}
   capn(ex*.8-.2,-28,ex*.8-.2,-27.2,.5,skd);
   if(has('x')){c.beginPath();c.moveTo(-5.4,-28);c.quadraticCurveTo(0,-27,5.4,-28);c.lineTo(4.2,-24);c.quadraticCurveTo(0,-22.4,-4.2,-24);c.closePath();fo('#e8f2f8',.7);capn(-5.4,-28,-6.6,-29,.4,'#bbb')}
   else{if(m&&ps==''&&0){}c.strokeStyle='#8a3a2a';c.lineWidth=.7;c.beginPath();if(!fm&&bd!=3){c.moveTo(-1.6+ex,-25.4);c.quadraticCurveTo(ex,-24.5,1.8+ex,-25.6)}else{c.moveTo(-1.5+ex,-25.6);c.quadraticCurveTo(ex,-24.6,1.5+ex,-25.6)}c.stroke()}
   if(fm||bd==3){c.fillStyle='rgba(255,130,130,.4)';c.beginPath();c.ellipse(-4.4+ex,-27.2,1.4,.9,0,0,7);c.ellipse(4.4+ex,-27.2,1.4,.9,0,0,7);c.fill()}}
  // 配件
  if(has('g')){c.strokeStyle='#33405a';c.lineWidth=.6;c.fillStyle='rgba(120,160,220,.25)';if(sd){c.beginPath();c.arc(hcx+2.4,-29.8,2.1,0,7);c.fill();c.stroke();capn(hcx+.4,-29.8,hcx-5,-30.4,.5,'#33405a')}else{c.beginPath();c.arc(-2.8+ex*.7,-29.6,2.1,0,7);c.fill();c.stroke();c.beginPath();c.arc(2.8+ex*.9,-29.6,2.1,0,7);c.fill();c.stroke();capn(-.7+ex*.8,-29.6,.7+ex*.8,-29.6,.6,'#33405a')}}
  if(has('b')){c.beginPath();if(sd){c.moveTo(hcx-3,-27);c.quadraticCurveTo(hcx+1,-21.8,hcx+5.2,-25.4);c.lineTo(hcx+4.6,-27.2);c.quadraticCurveTo(hcx+2.6,-25.4,hcx-.4,-26.6);c.closePath()}else{c.moveTo(-5.8+ex,-27.6);c.quadraticCurveTo(-5.4+ex,-21.2,ex,-21.4);c.quadraticCurveTo(5.4+ex,-21.2,5.8+ex,-27.6);c.quadraticCurveTo(3.4+ex,-24.6,ex,-25);c.closePath()}fo(hr,.8)}
  if(has('m')){c.fillStyle=hr;c.beginPath();if(sd)c.ellipse(hcx+3.8,-26.6,1.8,.7,0,0,7);else c.ellipse(ex,-26.6,3,.8,0,0,7);c.fill()}
  if(has('e')){if(sd)ell(hcx-1.2,-29.4,1.8,2.2,'#fff',.7);else{ell(-HR-.4,-29.4,1.7,2.2,'#fff',.7);if(!dg)ell(HR+.4,-29.4,1.7,2.2,'#fff',.7)}capn(-HR,-34,HR,-34,.6,'#fff')}
 }
 hairFront();
 // 頭帶
 if(has('k')&&!L.ht){if(!bk&&!sd){rr(-HR-.2,-33.8,HR*2+.4,2,.8,L.hbc||'#d9452f',.6);capn(HR,-33,HR+3.4,-31+Math.sin(ph*5)*.8,.9,L.hbc||'#d9452f')}else if(sd){rr(hcx-6,-34,11,2,.8,L.hbc||'#d9452f',.6);capn(hcx-6,-33,hcx-10,-31+Math.sin(ph*5)*.8,.9,L.hbc||'#d9452f')}else rr(-HR-.2,-34,HR*2+.4,2,.8,L.hbc||'#d9452f',.6)}
 // 帽
 const ht=L.ht,hc=L.hc;
 if(ht){const hy=-35.4;
  if(ht=='h'){c.beginPath();c.moveTo(hcx-HR-.4,hy+.8);c.quadraticCurveTo(hcx,hy-8,hcx+HR+.4,hy+.8);c.closePath();fo(hc,1);if(!bk){if(sd){pg([hcx+3,hy,hcx+9.6,hy+1,hcx+9,hy+2.6,hcx+2.4,hy+2.2],shade(hc,-20),.9)}else{rr(hcx-HR-.4,hy,HR*2+.8,2.2,1,shade(hc,-20),.9)}}else capn(hcx-2.6,hy-1,hcx+2.6,hy-1,.8,shade(hc,30))}
  else if(ht=='c'){ell(hcx-3.6,hy-6,3.8,3.8,'#fff',.9);ell(hcx+3.6,hy-6,3.8,3.8,'#fff',.9);ell(hcx,hy-8,4.4,4,'#fff',.9);rr(hcx-HR-.3,hy-.8,HR*2+.6,3.4,1.4,'#fff',.9)}
  else if(ht=='n'){rr(hcx-4.4,hy-3,8.8,3.6,1.4,'#fff',.8);if(!bk&&!sd){capn(hcx,hy-2.4,hcx,hy,.9,'#d33');capn(hcx-1,hy-1.2,hcx+1,hy-1.2,.9,'#d33')}}
  else if(ht=='p'){c.beginPath();c.moveTo(hcx-HR-.6,hy+1);c.quadraticCurveTo(hcx-HR-.8,hy-6.4,hcx,hy-6);c.quadraticCurveTo(hcx+HR+.8,hy-6.4,hcx+HR+.6,hy+1);c.closePath();fo('#1c2f5a',1);rr(hcx-HR-.8,hy-.4,HR*2+1.6,2.2,.8,'#111',.6);if(!bk&&!sd){c.fillStyle='#ffd84a';c.beginPath();c.arc(hcx,hy-2.8,1.1,0,7);c.fill();rr(hcx-4.6,hy+1.4,9.2,1.4,.7,'#0a0a0a',.4)}else if(sd){pg([hcx+3,hy+.8,hcx+9,hy+1.6,hcx+3,hy+2.8],'#0a0a0a',.5)}}
  else if(ht=='f'){ell(hcx,hy-1.4,HR+.4,3,hc,.9);ell(hcx,hy-3.2,HR-1.4,2.2,shade(hc,12),.7);if(!bk)capn(hcx+(sd?2:-HR),hy+.2,hcx+(sd?8:HR),hy+.4,1,'#444')}
  else if(ht=='b'){c.beginPath();c.moveTo(hcx-HR-.2,hy+.6);c.quadraticCurveTo(hcx,hy-8.4,hcx+HR+.2,hy+.6);c.closePath();fo(hc,1);rr(hcx-HR-.4,hy-.8,HR*2+.8,2.6,1.2,shade(hc,-18),.8);ell(hcx,hy-7.2,1.3,1.3,shade(hc,24),.6)}
  else if(ht=='a'){ell(hcx,hy-.2,9.2,2.6,hc,.9);c.beginPath();c.moveTo(hcx-5.4,hy-.4);c.quadraticCurveTo(hcx,hy-8,hcx+5.4,hy-.4);c.closePath();fo(shade(hc,10),.9);capn(hcx-5.2,hy-1.6,hcx+5.2,hy-1.6,1.1,'#8a2a1a')}
  else if(ht=='u'){c.beginPath();c.moveTo(hcx-HR-.4,hy+.8);c.quadraticCurveTo(hcx,hy-8,hcx+HR+.4,hy+.8);c.closePath();fo(hc,1);rr(hcx-HR-1,hy,HR*2+2,1.8,.9,shade(hc,-22),.8);capn(hcx,hy-6.4,hcx,hy-1,1.1,shade(hc,-22))}
  else if(ht=='w'){ell(hcx,hy-2.4,HR-.4,3.8,hc,.9);rr(hcx-HR,hy-.6,HR*2,2,.8,shade(hc,-22),.7);if(!bk&&!sd)capn(hcx-3,hy-3.8,hcx+3,hy-3.8,.8,'#fff')}}
 // 傘
 if(o.um){const ux=sd?(dr==3?7:-7):6;c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(ux*.6,1,10,3,0,0,7);c.fill();R(c,ux-.5,-52,1,32,'#444');capn(ux*.35,-29,ux,-22.5,2.4,tp);c.fillStyle=sk;c.fillRect(ux-1.6,-24,3.2,3.4);
  c.fillStyle=L.umc||(L.umc=BRI[(hsh(ac+tp)%8)]);c.beginPath();c.moveTo(ux-15,-49);c.quadraticCurveTo(ux,-66,ux+15,-49);c.quadraticCurveTo(ux+7.5,-52,ux,-49.4);c.quadraticCurveTo(ux-7.5,-52,ux-15,-49);c.fill();R(c,ux-.5,-67,1,3,'#444');
  c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.moveTo(ux-3,-58);c.quadraticCurveTo(ux-9,-55,ux-11,-50);c.lineTo(ux-7,-51);c.fill()}
 // 手杖
 if(has('c')){if(sd)capn(5.4,-14,5.4,-1,1,'#8a5a2e');else{capn(tw/2+3.6,-14,tw/2+3.6,-1,1,'#8a5a2e');capn(tw/2+2.6,-14.4,tw/2+4.8,-14.4,1,'#8a5a2e')}}
 c.restore()}
function label(n){const d=Math.hypot(n.x-p.x,n.y-p.y),x=Math.round(n.x+6);
 if(d<60){const y=Math.round(n.y-(n.t?14:n.kid||(n.lk&&n.lk.bd==3)?26:38));txt(g,n.n,x+1,y+1,'#000','bold 8px sans-serif');txt(g,n.n,x,y,'#fff8e0','bold 8px sans-serif')}
 if(typeof n.fr=='string'&&typeof frMark=='function')frMark(n.fr,x,Math.round(n.y-46+Math.sin(performance.now()/200)*2));
 if(n.q!=null&&(Q[n.q].s==0||Q[n.q].s==2)){const yy=Math.round(n.y-46+Math.sin(performance.now()/200)*2),cl=Q[n.q].s==0?'#ff3b30':'#3ddc66';txt(g,'❗',x+1,yy+1,'#000','bold 12px sans-serif');txt(g,'❗',x,yy,cl,'bold 12px sans-serif')}}
