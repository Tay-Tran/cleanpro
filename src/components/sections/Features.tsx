import type { Feature } from "@/lib/content";
import { Icon } from "../Icon";
import { SectionHeading } from "./SectionHeading";

export function Features({ features }: { features: Feature[] }) {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Why CleanPro"
        title="Everything you need for a stress-free clean"
        subtitle="From booking to payment, the whole experience lives in one simple app."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature._id} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name={feature.icon} />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            {feature.description && <p className="mt-2 text-muted">{feature.description}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
