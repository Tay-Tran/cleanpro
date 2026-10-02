# CleanPro – Marketing site with a CMS

A marketing website for a (fictional) home-cleaning app, built so the owner can update
all content themselves without a developer.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Sanity CMS · Vercel

## Features

- **Editable without code:** hero text and image, features, pricing plans, service areas,
  FAQs, Privacy Policy, Terms of Service, contact details and App Store / Google Play links
- **Embedded CMS** at `/studio` (Sanity Studio inside the Next.js app)
- **Instant updates:** a Sanity webhook calls `/api/revalidate` on publish, with a 60-second
  fallback so changes still appear if the webhook is not configured
- **Never breaks:** if a CMS section is empty, or Sanity is unreachable, built-in sample
  content is shown instead of an empty or broken page
- **Responsive & accessible:** mobile menu, semantic HTML, native `<details>` FAQ accordion
- **SEO:** per-page titles, meta description from the CMS, FAQPage structured data (JSON-LD)
- **Fast:** pages are statically generated and served from the CDN

## Project structure

```
sanity.config.ts            Studio config (desk structure, singleton site settings)
src/
  app/
    (site)/                 Public pages: home, privacy, terms (shared header/footer)
    studio/[[...tool]]/     Embedded Sanity Studio
    api/revalidate/         Webhook endpoint that refreshes cached pages
  components/               Header, Footer, page sections
  lib/
    content.ts              Data layer: GROQ queries + fallback logic
    sample-content.ts       Built-in demo content
  sanity/
    schemaTypes/            CMS content models
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without any configuration the site runs on sample content.

## Connect Sanity

1. Create a free project at https://www.sanity.io/manage (dataset: `production`).
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In Sanity Manage → **API → CORS origins**, add `http://localhost:3000`
   (and your production URL later), with **Allow credentials** checked.
4. Restart `npm run dev` and open http://localhost:3000/studio to start editing.
5. Optional: load the demo content into the empty dataset:

   ```bash
   npx sanity login
   npx tsx scripts/build-seed.ts   # regenerates scripts/seed.ndjson
   npx sanity dataset import scripts/seed.ndjson --dataset production
   ```

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add the same environment variables in **Project → Settings → Environment Variables**,
   plus `SANITY_REVALIDATE_SECRET` (any long random string).
3. Add the Vercel URL to Sanity CORS origins.
4. In Sanity Manage → **API → Webhooks**, create a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: create, update, delete · HTTP method: POST
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
