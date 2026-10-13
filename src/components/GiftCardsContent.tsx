"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Chip, ChipRow } from "@/components/Chip";
import DatePicker from "@/components/DatePicker";
import FeatureCard from "@/components/FeatureCard";
import { TextAreaField, TextField } from "@/components/FormField";
import GiftCardPreview from "@/components/GiftCardPreview";
import { OutlineButton } from "@/components/OutlineButton";
import { PillButtonElement, PillLink } from "@/components/PillButton";
import SegmentedTabs from "@/components/SegmentedTabs";
import StatChip from "@/components/StatChip";
import StatusChip from "@/components/StatusChip";
import TimePicker from "@/components/TimePicker";
import { ArrowRightIcon, CheckIcon, GiftIcon, SendIcon } from "@/components/icons";
import {
  DEMO_GIFT_CODE,
  formatGiftCode,
  getGiftCodeBalance,
  GIFT_AMOUNTS,
  GIFT_MAX_AMOUNT,
  GIFT_MESSAGE_MAX,
  GIFT_MIN_AMOUNT,
  isGiftAmountInRange,
  parseGiftAmount,
} from "@/lib/giftCards";
import { DEFAULT_SEND_TIME, formatDateLong, formatTime, timeToMinutes, toDateKey } from "@/lib/dates";

// A demo: nothing is charged, sent, added to the cart or redeemed. The page
// builds and validates a gift card, shows a confirmation, and says plainly
// that it was a demonstration.

type Tab = "buy" | "redeem";
type AmountChoice = number | "custom";
type Delivery = "now" | "schedule";
type BuyField = "amount" | "recipientName" | "recipientEmail" | "senderName" | "sendDate" | "sendTime";
type RedeemResult = { kind: "balance"; amount: number } | { kind: "invalid"; message: string } | null;

const TABS: { value: Tab; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "redeem", label: "Redeem" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TAB_PREFIX = "gift";

export default function GiftCardsContent() {
  const [tab, setTab] = useState<Tab>("buy");

  return (
    <div>
      <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} idPrefix={TAB_PREFIX} ariaLabel="Gift card options" />

      <div
        id={`${TAB_PREFIX}-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`${TAB_PREFIX}-tab-${tab}`}
        className="mt-6 sm:mt-8"
      >
        {tab === "buy" ? <BuyPanel /> : <RedeemPanel />}
      </div>
    </div>
  );
}

function BuyPanel() {
  const [amountChoice, setAmountChoice] = useState<AmountChoice>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("now");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState(DEFAULT_SEND_TIME);
  // The earliest day, and on that day the earliest time, a scheduled gift
  // card can go out. Set when the person picks "Schedule" (an event), not
  // while rendering, so the render stays pure.
  const [minDate, setMinDate] = useState("");
  const [minTodayMinutes, setMinTodayMinutes] = useState(0);
  const [touched, setTouched] = useState<Partial<Record<BuyField, boolean>>>({});
  const [done, setDone] = useState(false);

  const doneHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (done) doneHeadingRef.current?.focus();
  }, [done]);

  const customParsed = parseGiftAmount(customAmount);
  const amount = amountChoice === "custom" ? customParsed : amountChoice;
  const amountValid = amount !== null && isGiftAmountInRange(amount);

  const errors: Partial<Record<BuyField, string>> = {};
  if (!amountValid) {
    errors.amount =
      amountChoice === "custom" && customAmount.trim() === ""
        ? "Enter an amount."
        : `Enter a whole-dollar amount from $${GIFT_MIN_AMOUNT} to $${GIFT_MAX_AMOUNT}.`;
  }
  if (!recipientName.trim()) errors.recipientName = "Please enter the recipient's name.";
  if (!EMAIL_PATTERN.test(recipientEmail.trim())) errors.recipientEmail = "Please enter a valid email address.";
  if (!senderName.trim()) errors.senderName = "Please enter your name.";
  if (delivery === "schedule") {
    if (!sendDate || sendDate < minDate) errors.sendDate = "Choose a date from today onward.";
    else if (sendDate === minDate && timeToMinutes(sendTime) < minTodayMinutes) errors.sendTime = "Choose a time that hasn't passed yet.";
  }
  // Past times are disabled for today, so only today needs a floor.
  const timeFloor = sendDate && sendDate === minDate ? minTodayMinutes : 0;

  const visibleError = (field: BuyField) => (touched[field] ? errors[field] : undefined);
  const markTouched = (field: BuyField) => setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));

  const FIELD_ORDER: { field: BuyField; elementId: string }[] = [
    { field: "amount", elementId: amountChoice === "custom" ? "gift-custom-amount" : "gift-amounts" },
    { field: "recipientName", elementId: "gift-recipient-name" },
    { field: "recipientEmail", elementId: "gift-recipient-email" },
    { field: "senderName", elementId: "gift-sender-name" },
    { field: "sendDate", elementId: "gift-send-date" },
    { field: "sendTime", elementId: "gift-send-time" },
  ];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const firstInvalid = FIELD_ORDER.find(({ field }) => errors[field]);
    if (firstInvalid) {
      setTouched({ amount: true, recipientName: true, recipientEmail: true, senderName: true, sendDate: true, sendTime: true });
      document.getElementById(firstInvalid.elementId)?.focus();
      return;
    }
    setDone(true);
  }

  function handleStartOver() {
    setAmountChoice(50);
    setCustomAmount("");
    setRecipientName("");
    setRecipientEmail("");
    setSenderName("");
    setMessage("");
    setDelivery("now");
    setSendDate("");
    setSendTime(DEFAULT_SEND_TIME);
    setTouched({});
    setDone(false);
  }

  function handleDeliveryChange(next: Delivery) {
    setDelivery(next);
    if (next === "schedule") {
      const now = new Date();
      setMinDate(toDateKey(now));
      // The next half hour: a time that has already started has passed.
      setMinTodayMinutes(Math.min(Math.ceil((now.getHours() * 60 + now.getMinutes() + 1) / 30) * 30, 23 * 60 + 30));
    }
  }

  return (
    <div>
      {/* HOW IT WORKS is outside this grid on purpose: the preview is sticky,
          and in a shared grid it could ride down over the section below. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="min-w-0 lg:sticky lg:top-6">
          <GiftCardPreview amount={amountValid ? amount : null} recipientName={recipientName} />
        </div>

        {done ? (
          <div className="flex min-w-0 flex-col items-center rounded-4xl bg-[#e9ecf6] p-5 text-center sm:p-10">
            <span className="flex size-16 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">
              <CheckIcon className="size-8" />
            </span>
            <h2 ref={doneHeadingRef} tabIndex={-1} className="mt-5 font-anton text-3xl focus:outline-none sm:text-4xl">
              GIFT CARD READY
            </h2>
            <p className="mt-2 max-w-sm text-[#090909]/80">
              This is a demo, so nothing was charged, sent or added to your cart. Here&apos;s what it would have been:
            </p>
            <StatChip
              value={`$${amount}`}
              label={`For ${recipientName.trim()}${delivery === "schedule" ? `, scheduled for ${formatDateLong(sendDate)} at ${formatTime(sendTime)}` : ", sent right away"}`}
              className="mt-6 w-full max-w-xs"
            />
            <div className="mt-6 flex w-full flex-col items-stretch gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:items-center">
              <PillLink href="/shop" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="dark">
                Shop mugs
              </PillLink>
              <OutlineButton onClick={handleStartOver} fluid>
                Make another
              </OutlineButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-5 rounded-4xl bg-[#e9ecf6] p-4 sm:p-8">
            <div>
              <p className="mb-1.5 ml-4 text-sm font-semibold">Amount</p>
              <div id="gift-amounts" tabIndex={-1} className="focus:outline-none">
                <ChipRow label="Gift card amount">
                  {GIFT_AMOUNTS.map((value) => (
                    <Chip key={value} selected={amountChoice === value} onClick={() => setAmountChoice(value)}>
                      ${value}
                    </Chip>
                  ))}
                  <Chip selected={amountChoice === "custom"} onClick={() => setAmountChoice("custom")}>
                    Custom
                  </Chip>
                </ChipRow>
              </div>
              {amountChoice === "custom" && (
                <TextField
                  id="gift-custom-amount"
                  label="Custom amount"
                  value={customAmount}
                  onChange={setCustomAmount}
                  onBlur={() => markTouched("amount")}
                  error={visibleError("amount")}
                  helper={`$${GIFT_MIN_AMOUNT}–$${GIFT_MAX_AMOUNT}`}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="50"
                  className="mt-4"
                  leading={
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] text-sm font-semibold">$</span>
                  }
                />
              )}
              {amountChoice !== "custom" && visibleError("amount") && (
                <StatusChip variant="error" className="mt-1.5 ml-4">
                  {visibleError("amount")}
                </StatusChip>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <TextField
                id="gift-recipient-name"
                label="Recipient name"
                value={recipientName}
                onChange={setRecipientName}
                onBlur={() => markTouched("recipientName")}
                error={visibleError("recipientName")}
                autoComplete="off"
                placeholder="Who is it for?"
              />
              <TextField
                id="gift-recipient-email"
                label="Recipient email"
                type="email"
                value={recipientEmail}
                onChange={setRecipientEmail}
                onBlur={() => markTouched("recipientEmail")}
                error={visibleError("recipientEmail")}
                autoComplete="off"
                inputMode="email"
                placeholder="them@example.com"
              />
            </div>

            <TextField
              id="gift-sender-name"
              label="Your name"
              value={senderName}
              onChange={setSenderName}
              onBlur={() => markTouched("senderName")}
              error={visibleError("senderName")}
              autoComplete="name"
              placeholder="So they know who it's from"
            />

            <TextAreaField
              id="gift-message"
              label="Message"
              optional
              value={message}
              onChange={setMessage}
              maxLength={GIFT_MESSAGE_MAX}
              showCounter
              rows={4}
              placeholder="Add a few words (optional)"
            />

            <div>
              <p className="mb-1.5 ml-4 text-sm font-semibold">Delivery</p>
              <ChipRow label="Delivery">
                <Chip selected={delivery === "now"} onClick={() => handleDeliveryChange("now")}>
                  Send now
                </Chip>
                <Chip selected={delivery === "schedule"} onClick={() => handleDeliveryChange("schedule")}>
                  Schedule
                </Chip>
              </ChipRow>
              {delivery === "schedule" && (
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DatePicker
                    id="gift-send-date"
                    label="Send on"
                    value={sendDate}
                    onChange={setSendDate}
                    onClose={() => markTouched("sendDate")}
                    min={minDate}
                    error={visibleError("sendDate")}
                  />
                  <TimePicker
                    id="gift-send-time"
                    label="At"
                    value={sendTime}
                    onChange={setSendTime}
                    onClose={() => markTouched("sendTime")}
                    minMinutes={timeFloor}
                    error={visibleError("sendTime")}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-anton text-4xl">{amountValid ? `$${amount}` : "$—"}</p>
              <div className="w-full sm:w-64">
                <PillButtonElement type="submit" layout="full" focusRing="dark" icon={<SendIcon className="size-5" />}>
                  Send gift card
                </PillButtonElement>
              </div>
            </div>
            <p className="-mt-2 text-center text-xs text-[#090909]/60 sm:text-left">Demo only — nothing is charged or sent.</p>
          </form>
        )}

      </div>

      <div className="mt-10 sm:mt-12">
        <h2 className="font-anton text-2xl sm:text-3xl mb-6">HOW IT WORKS</h2>
        <HowItWorks />
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: "1", title: "CHOOSE", text: "Pick an amount and tell us who it's for." },
    { n: "2", title: "SEND", text: "We email the gift card right away, or on the day you choose." },
    { n: "3", title: "REDEEM", text: "They enter the code to see their balance." },
  ];
  return (
    <ol className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-3">
      {steps.map((step) => (
        <li key={step.n}>
          <FeatureCard icon={<span className="font-anton text-xl">{step.n}</span>} title={step.title}>
            {step.text}
          </FeatureCard>
        </li>
      ))}
    </ol>
  );
}

function RedeemPanel() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<RedeemResult>(null);

  function handleChange(value: string) {
    setCode(formatGiftCode(value));
    if (result) setResult(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code) {
      setResult({ kind: "invalid", message: "Enter your gift card code." });
      return;
    }
    const balance = getGiftCodeBalance(code);
    setResult(
      balance === null
        ? { kind: "invalid", message: "We couldn't find that code. Check it and try again." }
        : { kind: "balance", amount: balance }
    );
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit} noValidate className="rounded-4xl bg-[#e9ecf6] p-5 sm:p-8">
        <TextField
          id="gift-code"
          label="Gift card code"
          value={code}
          onChange={handleChange}
          placeholder="XXXX-XXXX-XXXX"
          helper={`Demo code: ${DEMO_GIFT_CODE}`}
          autoComplete="off"
          inputClassName="font-semibold tracking-wider"
          leading={
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">
              <GiftIcon className="size-4" />
            </span>
          }
          trailing={
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#F1BF0A] px-4 py-2 text-sm font-semibold text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
            >
              Check balance
            </button>
          }
        />
        {result?.kind === "invalid" && (
          <StatusChip variant="error" className="mt-3 ml-4">
            {result.message}
          </StatusChip>
        )}
      </form>

      {result?.kind === "balance" && (
        <div className="mt-4 rounded-3xl bg-[#183fad] p-5 text-white" role="status">
          <p className="text-sm text-white/70">Balance</p>
          <p className="font-anton text-4xl text-[#F1BF0A]">${result.amount.toFixed(2)}</p>
          <p className="mt-2 text-xs text-white/70">Balance check only — redeeming a gift card at checkout isn&apos;t available yet.</p>
          <PillLink href="/shop" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light" className="mt-4">
            Shop mugs
          </PillLink>
        </div>
      )}
    </div>
  );
}
