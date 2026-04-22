import type { MouseEvent } from 'react';
import { ArrowRight, Car } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import casablancaImg from '../assets/casablanca.jpg';
import {
    SERVICES_DAY_TRIP_IMAGE_URL,
    SERVICES_TOURS_IMAGE_URL,
    SERVICES_TRANSFER_AIRPORT_IMAGE_URL,
} from '../constants/servicesMedia';
import './Services.css';

type ServiceSlug = 'day-trip' | 'tours' | 'transfer-airport' | 'transfer-cities';

const Services = () => {
    const { t } = useLanguage();

    const services: {
        slug: ServiceSlug;
        titleKey: string;
        descriptionKey: string;
        image: string;
    }[] = [
        {
            slug: 'day-trip',
            titleKey: 'services.dayTrip.title',
            descriptionKey: 'services.dayTrip.description',
            image: SERVICES_DAY_TRIP_IMAGE_URL,
        },
        {
            slug: 'tours',
            titleKey: 'services.tours.title',
            descriptionKey: 'services.tours.description',
            image: SERVICES_TOURS_IMAGE_URL,
        },
        {
            slug: 'transfer-airport',
            titleKey: 'services.transferAirport.title',
            descriptionKey: 'services.transferAirport.description',
            image: SERVICES_TRANSFER_AIRPORT_IMAGE_URL,
        },
        {
            slug: 'transfer-cities',
            titleKey: 'services.transferCities.title',
            descriptionKey: 'services.transferCities.description',
            image: casablancaImg,
        },
    ];

    const scrollToContact = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.getElementById('contact');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '#contact');
        } else {
            window.location.hash = 'contact';
        }
    };

    return (
        <section className="services-section" id="services" aria-label={t('services.ariaLabel')}>
            <div className="services-section__decor" aria-hidden />
            <div className="services-section__container">
                <header className="services-section__header">
                    <p className="services-section__label">{t('services.label')}</p>
                    <h2 className="services-section__title">
                        {t('services.title')}{' '}
                        <span className="services-section__title-accent">{t('services.titleHighlight')}</span>
                    </h2>
                    <span className="services-section__title-rule" aria-hidden />
                </header>

                <div className="services-section__grid">
                    {services.map((service) => (
                        <article
                            key={service.slug}
                            id={`service-${service.slug}`}
                            className="services-card"
                        >
                            <div className="services-card__image-wrap">
                                <img
                                    src={service.image}
                                    alt={t(service.titleKey)}
                                    className="services-card__image"
                                    loading="lazy"
                                />
                            </div>
                            <div className="services-card__body">
                                <div className="services-card__badge" aria-hidden>
                                    <Car className="services-card__badge-icon" strokeWidth={2.25} size={26} />
                                    <span className="services-card__badge-text">TAXI</span>
                                </div>
                                <h3 className="services-card__name">{t(service.titleKey)}</h3>
                                <p className="services-card__desc">{t(service.descriptionKey)}</p>
                                <a href="#contact" className="services-card__link" onClick={scrollToContact}>
                                    {t('services.readMore')}
                                    <ArrowRight className="services-card__link-icon" size={18} aria-hidden />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
