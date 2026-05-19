export const BOOKING_DRAFT_KEY = 'rabat-booking-draft';
export const BOOKING_DRAFT_EVENT = 'rabat-booking-draft';

export type BookingDraft = {
    departure: string;
    destination: string;
    tripDateTime: string;
    returnDateTime?: string;
    fullName?: string;
    phone?: string;
    flightNumber?: string;
    adultsCount: string;
    childrenCount?: string;
    baggage: string;
    serviceType?: string;
};

export function saveBookingDraft(draft: BookingDraft): void {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));
        window.dispatchEvent(new CustomEvent(BOOKING_DRAFT_EVENT));
    } catch {
        /* ignore quota / private mode */
    }
}

export function loadBookingDraft(): BookingDraft | null {
    try {
        const raw = sessionStorage.getItem(BOOKING_DRAFT_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as BookingDraft;
    } catch {
        return null;
    }
}

export function clearBookingDraft(): void {
    try {
        sessionStorage.removeItem(BOOKING_DRAFT_KEY);
    } catch {
        /* ignore */
    }
}

/** Default pickup datetime: today at 18:15 local, or +1h if already past. */
export function defaultTripDateTime(): string {
    const d = new Date();
    d.setMinutes(15, 0, 0);
    d.setHours(18);
    if (d.getTime() < Date.now()) {
        const next = new Date();
        next.setHours(next.getHours() + 1, 0, 0, 0);
        return toDatetimeLocalValue(next);
    }
    return toDatetimeLocalValue(d);
}

export function toDatetimeLocalValue(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function splitDatetimeLocal(value: string): { date: string; time: string } {
    if (!value.includes('T')) return { date: '', time: '' };
    const [date, time] = value.split('T');
    return { date: date ?? '', time: (time ?? '').slice(0, 5) };
}

export function mergeDatetimeLocal(date: string, time: string): string {
    if (!date) return '';
    return `${date}T${time || '12:00'}`;
}
