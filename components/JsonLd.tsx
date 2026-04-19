// components/JsonLd.tsx
// Drop this component into your app/layout.tsx <body> section.
// It adds Person + WebSite schema for Google rich results.

export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anbuselvan Sivaraju',
    url: 'https://anbuselvan-sivaraju.vercel.app',
    image:
      'https://res.cloudinary.com/dnqfhp432/image/upload/w_800,q_90,f_auto/DSC01052_oubdub',
    jobTitle: 'Photographer',
    description:
      'Copenhagen-based travel and street photographer with 20+ years experience, documenting moments across 35+ countries.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Copenhagen',
      addressCountry: 'DK',
    },
    sameAs: ['https://www.instagram.com/s.anbuselvan/'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anbuselvan Sivaraju Photography',
    url: 'https://anbuselvan-sivaraju.vercel.app',
    description:
      'Photography portfolio of Anbuselvan Sivaraju — travel, street, aerial, and black & white photography from 35+ countries.',
    author: {
      '@type': 'Person',
      name: 'Anbuselvan Sivaraju',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
