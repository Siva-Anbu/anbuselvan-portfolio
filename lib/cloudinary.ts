// lib/cloudinary.ts
// ─────────────────────────────────────────────────────────────────────────────
// All data comes from Cloudinary at build time via tags.
// Upload → tag → appears automatically. No portfolio.ts edits ever needed.
//
// TAGGING CONVENTION:
//   Set tags  : blackandwhite | landscape | lifescape | wildlife | drone
//   Hero      : hero                (homepage carousel)
//   Portrait  : portrait            (about page)
//   Country   : country:Nepal       (auto-creates country page)
//   Year      : year:2024           (year range on country page)
//   Caption   : context field alt=  (caption under photo)
// ─────────────────────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY    = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

// ── Core image type ───────────────────────────────────────────────────────────

export interface CloudinaryImage {
  id:       string;        // same as publicId — used by existing components
  publicId: string;
  url:      string;        // full quality delivery URL
  thumbUrl: string;        // thumbnail URL (w_200) — used by FeaturedSetsSection
  alt:      string;
  tags:     string[];
  country:  string | null;
  year:     string | null;
  set:      string | null;
}

// Type aliases — existing components may import these names
export type PortfolioImage = CloudinaryImage;
export type Photo          = CloudinaryImage;

// ── Set type ──────────────────────────────────────────────────────────────────

export interface FeaturedSet {
  slug:       string;
  title:      string;
  subtitle:   string;
  coverImage: string;
  images:     CloudinaryImage[];
}

// Alias
export type PhotoSet = FeaturedSet;

// ── Country type ──────────────────────────────────────────────────────────────

export interface Country {
  name:        string;
  slug:        string;
  coverImage:  string;
  years:       string;
  visitedYear: string;   // alias of years — backwards compat
  images:      CloudinaryImage[];
  photoCount:  number;
}

// ── Set metadata ──────────────────────────────────────────────────────────────

const SET_META: Record<string, { title: string; subtitle: string; order: number }> = {
  landscape:         { title: "Landscape",     subtitle: "Earth, sky, and the space between",        order: 1 },
  "black-and-white": { title: "Black & White", subtitle: "When colour steps aside, truth remains",   order: 2 },
  lifescape:         { title: "Lifescape",     subtitle: "People, streets, and quiet human moments", order: 3 },
  wildlife:          { title: "Wildlife",      subtitle: "Wild eyes, wild places",                   order: 4 },
  drone:             { title: "Drone",         subtitle: "The world seen from above",                order: 5 },
};

const TAG_TO_SET: Record<string, string> = {
  blackandwhite: "black-and-white",
  landscape:     "landscape",
  lifescape:     "lifescape",
  wildlife:      "wildlife",
  drone:         "drone",
};

// ── Cloudinary Search API ─────────────────────────────────────────────────────

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
        with_field:  ["tags", "context"],
        max_results: 500,
        sort_by:     [{ created_at: "asc" }],
      }),
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

// ── Build helpers ─────────────────────────────────────────────────────────────

function buildUrl(publicId: string, transformation: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

function buildImage(resource: any): CloudinaryImage {
  const tags: string[] = resource.tags ?? [];
  const context        = resource.context?.custom ?? {};

  const countryTag = tags.find((t) => t.startsWith("country:"));
  const country    = countryTag ? countryTag.replace("country:", "") : null;

  const yearTag = tags.find((t) => t.startsWith("year:"));
  const year    = yearTag ? yearTag.replace("year:", "") : null;

  const setTag = tags.find((t) => TAG_TO_SET[t]);
  const set    = setTag ? TAG_TO_SET[setTag] : null;

  const alt = context.alt
    ?? resource.display_name
    ?? resource.public_id.split("/").pop()?.replace(/_/g, " ")
    ?? resource.public_id;

  const url      = buildUrl(resource.public_id, "w_1200,q_85,f_auto,e_improve:40,e_sharpen:30");
  const thumbUrl = buildUrl(resource.public_id, "w_200,q_70,f_auto");

  return {
    id:       resource.public_id,
    publicId: resource.public_id,
    url,
    thumbUrl,
    alt,
    tags,
    country,
    year,
    set,
  };
}

function buildCountry(name: string, images: CloudinaryImage[]): Country {
  const years     = images.map((i) => i.year).filter(Boolean) as string[];
  const minYear   = years.length ? Math.min(...years.map(Number)).toString() : "";
  const maxYear   = years.length ? Math.max(...years.map(Number)).toString() : "";
  const yearRange = minYear === maxYear ? minYear : `${minYear}–${maxYear}`;

  return {
    name,
    slug:        name,
    coverImage:  images[0].url,
    years:       yearRange,
    visitedYear: yearRange,
    images,
    photoCount:  images.length,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

/** All portfolio images (has a set tag OR a country tag) */
export async function getAllImages(): Promise<CloudinaryImage[]> {
  const setTagList = Object.keys(TAG_TO_SET).join(" OR tags=");
  const resources  = await searchCloudinary(
    `(tags=${setTagList} OR tags=country:*)`
  );
  return resources.map(buildImage);
}

/** Tag photos with "hero" → shows in homepage carousel */
export async function getHeroImages(): Promise<CloudinaryImage[]> {
  const resources = await searchCloudinary("tags=hero");
  return resources.map((r) => {
    const url      = buildUrl(r.public_id, "w_1920,q_88,f_auto,e_improve:40,e_sharpen:30");
    const thumbUrl = buildUrl(r.public_id, "w_200,q_70,f_auto");
    return {
      id:       r.public_id,
      publicId: r.public_id,
      url,
      thumbUrl,
      alt:     r.context?.custom?.alt ?? r.display_name ?? r.public_id,
      tags:    r.tags ?? [],
      country: null,
      year:    null,
      set:     null,
    };
  });
}

/** Tag portrait photo with "portrait" → shows on About page */
export async function getAboutPortrait(): Promise<string | null> {
  const resources = await searchCloudinary("tags=portrait");
  if (!resources.length) return null;
  return buildUrl(resources[0].public_id, "w_800,q_90,f_auto");
}

/** Photo + country counts for homepage stats */
export async function getSiteStats(): Promise<{ countries: number; photographs: number }> {
  const allImages  = await getAllImages();
  const countrySet = new Set(allImages.map((img) => img.country).filter(Boolean));
  return {
    countries:   countrySet.size,
    photographs: allImages.length,
  };
}

/** All countries — auto-generated from "country:XX" tags */
export async function getAllCountries(): Promise<Country[]> {
  const allImages   = await getAllImages();
  const countryMap: Record<string, CloudinaryImage[]> = {};

  for (const img of allImages) {
    if (!img.country) continue;
    if (!countryMap[img.country]) countryMap[img.country] = [];
    countryMap[img.country].push(img);
  }

  return Object.entries(countryMap)
    .map(([name, images]) => buildCountry(name, images))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Alias used by app/page.tsx */
export async function getCountries(): Promise<Country[]> {
  return getAllCountries();
}

export async function getCountryByName(name: string): Promise<Country | null> {
  const countries = await getAllCountries();
  return countries.find((c) => c.name.toLowerCase() === name.toLowerCase()) ?? null;
}

export async function getAllCountryNames(): Promise<string[]> {
  const countries = await getAllCountries();
  return countries.map((c) => c.name);
}

/** All featured sets sorted by order */
export async function getFeaturedSets(): Promise<FeaturedSet[]> {
  const allImages = await getAllImages();

  const sets: FeaturedSet[] = Object.entries(SET_META).map(([slug, meta]) => {
    const images     = allImages.filter((img) => img.set === slug);
    const coverImage = images[0]?.url ?? "";
    return { slug, ...meta, coverImage, images };
  });

  return sets
    .filter((s) => s.images.length > 0)
    .sort(
      (a, b) =>
        (SET_META[a.slug]?.order ?? 99) - (SET_META[b.slug]?.order ?? 99)
    );
}

export async function getSetBySlug(slug: string): Promise<FeaturedSet | null> {
  const sets = await getFeaturedSets();
  return sets.find((s) => s.slug === slug) ?? null;
}

export async function getAllSetSlugs(): Promise<string[]> {
  const sets = await getFeaturedSets();
  return sets.map((s) => s.slug);
}
