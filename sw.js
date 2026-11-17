const C='cs-v12',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','fonts/inter-400.woff','fonts/inter-600.woff','fonts/inter-700.woff','fonts/inter-800.woff','fonts/poppins-400.woff','fonts/poppins-500.woff','fonts/poppins-700.woff','fonts/lora.woff'];
const put=(r,x)=>{const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))};
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin===location.origin){
if(u.pathname.indexOf('/fonts/')>-1){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok)put(r,x);return x})));return}
e.respondWith(fetch(r,{cache:'no-cache'}).then(x=>{if(x&&x.ok)put(r,x);return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));return}
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))put(r,x);return x}).catch(()=>hit);return hit||net}))});
