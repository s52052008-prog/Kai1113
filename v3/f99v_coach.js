/* v13.25 第三條：健身教練事業線
   招生（發傳單）→ 會員團課（節奏小遊戲）→ 拍教學影片（抓完美姿勢）
   做過才知道累 → IG、官網、助教、線上課程平台 → 教練事業自動運轉，每週進帳 */
const COW={
 ad:{n:'招生',i:'📣',T:[{n:'公園發傳單',d:'一張一張發，被拒絕也要笑'},{n:'IG 健身帳號',p:2000,need:1,lead:2,d:'每週自動多 2 位詢問'},{n:'教練官網＋線上預約',p:12000,need:3,lead:5,conv:.2,auto:1,d:'每週自動多 5 位詢問，成交率 +20%'}]},
 cls:{n:'團課',i:'🏋️',T:[{n:'徒手團課',d:'一個人顧全場'},{n:'團課器材組（壺鈴、彈力帶）',p:6000,need:1,fee:1.5,cap:6,d:'團課收費 ×1.5、會員上限 +6'},{n:'聘請助教阿翔',p:25000,need:3,fee:1.5,cap:6,auto:1,wage:1500,d:'每週自動開團課（週薪 💰1,500），會員不再流失'}]},
 vid:{n:'拍片',i:'📹',T:[{n:'手機自拍',d:'NG 好幾次才拍得好'},{n:'補光燈＋收音麥克風',p:3500,need:1,view:2,d:'影片觀看數 ×2'},{n:'線上訂閱課程平台',p:18000,need:3,view:2,auto:1,d:'每週自動收訂閱費（每人 💰30），訂閱數自己會長'}]}};
const COK=Object.keys(COW);
function coS(){st.co=st.co||{t:{},cnt:{},mem:0,lead:0,subs:0,cw:-1,earn:0,saved:0,wk:-1,ad:-1,vd:-1};const C=st.co;COK.forEach(k=>{C.t[k]=C.t[k]||0;C.cnt[k]=C.cnt[k]||0});return C}
const coTier=k=>COW[k].T[coS().t[k]];
const coAuto=k=>!!coTier(k).auto;
const coReady=()=>{try{return rnReady('gym')}catch(e){return false}};
function coCap(){let lv=1;try{lv=rnS().gym.lv||1}catch(e){}return [0,6,10,16][Math.min(3,lv)]+(coTier('cls').cap||0)}
const coFee=()=>Math.round(400*(coTier('cls').fee||1)*(st.cert?1.5:1));
function coPct(){const C=coS();let own=0,tot=0;COK.forEach(k=>{own+=C.t[k];tot+=COW[k].T.length-1});return own/tot*.7+Math.min(1,C.mem/coCap())*.3}

// ════════ 週末開始：結算上週＋自動運轉 ════════
{const _a=wkArrive;wkArrive=function(){const r=_a.apply(this,arguments);try{if(!coReady())return r;const C=coS(),W=wkN();if(C.wk==W)return r;const first=C.wk<0;C.wk=W;if(first)return r;const msg=[];
 // 上週沒上團課 → 會員流失
 if(C.mem>0&&C.cw!=W-1&&!coAuto('cls')){const lo=Math.max(1,Math.ceil(C.mem*.2));C.mem-=lo;msg.push(`😢 上週沒開團課，${lo} 位會員沒續約`)}
 // 自動招生
 const L=coTier('ad').lead||0;if(L){C.lead+=L;if(coAuto('ad'))C.saved+=1}
 // 詢問 → 成交
 if(C.lead>0){const rate=Math.min(.95,.45+(st.rep||0)/200+(coTier('ad').conv||0)),n=Math.min(coCap()-C.mem,Math.round(C.lead*rate));if(n>0){C.mem+=n;msg.push(`🙋 ${n} 位新會員報名了！（${C.mem}/${coCap()}）`)}C.lead=0}
 // 助教自動開課
 if(coAuto('cls')&&C.mem>0){const T=coTier('cls'),inc=Math.round(C.mem*coFee()*.75)-T.wage;st.money+=inc;C.earn+=Math.max(0,inc);C.cw=W-1;C.saved+=1.5;msg.push(`🏋️ 助教阿翔幫你上完團課，淨賺 💰${inc.toLocaleString('en-US')}`)}
 // 線上課程平台
 if(coAuto('vid')){C.subs=Math.round(C.subs*1.05+2);const inc=C.subs*30;st.money+=inc;C.earn+=inc;msg.push(`📹 線上課程 ${C.subs} 人訂閱，進帳 💰${inc.toLocaleString('en-US')}`)}
 if(msg.length)setTimeout(()=>whenFree(()=>{openDlg('🏋️ 教練事業週報',msg.join('<br>'),[['繼續加油！','',closeDlg]]);try{hud();hwPanel()}catch(e){}}),2800);SVDIRTY=1}catch(e){console.error(e)}return r}}

// ════════ 動作 ════════
function coDo(k){const C=coS(),W=wkN();if(!coReady())return toast('🏚️ 先把頂樓的家庭健身房蓋好');if(coAuto(k)&&k!='ad')return toast('🤖 '+coTier(k).n+'會自動處理');
 const cost={ad:[1,8],cls:[1.5,15],vid:[1,8]}[k];if(st.sta<cost[1])return toast('⚡ 體力不夠，先休息一下');
 if(k=='ad'){if(scene)return toast('📣 要到戶外（公園、路口）才能發傳單');if(C.ad==W)return toast('這個週末已經發過傳單了')}
 if(k=='cls'){if(scene!='家6F')return toast('🏋️ 團課要在頂樓的家庭健身房上');if(C.cw==W)return toast('這個週末已經上過團課了');if(C.mem<1)return toast('還沒有會員，先去發傳單招生吧！')}
 if(k=='vid'){if(scene!='家6F')return toast('📹 到頂樓健身房才有地方拍片');if(C.vd==W)return toast('這個週末已經拍過片了')}
 coGame(k,res=>{advance(cost[0]);st.sta=Math.max(0,st.sta-cost[1]);C.cnt[k]++;let txt='';
  if(k=='ad'){C.ad=W;C.lead+=res.n;txt=`發出 ${res.sent} 張傳單，<b>${res.n} 位</b>有興趣、加了你的 LINE。<br><span style="opacity:.75">下個週末會陸續報名（口碑越好、成交越多）</span>`;fxApply({r:res.n>=5?2:1})}
  if(k=='cls'){C.cw=W;const fee=coFee(),inc=Math.round(C.mem*fee*res.q);st.money+=inc;C.earn+=inc;txt=`${C.mem} 位會員練得滿身大汗！<br>上課品質 ${Math.round(res.q*100)}%・收入 💰${inc.toLocaleString('en-US')}`;fxApply({r:res.q>=.85?3:1,j:res.q>=.85?6:3});
   if(res.q>=.85&&C.mem<coCap()){C.lead+=1;txt+='<br>✨ 會員下課後揪了朋友，<b>多 1 位詢問</b>！'}}
  if(k=='vid'){C.vd=W;const v=Math.round(res.n*(80+Math.random()*60)*(coTier('vid').view||1)),s=Math.max(1,Math.round(v/40));C.subs+=s;txt=`影片上傳了！觀看數 <b>${v.toLocaleString('en-US')}</b>，新增 ${s} 位追蹤（共 ${C.subs}）`;if(res.n>=5){C.lead+=1;txt+='<br>💬 有人私訊問怎麼報名團課！'}fxApply({r:1})}
  const nx=COW[k].T[C.t[k]+1];if(nx){const left=nx.need-C.cnt[k];txt+=left>0?`<br><span style="opacity:.75">再自己${COW[k].n} ${left} 次，就會想升級「${nx.n}」</span>`:`<br>💡 現在可以升級「${nx.n}」（💰${nx.p.toLocaleString('en-US')}）了！`}
  hud();SVDIRTY=1;try{hwPanel()}catch(e){}openDlg(COW[k].i+' '+COW[k].n+'完成！',txt,[['好','',closeDlg]])})}

// ════════ 小遊戲 ════════
function coGame(k,done){const M=mgBox({ad:'📣 公園發傳單',cls:'🏋️ 會員團課',vid:'📹 拍教學影片'}[k]),g=M.g,W2=720,H2=520;let fin=false,fx=[],combo=0,lt=performance.now();const t0=performance.now();
 const finish=res=>{if(fin)return;fin=true;window.__kbBlock=performance.now()+1700;setTimeout(()=>{M.end();OVK.delete(kd);done(res)},900)};
 const pos=e=>{const r=M.cv.getBoundingClientRect();return[(e.clientX-r.left)*W2/r.width,(e.clientY-r.top)*H2/r.height]};
 const person=(x,y,col,ph,sq,arm)=>{const b=Math.sin(ph)*2,s=sq||0;g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(x,y+2,14,4,0,0,7);g.fill();
  g.fillStyle='#3a3a4a';g.fillRect(x-7,y-22+s*8,5,22-s*8);g.fillRect(x+2,y-22+s*8,5,22-s*8);g.fillStyle=col;g.fillRect(x-9,y-44+s*12+b,18,24);g.fillStyle='#f2c9a0';g.beginPath();g.arc(x,y-52+s*12+b,9,0,7);g.fill();g.fillStyle='#3a2414';g.fillRect(x-9,y-61+s*12+b,18,5);
  g.fillStyle=col;if(arm){g.fillRect(x-17,y-60+s*12,6,18);g.fillRect(x+11,y-60+s*12,6,18)}else{g.fillRect(x-14,y-42+s*12+b,5,16);g.fillRect(x+9,y-42+s*12+b,5,16)}};
 let res={},kd=()=>{};
 if(k=='ad'){// ── 發傳單：有興趣的人（💪🙋）給傳單，忙碌的人（📱🐕）別打擾 ──
  const P=[],DUR=30;let sent=0,ok=0,spawn=0;const TY=[['💪',1,'#4a9ae0'],['🙋',1,'#e07a4a'],['🏃',1,'#5ab83a'],['📱',0,'#7a7a8a'],['🐕',0,'#a0804a'],['🎧',0,'#8a5ab0']];
  M.tip.innerHTML='點 <b>頭上有 💪🙋🏃 的人</b>（或空白鍵）遞傳單；📱🐕🎧 在忙，硬塞會被白眼！';
  const give=(x,y)=>{if(fin)return;const p=P.filter(q=>!q.done&&q.x>40&&q.x<W2-40).sort((a,b)=>x==null?Math.abs(a.x-360)-Math.abs(b.x-360):Math.hypot(a.x-x,a.y-40-y)-Math.hypot(b.x-x,b.y-40-y))[0];if(!p||(x!=null&&Math.hypot(p.x-x,p.y-40-y)>50))return;p.done=1;sent++;
   if(p.it){ok++;combo++;fx.push({x:p.x,y:p.y-80,t:0,s:['😊 謝謝！','👍 有興趣！','💪 我想練！'][ok%3],c:'#2a9a4a'})}else{combo=0;ok=Math.max(0,ok-1);st.rep=Math.max(0,(st.rep||0)-.2);fx.push({x:p.x,y:p.y-80,t:0,s:['😒 不用了（詢問 -1）','🙄 在忙（詢問 -1）','😤 走開啦（詢問 -1）'][sent%3],c:'#c0392b'})}};
  kd=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();if(!e.repeat)give()}else if(e.key=='Escape'&&!fin){fin=true;M.end();OVK.delete(kd)}};
  M.cv.addEventListener('pointerdown',e=>{const [x,y]=pos(e);give(x,y)});
  const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);return}const dt=Math.min(.05,(now-lt)/1000);lt=now;const el=(now-t0)/1000;
   g.fillStyle='#9fd4ff';g.fillRect(0,0,W2,H2);g.fillStyle='#7cc06a';g.fillRect(0,250,W2,270);g.fillStyle='#d8c8a8';g.fillRect(0,330,W2,90);[[60,240],[250,230],[480,245],[660,235]].forEach(t=>{g.fillStyle='#6a4a2a';g.fillRect(t[0]-5,t[1]-30,10,40);g.fillStyle='#3a8a3a';g.beginPath();g.arc(t[0],t[1]-50,32,0,7);g.fill()});
   spawn-=dt;if(!fin&&el<DUR&&spawn<=0){spawn=.55+Math.random()*.6;const ty=TY[Math.random()<.55?(Math.random()*3)|0:3+((Math.random()*3)|0)],dir=Math.random()<.5?1:-1;P.push({x:dir>0?-20:W2+20,y:370+Math.random()*40,v:dir*(70+Math.random()*60+(ty[0]=='🏃'?80:0)),ic:ty[0],it:ty[1],col:ty[2],ph:Math.random()*6})}
   P.sort((a,b)=>a.y-b.y).forEach(p=>{p.x+=p.v*dt;p.ph+=dt*10;person(p.x,p.y,p.col,p.ph);g.font='24px sans-serif';g.textAlign='center';if(!p.done)g.fillText(p.ic,p.x,p.y-72);else{g.font='16px sans-serif';g.fillText('📄',p.x+14,p.y-30)}});
   for(let i=P.length-1;i>=0;i--)if(P[i].x<-60||P[i].x>W2+60)P.splice(i,1);
   g.fillStyle='rgba(0,0,0,.3)';g.fillRect(60,20,600,24);g.fillStyle='#3d9cf0';g.fillRect(63,23,594*Math.max(0,1-el/DUR),18);g.fillStyle='#fff';g.font='bold 16px sans-serif';g.textAlign='center';g.fillText(`⏱ ${Math.max(0,Math.ceil(DUR-el))} 秒　📄 發出 ${sent}　🙋 有興趣 ${ok}`,360,38);
   if(combo>=3){g.fillStyle='#ff8a3a';g.font='bold 24px sans-serif';g.fillText('COMBO ×'+combo,360,80)}
   if(el>=DUR&&!fin){res={sent,n:ok};finish(res)}fxDraw(dt);if(fin){g.fillStyle='rgba(255,255,255,.55)';g.fillRect(0,0,W2,H2);g.fillStyle='#2a8a4a';g.font='bold 44px sans-serif';g.fillText(`📣 收到 ${ok} 位詢問！`,360,280)}requestAnimationFrame(loop)};requestAnimationFrame(loop)}
 if(k=='cls'){// ── 團課：四個動作的節奏遊戲 ──
  const MV=[['深蹲','#e2412f'],['開合跳','#f0a830'],['伏地挺身','#3d9cf0'],['棒式','#3cc46a']],N=28,notes=[];let tt=1.2;for(let i=0;i<N;i++){notes.push({l:(Math.random()*4)|0,t:tt});tt+=Math.max(.42,.9-i*.018)}
  let hit=0,good=0,miss=0,pose=-1,poseT=0;const HY=420,SP=260,mem=Math.min(12,coS().mem||1);
  M.tip.innerHTML='音符落到線上時按 <b>1 2 3 4</b>（或點下方的動作）帶會員一起做！';
  const press=l=>{if(fin)return;const el=(performance.now()-t0)/1000;const n=notes.find(q=>!q.h&&q.l==l&&Math.abs(q.t-el)<.22);pose=l;poseT=.35;if(!n){combo=0;fx.push({x:150+l*140,y:HY-40,t:0,s:'✖',c:'#c0392b'});return}n.h=1;const d=Math.abs(n.t-el);if(d<.09){hit++;combo++;fx.push({x:150+l*140,y:HY-40,t:0,s:'PERFECT',c:'#ff8a3a'})}else{good++;combo++;fx.push({x:150+l*140,y:HY-40,t:0,s:'GOOD',c:'#3d9cf0'})}};
  kd=e=>{const i=['1','2','3','4'].indexOf(e.key);if(i>=0){e.preventDefault();if(!e.repeat)press(i)}else if(e.key=='Escape'&&!fin){fin=true;M.end();OVK.delete(kd)}};
  M.cv.addEventListener('pointerdown',e=>{const [x,y]=pos(e);if(y>HY-80){const l=Math.max(0,Math.min(3,Math.floor((x-80)/140)));press(l)}});
  const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);return}const dt=Math.min(.05,(now-lt)/1000);lt=now;const el=(now-t0)/1000;poseT-=dt;
   g.fillStyle='#2a2430';g.fillRect(0,0,W2,H2);g.fillStyle='#3a3040';g.fillRect(0,170,W2,8);
   // 會員們跟著做
   for(let i=0;i<mem;i++){const x=80+i*(560/Math.max(1,mem-1||1)),y=160,ph=now/180+i;const sq=pose==0&&poseT>0?Math.max(0,Math.sin(poseT*9)):0;person(mem==1?360:x,y,['#e07a4a','#4a9ae0','#5ab83a','#c05ab0','#e0c04a'][i%5],ph,sq,pose==1&&poseT>0)}
   g.fillStyle='#fff6dc';g.font='bold 15px sans-serif';g.textAlign='center';g.fillText(`🙋 ${coS().mem} 位會員`,W2-70,30);
   for(let l=0;l<4;l++){const x=150+l*140;g.fillStyle='rgba(255,255,255,.06)';g.fillRect(x-55,190,110,300);g.fillStyle=MV[l][1];g.globalAlpha=pose==l&&poseT>0?1:.5;g.fillRect(x-55,HY-6,110,12);g.globalAlpha=1;g.fillStyle='#fff6dc';g.font='bold 15px sans-serif';g.fillText(`${l+1} ${MV[l][0]}`,x,HY+40)}
   notes.forEach(n=>{if(n.h)return;const y=HY-(n.t-el)*SP;if(y>HY+30){n.h=1;miss++;combo=0;return}if(y<190)return;g.fillStyle=MV[n.l][1];g.beginPath();g.arc(150+n.l*140,y,20,0,7);g.fill();g.fillStyle='#fff';g.font='bold 16px sans-serif';g.fillText(n.l+1,150+n.l*140,y+6)});
   const q=(hit+good*.7)/N;g.fillStyle='rgba(0,0,0,.3)';g.fillRect(60,20,520,22);g.fillStyle='#3cc46a';g.fillRect(63,23,514*Math.min(1,q),16);g.fillStyle='#fff';g.font='bold 14px sans-serif';g.fillText(`上課品質 ${Math.round(q*100)}%　PERFECT ${hit}　GOOD ${good}　MISS ${miss}`,320,36);
   if(combo>=5){g.fillStyle='#ff8a3a';g.font='bold 26px sans-serif';g.fillText('🔥 COMBO ×'+combo,360,110)}
   if(!fin&&notes.every(n=>n.h)){res={q:Math.max(.3,Math.min(1,(hit+good*.7)/N+.1))};finish(res)}fxDraw(dt);
   if(fin){g.fillStyle='rgba(255,255,255,.55)';g.fillRect(0,0,W2,H2);g.fillStyle='#2a8a4a';g.font='bold 44px sans-serif';g.fillText(res.q>=.85?'🔥 全場嗨翻！':res.q>=.6?'💪 練得很扎實！':'😅 有點亂，但大家很開心',360,300)}requestAnimationFrame(loop)};requestAnimationFrame(loop)}
 if(k=='vid'){// ── 拍片：游標停在完美姿勢區按下去 ──
  const TK=6;let take=0,n=0,x=0,dir=1,wait=0,lastR='';const MV=['深蹲','硬舉','伏地挺身','弓箭步','棒式','肩推'];
  M.tip.innerHTML='游標跑到 <b style="color:#2a9a4a">綠色「完美姿勢」</b> 時按空白鍵（或點畫面）拍下這一顆鏡頭！';
  const shoot=()=>{if(fin||wait>0)return;const z=Math.abs(x-.5);take++;if(z<.07){n++;lastR='🎬 完美！一次 OK';fx.push({x:360,y:300,t:0,s:'⭐ PERFECT',c:'#ff8a3a'})}else if(z<.16){n+=.5;lastR='👌 還可以，剪一下就好'}else{lastR=['😵 姿勢跑掉了，NG！','🤣 笑場了，NG！','📱 家宜的訊息跳出來，NG！'][take%3]}wait=.7;if(take>=TK){res={n};finish(res)}};
  kd=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();if(!e.repeat)shoot()}else if(e.key=='Escape'&&!fin){fin=true;M.end();OVK.delete(kd)}};M.cv.addEventListener('pointerdown',shoot);
  const loop=now=>{if(!M.ov.isConnected){OVK.delete(kd);return}const dt=Math.min(.05,(now-lt)/1000);lt=now;wait-=dt;if(wait<=0){x+=dir*dt*(.75+take*.12);if(x>1){x=1;dir=-1}if(x<0){x=0;dir=1}}
   g.fillStyle='#2a2430';g.fillRect(0,0,W2,H2);g.fillStyle='#4a3a2a';g.fillRect(0,330,W2,190);if(coS().t.vid){g.fillStyle='rgba(255,240,180,.12)';g.beginPath();g.moveTo(120,0);g.lineTo(600,0);g.lineTo(520,330);g.lineTo(200,330);g.fill()}
   const sq=Math.abs(Math.sin(now/400));g.save();g.translate(360,345);g.scale(3.2,3.2);person(0,0,'#2a2a2e',0,take<TK?sq*.8:0,false);g.restore();
   g.strokeStyle='#fff';g.lineWidth=3;g.strokeRect(150,60,420,300);g.fillStyle='#e2412f';g.beginPath();g.arc(175,85,8,0,7);g.fill();g.fillStyle='#fff';g.font='bold 14px sans-serif';g.textAlign='left';g.fillText('REC',190,90);g.textAlign='center';
   g.font='bold 18px sans-serif';g.fillText(`第 ${Math.min(TK,take+1)} 顆鏡頭：${MV[take%6]}`,360,40);
   const bx=110,bw=500,by=410;g.fillStyle='#5a4a3a';g.fillRect(bx,by,bw,26);g.fillStyle='#f0a830';g.fillRect(bx+bw*.34,by,bw*.32,26);g.fillStyle='#3cc46a';g.fillRect(bx+bw*.43,by,bw*.14,26);g.fillStyle='#fff';g.fillRect(bx+bw*x-3,by-8,6,42);
   g.font='bold 16px sans-serif';g.fillStyle='#fff6dc';g.fillText(lastR,360,475);g.fillText(`⭐ 好鏡頭 ${n} / ${TK}`,360,505);
   fxDraw(dt);if(fin){g.fillStyle='rgba(255,255,255,.55)';g.fillRect(0,0,W2,H2);g.fillStyle='#2a8a4a';g.font='bold 44px sans-serif';g.fillText('🎬 殺青！上傳中……',360,280)}requestAnimationFrame(loop)};requestAnimationFrame(loop)}
 OVK.add(kd);
 function fxDraw(dt){for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;if(f.t>.9){fx.splice(i,1);continue}g.globalAlpha=1-f.t/.9;g.fillStyle=f.c||'#c0392b';g.font='bold 20px sans-serif';g.textAlign='center';g.fillText(f.s,f.x,f.y-f.t*40);g.globalAlpha=1}}}

// ════════ 升級商店 ════════
function coShop(back){const C=coS(),o=[];COK.forEach(k=>{const D=COW[k],nx=D.T[C.t[k]+1];if(!nx)return o.push([`${D.i} ${D.n}：${coTier(k).n}`,'✅ 已經是最高級了',()=>{},true]);
  const lock=C.cnt[k]<nx.need;o.push([`${D.i} ${nx.n}　💰${nx.p.toLocaleString('en-US')}`,lock?`🔒 先自己${D.n} ${nx.need} 次才會想升級（${C.cnt[k]}/${nx.need}）`:nx.d+(nx.auto?'・🤖 每週自動':''),()=>{if(st.money<nx.p)return toast('錢不夠');st.money-=nx.p;C.t[k]++;hud();SVDIRTY=1;try{hwPanel()}catch(e){}closeDlg();
   const story={'IG 健身帳號':'家宜幫你拍了第一張大頭照：「冠宏教練💪 退伍軍人・C 級教練」','教練官網＋線上預約':'官網上線了！家宜設計的 Logo 是一顆在舉啞鈴的愛心。','團課器材組（壺鈴、彈力帶）':'頂樓多了一整排壺鈴，團課變得好專業。','聘請助教阿翔':'阿翔是你在部隊帶過的學弟，剛考到 C 級證照：「學長，交給我！」','補光燈＋收音麥克風':'影片畫質大升級，看起來像專業頻道了！','線上訂閱課程平台':'「冠宏教練的居家訓練課」正式開賣！第一個訂閱的是小組的 RITA。'}[nx.n]||'';
   openDlg(`🎉 ${nx.n}！`,`${story}<br><br>${nx.d}。${nx.auto?'<br><b>🤖 從下個週末開始自動運作。</b>':''}<br><br>🏋️ 教練事業完成度：${Math.round(coPct()*100)}%`,[['衝啊！','',closeDlg]])},lock||st.money<nx.p])});
 openDlg('📈 教練事業升級'+`（💰${st.money.toLocaleString('en-US')}）`,'退伍後的夢想，從頂樓這間小健身房開始。',o.concat([['返回','',back||closeDlg]]))}
function coMenu(){const C=coS(),W=wkN();if(!coReady())return openDlg('🏋️ 教練事業','先把頂樓的<b>家庭健身房</b>整理好（清理 → 修繕 → 建設），才能開始招收會員。',[['好','',closeDlg]]);
 openDlg('🏋️ 冠宏教練的健身工作室',`🙋 會員 <b>${C.mem}/${coCap()}</b>　📝 詢問中 ${C.lead}　📹 追蹤 ${C.subs}<br>每堂團課每人 💰${coFee()}${st.cert?'（ACE 證照加成 ×1.5）':''}　｜　⭐ 口碑 ${Math.round(st.rep||0)}`,[
  ['📣 公園發傳單（小遊戲）',C.ad==W?'這個週末發過了':scene?'要到戶外才能發（點左邊面板的 📣）':'1 小時・⚡-8・招募新會員',()=>{closeDlg();coDo('ad')},C.ad==W||!!scene],
  coAuto('cls')?['🏋️ 會員團課','🤖 助教阿翔每週自動上課',()=>{},true]:['🏋️ 會員團課（節奏小遊戲）',C.cw==W?'這個週末上過了':C.mem<1?'還沒有會員':'1.5 小時・⚡-15・沒上課會員會流失！',()=>{closeDlg();coDo('cls')},C.cw==W||C.mem<1||scene!='家6F'],
  coAuto('vid')?['📹 教學影片','🤖 線上課程平台自動賺訂閱',()=>{},true]:['📹 拍教學影片（小遊戲）',C.vd==W?'這個週末拍過了':'1 小時・⚡-8・漲追蹤、帶來詢問',()=>{closeDlg();coDo('vid')},C.vd==W||scene!='家6F'],
  ['📈 教練事業升級',`完成度 ${Math.round(coPct()*100)}%`,()=>coShop(coMenu)],['離開','',closeDlg]])}
// 健身房選單加入口
{const _g=gymMenu;gymMenu=function(f0){const od=openDlg;openDlg=function(t,d,opts,...r){try{if(Array.isArray(opts)&&/家庭健身房/.test(t)){const i=opts.findIndex(q=>q[0]=='離開');opts.splice(i<0?opts.length:i,0,['🏋️ 冠宏教練的健身工作室',`會員 ${coS().mem} 人・團課、招生、拍片、升級`,coMenu])}}catch(e){}return od.call(this,t,d,opts,...r)};try{return _g.apply(this,arguments)}finally{openDlg=od}}}

// ════════ 家的藍圖：「教練」分頁 ════════
function coPanelHTML(){const C=coS(),W=wkN();if(!coReady()){let s=0;try{s=rnStage('gym')}catch(e){}return `<div class="rw">🏚️ 家庭健身房還沒蓋好<br><span style="opacity:.75">到 6F 頂樓：清理 → 修繕 → 建設</span>${hwBar(s/3,'#8ac24a')}</div>`}
 const cap=coCap(),nb=(()=>{let b=null;COK.forEach(k=>{const nx=COW[k].T[C.t[k]+1];if(!nx)return;const sc=(C.cnt[k]>=nx.need?0:1e6)+nx.p;if(!b||sc<b.sc)b={k,nx,sc}});return b})(),pc=Math.round(coPct()*100);
 const chip=(k,doneW,lab)=>`<b data-co="${k}" class="${coAuto(k)&&k!='ad'?'au':doneW?'ok':''}">${COW[k].i}${coAuto(k)&&k!='ad'?'🤖':doneW?'✓':''}</b>`;
 return `<div class="rw">🙋 會員 <b>${C.mem}/${cap}</b>　<span style="opacity:.75">詢問中 ${C.lead}</span>${hwBar(C.mem/cap,'#ff8a3a')}<div class="ch">${chip('ad',C.ad==W)}${chip('cls',C.cw==W)}${chip('vid',C.vd==W)}</div></div>
  ${C.mem>0&&C.cw!=W&&!coAuto('cls')?'<div class="rw" style="color:#c0392b">⚠ 本週還沒上團課，會員會流失！</div>':''}
  ${nb?`<div class="rw">🎯 下一個目標：${nb.nx.n}<br><span style="opacity:.75">${C.cnt[nb.k]<nb.nx.need?`再自己${COW[nb.k].n} ${nb.nx.need-C.cnt[nb.k]} 次解鎖`:`💰${Math.min(st.money,nb.nx.p).toLocaleString('en-US')} / ${nb.nx.p.toLocaleString('en-US')}`}</span>${hwBar(C.cnt[nb.k]<nb.nx.need?C.cnt[nb.k]/nb.nx.need:st.money/nb.nx.p,'#c98af0')}</div>`:'<div class="rw">🎉 教練事業全自動運轉！</div>'}
  <div class="rw">🏋️ 教練事業 <b>${pc}%</b>${hwBar(pc/100,'#ff8a3a')}</div>
  <div style="opacity:.7;margin-top:3px">💰 累計收入 ${C.earn.toLocaleString('en-US')}・📹 追蹤 ${C.subs}</div>`}
{const _hp=hwPanel;hwPanel=function(){const tab=hwTab;if(tab=='co')hwTab='hw';_hp.apply(this,arguments);hwTab=tab;try{if(hwEl.style.display=='none')return;const tb=hwEl.querySelector('.tb');if(!tb)return;
 if(!tb.querySelector('[data-tab="co"]'))tb.insertAdjacentHTML('beforeend',`<b data-tab="co" class="${hwTab=='co'?'on':''}">🏋️ 教練</b>`);if(hwTab=='co'){tb.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab=='co'));const bd=hwEl.querySelector('.bd'),last=bd&&[...bd.querySelectorAll('.rw')].find(x=>/家園完成度/.test(x.textContent));if(bd)bd.innerHTML=coPanelHTML()+(last?last.outerHTML:'')}}catch(e){console.error(e)}}}
hwEl.addEventListener('click',e=>{const c=e.target.closest('[data-co]');if(c){e.stopPropagation();coDo(c.dataset.co)}},true);
