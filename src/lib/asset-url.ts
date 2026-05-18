type StaticImageData = { src: string; width?: number; height?: number };

/** Resolve Vite string imports or Next/Turbopack static image objects. */
export function assetUrl(module: string | StaticImageData): string {
    return typeof module === 'string' ? module : module.src;
}
