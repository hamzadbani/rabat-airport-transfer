/**
 * Rabat Transfert — service worker
 * - Shell: network-first navigations
 * - Images & static assets: stale-while-revalidate (same-origin + allowlisted CDNs)
 * - Elfsight reviews widget: stale-while-revalidate
 */
const STATIC_CACHE = 'rabat-transfert-assets-v2';
const SHELL_CACHE = 'rabat-transfert-shell-v2';

const PRECACHE = [
    '/offline.html',
    '/site.webmanifest',
    '/',
    '/assets/new-logo-taxi-rabat-removebg-preview.png',
    '/assets/paypal.png',
    '/assets/payoneer.png',
];

const IMAGE_HOSTS = [
    'moroccovtc.com',
    'taxiservicemorocco.com',
    'visitmorocco.com',
    'googleusercontent.com',
    'lh3.googleusercontent.com',
];

function isSameOrigin(url) {
    return url.origin === self.location.origin;
}

function isElfsight(url) {
    return (
        url.hostname === 'elfsightcdn.com' ||
        url.hostname.endsWith('.elfsightcdn.com') ||
        url.hostname === 'static.elfsight.com' ||
        url.hostname.endsWith('.elfsight.com') ||
        url.hostname.endsWith('.elfsight.io')
    );
}

function isStaticAsset(url) {
    const p = url.pathname;
    return /\.(?:js|css|png|jpe?g|webp|svg|ico|woff2?|gif|webm|avif|map)$/i.test(p);
}

function isCacheableImage(url) {
    if (isStaticAsset(url)) return true;
    if (url.pathname.startsWith('/assets/')) return true;
    return IMAGE_HOSTS.some(
        (h) => url.hostname === h || url.hostname.endsWith('.' + h),
    );
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
        })(),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys
                    .filter((k) => k !== STATIC_CACHE && k !== SHELL_CACHE)
                    .map((k) => caches.delete(k)),
            );
            await self.clients.claim();
        })(),
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    if (!isSameOrigin(url)) {
        if (isElfsight(url) || isCacheableImage(url)) {
            event.respondWith(staleWhileRevalidate(request));
        }
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(networkFirstShell(request));
        return;
    }

    if (isStaticAsset(url) || isCacheableImage(url)) {
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
            (await shell.match(request)) ||
            (await shell.match('/')) ||
            (await shell.match('/index.html'));
        if (cached) return cached;
        return (await shell.match('/offline.html')) || Response.error();
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    const networkPromise = fetch(request)
        .then((response) => {
            if (response && (response.ok || response.type === 'opaque')) {
                cache.put(request, response.clone()).catch(() => {});
            }
            return response;
        })
        .catch(() => undefined);

    return cached || (await networkPromise) || Response.error();
}
