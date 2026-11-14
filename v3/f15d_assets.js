/* ===== v4：室內家具素材、UI 面板素材 ===== */
// ── 染色工具 ──
const TC2={};
const rgb2hsl=(r,g,b)=>{r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!=mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx==r?(g-b)/d+(g<b?6:0):mx==g?(b-r)/d+2:(r-g)/d+4;h*=60}return[h,s,l]};
const hsl2rgb=(h,s,l)=>{h=((h%360)+360)%360/360;const f=(p,q,t)=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p},q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;return[f(p,q,h+1/3)*255,f(p,q,h)*255,f(p,q,h-1/3)*255]};
function srcOf(n,tint){const m=AT.M[n];if(!m)return null;if(!tint)return{im:AT.img,sx:m[0],sy:m[1],sw:m[2],sh:m[3]};
 const key=n+'|'+tint.m+'|'+tint.c+'|'+(tint.ref||0)+'|'+(tint.lo||0);if(TC2[key])return TC2[key];
 const cv=document.createElement('canvas');cv.width=m[2];cv.height=m[3];const x=cv.getContext('2d');x.drawImage(AT.img,m[0],m[1],m[2],m[3],0,0,m[2],m[3]);
 const d=x.getImageData(0,0,m[2],m[3]),P=d.data,t=hexRGB(tint.c);
 if(tint.m=='col'){let sum=0,cnt=0;for(let i=0;i<P.length;i+=4)if(P[i+3]){const L=lum(P[i],P[i+1],P[i+2]);if(L>90){sum+=L;cnt++}}const ref=cnt?sum/cnt:150;
  for(let i=0;i<P.length;i+=4)if(P[i+3]){const L=lum(P[i],P[i+1],P[i+2]),q=Math.max(.3,Math.min(1.5,L/ref));P[i]=Math.min(255,t[0]*q);P[i+1]=Math.min(255,t[1]*q);P[i+2]=Math.min(255,t[2]*q)}}
 else{const th=rgb2hsl(t[0],t[1],t[2])[0],dh=th-(tint.ref||0);
  for(let i=0;i<P.length;i+=4)if(P[i+3]){const[h,s,l]=rgb2hsl(P[i],P[i+1],P[i+2]);if(s<.2)continue;if(tint.lo!=null&&(h<tint.lo||h>tint.hi))continue;const o=hsl2rgb(h+dh,s,l);P[i]=o[0];P[i+1]=o[1];P[i+2]=o[2]}}
 x.putImageData(d,0,0);return TC2[key]={im:cv,sx:0,sy:0,sw:m[2],sh:m[3]}}
// mode: str 拉伸滿格 / nat 原尺寸貼底置中 / tile 橫向重複
function sprD(c,n,x,y,w,h,mode,tint){const s=srcOf(n,tint);if(!s)return false;c.save();c.imageSmoothingEnabled=false;
 if(mode=='nat'){const k=Math.min(1.6,Math.max(1,h*1.3/s.sh));const dw=Math.round(s.sw*k),dh=Math.round(s.sh*k);c.fillStyle='rgba(30,20,0,.22)';c.beginPath();c.ellipse(x+w/2,y+h,Math.min(dw*.4,12),2.4,0,0,7);c.fill();c.drawImage(s.im,s.sx,s.sy,s.sw,s.sh,Math.round(x+w/2-dw/2),Math.round(y+h-dh),dw,dh)}
 else if(mode=='tile'){const k=h/s.sh,cap=Math.min(8,Math.floor(s.sw/3)),dh=h;const cw=Math.round(cap*k);
  c.drawImage(s.im,s.sx,s.sy,cap,s.sh,x,y,cw,dh);c.drawImage(s.im,s.sx+s.sw-cap,s.sy,cap,s.sh,x+w-cw,y,cw,dh);
  const mw=s.sw-2*cap,tw=Math.max(4,Math.round(mw*k));c.save();c.beginPath();c.rect(x+cw,y,w-2*cw,dh);c.clip();for(let px=x+cw;px<x+w-cw;px+=tw)c.drawImage(s.im,s.sx+cap,s.sy,mw,s.sh,px,y,tw,dh);c.restore()}
 else c.drawImage(s.im,s.sx,s.sy,s.sw,s.sh,Math.round(x),Math.round(y),Math.round(w),Math.round(h));
 c.restore();return true}
const pkS=(a,x,y)=>a[Math.abs((x*7+y*13)>>4)%a.length];
function wrapFD(k,fn){const o=FD[k];if(!o)return;FD[k]=(c,x,y,w,h,f)=>{if(AT.ok&&w>0&&h>0){const sh=h*.5;if(fn(c,x,y,w,h,f)!==false)return}o(c,x,y,w,h,f)}}
wrapFD('sofa',(c,x,y,w,h,f)=>{if(h<16)return false;const t=f[5]?{m:'col',c:f[5]}:null;c.fillStyle='rgba(0,0,0,.2)';c.fillRect(x+2,y+h-1,w-2,3);return sprD(c,'sofaL',x-2,y,w+4,h,'str',t)});
wrapFD('bed',(c,x,y,w,h,f)=>{const t=f[5]?{m:'rot',c:f[5],ref:180,lo:150,hi:210}:null;return sprD(c,'bedT',x,y,w,h,'str',t)});
wrapFD('cbed',(c,x,y,w,h,f)=>sprD(c,'bedW',x,y,w,h,'str'));
wrapFD('tv',(c,x,y,w,h)=>{if(h<10)return false;return sprD(c,'tv',x,y,w,h,'str')});
wrapFD('bookcase',(c,x,y,w,h)=>sprD(c,pkS(['bookA','bookB'],x,y),x,y,w,h,'str'));
wrapFD('wardrobe',(c,x,y,w,h)=>{if(h<30)return false;return sprD(c,pkS(['wardA','wardB','wardC','wardD'],x,y),x,y,w,h,'str')});
wrapFD('plant',(c,x,y,w,h)=>sprD(c,pkS(['ficus','ficus2','palm','plant3'],x,y),x,y,w,h,'nat'));
wrapFD('fridge',(c,x,y,w,h)=>sprD(c,'locker',x,y,w,h,'str'));
wrapFD('rug',(c,x,y,w,h,f)=>sprD(c,'rugR',x,y,w,h,'str',f[5]?{m:'rot',c:f[5],ref:3}:null));
wrapFD('window',(c,x,y,w,h)=>sprD(c,pkS(['winRed','winWhite','winCurt'],x,y),x-1,y-1,w+2,h+2,'str'));
wrapFD('mirror',(c,x,y,w,h)=>{if(w>40||h>40)return false;return sprD(c,'mirrorW',x,y,w,h,'str')});
wrapFD('lamp',(c,x,y,w,h)=>sprD(c,pkS(['lampB','lampR'],x,y),x,y,w,h,'nat'));
wrapFD('gshelf',(c,x,y,w,h)=>sprD(c,pkS(['gshelfA','gshelfB','gshelfC','gshelfD'],x,y),x,y,w,h,'str'));
['cooler','dairy','fridgeV'].forEach(k=>wrapFD(k,(c,x,y,w,h)=>sprD(c,pkS(['coolA','coolB'],x,y),x,y,w,h,'str')));
wrapFD('table',(c,x,y,w,h,f)=>{if(w<24||h<14)return false;const lt=f[5]&&lum(...hexRGB(f[5]))>140;sprD(c,lt?'tableC':'tableO',x,y-2,w,h+2,'str');chr(c,x-8,y+h-6);chr(c,x+w+1,y+h-6)});
wrapFD('counter',(c,x,y,w,h,f)=>{if(h<12)return false;if(f[5]){const t=hexRGB(f[5]),sl=rgb2hsl(t[0],t[1],t[2]);if(sl[1]>.6&&sl[2]>.3)return false}sprD(c,'dresser',x,y-1,w,h+2,'tile',{m:'col',c:f[5]||'#8a5a2e'});
 R(c,x+w-20,y-6,12,7,'#2a2a30');R(c,x+w-18.4,y-5,8.8,3.6,'#9fd3ee');R(c,x+w-16,y+1.4,4,1,'#ddd');R(c,x+4,y-3,6,3.6,'#f4efe0')});
// 室內地板與牆（Room Builder）：依房間原色挑最接近的素材
const nearA=(pre,n,col)=>{const t=hexRGB(col);let b=0,bd=1e9;for(let i=0;i<n;i++){const m=AT.M[pre+i],d=(m[4]-t[0])**2+(m[5]-t[1])**2+(m[6]-t[2])**2;if(d<bd){bd=d;b=i}}return pre+b};
function roomTiles(x,W,H,d){if(!AT.ok)return;x.save();x.imageSmoothingEnabled=false;
 const fk=d.fl=='wood'?'fl3':d.fl=='rubber'?'fl4':nearA('fl',4,d.f||'#ccc'),wk=nearA('wl',8,d.w||'#c97a5a'),fm=AT.M[fk],wm=AT.M[wk];
 x.save();x.beginPath();x.rect(0,28,W,H-28);x.clip();
 if(fk=='fl4'){for(let py=28;py<H;py+=16)for(let px=0;px<W;px+=16)x.drawImage(AT.img,fm[0],fm[1],16,16,px,py,16,16)}
 else{const s=fk=='fl3'?srcOf('fl3',{m:'col',c:d.f||'#d9b98a'}):{im:AT.img,sx:fm[0],sy:fm[1]};for(let py=28;py<H;py+=32)for(let px=0;px<W;px+=48)x.drawImage(s.im,s.sx,s.sy,48,32,px,py,48,32)}
 x.globalAlpha=.55;x.fillStyle=d.f||'#ccc';x.fillRect(0,28,W,H-28);x.globalAlpha=1;
 x.restore();
 for(let px=0;px<W;px+=45)x.drawImage(AT.img,wm[0],wm[1],46,28,px,0,46,28);
 x.fillStyle='rgba(0,0,0,.22)';x.fillRect(0,28,W,2);x.restore()}
// 圖集載入後：重繪已建立的室內快取、清除人像快取
function portraitReset(){for(const k in PORT)delete PORT[k]}
AT.cb.push(()=>{for(const k in IN){try{const r=IN[k];if(r&&r.built&&r.cv)r.cv=renderRm(r,k)}catch(e){}}portraitReset()});
// ── UI 面板：Tiny Wonder UI（九宮格 border-image）──
(()=>{const u=ASSET.ui,st=document.createElement('style');
 st.textContent=`
.rdesc{border:0;border-radius:0;box-shadow:none;background:none;border-style:solid;border-width:15px;border-image:url(${u.pCream}) 5 fill/15px stretch;image-rendering:pixelated;padding:6px 8px;color:#4a2812}
.dopt{border:0;border-radius:0;box-shadow:none;background:none;border-style:solid;border-width:12px 12px 12px 12px;border-image:url(${u.bDark}) 8 fill/12px stretch;image-rendering:pixelated;padding:0 8px 0 24px;margin-top:6px;color:#ffe9c4;filter:none}
.dopt::before{left:6px;top:50%;margin-top:-7px}
.dopt:hover:not(:disabled){border-image-source:url(${u.bMid});color:#3a2210;filter:none}
.dopt:disabled{border-image-source:url(${u.bDis});opacity:1;color:#3a2210;cursor:not-allowed}.dopt:disabled b{color:#3a2210}.dopt:disabled .sub{color:#5a3a26;opacity:1}.dopt .lack{color:#b3261e}
.rpg{border:0;border-radius:0;box-shadow:0 10px 30px rgba(0,0,0,.6);background:none;border-style:solid;border-width:18px;border-image:url(${u.pDark}) 5 fill/18px stretch;image-rendering:pixelated;padding:4px 2px}
.rpg::before,.rpg::after{top:-17px}
.tile{border:0;border-radius:0;box-shadow:none;background:none;border-style:solid;border-width:9px;border-image:url(${u.sCream}) 5 fill/9px stretch;image-rendering:pixelated}
.tile:hover{filter:brightness(1.08)}
.wood{border:0;border-radius:0;box-shadow:none;background:none;border-style:solid;border-width:10px;border-image:url(${u.pMid}) 5 fill/10px stretch;image-rendering:pixelated;color:#fff6dc;text-shadow:0 1px 0 #3a1a0c}
#hud.wood,#qp.wood{padding:0 2px}
#tm.wood,#toast.wood{padding:0 2px}
`;document.head.appendChild(st)})();

// 靜態世界層（建築、道路、人行道）像素化
function pixelS(){const f=Math.max(1,Math.round(KS)),o=pixelize(S,f,{keepA:1,ol:1,step:18}),x=S.getContext('2d');x.save();x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='copy';x.imageSmoothingEnabled=false;x.drawImage(o,0,0);x.restore()}
// 動物：逐幀快取成像素圖（肖像放大時維持向量畫法）
const ANC={};
function drawA(c,n){
 if(n.w===12&&n.x===-6&&n.y===-4)return drawAProc(c,n);
 const key=[n.t,n.c,n.pat,n.dir==2?'L':n.dir==3?'R':n.dir,n.mv?1:0,n.fr|0,n.peck?1:0,Math.floor(NOW/120)%6].join('|');
 let im=ANC[key];
 if(!im){const cv2=document.createElement('canvas');cv2.width=Math.ceil(64*SK);cv2.height=Math.ceil(48*SK);const x=cv2.getContext('2d');x.scale(SK,SK);drawAProc(x,{...n,x:26,y:30});im=ANC[key]=pixelize(cv2,Math.max(1,Math.round(SK)),{})}
 c.save();c.imageSmoothingEnabled=false;c.drawImage(im,Math.round(n.x+6)-32,Math.round(n.y+8)-38,64,48);c.restore()}

/* ===== v4.3 對話選項像素圖示 ===== */
const EMIC={};
function emIcon(e){if(EMIC[e])return EMIC[e];try{const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d');g.font='26px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(e,16,18);
 {const d=g.getImageData(0,0,32,32).data;let n=0,gray=0,edge=0,x0=99,y0=99,x1=-1,y1=-1;for(let i=0;i<d.length;i+=4){if(d[i+3]<60)continue;const px=(i/4)%32,py=(i/4|0)/32|0;n++;if(Math.max(d[i],d[i+1],d[i+2])-Math.min(d[i],d[i+1],d[i+2])<28)gray++;x0=Math.min(x0,px);y0=Math.min(y0,py);x1=Math.max(x1,px);y1=Math.max(y1,py)}
  if(n<12)return EMIC[e]='';for(let i=0;i<d.length;i+=4){if(d[i+3]<60)continue;const px=(i/4)%32,py=(i/4|0)/32|0;if(px-x0<3||x1-px<3||py-y0<3||y1-py<3)edge++}if(gray>n*.92&&edge>n*.75&&y1-y0>10)return EMIC[e]=''}
 const p=pixelize(c,2,{keepA:1,ol:1,step:24});return EMIC[e]=p.toDataURL?p.toDataURL():p.src}catch(x){return EMIC[e]=''}}
const OPK=[[/再見|離開|關閉|取消|算了|返回|下次|不用|沒事/,'👋'],[/送禮|禮物|贈/,'🎁'],[/邀|一起|好啊|好的|答應|接受|陪/,'🤝'],[/買|購|結帳|付/,'🛒'],[/賣|出售/,'💰'],[/吃|餐|飲|喝|點/,'🍽️'],[/睡|休息|躺/,'🛏️'],[/聊|談|問|說|聽|對話/,'💬'],[/看|瀏覽|查/,'👀'],[/玩|遊戲|挑戰|比/,'🎮'],[/工作|打工|上班|任務/,'💼'],[/學|讀|書/,'📖'],[/運動|健身|跑|練/,'💪'],[/拜|禱|祈/,'🙏'],[/治|藥|掛號|看診/,'💊'],[/存|款|轉|提/,'🏦'],[/花/,'🌸'],[/修|整理/,'🔧']];
function optHTML(o,i,grid){if(grid)return optHTML0(o,i,grid);
 let m=o[0].match(/^(\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*)\s*([\s\S]*)$/u),e,t;
 if(m&&m[2]){e=m[1];t=m[2]}else return optHTML0(o,i,grid);
 const u=emIcon(e);if(!u)return optHTML0(o,i,grid);
 return `<button data-i="${i}" ${o[3]?'disabled':''} class="dopt wic"><img class="oic" src="${u}"><b>${i+1}　${t}</b>${o[1]?`<div class="sub">${o[1]}</div>`:''}</button>`}
(()=>{const s=document.createElement('style');s.textContent='.dopt.wic{padding-left:44px}.dopt .oic{position:absolute;left:12px;top:50%;margin-top:-16px;width:32px;height:32px;image-rendering:pixelated;pointer-events:none}.dopt{position:relative}.dopt::before{display:none}';document.head.appendChild(s)})();
