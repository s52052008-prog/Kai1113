/* v13.13 右上角資訊欄、任務欄字體清晰：像素字型只在 11 的整數倍大小才銳利，依目前放大倍率換算字級 */
{const s=document.createElement('style');s.textContent=`
#tm,#tm *{text-shadow:none!important}
#tm{font-size:var(--crisp,12px)!important;line-height:1.35!important}
#tm *{font-size:inherit!important}
#qp{font-size:var(--crisp,12px)!important}
#qp *:not(button):not(img){font-size:inherit!important;text-shadow:none!important}
#qp button{font-size:var(--crisp,12px)!important}
#hud .hudtxt,#hud b,#hud span{text-shadow:none!important}`;document.head.appendChild(s)}
function crispFit(){const k=(VIEW.big?VIEW.s:1)*(VIEW.f||1),n=Math.max(1,Math.round(12*k/11)),px=11*n/k;document.documentElement.style.setProperty('--crisp',px.toFixed(4)+'px')}
{const _v=viewFit;viewFit=function(){_v.apply(this,arguments);crispFit()}}
addEventListener('resize',crispFit);crispFit();
