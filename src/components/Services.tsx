import { Plane, Briefcase, PartyPopper, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import aeroportImg from '../assets/driver-Aéroport.jpg';
import professionnelImg from '../assets/driver-Professionnel-Entreprise.jpg';
import evenementsImg from '../assets/driver-Événements-Occasions Spéciales.jpg';
import serviceDemandeImg from '../assets/driver-Service-à-la-Demande.jpg';
import './Services.css';

const Services = () => {
    const { t } = useLanguage();
    
    const services = [
        { id: 1, slug: 'airport', icon: Plane, title: t('services.airport.title'), description: t('services.airport.description'), image: aeroportImg },
        { id: 2, slug: 'business', icon: Briefcase, title: t('services.business.title'), description: t('services.business.description'), image: professionnelImg },
        { id: 3, slug: 'events', icon: PartyPopper, title: t('services.events.title'), description: t('services.events.description'), image: evenementsImg },
        { id: 4, slug: 'ondemand', icon: Clock, title: t('services.onDemand.title'), description: t('services.onDemand.description'), image: serviceDemandeImg },
    ];

    return (
        <section className="services" id="services" aria-label="Nos services de transport premium">
            <div className="services-container">
                {/* Section Header */}
                <header className="services-header" data-aos="fade-up">
                    <p className="services-label">{t('services.label')}</p>
                    <h2 className="services-title">
                        {t('services.title')} <span className="highlight">{t('services.titleHighlight')}</span>
                    </h2>
                    <p className="services-subtitle">
                        {t('services.subtitle')}
                    </p>
                </header>

                {/* Services Grid */}
                <div className="services-grid">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={service.id}
                                id={`service-${service.slug}`}
                                className="service-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Background Image */}
                                <div className="service-card-bg">
                                    <img
                                        src={service.image}
                                        alt={service.title ? `${service.title} - Rabat Transfert Aéroport - Transport premium au Maroc` : 'Rabat Transfert Aéroport - Service de transport premium au Maroc'}
                                        loading="lazy"
                                        decoding="async"
                                        width="800"
                                        height="600"
                                        sizes="(max-width: 968px) 100vw, 50vw"
                                    />
                                    <div className="service-card-overlay"></div>
                                </div>

                                {/* Content */}
                                <div className="service-card-content">
                                    <div className="service-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
