/* v13.35 站姿改用新圖＋和家宜一起騎腳踏車的約會（大樹舊鐵橋・夕陽河堤） */
// ── 站姿：用新的走路圖裡雙腳併攏的那一格 ──
const STANDC={0:1,1:1,2:1,3:1};
{const _d=alDraw;alDraw=function(c,o,key){key=key||'al_sheet';try{const nk=key.replace('_sheet','_walk4');if(o&&!o.mv&&!o.sit&&(!o.pose||o.pose=='lift')&&uaOK(nk)){const dm=CHDIR[(o.dir|0)%8],row=AL_WALK[dm],col=STANDC[row],s=ALS.H/105,dw=ALS.fw*s,dh=ALS.fh*s;
  let by=0;if(o.pose=='lift')by=-Math.abs(Math.sin((o.ph||0)*2))*1.5;
  c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8)+by);c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(0,0,6.6,2.4,0,0,7);c.fill();c.imageSmoothingEnabled=false;
  // 站著時輕輕呼吸
  const br=Math.sin((NOW||0)/600+(o.x||0))*.6,sk=key.replace('_sheet','_stand');if(row>=2&&uaOK(sk)){if(row==3){c.scale(-1,1)}c.drawImage(UAI[sk],0,0,64,128,-dw/2,-ALS.foot*s+br*.4,dw,dh-br*.4)}else c.drawImage(UAI[nk],col*64,row*128,64,128,-dw/2,-ALS.foot*s+br*.4,dw,dh-br*.4);
  if(o.um){c.fillStyle='#e0443a';c.strokeStyle='#2a1a10';c.lineWidth=.8;const ux=6;c.beginPath();c.moveTo(ux-13,-33);c.quadraticCurveTo(ux,-46,ux+13,-33);c.quadraticCurveTo(ux,-36,ux-13,-33);c.fill();c.stroke();c.beginPath();c.moveTo(ux,-36);c.lineTo(ux,-16);c.stroke()}
  c.restore();return true}}catch(e){}return _d.apply(this,arguments)}}

// ════════ 🚲 一起騎腳踏車約會 ════════
const RD_LINES=[
 {L:[['n','','週末午後，你們從家裡出發，沿著高屏溪的河堤自行車道一路往北騎。'],['yj','happy','「哇～風好舒服！好久沒騎腳踏車了！」'],['al','happy','「妳騎慢一點，我跟在妳旁邊。」']],
  o:[['「要不要比賽？輸的請吃冰！」',2,[['yj','surprised','「欸你偷跑！」'],['n','','她用力踩了幾下追上來，笑到差點騎不穩。'],['yj','happy','「你輸了！請我吃燒冷冰！」']]],['「慢慢騎就好，我想多看妳幾眼。」',3,[['yj','love','「……專心騎車啦！」'],['n','','她嘴上這樣說，車速卻慢了下來，跟你並排。']]]]},
 {L:[['n','','前方出現一座紅色的鐵橋，橫跨在寬闊的溪面上。'],['yj','surprised','「是大樹舊鐵橋！我們之前過年的時候有來過這裡耶！」'],['al','happy','「對啊，那時候人超多，妳還說下次要找人少的時候來看夕陽。」']],
  o:[['「那今天就陪妳看完夕陽再走。」',3,[['yj','love','「你還記得喔……」'],['n','','她轉過頭，夕陽把她的側臉照得紅紅的。']]],['「然後妳那天走到一半就說肚子餓。」',2,[['yj','angry','「哪有！」'],['yj','happy','「……好啦，過年就是要一直吃嘛。」']]]]},
 {L:[['n','','騎到一半，家宜的車速慢了下來。'],['yj','sad','「腳好痠喔……你們阿兵哥都不會累的嗎？」']],
  o:[['「那我們停下來，坐在河堤上休息一下。」',3,[['n','','你們把車停在欄杆旁，坐在草地上，看著溪水慢慢流。'],['yj','love','「跟你在一起，好像什麼都不用急。」']]],['「再撐一下！前面有賣冰！」',2,[['yj','happy','「冰！？我突然又有力氣了！」']]]]},
 {L:[['n','','太陽慢慢落到遠方的山後面，整條溪都變成橘色的。'],['yj','happy','「欸，冠宏。」'],['al','neutral','「嗯？」'],['yj','love','「以後我們老了，也要像這樣一起騎車喔。」']],
  o:[['「一言為定。騎不動了我就載妳。」',3,[['yj','love','「那你要一直健身喔，不然載不動。」'],['al','happy','「放心，我可是未來的健身教練！」']]],['「好，我們一起騎到很老很老。」',3,[['yj','love','「嗯！」'],['n','','她伸出手，在兩台腳踏車之間輕輕勾住你的小指。']]]]}];
const RIDE={x:0,sp:60,t:0};
function rideScene(g,S,t,dt){const W2=720,H2=520,x=RIDE.x;
 // 天空（夕陽隨劇情推進）
 const k=Math.min(1,S.i/(RD_LINES.length-1+.001));const sky=g.createLinearGradient(0,0,0,300);sky.addColorStop(0,k<.5?'#7ec4f0':'#6a5aa8');sky.addColorStop(.55,k<.5?'#cfe8ff':'#ff9a6a');sky.addColorStop(1,k<.5?'#ffe8c0':'#ffcf7a');g.fillStyle=sky;g.fillRect(0,0,W2,H2);
 const sunY=90+k*120;const sg=g.createRadialGradient(560,sunY,0,560,sunY,120);sg.addColorStop(0,'rgba(255,240,180,.95)');sg.addColorStop(.25,'rgba(255,200,120,.6)');sg.addColorStop(1,'rgba(255,180,100,0)');g.fillStyle=sg;g.fillRect(400,sunY-130,320,260);g.fillStyle=k<.5?'#fff6c8':'#ffb35a';g.beginPath();g.arc(560,sunY,30,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<5;i++){const cx=((i*190-x*.08)%900+900)%900-90,cy=40+(i%3)*28;g.beginPath();g.ellipse(cx,cy,50,12,0,0,7);g.ellipse(cx+30,cy-6,30,10,0,0,7);g.fill()}
 // 遠山
 const hill=(base,amp,f,col,par)=>{g.fillStyle=col;g.beginPath();g.moveTo(0,H2);for(let X=0;X<=W2;X+=8){const wx=X+x*par;g.lineTo(X,base-Math.sin(wx*f)*amp-Math.sin(wx*f*2.3+1)*amp*.4)}g.lineTo(W2,H2);g.fill()};
 hill(215,26,.006,k<.5?'#8aa8c8':'#7a5a8a',.1);hill(235,18,.011,k<.5?'#6a9a7a':'#5a4a6a',.2);
 // 溪水
 const rv=g.createLinearGradient(0,240,0,330);rv.addColorStop(0,k<.5?'#7ab8d8':'#e89a6a');rv.addColorStop(1,k<.5?'#4a8ab0':'#a85a5a');g.fillStyle=rv;g.fillRect(0,240,W2,90);
 g.fillStyle='rgba(255,230,170,.5)';for(let i=0;i<14;i++){const yy=250+i*6,w=20+((i*37)%40);g.fillRect(560-w/2+Math.sin(t*2+i)*8,yy,w,2)}
 g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=1.5;for(let i=0;i<10;i++){const xx=((i*97-x*.35)%800+800)%800-40,yy=258+(i%5)*14;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+26,yy);g.stroke()}
 // 舊鐵橋（紅色桁架）
 const bx=760-((x*.35)%1600);if(bx>-700&&bx<W2+100){g.save();g.translate(bx,0);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(0,262,640,6);
  for(let p=0;p<6;p++){g.fillStyle='#7a6a5a';g.fillRect(p*110+40,228,14,40)}
  g.strokeStyle='#c0392b';g.lineWidth=4;for(let s=0;s<5;s++){const x0=s*130;g.beginPath();g.moveTo(x0,228);g.lineTo(x0+130,228);g.moveTo(x0+12,228);g.lineTo(x0+12,196);g.lineTo(x0+118,196);g.lineTo(x0+118,228);for(let j=0;j<4;j++){g.moveTo(x0+12+j*26.5,228);g.lineTo(x0+12+(j+1)*26.5,196)}g.stroke()}
  g.fillStyle='#8a3a2a';g.fillRect(0,226,650,5);g.restore()}
 // 對岸樹叢
 g.fillStyle=k<.5?'#4a8a4a':'#5a4a3a';for(let i=0;i<20;i++){const xx=((i*61-x*.45)%1000+1000)%1000-60;g.beginPath();g.arc(xx,240,14+(i%3)*6,Math.PI,0);g.fill()}
 // 河堤草地
 g.fillStyle=k<.5?'#7cc06a':'#9a8a5a';g.fillRect(0,326,W2,40);g.fillStyle=k<.5?'#6aae58':'#8a7a4a';for(let i=0;i<60;i++){const xx=((i*23-x)%W2+W2)%W2;g.fillRect(xx,330+(i%4)*7,2,6)}
 // 花
 for(let i=0;i<18;i++){const xx=((i*53-x)%(W2+40)+W2+40)%(W2+40)-20,yy=336+(i%3)*9;g.fillStyle=['#ff8fb1','#ffd84a','#fff','#c98af0'][i%4];g.beginPath();g.arc(xx,yy,3,0,7);g.fill()}
 // 欄杆
 g.strokeStyle='#e8e0d0';g.lineWidth=3;g.beginPath();g.moveTo(0,352);g.lineTo(W2,352);g.stroke();for(let i=0;i<20;i++){const xx=((i*48-x)%960+960)%960-20;g.fillStyle='#d8d0c0';g.fillRect(xx,350,4,18)}
 // 自行車道
 g.fillStyle='#c8745a';g.fillRect(0,366,W2,110);g.fillStyle='#b8644a';g.fillRect(0,366,W2,4);g.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<10;i++){const xx=((i*90-x)%900+900)%900-60;g.fillRect(xx,420,44,4)}
 g.fillStyle='#e8d8c0';g.fillRect(0,476,W2,44);g.fillStyle='#7cc06a';g.fillRect(0,486,W2,34);
 // 路燈（近景）
 for(let i=0;i<3;i++){const xx=((i*300-x*1.3)%900+900)%900-60;g.fillStyle='#3a3a42';g.fillRect(xx,250,5,236);g.fillRect(xx-2,246,22,6);g.fillStyle=k>.7?'#fff2b0':'#e8e0c8';g.fillRect(xx+12,252,10,6)}
 // 兩台腳踏車（家宜在後面一排、Allen 在前面）
 const fr=Math.floor(t*9)%4,drawB=(key,cx,by,sc,bob)=>{if(!uaOK(key))return;g.save();g.translate(cx,by+bob);g.scale(-sc,sc);g.imageSmoothingEnabled=false;g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(0,-2,40,6,0,0,7);g.fill();g.drawImage(UAI[key],fr*128,2*128,128,128,-64,-124,128,128);g.restore()};
 const yjX=470+Math.sin(t*.7)*12,alX=300+Math.sin(t*.5+1)*8;
 drawB('yj_bike',yjX,404,1.55,Math.sin(t*9)*.6);drawB('al_bike',alX,458,1.7,Math.sin(t*9+1)*.6);
 // 頭上情緒泡泡
 const em={happy:'♪',love:'💗',surprised:'❗',sad:'💧',angry:'💢'};const bub=(w,cx,cy)=>{const e=S.emo[w];if(!e||!em[e]||t-S.emoT>2.4)return;const a=Math.min(1,(t-S.emoT)*5);g.save();g.globalAlpha=a;g.fillStyle='#fff';g.strokeStyle='#4a2e1c';g.lineWidth=2;g.beginPath();g.ellipse(cx,cy,16,13,0,0,7);g.fill();g.stroke();g.font='16px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#e05a7a';g.fillText(em[e],cx,cy+1);g.restore();g.textBaseline='alphabetic'};
 bub('yj',yjX+4,404-186);bub('al',alX+4,458-208);
 // 愛心
 S.hearts.forEach(h=>{h.t+=dt;if(h.t<0||h.t>1.6)return;g.globalAlpha=1-h.t/1.6;g.font='22px sans-serif';g.textAlign='center';g.fillText('💗',h.x+Math.sin(h.t*4)*8,h.y-h.t*80);g.globalAlpha=1});
 // 夕陽濾鏡
 if(k>.5){g.fillStyle=`rgba(255,140,60,${(k-.5)*.18})`;g.fillRect(0,0,W2,H2)}}
function rideDate(){const y=yjS(),W=wkN();y.rdW=W;const M=mgBox('🚲 高屏溪河堤・和家宜騎腳踏車'),g=M.g,S={i:0,sc:0,hearts:[],t:0,done:false,emo:{},emoT:0,yjOff:0};
 try{M.cv.style.width='min(92vw,680px,calc((100vh - 250px)*720/520))';M.tip.style.minHeight='104px';M.tip.style.marginTop='10px'}catch(e){}
 let last=performance.now();const loop=now=>{if(S.done||!M.ov.isConnected)return;const dt=Math.min(.05,(now-last)/1000);last=now;S.t+=dt;RIDE.x+=RIDE.sp*dt;rideScene(g,S,S.t,dt);requestAnimationFrame(loop)};requestAnimationFrame(loop);
 let typing=null,full='',lastW='';
 const show=(w,e,txt)=>{clearInterval(typing);const nar=w=='n',nm=w=='al'?'Allen':'劉家宜';if(!nar){S.emo[w]=e;S.emoT=S.t}
  M.tip.innerHTML=nar?`<div class="vn N"><div class="vnB"><div class="vnT"></div></div></div>`:`<div class="vn ${w=='yj'?'R':''}"><img class="vnF ${lastW!=w+e?'pop':''}" src="${vnFace(w,e)}"><div class="vnB"><div class="vnN">${nm}</div><div class="vnT"></div></div></div>`;lastW=nar?'':w+e;
  const el=M.tip.querySelector('.vnT');full=txt;let i=0;typing=setInterval(()=>{i+=1;el.textContent=full.slice(0,i);if(i>=full.length){clearInterval(typing);typing=null}},28)};
 const skip=()=>{if(typing){clearInterval(typing);typing=null;const el=M.tip.querySelector('.vnT');if(el)el.textContent=full;return true}return false};
 const run=(lines,then)=>{let k=0;const next=()=>{if(k>=lines.length)return then();const [w,e,txt]=lines[k++];show(w,e,txt);if(/停下來/.test(txt))RIDE.sp=20;mgButtons(M,[['▶ 繼續（空白鍵）',()=>{if(skip())return;next()}]])};next()};
 const beat=()=>{RIDE.sp=60;const B=RD_LINES[S.i];run(B.L,()=>{mgButtons(M,B.o.map((q,j)=>[`${j+1}. ${q[0]}`,()=>{S.sc+=q[1];if(q[1]>=3)for(let h=0;h<4;h++)S.hearts.push({x:340+Math.random()*120,y:250,t:-h*.25});S.emo.al=q[1]>=3?'love':'happy';S.emoT=S.t;
   if(/比賽/.test(q[0])){RIDE.sp=140;S.yjOff=0;setTimeout(()=>{RIDE.sp=60},2500)}run(q[2],()=>{S.i++;S.i<RD_LINES.length?beat():fin()})}]))})};
 const fin=()=>{S.emo={};RIDE.sp=25;show('n','','天色暗下來，你們並肩把車牽回家。今天的風、夕陽和她的笑聲，你都想一直記得。');mgButtons(M,[['💗 回家',()=>{S.done=true;OVK.delete(kd);M.end();const n=Math.round(S.sc/2);y.ride=(y.ride||0)+1;frAdd('yijia',Math.max(3,n));fxApply({j:16,s:-10});advance(3);hud();SVDIRTY=1;
   whenFree(()=>openDlg('🚲 河堤騎車約會','你們騎了好長一段河堤，看完了大樹舊鐵橋的夕陽。<br><br>💗 家宜好感 +'+Math.max(3,n)+'　😊 心情 +16　⚡ 體力 -10',[['💞','',closeDlg]]))}]])};
 const kd=e=>{const bs=[...M.bt.querySelectorAll('button')];if(!bs.length)return;if(e.key==' '||e.key=='Enter'){e.preventDefault();if(e.repeat)return;if(bs.length==1)bs[0].click();else if(typing)skip()}else{const n=+e.key;if(n>=1&&n<=bs.length&&bs.length>1){e.preventDefault();bs[n-1].click()}}};OVK.add(kd);
 beat()}
// 家宜的選項裡加「一起騎腳踏車」
{const _o=yjOpts;yjOpts=function(o,n,s,dk){_o.apply(this,arguments);try{const y=yjS(),W=wkN(),h=T.hour,day=dow(),wkend=day==4&&h>=12||day==5||day==6;if(s.pt<60&&st.partner!='劉家宜')return;
 const hasB=!!(st.veh&&st.veh.bike),ok=hasB&&wkend&&h>=9&&h<17&&y.rdW!=W&&st.sta>=10;
 o.push(['🚲 約家宜一起騎腳踏車兜風',!hasB?'🔒 你要先有一台腳踏車（車行可以買）':y.rdW==W?'這個週末已經一起騎過了':!wkend?'週末才有空':h<9||h>=17?'09:00–17:00 出發，才看得到夕陽':st.sta<10?'⚡ 體力不夠':'3 小時・沿著高屏溪河堤騎到大樹舊鐵橋看夕陽',()=>{closeDlg();rideDate()},!ok])}catch(e){console.error(e)}}}
// 劇情回放也加進去
try{REPLAYS.push(['🚲 河堤騎車約會','和家宜沿著高屏溪騎到大樹舊鐵橋',()=>{const y=yjS(),b=JSON.stringify({rdW:y.rdW,ride:y.ride}),T0=JSON.stringify(T),f=FRS('yijia').pt,j=st.joy,sta=st.sta,_adv=advance,_fa=frAdd,_fx=fxApply;advance=()=>{};frAdd=()=>{};fxApply=()=>{};rideDate();
  const chk=setInterval(()=>{if(!window.OVL){clearInterval(chk);Object.assign(y,JSON.parse(b));Object.assign(T,JSON.parse(T0));FRS('yijia').pt=f;st.joy=j;st.sta=sta;advance=_adv;frAdd=_fa;fxApply=_fx;hud()}},800)},()=>yjS().ride>0])}catch(e){}
CHEATS.push(['ride with kai','🚲 和家宜騎車約會',()=>{rideDate();return ''}]);
