/* v9.6 道具圖、碳佐麻里新外觀、體能測驗三項滿分、事件照片 */
FAMIMG.fitness='ev/fitness.webp';FAMIMG.guanyin='ev/guanyin.webp';
// 道具圖（冠宏畫的道具表）
capArt=sz=>pkSpr('43',1,sz);mushArt=sz=>pkSpr('43',0,sz);
const ITPK={capsule:1,mush:0,tcoin:5,bcoin:5,mtonic:2};
{const _ob=openBag;openBag=function(){const r=_ob.apply(this,arguments);try{dbox.querySelectorAll('button').forEach(b=>{const t=b.textContent,ic=b.querySelector('.ic');if(!ic)return;for(const k in ITPK)if(IT[k]&&t.includes(IT[k].n)){ic.innerHTML=pkSpr('43',ITPK[k],30);break}})}catch(e){}return r}}
// 事件照片（全螢幕，收進相簿）
function photoEv(img,title,cb){st.album=st.album||[];if(!st.album.some(q=>q.img==img))st.album.push({w:wkN(),t:title,img});SVDIRTY=1;
 window.TITLE=true;window.OVL=(window.OVL||0)+1;const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99997;background:rgba(20,12,6,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer';
 ov.innerHTML=`<img src="${FAMIMG[img]}" alt="${title}" style="max-width:94vw;max-height:86vh;object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,.6);animation:dcPop .5s ease-out"><div style="color:#fff6dc;font-size:13px;opacity:.8">📷 已收進回憶相簿・點一下繼續</div>`;
 document.body.appendChild(ov);const t0=performance.now();const end=e=>{if(performance.now()-t0<700)return;if(e&&e.preventDefault)e.preventDefault();OVK.delete(end);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL;if(cb)setTimeout(cb,60)};OVK.add(end);ov.addEventListener('pointerdown',end)}
// 陸戰隊體能測驗：三項都要 100 分
fitTest=function(){const c=cal(),mx=staMax(),gs=(st.gym&&st.gym.streak)||0,pw=st.pow||0,hp=st.hp||0,rn=()=>Math.random()*8-4;
 const cl=v=>Math.max(0,Math.min(100,Math.round(v)));
 const sPU=cl(28+pw*.62+gs*3+(mx-100)*.08+rn()),sSU=cl(34+pw*.4+gs*4+(mx-100)*.12+rn()),sRUN=cl(26+gs*5+(mx-100)*.26+hp*.12+pw*.15+rn());
 const pu=Math.round(2+sPU*.2),su=Math.round(25+sSU*.55),run=Math.round(1150-sRUN*4.3);
 const row=(ic,n,v,sc)=>`<div style="display:flex;align-items:center;gap:8px;margin:3px 0"><span style="width:110px">${ic} ${n}</span><b style="width:70px">${v}</b><div style="flex:1;height:8px;background:#4a2e18;border-radius:4px;overflow:hidden"><i style="display:block;height:100%;width:${sc}%;background:${sc>=100?'#4ac84a':'#e8b030'}"></i></div><b style="width:52px;text-align:right;color:${sc>=100?'#2a8a2a':'#8a4a12'}">${sc} 分</b></div>`;
 const all=sPU>=100&&sSU>=100&&sRUN>=100,C=capS();
 let t=`${c.name}季末，陸戰隊照例舉辦<b>全營體能測驗</b>。<br><br>`+row('💪','引體向上',pu+' 下',sPU)+row('🔥','仰臥起坐',su+' 下',sSU)+row('🏃','3000 公尺',`${Math.floor(run/60)}:${String(run%60).padStart(2,'0')}`,sRUN);
 if(all){fxApply({r:12,j:20});SVDIRTY=1;
  return photoEv('fitness','體能測驗三項滿分',()=>openDlg('🎖️ 陸戰隊體能測驗',t+'<br>🏆 <b>三項全部滿分！</b>營長親自走過來和你握手：「幹得好！」',[[C.test?'報告長官，謝謝長官！':'報告長官，謝謝長官！','',()=>{closeDlg();if(!C.test)capGive('test','營長的獎品','頒獎完，營長把你叫到一旁，塞給你一個小紙盒：「三項滿分的才有。這是我私藏的<b>瑪卡基酸膠囊咖啡</b>，別跟別人說！」')}]]))}
 t+=`<br><span style="font-size:12px;opacity:.85">${C.test?'繼續保持！':'三項都拿到 100 分，聽說營長會私下送一份神秘獎品。<br>引體向上靠⚔️力量，仰臥起坐靠力量和健身，3000 公尺靠健身連續週數和體力上限。'}</span>`;
 openDlg('🎖️ 陸戰隊體能測驗',t,[['繼續努力','',closeDlg]])};
// 觀音山攻頂：第一次登頂的紀念照
{const R=IN['觀音山'];if(R&&R.spf){const v0=R.spf.view;R.spf.view=()=>{if(!st.gyPh){st.gyPh=1;fxApply({s:20,j:20});photoEv('guanyin','攻頂觀音山',v0)}else v0()}}}
// 碳佐麻里：冠宏畫的新外觀
(function(){const b=B.find(q=>q.n=='碳佐麻里');if(!b||!uaOK('pk42_2'))return;const im=UAI.pk42_2,w=b.w*1.12,h=w*(im.naturalHeight||im.height)/(im.naturalWidth||im.width);b.ua={k:'pk42_2',w,h,oy:4};b.st0=b.st0||b.st;b.st='ua'})();
