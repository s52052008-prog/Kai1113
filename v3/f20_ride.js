/* ===== v4.8：騎乘（腳踏車／機車／汽車）===== */
st.veh=st.veh||{};
const VRC={bike:{n:'腳踏車',i:'🚲',m:1.55,hb:[14,8],pr:380,cols:[['紅','#d33a3a'],['藍','#3a7bd5'],['綠','#2a9d5c'],['黃','#f0b030'],['黑','#222']]},
 moto:{n:'機車',i:'🛵',m:2.3,hb:[20,9],pr:2800,cols:[['白','#e8e8e8'],['黑','#222'],['紅','#c0392b'],['藍','#2f80ed'],['粉','#f08cb6'],['黃','#f0b030']]},
 car:{n:'汽車',i:'🚗',m:3,hb:[32,13],cols:[['紅','#d33a3a'],['藍','#3a7bd5'],['綠','#2a9d5c'],['白','#e8e8e8'],['黑','#222'],['銀','#9aa0a6']]}};
const CARM=[['hatch','小型車',8500],['car','房車',9800],['pickup','皮卡',12000],['suv','休旅車',13500],['sport','跑車',22000]];
const vK=t=>t=='car'?((st.veh.car&&st.veh.car.k)||'car'):t;
const vDims=(k,ax)=>ax=='x'?[VK[k].L,VK[k].T]:[VK[k].T,VK[k].Lv];
const vFree=(cx,cy,w,h)=>{const r={x:cx-w/2,y:cy-h/2,w,h};return r.x>=0&&r.y>=-NY&&r.x+w<=WW&&r.y+h<=WH&&!solids.some(o=>hit(r,o))&&!trees.some(t=>r.x<t.x+22&&r.x+w>t.x+6&&r.y<t.y+38&&r.y+h>t.y+22)};
const vOnRoad=(cx,cy)=>HRD.some(r=>cy>r.y&&cy<r.y+r.h)||VRD.some(r=>cx>r.x&&cx<r.x+r.w);
var VRP={x:0,y:0};
const bikeSpr=col=>SPC['bk'+col]||(SPC['bk'+col]=mkSpr(24,15,c=>{c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(12,14,10,1.8,0,0,7);c.fill();[[5,10],[19,10]].forEach(w=>{c.strokeStyle='#14141a';c.lineWidth=2;c.beginPath();c.arc(w[0],w[1],3.6,0,7);c.stroke();c.fillStyle='#8a9096';c.beginPath();c.arc(w[0],w[1],.9,0,7);c.fill()});
 c.fillStyle=col;c.beginPath();c.moveTo(4,9.4);c.lineTo(5.6,9.4);c.lineTo(11,4);c.lineTo(9.4,4);c.fill();c.beginPath();c.moveTo(9.4,3.6);c.lineTo(18.6,3.6);c.lineTo(18.6,5.6);c.lineTo(9.4,5.6);c.fill();c.beginPath();c.moveTo(18,4);c.lineTo(19.8,4);c.lineTo(20,10);c.lineTo(18.4,10);c.fill();c.beginPath();c.moveTo(11,5);c.lineTo(12.6,5);c.lineTo(13,10);c.lineTo(11.4,10);c.fill();R(c,5,9.2,14,1.4,col);R(c,8.4,1.8,4.2,1.6,'#222');R(c,17,1.6,4.4,1.4,'#333');R(c,19,2,1.2,2.4,'#333')}));
function vDrawParked(c,t,o){const k=vK(t);
 if(t=='moto'||t=='bike'){const sp=t=='moto'?scSpr(o.col,null):bikeSpr(o.col);c.save();c.translate(o.cx,o.cy+2);if(o.dir<0)c.scale(-1,1);c.drawImage(sp,-12,-7.5,24,15);c.restore()}
 else{const d=vDims(k,o.ax);drawVeh(c,{k,col:o.col,ax:o.ax,dir:o.dir,x:o.cx-d[0]/2,y:o.cy-d[1]/2,w:d[0],h:d[1]})}}
function vNear(){if(scene||p.ride)return null;const cx=p.x+p.w/2,cy=p.y+p.h/2;let b=null,bd=30;for(const t in st.veh){const o=st.veh[t];if(!o||o.rd)continue;const d=Math.hypot(o.cx-cx,o.cy-cy);if(d<bd){bd=d;b=t}}return b}
function vMount(t){const o=st.veh[t],V=VRC[t],hb=V.hb;if(!o)return;
 for(const [dx,dy] of [[0,0],[0,-6],[0,6],[-6,0],[6,0],[-10,-10],[10,10],[10,-10],[-10,10]]){const cx=o.cx+dx,cy=o.cy+dy;if(vFree(cx,cy,hb[0],hb[1])){p.w=hb[0];p.h=hb[1];p.x=cx-hb[0]/2;p.y=cy-hb[1]/2;p.ride=t;o.rd=1;p.vx=p.vy=0;if(!(o.ax=='x'||o.ax=='y'))o.ax='x';p.dir=o.ax=='x'?(o.dir<0?2:3):(o.dir<0?1:0);VRP.in=null;toast(V.i+' 騎上'+V.n+'！空白鍵：下車　紅燈要停，闖紅燈會被罰款');return}}
 toast('這裡空間不夠，換個空曠的地方再上車')}
function vDismount(){if(!p.ride)return true;const t=p.ride,o=st.veh[t],cx=p.x+p.w/2,cy=p.y+p.h/2;
 if(vOnRoad(cx,cy)){toast('🚫 不能停在馬路上，先騎到人行道再下車');return false}
 const X=vHead()=='x';o.cx=cx;o.cy=cy;o.ax=(t=='car'?X?'x':'y':'x');if(t=='car'){o.dir=X?(p.dir==2||p.dir==4||p.dir==6?-1:1):(p.dir==1?-1:1)}else o.dir=(p.dir==2||p.dir==4||p.dir==6)?-1:1;o.rd=0;
 p.ride=null;p.w=12;p.h=8;p.x=cx-6;p.y=cy-4;p.vx=p.vy=0;
 // 人下車站到車旁
 for(const [dx,dy] of [[0,14],[0,-14],[16,0],[-16,0],[0,0]]){const r={x:cx+dx-6,y:cy+dy-4,w:12,h:8};if(!solids.some(q=>hit(r,q))&&r.x>=0&&r.y>=-NY&&r.x+12<=WW&&r.y+8<=WH){p.x=r.x;p.y=r.y;break}}
 toast('已停好：'+VRC[t].n);return true}
const vHead=()=>(p.dir==0||p.dir==1)?'y':'x';
function vSpeed(){return p.ride?VRC[p.ride].m:1}
function vPlayerObj(){const t=p.ride,k=vK(t),X=vHead()=='x',ax=X?'x':'y',d=vDims(k,ax),cx=p.x+p.w/2,cy=p.y+p.h/2;
 const dir=X?((p.dir==2||p.dir==4||p.dir==6)?-1:1):(p.dir==1?-1:1);return{k,col:st.veh[t].col,ax,dir,x:cx-d[0]/2,y:cy-d[1]/2,w:d[0],h:d[1],rc:'#2f80ed',hc:'#d33'}}
{const _dp=drawPlayer;drawPlayer=function(c){if(p.ride){const v=vPlayerObj();drawVeh(c,v);const m=Math.hypot(p.vx,p.vy)>8;if(p.ride!='car'&&m){c.save();c.globalAlpha=.25;c.fillStyle='#fff';const X=v.ax=='x';for(let i=0;i<3;i++)c.fillRect(X?(v.dir>0?v.x-4-i*5:v.x+v.w+i*5):v.x+2+i*4,X?v.y+v.h-6-i*2:(v.dir>0?v.y-3-i*5:v.y+v.h+i*5),X?3:1,X?1:3);c.restore()}return}return _dp(c)};
 const _sd=safetyDraw;safetyDraw=function(a){_sd(a);if(scene)return;const near=vNear();for(const t in st.veh){const o=st.veh[t];if(!o||o.rd)continue;if(o.cx<CAM.x-60||o.cx>CAM.x+W+60||o.cy<CAM.y-60||o.cy>CAM.y+H+60)continue;a.push({y:o.cy+7,f:()=>{vDrawParked(g,t,o);if(near==t)txt(g,'▼ 騎上'+VRC[t].n+'（空白鍵）',o.cx,o.cy-20,'#ffd84a','bold 8px sans-serif')}})}};
 const _a=act;act=function(){if(!scene&&!MG&&dlg.hidden&&!DM.on){if(p.ride){if(!vDismount())return}else{const t=vNear();if(t)return vMount(t)}}return _a.apply(this,arguments)};
 const _st=step;step=function(dx,dy){if(!p.ride)return _st(dx,dy);const n=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/3));for(let i=0;i<n;i++)_st(dx/n,dy/n)};
 const _e=enterB;enterB=function(z){if(p.ride){const c0={x:p.x+p.w/2,y:p.y+p.h/2};if(!vDismount()){/* 停在路上：強制停到旁邊 */const o=st.veh[p.ride];o.cx=c0.x;o.cy=c0.y;o.rd=0;p.ride=null;p.w=12;p.h=8;p.x=c0.x-6;p.y=c0.y-4}}return _e(z)};
 const _uw=updateWorld;updateWorld=function(dt){_uw(dt);vTick(dt)}}
// 闖紅燈
function vTick(dt){if(!p.ride)return;VRP.cd=Math.max(0,(VRP.cd||0)-dt);const ax=vHead(),cx=p.x+p.w/2,cy=p.y+p.h/2;let ins=null;
 for(const v of VRD)for(const h of HRD)if(cx>v.x&&cx<v.x+v.w&&cy>h.y&&cy<h.y+h.h)ins=v.id+h.id;
 if(ins&&ins!==VRP.in&&!VRP.cd&&Math.hypot(p.vx,p.vy)>12){const c=ls(ax);if(c=='r'){VRP.cd=6;const f=Math.min(st.money,p.ride=='car'?500:p.ride=='moto'?300:150);st.money-=f;st.rep=Math.max(0,st.rep-2);hud();toast(`🚨 闖紅燈！被拍到了，罰款 💰${f}　聲望 -2`)}}
 VRP.in=ins}
// 購買（機車行）
function vBuyColor(t,k,price){const V=VRC[t];openDlg(`${V.i} 選擇顏色`,`${k&&t=='car'?CARM.find(q=>q[0]==k)[1]:V.n}　💰${price}`,V.cols.map(c=>[`${c[0]}色`,'',()=>{if(st.money<price)return;st.money-=price;const z=Z.find(z=>z.n=='家'),b=z.b,hb=V.hb;let pos=null;const cand=[];for(let r=0;r<5;r++)for(let a=0;a<12;a++){const ang=a*Math.PI/6;cand.push([z.x+z.w/2+(t=='car'?60:t=='moto'?46:34)*Math.cos(ang)*(r?1+r*.3:1),b.bot+22+(t=='car'?26:14)*Math.abs(Math.sin(ang))+r*8])}
  cand.sort((u,w)=>Math.hypot(u[0]-(z.x+z.w/2+(t=='car'?60:40)),u[1]-(b.bot+24))-Math.hypot(w[0]-(z.x+z.w/2+(t=='car'?60:40)),w[1]-(b.bot+24)));
  for(const q of cand){const used=Object.values(st.veh).some(o=>o&&Math.hypot(o.cx-q[0],o.cy-q[1])<30);if(!used&&!vOnRoad(q[0],q[1])&&vFree(q[0],q[1],hb[0]+4,hb[1]+4)&&!NP.some(n=>!n.vh&&!n.hid&&hit({x:q[0]-hb[0]/2,y:q[1]-hb[1]/2,w:hb[0],h:hb[1]},n))){pos=q;break}}
  if(!pos)pos=[z.x+z.w/2+40,b.bot+30];
  st.veh[t]={cx:pos[0],cy:pos[1],col:c[1],ax:'x',dir:1,rd:0};if(t=='car')st.veh.car.k=k;hud();closeDlg();SVDIRTY=1;toast(`🎉 買了${V.n}！停在你家門口，走過去按空白鍵騎乘`)},0]).concat([['返回','',cancel,0]]),true)}
function vShop(){const o=[];
 ['bike','moto'].forEach(t=>{const V=VRC[t];o.push([`${V.i} ${V.n}　💰${V.pr}`,t=='bike'?`速度 ×${V.m}，不用油錢`:`速度 ×${V.m}`,()=>vBuyColor(t,null,V.pr),!!st.veh[t]||st.money<V.pr]);if(st.veh[t])o[o.length-1][1]='已擁有（停在你家附近）'});
 o.push([`🚗 汽車`,st.veh.car?'已擁有（停在你家附近）':'速度 ×3，可選車型與顏色',()=>openDlg('🚗 選擇車型','汽車開得快，但車身較大，窄巷通不過',CARM.map(m=>[`${m[1]}　💰${m[2]}`,'',()=>vBuyColor('car',m[0],m[2]),st.money<m[2]]).concat([['返回','',cancel,0]]),true),!!st.veh.car]);
 return o}
{const _sp=SP['機車行'];SP['機車行']=function(){const base=_sp?_sp.apply(this,arguments):[];return [['🛵 購買機車','買了會停在你家門口',()=>openDlg('🚲 載具買賣','買了之後，到家附近走近載具按空白鍵上車；要進建築請先下車。',vShop().concat([['返回','',cancel,0]]),true)]].concat(base)}}
// 存檔整合
{const _ss=svSnap;svSnap=function(){const d=_ss();if(p.ride&&d.st.veh&&d.st.veh[p.ride]){const o=d.st.veh[p.ride];o.cx=p.x+p.w/2;o.cy=p.y+p.h/2;o.rd=0;d.pos={x:p.x+p.w/2-6,y:p.y+p.h/2-4}}else if(d.st.veh)for(const t in d.st.veh)if(d.st.veh[t])d.st.veh[t].rd=0;return d};
 const _sl=svLoad;svLoad=function(d){p.ride=null;p.w=12;p.h=8;const r=_sl(d);for(const t in st.veh)if(st.veh[t])st.veh[t].rd=0;return r}}
