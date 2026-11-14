/* v13.36 車子可以調角度、巷弄機車可以關掉、對話大頭照滿版 */
// ── 1. 路上車輛：正面／背面／側面都能調角度（修正歪歪的圖）──
{const _vi=vuImg;vuImg=function(key,w,flip,rot){if(!rot)return _vi.apply(this,arguments);const ck=key+'|'+w+'|'+(flip?1:0)+'|r'+rot;if(VUC[ck])return VUC[ck];const b=_vi(key,w,flip);if(!b)return null;
 const a=rot*Math.PI/180,pad=Math.ceil(b.img.height*Math.abs(Math.sin(a)))+2,c=document.createElement('canvas');c.width=b.img.width+pad*2;c.height=b.img.height;const x=c.getContext('2d');x.imageSmoothingEnabled=true;
 x.translate(c.width/2,c.height*.92);x.rotate(a);x.drawImage(b.img,-b.img.width/2,-c.height*.92);const Q=b.img.width/b.w;return VUC[ck]={img:c,w:c.width/Q,h:b.h,gy:b.gy}}}
vuSpr=function(v){const kind=v.mdl||(v.k=='moto'&&v.bx?'deliv':v.k),P=VI[kind];if(!P)return null;const X=v.ax=='x',view=X?'s':(v.dir>0?'f':'b');
 let L=P[view];if(!L||!L.length)L=P.f||P.b;if(v.vi==null)v.vi=(Math.random()*997)|0;const A=v.mdl?{s:1,f:0}:vAdj(kind),rot=(A['r'+view]||0)*(view=='s'&&v.dir<0&&!A.f?1:1);
 return vuImg(L[v.vi%L.length],Math.round((view=='s'?P.ws:P.wf)*A.s*10)/10,view=='s'&&A.f,rot)};
{const _p=vAdjPanel;vAdjPanel=function(){_p.apply(this,arguments);const pn=document.getElementById('vadjP');if(!pn)return;
 const add=()=>{pn.querySelectorAll('[data-k]').forEach(el=>{if(el.querySelector('[data-rot]'))return;const k=el.dataset.k,P=VI[k];if(!P)return;
  const views=[['f','正面'],['b','背面'],['s','側面']].filter(q=>P[q[0]]&&P[q[0]].length);
  const d=document.createElement('div');d.dataset.rot=1;d.style.cssText='margin-top:6px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px';
  const thumb=(vw)=>{const A=vAdj(k);try{const sp=vuImg(P[vw][0],(vw=='s'?P.ws:P.wf)*A.s,vw=='s'&&A.f,A['r'+vw]||0);return sp?sp.img.toDataURL():''}catch(e){return ''}};
  d.innerHTML=views.map(([vw,nm])=>{const r=vAdj(k)['r'+vw]||0;return `<div style="background:#3a2a1a;border-radius:6px;padding:4px;text-align:center"><div style="height:46px;display:flex;align-items:flex-end;justify-content:center;border-bottom:1px dashed #6a4a2a"><img data-im="${vw}" src="${thumb(vw)}" style="max-height:44px;max-width:90px"></div>
   <div style="font-size:11px;margin-top:3px">${nm}　<b data-rv="${vw}">${r}°</b></div><div style="display:flex;gap:3px;justify-content:center;margin-top:2px"><button data-r="${vw}" data-d="-1" style="font:inherit;font-size:12px;background:#5a3a1e;color:#fff;border:1px solid #c98a3a;border-radius:5px;padding:0 6px">↺</button><button data-r="${vw}" data-d="0" style="font:inherit;font-size:11px;background:#5a3a1e;color:#fff;border:1px solid #c98a3a;border-radius:5px;padding:0 5px">0</button><button data-r="${vw}" data-d="1" style="font:inherit;font-size:12px;background:#5a3a1e;color:#fff;border:1px solid #c98a3a;border-radius:5px;padding:0 6px">↻</button></div></div>`}).join('');
  el.appendChild(d);
  d.querySelectorAll('button[data-r]').forEach(bt=>bt.onclick=()=>{const vw=bt.dataset.r,dd=+bt.dataset.d,A=Object.assign({},vAdj(k));A['r'+vw]=dd?Math.max(-45,Math.min(45,(A['r'+vw]||0)+dd*2)):0;VADJ[k]=A;for(const q in VUC)delete VUC[q];try{localStorage.setItem('pxVehAdj',JSON.stringify(VADJ))}catch(e){}try{ED.dirty=1}catch(e){}
   d.querySelector(`[data-rv="${vw}"]`).textContent=A['r'+vw]+'°';d.querySelector(`[data-im="${vw}"]`).src=thumb(vw)})})};
 add();new MutationObserver(add).observe(pn,{childList:true});
 // 說明文字
 const tip=pn.querySelector('div[style*="opacity:.8"]');if(tip&&!/角度/.test(tip.innerHTML))tip.innerHTML+='<br>圖片歪歪的，用每台車下面的 <b>↺ ↻</b> 調正面、背面、側面的角度（一次 2°）。';
 // 巷弄機車開關
 const al=document.createElement('div');al.style.cssText='border-top:2px solid #8a5a2e;margin-top:10px;padding-top:8px';
 const drawAl=()=>{al.innerHTML='<b>🛵 巷弄機車</b><div style="opacity:.8;font-size:12px;margin:4px 0">在巷子裡來回騎的機車（不在大馬路上）。不想要的可以關掉。</div>'+AV.map((v,i)=>`<label style="display:flex;align-items:center;gap:6px;margin:3px 0"><input type="checkbox" data-av="${i}" ${ALOFF[i]?'':'checked'}> 第 ${i+1} 台（${v.ax=='x'?'橫向':'直向'}巷子・${v.ax=='x'?'y':'x'}=${v.al.c}）　<button data-go="${i}" style="font:inherit;font-size:11px;background:#5a3a1e;color:#fff;border:1px solid #c98a3a;border-radius:5px;padding:0 6px">📍 看位置</button></label>`).join('');
  al.querySelectorAll('[data-av]').forEach(cb=>cb.onchange=()=>{ALOFF[+cb.dataset.av]=cb.checked?0:1;alleyApply();try{ED.dirty=1}catch(e){}});
  al.querySelectorAll('[data-go]').forEach(b=>b.onclick=e=>{e.preventDefault();const v=AV[+b.dataset.go],A=v.al,cx=v.ax=='x'?(A.a0+A.a1)/2:A.c,cy=v.ax=='x'?A.c:(A.a0+A.a1)/2;try{ED.cx=cx-240;ED.cy=cy-150;gzRefresh()}catch(er){}toast('📍 第 '+(+b.dataset.go+1)+' 台巷弄機車的路線在畫面中間')})};
 drawAl();pn.appendChild(al)}}
let ALOFF={};
function alleyApply(){try{AV.forEach((v,i)=>{if(ALOFF[i]){arrDel(TR,v);v._alOff=1}else if(v._alOff){v._alOff=0;if(!v._off&&!TR.includes(v))TR.push(v)}})}catch(e){}}
{const _c=alleyCheck;alleyCheck=function(){_c.apply(this,arguments);alleyApply()}}
{const _s=gzSerialize;gzSerialize=function(){const m=_s.apply(this,arguments);try{m.aloff=ALOFF}catch(e){}return m}}
{const _a=gzApply;gzApply=function(m){const r=_a.apply(this,arguments);try{if(m&&m.aloff)ALOFF=Object.assign({},m.aloff);alleyApply()}catch(e){}return r}}

// ── 2. 對話框大頭照：自動裁掉空白，臉放大填滿 ──
const VNFC={};
function vnTrim(src){if(VNFC[src])return VNFC[src];const im=new Image();im.src=src;if(!im.complete||!im.naturalWidth)return src;
 try{const W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,W,H).data;
  const bg=[d[0],d[1],d[2],d[3]],isBg=i=>d[i+3]<20||(bg[3]>200&&Math.abs(d[i]-bg[0])+Math.abs(d[i+1]-bg[1])+Math.abs(d[i+2]-bg[2])<36);
  let x0=W,y0=H,x1=0,y1=0;for(let y=0;y<H;y+=2)for(let X=0;X<W;X+=2){if(!isBg((y*W+X)*4)){if(X<x0)x0=X;if(X>x1)x1=X;if(y<y0)y0=y;if(y>y1)y1=y}}
  if(x1<=x0)return VNFC[src]=src;const bw=x1-x0,s=Math.round(Math.max(bw,(y1-y0)*.8)*1.04),cx=(x0+x1)/2,o=document.createElement('canvas');o.width=o.height=s;const q=o.getContext('2d');q.fillStyle='#fff6e0';q.fillRect(0,0,s,s);
  q.drawImage(c,Math.round(cx-s/2),Math.max(0,y0-s*.03),s,s,0,0,s,s);return VNFC[src]=o.toDataURL()}catch(e){return VNFC[src]=src}}
{const _f=vnFace;vnFace=function(){const s=_f.apply(this,arguments);return s?vnTrim(s):s}}
setTimeout(()=>{try{['al','yj'].forEach(w=>['neutral','happy','love','sad','surprised','angry'].forEach(e=>vnFace(w,e)))}catch(er){}},3000);
{const s=document.createElement('style');s.textContent='.vnF{object-fit:cover!important;object-position:center top!important;background:#fff6e0}';document.head.appendChild(s)}
