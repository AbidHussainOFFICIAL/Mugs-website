import Link from "next/link";

export default function CollectionHeader() {
  return (
    <div id="collection" className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8 scroll-mt-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-anton text-3xl/9 sm:text-4xl/11 md:text-5xl/14 lg:text-6xl/16">
          EXPLORE <span className="hidden sm:inline">THE </span><br className="hidden md:inline" />
          COLLECTION
        </h1>
        <Link
          href="/shop"
          aria-label="Explore Collection"
          className="sm:hidden flex items-center justify-center bg-[#F1BF0A] rounded-full size-11 shrink-0 border border-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </div>
      <div className="space-y-3 md:max-w-sm">
        <p className="text-sm sm:text-base">Limited edition mugs designed for everyday carry and modern travel. Only 2,000 units worldwide.</p>

        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-2 bg-[#F1BF0A] rounded-full py-1.25 pl-1.25 pr-3.5 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width,color] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 border border-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <div className="rounded-full p-1.5 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </div>
          <span className="relative z-10">Explore Collection</span>
        </Link>
      </div>
    </div>
  );
}
