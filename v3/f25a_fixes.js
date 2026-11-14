/* v5.8 修正與新功能：操場/籃球場、路口圓角、主角站立比例、教會動線、對話優先、室內 NPC 走動、社福中心 */
// ── 1. 操場：只留一座運動場，右側改成完整的全場籃球場 ──
{const _pa=uaPaintAreas;uaPaintAreas=function(x){
 // 先把左側舊操場的上半部鋪成草皮與樹籬，避免看到兩座操場
 const FW=290,fx=FIELD.x,fb=FIELD.y+FIELD.h+2;
 x.fillStyle='#6fb84e';x.fillRect(fx-2,FIELD.y-2,FW+6,FIELD.h+6);
 for(let i=0;i<60;i++){x.fillStyle=['#62aa44','#7cc458','#5aa03e'][i%3];x.fillRect(fx+((i*53)%FW),FIELD.y+((i*37)%70),3,2)}
 // 運動場素材縮到左側
 if(uaOK('a_field')){const m=UAI.a_field,h=FW*m.naturalHeight/m.naturalWidth,cr=.81;x.drawImage(m,0,0,m.naturalWidth,m.naturalHeight*cr,fx,fb-h,FW,h*cr)}
 // 路口：四角改成圓弧轉角
 const asp=(px,py)=>{try{const d=S.getContext('2d').getImageData(Math.round(px*KS),Math.round((py+NY)*KS),1,1).data;return `rgb(${d[0]},${d[1]},${d[2]})`}catch(e){return '#4a4d52'}};
 const r=24;HRD.forEach(H=>VRD.forEach(V=>{const col=asp(V.x+8,H.y+8);
  [[V.x,H.y,-1,-1],[V.x+V.w,H.y,1,-1],[V.x,H.y+H.h,-1,1],[V.x+V.w,H.y+H.h,1,1]].forEach(([px,py,sx,sy])=>{
   x.fillStyle=col;x.beginPath();x.moveTo(px,py);x.lineTo(px+sx*r,py);x.arc(px+sx*r,py+sy*r,r,sy<0?(sx<0?0:Math.PI):(sx<0?0:Math.PI),sy<0?(sx<0?-Math.PI/2:-Math.PI/2):(sx<0?Math.PI/2:Math.PI/2),(sx<0)==(sy<0)?true:false);x.closePath();
   x.save();x.beginPath();x.rect(Math.min(px,px+sx*r),Math.min(py,py+sy*r),r,r);x.clip();
   x.beginPath();x.rect(Math.min(px,px+sx*r),Math.min(py,py+sy*r),r,r);x.arc(px+sx*r,py+sy*r,r,0,7,true);x.fill('evenodd');
   x.strokeStyle='#d8d2c4';x.lineWidth=1.4;x.beginPath();x.arc(px+sx*r,py+sy*r,r,0,7);x.stroke();x.restore()})}));
 _pa(x)}}
// 移除籃球場與小巷裡的樹與雜物
{const inR=(px,py,R0)=>px>R0[0]&&px<R0[0]+R0[2]&&py>R0[1]&&py<R0[1]+R0[3];const CLR=[[316,30,100,232],[2100,0,240,112],...AL.map(a=>[a.x-2,a.y-2,a.w+4,a.h+4])];
 for(let i=trees.length-1;i>=0;i--){const t=trees[i],bx=t.x+14,by=t.y+36;if(CLR.some(R0=>inR(bx,by,R0))){trees.splice(i,1);const j=solids.findIndex(o=>o.x==t.x+10&&o.y==t.y+28||o.x==t.x+8&&o.y==t.y+28);if(j>=0)solids.splice(j,1)}}
 for(let i=DEC.length-1;i>=0;i--){const d=DEC[i];if(d.__hoop)continue;const bx=d.x+d.w/2,by=d.y+d.h;if(AL.some(a=>inR(bx,by,[a.x,a.y,a.w,a.h]))&&!(d.w==16&&d.h==34)){DEC.splice(i,1);const j=solids.findIndex(o=>o.x>=d.x-2&&o.x<=d.x+d.w&&o.y>=d.y&&o.y<=d.y+d.h+4);if(j>=0)solids.splice(j,1)}}}
// ── 3. 主角與 NPC：站立時改用走路的「雙腳併攏」格，避免站著比走路時大一圈 ──
const STC={};
function standCol(key,row){const k=key+'|'+row;if(STC[k]!=null)return STC[k];const im=UAI[key];if(!im||!im.naturalWidth)return 0;
 try{const c=document.createElement('canvas');c.width=384;c.height=128;const x=c.getContext('2d');x.drawImage(im,0,row*128,384,128,0,0,384,128);const d=x.getImageData(0,0,384,128).data;let best=0,bw=999;
  for(let col=0;col<6;col++){let x0=99,x1=-1;for(let yy=100;yy<119;yy++)for(let xx=0;xx<64;xx++){if(d[(yy*384+col*64+xx)*4+3]>100){x0=Math.min(x0,xx);x1=Math.max(x1,xx)}}if(x1>=0&&x1-x0<bw){bw=x1-x0;best=col}}
  return STC[k]=best}catch(e){return STC[k]=0}}
// ── 4. 教會動線：移除擋住門口的盆栽 ──
{const C=IN['城光復興堂'];if(C&&C.fur){C.fur=C.fur.filter(f=>!(f[0]=='plant'&&f[1]==304&&f[2]==218))}}
// 對話優先順序：靠近主要角色時，優先跟人說話；面向的人優先
inAct=function(){const sp=spotNear(),fd=[[1,0],[0,-1],[-1,0],[0,1]][CHDIR[(p.dir|0)%8]]||[0,1];
 const sc=o=>{const dx=o.x-p.x,dy=o.y-p.y,d=Math.hypot(dx,dy);if(d>40||o.lying)return 999;let v=d;if(typeof o.fr=='string')v*=.55;if(o.own)v*=.8;if(o.dyn&&!o.fr&&!o.own&&o.sit)v*=1.6;if(d>0&&(dx*fd[0]+dy*fd[1])/d>.5)v*=.7;return v};
 const n=rm.ppl.filter(o=>sc(o)<999).sort((a,b)=>sc(a)-sc(b))[0];
 if(sp&&(!n||sc(n)>22)){const sf=rm.spf&&rm.spf[sp[0]];if(sf)return sf();if(sp[0]=='ring')return fightMenu();if(scene=='家')return openHome();if(scene=='全家')return openShop();return mainMenu(scene)}
 if(n){n.dir=Math.abs(p.x-n.x)>Math.abs(p.y-n.y)?(p.x<n.x?2:3):(p.y<n.y?1:0);n._pz=8;return talkIn(n)}
 if(sp)return inAct0(sp);toast('附近沒有可互動的對象')};
function inAct0(sp){const sf=rm.spf&&rm.spf[sp[0]];if(sf)return sf();return mainMenu(scene)}
// 室內 NPC：會在附近走動，然後停下來「做事」
const WANDER_SKIP=new Set(['餐廳','電影院','碳佐麻里','遊藝場']);
{const _ui=updateIn;updateIn=function(dt){_ui(dt);if(!rm||!rm.ppl||WANDER_SKIP.has(scene))return;
 const blk=(o,x,y)=>x<6||x+12>rm.W-6||y<32||y+8>rm.H-6||rm.sol.some(s=>x<s.x+s.w&&x+12>s.x&&y<s.y+s.h&&y+8>s.y)||(x<p.x+p.w&&x+12>p.x&&y<p.y+p.h&&y+8>p.y)||rm.ppl.some(q=>q!==o&&!q.t&&x<q.x+12&&x+12>q.x&&y<q.y+8&&y+8>q.y);
 rm.ppl.forEach(n=>{if(n.t||n.sit||n.lying||n.wk||n.wk2||n.r||n.q||n._wp||n.mode||n.noWander||n.n=='黃頌言')return;
  const P0=n._p0??(n._p0=n.pose||'');if(P0&&!['chat','wave','read','pray'].includes(P0))return;
  if(n.hx==null){n.hx=n.x;n.hy=n.y;n._pz=1+Math.random()*4}if(n.n&&/^(招待|信眾|觀眾)/.test(n.n))return;
  if(n._pz>0){n._pz-=dt;n.mv=false;if(n._pz<=0){let ok=0;for(let k=0;k<6&&!ok;k++){const a=Math.random()*6.283,r=10+Math.random()*26,tx=n.hx+Math.cos(a)*r,ty=n.hy+Math.sin(a)*r*.6;if(!blk(n,tx,ty)){n._tx=tx;n._ty=ty;ok=1}}if(!ok)n._pz=2+Math.random()*3;else n.pose=''}return}
  const dx=n._tx-n.x,dy=n._ty-n.y,d=Math.hypot(dx,dy);
  if(d<1.5||n._tx==null){n.mv=false;n._tx=null;n._pz=2.5+Math.random()*5;n.pose=Math.random()<.5?P0:(P0||(Math.random()<.4?'chat':''));n.dir=[0,1,2,3][(Math.random()*4)|0];if(Math.random()<.5)n.dir=0;return}
  const v=Math.min(d,16*dt),nx=n.x+dx/d*v,ny=n.y+dy/d*v;if(blk(n,nx,ny)&&!blk(n,n.x,n.y)){n._tx=null;n._pz=1.5+Math.random()*2;n.mv=false;return}
  n.x=nx;n.y=ny;n.mv=true;n.dir=Math.abs(dx)>=Math.abs(dy)?(dx<0?2:3):(dy<0?1:0)})}}
// ── 1. 社福中心（劉家宜的工作地點） ──
I['社福中心']='🤝';
def('社福中心',{W:400,H:240,f:'#e8eef0',g:'#dde6ea',fl:'tile',w:'#5a9aaa',title:'🤝 城光社會福利中心',
 fur:[['counter',150,64,100,20,'#7aa8b8'],['board',30,32,70,22],['wboard',280,6,100,22],['pcdesk',30,92,60,24],['chair',52,118,14,12],['pcdesk',110,92,60,24],['chair',132,118,14,12],
  ['cabinet',196,30,34,36],['bookcase',236,30,44,40],['wallv',290,60,6,120],['sofa',306,80,80,24,'#7aa8b8'],['ctable',318,110,56,16],['rug',304,140,84,56,'#e8c870'],['toybox',356,150,28,22],['blocks',318,170,28,14],
  ['wait',30,170,70,16],['wait',120,170,50,16],['water',200,170,14,22],['plant',16,200,16,26],['plant',370,200,16,26],['plant',270,170,16,24]],
 ppl:[],sp:[['main',150,86,100,12],['room',306,128,80,10]],spl:{room:'晤談室・兒童角'},spf:{room:()=>sccRoom()},
 onEnter:rm=>{const P=[pp('林主任',200,72,'#5a7a8a','#222','',{own:1,dir:0,lk:GL('elder',981),L:['我們中心服務獨居長輩、弱勢家庭和需要幫忙的孩子。','家宜是我們中心最用心的社工，常常加班到很晚。','志工永遠不嫌多，有空歡迎來幫忙。'],bub:['您好，需要協助嗎？','請先抽號碼牌喔～']}),
  pp('社工 阿芬',140,104,'#7aa8b8','#222','',{own:1,sit:1,dir:1,lk:GL('office',982),L:['今天要家訪三戶，跑得腳好痠。','個案紀錄寫不完……社工的宿命。'],bub:['（敲鍵盤）','電話響了～']}),
  pp('志工 阿姨',260,150,'#e8a060','#222','',{own:1,dir:0,lk:GL('elder',983),L:['我退休後每週來兩天，比在家看電視有意義多了！','這些物資是要送去給獨居長輩的。'],bub:['物資整理中～']}),
  pp('陳阿嬤',50,162,'#8a6a9a','#ddd','',{own:1,sit:1,dir:0,lk:GL('elder',984),L:['家宜那個囡仔真乖，每個禮拜都來看我。','我來領營養品，順便找人講講話。'],bub:['家宜在嗎？']}),
  pp('小朋友',336,160,'#f0b030','#222','',{own:1,dir:0,lk:GL('kid',985),L:['姊姊說寫完功課就可以玩積木！','我長大也要當社工！'],bub:['積木好好玩！']})];
  rm.ppl=P;yjPlace('社福中心',rm,[80,104],{sit:1,pose:'read',dir:1})}});
SP['社福中心']=()=>[['🙋 當一天志工','整理物資、陪長輩聊天・3 小時・⭐+5 😊+6 ⚡-12',()=>{fxApply({r:5,j:6,s:-12});advance(3);try{frAdd('yijia',2)}catch(e){}hud();closeDlg();toast('🤝 你幫忙打包了 40 份物資，長輩們一直說謝謝。')},st.sta<12],
 ['💝 捐款 $500','⭐+6 😊+5',()=>{if(st.money<500)return;st.money-=500;fxApply({r:6,j:5});hud();closeDlg();toast('💝 林主任：「這筆錢會用在獨居長輩的送餐服務，謝謝你！」')},st.money<500],
 ['📋 了解中心的服務','',()=>openDlg('📋 城光社福中心','・獨居長輩關懷訪視與送餐<br>・弱勢家庭與兒童課後陪伴<br>・心理諮商與資源轉介<br>・志工招募（隨時歡迎）<br><br>服務時間：平日 08:00–18:00',[['返回','',cancel]],true)]];
function sccRoom(){openDlg('🧸 晤談室・兒童角','安靜的小房間，牆上貼滿孩子們的畫。',[['🧸 陪小朋友玩積木','😊+8 ⚡-4・1 小時',()=>{fxApply({j:8,s:-4});advance(1);hud();closeDlg();toast('小朋友蓋了一座「超級教會」，還說你是「最棒的叔叔」。')},st.sta<4],['🗣️ 預約心理諮商（免費）','😊+12 🧠+1・1 小時',()=>{fxApply({j:12,w:1});advance(1);hud();closeDlg();toast('把心裡的話說出來，整個人輕鬆多了。')}],['離開','',closeDlg]])}
function yjWhere(){const d=dow(),h=T.hour,wd=d<=4;
 if(wd){if(h>=7&&h<8)return'全家';if(h>=8.5&&h<17)return'社福中心';if(h>=17&&h<18)return'餐廳';if(h>=18&&h<23)return'劉家宜的家'}
 else{if(d==5&&h>=10&&h<16)return'咖啡店';if(h>=19.5&&h<23)return'劉家宜的家'}
 return null}
if(FR.yijia){FR.yijia.where='平日 08:30–17:00 在「城光社福中心」上班（教會後面的小巷）；傍晚 17:00 在阿香炭烤吃飯，之後回家；週六白天在咖啡店。';FR.yijia.bio[0]=[0,'職業：城光社福中心社工（資歷五年）']}
