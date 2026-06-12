"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal. Any element with the `pf-reveal` class starts hidden
 * (via CSS) and gets `pf-in` added when it scrolls into view. Re-runs on route
 * change so client-navigated pages animate too. Honors reduced-motion (the CSS
 * neutralizes the hidden state, and we reveal everything immediately here).
 */
export default function RevealScript() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".pf-reveal")
    );
    if (!els.length) return;

    if (reduce) {
      els.forEach((el) => el.classList.add("pf-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const showing = entries.filter((en) => en.isIntersecting);
        showing.forEach((en, i) => {
          const el = en.target as HTMLElement;
          el.style.transitionDelay = i * 90 + "ms";
          el.classList.add("pf-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      // Already in view on load — show immediately, don't hide.
      if (r.top < window.innerHeight * 0.9) {
        el.classList.add("pf-in");
        return;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
