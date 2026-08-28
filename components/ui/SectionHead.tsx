import Reveal from "./Reveal";

/**
 * Every section opens the same way: an index, a rule, a title. The
 * numbering is the only thing that changes, so the page reads as a
 * document with parts rather than a stack of unrelated blocks.
 */
export default function SectionHead({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="max-w-[62ch]">
      <Reveal className="flex items-center gap-4">
        <span className="label text-ice">{index}</span>
        <span className="h-px w-10 bg-line-hi" />
        <span className="label">{label}</span>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="mt-7 font-display text-[clamp(30px,4.2vw,58px)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={150}>
          <p className="mt-5 max-w-[52ch] text-[15px] font-light leading-[1.7] text-muted">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}