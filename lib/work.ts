import projectsData from "@/data/projects.json";
import { PROJECT_TEXT } from "@/data/projects.i18n";
import type { Lang } from "./i18n";

export type WorkProject = (typeof projectsData.projects)[number];

export const CATS = ["websites", "apps", "security"] as const;
export type Cat = (typeof CATS)[number];

// Maps the free-form `category` field in projects.json onto the sidebar groups.
const CATEGORY_TO_CAT: Record<string, Cat> = {
  "Landing Page": "websites",
  "Corporate Website": "websites",
  "Web Development & Security": "apps",
  "Mobile Development": "apps",
  Cybersecurity: "security",
  "Network Security": "security",
};

export const catOf = (p: WorkProject): Cat => CATEGORY_TO_CAT[p.category] ?? "apps";

export const yearOf = (p: WorkProject) =>
  p.dateCompleted ? String(new Date(p.dateCompleted).getFullYear()) : "";

const byDate = (a: WorkProject, b: WorkProject) =>
  new Date(b.dateCompleted || 0).getTime() - new Date(a.dateCompleted || 0).getTime();

export const projects: WorkProject[] = [...projectsData.projects].sort(byDate);

export const projectsByCat = (cat: Cat) => projects.filter((p) => catOf(p) === cat);

// Swaps in the translated name and texts; English is the JSON itself.
export const localize = (p: WorkProject, lang: Lang): WorkProject =>
  lang === "en" ? p : { ...p, ...PROJECT_TEXT[lang][p.id] };
