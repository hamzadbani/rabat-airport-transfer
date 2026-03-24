import React, { useEffect, useState, useRef, Suspense, type LazyExoticComponent, type ComponentType } from 'react'

type Props = {
  /** Lazy-loaded component (from React.lazy()) */
  component: LazyExoticComponent<ComponentType<unknown>>
  /** Min height of placeholder to avoid layout shift before section loads */
  minHeight?: string | number
  /** IntersectionObserver rootMargin – load a bit before section enters view */
  rootMargin?: string
}

/**
 * Renders the lazy component only when its placeholder is in (or near) the viewport.
 * Reduces "All Scripts Complete" time by not loading below-the-fold JS until needed.
 */
const LazyWhenVisible = ({
  component: LazyComponent,
  minHeight = '400px',
  rootMargin = '200px',
}: Props) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
