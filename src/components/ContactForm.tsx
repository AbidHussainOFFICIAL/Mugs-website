"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Chip, ChipRow } from "@/components/Chip";
import { TextAreaField, TextField } from "@/components/FormField";
import { OutlineButton } from "@/components/OutlineButton";
import { PillButtonElement, PillLink } from "@/components/PillButton";
import StatChip from "@/components/StatChip";
import { ArrowRightIcon, CheckIcon, SendIcon, SpinnerIcon } from "@/components/icons";
import {
  CONTACT_MESSAGE_MAX,
  CONTACT_MESSAGE_MIN,
  CONTACT_TOPICS,
  type ContactTopic,
} from "@/lib/contact";

// A demo form: there is no backend, so "sending" waits a moment and then
// shows the confirmation. Nothing leaves the browser, and the form says so.

type FieldName = "name" | "email" | "message";
type Status = "idle" | "submitting" | "sent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FAKE_SEND_DELAY_MS = 900;
const FIELD_IDS: Record<FieldName, string> = {
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
};

function validate(values: { name: string; email: string; message: string }): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < CONTACT_MESSAGE_MIN) {
    errors.message = `Please write a few words so we can help (at least ${CONTACT_MESSAGE_MIN} characters).`;
  }
  return errors;
}

export default function ContactForm({ initialTopic }: { initialTopic: ContactTopic }) {
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");

  const sentHeadingRef = useRef<HTMLHeadingElement>(null);
  const sendTimeoutRef = useRef<number | null>(null);

  const errors = validate({ name, email, message });
  const visibleError = (field: FieldName) => (touched[field] ? errors[field] : undefined);

  useEffect(() => {
    return () => {
      if (sendTimeoutRef.current !== null) window.clearTimeout(sendTimeoutRef.current);
    };
  }, []);

  // Move focus to the confirmation so keyboard and screen reader users land on it.
  useEffect(() => {
    if (status === "sent") sentHeadingRef.current?.focus();
  }, [status]);

  function markTouched(field: FieldName) {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const firstInvalid = (["name", "email", "message"] as const).find((field) => errors[field]);
    if (firstInvalid) {
      setTouched({ name: true, email: true, message: true });
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    setStatus("submitting");
    sendTimeoutRef.current = window.setTimeout(() => {
      setReference(`MUG-${Math.floor(10000 + Math.random() * 90000)}`);
      setStatus("sent");
    }, FAKE_SEND_DELAY_MS);
  }

  function handleSendAnother() {
    setName("");
    setEmail("");
    setOrderNumber("");
    setMessage("");
    setTouched({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="flex min-w-0 flex-col items-center rounded-4xl bg-[#e9ecf6] p-5 text-center sm:p-10">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">
          <CheckIcon className="size-8" />
        </span>
        <h2 ref={sentHeadingRef} tabIndex={-1} className="mt-5 font-anton text-3xl focus:outline-none sm:text-4xl">
          MESSAGE SENT
        </h2>
        <p className="mt-2 max-w-sm text-[#090909]/80">
          Thanks{name.trim() ? `, ${name.trim()}` : ""}. This is a demo form, so nothing was actually sent.
        </p>
        <StatChip value={reference} label="Reference number" className="mt-6 w-full max-w-xs" />
        <div className="mt-6 flex w-full flex-col items-stretch gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:items-center">
          <PillLink href="/shop" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="dark">
            Back to Shop
          </PillLink>
          <OutlineButton onClick={handleSendAnother} fluid>
            Send another
          </OutlineButton>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-5 rounded-4xl bg-[#e9ecf6] p-4 sm:p-8">
      <div>
        <p className="mb-1.5 ml-4 text-sm font-semibold">
          What&apos;s this about?
        </p>
        <ChipRow label="Topic">
          {CONTACT_TOPICS.map((option) => (
            <Chip key={option.value} selected={topic === option.value} onClick={() => setTopic(option.value)}>
              {option.label}
            </Chip>
          ))}
        </ChipRow>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          id={FIELD_IDS.name}
          label="Name"
          value={name}
          onChange={setName}
          onBlur={() => markTouched("name")}
          error={visibleError("name")}
          autoComplete="name"
          placeholder="Your name"
          disabled={submitting}
        />
        <TextField
          id={FIELD_IDS.email}
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          onBlur={() => markTouched("email")}
          error={visibleError("email")}
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          disabled={submitting}
        />
      </div>

      <TextField
        id="contact-order"
        label="Order number"
        optional
        value={orderNumber}
        onChange={setOrderNumber}
        maxLength={30}
        placeholder="From your confirmation email"
        helper="Helps us find your order faster."
        disabled={submitting}
      />

      <TextAreaField
        id={FIELD_IDS.message}
        label="Message"
        value={message}
        onChange={setMessage}
        onBlur={() => markTouched("message")}
        error={visibleError("message")}
        maxLength={CONTACT_MESSAGE_MAX}
        showCounter
        placeholder="How can we help?"
        disabled={submitting}
      />

      <div>
        <PillButtonElement
          type="submit"
          layout="full"
          focusRing="dark"
          disabled={submitting}
          icon={submitting ? <SpinnerIcon className="size-5" /> : <SendIcon className="size-5" />}
        >
          {submitting ? "Sending…" : "Send message"}
        </PillButtonElement>
        <p className="mt-3 text-center text-xs text-[#090909]/60">
          By sending this you agree to our{" "}
          <Link href="/privacy" className="text-[#183fad] underline underline-offset-2">
            Privacy Policy
          </Link>
          . Demo form — messages aren&apos;t actually sent.
        </p>
      </div>
    </form>
  );
}
