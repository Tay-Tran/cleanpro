// Writes scripts/seed.ndjson from the built-in sample content, so a fresh
// Sanity dataset can be filled with:  npx sanity dataset import scripts/seed.ndjson production
import { writeFileSync } from "node:fs";
import { sampleContent } from "../src/lib/sample-content";

const { home, legal } = sampleContent;
const docs: Record<string, unknown>[] = [];

// The sample links point to an on-page anchor; Sanity's URL field needs absolute
// store links, so seed generic store URLs for the owner to replace.
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  ...home.settings,
  appStoreUrl: "https://apps.apple.com/",
  googlePlayUrl: "https://play.google.com/store/apps",
});

home.features.forEach(({ _id, ...rest }, i) => docs.push({ _id: `feature-${_id}`, _type: "feature", order: i + 1, ...rest }));
home.plans.forEach(({ _id, ...rest }, i) => docs.push({ _id: `plan-${_id}`, _type: "pricingPlan", order: i + 1, ...rest }));
home.areas.forEach(({ _id, ...rest }, i) => docs.push({ _id: `area-${_id}`, _type: "serviceArea", order: i + 1, ...rest }));
home.faqs.forEach(({ _id, ...rest }, i) => docs.push({ _id: `faq-${_id}`, _type: "faq", order: i + 1, ...rest }));

for (const slug of ["privacy", "terms"] as const) {
  docs.push({ _id: `legal-${slug}`, _type: "legalPage", slug, ...legal[slug] });
}

const out = new URL("./seed.ndjson", import.meta.url);
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to scripts/seed.ndjson`);
