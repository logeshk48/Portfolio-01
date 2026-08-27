import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const skipLink = [
  "label sr-only",
  "focus:not-sr-only focus:absolute",
  "focus:left-6 focus:top-4 focus:z-100",
  "focus:border focus:border-line focus:bg-surface",
  "focus:px-3 focus:py-2",
].join(" ");

const fonts = `${GeistSans.variable} ${GeistMono.variable}`;

const clash =
  "https://api.fontshare.com/v2/css" +
  "?f[]=clash-display@600,700&display=swap";

const description =
  "Logesh is a software developer and AI builder focused on web" +
  " applications, AI-powered products, automation and LetsCook.";

const ogDescription =
  "Software developer and AI builder. Web applications," +
  " AI-powered products, automation, and LetsCook.";

export const metadata: Metadata = {
  metadataBase: new URL("https://logesh.dev"),
  title: {
    default: "Logesh | Software Developer, AI Builder",
    template: "%s · Logesh",
  },
  description,
  openGraph: {
    type: "website",
    title: "Logesh | Software Developer, AI Builder",
    description: ogDescription,
    siteName: "Logesh",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a18",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fonts}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href={clash} />
      </head>
      <body>
        <Link href="#main" className={skipLink}>
          Skip to content
        </Link>

        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>

        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}