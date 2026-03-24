import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './NotFound.css';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <main className="not-found" role="main">
      <div className="not-found-container">
        <div className="not-found-code" aria-hidden="true">404</div>
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <p className="not-found-description">{t('notFound.description')}</p>
        <nav className="not-found-nav" aria-label="Liens utiles">
          <Link to="/" className="not-found-btn not-found-btn-primary">
            {t('notFound.home')}
          </Link>
          <Link to="/#services" className="not-found-btn not-found-btn-secondary">
            {t('notFound.services')}
          </Link>
          <Link to="/#contact" className="not-found-btn not-found-btn-secondary">
            {t('notFound.contact')}
          </Link>
        </nav>
        <p className="not-found-help">
          {t('notFound.helpBefore')}
          <Link to="/#contact" className="not-found-help-link">{t('notFound.reportLink')}</Link>
          {t('notFound.helpAfter')}
        </p>
      </div>
    </main>
  );
};

export default NotFound;
