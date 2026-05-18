const PREFIX = 'rabat-transfert-cache:';

type CacheEntry<T> = {
    v: T;
    exp: number;
};

export function cacheGet<T>(key: string): T | null {
    if (typeof localStorage === 'undefined') return null;
    try {
        const raw = localStorage.getItem(PREFIX + key);
        if (!raw) return null;
        const entry = JSON.parse(raw) as CacheEntry<T>;
        if (entry.exp < Date.now()) {
            localStorage.removeItem(PREFIX + key);
            return null;
        }
        return entry.v;
    } catch {
        return null;
    }
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
    if (typeof localStorage === 'undefined') return;
    try {
        const entry: CacheEntry<T> = { v: value, exp: Date.now() + ttlMs };
        localStorage.setItem(PREFIX + key, JSON.stringify(entry));
    } catch {
        /* quota / private mode */
    }
}

export function cacheRemove(key: string): void {
    try {
        localStorage.removeItem(PREFIX + key);
    } catch {
        /* ignore */
    }
}
