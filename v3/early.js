/* v13.45 手機：聲音解鎖（觸控也能放音樂、iPhone 靜音鍵也有聲音）＋全螢幕 */
(function(){var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;var all=[];
 function W(){var c=new AC(arguments[0]);all.push(c);if(c.state=='suspended')setTimeout(function(){try{c.resume()}catch(e){}},0);return c}
 W.prototype=AC.prototype;try{Object.setPrototypeOf(W,AC)}catch(e){}window.AudioContext=W;if(window.webkitAudioContext)window.webkitAudioContext=W;window.__ACS=all;
 try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
 var silent=null;function unlock(){all.forEach(function(c){if(c.state=='suspended'){try{c.resume()}catch(e){}}});
  try{if(!silent){silent=new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');silent.loop=true;silent.volume=0.01}var p=silent.play();if(p&&p.catch)p.catch(function(){})}catch(e){}
  try{if(typeof bgmWake=='function')bgmWake()}catch(e){}}
 ['touchend','pointerup','click','keydown'].forEach(function(t){addEventListener(t,unlock,true)});
 document.addEventListener('visibilitychange',function(){if(!document.hidden)all.forEach(function(c){if(c.state!='closed'){try{c.resume()}catch(e){}}})});
})();
(function(){var touch=('ontouchstart' in window)||navigator.maxTouchPoints>0;window.fsCan=function(){var d=document.documentElement;return !!(d.requestFullscreen||d.webkitRequestFullscreen)&&document.fullscreenEnabled!==false&&document.webkitFullscreenEnabled!==false};
 window.fsOn=function(){return !!(document.fullscreenElement||document.webkitFullscreenElement)};
 window.fsGo=function(quiet){var d=document.documentElement;try{var r=(d.requestFullscreen||d.webkitRequestFullscreen).call(d,{navigationUI:'hide'});var lk=function(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(function(){})}catch(e){}};if(r&&r.then)r.then(lk).catch(function(){if(!quiet)fsTip()});else lk()}catch(e){if(!quiet)fsTip()}};
 window.fsTip=function(){try{toast(/iPhone|iPod/.test(navigator.userAgent)?'📱 iPhone 不支援網頁全螢幕：把手機橫過來，網址列會自動縮小':'📱 這裡不能全螢幕，請用 Chrome 直接打開這個網址')}catch(e){}};
 if(!touch)return;var tried=false;addEventListener('touchend',function(){if(tried||fsOn())return;tried=true;if(fsCan())fsGo(true)},true);
 addEventListener('DOMContentLoaded',function(){if(!fsCan())return;var b=document.createElement('button');b.id='fsBtn';b.textContent='⛶';b.title='全螢幕';
  b.style.cssText='position:fixed;right:8px;top:calc(env(safe-area-inset-top,0px) + 54px);z-index:2147482000;width:34px;height:34px;border-radius:10px;border:2px solid #8a5a2e;background:rgba(255,248,232,.9);color:#5a3417;font:bold 18px sans-serif;padding:0;touch-action:manipulation';
  b.addEventListener('click',function(e){e.stopPropagation();if(fsOn()){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else if(fsCan())fsGo();else fsTip()});document.body.appendChild(b);
  var upd=function(){b.style.display=fsOn()?'none':'block'};document.addEventListener('fullscreenchange',upd);document.addEventListener('webkitfullscreenchange',upd)})})();

(function(){var st=document.createElement('style');st.textContent='#wrap{width:min(100vw,calc(100dvh*var(--ar,1.6)),'+(((('ontouchstart' in window)||navigator.maxTouchPoints>0))?'1400px':'960px')+')!important}';document.head.appendChild(st);window.__GW=(function(){try{if(!(('ontouchstart' in window)||navigator.maxTouchPoints>0))return 480;var a=Math.max(screen.width,screen.height),b=Math.min(screen.width,screen.height);if(b>700)return 480;return Math.max(480,Math.min(640,Math.round(300*a/b/2)*2))}catch(e){return 480}})();document.documentElement.style.setProperty('--ar',(window.__GW/300).toFixed(4))})();
