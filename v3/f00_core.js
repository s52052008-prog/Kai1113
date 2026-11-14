const cv=document.getElementById('c'),g=cv.getContext('2d');
const W=window.__GW||480,H=300,WW=2784,WH=1300,NY=480;const OWW=2400,XCUTS=[[650,144],[1200,48],[1806,48]],SX=x=>{let d=0;for(const c of XCUTS)if(x>=c[0])d+=c[1];return x+d};const LOWQ=(navigator.deviceMemory&&navigator.deviceMemory<4)||(('ontouchstart' in window||navigator.maxTouchPoints>0)&&Math.min(screen.width,screen.height)<700);let K=LOWQ?4:6;const SK=K;const KS=Math.min(K/2,Math.sqrt(((('ontouchstart' in window)||navigator.maxTouchPoints>0)?10e6:15.5e6)/(WW*(WH+NY))));/* iOS 單張畫布上限 16,777,216 像素；手機再降低以省記憶體 */cv.width=W*K;cv.height=H*K;
const R=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x*KS)/KS,Math.round(y*KS)/KS,w,h)};
const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const txt=(c,t,x,y,col,f)=>{c.font=f||'bold 10px sans-serif';c.textAlign='center';c.fillStyle=col;c.fillText(t,x,y)};
const st={name:'Allen',job:'無業遊民',money:10000,bank:0,wis:50,sta:100,rep:10,look:60,pow:30,hp:100,joy:60,earned:0,inv:{},cap:30,cnt:{harvest:0,shift:0,win:0},er:null,cp:-1,ct:0,cx:0,pet:null,food:0,rose:0,deco:0,love:0,loveDay:0,partner:null,romance:false,ended:0,seen:{}};
const T={day:1,year:1,hour:6.5};
const WD=['週一','週二','週三','週四','週五','週六','週日'],dow=()=>(((T.year-1)*30+T.day-1)%7+7)%7;
const age=()=>window.AGEF?AGEF():32+T.year-1;
const KM={m:'money',w:'wis',s:'sta',r:'rep',l:'look',p:'pow',h:'hp',j:'joy'};
const LB={m:'💰',w:'🧠',s:'⚡',r:'⭐',l:'✨',p:'⚔️',h:'❤️',j:'😊'};
const I={家:'🏠',全家:'🏪',診所:'🏥',健身房:'🏋️',書局:'📚',旅館:'🛏️',餐廳:'🍜',電影院:'🎬',家樂福:'🏬',機車行:'🛵',路邊攤:'🍜',農田:'🌾',派出所:'🚓',銀行:'🏦',咖啡店:'☕',新興高中:'🏫',廟:'🛕',美髮:'💇',禮品屋:'🎁'};
const hudEl=document.getElementById('hud'),tmEl=document.getElementById('tm'),toastEl=document.getElementById('toast');
let hudOpen=innerWidth>=600;
const bar=(i,v,c)=>`<div class="flex items-center gap-1"><span class="w-4">${i}</span><div class="h-2 flex-1 bg-black/60 border border-black"><div class="h-full" style="width:${clamp(v,0,100)}%;background:${c}"></div></div><span class="w-6 text-right">${v}</span></div>`;
function hud(){
  checkQ();qpanel();
  hudEl.innerHTML=`<div class="flex gap-2 items-center mb-1"><canvas id="av" width="80" height="80" class="parch" style="width:40px;height:40px;cursor:pointer" title="點頭像開背包（B）"></canvas><div class="leading-tight"><b class="text-[13px]">${st.name}</b> <span>${age()}歲</span><div class="text-amber-200">💼 ${jobName()}</div></div></div>
  ${bar('❤️',st.hp,'#e5484d')}${bar('⚡',st.sta,'#f5c542')}${bar('😊',st.joy,'#f08cb6')}
  <div class="${hudOpen?'grid':'hidden'} grid-cols-2 gap-x-2 mt-1"><span>💰 ${st.money}</span><span>🏦 ${st.bank}</span><span>🧠 ${st.wis}</span><span>⭐ ${st.rep}</span><span>✨ ${st.look}</span><span>⚔️ ${st.pow}</span><span>📅 第${T.day}天</span><span>🐾 ${st.pet||'無'}</span><span class="col-span-2">💍 ${st.partner||'單身'}　🎒 ${bagCount()}/${st.cap}（B）</span></div>`;
  const a=document.getElementById('av').getContext('2d');
  try{a.drawImage(portrait('me',{n:'me'}),0,0,80,80);a.fillStyle='rgba(30,16,6,.85)';a.fillRect(52,52,28,28);a.font='20px sans-serif';a.textAlign='center';a.fillText('🎒',66,74)}catch(e){}
}
hudEl.onclick=e=>{if(e.target.id=='av'){if(dlg.hidden&&!MG)openBag();return}hudOpen=!hudOpen;hud()};
let tk='';
function tm(){const hh=T.hour|0,mm=(T.hour%1*60/10|0)*10,k=T.day+'-'+T.year+'-'+hh+mm;if(k==tk)return;tk=k;
  tmEl.innerHTML=`<b>第 ${T.day} 天・${WD[dow()]}，第 ${T.year} 年</b><br>${hh<6||hh>=19?'🌙':hh<9?'🌅':hh<17?'☀️':'🌇'} ${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}　${age()} 歲　${['☀️晴','⛅多雲','🌧️小雨','💨大風'][wx()]}`}
let toastT;
function toast(m){toastEl.textContent=m;toastEl.classList.remove('opacity-0');clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.add('opacity-0'),2800)}
function dayTick(){if(st.bank>0){st.bankF=(st.bankF||0)+st.bank*.016/365;const i=Math.floor(st.bankF);if(i>0){st.bankF-=i;st.bank+=i;st.cnt.interest=(st.cnt.interest||0)+i}}}
function advance(h){T.hour+=h;while(T.hour>=24){T.hour-=24;dayTick();if(++T.day>30){T.day=1;T.year++;toast(`新的一年！Allen 現在 ${age()} 歲了`);hud()}}tm()}
const TS=[[0,20,30,80,.42],[3,16,26,76,.46],[5,40,40,100,.38],[6.5,255,170,120,.22],[9,255,230,180,.05],[12,255,255,255,0],[16,255,235,180,.06],[18,255,140,70,.26],[20,60,55,120,.27],[22,45,48,110,.31],[24,20,30,80,.42]];
function tint(){let i=0;while(TS[i+1][0]<T.hour)i++;const a=TS[i],b=TS[i+1],k=(T.hour-a[0])/(b[0]-a[0]),m=j=>a[j]+(b[j]-a[j])*k;
  g.fillStyle=`rgba(${m(1)|0},${m(2)|0},${m(3)|0},${m(4)})`;g.fillRect(0,0,W,H);const wz=wx();if(wz==2){g.fillStyle='rgba(70,90,120,.18)';g.fillRect(0,0,W,H)}else if(wz==1){g.fillStyle='rgba(120,130,150,.07)';g.fillRect(0,0,W,H)}}
let NOW=0;
const gt=()=>T.year*720+T.day*24+T.hour,wx=()=>{const h=hsh(T.year+'-'+T.day+'-'+((T.hour/8)|0))%100;return h<54?0:h<80?1:h<89?2:3};
