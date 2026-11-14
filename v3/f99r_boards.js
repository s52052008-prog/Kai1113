/* v13.21 自己做的看板：地圖上會冒出小信封 💌（看過會變淡）、可以放照片（遊戲裡的回憶照片或自己上傳） */
spMake=function(q){const s={x:q[0],y:q[1],w:q[2],h:q[3],n:q[4]||'📜 看板',txt:q[5]||'',img:q[6]||'',env:q[7]!==0,_add:1};s.fn=()=>boardShow(s);return s};
const bdKey=s=>s.n+'@'+Math.round(s.x)+','+Math.round(s.y);
function bdImgSrc(img){if(!img)return '';if(img.startsWith('mem:')){const q=MEMPH[+img.slice(4)];return q?q.src:''}return img}
function boardShow(s){st.bdRead=st.bdRead||{};st.bdRead[bdKey(s)]=1;const src=bdImgSrc(s.img),pix=s.img&&s.img.startsWith('mem:');
 const ph=src?`<div style="text-align:center;margin:4px 0 10px"><img src="${src}" style="max-width:100%;max-height:46vh;border:6px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.35);transform:rotate(-1.2deg);${pix?'image-rendering:pixelated;width:min(320px,100%)':''}"></div>`:'';
 openDlg(s.n,ph+`<div style="white-space:pre-wrap;line-height:1.7">${String(s.txt||'').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</div>`,[['💗 好','',closeDlg]])}
// ── 地圖上的小信封 ──
{const _dp=drawPlayer;drawPlayer=function(c){_dp(c);try{if(scene||(typeof ED!='undefined'&&ED.on))return;const now=performance.now();st.bdRead=st.bdRead||{};
 SPOTS.forEach(s=>{if(!s._add||s.env===false)return;const cx=s.x+s.w/2,read=!!st.bdRead[bdKey(s)],bob=Math.sin(now/380+s.x)*2.2,y=s.y-14+bob;
  if(cx<CAM.x-20||cx>CAM.x+W+20||y<CAM.y-30||y>CAM.y+H+20)return;c.save();c.globalAlpha=read?.55:1;
  if(!read){const gl=c.createRadialGradient(cx,y+3,1,cx,y+3,11);gl.addColorStop(0,'rgba(255,170,200,.55)');gl.addColorStop(1,'rgba(255,170,200,0)');c.fillStyle=gl;c.fillRect(cx-12,y-8,24,22)}
  c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(cx,s.y+s.h/2+2,5,1.6,0,0,7);c.fill();
  c.fillStyle='#3a2014';c.fillRect(cx-6,y-1,12,9);c.fillStyle=read?'#f2ece0':'#fff4f7';c.fillRect(cx-5,y,10,7);
  c.fillStyle=read?'#d8cfc0':'#ffc6d6';for(let i=0;i<5;i++){c.fillRect(cx-5+i,y+i*.8,1,1);c.fillRect(cx+4-i,y+i*.8,1,1)}
  c.fillStyle='#e8486a';c.fillRect(cx-1,y+3,2,2);c.fillRect(cx-2,y+2,1,1);c.fillRect(cx+1,y+2,1,1);
  if(!read&&Math.sin(now/200+s.y)>.6){c.fillStyle='#fff';c.fillRect(cx+6,y-3,1,1);c.fillRect(cx+5,y-2,3,1)}
  c.restore()})}catch(e){}}}
// ── 編輯視窗：標題、內容、照片、要不要顯示信封 ──
function boardEdit(s,rect){const isNew=!s;const cur=s?{n:s.n,txt:s.txt,img:s.img||'',env:s.env!==false}:{n:'',txt:'',img:'',env:true};
 const prev=()=>{const src=bdImgSrc(cur.img);return src?`<img src="${src}" style="max-height:110px;max-width:100%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);${cur.img.startsWith('mem:')?'image-rendering:pixelated':''}">`:'<span style="opacity:.6">（沒有照片）</span>'};
 const inp='width:100%;font:inherit;padding:6px;border:2px solid #8a5a2e;border-radius:6px;background:#fffaf0';
 const draw=()=>{openDlg(isNew?'📜 新增看板／留言':'✏️ 編輯看板',`走到這裡按空白鍵，就會跳出來。<br>
  <input id="bdT" placeholder="標題（例如：📜 給家宜的小紙條）" style="${inp};margin-top:8px">
  <textarea id="bdX" rows="4" placeholder="想說的話……" style="${inp};margin-top:6px"></textarea>
  <div style="margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap"><div id="bdP">${prev()}</div></div>
  <label style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:13px"><input id="bdE" type="checkbox" ${cur.env?'checked':''}> 在地圖上顯示 💌 小信封（不勾就變成隱藏的驚喜）</label>`,
  [['🖼️ 從回憶照片挑一張','遊戲裡那 15 張像素照片',()=>{keep();pick()}],['📤 上傳自己的照片','手機或電腦裡的照片',()=>{keep();up()}],...(cur.img?[['🗑 拿掉照片','',()=>{keep();cur.img='';draw()}]]:[]),
   [isNew?'✅ 新增':'✅ 儲存','',()=>{keep();done()}],['取消','',()=>{closeDlg();gzRefresh()}]]);
  setTimeout(()=>{const t=document.getElementById('bdT'),x=document.getElementById('bdX');if(!t)return;t.value=cur.n;x.value=cur.txt;[t,x].forEach(el=>el.addEventListener('keydown',e=>e.stopPropagation()));if(isNew&&!cur.n)t.focus()},40)};
 const keep=()=>{const t=document.getElementById('bdT');if(!t)return;cur.n=t.value;cur.txt=document.getElementById('bdX').value;cur.env=document.getElementById('bdE').checked};
 const pick=()=>{openDlg('🖼️ 挑一張回憶照片','',MEMPH.map((q,i)=>[q.t,'',()=>{cur.img='mem:'+i;draw()}]).concat([['返回','',draw]]))};
 const up=()=>{const f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=()=>{const file=f.files&&f.files[0];if(!file)return draw();const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const M=480,k=Math.min(1,M/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);cur.img=c.toDataURL('image/jpeg',.78);draw()};im.onerror=()=>{toast('這張照片讀不出來，換一張試試');draw()};im.src=rd.result};rd.readAsDataURL(file)};f.click();setTimeout(draw,300)};
 const done=()=>{const n=(cur.n||'').trim()||'📜 看板';if(isNew){const r=rect;const ns=spMake([r[0],r[1],r[2],r[3],n,cur.txt,cur.img,cur.env?1:0]);SPOTS.push(ns);SPE.sel={o:ns,z:0};gzPush(()=>{arrDel(SPOTS,ns);SPE.sel=null});toast('📍 新增了看板「'+n+'」')}
  else{const old={n:s.n,txt:s.txt,img:s.img,env:s.env};s.n=n;s.txt=cur.txt;s.img=cur.img;s.env=cur.env;gzPush(()=>Object.assign(s,old));toast('✏️ 看板改好了')}ED.dirty=1;closeDlg();gzRefresh()};
 draw()}
spNew=function(x,y,w,h){boardEdit(null,[x,y,w,h])};
// 取代原本的「改文字」
gzUI.addEventListener('click',ev=>{const b=ev.target.closest('[data-sp="edit"]');if(!b)return;ev.stopImmediatePropagation();if(SPE.sel&&SPE.sel.o._add)boardEdit(SPE.sel.o)},true);
// 編輯模式裡，看板也畫上小信封與照片小圖示
gzSelUI=(f=>function(){f.apply(this,arguments);try{if(ED.tool=='spot'&&SPE.sel&&SPE.sel.o._add){const e=$e('gzSel').querySelector('[data-sp="edit"]');if(e)e.textContent='✏️ 編輯（文字、照片）'}}catch(er){}})(gzSelUI);
