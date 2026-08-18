import Image from "next/image";

const CLAIMS = [
  "18/8 stainless steel, double-walled for 12-hour heat retention",
  "Powder-coated finish resists chips, scratches, and everyday drops",
  "Hand-finished in small batches — never more than 2,000 per run",
];

export default function CraftStory() {
  return (
    <section className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20">
      <div className="bg-[#183fad] text-white rounded-4xl overflow-hidden flex flex-col md:flex-row relative z-0">
        <div className="w-full md:w-1/2 bg-[#4565bc] p-3 sm:p-4 relative">
          <Image
            src="https://i.postimg.cc/YqVLr48H/mug.png"
            alt="Mugsy's mug resting on a campsite table at dusk"
            width={700}
            height={700}
            className="w-full h-64 sm:h-80 md:h-full object-cover rounded-3xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center gap-5">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#F1BF0A]">
            BUILT FOR THE LONG HAUL
          </h2>
          <p className="max-w-md text-white/90">
            Every mug is engineered for everyday adventures — durable, lightweight, and made to
            move with you, from the morning commute to the campsite.
          </p>
          <ul className="flex flex-col gap-3 max-w-md">
            {CLAIMS.map((claim) => (
              <li key={claim} className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="size-5 text-[#F1BF0A] shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-sm sm:text-base text-white/90">{claim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
