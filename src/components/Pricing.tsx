import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import { handleContactClick } from '../lib/scroll-to-contact';
import driverProImage from '../assets/driver-pro.jpg';
import { assetUrl } from '../lib/asset-url';
import LazyImage from './LazyImage';
import './Pricing.css';

const Pricing = () => {
    const { t } = useLanguage();

    const pricingPlans = [
        {
            id: 1,
            slug: 'standard' as const,
            name: t('pricing.standard.name'),
            description: t('pricing.standard.description'),
            category: t('pricing.standard.category'),
            vehicle: t('pricing.standard.vehicle'),
            image: driverProImage,
            imageAlt: t('pricing.standard.imageAlt'),
            features: [
                t('pricing.features.driver'),
                t('pricing.features.flightTracking'),
                t('pricing.features.chargers'),
                t('pricing.features.passengers3'),
            ],
            buttonText: t('pricing.buttonStandard'),
            highlighted: false,
        },
    ];

    return (
        <section className="pricing" id="tarifs" aria-label={t('pricing.label')}>
            <div className="pricing-container">
                <header className="pricing-header">
                    <p className="pricing-label">{t('pricing.label')}</p>
                    <h2 className="pricing-title">
                        {t('pricing.title')} <span className="highlight">{t('pricing.titleHighlight')}</span>
                    </h2>
                    <p className="pricing-subtitle">{t('pricing.subtitle')}</p>
                </header>

                <div className="pricing-grid">
                    {pricingPlans.map((plan) => (
                        <article
                            key={plan.id}
                            className={`pricing-card ${plan.highlighted ? 'pricing-card-highlighted' : ''}`}
                        >
                            <div className="pricing-standard-row">
                                <div className="pricing-col-6 pricing-col-6--media">
                                    <div className="pricing-standard-photo">
                                        <LazyImage
                                            src={assetUrl(plan.image)}
                                            alt={plan.imageAlt}
                                            className="pricing-standard-photo-img"
                                            rootMargin="320px"
                                        />
                                    </div>
                                </div>

                                <div className="pricing-col-6 pricing-col-6--content">
                                    <div className="pricing-standard-body">
                                        <header className="pricing-card-header">
                                            <h3 className="pricing-plan-name">{plan.name}</h3>
                                            <p className="pricing-plan-description">{plan.description}</p>
                                        </header>

                                        <div className="pricing-vehicle">
                                            <p className="pricing-category">{plan.category}</p>
                                            {plan.vehicle ? (
                                                <p className="pricing-vehicle-name">{plan.vehicle}</p>
                                            ) : null}
                                        </div>

                                        <ul className="pricing-features">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="pricing-feature">
                                                    <Check size={20} className="pricing-check-icon" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <a
                                            href="/"
                                            className={`pricing-button ${plan.highlighted ? 'pricing-button-highlighted' : ''}`}
                                            onClick={handleContactClick}
                                        >
                                            {plan.buttonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="pricing-custom">
                    <div className="pricing-custom-content">
                        <h2 className="pricing-custom-title">{t('pricing.customQuote.title')}</h2>
                        <p className="pricing-custom-description">
                            {t('pricing.customQuote.description')}
                        </p>
                        <a
                            href="/"
                            className="pricing-custom-button"
                            onClick={handleContactClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m2 7 8.97 5.7a1.94 1.94 0 0 0 2.06 0L22 7" />
                            </svg>
                            {t('pricing.customQuote.button')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
