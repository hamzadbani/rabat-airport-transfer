import { HomeLanding } from "@/components/home/HomeLanding";
import { getLandingStructuredData } from "@/lib/landing-structured-data";
import { generateHomeMetadata } from "@/lib/metadata";

export const metadata = generateHomeMetadata("en");

export default function EnHomePage() {
  const jsonLd = getLandingStructuredData("en");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeLanding locale="en" />
    </>
  );
}
