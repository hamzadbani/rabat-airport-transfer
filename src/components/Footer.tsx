import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ObfuscatedEmail, { CONTACT_EMAIL_ENCODED, ObfuscatedEmailDisplay } from './ObfuscatedEmail';
import ShareButtons from './ShareButtons';
import logo from '../assets/logo.png';
import paypalLogo from '../assets/paypal.png';
import payoneerLogo from '../assets/payonner.png';
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
        { name: t('navbar.contact'), href: '#contact' },
    ];

    const serviceLinks = [
        { name: t('services.airport.title'), href: '#service-airport' },
        { name: t('services.business.title'), href: '#service-business' },
        { name: t('services.events.title'), href: '#service-events' },
        { name: t('services.onDemand.title'), href: '#service-ondemand' },
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
            content: '+212 7 62 72 87 06',
            link: 'tel:+212762728706',
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
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-column footer-about">
                        <img src={logo} alt="Rabat Transfert Aéroport - Logo - Transport Premium au Maroc" className="footer-logo" width="140" height="70" loading="lazy" />
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
                                    <a href={link.href}>{link.name}</a>
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

                {/* Payment Methods */}
                <div className="footer-payment">
                    <h4 className="footer-payment-title">{t('footer.paymentMethods')}</h4>
                    <div className="footer-payment-methods">
                        <div className="footer-payment-item" title="Visa">
                            <div className="payment-icon payment-visa">
                                <span>VISA</span>
                            </div>
                            <span>Visa</span>
                        </div>
                        <div className="footer-payment-item" title="Mastercard">
                            <div className="payment-icon payment-mastercard">
                                <div className="mc-circle mc-circle-left"></div>
                                <div className="mc-circle mc-circle-right"></div>
                            </div>
                            <span>Mastercard</span>
                        </div>
                        <div className="footer-payment-item" title="PayPal">
                            <div className="payment-icon no-bg">
                                <img src={paypalLogo} alt="Paiement sécurisé PayPal - Rabat Transfert Aéroport" className="payment-img" width="80" height="32" loading="lazy" />
                            </div>
                            <span>PayPal</span>
                        </div>
                        <div className="footer-payment-item" title="Payoneer">
                            <div className="payment-icon no-bg">
                                <img src={payoneerLogo} alt="Paiement Payoneer - Rabat Transfert Aéroport" className="payment-img" width="80" height="32" loading="lazy" />
                            </div>
                            <span>Payoneer</span>
                        </div>
                    </div>
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
                        </div>
                    </div>
                    <div className="footer-developers">
                        <p className="footer-developer-text">
                            {t('footer.developedBy')}{' '}
                            <a
                                href="https://wa.me/212630258502?text=slt%20jai%20besoin%20de%20site%20web%20pour"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-developer-link"
                                aria-label="Contacter Abdelaziz & Hamza sur WhatsApp"
                            >
                                Abdelaziz & Hamza
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
