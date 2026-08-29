"use client";

import { useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { markPath } from "@/lib/marks";
import { INTERESTS, STACK, TOTAL } from "@/lib/stack";

/**
 * A console, not a list.
 *
 * The index on the left stays put; the right column re-deals on every
 * switch. Because the item list is keyed by group, React throws the
 * old nodes away and the CSS animation replays from scratch — which
 * means no exit choreography to coordinate and no state machine. The
 * transition is the whole design.
 */

const idx = [
  "idx group flex w-full items-center gap-4 py-[13px] text-left",
  "border-b border-line/70 last:border-b-0",
].join(" ");

const idxNum = [
  "font-mono text-[10px] tracking-[0.16em]",
  "transition-colors duration-500",
].join(" ");

const idxLabel = [
  "font-display text-[clamp(19px,1.9vw,26px)] font-semibold uppercase",
  "tracking-[-0.02em] transition-colors duration-500",
].join(" ");

const item = [
  "deal font-display font-semibold uppercase",
  "text-[clamp(24px,3.6vw,52px)] leading-[1.04] tracking-[-0.035em]",
  "text-muted/45 transition-colors duration-300 hover:text-text",
].join(" ");

export default function Stack() {
  const [active, setActive] = useState(0);
  const [mark, setMark] = useState<string | null>(null);
  const group = STACK[active];

  return (
    <section id="stack" className="overflow-hidden py-28 lg:py-36">
      <div className="px-(--gut)">
        <SectionHead
          index="01"
          label="Stack"
          title={
            <>
              What I <span className="ice">Build</span> With
            </>
          }
          lede="No proficiency bars. Pick a layer — the rest is what I actually reach for."
        />
      </div>

      <div className="mt-16 px-(--gut)">
        <div className="grid grid-cols-[minmax(200px,270px)_1fr] gap-14 border-t border-line/70 pt-10 max-lg:grid-cols-1 max-lg:gap-8">
          {/* ── index ───────────────────────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {STACK.map((g, i) => {
              const on = i === active;
              return (
                <button
                  key={g.id}
                  className={idx}
                  data-on={on}
                  onMouseEnter={() => {
                    setActive(i);
                    setMark(null);
                  }}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                >
                  <span
                    className={`${idxNum} ${on ? "text-ice" : "text-line-hi"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`${idxLabel} ${
                      on ? "text-text" : "text-muted/50"
                    }`}
                  >
                    {g.label}
                  </span>

                  <span className="ml-auto h-px w-8 bg-line">
                    <span className="idx-bar block h-px w-full bg-ice" />
                  </span>
                </button>
              );
            })}

            <div className="label mt-7 flex items-center gap-3">
              <span className="text-text">{TOTAL}</span>
              things in rotation
            </div>
          </div>

          {/* ── the deal ────────────────────────────── */}
          <div className="relative min-h-[46vh]">
            {/* the ghost sits behind everything and never moves the
                layout, so items without a mark cost nothing */}
            <svg
              className="ghost pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              width="440"
              height="440"
              data-on={mark ? "true" : "false"}
              aria-hidden
            >
              {mark && <path d={mark} fill="currentColor" />}
            </svg>

            <div
              key={group.id}
              className="relative flex flex-wrap items-baseline gap-x-9 gap-y-3"
            >
              {group.items.map((name, i) => (
                <span
                  key={name}
                  className={item}
                  style={{ "--i": i } as React.CSSProperties}
                  onMouseEnter={() => setMark(markPath(name))}
                  onMouseLeave={() => setMark(null)}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── interests: appetite, not credentials ────── */}
      <div className="mt-20 border-y border-line/70 py-6">
        <div className="rail">
          <div
            className="rail-track"
            style={{ "--dur": "46s" } as React.CSSProperties}
          >
            {[...INTERESTS, ...INTERESTS].map((x, k) => (
              <span key={`${x}-${k}`} className="flex items-center gap-9">
                <span className="font-display text-[clamp(18px,2.1vw,30px)] font-medium uppercase tracking-[-0.02em] text-muted/50">
                  {x}
                </span>
                <span className="text-ice/50" aria-hidden>
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