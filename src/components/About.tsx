import { useState } from 'react';
import { Award, Clock, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import { handleContactClick } from '../lib/scroll-to-contact';
import driverImg from '../assets/client-happy.jpg';
import { assetUrl } from '../lib/asset-url';
import LazyImage from './LazyImage';
import './About.css';

const About = () => {
    const { t } = useLanguage();
    const [showSeoDetails, setShowSeoDetails] = useState(false);

    const stats = [
        { id: 1, value: '10K+', label: t('about.stats.clients') },
        { id: 2, value: '4.9/5', label: t('about.stats.rating') },
        { id: 3, value: '15+', label: t('about.stats.experience') },
        { id: 4, value: '100%', label: t('about.stats.security') },
    ];

    return (
        <section className="about-modern" id="apropos" aria-label="À propos de Rabat Transfert Aéroport">
            {/* Minimalist Headline */}
            <div className="about-modern-headline container">
                <span className="about-modern-tag">{t('about.label')}</span>
                <h2 className="about-modern-title">
                    {t('about.title')} <br />
                    <span className="text-orange">{t('about.titleHighlight')}</span>
                </h2>
                <p className="about-modern-subtitle">{t('about.subtitle')}</p>
            </div>

            {/* Split Editorial Layout */}
            <div className="about-editorial container">
                <div className="about-editorial-image">
                    <LazyImage
                        src={assetUrl(driverImg)}
                        alt={t('about.imageAlt')}
                        rootMargin="280px"
                    />
                    <div className="about-editorial-experience">
                        <span className="number">15</span>
                        <span className="text">Années<br />d'expérience</span>
                    </div>
                </div>

                <div className="about-editorial-content">
                    <h3>
                        {t('about.excellence.title')} <span className="text-orange">{t('about.excellence.titleHighlight')}</span>
                    </h3>
                    <p className="lead">{t('about.excellence.description')}</p>

                    <div className="about-editorial-features">
                        <div className="feature-row">
                            <div className="feature-icon"><Star size={24} /></div>
                            <div>
                                <h4>{t('about.fleet.title')}</h4>
                                <p>{t('about.fleet.description')}</p>
                            </div>
                        </div>
                        <div className="feature-row">
                            <div className="feature-icon"><ShieldCheck size={24} /></div>
                            <div>
                                <h4>{t('about.team.title')}</h4>
                                <p>{t('about.team.description')}</p>
                            </div>
                        </div>
                    </div>

                    <blockquote className="about-quote-modern">
                        "{t('about.excellence.quote')}"
                    </blockquote>

                    <a href="/" className="about-btn-modern" onClick={handleContactClick}>
                        {t('navbar.reserve')} <ArrowRight size={18} />
                    </a>
                </div>
            </div>

            {/* Dark Stats Banner */}
            <div className="about-stats-banner">
                <div className="container stats-grid-modern">
                    {stats.map(stat => (
                        <div key={stat.id} className="stat-item-modern">
                            <div className="stat-value-modern">{stat.value}</div>
                            <div className="stat-label-modern">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us — compact cards */}
            <div className="about-why-modern container">
                <div className="why-header-modern">
                    <h2>
                        {t('about.whyChoose.title')}{' '}
                        <span className="text-orange">{t('about.whyChoose.titleHighlight')}?</span>
                    </h2>
                </div>

                <div className="why-cards-modern">
                    <div className="why-card-modern">
                        <div className="why-icon-modern"><ShieldCheck size={18} strokeWidth={2.25} /></div>
                        <h3>{t('about.whyChoose.security.title')}</h3>
                        <p>{t('about.whyChoose.security.description')}</p>
                    </div>

                    <div className="why-card-modern">
                        <div className="why-icon-modern">
                            <Award size={18} strokeWidth={2.25} aria-hidden />
                        </div>
                        <h3>{t('about.whyChoose.quality.title')}</h3>
                        <p>{t('about.whyChoose.quality.description')}</p>
                    </div>

                    <div className="why-card-modern">
                        <div className="why-icon-modern"><Clock size={18} strokeWidth={2.25} aria-hidden /></div>
                        <h3>{t('about.whyChoose.reference.title')}</h3>
                        <p>{t('about.whyChoose.reference.description')}</p>
                    </div>
                </div>
            </div>

            {/* Minimalist SEO Block */}
            <div className="about-seo-modern container">
                <p>{t('about.seo.brief')}</p>
                <button
                    type="button"
                    className="about-seo-toggle"
                    onClick={() => setShowSeoDetails((prev) => !prev)}
                    aria-expanded={showSeoDetails}
                >
                    {showSeoDetails ? t('about.seo.showLess') : t('about.seo.showMore')}
                </button>

                {showSeoDetails && (
                    <div className="about-seo-details" aria-label="Détails SEO">
                        <p>{t('about.seo.p1')}</p>
                        <p>{t('about.seo.p2')}</p>
                        <p>{t('about.seo.p3')}</p>
                        <p>{t('about.seo.p4')}</p>
                        <p>{t('about.seo.p5')}</p>
                        <p>{t('about.seo.p6')}</p>
                        <p>
                            <a href="/taxi-rabat-aeroport/">Taxi Rabat aéroport (RBA)</a>
                            {' · '}
                            <a href="/taxi-rabat/">Taxi Rabat</a>
                            {' · '}
                            <a href="/rabat-casablanca-taxi/">Rabat ↔ Casablanca</a>
                            {' · '}
                            <a href="/chauffeur-prive-rabat/">Chauffeur privé Rabat</a>
                            {' — '}
                            <a href="#services">{t('navbar.services')}</a>
                            {' · '}
                            <a href="#tarifs">{t('navbar.pricing')}</a>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
