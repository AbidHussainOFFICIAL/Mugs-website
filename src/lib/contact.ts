// What the Contact form can be about. The Stores page links to
// /contact?topic=wholesale, so the page checks the incoming value against
// this list before using it.

export const CONTACT_TOPICS = [
  { value: "order", label: "Order" },
  { value: "product", label: "Product" },
  { value: "wholesale", label: "Wholesale" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const DEFAULT_CONTACT_TOPIC: ContactTopic = "order";

/** Returns the topic if `raw` is one of the known values, otherwise the default. */
export function parseContactTopic(raw: string | string[] | undefined): ContactTopic {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const match = CONTACT_TOPICS.find((topic) => topic.value === value);
  return match ? match.value : DEFAULT_CONTACT_TOPIC;
}

export const CONTACT_MESSAGE_MIN = 10;
export const CONTACT_MESSAGE_MAX = 1000;
