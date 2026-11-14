/* ===== v7.5 廟宇：搶頭香、添油香、求籤擲筊（越神秘越好，但……會帶來說不出的反效果）
   受洗之後，每次進廟前先潔淨禱告 ===== */
const QIAN=[
 ['第一籤・月沉井底','「月沉井底影猶明，風過無聲燈自傾；\n欲問前程何處去，回頭已是夢中人。」','解：所求之事，看似有光，實則映影。勿深究。'],
 ['第七籤・赤蛇銜珠','「赤蛇銜珠過三橋，橋下流水不知遙；\n珠落之時休回首，回首方知身已凋。」','解：得之於前，失之於後。慎之。'],
 ['第十三籤・空廟鳴鐘','「無人之廟夜鳴鐘，一聲一聲叩心胸；\n誰人應答誰人去，香盡燈殘始見容。」','解：有人在等你回應。……但不是神。'],
 ['第廿一籤・紙船渡海','「紙船載願渡滄溟，三更風起浪無形；\n岸上燈火千家暖，獨你一舟向北冥。」','解：所託非人，所願難成。'],
 ['第卅三籤・鏡中燭','「鏡中一燭照兩人，一人是我一非真；\n吹燭之時莫言語，鏡裡那人會轉身。」','解：今夜勿照鏡。'],
 ['第四十籤・桃花覆井','「桃花開盡覆深井，井中有月不曾醒；\n若問姻緣問井水，井水答你一聲冷。」','解：姻緣自有天定，非此處能求。'],
 ['第五十五籤・歸雁失群','「雁陣南飛失一行，蘆花深處不知霜；\n明朝若見西來客，莫把真心付遠方。」','解：近日勿借錢與人。'],
 ['第九十九籤・無字籤','（籤上一個字也沒有，只有一道淡淡的、像是指甲刮過的痕跡。）','解：……廟祝看了一眼，把籤收走，什麼也沒說。']];
const curseOf=()=>st.curse||0;
function curseAdd(n){st.curse=Math.min(9,curseOf()+n)}
function templeMenu(){const o=[],h=T.hour,dk=dKey();
 o.push(['🔥 搶頭香',h>=4&&h<6?'清晨四點到六點・今天第一炷香':'頭香要清晨 4:00–6:00 才搶得到',()=>{st.headDay=dk;advance(.5);fxApply({j:15,r:2});curseAdd(2);hud();closeDlg();
  openDlg('🔥 頭香','天還沒亮，你第一個把香插進爐裡。<br>煙卻不往上飄——它在爐口繞了三圈，慢慢地往你的方向飄過來。<br><br>廟祝打著呵欠說：「少年仔，頭香喔，好彩頭！」<br><span style="opacity:.7">（不知道為什麼，背後涼涼的。）</span>',[['……','',closeDlg]])},!(h>=4&&h<6)||st.headDay==dk]);
 o.push(['🙏 添油香錢（💰100）','廟祝會幫你點光明燈',()=>{st.money-=100;fxApply({r:2,j:4});curseAdd(1);advance(.3);hud();closeDlg();toast('🏮 光明燈亮了。燈芯卻一直微微顫抖……')},st.money<100]);
 o.push(['🎋 求籤占卜','先擲筊請示，三個聖筊才能抽籤',()=>jiaoStep(0)]);
 if(curseOf()>0)o.push(['🌫️ 最近好像怪怪的……',`（運勢 ${'▼'.repeat(Math.min(5,curseOf()))}）`,()=>openDlg('🌫️','最近總覺得不太順：東西莫名不見、夜裡做怪夢……<br>也許該去教會找以倫牧師聊聊？',[['嗯……','',closeDlg]])]);
 o.push(['離開','',closeDlg]);
 openDlg('🏮 福德宮','香煙裊裊，神像的眼睛在燭光裡好像會跟著人轉。',o)}
function jiaoStep(n){const r=Math.random(),k=r<.5?'sheng':r<.75?'xiao':'yin';const nm={sheng:'聖筊（一正一反）',xiao:'笑筊（兩個正面）',yin:'陰筊（兩個反面）'}[k];
 advance(.1);
 if(k!='sheng')return openDlg('🎋 擲筊',`啪噠——<b>${nm}</b>。<br>${k=='xiao'?'筊杯在地上轉了好久才停下來，像在笑。':'兩片筊杯同時翻面，落地的聲音比平常還重。'}<br>神明還沒答應。`,[['再擲一次','',()=>jiaoStep(0)],['不問了','',closeDlg]]);
 if(n<2)return openDlg('🎋 擲筊',`啪噠——<b>聖筊</b>！（${n+1}/3）`,[['繼續擲','',()=>jiaoStep(n+1)]]);
 const q=QIAN[Math.floor(Math.random()*QIAN.length)];curseAdd(1);fxApply({j:-2});hud();
 openDlg('🎋 '+q[0],`連續三個聖筊。你從籤筒裡搖出一支籤。<br><br><div style="text-align:center;line-height:2;font-size:15px">${q[1].replace(/\n/g,'<br>')}</div><br><span style="opacity:.8">${q[2]}</span><br><br><span style="opacity:.6;font-size:12px">（籤紙拿在手上，有一點點潮濕。）</span>`,[['收起籤詩','',closeDlg]])}
SP['廟']=()=>[['🏮 參拜','搶頭香・添油香・求籤擲筊',templeMenu]];
// 運勢下降：每個週末開始時，可能發生倒楣的事
const BAD=[['💸 錢包裡的錢莫名少了一些',()=>{const m=Math.min(st.money,300);st.money-=m;return `少了 💰${m}`}],['😵 整晚做怪夢：夢裡一直有人在廟口叫你的名字',()=>{fxApply({j:-10,s:-15});return '😊-10 ⚡-15'}],
 ['🛵 機車無緣無故爆胎',()=>{const m=Math.min(st.money,400);st.money-=m;return `修車 💰${m}`}],['🐦 走在路上被鳥屎打中',()=>{fxApply({j:-6,l:-2});return '😊-6 ✨-2'}],['🤒 突然發燒，全身發冷',()=>{fxApply({h:-12,s:-10});return '❤️-12 ⚡-10'}],['📱 手機螢幕自己裂了一條縫',()=>{const m=Math.min(st.money,500);st.money-=m;return `修手機 💰${m}`}]];
function curseEvent(){if(curseOf()<=0)return;if(Math.random()>.35+curseOf()*.08)return;const b=BAD[Math.floor(Math.random()*BAD.length)];const r=b[1]();st.curse=Math.max(0,curseOf()-1);hud();
 whenFree(()=>openDlg('🌫️ 運勢好像不太好……',b[0]+'<br><span style="opacity:.8">'+r+'</span><br><br><span style="opacity:.6;font-size:12px">（最近是不是去廟裡求了什麼？）</span>',[['唉……','',closeDlg]]))}
{const _le=lifeEvents;lifeEvents=function(){_le.apply(this,arguments);try{curseEvent()}catch(e){}}}
// 以倫牧師可以為主角禱告，斷開這些
{const _yo=ylOpts;ylOpts=function(o){try{if(curseOf()>0)o.unshift(['🙏 請以倫牧師為你禱告','最近總是不順……',()=>{st.curse=0;advance(.5);fxApply({j:15});frAdd('yilun',2);hud();closeDlg();
  openDlg('🙏 禱告','以倫牧師按著你的肩膀：「奉主耶穌的名，斷開一切不屬於神的捆綁。你是屬神的孩子，平安歸給你。」<br><br>心裡壓著的那塊石頭，好像終於被搬開了。',[['阿們','',closeDlg]])}])}catch(e){}return _yo.apply(this,arguments)}}
// 受洗之後：進廟前先潔淨禱告
{const _eb=enterB;enterB=function(z){const r=_eb.apply(this,arguments);try{if(z&&z.n=='廟'&&st.yj&&st.yj.bapt)setTimeout(()=>openDlg('🙏 潔淨禱告','進門前，你停下腳步，在心裡安靜禱告：<br><br>「主耶穌，求祢的寶血遮蓋我，保守我的心思意念。我是屬祢的，這裡的一切都不能轄制我。奉主耶穌的名，阿們。」<br><br><span style="opacity:.75">（心裡很平安。）</span>',[['阿們','',closeDlg]]),120)}catch(e){}return r}}
