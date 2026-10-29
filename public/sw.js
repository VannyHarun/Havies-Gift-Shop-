// AURA Fashion Store Service Worker
const CACHE_NAME = 'aura-fashion-cache-v2';
const BASE_URL = new URL('./', self.registration.scope);
const ASSETS_TO_CACHE = [
  BASE_URL.href,
  new URL('index.html', BASE_URL).href,
  new URL('manifest.json', BASE_URL).href,
  new URL('icon.svg', BASE_URL).href
];
const INDEX_URL = new URL('index.html', BASE_URL).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Navigation fallback & cache with network fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(INDEX_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        // Cache images and static assets dynamically if appropriate
        if (
          networkResponse.status === 200 &&
          (event.request.url.startsWith('http') && 
           (event.request.destination === 'image' || event.request.destination === 'font'))
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline if not found
        return caches.match(event.request);
      });
    })
  );
});
