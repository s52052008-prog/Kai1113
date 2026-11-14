/* v9.4 修正：選單兩欄＋去圖示、柔和燈光、雲影、小遊戲隱藏資訊與退出確認、五金行、朋友點魚委託 */
// ───────── 選單：乾淨按鈕、不放小圖示、選項多時分兩欄 ─────────
(()=>{const s=document.createElement('style');s.textContent=`
.dopt,.dopt.wic{border:2px solid #3a2210!important;border-image:none!important;border-radius:8px!important;background:linear-gradient(#8a5a2e,#6b4423)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 2px 0 rgba(40,20,5,.35)!important;padding:7px 12px!important;margin-top:6px;color:#fff6dc!important;text-align:left;width:100%;display:block}
.dopt:hover:not(:disabled){background:linear-gradient(#a06a36,#7d5028)!important;color:#fff6dc!important}
.dopt:disabled{background:#d9c9a4!important;border-color:#a89068!important;color:#6a5a3a!important}
.dopt b{font-weight:700;font-size:14px}.dopt .sub{font-size:11.5px;color:#f0dcb0;opacity:.9;margin-top:1px}.dopt:disabled .sub{color:#7a6a4a}
.dopt .oic{display:none!important}
.ocols{display:grid;grid-template-columns:1fr 1fr;gap:0 8px}.ocols .dopt{margin-top:6px}
@media (max-width:560px){.ocols{grid-template-columns:1fr}}
body.mgon #hud,body.mgon #tm,body.mgon #qp{display:none!important}`;document.head.appendChild(s)})();
{const PIC=/^(?:\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*\s*)+/u;
 const ICM=[[/背包/,'背包'],[/週末計畫/,'週末計畫'],[/相簿|相冊/,'相簿'],[/人際|朋友|通訊錄|邀約|約他|約她/,'人際關係'],[/手機/,'手機'],[/^\b\B$/,'裝備'],[/寵物/,'寵物'],[/公共安全|報案|派出所/,'公共安全'],[/職業|職涯|上班|兼差|應徵|打工|值班/,'職業'],[/存檔|讀檔/,'存檔'],[/操作說明|規則|說明/,'操作說明'],[/地圖/,'地圖'],[/回到標題|標題畫面/,'回標題'],[/造景/,'造景'],[/^關閉/,'關閉'],[/^返回|^上一頁/,'返回'],[/^離開|退出|^先不要/,'離開'],[/狀態|數值/,'狀態'],[/成就|獎狀/,'成就'],[/任務|委託|代辦/,'任務'],[/購買|選購|商店|商品|買/,'商店'],[/存款|提款|兌換|收購|賣掉|賣|帳單|繳|💰/,'金錢'],[/設定/,'設定'],[/信|LINE|收貨|郵/,'信件'],[/圖鑑/,'圖鑑'],[/點餐|菜單|下廚|吃|料理|定食|甜點|飲料|小吃|喝/,'料理'],[/改裝|製作|零件/,'製作'],[/訓練|練習|學|上課/,'技能'],[/道具|使用|膠囊|蘑菇/,'道具'],[/禮物|送/,'禮物'],[/聊|對話|說話|問/,'對話'],[/股票|交易|保險/,'交易'],[/睡|休息|住宿|泡湯|入浴/,'睡覺'],[/天氣/,'天氣'],[/時刻表|時間/,'時間'],[/拍照|相機/,'拍照'],[/比賽|活動|參加|挑戰|報名|遊戲|陀螺|釣|挖|拋竿/,'活動'],[/排名|排行/,'排名'],[/搭乘|列車|火車|船|接駁|出發|前往|攻頂|進入/,'離開']];
 const icOf=t=>{const X=window.PKIDX&&PKIDX['41'];if(!X)return -1;for(const q of ICM)if(q[0].test(t)){return X.nm.indexOf(q[1])}return -1};
 window.icHTML=(i,sz)=>{const X=PKIDX['41'],r=X.r[i],sc=Math.min(sz/r[2],sz/r[3]);return `<span class="oic2" style="width:${sz}px;height:${sz}px"><span style="width:${r[2]}px;height:${r[3]}px;transform:scale(${sc});background:url(pk/p41.webp) -${r[0]}px -${r[1]}px no-repeat"></span></span>`};
 const _o=optHTML;optHTML=function(o,i,grid){if(grid)return _o.apply(this,arguments);if(typeof o[0]=='string'&&!o[0].startsWith('<img')){const t=o[0].replace(PIC,'');if(t.trim()){const ic=icOf(t);return `<button data-i="${i}" ${o[3]?'disabled':''} class="dopt${ic>=0?' hic':''}">${ic>=0?icHTML(ic,30):''}<b>${i+1}　${t}</b>${o[1]?`<div class="sub">${o[1]}</div>`:''}</button>`}}return _o.apply(this,arguments)}}
(()=>{const s=document.createElement('style');s.textContent='.dopt{position:relative}.dopt.hic{padding-left:48px!important;min-height:44px}.oic2{position:absolute;left:9px;top:50%;margin-top:-15px;display:flex;align-items:center;justify-content:center;pointer-events:none;filter:drop-shadow(0 1px 0 rgba(0,0,0,.35))}.oic2>span{flex:none;display:block}';document.head.appendChild(s)})();
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){const r=_od.apply(this,arguments);try{if(mode!='grid'&&Array.isArray(opts)&&opts.length>=7&&innerWidth>=560){const bs=[...dbox.querySelectorAll('.rpg > .dopt')];if(bs.length>=7){const w=document.createElement('div');w.className='ocols';bs[0].before(w);bs.forEach(b=>w.appendChild(b));dbox.querySelector('.rpg').style.maxWidth='min(94vw,720px)'}}}catch(e){}return r}}
// ───────── 柔和的路燈、車燈 ─────────
const SOFT=(()=>{const mk=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'));return c};
 return{glow:mk(128,128,c=>{const r=c.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'rgba(255,232,180,.75)');r.addColorStop(.18,'rgba(255,214,150,.45)');r.addColorStop(.45,'rgba(255,196,120,.16)');r.addColorStop(.75,'rgba(255,186,110,.05)');r.addColorStop(1,'rgba(255,180,100,0)');c.fillStyle=r;c.fillRect(0,0,128,128)}),
  pool:mk(128,64,c=>{c.save();c.scale(1,.5);const r=c.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'rgba(255,220,160,.42)');r.addColorStop(.5,'rgba(255,205,140,.16)');r.addColorStop(1,'rgba(255,200,130,0)');c.fillStyle=r;c.fillRect(0,0,128,128);c.restore()}),
  beam:mk(160,80,c=>{const r=c.createRadialGradient(0,40,0,0,40,160);r.addColorStop(0,'rgba(255,248,215,.5)');r.addColorStop(.35,'rgba(255,245,210,.2)');r.addColorStop(1,'rgba(255,245,210,0)');c.fillStyle=r;c.beginPath();c.moveTo(0,34);c.lineTo(160,0);c.lineTo(160,80);c.lineTo(0,46);c.closePath();try{c.filter='blur(6px)'}catch(e){}c.fill();c.filter='none';c.fill()}),
  dot:mk(32,32,c=>{const r=c.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,'rgba(255,255,240,.95)');r.addColorStop(.35,'rgba(255,240,200,.4)');r.addColorStop(1,'rgba(255,230,180,0)');c.fillStyle=r;c.fillRect(0,0,32,32)})}})();
lights=function(){const n=nf(),L=Math.min(1,n+(wx()==2?.25*(1-n):0)),vx=CAM.x-60,vy=CAM.y-60,vw=W+120,vh=H+120,vis=(x,y,w,h)=>x+w>vx&&x<vx+vw&&y+h>vy&&y<vy+vh;
 g.save();g.translate(-CAM.x,-CAM.y);g.globalCompositeOperation='lighter';
 HEADS.forEach(h=>{if(!vis(h.x,h.y,8,14))return;const t=ls(h.ax);g.fillStyle=t=='r'?'rgba(255,60,50,.85)':t=='y'?'rgba(255,210,40,.85)':'rgba(60,230,120,.85)';const yy=h.y+(t=='r'?2.5:t=='y'?6.5:10.5);g.beginPath();g.arc(h.x+3,yy,2.4,0,7);g.fill();if(L>.05){g.globalAlpha=.35*L;g.drawImage(SOFT.glow,h.x+3-8,yy-8,16,16);g.globalAlpha=1}});
 TR.forEach(v=>{if(v.hold>0||v.k!='police'||!v.siren||!vis(v.x-20,v.y-20,v.w+40,v.h+40))return;g.globalAlpha=.45;g.drawImage(SOFT.glow,v.x+v.w/2-30,v.y+v.h-36,60,60);g.globalAlpha=1});
 if(L>.02){
  WIN.forEach(w=>{if(!vis(w[0],w[1],w[2],w[3]))return;const bb=BN[w[4]];const k=(w[0]*7+w[1]*13)&7;if(!w[6]&&k>5)return;if(w[6]&&bb&&bb.hr&&!bHour(bb))return;g.fillStyle=`rgba(${k<3?'255,214,140':k<5?'255,232,190':'170,205,255'},${.45*L})`;g.fillRect(w[0]+1,w[1]+1,w[2]-2,w[3]-2);g.globalAlpha=.22*L;g.drawImage(SOFT.glow,w[0]-14,w[1]-14,w[2]+28,w[3]+28);g.globalAlpha=1});
  SIGNS.forEach(q=>{if(!vis(q[0],q[1],q[2],q[3]))return;g.globalAlpha=.3*L;g.fillStyle=q[4];g.fillRect(q[0],q[1],q[2],q[3]);g.globalAlpha=.3*L;g.drawImage(SOFT.glow,q[0]-16,q[1]-10,q[2]+32,q[3]+20);g.globalAlpha=1});
  LAMPS.forEach(l=>{if(!vis(l[0]-60,l[1]-40,120,110))return;g.globalAlpha=.55*L;g.drawImage(SOFT.glow,l[0]-34,l[1]-32,68,68);g.globalAlpha=.9*L;g.drawImage(SOFT.dot,l[0]-6,l[1]-6,12,12);g.globalAlpha=.75*L;g.drawImage(SOFT.pool,l[0]-46,l[1]+20,92,40);g.globalAlpha=1});
  BULBS.forEach(l=>{if(!vis(l[0]-10,l[1]-10,20,20))return;g.globalAlpha=.55*L;g.drawImage(SOFT.glow,l[0]-9,l[1]-9,18,18);g.globalAlpha=1});
  TR.forEach(v=>{if(v.hold>0||!vis(v.x-70,v.y-70,v.w+140,v.h+140))return;const X=v.ax=='x',d=v.dir,fx=X?(d>0?v.x+v.w-2:v.x+2):v.x+v.w/2,fy=X?v.y+v.h-(v.k=='moto'||v.k=='rmoto'?8:7):(d>0?v.y+v.h-2:v.y+2),a=X?(d>0?0:Math.PI):(d>0?Math.PI/2:-Math.PI/2);
   g.save();g.translate(fx,fy);g.rotate(a);g.globalAlpha=.7*L;g.drawImage(SOFT.beam,-2,-14,60,28);g.globalAlpha=.8*L;g.drawImage(SOFT.dot,-5,-5,10,10);g.restore();g.globalAlpha=1})}
 g.restore()};
// ───────── 雲影：大片、淡、柔邊、慢慢飄 ─────────
const CLS2=(()=>{const c=document.createElement('canvas');c.width=360;c.height=200;const x=c.getContext('2d');
 [[110,100,90],[190,85,100],[260,110,80],[160,130,70],[230,70,60]].forEach(q=>{const r=x.createRadialGradient(q[0],q[1],0,q[0],q[1],q[2]);r.addColorStop(0,'rgba(30,40,60,.32)');r.addColorStop(.6,'rgba(30,40,60,.12)');r.addColorStop(1,'rgba(30,40,60,0)');x.fillStyle=r;x.fillRect(0,0,360,200)});
 const o=document.createElement('canvas');o.width=360;o.height=200;const y=o.getContext('2d');try{y.filter='blur(10px)'}catch(e){}y.drawImage(c,0,0);y.filter='none';return o})();
clouds=function(){const w=wx();if(w!=1&&w!=2)return;const a=w==2?.42:.24;for(let i=0;i<5;i++){const wx0=((i*571+NOW*(.0035+i*.0004))%(WW+700))-350,wy0=(i*317+80)%WH;const sx=wx0-CAM.x,sy=wy0-CAM.y,cw=360*(1+i%2*.3),ch=200*(1+i%2*.3);if(sx>-cw&&sx<W+10&&sy>-ch&&sy<H+10){g.globalAlpha=a;g.drawImage(CLS2,sx,sy,cw,ch);g.globalAlpha=1}}};
// ───────── 小遊戲：隱藏人物資訊、退出要確認 ─────────
setInterval(()=>{document.body.classList.toggle('mgon',typeof MG!='undefined'&&!!MG)},150);
function quitAsk(){if(!MG||MG._ask)return;const G0=MG,wd=G0.done;G0.done=true;G0._ask=1;window.TITLE=true;window.OVL=(window.OVL||0)+1;
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99996;background:rgba(10,6,2,.55);display:flex;align-items:center;justify-content:center';
 ov.innerHTML=`<div class="rpg" style="width:min(86vw,340px);text-align:center"><div class="rttl">要離開遊戲嗎？</div><div class="rdesc" style="margin:8px 0">現在離開，這一局就不算了。</div><div style="display:flex;gap:8px"><button data-k="no" class="dopt" style="text-align:center"><b>繼續玩</b></button><button data-k="yes" class="dopt" style="text-align:center"><b>確定離開</b></button></div></div>`;
 const end=y=>{OVK.delete(kd);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL;G0._ask=0;if(y){if(MG===G0){G0.done=wd;quitGame()}}else G0.done=wd};
 const kd=e=>{e.preventDefault();if(e.key=='Escape'||e.key=='c'||e.key=='C'||e.key=='n'||e.key=='N')end(false);else if(e.key=='Enter'||e.key=='y'||e.key=='Y')end(true)};
 ov.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b)end(b.dataset.k=='yes')});document.body.appendChild(ov);OVK.add(kd)}
{const _c=cancel;cancel=function(){if(typeof MG!='undefined'&&MG&&!MG.done&&dlg.hidden)return quitAsk();return _c.apply(this,arguments)}}
// ───────── 阿成五金行（礦石收購、工具、釣具） ─────────
I['五金行']='🔧';
def('五金行',{W:350,H:216,f:'#a8a090',g:'#9a9282',fl:'tile',w:'#3a5a7a',title:'🔧 阿成五金行',
 fur:[['toolbox',24,32,36,24],['toolbox',66,32,36,24],['gshelf',110,30,80,40],['gshelf',196,30,80,40],['barrel',290,38,18,28],['crate',300,90,26,22],['gshelf',24,96,70,40],['tire',120,100,22,30],['counter',230,160,100,22,'#3a5a7a'],['plant',16,170,0,0]],
 ppl:[pp('老闆 阿成',276,146,'#3a5a7a','#222','缺什麼工具跟我說。|聽說知本那邊的礦場，最近有人挖到寶石！',{ou:'a',dir:0}),pp('客人',150,160,'#8a6a4a','#222','我來買螺絲，順便看看釣竿。',{dir:0})],sp:[['main',230,184,100,12]]});
SP['五金行']=()=>[['💎 礦石收購','把挖到的礦石賣給阿成',()=>sellMenu('o',()=>mainMenu('五金行'))],
 ['⛏️ 精鋼十字鎬（💰2,000）',st.pick==2?'已經有了':'永久使用，挖礦的命中區比較大',()=>{st.money-=2000;st.pick=2;hud();toast('⛏️ 買了精鋼十字鎬！');mainMenu('五金行')},st.pick==2||st.money<2000],
 ['🎣 碳纖維釣竿（💰1,500）',st.rod==2?'已經有了':'永久使用，收線的綠框比較大',()=>{st.money-=1500;st.rod=2;hud();toast('🎣 買了碳纖維釣竿！');mainMenu('五金行')},st.rod==2||st.money<1500],
 ['🪱 魚餌 ×10（💰50）',`一個 5 元・身上有 ${st.bait||0} 個`,()=>{st.money-=50;st.bait=(st.bait||0)+10;hud();toast('🪱 買了 10 個魚餌');mainMenu('五金行')},st.money<50]];
// ───────── 朋友點魚委託 ─────────
const fqS=()=>st.fq||(st.fq={cur:null,done:0});
function fqNew(){const Q=fqS();if(Q.cur)return null;const ids=Object.keys(FR).filter(id=>{try{return FRS(id).met}catch(e){return false}});if(!ids.length)return null;
 const id=ids[Math.floor(Math.random()*ids.length)],f=wRand(FISH.filter(x=>x.r<3),x=>[50,32,18][x.r]);Q.cur={id,fish:f.n,r:f.r,w0:wkN(),dl:wkN()+3};SVDIRTY=1;return Q.cur}
const fqLine=q=>`🎣 ${FR[q.id].n}想吃「${q.fish}」（${RAR[q.r]}・${q.fish&&FISH.find(x=>x.n==q.fish).w=='sea'?'東海岸海釣':'知本溪'}）・期限到第 ${q.dl} 週末`;
{const _wr=wkReturn;wkReturn=function(){const r=_wr.apply(this,arguments);try{const Q=fqS();
  if(Q.cur&&wkN()>Q.cur.dl){const q=Q.cur;Q.cur=null;try{frAdd(q.id,-2)}catch(e){}whenFree(()=>openDlg('🎣 委託過期了',`${FR[q.id].n}傳 LINE：「${q.fish}的事沒關係啦，下次再說～」`,[['下次一定','',closeDlg]]))}
  else if(!Q.cur&&Math.random()<.45){const q=fqNew();if(q)whenFree(()=>openDlg('📱 LINE・'+FR[q.id].n,`「欸，最近好想吃<b>${q.fish}</b>！聽說你在釣魚，可以幫我釣一條嗎？我會好好謝你的🙏」<br><br><span style="font-size:12px;opacity:.8">${fqLine(q).slice(2)}<br>釣到後打開手機「🎣 點魚委託」，就能開車送過去。</span>`,[['包在我身上！','',closeDlg]]))}}catch(e){}return r}}
function fqMenu(){const Q=fqS(),q=Q.cur;if(!q)return openDlg('🎣 點魚委託','目前沒有朋友委託你釣魚。<br><span style="font-size:12px;opacity:.8">朋友偶爾會在週末傳 LINE 來點魚。已完成 '+Q.done+' 次。</span>',[['返回','',phoneHome]]);
 const has=(catchS().f[q.fish]||0)>0,F=FISH.find(x=>x.n==q.fish),rw=FPRICE[q.r]*2;
 openDlg('🎣 點魚委託',`${fqLine(q)}<br><div style="display:flex;justify-content:center;margin:6px 0">${pkSpr('33',F.i,90,!has)}</div>${has?'✅ 你的漁獲裡有這條魚！':'還沒釣到，去'+(F.w=='sea'?'知本溪搭接駁車到東海岸':'知本溪')+'碰碰運氣吧。'}<br>報酬：💰${rw.toLocaleString('en-US')}・好感 +6`,
  [['🚗 開車送過去（約 1 小時）',has?'把魚交給'+FR[q.id].n:'要先釣到這條魚',()=>{const C=catchS();C.f[q.fish]--;if(!C.f[q.fish])delete C.f[q.fish];Q.cur=null;Q.done++;st.money+=rw;advance(1);fxApply({j:10});try{frAdd(q.id,6,1)}catch(e){}hud();SVDIRTY=1;
    openDlg('🎣 委託完成！',`${FR[q.id].n}接過${q.fish}，笑得好開心：「太厲害了吧！今天晚上就來煮！」<br><br>💰 +${rw.toLocaleString('en-US')}　😊 +10　💞 好感 +6`,[['不客氣！','',closeDlg]])},!has],['返回','',phoneHome]])}
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]=='關閉');const q=fqS().cur;opts.splice(i<0?opts.length:i,0,['🎣 點魚委託',q?FR[q.id].n+'想吃'+q.fish:'目前沒有委託',fqMenu,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
{const _tv=todoView;todoView=function(){const od=openDlg;openDlg=function(t,d,opts,...r){const q=fqS().cur;if(q&&typeof d=='string')d=fqLine(q)+'<br>'+d;return od.call(this,t,d,opts,...r)};try{return _tv.apply(this,arguments)}finally{openDlg=od}}}
