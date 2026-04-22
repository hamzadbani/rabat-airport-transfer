import { createContext } from 'react';
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

export type Language = 'fr' | 'en' | 'ar';

export interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

export const translations = {
    fr: frTranslations,
    en: enTranslations,
    ar: arTranslations,
} as const;

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

