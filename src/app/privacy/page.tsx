import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PRIVACY_POLICY } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_POLICY.description,
};

export default function Page() {
  return <LegalPage doc={PRIVACY_POLICY} />;
}
