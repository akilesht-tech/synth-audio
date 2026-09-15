const CACHE='synth-audio-shell-v25';
const ASSETS=['/','/index.html','/style.css','/app.js','/manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('synth-audio-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  if(u.pathname.startsWith('/uploads/')||u.pathname.startsWith('/api/')||e.request.headers.has('range'))return;
  // Network-first for app code so fixes appear immediately; cache is the offline fallback.
  if(['/','/index.html','/app.js','/style.css','/manifest.json'].includes(u.pathname)){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/'))));
    return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
