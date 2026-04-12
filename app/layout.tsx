import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Anbuselvan Sivaraju — Travel Photography',
  description: 'Cinematic travel photography — moments across the world, captured through the lens of Anbuselvan Sivaraju.',
  keywords: 'travel photography, cinematic photography, Anbuselvan Sivaraju, documentary photography',
  openGraph: {
    title: 'Anbuselvan Sivaraju — Travel Photography',
    description: 'Cinematic travel photography — moments across the world.',
    type: 'website',
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
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
