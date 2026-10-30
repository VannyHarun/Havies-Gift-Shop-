const CACHE_NAME = 'havies-gift-shop-offline-v5';
const BASE_URL = new URL('./', self.registration.scope);
const INDEX_URL = new URL('index.html', BASE_URL).href;
const STANDALONE_URL = new URL('index-standalone.html', BASE_URL).href;
const STATIC_ASSETS = [
  BASE_URL.href,
  INDEX_URL,
  STANDALONE_URL,
  new URL('manifest.json', BASE_URL).href,
  new URL('manifest-standalone.json', BASE_URL).href,
  new URL('standalone.css', BASE_URL).href,
  new URL('havies-icon.svg', BASE_URL).href,
  new URL('vendor/react.production.min.js', BASE_URL).href,
  new URL('vendor/react-dom.production.min.js', BASE_URL).href,
  new URL('vendor/babel.min.js', BASE_URL).href,
  new URL('products/flavie_logo.jpg', BASE_URL).href,
  new URL('products/shared-handbags.jpg', BASE_URL).href,
  ...Array.from({ length: 134 }, (_, index) =>
    new URL(`products/article_${String(index + 1).padStart(3, '0')}.jpg`, BASE_URL).href
  )
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('havies-gift-shop-offline-') && cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseCopy));
        return response;
      }).catch(async () => {
        const cachedPage = await caches.match(request);
        if (cachedPage) return cachedPage;

        const requestedUrl = new URL(request.url);
        const fallbackUrl = requestedUrl.pathname.endsWith('/index-standalone.html')
          ? STANDALONE_URL
          : INDEX_URL;
        const fallbackPage = await caches.match(fallbackUrl);
        if (fallbackPage) return fallbackPage;

        return new Response('Open Havie’s Gift Shop online once to save it for offline use.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then(response => {
        if (response.ok && new URL(request.url).origin === self.location.origin) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseCopy));
        }
        return response;
      });
    })
  );
});
