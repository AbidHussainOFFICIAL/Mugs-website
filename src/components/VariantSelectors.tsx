import type { ProductColor } from "@/data/products";

export default function VariantSelectors({
  colors,
  sizes,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
}: {
  colors: ProductColor[];
  sizes: string[];
  selectedColor: string;
  onSelectColor: (name: string) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">
            Color: <span className="font-normal text-[#5b5f6b]">{selectedColor}</span>
          </h3>
          <div className="flex gap-2">
            {colors.map((color) => {
              const isSelected = color.name === selectedColor;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onSelectColor(color.name)}
                  aria-label={color.name}
                  aria-pressed={isSelected}
                  className={`size-9 rounded-full border-2 p-0.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                    isSelected ? "border-[#F1BF0A]" : "border-transparent"
                  }`}
                >
                  <span
                    className="block size-full rounded-full border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 1 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isSelected = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSelectSize(size)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium border border-[#F1BF0A] transition-colors ${
                    isSelected ? "bg-[#F1BF0A] text-[#090909]" : "bg-transparent text-[#090909] hover:bg-[#F1BF0A]/10"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
