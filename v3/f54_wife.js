/* v10.2 婚後的家宜：心願清單（冷氣、廚房、美容）、工作不順要安慰、幸福肥 DLC（家宜變成你的健身學員） */
const wfS=()=>st.wf||(st.wf={});
const wed=()=>{try{return !!yjS().wed}catch(e){return false}};
// ───────── 心願清單 ─────────
const WISH={ac:{n:'❄️ 換一台新冷氣',p:80000,need:()=>cal().s==1,ask:'「老公……臥室的冷氣好像壞了，吹出來都是熱風。我昨晚熱到睡不著……」',done:'師傅裝好新冷氣，臥室一下子涼了下來。家宜倒在床上：「天啊，我活過來了！」<br>❄️ 睡得好、精神好：<b>體力上限永久 +20</b>'},
 kit:{n:'🍳 裝潢廚房',p:100000,need:()=>wkN()>=10,ask:'「如果廚房大一點、有好的爐子，我好想煮我媽媽教我的港式料理給你吃喔……」',done:'新廚房完工了！家宜摸著亮晶晶的流理台，眼睛都在發光。<br>🍳 解鎖：每個週末家宜會做一道港式料理（煲仔飯、豉汁排骨、楊枝甘露……）'},
 spa:{n:'💆 送她去美容體雕',p:1600,month:8,need:()=>true,ask:'「最近好累喔，皮膚都變差了……好想去做一次臉。」',done:'家宜做完臉回來，整個人亮晶晶的：「老公～謝謝你！」'}};
function wishMenu(){const W=wfS();const o=[];Object.keys(WISH).forEach(k=>{const Q=WISH[k],got=W[k]&&!Q.month,cool=Q.month&&W[k]&&wkN()-W[k]<Q.month;if(!got&&!Q.need())return;
 o.push([Q.n+'（💰'+Q.p.toLocaleString('en-US')+'）',got?'✅ 已完成':cool?'兩個月一次，最近才去過':'',()=>{payOut(Q.p);W[k]=Q.month?wkN():1;try{frAdd('yijia',Q.p>=50000?10:4,1)}catch(e){}fxApply({j:12});hud();SVDIRTY=1;openDlg('💗 '+Q.n.replace(/^\S+\s/,''),Q.done+'<br><br>💗 家宜好感 +'+(Q.p>=50000?10:4),[['老婆開心最重要','',closeDlg]])},got||cool||funds()<Q.p])});
 if(!o.length)o.push(['家宜現在沒有特別想要的東西','',()=>{}]);
 openDlg('💗 老婆的心願',wed()?'家宜偶爾會提到想要的東西。幫她實現，她會很開心。':'結婚之後才會出現。',o.concat([['返回','',phoneHome]]))}
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{if(!wed())return r;const W=wfS();
 // 心願（同一個心願只提一次）
 W.asked=W.asked||{};const ks=Object.keys(WISH).filter(k=>!W[k]&&!W.asked[k]&&WISH[k].need());if(ks.length&&Math.random()<.35){const k=ks[0];W.asked[k]=1;setTimeout(()=>whenFree(()=>openDlg('💬 家宜',WISH[k].ask+'<br><br><span style="font-size:12px;opacity:.8">手機「💗 老婆的心願」可以幫她實現。</span>',[['我來想辦法！','',closeDlg]])),7000)}
 // 冷氣壞了：夏天每週心情 -3
 if(cal().s==1&&W.asked.ac&&!W.ac)fxApply({j:-3});
 // 工作不順
 if(!W.sad&&Math.random()<.12){W.sad=wkN();setTimeout(()=>whenFree(comfortYj),9000)}else if(W.sad&&wkN()-W.sad>1)W.sad=0;
 // 港式料理
 if(W.kit)setTimeout(()=>whenFree(hkDish),11000);
 // 幸福肥 DLC 開場
 if(!W.diet&&wkN()>=8&&rnS().gym.lv>=2&&Math.random()<.4){W.diet=1;setTimeout(()=>whenFree(dietStart),8000)}}catch(e){console.error(e)}return r}}
// ───────── 工作不順：安慰她 ─────────
function comfortYj(){const o=[['🍽️ 帶她去吃大餐（💰2,000）','碳佐麻里的燒肉，吃飽心情就好了',()=>{payOut(2000);fin(8,'燒肉在炭火上滋滋作響，家宜吃著吃著笑了出來：「好啦，沒那麼難過了。」')},funds()<2000],
 ['🛋️ 陪她聊天（1 小時）','靜靜聽她說完',()=>{advance(1);fin(6,'你什麼都沒說，只是一直聽。家宜說完，靠在你肩上：「謝謝你都不會打斷我。」')}],
 ['🙏 為她禱告','',()=>{fin(5,'你握著她的手為她禱告。她眼眶紅紅的：「有你真好。」')}]];
 if(st.guitarDone)o.splice(1,0,['🎸 彈吉他唱歌給她聽','',()=>{fin(10,'你抱著吉他唱了〈此生相依〉。唱到一半，家宜就破涕為笑：「你走音了啦……但我好喜歡。」')}]);
 const fin=(n,t)=>{wfS().sad=0;try{frAdd('yijia',n,1)}catch(e){}fxApply({j:6});hud();closeDlg();openDlg('💗 安慰家宜',t+'<br><br>💗 家宜好感 +'+n,[['❤️','',closeDlg]])};
 const SAD=['「今天個案的家長好煩，完全搞不清楚狀況……講了三次還是聽不懂。」','「今天同事有夠雷，事情搞砸了還害我被連累……」','「老闆今天是吃錯藥嗎？莫名其妙把大家罵了一頓。」','「今天工作好累喔～我只想躺在沙發上，連澡都不想洗了……」'];
 openDlg('💬 家宜','家宜一進門就把包包丟在沙發上，整個人縮成一團：'+SAD[Math.floor(Math.random()*SAD.length)],o)}
// ───────── 港式料理（裝潢廚房後） ─────────
const HKD=[['煲仔飯','🍚',{s:30,j:10}],['豉汁蒸排骨','🍖',{s:28,j:10}],['蜜汁叉燒','🥩',{s:30,j:12}],['楊枝甘露','🥭',{s:10,j:14}],['港式蘿蔔糕','🍘',{s:22,j:8}],['菠蘿油','🍞',{s:18,j:12}],['西多士','🍞',{s:20,j:12}]];
function hkDish(){if(!wed())return;const W=wfS();if(W.hkW==wkN())return;W.hkW=wkN();const d=HKD[Math.floor(Math.random()*HKD.length)];fxApply(d[2]);hud();
 openDlg('🍳 家宜的港式料理',`家宜在新廚房忙了一下午，端出一盤熱騰騰的<b>${d[1]} ${d[0]}</b>：「我媽媽的味道喔，吃吃看！」<br><br>${Object.entries(d[2]).map(([k,v])=>({s:'⚡',j:'😊'}[k])+'+'+v).join(' ')}`,[['老婆煮的最好吃！','',closeDlg]])}
// ───────── 幸福肥 DLC：家宜變成學員 ─────────
function dietStart(){openDlg('💬 家宜','家宜站在體重計上，沉默了很久。<br>「老公……結婚之後我胖了 10 公斤。都是你每天帶我吃好料的啦！」<br>「你不是教練嗎？我要你教我！我要健康瘦回來，夏天要穿去年那件洋裝！」<br><br>💗 <b>幸福肥 DLC 開始！</b>家宜成為你的學員（家庭健身房）。<br><span style="font-size:12px;opacity:.85">除了上課，平常要陪她吃健康一點（全聯的舒肥雞胸、藍莓、櫛瓜都算），不然她會偷吃宵夜……</span>',[['包在我身上！','',closeDlg]])}
STU.yijia={n:'家宜',key:'yj',lv2:1,need:()=>!!wfS().diet,goal:'幸福肥，想健康瘦 10 公斤、穿回去年的洋裝',cues:[['1','膝蓋內夾','膝蓋跟腳尖同方向！'],['2','手肘太開','手肘夾緊！'],['3','偷懶放慢','再三下就好，加油！'],['4','憋氣','吸氣、吐氣～']],
 ms:[[30,'家宜站上體重計：「掉了 3 公斤！！」她開心地在客廳轉圈圈。'],[60,'家宜穿上去年的洋裝，在鏡子前轉了一圈：「拉鍊拉得上去了！」'],[100,'🎉 家宜瘦了 10 公斤，達成目標！<br>她拉著你去拍了一組紀念照：「這是我們一起努力的成果！」<br>從此以後，你們每個週末都會一起運動。<br>💗 家宜好感大增']]};
// 減肥期間：吃健康的食物會幫她加分，吃炸雞桶、PIZZA 會扣分
{const _ui=useItem;if(typeof _ui=='function')useItem=function(k){const r=_ui.apply(this,arguments);try{if(wfS().diet&&stuS('yijia').p<100){if(['px_chick','px_blue','px_zuc','px_shrimp','px_veg'].includes(k)){stuS('yijia').p=Math.min(100,stuS('yijia').p+2);toast('🥗 陪家宜吃得健康，減肥進度 +2%')}else if(['cf_bucket','cf_pizza','cf_snack'].includes(k)){stuS('yijia').p=Math.max(0,stuS('yijia').p-3);toast('🍗 家宜：「你又買炸雞……」減肥進度 -3%')}}}catch(e){}return r}}
// 完成時多給好感
{const _cg=coachGame2;coachGame2=function(id){const r=_cg.apply(this,arguments);if(id=='yijia'){try{frAdd('yijia',3,1)}catch(e){}}return r}}
// ───────── 手機：老婆的心願 ─────────
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)&&wed()){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i<0?opts.length:i,0,['💗 老婆的心願','冷氣、廚房、美容……',wishMenu,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
