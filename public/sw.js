const CACHE = "iwacu-chef-v1"

const ASSETS = [
  "/",
  "/about",
  "/auth/login",
  "/auth/register",
  "/cart",
  "/my-orders",
  "/offline",
  "/favicon.svg",
]

// Install: pre-cache key pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  )
})

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// Fetch: cache-first for static, network-first for API/navigation
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin
  if (request.method !== "GET" || url.origin !== self.location.origin) return

  // API calls → network first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request))
    return
  }

  // Navigation → stale-while-revalidate
  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Static assets → cache first
  event.respondWith(cacheFirst(request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const res = await fetch(request)
    if (res.ok) {
      const cache = await caches.open(CACHE)
      cache.put(request, res.clone())
    }
    return res
  } catch {
    return new Response("Offline", { status: 503 })
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  try {
    const res = await fetch(request)
    if (res.ok) cache.put(request, res.clone())
    return res
  } catch {
    if (cached) return cached
    return new Response("Offline", { status: 503 })
  }
}

async function networkFirst(request) {
  try {
    const res = await fetch(request)
    return res
  } catch {
    const cached = await caches.match(request)
    return cached || new Response("Offline", { status: 503 })
  }
}
