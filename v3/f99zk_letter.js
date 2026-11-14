/* v13.42 生日禮物：新的信（冠宏親筆版）＋一頁一頁淡出翻頁＋新配樂（前奏→主歌→導歌→副歌→間奏→轉調副歌，有起伏、有鼓） */
MEMLETTER.length=0;
[['親愛的老婆：',1],
 ['今天是妳的生日，先祝妳生日快樂！'],
 ['這是要送給妳的禮物。','雖然只是一個小遊戲，沒有什麼大場面，也沒有很豐富的玩法，','卻是我熬了好幾個晚上、朝思暮想，一點一點做出來的。'],
 ['製作的過程中，除了享受創造的樂趣，','我也不斷回想自己的人生，後來才發現——','啊！原來是妳，劉小姐！'],
 ['妳的出現讓我的人生有了轉變，也有了非凡的意義。','能認識妳、在一起、結婚、共組家庭，是多麼寶貴的事情。'],
 ['我懷著對妳的愛做出這個禮物，','裡面有我們一起經歷的大大小小的事，','希望妳玩的時候，可以想起那些快樂的點點滴滴。'],
 ['我愛妳❤️ 老婆～','接下來，是我想對妳說的話……'],
 ['今年，是妳來台灣的第十年。','我常想，十年前妳一個人拖著行李，從澳門來到這裡唸書，','心情一定很忐忑不安。'],
 ['那時候的妳應該也沒想到，','有一天會跟一個在交友軟體上認識的軍人，在林園的公園聊天，','聊著聊著，就在一起了。'],
 ['這十年很長。','幾年前還遇到疫情，過年過節別人都回家團圓，妳只能留在台灣，','為了工作、為了居留證，獨自一個人……'],
 ['那是妳最辛苦、最想哭的時候，','很多時候都是妳一個人撐過來的。','辛苦了。'],
 ['那時候的我，曾經單純地想過一個不婚不生、自己快樂一輩子的日子。','後來，感謝主讓我認識了妳。'],
 ['我看見妳的執著、獨立和韌性，也愛上了非常愛主的妳。','因為有信仰的力量，我更有信心，也更確定：','妳就是我一生的伴侶。'],
 ['我們都不是完美的人，就像瓦器一樣平凡，也有裂痕；','但因為神把寶貝放在我們裡面，','我們才看得見彼此的美好，和更多的祝福。'],
 ['未來的日子，妳不再是一個人了。','走過高山、走過低谷，我們都不要放棄彼此。'],
 ['回想認識到現在，我們走過屏東、高雄大大小小的地方：','過年去大樹舊鐵橋，在潮州吃燒冷冰，在大草皮吹泡泡、放風箏，','在關子嶺看夜景、晚上偷偷泡湯😖，在十鼓尖叫著溜滑索。'],
 ['妳穿著我的軍服在教會裡大笑；','中秋晚會看我用 J-Sax 把柯南吹得亂七八糟，笑到停不下來。','留下了好多好多回憶。'],
 ['一直到去年的今天，我在頂樓等妳。','一屋子的朋友、一串串的燈，妳害羞地說了「好」。','那時候的我，覺得好幸福。'],
 ['今年 2 月 15 日，妳嫁給了我，','我們終於一起搬進這間三十多年的老公寓。'],
 ['它會漏水、會長壁癌、要爬樓梯、要追垃圾車，','廚房也總是覺得太小……'],
 ['我們也會吵架、會累，','也會因為衣服沒收、碗沒洗、垃圾沒丟，讓彼此難過。','但這些都在提醒我們：不要說氣話，要為彼此捨己、替對方著想，','要有比別人更大的包容。'],
 ['原來，上帝是在教我，什麼才是真正的愛。'],
 ['所以現在，我一邊收衣服、洗碗，一邊感謝主，一邊無奈地笑——','因為這代表妳真的把這裡當成家了。','這，就是家的感覺吧。'],
 ['聖經說：','「哭有時，笑有時；哀慟有時，跳舞有時。」','—— 傳道書 3:4',4],
 ['這十年，妳哭過，也笑過。'],
 ['但神說：','「神造萬物，各按其時成為美好。」','—— 傳道書 3:11',4],
 ['那些哭的日子沒有白費，','它們把妳帶到了我身邊。'],
 ['謝謝妳在離家很遠的地方選擇了我，','也讓台灣成為妳的第二個家。'],
 ['接下來的十年，老房子的每一個角落、一起在教會的日常、一起出去玩的時候，','還有所有哭和笑的日子，','都讓我陪妳一起過。'],
 ['老婆，生日快樂。','我愛妳。',2],
 ['—— 愛妳的老公 aka 臭腳阿宏','115 年 11 月 13 日',3]].forEach(p=>MEMLETTER.push(p));

// ── 一頁一頁：寫滿了就把前面的段落淡出（像翻頁），經文用金色 ──
{const s=document.createElement('style');s.textContent=`.mtx p{transition:opacity .9s}.mtx p.mgo{opacity:0}.mtx p.mvs{color:#ffd98a;font-weight:800;text-align:center;font-size:1.08em}
 .mtx p.mvs span.mref{display:block;font-size:.8em;opacity:.75;font-weight:600}
 .mlet .mpg{position:absolute;right:16px;top:12px;font-size:12px;opacity:.55;z-index:4}
 .mall{position:absolute;left:50%;bottom:78px;transform:translateX(-50%);font:inherit;font-size:13px;background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:6px 16px;cursor:pointer;z-index:6;opacity:0;transition:opacity 1s}
 .mtx.mfull{overflow-y:auto!important;touch-action:pan-y;max-height:calc(100vh - 150px)!important;align-self:flex-start;margin-top:4px}.mtx.mfull p{display:block!important;opacity:1!important}`;document.head.appendChild(s)}
function letPage(tx){if(tx.classList.contains('mfull'))return;const ps=[...tx.children];
 // 經文段落加樣式
 ps.forEach((p,i)=>{const P=MEMLETTER[i];if(P&&P.includes(4)&&!p.classList.contains('mvs')){p.classList.add('mvs')}});
 if(tx.scrollHeight<=tx.clientHeight+4)return;
 const vis=ps.filter(p=>p.style.display!='none'&&!p.classList.contains('mgo'));if(vis.length<2)return;
 // 留下正在打字的這一段，前面的全部淡出
 vis.slice(0,-1).forEach(p=>{p.classList.add('mgo');setTimeout(()=>{p.style.display='none'},900)})}
{const _m=memShow;memShow=function(onEnd){const r=_m.apply(this,arguments);try{const ov=[...document.body.children].reverse().find(e=>e.querySelector&&e.querySelector('.mdots'));if(!ov)return r;
 let tx=null,pg=0;const mo=new MutationObserver(()=>{if(!tx){tx=ov.querySelector('.mtx');if(!tx)return;tx.style.overflowY='hidden'}
  letPage(tx);
  // 結尾：多一個「看完整封信」
  const end=ov.querySelector('.mend');if(end&&!ov.querySelector('.mall')){const b=document.createElement('button');b.className='mall';b.textContent='📜 從頭看整封信';ov.appendChild(b);setTimeout(()=>b.style.opacity=1,900);
   b.onclick=e=>{e.stopPropagation();tx.classList.add('mfull');[...tx.children].forEach(p=>{p.style.display='';p.classList.remove('mgo')});tx.scrollTop=0;b.remove();toast&&toast('👆 上下滑動可以看整封信')}}});
 mo.observe(ov,{childList:true,subtree:true,characterData:true});
 const iv=setInterval(()=>{if(!ov.isConnected){mo.disconnect();clearInterval(iv)}},2000)}catch(e){console.warn(e)}return r}}

// ════════ 新配樂：〈各按其時〉 ════════
// C 大調、84 BPM。前奏（八音盒）→ 主歌 → 導歌（弦樂漸強）→ 副歌（I–V–vi–IV 洗腦旋律＋鼓）
// → 主歌 2（加副旋律）→ 導歌 → 副歌（全編制）→ 間奏（安靜）→ 轉調副歌（升 D 大調，最高潮）→ 尾奏 → 回到主歌循環
memMusic=function(){let ac;try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return{stop(){}}}
 const T0=ac.currentTime,master=ac.createGain();master.gain.setValueAtTime(0,T0);master.gain.linearRampToValueAtTime(.6,T0+2.5);
 const comp=ac.createDynamicsCompressor();comp.threshold.value=-16;comp.ratio.value=3;master.connect(comp);comp.connect(ac.destination);
 const rv=ac.createConvolver(),len=ac.sampleRate*2.8,ir=ac.createBuffer(2,len,ac.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.8)}rv.buffer=ir;
 const wet=ac.createGain();wet.gain.value=.36;rv.connect(wet);wet.connect(master);const dry=ac.createGain();dry.gain.value=.85;dry.connect(master);
 const bus=ac.createGain();bus.connect(dry);bus.connect(rv);const dbus=ac.createGain();dbus.gain.value=1;dbus.connect(dry);const dsend=ac.createGain();dsend.gain.value=.12;dbus.connect(dsend);dsend.connect(rv);
 const dl=ac.createDelay(1),fb=ac.createGain(),dlo=ac.createGain();dl.delayTime.value=60/84*.75;fb.gain.value=.28;dlo.gain.value=.18;dl.connect(fb);fb.connect(dl);dl.connect(dlo);dlo.connect(bus);
 const noise=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);{const d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}
 const f=m=>440*Math.pow(2,(m-69)/12),BPM=84,B=60/BPM,BAR=4*B;
 const tone=(type,m,t,d,v,o={})=>{if(!m||v<=0)return;const os=ac.createOscillator(),g=ac.createGain();os.type=type;os.frequency.value=f(m);if(o.det)os.detune.value=o.det;
  if(o.vib){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=5.2;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(o.vib,t+.35);l.connect(lg);lg.connect(os.detune);l.start(t);l.stop(t+d+.3)}
  let node=os;if(o.lp){const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.setValueAtTime(o.lp,t);if(o.lp2)fl.frequency.linearRampToValueAtTime(o.lp2,t+d);os.connect(fl);node=fl}
  const a=o.a||.01;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);if(o.sus){g.gain.setValueAtTime(v,t+Math.max(a,d-o.rel));g.gain.linearRampToValueAtTime(0,t+d)}else g.gain.exponentialRampToValueAtTime(.0004,t+d);
  node.connect(g);g.connect(o.drum?dbus:bus);if(o.echo)g.connect(dl);os.start(t);os.stop(t+d+.1)};
 // 鋼琴感：三角波＋一點方波泛音，快速衰減
 const piano=(m,t,v,d=1.4)=>{tone('triangle',m,t,d,v,{a:.004});tone('sine',m+12,t,d*.5,v*.25,{a:.003})};
 const kick=(t,v)=>{const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+.16);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.32);o.connect(g);g.connect(dbus);o.start(t);o.stop(t+.35)};
 const nz=(t,v,d,type,fq,q=1)=>{const s=ac.createBufferSource();s.buffer=noise;const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.value=fq;fl.Q.value=q;const g=ac.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(fl);fl.connect(g);g.connect(dbus);s.start(t,Math.random()*.5);s.stop(t+d+.02)};
 const snare=(t,v)=>{nz(t,v,.2,'bandpass',1900,.8);tone('triangle',55,t,.12,v*.6,{a:.002,drum:1})};
 const hat=(t,v)=>nz(t,v,.05,'highpass',7500);
 const shaker=(t,v)=>nz(t,v,.08,'bandpass',6000,1.5);
 // 和弦（C 大調）：[低音, 和弦音]
 const C={C:[48,[60,64,67]],G:[43,[59,62,67]],Am:[45,[60,64,69]],F:[41,[60,65,69]],Em:[40,[59,64,67]],Dm:[38,[62,65,69]],Gs:[43,[60,62,67]],E:[40,[59,64,68]]};
 // 旋律：[音高, 拍數]，0 = 休止
 const HOOK=[[[76,1.5],[74,.5],[72,1],[79,1]],[[79,1.5],[77,.5],[76,.5],[74,1.5]],[[72,1],[76,1],[81,1.5],[79,.5]],[[77,1],[76,.5],[74,.5],[72,2]],
  [[76,1.5],[74,.5],[72,1],[79,1]],[[79,1],[81,.5],[79,.5],[77,1],[76,1]],[[77,1],[76,1],[74,1],[72,1]],[[74,3],[0,1]]];
 const SEC={
  intro:{ch:['C','G','Am','F'],lv:0,mel:[[[0,4]],[[0,4]],[[0,4]],[[0,4]]],box:HOOK.slice(0,4)},
  verse:{ch:['F','G','Em','Am','Dm','G','C','C'],lv:1,mel:[[[69,1],[72,1],[72,1],[74,.5],[72,.5]],[[71,2],[67,2]],[[67,1],[71,1],[71,1],[72,.5],[71,.5]],[[69,3],[0,1]],
   [[69,1],[72,1],[77,1],[76,.5],[74,.5]],[[74,2],[71,1],[67,1]],[[72,1],[74,1],[76,2]],[[76,2],[0,1],[67,1]]]},
  pre:{ch:['Am','F','G','Gs'],lv:1.5,swell:1,mel:[[[72,.5],[72,.5],[72,.5],[74,.5],[76,1],[72,1]],[[77,.5],[77,.5],[77,.5],[76,.5],[77,1],[81,1]],[[79,1.5],[77,.5],[76,1],[74,1]],[[74,1],[76,.5],[77,.5],[79,2]]]},
  chorus:{ch:['C','G','Am','F','C','G','F','G'],lv:2,mel:HOOK},
  chorus2:{ch:['C','G','Am','F','C','G','F','G'],lv:3,mel:HOOK},
  bridge:{ch:['Am','Em','F','G'],lv:.5,mel:[[[76,2],[72,2]],[[71,2],[67,2]],[[69,2],[72,2]],[[74,2],[79,1],[0,1]]]},
  outro:{ch:['F','G','C','C'],lv:.8,mel:[[[77,1],[76,1],[74,1],[72,1]],[[74,2],[71,2]],[[72,4]],[[0,4]]],box:[[[0,4]],[[0,4]],[[84,1],[79,1],[76,1],[72,1]],[[0,4]]]}};
 const SONG=[['intro',0],['verse',0],['pre',0],['chorus',0],['verse',0,1],['pre',0],['chorus2',0],['bridge',0],['chorus2',2],['outro',2]],LOOPAT=1;
 let t0=T0+.5,idx=0,stopped=false,pass=0;
 const play=(name,tr,v2)=>{const S=SEC[name],lv=S.lv;
  S.ch.forEach((cn,i)=>{const c=C[cn],bt=t0+i*BAR,bass=c[0]+tr,nt=c[1].map(n=>n+tr);
   // 弦樂鋪底（導歌會越來越大聲、越來越亮）
   const pv=(.012+lv*.006)*(S.swell?(1+i*.5):1);nt.forEach(n=>[-8,8].forEach(dt=>tone('sawtooth',n,bt,BAR+.3,pv,{det:dt,lp:S.swell?600+i*500:700+lv*250,lp2:S.swell?1100+i*600:0,a:S.swell?BAR*.8:.9,sus:1,rel:.8})));
   if(lv>=2)nt.forEach(n=>tone('sawtooth',n+12,bt,BAR+.3,.006,{det:5,lp:1600,a:.6,sus:1,rel:.6}));
   // 低音
   if(lv>=.8){tone('sine',bass,bt,BAR*.98,.2+lv*.03,{a:.03,sus:1,rel:.5});if(lv>=2){tone('triangle',bass,bt+2.5*B,B*.5,.09,{a:.01});tone('sine',bass+12,bt+3*B,B,.07,{a:.02})}}
   // 鋼琴分解和弦
   const ar=lv>=2?[bass+12,nt[0],nt[1],nt[2],nt[0]+12,nt[2],nt[1],nt[0]]:[bass+12,nt[0],nt[1],nt[2],nt[0]+12,nt[2],nt[1],nt[0]];
   const pvv=lv<=.5?.05:lv>=3?.045:.055;ar.forEach((n,k)=>{if(lv<1&&k%2)return;piano(n,bt+k*B/2,pvv*(k==0?1.2:1),lv<1?2.2:1.3)});
   if(lv>=2)nt.forEach(n=>piano(n,bt,.03,.9));
   // 鼓
   if(lv>=1&&lv<2)for(let k=0;k<8;k++)shaker(bt+k*B/2,k%2?.025:.04);
   if(lv>=2){kick(bt,.42);kick(bt+2*B,.38);if(lv>=3)kick(bt+2.5*B,.22);snare(bt+B,.13+lv*.02);snare(bt+3*B,.13+lv*.02);for(let k=0;k<8;k++)hat(bt+k*B/2,k%2?.025:.045);
    if(i==S.ch.length-1){snare(bt+3.5*B,.09);snare(bt+3.75*B,.11)}}
   if(S.swell&&i==S.ch.length-1){for(let k=0;k<8;k++)snare(bt+2*B+k*B/4,.02+k*.012);tone('sine',96+tr,bt+3.5*B,1.5,.03,{a:.003})}});
  // 主旋律
  let t=t0;S.mel.forEach(bar=>bar.forEach(q=>{if(q[0]){const m=q[0]+tr,d=q[1]*B;
    tone('sine',m,t,d*1.02+.3,.15+lv*.012,{a:.035,vib:6,echo:1});tone('triangle',m,t,d*.9,.04,{a:.02});
    if(lv>=3){tone('square',m+12,t,d*.8,.012,{a:.03,lp:2200});tone('sine',m-12,t,d,.04,{a:.04})}}t+=q[1]*B}));
  // 八音盒（前奏、尾奏）
  if(S.box){let tb=t0;S.box.forEach(bar=>bar.forEach(q=>{if(q[0]){tone('sine',q[0]+12+tr,tb,1.1,.07,{a:.003,echo:1});tone('sine',q[0]+24+tr,tb,.4,.015,{a:.002})}tb+=q[1]*B}))}
  // 主歌 2：副旋律（高八度的長音）
  if(v2){[[79,4],[79,4],[76,4],[76,4],[77,4],[74,4],[76,4],[79,4]].forEach((q,i)=>tone('sine',q[0]+tr,t0+i*BAR,BAR,.035,{a:.6,sus:1,rel:.8,vib:4}))}
  // 副歌第一拍：一聲鈴
  if(lv>=2)[96,100,103].forEach((n,k)=>tone('sine',n+tr-12,t0+k*.07,1.4,.025,{a:.003}));
  return S.ch.length*BAR};
 const sched=()=>{if(stopped)return;const q=SONG[idx],dur=play(q[0],q[1],q[2]);t0+=dur;idx++;if(idx>=SONG.length){idx=LOOPAT;pass++}
  setTimeout(sched,Math.max(200,(t0-ac.currentTime-1.5)*1000))};
 sched();
 return{stop(){stopped=true;try{master.gain.cancelScheduledValues(ac.currentTime);master.gain.setValueAtTime(master.gain.value,ac.currentTime);master.gain.linearRampToValueAtTime(0,ac.currentTime+1.4);setTimeout(()=>ac.close(),1700)}catch(e){}}}};
