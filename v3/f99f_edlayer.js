/* v13.12 造景模式：圖層上下（最底／下移／上移／最上）、拉長拉寬（按鈕＋拖曳把手），存進開場地圖 */
const gzNT=e=>e&&e.kind!='tree';
const gzSX=e=>e.sxk||1,gzSY=e=>e.syk||1;
// 位置／比例：寬高可以分開
gzPose=(f=>function(e){if(!gzNT(e))return f(e);const d=e.o,by=d.by??d.y+d.h;return{cx:d.x+d.w/2,by,s:d.w/(e.O.w*gzSX(e))}})(gzPose);
gzSet=(f=>function(e,cx,by,s){f(e,cx,by,s);if(gzNT(e)&&(gzSX(e)!=1||gzSY(e)!=1)){const d=e.o,w=e.O.w*s*gzSX(e),h=e.O.h*s*gzSY(e);d.w=w;d.h=h;d.x=cx-w/2;d.y=by-h;d.by=by}
 if(gzNT(e))e.o.z=e.zl||0})(gzSet);
// 圖層：跟重疊的物件比，排到它前面或後面
function gzKey(d){return d.y+d.h}
function gzOverlaps(e){const b=gzBox(e),r=[];EO.forEach(o=>{if(o===e||o.rm||o.flat)return;const c=gzBox(o);if(c.x<b.x+b.w&&c.x+c.w>b.x&&c.y<b.y+b.h&&c.y+c.h>b.y)r.push(o.kind=='tree'?o.o.y+36:gzKey(o.o)+(o.o.z||0))});return r}
function gzLayer(e,how){const base=gzKey(e.o),cur=base+(e.zl||0),L=gzOverlaps(e);if(!L.length){toast('這個物件沒有跟其他物件重疊');return false}
 let t=null;if(how=='up'){const a=L.filter(k=>k>cur+1e-6);t=a.length?Math.min(...a)+.05:null}else if(how=='down'){const a=L.filter(k=>k<cur-1e-6);t=a.length?Math.max(...a)-.05:null}
 else if(how=='top')t=Math.max(...L,cur)+.05;else t=Math.min(...L,cur)-.05;
 if(t==null){toast(how=='up'?'已經在最上層了':'已經在最下層了');return false}e.zl=Math.round((t-base)*100)/100;e.o.z=e.zl;return true}
// 復原：自己記錄寬高、圖層
function gzSnap(e){const p=gzPose(e);return{cx:p.cx,by:p.by,s:p.s,sx:gzSX(e),sy:gzSY(e),zl:e.zl||0}}
function gzPut(e,q){e.sxk=q.sx;e.syk=q.sy;e.zl=q.zl;gzSet(e,q.cx,q.by,q.s)}
function gzDo(e,fn){const a=gzSnap(e);const ok=fn();if(ok===false)return;const b=gzSnap(e);if(JSON.stringify(a)!=JSON.stringify(b))gzPush(()=>gzPut(e,a));gzRefresh()}
function gzStretch(e,kx,ky){const p=gzPose(e);e.sxk=Math.max(.15,Math.min(8,gzSX(e)*kx));e.syk=Math.max(.15,Math.min(8,gzSY(e)*ky));if(Math.abs(e.sxk-1)<.01)e.sxk=1;if(Math.abs(e.syk-1)<.01)e.syk=1;gzSet(e,p.cx,p.by,p.s)}
// 選取工具列加上按鈕
gzSelUI=(f=>function(){f.apply(this,arguments);const box=$e('gzSel'),e=ED.sel;if(ED.room||!e||e.rm||!e.o||ED.tool!='sel')return;
 const x=box.querySelector('[data-s="x"]'),h=document.createElement('span');h.style.cssText='display:contents';
 h.innerHTML=gzNT(e)?`<span style="opacity:.6;margin:0 2px">｜圖層</span><button data-s="zbot" title="放到最底下">⤓</button><button data-s="zdn" title="往下一層">⬇</button><button data-s="zup" title="往上一層">⬆</button><button data-s="ztop" title="放到最上面">⤒</button>
  <span style="opacity:.6;margin:0 2px">｜寬</span><button data-s="w-">－</button><button data-s="w+">＋</button><span style="opacity:.6;margin:0 2px">高</span><button data-s="h-">－</button><button data-s="h+">＋</button>${gzSX(e)!=1||gzSY(e)!=1?'<button data-s="wh0">⟲ 原比例</button>':''}`
  :'<span style="opacity:.6;margin:0 4px">｜樹木只能等比例縮放</span>';
 box.insertBefore(h,x)})(gzSelUI);
gzSelAct=(f=>function(a){const e=ED.sel;if(ED.room||!e||!e.o||!gzNT(e)||!/^(z(bot|dn|up|top)|[wh][+-]|wh0)$/.test(a))return f.apply(this,arguments);
 gzDo(e,()=>{if(a[0]=='z')return gzLayer(e,{zbot:'bottom',zdn:'down',zup:'up',ztop:'top'}[a]);if(a=='wh0'){const p=gzPose(e);e.sxk=1;e.syk=1;gzSet(e,p.cx,p.by,p.s);return}
  const k=a[1]=='+'?1.1:1/1.1;gzStretch(e,a[0]=='w'?k:1,a[0]=='h'?k:1)})})(gzSelAct);
// 拖曳把手：右邊＝拉寬、上面＝拉高、右上角＝一起
function gzHandles(e){const b=gzBox(e);return{w:[b.x+b.w,b.y+b.h/2],h:[b.x+b.w/2,b.y],wh:[b.x+b.w,b.y]}}
function gzHandleAt(x,y){const e=ED.sel;if(ED.room||!e||!e.o||e.rm||!gzNT(e)||ED.tool!='sel')return null;const H=gzHandles(e),r=7/ED.z;for(const k of ['wh','w','h']){const q=H[k];if(Math.abs(x-q[0])<=r&&Math.abs(y-q[1])<=r)return k}return null}
let gzHD=null;
addEventListener('pointerdown',ev=>{if(!ED.on||ED.room||!dlg.hidden)return;const r=cv.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)return;if(ev.target!==cv)return;
 const [x,y]=gzW(ev),k=gzHandleAt(x,y);if(!k)return;ev.stopImmediatePropagation();ev.preventDefault();const e=ED.sel,p=gzPose(e);gzHD={k,e,st:gzSnap(e),cx:p.cx,by:p.by,s:p.s}},true);
addEventListener('pointermove',ev=>{if(!gzHD||!ED.on)return;ev.stopImmediatePropagation();const [x,y]=gzW(ev),D=gzHD,e=D.e;
 if(D.k!='h'){const w=Math.max(4,(x-D.cx)*2);e.sxk=Math.max(.15,Math.min(8,w/(e.O.w*D.s)))}
 if(D.k!='w'){const h=Math.max(4,D.by-y);e.syk=Math.max(.15,Math.min(8,h/(e.O.h*D.s)))}
 gzSet(e,D.cx,D.by,D.s)},true);
addEventListener('pointerup',ev=>{if(!gzHD)return;ev.stopImmediatePropagation();const D=gzHD;gzHD=null;const a=D.st,e=D.e;if(JSON.stringify(a)!=JSON.stringify(gzSnap(e)))gzPush(()=>gzPut(e,a));gzRefresh()},true);
// 畫把手
gzFrame=(f=>function(now){f(now);try{const e=ED.sel;if(ED.room||!e||!e.o||e.rm||!gzNT(e)||ED.tool!='sel')return;const z=ED.z,H=gzHandles(e),s=6/z;g.save();g.setTransform(K*z,0,0,K*z,0,0);g.translate(-ED.cx,-ED.cy);
 const hv=ED.inCv?gzHandleAt(ED.mx,ED.my):null;cv.style.cursor=gzHD?(gzHD.k=='w'?'ew-resize':gzHD.k=='h'?'ns-resize':'nesw-resize'):hv?(hv=='w'?'ew-resize':hv=='h'?'ns-resize':'nesw-resize'):'';
 for(const k in H){const q=H[k];g.fillStyle=k==hv||(gzHD&&gzHD.k==k)?'#ffd84a':'#fff';g.strokeStyle='#3a2210';g.lineWidth=1.2/z;g.fillRect(q[0]-s/2,q[1]-s/2,s,s);g.strokeRect(q[0]-s/2,q[1]-s/2,s,s)}
 if(e.zl){g.fillStyle='rgba(0,0,0,.6)';g.font=`${10/z}px sans-serif`;const b=gzBox(e),t='圖層 '+(e.zl>0?'↑':'↓');g.fillRect(b.x,b.y-14/z,g.measureText(t).width+6/z,12/z);g.fillStyle='#ffd84a';g.fillText(t,b.x+3/z,b.y-4.5/z)}
 g.restore()}catch(er){}})(gzFrame);
// 存檔：圖層與寬高一起存進開場地圖
gzSerialize=(f=>function(){const m=f.apply(this,arguments),r2=v=>Math.round(v*10)/10;let ai=0;
 EO.forEach(e=>{if(e.rm)return;const ext=gzNT(e)&&((e.zl||0)!=0||gzSX(e)!=1||gzSY(e)!=1)?[e.zl||0,Math.round(gzSX(e)*1000)/1000,Math.round(gzSY(e)*1000)/1000]:null;
  if(e.add){const q=m.add[ai++];if(q&&ext)q.push(ext[0],ext[1],ext[2]);return}
  if(!ext)return;if(!m.mv[e.sig]){const p=gzPose(e),fl=(e.sd?1:0)|(e.flat?2:0)|(e.mx?4:0);m.mv[e.sig]=[r2(p.cx),r2(p.by),Math.round(p.s*1000)/1000,fl]}m.mv[e.sig].push(ext[0],ext[1],ext[2])});
 return m})(gzSerialize);
gzApply=(f=>function(m){f.apply(this,arguments);try{if(!m||m.v!=1)return;const put=(e,z,sx,sy)=>{if(!e||!gzNT(e))return;const p=gzPose(e);e.zl=z||0;e.sxk=sx||1;e.syk=sy||1;gzSet(e,p.cx,p.by,p.s)};
 const bySig={};EO.forEach(e=>{if(!e.add)bySig[e.sig]=e});for(const s in m.mv||{}){const q=m.mv[s];if(q.length>4)put(bySig[s],q[4],q[5],q[6])}
 const added=EO.filter(e=>e.add&&!e.rm);let j=0;(m.add||[]).forEach(q=>{while(j<added.length&&added[j].k!=q[0])j++;const e=added[j++];if(e&&q.length>5)put(e,q[5],q[6],q[7])})}catch(er){console.warn(er)}})(gzApply);
