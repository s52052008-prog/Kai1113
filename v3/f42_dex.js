/* v9.2 相機與圖鑑：景點打卡、動物拍照（美食、魚類、礦石等素材到了再開） */
const dexS=()=>st.dex||(st.dex={lm:{},an:{}});
const zOf=n=>{const z=Z.find(z=>z.n==n);return z?[z.x+z.w/2,z.y]:null};
const eoNear=k=>EO.filter(e=>e.k==k&&!e.rm).map(e=>{const q=gzPose(e);return[q.cx,q.by]});
const ctr=A=>[A.x+A.w/2,A.y+A.h/2];
const LMS=[['heart','💗 愛心雕像',()=>eoNear('lo_heart')],['fount','⛲ 噴水池',()=>eoNear('lo_fountain').concat(eoNear('a_fountain'))],['garden','🌷 花園廣場',()=>[ctr(GARDEN)]],['park','🌳 公園',()=>[ctr(PARK)]],
 ['market','🏮 夜市',()=>[ctr(MARKET)]],['field','🏃 田徑場',()=>[ctr(FIELD)]],['farm','🐑 休閒農場',()=>[ctr(FARM)]],['church','⛪ 城光復興堂',()=>[zOf('城光復興堂')]],['temple','🏯 廟',()=>[zOf('廟')]],
 ['station','🚉 火車站',()=>[zOf('火車站')]],['sport','🏀 高雄運動中心',()=>[zOf('高雄運動中心')]],['school','🏫 新興高中',()=>[zOf('新興高中')]],['tan','🔥 碳佐麻里',()=>[zOf('碳佐麻里')]],['home','🏠 我的家',()=>[zOf('家')]],['carre','🛒 家樂福',()=>[zOf('家樂福')]]];
const inView=(x,y)=>x>CAM.x-10&&x<CAM.x+W+10&&y>CAM.y-10&&y<CAM.y+H+10;
function animalsAll(){const S=new Map();NP.forEach(n=>{if(n.t&&!n.vh&&n.n)S.set(n.n,n.t)});try{(IN['寵物店'].ppl||[]).forEach(n=>{if(n.t&&n.n)S.set(n.n,n.t)})}catch(e){}return[...S.keys()]}
function camSee(){const D=dexS(),lm=[],an=[];
 if(!scene){LMS.forEach(q=>{let pts=[];try{pts=q[2]().filter(Boolean)}catch(e){}if(pts.some(p2=>inView(p2[0],p2[1])))lm.push(q)});NP.forEach(n=>{if(n.t&&!n.hid&&!n.vh&&n.n&&inView(n.x,n.y))an.push(n.n)})}
 else(rm.ppl||[]).forEach(n=>{if(n.t&&n.n)an.push(n.n)});
 if(st.comp&&PET.on&&PET.name)an.push(PET.name);return{lm,an:[...new Set(an)]}}
// 相片存在這台裝置（不放進存檔，避免存檔太大）
const PHK='ptown-photos-v1';
function phLoad(){try{return JSON.parse(localStorage.getItem(PHK)||'[]')}catch(e){return[]}}
function phSave(L){try{localStorage.setItem(PHK,JSON.stringify(L.slice(0,24)))}catch(e){}}
function camera(){closeDlg();window.TITLE=true;window.OVL=(window.OVL||0)+1;Object.keys(keys).forEach(k=>keys[k]=0);
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;pointer-events:auto;cursor:crosshair';
 const r=cv.getBoundingClientRect();const fr=document.createElement('div');fr.style.cssText=`position:fixed;left:${r.left+r.width*.08}px;top:${r.top+r.height*.1}px;width:${r.width*.84}px;height:${r.height*.8}px;border:3px solid rgba(255,255,255,.9);box-shadow:0 0 0 9999px rgba(0,0,0,.35);border-radius:6px`;
 const see=camSee();const tip=document.createElement('div');tip.style.cssText='position:fixed;left:50%;bottom:8px;transform:translateX(-50%);background:rgba(20,12,6,.85);color:#fff6dc;padding:6px 12px;border-radius:8px;font-size:13px;text-align:center';
 tip.innerHTML=`📷 ${see.lm.length||see.an.length?'畫面裡有：'+see.lm.map(q=>q[1]).concat(see.an.map(a=>'🐾 '+a)).join('、'):'畫面裡沒有可以登錄圖鑑的東西，也可以隨手拍'}<br>空白鍵或點一下拍照・Esc 取消`;
 ov.appendChild(fr);ov.appendChild(tip);document.body.appendChild(ov);
 const end=()=>{OVK.delete(kd);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL};
 const kd=e=>{if(e.key=='Escape'||e.key=='c'||e.key=='C'){e.preventDefault();e.stopImmediatePropagation();end()}else if(e.key==' '||e.key=='Enter'){e.preventDefault();e.stopImmediatePropagation();shoot()}};
 const shoot=()=>{end();let url='';try{const c=document.createElement('canvas');c.width=384;c.height=240;const x=c.getContext('2d');x.drawImage(cv,cv.width*.08,cv.height*.1,cv.width*.84,cv.height*.8,0,0,384,240);url=c.toDataURL('image/jpeg',.72)}catch(e){}
  const D=dexS(),now=see,news=[];now.lm.forEach(q=>{if(!D.lm[q[0]]){D.lm[q[0]]=wkN();news.push(q[1])}});now.an.forEach(a=>{if(!D.an[a]){D.an[a]=wkN();news.push('🐾 '+a)}});
  const title=now.lm[0]?now.lm[0][1].replace(/^\S+\s/,''):now.an[0]?now.an[0]:'隨手拍';const id='c'+Date.now();
  if(url){const L=phLoad();L.unshift({id,t:title,w:wkN(),url});phSave(L)}
  feedPost('📷 '+title,news.length?'新登錄圖鑑：'+news.join('、'):'',null,id);fxApply({j:news.length?6:2});hud();SVDIRTY=1;
  const flash=document.createElement('div');flash.style.cssText='position:fixed;inset:0;background:#fff;z-index:99999;transition:opacity .5s';document.body.appendChild(flash);requestAnimationFrame(()=>{flash.style.opacity='0'});setTimeout(()=>flash.remove(),600);
  setTimeout(()=>polaroid(url,title,news),350);dexReward()};
 OVK.add(kd);ov.addEventListener('pointerdown',e=>{e.preventDefault();shoot()})}
function polaroid(url,title,news){window.TITLE=true;window.OVL=(window.OVL||0)+1;const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(20,12,6,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer';
 const c=cal();ov.innerHTML=`<div style="background:#fbf7ee;padding:10px 10px 30px;transform:rotate(-1.5deg);box-shadow:0 10px 40px rgba(0,0,0,.6);width:min(88vw,420px)">${url?`<img src="${url}" alt="" style="width:100%;display:block">`:'<div style="height:200px;display:flex;align-items:center;justify-content:center;color:#888">（照片）</div>'}<div style="text-align:center;font-weight:bold;color:#3a2a1a;margin-top:8px;font-size:15px">${title}</div><div style="text-align:center;color:#8a6a4a;font-size:12px">${c.ic} ${c.name}・第 ${c.w} 週末</div></div>`+
  `<div style="color:#fff6dc;text-align:center;font-size:14px;text-shadow:0 2px 0 #000">${news.length?'📖 新登錄圖鑑：<b>'+news.join('、')+'</b><br>':''}已發到脆G<br><span style="opacity:.7;font-size:12px">點一下繼續</span></div>`;
 document.body.appendChild(ov);const t0=performance.now();const end=()=>{if(performance.now()-t0<600)return;OVK.delete(end);ov.remove();window.OVL=Math.max(0,(window.OVL||1)-1);window.TITLE=!!window.OVL};OVK.add(end);ov.addEventListener('pointerdown',end)}
// 脆G：顯示自己拍的照片
{const _fp=feedPost;feedPost=function(t,txt,img,pid){_fp(t,txt,img);if(pid&&st.feed&&st.feed[0])st.feed[0].pid=pid}}
{const _fv=feedView;feedView=function(){const r=_fv.apply(this,arguments);try{const L=phLoad();const ov=[...document.body.children].reverse().find(e=>e.style&&e.style.zIndex=='99998');if(!ov)return r;
 const F=(st.feed||[]);const cards=ov.querySelectorAll(':scope > div > div');let i=0;cards.forEach((cd,k)=>{if(k==0)return;const p2=F[k-1];if(p2&&p2.pid){const ph=L.find(q=>q.id==p2.pid);if(ph){const im=document.createElement('img');im.src=ph.url;im.alt='';im.style.cssText='width:100%;border-radius:8px;display:block';const hd=cd.firstElementChild;hd.after(im)}}})}catch(e){}return r}}
// 圖鑑
const DEXSOON=[['🍜 美食',30,'等冠宏的料理圖鑑'],['🐟 魚類',20,'等河邊和魚類圖鑑'],['⛏️ 礦石',15,'等溫泉東側礦場和礦石圖鑑']];
function dexMenu(){const D=dexS(),A=animalsAll(),nl=Object.keys(D.lm).length,na=Object.keys(D.an).length;
 openDlg('📖 圖鑑','走到景點、遇到動物時，打開手機「📷 相機」拍照就會登錄。',[[`📍 景點打卡　${nl}/${LMS.length}`,nl>=LMS.length?'🏆 全部完成！':'',()=>dexList('lm')],[`🐾 動物　${na}/${A.length}`,na>=A.length?'🏆 全部完成！':'',()=>dexList('an')]]
  .concat(DEXSOON.map(q=>[`${q[0]}　0/${q[1]}`,'🔒 '+q[2],()=>{},1])).concat([['返回','',phoneHome]]))}
function dexList(k){const D=dexS();const L=k=='lm'?LMS.map(q=>[q[1],D.lm[q[0]]]):animalsAll().map(a=>['🐾 '+a,D.an[a]]);
 openDlg(k=='lm'?'📍 景點打卡':'🐾 動物圖鑑',L.map(q=>q[1]?`✅ ${q[0]}　<span style="opacity:.6;font-size:12px">第 ${q[1]} 週末</span>`:'⬛ ？？？').join('<br>'),[['返回','',dexMenu]])}
function dexReward(){const D=dexS();D.rw=D.rw||{};
 if(!D.rw.lm&&Object.keys(D.lm).length>=LMS.length){D.rw.lm=1;st.money+=5000;fxApply({r:10,j:15});setTimeout(()=>openDlg('🏆 景點打卡全制霸！','小鎮每個角落都留下了你的足跡！<br>里長特地頒了一張「小鎮觀光大使」獎狀。<br><br>💰 +5,000　⭐ 名聲 +10',[['好耶！','',closeDlg]]),1500)}
 const A=animalsAll();if(!D.rw.an&&A.length&&A.every(a=>D.an[a])){D.rw.an=1;fxApply({j:15});st.money+=3000;setTimeout(()=>openDlg('🏆 動物圖鑑完成！','你拍遍了小鎮所有的動物朋友！<br><br>💰 +3,000　😊 +15',[['好耶！','',closeDlg]]),1500)}}
// 手機加上相機、圖鑑
{const _ph=phoneHome;phoneHome=function(){const od=openDlg;openDlg=function(t,d,opts,...r){if(t=='📱 手機'&&Array.isArray(opts)){const i=opts.findIndex(o=>o[0]=='關閉');opts.splice(i,0,['📷 相機','拍照打卡、登錄圖鑑',camera,0,1],['📖 圖鑑','收集進度',dexMenu,0,1])}return od.call(this,t,d,opts,...r)};try{return _ph.apply(this,arguments)}finally{openDlg=od}}}
phoneMenu=phoneHome;
