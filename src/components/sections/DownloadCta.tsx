import type { SiteSettings } from "@/lib/content";
import { StoreButtons } from "./StoreButtons";

export function DownloadCta({ settings }: { settings: SiteSettings }) {
  return (
    <section id="download" className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-brand-600 px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Your first clean is one tap away
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Download {settings.siteName}, book in under a minute, and come home to a spotless space.
        </p>
        <StoreButtons settings={settings} variant="light" className="mt-8 justify-center" />
      </div>
    </section>
  );
}
