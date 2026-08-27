"use client";

import { useEffect, useRef } from "react";
import { useCapability } from "@/lib/useCapability";

const DURATION_FALLBACK = 6;
const FPS = 24;

/**
 * Scroll drives playback.
 *
 * The section is three viewports tall with a sticky viewport inside it,
 * so scrolling through it maps 0→1 onto the clip's timeline. The camera
 * pushes in as you scroll and the page moves on when the shot lands.
 *
 * Two things make this feel smooth rather than stuttery. The clip is
 * encoded with every frame as a keyframe, so seeking anywhere is exact
 * — normal video only stores full frames every second or two and
 * scrubbing between them tears. And currentTime is eased toward the
 * target on rAF instead of being slammed to it, so a flicked scroll
 * wheel glides instead of snapping.
 *
 * Progress is also published as --p on the sticky element, so the copy
 * can fade against the same clock in pure CSS with no re-renders.
 */
export default function ScrollScene({
  children,
}: {
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const { tier, reducedMotion, ready } = useCapability();
  const scrub = ready && tier === "high" && !reducedMotion;

  useEffect(() => {
    if (!scrub) return;

    const el = outer.current;
    const pin = sticky.current;
    const vid = video.current;
    if (!el || !pin || !vid) return;

    // iOS will not seek an untouched video; a muted play/pause unlocks it
    vid.muted = true;
    void vid.play().then(() => vid.pause()).catch(() => undefined);

    let frame = 0;
    let eased = 0;
    let lastFrame = -1;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      const p = Math.min(1, Math.max(0, raw));

      eased += (p - eased) * 0.16;

      pin.style.setProperty("--p", eased.toFixed(4));

      const dur = Number.isFinite(vid.duration)
        ? vid.duration
        : DURATION_FALLBACK;

      // Snap to frame boundaries. Asking for arbitrary timestamps makes
      // the decoder work out a frame it then rounds away anyway — at
      // 24fps that is most seeks doing nothing. Only move when we have
      // actually crossed into a new frame.
      const lastIdx = Math.floor(dur * FPS) - 1;
      const want = Math.min(lastIdx, Math.round(eased * dur * FPS));

      if (vid.readyState >= 2 && want !== lastFrame) {
        lastFrame = want;
        vid.currentTime = want / FPS;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrub]);

  return (
    <section
      ref={outer}
      className={scrub ? "relative h-[300svh]" : "relative h-svh"}
    >
      <div
        ref={sticky}
        className="sticky top-0 h-svh overflow-hidden"
        style={{ "--p": "0" } as React.CSSProperties}
      >
        <div className="absolute inset-0" aria-hidden>
          <picture>
            <source
              media="(max-width: 900px)"
              srcSet="/hero/hero-poster-mobile.jpg"
            />
            <img
              src="/hero/hero-poster.jpg"
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          </picture>

          {scrub && (
            <video
              ref={video}
              className="absolute inset-0 size-full object-cover"
              muted
              playsInline
              preload="auto"
              src="/hero/hero-scrub.mp4"
            />
          )}
        </div>

        {children}
      </div>
    </section>
  );
}