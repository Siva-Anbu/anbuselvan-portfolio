import { getFeaturedSets } from '@/lib/cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Featured Sets — Anbuselvan Sivaraju',
  description: 'Curated photography sets from travels around the world.',
};

export default async function SetsPage() {
  const sets = await getFeaturedSets();
  return (
    <main className="min-h-screen">
      <div className="pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">Portfolio</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-white">Featured Sets</h1>
        <p className="font-body text-sm text-white/40 mt-4 max-w-md leading-relaxed">
          Curated collections of photographs — each set a chapter from a journey, told through light and stillness.
        </p>
      </div>
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {sets.map((set, i) => (
            <Link key={set.slug} href={`/sets/${set.slug}`} className="group block">
              <div className="relative overflow-hidden bg-white/5 mb-5" style={{ aspectRatio: '4/3' }}>
                {set.coverImage && (
                  <Image src={set.coverImage} alt={set.title} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < 3 ? 'eager' : 'lazy'} />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] px-2 py-1"
                  style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--accent)' }}>
                  {set.images.length} frames
                </div>
              </div>
              <h2 className="font-display text-3xl font-light text-white/90 group-hover:text-white transition-colors">{set.title}</h2>
              {set.subtitle && <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35 mt-1.5">{set.subtitle}</p>}
              <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 group-hover:gap-3"
                style={{ color: 'var(--accent)' }}>
                <span>Open Set</span><span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
