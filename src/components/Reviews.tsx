import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Reviews.css';

/* Elfsight Google Reviews | widget id b0161de8-7a2a-4e36-8294-4dcd04d7e43a */
const ELFSIGHT_PLATFORM = 'https://elfsightcdn.com/platform.js';

function ensureElfsightScript(): void {
    if (typeof document === 'undefined') return;
    if (document.querySelector(`script[src="${ELFSIGHT_PLATFORM}"]`)) return;
    const s = document.createElement('script');
    s.src = ELFSIGHT_PLATFORM;
    s.async = true;
    document.body.appendChild(s);
}

const Reviews = () => {
    const { t } = useLanguage();

    useEffect(() => {
        ensureElfsightScript();
    }, []);

    return (
        <section className="reviews" id="avis" aria-label={t('reviews.ariaLabel')}>
            <div className="reviews-container">
                <header className="reviews-header">
                    <p className="reviews-label">{t('reviews.label')}</p>
                    <h2 className="reviews-title">
                        {t('reviews.title')} <span className="highlight">{t('reviews.titleHighlight')}</span>
                    </h2>
                    <p className="reviews-subtitle">{t('reviews.subtitle')}</p>
                </header>

                <div className="reviews-elfsight-wrap" data-aos="fade-up">
                    <div
                        className="elfsight-app-b0161de8-7a2a-4e36-8294-4dcd04d7e43a"
                        data-elfsight-app-lazy
                    />
                </div>

                <p className="reviews-disclaimer">{t('reviews.disclaimer')}</p>
            </div>
        </section>
    );
};

export default Reviews;
