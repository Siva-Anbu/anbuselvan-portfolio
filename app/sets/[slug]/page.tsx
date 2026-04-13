// app/sets/[slug]/page.tsx
// Individual set gallery — fully dynamic from Cloudinary tags.

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSetBySlug, getAllSetSlugs, getFeaturedSets } from "@/lib/cloudinary";

export const revalidate = 60;

// Tell Next.js which slugs to pre-build at deploy time
export async function generateStaticParams() {
  const slugs = await getAllSetSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Page metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const set = await getSetBySlug(params.slug);
  if (!set) return {};
  return {
    title: `${set.title} — Anbuselvan Sivaraju`,
    description: set.subtitle,
  };
}

export default async function SetPage({ params }: { params: { slug: string } }) {
  const set = await getSetBySlug(params.slug);
  if (!set) notFound();

  // Get prev/next sets for navigation
  const allSets   = await getFeaturedSets();
  const idx       = allSets.findIndex((s) => s.slug === params.slug);
  const prevSet   = idx > 0 ? allSets[idx - 1] : null;
  const nextSet   = idx < allSets.length - 1 ? allSets[idx + 1] : null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-[50vh] mb-16 overflow-hidden">
        {set.coverImage && (
          <Image
            src={set.coverImage}
            alt={set.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-6xl mx-auto w-full px-6 pb-12">
          <Link
            href="/sets"
            className="text-xs tracking-widest text-white/50 uppercase hover:text-white/80 transition-colors mb-4 inline-block"
          >
            ← All Sets
          </Link>
          <p className="text-xs tracking-[0.25em] text-white/40 uppercase mb-2">
            Featured Set
          </p>
          <h1 className="font-cormorant text-5xl text-white">{set.title}</h1>
          <p className="text-white/60 mt-2">{set.subtitle}</p>
          <p className="text-xs text-white/30 mt-2">
            {set.images.length} photograph{set.images.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {set.images.map((image) => (
            <div key={image.publicId} className="break-inside-avoid">
              <div className="relative overflow-hidden bg-white/5 group">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {image.alt && (
                <p className="text-xs text-white/40 mt-2 font-mono">
                  {image.alt}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <div className="flex justify-between items-center mt-24 pt-8 border-t border-white/10">
          {prevSet ? (
            <Link href={`/sets/${prevSet.slug}`} className="group flex items-center gap-4">
              <div className="relative w-16 h-16 overflow-hidden">
                <Image
                  src={prevSet.coverImage}
                  alt={prevSet.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest">← Previous Set</p>
                <p className="text-white/70 group-hover:text-white transition-colors">
                  {prevSet.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {nextSet ? (
            <Link href={`/sets/${nextSet.slug}`} className="group flex items-center gap-4 text-right">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest">Next Set →</p>
                <p className="text-white/70 group-hover:text-white transition-colors">
                  {nextSet.title}
                </p>
              </div>
              <div className="relative w-16 h-16 overflow-hidden">
                <Image
                  src={nextSet.coverImage}
                  alt={nextSet.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}
