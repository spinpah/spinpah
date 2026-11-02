"use client";

import Link from "next/link";
import Image from "next/image";
import { catOf, localize, yearOf, type WorkProject } from "@/lib/work";
import { PROJECT_TEXT } from "@/data/projects.i18n";
import ProjectMedia from "./project-media";
import { ArrowLeft, ArrowUpRight } from "./icons";
import { usePrefs } from "./prefs";

type Neighbour = { id: string; name: string };

const LINK_LABELS: [string, string][] = [
  ["live", "live"],
  ["github", "GitHub"],
  ["report", "Report"],
  ["documentation", "Documentation"],
  ["guide", "Guide"],
  ["playstore", "Play Store"],
];

const Shot = ({ project, src, sizes }: { project: WorkProject; src: string; sizes: string }) => (
  <Image src={src} alt={`${project.name} screenshot`} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: "top center" }} />
);

const Bullets = ({ items }: { items: string[] }) => (
  <div className="lg-lines" style={{ color: "var(--mute)" }}>
    {items.map((it) => (
      <div key={it}>— {it}</div>
    ))}
  </div>
);

export default function CaseStudy({
  project: base,
  prev,
  next,
}: {
  project: WorkProject;
  prev: Neighbour;
  next: Neighbour;
}) {
  const { t, lang } = usePrefs();
  const project = localize(base, lang);
  const nameOf = (n: Neighbour) => (lang === "en" ? n.name : PROJECT_TEXT[lang][n.id]?.name ?? n.name);
  const images = project.images ?? [];
  const cat = t[catOf(project)];
  const links = project.links as Partial<Record<string, string>>;
  const primary = LINK_LABELS.map(([k, label]) => ({ href: links[k], label: k === "live" ? t.live : label })).find(
    (l) => l.href
  );

  return (
    <div style={{ maxWidth: 940, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <Link href="/" aria-label={t.back} className="lg-glass lg-round" style={{ width: 42, height: 42 }}>
          <ArrowLeft />
        </Link>
        <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
          <h1 style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-.01em", margin: 0 }}>{project.name}</h1>
          <div style={{ fontSize: 14, color: "var(--mute)" }}>
            {[cat, yearOf(project)].filter(Boolean).join(" · ")}
          </div>
        </div>
        {primary && (
          <a href={primary.href} target="_blank" rel="noreferrer" className="lg-glass lg-pill">
            {primary.label}
            <ArrowUpRight />
          </a>
        )}
      </div>

      <div className="lg-bento">
        <div className="lg-b-hero">
          {/* `cover` is an optional image cropped for this tall tile */}
          <ProjectMedia project={project} image={project.cover} sizes="(max-width: 900px) 100vw, 470px" priority kicker={cat} />
        </div>
        <div className="lg-tile">
          <div style={{ fontSize: 12, color: "var(--mute)" }}>{t.year}</div>
          <div style={{ fontSize: 32, fontWeight: 300, fontVariantNumeric: "tabular-nums" }}>{yearOf(project) || "—"}</div>
        </div>
        <div className="lg-tile">
          <div style={{ fontSize: 12, color: "var(--mute)" }}>{t.status}</div>
          <div style={{ fontSize: 20, fontWeight: 300 }}>{project.status === "Completed" ? t.completed : project.status}</div>
        </div>
        {/* The landscape preview video fits the wide tile; the tall hero keeps the screenshot. */}
        <div className="lg-b-wide">
          {project.video ? (
            <ProjectMedia project={project} sizes="(max-width: 900px) 100vw, 470px" video="playing" kicker={cat} />
          ) : images[1] ? (
            <Shot project={project} src={images[1]} sizes="(max-width: 900px) 100vw, 470px" />
          ) : (
            <div className="lg-tile" style={{ height: "100%", borderRadius: 16 }}>
              <div style={{ fontSize: 12, color: "var(--mute)" }}>{t.stackLabel}</div>
              <div className="lg-cover-tags" style={{ gap: 8 }}>
                {project.technologies.map((tech) => (
                  <span key={tech} style={{ fontSize: 12, padding: "5px 11px" }}>{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {images[2] ? (
            <Shot project={project} src={images[2]} sizes="235px" />
          ) : (
            <div className="lg-tile" style={{ height: "100%", borderRadius: 16 }}>
              <div style={{ fontSize: 12, color: "var(--mute)" }}>{t.features}</div>
              <div style={{ fontSize: 32, fontWeight: 300, fontVariantNumeric: "tabular-nums" }}>{project.features.length}</div>
            </div>
          )}
        </div>
        <div className="lg-tile lg-b-label" style={{ justifyContent: "flex-end" }}>
          <div style={{ fontSize: 15, lineHeight: 1.4, color: "var(--ink)" }}>{project.shortDescription}</div>
        </div>
        <div>
          {images[3] ? (
            <Shot project={project} src={images[3]} sizes="235px" />
          ) : (
            <div className="lg-tile" style={{ height: "100%", borderRadius: 16 }}>
              <div style={{ fontSize: 12, color: "var(--mute)" }}>{cat}</div>
              <div style={{ fontSize: 15 }}>{project.technologies[0]}</div>
            </div>
          )}
        </div>
      </div>

      <div className="lg-panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="lg-label">{t.overview}</div>
        <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{project.description}</p>
      </div>

      <div className="lg-grid-2">
        <div className="lg-panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="lg-label">{t.features}</div>
          <Bullets items={project.features} />
        </div>
        <div className="lg-panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="lg-label">{t.challenges}</div>
          <Bullets items={project.challenges} />
        </div>
      </div>

      {images.slice(1).map((src, i) => (
        <div
          key={src}
          className="lg-media"
          style={{ aspectRatio: i % 2 ? "16/10" : "16/9", borderRadius: 26, boxShadow: "0 20px 50px var(--glass-sh)" }}
        >
          <Shot project={project} src={src} sizes="(max-width: 960px) 100vw, 940px" />
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href={`/projects/${prev.id}`} className="lg-glass lg-pill">
          ← {t.prev}: {nameOf(prev)}
        </Link>
        <Link href={`/projects/${next.id}`} className="lg-glass lg-pill">
          {t.next}: {nameOf(next)} →
        </Link>
      </div>
    </div>
  );
}
