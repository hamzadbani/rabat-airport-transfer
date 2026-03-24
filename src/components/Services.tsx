import { Plane, Briefcase, PartyPopper, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import aeroportImg from '../assets/driver-Aéroport.jpg';
import professionnelImg from '../assets/driver-Professionnel-Entreprise.jpg';
import evenementsImg from '../assets/driver-Événements-Occasions Spéciales.jpg';
import serviceDemandeImg from '../assets/driver-Service-à-la-Demande.jpg';
import './Services.css';

const Services = () => {
    const { t } = useLanguage();

    const services = [
        { id: '01', slug: 'airport', icon: Plane, title: t('services.airport.title'), description: t('services.airport.description'), image: aeroportImg },
        { id: '02', slug: 'business', icon: Briefcase, title: t('services.business.title'), description: t('services.business.description'), image: professionnelImg },
        { id: '03', slug: 'events', icon: PartyPopper, title: t('services.events.title'), description: t('services.events.description'), image: evenementsImg },
        { id: '04', slug: 'ondemand', icon: Clock, title: t('services.onDemand.title'), description: t('services.onDemand.description'), image: serviceDemandeImg },
    ];

    return (
        <section className="services-modern" id="services" aria-label="Nos services de transport premium">
            <div className="services-modern-container">
                {/* Minimalist Header */}
                <header className="services-modern-header">
                    <span className="services-modern-tag">{t('services.label')}</span>
                    <h2 className="services-modern-title">
                        {t('services.title')} <br />
                        <span className="text-gold">{t('services.titleHighlight')}</span>
                    </h2>
                    <p className="services-modern-subtitle">
                        {t('services.subtitle')}
                    </p>
                </header>

                {/* Lookbook Grid */}
                <div className="services-lookbook">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        const isEven = index % 2 !== 0; // Alternating layout
                        return (
                            <div
                                key={service.id}
                                id={`service-${service.slug}`}
                                className={`lookbook-row ${isEven ? 'reverse' : ''}`}
                            >
                                <div className="lookbook-image">
                                    <div className="lookbook-image-wrapper">
                                        <img
                                            src={service.image}
                                            alt={`${service.title} - Rabat Transfert Aéroport`}
                                            loading="lazy"
                                        />
                                        <div className="lookbook-number">{service.id}</div>
                                    </div>
                                </div>

                                <div className="lookbook-content">
                                    <div className="lookbook-icon">
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="lookbook-title">{service.title}</h3>
                                    <p className="lookbook-description">{service.description}</p>

                                    <a href="#contact" className="lookbook-btn">
                                        Réserver ce service <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Abstract Background Element */}
            <div className="services-bg-ornament"></div>
        </section>
    );
};

export default Services;
