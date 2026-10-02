import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { getLegalPage } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  return <LegalContent page={await getLegalPage("privacy")} />;
}
