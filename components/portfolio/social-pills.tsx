"use client";

import React from "react";

type PillDef = {
  key: string;
  label: string;
  bg: string;
  color: string;
  link: string | null;
  rot: number;
};

const PILLS: PillDef[] = [
  { key: "follow", label: "FOLLOW ME!", bg: "#FFD23F", color: "#141414", link: null, rot: -6 },
  { key: "github", label: "GITHUB", bg: "#141414", color: "#F2EFE9", link: "https://github.com/spinpah", rot: 4 },
  { key: "instagram", label: "INSTAGRAM", bg: "#FFFFFF", color: "#141414", link: "https://instagram.com/spinpah", rot: -3 },
  { key: "email", label: "EMAIL", bg: "#FF4D6D", color: "#141414", link: "mailto:aymene16boudjelida@gmail.com", rot: 7 },
  { key: "cv", label: "CV", bg: "#FFFFFF", color: "#141414", link: "https://drive.google.com/file/d/1gh1p-ekzjdjCEayBVRA5BpMiOiEpNMss/view?usp=sharing", rot: -5 },
];

type PillState = {
  key: string;
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  w: number;
  h: number;
  grabbed: boolean;
};

export default function SocialPills() {
  const boxRef = React.useRef<HTMLDivElement | null>(null);
  const pillRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const pillsRef = React.useRef<PillState[]>([]);
  const rafRef = React.useRef<number | null>(null);
  const reduceRef = React.useRef(false);

  React.useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    reduceRef.current =
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    pillsRef.current = PILLS.map((p) => ({
      key: p.key,
      el: pillRefs.current[p.key]!,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: p.rot,
      w: 100,
      h: 44,
      grabbed: false,
    })).filter((p) => p.el);

    const measure = () => {
      for (const p of pillsRef.current) {
        p.w = p.el.offsetWidth || 100;
        p.h = p.el.offsetHeight || 44;
      }
    };

    const restStatic = () => {
      measure();
      const W = box.clientWidth || 500;
      const H = box.clientHeight || 300;
      let cx = 8;
      let row = 0;
      for (const p of pillsRef.current) {
        if (cx + p.w > W - 8) {
          cx = 8;
          row++;
        }
        p.x = cx;
        p.y = H - 6 - p.h - row * (p.h + 4);
        cx += p.w + 6;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`;
      }
    };

    const scatter = () => {
      measure();
      const W = box.clientWidth || 500;
      pillsRef.current.forEach((p, i) => {
        p.x = 16 + Math.random() * Math.max(20, W - p.w - 32);
        p.y = -p.h - 20 - i * 70;
        p.vx = (Math.random() - 0.5) * 80;
        p.vy = 0;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`;
      });
    };

    const startSim = () => {
      if (rafRef.current) return;
      let last = performance.now();
      const G = 1800;
      const REST = 0.25;
      const tick = (now: number) => {
        const dt = Math.min(0.032, (now - last) / 1000);
        last = now;
        const W = box.clientWidth;
        const H = box.clientHeight;
        const pills = pillsRef.current;
        for (const p of pills) {
          if (p.grabbed) continue;
          p.vy += G * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < 6) {
            p.x = 6;
            p.vx = Math.abs(p.vx) * 0.4;
          }
          if (p.x + p.w > W - 6) {
            p.x = W - 6 - p.w;
            p.vx = -Math.abs(p.vx) * 0.4;
          }
          if (p.y + p.h > H - 6) {
            p.y = H - 6 - p.h;
            p.vy = -Math.abs(p.vy) * REST;
            if (Math.abs(p.vy) < 50) p.vy = 0;
            p.vx *= 0.9;
          }
        }
        for (let pass = 0; pass < 4; pass++) {
          for (let i = 0; i < pills.length; i++) {
            for (let j = i + 1; j < pills.length; j++) {
              const a = pills[i];
              const b = pills[j];
              const ox =
                Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
              const oy =
                Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
              if (ox <= 0 || oy <= 0) continue;
              if (ox < oy) {
                const dir = a.x + a.w / 2 < b.x + b.w / 2 ? -1 : 1;
                if (a.grabbed) {
                  b.x -= dir * ox;
                  b.vx = -dir * Math.max(80, Math.abs(b.vx) * 0.5);
                } else if (b.grabbed) {
                  a.x += dir * ox;
                  a.vx = dir * Math.max(80, Math.abs(a.vx) * 0.5);
                } else {
                  a.x += (dir * ox) / 2;
                  b.x -= (dir * ox) / 2;
                  const m = (a.vx + b.vx) / 2;
                  a.vx = m + dir * 30;
                  b.vx = m - dir * 30;
                }
              } else {
                const aUpper = a.y + a.h / 2 < b.y + b.h / 2;
                const upper = aUpper ? a : b;
                const lower = aUpper ? b : a;
                if (lower.grabbed) {
                  upper.y -= oy;
                  if (upper.vy > 0) upper.vy = 0;
                } else if (upper.grabbed) {
                  lower.y += oy;
                  lower.vy = Math.max(lower.vy, 0);
                } else {
                  upper.y -= oy;
                  if (upper.vy > 0) upper.vy = -upper.vy * REST;
                  if (Math.abs(upper.vy) < 50) upper.vy = 0;
                  upper.vx *= 0.98;
                }
              }
            }
          }
          for (const p of pills) {
            if (p.grabbed) continue;
            if (p.x < 6) p.x = 6;
            if (p.x + p.w > W - 6) p.x = W - 6 - p.w;
            if (p.y + p.h > H - 6) p.y = H - 6 - p.h;
          }
        }
        for (const p of pills) {
          const wob = Math.max(-7, Math.min(7, p.vx * 0.015));
          p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${
            p.r + wob
          }deg)`;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    (box as any).__pfScatter = scatter;
    (box as any).__pfStart = startSim;
    (box as any).__pfRest = restStatic;

    if (reduceRef.current) {
      restStatic();
      return;
    }

    scatter();
    const io = new IntersectionObserver(
      (ents) => {
        if (ents.some((e) => e.isIntersecting)) {
          io.disconnect();
          startSim();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(box);

    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const onPointerDown = (key: string) => (e: React.PointerEvent) => {
    const box = boxRef.current;
    const p = pillsRef.current.find((q) => q.key === key);
    if (!p || !box) return;
    e.preventDefault();
    if (!reduceRef.current && !rafRef.current) {
      (box as any).__pfStart?.();
    }
    p.grabbed = true;
    const r0 = box.getBoundingClientRect();
    const offX = e.clientX - r0.left - p.x;
    const offY = e.clientY - r0.top - p.y;
    const startX = e.clientX;
    const startY = e.clientY;
    let moved = false;
    let lastX = e.clientX;
    let lastY = e.clientY;
    let lastT = performance.now();
    let vx = 0;
    let vy = 0;

    const move = (ev: PointerEvent) => {
      if (Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) > 5)
        moved = true;
      const r = box.getBoundingClientRect();
      const now = performance.now();
      const dtm = Math.max(0.008, (now - lastT) / 1000);
      vx = (ev.clientX - lastX) / dtm;
      vy = (ev.clientY - lastY) / dtm;
      lastX = ev.clientX;
      lastY = ev.clientY;
      lastT = now;
      p.x = Math.max(6, Math.min(r.width - 6 - p.w, ev.clientX - r.left - offX));
      p.y = Math.max(6, Math.min(r.height - 6 - p.h, ev.clientY - r.top - offY));
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`;
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      p.grabbed = false;
      if (moved) {
        p.vx = Math.max(-900, Math.min(900, vx));
        p.vy = Math.max(-900, Math.min(900, vy));
      } else {
        const def = PILLS.find((d) => d.key === key);
        if (def?.link) window.open(def.link, "_blank");
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const resetPills = () => {
    const box = boxRef.current as any;
    if (!box) return;
    if (reduceRef.current) {
      box.__pfRest?.();
      return;
    }
    box.__pfScatter?.();
    box.__pfStart?.();
  };

  return (
    <div
      ref={boxRef}
      style={{
        background: "var(--band)",
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        minHeight: 300,
      }}
    >
      {PILLS.map((p) => (
        <span
          key={p.key}
          ref={(el) => {
            pillRefs.current[p.key] = el;
          }}
          onPointerDown={onPointerDown(p.key)}
          title={p.link ? "Drag me , or click to open" : "Drag me!"}
          className="pf-mono"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate(20px, -200px) rotate(${p.rot}deg)`,
            willChange: "transform",
            background: p.bg,
            color: p.color,
            borderRadius: 999,
            padding: "13px 24px",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
            cursor: "grab",
            userSelect: "none",
            touchAction: "none",
            whiteSpace: "nowrap",
          }}
        >
          {p.label}
        </span>
      ))}
      <span
        onClick={resetPills}
        title="Drop them again"
        className="pf-mono"
        style={{
          position: "absolute",
          bottom: 10,
          right: 14,
          fontSize: 9,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.55)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        ↺ DROP AGAIN
      </span>
    </div>
  );
}
