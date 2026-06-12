export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { experiences } from "@/content";
import getNowPlaying from "@/lib/spotify";
import Filter from "bad-words";
import Skeleton from "@/components/skeleton";
import StatsBand from "@/components/portfolio/stats-band";
import ContactForm from "@/components/portfolio/contact-form";
import SocialPills from "@/components/portfolio/social-pills";

const projects = projectsData.projects;
const CV_LINK =
  "https://drive.google.com/file/d/1gh1p-ekzjdjCEayBVRA5BpMiOiEpNMss/view?usp=sharing";

/* ─── Section shell ──────────────────────────────────── */
const Section = ({
  id,
  children,
  style,
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <section id={id} className="pf-section" style={{ padding: "0 40px 56px", ...style }}>
    {children}
  </section>
);

/* ─── Hero ───────────────────────────────────────────── */
const StickerBadge = ({
  label,
  bg,
  color = "#141414",
  rot,
  pos,
}: {
  label: string;
  bg: string;
  color?: string;
  rot: number;
  pos: React.CSSProperties;
}) => (
  <span style={{ position: "absolute", ...pos }}>
    <span
      style={{
        display: "inline-block",
        transform: `rotate(${rot}deg)`,
        background: bg,
        color,
        borderRadius: 999,
        padding: "10px 18px",
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.06em",
        boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
      }}
    >
      {label}
    </span>
  </span>
);

const Hero = () => (
  <Section style={{ padding: "16px 40px 32px" }}>
    <div
      className="pf-hero-grid"
      style={{
        background: "#161616",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "56px 48px",
      }}
    >
      <div>
        <div
          className="pf-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(31,215,192,0.14)",
            color: "#1FD7C0",
            borderRadius: 999,
            padding: "9px 18px",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#1FD7C0",
              display: "inline-block",
            }}
          />
          AVAILABLE FOR WORK
        </div>
        <h1
          className="pf-display"
          style={{
            fontWeight: 400,
            fontSize: "clamp(60px, 6.5vw, 104px)",
            lineHeight: 0.96,
            letterSpacing: "0.01em",
            color: "#F2EFE9",
            textTransform: "uppercase",
            margin: "28px 0 0",
          }}
        >
          Full-stack developer
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 32,
            maxWidth: 520,
          }}
        >
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "#A39E94", margin: 0 }}>
            I&apos;m Aimen Boudjelida, a developer based in Algiers shipping web
            products end to end.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "#A39E94", margin: 0 }}>
            Node.js &amp; TypeScript from API to UI — built fast, tested, and
            deployed to production.
          </p>
        </div>
        <Link
          href="/#contact"
          className="pf-mono"
          style={{
            display: "inline-block",
            marginTop: 36,
            textDecoration: "none",
            color: "#F2EFE9",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            borderBottom: "2px solid #1FD7C0",
            paddingBottom: 4,
          }}
        >
          GET IN TOUCH →
        </Link>
      </div>

      <div
        style={{
          position: "relative",
          background: "#E9E5DC",
          borderRadius: 12,
          minHeight: 480,
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -54,
            top: "16%",
            width: 120,
            height: 260,
            borderRadius: 999,
            background: "#1FD7C0",
          }}
        />
        <Image
          src="/images/portrait.png"
          alt="Portrait of Aimen Boudjelida"
          width={520}
          height={620}
          priority
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "86%",
            width: "72%",
            objectFit: "cover",
            objectPosition: "50% 20%",
            borderRadius: "10px 10px 0 0",
            filter: "grayscale(1) contrast(1.08)",
          }}
        />
        <StickerBadge label="NODE.JS" bg="#FFD23F" rot={-8} pos={{ top: 26, left: 22 }} />
        <StickerBadge label="TYPESCRIPT" bg="#FF4D6D" rot={6} pos={{ top: "34%", right: 18 }} />
        <StickerBadge label="API DESIGN" bg="#1FD7C0" rot={-5} pos={{ bottom: "26%", left: 14 }} />
        <StickerBadge label="SHIPS FAST →" bg="#F2EFE9" rot={4} pos={{ bottom: 30, right: 26 }} />
        <span style={{ position: "absolute", top: 16, right: "36%" }}>
          <span
            className="pf-mono"
            style={{
              display: "grid",
              placeItems: "center",
              transform: "rotate(8deg)",
              width: 86,
              height: 86,
              borderRadius: "50%",
              background: "#141414",
              color: "#F2EFE9",
              textAlign: "center",
              fontSize: 9,
              letterSpacing: "0.1em",
              lineHeight: 1.6,
              boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
            }}
          >
            EST. 2019
            <br />
            ALGIERS
          </span>
        </span>
      </div>
    </div>
  </Section>
);

/* ─── Mission band + stats ───────────────────────────── */
const Mission = () => (
  <Section style={{ padding: "24px 40px 40px" }}>
    <div
      className="pf-reveal"
      style={{ background: "var(--band)", borderRadius: 16, padding: "64px 48px 48px", textAlign: "center" }}
    >
      <p
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(26px, 3vw, 38px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        My mission is to ship web products that are fast, reliable and accessible
        — code that holds up in production, not just in the demo.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 36,
          flexWrap: "wrap",
          marginTop: 48,
        }}
      >
        {["Node.js", "TypeScript", "Express", "NestJS", "PostgreSQL", "Docker", "AWS"].map(
          (t) => (
            <span
              key={t}
              style={{
                color: "rgba(255,255,255,0.75)",
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: "-0.02em",
              }}
            >
              {t}
            </span>
          )
        )}
      </div>
    </div>
    <StatsBand />
  </Section>
);

/* ─── Services ───────────────────────────────────────── */
const services = [
  {
    icon: "</>",
    num: "01",
    title: "Web Apps",
    desc: "Full-stack web applications in TypeScript — auth, dashboards, billing — designed, built and shipped end to end.",
  },
  {
    icon: "{ }",
    num: "02",
    title: "Mobile Apps",
    desc: "Cross-platform mobile apps with React Native — sharing one TypeScript codebase with your web product.",
  },
  {
    icon: ">_",
    num: "03",
    title: "Automation",
    desc: "Bots, scrapers, integrations and internal tools that remove the busywork — wired into the services you already use.",
  },
  {
    icon: "?",
    num: "04",
    title: "Consulting",
    desc: "Architecture reviews, code audits and technical roadmaps — a senior pair of eyes before you commit.",
  },
];

const Services = () => (
  <Section id="services" style={{ padding: "40px 40px 56px" }}>
    <div className="pf-reveal" style={{ textAlign: "center", marginBottom: 44 }}>
      <div
        className="pf-mono"
        style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--teal-ink)" }}
      >
        SERVICES
      </div>
      <h2
        style={{
          fontSize: "clamp(36px, 4.5vw, 56px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: "12px 0 0",
        }}
      >
        How can I help you ship?
      </h2>
    </div>
    <div className="pf-grid-2">
      {services.map((s) => (
        <div
          key={s.num}
          className="pf-reveal pf-lift"
          style={{
            background: "var(--surface)",
            borderRadius: 12,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 48,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div
              className="pf-mono"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "var(--btn)",
                color: "var(--inv)",
                display: "grid",
                placeItems: "center",
                fontSize: 15,
              }}
            >
              {s.icon}
            </div>
            <div style={{ fontSize: 56, fontWeight: 800, color: "var(--num)", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {s.num}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

/* ─── Selected work ──────────────────────────────────── */
const techChips = (techs: string[], n = 2) =>
  techs.slice(0, n).map((t) => (
    <span key={t} className="pf-chip">
      {t}
    </span>
  ));

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className="pf-mono"
    style={{ fontSize: 12, color: "var(--soft)" }}
  >
    {status}
  </span>
);

const ProjectThumb = ({
  project,
  height,
}: {
  project: (typeof projects)[number];
  height: number;
}) => (
  <Link
    href={`/projects/${project.id}`}
    style={{
      display: "block",
      position: "relative",
      height,
      borderRadius: 8,
      overflow: "hidden",
      textDecoration: "none",
      background:
        "repeating-linear-gradient(45deg, var(--stripe1), var(--stripe1) 14px, var(--stripe2) 14px, var(--stripe2) 28px)",
    }}
  >
    {project.images && project.images[0] ? (
      <Image
        src={project.images[0]}
        alt={project.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
    ) : (
      <span
        className="pf-mono"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          color: "var(--soft)",
        }}
      >
        {project.name}
      </span>
    )}
  </Link>
);

const SelectedWork = () => {
  const featured = projects.filter((p) => p.featured);
  const grid = featured.slice(0, Math.max(0, featured.length - 1));
  const hero = featured[featured.length - 1];

  return (
    <Section id="work" style={{ padding: "8px 40px 56px" }}>
      <div
        className="pf-reveal"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}
      >
        <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
          Selected work
        </h2>
        <Link href="/projects" className="pf-btn-outline" style={{ fontSize: 14, padding: "12px 24px" }}>
          See all →
        </Link>
      </div>

      <div className="pf-grid-2">
        {grid.map((project) => (
          <div
            key={project.id}
            className="pf-reveal pf-lift"
            style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "14px 14px 22px" }}
          >
            <ProjectThumb project={project} height={300} />
            <div style={{ padding: "18px 8px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Link href={`/projects/${project.id}`} style={{ textDecoration: "none", color: "var(--ink)" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
                    {project.name}
                  </h3>
                </Link>
                <StatusBadge status={project.status} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, alignItems: "center" }}>
                {techChips(project.technologies)}
                <span style={{ flex: 1 }} />
                <Link href={`/projects/${project.id}`} className="pf-btn" style={{ fontSize: 12, padding: "6px 13px" }}>
                  Case study →
                </Link>
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    className="pf-btn-outline"
                    style={{ fontSize: 12, padding: "6px 13px", borderWidth: 1.5 }}
                  >
                    GitHub ↗
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        {hero && (
          <div
            className="pf-reveal pf-lift"
            style={{
              gridColumn: "1 / -1",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 14,
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 24,
              alignItems: "center",
            }}
          >
            <ProjectThumb project={hero} height={280} />
            <div style={{ padding: "12px 18px 12px 0" }}>
              <div
                className="pf-mono"
                style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--teal-ink)", marginBottom: 10 }}
              >
                FEATURED
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <Link href={`/projects/${hero.id}`} style={{ textDecoration: "none", color: "var(--ink)" }}>
                  <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{hero.name}</h3>
                </Link>
                <StatusBadge status={hero.status} />
              </div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: "12px 0 0" }}>
                {hero.shortDescription}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18, alignItems: "center" }}>
                {techChips(hero.technologies, 3)}
                <span style={{ flex: 1 }} />
                <Link href={`/projects/${hero.id}`} className="pf-btn" style={{ fontSize: 12, padding: "6px 13px" }}>
                  Case study →
                </Link>
                {hero.links.live ? (
                  <a
                    href={hero.links.live}
                    target="_blank"
                    className="pf-btn-outline"
                    style={{ fontSize: 12, padding: "6px 13px", borderWidth: 1.5 }}
                  >
                    Live ↗
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

/* ─── Currently ──────────────────────────────────────── */
const CurrentlyCard = ({
  image,
  imageAlt,
  objectPosition,
  label,
  title,
  subtitle,
  linkLabel,
  href,
}: {
  image: string;
  imageAlt: string;
  objectPosition?: string;
  label: string;
  title: string;
  subtitle: string;
  linkLabel: string;
  href: string;
}) => (
  <div className="pf-reveal pf-lift" style={{ background: "var(--surface)", borderRadius: 12, padding: "14px 14px 20px" }}>
    <div style={{ position: "relative", width: "100%", height: 240, borderRadius: 8, overflow: "hidden" }}>
      <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition }} />
    </div>
    <div style={{ padding: "16px 6px 0" }}>
      <div className="pf-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--soft)" }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 17, marginTop: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{subtitle}</div>
      <a
        href={href}
        target="_blank"
        className="pf-mono"
        style={{
          display: "inline-block",
          marginTop: 14,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "var(--ink)",
          textDecoration: "none",
          borderBottom: "1.5px solid var(--teal)",
          paddingBottom: 2,
        }}
      >
        {linkLabel}
      </a>
    </div>
  </div>
);

const SpotifyCard = async () => {
  const { data: song } = await getNowPlaying();
  const recent = song.is_playing && song.item ? song.item : song.items?.[0]?.track;
  if (!recent) return null;

  const filter = new Filter();
  const title = (() => {
    try {
      return filter.clean(recent.name);
    } catch {
      return recent.name;
    }
  })();
  const artist = recent.artists?.map((a: { name: string }) => a.name).shift() as string;
  const songUrl = recent.external_urls?.spotify as string;
  const coverArt = recent.album?.images?.[0]?.url as string;
  const isLive = !!(song.is_playing && song.item);

  return (
    <CurrentlyCard
      image={coverArt || "/images/wildflower.jpg"}
      imageAlt={title}
      label={isLive ? "NOW PLAYING" : "LAST PLAYED"}
      title={title}
      subtitle={artist}
      linkLabel="VIEW ON SPOTIFY"
      href={songUrl || "https://open.spotify.com"}
    />
  );
};

const SpotifySkeleton = () => (
  <div style={{ background: "var(--surface)", borderRadius: 12, padding: "14px 14px 20px" }}>
    <Skeleton className="w-full rounded-lg" style={{ height: 240, borderRadius: 8 }} />
    <div className="space-y-2" style={{ padding: "16px 6px 0" }}>
      <Skeleton className="h-3 rounded-full" style={{ width: "40%" }} />
      <Skeleton className="h-4 rounded-full" style={{ width: "70%" }} />
      <Skeleton className="h-3 rounded-full" style={{ width: "50%" }} />
    </div>
  </div>
);

const Currently = () => (
  <Section style={{ padding: "0 40px 56px" }}>
    <div
      className="pf-reveal"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 16, flexWrap: "wrap" }}
    >
      <div>
        <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
          Currently
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", margin: "8px 0 0" }}>What I&apos;m into right now</p>
      </div>
      <Link href="/about" className="pf-btn-outline" style={{ fontSize: 14, padding: "12px 24px" }}>
        More about me →
      </Link>
    </div>
    <div className="pf-grid-3">
      <Suspense fallback={<SpotifySkeleton />}>
        <SpotifyCard />
      </Suspense>
      <CurrentlyCard
        image="/images/bcs.jpg"
        imageAlt="Better Call Saul"
        objectPosition="50% 20%"
        label="WATCHING"
        title="Better Call Saul"
        subtitle="Vince Gilligan"
        linkLabel="VIEW ON IMDB"
        href="https://www.imdb.com/title/tt3032476/"
      />
      <CurrentlyCard
        image="/images/witcher3.jpg"
        imageAlt="The Witcher 3"
        label="PLAYING"
        title="The Witcher 3"
        subtitle="CD Projekt Red"
        linkLabel="VIEW ON STEAM"
        href="https://store.steampowered.com/app/292030"
      />
    </div>
  </Section>
);

/* ─── Experience ─────────────────────────────────────── */
const Experience = () => (
  <Section id="experience" style={{ padding: "0 40px 56px" }}>
    <div className="pf-reveal pf-exp-grid">
      <div
        style={{
          background: "var(--btn)",
          borderRadius: 12,
          padding: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <h2
          style={{
            color: "var(--inv)",
            fontSize: "clamp(30px, 3.5vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Wanna see my experience?
        </h2>
        <div>
          <a
            href={CV_LINK}
            target="_blank"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "var(--inv)",
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 700,
              padding: "13px 26px",
              borderRadius: 999,
            }}
          >
            Download résumé ↓
          </a>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        {experiences.map((role) => (
          <div
            key={role.company}
            className="pf-lift"
            style={{
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "22px 26px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "var(--chip)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: 14,
                color: "var(--muted)",
                flexShrink: 0,
              }}
            >
              {role.company[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{role.role}</div>
              <div style={{ fontSize: 13, color: "var(--soft)", marginTop: 2 }}>{role.company}</div>
            </div>
            <div className="pf-mono" style={{ fontSize: 12, color: "var(--soft)", whiteSpace: "nowrap" }}>
              {role.range}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

/* ─── Contact ────────────────────────────────────────── */
const Contact = () => (
  <Section id="contact" style={{ padding: "0 40px 56px" }}>
    <div
      className="pf-reveal pf-contact-grid"
      style={{
        background: "linear-gradient(180deg, var(--lav1) 0%, var(--lav2) 100%)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "64px 48px",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Let&apos;s build something that ships
        </h2>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.6, margin: "20px 0 0", maxWidth: 400 }}>
          Tell me about your project and I&apos;ll get back to you within 24 hours
          with a plan and an estimate.
        </p>
      </div>
      <ContactForm />
    </div>
  </Section>
);

/* ─── Footer ─────────────────────────────────────────── */
const Footer = () => (
  <footer className="pf-section" style={{ padding: "0 40px 40px" }}>
    <div className="pf-reveal pf-footer-grid">
      <div
        style={{
          background: "var(--surface)",
          borderRadius: 16,
          padding: 44,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(30px, 3.5vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Let&apos;s connect and chat
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a
            href="mailto:aymene16boudjelida@gmail.com"
            style={{
              textDecoration: "none",
              color: "var(--ink)",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              borderBottom: "2px solid var(--ink)",
              paddingBottom: 2,
              wordBreak: "break-all",
            }}
          >
            aymene16boudjelida@gmail.com
          </a>
          <a
            href="mailto:aymene16boudjelida@gmail.com"
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "var(--btn)",
              color: "var(--inv)",
              display: "grid",
              placeItems: "center",
              fontSize: 22,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            →
          </a>
        </div>
      </div>
      <SocialPills />
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 28,
        padding: "0 8px",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image src="/favicon.ico" alt="Logo" width={34} height={34} style={{ borderRadius: 8, display: "block" }} />
        <span className="pf-mono" style={{ fontSize: 12, color: "var(--soft)" }}>
          ©&apos;19 — 2026 · AIMEN BOUDJELIDA
        </span>
      </div>
      <Link href="/#contact" className="pf-btn" style={{ fontSize: 13, padding: "11px 22px" }}>
        Start a project →
      </Link>
    </div>
  </footer>
);

/* ─── Page ───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Services />
      <SelectedWork />
      <Currently />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
