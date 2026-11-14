/* v8.2 使用者自製地板材質：以圖樣（pattern）鋪地，錨定在世界座標原點，版面重排後仍能接縫 */
const LTP={};
const ltOK=k=>{const im=window.UAI&&UAI[k];return !!(im&&im.complete&&im.naturalWidth)};
function ltPat(c,k,ts){if(!ltOK(k))return null;const id=k+'@'+ts;let p=LTP[id];
 if(!p){const n=Math.max(8,Math.round(ts*(typeof KS=='number'?KS:2)));const t=document.createElement('canvas');t.width=t.height=n;const x=t.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(UAI[k],0,0,n,n);if(!/^rd_/.test(k))try{ltSeam(t,UAI[k],k)}catch(e){}p=LTP[id]={cv:t,n}}
 const pat=c.createPattern(p.cv,'repeat');try{pat.setTransform(new DOMMatrix().scale(ts/p.n))}catch(e){}return pat}
function LTX(c,k,x,y,w,h,ts){const pat=ltPat(c,k,ts||24);if(!pat)return false;c.save();c.fillStyle=pat;c.fillRect(x,y,w,h);c.restore();return true}
// 依原本的配色決定材質
const LTMAP={'#c9c6bd':['lt_7',24],'#cfc2a8':['lt_28',16],'#d8cfba':['lt_27',16],'#ddd3bd':['lt_9',24],'#b08850':['lt_13',16]};
function ltPave(c,x,y,w,h,a){const m=LTMAP[a];if(!m)return false;return LTX(c,m[0],x,y,w,h,m[1])}
function ltCobble(c,x,y,w,h){return LTX(c,'lt_26',x,y,w,h,16)}

/* v13.13 地板接縫：去掉圖片外圈的框線，邊緣接不起來的材質做無縫處理 */
function ltSeam(t,img,key){const isPk=/^pk/.test(key||'');const n=t.width,x=t.getContext('2d');let d=x.getImageData(0,0,n,n),a=d.data;
 const px=(i,j)=>{const o=(j*n+i)*4;return[a[o],a[o+1],a[o+2]]},dist=(p,q)=>Math.abs(p[0]-q[0])+Math.abs(p[1]-q[1])+Math.abs(p[2]-q[2]);
 const rowAvg=j=>{let r=0,g=0,b=0;for(let i=0;i<n;i++){const c=px(i,j);r+=c[0];g+=c[1];b+=c[2]}return[r/n,g/n,b/n]},colAvg=i=>{let r=0,g=0,b=0;for(let j=0;j<n;j++){const c=px(i,j);r+=c[0];g+=c[1];b+=c[2]}return[r/n,g/n,b/n]};
 // 中間區域平均色
 let R=0,G=0,Bc=0,cnt=0;for(let j=n*.3|0;j<n*.7;j++)for(let i=n*.3|0;i<n*.7;i++){const c=px(i,j);R+=c[0];G+=c[1];Bc+=c[2];cnt++}const mid=[R/cnt,G/cnt,Bc/cnt];
 const lim=Math.max(1,Math.round(n*(isPk?.16:.1))),TH=isPk?30:70;let t0=0,b0=0,l0=0,r0=0;
 const lum=c=>c[0]*.3+c[1]*.59+c[2]*.11,ml=lum(mid),bad=c=>dist(c,mid)>TH&&(isPk||lum(c)<ml-8);while(t0<lim&&bad(rowAvg(t0)))t0++;while(b0<lim&&bad(rowAvg(n-1-b0)))b0++;while(l0<lim&&bad(colAvg(l0)))l0++;while(r0<lim&&bad(colAvg(n-1-r0)))r0++;
 if(isPk){const m=Math.round(n*.06);t0=Math.max(t0,m);b0=Math.max(b0,m);l0=Math.max(l0,m);r0=Math.max(r0,m)}
 if(t0||b0||l0||r0){const sw=img.naturalWidth,sh=img.naturalHeight,fx=sw/n,fy=sh/n;x.clearRect(0,0,n,n);x.drawImage(img,l0*fx,t0*fy,sw-(l0+r0)*fx,sh-(t0+b0)*fy,0,0,n,n);d=x.getImageData(0,0,n,n);a=d.data}
 // 上下、左右邊緣差太多 → 跟錯開半格的自己交叉淡化
 let e=0;for(let i=0;i<n;i++){e+=dist(px(i,0),px(i,n-1))+dist(px(0,i),px(n-1,i))}e/=2*n;
 if(e<(isPk?20:38))return;const src=new Uint8ClampedArray(a),h=n>>1,out=x.createImageData(n,n),o=out.data;
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const k=(j*n+i)*4,k2=(((j+h)%n)*n+((i+h)%n))*4;const dx=Math.abs(i+.5-n/2)/(n/2),dy=Math.abs(j+.5-n/2)/(n/2);let w=Math.max(dx,dy);w=Math.min(1,Math.max(0,(w-.45)/.5));w=w*w*(3-2*w);
  for(let c=0;c<4;c++)o[k+c]=src[k+c]*(1-w)+src[k2+c]*w}
 x.putImageData(out,0,0)}
