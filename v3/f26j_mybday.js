/* ===== v7.2 交往後的第一個生日：家宜和禹豪在頂樓的驚喜派對 ===== */
function mbCheck(){const y=yjS(),W=wkN();if(st.partner!='劉家宜'||!y.confW||st.mbd)return;if(W<y.confW+2)return;
 st.mbd={inv:W};whenFree(()=>openDlg('📲 禹豪傳來 LINE','「兄弟！這週<b>六晚上七點</b>，我帶教會的朋友去你家<b>頂樓</b>吃飯～<br>東西我們買，你負責開門就好！🍗🍕」<br><span class="text-[12px] opacity-80">（週六 19:00–22:00 從手機赴約）</span>',[['「好啊！頂樓見！」','',closeDlg]]))}
{const _le=lifeEvents;lifeEvents=function(){_le.apply(this,arguments);try{whenFree(mbCheck)}catch(e){}}}
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){try{if(t=='📱 手機・通訊錄'&&Array.isArray(opts)&&st.mbd&&!st.mbd.done){const dd=dow(),h=T.hour;
  opts.unshift(['🍗 赴約：大家來頂樓吃飯','週六 19:00–22:00',mbGo,!(dd==5&&h>=19&&h<22)])}}catch(e){}return _od.call(this,t,d,opts,sub,mode)}}
function mbGo(){closeDlg();storyPages('🎂 難忘的第一次生日',[
 '頂樓拉起了一串小燈泡，禹豪帶著一大群教會朋友，提著炸雞、披薩和飲料上來。<br>大家席地而坐，邊吃邊聊，笑聲在夜空裡飄得好遠。家宜坐在你旁邊，不知道為什麼一直偷看手機。',
 '吃到一半，燈突然全暗了。<br>「欸？跳電喔？」你正要起身——<br>黑暗中，一點一點的燭光慢慢靠近。',
 '是家宜。她捧著一個蛋糕，蠟燭的光映在她的眼鏡上。<br>「生日快樂——！！」所有人一起大喊，禹豪在旁邊拉炮：「被騙到了吧！說好的吃飯只是幌子啦！」<br>家宜有點害羞：「蛋糕是我偷偷準備的……你不准嫌棄喔。」',
 '你愣在原地，好久說不出話。<br>從小到大，你從來沒有被誰這樣慶祝過生日。<br>這是你人生中，<b>第一次被人慶生</b>。',
 '大家一起唱生日快樂歌。你閉上眼睛許願，吹熄蠟燭。<br>家宜湊過來小聲問：「許了什麼願？」<br>你笑著說：「說出來就不靈了。」——其實願望裡，全都是她。',
 '「來來來，壽星跟女朋友拍一張！」禹豪舉起手機。<br>你一手摟著家宜、一手捧著蛋糕，她比了一個招牌手勢——'],()=>{st.mbd.done=wkN();advance(3);fxApply({j:30});frAdd('yijia',6,1);frAdd('yuhao',3,1);['yilun','rita'].forEach(k=>{if(FRS(k).met)frAdd(k,1,1)});hud();
  photoShow('mybday','難忘的第一次生日','💗 家宜好感 +6　🏀 禹豪好感 +3　😊 心情 +30<br><span style="font-size:12px;opacity:.85">「謝謝你一直都在，讓平凡的日子也充滿幸福。」</span>')},'📸 拍照！')}
