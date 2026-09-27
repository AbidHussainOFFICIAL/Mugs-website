import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { CartDrawerProvider } from "@/context/CartDrawerContext";
import CartDrawer from "@/components/CartDrawer";
import { SITE_URL } from "@/lib/site";
import "./styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const title = "Mugsy's Mugs — Limited Edition Travel Mugs";
const description =
  "Limited edition mugs designed for everyday carry and modern travel. Only 2,000 units worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Mugsy's Mugs",
  },
  description,
  icons: {
    icon: "/favicon.ico",
  },
  // No openGraph/twitter image block for now — there's no /public/og-image.jpg
  // in the project, and pointing a share-preview tag at a file that 404s is
  // worse than omitting it (some platforms cache the broken result). Title
  // and description still populate a plain-text link preview everywhere.
  // Add `images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "..." }]`
  // back to both blocks below once that asset exists.
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Mugsy's Mugs",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <ReviewsProvider>
              <CartDrawerProvider>
                {children}
                <CartDrawer />
              </CartDrawerProvider>
            </ReviewsProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
