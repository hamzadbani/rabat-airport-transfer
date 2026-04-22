import { useMemo, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import './WhatsAppQuickPopup.css';

const WHATSAPP_NUMBER = '212674545939';

const WhatsAppQuickPopup = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = useMemo(() => t('whatsappQuick.defaultMessage'), [t]);
  const [message, setMessage] = useState(defaultMessage);

  const openPopup = () => {
    setMessage(defaultMessage);
    setIsOpen(true);
  };

  const sendToWhatsApp = () => {
    const finalMessage = message.trim() || defaultMessage;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="wa-quick-widget">
      {isOpen && (
        <div className="wa-quick-popup" role="dialog" aria-label={t('whatsappQuick.title')}>
          <div className="wa-quick-popup-header">
            <h3>{t('whatsappQuick.title')}</h3>
            <button
              type="button"
              className="wa-quick-close"
              onClick={() => setIsOpen(false)}
              aria-label={t('whatsappQuick.close')}
            >
              <X size={16} />
            </button>
          </div>

          <input
            type="text"
            className="wa-quick-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={defaultMessage}
            aria-label={t('whatsappQuick.inputAria')}
          />

          <button type="button" className="wa-quick-send" onClick={sendToWhatsApp}>
            <Send size={16} />
            <span>{t('whatsappQuick.send')}</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className="wa-quick-button"
        onClick={openPopup}
        aria-label={t('whatsappQuick.open')}
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default WhatsAppQuickPopup;
