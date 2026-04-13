// app/countries/[country]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryByName, getAllCountryNames } from "@/lib/cloudinary";
import SetGallery from "@/components/SetGallery";
import Footer from "@/components/Footer";

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

  const gridImages = country.images.map((img) => ({
    id:  img.id,
    url: img.url,
    alt: img.alt,
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero banner */}
      <div className="relative h-[45vh] overflow-hidden">
        <Image src={country.coverImage} alt={country.name} fill
          className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 max-w-[1600px] mx-auto pb-10">
          <Link href="/countries"
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors mb-6 inline-flex items-center gap-2">
            ← All Countries
          </Link>
          {country.visitedYear && (
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 mb-2">{country.visitedYear}</p>
          )}
          <h1 className="font-display text-5xl md:text-7xl font-light text-white">{country.name}</h1>
          <p className="font-mono text-[10px] text-white/25 mt-2 tracking-widest">
            {country.photoCount} photograph{country.photoCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Gallery with lightbox */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto py-12">
        <SetGallery images={gridImages} />
      </div>

      <Footer />
    </main>
  );
}
