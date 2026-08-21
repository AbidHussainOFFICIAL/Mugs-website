"use client";

import { AnimatePresence, motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
import { DURATION } from "@/lib/motion";

interface Crumb {
  label: string;
  href?: string;
}

export default function PageHeaderBanner({
  title,
  breadcrumb,
  count,
}: {
  title: string;
  breadcrumb: Crumb[];
  count?: string;
}) {
  return (
    <header className="max-w-[1400px] w-full mx-auto bg-[#183fad] text-white px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 rounded-tl-4xl rounded-b-4xl overflow-hidden">
      <div className="mb-3 sm:mb-4">
        <Breadcrumb items={breadcrumb} variant="dark" />
      </div>

      <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
        <h1 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#F1BF0A]">{title}</h1>
        {count && (
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: DURATION.fast }}
              className="bg-[#abb9de] rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-[#090909] text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}
