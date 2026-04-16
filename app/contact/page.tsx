// app/contact/page.tsx
// NOTE: This page uses 'use client' for the form state.
// Metadata cannot be exported from a client component in Next.js.
// Solution: wrap in a server component that exports metadata,
// and keep the form in a separate client component.
//
// STEP 1 — rename your current contact/page.tsx to contact/ContactForm.tsx
// STEP 2 — replace contact/page.tsx with this file

import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Anbuselvan Sivaraju for photography collaborations, print inquiries, or booking a session in Copenhagen. Responds within 48 hours.',
  alternates: { canonical: 'https://anbuselvan-sivaraju.vercel.app/contact' },
  openGraph: {
    title: 'Contact | Anbuselvan Sivaraju',
    description:
      'Reach out for collaborations, prints, or session bookings. Based in Copenhagen — responds within 48 hours.',
    url: 'https://anbuselvan-sivaraju.vercel.app/contact',
    images: [
      {
        url: 'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/DSC07725_tkefef',
        width: 1200,
        height: 630,
        alt: 'Contact Anbuselvan Sivaraju — Copenhagen photographer',
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
