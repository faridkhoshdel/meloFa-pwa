// blueframeAI service worker
// Hand-written and dependency-free on purpose: as of Next.js 16 (Turbopack-by-default),
// both next-pwa and Serwist require falling back to the Webpack build, which trades away
// Turbopack's build speed. A small vanilla service worker keeps the build on Turbopack with
// zero extra dependencies while still satisfying installability + basic offline resilience.

const CACHE_VERSION = "v1";
const CACHE_NAME = `blueframeai-${CACHE_VERSION}`;

const APP_SHELL = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: serve from cache instantly when available, refresh in
// the background, and fall back to the network (or cache) when offline.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
