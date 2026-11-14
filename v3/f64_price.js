/* v11.0 物價統一（統一度量衡）：所有能花錢的地方用同一套台灣實際物價；
   重複的舊選單（咖啡店「購買物品」、餐廳舊內用菜單）拿掉；小插曲的金額改成實際價格；回收價一律是售價的 4 成 */
// ───────── 商品定價（新台幣） ─────────
const PRICE={food:299,rose:60,deco:390,tonic:250,med:150,book:380,drink:35,protein:90,lunch:100,popcorn:120,glove:1490,bagup:890,
 coffee:120,bread:45,cake:120,fish:220,prawn:380,egg:85,wool:250,milk:95,honey:420,cheese:220,souvenir:250,amulet:100,extg:850,kit:350,
 cola:35,teaegg:13,oden:65,onigiri:35,latte:65,manju:30,onsenegg:30,ekiben:100,mtea:350,carving:280,maple:50,mushroom:120,bouquet:1200,mealprep:180};
const EQPRICE={cap_red:490,cap_blue:490,cap_black:490,bucket:590,beanie:390,straw:350,tee_white:390,tee_red:390,tee_black:390,aloha:790,hoodie_gray:990,hoodie_blue:990,sport_red:690,suit_navy:3990,
 jeans:1290,black_pants:990,khaki:990,shorts:590,sweat:790,canvas:1290,leather:2490,boots:2990,runner:2590,glasses:1490,shades:990,headband:150,backpack:1290,mask:10};
Object.entries(PRICE).forEach(([k,p])=>{PR[k]=p;if(IT[k]&&IT[k].u!='equip')IT[k].p=Math.max(1,Math.round(p*.4))});
Object.entries(EQPRICE).forEach(([k,p])=>{if(EQ[k]){EQ[k].p=p;PR[k]=p;if(IT[k])IT[k].p=Math.round(p*.4)}});
if(IT.mtea)IT.mtea.n='高山茶葉（一兩）';
// 店家：同一個東西只在一個地方賣、只有一個價格
if(SHOP['家樂福'])SHOP['家樂福']=SHOP['家樂福'].filter(k=>k!='durian');  // 榴槤統一在「大份量熟食・進口酒」賣 1280
delete SHOP['咖啡店'];                                                   // 咖啡店改用看圖點餐
delete SHOP['餐廳'];                                                     // 海鮮燒烤店不賣便當，改用看圖點餐
// 餐廳舊的「內用」選項拿掉（看圖點餐已經有烤蚵、花蟹、肉串、魷魚），冰啤酒保留
wrapSP('餐廳',o=>{for(let i=o.length-1;i>=0;i--)if(typeof o[i][0]=='string'&&o[i][0].includes('內用：'))o.splice(i,1)});
// ───────── 小插曲：金額改成實際價格 ─────────
const EVM={'誠心祈福':-100,'隨喜捐香油錢':-300,'協助交通導引':0,'做全套健檢':-2500,'買感冒藥':-150,'品嚐單品':-180,'幫忙洗杯子':300,'買本專業書':-380,'住一晚休息':-1800,
 '認真打工':600,'加入一起吃':-250,'自己點一份':-150,'買健身補給':-500,'買新衣服':-990,'幫忙換輪胎':500,'試乘看看':-200,'剪個新髮型':-250,'試試染髮':-1500,'吃碗牛肉麵':-150,'幫忙擺攤':400,'買個紀念品':-250};
const niceN=v=>{const a=Math.abs(v);const r=a<100?10:a<1000?50:100;return Math.sign(v)*Math.max(r,Math.round(a/r)*r)};
for(const b in E)(E[b]||[]).forEach(ev=>(ev.o||[]).forEach(q=>{const fx=q[1];if(!fx||fx.m==null)return;if(fx._mx)return;fx._mx=1;
 if(EVM[q[0]]!=null){fx.m=EVM[q[0]];if(!fx.m)delete fx.m}else fx.m=niceN(fx.m*(fx.m<0?10:12))}));
// ───────── 物價表（手機可以查） ─────────
function priceBook(){const L=[['🍱 吃的',['lunch','onigiri','teaegg','oden','bread','coffee','latte','cake','cola','drink']],['💊 生活',['med','tonic','kit','extg','amulet','book','food','deco']],['💪 健身',['protein','mealprep','glove']],['🎁 送禮',['rose','bouquet','honey','mtea']]];
 openDlg('🧾 小鎮物價表','同一樣東西，在哪裡買都是同一個價錢。賣回給店家是售價的 4 成。<br><br>'+L.map(([t,ks])=>'<b>'+t+'</b><br>'+ks.filter(k=>IT[k]).map(k=>`${IT[k].i} ${IT[k].n} 💰${PR[k]}`).join('　')).join('<br><br>')+
  '<br><br><b>🕐 打工時薪</b><br>週末兼差 💰200～300／小時（依工作內容）<br><br><b>🚌 交通</b><br>客運到白沙灣 💰420・渡輪 💰230・知本火車 💰480',[['返回','',phoneHome]])}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i<0?opts.length:i,0,['🧾 小鎮物價表','每樣東西多少錢',priceBook,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
