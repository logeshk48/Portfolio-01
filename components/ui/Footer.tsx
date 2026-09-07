import Link from "next/link";
import { EMAIL, LIVE_SOCIALS } from "@/lib/contact";

const NAV: [string, string][] = [
  ["Stack", "#stack"],
  ["Work", "#work"],
  ["About", "#about"],
  ["LetsCook", "#letscook"],
  ["Contact", "#contact"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 px-(--gut) py-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="caps text-[15px] text-text">
              Logesh<span className="text-muted">&#8202;K</span>
            </p>
            <p className="label mt-3">Software Developer · AI Builder</p>
            <p className="label mt-1">Builder at Let&apos;s Cook Technologies</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="label transition-colors duration-500 hover:text-text"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {LIVE_SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="label transition-colors duration-500 hover:text-text"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-7">
          <p className="label">&copy; {year} Logesh K</p>
          <Link
            href={`mailto:${EMAIL}`}
            className="label transition-colors duration-500 hover:text-text"
          >
            {EMAIL}
          </Link>
          <p className="label max-sm:hidden">Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}