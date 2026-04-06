import type { Viewport } from "next";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/visitors", label: "Visitors" },
];

const Nav = () => (
  <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
    <nav className="nav-pill flex items-center rounded-full px-3 py-2 shadow-sm w-full max-w-xl md:max-w-none md:w-auto">
      {/* Logo */}
      <Link
        href="/"
        className="text-sm font-bold px-3 py-1.5 rounded-full transition-opacity duration-150 hover:opacity-70 whitespace-nowrap"
        style={{ color: "var(--ds-text)" }}
      >
        Spinpah
      </Link>

      {/* Desktop only: divider + nav links */}
      <span className="hidden md:block w-px h-4 mx-1" style={{ background: "var(--ds-border)" }} />
      <div className="hidden md:flex items-center gap-x-1">
        {navLinks.map(({ href, label }) => (
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

      {/* Desktop only: divider + CTA + theme */}
      <span className="hidden md:block w-px h-4 mx-1" style={{ background: "var(--ds-border)" }} />
      <div className="hidden md:flex items-center gap-x-2">
        <a
          href="mailto:aymene16boudjelida@gmail.com"
          className="btn-primary whitespace-nowrap"
          style={{ fontSize: "0.78rem", padding: "0.45rem 1.1rem" }}
        >
          Start a Project
        </a>
        <ThemeSwitcher />
      </div>

      {/* Mobile only: spacer + nav links + theme toggle */}
      <div className="flex md:hidden flex-1 items-center justify-end gap-x-1 ml-1">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-xs font-medium px-2 py-1.5 rounded-full transition-opacity duration-150 hover:opacity-60 whitespace-nowrap"
            style={{ color: "var(--ds-text-muted)" }}
          >
            {label}
          </Link>
        ))}
        <ThemeSwitcher />
      </div>
    </nav>
  </header>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg min-h-screen">
    <Nav />
    <main className="pt-20 pb-0 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
      {children}
    </main>
  </div>
);

export default Layout;
