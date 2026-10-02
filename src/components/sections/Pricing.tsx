import type { PricingPlan } from "@/lib/content";
import { CheckIcon } from "../Icon";
import { SectionHeading } from "./SectionHeading";

export function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, upfront pricing"
        subtitle="The price you see is the price you pay. Supplies and insurance are always included."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan._id}
            className={`relative flex flex-col rounded-2xl p-8 ${
              plan.highlighted
                ? "bg-ink text-white shadow-xl ring-2 ring-brand-500"
                : "border border-black/10 bg-white"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-8 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            {plan.description && (
              <p className={`mt-2 text-sm ${plan.highlighted ? "text-white/70" : "text-muted"}`}>{plan.description}</p>
            )}
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
              {plan.period && (
                <span className={`text-sm ${plan.highlighted ? "text-white/70" : "text-muted"}`}>{plan.period}</span>
              )}
            </p>
            {plan.features && plan.features.length > 0 && (
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon className="size-5 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {plan.ctaUrl && (
              <a
                href={plan.ctaUrl}
                className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-brand-500 text-white hover:bg-brand-600"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {plan.ctaLabel ?? "Book now"}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
