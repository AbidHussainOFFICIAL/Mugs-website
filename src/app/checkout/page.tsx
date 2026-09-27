import type { Metadata } from "next";
import CheckoutPageContent from "@/components/CheckoutPageContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review and place your Mugsy's Mugs order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}