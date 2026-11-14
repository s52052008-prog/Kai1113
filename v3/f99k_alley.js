/* v13.13 巷弄機車：固定在 3 條巷子來回騎。建築被搬到路線上時，那台機車就先停駛（不會再騎上建築） */
function alleyRect(v){const A=v.al;return v.ax=='x'?{x:A.a0-10,y:A.c-7,w:A.a1-A.a0+20,h:12}:{x:A.c-7,y:A.a0-10,w:12,h:A.a1-A.a0+20}}
function alleyCheck(){try{AV.forEach(v=>{const r=alleyRect(v);const blocked=BALL().some(b=>{const o=b.ua?{x:b.x+b.w/2-b.ua.w/2,y:b.bot-b.ua.h*.35,w:b.ua.w,h:b.ua.h*.35+4}:{x:b.x,y:b.y,w:b.w,h:b.bot-b.y};return hitR(r,o)})||solids.some(s=>s.w>40&&s.h>20&&hitR(r,s));
  const on=TR.includes(v);if(blocked&&on){arrDel(TR,v);v._off=1}else if(!blocked&&!on&&v._off){TR.push(v);v._off=0}})}catch(e){}}
setTimeout(alleyCheck,1500);setInterval(()=>{if(!ED.on)alleyCheck()},3000);
