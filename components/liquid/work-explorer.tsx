"use client";

import React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { CATS, catOf, localize, projects, projectsByCat, yearOf, type Cat } from "@/lib/work";
import LiquidTrack from "./liquid-track";
import ProjectMedia from "./project-media";
import { ArrowLeft, ArrowUpRight, ChevronDown, ChevronUp } from "./icons";
import { usePrefs } from "./prefs";

const ROTATE_MS = 4500;

export default function WorkExplorer() {
  const { t, lang } = usePrefs();
  const [cat, setCat] = React.useState<Cat>(CATS[0]);
  const [idx, setIdx] = React.useState(0);
  const [view, setView] = React.useState<"home" | "cat">("home");

  const list = projectsByCat(cat).map((p) => localize(p, lang));
  const cur = list[idx] ?? list[0];

  const step = React.useCallback(
    (d: number) => setIdx((i) => (i + d + list.length) % list.length),
    [list.length]
  );

  // Auto-advance the laptop screen; the timer restarts on every change, so a
  // manual step gets a full interval before the next automatic one.
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (view !== "home" || paused || list.length < 2) return;
    const id = window.setTimeout(() => step(1), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [view, paused, idx, cat, list.length, step]);

  // On the full-screen home page the project name sits in the footer band,
  // horizontally centred under the laptop.
  const deviceRef = React.useRef<HTMLDivElement | null>(null);
  const [footSlot, setFootSlot] = React.useState<HTMLElement | null>(null);
  const [footX, setFootX] = React.useState<number | null>(null);
  React.useEffect(() => setFootSlot(document.getElementById("lg-foot-caption")), []);
  React.useLayoutEffect(() => {
    const el = deviceRef.current;
    if (view !== "home" || !el || !footSlot) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setFootX(r.left + r.width / 2 - footSlot.getBoundingClientRect().left);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [view, footSlot]);

  React.useEffect(() => {
    if (view !== "home") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") step(1);
      if (e.key === "ArrowUp") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, step]);

  const meta = (p: (typeof projects)[number]) =>
    [t[catOf(p)], yearOf(p) || p.status].filter(Boolean).join(" · ");

  const countLabel = `${list.length} ${list.length === 1 ? t.project : t.projects}`;

  return (
    <div className="lg-work">
      <div className="lg-cats">
        <LiquidTrack
          as="aside"
          variant="cats"
          label="Categories"
          items={CATS.map((k) => ({
            key: k,
            label: t[k],
            active: cat === k,
            onEnter:
              view === "home"
                ? () => {
                    setCat(k);
                    setIdx(0);
                  }
                : undefined,
            onClick: () => {
              setCat(k);
              setIdx(0);
              setView("cat");
            },
          }))}
        />
      </div>

      {view === "home" && cur && (
        <section style={{ minWidth: 0 }}>
          <div className="lg-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="lg-device" ref={deviceRef}>
            <div className="lg-laptop">
              <div className="lg-screen">
                {projects.map((raw) => {
                  const p = localize(raw, lang);
                  const on = p.id === cur.id;
                  return (
                    <div
                      key={p.id}
                      className="lg-screen-layer"
                      aria-hidden={!on}
                      style={{
                        opacity: on ? 1 : 0,
                        filter: `blur(${on ? 0 : 6}px)`,
                        transform: `scale(${on ? 1 : 1.025})`,
                        pointerEvents: on ? "auto" : "none",
                        zIndex: on ? 1 : 0,
                      }}
                    >
                      <Link href={`/projects/${p.id}`} tabIndex={on ? 0 : -1} style={{ position: "absolute", inset: 0, opacity: 1 }}>
                        <ProjectMedia project={p} sizes="(max-width: 900px) 80vw, 480px" priority={on} video={on ? "playing" : "paused"} kicker={t[catOf(p)]} />
                      </Link>
                    </div>
                  );
                })}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/laptop-frame.png"
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  filter: "drop-shadow(0 26px 34px var(--glass-sh))",
                }}
              />
            </div>
            <Link href={`/projects/${cur.id}`} className="lg-caption">
              {cur.name}
            </Link>
            {footSlot &&
              footX !== null &&
              createPortal(
                <Link href={`/projects/${cur.id}`} className="lg-foot-caption-link" style={{ left: footX }}>
                  {cur.name}
                </Link>,
                footSlot
              )}
            </div>
            <div className="lg-stepper">
              <button type="button" onClick={() => step(-1)} aria-label="Previous project" className="lg-glass lg-round" style={{ width: 42, height: 42 }}>
                <ChevronUp />
              </button>
              <div style={{ fontSize: 11, color: "var(--soft)", fontVariantNumeric: "tabular-nums" }}>
                {idx + 1}/{list.length}
              </div>
              <button type="button" onClick={() => step(1)} aria-label="Next project" className="lg-glass lg-round" style={{ width: 42, height: 42 }}>
                <ChevronDown />
              </button>
            </div>
          </div>
        </section>
      )}

      {view === "cat" && (
        <section className="lg-cat-view">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button type="button" onClick={() => setView("home")} aria-label={t.back} className="lg-glass lg-round" style={{ width: 40, height: 40 }}>
              <ArrowLeft />
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-.01em" }}>{t[cat]}</div>
              <div style={{ fontSize: 13, color: "var(--mute)" }}>{countLabel}</div>
            </div>
          </div>
          {/* One wide card per row; the rows share the available height. */}
          <div className="lg-grid-fill">
            {list.map((p) => (
              <div key={p.id} className="lg-card lg-card-wide">
                <Link href={`/projects/${p.id}`} className="lg-media" style={{ display: "block", borderRadius: 14, opacity: 1 }}>
                  <ProjectMedia project={p} sizes="(max-width: 640px) 100vw, 480px" video="playing" kicker={t[cat]} />
                </Link>
                <div className="lg-card-text">
                  <div style={{ fontSize: 17, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--mute)" }}>{meta(p)}</div>
                  <p className="lg-card-desc">{p.shortDescription}</p>
                  <Link href={`/projects/${p.id}`} className="lg-glass lg-pill" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                    {t.open}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
