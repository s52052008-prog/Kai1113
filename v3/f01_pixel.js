/* ===== v3.3：像素圖塊框架（16×16 Tilemap）＋ 素材圖集接口 =====
   ★ 想換成自己的 Sprite Sheet（例如在 itch.io 下載的 Stardew 風素材）：
     1. 把圖集網址（相對路徑、https、或 data:URI 皆可）填進下面 SPRITE_SHEETS.tiles.src
     2. 在 map 裡填寫每個圖塊在圖集中的 [欄, 列]（每格 tw×th，預設 16×16）
     3. 圖片載入完成會自動重繪地面；沒填 src 或載入失敗時，會使用內建的程式化 16×16 像素圖塊
   也可以在 console 執行：PIX_SET('tiles','你的圖集網址')  */
const TILE=16;
/* ===== 素材圖集（Pixel Crawler / Tiny Wonder / Modern Interiors，已轉 Base64 內嵌）=====
   AT.M[name]=[x,y,w,h]；AT.ok 為 1 代表圖集已載入。載入後會重繪地面、樹與室內快取。 */
const AT={img:null,ok:0,M:ASSET.meta,cb:[]};
(()=>{const im=new Image();im.onload=()=>{AT.img=im;AT.ok=1;AT.cb.forEach(f=>{try{f()}catch(e){console.error(e)}})};im.onerror=()=>console.warn('素材圖集載入失敗，使用內建繪製');im.src=ASSET.atlas})();
function atDraw(c,n,dx,dy,dw,dh){const m=AT.M[n];if(!AT.ok||!m)return false;c.drawImage(AT.img,m[0],m[1],m[2],m[3],dx,dy,dw==null?m[2]:dw,dh==null?m[3]:dh);return true}
const SPRITE_SHEETS={
 tiles:{src:'',tw:16,th:16,map:{grass:[0,0],grass2:[1,0],grass3:[2,0],grassD:[3,0],flower:[4,0],tuft:[5,0]}}
 // 之後可擴充：chars:{src:'',tw:16,th:32,...}、trees:{...}、props:{...}
};
const PIX={img:{},ok:{},proc:{},
 load(name){const sh=SPRITE_SHEETS[name];if(!sh||!sh.src)return;const im=new Image();im.crossOrigin='anonymous';im.onload=()=>{PIX.img[name]=im;PIX.ok[name]=1;if(name=='tiles')renderGround()};im.onerror=()=>{PIX.ok[name]=0;console.warn('Sprite sheet 載入失敗，改用內建圖塊：',sh.src)};im.src=sh.src},
 gen(kind,seed){const c=document.createElement('canvas');c.width=c.height=TILE;const x=c.getContext('2d');let sd=(seed*7919+13)>>>0;const r=()=>(sd=(sd*1103515245+12345)>>>0)/4294967296;
  const G0=ASSET.grass,off={grass:[0,0,0],grass2:[-6,-6,-3],grass3:[5,5,4],grassD:[-16,-20,-10],flower:[0,0,0],tuft:[-3,-4,-2]}[kind],base=[G0[0]+off[0],G0[1]+off[1],G0[2]+off[2]],sh=(d)=>`rgb(${Math.max(0,Math.min(255,base[0]+d*.8))|0},${Math.max(0,Math.min(255,base[1]+d))|0},${Math.max(0,Math.min(255,base[2]+d*.6))|0})`;
  x.fillStyle=sh(0);x.fillRect(0,0,TILE,TILE);
  for(let i=0;i<26;i++){const px=r()*TILE|0,py=r()*TILE|0,q=r();x.fillStyle=q<.55?sh(-9):sh(8);x.fillRect(px,py,1,1)}
  const tuft=(px,py)=>{x.fillStyle=sh(-30);x.fillRect(px,py,1,2);x.fillRect(px-1,py-1,1,1);x.fillRect(px+1,py-1,1,1);x.fillStyle=sh(22);x.fillRect(px,py-1,1,1)};
  for(let i=0;i<(kind=='tuft'?4:2);i++)tuft(2+r()*12|0,3+r()*11|0);
  if(kind=='flower'){const cols=[['#ffffff','#ffd84a'],['#ff9ec0','#ffe08a'],['#c9a7ff','#fff2a8']];for(let i=0;i<2;i++){const px=3+r()*9|0,py=3+r()*9|0,cl=cols[(r()*3)|0];x.fillStyle=cl[0];x.fillRect(px,py-1,1,1);x.fillRect(px,py+1,1,1);x.fillRect(px-1,py,1,1);x.fillRect(px+1,py,1,1);x.fillStyle=cl[1];x.fillRect(px,py,1,1)}}
  return c},
 draw(ctx,name,x,y){const sh=SPRITE_SHEETS.tiles;if(PIX.ok.tiles&&sh.map[name]){const m=sh.map[name];ctx.drawImage(PIX.img.tiles,m[0]*sh.tw,m[1]*sh.th,sh.tw,sh.th,x,y,TILE,TILE);return}
  const k=name+((x/TILE+y/TILE)&3);const t=PIX.proc[k]||(PIX.proc[k]=PIX.gen(name,(x*31+y*17)|0));ctx.drawImage(t,x,y)}};
// 地面圖塊矩陣（Tilemap）：每格一個代號，改這個矩陣就能改地形
const TNAMES=['grass','grass2','grass3','grassD','flower','tuft'];
const GCOLS=Math.ceil(WW/TILE),GROWS=Math.ceil(WH/TILE),GMAP=[];
const gT=(c,r)=>{const n=Math.sin(c*.21+r*.13)+Math.sin(c*.07-r*.19)+Math.sin(c*.05+r*.04+1.3),h=((c*73856093)^(r*19349663))>>>0,q=(h%1000)/1000;return q<.035?4:q<.1?5:n>1.25?3:n<-1.2?2:(h>>>10)&1};
for(let r=0;r<GROWS;r++){const row=[];for(let c=0;c<GCOLS;c++)row.push(gT(c,r));GMAP.push(row)}
const GNR=Math.ceil(NY/TILE);
const S0=document.createElement('canvas');S0.width=Math.round(WW*KS);S0.height=Math.round((WH+NY)*KS);const s0=S0.getContext('2d');s0.scale(KS,KS);s0.translate(0,NY);
function renderGround(){s0.imageSmoothingEnabled=false;for(let r=-GNR;r<GROWS;r++)for(let c=0;c<GCOLS;c++)PIX.draw(s0,TNAMES[r<0?gT(c,r):GMAP[r][c]],c*TILE,r*TILE);
 if(AT.ok){ // 素材小花草裝飾（決定性亂數，疏密有致）
  for(let r=-GNR;r<GROWS;r++)for(let c=0;c<GCOLS;c++){const h=((c*2654435761)^(r*40503)^(c*r*97))>>>0,q=(h%1000)/1000;
   if(q<.16){const k='dec'+(h>>>12)%6;atDraw(s0,k,c*TILE+((h>>>3)&7),r*TILE+((h>>>6)&7))}
   else if(q>.992){atDraw(s0,'bushS',c*TILE,r*TILE-6)}}}}
window.PIX_SET=(name,src)=>{SPRITE_SHEETS[name].src=src;PIX.load(name)};
renderGround();PIX.load('tiles');AT.cb.push(()=>{renderGround();if(typeof S0Ready=='function')S0Ready()});
/* ===== 像素化：把向量繪製的圖統一成像素風（降採樣→減色→硬邊→深色輪廓→最近鄰放大）===== */
function pixelize(cv,f,o){o=o||{};if(f<1)f=1;const w=cv.width,h=cv.height,sw=Math.max(1,Math.floor(w/f)),sh=Math.max(1,Math.floor(h/f));
 const t=document.createElement('canvas');t.width=sw;t.height=sh;const tc=t.getContext('2d',{willReadFrequently:true});tc.imageSmoothingEnabled=true;tc.imageSmoothingQuality='high';tc.drawImage(cv,0,0,w,h,0,0,sw,sh);
 const id=tc.getImageData(0,0,sw,sh),P=id.data,N=sw*sh,st=o.step||18,ol=o.ol==null?.42:o.ol,keep=!!o.keepA,op=new Uint8Array(N);
 for(let i=0;i<N;i++){const j=i*4,a=P[j+3];if(keep){op[i]=a>=200?1:0}else{if(a>=110){P[j+3]=255;op[i]=1}else{P[j+3]=0;P[j]=P[j+1]=P[j+2]=0}}
  if(P[j+3]>0){P[j]=Math.min(255,Math.round(P[j]/st)*st);P[j+1]=Math.min(255,Math.round(P[j+1]/st)*st);P[j+2]=Math.min(255,Math.round(P[j+2]/st)*st)}}
 if(ol<1){const edge=new Uint8Array(N);for(let y=0;y<sh;y++)for(let x=0;x<sw;x++){const i=y*sw+x;if(!op[i])continue;
   const l=x>0?op[i-1]:1,r=x<sw-1?op[i+1]:1,u=y>0?op[i-sw]:1,d=y<sh-1?op[i+sw]:1;if(!l||!r||!u||!d)edge[i]=1}
  for(let i=0;i<N;i++)if(edge[i]){const j=i*4;P[j]=P[j]*ol|0;P[j+1]=P[j+1]*ol|0;P[j+2]=P[j+2]*ol|0}}
 tc.putImageData(id,0,0);const out=document.createElement('canvas');out.width=w;out.height=h;const x=out.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(t,0,0,sw,sh,0,0,sw*f,sh*f);return out}
