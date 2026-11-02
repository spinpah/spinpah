"use client";

import React from "react";
import Image from "next/image";
import type { WorkProject } from "@/lib/work";

// A project screenshot, or a typographic cover for projects without one.
// With `video`, the project's preview video sits over the screenshot: "playing"
// restarts it, "paused" lets it run on briefly (so it keeps moving while it fades
// out) and then stops it.
export default function ProjectMedia({
  project,
  image,
  sizes,
  priority,
  kicker,
  video: videoState,
}: {
  project: WorkProject;
  image?: string;
  sizes: string;
  priority?: boolean;
  kicker?: string;
  video?: "playing" | "paused";
}) {
  const src = image ?? project.images?.[0];
  const video = videoState && !image ? project.video : undefined;
  const ref = React.useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = React.useState(false);

  // The server-rendered <video> can finish loading before hydration attaches
  // onLoadedData, so check its state once mounted too.
  React.useEffect(() => {
    if ((ref.current?.readyState ?? 0) >= 2) setReady(true);
  }, [video]);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (videoState === "playing") {
      v.currentTime = 0;
      v.play().catch(() => {});
      return;
    }
    const id = window.setTimeout(() => v.pause(), 900);
    return () => window.clearTimeout(id);
  }, [videoState, video]);

  if (src) {
    return (
      <>
        <Image
          src={src}
          alt={`${project.name} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        {video && (
          <video
            ref={ref}
            src={video}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onLoadedData={() => setReady(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              opacity: ready ? 1 : 0,
              transition: "opacity .5s ease",
            }}
          />
        )}
      </>
    );
  }
  return (
    <div className="lg-cover" role="img" aria-label={project.name}>
      <div className="lg-cover-kicker">{kicker ?? project.category}</div>
      <div className="lg-cover-title">{project.name}</div>
      <div className="lg-cover-tags">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  );
}
