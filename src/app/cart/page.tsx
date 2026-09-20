import type { Metadata } from "next";
import CartPageContent from "@/components/CartPageContent";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your Mugsy's Mugs cart.",
};

export default function CartPage() {
  return <CartPageContent />;
}
