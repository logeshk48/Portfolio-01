import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import LocalTime from "@/components/ui/LocalTime";
import ContactForm from "./ContactForm";
import { EMAIL, LIVE_SOCIALS, LOCATION } from "@/lib/contact";

/**
 * Form on the left, direct contact on the right.
 *
 * The card is deliberately not a second form. Anyone who does not
 * want to fill in fields should be able to leave with an address in
 * one glance — that is the whole job of the right-hand column.
 */

const head = [
  "font-display text-[clamp(34px,5vw,72px)] font-semibold",
  "uppercase leading-[0.94] tracking-[-0.04em]",
].join(" ");

const panel = [
  "rounded-[16px] border border-line/70 p-7",
  "bg-gradient-to-b from-white/[0.03] to-transparent",
].join(" ");

const row = [
  "group flex items-center gap-4 border-b border-line/60 py-[13px]",
  "last:border-b-0 transition-colors duration-500 hover:border-line-hi",
].join(" ");

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 lg:py-40">
      <div className="atmos" aria-hidden />

      <div className="relative px-(--gut)">
        <Reveal>
          <div className="label flex items-center gap-4">
            <span className="dot size-[5px] rounded-full bg-ice" />
            Contact
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className={`${head} mt-7 max-w-[16ch]`}>
            Got something worth <span className="ice">building?</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-[52ch] text-[16px] font-light leading-[1.8] text-muted">
            An idea, an opportunity, or a problem you think software can
            solve. Tell me what you are trying to do.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-[1.35fr_1fr] gap-14 max-lg:grid-cols-1 max-lg:gap-12">
          {/* ── the form ───────────────────────────── */}
          <Reveal delay={200}>
            <ContactForm />
          </Reveal>

          {/* ── direct ─────────────────────────────── */}
          <Reveal delay={280}>
            <div className={panel}>
              <span className="label text-ice">Direct</span>

              <Link
                href={`mailto:${EMAIL}`}
                className="mt-4 block break-all font-display text-[clamp(16px,1.6vw,20px)] font-medium tracking-[-0.01em] text-text transition-colors duration-500 hover:text-ice"
              >
                {EMAIL}
              </Link>

              <div className="mt-6 border-t border-line/60 pt-5">
                <div className="flex items-center justify-between gap-6 py-[10px]">
                  <span className="label">Based in</span>
                  <span className="label text-text">{LOCATION}</span>
                </div>
                <div className="flex items-center justify-between gap-6 py-[10px]">
                  <span className="label">Right now</span>
                  <LocalTime />
                </div>
                <div className="flex items-center justify-between gap-6 py-[10px]">
                  <span className="label">Replies</span>
                  <span className="label text-text">Within a few days</span>
                </div>
              </div>
            </div>

            <div className={`${panel} mt-5`}>
              <span className="label text-ice">Elsewhere</span>

              <div className="mt-3">
                {LIVE_SOCIALS.map((s) => (
                  <Link
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className={row}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="currentColor"
                      className="shrink-0 text-muted transition-colors duration-500 group-hover:text-ice"
                      aria-hidden
                    >
                      <path d={s.icon} />
                    </svg>

                    <span className="text-[14.5px] font-medium text-text">
                      {s.label}
                    </span>

                    <span className="arw ml-auto text-muted transition-transform duration-500 group-hover:translate-x-1">
                      &#8599;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}