import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Project } from "@/types/project";

const projects = projectsData.projects;

type Props = { params: { id: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.name} , Aimen Boudjelida`,
    description: project.shortDescription,
    alternates: { canonical: `https://spinpah.com/projects/${project.id}` },
  };
}

function generateStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Boudjelida Aimen Mohamed Said",
      url: "https://spinpah.com",
    },
    dateCreated: project.dateCompleted,
    url: `https://spinpah.com/projects/${project.id}`,
  };
}

const MetaItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="pf-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--soft)" }}>
      {label}
    </div>
    <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>{children}</div>
  </div>
);

const StoryBox = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="pf-reveal" style={{ background: "var(--surface)", borderRadius: 12, padding: 32 }}>
    <div className="pf-mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--teal-ink)", marginBottom: 14 }}>
      {label}
    </div>
    {children}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
    {items.map((it, i) => (
      <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--teal)",
            marginTop: 8,
            flexShrink: 0,
          }}
        />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export default function ProjectPage({ params }: Props) {
  const index = projects.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();
  const project = projects[index];

  const structuredData = generateStructuredData({
    ...project,
    status: project.status as "Completed" | "In Progress" | "Planned",
  });

  const prev = projects[index === 0 ? projects.length - 1 : index - 1];
  const next = projects[index === projects.length - 1 ? 0 : index + 1];

  const year = project.dateCompleted
    ? new Date(project.dateCompleted).getFullYear()
    : "In progress";

  const links = [
    { label: "Live demo ↗", href: project.links.live, primary: true },
    { label: "GitHub ↗", href: project.links.github, primary: false },
    { label: "Report ↗", href: project.links.report, primary: false },
    { label: "Documentation ↗", href: project.links.documentation, primary: false },
    { label: "Guide ↗", href: project.links.guide, primary: false },
    { label: "Play Store ↗", href: project.links.playstore, primary: false },
  ].filter((l) => l.href);

  const detailImages = (project.images || []).slice(1, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <section className="pf-section" style={{ padding: "24px 40px 0" }}>
        <Link
          href="/projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "var(--muted)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← All work
        </Link>
        <div style={{ marginTop: 28 }}>
          <div className="pf-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--teal-ink)" }}>
            CASE STUDY · {project.category.toUpperCase()}
          </div>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 84px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              margin: "14px 0 0",
            }}
          >
            {project.name}
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, margin: "18px 0 0", maxWidth: 560 }}>
            {project.shortDescription}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 36,
            margin: "36px 0 0",
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            alignItems: "flex-start",
          }}
        >
          <MetaItem label="YEAR">{year}</MetaItem>
          <MetaItem label="STATUS">{project.status}</MetaItem>
          <div>
            <div className="pf-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--soft)" }}>
              STACK
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
              {project.technologies.slice(0, 4).map((t) => (
                <span key={t} className="pf-chip" style={{ padding: "5px 12px" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span style={{ flex: 1 }} />
          {links.length > 0 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href!}
                  target="_blank"
                  className={l.primary ? "pf-btn" : "pf-btn-outline"}
                  style={{ fontSize: 13, padding: "11px 22px", borderWidth: l.primary ? undefined : 1.5 }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hero shot */}
      <section className="pf-section" style={{ padding: "32px 40px 0" }}>
        <div
          style={{
            position: "relative",
            height: 480,
            borderRadius: 12,
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
            background:
              "repeating-linear-gradient(45deg, var(--stripe1), var(--stripe1) 14px, var(--stripe2) 14px, var(--stripe2) 28px)",
          }}
        >
          {project.images && project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={`${project.name} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span className="pf-mono" style={{ fontSize: 12, color: "var(--soft)" }}>
              {project.name}
            </span>
          )}
        </div>
      </section>

      {/* Story */}
      <section className="pf-section" style={{ padding: "56px 40px" }}>
        <div className="pf-grid-2" style={{ gap: 24, alignItems: "start" }}>
          <StoryBox label="OVERVIEW">
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
              {project.description}
            </p>
          </StoryBox>
          <StoryBox label="KEY FEATURES">
            <BulletList items={project.features} />
          </StoryBox>
        </div>

        {detailImages.length > 0 && (
          <div className="pf-grid-2" style={{ gap: 24, marginTop: 24 }}>
            {detailImages.map((img, i) => (
              <div
                key={i}
                className="pf-reveal"
                style={{ position: "relative", height: 300, borderRadius: 12, overflow: "hidden" }}
              >
                <Image
                  src={img}
                  alt={`${project.name} detail ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}

        {project.challenges.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <StoryBox label="CHALLENGES">
              <BulletList items={project.challenges} />
            </StoryBox>
          </div>
        )}
      </section>

      {/* Prev / Next */}
      <section className="pf-section" style={{ padding: "0 40px 56px" }}>
        <div className="pf-grid-2" style={{ gap: 20 }}>
          <Link
            href={`/projects/${prev.id}`}
            className="pf-lift"
            style={{
              textDecoration: "none",
              color: "var(--ink)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "28px 32px",
            }}
          >
            <div className="pf-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--soft)" }}>
              ← PREVIOUS
            </div>
            <div style={{ fontWeight: 800, fontSize: 20, marginTop: 8 }}>{prev.name}</div>
          </Link>
          <Link
            href={`/projects/${next.id}`}
            className="pf-lift"
            style={{
              textDecoration: "none",
              color: "var(--ink)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "28px 32px",
              textAlign: "right",
            }}
          >
            <div className="pf-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--soft)" }}>
              NEXT →
            </div>
            <div style={{ fontWeight: 800, fontSize: 20, marginTop: 8 }}>{next.name}</div>
          </Link>
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
              ©&apos;19 , 2026 · AIMEN BOUDJELIDA
            </span>
          </div>
          <Link href="/#contact" className="pf-btn" style={{ fontSize: 13, padding: "11px 22px" }}>
            Start a project →
          </Link>
        </div>
      </footer>
    </>
  );
}
