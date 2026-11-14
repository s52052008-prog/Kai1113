/* ===== v4.6：佈置系統（家＋頂級職業店面）===== */
var DM={on:0};
const WALLK=new Set(['frame','wshelf','garland','clock']);
const PAL=['#c0392b','#e07a3a','#e8b830','#4a9a5a','#3a8a8a','#2f80ed','#7a4a9e','#d9609a','#6b6b72','#e8e0d0','#5a3a22'];
const KN={bed:'床',cabinet:'櫃子',wardrobe:'衣櫃',rug:'地毯',lamp:'立燈',plant:'盆栽',pcdesk:'書桌',chair:'椅子',bookcase:'書櫃',globe:'地球儀',table:'餐桌',sofa:'沙發',ctable:'茶几',tv:'電視',petbed:'寵物窩',shoeshelf:'鞋櫃',mat:'地墊',rack:'衣架',crate:'木箱',barrel:'木桶',cart:'推車',luggage:'行李',stool:'圓凳',piano:'鋼琴'};
// g: f家具 p植物燈飾 r地毯 w壁飾；p價格；cm舒適度；col可換色
const CAT={
 sofa:{n:'雙人沙發',i:'🛋️',w:76,h:28,c:'#4a8aa8',p:260,cm:4,g:'f',col:1},
 armchair:{n:'單人沙發',i:'💺',w:28,h:26,c:'#c9783a',p:120,cm:3,g:'f',col:1},
 beanbag:{n:'懶骨頭',i:'🟠',w:24,h:22,c:'#e07a3a',p:70,cm:3,g:'f',col:1},
 bed:{n:'雙人床',i:'🛏️',w:78,h:50,c:'#3a6ab8',p:400,cm:5,g:'f',col:1},
 table:{n:'餐桌',i:'🍽️',w:60,h:30,c:'#d9a05a',p:180,cm:2,g:'f',col:1},
 ctable:{n:'茶几',i:'☕',w:60,h:24,p:90,cm:2,g:'f'},
 chair:{n:'餐椅',i:'🪑',w:14,h:14,c:'#8a5a3a',p:25,cm:1,g:'f',col:1},
 stool:{n:'圓凳',i:'🔴',w:14,h:14,p:20,cm:1,g:'f'},
 dresser:{n:'五斗櫃',i:'🗄️',w:40,h:24,c:'#b98a56',p:150,cm:2,g:'f',col:1},
 bookcase:{n:'書櫃',i:'📚',w:38,h:54,p:220,cm:3,g:'f'},
 pcdesk:{n:'電腦桌',i:'💻',w:76,h:26,c:'#7a5a38',p:300,cm:3,g:'f',col:1},
 tv:{n:'電視',i:'📺',w:72,h:16,p:500,cm:5,g:'f'},
 piano:{n:'鋼琴',i:'🎹',w:44,h:26,p:1200,cm:8,g:'f'},
 hearth:{n:'壁爐',i:'🔥',w:46,h:36,p:800,cm:7,g:'f'},
 aqua:{n:'水族箱',i:'🐠',w:42,h:30,p:450,cm:6,g:'f'},
 bar:{n:'迷你吧台',i:'🍸',w:50,h:22,c:'#5a3a22',p:380,cm:4,g:'f',col:1},
 easel:{n:'畫架',i:'🎨',w:24,h:34,p:110,cm:3,g:'f'},
 gchair:{n:'電競椅',i:'🎮',w:20,h:24,c:'#d62828',p:230,cm:2,g:'f',col:1},
 catT:{n:'貓跳台',i:'🐱',w:26,h:40,p:160,cm:3,g:'f'},
 petbed:{n:'寵物窩',i:'🐾',w:40,h:18,c:'#e07a9a',p:60,cm:2,g:'f',col:1},
 plant:{n:'盆栽',i:'🪴',w:16,h:26,p:40,cm:2,g:'p'},
 cactus:{n:'仙人掌',i:'🌵',w:12,h:18,p:30,cm:1,g:'p'},
 bonsai:{n:'松樹盆景',i:'🌲',w:20,h:22,p:120,cm:3,g:'p'},
 vase:{n:'花瓶',i:'💐',w:12,h:18,p:50,cm:1,g:'p'},
 flamp:{n:'落地立燈',i:'💡',w:12,h:34,p:90,cm:3,g:'p'},
 lamp:{n:'檯燈',i:'🕯️',w:12,h:22,p:60,cm:2,g:'p'},
 globe:{n:'地球儀',i:'🌐',w:20,h:30,p:150,cm:2,g:'p'},
 rug:{n:'長方地毯',i:'🟫',w:64,h:40,c:'#b5533c',p:80,cm:2,g:'r',col:1},
 rugr:{n:'圓形地毯',i:'⭕',w:56,h:40,c:'#3a8a8a',p:90,cm:2,g:'r',col:1},
 rugs:{n:'條紋地毯',i:'🟧',w:64,h:40,c:'#d98a3a',p:80,cm:2,g:'r',col:1},
 rugc:{n:'格紋地毯',i:'🟦',w:56,h:40,c:'#4a7a9a',p:80,cm:2,g:'r',col:1},
 mat:{n:'地墊',i:'🟩',w:40,h:16,c:'#6ab0d0',p:25,cm:1,g:'r',col:1},
 frame:{n:'小掛畫',i:'🖼️',w:24,h:18,c:'#6a4426',v:0,p:60,cm:2,g:'w',wy:5},
 frameW:{n:'寬幅掛畫',i:'🏞️',k:'frame',w:40,h:18,c:'#6a4426',v:0,p:100,cm:3,g:'w',wy:5},
 clock:{n:'壁鐘',i:'🕰️',w:16,h:16,p:50,cm:1,g:'w',wy:8},
 wshelf:{n:'壁掛層架',i:'📖',w:36,h:12,p:70,cm:2,g:'w',wy:8},
 garland:{n:'彩燈串',i:'✨',w:60,h:10,p:40,cm:2,g:'w',wy:3}
};
const CATG=[['f','🛋️ 家具','沙發、床、桌椅、櫃子'],['p','🪴 植物與燈飾','盆栽、立燈、花瓶'],['r','🟫 地毯與門墊','鋪在地上，家具可以壓在上面'],['w','🖼️ 壁飾','只能掛在最上方的牆']];
const edOf=it=>CAT[it.cid||it.k]||{};
const edName=it=>edOf(it).n||KN[it.k]||it.k;
const HMOV=new Set(['bed','cabinet','wardrobe','rug','lamp','plant','pcdesk','chair','bookcase','globe','table','sofa','ctable','tv','petbed','shoeshelf','mat','rack']);
const SMOV=new Set(['plant','rug','mat','crate','barrel','lamp','globe','cart','luggage']);
const HANCH=[['sleep','bed'],['mirror','cabinet'],['wardrobe','wardrobe'],['study','pcdesk'],['read','bookcase'],['eat','table'],['tv','tv'],['sofa','sofa']];
const snap4=v=>Math.round(v/4)*4;
function mkSol(fur){return fur.filter(f=>furnSolid(f)&&!WALLK.has(f[0])).map(f=>({x:f[1],y:f[2]+(['sdesk','sofa','bpress','squat','legpress','spin','treadmill'].includes(f[0])?Math.min(6,f[4]*.25):(['teller'].includes(f[0])?10:0)),w:f[3],h:f[4]-(['sdesk','sofa'].includes(f[0])?4:0)}))}
function edInfo(n){if(n=='家')return{ok:1};const ids=PB[n];if(!ids||!IN[n])return null;const h=ids.find(i=>st.cp==i&&st.ct>=5);return h!=null?{ok:1}:{ok:0,need:ids.map(i=>PA[i].t[5]).join('／')}}
function edComfort(n){const L=st.lay&&st.lay[n];return L?L.items.reduce((s,it)=>s+(edOf(it).cm||0),0):0}
function edBonus(){const L=st.lay&&st.lay['家'];if(!L)return 0;return Math.max(0,Math.min(20,Math.floor((edComfort('家')-L.base)/3)))}
function edInit(n){const r=IN[n];st.lay=st.lay||{};st.fi=st.fi||[];
 if(!r.fur0){r.fur0=r.fur.slice();r.sp0=(r.sp||[]).map(s=>s.slice())}
 if(st.lay[n]&&!r.fixed){const mv0=n=='家'?HMOV:SMOV;r.fixed=r.fur0.filter(f=>!(mv0.has(f[0])&&f[3]>0))}
 if(!st.lay[n]){const L=st.lay[n]={items:[],n:0,anc:{}},mv=n=='家'?HMOV:SMOV;r.fixed=[];
  r.fur0.forEach(f=>{if(mv.has(f[0])&&f[3]>0)L.items.push({id:'o'+L.n++,cid:CAT[f[0]]?f[0]:null,k:f[0],x:f[1],y:f[2],w:f[3],h:f[4],a:f.slice(5),org:1});else r.fixed.push(f)});
  if(n=='家')HANCH.forEach(([sp,k])=>{const it=L.items.find(q=>q.k==k),s=r.sp0.find(q=>q[0]==sp);if(it&&s){it.pin=sp;L.anc[sp]=[it.id,s[1]-it.x,s[2]-it.y]}});
  L.base=edComfort(n)}
 return st.lay[n]}
function edApply(){const r=DM.rm,L=DM.lay;r.fur=r.fixed.concat(L.items.map(it=>[it.k,it.x,it.y,it.w,it.h,...it.a]));r.sol=mkSol(r.fur);
 if(DM.name=='家'&&r.sp0)r.sp=r.sp0.map(s=>{const a=L.anc[s[0]];if(!a)return s;const it=L.items.find(q=>q.id==a[0]);return it?[s[0],it.x+a[1],it.y+a[2],s[3],s[4]]:null}).filter(Boolean);
 if(r.built)r.cv=renderRm(r,DM.name)}
function edReach(r,sol){const W=r.W,H=r.H,S=4,X0=4,Y0=30,nx=((W-8-12)/S|0)+1,ny=((H-Y0-8)/S|0)+1,fr=new Uint8Array(nx*ny);
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const x=X0+i*S,y=Y0+j*S;let ok=1;for(let k=0;k<sol.length;k++){const o=sol[k];if(x<o.x+o.w&&x+12>o.x&&y<o.y+o.h&&y+8>o.y){ok=0;break}}fr[j*nx+i]=ok}
 const si=Math.round((W/2-6-X0)/S),sj=Math.round((H-22-Y0)/S),seen=new Uint8Array(nx*ny),q=[];
 if(fr[sj*nx+si]){seen[sj*nx+si]=1;q.push(sj*nx+si)}
 while(q.length){const c=q.pop(),i=c%nx,j=c/nx|0;for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){const a=i+d[0],b=j+d[1];if(a<0||b<0||a>=nx||b>=ny)continue;const m=b*nx+a;if(fr[m]&&!seen[m]){seen[m]=1;q.push(m)}}}
 return (r.sp||[]).filter(s=>{const i0=Math.max(0,Math.floor((s[1]-20-X0)/S)),i1=Math.min(nx-1,Math.ceil((s[1]+s[3]+8-X0)/S)),j0=Math.max(0,Math.floor((s[2]-16-Y0)/S)),j1=Math.min(ny-1,Math.ceil((s[2]+s[4]+8-Y0)/S));
  for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){if(!seen[j*nx+i])continue;const x=X0+i*S,y=Y0+j*S;if(x-8<s[1]+s[3]&&x+20>s[1]&&y-8<s[2]+s[4]&&y+16>s[2])return false}return true}).map(s=>s[0])}
function npcBox(n){if(n.wk)return{x:n.wk[0]-4,y:n.y-6,w:n.wk[1]-n.wk[0]+n.w+8,h:n.h+12};if(n.r)return{x:n.r[0],y:n.r[1],w:n.r[2],h:n.r[3]};return{x:n.x-5,y:n.y-6,w:n.w+10,h:n.h+12}}
function edValid(it,x,y,deep){const r=DM.rm,W=r.W,H=r.H,C=edOf(it),bad=w=>({ok:0,why:w});
 if(C.g=='w'){if(x<6||x+it.w>W-6)return bad('超出牆面');if(x<W/2+50&&x+it.w>W/2-50)return bad('那是店名牌的位置');
  if(r.fur.some(f=>f[3]>0&&f[2]<22&&f[2]+f[4]>2&&f[1]<x+it.w&&f[1]+f[3]>x))return bad('牆上這裡已經有東西了');return{ok:1}}
 if(x<6||x+it.w>W-6||y<28||y+it.h>H-6)return bad('超出房間範圍');
 const flat=FLAT.has(it.k);
 if(!flat){if(x<W/2+40&&x+it.w>W/2-40&&y+it.h>H-48)return bad('不能擋住出入口');
  const me=mkSol([[it.k,x,y,it.w,it.h]])[0];
  if(me){const m={x:me.x+1,y:me.y+1,w:me.w-2,h:me.h-2};
   if(r.sol.some(o=>hit(m,o)))return bad('和其他家具重疊了');
   if(r.ppl.some(n=>!n.hp&&!n.ll&&hit(m,npcBox(n))))return bad('有人在那裡活動');
   if(deep){const un=edReach(r,r.sol.concat([me])).filter(s=>!DM.base.includes(s));if(un.length)return bad('會擋住通道或互動位置')}}}
 return{ok:1}}
function edNew(id){const C=CAT[id],L=DM.lay;return{id:'n'+(L.n++),cid:id,k:C.k||id,x:0,y:0,w:C.w,h:C.h,a:C.k=='frame'||id=='frame'?[C.c,C.v||0]:(C.col?[C.c]:[])}}
function edGhost(){const it=DM.hold,C=edOf(it);return{x:snap4(DM.cx-it.w/2),y:C.g=='w'?(C.wy||5):snap4(DM.cy-it.h/2)}}
function edPickAt(x,y){const L=DM.lay.items.filter(it=>x>=it.x&&x<=it.x+it.w&&y>=it.y&&y<=it.y+it.h);if(!L.length)return null;L.sort((a,b)=>(FLAT.has(a.k)?1:0)-(FLAT.has(b.k)?1:0)||(b.y+b.h)-(a.y+a.h));return L[0]}
function DMstart(){if(!scene||DM.on)return;const inf=edInfo(scene);if(!inf)return toast('這裡不能佈置');if(!inf.ok)return toast('🔒 要成為本店最高階職位「'+inf.need+'」，才能佈置這間店');
 DM.rm=rm;DM.name=scene;DM.lay=edInit(scene);DM.base=edReach(rm,rm.sol);DM.on=1;DM.hold=null;DM.sel=null;DM.cx=p.x+6;DM.cy=p.y+4;closeDlg();
 BAR.style.display='flex';OPN.style.display='none';toast('🛠️ 佈置模式：方向鍵移動游標，空白鍵拿起／放下，C 完成')}
function DMoff(q){if(!DM.on)return;if(DM.hold)DMcancelHold();DM.on=0;BAR.style.display='none';if(rm&&scene){if(iBlocked()){p.x=rm.W/2-6;p.y=rm.H-22}edBtn()}if(!q)toast('✔ 佈置完成'+(DM.name=='家'?'　🏡 舒適度 '+edComfort('家')+(edBonus()?'（睡覺 😊+'+edBonus()+'）':''):''))}
function DMcancelHold(){const it=DM.hold;if(!it)return;DM.hold=null;if(DM.hf=='floor'){it.x=DM.ox;it.y=DM.oy;DM.lay.items.push(it);edApply()}else{st.fi.push(it);toast('📦 已放進倉庫')}}
function DMpick(it){const L=DM.lay;L.items.splice(L.items.indexOf(it),1);DM.hold=it;DM.hf='floor';DM.ox=it.x;DM.oy=it.y;DM.sel=null;edApply();DM.cx=it.x+it.w/2;DM.cy=it.y+it.h/2}
function DMact(){if(!DM.on||!dlg.hidden)return;
 if(DM.hold){const gp=edGhost(),v=edValid(DM.hold,gp.x,gp.y,1);if(!v.ok)return toast('✖ '+v.why);const it=DM.hold;it.x=gp.x;it.y=gp.y;DM.hold=null;DM.lay.items.push(it);edApply();toast('✔ 放好了'+(DM.name=='家'?'　🏡 舒適度 '+edComfort('家'):''));return}
 if(DM.sel)return DMpick(DM.sel);DMcatalog()}
function DMstore(){if(!DM.on||!dlg.hidden)return;let it=DM.hold;if(!it&&DM.sel){it=DM.sel;if(it.pin)return toast('這是生活必需的家具，只能移動，不能收起');DM.lay.items.splice(DM.lay.items.indexOf(it),1);st.fi.push(it);DM.sel=null;edApply();return toast('📦 已收進倉庫：'+edName(it))}
 if(!it)return toast('先用游標指到一件家具');if(it.pin)return toast('這是生活必需的家具，只能移動，不能收起');DM.hold=null;st.fi.push(it);toast('📦 已收進倉庫：'+edName(it))}
function DMsell(){if(!DM.on||!dlg.hidden)return;const it=DM.hold;if(!it)return toast('先拿起要賣掉的家具');if(it.pin)return toast('這是生活必需的家具，不能賣');const v=Math.floor((edOf(it).p||20)*.5);DM.hold=null;st.money+=v;hud();toast('💰 賣掉 '+edName(it)+'，得到 '+v+' 元')}
function DMcolor(){if(!DM.on||!dlg.hidden)return;const it=DM.hold||DM.sel;if(!it)return toast('先用游標指到一件家具');
 if(it.k=='frame'){it.a[1]=((it.a[1]||0)+1)%4}else if(typeof it.a[0]=='string'&&it.a[0][0]=='#'){const i=PAL.indexOf(it.a[0]);it.a[0]=PAL[(i+1)%PAL.length]}else return toast('這件家具不能換色');
 if(!DM.hold)edApply();toast('🎨 已更換')}
function DMtake(i){const it=st.fi.splice(i,1)[0];if(!it)return;if(DM.hold)DMcancelHold();DM.hold=it;DM.hf='store';closeDlg()}
function DMbuy(id){const C=CAT[id];if(st.money<C.p)return;st.money-=C.p;hud();const it=edNew(id);if(DM.hold)DMcancelHold();DM.hold=it;DM.hf='new';closeDlg();toast('🛒 已購買 '+C.n+'，移到想放的位置按空白鍵')}
function DMcatalog(){if(!DM.on)return;const n=st.fi.length,cm=edComfort(DM.name);
 const o=CATG.map(g=>[g[1],g[2],()=>DMgroup(g[0],g[1]),0]);
 o.push([`📦 倉庫（${n} 件）`,'取出之前收起來的家具',DMstorage,!n]);
 o.push(['♻️ 還原初始佈置','全部家具回到最初的位置，新買的收進倉庫',()=>DMreset(),0]);
 o.push(['✔ 完成佈置','',()=>{closeDlg();DMoff()},0]);o.push(['返回','',closeDlg,0]);
 openDlg('🛒 家具目錄',`💰 你有 ${st.money} 元${DM.name=='家'?`　🏡 舒適度 ${cm}`:''}<br><span style="font-size:12px;opacity:.7">買好之後會直接拿在手上，移到想放的位置按空白鍵。</span>`,o)}
function DMgroup(g,t){const o=Object.keys(CAT).filter(id=>CAT[id].g==g).map(id=>{const C=CAT[id];return[`${C.i} ${C.n}`,`💰${C.p}　舒適 +${C.cm}　${C.w}×${C.h}`,()=>DMbuy(id),st.money<C.p]});o.push(['返回','',cancel,0]);openDlg(t,`💰 你有 ${st.money} 元`,o,true)}
function DMstorage(){const o=st.fi.map((it,i)=>[`${edOf(it).i||'📦'} ${edName(it)}`,`${it.w}×${it.h}　點一下拿在手上`,()=>DMtake(i),0]);o.push(['返回','',cancel,0]);openDlg('📦 倉庫','選一件放回房間',o,true)}
function DMreset(){const r=DM.rm,L=DM.lay;L.items.forEach(it=>{if(!it.org)st.fi.push(it)});L.items=[];r.fur0.forEach(f=>{if(!r.fixed.includes(f)){const q={id:'o'+L.items.length,cid:CAT[f[0]]?f[0]:null,k:f[0],x:f[1],y:f[2],w:f[3],h:f[4],a:f.slice(5),org:1};L.items.push(q)}});
 if(DM.name=='家')HANCH.forEach(([sp,k])=>{const it=L.items.find(q=>q.k==k),s=r.sp0.find(q=>q[0]==sp);if(it&&s){it.pin=sp;L.anc[sp]=[it.id,s[1]-it.x,s[2]-it.y]}});
 DM.hold=null;edApply();closeDlg();toast('♻️ 已還原初始佈置')}
function DMstep(dt){const r=DM.rm,dx=(keys.right?1:0)-(keys.left?1:0),dy=(keys.down?1:0)-(keys.up?1:0);
 const mv=s=>{DM.cx=clamp(DM.cx+dx*s,6,r.W-6);DM.cy=clamp(DM.cy+dy*s,20,r.H-6)};
 if(dx||dy){DM.kh=(DM.kh||0)+dt;if(!DM.kd){DM.kd=1;DM.rep=.2;mv(4)}else{DM.rep-=dt;while(DM.rep<=0){mv(DM.kh>.8?8:4);DM.rep+=.04}}}else{DM.kd=0;DM.kh=0}
 if(DM.hold){const gp=edGhost(),key=DM.hold.id+'|'+gp.x+'|'+gp.y+'|'+DM.lay.items.length;DM.gp=gp;if(DM.vk!=key){DM.vk=key;DM.v=edValid(DM.hold,gp.x,gp.y,1)}}else DM.sel=edPickAt(DM.cx,DM.cy)}
function DMdraw(){const r=DM.rm;g.save();g.lineWidth=.5;g.strokeStyle='rgba(255,255,255,.07)';g.beginPath();for(let x=16;x<r.W-4;x+=16){g.moveTo(x,28);g.lineTo(x,r.H-4)}for(let y=32;y<r.H-4;y+=16){g.moveTo(4,y);g.lineTo(r.W-4,y)}g.stroke();
 g.lineWidth=.7;g.strokeStyle='rgba(255,255,255,.32)';DM.lay.items.forEach(it=>g.strokeRect(it.x+.5,it.y+.5,it.w-1,it.h-1));
 if(DM.sel){const s=DM.sel;g.strokeStyle='#ffd84a';g.lineWidth=1.3;g.setLineDash([3,2]);g.lineDashOffset=-NOW/90;g.strokeRect(s.x-.5,s.y-.5,s.w+1,s.h+1);g.setLineDash([])}
 if(DM.hold&&DM.gp){const it=DM.hold,gp=DM.gp,ok=DM.v&&DM.v.ok,fn=FD[it.k];if(edOf(it).g=='w'){g.fillStyle='rgba(255,216,74,.12)';g.fillRect(4,0,r.W-8,28)}
  g.globalAlpha=.85;if(fn)fn(g,gp.x,gp.y,it.w,it.h,[it.k,gp.x,gp.y,it.w,it.h,...it.a]);g.globalAlpha=1;g.fillStyle=ok?'rgba(80,220,120,.2)':'rgba(240,70,60,.32)';g.fillRect(gp.x,gp.y,it.w,it.h);g.strokeStyle=ok?'#5cff8a':'#ff6a5a';g.lineWidth=1;g.strokeRect(gp.x+.5,gp.y+.5,it.w-1,it.h-1)}
 const cx=DM.cx,cy=DM.cy;g.strokeStyle='#000';g.lineWidth=2.4;g.beginPath();g.moveTo(cx-5,cy);g.lineTo(cx+5,cy);g.moveTo(cx,cy-5);g.lineTo(cx,cy+5);g.stroke();g.strokeStyle='#ffd84a';g.lineWidth=1;g.stroke();g.restore()}
function DMhud(){const it=DM.hold;let s,col='#fff8e0';if(it){const v=DM.v||{ok:1};s=edName(it)+(v.ok?'　✔ 空白鍵：放下':'　✖ '+v.why);if(!v.ok)col='#ffb0a0'}else if(DM.sel)s=edName(DM.sel)+'　空白鍵：拿起';else s='空白鍵：目錄／購買　C：完成佈置';
 R(g,W/2-140,H-20,280,13,'rgba(0,0,0,.72)');txt(g,s,W/2,H-10,col,'bold 9px sans-serif')}
function DMcamOff(){const r=DM.rm;return[r.W<=W?Math.round((W-r.W)/2):-Math.round(clamp(DM.cx-W/2,0,r.W-W)),r.H<=H?Math.round((H-r.H)/2):-Math.round(clamp(DM.cy-H/2,0,r.H-H))]}
/* ── 介面 ── */
const BAR=document.createElement('div'),OPN=document.createElement('button');
{const css='background:#5a3a1a;color:#fff3d6;border:2px solid #3a2210;border-radius:3px;padding:3px 8px;font-size:12px;font-weight:bold;box-shadow:0 2px 0 #2a1608;cursor:pointer;touch-action:manipulation';
 BAR.style.cssText='position:absolute;left:6px;bottom:8px;display:none;gap:4px;flex-direction:column;z-index:20';
 [['✋','拿起／放下（空白鍵）',()=>DMact()],['📦','收進倉庫（X）',()=>DMstore()],['🎨','換色／換圖案（R）',()=>DMcolor()],['💰','賣掉（Delete）',()=>DMsell()],['🛒','家具目錄（G）',()=>DMcatalog()],['✔','完成佈置（C）',()=>DMoff()]].forEach(q=>{const b=document.createElement('button');b.textContent=q[0];b.title=q[1];b.setAttribute('aria-label',q[1]);b.style.cssText=css+';font-size:16px;padding:2px 7px;line-height:1.3';b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(dlg.hidden)q[2]()});BAR.appendChild(b)});
 OPN.style.cssText=css+';position:absolute;left:6px;bottom:6px;display:none;z-index:20';OPN.textContent='🛠️ 佈置';
 OPN.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(dlg.hidden)DMstart()});
 const w=document.getElementById('wrap');w.appendChild(BAR);w.appendChild(OPN)}
function edBtn(){const inf=scene&&!DM.on?edInfo(scene):null;OPN.style.display=inf?'block':'none';if(inf){OPN.textContent=inf.ok?'🛠️ 佈置':'🔒 佈置';OPN.style.opacity=inf.ok?1:.7;
  st.edSeen=st.edSeen||{};if(inf.ok&&scene!='家'&&!st.edSeen[scene]){st.edSeen[scene]=1;setTimeout(()=>toast('🛠️ 你是這裡的頂級職位，現在可以佈置這間店了（左下角「佈置」）'),1200)}}}
cv.addEventListener('pointerdown',e=>{if(!DM.on||!dlg.hidden)return;e.preventDefault();const b=cv.getBoundingClientRect(),o=DMcamOff(),X=(e.clientX-b.left)*W/b.width-o[0],Y=(e.clientY-b.top)*H/b.height-o[1];
 DM.cx=clamp(X,6,DM.rm.W-6);DM.cy=clamp(Y,20,DM.rm.H-6);DM.dg=1;DM.dx0=DM.cx;DM.dy0=DM.cy;
 if(DM.hold){const gp=edGhost();DM.gp=gp;DM.v=edValid(DM.hold,gp.x,gp.y,0)}else{DM.sel=edPickAt(DM.cx,DM.cy);if(DM.sel){DM.pk=DM.sel;DMpick(DM.sel);DM.cx=DM.dx0;DM.cy=DM.dy0}}
 try{cv.setPointerCapture(e.pointerId)}catch(_){}});
cv.addEventListener('pointermove',e=>{if(!DM.on||!DM.dg)return;const b=cv.getBoundingClientRect(),o=DMcamOff();DM.cx=clamp((e.clientX-b.left)*W/b.width-o[0],6,DM.rm.W-6);DM.cy=clamp((e.clientY-b.top)*H/b.height-o[1],20,DM.rm.H-6)});
cv.addEventListener('pointerup',e=>{if(!DM.on||!DM.dg)return;DM.dg=0;
 if(DM.hold&&(DM.pk?Math.hypot(DM.cx-DM.dx0,DM.cy-DM.dy0)>6:1)){DMact()}DM.pk=null});
addEventListener('keydown',e=>{if(!DM.on||!dlg.hidden||(e.target&&e.target.tagName=='INPUT'))return;const k=e.key;
 if(k=='r'||k=='R'){DMcolor()}else if(k=='x'||k=='X'){DMstore()}else if(k=='g'||k=='G'||k=='Tab'){e.preventDefault();DMcatalog()}else if(k=='Delete'){DMsell()}});
{const _a=act;act=function(){if(DM.on&&dlg.hidden&&!MG)return DMact();return _a.apply(this,arguments)};
 const _c=cancel;cancel=function(){if(DM.on&&dlg.hidden&&!MG){if(DM.hold)DMcancelHold();else DMoff();return}return _c.apply(this,arguments)};
 const _u=updateIn;updateIn=function(dt){if(DM.on){p.vx=p.vy=0;p.mv=false;DMstep(dt)}return _u(dt)};
 const _x=exitB;exitB=function(){DMoff(1);OPN.style.display='none';return _x()};
 const _e=enterB;enterB=function(z){const r=_e(z);edBtn();return r}}
