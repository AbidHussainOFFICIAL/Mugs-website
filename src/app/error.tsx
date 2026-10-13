"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/ErrorScreen";
import { OutlineLink } from "@/components/OutlineButton";
import { PillButtonElement } from "@/components/PillButton";
import { RefreshIcon } from "@/components/icons";

// Shown when a page throws while rendering. `reset` re-renders the page that
// failed; "Back to home" is the way out if that keeps failing.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen code="500" title="SOMETHING WENT WRONG" text="That's on us, not you. Try again, or head back home.">
      <PillButtonElement onClick={reset} icon={<RefreshIcon className="size-6" />} layout="fluid" focusRing="light">
        Try again
      </PillButtonElement>
      <OutlineLink href="/" onDark>
        Back to home
      </OutlineLink>
    </ErrorScreen>
  );
}
