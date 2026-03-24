import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Phone, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        // Close mobile menu when window is resized to desktop size
        const handleResize = () => {
            if (window.innerWidth > 968 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        // Close language menu when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.navbar-language-selector')) {
                setIsLangMenuOpen(false);
            }
        };

        if (isLangMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLangMenuOpen]);

    const navLinks = [
        { name: t('navbar.home'), href: '#accueil' },
        { name: t('navbar.about'), href: '#apropos' },
        { name: t('navbar.reviews'), href: '#avis' },
        { name: t('navbar.services'), href: '#services' },
        { name: t('navbar.pricing'), href: '#tarifs' },
    ];

    const languages = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    ];

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <a href="#accueil" aria-label="Rabat Transfert Aéroport - Accueil">
                        <img src={logo} alt="Rabat Transfert Aéroport - Logo - Transport Premium au Maroc" width="180" height="50" />
                    </a>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href}>{link.name}</a>
                        </li>
                    ))}
                </ul>

                {/* Right Side Actions */}
                <div className="navbar-actions">
                    <a href="#contact" className="btn-contact">{t('navbar.contact')}</a>
                    <a href="tel:+212762728706" className="btn-call">
                        <Phone size={18} />
                        <span>{t('navbar.call')}</span>
                    </a>

                    {/* Language Selector */}
                    <div className="navbar-language-selector">
                        <button
                            className="btn-language"
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            aria-label="Select language"
                        >
                            <Globe size={18} />
                            <span>{currentLanguage.flag}</span>
                            <ChevronDown size={14} />
                        </button>
                        {isLangMenuOpen && (
                            <div className="language-dropdown">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`language-option ${language === lang.code ? 'active' : ''}`}
                                        onClick={() => {
                                            setLanguage(lang.code as 'fr' | 'en');
                                            setIsLangMenuOpen(false);
                                        }}
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <ul className="mobile-menu-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mobile-menu-actions">
                    <a href="#contact" className="btn-contact" onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.contact')}</a>
                    <a href="tel:+212762728706" className="btn-call">
                        <Phone size={18} />
                        <span>{t('navbar.call')}</span>
                    </a>

                    {/* Language Selector Mobile */}
                    <div className="mobile-language-selector">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`mobile-language-btn ${language === lang.code ? 'active' : ''}`}
                                onClick={() => {
                                    setLanguage(lang.code as 'fr' | 'en');
                                }}
                                aria-label={lang.name}
                            >
                                {lang.flag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
