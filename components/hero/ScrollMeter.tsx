/**
 * Scroll meter.
 *
 * Nobody knows a hero is scrubbable unless you tell them, so this
 * sits in the corner and fills as the clip advances. It reads the
 * same --p custom property the video does, which means no JS, no
 * re-renders, and it can never drift out of sync with the footage.
 */

const wrap = [
  "absolute bottom-6 right-(--gut) z-5",
  "flex items-center gap-4",
].join(" ");

const track = [
  "relative h-px w-[104px] overflow-hidden",
  "bg-line-hi/60 max-sm:hidden",
].join(" ");

const fill = [
  "absolute inset-y-0 left-0 bg-text",
  "origin-left",
].join(" ");

export default function ScrollMeter() {
  return (
    <div className={wrap}>
      <span className="label whitespace-nowrap">Scroll</span>

      <div className={track} aria-hidden>
        <div
          className={fill}
          style={{ width: "calc(var(--p, 0) * 100%)" }}
        />
      </div>

      <span
        className="label tabular-nums text-text"
        style={{ opacity: "calc(0.4 + var(--p, 0) * 0.6)" }}
      >
        Tamil Nadu, IN
      </span>
    </div>
  );
}