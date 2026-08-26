"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

export default function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  return (
    <div>
      <div className="flex gap-3 sm:gap-4">
        {hasMultiple && (
          <div className="hidden lg:flex flex-col gap-2 shrink-0">
            {images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1} of ${productName}`}
                aria-pressed={activeIndex === i}
                className={`rounded-2xl overflow-hidden size-16 xl:size-20 border-2 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                  activeIndex === i ? "border-[#F1BF0A]" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open full-screen image"
          className="flex-1 bg-[#e9ecf6] rounded-3xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
            >
              <Image
                src={images[activeIndex]}
                alt={productName}
                width={700}
                height={700}
                priority
                className="w-full h-auto lg:h-[580px] object-cover lg:object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {hasMultiple && (
        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`size-1.5 rounded-full transition-colors ${activeIndex === i ? "bg-[#F1BF0A]" : "bg-[#e9ecf6]"}`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="fixed inset-0 z-[60] bg-[#183fad]/95 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} image viewer`}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center bg-[#F1BF0A] rounded-full p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-[88vw] h-[60vh] sm:w-[75vw] sm:h-[75vh] max-w-4xl rounded-3xl overflow-hidden bg-white">
              <Image
                src={images[activeIndex]}
                alt={productName}
                fill
                sizes="(max-width: 640px) 88vw, 75vw"
                className="object-contain"
              />
            </div>

            {hasMultiple && (
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`rounded-xl overflow-hidden size-12 border-2 ${
                      activeIndex === i ? "border-[#F1BF0A]" : "border-transparent opacity-70"
                    }`}
                  >
                    <Image src={img} alt="" width={48} height={48} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
