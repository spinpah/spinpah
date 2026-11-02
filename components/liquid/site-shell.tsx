"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content";
import { LANGS } from "@/lib/i18n";
import LiquidTrack from "./liquid-track";
import { usePrefs } from "./prefs";

const TABS = [
  { key: "work", href: "/" },
  { key: "about", href: "/about" },
] as const;

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, lang, setLang, theme, toggleTheme } = usePrefs();
  const tab = pathname.startsWith("/about") ? "about" : "work";

  return (
    // The home page is a single full-screen view; other pages scroll normally.
    <div className={`lg-shell select${pathname === "/" ? " lg-fit" : ""}`}>
      <header className="lg-wrap lg-header">
        <div className="lg-brand">
          <Link href="/" style={{ opacity: 1 }}>
            <span className="lg-brand-name">{profile.name}</span>
          </Link>
          <p className="lg-brand-tag">
            {t.tagline1}
            <br />
            {t.tagline2}
          </p>
        </div>
        <div className="lg-header-tabs">
          <LiquidTrack
            as="nav"
            variant="tabs"
            label="Main"
            items={TABS.map((x) => ({ key: x.key, label: t[x.key], href: x.href, active: tab === x.key }))}
          />
        </div>
        <div className="lg-header-lang">
          <LiquidTrack
            variant="lang"
            label="Language"
            items={LANGS.map((k) => ({
              key: k,
              label: k.toUpperCase(),
              active: lang === k,
              onClick: () => setLang(k),
            }))}
          />
        </div>
      </header>

      <main className="lg-wrap lg-main">{children}</main>

      <footer className="lg-footer">
        {/* the work view portals the current project name in here */}
        {pathname === "/" && <div id="lg-foot-caption" className="lg-foot-caption" />}
        <div className="lg-wrap lg-footer-in">
          <div style={{ fontSize: 12, color: "var(--soft)", flex: 1 }}>
            © {new Date().getFullYear()} {profile.name} · {t.location}
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 14, color: "var(--mute)", flexWrap: "wrap" }}>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
          <LiquidTrack
            variant="theme"
            label="Theme"
            items={[
              { key: "light", label: <SunIcon />, ariaLabel: t.light, active: theme === "light", onClick: () => theme !== "light" && toggleTheme() },
              { key: "dark", label: <MoonIcon />, ariaLabel: t.dark, active: theme === "dark", onClick: () => theme !== "dark" && toggleTheme() },
            ]}
          />
        </div>
      </footer>
    </div>
  );
}
