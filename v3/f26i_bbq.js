/* ===== v7.1 難忘的台南烤肉之夜（柏凱還單身時）===== */
function bbqCheck(){const B=st.bbq||null,W=wkN();if(B)return;const b=st.bk||{};
 if(!b.met||b.z2)return;if(FRS('bokai').pt<40||FRS('yilun').pt<50||FRS('yijia').pt<50||FRS('yuhao').pt<50)return;
 st.bbq={inv:W};whenFree(()=>openDlg('📲 群組「城光球友＆吃貨團」','<b>禹豪</b>：「這週六晚上去台南烤肉啦！🍖」<br><b>以倫</b>：「好啊！毓方跟之瑜也會來～」<br><b>柏凱</b>：「肉交給我烤！單身漢的手藝讓你們見識一下🔥」<br><b>媛媛</b>：「老哥記得把家宜帶來喔～」<br><span class="text-[12px] opacity-80">（週六 17:00–20:00 從手機赴約）</span>',[['「＋1！我負責帶飲料！」','',closeDlg]]))}
{const _le=lifeEvents;lifeEvents=function(){_le.apply(this,arguments);try{whenFree(bbqCheck)}catch(e){}}}
{const _yc=yjCheck;yjCheck=function(){_yc.apply(this,arguments);try{if(typeof wkState=='function'&&!window.TITLE)bbqCheck()}catch(e){}}}
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){try{if(t=='📱 手機・通訊錄'&&Array.isArray(opts)&&st.bbq&&!st.bbq.done){const dd=dow(),h=T.hour;
  opts.unshift(['🍖 赴約：台南烤肉之夜','週六 17:00–20:00・約 5 小時・分攤 💰600',bbqGo,!(dd==5&&h>=17&&h<20)||st.money<600])}}catch(e){}return _od.call(this,t,d,opts,sub,mode)}}
function bbqGo(){closeDlg();st.money-=600;storyPages('🍖 難忘的台南烤肉之夜',[
 '傍晚，你載著家宜一路往台南開。到的時候，禹豪已經在生火，媛媛在旁邊幫忙搧風，以倫、毓方和之瑜正把一箱一箱的肉和玉米搬下車。',
 '開動前，以倫說：「來，我們先謝飯。」大家圍成一圈低頭禱告。<br>「阿們！」——話才剛說完，禹豪已經把第一片肉丟上烤網了。',
 '柏凱捲起袖子接過夾子：「肉交給我！」三分鐘後，烤網冒出一陣黑煙。<br>「欸你這個是炭烤還是火葬啦！」禹豪笑到蹲在地上，柏凱面不改色：「這叫焦香，你不懂。」',
 '烤肉、香腸、玉米、甜不辣一盤一盤地上。大家聊工作、聊教會、聊以前的糗事，笑聲沒停過。<br>柏凱舉著飲料嘆氣：「你們都成雙成對，只有我還是黃金單身漢欸……」以倫拍拍他：「我們幫你禱告！」',
 '夜深了，有人拿出一支螢光棒高高舉起，大家一起起鬨。<br>家宜靠在你旁邊，小聲說：「跟你的朋友在一起，好開心喔。」<br>你舉起手機：「來，大家看這邊——」'],()=>{st.bbq.done=wkN();advance(5);fxApply({j:25,s:10});['yilun','bokai','yuhao','yijia'].forEach(k=>frAdd(k,4,1));hud();
  photoShow('bbq','難忘的台南烤肉之夜','⛪ 以倫 +4　⛹️ 柏凱 +4　🏀 禹豪 +4　💗 家宜 +4　😊 心情 +25')},'📸 自拍！')}
