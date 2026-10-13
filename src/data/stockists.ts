// Placeholder content for the Stores page: sample retail partners and
// pop-ups, shown so the page can be designed and tested. None of these shops,
// addresses or events are real, and the 555 numbers are reserved for fiction.
// Replace this file with real partners as they join.

export interface Stockist {
  name: string;
  city: string;
  addressLines: string[];
  hours: string;
  phone: string;
}

export interface StockistRegion {
  name: string;
  stockists: Stockist[];
}

export interface PopUp {
  /** ISO date, e.g. "2026-11-14". Shown as day + month in the card's date block. */
  date: string;
  title: string;
  venue: string;
}

export const STOCKIST_REGIONS: StockistRegion[] = [
  {
    name: "West Coast",
    stockists: [
      {
        name: "Trailhead Supply Co.",
        city: "Portland, OR",
        addressLines: ["412 Sample Street", "Portland, OR 97205"],
        hours: "Mon–Sat, 10am–6pm",
        phone: "(555) 010-0171",
      },
      {
        name: "Kettle & Compass",
        city: "San Diego, CA",
        addressLines: ["88 Example Avenue", "San Diego, CA 92101"],
        hours: "Daily, 9am–7pm",
        phone: "(555) 010-0172",
      },
    ],
  },
  {
    name: "Mountain",
    stockists: [
      {
        name: "Summit & Sons Outfitters",
        city: "Boulder, CO",
        addressLines: ["27 Placeholder Road", "Boulder, CO 80302"],
        hours: "Mon–Sun, 10am–6pm",
        phone: "(555) 010-0173",
      },
    ],
  },
  {
    name: "East Coast",
    stockists: [
      {
        name: "The Daily Brew Shop",
        city: "Brooklyn, NY",
        addressLines: ["305 Sample Lane", "Brooklyn, NY 11201"],
        hours: "Mon–Fri, 8am–6pm",
        phone: "(555) 010-0174",
      },
      {
        name: "Harbor Goods",
        city: "Portland, ME",
        addressLines: ["14 Example Wharf", "Portland, ME 04101"],
        hours: "Tue–Sun, 10am–5pm",
        phone: "(555) 010-0175",
      },
    ],
  },
];

export const POP_UPS: PopUp[] = [
  { date: "2026-11-14", title: "Limited edition pop-up", venue: "Trailhead Supply Co., Portland" },
  { date: "2026-12-05", title: "Holiday market stall", venue: "Harbor Goods, Portland, ME" },
  { date: "2027-01-23", title: "Winter gear weekend", venue: "Summit & Sons Outfitters, Boulder" },
];
