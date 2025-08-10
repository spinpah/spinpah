export const experiences = [
  {
    company: "Vane Solutions",
    role: "Software Engineer",
    range: "July 2025 - Today",
    description: "Designing and developing secure software solutions for clients, integrating cybersecurity best practices into the development lifecycle. Providing services including web application development, secure coding, vulnerability testing, and performance optimization to ensure robust, scalable, and secure applications.",
    skills: ["JavaScript / TypeScript", "React.js / Next.js", "Node.js & Express.js", "Git & Version Control"],
  },
  {
    company: "Tassili Airlines",
    role: "Internship",
    range: "Dec 2024 - July 2025",
    description: "Design and optimization of firewall rules using meta-heuristic algorithms (Grey Wolf Optimizer) to enhance network security while reducing configuration complexity.",
    skills: ["Analyzed existing rules to detect duplicates, inclusions, and redundancies.", "Developed a filtering module to preprocess and clean the rules before optimization.", "Evaluated results using network performance metrics and rule quality (security, efficiency, readability)", "Integrated the tool into a network policy management environment for IT teams."],
  }
  
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

export const bucketList = [
  {
    item: "Finishing One Piece",
    status: Status.progress,
  },
  {
    item: "Hitting CHALLENGER RANK in TFT",
    status: Status.progress,
  },
  
  {
    item: "Finish my studies",
    status: Status.completed,
  },
  {
    item: "Have 2 kids",
    status: Status.none,
  },
  {
    item: "Finish red dead redemption 2",
    status: Status.none,
  },
  {
    item: "Finish the last of us",
    status: Status.completed,
  },
  {
    item: "My first bug bounty",
    status: Status.none,
  },
  {
    item: "Travel the world",
    status: Status.progress,
  },
  
];

export const beliefs = [
  "Security through obscurity is not security",
  "Continuous learning is essential in cybersecurity",
  "Ethical hacking makes the digital world safer",
  "Knowledge sharing strengthens the security community",
];
