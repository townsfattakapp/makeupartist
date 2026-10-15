import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { repository } from '@/lib/db/repository';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await repository.getSettings();
  return {
    metadataBase: new URL('https://aurelialuxe.com'),
    title: {
      default: `${settings.studioName} | ${settings.tagline}`,
      template: `%s | ${settings.studioName}`,
    },
    description: settings.seoDescription,
    keywords: [
      'luxury makeup artist',
      'bridal makeup London',
      'haute bridal beauty',
      'red carpet makeup',
      'Mayfair makeup artist',
      'destination wedding makeup',
      'glass skin makeup',
      'Aurelia Luxe',
    ],
    authors: [{ name: settings.artistName }],
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: 'https://aurelialuxe.com',
      title: `${settings.studioName} | ${settings.tagline}`,
      description: settings.seoDescription,
      siteName: settings.studioName,
      images: [
        {
          url: settings.heroImageUrl || '/assets/8cefb0245c79153f745fc34d21844435.jpg',
          width: 1200,
          height: 630,
          alt: `${settings.studioName} Luxury Makeup Artistry`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.studioName} | ${settings.tagline}`,
      description: settings.seoDescription,
      images: [settings.heroImageUrl || '/assets/8cefb0245c79153f745fc34d21844435.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
