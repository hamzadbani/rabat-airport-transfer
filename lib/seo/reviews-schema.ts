/**
 * Optional AggregateRating on LocalBusiness (stars in SERPs when Google trusts the data).
 * Set only from **real** Google Business Profile stats — never invent values.
 */
export function getOptionalAggregateRatingBlock():
  | {
      "@type": "AggregateRating";
      ratingValue: string;
      reviewCount: string;
      bestRating: string;
      worstRating: string;
    }
  | undefined {
  const rating =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_GOOGLE_REVIEW_RATING?.trim()
      : undefined;
  const count =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT?.trim()
      : undefined;
  if (!rating || !count) return undefined;
  return {
    "@type": "AggregateRating",
    ratingValue: rating,
    reviewCount: count,
    bestRating: "5",
    worstRating: "1",
  };
}
