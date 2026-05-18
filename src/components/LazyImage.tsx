'use client';

import type { ImgHTMLAttributes } from 'react';
import { useIntersection } from '../hooks/useIntersection';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    /** Load immediately (e.g. logo above the fold). */
    priority?: boolean;
    rootMargin?: string;
};

/**
 * Defers `src` until near viewport + native lazy loading.
 */
const LazyImage = ({
    src,
    alt = '',
    priority = false,
    rootMargin = '240px',
    loading,
    decoding = 'async',
    ...rest
}: LazyImageProps) => {
    const [ref, inView] = useIntersection<HTMLImageElement>({ rootMargin, once: true });
    const shouldLoad = priority || inView;

    return (
        <img
            ref={ref}
            src={shouldLoad && src ? src : undefined}
            alt={alt}
            loading={loading ?? (priority ? 'eager' : 'lazy')}
            decoding={decoding}
            {...rest}
        />
    );
};

export default LazyImage;
