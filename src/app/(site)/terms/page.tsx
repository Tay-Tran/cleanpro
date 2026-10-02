import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { getLegalPage } from "@/lib/content";

export const metadata: Metadata = { title: "Terms of Service" };

export default async function TermsPage() {
  return <LegalContent page={await getLegalPage("terms")} />;
}
