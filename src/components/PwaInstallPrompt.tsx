import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './PwaInstallPrompt.css';

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const CHROMIUM_DISMISSED_KEY = 'rabat-transfert:pwa-install-dismissed';
const IOS_HINT_DISMISSED_KEY = 'rabat-transfert:pwa-ios-hint-dismissed';

function isIosLikeDevice(): boolean {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) return true;
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
    return false;
}

function isStandaloneDisplay(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        if (window.matchMedia?.('(display-mode: standalone)')?.matches) return true;
    } catch {
        /* ignore */
    }
    const nav = window.navigator as Navigator & { standalone?: boolean };
    return nav.standalone === true;
}

/**
 * Android/Desktop Chrome: `beforeinstallprompt` + in-page Install button.
 * iPhone/iPad: Safari — show Share → Add to Home Screen (no web Install API).
 */
export function PwaInstallPrompt() {
    const { t } = useLanguage();
    const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
    const [chromiumDismissed, setChromiumDismissed] = useState(false);
    const [iosHint, setIosHint] = useState(false);
    const chromiumStored = useRef(false);

    useEffect(() => {
        try {
            chromiumStored.current = sessionStorage.getItem(CHROMIUM_DISMISSED_KEY) === '1';
        } catch {
            chromiumStored.current = false;
        }
        if (chromiumStored.current) setChromiumDismissed(true);
    }, []);

    useEffect(() => {
        if (!isIosLikeDevice() || isStandaloneDisplay()) return;
        try {
            if (sessionStorage.getItem(IOS_HINT_DISMISSED_KEY) === '1') return;
        } catch {
            /* ignore */
        }
        setIosHint(true);
    }, []);

    useEffect(() => {
        if (import.meta.env.DEV) {
            return;
        }
        const onBip = (e: Event) => {
            try {
                if (sessionStorage.getItem(CHROMIUM_DISMISSED_KEY) === '1') {
                    return;
                }
            } catch {
                /* ignore */
            }
            e.preventDefault();
            setDeferred(e as BeforeInstallPromptEvent);
        };
        window.addEventListener('beforeinstallprompt', onBip);
        return () => window.removeEventListener('beforeinstallprompt', onBip);
    }, []);

    const onInstall = useCallback(async () => {
        if (!deferred) return;
        try {
            await deferred.prompt();
            await deferred.userChoice;
        } catch {
            /* ignore */
        }
        setDeferred(null);
    }, [deferred]);

    const onDismissChromium = useCallback(() => {
        setChromiumDismissed(true);
        setDeferred(null);
        try {
            sessionStorage.setItem(CHROMIUM_DISMISSED_KEY, '1');
        } catch {
            /* ignore */
        }
    }, []);

    const onDismissIosHint = useCallback(() => {
        setIosHint(false);
        try {
            sessionStorage.setItem(IOS_HINT_DISMISSED_KEY, '1');
        } catch {
            /* ignore */
        }
    }, []);

    if (deferred && !chromiumDismissed) {
        return (
            <div className="pwa-install-banner" role="region" aria-label={t('pwa.installRegion')}>
                <div className="pwa-install-inner">
                    <p className="pwa-install-title">{t('pwa.installTitle')}</p>
                    <p className="pwa-install-desc">{t('pwa.installDesc')}</p>
                    <div className="pwa-install-actions">
                        <button type="button" className="pwa-install-btn pwa-install-btn-primary" onClick={onInstall}>
                            {t('pwa.installButton')}
                        </button>
                        <button type="button" className="pwa-install-btn pwa-install-btn-ghost" onClick={onDismissChromium}>
                            {t('pwa.dismiss')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (iosHint) {
        return (
            <div className="pwa-install-banner" role="region" aria-label={t('pwa.iosInstallRegion')}>
                <div className="pwa-install-inner">
                    <p className="pwa-install-title">{t('pwa.iosInstallTitle')}</p>
                    <p className="pwa-install-desc">{t('pwa.iosInstallDesc')}</p>
                    <div className="pwa-install-actions">
                        <button type="button" className="pwa-install-btn pwa-install-btn-primary" onClick={onDismissIosHint}>
                            {t('pwa.iosDismiss')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
