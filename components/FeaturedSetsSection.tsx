'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FeaturedSet } from '@/lib/cloudinary';
import { useInView } from 'react-intersection-observer';

function SetCard({ set, index }: { set: FeaturedSet; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
      <Link href={`/sets/${set.slug}`} className="group block">
        <div className="relative overflow-hidden bg-white/5 mb-4" style={{ aspectRatio: '4/3' }}>
          {set.coverImage && (
            <Image src={set.coverImage} alt={set.title} fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 flex gap-0.5 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {set.images.slice(1, 4).map((img) => (
              <div key={img.id} className="flex-1 aspect-square overflow-hidden">
                <Image src={img.thumbUrl} alt={img.alt} width={60} height={60} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
          <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.2em] px-2 py-1"
            style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--accent)' }}>
            {set.images.length} frames
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-light text-white group-hover:text-white transition-colors">
            {set.title}
          </h3>
          {set.subtitle && (
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
              {set.subtitle}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 group-hover:gap-4"
            style={{ color: 'var(--accent)' }}>
            <span>View Set</span><span>&rarr;</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

interface Props { sets: FeaturedSet[]; }

export default function FeaturedSetsSection({ sets }: Props) {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 mb-3">Curated Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white">Featured Sets</h2>
        </div>
        <Link href="/sets" className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors">
          <span>All sets</span><span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {sets.map((set, i) => <SetCard key={set.slug} set={set} index={i} />)}
      </div>
      <div className="mt-12 text-center md:hidden">
        <Link href="/sets" className="font-mono text-[10px] tracking-[0.3em] uppercase border border-white/20 px-6 py-3 text-white/50 hover:text-white hover:border-white/40 transition-all">
          View All Sets
        </Link>
      </div>
    </section>
  );
}
