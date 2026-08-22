"use client";

import { useEffect, useState } from "react";

export type Tier = "high" | "low";

export interface Capability {
  /** user asked the OS to calm things down */
  reducedMotion: boolean;
  /** device can plausibly run the WebGL board at 60fps */
  tier: Tier;
  /** true once measured on the client — render heavy stuff only after this */
  ready: boolean;
}

/**
 * One source of truth for "are we allowed to be fancy right now".
 * Every heavy effect (WebGL board, GSAP timelines, cursor) reads this.
 */
export function useCapability(): Capability {
  const [cap, setCap] = useState<Capability>({
    reducedMotion: false,
    tier: "low",
    ready: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const cores = navigator.hardwareConcurrency ?? 4;
      const narrow = window.innerWidth < 900;

      let webgl = false;
      try {
        const c = document.createElement("canvas");
        webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        webgl = false;
      }

      const tier: Tier =
        webgl && !mq.matches && !coarse && !narrow && cores >= 4 ? "high" : "low";

      setCap({ reducedMotion: mq.matches, tier, ready: true });
    };

    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return cap;
}
