export interface ProjectLinks {
  live?: string;
  github?: string;
  report?: string;
  documentation?: string;
  guide?: string;
  playstore?: string;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  featured: boolean;
  images?: string[];
  links: ProjectLinks;
  features: string[];
  challenges: string[];
  dateCompleted: string;
}

export interface ProjectsData {
  projects: Project[];
}