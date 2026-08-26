import Link from "next/link";
import Nav from "@/components/ui/Nav";
import ScrollMeter from "./ScrollMeter";
import ScrollScene from "./ScrollScene";

// he sits right of centre with bright code monitors behind him, so the
// left has to be held down hard. Mobile centres the subject, so that
// gets a vertical wash instead.
const scrim =
  "linear-gradient(to right," +
  " rgba(10,10,24,0.96) 0%," +
  " rgba(10,10,24,0.90) 26%," +
  " rgba(10,10,24,0.55) 48%," +
  " rgba(10,10,24,0.18) 70%," +
  " transparent 88%)";

const scrimMobile =
  "linear-gradient(to top," +
  " rgba(10,10,24,0.97) 0%," +
  " rgba(10,10,24,0.88) 34%," +
  " rgba(10,10,24,0.45) 62%," +
  " rgba(10,10,24,0.30) 100%)";

const shout = [
  "block font-semibold uppercase",
  "text-[clamp(48px,8.2vw,132px)]",
  "leading-[0.83] tracking-[-0.055em]",
].join(" ");

const whisper = [
  "mt-6 block max-w-[20ch] font-light text-muted",
  "text-[clamp(18px,2vw,30px)]",
  "leading-[1.15] tracking-[-0.02em]",
].join(" ");

const lede = [
  "mt-8 max-w-[46ch] border-l border-line pl-5",
  "text-[15px] font-light leading-[1.7] text-muted",
].join(" ");

const btn = [
  "label-lg cursor-pointer rounded-[2px] px-[24px] py-[15px]",
  "border border-line text-text",
  "transition-[border-color,background-color] duration-500",
  "hover:border-line-hi hover:bg-white/[0.04]",
].join(" ");

const btnSolid = [
  "label-lg cursor-pointer rounded-[2px] px-[24px] py-[15px]",
  "border border-text bg-text text-bg",
  "transition-colors duration-500 hover:bg-white hover:border-white",
].join(" ");

const pill = [
  "label inline-flex items-center gap-[9px]",
  "rounded-full border border-line px-[13px] py-[7px]",
].join(" ");

const copyBlock = [
  "absolute left-(--gut) top-1/2 z-4 w-[min(52vw,820px)]",
  "-translate-y-1/2",
  "max-lg:top-auto max-lg:bottom-[11%] max-lg:w-auto",
  "max-lg:translate-y-0 max-lg:right-(--gut)",
].join(" ");

const stackRow = [
  "absolute bottom-6 left-(--gut) z-5",
  "flex max-w-[52vw] flex-wrap items-center gap-x-5 gap-y-2",
  "max-lg:max-w-none max-lg:right-(--gut)",
].join(" ");

// the copy rides the same clock as the video: it holds through the
// first third of the push-in, then clears out as the shot closes in
const fadeOut = {
  opacity: "max(0, calc(1 - (var(--p) - 0.35) * 2.6))",
} as React.CSSProperties;

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node",
  "Python",
  "MongoDB",
  "LLM APIs",
  "RAG",
  "n8n",
];

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

      <Nav />

      <div className={copyBlock} style={fadeOut}>
        <div
          className="rise mb-8"
          style={{ "--d": "480ms" } as React.CSSProperties}
        >
          <span className={pill}>
            <span className="size-[5px] rounded-full bg-text" />
            Building LetsCook · open to collaboration
          </span>
        </div>

        <h1>
          <span
            className={`${shout} rise`}
            style={{ "--d": "600ms" } as React.CSSProperties}
          >
            I Build
          </span>
          <span
            className={`${shout} glow-ice rise`}
            style={{ "--d": "710ms" } as React.CSSProperties}
          >
            Software
          </span>
          <span
            className={`${whisper} rise`}
            style={{ "--d": "870ms" } as React.CSSProperties}
          >
            that turns ideas into something real.
          </span>
        </h1>

        <p
          className={`${lede} rise`}
          style={{ "--d": "1010ms" } as React.CSSProperties}
        >
          {"I'm "}
          <b className="font-medium text-text">Logesh</b>
          {" — a software developer and AI builder."}
          {" Web applications, AI-powered products and practical"}
          {" automation. Currently at "}
          <b className="font-medium text-text">Dataclap</b>
          {", building "}
          <b className="font-medium text-text">LetsCook</b>
          {" alongside my work."}
        </p>

        <div
          className="rise mt-10 flex flex-wrap gap-[10px]"
          style={{ "--d": "1140ms" } as React.CSSProperties}
        >
          <Link href="#work" className={btnSolid}>
            See my work
          </Link>
          <Link href="#contact" className={btn}>
            Get in touch
          </Link>
        </div>
      </div>

      <div
        className={`${stackRow} rise`}
        style={{ ...fadeOut, "--d": "1300ms" } as React.CSSProperties}
      >
        <span className="label opacity-55">Built with</span>
        {STACK.map((s) => (
          <span key={s} className="label text-text/55">
            {s}
          </span>
        ))}
      </div>

      <ScrollMeter />
    </ScrollScene>
  );
}