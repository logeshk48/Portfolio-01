"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useCapability } from "@/lib/useCapability";

/**
 * Lenis drives scroll for the whole site so scroll-linked 3D and GSAP
 * timelines share one clock. Disabled outright under reduced-motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const { reducedMotion, ready } = useCapability();

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // expose for anchor links / command bar
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [ready, reducedMotion]);

  return <>{children}</>;
}
