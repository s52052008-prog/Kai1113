/* ===== v8.0 交通工具換成使用者手繪素材 ===== */
Object.assign(VK,{hummer:{L:46,T:16,Lv:36,s:[54,68]}});
const VI={};
{const R=(n,a,b)=>{const o=[];for(let i=a;i<=b;i++)o.push(n+i);return o};
 const one=(k,ws,wf)=>{VI[k]={s:['vh_t_'+k+'_s0'],f:['vh_t_'+k+'_f0'],b:['vh_t_'+k+'_b0'],ws,wf}};
 one('suv',46,23);one('hatch',37,21);one('sport',42,22);one('pickup',52,23);one('taxi',42,22);one('police',42,22);one('truck',60,24);one('bus',74,26);
 // 一般房車：路上的房車＋停車場的各色車款
 VI.car={s:['vh_t_car_s0',...R('vh_k_',0,16).map(k=>k+'_s')],f:['vh_t_car_f0',...R('vh_k_',0,16).map(k=>k+'_f')],b:['vh_t_car_b0',...R('vh_k_',0,16).map(k=>k+'_b')],ws:42,wf:22};
 VI.van={s:['vh_t_van_s0','vh_k_4_s','vh_k_5_s','vh_k_15_s'],f:['vh_t_van_f0','vh_k_4_f','vh_k_5_f','vh_k_15_f'],b:['vh_t_van_b0','vh_k_4_b','vh_k_5_b','vh_k_15_b'],ws:46,wf:22};
 VI.moto={s:R('vh_t_moto_s',0,3),f:R('vh_t_moto_f',0,3),b:R('vh_t_moto_b',0,3),ws:28,wf:12};
 VI.deliv={s:R('vh_t_deliv_s',0,2),f:R('vh_t_moto_f',0,3),b:R('vh_t_deliv_b',0,7),ws:28,wf:12};
 VI.bike={s:R('vh_t_bike_s',0,2),f:R('vh_t_bike_f',0,3),b:R('vh_t_bike_b',0,3),ws:22,wf:9};
 VI.racer={s:R('vh_t_racer_s',0,2),f:R('vh_t_racer_f',0,2),b:R('vh_t_racer_b',0,2),ws:44,wf:22};
 VI.rmoto={s:R('vh_t_rmoto_s',0,2),f:R('vh_t_rmoto_f',0,3),b:R('vh_t_rmoto_b',0,3),ws:30,wf:13};
 VI.alley={s:R('vh_a_s',0,11),f:R('vh_a_f',0,5),b:R('vh_a_b',0,11),ws:28,wf:12};
 for(let i=0;i<5;i++)VI['pbike'+i]={s:['vh_p_bike'+i+'_s'],f:['vh_p_bike'+i+'_f'],b:['vh_p_bike'+i+'_b'],ws:22,wf:9};
 for(let i=0;i<6;i++)VI['pmoto'+i]={s:['vh_p_moto'+i+'_s'],f:['vh_p_moto'+i+'_f'],b:['vh_p_moto'+i+'_b'],ws:i>=4?32:28,wf:i>=4?13:12};
 [37,42,52,46,42,48].forEach((w,i)=>{VI['pcar'+i]={s:['vh_p_car'+i+'_s'],f:['vh_p_car'+i+'_f'],b:['vh_p_car'+i+'_b'],ws:w,wf:23}})}
const VUC={};
function vuImg(key,w){const ck=key+'|'+w;if(VUC[ck])return VUC[ck];if(!uaOK(key))return null;const im=UAI[key],h=w*im.naturalHeight/im.naturalWidth,Q=3,c=document.createElement('canvas');
 c.width=Math.max(1,Math.round(w*Q));c.height=Math.max(1,Math.round(h*Q));const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,0,0,c.width,c.height);
 return VUC[ck]={img:c,w,h,gy:h-.5}}
function vuSpr(v){const kind=v.mdl||(v.k=='moto'&&v.bx?'deliv':v.k),P=VI[kind];if(!P)return null;const X=v.ax=='x',view=X?'s':(v.dir>0?'f':'b');
 let L=P[view];if(!L||!L.length)L=P.f||P.b;if(v.vi==null)v.vi=(Math.random()*997)|0;return vuImg(L[v.vi%L.length],view=='s'?P.ws:P.wf)}
{const _vs=vSpr;vSpr=function(v){return vuSpr(v)||_vs(v)}}
AV.forEach(v=>{v.mdl='alley'});
// 停車場：用停車場車款的正面／背面
function parkedSpr(h,back){const n=17,k='vh_k_'+(Math.abs(h)%n)+(back?'_b':'_f');return vuImg(k,22)}
// ── 主角的載具：車款 ──
const VMDL={bike:[['淑女車',380,1.5],['折疊車',680,1.5],['登山車',880,1.6],['電動車',1280,1.8],['公路車',1580,1.85]],
 moto:[['電動機車',2200,2.2],['90CC',2500,2.2],['125CC',2800,2.3],['150CC',3200,2.4],['輕型重機',4800,2.6],['大型重機',6800,2.75]]};
CARM.push(['hummer','悍馬車',18000]);
const CARIDX={hatch:0,car:1,pickup:2,suv:3,sport:4,hummer:5};
const vMdl=(t,o)=>{if(!o)return null;if(o.m==null)o.m=t=='car'?(CARIDX[o.k]??1):t=='moto'?2:0;return 'p'+t+o.m};
{const _po=vPlayerObj;vPlayerObj=function(){const o=_po(),t=p.ride;o.mdl=vMdl(t,st.veh[t]);return o}}
vDrawParked=function(c,t,o){const k=t=='car'?vK(t):t,d=vDims(k,o.ax);drawVeh(c,{k,mdl:vMdl(t,o),col:o.col,ax:o.ax,dir:o.dir,x:o.cx-d[0]/2,y:o.cy-d[1]/2,w:d[0],h:d[1]})};
vSpeed=function(){if(!p.ride)return 1;const o=st.veh[p.ride],L=VMDL[p.ride];return L&&o&&o.m!=null&&L[o.m]?L[o.m][2]:VRC[p.ride].m};
// 騎腳踏車／機車時把主角畫上去
{const _dp=drawPlayer;drawPlayer=function(c){_dp(c);if(!p.ride||p.ride=='car')return;try{const v=vPlayerObj(),sp=vuSpr(v);if(!sp)return;const X=v.ax=='x',seat=X?sp.h*.42:sp.h*.36;
  drawChar(c,{x:v.x+v.w/2-6-(X?v.dir*2:0),y:v.y+v.h-seat-8,dir:p.dir,mv:false,fr:0,lk:ALLEN,ph:NOW/1000,sit:1})}catch(e){}}}
// 購買：選車款
function vBuyColor(t,k,price){const V=VRC[t];
 if(t!='car'){const L=VMDL[t];return openDlg(`${V.i} 選擇車款`,'每一款騎起來的速度都不太一樣',L.map((m,i)=>[`${m[0]}　💰${m[1]}`,`速度 ×${m[2]}`,()=>vBuyDo(t,null,i,m[1]),st.money<m[1]]).concat([['返回','',cancel,0]]),true)}
 const i=CARIDX[k]??1;openDlg('🚗 確認購買',`${CARM.find(q=>q[0]==k)[1]}　💰${price}`,[['💳 確定購買','',()=>vBuyDo('car',k,i,price),st.money<price],['返回','',cancel,0]],true)}
function vBuyDo(t,k,m,price){if(st.money<price)return;st.money-=price;const V=VRC[t],z=Z.find(z=>z.n=='家'),b=z.b,hb=V.hb;let pos=null;const cand=[];
 for(let r=0;r<5;r++)for(let a=0;a<12;a++){const ang=a*Math.PI/6;cand.push([z.x+z.w/2+(t=='car'?60:t=='moto'?46:34)*Math.cos(ang)*(r?1+r*.3:1),b.bot+22+(t=='car'?26:14)*Math.abs(Math.sin(ang))+r*8])}
 cand.sort((u,w)=>Math.hypot(u[0]-(z.x+z.w/2+(t=='car'?60:40)),u[1]-(b.bot+24))-Math.hypot(w[0]-(z.x+z.w/2+(t=='car'?60:40)),w[1]-(b.bot+24)));
 for(const q of cand){const used=Object.values(st.veh).some(o=>o&&Math.hypot(o.cx-q[0],o.cy-q[1])<30);if(!used&&!vOnRoad(q[0],q[1])&&vFree(q[0],q[1],hb[0]+4,hb[1]+4)&&!NP.some(n=>!n.vh&&!n.hid&&hit({x:q[0]-hb[0]/2,y:q[1]-hb[1]/2,w:hb[0],h:hb[1]},n))){pos=q;break}}
 if(!pos)pos=[z.x+z.w/2+40,b.bot+30];
 st.veh[t]={cx:pos[0],cy:pos[1],col:'#ffffff',ax:'x',dir:1,rd:0,m};if(t=='car')st.veh.car.k=k;hud();closeDlg();SVDIRTY=1;
 const nm=t=='car'?CARM.find(q=>q[0]==k)[1]:VMDL[t][m][0];toast(`🎉 買了${nm}！停在你家門口，走過去按空白鍵騎乘`)}
// ── 室內：消防車、救護車、列車、捷安特展示牆 ──
{const fit=(key,c,x,y,w,h)=>{if(!uaOK(key))return false;const im=UAI[key],ww=w,hh=ww*im.naturalHeight/im.naturalWidth;c.fillStyle='rgba(0,0,0,.25)';c.fillRect(x+2,y+h,w,3);const sm=c.imageSmoothingEnabled;c.imageSmoothingEnabled=true;c.drawImage(im,x,y+h-hh,ww,hh);c.imageSmoothingEnabled=sm;return true};
 const E0=FD.engine,A0=FD.amb,T0=FD.train;
 FD.engine=(c,x,y,w,h,f)=>{fit('vh_i_engine',c,x,y,w,h)||E0(c,x,y,w,h,f)};
 FD.amb=(c,x,y,w,h,f)=>{fit('vh_i_amb',c,x,y,w,h)||A0(c,x,y,w,h,f)};
 FD.train=(c,x,y,w,h,f)=>{fit(typeof scene!='undefined'&&scene=='溫泉鄉站'?'vh_i_train2':'vh_i_train1',c,x,y,w,h)||T0(c,x,y,w,h,f)};
 const G=IN['捷安特'];if(G&&G.fur&&G.fur[0]&&G.fur[0][0]=='uaf'){G.fur[0]=['uaf',16,30,150,64,'vh_i_giant',{s:1,hm:1}]}}
// 路邊停放的機車、機車行展示車
{const keys=['vh_p_moto0_s','vh_p_moto1_s','vh_p_moto2_s','vh_p_moto3_s'];
 DEC.forEach((d,i)=>{if(!(d.__pk||(Math.abs(d.w-24)<.1&&Math.abs(d.h-15)<.1)))return;const S=vuImg(keys[i%4],22);if(!S)return;const bot=d.by!=null?d.by:d.y+d.h,cx=d.x+d.w/2;
  const c=document.createElement('canvas');c.width=S.img.width;c.height=S.img.height;const x=c.getContext('2d');if(i%2){x.translate(c.width,0);x.scale(-1,1)}x.drawImage(S.img,0,0);
  d.spr=c;d.__uk=keys[i%4];d.w=S.w;d.h=S.h;d.x=cx-S.w/2;d.y=bot-S.h;d.by=bot});
 const B0=FD.bikeI;FD.bikeI=(c,x,y,w,h,f)=>{const S=vuImg(keys[(x|0)%4],24);if(S)c.drawImage(S.img,x,y+15-S.h,S.w,S.h);else B0(c,x,y,w,h,f)}}
