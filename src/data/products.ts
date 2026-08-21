export type ProductCategory = "travel" | "camp" | "gift";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  /** Gallery images. Currently one shot per product — the gallery UI is
   * built to support more and simply omits the thumbnail strip/dots when
   * there's only one, rather than us fabricating extra angles that don't
   * exist. */
  images: string[];
  category: ProductCategory;
  inStock: boolean;
  tags: string[];
  /** Dummy variant data, as requested — not sourced from a real catalog. */
  colors: ProductColor[];
  sizes: string[];
}

const COLOR_PALETTE: Record<string, ProductColor> = {
  black: { name: "Matte Black", hex: "#1c1c1e" },
  blue: { name: "Ocean Blue", hex: "#183fad" },
  sand: { name: "Sand", hex: "#d8c9a3" },
  forest: { name: "Forest Green", hex: "#2f4b3c" },
  sunset: { name: "Sunset Orange", hex: "#d97a3f" },
};

const SIZES = ["12oz", "16oz"];

export const products: Product[] = [
  {
    slug: "the-classic",
    name: "The Classic",
    price: 120,
    originalPrice: 200,
    image: "https://i.postimg.cc/1zN0rTcN/img-1.jpg",
    images: ["https://i.postimg.cc/1zN0rTcN/img-1.jpg"],
    category: "travel",
    inStock: true,
    tags: ["classic", "everyday", "stainless steel"],
    colors: [COLOR_PALETTE.black, COLOR_PALETTE.blue, COLOR_PALETTE.sand],
    sizes: SIZES,
  },
  {
    slug: "the-camper",
    name: "The Camper",
    price: 80,
    originalPrice: 200,
    image: "https://i.postimg.cc/zGQSW-5Wk/img-2.jpg",
    images: ["https://i.postimg.cc/zGQSW-5Wk/img-2.jpg"],
    category: "camp",
    inStock: true,
    tags: ["camping", "outdoor", "rugged"],
    colors: [COLOR_PALETTE.forest, COLOR_PALETTE.black],
    sizes: SIZES,
  },
  {
    slug: "the-couple",
    name: "The Couple",
    price: 150,
    originalPrice: 200,
    image: "https://i.postimg.cc/Bv15BycF/img-3.jpg",
    images: ["https://i.postimg.cc/Bv15BycF/img-3.jpg"],
    category: "gift",
    inStock: true,
    tags: ["gift", "couple", "pair"],
    colors: [COLOR_PALETTE.blue, COLOR_PALETTE.sand, COLOR_PALETTE.sunset],
    sizes: SIZES,
  },
  {
    slug: "the-ridge",
    name: "The Ridge",
    price: 70,
    originalPrice: 200,
    image: "https://i.postimg.cc/tgVdNftx/img-4.jpg",
    images: ["https://i.postimg.cc/tgVdNftx/img-4.jpg"],
    category: "camp",
    inStock: true,
    tags: ["camping", "mountain", "rugged"],
    colors: [COLOR_PALETTE.forest, COLOR_PALETTE.black, COLOR_PALETTE.sand],
    sizes: SIZES,
  },
  {
    slug: "dreams",
    name: "Dreams",
    price: 60,
    originalPrice: 200,
    image: "https://i.postimg.cc/0NJG03dm/img-5.jpg",
    images: ["https://i.postimg.cc/0NJG03dm/img-5.jpg"],
    category: "gift",
    inStock: true,
    tags: ["gift", "cute", "pastel"],
    colors: [COLOR_PALETTE.sand, COLOR_PALETTE.sunset],
    sizes: SIZES,
  },
  {
    slug: "van-life",
    name: "Van Life",
    price: 110,
    originalPrice: 200,
    image: "https://i.postimg.cc/YSmNzVfY/img-6.jpg",
    images: ["https://i.postimg.cc/YSmNzVfY/img-6.jpg"],
    category: "camp",
    inStock: true,
    tags: ["van", "roadtrip", "travel"],
    colors: [COLOR_PALETTE.blue, COLOR_PALETTE.forest, COLOR_PALETTE.black],
    sizes: SIZES,
  },
  {
    slug: "the-bold",
    name: "The Bold",
    price: 140,
    originalPrice: 200,
    image: "https://i.postimg.cc/KYg7DVrt/img-7.jpg",
    images: ["https://i.postimg.cc/KYg7DVrt/img-7.jpg"],
    category: "travel",
    inStock: true,
    tags: ["bold", "commute", "insulated"],
    colors: [COLOR_PALETTE.black, COLOR_PALETTE.sunset],
    sizes: SIZES,
  },
  {
    slug: "the-traveler",
    name: "The Traveler",
    price: 180,
    originalPrice: 200,
    image: "https://i.postimg.cc/9fqPYStG/img-8.jpg",
    images: ["https://i.postimg.cc/9fqPYStG/img-8.jpg"],
    category: "travel",
    inStock: true,
    tags: ["travel", "airport", "premium"],
    colors: [COLOR_PALETTE.black, COLOR_PALETTE.blue, COLOR_PALETTE.sand],
    sizes: SIZES,
  },
  {
    slug: "the-savor",
    name: "The Savor",
    price: 50,
    originalPrice: 200,
    image: "https://i.postimg.cc/25Bd7JFQ/img-9.jpg",
    images: ["https://i.postimg.cc/25Bd7JFQ/img-9.jpg"],
    category: "gift",
    inStock: true,
    tags: ["gift", "coffee", "savor"],
    colors: [COLOR_PALETTE.sand, COLOR_PALETTE.sunset, COLOR_PALETTE.blue],
    sizes: SIZES,
  },
];
