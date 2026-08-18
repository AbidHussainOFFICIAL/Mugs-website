export interface Product {
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

export const products: Product[] = [
  {
    slug: "the-classic",
    name: "The Classic",
    price: 120,
    originalPrice: 200,
    image: "https://i.postimg.cc/1zN0rTcN/img-1.jpg",
  },
  {
    slug: "the-camper",
    name: "The Camper",
    price: 80,
    originalPrice: 200,
    image: "https://i.postimg.cc/zGQSW-5Wk/img-2.jpg",
  },
  {
    slug: "the-couple",
    name: "The Couple",
    price: 150,
    originalPrice: 200,
    image: "https://i.postimg.cc/Bv15BycF/img-3.jpg",
  },
  {
    slug: "the-ridge",
    name: "The Ridge",
    price: 70,
    originalPrice: 200,
    image: "https://i.postimg.cc/tgVdNftx/img-4.jpg",
  },
  {
    slug: "dreams",
    name: "Dreams",
    price: 60,
    originalPrice: 200,
    image: "https://i.postimg.cc/0NJG03dm/img-5.jpg",
  },
  {
    slug: "van-life",
    name: "Van Life",
    price: 110,
    originalPrice: 200,
    image: "https://i.postimg.cc/YSmNzVfY/img-6.jpg",
  },
  {
    slug: "the-bold",
    name: "The Bold",
    price: 140,
    originalPrice: 200,
    image: "https://i.postimg.cc/KYg7DVrt/img-7.jpg",
  },
  {
    slug: "the-traveler",
    name: "The Traveler",
    price: 180,
    originalPrice: 200,
    image: "https://i.postimg.cc/9fqPYStG/img-8.jpg",
  },
  {
    slug: "the-savor",
    name: "The Savor",
    price: 50,
    originalPrice: 200,
    image: "https://i.postimg.cc/25Bd7JFQ/img-9.jpg",
  },
];
