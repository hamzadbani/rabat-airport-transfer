import { useLanguage } from '../contexts/LanguageContext';
import ShareButtons from './ShareButtons';
import './ShareSection.css';

export default function ShareSection() {
    const { t } = useLanguage();

    return (
        <section className="share-section" id="partager" aria-label={t('footer.share')}>
            <div className="share-section-inner">
                <h2 className="share-section-title">{t('footer.shareSectionTitle')}</h2>
                <p className="share-section-subtitle">{t('footer.shareSectionSubtitle')}</p>
                <ShareButtons className="share-section-buttons" />
            </div>
        </section>
    );
}
