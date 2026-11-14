/* v13.15 遊戲背景音樂（16-bit 風格，程式即時合成）：白天小鎮、夜晚、在家三首，會依時間與地點切換；設定可調音量、關閉 */
const BGM={on:true,vol:.5,ac:null,out:null,cur:null,want:null,player:null};
try{const o=localStorage.getItem('pxBgmOn'),v=localStorage.getItem('pxBgmVol');if(o!=null)BGM.on=o=='1';if(v!=null)BGM.vol=+v}catch(e){}
const BGSONG={
 day:{n:'☀️ 白天的小鎮',bpm:104,lead:'marimba',ch:[[43,[67,71,74]],[40,[67,71,76]],[48,[67,72,76]],[50,[66,69,74]],[43,[67,71,74]],[40,[67,71,76]],[45,[69,72,76]],[50,[66,69,74]],
   [43,[67,71,74]],[48,[67,72,76]],[47,[67,71,74]],[48,[67,72,76]],[45,[69,72,76]],[50,[66,69,74]],[43,[67,71,74]],[43,[67,71,74]]],
  mel:[[[74,.5],[76,.5],[74,.5],[71,.5],[67,1],[71,1]],[[72,.5],[71,.5],[69,.5],[67,.5],[64,2]],[[72,1],[76,1],[79,1],[76,1]],[[74,3],[0,1]],[[74,.5],[76,.5],[74,.5],[71,.5],[67,1],[74,1]],[[79,1],[78,.5],[76,.5],[74,2]],[[72,.5],[74,.5],[76,1],[72,1],[69,1]],[[74,3],[0,1]],
   [[79,1],[78,.5],[76,.5],[74,2]],[[76,1],[74,.5],[72,.5],[72,2]],[[71,.5],[72,.5],[74,1],[79,1],[74,1]],[[76,3],[0,1]],[[72,1],[76,1],[74,1],[72,1]],[[71,1],[72,1],[74,2]],[[79,.5],[78,.5],[76,.5],[74,.5],[71,1],[69,1]],[[67,3],[0,1]]],arp:'bounce',hat:1},
 night:{n:'🌙 夜晚',bpm:66,lead:'musicbox',ch:[[45,[69,72,76]],[41,[65,69,72]],[48,[67,72,76]],[43,[67,71,74]],[50,[65,69,74]],[45,[69,72,76]],[41,[65,69,72]],[40,[68,71,76]]],
  mel:[[[76,2],[74,1],[72,1]],[[72,2],[69,2]],[[67,1],[72,1],[76,1],[79,1]],[[74,4]],[[76,2],[77,1],[76,1]],[[72,2],[69,2]],[[65,1],[69,1],[72,1],[74,1]],[[71,4]]],arp:'slow',pad:1},
 home:{n:'🏠 我們的家',bpm:82,lead:'piano',ch:[[48,[64,67,72]],[45,[64,69,72]],[50,[65,69,72]],[43,[65,67,71]],[48,[64,67,72]],[40,[64,68,71]],[45,[64,69,72]],[41,[65,69,72]],
   [50,[65,69,74]],[43,[67,71,74]],[40,[64,67,71]],[45,[64,69,72]],[50,[65,69,74]],[43,[65,67,71]],[48,[64,67,72]],[48,[64,67,72]]],
  mel:[[[72,1],[71,.5],[72,.5],[76,2]],[[74,1],[72,1],[69,2]],[[69,1],[72,1],[77,1.5],[76,.5]],[[74,3],[0,1]],[[76,1],[74,.5],[72,.5],[79,2]],[[80,1],[79,.5],[76,.5],[71,2]],[[72,1],[76,1],[81,1.5],[79,.5]],[[77,3],[0,1]],
   [[77,1],[76,.5],[74,.5],[72,2]],[[71,1],[72,1],[74,2]],[[76,1.5],[74,.5],[72,1],[71,1]],[[72,1],[69,1],[72,2]],[[74,1],[77,1],[81,1],[77,1]],[[79,1.5],[77,.5],[76,1],[74,1]],[[72,4]],[[0,4]]],arp:'piano',pad:1}};
function bgmCtx(){if(BGM.ac)return BGM.ac;try{const ac=new (window.AudioContext||window.webkitAudioContext)();BGM.ac=ac;BGM.out=ac.createGain();BGM.out.gain.value=BGM.on?BGM.vol:0;BGM.out.connect(ac.destination);
 const rv=ac.createConvolver(),len=ac.sampleRate*2.4,ir=ac.createBuffer(2,len,ac.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.5)}rv.buffer=ir;
 const wet=ac.createGain();wet.gain.value=.3;rv.connect(wet);wet.connect(BGM.out);BGM.rv=rv;
 const nb=ac.createBuffer(1,ac.sampleRate*.2,ac.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;BGM.noise=nb;return ac}catch(e){return null}}
function bgmPlay(song){const ac=bgmCtx();if(!ac)return null;const S=BGSONG[song],B=60/S.bpm,BAR=4*B,LOOP=S.ch.length*BAR;
 const sg=ac.createGain();sg.gain.setValueAtTime(0,ac.currentTime);sg.gain.linearRampToValueAtTime(1,ac.currentTime+2);sg.connect(BGM.out);sg.connect(BGM.rv);
 const pan=v=>{try{const p=ac.createStereoPanner();p.pan.value=v;p.connect(sg);return p}catch(e){return sg}},L=pan(-.3),R=pan(.3);
 const f=m=>440*Math.pow(2,(m-69)/12);
 const tone=(dst,type,m,t,d,v,o={})=>{if(!m)return;const os=ac.createOscillator(),g=ac.createGain();os.type=type;os.frequency.value=f(m);if(o.det)os.detune.value=o.det;
  if(o.vib){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=5.4;lg.gain.value=o.vib;l.connect(lg);lg.connect(os.detune);l.start(t+.1);l.stop(t+d+.2)}
  let n=os;if(o.lp){const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;os.connect(fl);n=fl}
  const a=o.a||.008;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);if(o.sus){g.gain.setValueAtTime(v,t+Math.max(a,d-o.rel));g.gain.linearRampToValueAtTime(0,t+d)}else g.gain.exponentialRampToValueAtTime(.0005,t+d);
  n.connect(g);g.connect(dst);os.start(t);os.stop(t+d+.1)};
 const hat=(t,v)=>{const s=ac.createBufferSource();s.buffer=BGM.noise;const hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=7000;const g=ac.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0005,t+.05);s.connect(hp);hp.connect(g);g.connect(R);s.start(t);s.stop(t+.06)};
 const lead=(m,t,d)=>{if(S.lead=='marimba'){tone(sg,'sine',m,t,Math.min(.6,d+.2),.16,{a:.003});tone(sg,'triangle',m+12,t,.18,.04,{a:.002})}
  else if(S.lead=='musicbox'){tone(sg,'sine',m+12,t,1.6,.11,{a:.002});tone(sg,'sine',m+24,t,.5,.025,{a:.002})}
  else{tone(sg,'triangle',m,t,Math.max(1,d*1.2),.14,{a:.004});tone(sg,'sine',m+12,t,.8,.04,{a:.004})}};
 let t0=ac.currentTime+.2,stop=false,rep=0,tid=0;
 const sch=()=>{if(stop)return;
  S.ch.forEach((c,i)=>{const bt=t0+i*BAR;
   if(S.pad)c[1].forEach(n=>[-7,7].forEach(dt=>tone(sg,'sawtooth',n-12,bt,BAR+.3,.011,{det:dt,lp:650,a:1,sus:1,rel:.9})));
   if(S.arp=='bounce'){tone(sg,'triangle',c[0],bt,.3,.2);tone(sg,'triangle',c[0]+12,bt+B,.25,.13);tone(sg,'triangle',c[0]+7,bt+2*B,.3,.18);tone(sg,'triangle',c[0]+12,bt+3*B,.25,.13);
    [0,1,2,3].forEach(j=>tone(j%2?L:R,'square',c[1][(j+1)%3],bt+j*B+B/2,.12,.018,{a:.002,lp:2400}))}
   else if(S.arp=='slow'){tone(sg,'sine',c[0],bt,BAR,.18,{a:.05,sus:1,rel:.6});[0,1,2,1].forEach((k,j)=>tone(j%2?L:R,'triangle',c[1][k],bt+j*B,1.4,.04,{a:.004}))}
   else{tone(sg,'triangle',c[0],bt,BAR*.9,.17,{a:.01,sus:1,rel:.6});[0,1,2,1,0,1,2,1].forEach((k,j)=>tone(j%2?L:R,'triangle',c[1][k],bt+j*B/2,1,.035,{a:.004}))}
   if(S.hat)for(let j=0;j<4;j++)hat(bt+j*B+B/2,.03)});
  let t=t0,mel=S.mel;mel.forEach(bar=>bar.forEach(q=>{if(q[0]){lead(q[0],t,q[1]*B);if(rep%2==1&&S.lead!='musicbox')tone(L,'sine',q[0]+12,t+.02,.4,.03,{a:.002})}t+=q[1]*B}));
  rep++;t0+=LOOP;tid=setTimeout(sch,Math.max(500,(t0-ac.currentTime-2.5)*1000))};
 sch();return{song,stop(){stop=true;clearTimeout(tid);try{sg.gain.cancelScheduledValues(ac.currentTime);sg.gain.setValueAtTime(sg.gain.value,ac.currentTime);sg.gain.linearRampToValueAtTime(0,ac.currentTime+1.5);setTimeout(()=>{try{sg.disconnect()}catch(e){}},1700)}catch(e){}}}}
function bgmWant(){try{if(!BGM.on)return null;if(document.getElementById('titleOv')||window.TITLE)return null;if((typeof MG!='undefined'&&MG)||document.querySelector('.mdots'))return null;if(window.OVL)return null;
 if(typeof scene!='undefined'&&scene&&/家$|公寓|^家/.test(scene))return 'home';const h=T.hour;return (h>=18.5||h<5.5)?'night':'day'}catch(e){return null}}
function bgmTick(){const w=bgmWant();if(w==BGM.cur)return;if(BGM.player){BGM.player.stop();BGM.player=null}BGM.cur=w;if(w&&BGM.ac){if(BGM.ac.state=='suspended')BGM.ac.resume();BGM.player=bgmPlay(w)}}
setInterval(()=>{if(BGM.ac)bgmTick()},1500);
// 瀏覽器規定要先有點擊或按鍵才能出聲
const bgmWake=()=>{if(!BGM.on)return;const ac=bgmCtx();if(ac&&ac.state=='suspended')ac.resume();bgmTick()};addEventListener('pointerdown',bgmWake,true);addEventListener('keydown',bgmWake,true);
function bgmSet(on,vol){if(on!=null)BGM.on=on;if(vol!=null)BGM.vol=vol;try{localStorage.setItem('pxBgmOn',BGM.on?'1':'0');localStorage.setItem('pxBgmVol',BGM.vol)}catch(e){}
 if(BGM.out){const ac=BGM.ac;BGM.out.gain.cancelScheduledValues(ac.currentTime);BGM.out.gain.setTargetAtTime(BGM.on?BGM.vol:0,ac.currentTime,.08)}if(BGM.on)bgmWake();else{if(BGM.player){BGM.player.stop();BGM.player=null}BGM.cur=null}}
// ── 設定：音樂開關與音量 ──
function bgmMenu(back){const pct=Math.round(BGM.vol*100);
 openDlg('🎵 背景音樂',`目前：${BGM.on?(BGM.cur?BGSONG[BGM.cur].n:'（等一下就會播）'):'已關閉'}<br><div style="display:flex;align-items:center;gap:8px;margin-top:10px">🔈<input id="bgmV" type="range" min="0" max="100" step="5" value="${pct}" style="flex:1"><span id="bgmVt" style="width:44px;text-align:right">${pct}%</span>🔊</div>
  <div style="font-size:12px;opacity:.75;margin-top:6px">白天、夜晚、在家會自動換不同的曲子；小遊戲和回憶相簿播放時會先暫停。</div>`,
  [[BGM.on?'🔇 關閉音樂':'🔊 開啟音樂','',()=>{bgmSet(!BGM.on);bgmMenu(back)}],['🎼 試聽：'+BGSONG.day.n,'',()=>bgmPreview('day')],['🎼 試聽：'+BGSONG.night.n,'',()=>bgmPreview('night')],['🎼 試聽：'+BGSONG.home.n,'',()=>bgmPreview('home')],['返回','',back||closeDlg]]);
 setTimeout(()=>{const r=document.getElementById('bgmV');if(!r)return;['keydown','pointerdown'].forEach(ev=>r.addEventListener(ev,e=>e.stopPropagation()));r.oninput=()=>{document.getElementById('bgmVt').textContent=r.value+'%';bgmSet(null,+r.value/100)}},50)}
function bgmPreview(k){if(!BGM.on)bgmSet(true);bgmCtx();if(BGM.player)BGM.player.stop();BGM.cur=k;BGM.player=bgmPlay(k);toast('🎼 '+BGSONG[k].n+'（之後會依時間地點自動切換）')}
{const om=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts)&&!opts.some(q=>/背景音樂/.test(q[0]))){const i=opts.findIndex(q=>/畫面與字體/.test(q[0]));opts.splice(i<0?opts.length-1:i+1,0,['🎵 背景音樂',BGM.on?'音量 '+Math.round(BGM.vol*100)+'%':'已關閉',()=>bgmMenu(openMenu)])}return od.call(this,t,d,opts,...r)};try{return om.apply(this,arguments)}finally{openDlg=od}}}
{const _h=phoneHome;phoneHome=function(){_h.apply(this,arguments);try{if(!curDlg)return;const o=curDlg[2];if(o.some(q=>/音樂/.test(q[0])))return;const i=o.findIndex(q=>String(q[0]).includes('畫面'));o.splice(i<0?o.length:i+1,0,['🎵 音樂','音量、開關',()=>bgmMenu(phoneHome),0,1]);openDlg(curDlg[0],curDlg[1],o,0,'grid')}catch(e){}}}
// 標題的主題曲在播時，背景音樂不要疊上去（bgmWant 已處理）；設定頁也放一個入口
{const _v=viewMenu;viewMenu=function(back){_v.apply(this,arguments);try{const o=curDlg[2];if(!o.some(q=>/背景音樂/.test(q[0]))){o.splice(o.length-1,0,['🎵 背景音樂設定','',()=>bgmMenu(()=>viewMenu(back))]);openDlg(curDlg[0],curDlg[1],o)}}catch(e){}}}
