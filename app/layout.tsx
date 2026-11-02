import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spinpah.com"),
  title: {
    template: "%s / Boudjelida Aimen Mohamed Said",
    default: "Boudjelida Aimen Mohamed Said / @spinpah",
  },
  description:
    "Software Engineer based in Pisa, Italy, specializing in building modern, scalable, and secure applications. Full-stack web and mobile development, studying AI and Data Engineering at the University of Pisa.",
  openGraph: {
    title: "Boudjelida Aimen Mohamed Said",
    description:
      "Software Engineer based in Pisa, Italy, specializing in building modern, scalable, and secure applications.",
    images: "/og-2.png",
    url: "https://spinpah.com",
  },
  alternates: {
    canonical: "https://spinpah.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(outfit.variable, outfit.className)}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
