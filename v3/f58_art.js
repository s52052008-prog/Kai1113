/* v10.6 冠宏的新素材：健身器材、頂樓農場、全聯福利中心（外觀＋室內）、五位格鬥家 */
// ───────── 全聯外觀 ─────────
{const b=B.find(b=>b.n=='全聯');if(b&&uaOK('pk48_0')){const [ww,hh]=uaSize('pk48_0',150);b.ua={k:'pk48_0',w:ww,h:hh,oy:4};b.st0=b.st;b.st='ua';const nh=Math.round(Math.min(b.h,hh*.86));b.y=b.bot-nh;b.h=nh}}
try{EDNM.pk48_0='全聯福利中心（外觀）'}catch(e){}
// ───────── 全聯室內（重新擺設） ─────────
{const R=IN['全聯'];if(R){R.W=420;R.H=300;
 R.fur=[UF('pk48_20',12,74,64),UF('pk48_21',82,74,58),UF('pk48_22',146,74,62),UF('pk48_5',214,74,62),UF('pk48_29',284,74,50),UF('pk48_24',344,70,22,6,1),UF('pk48_8',372,70,30,8,1),
  UF('pk48_30',20,150,60),UF('pk48_31',92,150,60),UF('pk48_32',20,222,60),UF('pk48_33',92,222,60),
  UF('pk48_18',196,140,62),UF('pk48_19',268,140,60),UF('pk48_25',184,214,40),UF('pk48_28',232,214,40),UF('pk48_26',280,214,40),
  UF('pk48_6',300,274,104),UF('pk48_27',248,282,22,6,1),UF('pk48_27',226,286,22,6,1),UF('pk48_11',14,290,36,8,1)];
 R.ppl=[pp('店員 阿美',392,250,'#1e5aa8','#222','實在真便宜！|今天的小農蔬菜剛到貨喔。|晚上九點以後生鮮打七折喔～',{ou:'a',dir:2}),pp('婆婆媽媽',150,244,'#c0392b','#ddd','這個標價好像怪怪的……|今天高麗菜一顆才 39！',{dir:0}),pp('下班的上班族',230,100,'#555','#222','冷藏櫃的即食品最方便了。',{dir:0})];
 R.sp=[['main',300,276,104,12]]}}
// ───────── 房間升級後自動出現的家具（不影響你自己用編輯器擺的版面） ─────────
const f5Lv=k=>{try{return f5S()[k]||0}catch(e){return 0}};
const UPF={'家6F':[
  {c:()=>rnReady('gym')&&rnS().gym.lv>=2,f:()=>UF('pk46_18',92,262,56)},
  {c:()=>rnReady('gym')&&rnS().gym.lv>=2,f:()=>UF('pk46_24',156,262,38)},
  {c:()=>rnReady('gym')&&rnS().gym.lv>=3,f:()=>UF('pk46_2',200,262,30)},
  {c:()=>rnReady('gym')&&rnS().gym.lv>=3,f:()=>UF('pk46_28',74,150,14)},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=2,f:()=>UF('pk46_30',356,32,62,4,0)},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=2,f:()=>UF('pk46_31',342,206,16,4,0,{z:1})},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=3,f:()=>UF('pk46_35',398,330,34)},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=3,f:()=>UF('pk46_36',276,330,32)},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=3,f:()=>UF('iv_a_bey',332,322,40)},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=4,f:()=>['zabu',300,244,18,14]},
  {c:()=>rnReady('wa')&&rnS().wa.lv>=4,f:()=>['zabu',380,244,18,14]},
  {c:()=>rnReady('roof')&&rnS().roof.lv>=2,f:()=>UF('pk47_11',22,598,76)},
  {c:()=>rnReady('roof')&&rnS().roof.lv>=3,f:()=>UF('pk47_12',350,600,74)},
  {c:()=>rnReady('roof')&&rnS().roof.lv>=3,f:()=>UF('pk47_13',396,588,10,4,0,{z:1})},
  {c:()=>rnReady('roof')&&rnS().roof.lv>=3,f:()=>UF('pk47_14',408,594,11,4,0,{z:1,mx:1})},
  {c:()=>rnReady('roof')&&rnS().roof.lv>=3,f:()=>UF('pk47_15',384,596,10,4,0,{z:1})},
  {c:()=>rnReady('roof')&&rnS().roof.lv>=3,f:()=>UF('pk47_16',398,598,7,4,0,{z:1})},
  {c:()=>rnReady('roof'),f:()=>UF('pk47_18',336,580,16,4,0)}],
 '家':[
  {c:()=>f5Lv('office')>=1,f:()=>UF('pk46_37',150,572,24,4,0)},
  {c:()=>f5Lv('office')>=1,f:()=>UF('pk46_39',126,568,18,4,0)},
  {c:()=>f5Lv('office')>=1&&!!st.cert,f:()=>UF('pk46_38',178,568,18,4,0)}]};
const upFur=n=>(UPF[n]||[]).filter(u=>{try{return u.c()}catch(e){return false}}).map(u=>u.f()).filter(f=>f&&(f[0]!='uaf'||uaOK(f[5])));
{const _r=renderRm;renderRm=function(d,n){const U=upFur(n);if(!U.length&&!d._upn)return _r(d,n);d._upn=U.length;
 if(d.sol){d.sol=d.sol.filter(s=>!s._up);mkSol(U).forEach(s=>{s._up=1;d.sol.push(s)})}
 const f0=d.fur;d.fur=f0.concat(U);try{return _r(d,n)}finally{d.fur=f0}}}
function upRefresh(n){const r=IN[n];if(!r||!r.built)return;if(n=='家6F')return rnRefresh();r.sol=mkSol(r.fur);r.cv=renderRm(r,n)}
// 升級之後馬上重畫
setInterval(()=>{try{if(typeof st=='undefined'||!st.reno&&!st.f5)return;const k=JSON.stringify([rnS().gym.lv,rnS().wa.lv,rnS().roof.lv,rnS().gym.s,rnS().wa.s,rnS().roof.s,f5Lv('office'),!!st.cert]);if(k!=window.__upk){window.__upk=k;upRefresh('家6F');upRefresh('家')}}catch(e){}},800);
// ───────── 菜圃換成新圖：空土 → 播種 → 小苗 → 成長中 → 各種成熟的菜 ─────────
Object.assign(CROPS,{okra:{n:'秋葵',ic:'🫛',seed:70,d:3,y:4,p:70,s:[1,2],col:'#6aa84a'},chive:{n:'韭菜',ic:'🌱',seed:50,d:2,y:3,p:55,s:[0,1,2,3],col:'#4a9a3a'},lettuce:{n:'萵苣',ic:'🥬',seed:60,d:2,y:3,p:65,s:[0,2,3],col:'#a8d878'}});
['okra','chive','lettuce'].forEach(k=>{const C=CROPS[k];IT['veg_'+k]={n:C.n,i:C.ic,p:C.p,d:'自己種的'+C.n+'，新鮮又安心。可以下廚、帶去小組，或到全聯賣。',u:'keep'}});
const CROPIMG={bok:5,yam:6,basil:7,okra:8,chive:9,lettuce:10,cab:10,tom:4};
rnPlots=function(c){if(!rnReady('roof'))return;const G=rnS().g;PLOTS.forEach((q,i)=>{const [x,y]=q,P=G.p[i];let k=0;
  if(P){const C=CROPS[P.c],s2=Math.min(1,P.g/C.d);k=s2>=1?CROPIMG[P.c]:P.g==0?1:s2<.5?2:3}
  const im=UAI['pk47_'+k];if(im&&im.naturalWidth){const w=PLW+8,h=w*im.naturalHeight/im.naturalWidth;R(c,x-3,y+PLH+2,w-2,3,'rgba(0,0,0,.22)');c.drawImage(im,x-4,y+PLH+4-h,w,h)}
  else{R(c,x,y,PLW,PLH,'#8a5a32')}
  if(!P)return;const C=CROPS[P.c];
  if(P.c=='tom'&&P.g>=C.d){[[10,10],[22,6],[32,14],[16,18],[28,20]].forEach(d=>{c.fillStyle='#e8402a';c.beginPath();c.arc(x+d[0],y+d[1],2.6,0,7);c.fill()})}
  if(P.w!=wkN()&&P.g<C.d)txt(c,'💧',x+PLW-4,y-2,'#3a8ad8','bold 7px sans-serif');
  if(P.bug){R(c,x+PLW-8,y+4,3,2,'#2a2a2a');R(c,x+PLW-14,y+12,3,2,'#2a2a2a')}
  if(P.g>=C.d)txt(c,'✨',x+PLW-4,y+2,'#ffd84a','bold 8px sans-serif')});
 txt(c,'🌱 菜園',PLOTS[0][0]+PLW*2+3,PLOTS[0][1]+PLH+14,'rgba(60,30,10,.4)','bold 8px sans-serif')};
// ───────── 健身房：新器材可以用 ─────────
{const _g=gymMenu;gymMenu=function(f0){const od=openDlg;openDlg=function(t,d,opts,...r){if(Array.isArray(opts)&&t.includes('家庭健身房')){const lv=rnS().gym.lv,i=opts.findIndex(o=>o[0]=='離開');
  if(lv>=2)opts.splice(i,0,['🏋️ 深蹲架重訓（1 小時）','深蹲、臥推・⚔️+3 ❤️+3 ⚡-18・算一次健身打卡',()=>{fxApply({p:3,h:3,s:-18});advance(1);try{st.gymW=wkN()}catch(e){}hud();closeDlg();toast('🏋️ 深蹲 5×5 做完，腿在發抖但很爽！')},st.sta<18]);
  if(lv>=3)opts.splice(i,0,['🚴 飛輪有氧（30 分鐘）','❤️+4 😊+4 ⚡-10',()=>{fxApply({h:4,j:4,s:-10});advance(.5);hud();closeDlg();toast('🚴 踩到滿身大汗，心肺全開！')},st.sta<10]);
  if(lv==2)opts.forEach(o=>{if(o[1]&&o[1].includes('跑步機、拳擊台'))o[1]=o[1].replace('跑步機、拳擊台','飛輪車、壺鈴架、槓片樹')})}
 return od.call(this,t,d,opts,...r)};try{return _g.apply(this,arguments)}finally{openDlg=od}}}
