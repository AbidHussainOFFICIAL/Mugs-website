const TRUST_ITEMS = [
  {
    label: "Insulated 12hrs",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v4.5l3 1.5" />
      </>
    ),
  },
  {
    label: "Lifetime Warranty",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c-2.755 0-5.455.232-8.083.678a1 1 0 0 0-.826.994v2.146c0 5.51 3.212 10.335 7.834 12.564.316.152.663.152.978 0 4.623-2.229 7.834-7.054 7.834-12.564V4.672a1 1 0 0 0-.826-.994A48.973 48.973 0 0 0 12 3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 2.25 2.25 3.75-5.25" />
      </>
    ),
  },
  {
    label: "Free Returns",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-4.99m0 4.99a8.25 8.25 0 0 0-13.803-3.7L3.03 9.348m0 0H8.02M3.03 9.348v-4.99M3.03 9.348 6.21 12.53a8.25 8.25 0 0 0 13.803-3.7m0 0h-4.99"
      />
    ),
  },
  {
    label: "2,000 Units Only",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 0 0 3.182 0l4.318-4.318a2.25 2.25 0 0 0 0-3.182l-9.581-9.581A2.25 2.25 0 0 0 9.568 3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </>
    ),
  },
];

export default function TrustStrip() {
  return (
    <div className="max-w-[1400px] w-full mx-auto mt-6 sm:mt-8">
      <div className="bg-[#e9ecf6] rounded-4xl px-4 sm:px-8 py-5 sm:py-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-4">
        {TRUST_ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-2.5 w-1/2 sm:w-auto justify-center sm:justify-start px-2 ${
              i > 0 ? "sm:border-l sm:border-[#183fad]/15 sm:pl-6" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-[#183fad] shrink-0"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            <span className="text-xs sm:text-sm uppercase tracking-wide font-medium text-center sm:text-left">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
