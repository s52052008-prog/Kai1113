/* v13.11 家門口的貓換成素材圖；路上車輛去白邊；造景模式可以調整車輛大小、方向（存進開場地圖，大家都看得到） */

// ── 1. 貓咪：改用素材的四方向圖（寵物動物表 pk23）──
const CATSET={orange:98,grey:86,tux:90,calico:94,fat:102};
function catSet(n){const c=String(n.c||'').toLowerCase();if(n.pat=='t'||/8a96a8|9aa|888|grey|gray/.test(c))return CATSET.grey;if(/^#(1|2|3)/.test(c)||c=='#222'||c=='#333')return CATSET.tux;if(/fff|eee|f4f4|e8e8e8/.test(c))return CATSET.calico;return CATSET.orange}
const ANSPR={};
function anImg(key,w){const ck=key+'|'+w;if(ANSPR[ck])return ANSPR[ck];if(!uaOK(key))return null;const im=UAI[key],h=w*im.naturalHeight/im.naturalWidth,Q=4,c=document.createElement('canvas');
 c.width=Math.round(w*Q);c.height=Math.round(h*Q);const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,0,0,c.width,c.height);return ANSPR[ck]={img:c,w,h}}
{const _da=drawA;drawA=function(c,n){try{if(n&&n.t=='cat'&&!(n.w===12&&n.x===-6&&n.y===-4)){const b=catSet(n),d=(n.dir|0)%8,o=d==1?3:d==2||d==4||d==6?1:d==3||d==5||d==7?2:0,side=o==1||o==2;
   const sp=anImg('pk23_'+(b+o),side?19:13);if(sp){const bob=n.mv?Math.abs(Math.sin(NOW/90))*1.2:0,cx=n.x+(n.w||12)/2,by=n.y+(n.h||8)+1;
    c.save();c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(cx,by-.5,sp.w*.38,2.2,0,0,7);c.fill();c.imageSmoothingEnabled=true;c.drawImage(sp.img,cx-sp.w/2,by-sp.h-bob,sp.w,sp.h);c.restore();return}}}catch(e){}
 return _da.apply(this,arguments)}}

// ── 2. 車輛：去掉圖片邊緣的白邊；大小、方向可以調 ──
const VADJ_KEYS=[['car','房車'],['suv','休旅車'],['hatch','小型車'],['sport','跑車'],['pickup','皮卡'],['taxi','計程車'],['police','警車'],['van','廂型車'],['truck','貨車'],['bus','公車'],['moto','機車'],['deliv','外送機車'],['bike','腳踏車']];
let VADJ={};try{VADJ=JSON.parse(localStorage.getItem('pxVehAdj')||'{}')||{}}catch(e){}
const vAdj=k=>VADJ[k]||{s:1,f:0};
function vClean(c){try{const x=c.getContext('2d'),d=x.getImageData(0,0,c.width,c.height),a=d.data,W=c.width,H=c.height,N=W*H,al=new Uint8Array(N);for(let i=0;i<N;i++)al[i]=a[i*4+3];
 for(let i=0;i<N;i++){const A=al[i];if(!A)continue;const r=a[i*4],g=a[i*4+1],b=a[i*4+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);
  // 邊緣上偏白、偏灰的半透明像素＝白邊
  const xx=i%W,yy=(i/W)|0;let edge=false;for(let dy=-2;dy<=2&&!edge;dy++)for(let dx=-2;dx<=2;dx++){const X2=xx+dx,Y2=yy+dy;if(X2<0||Y2<0||X2>=W||Y2>=H||al[Y2*W+X2]<20){edge=true;break}}
  if(!edge)continue;if(A<235&&mn>150&&mx-mn<45)a[i*4+3]=0;else if(A<140)a[i*4+3]=Math.round(A*.5)}
 x.putImageData(d,0,0)}catch(e){}return c}
vuImg=function(key,w,flip){const ck=key+'|'+w+'|'+(flip?1:0);if(VUC[ck])return VUC[ck];if(!uaOK(key))return null;const im=UAI[key],h=w*im.naturalHeight/im.naturalWidth,Q=3,c=document.createElement('canvas');
 c.width=Math.max(1,Math.round(w*Q));c.height=Math.max(1,Math.round(h*Q));const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';if(flip){x.translate(c.width,0);x.scale(-1,1)}x.drawImage(im,0,0,c.width,c.height);vClean(c);
 return VUC[ck]={img:c,w,h,gy:h-.5}};
vuSpr=function(v){const kind=v.mdl||(v.k=='moto'&&v.bx?'deliv':v.k),P=VI[kind];if(!P)return null;const X=v.ax=='x',view=X?'s':(v.dir>0?'f':'b');
 let L=P[view];if(!L||!L.length)L=P.f||P.b;if(v.vi==null)v.vi=(Math.random()*997)|0;const A=v.mdl?{s:1,f:0}:vAdj(kind);
 return vuImg(L[v.vi%L.length],Math.round((view=='s'?P.ws:P.wf)*A.s*10)/10,view=='s'&&A.f)};
function vAdjSave(){try{localStorage.setItem('pxVehAdj',JSON.stringify(VADJ))}catch(e){}for(const k in VUC)delete VUC[k];try{ED.dirty=1;gzRefresh&&gzRefresh()}catch(e){}}
// 跟著「儲存為開場地圖」一起存，打開遊戲的每個人都會套用
{const _s=gzSerialize;gzSerialize=function(){const m=_s.apply(this,arguments);if(Object.keys(VADJ).length)m.vadj=VADJ;return m}}
{const _a=gzApply;gzApply=function(m){_a.apply(this,arguments);try{if(m&&m.vadj){VADJ=Object.assign({},m.vadj);for(const k in VUC)delete VUC[k]}}catch(e){}}}

// ── 造景模式：🚗 路上車輛（大小・方向）面板 ──
function vAdjPanel(){let pn=document.getElementById('vadjP');if(pn){pn.remove();return}
 pn=document.createElement('div');pn.id='vadjP';pn.style.cssText='position:fixed;right:12px;top:60px;bottom:12px;width:330px;z-index:9000;background:#2a1a0e;color:#fff6dc;border:3px solid #8a5a2e;border-radius:12px;padding:10px;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,.6);font-size:13px';
 const row=([k,nm])=>{const A=vAdj(k),P=VI[k];let src='';try{const sp=vuImg(P.s[0],P.ws*A.s,A.f);src=sp?sp.img.toDataURL():''}catch(e){}
  return `<div style="border-top:1px solid #5a3a1e;padding:8px 0" data-k="${k}"><div style="display:flex;align-items:center;gap:8px"><b style="width:70px">${nm}</b>
   <div style="flex:1;height:44px;display:flex;align-items:flex-end;justify-content:center;background:repeating-linear-gradient(45deg,#3a2a1a 0 6px,#33241a 6px 12px);border-radius:6px"><img src="${src}" style="height:${Math.min(42,Math.round(P.ws*A.s*.9))}px;image-rendering:auto"></div></div>
   <div style="display:flex;align-items:center;gap:6px;margin-top:6px"><span>大小</span><input type="range" min="50" max="160" step="5" value="${Math.round(A.s*100)}" data-s style="flex:1"><span data-v style="width:42px;text-align:right">${Math.round(A.s*100)}%</span>
   <button data-f style="font:inherit;font-size:12px;background:${A.f?'#c98a3a':'#5a3a1e'};color:#fff6dc;border:1px solid #c98a3a;border-radius:6px;padding:2px 8px">${A.f?'↔ 已翻轉':'↔ 翻轉'}</button></div></div>`};
 const draw=()=>{pn.innerHTML=`<div style="display:flex;align-items:center;gap:6px"><b style="font-size:15px">🚗 路上車輛：大小・方向</b><button data-x style="margin-left:auto;font:inherit;background:#5a3a1e;color:#fff;border:1px solid #c98a3a;border-radius:6px;padding:2px 10px">關閉</button></div>
  <div style="opacity:.8;font-size:12px;margin:6px 0">拉「大小」馬上就會套用到路上的車。如果車子開起來是倒退的，按「翻轉」。<br>調好之後記得按上方「💾 儲存為開場地圖」，家宜打開時才會一樣。</div>
  ${VADJ_KEYS.filter(q=>VI[q[0]]).map(row).join('')}<button data-r style="margin-top:8px;width:100%;font:inherit;background:#5a3a1e;color:#fff6dc;border:1px solid #c98a3a;border-radius:6px;padding:6px">全部恢復原本大小</button>`;
  pn.querySelector('[data-x]').onclick=()=>pn.remove();pn.querySelector('[data-r]').onclick=()=>{VADJ={};vAdjSave();draw()};
  pn.querySelectorAll('[data-k]').forEach(el=>{const k=el.dataset.k,sl=el.querySelector('[data-s]'),vv=el.querySelector('[data-v]');
   sl.oninput=()=>{const A=Object.assign({},vAdj(k),{s:+sl.value/100});VADJ[k]=A;vv.textContent=sl.value+'%';for(const q in VUC)delete VUC[q]};
   sl.onchange=()=>{vAdjSave();draw()};el.querySelector('[data-f]').onclick=()=>{const A=Object.assign({},vAdj(k));A.f=A.f?0:1;VADJ[k]=A;vAdjSave();draw()}})};
 ['keydown','keyup','wheel','pointerdown'].forEach(ev=>pn.addEventListener(ev,e=>e.stopPropagation()));draw();document.body.appendChild(pn)}
{const _od=openDlg;openDlg=function(t,d,o,...r){if(t=='🛠️ 造景模式'&&Array.isArray(o)&&!o.some(q=>/路上車輛/.test(q[0]))){o=o.slice();o.splice(0,0,['🚗 路上車輛：大小・方向','覺得車子太大、太小或開反了，在這裡調',()=>{closeDlg();vAdjPanel()}])}return _od.call(this,t,d,o,...r)}}
// 離開造景模式時順便關掉面板
{const _x=gzExit;gzExit=function(){const p=document.getElementById('vadjP');if(p)p.remove();return _x.apply(this,arguments)}}
