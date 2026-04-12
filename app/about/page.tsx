import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About — Anbuselvan Sivaraju',
  description: 'The story behind the lens — travel photographer Anbuselvan Sivaraju.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="pt-32 md:pt-40 pb-0 px-6 md:px-12 max-w-[1600px] mx-auto">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">
          The Story
        </p>
        <h1 className="font-display text-5xl md:text-8xl font-light text-white leading-tight">
          About
        </h1>
      </div>

      {/* Main content */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-20">
          {/* Portrait */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="relative overflow-hidden bg-white/5 sticky top-32" style={{ aspectRatio: '3/4' }}>
              <Image
                src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=800&q=85"
                alt="Anbuselvan Sivaraju — photographer"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p
                  className="font-display text-lg italic font-light"
                  style={{ color: 'var(--accent)' }}
                >
                  Anbuselvan Sivaraju
                </p>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40 mt-1">
                  Travel Photographer · Coimbatore
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="max-w-xl">
              {/* Pull quote */}
              <blockquote
                className="font-display text-2xl md:text-3xl font-light italic leading-relaxed mb-12 border-l-[1px] pl-6"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent-light)' }}
              >
                "I photograph not what I see, but what I feel when I'm finally still enough to notice."
              </blockquote>

              <div className="space-y-6 font-body text-[14px] leading-[1.9] text-white/55">
                <p>
                  I'm{' '}
                  <span className="font-medium" style={{ color: 'var(--accent)' }}>
                    Anbuselvan Sivaraju
                  </span>
                  , a travel photographer based in Coimbatore, Tamil Nadu. By day, I work as a mainframe developer — someone who lives inside systems and logic. But the lens gives me permission to exist differently: slower, quieter, more present.
                </p>
                <p>
                  Photography found me through travel. What began as a habit of pointing my phone at sunsets became something much harder to explain. I started noticing how light falls differently in every city, how streets carry the weight of the people who've walked them, how a single frame can hold an entire mood.
                </p>
                <p>
                  I've carried my camera through the black sand beaches of Iceland, the neon corridors of Tokyo, the cobblestone streets of Europe, the misty hills of Ooty, and the backwaters of Kerala. Every place teaches me something different about light — and about patience.
                </p>
                <p>
                  I don't photograph with a theme in mind. I just show up, slow down, and wait. Most of my favourite photographs happened in the five minutes before or after what I was actually looking for.
                </p>
                <p>
                  This portfolio is less a gallery and more a journal. A quiet record of moments across the world that felt worth holding onto.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/5">
                {[
                  { value: '8+', label: 'Countries' },
                  { value: '2019', label: 'Since' },
                  { value: '500+', label: 'Photographs' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-display text-3xl md:text-4xl font-light" style={{ color: 'var(--accent)' }}>
                      {value}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Gear section */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4">
                  In My Bag
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sony A7 IV', '24-70mm f/2.8', '85mm f/1.4', '16-35mm f/4', 'ND Filters', 'Gorilla Pod'].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border border-white/10 text-white/35"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/work-with-me"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase px-6 py-3 border transition-all duration-300 hover:bg-white hover:text-black"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  Work With Me
                </Link>
                <Link
                  href="/contact"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase px-6 py-3 border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
