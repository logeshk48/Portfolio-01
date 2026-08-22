"use client";

import { useEffect, useRef } from "react";
import { useCapability } from "@/lib/useCapability";

type State = "default" | "link" | "text";

/**
 * Probe cursor. A ring that lags behind a dot — the ring lerps, the dot
 * tracks 1:1, so fast movement stretches them apart like a scope trace
 * catching up to a signal.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const { reducedMotion, ready } = useCapability();

  useEffect(() => {
    if (!ready || reducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = root.current;
    const dotEl = dot.current;
    if (!el || !dotEl) return;

    document.documentElement.classList.add("has-cursor");

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let frame = 0;

    const setState = (s: State) => el.setAttribute("data-state", s);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.setAttribute("data-hidden", "false");

      const hit = e.target as HTMLElement | null;
      if (!hit?.closest) return;
      if (hit.closest("a, button, [role='option'], [data-cursor='link']")) setState("link");
      else if (hit.closest("input, textarea, [data-cursor='text']")) setState("text");
      else setState("default");
    };

    const onLeave = () => el.setAttribute("data-hidden", "true");

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      el.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      dotEl.style.transform = `translate3d(${target.x - ring.x}px, ${target.y - ring.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [ready, reducedMotion]);

  return (
    <div ref={root} className="cursor-root" data-state="default" data-hidden="true" aria-hidden>
      <div className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
