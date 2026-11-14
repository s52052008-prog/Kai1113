# 打包成「網頁 App」(PWA)：可加到手機主畫面、全螢幕開啟、離線快取
import json,os,shutil,glob,re
SP='/tmp/claude-0/-home-claude/b29ee7d0-5160-55a2-85eb-c3b9d9b89065/scratchpad/'
D='/home/claude/pwa';os.makedirs(D+'/pk',exist_ok=True)
h=open('/home/claude/v3/out.html',encoding='utf8').read()
# 1) 把雲端上最新的地圖烤進去
mp=json.load(open(SP+'dbmap/world/map/parts/p0.json'))
mp=mp.get('data',mp)['s'];json.loads(mp)
i=h.index('const MAP_BAKED=')+len('const MAP_BAKED=');obj,end=json.JSONDecoder().raw_decode(h,i)
h=h[:i]+mp+h[end:]
# 2) 標題、App 設定
h=h.replace('<title>Allen 的像素小鎮 v3</title>','<title>家有冠宏，宜樂無窮</title>',1)
head='''<link rel="manifest" href="manifest.json"><meta name="theme-color" content="#140c24">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="宜樂無窮">
<link rel="apple-touch-icon" href="icon-180.png"><link rel="icon" href="icon-192.png">
<script>window.APPV=%s;window.APPLOG=%s;</script><script>'''+open('/home/claude/v3/upd.js',encoding='utf8').read()+'''</script>
<script>if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})</script>
<style>html,body{background:#070614;overscroll-behavior:none;overflow:hidden;max-width:100vw}canvas{max-width:100vw}@media (display-mode:standalone){body{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}}</style>
'''
LOG=json.load(open('/home/claude/v3/changelog.json',encoding='utf8'));head=head.replace('window.APPV=%s;window.APPLOG=%s;','window.APPV=%s;window.APPLOG=%s;'%(json.dumps(LOG[0]['v']),json.dumps(LOG,ensure_ascii=False)))
h=h.replace('</head>',head+'</head>',1)
json.dump({'v':LOG[0]['v'],'log':LOG},open(D+'/version.json','w',encoding='utf8'),ensure_ascii=False)
# 3) 大檔案拆出去：首頁變很小，圖片和程式分開下載、各自快取（斷線重開不用從頭來）
g0=h.index('<script id="GAMEJS" type="text/x-game">')+len('<script id="GAMEJS" type="text/x-game">');g1=h.index('</script>',g0)
open(D+'/game.js','w',encoding='utf8').write(h[g0:g1]);h=h[:g0]+h[g1:]
assert "s.textContent=document.getElementById('GAMEJS').textContent" in h
h=h.replace("s.textContent=document.getElementById('GAMEJS').textContent","s.src='game.js'",1)
a=h.index('<script src="pk/pk_index.js"></script><script>')+len('<script src="pk/pk_index.js"></script><script>');b=h.index('\nwindow.UAI={};',a)
ua=h[a:b];parts=[];cur='';import re as _r
for chunk in _r.split(r'(?=Object\.assign\(UA,)',ua):
    if len(cur)+len(chunk)>3500000 and cur:parts.append(cur);cur=''
    cur+=chunk
if cur:parts.append(cur)
parts=[_r.sub(r'(^|;|\})(\s*)(?:const|let) (UA|UAM|LFMETA)\s*=',r'\1\2var \3=',pt) for pt in parts]
os.makedirs(D+'/ua',exist_ok=True)
for f in glob.glob(D+'/ua/*.js'):os.remove(f)
tags=''
for i,pt in enumerate(parts):
    open(D+'/ua/ua%d.js'%i,'w',encoding='utf8').write(pt);tags+='<script src="ua/ua%d.js"></script>'%i
e=h.index('</script>',b);LOADER=h[b:e]
sizes=[len(pt.encode('utf8')) for pt in parts]
ldr='''<script>(function(){var F=%s,Z=%s,T=Z.reduce(function(a,b){return a+b},0),got=F.map(function(){return 0}),txt=[];window.__bf=0;
function tip(){var n=got.reduce(function(a,b){return a+b},0);window.__bf=n/T;var e=document.getElementById('bootTip');if(e)e.innerHTML='🎁 禮物下載中…… '+(n/1048576).toFixed(1)+' / '+(T/1048576).toFixed(1)+' MB<br>第一次打開比較久，建議連 Wi-Fi<br>下載過的部分會存起來，中斷了重開會接著下載'}
function get(i){return fetch(F[i]).then(function(r){if(!r.body||!window.TextDecoder)return r.text().then(function(t){got[i]=Z[i];tip();return t});var rd=r.body.getReader(),dec=new TextDecoder(),out='';
 function pump(){return rd.read().then(function(x){if(x.done){got[i]=Z[i];tip();return out+dec.decode()}got[i]+=x.value.length;tip();out+=dec.decode(x.value,{stream:true});return pump()})}return pump()}).catch(function(){return new Promise(function(res){setTimeout(function(){res(get(i))},1500)})})}
tip();Promise.all(F.map(function(f,i){return get(i)})).then(function(ts){var k=0;(function nx(){if(k<ts.length){(0,eval)(ts[k]);ts[k++]=null;setTimeout(nx,30)}else (0,eval)(%s)})()})})();</script>'''%(json.dumps(['ua/ua%d.js'%i for i in range(len(parts))]),json.dumps(sizes),json.dumps(LOADER))
h=h[:a-len('<script>')]+ldr+h[e+len('</script>'):]
pre=''.join('<link rel="preload" as="script" href="ua/ua%d.js">'%i for i in range(len(parts)))+'<link rel="preload" as="script" href="game.js">'
h=h.replace('</head>',pre+'</head>',1)
open(D+'/index.html','w',encoding='utf8').write(h)
UAF=['ua/ua%d.js'%i for i in range(len(parts))]
for f in glob.glob('/home/claude/v3/pk/d*.js')+['/home/claude/v3/pk/pk_index.js']:shutil.copy(f,D+'/pk/')
files=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-180.png']
ver=str(int(os.path.getmtime('/home/claude/v3/out.html')))
json.dump({"name":"家有冠宏，宜樂無窮","short_name":"宜樂無窮","start_url":"./","scope":"./","display":"fullscreen","orientation":"landscape","background_color":"#070614","theme_color":"#140c24",
 "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]},open(D+'/manifest.json','w'),ensure_ascii=False)
open(D+'/sw.js','w').write('''const C='yl-%s',PRE=%s;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||r.url.includes('version.json'))return;
 if(r.mode=='navigate'){const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp))}return res});e.waitUntil(net.catch(()=>{}));e.respondWith(caches.match('index.html').then(m=>m||net));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type=='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
'''%(ver,json.dumps(files)))
open(D+'/.nojekyll','w').write('')
print('ok index',round(len(h)/1e6,2),'MB ua parts',len(parts))
