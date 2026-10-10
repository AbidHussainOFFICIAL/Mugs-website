"use client";

import { useCart } from "@/context/CartContext";

// Visually hidden, mounted once at the root — announces cart additions and
// quantity changes to screen readers. Removal is deliberately not handled
// here: UndoToast already carries `role="status" aria-live="polite"` with
// its own "{name} removed" message, so a removal is already announced;
// adding a second announcement for the same event here would just double it.
export default function CartAnnouncer() {
  const { announcement } = useCart();

  return (
    <div aria-live="polite" role="status" className="sr-only">
      {/* Keyed on the announcement's id, not just its text: this forces a
          fresh text node on every announcement, including two identical
          messages in a row (e.g. adding the same product twice), rather
          than relying on every screen reader to notice unchanged live-
          region text needs re-reading. */}
      {announcement && <span key={announcement.id}>{announcement.message}</span>}
    </div>
  );
}
