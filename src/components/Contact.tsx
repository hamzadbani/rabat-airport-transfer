import { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ObfuscatedEmail, { CONTACT_EMAIL_ENCODED, ObfuscatedEmailDisplay } from './ObfuscatedEmail';
import './Contact.css';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        flightNumber: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        // Check if there's a pre-selected service type from URL hash
        const hash = window.location.hash;
        if (hash.includes('service=')) {
            const serviceType = hash.split('service=')[1];
            setFormData(prev => ({ ...prev, serviceType: decodeURIComponent(serviceType) }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Limit message to 500 characters
        if (name === 'message' && value.length > 500) {
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear status when user starts typing
        if (status !== 'idle') {
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate message length
        if (formData.message.length > 500) {
            setStatus('error'); // Or we could add a specific message if needed, but the UI has a counter
            return;
        }

        setStatus('submitting');

        const whatsappNumber = '212762728706';
        let message = t('contact.form.whatsappMessage');
        message = message
            .replace('{name}', formData.name)
            .replace('{phone}', formData.phone || 'N/A')
            .replace('{service}', formData.serviceType)
            .replace('{flightNumber}', formData.flightNumber || 'N/A')
            .replace('{email}', formData.email || 'N/A')
            .replace('{message}', formData.message);

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Localhost bypass: Let user test WhatsApp even if PHP is not running
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Localhost detected: Opening WhatsApp and simulating success.');
            setStatus('success');
            window.open(whatsappUrl, '_blank');
            setFormData({ name: '', email: '', phone: '', serviceType: '', flightNumber: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        try {
            console.log('Sending form data to PHP...', formData);
            const response = await fetch('/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('PHP Response:', result);

            if (result.success) {
                setStatus('success');
                console.log('Success! Preparing WhatsApp redirect...');

                // Open WhatsApp in a new tab
                const newWindow = window.open(whatsappUrl, '_blank');
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    console.error('Popup blocked!');
                    alert('Le message a été envoyé par email, mais l\'ouverture de WhatsApp a été bloquée par votre navigateur. Veuillez autoriser les pop-ups pour ce site.');
                }

                setFormData({ name: '', email: '', phone: '', serviceType: '', flightNumber: '', message: '' });
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
            value: '+212 7 62 72 87 06',
            subtitle: t('contact.info.phone.subtitle'),
            link: 'tel:+212762728706',
        },
        {
            id: 2,
            icon: MessageSquare,
            title: t('contact.info.whatsapp.title'),
            value: '+212 7 62 72 87 06',
            subtitle: t('contact.info.whatsapp.subtitle'),
            link: 'https://wa.me/212762728706',
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
        <section className="contact" id="contact" aria-label="Contactez-nous pour réserver votre transport premium">
            <div className="contact-container">
                {/* Section Header */}
                <header className="contact-header">
                    <p className="contact-label">{t('contact.label')}</p>
                    <h2 className="contact-title">
                        {t('contact.title')} <span className="highlight">{t('contact.titleHighlight')}</span>
                    </h2>
                    <p className="contact-subtitle">
                        {t('contact.subtitle')}
                    </p>
                </header>

                {/* Contact Content Grid */}
                <div className="contact-content">
                    {/* Left Side - Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {status === 'success' && (
                                <div className="contact-alert alert-success" data-aos="fade-in">
                                    ✅ {t('contact.form.success')}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="contact-alert alert-error" data-aos="fade-in">
                                    ❌ {t('contact.form.error')}
                                </div>
                            )}

                            {/* Name Field */}
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

                            {/* Email Field */}
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

                            {/* Phone Field */}
                            <div className="form-group">
                                <label htmlFor="phone">{t('contact.form.phone')}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+212 6XX XX XX XX"
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            {/* Flight Number Field */}
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

                            {/* Service Type Dropdown */}
                            <div className="form-group">
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

                            {/* Message Field */}
                            <div className="form-group">
                                <label htmlFor="message">{t('contact.form.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.messagePlaceholder')}
                                    rows={5}
                                    required
                                    disabled={status === 'submitting'}
                                />
                                <span className="character-count">{formData.message.length}/500 {t('contact.form.characters')}</span>
                            </div>



                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`contact-submit-btn ${status === 'submitting' ? 'loading' : ''}`}
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

                    {/* Right Side - Contact Info Cards */}
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
                                        <p className="contact-info-value"><ObfuscatedEmailDisplay encoded={CONTACT_EMAIL_ENCODED} /></p>
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

                        {/* Google Maps - Rabat Transfert Maroc location */}
                        <div className="contact-map-wrapper">
                            <h2 className="contact-map-title">{t('contact.mapTitle')}</h2>
                            <div className="contact-map-embed">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395808.1303024355!2d-7.254082999999999!3d33.76511265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4fbf8b6722d78561%3A0x324129eb691d0fa9!2sEM%20Taxi%20Maroc!5e1!3m2!1sen!2sma!4v1770894385745!5m2!1sen!2sma"
                                    width="400"
                                    height="300"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={t('contact.mapTitle')}
                                />
                            </div>
                        </div>

                        {/* Email CTA Box */}
                        <div className="contact-email-cta">
                            <div className="contact-email-icon">
                                <Mail size={32} />
                            </div>
                            <h2 className="contact-email-title">{t('contact.emailCta.title')}</h2>
                            <p className="contact-email-description">
                                {t('contact.emailCta.description')}
                            </p>
                            <ObfuscatedEmail encoded={CONTACT_EMAIL_ENCODED} className="contact-email-btn" title={t('contact.emailCta.title')}>
                                <Mail size={18} />
                                <span className="contact-email-btn-text"><ObfuscatedEmailDisplay encoded={CONTACT_EMAIL_ENCODED} /></span>
                            </ObfuscatedEmail>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
