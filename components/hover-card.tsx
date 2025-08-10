"use client";
import { Books, Pause, Play, SpotifyLogo } from "@phosphor-icons/react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import React from "react";


export const GamingCard = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  author: string;
  cover: string;
  gameUrl?: string; // Add this for the link
}) => {
  const { title, author, cover, gameUrl } = props;
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardContentData src={cover} title={title} author={author} />
        <div className="flex gap-x-0.5 items-center">
          {gameUrl && (
            <a
              href={gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-1 text-sm bg-gray-12 justify-center w-full text-gray-5 py-1 rounded-sm font-medium hover:bg-gray-11 transition-colors duration-100 whitespace-nowrap"
            >
              🎮 Play Game
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};




export const ReadingCard = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  author: string;
  slug: string;
  cover: string;
}) => {
  const { title, author, slug, cover } = props;
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardContentData src={cover} title={title} author={author} />
        <div className="flex gap-x-0.5 items-center">
          <a
            href={`https://literal.club/ms/book/${slug}`}
            target="_blank"
            className="flex items-center gap-x-1 text-sm bg-gray-12 justify-center w-full text-gray-5 py-1 rounded-sm font-medium hover:bg-gray-11 transition-colors duration-100 whitespace-nowrap"
          >
            <Books className="shrink-0" aria-hidden={true} />
            See on Literal
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const MusicCard = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  artist: string;
  coverArt: string;
  previewUrl?: string;
  songUrl?: string;
}) => {
  const { title, artist, coverArt, previewUrl, songUrl } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = React.useState(1); // Default 100%

  React.useEffect(() => {
    if (previewUrl) {
      const audioInstance = new Audio(previewUrl);
      audioInstance.volume = volume;
      setAudio(audioInstance);
    }
  }, [previewUrl]);

  // Update volume on change
  React.useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  const handlePlay = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
      setIsPlaying(true);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardContentData src={coverArt} title={title} author={artist} />

        {/* Play + Spotify Link */}
        <div className="flex gap-x-0.5 items-center">
          <button
            className="bg-[#01543f] hover:bg-[#01543f]/80 transition text-gray-1 py-1 flex items-center justify-center rounded-sm w-1/4 self-stretch"
            onClick={handlePlay}
            disabled={!previewUrl}
          >
            {isPlaying ? (
              <Pause className="shrink-0" size={12} weight="fill" />
            ) : (
              <Play className="shrink-0" size={12} weight="fill" />
            )}
          </button>

          <a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 text-sm bg-gray-12 justify-center w-full text-gray-5 py-1 rounded-sm font-medium hover:bg-gray-11 transition-colors duration-100 whitespace-nowrap"
          >
            <SpotifyLogo className="shrink-0" aria-hidden={true} />
            Listen on Spotify
          </a>
        </div>

        {/* Volume Slider */}
{previewUrl && (
  <div className="mt-2 flex items-center w-full">
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      onChange={(e) => setVolume(parseFloat(e.target.value))}
      className="w-full h-[10px] rounded-lg appearance-none cursor-pointer 
        bg-gradient-to-r from-cyan-400 to-cyan-400
        [background-size:calc(var(--val)*100%)_100%]
        [background-repeat:no-repeat]
        bg-gray-700"
      style={{
        // This dynamically updates the fill length
        // `--val` will be replaced with the current percentage
        '--val': volume.toString(),
      } as React.CSSProperties}
    />
    <style jsx>{`
      input[type='range'] {
        --val: 0;
      }
      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 5px;
        height: 10px;
        background: cyan;
        
        cursor: pointer;
        margin-top: -3px; /* centers the knob */
      }
      input[type='range']::-moz-range-thumb {
        width: 5px;
        height: 10px;
        background: cyan;
        
        cursor: pointer;
      }
    `}</style>
  </div>
)}

      </HoverCardContent>
    </HoverCard>
  );
};


const HoverCardTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCardPrimitive.Trigger asChild>{children}</HoverCardPrimitive.Trigger>
  );
};

const HoverCardContentData = ({
  src,
  title,
  author,
}: {
  src: string;
  title: string;
  author: string;
}) => {
  return (
    <>
      <div className="aspect-square border rounded-[3px] overflow-hidden relative">
        <Image
          src={src}
          fill
          className="object-cover object-center"
          alt={`Album art for ${title} by ${author}`}
          quality={50}
        />
      </div>
      <div className="text-gray-1 mt-2 mb-1">
        <span className="font-medium leading-none block truncate">{title}</span>
        <span className="text-sm text-gray-10">by {author}</span>
      </div>
    </>
  );
};

const HoverCardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className="w-40 h-fit bg-[#0f0f0f] shadow-xs text-gray-12 rounded-[4px] pt-1 pb-1.5 px-1 border border-gray-12 outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        sideOffset={5}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

const HoverCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCardPrimitive.Root openDelay={200}>
      {children}
    </HoverCardPrimitive.Root>
  );
};
