/* v13.29 第一次見面（林園的公園・晚上）重做：正面長椅構圖、公園細節、家宜穿長褲（用她自己的行走圖）、
   對話改成視覺小說：說話的人頭像會跳出來、換表情，頭上也會冒出心情符號 */

// ── 從行走圖組出「正面坐在長椅上」的樣子：上半身＋椅面擋住大腿＋垂下來的小腿 ──
const SITC={};
function sitFront(k){if(SITC[k])return SITC[k];if(!uaOK(k))return null;const im=UAI[k],fw=64,fh=128,row=4,c=document.createElement('canvas');c.width=fw;c.height=fh;const q=c.getContext('2d');q.drawImage(im,0,row*fh,fw,fh,0,0,fw,fh);
 // 找出身體範圍
 const d=q.getImageData(0,0,fw,fh).data,rowHas=y=>{for(let x=0;x<fw;x++)if(d[(y*fw+x)*4+3]>40)return true;return false};let top=0,bot=fh-1;while(top<fh&&!rowHas(top))top++;while(bot>0&&!rowHas(bot))bot--;
 const H=bot-top,hip=Math.round(top+H*.72),knee=Math.round(top+H*.80),shin=bot-knee;
 // 輸出：上半身（到臀部）＋小腿（膝蓋到腳）往上收
 const o=document.createElement('canvas');o.width=fw;o.height=fh;const x=o.getContext('2d');x.imageSmoothingEnabled=false;
 const seat=hip+2;x.drawImage(c,0,0,fw,hip+4,0,0,fw,hip+4);
 // 大腿正對鏡頭：用臀部那一條像素往下延伸一點點（縮短）
 x.drawImage(c,0,hip,fw,knee-hip,0,hip+2,fw,Math.max(3,(knee-hip)*.6));
 const legTop=hip+2+Math.max(3,(knee-hip)*.6)-1;x.drawImage(c,0,knee,fw,shin+1,0,legTop,fw,shin+1);
 SITC[k]={c:o,top,seat:hip+3,foot:legTop+shin+1};return SITC[k]}

// ── 公園場景（正面）──
const PKFLY=Array.from({length:26},(_,i)=>({x:Math.random()*720,y:250+Math.random()*230,p:Math.random()*6,s:.4+Math.random()*.8}));
const PKSTAR=Array.from({length:110},(_,i)=>({x:(i*137.5)%720,y:(i*71.3)%210,s:i%9==0?2:1,p:i}));
parkScene=function(g,S,t){const W2=720,H2=520;g.imageSmoothingEnabled=false;
 // 夜空
 const sky=g.createLinearGradient(0,0,0,300);sky.addColorStop(0,'#070b24');sky.addColorStop(.55,'#1a2152');sky.addColorStop(1,'#3a3466');g.fillStyle=sky;g.fillRect(0,0,W2,300);
 PKSTAR.forEach(s=>{const tw=.35+.65*Math.abs(Math.sin(t*1.3+s.p));g.fillStyle=`rgba(255,250,225,${tw})`;g.fillRect(s.x,s.y,s.s,s.s)});
 // 流星
 const sh=(t%9)/9;if(sh<.12){const k=sh/.12,x0=520-k*260,y0=30+k*90;const gr=g.createLinearGradient(x0,y0,x0+60,y0-22);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+60,y0-22);g.stroke()}
 // 月亮＋光暈
 const mg=g.createRadialGradient(600,74,10,600,74,110);mg.addColorStop(0,'rgba(255,245,200,.35)');mg.addColorStop(1,'rgba(255,245,200,0)');g.fillStyle=mg;g.fillRect(480,0,240,200);
 g.fillStyle='#fff3c8';g.beginPath();g.arc(600,74,28,0,7);g.fill();g.fillStyle='rgba(220,205,160,.6)';[[590,66,5],[608,84,4],[612,64,3]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill()});
 // 雲
 g.fillStyle='rgba(120,120,170,.35)';[[120,60],[330,40],[470,110]].forEach((c,i)=>{const x=(c[0]+t*6*(i+1))%860-70;g.beginPath();g.ellipse(x,c[1],56,12,0,0,7);g.ellipse(x+30,c[1]-6,30,10,0,0,7);g.fill()});
 // 遠方城市剪影＋亮著的窗
 const bl=[[0,210,60],[55,190,40],[92,225,50],[140,180,36],[172,205,58],[226,170,30],[252,215,64],[312,195,44],[352,230,40],[388,185,54],[438,208,40],[474,175,34],[504,220,60],[560,196,46],[602,214,52],[650,188,70]];
 g.fillStyle='#1c1d3c';bl.forEach(b=>g.fillRect(b[0],b[1],b[2],300-b[1]));
 bl.forEach((b,i)=>{for(let y=b[1]+8;y<292;y+=12)for(let x=b[0]+5;x<b[0]+b[2]-6;x+=10){const on=((x*7+y*13+i*5)%11)<4;if(on){g.fillStyle=((x+y)%3)?'rgba(255,214,130,.85)':'rgba(255,240,200,.75)';g.fillRect(x,y,4,5)}}});
 // 教堂（紅色十字架）
 g.fillStyle='#22224a';g.fillRect(226,140,30,160);g.beginPath();g.moveTo(222,142);g.lineTo(241,112);g.lineTo(260,142);g.fill();g.fillStyle='#c0303a';g.fillRect(239,92,4,20);g.fillRect(233,98,16,4);
 const cg=g.createRadialGradient(241,100,2,241,100,22);cg.addColorStop(0,'rgba(255,80,80,.45)');cg.addColorStop(1,'rgba(255,80,80,0)');g.fillStyle=cg;g.fillRect(215,75,52,52);
 // 樹林
 g.fillStyle='#0f1d1c';for(let i=0;i<14;i++){const x=i*58-20;g.beginPath();g.arc(x+30,288,46+(i%3)*10,0,7);g.fill()}g.fillRect(0,288,W2,30);
 // 樹上的燈串
 for(let i=0;i<W2;i+=18){const y=270+Math.sin(i/60)*10,on=(Math.floor(t*2+i/18)%4)!=0;g.fillStyle=on?['#ffd36e','#ff9fb2','#9fd8ff'][(i/18|0)%3]:'#5a5a50';g.fillRect(i,y,3,3)}
 // 草地
 const gr2=g.createLinearGradient(0,310,0,H2);gr2.addColorStop(0,'#1f3a2a');gr2.addColorStop(1,'#2c4a30');g.fillStyle=gr2;g.fillRect(0,310,W2,H2-310);
 for(let i=0;i<260;i++){const x=(i*53.7)%W2,y=318+(i*31.3)%200;g.fillStyle=i%3?'#355a3a':'#2a4a30';g.fillRect(x,y,2,5)}
 // 石板步道（透視）
 g.fillStyle='#4a4a52';g.beginPath();g.moveTo(300,312);g.lineTo(420,312);g.lineTo(560,H2);g.lineTo(160,H2);g.fill();
 g.strokeStyle='rgba(30,30,36,.6)';g.lineWidth=1.5;for(let i=0;i<9;i++){const k=i/8,y=312+k*k*(H2-312),hw=60+k*140;g.beginPath();g.moveTo(360-hw,y);g.lineTo(360+hw,y);g.stroke()}
 for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(360+i*20,312);g.lineTo(360+i*66,H2);g.stroke()}
 // 花圃
 const flower=(x,y,c)=>{g.fillStyle=c;g.fillRect(x,y,4,4);g.fillStyle='#ffe9a8';g.fillRect(x+1,y+1,2,2)};
 g.fillStyle='#183020';g.beginPath();g.ellipse(80,470,90,34,0,0,7);g.ellipse(650,470,90,34,0,0,7);g.fill();
 for(let i=0;i<34;i++){flower(20+(i*37)%120,448+(i*13)%36,['#ff8fb1','#ffd36e','#c9a7ff','#ffffff'][i%4]);flower(590+(i*29)%120,448+(i*17)%36,['#ff8fb1','#ffd36e','#9fd8ff','#ffffff'][i%4])}
 // 路燈（左右兩支）＋光暈
 const lamp=lx=>{const gl=g.createRadialGradient(lx,170,4,lx,300,230);gl.addColorStop(0,'rgba(255,214,140,.42)');gl.addColorStop(1,'rgba(255,214,140,0)');g.fillStyle=gl;g.fillRect(lx-240,60,480,460);
  const pool=g.createRadialGradient(lx,420,4,lx,420,120);pool.addColorStop(0,'rgba(255,214,140,.22)');pool.addColorStop(1,'rgba(255,214,140,0)');g.fillStyle=pool;g.beginPath();g.ellipse(lx,420,130,40,0,0,7);g.fill();
  g.fillStyle='#1e1e26';g.fillRect(lx-3,170,6,250);g.fillRect(lx-9,414,18,8);g.fillStyle='#2a2a34';g.fillRect(lx-14,156,28,6);g.fillStyle='#ffeab0';g.fillRect(lx-10,162,20,14);g.fillStyle='#2a2a34';g.fillRect(lx-12,176,24,3);
  // 飛蛾
  for(let i=0;i<3;i++){const a=t*3+i*2+lx;g.fillStyle='rgba(255,255,230,.8)';g.fillRect(lx+Math.cos(a)*18,168+Math.sin(a*1.3)*10,2,2)}};
 lamp(150);lamp(570);
 // 垃圾桶、小貓
 g.fillStyle='#2e4a3a';g.fillRect(612,380,26,34);g.fillStyle='#3e5e4a';g.fillRect(608,374,34,8);
 const cy=432;g.fillStyle='#e8a25a';g.beginPath();g.ellipse(520,cy,16,9,0,0,7);g.fill();g.beginPath();g.arc(532,cy-6,7,0,7);g.fill();g.beginPath();g.moveTo(528,cy-12);g.lineTo(530,cy-18);g.lineTo(533,cy-12);g.moveTo(534,cy-12);g.lineTo(537,cy-18);g.lineTo(538,cy-11);g.fill();
 g.strokeStyle='#e8a25a';g.lineWidth=3;g.beginPath();g.moveTo(505,cy);g.quadraticCurveTo(496,cy-6+Math.sin(t*2)*4,502,cy-12);g.stroke();g.fillStyle='#3a2a1a';g.fillRect(530,cy-7,2,1);g.fillRect(535,cy-7,2,1);
 if(Math.floor(t/1.5)%3==0){g.fillStyle='rgba(255,255,255,.7)';g.font='12px sans-serif';g.fillText('z',540+((t*10)%10),cy-22-((t*10)%10))}
 // 長椅：椅背（在人後面）
 const bx=220,bw=280,seatY=370;
 g.fillStyle='#2a2a30';g.fillRect(bx+4,300,6,74);g.fillRect(bx+bw-10,300,6,74);
 ['#8a5a32','#7a4e2a','#8a5a32'].forEach((c,i)=>{g.fillStyle=c;g.fillRect(bx,306+i*16,bw,11);g.fillStyle='rgba(255,220,170,.15)';g.fillRect(bx,306+i*16,bw,2)});
 // 兩個人（正面坐）
 const al=sitFront('al_sheet'),yj=sitFront('yj_sheet'),SC=1.55;
 const drawSit=(o,cx,emo)=>{if(!o)return;const dx=cx-32*SC,dy=seatY-o.seat*SC;const bob=Math.sin(t*1.6+cx)*.6;g.drawImage(o.c,dx,dy+bob,64*SC,128*SC)};
 // 椅面（在人後面，不擋腿）
 g.fillStyle='#9a6a3a';g.fillRect(bx-8,seatY-6,bw+16,10);g.fillStyle='#6a4422';g.fillRect(bx-8,seatY+4,bw+16,4);g.fillStyle='rgba(255,220,170,.25)';g.fillRect(bx-8,seatY-6,bw+16,2);
 drawSit(al,318,0);drawSit(yj,404,0);
 // 扶手、椅腳
 g.fillStyle='#2a2a30';[bx-6,bx+bw-2].forEach(x=>{g.fillRect(x,340,8,32);g.fillRect(x-4,338,16,5);g.fillRect(x,seatY+17,7,38)});g.fillRect(bx+bw/2-3,seatY+17,6,34);
 // 手上的飲料（放在腿上）
 const cup=(x,y)=>{g.fillStyle='#f4f0e8';g.fillRect(x,y,12,15);g.fillStyle=S.tea?'#c8946a':'#4a2a12';g.fillRect(x,y,12,3);g.fillStyle='#b98a5a';g.fillRect(x,y+6,12,4);
  g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=2;g.beginPath();g.moveTo(x+6,y-2);g.quadraticCurveTo(x+10+Math.sin(t*3+x)*3,y-10,x+6,y-18);g.stroke()};
 cup(272,seatY-15);cup(440,seatY-15);
 // 螢火蟲
 PKFLY.forEach(f=>{f.p+=.016*f.s;const x=(f.x+Math.sin(f.p)*30+720)%720,y=f.y+Math.cos(f.p*1.3)*16,a=.4+.6*Math.abs(Math.sin(f.p*2));const fg=g.createRadialGradient(x,y,0,x,y,7);fg.addColorStop(0,`rgba(220,255,150,${a})`);fg.addColorStop(1,'rgba(220,255,150,0)');g.fillStyle=fg;g.fillRect(x-7,y-7,14,14)});
 // 頭上的心情符號
 const EM={love:'💗',happy:'♪',surprised:'❗',sad:'💧',angry:'💢',neutral:''};
 [['al',318],['yj',404]].forEach(([w,x])=>{const e=S.emo&&S.emo[w];if(!e||!EM[e])return;const age=t-(S.emoT||0),pop=Math.min(1,age*5),yy=seatY-o0(w)*SC-18-Math.sin(t*4)*3;g.save();g.translate(x+22,yy);g.scale(pop,pop);g.fillStyle='#fff';g.beginPath();g.ellipse(0,0,15,13,0,0,7);g.fill();g.beginPath();g.moveTo(-6,10);g.lineTo(-12,18);g.lineTo(0,11);g.fill();
  g.font='16px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle=e=='happy'?'#ff8a3a':'#e2412f';g.fillText(EM[e],0,1);g.restore();g.textBaseline='alphabetic';g.textAlign='left'});
 function o0(w){const o=w=='al'?al:yj;return o?(o.seat-o.top):80}
 // 愛心
 S.hearts=S.hearts.filter(h=>(h.t+=.016)<2);S.hearts.forEach(h=>{g.globalAlpha=1-h.t/2;g.font='26px sans-serif';g.fillText('💗',h.x,h.y-h.t*60);g.globalAlpha=1})};

// ── 視覺小說對話 ──
{const s=document.createElement('style');s.textContent=`.vn{display:flex;align-items:flex-end;gap:10px;width:min(92vw,680px);min-height:96px;text-align:left}
.vn.R{flex-direction:row-reverse}.vnF{width:88px;height:88px;flex:none;border-radius:14px;background:#fff6e0;border:3px solid #6b4423;object-fit:cover;object-position:top;image-rendering:auto;box-shadow:0 3px 0 #4a2e14}
.vnF.pop{animation:vnPop .28s cubic-bezier(.3,1.6,.5,1)}@keyframes vnPop{0%{transform:scale(.4) translateY(20px);opacity:0}100%{transform:none;opacity:1}}
.vnB{flex:1;position:relative;background:#fffaf0;border:3px solid #6b4423;border-radius:14px;padding:8px 12px 10px;min-height:76px;box-shadow:0 3px 0 #4a2e14}
.vnN{position:absolute;top:-14px;left:12px;background:#6b4423;color:#fff6dc;font-size:12.5px;font-weight:900;padding:2px 10px;border-radius:8px}.vn.R .vnN{left:auto;right:12px;background:#c0507a}
.vnT{font-size:15px;line-height:1.6;color:#3a2410;margin-top:4px}.vn.N .vnB{background:rgba(255,250,240,.9);font-style:italic}.vn.N .vnT{color:#6a4a2a}`;document.head.appendChild(s)}
const PK2=[
 {L:[['n','','晚上七點半，林園的公園。你提早十分鐘到，手裡拿著兩杯熱咖啡，心跳得有點快。'],['n','','路燈下，一個戴圓框眼鏡、穿紅色毛衣和黑色長褲的女生朝你走過來。'],['yj','neutral','「請問……你是 Allen 嗎？」'],['al','surprised','「啊！對！妳……妳是家宜？」'],['yj','happy','「嗯！本人比照片……嗯，黑一點耶。」']],
  o:[['「剛從營區出來，曬的啦！」',2,[['yj','happy','「好啦，阿兵哥辛苦了～」']]],['「妳本人比照片還可愛。」',3,[['yj','surprised','「欸？！」'],['yj','love','「……你很會講耶。」（低頭笑）']]],['「這是健康的顏色！」',1,[['yj','happy','「哈哈，好啦，很健康很健康。」']]]]},
 {L:[['n','','你們在長椅上坐下，你把咖啡遞給她。'],['yj','happy','「哇，謝謝你！」'],['yj','sad','「可是……我晚上不喝咖啡耶，喝了會整晚睡不著 😅」'],['al','surprised','「啊！」']],tea:1,
  o:[['「那我去對面買奶茶！等我一下。」',3,[['n','','你小跑步去對面的飲料店，換了兩杯熱奶茶回來。'],['yj','love','「你也太認真了吧……謝謝。」']]],['「那……兩杯我都喝掉？」',2,[['yj','happy','「哈哈哈，你會睡不著啦！」'],['n','','最後你們一起走去飲料店，換成兩杯熱奶茶。']]]]},
 {L:[['yj','neutral','「你在 Binder 上說你是軍人，平常都在做什麼呀？」'],['al','happy','「說了妳可能會睡著……簡單講，就是很多文件，跟很多體能。」'],['yj','happy','「所以你才這麼壯喔？」']],
  o:[['「每天早上跑三千公尺！」',2,[['yj','surprised','「三千？！我跑三百就會喘了……」']]],['「其實我最喜歡健身，以後想當健身教練。」',3,[['yj','love','「有夢想的人，好帥喔……」'],['al','happy','（耳朵有點紅）']]],['「這是秘密。」',1,[['yj','angry','「蛤～很神秘耶！」']]]]},
 {L:[['yj','neutral','「我是做社工的，每天都在跑個案。」'],['yj','sad','「有時候真的好累……會覺得自己能幫的好少。」']],
  o:[['「妳願意陪著他們，就已經很了不起了。」',3,[['yj','surprised','「……」'],['yj','love','「謝謝你這樣說。很少人會這樣跟我說。」']]],['「累的時候就出來喝奶茶吧！」',2,[['yj','happy','「好！那你要負責請客喔。」']]]]},
 {L:[['yj','happy','「澳門很小，走路就能逛完。台灣好大，我來這麼多年，到現在還常常迷路。」']],
  o:[['「那以後我帶妳逛。」',3,[['yj','love','「好啊，說好了喔。」']]],['「我也很常迷路，我們可以一起迷路。」',2,[['yj','happy','「這樣不是更慘嗎！」'],['n','','她笑著輕輕搥了你一下。']]]]},
 {L:[['n','','一陣風吹過來，她縮了一下肩膀。']],
  o:[['「會冷嗎？外套給妳。」',3,[['n','','你把外套披在她肩上。'],['yj','love','「……好溫暖。」']]],['「冷的話奶茶抱緊一點！」',1,[['yj','happy','「好喔，奶茶是我最好的朋友。」'],['al','sad','「那我呢……」'],['yj','happy','「你排第二！」']]]]},
 {L:[['n','','不知不覺，奶茶早就喝完了。公園裡只剩下你們兩個，和草叢裡一閃一閃的螢火蟲。'],['yj','happy','「欸，都這麼晚了……今天很開心。」'],['n','','她站起來，拍拍褲子，又回頭看你：'],['yj','love','「下次……一起約出來吃飯？」']],
  o:[['「好！我知道一家很好吃的，下次帶妳去。」',3,[['al','happy','「一言為定！」']]],['「好啊，妳想吃什麼都可以！」',2,[['yj','happy','「那我要好好想一想～」']]]]}];
function vnFace(w,e){const k=(w=='al'?'al_':'yj_')+(e||'neutral'),k2=(w=='al'?'al_':'yj_')+(e=='love'&&w=='al'?'happy':e||'neutral');const kk=uaOK(k)?k:uaOK(k2)?k2:(w=='al'?'al_neutral':'yj_neutral');try{return UAI[kk].src}catch(er){return ''}}
parkDate=function(){const P=st.pro;if(P.m1||P.pkGo)return;P.pkGo=1;const M=mgBox('🧋 林園的公園・晚上'),g=M.g,S={i:0,sc:0,hearts:[],t:0,done:false,emo:{},emoT:0};
 try{const cv=M.cv;cv.style.width='min(92vw,680px,calc((100vh - 250px)*720/520))';M.tip.style.minHeight='104px';M.tip.style.marginTop='10px'}catch(e){}
 let last=performance.now();const loop=now=>{if(S.done)return;const dt=(now-last)/1000;last=now;S.t+=dt;parkScene(g,S,S.t);requestAnimationFrame(loop)};requestAnimationFrame(loop);
 let typing=null,full='',lastW='';
 const show=(w,e,txt)=>{clearInterval(typing);const nar=w=='n',nm=w=='al'?'Allen':'劉家宜';if(!nar){S.emo[w]=e;S.emoT=S.t}
  M.tip.innerHTML=nar?`<div class="vn N"><div class="vnB"><div class="vnT"></div></div></div>`:`<div class="vn ${w=='yj'?'R':''}"><img class="vnF ${lastW!=w+e?'pop':''}" src="${vnFace(w,e)}"><div class="vnB"><div class="vnN">${nm}</div><div class="vnT"></div></div></div>`;lastW=nar?'':w+e;
  const el=M.tip.querySelector('.vnT');full=txt;let i=0;typing=setInterval(()=>{i+=1;el.textContent=full.slice(0,i);if(i>=full.length){clearInterval(typing);typing=null}},28)};
 const skip=()=>{if(typing){clearInterval(typing);typing=null;const el=M.tip.querySelector('.vnT');if(el)el.textContent=full;return true}return false};
 const run=(lines,then)=>{let k=0;const next=()=>{if(k>=lines.length)return then();const [w,e,txt]=lines[k++];show(w,e,txt);mgButtons(M,[['▶ 繼續（空白鍵）',()=>{if(skip())return;next()}]])};next()};
 const beat=()=>{const B=PK2[S.i];run(B.L,()=>{if(B.tea)S.teaN=1;mgButtons(M,B.o.map((q,j)=>[`${j+1}. ${q[0]}`,()=>{S.sc+=q[1];if(S.teaN)S.tea=1;if(q[1]>=3)for(let h=0;h<3;h++)S.hearts.push({x:330+Math.random()*80,y:300,t:-h*.25});
   S.emo.al=q[1]>=3?'happy':'neutral';S.emoT=S.t;run(q[2],()=>{S.i++;S.i<PK2.length?beat():fin()})}]))})};
 const fin=()=>{S.emo={};show('n','','回家的路上，你一直看著手機。她傳來一則訊息：「到家了嗎？今天真的很開心 ☺️」');mgButtons(M,[['💗 回家',()=>{S.done=true;OVK.delete(kd);M.end();P.m1=1;const s=FRS('yijia');s.met=1;s.pt=Math.max(s.pt,10+S.sc);advance(3);fxApply({j:20});hud();SVDIRTY=1;qpanel();
   whenFree(()=>openDlg('💗 第一次見面','你們在林園的公園，喝著奶茶聊到很晚。<br>她叫<b>劉家宜</b>，朋友都叫她 Kai。<br><br>💗 認識了家宜（好感 '+s.pt+'）<br><span style="font-size:12px;opacity:.8">之後可以在公園、咖啡廳遇到她，也能打電話約她。</span>',[['💞','',closeDlg]]))}]])};
 // 鍵盤：空白鍵／Enter 繼續，數字鍵選選項
 const kd=e=>{const bs=[...M.bt.querySelectorAll('button')];if(!bs.length)return;if(e.key==' '||e.key=='Enter'){e.preventDefault();if(e.repeat)return;if(bs.length==1)bs[0].click();else if(typing)skip()}else{const n=+e.key;if(n>=1&&n<=bs.length&&bs.length>1){e.preventDefault();bs[n-1].click()}}};OVK.add(kd);
 beat()};
