/** Location & transport entities for semantic SEO / GEO / SGE extraction. */
export type GeoEntity = {
  id: string;
  type: "City" | "Airport" | "Neighborhood" | "Station" | "Hotel";
  name: string;
  alternateNames?: string[];
  iataCode?: string;
  coordinates?: { lat: number; lng: number };
  addressCountry: "MA";
};

export const GEO_ENTITIES: Record<string, GeoEntity> = {
  rabat: {
    id: "rabat",
    type: "City",
    name: "Rabat",
    alternateNames: ["الرباط"],
    coordinates: { lat: 34.0209, lng: -6.8416 },
    addressCountry: "MA",
  },
  sale: {
    id: "sale",
    type: "City",
    name: "Salé",
    alternateNames: ["سلا"],
    coordinates: { lat: 34.0531, lng: -6.7985 },
    addressCountry: "MA",
  },
  casablanca: {
    id: "casablanca",
    type: "City",
    name: "Casablanca",
    alternateNames: ["الدار البيضاء", "Casa"],
    coordinates: { lat: 33.5731, lng: -7.5898 },
    addressCountry: "MA",
  },
  marrakech: {
    id: "marrakech",
    type: "City",
    name: "Marrakech",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    addressCountry: "MA",
  },
  rba: {
    id: "rba",
    type: "Airport",
    name: "Aéroport Rabat-Salé",
    alternateNames: ["RBA", "Rabat-Salé Airport"],
    iataCode: "RBA",
    coordinates: { lat: 34.0515, lng: -6.7515 },
    addressCountry: "MA",
  },
  cmn: {
    id: "cmn",
    type: "Airport",
    name: "Aéroport Mohammed V",
    alternateNames: ["CMN", "Casablanca Airport"],
    iataCode: "CMN",
    coordinates: { lat: 33.3675, lng: -7.5898 },
    addressCountry: "MA",
  },
  agdal: {
    id: "agdal",
    type: "Neighborhood",
    name: "Agdal",
    addressCountry: "MA",
  },
  "hay-riad": {
    id: "hay-riad",
    type: "Neighborhood",
    name: "Hay Riad",
    addressCountry: "MA",
  },
  "gare-agdal": {
    id: "gare-agdal",
    type: "Station",
    name: "Gare Rabat-Agdal",
    addressCountry: "MA",
  },
  "hotel-sofitel": {
    id: "hotel-sofitel",
    type: "Hotel",
    name: "Sofitel Rabat Jardin des Roses",
    addressCountry: "MA",
  },
};

export function getEntitiesForPage(slug: string): GeoEntity[] {
  const keys = new Set<string>(["rabat", "sale", "rba"]);
  if (/casa|casablanca/.test(slug)) keys.add("casablanca");
  if (/marrakech/.test(slug)) keys.add("marrakech");
  if (/cmn|mohammed/.test(slug)) keys.add("cmn");
  if (/agdal/.test(slug)) keys.add("agdal");
  if (/hay-riad|hay.riad/.test(slug)) keys.add("hay-riad");
  if (/gare/.test(slug)) keys.add("gare-agdal");
  if (/sofitel|hotel/.test(slug)) keys.add("hotel-sofitel");
  if (/aeroport|airport|rba/.test(slug)) keys.add("rba");
  return [...keys].map((k) => GEO_ENTITIES[k]).filter(Boolean);
}
