"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

function scrollToCollection() {
  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const logoProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: DURATION.base, ease: EASE },
      };

  const panelProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: DURATION.base, ease: EASE, delay: 0.1 },
      };

  const statProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: DURATION.base, ease: EASE, delay: 0.2 },
      };

  const mugProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: DURATION.slow, ease: EASE, delay: 0.3 },
      };

  return (
    <header className="max-w-[1400px] w-full mx-auto bg-[#183fad] text-white px-3.5 sm:px-6 lg:px-8 pb-3.5 pt-3 sm:pt-5 lg:pt-7 rounded-tl-4xl rounded-b-4xl relative z-0 overflow-hidden">
      <motion.div {...logoProps} className="mx-auto flex justify-center w-[88%] sm:w-[80%] md:w-[74%] lg:w-[64%] h-[14vh] sm:h-[16vh] md:h-[18vh] lg:h-[25vh] max-h-[230px] lg:max-h-[300px] min-h-[80px]">
        <svg viewBox="0 0 39 11" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" role="img" aria-label="Mugsy's Mugs">
          <path d="M0 10.418V0.105469H3.14062L4.00781 6.39258L4.86914 0.105469H8.03906V10.418H6.15234V2.98828L4.96875 10.418H3.11719L1.86328 2.98828V10.418H0Z" fill="white" />
          <path d="M11.3379 10.5117C10.4785 10.5117 9.8457 10.2715 9.43945 9.79102C9.0332 9.30664 8.83008 8.5957 8.83008 7.6582V0.105469H10.834V7.57617C10.834 7.74805 10.8438 7.91406 10.8633 8.07422C10.8828 8.23047 10.9277 8.35938 10.998 8.46094C11.0684 8.5625 11.1816 8.61328 11.3379 8.61328C11.498 8.61328 11.6133 8.56445 11.6836 8.4668C11.7539 8.36523 11.7969 8.23438 11.8125 8.07422C11.832 7.91406 11.8418 7.74805 11.8418 7.57617V0.105469H13.8457V7.6582C13.8457 8.5957 13.6426 9.30664 13.2363 9.79102C12.8301 10.2715 12.1973 10.5117 11.3379 10.5117Z" fill="white" />
          <path d="M16.7637 10.5117C15.291 10.5117 14.5547 9.45703 14.5547 7.34766V2.90039C14.5547 0.974609 15.3984 0.0117188 17.0859 0.0117188C17.7812 0.0117188 18.3145 0.152344 18.6855 0.433594C19.0566 0.710938 19.3125 1.11719 19.4531 1.65234C19.5938 2.1875 19.6641 2.83984 19.6641 3.60938H17.6484V2.69531C17.6484 2.47266 17.6172 2.28711 17.5547 2.13867C17.4961 1.98633 17.3711 1.91016 17.1797 1.91016C16.9414 1.91016 16.7832 1.99023 16.7051 2.15039C16.6309 2.31055 16.5938 2.48633 16.5938 2.67773V7.67578C16.5938 7.95312 16.6289 8.17969 16.6992 8.35547C16.7734 8.52734 16.916 8.61328 17.127 8.61328C17.3457 8.61328 17.4902 8.52734 17.5605 8.35547C17.6348 8.17969 17.6719 7.94922 17.6719 7.66406V6.19336H17.1211V4.41211H19.6406V10.418H18.8145L18.4629 9.55078C18.1035 10.1914 17.5371 10.5117 16.7637 10.5117Z" fill="white" />
          <path d="M22.9102 10.5117C21.9688 10.5117 21.2891 10.2773 20.8711 9.80859C20.457 9.33984 20.25 8.59375 20.25 7.57031V6.5625H22.2891V7.85156C22.2891 8.08984 22.3242 8.27734 22.3945 8.41406C22.4688 8.54688 22.5957 8.61328 22.7754 8.61328C22.9629 8.61328 23.0918 8.55859 23.1621 8.44922C23.2363 8.33984 23.2734 8.16016 23.2734 7.91016C23.2734 7.59375 23.2422 7.33008 23.1797 7.11914C23.1172 6.9043 23.0078 6.70117 22.8516 6.50977C22.6992 6.31445 22.4863 6.08789 22.2129 5.83008L21.2871 4.95117C20.5957 4.29883 20.25 3.55273 20.25 2.71289C20.25 1.83398 20.4531 1.16406 20.8594 0.703125C21.2695 0.242188 21.8613 0.0117188 22.6348 0.0117188C23.5801 0.0117188 24.25 0.263672 24.6445 0.767578C25.043 1.27148 25.2422 2.03711 25.2422 3.06445H23.1445V2.35547C23.1445 2.21484 23.1035 2.10547 23.0215 2.02734C22.9434 1.94922 22.8359 1.91016 22.6992 1.91016C22.5352 1.91016 22.4141 1.95703 22.3359 2.05078C22.2617 2.14062 22.2246 2.25781 22.2246 2.40234C22.2246 2.54688 22.2637 2.70312 22.3418 2.87109C22.4199 3.03906 22.5742 3.23242 22.8047 3.45117L23.9941 4.59375C24.2324 4.82031 24.4512 5.06055 24.6504 5.31445C24.8496 5.56445 25.0098 5.85742 25.1309 6.19336C25.252 6.52539 25.3125 6.93164 25.3125 7.41211C25.3125 8.38086 25.1328 9.14062 24.7734 9.69141C24.418 10.2383 23.7969 10.5117 22.9102 10.5117Z" fill="white" />
          <path d="M27.252 10.418V7.02539L25.6055 0.105469H27.6504L28.2246 3.59766L28.7988 0.105469H30.8379L29.1973 7.02539V10.418H27.252Z" fill="white" />
          <path d="M31.5527 3.12891L31.9395 1.74609H31.1953V0H33.3867V1.69336L32.7891 3.12891H31.5527Z" fill="white" />
          <path d="M36.5977 10.5117C35.6562 10.5117 34.9766 10.2773 34.5586 9.80859C34.1445 9.33984 33.9375 8.59375 33.9375 7.57031V6.5625H35.9766V7.85156C35.9766 8.08984 36.0117 8.27734 36.082 8.41406C36.1562 8.54688 36.2832 8.61328 36.4629 8.61328C36.6504 8.61328 36.7793 8.55859 36.8496 8.44922C36.9238 8.33984 36.9609 8.16016 36.9609 7.91016C36.9609 7.59375 36.9297 7.33008 36.8672 7.11914C36.8047 6.9043 36.6953 6.70117 36.5391 6.50977C36.3867 6.31445 36.1738 6.08789 35.9004 5.83008L34.9746 4.95117C34.2832 4.29883 33.9375 3.55273 33.9375 2.71289C33.9375 1.83398 34.1406 1.16406 34.5469 0.703125C34.957 0.242188 35.5488 0.0117188 36.3223 0.0117188C37.2676 0.0117188 37.9375 0.263672 38.332 0.767578C38.7305 1.27148 38.9297 2.03711 38.9297 3.06445H36.832V2.35547C36.832 2.21484 36.791 2.10547 36.709 2.02734C36.6309 1.94922 36.5234 1.91016 36.3867 1.91016C36.2227 1.91016 36.1016 1.95703 36.0234 2.05078C35.9492 2.14062 35.9121 2.25781 35.9121 2.40234C35.9121 2.54688 35.9512 2.70312 36.0293 2.87109C36.1074 3.03906 36.2617 3.23242 36.4922 3.45117L37.6816 4.59375C37.9199 4.82031 38.1387 5.06055 38.3379 5.31445C38.5371 5.56445 38.6973 5.85742 38.8184 6.19336C38.9395 6.52539 39 6.93164 39 7.41211C39 8.38086 38.8203 9.14062 38.4609 9.69141C38.1055 10.2383 37.4844 10.5117 36.5977 10.5117Z" fill="white" />
        </svg>
      </motion.div>

      <motion.div {...panelProps} className="mt-2 sm:mt-4 lg:mt-10 pt-5 sm:pt-7 bg-[#4565bc] rounded-4xl">
        <div className="flex flex-col sm:flex-row sm:items-stretch justify-between sm:bg-[#4565bc] rounded-b-4xl relative z-10 px-3 sm:px-6 pb-4 sm:pb-6">
          <div className="flex flex-col justify-between">
            <h2 className="text-[#F1BF0A] text-3xl sm:text-4xl lg:text-5xl">PREMIUM</h2>
            <p className="mt-2 mb-6 sm:mb-0 sm:mt-0 sm:max-w-xs">
              Engineered for everyday adventures. Durable, lightweight, and built to move with you wherever the journey leads.
            </p>
          </div>
          <motion.div {...statProps} className="bg-[#abb9de] rounded-2xl p-4 text-[#090909] sm:max-w-[230px]">
            <div className="flex items-center gap-4">
              <span className="text-4xl">98%</span>
              <div className="-space-x-3 my-2 sm:my-4">
                <Image src="https://i.postimg.cc/y8g3KSxd/avatar-1.jpg" alt="" width={40} height={40} className="inline-block size-8 sm:size-10 rounded-full outline -outline-offset-1 outline-black/5 object-cover" />
                <Image src="https://i.postimg.cc/BnrLnQPp/avatar-2.jpg" alt="" width={40} height={40} className="inline-block size-8 sm:size-10 rounded-full outline -outline-offset-1 outline-black/5 object-cover" />
                <Image src="https://i.postimg.cc/W1BF1bqQ/avatar-3.jpg" alt="" width={40} height={40} className="inline-block size-8 sm:size-10 rounded-full outline -outline-offset-1 outline-black/5 object-cover" />
              </div>
            </div>
            <p className="text-sm">Customer satisfaction rating across all orders</p>
          </motion.div>
        </div>

        <div className="flex items-stretch justify-between relative z-5 after:content-[''] after:absolute after:-top-1/2 after:left-0 after:h-20 after:w-24 after:bg-[#183fad] after:-z-5 before:content-[''] before:absolute before:-top-1/2 before:right-0 before:h-20 before:w-24 before:bg-[#183fad] before:-z-5 after:hidden sm:after:block before:hidden sm:before:block">
          <div className="w-full min-[480px]:w-auto flex-1 min-[480px]:flex-none sm:bg-[#183fad] pb-3 pl-3 pr-3 min-[480px]:pr-0 sm:p-6 rounded-tr-4xl rounded-bl-4xl relative after:content-[''] after:absolute after:bottom-0 after:-right-1/2 after:h-1/2 after:w-full after:bg-[#183fad] after:-z-5 after:hidden sm:after:block">
            <Link
              href="/shop"
              className="flex items-center justify-center min-[480px]:justify-start gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <div className="rounded-full p-1.5 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </div>
              <span className="relative z-10">Shop Now</span>
            </Link>
          </div>

          <div className="hidden sm:block bg-[#4565bc] flex-1 rounded-b-4xl relative z-10"></div>

          <div className="hidden sm:flex items-center gap-3 bg-[#183fad] p-6 rounded-tl-4xl rounded-br-4xl relative after:content-[''] after:absolute after:bottom-0 after:-left-1/2 after:h-1/2 after:w-full after:bg-[#183fad] after:-z-5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll back to top"
              onClick={scrollToTop}
              className="flex items-center bg-[#F1BF0A] rounded-full p-1.5 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 after:transition-[width,left] after:duration-[2000ms] after:ease-[linear(0,0.014_0.4%,0.054_0.8%,0.228_1.7%,1.141_4.6%,1.402_5.6%,1.565_6.6%,1.599_7%,1.617_7.5%,1.611_7.9%,1.58_8.4%,1.47_9.3%,0.924_12.1%,0.747_13.2%,0.655_14.1%,0.633_14.5%,0.62_15%,0.622_15.4%,0.639_15.9%,0.705_16.8%,1.052_19.7%,1.159_20.8%,1.214_21.7%,1.235_22.6%,1.221_23.5%,1.18_24.4%,0.972_27.2%,0.905_28.3%,0.869_29.2%,0.855_30.1%,0.862_31%,0.887_31.9%,1.06_35.9%,1.081_36.8%,1.089_37.7%,1.084_38.6%,1.069_39.5%,0.964_43.4%,0.945_45.2%,0.954_46.8%,1.019_50.7%,1.034_52.7%,1.029_54.3%,0.989_58.2%,0.979_60.3%,1.013_67.8%,0.992_75.3%,1.005_82.7%,0.997_90.4%,1)] overflow-hidden hover:after:size-full hover:after:left-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="rounded-full p-1.5 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
              </span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to the collection"
              onClick={scrollToCollection}
              className="flex items-center bg-[#F1BF0A] rounded-full p-1.5 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 after:transition-[width,left] after:duration-[2000ms] after:ease-[linear(0,0.014_0.4%,0.054_0.8%,0.228_1.7%,1.141_4.6%,1.402_5.6%,1.565_6.6%,1.599_7%,1.617_7.5%,1.611_7.9%,1.58_8.4%,1.47_9.3%,0.924_12.1%,0.747_13.2%,0.655_14.1%,0.633_14.5%,0.62_15%,0.622_15.4%,0.639_15.9%,0.705_16.8%,1.052_19.7%,1.159_20.8%,1.214_21.7%,1.235_22.6%,1.221_23.5%,1.18_24.4%,0.972_27.2%,0.905_28.3%,0.869_29.2%,0.855_30.1%,0.862_31%,0.887_31.9%,1.06_35.9%,1.081_36.8%,1.089_37.7%,1.084_38.6%,1.069_39.5%,0.964_43.4%,0.945_45.2%,0.954_46.8%,1.019_50.7%,1.034_52.7%,1.029_54.3%,0.989_58.2%,0.979_60.3%,1.013_67.8%,0.992_75.3%,1.005_82.7%,0.997_90.4%,1)] overflow-hidden hover:after:size-full hover:after:left-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="rounded-full p-1.5 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div {...mugProps} className="hidden md:block absolute -bottom-0 sm:-bottom-1 lg:-bottom-1 left-[51%] -translate-x-1/2 z-100">
        <Image
          src="https://i.postimg.cc/YqVLr48H/mug.png"
          alt=""
          role="presentation"
          width={780}
          height={780}
          priority
          className="object-contain h-[62vh] sm:h-[66vh] md:h-[70vh] lg:h-[71vh] max-h-[720px] lg:max-h-[780px] select-none pointer-events-none w-auto"
          draggable={false}
          style={{ filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))" }}
        />
      </motion.div>
    </header>
  );
}
