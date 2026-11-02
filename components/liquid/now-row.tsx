"use client";

import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { ArrowUpRight } from "./icons";
import { usePrefs } from "./prefs";

export default function NowRow({
  kind,
  title,
  subtitle,
  image,
  href,
}: {
  kind: keyof Pick<Dict, "listening" | "watching" | "playing">;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}) {
  const { t } = usePrefs();
  return (
    <a href={href} target="_blank" rel="noreferrer" className="lg-now">
      <div className="lg-now-art">
        <Image src={image} alt={title} fill sizes="48px" style={{ objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ fontSize: 11, color: "var(--soft)" }}>{t[kind]}</div>
        <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: "var(--mute)" }}>{subtitle}</div>
      </div>
      <span style={{ color: "var(--mute)", paddingRight: 6 }}>
        <ArrowUpRight />
      </span>
    </a>
  );
}
