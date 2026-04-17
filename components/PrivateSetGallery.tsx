'use client';

// components/PrivateSetGallery.tsx
//
// Used ONLY for private/commissioned sets (e.g. Maternity).
// Renders the same masonry-column grid as SetGallery, but:
//  - Every image is blurred (blur + scale to hide edges)
//  - A lock icon + "Private Work" label overlays each image
//  - Clicking does NOT open a lightbox — private images stay private
//  - Hover shows a subtle "Client session — private" tooltip

import Image from 'next/image';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export default function PrivateSetGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="break-inside-avoid relative overflow-hidden group cursor-default"
          // cursor-default signals to the visitor this is not clickable
        >
          {/* ── Blurred image ── */}
          <Image
            src={img.url}
            alt="Private commissioned work"   // generic alt — no identifying info
            width={1200}
            height={800}
            className="w-full h-auto block blur-md scale-110 transition-transform duration-700 group-hover:scale-[1.12]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />

          {/* ── Dark scrim so lock icon is visible ── */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

          {/* ── Lock icon + label — centre of image ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            {/* Lock SVG */}
            <div className="w-9 h-9 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                <rect x="0.9" y="6.5" width="11.2" height="7.5" rx="1.75"
                  stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />
                <path d="M3.5 6.5V4.5a3 3 0 0 1 6 0v2"
                  stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Label — always visible */}
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70">
              Private Work
            </span>
          </div>

          {/* ── Hover tooltip — bottom strip ── */}
          <div className="
            absolute bottom-0 left-0 right-0
            bg-black/60 backdrop-blur-sm
            px-4 py-2.5
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            pointer-events-none
          ">
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/45 text-center">
              Client session · images protected
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
