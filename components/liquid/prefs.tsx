"use client";

import React from "react";
import { LANGS, T, type Dict, type Lang } from "@/lib/i18n";

type Theme = "light" | "dark";

type Prefs = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  theme: Theme;
  toggleTheme: () => void;
};

const PrefsContext = React.createContext<Prefs | null>(null);

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");
  const [theme, setTheme] = React.useState<Theme>("light");

  // The inline script in the root layout has already set data-theme before paint.
  React.useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setTheme(current);
    try {
      const stored = window.localStorage.getItem("lang") as Lang | null;
      if (stored && (LANGS as readonly string[]).includes(stored)) setLangState(stored);
    } catch {}
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
    } catch {}
  };

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <PrefsContext.Provider value={{ lang, setLang, t: T[lang], theme, toggleTheme }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = React.useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
