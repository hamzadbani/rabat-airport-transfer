import {
    SERVICES_DAY_TRIP_IMAGE_URL,
    SERVICES_TOURS_IMAGE_URL,
    SERVICES_TRANSFER_AIRPORT_IMAGE_URL,
    SERVICES_TRANSFER_CITIES_IMAGE_URL,
} from '../constants/servicesMedia';
import { HERO_POSTER_URL } from '../constants/heroPoster';
import { SITE_LOGO_PATH } from '../constants/siteLogo';
import { isElfsightScriptCached, loadElfsightScript } from './elfsight-cache';

const PREFETCH_URLS = [
    SITE_LOGO_PATH,
    HERO_POSTER_URL,
    SERVICES_DAY_TRIP_IMAGE_URL,
    SERVICES_TOURS_IMAGE_URL,
    SERVICES_TRANSFER_AIRPORT_IMAGE_URL,
    SERVICES_TRANSFER_CITIES_IMAGE_URL,
];

let prefetched = false;

/** Warm browser + SW cache for images after first paint (idle). */
export function prefetchSiteImages(): void {
    if (prefetched || typeof window === 'undefined') return;
    prefetched = true;

    const run = () => {
        for (const url of PREFETCH_URLS) {
            const img = new Image();
            img.decoding = 'async';
            img.loading = 'eager';
            img.src = url;
        }
    };

    const schedule = (fn: () => void) => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(fn, { timeout: 5000 });
        } else {
            window.setTimeout(fn, 2500);
        }
    };

    schedule(run);

    if (!isElfsightScriptCached()) {
        schedule(() => {
            loadElfsightScript().catch(() => {});
        });
    }
}
