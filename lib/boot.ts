/**
 * One clock for the whole boot.
 *
 * A module singleton rather than React state, deliberately: the WebGL
 * reads it inside useFrame at 60fps and the DOM reads it once per phase.
 * Putting it in state would re-render the tree 200 times during the
 * sequence for no reason.
 */

export interface BootState {
  reveal: number;  // 0→1 trace draw-in
  mix: number;     // 0→1 copper → signal migration
  done: boolean;
}

export const boot: BootState = { reveal: 0, mix: 0, done: false };

/** milliseconds, from first paint */
export const T = {
  traceStart: 120,
  traceEnd: 1500,
  accentStart: 2200,
  accentEnd: 3600,
} as const;

export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function span(now: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (now - from) / (to - from)));
}

/** Advance the sequence. Returns true while still running. */
export function stepBoot(elapsed: number): boolean {
  boot.reveal = easeOutExpo(span(elapsed, T.traceStart, T.traceEnd));
  boot.mix = easeInOutQuint(span(elapsed, T.accentStart, T.accentEnd));
  boot.done = elapsed >= T.accentEnd;
  return !boot.done;
}

/** Reduced motion: skip straight to the resting state. */
export function completeBoot(): void {
  boot.reveal = 1;
  boot.mix = 1;
  boot.done = true;
}