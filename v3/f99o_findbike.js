/* v13.18 找腳踏車：不在旁邊時按 R／腳踏車圖示 → 顯示距離、方向，畫面上出現指引箭頭，腳踏車上方跳一個標記 */
const FINDV={t:null,until:0};
function vNearestBld(x,y){let best=null,bd=1e9;BALL().forEach(b=>{const d=Math.hypot(b.x+b.w/2-x,b.bot-y);if(d<bd){bd=d;best=b}});return best&&bd<260?best.n:null}
function vFind(t){const o=st.veh&&st.veh[t];if(!o)return false;const dx=o.cx-(p.x+6),dy=o.cy-(p.y+4),d=Math.hypot(dx,dy),m=Math.round(d/4)*2;
 const dirs=['東','東南','南','西南','西','西北','北','東北'],a=Math.atan2(dy,dx),di=dirs[(Math.round(a/(Math.PI/4))+8)%8];
 const near=vNearestBld(o.cx,o.cy),pl=typeof placeName=='function'?placeName(o.cx,o.cy):'';
 FINDV.t=t;FINDV.until=performance.now()+9000;
 toast(`${t=='bike'?'🚲 腳踏車':'🛴 滑板車'}停在${near?'「'+near+'」附近':pl||'鎮上'}，往${di}走大約 ${m} 公尺 ➜ 跟著畫面上的箭頭走`);return true}
rideKey=(f=>function(){const V=st.veh||{};if(!scene&&!p.ride&&!MG&&!window.TITLE&&dlg.hidden&&!(V.scoot&&V.scoot.pk)&&!vNear()&&(V.bike||V.scoot)){return vFind(V.bike?'bike':'scoot')}
 if(scene&&(V.bike||V.scoot)&&!p.ride){const o=V.bike||V.scoot,near=vNearestBld(o.cx,o.cy);return toast(`在室內不能騎車。${V.bike?'🚲 腳踏車':'🛴 滑板車'}停在${near?'「'+near+'」附近':'外面'}`)}
 return f.apply(this,arguments)})(rideKey);
window.bikeToggle=rideKey;
// 畫指引：腳踏車上方的跳動標記＋畫面邊緣的箭頭與距離
{const _dp=drawPlayer;drawPlayer=function(c){_dp(c);try{if(!FINDV.t||scene)return;const now=performance.now(),o=st.veh&&st.veh[FINDV.t];if(!o||now>FINDV.until||p.ride){FINDV.t=null;return}
 const d=Math.hypot(o.cx-(p.x+6),o.cy-(p.y+4));if(d<26){FINDV.t=null;toast('找到了！按 R 騎上去');return}
 const bob=Math.abs(Math.sin(now/220))*4;c.save();c.font='bold 11px sans-serif';c.textAlign='center';c.fillStyle='#ffd84a';c.strokeStyle='#2a1608';c.lineWidth=3;c.strokeText('▼',o.cx,o.cy-18-bob);c.fillText('▼',o.cx,o.cy-18-bob);
 c.beginPath();c.strokeStyle='rgba(255,216,74,.85)';c.lineWidth=1.5;c.ellipse(o.cx,o.cy+2,14+Math.sin(now/200)*2,5,0,0,7);c.stroke();
 const sx=CAM.x,sy=CAM.y,on=o.cx>sx+10&&o.cx<sx+W-10&&o.cy>sy+20&&o.cy<sy+H-20;
 if(!on){const px=p.x+6,py=p.y+4,a=Math.atan2(o.cy-py,o.cx-px),cx=sx+W/2,cy=sy+H/2,rx=W/2-26,ry=H/2-30,k=Math.min(Math.abs(rx/Math.cos(a)||1e9),Math.abs(ry/Math.sin(a)||1e9)),ax=cx+Math.cos(a)*k,ay=cy+Math.sin(a)*k;
  c.translate(ax,ay);c.fillStyle='rgba(42,22,8,.8)';c.beginPath();c.arc(0,0,13,0,7);c.fill();c.rotate(a);c.fillStyle='#ffd84a';c.beginPath();c.moveTo(10,0);c.lineTo(-4,-7);c.lineTo(-1,0);c.lineTo(-4,7);c.closePath();c.fill();c.rotate(-a);
  c.font='bold 8px sans-serif';c.fillStyle='#fff6dc';c.fillText((FINDV.t=='bike'?'🚲 ':'🛴 ')+Math.round(d/4)*2+'m',0,22)}
 c.restore()}catch(e){}}}
