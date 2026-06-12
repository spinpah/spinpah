import { beliefs, bucketList, photos, Status } from "@/content";
import type { Metadata } from "next/types";
import Image from "next/image";
import Link from "next/link";
import PhotoRail from "@/components/portfolio/photo-rail";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "https://spinpah.com/about" },
};

const CV_LINK =
  "https://drive.google.com/file/d/1gh1p-ekzjdjCEayBVRA5BpMiOiEpNMss/view?usp=sharing";

const BucketRow = ({
  item,
  status,
}: {
  item: string;
  status: keyof typeof Status;
}) => {
  const s = Status[status];
  const dot =
    s === "progress" ? "var(--teal)" : "transparent";
  const textStyle: React.CSSProperties =
    s === "completed"
      ? { color: "var(--soft)", textDecoration: "line-through" }
      : s === "progress"
      ? { fontWeight: 600 }
      : { color: "var(--muted)" };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0 }} />
      <span style={{ fontSize: 16, ...textStyle }}>{item}</span>
    </div>
  );
};

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="pf-section pf-about-grid" style={{ padding: "32px 40px 56px" }}>
        <div>
          <div className="pf-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--teal-ink)" }}>
            ABOUT ME
          </div>
          <h1
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              margin: "14px 0 0",
            }}
          >
            Developer by day, curious human the rest of the time
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, margin: "24px 0 0", maxWidth: 540 }}>
            I&apos;m Aimen Boudjelida, a software engineer based in Algeria. After
            a Master&apos;s in Information Systems Security at Université Houari
            Boumediene, I focus on full-stack web and mobile development, API
            design, and cloud integration.
          </p>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, margin: "14px 0 0", maxWidth: 540 }}>
            Off the keyboard you&apos;ll find me gaming, watching shows, and slowly
            working through the bucket list below.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <a href="mailto:aymene16boudjelida@gmail.com" className="pf-btn" style={{ fontSize: 14, padding: "13px 26px" }}>
              Start a project
            </a>
            <a href={CV_LINK} target="_blank" className="pf-btn-outline" style={{ fontSize: 14, padding: "13px 26px" }}>
              View CV ↗
            </a>
          </div>
        </div>
        <div style={{ background: "var(--surface)", borderRadius: 12, padding: 12 }}>
          <div style={{ position: "relative", width: "100%", height: 380, borderRadius: 8, overflow: "hidden" }}>
            <Image
              src="/images/portrait.png"
              alt="Portrait of Aimen Boudjelida"
              fill
              sizes="(max-width: 900px) 100vw, 360px"
              priority
              style={{ objectFit: "cover", objectPosition: "50% 24%", filter: "grayscale(1) contrast(1.06)" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 6px 4px" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Aimen Boudjelida</div>
            <div className="pf-mono" style={{ fontSize: 11, color: "var(--soft)", letterSpacing: "0.08em" }}>
              ALGIERS, DZ
            </div>
          </div>
        </div>
      </section>

      {/* Bucket list */}
      <section className="pf-section" style={{ padding: "0 40px 56px" }}>
        <div className="pf-reveal" style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}>
          <h2 style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
            Bucket list
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
            {bucketList.map((b) => (
              <BucketRow key={b.item} item={b.item} status={b.status} />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28 }}>
            <span className="pf-mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.1em", color: "var(--soft)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
              IN PROGRESS
            </span>
            <span className="pf-mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--soft)", textDecoration: "line-through" }}>
              DONE
            </span>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="pf-section" style={{ padding: "0 40px 56px" }}>
        <div className="pf-reveal" style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}>
          <h2 style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
            Beliefs
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 640, display: "flex", flexDirection: "column", gap: 18 }}>
            {beliefs.map((belief, i) => (
              <li key={belief} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span className="pf-mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-ink)", marginTop: 3, width: 22, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>{belief}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photos */}
      <section className="pf-section" style={{ padding: "0 40px 56px" }}>
        <div className="pf-reveal" style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}>
          <PhotoRail photos={photos} />
        </div>
      </section>

      {/* Footer bar */}
      <footer className="pf-section" style={{ padding: "0 40px 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border)",
            paddingTop: 28,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/favicon.ico" alt="Logo" width={34} height={34} style={{ borderRadius: 8, display: "block" }} />
            <span className="pf-mono" style={{ fontSize: 12, color: "var(--soft)" }}>
              ©&apos;19 — 2026 · AIMEN BOUDJELIDA
            </span>
          </div>
          <Link href="/" className="pf-btn" style={{ fontSize: 13, padding: "11px 22px" }}>
            ← Back home
          </Link>
        </div>
      </footer>
    </>
  );
}
