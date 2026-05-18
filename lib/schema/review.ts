import { getOptionalAggregateRatingBlock } from "@/lib/seo/reviews-schema";
import type { SchemaNode } from "./types";

export function generateReviewSchema(input: {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
}): SchemaNode {
  return {
    "@type": "Review",
    author: { "@type": "Person", name: input.author },
    reviewBody: input.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: input.ratingValue,
      bestRating: 5,
    },
    datePublished: input.datePublished,
  };
}

export function generateAggregateRatingSchema(): SchemaNode | null {
  const block = getOptionalAggregateRatingBlock();
  if (!block) return null;
  return {
    "@type": "AggregateRating",
    ...block,
  };
}
