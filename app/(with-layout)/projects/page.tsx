import projectsData from "@/data/projects.json";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const projects = projectsData.projects;

export const metadata: Metadata = {
  title: "Work",
  description:
    "A collection of my web development, cybersecurity, and mobile development projects.",
};

const techChips = (techs: string[], n = 2) =>
  techs.slice(0, n).map((t) => (
    <span key={t} className="pf-chip">
      {t}
    </span>
  ));

const Thumb = ({ project }: { project: (typeof projects)[number] }) => (
  <Link
    href={`/projects/${project.id}`}
    style={{
      display: "block",
      position: "relative",
      height: 300,
      borderRadius: 8,
      overflow: "hidden",
      textDecoration: "none",
      background:
        "repeating-linear-gradient(45deg, var(--stripe1), var(--stripe1) 14px, var(--stripe2) 14px, var(--stripe2) 28px)",
    }}
  >
    {project.images && project.images[0] ? (
      <Image
        src={project.images[0]}
        alt={project.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
    ) : (
      <span
        className="pf-mono"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          color: "var(--soft)",
          textAlign: "center",
          padding: 16,
        }}
      >
        {project.name}
      </span>
    )}
  </Link>
);

const Card = ({ project }: { project: (typeof projects)[number] }) => (
  <div
    className="pf-reveal pf-lift"
    style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "14px 14px 22px" }}
  >
    <Thumb project={project} />
    <div style={{ padding: "18px 8px 0" }}>
      <div className="pf-mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--teal-ink)", marginBottom: 8 }}>
        {project.category.toUpperCase()}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <Link href={`/projects/${project.id}`} style={{ textDecoration: "none", color: "var(--ink)" }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{project.name}</h3>
        </Link>
        <span className="pf-mono" style={{ fontSize: 12, color: "var(--soft)", whiteSpace: "nowrap" }}>
          {project.status}
        </span>
      </div>
      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: "10px 0 0" }}>
        {project.shortDescription}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, alignItems: "center" }}>
        {techChips(project.technologies)}
        <span style={{ flex: 1 }} />
        <Link href={`/projects/${project.id}`} className="pf-btn" style={{ fontSize: 12, padding: "6px 13px" }}>
          Case study →
        </Link>
        {project.links.github ? (
          <a
            href={project.links.github}
            target="_blank"
            className="pf-btn-outline"
            style={{ fontSize: 12, padding: "6px 13px", borderWidth: 1.5 }}
          >
            GitHub ↗
          </a>
        ) : project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            className="pf-btn-outline"
            style={{ fontSize: 12, padding: "6px 13px", borderWidth: 1.5 }}
          >
            Live ↗
          </a>
        ) : null}
      </div>
    </div>
  </div>
);

export default function WorkPage() {
  const sorted = [...projects].sort(
    (a, b) =>
      new Date(b.dateCompleted || 0).getTime() -
      new Date(a.dateCompleted || 0).getTime()
  );

  return (
    <>
      <section className="pf-section" style={{ padding: "32px 40px 44px" }}>
        <div
          className="pf-mono"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--teal-ink)" }}
        >
          ALL WORK
        </div>
        <h1
          style={{
            fontSize: "clamp(44px, 5.5vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            margin: "14px 0 0",
          }}
        >
          Everything I&apos;ve shipped
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 520 }}>
          {sorted.length} projects across web, mobile and security — click any card
          for the full story.
        </p>
      </section>

      <section className="pf-section" style={{ padding: "0 40px 56px" }}>
        <div className="pf-grid-2" style={{ gap: 24 }}>
          {sorted.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </section>

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
