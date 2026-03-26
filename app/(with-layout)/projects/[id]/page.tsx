import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
const projects = projectsData.projects;
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr/index";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Project } from "@/types/project";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.name} — Boudjelida Aimen`,
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
    author: { "@type": "Person", name: "Boudjelida Aimen Mohamed Said", url: "https://spinpah.com" },
    dateCreated: project.dateCompleted,
    url: `https://spinpah.com/projects/${project.id}`,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const structuredData = generateStructuredData({
    ...project,
    status: project.status as "Completed" | "In Progress" | "Planned",
  });

  const links = [
    { label: "Live Demo", href: project.links.live },
    { label: "GitHub", href: project.links.github },
    { label: "Report", href: project.links.report },
    { label: "Documentation", href: project.links.documentation },
    { label: "Guide", href: project.links.guide },
    { label: "Play Store", href: project.links.playstore },
  ].filter((l) => l.href);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div>
        {/* Back */}
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "var(--ds-text-muted)" }}
          >
            <ArrowLeft size={15} /> All Projects
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 pb-10 border-b" style={{ borderColor: "var(--ds-border)" }}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--ds-text-muted)" }}
          >
            {project.category} ·{" "}
            {new Date(project.dateCompleted).getFullYear()}
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ color: "var(--ds-text)" }}
            >
              {project.name}
            </h1>

            {/* Links */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    className={
                      label === "Live Demo"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                  >
                    {label} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Status + tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{
                background:
                  project.status === "In Progress" ? "#ECFDF5" : "var(--ds-surface)",
                color:
                  project.status === "In Progress" ? "#065F46" : "var(--ds-text-muted)",
              }}
            >
              {project.status}
            </span>
            {project.featured && (
              <span
                className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: "var(--ds-surface)", color: "var(--ds-text-muted)" }}
              >
                Featured
              </span>
            )}
          </div>

          <p
            className="mt-5 text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--ds-text-muted)" }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden ${i === 0 && project.images!.length > 1 ? "md:col-span-2" : ""}`}
                style={{
                  background: "var(--ds-surface)",
                  aspectRatio: i === 0 ? "16/7" : "16/9",
                }}
              >
                <Image
                  src={img}
                  alt={`${project.name} screenshot ${i + 1}`}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Overview */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--ds-surface)" }}
          >
            <h2
              className="text-base font-bold mb-4"
              style={{ color: "var(--ds-text)" }}
            >
              Overview
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--ds-text-muted)" }}
            >
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--ds-surface)" }}
          >
            <h2
              className="text-base font-bold mb-4"
              style={{ color: "var(--ds-text)" }}
            >
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="skill-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--ds-surface)" }}
          >
            <h2
              className="text-base font-bold mb-4"
              style={{ color: "var(--ds-text)" }}
            >
              Key Features
            </h2>
            <ul className="space-y-2.5">
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--ds-text-muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: "var(--ds-text)" }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--ds-surface)" }}
          >
            <h2
              className="text-base font-bold mb-4"
              style={{ color: "var(--ds-text)" }}
            >
              Challenges
            </h2>
            <ul className="space-y-2.5">
              {project.challenges.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--ds-text-muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 opacity-40"
                    style={{ background: "var(--ds-text)" }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back */}
        <div className="pt-4 border-t" style={{ borderColor: "var(--ds-border)" }}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "var(--ds-text-muted)" }}
          >
            <ArrowLeft size={15} /> All Projects
          </Link>
        </div>
      </div>
    </>
  );
}
