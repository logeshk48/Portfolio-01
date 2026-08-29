/**
 * The stack, as a console rather than a list.
 *
 * No proficiency bars. Seven groups, selectable, and the whole right
 * column re-staggers on every switch — the transition is the design.
 */

export interface StackGroup {
  id: string;
  label: string;
  items: string[];
}

export const STACK: StackGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "REST APIs",
      "Backend Development",
    ],
  },
  {
    id: "database",
    label: "Database",
    items: ["MongoDB", "SQL", "Firebase"],
  },
  {
    id: "ai",
    label: "AI / LLM",
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
    id: "engineering",
    label: "Engineering",
    items: [
      "Full-Stack",
      "Authentication",
      "JWT",
      "CRUD Systems",
      "API Integration",
      "Validation",
      "Deployment",
      "MVP Development",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    items: ["JavaScript", "Python", "SQL", "C"],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Render",
      "Netlify",
      "n8n",
      "Claude",
      "Notion",
    ],
  },
];

/** the moving rail at the bottom — appetite, not credentials */
export const INTERESTS: string[] = [
  "AI Products",
  "AI Agents",
  "SaaS",
  "Developer Tools",
  "RAG Systems",
  "Automation",
  "Building MVPs",
  "Turning Ideas Into Products",
];

export const TOTAL = STACK.reduce((n, g) => n + g.items.length, 0);