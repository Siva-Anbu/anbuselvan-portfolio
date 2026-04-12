import { getCountries, getSiteStats } from '@/lib/cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Countries — Anbuselvan Sivaraju',
};

export default async function CountriesPage() {
  const [countries, stats] = await Promise.all([getCountries(), getSiteStats()]);
  return (
    <main className="min-h-screen">
      <div className="pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">Destinations</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-white">Countries</h1>
        <div className="flex gap-8 mt-8">
          <div>
            <span className="font-display text-3xl font-light" style={{ color: 'var(--accent)' }}>{stats.countries}</span>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mt-1">Countries</p>
          </div>
          <div>
            <span className="font-display text-3xl font-light" style={{ color: 'var(--accent)' }}>{stats.photographs}</span>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mt-1">Photographs</p>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {countries.map((country, i) => (
            <Link key={country.slug} href={`/countries/${country.slug}`} className="group block">
              <div className="relative overflow-hidden bg-white/5" style={{ aspectRatio: '3/4' }}>
                {country.coverImage && (
                  <Image src={country.coverImage} alt={country.name} fill
                    className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading={i < 4 ? 'eager' : 'lazy'} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h2 className="font-display text-xl md:text-2xl font-light text-white">{country.name}</h2>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35">{country.visitedYear}</p>
                    <p className="font-mono text-[8px] tracking-[0.15em] uppercase" style={{ color: 'var(--accent)' }}>{country.images.length} photos</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
