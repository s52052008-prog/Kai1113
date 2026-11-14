/* ===== v4.7：存檔系統（本機 + 雲端鏡像 + 存檔碼）===== */
const SV_KEY='pixeltown.save.',SV_VER=1,SV_SLOTS=['s1','s2','s3'];
var SVDEF=null,SVARM=false,SVCL=null,SVDIRTY=1;
setTimeout(()=>{try{SVDEF=JSON.stringify(st)}catch(e){}},0);
(async()=>{try{if(typeof claude=='undefined')return;const db=await claude.use('db'),us=await claude.use('user');if(!db||!us)return;const id=await us.id();if(!id)return;SVCL=db.collection('data/users/'+id)}catch(e){}})();
function svSnap(){let pos={x:p.x,y:p.y},sc=null;if(scene&&rm&&rm.mtn){sc=scene}else if(scene&&outPos){const z=outPos.z;pos={x:z.x+z.w/2-6,y:z.b.bot+14}}
 return{v:SV_VER,t:Date.now(),sum:{n:st.name,j:(typeof jobName=='function'?jobName():st.job),y:T.year,d:T.day,m:st.money},st:JSON.parse(JSON.stringify(st)),T:{...T},Q:Q.map(q=>q.s),PL:PL.map(q=>({st:q.st,t:q.t,wt:q.wt})),pos,dir:p.dir,sc}}
function svRead(slot){try{const s=localStorage.getItem(SV_KEY+slot);return s?JSON.parse(s):null}catch(e){return null}}
function svWrite(slot,d){const s=JSON.stringify(d);let ok=false;try{localStorage.setItem(SV_KEY+slot,s);ok=true}catch(e){}
 if(SVCL&&s.length<240000){SVCL.doc(slot).set({data:s,t:d.t}).then(()=>{ok=true}).catch(()=>{})}else if(SVCL&&!ok){}
 return ok||!!SVCL}
function svDel(slot){try{localStorage.removeItem(SV_KEY+slot)}catch(e){}if(SVCL)SVCL.doc(slot).delete().catch(()=>{})}
async function svCloudMerge(){if(!SVCL)return;for(const s of ['auto',...SV_SLOTS]){try{const snap=await SVCL.doc(s).get();if(!snap.exists)continue;const o=snap.data();if(!o||!o.data)continue;const c=svRead(s);if(!c||(o.t||0)>(c.t||0)){try{localStorage.setItem(SV_KEY+s,o.data)}catch(e){}}}catch(e){}}}
function svSum(d){if(!d)return '（空）';const s=d.sum||{},dt=new Date(d.t);return `${s.j||''}　第${s.y}年第${s.d}天　💰${s.m}　<span style="opacity:.6">${dt.getMonth()+1}/${dt.getDate()} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}</span>`}
function svSave(slot,q){if(DM.on)return false;if(MG)return false;const ok=svWrite(slot,svSnap());if(!q)toast(ok?'💾 已存檔':'⚠️ 無法存檔（瀏覽器禁止儲存）；可改用「匯出存檔碼」備份');return ok}
function svAuto(){if(!SVARM||DM.on||MG||!SVDIRTY)return;if(svWrite('auto',svSnap()))SVDIRTY=0}
function svApplyRooms(){Object.keys(IN).forEach(n=>{const r=IN[n];if(r.fur0&&!(st.lay&&st.lay[n])){r.fur=r.fur0.slice();r.sp=r.sp0.map(s=>s.slice());r.fixed=null;if(r.built){r.sol=mkSol(r.fur);r.cv=renderRm(r,n)}}});
 Object.keys(st.lay||{}).forEach(n=>{const r=IN[n];if(!r)return;edInit(n);const sv=[DM.rm,DM.name,DM.lay];DM.rm=r;DM.name=n;DM.lay=st.lay[n];edApply();DM.rm=sv[0];DM.name=sv[1];DM.lay=sv[2]})}
function svLoad(d){if(!d||!d.st)return toast('⚠️ 存檔內容無法讀取');if(d.v>SV_VER)toast('⚠️ 這個存檔來自較新的版本，部分內容可能無法還原');
 if(DM.on)DMoff(1);if(scene){if(rm&&rm.mtn&&typeof mtnReset=='function')mtnReset();else exitB()}closeDlg();
 Object.keys(st).forEach(k=>{const ds=Object.getOwnPropertyDescriptor(st,k);if(ds&&ds.get)return;delete st[k]});
 const def=SVDEF?JSON.parse(SVDEF):{};for(const k in def){try{st[k]=def[k]}catch(e){}}
 for(const k in d.st){try{st[k]=d.st[k]}catch(e){}}
 Object.assign(T,d.T);Q.forEach((q,i)=>{q.s=d.Q&&d.Q[i]||0});PL.forEach((q,i)=>Object.assign(q,(d.PL&&d.PL[i])||{st:0,t:0,wt:0}));
 p.x=d.pos.x;p.y=d.pos.y;p.vx=p.vy=0;p.dir=d.dir||0;PET.on=0;PET.in=0;if(d.sc&&IN[d.sc]&&IN[d.sc].mtn&&typeof mtnRestore=='function')mtnRestore(d.sc,d.pos.x,d.pos.y);
 try{svApplyRooms()}catch(e){console.error(e)}
 try{syncPet&&syncPet()}catch(e){}
 tk='';hud();tm();qpanel();SVARM=true;SVDIRTY=0;toast('📂 已讀取存檔：'+svSum(d).replace(/<[^>]+>/g,''))}
function svExport(){const s=btoa(unescape(encodeURIComponent(JSON.stringify(svSnap()))));
 openDlg('📤 匯出存檔碼','把這串文字複製下來保存（記事本、雲端筆記都行），之後用「匯入存檔碼」就能還原。<br><textarea id="svTa" readonly style="width:100%;height:96px;font-size:10px;margin-top:6px;word-break:break-all">'+s+'</textarea>',[['📋 複製','',()=>{const t=document.getElementById('svTa');t.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}try{navigator.clipboard&&navigator.clipboard.writeText(s)}catch(e){}toast(ok?'已複製':'請手動選取複製')}],['返回','',cancel]],true)}
function svImport(){openDlg('📥 匯入存檔碼','貼上之前匯出的存檔碼。<b>會取代目前的遊戲進度</b>。<br><textarea id="svTa" style="width:100%;height:96px;font-size:10px;margin-top:6px;word-break:break-all"></textarea>',[['✔ 匯入並讀取','',()=>{const v=(document.getElementById('svTa').value||'').trim();try{const d=JSON.parse(decodeURIComponent(escape(atob(v))));if(!d||!d.st)throw 0;svLoad(d)}catch(e){toast('⚠️ 存檔碼無法辨識')}}],['返回','',cancel]],true)}
function svSlot(slot,name){const d=svRead(slot),o=[];
 if(slot!='auto')o.push(['💾 存到這個欄位',d?'會覆蓋原本的存檔':'',()=>{if(svSave(slot))svMenu()}]);
 o.push(['📂 讀取',d?'':'這個欄位是空的',()=>svLoad(svRead(slot)),!d]);
 if(slot!='auto')o.push(['🗑️ 刪除','',()=>{svDel(slot);svMenu()},!d]);
 o.push(['返回','',cancel]);openDlg(name,svSum(d),o,true)}
function svMenu(){const o=[];
 o.push(['🔁 自動存檔',svSum(svRead('auto')),()=>svSlot('auto','🔁 自動存檔'),!svRead('auto')]);
 SV_SLOTS.forEach((s,i)=>o.push([`💾 欄位 ${i+1}`,svSum(svRead(s)),()=>svSlot(s,'💾 欄位 '+(i+1))]));
 o.push(['📤 匯出存檔碼','備份到別的地方',svExport],['📥 匯入存檔碼','從備份還原',svImport],['返回','',cancel]);
 openDlg('💾 存檔／讀檔','遊戲每隔一段時間、每天結束、離開頁面時都會自動存檔。'+(SVCL?'<br><span style="font-size:12px;opacity:.7">☁️ 已同步到你的帳號（換裝置也能讀）。</span>':'<br><span style="font-size:12px;opacity:.7">存在這個瀏覽器裡；清除網站資料會消失，重要進度請匯出存檔碼。</span>'),o,true)}
async function svBoot(){await Promise.race([svCloudMerge(),new Promise(r=>setTimeout(r,2500))]);
 const all=['auto',...SV_SLOTS].map(s=>[s,svRead(s)]).filter(x=>x[1]);
 if(!all.length){SVARM=true;return}
 all.sort((a,b)=>b[1].t-a[1].t);const nw=all[0];
 openDlg('🏡 歡迎回來',`找到你的存檔。<br><span style="font-size:12px;opacity:.75">${svSum(nw[1])}</span>`,[['▶ 繼續遊戲','最近的存檔',()=>svLoad(nw[1])],['📂 選擇其他存檔','',()=>{SVARM=true;svMenu()}],['🆕 開始新遊戲','自動存檔之後會被新進度取代，手動欄位不受影響',()=>{SVARM=true;closeDlg();toast('新的一天，新的開始！')}]]);
 SVARM=false}
// v5.3：改由標題畫面啟動 svBoot（見 f23g_title.js）
setInterval(svAuto,20000);
addEventListener('visibilitychange',()=>{if(document.hidden)svAuto()});addEventListener('pagehide',svAuto);
{const _d=dayTick;dayTick=function(){_d();SVDIRTY=1;setTimeout(svAuto,50)};
 const _od=openDlg;openDlg=function(t,d,o,...r){if(t=='📋 選單'&&Array.isArray(o)&&!o.some(q=>/存檔／讀檔/.test(q[0]))){o=o.slice();const i=o.findIndex(q=>/操作說明/.test(q[0]));o.splice(i<0?o.length:i,0,['💾 存檔／讀檔','自動存檔、3 個欄位、存檔碼',()=>svMenu()])}SVDIRTY=1;return _od(t,d,o,...r)}}
