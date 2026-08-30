"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { INTERESTS, STACK } from "@/lib/stack";

/**
 * Calm structure, careful execution.
 *
 * Everything here is a response rather than an ornament. The cursor
 * carries a soft light across the panel. Hovering a group lifts it,
 * blooms its mark, reveals its note, and steps the other five back —
 * attention is created by taking it away from everything else.
 *
 * The spotlight writes two custom properties on a ref, never through
 * state, so moving the mouse across this section never re-renders.
 */

const head = [
  "font-display text-[clamp(28px,3.6vw,48px)] font-semibold",
  "uppercase tracking-[-0.03em] leading-none",
].join(" ");

const col = [
  "col relative flex flex-col items-center px-8 pb-4 text-center",
  "max-md:px-0",
].join(" ");

const colTitle = [
  "mt-6 font-display text-[19px] font-semibold uppercase",
  "tracking-[0.03em] text-text",
].join(" ");

// skills sit in the display face at a readable size with open
// tracking — the old light sans read as fine print
const skill = [
  "tick block py-[7px] font-display text-[15.5px] font-medium",
  "tracking-[0.015em] text-muted hover:text-text",
].join(" ");

const wish = [
  "wish font-display text-[clamp(20px,2.4vw,34px)] font-semibold",
  "uppercase tracking-[-0.02em] text-muted/55",
].join(" ");

export default function Stack() {
  const spot = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  const move = (e: React.MouseEvent<HTMLElement>) => {
    const el = spot.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="stack" className="relative overflow-hidden py-32 lg:py-44">
      <div className="atmos" aria-hidden />
      <div ref={spot} className="spot" data-on={lit} aria-hidden />

      <div
        className="relative px-(--gut)"
        onMouseMove={move}
        onMouseEnter={() => setLit(true)}
        onMouseLeave={() => setLit(false)}
      >
        {/* ── centred head ─────────────────────────── */}
        <Reveal>
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-line-hi max-sm:w-8" />
            <h2 className={head}>
              <span className="mask-line">
                <span>
                  My <span className="ice">Stack</span>
                </span>
              </span>
            </h2>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-line-hi max-sm:w-8" />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="mx-auto mt-7 max-w-[46ch] text-center text-[15.5px] font-light leading-[1.8] text-muted">
            Six layers I work across, from the pixel to the prompt. Hover
            anything to see where it sits.
          </p>
        </Reveal>

        {/* ── six groups, three across ─────────────── */}
        <div className="cols mx-auto mt-24 grid max-w-[1180px] grid-cols-3 gap-y-20 max-lg:grid-cols-2 max-lg:gap-y-16 max-sm:grid-cols-1 max-sm:gap-y-14">
          {STACK.map((group, i) => (
            <Reveal key={group.label} delay={140 + i * 90} className={col}>
              {i % 3 !== 0 && (
                <span className="divider max-lg:hidden" aria-hidden />
              )}
              {i % 2 !== 0 && (
                <span
                  className="divider hidden max-lg:block max-sm:hidden"
                  aria-hidden
                />
              )}

              <span className="label mb-5 text-line-hi">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* orbit, halo and mark share one box so they cannot drift */}
              <div className="relative flex size-[86px] items-center justify-center">
                <span className="halo" aria-hidden />

                <svg
                  className="orbit absolute inset-0 text-line-hi"
                  viewBox="0 0 100 100"
                  aria-hidden
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    strokeLinecap="round"
                  />
                </svg>

                <svg
                  className="ink relative text-ice"
                  viewBox="0 0 24 24"
                  width="34"
                  height="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={group.icon} pathLength={1} />
                </svg>
              </div>

              <h3 className={colTitle}>{group.label}</h3>

              <p className="note label max-w-[24ch] normal-case tracking-[0.05em]">
                {group.note}
              </p>

              <span className="mt-5 block h-px w-7 bg-line-hi/60" aria-hidden />

              <div className="mt-3">
                {group.items.map((s, k) => (
                  <span
                    key={s}
                    className={skill}
                    style={{ "--i": k } as React.CSSProperties}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── what I want to build ─────────────────── */}
      <div className="mt-28 border-y border-line/70 py-7">
        <p className="label mb-6 px-(--gut) text-center">
          What I want to build
        </p>

        <div className="rail wish-rail">
          <div
            className="rail-track"
            style={{ "--dur": "52s" } as React.CSSProperties}
          >
            {[...INTERESTS, ...INTERESTS].map((x, k) => (
              <span key={`${x}-${k}`} className="flex items-center gap-10">
                <span className={wish}>{x}</span>
                <span className="text-line-hi" aria-hidden>
                  &#9679;
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}