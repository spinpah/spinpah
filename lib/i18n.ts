export const LANGS = ["en", "fr", "it"] as const;
export type Lang = (typeof LANGS)[number];

const en = {
    tagline1: "Full-stack Developer,",
    tagline2: "AI & Data Engineering student in Pisa.",
    work: "Work", about: "About", gallery: "Gallery", enter: "Enter", photos: "photos", galleryHint: "Scroll to roll the film",
    websites: "Websites", apps: "Apps", security: "Security",
    open: "Open case study", live: "See it live", back: "Back",
    projects: "projects", project: "project",
    year: "Year", status: "Status", overview: "Overview", features: "Key features", challenges: "Challenges",
    stackLabel: "Stack", prev: "Previous", next: "Next",
    intro: "I'm Aimen Boudjelida, a software engineer based in Pisa, Italy, shipping web products end to end: Node.js & TypeScript from API to UI, built fast, tested, and deployed to production.",
    mission: "My mission is to ship web products that are fast, reliable and accessible, code that holds up in production, not just in the demo.",
    impact: "Selected impact", experience: "Experience", studies: "Studies", services: "Services",
    stack: "Stack", now: "Currently", beliefs: "Beliefs", bucket: "Bucket list",
    years: "years", clients: "clients", uptime: "uptime",
    listening: "Listening", watching: "Watching", playing: "Playing",
    completed: "Completed", contact: "Start a project", hire: "Hire me on Upwork", inProgress: "in progress", done: "done",
    location: "Pisa, Italy", light: "Light theme", dark: "Dark theme",
};

export type Dict = Record<keyof typeof en, string>;

export const T: Record<Lang, Dict> = {
  en,
  fr: {
    tagline1: "Développeur Full-stack,",
    tagline2: "étudiant en IA & Data Engineering à Pise.",
    work: "Projets", about: "À propos", gallery: "Galerie", enter: "Entrer", photos: "photos", galleryHint: "Faites défiler pour dérouler la pellicule",
    websites: "Sites web", apps: "Applications", security: "Sécurité",
    open: "Voir le projet", live: "Voir en ligne", back: "Retour",
    projects: "projets", project: "projet",
    year: "Année", status: "Statut", overview: "Aperçu", features: "Fonctionnalités", challenges: "Défis",
    stackLabel: "Stack", prev: "Précédent", next: "Suivant",
    intro: "Je suis Aimen Boudjelida, ingénieur logiciel basé à Pise, en Italie. Je livre des produits web de bout en bout : Node.js & TypeScript, de l'API à l'interface, rapides, testés et déployés en production.",
    mission: "Ma mission : livrer des produits web rapides, fiables et accessibles, du code qui tient en production, pas seulement en démo.",
    impact: "Impact", experience: "Expérience", studies: "Études", services: "Services",
    stack: "Stack", now: "En ce moment", beliefs: "Convictions", bucket: "Bucket list",
    years: "ans", clients: "clients", uptime: "disponibilité",
    listening: "J'écoute", watching: "Je regarde", playing: "Je joue à",
    completed: "Terminé", contact: "Démarrer un projet", hire: "Me recruter sur Upwork", inProgress: "en cours", done: "fait",
    location: "Pise, Italie", light: "Thème clair", dark: "Thème sombre",
  },
  it: {
    tagline1: "Sviluppatore Full-stack,",
    tagline2: "studente di IA & Data Engineering a Pisa.",
    work: "Lavori", about: "Chi sono", gallery: "Galleria", enter: "Entra", photos: "foto", galleryHint: "Scorri per far girare la pellicola",
    websites: "Siti web", apps: "App", security: "Sicurezza",
    open: "Apri il progetto", live: "Guarda dal vivo", back: "Indietro",
    projects: "progetti", project: "progetto",
    year: "Anno", status: "Stato", overview: "Panoramica", features: "Funzionalità", challenges: "Sfide",
    stackLabel: "Stack", prev: "Precedente", next: "Successivo",
    intro: "Sono Aimen Boudjelida, ingegnere del software con base a Pisa. Realizzo prodotti web end-to-end: Node.js e TypeScript, dall'API all'interfaccia, sviluppati in fretta, testati e messi in produzione.",
    mission: "La mia missione è realizzare prodotti web veloci, affidabili e accessibili: codice che regge in produzione, non solo nella demo.",
    impact: "Impatto", experience: "Esperienza", studies: "Studi", services: "Servizi",
    stack: "Stack", now: "In questo momento", beliefs: "Convinzioni", bucket: "Lista dei desideri",
    years: "anni", clients: "clienti", uptime: "uptime",
    listening: "Sto ascoltando", watching: "Sto guardando", playing: "Sto giocando a",
    completed: "Completato", contact: "Inizia un progetto", hire: "Assumimi su Upwork", inProgress: "in corso", done: "fatto",
    location: "Pisa, Italia", light: "Tema chiaro", dark: "Tema scuro",
  },
};
