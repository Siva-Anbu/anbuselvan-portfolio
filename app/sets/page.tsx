// app/sets/page.tsx
// Reads all sets dynamically from Cloudinary — no portfolio.ts needed.

import Link from "next/link";
import Image from "next/image";
import { getFeaturedSets } from "@/lib/cloudinary";

export const revalidate = 60; // ISR: rebuild this page every 60 seconds

export default async function SetsPage() {
  const sets = await getFeaturedSets();

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] text-white/40 uppercase mb-4">
            Curated Work
          </p>
          <h1 className="font-cormorant text-5xl text-white/90">
            Featured Sets
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
                    alt={set.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs tracking-widest text-white/50 uppercase mb-1">
                    {set.images.length} frames
                  </p>
                  <h2 className="font-cormorant text-3xl text-white">
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
