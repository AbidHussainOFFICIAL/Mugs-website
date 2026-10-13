// Everything shown on /developer and in its structured data, in one place so
// the page, the search-engine markup and the footer credit can never disagree.

export const DEVELOPER = {
  name: "Abid Hussain",
  handle: "AbidHussainOFFICIAL",
  role: "Full-Stack Website Developer",
  location: { city: "Karachi", country: "Pakistan", countryCode: "PK" },
  email: "010abidhussain@gmail.com",
  github: "https://github.com/AbidHussainOFFICIAL",
  linkedin: "https://www.linkedin.com/in/abidhussainsoftware",
  summary:
    "Full-stack web developer in Karachi, Pakistan, building fast, responsive web apps with Next.js, React, TypeScript, Node.js and MongoDB.",
  bio: [
    "I'm a full-stack developer working across the MERN stack and TypeScript. I've shipped an e-commerce app and a legal case-management platform to production, and I'm comfortable owning a feature from end to end: the data model, the REST API and the responsive UI.",
    "I trained for 15 months in the Saylani Mass IT Training Program, completed a full-stack internship at Teyzix Core in 2026, and I'm now building towards AI tooling and product design alongside core web development.",
  ],
} as const;

export const DEVELOPER_SKILLS = [
  { group: "Frontend", items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST API design"] },
  { group: "Databases", items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"] },
  { group: "Tools", items: ["Git & GitHub", "Vercel", "Qdrant", "Cloudinary"] },
] as const;

export const DEVELOPER_PROJECTS = [
  {
    name: "Zivora",
    kind: "Abaya e-commerce platform",
    text: "A full e-commerce PWA for a Pakistani modest-fashion brand: product catalogue, cart and checkout, with mobile-first layouts for the shoppers who use it most.",
    href: "https://zivora-abaya.vercel.app/",
    tags: ["E-commerce", "PWA", "Mobile-first"],
  },
  {
    name: "Legal Case Management System",
    kind: "Case tracking for legal practices",
    text: "A platform with modules for client records, document storage and case-status workflows, built on a structured data model and a REST API for secure access to case information.",
    href: "https://attorney-platform.vercel.app/",
    tags: ["Node.js", "REST API", "Data modelling"],
  },
  {
    name: "Mugsy's Mugs",
    kind: "Limited-edition mug storefront (this site)",
    text: "The store you're on: Next.js, React, TypeScript, Tailwind CSS and Framer Motion, with a cart, wishlist, gift cards, a mobile tab bar and accessible, responsive pages throughout.",
    href: "/",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
  },
] as const;

export const DEVELOPER_EXPERIENCE = [
  {
    title: "Full-Stack Web Development Intern",
    place: "Teyzix Core Pvt. Ltd.",
    period: "2026",
    text: "Contributed to real-world team projects, applying React.js, Node.js/Express.js and REST API development in a live development environment.",
    credential: "Internship certificate TC-INT-20260601-222",
  },
] as const;

export const DEVELOPER_EDUCATION = [
  {
    title: "Modern Web Application Development (Batch 16)",
    place: "Saylani Mass IT Training Program (SMIT)",
    period: "Feb 2025 – May 2026",
    text: "A 15-month full-stack program: React.js and Next.js for the front end; Node.js, Express.js and RESTful APIs on the server.",
    credential: "Certificate SMIT/2025/WMA/B16/400485",
  },
  {
    title: "Diploma in Information Technology",
    place: "Memon Industrial & Technical Institute (MITI)",
    period: "2023 – 2026",
    text: "Software programming, relational database design and modern web development architecture.",
    credential: "",
  },
] as const;
