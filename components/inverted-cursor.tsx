"use client";

import React from "react";

export default function InvertedCursor() {
  const cursorRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move as any);
  }, []);

  return <div ref={cursorRef} className="inverted-cursor" aria-hidden />;
}



