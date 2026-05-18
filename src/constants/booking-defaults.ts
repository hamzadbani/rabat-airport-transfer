import type { Language } from '../contexts/language-context';

export const DEFAULT_DEPARTURE_BY_LOCALE: Record<Language, string> = {
    fr: 'Aéroport Rabat-Salé (RBA)',
    en: 'Rabat-Salé Airport (RBA)',
    ar: 'مطار الرباط-سلا (RBA)',
};

export function getDefaultDeparture(locale: Language): string {
    return DEFAULT_DEPARTURE_BY_LOCALE[locale] ?? DEFAULT_DEPARTURE_BY_LOCALE.fr;
}

export function isDefaultDepartureValue(value: string): boolean {
    const trimmed = value.trim();
    return Object.values(DEFAULT_DEPARTURE_BY_LOCALE).some((v) => v === trimmed);
}
