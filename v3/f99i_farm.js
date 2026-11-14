/* v13.13 休閒農場：拿掉自己種田。菜圃一直有農夫伯種的菜（素材圖），熟了他自己收；主角可以偷摘；跟農夫伯好感高可以便宜買菜、聊天時送菜 */
const PLK=['bok','yam','basil','cab','tom','bok','basil','yam','cab','bok','tom','yam'];
const PLRIPE={bok:5,yam:6,basil:7,cab:10,tom:4},FCYC=30;
const plCyc=(q,i)=>{const t=gt()+((i*7)%FCYC);return{id:Math.floor(t/FCYC),ph:(t%FCYC)/FCYC}};
function plStage(q,i){const c=plCyc(q,i);if(c.ph<.06)return{s:0,c};if(c.ph<.18)return{s:1,c};if(c.ph<.36)return{s:2,c};if(c.ph<.6)return{s:3,c};return{s:q.stolen==c.id?3:9,c}}
const plName=i=>CROPS[PLK[i%PLK.length]].n;
drawPlot=function(c,q){const i=PL.indexOf(q),S=plStage(q,i),k=PLK[i%PLK.length],idx=S.s==9?PLRIPE[k]:S.s;try{const key='pk47_'+idx;if(uaOK(key)){const im=UAI[key],w=q.w+4,h=w*im.naturalHeight/im.naturalWidth;c.drawImage(im,q.x+q.w/2-w/2,q.y+q.h+3-h,w,h)}}catch(e){}
 if(S.s==9){c.fillStyle='#ffd84a';const t=NOW/300+i;c.fillRect(q.x+4+Math.abs(Math.sin(t))*q.w*.8,q.y+2+Math.abs(Math.cos(t*1.3))*6,1.5,1.5)}
 if(!scene&&Math.hypot(q.x+q.w/2-(p.x+6),q.y+q.h/2-(p.y+4))<26)txt(c,'▼',q.x+q.w/2,q.y-4,'#ffd84a','bold 8px sans-serif')};
const farmerNP=()=>NP.find(n=>n.n=='農夫伯');
farmMenu=function(q){const i=PL.indexOf(q),S=plStage(q,i),k=PLK[i%PLK.length],nm=CROPS[k].n,f=farmerNP();
 if(S.s!=9){const left=Math.ceil((.6-S.c.ph+(S.c.ph>=.6?1:0))*FCYC);openDlg('🌾 農夫伯的菜圃・'+nm,S.s==0?'剛收成完，土翻好了，過幾天又會種上新的。':q.stolen==S.c.id?'這一塊……好像被誰偷摘過了 🤫 剩下的還在長。':`${CROPS[k].ic} 還在長，大概再 ${left} 個小時就會熟。<br><span style="opacity:.7;font-size:12px">農夫伯每天都會來巡，熟了就收。</span>`,[['離開','',closeDlg]]);return}
 const near=f?Math.hypot(f.x-p.x,f.y-p.y):999;
 openDlg('🌾 農夫伯的菜圃・'+nm,`${CROPS[k].ic} ${nm}長得正好，綠油油的……<br>${near<110?'<span style="color:#c0392b">⚠ 農夫伯就在旁邊！</span>':'<span style="opacity:.75">四下張望……農夫伯好像不在附近。</span>'}`,
  [['🤫 偷摘一把',near<110?'很容易被抓到喔':'應該不會被發現吧……',()=>{closeDlg();plSteal(q,i,k,near)}],['還是算了','當個好人',closeDlg]])};
function plSteal(q,i,k,near){const f=farmerNP(),cg=near<110?.7:.15,nm=CROPS[k].n;advance(.2);
 if(Math.random()<cg&&f){f.rel=(f.rel||0);openDlg('🌾 農夫伯'+hearts(f),`「欸！少年仔！那是我種的欸！」<br>農夫伯拿著鋤頭站在你後面，表情很複雜。`,
  [['😅 對不起！我付錢（💰200）','誠實面對',()=>{st.money=Math.max(0,st.money-200);f.rel=Math.max(0,f.rel-1);st.inv['veg_'+k]=(st.inv['veg_'+k]||0)+2;q.stolen=plCyc(q,i).id;hud();closeDlg();toast(`付了 200 元，農夫伯還是把 2 份${nm}塞給你：「想吃跟我講就好啦！」`)}],
   ['🏃 拔腿就跑','好感會下降',()=>{f.rel=Math.max(0,f.rel-2);closeDlg();toast('🏃 你一路狂奔……背後傳來：「下次別讓我抓到！」')}]]);return}
 st.inv['veg_'+k]=(st.inv['veg_'+k]||0)+2;q.stolen=plCyc(q,i).id;st.cnt.harvest=(st.cnt.harvest||0)+1;hud();toast(`🤫 偷摘了 2 份${nm}，快溜！（蔬菜可以拿回家煮）`)}
// 熟了之後農夫伯自己收：在附近時會看到
{const prev={};setInterval(()=>{try{if(scene||typeof PL=='undefined')return;PL.forEach((q,i)=>{const s=plStage(q,i).s;if(prev[i]==9&&s==0&&Math.hypot(q.x-p.x,q.y-p.y)<260){const f=farmerNP();if(f&&!f.vh){f.x=q.x+q.w/2-6;f.y=q.y+q.h+4}toast('🌾 農夫伯把'+plName(i)+'收成了，扛著一大籃走過去。')}prev[i]=s})}catch(e){}},2500)}
// 農夫伯：買便宜的菜、好感高聊天會送菜；拿掉農業職涯
farmerMenu=function(n,line){const rel=n.rel||0,pr=rel>=8?20:rel>=4?35:50,o=[];let gift='';
 if(rel>=5&&st.fgift!==wkN()&&Math.random()<.55){st.fgift=wkN();const k=PLK[(Math.random()*PLK.length)|0];st.inv['veg_'+k]=(st.inv['veg_'+k]||0)+3;gift=`<br><br>🥬 「來，這${CROPS[k].n}今天早上剛採的，拿回去給你家那個煮。」<br><b>農夫伯送你 3 份${CROPS[k].n}！</b>`;hud()}
 o.push([`🥬 跟農夫伯買菜（每份 💰${pr}）`,rel>=8?'老朋友價':rel>=4?'熟人價':'一般價（好感越高越便宜）',()=>{const ks=[...new Set(PLK)];openDlg('🥬 跟農夫伯買菜',`今天有這些，看你要什麼。（每份 💰${pr}）`,ks.map(k=>[`${CROPS[k].ic} ${CROPS[k].n} ×3`,`💰${pr*3}`,()=>{if(st.money<pr*3)return toast('錢不夠');st.money-=pr*3;st.inv['veg_'+k]=(st.inv['veg_'+k]||0)+3;n.rel=Math.min(20,rel+(Math.random()<.3?1:0));hud();toast(`買了 3 份${CROPS[k].n}`)},st.money<pr*3]).concat([['返回','',()=>farmerMenu(n,line)]]))}]);
 errandOpts(n,o);o.push(['離開','',closeDlg]);openDlg('🌾 '+n.n+hearts(n),line+gift,o)};
