"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { CREED, TIMELINE } from "@/lib/about";

/**
 * The story on the left, the record on the right, and behind both a
 * mark that morphs as you scroll: a chamfered circuit trace becoming
 * a code bracket.
 *
 * The section is named after a transformation, so the effect is one.
 * Both marks share the same rotation and scale — only their opacity
 * and stroke reveal cross over — which is what makes it read as one
 * object changing rather than two images swapping.
 *
 * Progress is written to a single custom property on the section and
 * CSS does the rest, so scrolling never re-renders React.
 */

const head = [
  "font-display text-[clamp(28px,3.6vw,48px)] font-semibold",
  "uppercase tracking-[-0.03em] leading-none",
].join(" ");

const para = "text-[16px] font-light leading-[1.85] text-muted";

const creed = [
  "font-display text-[clamp(22px,2.4vw,34px)] font-semibold",
  "uppercase leading-[1.1] tracking-[-0.02em]",
].join(" ");

// a trace with 45° chamfers and a via — real autorouters never turn
// at 90°, sharp corners trap etching acid
const CIRCUIT =
  "M6 26h14l6-6h16l6 6h14 M40 20V8 M40 32v12 M34 44h12";

// the same weight of line, arranged as code
const CODE = "M28 18 16 32l12 14 M52 18l12 14-12 14 M46 12 34 52";

export default function About() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    let visible = false;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    const tick = () => {
      if (visible) {
        const r = el.getBoundingClientRect();
        const span = r.height + window.innerHeight;
        const p = Math.min(1, Math.max(0, 1 - r.bottom / span));
        el.style.setProperty("--p", p.toFixed(4));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={section}
      id="about"
      className="relative overflow-hidden py-32 lg:py-40"
      style={{ "--p": "0" } as React.CSSProperties}
    >
      <div className="atmos" aria-hidden />

      {/* the morph, behind everything */}
      <div className="morph" aria-hidden>
        <svg viewBox="0 0 80 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="morph-a" d={CIRCUIT} strokeWidth="1.4" pathLength={1} />
          <circle className="morph-a" cx="40" cy="20" r="2.4" strokeWidth="1.4" />
          <path className="morph-b" d={CODE} strokeWidth="1.4" pathLength={1} />
        </svg>
      </div>

      <div className="relative px-(--gut)">
        <Reveal>
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-line-hi max-sm:w-8" />
            <h2 className={head}>
              From <span className="ice">Circuits</span> To Code
            </h2>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-line-hi max-sm:w-8" />
          </div>
        </Reveal>

        <div className="mx-auto mt-24 grid max-w-[1120px] grid-cols-[1fr_1.1fr] gap-20 max-lg:grid-cols-1 max-lg:gap-16">
          {/* ── the story ────────────────────────── */}
          <div>
            <Reveal delay={80}>
              <p className={para}>
                I started with electronics — four years of circuits,
                signals and embedded systems. Somewhere in the middle
                of it, software caught my attention, and it never let
                go.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className={`${para} mt-6`}>
                So I started building. A fitness app. A finance
                tracker. A freelance tool for a cricket club. An AI
                assistant that turns a sentence into a plan. Each one
                taught me something the last one couldn&apos;t.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className={`${para} mt-6`}>
                Today I work at Dataclap, build LetsCook after hours,
                and spend most of my spare attention on AI, automation
                and getting better at software engineering.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-12 border-t border-line/70 pt-9">
                {CREED.map((line, i) => (
                  <span
                    key={line}
                    className={`${creed} block ${
                      i === CREED.length - 1 ? "text-text" : "text-muted/60"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── the record ───────────────────────── */}
          <Reveal delay={200} className="spine relative pl-10">
            <span className="spine-line" aria-hidden />

            {TIMELINE.map((m, i) => (
              <div
                key={m.year}
                className="relative pb-12 last:pb-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="spine-node" aria-hidden />

                <span className="label text-ice">{m.year}</span>

                <h3 className="mt-3 font-display text-[21px] font-semibold uppercase tracking-[0.02em] text-text">
                  {m.title}
                </h3>

                <p className="label mt-2 normal-case tracking-[0.06em]">
                  {m.where}
                </p>

                <p className="mt-3 max-w-[42ch] text-[14.5px] font-light leading-[1.7] text-muted">
                  {m.note}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}