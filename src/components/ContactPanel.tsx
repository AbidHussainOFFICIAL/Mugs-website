"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { PillButtonElement } from "@/components/PillButton";
import { CloseIcon, SendIcon } from "@/components/icons";
import { useOverlay } from "@/lib/useOverlay";
import type { ContactTopic } from "@/lib/contact";

// The Contact page's form. From the lg breakpoint it sits in the page as
// usual. Below it, the page shows a short card with a button, and the same
// form (one instance, so nothing typed is lost) opens as a full-page sheet.
// The two are switched with CSS alone, so there is no layout flash on load.
export default function ContactPanel({ initialTopic }: { initialTopic: ContactTopic }) {
  const [open, setOpen] = useState(false);
  const sheetRef = useOverlay<HTMLDivElement>(open, () => setOpen(false));

  // Growing past the breakpoint with the sheet open (rotating a tablet) puts
  // the form back in the page, so release the scroll lock with it.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    function handleChange() {
      if (query.matches) setOpen(false);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <div className="flex flex-col items-start gap-4 rounded-4xl bg-[#e9ecf6] p-5 sm:p-8 lg:hidden">
        <h2 className="font-anton text-2xl sm:text-3xl">SEND US A MESSAGE</h2>
        <p className="text-sm text-[#090909]/80 sm:text-base">Tell us what you need and we&apos;ll get back to you.</p>
        <div className="w-full min-[480px]:w-auto">
          <PillButtonElement onClick={() => setOpen(true)} icon={<SendIcon className="size-5" />} layout="fluid" focusRing="dark">
            Write to us
          </PillButtonElement>
        </div>
      </div>

      <div
        ref={sheetRef}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? "Contact us" : undefined}
        className={
          open
            ? "fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-white lg:static lg:z-auto lg:block lg:overflow-visible lg:bg-transparent"
            : "hidden lg:block"
        }
      >
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-3 bg-white px-4 py-3 lg:hidden">
          <p className="font-anton text-2xl">CONTACT US</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the contact form"
            className="flex shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <div className="min-w-0 px-4 pb-8 lg:p-0">
          <ContactForm key={initialTopic} initialTopic={initialTopic} />
        </div>
      </div>
    </>
  );
}
