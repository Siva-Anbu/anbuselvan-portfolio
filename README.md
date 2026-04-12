# Anbuselvan Sivaraju — Photography Portfolio

A cinematic, minimalist travel photography portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Designed for editorial-quality visual storytelling.

---

## ✦ Design Philosophy

- **Strictly grayscale UI** — no color in the interface except one accent: `#C9A96E` (warm gold for the photographer's name and highlights)
- **Photographs in full color** — the images carry all the visual richness
- **Exhibition-like feel** — calm, slow, gallery-grade presentation
- **Zero forced categorization** — sets are curated collections, not emotional tags

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | CSS animations + IntersectionObserver |
| Images | Cloudinary CDN (configured via next.config.js) |
| Fonts | Cormorant Garamond + Jost + DM Mono (Google Fonts) |
| Deployment | Vercel |

---

## ✦ Project Structure

```
anbuselvan-portfolio/
├── app/
│   ├── layout.tsx              # Root layout with nav + page transitions
│   ├── page.tsx                # Homepage (Hero + Featured Sets + Countries + CTA)
│   ├── globals.css             # Global styles, fonts, custom CSS
│   ├── not-found.tsx           # 404 page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── contact/
│   │   └── page.tsx            # Contact form page
│   ├── work-with-me/
│   │   └── page.tsx            # Services / collaboration page
│   ├── sets/
│   │   ├── page.tsx            # All featured sets index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual set gallery page
│   └── countries/
│       ├── page.tsx            # All countries index
│       └── [country]/
│           └── page.tsx        # Country detail with cities + image grids
├── components/
│   ├── Navigation.tsx          # Sticky nav + mobile hamburger menu
│   ├── PageTransition.tsx      # Smooth fade-in on route change
│   ├── HeroCarousel.tsx        # Fullscreen cinematic image carousel
│   ├── FeaturedSetsSection.tsx # Curated sets grid section
│   ├── CountriesSection.tsx    # Countries grid section
│   ├── ImageGrid.tsx           # Reusable grid with lightbox trigger
│   ├── Lightbox.tsx            # Fullscreen lightbox with keyboard nav
│   └── Footer.tsx              # Site footer
├── data/
│   └── portfolio.ts            # ALL data (sets, countries, cities, images)
├── public/                     # Static assets
├── next.config.js              # Next.js config + image domains
├── tailwind.config.js          # Tailwind config + custom tokens
├── vercel.json                 # Vercel deployment config
└── .env.example                # Environment variables template
```

---

## ✦ Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourusername/anbuselvan-portfolio.git
cd anbuselvan-portfolio
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✦ Adding Your Cloudinary Images

All images are defined in `data/portfolio.ts`. Replace the placeholder Unsplash URLs with your Cloudinary URLs.

### Cloudinary URL Format

```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/TRANSFORMATIONS/PUBLIC_ID.jpg
```

### Recommended Transformations

```
# Hero carousel (full quality, wide)
https://res.cloudinary.com/your_cloud/image/upload/w_1920,q_85,f_auto/your-image

# Gallery thumbnails (optimized)
https://res.cloudinary.com/your_cloud/image/upload/w_800,q_80,f_auto/your-image

# Lightbox (high quality)
https://res.cloudinary.com/your_cloud/image/upload/w_1400,q_90,f_auto/your-image
```

### Update next.config.js

The `next.config.js` is already configured for `res.cloudinary.com`. Just make sure your cloud name is correct.

---

## ✦ Customizing Your Data

### Edit `data/portfolio.ts` to:

1. **Change hero images** — Update `heroImages[]` array
2. **Add/edit featured sets** — Modify `featuredSets[]` array
3. **Add countries/cities** — Modify `countries[]` array with nested cities and images

### Data Structure

```typescript
// A Featured Set
{
  slug: 'iceland-2023',          // URL slug: /sets/iceland-2023
  title: 'Iceland 2023',
  subtitle: 'Fire, ice, and endless skies',
  coverImage: 'https://...',     // Cloudinary URL
  images: [
    { id: 'ic-1', url: 'https://...', alt: 'Iceland waterfall' },
    // ... more images
  ],
}

// A Country
{
  slug: 'india',                 // URL slug: /countries/india
  name: 'India',
  coverImage: 'https://...',
  visitedYear: '2019–2024',
  cities: [
    {
      slug: 'coimbatore',        // Anchor: /countries/india#coimbatore
      name: 'Coimbatore',
      year: '2019',
      coverImage: 'https://...',
      images: [
        { id: 'cbe-1', url: 'https://...', alt: 'Hills near Coimbatore' },
      ],
    },
  ],
}
```

---

## ✦ Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage: hero carousel, featured sets, countries, CTA |
| `/sets` | All featured photography sets |
| `/sets/[slug]` | Individual set gallery with lightbox |
| `/countries` | Countries grid with stats |
| `/countries/[country]` | Country page with cities and full image galleries |
| `/about` | Editorial about page with portrait |
| `/work-with-me` | Services: maternity, couples, birthdays, events |
| `/contact` | Contact form |

---

## ✦ Features

- ✅ Fullscreen cinematic hero carousel (Ken Burns effect)
- ✅ Smooth fade page transitions
- ✅ Fullscreen lightbox with keyboard navigation (← → Esc)
- ✅ Scroll-triggered entrance animations
- ✅ Sticky minimal navigation with mobile hamburger menu
- ✅ Lazy-loaded images with Next.js Image optimization
- ✅ Hover zoom effects on all photo grids
- ✅ Fully responsive (mobile-first)
- ✅ City anchor navigation on country pages
- ✅ Static generation for all dynamic routes
- ✅ SEO metadata on all pages

---

## ✦ Deployment to Vercel

### Option A — Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option B — GitHub Integration

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repo
5. Vercel auto-detects Next.js — click **Deploy**

### Environment Variables (Optional)

Add these in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
```

---

## ✦ Customizing the Contact Form

The contact form in `app/contact/page.tsx` currently simulates submission. To make it functional:

### Option 1: Formspree (Simplest)

```typescript
// In app/contact/page.tsx, replace the handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formState),
  });
  setLoading(false);
  if (res.ok) setSubmitted(true);
};
```

### Option 2: Next.js API Route + Resend

Create `app/api/contact/route.ts` with the Resend SDK.

---

## ✦ Typography

| Font | Use | Source |
|------|-----|--------|
| Cormorant Garamond | Display headings, quotes | Google Fonts |
| Jost | Body text, UI labels | Google Fonts |
| DM Mono | Metadata, counters, tags | Google Fonts |

---

## ✦ Color Palette

```css
Background:    #0a0a0a  (near black)
Surface:       #0d0d0d  (subtle lift)
Border:        rgba(255,255,255,0.05–0.15)
Text primary:  #e8e8e8
Text muted:    rgba(255,255,255,0.35–0.55)
Accent:        #C9A96E  (warm gold — used ONLY for name + highlights)
Accent light:  #E8D5B0
Accent dark:   #8B6E3A
```

---

## ✦ Performance Tips

1. **Optimize Cloudinary images** — Use `f_auto,q_auto` in your Cloudinary URLs for automatic format + quality optimization
2. **Enable Cloudinary lazy loading** — Already implemented via Next.js `loading="lazy"`
3. **Use Cloudinary responsive images** — Pass multiple widths using the `sizes` prop
4. **Image compression** — Keep hero images under 500KB using Cloudinary's `q_80`

---

## ✦ License

Personal portfolio — all photography © Anbuselvan Sivaraju. Code may be adapted for personal use.

---

*Built with care for the art of travel photography.*
