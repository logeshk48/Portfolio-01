import { iconPath, type Project } from "@/lib/work";

/**
 * The frame.
 *
 * The app icon sits in the title area, so the panel reads as a window
 * belonging to a real product rather than an empty placeholder. When
 * a screenshot arrives it fills the body underneath and the icon stays
 * exactly where it is — the row never reflows.
 */
export default function Shot({ project }: { project: Project }) {
  const [base, accent] = project.tint;

  return (
    <div className="shot relative aspect-[16/10] overflow-hidden rounded-[18px] border border-line">
      {/* chrome bar — three dots, no fake URL */}
      <div className="absolute inset-x-0 top-0 z-3 flex h-9 items-center gap-[6px] border-b border-white/5 bg-black/30 px-4 backdrop-blur-sm">
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
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 30% 12%, ${accent}22, transparent 62%), linear-gradient(160deg, ${base}, #07060F)`,
          }}
        />
      )}

      {/* the mark, in the title area */}
      <div className="absolute left-5 top-14 z-2 flex items-center gap-4">
        <img
          src={iconPath(project.slug)}
          alt=""
          width={56}
          height={56}
          className="app-icon size-[56px] rounded-[14px]"
        />
        <div className="max-sm:hidden">
          <p className="font-display text-[15px] font-semibold uppercase tracking-[0.04em] text-text/90">
            {project.name}
          </p>
          <p className="label mt-1 opacity-60" style={{ color: accent }}>
            {project.status}
          </p>
        </div>
      </div>

      {/* a sheen that crosses when the row is hovered */}
      <span className="shot-sheen" aria-hidden />
    </div>
  );
}