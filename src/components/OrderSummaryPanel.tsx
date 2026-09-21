import Link from "next/link";
import TrustChip from "@/components/TrustChip";

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FLAT_RATE = 8;
const TAX_RATE = 0.07;

export default function OrderSummaryPanel({
  subtotal,
  discountPercent = 0,
}: {
  subtotal: number;
  discountPercent?: number;
}) {
  const discount = (subtotal * discountPercent) / 100;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + shipping + tax;

  return (
    <div className="bg-[#4565bc] rounded-4xl p-6 text-white flex flex-col gap-4">
      <h2 className="font-anton text-xl">ORDER SUMMARY</h2>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/80">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discountPercent > 0 && (
          <div className="flex items-center justify-between text-green-300">
            <span>Discount ({discountPercent}%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-white/80">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/80">Estimated tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-white/20 pt-3 flex items-center justify-between">
        <span className="font-anton text-lg">Total</span>
        <span className="font-anton text-xl text-[#F1BF0A]">${total.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="flex items-center justify-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </span>
        <span className="relative z-10 pl-8">Checkout</span>
      </Link>

      <div className="grid grid-cols-3 gap-2">
        <TrustChip
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h5.61c.484 0 .923.322 1.05.797l1.414 5.303a2.25 2.25 0 0 1-2.17 2.85H16.5m-4.5-8.25v8.25m0 0h-3v-8.25m3 0H9.75"
              />
            </svg>
          }
          label="Free shipping $100+"
        />
        <TrustChip
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          }
          label="Lifetime warranty"
        />
        <TrustChip
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          }
          label="30-day returns"
        />
      </div>
    </div>
  );
}