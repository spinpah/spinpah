import type { Lang } from "@/lib/i18n";

// Text shown on the About page, in every supported language.
export type Text = Record<Lang, string>;

export const profile = {
  name: "Aimen Boudjelida",
  location: "Pisa, Italy",
  email: "aymene16boudjelida@gmail.com",
  upwork: "https://www.upwork.com/freelancers/~0136e1cc5c40b1da95",
  socials: [
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~0136e1cc5c40b1da95" },
    { label: "GitHub", href: "https://github.com/spinpah" },
    { label: "Instagram", href: "https://instagram.com/spinpah" },
  ],
};

export const stats = [
  { n: "2+", key: "years" },
  { n: "10+", key: "projects" },
  { n: "10+", key: "clients" },
  { n: "99.9%", key: "uptime" },
] as const;

export const studies: { title: Text; range: Text }[] = [
  {
    title: {
      en: "Artificial Intelligence and Data Engineering, University of Pisa",
      fr: "Intelligence artificielle et Data Engineering, Université de Pise",
      it: "Artificial Intelligence and Data Engineering, Università di Pisa",
    },
    range: { en: "Sept 2026 – now", fr: "Sept. 2026 – aujourd'hui", it: "Sett. 2026 – oggi" },
  },
  {
    title: {
      en: "Information Systems Security, Université Houari Boumediene",
      fr: "Sécurité des systèmes d'information, Université Houari Boumediene",
      it: "Sicurezza dei sistemi informativi, Università Houari Boumediene",
    },
    range: { en: "Master's", fr: "Master", it: "Laurea magistrale" },
  },
];

export const services: { title: Text; desc: Text }[] = [
  {
    title: { en: "Web Apps", fr: "Applications web", it: "Web app" },
    desc: {
      en: "Full-stack web applications in TypeScript: auth, dashboards, billing, designed, built and shipped end to end.",
      fr: "Applications web full-stack en TypeScript : authentification, tableaux de bord, facturation, conçues, développées et livrées de bout en bout.",
      it: "Applicazioni web full-stack in TypeScript: autenticazione, dashboard, fatturazione, progettate, sviluppate e rilasciate end-to-end.",
    },
  },
  {
    title: { en: "Mobile Apps", fr: "Applications mobiles", it: "App mobile" },
    desc: {
      en: "Cross-platform mobile apps with React Native and Flutter, sharing logic with your web product.",
      fr: "Applications mobiles multiplateformes avec React Native et Flutter, qui partagent la logique de votre produit web.",
      it: "App mobile multipiattaforma con React Native e Flutter, che condividono la logica con il tuo prodotto web.",
    },
  },
  {
    title: { en: "Automation", fr: "Automatisation", it: "Automazione" },
    desc: {
      en: "Bots, scrapers, integrations and internal tools that remove the busywork.",
      fr: "Bots, scrapers, intégrations et outils internes qui éliminent les tâches répétitives.",
      it: "Bot, scraper, integrazioni e strumenti interni che eliminano il lavoro ripetitivo.",
    },
  },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
export const stack = [
  { name: "Node.js", icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "React", icon: `${DEVICON}/react/react-original.svg` },
  { name: "Next.js", icon: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
  { name: "PostgreSQL", icon: `${DEVICON}/postgresql/postgresql-original.svg` },
];

export const currently = [
  {
    key: "watching",
    title: "Better Call Saul",
    subtitle: "Vince Gilligan",
    image: "/images/bcs.jpg",
    href: "https://www.imdb.com/title/tt3032476/",
  },
  {
    key: "playing",
    title: "The Witcher 3",
    subtitle: "CD Projekt Red",
    image: "/images/witcher3.jpg",
    href: "https://store.steampowered.com/app/292030",
  },
] as const;

export const experiences: { company: string; role: Text; range: Text; logo: string; description: Text }[] = [
  {
    company: "Vane Solutions",
    role: { en: "Software Engineer", fr: "Ingénieur logiciel", it: "Ingegnere del software" },
    range: { en: "July 2025 - Today", fr: "Juil. 2025 - aujourd'hui", it: "Lug. 2025 - oggi" },
    logo: "/images/logos/vane-solutions.jpg",
    description: {
      en: "Designing and developing secure software solutions for clients, integrating cybersecurity best practices into the development lifecycle. Providing services including web application development, secure coding, vulnerability testing, and performance optimization to ensure robust, scalable, and secure applications.",
      fr: "Conception et développement de solutions logicielles sécurisées pour les clients, en intégrant les bonnes pratiques de cybersécurité dans tout le cycle de développement. Services proposés : développement d'applications web, codage sécurisé, tests de vulnérabilité et optimisation des performances, pour des applications robustes, évolutives et sûres.",
      it: "Progettazione e sviluppo di soluzioni software sicure per i clienti, integrando le best practice di cybersecurity nell'intero ciclo di sviluppo. Servizi offerti: sviluppo di applicazioni web, secure coding, test di vulnerabilità e ottimizzazione delle prestazioni, per applicazioni robuste, scalabili e sicure.",
    },
  },
  {
    company: "Tassili Airlines",
    role: { en: "Internship", fr: "Stage", it: "Tirocinio" },
    range: { en: "Dec 2024 - July 2025", fr: "Déc. 2024 - juil. 2025", it: "Dic. 2024 - lug. 2025" },
    logo: "/images/logos/tassili-airlines.jpg",
    description: {
      en: "Design and optimization of firewall rules using meta-heuristic algorithms (Grey Wolf Optimizer) to enhance network security while reducing configuration complexity.",
      fr: "Conception et optimisation de règles de pare-feu à l'aide d'algorithmes méta-heuristiques (Grey Wolf Optimizer) pour renforcer la sécurité du réseau tout en réduisant la complexité de configuration.",
      it: "Progettazione e ottimizzazione delle regole firewall con algoritmi metaeuristici (Grey Wolf Optimizer) per rafforzare la sicurezza di rete riducendo la complessità di configurazione.",
    },
  },
];

export const Status = {
  none: "none",
  progress: "progress",
  completed: "completed",
} as const;

export const photos = [
  {
    src: "/images/me-1.jpg",
    alt: "Professional headshot of Aimen Boudjelida in a cybersecurity setting",
  },
  {
    src: "/images/861.png",
    alt: "Aimen working on cybersecurity projects and security analysis",
  },
  {
    src: "/images/862.png",
    alt: "Aimen working on cybersecurity projects and security analysis",
  },
  {
    src: "/images/863.png",
    alt: "Aimen in a professional cybersecurity environment",
  },
  {
    src: "/images/864.png",
    alt: "Aimen in a professional cybersecurity environment",
  }
];

export const bucketList: { item: Text; status: keyof typeof Status }[] = [
  {
    item: { en: "Finishing One Piece", fr: "Finir One Piece", it: "Finire One Piece" },
    status: Status.progress,
  },
  {
    item: { en: "Hitting CHALLENGER RANK in TFT", fr: "Atteindre le rang CHALLENGER sur TFT", it: "Raggiungere il rango CHALLENGER in TFT" },
    status: Status.progress,
  },
  {
    item: { en: "Finish my studies", fr: "Terminer mes études", it: "Finire gli studi" },
    status: Status.completed,
  },
  {
    item: { en: "Have 2 kids", fr: "Avoir 2 enfants", it: "Avere 2 figli" },
    status: Status.none,
  },
  {
    item: { en: "Finish red dead redemption 2", fr: "Finir Red Dead Redemption 2", it: "Finire Red Dead Redemption 2" },
    status: Status.none,
  },
  {
    item: { en: "Finish the last of us", fr: "Finir The Last of Us", it: "Finire The Last of Us" },
    status: Status.completed,
  },
  {
    item: { en: "My first bug bounty", fr: "Mon premier bug bounty", it: "Il mio primo bug bounty" },
    status: Status.none,
  },
  {
    item: { en: "Travel the world", fr: "Voyager à travers le monde", it: "Viaggiare per il mondo" },
    status: Status.progress,
  },
];

export const beliefs: Text[] = [
  {
    en: "Security through obscurity is not security",
    fr: "La sécurité par l'obscurité n'est pas de la sécurité",
    it: "La sicurezza tramite segretezza non è sicurezza",
  },
  {
    en: "Continuous learning is essential in technology",
    fr: "L'apprentissage continu est essentiel dans la tech",
    it: "L'apprendimento continuo è essenziale nella tecnologia",
  },
  {
    en: "Clean and maintainable code is more valuable than quick fixes",
    fr: "Un code propre et maintenable vaut plus que des correctifs rapides",
    it: "Un codice pulito e manutenibile vale più delle soluzioni rapide",
  },
  {
    en: "User experience should guide software design",
    fr: "L'expérience utilisateur doit guider la conception logicielle",
    it: "L'esperienza utente deve guidare la progettazione del software",
  },
  {
    en: "Collaboration and code reviews make stronger products",
    fr: "La collaboration et les revues de code rendent les produits plus solides",
    it: "Collaborazione e code review rendono i prodotti più solidi",
  },
  {
    en: "Scalable architecture is key to long-term success",
    fr: "Une architecture évolutive est la clé du succès à long terme",
    it: "Un'architettura scalabile è la chiave del successo a lungo termine",
  },
  {
    en: "Open-source contributions push the industry forward",
    fr: "Les contributions open source font avancer l'industrie",
    it: "I contributi open source fanno progredire il settore",
  },
];
