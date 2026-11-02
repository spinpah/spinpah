import type { Viewport } from "next";
import { PrefsProvider } from "@/components/liquid/prefs";
import SiteShell from "@/components/liquid/site-shell";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceae7" },
    { media: "(prefers-color-scheme: dark)", color: "#24221f" },
  ],
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <PrefsProvider>
    <SiteShell>{children}</SiteShell>
  </PrefsProvider>
);

export default Layout;
