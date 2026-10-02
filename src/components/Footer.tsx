import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo name={settings.siteName} />
          {settings.tagline && <p className="mt-3 max-w-xs text-sm text-muted">{settings.tagline}</p>}
        </div>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {settings.contactEmail && (
              <li>
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-ink">
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {settings.contactPhone && (
              <li>
                <a href={`tel:${settings.contactPhone.replace(/[^+\d]/g, "")}`} className="hover:text-ink">
                  {settings.contactPhone}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/privacy" className="hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-black/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </p>
    </footer>
  );
}
