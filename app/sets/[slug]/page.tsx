import { notFound } from 'next/navigation';
import { getFeaturedSets, getSetBySlug } from '@/lib/cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import ImageGrid from '@/components/ImageGrid';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const sets = await getFeaturedSets();
  return sets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const set = await getSetBySlug(params.slug);
  if (!set) return {};
  return { title: `${set.title} — Anbuselvan Sivaraju`, description: set.subtitle };
}

export default async function SetPage({ params }: { params: { slug: string } }) {
  const [set, allSets] = await Promise.all([getSetBySlug(params.slug), getFeaturedSets()]);
  if (!set) notFound();

  const currentIndex = allSets.findIndex((s) => s.slug === params.slug);
  const prevSet = currentIndex > 0 ? allSets[currentIndex - 1] : null;
  const nextSet = currentIndex < allSets.length - 1 ? allSets[currentIndex + 1] : null;

  const gridImages = set.images.map(img => ({ id: img.id, url: img.url, alt: img.alt }));

  return (
    <main className="min-h-screen">
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {set.coverImage && (
          <Image src={set.coverImage} alt={set.title} fill className="object-cover" priority quality={90} sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <Link href="/sets" className="absolute top-24 left-6 md:left-12 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors z-10">
          <span>←</span><span>All Sets</span>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>Featured Set</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight">{set.title}</h1>
          {set.subtitle && <p className="font-body text-sm text-white/50 mt-3 italic font-light">{set.subtitle}</p>}
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mt-4">{set.images.length} photographs</p>
        </div>
      </div>

      <div className="px-1 md:px-2 py-2">
        <ImageGrid images={gridImages} columns={3} />
      </div>

      <div className="border-t border-white/5 grid grid-cols-2">
        {prevSet ? (
          <Link href={`/sets/${prevSet.slug}`} className="group flex flex-col p-8 md:p-12 border-r border-white/5 hover:bg-white/2 transition-colors">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 mb-3">← Previous Set</span>
            <div className="flex items-center gap-4">
              {prevSet.coverImage && <div className="relative w-12 h-10 overflow-hidden flex-shrink-0"><Image src={prevSet.coverImage} alt={prevSet.title} fill className="object-cover" sizes="48px" /></div>}
              <span className="font-display text-xl text-white/60 group-hover:text-white transition-colors">{prevSet.title}</span>
            </div>
          </Link>
        ) : <div />}
        {nextSet ? (
          <Link href={`/sets/${nextSet.slug}`} className="group flex flex-col items-end p-8 md:p-12 hover:bg-white/2 transition-colors">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 mb-3">Next Set →</span>
            <div className="flex items-center gap-4">
              <span className="font-display text-xl text-white/60 group-hover:text-white transition-colors">{nextSet.title}</span>
              {nextSet.coverImage && <div className="relative w-12 h-10 overflow-hidden flex-shrink-0"><Image src={nextSet.coverImage} alt={nextSet.title} fill className="object-cover" sizes="48px" /></div>}
            </div>
          </Link>
        ) : <div />}
      </div>
      <Footer />
    </main>
  );
}
