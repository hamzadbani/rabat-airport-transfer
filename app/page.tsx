import { LegacyHomeApp } from "@/components/home/LegacyHomeApp";
import { getLandingStructuredData } from "@/lib/landing-structured-data";
import { generateHomeMetadata } from "@/lib/metadata";

export const metadata = generateHomeMetadata("fr");

export default function HomePage() {
  const jsonLd = getLandingStructuredData("fr");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegacyHomeApp />
    </>
  );
}
