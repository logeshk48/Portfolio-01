export default function Home() {
  return (
    <main
      id="main"
      className="flex min-h-[200svh] flex-col justify-center gap-8 px-[var(--gut)] py-40"
    >
      <p className="legend">Portfoliko · Phase 01 · Foundation</p>

      <h1 className="max-w-[15ch] font-[family-name:var(--font-display)] text-[clamp(38px,7.2vw,92px)] font-semibold leading-[0.96] tracking-[-0.035em]">
        I build software that turns ideas into something real.
      </h1>

      <p className="max-w-[46ch] text-[17px] font-light leading-relaxed text-legend">
        Foundation is live: tokens, fonts, Lenis smooth scroll and the probe cursor.
        Scroll to feel the easing. Hover this text, then a link.
      </p>

      <a
        href="#main"
        className="w-fit border border-trace px-5 py-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-silk transition-colors hover:border-copper hover:text-copper"
      >
        Cursor test
      </a>
    </main>
  );
}
