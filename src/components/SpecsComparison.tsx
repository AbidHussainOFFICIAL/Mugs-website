const SPECS = [
  { label: "Capacity", value: "12 oz (355 ml)" },
  { label: "Insulation", value: "Hot 12 hrs · Cold 24 hrs" },
  { label: "Material", value: "18/8 stainless steel, double-walled" },
  { label: "Dishwasher Safe", value: "Yes, top rack" },
  { label: "Weight", value: "310 g" },
];

export default function SpecsComparison() {
  return (
    <section className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20">
      <h2 className="font-anton text-2xl sm:text-3xl mb-4 sm:mb-6">SPECS</h2>
      <div className="rounded-3xl overflow-hidden border border-[#183fad]/10">
        {SPECS.map((spec, i) => (
          <div
            key={spec.label}
            className={`flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 ${
              i % 2 === 0 ? "bg-[#e9ecf6]" : "bg-white"
            } ${i > 0 ? "border-t border-[#183fad]/10" : ""}`}
          >
            <span className="text-sm sm:text-base text-[#5b5f6b]">{spec.label}</span>
            <span className="text-sm sm:text-base font-medium text-right">{spec.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
