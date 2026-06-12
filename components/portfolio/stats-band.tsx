"use client";

import React from "react";

type Stat = { target: number; decimals: number; suffix: string; label: string };

const STATS: Stat[] = [
  { target: 6, decimals: 0, suffix: "+", label: "YEARS OF EXPERIENCE" },
  { target: 48, decimals: 0, suffix: "", label: "PROJECTS SHIPPED" },
  { target: 30, decimals: 0, suffix: "+", label: "CLIENTS WORLDWIDE" },
  { target: 99.9, decimals: 1, suffix: "%", label: "UPTIME MAINTAINED" },
];

export default function StatsBand() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [values, setValues] = React.useState<number[]>(STATS.map((s) => s.target));
  const counted = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep final values

    setValues(STATS.map(() => 0));

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !counted.current) {
          counted.current = true;
          io.disconnect();
          runCount();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    const runCount = () => {
      const dur = 1500;
      const t0 = performance.now();
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = ease(p);
        setValues(STATS.map((s) => s.target * e));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pf-reveal pf-grid-4" style={{ marginTop: 20 }}>
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className="pf-lift"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "28px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {values[i].toFixed(s.decimals)}
            {s.suffix}
          </div>
          <div
            className="pf-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--soft)",
              marginTop: 6,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
