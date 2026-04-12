'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { CloudinaryImage } from '@/lib/cloudinary';

interface HeroCarouselProps {
  images: CloudinaryImage[];
}

const photoQuotes = [
  { text: 'Photography is a tool to freeze a moment that speaks volumes.', author: 'Anbuselvan Sivaraju' },
  { text: 'The best photograph is one that you feel rather than see.', author: 'Anonymous' },
  { text: 'A photograph is a secret about a secret. The more it tells you, the less you know.', author: 'Diane Arbus' },
  { text: 'To photograph is to hold one\'s breath when all faculties converge to capture fleeting reality.', author: 'Henri Cartier-Bresson' },
  { text: 'Which of my photographs is my favorite? The one I\'m going to take tomorrow.', author: 'Imogen Cunningham' },
  { text: 'Photography is the story I fail to put into words.', author: 'Destin Sparks' },
];

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  // Carousel auto-advance
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance, images.length]);

  // Quote rotation every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((q) => (q + 1) % photoQuotes.length);
        setQuoteFade(true);
      }, 600);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  if (images.length === 0) {
    return (
      <section className="relative w-full h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="font-mono text-[10px] tracking-widest uppercase text-white/20">Loading...</p>
      </section>
    );
  }

  const quote = photoQuotes[quoteIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden noise-overlay">
      {/* Images */}
      {images.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <div className="absolute inset-0"
            style={{ animation: i === current ? 'kenBurns 14s ease-in-out forwards' : 'none' }}>
            <Image src={img.heroUrl} alt={img.alt} fill priority={i === 0}
              className="object-cover" sizes="100vw" quality={90}
              onLoad={() => i === 0 && setLoading(false)} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        </div>
      ))}

      {/* Hero text overlay */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>

        {/* Tag line */}
        <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 animate-fade-in mb-6"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Travel Photography
        </p>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] animate-slide-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          Photography is a tool to freeze
          <br /><em>a moment that speaks volumes.</em>
        </h1>

        {/* Name */}
        <p className="font-display italic text-lg md:text-xl font-light mt-5 animate-fade-in"
          style={{ color: 'var(--accent)', animationDelay: '1s', animationFillMode: 'both' }}>
          Anbuselvan Sivaraju
        </p>

        {/* Tagline under name */}
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/35 mt-2 animate-fade-in"
          style={{ animationDelay: '1.3s', animationFillMode: 'both' }}>
          Captured, not created
        </p>

        {/* Rotating quote — bottom center */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 text-center">
          <div className="transition-opacity duration-500" style={{ opacity: quoteFade ? 1 : 0 }}>
            <p className="font-display italic text-sm md:text-base font-light text-white/50 leading-relaxed">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25 mt-2">
              {quote.author}
            </p>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}>
            <div className={`h-[2px] transition-all duration-500 ${i === current ? 'w-8' : 'w-2 bg-white/30'}`}
              style={{ background: i === current ? 'var(--accent)' : undefined }} />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 flex items-center gap-3 text-white/30">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-12 h-px bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white/60"
            style={{ width: '40%', animation: 'slideRight 2s ease infinite' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
        @keyframes kenBurns  { 0% { transform: scale(1); } 100% { transform: scale(1.07); } }
      `}</style>
    </section>
  );
}
