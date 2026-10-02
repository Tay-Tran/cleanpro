import type { SiteSettings } from "@/lib/content";

type Props = { settings: SiteSettings; className?: string; variant?: "dark" | "light" };

export function StoreButtons({ settings, className = "", variant = "dark" }: Props) {
  const style =
    variant === "dark"
      ? "bg-ink text-white hover:bg-black"
      : "bg-white text-ink hover:bg-brand-50";

  const stores = [
    { href: settings.appStoreUrl, small: "Download on the", label: "App Store", icon: <AppleIcon /> },
    { href: settings.googlePlayUrl, small: "Get it on", label: "Google Play", icon: <PlayIcon /> },
  ].filter((s) => s.href);

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {stores.map((store) => (
        <a
          key={store.label}
          href={store.href}
          className={`inline-flex items-center gap-3 rounded-xl px-5 py-3 transition ${style}`}
        >
          {store.icon}
          <span className="text-left leading-tight">
            <span className="block text-[10px] opacity-80">{store.small}</span>
            <span className="block text-base font-semibold">{store.label}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
      <path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8C7 7.3 5.5 8.2 4.7 9.7c-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.1.8c1.3 0 2.1-1.2 2.9-2.4.9-1.3 1.3-2.6 1.3-2.7 0 0-2.5-1-2.5-3.9zM14.1 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
      <path d="M4 2.8v18.4c0 .4.4.7.8.5l15.6-9.2c.4-.2.4-.8 0-1L4.8 2.3c-.4-.2-.8.1-.8.5z" />
    </svg>
  );
}
