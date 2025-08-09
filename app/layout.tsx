import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const monument = localFont({
  src: [
    {
      path: "../public/font/ABCMonumentGrotesk-Medium-Trial.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/font/ABCMonumentGrotesk-Regular-Trial.otf",
      weight: "400",
      style: "regular",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: "%s / Boudjelida Aimen Mohamed Said",
    default: "Boudjelida Aimen Mohamed Said / @spinpah",
  },
  description: "As a Master's student specializing in Computer Systems Security at Université Houari Boumediene, I am deeply interested in ethical hacking, endpoint security, and network defense. My academic projects and coursework have equipped me with a strong foundation in cybersecurity concepts and practical skills, including vulnerability assessment, cryptographic mechanisms, and firewall technologies. I am eager to contribute to innovative solutions for digital security challenges",
  openGraph: {
    title: "Boudjelida Aimen Mohamed Said",
    description: "As a Master's student specializing in Computer Systems Security at Université Houari Boumediene, I am deeply interested in ethical hacking, endpoint security, and network defense. My academic projects and coursework have equipped me with a strong foundation in cybersecurity concepts and practical skills, including vulnerability assessment, cryptographic mechanisms, and firewall technologies. I am eager to contribute to innovative solutions for digital security challenges",
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
      <body className={cn(monument.className)}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
