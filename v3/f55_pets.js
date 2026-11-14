/* v10.3 教練課改成深蹲動作；寵物 2.0：洗澡、生病看獸醫、遛狗遇到狗友、寵物能力（狗挖寶、貓陪睡、柯爾鴨療癒、鸚鵡學說話） */
// ───────── 深蹲動作：把行走圖從腰部切開，上半身下沉、腿部壓縮 ─────────
function sqDraw(g,im,d){const S=3,top=-300,cut=74,foot=120,legH=(foot-cut)*S,k=Math.max(0,Math.min(1,d));
 const lh=legH*(1-.42*k),lw=192*(1+.18*k),sink=legH-lh;g.imageSmoothingEnabled=false;
 g.drawImage(im,0,cut,64,foot-cut,-lw/2,top+cut*S+sink,lw,lh);
 g.drawImage(im,0,0,64,cut,-96,top+sink,192,cut*S);
 // 深蹲時雙手往前平舉（簡單的手臂）
 if(k>.3){g.fillStyle='rgba(240,200,160,.95)';g.fillRect(-60,top+cut*S*.62+sink,120,10)}}
// ───────── 寵物 2.0 ─────────
const DOGS=['shiba','frenchie','frenchie_g','husky','corgi','poodle','golden','dachs'];
const isDog=pt=>pt&&(DOGS.includes(pt.k)||/犬|狗|柴|鬥牛|哈士奇|柯基|貴賓|獵犬|臘腸/.test(PETS[pt.k].n));
const isCat=pt=>pt&&PETS[pt.k].t=='cat';
const pt2=pt=>{pt.x2=pt.x2||{bath:-9,sick:0};return pt.x2};
IT.petsoap={n:'寵物洗毛精',i:'🧴',p:120,d:'溫和不刺激，洗完香香的。',u:'keep'};
{const _pd=petDetail;petDetail=function(id){const od=openDlg;openDlg=function(t,d,opts,...r){const pt=petOf(id);if(pt&&Array.isArray(opts)){const X=pt2(pt),W=wkN(),i=opts.findIndex(o=>o[0]=='返回'||o[0]=='關閉');
  if(X.sick)d=`🤒 <b>${pt.name}生病了</b>，精神很差。快帶去寵物店看獸醫！<br>`+d;
  opts.splice(i<0?opts.length:i,0,['🛁 幫牠洗澡（30 分鐘）',X.bath==W?'這週已經洗過了':`用 1 瓶寵物洗毛精（有 ${st.inv.petsoap||0} 瓶）・親密 +18`,()=>{st.inv.petsoap--;X.bath=W;pt.hap=Math.min(100,pt.hap+18);fxApply({j:5});advance(.5);hud();SVDIRTY=1;toast('🛁 '+pt.name+'洗得香噴噴，甩了你一身水！');petDetail(id)},X.bath==W||!(st.inv.petsoap>0)])}
  return od.call(this,t,d,opts,...r)};try{return _pd.apply(this,arguments)}finally{openDlg=od}}}
{const _sp=SP['寵物店'];SP['寵物店']=function(){const o=_sp.apply(this,arguments);const sick=st.pets.filter(p=>pt2(p).sick);
 o.splice(1,0,['🩺 獸醫門診',sick.length?sick.map(p=>p.name).join('、')+' 生病了・診療費 💰1,500':'目前寵物都很健康',()=>{sick.forEach(p=>{pt2(p).sick=0;p.hap=Math.min(100,p.hap+10)});payOut(1500*sick.length);hud();SVDIRTY=1;closeDlg();openDlg('🩺 獸醫門診',`獸醫師：「只是腸胃有點不舒服，吃藥休息幾天就好了。」<br>${sick.map(p=>p.name).join('、')}舔了舔你的手。`,[['謝謝醫生！','',closeDlg]])},!sick.length||funds()<1500*sick.length],['🧴 買寵物洗毛精（💰120）',`身上有 ${st.inv.petsoap||0} 瓶`,()=>{if(!addItem('petsoap',1))return;st.money-=120;hud();toast('🧴 買了寵物洗毛精');mainMenu('寵物店')},st.money<120]);return o}}
// 每個週末：生病、柯爾鴨療癒、鸚鵡學說話
const PARROT=['「家宜～家宜～」','「老公回來了！」','「陀螺！陀螺！」','「阿們！」','「吃飯囉～」'];
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{(st.pets||[]).forEach(pt=>{const X=pt2(pt);
  if(!X.sick&&Math.random()<(pt.hap<40?.12:.04)){X.sick=wkN();setTimeout(()=>whenFree(()=>openDlg('🤒 '+pt.name+'生病了',`${pt.name}一整天都沒什麼精神，飯也不太吃……<br>趕快帶去寵物店的獸醫門診看看吧。`,[['馬上去！','',closeDlg]])),5000)}
  if(X.sick){pt.hap=Math.max(0,pt.hap-8);fxApply({j:-3})}
  if(PETS[pt.k].t=='callduck'&&!X.sick)fxApply({j:3});
  if(PETS[pt.k].t=='parrot'&&Math.random()<.5)setTimeout(()=>toast('🦜 '+pt.name+'：'+PARROT[Math.floor(Math.random()*PARROT.length)]),6000)})}catch(e){}return r}}
// 貓陪睡：睡覺時有心情好的貓，隔天體力多 10
{const _gs=goSleep;goSleep=function(){const cat=(st.pets||[]).find(p=>isCat(p)&&p.hap>=60&&!pt2(p).sick);const r=_gs.apply(this,arguments);if(cat)setTimeout(()=>{st.sta=Math.min(staMax(),st.sta+10);hud();toast('🐱 '+cat.name+'整晚窩在你腳邊，睡得特別好（⚡+10）')},2500);return r}}
// ───────── 遛狗：在公園、花園廣場走一走，會遇到狗友 ─────────
const DOGPAL=[{n:'林太太',dog:'柴犬「旺財二號」',L:['「你家的狗好可愛！我們家旺財二號也是柴犬喔～」','「我每天早上七點都在這裡遛狗，以後一起走吧！」','「這是我自己烤的狗狗餅乾，給你家的一包！」'],gift:'petsoap'},
 {n:'阿傑',dog:'哈士奇「雪球」',L:['「啊！不好意思，雪球又暴衝了！」大學生阿傑被狗拖著跑。','「哈士奇真的超難帶……教練你可以教我怎麼練體力嗎？」','「我期末考過了！雪球也學會坐下了！今天我請你喝飲料！」'],gift:'px_tea'},
 {n:'陳爺爺',dog:'貴賓狗「妞妞」',L:['「妞妞今年十二歲了，跟我一樣是老人家囉。」','「我老伴走了以後，都是妞妞陪我。每天出來走走，身體才會好。」','「年輕人，謝謝你常常陪我聊天。這顆柚子給你。」'],gift:'px_pomelo'},
 {n:'Amy 一家',dog:'黃金獵犬「Lucky」',L:['三個小朋友圍著你的狗：「好可愛！可以摸嗎？」','Amy 媽媽：「我們家 Lucky 最喜歡跟別的狗玩了！」','小朋友畫了一張你和狗狗的圖送給你，上面寫著「大哥哥」。'],gift:null}];
const dwS=()=>st.dw||(st.dw={t:0,m:{},cd:0});
setInterval(()=>{try{if(scene||!dlg.hidden||window.TITLE||(typeof MG!='undefined'&&MG)||(typeof ED!='undefined'&&ED.on))return;const pt=compPet();if(!isDog(pt))return;
 const inA=A=>p.x>A.x&&p.x<A.x+A.w&&p.y>A.y&&p.y<A.y+A.h;if(!(inA(PARK)||inA(GARDEN)||inA(FIELD)))return;
 const D=dwS(),mv=window.__dwx!=null&&Math.hypot(p.x-window.__dwx,p.y-window.__dwy)>4;window.__dwx=p.x;window.__dwy=p.y;if(!mv)return;D.t++;
 if(D.t>=25){D.t=0;dogWalk(pt)}}catch(e){}},1000);
function dogWalk(pt){const D=dwS();fxApply({s:-3,j:4,h:2});pt.hap=Math.min(100,pt.hap+6);hud();SVDIRTY=1;
 const r=Math.random();if(r<.15){const v=100+Math.floor(Math.random()*5)*100;st.money+=v;hud();return openDlg('🐕 '+pt.name+'在挖土！',`${pt.name}在草地上一直挖、一直挖……挖出了一個生鏽的鐵罐，裡面有 <b>💰${v}</b>！`,[['好狗狗！','',closeDlg]])}
 if(r<.6){const i=Math.floor(Math.random()*DOGPAL.length),P=DOGPAL[i],n=D.m[i]||0;D.m[i]=n+1;const line=P.L[Math.min(n,P.L.length-1)];fxApply({j:5,r:1});
  if(n==2&&P.gift)addItem(P.gift,1);hud();
  return openDlg('🐾 遛狗遇到狗友：'+P.n,`${P.n}牽著${P.dog}走過來。<br>${line}${n==2?(P.gift?`<br><br>🎁 收到 ${IT[P.gift].i} ${IT[P.gift].n}`:''):''}<br><br><span style="font-size:12px;opacity:.75">狗友熟識度 ${Math.min(3,n+1)}/3</span>`,[['汪！','',closeDlg]])}
 toast('🐕 和'+pt.name+'散步，'+pt.name+'開心地搖尾巴（親密 +6）')}
