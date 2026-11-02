"use client";

import React from "react";
import Image from "next/image";
import {
  beliefs,
  bucketList,
  currently,
  experiences,
  profile,
  services,
  stack,
  stats,
  Status,
  studies,
} from "@/content";
import NowRow from "./now-row";
import { ArrowUpRight } from "./icons";
import { usePrefs } from "./prefs";

const Block = ({ label, gap = 10, children }: { label: string; gap?: number; children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>
    <div className="lg-label">{label}</div>
    {children}
  </div>
);

// `listening` is rendered on the server (live Spotify data) and slotted in here.
export default function AboutView({ listening }: { listening: React.ReactNode }) {
  const { t, lang } = usePrefs();

  return (
    <div className="lg-about">
      <div className="lg-about-intro">
        <p style={{ fontSize: 20, fontWeight: 300, lineHeight: 1.45, letterSpacing: "-.01em", margin: 0 }}>{t.intro}</p>
        <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.6, margin: 0 }}>{t.mission}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          <a href={profile.upwork} target="_blank" rel="noreferrer" className="lg-glass lg-pill">
            {t.hire}
            <ArrowUpRight />
          </a>
          <a href={`mailto:${profile.email}`} className="lg-glass lg-pill">
            {t.contact}
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, paddingTop: 6 }}>

        <Block label={t.impact} gap={14}>
          <div className="lg-stats">
            {stats.map((s) => (
              <div key={s.key} className="lg-stat">
                <div style={{ fontSize: 22, fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "var(--mute)" }}>{t[s.key]}</div>
              </div>
            ))}
          </div>
        </Block>

        <Block label={t.experience}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {experiences.map((role) => (
              <div key={role.company} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div className="lg-now-art" style={{ width: 40, height: 40, borderRadius: 12 }}>
                  <Image src={role.logo} alt={`${role.company} logo`} fill sizes="40px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <div className="lg-row" style={{ fontSize: 14 }}>
                    <span style={{ fontWeight: 500 }}>
                      {role.role[lang]} · {role.company}
                    </span>
                    <span>{role.range[lang]}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55 }}>{role.description[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block label={t.studies}>
          <div className="lg-lines">
            {studies.map((s) => (
              <div key={s.title.en} className="lg-row">
                <span>— {s.title[lang]}</span>
                <span>{s.range[lang]}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block label={t.services}>
          <div className="lg-lines">
            {services.map((s) => (
              <div key={s.title.en}>
                — <span style={{ fontWeight: 500 }}>{s.title[lang]}</span>
                <span style={{ color: "var(--mute)" }}>: {s.desc[lang]}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block label={t.stack} gap={12}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {stack.map((k) => (
              <div key={k.name} className="lg-icon" title={k.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={k.icon} alt={k.name} loading="lazy" data-invert={"invert" in k ? "" : undefined} />
              </div>
            ))}
          </div>
        </Block>

        <Block label={t.now}>
          <div style={{ display: "grid", gap: 10 }}>
            {listening}
            {currently.map((c) => (
              <NowRow key={c.key} kind={c.key} title={c.title} subtitle={c.subtitle} image={c.image} href={c.href} />
            ))}
          </div>
        </Block>

        <Block label={t.beliefs}>
          <div className="lg-lines" style={{ color: "var(--mute)" }}>
            {beliefs.map((b) => (
              <div key={b.en}>— {b[lang]}</div>
            ))}
          </div>
        </Block>

        <Block label={t.bucket}>
          <div className="lg-lines">
            {bucketList.map((b) => {
              const s = Status[b.status];
              return (
                <div key={b.item.en} className="lg-row">
                  <span
                    style={
                      s === "completed"
                        ? { color: "var(--soft)", textDecoration: "line-through" }
                        : s === "progress"
                        ? undefined
                        : { color: "var(--mute)" }
                    }
                  >
                    — {b.item[lang]}
                  </span>
                  <span>{s === "progress" ? t.inProgress : s === "completed" ? t.done : ""}</span>
                </div>
              );
            })}
          </div>
        </Block>
      </div>
    </div>
  );
}
