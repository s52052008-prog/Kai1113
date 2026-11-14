/* App 版：檢查新版本、詢問是否更新、更新後說明新增內容 */
(function(){var CUR=window.APPV,LOG=window.APPLOG||[];
 function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}
 function box(title,items,btns){var o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:2147483600;background:rgba(10,6,24,.72);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Noto Sans TC",sans-serif';
  var c=document.createElement('div');c.style.cssText='background:#fff8e8;border:4px solid #8a5a2e;border-radius:14px;max-width:420px;width:100%;max-height:86vh;overflow:auto;padding:18px 18px 14px;color:#4a2e14;box-shadow:0 8px 0 #5a3418';
  var h='<div style="font-size:19px;font-weight:900;margin-bottom:8px">'+title+'</div>';
  items.forEach(function(g){h+='<div style="font-weight:800;margin:10px 0 4px;color:#a0522d">v'+g.v+(g.date?'　<span style="font-weight:600;font-size:12px;color:#8a6a4a">'+g.date+'</span>':'')+'</div><ul style="margin:0;padding-left:20px;line-height:1.65;font-size:14px">';g.items.forEach(function(t){h+='<li>'+t+'</li>'});h+='</ul>'});
  c.innerHTML=h;var row=document.createElement('div');row.style.cssText='display:flex;gap:10px;margin-top:16px;justify-content:flex-end';
  btns.forEach(function(b){var e=document.createElement('button');e.textContent=b[0];e.style.cssText='font:inherit;font-weight:800;font-size:15px;padding:9px 16px;border-radius:10px;border:3px solid #8a5a2e;cursor:pointer;'+(b[2]?'background:#ff8fb1;color:#fff':'background:#f3e3c3;color:#5a3418');
   e.onclick=function(ev){ev.stopPropagation();o.remove();b[1]&&b[1]()};row.appendChild(e)});c.appendChild(row);o.appendChild(c);
  ['keydown','pointerdown','touchstart','click'].forEach(function(t){o.addEventListener(t,function(ev){ev.stopPropagation()})});
  document.documentElement.appendChild(o)}
 function newer(a,b){a=String(a).split('.').map(Number);b=String(b).split('.').map(Number);for(var i=0;i<Math.max(a.length,b.length);i++){var x=a[i]||0,y=b[i]||0;if(x!=y)return x>y}return false}
 function doUpdate(){var p=[];try{if(window.caches)p.push(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}))}catch(e){}
  try{if(navigator.serviceWorker)p.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.update().catch(function(){})}))}))}catch(e){}
  Promise.all(p).catch(function(){}).then(function(){location.reload()})}
 // 1) 剛更新完：說明這次新增了什麼
 var seen=ls('yl-seen-v');
 function showNew(){if(!CUR)return;if(!seen){ls('yl-seen-v',CUR);return}if(newer(CUR,seen)){var gs=LOG.filter(function(g){return newer(g.v,seen)&&!newer(g.v,CUR)});ls('yl-seen-v',CUR);if(gs.length)box('🎉 已更新到 v'+CUR+'！',gs,[['好，開始玩',null,1]])}}
 // 2) 檢查有沒有新版本
 function check(){fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){if(!j||!newer(j.v,CUR))return;if(ls('yl-skip-v')==j.v&&Date.now()-(+ls('yl-skip-t')||0)<6*3600e3)return;
   var gs=(j.log||[]).filter(function(g){return newer(g.v,CUR)});box('🔔 有新版本 v'+j.v+'！',gs.length?gs:[{v:j.v,items:['一些改進與修正']}],[['稍後再說',function(){ls('yl-skip-v',j.v);ls('yl-skip-t',Date.now())}],['⬇️ 立即更新',doUpdate,1]])}).catch(function(){})}
 function go(){showNew();setTimeout(check,1200)}
 if(document.readyState=='loading')addEventListener('DOMContentLoaded',go);else go();
 document.addEventListener('visibilitychange',function(){if(!document.hidden)check()});
})();
