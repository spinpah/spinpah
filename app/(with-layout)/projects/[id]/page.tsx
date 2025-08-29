import { notFound } from 'next/navigation';
import { projects } from '@/data/projects.json';
import LinkPrimitive from "@/components/link-primitive";
import Section from "@/components/section";
import { ArrowLeft, ArrowUpRight, Calendar, Tag, CheckCircle } from "@phosphor-icons/react/dist/ssr/index";
import Image from 'next/image';
import type { Metadata } from 'next';
import type { Project } from '@/types/project';

import Gallery2 from '@/components/gallery';

type Props = {
  params: { id: string }
}

// Generate static params for all projects (PERFORMANCE OPTIMIZATION)
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

// Enhanced SEO metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const technologies = project.technologies.join(', ');
  
  return {
    title: `${project.name} - ${project.category} | Boudjelida Aimen`,
    description: project.description.length > 160 
      ? `${project.description.substring(0, 157)}...`
      : project.description,
    keywords: [
      ...project.technologies,
      project.category,
      'cybersecurity',
      'web development',
      'Boudjelida Aimen',
      'portfolio',
      'project'
    ].join(', '),
    authors: [{ name: 'Boudjelida Aimen Mohamed Said' }],
    creator: 'Boudjelida Aimen Mohamed Said',
    openGraph: {
      title: `${project.name} - ${project.category}`,
      description: project.shortDescription,
      type: 'article',
      images: project.images?.[0] ? [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: `${project.name} screenshot`,
        }
      ] : [],
      siteName: 'Boudjelida Aimen Mohamed Said Portfolio',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.shortDescription,
      images: project.images?.[0] ? [project.images[0]] : [],
      creator: '@spinpah',
    },
    alternates: {
      canonical: `https://spinpah.com/projects/${project.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Generate structured data for SEO
function generateStructuredData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    author: {
      '@type': 'Person',
      name: 'Boudjelida Aimen Mohamed Said',
      url: 'https://spinpah.com',
      jobTitle: 'Cybersecurity Engineer',
    },
    dateCreated: project.dateCompleted,
    keywords: project.technologies.join(', '),
    url: `https://spinpah.com/projects/${project.id}`,
    image: project.images?.[0] || '',
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://spinpah.com/projects/${project.id}`,
    },
    isPartOf: {
      '@type': 'Website',
      name: 'Boudjelida Aimen Mohamed Said Portfolio',
      url: 'https://spinpah.com',
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  // Ensure status is of the correct type for Project
  const projectForStructuredData: Project = {
    ...project,
    status: project.status as "Completed" | "In Progress" | "Planned",
  };

  const structuredData = generateStructuredData(projectForStructuredData);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="animate-in fade-in duration-500">
        {/* Back Navigation */}
        <div className="mb-8">
          <LinkPrimitive href="/" variant="route" className="flex items-center gap-x-2 text-gray-11 hover:text-gray-12 transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </LinkPrimitive>
        </div>

        {/* Project Header */}
        <Section heading='Project'>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-3">
              <h1 className="text-4xl font-medium text-white">
                {project.name}
              </h1>
              {project.featured && (
                <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md font-medium">
                  Featured
                </span>
              )}
            </div>
            
            {/* Status and Category */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-11">
              <div className="flex items-center gap-x-1.5">
                <CheckCircle size={14} />
                <span>{project.status}</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <Tag size={14} />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <Calendar size={14} />
                <time dateTime={project.dateCompleted}>
                  {new Date(project.dateCompleted).toLocaleDateString()}
                </time>
              </div>
            </div>

            {/* Project Links */}
            {(project.links.live || project.links.github || project.links.report || project.links.documentation || project.links.guide || project.links.playstore) && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {project.links.live && (
                  <LinkPrimitive href={project.links.live} external className="flex items-center gap-x-1">
                    Live Demo <ArrowUpRight size={14} />
                  </LinkPrimitive>
                )}
                {project.links.github && (
                  <LinkPrimitive href={project.links.github} external className="flex items-center gap-x-1">
                    GitHub <ArrowUpRight size={14} />
                  </LinkPrimitive>
                )}
                {project.links.report && (
                  <LinkPrimitive href={project.links.report} external className="flex items-center gap-x-1">
                    View Report <ArrowUpRight size={14} />
                  </LinkPrimitive>
                )}
                {project.links.documentation && (
                  <LinkPrimitive href={project.links.documentation} external className="flex items-center gap-x-1">
                    Documentation <ArrowUpRight size={14} />
                  </LinkPrimitive>
                )}
                {project.links.guide && (
                  <LinkPrimitive href={project.links.guide} external className="flex items-center gap-x-1">
                    Implementation Guide <ArrowUpRight size={14} />
                  </LinkPrimitive>
                )}
                {project.links.playstore && (
                  <LinkPrimitive href={project.links.playstore} external className="flex items-center gap-x-1">
                    Play Store <ArrowUpRight size={14} />
                  </LinkPrimitive>
                )}
              </div>
            )}
          </div>
        </Section>

        <Section heading="About">
          <p className="text-gray-11 leading-relaxed">
            {project.description}
          </p>
        </Section>

        

        {/* Rest of your component stays the same... */}
        {/* Project Description */}
        

        {/* Technologies Used */}
        <Section heading="Technologies">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-sm bg-gray-5 text-gray-12 rounded-md font-medium cursor-pointer hover:bg-yellow hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* Key Features */}
        <div className='flex  gap-20'>
        <Section heading="Key Features">
          <ul className="space-y-2">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-x-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-gray-11">{feature}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Challenges */}
        <Section heading="Challenges & Solutions">
          <ul className="space-y-2">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-x-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-6 mt-2 flex-shrink-0" />
                <span className="text-gray-11">{challenge}</span>
              </li>
            ))}
          </ul>
        </Section>
        </div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <Section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="aspect-video bg-gray-3 rounded-md overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.name} screenshot ${index + 1}`}
                    width={20000}
                    height={10000}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </Section>

          
        )}

        

        {/* Navigation to other projects */}
        <Section>
          <div className="pt-8 border-t border-gray-6">
            <LinkPrimitive href="/" variant="route" className="text-gray-11 hover:text-gray-12 transition-colors">
              ← Back to all projects
            </LinkPrimitive>
          </div>
        </Section>
      </div>
    </>
  );
}