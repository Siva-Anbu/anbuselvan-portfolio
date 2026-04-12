'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Country } from '@/lib/cloudinary';
import { useInView } from 'react-intersection-observer';

function CountryCard({ country, index }: { country: Country; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <div ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}>
      <Link href={`/countries/${country.slug}`} className="group block">
        <div className="relative overflow-hidden bg-white/5" style={{ aspectRatio: '3/4' }}>
          {country.coverImage && (
            <Image src={country.coverImage} alt={country.name} fill
              className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3 className="font-display text-2xl md:text-3xl font-light text-white">{country.name}</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">{country.visitedYear}</p>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                {country.images.length} photos
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

interface Props {
  countries: Country[];
  stats: { countries: number; photographs: number };
}

export default function CountriesSection({ countries, stats }: Props) {
  return (
    <section className="py-24 md:py-32 bg-[#0d0d0d] border-t border-white/5">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 mb-3">Destinations</p>
            <h2 className="font-display text-4xl md:text-6xl font-light text-white">Countries Visited</h2>
          </div>
          <Link href="/countries" className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors">
            <span>All countries</span><span>→</span>
          </Link>
        </div>
        <div className="flex gap-8 mb-12 border-b border-white/5 pb-8">
          <div>
            <span className="font-display text-3xl md:text-4xl font-light" style={{ color: 'var(--accent)' }}>{stats.countries}</span>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1">Countries</p>
          </div>
          <div>
            <span className="font-display text-3xl md:text-4xl font-light" style={{ color: 'var(--accent)' }}>{stats.photographs}</span>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1">Photographs</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {countries.map((country, i) => <CountryCard key={country.slug} country={country} index={i} />)}
        </div>
      </div>
    </section>
  );
}
