import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Archivo, Anton, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import InvertedCursor from "@/components/inverted-cursor";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spinpah.com"),
  title: {
    template: "%s / Boudjelida Aimen Mohamed Said",
    default: "Boudjelida Aimen Mohamed Said / @spinpah",
  },
  description:
    "Software Engineer based in Algeria, specializing in building modern, scalable, and secure applications. Full-stack web and mobile development with a focus on clean architecture.",
  openGraph: {
    title: "Boudjelida Aimen Mohamed Said",
    description:
      "Software Engineer based in Algeria, specializing in building modern, scalable, and secure applications.",
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
        className={cn(
          archivo.variable,
          anton.variable,
          jetbrainsMono.variable,
          archivo.className
        )}
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
        <InvertedCursor />
      </body>
    </html>
  );
}
