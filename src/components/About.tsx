import { useState } from 'react';
import { Car, Users, Award, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import driverImg from '../assets/driver.jpg';
import './About.css';

const About = () => {
    const { t } = useLanguage();
    const [seoExpanded, setSeoExpanded] = useState(false);

    const features = [
        {
            id: 1,
            icon: Car,
            title: t('about.fleet.title'),
            description: t('about.fleet.description'),
        },
        {
            id: 2,
            icon: Users,
            title: t('about.team.title'),
            description: t('about.team.description'),
        },
    ];

    const stats = [
        {
            id: 1,
            icon: Users,
            value: '10 000+',
            label: t('about.stats.clients'),
        },
        {
            id: 2,
            icon: Award,
            value: '4,9/5',
            label: t('about.stats.rating'),
        },
        {
            id: 3,
            icon: Award,
            value: '15+',
            label: t('about.stats.experience'),
        },
        {
            id: 4,
            icon: Shield,
            value: '100%',
            label: t('about.stats.security'),
        },
    ];

    return (
        <section className="about" id="apropos" aria-label="À propos de Rabat Transfert Aéroport">
            <div className="about-container">
                {/* Section Header (centered, like Services / Pricing) */}
                <header className="about-header">
                    <p className="about-label">{t('about.label')}</p>
                    <h2 className="about-header-title">
                        {t('about.title')} <span className="highlight">{t('about.titleHighlight')}</span>
                    </h2>
                    <p className="about-subtitle">{t('about.subtitle')}</p>
                </header>

                {/* SEO intro: brief by default, expand for full details */}
                <div className="about-seo">
                    <p className="about-seo-brief">{t('about.seo.brief')}</p>
                    <p className="about-seo-links">
                        {t('about.seo.discoverLinksBefore')}
                        <a href="#services">{t('navbar.services')}</a>
                        {t('about.seo.discoverLinksMiddle')}
                        <a href="#tarifs">{t('navbar.pricing')}</a>
                        {t('about.seo.discoverLinksAfter')}
                    </p>
                    {!seoExpanded ? (
                        <button
                            type="button"
                            className="about-seo-toggle"
                            onClick={() => setSeoExpanded(true)}
                            aria-expanded={false}
                            aria-label={t('about.seo.showMore')}
                        >
                            {t('about.seo.showMore')}
                            <ChevronDown size={18} />
                        </button>
                    ) : (
                        <>
                            <div className="about-seo-details">
                                <p>{t('about.seo.p1')}</p>
                                <p>{t('about.seo.p2')}</p>
                                <p>{t('about.seo.p3')}</p>
                                <p>{t('about.seo.p4')}</p>
                                <p>{t('about.seo.p5')}</p>
                                <p>{t('about.seo.p6')}</p>
                            </div>
                            <button
                                type="button"
                                className="about-seo-toggle"
                                onClick={() => setSeoExpanded(false)}
                                aria-expanded={true}
                                aria-label={t('about.seo.showLess')}
                            >
                                {t('about.seo.showLess')}
                                <ChevronUp size={18} />
                            </button>
                        </>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="about-content">
                    {/* Left Side - Text Content */}
                    <div className="about-text">
                        <h2 className="about-title">
                            {t('about.excellence.title')} <span className="highlight">{t('about.excellence.titleHighlight')}</span>
                        </h2>

                        <div className="about-description">
                            <p>
                                {t('about.excellence.description')}{' '}
                                <a href="#contact">{t('about.excellence.reserveLink')}</a>
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="about-features">
                            {features.map((feature) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div key={feature.id} className="about-feature">
                                        <div className="about-feature-icon">
                                            <IconComponent size={20} />
                                        </div>
                                        <div className="about-feature-content">
                                            <h3 className="about-feature-title">{feature.title}</h3>
                                            <p className="about-feature-description">{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quote Box */}
                        <div className="about-quote">
                            <p>
                                <strong>{t('about.excellence.quote')}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="about-image">
                        <img
                            src={driverImg}
                            alt="Chauffeur professionnel Rabat Transfert Aéroport - Transport premium au Maroc depuis 2009"
                            loading="lazy"
                            decoding="async"
                            width="600"
                            height="400"
                            sizes="(max-width: 1100px) 100vw, 50vw"
                        />
                        <div className="about-badge" aria-label={`15+ ${t('about.excellence.badge')}`}>
                            <div className="about-badge-value">15+</div>
                            <div className="about-badge-label">{t('about.excellence.badge')}</div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Section */}
                <div className="about-why-choose">
                    <h2 className="about-why-title">
                        {t('about.whyChoose.title')} <span className="highlight">{t('about.whyChoose.titleHighlight')}</span>?
                    </h2>
                    <div className="about-why-grid">
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Shield size={28} />
                            </div>
                            <h3 className="about-why-card-title">{t('about.whyChoose.security.title')}</h3>
                            <p className="about-why-card-description">
                                {t('about.whyChoose.security.description')}
                            </p>
                        </div>
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Award size={28} />
                            </div>
                            <h3 className="about-why-card-title">{t('about.whyChoose.quality.title')}</h3>
                            <p className="about-why-card-description">
                                {t('about.whyChoose.quality.description')}
                            </p>
                        </div>
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Award size={28} />
                            </div>
                            <h3 className="about-why-card-title">{t('about.whyChoose.reference.title')}</h3>
                            <p className="about-why-card-description">
                                {t('about.whyChoose.reference.description')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="about-stats">
                    {stats.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={stat.id} className="about-stat-card">
                                <div className="about-stat-icon">
                                    <IconComponent size={28} />
                                </div>
                                <div className="about-stat-value">{stat.value}</div>
                                <div className="about-stat-label">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
