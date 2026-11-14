/* ===== v3.3：福音堂大地圖（主堂・練團室・辦公室・櫃檯大廳・餐廳）＋ 黃以倫牧師夫婦 ===== */
FD.amp=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2.6,'rgba(0,0,0,.26)');bxx(c,x,y,w,h,'#2a2a30',3);R(c,x+2,y+2,w-4,h*.2,'#555');c.fillStyle='#161619';c.beginPath();c.arc(x+w/2,y+h*.62,Math.min(w,h)*.28,0,7);c.fill();c.fillStyle='#3a3a42';c.beginPath();c.arc(x+w/2,y+h*.62,Math.min(w,h)*.16,0,7);c.fill();R(c,x+w-8,y+3,3,2,'#e04a3a')};
RL.push([/劉家宜/,{fm:1,hs:'l',hr:'#2b1a10',tp:'#9cc4e4',bt:'#4a5a7a',ou:'t',ac:'g',sk:'#f6d9bd'}],[/黃以倫/,{fm:0,hs:'s',hr:'#1c1410',tp:'#3a4a6a',bt:'#2a2a34',ou:'z',ac:'g',bd:1}],[/RITA/,{fm:1,hs:'p',hr:'#4a2a18',tp:'#f2d070',bt:'#3a5a8a',ou:'t',sk:'#efc9a0'}],[/許惠菁/,{fm:1,hs:'b',hr:'#3a2216',tp:'#e8a0b8',bt:'#5a4a6a',ou:'d',sk:'#f6d3b0'}],[/許舫慈/,{fm:1,hs:'l',hr:'#5a3a22',tp:'#a8d8b8',bt:'#4a5a6a',ou:'t',sk:'#f2cfa8'}]);
const CW=640,CHH=440;
const cV=(x,y,h)=>['wallv',x,y,7,h],cH=(x,y,w)=>['wallh',x,y,w,7];
const chRows=(y0,n,dy,rx)=>{const a=[];for(let r=0;r<n;r++){a.push(['pew',22,y0+r*dy,106,12]);a.push(['pew',172,y0+r*dy,128,12])}return a};
function buildChurchBig(){
 const fur=[cV(330,28,42),cV(330,110,80),cV(330,230,27),cH(337,140,303),cH(4,250,136),cH(190,250,450),cV(396,257,73),cV(396,390,50),
  // 主堂
  ['rug',134,62,36,186,'#8a1f2a'],['mat',64,30,206,52,'#b8a078'],['cross',158,1,18,27],['glass',20,6,26,16,'#6aa8e0'],['glass',60,6,26,16,'#e87a5a'],['glass',100,6,26,16,'#5ac088'],['glass',210,6,26,16,'#5ac088'],['glass',250,6,26,16,'#e87a5a'],['glass',290,6,26,16,'#6aa8e0'],
  ['pulpit',148,46,28,24],['piano',28,44,44,26],...chRows(112,4,28),['plant',8,218,16,26],['plant',304,218,16,26],['board',178,32,0,0],
  // 練團室
  ['rug',352,66,160,64,'#3a4a78'],['drums',548,44,64,40],['amp',512,50,26,30],['amp',620,56,14,26],['piano',350,40,44,26],['stand',410,44,22,34],['stand',438,44,22,34],['wboard',466,4,100,22,'和弦：C　G　Am　F'],['chair',372,94,14,12,'#5a7a9a'],['chair',402,100,14,12,'#5a7a9a'],['chair',432,94,14,12,'#5a7a9a'],['chair',462,100,14,12,'#5a7a9a'],['plant',612,106,16,26],['window',350,6,0,0],
  // 辦公室
  ['sdesk',470,166,100,26],['chair',506,194,16,14,'#5a4a3a'],['bookcase',346,154,48,50],['bookcase',398,154,48,50],['sofa',350,212,80,26,'#6a4a8a'],['ctable',372,240,40,16],['cross2',590,150,18,18],['plant',606,206,16,26],['rug',460,206,100,36,'#4a6a5a'],['window',590,146,0,0],
  // 大廳
  ['rug',60,290,210,100,'#a8423a'],['counter',150,296,140,22,'#5a3a22'],['wboard',20,262,100,22,'本週聚會'],['board',304,262,0,0],['sofa',20,330,90,26,'#7a4a9e'],['ctable',34,364,64,18],['plant',340,300,16,26],['plant',8,400,16,26],['poster',304,266,22,28,'#2f80ed','週報'],['clock',130,264,14,14],['shoeshelf',340,404,50,26],
  // 餐廳
  ['kitchen',410,262,130,24],['fridge',546,258,30,46],['snack',584,266,46,26],['rtable',430,330,50,34],['rtable',540,330,50,34],['rtable',430,396,50,34],['rtable',540,396,50,34],['plant',614,406,16,26],['lantern',500,262,0,0]];
 const pre=(c,W,H)=>{const tile=(x0,y0,w,h,a,b)=>{for(let y=y0;y<y0+h;y+=12)for(let x=x0;x<x0+w;x+=12)R(c,x,y,12,12,((x-x0)/12+(y-y0)/12|0)%2?a:b)};
  R(c,4,28,326,222,'#cfae80');tile(337,28,299,112,'#4a557e','#444f78');R(c,337,147,299,103,'#c5a477');tile(4,257,392,183,'#efe6d4','#e6dbc2');tile(403,257,233,183,'#e8ecd8','#dfe5cb');
  [['主堂',167,246],['練團室',486,138],['牧師辦公室',486,248],['大廳・櫃檯',200,436],['餐廳・愛筵',520,436]].forEach(q=>txt(c,q[0],q[1],q[2],'rgba(60,30,10,.32)','bold 9px sans-serif'))};
 return{W:CW,H:CHH,f:'#c9a878',g:'#c19f70',fl:'wood',w:'#e8e4da',title:'⛪ 城光復興堂',fur,pre,ppl:[],sub:1,
  sp:[['worship',130,226,44,14],['class',352,132,160,8],['counter',150,320,140,12],['meal',412,288,134,10],['snackb',584,292,46,10],['tops',420,384,60,10],['group',520,384,60,10]],
  spf:{worship:()=>churchMenu(CHM()=='sun'?'sun':'idle'),class:()=>churchMenu('guitar'),counter:()=>churchMenu('info'),meal:()=>churchMenu('meal'),snackb:()=>{fxApply({j:3,s:4});toast('🍪 你拿了一塊餅乾。')},tops:()=>CHM()=='sat'?churchMenu('sat2'):toast('今天沒有孩子在玩陀螺（週六下午才有）'),group:()=>CHM()=='wed'?churchMenu('wed'):toast('小組聚會是週三晚上 19:00')},
  spl:{worship:'主堂・禱告／崇拜',class:'練團室・吉他',counter:'櫃檯（RITA）',meal:'餐廳取餐',snackb:'點心',tops:'陀螺對戰',group:'小組聚會'},
  onEnter:rm=>churchCast(rm)}}
function churchCast(rm){rm.ppl=rm.ppl.filter(n=>!n.dyn);const h=T.hour,m=CHM(),d=dow(),A=(n,x,y,c,L,o)=>{rm.ppl.push(pp(n,x,y,c,'#222',L,{dyn:1,still:1,...o}))};
 if(h<7.5||h>=21){toast('🌙 教堂裡沒有人，只留了一盞小燈。');return}
 // 固定：志工
 if(h<18)A('志工 張阿姨',300,350,'#7a5a9a','今天我負責打掃。|歡迎隨時來靜一靜。',{lk:GL('elder',201),dir:2,pose:'sweep'});
 const Y=(x,y,o)=>A('黃以倫',x,y,'#3a4a6a','弟兄，願平安與你同在。',{fr:'yilun',...o}),H=(x,y,o)=>A('許惠菁',x,y,'#e8a0b8','你好呀。',{fr:'huijing',...o}),F=(x,y,o)=>A('許舫慈',x,y,'#a8d8b8','嗨～',{fr:'fangci',...o}),R_=(x,y,o)=>A('RITA',x,y,'#f2d070','歡迎來到福音堂！',{fr:'rita',...o});
 if(m=='sun'){Y(150,46,{dir:0,pose:'preach'});H(188,50,{dir:2,pose:'sing'});F(54,58,{sit:1,dir:0,pose:'chat'});R_(150,262,{dir:0,pose:'wave'});
  crowdRows(4,112,28,22,128,172,300,.62,3).forEach(n=>{n.dyn=1;rm.ppl.push(n)});return}
 if(m=='guitar'){Y(428,112,{sit:1,dir:2,pose:'guitar'});H(458,118,{dir:2});F(600,80,{dir:2,pose:'sing'});R_(214,300,{dir:0});
  [[372,100],[402,106],[432,100],[462,106]].forEach((q,i)=>{const g=genLook(['student','kid','student','student'][i],160+i);rm.ppl.push(pp(g.name,q[0],q[1]-8,'#888','#222',['好難，手指好痛。|我要學會一首歌！','我會彈 C 和弦了！'][i%2],{dyn:1,lk:g.lk,sit:1,dir:i<2?3:3,pose:'guitar',still:1,ph0:i*.5}))});return}
 if(m=='sat'){Y(478,366,{dir:3});H(506,366,{dir:2});F(606,340,{dir:2});R_(430,306,{dir:0,pose:'wave'});
  [[430,368],[456,372],[560,368],[590,372]].forEach((q,i)=>{const g=genLook(['kid','student','kid','student'][i],180+i);rm.ppl.push(pp(g.name,q[0],q[1],'#888','#222','衝啊！|轉得好快！|加油加油！',{dyn:1,lk:g.lk,dir:i<2?3:2,pose:'wave',still:1,ph0:i*.6,kid:g.lk.bd==3}))});return}
 if(m=='wed'){Y(488,366,{dir:0});H(516,366,{dir:0});F(440,306,{dir:0});R_(600,306,{dir:2});return}
 // 平日／其他時段
 if(h>=12&&h<14){Y(488,366,{dir:0});H(516,366,{dir:0});F(444,306,{dir:0,pose:'chat'})}
 else if(h>=9&&h<18){Y(446,200,{dir:3,pose:'read'});H(484,208,{dir:2});F(h<14?444:150,h<14?306:340,{dir:0,pose:'chat'})}
 else if(h>=18){Y(150,200,{dir:1,pose:'pray'});H(184,200,{dir:1,pose:'pray'});F(430,306,{dir:0})}
 if(h>=8.5&&h<17.5)R_(214,304,{dir:0});else if(h<20.5)R_(80,150,{dir:2,pose:'lift'})}
(()=>{const def0=IN['城光復興堂'];let C=null;Object.defineProperty(IN,'城光復興堂',{get(){return C||(C=buildChurchBig())},enumerable:true,configurable:true})})();
// 週六中午吉他課
function churchGuitar(){const sk=st.skill,cls=CHM()=='guitar',o=[];
 if(cls)o.push(['🎸 跟以倫學長學吉他（1.5 小時）',`熟練度 ${sk.guitar}/100・⚡-6 ✨+1`,()=>{sk.guitar=Math.min(100,sk.guitar+8);fxApply({s:-6,l:1,j:6});advance(1.5);frAdd('yilun',3);frAdd('huijing',1);hud();toast('🎸 熟練度 +8（目前 '+sk.guitar+'）');churchGuitar()},st.sta<6]);
 else if(sk.guitar>0)o.push(['🎸 自己在練團室練習（1 小時）',`熟練度 ${sk.guitar}/100・⚡-5`,()=>{sk.guitar=Math.min(100,sk.guitar+3);fxApply({s:-5,j:4});advance(1);hud();toast('🎸 熟練度 +3（目前 '+sk.guitar+'）');churchGuitar()},st.sta<5]);
 o.push(['離開','',closeDlg]);openDlg('🎸 練團室',cls?'黃以倫牧師盤腿坐在椅子上，抱著吉他：「來，左手按穩，右手輕輕刷。」<br>惠菁在一旁微笑地看著他。':sk.guitar>0?'練團室裡沒有課，吉他架上的吉他任你練習。':'練團室的吉他架空著。牆上的課表寫著：<b>週六中午 12:00–14:00　吉他班（黃以倫）</b>。',o)}
const _cm0=churchMenu;churchMenu=function(m){
 if(m=='guitar')return churchGuitar();
 if(m=='info'){const o=[['📋 本週聚會時間','',()=>openDlg('📋 聚會時間','週日 09:00 主日崇拜<br>週三 19:00 小組聚會<br>週六 12:00 吉他班（練團室）<br>週六 14:00 學生團契（餐廳）<br>平日歡迎來辦公室找以倫牧師，或在主堂安靜禱告。',[['返回','',cancel]],true)],['💰 奉獻 100','⭐+3',()=>{if(st.money<100)return;st.money-=100;fxApply({r:3,j:3});hud();closeDlg();toast('🙏 RITA 說：「謝謝你，願神記念。」')},st.money<100],['離開','',closeDlg]];openDlg('🛎️ 櫃檯','RITA 微笑地說：「有什麼需要幫忙的嗎？」',o);return}
 if(m=='meal'){const sunMeal=dow()==6&&T.hour>=12&&T.hour<13.8,o=[[sunMeal?'🍲 領取愛筵（免費・0.7 小時）':'🍱 簡餐（💰80・0.5 小時）','⚡+25 😊+3',()=>{if(!sunMeal){if(st.money<80)return;st.money-=80}fxApply({s:25,j:3});advance(sunMeal?.7:.5);hud();closeDlg();toast('🍲 教會的飯菜暖暖的。')},!sunMeal&&st.money<80],['離開','',closeDlg]];openDlg('🍽️ 餐廳',sunMeal?'主日崇拜後的愛筵，大家一起用餐。':'志工阿姨在流理台忙著：「簡單吃一點吧。」',o);return}
 if(m=='sat'){const sk=st.skill,o=[
  ['🎤 唱歌課（1 小時）',`熟練度 ${sk.sing}/100・⚡-4 😊+`,()=>{sk.sing=Math.min(100,sk.sing+8);fxApply({s:-4,j:7});advance(1);frAdd('yilun',2);frAdd('fangci',2);hud();toast('🎤 歌唱熟練度 +8');churchMenu('sat')},st.sta<4],
  ['🎨 繪畫課（1 小時）',`熟練度 ${sk.draw}/100・🧠+1`,()=>{sk.draw=Math.min(100,sk.draw+8);fxApply({s:-3,w:1,j:5});advance(1);hud();toast('🎨 繪畫熟練度 +8');churchMenu('sat')},st.sta<3],
  ['離開','',closeDlg]];openDlg('🎓 才藝時間','以倫牧師抱著吉他帶大家唱歌，惠菁姊陪著小朋友，舫慈在旁邊幫孩子們調整畫具。<br>唱歌 '+sk.sing+'｜繪畫 '+sk.draw,o);return}
 return _cm0(m)};
