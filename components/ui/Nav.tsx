import Link from "next/link";

const link = "label transition-colors duration-500 hover:text-text";

const LINKS: [string, string][] = [
  ["Work", "#work"],
  ["About", "#about"],
  ["LetsCook", "#letscook"],
  ["Contact", "#contact"],
];

export default function Nav() {
  return (
    <nav className="flex items-center justify-between">
      <div
        className="rise caps text-[14px] text-text"
        style={{ "--d": "200ms" } as React.CSSProperties}
      >
        Logesh<span className="text-muted">™</span>
      </div>

      <div
        className="rise flex items-center gap-8"
        style={{ "--d": "300ms" } as React.CSSProperties}
      >
        {LINKS.map(([label, href], i) => (
          <Link
            key={label}
            href={href}
            className={`${link} ${i < 3 ? "max-md:hidden" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}