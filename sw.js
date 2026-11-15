// 停用離線快取：清掉所有舊快取並自行解除註冊（舊版快取會讓 iPhone 白畫面）
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())await caches.delete(k);await self.registration.unregister();for(const c of await self.clients.matchAll({type:'window'}))c.navigate(c.url)})()));
