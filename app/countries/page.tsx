// app/countries/page.tsx
// Countries page — auto-generates from Cloudinary "country:XX" tags.

import type { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { getAllCountries } from "@/lib/cloudinary";

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Countries',
  description:
    'Travel photography from 35+ countries by Anbuselvan Sivaraju — Denmark, India, Iceland, Kenya, France, Egypt, Nepal, and beyond.',
  alternates: { canonical: 'https://anbuselvan-sivaraju.vercel.app/countries' },
  openGraph: {
    title: 'Countries | Anbuselvan Sivaraju',
    description:
      'Photographs from 35+ countries across Europe, Asia, Africa, and South America.',
    url: 'https://anbuselvan-sivaraju.vercel.app/countries',
    images: [
      {
        url: 'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/African%20Tusker',
        width: 1200,
        height: 630,
        alt: 'African elephant — travel photography by Anbuselvan Sivaraju',
      },
    ],
  },
};

export default async function CountriesPage() {
  const countries = await getAllCountries();

  const totalPhotos = countries.reduce((sum, c) => sum + c.photoCount, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display tracking-[0.25em] text-white/40 uppercase mb-4">
            Destinations
          </p>
          <h1 className="font-display text-5xl font-normal text-white/90 mb-8">
            Countries Visited
          </h1>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <p className="font-display text-3xl text-[#C9A96E]">35+</p>
              <p className="font-display text-white/40 tracking-widest uppercase mt-1">Countries</p>
            </div>
            <div>
              <p className="font-display text-3xl text-[#C9A96E]">{totalPhotos}</p>
              <p className="font-display text-white/40 tracking-widest uppercase mt-1">Photographs</p>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link
              key={country.name}
              href={`/countries/${encodeURIComponent(country.name)}`}
              className="group block"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-white/5">
                <Image
                  src={country.coverImage}
                  alt={`${country.name} travel photography by Anbuselvan Sivaraju`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="font-display text-2xl md:text-3xl font-light text-white">{country.name}</h2>
                  {country.years && (
                    <p className="font-display text-white/50 mt-1">{country.years}</p>
                  )}
                  <p className="font-display text-white/40 mt-1">
                    {country.photoCount} photo{country.photoCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming Soon block */}
          <div className="group block cursor-default">
            <div className="relative aspect-[3/2] overflow-hidden bg-white/5 border border-white/10">

              {/* Subtle animated gradient background */}
              <div className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 50%, #161410 100%)',
                }} />

              {/* Faint world map dots pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }} />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="font-display text-[10px] tracking-[0.35em] uppercase text-[#C9A96E]/60 mb-4">
                  More Destinations
                </p>
                <h2
                  className="text-white/80 mb-3"
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                    fontWeight: 300,
                  }}
                >
                  Coming Soon
                </h2>
                <div className="w-8 h-px bg-[#C9A96E]/40 mb-3" />
                <p className="text-xs text-white/30 tracking-widest uppercase">
                  More stories loading...
                </p>
              </div>

              {/* Bottom label matching other cards */}
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-xs text-white/20 tracking-widest uppercase">
                  35+ countries & counting
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
