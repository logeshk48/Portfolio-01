import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://logesh.dev"),
  title: {
    default: "Logesh | Software Developer, AI Builder",
    template: "%s · Logesh",
  },
  description:
    "Logesh is a software developer and AI builder focused on web applications, AI-powered products, automation and LetsCook.",
  openGraph: {
    type: "website",
    title: "Logesh | Software Developer, AI Builder",
    description:
      "Software developer and AI builder. Web applications, AI-powered products, automation, and LetsCook.",
    siteName: "Logesh",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@300,400,500&display=swap"
        />
      </head>
      <body>
        <a
          href="#main"
          className="legend sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[100] focus:border focus:border-trace focus:bg-board focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
