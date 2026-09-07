import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CAPABILITIES, LETSCOOK } from "@/lib/letscook";

/**
 * Split-screen lock.
 *
 * The identity pins on the left while the capabilities scroll past on
 * the right. It is position: sticky and nothing else — no scroll
 * hijacking, no pinning library, and on a narrow screen the two
 * columns simply stack. Effects that fight the scrollbar break on
 * touch devices and under reduced-motion; this one degrades to a
 * normal page by doing nothing.
 */

const head = [
  "font-display text-[clamp(34px,4.6vw,68px)] font-semibold",
  "uppercase leading-[0.92] tracking-[-0.035em]",
].join(" ");

const capTitle = [
  "font-display text-[clamp(26px,3vw,42px)] font-semibold",
  "uppercase leading-none tracking-[-0.03em] text-text",
].join(" ");

const btn = [
  "pill-btn label-lg border border-line text-text",
  "transition-colors duration-500",
].join(" ");

const btnSolid = [
  "pill-btn pill-solid label-lg border border-line text-text",
  "transition-colors duration-500",
].join(" ");

export default function LetsCook() {
  return (
    <section id="letscook" className="relative py-32 lg:py-40">
      <div className="px-(--gut)">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[0.85fr_1fr] gap-20 max-lg:grid-cols-1 max-lg:gap-14">
          {/* ── pinned ─────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <div className="label flex items-center gap-4">
                <span className="dot size-[5px] rounded-full bg-ice" />
                Company · {LETSCOOK.since} — present
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className={`${head} mt-7`}>
                Let&apos;s<span className="ice">Cook</span>
              </h2>
              <p className="label mt-4 normal-case tracking-[0.06em]">
                {LETSCOOK.tagline}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-[38ch] text-[16px] font-light leading-[1.8] text-muted">
                A technology company I build with a team, alongside my
                full-time work. Websites, mobile apps and custom
                applications — for {LETSCOOK.audience.toLowerCase()}.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-5 max-w-[38ch] text-[14.5px] font-light leading-[1.75] text-muted/80">
                I work across the stack on it — front end, APIs, and the
                AI pieces.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap gap-[10px]">
                <Link
                  href={LETSCOOK.url}
                  target="_blank"
                  rel="noreferrer"
                  className={btnSolid}
                >
                  <span>letscooktech.com</span>
                  <span className="arw" aria-hidden>
                    &#8599;
                  </span>
                </Link>
                
              </div>
            </Reveal>
          </div>

          {/* ── scrolling ──────────────────────────── */}
          <div className="border-t border-line/70">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.n} delay={i * 60}>
                <article className="cap group border-b border-line/70 py-11">
                  <div className="flex items-baseline gap-6">
                    <span className="label text-line-hi">{c.n}</span>
                    <h3 className={capTitle}>{c.title}</h3>
                  </div>

                  <p className="mt-4 max-w-[40ch] pl-[46px] text-[15px] font-light leading-[1.7] text-muted max-sm:pl-0">
                    {c.blurb}
                  </p>

                  <ul className="cap-detail pl-[46px] max-sm:pl-0">
                    {c.detail.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 pt-[9px] text-[14px] font-light text-muted/80"
                      >
                        <span className="mt-[8px] size-[3px] shrink-0 rounded-full bg-ice/60" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}