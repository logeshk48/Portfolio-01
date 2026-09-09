"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { INTERESTS, STACK } from "@/lib/stack";

/**
 * Six panels, edge to edge. Hovering one opens it and squeezes the
 * rest.
 *
 * The header keeps the page gutter; the panels break out of it and
 * run the full width. Contiguous slices with hairline dividers read
 * as one band — gaps and rounded corners would turn the same thing
 * back into six boxes sitting near each other.
 *
 * flex-grow does the work, and because it works on either axis the
 * same rules handle mobile: the container becomes a column and the
 * panels expand downward. No second component, no breakpoint state.
 */

const head = [
  "font-display text-[clamp(28px,3.6vw,48px)] font-semibold",
  "uppercase tracking-[-0.03em] leading-none",
].join(" ");

const wish = [
  "wish font-display text-[clamp(20px,2.4vw,34px)] font-semibold",
  "uppercase tracking-[-0.02em] text-muted/55",
].join(" ");

export default function Stack() {
  const [open, setOpen] = useState(0);

  return (
    <section id="stack" className="relative overflow-hidden py-24">
      <div className="atmos" aria-hidden />

      {/* ── header keeps the gutter ──────────────── */}
      <div className="relative px-(--gut)">
        <Reveal>
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-line-hi max-sm:w-8" />
            <h2 className={head}>
              My <span className="ice">Stack</span>
            </h2>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-line-hi max-sm:w-8" />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="mx-auto mt-6 max-w-[46ch] text-center text-[15.5px] font-light leading-[1.8] text-muted">
            Everything I have shipped with. From the first line of a
            component to a model answering in production.
          </p>
        </Reveal>
      </div>

      {/* ── panels break out to full width ───────── */}
      <Reveal delay={160}>
        <div className="panels relative mt-14 flex max-lg:flex-col">
          {STACK.map((group, i) => {
            const isOpen = i === open;

            return (
              <div
                key={group.label}
                className="panel"
                data-on={isOpen}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
              >
                {/* the ghost mark, mostly cropped by the slice */}
                <svg
                  className="panel-ghost"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={group.icon} />
                </svg>

                {/* ── collapsed ────────────────────── */}
                <div className="panel-spine">
                  <span className="label text-line-hi">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="panel-vert font-display text-[20px] font-semibold uppercase tracking-[0.06em]">
                    {group.label}
                  </span>
                </div>

                {/* ── open ─────────────────────────── */}
                <div className="panel-face">
                  <div className="flex items-center gap-4">
                    <span className="label text-ice">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-ice/40" />
                    <span className="label">
                      {String(group.items.length).padStart(2, "0")} things
                    </span>
                  </div>

                  <svg
                    className="ink mt-8 text-ice"
                    viewBox="0 0 24 24"
                    width="36"
                    height="36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={group.icon} pathLength={1} />
                  </svg>

                  <h3 className="mt-6 font-display text-[clamp(26px,3vw,44px)] font-semibold uppercase leading-none tracking-[-0.025em] text-text">
                    {group.label}
                  </h3>

                  <p className="mt-4 max-w-[30ch] text-[14.5px] font-light leading-[1.65] text-muted">
                    {group.note}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-x-10 gap-y-0">
                    {group.items.map((s, k) => (
                      <span
                        key={s}
                        className="panel-item"
                        style={{ "--i": k } as React.CSSProperties}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* ── what I want to build ─────────────────── */}
      <div className="wish-band mt-16 border-y border-line/70 py-7">
        <p className="label relative mb-5 px-(--gut) text-center">
          What I want to build
        </p>

        <div className="rail wish-rail relative">
          <div
            className="rail-track"
            style={{ "--dur": "52s" } as React.CSSProperties}
          >
            {[...INTERESTS, ...INTERESTS].map((x, k) => (
              <span key={`${x}-${k}`} className="flex items-center gap-10">
                <span className={wish}>{x}</span>
                <span className="text-ice/40" aria-hidden>
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