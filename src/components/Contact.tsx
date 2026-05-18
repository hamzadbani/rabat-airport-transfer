import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import ObfuscatedEmail, { CONTACT_EMAIL_ENCODED, ObfuscatedEmailDisplay } from './ObfuscatedEmail';
import './Contact.css';

const PHONE_DISPLAY = '+212 6 745 459 39';
const PHONE_TEL = '+212674545939';
const WHATSAPP_URL = 'https://wa.me/212674545939';
const MAPS_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.742483102716!2d-6.8416578!3d34.0248205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76daf23faa483%3A0x50bf1692068455ba!2sTaxi%20Rabat%20Airoport!5e0!3m2!1sfr!2sma!4v1776600418988!5m2!1sfr!2sma';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section
            className="contact"
            id="contact"
            aria-label="Contactez-nous pour réserver votre transport premium"
        >
            <div className="contact-container">
                <header className="contact-header">
                    <p className="contact-label">{t('contact.label')}</p>
                    <h2 className="contact-title">{t('contact.title')}</h2>
                </header>

                <div className="contact-content contact-content--info-only">
                    <div className="contact-grid">
                        <a href={`tel:${PHONE_TEL}`} className="contact-info-card">
                            <div className="contact-info-icon">
                                <Phone size={24} />
                            </div>
                            <div className="contact-info-content">
                                <h3 className="contact-info-title">{t('contact.info.phone.title')}</h3>
                                <p className="contact-info-value">{PHONE_DISPLAY}</p>
                                <p className="contact-info-subtitle">{t('contact.info.phone.subtitle')}</p>
                            </div>
                        </a>

                        <ObfuscatedEmail
                            encoded={CONTACT_EMAIL_ENCODED}
                            className="contact-info-card"
                            title={t('contact.info.email.subtitle')}
                        >
                            <div className="contact-info-icon">
                                <Mail size={24} />
                            </div>
                            <div className="contact-info-content">
                                <h3 className="contact-info-title">{t('contact.info.email.title')}</h3>
                                <p className="contact-info-value">
                                    <ObfuscatedEmailDisplay encoded={CONTACT_EMAIL_ENCODED} />
                                </p>
                                <p className="contact-info-subtitle">{t('contact.info.email.subtitle')}</p>
                            </div>
                        </ObfuscatedEmail>

                        <a
                            href={WHATSAPP_URL}
                            className="contact-info-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="contact-info-icon contact-info-icon--whatsapp">
                                <MessageSquare size={24} />
                            </div>
                            <div className="contact-info-content">
                                <h3 className="contact-info-title">{t('contact.info.whatsapp.title')}</h3>
                                <p className="contact-info-value">{PHONE_DISPLAY}</p>
                                <p className="contact-info-subtitle">{t('contact.info.whatsapp.subtitle')}</p>
                            </div>
                        </a>

                        <div className="contact-info-card contact-info-card--maps">
                            <div className="contact-info-card__maps-header">
                                <div className="contact-info-icon">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="contact-info-title">{t('contact.mapTitle')}</h3>
                            </div>
                            <div className="contact-map-embed">
                                <iframe
                                    src={MAPS_EMBED_URL}
                                    width={400}
                                    height={220}
                                    style={{ border: 0, width: '100%', height: '220px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={t('contact.mapTitle')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
