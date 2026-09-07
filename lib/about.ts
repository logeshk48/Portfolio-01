/**
 * The timeline. Four moments, in order, each one a fact rather than a
 * claim — a degree, a job, a venture. No adjectives.
 */

export interface Milestone {
  year: string;
  title: string;
  where: string;
  note: string;
}

export const TIMELINE: Milestone[] = [
  {
    year: "2020",
    title: "Started in electronics",
    where: "Nandha Engineering College",
    note: "B.E. Electronics & Communication. Circuits, signals, embedded systems.",
  },
  {
    year: "2022",
    title: "Software caught my attention",
    where: "Self-taught",
    note: "Started writing code that ran on screens instead of boards, and never went back.",
  },
  {
    year: "2024",
    title: "Graduated, then went to work",
    where: "Dataclap Digital Ventures",
    note: "B.E. finished at 8.1 CGPA. Joined Dataclap in June, working in data annotation.",
  },
  {
    year: "2026",
    title: "Started building for myself",
    where: "LetsCook",
    note: "A venture built with a small team alongside full-time work — web, AI agents, automation.",
  },
];

/** the closing lines, kept as data so the rhythm is visible */
export const CREED: string[] = [
  "Still learning.",
  "Still experimenting.",
  "Still shipping.",
];