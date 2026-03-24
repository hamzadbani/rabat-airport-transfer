import { Award, Clock, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import driverImg from '../assets/driver.jpg';
import './About.css';

const About = () => {
    const { t } = useLanguage();

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
                    <img src={driverImg} alt="Chauffeur professionnel Rabat" loading="lazy" />
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

                    <a href="#contact" className="about-btn-modern">
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

            {/* Asymmetrical Why Choose Us */}
            <div className="about-why-modern container">
                <div className="why-header-modern">
                    <h2>
                        {t('about.whyChoose.title')} <br />
                        <span className="text-orange">{t('about.whyChoose.titleHighlight')}?</span>
                    </h2>
                </div>

                <div className="why-cards-modern">
                    <div className="why-card-modern">
                        <div className="why-icon-modern"><ShieldCheck size={32} /></div>
                        <h3>{t('about.whyChoose.security.title')}</h3>
                        <p>{t('about.whyChoose.security.description')}</p>
                    </div>

                    <div className="why-card-modern mt-large">
                        <div className="why-icon-modern"><Award size={32} /></div>
                        <h3>{t('about.whyChoose.quality.title')}</h3>
                        <p>{t('about.whyChoose.quality.description')}</p>
                    </div>

                    <div className="why-card-modern">
                        <div className="why-icon-modern"><Clock size={32} /></div>
                        <h3>{t('about.whyChoose.reference.title')}</h3>
                        <p>{t('about.whyChoose.reference.description')}</p>
                    </div>
                </div>
            </div>

            {/* Minimalist SEO Block */}
            <div className="about-seo-modern container">
                <p>{t('about.seo.brief')} {t('about.seo.p1')} {t('about.seo.p2')} Visitez la section <a href="#services">{t('navbar.services')}</a> ou découvrez nos <a href="#tarifs">{t('navbar.pricing')}</a>.</p>
            </div>
        </section>
    );
};

export default About;
