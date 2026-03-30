import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    fr: frTranslations,
    en: enTranslations,
    ar: arTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readStoredLanguage(): Language | null {
    try {
        const saved = localStorage.getItem('language') as Language;
        return saved && ['fr', 'en', 'ar'].includes(saved) ? saved : null;
    } catch {
        return null;
    }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => readStoredLanguage() ?? 'fr');

    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch {
            /* Safari private mode / storage disabled */
        }
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        // Keep intentionally empty translations (e.g. "") instead of falling back to key name.
        if (value === undefined || value === null) {
            return key;
        }
        return String(value);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
