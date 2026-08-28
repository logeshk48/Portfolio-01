/**
 * The stack, grouped by what it does rather than by hype.
 *
 * No proficiency percentages. Nobody believes "React 85%" and it
 * invites a question you cannot answer honestly. Each tool carries a
 * short note on its role instead — a reader learns more from "what is
 * this for" than from a bar chart.
 */

export interface Tool {
  name: string;
  note: string;
}

export interface StackGroup {
  label: string;
  items: Tool[];
}

export const STACK: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", note: "Component UI" },
      { name: "Next.js", note: "App Router, SSR" },
      { name: "TypeScript", note: "Types end to end" },
      { name: "Tailwind", note: "Design tokens" },
      { name: "HTML", note: "Semantic markup" },
      { name: "CSS", note: "Layout, motion" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", note: "Runtime" },
      { name: "Express", note: "Routing, middleware" },
      { name: "Python", note: "Scripts, data work" },
      { name: "REST APIs", note: "Contracts between services" },
      { name: "JWT", note: "Access and refresh tokens" },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "MongoDB", note: "Documents, aggregation" },
      { name: "Firebase", note: "Auth, realtime" },
      { name: "SQL", note: "Relational queries" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "LLM APIs", note: "Model calls in production" },
      { name: "RAG", note: "Retrieval over own data" },
      { name: "Prompt Engineering", note: "Getting reliable output" },
      { name: "AI Agents", note: "Multi-step tool use" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", note: "Version control" },
      { name: "GitHub", note: "Repos, actions" },
      { name: "Vercel", note: "Deploys, previews" },
      { name: "Render", note: "Server hosting" },
      { name: "n8n", note: "Workflow automation" },
      { name: "Claude", note: "Pair programming" },
    ],
  },
];

export const EXPLORING: string[] = [
  "Backend Architecture",
  "AI Agents",
  "Automation",
  "API Design",
  "Product Engineering",
];

export const TOOL_COUNT = STACK.reduce((n, g) => n + g.items.length, 0);