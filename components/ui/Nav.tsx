import Link from "next/link";

const LINKS: [string, string][] = [
  ["Work", "#work"],
  ["About", "#about"],
  ["LetsCook", "#letscook"],
  ["Contact", "#contact"],
];

// name and role sit on one baseline, split by a hairline — the role
// is the first thing read after the name, so it belongs beside it
const brand = [
  "rise flex items-center gap-4",
].join(" ");

const rule = "h-[13px] w-px bg-line-hi max-sm:hidden";

const role = [
  "label flex items-center gap-[9px] max-sm:hidden",
].join(" ");

export default function Nav() {
  return (
    <nav className="flex items-center justify-between gap-8">
      <div
        className={brand}
        style={{ "--d": "200ms" } as React.CSSProperties}
      >
        <Link href="/" className="caps text-[14px] leading-none text-text">
          Logesh<span className="text-muted">&#8202;K</span>
        </Link>

        <span className={rule} aria-hidden />

        <span className={role}>
          <span className="dot size-[5px] rounded-full bg-ice" />
          Software Developer · AI Builder
        </span>
      </div>

      <div
        className="rise flex items-center gap-9"
        style={{ "--d": "300ms" } as React.CSSProperties}
      >
        {LINKS.map(([label, href], i) => (
          <Link
            key={label}
            href={href}
            className={`label nav-link ${i < 3 ? "max-md:hidden" : ""}`}
          >
            <i>{label}</i>
            <i>{label}</i>
          </Link>
        ))}
      </div>
    </nav>
  );
}