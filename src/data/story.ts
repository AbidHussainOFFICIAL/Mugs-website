// Placeholder content for the About and Company pages: the milestones, the
// team and the values. The people are invented and have no photos — each card
// shows initials instead of a picture, so nothing here pretends to be a real
// portrait. Replace with the real story and team.

import { EDITION_SIZE_LABEL } from "@/lib/policies";

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "A sketch and a commute",
    text: "The first drawing of a mug that could survive a daily commute and a weekend at the campsite.",
  },
  {
    year: "2025",
    title: "Prototype runs",
    text: "Small test batches, a lot of drop tests, and a finish that finally stopped chipping.",
  },
  {
    year: "2026",
    title: "The limited edition launches",
    text: `Every design made in a run that never goes past ${EDITION_SIZE_LABEL} units.`,
  },
];

export const TEAM: TeamMember[] = [
  { name: "Mugsy Alvarez", role: "Founder" },
  { name: "Priya Raman", role: "Head of Design" },
  { name: "Tomás Okafor", role: "Operations" },
  { name: "Hana Lindqvist", role: "Customer Care" },
];

export const MISSION = "Build mugs that last long enough to become part of the journey.";
export const MISSION_TEXT =
  "We make fewer things, and we make them better — so every mug earns its place in your bag, on your desk and around your campfire.";
export const VISION_TEXT = "A world where the mug you carry every day is the last one you need to buy.";
