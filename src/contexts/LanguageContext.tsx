import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext, translations, type Language } from './language-context';

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
        let value: unknown = translations[language];

        for (const k of keys) {
            value = (value as Record<string, unknown> | undefined)?.[k];
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
