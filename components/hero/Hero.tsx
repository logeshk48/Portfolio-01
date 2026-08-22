import BoardCanvas from "@/components/three/BoardCanvas";

const scrim =
  "radial-gradient(120% 90% at 18% 50%," +
  " rgba(8,9,11,0.94) 0%," +
  " rgba(8,9,11,0.86) 32%," +
  " rgba(8,9,11,0.35) 62%," +
  " transparent 82%)";

const btn = [
  "px-5 py-3",
  "font-mono",
  "text-[11px] uppercase tracking-[0.14em]",
].join(" ");

const btnPrimary = `${btn} border border-silk bg-silk text-void`;
const btnGhost = `${btn} border border-trace transition-colors hover:border-copper hover:text-copper`;

const headline = [
  "max-w-[15ch]",
  "font-display",
  "text-[clamp(38px,7.2vw,92px)]",
  "font-semibold leading-[0.96] tracking-[-0.035em]",
].join(" ");

const lede = [
  "mt-7 max-w-[46ch]",
  "text-[clamp(14.5px,1.35vw,17px)]",
  "font-light leading-relaxed text-legend",
].join(" ");

const railRow = [
  "flex justify-between gap-6",
  "border-b border-dashed border-trace",
  "py-[7px] last:border-b-0",
].join(" ");

const STATUS: [string, string][] = [
  ["Role", "Software Dev"],
  ["Org", "Dataclap"],
  ["Since", "Jun 2024"],
  ["Building", "LetsCook"],
  ["Origin", "B.E. ECE"],
];

export default function Hero() {
  return (
    <header className="relative grid min-h-svh content-center overflow-hidden px-(--gut) pb-20 pt-32">
      <BoardCanvas />

      {/* text scrim — copper never competes with the headline */}
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{ background: scrim }}
      />

      {/* silkscreen stays in the DOM — crisp text, no font loading in WebGL */}
      <div className="pointer-events-none absolute inset-0 z-2">
        <span className="legend absolute bottom-10 left-(--gut) opacity-40">
          U1 · LGK//2026
        </span>
        <span className="legend absolute bottom-10 right-(--gut) opacity-40">
          REV 0.2 · TN, IN
        </span>
      </div>

      <div className="relative z-3 grid w-full max-w-[1440px] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <div className="legend mb-7 flex items-center gap-3">
            <span className="size-[5px] rounded-full bg-(--accent)" />
            <span>Software Developer · AI Builder</span>
          </div>

          <h1 className={headline}>
            I build software that turns ideas into something real.
          </h1>

          <p className={lede}>
            {"I'm "}
            <strong className="font-medium text-silk">Logesh</strong>
            {", a software developer and builder focused on web applications,"}
            {" AI-powered products and practical automation. Currently working at "}
            <strong className="font-medium text-silk">Dataclap</strong>
            {" while building "}
            <strong className="font-medium text-silk">LetsCook</strong>
            {" alongside my work."}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className={btnPrimary}>
              Explore my work
            </a>
            <a href="#contact" className={btnGhost}>
              {"Let's connect"}
            </a>
          </div>
        </div>

        <aside className="min-w-[236px] border border-trace bg-board/70 px-5 py-4 backdrop-blur-[2px]">
          {STATUS.map(([k, v]) => (
            <div key={k} className={railRow}>
              <span className="legend">{k}</span>
              <span className="font-mono text-[10.5px] text-silk">{v}</span>
            </div>
          ))}
        </aside>
      </div>
    </header>
  );
}