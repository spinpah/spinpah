export const dynamic = "force-dynamic";

import { Suspense } from "react";
import type { Metadata } from "next/types";
import Filter from "bad-words";
import getNowPlaying from "@/lib/spotify";
import AboutView from "@/components/liquid/about-view";
import NowRow from "@/components/liquid/now-row";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "https://spinpah.com/about" },
};

const SpotifyNow = async () => {
  const { data: song } = await getNowPlaying();
  const recent = song.is_playing && song.item ? song.item : song.items?.[0]?.track;
  if (!recent) return null;

  const title = (() => {
    try {
      return new Filter().clean(recent.name);
    } catch {
      return recent.name;
    }
  })();

  return (
    <NowRow
      kind="listening"
      title={title}
      subtitle={recent.artists?.map((a: { name: string }) => a.name).shift() ?? ""}
      image={recent.album?.images?.[0]?.url || "/images/wildflower.jpg"}
      href={recent.external_urls?.spotify || "https://open.spotify.com"}
    />
  );
};

export default function About() {
  return (
    <AboutView
      listening={
        <Suspense fallback={null}>
          <SpotifyNow />
        </Suspense>
      }
    />
  );
}
