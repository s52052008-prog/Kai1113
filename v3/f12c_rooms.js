/* ===== v3：新室內場景（寵物店・服飾店・遊藝場・教堂）===== */
const ppA=(t,x,y,name,o)=>pp(name||PETS[t]&&PETS[t].n||'寵物',x,y,'#fff','#222','牠好可愛。',{pk:t,t:PETS[t]?PETS[t].t:t,c:PETS[t]?PETS[t].c:'#c9a06a',pat:PETS[t]&&PETS[t].pat,w:12,h:8,dir:3,...o});
const rep3=(fn,n)=>Array.from({length:n},(_,i)=>fn(i));
const WALKW=(x0,x1)=>({wk:[x0,x1]});
// ─ 寵物店 ─
def('寵物店',{W:360,H:224,f:'#fbe6d0',g:'#f6d8bc',fl:'tile',w:'#ff8a5a',title:'🐾 毛孩樂園',
 fur:[['cage',22,34,66,38,'#e8b878','法鬥區'],['cage',96,34,66,38,'#f0d890','貓咪區'],['cage',170,34,50,38,'#d8c8a0','兔兔區'],['tank',230,32,56,34],['perch',298,32,22,50],['cage',326,34,28,38,'#e8c898','倉鼠'],
  ['gshelf',22,100,90,40],['gshelf',22,146,90,40],['petbed',130,106,38,18,'#e07a9a'],['petbed',176,106,38,18,'#5a9ae0'],['rug',128,136,100,40,'#e8a07a'],['counter',240,150,100,24,'#a8683a'],['plant',326,100,16,26],['plant',16,196,16,26],['gshelf',130,40,0,0]],
 ppl:[ppA('frenchie',38,48,'小鬥',{r:[26,50,56,16],mode:'h',sp:10,dir:3}),ppA('frenchie_g',60,50,'阿灰',{r:[26,50,56,16],mode:'h',sp:8,dir:2}),ppA('cat_o',112,50,'橘子',{r:[100,50,56,16],mode:'h',sp:8}),ppA('cat_g',136,52,'英英',{r:[100,50,56,16],mode:'h',sp:8,dir:2}),ppA('rabbit',184,54,'垂垂',{r:[174,50,40,16],mode:'h',sp:9}),ppA('turtle',246,56,'龜龜',{r:[236,52,40,10],mode:'h',sp:5}),ppA('parrot',300,42,'金剛',{still:1,dir:2}),ppA('hamster',336,52,'球球',{r:[330,50,16,12],mode:'a',sp:12}),ppA('callduck',150,150,'小白鴨',{r:[130,142,90,26],mode:'a',sp:12}),ppA('shiba',190,130,'柴柴',{r:[130,116,90,40],mode:'a',sp:14}),
  pp('店員 小美',270,128,'#ff8a5a','#6b3a1a','歡迎來到毛孩樂園！|認養前記得想清楚，牠們會陪你很多年喔。',{ou:'a',fm:1,hs:'p',dir:0}),pp('顧客',80,200,'#e0679a','#222','我在看哪一隻最可愛……全部都想帶回家。',{dir:1,wk:[40,120]}),pp('小朋友',160,176,'#f0b030','#222','媽媽！我想養鸚鵡！',{lk:GL('kid',91),dir:0,wk:[130,240]})],
 sp:[['shop',240,176,100,12]],spf:{shop:()=>mainMenu('寵物店')},title2:1});
SP['寵物店']=()=>[['🐾 認養寵物','法鬥、柴犬、貓、兔、龜、鸚鵡、柯爾鴨……',()=>petShop()],['🐾 我的寵物','餵食、玩耍、換名字',()=>petMenu()]];
SHOP['寵物店']=['food'];
// ─ 服飾店 ─
def('服飾店',{W:370,H:224,f:'#f4ecf6',g:'#e8dcee',fl:'wood',w:'#8a5aa8',title:'👗 潮流服飾',
 fur:[['mirror',140,34,100,22],['clothesrack',20,40,70,48],['clothesrack',98,40,0,0],['mannequin',250,32,22,50,'#d9452f'],['mannequin',284,32,22,50,'#2f80ed'],['mannequin',318,32,22,50,'#38b36a'],['clothesrack',22,110,70,48],['clothesrack',100,110,70,48],['shoeshelf',200,106,100,42],['fit',310,104,36,46],['rug',130,170,110,38,'#c8a8e0'],['counter',250,170,100,24,'#8a5aa8'],['plant',16,186,16,26],['clock',116,32,16,16]],
 ppl:[pp('店員 莉莉',270,150,'#8a5aa8','#6b3a1a','歡迎光臨！新品都在這邊。|熱血學蘭外套要去遊藝場兌換喔！',{ou:'v',fm:1,hs:'p',dir:0}),pp('顧客',170,90,'#e0679a','#222','這件好看嗎？',{lk:GL('default',92),dir:0,pose:'wave'}),pp('顧客',60,140,'#2f80ed','#222','我在找牛仔褲。',{lk:GL('student',93),dir:1}),pp('顧客',220,160,'#f0b030','#222','這雙球鞋太帥了。',{lk:GL('jogger',94),dir:0,wk:[150,230]})],
 sp:[['shop',250,194,100,12],['fitrm',140,80,100,16]],spf:{shop:()=>mainMenu('服飾店'),fitrm:()=>openEquip()},spl:{shop:'購買',fitrm:'試衣鏡'}});
SP['服飾店']=()=>clothesShop().concat([['🪞 試穿／更換裝備','',()=>openEquip()]]);
// ─ 遊藝場 ─
const TIXPR={jordan:480,gakuran:300,gak_pants:200,phones:150,topx:120,plush:60,candy:12,glove_g:160};
IT.topx={n:'改造戰鬥陀螺',i:'🌀',p:60,d:'持有時，戰鬥陀螺對戰的耐力與攻擊提升（自動生效）',u:'keep'};
IT.plush={n:'大熊娃娃',i:'🧸',p:30,d:'可愛的娃娃。使用：😊+15',u:{j:15}};IT.candy={n:'彩虹棒棒糖',i:'🍭',p:4,d:'😊+4',u:{j:4}};
function prizeShop(){const ks=['jordan','gakuran','gak_pants','phones','topx','plush','candy'];
 const o=ks.map(k=>[`${IT[k].i} ${IT[k].n}　🎟️${TIXPR[k]}`,IT[k].d,()=>{if(st.tix<TIXPR[k])return;if(!addItem(k,1))return;st.tix-=TIXPR[k];hud();toast('🎁 兌換成功：'+IT[k].n);prizeShop()},st.tix<TIXPR[k]]);
 o.push(['離開','',closeDlg]);openDlg('🎁 兌換獎品',`🎟️ 彩票：${st.tix}　🪙 遊戲幣：${st.coin}<br><span class="opacity-70">玩彈珠台、戰鬥陀螺、卡丁車賽賺取彩票。</span>`,o)}
function coinShop(){const o=[[`🪙 兌換 10 枚（💰100）`,'',()=>{st.money-=100;st.coin+=10;hud();coinShop()},st.money<100],[`🪙 兌換 30 枚（💰250）`,'送 5 枚',()=>{st.money-=250;st.coin+=35;hud();coinShop()},st.money<250],['離開','',closeDlg]];
 openDlg('🪙 遊戲幣兌換機',`💰${st.money}　🪙${st.coin}　🎟️${st.tix}`,o)}
function arcadeMenu(){const o=[['🎰 彈珠台（投幣・倍率加成）','先投幣、轉倍率，得分＝洞口×倍率',()=>playGame('pachi'),st.coin<1],['🌀 戰鬥陀螺 X 專區','正規賽需登錄 3 顆陀螺・可組裝／購買零件',()=>beyHub()],['🏎️ 歡樂卡丁車 GP（🪙3）','三圈競速，名次越前彩票越多',()=>playGame('kart'),st.coin<3],['🪙 兌換遊戲幣','',()=>coinShop()],['🎁 兌換獎品','',()=>prizeShop()],['離開','',closeDlg]];
 openDlg('🕹️ 電玩遊藝場',`🪙 遊戲幣：${st.coin}　🎟️ 彩票：${st.tix}`,o)}
def('遊藝場',{W:480,H:290,f:'#2a2040',g:'#241a38',fl:'carpet',w:'#1c1233',title:'🕹️ 電玩遊藝場',
 pre:(x,W,H)=>{for(let i=0;i<W;i+=22){R(x,i,3,12,5,['#ff4aa0','#42d6ff','#ffd84a','#6aff6a'][(i/22|0)%4])}},
 fur:[['neon',150,6,180,20,'#ff4aa0','電玩遊藝場'],['pachi',22,40,40,60],['pachi',68,40,40,60],['pachi',114,40,40,60],['pachi',160,40,40,60],['acab',230,40,32,48,'#42d6ff','FIGHT'],['acab',268,40,32,48,'#ffd84a','SHOOT'],['acab',306,40,32,48,'#6aff6a','DANCE'],['crane',360,38,34,54],['crane',400,38,34,54],['ksim',30,138,44,64],['ksim',84,138,44,64],['ksim',138,138,44,64],['arena',250,140,62,48],['arena',324,140,62,48],['coinm',410,140,28,42],['prizes',300,214,110,56],['counter',230,230,60,22,'#4a2a6a'],['acab',20,222,32,48,'#ff4aa0','RACE'],['acab',58,222,32,48,'#42d6ff','PUZZLE'],['plant',450,230,16,24],['rug',130,222,80,36,'#3a2a6a']],
 ppl:[pp('店員 阿哲',262,206,'#ff4aa0','#222','兌換獎品找我！|累積彩票可以換飛人氣墊跑鞋喔。',{ou:'v',hs:'h',dir:0}),pp('少年',40,100,'#2f80ed','#222','好球！再一顆就大獎！',{lk:GL('student',101),dir:1,pose:'wave'}),pp('少年',90,100,'#e0443a','#222','這台出珠超快。',{lk:GL('student',102),dir:1}),pp('少女',132,100,'#f08cb6','#222','我的珠子都沒有進……',{lk:GL('student',103),dir:1}),
  pp('小朋友',270,198,'#f2c230','#222','我的陀螺最強！',{lk:GL('kid',104),dir:3,pose:'spin',still:1}),pp('小朋友',304,198,'#2a9d5c','#222','來比比看！',{lk:GL('kid',105),dir:2,pose:'spin',still:1,ph0:1.4}),pp('小朋友',346,198,'#e0679a','#222','加油加油～',{lk:GL('kid',106),dir:2,pose:'wave'}),
  pp('少年',50,214,'#222','#222','我在開卡丁車，不要吵我。',{lk:GL('student',107),dir:1,sit:1,pose:'wave',still:1}),pp('少年',104,214,'#8a5aa8','#222','第一名一定是我。',{lk:GL('jogger',108),dir:1,sit:1,still:1}),pp('少女',376,114,'#ff4aa0','#222','夾娃娃好難……',{lk:GL('default',109),dir:1,still:1}),pp('玩家',250,98,'#42d6ff','#222','（猛按按鈕）',{lk:GL('student',110),dir:1,still:1,pose:'wave'})],
 sp:[['coin',404,184,40,12],['pachi',22,100,150,12],['kart',30,202,140,12],['bey',250,188,140,12],['prize',300,200,110,12]],
 spf:{coin:()=>coinShop(),pachi:()=>arcadeMenu(),kart:()=>arcadeMenu(),bey:()=>arcadeMenu(),prize:()=>prizeShop()},spl:{coin:'換幣機',pachi:'彈珠台',kart:'卡丁車',bey:'陀螺台',prize:'兌獎櫃台'}});
SP['遊藝場']=()=>[['🕹️ 玩遊戲','彈珠台・戰鬥陀螺・卡丁車',()=>arcadeMenu()],['🎁 兌換獎品','',()=>prizeShop()],['🪙 兌換遊戲幣','',()=>coinShop()]];
// ─ 教堂（依星期與時間變化）─
const CHM=()=>{const d=dow(),h=T.hour;return d==6&&h>=8.5&&h<12.5?'sun':d==2&&h>=18.5&&h<21.5?'wed':d==5&&h>=12&&h<14?'guitar':d==5&&h>=14&&h<17.5?'sat':'idle'};
const CHN=b=>{const m=CHM();return '本週聚會：週日 09:00 主日崇拜・週三 19:00 小組聚會・週六 12:00 吉他班・週六 14:00 學生團契<br>'+({sun:'🔔 主日崇拜進行中',wed:'🔔 小組聚會進行中',guitar:'🎸 吉他班進行中（黃以倫牧師）',sat:'🔔 學生團契進行中',idle:'目前沒有聚會，歡迎安靜禱告'})[m]};
const SERM=[
 {t:'愛的真諦',v:'哥林多前書 13:4',q:'「愛是恆久忍耐，又有恩慈。」',L:['愛不是一時的衝動，是日復一日的陪伴。','對身邊的人多一點耐心，就是愛的開始。','恩慈，是在別人跌倒的時候先伸出手。','願我們的小鎮因為愛而更溫暖。']},
 {t:'安息與重擔',v:'馬太福音 11:28',q:'「凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。」',L:['每個人心裡都有放不下的重擔。','休息不是偷懶，是為了走更長遠的路。','把憂慮交託出去，肩膀就輕了。','今天，讓自己安靜一下吧。']},
 {t:'信靠與智慧',v:'箴言 3:5',q:'「你要專心仰賴耶和華，不可倚靠自己的聰明。」',L:['聰明能解決問題，卻不能擔保結果。','在未知的路口，學習謙卑與等待。','好的決定，常常來自願意聆聽。','一步一步，不必看清全部的路。']},
 {t:'凡事感謝',v:'腓立比書 4:6',q:'「應當一無掛慮，只要凡事藉著禱告、祈求和感謝，將你們所要的告訴神。」',L:['焦慮是想像未來的壞劇本。','感謝，是把眼光從缺乏轉向擁有。','每天寫下三件值得感謝的事。','把需要說出口，也把感謝說出口。']},
 {t:'彼此相愛',v:'約翰福音 15:12',q:'「你們要彼此相愛，像我愛你們一樣。」',L:['愛鄰舍，從隔壁的阿嬤開始。','原諒，是給別人，也是放過自己。','服事不是任務，是一種生活。','今天，你可以為誰做一件小事？']},
 {t:'喜樂的心',v:'箴言 17:22',q:'「喜樂的心乃是良藥。」',L:['笑聲，是最便宜的藥。','喜樂不是沒有煩惱，而是知道有人與你同在。','和家人一起吃頓飯，勝過許多補品。','把今天過成值得微笑的一天。']}];
const weekNo=()=>Math.floor(((T.year-1)*30+T.day-1)/7);
const curSerm=()=>SERM[weekNo()%SERM.length];
function churchSub(){const m=CHM(),h=T.hour,s=curSerm(),i=Math.floor(NOW/5200)%4,inMain=p.x<330&&p.y<250,inPrac=p.x>337&&p.y<140,inDine=p.x>403&&p.y>257;
 if(m=='sun'&&inMain){if(h<9)return '🔔 會眾陸續入座・司琴前奏…';if(h<9.8)return '🎵 敬拜讚美（會眾起立齊唱）';if(h<10.9)return `📖 講道「${s.t}」（${s.v}）：${s.L[i]}`;if(h<11.5)return '🙏 禱告・奉獻・報告事項';return '🤝 散會・會友彼此問安'}
 if(m=='wed'&&inDine)return ['🗣️ 「這週你最感恩的一件事是什麼？」','💬 「這段經文讓我想到工作上的壓力。」','🙏 組員輪流為彼此代禱…','🍪 「先吃點心，再繼續討論吧。」'][i];
 if(m=='guitar'&&inPrac)return ['🎸 以倫：「左手按穩，右手輕輕刷。」','🎸 「C 和弦先按穩，再換 G。」','🎶 「慢慢來，節奏比速度重要。」','😊 惠菁：「學長，你講太快了啦。」'][i];
 if(m=='sat'&&inDine)return ['🌀 「三、二、一，Let it rip！」','🎤 「我們下週要練一首合奏曲。」','🍪 點心時間到！','🎨 「舫慈老師，這樣畫可以嗎？」'][i];
 return ''}
const chPew=(W,rows,y0,dy,lx0,lx1,rx0,rx1)=>{const a=[];for(let r=0;r<rows;r++){a.push(['pew',lx0,y0+r*dy,lx1-lx0,12]);a.push(['pew',rx0,y0+r*dy,rx1-rx0,12])}return a};
function crowdRows(rows,y0,dy,lx0,lx1,rx0,rx1,occ,seedBase){const a=[];let k=0;for(let r=0;r<rows;r++)[[lx0,lx1],[rx0,rx1]].forEach(([x0,x1])=>{for(let x=x0+6;x<x1-10;x+=14){k++;if(((k*37+r*11+seedBase)%100)/100>occ)continue;const kind=['office','elder','student','default','kid','elder','default','office'][(k+r)%8],g=genLook(kind,seedBase+k*7+r);
   a.push(pp(g.name,x,y0+r*dy-5,'#888','#222','阿們！|牧師今天講得真好。|請安靜，崇拜進行中。',{lk:g.lk,sit:1,dir:1,pose:(k%9==0)?'pray':'',still:1,ph0:k*.7,kid:kind=='kid'}))}});return a}
function buildChurch(mode){
 if(mode=='sun'){const W=470,H=300,pews=chPew(W,6,112,30,30,196,274,440);
  const ppl=[pp('牧師 陳牧師',W/2-6,38,'#1b1b24','#c8c8c8','願平安與你同在。|歡迎你來，坐哪裡都可以。',{ou:'z',ac:'g',dir:0,pose:'chat',still:1,hs:'e',fm:0,tp:'#1b1b24'}),
   pp('司琴',150,50,'#e0679a','#6b3a1a','（彈奏中）',{lk:GL('default',121),sit:1,dir:0,still:1,pose:'chat'}),pp('鼓手',316,48,'#2f80ed','#222','（打鼓）',{lk:GL('student',122),sit:1,dir:0,still:1,pose:'wave'}),
   pp('吉他手',282,52,'#f0b030','#222','（刷弦）',{lk:GL('student',123),dir:0,pose:'guitar',still:1}),pp('敬拜主領',196,52,'#f4f4f4','#222','（領唱）',{lk:GL('default',124),dir:0,pose:'sing',still:1}),pp('詩班',218,56,'#f4f4f4','#222','♪',{lk:GL('default',125),dir:0,pose:'sing',still:1,ph0:.6}),pp('詩班',250,56,'#f4f4f4','#222','♪',{lk:GL('default',126),dir:0,pose:'sing',still:1,ph0:1.2}),
   pp('招待 李執事',204,262,'#2b3a55','#222','歡迎，請隨意入座。|奉獻袋在這邊。',{ou:'z',dir:0,still:1}),pp('招待',256,262,'#2b3a55','#222','請小聲喔，崇拜開始了。',{ou:'z',fm:1,hs:'k',dir:0,still:1}),...crowdRows(6,112,30,30,196,274,440,.74,3)];
  return{W,H,f:'#c9a878',g:'#c19f70',fl:'wood',w:'#e8e4da',title:'⛪ 城光復興堂・主日崇拜',ppl,sub:1,
   fur:[['rug',W/2-30,70,60,226,'#8a1f2a'],['mat',110,30,250,50,'#b8a078'],['cross',W/2-9,1,18,27],['glass',34,6,26,16,'#6aa8e0'],['glass',76,6,26,16,'#e87a5a'],['glass',118,6,26,16,'#5ac088'],['glass',326,6,26,16,'#5ac088'],['glass',368,6,26,16,'#e87a5a'],['glass',410,6,26,16,'#6aa8e0'],['projector',W/2+72,6,60,20,'主日崇拜','「'+curSerm().t+'」'],['pulpit',W/2-14,46,28,26],['piano',130,44,44,26],['drums',300,40,40,32],['plant',16,36,16,26],['plant',438,36,16,26],...pews,['plant',16,262,16,26],['plant',438,262,16,26]],
   sp:[['worship',204,240,64,14],['pastor',W/2-26,74,52,12]],spf:{worship:()=>churchMenu('sun'),pastor:()=>churchMenu('sun')},spl:{worship:'聆聽講道',pastor:'和牧師說話'}}}
 if(mode=='wed'){const W=320,H=220,cx=160,cy=118,rx=58,ry=34,N=9,ppl=[],fur=[['wboard',100,6,110,22,'本週經文：'+curSerm().v],['bookcase',16,30,60,44],['bookcase',244,30,60,44],['rug',90,70,140,100,'#7a8a6a'],['ctable',cx-14,cy-6,28,16],['stand',270,100,22,34],['snack',236,160,70,22],['plant',16,160,16,26],['plant',290,170,16,26],['window',30,6,0,0]];
  const faces=[0,5,3,7,1,6,2,4];
  for(let i=0;i<N;i++){const a=Math.PI/2+i/N*Math.PI*2,x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;
   if(i==0){fur.push(['chair',x-7,y-3,14,12,'#8a5a3a']);continue}
   const dx=cx-x,dy=cy-y,dr=Math.abs(dx)<14?(dy>0?0:1):Math.abs(dy)<10?(dx>0?3:2):(dy>0?(dx>0?5:4):(dx>0?7:6)),g=genLook(['office','default','student','elder','default','office','student','default'][i%8],130+i*5);
   fur.push(['chair',x-7,y-3,14,12,'#5a7a9a']);ppl.push(pp(i==3?'小組長 林姐':g.name,x-6,y-9,'#888','#222',['我覺得這句話很安慰我。|輪到你分享囉。','我這週壓力蠻大的，謝謝大家聽我說。|一起代禱好嗎？','我們一起讀這段經文吧。'][i%3],{lk:i==3?{...g.lk,ac:'g',tp:'#7a4a9e'}:g.lk,sit:1,dir:dr,pose:i%2?'chat':'',ph0:i*.9,still:1}))}
  ppl.push(pp('志工 小愛',250,140,'#e0679a','#222','點心自己拿，不要客氣！',{lk:GL('default',141),dir:2,still:1}));
  return{W,H,f:'#d9b88a',g:'#cfae7e',fl:'wood',w:'#7a8a6a',title:'👥 小組聚會室',ppl,fur,sub:1,sp:[['group',cx-18,cy+22,36,18],['snack',236,182,70,12]],spf:{group:()=>churchMenu('wed'),snack:()=>{fxApply({j:3,s:4});toast('🍪 你拿了一塊餅乾，志工笑著遞上熱茶。')}},spl:{group:'加入圍圈討論',snack:'點心'}}}
 if(mode=='sat'){const W=450,H=270,ppl=[],fur=[['projector',W/2-50,6,100,20,'青年團契','Saturday Fellowship'],['wboard',24,6,100,22,'吉他和弦：C G Am F'],['wboard',326,6,100,22,'才藝成果發表會'],['rug',20,70,170,110,'#6a7aa0'],['arena',266,110,70,52],['arena',340,110,70,52],['snack',330,214,90,24],['stand',200,72,22,34],['stand',24,150,22,34],['plant',16,226,16,26],['plant',420,226,16,26],['chair',74,92,14,12,'#c0392b'],['sofa',150,210,80,26,'#6a4a8a']];
  const tg=genLook('default',151);ppl.push(pp('吉他老師 阿杰',70,84,'#2a3a55','#222','左手按穩，右手輕輕刷。|才藝沒有天分，只有練習。',{lk:{...tg.lk,tp:'#e0e8f0',ac:'g',hs:'m',fm:0,bt:'#2a3a55'},sit:1,dir:3,pose:'guitar',still:1}));
  [[116,76],[130,94],[116,112],[100,126],[76,130]].forEach((q,i)=>{const g=genLook(['student','kid','student','student','kid'][i],160+i);fur.push(['chair',q[0]-2,q[1]+6,14,12,'#5a7a9a']);ppl.push(pp(g.name,q[0],q[1],'#888','#222',['好難，手指好痛。|我要學會一首歌！','我會彈 C 和弦了！'][i%2],{lk:g.lk,sit:1,dir:i<3?2:7,pose:'guitar',still:1,ph0:i*.5}))});
  ppl.push(pp('小朋友',250,130,'#2f80ed','#222','三、二、一，Let it rip！',{lk:GL('kid',171),dir:3,pose:'spin',still:1}),pp('小朋友',414,130,'#d9452f','#222','看我的必殺技！',{lk:GL('kid',172),dir:2,pose:'spin',still:1,ph0:1.2}));
  [[290,170],[316,172],[352,172],[380,170]].forEach((q,i)=>{const g=genLook(['kid','student','kid','student'][i],180+i);ppl.push(pp(g.name,q[0],q[1],'#888','#222','衝啊！|轉得好快！|加油加油！',{lk:g.lk,dir:i<2?5:4,pose:'wave',still:1,ph0:i*.6}))});
  ppl.push(pp('青年導師 小薇',300,190,'#e0679a','#222','大家玩得開心，也要注意安全喔。|下週一起去野餐好嗎？',{lk:{...genLook('default',191).lk,tp:'#f08cb6',hs:'p',fm:1},dir:0,still:1}),pp('學生',160,190,'#2a9d5c','#222','我們在討論下週的活動。',{lk:GL('student',192),dir:0,sit:1,pose:'chat',still:1}),pp('學生',190,190,'#e0443a','#222','要不要組個樂團？',{lk:GL('student',193),dir:0,sit:1,pose:'chat',still:1,ph0:2}));
  return{W,H,f:'#d8e0ec',g:'#ccd6e4',fl:'tile',w:'#6a7aa0',title:'🎸 學生團契',ppl,fur,sub:1,sp:[['class',44,140,100,14],['tops',264,164,150,14],['snack',320,238,100,12]],spf:{class:()=>churchMenu('sat'),tops:()=>churchMenu('sat2'),snack:()=>{fxApply({j:4,s:4});toast('🍪 你拿了一塊餅乾，孩子們開心地大叫。')}},spl:{class:'才藝教室',tops:'陀螺對戰',snack:'點心'}}}
 const W=360,H=250;return{W,H,f:'#c9a878',g:'#c19f70',fl:'wood',w:'#e8e4da',title:'⛪ 城光復興堂',
  ppl:[pp('志工 張阿姨',70,170,'#7a5a9a','#ccc','今天我負責打掃。|歡迎隨時來靜一靜。',{lk:GL('elder',201),dir:2,pose:'sweep',still:1}),pp('會友',210,128,'#888','#222','（低頭禱告）',{lk:GL('elder',202),sit:1,dir:1,pose:'pray',still:1}),pp('會友',282,158,'#888','#222','（安靜地坐著）',{lk:GL('default',203),sit:1,dir:1,pose:'pray',still:1})],
  fur:[['rug',W/2-24,68,48,170,'#8a1f2a'],['mat',100,30,160,36,'#b8a078'],['cross',W/2-9,1,18,27],['glass',30,6,26,16,'#6aa8e0'],['glass',70,6,26,16,'#e87a5a'],['glass',274,6,26,16,'#5ac088'],['glass',314,6,26,16,'#e87a5a'],['pulpit',W/2-14,44,28,22],...chPew(W,4,108,32,24,150,210,336),['plant',16,40,16,26],['plant',328,40,16,26],['board',24,170,38,24]],
  sp:[['pray',150,214,60,14]],spf:{pray:()=>churchMenu('idle')},spl:{pray:'安靜禱告'}}}
const CH={};
Object.defineProperty(IN,'城光復興堂',{get(){const m=CHM();return CH[m]||(CH[m]=buildChurch(m))},enumerable:true,configurable:true});
// ─ 教堂互動 ─
st.skill={guitar:0,sing:0,draw:0};
function churchMenu(m){const s=curSerm();
 if(m=='sun'){const h=T.hour,o=[];
  o.push(['🙏 參加主日崇拜','從現在聽到散會，😊+ 🧠+ ⭐+',()=>{const end=Math.min(12,Math.max(h+.8,11.7));advance(Math.max(.5,end-h));fxApply({j:12,w:2,r:2,s:6});st.cnt.church=(st.cnt.church||0)+1;hud();
    openDlg('⛪ 主日崇拜',`講道題目：<b>${s.t}</b>（${s.v}）<br>${s.q}<br><span class="opacity-80">${s.L.join(' ')}</span><br><br>崇拜結束，會友們彼此問安。`,[['💰 奉獻 100','⭐+3',()=>{if(st.money<100)return;st.money-=100;fxApply({r:3,j:3});hud();closeDlg();toast('🙏 感謝你的擘畫。')},st.money<100],['離開','',closeDlg]])}]);
  o.push(['💬 和牧師說話','',()=>{const n=rm.ppl.find(x=>x.fr=='yilun')||rm.ppl[0];closeDlg();frTalk(n)}]);o.push(['離開','',closeDlg]);openDlg('⛪ 主日崇拜','台上正在進行崇拜，會眾專注地聆聽。',o);return}
 if(m=='wed'){const Q=[['這週最讓你感恩的事？',[['家人的陪伴',{j:8,r:2}],['工作順利',{w:2,j:5,r:1}],['平安健康',{h:6,j:5}]]],['最近壓力的來源是什麼？',[['工作與金錢',{w:2,j:4}],['人際關係',{r:2,j:4}],['不知道未來要走哪條路',{w:3,j:3}]]],['你想為誰代禱？',[['生病的朋友',{r:3,j:5}],['鎮上的長輩們',{r:3,j:5}],['自己',{j:7}]]]];
  const q=Q[Math.floor(Math.random()*Q.length)];const o=[['🪑 加入圍圈（2 小時）','選擇你的分享',()=>{advance(2);openDlg('👥 小組討論',`組長：「${q[0]}」`,q[1].map(a=>[a[0],'',()=>{fxApply(a[1]);st.cnt.church=(st.cnt.church||0)+1;hud();closeDlg();toast('🍵 大家溫暖地回應了你。')}]),true)}],['離開','',closeDlg]];
  openDlg('👥 小組聚會',`大家圍成一圈，正在分享與討論本週經文（${s.v}）。<br>有一張空椅子，是留給你的。`,o);return}
 if(m=='sat'){const sk=st.skill,o=[
  ['🎸 跟老師學吉他（1.5 小時）',`熟練度 ${sk.guitar}/100・⚡-6 ✨+1`,()=>{sk.guitar=Math.min(100,sk.guitar+8);fxApply({s:-6,l:1,j:6});advance(1.5);hud();toast('🎸 熟練度 +8（目前 '+sk.guitar+'）');churchMenu('sat')},st.sta<6],
  ['🎤 唱歌課（1 小時）',`熟練度 ${sk.sing}/100・⚡-4 😊+`,()=>{sk.sing=Math.min(100,sk.sing+8);fxApply({s:-4,j:7});advance(1);hud();toast('🎤 歌唱熟練度 +8');churchMenu('sat')},st.sta<4],
  ['🎨 繪畫課（1 小時）',`熟練度 ${sk.draw}/100・🧠+1`,()=>{sk.draw=Math.min(100,sk.draw+8);fxApply({s:-3,w:1,j:5});advance(1);hud();toast('🎨 繪畫熟練度 +8');churchMenu('sat')},st.sta<3],
  ['離開','',closeDlg]];openDlg('🎓 才藝教室',`吉他老師阿杰：「才藝沒有天分，只有練習。」<br>吉他 ${sk.guitar}｜歌唱 ${sk.sing}｜繪畫 ${sk.draw}`,o);return}
 if(m=='sat2'){const o=[['🌀 和孩子們玩戰鬥陀螺（免費）','對戰一場',()=>beyStart('free')],['離開','',closeDlg]];openDlg('🌀 戰鬥陀螺','孩子們圍著陀螺台吶喊：「大哥哥來比一場！」',o);return}
 if(m=='idle'){openDlg('🙏 安靜禱告','教堂裡很安靜，彩繪玻璃把陽光染成了彩色。',[['安靜禱告 30 分鐘','😊+5 ⚡+3',()=>{fxApply({j:5,s:3});advance(.5);hud();closeDlg();toast('心裡平靜了許多。')}],['離開','',closeDlg]])}}
