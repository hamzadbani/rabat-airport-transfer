import { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import ObfuscatedEmail, { CONTACT_EMAIL_ENCODED, ObfuscatedEmailDisplay } from './ObfuscatedEmail';
import './Contact.css';

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    departure: '',
    destination: '',
    flightNumber: '',
    /** `YYYY-MM-DDTHH:mm` for `<input type="datetime-local" />` */
    tripDateTime: '',
    adultsCount: '1',
    baggage: '',
    message: '',
};

function splitTripDateTime(value: string): { dateCourse: string; dateArriver: string } {
    const trimmed = value.trim();
    if (!trimmed.includes('T')) {
        return { dateCourse: '', dateArriver: '' };
    }
    const [datePart, timePart] = trimmed.split('T');
    return {
        dateCourse: datePart ?? '',
        dateArriver: timePart ? timePart.slice(0, 5) : '',
    };
}

type ContactProps = {
    /** When true (booking URL #contact): section fills the viewport and appears first in page order */
    priorityLayout?: boolean;
};

const Contact = ({ priorityLayout = false }: ContactProps) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        const applyHash = () => {
            const hash = window.location.hash;
            if (hash.includes('service=')) {
                const raw = hash.split('service=')[1]?.split('&')[0] ?? '';
                const serviceType = decodeURIComponent(raw);
                if (serviceType) {
                    setFormData((prev) => ({ ...prev, serviceType }));
                }
            }
            if (hash.startsWith('#contact')) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                });
            }
        };
        applyHash();
        window.addEventListener('hashchange', applyHash);
        return () => window.removeEventListener('hashchange', applyHash);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'message' && value.length > 500) {
            return;
        }
        if (name === 'baggage' && value.length > 255) {
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status !== 'idle') {
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.message.length > 500) {
            setStatus('error');
            return;
        }
        if (formData.baggage.length > 255) {
            setStatus('error');
            return;
        }

        setStatus('submitting');

        const { dateCourse, dateArriver } = splitTripDateTime(formData.tripDateTime);

        const whatsappNumber = '212674545939';
        let message = t('contact.form.whatsappMessage');
        message = message
            .replace('{name}', formData.name)
            .replace('{phone}', formData.phone || 'N/A')
            .replace('{service}', formData.serviceType)
            .replace('{departure}', formData.departure.trim() || 'N/A')
            .replace('{destination}', formData.destination.trim() || 'N/A')
            .replace('{flightNumber}', formData.flightNumber.trim() || 'N/A')
            .replace('{dateCourse}', dateCourse || 'N/A')
            .replace('{dateArriver}', dateArriver || 'N/A')
            .replace('{email}', formData.email || 'N/A')
            .replace('{adultsCount}', formData.adultsCount.trim() || '1')
            .replace('{baggage}', formData.baggage.trim() || 'N/A')
            .replace('{message}', formData.message.trim() || 'N/A');

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        const adultsParsed = Math.max(1, Math.min(50, Number(formData.adultsCount.trim()) || 1));
        const mailPayload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            serviceType: formData.serviceType.trim(),
            departure: formData.departure.trim(),
            destination: formData.destination.trim(),
            flightNumber: formData.flightNumber.trim(),
            dateCourse,
            dateArriver,
            adultsCount: adultsParsed,
            baggage: formData.baggage.trim(),
            message: formData.message.trim(),
        };

        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Localhost detected: Opening WhatsApp and simulating success.');
            setStatus('success');
            window.open(whatsappUrl, '_blank');
            setFormData({ ...emptyForm });
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        try {
            const response = await fetch('/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mailPayload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setStatus('success');

                const newWindow = window.open(whatsappUrl, '_blank');
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    alert('Le message a été envoyé par email, mais l\'ouverture de WhatsApp a été bloquée par votre navigateur. Veuillez autoriser les pop-ups pour ce site.');
                }

                setFormData({ ...emptyForm });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('PHP returned success: false', result.message);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const contactInfo = [
        {
            id: 1,
            icon: Phone,
            title: t('contact.info.phone.title'),
            value: '+212 6 745 459 39',
            subtitle: t('contact.info.phone.subtitle'),
            link: 'tel:+212674545939',
        },
        {
            id: 2,
            icon: MessageSquare,
            title: t('contact.info.whatsapp.title'),
            value: '+212 6 745 459 39',
            subtitle: t('contact.info.whatsapp.subtitle'),
            link: 'https://wa.me/212674545939',
        },
        {
            id: 3,
            icon: Mail,
            title: t('contact.info.email.title'),
            subtitle: t('contact.info.email.subtitle'),
            isEmail: true,
        },
    ];

    return (
        <section
            className={`contact${priorityLayout ? ' contact--full-page' : ''}`}
            id="contact"
            aria-label="Contactez-nous pour réserver votre transport premium"
        >
            <div className="contact-container">
                <header className="contact-header">
                    <p className="contact-label">{t('contact.label')}</p>
                    <h2 className="contact-title">
                        {t('contact.title')} <span className="highlight">{t('contact.titleHighlight')}</span>
                    </h2>
                    <p className="contact-subtitle">{t('contact.subtitle')}</p>
                </header>

                <div className="contact-content">
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {status === 'success' && (
                                <div className="contact-alert alert-success contact-form__span-full" data-aos="fade-in">
                                    ✅ {t('contact.form.success')}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="contact-alert alert-error contact-form__span-full" data-aos="fade-in">
                                    ❌ {t('contact.form.error')}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="name">{t('contact.form.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.namePlaceholder')}
                                    required
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{t('contact.form.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.emailPlaceholder')}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">{t('contact.form.phone')}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.phonePlaceholder')}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="flightNumber">{t('contact.form.flightNumber')}</label>
                                <input
                                    type="text"
                                    id="flightNumber"
                                    name="flightNumber"
                                    value={formData.flightNumber}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.flightNumberPlaceholder')}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group contact-form__span-full">
                                <label htmlFor="tripDateTime">{t('contact.form.dateTimeGroup')}</label>
                                <input
                                    type="datetime-local"
                                    id="tripDateTime"
                                    name="tripDateTime"
                                    value={formData.tripDateTime}
                                    onChange={handleChange}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group contact-form__span-full">
                                <label htmlFor="serviceType">{t('contact.form.service')} *</label>
                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'submitting'}
                                >
                                    <option value="">{t('contact.form.servicePlaceholder')}</option>
                                    <option value="Transport Aeroport">{t('contact.form.serviceOptions.airport')}</option>
                                    <option value="Service Taxi">{t('contact.form.serviceOptions.taxi')}</option>
                                    <option value="Transport Touristique">{t('contact.form.serviceOptions.tourist')}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="departure">{t('contact.form.departure')}</label>
                                <input
                                    type="text"
                                    id="departure"
                                    name="departure"
                                    value={formData.departure}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.departurePlaceholder')}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="destination">{t('contact.form.destination')}</label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.destinationPlaceholder')}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="adultsCount">{t('contact.form.adultsCount')}</label>
                                <input
                                    type="number"
                                    id="adultsCount"
                                    name="adultsCount"
                                    min={1}
                                    max={50}
                                    value={formData.adultsCount}
                                    onChange={handleChange}
                                    placeholder="1"
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="baggage">{t('contact.form.baggage')}</label>
                                <input
                                    type="text"
                                    id="baggage"
                                    name="baggage"
                                    value={formData.baggage}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.baggagePlaceholder')}
                                    maxLength={255}
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="form-group contact-form__span-full">
                                <label htmlFor="message">{t('contact.form.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.messagePlaceholder')}
                                    rows={5}
                                    disabled={status === 'submitting'}
                                />
                                <span className="character-count">
                                    {formData.message.length}/500 {t('contact.form.characters')}
                                </span>
                            </div>

                            <button
                                type="submit"
                                className={`contact-submit-btn contact-form__span-full ${status === 'submitting' ? 'loading' : ''}`}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? (
                                    <div className="loader"></div>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>{t('contact.form.send')}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="contact-info-wrapper">
                        {contactInfo.map((info) => {
                            const IconComponent = info.icon;
                            const isEmail = 'isEmail' in info && info.isEmail;
                            const content = isEmail ? (
                                <ObfuscatedEmail encoded={CONTACT_EMAIL_ENCODED} className="contact-info-card" title={info.subtitle}>
                                    <div className="contact-info-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="contact-info-content">
                                        <h3 className="contact-info-title">{info.title}</h3>
                                        <p className="contact-info-value">
                                            <ObfuscatedEmailDisplay encoded={CONTACT_EMAIL_ENCODED} />
                                        </p>
                                        <p className="contact-info-subtitle">{info.subtitle}</p>
                                    </div>
                                </ObfuscatedEmail>
                            ) : (
                                <a
                                    key={info.id}
                                    href={info.link}
                                    className="contact-info-card"
                                    target={info.id === 2 ? '_blank' : undefined}
                                    rel={info.id === 2 ? 'noopener noreferrer' : undefined}
                                >
                                    <div className="contact-info-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="contact-info-content">
                                        <h3 className="contact-info-title">{info.title}</h3>
                                        <p className="contact-info-value">{info.value}</p>
                                        <p className="contact-info-subtitle">{info.subtitle}</p>
                                    </div>
                                </a>
                            );
                            return isEmail ? <span key={info.id}>{content}</span> : content;
                        })}

                        <div className="contact-map-wrapper">
                            <h2 className="contact-map-title">{t('contact.mapTitle')}</h2>
                            <div className="contact-map-embed">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.742483102716!2d-6.8416578!3d34.0248205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76daf23faa483%3A0x50bf1692068455ba!2sTaxi%20Rabat%20Airoport!5e0!3m2!1sfr!2sma!4v1776600418988!5m2!1sfr!2sma"
                                    width={400}
                                    height={300}
                                    style={{ border: 0, width: '100%', height: '300px', minHeight: '250px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={t('contact.mapTitle')}
                                />
                            </div>
                        </div>

                        <div className="contact-email-cta">
                            <div className="contact-email-icon">
                                <Mail size={32} />
                            </div>
                            <h2 className="contact-email-title">{t('contact.emailCta.title')}</h2>
                            <p className="contact-email-description">{t('contact.emailCta.description')}</p>
                            <ObfuscatedEmail encoded={CONTACT_EMAIL_ENCODED} className="contact-email-btn" title={t('contact.emailCta.title')}>
                                <Mail size={18} />
                                <span className="contact-email-btn-text">
                                    <ObfuscatedEmailDisplay encoded={CONTACT_EMAIL_ENCODED} />
                                </span>
                            </ObfuscatedEmail>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
