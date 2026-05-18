import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/useLanguage';
import { getHomeAiAnswer, getHomeFaq } from '../../lib/home-faq';
import './HomeFaq.css';

const HomeFaq = () => {
    const { language, t } = useLanguage();
    const locale = (language === 'en' || language === 'ar' ? language : 'fr') as 'fr' | 'en' | 'ar';
    const items = getHomeFaq(locale);
    const aiAnswer = getHomeAiAnswer(locale);
    const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set());

    const toggleItem = (index: number) => {
        setOpenIndexes((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    return (
        <section className="home-faq container" id="faq" aria-labelledby="home-faq-title">
            <p className="home-faq-label">{t('homeFaq.label')}</p>
            <h2 id="home-faq-title" className="home-faq-title">
                {t('homeFaq.title')}
            </h2>

            <div id="ai-answer" className="home-faq-ai-answer">
                <p className="home-faq-ai-lead">{t('homeFaq.aiLead')}</p>
                <p>{aiAnswer}</p>
            </div>

            <dl className="home-faq-list">
                {items.map((item, index) => {
                    const isOpen = openIndexes.has(index);
                    const questionId = `home-faq-q-${index}`;
                    const answerId = `home-faq-a-${index}`;

                    return (
                        <div key={item.question} className={`home-faq-item${isOpen ? ' home-faq-item--open' : ''}`}>
                            <dt className="home-faq-item__term">
                                <button
                                    type="button"
                                    className="home-faq-question"
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    id={questionId}
                                >
                                    <span>{item.question}</span>
                                    <ChevronDown
                                        size={20}
                                        className="home-faq-icon"
                                        aria-hidden
                                    />
                                </button>
                            </dt>
                            <dd
                                id={answerId}
                                className="home-faq-answer"
                                role="region"
                                aria-labelledby={questionId}
                                hidden={!isOpen}
                            >
                                {item.answer}
                            </dd>
                        </div>
                    );
                })}
            </dl>

            <nav className="home-faq-links" aria-label={t('homeFaq.linksAria')}>
                <a href="/taxi-rabat-aeroport/">{t('homeFaq.linkAirport')}</a>
                <a href="/taxi-rabat/">{t('homeFaq.linkRabat')}</a>
                <a href="/rabat-casablanca-taxi/">{t('homeFaq.linkCasa')}</a>
                <a href="/chauffeur-prive-rabat/">{t('homeFaq.linkChauffeur')}</a>
            </nav>
        </section>
    );
};

export default HomeFaq;
