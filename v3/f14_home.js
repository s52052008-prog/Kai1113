/* ===== v3.2：家（分區大屋）＋房東太太收租 ===== */
FD.wallh=(c,x,y,w,h)=>{R(c,x,y+h,w,3,'rgba(0,0,0,.32)');GR(c,x,y,w,h,'#efe4cc','#cdbf9e');R(c,x,y,w,1.2,'#fff8e8');R(c,x,y+h-2,w,2,'#8a6a42')};
FD.wallv=(c,x,y,w,h)=>{R(c,x+w,y+2,3,h,'rgba(0,0,0,.28)');GR(c,x,y,w,h,'#efe4cc','#cdbf9e');R(c,x,y,1.2,h,'#fff8e8');R(c,x+w-1.6,y,1.6,h,'#8a6a42')};
FD.toilet=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2.4,'rgba(0,0,0,.22)');RR(c,x+3,y,w-6,h*.4,2,'#f4f6f8');R(c,x+5,y+2,w-10,1.6,'#c8d0d4');RR(c,x+1,y+h*.35,w-2,h*.6,w/2.4,'#f8fafb');R(c,x+4,y+h*.45,w-8,h*.38,'#dfe8ec');R(c,x+w/2-1.2,y-1.4,2.4,2,'#9aa4aa')};
FD.basin=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2.4,'rgba(0,0,0,.22)');bxx(c,x,y+6,w,h-6,'#c9b48a',4);RR(c,x+3,y+2,w-6,h*.5,5,'#f4f6f8');R(c,x+5,y+4,w-10,h*.3,'#cfe6f2');R(c,x+w/2-1,y-4,2,6,'#9aa4aa');R(c,x+w/2-4,y-5,8,1.4,'#9aa4aa')};
FD.tub=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,3,'rgba(0,0,0,.24)');RR(c,x,y,w,h,6,'#f8fafb');RR(c,x+3,y+3,w-6,h-8,5,'#bfe3f2');c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.ellipse(x+w*.3,y+h*.4,w*.12,3,0,0,7);c.fill();R(c,x+w-8,y-3,2,5,'#9aa4aa');R(c,x+w-12,y-4,8,1.4,'#9aa4aa');R(c,x+4,y+h-6,w-8,1,'rgba(0,0,0,.1)')};
FD.washer=(c,x,y,w,h)=>{R(c,x+1,y+h,w,2.4,'rgba(0,0,0,.25)');bxx(c,x,y,w,h,'#eef0f2',5);c.fillStyle='#8aa0b0';c.beginPath();c.arc(x+w/2,y+h*.58,w*.3,0,7);c.fill();c.fillStyle='#b8dcee';c.beginPath();c.arc(x+w/2,y+h*.58,w*.22,0,7);c.fill();R(c,x+3,y+2,w-6,3,'#c8ccd0');R(c,x+w-9,y+3,3,1.6,'#e04a3a')};
FD.lamp=(c,x,y,w,h)=>{R(c,x+w/2-.8,y+h*.4,1.6,h*.6,'#666');c.fillStyle='#f6dc8a';c.beginPath();c.moveTo(x,y+h*.4);c.lineTo(x+w,y+h*.4);c.lineTo(x+w*.8,y);c.lineTo(x+w*.2,y);c.fill();R(c,x+2,y+h-2,w-4,2,'#555')};
FD.pcdesk=(c,x,y,w,h,f)=>{bxx(c,x,y,w,h,f[5]||'#7a5a38',5);RR(c,x+w/2-9,y-12,18,12,1.6,'#1a1a22');R(c,x+w/2-8,y-11,16,9,'#6ab0f0');R(c,x+w/2-1,y,2,2,'#444');R(c,x+w/2-8,y+3,16,3,'#ddd');R(c,x+4,y+2,6,4,'#f4efe0');R(c,x+w-12,y+1,6,5,'#c0392b')};
const HW=560,HH=364;
const hT=(x0,w)=>['wallh',x0,176,w,7],hV=(x0,y0,h)=>['wallv',x0,y0,7,h];
def('家',{W:HW,H:HH,f:'#d9b98a',g:'#cfae7e',fl:'wood',w:'#c97a5a',title:'🏠 我的小窩',
 pre:(c,W,H)=>{const tile=(x0,y0,w,h,a,b)=>{for(let y=y0;y<y0+h;y+=12)for(let x=x0;x<x0+w;x+=12)R(c,x,y,12,12,((x-x0)/12+(y-y0)/12|0)%2?a:b)};
  R(c,4,28,194,148,'#d6b080');R(c,204,28,134,148,'#9bb08a');tile(344,28,212,148,'#efe6d4','#e0d4bc');tile(384,182,172,178,'#dcecf2','#c8dde6');
  for(let x=4;x<378;x+=16)R(c,x,182,.8,178,'rgba(0,0,0,.07)');
  [['臥室',100,170],['書房',270,170],['廚房／餐廳',450,170],['客廳',190,354],['浴室',470,354]].forEach(q=>txt(c,q[0],q[1],q[2],'rgba(60,30,10,.28)','bold 9px sans-serif'))},
 fur:[hT(4,96),hT(132,118),hT(282,64),hT(378,104),hT(482,74),hV(198,28,148),hV(338,28,148),hV(378,183,79),hV(378,294,66),
  ['window',30,6,40,18],['window',236,6,44,18],['window',500,6,40,18],['clock',150,8,16,16],
  ['bed',14,36,78,50,'#3a6ab8'],['cabinet',96,40,18,24],['wardrobe',140,34,46,42],['rug',30,104,130,56,'#7a5ab8'],['lamp',118,42,12,22],['plant',172,142,16,26],
  ['pcdesk',212,52,76,26,'#7a5a38'],['chair',236,82,16,14,'#5a4a3a'],['bookcase',296,34,38,54],['globe',304,104,20,30],['rug',224,118,64,40,'#4a7a5a'],['plant',212,146,16,24],
  ['kitchen',350,34,92,26],['fridge',448,30,28,44],['cabinet',484,36,60,34],['rug',392,88,84,64,'#d8a860'],['table',404,98,60,30,'#d9a05a'],['chair',388,102,14,14,'#8a5a3a'],['chair',466,102,14,14,'#8a5a3a'],['chair',426,132,14,14,'#8a5a3a'],
  ['toilet',392,196,22,28],['basin',432,194,38,26],['tub',484,196,66,40],['mat',484,244,50,18,'#6ab0d0'],['washer',392,304,30,34],['cabinet',430,318,34,30],['plant',520,318,16,26],
  ['sofa',36,200,112,30,'#7a4a9e'],['ctable',52,244,80,26],['rug',28,236,150,76,'#b5533c'],['tv',44,318,90,16],['lamp',160,200,12,22],['bookcase',196,192,52,48],['petbed',226,280,40,18,'#e07a9a'],['shoeshelf',330,316,40,32],['mat',254,334,52,18,'#8a5a3a'],['rack',296,196,34,26]],
 ppl:[],sp:[['sleep',18,92,76,12],['mirror',92,68,40,12],['wardrobe',136,80,56,12],['study',208,86,86,12],['read',292,90,46,12],['cook',350,64,96,12],['fridge',444,76,44,12],['eat',392,148,84,12],['tv',40,298,100,14],['sofa',32,232,120,12],['toilet',388,228,34,12],['sink',428,222,44,12],['tub',484,240,66,12],['wash',388,342,36,12]],
 spl:{sleep:'床・睡覺',mirror:'整理儀容',wardrobe:'衣櫃（裝備）',study:'書桌',read:'書櫃',cook:'流理台',fridge:'冰箱',eat:'餐桌',tv:'電視',sofa:'沙發小睡',toilet:'馬桶',sink:'洗手台',tub:'浴缸淋浴',wash:'洗衣機'},
 spf:{sleep:()=>openHome(),mirror:()=>homeAct('mirror'),wardrobe:()=>openEquip(),study:()=>homeAct('study'),read:()=>homeAct('read'),cook:()=>homeAct('cook'),fridge:()=>homeAct('fridge'),eat:()=>homeAct('eat'),tv:()=>homeAct('tv'),sofa:()=>homeAct('sofa'),toilet:()=>homeAct('toilet'),sink:()=>homeAct('sink'),tub:()=>homeAct('tub'),wash:()=>homeAct('wash')},
 onEnter:rm=>{rm.ppl=rm.ppl.filter(n=>!n.hp&&!n.ll);
  st.pets.forEach((pt,i)=>{if(pt.id==st.comp)return;const sp=PETS[pt.k];rm.ppl.push(pp(pt.name,60+i*40,250,'#fff','#222','',{pk:pt.k,ptid:pt.id,t:sp.t,c:sp.c,pat:sp.pat,w:12,h:8,dir:3,r:[30,236,300,100],sp:10,hp:1,mv:false,fr:0,at:0}))});
  if(st.rent.owed>0){rm.ppl.push(pp('房東太太',HW/2-70,HH-64,'#8a5aa8','#ccc','',{rent:1,ll:1,still:1,dir:0,lk:lookFor({n:'房東太太'})}));toast('😠 房東太太站在客廳裡等你……')}}});
function homeAct(k){const O=(t,d,f,dis)=>[t,d,f,dis||0],cl=['離開','',closeDlg];let o,t,d;
 if(k=='mirror'){t='🪞 鏡子';d='鏡子裡的你看起來……還行。';o=[O('整理儀容（1 小時）','✨+5 😊+3',()=>{fxApply({l:5,j:3});advance(1);hud();closeDlg();toast('鏡子裡的你更精神了。')}),cl]}
 else if(k=='study'){t='💻 書桌';d='桌上有電腦和幾本筆記。';o=[O('📖 自修讀書（2 小時）','🧠+3 ⚡-8',()=>{fxApply({w:3,s:-8});advance(2);hud();closeDlg();toast('讀完一個章節，腦袋充實了。')},st.sta<8),O('💻 線上接案（3 小時）','💰+45 ⚡-14 🧠+1',()=>{fxApply({m:45,s:-14,w:1});advance(3);hud();closeDlg();toast('完成一件小案子，賺了點外快。')},st.sta<14),cl]}
 else if(k=='read'){t='📚 書櫃';d='整排的舊書與雜誌。';o=[O('翻翻舊書（1 小時）','🧠+2 😊+2',()=>{fxApply({w:2,j:2});advance(1);hud();closeDlg();toast('讀到一段有趣的句子。')}),cl]}
 else if(k=='cook'){t='🍳 流理台';d='爐子乾乾淨淨，隨時能開伙。';o=[O('煮一份簡單早餐（💰-60）','⚡+25 😊+3（0.5 小時）',()=>{st.money-=60;fxApply({s:25,j:3});advance(.5);hud();closeDlg();toast('煎蛋配吐司，香噴噴。')},st.money<60),O('下廚做大餐（💰-250）','⚡+50 😊+8 ❤️+5（1.5 小時）',()=>{st.money-=250;fxApply({s:50,j:8,h:5});advance(1.5);hud();closeDlg();toast('滿桌的菜，吃得好滿足！')},st.money<250),cl]}
 else if(k=='fridge'){t='🧊 冰箱';d='冰箱裡有飲料和昨天的剩菜。';o=[O('喝杯冰飲料','⚡+6 😊+2',()=>{fxApply({s:6,j:2});advance(.1);hud();closeDlg();toast('冰涼透心！')}),cl]}
 else if(k=='eat'){t='🍽️ 餐桌';d='一個人吃飯，也要好好吃。';o=[O('吃背包裡的便當','需要便當',()=>{if(!(st.inv.lunch>0))return;st.inv.lunch--;fxApply({s:20,j:3});advance(.5);hud();closeDlg();toast('熱熱的便當最幸福。')},!(st.inv.lunch>0)),cl]}
 else if(k=='tv'){t='📺 電視';d='轉到一個正在重播的綜藝節目。';o=[O('看電視（1 小時）','😊+7 ⚡+2',()=>{fxApply({j:7,s:2});advance(1);hud();closeDlg();toast('笑到肚子痛。')}),cl]}
 else if(k=='sofa'){t='🛋️ 沙發';d='軟軟的沙發看起來很誘人。';o=[O('小睡一下（1 小時）','⚡+14 😊+2',()=>{fxApply({s:14,j:2});advance(1);hud();closeDlg();toast('睡了一個舒服的午覺。')}),cl]}
 else if(k=='toilet'){t='🚽 馬桶';d='很乾淨。';o=[O('上個廁所（10 分鐘）','😊+1',()=>{fxApply({j:1});advance(.17);hud();closeDlg();toast('身心舒暢。')}),cl]}
 else if(k=='sink'){t='🚰 洗手台';d='鏡子有點霧霧的。';o=[O('洗把臉（10 分鐘）','⚡+3 ✨+1',()=>{fxApply({s:3,l:1});advance(.17);hud();closeDlg();toast('清爽多了。')}),cl]}
 else if(k=='tub'){t='🛁 浴室';d='熱水器的聲音嗡嗡作響。';o=[O('洗個熱水澡（30 分鐘）','😊+6 ✨+2 ❤️+3',()=>{fxApply({j:6,l:2,h:3});advance(.5);hud();closeDlg();toast('洗完澡，整個人煥然一新。')}),cl]}
 else if(k=='wash'){t='🧺 洗衣機';d='今天有一籃衣服要洗。';o=[O('洗衣服（1 小時）','✨+1 😊+2',()=>{fxApply({l:1,j:2});advance(1);hud();closeDlg();toast('衣服香香的。')}),cl]}
 openDlg(t,d,o)}
// 睡覺（需繳得起房租）
function openHome(){const ow=st.rent.owed;
 const o=[['😴 好好睡一覺','⚡+70 ❤️+10，每件裝飾額外 😊+3，睡到隔天',()=>{if(st.rent.owed>=RENT*2){closeDlg();return rentTalk(null)}fxApply({s:70,h:10,j:3*st.deco+(typeof edBonus=='function'?edBonus():0)});advance(T.hour<6?6-T.hour:30-T.hour);hud();closeDlg();toast('睡飽了，新的一天開始了！')}]];
 if(st.pet)o.push([`🥫 餵寵物（飼料×${st.inv.food||0}）`,'😊+8',()=>{st.inv.food--;fxApply({j:8});hud();closeDlg();toast(st.pet+'吃得好開心！')},!(st.inv.food>0)]);
 o.push(['🛠️ 佈置家具','移動家具、添購新家具、裝飾牆面',()=>{closeDlg();DMstart()}]);o.push(['離開','',closeDlg]);openDlg('🛏️ 床',(st.deco?`家裡已佈置了 ${st.deco} 件裝飾，溫馨多了。`:'被子軟軟的，枕頭上還有太陽的味道。')+(typeof edComfort=='function'&&st.lay&&st.lay['家']?`<br><span style="font-size:12px">🏡 舒適度 ${edComfort('家')}${edBonus()?`（睡覺額外 😊+${edBonus()}）`:''}</span>`:'')+(ow>0?`<br><span style="color:#b33">⚠️ 你還欠房東 ${ow} 元房租。</span>`:'')+`<br><span style="font-size:12px;opacity:.7">${rentInfo()}</span>`,o)}
// ───────── 房東太太與房租 ─────────
const RENT=450;st.rent={owed:0,paid:-1,miss:0};
const cyc=()=>T.year*10+Math.floor((T.day-1)/10);
const rentDay=()=>T.day%10==0;
function rentInfo(){return `房租 💰${RENT}／月（每 10 天一個月，第 10、20、30 天收租）。${st.rent.paid==cyc()?'本月已繳。':rentDay()?'今天是收租日！':'下次收租日：第 '+(Math.ceil(T.day/10)*10)+' 天。'}`}
{const z=Z.find(z=>z.n=='家'),b=z.b;mkNP({n:'房東太太',rent:1,still:1,hid:true,x:z.x+z.w/2+16,y:b.bot+14,dir:0,L:['年輕人，錢要省著點花。','房租記得準時繳，我也有房貸要還啦。','屋子要常通風，不然會發霉。']})}
const LL=NP.find(n=>n.rent);
function rentTick(){if(!LL)return;const h=T.hour,show=(rentDay()&&st.rent.paid!=cyc()||st.rent.owed>0)&&h>=9&&h<21;LL.hid=!show}
function rentTalk(n){const ow=st.rent.owed,due=!ow&&rentDay()&&st.rent.paid!=cyc(),amt=ow||(due?RENT:0),o=[];
 let line;if(ow)line=`「Allen！你欠了 <b>${ow}</b> 元房租，已經 ${st.rent.miss} 次沒準時了。這次一起結清吧。」`;else if(due)line=`「今天是收租日喔，這個月房租 <b>${RENT}</b> 元。」`;else line=n?say(n):'「有事嗎？」';
 if(amt){o.push([`💴 繳清 ${amt} 元`,'',()=>{if(st.money<amt)return;st.money-=amt;st.rent.owed=0;st.rent.miss=0;st.rent.paid=cyc();fxApply({r:1});hud();closeDlg();toast('🏠 房租已繳，房東太太笑著收下了。');const ll=rm&&rm.ppl?rm.ppl.findIndex(q=>q.ll):-1;if(ll>=0)rm.ppl.splice(ll,1)},st.money<amt]);
  if(due)o.push(['🙏 拜託，晚一點再付','今天結束前沒繳，隔天會加收 10% 遲繳金並降低聲望',()=>{closeDlg();toast('房東太太皺眉：「那我晚點再來喔。」')}]);
  if(ow&&st.money>0&&st.money<amt)o.push([`💵 先還一半（${Math.floor(st.money/2)} 元）`,'',()=>{const v=Math.floor(st.money/2);st.money-=v;st.rent.owed-=v;hud();closeDlg();toast('房東太太勉強點點頭：「剩下的下次補。」')}])}
 o.push(['離開','',closeDlg]);openDlg('💬 房東太太',line+(amt?'':`<br><span style="font-size:12px;opacity:.7">${rentInfo()}</span>`),o)}
const _dt4=dayTick;dayTick=function(){_dt4();
 if(T.day%10==0&&st.rent.paid!=cyc()){const add=Math.round(RENT*(1+.1*st.rent.miss));st.rent.owed+=add;st.rent.miss++;fxApply({r:-3});toast(`🏠 房租逾期，累計欠租 ${st.rent.owed} 元`)}
 if((T.day+1)%10==0||(T.day==30))toast(`📅 明天是收租日，房租 💰${RENT}`)};
