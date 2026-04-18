'use client';

// components/ScrollingGallery.tsx
//
// Continuous right-to-left auto-scrolling strip for Personal Sessions.
// - Images are blurred by default
// - On hover: blur clears, scroll pauses, subtle scale-up
// - Two identical rows of images duplicated to create seamless infinite loop
// - Pure CSS animation — no JS timers, no requestAnimationFrame

import Image from 'next/image';
import { useMemo } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

// Fisher-Yates shuffle — returns a new randomly ordered array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScrollingGallery({ images }: { images: GalleryImage[] }) {
  // Shuffle once per mount — different order on every page visit
  const shuffled = useMemo(() => shuffle(images), [images]);

  // Duplicate shuffled images enough times to fill any screen width seamlessly.
  // We need at least ~20 items for the loop to feel infinite on large screens.
  const repeatCount = Math.max(1, Math.ceil(20 / shuffled.length));
  const strip = Array.from({ length: repeatCount }, () => shuffled).flat();

  return (
    <div className="w-full overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>

      {/* ── Single scrolling row ── */}
      <div className="flex gap-3 w-max animate-scroll-left">

        {/* First copy */}
        {strip.map((img, i) => (
          <ScrollCard key={`a-${img.id}-${i}`} img={img} />
        ))}

        {/* Second copy — seamless loop */}
        {strip.map((img, i) => (
          <ScrollCard key={`b-${img.id}-${i}`} img={img} />
        ))}

      </div>

      {/* ── Tailwind keyframe injected via style tag ── */}
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function ScrollCard({ img }: { img: GalleryImage }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden group cursor-default"
      style={{ width: '320px', height: '420px' }}
    >
      {/* ── Image — blurred by default, clears on hover ── */}
      <Image
        src={img.url}
        alt="Personal session"
        fill
        className="
          object-cover
          scale-110
          blur-md
          transition-all duration-700 ease-out
          group-hover:blur-0
          group-hover:scale-105
        "
        sizes="320px"
        loading="lazy"
      />

      {/* ── Dark scrim — fades out on hover ── */}
      <div className="
        absolute inset-0
        bg-black/30
        transition-opacity duration-700
        group-hover:opacity-0
      " />

      {/* ── 'Hover to reveal' hint — visible when blurred, hides on hover ── */}
      <div className="
        absolute inset-0
        flex flex-col items-center justify-center gap-2
        transition-opacity duration-500
        group-hover:opacity-0
        pointer-events-none
      ">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <rect x="1" y="9" width="16" height="12" rx="2.5"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"
            fill="rgba(255,255,255,0.08)" />
          <path d="M5 9V6.5a4 4 0 0 1 8 0V9"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"
            strokeLinecap="round" />
        </svg>
        <span className="
          font-mono text-[9px] tracking-[0.25em] uppercase
          text-white/40
        ">
          hover to reveal
        </span>
      </div>

      {/* ── Booking CTA — appears on hover at bottom ── */}
      <div className="
        absolute bottom-0 left-0 right-0
        px-5 py-4
        bg-gradient-to-t from-black/70 to-transparent
        opacity-0 translate-y-2
        transition-all duration-500
        group-hover:opacity-100
        group-hover:translate-y-0
        pointer-events-none
      ">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50 text-center">
          Personal session
        </p>
      </div>
    </div>
  );
}
