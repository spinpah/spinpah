import { projects } from '@/data/projects.json';
import LinkPrimitive from "@/components/link-primitive";
import Section from "@/components/section";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "@phosphor-icons/react/dist/ssr/index";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of my cybersecurity, web development, and mobile development projects.',
};

export default function ProjectsPage() {
  // Sort projects by date (newest first) and separate featured projects
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
  );
  
  const featuredProjects = sortedProjects.filter(p => p.featured);
  const otherProjects = sortedProjects.filter(p => !p.featured);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Back Navigation */}
      <div className="mb-8">
        <LinkPrimitive href="/" variant="route" className="flex items-center gap-x-2 text-gray-11 hover:text-gray-12 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </LinkPrimitive>
      </div>

      

      {/* All Projects */}
      <Section heading={featuredProjects.length > 0 ? "All Projects" : "Projects"}>
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { 
  project: typeof projects[0], 
  featured?: boolean 
}) {
  return (
    <div className="group p-8 rounded-md hover:border-gray-7 transition-colors">
      <div className="flex flex-col gap-y-3">
        {/* Project Header */}
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex-1">
            <div className="flex items-center gap-x-3 mb-2">
              <LinkPrimitive 
                href={`/projects/${project.id}`} 
                variant="route"
                className="text-lg font-medium text-white group-hover:text-accent transition-colors"
              >
                {project.name}
              </LinkPrimitive>
              {project.featured && (
                <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md font-medium">
                  Featured
                </span>
              )}
            </div>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-11 mb-3">
              <div className="flex items-center gap-x-1.5">
                <Tag size={12} />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <Calendar size={12} />
                <span>{new Date(project.dateCompleted).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <LinkPrimitive 
            href={`/projects/${project.id}`} 
            variant="route"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowRight size={16} />
          </LinkPrimitive>
        </div>

        {/* Description */}
        <p className="text-gray-11 text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap bg-accent/5  gap-1.5">
          {project.technologies.slice(0, 20).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs text-white rounded cursor-pointer font-medium"
            >
              {tech}
            </span>
          ))}
          
        </div>
      </div>
    </div>
  );
}