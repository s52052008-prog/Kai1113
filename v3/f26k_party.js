/* ===== v7.3 溫馨的相聚時光：柏凱筑筑交往後，和譽祥、貞儀夫婦來家裡吃飯 ===== */
function ptCheck(){const b=st.bk||{},W=wkN();if(st.hp2||!b.z2||st.partner!='劉家宜'||b.wed)return;if(W<b.z2+2)return;
 st.hp2={inv:W};whenFree(()=>openDlg('📲 家宜傳來 LINE','「欸～柏凱跟筑筑在一起之後，我們都還沒好好跟他們吃頓飯耶！<br>這週<b>六晚上</b>請他們來家裡吃飯好不好？順便約<b>譽祥跟貞儀</b>～😋」<br><span class="text-[12px] opacity-80">（週六 18:00–21:00 從手機開始聚會・買菜約 💰1200）</span>',[['「好啊！我去買菜！」','',closeDlg]]))}
{const _le=lifeEvents;lifeEvents=function(){_le.apply(this,arguments);try{whenFree(ptCheck)}catch(e){}}}
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){try{if(t=='📱 手機・通訊錄'&&Array.isArray(opts)&&st.hp2&&!st.hp2.done){const dd=dow(),h=T.hour;
  opts.unshift(['🍲 開始：在家請朋友吃飯','週六 18:00–21:00・買菜 💰1200',ptGo,!(dd==5&&h>=18&&h<21)||st.money<1200])}}catch(e){}return _od.call(this,t,d,opts,sub,mode)}}
function ptGo(){closeDlg();st.money-=1200;storyPages('🏠 溫馨的相聚時光',[
 '傍晚，家宜在廚房忙進忙出，你負責擺碗筷、把客廳收拾乾淨。<br>門鈴響了——柏凱和筑筑手牽手站在門口，後面是譽祥和貞儀，手上還提著甜點。',
 '「哇——你們家有按摩椅！」<br>話還沒說完，柏凱已經整個人躺上去了：「這個……太舒服了吧……我值完大夜班最需要這個……」<br>筑筑笑著幫他蓋上紫色毯子：「好啦，給你躺五分鐘。」',
 '結果五分鐘變成二十分鐘，柏凱完全不想起來。<br>譽祥在旁邊排隊：「教練你也躺太久了吧！換人啦！」<br>貞儀笑到趴在沙發上，家宜端著菜出來：「先吃飯啦你們！」',
 '一桌菜、幾杯熱飲，大家聊工作、聊教會、聊柏凱跟筑筑是怎麼開始的。<br>柏凱害羞地抓抓頭：「就……禱告啊。神真的會聽禱告的啦！」大家一陣起鬨。',
 '夜深了，你架好手機：「來，最後拍一張！」<br>柏凱賴在按摩椅上比 YA，筑筑蹲在最前面笑得最開心，譽祥和貞儀擠在沙發邊。<br>你翹著屁股硬擠進鏡頭，家宜在你後面指著你的屁股大笑——'],()=>{st.hp2.done=wkN();advance(4);fxApply({j:25,s:10});frAdd('bokai',4,1);frAdd('yijia',4,1);hud();
  photoShow('xmas','溫馨的相聚時光','⛹️ 柏凱好感 +4　💗 家宜好感 +4　😊 心情 +25<br><span style="font-size:12px;opacity:.85">「能有這樣的好朋友來作客，真的好幸福！」</span>')},'📸 合照！')}
