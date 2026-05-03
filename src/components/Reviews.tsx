import { useEffect } from 'react';
import { useLanguage } from '../contexts/useLanguage';
import './Reviews.css';

/* Elfsight Google Reviews | Taxi Rabat Airoport — app 851803ef-af1a-41aa-8c98-2ee07489ede3 */
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
                    {/* Elfsight Google Reviews | Taxi Rabat Airoport */}
                    <div
                        className="elfsight-app-851803ef-af1a-41aa-8c98-2ee07489ede3"
                        data-elfsight-app-lazy
                    />
                </div>

                <p className="reviews-disclaimer">{t('reviews.disclaimer')}</p>
            </div>
        </section>
    );
};

export default Reviews;
