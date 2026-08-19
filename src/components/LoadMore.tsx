"use client";

import { motion } from "framer-motion";

export default function LoadMore({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) {
  return (
    <div className="flex justify-center mt-10 sm:mt-14">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        disabled={loading}
        className="flex items-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
      >
        <div className="rounded-full p-1.5 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25 12 15.75 4.5 8.25" />
          </svg>
        </div>
        <span className="relative z-10">{loading ? "Loading…" : "Load More"}</span>
      </motion.button>
    </div>
  );
}
