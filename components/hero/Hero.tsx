import Link from "next/link";
import Nav from "@/components/ui/Nav";
import ScrollMeter from "./ScrollMeter";
import ScrollScene from "./ScrollScene";

/**
 * One flex column owns the whole viewport: nav at the top, copy in the
 * middle, meta at the bottom. Everything used to be positioned
 * absolutely and independently, which is exactly how blocks end up
 * overlapping at sizes nobody tested. Now they share a layout and
 * collisions are impossible.
 */

const scrim =
  "linear-gradient(to right," +
  " rgba(10,10,24,0.97) 0%," +
  " rgba(10,10,24,0.92) 30%," +
  " rgba(10,10,24,0.58) 52%," +
  " rgba(10,10,24,0.18) 72%," +
  " transparent 90%)";

const scrimMobile =
  "linear-gradient(to top," +
  " rgba(10,10,24,0.97) 0%," +
  " rgba(10,10,24,0.90) 40%," +
  " rgba(10,10,24,0.55) 68%," +
  " rgba(10,10,24,0.35) 100%)";

const topScrim =
  "linear-gradient(to bottom," +
  " rgba(10,10,24,0.85) 0%," +
  " transparent 100%)";

const shell = [
  "relative z-4 flex h-full flex-col",
  "px-(--gut) pb-7 pt-7",
].join(" ");

const shout = [
  "block font-display font-bold uppercase",
  "text-[clamp(44px,7.4vw,118px)]",
  "leading-[0.86] tracking-[-0.03em]",
].join(" ");

const sub = [
  "mt-7 max-w-[26ch] font-display font-semibold",
  "text-[clamp(19px,2.1vw,32px)]",
  "leading-[1.16] tracking-[-0.02em] text-muted",
].join(" ");

// the paragraph became a spec block: two labelled rows read faster
// than prose and look like documentation rather than an about-me
const specRow = [
  "flex gap-5 border-b border-line/70 py-[11px] last:border-b-0",
  "max-sm:flex-col max-sm:gap-1",
].join(" ");

const specKey = "label w-[74px] shrink-0 pt-[3px]";

const specVal = [
  "text-[14.5px] font-light leading-[1.6] text-muted",
].join(" ");

const btn = [
  "pill-btn label-lg border border-line text-text",
  "transition-colors duration-500",
].join(" ");

const btnSolid = [
  "pill-btn pill-solid label-lg border border-line text-text",
  "transition-colors duration-500",
].join(" ");

const pill = [
  "label inline-flex items-center gap-[9px]",
  "rounded-full border border-line px-[13px] py-[7px]",
].join(" ");

const foot = [
  "flex items-end justify-between gap-8",
  "border-t border-line/70 pt-5",
].join(" ");

// copy rides the same clock as the footage: holds, then clears as the
// shot closes in
const fadeOut = {
  opacity: "max(0, calc(1 - (var(--p) - 0.30) * 2.4))",
} as React.CSSProperties;

const STACK = ["Next.js", "React", "TypeScript", "Node", "MongoDB", "RAG"];

export default function Hero() {
  return (
    <ScrollScene>
      <div
        className="pointer-events-none absolute inset-0 z-2 max-lg:hidden"
        style={{ background: scrim }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-2 lg:hidden"
        style={{ background: scrimMobile }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-2 h-28"
        style={{ background: topScrim }}
        aria-hidden
      />

      <div className={shell}>
        <Nav />

        <div
          className="flex flex-1 items-center max-lg:items-end max-lg:pb-6"
          style={fadeOut}
        >
          <div className="w-[min(54vw,760px)] max-lg:w-full">
            <div
              className="rise mb-9"
              style={{ "--d": "480ms" } as React.CSSProperties}
            >
              <span className={pill}>
                <span className="size-[5px] rounded-full bg-text" />
                Building LetsCook
              </span>
            </div>

            <h1>
              <span
                className={`${shout} rise`}
                style={{ "--d": "600ms" } as React.CSSProperties}
              >
                <span className="ice">Ideas</span> Don&apos;t
              </span>
              <span
                className={`${shout} rise`}
                style={{ "--d": "710ms" } as React.CSSProperties}
              >
                Ship Themselves
              </span>
            </h1>

            <p
              className={`${sub} rise`}
              style={{ "--d": "850ms" } as React.CSSProperties}
            >
              So I <span className="text-text">build</span> them.{" "}
              <span className="text-text">Web apps</span>,{" "}
              <span className="text-text">AI products</span>,{" "}
              <span className="text-text">automation</span>.
            </p>

            <div
              className="rise mt-9 max-w-[44ch] border-t border-line/70"
              style={{ "--d": "990ms" } as React.CSSProperties}
            >
              <div className={specRow}>
                <span className={specKey}>Now</span>
                <span className={specVal}>
                  <b className="font-medium text-text">Dataclap</b>
                  {" by day, "}
                  <b className="font-medium text-text">LetsCook</b>
                  {" after hours"}
                </span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Origin</span>
                <span className={specVal}>
                  Started in electronics, ended up writing software
                </span>
              </div>
            </div>

            <div
              className="rise mt-10 flex flex-wrap gap-[10px]"
              style={{ "--d": "1120ms" } as React.CSSProperties}
            >
              <Link href="#work" className={btnSolid}>
                <span>See my work</span>
                <span className="arw" aria-hidden>
                  &#8594;
                </span>
              </Link>
              <Link href="#contact" className={btn}>
                <span>Get in touch</span>
                <span className="arw" aria-hidden>
                  &#8599;
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`${foot} rise`}
          style={{ "--d": "1280ms" } as React.CSSProperties}
        >
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            style={fadeOut}
          >
            <span className="label opacity-50">Stack</span>
            {STACK.map((s) => (
              <span key={s} className="label text-text/60">
                {s}
              </span>
            ))}
          </div>

          <ScrollMeter />
        </div>
      </div>
    </ScrollScene>
  );
}