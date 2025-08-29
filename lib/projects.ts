import { projects } from '@/data/projects.json';
import type { Project } from '@/types/project';

export function getProjectById(id: string): Project | undefined {
  const project = projects.find(project => project.id === id);
  if (!project) return undefined;
  return {
    ...project,
    status: mapStatus(project.status)
  };
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter(project => project.featured)
    .map(project => ({
      ...project,
      status: mapStatus(project.status)
    }));
}

// Helper function to map status string to allowed union type
function mapStatus(status: string): "Completed" | "In Progress" | "Planned" {
  if (status === "Completed" || status === "In Progress" || status === "Planned") {
    return status;
  }
  // Default or fallback
  return "Planned";
}

export function getProjectsByCategory(category: string): Project[] {
  return projects
    .filter(project => 
      project.category.toLowerCase().includes(category.toLowerCase())
    )
    .map(project => ({
      ...project,
      status: mapStatus(project.status)
    }));
}

export function getAllProjects(): Project[] {
  return [...projects]
    .map(project => ({
      ...project,
      status: mapStatus(project.status)
    }))
    .sort((a, b) => 
      new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
    );
}

export function getProjectsByTechnology(technology: string): Project[] {
  return projects
    .filter(project =>
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
    .map(project => ({
      ...project,
      status: mapStatus(project.status)
    }));
}

export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile Development', 
  'Cybersecurity',
  'Network Security',
  'Web Development & Security'
] as const;

export const COMMON_TECHNOLOGIES = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Flutter',
  'Kali Linux',
  'Python',
  'JavaScript'
] as const;