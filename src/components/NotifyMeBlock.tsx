"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { TextField } from "@/components/FormField";
import StatusChip from "@/components/StatusChip";
import { CheckIcon } from "@/components/icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shown on a sold-out product page under the disabled button. A demo: there
// is no back end, so the confirmation says plainly that nothing was saved.
export default function NotifyMeBlock({ productName }: { productName: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-[#e9ecf6] p-4">
        <StatusChip variant="success">
          <CheckIcon className="size-3.5" />
          You&apos;re on the list for {productName}
        </StatusChip>
        <p className="mt-2 text-xs text-[#090909]/60">This is a demo store, so nothing was saved or sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-[#e9ecf6] p-4">
      <p className="font-anton text-xl">SOLD OUT</p>
      <p className="mb-3 text-sm text-[#090909]/70">Leave your email and we&apos;ll tell you if it comes back.</p>
      <TextField
        id={`${id}-notify`}
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(value) => {
          setEmail(value);
          if (error) setError("");
        }}
        error={error}
        placeholder="you@example.com"
        trailing={
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#F1BF0A] px-4 py-2 text-sm font-semibold text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            Notify me
          </button>
        }
      />
    </form>
  );
}
