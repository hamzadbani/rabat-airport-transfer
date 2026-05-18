'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

type Options = {
    rootMargin?: string;
    threshold?: number;
    once?: boolean;
};

export function useIntersection<T extends HTMLElement = HTMLDivElement>({
    rootMargin = '200px',
    threshold = 0,
    once = true,
}: Options = {}): [RefObject<T | null>, boolean] {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || (once && triggered.current)) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                triggered.current = true;
                setInView(true);
                if (once) observer.disconnect();
            },
            { rootMargin, threshold },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin, threshold, once]);

    return [ref, inView];
}
