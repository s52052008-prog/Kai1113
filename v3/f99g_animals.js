/* v13.12 動物全面換成素材圖：貓、狗（柴犬、法鬥、土狗）、兔子、鸚鵡、雞、鴨、柯爾鴨、羊、烏龜；對話頭像也換 */
// [表, 正面, 面向左, 面向右(負數＝把面向左的翻過來), 背面, 身高(世界像素), 濾鏡]
const ANSET={
 cat_orange:['23',98,99,100,101,14],cat_grey:['23',86,87,88,89,14],cat_tux:['23',90,91,92,93,14],cat_calico:['23',94,95,96,97,14],
 shiba:['13',53,54,55,56,17],frenchie:['13',17,18,19,17,15],frenchie_g:['13',17,18,19,17,15,'grayscale(1) brightness(1.05)'],dog:['13',49,50,51,52,17],
 rabbit:['20',53,54,-54,55,13],parrot:['23',127,128,129,130,15],chicken:['47',13,14,-14,15,12],chicken_b:['47',13,14,-14,15,12,'sepia(.6) saturate(1.6) hue-rotate(-12deg) brightness(.9)'],
 duck:['23',140,141,-141,143,12],callduck:['23',140,141,-141,143,10,'grayscale(1) brightness(1.75) contrast(.85)'],sheep:['20',22,27,-27,23,16],turtle:['58',58,-58,58,58,7]};
function anSetOf(n){const t=n.t,c=String(n.c||'').toLowerCase();
 if(t=='cat')return n.pat=='t'||/8a96a8|9aa|888|grey|gray/.test(c)?'cat_grey':(/^#(1|2|3)/.test(c)||c=='#222'||c=='#333')?'cat_tux':/fff|eee|f4f4|e8e8e8/.test(c)?'cat_calico':'cat_orange';
 if(t=='frenchie')return /8a8a96|888|grey|gray/.test(c)?'frenchie_g':'frenchie';
 if(t=='chicken')return /d9a050|b8|a0/.test(c)?'chicken_b':'chicken';
 if(ANSET[t])return t;if(t=='dog')return 'dog';return null}
const ANC2={};
function anImg2(sid,i,h,flip,flt){const ck=sid+'|'+i+'|'+h+'|'+(flip?1:0)+'|'+(flt||'');if(ANC2[ck])return ANC2[ck];const key='pk'+sid+'_'+i;if(!uaOK(key))return null;const im=UAI[key],w=h*im.naturalWidth/im.naturalHeight,Q=4,c=document.createElement('canvas');
 c.width=Math.max(1,Math.round(w*Q));c.height=Math.max(1,Math.round(h*Q));const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';if(flt)x.filter=flt;if(flip){x.translate(c.width,0);x.scale(-1,1)}x.drawImage(im,0,0,c.width,c.height);
 return ANC2[ck]={img:c,w,h}}
function anFrame(S,dir){const d=(dir|0)%8,o=d==1?4:d==2||d==4||d==6?2:d==3||d==5||d==7?3:1;let i=S[o],flip=false;if(i<0){i=-i;flip=true}return{i,flip}}
{const _da=drawA;drawA=function(c,n){try{if(n&&!(n.w===12&&n.x===-6&&n.y===-4)){const k=anSetOf(n),S=k&&ANSET[k];if(S){const f=anFrame(S,n.dir),sp=anImg2(S[0],f.i,S[5],f.flip,S[6]);
   if(sp){const hop=n.t=='rabbit'&&n.mv?Math.abs(Math.sin(NOW/110))*2.4:n.mv?Math.abs(Math.sin(NOW/90))*1.1:0,cx=n.x+(n.w||12)/2,by=n.y+(n.h||8)+1;
    c.save();c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(cx,by-.5,Math.max(3,sp.w*.36),2,0,0,7);c.fill();c.imageSmoothingEnabled=true;c.drawImage(sp.img,cx-sp.w/2,by-sp.h-hop,sp.w,sp.h);c.restore();return}}}}catch(e){}
 return _da.apply(this,arguments)}}
// 對話頭像：用正面圖
{const _ap=typeof animalPortrait=='function'?animalPortrait:null;window.animalPortrait=animalPortrait=function(c,obj){try{const k=anSetOf(obj),S=k&&ANSET[k];if(S){const key='pk'+S[0]+'_'+Math.abs(S[1]);if(uaOK(key)){const im=UAI[key],box=136,s=Math.min(box/im.naturalWidth,box/im.naturalHeight),w=im.naturalWidth*s,h=im.naturalHeight*s;
  c.save();c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(84,160,w*.38,9,0,0,7);c.fill();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(S[6])c.filter=S[6];c.drawImage(im,84-w/2,162-h,w,h);c.restore();return true}}}catch(e){}
 return _ap?_ap(c,obj):false}}
// 圖片清單換掉後，舊的快取要清
try{for(const k in ANC)delete ANC[k]}catch(e){}
