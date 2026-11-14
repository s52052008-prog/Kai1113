/* v13.14 新標題畫面：「家有冠宏，宜樂無窮」— 兩人坐在頂樓看小鎮夜景與煙火；16-bit 風格主題曲；選單直接在標題畫面上 */
const GNAME='家有冠宏，宜樂無窮',GSUB='Allen ♥ Kai　像素模擬人生';
try{document.title=GNAME}catch(e){}
// ── 16-bit 主題曲：F 大調、溫暖懷舊（長笛主旋律＋豎琴＋弦樂鋪底＋鐘琴） ──
function titleMusic(){let ac;try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return{stop(){}}}
 const T0=ac.currentTime,mst=ac.createGain();mst.gain.setValueAtTime(0,T0);mst.gain.linearRampToValueAtTime(.5,T0+2.5);mst.connect(ac.destination);
 const rv=ac.createConvolver(),len=ac.sampleRate*2.6,ir=ac.createBuffer(2,len,ac.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.4)}rv.buffer=ir;
 const wet=ac.createGain();wet.gain.value=.38;rv.connect(wet);wet.connect(mst);const bus=ac.createGain();bus.connect(mst);bus.connect(rv);
 const pan=v=>{try{const p=ac.createStereoPanner();p.pan.value=v;p.connect(bus);return p}catch(e){return bus}},L=pan(-.35),R=pan(.35),C=bus;
 const f=m=>440*Math.pow(2,(m-69)/12),B=60/84;
 const tone=(dst,type,m,t,d,v,o={})=>{if(!m)return;const os=ac.createOscillator(),g=ac.createGain();os.type=type;os.frequency.value=f(m);if(o.det)os.detune.value=o.det;
  if(o.vib){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=5.2;lg.gain.value=o.vib;l.connect(lg);lg.connect(os.detune);l.start(t+.15);l.stop(t+d+.3)}
  let n=os;if(o.lp){const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;os.connect(fl);n=fl}
  const a=o.a||.01;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);if(o.sus){g.gain.setValueAtTime(v,t+Math.max(a,d-o.rel));g.gain.linearRampToValueAtTime(0,t+d)}else g.gain.exponentialRampToValueAtTime(.0005,t+d);
  n.connect(g);g.connect(dst);os.start(t);os.stop(t+d+.1)};
 const CH=[[53,[65,69,72]],[52,[64,67,72]],[50,[62,65,69]],[46,[62,65,70]],[45,[65,69,72]],[43,[62,65,70]],[48,[64,67,72]],[48,[64,67,70]],
  [53,[65,69,72]],[52,[64,67,72]],[50,[62,65,69]],[46,[62,65,70]],[45,[65,69,72]],[43,[62,65,70]],[48,[64,67,72]],[53,[65,69,72]]];
 const MEL=[[[72,1],[74,.5],[72,.5],[69,2]],[[67,1],[69,.5],[72,.5],[76,2]],[[77,1.5],[76,.5],[74,1],[72,1]],[[74,3],[0,1]],
  [[72,1],[77,1],[76,1],[74,1]],[[74,1.5],[72,.5],[70,1],[69,1]],[[67,1],[69,1],[70,1],[76,1]],[[72,3],[0,1]],
  [[81,1.5],[79,.5],[77,2]],[[76,1],[77,.5],[79,.5],[72,2]],[[74,1],[77,1],[81,1.5],[79,.5]],[[77,2],[74,2]],
  [[72,1],[74,1],[77,1],[81,1]],[[79,1.5],[77,.5],[76,1],[74,1]],[[76,1],[79,1],[77,.5],[76,.5],[74,1]],[[77,4]]];
 const BAR=4*B,LOOP=16*BAR;let t0=T0+.3,stop=false,rep=0;
 const sch=()=>{if(stop)return;
  CH.forEach((c,i)=>{const bt=t0+i*BAR;
   c[1].forEach(n=>[-8,8].forEach(dt=>tone(C,'sawtooth',n-12,bt,BAR+.3,.014,{det:dt,lp:700,a:1.2,sus:1,rel:1})));          // 弦樂鋪底
   tone(C,'triangle',c[0],bt,BAR*.95,.2,{a:.03,sus:1,rel:.5});tone(C,'sine',c[0]-12,bt,BAR*.6,.12,{a:.03});            // 低音
   [0,1,2,1,3,2,1,2].forEach((k,j)=>{const n=k==3?c[1][0]+12:c[1][k];tone(j%2?R:L,'triangle',n,bt+j*B/2,1.3,.045,{a:.004})}); // 豎琴
   if(i%2==0)tone(R,'sine',c[1][2]+24,bt,1.1,.035,{a:.002})});                                                           // 鐘琴
  let t=t0;MEL.forEach(bar=>bar.forEach(q=>{if(q[0]){tone(C,'sine',q[0],t,q[1]*B+.3,.15,{a:.05,vib:6});tone(C,'triangle',q[0]+12,t,q[1]*B*.8,.02,{a:.04});
    if(rep%2==1)tone(L,'sine',q[0]+12,t+B*.02,.5,.04,{a:.002})}t+=q[1]*B}));
  rep++;t0+=LOOP;setTimeout(sch,(LOOP-3)*1000)};
 sch();return{stop(){stop=true;try{mst.gain.cancelScheduledValues(ac.currentTime);mst.gain.setValueAtTime(mst.gain.value,ac.currentTime);mst.gain.linearRampToValueAtTime(0,ac.currentTime+1.5);setTimeout(()=>ac.close(),1800)}catch(e){}}}}

// ── 標題畫面 ──
(function(){const ov=document.getElementById('titleOv');if(!ov||window.NOTITLE)return;const c=ov.querySelector('canvas');if(!c)return;
 c.style.imageRendering='auto';ov.style.background='#070614';
 const TW=480,TH=300,SC=4,x=c.getContext('2d');let t0=performance.now();
 // 夜景小鎮：用遊戲裡的建築素材，調成夜晚色調
 let town=null;const mkTown=()=>{const k=[...new Set(BALL().filter(b=>b.ua&&uaOK(b.ua.k)&&!/temple|^ns_|stall|church/.test(b.ua.k)).map(b=>b.ua.k))];if(k.length<4)return null;
  const cv=document.createElement('canvas');cv.width=TW*SC;cv.height=120*SC;const q=cv.getContext('2d');q.scale(SC,SC);q.imageSmoothingEnabled=true;q.imageSmoothingQuality='high';
  const r=(()=>{let v=1113;return()=>(v=(v*16807)%2147483647)/2147483647})();let X=-20;
  for(let row=0;row<2;row++){X=-30+row*24;while(X<TW+20){const kk=k[Math.floor(r()*k.length)],im=UAI[kk],h=(row?58:44)+r()*18,w=h*im.naturalWidth/im.naturalHeight;q.globalAlpha=row?1:.75;q.drawImage(im,X,120-h-(row?0:16),w,h);X+=w*.82}}
  q.globalAlpha=1;if(uaOK('b_church')){const im=UAI.b_church,h=104,w=h*im.naturalWidth/im.naturalHeight;q.drawImage(im,352-w/2,120-h,w,h)}
  q.globalCompositeOperation='source-atop';q.fillStyle='rgba(14,16,52,.72)';q.fillRect(0,0,TW,120);
  q.globalCompositeOperation='source-over';for(let i=0;i<260;i++){const xx=r()*TW,yy=20+r()*96;const d=q.getImageData(xx*SC,yy*SC,1,1).data;if(d[3]>200){q.fillStyle=r()<.7?'rgba(255,214,120,.9)':'rgba(255,240,200,.85)';q.fillRect(Math.round(xx),Math.round(yy),1.4,1.6)}}
  return cv};
 const ST=[];for(let i=0;i<120;i++)ST.push([Math.random()*TW,Math.random()*170,Math.random()*6.3,Math.random()<.12?1.6:1]);
 const FW=[],SH=[],FS=[];let nfw=1.2,nsh=4,nshape=2.5;
 const COL=['#ff8fb1','#ffd36e','#8fe3ff','#c9a0ff','#fff','#9dffb0'];
 let rev=0,revT=0;window.TITLEREADY=false;
 window.titleReveal=()=>{if(rev)return;rev=1;revT=performance.now();setTimeout(()=>{bar.style.opacity='1';bar.style.pointerEvents='auto';window.TITLEREADY=true},1500)};
 function draw(now){if(!ov.isConnected)return;const t=(now-t0)/1000,dt=1/60;x.setTransform(SC,0,0,SC,0,0);x.imageSmoothingEnabled=true;
  // 天空
  const g=x.createLinearGradient(0,0,0,TH);g.addColorStop(0,'#0b0b2a');g.addColorStop(.45,'#2a1c55');g.addColorStop(.72,'#6a3a78');g.addColorStop(.86,'#c46a7a');g.addColorStop(1,'#f0a070');x.fillStyle=g;x.fillRect(0,0,TW,TH);
  ST.forEach(s=>{x.globalAlpha=.35+.65*(.5+.5*Math.sin(t*1.7+s[2]));x.fillStyle='#fff';x.fillRect(s[0],s[1],s[3],s[3])});x.globalAlpha=1;
  {const mg=x.createRadialGradient(446,28,4,446,28,34);mg.addColorStop(0,'rgba(255,240,210,.35)');mg.addColorStop(.4,'rgba(255,230,200,.12)');mg.addColorStop(1,'rgba(255,230,200,0)');x.fillStyle=mg;x.fillRect(400,0,80,70);x.save();x.shadowColor='rgba(255,240,210,.9)';x.shadowBlur=12;x.globalAlpha=.85;x.fillStyle='#fff3d8';x.beginPath();x.arc(446,28,9,0,7);x.fill();x.restore();x.save();x.filter='blur(1.2px)';x.globalAlpha=.92;x.fillStyle='#1a1640';x.beginPath();x.arc(450,25,7.6,0,7);x.fill();x.restore();for(let i=0;i<3;i++){x.fillStyle='rgba(200,190,220,.10)';x.beginPath();x.ellipse(430+i*16+Math.sin(t*.2+i)*6,34+i*3,22,3,0,0,7);x.fill()}}
  nsh-=dt;if(nsh<0){nsh=3+Math.random()*5;SH.push({x:100+Math.random()*320,y:10+Math.random()*50,l:1})}
  SH.forEach(s=>{s.l-=dt*1.4;s.x-=dt*160;s.y+=dt*60;const gr=x.createLinearGradient(s.x,s.y,s.x+34,s.y-13);gr.addColorStop(0,`rgba(255,255,255,${s.l})`);gr.addColorStop(1,'rgba(255,255,255,0)');x.strokeStyle=gr;x.lineWidth=1;x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.x+34,s.y-13);x.stroke()});for(let i=SH.length-1;i>=0;i--)if(SH[i].l<=0)SH.splice(i,1);
  // 一般煙火
  nfw-=dt;if(nfw<0){nfw=1.1+Math.random()*1.6;const cx=40+Math.random()*400,cy=30+Math.random()*80,col=COL[Math.floor(Math.random()*COL.length)],heart=Math.random()<.3,n=heart?40:52;
   for(let i=0;i<n;i++){const a=i/n*6.283;let vx,vy;if(heart){vx=16*Math.pow(Math.sin(a),3);vy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a));vx*=2.6;vy*=2.6}else{const s=30+Math.random()*16;vx=Math.cos(a)*s;vy=Math.sin(a)*s}FW.push({x:cx,y:cy,vx,vy,l:1.6,c:Math.random()<.2?'#fff':col})}}
  // 造型煙火（名字、笑臉、冰品、榴槤……）
  nshape-=dt;if(nshape<0){nshape=2.4+Math.random()*1.8;const sh=fwShapePick(),pts=fwShapePts(sh,rev?2:3.4);const cx=rev?70+Math.random()*300:90+Math.random()*300,cy=rev?20+Math.random()*6:36+Math.random()*60;
   pts.forEach(p=>{const a=Math.random()*6.3,s=20+Math.random()*30;FS.push({x:cx,y:cy,ox:cx+p[0],oy:cy+p[1],t:0,hold:2.2+Math.random()*.4,c:p[2]})});
   for(let i=0;i<28;i++){const a=i/28*6.283;FW.push({x:cx,y:cy,vx:Math.cos(a)*55,vy:Math.sin(a)*55,l:.9,c:'#fff'})}}
  x.globalCompositeOperation='lighter';
  for(let i=FW.length-1;i>=0;i--){const p=FW[i];p.l-=dt;p.vx*=.97;p.vy=p.vy*.97+14*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.l<=0){FW.splice(i,1);continue}x.globalAlpha=Math.min(1,p.l)*.85;x.fillStyle=p.c;x.fillRect(p.x,p.y,1.4,1.4);x.globalAlpha*=.3;x.fillRect(p.x-1,p.y-1,3.4,3.4)}
  for(let i=FS.length-1;i>=0;i--){const q=FS[i];q.t+=dt;let px,py,a;if(q.t<.4){const k=q.t/.4,e=1-Math.pow(1-k,3);px=q.x+(q.ox-q.x)*e;py=q.y+(q.oy-q.y)*e;a=.5+k*.5}else if(q.t<q.hold){px=q.ox;py=q.oy;a=.85+.15*Math.sin(q.t*12+q.ox)}else{const k=(q.t-q.hold)/1;if(k>=1){FS.splice(i,1);continue}px=q.ox;py=q.oy+k*k*26;a=1-k}
   x.globalAlpha=a*.3;x.fillStyle=q.c;x.fillRect(px-1.4,py-1.4,4.4,4.4);x.globalAlpha=a;x.fillRect(px,py,1.8,1.8)}
  x.globalCompositeOperation='source-over';x.globalAlpha=1;
  // 遠方小鎮
  if(!town)try{town=mkTown()}catch(e){}if(town){const cg=x.createRadialGradient(352,170,4,352,170,70);cg.addColorStop(0,'rgba(255,220,150,.28)');cg.addColorStop(1,'rgba(255,220,150,0)');x.fillStyle=cg;x.fillRect(270,100,170,140);x.drawImage(town,0,0,TW*SC,120*SC,0,124,TW,120)}
  else{x.fillStyle='#161433';x.fillRect(0,215,TW,60)}
  // 教堂：紅色發光十字架、橙黃色招牌燈
  if(town){const pu=.75+.25*Math.sin(t*1.6),_cr=redCross(),cx0=_cr?_cr.x+_cr.w/2:343,cy0=_cr?_cr.y+_cr.h/2:146;x.save();x.globalCompositeOperation='lighter';
   const rg=x.createRadialGradient(cx0,cy0,1,cx0,cy0,26);rg.addColorStop(0,`rgba(220,40,40,${.28*pu})`);rg.addColorStop(.4,`rgba(200,20,30,${.1*pu})`);rg.addColorStop(1,'rgba(255,0,0,0)');x.fillStyle=rg;x.fillRect(cx0-28,cy0-28,56,56);x.restore();
   const cr=redCross();if(cr){x.save();x.shadowColor='rgba(200,30,30,.75)';x.shadowBlur=5*pu;x.globalAlpha=.85+.15*pu;x.drawImage(cr.c,cr.x,cr.y,cr.w,cr.h);x.restore()}}
  // 頂樓
  const ry=246;x.fillStyle='#3a2f40';x.fillRect(0,ry,TW,TH-ry);const pg=x.createLinearGradient(0,ry-14,0,ry);pg.addColorStop(0,'#b9b7cc');pg.addColorStop(1,'#7f7c98');x.fillStyle=pg;x.fillRect(0,ry-14,TW,14);x.fillStyle='#dcdaea';x.fillRect(0,ry-15,TW,2);for(let X=6;X<TW;X+=30){const lg=x.createRadialGradient(X,ry-14,1,X,ry-14,22);lg.addColorStop(0,'rgba(255,214,150,.22)');lg.addColorStop(1,'rgba(255,214,150,0)');x.fillStyle=lg;x.fillRect(X-22,ry-15,44,16)}
  for(let i=0;i<TW;i+=24){x.fillStyle='rgba(0,0,0,.18)';x.fillRect(i,ry-13,1,13)}
  // 燈串：三層垂掛＋兩側的燈簾
  titleLights(x,t,ry);
  // 兩個人：並肩站著、手牽手
  titleCouple(x,ry);
  const hy=ry-104-((t*10)%26),ha=(1-((t*10)%26)/26)*(rev?1:.6+.4*Math.sin(t*4));x.globalAlpha=Math.max(0,ha);x.fillStyle='#ff7a9a';const H=['0110110','1111111','1111111','0111110','0011100','0001000'];H.forEach((row,j)=>{for(let i=0;i<7;i++)if(row[i]=='1')x.fillRect(236+i*1.2,hy+j*1.2,1.2,1.2)});x.globalAlpha=1;
  if(!rev){const a=.4+.4*Math.sin(t*3);x.globalAlpha=a;x.fillStyle='#fff6c8';[[212,ry-96],[268,ry-88],[240,ry-112]].forEach((s,i)=>{const k=1+Math.sin(t*3+i)*.6;x.fillRect(s[0]-k,s[1],k*2+1,1);x.fillRect(s[0],s[1]-k,1,k*2+1)});x.globalAlpha=1}
  // 標題（點兩人之後才漸漸出現）
  if(rev){const k=Math.min(1,(now-revT)/1400);x.globalAlpha=k;x.textAlign='center';x.textBaseline='middle';const ty=70+(1-k)*14+Math.sin(t*1.2)*1.5;x.lineJoin='round';
   x.font='900 36px "Cubic11","Noto Sans TC",sans-serif';x.lineWidth=8;x.strokeStyle='#2a0f22';x.strokeText(GNAME,TW/2,ty);
   const tg=x.createLinearGradient(0,ty-18,0,ty+18);tg.addColorStop(0,'#fff6c8');tg.addColorStop(.5,'#ffd36e');tg.addColorStop(1,'#ff9fb8');x.fillStyle=tg;x.fillText(GNAME,TW/2,ty);
   x.shadowColor='rgba(255,170,200,.7)';x.shadowBlur=8;x.font='bold 13px "Cubic11","Noto Sans TC",sans-serif';x.lineWidth=4;x.strokeText(GSUB,TW/2,ty+32);x.fillStyle='#fff0f5';x.fillText(GSUB,TW/2,ty+32);x.shadowBlur=0;x.globalAlpha=1}
  requestAnimationFrame(draw)}
 window.TITLEDRAW=1;requestAnimationFrame(draw);try{window.bootDone&&bootDone()}catch(e){}
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:2.5%;transform:translateX(-50%);display:flex;gap:14px;flex-wrap:wrap;justify-content:center;z-index:2;opacity:0;pointer-events:none;transition:opacity 1s';
 const st0='font:inherit;font-family:"Cubic11","Noto Sans TC",sans-serif;font-size:clamp(14px,2.2vw,22px);padding:.55em 1.3em;border-radius:12px;cursor:pointer;color:#fff6dc;background:linear-gradient(#6b3d5a,#3d2238);border:3px solid #ffd36e;box-shadow:0 0 0 3px #2a0f22,0 6px 18px rgba(0,0,0,.5);text-shadow:0 2px 0 #2a0f22';
 bar.innerHTML=`<button data-go="1" style='${st0}'>▶ 開始遊戲</button><button data-gift="1" style='${st0};background:linear-gradient(#a24a6a,#6a2244)'>🎁 給家宜的禮物</button>`;ov.appendChild(bar);
 let mus=null;const music=()=>{if(mus)return;mus=titleMusic();window.TMUS=mus};
 ov.addEventListener('pointerdown',e=>{music();const b=e.target.closest('button');
  if(b&&window.TITLEREADY){if(b.dataset.gift)window._titleGift=1;return}
  e.stopPropagation();e.preventDefault();if(rev)return;const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*TW,py=(e.clientY-r.top)/r.height*TH;
  if(px>196&&px<284&&py>130&&py<262)titleReveal()},true);
 addEventListener('keydown',()=>{if(window.TITLE)music()},true);
})();
// 舊標題的繪製停掉（f23g 的 draw 會偵測 TITLEDRAW）
// 進到選單時：標題畫面留在後面當背景，直到真的開始玩才淡出；音樂也一起淡出
{const _s=startMenu;startMenu=function(){const od=openDlg;openDlg=function(t,d,o,...r){if(typeof t=='string'&&t.includes('像素小鎮')){t='🏡 '+GNAME;if(Array.isArray(o)&&!o.some(q=>/返回標題/.test(q[0])))o=o.concat([['↩️ 返回標題畫面','回到一開始的夜景畫面',()=>{closeDlg();location.reload()}]])}return od.call(this,t,d,o,...r)};
 try{_s.apply(this,arguments)}finally{openDlg=od}
 if(window._titleGift){window._titleGift=0;setTimeout(()=>{try{giftAsk(()=>memShow(()=>startMenu()),startMenu)}catch(e){}},50)}
 titleKeep()}}
function titleKeep(){const ov=document.getElementById('titleOv');if(!ov)return;
 clearInterval(window._tk);window._tk=setInterval(()=>{const tt=dlg.hidden?'':((dbox.querySelector('.rttl')||dbox).textContent||'');if(!/宜樂無窮|生日禮物|存檔|匯入/.test(tt)&&!document.querySelector('.mdots')){clearInterval(window._tk);ov.style.transition='opacity .8s';ov.style.opacity='0';setTimeout(()=>ov.remove(),850);try{window.TMUS&&TMUS.stop();window.TMUS=null}catch(e){}}},300)}
// ── 標題畫面小工具：造型煙火、燈串、兩人牽手 ──
const FWSHAPES=['txt:Allen','txt:Kai','txt:家宜','txt:冠宏','txt:1113','txt:520','txt:♥','emo:😊','emo:🍦','emo:🍧','emo:🍉','emo:🌸','emo:⭐','emo:🎂','emo:🥰','bmp:durian','bmp:durian'];
function fwShapePick(){return FWSHAPES[Math.floor(Math.random()*FWSHAPES.length)]}
const FWPC={};
function fwShapePts(sh,cell){const ck=sh+'|'+cell;if(FWPC[ck])return FWPC[ck];const [kind,v]=sh.split(/:(.*)/);let pts=[];
 if(kind=='bmp'){const M=['......BB......','.....B........','...g.gggg.g...','..gGgGGgGgGg..','.gGGGGGGGGGGg.','gGGgGGGGGgGGGg','.GGGGYYYGGGGG.','gGGGYYYYYGGGGg','.GGGGYYYGGGGG.','gGGgGGGGGgGGGg','.gGGGGGGGGGGg.','..gGgGGgGgGg..','...g.gggg.g...'],C={g:'#6a9a24',G:'#a6c83a',Y:'#ffe36e',B:'#a0703a'};
  M.forEach((r,j)=>{for(let i=0;i<r.length;i++)if(C[r[i]])pts.push([(i-7)*cell,(j-6)*cell,C[r[i]]])})}
 else{const c=document.createElement('canvas'),fs=kind=='emo'?26:22;c.width=200;c.height=40;const x=c.getContext('2d');x.font=(kind=='emo'?'':'900 ')+fs+'px "Cubic11","Noto Sans TC","Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';x.textBaseline='middle';x.fillStyle='#fff';x.fillText(v,2,20);
  const d=x.getImageData(0,0,200,40).data,st=kind=='emo'?2:2,col=['#ff8fb1','#ffd36e','#8fe3ff','#c9a0ff','#9dffb0'][Math.floor(Math.random()*5)];let mx=0;
  for(let j=0;j<40;j+=st)for(let i=0;i<200;i+=st){const o=(j*200+i)*4;if(d[o+3]>140){let cc=col;if(kind=='emo'){const r=d[o],g2=d[o+1],b=d[o+2],k=Math.max(r,g2,b)||1,f=Math.min(1.6,255/k);cc=`rgb(${Math.min(255,r*f)|0},${Math.min(255,g2*f)|0},${Math.min(255,b*f)|0})`}else if(Math.random()<.15)cc='#fff';pts.push([i/st,j/st,cc]);mx=Math.max(mx,i/st)}}
  pts=pts.map(p=>[(p[0]-mx/2)*cell,(p[1]-10)*cell,p[2]])}
 return FWPC[ck]=pts}
function titleLights(x,t,ry){const strands=[[ry-30,10,2.6,0],[ry-58,14,2,1.3],[ry-88,9,3.2,2.1]];
 strands.forEach((S,si)=>{const yAt=X=>S[0]+Math.abs(Math.sin(X/480*Math.PI*S[2]+S[3]))*S[1];x.strokeStyle='rgba(30,20,25,.85)';x.lineWidth=.6;x.beginPath();for(let X=0;X<=480;X+=4){X?x.lineTo(X,yAt(X)):x.moveTo(X,yAt(X))}x.stroke();
  for(let X=6+si*5;X<480;X+=15){const ly=yAt(X)+2.6,a=.6+.4*Math.sin(t*2.4+X*.3+si);x.fillStyle=`rgba(255,200,120,${.22*a})`;x.beginPath();x.arc(X,ly,4.2,0,7);x.fill();x.globalAlpha=a;x.fillStyle=['#ffd27a','#ffb4c8','#bfe8ff','#c8ffb0'][(X/15+si|0)%4];x.beginPath();x.arc(X,ly,1.5,0,7);x.fill();x.globalAlpha=1}});
 // 兩側垂掛的燈簾
 [[8,60],[420,472]].forEach(([a,b])=>{for(let X=a;X<=b;X+=7){const len=40+((X*37)%30);x.strokeStyle='rgba(30,20,25,.6)';x.lineWidth=.4;x.beginPath();x.moveTo(X,ry-104);x.lineTo(X,ry-104+len);x.stroke();
  for(let yy=ry-100;yy<ry-104+len;yy+=8){const a=.5+.5*Math.sin(t*3+yy*.2+X);x.fillStyle=`rgba(255,230,170,${.25*a})`;x.beginPath();x.arc(X,yy,2.6,0,7);x.fill();x.globalAlpha=a;x.fillStyle='#fff3c8';x.fillRect(X-.6,yy-.6,1.2,1.2);x.globalAlpha=1}}})}
function titleCouple(x,ry){try{const row=AL_WALK[CHDIR[1]],H=92,W=46;
 const fr=(cx,im)=>{const fb=footBot(im),top=ry+16-H*fb/ALS.fh;x.save();x.fillStyle='rgba(10,5,15,.35)';x.beginPath();x.ellipse(cx,ry+15.5,9,1.6,0,0,7);x.fill();x.imageSmoothingEnabled=false;x.drawImage(im,cx-W/2,top,W,H);x.restore()};
 if(!uaOK('al_sheet')||!uaOK('yj_sheet'))throw 0;fr(254,legMirror('yj_sheet',row,3,'L',.73));fr(228,standBack('al_sheet',row,.72))}
 catch(e){try{x.save();x.translate(240,ry+12);x.scale(2.4,2.4);drawChar(x,{x:-15,y:-10,dir:1,mv:false,fr:0,lk:ALLEN,ph:0});drawChar(x,{x:1,y:-10,dir:1,mv:false,fr:0,lk:{sc:.72,fm:1},nm:'劉家宜',ph:0});x.restore()}catch(er){}}}
// 指定某一格、把站穩的那隻腳鏡像到另一邊
function legMirror(k,row,col,side,legTop){const ck='LM'+k+col+side;if(SBC[ck])return SBC[ck];const fw=ALS.fw,fh=ALS.fh,c=document.createElement('canvas');c.width=fw;c.height=fh;const q=c.getContext('2d');q.drawImage(UAI[k],col*fw,row*fh,fw,fh,0,0,fw,fh);
 const y0=Math.round(fh*legTop),h=fh-y0,d=q.getImageData(0,y0,fw,h).data;let mn=fw,mx=0;for(let j=0;j<6;j++)for(let i=0;i<fw;i++)if(d[(j*fw+i)*4+3]>100){mn=Math.min(mn,i);mx=Math.max(mx,i)}
 const cx=Math.round((mn+mx+1)/2),w=side=='R'?mx+1-cx:cx-mn,leg=document.createElement('canvas');leg.width=Math.max(1,w);leg.height=h;leg.getContext('2d').drawImage(c,side=='R'?cx:mn,y0,w,h,0,0,w,h);
 if(side=='R'){q.clearRect(0,y0,cx,h);q.save();q.translate(2*cx,0);q.scale(-1,1);q.drawImage(leg,cx,y0);q.restore()}else{q.clearRect(cx,y0,fw-cx,h);q.save();q.translate(2*cx,0);q.scale(-1,1);q.drawImage(leg,mn,y0);q.restore()}
 return SBC[ck]=c}

// 背影「雙腳併攏站好」：把比較穩的那隻腳鏡像到另一邊
const SBC={};
function standBack(k,row,legTop){if(SBC[k])return SBC[k];const fw=ALS.fw,fh=ALS.fh,c=document.createElement('canvas');c.width=fw;c.height=fh;const q=c.getContext('2d');q.drawImage(UAI[k],0,row*fh,fw,fh,0,0,fw,fh);
 try{const y0=Math.round(fh*legTop),h=fh-y0,d=q.getImageData(0,y0,fw,h).data;let mn=fw,mx=0,L=0,R=0;
  for(let j=0;j<h;j++)for(let i=0;i<fw;i++){const o=(j*fw+i)*4;if(d[o+3]<100)continue;mn=Math.min(mn,i);mx=Math.max(mx,i)}
  const cx=Math.round((mn+mx+1)/2);for(let j=0;j<h;j++)for(let i=0;i<fw;i++){const o=(j*fw+i)*4;if(d[o+3]<100)continue;const lum=d[o]*.3+d[o+1]*.59+d[o+2]*.11;if(lum>150){if(i<cx)L++;else R++}}
  const useLeft=L<=R,w=useLeft?cx-mn:mx+1-cx,leg=document.createElement('canvas');leg.width=Math.max(1,w);leg.height=h;leg.getContext('2d').drawImage(c,useLeft?mn:cx,y0,w,h,0,0,w,h);
  if(useLeft){q.clearRect(cx,y0,fw-cx,h);q.save();q.translate(2*cx,0);q.scale(-1,1);q.drawImage(leg,mn,y0);q.restore()}
  else{q.clearRect(0,y0,cx,h);q.save();q.translate(2*cx,0);q.scale(-1,1);q.drawImage(leg,cx,y0);q.restore()}}catch(e){}
 return SBC[k]=c}

// 家宜的背影：重畫兩隻併攏的腿（原圖每一格都有一腳勾起來）
function drawnLegs(k,row){const ck='DL'+k;if(SBC[ck])return SBC[ck];const fw=ALS.fw,fh=ALS.fh,c=document.createElement('canvas');c.width=fw;c.height=fh;const q=c.getContext('2d');q.drawImage(UAI[k],0,row*fh,fw,fh,0,0,fw,fh);
 const d=q.getImageData(0,0,fw,fh).data,op=(i,j)=>d[(j*fw+i)*4+3]>100,rgb=(i,j)=>{const o=(j*fw+i)*4;return[d[o],d[o+1],d[o+2]]};
 // 找毛衣下緣：從下往上第一列「紅色」夠多的地方
 let hem=Math.round(fh*.8),pant=[40,40,46];for(let j=fh-1;j>fh*.5;j--){let red=0;for(let i=0;i<fw;i++){if(!op(i,j))continue;const c2=rgb(i,j);if(c2[0]>c2[1]+40&&c2[0]>90)red++}if(red>6){hem=j+1;break}}
 for(let j=hem+3;j<fh;j++){let n=0,s2=[0,0,0];for(let i=0;i<fw;i++)if(op(i,j)){const c2=rgb(i,j);if(c2[0]<90&&c2[1]<90&&c2[2]<100){s2[0]+=c2[0];s2[1]+=c2[1];s2[2]+=c2[2];n++}}if(n>4){pant=s2.map(v=>v/n|0);break}}
 let mn=fw,mx=0;for(let i=0;i<fw;i++)if(op(i,hem-2)){mn=Math.min(mn,i);mx=Math.max(mx,i)}const cx=(mn+mx+1)/2;
 let bot=hem;for(let j=fh-1;j>hem;j--){let any=0;for(let i=0;i<fw;i++)if(op(i,j))any=1;if(any){bot=j;break}}
 q.clearRect(0,hem,fw,fh-hem);const lw=8,gap=1,P=`rgb(${pant})`,PD=`rgb(${pant.map(v=>Math.max(0,v-14))})`;
 [cx-gap/2-lw,cx+gap/2].forEach((lx,ii)=>{lx=Math.round(lx);q.fillStyle=P;q.fillRect(lx,hem,lw,bot-hem-3);q.fillStyle=PD;q.fillRect(ii?lx+lw-1:lx,hem,1,bot-hem-3);
  q.fillStyle='#2a2018';q.fillRect(lx-1,bot-5,lw+2,6);q.fillStyle='#e8dcc6';q.fillRect(lx,bot-5,lw,5);q.fillStyle='#bfae94';q.fillRect(lx,bot-1,lw,1);q.fillStyle='#fff8ea';q.fillRect(lx+1,bot-4,lw-2,1)});
 return SBC[ck]=c}

function footBot(im){if(im._fb)return im._fb;const q=im.getContext('2d'),d=q.getImageData(0,0,im.width,im.height).data;let b=im.height;for(let j=im.height-1;j>0;j--){let any=0;for(let i=0;i<im.width;i++)if(d[(j*im.width+i)*4+3]>100){any=1;break}if(any){b=j+1;break}}return im._fb=b}
// 播回憶相簿時，標題音樂先停；結束後回到標題再播
{const _m=memShow;memShow=function(onEnd){const was=!!window.TMUS;try{if(window.TMUS){TMUS.stop();window.TMUS=null}}catch(e){}
 return _m.call(this,function(){try{if(was&&document.getElementById('titleOv')&&!window.TMUS)window.TMUS=titleMusic()}catch(e){}if(onEnd)return onEnd.apply(this,arguments)})}}

// 從教堂圖片本身取出十字架的形狀，染成紅色，完全對齊
let RCROSS=null;function redCross(){if(RCROSS)return RCROSS;if(!uaOK('b_church'))return null;const im=UAI.b_church,W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const q=c.getContext('2d');q.drawImage(im,0,0);const d=q.getImageData(0,0,W,H).data;
 let top=-1;for(let j=0;j<H&&top<0;j++)for(let i=0;i<W;i++)if(d[(j*W+i)*4+3]>150){top=j;break}let mn=W,mx=0,bot=top,bar=false,barW=0,stem=W;for(let j=top;j<H*.2;j++){let a=W,b=0;for(let i=0;i<W;i++)if(d[(j*W+i)*4+3]>150){a=Math.min(a,i);b=Math.max(b,i)}const wd=b-a+1;if(wd>W*.15)break;if(!bar){if(barW&&wd<barW*.6)bar=true;barW=Math.max(barW,wd)}if(bar){stem=Math.min(stem,wd);if(wd>stem+3)break}bot=j;mn=Math.min(mn,a);mx=Math.max(mx,b)}
 const cw=mx-mn+1,ch=bot-top+1,o=document.createElement('canvas');o.width=cw;o.height=ch;const x=o.getContext('2d');x.drawImage(im,mn,top,cw,ch,0,0,cw,ch);x.globalCompositeOperation='source-atop';x.fillStyle='#d23a3a';x.fillRect(0,0,cw,ch);
 const h=104,s2=h/H,w=h*W/H,ox=352-w/2,oy=124+120-h;return RCROSS={c:o,x:ox+mn*s2,y:oy+top*s2,w:cw*s2,h:ch*s2}}
