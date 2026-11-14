/* v5.1 戰鬥陀螺：開局內建 3 顆、強化系統、X 世代像素外觀 */
Object.assign(BLD,{b5:{n:'烈焰飛龍刃',atk:1.5,sta:.95,def:.9,p:180,c:'#ff3a2a',d:'進階攻擊型：撞擊極強'},b6:{n:'蒼穹要塞刃',atk:.9,sta:1.1,def:1.65,p:180,c:'#3a7aff',d:'進階防禦型：幾乎不會爆裂'},b7:{n:'疾風迴旋刃',atk:1,sta:1.6,def:1.05,p:200,c:'#2fd08a',d:'進階耐力型：旋轉超久'},b8:{n:'黃金帝王刃',atk:1.55,sta:1.4,def:1.4,p:420,c:'#ffc400',d:'傳說級：全能最強'}});
Object.assign(RAT,{r4:{n:'6-90',br:1.8,spd:.82,p:110,d:'爆裂抗性＋80%，非常穩'},r5:{n:'2-50',br:.9,spd:1.25,p:90,d:'極輕，加速超快'}});
Object.assign(BIT,{bG:{n:'齒輪G',spd:1.15,sta:1.15,def:1.2,p:140,d:'齒輪軸心：全面提升'},bH:{n:'高速H',spd:1.4,sta:.95,def:1,p:120,d:'極速衝擊'}});
function BS(){if(!st.parts){st.parts={};st.deck=[null,null,null]}
 if(!st.bey3){st.bey3=1;const P=st.parts;['b2','b3','b4','r2','bB','bN'].forEach(k=>P[k]=Math.max(P[k]||0,1));P.b1=Math.max(P.b1||0,1);P.r1=Math.max(P.r1||0,2);P.bF=Math.max(P.bF||0,1);
  const ok=d=>d&&d.every(x=>x);const D=[['b2','r1','bF'],['b3','r2','bB'],['b4','r1','bN']];
  if(!st.deck||!ok(st.deck[0])&&!ok(st.deck[1])&&!ok(st.deck[2])||(st.deck.filter(ok).length==1&&st.deck[0].join()=='b1,r1,bF'))st.deck=D;
  else for(let i=0;i<3;i++)if(!ok(st.deck[i]))st.deck[i]=D[i].slice();
  const need={};st.deck.forEach(d=>d.forEach(x=>need[x]=(need[x]||0)+1));for(const k in need)P[k]=Math.max(P[k]||0,need[k])}
 if(!st.bup)st.bup={};return st}
function mkTop(a){const bl=BLD[a[0]],ra=RAT[a[1]],bi=BIT[a[2]],lv=(st.bup&&st.bup[a[0]])||0,m=1+.08*lv;return{ids:a,nm:bl.n+'・'+ra.n+bi.n.slice(-1)+(lv?' ＋'+lv:''),bl,ra,bi,sp:Math.round(100*bl.sta*bi.sta*m),atk:bl.atk*m,acc:520*ra.spd*bi.spd,bmx:Math.round(75*ra.br*bl.def*bi.def*m),c:bl.c}}
function partShop(){BS();const o=[];for(const c in PCAT)for(const id in PCAT[c][1]){const p=PCAT[c][1][id];o.push([`${PCAT[c][0]}｜${p.n}　$${p.p}（持有 ${st.parts[id]||0}）`,p.d,()=>{if(st.money<p.p)return;st.money-=p.p;st.parts[id]=(st.parts[id]||0)+1;hud();toast('🛒 購買：'+p.n);partShop()},st.money<p.p])}
 o.unshift(['🔩 強化刀鋒（花錢升級）','每級＋8% 攻擊／耐力／爆裂抗性，最高 5 級',beyUp]);
 o.push(['返回','',beyHub]);openDlg('🛒 陀螺零件專賣',`💰 ${st.money}　（內建 3 顆已可比賽；想更強請買進階零件或強化）`,o)}
function beyUp(){BS();const o=[];Object.keys(BLD).filter(id=>st.parts[id]).forEach(id=>{const lv=st.bup[id]||0,cost=80*(lv+1)*(lv+1);o.push([`${BLD[id].n}　Lv.${lv}${lv>=5?'（已滿）':'　→　Lv.'+(lv+1)+'　$'+cost}`,BLD[id].d,()=>{if(lv>=5||st.money<cost)return;st.money-=cost;st.bup[id]=lv+1;hud();toast('🔩 '+BLD[id].n+' 強化到 Lv.'+(lv+1));beyUp()},lv>=5||st.money<cost])});
 o.push(['返回','',partShop]);openDlg('🔩 強化刀鋒',`💰 ${st.money}`,o)}
/* X 世代風格像素陀螺（齒輪外環＋三葉刀鋒＋中央軸心） */
function beyX(c,x,y,r,c1,c2,a){const u=2,n=Math.ceil(r/u)+1;
 for(let j=-n;j<=n;j++)for(let i=-n;i<=n;i++){const px=i*u,py=j*u,d=Math.hypot(px,py);if(d>r+1)continue;
  let an=Math.atan2(py,px)-a,col=null;const k=((an%(Math.PI*2/3))+Math.PI*2/3)%(Math.PI*2/3)/(Math.PI*2/3);
  if(d>r*.82){col=((Math.floor(((an%(Math.PI/6))+Math.PI/6)%(Math.PI/6)/(Math.PI/6)*2)))?'#dfe6f0':'#6a768c'}
  else if(d>r*.5){col=k<.55?c1:(k<.62?'#fff':c2);if(k<.07)col='#fff'}
  else if(d>r*.22)col=k<.5?'#2a3248':'#3e4a68';
  else col=d<r*.1?'#fff':'#ffd84a';
  if(col){c.fillStyle=col;c.fillRect(Math.round(x+px-1),Math.round(y+py-1),u,u)}}
 c.fillStyle='rgba(255,255,255,.55)';c.fillRect(Math.round(x-r*.5),Math.round(y-r*.62),2,2)}
