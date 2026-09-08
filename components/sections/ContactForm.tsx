"use client";

import { useState } from "react";
import Link from "next/link";
import { EMAIL, INTENTS } from "@/lib/contact";

/**
 * Web3Forms. No server route, no database — the form posts straight to
 * their endpoint and they forward it to the inbox.
 *
 * Three things make it survivable. The key is read at render, so a
 * missing one degrades to a mailto link rather than a form that fails
 * silently. A honeypot field no human can see catches most bots
 * without a captcha. And the button carries its own state, so nobody
 * double-submits while waiting.
 *
 * On success the whole form is replaced rather than annotated. A
 * one-line "sent" under a still-full form leaves people wondering
 * whether it worked; a takeover does not.
 */

type State = "idle" | "sending" | "sent" | "error";

const label = "field-label mb-2 block";

const field = [
  "field w-full rounded-[10px] border border-line bg-white/[0.02]",
  "px-4 py-[13px] text-[15px] font-light text-text",
  "transition-[border-color,box-shadow,background-color] duration-500",
  "placeholder:text-muted/55 focus:outline-none",
].join(" ");

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FIELDS = 4;

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [filled, setFilled] = useState(0);

  // no key configured — send them to email rather than a broken form
  if (!KEY) {
    return (
      <div className="rounded-[16px] border border-line/70 p-8">
        <p className="text-[15px] font-light leading-[1.7] text-muted">
          The form is not wired up yet. Email works fine in the meantime.
        </p>
        <Link
          href={`mailto:${EMAIL}`}
          className="pill-btn pill-solid label-lg mt-6 border border-line text-text"
        >
          <span>Email me</span>
          <span className="arw" aria-hidden>
            &#8599;
          </span>
        </Link>
      </div>
    );
  }

  /* count what is filled, without controlling a single input */
  const measure = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    const done = ["name", "email", "intent", "message"].filter((k) =>
      String(data.get(k) ?? "").trim()
    ).length;
    setFilled(done);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", KEY);
    data.append("subject", "New message from your portfolio");

    setState("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setState("sent");
        form.reset();
        setFilled(0);
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  /* ── the takeover ──────────────────────────── */
  if (state === "sent") {
    return (
      <div className="sent-panel rounded-[16px] border border-ice/25 p-10 text-center">
        <svg
          viewBox="0 0 52 52"
          width="58"
          height="58"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-ice"
          aria-hidden
        >
          <circle className="sent-ring" cx="26" cy="26" r="24" pathLength={1} />
          <path className="sent-tick" d="m15 27 8 8 15-16" pathLength={1} />
        </svg>

        <h3 className="mt-7 font-display text-[26px] font-semibold uppercase tracking-[0.02em] text-text">
          Message sent
        </h3>

        <p className="mx-auto mt-4 max-w-[34ch] text-[15px] font-light leading-[1.75] text-muted">
          It landed in my inbox. I read everything and reply to what I
          can — usually within a few days.
        </p>

        <button
          type="button"
          onClick={() => setState("idle")}
          className="label-lg mt-8 rounded-full border border-line px-[20px] py-[11px] text-muted transition-colors duration-500 hover:border-line-hi hover:text-text"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} onInput={measure}>
      {/* how far through the form you are — the only progress bar on
          the site that measures something real */}
      <div className="mb-8 flex items-center gap-4">
        <span className="label whitespace-nowrap">
          {filled} / {FIELDS}
        </span>
        <div className="relative h-px flex-1 bg-line">
          <span
            className="absolute inset-y-0 left-0 bg-ice transition-[width] duration-700 ease-out"
            style={{ width: `${(filled / FIELDS) * 100}%` }}
          />
        </div>
      </div>

      {/* honeypot — hidden from people, irresistible to bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <div className="field-group">
          <label htmlFor="name" className={label}>
            Name <span className="text-ice">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>

        <div className="field-group">
          <label htmlFor="email" className={label}>
            Email <span className="text-ice">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </div>
      </div>

      <div className="field-group mt-5">
        <label htmlFor="intent" className={label}>
          What is this about <span className="text-ice">*</span>
        </label>
        <select
          id="intent"
          name="intent"
          required
          defaultValue=""
          className={`${field} appearance-none`}
        >
          <option value="" disabled>
            Pick one
          </option>
          {INTENTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group mt-5">
        <label htmlFor="message" className={label}>
          Tell me about it <span className="text-ice">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What are you trying to build, and what is in the way right now?"
          className={`${field} resize-none`}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state === "sending"}
          className="pill-btn pill-solid label-lg border border-line px-[30px] py-[16px] text-text disabled:opacity-50"
        >
          <span>{state === "sending" ? "Sending" : "Send message"}</span>
          <span className="arw" aria-hidden>
            &#8594;
          </span>
        </button>

        <p
          aria-live="polite"
          className={[
            "label transition-opacity duration-500",
            state === "error" ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {state === "error" ? "Something broke. Email me instead." : "\u00A0"}
        </p>
      </div>

      <p className="label mt-7 normal-case leading-[1.7] tracking-[0.05em] opacity-60">
        I read everything and reply to what I can. Your details are never
        shared or added to any list.
      </p>
    </form>
  );
}