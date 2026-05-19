import { useState, type ReactNode } from 'react';
import {
    ArrowLeftRight,
    ArrowRight,
    Baby,
    Calendar,
    Check,
    ChevronDown,
    Clock,
    Luggage,
    MapPin,
    Plane,
    Plus,
    Users,
    X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import {
    defaultTripDateTime,
    mergeDatetimeLocal,
    splitDatetimeLocal,
} from '../lib/booking-draft';
import './HeroBookingForm.css';

const FORM_ID = 'hero-booking';

function BookingField({
    label,
    optionalLabel,
    children,
    className = '',
}: {
    label: string;
    optionalLabel?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`hero-booking__field ${className}`.trim()}>
            <span className="hero-booking__label">
                {label}
                {optionalLabel ? (
                    <span className="hero-booking__label-optional"> ({optionalLabel})</span>
                ) : null}
            </span>
            {children}
        </div>
    );
}

function NumberStepper({
    id,
    label,
    icon: Icon,
    value,
    onChange,
    min,
    max,
    optionalLabel,
}: {
    id: string;
    label: string;
    icon: LucideIcon;
    value: number;
    onChange: (next: number) => void;
    min: number;
    max: number;
    optionalLabel?: string;
}) {
    const clamp = (n: number) => Math.max(min, Math.min(max, n));

    return (
        <BookingField label={label} optionalLabel={optionalLabel} className="hero-booking__field--stepper">
            <div className="hero-booking__stepper" role="group" aria-label={label}>
                <span className="hero-booking__stepper-icon" aria-hidden>
                    <Icon size={18} />
                </span>
                <button
                    type="button"
                    className="hero-booking__stepper-btn"
                    onClick={() => onChange(clamp(value - 1))}
                    disabled={value <= min}
                    aria-label={`${label} −`}
                >
                    −
                </button>
                <input
                    type="number"
                    id={id}
                    name={id}
                    className="hero-booking__stepper-input"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === '') {
                            onChange(min);
                            return;
                        }
                        onChange(clamp(Number(raw)));
                    }}
                    aria-label={label}
                />
                <button
                    type="button"
                    className="hero-booking__stepper-btn"
                    onClick={() => onChange(clamp(value + 1))}
                    disabled={value >= max}
                    aria-label={`${label} +`}
                >
                    +
                </button>
            </div>
        </BookingField>
    );
}

const HeroBookingForm = () => {
    const { t } = useLanguage();
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [tripDateTime, setTripDateTime] = useState(() => defaultTripDateTime());
    const [returnDateTime, setReturnDateTime] = useState('');
    const [tripMode, setTripMode] = useState<'one_way' | 'round_trip'>('one_way');
    const [optionalOpen, setOptionalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [baggageCount, setBaggageCount] = useState(0);
    const optionalLabel = t('hero.booking.optional');

    const { date: tripDate, time: tripTime } = splitDatetimeLocal(tripDateTime);
    const { date: returnDate, time: returnTime } = splitDatetimeLocal(returnDateTime);
    const fromValid = departure.trim().length > 2;
    const toValid = destination.trim().length > 2;
    const showReturn = tripMode === 'round_trip';

    const swapLocations = () => {
        setDeparture(destination);
        setDestination(departure);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const { date: dateCourse, time: dateArriver } = splitDatetimeLocal(tripDateTime);
        const ret =
            showReturn && returnDateTime ? splitDatetimeLocal(returnDateTime) : { date: '', time: '' };
        let message = t('hero.booking.whatsappMessage');
        message = message
            .replace('{fullName}', fullName.trim() || '—')
            .replace('{phone}', phone.trim() || '—')
            .replace('{departure}', departure.trim() || 'N/A')
            .replace('{destination}', destination.trim() || 'N/A')
            .replace('{flightNumber}', flightNumber.trim() || '—')
            .replace('{dateCourse}', dateCourse || 'N/A')
            .replace('{dateArriver}', dateArriver || 'N/A')
            .replace('{returnDate}', ret.date || 'N/A')
            .replace('{returnTime}', ret.time || 'N/A')
            .replace('{adultsCount}', String(adultsCount))
            .replace('{childrenCount}', String(childrenCount))
            .replace('{baggage}', String(baggageCount));
        const whatsappUrl = `https://wa.me/212674545939?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <form
            id={FORM_ID}
            className={`hero-booking${optionalOpen ? ' hero-booking--expanded' : ''}`}
            onSubmit={handleSearch}
            aria-label={t('hero.booking.aria')}
        >
            <div className="hero-booking__row hero-booking__row--locations">
                <BookingField label={t('hero.booking.from')}>
                    <div className="hero-booking__input">
                        <MapPin size={18} className="hero-booking__icon" aria-hidden />
                        <input
                            id={`${FORM_ID}-departure`}
                            type="text"
                            name="departure"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            placeholder={t('hero.booking.fromPlaceholder')}
                            autoComplete="street-address"
                            required
                        />
                        {fromValid ? <Check size={18} className="hero-booking__valid" aria-hidden /> : null}
                    </div>
                </BookingField>

                <button
                    type="button"
                    className="hero-booking__swap"
                    onClick={swapLocations}
                    aria-label={t('hero.booking.swap')}
                >
                    <ArrowLeftRight size={18} aria-hidden />
                </button>

                <BookingField label={t('hero.booking.to')}>
                    <div className="hero-booking__input">
                        <MapPin size={18} className="hero-booking__icon" aria-hidden />
                        <input
                            id={`${FORM_ID}-destination`}
                            type="text"
                            name="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder={t('hero.booking.toPlaceholder')}
                            autoComplete="street-address"
                            required
                        />
                        {toValid ? <Check size={18} className="hero-booking__valid" aria-hidden /> : null}
                    </div>
                </BookingField>
            </div>

            <div className="hero-booking__row hero-booking__row--details">
                <BookingField label={t('hero.booking.pickupDateTime')} className="hero-booking__field--datetime">
                    <div className="hero-booking__datetime">
                        <label className="hero-booking__datetime-part" htmlFor={`${FORM_ID}-dep-d`}>
                            <Calendar size={16} aria-hidden />
                            <input
                                id={`${FORM_ID}-dep-d`}
                                type="date"
                                value={tripDate}
                                onChange={(e) =>
                                    setTripDateTime(mergeDatetimeLocal(e.target.value, tripTime || '12:00'))
                                }
                                required
                            />
                        </label>
                        <span className="hero-booking__datetime-divider" aria-hidden />
                        <label className="hero-booking__datetime-part" htmlFor={`${FORM_ID}-dep-t`}>
                            <Clock size={16} aria-hidden />
                            <input
                                id={`${FORM_ID}-dep-t`}
                                type="time"
                                value={tripTime}
                                onChange={(e) =>
                                    setTripDateTime(mergeDatetimeLocal(tripDate, e.target.value))
                                }
                                required
                            />
                        </label>
                    </div>
                </BookingField>

                <BookingField label={t('hero.booking.return')} className="hero-booking__field--return">
                    {!showReturn ? (
                        <button
                            type="button"
                            className="hero-booking__return-add"
                            onClick={() => {
                                setTripMode('round_trip');
                                if (!returnDateTime) setReturnDateTime(defaultTripDateTime());
                            }}
                            aria-label={t('hero.booking.addReturn')}
                        >
                            <Plus size={20} aria-hidden />
                        </button>
                    ) : (
                        <div className="hero-booking__return-panel">
                            <label className="hero-booking__datetime-part" htmlFor={`${FORM_ID}-ret-d`}>
                                <Calendar size={14} aria-hidden />
                                <input
                                    id={`${FORM_ID}-ret-d`}
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) =>
                                        setReturnDateTime(
                                            mergeDatetimeLocal(e.target.value, returnTime || '12:00'),
                                        )
                                    }
                                />
                            </label>
                            <label className="hero-booking__datetime-part" htmlFor={`${FORM_ID}-ret-t`}>
                                <Clock size={14} aria-hidden />
                                <input
                                    id={`${FORM_ID}-ret-t`}
                                    type="time"
                                    value={returnTime}
                                    onChange={(e) =>
                                        setReturnDateTime(mergeDatetimeLocal(returnDate, e.target.value))
                                    }
                                />
                            </label>
                            <button
                                type="button"
                                className="hero-booking__return-remove"
                                onClick={() => {
                                    setTripMode('one_way');
                                    setReturnDateTime('');
                                }}
                                aria-label={t('hero.booking.removeReturn')}
                            >
                                <X size={16} aria-hidden />
                            </button>
                        </div>
                    )}
                </BookingField>
            </div>

            <div className="hero-booking__optional">
                <button
                    type="button"
                    className="hero-booking__optional-toggle"
                    onClick={() => setOptionalOpen((open) => !open)}
                    aria-expanded={optionalOpen}
                    aria-controls="hero-booking-optional-panel"
                >
                    <span>
                        {optionalOpen ? t('hero.booking.hideOptional') : t('hero.booking.showOptional')}
                    </span>
                    <ChevronDown size={18} className="hero-booking__optional-toggle-icon" aria-hidden />
                </button>
                {!optionalOpen ? <p className="hero-booking__optional-hint">{t('hero.booking.optionalHint')}</p> : null}
            </div>

            <div
                id="hero-booking-optional-panel"
                className="hero-booking__optional-panel"
                hidden={!optionalOpen}
            >
                <div className="hero-booking__row hero-booking__row--flight">
                    <BookingField label={t('hero.booking.flightNumber')} optionalLabel={optionalLabel}>
                        <div className="hero-booking__input">
                            <Plane size={18} className="hero-booking__icon" aria-hidden />
                            <input
                                id={`${FORM_ID}-flight`}
                                type="text"
                                name="flightNumber"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                                placeholder={t('hero.booking.flightNumberPlaceholder')}
                                autoComplete="off"
                                inputMode="text"
                                maxLength={12}
                            />
                        </div>
                    </BookingField>
                </div>

                <div className="hero-booking__row hero-booking__row--counts">
                    <NumberStepper
                        id={`${FORM_ID}-passengers`}
                        label={t('hero.booking.passengers')}
                        icon={Users}
                        value={adultsCount}
                        onChange={setAdultsCount}
                        min={1}
                        max={50}
                    />
                    <NumberStepper
                        id={`${FORM_ID}-children`}
                        label={t('hero.booking.children')}
                        icon={Baby}
                        value={childrenCount}
                        onChange={setChildrenCount}
                        min={0}
                        max={20}
                    />
                    <NumberStepper
                        id={`${FORM_ID}-baggage`}
                        label={t('hero.booking.baggage')}
                        icon={Luggage}
                        value={baggageCount}
                        onChange={setBaggageCount}
                        min={0}
                        max={20}
                        optionalLabel={optionalLabel}
                    />
                </div>
            </div>

            <div className="hero-booking__row hero-booking__row--contact">
                <BookingField label={t('hero.booking.fullName')}>
                    <div className="hero-booking__input">
                        <input
                            id={`${FORM_ID}-name`}
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={t('hero.booking.fullNamePlaceholder')}
                            autoComplete="name"
                        />
                    </div>
                </BookingField>

                <BookingField label={t('hero.booking.phone')}>
                    <div className="hero-booking__input">
                        <input
                            id={`${FORM_ID}-phone`}
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t('hero.booking.phonePlaceholder')}
                            autoComplete="tel"
                            inputMode="tel"
                        />
                    </div>
                </BookingField>
            </div>

            <div className="hero-booking__row hero-booking__row--submit">
                <button type="submit" className="hero-booking__submit">
                    <span>{t('hero.booking.search')}</span>
                    <ArrowRight size={20} aria-hidden />
                </button>
            </div>
        </form>
    );
};

export default HeroBookingForm;
