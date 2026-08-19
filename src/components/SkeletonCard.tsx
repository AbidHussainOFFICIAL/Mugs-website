export default function SkeletonCard() {
  return (
    <li className="col-span-1 flex flex-col rounded-3xl overflow-hidden animate-pulse" aria-hidden="true">
      <div className="h-9 bg-[#e9ecf6] rounded-tr-2xl" />
      <div className="bg-[#e9ecf6] p-2 pt-0">
        <div className="aspect-square bg-[#d8dced] rounded-2xl" />
      </div>
    </li>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <ul
      role="list"
      aria-label="Loading products"
      className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 md:grid-cols-3 xl:grid-cols-4 mt-6 sm:mt-10"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ul>
  );
}
