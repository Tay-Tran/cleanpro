import { defineArrayMember, defineField, defineType } from "sanity";

const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  description: "Lower numbers appear first.",
  initialValue: 10,
});

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Calendar", value: "calendar" },
          { title: "Shield", value: "shield" },
          { title: "Sparkles", value: "sparkles" },
          { title: "Clock", value: "clock" },
          { title: "Star", value: "star" },
          { title: "Card", value: "card" },
        ],
      },
      initialValue: "sparkles",
    }),
    orderField,
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Pricing plan",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Plan name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price (e.g. $89)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", title: "Period (e.g. per visit)", type: "string" }),
    defineField({ name: "description", title: "Short description", type: "string" }),
    defineField({
      name: "features",
      title: "What's included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "highlighted", title: "Highlight as most popular", type: "boolean", initialValue: false }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", initialValue: "Book now" }),
    defineField({ name: "ctaUrl", title: "Button link", type: "url", validation: (r) => r.uri({ allowRelative: true }) }),
    orderField,
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

export const serviceArea = defineType({
  name: "serviceArea",
  title: "Service area",
  type: "document",
  fields: [
    defineField({ name: "name", title: "City / area", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", title: "Note (e.g. Coming soon)", type: "string" }),
    defineField({ name: "available", title: "Currently available", type: "boolean", initialValue: true }),
    orderField,
  ],
  preview: {
    select: { title: "name", available: "available" },
    prepare: ({ title, available }) => ({ title, subtitle: available ? "Available" : "Coming soon" }),
  },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    orderField,
  ],
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy" },
          { title: "Terms of Service", value: "terms" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "updatedAt", title: "Last updated", type: "date" }),
    defineField({ name: "body", title: "Content", type: "array", of: [defineArrayMember({ type: "block" })] }),
  ],
});
