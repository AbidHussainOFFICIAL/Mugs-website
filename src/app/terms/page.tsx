import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { TERMS_OF_SERVICE } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: TERMS_OF_SERVICE.description,
};

export default function Page() {
  return <LegalPage doc={TERMS_OF_SERVICE} />;
}
