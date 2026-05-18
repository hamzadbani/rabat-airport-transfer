import { useEffect, useState } from 'react';
import {
    ArrowLeftRight,
    ArrowRight,
    Baby,
    Calendar,
    Check,
    Clock,
    Luggage,
    Phone,
    Plus,
    Search,
    User,
    Users,
    X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    getDefaultDeparture,
    isDefaultDepartureValue,
} from '../constants/booking-defaults';
import { useLanguage } from '../contexts/useLanguage';
import {
    defaultTripDateTime,
    mergeDatetimeLocal,
    splitDatetimeLocal,
} from '../lib/booking-draft';
import './HeroBookingForm.css';

function BookingField({
    label,
    optionalLabel,
    children,
    className = '',
}: {
    label: string;
    optionalLabel?: string;
    children: React.ReactNode;
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
}: {
    id: string;
    label: string;
    icon: LucideIcon;
    value: number;
    onChange: (next: number) => void;
    min: number;
    max: number;
}) {
    const clamp = (n: number) => Math.max(min, Math.min(max, n));

    return (
        <BookingField label={label} className="hero-booking__field--stepper">
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
    const { language, t } = useLanguage();
    const [departure, setDeparture] = useState(() => getDefaultDeparture(language));

    useEffect(() => {
        const nextDefault = getDefaultDeparture(language);
        setDeparture((current) =>
            current.trim() === '' || isDefaultDepartureValue(current) ? nextDefault : current,
        );
    }, [language]);
    const [destination, setDestination] = useState('');
    const [tripDateTime, setTripDateTime] = useState(defaultTripDateTime);
    const [returnDateTime, setReturnDateTime] = useState('');
    const [showReturn, setShowReturn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [baggageCount, setBaggageCount] = useState(0);
    const optionalLabel = t('hero.booking.optional');

    const { date: tripDate, time: tripTime } = splitDatetimeLocal(tripDateTime);
    const { date: returnDate, time: returnTime } = splitDatetimeLocal(returnDateTime);
    const fromValid = departure.trim().length > 2;

    const swapLocations = () => {
        setDeparture(destination);
        setDestination(departure);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const { date: dateCourse, time: dateArriver } = splitDatetimeLocal(tripDateTime);
        const ret = showReturn && returnDateTime ? splitDatetimeLocal(returnDateTime) : { date: '', time: '' };
        let message = t('hero.booking.whatsappMessage');
        message = message
            .replace('{fullName}', fullName.trim() || '—')
            .replace('{phone}', phone.trim() || '—')
            .replace('{departure}', departure.trim() || 'N/A')
            .replace('{destination}', destination.trim() || 'N/A')
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
        <form className="hero-booking" onSubmit={handleSearch} aria-label={t('hero.booking.aria')}>
            <div className="hero-booking__row hero-booking__row--locations">
                <BookingField label={t('hero.booking.from')}>
                    <div className="hero-booking__input hero-booking__input--location">
                        <Search size={18} className="hero-booking__icon" aria-hidden />
                        <input
                            type="text"
                            name="departure"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            autoComplete="off"
                            required
                        />
                        {fromValid && <Check size={18} className="hero-booking__valid" aria-hidden />}
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
                    <div className="hero-booking__input hero-booking__input--location">
                        <Search size={18} className="hero-booking__icon" aria-hidden />
                        <input
                            type="text"
                            name="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder={t('hero.booking.toPlaceholder')}
                            autoComplete="off"
                            required
                        />
                    </div>
                </BookingField>
            </div>

            <div className="hero-booking__row hero-booking__row--contact">
                <BookingField
                    label={t('hero.booking.fullName')}
                    optionalLabel={optionalLabel}
                >
                    <div className="hero-booking__input">
                        <User size={18} className="hero-booking__icon" aria-hidden />
                        <input
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={t('hero.booking.fullNamePlaceholder')}
                            autoComplete="name"
                        />
                    </div>
                </BookingField>

                <BookingField label={t('hero.booking.phone')} optionalLabel={optionalLabel}>
                    <div className="hero-booking__input">
                        <Phone size={18} className="hero-booking__icon" aria-hidden />
                        <input
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

            <div className="hero-booking__row hero-booking__row--details">
                <BookingField
                    label={t('hero.booking.pickupDateTime')}
                    className="hero-booking__field--datetime"
                >
                    <div className="hero-booking__datetime">
                        <label className="hero-booking__datetime-part">
                            <Calendar size={16} aria-hidden />
                            <input
                                type="date"
                                value={tripDate}
                                onChange={(e) =>
                                    setTripDateTime(mergeDatetimeLocal(e.target.value, tripTime || '12:00'))
                                }
                                required
                            />
                        </label>
                        <span className="hero-booking__datetime-divider" aria-hidden />
                        <label className="hero-booking__datetime-part">
                            <Clock size={16} aria-hidden />
                            <input
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
                                setShowReturn(true);
                                if (!returnDateTime) setReturnDateTime(defaultTripDateTime());
                            }}
                            aria-label={t('hero.booking.addReturn')}
                        >
                            <Plus size={20} aria-hidden />
                        </button>
                    ) : (
                        <div className="hero-booking__return-panel">
                            <label className="hero-booking__datetime-part hero-booking__datetime-part--compact">
                                <Calendar size={14} aria-hidden />
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) =>
                                        setReturnDateTime(
                                            mergeDatetimeLocal(e.target.value, returnTime || '12:00'),
                                        )
                                    }
                                />
                            </label>
                            <label className="hero-booking__datetime-part hero-booking__datetime-part--compact">
                                <Clock size={14} aria-hidden />
                                <input
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
                                    setShowReturn(false);
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

            <div className="hero-booking__row hero-booking__row--counts">
                <NumberStepper
                    id="passengers"
                    label={t('hero.booking.passengers')}
                    icon={Users}
                    value={adultsCount}
                    onChange={setAdultsCount}
                    min={1}
                    max={50}
                />
                <NumberStepper
                    id="children"
                    label={t('hero.booking.children')}
                    icon={Baby}
                    value={childrenCount}
                    onChange={setChildrenCount}
                    min={0}
                    max={20}
                />
                <NumberStepper
                    id="baggage"
                    label={t('hero.booking.baggage')}
                    icon={Luggage}
                    value={baggageCount}
                    onChange={setBaggageCount}
                    min={0}
                    max={20}
                />
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
