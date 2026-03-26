import { unstable_noStore as noStore } from "next/cache";
import projectsData from "@/data/projects.json";
import React, { Suspense } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/index";
import StarField from "@/components/star-field";
import { MusicCard, ReadingCard, GamingCard } from "@/components/hover-card";
import { experiences } from "@/content";
import LinkPrimitive from "@/components/link-primitive";
import { getShelves } from "@/lib/literal";
import getLastPlayed from "@/lib/spotify";
import { getGame } from "@/lib/game";
import Filter from "bad-words";
import Skeleton from "@/components/skeleton";
import Image from "next/image";
import Link from "next/link";

const projects = projectsData.projects;

/* ─── helpers ────────────────────────────────────────── */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-2xl font-bold mb-8"
    style={{ color: "var(--ds-text)" }}
  >
    {children}
  </h2>
);

/* ─── Hero ───────────────────────────────────────────── */
const Hero = () => (
  <section className="py-16 md:py-20">
    <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
      {/* Text */}
      <div className="flex-1 space-y-6">
        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium"
          style={{
            background: "#ECFDF5",
            borderColor: "#A7F3D0",
            color: "#065F46",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#10B981" }}
          />
          Accepting New Clients
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
          style={{ color: "var(--ds-text)" }}
        >
          I Build Products That Users Will{" "}
          <span style={{ color: "var(--ds-text-muted)" }}>
            Love and Remember.
          </span>
        </h1>

        <p className="text-lg leading-relaxed max-w-lg" style={{ color: "var(--ds-text-muted)" }}>
          Over two years of crafting scalable applications with startups and
          companies. Based in Algeria — focused on clean architecture and great
          user experiences.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="mailto:aymene16boudjelida@gmail.com"
            className="btn-primary"
          >
            Start a Project
          </a>
          <Link href="/about" className="btn-secondary">
            About Me
          </Link>
        </div>
      </div>

      {/* Photo */}
      <div className="shrink-0">
        <div
          className="w-64 h-72 rounded-3xl overflow-hidden"
          style={{ background: "var(--ds-surface)" }}
        >
          <Image
            src="/images/me-1.jpg"
            alt="Aimen Boudjelida"
            width={256}
            height={288}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);

/* ─── Featured Work ──────────────────────────────────── */
const FeaturedWork = () => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-12 border-t" style={{ borderColor: "var(--ds-border)" }}>
      <div className="flex items-center justify-between mb-8">
        <SectionHeading>Featured Work</SectionHeading>
        <Link
          href="/projects"
          className="text-sm font-medium flex items-center gap-1 hover:underline"
          style={{ color: "var(--ds-text-muted)" }}
        >
          View All <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((project, i) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={`card group block overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
          >
            {/* Image */}
            <div
              className="w-full overflow-hidden"
              style={{
                height: i === 0 ? "280px" : "200px",
                background: "var(--ds-surface-2)",
              }}
            >
              {project.images && project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  width={900}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl font-black opacity-10"
                  style={{ color: "var(--ds-text)" }}
                >
                  {project.name[0]}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--ds-text-muted)" }}
                  >
                    {project.category}
                  </p>
                  <h3
                    className="text-lg font-bold leading-snug group-hover:opacity-70 transition-opacity"
                    style={{ color: "var(--ds-text)" }}
                  >
                    {project.name}
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--ds-text-muted)" }}
                />
              </div>
              <p
                className="text-sm mt-2 leading-relaxed"
                style={{ color: "var(--ds-text-muted)" }}
              >
                {project.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ─── Process ────────────────────────────────────────── */
const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understand the problem, research requirements, and define the project scope and goals clearly.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Architect the solution, plan the tech stack, and create a clear technical specification.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Develop with clean, maintainable code. Test continuously and iterate based on feedback.",
  },
  {
    num: "04",
    title: "Ship",
    desc: "Deploy to production, monitor performance, optimize, and provide ongoing support.",
  },
];

const Process = () => (
  <section className="py-12 border-t" style={{ borderColor: "var(--ds-border)" }}>
    <SectionHeading>My Process</SectionHeading>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {processSteps.map((step) => (
        <div
          key={step.num}
          className="card p-6 flex flex-col gap-4"
          style={{ background: "var(--ds-surface)" }}
        >
          <span
            className="text-xs font-bold tracking-widest"
            style={{ color: "var(--ds-text-muted)" }}
          >
            {step.num}
          </span>
          <h3 className="text-base font-bold" style={{ color: "var(--ds-text)" }}>
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ds-text-muted)" }}>
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Skills ─────────────────────────────────────────── */
const skills = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Git",
  "Flutter",
  "REST APIs",
  "Cybersecurity",
  "Penetration Testing",
  "Network Security",
  "Docker",
  "UI/UX",
  "+ More",
];

const Skills = () => (
  <section className="py-12 border-t" style={{ borderColor: "var(--ds-border)" }}>
    <SectionHeading>Skills &amp; Technologies</SectionHeading>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="skill-tag">
          {skill}
        </span>
      ))}
    </div>
  </section>
);

/* ─── Experience ─────────────────────────────────────── */
const Experience = () => (
  <section className="py-12 border-t" style={{ borderColor: "var(--ds-border)" }}>
    <SectionHeading>Experience</SectionHeading>
    <div className="space-y-0">
      {experiences.map((role, i) => (
        <div
          key={role.company}
          className="flex flex-col md:flex-row gap-2 md:gap-12 py-6"
          style={{
            borderTop: i > 0 ? `1px solid var(--ds-border)` : undefined,
          }}
        >
          <div
            className="text-sm md:w-48 shrink-0"
            style={{ color: "var(--ds-text-muted)" }}
          >
            {role.range}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3
                className="font-bold text-base"
                style={{ color: "var(--ds-text)" }}
              >
                {role.role}
              </h3>
              <span
                className="text-sm px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: "var(--ds-surface)",
                  color: "var(--ds-text-muted)",
                }}
              >
                {role.company}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--ds-text-muted)" }}
            >
              {role.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Currently ──────────────────────────────────────── */
const CurrentlyContent = async () => {
  noStore();
  const { reading } = await getShelves();
  const { data: song } = await getLastPlayed();
  const filter = new Filter();
  const { playing } = await getGame();

  const recent = song.is_playing ? song.item : song.items[0].track;
  const track = {
    title: filter.clean(recent.name),
    artist: recent.artists
      .map((_a: { name: string }) => _a.name)
      .shift(),
    songUrl: recent.external_urls.spotify,
    coverArt: recent.album.images[0].url,
    previewUrl: recent.preview_url,
  };

  return (
    <p className="text-sm leading-relaxed" style={{ color: "var(--ds-text-muted)" }}>
      Listening to{" "}
      <MusicCard {...track}>
        <LinkPrimitive href={track.songUrl} external popover>
          {track.title}
        </LinkPrimitive>
      </MusicCard>{" "}
      by {track.artist} · reading{" "}
      <ReadingCard {...reading}>
        <LinkPrimitive
          href="https://literal.club/book/tokyo-ghoul-nlnfh"
          external
          popover
        >
          {reading.title}
        </LinkPrimitive>
      </ReadingCard>{" "}
      by {reading.author} · playing{" "}
      <GamingCard {...playing}>
        <LinkPrimitive
          href="https://store.steampowered.com/app/214490/Alien_Isolation"
          external
          popover
        >
          {playing.title}
        </LinkPrimitive>
      </GamingCard>
    </p>
  );
};

const Currently = () => (
  <section className="py-12 border-t" style={{ borderColor: "var(--ds-border)" }}>
    <SectionHeading>Currently</SectionHeading>
    <Suspense
      fallback={
        <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--ds-text-muted)" }}>
          Listening to <Skeleton className="inline-flex w-24 h-4 rounded-full" />
          by <Skeleton className="inline-flex w-16 h-4 rounded-full" /> · reading{" "}
          <Skeleton className="inline-flex w-24 h-4 rounded-full" />
        </div>
      }
    >
      <CurrentlyContent />
    </Suspense>
  </section>
);

/* ─── Footer ─────────────────────────────────────────── */
const FooterDate = async () => {
  try {
    const data = await fetch(
      "https://api.github.com/repos/spinpah/spinpah/commits",
      { method: "GET", headers: { Accept: "application/vnd.github.v3+json" } }
    ).then((r) => r.json());

    if (data.message || !data[0]) return <span>2025</span>;

    return (
      <a
        href={data[0].html_url}
        target="_blank"
        className="underline underline-offset-2"
      >
        {new Date(data[0].commit.committer.date).toLocaleDateString()}
      </a>
    );
  } catch (err) {
    return <span>2025</span>;
  }
};

const Footer = () => (
  <footer
    className="relative mt-16 overflow-hidden py-24 text-center"
    style={{
      width: "100vw",
      marginLeft: "calc(50% - 50vw)",
      background:
        "linear-gradient(135deg, #0a0018 0%, #110730 25%, #0d1545 55%, #060d22 80%, #020008 100%)",
      color: "#ffffff",
    }}
  >
    {/* Radial glow blobs */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 55% 50% at 15% 65%, rgba(120,60,255,0.2) 0%, transparent 70%)," +
          "radial-gradient(ellipse 45% 40% at 82% 25%, rgba(30,100,255,0.15) 0%, transparent 65%)," +
          "radial-gradient(ellipse 40% 35% at 58% 90%, rgba(200,80,255,0.12) 0%, transparent 60%)",
      }}
    />

    {/* Animated stars */}
    <StarField count={130} />

    {/* Content */}
    <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-7">
      <p className="text-xs uppercase tracking-[0.25em] font-semibold opacity-40">
        Get in touch
      </p>

      <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
        Let&apos;s create something
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          remarkable together.
        </span>
      </h2>

      <p className="text-sm leading-relaxed opacity-50 max-w-sm mx-auto">
        Available for freelance projects and full-time opportunities.
        Let&apos;s talk.
      </p>

      <a
        href="mailto:aymene16boudjelida@gmail.com"
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
        style={{ background: "#ffffff", color: "#0a0018" }}
      >
        Start a Project <ArrowUpRight size={15} />
      </a>

      <div className="flex justify-center flex-wrap gap-8 pt-2 text-sm opacity-40">
        {[
          { label: "GitHub",    href: "https://github.com/spinpah" },
          { label: "Instagram", href: "https://instagram.com/spinpah" },
          { label: "CV",        href: "https://drive.google.com/file/d/1gh1p-ekzjdjCEayBVRA5BpMiOiEpNMss/view?usp=sharing" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            className="hover:opacity-100 transition-opacity flex items-center gap-1"
          >
            {label} <ArrowUpRight size={12} />
          </a>
        ))}
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs opacity-30">
        <span>Boudjelida Aimen © {new Date().getFullYear()}</span>
        <Suspense fallback={<span>...</span>}>
          <span>
            Last updated · <FooterDate />
          </span>
        </Suspense>
      </div>
    </div>
  </footer>
);

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="select">
      <Hero />
      <FeaturedWork />
      <Process />
      <Skills />
      <Experience />
      <Currently />
      <Footer />
    </div>
  );
}
