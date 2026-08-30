/**
 * Six groups, laid out three across and two down.
 *
 * Icons are raw paths on a 24-grid sharing one stroke weight, built
 * from arcs and circles only — no rectangles anywhere.
 */

export interface StackGroup {
  label: string;
  note: string;
  icon: string;
  items: string[];
}

const ICON = {
  // a circle with a caret inside — code, not a browser chrome box
  frontend:
    "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z M10 9.5 7.5 12l2.5 2.5 M14 9.5 16.5 12 14 14.5",
  // two arcs chasing each other — request and response
  backend:
    "M4.8 10.2a7.4 7.4 0 0 1 12.6-3.1 M19.2 13.8a7.4 7.4 0 0 1-12.6 3.1 M17.8 3.4v3.9h-3.9 M6.2 20.6v-3.9h3.9 M12 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z",
  // a cylinder — round by nature
  database:
    "M12 3.4c4.4 0 8 1.2 8 2.7s-3.6 2.7-8 2.7-8-1.2-8-2.7 3.6-2.7 8-2.7Z M4 6.1v11.8c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7V6.1 M4 12c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7",
  // orbiting nodes around a core — the model
  ai: "M12 9.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z M12 2.6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z M12 17.4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z M4.9 6.6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z M19.1 13.4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z M12 6.6v2.8 M12 14.6v2.8 M6.7 9.6l3 1.7 M17.3 14.4l-3-1.7",
  // a gear — the work of building
  build:
    "M12 4.4a7.6 7.6 0 1 1 0 15.2 7.6 7.6 0 0 1 0-15.2Z M12 9.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z M12 1.9v2.5 M12 19.6v2.5 M22.1 12h-2.5 M4.4 12H1.9 M19.1 4.9l-1.8 1.8 M6.7 17.3l-1.8 1.8 M19.1 19.1l-1.8-1.8 M6.7 6.7 4.9 4.9",
  // three linked pods — the kit
  tools:
    "M7 5.6a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Z M17 5.6a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Z M12 14.4a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Z M10.1 8.7h3.8 M8.9 11.4l1.9 3 M15.1 11.4l-1.9 3",
} as const;

export const STACK: StackGroup[] = [
  {
    label: "Frontend",
    note: "Interfaces people actually use",
    icon: ICON.frontend,
    items: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    label: "Backend",
    note: "The part nobody sees working",
    icon: ICON.backend,
    items: ["Node.js", "Express.js", "Python", "REST APIs", "C"],
  },
  {
    label: "Database",
    note: "Where the state lives",
    icon: ICON.database,
    items: ["MongoDB", "SQL", "Firebase"],
  },
  {
    label: "AI / LLM",
    note: "Models doing real work",
    icon: ICON.ai,
    items: [
      "LLM Integration",
      "RAG",
      "Prompt Engineering",
      "AI Assistants",
      "AI Agents",
      "Natural-Language Parsing",
      "Voice Input",
    ],
  },
  {
    label: "Development",
    note: "Idea to shipped product",
    icon: ICON.build,
    items: [
      "Full-Stack Web",
      "MVP Development",
      "Authentication",
      "JWT",
      "CRUD Systems",
      "API Integration",
      "Validation",
      "Deployment",
    ],
  },
  {
    label: "Tools",
    note: "The daily bench",
    icon: ICON.tools,
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Render",
      "Netlify",
      "n8n",
      "Notion",
      "Claude",
    ],
  },
];

/** the moving rail — appetite, not credentials */
export const INTERESTS: string[] = [
  "AI Products",
  "AI Agents",
  "SaaS",
  "Developer Tools",
  "RAG Systems",
  "Automation",
  "Building MVPs",
  "Product Building",
  "Startups",
  "Turning Ideas Into Products",
];