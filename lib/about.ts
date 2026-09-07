/**
 * Four beats. The whole story, told once.
 *
 * The original brief said it in nine words — "I started with
 * electronics. Then software caught my attention. Then I started
 * building." Everything here is an expansion of that rhythm, not a
 * replacement for it.
 */

export interface Beat {
  year: string;
  kicker: string;
  title: string;
  body: string;
  where: string;
}

export const BEATS: Beat[] = [
  {
    year: "2020",
    kicker: "Where it started",
    title: "Electronics",
    body: "Four years of circuits, signals and embedded systems. I learned how things work at the level below the software.",
    where: "B.E. ECE · Nandha Engineering College",
  },
  {
    year: "2022",
    kicker: "The turn",
    title: "Software caught me",
    body: "Somewhere in the middle of the degree, code got more interesting than boards. Nothing about that has changed since.",
    where: "Self-taught",
  },
  {
    year: "2024",
    kicker: "Then work",
    title: "Dataclap",
    body: "Graduated at 8.1 CGPA and started in June, working in data annotation. The projects kept happening after hours.",
    where: "Dataclap Digital Ventures",
  },
  {
    year: "2026",
    kicker: "And now",
    title: "Let's Cook",
    body: "A technology company built with a team, alongside the day job. Websites, mobile apps and AI — for real clients.",
    where: "Let's Cook Technologies",
  },
];

/** the closing lines, kept as data so the rhythm stays visible */
export const CREED: string[] = [
  "Still learning.",
  "Still experimenting.",
  "Still shipping.",
];