/* v11.9 幻境 Online：第二章「臭臭森林」（蝙蝠・哥布林・小樹精・頭目腐敗樹王）、隊友裝備、合成工坊、精簡大廳、傳送門／回復泉像素化、環境粒子與顆粒感 */
// ───────── 章節 ─────────
const VCH=[{n:'綠綠草原',f0:1,f1:5,mobs:['slime','wolf','shroom'],boss:'boss',th:'grass',lv:'Lv.2～10'},{n:'臭臭森林',f0:6,f1:10,mobs:['bat','goblin','treant'],boss:'tking',th:'forest',lv:'Lv.10～20'}];
const vrCh=f=>VCH[Math.max(0,Math.min(VCH.length-1,Math.floor((f-1)/10)))];
// ───────── 新怪物 ─────────
VMOB.boss.boss=1;
Object.assign(VMAT,{wing:['蝙蝠翅膀',28],fang:['哥布林牙',27],bark:['樹皮',25]});
Object.assign(VMOB,{
 bat:{n:'吸血蝙蝠',hits:3,atk:1,r:14,spd:90,exp:1.2,drop:[['wing',.4]],col:'#7a4aa0',fly:1,fo:10,el:'poison',d:'在你頭上盤旋，翅膀一收就俯衝下來。看到牠停住就快翻滾！（屬性：☠️毒，怕風）'},
 goblin:{n:'哥布林',hits:4.5,atk:1.15,r:15,spd:95,exp:1.4,drop:[['fang',.35]],col:'#7ac050',fo:15,el:'fire',d:'會丟冒火的炸彈，炸彈落地會爆炸。靠近一點牠就不丟了。（屬性：🔥火，怕水）'},
 treant:{n:'小樹精',hits:7,atk:1.25,r:18,spd:28,exp:1.7,drop:[['bark',.45]],col:'#8a5a2a',fo:18,el:'wind',d:'走很慢但很耐打。舉手的時候，你腳下會冒出樹根，看到地上有咖啡色圈圈快跑。（屬性：🌪️風，怕火）'},
 tking:{n:'腐敗樹王',hits:80,atk:1.7,r:52,spd:40,exp:10,drop:[['bark',1],['wing',1]],col:'#6a8a3a',boss:1,fo:26,el:'wind',d:'臭臭森林的頭目。會放一整排樹根、甩葉子刀、叫蝙蝠幫忙，還會整棵樹跳起來砸地。血剩一半會暴走。（屬性：🌪️風，怕火）'}});
// ───────── 像素顆粒（在既有像素上加一點明暗雜點） ─────────
function vaGrain(cv,amt,seed){const x=cv.getContext('2d'),d=x.getImageData(0,0,cv.width,cv.height),a=d.data,r=vaRnd(seed||7);for(let i=0;i<a.length;i+=4){if(!a[i+3]||r()>.3)continue;const v=(r()-.5)*amt*2;a[i]=Math.max(0,Math.min(255,a[i]+v));a[i+1]=Math.max(0,Math.min(255,a[i+1]+v));a[i+2]=Math.max(0,Math.min(255,a[i+2]+v))}x.putImageData(d,0,0);return cv}
// ───────── 新怪物精靈圖 ─────────
function vaBat(fr,fl){const k='bt'+fr+fl;if(VA[k])return VA[k];const C=fl?['#fff','#eee','#fff','#999']:['#5a3a7a','#7a4aa0','#b48ad8','#24102e'];
 return VA[k]=vaPix(36,24,x=>{const up=!fr;[[-1],[1]].forEach(([s])=>{const cx=18;x.fillStyle=C[1];x.beginPath();x.moveTo(cx+s*4,12);x.lineTo(cx+s*16,up?2:19);x.lineTo(cx+s*13,up?7:15);x.lineTo(cx+s*10,up?5:18);x.lineTo(cx+s*8,up?9:14);x.closePath();x.fill();x.fillStyle=C[2];x.beginPath();x.moveTo(cx+s*5,12);x.lineTo(cx+s*13,up?5:16);x.lineTo(cx+s*9,up?8:14);x.closePath();x.fill()});
  x.fillStyle=C[0];x.beginPath();x.arc(18,13,6.5,0,7);x.fill();x.beginPath();x.moveTo(13,9);x.lineTo(13,2);x.lineTo(17,8);x.fill();x.beginPath();x.moveTo(23,9);x.lineTo(23,2);x.lineTo(19,8);x.fill();x.fillStyle='#ff9ac0';x.fillRect(14,5,1,2);x.fillRect(22,5,1,2);
  x.fillStyle=C[2];x.beginPath();x.ellipse(18,16,3.5,2.5,0,0,7);x.fill();x.fillStyle='#fff';x.fillRect(15,11,3,3);x.fillRect(19,11,3,3);x.fillStyle='#1a1024';x.fillRect(16,12,2,2);x.fillRect(20,12,2,2);x.fillStyle='#fff';x.fillRect(17,17,1,2);x.fillRect(19,17,1,2);x.fillStyle='#ff8aa8';x.fillRect(13,15,2,1);x.fillRect(22,15,2,1)},C[3])}
function vaGoblin(st,fl){const k='gb'+st+fl;if(VA[k])return VA[k];const C=fl?['#fff','#fff','#ddd','#999','#eee','#ddd']:['#7ac050','#a8e070','#4a8a30','#1e3412','#8a5a2a','#5a3a18'];
 return VA[k]=vaPix(30,34,x=>{const run=st.startsWith('run')?+st.slice(3):-1,th=st=='throw';
  x.fillStyle=C[5];x.fillRect(11+(run==0?-2:run==1?2:0),27,4,6);x.fillRect(17+(run==0?2:run==1?-2:0),27,4,6);x.fillStyle='#3a2410';x.fillRect(10+(run==0?-2:run==1?2:0),32,6,2);x.fillRect(17+(run==0?2:run==1?-2:0),32,6,2);
  x.fillStyle=C[4];x.beginPath();x.roundRect(9,18,13,11,3);x.fill();x.fillStyle='#3a2410';x.fillRect(9,24,13,2);x.fillStyle='#ffd84a';x.fillRect(15,24,2,2);
  x.fillStyle=C[0];x.fillRect(7,19,3,7);if(th){x.fillRect(21,8,3,11);x.fillStyle='#2a2a2a';x.beginPath();x.arc(23,7,3.5,0,7);x.fill();x.fillStyle='#ff8a3a';x.fillRect(24,1,2,3);x.fillStyle='#ffe04a';x.fillRect(25,0,1,1)}
  else{x.fillRect(21,19,3,7);x.fillStyle='#8a5a2a';x.save();x.translate(23,25);x.rotate(.5);x.fillRect(-1.5,-2,4,12);x.fillStyle='#6a4220';x.fillRect(-2.5,6,6,5);x.restore()}
  x.fillStyle=C[0];x.beginPath();x.ellipse(15,11,8,7.5,0,0,7);x.fill();x.beginPath();x.moveTo(8,10);x.lineTo(1,5);x.lineTo(8,14);x.fill();x.beginPath();x.moveTo(22,10);x.lineTo(29,5);x.lineTo(22,14);x.fill();x.fillStyle=C[1];x.beginPath();x.ellipse(12,7,3,2,-.4,0,7);x.fill();
  x.fillStyle='#fff6c0';x.fillRect(12,9,3,4);x.fillRect(17,9,3,4);x.fillStyle='#1a1a24';x.fillRect(14,10,1,2);x.fillRect(19,10,1,2);x.fillStyle=C[2];x.fillRect(11,7,4,1);x.fillRect(17,7,4,1);
  x.fillStyle='#3a1a10';x.fillRect(13,15,6,2);x.fillStyle='#fff';x.fillRect(14,15,1,1);x.fillRect(17,15,1,1);x.fillStyle='#ff8aa8';x.fillRect(9,13,2,1);x.fillRect(21,13,2,1)},C[3])}
function vaTreant(big,cast,fl,angry,fr){const k='tr'+big+cast+fl+angry+fr;if(VA[k])return VA[k];const S=big?2.5:1,w=Math.round(36*S),h=Math.round(42*S),u=Math.max(1,Math.round(S));
 const C=fl?['#fff','#eee','#fff','#ddd','#999']:['#8a5a2a','#6a4220','#5aa848','#86d060',big?'#1a2a10':'#24180a'];
 return VA[k]=vaPix(w,h,x=>{x.save();x.scale(S,S);
  x.fillStyle=C[1];[[11,0],[19,1],[25,0]].forEach(([lx,o],i)=>{const lift=fr&&i%2?1:0;x.fillRect(lx+(fr?(i%2?1:-1):0),36-lift,4,5)});
  x.fillStyle=C[0];x.beginPath();x.roundRect(10,16,17,22,4);x.fill();x.fillStyle=C[1];[[13,20,9],[22,24,8],[15,30,6]].forEach(([a,b,l])=>x.fillRect(a,b,1,l));
  x.strokeStyle=C[0];x.lineWidth=3;x.lineCap='round';x.beginPath();if(cast){x.moveTo(11,22);x.lineTo(4,12);x.lineTo(2,8);x.moveTo(26,22);x.lineTo(33,12);x.lineTo(35,8)}else{x.moveTo(11,24);x.lineTo(4,29);x.lineTo(2,33);x.moveTo(26,24);x.lineTo(32,28);x.lineTo(34,32)}x.stroke();
  x.fillStyle=C[2];[[18,10,10],[9,14,7],[27,14,7],[14,5,6],[23,5,6]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});x.fillStyle=C[3];[[15,6,3],[22,4,2.5],[10,12,2.5]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});
  if(big){x.fillStyle='#ff8ac0';[[9,9],[18,2],[27,9],[23,13]].forEach(([a,b])=>{x.fillRect(a-1,b,3,1);x.fillRect(a,b-1,1,3)});x.fillStyle='#ffe04a';[[9,9],[18,2],[27,9],[23,13]].forEach(([a,b])=>x.fillRect(a,b,1,1))}
  x.fillStyle=angry?'#ffd84a':'#1a1206';x.fillRect(14,22,3,4);x.fillRect(21,22,3,4);if(!angry){x.fillStyle='#fff';x.fillRect(14,22,1,1);x.fillRect(21,22,1,1)}else{x.fillStyle=C[4];x.fillRect(13,20,4,1);x.fillRect(21,20,4,1)}
  x.fillStyle='#ff8aa8';x.fillRect(12,27,2,1);x.fillRect(24,27,2,1);x.fillStyle='#2a1a0a';x.fillRect(17,28,4,1);if(cast)x.fillRect(18,28,2,2);x.restore()},C[4])}
// ───────── 傳送門、回復泉 ─────────
function vaPortal(fr){const k='pt'+fr;if(VA[k])return VA[k];return VA[k]=vaPix(36,50,x=>{x.fillStyle='#7a7a8a';x.beginPath();x.ellipse(18,26,17,23,0,0,7);x.fill();
  const cols=['#2a0a5a','#5a2aa0','#8a4ae0','#4a8aff','#9ae8ff','#ffffff'];for(let i=0;i<6;i++){x.fillStyle=cols[(i+fr)%6];x.beginPath();x.ellipse(18,27,13-i*2,19-i*3,0,0,7);x.fill()}
  x.fillStyle='#9a9aaa';for(let a=0;a<14;a++){const an=-Math.PI+a/13*Math.PI*2;if(Math.sin(an)>.75)continue;x.fillRect(18+Math.cos(an)*16-2,26+Math.sin(an)*22-2,4,4)}x.fillStyle='#5a5a6a';x.fillRect(2,46,32,4);x.fillStyle='#ffe04a';x.fillRect(17,2,2,3)},'#24203a')}
function vaSpring(fr){const k='sp'+fr;if(VA[k])return VA[k];return VA[k]=vaPix(54,16,x=>{x.fillStyle='#4ab0e0';x.beginPath();x.ellipse(27,9,24,5,0,0,7);x.fill();x.fillStyle='#8ae0ff';x.beginPath();x.ellipse(27,8,20,3,0,0,7);x.fill();
  x.fillStyle='#e8fbff';for(let i=0;i<4;i++)x.fillRect(10+((i*11+fr*3)%34),7+(i%2),4,1);x.fillStyle='#8a8a98';for(let i=0;i<9;i++){const an=Math.PI*.05+i/8*Math.PI*.9;x.beginPath();x.ellipse(27-Math.cos(an)*25,10+Math.sin(an)*4,3.5,2.6,0,0,7);x.fill()}
  x.fillStyle='#b0b0bc';x.fillRect(1,10,4,3);x.fillRect(49,10,4,3)},'#2a3a4a')}
// ───────── 主題背景：森林 ─────────
const VTH={grass:{sky:['#58aef0','#a8dcff','#e4f6ff'],sun:'#fff6d0'},forest:{sky:['#1e3a4a','#3e6a6a','#8aa88a'],sun:'#f0f6d8'}};
{const _s=vaSky;vaSky=function(g,VW,VH,t,th){if(th!='forest')return _s(g,VW,VH,t);const c=VTH.forest,gr=g.createLinearGradient(0,0,0,VH);gr.addColorStop(0,c.sky[0]);gr.addColorStop(.6,c.sky[1]);gr.addColorStop(1,c.sky[2]);g.fillStyle=gr;g.fillRect(0,0,VW,VH);
 g.fillStyle='rgba(240,246,216,.18)';g.beginPath();g.arc(VW*.2,80,52,0,7);g.fill();g.fillStyle=c.sun;g.beginPath();g.arc(VW*.2,80,30,0,7);g.fill();g.fillStyle='rgba(30,58,74,.6)';g.beginPath();g.arc(VW*.2-9,73,8,0,7);g.arc(VW*.2+10,88,5,0,7);g.fill()}}
{const _l=vaLayers;vaLayers=function(VW,VH,AW,seed,th){if(th!='forest')return _l(VW,VH,AW,seed).map((L,i)=>(vaGrain(L.cv,10,seed+i),L));const r=vaRnd(seed),mk=(f,h,fn)=>{const w=Math.ceil((VW+(AW-VW)*f)/2)+20;return{f,cv:vaGrain(vaPix(w,h,x=>fn(x,w,h),null),12,seed+f*100)}};
 const pine=(x,tx,by,s,c)=>{x.fillStyle=c;for(let i=0;i<4;i++){const ww=(14-i*3)*s,yy=by-i*9*s;x.beginPath();x.moveTo(tx-ww,yy);x.lineTo(tx,yy-14*s);x.lineTo(tx+ww,yy);x.fill()}};
 return[mk(.08,80,(x,w,h)=>{for(let i=0;i<w/30;i++){x.fillStyle='#f8ffd0';x.fillRect(r()*w,r()*h,1,1)}}),
  mk(.18,160,(x,w,h)=>{for(let i=0;i<w/9;i++)pine(x,r()*w,h-10,.9+r()*.8,'#2e4e5a');x.fillStyle='#2e4e5a';x.fillRect(0,h-14,w,14)}),
  mk(.38,150,(x,w,h)=>{for(let i=0;i<w/11;i++)pine(x,r()*w,h-16,1+r()*.9,['#2a4a3a','#24443a'][i%2]);for(let i=0;i<w/40;i++){const mx=r()*w;x.fillStyle='#e8d8b0';x.fillRect(mx,h-24,2,6);x.fillStyle=['#6ae0ff','#c08aff','#ff8ac0'][i%3];x.beginPath();x.ellipse(mx+1,h-24,4,2.5,0,Math.PI,0);x.fill()}x.fillStyle='#24443a';x.fillRect(0,h-20,w,20)}),
  mk(.62,120,(x,w,h)=>{for(let i=0;i<w/26;i++){const tx=r()*w,tw=6+r()*6;x.fillStyle='#1e3024';x.fillRect(tx,0,tw,h);x.fillStyle='#2a4030';x.fillRect(tx+1,0,2,h)}for(let i=0;i<w/6;i++){x.fillStyle=['#1e3a26','#24462e'][i%2];x.beginPath();x.ellipse(r()*w,h-12,7+r()*6,10,0,Math.PI,0);x.fill()}x.fillStyle='#1e3a26';x.fillRect(0,h-14,w,14)})]}}
{const _g=vaGround;vaGround=function(AW,AH,GY,seed,th){if(th!='forest')return vaGrain(_g(AW,AH,GY,seed),9,seed);const r=vaRnd(seed),w=AW/2,h=AH/2,gy=GY/2;return vaGrain(vaPix(w,h,x=>{x.fillStyle='#4a3420';x.fillRect(0,gy+3,w,h);x.fillStyle='#3a2816';x.fillRect(0,gy+16,w,h);x.fillStyle='#2a1c10';x.fillRect(0,gy+36,w,h);
  for(let i=0;i<w/2;i++){x.fillStyle=['#5a4028','#3a2614','#7a7a84','#5a3a22'][i%4];x.fillRect(r()*w,gy+5+r()*(h-gy-5),3,2)}for(let i=0;i<w/30;i++){const rx=r()*w;x.fillStyle='#5a3a1e';x.fillRect(rx,gy+3,1,6+r()*8)}
  x.fillStyle='#2e5a2a';x.fillRect(0,gy-2,w,6);x.fillStyle='#3e7a3a';x.fillRect(0,gy-2,w,3);x.fillStyle='#6aa850';x.fillRect(0,gy-2,w,1);
  for(let i=0;i<w;i+=1+Math.floor(r()*3)){x.fillStyle=r()<.5?'#3e7a3a':'#2e5a2a';x.fillRect(i,gy-3-Math.floor(r()*3),1,3)}
  for(let i=0;i<w/22;i++){const mx=r()*w,c=['#e04a4a','#c08aff','#6ae0ff'][i%3];x.fillStyle='#f0e0c0';x.fillRect(mx,gy-5,1,3);x.fillStyle=c;x.fillRect(mx-1,gy-6,3,2);x.fillStyle='#fff';x.fillRect(mx,gy-6,1,1)}},null),11,seed)}}
{const _p=vaPlat;vaPlat=function(p,th){if(th!='forest'){if(!p._cv){_p(p);vaGrain(p._cv,10,p.x|0)}return p._cv}if(p._cv)return p._cv;const r=vaRnd(Math.round(p.x*7+p.y)),w=Math.ceil(p.w/2)+4,h=26;
 return p._cv=vaGrain(vaPix(w,h,x=>{const top=4;x.fillStyle='#7a5230';x.beginPath();x.roundRect(0,top,w,10,4);x.fill();x.fillStyle='#5a3a1e';for(let i=4;i<w-4;i+=7)x.fillRect(i,top+3+(i%3),4,1);x.fillStyle='#9a7048';x.beginPath();x.ellipse(3,top+5,3,5,0,0,7);x.fill();x.beginPath();x.ellipse(w-3,top+5,3,5,0,0,7);x.fill();x.fillStyle='#6a4a28';x.fillRect(2,top+4,2,1);x.fillRect(w-4,top+4,2,1);
  x.fillStyle='#3e7a3a';x.fillRect(2,top-1,w-4,3);x.fillStyle='#6aa850';for(let i=2;i<w-2;i+=2+Math.floor(r()*3))x.fillRect(i,top-2,1,2);
  for(let i=0;i<w/18;i++){const mx=4+r()*(w-8),c=['#e04a4a','#c08aff','#6ae0ff'][i%3];x.fillStyle='#f0e0c0';x.fillRect(mx,top-4,1,3);x.fillStyle=c;x.fillRect(mx-1,top-5,3,2);x.fillStyle='#fff';x.fillRect(mx,top-5,1,1)}
  for(let i=0;i<w/14;i++){const vx=4+r()*(w-8),vl=3+r()*8;x.fillStyle='#2e5a2a';x.fillRect(vx,top+10,1,vl);x.fillStyle='#4a8a3a';x.fillRect(vx-1,top+10+vl*.6,2,2)}},'#1e1408'),10,p.x|0)}}
// ───────── 品質掉落下修：高品質要靠合成 ─────────
vrRollRar=function(boss){const w=boss=='elite'?[40,45,13,2,0]:boss?[0,50,40,9,1]:[80,18,2,0,0];let x=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<5;i++){x-=w[i];if(x<=0)return i}return 0};
// ───────── 隊友裝備 ─────────
const vrAeq=()=>{const V=vrS();return V.aeq||(V.aeq={})};
const vrUsedBy=id=>{const V=vrS();if(V.eq.w==id||V.eq.a==id)return'你';for(const k in V.aeq||{}){const q=V.aeq[k];if(q.w==id||q.a==id)return VPAL[k].n}return null};
const vrPMax=()=>(vrS().best||0)>=10?4:3;
function vrParty(){const V=vrS(),A=vrAeq();openDlg('👥 組隊',`最多帶 ${vrPMax()} 位朋友（${V.party.length}/${vrPMax()}）${vrPMax()<4?'・打通第二章可以帶 4 位':''}。點朋友可以加入隊伍、幫他換裝備。<br><span style="font-size:12px">隊友和你同等級，每人隨身帶 3 瓶藥水，血少會自己喝；穿上武器、防具會變強。</span>`,
 Object.entries(VPAL).map(([k,Q])=>{const C=VCLS[Q.cls],inP=V.party.includes(k),ok=Q.need(),q=A[k]||{},bw=V.bag.find(i=>i.id==q.w),ba=V.bag.find(i=>i.id==q.a);
  return[`${inP?'✅ ':''}${C.ic} ${Q.n}`,ok?`${C.n}・${bw?vrItHTML(bw):VWP[Q.b].ic+'（初始武器）'}${ba?'・'+vrItHTML(ba):''}`:'還不認識'+(k=='lao8'?'——常在 VR 體感館出沒':''),()=>vrAlly(k),!ok,1]}).concat([['返回','',vrLobby]]),0,'grid')}
function vrAlly(k){const V=vrS(),A=vrAeq(),Q=VPAL[k],C=VCLS[Q.cls],q=A[k]||(A[k]={}),bw=V.bag.find(i=>i.id==q.w),ba=V.bag.find(i=>i.id==q.a),inP=V.party.includes(k);
 openDlg(`${C.ic} ${Q.n}（${C.n}）`,`${Q.line}<br>武器：${bw?vrItHTML(bw)+'<br><span style="font-size:12px">'+vrItDesc(bw)+'</span>':VWP[Q.b].ic+' '+VWP[Q.b].n+'（初始）'}<br>防具：${ba?vrItHTML(ba)+'<br><span style="font-size:12px">'+vrItDesc(ba)+'</span>':'（沒穿）'}<br><span style="font-size:12px;opacity:.8">${C.n}能用：${C.wp.map(b=>VWP[b].n).join('、')}</span>`,
 [[inP?'👋 離開隊伍':'➕ 加入隊伍','',()=>{if(inP)V.party=V.party.filter(x=>x!=k);else{if(V.party.length>=vrPMax())return toast('最多帶 '+vrPMax()+' 位，先讓一位離開');V.party.push(k)}SVDIRTY=1;vrAlly(k)}],
  ['🗡️ 換武器','',()=>vrAllyPick(k,'w')],['🛡️ 換防具','',()=>vrAllyPick(k,'a')],['返回','',vrParty]])}
function vrAllyPick(k,t){const V=vrS(),A=vrAeq(),C=VCLS[VPAL[k].cls],q=A[k];const cand=V.bag.filter(i=>i.t==t&&(t=='a'||C.wp.includes(i.b))&&(!vrUsedBy(i.id)||q[t]==i.id)).sort((a,b)=>b.r-a.r||b.lv-a.lv);
 openDlg(t=='w'?'🗡️ 幫'+VPAL[k].n+'換武器':'🛡️ 幫'+VPAL[k].n+'換防具',cand.length?'背包裡能用的（你身上穿的不能借）：':'背包裡沒有能用的'+(t=='w'?'武器（'+C.wp.map(b=>VWP[b].n).join('、')+'）':'防具'),
  cand.map(i=>[(q[t]==i.id?'✅ ':'')+vrItHTML(i),vrItDesc(i),()=>{q[t]=i.id;SVDIRTY=1;toast('✨ '+VPAL[k].n+' 換上了 '+vrItName(i));vrAlly(k)}]).concat(q[t]?[['卸下','',()=>{q[t]=null;SVDIRTY=1;vrAlly(k)}]]:[]).concat([['返回','',()=>vrAlly(k)]]))}
// ───────── 合成工坊 ─────────
const VCRAFT=[30,100,300,800];
function vrCraft(){const V=vrS(),free=r=>V.bag.filter(i=>i.r==r&&!vrUsedBy(i.id)).sort((a,b)=>a.lv-b.lv);
 openDlg('⚒️ 合成工坊',`💠 ${V.gold}<br>三件同品質的裝備＋幻境幣，合成一件<b>高一階</b>的裝備（隨機詞綴）。<br><span style="font-size:12px">穿在你或隊友身上的不會被拿去合成。高品質裝備打怪很難掉，<b style="color:#ffa02a">傳說只能靠合成</b>。</span>`,
  [0,1,2,3].map(r=>{const L=free(r),c=VCRAFT[r];return[`<span style="color:${VRAR[r][1]}">${VRAR[r][0]}</span> ×3 → <span style="color:${VRAR[r+1][1]}">${VRAR[r+1][0]}</span>`,`有 ${L.length} 件・💠${c}`,()=>vrCraftGo(r),L.length<3||V.gold<c]}).concat([['返回','',vrLobby]]))}
function vrCraftGo(r){const V=vrS(),L=V.bag.filter(i=>i.r==r&&!vrUsedBy(i.id)).sort((a,b)=>a.lv-b.lv).slice(0,3),C=vrCls(),lv=Math.max(...L.map(i=>i.lv))+1,go=t=>{if(V.gold<VCRAFT[r])return;V.gold-=VCRAFT[r];V.bag=V.bag.filter(i=>!L.includes(i));
  const it=vrMkItem(t,r+1,Math.min(V.cap||10,lv),t=='w'?C.wp[Math.floor(Math.random()*C.wp.length)]:undefined);V.bag.push(it);SVDIRTY=1;openDlg('✨ 合成成功！',`爐火一閃——<br><br>${vrItHTML(it)}<br><span style="font-size:13px">${vrItDesc(it)}</span>`,[['👕 直接穿上','',()=>{if(t=='w'){V.eq.w=it.id;V.cur=it.b}else V.eq.a=it.id;SVDIRTY=1;vrCraft()}],['繼續合成','',vrCraft]])};
 openDlg('⚒️ 要合成什麼？',`會用掉：<br>${L.map(i=>vrItHTML(i)+'（Lv.'+i.lv+'）').join('<br>')}<br>＋ 💠${VCRAFT[r]}　→　<b style="color:${VRAR[r+1][1]}">[${VRAR[r+1][0]}] ？？？</b>`,
  [[`🗡️ 武器（${C.n}能用的隨機一種）`,'',()=>go('w')],['🛡️ 防具','',()=>go('a')],['返回','',vrCraft]])}
// ───────── 精簡大廳（格狀） ─────────
function vrLobby(){const V=vrS();if(!V.cls)return vrClassPick(true);try{if(V.met8&&!FRS('lao8').met)FRS('lao8').met=1}catch(e){}
 const C=vrCls(),w=vrEqW(),a=vrEqA(),D=vrDaily(),T=vrTree(),pts=vrTPts(),P=vrPath(),bar=(v,m,c)=>`<span style="display:inline-block;width:90px;height:7px;background:#3a2a1a;border-radius:4px;overflow:hidden;vertical-align:middle"><span style="display:block;height:100%;width:${Math.min(100,v/m*100)}%;background:${c}"></span></span>`;
 const head=`<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><b style="font-size:16px">${C.ic} ${C.n}${P?'・'+P.ic+P.n:''}</b><span>Lv.<b>${V.lv}</b>/${V.cap||10}</span>${bar(V.exp,vrNeed(V.lv),'#7ad0ff')}<span>💠 <b>${V.gold}</b></span></div>
  <div style="font-size:12px;margin-top:3px">⚔️ ${vrAtk()}　❤️ ${vrHP()}　💧 ${vrMP()}　🛡️ ${vrDef()}　💥 ${Math.round(vrCrit()*100)}%　｜ ${w?vrItHTML(w):'—'} ${a?vrItHTML(a):''}</div>
  <div style="font-size:12px;margin-top:2px">👥 ${V.party.map(id=>VPAL[id].n).join('、')||'單人'}　📜 每日 ${D.q.filter(q=>q.done).length}/3　🏆 最高 ${V.best||0}F</div>`;
 const dot=b=>b?' 🔴':'';
 openDlg('🥽 幻境 Online',head,[
  ['⚔️ 出發','',vrStart,0,1],['🎒 背包',V.bag.length+'/30',vrBag,0,1],['👥 組隊',V.party.length+'/'+vrPMax(),vrParty,0,1],['⚒️ 合成','3 合 1',vrCraft,0,1],
  ['🌳 路線'+dot(!T.p&&V.lv>=5),T.p?(P?P.n:''):V.lv>=5?'可選路線':'Lv.5',vrTreeView,0,1],['🗡️ 武器店','',vrWeapons,0,1],['🧪 道具店','',vrShop,0,1],
  ['💎 賣素材','',()=>{let g=0;for(const k in V.mat){g+=V.mat[k]*6;V.mat[k]=0}V.gold+=g;SVDIRTY=1;toast('💠 賣掉素材 +'+g);vrLobby()},!Object.values(V.mat).some(n=>n),1],
  ['📜 每日'+dot(D.q.some(q=>q.done&&!q.got)),'',vrDailyView,0,1],['📖 圖鑑','',vrDex,0,1],['🔄 轉職','',()=>vrClassPick(false),0,1],['🧪 自動喝藥',V.autoPot===false?'關':'開（血<35%）',()=>{V.autoPot=V.autoPot===false;SVDIRTY=1;vrLobby()},0,1],['❓ 說明','',vrHelp,0,1],
  ['🚪 摘下頭盔','回到現實',closeDlg]],0,'grid')}
function vrStart(){const V=vrS();if((V.best||0)<5){closeDlg();return vrGame(1)}
 openDlg('⚔️ 選擇地區','',VCH.map((c,i)=>[`${['🌿','🌲'][i]} 第${'一二'[i]}章・${c.n}`,`第 ${c.f0}～${c.f1} 層・建議 ${c.lv}`,()=>{closeDlg();vrGame(c.f0)},i==1&&(V.best||0)<5]).concat([['返回','',vrLobby]]))}
