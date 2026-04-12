import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About — Anbuselvan Sivaraju',
  description: 'Copenhagen-based travel and street photographer with over two decades behind the lens.',
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
                src="https://res.cloudinary.com/dnqfhp432/image/upload/w_800,q_85,f_auto/DJI_0296-3_uhfajl"
                alt="Anbuselvan Sivaraju — photographer"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-display text-lg italic font-light" style={{ color: 'var(--accent)' }}>
                  Anbuselvan Sivaraju
                </p>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40 mt-1">
                  Travel Photographer · Copenhagen
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
                Photography is not about creating moments — it is about recognizing them before they disappear.
              </blockquote>

              <div className="space-y-6 font-body text-[14px] leading-[1.9] text-white/55">

                <p>
                  I am <span className="font-medium" style={{ color: 'var(--accent)' }}>Anbu</span>, a Copenhagen-based photographer with over two decades behind the lens. What started on analog film cameras in the early 2000s shaped how I see the world — every frame deliberate, every moment earned.
                </p>

                <p>
                  By day I work in IT. But photography has always been where I truly live.
                </p>

                <p>
                  I have traveled to 35+ countries across Europe and beyond — from the vibrant streets of Rio de Janeiro and the historic alleys of Rome, to the busy corners of Paris, the lively streets of Hanoi, and the timeless landscapes of Egypt, as well as the quiet Nordic towns of Copenhagen and Stockholm — always searching for the honest, human moments that happen between the planned ones.
                </p>

                <p>
                  I am drawn to emotion over spectacle. A glance between strangers. A quiet street corner. The raw, unguarded expression that disappears a second later. Black and white photography strips away distraction and reveals what is real.
                </p>

                <p>
                  Street photography taught me patience. The best photograph is often simply about being there.
                </p>

                <p>
                  Beyond travel and street photography, I also do personal photography sessions for close friends and family — birthdays, maternity moments, and quiet everyday memories. These are not studio productions. They are relaxed, informal sessions focused on capturing real moments rather than perfect poses.
                </p>

                <p>
                  Personal shoots are a quieter side of my work — unhurried, informal, and built around the people in front of the lens rather than a checklist of poses.
                </p>

                <p className="text-white/70">
                  If you are interested in a personal shoot, feel free to reach out via the contact page. I would love to hear from you.
                </p>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/5">
                {[
                  { value: '35+', label: 'Countries' },
                  { value: '2000', label: 'Since' },
                  { value: '20+', label: 'Years' },
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

              {/* Gear */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4">
                  In My Bag
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sony A7 IV', '24-70mm f/2.8', '85mm f/1.4', '16-35mm f/4', 'ND Filters', 'Gorilla Pod'].map((item) => (
                    <span key={item}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border border-white/10 text-white/35">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-12 flex flex-wrap gap-4">
                <Link href="/work-with-me"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase px-6 py-3 border transition-all duration-300 hover:bg-white hover:text-black"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                  Work With Me
                </Link>
                <Link href="/contact"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase px-6 py-3 border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 transition-all duration-300">
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
