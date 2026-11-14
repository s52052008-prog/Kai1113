/* v13.32 走路動作重做：原圖每格雙腳都是張開的，沒有「交錯」感。
   用原圖組出真正的 4 格步伐：踏地 → 腳經過（收腿、身體上提）→ 換腳踏地 → 腳經過；正面／背面則左右腳輪流抬起 */
const WKC={};const WFW=64,WFH=128,HIP=97;
function wkBuild(key){if(WKC[key]!==undefined)return WKC[key];if(!uaOK(key))return null;const im=UAI[key],cv=document.createElement('canvas');cv.width=WFW*4;cv.height=WFH*4;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;
 const fr=(r,c)=>{const t=document.createElement('canvas');t.width=WFW;t.height=WFH;const q=t.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(im,c*WFW,r*WFH,WFW,WFH,0,0,WFW,WFH);return t};
 const put=(dc,dr,upper,lower,opt={})=>{const ox=dc*WFW,oy=dr*WFH,b=opt.bob||0;
  if(b)x.drawImage(upper,0,HIP-3,WFW,4,ox,oy+HIP-3,WFW,4);// 補上身體上提後的縫
  // 上半身
  x.drawImage(upper,0,0,WFW,HIP,ox,oy+b,WFW,HIP);
  // 下半身
  if(opt.pass){const d=opt.pass,cx=32,H2=109;x.drawImage(lower,0,HIP,WFW,H2-HIP,ox,oy+HIP,WFW,H2-HIP);// 褲子不動
   x.drawImage(lower,0,H2,cx,WFH-H2,ox+d,oy+H2,cx,WFH-H2);x.drawImage(lower,cx,H2,WFW-cx,WFH-H2,ox+cx-d,oy+H2,WFW-cx,WFH-H2)}
  else if(opt.lift){const L=opt.lift;// L=-1 抬左腳、1 抬右腳
   const half=(sx,sw,dy)=>x.drawImage(lower,sx,HIP,sw,WFH-HIP,ox+sx,oy+HIP+b+dy,sw,WFH-HIP);
   half(0,32,L<0?-5:0);half(32,32,L>0?-5:0)}
  else x.drawImage(lower,0,HIP,WFW,WFH-HIP,ox,oy+HIP+b,WFW,WFH-HIP)};
 // 正面(0)、背面(1)：腳併攏的那格當底，左右腳輪流抬
 [0,1].forEach(r=>{const st=fr(r,0),aA=fr(r,1),aB=fr(r,4);put(0,r,aA,st,{lift:-1,bob:-1});put(1,r,st,st,{});put(2,r,aB,st,{lift:1,bob:-1});put(3,r,st,st,{})});
 // 側面(2、3)：兩格踏地＋兩格經過（腿收攏、身體上提）
 [2,3].forEach(r=>{const A=fr(r,2),B=fr(r,4),P=fr(r,3);put(0,r,A,A,{});put(1,r,P,P,{bob:-1});put(2,r,B,B,{});put(3,r,P,P,{bob:-1})});
 WKC[key]=cv;return cv}
{const _d=alDraw;alDraw=function(c,o,key){key=key||'al_sheet';try{if(o&&o.mv&&!o.sit&&!(o.pose&&o.pose!='lift')&&uaOK(key)&&UAI[key].width==WFW*6){const W=wkBuild(key);if(W){const dm=CHDIR[(o.dir|0)%8],row=AL_WALK[dm],col=((Math.floor((o.ph||0)*6.6))%4+4)%4;
   const s=ALS.H/105,dw=ALS.fw*s,dh=ALS.fh*s;c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8));c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(0,0,col%2?5.6:6.8,2.4,0,0,7);c.fill();c.imageSmoothingEnabled=false;
   c.drawImage(W,col*WFW,row*WFH,WFW,WFH,-dw/2,-ALS.foot*s,dw,dh);
   if(o.um){c.fillStyle='#e0443a';c.strokeStyle='#2a1a10';c.lineWidth=.8;const ux=6;c.beginPath();c.moveTo(ux-13,-33);c.quadraticCurveTo(ux,-46,ux+13,-33);c.quadraticCurveTo(ux,-36,ux-13,-33);c.fill();c.stroke();c.beginPath();c.moveTo(ux,-36);c.lineTo(ux,-16);c.stroke()}
   c.restore();return true}}}catch(e){}return _d.apply(this,arguments)}}

// ── 使用者重畫的新走路圖（al_walk4：4 方向 × 4 格，踏地／經過交錯）──
{const _b=wkBuild;wkBuild=function(key){const nk=String(key).replace('_sheet','_walk4');if(uaOK(nk))return UAI[nk];return _b.apply(this,arguments)}}
// ── 使用者畫的騎腳踏車圖（al_bike：下、上、左 × 4 格踩踏，右邊用左邊鏡像）──
{const _dp=drawPlayer;drawPlayer=function(c){if(p.ride!='bike'||!uaOK('al_bike'))return _dp.apply(this,arguments);
 const v=vPlayerObj(),X=v.ax=='x',row=X?2:(v.dir<0?1:0),flip=X&&v.dir>0,mv=Math.hypot(p.vx||0,p.vy||0)>4,col=mv?Math.floor(NOW/1000*9)%4:0,s=ALS.H/105,S=128*s,cx=v.x+v.w/2,by=v.y+v.h+(X?1:2);
 c.save();c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(cx,by-1,X?12:5,2.4,0,0,7);c.fill();c.translate(Math.round(cx),Math.round(by));if(flip)c.scale(-1,1);c.imageSmoothingEnabled=false;
 c.drawImage(UAI.al_bike,col*128,row*128,128,128,-S/2,-124*s,S,S);c.restore();
 if(mv){c.save();c.globalAlpha=.25;c.fillStyle='#fff';for(let i=0;i<3;i++)c.fillRect(X?(v.dir>0?v.x-4-i*5:v.x+v.w+i*5):v.x+v.w/2-1+i*2,X?by-6-i*2:(v.dir>0?v.y-3-i*5:by+i*5),X?3:1,X?1:3);c.restore()}}}
