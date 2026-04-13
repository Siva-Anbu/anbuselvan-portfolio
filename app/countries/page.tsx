// app/countries/page.tsx
// Countries page — auto-generates from Cloudinary "country:XX" tags.
// Upload a photo tagged "country:Nepal" and Nepal appears here automatically.

import Link from "next/link";
import Image from "next/image";
import { getAllCountries } from "@/lib/cloudinary";

export const revalidate = 60;

export default async function CountriesPage() {
  const countries = await getAllCountries();

  const totalPhotos = countries.reduce((sum, c) => sum + c.photoCount, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] text-white/40 uppercase mb-4">
            Destinations
          </p>
          <h1 className="font-cormorant text-5xl text-white/90 mb-8">
            Countries Visited
          </h1>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <p className="font-mono text-3xl text-[#C9A96E]">{countries.length}</p>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-1">Countries</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-[#C9A96E]">{totalPhotos}</p>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-1">Photographs</p>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link
              key={country.name}
              href={`/countries/${country.name}`}
              className="group block"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-white/5">
                <Image
                  src={country.coverImage}
                  alt={country.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="font-cormorant text-2xl text-white">{country.name}</h2>
                  {country.years && (
                    <p className="text-xs text-white/50 mt-1">{country.years}</p>
                  )}
                  <p className="text-xs text-white/40 mt-1">
                    {country.photoCount} photo{country.photoCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
