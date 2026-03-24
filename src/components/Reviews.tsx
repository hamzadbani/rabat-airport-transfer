import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, ExternalLink, MessageCircle } from 'lucide-react';
import './Reviews.css';

/** Google Maps place page for Rabat Transfert Maroc — view & leave reviews */
const GOOGLE_MAPS_PLACE_URL = 'https://www.google.com/maps/place/EM+Taxi+Maroc/@33.7651126,-7.254083,17z/data=!3m1!4b1!4m8!3m7!1s0x4fbf8b6722d78561:0x324129eb691d0fa9!8m2!3d33.7651126!4d-7.254083!9m1!1b1!16s%2Fg%2F11n3wrtqpf?entry=ttu';

/** Optional: set in .env to fetch real reviews (Places API New). Place ID from https://developers.google.com/maps/documentation/places/web-service/place-id */
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;
const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined;

/** Matches Places API (New) Review: authorAttribution.displayName, rating, text, relativePublishTimeDescription */
interface GoogleReview {
  name?: string;
  rating?: number;
  text?: string;
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string };
}

/** Static Google reviews (shown when Places API is not used or returns no results) */
const STATIC_REVIEWS: GoogleReview[] = [
  { name: 'Abdelaziz ELHATHOUT', rating: 5, relativePublishTimeDescription: 'a day ago', text: 'Super 👌🏻👌🏻👌🏻 Je le recommande sans hésitation.' },
  { name: 'soufiane ouldlabsiri', rating: 5, relativePublishTimeDescription: 'an hour ago', text: 'Thank you for your respectful treatment ✅✅' },
  { name: 'Toufik EL Mohassibi', rating: 5, relativePublishTimeDescription: '13 hours ago', text: 'Excellent service, punctuality, and professional driving....' },
  { name: 'abdo Sof', rating: 5, relativePublishTimeDescription: 'a day ago', text: 'Good driver ❤️❤️❤️' },
  { name: 'mzerd jihad', rating: 5, relativePublishTimeDescription: '15 hours ago', text: 'Thank you for this wonderful trip and your exceptional professionalism.' },
  { name: 'Abderrazak Malik', rating: 5, relativePublishTimeDescription: '22 hours ago', text: 'Good service' },
  { name: 'Youssef Benryane', rating: 5, relativePublishTimeDescription: 'a day ago', text: 'Impeccable, thank you for your professionalism ;)' },
  { name: 'mhammed El habbassi', rating: 5, relativePublishTimeDescription: 'a day ago', text: 'Great service, I recommend without hesitation.' },
];

const Reviews = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(!!(API_KEY && PLACE_ID));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!API_KEY || !PLACE_ID) {
      setReviews(STATIC_REVIEWS);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}?fields=reviews`,
          {
            headers: { 'X-Goog-Api-Key': API_KEY },
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error('Places API error');
        const data = await res.json();
        const list = data?.reviews ?? [];
        const normalized = (Array.isArray(list) ? list.slice(0, 5) : []).map((r: GoogleReview) => ({
          name: r.authorAttribution?.displayName ?? r.name,
          rating: r.rating,
          text: r.text,
          relativePublishTimeDescription: r.relativePublishTimeDescription,
        }));
        setReviews(normalized.length > 0 ? normalized : STATIC_REVIEWS);
      } catch {
        setError(true);
        setReviews(STATIC_REVIEWS);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <section className="reviews" id="avis" aria-label={t('reviews.ariaLabel')}>
      <div className="reviews-container">
        <header className="reviews-header">
          <p className="reviews-label">{t('reviews.label')}</p>
          <h2 className="reviews-title">
            {t('reviews.title')} <span className="highlight">{t('reviews.titleHighlight')}</span>
          </h2>
          <p className="reviews-subtitle">{t('reviews.subtitle')}</p>
        </header>

        {loading && (
          <div className="reviews-loading" aria-hidden="true">
            {t('reviews.loading')}
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="reviews-grid-wrapper">
            <div className="reviews-grid" data-aos="fade-up">
              {reviews.map((review, index) => (
              <article
                key={index}
                className="review-card"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="review-card-stars" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i <= (review.rating ?? 0) ? 'filled' : 'empty'}
                      fill={i <= (review.rating ?? 0) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                {review.text && (
                  <p className="review-card-text" itemProp="reviewBody">
                    {review.text.length > 220 ? `${review.text.slice(0, 220)}…` : review.text}
                  </p>
                )}
                <footer className="review-card-meta">
                  {review.name && <span itemProp="author">{review.name}</span>}
                  {review.relativePublishTimeDescription && (
                    <span className="review-card-date">{review.relativePublishTimeDescription}</span>
                  )}
                </footer>
              </article>
              ))}
            </div>
          </div>
        )}

        {!loading && reviews.length === 0 && !error && PLACE_ID && API_KEY && (
          <p className="reviews-fallback">{t('reviews.noReviews')}</p>
        )}

        <div className="reviews-cta">
          <a
            href={GOOGLE_MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-btn reviews-btn-primary"
            aria-label={t('reviews.seeOnGoogleA11y')}
          >
            <MessageCircle size={20} aria-hidden="true" />
            {t('reviews.seeOnGoogle')}
          </a>
          <a
            href={GOOGLE_MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-btn reviews-btn-secondary"
            aria-label={t('reviews.writeReviewA11y')}
          >
            <ExternalLink size={18} aria-hidden="true" />
            {t('reviews.writeReview')}
          </a>
        </div>

        <p className="reviews-disclaimer">{t('reviews.disclaimer')}</p>
      </div>
    </section>
  );
};

export default Reviews;
