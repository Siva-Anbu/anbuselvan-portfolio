// lib/cloudinary.ts
// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — TAGS ONLY
//
// How to tag your photos in Cloudinary:
//
//  hero         → appears in homepage carousel
//  aboutme      → appears as portrait on About page
//  landscape    → appears in Landscape featured set
//  drone        → appears in Drone featured set
//  wildlife     → appears in Wildlife featured set
//  lifescape    → appears in Lifescape featured set
//  black-and-white OR blackandwhite → appears in B&W featured set
//
//  Iceland / Denmark / France / Kenya etc. → appears in that country page
//
//  A photo CAN have multiple tags:
//  e.g. landscape + Iceland = shows in Landscape set AND Iceland country page
//
//  Photos with NO recognised tag are completely ignored everywhere.
// ─────────────────────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY    = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

// ─── ALL KNOWN CATEGORY TAGS (not countries, not aboutme) ────────────────────
const CATEGORY_TAGS = [
  'hero',
  'aboutme',
  'landscape',
  'drone',
  'wildlife',
  'lifescape',
  'black-and-white',
  'blackandwhite',
];

// ─── COUNTRY WHITELIST ────────────────────────────────────────────────────────
// Add a new line here when you visit a new country.
// The slug must EXACTLY match your Cloudinary tag (case-sensitive).
const COUNTRY_META: Record<string, { name: string; visitedYear?: string }> = {
  // Uppercase (as you tag in Cloudinary)
  Iceland:      { name: 'Iceland',      visitedYear: '2024' },
  Denmark:      { name: 'Denmark',      visitedYear: '2023-2025' },
  France:       { name: 'France',       visitedYear: '2023' },
  Kenya:        { name: 'Kenya',        visitedYear: '2024' },
  India:        { name: 'India',        visitedYear: '2019-2024' },
  Japan:        { name: 'Japan',        visitedYear: '2023' },
  Norway:       { name: 'Norway',       visitedYear: '2025' },
  Switzerland:  { name: 'Switzerland',  visitedYear: '2025' },
  Italy:        { name: 'Italy',        visitedYear: '2023' },
  Spain:        { name: 'Spain',        visitedYear: '2023' },
  Netherlands:  { name: 'Netherlands',  visitedYear: '2022' },
  Germany:      { name: 'Germany',      visitedYear: '2023' },
  // Lowercase fallback
  iceland:      { name: 'Iceland',      visitedYear: '2024' },
  denmark:      { name: 'Denmark',      visitedYear: '2023-2025' },
  france:       { name: 'France',       visitedYear: '2023' },
  kenya:        { name: 'Kenya',        visitedYear: '2024' },
  india:        { name: 'India',        visitedYear: '2019-2024' },
  japan:        { name: 'Japan',        visitedYear: '2023' },
  norway:       { name: 'Norway',       visitedYear: '2025' },
  switzerland:  { name: 'Switzerland',  visitedYear: '2025' },
  italy:        { name: 'Italy',        visitedYear: '2023' },
  spain:        { name: 'Spain',        visitedYear: '2023' },
  netherlands:  { name: 'Netherlands',  visitedYear: '2022' },
  germany:      { name: 'Germany',      visitedYear: '2023' },
};

// ─── FEATURED SET DEFINITIONS ─────────────────────────────────────────────────
const SET_DEFS = [
  { slug: 'landscape',       tags: ['landscape'],                        title: 'Landscape',     subtitle: 'Earth, sky, and the space between' },
  { slug: 'black-and-white', tags: ['black-and-white', 'blackandwhite'], title: 'Black & White', subtitle: 'When colour steps aside, truth remains' },
  { slug: 'lifescape',       tags: ['lifescape'],                        title: 'Lifescape',     subtitle: 'People, streets, and quiet human moments' },
  { slug: 'wildlife',        tags: ['wildlife'],                         title: 'Wildlife',       subtitle: 'Wild eyes, wild places' },
  { slug: 'drone',           tags: ['drone'],                            title: 'Drone',          subtitle: 'The world seen from above' },
];

// ─── INTERFACES ───────────────────────────────────────────────────────────────
export interface CloudinaryImage {
  id: string;
  publicId: string;
  url: string;
  thumbUrl: string;
  heroUrl: string;
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

// ─── URL BUILDER ──────────────────────────────────────────────────────────────
function buildUrl(publicId: string, width: number, quality: number): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},q_${quality},f_auto,e_improve:40,e_sharpen:30/${encodeURIComponent(publicId)}`;
}

// ─── FETCH ALL IMAGES FROM CLOUDINARY ────────────────────────────────────────
async function fetchAllImages(): Promise<CloudinaryImage[]> {
  const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
  let allResources: any[] = [];
  let nextCursor: string | null = null;

  do {
    const params = new URLSearchParams({
      max_results: '500',
      tags: 'true',
      resource_type: 'image',
    });
    if (nextCursor) params.append('next_cursor', nextCursor);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?${params}`,
      {
        headers: { Authorization: `Basic ${credentials}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error('Cloudinary fetch failed:', res.status);
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

// ─── CACHE ────────────────────────────────────────────────────────────────────
let _cache: CloudinaryImage[] | null = null;

export async function getAllImages(): Promise<CloudinaryImage[]> {
  if (_cache) return _cache;
  _cache = await fetchAllImages();
  return _cache;
}

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
export async function getHeroImages(): Promise<CloudinaryImage[]> {
  const images = await getAllImages();
  return images.filter(img => img.tags.includes('hero'));
}

// ─── ABOUT PAGE PORTRAIT ──────────────────────────────────────────────────────
export async function getAboutPortrait(): Promise<string> {
  const images = await getAllImages();
  const portrait = images.find(img => img.tags.includes('aboutme'));
  if (!portrait) return '';
  // Return special URL — fill background, crop to face, no enhance (avoids transparent bg issues)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_800,h_1067,c_fill,g_face,b_rgb:111111,f_jpg,q_90/${encodeURIComponent(portrait.publicId)}`;
}

// ─── FEATURED SETS ────────────────────────────────────────────────────────────
export async function getFeaturedSets(): Promise<FeaturedSet[]> {
  const images = await getAllImages();

  return SET_DEFS
    .map(def => {
      const setImages = images.filter(img =>
        def.tags.some(tag => img.tags.includes(tag))
      );
      return {
        slug: def.slug,
        title: def.title,
        subtitle: def.subtitle,
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

// ─── COUNTRIES ────────────────────────────────────────────────────────────────
export async function getCountries(): Promise<Country[]> {
  const images = await getAllImages();
  const validSlugs = Object.keys(COUNTRY_META);

  const results = validSlugs
    .map(slug => {
      const countryImages = images.filter(img => img.tags.includes(slug));
      const meta = COUNTRY_META[slug];
      return {
        slug,
        name: meta.name,
        visitedYear: meta.visitedYear,
        coverImage: countryImages[0]?.thumbUrl ?? '',
        images: countryImages,
      };
    })
    .filter(c => c.images.length > 0);

  // Deduplicate by name (handles both Iceland and iceland)
  const seen = new Set<string>();
  return results
    .filter(c => {
      if (seen.has(c.name)) return false;
      seen.add(c.name);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const countries = await getCountries();
  return countries.find(c => c.slug === slug) ?? null;
}

// ─── STATS ────────────────────────────────────────────────────────────────────
export async function getSiteStats() {
  const images = await getAllImages();
  const countries = await getCountries();
  // Count only photos that have at least one category or country tag (real content)
  const contentImages = images.filter(img =>
    img.tags.some(tag => !['hero', 'aboutme'].includes(tag))
  );
  return {
    countries: countries.length,
    photographs: contentImages.length,
  };
}
