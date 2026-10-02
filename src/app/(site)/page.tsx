import { DownloadCta } from "@/components/sections/DownloadCta";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { getHomeContent } from "@/lib/content";

export default async function HomePage() {
  const { settings, features, plans, areas, faqs } = await getHomeContent();

  // FAQ structured data helps search engines show answers directly in results.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Hero settings={settings} availableAreas={areas.filter((a) => a.available).length} />
      <Features features={features} />
      <HowItWorks />
      <Pricing plans={plans} />
      <ServiceAreas areas={areas} contactEmail={settings.contactEmail} />
      <Faq faqs={faqs} />
      <DownloadCta settings={settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
