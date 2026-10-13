import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { CartDrawerProvider } from "@/context/CartDrawerContext";
import CartDrawer from "@/components/CartDrawer";
import UndoToast from "@/components/UndoToast";
import CartAnnouncer from "@/components/CartAnnouncer";
import BottomTabBar from "@/components/BottomTabBar";
import CookieBanner from "@/components/CookieBanner";
import CookiePreferences from "@/components/CookiePreferences";
import SplashScreen from "@/components/SplashScreen";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { SPLASH_SEEN_CLASS, SPLASH_SEEN_KEY } from "@/lib/splash";
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

// The favicon comes from app/icon.svg, which Next.js picks up automatically,
// so there is deliberately no `icons` entry here.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Mugsy's Mugs",
  },
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Mugsy's Mugs",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mugsy's Mugs — limited edition travel mugs" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the inline script below may add a class to
    // <html> before React hydrates, which would otherwise log a mismatch.
    <html lang="en" className={`${inter.variable} ${anton.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: if the phone splash already played this visit,
            hide it with CSS so it doesn't flash on every page load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_SEEN_KEY)}))document.documentElement.classList.add(${JSON.stringify(SPLASH_SEEN_CLASS)})}catch(e){}`,
          }}
        />
        {/* No scripts, no splash: it could never be dismissed. */}
        <noscript>
          <style>{"[data-splash]{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <CookieConsentProvider>
          <CartProvider>
            <WishlistProvider>
              <ReviewsProvider>
                <CartDrawerProvider>
                  <SplashScreen />
                  {children}
                  <BottomTabBar />
                  <CartDrawer />
                  <UndoToast />
                  <CartAnnouncer />
                  <CookieBanner />
                  <CookiePreferences />
                </CartDrawerProvider>
              </ReviewsProvider>
            </WishlistProvider>
          </CartProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
