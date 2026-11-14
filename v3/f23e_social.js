/* v5.2 黃禹豪一家、碳佐麻里（訂位制）、手機通話系統 */
I['黃禹豪的家']='🏡';I['碳佐麻里']='🔥';
/* ---------- 家具 ---------- */
FD.crib=(c,x,y,w,h)=>{R(c,x+1,y+h,w,3,'rgba(0,0,0,.22)');R(c,x,y+4,w,h-4,'#f4ead8');R(c,x+2,y+6,w-4,h-10,'#bfe0f4');for(let i=0;i<w;i+=4)R(c,x+i,y,1.6,h,'#e8d6b8');R(c,x,y,w,2,'#d9c09a');R(c,x,y+h-3,w,3,'#d9c09a');
 c.fillStyle='#ffd84a';c.beginPath();c.arc(x+w/2,y-6,2,0,7);c.fill();c.fillStyle='#ff8ab0';c.beginPath();c.arc(x+w/2-6,y-4,1.8,0,7);c.fill();c.fillStyle='#8ad0ff';c.beginPath();c.arc(x+w/2+6,y-4,1.8,0,7);c.fill();R(c,x+w/2-.4,y-10,.8,4,'#aaa')};
FD.playmat=(c,x,y,w,h)=>{for(let i=0;i<4;i++)for(let j=0;j<3;j++)R(c,x+i*w/4,y+j*h/3,w/4,h/3,['#ffd1dc','#c8e8ff','#fff1a8','#c8f0d0'][(i+j)%4]);R(c,x,y,w,1,'rgba(0,0,0,.1)')};
FD.chand=(c,x,y,w,h)=>{R(c,x+w/2-.5,y-30,1,30,'#a88a3a');c.fillStyle='#d8b45a';c.beginPath();c.ellipse(x+w/2,y,w/2,3,0,0,7);c.fill();for(let i=0;i<5;i++){const cx=x+3+i*(w-6)/4;R(c,cx-.6,y-5,1.2,4,'#fff');c.fillStyle='rgba(255,220,120,.95)';c.beginPath();c.arc(cx,y-6,1.3,0,7);c.fill()}
 for(let i=0;i<6;i++){c.fillStyle='rgba(200,230,255,.8)';c.fillRect(x+4+i*(w-8)/5,y+2,1,3)}};
FD.ftable=(c,x,y,w,h)=>{R(c,x+2,y+h+1,w,3,'rgba(0,0,0,.25)');c.fillStyle='#fdfbf4';c.beginPath();c.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,7);c.fill();c.fillStyle='#e8e2d0';c.beginPath();c.ellipse(x+w/2,y+h/2+2,w/2,h/2,0,0,Math.PI);c.fill();
 R(c,x+w/2-.6,y+h/2-6,1.2,5,'#fff');c.fillStyle='#ffd070';c.beginPath();c.arc(x+w/2,y+h/2-7,1.2,0,7);c.fill();c.fillStyle='#c0303a';c.beginPath();c.arc(x+w/2+5,y+h/2-1,1.6,0,7);c.fill();
 [[-9,0],[9,0]].forEach(q=>{c.fillStyle='#fff';c.beginPath();c.ellipse(x+w/2+q[0],y+h/2+1,4,2,0,0,7);c.fill();R(c,x+w/2+q[0]+5,y+h/2-3,1,4,'rgba(200,220,240,.9)');R(c,x+w/2+q[0]+4.4,y+h/2-4,2.2,1.6,'#8a1a2a')})};
FD.wine=(c,x,y,w,h)=>{R(c,x+1,y+h,w,3,'rgba(0,0,0,.25)');R(c,x,y,w,h,'#3a2416');for(let r=0;r<4;r++)for(let i=0;i<Math.floor(w/5);i++){c.fillStyle=['#5a0a1a','#2a4a1a','#7a1a2a'][(r+i)%3];c.beginPath();c.arc(x+3+i*5,y+5+r*(h-6)/4,1.8,0,7);c.fill()}};
/* ---------- 黃禹豪 ---------- */
FR.yuhao={n:'黃禹豪',ic:'🏀',who:'高中同學・保險業務',
 intro:'「欸！是我啦，小石頭！你該不會連我都忘了吧？」<br><i>（從高中籃球隊到現在一起上教會，他是你最鐵的兄弟。）</i>',
 bio:[[0,'綽號「小石頭」，你的高中同學，認識超過十五年'],[0,'高中籃球隊隊友，現在仍常一起打球'],[0,'職業：保險業務，很拚也很有責任感'],[1,'太太是余媛媛，兒子黃頌言還不會走路'],[1,'和你一起在城光復興堂聚會'],[2,'最愛吃阿香炭烤的烤蚵，喝珍奶要全糖']],
 where:'平日 18:00 後在家（小石頭的家，在家樂福東南邊）；週六下午常在操場籃球場；週日早上在教會。也可以直接用📱手機打給他。',
 likes:{drink:5,protein:6,lunch:4,coffee:3,book:2,cake:3},hint:'他最近在減重，但還是嘴饞……運動飲料或高蛋白他都會很開心。',
 lines:[['欸兄弟！最近怎樣？','要不要來我家坐坐？媛媛說要煮咖哩。','下禮拜主日要一起去喔！'],['頌言昨天終於會翻身了，我差點感動到哭！','跑業務好累，但想到老婆小孩就有力氣。','還記得高三那場冠軍賽嗎？你最後那顆球我到現在都記得！'],['有你這個兄弟真好，不管發生什麼事都可以找你。','我常為你禱告，希望你一切順利。','等頌言長大，我要教他打籃球，你當他乾爹好不好？']],
 acts:[{k:'ball',t:'🏀 約他打籃球',d:'免費・1.5 小時・好感+6・💪+1',m:0,h:1.5,fx:{j:12,s:-14,p:1},pt:6,hr:[7,21],msg:'你們在操場鬥牛，像回到高中一樣，最後兩個人躺在球場上大笑。'},
  {k:'eat',t:'🍖 約他吃阿香炭烤',d:'💰400・2 小時・好感+8',m:400,h:2,fx:{j:14,s:24},pt:8,hr:[11,23],msg:'烤蚵配啤酒，他聊起當爸爸的辛苦和甜蜜，你聽得很感動。'},
  {k:'pray',t:'🙏 一起禱告聊聊',d:'免費・1 小時・好感+5・🧠+1',m:0,h:1,fx:{j:8,w:1},pt:5,msg:'你們互相分享近況，為彼此禱告，心裡踏實了許多。'}]};
function yhInit(){if(st.fr&&!st.fr.yuhao)st.fr.yuhao={pt:55,met:1,td:-1,gd:-1,ad:{}}}
function yhAway(){const r=chHash(T.year*977+31);if(r>.45)return null;const d0=3+Math.floor(chHash(T.year*131+7)*18),d1=d0+6;return T.day>=d0&&T.day<=d1?{d0,d1}:null}
const yhHome=()=>{if(yhAway())return false;const h=T.hour,d=dow();return d==6?(h>=13&&h<23):d==5?(h>=19&&h<23):(h>=18&&h<23)};
def('黃禹豪的家',{W:340,H:220,f:'#e8d8bc',g:'#dccaa8',fl:'wood',w:'#7aa08a',
 fur:[['sofa',30,40,80,26,'#5a7a9a'],['tv',140,34,60,26],['bookcase',230,30,44,40],['cross',290,34,16,24],['frame',318,38,14,18],['rug',40,100,120,60],['playmat',190,110,70,44],['crib',272,96,50,40],['toybox',260,170,30,20],['table',60,170,60,24],['chair',40,172,14,16],['chair',126,172,14,16],['plant',16,180,16,26]],
 ppl:[],sp:[['baby',196,154,60,10]],spl:{baby:'頌言的遊戲墊'},spf:{baby:()=>babyMenu()},title:'🏡 小石頭的家・黃禹豪 ＆ 余媛媛',
 onEnter:rm=>{yhInit();const P=[];const aw=yhAway();if(aw){rm.ppl=[];rm.animf=null;toast(`📝 門上貼著紙條：「全家回大陸探親，第 ${aw.d1+1} 天回來！—— 禹豪、媛媛、頌言」`);return}P.push(pp('余媛媛',150,124,'#e8a0b8','#3a2210','',{own:1,dir:0,lk:GL('default',731),L:['你來啦！禹豪常說你是他最好的兄弟。','頌言最近很愛笑，你逗他看看～','要不要留下來吃晚餐？我煮了咖哩。','禹豪跑業務很辛苦，謝謝你常陪他打球。','我是大陸人，嫁來台灣好幾年了。偶爾我們全家會回大陸住一個禮拜，讓爸媽看看頌言。','我老家那邊冬天會下雪，等頌言大一點，想帶他去看雪。','下次回大陸，我帶家鄉的點心給你吃！'],bub:['歡迎歡迎！','要喝茶嗎？','頌言～叔叔來了！']}));
  if(yhHome())P.push(pp('黃禹豪',80,72,'#2f6a4a','#1a1a1a','',{fr:'yuhao',dir:0,still:1,lk:GL('office',732),bub:['兄弟！','要不要去打球？']}));
  else P[0].L=['禹豪去跑業務了，平日晚上六點後才會回來喔！','你可以先用手機打給他～','頌言最近很愛笑，你逗他看看～'];
  rm.ppl=P;
  const bb=pp('黃頌言',214,126,'#f4e0e0','#3a2a1a','',{own:1,dir:3,still:1,sit:1,L:['（咿咿呀呀地對你伸出小手）','（抓住你的手指不放，咯咯笑）','ㄚ……ㄅㄚ！（好像在叫爸比）','（打了一個大哈欠）'],bub:['咿咿～','ㄚㄚ！','嘻嘻','爸比！'],noHi:1});rm.ppl.push(bb);
  const SEQ=[['',1,0,3.5],['wave',0,0,2.5],['clap',0,0,2.5],['',0,1,4],['teddy',0,0,3],['up',0,0,2.5],['rattle',0,0,2.5],['sleepy',0,0,3]];let si=0,tn=3,last=null;
  rm.animf=(g,t)=>{const dt=last==null?0:Math.min(.1,t-last);last=t;tn-=dt;if(tn<=0){si=(si+1)%SEQ.length;const q=SEQ[si];bb.pose=q[0];bb.sit=q[1];bb.wk2=q[2];tn=q[3];bb.mv=false;bb.dir=3}
   if(bb.wk2){if(bb.tx2==null)bb.tx2=236;const dx=bb.tx2-bb.x;if(Math.abs(dx)<1)bb.tx2=bb.tx2>214?196:236;else{bb.x+=Math.sign(dx)*Math.min(Math.abs(dx),9*dt);bb.mv=true;bb.dir=dx<0?2:3}}}}});
function babyMenu(){openDlg('👶 黃頌言','還不會走路的小寶寶，坐在遊戲墊上對你咯咯笑。',[['🤗 抱抱頌言','😊+10',()=>{fxApply({j:10});advance(.2);hud();closeDlg();toast('頌言抓著你的手指不放，好可愛！')}],['🎵 唱詩歌給他聽','😊+6 🧠+1',()=>{fxApply({j:6,w:1});advance(.3);hud();closeDlg();toast('頌言聽著聽著就睡著了。媛媛：「你比禹豪還會哄！」')}],['🎁 送他小玩具 $200','好感+4（黃禹豪）',()=>{if(st.money<200)return;st.money-=200;yhInit();frAdd('yuhao',4);hud();closeDlg();toast('媛媛：「哇，謝謝乾爹！」')},st.money<200],['離開','',closeDlg]])}
mkNP({n:'黃禹豪',fr:'yuhao',c:'#2f6a4a',hair:'#1a1a1a',x:360,y:110,r:[330,70,60,90],mode:'a',sp:16,lk:GL('office',732),vf:()=>dow()==5&&T.hour>=14&&T.hour<18&&!yhAway(),L:['來啦！鬥牛！']});
(function(){const o=churchCast;churchCast=function(rm){o(rm);if(CHM()=='sun'&&!yhAway()){yhInit();rm.ppl.push(pp('黃禹豪',92,140,'#2f6a4a','#1a1a1a','',{fr:'yuhao',dyn:1,sit:1,dir:1,still:1,lk:GL('office',732)}));rm.ppl.push(pp('余媛媛',106,140,'#e8a0b8','#3a2210','',{own:1,dyn:1,sit:1,dir:1,still:1,lk:GL('default',731),L:['頌言在育嬰室睡覺，我偷偷溜出來聽道～']}))}}})();
/* ---------- 碳佐麻里 ---------- */
const FINE={set:2200,dep:500};
const resvToday=()=>st.resv&&st.resv.y==T.year&&st.resv.d==T.day;
function resvMenu(back){const o=[];for(let k=0;k<4;k++){const d=T.day+k,y=T.year+(d>30?1:0),dd=d>30?d-30:d;const lab=k==0?'今晚':k==1?'明晚':`第 ${dd} 天晚上`;
  o.push([`📅 預訂 ${lab}（19:00）`,'訂金 $'+FINE.dep+'（用餐時折抵）',()=>{if(st.money<FINE.dep)return;if(k==0&&T.hour>=21)return toast('今晚的訂位已截止');st.money-=FINE.dep;st.resv={y,d:dd};hud();closeDlg();toast(`🍷 訂位成功！${lab} 19:00，兩位，靠窗座位。`)},st.money<FINE.dep||!!st.resv])}
 if(st.resv)o.unshift(['❌ 取消目前訂位',`第 ${st.resv.d} 天（訂金不退）`,()=>{st.resv=null;closeDlg();toast('已取消訂位')}]);
 o.push(['返回','',back||closeDlg]);openDlg('📞 碳佐麻里・訂位專線','「您好，這裡是碳佐麻里。本店採全預約制，每晚只接待十二組客人。」<br>和牛燒肉套餐 $'+FINE.set+'／位'+(st.resv?`<br>目前訂位：第 ${st.resv.d} 天 19:00`:''),o)}
function compList(){const a=[];if(st.partner)a.push(st.partner);if(st.love>0&&!a.includes('小花'))a.push('小花');for(const id in FR){const s=st.fr&&st.fr[id];if(s&&s.met&&id!='yilun'&&!a.includes(FR[id].n))a.push(FR[id].n)}return a}
function fineDine(){const comps=compList(),cost=FINE.set*2-FINE.dep;
 const go=who=>{const total=who?cost:FINE.set-FINE.dep;if(st.money<total)return toast('💸 錢不夠，需要 $'+total);st.money-=total;st.resv=null;advance(2.5);
  let bonus='';if(who){fxApply({j:30,l:3,r:4});if(who=='小花'){st.love+=3;bonus='小花的好感大幅上升！💗'}else{const id=Object.keys(FR).find(k=>FR[k].n==who);if(id){frAdd(id,id=='yuhao'?12:20);bonus=who+'的好感大幅上升！💗'}}}else fxApply({j:16,l:2});
  hud();closeDlg();openDlg('🍷 碳佐麻里・和牛燒肉套餐',(who?`炭火的香氣、駐唱樂團的歌聲、庭院裡的錦鯉池……你和 <b>${who}</b> 度過了難忘的夜晚。<br>`:'你獨自享用了一頓精緻的晚餐。<br>')+'前菜：季節小菜・韓式泡菜<br>主菜：A5 和牛・厚切牛舌・松阪豬<br>海鮮：大蝦與干貝<br>甜點：抹茶冰淇淋<br><br>'+(bonus?'<b>'+bonus+'</b>':''),[['完美的夜晚','',closeDlg]])};
 const o=comps.map(n=>['💑 和 '+n+' 一起用餐','兩位 $'+cost+'（已扣訂金）・好感大幅提升',()=>go(n),st.money<cost]);o.push(['🍽️ 一個人用餐','$'+(FINE.set-FINE.dep),()=>go(null),st.money<FINE.set-FINE.dep]);o.push(['返回','',closeDlg]);
 openDlg('🍷 歡迎光臨，您的訂位已確認','領位員：「這邊請，為您保留了靠窗的座位。」<br>今天要和誰一起用餐呢？',o)}
SP['碳佐麻里']=()=>{const h=T.hour;if(resvToday()&&h>=17&&h<23)return[['🔥 依訂位入座用餐','和牛燒肉套餐 $'+FINE.set+'／位',fineDine]];
 return[['📅 訂位','本店全預約制'+(st.resv?`（已訂第 ${st.resv.d} 天）`:''),()=>resvMenu(()=>mainMenu('碳佐麻里'))],['🙇 我想直接用餐','',()=>openDlg('🍷 領位員',resvToday()?'「您的訂位是今晚 19:00，請 17:00 後再來～」':'「非常抱歉，本店採全預約制，今晚已經客滿了。歡迎先訂位喔！」',[['返回','',()=>mainMenu('碳佐麻里')]])]]};
def('碳佐麻里',{W:380,H:236,f:'#3a2a3a',g:'#33243a',fl:'carpet',w:'#1a2238',
 fur:[['wine',20,30,60,40],['piano',300,34,60,36],['chand',90,64,40,6],['chand',250,64,40,6],['ftable',50,96,50,28],['ftable',160,96,50,28],['ftable',270,104,50,28],['ftable',50,160,50,28],['ftable',160,160,50,28],['ftable',270,170,50,28],['counter',300,200,64,18,'#3a2a1a'],['plant',16,196,16,26],['plant',350,90,16,26]],
 ppl:[],sp:[['main',300,218,64,10]],title:'🔥 碳佐麻里・炭火燒肉',
 onEnter:rm=>{const P=[pp('領位員 小林',332,186,'#1a1a1a','#2a1a10','',{own:1,dir:0,lk:GL('office',801),L:['歡迎光臨碳佐麻里！請問有訂位嗎？','本店每晚只接待十二組客人，請見諒。','我們的和牛都是師傅一片一片手切的。'],bub:['歡迎光臨～','這邊請～','祝您用餐愉快。']}),
  pp('駐唱吉他手',236,60,'#6a1428','#1a1a1a','',{own:1,dir:0,pose:'guitar',lk:GL('default',802),L:['今晚為大家帶來幾首溫柔的歌。'],bub:['♪～','♫～♪']}),
  pp('燒肉職人',110,140,'#1a1a1a','#2a1a10','',{own:1,dir:0,lk:GL('office',803),L:['和牛每面烤十秒就好，我來幫您烤！'],bub:['幫您翻面～','請趁熱吃！']})];
  [[36,104,3],[100,104,2],[146,104,3],[210,104,2],[256,112,3],[320,112,2],[36,168,3]].forEach((q,i)=>{const g=genLook(['office','default','default','office','elder','default','office'][i],820+i);P.push(pp(g.name,q[0],q[1],'#888','#222','',{own:1,lk:g.lk,sit:1,dir:q[2],L:['這裡的和牛入口即化。','今天是我們的結婚紀念日。','訂了三個月才訂到！'],bub:i%3==0?['乾杯～','好浪漫…']:[]}))});
  rm.ppl=P;
  rm.animf=(g,t)=>{for(let i=0;i<3;i++){const ph=(t*.5+i*.33)%1;g.fillStyle=`rgba(255,230,160,${.7*(1-ph)})`;g.fillText&&g.fillRect(250+i*8,40-ph*16,2,2)}
   g.fillStyle='rgba(255,210,120,.06)';g.fillRect(0,0,380,236)}}});
/* ---------- 手機 ---------- */
function phoneMenu(){yhInit();const o=[];
 o.push(['🍷 碳佐麻里（訂位）',st.resv?`已訂第 ${st.resv.d} 天 19:00`:'全預約制',()=>resvMenu(phoneMenu)]);
 for(const id in FR){const s=st.fr&&st.fr[id];if(!s||!s.met)continue;const F=FR[id];o.push([`📞 ${F.ic} ${F.n}`,F.who+'・'+FRL[frLv(s.pt)][1],()=>phoneCall(id)])}
 if(st.love>0||st.partner=='小花')o.push(['📞 🌸 小花','聊聊天',()=>{const dk=dKey();if(st.xhCall!=dk){st.xhCall=dk;fxApply({j:6});hud()}openDlg('📞 小花','「喂～是你呀！今天過得好嗎？我剛剛在想你耶。」',[['掛斷','',phoneMenu]])}]);
 o.push(['關閉','',closeDlg]);openDlg('📱 手機・通訊錄','選擇要打給誰（P 鍵也能開手機）',o)}
function phoneCall(id){const F=FR[id],s=FRS(id),lv=frLv(s.pt),dk=dKey(),o=[];
 if(id=='yuhao'){const aw=yhAway();if(aw)return openDlg('📞 黃禹豪（小石頭）',`「喂～兄弟！我們全家回大陸探親啦，媛媛老家在那邊，這禮拜都不在台灣喔！第 ${aw.d1+1} 天回去再約你打球、吃炭烤！」<br><i>（電話那頭傳來頌言咿咿呀呀的聲音，還有長輩用家鄉話逗他。）</i>`,[['「一路平安，回來見！」','好感+1',()=>{if(s.td!=dk){s.td=dk;frAdd(id,1)}closeDlg()}],['掛斷','',phoneMenu]])}
 const busy=T.hour<7||T.hour>=23;if(busy)return openDlg('📞 '+F.n,'嘟……嘟……（太晚了，對方沒有接）',[['掛斷','',phoneMenu]]);
 o.push(['💬 閒聊','好感+2（每天一次）',()=>{const first=s.td!=dk;s.td=dk;if(first){frAdd(id,2);fxApply({j:3});hud()}openDlg('📞 '+F.n,pick0(F.lines[lv<2?0:lv<3?1:2],dk*7+(NOW/9000|0)),[['返回','',()=>phoneCall(id)]])}]);
 o.push(['📲 傳 LINE','好感+1（每天一次，和聊天共用）',()=>lineChat(id)]);
 F.acts.forEach(a=>{if(a.custom)return;const done=s.ad[a.k]==dk,hr=a.hr&&(T.hour<a.hr[0]||T.hour>=a.hr[1]),cost=Math.max(0,a.m||0);
  o.push(['📅 邀約：'+a.t.replace(/^\S+\s/,''),a.d+(done?'（今天已經約過）':hr?'（目前時段不適合）':''),()=>{s.ad[a.k]=dk;if(a.m>0)st.money-=a.m;advance((a.h||.5)+.3);fxApply(a.fx||{});frAdd(id,a.pt);hud();closeDlg();toast('📞 約好了！'+a.msg)},done||hr||st.money<cost])});
 o.push(['掛斷','',phoneMenu]);openDlg(`📞 通話中：${F.ic} ${F.n}`,id=='yuhao'?'「喂～兄弟！怎麼啦？」':'「喂？是你呀～」',o)}
function incomingCall(){yhInit();const s=FRS('yuhao'),dk=dKey();st.callDay=dk;
 const aw=yhAway();if(aw)return openDlg('📲 黃禹豪傳來訊息','📷「兄弟你看！頌言第一次見到爺爺奶奶，一直笑！媛媛說這裡的煎餅果子超好吃，回去帶點心給你～」',[['回一個讚 👍','好感+1',()=>{frAdd('yuhao',1);closeDlg()}]]);
 const ins=!st.insDay||dk-st.insDay>=20;
 if(ins&&Math.random()<.6)return openDlg('📲 來電：黃禹豪（小石頭）','「兄弟～我啦！上次幫你規劃的保單也一段時間了，要不要約個時間幫你檢視一下？順便喝杯咖啡！」',[
  ['好啊，約在咖啡店','1 小時・好感+4・保單健檢',()=>{st.insDay=dk;advance(1);frAdd('yuhao',4);fxApply({w:1,j:4});hud();closeDlg();openDlg('📋 保單健檢','小石頭認真地幫你把保單一頁一頁看過：「醫療險還夠，但你現在收入不一樣了，意外險可以再加強一點。」',[['加購意外險（$1,200）','之後在醫院花費減少（模擬）',()=>{if(st.money<1200)return;st.money-=1200;st.ins=1;frAdd('yuhao',3);hud();closeDlg();toast('🛡️ 已加保意外險。小石頭：「這樣我就放心了！」')},st.money<1200],['先維持就好','',()=>{closeDlg();toast('小石頭：「沒問題，有需要隨時打給我！」')}]])}],
  ['最近有點忙，改天吧','',()=>{closeDlg();toast('小石頭：「OK 啦，那下次再約！」')}]]);
 openDlg('📲 來電：黃禹豪（小石頭）',T.hour<17?'「欸！晚上有空嗎？操場鬥牛，輸的請珍奶！」':'「兄弟，要不要來我家吃飯？媛媛煮了一大鍋咖哩！」',[
  ['好啊！','好感+5',()=>{advance(1.5);frAdd('yuhao',5);fxApply(T.hour<17?{j:12,s:-12,p:1}:{j:12,s:22});hud();closeDlg();toast(T.hour<17?'🏀 你們打到滿身大汗，最後還是你請珍奶。':'🍛 媛媛的咖哩超好吃，頌言還對你笑了！')}],['今天不行耶','',()=>{closeDlg();toast('小石頭：「好啦，下次喔！」')}]])}
setInterval(()=>{try{yhInit();if(typeof dlg=='undefined'||!dlg.hidden||MG||typeof T=='undefined')return;if(T.hour<9||T.hour>=21)return;const dk=dKey();if(st.callDay==dk)return;if(Math.random()<.025)incomingCall()}catch(e){}},4000);
addEventListener('keydown',e=>{if((e.key=='p'||e.key=='P')&&!e.repeat&&typeof dlg!='undefined'&&dlg.hidden&&!MG&&!(e.target&&e.target.tagName=='INPUT'))phoneMenu()});
openMenu=(o=>function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts))opts.splice(2,0,['📱 手機','打電話・訂位（P）',()=>phoneMenu()]);opts.splice(opts.length-1,0,['🏠 回到標題畫面','自動存檔後回到開頭畫面',()=>backToTitle()]);return od.call(this,t,d,opts,...r)};try{return o.apply(this,arguments)}finally{openDlg=od}})(openMenu);
