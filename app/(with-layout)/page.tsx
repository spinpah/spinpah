import { unstable_noStore as noStore } from "next/cache";
import React, { Suspense } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  ScribbleLoop,
} from "@phosphor-icons/react/dist/ssr/index";
import { Accordion, AccordionItem } from "@/components/collapsible";
import { MusicCard, ReadingCard , GamingCard } from "@/components/hover-card";
import Contact, {
  ContactCopyItem,
  ContactItem,
} from "@/components/contact-link";
import { experiences, photos } from "@/content";
import LinkPrimitive from "@/components/link-primitive";
import { getShelves } from "@/lib/literal";
import getLastPlayed from "@/lib/spotify";
import { getGame } from "@/lib/game";
import Filter from "bad-words";
import Gallery from "@/components/gallery";
import Section from "@/components/section";
import Skeleton from "@/components/skeleton";

// export const dynamic = "force-dynamic";

const SecurityWork = () => {
  return (
    <>
      <Section heading="Security Research" className="shrink-0">
        <div className="flex flex-col gap-y-1.5">
          <p>
            I specialize in ethical hacking, endpoint security, and network defense,
            with a focus on practical cybersecurity applications and research.
          </p>
          <span>
            <span className="font-medium">Key areas of expertise include</span>
            <ul>
              <li className="relative flex items-center before:w-1 before:h-1 before:bg-accent before:rounded-full before:leading-none gap-x-2 ">
                penetration testing and vulnerability assessment
              </li>
              <li className="relative flex items-center before:w-1 before:h-1 before:bg-accent before:rounded-full before:leading-none gap-x-2 ">
                cryptographic mechanisms and security protocols
              </li>
              <li className="relative flex items-center before:w-1 before:h-1 before:bg-accent before:rounded-full before:leading-none gap-x-2 ">
                firewall technologies and network defense
              </li>
            </ul>
          </span>
          <p>
            My research focuses on developing innovative solutions for digital security
            challenges and contributing to the cybersecurity community through open-source projects.
          </p>
          
        </div>
      </Section>
      <Gallery photos={photos} />
    </>
  );
};

const Items = () => {
  return (
    <Section>
      <h1 className="font-medium flex items-center gap-x-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-accent" />
        Boudjelida Aimen Mohamed Said
      </h1>
      <p className="mt-1 text-gray-9">
        Cybersecurity Engineer - Gamer
      </p>
      <div className="flex flex-col mt-4 gap-y-2">
        <p>
        Passionate cybersecurity engineer with a solid foundation and hands-on experience gained through projects and
        solving CTFs (TryHackMe, HackTheBox, RootMe, etc.). Curious, proactive, and detail-oriented, applying
        penetration tests to detect vulnerabilities, propose effective solutions, and collaborate efficiently within a team.
        </p>
        
        <div className="flex gap-x-6 mt-2 items-center">
          <LinkPrimitive href="/about" variant="route">
            Learn a bit more
            <ArrowRight size={12} aria-hidden={true} />
          </LinkPrimitive>

          <LinkPrimitive href="/visitors" variant="route">
            Sign the visitor's log
            <ScribbleLoop size={12} aria-hidden={true} />
          </LinkPrimitive>
          <ContactItem icon={<Copy />} className="text-sm">
            <ContactCopyItem title="Email me" copy="aymene16boudjelida@gmail.com" />
          </ContactItem>
        </div>
      </div>
    </Section>
  );
};

const Experience = () => {
  return (
    <Section heading="Experience">
      <Accordion className="flex flex-col w-[calc(100%+16px)] -mx-2">
        {experiences.map((role) => (
          <React.Fragment key={role.company}>
            <AccordionItem
              role={role.role}
              company={role.company}
              range={role.range}
              description={role.description}
              skills={role.skills}
              
            />
            <div className="h-px bg-gray-12 w-[calc(100%-16px)] mx-auto" />
          </React.Fragment>
        ))}
      </Accordion>
    </Section>
  );
};

const Projects = () => {
  return (
    <Section heading="Projects">
      <ul className="flex flex-col gap-y-6">
        <li>
          <p>
            <LinkPrimitive href="https://sgameshelf.vercel.app" >
            GAMESHELF   
            </LinkPrimitive>{" "}
             designed for gamers to discover, rate, and review their favorite games. Think of it as your personal gaming shelf — where every title you've played or plan to play has a place.
          </p>
        </li>
        <li>
          <p>
            <LinkPrimitive href="" >
            Penetration Testing and Security Audit Report   
            </LinkPrimitive>{" "}
            is a Security audit of a vulnerable machine, identification and exploitation of vulnerabilities to simulate attacks and
            assess impact. Proposed remediation strategies to strengthen system security.
          </p>
        </li>
        <li>
          <p>
            <LinkPrimitive
              href=""
               >
              Implementation of a Secure Social Network Web Application  
            </LinkPrimitive>{" "}
          </p>
        </li>
        <li>
          <p>
            <LinkPrimitive
              href=""
               >
              Design and Security of a Three-Tier Network  
            </LinkPrimitive>{" "}
            is a Designed and secured a Three-Tier network using GNS3, with dynamic routing, VLANs, firewalls, and penetration
            testing to assess resistance to DDoS attacks.
          </p>
        </li>
        <li>
          <p>
            <LinkPrimitive
              href=""
               >
              Secure Wi-Fi Access with RADIUS   
            </LinkPrimitive>{" "}
            Configured RADIUS authentication on Windows Server 2012 R2 to secure 802.1X Wi-Fi access, with Active
            Directory integration and security policy enforcement.
          </p>
        </li>
        <li>
          <p>
            <LinkPrimitive
              href=""
            >
              Mobile Subscription Management App – Setram Algiers
            </LinkPrimitive>{" "}
            Developed a Flutter-based mobile application for Setram Algiers to enable
            users to manage subscriptions and subscribe directly through the app,
            improving accessibility and streamlining service usage.
          </p>
        </li>

      </ul>
    </Section>
  );
};

const Currently = async () => {
  noStore();
  const { reading } = await getShelves();
  const { data: song } = await getLastPlayed();
  const filter = new Filter();
  const { playing } = await getGame(); 

  const recent = song.is_playing ? song.item : song.items[0].track;
  const track = {
    title: filter.clean(recent.name),
    artist: recent.artists
      .map((_artist: { name: string }) => _artist.name)
      .shift(),
    songUrl: recent.external_urls.spotify,
    coverArt: recent.album.images[0].url,
    previewUrl: recent.preview_url,
  };

  return (
    <>
      <p className="first-letter:uppercase">
        Listening to{" "}
        <MusicCard {...track}>
          <LinkPrimitive href={track.songUrl} external popover>
            {track.title}
          </LinkPrimitive>
        </MusicCard>{" "}
        by {track.artist} and slowly reading{" "}
        <ReadingCard {...reading}>
          <LinkPrimitive
            href={`https://literal.club/book/tokyo-ghoul-nlnfh`}
            external
            popover
          >
            {reading.title}
          </LinkPrimitive>
        </ReadingCard>{" "}
        by {reading.author} While playing {" "}
        <GamingCard {...playing}>
          <LinkPrimitive href={'https://store.steampowered.com/app/214490/Alien_Isolation'} external
            popover>
            {playing.title}
          </LinkPrimitive>
        </GamingCard>{" "}
        .
      </p>
    </>
  );
};

const Footer = () => {
  return (
    <Section>
      <div className="max-w-xs mt-12 text-sm text-gray-11 md:mt-0">
        Last updated on{" "}
        <Suspense fallback={<Skeleton className="inline-flex w-24 h-4" />}>
          <FooterDate />
        </Suspense>
        .
      </div>
    </Section>
  );
};

const FooterDate = async () => {
  const data = await fetch(
    "https://api.github.com/repos/spinpah/spinpah/commits",
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  ).then((res) => res.json());

  if (data.message) {
    // fallback if rate-limited or error
    return (
      <LinkPrimitive href="https://github.com/spinpah/spinpah" external>
        2025/08/09
      </LinkPrimitive>
    );
  }

  const lastCommit = data[0];
  const lastCommitDate = new Date(
    lastCommit.commit.committer.date
  ).toLocaleDateString();

  const lastCommitUrl = lastCommit.html_url;

  return (
    <LinkPrimitive href={lastCommitUrl} external>
      {lastCommitDate}
    </LinkPrimitive>
  );
};


export default function Home() {
  return (
    <div className="justify-between md:flex animate-in fade-in duration-500 select">
      <div className="md:max-w-[450px] flex flex-col md:gap-y-0 gap-y-6">
        <Items />
        <Section heading="Currently">
          <Suspense
            fallback={
              <div className="flex flex-wrap items-center gap-x-1">
                Listening to <Skeleton className="inline-flex w-24 h-4" />
                by <Skeleton className="inline-flex w-12 h-4" /> and slowly
                reading <Skeleton className="inline-flex w-24 h-4" /> by{" "}
                <Skeleton className="inline-flex w-24 h-4" />.
              </div>
            }
          >
            <Currently />
          </Suspense>
        </Section>
        <Experience />
        <Projects />
        <SecurityWork />
        <Footer />
      </div>
      <aside className="md:max-w-[450px] md:text-right">
        <Contact />
      </aside>
    </div>
  );
}
