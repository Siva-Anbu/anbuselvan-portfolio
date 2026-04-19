import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import { JsonLd } from '@/components/JsonLd';

const baseUrl = 'https://anbuselvan-sivaraju.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Anbuselvan Sivaraju — Photography',
    template: '%s | Anbuselvan Sivaraju',
  },
  description:
    'Photography portfolio of Anbuselvan Sivaraju — Copenhagen-based photographer documenting moments across 35+ countries since 2002.',
  keywords: [
    'travel photography',
    'street photography',
    'Copenhagen photographer',
    'aerial photography',
    'black and white photography',
    'Anbuselvan Sivaraju',
    'portrait photography Copenhagen',
    'fine art photography',
  ],
  authors: [{ name: 'Anbuselvan Sivaraju', url: baseUrl }],
  creator: 'Anbuselvan Sivaraju',
  openGraph: {
    type: 'website',
    locale: 'en_DK',
    url: baseUrl,
    siteName: 'Anbuselvan Sivaraju Photography',
    title: 'Anbuselvan Sivaraju — Photography',
    description:
      'Photography portfolio of Anbuselvan Sivaraju — Copenhagen-based photographer documenting moments across 35+ countries since 2002.',
    images: [
      {
        url: 'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/DSC07725_tkefef',
        width: 1200,
        height: 630,
        alt: 'Anbuselvan Sivaraju Photography — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anbuselvan Sivaraju — Photography',
    description:
      'Copenhagen-based photographer documenting moments across 35+ countries since 2002.',
    images: [
      'https://res.cloudinary.com/dnqfhp432/image/upload/w_1200,h_630,c_fill,q_85,f_auto/DSC07725_tkefef',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}