import { PortableText, type PortableTextComponents } from "next-sanity";
import type { LegalPage } from "@/lib/content";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-lg font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 leading-relaxed text-muted">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-brand-700 underline">
        {children}
      </a>
    ),
  },
};

export function LegalContent({ page }: { page: LegalPage }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1>
      {page.updatedAt && (
        <p className="mt-3 text-sm text-muted">
          Last updated{" "}
          {new Date(page.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      )}
      <div className="mt-6">
        <PortableText value={page.body} components={components} />
      </div>
    </article>
  );
}
