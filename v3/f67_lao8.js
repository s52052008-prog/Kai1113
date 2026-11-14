/* v11.3 新朋友：老八（26 歲・設計師・教會朋友・叫你「老哥」）——教會、遊藝場遇得到，會來家裡串門子 */
FR.lao8={n:'老八',ic:'💜',who:'設計師・教會朋友',
 intro:'一個好高的女生彎腰跟小朋友說話，站直起來比你還高半顆頭。<br>「欸你就是常來的那個！大家都叫我<b>老八</b>啦，叫我老八就好。」<br>「以後我叫你老哥喔！」<br><i>（她穿著紫色的帽T，笑得很大聲。）</i>',
 bio:[[0,'26 歲，高高瘦瘦'],[0,'在建築事務所做過，現在做設計相關的工作'],[1,'教會朋友，會幫忙帶兒童主日學，也會彈一點鋼琴'],[1,'最喜歡紫色，東西都挑紫色的'],[2,'大辣辣，愛喝酒、愛串門子，戰鬥陀螺打得超強']],
 where:'週日早上在教會帶兒童主日學；週五、週六下午到晚上常在遊藝場打陀螺、玩 VR。',
 likes:{cf_beer:6,cf_sake:5,cf_red:5,cf_white:4,cf_hotdog:3,cake:2,popcorn:2},hint:'聽說她很會喝，啤酒、清酒都愛。',
 lines:[['老哥！今天也來啦！','小朋友今天問我為什麼長這麼高，我說因為我都有吃青菜。','你陀螺用什麼配件？借我看看！'],
  ['建築事務所那時候天天加班畫圖，現在做設計自由多了。','主日學的小朋友超可愛，就是吵了一點哈哈。','我最近在練一首詩歌，鋼琴的部分好難。','紫色是全世界最好看的顏色，不接受反駁。'],
  ['老哥，你跟家宜真的很配耶，我好羨慕。','有時候一個人住會覺得很安靜，所以我才愛到處串門子啦。','你是我在教會最好的哥們之一喔，老哥。','下次你家烤肉一定要叫我，我帶啤酒！']],
 acts:[{k:'beer',t:'🍻 約她喝一杯',d:'💰400・1.5 小時・好感+7',m:400,h:1.5,fx:{j:12,h:-1},pt:7,hr:[18,24],msg:'老八一口氣乾了半杯：「老哥你酒量不行喔！」你們聊到很晚，笑到肚子痛。'},
  {k:'bey',t:'🌀 跟她對戰陀螺',d:'💰100・1 小時・好感+6',m:100,h:1,fx:{j:10},pt:6,msg:'她的陀螺一出手就是極限衝擊，你被打得落花流水。「老哥，再練練吧～」'},
  {k:'piano',t:'🎹 聽她練鋼琴',d:'免費・0.5 小時・好感+4',m:0,h:.5,fx:{j:6,w:1},pt:4,msg:'她彈得有點卡，但很認真。彈完轉頭問你：「有沒有比上週好？」'},
  {k:'vr',t:'🥽 約她去打幻境 Online',d:'💰300・1 小時・好感+6',m:300,h:1,fx:{j:10,s:-8},pt:6,msg:'她一進遊戲就衝第一個，斧頭丟得滿天飛：「老哥跟上啦！」'}]};
FR.lao8.bm=null;
const l8Mk=(x,y,o)=>pp('老八',x,y,'#8a5ad0','#2a1a12','老哥！',{fr:'lao8',dyn:1,still:1,lk:{...GL('casual',888),fm:1,hs:'p',hr:'#2a1a12',tp:'#7a4ac0',bt:'#2a2a3a',sc:.92},...o});
// 教會：週日兒童主日學、週六下午
(function(){const o=churchCast;churchCast=function(rm){o(rm);const m=CHM();if(m=='sun')rm.ppl.push(l8Mk(420,300,{dir:2,pose:'wave'}));else if(m=='sat')rm.ppl.push(l8Mk(520,120,{dir:2,pose:'piano'}))}})();
// 遊藝場：週五、週六 15:00–21:00
{const R0=IN['遊藝場'];if(R0){const o=R0.onEnter;R0.onEnter=rm=>{o&&o(rm);rm.ppl=rm.ppl.filter(n=>n.fr!='lao8');const d=dow(),h=T.hour;if((d==4||d==5)&&h>=15&&h<21)rm.ppl.push(l8Mk(250,170,{dir:2,pose:'spin'}))}}}
// 在 VR 認識她，現實也算認識
{const _l=vrLobby;vrLobby=function(){try{if(vrS().met8&&!FRS('lao8').met){FRS('lao8').met=1}}catch(e){}return _l.apply(this,arguments)}}
// 串門子：認識之後，週末偶爾會帶啤酒來你家
{const _wa=wkArrive;wkArrive=function(){const r=_wa.apply(this,arguments);try{const s=FRS('lao8');if(s.met&&s.pt>=20&&Math.random()<.15&&(st.l8v||0)!=wkN()){st.l8v=wkN();setTimeout(()=>whenFree(()=>openDlg('🚪 叮咚！','門口傳來超大聲的「老哥～～～！」<br>老八提著一手啤酒站在門口：「路過啦，順便來串門子！家宜在嗎？」<br>她在客廳跟家宜聊了一個下午，臨走前還幫你們把客廳的擺設重新喬了一下：「設計師的直覺啦！」',[['歡迎歡迎！','😊+8・💞老八+3',()=>{fxApply({j:8});frAdd('lao8',3);try{frAdd('yijia',1,1)}catch(e){}hud();closeDlg()}]])),10000)}}catch(e){}return r}}
