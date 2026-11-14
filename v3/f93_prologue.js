/* v13.4 序章（可玩）：序一 一個人的老公寓（Binder、林園公園喝咖啡）→ 序二 交往與信仰（十鼓滑索、關子嶺、受洗）→ 序三 頂樓求婚與婚禮
   每章最多 8 個週末；時間到還沒完成，就快轉劇情（結局會記住「有點匆忙」）。婚禮後播放生日回憶輪播，接正章。 */
const PROCH={1:{t:'序一・一個人的老公寓',yr:'民國 111 年',age:28},2:{t:'序二・交往與信仰',yr:'民國 112～113 年',age:29},3:{t:'序三・求婚',yr:'民國 114 年',age:31}};
const PROMAX=8;
const proOn=()=>!!(st.pro&&st.pro.ch>=1&&st.pro.ch<=3);
const proUsed=()=>st.pro?Math.max(1,wkN()-st.pro.w0+1):0;
window.AGEF=()=>{const P=st.pro;if(!P)return 32+T.year-1;if(P.ch<=3)return PROCH[P.ch].age+(P.ch==2&&proUsed()>4?1:0);return 32+Math.max(0,T.year-(P.y0||T.year))};
window.PROYJCAP=()=>proOn()?30:11;
const proFriends=()=>Object.keys(FR).filter(k=>k!='yijia'&&FRS(k).met&&FRS(k).pt>=25);
// 各章目標
function proGoals(ch){const P=st.pro||{},y=yjS(),pt=FRS('yijia').pt;
 if(ch==1)return[['💘 用 Binder 交友 App 找到聊得來的人',!!P.bind],['💬 每天聊天，聊一整個禮拜（平日在營區用手機聊）',!!P.chat],['☕ 晚上 19:00 後到公園，第一次見面',!!P.m1]];
 if(ch==2)return[['🙋 陪家宜去社福中心當志工（好感 50）',!!y.t1],['⛪ 邀家宜參加教會活動（好感 60）',!!y.t2],['🎢 約家宜去台南十鼓（好感 40）',!!P.shigu],['💐 帶花束到花園廣場告白（好感 80）',st.partner=='劉家宜'],['♨️ 一起去關子嶺泡溫泉、看夜景',!!P.gzl],['🕊️ 一起上真道問答、受洗',!!y.bapt]];
 if(ch==3){let rc=0;try{rc=rnS().roof.s>=1}catch(e){}return[['🧹 把堆滿雜物的頂樓清乾淨（頂樓・6F）',!!rc||!!y.prop],['🎈 家樂福：氣球、燈串',(st.inv.g_balloon>0&&st.inv.g_lights>0)||!!y.prop],['💍 買求婚戒指（飾品店／家樂福）',st.inv.g_ring>0||!!y.prop],[`👥 邀朋友來幫忙（好感 25 以上的朋友 ${Math.min(2,proFriends().length)}/2）`,proFriends().length>=2||!!y.prop],['🎂 家宜生日：頂樓求婚驚喜',!!y.prop],['💒 請以倫牧師證婚（💰30,000）',!!y.wed]]}
 return[]}
const proAllDone=ch=>proGoals(ch).every(g=>g[1]);
// ───────── 任務欄 ─────────
{const _q=qpanel;qpanel=function(){if(!proOn())return _q.apply(this,arguments);const P=st.pro,C=PROCH[P.ch],G=proGoals(P.ch),u=proUsed(),done=G.filter(g=>g[1]).length,all=done==G.length;
 qp.innerHTML=`<b>📖 ${C.t}</b><div class="text-[10px] opacity-80">${C.yr}・${age()} 歲・⏳ 第 ${Math.min(u,PROMAX)}/${PROMAX} 個週末</div>`+(qOpen?(()=>{const cur=G.findIndex(g=>!g[1]);return G.filter((g,i)=>g[1]||i==cur).map(g=>`<div class="mt-1 ${g[1]?'text-green-300':''}">${g[1]?'✅':'⬜'} ${g[0]}</div>`).join('')+(cur>=0&&G.slice(cur+1).some(g=>!g[1])?'<div class="mt-1" style="opacity:.55;font-size:10px">🔒 完成這一項，下一個目標就會出現</div>':'')})()+(all&&P.ch<3?'<div class="mt-1" style="color:#ffd84a;font-weight:800">▶ 點這裡進入下一章</div>':''):` ${done}/${G.length} ▸`)}}
{const _o=qp.onclick;qp.onclick=function(){if(proOn()&&qOpen&&proAllDone(st.pro.ch)&&st.pro.ch<3&&dlg.hidden)return proNext();qOpen=!qOpen;qpanel()}}
// ───────── 開新遊戲：序章開始 ─────────
{const _n=wkNewGame;wkNewGame=function(){st.pro={ch:1,w0:wkN()};const r=_n.apply(this,arguments);st.pro.w0=wkN();setTimeout(()=>whenFree(proIntro),1500);return r}}
function proIntro(){const P=st.pro;if(!P||P.intro)return;P.intro=1;SVDIRTY=1;
 storyPages('📖 序一・一個人的老公寓',[Q_('民國 111 年，你 28 歲，是一名職業軍人。<br>平日住在營區，只有週末才能回到小鎮。'),
  Q_('你剛買下一間三十多年的老公寓——五樓，沒有電梯。<br>前屋主丁先生一家搬走時，留下了一堆雜物、一個堆滿東西的頂樓，還有樓梯間的一台舊腳踏車。'),
  Q_('房子很大，卻很安靜。<br>每個週末回到家，迎接你的只有自己的腳步聲。<br><br>老爸打電話來：「欸嫩啊，房子都買了，該結婚成家立業了吧？」'),
  Q_('<span style="font-size:12px;opacity:.85">📖 序章有 3 章，每章最多 8 個週末。左上角的任務欄會告訴你這一章要做什麼。<br>按 <b>P</b> 打開手機 → 「💘 Binder」開始交友！</span>')],
  ()=>{qOpen=true;qpanel();setTimeout(()=>toast('📱 手機跳出通知：「Binder：你有 12 個新的配對推薦！」（按 P 打開手機）'),600)},'開始')}
// 手機：Binder
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)&&st.pro&&st.pro.ch>=1&&!opts.some(q=>q[0]=='💘 Binder')){opts.unshift(['💘 Binder',st.pro.chat||st.pro.cpart?'和 Kai 的聊天紀錄':'交友 App'+(st.pro.bind?'・有新訊息！':''),()=>{closeDlg();st.pro.chat?binderLog():st.pro.cpart?binderLog():binderApp()},0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
// 序一：還沒在公園見過面之前，家宜只是陌生人
{const _f=frTalk;frTalk=function(n){if(n&&n.fr=='yijia'&&st.pro&&st.pro.ch==1&&!st.pro.m1)return openDlg('👀 ……','一個戴著圓框眼鏡、瀏海齊齊的女生，對你禮貌地點點頭，又低頭看手機。<br><span style="font-size:12px;opacity:.75">（你們還不認識。）</span>',[['（點頭回禮）','',closeDlg]]);return _f.apply(this,arguments)}}

// ═════════ 共用：手機畫面覆蓋層 ═════════
function proOv(){window.TITLE=true;window.OVL=(window.OVL||0)+1;Object.keys(keys).forEach(k=>keys[k]=0);const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99990;background:rgba(10,6,2,.78);display:flex;align-items:center;justify-content:center';
 ov.innerHTML='<div class="bph" style="width:min(92vw,360px);height:min(88vh,640px);background:#fff;border-radius:28px;border:6px solid #222;box-shadow:0 20px 50px rgba(0,0,0,.6);display:flex;flex-direction:column;overflow:hidden;font-family:inherit;color:#222"></div>';document.body.appendChild(ov);
 return{ov,ph:ov.querySelector('.bph'),end(){ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL}}}
const BCSS='.bbt{font:inherit;font-weight:800;border:0;border-radius:999px;cursor:pointer}.bmsg{max-width:78%;padding:7px 11px;border-radius:16px;margin:4px 0;font-size:13.5px;line-height:1.45;animation:bIn .25s}.bme{align-self:flex-end;background:#ff5a7a;color:#fff;border-bottom-right-radius:4px}.byou{align-self:flex-start;background:#f0f0f4;border-bottom-left-radius:4px}@keyframes bIn{from{opacity:0;transform:translateY(6px)}}.bopt{display:block;width:100%;text-align:left;margin-top:6px;padding:8px 12px;border-radius:12px;border:2px solid #ff5a7a;background:#fff;color:#c2304f;font:inherit;font-size:13px;font-weight:700;cursor:pointer}';
{const s=document.createElement('style');s.textContent=BCSS;document.head.appendChild(s)}
function proYjLk(){try{const n=yjMk(0,0);return n.lk||lookFor(n)}catch(e){return null}}
function proPortrait(cv,who){const c=cv.getContext('2d');c.imageSmoothingEnabled=false;try{c.drawImage(who=='me'?portrait('me',{n:'me'}):portrait('npc',yjMk(0,0)),0,0,cv.width,cv.height)}catch(e){c.fillStyle='#ddd';c.fillRect(0,0,cv.width,cv.height)}}

// ═════════ 序一 ① Binder：滑卡配對 ═════════
const BCARD=[{n:'小芳',ic:'🏋️‍♀️',bg:'#ffd6a0',bio:'健身房常客｜每天練腿｜徵一起深蹲的人',r:'她回：「你深蹲幾公斤？」你還沒回，她就已讀了。'},
 {n:'阿德',ic:'🎣',bg:'#bfe0ff',bio:'喜歡釣魚、露營、烤肉……咦？',r:'等等，阿德是男生啊！你趕快把設定改回來。'},
 {n:'Kai',yj:1,bg:'#ffc8d6',bio:'來自澳門・會講粵語<br>喜歡到處吃吃喝喝、拍照、散步'},
 {n:'Vivi',ic:'💄',bg:'#e8d0ff',bio:'自介：請先傳你的年收入',r:'……你默默往左滑了。'}];
function binderApp(){const P=st.pro;if(P.bind)return binderChat();const B=proOv(),ph=B.ph;let i=0;
 const head='<div style="background:linear-gradient(90deg,#ff5a7a,#ff9a5a);color:#fff;padding:12px 16px;font-weight:900;font-size:20px;letter-spacing:1px">🔥 Binder<span style="float:right;font-size:12px;opacity:.9;margin-top:6px">附近的人</span></div>';
 const show=msg=>{const C=BCARD[i%BCARD.length];ph.innerHTML=head+`<div style="flex:1;padding:14px;display:flex;flex-direction:column;gap:10px">
  <div style="flex:1;border-radius:18px;background:${C.bg};position:relative;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center">
   <canvas width="160" height="160" style="width:70%;image-rendering:pixelated;border-radius:12px"></canvas>${C.yj?'':`<div style="position:absolute;right:12px;top:10px;font-size:40px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))">${C.ic}</div>`}
   <div style="position:absolute;left:0;right:0;bottom:0;padding:12px 14px;background:linear-gradient(transparent,rgba(0,0,0,.65));color:#fff"><b style="font-size:22px">${C.n}</b><div style="font-size:13px;line-height:1.4">${C.bio}</div></div></div>
  <div style="min-height:34px;font-size:12.5px;color:#c2304f;text-align:center">${msg||''}</div>
  <div style="display:flex;justify-content:space-around;padding-bottom:6px"><button class="bbt bl" style="width:64px;height:64px;font-size:28px;background:#f4f4f6;color:#888">✖</button><button class="bbt br" style="width:64px;height:64px;font-size:28px;background:#ff5a7a;color:#fff">💚</button></div></div>`;
  if(C.yj)proPortrait(ph.querySelector('canvas'),'yj');else bPortrait(ph.querySelector('canvas'),C);
  ph.querySelector('.bl').onclick=()=>{if(C.yj){return show('手滑了……！還好 Binder 有「反悔」功能，你立刻滑回來。')}i++;show()};
  ph.querySelector('.br').onclick=()=>{if(C.yj)return match();const m=C.r;i++;show(m)}};
 const match=()=>{ph.innerHTML=`<div style="flex:1;background:linear-gradient(160deg,#ff5a7a,#ffb35a);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center">
  <div style="font-size:34px;font-weight:900;font-style:italic;text-shadow:0 3px 0 rgba(0,0,0,.2)">It's a Match!</div><div style="display:flex;gap:-10px"><canvas class="m1" width="96" height="96" style="width:96px;border-radius:50%;border:4px solid #fff;background:#fff;image-rendering:pixelated"></canvas><canvas class="m2" width="96" height="96" style="width:96px;border-radius:50%;border:4px solid #fff;background:#fff;margin-left:-14px;image-rendering:pixelated"></canvas></div>
  <div style="font-size:14px">你和 Kai 互相喜歡了！</div><button class="bbt go" style="padding:10px 26px;background:#fff;color:#ff5a7a;font-size:15px">💬 傳訊息</button></div>`;
  proPortrait(ph.querySelector('.m1'),'me');proPortrait(ph.querySelector('.m2'),'yj');P.bind=1;SVDIRTY=1;qpanel();ph.querySelector('.go').onclick=()=>{B.end();binderChat()}};
 show();OVK.add(function k(e){if(!B.ov.isConnected){OVK.delete(k);return}if(e.key=='Escape'){OVK.delete(k);B.end()}})}
// ② 聊天一個禮拜
const BCHAT=[{k:['哈囉～你的照片是在健身房拍的嗎？😂'],o:[['對啊，我平常很愛運動。妳呢？','我啊……我比較愛吃東西 😆 運動的話，散步算嗎？'],['被妳發現了，那是我最帥的角度','哈哈哈，好有自信喔！'],['……可以假裝沒看到嗎','太遲了，我已經截圖了 😏']]},
 {k:['我是澳門人，來台灣唸書，後來就留下來了。'],o:[['澳門！那妳會講廣東話嗎？','係呀～我教你講一句：「早晨」，就是早安的意思 ☀️'],['一個人在台灣，會不會很辛苦？','……會啊，但習慣了。謝謝你這樣問，很少人會問這個。']]},
 {k:['那你呢？你是做什麼的？'],o:[['我是職業軍人，平常住營區，週末才放假。','哇，那你週末都在做什麼？'],['保家衛國的那種 💪','哈哈哈，那請問阿兵哥週末都在幹嘛？']]},
 {k:['（她傳來一張晚餐的照片）今天吃這個！你吃了沒？'],o:[['還沒，看到妳的照片突然好餓','那下次帶你去吃！屏東好多好吃的我都還沒去過～'],['吃了營區的伙食……妳的看起來好多了','哈哈，辛苦了！下次放假吃好一點啦']]}];
function binderChat(seg,onDone){const P=st.pro;if(P.chat)return;seg=seg||(P.cpart?2:1);const B=proOv(),ph=B.ph;
 ph.innerHTML=`<div style="background:#fff;border-bottom:1px solid #eee;padding:10px 14px;display:flex;align-items:center;gap:10px"><canvas width="64" height="64" style="width:38px;border-radius:50%;background:#ffe;image-rendering:pixelated"></canvas><div><b>Kai</b><div style="font-size:11px;color:#2a9d5c">● 線上</div></div></div><div class="bl" style="flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;background:#fafafa"></div><div class="bo" style="padding:8px 12px 14px;background:#fff;border-top:1px solid #eee;min-height:60px"></div>`;
 proPortrait(ph.querySelector('canvas'),'yj');const L=ph.querySelector('.bl'),O=ph.querySelector('.bo');
 const put=(t,k)=>{const d=document.createElement('div');if(k==2)d.style.cssText='align-self:center;font-size:11.5px;color:#999;margin:8px 0;text-align:center;line-height:1.5';else d.className='bmsg '+(k?'bme':'byou');d.innerHTML=t;L.appendChild(d);L.scrollTop=L.scrollHeight;return d};
 const add=(t,me)=>{(P.blog=P.blog||[]).push([t,me?1:0]);put(t,me)};
 const sys=t=>{(P.blog=P.blog||[]).push([t,2]);put(t,2)};
 const btn=(t,f)=>{const b=document.createElement('button');b.className='bopt';b.style.textAlign='center';b.style.background='#ff5a7a';b.style.color='#fff';b.textContent=t;b.onclick=f;O.innerHTML='';O.appendChild(b)};
 const close=()=>{OVK.delete(kk);B.end()};
 let i;if(seg==1){P.blog=[];i=0}else{(P.blog||[]).forEach(q=>{const d=put(q[0],q[1]);d.style.animation='none';d.style.opacity=.75});i=BCHAT.findIndex(c=>c.wk)}
 const end=seg==1?BCHAT.findIndex(c=>c.wk):BCHAT.length;
 const day=()=>sys('—— '+BCHAT[i].d+' ——');
 const step=()=>{if(i>=end)return seg==1?pause():fin();const S=BCHAT[i];O.innerHTML='<div style="font-size:12px;color:#aaa">Kai 正在輸入…</div>';
  setTimeout(()=>{S.k.forEach(t=>add(t));O.innerHTML='';S.o.forEach(q=>{const b=document.createElement('button');b.className='bopt';b.textContent=q[0];b.onclick=()=>{O.innerHTML='';add(q[0],1);setTimeout(()=>{add(q[1]);i++;
   if(i<end&&BCHAT[i].d)setTimeout(()=>btn('▶ 下一頁（'+BCHAT[i].d+'）',()=>{O.innerHTML='';day();setTimeout(step,500)}),700);else setTimeout(step,900)},800)};O.appendChild(b)})},700)};
 // 週末第一晚聊完：等收假回營，平日繼續用手機聊
 const pause=()=>{setTimeout(()=>{add('好晚了～你早點睡，明天還要放假玩呢 😴');setTimeout(()=>{sys('（週一收假回營之後，你們會繼續在手機上聊。）');P.cpart=1;SVDIRTY=1;qpanel();btn('▶ 關閉手機',()=>{close();toast('💬 收假回營後，你們會在手機上繼續聊……（週末照常過就好）')})},900)},700)};
 const fin=()=>{sys('那一個禮拜，你們每天都聊到半夜。<br>老實說，這是你第一次這麼敞開地，對一個女生講這麼多話。');
  setTimeout(()=>{O.innerHTML='';const b=document.createElement('button');b.className='bopt';b.textContent='💌 鼓起勇氣約她出來見面';
   b.onclick=()=>{add('那個……這週末要不要出來見個面？',1);setTimeout(()=>add('林園那邊有個公園，晚上我們喝杯飲料、聊聊天？',1),500);setTimeout(()=>add('好啊～ ☺️ 那就這週末晚上見！'),1600);O.innerHTML='';P.chat=1;SVDIRTY=1;qpanel();setTimeout(()=>{close();if(onDone)onDone();setTimeout(()=>toast('🧋 約好了！這個週末晚上 19:00 後到公園，第一次見面（按 M 地圖看公園位置）'),onDone?4000:0)},900)};O.appendChild(b)},1600)};
 if(seg==1){day();step()}else{sys('🪖 週一 07:00　收假回營');setTimeout(()=>btn('▶ 下一頁（'+BCHAT[i].d+'）',()=>{O.innerHTML='';day();setTimeout(step,500)}),700)}
 const kk=e=>{if(!B.ov.isConnected){OVK.delete(kk);return}if(e.key=='Escape'&&seg==1){close()}};OVK.add(kk)}
// 收假回營 → 平日在營區用手機聊 → 放假回小鎮
{const _a=wkArrive;wkArrive=function(){const P=st.pro,self=this,a=arguments;if(P&&P.ch==1&&P.cpart&&!P.chat){setTimeout(()=>binderChat(2,()=>_a.apply(self,a)),300);return}return _a.apply(this,arguments)}}
// ═════════ 序一 ③ 林園的公園：晚上喝咖啡 ═════════
setInterval(()=>{try{const P=st.pro;if(!P||P.ch!=1||!P.chat||P.m1||scene||window.TITLE||!dlg.hidden||MG)return;if(!(T.hour>=19||T.hour<1))return;
 if(p.x>PARK.x-10&&p.x<PARK.x+PARK.w+10&&p.y>PARK.y-10&&p.y<PARK.y+PARK.h+10)parkDate()}catch(e){}},700);
function parkScene(g,S,t){const W2=720,H2=520;const sky=g.createLinearGradient(0,0,0,H2);sky.addColorStop(0,'#0b1030');sky.addColorStop(.6,'#1d2350');sky.addColorStop(1,'#2a2a3a');g.fillStyle=sky;g.fillRect(0,0,W2,H2);
 for(let i=0;i<70;i++){const x=(i*137)%W2,y=(i*71)%260,tw=.5+.5*Math.sin(t*2+i);g.fillStyle=`rgba(255,255,230,${.25+tw*.6})`;g.fillRect(x,y,2,2)}
 g.fillStyle='#fff6d0';g.beginPath();g.arc(600,80,26,0,7);g.fill();g.fillStyle='#1d2350';g.beginPath();g.arc(612,72,24,0,7);g.fill();
 g.fillStyle='#0f1a14';for(let i=0;i<9;i++){const x=i*90-20;g.beginPath();g.arc(x+45,300,60+(i%3)*12,0,7);g.fill()}g.fillRect(0,300,W2,40);
 g.fillStyle='#2a3a2a';g.fillRect(0,340,W2,180);g.fillStyle='#3a4a36';for(let i=0;i<W2;i+=30)g.fillRect(i,340+(i%60?0:4),2,180);
 // 路燈
 const lx=470;const gl=g.createRadialGradient(lx,180,5,lx,260,220);gl.addColorStop(0,'rgba(255,220,140,.55)');gl.addColorStop(1,'rgba(255,220,140,0)');g.fillStyle=gl;g.fillRect(lx-240,40,480,480);
 g.fillStyle='#222';g.fillRect(lx-4,170,8,230);g.fillStyle='#ffe9a8';g.fillRect(lx-14,160,28,16);g.fillStyle='#333';g.fillRect(lx-18,154,36,6);
 // 長椅
 g.fillStyle='#6a4a2a';g.fillRect(200,380,280,14);g.fillRect(200,350,280,10);g.fillStyle='#3a2a1a';g.fillRect(215,394,10,30);g.fillRect(455,394,10,30);
 // 兩個人
 const me=ALLEN,yj=S.lk;g.save();g.scale(3,3);try{drawChar(g,{x:95,y:126,dir:3,mv:false,fr:0,lk:me,ph:t,sit:1});if(yj)drawChar(g,{x:118,y:126,dir:2,mv:false,fr:0,lk:yj,ph:t+1,sit:1})}catch(e){}g.restore();
 // 咖啡
 const cup=(x)=>{g.fillStyle='#f4f0e8';g.fillRect(x,374,12,14);g.fillStyle=S.tea?'#c8946a':'#6a3a1a';g.fillRect(x,372,12,3);g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.beginPath();g.moveTo(x+6,368);g.quadraticCurveTo(x+10+Math.sin(t*3)*3,360,x+6,352);g.stroke()};cup(250);cup(420);
 S.hearts=S.hearts.filter(h=>(h.t+=.016)<2);S.hearts.forEach(h=>{g.globalAlpha=1-h.t/2;g.font='26px sans-serif';g.fillText('💗',h.x,h.y-h.t*60);g.globalAlpha=1})}
const PKD=[{n:'你提早十分鐘到，手裡拿著兩杯熱咖啡，心跳得有點快。<br>路燈下，一個戴圓框眼鏡、瀏海齊齊的女生朝你揮手。',k:'「你就是 Allen？本人比照片……嗯，黑一點耶。」',o:[['「剛從營區出來，曬的啦！」',2,'她笑出來：「好啦，阿兵哥辛苦了。」'],['「妳本人比照片還可愛。」',3,'她愣了一下，低頭笑：「……你很會講耶。」']]},
 {n:'你們在長椅上坐下，你把咖啡遞給她。',k:'「啊……謝謝你！可是我晚上不喝咖啡耶，喝了會整晚睡不著 😅」',o:[['「那我去旁邊買奶茶！等我一下。」',3,'你小跑步去對面的飲料店，換了兩杯熱奶茶回來。<br>她捧著杯子笑：「你也太認真了吧……謝謝。」'],['「那……兩杯我都喝掉？」',2,'「哈哈哈你會睡不著啦！」<br>最後你們一起走去飲料店，換成兩杯熱奶茶。']],tea:1},
 {n:'',k:'「澳門很小，走路就能逛完。台灣好大，我來這麼多年，到現在還常常迷路。」',o:[['「那以後我帶妳逛。」',3,'她轉頭看你，眼睛彎彎的：「好啊，說好了喔。」'],['「我也很常迷路，我們可以一起迷路。」',2,'「這樣不是更慘嗎！」她笑著搥了你一下。']]},
 {n:'',k:'「當軍人會不會很累？只有週末能回來。」',o:[['「累啊。但週末能這樣聊天，就覺得值得了。」',3,'她沒說話，只是把奶茶杯輕輕碰了一下你的。'],['「還好啦，我體力很好！」（秀一下手臂）',1,'「……好啦好啦，很壯很壯。」她憋笑。']]},
 {n:'不知不覺，奶茶早就喝完了。公園裡只剩下你們兩個，和偶爾飛過的小蟲。',k:'「欸，都這麼晚了……今天很開心。」<br>她站起來，拍拍裙子，又回頭看你：<br>「下次……一起約出來吃飯？」',o:[['「好！我知道一家很好吃的，下次帶妳去。」',3,''],['「好啊，妳想吃什麼都可以！」',2,'']]}];
function parkDate(){const P=st.pro;if(P.m1||P.pkGo)return;P.pkGo=1;const M=mgBox('🧋 林園的公園・晚上'),g=M.g,S={i:0,sc:0,hearts:[],lk:proYjLk(),t:0,done:false};
 let last=performance.now();const loop=now=>{if(S.done)return;const dt=(now-last)/1000;last=now;S.t+=dt;parkScene(g,S,S.t);requestAnimationFrame(loop)};requestAnimationFrame(loop);
 const say=(html,opts)=>{M.tip.innerHTML=html;mgButtons(M,opts)};
 const beat=()=>{const B=PKD[S.i];if(B.tea)S.teaN=1;say((B.n?`<i style="opacity:.85">${B.n}</i><br>`:'')+`<b>家宜：</b>${B.k}`,B.o.map(q=>[q[0],()=>{S.sc+=q[1];if(S.teaN)S.tea=1;if(q[1]>=3)S.hearts.push({x:330+Math.random()*60,y:330,t:0});
  if(q[2])say(q[2],[['▶ 繼續',()=>{S.i++;S.i<PKD.length?beat():fin()}]]);else{S.i++;S.i<PKD.length?beat():fin()}}]))};
 const fin=()=>{say('<i>回家的路上，你一直看著手機。<br>她傳來一則訊息：「到家了嗎？今天真的很開心 ☺️」</i>',[['💗 回家',()=>{S.done=true;M.end();P.m1=1;const s=FRS('yijia');s.met=1;s.pt=Math.max(s.pt,10+S.sc);advance(3);fxApply({j:20});hud();SVDIRTY=1;qpanel();
   whenFree(()=>openDlg('💗 第一次見面','你們在林園的公園，喝著奶茶聊到很晚。<br>她叫<b>劉家宜</b>，朋友都叫她 Kai。<br><br>💗 認識了家宜（好感 '+s.pt+'）<br><span style="font-size:12px;opacity:.8">之後可以在公園、咖啡廳遇到她，也能打電話約她。</span>',[['💞','',closeDlg]]))}]])};
 beat()}

// ═════════ 章節推進／時間上限 ═════════
setInterval(()=>{try{const P=st.pro;if(!proOn()||window.TITLE||!dlg.hidden||MG)return;if(P.ch<3&&proAllDone(P.ch)&&P.ask!=P.ch){P.ask=P.ch;SVDIRTY=1;
 openDlg('📖 '+PROCH[P.ch].t+' 完成！','這一章的目標都完成了。<br>要進入下一章嗎？還是想再待一陣子，跟大家多相處？<br><span style="font-size:12px;opacity:.8">（之後點左上角的任務欄，也能進入下一章）</span>',[['▶ 進入下一章','',()=>{closeDlg();proNext()}],['再待一陣子','',closeDlg]])}}catch(e){}},1500);
function proNext(){const P=st.pro;closeDlg();if(P.ch==1){P.ch=2;P.w0=wkN();P.ask=0;SVDIRTY=1;
  storyPages('📖 序二・交往與信仰',[Q_('那天之後，你們常常約出來。<br>週末一放假，你就騎著車去找她，走過屏東大大小小的地方，逛街、吃東西。'),Q_('民國 112 年，你 29 歲。<br>這一章，你們會一起經歷：社福中心的志工日、第一次去教會、台南十鼓、花園廣場的告白、關子嶺的夜景……<br>還有一起受洗。')],()=>{qOpen=true;qpanel()},'▶ 開始')}
 else if(P.ch==2){P.ch=3;P.w0=wkN();P.ask=0;SVDIRTY=1;
  storyPages('📖 序三・求婚',[Q_('民國 114 年，你 31 歲。交往第三年。<br>你心裡已經很確定了：<b>就是她。</b>'),Q_('家宜的生日在 11 月。<br>你想在自己家的頂樓給她一個驚喜——但頂樓到現在還堆滿丁先生留下的雜物……<br><br>先把頂樓清乾淨，準備氣球、燈串和戒指，再找朋友來幫忙吧！')],()=>{qOpen=true;qpanel()},'▶ 開始準備')}}
// 時間到：快轉劇情
{const _a=wkArrive;wkArrive=function(){const r=_a.apply(this,arguments);try{const P=st.pro;if(proOn()){const u=proUsed();
 if(u>PROMAX)setTimeout(()=>whenFree(proRush),2500);else if(u==PROMAX)setTimeout(()=>whenFree(()=>toast('⏳ 這是「'+PROCH[P.ch].t+'」的最後一個週末了！')),3000)}}catch(e){}return r}}
function proRush(){const P=st.pro;if(!proOn())return;P.rush=P.rush||{};P.rush[P.ch]=1;SVDIRTY=1;const y=yjS(),s=FRS('yijia');
 if(P.ch==1){storyPages('⏳ 時間過得好快……',[Q_('工作忙、營區忙，Binder 的訊息常常隔好幾天才回。<br>但她一直都在。某個週末晚上，你們終於在林園的公園見面了。'),Q_('奶茶、路燈、聊到很晚的夜。<br>她叫劉家宜，朋友都叫她 Kai。')],()=>{P.bind=P.chat=P.m1=1;s.met=1;s.pt=Math.max(s.pt,12);hud();proNext()},'▶ 繼續');return}
 if(P.ch==2){storyPages('⏳ 時間過得好快……',[Q_('一年多就這樣過去了。志工日、教會、十鼓、關子嶺……<br>有些約會因為收假而延期，但你們還是一起走過了。'),Q_('某個傍晚，你在花園廣場把花束遞給她：「家宜，可以讓我陪在妳身邊嗎？」<br>她說：「你知道我等這句話等多久了嗎？」')],()=>{y.t1=y.t2=1;P.shigu=P.gzl=1;st.partner='劉家宜';y.faith=4;s.pt=Math.max(s.pt,130);hud();if(!y.bapt)yjBaptism();setTimeout(()=>whenFree(proNext,()=>yjS().bapt),800)},'▶ 繼續');return}
 if(P.ch==3){storyPages('⏳ 時間過得好快……',[Q_('準備求婚比想像中還難：頂樓清不完、戒指挑不好、朋友時間湊不齊……<br>但家宜的生日還是到了。')],()=>{P.rq=1;proProposal()},'▶ 她的生日到了')}}

// ═════════ 序二：十鼓、關子嶺；受洗門檻放寬 ═════════
{const _y=yjOpts;yjOpts=function(o,n,s,dk){_y.apply(this,arguments);if(!proOn())return;const P=st.pro,y=yjS();
 if(P.ch==2&&!P.shigu&&s.pt>=40)o.push(['🎢 約家宜去台南十鼓文創園區','一整天・💰1,200・高空滑索',()=>{if(st.money<1200)return toast('錢不夠喔');st.money-=1200;closeDlg();shiguGame()},st.money<1200]);
 if(P.ch==2&&!P.gzl&&st.partner=='劉家宜')o.push(['♨️ 約家宜去台南關子嶺','泡溫泉、看夜景・💰2,500',()=>{if(st.money<2500)return toast('錢不夠喔');st.money-=2500;closeDlg();gzlTrip()},st.money<2500]);
 if(P.ch==3){const i=o.findIndex(q=>q&&typeof q[0]=='string'&&q[0].startsWith('💍 向家宜求婚'));const G=proGoals(3),ok=G.slice(0,4).every(g=>g[1])&&s.pt>=140;
  const it=['🎂 家宜生日：頂樓求婚驚喜',ok?'一切都準備好了……':`先完成任務欄的準備${s.pt<140?`・家宜好感 ${s.pt}/140`:''}`,()=>{closeDlg();proProposal()},!ok||y.prop];
  if(i>=0)o[i]=it;else if(!y.prop&&st.partner=='劉家宜')o.push(it)}}}
{const _l=ylOpts;ylOpts=function(o,n){_l.apply(this,arguments);if(!proOn())return;const y=yjS(),s=FRS('yijia'),W=wkN();
 const b=o.findIndex(q=>q&&typeof q[0]=='string'&&q[0].startsWith('🕊️ 和家宜一起受洗'));if(b>=0){const ok=y.church>=2&&y.calls>=2&&s.pt>=120;o[b]=[o[b][0],`真道 4/4・一起去教會 ${Math.min(2,y.church)}/2・打電話 ${Math.min(2,y.calls)}/2・家宜好感 ${s.pt}/120`,o[b][2],!ok]}
 const w=o.findIndex(q=>q&&typeof q[0]=='string'&&q[0].startsWith('💒 請以倫牧師證婚'));if(w>=0){const ok=y.prop&&st.money>=30000&&y.propW<W;o[w]=[o[w][0],`💰30,000・${y.propW<W?'':'求婚後的下個週末'}`,o[w][2],!ok]}
 else if(st.pro.ch==3&&y.prop&&!y.wed)o.push(['💒 請以倫牧師證婚，在教會舉行婚禮',`💰30,000・${y.propW<W?'':'求婚後的下個週末'}`,yjWedding,!(st.money>=30000&&y.propW<W)])}}
// 十鼓：高空滑索
FAMIMG.shigu=MEMPH[1].src;
function shiguGame(){const M=mgBox('🎢 台南十鼓・高空滑索'),g=M.g,W2=720,H2=520,A={x:70,y:110},Bp={x:650,y:400};const S={ph:0,t:0,v:0,pos:0,br:0,done:false,res:'',yj:0,pulls:0,lk:proYjLk()};
 const P=(u)=>({x:A.x+(Bp.x-A.x)*u,y:A.y+(Bp.y-A.y)*u});
 const kd=e=>{if(e.key==' '||e.code=='Space'){e.preventDefault();if(S.ph==2&&S.v<=0&&S.pos<.86){S.pos=Math.min(.86,S.pos+.025);S.pulls++}else S.br=1}};const ku=e=>{if(e.key==' '||e.code=='Space')S.br=0};OVK.add(kd);OVKU.add(ku);
 const btnHold=()=>{M.bt.innerHTML='';const b=document.createElement('button');b.textContent='✋ 拉緊煞車（按住空白鍵）';b.style.cssText='font:inherit;font-size:15px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:10px 18px;touch-action:none';b.onpointerdown=e=>{e.preventDefault();if(S.ph==2&&S.v<=0&&S.pos<.86){S.pos=Math.min(.86,S.pos+.025);S.pulls++}else S.br=1};['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>S.br=0));M.bt.appendChild(b)};
 M.tip.innerHTML='家宜先滑！';mgButtons(M,[]);
 const fin=()=>{if(S.done)return;S.done=true;OVK.delete(kd);OVKU.delete(ku);setTimeout(()=>{M.end();const Pr=st.pro;Pr.shigu=1;advance(8);fxApply({j:25,s:-15});frAdd('yijia',8,1);hud();SVDIRTY=1;qpanel();
   storyPages('🎢 台南十鼓',[Q_(S.res),Q_('你們戴著紅色安全帽，在高台上自拍了一張。<br>她比了一個 YA：「這張要留著！以後給我們的小孩看，說爸爸媽媽也很勇敢！」<br>……你假裝沒聽到後半句，但耳朵紅了。')],()=>photoShow('shigu','台南十鼓・一起從高處滑下來','💗 家宜好感 +8　😊 +25'),'📸 合照')},1200)};
 let last=performance.now();const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;
  if(S.ph==0){S.yj=Math.min(1,S.yj+dt*.4);if(S.yj>=1&&S.t>3){S.ph=1;S.t=0;M.tip.innerHTML='換你了！滑到最後的<b style="color:#2f7a3a">綠色區域</b>要剛好停下來。<br>按住空白鍵（或按鈕）煞車——太早煞會卡在半空中，太晚會撞上緩衝墊！';btnHold()}}
  else if(S.ph==1){if(S.t>1.2){S.ph=2;S.t=0}}
  else if(S.ph==2&&!S.done){const slope=.42;S.v+=(slope-(S.br?1.15:0)-S.v*.05)*dt;if(S.v<0)S.v=0;S.pos+=S.v*dt*.32;
   if(S.pos>=1){S.pos=1;const fast=S.v>.5;S.res=fast?'「碰——！」你整個人撞上終點的緩衝墊，彈回來晃了好幾下。<br>家宜在下面笑到蹲在地上：「你是砲彈嗎！」':'你剛剛好滑進終點，教練比了一個讚。<br>家宜衝過來：「好帥喔！你一點都不怕耶！」';fin()}
   else if(S.v<=0&&!S.br&&S.pos>=.86){S.res=S.pulls?'你卡在半空中，只好雙手交替一點一點把自己拉過去……拉了 '+S.pulls+' 下才到終點。<br>家宜在下面笑到肚子痛：「加油！阿兵哥！」':'你穩穩地停在綠色區域，教練都忍不住鼓掌。<br>家宜衝過來：「好帥喔！你一點都不怕耶！」';fin()}
   else if(S.v<=0&&S.pos<.86&&S.t>.6){M.tip.innerHTML='😱 你卡在半空中了！<b>連按空白鍵</b>（或按鈕），雙手交替把自己拉過去！'}}
  // 畫面
  const sky=g.createLinearGradient(0,0,0,H2);sky.addColorStop(0,'#7ec8f0');sky.addColorStop(1,'#d8eef8');g.fillStyle=sky;g.fillRect(0,0,W2,H2);
  g.fillStyle='#8a5a3a';g.fillRect(560,120,40,300);g.fillRect(610,170,30,250);g.fillStyle='#6a4a2a';g.fillRect(556,112,48,12);g.fillRect(606,162,38,10);mgTxt(g,'十鼓',580,160,'bold 14px sans-serif','#fff6dc');
  g.fillStyle='#a07050';g.fillRect(0,430,W2,90);g.fillStyle='#6a8a4a';g.fillRect(0,420,W2,14);
  g.fillStyle='#5a3a2a';g.fillRect(30,110,80,320);g.fillStyle='#7a5a3a';g.fillRect(20,100,100,14);
  g.fillStyle='rgba(60,200,90,.35)';const z0=P(.86),z1=P(1);g.fillRect(z0.x-10,z0.y-40,z1.x-z0.x+20,80);
  g.fillStyle='#f0b030';g.fillRect(Bp.x-6,Bp.y-30,40,60);g.strokeStyle='#333';g.lineWidth=3;g.beginPath();g.moveTo(A.x,A.y);g.lineTo(Bp.x,Bp.y);g.stroke();
  const rider=(u,lk,col)=>{const q=P(u);g.strokeStyle='#555';g.lineWidth=2;g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x,q.y+22);g.stroke();g.save();g.translate(q.x-18,q.y+16);g.scale(3,3);try{drawChar(g,{x:0,y:4,dir:3,mv:false,fr:0,lk,ph:S.t})}catch(e){}g.restore();g.fillStyle=col;g.beginPath();g.arc(q.x,q.y+22,9,Math.PI,0);g.fill()};
  if(S.ph==0){rider(S.yj,S.lk,'#d33');if(S.yj<1&&S.yj>.05)mgTxt(g,'啊啊啊啊——！',P(S.yj).x,P(S.yj).y-10,'bold 20px sans-serif','#c2304f')}
  else{if(S.lk){g.save();g.translate(Bp.x+10,Bp.y+6);g.scale(3,3);try{drawChar(g,{x:0,y:0,dir:2,mv:false,fr:0,lk:S.lk,ph:S.t})}catch(e){}g.restore()}rider(S.pos,ALLEN,'#d33');
   g.fillStyle='rgba(0,0,0,.5)';g.fillRect(20,20,190,26);g.fillStyle='#ffd84a';g.fillRect(24,24,182*Math.min(1,S.v/1.2),18);mgTxt(g,'速度',114,40,'bold 14px sans-serif','#fff')}
  if(!S.done||S.t<9)requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// 關子嶺
function gzlTrip(){const P=st.pro;storyPages('♨️ 台南關子嶺',[Q_('你們沿著山路一路往上開，車窗外的風景越來越綠。<br>家宜把手伸出窗外：「台灣的山好多喔，澳門都看不到！」'),
  Q_('泡在灰灰的泥漿溫泉裡，她把泥巴抹在你臉上，笑到停不下來。<br>「欸，你現在比剛認識的時候還黑！」'),
  Q_('天黑了，你們站在觀景台上。<br>整片平原的燈火像撒了一地的星星。<br><br>她靠在你肩上，很小聲地說：「……謝謝你帶我來。」<br>那一刻，你覺得山上的風一點都不冷。')],()=>{P.gzl=1;advance(10);fxApply({j:30,s:-10,h:6});frAdd('yijia',8,1);hud();SVDIRTY=1;qpanel();toast('♨️ 關子嶺的夜景，你會記一輩子。家宜好感 +8')},'💞')}

// ═════════ 序三：求婚準備（家樂福）＋頂樓求婚動畫 ═════════
IT.g_balloon={n:'氣球（一大包）',i:'🎈',p:60,d:'求婚佈置用。灌飽要花一個下午。',u:'keep'};IT.g_lights={n:'燈串',i:'✨',p:200,d:'求婚佈置用。要有人爬梯子掛上去。',u:'keep'};IT.g_ring={n:'求婚戒指',i:'💍',p:3000,d:'小小的盒子，藏著你的一輩子。',u:'keep'};
wrapSP('家樂福',o=>{if(!st.pro||st.pro.ch!=3||yjS().prop)return;o.splice(1,0,['💍 求婚準備','氣球、燈串、戒指',()=>{const L=[['g_balloon',300],['g_lights',800],['g_ring',12000]];
 openDlg('💍 求婚準備'+`（💰${st.money.toLocaleString('en-US')}）`,'要給家宜一個難忘的生日驚喜！',L.map(q=>[`${IT[q[0]].i} ${IT[q[0]].n}　💰${q[1].toLocaleString('en-US')}`,(st.inv[q[0]]||0)>0?'已經買了':IT[q[0]].d,()=>{if(!addItem(q[0],1))return;st.money-=q[1];hud();qpanel();toast('🛒 買了'+IT[q[0]].n);closeDlg();SP['家樂福']&&mainMenu('家樂福')},(st.inv[q[0]]||0)>0||st.money<q[1]]).concat([['返回','',()=>mainMenu('家樂福')]]))}])});
function proProposal(){const P=st.pro,y=yjS();if(y.prop)return;const HV={bal:st.inv.g_balloon>0,li:st.inv.g_lights>0,ring:st.inv.g_ring>0};window.PROHV=HV;['g_balloon','g_lights','g_ring'].forEach(k=>{if(st.inv[k]>0)st.inv[k]--});
 const fr=proFriends().slice(0,4).map(k=>({n:FR[k].n.replace(/^.(?=..)/,'').slice(-2),lk:(()=>{try{return lookFor({n:FR[k].n})}catch(e){return null}})()}));
 const M=mgBox('🎂 家宜的生日・頂樓'),g=M.g,W2=720,H2=520,S={t:0,ph:0,lit:0,bal:[],lk:proYjLk(),rb:(()=>{try{return lookFor({n:'潤餅',c:'#e8a030'})}catch(e){return null}})(),done:false};
 const CAP=[HV.bal?'下午，大家擠在頂樓，忙著把一大堆氣球灌飽。<br>有人灌到頭暈，有人一直把氣球弄破。':'下午，你一個人在頂樓掃地、擺桌子……<br>（沒買氣球，頂樓看起來有點空。）',HV.li?'<b>潤餅</b>爬上梯子，一盞一盞把燈串掛好：「往左一點……好，就這裡！」':'<b>潤餅</b>跑來幫忙，看了看四周：「欸……你沒買燈串喔？」<br>只好把家裡的檯燈搬上來。','桌上擺滿了吃的，大家邊佈置邊偷吃，笑聲停不下來。','天黑了。你把家宜的眼睛矇起來，牽著她一階一階走上頂樓。<br>「到底要去哪裡啦？」',HV.li?`「三、二、一……」<br>你拿下她的眼罩——燈串一盞一盞亮了起來。`:'「三、二、一……」<br>你拿下她的眼罩——幾盞檯燈亮著，雖然簡單，但大家都在。'];
 const next=()=>{S.ph++;if(S.ph<CAP.length){M.tip.innerHTML=CAP[S.ph];mgButtons(M,[['▶ 繼續',next]]);if(S.ph==4)S.lit=0.001}else{S.done=true;M.end();P.propD=1;SVDIRTY=1;
   const fri=proFriends().map(k=>FR[k].n).slice(0,5).join('、');whenFree(()=>openDlg('🎂 生日快樂！','朋友們從花架和盆栽後面跳出來：「家宜，生日快樂——！」<br>'+(fri?fri+'、':'')+'潤餅……大家都在。<br><br>她摀著嘴，眼睛紅紅的，看起來好幸福。<br>你深吸一口氣，拿起吉他——',[['🎸 唱那首為她寫的歌','',()=>{closeDlg();yjSong()}]]))}};
 M.tip.innerHTML=CAP[0];mgButtons(M,[['▶ 繼續',next]]);
 for(let i=0;i<26;i++)S.bal.push({x:60+Math.random()*600,y:200+Math.random()*120,c:['#ff6a8a','#ffd84a','#8ad0ff','#ffffff','#c8a0ff'][i%5],a:Math.random()*6,on:i/26});
 let last=performance.now();const loop=now=>{if(S.done)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;const night=S.ph>=3;
  g.fillStyle=night?'#141a3a':'#ffd9a0';g.fillRect(0,0,W2,H2);if(!night){g.fillStyle='#ffb070';g.beginPath();g.arc(620,120,50,0,7);g.fill()}else for(let i=0;i<50;i++){g.fillStyle='rgba(255,255,230,.6)';g.fillRect((i*131)%W2,(i*53)%200,2,2)}
  g.fillStyle=night?'#2a2a38':'#c8b8a0';g.fillRect(0,330,W2,190);g.fillStyle=night?'#3a3a48':'#a89880';g.fillRect(0,320,W2,12);
  // 燈串
  const n=18;g.strokeStyle='#444';g.lineWidth=2;g.beginPath();for(let i=0;i<=n;i++){const x=40+i*(640/n),y=70+Math.sin(i/n*Math.PI)*40;i?g.lineTo(x,y):g.moveTo(x,y)}if(S.ph>=1&&HV.li)g.stroke();
  if(S.ph==4)S.lit=Math.min(n+1,S.lit+dt*7);
  if(S.ph>=1&&HV.li)for(let i=0;i<=n;i++){const x=40+i*(640/n),y=74+Math.sin(i/n*Math.PI)*40,on=night?i<S.lit:true;if(S.ph==1&&i>(S.t*3)%(n+1))continue;g.fillStyle=on&&night?['#ffe08a','#ff9ab0','#9ad8ff'][i%3]:'#bbb';g.beginPath();g.arc(x,y,6,0,7);g.fill();if(on&&night){g.globalAlpha=.25;g.beginPath();g.arc(x,y,16,0,7);g.fill();g.globalAlpha=1}}
  // 氣球
  if(HV.bal)S.bal.forEach((b,i)=>{const show=S.ph>0||b.on<S.t/6;if(!show)return;const by=b.y+Math.sin(S.t*1.5+b.a)*5;g.strokeStyle='rgba(80,80,80,.6)';g.lineWidth=1;g.beginPath();g.moveTo(b.x,by+18);g.lineTo(b.x,330);g.stroke();g.fillStyle=b.c;g.beginPath();g.ellipse(b.x,by,13,17,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.ellipse(b.x-4,by-6,3,5,0,0,7);g.fill()});
  // 桌子
  g.fillStyle='#8a5a32';g.fillRect(260,380,200,14);g.fillRect(270,394,8,40);g.fillRect(442,394,8,40);['🍰','🍗','🍕','🧃','🍉'].forEach((e,i)=>{g.font='24px sans-serif';g.fillText(e,272+i*38,376)});
  // 人
  const ch=(x,y,lk,dir,sit,pose)=>{if(!lk)return;g.save();g.scale(3,3);try{drawChar(g,{x:x/3,y:y/3,dir,mv:false,fr:0,lk,ph:S.t+x,sit,pose})}catch(e){}g.restore()};
  if(S.ph<3){fr.forEach((f,i)=>ch(90+i*80,400,f.lk,0));ch(560,440,ALLEN,1);
   // 梯子＋潤餅
   g.fillStyle='#8a6a42';g.fillRect(150,150,6,190);g.fillRect(190,150,6,190);for(let k=0;k<7;k++)g.fillRect(150,170+k*26,46,4);ch(160,S.ph>=1?150:300,S.rb,1);mgTxt(g,'潤餅',173,S.ph>=1?140:290,'bold 14px sans-serif',night?'#fff':'#5a3417')}
  else{ch(330,450,S.lk,0);ch(378,450,ALLEN,2,S.ph>=4&&S.lit>=n?1:0);if(S.ph==3){g.fillStyle='#222';g.fillRect(338,455,22,6)}
   if(S.ph>=4&&S.lit>=n){fr.forEach((f,i)=>ch(80+i*60,440,f.lk,3));ch(620,440,S.rb,2);g.font='26px sans-serif';g.fillText('💍',392,458);mgTxt(g,'🎉 家宜，生日快樂！',W2/2+2,162,'bold 30px sans-serif','#000');mgTxt(g,'🎉 家宜，生日快樂！',W2/2,160,'bold 30px sans-serif','#ffe08a')}}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
// 婚禮後：生日回憶輪播 → 正章
{const _ps=photoShow;photoShow=function(img,title,html,cb){let c2=cb;if(img=='reg2'&&st.pro&&st.pro.ch==3)c2=()=>{cb&&cb();setTimeout(()=>whenFree(proAfterWedding),600)};const r=_ps.call(this,img,title,html,c2);
 if(img=='shigu')setTimeout(()=>{document.querySelectorAll('img').forEach(im=>{if(im.src==FAMIMG.shigu)im.style.imageRendering='pixelated'})},50);return r}}
function proAfterWedding(){const P=st.pro;if(!P||P.ch!=3)return;P.ch=4;P.y0=T.year;SVDIRTY=1;const y=yjS();y.homeAsk=1;
 memShow(()=>{whenFree(()=>{yjMoveIn();setTimeout(()=>whenFree(()=>storyPages('📖 第一章・新婚',[Q_('民國 115 年 2 月 15 日，你們結婚了。<br>家宜搬進了這間三十多年的老公寓。'),Q_('它有點舊，颱風天會漏水，牆角會長壁癌，電器開太多還會跳電……<br>但從今天起，這裡是<b>你們兩個人的家</b>。<br><br>接下來的日子，一起把它慢慢修好吧。')],()=>{try{qpanel()}catch(e){}},'🏡 回家')),800)})})}

// 序三時間到：求婚之後，婚禮也一起快轉
setInterval(()=>{try{const P=st.pro,y=yjS();if(!P||P.ch!=3||!P.rq||!y.prop||y.wed||window.TITLE||!dlg.hidden||MG||P.rqW)return;P.rqW=1;
 if(st.money<30000){st.money=30000;toast('💒 教會的弟兄姊妹一起幫忙張羅婚禮，費用湊齊了！')}y.coun=Math.max(y.coun||0,3);setTimeout(()=>whenFree(yjWedding),1500)}catch(e){}},2000);

// Binder：聊天結束後還能回去看聊天紀錄
function binderLog(){const P=st.pro,B=proOv(),ph=B.ph;ph.innerHTML=`<div style="background:#fff;border-bottom:1px solid #eee;padding:10px 14px;display:flex;align-items:center;gap:10px"><canvas width="64" height="64" style="width:38px;border-radius:50%;background:#ffe;image-rendering:pixelated"></canvas><div style="flex:1"><b>Kai</b><div style="font-size:11px;color:#2a9d5c">● ${P.m1?'你們已經見過面了 💗':'已約好見面'}</div></div><button class="bbt bx" style="padding:6px 12px;background:#f0f0f4">✕</button></div><div class="bl" style="flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;background:#fafafa"></div>`;
 proPortrait(ph.querySelector('canvas'),'yj');const L=ph.querySelector('.bl');(P.blog||[]).forEach(q=>{const d=document.createElement('div');if(q[1]==2){d.style.cssText='align-self:center;font-size:11.5px;color:#999;margin:8px 0;text-align:center;line-height:1.5'}else d.className='bmsg '+(q[1]?'bme':'byou');d.style.animation='none';d.innerHTML=q[0];L.appendChild(d)});
 if(!(P.blog||[]).length)L.innerHTML='<div style="align-self:center;color:#999;font-size:12px;margin-top:40px">（聊天紀錄）</div>';L.scrollTop=L.scrollHeight;
 const close=()=>{OVK.delete(k);B.end()};ph.querySelector('.bx').onclick=close;const k=e=>{if(e.key=='Escape')close()};OVK.add(k)}
// 配對的人多一點，家宜一定在最後
{const K=BCARD.find(c=>c.yj);BCARD.length=0;BCARD.push(
 {n:'小芳',ic:'🏋️‍♀️',bg:'#ffd6a0',bio:'健身房常客｜每天練腿｜徵一起深蹲的人',r:'她回：「你深蹲幾公斤？」你還沒回，她就已讀了。'},
 {n:'阿德',ic:'🎣',bg:'#bfe0ff',bio:'喜歡釣魚、露營、烤肉……咦？',r:'等等，阿德是男生啊！你趕快把設定改回來。'},
 {n:'Vivi',ic:'💄',bg:'#e8d0ff',bio:'自介：請先傳你的年收入',r:'……你默默往左滑了。'},
 {n:'莎莎',ic:'🐱',bg:'#ffe8b0',bio:'家裡有 7 隻貓｜不能接受的話請左滑',r:'配對成功！她第一句：「你對貓毛過敏嗎？」你打了一個噴嚏。'},
 {n:'Momo',ic:'📸',bg:'#d0f0ff',bio:'網美打卡魂｜每到一個地方要拍 200 張',r:'她傳來一張自拍，背景是 37 杯飲料。你決定先觀望。'},
 {n:'阿美',ic:'🎤',bg:'#ffd0d8',bio:'KTV 麥霸｜一開唱就停不下來',r:'她邀你去唱歌，說要唱到天亮。你想到明天要收假……'},
 {n:'林小姐',ic:'💼',bg:'#e0e0e8',bio:'保險業務｜想了解您的保障規劃',r:'第一句就問你有沒有買意外險。這好像不是交友……'},
 {n:'小雪',ic:'🧋',bg:'#f8e0c8',bio:'手搖飲重度依賴｜一天三杯全糖',r:'她說：「你喝半糖？那我們不適合。」配對解除。'},
 {n:'Jenny',ic:'✈️',bg:'#c8f0e0',bio:'空服員｜一個月在台灣 3 天',r:'她回訊息的時間是凌晨四點，時區好像不太一樣。'},
 {n:'阿珠',ic:'🌶️',bg:'#ffc8a8',bio:'嗜辣如命｜麻辣鍋要點大辣',r:'她約你吃大辣鍋，你看了一下菜單，默默把腸胃藥放進口袋。'},
 {n:'Coco',ic:'🎮',bg:'#d8d0ff',bio:'電競選手｜段位比你高就聊',r:'她問你段位，你說你玩幻境 Online。她：「那是什麼？」'},
 K)}

// Binder 其他人的大頭照
const BHAIR=['#2a1a10','#5a3a1a','#8a5a2a','#c89a5a','#1a1a1a','#7a3a2a'],BTOP=['#e05a8a','#5a9ae0','#f0b030','#8a5ad0','#3aa070','#e07a3a','#ffffff','#d03a3a'];
function bPortrait(cv,C){try{const h=hsh(C.n),L=Object.assign({},lookFor({n:'bnd'+C.n,c:BTOP[h%BTOP.length]}));L.fm=C.n=='阿德'?0:1;L.hr=BHAIR[(h>>3)%BHAIR.length];L.tp=BTOP[h%BTOP.length];L.sc=(ALLEN&&ALLEN.sc)||.78;L.bd=1;
 const c=cv.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(portrait('npc',{n:'binder·'+C.n,lk:L}),0,0,cv.width,cv.height)}catch(e){}}

// Binder 聊天：整整一個禮拜
BCHAT.length=0;BCHAT.push(
 {d:'第 1 天・晚上',k:['哈囉～你的照片是在健身房拍的嗎？😂'],o:[['對啊，我平常很愛運動。妳呢？','我啊……我比較愛吃東西 😆 運動的話，散步算嗎？'],['被妳發現了，那是我最帥的角度','哈哈哈，好有自信喔！'],['……可以假裝沒看到嗎','太遲了，我已經截圖了 😏']]},
 {k:['我是澳門人，來台灣唸書，後來就留下來了。'],o:[['澳門！那妳會講廣東話嗎？','係呀～我教你一句：「早晨」，就是早安的意思 ☀️'],['一個人在台灣，會不會很辛苦？','……會啊，但習慣了。謝謝你這樣問，很少人會問這個。'],['澳門的葡式蛋塔是不是超好吃？','超好吃！台灣的都沒有那個味道，我每次回去都吃五個 🥧']]},
 {d:'第 2 天・午休',k:['（她傳來一張便當照片）午餐！你在營區吃什麼？'],o:[['伙房今天是滷肉飯，還不錯','軍中的滷肉飯！好想吃吃看哈哈'],['看到妳的便當，我的就變得很可憐','哈哈哈，下次分你一口～'],['我在偷看手機，等等被長官抓到','快收起來啦！不要被罵 😂']]},
 {k:['那你是做什麼的呀？'],o:[['我是職業軍人，平常住營區，週末才放假。','哇，那你週末都在做什麼？'],['保家衛國的那種 💪','哈哈，那請問阿兵哥週末都在幹嘛？'],['……妳猜猜看？','你很壯……健身教練？……不對，你剛剛說營區了啦！']]},
 {k:['我是社工，在社福中心上班，常常要跑來跑去。'],o:[['好有意義的工作！一定很累吧','累～但看到被幫助的人笑了，就覺得值得 ☺️'],['那妳一定很有耐心','沒有啦！我其實脾氣有點急 😂 只是在工作上忍住而已'],['需要搬東西的話可以找我','真的嗎？那我記住了喔！說到做到 😆']]},
 {d:'第 3 天・晚上',k:['欸，你喜歡吃什麼？'],o:[['火鍋！冬天夏天都可以吃','我也超愛火鍋！！我們有共同點了 🍲'],['我不挑，只要不是苦瓜','哈哈哈苦瓜很好吃耶！你是小孩子嗎 😆'],['榴槤……妳應該不吃吧？','我超愛榴槤！！！你怎麼知道 🍈🍈🍈']]},
 {k:['我媽媽煮的廣東湯超好喝，下次……啊，算了 😅'],o:[['下次怎樣？我想聽','……下次她來台灣，你可以喝喝看啦！不要想太多喔 🙈'],['廣東人真的很會煲湯','對呀！媽媽說湯要煲三個小時才有味道'],['我煮泡麵也很厲害','那不叫煮啦哈哈哈']]},
 {d:'第 4 天・收假前',k:['你明天就要回營區了吧？'],o:[['對啊，又要五天見不到外面的世界','那我每天傳照片給你看外面的世界 📸'],['捨不得週末結束','我……也有點捨不得耶。不、不是捨不得你喔，是捨不得週末 🙈'],['沒關係，晚上還是可以聊','好啊！那你晚上記得跟我說晚安 🌙']]},
 {d:'第 5 天・深夜',k:['睡不著……你在幹嘛？'],o:[['剛站完哨，看到妳的訊息就醒了','辛苦了！站哨會不會很冷？要多穿一點喔'],['在想妳……開玩笑的啦','…………（已讀十秒）……你這樣講我會當真喔。'],['陪妳聊到睡著','好～那你先講一個故事給我聽 😴']]},
 {k:['你知道嗎，我有時候會覺得一個人在台灣很孤單。'],o:[['以後週末，我可以陪妳','……謝謝你。真的。'],['想家的時候可以打給我','好……那我真的會打喔，你不能嫌我煩'],['孤單的時候就去吃好吃的','哈哈，你很懂我！吃飽就不孤單了 🍜']]},
 {d:'第 6 天',k:['（她傳來一張夕陽的照片）今天下班看到的，想給你看 🌅'],o:[['好美，跟傳照片的人一樣','你今天嘴巴特別甜喔……是不是偷吃糖 🍬'],['我們營區也看得到','真的嗎？那我們在看同一個夕陽耶'],['存起來當桌布了','欸！不要啦，好丟臉 🙈']]},
 {d:'第 7 天・週五',k:['你明天放假了對不對？'],o:[['對！中午就自由了','太好了～那……'],['怎麼了？有什麼計畫嗎？','嗯……那個……'],['我數著時間在等','哈哈哈你好誇張……不過，那個……']]});

{const D=['週六・晚上',null,'週一・營區午休',null,'週二・晚上','週三・晚上',null,'週四・晚上','週四・深夜',null,'週五・早上','週五・中午'];BCHAT.forEach((c,i)=>{c.d=D[i]||undefined;c.wk=i==2?1:0});
 BCHAT[7]={d:'週四・晚上',k:['你們營區晚上都在幹嘛呀？'],o:[['點完名、洗完澡，就躺在床上跟妳聊天','哈哈，原來我是你的睡前節目 😆'],['擦槍、整理內務，很無聊的','聽起來好辛苦……但也好帥喔！'],['偷偷做伏地挺身','你真的很愛運動耶 😂']]};
 BCHAT[10]={d:'週五・早上',k:['早晨～ ☀️ 今天是不是終於要放假了？'],o:[['對！中午就自由了','太好了～辛苦一個禮拜了！'],['數著時間在等','哈哈你好誇張，跟小學生等放學一樣'],['早晨！妳的廣東話我學會了','好叻喔！（就是好厲害的意思）']]};
 BCHAT[11]={d:'週五・中午',k:['你放假了嗎？'],o:[['剛走出營區大門！','耶～辛苦一個禮拜了！週末有什麼計畫嗎？'],['放假了，第一件事就是回妳訊息','你……很會耶 🙈 那週末要做什麼呢？'],['放了！好想吃好料','哈哈，那週末要去吃什麼？']]};}
