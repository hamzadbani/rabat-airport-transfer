import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Pricing.css';

const Pricing = () => {
    const { t } = useLanguage();

    const pricingPlans = [
        {
            id: 1,
            slug: 'standard',
            name: t('pricing.standard.name'),
            description: t('pricing.standard.description'),
            category: t('pricing.standard.category'),
            vehicle: t('pricing.standard.vehicle'),
            features: [
                t('pricing.features.driver'),
                t('pricing.features.flightTracking'),
                t('pricing.features.chargers'),
                t('pricing.features.passengers3'),
            ],
            buttonText: t('pricing.buttonStandard'),
            highlighted: false,
        },
        {
            id: 2,
            slug: 'business',
            name: t('pricing.business.name'),
            badge: t('pricing.business.badge'),
            description: t('pricing.business.description'),
            category: t('pricing.business.category'),
            vehicle: t('pricing.business.vehicle'),
            features: [
                t('pricing.features.allStandard'),
                t('pricing.features.wifi'),
                t('pricing.features.privacy'),
                t('pricing.features.passengers3')
            ],
            buttonText: t('pricing.buttonBusiness'),
            highlighted: true,
        },
        {
            id: 3,
            slug: 'premium',
            name: t('pricing.premium.name'),
            description: t('pricing.premium.description'),
            category: t('pricing.premium.category'),
            vehicle: t('pricing.premium.vehicle'),
            features: [
                t('pricing.features.allBusiness'),
                t('pricing.features.champagne'),
                t('pricing.features.audio'),
                t('pricing.features.lighting'),
                t('pricing.features.passengers7')
            ],
            buttonText: t('pricing.buttonPremium'),
            highlighted: false,
        },
    ];

    return (
        <section className="pricing" id="tarifs" aria-label="Nos tarifs et formules premium">
            <div className="pricing-container">
                {/* Section Header */}
                <header className="pricing-header">
                    <p className="pricing-label">{t('pricing.label')}</p>
                    <h2 className="pricing-title">
                        {t('pricing.title')} <span className="highlight">{t('pricing.titleHighlight')}</span>
                    </h2>
                    <p className="pricing-subtitle">
                        {t('pricing.subtitle')}
                    </p>
                </header>

                {/* Pricing Cards */}
                <div className="pricing-grid">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`pricing-card ${plan.highlighted ? 'pricing-card-highlighted' : ''}`}
                        >
                            {/* Badge for Popular Plan */}
                            {plan.badge && (
                                <div className="pricing-badge">{plan.badge}</div>
                            )}

                            {/* Card Header */}
                            <div className="pricing-card-header">
                                <h3 className="pricing-plan-name">{plan.name}</h3>
                                <p className="pricing-plan-description">{plan.description}</p>
                            </div>

                            {/* Vehicle Info */}
                            <div className="pricing-vehicle">
                                <p className="pricing-category">{plan.category}</p>
                                <p className="pricing-vehicle-name">{plan.vehicle}</p>
                            </div>

                            {/* Features List */}
                            <ul className="pricing-features">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="pricing-feature">
                                        <Check size={20} className="pricing-check-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <a
                                href={`#contact?service=${encodeURIComponent(plan.name)}`}
                                className={`pricing-button ${plan.highlighted ? 'pricing-button-highlighted' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                        // Update URL hash
                                        // Map pricing plans to new service types
                                        const serviceMapping: { [key: string]: string } = {
                                            'Standard': 'Service Taxi',
                                            'Business': 'Transport Aeroport',
                                            'Premium': 'Transport Touristique'
                                        };
                                        const serviceType = serviceMapping[plan.name] || '';

                                        window.history.pushState(null, '', `#contact?service=${encodeURIComponent(serviceType)}`);
                                        // Trigger service type selection
                                        setTimeout(() => {
                                            const serviceSelect = document.getElementById('serviceType') as HTMLSelectElement;
                                            if (serviceSelect) {
                                                serviceSelect.value = serviceType;
                                            }
                                        }, 500);
                                    }
                                }}
                            >
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Custom Quote Section */}
                <div className="pricing-custom">
                    <div className="pricing-custom-content">
                        <h2 className="pricing-custom-title">{t('pricing.customQuote.title')}</h2>
                        <p className="pricing-custom-description">
                            {t('pricing.customQuote.description')}
                        </p>
                        <a
                            href="#contact"
                            className="pricing-custom-button"
                            onClick={(e) => {
                                e.preventDefault();
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
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
