/* v13.61 卡住修正
   1) 戶外：出門後如果站在障礙物裡，往附近空地推出去
   2) 畫面上已經沒有任何全螢幕視窗，卻還被「鎖住不能動」→ 2 秒後自動解鎖
   3) 走路的 NPC 停下來時一律雙腳站好 */
function unstuckOut(){if(scene||(typeof ED!='undefined'&&ED.on))return;if(!staticBlk())return;const ox=p.x,oy=p.y;
 for(let r=4;r<=120;r+=4)for(let a=0;a<16;a++){const t=a/16*6.2832;p.x=ox+Math.cos(t)*r;p.y=oy+Math.sin(t)*r;if(!staticBlk())return}p.x=ox;p.y=oy}
{const _x=exitTown;exitTown=function(){const r=_x.apply(this,arguments);try{unstuckOut()}catch(e){}return r}}
let __lockT=0;
setInterval(()=>{try{if(!window.TITLE||MG){__lockT=0;return}
 const ov=[...document.body.children].some(e=>{const cs=getComputedStyle(e);return cs.position=='fixed'&&+cs.zIndex>=9000&&e.offsetWidth>200&&cs.display!='none'&&cs.visibility!='hidden'&&+cs.opacity>0.05&&e.id!='bootLoad'});
 if(ov){__lockT=0;return}if(++__lockT>=4){window.TITLE=false;window.OVL=0;__lockT=0;Object.keys(keys).forEach(k=>keys[k]=0)}}catch(e){}},500);
// 被擋住時原地站好，不再左右來回閃
{const _uw=updateWorld;updateWorld=function(dt){_uw.apply(this,arguments);try{NP.forEach(n=>{if(n.walk||n.still||n.b=='loop')return;if(!n.vx&&!n.vy)n.mv=false})}catch(e){}}}
