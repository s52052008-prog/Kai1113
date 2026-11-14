/* v13.10 生日禮物 2：浪漫配樂、文字煙火（1113／520／生日快樂…）、信件不出現捲軸；HUD 字體清晰 */

// ── 字體不要假粗體（像素字加粗會糊在一起） ──
{const s=document.createElement('style');s.textContent='#hud,#hud *,#tm,#tm *,#qp,#qp *,#hb,#hb *,#hbtip{font-synthesis:none!important}';document.head.appendChild(s)}

// ── 浪漫配樂：D 大調、慢板，豎琴分解和弦＋溫暖鋪底＋八音盒，帶殘響 ──
memMusic=function(){let ac;try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return{stop(){}}}
 const T0=ac.currentTime,master=ac.createGain();master.gain.setValueAtTime(0,T0);master.gain.linearRampToValueAtTime(.55,T0+3);master.connect(ac.destination);
 // 殘響
 const rv=ac.createConvolver(),len=ac.sampleRate*3.2,ir=ac.createBuffer(2,len,ac.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}rv.buffer=ir;
 const wet=ac.createGain();wet.gain.value=.42;rv.connect(wet);wet.connect(master);
 const dry=ac.createGain();dry.gain.value=.8;dry.connect(master);
 const bus=ac.createGain();bus.connect(dry);bus.connect(rv);
 // 旋律用的回聲
 const dl=ac.createDelay(1),fb=ac.createGain(),dlg2=ac.createGain();dl.delayTime.value=.44;fb.gain.value=.3;dlg2.gain.value=.22;dl.connect(fb);fb.connect(dl);dl.connect(dlg2);dlg2.connect(bus);
 const f=m=>440*Math.pow(2,(m-69)/12),BPM=66,B=60/BPM;
 const tone=(type,m,t,d,v,o={})=>{if(!m)return;const os=ac.createOscillator(),g=ac.createGain();os.type=type;os.frequency.value=f(m);if(o.det)os.detune.value=o.det;
  if(o.vib){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=5;lg.gain.value=o.vib;l.connect(lg);lg.connect(os.detune);l.start(t);l.stop(t+d+.3)}
  let node=os;if(o.lp){const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;os.connect(fl);node=fl}
  const a=o.a||.01;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);if(o.sus){g.gain.setValueAtTime(v,t+Math.max(a,d-o.rel));g.gain.linearRampToValueAtTime(0,t+d)}else g.gain.exponentialRampToValueAtTime(.0005,t+d);
  node.connect(g);g.connect(bus);if(o.echo)g.connect(dl);os.start(t);os.stop(t+d+.1)};
 // 和弦：[低音, 和弦音]
 const CH=[[50,[62,66,69]],[49,[61,64,69]],[47,[59,62,66]],[45,[61,66,69]],[43,[59,62,67]],[42,[62,66,69]],[40,[62,67,71]],[45,[61,64,67]],
  [43,[59,62,67]],[45,[61,64,69]],[42,[61,66,69]],[47,[59,62,66]],[40,[59,64,67]],[45,[61,64,69]],[50,[62,66,69]],[50,[62,66,69]]];
 const MEL=[[[78,1.5],[76,.5],[74,2]],[[73,1],[74,.5],[76,.5],[69,2]],[[71,1.5],[73,.5],[74,1],[78,1]],[[76,3],[0,1]],
  [[74,1.5],[71,.5],[67,1],[71,1]],[[69,1],[74,1],[78,2]],[[79,1.5],[78,.5],[76,1],[74,1]],[[76,3],[0,1]],
  [[74,1],[79,1],[78,1.5],[76,.5]],[[76,1],[81,1],[79,1.5],[78,.5]],[[78,1.5],[76,.5],[73,1],[69,1]],[[74,1.5],[73,.5],[71,2]],
  [[67,1],[71,1],[76,1.5],[74,.5]],[[73,1],[76,1],[81,2]],[[78,1.5],[76,.5],[74,1],[73,.5],[76,.5]],[[74,4]]];
 const BAR=4*B,LOOP=16*BAR;let t0=T0+.4,stopped=false,rep=0;
 const sched=()=>{if(stopped)return;
  CH.forEach((c,i)=>{const bt=t0+i*BAR;
   // 鋪底（兩顆微微走音的鋸齒波，過低通，很柔）
   c[1].forEach(n=>{[-7,7].forEach(dt=>tone('sawtooth',n,bt,BAR+.25,.018,{det:dt,lp:850,a:1.1,sus:1,rel:.9}))});
   // 低音
   tone('sine',c[0],bt,BAR*.98,.22,{a:.05,sus:1,rel:.6});tone('sine',c[0]+12,bt+2*B,BAR/2,.06,{a:.05});
   // 豎琴分解和弦（八分音符，上行再下行）
   const ar=[c[0]+12,c[1][0],c[1][1],c[1][2],c[1][0]+12,c[1][2],c[1][1],c[1][0]];
   ar.forEach((n,k)=>tone('triangle',n,bt+k*B/2,1.6,.055,{a:.005}));
  });
  // 主旋律：柔和的正弦波＋顫音；第二輪加八音盒
  let t=t0;MEL.forEach(bar=>bar.forEach(q=>{if(q[0]){tone('sine',q[0],t,q[1]*B*1.05+.35,.16,{a:.04,vib:5,echo:1});tone('triangle',q[0],t,q[1]*B*.9,.035,{a:.02});
    if(rep%2==1)tone('sine',q[0]+12,t,.55,.05,{a:.003})}t+=q[1]*B}));
  // 段落之間的小鈴聲
  [0,8].forEach(i=>[86,90,93].forEach((n,k)=>tone('sine',n,t0+i*BAR+k*.09,1.2,.025,{a:.003})));
  rep++;t0+=LOOP;setTimeout(sched,(LOOP-3)*1000)};
 sched();
 return{stop(){stopped=true;try{master.gain.cancelScheduledValues(ac.currentTime);master.gain.setValueAtTime(master.gain.value,ac.currentTime);master.gain.linearRampToValueAtTime(0,ac.currentTime+1.2);setTimeout(()=>ac.close(),1500)}catch(e){}}}};

// ── 文字煙火：在照片兩側炸出 1113、520、♥、生日快樂…… ──
const FWTXT={side:['1113','520','♥','1113','520','♥','Kai','11/13'],wide:['生日快樂','我愛妳','HAPPY BIRTHDAY','1113','520 ♥','家宜']};
function fwTextPoints(txt,maxW,maxH){const c=document.createElement('canvas'),x=c.getContext('2d');let fs=Math.min(maxH,160);
 const fam='"Cubic11",sans-serif';x.font=`${fs}px ${fam}`;let w=x.measureText(txt).width;if(w>maxW){fs=Math.floor(fs*maxW/w);x.font=`${fs}px ${fam}`;w=x.measureText(txt).width}
 c.width=Math.ceil(w)+4;c.height=Math.ceil(fs*1.25);x.font=`${fs}px ${fam}`;x.textBaseline='middle';x.fillStyle='#fff';x.fillText(txt,2,c.height/2);
 const d=x.getImageData(0,0,c.width,c.height).data,st=Math.max(3,Math.round(fs/11)),pts=[];
 for(let y=0;y<c.height;y+=st)for(let i=0;i<c.width;i+=st)if(d[(y*c.width+i)*4+3]>120)pts.push([i-c.width/2,y-c.height/2]);return pts}
{const _fx=memFx;memFx=function(ov){const api=_fx(ov);const c=document.createElement('canvas');c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';ov.insertBefore(c,ov.children[1]||null);
 const x=c.getContext('2d');let Wd,Hd,dp;const fit=()=>{dp=Math.min(2,devicePixelRatio||1);Wd=innerWidth;Hd=innerHeight;c.width=Wd*dp;c.height=Hd*dp};fit();addEventListener('resize',fit);
 const COL=['#ff8fb1','#ffd36e','#8fe3ff','#ffffff','#c9a0ff','#ffb3c7'];const PT=[],RK=[];let alive=true,last=performance.now(),next=2500,letter=false;
 const fire=()=>{const wide=letter&&Math.random()<.5,txt=wide?FWTXT.wide[Math.floor(Math.random()*FWTXT.wide.length)]:FWTXT.side[Math.floor(Math.random()*FWTXT.side.length)];
  let cx,cy,mw,mh;if(wide){cx=Wd*(.25+Math.random()*.5);cy=Hd*(.14+Math.random()*.08);mw=Math.min(Wd*.6,520);mh=Math.min(90,Hd*.14)}
  else{const left=Math.random()<.5,side=Math.max(90,(Wd-Math.min(Wd*.8,560))/2);cx=left?side*.5:Wd-side*.5;cy=Hd*(.2+Math.random()*.45);mw=side*.85;mh=Math.min(110,Hd*.16)}
  const pts=fwTextPoints(txt,mw,mh);if(!pts.length)return;const col=COL[Math.floor(Math.random()*COL.length)];RK.push({x:cx+(Math.random()-.5)*40,y:Hd+6,tx:cx,ty:cy,t:0,dur:1+Math.random()*.3,pts,col})};
 const fr=now=>{if(!alive||!ov.isConnected){removeEventListener('resize',fit);return}const dt=Math.min(.05,(now-last)/1000);last=now;letter=letter||!!ov.querySelector('.mlet');
  x.setTransform(dp,0,0,dp,0,0);x.clearRect(0,0,Wd,Hd);x.globalCompositeOperation='lighter';
  next-=dt*1000;if(next<0){next=(letter?2600:3800)+Math.random()*1800;fire()}
  for(let i=RK.length-1;i>=0;i--){const r=RK[i];r.t+=dt;const k=Math.min(1,r.t/r.dur),e=1-Math.pow(1-k,2),yy=r.y+(r.ty-r.y)*e,xx=r.x+(r.tx-r.x)*e;
   x.globalAlpha=1;x.fillStyle=r.col;x.fillRect(Math.round(xx),Math.round(yy),3,7);x.globalAlpha=.4;x.fillRect(Math.round(xx),Math.round(yy)+8,3,12);
   if(k>=1){r.pts.forEach(p=>{const a=Math.random()*6.3,s=40+Math.random()*80;PT.push({x:r.tx,y:r.ty,ox:r.tx+p[0],oy:r.ty+p[1],sx:Math.cos(a)*s,sy:Math.sin(a)*s,t:0,hold:2.1+Math.random()*.5,col:Math.random()<.18?'#fff':r.col})});
    for(let k2=0;k2<36;k2++){const a=k2/36*6.283,s=180+Math.random()*60;PT.push({x:r.tx,y:r.ty,free:1,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1.1,col:r.col})}RK.splice(i,1)}}
  for(let i=PT.length-1;i>=0;i--){const q=PT[i];
   if(q.free){q.l-=dt;q.vx*=.97;q.vy=q.vy*.97+60*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.l<=0){PT.splice(i,1);continue}x.globalAlpha=q.l*.8;x.fillStyle=q.col;x.fillRect(Math.round(q.x),Math.round(q.y),3,3);continue}
   q.t+=dt;let px,py,a;if(q.t<.45){const k=q.t/.45,e=1-Math.pow(1-k,3);px=q.x+(q.ox-q.x)*e+q.sx*(1-e)*.0;py=q.y+(q.oy-q.y)*e;a=.5+k*.5}
   else if(q.t<q.hold){px=q.ox+Math.sin(q.t*3+q.ox)*.6;py=q.oy;a=.85+.15*Math.sin(q.t*14+q.oy)}
   else{const k=(q.t-q.hold)/1.1;if(k>=1){PT.splice(i,1);continue}px=q.ox;py=q.oy+k*k*40;a=1-k}
   x.globalAlpha=a*.28;x.fillStyle=q.col;x.fillRect(Math.round(px)-2,Math.round(py)-2,7,7);x.globalAlpha=a;x.fillRect(Math.round(px),Math.round(py),3,3)}
  x.globalCompositeOperation='source-over';x.globalAlpha=1;requestAnimationFrame(fr)};
 requestAnimationFrame(fr);const st0=api.stop;api.stop=()=>{alive=false;st0()};return api}}

// ── 信件：不要出現捲軸；整個畫面也不能被捲動 ──
{const s=document.createElement('style');s.textContent='.mtx{scrollbar-width:none;-ms-overflow-style:none;overflow-x:hidden!important}.mtx::-webkit-scrollbar{display:none;width:0;height:0}';document.head.appendChild(s)}
{const _m=memShow;memShow=function(onEnd){const H=document.documentElement,B=document.body,ho=H.style.overflow,bo=B.style.overflow;H.style.overflow='hidden';B.style.overflow='hidden';
 return _m.call(this,()=>{H.style.overflow=ho;B.style.overflow=bo;onEnd&&onEnd()})}}
// 信件底下加一層半透明的夜色，煙火在後面也看得清楚字
{const s=document.createElement('style');s.textContent='.mlet .mtx{background:rgba(14,8,26,.62);border-radius:16px;padding:18px 22px;box-shadow:0 0 40px 20px rgba(14,8,26,.55);backdrop-filter:blur(1.5px)}.mlet{z-index:3}.mend{z-index:6}';document.head.appendChild(s)}
