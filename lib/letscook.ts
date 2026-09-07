/**
 * Let's Cook Technologies. A company, built with a team — not a solo
 * side project. Capabilities are taken from what the site actually
 * offers plus what the team actually builds. No client names, no
 * numbers: none are published, and inventing them is how a portfolio
 * starts lying.
 */

export const LETSCOOK = {
  name: "Let's Cook Technologies",
  tagline: "Build Beyond Ideas",
  url: "https://letscooktech.com/",
  since: "2026",
  audience: "Businesses, startups and students",
} as const;

export interface Capability {
  n: string;
  title: string;
  blurb: string;
  detail: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    n: "01",
    title: "Websites",
    blurb: "Modern sites built to be used, not just launched.",
    detail: [
      "React and Next.js front ends",
      "Node and Express APIs behind them",
      "Deployed, monitored, iterated",
    ],
  },
  {
    n: "02",
    title: "Mobile Apps",
    blurb: "Android and iOS, from one codebase where it makes sense.",
    detail: [
      "React Native and Expo",
      "Native APIs when the platform demands it",
      "Shipped to real devices, not simulators",
    ],
  },
  {
    n: "03",
    title: "AI Agents",
    blurb: "Systems that take an instruction and carry it through.",
    detail: [
      "LLM integration against real data",
      "Retrieval so answers stay grounded",
      "Multi-step tool use, not single prompts",
    ],
  },
  {
    n: "04",
    title: "Automation",
    blurb: "The work nobody should be doing by hand any more.",
    detail: [
      "Workflow pipelines in n8n",
      "Scheduled jobs and digests",
      "Systems that talk to each other",
    ],
  },
  {
    n: "05",
    title: "SEO",
    blurb: "Being findable, from the markup upward.",
    detail: [
      "Semantic structure and metadata",
      "Performance as a ranking input",
      "Content that answers real queries",
    ],
  },
];