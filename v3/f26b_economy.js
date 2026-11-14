// ===== v6.1 經濟調整：週末兼差、南部物價、女主角家宜 =====
// ---- 物價（比照台灣南部） ----
Object.assign(PR,{food:150,rose:60,deco:300,tonic:150,med:120,book:350,drink:30,protein:60,lunch:100,popcorn:90,glove:1200,bagup:800,coffee:70,bread:45,cake:90,fish:200,prawn:350,egg:65,wool:150,milk:90,honey:300,cheese:180,souvenir:200,amulet:100});
// 賣出價約為售價的四成
for(const k in PR)if(IT[k]&&IT[k].u!=='equip')IT[k].p=Math.max(5,Math.round(PR[k]*.4/5)*5);
Object.assign(IT.pumpkin,{p:60});Object.assign(IT.tomato,{p:25});

// ---- 週末兼差（取代職涯／晉升） ----
// i 對應 PA 索引；null = 不提供兼差
const PJ={0:['餐廳外場',250,'端盤子、收桌，假日人潮多'],2:['健身房器材整理',300,'搬槓片、擦器材，很耗體力'],3:['機車行幫忙',300,'換輪胎、搬零件，滿手機油'],
 4:['書局店員',200,'整理書架、結帳，算輕鬆'],5:['診所櫃台',250,'掛號、叫號，要很有耐心'],6:['電影院驗票',200,'驗票、清場，算輕鬆'],7:['賣場理貨',250,'補貨上架、搬箱子'],
 8:['旅館房務',250,'換床單、打掃房間'],9:['農場幫忙',300,'下田除草、搬運，風吹日曬'],10:['小吃攤幫忙',250,'顧攤、洗碗，熱到流汗'],
 12:['銀行臨櫃引導',250,'協助抽號、引導客人'],13:['課輔老師',250,'陪孩子寫功課'],14:['洗頭助理',250,'幫客人洗頭、掃地']};
const pjLeft=()=>{const d=dow();const ahead=d==4?3:d==5?2:d==6?1:0;return Math.max(0,ahead*24+7-T.hour)};
const pjNeed=i=>{const k='pj'+i+'_'+T.year+'_'+T.day;if(st.pjAsk==null||st.pjAskK!==k){st.pjAskK=k;let h=0;for(const c of k)h=(h*31+c.charCodeAt(0))>>>0;st.pjAsk=(h%4)==0}return st.pjAsk};
function career(i){const j=PJ[i];if(!j)return openDlg('💼 兼差','這裡沒有開放兼差喔。',[['返回','',cancel]],true);
 const [nm,w,desc]=j,pay=w*4,need=pjNeed(i),bonus=need?200:0,sc=w>=300?30:w>=250?22:15,left=Math.floor(pjLeft());
 let d=`<b>${nm}</b>　時薪 💰${w}　一次 4 小時（💰${pay}${bonus?` ＋店家謝禮 💰${bonus}`:''}）<br><span class="text-[12px]">${desc}</span>`;
 d+=need?'<br>🙏 老闆：「今天真的忙不過來，可以來幫個忙嗎？」':'';
 d+=`<br><br>⏳ 這個週末還剩約 <b>${left}</b> 小時。<br><span class="text-[12px] opacity-80">兼差會吃掉寶貴的週末——除非真的很缺錢或店裡需要幫忙，不然把時間留給家人、朋友，或做些更有意義的事吧。</span>`;
 const o=[[`做 4 小時兼差（💰${pay+bonus}）`,`⚡-${sc}　時間 +4 小時`,()=>{const m=pay+bonus;st.money+=m;st.earned=(st.earned||0)+m;fxApply({s:-sc,r:need?2:0});st.cnt&&(st.cnt.shift=(st.cnt.shift||0)+1);advance(4);hud();closeDlg();toast(`💰+${m}　辛苦了！${need?'老闆很感謝你。':''}`)},st.sta<sc||left<5],
  ['還是算了，去陪陪重要的人','',()=>{closeDlg();toast('嗯，週末時間很珍貴。')}]];
 o.push(['返回','',cancel]);openDlg('💼 週末兼差',d,o,true)}
window.career=career;
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){if(Array.isArray(opts)){opts=opts.filter(o=>{if(!o||typeof o[0]!='string')return true;const m=o[0].match(/^💼 (.+?)・/);if(!m||!/晉升|職涯|應徵/.test(o[0]+(o[1]||'')))return true;const i=PA.findIndex(a=>a.n==m[1]||m[1].startsWith(a.n));const j=PJ[i];if(!j)return false;o[0]='💼 週末兼差・'+j[0];o[1]=`4 小時・時薪 💰${j[1]}`;return true})}return _od(t,d,opts,sub,mode)}}

// ---- 女主角：劉家宜 ----
Object.assign(Q[2],{g:'劉家宜',t:'贏得家宜的心（花園廣場告白）',pr:()=>st.partner=='劉家宜'?1:Math.min(.99,((typeof FRS=='function'?FRS('yijia').pt:0)||0)/100),pt:()=>st.partner=='劉家宜'?'💍 已成為伴侶':`家宜好感 ${(typeof FRS=='function'?FRS('yijia').pt:0)||0}/100`});
QI&&(QI[2]='（和家宜慢慢熟起來吧）');
{const x=NP.find(n=>n.n=='小花');if(x)delete x.q}
function romance(n){openDlg('💬 '+n.n,say(n),[['離開','',closeDlg]])}
{const _t=toast;toast=function(m){if(typeof m=='string')m=m.replace('（去找小花吧！）','（家宜答應你了 💗）');return _t(m)}}
setInterval(()=>{if(typeof st=='undefined')return;if(Q[2].s==0)Q[2].s=1;if(st.cp!=null&&st.cp>=0){st.cp=-1;st.ct=0}},1500);
