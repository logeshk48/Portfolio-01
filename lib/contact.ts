/**
 * Contact.
 *
 * The intake select is the one thing here worth explaining. Asking
 * "what is this about" costs the sender nothing and tells you how to
 * reply — a recruiter and a collaborator need very different answers.
 *
 * What is deliberately absent: budget and timeline. Those are lead
 * qualification questions, and asking them implies freelance
 * availability that does not exist alongside a full-time job.
 *
 * Links without a url are skipped rather than rendered disabled. A
 * greyed-out placeholder looks unfinished; an absent one looks like a
 * decision.
 */

export const EMAIL = "logeshlogesh093@gmail.com";
export const LOCATION = "Tamil Nadu, India";
export const TIMEZONE = "IST (UTC+5:30)";

export const INTENTS: string[] = [
  "Job opportunity",
  "Project via Let's Cook",
  "Collaboration",
  "Something else",
];

export interface Social {
  label: string;
  handle: string;
  url: string;
  icon: string;
}

export const SOCIALS: Social[] = [
  {
    label: "GitHub",
    handle: "logeshk48",
    url: "https://github.com/logeshk48",
    icon: "M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2.2Z",
  },
  {
    label: "LinkedIn",
    handle: "logeshk48",
    url: "https://www.linkedin.com/in/logeshk48/",
    icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm7 0h3.8v1.5h.06a4.2 4.2 0 0 1 3.77-2c4.03 0 4.77 2.65 4.77 6.1v5.4h-4v-4.8c0-1.14-.02-2.62-1.6-2.62-1.6 0-1.85 1.25-1.85 2.54v4.88h-3.95v-11Z",
  },
  {
    label: "Stack Overflow",
    handle: "logesh-k",
    url: "https://stackoverflow.com/users/32657847/logesh-k",
    icon: "M17.4 21.5v-6.1h2V23.5H4.6v-8.1h2v6.1h10.8ZM8.4 14.6l8.1 1.7.4-1.9-8.1-1.7-.4 1.9Zm1.1-4.3 7.5 3.5.8-1.8-7.5-3.5-.8 1.8Zm2.1-4 6.4 5.3 1.3-1.5-6.4-5.3-1.3 1.5Zm4.1-3.9-1.6 1.2 4.9 6.7 1.6-1.2-4.9-6.7ZM8.2 19.5h8.2v-2H8.2v2Z",
  },
  {
    label: "Reddit",
    handle: "BullfrogUnhappy6540",
    url: "https://www.reddit.com/user/BullfrogUnhappy6540/",
    icon: "M22 12a2.1 2.1 0 0 0-3.55-1.5 10.3 10.3 0 0 0-5.6-1.78l.95-4.48 3.11.66a1.5 1.5 0 1 0 .17-1L13.5 3.1a.5.5 0 0 0-.6.39l-1.06 5.23a10.3 10.3 0 0 0-5.67 1.78 2.1 2.1 0 1 0-2.31 3.43 4.1 4.1 0 0 0-.05.63c0 3.2 3.72 5.8 8.3 5.8s8.3-2.6 8.3-5.8a4 4 0 0 0-.05-.62A2.1 2.1 0 0 0 22 12ZM7.3 13.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm8.35 4.1a5.4 5.4 0 0 1-3.63 1.13 5.4 5.4 0 0 1-3.64-1.13.5.5 0 0 1 .68-.73 4.5 4.5 0 0 0 2.96.86 4.5 4.5 0 0 0 2.95-.86.5.5 0 1 1 .68.73Zm-.9-2.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z",
  },
  {
    label: "Instagram",
    handle: "",
    url: "",
    icon: "M12 7.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 1.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm5.7-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM8.2 3h7.6A5.2 5.2 0 0 1 21 8.2v7.6a5.2 5.2 0 0 1-5.2 5.2H8.2A5.2 5.2 0 0 1 3 15.8V8.2A5.2 5.2 0 0 1 8.2 3Zm0 1.9a3.3 3.3 0 0 0-3.3 3.3v7.6a3.3 3.3 0 0 0 3.3 3.3h7.6a3.3 3.3 0 0 0 3.3-3.3V8.2a3.3 3.3 0 0 0-3.3-3.3H8.2Z",
  },
];

/** only the ones with a url — an absent link beats a dead one */
export const LIVE_SOCIALS = SOCIALS.filter((s) => s.url !== "");