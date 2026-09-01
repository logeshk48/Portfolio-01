import type { Project } from "@/lib/work";

/**
 * The frame.
 *
 * Until a screenshot exists, this draws a lit panel in the project's
 * own accent colour with its initial set large behind glass. Four
 * different products read as four different things rather than four
 * empty grey boxes — and the day a real image arrives it drops into
 * exactly the same frame, so the row never reflows.
 */
export default function Shot({ project }: { project: Project }) {
  const [base, accent] = project.tint;

  return (
    <div className="shot group relative aspect-[16/10] overflow-hidden rounded-[18px] border border-line">
      {/* the chrome bar — three dots, no fake URL */}
      <div className="absolute inset-x-0 top-0 z-2 flex h-9 items-center gap-[6px] border-b border-white/5 bg-black/30 px-4 backdrop-blur-sm">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            className="size-[8px] rounded-full opacity-45"
            style={{ background: c }}
          />
        ))}
        <span className="label ml-3 opacity-50">{project.slug}</span>
      </div>

      {project.shot ? (
        <img
          src={project.shot}
          alt={`${project.name} interface`}
          className="absolute inset-0 size-full object-cover object-top pt-9"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 30% 12%, ${accent}22, transparent 62%), linear-gradient(160deg, ${base}, #07060F)`,
            }}
          />

          {/* the initial, huge and mostly hidden */}
          <span
            className="absolute -bottom-[18%] right-[-4%] select-none font-display text-[34vmin] font-bold leading-none opacity-[0.07]"
            style={{ color: accent }}
            aria-hidden
          >
            {project.name.charAt(0)}
          </span>

          <span
            className="label absolute bottom-5 left-5 opacity-60"
            style={{ color: accent }}
          >
            Screenshot pending
          </span>
        </>
      )}

      {/* a sheen that crosses when the row is hovered */}
      <span className="shot-sheen" aria-hidden />
    </div>
  );
}