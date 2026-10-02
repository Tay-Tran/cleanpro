import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: { default: settings.siteName, template: `%s · ${settings.siteName}` },
    description: settings.tagline,
  };
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header siteName={settings.siteName} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
