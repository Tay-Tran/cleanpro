import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "hero", title: "Hero" },
    { name: "links", title: "Links & contact" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline (used for SEO description)", type: "string", group: "brand" }),
    defineField({ name: "heroTitle", title: "Hero title", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero image (app screenshot)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "appStoreUrl", title: "App Store link", type: "url", group: "links" }),
    defineField({ name: "googlePlayUrl", title: "Google Play link", type: "url", group: "links" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string", group: "links" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string", group: "links" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
