"use client";

import { useEffect, useRef } from "react";
import { BEATS, CREED } from "@/lib/about";

/**
 * Two scroll scenes.
 *
 * First: four pages hinge off their own top edge inside a sticky
 * frame, so the story can only be read in order.
 *
 * Second: the creed. Each line rises out of a clip as the scroll
 * reaches it — not a timed stagger, which plays the same way whether
 * you are reading or not. Scroll-driven means the reader sets the
 * pace, and the last line only lands when they have arrived at it.
 *
 * Both scenes work the same way: one custom property counting 0 → n,
 * and every child compares its own index against it in CSS. One
 * handler per scene, zero re-renders.
 */

const head = [
  "font-display text-[clamp(28px,3.6vw,48px)] font-semibold",
  "uppercase tracking-[-0.03em] leading-none",
].join(" ");

const beatTitle = [
  "font-display text-[clamp(32px,4.2vw,58px)] font-semibold",
  "uppercase leading-[0.94] tracking-[-0.035em] text-text",
].join(" ");

const creed = [
  "block font-display text-[clamp(30px,5.4vw,76px)] font-semibold",
  "uppercase leading-[1.06] tracking-[-0.035em]",
].join(" ");

/** counts 0 → steps across a scene's own scroll, into `prop` */
function useScrollCount(
  ref: React.RefObject<HTMLDivElement | null>,
  prop: string,
  steps: number
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty(prop, String(steps));
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
        const total = el.offsetHeight - window.innerHeight;
        const raw = total > 0 ? -r.top / total : 0;
        const p = Math.min(1, Math.max(0, raw)) * steps;
        el.style.setProperty(prop, p.toFixed(3));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [ref, prop, steps]);
}

export default function About() {
  const scene = useRef<HTMLDivElement>(null);
  const creedScene = useRef<HTMLDivElement>(null);

  useScrollCount(scene, "--s", BEATS.length);
  useScrollCount(creedScene, "--c", CREED.length);

  return (
    <section id="about" className="relative">
      {/* ── the pages ────────────────────────────── */}
      <div
        ref={scene}
        className="stack-scene relative"
        style={{ "--s": "0" } as React.CSSProperties}
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-(--gut)">
          <div className="atmos" aria-hidden />

          <div className="relative mx-auto w-full max-w-[1080px]">
            <div className="flex items-center gap-6">
              <h2 className={head}>
                From <span className="ice">Circuits</span> To Code
              </h2>
              <span className="h-px flex-1 bg-gradient-to-r from-line-hi to-transparent" />
            </div>

            <div className="beats relative mt-12 h-[clamp(330px,40vh,400px)]">
              {BEATS.map((b, i) => (
                <article
                  key={b.year}
                  className="beat"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="beat-face">
                    <div className="label flex items-center gap-4">
                      <span className="text-ice">{b.year}</span>
                      <span className="h-px w-8 bg-line-hi" />
                      <span>{b.kicker}</span>
                      <span className="ml-auto text-line-hi">
                        {String(i + 1).padStart(2, "0")} / 0{BEATS.length}
                      </span>
                    </div>

                    <h3 className={`${beatTitle} mt-7`}>{b.title}</h3>

                    <p className="mt-6 max-w-[46ch] text-[16px] font-light leading-[1.8] text-muted">
                      {b.body}
                    </p>

                    <p className="label mt-7 normal-case tracking-[0.06em]">
                      {b.where}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex gap-2">
              {BEATS.map((b, i) => (
                <span
                  key={b.year}
                  className="beat-pip"
                  style={{ "--i": i } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── the creed, line by line ──────────────── */}
      <div
        ref={creedScene}
        className="creed-scene relative"
        style={{ "--c": "0" } as React.CSSProperties}
      >
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-(--gut)">
          {/* the room drifts up while the lines rise — different
              rates is what makes it read as depth */}
          <div className="desk" aria-hidden />
          <div className="desk-scrim" aria-hidden />

          <div className="relative mx-auto max-w-[1080px] text-center">
            <span className="label mb-12 block">Where that leaves me</span>

            {CREED.map((line, i) => (
              <span
                key={line}
                className="creed-line"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  className={`${creed} ${
                    i === CREED.length - 1 ? "ice" : "text-muted/45"
                  }`}
                >
                  {line}
                </span>
              </span>
            ))}

            <span className="creed-rule mt-14" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}