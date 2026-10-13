// Gift card rules for the demo Gift cards page. There is no backend: nothing
// here is sold, sent or redeemed. The one demo code below returns a fixed
// balance — the same approach the cart takes with its single demo promo code.

export const GIFT_AMOUNTS = [25, 50, 100, 200] as const;
export const GIFT_MIN_AMOUNT = 10;
export const GIFT_MAX_AMOUNT = 500;
export const GIFT_MESSAGE_MAX = 200;

const GIFT_CODE_LENGTH = 12;
const GIFT_CODE_GROUP = 4;

/** The one code that "has a balance". Shown as a hint on the page. */
export const DEMO_GIFT_CODE = "MUGS-GIFT-2500";
const DEMO_GIFT_BALANCE = 25;

/** Uppercases, drops anything that isn't a letter or digit, and groups the rest in fours: "mugsgift2500" → "MUGS-GIFT-2500". */
export function formatGiftCode(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, GIFT_CODE_LENGTH);
  const groups: string[] = [];
  for (let i = 0; i < cleaned.length; i += GIFT_CODE_GROUP) {
    groups.push(cleaned.slice(i, i + GIFT_CODE_GROUP));
  }
  return groups.join("-");
}

/** The balance for a code, or null when the code isn't recognised. */
export function getGiftCodeBalance(code: string): number | null {
  return formatGiftCode(code) === DEMO_GIFT_CODE ? DEMO_GIFT_BALANCE : null;
}

/** Parses the custom-amount field. Returns null for anything that isn't a whole dollar amount. */
export function parseGiftAmount(raw: string): number | null {
  if (!/^\d{1,4}$/.test(raw.trim())) return null;
  return Number(raw.trim());
}

export function isGiftAmountInRange(amount: number): boolean {
  return amount >= GIFT_MIN_AMOUNT && amount <= GIFT_MAX_AMOUNT;
}
