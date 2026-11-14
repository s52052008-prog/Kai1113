/* v5.1 教會：進門隨機經文、每月感恩禮拜＋特約講員柳子駿牧師 */
const sunDays=()=>{const a=[];for(let d=1;d<=30;d++)if((((T.year-1)*30+d-1)%7+7)%7==6)a.push(d);return a};
const chHash=n=>{let x=(n*2654435761)>>>0;x^=x>>>13;x=(x*1274126177)>>>0;return (x>>>8)/16777216};
function chEvents(){const S=sunDays(),thx=S[S.length-1],gl=S.filter(d=>d!=thx),guest=gl[Math.floor(chHash(T.year*31+7)*gl.length)];return{thx,guest,S}}
function chToday(){if(dow()!=6)return null;const E=chEvents();if(T.day==E.thx)return'thx';if(T.day==E.guest)return'guest';
 return chHash(T.year*400+T.day*13+5)<1/15?'guest':null}
function chBulletin(){const E=chEvents();return `📢 <b>本月公告</b><br>・第 ${E.guest} 天（週日）主日：特約講員 <b>【柳子駿牧師】</b> 證道，座位有限請早到！<br>・第 ${E.thx} 天（週日）主日：<b>感恩禮拜</b>，會後愛筵，歡迎帶親友。<br>・每週日 09:00 主日崇拜、週三 19:00 小組、週六吉他班與學生團契。`}
function verseDlg(){const v=VERSES[Math.floor(Math.random()*VERSES.length)];
 openDlg('📖 今日經文',`<div style="font-size:15px;line-height:1.7;margin:4px 0 8px">「${v[1]}」</div><div style="text-align:right;opacity:.8">—— ${v[0]}</div>`,[['🙏 阿們','心情 +2',()=>{fxApply({j:2});hud();closeDlg()}],['📢 看本月公告','',()=>openDlg('📢 福音堂公告',chBulletin(),[['返回','',cancel]],true)]])}
(function(){const o=churchCast;churchCast=function(rm){o(rm);const sp=chToday(),m=CHM();
 if(sp&&m=='sun'){const P=rm.ppl;
  if(sp=='guest'){P.forEach(n=>{if(n.n=='黃以倫'){n.x=60;n.y=96;n.sit=1;n.pose='chat'}});
   P.push(pp('柳子駿牧師',150,44,'#2a2a3a','#1a1a1a','弟兄姊妹平安！今天我們一起來看神的話。|神從來不會放棄你。|不要只聽道，要行道！',{dyn:1,still:1,dir:0,pose:'chat',lk:GL('office',977)}))}
  else P.push(pp('感恩見證',110,58,'#e88a3a','#222','感謝主，今年雖然辛苦，但每一天都看見恩典！',{dyn:1,still:1,dir:0,pose:'wave'}));
  crowdRows(4,112,28,22,128,172,300,1,sp=='guest'?41:23).forEach(n=>{n.dyn=1;if(!P.some(q=>Math.abs(q.x-n.x)<6&&Math.abs(q.y-n.y)<6))P.push(n)});
  if(sp=='guest')for(let i=0;i<9;i++){const g=genLook(['office','student','elder','default'][i%4],700+i);P.push(pp(g.name,40+i*30,232+(i%2)*6,'#888','#222','位子全滿了，只好站著聽！|聽說柳牧師講道很精彩。',{dyn:1,lk:g.lk,dir:0,still:1}))}
  toast(sp=='guest'?'🔥 今天是柳子駿牧師特約證道，座位爆滿！':'🎉 今天是感恩禮拜！')}
 setTimeout(()=>{if(dlg.hidden)verseDlg()},350)}})();
churchMenu=(function(o){return function(m){const sp=chToday();
 if(m=='sun'&&sp&&!churchMenu._in){const nm=sp=='guest'?'特約講員【柳子駿牧師】證道':'感恩禮拜';
  return openDlg(sp=='guest'?'🔥 特約講員主日':'🎉 感恩禮拜',sp=='guest'?'今天由柳子駿牧師證道，會堂座無虛席，連走道都站滿了人。':'今天是本月的感恩禮拜，會友輪流上台分享見證，會後有愛筵。',
   [['🙏 參加'+nm,'😊+20 🧠+4 ⭐+5，結束後到中午',()=>{const h=T.hour;advance(Math.max(.5,12-h));fxApply(sp=='guest'?{j:20,w:4,r:5,s:4}:{j:18,w:2,r:4,s:10});st.cnt.church=(st.cnt.church||0)+1;hud();
     openDlg('⛪ '+nm,sp=='guest'?'柳牧師講得生動又扎心，全場笑中帶淚。散會時，好幾個人排隊想跟牧師握手。<br><br>'+VERSES[Math.floor(Math.random()*VERSES.length)].join('：'):'大家分享這個月的恩典，最後一起唱詩。愛筵的滷肉飯超好吃！',[['離開','',closeDlg]])}],
    ['其他選項','',()=>{churchMenu._in=1;try{o('sun')}finally{churchMenu._in=0}}],['離開','',closeDlg]])}
 return o(m)}})(churchMenu);
