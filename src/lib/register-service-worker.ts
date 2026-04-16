const SW_URL = '/service-worker.js';

function isSecureContext(): boolean {
    if (typeof window === 'undefined') return false;
    const { protocol, hostname } = window.location;
    return protocol === 'https:' || hostname === 'localhost' || hostname === '127.0.0.1';
}

/**
 * Registers a lightweight service worker (production by default).
 * Set `VITE_PWA_SW_DEV=1` to test SW on the Vite dev server.
 */
export function registerServiceWorker(): void {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    if (!isSecureContext()) return;
    if (!import.meta.env.PROD && import.meta.env.VITE_PWA_SW_DEV !== '1') return;

    const run = () => {
        navigator.serviceWorker
            .register(SW_URL, { scope: '/', type: 'classic', updateViaCache: 'none' })
            .catch((err) => {
                console.warn('[rabat-transfert] Service worker registration failed:', err);
            });
    };

    if (document.readyState === 'complete') {
        window.setTimeout(run, 0);
    } else {
        window.addEventListener('load', () => window.setTimeout(run, 0), { once: true });
    }
}
