/**
 * Four projects. Every field here is drawn from what was actually
 * built — no metrics, no users, no results. Links are optional by
 * type, so a project without a repo simply renders no repo button
 * rather than a dead one.
 *
 * `tint` is each project's own accent, taken from its real design
 * system. It colours the frame behind the app icon, so the four rows
 * read as four different products rather than four empty boxes.
 */

export interface Project {
  slug: string;
  name: string;
  kind: string;
  year: string;
  status: "Shipped" | "Building";
  summary: string;
  problem: string;
  features: string[];
  stack: string[];
  hard: string;
  tint: [string, string];
  links?: { live?: string; repo?: string };
  shot?: string;
}

/** icons live at /img/work/<slug>.png — derived, never hand-wired */
export function iconPath(slug: string): string {
  return `/img/work/${slug}.png`;
}

export const WORK: Project[] = [
  {
    slug: "aegis",
    name: "Aegis",
    kind: "AI personal assistant",
    year: "2026",
    status: "Shipped",
    summary:
      "Tell it your day in plain English — typed or spoken — and it does the organising.",
    problem:
      "Most productivity apps fail because using them is itself a chore. Every task means tapping, typing, picking a date, choosing a category. Aegis inverts that: you talk, it structures.",
    features: [
      "Natural-language capture — one sentence becomes three dated tasks",
      "RAG question answering grounded in your own tasks, habits and diary",
      "Habit tracking with a seven-day grid and momentum status",
      "A 7 AM digest email built by a cron job with per-user error isolation",
    ],
    stack: [
      "React",
      "Vite",
      "Node",
      "Express",
      "MongoDB",
      "Groq",
      "JWT",
      "Web Speech API",
    ],
    hard: "Isolating the AI behind a service layer. When one provider's free tier turned out to have zero quota, swapping the whole thing out was a five-line change in a single file — and when a model was later retired, moving its name to an environment variable meant no redeploy at all.",
    tint: ["#2A1B33", "#C9A24B"],
    links: { live: "https://aegis-ivory.vercel.app/" },
  },
  {
    slug: "fitlog",
    name: "Fitlog",
    kind: "Fitness tracker with an AI coach",
    year: "2026",
    status: "Shipped",
    summary:
      "Workout logging, training plans and a coach that has actually read your history.",
    problem:
      "Generic fitness advice is useless because it knows nothing about you. Fitlog's coach is handed your real logged workouts, your goals and your level before it answers anything.",
    features: [
      "Interactive SVG muscle map with an exercise breakdown per group",
      "Workout flow — filter by muscle, log sets and reps, rest timer, save",
      "Seven-day plan builder with muscle coverage per day",
      "Achievements that unlock from real data, never from a counter",
    ],
    stack: [
      "React 18",
      "Vite",
      "Firebase Auth",
      "Firestore",
      "Framer Motion",
      "Gemini API",
    ],
    hard: "Shipping a single-page app on GitHub Pages, which serves static files and knows nothing about client routes. HashRouter and a custom base path were the price of free hosting.",
    tint: ["#1A1A24", "#FF6B6B"],
    links: { live: "https://logeshk48.github.io/fitlog/#/" },
  },
  {
    slug: "gcc",
    name: "GCC Finance",
    kind: "Freelance — cricket club",
    year: "2026",
    status: "Shipped",
    summary:
      "Replaced a club's spreadsheets and WhatsApp threads with one live ledger.",
    problem:
      "Golden Cricket Club tracked member payments, dues and expenses across spreadsheets, chat messages and cash notes. Nobody could answer what the club actually had. Now every member sees the same number from their phone.",
    features: [
      "Live balance, collection against expenses, monthly flow",
      "Squad view — payment status and history per member",
      "Category-wise expenses with month filters",
      "Admin panel for payments, rates, members and carry-over",
    ],
    stack: ["React 19", "Vite", "Firebase Firestore", "React Router", "Vercel"],
    hard: "The year rollover. On the first of January the app has to create next year's document, carry the closing balance forward and copy every member across — without anyone doing anything, and without touching the previous year's record.",
    tint: ["#05080A", "#22C55E"],
    links: {
      live: "https://gcc-app-ashy.vercel.app/#/",
      repo: "https://github.com/logeshk48/gcc-app",
    },
  },
  {
    slug: "corpus",
    name: "Corpus",
    kind: "Personal finance",
    year: "2026",
    status: "Building",
    summary:
      "Money has three motions. Most apps track two. Corpus tracks all of them.",
    problem:
      "Salaried, freelance and founder income behave nothing alike, and the same person is often all three. Corpus tracks what comes in, what goes out and what grows — and answers one honest question: what can I actually spend today.",
    features: [
      "Safe-to-Spend — one number, after bills, tax set-aside and savings",
      "Income streams modelled separately from expenses",
      "Investments tracked alongside, not in a different app",
      "One codebase running as Android, iOS and web",
    ],
    stack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Expo Router",
      "Firebase Auth",
      "Firestore",
    ],
    hard: "Choosing structure before features. Every component paired with its own styles file, one central design system, a strict screens and services split — done up front, on a project that is still being built.",
    tint: ["#14121C", "#D4AF6A"],
    links: { repo: "https://github.com/logeshk48/corpus" },
  },
];