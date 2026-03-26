import type { Viewport } from "next";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const Nav = () => (
  <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4">
    <nav className="nav-pill flex items-center rounded-full px-3 py-2 shadow-sm gap-x-1 min-w-[560px] justify-between">
      {/* Logo */}
      <Link
        href="/"
        className="text-sm font-bold px-3 py-1.5 rounded-full transition-opacity duration-150 hover:opacity-70 whitespace-nowrap"
        style={{ color: "var(--ds-text)" }}
      >
        Spinpah
      </Link>

      {/* Divider */}
      <span className="w-px h-4" style={{ background: "var(--ds-border)" }} />

      {/* Nav links */}
      <div className="flex items-center gap-x-1">
        {[
          { href: "/", label: "Work" },
          { href: "/about", label: "About" },
          { href: "/visitors", label: "Visitors" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium px-3 py-1.5 rounded-full transition-opacity duration-150 hover:opacity-60 whitespace-nowrap"
            style={{ color: "var(--ds-text-muted)" }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <span className="w-px h-4" style={{ background: "var(--ds-border)" }} />

      {/* Right side: CTA + theme toggle */}
      <div className="flex items-center gap-x-2">
        <a
          href="mailto:aymene16boudjelida@gmail.com"
          className="btn-primary whitespace-nowrap"
          style={{ fontSize: "0.78rem", padding: "0.45rem 1.1rem" }}
        >
          Start a Project
        </a>
        <ThemeSwitcher />
      </div>
    </nav>
  </header>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg min-h-screen">
    <Nav />
    <main className="pt-24 pb-0 px-5 md:px-10 max-w-5xl mx-auto">
      {children}
    </main>
  </div>
);

export default Layout;
