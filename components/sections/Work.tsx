import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Shot from "./Shot";
import { WORK } from "@/lib/work";

/**
 * One project per row, alternating side to side. The eye zigzags down
 * the page instead of scanning a grid, and each project gets room to
 * make an argument rather than a caption.
 *
 * Links are optional by type, so a project without a repo renders no
 * repo button — never a dead one.
 */

const head = [
  "font-display text-[clamp(28px,3.6vw,48px)] font-semibold",
  "uppercase tracking-[-0.03em] leading-none",
].join(" ");

const name = [
  "font-display text-[clamp(30px,3.4vw,46px)] font-semibold",
  "uppercase leading-none tracking-[-0.03em]",
].join(" ");

const btn = [
  "pill-btn label-lg border border-line text-text",
  "transition-colors duration-500",
].join(" ");

const btnSolid = [
  "pill-btn pill-solid label-lg border border-line text-text",
  "transition-colors duration-500",
].join(" ");

export default function Work() {
  return (
    <section id="work" className="relative overflow-hidden py-32 lg:py-40">
      <div className="px-(--gut)">
        <Reveal>
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-line-hi max-sm:w-8" />
            <h2 className={head}>
              Selected <span className="ice">Work</span>
            </h2>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-line-hi max-sm:w-8" />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="mx-auto mt-7 max-w-[48ch] text-center text-[15.5px] font-light leading-[1.8] text-muted">
            Four things I built end to end — the problem each one solves,
            and the part that was actually hard.
          </p>
        </Reveal>

        <div className="mx-auto mt-24 max-w-[1180px]">
          {WORK.map((p, i) => {
            const flip = i % 2 === 1;

            return (
              <Reveal key={p.slug} className="work-row">
                <article className="grid grid-cols-2 items-center gap-14 py-16 max-lg:grid-cols-1 max-lg:gap-9 max-lg:py-12">
                  {/* ── the frame ─────────────────────── */}
                  <div className={flip ? "lg:order-2" : "lg:order-1"}>
                    <Shot project={p} />
                  </div>

                  {/* ── the argument ──────────────────── */}
                  <div className={flip ? "lg:order-1" : "lg:order-2"}>
                    <div className="label flex items-center gap-4">
                      <span className="text-line-hi">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-7 bg-line-hi" />
                      <span>{p.kind}</span>
                      <span
                        className={
                          p.status === "Building" ? "ml-auto text-ice" : "ml-auto"
                        }
                      >
                        {p.status} · {p.year}
                      </span>
                    </div>

                    <h3 className={`${name} mt-5`}>{p.name}</h3>

                    <p className="mt-4 max-w-[46ch] text-[16px] font-light leading-[1.7] text-text/85">
                      {p.summary}
                    </p>

                    <p className="mt-4 max-w-[52ch] text-[14.5px] font-light leading-[1.75] text-muted">
                      {p.problem}
                    </p>

                    <ul className="mt-7 border-t border-line/70">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-3 border-b border-line/70 py-[10px] text-[14px] font-light leading-[1.5] text-muted"
                        >
                          <span className="mt-[7px] size-[4px] shrink-0 rounded-full bg-ice/70" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 border-l border-ice/30 pl-5 text-[14px] font-light leading-[1.7] text-muted">
                      <span className="label mb-2 block text-ice">
                        The hard part
                      </span>
                      {p.hard}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                      {p.stack.map((s) => (
                        <span key={s} className="label text-text/55">
                          {s}
                        </span>
                      ))}
                    </div>

                    {(p.links?.live || p.links?.repo) && (
                      <div className="mt-8 flex flex-wrap gap-[10px]">
                        {p.links.live && (
                          <Link
                            href={p.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className={btnSolid}
                          >
                            <span>Live</span>
                            <span className="arw" aria-hidden>
                              &#8599;
                            </span>
                          </Link>
                        )}
                        {p.links.repo && (
                          <Link
                            href={p.links.repo}
                            target="_blank"
                            rel="noreferrer"
                            className={btn}
                          >
                            <span>Code</span>
                            <span className="arw" aria-hidden>
                              &#8599;
                            </span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}