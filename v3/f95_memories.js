/* v13.4 家宜生日回憶輪播：15 張照片＋原創 8-bit 配樂＋冠宏寫給家宜的一段話 */
const MEMLETTER=[['親愛的家宜：',1],
 ['十年前，妳一個人從澳門來到台灣唸書。','那時候的妳一定沒想到，','有一天會跟一個網路上認識的軍人，出來聊天到很晚。','老實說，那一個禮拜，是我第一次這麼敞開地對一個女生講這麼多話。'],
 ['後來，我們一起約會，走過屏東大大小小的地方，逛街、吃東西。','有大樹舊鐵橋的春天、有我外散宿跑出來在潮州吃的燒冷冰，','在大草皮吹泡泡、放風箏。'],
 ['一起開始教會生活後，妳曾穿著我的軍服在教會裡開懷大笑，','也在中秋節看我把 J-Sax 吹得亂七八糟，笑到停不下來。','妳的笑容，是我一生最愛的畫面。'],
 ['墾丁的陽光、台南的吊橋、星月天空的風，','還有每一次我們站在一起敬拜禱告的樣子，','這些畫面，我都一格一格存起來了。'],
 ['今年 2 月 15 日，妳嫁給了我，','搬進這間三十多年的老公寓。','它有點舊，颱風天會漏水，牆角會長壁癌，','但因為有妳，它終於變成了「家」。'],
 ['謝謝妳在離家很遠的地方，選擇了我，','也讓台灣成為妳的第二個家。','往後的日子，換我陪妳一起度過。'],
 ['老婆，生日快樂。','我愛妳。',2],['—— 冠宏','115 年 11 月 13 日',3]];
// ───────── 原創 8-bit 配樂（溫柔的 C 大調） ─────────
function memMusic(){let ac;try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return{stop(){}}}
 const out=ac.createGain();out.gain.value=0;out.connect(ac.destination);out.gain.linearRampToValueAtTime(.16,ac.currentTime+2);
 const f=m=>440*Math.pow(2,(m-69)/12),BPM=76,B=60/BPM;
 // 旋律（四分音符為 1 拍；0 = 休止）
 const MEL=[[76,1],[74,1],[72,1],[67,1],[71,1],[72,1],[74,2],[72,1],[71,1],[69,1],[64,1],[65,1],[67,1],[69,2],
  [76,1],[74,1],[72,1],[67,1],[71,1],[72,1],[74,1],[79,1],[76,1],[74,1],[72,1],[69,1],[72,3],[0,1],
  [69,1],[72,1],[76,2],[74,1],[72,1],[71,2],[69,1],[67,1],[65,2],[64,1],[65,1],[67,2],
  [69,1],[72,1],[76,2],[77,1],[76,1],[74,2],[72,1],[74,1],[76,1],[79,1],[77,1],[74,1],[72,2]];
 const CH=[[48,55,60,64],[43,55,59,62],[45,57,60,64],[41,53,57,60],[48,55,60,64],[43,55,59,62],[45,57,60,64],[41,53,57,60],[45,57,60,64],[40,55,59,64],[41,53,57,60],[43,55,59,62],[45,57,60,64],[41,53,57,60],[43,55,59,62],[48,55,60,64]];
 const note=(type,m,t,d,v)=>{if(!m)return;const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f(m);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0008,t+d);o.connect(g);g.connect(out);o.start(t);o.stop(t+d+.05)};
 let t0=ac.currentTime+.3,stopped=false;const LEN=16*4*B;
 const sched=()=>{if(stopped)return;let t=t0;MEL.forEach(q=>{note('triangle',q[0],t,q[1]*B*.95,.5);note('square',q[0]?q[0]+12:0,t,q[1]*B*.4,.04);t+=q[1]*B});
  CH.forEach((c,i)=>{const bt=t0+i*4*B;note('triangle',c[0]-12,bt,4*B*.95,.35);for(let k=0;k<8;k++)note('square',c[1+(k%3)],bt+k*B/2,B*.45,.05)});
  t0+=LEN;setTimeout(sched,(LEN-2)*1000)};sched();
 return{stop(){stopped=true;try{out.gain.cancelScheduledValues(ac.currentTime);out.gain.setValueAtTime(out.gain.value,ac.currentTime);out.gain.linearRampToValueAtTime(0,ac.currentTime+1.5);setTimeout(()=>ac.close(),1800)}catch(e){}}}}
// ───────── 輪播 ─────────
function memShow(onEnd){window.TITLE=true;window.OVL=(window.OVL||0)+1;Object.keys(keys).forEach(k=>keys[k]=0);try{closeDlg()}catch(e){}
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99999;background:#0c0814;overflow:hidden;font-family:inherit;color:#fff6e8';
 ov.innerHTML=`<style>.mfr{position:absolute;left:50%;top:46%;width:max-content;transform:translate(-50%,-50%) scale(.94) rotate(calc(var(--r) * -1));background:#fbf7ee;padding:12px 12px 46px;box-shadow:0 14px 50px rgba(0,0,0,.7);opacity:0;transition:opacity 1s,transform 4.6s ease-out}
 .mfr.on{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(var(--r))}.mfr img{display:block;image-rendering:pixelated}
 .mfr .cp{position:absolute;left:0;right:0;bottom:12px;text-align:center;color:#5a3417;font-weight:800;font-size:clamp(13px,3.4vw,17px)}
 .mdots{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);display:flex;gap:6px}.mdots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.25)}.mdots i.on{background:#ffb0c8}
 .mskip{position:absolute;right:14px;bottom:14px;font:inherit;font-size:12px;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:5px 12px;cursor:pointer}
 .mlet{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 1.5s;padding:24px}.mlet.on{opacity:1}
 .mtx{max-width:640px;width:100%;max-height:100%;overflow-y:auto;line-height:1.95;font-size:clamp(14px,3.6vw,18px);text-shadow:0 2px 8px rgba(0,0,0,.6)}
 .mtx p{margin:0 0 14px}.mtx .big{font-size:clamp(20px,5vw,28px);color:#ffb0c8;font-weight:900;text-align:center;margin-top:22px}.mtx .sg{text-align:right;color:#ffe6b0;font-weight:800}
 .mcur{display:inline-block;width:.5em;animation:mb .8s infinite}@keyframes mb{50%{opacity:0}}
 .mstar{position:absolute;width:3px;height:3px;background:#fff;opacity:.6}.mheart{position:absolute;font-size:18px;opacity:0;animation:mh 7s linear infinite}@keyframes mh{0%{opacity:0;transform:translateY(0)}15%{opacity:.45}100%{opacity:0;transform:translateY(-110vh)}}
 .mend{position:absolute;left:50%;bottom:28px;transform:translateX(-50%);font:inherit;font-weight:800;font-size:15px;background:#ff8aa8;color:#fff;border:0;border-radius:999px;padding:10px 26px;cursor:pointer;opacity:0;transition:opacity 1s;box-shadow:0 4px 16px rgba(255,120,160,.5)}</style>
 <div class="mbg"></div><div class="mdots"></div><button class="mskip">跳過照片 ▶▶</button>`;
 document.body.appendChild(ov);const bg=ov.querySelector('.mbg');for(let i=0;i<60;i++){const s=document.createElement('div');s.className='mstar';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.opacity=.2+Math.random()*.6;bg.appendChild(s)}
 const dots=ov.querySelector('.mdots');MEMPH.forEach(()=>dots.appendChild(document.createElement('i')));
 const mus=memMusic();let i=-1,tm=null,cur=null,phase='ph',ended=false;
 const showPh=()=>{i++;if(i>=MEMPH.length)return letter();dots.querySelectorAll('i').forEach((d,k)=>d.classList.toggle('on',k<=i));const q=MEMPH[i],fr=document.createElement('div');fr.className='mfr';fr.style.setProperty('--r',(i%2?1.2:-1.2)+'deg');
  const sc=q.w>140?2.7:3.4;fr.innerHTML=`<img src="${q.src}" style="width:min(80vw,${Math.round(q.w*sc)}px,${(q.w/q.h*62).toFixed(1)}vh);height:auto"><div class="cp">${q.t}</div>`;ov.appendChild(fr);requestAnimationFrame(()=>requestAnimationFrame(()=>fr.classList.add('on')));
  if(cur){const o=cur;o.style.opacity=0;setTimeout(()=>o.remove(),1000)}cur=fr;tm=setTimeout(showPh,i==MEMPH.length-1?7500:4600)};
 const letter=()=>{if(phase=='let')return;phase='let';clearTimeout(tm);ov.querySelector('.mskip').style.display='none';dots.style.display='none';if(cur){cur.style.opacity=0}
  for(let k=0;k<14;k++){const h=document.createElement('div');h.className='mheart';h.textContent=['💗','✨','🤍'][k%3];h.style.left=Math.random()*100+'%';h.style.bottom='-30px';h.style.animationDelay=(k*.6)+'s';ov.appendChild(h)}
  const L=document.createElement('div');L.className='mlet';L.innerHTML='<div class="mtx"></div>';ov.appendChild(L);setTimeout(()=>L.classList.add('on'),1200);const tx=L.querySelector('.mtx');
  let pi=0,li=0,ci=0,skip=false;L.onclick=()=>{skip=true};
  const typeNext=()=>{if(pi>=MEMLETTER.length)return done();const P=MEMLETTER[pi],lines=P.filter(x=>typeof x=='string'),kind=P.find(x=>typeof x=='number')||0;
   let el=tx.children[pi];if(!el){el=document.createElement('p');if(kind==2)el.className='big';if(kind==3)el.className='sg';if(kind==1)el.style.fontWeight='900';tx.appendChild(el)}
   const full=lines.slice(0,li).join('<br>');const ln=lines[li];
   if(skip){el.innerHTML=lines.join('<br>');skip=false;pi++;li=0;ci=0;tx.scrollTop=tx.scrollHeight;return setTimeout(typeNext,500)}
   ci++;el.innerHTML=full+(li?'<br>':'')+ln.slice(0,ci)+'<span class="mcur">▍</span>';tx.scrollTop=tx.scrollHeight;
   if(ci>=ln.length){ci=0;li++;if(li>=lines.length){el.innerHTML=lines.join('<br>');li=0;pi++;return setTimeout(typeNext,kind==2?1600:1100)}return setTimeout(typeNext,420)}
   setTimeout(typeNext,ln[ci-1]=='，'||ln[ci-1]=='。'?260:85)};
  setTimeout(typeNext,2400)};
 const done=()=>{const b=document.createElement('button');b.className='mend';b.textContent='💞 謝謝你';ov.appendChild(b);setTimeout(()=>b.style.opacity=1,600);b.onclick=close};
 const close=()=>{if(ended)return;ended=true;clearTimeout(tm);mus.stop();ov.style.transition='opacity 1.4s';ov.style.opacity=0;setTimeout(()=>{ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL;try{st.memSeen=1;SVDIRTY=1}catch(e){}onEnd&&onEnd()},1400)};
 ov.querySelector('.mskip').onclick=()=>letter();
 const kd=e=>{if(!ov.isConnected){OVK.delete(kd);return}if(e.key=='Escape'){if(phase=='ph')letter();else close()}};OVK.add(kd);
 showPh()}
// 選單、手機、開始畫面都能重看
{const od0=openMenu;openMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📋 選單'&&Array.isArray(opts)&&(st.memSeen||(yjS().wed)))opts.splice(2,0,['💝 我們的回憶','照片輪播與一段話',()=>{closeDlg();memShow()}]);return od.call(this,t,d,opts,...r)};try{return od0.apply(this,arguments)}finally{openDlg=od}}}
{const _s=startMenu;startMenu=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&String(t).includes('像素小鎮'))opts.push(['💝 給家宜的生日禮物','照片回憶＋一封信（約 5 分鐘）',()=>{closeDlg();memShow(()=>startMenu())}]);return od.call(this,t,d,opts,...r)};try{return _s.apply(this,arguments)}finally{openDlg=od}}}
