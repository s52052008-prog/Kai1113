/* v13.0 跑圖減負：前屋主丁先生留下的二手腳踏車、地圖導航（計程車／自己的機車、汽車直達）、五樓爬樓梯（腿練起來後解鎖一口氣衝上樓） */
const gwWed=()=>{try{return !!yjS().wed}catch(e){return false}};
const gwS=()=>st.gw||(st.gw={stair:0});
// ───────── 以前 vs 現在：成長對比卡 ─────────
function growCard(title,story,before,after,cb){const box=`<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:stretch;margin-top:10px">
 <div style="background:#e9dcc2;border:2px solid #b89a6a;border-radius:8px;padding:6px 8px;font-size:12.5px"><b style="color:#8a6a42">以前</b><br>${before}</div>
 <div style="align-self:center;font-size:20px">➜</div>
 <div style="background:#fff3c4;border:2px solid #e8b030;border-radius:8px;padding:6px 8px;font-size:12.5px;box-shadow:0 0 10px rgba(232,176,48,.5)"><b style="color:#b07a10">現在</b><br>${after}</div></div>`;
 const L=gwS().log||(gwS().log=[]);L.push({t:title,b:before,a:after,y:T.year,d:T.day});SVDIRTY=1;
 openDlg('🌟 '+title,story+box,[['太好了！','',()=>{closeDlg();cb&&cb()}]])}
function growLog(){const L=gwS().log||[];openDlg('🌟 成長紀錄',L.length?L.map(q=>`<div style="margin:4px 0;padding:5px 8px;background:#fff8e6;border-radius:6px;font-size:12.5px"><b>${q.t}</b>　<span style="opacity:.6">第 ${q.y} 年 第 ${q.d} 天</span><br>以前：${q.b}<br>現在：${q.a}</div>`).join(''):'還沒有解開任何卡點。<br>努力健身、整理家裡，生活會越來越輕鬆！',[['關閉','',closeDlg]])}

// ───────── 前房東的二手腳踏車 ─────────
function gwBike(){const G=gwS();if(G.bikeG||(st.veh&&st.veh.bike))return;G.bikeG=1;SVDIRTY=1;
 openDlg('🚲 樓梯間的舊腳踏車',`你下樓的時候，在一樓樓梯間的角落看到一台蓋著帆布的腳踏車。<br>掀開一看——是<b>前屋主丁先生</b>他們搬走時留下來的淑女車，車籃上還貼著一張紙條：<br><br><i>「給新屋主：腳踏車還能騎，留給你們代步。這間房子住了三十年，希望你們也住得開心。——丁家」</i><br><br><span style="font-size:12px;opacity:.8">（擦一擦灰塵、輪胎打個氣，騎起來還很順。）</span>`,
  [['謝謝丁先生！收下了','',()=>{closeDlg();const ot=toast;toast=function(){};try{vBuyDo('bike',null,0,0);rackPark('bike')}catch(e){console.error(e)}finally{toast=ot}closeDlg();
   whenFree(()=>growCard('不用再走斷腿了','前屋主丁先生留下的淑女車，現在是你的了，就停在公寓一樓門口。<br>走到車旁按 <b>R</b>（或空白鍵）騎上去，再按 R 就停在原地。','在小鎮裡全部用走的，跑一趟家樂福就累了','騎腳踏車移動速度 ×1.5<br>回家時自動停回一樓門口<br>（之後：體力練起來可以買電動滑板車，折起來隨身帶）'))}]])}
{const _x=exitTown;exitTown=function(){const fromHome=outPos&&outPos.z&&outPos.z.n=='家';const r=_x.apply(this,arguments);
 if(fromHome){const G=gwS();G.out=(G.out||0)+1;if(!G.bikeG&&!(st.veh&&st.veh.bike)&&G.out>=2&&T.hour>=7&&T.hour<21)setTimeout(()=>whenFree(gwBike),900)}return r}}
// 已經有腳踏車的存檔：不再觸發
setTimeout(()=>{try{if(st.veh&&st.veh.bike)gwS().bikeG=1}catch(e){}},1500);

// ───────── 五樓沒有電梯：爬樓梯 ─────────
const STAIR0=['🪜 一階一階爬上五樓……呼、呼……（老公寓沒有電梯）','🪜 爬到三樓停下來喘口氣，再繼續爬……','🪜 終於到五樓了，腿有點酸……','🪜 提著東西爬五樓，手跟腿都在抖……'];
const STAIR1=['💨 一口氣衝上五樓，臉不紅氣不喘！','💨 三階併兩階，五樓轉眼就到。','💨 爬樓梯？順便練腿啦！'];
{const _e=enterB;enterB=function(z){const r=_e.apply(this,arguments);try{if(z&&z.n=='家'){const G=gwS();G.stair=(G.stair||0)+1;
 if(!G.legs){advance(.05);setTimeout(()=>toast(STAIR0[G.stair%STAIR0.length]),40);
  if(G.stair>=20&&(st.runSk||0)>=9)setTimeout(()=>whenFree(()=>{if(G.legs)return;G.legs=1;st.spdBonus=(st.spdBonus||0)+.05;
   growCard('五樓不再是障礙','今天提著兩大袋菜爬上五樓，開門的時候才發現——<b>我居然沒喘！</b><br>'+(gwWed()?'家宜從客廳探頭：「你剛剛是用跑的上來嗎？」':'樓下的阿伯看著你：「少年仔，腳力不錯喔！」')+'<br>深蹲練的腿，終於在樓梯上看到成果了。','爬五樓要停兩次，每次多花 3 分鐘，腿還會酸','一口氣衝上五樓，不花時間<br>每次爬樓梯順便練腿（跑速慢慢提升）<br>移動速度永久 +5%')}),900);
  else if(G.stair==6)setTimeout(()=>whenFree(()=>openDlg('🪜 五樓好高','你扶著樓梯扶手喘氣。<br>「老公寓沒電梯真的好累……如果腿再有力一點就好了。」<br><br><span style="font-size:12px;opacity:.8">💡 去健身房練「深蹲」讓腿變強，爬樓梯會越來越輕鬆。</span>',[['好，去練腿！','',closeDlg]])),700)}
 else{st.runSk=(st.runSk||0)+.05;setTimeout(()=>toast(STAIR1[G.stair%STAIR1.length]),40)}}}catch(e){}return r}}

// ───────── 地圖導航：計程車／自己的機車、汽車直達 ─────────
const ftName=z=>(z.b&&z.b.sg)||z.n;
const ftDoor=z=>({x:z.x+z.w/2-6,y:z.b.bot+14});
function ftInfo(z,mode){const d=ftDoor(z),dist=Math.hypot(d.x-p.x,d.y-p.y);
 if(mode=='taxi')return{h:.15+dist/5000,fare:85+Math.ceil(dist/50)*5,dist};
 return{h:.08+dist/(mode=='car'?7000:6500),fare:0,dist}}
function ftModes(z){const o=[],I=ftInfo(z,'taxi'),mn=h=>Math.max(5,Math.round(h*60/5)*5);
 if(st.veh&&st.veh.car)o.push(['🚗 開自己的車過去',`約 ${mn(ftInfo(z,'car').h)} 分鐘・免費・車子會停在門口`,()=>ftGo(z,'car')]);
 if(st.veh&&st.veh.moto)o.push(['🛵 騎自己的機車過去',`約 ${mn(ftInfo(z,'moto').h)} 分鐘・免費・機車會停在門口`,()=>ftGo(z,'moto')]);
 o.push(['🚕 叫計程車',`約 ${mn(I.h)} 分鐘・💰${I.fare}`+(st.veh&&(st.veh.moto||st.veh.car)?'':'（有了機車或汽車就能免費直達）'),()=>ftGo(z,'taxi'),st.money<I.fare]);
 return o}
function ftAsk(z){if(scene)return toast('先走到戶外再導航');if(MG)return;
 if(Math.hypot(ftDoor(z).x-p.x,ftDoor(z).y-p.y)<60)return toast('你已經在 '+ftName(z)+' 門口了');
 openDlg('📍 前往 '+ftName(z),'要怎麼過去？',ftModes(z).concat([['返回地圖','',cityMap],['取消','',closeDlg]]))}
function ftPark(t,x,y){const V=VRC[t],hb=V.hb;for(let r=0;r<8;r++)for(let a=0;a<12;a++){const ang=a*Math.PI/6,cx=x+Math.cos(ang)*(20+r*10),cy=y+Math.abs(Math.sin(ang))*(10+r*6)+6;
 if(!vOnRoad(cx,cy)&&vFree(cx,cy,hb[0]+4,hb[1]+4)&&!Object.keys(st.veh).some(k=>k!=t&&st.veh[k]&&Math.hypot(st.veh[k].cx-cx,st.veh[k].cy-cy)<30))return[cx,cy]}return[x+30,y+20]}
function ftGo(z,mode){if(scene)return;const I=ftInfo(z,mode);closeDlg();
 if(mode=='taxi'){if(st.money<I.fare)return toast('錢不夠搭計程車');st.money-=I.fare}
 if(p.ride=='scoot')scFold();
 if(p.ride){const rt=p.ride,o=st.veh[rt];p.ride=null;o.rd=0;o.cx=p.x+p.w/2;o.cy=p.y+p.h/2;p.w=12;p.h=8;
  if(mode=='taxi'&&vOnRoad(o.cx,o.cy)){const q=ftPark(rt,o.cx,o.cy);o.cx=q[0];o.cy=q[1]}}
 const d=ftDoor(z);p.x=d.x;p.y=d.y;p.vx=p.vy=0;p.dir=0;zone=z;Object.keys(keys).forEach(k=>keys[k]=0);
 if(mode!='taxi'){const o=st.veh[mode];const q=ftPark(mode,d.x+6,z.b.bot+10);o.cx=q[0];o.cy=q[1];o.rd=0;o.ax='x';o.dir=1}
 try{if(st.comp&&typeof PET!='undefined'){PET.x=p.x;PET.y=p.y+8}}catch(e){}
 advance(I.h);hud();SVDIRTY=1;const mn=Math.max(5,Math.round(I.h*60/5)*5);
 toast(mode=='taxi'?`🚕 到了 ${ftName(z)}（${mn} 分鐘・💰${I.fare}）`:`${mode=='car'?'🚗':'🛵'} 到了 ${ftName(z)}（${mn} 分鐘）`);
 const G=gwS();G.ft=(G.ft||0)+1;
 if(mode!='taxi'&&!G['ft_'+mode]){G['ft_'+mode]=1;setTimeout(()=>whenFree(()=>growCard(mode=='car'?'有車真好':'機車是台灣人的腳',mode=='car'?'下雨天也不怕，載家宜出門也方便多了。':'機車鑰匙一轉，小鎮從東到西十分鐘就到。','打開地圖只能叫計程車，每趟都要花錢','打開地圖，'+(mode=='car'?'開車':'騎機車')+'免費直達任何地方<br>停好車就在門口')),600)}}
{const _cm=cityMap;cityMap=function(){const od=openDlg;openDlg=function(t,d,o,...rr){if(Array.isArray(o)&&String(t).includes('地圖'))o.splice(Math.max(0,o.length-1),0,['📋 目的地清單（由近到遠）','點了直接導航',ftList]);return od.call(this,t,d,o,...rr)};let r;try{r=_cm.apply(this,arguments)}finally{openDlg=od}try{
 const c=dbox.querySelector('canvas');const k=720/WW;
 if(c){c.style.cursor='pointer';c.title='點地圖上的建築，直接導航過去';c.addEventListener('click',e=>{const rc=c.getBoundingClientRect(),x=(e.clientX-rc.left)*c.width/rc.width/k,y=(e.clientY-rc.top)*c.height/rc.height/k-NY;
  let b=null,bd=90;Z.forEach(z=>{const bb=z.b,cx=bb.x+bb.w/2,cy=bb.y+bb.h/2,dd=Math.hypot(cx-x,cy-y);const inside=x>=bb.x&&x<=bb.x+bb.w&&y>=bb.y&&y<=bb.y+bb.h;if(inside)dd=0;if(dd<bd){bd=dd;b=z}});if(b)ftAsk(b)})}
 const d=dbox.querySelector('.rdesc')||dbox.querySelector('p');if(d)d.insertAdjacentHTML('beforeend','<br>📍 <b>點地圖上的建築就能直接過去</b>（計程車'+(st.veh&&(st.veh.moto||st.veh.car)?'，或騎／開自己的車免費直達':'')+'）。');
}catch(e){console.error(e)}return r}}
function ftList(){const seen=new Set(),L=Z.filter(z=>{const n=ftName(z);if(seen.has(n))return false;seen.add(n);return true}).map(z=>({z,d:Math.hypot(ftDoor(z).x-p.x,ftDoor(z).y-p.y)})).sort((a,b)=>a.d-b.d);
 openDlg('📍 要去哪裡？','由近到遠排列。',L.map(q=>[(q.z.n=='家'?'🏠 ':(I[q.z.n]||'📍')+' ')+ftName(q.z),q.d<60?'你就在這裡':'距離約 '+Math.round(q.d/10)*10+' 步',()=>ftAsk(q.z),q.d<60]).concat([['返回地圖','',cityMap]]))}

// ───────── 公寓一樓門口的停車位：腳踏車、滑板車擺在一起 ─────────
function rackSpot(i){const z=Z.find(z=>z.n=='家'),b=z.b,x0=z.x-8,y0=b.bot+9;const C=[[x0,y0],[x0-17,y0],[x0,y0+11],[x0-17,y0+11],[x0-34,y0],[z.x+z.w+30,y0]];
 let k=0;for(const q of C){if(!vOnRoad(q[0],q[1])&&vFree(q[0],q[1],12,8)){if(k==i)return q;k++}}return[x0+i*20,y0]}
function rackPark(t){const o=st.veh&&st.veh[t];if(!o)return;const q=rackSpot(t=='bike'?0:1);o.cx=q[0];o.cy=q[1];o.rd=0;o.pk=0;o.ax='x';o.dir=t=='bike'?1:-1;SVDIRTY=1}

// ───────── 電動滑板車：可以折疊，隨時收、隨時騎 ─────────
VRC.scoot={n:'電動滑板車',i:'🛴',m:1.95,hb:[12,8],pr:4000,cols:[['黑','#2a2a2e']]};
const SCOOT_NEED=150;
const SCF={t:0,mode:null};// 折疊動畫
let scFace=1;
function scDraw(c,x,y,dir,fold,mv){// x,y：主角腳底中心；fold 0=展開 1=折好
 c.save();c.translate(Math.round(x),Math.round(y));const side=dir!=null;
 if(side){c.scale(dir,1);const k=fold;
  R(c,-12,0,24,1.5,'rgba(0,0,0,.28)');
  // 甲板
  R(c,-10+k*6,-3,18-k*8,2.5,'#2a2a2e');R(c,-10+k*6,-3,18-k*8,.8,'#5a5a64');R(c,-5+k*4,-2.4,8-k*5,1,'#e8b030');
  // 輪子
  const wh=(wx)=>{c.fillStyle='#111';c.beginPath();c.arc(wx,-1,2.3,0,7);c.fill();c.fillStyle='#8a8a92';c.beginPath();c.arc(wx,-1,1,0,7);c.fill()};
  wh(-9+k*6);wh(8-k*2);
  // 立管：展開時直立，折疊時倒向後方
  c.save();c.translate(8-k*2,-3);c.rotate(-k*1.45);R(c,-.8,-16,1.6,16,'#3a3a42');R(c,-.8,-16,.6,16,'#7a7a84');R(c,-3.5,-17,6,1.6,'#2a2a2e');R(c,1.4,-17.4,1.6,2.4,'#111');
  // 前燈
  c.fillStyle=mv?'#fff6b0':'#d8d8a0';c.fillRect(.8,-6,1.4,1.4);c.restore();
  if(mv&&!k){c.globalAlpha=.35;R(c,-16,-3,3,.8,'#fff');R(c,-21,-2,3,.8,'#fff');c.globalAlpha=1}}
 else{// 正面／背面
  R(c,-5,0,10,1.5,'rgba(0,0,0,.28)');R(c,-1.5,-4,3,5,'#2a2a2e');R(c,-1.2,-1,2.4,2.4,'#111');R(c,-.8,-18,1.6,15,'#3a3a42');R(c,-5,-19,10,1.6,'#2a2a2e');R(c,-6,-19.4,2,2.4,'#111');R(c,4,-19.4,2,2.4,'#111');R(c,-.7,-7,1.4,1.2,'#fff6b0')}
 c.restore()}
// 騎乘中、折疊動畫、隨身帶著（折好提在手上）
{const _dp=drawPlayer;drawPlayer=function(c){const o=st.veh&&st.veh.scoot;
 if(p.ride=='scoot'){const mv=Math.hypot(p.vx,p.vy)>8;if(Math.abs(p.vx)>6)scFace=p.vx>0?1:-1;const vert=Math.abs(p.vy)>Math.abs(p.vx)*1.3&&mv,cx=p.x+p.w/2,cy=p.y+p.h;
  const bob=mv?Math.sin(NOW/90)*.3:0;
  if(vert&&p.vy<0){drawChar(c,{x:p.x,y:p.y-3+bob,dir:p.dir,mv:false,fr:0,lk:ALLEN,ph:NOW/1000});scDraw(c,cx,cy,null,0,mv)}
  else{scDraw(c,cx,cy,vert?null:scFace,0,mv);drawChar(c,{x:p.x-(vert?0:scFace*1.5),y:p.y-3+bob,dir:vert?p.dir:(scFace>0?3:2),mv:false,fr:0,lk:ALLEN,ph:NOW/1000})}return}
 _dp(c);
 if(!p.ride&&o&&(o.pk||SCF.mode)){const cx=p.x+p.w/2,cy=p.y+p.h;let k=1;if(SCF.mode){const a=Math.min(1,(NOW-SCF.t)/450);k=SCF.mode=='fold'?a:1-a;if(a>=1){const m=SCF.mode;SCF.mode=null;if(m=='unfold')return}}
  if(SCF.mode=='unfold'||SCF.mode=='fold')scDraw(c,cx+scFace*10,cy,scFace,k,false);
  else{c.save();c.translate(cx+(p.dir==2?-7:7),cy-8);c.scale(.6,.6);scDraw(c,0,0,p.dir==2?-1:1,1,false);c.restore()}}}}
// 停著的滑板車
{const _v=vDrawParked;vDrawParked=function(c,t,o){if(t=='scoot'){if(o.pk)return;scDraw(c,o.cx,o.cy+4,o.dir||1,0,false);return}return _v.apply(this,arguments)}}
{const _n=vNear;vNear=function(){const r=_n.apply(this,arguments);return r&&st.veh[r]&&st.veh[r].pk?null:r}}
function scFold(){const o=st.veh.scoot,cx=p.x+p.w/2,cy=p.y+p.h/2;if(p.ride=='scoot'){p.ride=null;p.w=12;p.h=8;p.x=cx-6;p.y=cy-4;p.vx=p.vy=0}
 o.rd=0;o.pk=1;o.cx=-9999;o.cy=-9999;SCF.mode='fold';SCF.t=NOW;SVDIRTY=1}
function scUnfold(){const o=st.veh.scoot;if(!vFree(p.x+p.w/2,p.y+p.h/2,12,8))return toast('這裡太擠了，換個空曠一點的地方');
 SCF.mode='unfold';SCF.t=NOW;o.pk=0;o.cx=p.x+p.w/2;o.cy=p.y+p.h/2;o.dir=scFace;
 setTimeout(()=>{if(scene||p.ride)return;p.ride='scoot';o.rd=1;p.vx=p.vy=0;SVDIRTY=1;toast('🛴 展開滑板車，出發！（R：折起來　空白鍵：停在這裡）')},380)}
// R：騎上／停車／折疊
function rideKey(){if(scene)return toast('在室內不能騎車');if(MG||window.TITLE||!dlg.hidden)return;const V=st.veh||{};
 if(p.ride=='scoot'){scFold();return toast('🛴 滑板車折起來提在手上（R：展開再騎）')}
 if(p.ride){const t=p.ride;if(vDismount())toast(VRC[t].i+' 停好了'+(t=='bike'?'（要騎再走回來按 R）':''));return}
 if(V.scoot&&V.scoot.pk)return scUnfold();
 const t=vNear();if(t)return vMount(t);
 if(V.bike||V.scoot)return toast((V.bike?'🚲 腳踏車':'🛴 滑板車')+'停在別的地方，要走過去才能騎'+(V.scoot?'':'（電動滑板車可以折起來隨身帶）'));
 toast('你還沒有交通工具')}
addEventListener('keydown',e=>{if(e.target&&(e.target.tagName=='INPUT'||e.target.tagName=='TEXTAREA'))return;if((e.key=='r'||e.key=='R')&&!e.repeat&&!e.ctrlKey&&!e.metaKey){if(!dlg.hidden||MG||window.TITLE||(typeof ED!='undefined'&&ED.on)||(typeof DM!='undefined'&&DM.on))return;e.preventDefault();rideKey()}});
window.bikeToggle=rideKey;
// 進建築：滑板車折起來帶進去；回家時腳踏車、滑板車都停到一樓門口
{const _e=enterB;enterB=function(z){const home=z&&z.n=='家',r0=p.ride;
 if(p.ride=='scoot'){const o=st.veh.scoot;if(home){p.ride=null;p.w=12;p.h=8;o.rd=0}else scFold()}
 const r=_e.apply(this,arguments);
 try{if(home){if(st.veh&&st.veh.scoot&&(r0=='scoot'||st.veh.scoot.pk))rackPark('scoot');if(r0=='bike')rackPark('bike')}}catch(e){}return r}}
// 存檔：隨身帶著的滑板車不要被當成停在路上
{const _ss=svSnap;svSnap=function(){const d=_ss.apply(this,arguments);try{const o=d.st.veh&&d.st.veh.scoot;if(o&&o.pk){o.cx=-9999;o.cy=-9999}}catch(e){}return d}}
// 購買：捷安特（體力上限達標才會想買）
function scBuy(){if(st.veh&&st.veh.scoot)return;if(staMax()<SCOOT_NEED)return;if(st.money<4000)return toast('錢不夠');st.money-=4000;st.veh.scoot={cx:0,cy:0,col:'#2a2a2e',ax:'x',dir:-1,rd:0,pk:1};hud();closeDlg();SVDIRTY=1;
 growCard('隨身的移動神器','店員幫你把滑板車折好：「按一下這個卡榫，三秒收好，提著就能進捷運、進店裡。」<br>你提著它走出捷安特，在門口「喀」一聲展開——腳一蹬，風就迎面吹來。','腳踏車要停在原地，走遠了還得走回來牽','電動滑板車 ×1.95<br>按 R 隨時展開騎、隨時折起來提著<br>回家自動停在一樓門口，跟腳踏車擺一起')}
wrapSP('捷安特',o=>{const has=st.veh&&st.veh.scoot,ok=staMax()>=SCOOT_NEED;o.splice(1,0,['🛴 電動滑板車（可折疊）　💰4,000',has?'已擁有':ok?'速度 ×1.95・按 R 隨時展開／折疊，走到哪帶到哪':`站在上面要核心穩定——體力上限 ${SCOOT_NEED} 以上才敢騎（目前 ${staMax()}）`,scBuy,has||!ok||st.money<4000])});
// 體力上限剛達標：提示可以買
setInterval(()=>{try{const G=gwS();if(G.scHint||window.TITLE||!dlg.hidden||MG||(st.veh&&st.veh.scoot))return;if(staMax()>=SCOOT_NEED){G.scHint=1;SVDIRTY=1;openDlg('🛴 想要更方便','最近練得不錯，站著做事也很穩。<br>路上看到有人騎<b>電動滑板車</b>，到了店門口「喀」一聲折起來提進去，好帥。<br><br><span style="font-size:12px;opacity:.8">💡 捷安特有賣電動滑板車（💰4,000），可以折疊、隨身帶著走。</span>',[['記下來！','',closeDlg]])}}catch(e){}},3000);
