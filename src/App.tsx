import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SEO from './components/SEO'
import LazyWhenVisible from './components/LazyWhenVisible'
import './App.css'

// Lazy load non-LCP UI to shrink main bundle
const ScrollProgress = lazy(() => import('./components/ScrollProgress'))
const WelcomeAssistant = lazy(() => import('./components/WelcomeAssistant'))

// Below-the-fold: load only when section is near viewport to improve "All Scripts Complete" time
const About = lazy(() => import('./components/About'))
const Reviews = lazy(() => import('./components/Reviews'))
const ShareSection = lazy(() => import('./components/ShareSection'))
const Services = lazy(() => import('./components/Services'))
const Pricing = lazy(() => import('./components/Pricing'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  useEffect(() => {
    document.body.classList.add('js-loaded');
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
    if (document.readyState === 'complete') {
      requestIdleCallback ? requestIdleCallback(initAOS, { timeout: 3000 }) : setTimeout(initAOS, 500);
    } else {
      const onLoad = () => {
        requestIdleCallback ? requestIdleCallback(initAOS, { timeout: 3000 }) : setTimeout(initAOS, 500);
      };
      window.addEventListener('load', onLoad, { once: true });
    }
  }, []);

  return (
    <>
      <SEO />
      <div className="app">
        <Suspense fallback={null}>
          <ScrollProgress />
          <WelcomeAssistant />
        </Suspense>
        <Navbar />
        <Hero />
        <LazyWhenVisible component={About} minHeight={700} />
        <LazyWhenVisible component={Reviews} minHeight={500} />
        <LazyWhenVisible component={ShareSection} minHeight={280} />
        <LazyWhenVisible component={Services} minHeight={800} />
        <LazyWhenVisible component={Pricing} minHeight={600} />
        <LazyWhenVisible component={Contact} minHeight={700} />
        <LazyWhenVisible component={Footer} minHeight={400} />
      </div>
    </>
  )
}

export default App
