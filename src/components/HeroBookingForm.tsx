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
    BAGGAGE_TYPE_IDS,
    defaultBaggageLines,
    formatBaggageLinesSummary,
    newBaggageLineId,
    type BaggageLine,
    type BaggageTypeId,
} from '../lib/baggage-types';
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
    className = '',
}: {
    id: string;
    label: string;
    icon: LucideIcon;
    value: number;
    onChange: (next: number) => void;
    min: number;
    max: number;
    optionalLabel?: string;
    className?: string;
}) {
    const clamp = (n: number) => Math.max(min, Math.min(max, n));

    return (
        <BookingField
            label={label}
            optionalLabel={optionalLabel}
            className={`hero-booking__field--stepper ${className}`.trim()}
        >
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
    const [email, setEmail] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [baggageLines, setBaggageLines] = useState<BaggageLine[]>(defaultBaggageLines);
    const optionalLabel = t('hero.booking.optional');

    const baggageLabel = (typeId: BaggageTypeId) => t(`hero.booking.baggageTypes.${typeId}`);

    const updateBaggageLine = (
        id: string,
        patch: Partial<Pick<BaggageLine, 'typeId' | 'count' | 'otherDetail'>>,
    ) => {
        setBaggageLines((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
    };

    const onBaggageTypeChange = (id: string, typeId: BaggageTypeId) => {
        setBaggageLines((prev) =>
            prev.map((line) =>
                line.id === id
                    ? { ...line, typeId, otherDetail: typeId === 'other' ? line.otherDetail ?? '' : '' }
                    : line,
            ),
        );
    };

    const addBaggageLine = () => {
        setBaggageLines((prev) => [...prev, { id: newBaggageLineId(), typeId: 'checked', count: 1 }]);
    };

    const removeBaggageLine = (id: string) => {
        setBaggageLines((prev) => (prev.length <= 1 ? prev : prev.filter((line) => line.id !== id)));
    };

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
            .replace('{email}', email.trim() || '—')
            .replace('{departure}', departure.trim() || 'N/A')
            .replace('{destination}', destination.trim() || 'N/A')
            .replace('{flightNumber}', flightNumber.trim() || '—')
            .replace('{dateCourse}', dateCourse || 'N/A')
            .replace('{dateArriver}', dateArriver || 'N/A')
            .replace('{returnDate}', ret.date || 'N/A')
            .replace('{returnTime}', ret.time || 'N/A')
            .replace('{adultsCount}', String(adultsCount))
            .replace('{childrenCount}', String(childrenCount))
            .replace('{baggage}', formatBaggageLinesSummary(baggageLines, baggageLabel));
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

                <BookingField label={t('hero.booking.email')} optionalLabel={optionalLabel}>
                    <div className="hero-booking__input">
                        <input
                            id={`${FORM_ID}-email`}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('hero.booking.emailPlaceholder')}
                            autoComplete="email"
                            inputMode="email"
                        />
                    </div>
                </BookingField>
            </div>

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
                </div>

                <div className="hero-booking__baggage">
                    <span className="hero-booking__label">
                        {t('hero.booking.baggage')}
                        <span className="hero-booking__label-optional"> ({optionalLabel})</span>
                    </span>
                    <div className="hero-booking__baggage-lines">
                        {baggageLines.map((line, index) => (
                            <div key={line.id} className="hero-booking__baggage-line">
                                <div className="hero-booking__baggage-line-main">
                                    <BookingField
                                        label={index === 0 ? t('hero.booking.baggageType') : '\u00a0'}
                                        className="hero-booking__field--bag-type"
                                    >
                                        <div className="hero-booking__input hero-booking__input--select">
                                            <Luggage size={18} className="hero-booking__icon" aria-hidden />
                                            <select
                                                id={`${FORM_ID}-bag-type-${line.id}`}
                                                value={line.typeId}
                                                onChange={(e) =>
                                                    onBaggageTypeChange(
                                                        line.id,
                                                        e.target.value as BaggageTypeId,
                                                    )
                                                }
                                                aria-label={t('hero.booking.baggageType')}
                                            >
                                                {BAGGAGE_TYPE_IDS.map((typeId) => (
                                                    <option key={typeId} value={typeId}>
                                                        {baggageLabel(typeId)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </BookingField>
                                    <NumberStepper
                                        id={`${FORM_ID}-bag-qty-${line.id}`}
                                        label={index === 0 ? t('hero.booking.baggageQuantity') : '\u00a0'}
                                        icon={Luggage}
                                        value={line.count}
                                        onChange={(n) => updateBaggageLine(line.id, { count: n })}
                                        min={0}
                                        max={20}
                                        className="hero-booking__field--bag-qty"
                                    />
                                    {baggageLines.length > 1 ? (
                                        <button
                                            type="button"
                                            className="hero-booking__baggage-remove"
                                            onClick={() => removeBaggageLine(line.id)}
                                            aria-label={t('hero.booking.baggageRemove')}
                                        >
                                            <X size={18} aria-hidden />
                                        </button>
                                    ) : null}
                                </div>
                                {line.typeId === 'other' ? (
                                    <BookingField
                                        label={t('hero.booking.baggageOtherSpecify')}
                                        className="hero-booking__field--bag-other"
                                    >
                                        <div className="hero-booking__input">
                                            <input
                                                id={`${FORM_ID}-bag-other-${line.id}`}
                                                type="text"
                                                value={line.otherDetail ?? ''}
                                                onChange={(e) =>
                                                    updateBaggageLine(line.id, {
                                                        otherDetail: e.target.value.slice(0, 80),
                                                    })
                                                }
                                                placeholder={t('hero.booking.baggageOtherPlaceholder')}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </BookingField>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="hero-booking__baggage-add"
                        onClick={addBaggageLine}
                    >
                        <Plus size={16} aria-hidden />
                        <span>{t('hero.booking.baggageAdd')}</span>
                    </button>
                </div>
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
