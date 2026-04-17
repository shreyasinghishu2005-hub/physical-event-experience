self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("eventmate-static-v1").then((cache) =>
      cache.addAll(["/", "/manifest.json"])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
