import type { Metadata } from "next";
import ErrorScreen from "@/components/ErrorScreen";
import { OutlineLink } from "@/components/OutlineButton";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, SearchIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <ErrorScreen code="404" title="PAGE NOT FOUND" text="That page has moved or never existed. Let's get you back on the trail.">
      <PillLink href="/" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
        Back to home
      </PillLink>
      <OutlineLink href="/search" onDark>
        <SearchIcon className="size-4" />
        Search the shop
      </OutlineLink>
    </ErrorScreen>
  );
}
