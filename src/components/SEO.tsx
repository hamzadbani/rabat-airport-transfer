import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SEO = () => {
    const { language } = useLanguage();

    useEffect(() => {
        // Update document language
        document.documentElement.lang = language === 'ar' ? 'ar' : language === 'en' ? 'en' : 'fr';

        // Update meta tags based on language
        const updateMetaTag = (name: string, content: string, isProperty = false) => {
            const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;

            if (!meta) {
                meta = document.createElement('meta');
                if (isProperty) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // SEO content (title 50-60 chars, description 120-160 chars; keywords in title/meta/headings)
        const seoContent = {
            fr: {
                title: 'Rabat Transfert | Transport premium & taxi touristique | Maroc',
                description: 'Chauffeur privé et transport de luxe au Maroc. Transferts aéroport Rabat, Casablanca, Marrakech. Transport touristique. Réservez 24/7.',
                keywords: 'transport de luxe maroc, services de transport de luxe au maroc, voitures de luxe avec chauffeur, chauffeur privé maroc, transport touristique maroc, transfert aéroport casablanca, taxi aéroport maroc, navette aéroport, Mercedes chauffeur maroc, réservation chauffeur privé, VIP transport maroc, Casablanca Marrakech Rabat',
            },
            en: {
                title: 'Rabat Transfert | Premium transport & tourist taxi | Morocco',
                description: 'Private chauffeur and luxury transport in Morocco. Airport transfers Rabat, Casablanca, Marrakech. Tourist and business trips. Book 24/7.',
                keywords: 'luxury transport morocco, luxury chauffeur service morocco, private chauffeur morocco, tourist transport morocco, airport transfer casablanca, taxi airport morocco, Mercedes chauffeur morocco, VIP transport morocco, Casablanca Marrakech Rabat',
            },
            ar: {
                title: 'Rabat Transfert | نقل مميز وتاكسي سياحي | المغرب',
                description: 'سائق خاص وسيارات فاخرة في المغرب. نقل مميز، نقل مطار الرباط-سلا والدار البيضاء ومراكش. نقل سياحي واحترافي. حجز 24/7.',
                keywords: 'نقل فاخر المغرب, خدمات نقل فاخر المغرب, سيارات فاخرة مع سائق, سائق خاص المغرب, نقل سياحي المغرب, نقل مطار الدار البيضاء, تاكسي مطار المغرب, مرسيدس سائق المغرب, الدار البيضاء مراكش الرباط',
            },
        };

        const content = seoContent[language as keyof typeof seoContent] || seoContent.fr;

        // Update title
        document.title = content.title;

        // Update meta tags
        updateMetaTag('title', content.title);
        updateMetaTag('description', content.description);
        updateMetaTag('keywords', content.keywords);
        updateMetaTag('og:title', content.title, true);
        updateMetaTag('og:description', content.description, true);
        updateMetaTag('twitter:title', content.title, true);
        updateMetaTag('twitter:description', content.description, true);

        // Update Open Graph locale
        const localeMap: Record<string, string> = {
            fr: 'fr_FR',
            en: 'en_US',
            ar: 'ar_MA',
        };
        updateMetaTag('og:locale', localeMap[language] || 'fr_FR', true);
    }, [language]);

    // Structured Data (JSON-LD) for LocalBusiness
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://em-taxi.com/#organization',
        name: 'Rabat Transfert Aéroport',
        alternateName: 'Rabat Transfert',
        description: language === 'en'
            ? 'Luxury transport service in Morocco since 2009. Private chauffeur, Mercedes & BMW. Airport transfers, tourist transport. Casablanca, Marrakech, Rabat. 24/7.'
            : language === 'ar'
                ? 'خدمة نقل فاخر في المغرب منذ 2009. سائق خاص، مرسيدس وبي إم دبليو. نقل المطار، النقل السياحي. الدار البيضاء، مراكش، الرباط. 24/7.'
                : 'Services de transport de luxe au Maroc depuis 2009. Chauffeur privé, Mercedes & BMW. Transferts aéroport, transport touristique. Casablanca, Marrakech, Rabat. 24/7.',
        url: 'https://em-taxi.com',
        telephone: '+212762728706',
        email: 'em.taxi.maroc@gmail.com',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'MA',
            addressLocality: 'Rabat',
            streetAddress: 'Rabat-Salé Airport',
        },
        geo: {
            '@type': 'GeoCoordinates',
            addressCountry: 'MA',
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
        },
        priceRange: '$$$',
        image: 'https://em-taxi.com/logo.png',
        sameAs: [],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '1000',
        },
        areaServed: [
            { '@type': 'City', name: 'Casablanca', addressCountry: 'MA' },
            { '@type': 'City', name: 'Marrakech', addressCountry: 'MA' },
            { '@type': 'City', name: 'Rabat', addressCountry: 'MA' },
            { '@type': 'City', name: 'Fès', addressCountry: 'MA' },
            { '@type': 'Country', name: 'Morocco' },
        ],
        serviceType: [
            'Luxury Transport',
            'Private Chauffeur Service',
            'Transport Touristique',
            'Airport Transfer',
            'VIP Transport',
            'Business Transportation',
            'Event Transportation',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Transportation Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Standard - Luxury Sedan',
                        description: 'Mercedes E-Class, BMW 5 Series',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Business - Executive Sedan',
                        description: 'Mercedes S-Class, BMW 7 Series',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Premium - Luxury Van/SUV',
                        description: 'Mercedes V-Class, Range Rover',
                    },
                },
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </>
    );
};

export default SEO;
