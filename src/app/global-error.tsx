"use client";

import { useEffect } from "react";
import { Anton, Inter } from "next/font/google";
import "./styles.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

// The last line of defence: shown when the root layout itself throws, which
// app/error.tsx cannot catch because it renders inside that layout. It has to
// supply its own <html> and <body>, and it uses plain elements rather than the
// site's components, since the providers they rely on may be the thing that
// failed. (In development Next.js shows its own error overlay on top of any
// error screen; close it, or run a production build, to see this one.)
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body>
        <main className="flex min-h-dvh items-center justify-center p-4 text-[#090909]">
          <section
            aria-labelledby="global-error-heading"
            className="w-full max-w-[1400px] rounded-4xl bg-[#183fad] px-5 py-12 text-center text-white sm:px-10 sm:py-20"
          >
            <p className="font-anton text-7xl text-[#F1BF0A] sm:text-9xl" aria-hidden="true">
              500
            </p>
            <h1 id="global-error-heading" className="mt-2 font-anton text-3xl sm:text-5xl">
              SOMETHING WENT WRONG
            </h1>
            <p className="mx-auto mt-3 max-w-[48ch] text-white/90">That&apos;s on us, not you. Try again, or head back home.</p>
            <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 min-[480px]:max-w-none min-[480px]:flex-row min-[480px]:justify-center">
              <button
                type="button"
                onClick={reset}
                className="h-12 rounded-full bg-[#F1BF0A] px-6 text-base text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Try again
              </button>
              {/* A plain <a>: a full page load, so a broken layout starts over clean. */}
              <a
                href="/"
                className="flex h-12 items-center justify-center rounded-full border border-[#F1BF0A] px-6 text-base text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Back to home
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
