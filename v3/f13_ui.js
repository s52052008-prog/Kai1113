/* ===== v3.2：RPG 風格對話框／選單／背包、人物立繪 ===== */
const PORT={};
function portrait(kind,obj){const key=kind+'|'+(obj.n||'')+(obj.t||'')+(obj.c||'')+(kind=='me'?JSON.stringify(ALLEN):'');if(PORT[key])return PORT[key];
 const o=document.createElement('canvas');o.width=o.height=168;const c=o.getContext('2d');
 const bg=c.createLinearGradient(0,0,0,168);const h=T.hour;const night=h>=19||h<5;
 if(obj.t){bg.addColorStop(0,'#bfe8c8');bg.addColorStop(1,'#8cc89a')}else if(kind=='me'){bg.addColorStop(0,'#bfe0f4');bg.addColorStop(1,'#8cc0e0')}else{bg.addColorStop(0,'#f6dcae');bg.addColorStop(1,'#e0a86e')}
 c.fillStyle=bg;c.fillRect(0,0,168,168);
 c.fillStyle='rgba(255,255,255,.16)';for(let i=0;i<6;i++){c.beginPath();c.arc(20+i*30,30+((i*37)%90),16+((i*13)%12),0,7);c.fill()}
 const g2=c.createRadialGradient(84,70,10,84,70,120);g2.addColorStop(0,'rgba(255,255,255,.28)');g2.addColorStop(1,'rgba(0,0,0,.22)');c.fillStyle=g2;c.fillRect(0,0,168,168);
 if(obj.t){if(!(typeof animalPortrait=='function'&&animalPortrait(c,obj))){const S=11;c.save();c.translate(84,104);c.scale(S,S);drawA(c,{x:-6,y:-4,w:12,h:8,t:obj.t,c:obj.c,pat:obj.pat,dir:3,mv:false,fr:0});c.restore()}}
 else{const lk=kind=='me'?ALLEN:(obj.lk||lookFor(obj)),S=7.4,sc=lk.sc||1;c.save();c.beginPath();c.rect(0,0,168,168);c.clip();c.translate(84,14+33*sc*S);c.scale(S,S);drawChar(c,{x:-6,y:-8,dir:0,mv:false,fr:0,lk,ph:0});c.restore()}
 return PORT[key]=o}
function findSpeaker(nm){const ps=[...(scene&&rm?rm.ppl:[]),...NP];return ps.find(n=>n.n&&nm.startsWith(n.n))}
function optHTML0(o,i,grid){const lab=o[0];
 if(grid){const m=lab.match(/^(\p{Extended_Pictographic}️?)\s*(.*?)(?:　×(\d+))?$/u);if(m&&o[4]){const okI=typeof emIcon!='function'||!!emIcon(m[1]);return `<button data-i="${i}" ${o[3]?'disabled':''} title="${(o[1]||'').replace(/<[^>]+>/g,'')}" class="tile${o[4]=='eq'?' eq':''}">${okI?`<span class="ic">${m[1]}</span>`:''}<span class="nn">${m[2]}</span>${m[3]?`<span class="ct">${m[3]}</span>`:''}</button>`}}
 return `<button data-i="${i}" ${o[3]?'disabled':''} class="dopt"><b>${i+1}　${lab}</b>${o[1]?`<div class="sub">${o[1]}</div>`:''}</button>`}
function openDlg(title,desc,opts,sub,mode){if(sub&&!dlg.hidden)dlgStack.push(curDlg);curDlg=[title,desc,opts,mode];Object.keys(keys).forEach(k=>keys[k]=0);dlgFns=opts.map(o=>o[2]);
 const sm=title.match(/^(?:💬|❗) ([^♥❤💗]*)/),spk=sm?findSpeaker(sm[1].trim()):null;let head;
 if(sm&&spk){head=`<div class="stage"><div class="pt dim" id="ptl"><canvas width="168" height="168"></canvas><span class="nm">${st.name}</span></div><div class="mid">${title.startsWith('❗')?'❗':'💬'}</div><div class="pt" id="ptr"><canvas width="168" height="168"></canvas><span class="nm">${spk.n}${title.includes('♥')||title.includes('💗')?'':''}</span></div></div>`}
 else head=`<div class="rttl">${title}</div>`;
 const grid=mode=='grid';
 const body=grid?`<div class="bgrid">${opts.map((o,i)=>o[4]?optHTML(o,i,1):'').join('')}</div>${opts.map((o,i)=>o[4]?'':optHTML(o,i,0)).join('')}`:opts.map((o,i)=>optHTML(o,i,0)).join('');
 const isIn=/^\s*[（(]/.test(desc.replace(/<[^>]+>/g,''));
 dbox.innerHTML=`<div class="rpg">${head}<div class="rdesc"${isIn?' style="font-style:italic"':''}>${desc}</div>${body}</div>`;
 if(sm&&spk){const L=dbox.querySelector('#ptl canvas').getContext('2d'),R2=dbox.querySelector('#ptr canvas').getContext('2d');L.drawImage(portrait('me',{n:'me'}),0,0);const pr=spk.t?portrait('npc',spk):portrait('npc',spk);R2.save();R2.translate(168,0);R2.scale(-1,1);R2.drawImage(pr,0,0);R2.restore();dbox.querySelector('#ptl').classList.add('dim')}
 dlg.hidden=false;dlgSel=Math.max(0,opts.findIndex(o=>!o[3]));selUpdate()}
function bagMode(k){return eqOn&&typeof eqOn=='function'&&eqOn(k)?'eq':1}
function openBag(){const ids=Object.keys(IT).filter(k=>(st.inv[k]||0)>0),o=ids.map(k=>[`${IT[k].i} ${IT[k].n}　×${st.inv[k]}`,IT[k].d,()=>itemMenu(k),0,bagMode(k)]);
 if(!o.length)o.push(['（背包是空的）','到商店購物，或到菜圃收成吧',closeDlg]);o.push(['關閉','',closeDlg]);
 const pc=Math.min(100,bagCount()/st.cap*100);
 openDlg('🎒 背包',`<div class="capbar"><div style="width:${pc}%"></div></div>容量 ${bagCount()}/${st.cap}　💰 ${st.money}<br><span style="font-size:12px;opacity:.75">點選物品查看用途、使用或出售。出售需在商店內，或在神秘老頭身旁（收購價 ×1.3）。</span>`,o,0,'grid')}
