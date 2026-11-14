/* ===== v3：裝備系統・寵物系統 ===== */
// ───────── 裝備 ─────────
const EQN={hat:'帽子',top:'上衣',bottom:'褲子／裙',shoes:'鞋子',acc:'配件'};
const EQ={
 cap_red:{slot:'hat',n:'紅色棒球帽',i:'🧢',p:120,look:1,o:{ht:'h',hc:'#d33a3a'}},cap_blue:{slot:'hat',n:'藍色棒球帽',i:'🧢',p:120,look:1,o:{ht:'h',hc:'#2f6fd0'}},cap_black:{slot:'hat',n:'黑色棒球帽',i:'🧢',p:130,look:1,o:{ht:'h',hc:'#222228'}},
 bucket:{slot:'hat',n:'米色漁夫帽',i:'👒',p:150,look:2,o:{ht:'f',hc:'#d8c9a0'}},beanie:{slot:'hat',n:'毛線帽',i:'🧶',p:100,look:1,o:{ht:'b',hc:'#c0392b'}},straw:{slot:'hat',n:'草帽',i:'👒',p:90,look:1,o:{ht:'a',hc:'#d9b45a'}},
 tee_white:{slot:'top',n:'白色 T 恤',i:'👕',p:80,look:1,o:{ou:'t',tp:'#f4f4f4'}},tee_red:{slot:'top',n:'紅色 T 恤',i:'👕',p:80,look:1,o:{ou:'t',tp:'#d9452f'}},tee_black:{slot:'top',n:'黑色 T 恤',i:'👕',p:90,look:2,o:{ou:'t',tp:'#26262c'}},aloha:{slot:'top',n:'夏威夷花襯衫',i:'👔',p:160,look:3,o:{ou:'t',tp:'#ff9a3a'}},
 hoodie_gray:{slot:'top',n:'灰色連帽衫',i:'🧥',p:220,look:2,o:{ou:'h',tp:'#8a8f9c'}},hoodie_blue:{slot:'top',n:'藍色連帽衫',i:'🧥',p:220,look:2,o:{ou:'h',tp:'#2f80ed'}},
 sport_red:{slot:'top',n:'運動排汗衫',i:'🎽',p:180,look:2,pow:1,o:{ou:'y',tp:'#e0443a'}},suit_navy:{slot:'top',n:'深藍西裝外套',i:'🤵',p:600,look:8,o:{ou:'z',tp:'#2b3a55'}},
 gakuran:{slot:'top',n:'熱血學蘭外套',i:'🥋',p:0,look:6,pow:2,o:{ou:'s',tp:'#f4f4f4',jk:'#1b212c'},d:'敞開的黑色長版學蘭，熱血高校風！'},
 jeans:{slot:'bottom',n:'藍色牛仔褲',i:'👖',p:200,look:2,o:{bt:'#3a5a8a',sho:0}},black_pants:{slot:'bottom',n:'黑色長褲',i:'👖',p:200,look:2,o:{bt:'#22222a',sho:0}},khaki:{slot:'bottom',n:'卡其工作褲',i:'👖',p:180,look:1,o:{bt:'#a08a60',sho:0}},
 shorts:{slot:'bottom',n:'運動短褲',i:'🩳',p:120,look:1,o:{bt:'#2f6a9a',sho:1}},gak_pants:{slot:'bottom',n:'學蘭長褲',i:'👖',p:0,look:2,o:{bt:'#1b212c',sho:0},d:'搭配學蘭外套的寬版長褲。'},sweat:{slot:'bottom',n:'灰色運動長褲',i:'👖',p:160,look:1,o:{bt:'#7a7e88',sho:0}},
 canvas:{slot:'shoes',n:'白色帆布鞋',i:'👟',p:150,look:1,o:{sh:'#f4f4f4'}},leather:{slot:'shoes',n:'黑色皮鞋',i:'👞',p:260,look:3,o:{sh:'#16161a'}},boots:{slot:'shoes',n:'棕色短靴',i:'🥾',p:320,look:3,spd:.04,o:{sh:'#6b4a2a'}},
 runner:{slot:'shoes',n:'慢跑鞋',i:'👟',p:400,look:2,spd:.1,o:{sh:'#38b36a'},d:'輕量慢跑鞋。移動速度 +10%'},
 jordan:{slot:'shoes',n:'飛人氣墊跑鞋',i:'👟',p:0,look:6,spd:.25,o:{sh:'#c8202a'},d:'傳說中的籃球名將款，氣墊超彈！移動速度 +25%'},
 glasses:{slot:'acc',n:'黑框眼鏡',i:'👓',p:140,look:2,wis:0,o:{ac:'g'}},shades:{slot:'acc',n:'飛行員墨鏡',i:'🕶️',p:180,look:3,o:{ac:'s'}},headband:{slot:'acc',n:'熱血紅頭帶',i:'🎌',p:60,look:1,pow:1,o:{ac:'k',hbc:'#d9202a'}},
 phones:{slot:'acc',n:'白色耳罩耳機',i:'🎧',p:0,look:2,o:{ac:'e'},d:'遊藝場限定耳機。'},backpack:{slot:'acc',n:'藍色後背包',i:'🎒',p:240,look:1,o:{ac:'p',bp:'#2f80ed'}},mask:{slot:'acc',n:'白色口罩',i:'😷',p:20,look:0,o:{ac:'x'}}};
const eqDesc=e=>(e.d||EQN[e.slot])+'。'+(e.look?` ✨顏值+${e.look}`:'')+(e.pow?` ⚔️+${e.pow}`:'')+(e.spd?` 移動速度+${Math.round(e.spd*100)}%`:'');
Object.keys(EQ).forEach(k=>{const e=EQ[k];IT[k]={n:e.n,i:e.i,p:Math.max(10,Math.round((e.p||300)*.4)),d:eqDesc(e),u:'equip'};if(e.p)PR[k]=e.p});
st.eq={hat:null,top:null,bottom:null,shoes:null,acc:null};st.tix=0;st.coin=0;
const ALLEN0={...ALLEN};
function applyEq(){const keep={...ALLEN0};Object.keys(ALLEN).forEach(k=>delete ALLEN[k]);Object.assign(ALLEN,keep);
 let spd=0;for(const s in st.eq){const k=st.eq[s];if(!k)continue;const e=EQ[k];Object.assign(ALLEN,e.o);spd+=e.spd||0}
 if(ALLEN.ou=='s'&&!st.eq.bottom){}
 st.spdBonus=spd}
const spdMul=()=>1+(st.spdBonus||0)+Math.min(.25,(st.runSk||0)/400);
const eqOn=k=>EQ[k]&&st.eq[EQ[k].slot]==k;
function eqBonus(k,sign){const e=EQ[k];if(e.look){st.look+=sign*e.look}if(e.pow){st.pow+=sign*e.pow}}
function toggleEquip(k){const e=EQ[k],s=e.slot,cur=st.eq[s];
 if(cur){eqBonus(cur,-1);st.eq[s]=null}
 if(cur!=k){st.eq[s]=k;eqBonus(k,1);toast('👕 已裝備：'+e.n)}else toast('已卸下：'+e.n);
 applyEq();hud()}
const eqLock=(k,all)=>eqOn(k)&&((st.inv[k]||0)<=1||all);
function openEquip(){const o=[];
 Object.keys(EQN).forEach(s=>{const k=st.eq[s],e=k&&EQ[k];o.push([`${e?e.i:'▫️'} ${EQN[s]}：${e?e.n:'（未裝備）'}`,e?eqDesc(e):'點選更換',()=>equipSlot(s)])});
 o.push(['🎒 背包','',()=>{closeDlg();openBag()}]);o.push(['關閉','',closeDlg]);
 const tb=Object.values(st.eq).filter(Boolean).reduce((a,k)=>a+(EQ[k].look||0),0);
 openDlg('👕 裝備',`頭、身、腿、腳與配件五個欄位。<br>裝備加成：✨顏值 +${tb}　移動速度 ×${spdMul().toFixed(2)}`,o)}
function equipSlot(s){const ids=Object.keys(EQ).filter(k=>EQ[k].slot==s&&(st.inv[k]||0)>0),o=ids.map(k=>[`${EQ[k].i} ${EQ[k].n}${eqOn(k)?'（穿戴中）':''}`,eqDesc(EQ[k]),()=>{toggleEquip(k);openEquip()}]);
 if(!ids.length)o.push(['（沒有可用的'+EQN[s]+'）','到服飾店或遊藝場獲得',cancel,true]);
 o.push(['返回','',cancel]);openDlg('👕 '+EQN[s],'選擇要穿戴的物品（再選一次可卸下）。',o,true)}
function clothesShop(){const cats=[['hat','🧢 帽子'],['top','👕 上衣'],['bottom','👖 褲子'],['shoes','👟 鞋子'],['acc','👓 配件']];
 return cats.map(([s,t])=>[t,'逛逛'+EQN[s],()=>{const ids=Object.keys(EQ).filter(k=>EQ[k].slot==s&&PR[k]);shopDlg('👗 潮流服飾店・'+EQN[s],ids,[['🪞 試穿／更換裝備','',()=>openEquip()]])}])}
// ───────── 寵物 ─────────
const PETS={
 hamster:{n:'黃金鼠',i:'🐹',p:80,t:'hamster',c:'#f0c88a',d:'圓滾滾的小可愛，愛吃瓜子。'},turtle:{n:'巴西龜',i:'🐢',p:120,t:'turtle',c:'#6ab04a',d:'慢吞吞，長壽又安靜。'},
 callduck:{n:'柯爾鴨',i:'🦆',p:200,t:'callduck',c:'#fffdf4',d:'迷你的白色小鴨，叫聲超萌。'},rabbit:{n:'垂耳兔',i:'🐰',p:180,t:'rabbit',c:'#f4f2ea',d:'毛茸茸、愛蹦蹦跳跳。'},
 parrot:{n:'金剛鸚鵡',i:'🦜',p:300,t:'parrot',c:'#e0443a',d:'色彩繽紛，會學人說話。'},cat_o:{n:'橘貓',i:'🐱',p:220,t:'cat',c:'#e8a45a',d:'親人又貪吃的橘貓。'},
 cat_g:{n:'英國短毛貓',i:'🐱',p:380,t:'cat',c:'#8a96a8',pat:'t',d:'圓臉藍灰色，個性溫和。'},shiba:{n:'柴犬',i:'🐕',p:420,t:'shiba',c:'#e0a45c',d:'笑臉迎人、忠誠活潑。'},
 frenchie:{n:'法國鬥牛犬',i:'🐶',p:500,t:'frenchie',c:'#d9b48a',d:'蝙蝠耳、鼻子扁扁，愛撒嬌。'},frenchie_g:{n:'法國鬥牛犬（灰）',i:'🐶',p:520,t:'frenchie',c:'#8a8a96',d:'罕見的灰色虎斑色。'}};
const PNAMES=['豆豆','麻糬','布丁','可樂','年糕','咪咪','小白','奶茶','毛毛','球球','黑糖','蛋捲','汪汪','嘟嘟','栗子'];
st.pets=[];st.comp=null;let petUid=1;
const petOf=id=>st.pets.find(p=>p.id==id),petSp=p=>PETS[p.k],compPet=()=>petOf(st.comp);
function petName(){const used=st.pets.map(p=>p.name);return PNAMES.filter(n=>!used.includes(n))[Math.random()*(PNAMES.length-st.pets.length)|0]||'小寶'}
function syncPet(){const cp=compPet();st.pet=cp?PETS[cp.k].n:(st.pets[0]?PETS[st.pets[0].k].n:null);if(!cp)st.comp=null;
 if(st.comp&&!PET.on){PET.on=1;PET.x=p.x;PET.y=p.y}}
function petSync(){const cp=compPet();if(!cp)return;const sp=PETS[cp.k];PET.t=sp.t;PET.c=sp.c;PET.pat=sp.pat}
function adopt(k){const sp=PETS[k];if(st.pets.length>=4)return toast('最多可以同時照顧 4 隻寵物');st.money-=sp.p;const pt={id:petUid++,k,name:petName(),hap:70};st.pets.push(pt);if(!st.comp)st.comp=pt.id;syncPet();hud();
 toast(`${sp.i} 你認養了「${pt.name}」（${sp.n}）！`)}
const petHapTxt=h=>h>=80?'😆 超開心':h>=55?'🙂 心情不錯':h>=30?'😐 有點無聊':'😢 想你了';
function petMenu(){const o=[];
 st.pets.forEach(pt=>{const sp=PETS[pt.k];o.push([`${sp.i} ${pt.name}（${sp.n}）${st.comp==pt.id?'・同行中':''}`,`${petHapTxt(pt.hap)}　親密度 ${pt.hap}`,()=>petDetail(pt.id)])});
 if(!st.pets.length)o.push(['（還沒有寵物）','到寵物店「毛孩樂園」認養吧',closeDlg]);
 o.push(['關閉','',closeDlg]);openDlg('🐾 我的寵物',`同時最多 4 隻・寵物店在東邊的商店街。<br>親密度每天會降低，記得陪陪牠們。`,o)}
function petDetail(id){const pt=petOf(id),sp=petSp(pt),o=[];
 o.push([`🥫 餵食（飼料×${st.inv.food||0}）`,'親密 +15',()=>{st.inv.food--;pt.hap=Math.min(100,pt.hap+15);hud();toast(pt.name+'吃得好開心！');petDetail(id)},!(st.inv.food>0)]);
 o.push(['🎾 一起玩耍（1 小時）','親密 +12・😊+6・⚡-4',()=>{pt.hap=Math.min(100,pt.hap+12);fxApply({j:6,s:-4});advance(1);hud();toast(pt.name+'玩得好高興！');petDetail(id)},st.sta<4]);
 o.push(['🤲 摸摸','親密 +4・😊+2',()=>{pt.hap=Math.min(100,pt.hap+4);fxApply({j:2});hud();toast(pt.name+'舒服地瞇起眼睛。');petDetail(id)}]);
 o.push([st.comp==id?'🏠 留在家裡':'🚶 帶在身邊同行','同行的寵物會跟著你四處走',()=>{st.comp=st.comp==id?null:id;syncPet();petDetail(id)}]);
 o.push(['🏷️ 換個名字','隨機挑一個新名字',()=>{pt.name=petName();petDetail(id)}]);
 o.push(['返回','',()=>{petMenu()}]);
 openDlg(`${sp.i} ${pt.name}`,`${sp.n}　${petHapTxt(pt.hap)}（親密 ${pt.hap}）<br><span class="opacity-70">${sp.d}</span>`,o)}
function petShop(){const o=Object.keys(PETS).map(k=>{const sp=PETS[k];return[`${sp.i} ${sp.n}　💰${sp.p}`,sp.d,()=>adopt(k)||0,st.money<sp.p||st.pets.length>=4]});
 o.push(['🥫 寵物飼料（💰150）','餵食寵物用',()=>{if(!addItem('food',1))return;st.money-=150;hud();toast('買了飼料');petShop()},st.money<150]);
 o.push(['離開','',closeDlg]);openDlg('🐾 毛孩樂園・認養',`你有 💰${st.money}　目前照顧 ${st.pets.length}/4 隻`,o)}
function petDaily(){st.pets.forEach(pt=>{pt.hap=Math.max(0,pt.hap-(pt.id==st.comp?4:8))})}
const _dt=dayTick;dayTick=function(){_dt();petDaily()};
function petOpts(){return[['🐾 認養寵物（寵物店更齊全）','毛孩樂園有多種寵物',()=>petShop()]]}
