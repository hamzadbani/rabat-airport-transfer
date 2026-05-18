import { CalendarCheck } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import { handleContactClick } from '../lib/scroll-to-contact';
import './MobileReserveBar.css';

/** Fixed bottom CTA on small screens — scrolls to contact on homepage. */
export function MobileReserveBar() {
    const { t } = useLanguage();

    return (
        <div className="mobile-reserve-bar" role="navigation" aria-label={t('navbar.stickyReserve.aria')}>
            <a href="/" className="mobile-reserve-bar__btn" onClick={handleContactClick}>
                <CalendarCheck size={20} aria-hidden />
                <span>{t('navbar.stickyReserve.button')}</span>
            </a>
        </div>
    );
}
