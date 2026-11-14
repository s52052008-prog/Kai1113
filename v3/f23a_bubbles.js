/* v5.2 頭頂氣泡對話框 */
const BUBK=[
 [/服務生|店員|外場|侍者|服務員/,['歡迎光臨！','請問先生幾位呢？','這邊請入座～','餐點馬上來！','請慢用～','需要加點什麼嗎？']],
 [/收銀|櫃檯|櫃台|行員|售票/,['歡迎光臨！','下一位請過來～','需要袋子嗎？','請問要刷卡還是付現？','謝謝光臨！']],
 [/老闆|攤販|師傅/,['來喔來喔！','今天的貨最新鮮！','要不要試吃看看？','謝謝捧場！']],
 [/髮型師|設計師/,['今天想怎麼剪？','這個髮型很適合你！','水溫可以嗎？']],
 [/護理|醫生|醫師/,['請先掛號喔～','下一號請進。','記得多喝水！']],
 [/教練/,['再一下！你可以的！','注意呼吸！','核心收緊！']],
 [/志工|RITA/,['歡迎來到福音堂！','願你平安～','這邊請坐！']]];
function bubLines(n){if(n.bub!==undefined)return n.bub;let r=null;for(const k of BUBK)if(k[0].test(n.n)){r=k[1];break}n.bub=r;return r}
function drawBubble(g,x,y,s){g.font='bold 7px sans-serif';const w=Math.ceil(g.measureText(s).width)+8,h=12,bx=Math.round(x-w/2),by=Math.round(y-h);
 g.fillStyle='rgba(0,0,0,.25)';g.fillRect(bx+1,by+1,w,h);g.fillStyle='#fffdf4';g.fillRect(bx,by,w,h);g.fillStyle='#3a2210';g.fillRect(bx,by,w,1);g.fillRect(bx,by+h-1,w,1);g.fillRect(bx,by,1,h);g.fillRect(bx+w-1,by,1,h);
 g.fillStyle='#fffdf4';g.fillRect(x-2,by+h-1,4,2);g.fillStyle='#3a2210';g.fillRect(x-3,by+h-1,1,2);g.fillRect(x+2,by+h-1,1,2);g.fillRect(x-1,by+h+1,2,1);
 g.textAlign='center';g.textBaseline='middle';g.fillStyle='#3a2210';g.fillText(s,x,by+h/2+.5);g.textAlign='left';g.textBaseline='alphabetic'}
function drawBubbles(g,t){if(!rm||!rm.ppl)return;const since=t-(rm._bt0===undefined?(rm._bt0=t):rm._bt0);
 rm.ppl.forEach((n,i)=>{if(n.say&&t<n.say.u&&n.say.s){drawBubble(g,n.x+6,n.y-(n.sit?22:30),n.say.s);return}const L=bubLines(n);if(!L||!L.length||n.lying)return;
  let s=null;if(since<3.2&&i===rm.ppl.findIndex(q=>bubLines(q)))s=L[0];
  else{const per=6.5,ph=(t+(n.ph0||0)*1.7+i*2.3)%per;if(ph<2.8)s=L[Math.floor((t+(n.ph0||0)*1.7+i*2.3)/per)%L.length]}
  if(s)drawBubble(g,n.x+6,n.y-(n.sit?22:30),s)})}
