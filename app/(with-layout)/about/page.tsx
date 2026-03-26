import { beliefs, bucketList, Status } from "@/content";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr/index";
import { cva } from "class-variance-authority";
import Link from "next/link";
import type { Metadata } from "next/types";
import Gallery from "@/components/gallery";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "https://spinpah.vercel.app/about" },
};

const bucketItemStyles = cva(
  ["text-sm", "leading-relaxed", "flex", "items-center", "gap-x-2"],
  {
    variants: {
      status: {
        none:      [],
        completed: ["line-through", "opacity-40"],
        progress:  [
          "before:content-['']",
          "before:w-2",
          "before:h-2",
          "before:rounded-full",
          "before:animate-pulse",
          "before:shrink-0",
          "before:bg-[#10B981]",
        ],
      },
    },
  }
);

const BucketItem = ({
  item,
  status,
}: {
  item: string;
  status: keyof typeof Status;
}) => (
  <li
    className={bucketItemStyles({ status: Status[status] })}
    style={{ color: "var(--ds-text-muted)" }}
  >
    {item}
  </li>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--ds-text)" }}>
    {children}
  </h2>
);

export default function About() {
  return (
    <div>
      {/* Back */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: "var(--ds-text-muted)" }}
        >
          <ArrowLeft size={15} /> Back
        </Link>
      </div>

      {/* Hero */}
      <section className="pb-16 flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
        <div className="flex-1 space-y-5">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--ds-text-muted)" }}
          >
            About Me
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight"
            style={{ color: "var(--ds-text)" }}
          >
            Software
            <br />
            Engineer &amp;{" "}
            <span style={{ color: "var(--ds-text-muted)" }}>Gamer.</span>
          </h1>
          <p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: "var(--ds-text-muted)" }}
          >
            Hey, I&apos;m Aimen — a software engineer based in Algeria,
            passionate about building modern, impactful applications.
          </p>
        </div>

        <div className="shrink-0">
          <div
            className="w-52 h-64 rounded-3xl overflow-hidden"
            style={{ background: "var(--ds-surface)" }}
          >
            <Image
              src="/images/me-1.jpg"
              alt="Aimen Boudjelida"
              width={208}
              height={256}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Bio */}
      <section
        className="py-12 border-t space-y-4"
        style={{ borderColor: "var(--ds-border)" }}
      >
        <SectionHeading>Biography</SectionHeading>
        <div
          className="max-w-2xl space-y-4 text-base leading-relaxed"
          style={{ color: "var(--ds-text-muted)" }}
        >
          <p>
            My passion for software development started with a curiosity about
            how applications are built and optimized to provide great user
            experiences. I believe in the power of technology to create
            impactful solutions that improve everyday life.
          </p>
          <p>
            Having completed my Master&apos;s in Information Systems Security
            at Université Houari Boumediene, I focus on full-stack web and
            mobile development, API design, and cloud integration.
          </p>
          <p>
            Committed to continuous learning and contributing to the developer
            community through open-source projects, research, and knowledge
            sharing.
          </p>
        </div>
      </section>

      {/* Beliefs */}
      <section
        className="py-12 border-t"
        style={{ borderColor: "var(--ds-border)" }}
      >
        <SectionHeading>Beliefs</SectionHeading>
        <ul className="max-w-2xl space-y-5">
          {beliefs.map((belief, i) => (
            <li
              key={belief}
              className="flex items-start gap-4 group"
            >
              <span
                className="text-xs font-bold tabular-nums mt-0.5 w-5 shrink-0 opacity-30"
                style={{ color: "var(--ds-text)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-base leading-relaxed group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--ds-text-muted)" }}
              >
                {belief}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Bucket List */}
      <section
        className="py-12 border-t"
        style={{ borderColor: "var(--ds-border)" }}
      >
        <SectionHeading>Bucket List</SectionHeading>
        <ul className="max-w-sm space-y-3">
          {bucketList.map((item) => (
            <BucketItem
              key={item.item}
              item={item.item}
              status={item.status}
            />
          ))}
        </ul>
      </section>

      {/* Photos */}
      <section
        className="py-12 border-t"
        style={{ borderColor: "var(--ds-border)" }}
      >
        <SectionHeading>Photos</SectionHeading>
        <Gallery
          photos={[
            { src: "/images/861.png", alt: "Aimen working on projects" },
            { src: "/images/862.png", alt: "Aimen working on projects" },
            { src: "/images/863.png", alt: "Aimen in a professional environment" },
            { src: "/images/864.png", alt: "Aimen in a professional environment" },
          ]}
        />
      </section>

      {/* CTA */}
      <section
        className="py-12 border-t"
        style={{ borderColor: "var(--ds-border)" }}
      >
        <div
          className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
          style={{ background: "var(--ds-surface)" }}
        >
          <div>
            <h3
              className="text-2xl font-extrabold mb-2"
              style={{ color: "var(--ds-text)" }}
            >
              Want to work together?
            </h3>
            <p className="text-sm" style={{ color: "var(--ds-text-muted)" }}>
              I&apos;m available for freelance projects and collaborations.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="mailto:aymene16boudjelida@gmail.com"
              className="btn-primary"
            >
              Start a Project
            </a>
            <a
              href="https://drive.google.com/file/d/1gh1p-ekzjdjCEayBVRA5BpMiOiEpNMss/view?usp=sharing"
              target="_blank"
              className="btn-secondary flex items-center gap-1"
            >
              View CV <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
