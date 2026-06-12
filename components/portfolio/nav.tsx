"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
];

export default function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
  };

  const isActive = (href: string) =>
    href === "/projects"
      ? pathname.startsWith("/projects")
      : href === "/about"
      ? pathname.startsWith("/about")
      : false;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 40px",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
          color: "var(--ink)",
        }}
      >
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={42}
          height={42}
          style={{ borderRadius: 10, display: "block" }}
        />
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          Aimen Boudjelida
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="pf-navlink"
            data-active={isActive(href)}
          >
            {label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="pf-mono"
          style={{
            background: "transparent",
            border: "1.5px solid var(--border2)",
            color: "var(--ink)",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            padding: "12px 18px",
            borderRadius: 999,
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          {theme === "light" ? "☾ DARK" : "☀ LIGHT"}
        </button>
        <Link
          href="/#contact"
          className="pf-btn"
          style={{ fontSize: 14, padding: "13px 26px" }}
        >
          Let&apos;s build →
        </Link>
      </div>
    </nav>
  );
}
