import type { ReactNode } from "react";
import PageShell from "@/components/PageShell";
import ContentSection from "@/components/ContentSection";
import PopularRow from "@/components/PopularRow";

// The shared layout for the 404 and 500 screens: a blue panel with a large
// yellow Anton code, a heading, one line of explanation and the actions,
// followed by a row of useful places to go next.
export default function ErrorScreen({
  code,
  title,
  text,
  children,
}: {
  code: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <PageShell>
      {/* A <header> directly under the Navbar with no gap, exactly like
          PageHeaderBanner, so the logo notch joins it on these screens too. */}
      <header
        aria-labelledby="error-heading"
        className="max-w-[1400px] w-full mx-auto rounded-tl-4xl rounded-b-4xl bg-[#183fad] px-5 py-12 text-center text-white sm:px-10 sm:py-20"
      >
        <p className="font-anton text-7xl text-[#F1BF0A] sm:text-9xl" aria-hidden="true">
          {code}
        </p>
        <h1 id="error-heading" className="mt-2 font-anton text-3xl sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[48ch] text-white/90">{text}</p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col items-stretch justify-center gap-3 min-[480px]:max-w-none min-[480px]:flex-row min-[480px]:items-center">
          {children}
        </div>
      </header>

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection title="WHERE TO NEXT?">
          <PopularRow />
        </ContentSection>
      </main>
    </PageShell>
  );
}
