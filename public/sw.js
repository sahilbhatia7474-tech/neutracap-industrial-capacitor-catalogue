// NeutraCap Service Worker - Lightweight PWA Installability & Performance
const CACHE_NAME = 'neutracap-static-v1';

const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE).catch((err) => {
        console.warn('[NeutraCap SW] Precache non-blocking error:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // CRITICAL SAFETY: Never intercept non-GET requests or video streams/large uploads
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip video streams, blob URLs, data URLs, external CDNs with large media, or API requests
  if (
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.ogg') ||
    url.protocol === 'blob:' ||
    url.protocol === 'data:' ||
    url.pathname.startsWith('/api/') ||
    event.request.headers.get('range')
  ) {
    return; // Passthrough directly to network without caching
  }

  // Network-first with safe cache fallback for app shell assets
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Return fresh network response
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Network unavailable', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});
