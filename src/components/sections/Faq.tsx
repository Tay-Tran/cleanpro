import type { Faq as FaqItem } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="FAQ" title="Questions? We've got answers" />
      <div className="mt-12 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
        {faqs.map((faq) => (
          <details key={faq._id} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="text-brand-600 transition group-open:rotate-45" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 whitespace-pre-line text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
