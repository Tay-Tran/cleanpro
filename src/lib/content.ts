import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { sampleContent } from "./sample-content";

export type IconName = "calendar" | "shield" | "sparkles" | "clock" | "star" | "card";

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImageSource & { alt?: string };
  appStoreUrl?: string;
  googlePlayUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export type Feature = { _id: string; title: string; description?: string; icon?: IconName };

export type PricingPlan = {
  _id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type ServiceArea = { _id: string; name: string; note?: string; available?: boolean };

export type Faq = { _id: string; question: string; answer: string };

export type LegalPage = { title: string; updatedAt?: string; body: PortableTextBlock[] };

export type HomeContent = {
  settings: SiteSettings;
  features: Feature[];
  plans: PricingPlan[];
  areas: ServiceArea[];
  faqs: Faq[];
};

const homeQuery = `{
  "settings": *[_id == "siteSettings"][0],
  "features": *[_type == "feature"] | order(order asc),
  "plans": *[_type == "pricingPlan"] | order(order asc),
  "areas": *[_type == "serviceArea"] | order(order asc),
  "faqs": *[_type == "faq"] | order(order asc)
}`;

const legalQuery = `*[_type == "legalPage" && slug == $slug][0]{ title, updatedAt, body }`;

// Pages are cached and refreshed by the Sanity webhook (/api/revalidate),
// with a time-based fallback so edits still show up if the webhook is not set.
const fetchOptions = { next: { revalidate: 60, tags: ["sanity"] } };

export async function getSiteSettings(): Promise<SiteSettings> {
  const home = await getHomeContent();
  return home.settings;
}

// A CMS outage or misconfiguration should never take the marketing site down,
// so fetch errors are logged and the sample content is shown instead.
async function safeFetch<T>(query: string, params: Record<string, string>): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, fetchOptions);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[sanity] fetch failed, using sample content: ${message}`);
    return null;
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  const data = await safeFetch<Partial<HomeContent>>(homeQuery, {});
  if (!data) return sampleContent.home;

  // Any section left empty in the CMS falls back to sample content,
  // so a half-filled studio never produces a broken page.
  return {
    settings: data.settings ?? sampleContent.home.settings,
    features: data.features?.length ? data.features : sampleContent.home.features,
    plans: data.plans?.length ? data.plans : sampleContent.home.plans,
    areas: data.areas?.length ? data.areas : sampleContent.home.areas,
    faqs: data.faqs?.length ? data.faqs : sampleContent.home.faqs,
  };
}

export async function getLegalPage(slug: "privacy" | "terms"): Promise<LegalPage> {
  const page = await safeFetch<LegalPage>(legalQuery, { slug });
  return page?.body?.length ? page : sampleContent.legal[slug];
}
