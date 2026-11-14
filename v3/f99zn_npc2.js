/* v13.49 使用者新畫的 8 位角色：仰恩、笑笑、保羅、柏凱、以倫（新造型）、老八、張博洋、朱哲良
   素材只放 4 方向 × 4 格走路圖＋頭像；其餘（站、坐、動作列）在這裡自動組出來 */
Object.assign(NSPR,{'仰恩':'ye','笑笑':'xx','保羅':'pl','廖柏凱':'bk','柏凱':'bk','黃以倫':'yl2','以倫牧師':'yl2','以倫':'yl2','老八':'l8','張博洋':'by','博洋':'by','朱哲良':'zl','哲良':'zl','小朱':'zl'});
const NPCN2=['ye','xx','pl','bk','yl2','l8','by','zl'];
function npc2Sheet(code){const wk=code+'_walk4';if(!uaOK(wk))return;const im=UAI[wk],FW=64,FH=128,cv=document.createElement('canvas');cv.width=FW*6;cv.height=FH*10;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;
 const cell=(r,c,dc,dr)=>x.drawImage(im,c*FW,r*FH,FW,FH,dc*FW,dr*FH,FW,FH);
 for(let r=0;r<4;r++){[0,1,2,3,0,1].forEach((c,i)=>cell(r,c,i,r));for(let i=0;i<6;i++)cell(r,1,i,r+4)}
 for(let i=0;i<6;i++)cell(0,1,i,9);
 // 坐姿：上半身往下移、腿縮短
 const sit=(r,dc)=>{const t=document.createElement('canvas');t.width=FW;t.height=FH;const q=t.getContext('2d',{willReadFrequently:true});q.drawImage(im,1*FW,r*FH,FW,FH,0,0,FW,FH);const d=q.getImageData(0,0,FW,FH).data;let top=FH,bt=0;for(let y=0;y<FH;y++)for(let xx=0;xx<FW;xx++)if(d[(y*FW+xx)*4+3]>0){top=Math.min(top,y);bt=Math.max(bt,y)}
  const hip=Math.round(top+(bt-top)*.62),dd=Math.round((bt-hip)*.45);x.drawImage(t,0,0,FW,hip,dc*FW,8*FH+dd,FW,hip);x.drawImage(t,0,hip,FW,bt+1-hip,dc*FW,8*FH+hip+dd,FW,Math.max(1,bt+1-hip-dd))};
 sit(0,0);sit(3,1);
 cv.complete=true;cv.naturalWidth=cv.width;cv.naturalHeight=cv.height;UAI[code+'_sheet']=cv;NPOSE[code+'_sheet']={wave:[0],sing:[0],pray:[0],clap:[0],hug:[0],heart:[0],guitar:[0],lift:[0]}}
function npc2All(){NPCN2.forEach(c=>{try{if(!UAI[c+'_sheet'])npc2Sheet(c)}catch(e){console.warn(e)}})}
npc2All();setTimeout(npc2All,1500);setTimeout(npc2All,5000);
