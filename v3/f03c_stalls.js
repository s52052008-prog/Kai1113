/* ===== v5.1：夜市攤販（各自不同的外觀） ===== */
function stallFrame(b,ca,inner,sign){const{x,y,w,h}=b;R(s,x+4,y+h-2,w,5,'rgba(50,25,0,.3)');
 GR(s,x,y+24,w,h-24,'#6a4a30','#4a3220');R(s,x+2,y+24,w-4,h-30,'#2a1c14');
 inner(x,y,w,h);
 // 帆布棚（斜紋）
 const nn=Math.max(4,Math.round(w/10)),sw2=w/nn;for(let i=0;i<nn;i++){R(s,x+i*sw2,y,sw2,22,i%2?'#fff':ca);R(s,x+i*sw2,y+18,sw2,4,'rgba(0,0,0,.15)');s.fillStyle=i%2?'#fff':ca;s.beginPath();s.arc(x+i*sw2+sw2/2,y+22,sw2/2,0,Math.PI);s.fill()}
 R(s,x,y+22,w,2,'rgba(0,0,0,.35)');R(s,x+1,y+24,3,h-24,'#5a3418');R(s,x+w-4,y+24,3,h-24,'#5a3418');
 // 櫃檯正面與價目牌
 GR(s,x+1,y+h-14,w-2,13,'#a8794a','#7a5430');R(s,x+1,y+h-14,w-2,1.6,'#d9a05a');for(let i=6;i<w-4;i+=9)R(s,x+i,y+h-12,.7,10,'rgba(0,0,0,.2)');
 signBoard(x+w/2-Math.min(30,w/2-4),y+2,Math.min(60,w-8),9,sign,'#2a1208','#ffe066',6.5,{glow:1});
 for(let i=0;i<Math.max(2,Math.floor(w/28));i++)lantern(x+8+i*(w-16)/Math.max(1,Math.floor(w/28)-1||1),y+26,'#e0301f')}
const stSteam=(x,y,n)=>{for(let i=0;i<(n||3);i++){s.fillStyle='rgba(255,255,255,'+(.5-i*.1)+')';s.beginPath();s.ellipse(x+Math.sin(i*2)*2.4,y-i*3.6,2.2+i*.5,1.8+i*.4,0,0,7);s.fill()}};
const stPot=(cx,y,rw,col,fill)=>{R(s,cx-rw,y,rw*2,6,col);R(s,cx-rw-1,y-1,rw*2+2,2,shade(col,26));R(s,cx-rw+1,y,rw*2-2,2,fill||'#d8a040')};
STY.sfry=b=>stallFrame(b,'#2f80ed',(x,y,w,h)=>{
 // 炸鍋與瀝油籃
 stPot(x+w*.3,y+40,13,'#3a3a40','#e8a830');for(let i=0;i<5;i++){s.fillStyle='#e8b040';s.beginPath();s.arc(x+w*.3-9+i*4.5,y+40,2.4,0,7);s.fill()}R(s,x+w*.3+10,y+34,14,2,'#8a8a90');R(s,x+w*.3+22,y+30,2,8,'#8a8a90');
 // 食材托盤
 for(let i=0;i<3;i++){R(s,x+w*.58+i*13,y+38,11,5,'#c9c9cf');for(let k=0;k<4;k++)R(s,x+w*.58+i*13+1+k*2.4,y+36,2,3,['#f0c060','#8bc34a','#e74c3c','#fff'][(i+k)%4])}
 R(s,x+4,y+30,18,5,'#e8e0c8');txt(s,'雞排',x+13,y+34.4,'#a02a1a','bold 4.4px sans-serif');stSteam(x+w*.3,y+33,3)},'鹽酥雞');
STY.stofu=b=>stallFrame(b,'#8a5aa8',(x,y,w,h)=>{
 // 蒸籠、臭豆腐與辣醬
 stPot(x+w*.28,y+40,14,'#8a8a90','#fff');R(s,x+w*.28-12,y+32,24,8,'#c8a060');R(s,x+w*.28-12,y+31,24,1.6,'#a88040');stSteam(x+w*.28,y+30,4);
 for(let i=0;i<4;i++){R(s,x+w*.6+i*7,y+37,6,6,'#d98a30');R(s,x+w*.6+i*7,y+37,6,1.6,'#f0b050')}R(s,x+w*.6-2,y+43,30,2,'#e8e0d0');
 R(s,x+w*.8,y+30,8,10,'#c0392b');R(s,x+w*.8+1,y+28,6,2,'#e8e0d0');R(s,x+w*.14,y+30,9,9,'#8a5a30');txt(s,'泡菜',x+w*.14+4.5,y+36.4,'#fff','bold 3.6px sans-serif')},'臭豆腐');
STY.sbbt=b=>stallFrame(b,'#e0679a',(x,y,w,h)=>{
 // 一排手搖杯與封口機
 for(let i=0;i<5;i++){const cx=x+8+i*((w-24)/4);R(s,cx,y+32,7,12,['#c9a06a','#8ac060','#f0b0c0','#e8c050','#6a4a30'][i]);R(s,cx-.6,y+30.6,8.2,2,'#fff');R(s,cx+3,y+25,1,7,'#e8e0d0');for(let k=0;k<3;k++)R(s,cx+1+k*2,y+41,1.6,1.6,'#2a1a10')}
 R(s,x+w-14,y+30,10,14,'#d0d4d8');R(s,x+w-13,y+31,8,5,'#2a2a30');R(s,x+w-12,y+40,2,3,'#e0443a');
 s.fillStyle='#e0679a';s.beginPath();s.arc(x+w/2,y+25,0,0,7);s.fill()},'珍珠奶茶');
STY.ssteak=b=>stallFrame(b,'#7a1a1a',(x,y,w,h)=>{
 // 鐵板與牛排、火光與醬料
 R(s,x+6,y+38,w*.6,6,'#3a3a40');R(s,x+6,y+37,w*.6,1.6,'#6a6a72');for(let i=0;i<3;i++){const sx=x+12+i*18;s.fillStyle='#6a2a14';s.beginPath();s.ellipse(sx,y+36,6.4,3.2,0,0,7);s.fill();s.fillStyle='#8a3a1c';s.beginPath();s.ellipse(sx-1,y+35.4,4,2,0,0,7);s.fill();R(s,sx-4,y+35.4,8,.7,'rgba(255,255,255,.3)')}
 stSteam(x+30,y+31,4);s.fillStyle='rgba(255,170,40,.8)';s.beginPath();s.arc(x+w*.64,y+36,2.4,0,7);s.fill();
 [[w*.72,'#c0392b'],[w*.8,'#f0b030'],[w*.88,'#6a3a1a']].forEach(q=>{R(s,x+q[0],y+31,4,12,q[1]);R(s,x+q[0]+1,y+28.6,2,3,'#ddd')});
 R(s,x+8,y+27,14,5,'#fff');R(s,x+10,y+24,10,4,'#fff')},'牛排');
STY.smong=b=>stallFrame(b,'#e8742a',(x,y,w,h)=>{
 // 圓形大鐵板、長筷、環狀食材
 s.fillStyle='#2a2a30';s.beginPath();s.ellipse(x+w*.4,y+41,w*.3,5.4,0,0,7);s.fill();s.fillStyle='#5a5a62';s.beginPath();s.ellipse(x+w*.4,y+40,w*.3-1,4.2,0,0,7);s.fill();s.fillStyle='#9a9aa2';s.beginPath();s.ellipse(x+w*.4,y+39.4,w*.18,2.4,0,0,7);s.fill();
 for(let i=0;i<9;i++){s.fillStyle=['#c0392b','#8bc34a','#e8b040','#6a3a1a'][i%4];s.beginPath();s.arc(x+w*.4-w*.24+i*(w*.48/8),y+40+Math.sin(i)*1.2,1.8,0,7);s.fill()}
 R(s,x+w*.4-16,y+34,22,1.4,'#c9a060');R(s,x+w*.4-8,y+33,22,1.4,'#c9a060');stSteam(x+w*.4,y+34,3);
 for(let i=0;i<4;i++){R(s,x+w*.76+i*3.4,y+31,3,12,['#c0392b','#f0b030','#6a3a1a','#e8e0d0'][i]);R(s,x+w*.76+i*3.4,y+29.4,3,2,'#ddd')}
 R(s,x+4,y+30,14,4,'#c8c8d0');for(let i=0;i<3;i++)R(s,x+5+i*4,y+27,3,3,['#e74c3c','#8bc34a','#f1c40f'][i])},'蒙古烤肉');
STY.shot=b=>stallFrame(b,'#2a9d5c',(x,y,w,h)=>{
 // 一排個人小火鍋與沸騰蒸氣
 for(let i=0;i<3;i++){const cx=x+14+i*((w-28)/2);R(s,cx-8,y+39,16,3,'#2a2a30');s.fillStyle='#8a3a1a';s.beginPath();s.ellipse(cx,y+38,8,3.4,0,0,7);s.fill();s.fillStyle=['#c0392b','#e8c050','#8bc34a'][i];s.beginPath();s.ellipse(cx,y+37.4,6.2,2.2,0,0,7);s.fill();for(let k=0;k<3;k++)R(s,cx-4+k*3,y+36.4,2,1.6,['#fff','#2a9d5c','#f0a030'][k]);R(s,cx-9,y+37,2,1.4,'#5a3a1a');R(s,cx+7,y+37,2,1.4,'#5a3a1a');stSteam(cx,y+34,3)}
 R(s,x+4,y+27,10,6,'#fff');R(s,x+w-14,y+27,10,6,'#f4e0b0')},'小火鍋');
STY.soys=b=>stallFrame(b,'#3a9a8a',(x,y,w,h)=>{
 // 煎台與蚵仔、湯鍋
 R(s,x+6,y+38,w*.5,5,'#3a3a40');R(s,x+6,y+37,w*.5,1.4,'#6a6a72');for(let i=0;i<2;i++){s.fillStyle='#f0d890';s.beginPath();s.ellipse(x+16+i*17,y+36,7,2.6,0,0,7);s.fill();s.fillStyle='#c0392b';s.beginPath();s.ellipse(x+16+i*17,y+35.4,5,1.4,0,0,7);s.fill();s.fillStyle='#cfd8dc';for(let k=0;k<4;k++)s.fillRect(x+12+i*17+k*2.4,y+35,1.6,1.4)}
 stPot(x+w*.78,y+40,9,'#8a8a90','#8a5a2a');stSteam(x+w*.78,y+36,3);R(s,x+w*.55,y+30,10,6,'#e8e0d0');txt(s,'蚵',x+w*.55+5,y+35,'#2a6a5a','bold 5px sans-serif')},'蚵仔煎');
