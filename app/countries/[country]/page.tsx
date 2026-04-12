import { notFound } from 'next/navigation';
import { getCountries, getCountryBySlug } from '@/lib/cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import ImageGrid from '@/components/ImageGrid';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: { country: string } }) {
  const country = await getCountryBySlug(params.country);
  if (!country) return {};
  return { title: `${country.name} — Anbuselvan Sivaraju` };
}

export default async function CountryPage({ params }: { params: { country: string } }) {
  const country = await getCountryBySlug(params.country);
  if (!country) notFound();

  const gridImages = country.images.map(img => ({ id: img.id, url: img.url, alt: img.alt }));

  return (
    <main className="min-h-screen">
      <div className="relative h-[55vh] overflow-hidden">
        {country.coverImage && (
          <Image src={country.coverImage} alt={country.name} fill className="object-cover" priority quality={90} sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <Link href="/countries" className="absolute top-24 left-6 md:left-12 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors z-10">
          <span>←</span><span>All Countries</span>
        </Link>
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--accent)' }}>{country.visitedYear}</p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-white">{country.name}</h1>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mt-4">{country.images.length} photographs</p>
        </div>
      </div>
      <div className="px-1 md:px-2 py-2 max-w-[1600px] mx-auto">
        <ImageGrid images={gridImages} columns={3} />
      </div>
      <Footer />
    </main>
  );
}
