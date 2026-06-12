import type { Viewport } from "next";
import Nav from "@/components/portfolio/nav";
import RevealScript from "@/components/portfolio/reveal-script";

export const viewport: Viewport = {
  themeColor: "#ECECEC",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="pf-page select">
    <div className="pf-card">
      <Nav />
      {children}
    </div>
    <RevealScript />
  </div>
);

export default Layout;
