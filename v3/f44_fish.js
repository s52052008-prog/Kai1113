/* v9.3 釣魚（知本溪＋東海岸）與挖礦（溫泉東側礦場），以及完整圖鑑 */
const RAR=['普通','少見','稀有','傳說'],RARC=['#8a8a8a','#2a6ad0','#8a3ad0','#e89a10'];
const FISH=(()=>{const X=window.PKIDX&&PKIDX['33'];if(!X)return[];const R=[0,0,1,1,1,2,2,3,0,0,1,2,2,2,2,3,0,0,0,1,1,2,2,2,0,0,1,1,2,2,3,3];return X.nm.map((n,i)=>({n,i,r:R[i],w:i<16?'sea':'fresh'}))})();
const ORES=(()=>{const X=window.PKIDX&&PKIDX['38'];if(!X)return[];return X.nm.map((n,i)=>({n,i,r:Math.floor(i/10)}))})();
const FPRICE=[200,300,500,1500],OPRICE=[120,250,600,2000];
const catchS=()=>st.catch||(st.catch={f:{},o:{}});
const dexK=k=>{const D=dexS();return D[k]||(D[k]={})};
const wRand=(arr,wt)=>{const tot=arr.reduce((a,x)=>a+wt(x),0);let r=Math.random()*tot;for(const x of arr){r-=wt(x);if(r<=0)return x}return arr[arr.length-1]};
const pkImg=k=>{try{const c=UAI[k];return c&&c.width?c:null}catch(e){return null}};
// ───────── 小遊戲共用畫布 ─────────
function mgBox(title){window.TITLE=true;window.OVL=(window.OVL||0)+1;Object.keys(keys).forEach(k=>keys[k]=0);const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99990;background:rgba(10,6,2,.72);display:flex;align-items:center;justify-content:center';
 ov.innerHTML=`<div class="rpg" style="display:flex;flex-direction:column;align-items:center;gap:6px"><b class="rttl" style="font-size:16px">${title}</b><canvas width="720" height="520" style="width:min(88vw,480px);aspect-ratio:720/520;border-radius:8px;border:2px solid #6b4423;touch-action:none"></canvas><div class="mgtip" style="font-size:13px;color:#5a3417;text-align:center;min-height:36px"></div><div class="mgbt" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center"></div></div>`;
 document.body.appendChild(ov);const cv2=ov.querySelector('canvas');return{ov,cv:cv2,g:cv2.getContext('2d'),tip:ov.querySelector('.mgtip'),bt:ov.querySelector('.mgbt'),end(){ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL}}}
function mgButtons(M,list){M.bt.innerHTML='';list.forEach(q=>{const b=document.createElement('button');b.textContent=q[0];b.style.cssText='font:inherit;font-size:14px;background:#6b4423;color:#fff6dc;border:2px solid #24150a;border-radius:8px;padding:6px 14px;cursor:pointer';b.onclick=q[1];M.bt.appendChild(b)})}
// ───────── 釣魚 ─────────
function fishSpot(sea){const has=st.rod||(st.rodW==wkN());
 const o=[];if(!has){o.push(['🎣 租一支釣竿（💰200，這個週末都能用）','',()=>{st.money-=200;st.rodW=wkN();hud();fishSpot(sea)},st.money<200]);o.push(['🎣 買一支碳纖維釣竿（💰1,500）','永久使用，綠色收線區比較大，比較好釣',()=>{st.money-=1500;st.rod=2;hud();toast('🎣 買了碳纖維釣竿！');fishSpot(sea)},st.money<1500])}
 else o.push([sea?'🌊 拋竿（海釣）':'🎣 拋竿',`⚡-5・魚餌 1 個・每次約 25 分鐘（魚餌剩 ${st.bait||0} 個）`,()=>{if(!(st.bait>0))return toast('🪱 沒有魚餌了，先買一些吧');closeDlg();fishGame(sea)},st.sta<5||!(st.bait>0)]);
 o.push(['🪱 買魚餌 ×10（💰50）',`一個 5 元・身上有 ${st.bait||0} 個`,()=>{st.money-=50;st.bait=(st.bait||0)+10;hud();toast('🪱 買了 10 個魚餌');fishSpot(sea)},st.money<50]);
 if(!sea)o.push(['🚌 搭接駁車去東海岸海釣（💰150・來回 1 小時）','海水魚：鯛魚、石斑、龍蝦，還有傳說中的黑鮪魚',()=>{st.money-=150;advance(1);hud();closeDlg();toast('🚌 到了知本海岸，海風好舒服');setTimeout(()=>fishSpot(true),300)},st.money<150]);
 o.push(['🧺 看看我的漁獲','',()=>bagCatch(()=>fishSpot(sea))],['離開','',closeDlg]);
 openDlg(sea?'🌊 東海岸・堤防':'🎣 知本溪・河岸',(sea?'浪花一波波打上堤防，遠方有漁船。':'溪水清澈，看得到魚影在石頭間穿梭。')+`<br><span style="font-size:12px;opacity:.8">咬餌時馬上按空白鍵；收線時按住空白鍵（或滑鼠）讓綠色框框住魚，進度條滿了就釣到！</span>`,o)}
function fishGame(sea){const M=mgBox(sea?'🌊 海釣中……':'🎣 溪釣中……'),g=M.g,W2=720,H2=520;fxApply({s:-5});st.bait=Math.max(0,(st.bait||0)-1);advance(.4);hud();
 const pool=FISH.filter(f=>f.w==(sea?'sea':'fresh')),night=T.hour>=18||T.hour<5;
 const fish=wRand(pool,f=>[55,28,14,night?5:3][f.r]),big=st.rod==2;
 const S={ph:'wait',t:0,bite:1.4+Math.random()*3.2,zone:.5,zv:0,fy:.5,fv:0,ft:.5,prog:.3,hold:0,res:null};
 window._mgS=S;const zh=(big?.36:.3)-fish.r*.02,spd=[.35,.5,.7,.95][fish.r];
 const down=()=>{if(S.ph=='wait'){if(S.t>.3)finish('early');return}if(S.ph=='bite'){S.ph='reel';S.t=0;return}if(S.ph=='reel')S.hold=1};const up=()=>{S.hold=0};
 const kd=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)down()}else if(e.key=='Escape'){e.preventDefault();e.stopImmediatePropagation();finish(null)}},ku=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();up()}};
 OVK.add(kd);OVKU.add(ku);M.cv.addEventListener('pointerdown',down);addEventListener('pointerup',up);
 let last=performance.now(),raf;
 const finish=res=>{S.ph='done';S.res=res;cancelAnimationFrame(raf);OVK.delete(kd);OVKU.delete(ku);removeEventListener('pointerup',up);
  if(res=='got'){const C=catchS(),D=dexK('fi'),isNew=!D[fish.n];C.f[fish.n]=(C.f[fish.n]||0)+1;if(isNew)D[fish.n]=wkN();const cm=Math.round([22,34,48,90][fish.r]*(.7+Math.random()*.7));const rec=dexK('fz');if(!rec[fish.n]||cm>rec[fish.n])rec[fish.n]=cm;
   fxApply({j:[4,6,10,25][fish.r]});hud();SVDIRTY=1;if(fish.r>=2)try{feedPost('🎣 釣到'+fish.n+'！',cm+' 公分，'+RAR[fish.r]+'等級！',null)}catch(e){}
   drawCatch(g,W2,H2,'pk33_'+fish.i,fish.n,RAR[fish.r],RARC[fish.r],cm+' 公分'+(isNew?'　📖 新登錄！':''));M.tip.innerHTML=`釣到 <b>${fish.n}</b>！（${RAR[fish.r]}・可賣 💰${FPRICE[fish.r]}）`;fishReward()}
  else{g.fillStyle='rgba(0,0,0,.5)';g.fillRect(0,0,W2,H2);g.fillStyle='#fff';g.font='bold 40px sans-serif';g.textAlign='center';g.fillText(res=='early'?'太早拉竿，魚嚇跑了……':'魚跑掉了……',W2/2,H2/2);M.tip.textContent=res?'再試一次吧！':''}
  mgButtons(M,[[st.sta>=5&&st.bait>0?`🎣 再拋一次（魚餌剩 ${st.bait}）`:st.bait>0?'😮‍💨 太累了':'🪱 魚餌用完了',()=>{if(st.sta<5)return toast('體力不夠了');if(!(st.bait>0))return toast('🪱 沒有魚餌了');M.end();fishGame(sea)}],['收竿',()=>{M.end();fishSpot(sea)}]])};
 const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;
  // 背景
  const sky=g.createLinearGradient(0,0,0,H2);sky.addColorStop(0,sea?'#6ab8e8':'#7ac8a8');sky.addColorStop(1,sea?'#1a4a8a':'#2a6a5a');g.fillStyle=sky;g.fillRect(0,0,W2,H2);
  for(let i=0;i<14;i++){const y=60+i*34+Math.sin(S.t*1.5+i)*4;g.fillStyle='rgba(255,255,255,.12)';g.fillRect((i*97+S.t*30)%W2-60,y,120,3)}
  if(S.ph=='wait'||S.ph=='bite'){const bx=W2*.45,by=H2*.5+(S.ph=='bite'?Math.sin(S.t*40)*8+10:Math.sin(S.t*2)*4);
   g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();g.moveTo(W2,0);g.quadraticCurveTo(W2*.7,H2*.2,bx,by-14);g.stroke();
   g.fillStyle='#e83a2a';g.beginPath();g.arc(bx,by-8,10,Math.PI,0);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(bx,by-8,10,0,Math.PI);g.fill();
   g.strokeStyle='rgba(255,255,255,.5)';g.beginPath();g.ellipse(bx,by+2,30+(S.t*20)%20,6,0,0,7);g.stroke();
   if(S.ph=='wait'){M.tip.textContent='等魚上鉤……（不要太早按喔）';if(S.t>S.bite){S.ph='bite';S.t=0}}
   else{g.fillStyle='#ffd84a';g.font='bold 90px sans-serif';g.textAlign='center';g.fillText('！',bx+60,by-50);M.tip.innerHTML='<b style="color:#c0392b">咬餌了！快按空白鍵！</b>';if(S.t>.85)return finish('miss')}}
  else if(S.ph=='reel'){M.tip.textContent='按住空白鍵（或滑鼠）讓綠框往上，放開會往下。';
   // 魚的移動
   S.rest=(S.rest||0)-dt;if(S.rest<=0&&Math.abs(S.ft-S.fy)<.04){S.rest=.5+Math.random()*1.2/spd;S.ft=Math.max(.08,Math.min(.92,S.fy+(Math.random()-.5)*(.25+spd*.45)))}S.fv+=(S.ft-S.fy)*dt*spd*6;S.fv*=.86;S.fy=Math.max(0,Math.min(1,S.fy+S.fv*dt*2));
   S.zv+=((S.hold?-.9:.7)-S.zv)*Math.min(1,dt*6);S.zone+=S.zv*dt;if(S.zone<zh/2){S.zone=zh/2;S.zv=0}if(S.zone>1-zh/2){S.zone=1-zh/2;S.zv=0}
   const inz=Math.abs(S.fy-S.zone)<zh/2;S.prog+=(inz?.36:-.14)*dt*(fish.r==3?.85:1);
   const bx=W2/2-40,by=40,bh=H2-80;g.fillStyle='#3a2210';g.fillRect(bx-6,by-6,92,bh+12);g.fillStyle='#8ac8e8';g.fillRect(bx,by,80,bh);
   g.fillStyle=inz?'rgba(80,220,80,.75)':'rgba(80,200,80,.5)';g.fillRect(bx,by+(S.zone-zh/2)*bh,80,zh*bh);
   const fi=pkImg('pk33_'+fish.i);const fyp=by+S.fy*bh;if(fi){const w=70,h=w*fi.height/fi.width;g.drawImage(fi,bx+5,fyp-h/2,w,h)}else{g.fillStyle='#333';g.fillRect(bx+20,fyp-8,40,16)}
   g.fillStyle='#3a2210';g.fillRect(bx+100,by-6,28,bh+12);g.fillStyle=S.prog>.66?'#4ac84a':S.prog>.33?'#e8c030':'#e85a3a';g.fillRect(bx+104,by+bh*(1-S.prog),20,bh*S.prog);
   g.fillStyle='#fff';g.font='bold 22px sans-serif';g.textAlign='left';g.fillText(fish.r>=2?'💪 好大的力道！':'',bx+140,by+20);
   if(S.prog>=1)return finish('got');if(S.prog<=0)return finish('lost')}
  raf=requestAnimationFrame(loop)};
 raf=requestAnimationFrame(loop)}
function drawCatch(g,W2,H2,k,n,rr,col,line){g.fillStyle='rgba(255,248,232,.96)';g.fillRect(0,0,W2,H2);const im=pkImg(k);
 const glow=g.createRadialGradient(W2/2,H2*.42,10,W2/2,H2*.42,240);glow.addColorStop(0,col+'66');glow.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=glow;g.fillRect(0,0,W2,H2);
 if(im){const s=Math.min(300/im.width,220/im.height);g.drawImage(im,W2/2-im.width*s/2,H2*.42-im.height*s/2,im.width*s,im.height*s)}
 g.textAlign='center';g.fillStyle='#3a2210';g.font='bold 40px sans-serif';g.fillText(n,W2/2,H2*.8);g.fillStyle=col;g.font='bold 24px sans-serif';g.fillText('● '+rr+'　'+line,W2/2,H2*.89)}
function fishReward(){const D=dexK('fi'),R=dexS();R.rw=R.rw||{};[['sea','🌊 海水魚'],['fresh','🏞️ 淡水魚']].forEach(q=>{const all=FISH.filter(f=>f.w==q[0]);if(!R.rw['fi'+q[0]]&&all.every(f=>D[f.n])){R.rw['fi'+q[0]]=1;st.money+=8000;fxApply({j:20});setTimeout(()=>openDlg('🏆 '+q[1]+'圖鑑完成！','釣魚大師就是你！<br><br>💰 +8,000　😊 +20',[['好耶！','',closeDlg]]),1500)}})}
// ───────── 挖礦 ─────────
const MINEN=[[796,592],[852,578],[918,600],[978,588],[824,640],[892,652],[962,650]];
const mineS=()=>{const w=wkN();if(!st.mine||st.mine.w!=w)st.mine={w,dug:[]};return st.mine};
function mineSpot(){const M0=mineS(),left=MINEN.length-M0.dug.length,has=st.pick||(st.pickW==wkN());const o=[];
 if(!has){o.push(['⛏️ 租一把十字鎬（💰80，這個週末都能用）','',()=>{st.money-=80;st.pickW=wkN();hud();mineSpot()},st.money<80]);o.push(['⛏️ 買一把精鋼十字鎬（💰2,000）','永久使用，命中區比較大',()=>{st.money-=2000;st.pick=2;hud();toast('⛏️ 買了精鋼十字鎬！');mineSpot()},st.money<2000])}
 else o.push(['⛏️ 挖最近的礦石','⚡-4・約 12 分鐘',()=>{const i=mineNear();if(i<0)return toast('這週的礦石都挖完了，下個週末再來！');closeDlg();mineGame(i)},st.sta<4||!left]);
 o.push(['🧺 看看我的礦石','',()=>bagCatch(mineSpot)],['離開','',closeDlg]);
 openDlg('⛏️ 溫泉東側・礦場',`山壁旁的碎石坡，常有人挖到漂亮的礦石。<br>這個週末還有 <b>${left}</b> 顆礦石可以挖（每週末重新長出來）。<br><span style="font-size:12px;opacity:.8">游標在綠色區域時按空白鍵，敲三下就能挖開！</span>`,o)}
function mineNear(){const M0=mineS();let bi=-1,bd=1e9;MINEN.forEach((q,i)=>{if(M0.dug.includes(i))return;const d=Math.hypot(q[0]-p.x,q[1]-p.y);if(d<bd){bd=d;bi=i}});return bi}
function mineGame(ni){const M=mineS(),B2=mgBox('⛏️ 挖礦中……'),g=B2.g,W2=720,H2=520;fxApply({s:-4});advance(.2);hud();
 const ore=wRand(ORES,o=>[56,28,13,3][o.r]),zw=(st.pick==2?.2:.15)-ore.r*.015;
 const S={x:0,v:1.1+ore.r*.25,hits:0,sw:0,shake:0,ph:'dig',t:0,cz:.3+Math.random()*.4,msg:''};
 window._mgS=S;const hit=()=>{if(S.ph!='dig')return;S.sw++;const d=Math.abs(S.x-S.cz);if(d<zw/2){S.hits+=1;S.msg='💥 漂亮！';S.shake=.3}else if(d<zw){S.hits+=.5;S.msg='👍 還可以';S.shake=.15}else{S.msg='💨 打偏了';fxApply({s:-1});hud()}
  S.cz=.15+Math.random()*.7;if(S.hits>=3){S.ph='open';S.t=0}else if(S.sw>=7){S.ph='fail';S.t=0}};
 const kd=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)hit()}else if(e.key=='Escape'){e.preventDefault();e.stopImmediatePropagation();done()}};
 OVK.add(kd);B2.cv.addEventListener('pointerdown',hit);let last=performance.now(),raf;
 const done=()=>{cancelAnimationFrame(raf);OVK.delete(kd)};
 const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;S.shake=Math.max(0,S.shake-dt);
  const bg=g.createLinearGradient(0,0,0,H2);bg.addColorStop(0,'#5a4a3a');bg.addColorStop(1,'#2a2018');g.fillStyle=bg;g.fillRect(0,0,W2,H2);
  for(let i=0;i<30;i++){g.fillStyle='rgba(255,255,255,.05)';g.beginPath();g.ellipse((i*137)%W2,(i*89)%H2,20,10,0,0,7);g.fill()}
  const sx=(Math.random()-.5)*S.shake*40,sy=(Math.random()-.5)*S.shake*40;
  const st0=S.ph=='open'?'pk39_2':S.hits>0?'pk39_1':'pk39_0',im=pkImg(st0);if(im){const s=Math.min(260/im.width,230/im.height);g.drawImage(im,W2/2-im.width*s/2+sx,200-im.height*s/2+sy,im.width*s,im.height*s)}
  if(S.ph=='dig'){S.x+=S.v*dt;if(S.x>1){S.x=1;S.v*=-1}if(S.x<0){S.x=0;S.v*=-1}
   const bx=80,by=380,bw=W2-160;g.fillStyle='#1a120a';g.fillRect(bx-4,by-4,bw+8,44);g.fillStyle='#6a5a4a';g.fillRect(bx,by,bw,36);
   g.fillStyle='rgba(230,200,60,.8)';g.fillRect(bx+(S.cz-zw)*bw,by,zw*2*bw,36);g.fillStyle='rgba(80,220,80,.95)';g.fillRect(bx+(S.cz-zw/2)*bw,by,zw*bw,36);
   g.fillStyle='#fff';g.fillRect(bx+S.x*bw-3,by-10,6,56);
   g.fillStyle='#fff6dc';g.font='bold 24px sans-serif';g.textAlign='center';g.fillText(`${'⛏️'.repeat(Math.floor(S.hits))}${S.hits%1?'½':''}　還可以敲 ${7-S.sw} 下`,W2/2,by+80);if(S.msg)g.fillText(S.msg,W2/2,60);
   B2.tip.textContent='白色游標在綠色區域時按空白鍵（或點畫面）。綠色＝大成功，黃色＝半下。'}
  else if(S.ph=='open'){if(S.t>.7){done();const C=catchS(),D=dexK('or'),isNew=!D[ore.n];C.o[ore.n]=(C.o[ore.n]||0)+1;if(isNew)D[ore.n]=wkN();M.dug.push(ni);fxApply({j:[3,6,10,25][ore.r]});hud();SVDIRTY=1;
    if(ore.r>=2)try{feedPost('⛏️ 挖到'+ore.n+'！','在知本的礦場挖到'+RAR[ore.r]+'礦石！',null)}catch(e){}
    drawCatch(g,W2,H2,'pk38_'+ore.i,ore.n,RAR[ore.r],RARC[ore.r],isNew?'📖 新登錄！':'');B2.tip.innerHTML=`挖到 <b>${ore.n}</b>！（${RAR[ore.r]}・可賣 💰${OPRICE[ore.r]}）`;oreReward();
    mgButtons(B2,[['⛏️ 繼續挖',()=>{B2.end();const i=mineNear();if(i<0)return toast('這週的礦石都挖完了！');if(st.sta<4)return toast('體力不夠了');mineGame(i)}],['休息一下',()=>{B2.end()}]]);return}}
  else if(S.ph=='fail'){done();g.fillStyle='rgba(0,0,0,.5)';g.fillRect(0,0,W2,H2);g.fillStyle='#fff';g.font='bold 36px sans-serif';g.textAlign='center';g.fillText('石頭太硬，敲不開……',W2/2,H2/2);B2.tip.textContent='這顆礦石還在，休息一下再挑戰。';mgButtons(B2,[['再挑戰一次',()=>{B2.end();if(st.sta<4)return toast('體力不夠了');mineGame(ni)}],['先不要',()=>B2.end()]]);return}
  raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)}
function oreReward(){const D=dexK('or'),R=dexS();R.rw=R.rw||{};if(!R.rw.ore&&ORES.every(o=>D[o.n])){R.rw.ore=1;st.money+=10000;fxApply({j:20});setTimeout(()=>openDlg('🏆 礦石圖鑑完成！','連靈魂水晶都挖到了，你是知本最強礦工！<br><br>💰 +10,000　😊 +20',[['好耶！','',closeDlg]]),1500)}}
// ───────── 溫泉鄉：加上釣點、礦場、礦石圖示 ─────────
{const R=IN['溫泉鄉'];if(R){R.sp.push(['fish',282,430,40,160],['mine',770,560,240,120]);R.spl=R.spl||{};R.spl.fish='🎣 知本溪釣點';R.spl.mine='⛏️ 礦場';R.spf=R.spf||{};R.spf.fish=()=>fishSpot(false);R.spf.mine=mineSpot;
 const an=R.animf;R.animf=(g,t)=>{an&&an(g,t);try{const M0=mineS();MINEN.forEach((q,i)=>{const im=pkImg(M0.dug.includes(i)?'pk39_2':'pk39_0');if(!im)return;const w=26,h=w*im.height/im.width;g.drawImage(im,q[0]-w/2,q[1]-h+6,w,h)});
  g.fillStyle='rgba(255,255,255,.85)';g.font='bold 7px sans-serif';g.textAlign='center';g.fillText('🎣',304,428+Math.sin(t*2)*1.5);g.fillText('⛏️ 礦場',880,560)}catch(e){}}}}
// ───────── 漁獲・礦石：背包與收購 ─────────
function bagCatch(back){const C=catchS();const it=[];FISH.forEach(f=>{const n=C.f[f.n];if(n)it.push({img:pkSpr('33',f.i,64),n:f.n+' ×'+n,s:`<span style="color:${RARC[f.r]}">● ${RAR[f.r]}</span>・💰${FPRICE[f.r]}`})});
 const io=[];ORES.forEach(o=>{const n=C.o[o.n];if(n)io.push({img:pkSpr('38',o.i,56),n:o.n+' ×'+n,s:`<span style="color:${RARC[o.r]}">● ${RAR[o.r]}</span>・💰${OPRICE[o.r]}`})});
 picPanel('🧺 我的漁獲・礦石','可以到 <b>家樂福</b>（魚貨）或 <b>阿成五金行</b>（礦石）賣掉。',[{n:'🐟 漁獲',items:it.length?it:[{img:'',n:'還沒有漁獲',lock:1}]},{n:'⛏️ 礦石',items:io.length?io:[{img:'',n:'還沒有礦石',lock:1}]}],()=>false,{view:1,onClose:()=>{if(back)setTimeout(back,30)}})}
function sellMenu(kind,back){const C=catchS(),L=kind=='f'?FISH:ORES,P=kind=='f'?FPRICE:OPRICE,bag=C[kind],o=[];let tot=0;
 L.forEach(x=>{const n=bag[x.n];if(!n)return;tot+=n*P[x.r];o.push([`${x.n} ×${n}`,`${RAR[x.r]}・每個 💰${P[x.r]}`,()=>{st.money+=P[x.r];bag[x.n]--;if(!bag[x.n])delete bag[x.n];hud();toast(`賣掉一個${x.n}：💰+${P[x.r]}`);sellMenu(kind,back)}])});
 if(!o.length)return openDlg(kind=='f'?'🐟 魚貨收購':'💎 礦石鑑定收購','你身上沒有可以賣的'+(kind=='f'?'魚':'礦石')+'。',[['返回','',back||closeDlg]]);
 o.unshift(['💰 全部賣掉',`共 💰${tot.toLocaleString('en-US')}`,()=>{st.money+=tot;C[kind]={};hud();toast('全部賣掉了：💰+'+tot.toLocaleString('en-US'));(back||closeDlg)()}]);o.push(['返回','',back||closeDlg]);
 openDlg(kind=='f'?'🐟 魚貨收購':'💎 礦石鑑定收購',kind=='f'?'生鮮區的大叔：「新鮮的魚我們都收！稀有的價錢更好。」':'阿成老闆戴上放大鏡：「這顆成色不錯喔，我收！」',o)}
wrapSP('家樂福',o=>o.splice(1,0,['🐟 魚貨收購','把釣到的魚賣給生鮮區',()=>sellMenu('f',()=>mainMenu('家樂福'))]));
// 礦石改到五金行收購（f45）
// ───────── 圖鑑（完整版） ─────────
dexMenu=function(){const D=dexS(),A=animalsAll(),nl=Object.keys(D.lm).length,na=Object.keys(D.an).length,F=dexF(),nf=FOODS.filter(f=>F[f.id]).length,fi=dexK('fi'),nfi=FISH.filter(f=>fi[f.n]).length,orr=dexK('or'),no=ORES.filter(o=>orr[o.n]).length;
 openDlg('📖 圖鑑','拍照、吃美食、釣魚、挖礦都會登錄圖鑑。每一本收集完成都有獎勵！',[
  [`📍 景點打卡　${nl}/${LMS.length}`,nl>=LMS.length?'🏆 全部完成！':'打開手機相機拍景點',()=>dexList('lm')],[`🐾 動物　${na}/${A.length}`,na>=A.length?'🏆 全部完成！':'用相機拍動物',()=>dexList('an')],
  [`🍜 美食　${nf}/${FOODS.length}`,'咖啡店、阿香炭烤、碳佐麻里、家樂福美食街、山莊食堂、自己下廚',dexFood],
  [`🐟 魚類　${nfi}/${FISH.length}`,'知本溪釣淡水魚，東海岸釣海水魚',dexFish],[`⛏️ 礦石　${no}/${ORES.length}`,'知本溫泉東側礦場',dexOre],
  ['🧺 我的漁獲・礦石','',()=>bagCatch(dexMenu)],['返回','',phoneHome]])};
function dexFood(){const F=dexF();picPanel('🍜 美食圖鑑',`已吃過 ${FOODS.filter(f=>F[f.id]).length}/${FOODS.length} 道`,Object.keys(FDS).map(sid=>{const L=FOODS.filter(f=>f.sid==sid);return{n:`${FDS[sid]} ${L.filter(f=>F[f.id]).length}/${L.length}`,items:L.map(f=>F[f.id]?{img:pkSpr(sid,f.i,64),n:f.n,s:'第 '+F[f.id]+' 週末'}:{img:pkSpr(sid,f.i,64,1),n:'？？？',s:''})}}),()=>false,{view:1,onClose:()=>setTimeout(dexMenu,30)})}
function dexFish(){const D=dexK('fi'),Z2=dexK('fz');picPanel('🐟 魚類圖鑑','知本溪：淡水魚　東海岸：海水魚　（晚上傳說魚比較容易出現）',[['sea','🌊 海水魚'],['fresh','🏞️ 淡水魚']].map(q=>{const L=FISH.filter(f=>f.w==q[0]);return{n:`${q[1]} ${L.filter(f=>D[f.n]).length}/${L.length}`,items:L.map(f=>D[f.n]?{img:pkSpr('33',f.i,72),n:f.n,s:`<span style="color:${RARC[f.r]}">● ${RAR[f.r]}</span>・最大 ${Z2[f.n]||'?'} 公分`}:{img:pkSpr('33',f.i,72,1),n:'？？？',s:`<span style="color:${RARC[f.r]}">● ${RAR[f.r]}</span>`})}}),()=>false,{view:1,onClose:()=>setTimeout(dexMenu,30)})}
function dexOre(){const D=dexK('or');picPanel('⛏️ 礦石圖鑑','知本溫泉東側礦場，每個週末會長出新的礦石。',[0,1,2,3].map(r=>{const L=ORES.filter(o=>o.r==r);return{n:`${['⚪','🔵','🟣','👑'][r]} ${RAR[r]} ${L.filter(o=>D[o.n]).length}/${L.length}`,items:L.map(o=>D[o.n]?{img:pkSpr('38',o.i,60),n:o.n,s:''}:{img:pkSpr('38',o.i,60,1),n:'？？？',s:''})}}),()=>false,{view:1,onClose:()=>setTimeout(dexMenu,30)})}
