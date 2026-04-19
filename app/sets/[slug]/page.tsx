// app/sets/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSetBySlug, getAllSetSlugs, getFeaturedSets } from "@/lib/cloudinary";
import SetGallery from "@/components/SetGallery";
import ScrollingGallery from "@/components/ScrollingGallery";
import Footer from "@/components/Footer";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSetSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const set = await getSetBySlug(params.slug);
  if (!set) return {};
  return {
    title: `${set.title} — Anbuselvan Sivaraju`,
    description: set.isPrivate
      ? `${set.title} — commissioned personal work by Anbuselvan Sivaraju.`
      : set.subtitle,
  };
}

export default async function SetPage({ params }: { params: { slug: string } }) {
  const set = await getSetBySlug(params.slug);
  if (!set) notFound();

  const allSets  = await getFeaturedSets();
  const idx      = allSets.findIndex((s) => s.slug === params.slug);
  const prevSet  = idx > 0 ? allSets[idx - 1] : null;
  const nextSet  = idx < allSets.length - 1 ? allSets[idx + 1] : null;
  const isPrivate = set.isPrivate === true;

  const galleryImages = set.images.map((img) => ({
    id:  img.id,
    url: img.url,
    alt: img.alt,
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a]">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {isPrivate ? (

        // ── PERSONAL SESSIONS HERO — clean, cinematic, no lock icon
        <div className="relative h-[55vh] overflow-hidden">

          {/* Blurred cover image */}
          {set.coverImage && (
            <Image
              src={set.coverImage}
              alt={set.title}
              fill
              className="object-cover scale-110 blur-lg"
              priority
              sizes="100vw"
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-3">

            {/* Back link */}
            <Link
              href="/sets"
              className="absolute top-6 left-6 md:left-12 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-2"
            >
              ← All Collections
            </Link>

            {/* Label */}
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30">
              Commissioned Work
            </p>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">
              {set.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/50 font-body text-sm max-w-md mt-1">
              {set.subtitle}
            </p>

            {/* Scroll hint */}
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mt-4">
              Hover over images to reveal · scroll auto-plays below
            </p>
          </div>
        </div>

      ) : (

        // ── PUBLIC HERO — original layout unchanged
        <div className="relative h-[45vh] overflow-hidden">
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
          <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 max-w-[1600px] mx-auto pb-10">
            <Link
              href="/sets"
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors mb-6 inline-flex items-center gap-2"
            >
              ← All Collections
            </Link>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 mb-2">
              Featured Collection
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">
              {set.title}
            </h1>
            <p className="text-white/50 mt-2 font-body text-sm">{set.subtitle}</p>
            <p className="font-mono text-[10px] text-white/25 mt-2 tracking-widest">
              {set.images.length} photograph{set.images.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}

      {/* ── GALLERY ───────────────────────────────────────────────────────── */}
      {isPrivate ? (

        // ── PERSONAL SESSIONS — full-width scrolling strip
        <div className="py-16">
          <ScrollingGallery images={galleryImages} />

          {/* Booking nudge below the scroll strip */}
          <div className="px-6 md:px-12 max-w-[1600px] mx-auto mt-16">
            <div className="border border-white/8 bg-white/3 px-6 py-5 rounded-sm flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <p className="font-mono text-[11px] tracking-[0.1em] text-white/35 leading-relaxed">
                These are personal commissioned sessions — maternity, couples, birthdays, and private events.
                Interested in booking?{" "}
                <Link
                  href="/contact"
                  className="text-white/55 underline underline-offset-2 hover:text-white/80 transition-colors"
                >
                  Get in touch
                </Link>.
              </p>
            </div>
          </div>
        </div>

      ) : (

        // ── PUBLIC SETS — original masonry grid with lightbox
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-12">
          <SetGallery images={galleryImages} />
        </div>
      )}

      {/* ── PREV / NEXT ───────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pb-16">
        <div className="flex justify-between items-center pt-12 border-t border-white/5">

          {prevSet ? (
            <Link href={`/sets/${prevSet.slug}`} className="group flex items-center gap-4">
              <div className="relative w-14 h-14 overflow-hidden">
                <Image
                  src={prevSet.coverImage}
                  alt={prevSet.title}
                  fill
                  className={`object-cover ${prevSet.isPrivate ? "blur-sm scale-110" : ""}`}
                  sizes="56px"
                />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25">← Previous</p>
                <p className="font-display text-lg font-light text-white/60 group-hover:text-white transition-colors">
                  {prevSet.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {nextSet ? (
            <Link href={`/sets/${nextSet.slug}`} className="group flex items-center gap-4 text-right">
              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25">Next →</p>
                <p className="font-display text-lg font-light text-white/60 group-hover:text-white transition-colors">
                  {nextSet.title}
                </p>
              </div>
              <div className="relative w-14 h-14 overflow-hidden">
                <Image
                  src={nextSet.coverImage}
                  alt={nextSet.title}
                  fill
                  className={`object-cover ${nextSet.isPrivate ? "blur-sm scale-110" : ""}`}
                  sizes="56px"
                />
              </div>
            </Link>
          ) : <div />}

        </div>
      </div>

      <Footer />
    </main>
  );
}
