export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-10-01";

// The site falls back to built-in sample content until a Sanity project is connected.
export const isSanityConfigured = projectId.length > 0;
