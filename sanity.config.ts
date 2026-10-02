"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "cleanpro",
  title: "CleanPro CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      // Site settings is a single document, so it opens directly instead of as a list.
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("feature").title("Features"),
            S.documentTypeListItem("pricingPlan").title("Pricing plans"),
            S.documentTypeListItem("serviceArea").title("Service areas"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("legalPage").title("Legal pages"),
          ]),
    }),
  ],
  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "siteSettings"),
  },
});
