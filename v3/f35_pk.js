const PKN={};
/* v8.7 冠宏的新素材包（31 張圖檔，以圖集方式載入，不佔主檔空間） */
const PKF={'05':.32,'06':.32,'14':.3,'24':.5,'25':.35,'26':.35,'03':.3,'13':.3,'20':.3,'23':.4};
(function(){if(!window.PKIDX||!window.PKA)return;const groups={};
 for(const sid in PKIDX){const P=PKIDX[sid],A=PKA[sid];if(!A||!A.naturalWidth)continue;
  const keys=P.r.map((r,i)=>{const k='pk'+sid+'_'+i;let cv=null,url=null;
   const mk=()=>{if(!cv){cv=document.createElement('canvas');cv.width=r[2];cv.height=r[3];cv.getContext('2d').drawImage(A,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);cv.naturalWidth=r[2];cv.naturalHeight=r[3];cv.complete=true}return cv};
   Object.defineProperty(UAI,k,{get:mk,enumerable:true,configurable:true});
   Object.defineProperty(UA,k,{get:()=>{if(!url){try{url=mk().toDataURL()}catch(e){url=''}}return url},enumerable:false,configurable:true});
   PKN[k]=[P.nm?P.nm[i]:P.n+' '+(i+1),Math.round(r[4]*(P.f||PKF[sid]||.42)),r,sid];return k});
  if(!P.hide)(groups[P.g]=groups[P.g]||[]).push(['📦 '+P.n,keys,sid]);
  if(sid=='24')keys.forEach((k,i)=>{EDT[k]='地板牆面 '+(i+1);ETS[k]=24})}
 const order=['🎨 介面','🏠 居家','🏪 店面','🏥 醫療','🏛️ 主題・公共','🌳 戶外','🏖️ 海灘','🐾 動物','🎮 玩具・包包','🍱 美食','🎣 釣魚・礦石','🧱 地板牆面'];
 Object.keys(groups).sort((a,b)=>order.indexOf(a)-order.indexOf(b)).forEach(g=>groups[g].sort((a,b)=>a[2]-b[2]).forEach((c,i)=>EDCAT.push([c[0],c[1],i==0?'✨ 新素材・'+g:undefined])))})();
function gzThumb(k){const P=PKN[k];if(!P||!P[2])return `<img src="${UA[k]}" alt="">`;const r=P[2],s=Math.min(64/r[2],56/r[3],2);
 return `<div style="width:64px;height:56px;display:flex;align-items:center;justify-content:center"><div style="width:${r[2]}px;height:${r[3]}px;flex:none;transform:scale(${s});background:url(pk/p${P[3]}.webp) -${r[0]}px -${r[1]}px no-repeat"></div></div>`}
