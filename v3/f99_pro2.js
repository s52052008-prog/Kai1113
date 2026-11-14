/* v13.7 序章調整：序二精簡（主日＋真道課合併）、每一步都有 💡 提示、序三固定在 11 月家宜生日、婚前輔導 3 堂、115/2/15 婚禮 */
// 日曆：跳到指定季節／週（0 春 1 夏 2 秋 3 冬），在下一次放假回家時生效
function proJumpN(s,w){let n=wkN()+1;const i=s*16+(w-1);while((n-1)%64!=i)n++;return n}
{const _a=wkArrive;wkArrive=function(){try{const P=st.pro;if(P&&P.jumpN){const W=wkState();W.n=P.jumpN;P.jumpN=0;if(P.ch==3&&!yjS().prop)P.w0=W.n}}catch(e){}const r=_a.apply(this,arguments);
 try{const P=st.pro;if(proOn()){setTimeout(()=>whenFree(()=>{const h=proHint();if(h)toast('💡 '+h.replace(/<[^>]+>/g,''))}),3500);
  }}catch(e){}return r}}
// ── 家宜好感上限：序章不需要「教會活動」那一步 ──
{const _c=yjCap;yjCap=function(){if(!proOn())return _c.apply(this,arguments);const y=yjS();if(!y.t1)return 59;if(st.partner!='劉家宜')return 99;if(!y.bapt)return 139;if(!y.prop)return 159;if(!y.wed)return 179;return 200}}
// ── 各章任務 ──
function proGoals(ch){const P=st.pro||{},y=yjS();
 if(ch==1)return[['💘 用 Binder 交友 App 找到聊得來的人',!!P.bind],['💬 每天聊天，聊一整個禮拜（平日在營區用手機聊）',!!P.chat],['🧋 晚上 7 點後到林園的公園，第一次見面',!!P.m1]];
 if(ch==2)return[['🙋 陪家宜去社福中心當志工',!!y.t1],['🎢 約家宜去台南十鼓',!!P.shigu],['💐 帶花束到花園廣場告白',st.partner=='劉家宜'],['♨️ 一起去關子嶺泡溫泉、看夜景',!!P.gzl],[`⛪ 週日一起去教會＋上真道課（${Math.min(2,y.church||0)}/2）`,(y.church||0)>=2||!!y.bapt],['🕊️ 一起受洗',!!y.bapt]];
 if(ch==3){let rc=0;try{rc=rnS().roof.s>=1}catch(e){}const p=!!y.prop;return[['🧹 把堆滿雜物的頂樓清乾淨',rc||p],['🎈 家樂福買氣球、燈串',(st.inv.g_balloon>0&&st.inv.g_lights>0)||p],['💍 買求婚戒指',st.inv.g_ring>0||p],[`👥 跟朋友變熟（好感 25 以上 ${Math.min(2,proFriends().length)}/2）`,proFriends().length>=2||p],['🎂 11 月家宜生日：頂樓求婚',p],[`💑 找以倫牧師上婚前輔導（${Math.min(3,y.coun||0)}/3）`,(y.coun||0)>=3],['💒 民國 115 年 2 月 15 日・婚禮',!!y.wed]]}
 return[]}
// ── 💡 提示：照當時真實的順序，告訴玩家下一步要做什麼 ──
const YJWHERE='（家宜通常在：週六 10–16 點咖啡廳、週末 16:30–19:30 公園；也可以按 P 打電話約她）';
function proHint(){const P=st.pro;if(!proOn())return'';const y=yjS(),s=FRS('yijia'),pt=s.pt;
 if(P.ch==1){if(!P.bind)return'按 <b>P</b> 打開手機 →「💘 Binder」，一直往右滑，找到聊得來的人。';
  if(!P.chat)return P.cpart?'這個週末照常過就好。週一收假回營時，你們會在手機上繼續聊一整個禮拜。':'打開手機 → Binder，跟 Kai 聊天。';
  return'晚上 <b>7 點以後</b>，走到林園的公園（按 M 看地圖，公園在上方）赴約。'}
 if(P.ch==2){if(!y.t1)return pt<50?`多找家宜聊天、送她喜歡的東西（好感 ${pt}/50），她會拜託你去社福中心幫忙。`+YJWHERE:'家宜在找人幫忙！找她聊天 →「🙋 任務：去社福中心當志工」。';
  if(!P.shigu)return pt<40?`家宜好感到 40 就能約她出去玩（${pt}/40）。`+YJWHERE:'找家宜聊天 →「🎢 約家宜去台南十鼓文創園區」（💰1,200）。';
  if(st.partner!='劉家宜')return pt<80?`繼續約會、聊天，家宜好感到 80（${pt}/80）就可以告白了。`+YJWHERE:(st.inv.bouquet>0?'帶著花束，<b>下午 3 點～晚上 8 點</b>找家宜 →「🌷 約家宜去花園廣場散步」，然後告白！':'先到<b>禮品屋或家樂福</b>買一束「💐 玫瑰花束」，再約家宜去花園廣場。');
  if(!P.gzl)return'交往了！找家宜聊天 →「♨️ 約家宜去台南關子嶺」（💰2,500），泡溫泉、看夜景。';
  if((y.church||0)<2)return`<b>週日早上 9～12 點</b>找家宜 →「⛪ 約家宜一起去教會」，主日之後一起上真道課（${y.church||0}/2）。`;
  if(!y.bapt)return pt<100?`家宜好感到 100 就能受洗（${pt}/100）。`:'到教會（城光復興堂）找<b>以倫牧師</b> →「🕊️ 和家宜一起受洗」。';return''}
 if(P.ch==3){const c=cal(),left=13-c.w;if(!y.prop){const G=proGoals(3);const nx=G.slice(0,4).find(g=>!g[1]);const cd=left>0?`（家宜生日還有 ${left} 個週末）`:'';
   if(!nx)return'準備好了！等到 11 月中家宜生日那個週末，求婚會自動開始。'+cd;
   if(nx[0].includes('頂樓'))return'回家走樓梯上 <b>6F 頂樓</b>，選「🧹 清理」把丁先生留下的雜物清掉。'+cd;
   if(nx[0].includes('氣球')||nx[0].includes('戒指'))return(nx[0].includes('戒指')?'戒指最重要！':'')+'到<b>家樂福</b> →「💍 求婚準備」，買氣球、燈串和戒指。'+cd;
   return'找朋友（禹豪、柏凱、哲良、以倫……）聊天、送禮，讓兩位朋友好感到 25，生日那天才找得到人幫忙。'+cd}
  if((y.coun||0)<3)return'到教會（城光復興堂）找<b>以倫牧師</b> →「💑 婚前輔導」，每個週末上一堂。';
  return'婚禮的日子就快到了……'}
 return''}
// 任務欄：顯示倒數＋提示
{const _q=qpanel;qpanel=function(){const r=_q.apply(this,arguments);try{if(!proOn()||!qOpen||typeof QTAB!='undefined'&&QTAB!=0)return r;const P=st.pro,c=cal(),y=yjS(),h=proHint();
 if(P.ch==3){const sub=qp.querySelector('.text-\\[10px\\]');const t=!y.prop?`民國 114 年 ${c.mo} 月・31 歲・🎂 家宜生日倒數 ${Math.max(0,13-c.w)} 週`:'民國 114～115 年・婚禮：115 年 2 月 15 日';if(sub)sub.textContent=t;else qp.innerHTML=qp.innerHTML.replace(/⏳ 第 \d+\/8 個週末/,t)}
 if(h)qp.insertAdjacentHTML('beforeend',`<div style="margin-top:5px;padding:4px 6px;border-radius:6px;background:rgba(255,216,74,.18);border:1px dashed rgba(255,216,74,.6);font-size:10.5px;line-height:1.4">💡 ${h}</div>`)}catch(e){}return r}}
// 序三：不會因為 8 週時間到而快轉（生日固定在 11 月）
{const _r=proRush;proRush=function(){const P=st.pro;if(P&&P.ch==3)return;return _r.apply(this,arguments)}}
// ── 序二：主日＋真道課合併、不用另外邀去教會活動 ──
{const _y=yjOpts;yjOpts=function(o,n,s,dk){_y.apply(this,arguments);if(!proOn())return;const y=yjS(),P=st.pro;
 for(let i=o.length-1;i>=0;i--){const t=o[i]&&o[i][0];if(typeof t!='string')continue;if(t.startsWith('⛪ 任務：邀家宜參加教會活動')||t.startsWith('🎂 家宜生日')||t.startsWith('💍 向家宜求婚'))o.splice(i,1)}
 const ci=o.findIndex(q=>typeof q[0]=='string'&&q[0].startsWith('⛪ 約家宜一起去教會'));if(ci>=0&&P.ch==2&&!y.bapt){const f0=o[ci][2];o[ci]=['⛪ 約家宜一起去教會（主日＋真道課）',`週日 9:00–12:00・${Math.min(2,y.church)}/2 次`,()=>{const k=Math.min(1,y.church||0);f0();y.faith=Math.min(4,(y.faith||0)+2);SVDIRTY=1;qpanel();
   setTimeout(()=>whenFree(()=>openDlg('📖 主日之後・真道課',['主日結束後，以倫牧師把你們帶到小房間，翻開聖經：「神愛世人，甚至將祂的獨生子賜給他們。」<br>家宜聽得很專心，在筆記本上寫個不停。<br><br>「原來被愛，不需要先變得夠好。」她小聲地說。','今天講的是「受洗與新生命」。<br>以倫牧師看著你們：「受洗，是向世界宣告：我屬於基督。你們準備好了嗎？」<br>你和家宜對看一眼，一起點了頭。<br><br>💡 家宜好感到 100，就能找以倫牧師受洗！'][k],[['🙏','',closeDlg]])),300)},o[ci][3]]}}}
{const _l=ylOpts;ylOpts=function(o,n){_l.apply(this,arguments);if(!proOn())return;const y=yjS(),s=FRS('yijia'),P=st.pro,W=wkN();
 for(let i=o.length-1;i>=0;i--){const t=o[i]&&o[i][0];if(typeof t!='string')continue;if(t.startsWith('📖 和家宜一起上真道問答')||t.startsWith('💒 請以倫牧師證婚')||t.startsWith('💑 和家宜一起上婚姻輔導'))o.splice(i,1)}
 const b=o.findIndex(q=>typeof q[0]=='string'&&q[0].startsWith('🕊️ 和家宜一起受洗'));
 if(!y.bapt&&st.partner=='劉家宜'&&P.ch==2){const ok=(y.church||0)>=2&&s.pt>=100;const it=['🕊️ 和家宜一起受洗',`主日＋真道課 ${Math.min(2,y.church||0)}/2・家宜好感 ${s.pt}/100`,yjBaptism,!ok];if(b>=0)o[b]=it;else o.splice(Math.max(0,o.length-1),0,it)}
 if(P.ch==3&&y.prop&&(y.coun||0)<3)o.splice(Math.max(0,o.length-1),0,[`💑 和家宜一起上婚前輔導（第 ${(y.coun||0)+1}/3 堂）`,y.cW==W?'這個週末已經上過了':'1.5 小時・每個週末一堂',proCounsel,y.cW==W])}}
// ── 序二 → 序三：日曆跳到 114 年 10 月 ──
{const _n=proNext;proNext=function(){const P=st.pro;if(P&&P.ch==2){closeDlg();P.ch=3;P.ask=0;P.jumpN=proJumpN(2,7);SVDIRTY=1;
  storyPages('📖 序三・求婚',[Q_('交往的第三年，民國 114 年秋天，你 31 歲。<br>你心裡已經很確定了：<b>就是她。</b>'),Q_('家宜的生日在 <b>11 月 13 日</b>。<br>你想在自己家的頂樓給她一個驚喜——但頂樓到現在還堆滿丁先生留下的雜物……<br><br>先把頂樓清乾淨，準備氣球、燈串和戒指，再找朋友來幫忙吧！<br><span style="font-size:12px;opacity:.8">（收假後，下一個週末就是 10 月。生日那個週末到了，求婚會自動開始。）</span>')],()=>{qOpen=true;qpanel()},'▶ 開始準備');return}
 return _n.apply(this,arguments)}}
// ── 11 月中：家宜生日 → 求婚 ──
function proBirthday(){const P=st.pro,y=yjS();if(y.prop||P.bdGo)return;P.bdGo=1;SVDIRTY=1;const G=proGoals(3),ready=G.slice(0,4).filter(g=>g[1]).length;
 openDlg('🎂 11 月 13 日・家宜的生日',`今天是家宜的生日。<br>你約她晚上來家裡吃飯，她完全不知道你準備了什麼。<br><br>準備狀況：${G.slice(0,4).map(g=>(g[1]?'✅ ':'⬜ ')+g[0].replace(/（.*）/,'')).join('<br>')}${ready<4?'<br><br><i>（有些東西沒準備好……不過心意最重要！）</i>':''}`,[['🎂 開始求婚驚喜','',()=>{closeDlg();if(st.partner!='劉家宜')st.partner='劉家宜';const s=FRS('yijia');s.pt=Math.max(s.pt,140);P.propOn=1;if(!(st.inv.g_ring>0)){payOut(12000);addItem('g_ring',1);return openDlg('💍 生日當天一早','你在床上突然驚醒——<b>戒指還沒買！</b><br>你衝去銀樓，在櫃檯前挑了快一個小時，終於選到一枚簡單又閃亮的戒指。<br>把小盒子放進外套內側口袋，你拍了拍它：「好，今天就靠你了。」<br><br>💸 -12,000',[['💍 趕回家準備','',()=>{closeDlg();proProposal()}]])}proProposal()}]])}
// ── 婚前輔導 3 堂（每上完一堂，時間往後推一個多月） ──
const COUNSEL=[
 ['💑 婚前輔導・第一堂「成為對的人」',['以倫牧師倒了兩杯茶，笑著說：「恭喜你們！不過結婚不是終點，是起點喔。」','「婚姻不是找到對的人，而是<b>成為對的人</b>。」<br>他發給你們一人一張紙：「寫下你對未來家庭的三個期待，寫完交換看。」','你寫：「1. 每天一起吃晚餐　2. 一起服事　3. 把老房子修成我們的家」<br>家宜寫：「1. 每天一起吃晚餐　2. 不要吵架超過一天　3. 他要記得我的生日」<br>你們看完都笑了——第一條一模一樣。']],
 ['💑 婚前輔導・第二堂「同一隊的」',['今天的主題是「衝突」。<br>以倫牧師說：「你們一定會吵架。重點不是不吵，是吵的時候記得——<b>你們是同一隊的</b>。」','他讓你們練習：一個人說出最近讓自己不舒服的一件事，另一個人只能重複對方的話，不能辯解。<br>家宜說：「你收假前一天都在打電動，我覺得被冷落。」<br>你吞了一口口水：「……妳覺得我收假前一天都在打電動，讓妳覺得被冷落。」','說完你們都笑出來。家宜偷偷捏了一下你的手：「知道就好。」']],
 ['💑 婚前輔導・第三堂「三股合成的繩子」',['最後一堂，以倫牧師翻開傳道書：「有人攻勝孤身一人，若有二人便能抵擋他；<b>三股合成的繩子，不容易折斷</b>。」','「你們兩個是兩股，第三股是神。把神放在你們中間，日子再難，繩子都不會斷。」<br>他為你們按手禱告，家宜的眼眶紅紅的。','禱告完，以倫牧師拿出行事曆：「好！2 月 15 日，我幫你們證婚。」<br>家宜轉頭看你，笑得好燦爛。']]];
function proCounsel(){const y=yjS(),k=y.coun||0;if(k>=3)return;closeDlg();const C=COUNSEL[k];
 storyPages(C[0],C[1].map(Q_),()=>{y.coun=k+1;y.cW=wkN();advance(1.5);frAdd('yijia',4,1);try{frAdd('yilun',3,1)}catch(e){}fxApply({j:10});hud();SVDIRTY=1;qpanel();const P=st.pro;
  if(y.coun<3){P.jumpN=proJumpN(...(y.coun==1?[3,1]:[3,7]));toast(`💑 婚前輔導 ${y.coun}/3 完成！下個週末是 ${y.coun==1?'12':'1'} 月了`)}
  else{P.jumpN=proJumpN(3,13);P.wedGo=1;toast('💒 婚前輔導全部完成！下個週末就是 2 月 15 日，婚禮！')}},'🙏')}
// ── 115 年 2 月 15 日：婚禮 ──
function proWeddingDay(){const y=yjS(),P=st.pro;if(y.wed||P.wedOn)return;P.wedOn=1;SVDIRTY=1;
 storyPages('💒 民國 115 年 2 月 15 日',[Q_('一早，你站在鏡子前打領帶，手一直在抖。<br>禹豪拍拍你的肩膀：「兄弟，放輕鬆，今天你最帥。」'),Q_('教會已經佈置好了。家宜的媽媽從澳門飛來，阿公也來了。<br>你深吸一口氣，走向台前。')],()=>{P.wedCall=1;if(st.money<30000){st.money=30000;toast('💒 教會的弟兄姊妹一起幫忙張羅婚禮，費用湊齊了！')}yjWedding()},'💒 婚禮開始')}

// 生日、婚禮：等畫面空下來（放假過場、週末計畫都關掉之後）才開始
let proEvT=0;setInterval(()=>{try{const P=st.pro;if(!proOn()||P.ch!=3||window.TITLE||window.OVL||!dlg.hidden||MG)return proEvT=0;proEvT++;if(proEvT<3)return;const c=cal(),y=yjS();
 if(!y.prop&&P.bdGo&&!P.propOn&&proEvT>6)P.bdGo=0;if(P.wedOn&&!y.wed&&!P.wedCall&&proEvT>6)P.wedOn=0;
 if(!y.prop&&!P.bdGo&&c.s==2&&c.w>=13)proBirthday();else if(P.wedGo&&!y.wed&&!P.wedOn)proWeddingDay()}catch(e){}},700);
