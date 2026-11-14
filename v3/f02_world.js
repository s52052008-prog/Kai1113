/* ===== v9：城市規劃（道路網・街區・建築登記） ===== */
const SWK=28;
const HRD=[{id:'H1',y:330,h:80,l:2},{id:'H2',y:720,h:52,l:1}],VRD=[{id:'V1',x:684,w:96,l:2},{id:'V2',x:1230,w:52,l:1}];
const AL=[{x:394,y:438,w:26,h:254,v:1},{x:440,y:800,w:26,h:500,v:1},{x:0,y:1132,w:678,h:26,v:0},{x:408,y:60,w:24,h:202,v:1},{x:1657,y:96,w:26,h:166,v:1},{x:1800,y:96,w:24,h:166,v:1},{x:2040,y:100,w:26,h:162,v:1},{x:2030,y:72,w:300,h:28,v:0}];
const B=[],BD=[];
function bl(n,x,bot,w,h,st,o,arr){const b={n,x,y:bot-h,w,h,st,bot,dx:w/2,dw:22,...o};(arr||B).push(b);return b}
// 第一排（北側，門朝南，面向 H1）
bl('新興高中',440,262,200,150,'school',{c:'#dcb68c',r:'#a8452f',sg:'新興高中',hr:[7,17],dw:32});
bl('廟',1060,262,130,120,'temple',{c:'#c8372d',r:'#2f8a6a',sg:'福德宮',hr:[5,21],dw:30});
bl('派出所',1330,262,150,130,'police',{c:'#e8eef4',r:'#1f4fa3',sg:'派出所',dw:30});
bl('銀行',1510,262,140,130,'bank',{c:'#e6dcc6',r:'#8a6a3a',sg:'好運銀行',hr:[9,17],dw:26});
// 第二排（H1 與 H2 之間，門朝南，面向 H2）
bl('家',30,640,108,120,'house',{c:'#f0d9b5',r:'#b5533c',sg:'家',dw:22});
bl('全家',150,640,102,108,'conv',{c:'#f4f4ee',r:'#2a9d5c',sg:'全家',dw:30});
bl('診所',264,640,120,140,'clinic',{c:'#e8f2f4',r:'#2a8fb8',sg:'社區診所',hr:[8,21],dw:28});
bl('咖啡店',432,640,90,112,'cafe',{c:'#b87a4b',r:'#5a3a22',sg:'願你平安咖啡廳',hr:[7,22],dw:24});
bl('書局',534,640,122,132,'book',{c:'#4d6b57',r:'#2f4a3a',sg:'書局',hr:[9,22],dw:24});
bl('健身房',830,640,190,190,'gym',{c:'#2d2f36',r:'#d62828',sg:'WORLD FIT',dw:36});
bl('電影院',1040,640,156,150,'cinema',{c:'#4a3a6a',r:'#d4a017',sg:'電影院',hr:[10,24],dw:30});
bl('旅館',1326,640,140,180,'hotel',{c:'#eadcc2',r:'#7a4a9e',sg:'旅館',dw:32});
bl('餐廳',1484,640,120,122,'resto',{c:'#e9c58a',r:'#b5322a',sg:'阿香炭烤',hr:[11,24],dw:28});
// 東區延伸（消防、教堂、遊藝場、寵物店、服飾店）
bl('消防局',1830,262,200,150,'fire',{c:'#e8d8d0',r:'#c0272d',sg:'消防局',dw:60});
bl('城光復興堂',2070,262,250,196,'church',{c:'#ece6da',r:'#4a5a78',sg:'城光復興堂',dw:34});
bl('遊藝場',1830,640,200,150,'arcade',{c:'#2a1f4a',r:'#ff4aa0',sg:'電玩遊藝場',dw:36});
bl('寵物店',2050,640,124,112,'pet',{c:'#fbe6c8',r:'#ff8a5a',sg:'毛孩樂園',hr:[9,21],dw:26});
bl('服飾店',2194,640,136,124,'clothes',{c:'#f1e8f4',r:'#8a5aa8',sg:'潮流服飾',hr:[10,22],dw:28});
// 第三排（H2 以南，門朝南）
bl('家樂福',30,990,220,160,'market',{c:'#f2f0e6',r:'#2d6cdf',sg:'家樂福',hr:[8,23],dw:40});
bl('機車行',290,990,120,112,'garage',{c:'#c9c4b6',r:'#f0b030',sg:'阿財機車行',hr:[8,20],dw:34});
bl('美髮',490,990,110,104,'salon',{c:'#f8e4ea',r:'#e0679a',sg:'美髮沙龍',hr:[10,21],dw:24});
// 夜市與農場
bl('路邊攤',900,904,100,64,'stall',{c:'#b07a45',r:'#d9452f',sg:'路邊攤',hr:[16,24],dw:34});
bl('禮品屋',1570,938,160,112,'barn',{c:'#b5432f',r:'#6b3a22',sg:'農場禮品屋',hr:[9,18],dw:32});
// 不可進入的住宅大樓
[['鹽酥雞',820,904,70,'sfry','鹽酥雞'],['臭豆腐',1010,904,90,'stofu','臭豆腐'],['珍珠奶茶',1110,904,82,'sbbt','珍珠奶茶'],['牛排',830,1010,90,'ssteak','牛排'],['蒙古烤肉',928,1010,86,'smong','蒙古烤肉'],['小火鍋',1022,1010,86,'shot','小火鍋'],['蚵仔煎',1116,1010,82,'soys','蚵仔煎']].forEach(a=>bl(a[0],a[1],a[2],a[3],64,a[4],{c:'#b07a45',r:'#d9452f',sg:a[5],hr:[16,24],stall:1},BD));
bl('劉家宜的家',1690,262,108,120,'lhouse',{c:'#e8e0f2',r:'#6a5acd',sg:'家宜的家',hr:[18,23],dw:22});
bl('社福中心',2120,72,190,70,'social',{c:'#eef2f4',r:'#4a8a9a',sg:'城光社福中心',hr:[8,18],dw:24});
bl('黃禹豪的家',300,1268,112,104,'yhouse',{c:'#f2e6c8',r:'#3a7a5a',sg:'小石頭的家',hr:[8,23],dw:22});
bl('碳佐麻里',474,1268,180,108,'fine',{c:'#2a3550',r:'#1a2238',sg:'碳佐麻里',hr:[17,23],dw:26});
bl('賓士展示中心',1626,640,84,112,'apt',{c:'#2a2a30',sg:'Mercedes-Benz',hr:[10,20],dw:22});bl('捷安特',1712,640,80,104,'apt',{c:'#1f4fa3',sg:'GIANT 捷安特',hr:[10,21],dw:22});
bl('公寓',610,990,44,124,'apt',{c:'#e0cfc0'},BD);
bl('火車站',900,1136,240,100,'station',{c:'#e6dcc2',r:'#2f5f8a',sg:'火車站',hr:[5,24],dw:40});
bl('五金行',2150,1268,128,100,'garage',{c:'#c9c4b6',r:'#3a6a9a',sg:'阿成五金行',hr:[8,21],dw:28});
bl('家具行',2296,1268,124,104,'garage',{c:'#efe4cc',r:'#8a5a2e',sg:'木子家具行',hr:[10,21],dw:28});
bl('全聯',2440,1268,128,104,'conv',{c:'#f4f4ee',r:'#1e5aa8',sg:'全聯福利中心',hr:[8,23],dw:30});
const Z=B.map(b=>({n:b.n,b,x:b.x+b.dx-b.dw/2-6,y:b.bot,w:b.dw+12,h:10}));
const bHour=b=>!b.hr||(T.hour>=b.hr[0]&&T.hour<b.hr[1]);
const bOpenTxt=b=>b.hr?`營業時間 ${String(b.hr[0]).padStart(2,'0')}:00–${b.hr[1]==24?'24':String(b.hr[1]).padStart(2,'0')}:00`:'全天候營業';

// 特殊區域
const FIELD={x:30,y:40,w:370,h:210,cx:175,cy:145};
const HOOP=[];
const PARK={x:812,y:30,w:230,h:250};
const FARM={x:1312,y:812,w:488,h:348};
const GARDEN={x:1812,y:812,w:588,h:348};
const F={x:1330,y:832,w:200,h:150};
const MARKET={x:802,y:806,w:406,h:354};
const FP={x:1340,y:1030,w:150,h:96};               // 養殖池
const COOP={x:1568,y:1030,w:118,h:84};             // 雞鴨
const SHEEP={x:1704,y:1000,w:84,h:140};            // 羊圈
const FN=[];
const placeName=(x,y)=>{
 if(x>FIELD.x&&x<FIELD.x+FIELD.w&&y<FIELD.y+FIELD.h+10)return '操場';
 if(x>PARK.x&&x<PARK.x+PARK.w&&y<PARK.y+PARK.h+20)return '公園';
 if(x>GARDEN.x&&y>GARDEN.y)return '花園廣場';
 if(x>FARM.x&&y>FARM.y)return '休閒農場';
 if(x>MARKET.x&&x<MARKET.x+MARKET.w&&y>MARKET.y)return '夜市';
 let best=null,bd=1e9;for(const b of B){const d=Math.hypot(b.x+b.w/2-x,b.y+b.h/2-y);if(d<bd){bd=d;best=b}}
 return bd<200?best.n+'附近':(Math.abs(x-740)<110?'大馬路口':'街上')};

/* ===== 靜態底圖 ===== */
const S=document.createElement('canvas');S.width=Math.round(WW*KS);S.height=Math.round((WH+NY)*KS);const s=S.getContext('2d');s.scale(KS,KS);s.translate(0,NY);
const RR=(c,x,y,w,h,r,col)=>{c.fillStyle=col;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()};
const GR=(c,x,y,w,h,c1,c2,hz)=>{const g2=hz?c.createLinearGradient(x,0,x+w,0):c.createLinearGradient(0,y,0,y+h);g2.addColorStop(0,c1);g2.addColorStop(1,c2);c.fillStyle=g2;c.fillRect(x,y,w,h)};
function cobble(c,x,y,w,h,base,tone){if(window.ltCobble&&ltCobble(c,x,y,w,h))return;R(c,x,y,w,h,base||'#a39580');for(let yy=0,k=0;yy<h;yy+=5,k++)for(let xx=k%2?-3:0;xx<w;xx+=7){const x0=Math.max(0,xx),x1=Math.min(w,xx+6.4);if(x1>x0){const v=((xx*13+yy*7+(x|0)*3)&15)/15,t=tone||0;c.fillStyle=`rgb(${200+v*22+t|0},${184+v*20+t|0},${150+v*18+t|0})`;c.fillRect(x+x0,y+yy,x1-x0,Math.min(4.4,h-yy));c.fillStyle='rgba(255,255,255,.18)';c.fillRect(x+x0,y+yy,x1-x0,.6)}}}
function paveTile(c,x,y,w,h,a,b2){if(window.ltPave&&ltPave(c,x,y,w,h,a))return;R(c,x,y,w,h,'#9a9a98');for(let yy=0;yy<h;yy+=8)for(let xx=0;xx<w;xx+=8){const v=((xx*7+yy*13+(x|0))&7)/7;c.fillStyle=(((xx+yy)>>3)&1)?a:b2;c.globalAlpha=.92+v*.08;c.fillRect(x+xx+.4,y+yy+.4,Math.min(7.2,w-xx-.4),Math.min(7.2,h-yy-.4))}c.globalAlpha=1}
function fenceH(c,x,y,len,col){const cl=col||'#f5ead0';R(c,x,y+11,len,2,'rgba(50,25,0,.25)');for(let i=0;i<len;i+=8){R(c,x+i,y,3,10,cl);R(c,x+i,y-1,3,1,'#cdbf9f')}R(c,x,y+2,len,2,'#e8dcbc');R(c,x,y+6,len,2,'#e8dcbc')}
function fenceV(c,x,y,len){R(c,x+1,y,2,len,'#e8dcbc');for(let i=0;i<len;i+=8)R(c,x,y+i,5,4,'#f5ead0')}
function fenceMesh(c,x,y,w,h){c.strokeStyle='rgba(60,70,70,.7)';c.lineWidth=.5;c.beginPath();for(let i=0;i<=w;i+=4){c.moveTo(x+i,y);c.lineTo(x+i,y+h)}for(let j=0;j<=h;j+=4){c.moveTo(x,y+j);c.lineTo(x+w,y+j)}c.stroke();R(c,x,y,w,1.2,'#5a6a6a');R(c,x,y+h-1,w,1.2,'#5a6a6a')}

// 市區鋪面（水泥地）
const PAVE=[[0,438,678,254],[802,438,406,254],[1312,438,1088,254],[0,800,678,502],[420,90,258,212],[1040,120,160,182],[1312,70,1088,232],[1208,70,96,232]];
PAVE.forEach(q=>{paveTile(s,q[0],q[1],q[2],q[3],'#c9c6bd','#c0bdb2')});
// 夜市廣場
paveTile(s,MARKET.x,MARKET.y,MARKET.w,MARKET.h,'#cfc2a8','#c6b89c');
// 小巷
function paintAL(a){R(s,a.x,a.y,a.w,a.h,'#8e8c86');for(let i=0;i<(a.v?a.h:a.w)/6;i++){R(s,a.v?a.x+(i*7%a.w):a.x+i*6,a.v?a.y+i*6:a.y+(i*5%a.h),3,1,'rgba(0,0,0,.12)')}
 if(a.v){R(s,a.x,a.y,1.4,a.h,'rgba(0,0,0,.25)');R(s,a.x+a.w-1.4,a.y,1.4,a.h,'rgba(0,0,0,.25)');R(s,a.x+a.w/2-.5,a.y,1,a.h,'rgba(255,255,255,.06)');for(let y=a.y+30;y<a.y+a.h-20;y+=90){s.fillStyle='#3a3a3a';s.beginPath();s.arc(a.x+a.w/2,y,3.2,0,7);s.fill();s.fillStyle='#555';s.beginPath();s.arc(a.x+a.w/2,y,2.4,0,7);s.fill()}}
 else{R(s,a.x,a.y,a.w,1.4,'rgba(0,0,0,.25)');R(s,a.x,a.y+a.h-1.4,a.w,1.4,'rgba(0,0,0,.25)')}}
AL.forEach(paintAL);

// 人行道（磚）
HRD.forEach(r=>{cobble(s,0,r.y-SWK,WW,SWK,'#b0a090',-8);cobble(s,0,r.y+r.h,WW,SWK,'#b0a090',-8)});
VRD.forEach(r=>{cobble(s,r.x-SWK,0,SWK,WH,'#b0a090',-8);cobble(s,r.x+r.w,0,SWK,WH,'#b0a090',-8)});
// 柏油路
const ASP='#4b4f58';
function asphalt(x,y,w,h){GR(s,x,y,w,h,'#50545d','#464a53');for(let i=0;i<w*h/90;i++)R(s,x+rnd()*w,y+rnd()*h,2,1,i%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)')}
HRD.forEach(r=>asphalt(0,r.y,WW,r.h));VRD.forEach(r=>asphalt(r.x,0,r.w,WH));
// 路緣
HRD.forEach(r=>{R(s,0,r.y-1.2,WW,1.4,'#d8d2c4');R(s,0,r.y+r.h-.2,WW,1.4,'#d8d2c4');R(s,0,r.y-2.2,WW,1,'rgba(0,0,0,.2)');R(s,0,r.y+r.h+1.2,WW,1,'rgba(0,0,0,.2)')});
VRD.forEach(r=>{R(s,r.x-1.2,0,1.4,WH,'#d8d2c4');R(s,r.x+r.w-.2,0,1.4,WH,'#d8d2c4')});
// 路面標線（避開路口）
const inX=(v,r)=>v>r.x-SWK-2&&v<r.x+r.w+SWK+2,inY=(v,r)=>v>r.y-SWK-2&&v<r.y+r.h+SWK+2;
function dashH(y,x0,x1,col,len,gap,th){for(let x=x0;x<x1;x+=len+gap){const xm=x+len/2;if(VRD.some(r=>x+len>r.x-SWK-2&&x<r.x+r.w+SWK+2))continue;R(s,x,y,len,th||1.2,col)}}
function dashV(x,y0,y1,col,len,gap,th){for(let y=y0;y<y1;y+=len+gap){if(HRD.some(r=>y+len>r.y-SWK-2&&y<r.y+r.h+SWK+2))continue;R(s,x,y,th||1.2,len,col)}}
// 四線道 H1
dashH(349,0,WW,'#f4f4f4',10,8);dashH(391,0,WW,'#f4f4f4',10,8);
{const r=HRD[0];let xs=0;const segs=[];let cur=0;VRD.slice().sort((a,b)=>a.x-b.x).forEach(v=>{segs.push([cur,v.x-SWK-2]);cur=v.x+v.w+SWK+2});segs.push([cur,WW]);
 segs.forEach(sg=>{GR(s,sg[0],r.y+38,sg[1]-sg[0],4,'#7a9a68','#5f7f50');R(s,sg[0],r.y+38,sg[1]-sg[0],.8,'#d8d2c4');R(s,sg[0],r.y+41.2,sg[1]-sg[0],.8,'#d8d2c4');for(let x=sg[0]+6;x<sg[1]-6;x+=14){s.fillStyle='#3f8a3a';s.beginPath();s.arc(x,r.y+40,2.1,0,7);s.fill();s.fillStyle='#ffd84a';R(s,x-.4,r.y+38.8,.8,.8,'#ffb3c8')}})}
// V1 四線道
dashV(704,0,WH,'#f4f4f4',10,8);dashV(760,0,WH,'#f4f4f4',10,8);
{const r=VRD[0];let cur=0;const segs=[];HRD.slice().sort((a,b)=>a.y-b.y).forEach(h=>{segs.push([cur,h.y-SWK-2]);cur=h.y+h.h+SWK+2});segs.push([cur,WH]);
 segs.forEach(sg=>{GR(s,r.x+46,sg[0],4,sg[1]-sg[0],'#7a9a68','#5f7f50',1);R(s,r.x+46,sg[0],.8,sg[1]-sg[0],'#d8d2c4');R(s,r.x+49.2,sg[0],.8,sg[1]-sg[0],'#d8d2c4');for(let y=sg[0]+6;y<sg[1]-6;y+=14){s.fillStyle='#3f8a3a';s.beginPath();s.arc(r.x+48,y,2.1,0,7);s.fill()}})}
// 雙線道 H2 / V2（雙黃線）
function solidH(y,col,th){let cur=0;VRD.slice().sort((a,b)=>a.x-b.x).forEach(v=>{R(s,cur,y,v.x-SWK-2-cur,th,col);cur=v.x+v.w+SWK+2});R(s,cur,y,WW-cur,th,col)}
function solidV(x,col,th){let cur=0;HRD.slice().sort((a,b)=>a.y-b.y).forEach(h=>{R(s,x,cur,th,h.y-SWK-2-cur,col);cur=h.y+h.h+SWK+2});R(s,x,cur,th,WH-cur,col)}
solidH(HRD[1].y+24.6,'#f5d742',1.1);solidH(HRD[1].y+26.8,'#f5d742',1.1);
solidV(VRD[1].x+24.6,'#f5d742',1.1);solidV(VRD[1].x+26.8,'#f5d742',1.1);
// 邊線
HRD.forEach(h=>{solidH(h.y+1.5,'rgba(245,245,240,.7)',.8);solidH(h.y+h.h-2.3,'rgba(245,245,240,.7)',.8)});VRD.forEach(v=>{solidV(v.x+1.5,'rgba(245,245,240,.7)',.8);solidV(v.x+v.w-2.3,'rgba(245,245,240,.7)',.8)});
// 斑馬線、停止線
function zebra(x,y,w,h,vertBars){const n=vertBars?Math.floor(w/5):Math.floor(h/5);for(let i=0;i<n;i++)vertBars?R(s,x+i*5+1,y,3,h,'rgba(245,245,240,.95)'):R(s,x,y+i*5+1,w,3,'rgba(245,245,240,.95)')}
const IXS=[];
HRD.forEach(h=>VRD.forEach(v=>{
 const cxl=v.x-SWK/2,cxr=v.x+v.w+SWK/2,cyt=h.y-SWK/2,cyb=h.y+h.h+SWK/2;
 zebra(cxl-6,h.y,12,h.h,false);zebra(cxr-6,h.y,12,h.h,false);   // 橫越 H 的斑馬線（左右兩臂）
 zebra(v.x,cyt-6,v.w,12,true);zebra(v.x,cyb-6,v.w,12,true);       // 橫越 V 的斑馬線（上下兩臂）
 // 停止線
 R(s,cxl-9,h.y+h.h/2,2,h.h/2,'#f4f4f4');R(s,cxr+7,h.y,2,h.h/2,'#f4f4f4');
 R(s,v.x,cyt-9,v.w/2,2,'#f4f4f4');R(s,v.x+v.w/2,cyb+7,v.w/2,2,'#f4f4f4');
 IXS.push({h,v,x:v.x,y:h.y,w:v.w,hh:h.h,cxl,cxr,cyt,cyb})}));
// 路面箭頭與文字
function arrowUp(x,y,col){s.fillStyle=col||'rgba(245,245,240,.8)';s.beginPath();s.moveTo(x,y);s.lineTo(x+3.5,y+5);s.lineTo(x+1.2,y+5);s.lineTo(x+1.2,y+11);s.lineTo(x-1.2,y+11);s.lineTo(x-1.2,y+5);s.lineTo(x-3.5,y+5);s.fill()}
function arrowR(x,y){s.fillStyle='rgba(245,245,240,.8)';s.beginPath();s.moveTo(x+11,y);s.lineTo(x+6,y-3.5);s.lineTo(x+6,y-1.2);s.lineTo(x,y-1.2);s.lineTo(x,y+1.2);s.lineTo(x+6,y+1.2);s.lineTo(x+6,y+3.5);s.fill()}
function arrowL(x,y){s.save();s.translate(x+11,y);s.scale(-1,1);s.translate(-11,-y);arrowR(x,y);s.restore()}
[[381.5,1],[400.5,1],[339.5,-1],[358.5,-1]].forEach(([c,d])=>{[560,1100].forEach(x=>d>0?arrowR(x,c):arrowL(x,c))});
[[694,1],[717,1],[747,-1],[770,-1]].forEach(([c,d])=>{[200,900].forEach(y=>{s.save();s.translate(c,y);if(d>0)s.rotate(Math.PI);arrowUp(0,-5);s.restore()})});
// 人孔蓋與路面補丁
for(let i=0;i<18;i++){const hx=60+rnd()*(WW-120),r=HRD[i%2],hy=r.y+6+rnd()*(r.h-12);R(s,hx,hy,10,7,'rgba(30,30,34,.35)');if(i%3==0){s.fillStyle='#3a3d44';s.beginPath();s.arc(hx,hy,3,0,7);s.fill();s.strokeStyle='#666a72';s.lineWidth=.4;s.stroke()}}
// 盲人導盲磚（路口）
IXS.forEach(q=>{const t=(x,y,w,h)=>R(s,x,y,w,h,'#e8c43a');t(q.cxl-6,q.y-SWK+1,12,1.2);t(q.cxl-6,q.y+q.hh+SWK-2.2,12,1.2);t(q.cxr-6,q.y-SWK+1,12,1.2);t(q.cxr-6,q.y+q.hh+SWK-2.2,12,1.2)});
