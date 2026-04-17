'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import type { CloudinaryImage } from '@/lib/cloudinary';

interface HeroCarouselProps {
  images: CloudinaryImage[];
}

const photoQuotes = [
  { text: 'Photography is a tool to freeze a moment that speaks volumes.', author: 'Anbuselvan Sivaraju' },
  { text: 'The best photograph is one that you feel rather than see.', author: 'Anonymous' },
  { text: 'A photograph is a secret about a secret. The more it tells you, the less you know.', author: 'Diane Arbus' },
  { text: 'To photograph is to hold breath when all faculties converge to capture fleeting reality.', author: 'Henri Cartier-Bresson' },
  { text: 'Which of my photographs is my favorite? The one I am going to take tomorrow.', author: 'Imogen Cunningham' },
  { text: 'Photography is the story I fail to put into words.', author: 'Destin Sparks' },
  { text: 'Every photograph is a certificate of presence.', author: 'Roland Barthes' },
  { text: 'Light makes photography. Embrace light. Admire it. Love it. But above all, know light.', author: 'George Eastman' },
  { text: 'Photography takes an instant out of time, altering life by holding it still.', author: 'Dorothea Lange' },
  { text: 'A good photograph is knowing where to stand.', author: 'Ansel Adams' },
  { text: 'The camera is an instrument that teaches people how to see without a camera.', author: 'Dorothea Lange' },
  { text: 'In photography there is a reality so subtle that it becomes more real than reality.', author: 'Alfred Stieglitz' },
  { text: 'I don’t trust words. I trust pictures.', author: 'Gilles Peress' },
  { text: 'Taking pictures is savoring life intensely, every hundredth of a second..', author: 'Marc Riboud' },
  { text: 'Black and white photography erases time from the equation.', author: 'Jason Peterson' },
  { text: 'The quickest way to make money at photography is to sell your camera.', author: 'Anonymous' },
  { text: 'Don’t pack up your camera until you’ve left the location.', author: 'Joe McNally' },
  { text: 'There are no bad pictures; that’s just how your face looks sometimes.', author: 'Abraham Lincoln' },
  { text: 'The most colorful thing in the world is black and white, it contains all colors and at the same time excludes all.', author: 'Vikrmn' },
];

// Fisher-Yates shuffle — returns a new shuffled array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  // Shuffle images once on mount — useMemo with empty deps so it never re-shuffles mid-session
  const shuffledImages = useMemo(() => shuffle(images), []);

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  // Start at a random quote index
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * photoQuotes.length));
  const [quoteFade, setQuoteFade] = useState(true);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % shuffledImages.length);
  }, [shuffledImages.length]);

  useEffect(() => {
    if (shuffledImages.length === 0) return;
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance, shuffledImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((q) => {
          // Pick a random next quote that is different from current
          let next;
          do { next = Math.floor(Math.random() * photoQuotes.length); } while (next === q);
          return next;
        });
        setQuoteFade(true);
      }, 600);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  if (shuffledImages.length === 0) {
    return (
      <section className="relative w-full h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="font-mono text-[10px] tracking-widest uppercase text-white/20">Loading...</p>
      </section>
    );
  }

  const quote = photoQuotes[quoteIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Images */}
      {shuffledImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <div className="absolute inset-0"
            style={{ animation: i === current ? 'kenBurns 14s ease-in-out forwards' : 'none' }}>
            <Image src={img.heroUrl} alt={img.alt} fill priority={i === 0}
              className="object-cover" sizes="100vw" quality={90}
              onLoad={() => i === 0 && setLoading(false)} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        </div>
      ))}

      {/* Hero text */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 md:px-16 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>

        {/* Main title */}
        <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.8rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            color: 'rgba(255,255,255,0.95)',
          }}>
            Photography is a tool to freeze
            <br />
            <span style={{ fontStyle: 'italic' }}>
              a moment that speaks volumes.
            </span>
          </h1>
        </div>

        {/* Rotating quote bottom */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center">
          <div className="transition-opacity duration-500" style={{ opacity: quoteFade ? 1 : 0 }}>
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
            }}>
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/60 mt-3">
              — {quote.author}
            </p>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {shuffledImages.map((_, i) => (
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
