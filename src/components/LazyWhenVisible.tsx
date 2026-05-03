import React, { useEffect, useLayoutEffect, useState, useRef, Suspense, type LazyExoticComponent, type ComponentType } from 'react'

type Props = {
  /** Lazy-loaded component (from React.lazy()) — use optional props on the target so `<C />` is valid */
  component: LazyExoticComponent<ComponentType<Record<string, never>>>
  /** Min height of placeholder to avoid layout shift before section loads */
  minHeight?: string | number
  /** IntersectionObserver rootMargin – load a bit before section enters view */
  rootMargin?: string
  /**
   * If set, mount the section when `window.location.hash` starts with this value
   * (e.g. '#contact') so `<a href="#contact">` works before the user scrolls there.
   */
  eagerForHashPrefix?: string
}

/**
 * Renders the lazy component only when its placeholder is in (or near) the viewport.
 * Reduces "All Scripts Complete" time by not loading below-the-fold JS until needed.
 */
const LazyWhenVisible = ({
  component: LazyComponent,
  minHeight = '400px',
  rootMargin = '200px',
  eagerForHashPrefix,
}: Props) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!eagerForHashPrefix || typeof window === 'undefined') return
    const matchHash = () => {
      if (window.location.hash.startsWith(eagerForHashPrefix)) setInView(true)
    }
    matchHash()
    window.addEventListener('hashchange', matchHash)
    return () => window.removeEventListener('hashchange', matchHash)
  }, [eagerForHashPrefix])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setInView(true)
      },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  const height = typeof minHeight === 'number' ? `${minHeight}px` : minHeight

  return (
    <div
      ref={ref}
      className="lazy-section-placeholder"
      style={{ ['--section-min-height']: height } as React.CSSProperties}
    >
      {inView && (
        <Suspense fallback={null}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  )
}

export default LazyWhenVisible
