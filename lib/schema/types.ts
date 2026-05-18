/** Shared Schema.org JSON-LD node shapes (strict typing for generators). */
export type SchemaNode = Record<string, unknown>;

export type SchemaGraph = {
  "@context": "https://schema.org";
  "@graph": SchemaNode[];
};

export type PostalAddressSchema = {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality: string;
  postalCode?: string;
  addressRegion?: string;
  addressCountry: string;
};

export type GeoCoordinatesSchema = {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
};

export type FaqItemInput = {
  question: string;
  answer: string;
};

export type BreadcrumbItemInput = {
  name: string;
  item: string;
};

export type RouteOfferInput = {
  fromCity: string;
  toCity: string;
  distanceKm: number;
  priceEstimatedMAD: number;
  pageUrl: string;
};
