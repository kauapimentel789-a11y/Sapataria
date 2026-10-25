/* Service worker: deixa o sistema instalável como app e abre a última versão
   mesmo sem internet. Sempre tenta a rede primeiro, então nunca segura uma versão velha.
   Pedidos para outros sites (Supabase, fontes) passam direto, sem cache. */
const CACHE = 'sapataria-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/config.js'])).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const c = res.clone(); caches.open(CACHE).then(cc => cc.put(req, c)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('/') : Response.error())))
  );
});
