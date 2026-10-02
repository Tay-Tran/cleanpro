import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <h1 className="text-2xl font-semibold">Sanity is not connected yet</h1>
        <p className="mt-4 text-muted">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> to{" "}
          <code>.env.local</code>, then restart the dev server. See the README for step-by-step setup.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
