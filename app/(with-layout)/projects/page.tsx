import { projects } from "@/data/projects.json";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr/index";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of my web development, cybersecurity, and mobile development projects.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort(
    (a, b) =>
      new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: "var(--ds-text-muted)" }}
        >
          <ArrowLeft size={15} /> Back
        </Link>
      </div>

      <div className="mb-12">
        <span
          className="text-xs font-semibold uppercase tracking-widest block mb-3"
          style={{ color: "var(--ds-text-muted)" }}
        >
          Portfolio
        </span>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: "var(--ds-text)" }}
        >
          All Projects
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="card group block overflow-hidden"
          >
            {/* Image */}
            <div
              className="w-full h-52 overflow-hidden"
              style={{ background: "var(--ds-surface-2)" }}
            >
              {project.images && project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  width={700}
                  height={350}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-5xl font-black opacity-10"
                  style={{ color: "var(--ds-text)" }}
                >
                  {project.name[0]}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--ds-text-muted)" }}
                  >
                    {project.category} · {new Date(project.dateCompleted).getFullYear()}
                  </p>
                  <h3
                    className="text-base font-bold leading-snug group-hover:opacity-60 transition-opacity"
                    style={{ color: "var(--ds-text)" }}
                  >
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.featured && (
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{
                        background: "#ECFDF5",
                        color: "#065F46",
                      }}
                    >
                      Featured
                    </span>
                  )}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--ds-text-muted)" }}
                  />
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--ds-text-muted)" }}
              >
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="skill-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
