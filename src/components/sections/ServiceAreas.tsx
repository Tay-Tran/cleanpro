import type { ServiceArea } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function ServiceAreas({ areas, contactEmail }: { areas: ServiceArea[]; contactEmail?: string }) {
  return (
    <section id="areas" className="bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Service areas"
          title="Where we clean"
          subtitle="We're growing fast. Don't see your city yet? Let us know and we'll notify you at launch."
        />
        <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <li
              key={area._id}
              className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-black/5"
            >
              <span className="font-medium">{area.name}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  area.available ? "bg-brand-100 text-brand-700" : "bg-black/5 text-muted"
                }`}
              >
                {area.note || (area.available ? "Available" : "Coming soon")}
              </span>
            </li>
          ))}
        </ul>
        {contactEmail && (
          <p className="mt-8 text-center text-sm text-muted">
            Request your city:{" "}
            <a href={`mailto:${contactEmail}?subject=New%20city%20request`} className="font-medium text-brand-700 underline">
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
