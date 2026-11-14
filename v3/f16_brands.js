/* ===== v4.3：全家／家樂福 專屬內裝 ===== */
IT.teaegg={n:'茶葉蛋',i:'🥚',p:12,d:'全家招牌，滷得入味。使用：⚡+8 😊+3',u:{s:8,j:3}};PR.teaegg=12;
IT.oden={n:'關東煮',i:'🍢',p:35,d:'熱呼呼的湯頭。使用：⚡+14 😊+5',u:{s:14,j:5}};PR.oden=35;
IT.onigiri={n:'飯糰',i:'🍙',p:18,d:'早餐、消夜都適合。使用：⚡+12 😊+2',u:{s:12,j:2}};PR.onigiri=18;
IT.latte={n:'拿鐵咖啡',i:'☕',p:45,d:'現做咖啡。使用：⚡+18 😊+4',u:{s:18,j:4}};PR.latte=45;
function openShop(){shopDlg('🏪 全家',['teaegg','oden','onigiri','lunch','drink','latte','food','rose','tonic','deco'],petOpts())}
if(SHOP['家樂福'])SHOP['家樂福'].push('onigiri');
const _o=(c,x,y,w,h,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,7);c.fill()};
const BOT=['#e0443a','#2f80ed','#f2c230','#2a9d5c','#f0932b','#8a5aa8','#e0679a','#3ab5c8'];
FD.fcounter=(c,x,y,w,h,f)=>{R(c,x+1.5,y+h,w,2.6,'rgba(0,0,0,.22)');GR(c,x,y+6,w,h-6,'#f4f4ee','#cfcfc4');R(c,x,y+6,w,1.4,'#fff');R(c,x,y+h-6,w,2.6,'#00a040');R(c,x,y+h-3.4,w,2,'#1068c8');
 // 茶葉蛋鍋
 GR(c,x+5,y-2,24,10,'#6a3a20','#3a1e10');R(c,x+5,y-3,24,2,'#a8a8a8');for(let i=0;i<5;i++)_o(c,x+7+i*4.4,y-5,4.2,4.4,i%2?'#b87838':'#8a5420');R(c,x+9,y-9,1,3,'rgba(255,255,255,.55)');R(c,x+17,y-10,1,4,'rgba(255,255,255,.55)');R(c,x+24,y-9,1,3,'rgba(255,255,255,.55)');
 // 關東煮
 GR(c,x+34,y-1,24,9,'#c8ccd0','#8a9096');R(c,x+35,y-3,22,3,'#e8c870');for(let i=0;i<5;i++){R(c,x+37+i*4,y-8,.8,6,'#c9a050');R(c,x+36.2+i*4,y-8,2.4,2.6,['#f4f0e0','#d8a060','#e8e0c0','#b86a3a','#f4f0e0'][i])}
 // 收銀機
 R(c,x+w-20,y-6,13,8,'#2a2a30');R(c,x+w-18.4,y-5,10,4,'#9fd3ee');R(c,x+w-16,y+1.4,5,1,'#ddd');
 // 咖啡機
 R(c,x+w-34,y-8,10,10,'#3a3a40');R(c,x+w-33,y-7,8,3,'#00a040');R(c,x+w-31,y-2,4,3,'#f4f4f4')};
FD.fcooler=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,2.4,'rgba(0,0,0,.25)');R(c,x,y,w,h,'#dfe4e8');R(c,x,y,w,3.4,'#00a040');R(c,x,y+3.4,w,1.2,'#1068c8');GR(c,x+1.4,y+5.4,w-2.8,h-9,'#eefcff','#a8d8ec');
 for(let r=0;r<3;r++){const yy=y+6+r*((h-12)/3);R(c,x+1.4,yy+(h-12)/3-1,w-2.8,.9,'#8ab0c0');for(let j=x+2.4,k=r*3;j<x+w-4;j+=4.2,k++){const col=BOT[(k*3+r)%8],bh=(h-12)/3-3;R(c,j,yy+(h-12)/3-1-bh,3,bh,col);R(c,j+.6,yy+(h-12)/3-1-bh-1.6,1.8,1.8,'#f4f4f4');R(c,j,yy+(h-12)/3-1-bh*.6,3,1.6,'rgba(255,255,255,.7)')}}
 R(c,x+w/2-.4,y+5.4,.8,h-9,'#8a9096');R(c,x,y+h-3,w,3,'#8a9096')};
FD.snackg=(c,x,y,w,h,f)=>{R(c,x+1.5,y+h,w,2.6,'rgba(0,0,0,.25)');GR(c,x,y,w,h,'#eceae0','#bdb6a0');R(c,x,y,w,1.4,f[5]||'#00a040');
 for(let r=0;r<2;r++){const yy=y+3+r*((h-5)/2),hh=(h-5)/2-2;R(c,x+1,yy+hh+.4,w-2,1,'#9a9480');for(let j=x+2,k=r*5+((x/7)|0);j<x+w-5;j+=5.2,k++){const col=BOT[(k*5)%8];R(c,j,yy+hh-hh*.85,4.4,hh*.85,col);R(c,j,yy+hh-hh*.85,4.4,1,'rgba(255,255,255,.55)');R(c,j+1,yy+hh-hh*.55,2.4,2.2,'rgba(255,255,255,.7)');c.fillStyle='rgba(0,0,0,.18)';c.fillRect(j,yy+hh-hh*.85-1,4.4,1)}}
 R(c,x,y+h-2,w,2,'#8a8470')};
FD.bento=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,2.4,'rgba(0,0,0,.25)');R(c,x,y,w,h,'#dfe4e8');R(c,x,y,w,3,'#00a040');GR(c,x+1.4,y+4,w-2.8,h-7,'#f6fffc','#cfe8e0');
 for(let r=0;r<2;r++){const yy=y+5+r*((h-9)/2),hh=(h-9)/2-2;R(c,x+1.4,yy+hh+.6,w-2.8,.9,'#9ab8b0');for(let j=x+2.4,k=r*3;j<x+w-9;j+=8.4,k++){R(c,j,yy+hh-4.6,7,4.6,'#f4f4f0');R(c,j+.6,yy+hh-4,5.8,1.6,['#e0443a','#2a9d5c','#f2c230'][k%3]);R(c,j+.6,yy+hh-2.2,5.8,1.4,'#c8883a')}}
 R(c,x,y+h-3,w,3,'#8a9096')};
FD.ibon=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,2.4,'rgba(0,0,0,.25)');GR(c,x,y,w,h,'#f0f0ec','#c8c8c0');R(c,x,y,w,3,'#e0443a');R(c,x+3,y+6,w-6,h*.35,'#2a3a5a');R(c,x+4.4,y+7.4,w-8.8,h*.35-3,'#6ab0e8');R(c,x+3,y+h*.5,w-6,2,'#999');R(c,x+5,y+h*.62,w-10,3,'#fff')};
FD.mag=(c,x,y,w,h)=>{R(c,x+1.5,y+h,w,2.4,'rgba(0,0,0,.22)');GR(c,x,y,w,h,'#d8d0b8','#9a9078');for(let i=0,k=0;i<w-3;i+=4.4,k++){R(c,x+1.6+i,y+2,3.6,h-5,BOT[k%8]);R(c,x+1.6+i,y+2,3.6,3,'#fff')}R(c,x,y+h-2,w,2,'#7a7260')};
FD.stack=(c,x,y,w,h,f)=>{R(c,x+1.5,y+h,w,2.6,'rgba(0,0,0,.25)');R(c,x,y+h-3,w,3,'#8a6a3a');const n=Math.max(2,Math.floor(h/10));for(let r=0;r<n;r++){const yy=y+h-3-(r+1)*((h-3)/n),bw=w-(r%2)*3;GR(c,x+(r%2)*1.5,yy,bw,(h-3)/n-.4,'#c8964e','#a07434');R(c,x+(r%2)*1.5,yy,bw,.9,'rgba(255,255,255,.4)');R(c,x+bw/2-3,yy+1.6,7,Math.max(2,(h-3)/n-4),f[5]||'#e1251b')}};
const _fam=IN['全家'];
def('全家',{W:360,H:216,f:'#f2f2ea',g:'#e6e6dc',fl:'tile',w:'#e8f4ec',pre:(x,W,H)=>{R(x,0,16,W,3,'#00a040');R(x,0,19,W,2,'#1068c8')},
 fur:[['fcooler',20,30,52,40],['fcooler',76,30,52,40],['fcooler',132,30,52,40],['fcooler',188,30,52,40],['bento',246,34,50,34],['ibon',302,34,22,36],['atm',328,34,22,32],
  ['snackg',34,96,96,30,'#e0443a'],['snackg',34,132,96,30,'#f2c230'],['snackg',170,96,96,30,'#2f80ed'],['snackg',170,132,96,30,'#e0443a'],['fcounter',236,168,96,24],['stack',20,174,28,24,'#00a040']],
 ppl:[pp('店員',296,150,'#00a040','#222','歡迎光臨！需要結帳嗎？|茶葉蛋剛滷好，關東煮也熱了。|咖啡買五送一，了解一下？',{ou:'v',dir:0}),pp('顧客',196,178,'#e0679a','#222','我在挑便當。',{wk:[192,232]}),pp('顧客',60,186,'#2f80ed','#222','這個飲料有買一送一嗎？',{dir:0}),pp('顧客',236,84,'#f0b030','#6b3a1a','晚上總是要來買個消夜。',{wk:[200,260]})],sp:[['main',240,194,90,12]],title:'🏪 全家'});
const _cf=IN['家樂福'];
def('家樂福',{W:430,H:262,f:'#eef0f4',g:'#e0e4ea',fl:'tile',w:'#e8eef8',pre:(x,W,H)=>{R(x,0,16,W,3,'#0e4c9e');R(x,0,19,W,2,'#e1251b')},
 fur:[['freezer',20,30,60,34],['freezer',86,30,60,34],['freezer',152,30,60,34],['produce',230,38,60,22],['produce',296,38,60,22],['stack',372,34,38,34,'#0e4c9e'],
  ['snackg',30,92,106,30,'#0e4c9e'],['snackg',30,128,106,30,'#e1251b'],['snackg',160,92,106,30,'#e1251b'],['snackg',160,128,106,30,'#0e4c9e'],['snackg',290,92,106,30,'#0e4c9e'],['snackg',290,128,106,30,'#e1251b'],
  ['checkout',20,196,60,22],['checkout',100,196,60,22],['checkout',180,196,60,22],['cart',350,200,22,16],['cart',376,200,22,16],['stack',270,196,30,28,'#e1251b'],['stack',304,196,30,28,'#0e4c9e']],
 ppl:[pp('收銀員',46,178,'#0e4c9e','#222','請問有會員卡嗎？',{ou:'v',dir:0}),pp('收銀員',126,178,'#0e4c9e','#6b3a1a','謝謝光臨！',{ou:'v',dir:0}),pp('店員',60,72,'#e1251b','#222','需要幫忙嗎？',{ou:'v',wk:[30,200]}),pp('顧客',150,172,'#e0679a','#222','今天特價好多。',{dir:0,wk:[150,170]}),pp('顧客',250,76,'#2a9d5c','#222','推車好重啊。',{wk:[220,360]})],sp:[['main',20,224,220,12]],title:'🏬 家樂福'});

/* ===== 重點人物：❗標記、劉家宜日程與住家 ===== */
function frMark(id,x,y,inRoom){try{const s=FRS(id);if(!s.met||s.td!=dKey()){const f=inRoom?'bold 10px sans-serif':'bold 12px sans-serif';txt(g,'❗',x+1,y+1,'#000',f);txt(g,'❗',x,y,'#ffd84a',f)}}catch(e){}}
I['劉家宜的家']='🏡';
function yjWhere(){const d=dow(),h=T.hour,wd=d<=4;
 if(wd){if(h>=7&&h<8)return'全家';if(h>=17&&h<18)return'餐廳';if(h>=18&&h<23)return'劉家宜的家'}
 else{if(d==5&&h>=10&&h<16)return'咖啡店';if(h>=19.5&&h<23)return'劉家宜的家'}
 return null}
const yjMk=(x,y,o)=>pp('劉家宜',x,y,'#9cc4e4','#222','',{fr:'yijia',yj:1,still:1,dir:0,...o});
function yjPlace(name,rm,pos,o){rm.ppl=rm.ppl.filter(n=>!n.yj);if(yjWhere()==name)rm.ppl.push(yjMk(pos[0],pos[1],o))}
(()=>{const w=(n,pos,o,drop)=>{const r=IN[n],o0=r.onEnter;r.onEnter=rm=>{o0&&o0(rm);if(drop&&yjWhere()==n)rm.ppl=rm.ppl.filter(q=>!drop(q));yjPlace(n,rm,pos,o)}};
 w('全家',[274,130],{pose:'chat'});
 w('餐廳',[238,112],{sit:1,pose:'chat'},q=>q.n=='客人'&&q.x==238)})();
def('劉家宜的家',{W:320,H:200,f:'#e6d3b8',g:'#d9c4a4',fl:'wood',w:'#9a8ac8',
 fur:[['rug',92,92,130,64,'#7a6ab0'],['bed',18,34,70,46,'#8a7ad0'],['wardrobe',96,32,32,34],['tv',160,36,56,14],['sofa',150,128,80,26,'#6a5acd'],['desk',22,118,56,22,'#a08868'],['kitchen',232,32,80,24],['fridge',204,30,24,40],['bookcase',250,72,40,52],['plant',292,150,16,24],['window',20,6,0,0],['plant',20,158,16,24]],
 ppl:[],sp:[],title:'🏡 家宜的家',onEnter:rm=>{yjPlace('劉家宜的家',rm,[176,152],{sit:1,pose:'read'})}});

/* ===== 排程 NPC：即時走進／走出室內 ===== */
const YJPOS={'全家':[[274,130],{pose:'chat'}],'餐廳':[[238,112],{sit:1,pose:'chat'}],'劉家宜的家':[[176,152],{sit:1,pose:'read'}],'咖啡店':[[182,126],{sit:1,pose:'read'}]};
function npcPath(from,to){const S0=4,cw=Math.ceil(rm.W/S0),ch=Math.ceil(rm.H/S0),W=12,Hh=8,sol=rm.sol||[];
 const free=(cx,cy)=>{const x=cx*S0,y=cy*S0;if(x<5||y<30||x+W>rm.W-5||y+Hh>rm.H-3)return false;const r={x,y,w:W,h:Hh};return !sol.some(o=>hit(r,o))};
 const sx=Math.round(from[0]/S0),sy=Math.round(from[1]/S0);let gx=Math.round(to[0]/S0),gy=Math.round(to[1]/S0);
 const prev=new Int32Array(cw*ch).fill(-2),dq=[[sx,sy]];prev[sy*cw+sx]=-1;let best=null,bd=1e9;
 for(let h=0;h<dq.length;h++){const [cx,cy]=dq[h],d=Math.hypot(cx-gx,cy-gy);if(d<bd){bd=d;best=[cx,cy]}if(d<.5)break;
  for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+a,ny=cy+b;if(nx<0||ny<0||nx>=cw||ny>=ch||prev[ny*cw+nx]!=-2)continue;if(!free(nx,ny)&&!(nx==sx&&ny==sy))continue;prev[ny*cw+nx]=cy*cw+cx;dq.push([nx,ny])}}
 const out=[];let c=best[1]*cw+best[0];while(c>=0&&c!=-1){out.push([(c%cw)*S0,Math.floor(c/cw)*S0]);c=prev[c]}out.reverse();return out}
function yjSync(dt){if(!scene||!rm||!rm.ppl)return;const want=yjWhere()==scene,P=YJPOS[scene];if(!P)return;let n=rm.ppl.find(q=>q.yj);
 if(want&&!n){n=yjMk(rm.W/2-6,rm.H-14,{});n.fpose=P[1].pose;n.fsit=P[1].sit;n.dir=1;n.pose=undefined;n.sit=0;n.still=1;n.yjpath=npcPath([n.x,n.y],[P[0][0],P[0][1]]);n.yjpath.push([P[0][0],P[0][1]]);n.yjto=P[0];rm.ppl.push(n)}
 else if(!want&&n&&!n.yjleave){n.yjleave=1;n.yjpath=npcPath([n.x,n.y],[rm.W/2-6,rm.H-14]);n.yjpath.push([rm.W/2-6,rm.H-8]);n.pose=undefined;n.sit=0;n.yjto=null}
 rm.ppl.forEach(q=>{if(!q.yj||!q.yjpath)return;const t=q.yjpath[0];if(!t){q.yjpath=null;q.mv=false;if(q.yjleave){rm.ppl=rm.ppl.filter(z=>z!==q)}else{q.pose=q.fpose;q.sit=q.fsit;q.dir=0;if(q.yjto){q.x=q.yjto[0];q.y=q.yjto[1]}}return}
  const dx=t[0]-q.x,dy=t[1]-q.y,d=Math.hypot(dx,dy),v=34*dt;if(d<=v){q.x=t[0];q.y=t[1];q.yjpath.shift();return}
  q.x+=dx/d*v;q.y+=dy/d*v;q.mv=true;q.dir=Math.abs(dx)>=Math.abs(dy)*.6?(dx<0?2:3):(dy<0?1:0);q.at=(q.at||0)+dt;if(q.at>.2){q.at=0;q.fa=(q.fa||0)^1}})}
{const _u=updateIn;updateIn=function(dt){try{yjSync(dt)}catch(e){console.error(e)}return _u(dt)}}
