import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SHIPPING_RETURNS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: SHIPPING_RETURNS.description,
};

export default function Page() {
  return <LegalPage doc={SHIPPING_RETURNS} />;
}
