import * as si from "simple-icons";

/**
 * Ghost marks.
 *
 * Half the stack has no logo — RAG, Authentication, JWT, MVP work —
 * so logos can never be the layout. They are an atmospheric response
 * instead: hover something that has one and it fades in huge and
 * faint behind the list. Items without a mark simply do not trigger
 * it, and because nothing was reserved for them, nothing looks
 * missing.
 *
 * simple-icons ships raw path data, so we take the path and drop the
 * brand colour entirely — one fill, inherited, no palette pollution.
 */

type Icon = { path: string };

const ICONS: Record<string, Icon | undefined> = {
  React: si.siReact,
  JavaScript: si.siJavascript,
  "Tailwind CSS": si.siTailwindcss,
  HTML: si.siHtml5,
  CSS: si.siCss,
  "Node.js": si.siNodedotjs,
  "Express.js": si.siExpress,
  Python: si.siPython,
  MongoDB: si.siMongodb,
  SQL: si.siMysql,
  Firebase: si.siFirebase,
  Git: si.siGit,
  GitHub: si.siGithub,
  Postman: si.siPostman,
  Vercel: si.siVercel,
  Render: si.siRender,
  Netlify: si.siNetlify,
  Claude: si.siClaude,
  Notion: si.siNotion,
  C: si.siC,
};

/** the 24x24 path for a name, or null when there is no mark */
export function markPath(name: string): string | null {
  return ICONS[name]?.path ?? null;
}