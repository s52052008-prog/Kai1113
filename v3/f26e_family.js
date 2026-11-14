/* ===== v6.5 家宜的家人來台灣（兩次）：排行程 → 出遊 → 合影結算（使用玩家提供的合照） ===== */
const VIS={
 1:{t:'表姨一家來作客',who:'表姨和兩個姪子姪女',img:'fam1',
  line:'「冠宏！我表姨<b>下個週末</b>要帶兩個小鬼從澳門來台灣玩！🛫<br>他們想來我們這邊坐坐……你可以幫我一起排行程嗎？我好緊張😣」',
  hints:['「表姨很愛聊天，喜歡在<b>家裡</b>輕鬆坐著聊。」','「兩個小鬼<b>精力超旺盛</b>，最愛打電動跟戰鬥陀螺！」','「表姨說很想嚐嚐我們<b>平常在家煮的菜</b>。」','「兩個小鬼超愛<b>鬥嘴</b>，什麼都要比……」','「孩子們坐不住，<b>太正式的餐廳</b>不行。」'],
  start:'早上，你和家宜到火車站接人。兩個小鬼一下車就衝過來：「表姐～！」「你就是冠宏哥哥嗎？！」<br>「是我先看到的！」「明明是我！」兩個人還沒走出車站就吵起來了。<br>表姨笑著搖頭：「路上一直吵著要見你們呢。」',
  slots:[
   ['上午',[['🏀','帶孩子們去操場跑跑跳跳',0,2,'孩子們跑到滿頭大汗，姪子拉著你：「冠宏哥哥再比一場！」姪女不服氣：「剛剛是我贏的！」'],
           ['⛪','帶大家去教會參加兒童主日學',0,2,'RITA 帶著孩子們唱詩歌、做勞作，表姨在旁邊看得好開心。'],
           ['🛒','逛家樂福買零食',600,0,'孩子們推著購物車到處跑，籃子裡全是糖果。'],
           ['⛰️','爬山步道看風景',0,-3,'爬到一半，孩子們吵著要回家，表姨也走不動了……']]],
   ['午餐',[['🏠','在家煮咖哩飯',400,3,'孩子們一人吃兩碗：「冠宏哥哥煮的比媽媽的好吃！」表姨笑罵：「回去不要亂講！」'],
           ['🍲','火鍋',1600,2,'大家圍著一鍋熱湯，表姨說：「家宜從小就愛吃火鍋，跟她媽媽一模一樣。」'],
           ['🔥','阿香炭烤・澎湖海鮮',2400,1,'炭烤蚵仔很好吃，但孩子們不太敢吃海鮮。'],
           ['🍱','便利商店微波便當',300,-2,'表姨客氣地說「沒關係」，但家宜的表情有點僵。']]],
   ['下午',[['🎮','在家一起打電動、玩桌遊',0,3,'兩個小鬼為了誰當一號玩家吵了起來，你提議改玩雙人合作，結果兩人默契好到破關。大家擠在沙發上笑成一團，表姨說：「好久沒這麼放鬆了！」'],
           ['🌀','教孩子們玩戰鬥陀螺',0,2,'姪子的陀螺把你的打出場外，他得意得不得了：「我要跟同學說我贏了大人！」'],
           ['🎬','看電影',1400,0,'電影是國語片，孩子們看到一半就睡著了。'],
           ['♨️','搭火車去知本泡溫泉',4500,-3,'來回十個小時的火車，孩子們在車上吵翻天，回到小鎮已經半夜了……']]],
   ['晚餐',[['🏠','和家宜一起下廚，煮一桌家常菜',800,3,'家宜燉了一鍋媽媽教的老火湯，表姨喝了一口就說：「這是你媽的味道！」<br>兩個小鬼搶最後一碗湯：「我先的！」「你剛剛喝過了！」'],
           ['🌙','逛夜市',800,1,'孩子們撈金魚、吃棉花糖玩瘋了，不過人太多，表姨說腳好痠。'],
           ['🔥','阿香炭烤',2400,1,'大家吃得很飽，孩子們搶著烤棉花糖。'],
           ['🔥','碳佐麻里燒肉',4400,-1,'孩子們坐不住，在高級餐廳裡跑來跑去，表姨尷尬地一直道歉……']]]],
  end:['送大家回旅館的路上，兩個小鬼一人牽你一隻手：「冠宏哥哥下次來澳門找我們玩！」「要先來我家！」「我家啦！」<br>表姨輕聲對家宜說：「這孩子很好，回去我跟你媽說。」','孩子們在車上睡著了。表姨說：「今天很開心，謝謝你啊！」<br>家宜挽著你的手：「他們都很喜歡你喔！」','大家客氣地道了謝。家宜說：「沒關係啦，第一次見面本來就會緊張。」<br>但你知道，下次可以做得更好。']},
 2:{t:'高雄一日遊・黃色小鴨',who:'家宜媽媽、阿公、姑媽和表姨',img:'fam2',
  line:'「冠宏～這次<b>我媽、阿公和姑媽</b>都要來了！表姨說上次玩得太開心了🤣<br><b>下個週末</b>大家想去高雄，聽說流行音樂中心有<b>黃色小鴨</b>！你可以再幫我排一次行程嗎？」',
  hints:['「我媽有點<b>潔癖</b>，太髒亂、太擠的地方她會受不了……不過她很好客啦。」','「阿公年紀大了，<b>不能走太遠</b>，要常常坐下來休息；他最愛唱<b>粵曲</b>。」','「姑媽<b>超愛拍照、愛逛街</b>。」','「阿公吃不了<b>太辣、太硬</b>的東西，他和我媽都最愛<b>廣式料理</b>。」','「傍晚一定要到<b>流行音樂中心看小鴨</b>！」'],
  start:'一早，大家從小鎮搭火車到高雄。家宜媽媽一坐下就拿出酒精紙巾把座位擦了一遍，然後塞給你一大袋澳門杏仁餅：「冠宏，這給你，別客氣！」<br>阿公拄著拐杖握著你的手：「你就是家宜常說的那個阿兵哥啊？」姑媽已經拿出手機開始自拍了。',
  slots:[
   ['上午',[['🎨','駁二藝術特區散步拍照',0,2,'姑媽在每面彩繪牆前都要拍一張，阿公坐在倉庫前的長椅上笑咪咪地看。'],
           ['⛩️','蓮池潭龍虎塔',0,1,'阿公說年輕時來過一次。爬塔爬到一半，大家扶著他慢慢下來。'],
           ['🛍️','逛夢時代購物中心',0,1,'姑媽和表姨逛得很開心，阿公在美食街打了個盹。'],
           ['🚲','騎腳踏車環旗津',0,-3,'阿公騎不到一公里就喘不過氣，大家只好推車走回來……']]],
   ['午餐',[['🥟','港式飲茶',2400,3,'阿公吃到熟悉的蝦餃燒賣，開心地說：「台灣的飲茶也不錯嘛！」<br>家宜媽媽喝了一口例湯，認真地說：「火候還差一點，下次阿姨煲給你喝。」'],
           ['🦐','旗津海產店',3000,2,'一大桌海鮮，表姨直呼：「比澳門便宜好多！」家宜媽媽默默把桌面又擦了兩次。'],
           ['🌶️','麻辣鍋',2400,-2,'阿公被辣到一直喝水，姑媽在旁邊幫他拍背……'],
           ['🍱','車站便當',600,-1,'大家坐在車站角落吃便當，姑媽小聲說：「難得出來玩耶……」']]],
   ['下午',[['☕','愛河邊咖啡廳喝下午茶',800,3,'坐在河邊吹風喝茶，阿公靠在椅子上打了個盹，醒來說：「這裡好舒服。」'],
           ['🚢','搭渡輪到旗津看海',300,1,'海風很大，姑媽的帽子差點飛走，大家笑成一團。'],
           ['🛍️','逛新崛江商圈',0,0,'姑媽買了好幾件衣服，阿公在門口等到睡著。'],
           ['🏃','走完整條愛河步道',0,-3,'走了快兩個小時，阿公的腳都腫了，家宜很自責……']]],
   ['晚餐',[['🦀','港邊海鮮餐廳看夜景',4000,3,'窗外是亮起燈的港灣，阿公舉起茶杯：「來，敬我們家宜找到好歸宿！」'],
           ['🍷','高級牛排館',6000,1,'牛排很好吃，但阿公說肉太硬，咬得很辛苦。'],
           ['🌙','六合夜市',1200,-1,'人擠人又油膩，家宜媽媽一路皺著眉頭，阿公還差點和大家走散……'],
           ['🏠','趕回小鎮在家隨便吃',600,0,'大家累了一天，晚餐草草解決。']]]],
  fixed:'<b>傍晚・🦆 高雄流行音樂中心</b><br><br>夕陽把港灣染成金色，巨大的黃色小鴨浮在水面上。<br>姑媽尖叫：「好可愛！快快快，大家來合照！」<br>阿公看著港灣，忽然清了清喉嚨，唱起一段粵曲。路過的遊客停下來拍手，姑媽笑說：「阿爸又開演唱會了！」<br>你舉起手機，所有人擠進鏡頭裡——',
  end:['回程的火車上，阿公握著你的手說：「家宜交給你，我們放心了。」<br>家宜媽媽說：「下次來澳門，阿姨煲湯、煮一桌廣東菜給你吃！」<br>家宜躲在後面，偷偷擦眼淚。','阿公說：「今天很開心，謝謝你啊，年輕人。」<br>家宜挽著你的手：「阿公很喜歡你喔！」','大家都累壞了。家宜說：「辛苦你了，下次我們再安排得輕鬆一點。」']}};
const visS=n=>{const y=yjS();y.vis=y.vis||{};return y.vis[n]};
function famCheck(){const y=yjS(),W=wkN();y.vis=y.vis||{};if(st.partner!='劉家宜')return;if(!y.confW)y.confW=W;
 let n=0;if(!y.vis[1]&&W>=y.confW+3&&FRS('yijia').pt>=110)n=1;else if(y.vis[1]&&y.vis[1].st>=3&&!y.vis[2]&&W>=y.vis[1].W+4)n=2;
 if(!n)return;y.vis[n]={st:1,W:W+1,plan:null};const V=VIS[n];
 whenFree(()=>openDlg('📲 家宜傳來 LINE',V.line+'<br><span class="text-[12px] opacity-80">（找家宜聊天，就能幫她安排行程）</span>',[['「交給我！一定讓大家玩得開心！」','',closeDlg]]))}
{const _le=lifeEvents;lifeEvents=function(){_le.apply(this,arguments);try{famCheck()}catch(e){console.error(e)}}}
{const _yc=yjCheck;yjCheck=function(){_yc.apply(this,arguments);try{famCheck()}catch(e){}}}
{const _yo=yjOpts;yjOpts=function(o,n,s,dk){_yo.apply(this,arguments);const y=yjS();if(!y.vis)return;const W=wkN(),d=dow(),h=T.hour;
 [1,2].forEach(k=>{const f=y.vis[k];if(!f||f.st>=3)return;const V=VIS[k];
  o.push([`🗺️ 幫家宜安排行程：${V.t}`,f.plan?'已排好（可以重新安排）':`${V.who}第 ${f.W} 個週末來`,()=>famPlan(k)]);
  if(f.plan)o.push([`👨‍👩‍👧 出發：${V.t}`,W<f.W?`第 ${f.W} 個週末的週六或週日 08:00–12:00 出發`:'08:00–12:00 出發・約一整天',()=>famGo(k),!(W==f.W&&(d==5||d==6)&&h>=8&&h<12)])})}}
function famPlan(k){const f=visS(k),V=VIS[k],sel=f.draft||(f.draft=f.plan?f.plan.slice():[null,null,null,null]);
 const o=V.slots.map((sl,i)=>{const c=sel[i]!=null?sl[1][sel[i]]:null;return[`${sl[0]}：${c?c[0]+' '+c[1]:'（還沒選）'}`,'點選更換',()=>famPick(k,i)]});
 if(V.fixed)o.splice(3,0,['傍晚：🦆 高雄流行音樂中心・黃色小鴨','大家最期待的行程（固定）',()=>{},true]);
 const cost=sel.reduce((a,v,i)=>a+(v!=null?V.slots[i][1][v][2]:0),0);
 o.push(['✅ 就這樣排！',`預估花費 💰${cost}（出遊當天付）`,()=>{f.plan=sel.slice();f.draft=null;closeDlg();toast('🗺️ 行程排好了！家宜傳了一串愛心給你。');frAdd('yijia',1)},sel.includes(null)]);
 o.push(['返回','',()=>{f.draft=null;closeDlg()}]);
 openDlg('🗺️ '+V.t,`這次來的是：<b>${V.who}</b><br>家宜偷偷告訴你：<br>`+V.hints.map(t=>'・'+t).join('<br>'),o)}
function famPick(k,i){const f=visS(k),sl=VIS[k].slots[i];openDlg('🗺️ '+sl[0]+'要去哪裡？','',sl[1].map((c,j)=>[c[0]+' '+c[1],c[2]?'💰'+c[2]:'免費',()=>{f.draft[i]=j;famPlan(k)}]).concat([['返回','',()=>famPlan(k)]]),true)}
function famGo(k){const f=visS(k),V=VIS[k],plan=f.plan;let score=0,cost=0;const pages=[V.start];
 plan.forEach((j,i)=>{const c=V.slots[i][1][j];let sc=c[3],re=c[4];
  if(k==1&&i==3&&j==2&&plan[1]==2){sc=-1;re='又是炭烤？表姨笑著說：「中午吃過了啦，換點別的嘛。」'}
  score+=sc;cost+=c[2];if(i==3&&V.fixed)pages.push(V.fixed);pages.push(`<b>${V.slots[i][0]}・${c[0]} ${c[1]}</b><br><br>${re}`)});
 const star=score>=9?3:score>=5?2:1;f.st=3;f.star=star;pages.push(V.end[3-star]);
 closeDlg();storyPages('👨‍👩‍👧 '+V.t,pages,()=>{st.money-=cost;advance(k==2?13:11);const pt=5+star*3;fxApply({j:10+star*6,s:-25,r:star});frAdd('yijia',pt,1);hud();famPhoto(k,star,pt,cost)},'📸 大家一起合照！')}
// 結算畫面：合影（玩家提供的照片）
function famPhoto(k,star,pt,cost){window.TITLE=true;Object.keys(keys).forEach(q=>keys[q]=0);const V=VIS[k];
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(20,12,6,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;opacity:0;transition:opacity .7s';
 const fr=document.createElement('div');fr.style.cssText='background:#fbf7ee;padding:10px 10px 8px;box-shadow:0 10px 40px rgba(0,0,0,.6);transform:rotate(-1.2deg) scale(.96);transition:transform .9s;max-width:min(92vw,128vh)';
 const im=document.createElement('img');im.src=FAMIMG[V.img];im.style.cssText='display:block;width:100%;max-height:70vh;object-fit:contain;image-rendering:auto';
 const cap=document.createElement('div');cap.style.cssText='text-align:center;color:#3a2a1a;font-weight:bold;font-size:14px;margin-top:6px';cap.textContent=`第 ${wkN()} 個週末・${V.t}`;
 fr.appendChild(im);fr.appendChild(cap);
 const info=document.createElement('div');info.style.cssText='color:#fff6dc;text-align:center;font-size:14px;line-height:1.8;text-shadow:0 2px 0 #000;max-width:92vw';
 info.innerHTML=`<span style="font-size:18px;font-weight:bold">📸 ${V.t}　${'★'.repeat(star)}${'☆'.repeat(3-star)}</span><br>💗 家宜好感 +${pt}　💸 花費 ${cost}　😊 心情 +${10+star*6}<div style="opacity:.7;font-size:12px">點一下或按任意鍵繼續</div>`;
 ov.appendChild(fr);ov.appendChild(info);document.body.appendChild(ov);requestAnimationFrame(()=>{ov.style.opacity='1';fr.style.transform='rotate(-1.2deg) scale(1)'});
 (st.album=st.album||[]).push({w:wkN(),t:V.t,star,img:V.img});
 let done=false;const t0=performance.now();const end=()=>{if(done||performance.now()-t0<1000)return;done=true;removeEventListener('keydown',end,true);ov.style.opacity='0';setTimeout(()=>{ov.remove();window.TITLE=false;SVDIRTY=1},700)};
 addEventListener('keydown',end,true);ov.addEventListener('pointerdown',end)}
// 錯過出遊
{const _wr=wkReturn;wkReturn=function(){try{const v=st.yj&&st.yj.vis;if(v)[1,2].forEach(k=>{const f=v[k];if(f&&f.st<3&&wkN()>=f.W){f.st=9;frDrop('yijia',3);toast('😢 你沒有陪家宜的家人出遊……家宜有點失望（好感 -3）')}})}catch(e){}return _wr.apply(this,arguments)}}
