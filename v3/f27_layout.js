/* ===== v7.5 小鎮重新規劃：拓寬街區、建築間留出通道、停車場、運動中心、50燃、垃圾桶 =====
   作法：載入時仍以舊座標繪製地面，最後在 worldLayout() 依 XCUTS 把底圖切段平移（插入新空間），
   並把所有世界資料（建築、裝飾、NPC、車道…）換算到新座標；建築與門前步道延後到重排後再畫。 */
const LAYOUT_NEWX={'全家':169,'診所':308,'咖啡店':516,'書局':638,'新興高中':573,'電影院':1200,
 '派出所':1519,'銀行':1712,'劉家宜的家':1892,'消防局':2040,'城光復興堂':2291,'社福中心':2321,
 '鹽酥雞':966,'路邊攤':1056,'臭豆腐':1176,'珍珠奶茶':1286,'牛排':966,'蒙古烤肉':1076,'小火鍋':1182,'蚵仔煎':1288,
 '旅館':1511,'餐廳':1687,'賓士展示中心':1839,'捷安特':1950,'遊藝場':2044,'寵物店':2261,'服飾店':2442,'公寓':624};
// 小巷：舊 x → 新 x（以舊位置辨識）
const LAYOUT_AL={394:458,408:518,1657:1862,1800:2004,2040:2252};
function worldLayout(){
 const LOTS=[];const band=bot=>bot<=330?[0,302]:bot<=720?[438,692]:[800,WH];
 const vis=b=>b.ua?b.ua.w:b.w;
 [...B,...BD].forEach(b=>{const nx=LAYOUT_NEWX[b.n];if(nx==null)return;const cx=b.x+b.w/2,hw=vis(b)/2+4,[t,bt]=band(b.bot);
  let y0=Math.max(t,b.bot-240),y1=Math.min(bt,b.bot+46);if(b.n=='社福中心'){y0=0;y1=92}if(b.n=='城光復興堂')y0=93;
  LOTS.push({x0:cx-hw,x1:cx+hw,y0,y1,dx:nx-SX(b.x)})});
 AL.forEach(a=>{const nx=LAYOUT_AL[a.x];if(nx==null)return;LOTS.push({x0:a.x-3,x1:a.x+a.w+3,y0:a.y-24,y1:a.y+a.h+24,dx:nx-SX(a.x)})});
 LOTS.sort((a,b)=>(a.x1-a.x0)*(a.y1-a.y0)-(b.x1-b.x0)*(b.y1-b.y0));
 const lotOf=(x,y)=>{for(const L of LOTS)if(x>=L.x0&&x<=L.x1&&y>=L.y0&&y<=L.y1)return L;return null};
 const MX=(x,y)=>{const L=lotOf(x,y==null?-1:y);return SX(x)+(L?L.dx:0)};
 const DONE=new WeakSet();const once=o=>{if(!o||typeof o!='object'||DONE.has(o))return false;DONE.add(o);return true};
 // 矩形：落在建築範圍內→跟著建築；跨越切線→拉寬；碰到舊世界右緣→延伸到新世界右緣
 const rect=(o,kx='x',kw='w',ky='y',kh='h')=>{if(!once(o))return;const x=o[kx],w=o[kw]||0,y=o[ky]||0,h=o[kh]||0;const L=lotOf(x+w/2,y+h/2);
  if(L){o[kx]=SX(x)+L.dx;return}let nx=SX(x),nr=SX(x+w);if(x+w>=OWW-.5&&x<OWW)nr=WW;o[kx]=nx;if(kw in o)o[kw]=nr-nx};
 const obj=o=>{if(!once(o))return;const x=o.x,w=o.w||0,y=o.y||0,h=o.h||0,cx=x+w/2,L=lotOf(cx,y+h/2);o.x=(L?SX(cx)+L.dx:SX(cx))-w/2};
 const rectA=a=>{if(!once(a))return;const x=a[0],w=a[2],y=a[1],h=a[3];const L=lotOf(x+w/2,y+h/2);if(L){a[0]=SX(x)+L.dx;return}let nx=SX(x),nr=SX(x+w);if(x+w>=OWW-.5&&x<OWW)nr=WW;a[0]=nx;a[2]=nr-nx};
 const pt=(o,kx='x',ky='y')=>{if(!once(o))return;o[kx]=MX(o[kx],o[ky])};
 const ptA=(a,i=0)=>{if(!once(a))return;a[i]=MX(a[i],a[i+1])};
 // ── 建築 ──
 const oldAL=AL.map(a=>({x:a.x,y:a.y,w:a.w,h:a.h,v:a.v}));
 [...B,...BD].forEach(b=>{if(!once(b))return;const nx=LAYOUT_NEWX[b.n];b.x=nx!=null?nx:SX(b.x)});
 Z.forEach(z=>{if(!once(z))return;const b=z.b;z.x=b.x+b.dx-b.dw/2-6});
 // ── 道路、區域 ──
 VRD.forEach(v=>{if(once(v))v.x=SX(v.x)});
 IXS.forEach(q=>{if(!once(q))return;q.x=SX(q.x);q.cxl=SX(q.cxl);q.cxr=SX(q.cxr)});
 HEADS.forEach(h=>pt(h));
 [FIELD,PARK,FARM,GARDEN,F,MARKET,FP,COOP,SHEEP].forEach(o=>rect(o));if(FIELD.cx!=null)FIELD.cx=SX(FIELD.cx);FIELD.w=300;
 PAVE.forEach(rectA);
 // 小巷：移除最南邊那條（星辰、小石頭家門口不再直接是路）
 AL.forEach(a=>{if(!once(a))return;const nx=LAYOUT_AL[a.x];if(nx!=null)a.x=nx;else{const nx2=SX(a.x),nr=SX(a.x+a.w);a.x=nx2;if(a.v==0)a.w=nr-nx2}});
 {const i=AL.findIndex(a=>a.v==0&&a.y==1132);if(i>=0)AL.splice(i,1)}
 {const a7=AL.find(a=>a.v==0&&a.y==72);if(a7){a7.x=2252;a7.w=2321+190-2252}}
 // ── 裝飾、碰撞、樹 ──
 DEC.forEach(obj);solids.forEach(obj);trees.forEach(obj);FNS.forEach(obj);PL.forEach(obj);
 SPOTS.forEach(obj);
 LAMPS.forEach(a=>ptA(a));BULBS.forEach(a=>ptA(a));plantsAt.forEach(a=>ptA(a));WIN.forEach(a=>ptA(a));SIGNS.forEach(a=>ptA(a));
 WS.forEach(a=>{if(!once(a))return;a[0]=MX(a[0],a[1]);a[2]=MX(a[2],a[3])});
 // ── 行人路網、NPC ──
 GNL.forEach(n=>pt(n));
 NP.forEach(n=>{if(!once(n))return;n.x=MX(n.x,n.y);if(Array.isArray(n.r))rectA(n.r);if(typeof n.cx=='number')n.cx=MX(n.cx,n.cy);if(n.tg&&!GNL.includes(n.tg))pt(n.tg)});
 // ── 車道、車輛 ──
 LN.forEach(l=>{if(!once(l))return;if(l.ax=='y')l.c=SX(l.c);(l.stops||[]).forEach(st=>{if(l.ax=='x')st.pos=SX(st.pos);if(st.zone)obj(st.zone)});
  (l.v||[]).forEach(v=>{if(!once(v))return;if(l.ax=='x')v.p=SX(v.p);if(typeof v.x=='number')v.x=SX(v.x)})});
 TR.forEach(v=>{if(!once(v))return;if(v.ax=='x'&&typeof v.p=='number')v.p=SX(v.p);if(typeof v.x=='number')v.x=SX(v.x)});
 for(let i=AV.length-1;i>=0;i--){const v=AV[i],al=v.al;if(!al){continue}if(!once(al))continue;
  v._oc=al.c;if(v.ax=='y'){const o=oldAL.findIndex(a=>a.v&&Math.abs(a.x+a.w/2-al.c)<2);if(o>=0){const nx=LAYOUT_AL[oldAL[o].x];al.c=(nx!=null?nx:SX(oldAL[o].x))+oldAL[o].w/2}else al.c=SX(al.c)}
  else{if(oldAL.some(a=>!a.v&&a.y==1132&&Math.abs(a.y+a.h/2-al.c)<3)){AV.splice(i,1);continue}al.a0=SX(al.a0);al.a1=SX(al.a1)}
  if(v.lane&&once(v.lane))v.lane.c=v.ax=='y'?al.c:SX(v.lane.c);
  if(typeof v.x=='number')v.x=v.ax=='y'?v.x+(al.c-(v._oc||al.c)):SX(v.x)}
 pt(p);if(typeof PET!='undefined')pt(PET);if(typeof CAM!='undefined')CAM.x=SX(CAM.x);
 // 移出世界的東西
 const inW=o=>o.x<WW+40;for(const A of [DEC,solids,trees]){for(let i=A.length-1;i>=0;i--)if(!inW(A[i]))A.splice(i,1)}
 for(let i=LAMPS.length-1;i>=0;i--)if(LAMPS[i][0]>WW+20)LAMPS.splice(i,1);
 // 重新整理：路樹、路中雜物、操場入口長椅
 layoutCleanup();
 // 新建築
 layoutNewBuildings();
 // ── 底圖：切段平移＋補新空間 ──
 layoutPaint(oldAL);
}
// 路樹不要太密、不要擋門口；馬路上的雜物移除；操場入口淨空
function layoutCleanup(){
 const asphalt=(x,y)=>HRD.some(h=>y>h.y+2&&y<h.y+h.h-2)||VRD.some(v=>x>v.x+2&&x<v.x+v.w-2);
 const doorZone=(x,y)=>Z.some(z=>x>z.x-22&&x<z.x+z.w+22&&y>z.y-14&&y<z.y+70);
 const inBld=(x,y)=>[...B,...BD].some(b=>{const vw=b.ua?b.ua.w:b.w,cx=b.x+b.w/2;return x>cx-vw/2-6&&x<cx+vw/2+6&&y>b.bot-60&&y<b.bot+6});
 const city=(x,y)=>!(x>FIELD.x&&x<FIELD.x+FIELD.w&&y<FIELD.y+FIELD.h+12)&&!(x>PARK.x-8&&x<PARK.x+PARK.w+8&&y<PARK.y+PARK.h+8)&&!(y>FARM.y-4&&x>FARM.x-8);
 const dropSolid=(x,y,w,h)=>{const i=solids.findIndex(o=>Math.abs(o.x-x)<3&&Math.abs(o.y-y)<3&&Math.abs(o.w-w)<.6&&Math.abs(o.h-h)<.6);if(i>=0)solids.splice(i,1)};
 let k=0;for(let i=trees.length-1;i>=0;i--){const t=trees[i],bx=t.x+14,by=t.y+36;let kill=asphalt(bx,by)||doorZone(bx,by)||inBld(bx,by);
  if(!kill&&city(bx,by)){k++;if(k%2==0)kill=true}
  if(kill){trees.splice(i,1);if(t.k!=5)dropSolid(t.x+10,t.y+28,9,8);else dropSolid(t.x+8,t.y+28,13,6)}}
 // 馬路上的雜物（垃圾桶、盆栽、柱子…）
 for(let i=DEC.length-1;i>=0;i--){const d=DEC[i],cx=d.x+d.w/2,by=d.by||d.y+d.h;if(asphalt(cx,by-2)&&d.w<40){DEC.splice(i,1)}}
 for(let i=solids.length-1;i>=0;i--){const o=solids[i];if(o.w<20&&o.h<20&&asphalt(o.x+o.w/2,o.y+o.h/2))solids.splice(i,1)}
 // 建築門口前方淨空（路燈、盆栽等）
 const door=(x,y)=>Z.some(z=>x>z.x-6&&x<z.x+z.w+6&&y>z.y-2&&y<z.y+50);
 for(let i=DEC.length-1;i>=0;i--){const d=DEC[i],cx=d.x+d.w/2,by=d.by||d.y+d.h;if(door(cx,by-2))DEC.splice(i,1)}
 for(let i=solids.length-1;i>=0;i--){const o=solids[i];if(o.w<30&&o.h<20&&door(o.x+o.w/2,o.y+o.h/2))solids.splice(i,1)}
 for(let i=LAMPS.length-1;i>=0;i--){if(door(LAMPS[i][0],LAMPS[i][1]+30))LAMPS.splice(i,1)}
 // 操場入口（原本有長椅擋住）
 const ent=[160,236,262,316];
 for(let i=DEC.length-1;i>=0;i--){const d=DEC[i],cx=d.x+d.w/2,by=d.by||d.y+d.h;if(cx>ent[0]&&cx<ent[1]&&by>ent[2]&&by<ent[3])DEC.splice(i,1)}
 for(let i=solids.length-1;i>=0;i--){const o=solids[i],cx=o.x+o.w/2,cy=o.y+o.h/2;if(cx>ent[0]&&cx<ent[1]&&cy>ent[2]&&cy<ent[3])solids.splice(i,1)}
 // 原籃球場附近（改建運動中心）的雜物
 for(const A of [DEC,trees]){for(let i=A.length-1;i>=0;i--){const d=A[i],cx=d.x+d.w/2,by=d.y+d.h;if(cx>326&&cx<512&&by>40&&by<300){A.splice(i,1)}}}
 for(let i=solids.length-1;i>=0;i--){const o=solids[i],cx=o.x+o.w/2,cy=o.y+o.h/2;if(cx>326&&cx<512&&cy>40&&cy<258&&o.w<60)solids.splice(i,1)}
}
// ── 新建築：高雄運動中心、50燃 ──
function layoutNewBuildings(){
 const sc=bl('高雄運動中心',344,262,150,176,'sport',{c:'#e8eef2',r:'#1f6fb8',sg:'高雄運動中心',hr:[6,22],dw:30});
 Z.push({n:sc.n,b:sc,x:sc.x+sc.dx-sc.dw/2-6,y:sc.bot,w:sc.dw+12,h:10});sol(sc.x,sc.y+60,sc.w,sc.h-60);
 const dk=bl('50燃',692,990,84,86,'drink',{c:'#fff7e8',r:'#1f6fb8',sg:'50燃',hr:[10,23],dw:22},BD);sol(dk.x,dk.y+30,dk.w,dk.h-30);
 SPOTS.push({x:dk.x+dk.w/2-22,y:dk.bot-4,w:44,h:28,n:'🥤 50燃（點飲料）',fn:drinkMenu});
 if(typeof BN!='undefined'){BN[sc.n]=sc;BN[dk.n]=dk}
 I[sc.n]='🏟️';I['50燃']='🥤';
}
// ── 底圖繪製 ──
function layoutPaint(oldAL){
 const k=KS,x=s,tmp=document.createElement('canvas');tmp.width=S.width;tmp.height=S.height;tmp.getContext('2d').drawImage(S,0,0);
 x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,S.width,S.height);
 const SEG=[[0,650,0],[650,1200,144],[1200,1806,192],[1806,WW-240,240]];
 SEG.forEach(([a,b,d])=>{const sx=Math.round(a*k),sw=Math.round(b*k)-sx,dx=Math.round((a+d)*k);x.drawImage(tmp,sx,0,sw,S.height,dx,0,sw,S.height)});
 const copy=(sx,dx,w,y0,y1)=>{x.setTransform(1,0,0,1,0,0);const a=Math.round(sx*k),b=Math.round(dx*k),ww=Math.round(w*k),yy=Math.round((y0+NY)*k),hh=Math.round((y1-y0)*k);x.drawImage(S,a,yy,ww,hh,b,yy,ww,hh)};
 x.setTransform(k,0,0,k,0,NY*k);
 const paveF=(x0,y0,x1,y1,ox,oy,c1,c2)=>{x.save();x.beginPath();x.rect(x0-.6,y0,x1-x0+1.2,y1-y0);x.clip();const sx=ox+Math.floor((x0-ox)/16)*16,sy=oy+Math.floor((y0-oy)/16)*16;paveTile(x,sx,sy,x1-sx+16,y1-sy+16,c1||'#c9c6bd',c2||'#c0bdb2');x.restore();x.setTransform(k,0,0,k,0,NY*k)};
 const H1=HRD[0],H2=HRD[1],b1=[H1.y-SWK,H1.y+H1.h+SWK],b2=[H2.y-SWK,H2.y+H2.h+SWK];
 // 三段新空間
 [[650,794,506],[1344,1392,1296],[1998,2046,1950]].forEach(([a,b,src])=>{copy(src-2,a-1,b-a+2,b1[0],b1[1]);copy(src-2,a-1,b-a+2,b2[0],b2[1]);x.setTransform(k,0,0,k,0,NY*k)});
 paveF(330,90,794,b1[0],324,90);paveF(650,b1[1],794,b2[0],0,438);paveF(650,b2[1],794,WH,0,800);
 paveF(1344,70,1392,b1[0],1184,56);paveF(1344,b1[1],1392,b2[0],946,438);paveF(1344,b2[1]+6,1392,WH,946,806,'#cfc2a8','#c6b89c');
 paveF(1998,70,2046,b1[0],1504,70);paveF(1998,b1[1],2046,b2[0],1504,438);paveF(1998,b2[1]+12,2046,WH,1998,812);
 // 東側延伸
 paveF(2640,70,WW,b1[0],1504,70);paveF(2640,b1[1],WW,b2[0],1504,438);paveF(2640,b2[1]+12,WW,WH,2640,812);
 // 移除最南小巷、搬移的小巷：先鋪回地磚再畫
 paveF(0,1130,822,WH,0,800);paveF(952,1150,1394,WH,946,806,'#cfc2a8','#c6b89c');paveF(1502,1158,WW,WH,1504,1158);
 const cover={394:[394,438,420,692,0,438],1657:[1849,96,1875,262,1504,70],1800:[1992,96,2064,262,1504,70],2040:[2280,100,2306,262,1504,70]};
 oldAL.forEach(a=>{const c=cover[a.x];if(c)paveF(c[0],c[1],c[2],c[3],c[4],c[5])});
 paveF(2270,72,2570,100,1504,70);
 AL.forEach(a=>{if(LAYOUT_AL_SET.has(a))paintAL(a)});
 {const a7=AL.find(a=>a.v==0&&a.y==72);if(a7)paintAL(a7)}
 // 運動中心前廣場（原籃球場）
 // 停車場
 parkLot(668,1040,122,220,'v','碳佐麻里停車場');parkLot(960,1172,420,112,'h','火車站停車場');
 {const x0=2580,y0=112,w=190,h=184,c=s;R(c,x0-3,y0-3,w+6,h+6,'#2a6a5a');R(c,x0,y0,w,h,'#3a8a7a');R(c,x0+8,y0+8,w-16,h-16,'#4a9a8a');for(let i=0;i<120;i++)R(c,x0+8+rnd()*(w-16),y0+8+rnd()*(h-16),1.6,1,'rgba(255,255,255,.06)');c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=1.5;c.strokeRect(x0+8,y0+8,w-16,h-16);c.beginPath();c.moveTo(x0+8,y0+h/2);c.lineTo(x0+w-8,y0+h/2);c.stroke();c.beginPath();c.arc(x0+w/2,y0+h/2,18,0,7);c.stroke();[[y0+8,0],[y0+h-8,1]].forEach(([by,b])=>{c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=1.5;c.beginPath();c.arc(x0+w/2,by,30,b?Math.PI:0,b?Math.PI*2:Math.PI);c.stroke();R(c,x0+w/2-14,b?by-4:by,28,4,'#e8e8e8');c.strokeStyle='#ff6a2a';c.lineWidth=2;c.beginPath();c.arc(x0+w/2,b?by-10:by+10,5,0,7);c.stroke()});R(c,x0+w/2-44,y0+h/2+22,88,13,'rgba(255,246,220,.92)');txt(c,'教會多功能球場',x0+w/2,y0+h/2+31.5,'#2a6a5a','bold 8px sans-serif')}
 parkLot(2630,470,140,210,'v','停車場');
 parkLot(2652,840,120,440,'v','花園停車場');
 parkLot(2000,840,44,430,'v1','');
 // 建築與門前步道（新位置）
 paintDoorPaths();paintBldgs();
 x.setTransform(k,0,0,k,0,NY*k);
}
const LAYOUT_AL_SET=new Set();
{const _wl=worldLayout;worldLayout=function(){AL.forEach(a=>{if(LAYOUT_AL[a.x]!=null)LAYOUT_AL_SET.add(a)});return _wl.apply(this,arguments)}}
// 停車場：柏油、白線、P 標誌、停好的車
function parkLot(x0,y0,w,h,mode,name){const c=s;GR(c,x0,y0,w,h,'#55595f','#4b4f55');LTX(c,'lt_21',x0,y0,w,h,24);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(x0,y0,w,h);
 for(let i=0;i<w*h/60;i++)R(c,x0+rnd()*w,y0+rnd()*h,1.6,1,i%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)');
 c.strokeStyle='rgba(240,240,232,.85)';c.lineWidth=1;c.strokeRect(x0+1,y0+1,w-2,h-2);
 const sw=26,sh=40;const rows=mode=='v1'?[[y0+6,0]]:[[y0+6,0],[y0+h-sh-6,1]];const cols=mode=='v1'?1:Math.floor((w-8)/sw);
 const kinds=['suv','hatch','sport','pickup'],cols2=['#d33a3a','#3a7bd5','#e8e8e8','#222','#9aa0a6','#2a9d5c','#f0b030'];
 const slots=[];if(mode=='v1'){for(let yy=y0+6;yy+sh<=y0+h-6;yy+=sh+6)slots.push([x0+(w-sw)/2,yy,0])}
 else rows.forEach(([yy,back])=>{for(let i=0;i<cols;i++)slots.push([x0+4+i*sw,yy,back])});
 slots.forEach(([sx,sy,back],i)=>{R(c,sx,sy,1,sh,'rgba(240,240,232,.8)');R(c,sx+sw,sy,1,sh,'rgba(240,240,232,.8)');R(c,sx,back?sy+sh:sy,sw+1,1,'rgba(240,240,232,.8)');
  const h0=(sx*7+sy*13+i*31)|0;if(h0%5==0)return;const kd=kinds[h0%kinds.length],col=cols2[(h0>>2)%cols2.length];
  try{const spr=(typeof parkedSpr=='function'&&parkedSpr(h0,!!back))||carFront(kd,col,!!back);const dx=sx+(sw-spr.w)/2+1,dy=sy+(sh-spr.h)/2+2;c.drawImage(spr.img,dx,dy,spr.w,spr.h);sol(dx+3,dy+spr.h*.45,spr.w-6,spr.h*.5)}catch(e){}});
 if(mode!='v1'){const px=x0+w-14,py=y0+h/2-8;R(c,px+5,py+8,1.6,12,'#555');RR(c,px,py,12,12,2,'#1f5fbf');txt(c,'P',px+6,py+9.5,'#fff','bold 9px sans-serif');if(name)txt(c,name,x0+w/2,y0+h/2+3,'rgba(255,255,255,.55)','bold 6px sans-serif')}}
// ── 新建築外觀 ──
STY.sport=b=>{const{x,y,w,h}=b;wallBody(b,'#e8eef2','tile');roofFlat(b,'#1f6fb8',12);
 // 四層：B1 游泳池、1F 籃球場、2F 健身房、3F 瑜伽教室
 const fl=[['3F 瑜伽教室','#8a5aa8'],['2F 健身房','#d62828'],['1F 籃球場','#e8742a']];
 fl.forEach((f,i)=>{const fy=y+18+i*40;R(s,x+6,fy,w-12,32,'rgba(20,40,60,.08)');for(let j=0;j<5;j++)win(x+12+j*27,fy+6,20,18,{nm:b.n,g1:'#d8f0ff',g2:'#8ac4e8'});R(s,x+6,fy+30,w-12,2,f[1]);txt(s,f[0],x+w-26,fy+4,f[1],'bold 5px sans-serif')});
 signBoard(x+w/2-50,y+3,100,11,'高雄運動中心','#1f6fb8','#fff',7.4,{bd:'#fff'});
 glassFront(x+8,y+h-36,b.dx-b.dw/2-12,30,{inside:'#cfe8f8',nm:b.n});glassFront(x+b.dx+b.dw/2+4,y+h-36,w-b.dx-b.dw/2-12,30,{inside:'#cfe8f8',nm:b.n});
 doorGlass(b,{dh:28,frame:'#1f6fb8'});txt(s,'B1 游泳池 ↓',x+24,y+h-40,'#1f6fb8','bold 4.6px sans-serif')};
STY.drink=b=>{const{x,y,w,h}=b;wallBody(b,'#fff7e8','plaster');roofFlat(b,'#1f6fb8',9);
 signBoard(x+4,y+11,w-8,16,'50燃','#1f6fb8','#fff',10,{bd:'#fff'});
 R(s,x+4,y+32,w-8,6,'#1f6fb8');for(let i=0;i<w-8;i+=8)R(s,x+4+i,y+32,4,6,'#fff');
 glassFront(x+6,y+42,w-12,30,{inside:'#fff3d6',nm:b.n,fr:'#1f6fb8'});
 R(s,x+8,y+h-12,w-16,10,'#e8dcc4');R(s,x+8,y+h-12,w-16,1.4,'#1f6fb8');txt(s,'點餐 ▸',x+w/2,y+h-5,'#1f6fb8','bold 5px sans-serif');
 [[x+14,'#c89a5a'],[x+24,'#7a4a2a'],[x+w-24,'#e8c86a'],[x+w-14,'#4a8a3a']].forEach(([cx,c])=>{R(s,cx-2,y+48,4,9,c);R(s,cx-2,y+48,4,1.4,'#fff');R(s,cx-.4,y+44,.8,4,'#222')})};
// ── 50燃 飲料 ──
const DRINKS=[['四季春青茶',30,{j:3,s:4}],['珍珠奶茶',60,{j:6,s:6}],['波霸紅茶拿鐵',65,{j:6,s:6}],['8冰綠',50,{j:5,s:5}],['冰淇淋紅茶',50,{j:6,s:4}],['檸檬綠',50,{j:5,s:5}],['烏龍瑪奇朵',60,{j:6,s:5}]];
function drinkMenu(){if(!bHour({hr:[10,23]}))return openDlg('🥤 50燃','店員正在收攤：「我們營業到晚上 11 點喔～」',[['離開','',closeDlg]]);
 const o=DRINKS.map(d=>[`🧋 ${d[0]}　💰${d[1]}`,'甜度冰塊可調・😊+'+d[2].j,()=>{if(st.money<d[1])return toast('💸 錢不夠');sweetPick(d)},st.money<d[1]]);
 o.push(['離開','',closeDlg]);openDlg('🥤 50燃・點餐','店員：「歡迎光臨 50燃！今天要喝什麼？」',o)}
function sweetPick(d){const S0=['正常甜','少糖','半糖','微糖','無糖'],I0=['正常冰','少冰','微冰','去冰','溫的'];
 openDlg('🥤 '+d[0],'「甜度冰塊呢？」',[['半糖少冰','最多人點的',()=>buyDrink(d,'半糖少冰')],['微糖去冰','健康一點',()=>buyDrink(d,'微糖去冰')],['正常甜正常冰','爽快！',()=>buyDrink(d,'全糖全冰')],['隨便幫我配','',()=>buyDrink(d,S0[Math.random()*5|0]+I0[Math.random()*5|0])]])}
function buyDrink(d,o){st.money-=d[1];fxApply(d[2]);advance(.25);hud();closeDlg();if(typeof boxPrep=='function'&&boxPrep()&&/全糖|正常甜/.test(o)){st.box.junk++;toast('⚠️ 備賽期間喝全糖飲料……比賽狀態下降！')}else toast(`🧋 ${d[0]}（${o}）——好喝！`)}
// ── 垃圾桶：靠近按 A 顯示宣導 ──
const BIN_TIPS=['垃圾不分藍綠，垃圾不落地！','寶特瓶要先倒乾淨、壓扁再回收喔。','紙餐盒要先刮掉廚餘，才能回收。','電池、燈管請拿到便利商店回收箱，不要丟進垃圾桶。','廚餘要分「生廚餘」跟「熟廚餘」，晚上垃圾車來時分開倒。','鋁罐、鐵罐、玻璃瓶都是資源，請分類回收。','塑膠袋洗乾淨也可以回收喔！'];
function binTalk(){openDlg('🗑️ 垃圾桶','<b>「垃圾不分藍綠、垃圾不落地」</b><br>做好資源回收與分類，讓小鎮更乾淨！<br><br>💡 '+pick0(BIN_TIPS,(NOW/4000|0)+((p.x*3)|0)),[['好！','',()=>{closeDlg();if(Math.random()<.3){fxApply({r:1});hud();toast('♻️ 你順手撿起地上的寶特瓶丟進回收桶（⭐+1）')}}]])}
function layoutBins(){
 // 既有垃圾桶加上互動
 DEC.forEach(d=>{const isBin=(typeof UAI!='undefined'&&d.spr===UAI.st_bin)||d.spr===binSpr;if(isBin)SPOTS.push({x:d.x-6,y:(d.by||d.y+d.h)-10,w:d.w+12,h:18,n:'🗑️ 垃圾桶',fn:binTalk})});
 // 人行道新增垃圾桶（避開門口、路口）
 const H1=HRD[0],H2=HRD[1],ys=[H1.y-8,H1.y+H1.h+18,H2.y-8,H2.y+H2.h+18];
 const nearDoor=x0=>Z.some(z=>x0>z.x-26&&x0<z.x+z.w+26),nearX=x0=>VRD.some(v=>x0>v.x-60&&x0<v.x+v.w+60);
 ys.forEach((yy,i)=>{for(let xb=120+(i%2)*90;xb<WW-60;xb+=300){const x0=[0,22,-22,44,-44].map(d=>xb+d).find(x0=>!nearDoor(x0)&&!nearX(x0)&&!solids.some(o=>Math.abs(o.x+o.w/2-x0)<14&&Math.abs(o.y-yy)<14));if(x0==null)continue;
  if(typeof uaDec=='function'&&uaOK('st_bin'))uaDec('st_bin',x0,yy,11,1);else place(binSpr,x0-4,yy-11,9,11,[x0-4,yy-6,9,6]);
  SPOTS.push({x:x0-12,y:yy-10,w:24,h:18,n:'🗑️ 垃圾桶',fn:binTalk})}})}
{const _wl=worldLayout;worldLayout=function(){const r=_wl.apply(this,arguments);try{layoutBins()}catch(e){console.error(e)}return r}}
