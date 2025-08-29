'use client';

import { useState, useMemo } from 'react';
import { projects } from '@/data/projects.json';
import type { Project } from '@/types/project';

export function useProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => 
                            tech.toLowerCase().includes(searchTerm.toLowerCase())
                          );

      const matchesCategory = selectedCategory === 'all' || 
                            project.category === selectedCategory;

      const matchesTechnology = selectedTechnology === 'all' ||
                              project.technologies.includes(selectedTechnology);

      return matchesSearch && matchesCategory && matchesTechnology;
    });
  }, [searchTerm, selectedCategory, selectedTechnology]);

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const technologies = useMemo(() => {
    const techs = new Set(projects.flatMap(p => p.technologies));
    return ['all', ...Array.from(techs).sort()];
  }, []);

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured);
  }, []);

  return {
    projects: filteredProjects,
    featuredProjects,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTechnology,
    setSelectedTechnology,
    categories,
    technologies,
  };
}