// lib/cloudinary.ts
// ─────────────────────────────────────────────────────────────────────────────
// This is the CORE ENGINE of the site.
// It fetches all images directly from Cloudinary at build time.
// No more editing portfolio.ts — just tag photos in Cloudinary.
//
// TAG CONVENTION (must follow in Cloudinary):
//   CATEGORY tags : landscape | black-and-white | lifescape | wildlife | drone | hero
//   COUNTRY tags  : iceland | denmark | france | kenya | india | norway | etc.
//
// One photo can have multiple tags:
//   e.g.  landscape + iceland  → appears in Landscape set AND Iceland country page
// ─────────────────────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY    = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

// ─── KNOWN CATEGORY TAGS ─────────────────────────────────────────────────────
export const CATEGORY_TAGS = [
  'landscape',
  'black-and-white',
  'blackandwhite',   // Cloudinary alternate spelling — treated as same set
  'lifescape',
  'wildlife',
  'drone',
  'hero',
] as const;

export type CategoryTag = typeof CATEGORY_TAGS[number];

// ─── INTERFACES ───────────────────────────────────────────────────────────────

export interface CloudinaryImage {
  id: string;
  publicId: string;
  url: string;          // full quality
  thumbUrl: string;     // optimized thumbnail
  heroUrl: string;      // hero/carousel size
  alt: string;
  tags: string[];
  folder: string;
}

export interface FeaturedSet {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  coverImage: string;
  images: CloudinaryImage[];
}

export interface Country {
  slug: string;
  name: string;
  visitedYear?: string;
  coverImage: string;
  images: CloudinaryImage[];
}

// ─── COUNTRY META (display name + year — the only thing you ever add here) ───
// When you add a new country tag to Cloudinary photos, just add one line here.
const COUNTRY_META: Record<string, { name: string; visitedYear?: string }> = {
  iceland:     { name: 'Iceland',         visitedYear: '2024' },
  denmark:     { name: 'Denmark',         visitedYear: '2023–2025' },
  france:      { name: 'France',          visitedYear: '2023' },
  kenya:       { name: 'Kenya',           visitedYear: '2024' },
  india:       { name: 'India',           visitedYear: '2019–2024' },
  japan:       { name: 'Japan',           visitedYear: '2023' },
  norway:      { name: 'Norway',          visitedYear: '2025' },
  switzerland: { name: 'Switzerland',     visitedYear: '2025' },
  italy:       { name: 'Italy',           visitedYear: '2023' },
  spain:       { name: 'Spain',           visitedYear: '2023' },
  netherlands: { name: 'Netherlands',     visitedYear: '2022' },
  germany:     { name: 'Germany',         visitedYear: '2023' },
  // Add new countries here as you travel
};

// ─── FEATURED SET META ────────────────────────────────────────────────────────
const SET_META: Record<string, { title: string; subtitle: string }> = {
  'landscape':       { title: 'Landscape',     subtitle: 'Earth, sky, and the space between' },
  'black-and-white': { title: 'Black & White',  subtitle: 'When colour steps aside, truth remains' },
  'blackandwhite':   { title: 'Black & White',  subtitle: 'When colour steps aside, truth remains' },
  'lifescape':       { title: 'Lifescape',      subtitle: 'People, streets, and quiet human moments' },
  'wildlife':        { title: 'Wildlife',        subtitle: 'Wild eyes, wild places' },
  'drone':           { title: 'Drone',           subtitle: 'The world seen from above' },
  'hero':            { title: 'Hero',            subtitle: '' },
};

// ─── URL BUILDERS ─────────────────────────────────────────────────────────────
function buildUrl(publicId: string, width: number, quality: number): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},q_${quality},f_auto/${encodeURIComponent(publicId)}`;
}

// ─── MAIN FETCH FUNCTION ──────────────────────────────────────────────────────
async function fetchAllImages(): Promise<CloudinaryImage[]> {
  const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

  let allResources: any[] = [];
  let nextCursor: string | null = null;

  // Paginate through all images (Cloudinary returns max 500 per call)
  do {
    const params = new URLSearchParams({
      max_results: '500',
      tags: 'true',
      resource_type: 'image',
    });

    if (nextCursor) {
      params.append('next_cursor', nextCursor);
    }

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?${params}`,
      {
        headers: { Authorization: `Basic ${credentials}` },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      console.error('Cloudinary fetch failed:', res.status, await res.text());
      break;
    }

    const data = await res.json();
    allResources = allResources.concat(data.resources || []);
    nextCursor = data.next_cursor || null;

  } while (nextCursor);

  return allResources.map((r: any): CloudinaryImage => ({
    id: r.asset_id,
    publicId: r.public_id,
    url: buildUrl(r.public_id, 1200, 85),
    thumbUrl: buildUrl(r.public_id, 800, 80),
    heroUrl: buildUrl(r.public_id, 1920, 88),
    alt: r.display_name || r.public_id,
    tags: r.tags || [],
    folder: r.asset_folder || '',
  }));
}

// ─── CACHED DATA LOADER ───────────────────────────────────────────────────────
// Next.js caches this automatically at build time
let _cache: CloudinaryImage[] | null = null;

export async function getAllImages(): Promise<CloudinaryImage[]> {
  if (_cache) return _cache;
  _cache = await fetchAllImages();
  return _cache;
}

// ─── DERIVED DATA FUNCTIONS ───────────────────────────────────────────────────

export async function getHeroImages(): Promise<CloudinaryImage[]> {
  const images = await getAllImages();
  // Hero = tagged 'hero' OR in Mainpage folder
  return images.filter(img =>
    img.tags.includes('hero') || img.folder === 'Mainpage'
  );
}

export async function getFeaturedSets(): Promise<FeaturedSet[]> {
  const images = await getAllImages();

  // Define sets — black-and-white and blackandwhite merge into one set
  const setDefinitions = [
    { slug: 'landscape',       tags: ['landscape'] },
    { slug: 'black-and-white', tags: ['black-and-white', 'blackandwhite'] },
    { slug: 'lifescape',       tags: ['lifescape'] },
    { slug: 'wildlife',        tags: ['wildlife'] },
    { slug: 'drone',           tags: ['drone'] },
  ];

  return setDefinitions
    .map(def => {
      // Collect images matching ANY of the tags for this set
      const setImages = images.filter(img =>
        def.tags.some(tag => img.tags.includes(tag))
      );
      const meta = SET_META[def.slug];

      return {
        slug: def.slug,
        title: meta.title,
        subtitle: meta.subtitle,
        tag: def.slug,
        coverImage: setImages[0]?.thumbUrl ?? '',
        images: setImages,
      };
    })
    .filter(set => set.images.length > 0);
}

export async function getSetBySlug(slug: string): Promise<FeaturedSet | null> {
  const sets = await getFeaturedSets();
  return sets.find(s => s.slug === slug) ?? null;
}

// All tags that are categories — not countries
const ALL_CATEGORY_TAGS = [
  'landscape', 'black-and-white', 'blackandwhite',
  'lifescape', 'wildlife', 'drone', 'hero',
];

export async function getCountries(): Promise<Country[]> {
  const images = await getAllImages();

  // Find all tags that are NOT category tags — these are country tags
  const allTags = Array.from(new Set(images.flatMap(img => img.tags)));
  const countryTags = allTags.filter(
    tag => !ALL_CATEGORY_TAGS.includes(tag)
  );

  return countryTags
    .map(slug => {
      const countryImages = images.filter(img => img.tags.includes(slug));
      const meta = COUNTRY_META[slug];

      return {
        slug,
        name: meta?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1), // Fallback: capitalize slug
        visitedYear: meta?.visitedYear,
        coverImage: countryImages[0]?.thumbUrl ?? '',
        images: countryImages,
      };
    })
    .filter(c => c.images.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const countries = await getCountries();
  return countries.find(c => c.slug === slug) ?? null;
}

export async function getSiteStats() {
  const images = await getAllImages();
  const countries = await getCountries();
  return {
    countries: countries.length,
    photographs: images.filter(img => !img.tags.includes('hero') && img.folder !== 'Mainpage').length,
  };
}
