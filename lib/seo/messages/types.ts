export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoPageMessages = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  h1: string;
  heroSubtitle: string;
  trustBullets: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faq: SeoFaqItem[];
  /** Heading above internal links block */
  relatedSectionTitle: string;
  /**
   * Trusted HTML merged from offline AI / Laravel job (`seo_pages.content`).
   * Never populated from live user requests — only build-time JSON cache.
   */
  aiBodyHtml?: string;
};
