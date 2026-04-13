// lib/cloudinary.ts
// ─────────────────────────────────────────────────────────────────────────────
// ALL data now comes from Cloudinary at build time.
// No more editing data/portfolio.ts for new photos.
//
// TAGGING CONVENTION (apply these tags in Cloudinary console):
//
//   SET tag   →  blackandwhite | landscape | lifescape | wildlife | drone
//   COUNTRY   →  country:Nepal | country:France | country:Iceland  (etc.)
//   YEAR      →  year:2024   (optional, used on country pages)
//   TITLE     →  title stored as Cloudinary context field  alt="My Caption"
//
// Example for the Nepal B&W temple photo, add these tags in Cloudinary:
//   blackandwhite
//   country:Nepal
//   year:2024
//   And set context:  alt=Nepal Temple BW
// ─────────────────────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY    = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

// ── Types ────────────────────────────────────────────────────────────────────

export interface CloudinaryImage {
  publicId:   string;
  url:        string;         // delivery URL with transformations
  alt:        string;         // from context.alt or derived from public_id
  tags:       string[];
  country:    string | null;  // extracted from "country:XX" tag
  year:       string | null;  // extracted from "year:YYYY" tag
  set:        string | null;  // which set this belongs to
}

export interface PhotoSet {
  slug:       string;
  title:      string;
  subtitle:   string;
  coverImage: string;
  images:     CloudinaryImage[];
}

export interface Country {
  name:       string;
  coverImage: string;
  years:      string;         // e.g. "2023–2025"
  images:     CloudinaryImage[];
  photoCount: number;
}

// ── Known set metadata (title, subtitle, order) ──────────────────────────────
// Only ADD a row here when you create a brand new set.
// You never need to touch this for adding photos to existing sets.

const SET_META: Record<string, { title: string; subtitle: string; order: number }> = {
  landscape:       { title: "Landscape",    subtitle: "Earth, sky, and the space between",           order: 1 },
  "black-and-white":{ title: "Black & White",subtitle: "When colour steps aside, truth remains",      order: 2 },
  lifescape:       { title: "Lifescape",    subtitle: "People, streets, and quiet human moments",    order: 3 },
  wildlife:        { title: "Wildlife",     subtitle: "Wild eyes, wild places",                       order: 4 },
  drone:           { title: "Drone",        subtitle: "The world seen from above",                    order: 5 },
};

// Map Cloudinary tags → set slugs
const TAG_TO_SET: Record<string, string> = {
  blackandwhite:  "black-and-white",
  landscape:      "landscape",
  lifescape:      "lifescape",
  wildlife:       "wildlife",
  drone:          "drone",
};

// ── Cloudinary Search API call ────────────────────────────────────────────────

async function searchCloudinary(expression: string): Promise<any[]> {
  const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
    {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${credentials}`,
      },
      body: JSON.stringify({
        expression,
        with_field: ["tags", "context"],
        max_results: 500,
        sort_by: [{ created_at: "asc" }],
      }),
      // Next.js: revalidate every 60 seconds (ISR)
      // Change to { cache: "no-store" } if you want live updates
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error("Cloudinary search failed:", await res.text());
    return [];
  }

  const data = await res.json();
  return data.resources ?? [];
}

// ── Build a CloudinaryImage from a raw Cloudinary resource ───────────────────

function buildImage(resource: any): CloudinaryImage {
  const tags: string[]    = resource.tags ?? [];
  const context           = resource.context?.custom ?? {};

  // Extract country from "country:Nepal" style tag
  const countryTag        = tags.find((t) => t.startsWith("country:"));
  const country           = countryTag ? countryTag.replace("country:", "") : null;

  // Extract year from "year:2024" style tag
  const yearTag           = tags.find((t) => t.startsWith("year:"));
  const year              = yearTag ? yearTag.replace("year:", "") : null;

  // Which set does this belong to?
  const setTag            = tags.find((t) => TAG_TO_SET[t]);
  const set               = setTag ? TAG_TO_SET[setTag] : null;

  // Alt text: prefer context.alt, fall back to display_name or public_id
  const alt               = context.alt
    ?? resource.display_name
    ?? resource.public_id.split("/").pop()?.replace(/_/g, " ")
    ?? resource.public_id;

  // Build the delivery URL with standard transformations
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_1200,q_85,f_auto,e_improve:40,e_sharpen:30/${resource.public_id}`;

  return { publicId: resource.public_id, url, alt, tags, country, year, set };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch all portfolio images (any image that has at least one known set tag
 * OR a country tag). Called once at build time by all pages.
 */
export async function getAllImages(): Promise<CloudinaryImage[]> {
  const setTagList    = Object.keys(TAG_TO_SET).join(" OR tags=");
  const expression    = `(tags=${setTagList} OR tags=country:*)`;
  const resources     = await searchCloudinary(expression);
  return resources.map(buildImage);
}

/**
 * Returns all featured sets, sorted by the order defined in SET_META.
 * Automatically includes any image tagged with the matching set tag.
 */
export async function getFeaturedSets(): Promise<PhotoSet[]> {
  const allImages = await getAllImages();

  const sets: PhotoSet[] = Object.entries(SET_META).map(([slug, meta]) => {
    const images      = allImages.filter((img) => img.set === slug);
    const coverImage  = images[0]?.url ?? "";
    return { slug, ...meta, coverImage, images };
  });

  // Only return sets that have at least one image
  return sets.filter((s) => s.images.length > 0).sort((a, b) => {
    const aOrder = SET_META[a.slug]?.order ?? 99;
    const bOrder = SET_META[b.slug]?.order ?? 99;
    return aOrder - bOrder;
  });
}

/**
 * Returns a single set by slug with all its images.
 */
export async function getSetBySlug(slug: string): Promise<PhotoSet | null> {
  const sets = await getFeaturedSets();
  return sets.find((s) => s.slug === slug) ?? null;
}

/**
 * Returns all countries that appear in Cloudinary tags.
 * A new country appears AUTOMATICALLY when you tag a photo with country:XX.
 */
export async function getAllCountries(): Promise<Country[]> {
  const allImages = await getAllImages();

  // Group by country
  const countryMap: Record<string, CloudinaryImage[]> = {};
  for (const img of allImages) {
    if (!img.country) continue;
    if (!countryMap[img.country]) countryMap[img.country] = [];
    countryMap[img.country].push(img);
  }

  return Object.entries(countryMap).map(([name, images]) => {
    const years   = images.map((i) => i.year).filter(Boolean) as string[];
    const minYear = years.length ? Math.min(...years.map(Number)).toString() : "";
    const maxYear = years.length ? Math.max(...years.map(Number)).toString() : "";
    const yearRange = minYear === maxYear ? minYear : `${minYear}–${maxYear}`;

    return {
      name,
      coverImage:  images[0].url,
      years:       yearRange,
      images,
      photoCount:  images.length,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns a single country by name with all its images.
 */
export async function getCountryByName(name: string): Promise<Country | null> {
  const countries = await getAllCountries();
  return countries.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  ) ?? null;
}

/**
 * Returns all valid set slugs — used by Next.js generateStaticParams.
 */
export async function getAllSetSlugs(): Promise<string[]> {
  const sets = await getFeaturedSets();
  return sets.map((s) => s.slug);
}

/**
 * Returns all valid country names — used by Next.js generateStaticParams.
 */
export async function getAllCountryNames(): Promise<string[]> {
  const countries = await getAllCountries();
  return countries.map((c) => c.name);
}
