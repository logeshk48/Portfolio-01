"use client";

import { useEffect, useState } from "react";

/**
 * The clock ticking in his timezone.
 *
 * A static "IST (UTC+5:30)" is a fact; a running clock is a person.
 * It tells a recruiter in another timezone whether it is a reasonable
 * hour to expect a reply, which is the only useful thing a timezone
 * line can do.
 *
 * Rendered empty on the server and filled after mount — the server
 * has no idea what time it is where the reader is, and a mismatch
 * between the two would be a hydration error.
 */
export default function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => setNow(fmt.format(new Date()));
    tick();

    const id = setInterval(tick, 1000 * 20);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="label flex items-center gap-2 text-text">
      <span className="dot size-[4px] rounded-full bg-ice" />
      <span className="tabular-nums">{now ?? "--:--"}</span>
      <span className="text-muted">local</span>
    </span>
  );
}