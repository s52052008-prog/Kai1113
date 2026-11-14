/* ===== v7.9 建築圖層：人可以走到建築後面（建築依底部前後排序繪製），夜市日夜兩版 ===== */
const BOV=[];
const NSN={'鹽酥雞':'sfry','臭豆腐':'stofu','珍珠奶茶':'sbbt','牛排':'ssteak','蒙古烤肉':'smong','小火鍋':'shot','蚵仔煎':'soys'};
function bovFromImg(k,x,y,w,h){const c=document.createElement('canvas');c.width=Math.ceil(w*KS);c.height=Math.ceil(h*KS);const q=c.getContext('2d');q.imageSmoothingEnabled=true;q.imageSmoothingQuality='high';q.drawImage(UAI[k],0,0,c.width,c.height);return c}
function buildBOV(){BOV.length=0;const x=S.getContext('2d');
 [...B,...BD].forEach(b=>{try{
  if(b.ua&&uaOK(b.ua.k)){const u=b.ua,cx=b.x+b.w/2,bot=b.bot+u.oy,X=cx-u.w/2,Y=bot-u.h;const o={x:X,y:Y,w:u.w,h:u.h,by:b.bot,cv:bovFromImg(u.k,X,Y,u.w,u.h)};
   const nk=NSN[b.n];if(nk&&uaOK('nsn_'+nk))o.cvn=bovFromImg('nsn_'+nk,X,Y,u.w,u.h);BOV.push(o)}
  else if(STY[b.st]&&b.st!='ua'){const X=b.x-8,Y=b.y-46,W0=b.w+16,H0=b.bot-Y+1;const px=Math.round(X*KS),py=Math.round((Y+NY)*KS),pw=Math.round(W0*KS),ph=Math.round(H0*KS);
   const L=[WIN.length,SIGNS.length,DEC.length,solids.length,LAMPS.length];const save=x.getImageData(px,py,pw,ph);
   x.save();x.setTransform(1,0,0,1,0,0);x.clearRect(px,py,pw,ph);x.restore();x.save();x.setTransform(KS,0,0,KS,0,NY*KS);STY[b.st](b);x.restore();
   const off=document.createElement('canvas');off.width=pw;off.height=ph;off.getContext('2d').putImageData(x.getImageData(px,py,pw,ph),0,0);x.putImageData(save,px,py);
   WIN.length=L[0];SIGNS.length=L[1];DEC.length=L[2];solids.length=L[3];LAMPS.length=L[4];
   let cv=off;try{cv=pixelize(off,Math.max(1,Math.round(KS)),{keepA:1,ol:1,step:18})}catch(e){}
   BOV.push({x:X,y:Y,w:W0,h:H0,by:b.bot,cv})}
  // 碰撞只保留建築底部（地基），上方可以從後面走過
  const D=b.stall?22:30;solids.forEach(o=>{if(Math.abs(o.x-b.x)<3&&Math.abs(o.w-b.w)<3&&Math.abs(o.y+o.h-b.bot)<3&&o.h>D){o.y=b.bot-D;o.h=D}});
 }catch(e){console.error('BOV',b.n,e)}})}
const bovNight=()=>T.hour>=17||T.hour<5;
function bovDraw(g,o){const sm=g.imageSmoothingEnabled;g.imageSmoothingEnabled=true;g.drawImage(o.cvn&&bovNight()?o.cvn:o.cv,o.x,o.y,o.w,o.h);g.imageSmoothingEnabled=sm}
