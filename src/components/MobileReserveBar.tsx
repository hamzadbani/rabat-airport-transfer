import { CalendarCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './MobileReserveBar.css';

/** Fixed bottom CTA on small screens — scrolls to #contact (lazy section loads via hash). */
export function MobileReserveBar() {
    const { t } = useLanguage();

    return (
        <div className="mobile-reserve-bar" role="navigation" aria-label={t('navbar.stickyReserve.aria')}>
            <a href="#contact" className="mobile-reserve-bar__btn">
                <CalendarCheck size={20} aria-hidden />
                <span>{t('navbar.stickyReserve.button')}</span>
            </a>
        </div>
    );
}
