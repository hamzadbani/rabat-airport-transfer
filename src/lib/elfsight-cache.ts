import { cacheGet, cacheSet } from './browser-cache';

/** Elfsight platform script — singleton load + persistent cache (7 days). */
export const ELFSIGHT_SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';
export const ELFSIGHT_APP_ID = '851803ef-af1a-41aa-8c98-2ee07489ede3';

const CACHE_KEY = 'elfsight-ready';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

let loadPromise: Promise<void> | null = null;

export function isElfsightScriptCached(): boolean {
    return cacheGet<boolean>(CACHE_KEY) === true;
}

/** Load platform.js once per session; subsequent calls reuse the same promise. */
export function loadElfsightScript(): Promise<void> {
    if (typeof document === 'undefined') {
        return Promise.resolve();
    }

    if (document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)) {
        markElfsightReady();
        return Promise.resolve();
    }

    if (loadPromise) return loadPromise;

    loadPromise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = ELFSIGHT_SCRIPT_SRC;
        script.async = true;
        script.onload = () => {
            markElfsightReady();
            resolve();
        };
        script.onerror = () => {
            loadPromise = null;
            reject(new Error('Elfsight script failed to load'));
        };
        document.head.appendChild(script);
    });

    return loadPromise;
}

function markElfsightReady(): void {
    cacheSet(CACHE_KEY, true, CACHE_TTL_MS);
}
