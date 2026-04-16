/**
 * Rabat Transfert — lightweight service worker (vanilla).
 * - Precache offline page + shell
 * - Navigations: network-first, fallback to cached "/" then /offline.html
 * - Static assets: stale-while-revalidate
 * - Never intercepts non-GET or cross-origin
 */
const STATIC_CACHE = 'rabat-transfert-assets-v1';
const SHELL_CACHE = 'rabat-transfert-shell-v1';

const PRECACHE = ['/offline.html', '/site.webmanifest', '/'];

function isSameOrigin(url) {
    return url.origin === self.location.origin;
}

function isStaticAsset(url) {
    const p = url.pathname;
    return /\.(?:js|css|png|jpe?g|webp|svg|ico|woff2?|gif|webm|avif|map)$/i.test(p);
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(SHELL_CACHE);
            for (const path of PRECACHE) {
                try {
                    await cache.add(new Request(path, { cache: 'reload' }));
                } catch (e) {
                    console.warn('[rabat-transfert-sw] precache skip:', path, e);
                }
            }
            await self.skipWaiting();
        })()
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.filter((k) => k !== STATIC_CACHE && k !== SHELL_CACHE).map((k) => caches.delete(k))
            );
            await self.clients.claim();
        })()
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (!isSameOrigin(url)) return;

    if (request.mode === 'navigate') {
        event.respondWith(networkFirstShell(request));
        return;
    }

    if (isStaticAsset(url)) {
        event.respondWith(staleWhileRevalidate(request));
    }
});

async function networkFirstShell(request) {
    const shell = await caches.open(SHELL_CACHE);
    try {
        const network = await fetch(request);
        if (network && network.ok && network.type === 'basic') {
            try {
                await shell.put(request, network.clone());
            } catch {
                /* quota */
            }
        }
        return network;
    } catch {
        const cached =
            (await shell.match(request)) || (await shell.match('/')) || (await shell.match('/index.html'));
        if (cached) return cached;
        return (await shell.match('/offline.html')) || Response.error();
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    const networkPromise = fetch(request)
        .then((response) => {
            if (response && response.ok && response.status === 200) {
                cache.put(request, response.clone()).catch(() => {});
            }
            return response;
        })
        .catch(() => undefined);

    return cached || (await networkPromise) || Response.error();
}
