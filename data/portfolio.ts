// data/portfolio.ts
// ─────────────────────────────────────────────────────────────────────────────
// HOW THE TAG SYSTEM WORKS:
//
// Every image has a `tags` array. Tags serve two purposes:
//   1. CATEGORY tags  → 'landscape' | 'black-and-white' | 'lifescape' | 'wildlife' | 'drone'
//      These control which Featured Set the image appears in.
//   2. COUNTRY tags   → 'iceland' | 'denmark' | 'kenya' | 'france' | etc.
//      These control which Country page the image appears in.
//
// A single photo CAN have both: tags: ['landscape', 'iceland']
// → It will appear in the Landscape set AND the Iceland country page.
//
// TO ADD A NEW PHOTO: just add it to the `allImages` array with the right tags.
// TO ADD A NEW COUNTRY: add a new country slug to a photo's tags, then add it
//   to countryDefs below. Countries and counts are AUTO-CALCULATED.
// ─────────────────────────────────────────────────────────────────────────────

// Helper to build optimized Cloudinary URLs
const cl = (publicId: string, width = 1200, quality = 85) =>
  `https://res.cloudinary.com/dnqfhp432/image/upload/w_${width},q_${quality},f_auto/${encodeURIComponent(publicId)}`;

const clHero = (publicId: string) => cl(publicId, 1920, 88);
const clThumb = (publicId: string) => cl(publicId, 800, 80);

// ─── INTERFACES ───────────────────────────────────────────────────────────────

export interface TaggedImage {
  id: string;
  publicId: string;
  url: string;
  thumbUrl: string;
  alt: string;
  tags: string[];
}

export interface FeaturedSetDef {
  slug: string;
  title: string;
  subtitle?: string;
  tag: string;
  coverImage: string;
}

export interface CountryDef {
  slug: string;
  name: string;
  visitedYear?: string;
}

// ─── ALL IMAGES ───────────────────────────────────────────────────────────────

export const allImages: TaggedImage[] = [

  // ── HERO (Mainpage folder) ────────────────────────────────────────────────
  {
    id: 'mp-1',
    publicId: 'DJI_0296-3_uhfajl',
    url: clHero('DJI_0296-3_uhfajl'),
    thumbUrl: clThumb('DJI_0296-3_uhfajl'),
    alt: 'Aerial view',
    tags: ['hero', 'drone', 'denmark'],
  },

  // ── LANDSCAPE ────────────────────────────────────────────────────────────
  {
    id: 'ls-1',
    publicId: 'Behind the waterfall',
    url: cl('Behind the waterfall'),
    thumbUrl: clThumb('Behind the waterfall'),
    alt: 'Behind the waterfall',
    tags: ['landscape', 'iceland'],
  },
  {
    id: 'ls-2',
    publicId: 'Waterfall in Iceland',
    url: cl('Waterfall in Iceland'),
    thumbUrl: clThumb('Waterfall in Iceland'),
    alt: 'Waterfall in Iceland',
    tags: ['landscape', 'iceland'],
  },
  {
    id: 'ls-3',
    publicId: 'Iceland greenery',
    url: cl('Iceland greenery'),
    thumbUrl: clThumb('Iceland greenery'),
    alt: 'Iceland greenery',
    tags: ['landscape', 'iceland'],
  },
  {
    id: 'ls-4',
    publicId: 'Iceland greenery near waterfall',
    url: cl('Iceland greenery near waterfall'),
    thumbUrl: clThumb('Iceland greenery near waterfall'),
    alt: 'Iceland greenery near waterfall',
    tags: ['landscape', 'iceland'],
  },

  // ── BLACK & WHITE ─────────────────────────────────────────────────────────
  {
    id: 'bw-1',
    publicId: 'Photographer In Paris',
    url: cl('Photographer In Paris'),
    thumbUrl: clThumb('Photographer In Paris'),
    alt: 'Photographer in Paris',
    tags: ['black-and-white', 'france'],
  },

  // ── LIFESCAPE ─────────────────────────────────────────────────────────────
  {
    id: 'lf-1',
    publicId: 'Danish Parliament 1',
    url: cl('Danish Parliament 1'),
    thumbUrl: clThumb('Danish Parliament 1'),
    alt: 'Danish Parliament',
    tags: ['lifescape', 'denmark'],
  },
  {
    id: 'lf-2',
    publicId: 'Danish Parliament 2',
    url: cl('Danish Parliament 2'),
    thumbUrl: clThumb('Danish Parliament 2'),
    alt: 'Danish Parliament — detail',
    tags: ['lifescape', 'denmark'],
  },

  // ── WILDLIFE ──────────────────────────────────────────────────────────────
  {
    id: 'wl-1',
    publicId: 'African Tusker',
    url: cl('African Tusker'),
    thumbUrl: clThumb('African Tusker'),
    alt: 'African Tusker',
    tags: ['wildlife', 'kenya'],
  },

  // ── DRONE ─────────────────────────────────────────────────────────────────
  {
    id: 'dr-1',
    publicId: 'Valbyparken garden',
    url: cl('Valbyparken garden'),
    thumbUrl: clThumb('Valbyparken garden'),
    alt: 'Valbyparken garden — aerial',
    tags: ['drone', 'denmark'],
  },
  {
    id: 'dr-2',
    publicId: 'Valbyparken aerial view',
    url: cl('Valbyparken aerial view'),
    thumbUrl: clThumb('Valbyparken aerial view'),
    alt: 'Valbyparken — aerial view',
    tags: ['drone', 'denmark'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD MORE PHOTOS HERE
  // {
  //   id: 'ls-5',
  //   publicId: 'Your Exact Photo Name',     ← from Cloudinary dashboard
  //   url: cl('Your Exact Photo Name'),
  //   thumbUrl: clThumb('Your Exact Photo Name'),
  //   alt: 'Caption for the photo',
  //   tags: ['landscape', 'iceland'],         ← category + country
  // },
  // ─────────────────────────────────────────────────────────────────────────
];

// ─── FEATURED SET DEFINITIONS ─────────────────────────────────────────────────

export const featuredSetDefs: FeaturedSetDef[] = [
  {
    slug: 'landscape',
    title: 'Landscape',
    subtitle: 'Earth, sky, and the space between',
    tag: 'landscape',
    coverImage: cl('Behind the waterfall'),
  },
  {
    slug: 'black-and-white',
    title: 'Black & White',
    subtitle: 'When colour steps aside, truth remains',
    tag: 'black-and-white',
    coverImage: cl('Photographer In Paris'),
  },
  {
    slug: 'lifescape',
    title: 'Lifescape',
    subtitle: 'People, streets, and quiet human moments',
    tag: 'lifescape',
    coverImage: cl('Danish Parliament 1'),
  },
  {
    slug: 'wildlife',
    title: 'Wildlife',
    subtitle: 'Wild eyes, wild places',
    tag: 'wildlife',
    coverImage: cl('African Tusker'),
  },
  {
    slug: 'drone',
    title: 'Drone',
    subtitle: 'The world seen from above',
    tag: 'drone',
    coverImage: clThumb('DJI_0296-3_uhfajl'),
  },
];

// ─── COUNTRY DEFINITIONS ──────────────────────────────────────────────────────
// slug must match the country tag you put on images.
// To add a new country: tag some images with e.g. 'norway', then add it here.

export const countryDefs: CountryDef[] = [
  { slug: 'iceland',  name: 'Iceland',  visitedYear: '2024' },
  { slug: 'denmark',  name: 'Denmark',  visitedYear: '2023–2025' },
  { slug: 'france',   name: 'France',   visitedYear: '2023' },
  { slug: 'kenya',    name: 'Kenya',    visitedYear: '2024' },
];

// ─── AUTO-COMPUTED (do not edit below) ───────────────────────────────────────

export const heroImages = allImages.filter(img => img.tags.includes('hero'));

export function getSetImages(tag: string): TaggedImage[] {
  return allImages.filter(img => img.tags.includes(tag));
}

export function getCountryImages(countrySlug: string): TaggedImage[] {
  return allImages.filter(img => img.tags.includes(countrySlug));
}

export const featuredSets = featuredSetDefs.map(def => ({
  ...def,
  images: getSetImages(def.tag),
}));

export const countries = countryDefs
  .map(def => ({
    ...def,
    images: getCountryImages(def.slug),
    coverImage: getCountryImages(def.slug)[0]?.thumbUrl ?? '',
  }))
  .filter(c => c.images.length > 0);

export const stats = {
  countries: countries.length,
  photographs: allImages.filter(img => !img.tags.includes('hero')).length,
};
