import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="max-w-[1400px] w-full mx-auto mt-16 sm:mt-24 flex-1 text-center">
        <h1 className="font-anton text-5xl sm:text-6xl text-[#183fad]">404</h1>
        <p className="mt-4 text-lg">We couldn&apos;t find that page.</p>
        <Link href="/" className="mt-6 inline-block bg-[#F1BF0A] rounded-full py-2.5 px-6 font-semibold hover:bg-[#dcae09] transition-colors">
          Back to home
        </Link>
      </main>
    </PageShell>
  );
}
