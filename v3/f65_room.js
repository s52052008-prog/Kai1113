/* v11.0 室內造景：「⬛ 挖空（牆外）」地板——刷在房間邊角，就能做出 L 型、凸字型等不規則的房間（像主角家一樣），刷到的地方不能走 */
{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.fillStyle='#1a120c';x.fillRect(0,0,24,24);x.fillStyle='rgba(255,255,255,.05)';x.fillRect(0,0,24,1);
 c.naturalWidth=24;c.naturalHeight=24;c.complete=true;UAI.__void=c;UA.__void=c.toDataURL();EDT.__void='⬛ 挖空（牆外・不能走）';ETS.__void=24;
 // 放在材質清單最前面
 const E2=Object.assign({__void:EDT.__void},EDT);for(const k in EDT)delete EDT[k];Object.assign(EDT,E2)}
const isVoid=(F,ci)=>F&&F[ci]=='__void';
{const _rr=renderRm;renderRm=function(d,n){const F=d._efl;if(!F||d.out||!Object.values(F).includes('__void'))return _rr(d,n);
 const cw=Math.ceil((d.W||320)/8),q0=d.post,wc=d.w||'#8a6a4a';
 // 碰撞：每一列連續的挖空格合併成一塊
 if(d.sol){d.sol=d.sol.filter(s=>!s._vd);const rows={};for(const ci in F)if(F[ci]=='__void'){const cx=ci%cw,cy=Math.floor(ci/cw);(rows[cy]=rows[cy]||[]).push(cx)}
  for(const cy in rows){const xs=rows[cy].sort((a,b)=>a-b);let s0=xs[0],pv=xs[0];const push=(a,b)=>d.sol.push({x:a*8,y:cy*8,w:(b-a+1)*8,h:8,_vd:1});for(let i=1;i<xs.length;i++){if(xs[i]!=pv+1){push(s0,pv);s0=xs[i]}pv=xs[i]}push(s0,pv)}
  for(const ci in F)if(F[ci]=='__void'){const cx=ci%cw,cy=Math.floor(ci/cw);if(!isVoid(F,(cy+1)*cw+cx)&&(cy+1)*8<d.H)d.sol.push({x:cx*8,y:cy*8+8,w:8,h:6,_vd:1})}}
 // 畫：挖空處是深色，下緣畫一段牆面，看起來像房間的外牆
 d.post=(c,W2,H2)=>{q0&&q0(c,W2,H2);for(const ci in F){if(F[ci]!='__void')continue;const cx=ci%cw,cy=Math.floor(ci/cw),x=cx*8,y=cy*8;R(c,x,y,8,8,'#1a120c');
  const below=cy*cw+cw+cx;if(!isVoid(F,below)&&(cy+1)*8<d.H){R(c,x,y+8,8,10,wc);R(c,x,y+8,8,1,'rgba(255,255,255,.25)');R(c,x,y+17,8,1,'rgba(0,0,0,.35)')}
  if(cx>0&&!isVoid(F,ci-1))R(c,x,y,1,8,'rgba(255,255,255,.18)');if(cx<cw-1&&!isVoid(F,ci+1))R(c,x+7,y,1,8,'rgba(0,0,0,.35)')}};
 try{return _rr(d,n)}finally{d.post=q0}}}
// 進房間時套用碰撞（rmBuild 先算碰撞再畫，上面的包裝會一起處理）
