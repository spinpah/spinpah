"use client";

import React from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoRail({ photos }: { photos: Photo[] }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 282, behavior: "smooth" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, gap: 16 }}>
        <h2 style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
          Photos
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              title={dir < 0 ? "Previous" : "Next"}
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                border: "1.5px solid var(--border2)",
                background: "transparent",
                color: "var(--ink)",
                cursor: "pointer",
                fontSize: 18,
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              {dir < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 8,
          scrollbarWidth: "none",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              scrollSnapAlign: "start",
              position: "relative",
              width: 250,
              height: 330,
              borderRadius: 10,
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="250px" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
