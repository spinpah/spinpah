import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, type WorkProject } from "@/lib/work";
import CaseStudy from "@/components/liquid/case-study";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Not Found" };
  return {
    title: project.name,
    description: project.shortDescription,
    alternates: { canonical: `https://spinpah.com/projects/${project.id}` },
  };
}

function generateStructuredData(project: WorkProject) {
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

export default function ProjectPage({ params }: Props) {
  const index = projects.findIndex((p) => p.id === params.id);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(project)) }}
      />
      <CaseStudy
        project={project}
        prev={{ id: prev.id, name: prev.name }}
        next={{ id: next.id, name: next.name }}
      />
    </>
  );
}
