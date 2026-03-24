import { useState, useCallback } from 'react';
import { Twitter, Facebook, Linkedin, MessageCircle, Mail, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './ShareButtons.css';

const SHARE_TEXT = 'Rabat Transfert - Chauffeur Privé & Transport Premium Maroc';

function TelegramIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14.108.105.156.247.157.346 0 .1-.053.319-.157.466l-1.957 5.827c-.14.42-.465.1-.465.1l-1.12-1.12-2.24-1.56-3.36-1.12.465-.14 2.24 1.56 2.8 2.24.7.14.1-.32-.14-.56-.42-.84-1.12-2.24-1.56-2.8-.14-.24.1-.42.28-.14.7l1.12 2.8.28.56-.28.14-2.8-2.1-1.96-.7-.14-.14.14-.42 3.36 1.56 3.92 2.8.56.42.14-.28-.28-.56z" />
        </svg>
    );
}

export default function ShareButtons({ className = '' }: { className?: string }) {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://em-taxi.com/';
    const shareText = SHARE_TEXT;

    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback: open prompt or do nothing
        }
    }, [shareUrl]);

    const links = [
        { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, labelKey: 'shareTwitter' },
        { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, labelKey: 'shareFacebook' },
        { Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, labelKey: 'shareLinkedIn' },
        { Icon: MessageCircle, href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, labelKey: 'shareWhatsApp' },
        { Icon: TelegramIcon, href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, labelKey: 'shareTelegram' },
        { Icon: Mail, href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`, labelKey: 'shareEmail' },
    ];

    return (
        <div className={`share-buttons ${className}`.trim()}>
            {links.map((item) => {
                const { Icon, href, labelKey } = item;
                return (
                    <a
                        key={labelKey}
                        href={href}
                        className="share-btn"
                        aria-label={t(`footer.${labelKey}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon size={20} />
                    </a>
                );
            })}
            <button
                type="button"
                className="share-btn share-btn-copy"
                onClick={handleCopyLink}
                aria-label={t('footer.shareCopyLink')}
                title={copied ? t('footer.shareCopied') : t('footer.shareCopyLink')}
            >
                {copied ? (
                    <span className="share-copied-text">{t('footer.shareCopied')}</span>
                ) : (
                    <Copy size={20} />
                )}
            </button>
        </div>
    );
}
