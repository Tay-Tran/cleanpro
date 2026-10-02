import type { PortableTextBlock } from "next-sanity";
import type { HomeContent, LegalPage } from "./content";

// Turns plain paragraphs into Portable Text, the same shape the CMS returns.
// Lines starting with "## " become headings.
function toBlocks(lines: string[]): PortableTextBlock[] {
  return lines.map((line, i) => {
    const isHeading = line.startsWith("## ");
    return {
      _type: "block",
      _key: `b${i}`,
      style: isHeading ? "h2" : "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `s${i}`, text: isHeading ? line.slice(3) : line, marks: [] }],
    };
  });
}

const home: HomeContent = {
  settings: {
    siteName: "CleanPro",
    tagline: "Book a trusted home cleaner in under 60 seconds.",
    heroTitle: "A spotless home, booked in 60 seconds",
    heroSubtitle:
      "CleanPro connects you with vetted, insured cleaners in your area. Pick a time, track your cleaner, and pay in the app. No phone calls, no surprises.",
    appStoreUrl: "#download",
    googlePlayUrl: "#download",
    contactEmail: "hello@cleanpro.example",
    contactPhone: "+1 (555) 010-2030",
  },
  features: [
    { _id: "f1", icon: "calendar", title: "Book in seconds", description: "Choose a date, time and service. We match you with an available cleaner instantly." },
    { _id: "f2", icon: "shield", title: "Vetted & insured", description: "Every cleaner passes a background check and is covered by liability insurance." },
    { _id: "f3", icon: "clock", title: "Live tracking", description: "See when your cleaner is on the way and get a notification when the job is done." },
    { _id: "f4", icon: "card", title: "Pay in the app", description: "Secure card payments with a clear price upfront. Tip only if you want to." },
    { _id: "f5", icon: "star", title: "Rated by neighbors", description: "Read real reviews and rebook your favorite cleaner with one tap." },
    { _id: "f6", icon: "sparkles", title: "Satisfaction guarantee", description: "Not happy? We'll send someone back to fix it within 24 hours, free." },
  ],
  plans: [
    {
      _id: "p1",
      name: "Standard",
      price: "$89",
      period: "per visit",
      description: "Regular upkeep for apartments and small homes.",
      features: ["Up to 2 bedrooms", "Kitchen & bathrooms", "Dusting & vacuuming", "2–3 hours"],
      ctaLabel: "Book Standard",
      ctaUrl: "#download",
    },
    {
      _id: "p2",
      name: "Deep Clean",
      price: "$149",
      period: "per visit",
      description: "A top-to-bottom clean when your home needs extra care.",
      features: ["Up to 3 bedrooms", "Inside oven & fridge", "Baseboards & cabinets", "4–5 hours"],
      highlighted: true,
      ctaLabel: "Book Deep Clean",
      ctaUrl: "#download",
    },
    {
      _id: "p3",
      name: "Move In / Out",
      price: "$229",
      period: "per visit",
      description: "Get your deposit back or start fresh in a new place.",
      features: ["Empty home, any size", "Inside all cabinets", "Walls spot-cleaned", "Full day"],
      ctaLabel: "Book Move Clean",
      ctaUrl: "#download",
    },
  ],
  areas: [
    { _id: "a1", name: "Austin", available: true },
    { _id: "a2", name: "Dallas", available: true },
    { _id: "a3", name: "Houston", available: true },
    { _id: "a4", name: "San Antonio", available: true },
    { _id: "a5", name: "Fort Worth", available: false, note: "Coming soon" },
    { _id: "a6", name: "El Paso", available: false, note: "Coming soon" },
  ],
  faqs: [
    { _id: "q1", question: "Do I need to be home during the cleaning?", answer: "No. Many customers leave a key or door code in the app. Your cleaner checks in and out, and you get a notification for both." },
    { _id: "q2", question: "Do I need to provide cleaning supplies?", answer: "No. Cleaners bring all standard supplies and equipment. If you prefer specific products, add a note to your booking." },
    { _id: "q3", question: "Can I cancel or reschedule?", answer: "Yes. Changes are free up to 24 hours before your booking. Later changes may include a small fee." },
    { _id: "q4", question: "How are cleaners vetted?", answer: "Every cleaner passes an identity check, a background check and an in-person interview before their first job." },
    { _id: "q5", question: "What if I'm not happy with the clean?", answer: "Tell us within 24 hours and we'll send a cleaner back to fix it at no cost." },
  ],
};

const legal: Record<"privacy" | "terms", LegalPage> = {
  privacy: {
    title: "Privacy Policy",
    updatedAt: "2026-10-01",
    body: toBlocks([
      "This sample policy shows how the page looks. Replace it with your own policy in the CMS.",
      "## Information we collect",
      "We collect the details you give us when you create an account or book a cleaning, such as your name, email, phone number and service address.",
      "## How we use it",
      "We use your information to provide bookings, process payments, send service notifications and improve the app. We do not sell your personal data.",
      "## Your choices",
      "You can update or delete your account at any time from the app settings, or by contacting us.",
    ]),
  },
  terms: {
    title: "Terms of Service",
    updatedAt: "2026-10-01",
    body: toBlocks([
      "These sample terms show how the page looks. Replace them with your own terms in the CMS.",
      "## Bookings",
      "Bookings are confirmed once a cleaner accepts the job. Prices shown in the app include all service fees.",
      "## Cancellations",
      "You may cancel or reschedule free of charge up to 24 hours before the booking time.",
      "## Liability",
      "Cleaners are independent professionals covered by liability insurance. Report any damage within 48 hours.",
    ]),
  },
};

export const sampleContent = { home, legal };
