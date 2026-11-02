"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "./icons";
import { usePrefs } from "./prefs";

// Size of the centre box as a share of the screen, and how many pictures to
// draw on each side of the current one.
const BOX_W = 0.92;
const BOX_H = 0.88;
const SPAN = 2;
// The box is 92vw wide; every copy of a photo uses this so they share one download.
const PHOTO_SIZES = "92vw";

const mod = (n: number, m: number) => ((n % m) + m) % m;

// The viewer stands in a room: the current picture fills the box in front of
// them, the previous one is on the ceiling and the next one on the floor. The
// room stays still; scrolling slides the pictures through it like film.
function Reel({ pictures, onClose }: { pictures: string[]; onClose: () => void }) {
  const { t } = usePrefs();
  const [pos, setPos] = React.useState(0);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const raf = React.useRef<number | null>(null);
  const settle = React.useRef<number | null>(null);
  const [view, setView] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const measure = () => setView({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const animate = React.useCallback(() => {
    if (raf.current) return;
    const tick = () => {
      const d = target.current - current.current;
      current.current = Math.abs(d) < 0.0005 ? target.current : current.current + d * 0.12;
      setPos(current.current);
      raf.current = current.current === target.current ? null : requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  // Free scrolling, then snap to the nearest frame once input stops.
  const nudge = React.useCallback(
    (delta: number, snapNow = false) => {
      target.current += delta;
      if (settle.current) window.clearTimeout(settle.current);
      if (snapNow) target.current = Math.round(target.current);
      else settle.current = window.setTimeout(() => {
        target.current = Math.round(target.current);
        animate();
      }, 140);
      animate();
    },
    [animate]
  );

  React.useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      nudge(Math.max(-0.6, Math.min(0.6, e.deltaY / 500)));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") nudge(1, true);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") nudge(-1, true);
    };
    let lastY: number | null = null;
    const onTouchStart = (e: TouchEvent) => (lastY = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (lastY === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      nudge((lastY - y) / (window.innerHeight * 0.5));
      lastY = y;
    };
    const onTouchEnd = () => (lastY = null);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.overflow = overflow;
      if (raf.current) cancelAnimationFrame(raf.current);
      if (settle.current) window.clearTimeout(settle.current);
    };
  }, [nudge, onClose]);

  const n = pictures.length;
  const base = Math.round(pos);
  const now = mod(base, n);
  const { w: vw, h: vh } = view;

  // The room: a fixed centre box, with a ceiling and a floor folded towards the
  // viewer from its top and bottom edges so they run out to the screen corners.
  const boxW = Math.round(vw * BOX_W);
  const boxH = Math.round(vh * BOX_H);
  const persp = vh * 1.6;
  // how far the ceiling/floor reach towards the viewer to fill the screen edge (plus a margin)
  const depth = Math.min(persp * 0.9, persp * (1 - boxH / vh) * 1.2);
  const left = (vw - boxW) / 2;
  const top = (vh - boxH) / 2;

  // One strip of pictures runs floor -> box -> ceiling. `s` is the distance
  // along the strip from the box's top edge; each picture is one box tall.
  const strip = (offset: number, sharp: boolean) =>
    Array.from({ length: SPAN * 2 + 1 }, (_, k) => base - SPAN + k).map((j) => (
      <div key={j} className="lg-reel-cell" style={{ top: offset + (j - pos) * boxH, height: boxH }}>
        {/* same `sizes` on every face, so each photo is fetched once and shared */}
        <Image
          src={pictures[mod(j, n)]}
          alt=""
          fill
          sizes={PHOTO_SIZES}
          priority={sharp && Math.abs(j - base) <= 1}
          style={{ objectFit: "cover" }}
        />
      </div>
    ));

  return (
    <div className="lg-reel" data-theme="dark" role="dialog" aria-modal="true" aria-label={t.gallery}>
      {/* the side walls: the current photo, blurred. Only the current one and
          its neighbours are mounted, as tiny low-quality copies. */}
      {[-1, 0, 1].map((k) => {
        const i = mod(base + k, n);
        return (
          <div key={i} className="lg-reel-ambient" style={{ opacity: k === 0 ? 1 : 0 }}>
            <Image src={pictures[i]} alt="" fill sizes="64px" quality={40} style={{ objectFit: "cover" }} />
          </div>
        );
      })}

      {vw > 0 && (
        <div className="lg-reel-stage" style={{ perspective: persp }}>
          {/* ceiling: previous pictures leave the box through here */}
          <div
            className="lg-reel-face lg-reel-side"
            style={{ left, top: top - depth, width: boxW, height: depth, transformOrigin: "50% 100%", transform: "rotateX(-90deg)" }}
          >
            {strip(depth, false)}
          </div>
          <div className="lg-reel-face lg-reel-box" style={{ left, top, width: boxW, height: boxH }}>
            {strip(0, true)}
          </div>
          {/* floor: the next pictures come up from here */}
          <div
            className="lg-reel-face lg-reel-side"
            style={{ left, top: top + boxH, width: boxW, height: depth, transformOrigin: "50% 0", transform: "rotateX(90deg)" }}
          >
            {strip(-boxH, false)}
          </div>
        </div>
      )}

      <button type="button" onClick={onClose} aria-label={t.back} className="lg-glass lg-round lg-reel-btn">
        <ArrowLeft />
      </button>
      <div className="lg-reel-count">
        {String(now + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </div>
      <div className="lg-reel-hint">{t.galleryHint}</div>
    </div>
  );
}

export default function GalleryView({ pictures }: { pictures: string[] }) {
  const { t } = usePrefs();
  const [open, setOpen] = React.useState(false);

  // "Click anywhere to enter": any click that isn't on a link or button.
  React.useEffect(() => {
    if (open) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Enter" && setOpen(true);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = React.useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="lg-enter">
        <div className="lg-enter-word">{t.enter}</div>
        <div className="lg-enter-sub">
          {t.gallery} · {pictures.length} {t.photos}
        </div>
      </div>
      {/* warm the cache while the Enter screen is up: the photos the reel shows first */}
      {!open && pictures.length > 0 && (
        <div aria-hidden className="lg-preload">
          {[0, 1, 2, -1, -2].map((k) => {
            const src = pictures[mod(k, pictures.length)];
            return (
              <React.Fragment key={k}>
                <Image src={src} alt="" fill sizes={PHOTO_SIZES} priority />
                {k === 0 && <Image src={src} alt="" fill sizes="64px" quality={40} priority />}
              </React.Fragment>
            );
          })}
        </div>
      )}
      {open && pictures.length > 0 && <Reel pictures={pictures} onClose={close} />}
    </>
  );
}
