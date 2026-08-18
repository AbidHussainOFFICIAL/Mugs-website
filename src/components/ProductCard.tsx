"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <li className="col-span-1 flex flex-col rounded-3xl overflow-hidden">
      <div>
        <div className="flex ">
          <div className="pl-3 flex-1 bg-[#e9ecf6] flex gap-2 items-center rounded-tr-2xl relative after:content-[''] after:absolute after:top-0 after:right-0 after:h-1/2 after:w-1/2 after:bg-white after:-z-5">
            <span className="line-through text-[#b7bac5]">${product.originalPrice}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          <div className="flex items-center gap-1 bg-white pl-1.5 pr-px pt-1 pb-1.5 rounded-bl-3xl rounded-tr-3xl relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1/2 after:w-1/2 after:bg-[#e9ecf6] after:-z-5">
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={justAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`}
              className="flex items-center bg-[#F1BF0A] rounded-full p-1.25 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.25 after:rounded-full after:bg-white after:w-8 after:h-8 sm:after:h-5.5 sm:after:w-5.5 after:transition-[width,left] after:duration-[2000ms] after:ease-[linear(0,0.014_0.4%,0.054_0.8%,0.228_1.7%,1.141_4.6%,1.402_5.6%,1.565_6.6%,1.599_7%,1.617_7.5%,1.611_7.9%,1.58_8.4%,1.47_9.3%,0.924_12.1%,0.747_13.2%,0.655_14.1%,0.633_14.5%,0.62_15%,0.622_15.4%,0.639_15.9%,0.705_16.8%,1.052_19.7%,1.159_20.8%,1.214_21.7%,1.235_22.6%,1.221_23.5%,1.18_24.4%,0.972_27.2%,0.905_28.3%,0.869_29.2%,0.855_30.1%,0.862_31%,0.887_31.9%,1.06_35.9%,1.081_36.8%,1.089_37.7%,1.084_38.6%,1.069_39.5%,0.964_43.4%,0.945_45.2%,0.954_46.8%,1.019_50.7%,1.034_52.7%,1.029_54.3%,0.989_58.2%,0.979_60.3%,1.013_67.8%,0.992_75.3%,1.005_82.7%,0.997_90.4%,1)] overflow-hidden hover:after:size-full hover:after:left-0 cursor-pointer border border-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
            >
              <span className="rounded-full p-1.5 sm:p-1 relative z-10">
                {justAdded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 sm:size-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-3.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setWishlisted((w) => !w)}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              className="hidden sm:flex items-center bg-[#F1BF0A] rounded-full p-1.25 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.25 after:rounded-full after:bg-white after:w-8 after:h-8 sm:after:h-5.5 sm:after:w-5.5 after:transition-[width,left] after:duration-[2000ms] after:ease-[linear(0,0.014_0.4%,0.054_0.8%,0.228_1.7%,1.141_4.6%,1.402_5.6%,1.565_6.6%,1.599_7%,1.617_7.5%,1.611_7.9%,1.58_8.4%,1.47_9.3%,0.924_12.1%,0.747_13.2%,0.655_14.1%,0.633_14.5%,0.62_15%,0.622_15.4%,0.639_15.9%,0.705_16.8%,1.052_19.7%,1.159_20.8%,1.214_21.7%,1.235_22.6%,1.221_23.5%,1.18_24.4%,0.972_27.2%,0.905_28.3%,0.869_29.2%,0.855_30.1%,0.862_31%,0.887_31.9%,1.06_35.9%,1.081_36.8%,1.089_37.7%,1.084_38.6%,1.069_39.5%,0.964_43.4%,0.945_45.2%,0.954_46.8%,1.019_50.7%,1.034_52.7%,1.029_54.3%,0.989_58.2%,0.979_60.3%,1.013_67.8%,0.992_75.3%,1.005_82.7%,0.997_90.4%,1)] overflow-hidden hover:after:size-full hover:after:left-0 cursor-pointer border border-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
            >
              <span className="rounded-full p-1.5 sm:p-1 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill={wishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-3.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <h3 className="pl-3 text-sm py-2 truncate bg-[#e9ecf6] rounded-tr-3xl">
          <Link href={`/shop/${product.slug}`} className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded">
            {product.name}
          </Link>
        </h3>
      </div>
      <Link href={`/shop/${product.slug}`} className="flex flex-1 flex-col px-2 pb-2 bg-[#e9ecf6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded-b-2xl">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="select-none pointer-events-none w-full h-auto shrink-0 rounded-2xl object-cover"
        />
      </Link>
    </li>
  );
}
