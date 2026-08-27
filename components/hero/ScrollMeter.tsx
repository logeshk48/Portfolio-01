/**
 * Scroll meter. Nobody knows a hero is scrubbable unless you tell
 * them, so this fills as the clip advances. It reads the same --p
 * the video does, so it can never drift out of sync — and it costs
 * no JavaScript.
 */
export default function ScrollMeter() {
  return (
    <div className="flex items-center gap-4">
      <span className="label whitespace-nowrap">Scroll</span>
      <div
        className="relative h-px w-[96px] bg-line-hi/60 max-sm:hidden"
        aria-hidden
      >
        <div
          className="absolute inset-y-0 left-0 bg-text"
          style={{ width: "calc(var(--p, 0) * 100%)" }}
        />
      </div>
    </div>
  );
}