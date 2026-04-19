// app/sets/page.tsx
import type { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { getFeaturedSets } from "@/lib/cloudinary";

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Featured Collections',
  description:
    'Curated photography collections by Anbuselvan Sivaraju — Landscape, Black & White, Lifescape, Wildlife, and Drone photography from travels across 35+ countries.',
  alternates: { canonical: 'https://anbuselvan-sivaraju.vercel.app/sets' },
  openGraph: {
    title: 'Featured Collections | Anbuselvan Sivaraju',
    description:
      'Browse curated photography collections — landscape, street, drone, wildlife, and black & white photography.',
    url: 'https://anbuselvan-sivaraju.vercel.app/sets',
    images: [
      {
        url: 'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/Iceland%20greenery%20near%20waterfall',
        width: 1200,
        height: 630,
        alt: 'Iceland landscape photograph — Featured Sets by Anbuselvan Sivaraju',
      },
    ],
  },
};

export default async function SetsPage() {
  const sets = await getFeaturedSets();

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="font-display tracking-[0.25em] text-white/40 uppercase mb-4">
            Curated Work
          </p>
          <h1 className="font-display text-5xl font-normal text-white/90 mb-8">
            Featured Collections
          </h1>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sets.map((set) => (
            <Link
              key={set.slug}
              href={`/sets/${set.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">

                {set.coverImage && (
                  <Image
                    src={set.coverImage}
                    alt={`${set.title} photography by Anbuselvan Sivaraju`}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                      set.isPrivate ? "blur-sm scale-110" : ""
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}

                {/* Gradient overlay — always present */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* PRIVATE badge — top-left corner, only for private sets */}
                {set.isPrivate && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 text-white/80 text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm">
                    {/* Lock icon */}
                    <svg width="9" height="11" viewBox="0 0 9 11" fill="none" className="flex-shrink-0">
                      <rect x="0.75" y="4.5" width="7.5" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M2.5 4.5V3A2 2 0 0 1 6.5 3V4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Private Work
                  </div>
                )}

                {/* Set info — bottom left */}
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs tracking-widest text-white/50 uppercase mb-1">
                    {set.images.length} frames
                  </p>
                  <h2 className="font-display text-3xl text-white">
                    {set.title}
                  </h2>
                  <p className="text-sm text-white/60 mt-1">{set.subtitle}</p>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
