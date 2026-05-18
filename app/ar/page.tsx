import { HomeLanding } from "@/components/home/HomeLanding";
import { getLandingStructuredData } from "@/lib/landing-structured-data";
import { generateHomeMetadata } from "@/lib/metadata";

export const metadata = generateHomeMetadata("ar");

export default function ArHomePage() {
  const jsonLd = getLandingStructuredData("ar");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeLanding locale="ar" />
    </>
  );
}
