// app/sets/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSetBySlug, getAllSetSlugs, getFeaturedSets } from "@/lib/cloudinary";
import SetGallery from "@/components/SetGallery";
import PrivateSetGallery from "@/components/PrivateSetGallery";
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
      ? `${set.title} — commissioned private work by Anbuselvan Sivaraju.`
      : set.subtitle,
  };
}

export default async function SetPage({ params }: { params: { slug: string } }) {
  const set = await getSetBySlug(params.slug);
  if (!set) notFound();

  const allSets    = await getFeaturedSets();
  const idx        = allSets.findIndex((s) => s.slug === params.slug);
  const prevSet    = idx > 0 ? allSets[idx - 1] : null;
  const nextSet    = idx < allSets.length - 1 ? allSets[idx + 1] : null;
  const isPrivate  = set.isPrivate === true;

  const gridImages = set.images.map((img) => ({
    id:  img.id,
    url: img.url,
    alt: img.alt,
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a]">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      {isPrivate ? (
        // ── PRIVATE HERO — Option D blurred banner with lock badge + description
        <div className="relative h-[55vh] overflow-hidden">

          {/* Blurred cover image — scaled up slightly so blur edges don't show */}
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

          {/* Dark overlay to make text readable over the blur */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-4">

            {/* Back link */}
            <Link
              href="/sets"
              className="absolute top-6 left-6 md:left-12 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-2"
            >
              ← All Sets
            </Link>

            {/* Lock icon */}
            <div className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none">
                <rect x="1" y="7" width="12" height="9" rx="2" stroke="white" strokeWidth="1.3" fill="rgba(255,255,255,0.12)" />
                <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Label */}
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/35">
              Commissioned Work
            </p>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">
              {set.title}
            </h1>

            {/* Subtitle / tagline */}
            <p className="text-white/55 font-body text-sm max-w-md">
              {set.subtitle}
            </p>

            {/* Private badge pill */}
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white/70 font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full">
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none" className="flex-shrink-0">
                <rect x="0.75" y="4.5" width="7.5" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.1" />
                <path d="M2.5 4.5V3A2 2 0 0 1 6.5 3V4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              Private — Client Session
            </span>

            {/* Photo count */}
            <p className="font-mono text-[10px] text-white/25 tracking-widest">
              {set.images.length} photograph{set.images.length !== 1 ? "s" : ""}
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
              ← All Sets
            </Link>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 mb-2">Featured Set</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">{set.title}</h1>
            <p className="text-white/50 mt-2 font-body text-sm">{set.subtitle}</p>
            <p className="font-mono text-[10px] text-white/25 mt-2 tracking-widest">
              {set.images.length} photograph{set.images.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}

      {/* ── PRIVATE INFO BANNER ──────────────────────────────────────────────── */}
      {/* Shown below the hero for private sets — explains the blur to visitors */}
      {isPrivate && (
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto pt-10 pb-2">
          <div className="border border-white/8 bg-white/3 px-6 py-5 rounded-sm flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                <path d="M10 9v5M10 7v.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-mono text-[11px] tracking-[0.1em] text-white/35 leading-relaxed">
              These photographs are from a commissioned private session. Images are blurred here
              to protect client privacy. Interested in booking a similar session?{" "}
              <Link href="/contact" className="text-white/55 underline underline-offset-2 hover:text-white/80 transition-colors">
                Get in touch
              </Link>.
            </p>
          </div>
        </div>
      )}

      {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-12">
        {isPrivate ? (
          // Private gallery — blurred images with lock overlays, no lightbox
          <PrivateSetGallery images={gridImages} />
        ) : (
          // Public gallery — original component, lightbox enabled
          <SetGallery images={gridImages} />
        )}
      </div>

      {/* ── PREV / NEXT ───────────────────────────────────────────────────────── */}
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
