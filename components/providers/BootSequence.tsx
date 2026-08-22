"use client";

import { useEffect } from "react";
import { completeBoot, stepBoot, T } from "@/lib/boot";
import { useCapability } from "@/lib/useCapability";

/**
 * Drives the boot. Mutates the shared store every frame for the WebGL,
 * and flips two body classes for the CSS — which is what makes the
 * --accent custom property migrate copper → signal in lockstep with
 * the shader's uMix uniform.
 */
export default function BootSequence() {
  const { reducedMotion, ready } = useCapability();

  useEffect(() => {
    if (!ready) return;

    const root = document.body;

    if (reducedMotion) {
      completeBoot();
      root.classList.add("boot-skip", "booted");
      return;
    }

    root.classList.add("booting");

    const start = performance.now();
    let frame = 0;
    let flipped = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const running = stepBoot(elapsed);

      if (!flipped && elapsed >= T.accentStart) {
        flipped = true;
        root.classList.add("booted");
      }

      if (running) {
        frame = requestAnimationFrame(tick);
      } else {
        root.classList.remove("booting");
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ready, reducedMotion]);

  return null;
}