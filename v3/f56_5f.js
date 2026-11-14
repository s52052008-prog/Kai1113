/* v10.5 5F 改造：書房 → 教練辦公室（讀原文書、線上報名考 ACE-CPT 國際私人教練）、客房 → 溫馨客房（邀請家人朋友來住） */
const coachPay=b=>Math.round(b*(st.cert?1.5:1));
const f5S=()=>st.f5||(st.f5={study:0,guest:0,read:0,exW:-1,gst:{}});
// ───────── 書房 → 教練辦公室 ─────────
{const R=IN['家'];if(R&&R.spf){const st0=R.spf.study;R.spf.study=()=>officeMenu(st0)}}
function officeMenu(f0){const F=f5S(),lv=F.study;
 if(lv<1)return openDlg('📚 書房','堆滿雜物的小書房。<br>如果把它整理成<b>教練辦公室</b>，就能好好準備 ACE-CPT 國際私人教練證照。',[['🏗️ 改造成教練辦公室（💰20,000）','白板、證照牆、筆電桌、解剖圖・可以讀書準備 ACE-CPT',()=>{payOut(20000);F.study=1;hud();SVDIRTY=1;closeDlg();openDlg('🎉 教練辦公室完成！','牆上貼著人體肌肉解剖圖，牆上掛著你的 C 級健身教練證，白板寫著「目標：ACE-CPT 國際私人教練」。<br>家宜探頭進來：「哇，好專業喔，教練～」<br><br>📖 現在可以在這裡讀原文書，準備考 ACE-CPT。',[['開始努力！','',closeDlg]])},funds()<20000],['📚 原本的書桌','',()=>{closeDlg();f0&&f0()}],['離開','',closeDlg]]);
 const o=[];if(!st.cert)o.push(['📖 讀 ACE 原文書（1 小時）',`讀書進度 ${F.read}/5・🧠+1・⚡-6`,()=>{F.read=Math.min(5,F.read+1);fxApply({w:1,s:-6});advance(1);hud();SVDIRTY=1;closeDlg();toast(F.read>=5?'📖 準備好了！可以在教練辦公室線上報名考試':'📖 讀完一章：'+['人體解剖與運動學','運動生理學','營養與體重管理','ACE IFT 訓練模式','行為改變與教練溝通'][F.read-1])},st.sta<6||F.read>=5]);
 o.push(['📋 看看教練筆記','學員的進度一覽',()=>{const L=[`🏀 黃禹豪：${ptS().kg} 公斤（目標 75）`].concat(Object.keys(STU).filter(k=>!STU[k].exam&&(!STU[k].need||STU[k].need())&&(rnS().gym.lv>=3||STU[k].lv2)).map(k=>`🧓 ${STU[k].n}：進度 ${stuS(k).p}%`));openDlg('📋 教練筆記',(st.cert?'🏅 <b>ACE-CPT 國際私人教練</b>（上課收費 ×1.5）<br><br>':'🏅 C 級健身教練<br><br>')+L.join('<br>'),[['返回','',()=>officeMenu(f0)]])}],['📚 原本的書桌','',()=>{closeDlg();f0&&f0()}],['離開','',closeDlg]);
 if(!st.cert)o.splice(1,0,['💻 線上報名 ACE-CPT 考試',F.read<5?`要先讀完 5 章（目前 ${F.read}/5）`:F.exW==wkN()?'這個週末已經考過了，下週再來':'報名費 💰16,000・到電腦考場考英文選擇題，答對 7/10 才過',()=>{payOut(16000);F.exW=wkN();hud();SVDIRTY=1;closeDlg();tFade('💻 前往電腦考場<br><span style="font-size:14px;opacity:.8">深呼吸，你準備好了</span>',()=>{advance(3);examQuiz()})},F.read<5||F.exW==wkN()||funds()<16000]);
 openDlg('🗂️ 教練辦公室',st.cert?'牆上掛著你的 C 級健身教練證，旁邊多了一張 <b>ACE-CPT 國際私人教練</b>證書。':'牆上掛著你的 C 級健身教練證。下一個目標：<b>ACE-CPT 國際私人教練</b>。讀完 5 章原文書後，線上報名電腦考試。',o)}
// ───────── ACE-CPT 電腦考試（從教練辦公室報名） ─────────
const QZ=[['深蹲時，膝蓋應該朝哪個方向？',['跟腳尖同方向','往內夾','往外推到最開','不用管'],0],['一般估算最大心率的公式是？',['220 − 年齡','180 + 年齡','200 − 體重','160 − 年齡'],0],
 ['想增肌的人，每公斤體重每天大約需要多少蛋白質？',['1.6–2.2 公克','0.3 公克','5 公克','10 公克'],0],['「漸進式超負荷」是指？',['逐步增加訓練的重量或強度','每次都練到力竭','只練同一個重量','休息越久越好'],0],
 ['1RM 是什麼意思？',['只能做一次的最大重量','一分鐘做的次數','一組的休息時間','一天的訓練量'],0],['肌肥大訓練，每組之間通常建議休息多久？',['60–90 秒','10 秒','10 分鐘','不用休息'],0],
 ['1 公克碳水化合物大約有多少大卡？',['4 大卡','9 大卡','1 大卡','20 大卡'],0],['訓練前熱身主要的目的？',['提高體溫、降低受傷風險','讓肌肉先累','消耗多一點熱量','沒有用'],0],
 ['學員運動中突然胸痛、喘不過氣，第一件事該做？',['立刻停止運動並尋求醫療協助','叫他再撐一下','給他喝運動飲料','換一個動作繼續'],0],['RPE 量表是用來評估什麼？',['自覺運動強度','體脂肪','柔軟度','睡眠品質'],0],
 ['硬舉時背部應該保持？',['自然中立、不拱背','彎成圓弧','完全放鬆','往後仰到底'],0],['有氧運動的「燃脂區」大約是最大心率的？',['60–70%','20–30%','95–100%','120%'],0]];
function examQuiz(){const Q=[...QZ].sort(()=>Math.random()-.5).slice(0,10).map(q=>{const ans=q[1][q[2]],op=[...q[1]].sort(()=>Math.random()-.5);return{t:q[0],op,a:op.indexOf(ans)}});let i=0,ok=0;advance(1);
 const ask=()=>{if(i>=Q.length){const pass=ok>=7;if(pass){st.cert=1;fxApply({j:25,r:15,w:3});try{feedPost('🏅 考過 ACE-CPT 國際私人教練！','原文書啃了好幾個月，終於一次過關！離退伍後當教練的夢想又近了一步。',null)}catch(e){}hud();SVDIRTY=1}
  return openDlg(pass?'🏅 ACE-CPT 通過！':'📝 考試結果',`答對 <b>${ok}/10</b> 題。${pass?'<br>螢幕跳出「PASS」的那一刻，你差點在考場叫出來。<br>回到家，家宜把證書裱框，掛在 C 級證照旁邊。<br><br>🏅 <b>ACE-CPT 國際私人教練</b>：私人教練課收費 ×1.5<br>😊 +25　⭐ +15　🧠 +3':'<br>❌ 差一點……原文的題目真的不好讀。回家再多讀一點，下個週末再考（要重新報名）。'}`,[[pass?'感謝主！':'下次一定過','',closeDlg]])}
  const q=Q[i];openDlg(`💻 ACE-CPT 第 ${i+1}/10 題`,q.t,q.op.map((t,k)=>[t,'',()=>{if(k==q.a)ok++;i++;ask()}]))};ask()}
// ───────── 客房 → 溫馨客房 ─────────
{const R=IN['家'];if(R&&R.spf){const g0=R.spf.guest;R.spf.guest=()=>guestMenu(g0)}}
const GUESTS=[['afu','👨 爸爸阿福',()=>true,'阿福提著一袋高山茶來，一進門就說：「來，泡茶！」<br>父子倆在客廳泡了一晚上的茶，聊部隊、聊工作、聊以前的事。<br>睡前阿福拍拍你的肩：「你們把家顧得很好，我放心了。」','😊 +15'],
 ['yuhao','🏀 禹豪一家',()=>{try{return FRS('yuhao').met}catch(e){return false}},'禹豪、媛媛帶著頌言來過夜。頌言在客房的床上跳來跳去，最後抱著你們家的抱枕睡著了。<br>大人們在客廳聊到半夜，禹豪說：「以後頌言長大，也要讓他住這間！」','😊 +12　💞 禹豪 +6'],
 ['yjmom','💗 家宜的媽媽（從澳門來）',()=>yjS().wed&&!!giftSeason(),'過節了，家宜的媽媽從澳門飛來住幾天。<br>一進門就開始唸：「你們冰箱怎麼都是冷凍食品？」家宜馬上回嘴：「媽～你一來就碎碎念！」<br>母女倆從廚房鬥嘴到客廳，但晚餐桌上，岳母一直往家宜碗裡夾菜。<br>臨走前，她偷偷跟你說：「她脾氣硬，要多讓她一點喔。」','😊 +12　💞 家宜 +6'],
 ['ding','👴👵 丁爺爺、丁奶奶',()=>st.ding&&st.ding.v>0,'丁爺爺、丁奶奶難得留下來過夜。丁奶奶說：「睡在老房子裡，好像又回到三十年前。」<br>隔天一早，丁爺爺已經在頂樓幫你修剪菜園了。','😊 +12'],
 ['yilun','⛪ 以倫牧師一家',()=>{try{return FRS('yilun').met}catch(e){return false}},'以倫牧師和惠菁來家裡住一晚。睡前大家一起在和室禱告，以倫牧師為這個家祝福。<br>隔天早上，惠菁送了一個木頭十字架：「掛在客廳吧，願這個家常常有平安。」<br>✝️ 客廳牆上多了十字架裝飾','😊 +10　🧠 +2　💞 以倫 +5']];
function guestMenu(g0){const F=f5S();
 if(F.guest<1)return openDlg('🛏️ 客房','空空的客房，只有一張舊床。<br>如果整理成<b>溫馨客房</b>，就能邀請家人朋友來家裡住。',[['🏗️ 改造成溫馨客房（💰15,000）','新床組、衣櫃、小夜燈・可以邀請家人朋友來過夜',()=>{payOut(15000);F.guest=1;hud();SVDIRTY=1;closeDlg();openDlg('🎉 溫馨客房完成！','新的床組鋪得平平整整，床頭放了一盞暖黃色的小夜燈。<br>家宜：「這樣以後爸爸、媽媽來就有地方住了！」',[['好！','',closeDlg]])},funds()<15000],['🛏️ 躺一下','',()=>{closeDlg();g0&&g0()}],['離開','',closeDlg]]);
 const W=wkN(),o=GUESTS.filter(q=>q[2]()).map(q=>{const last=F.gst[q[0]];const cd=last!=null&&W-last<8;return[`🏠 邀請${q[1].replace(/^\S+\s/,'')}來過夜`,cd?'兩個月邀請一次，最近才來過':'會花一個晚上',()=>{F.gst[q[0]]=W;advance(3);const fx={j:q[0]=='afu'?15:12};if(q[0]=='yilun')fx.w=2;fxApply(fx);try{if(q[0]=='yuhao')frAdd('yuhao',6,1);if(q[0]=='yjmom')frAdd('yijia',6,1);if(q[0]=='yilun'){frAdd('yilun',5,1);F.cross=1;homeCross()}}catch(e){}hud();SVDIRTY=1;closeDlg();
  try{feedPost('🏠 '+q[1].replace(/^\S+\s/,'')+'來家裡過夜','溫馨客房終於派上用場了！',null)}catch(e){}openDlg('🏠 '+q[1],q[3]+'<br><br>'+q[4],[['好溫暖','',closeDlg]])},cd]});
 openDlg('🛏️ 溫馨客房','乾淨的床組、暖黃的小夜燈。家人朋友隨時都可以來住。',o.concat([['🛏️ 躺一下','',()=>{closeDlg();g0&&g0()}],['離開','',closeDlg]]))}

// 以倫牧師一家來住之後：客廳的十字架
function homeCross(){const R=IN['家'];if(!R||!f5S().cross||R.fur.some(f=>f[5]=='iv_h_cross'))return;R.fur.push(['uaf',120,18,14,4,'iv_h_cross',0,{hm:99,z:1}]);try{gzRoomRefresh('家')}catch(e){}}
{const _sl=svLoad;svLoad=function(){const r=_sl.apply(this,arguments);try{homeCross()}catch(e){}return r}}
{const _ha=homeApply;homeApply=function(){const r=_ha.apply(this,arguments);try{homeCross()}catch(e){}return r}}
