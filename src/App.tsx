import { useEffect, lazy, Suspense } from 'react'
import { scrollToContact } from './lib/scroll-to-contact'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SEO from './components/SEO'
import { PwaInstallPrompt } from './components/PwaInstallPrompt'
import { MobileReserveBar } from './components/MobileReserveBar'
import LazyWhenVisible from './components/LazyWhenVisible'
import { prefetchSiteImages } from './lib/prefetch-assets'
import './App.css'

// Lazy load non-LCP UI to shrink main bundle
const ScrollProgress = lazy(() => import('./components/ScrollProgress'))
const WhatsAppQuickPopup = lazy(() => import('./components/WhatsAppQuickPopup'))

// Below-the-fold: load only when section is near viewport to improve "All Scripts Complete" time
const About = lazy(() => import('./components/About'))
const Reviews = lazy(() => import('./components/Reviews'))
const ShareSection = lazy(() => import('./components/ShareSection'))
const Services = lazy(() => import('./components/Services'))
const Pricing = lazy(() => import('./components/Pricing'))
const HomeFaq = lazy(() => import('./components/HomeFaq'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  useEffect(() => {
    document.body.classList.add('js-loaded');
  }, []);

  useEffect(() => {
    if (document.readyState === 'complete') {
      prefetchSiteImages();
    } else {
      window.addEventListener('load', prefetchSiteImages, { once: true });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash.startsWith('#contact')) return;
    window.history.replaceState(null, '', window.location.pathname);
    scrollToContact();
  }, []);

  useEffect(() => {
    // Defer AOS until after load or first scroll so it doesn't delay "All Scripts Complete"
    const initAOS = () => {
      Promise.all([
        import('aos/dist/aos.css'),
        import('aos'),
      ]).then(([, aos]) => {
        aos.default.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100,
          delay: 100,
        });
      });
    };
    const scheduleIdle = (fn: () => void) => {
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(fn, { timeout: 3000 });
      } else {
        setTimeout(fn, 500);
      }
    };
    if (document.readyState === 'complete') {
      scheduleIdle(initAOS);
    } else {
      const onLoad = () => {
        scheduleIdle(initAOS);
      };
      window.addEventListener('load', onLoad, { once: true });
    }
  }, []);

  return (
    <>
      <SEO />
      <div className="app">
        <PwaInstallPrompt />
        <MobileReserveBar />
        <Suspense fallback={null}>
          <ScrollProgress />
          <WhatsAppQuickPopup />
        </Suspense>
        <Navbar />
        <Hero />
        <LazyWhenVisible component={About} minHeight={700} />
        <LazyWhenVisible component={Reviews} minHeight={500} eagerForHashPrefix="#avis" />
        <LazyWhenVisible component={ShareSection} minHeight={280} />
        <LazyWhenVisible component={Services} minHeight={800} />
        <LazyWhenVisible component={Pricing} minHeight={600} />
        <LazyWhenVisible component={HomeFaq} minHeight={400} />
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
        <LazyWhenVisible component={Footer} minHeight={400} />
      </div>
    </>
  )
}

export default App
