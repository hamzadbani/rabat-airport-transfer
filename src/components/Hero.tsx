import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

const HERO_VIDEO_SRC = '/hero-video.mp4';

const Hero = () => {
    const { t } = useLanguage();
    const [isLoaded, setIsLoaded] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const t1 = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(t1);
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;
        const el = videoRef.current;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e?.isIntersecting && !videoReady) setVideoReady(true);
            },
            { rootMargin: '50px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [videoReady]);

    useEffect(() => {
        if (!videoReady || !videoRef.current) return;
        const el = videoRef.current;
        el.load();
        const p = el.play();
        if (p?.catch) p.catch(() => {});
    }, [videoReady]);

    return (
        <section className="hero" id="accueil" aria-label="Section principale - Rabat Transfert Aéroport">
            {/* Background Video - lazy-loaded to avoid blocking LCP and fix ERR_CONNECTION_FAILED (path without space) */}
            <video
                ref={videoRef}
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/logo.png"
                width={1920}
                height={1080}
                aria-label="Vidéo de présentation Rabat Transfert Aéroport - Transport premium au Maroc"
            >
                {videoReady && <source src={HERO_VIDEO_SRC} type="video/mp4" />}
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Dark Overlay */}
            <div className="hero-overlay" aria-hidden="true"></div>

            {/* Content */}
            <div className={`hero-content ${isLoaded ? 'hero-content-loaded' : ''}`}>
                <header className="hero-text">
                    <p className="hero-subtitle">{t('hero.subtitle')}</p>
                    <h1 className="hero-title">{t('hero.title')}<br className="hero-title-br" />{t('hero.titleLine2')}</h1>
                </header>

                <div className="hero-right">
                    <div className="hero-cta">
                        <a href="#contact" className="btn-reserve" aria-label={`${t('hero.cta')} - Rabat Transfert Aéroport`}>
                            {t('hero.cta')}
                        </a>
                        <a href="#tarifs" className="hero-cta-secondary">
                            {t('hero.ctaPricing')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
