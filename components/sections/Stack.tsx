"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { EXPLORING, STACK, TOOL_COUNT, type Tool } from "@/lib/stack";

/**
 * Five rails, running continuously in alternating directions at
 * different speeds so they never march in lockstep. Each track holds
 * its list twice and travels exactly half its own width, which is why
 * the loop has no visible seam.
 *
 * Hovering a rail stops it. That is the whole reason the notes work —
 * a marquee you cannot read is decoration, one you can stop is an
 * interface.
 */

const tool = [
  "font-display font-semibold uppercase",
  "text-[clamp(26px,4vw,56px)] leading-none tracking-[-0.035em]",
  "text-muted/40 transition-colors duration-300",
  "hover:text-text",
].join(" ");

const dot = "select-none text-line-hi/60";

const chip = [
  "label rounded-full border border-line px-[13px] py-[7px]",
  "transition-colors duration-500 hover:border-line-hi hover:text-text",
].join(" ");

export default function Stack() {
  const [note, setNote] = useState<string | null>(null);

  return (
    <section id="stack" className="overflow-hidden py-28 lg:py-36">
      <div className="px-(--gut)">
        <SectionHead
          index="01"
          label="Stack"
          title={
            <>
              What I <span className="ice">Build</span> With
            </>
          }
          lede="No proficiency bars. Hover a row to stop it, then hover anything to see what it is for."
        />
      </div>

      <div className="mt-16 border-t border-line/70">
        {STACK.map((group, i) => {
          const back = i % 2 === 1;
          const dur = 34 + i * 7;

          // the list is rendered twice; the second pass is scenery
          const run: Tool[] = [...group.items, ...group.items];

          return (
            <div key={group.label} className="border-b border-line/70 py-7">
              <div className="label mb-4 flex items-center gap-3 px-(--gut)">
                {group.label}
                <span className="text-line-hi">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="rail">
                <div
                  className="rail-track"
                  data-dir={back ? "back" : "fwd"}
                  style={{ "--dur": `${dur}s` } as React.CSSProperties}
                >
                  {run.map((item, k) => (
                    <span
                      key={`${item.name}-${k}`}
                      className="flex items-baseline gap-10"
                      onMouseEnter={() =>
                        setNote(`${item.name} — ${item.note}`)
                      }
                      onMouseLeave={() => setNote(null)}
                    >
                      <span className={tool}>{item.name}</span>
                      <span className={dot} aria-hidden>
                        &#9679;
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-(--gut)">
        {/* one fixed slot for the note, so nothing reflows on hover */}
        <div className="mt-8 flex h-5 items-center">
          <span
            className={[
              "label transition-opacity duration-300",
              note ? "text-text opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {note ?? "\u00A0"}
          </span>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="label mr-2 text-ice">Currently learning</span>
            {EXPLORING.map((item) => (
              <span key={item} className={chip}>
                {item}
              </span>
            ))}
            <span className="label ml-auto max-sm:ml-0">
              {TOOL_COUNT} tools in rotation
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}