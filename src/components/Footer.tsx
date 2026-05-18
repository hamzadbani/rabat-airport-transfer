import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import { handleContactClick } from '../lib/scroll-to-contact';
import ObfuscatedEmail, { CONTACT_EMAIL_ENCODED, ObfuscatedEmailDisplay } from './ObfuscatedEmail';
import ShareButtons from './ShareButtons';
import { SITE_LOGO_PATH } from '../constants/siteLogo';
import LazyImage from './LazyImage';
import './Footer.css';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: t('navbar.home'), href: '#accueil' },
        { name: t('navbar.about'), href: '#apropos' },
        { name: t('navbar.reviews'), href: '#avis' },
        { name: t('navbar.services'), href: '#services' },
        { name: t('navbar.pricing'), href: '#tarifs' },
        { name: t('navbar.contact'), href: '/' },
    ];

    const serviceLinks = [
        { name: t('services.dayTrip.title'), href: '#service-day-trip' },
        { name: t('services.tours.title'), href: '#service-tours' },
        { name: t('services.transferAirport.title'), href: '#service-transfer-airport' },
        { name: t('services.transferCities.title'), href: '#service-transfer-cities' },
        { name: t('services.privateDriver'), href: '#services' },
    ];

    const contactInfo = [
        {
            icon: MapPin,
            title: t('footer.address'),
            content: t('footer.addressValue'),
        },
        {
            icon: Phone,
            title: t('footer.phone'),
            content: '+212 6 745 459 39',
            link: 'tel:+212674545939',
        },
        {
            icon: Mail,
            title: t('footer.email'),
            content: null,
            link: null,
            isEmail: true,
        },
        {
            icon: Clock,
            title: t('footer.hours'),
            content: t('footer.hoursValue'),
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://www.facebook.com/share/187AWL3tu6', label: 'Facebook' },
        { icon: Instagram, href: 'https://www.instagram.com/taxi__aeroport', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-column footer-about">
                        <LazyImage
                            src={SITE_LOGO_PATH}
                            alt="Taxi Rabat Airport — Rabat Transfert Aéroport"
                            className="footer-logo"
                            width={358}
                            height={102}
                            rootMargin="400px"
                        />
                        <h3 className="footer-company-name">Rabat Transfert Aéroport</h3>
                        <p className="footer-description">
                            {t('footer.description')}
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="footer-social-link"
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IconComponent size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.quickLinks')}</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={link.href === '/' ? handleContactClick : undefined}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.ourServices')}</h4>
                        <ul className="footer-links">
                            {serviceLinks.map((service) => (
                                <li key={service.name}>
                                    <a href={service.href}>{service.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.contactUs')}</h4>
                        <div className="footer-contact-list">
                            {contactInfo.map((info) => {
                                const IconComponent = info.icon;
                                const isEmail = 'isEmail' in info && info.isEmail;
                                const content = isEmail ? (
                                    <ObfuscatedEmail encoded={CONTACT_EMAIL_ENCODED} title={t('footer.email')}>
                                        <ObfuscatedEmailDisplay encoded={CONTACT_EMAIL_ENCODED} />
                                    </ObfuscatedEmail>
                                ) : info.link ? (
                                    <a href={info.link}>{info.content}</a>
                                ) : (
                                    <span>{info.content}</span>
                                );

                                return (
                                    <div key={info.title} className="footer-contact-item">
                                        <div className="footer-contact-icon">
                                            <IconComponent size={18} />
                                        </div>
                                        <div className="footer-contact-content">
                                            <p className="footer-contact-title">{info.title}</p>
                                            {content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Share this page */}
                <div className="footer-share">
                    <h4 className="footer-share-title">{t('footer.share')}</h4>
                    <ShareButtons className="footer-share-buttons" />
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {currentYear} Rabat Transfert Aéroport. {t('footer.copyright')}
                        </p>
                        <div className="footer-legal">
                            <a href="#privacy">{t('footer.privacy')}</a>
                            <span className="footer-separator">•</span>
                            <a href="#terms">{t('footer.terms')}</a>
                            <span className="footer-separator">•</span>
                            <a href="#mentions">{t('footer.legal')}</a>
                            <span className="footer-separator">•</span>
                            <a href="/sitemap.xml">{t('footer.sitemap')}</a>
                        </div>
                    </div>
                    <div className="footer-developers">
                        <p className="footer-developer-text">
                            {t('footer.developedBy')}{' '}
                            <a
                                href="https://abdelazizelhathout.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-developer-link"
                                aria-label={t('footer.developerLinkAria')}
                            >
                                {t('footer.developerLinkLabel')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
