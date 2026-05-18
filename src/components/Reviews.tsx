import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { useIntersection } from '../hooks/useIntersection';
import {
    ELFSIGHT_APP_ID,
    isElfsightScriptCached,
    loadElfsightScript,
} from '../lib/elfsight-cache';
import './Reviews.css';

const Reviews = () => {
    const { t } = useLanguage();
    const [widgetRef, inView] = useIntersection<HTMLDivElement>({
        rootMargin: '400px',
        once: true,
    });
    const [widgetReady, setWidgetReady] = useState(isElfsightScriptCached());
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        if (!inView) return;

        let cancelled = false;

        loadElfsightScript()
            .then(() => {
                if (!cancelled) setWidgetReady(true);
            })
            .catch(() => {
                if (!cancelled) setLoadError(true);
            });

        return () => {
            cancelled = true;
        };
    }, [inView]);

    return (
        <section className="reviews" id="avis" aria-label={t('reviews.ariaLabel')}>
            <div className="reviews-container">
                <header className="reviews-header">
                    <p className="reviews-label">{t('reviews.label')}</p>
                    <h2 className="reviews-title">
                        {t('reviews.title')}{' '}
                        <span className="highlight">{t('reviews.titleHighlight')}</span>
                    </h2>
                    <p className="reviews-subtitle">{t('reviews.subtitle')}</p>
                </header>

                <div
                    ref={widgetRef}
                    className="reviews-elfsight-wrap"
                    data-aos="fade-up"
                    aria-busy={inView && !widgetReady && !loadError}
                >
                    {!inView && (
                        <div className="reviews-widget-placeholder" aria-hidden>
                            <span className="reviews-widget-placeholder__shimmer" />
                        </div>
                    )}

                    {inView && !widgetReady && !loadError && (
                        <div className="reviews-widget-loading" role="status">
                            <span className="reviews-widget-loading__spinner" aria-hidden />
                            <span>{t('reviews.loading')}</span>
                        </div>
                    )}

                    {loadError && (
                        <p className="reviews-widget-error" role="alert">
                            {t('reviews.loadError')}
                        </p>
                    )}

                    {inView && widgetReady && (
                        <div
                            className={`elfsight-app-${ELFSIGHT_APP_ID}`}
                            data-elfsight-app-lazy
                        />
                    )}
                </div>

                <p className="reviews-disclaimer">{t('reviews.disclaimer')}</p>
            </div>
        </section>
    );
};

export default Reviews;
