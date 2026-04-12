'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { CloudinaryImage } from '@/lib/cloudinary';

interface HeroCarouselProps {
  images: CloudinaryImage[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance, images.length]);

  if (images.length === 0) {
    return (
      <section className="relative w-full h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="font-mono text-[10px] tracking-widest uppercase text-white/20">Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden noise-overlay">
      {images.map((img, i) => (
        <div
          key={img.id}
          className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ animation: i === current ? 'kenBurns 14s ease-in-out forwards' : 'none' }}
          >
            <Image
              src={img.heroUrl}
              alt={img.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
              onLoad={() => i === 0 && setLoading(false)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        </div>
      ))}

      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="overflow-hidden mb-4">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Travel Photography
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] animate-slide-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            Moments Across
            <br /><em>the World</em>
          </h1>
        </div>
        <div className="overflow-hidden mt-6">
          <p className="font-display italic text-lg md:text-xl font-light animate-fade-in"
            style={{ color: 'var(--accent)', animationDelay: '1s', animationFillMode: 'both' }}>
            Anbuselvan Sivaraju
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}>
            <div className={`h-[2px] transition-all duration-500 ${i === current ? 'w-8' : 'w-2 bg-white/30'}`}
              style={{ background: i === current ? 'var(--accent)' : undefined }} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 md:right-12 z-10 flex items-center gap-3 text-white/30">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-12 h-px bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white/60" style={{ width: '40%', animation: 'slideRight 2s ease infinite' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
        @keyframes kenBurns  { 0% { transform: scale(1); } 100% { transform: scale(1.07); } }
      `}</style>
    </section>
  );
}
