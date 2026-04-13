// app/countries/[country]/page.tsx
// Individual country page — auto-built from Cloudinary "country:XX" tags.
// Brand new countries appear here with zero code changes.

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryByName, getAllCountryNames } from "@/lib/cloudinary";

export const revalidate = 60;

export async function generateStaticParams() {
  const names = await getAllCountryNames();
  return names.map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: { country: string } }) {
  return {
    title: `${params.country} — Anbuselvan Sivaraju`,
    description: `Photography from ${params.country}`,
  };
}

export default async function CountryPage({ params }: { params: { country: string } }) {
  const country = await getCountryByName(params.country);
  if (!country) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-[45vh] mb-16 overflow-hidden">
        <Image
          src={country.coverImage}
          alt={country.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-6xl mx-auto w-full px-6 pb-12">
          <Link
            href="/countries"
            className="text-xs tracking-widest text-white/50 uppercase hover:text-white/80 transition-colors mb-4 inline-block"
          >
            ← All Countries
          </Link>
          <h1 className="font-cormorant text-5xl text-white">{country.name}</h1>
          {country.years && (
            <p className="text-white/50 mt-2">{country.years}</p>
          )}
          <p className="text-xs text-white/30 mt-1">
            {country.photoCount} photograph{country.photoCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {country.images.map((image) => (
            <div key={image.publicId} className="break-inside-avoid">
              <div className="relative overflow-hidden bg-white/5 group">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {image.alt && (
                <p className="text-xs text-white/40 mt-2 font-mono">{image.alt}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
