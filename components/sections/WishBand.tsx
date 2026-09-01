"use client";

import { useEffect, useRef } from "react";
import { INTERESTS } from "@/lib/stack";

/**
 * The ticker band, backed by an image that drifts as the page scrolls.
 *
 * The image is 2600px wide inside a viewport-width frame, so there is
 * real slack to travel through — that surplus is what makes parallax
 * readable. Progress is written to one custom property and CSS does
 * the transform, so the whole effect costs one composited layer and
 * never re-renders React.
 *
 * The wolf drifts against the marquee direction. Two things moving
 * opposite ways at different speeds is what sells depth; matching
 * them would just look like one layer.
 */

const wish = [
  "wish font-display text-[clamp(20px,2.4vw,34px)] font-semibold",
  "uppercase tracking-[-0.02em] text-muted/60",
].join(" ");

export default function WishBand() {
  const band = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        // -1 → 1 across the whole approach and exit
        const p = 1 - (r.bottom / span) * 2;
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
    <div
      ref={band}
      className="wish-band relative mt-28 border-y border-line/70 py-9"
      style={{ "--p": "0" } as React.CSSProperties}
    >
      <div className="wolf" aria-hidden />

      <p className="label relative mb-7 px-(--gut) text-center">
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
  );
}