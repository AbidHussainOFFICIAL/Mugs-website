// A team member card built like the ProductCard: a soft tile with the name
// in a strip across the top and a square picture area below. There are no
// photos yet, so the picture area shows the person's initials on the
// mid-blue panel colour.
function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-3xl bg-[#e9ecf6]">
      <div className="pl-3 pr-2 py-2">
        <h3 className="truncate text-sm font-semibold">{name}</h3>
        <p className="truncate text-xs text-[#090909]/60">{role}</p>
      </div>
      <div className="px-2 pb-2">
        <div
          aria-hidden="true"
          className="flex aspect-square w-full items-center justify-center rounded-2xl bg-[#4565bc] font-anton text-5xl text-[#F1BF0A]"
        >
          {getInitials(name)}
        </div>
      </div>
    </li>
  );
}
