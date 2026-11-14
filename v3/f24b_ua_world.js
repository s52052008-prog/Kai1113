
/* v5.4 使用者自製素材：樹木、街道家具、區域圖（操場、池塘、噴水池）、自然裝飾 */
// ── 樹 ──
const UATREE={0:'t_oak',1:'t_sakura',2:'t_oak',3:'t_pine',4:'t_oak',5:'t_oak',6:'t_autumn',7:'t_yellow'};
function uaTree(c,t){const k=UATREE[t.k]||'t_oak';if(!uaOK(k))return false;const im=UAI[k],m=UAM[k],sc=(t.sc||1)*(k=='t_pine'?1.05:1),w=m[0]*sc*.92,h=m[1]*sc*.92;
 const wv=wx(),sw=Math.sin(NOW/(wv==3?260:1400)+t.x*.05)*(wv==3?.12:.015);
 c.save();c.translate(t.x+14,t.y+38);c.fillStyle='rgba(20,30,10,.22)';c.beginPath();c.ellipse(1,-2,w*.34,3.4,0,0,7);c.fill();c.transform(1,0,sw,1,0,0);c.drawImage(im,-w/2,-h,w,h);c.restore();return true}
// ── 街道家具：換成素材圖（底部置中對齊，保持比例）──
(function(){const SW=new Map([[lampSpr,'st_lamp'],[benchSpr,'st_bench'],[vendSpr,'st_vend'],[binSpr,'st_bin'],[mailSpr,'st_mail'],[plantSpr,'st_pot'],[busSpr,'st_bus']]);
 DEC.forEach(d=>{let k=SW.get(d.spr);if(!k&&d.w==76&&d.h==64)k='a_fountain';if(!k||!uaOK(k))return;const m=UAM[k];let w=m[0],h=m[1];
  if(k=='st_lamp'){h=d.h*1.02;w=h*m[0]/m[1]}if(k=='a_fountain'){w=84;h=w*m[1]/m[0]}
  const cx=d.x+d.w/2,bot=d.y+d.h;d.spr=UAI[k];d.x=cx-w/2;d.y=bot-h;d.w=w;d.h=h;d.by=bot})})();
// ── 區域大圖（在像素化後貼上）──
function uaPaintAreas(x){const P=(k,cx,bot,w)=>{if(!uaOK(k))return;const m=UAI[k],h=w*m.naturalHeight/m.naturalWidth;x.drawImage(m,cx-w/2,bot-h,w,h)};
 P('a_pond',FP.x+FP.w/2,FP.y+FP.h+8,FP.w+30);
 P('a_fountain',SX(927),150+22,64)}
// ── 自然裝飾點綴（灌木、花叢、岩石）──
function uaDec(k,cx,bot,w,solid){if(!uaOK(k))return;const m=UAM[k],h=w*m[1]/m[0];place(UAI[k],cx-w/2,bot-h,w,h,solid?[cx-w*.35,bot-6,w*.7,5]:null,bot)}
// ── 溫泉鄉：樹木、岩石、觀景台、旅館改用素材 ──
(function(){const T0={pine:FD.pine,maple:FD.maple,cherry:FD.cherry,rockb:FD.rockb,oinn:FD.oinn,deck:FD.deck,scope:FD.scope};
 const tree=(k,s)=>(c,x,y,w,h,f)=>{if(!uaOK(k))return false;const m=UAM[k],ww=m[0]*s,hh=m[1]*s,cx=x+w/2,b=y+h;c.fillStyle='rgba(20,30,10,.22)';c.beginPath();c.ellipse(cx+1,b-1,ww*.32,3,0,0,7);c.fill();c.drawImage(UAI[k],cx-ww/2,b-hh,ww,hh);return true};
 const P=tree('t_pine',.82),C=tree('t_sakura',.9),MR=tree('t_autumn',.8),MY=tree('t_yellow',.8);
 FD.pine=(c,x,y,w,h,f)=>{P(c,x,y,w,h,f)||T0.pine(c,x,y,w,h,f)};
 FD.cherry=(c,x,y,w,h,f)=>{C(c,x,y,w,h,f)||T0.cherry(c,x,y,w,h,f)};
 FD.maple=(c,x,y,w,h,f)=>{(f[5]=='y'?MY:MR)(c,x,y,w,h,f)||T0.maple(c,x,y,w,h,f)};
 FD.rockb=(c,x,y,w,h,f)=>{const k=['n_rock1','n_rock2','n_rock3'][Math.abs((x*7+y*3)|0)%3];if(!uaOK(k))return T0.rockb(c,x,y,w,h,f);const ww=w*1.7,hh=ww*UAM[k][1]/UAM[k][0];c.drawImage(UAI[k],x+w/2-ww/2,y+h-hh+2,ww,hh)};
 FD.oinn=(c,x,y,w,h,f)=>{if(!uaOK('b_onsen'))return T0.oinn(c,x,y,w,h,f);const ww=w*.96,hh=ww*UAM.b_onsen[1]/UAM.b_onsen[0];c.fillStyle='rgba(30,18,5,.28)';c.beginPath();c.ellipse(x+w/2+3,y+h-1,ww*.5,4,0,0,7);c.fill();c.drawImage(UAI.b_onsen,x+w/2-ww/2,y+h-hh+3,ww,hh)};
 FD.deck=(c,x,y,w,h,f)=>{if(!uaOK('a_view'))return T0.deck(c,x,y,w,h,f);const ww=w*1.3,hh=ww*UAM.a_view[1]/UAM.a_view[0];c.drawImage(UAI.a_view,x+w/2-ww/2,y+h-hh+8,ww,hh)};
 FD.scope=(c,x,y,w,h,f)=>{if(!uaOK('a_view'))T0.scope(c,x,y,w,h,f)};
 // 溫泉鄉點綴：木製道具、花叢、灌木
 const R0=IN['溫泉鄉'];if(R0&&R0.fur){const add=(k,x,y,w)=>R0.fur.push(['uadec',x,y,w,4,k]);
  [['r_sign',1030,470,22],['r_lantern',134,350,24],['r_barrel',640,334,18],['r_crate',660,336,18],['r_board',96,606,26],['r_pot',300,600,16],['r_pot',694,598,16],['r_bench',150,500,28],
   ['n_fhydr',420,400,28],['n_fdaisy',290,470,26],['n_fpink',140,640,28],['s_hydr',560,380,30],['s_white',720,380,30],['s_berry',1000,400,30],['n_fern',300,250,26],['n_grass1',740,250,26],
   ['n_stump',990,600,26],['n_log',880,640,36],['n_grass2',600,690,26],['n_fdaisy',820,690,24],['n_fpink',1000,520,24],['n_fern',60,480,26]].forEach(q=>add(q[0],q[1],q[2],q[3]))}
 FD.uadec=(c,x,y,w,h,f)=>{const k=f[5];if(!uaOK(k))return;const hh=w*UAM[k][1]/UAM[k][0];c.drawImage(UAI[k],x-w/2,y+h-hh,w,hh)};
 if(typeof FLAT!='undefined'&&FLAT.add)FLAT.add('uadec')})();
// ── 小鎮點綴：公園、花園、農場、操場周邊 ──
(function(){
 [['s_hydr',826,276,30],['s_white',1030,276,30],['n_fpink',990,92,24],['n_fdaisy',850,240,24],['s_berry',1030,180,28],
  ['s_hydr',1826,830,30],['s_white',2388,830,28],['s_berry',1826,1150,30],['n_fhydr',2388,1150,28],['n_fpink',2100,1150,26],['n_rock2',2380,1000,30],['n_fern',1990,1020,24],
  ['r_barrel',1560,930,16],['r_crate',1742,932,18],['r_sign',1300,860,18],['r_board',1520,1010,22],['r_pot',1740,846,14],['r_lantern',1312,1000,20],['n_stump',1800,1150,24],['n_log',1440,1150,32],
  ['n_fdaisy',20,268,22],['n_fpink',392,268,22],['s_white',404,96,26]].forEach(q=>uaDec(q[0],q[1],q[2],q[3]))})();
// ── v5.5 農場、公園、停車場點綴 ──
(function(){[['sc_055',1450,905,20,0],['sc_054',1538,978,28,1],['sc_053',1748,952,34,1],['sc_057',1550,1016,24,1],['sc_052',1300,1100,40,1],['sc_051',1760,1158,40,1],
 ['sc_027',927,288,44,0],['sc_020',870,262,36,1],['sc_028',1000,262,34,1],['sc_068',990,120,22,1],['sc_035',890,30,40,0],
 ['pf_045',262,1006,12,1],['pf_047',260,1062,6,1],['pf_046',20,1006,8,1]].forEach(q=>uaDec(q[0],q[1],q[2],q[3],q[4]))})();
