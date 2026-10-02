import Image from "next/image";
import type { SiteSettings } from "@/lib/content";
import { urlFor } from "@/sanity/image";
import { StoreButtons } from "./StoreButtons";

export function Hero({ settings, availableAreas }: { settings: SiteSettings; availableAreas: number }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div>
          {availableAreas > 0 && (
            <a
              href="#areas"
              className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700"
            >
              <span className="size-1.5 rounded-full bg-brand-500" />
              Now booking in {availableAreas} {availableAreas === 1 ? "city" : "cities"}
            </a>
          )}
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {settings.heroTitle}
          </h1>
          {settings.heroSubtitle && (
            <p className="mt-5 max-w-xl text-lg text-pretty text-muted">{settings.heroSubtitle}</p>
          )}
          <StoreButtons settings={settings} className="mt-8" />
          <p className="mt-4 text-sm text-muted">Free to download · No subscription required</p>
        </div>

        <div className="flex justify-center lg:justify-end">
          {settings.heroImage ? (
            <Image
              src={urlFor(settings.heroImage).width(720).url()}
              alt={settings.heroImage.alt ?? `${settings.siteName} app`}
              width={360}
              height={720}
              priority
              className="h-auto w-64 rounded-[2.5rem] shadow-2xl sm:w-72"
            />
          ) : (
            <PhoneMockup />
          )}
        </div>
      </div>
    </section>
  );
}

// Placeholder app screen shown until a real screenshot is uploaded in the CMS.
function PhoneMockup() {
  return (
    <div className="w-64 rounded-[2.5rem] border-8 border-ink bg-white p-4 shadow-2xl sm:w-72" aria-hidden="true">
      <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-black/10" />
      <p className="text-xs text-muted">Good morning, Alex</p>
      <p className="mt-1 text-lg font-semibold">Book a cleaning</p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
        {["Standard", "Deep", "Move"].map((label, i) => (
          <div
            key={label}
            className={`rounded-xl px-2 py-3 ${i === 1 ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-900"}`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-brand-50 p-3">
        <p className="text-[11px] text-muted">Thu, Oct 9 · 10:00 AM</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="size-8 rounded-full bg-brand-200" />
          <div>
            <p className="text-xs font-medium">Maria G.</p>
            <p className="text-[10px] text-muted">★ 4.9 · 212 cleans</p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {["Kitchen & bathrooms", "Dusting & vacuuming", "Floors mopped"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-[11px]">
            <span className="size-3 rounded-full bg-brand-500" />
            {item}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-ink py-3 text-center text-xs font-medium text-white">Confirm · $149</div>
    </div>
  );
}
