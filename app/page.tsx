import type { Metadata } from 'next';
import { getHeroImages, getFeaturedSets, getCountries, getSiteStats } from '@/lib/cloudinary';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedSetsSection from '@/components/FeaturedSetsSection';
import CountriesSection from '@/components/CountriesSection';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Anbuselvan Sivaraju — Photography',
  description:
    'Photography portfolio of Anbuselvan Sivaraju — Copenhagen-based photographer capturing people, places, and quiet moments across 35+ countries since 2002.',
  alternates: { canonical: 'https://anbuselvan-sivaraju.vercel.app/' },
  openGraph: {
    title: 'Anbuselvan Sivaraju — Photography',
    description:
      'Copenhagen-based photographer capturing the world through his viewfinder. Browse travel, drone, lifescape, and black & white photography.',
    url: 'https://anbuselvan-sivaraju.vercel.app/',
    images: [
      {
        url: 'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/DSC07725_tkefef',
        width: 1200,
        height: 630,
        alt: 'Anbuselvan Sivaraju Photography portfolio',
      },
    ],
  },
};

export default async function Home() {
  const [heroImages, featuredSets, countries, stats] = await Promise.all([
    getHeroImages(),
    getFeaturedSets(),
    getCountries(),
    getSiteStats(),
  ]);

  return (
    <main>
      <HeroCarousel images={heroImages} />

      <section className="py-24 md:py-28 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-6">
            About the work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white/90 leading-relaxed">
            Every photograph is a{' '}
            <em>quiet conversation</em> between light, place, and the moment between moments.
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/about"
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors flex items-center gap-2 group"
            >
              <span>Read the story</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedSetsSection sets={featuredSets} />
      <CountriesSection countries={countries} stats={stats} />

      <section className="py-24 md:py-36 px-6 md:px-12 text-center border-t border-white/5">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">
          Collaborate
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-6">
          Let's Create Together
        </h2>
        <p className="font-body text-sm text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
          Maternity, couples, birthdays, private events — if you have a moment worth remembering, I'd love to be there.
        </p>
        <Link
          href="/work-with-me"
          className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase px-8 py-4 border transition-all duration-300 hover:bg-white hover:text-black"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          Work With Me
        </Link>
      </section>

      <Footer />
    </main>
  );
}
