const CACHE_NAME = 'neuro-cache-v2';
const ASSETS = [
  './index.html',
  './poker.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('intervals.icu') || e.request.url.includes('127.0.0.1')) {
    return;
  }
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});