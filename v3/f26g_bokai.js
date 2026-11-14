/* ===== v6.7 新朋友：廖柏凱（籃球教練）＋ 熱血籃球之夜 ＋ 柏凱與筑筑的故事 ===== */
FR.bokai={n:'廖柏凱',ic:'⛹️',who:'中油員工・籃球教練',
 intro:'「你好你好！我廖柏凱，嘉義鄉下長大的，現在住小港啦～」<br><i>（皮膚黝黑、笑聲爽朗，運球的手感好到不像業餘的。）</i>',
 bio:[[0,'來自嘉義鄉下，現在住在小港'],[0,'在中油上班，有時候要輪大夜班'],[0,'基督徒，和你們同一間教會'],[1,'冠宏和禹豪的籃球教練：爆發力超強，三分球超準'],[2,'最愛吃牛排🥩和火鍋🍲'],[1,'個性幽默風趣、很隨和，假日偶爾會約吃飯'],[2,'目前是黃金單身漢']],
 where:'週末傍晚（16:00–19:00）常在操場打球；輪大夜班的週末會比較難約。',
 likes:{drink:5,protein:6,lunch:4,coffee:3,bread:2},hint:'最愛吃牛排和火鍋；打完球最想要一瓶運動飲料。',
 lines:[['今天手感不錯，要不要來鬥牛？','大夜班下班看到日出，其實滿美的啦，就是很想睡。','打完球最想吃一塊厚切牛排，五分熟！'],
  ['投籃要用手指撥，不是用手掌推喔。','三分線外就是我的家，你信不信？','做人嘛，開心最重要，球輸了再贏回來就好！'],
  ['跟你們一起打球、一起聚會，真的很感恩。','有時候值大夜班，一個人在廠區巡邏，會邊走邊禱告。','你跟家宜真的很配。我最近都在跟神禱告，求祂預備一個對的人給我。']],
 acts:[{k:'bbcoach',t:'🏀 請柏凱教練指導投籃',d:'免費・1.5 小時・⚔️+2・好感+5',m:0,h:1.5,fx:{p:2,s:-12,j:6},pt:5,hr:[8,20],msg:'柏凱：「手肘收進來，出手要跟球說再見！」你的命中率好像真的變高了。'},
  {k:'steak',t:'🥩 假日約柏凱吃牛排',d:'💰600・1.5 小時・好感+6',m:600,h:1.5,fx:{j:10,s:15},pt:6,hr:[11,21],msg:'柏凱點了一塊厚切牛排：「打完球就是要吃這個！」聊起嘉義老家的稻田，講到一半自己先笑出來。'},{k:'hotpot',t:'🍲 約柏凱吃火鍋',d:'💰600・2 小時・好感+6',m:600,h:2,fx:{j:10,s:15},pt:6,hr:[11,22],msg:'柏凱一口氣加了三盤肉：「火鍋就是要吃肉啦！」'}]};
Object.assign(NSPR,{'廖柏凱':'g11','柏凱':'g11'});
const bkS=()=>st.bk||(st.bk={});
function bkBio(){const b=bkS(),e=FR.bokai.bio.find(x=>/單身|筑筑/.test(x[1]));e[1]=b.wed?'和筑筑結婚了 💒':b.z2?'和音樂才女筑筑交往中 💕':b.z1?'最近在教會遇見了音樂才女筑筑，心動中……':'目前是黃金單身漢'}
mkNP({n:'廖柏凱',fr:'bokai',c:'#1d4f91',hair:'#111',x:355,y:140,r:[332,70,56,150],mode:'a',sp:16,vf:()=>st.bk&&st.bk.met&&st.bk.night!=wkN()&&(dow()==5||dow()==6)&&T.hour>=16&&T.hour<19,L:['再一球！']});
{const _fi=friendInfo;friendInfo=function(id){bkBio();return _fi.apply(this,arguments)}}
{const _pc=phoneCall;phoneCall=function(id){if(id=='bokai'&&st.bk&&st.bk.night==wkN()&&(T.hour>=21||T.hour<9))return openDlg('📞 廖柏凱','嘟……嘟……<br>📲（柏凱傳來訊息）「這週末輪大夜班啦😵 下班再回你！」',[['掛斷','',phoneMenu]]);return _pc.apply(this,arguments)}}

// ── 週末開始：邀約、筑筑的故事、大夜班 ──
function bkCheck(){const b=bkS(),W=wkN(),q=[];
 if(b.met)b.night=(W*7%3==0)?W:0;
 if(!b.inv&&!b.met&&FRS('yuhao').pt>=50&&FRS('yijia').pt>=50){b.inv=W;q.push(()=>openDlg('📲 禹豪傳來 LINE','「兄弟！<b>週六晚上</b>打球啦🏀<br>我找了我的籃球教練，超強的！叫家宜也一起來，媛媛也會去～」<br><span class="text-[12px] opacity-80">（週六 18:00–21:00 從手機赴約）</span>',[['「好啊！誰怕誰！」','',closeDlg]]))}
 if(b.met){const p=FRS('bokai').pt;
  if(!b.z1&&W>=b.met+5&&p>=40){b.z1=W;q.push(()=>openDlg('📲 柏凱傳來 LINE','「老哥，跟你說一件事……我禱告了好久，求神預備一個對的人給我。<br>結果上禮拜主日，敬拜團新來一個彈 <b>Bass</b> 的女生，她叫<b>筑筑</b>，低音一下去整個很穩……<br>我、我好像戀愛了🫣」',[['「去要 LINE 啊！男子漢！」','好感 +2',()=>{frAdd('bokai',2,1);closeDlg()}],['「我幫你問問 RITA 她的事～」','好感 +2',()=>{frAdd('bokai',2,1);frAdd('rita',1,1);closeDlg()}]]))}
  else if(b.z1&&!b.z2&&st.bbq&&st.bbq.done&&W>=b.z1+4&&p>=55){b.z2=W;q.push(()=>openDlg('📲 柏凱傳來 LINE','「報告！我跟筑筑在一起了！🙏<br>神真的有聽我的禱告！謝謝你們也一直幫我禱告～單身漢正式退休！」<br><i>（照片裡，筑筑背著她的 Bass，柏凱在旁邊笑得像個傻瓜。）</i>',[['「恭喜恭喜！要請吃飯喔！」','',()=>{frAdd('bokai',3,1);closeDlg()}]]))}
  else if(b.z2&&!b.wedW&&W>=b.z2+8&&p>=65){b.wedW=W+1;q.push(()=>openDlg('💌 一張喜帖','「老哥、家宜：<br>我們要結婚了！<b>下個週末的週日</b>在教會，一定要來喔！<br>——柏凱 & 筑筑」',[['「一定到！」','',closeDlg]]))}}
 const run=()=>{const f=q.shift();if(!f)return;f();if(q.length)whenFree(run)};run()}
{const _le=lifeEvents;lifeEvents=function(){_le.apply(this,arguments);try{whenFree(bkCheck)}catch(e){console.error(e)}}}
// 手機：赴約
{const _od=openDlg;openDlg=function(t,d,opts,sub,mode){try{if(t=='📱 手機・通訊錄'&&Array.isArray(opts)&&st.bk){const b=st.bk,dd=dow(),h=T.hour;
  if(b.inv&&!b.met)opts.unshift(['🏀 赴約：和禹豪、家宜打籃球','週六 18:00–21:00・約 3 小時・⚡-30',bbNight,!(dd==5&&h>=18&&h<21)||st.sta<30]);
  if(b.wedW&&!b.wed&&wkN()>=b.wedW)opts.unshift(['💒 參加柏凱和筑筑的婚禮','週日 10:00–14:00・紅包 💰3600',bkWedding,!(dd==6&&h>=10&&h<14)||st.money<3600]);
 }}catch(e){}return _od.call(this,t,d,opts,sub,mode)}}
function bbNight(){closeDlg();storyPages('🏀 熱血的籃球之夜',[
 '晚上的球場燈火通明。禹豪身邊站著一個黝黑結實的男生：<br>「來，介紹一下——<b>廖柏凱</b>，我們的籃球教練！」',
 '柏凱伸出手，笑得很爽朗：「你好你好！我嘉義鄉下長大的，現在住小港啦～在中油上班，常常輪大夜班，今天剛好休假，手很癢！」<br>「聽說你們也是城光的？我也是基督徒耶，以後主日見！」',
 '熱身的時候，柏凱一眼就看出你的毛病：「老哥，你投籃手肘外開喔，像在丟飛盤。」<br>禹豪笑到蹲下去，場邊的媛媛和家宜也笑成一團。',
 '三對三鬥牛：你、禹豪、柏凱 vs 球場上的大學生。<br>柏凱一個爆發力十足的切入，對面還沒反應過來就上籃得分；下一球他退到三分線外一步——<b>刷！</b>對面直接傻眼。<br>最後一球，他把球傳給你——空檔三分，<b>刷！</b>',
 '打完球，大家坐在場邊喝飲料。媛媛說：「老骨頭們今天很拚喔！」家宜遞給你一條毛巾。<br>柏凱說：「我還是單身啦，你們有好姊妹記得介紹一下～」大家笑翻了。',
 '「來來來，拍照留念！」禹豪舉起手機——'],()=>{const b=bkS(),f=FRS('bokai');b.met=wkN();f.met=1;f.pt=Math.max(f.pt,15);f.lastW=wkN();
  advance(3);fxApply({p:3,j:20,s:-30});frAdd('yuhao',5,1);frAdd('yijia',5,1);hud();
  photoShow('bb','熱血的籃球之夜',`👥 認識了 <b>廖柏凱</b>！　🏀 禹豪好感 +5　💗 家宜好感 +5　⚔️ +3`)},'📸 拍照！')}
function bkWedding(){closeDlg();st.money-=3600;storyPages('💒 柏凱 & 筑筑的婚禮',[
 '城光復興堂裡擺滿了白色的花。敬拜團的弟兄姊妹都來了，筑筑的 Bass 也擺在台邊，上面綁了一個白色蝴蝶結。',
 '筑筑穿著白紗走進來，柏凱站在台前，第一次看到他這麼緊張，連手都在抖。<br>禹豪在你旁邊小聲說：「教練也有今天喔。」',
 '柏凱念誓詞念到一半就哽咽：「我禱告了好久……神把妳帶到我面前……」<br>他哭到說不下去，筑筑笑著幫他擦眼淚，全場跟著又哭又笑。<br>以倫牧師說：「我奉主的名，宣告你們成為夫妻！」',
 '喜宴上，柏凱拿著麥克風：「謝謝老哥、禹豪，還有你們這些球友……沒有你們幫我禱告，我現在還在球場上投三分球給自己看啦！」<br>全場笑翻。',
 '接著，燈光暗下來。柏凱和筑筑一人拿起一支麥克風，浪漫地合唱了一首情歌。<br>唱到一半柏凱破音，筑筑笑到唱不下去，兩個人乾脆對看著笑——<br>台下手機全舉起來，家宜在你旁邊邊笑邊擦眼淚：「好感動喔。」'],()=>{const b=bkS();b.wed=1;advance(4);fxApply({j:25,r:3});frAdd('bokai',10,1);frAdd('yijia',2,1);hud();photoShow('bkwed','柏凱 & 筑筑的婚禮','🎤 幸福的合唱・最美的祝福　⛹️ 柏凱好感 +10　😊 心情 +25')},'📸 新婚快樂！')}
// 通用：合影結算（玩家提供的照片）
function photoShow(img,title,html,cb){window.TITLE=true;Object.keys(keys).forEach(q=>keys[q]=0);
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:99998;background:rgba(20,12,6,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;opacity:0;transition:opacity .7s';
 const fr=document.createElement('div');fr.style.cssText='background:#fbf7ee;padding:10px 10px 8px;box-shadow:0 10px 40px rgba(0,0,0,.6);transform:rotate(1.2deg) scale(.96);transition:transform .9s;max-width:min(92vw,128vh)';
 const im=document.createElement('img');im.src=FAMIMG[img];im.style.cssText='display:block;width:100%;max-height:70vh;object-fit:contain';
 const cap=document.createElement('div');cap.style.cssText='text-align:center;color:#3a2a1a;font-weight:bold;font-size:14px;margin-top:6px';cap.textContent=`第 ${wkN()} 個週末・${title}`;
 fr.appendChild(im);fr.appendChild(cap);const info=document.createElement('div');info.style.cssText='color:#fff6dc;text-align:center;font-size:14px;line-height:1.8;text-shadow:0 2px 0 #000;max-width:92vw';
 info.innerHTML=`<span style="font-size:18px;font-weight:bold">📸 ${title}</span><br>${html}<div style="opacity:.7;font-size:12px">點一下或按任意鍵繼續</div>`;
 ov.appendChild(fr);ov.appendChild(info);document.body.appendChild(ov);requestAnimationFrame(()=>{ov.style.opacity='1';fr.style.transform='rotate(1.2deg) scale(1)'});
 st.album=st.album||[];if(!st.album.some(q=>q.img==img))st.album.push({w:wkN(),t:title,img});
 let done=false;const t0=performance.now();const end=()=>{if(done||performance.now()-t0<1000)return;done=true;removeEventListener('keydown',end,true);ov.style.opacity='0';setTimeout(()=>{ov.remove();window.TITLE=false;SVDIRTY=1;cb&&cb()},700)};
 addEventListener('keydown',end,true);ov.addEventListener('pointerdown',end)}
