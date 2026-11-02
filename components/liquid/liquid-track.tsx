"use client";

import React from "react";
import Link from "next/link";

export type TrackItem = {
  key: string;
  label: React.ReactNode;
  ariaLabel?: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
  onEnter?: () => void;
};

type Variant = "tabs" | "lang" | "cats" | "theme";

// Spring constants: slightly under-damped for the liquid settle.
const SPRING = { pos: [300, 26], scale: [520, 20] } as const;
const RADIUS: Record<Variant, number> = { tabs: 12, lang: 10, cats: 12, theme: 10 };

type Lens = {
  x: number; y: number; w: number; h: number; s: number;
  vx: number; vy: number; vw: number; vh: number; vs: number;
  tx: number; ty: number; tw: number; th: number; ts: number;
  init: boolean; hover: boolean;
};

const AXES = [
  ["x", "vx", "tx"],
  ["y", "vy", "ty"],
  ["w", "vw", "tw"],
  ["h", "vh", "th"],
  ["s", "vs", "ts"],
] as const;

export default function LiquidTrack({
  variant,
  items,
  label,
  as: Tag = "div",
}: {
  variant: Variant;
  items: TrackItem[];
  label: string;
  as?: "div" | "nav" | "aside";
}) {
  const boxRef = React.useRef<HTMLElement | null>(null);
  const lensRef = React.useRef<HTMLDivElement | null>(null);
  const raf = React.useRef<number | null>(null);
  const L = React.useRef<Lens>({
    x: 0, y: 0, w: 0, h: 0, s: 1, vx: 0, vy: 0, vw: 0, vh: 0, vs: 0,
    tx: 0, ty: 0, tw: 0, th: 0, ts: 1, init: false, hover: false,
  });
  const [hovered, setHovered] = React.useState<string | null>(null);

  const paint = React.useCallback(() => {
    const l = L.current;
    const el = lensRef.current;
    if (!el) return;
    // velocity-driven stretch along the direction of travel, squash across it
    const sp = Math.min(Math.hypot(l.vx, l.vy) / 2200, 0.22);
    const horiz = Math.abs(l.vx) >= Math.abs(l.vy);
    const sx = l.s * (horiz ? 1 + sp : 1 - sp * 0.45);
    const sy = l.s * (horiz ? 1 - sp * 0.45 : 1 + sp);
    el.style.width = l.w + "px";
    el.style.height = l.h + "px";
    el.style.transform = `translate3d(${l.x}px,${l.y}px,0) scale(${sx},${sy})`;
    el.style.opacity = "1";
  }, []);

  const kick = React.useCallback(() => {
    if (raf.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const l = L.current as unknown as Record<string, number>;
      let moving = false;
      for (const [p, v, t] of AXES) {
        const [k, c] = p === "s" ? SPRING.scale : SPRING.pos;
        l[v] += (k * (l[t] - l[p]) - c * l[v]) * dt;
        l[p] += l[v] * dt;
        if (Math.abs(l[t] - l[p]) > 0.02 || Math.abs(l[v]) > 0.3) moving = true;
      }
      paint();
      raf.current = moving ? requestAnimationFrame(tick) : null;
    };
    raf.current = requestAnimationFrame(tick);
  }, [paint]);

  const moveTo = React.useCallback(
    (item: Element | null, jump = false) => {
      const box = boxRef.current;
      if (!box || !item) return;
      const l = L.current;
      const b = box.getBoundingClientRect();
      const r = item.getBoundingClientRect();
      l.tx = r.left - b.left + box.scrollLeft;
      l.ty = r.top - b.top + box.scrollTop;
      l.tw = r.width;
      l.th = r.height;
      if (jump || !l.init) {
        Object.assign(l, { x: l.tx, y: l.ty, w: l.tw, h: l.th, vx: 0, vy: 0, vw: 0, vh: 0, init: true });
        paint();
      }
      kick();
    },
    [kick, paint]
  );

  const toActive = React.useCallback(
    (jump = false) => moveTo(boxRef.current?.querySelector('[data-active="1"]') ?? null, jump),
    [moveTo]
  );

  React.useEffect(() => {
    if (!L.current.hover) toActive();
  });

  React.useEffect(() => {
    const onResize = () => toActive(true);
    requestAnimationFrame(() => toActive(true));
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [toActive]);

  const press = (on: boolean) => {
    L.current.ts = on ? 1.07 : 1;
    kick();
  };

  const leave = () => {
    L.current.hover = false;
    L.current.ts = 1;
    setHovered(null);
    toActive();
  };

  const radius = RADIUS[variant];

  return (
    <Tag
      ref={boxRef as React.Ref<never>}
      aria-label={label}
      className={`lg-track lg-track-${variant}`}
      onMouseLeave={leave}
      onPointerDown={() => press(true)}
      onPointerUp={() => press(false)}
    >
      <div ref={lensRef} className="lg-lens" style={{ borderRadius: radius }}>
        {(variant === "tabs" || variant === "cats") && (
          <>
            <div className="lg-lens-rim" />
            <div className="lg-lens-sheen" style={variant === "cats" ? { left: "6%", right: "6%" } : undefined} />
          </>
        )}
      </div>
      {items.map((it) => {
        const props = {
          className: "lg-track-item",
          "data-active": it.active ? "1" : "0",
          "data-on": it.active || hovered === it.key ? "1" : "0",
          "aria-current": it.active ? ("page" as const) : undefined,
          "aria-label": it.ariaLabel,
          title: it.ariaLabel,
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            L.current.hover = true;
            setHovered(it.key);
            moveTo(e.currentTarget);
            it.onEnter?.();
          },
          onClick: it.onClick,
        };
        return it.href ? (
          <Link key={it.key} href={it.href} {...props} style={{ opacity: 1 }}>
            {it.label}
          </Link>
        ) : (
          <button key={it.key} type="button" {...props}>
            {it.label}
          </button>
        );
      })}
    </Tag>
  );
}
