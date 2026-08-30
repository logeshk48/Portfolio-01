"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { INTERESTS, STACK } from "@/lib/stack";

/**
 * Six cards. Hovering one lifts it toward the reader on a real
 * perspective — translateZ, not a scale — while the other five step
 * back to 40%. Attention is created by taking it away from
 * everything else.
 *
 * The surface, border and shadow all live on a pseudo-element, so a
 * card gains a background without its content ever inheriting one,
 * and the whole box composites as a single layer.
 *
 * The spotlight writes two custom properties on a ref, never through
 * state, so moving the mouse across this section never re-renders.
 */

const head = [
  "font-display text-[clamp(28px,3.6vw,48px)] font-semibold",
  "uppercase tracking-[-0.03em] leading-none",
].join(" ");

const card = [
  "card col flex flex-col items-center",
  "px-7 pb-9 pt-8 text-center",
].join(" ");

const cardTitle = [
  "mt-6 font-display text-[19px] font-semibold uppercase",
  "tracking-[0.03em] text-text",
].join(" ");

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

        {/* ── six cards, three across ──────────────── */}
        <div className="cols mx-auto mt-24 grid max-w-[1180px] grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {STACK.map((group, i) => (
            <Reveal key={group.label} delay={140 + i * 90} className={card}>
              <span className="label text-line-hi">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* orbit, halo and mark share one box so they cannot drift */}
              <div className="relative mt-5 flex size-[84px] items-center justify-center">
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
                  width="33"
                  height="33"
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

              <h3 className={cardTitle}>{group.label}</h3>

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